const { EvernodeConstants, MemoTypes, HookStateDefaults, HookStateKeys, HookEvents, MemoFormats } = require('./evernode-common')
const { RippleAPIEvents } = require('./ripple-common');
const { XrplAccount } = require('./xrpl-account');
const { EventEmitter } = require('./event-emitter');
const { XflHelpers } = require('./xfl-helpers');
const rippleCodec = require('ripple-address-codec');

export class EvernodeHook {
    constructor(rippleAPI, hookAddress) {
        this.account = new XrplAccount(rippleAPI, (hookAddress || EvernodeConstants.DEFAULT_HOOK_ADDR));
        this.events = new EventEmitter();

        this.account.events.on(RippleAPIEvents.PAYMENT, async (data, error) => {
            if (error)
                console.error(error);
            else if (!data)
                console.log('Invalid transaction.');
            else {
                const ev = extractEvernodeHookEvent(data);
                if (ev)
                    this.events.emit(ev.name, ev.data);
            }
        });
    }

    async getHookStates() {
        let states = await this.account.getStates();
        states = states.filter(s => s.LedgerEntryType === 'HookState');
        states = states.map(s => {
            return {
                key: s.HookStateKey, //hex
                data: s.HookStateData //hex
            }
        });
        return states;
    }

    getStateData(states, key) {
        const state = states.find(s => key === s.key);
        return state?.data;
    }

    async getConfig() {
        let states = await this.getHookStates();
        states = states.map(s => {
            return {
                key: s.key,
                data: Buffer.from(s.data, 'hex')
            }
        });

        let config = {};
        let buf = this.getStateData(states, HookStateKeys.HOST_REG_FEE);
        if (buf) {
            buf = Buffer.from(buf);
            const xfl = buf.readBigInt64BE(0);
            config.hostRegFee = XflHelpers.toString(xfl);
        } else {
            config.hostRegFee = HookStateDefaults.HOST_REG_FEE;
        }


        buf = this.getStateData(states, HookStateKeys.MOMENT_SIZE);
        config.momentSize = buf ? readUInt(buf, 16) : HookStateDefaults.MOMENT_SIZE;

        buf = this.getStateData(states, HookStateKeys.REDEEM_WINDOW);
        config.redeemWindow = buf ? readUInt(buf, 16) : HookStateDefaults.REDEEM_WINDOW;

        buf = this.getStateData(states, HookStateKeys.MOMENT_BASE_IDX);
        config.momentBaseIdx = buf ? readUInt(buf, 64) : HookStateDefaults.MOMENT_BASE_IDX;

        return config;
    }

    async getHosts() {
        const states = (await this.getHookStates()).filter(s => s.key.startsWith(HookStateKeys.HOST_ADDR));
        const hosts = states.map(s => {
            return {
                address: rippleCodec.encodeAccountID(Buffer.from(s.key.slice(-40), 'hex')),
                token: Buffer.from(s.data.substr(8, 6), 'hex').toString(),
                txHash: s.data.substr(14, 64),
                instanceSize: Buffer.from(s.data.substr(78, 120), 'hex').toString().replace(/\0/g, ''),
                location: Buffer.from(s.data.substr(198, 20), 'hex').toString().replace(/\0/g, ''),
            }
        });
        return hosts;
    }

    subscribe() {
        this.account.subscribe();
    }
}

function extractEvernodeHookEvent(tx) {

    if (!tx.Memos || tx.Memos.length === 0)
        return null;

    if (tx.Memos.length >= 1 && tx.Memos[0].format === MemoFormats.BINARY &&
        tx.Memos[0].type === MemoTypes.REDEEM && tx.Memos[0].data) {

        return {
            name: HookEvents.Redeem,
            data: {
                transaction: tx,
                user: tx.Account,
                host: tx.Amount.issuer,
                token: tx.Amount.currency,
                moments: parseInt(tx.Amount.value),
                payload: tx.Memos[0].data
            }
        }
    }
    else if (tx.Memos.length >= 2 && tx.Memos[0].format === MemoFormats.BINARY &&
        tx.Memos[0].type === MemoTypes.REDEEM_REF && tx.Memos[0].data &&
        tx.Memos[1].type === MemoTypes.REDEEM_RESP && tx.Memos[1].data) {

        const redeemTxHash = tx.Memos[0].data;
        const payload = tx.Memos[1].data;
        if (tx.Memos[1].format === MemoFormats.JSON) { // Format text/json means this is an error message. 
            const error = JSON.parse(payload);
            return {
                name: HookEvents.RedeemError,
                data: {
                    transaction: tx,
                    redeemTxHash: redeemTxHash,
                    reason: error.reason
                }
            }
        }
        else {
            return {
                name: HookEvents.RedeemSuccess,
                data: {
                    transaction: tx,
                    redeemTxHash: redeemTxHash,
                    payload: payload
                }
            }
        }
    }
    else if (tx.Memos.length >= 1 && tx.Memos[0].format === MemoFormats.BINARY &&
        tx.Memos[0].type === MemoTypes.REFUND && tx.Memos[0].data) {

        return {
            name: HookEvents.RefundRequest,
            data: {
                transaction: tx,
                redeemTxHash: tx.Memos[0].data
            }
        }
    }
    else if (tx.Memos.length >= 1 && tx.Memos[0].format === MemoFormats.TEXT &&
        tx.Memos[0].type === MemoTypes.HOST_REG && tx.Memos[0].data) {

        const parts = tx.Memos[0].data.split(';');
        return {
            name: HookEvents.HostRegistered,
            data: {
                transaction: tx,
                host: tx.Account,
                token: parts[0],
                instanceSize: parts[1],
                location: parts[2]
            }
        }
    }
    else if (tx.Memos.length >= 1 && tx.Memos[0].type === MemoTypes.HOST_DEREG) {
        return {
            name: HookEvents.HostDeregistered,
            data: {
                transaction: tx,
                host: tx.Account
            }
        }
    }
    else if (tx.Memos.length >= 1 && tx.Memos[0].format === MemoFormats.BINARY &&
        tx.Memos[0].type === MemoTypes.AUDIT_REQ && tx.Memos[0].data) {

        return {
            name: HookEvents.AuditRequest,
            data: {
                transaction: tx,
                auditor: tx.Account
            }
        }
    }
    else if (tx.Memos.length >= 1 && tx.Memos[0].format === MemoFormats.BINARY &&
        tx.Memos[0].type === MemoTypes.AUDIT_SUCCESS && tx.Memos[0].data) {

        return {
            name: HookEvents.AuditSuccess,
            data: {
                transaction: tx,
                auditor: tx.Account
            }
        }
    }

    return null;
}

function readUInt(buf, base = 32, isBE = true) {
    buf = Buffer.from(buf);
    switch (base) {
        case (8):
            return buf.readUInt8();
        case (16):
            return isBE ? buf.readUInt16BE() : buf.readUInt16LE();
        case (32):
            return isBE ? buf.readUInt32BE() : buf.readUInt32LE();
        case (64):
            return isBE ? Number(buf.readBigUInt64BE()) : Number(buf.readBigUInt64LE());
        default:
            throw 'Invalid base value';
    }
}