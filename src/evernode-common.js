/**
 * Evernode constants
*/
const EvernodeConstants = {
    EVR: 'EVR',
    TOKEN_PREFIX_HEX: '657672686F7374', // evrhost
    LEASE_TOKEN_PREFIX_HEX: '6576726C65617365', // evrlease 
    LEASE_TOKEN_VERSION_PREFIX_HEX: '4C5456', // LTV (Lease_Token_Version)
    LEASE_TOKEN_VERSION: 1,
    HOOK_NAMESPACE: '01EAF09326B4911554384121FF56FA8FECC215FDDE2EC35D9E59F2C53EC665A0',
    HOST_REPUTATION_HOOK_NAMESPACE: '2BC6C2BBAC00E254AA5F2E855AD6F25BFF556EE8EEC9C82918EBCFA01FD05507',
    NOW_IN_EVRS: "0.00000001",
    HOOKS: [
        "Governor",
        "Registry",
        "Heartbeat",
        "Reputation"
    ],
    ReputationAccountMode: {
        None: 0,
        OneToOne: 1,
        OneToMany: 2
    },
    CandidateVote: {
        Reject: 0,
        Support: 1
    },
    CandidateTypes: {
        NewHook: 1,
        PilotedMode: 2,
        DudHost: 3
    },
    GovernanceModes: {
        Piloted: 1,
        CoPiloted: 2,
        AutoPiloted: 3
    },
    CandidateStatuses: {
        CANDIDATE_REJECTED: 0,
        CANDIDATE_SUPPORTED: 1,
        CANDIDATE_ELECTED: 2,
        CANDIDATE_PURGED: 3,
        CANDIDATE_WITHDRAWN: 4
    }
}

/**
 * Event types list in Evernode
*/
const EventTypes = {
    // Governor hook events.
    ACQUIRE_LEASE: 'evnAcquireLease',
    ACQUIRE_SUCCESS: 'evnAcquireSuccess',
    ACQUIRE_ERROR: 'evnAcquireError',
    ACQUIRE_REF: 'evnAcquireRef',
    HOST_REG: 'evnHostReg',
    HOST_DEREG: 'evnHostDereg',
    HOST_UPDATE_INFO: 'evnHostUpdateReg',
    HEARTBEAT: 'evnHeartbeat',
    HOST_TRANSFER: 'evnTransfer',
    EXTEND_LEASE: 'evnExtendLease',
    EXTEND_SUCCESS: 'evnExtendSuccess',
    EXTEND_ERROR: 'evnExtendError',
    EXTEND_REF: 'evnExtendRef',
    TERMINATE_LEASE: 'evnTerminateLease',
    INIT: 'evnInitialize',
    REFUND: 'evnRefund',
    REFUND_REF: 'evnRefundRef',
    DEAD_HOST_PRUNE: 'evnDeadHostPrune',
    HOST_REBATE: 'evnHostRebate',
    CANDIDATE_PROPOSE: 'evnCandidatePropose',
    CANDIDATE_PROPOSE_REF: 'evnCandidateProposeRef',
    CANDIDATE_WITHDRAW: 'evnCandidateWithdraw',
    CANDIDATE_VOTE: 'evnCandidateVote',
    CANDIDATE_STATUS_CHANGE: 'evnCandidateStatusChange',
    DUD_HOST_REPORT: 'evnDudHostReport',
    HOOK_UPDATE_RES: 'evnHookUpdateRes',
    GOVERNANCE_MODE_CHANGE: 'evnGovernanceModeChange',
    LINKED_CANDIDATE_REMOVE: 'evnRemoveLinkedCandidate',
    HOST_UPDATE_REPUTATION: 'evnHostUpdateReputation',

    // Reputation hook events.
    HOST_SEND_REPUTATION: 'evnHostSendReputation',

    // Host reputation hook events.
    REPUTATION_CONTRACT_INFO_UPDATE: 'evnRepConInfoUpdate'
}

/**
 * Memo formats supported for use in transactions
 */
const MemoFormats = {
    TEXT: 'text/plain',
    JSON: 'text/json',
    BASE64: 'base64',
    HEX: 'hex'
}

/**
 * Error codes supported
 */
const ErrorCodes = {
    ACQUIRE_ERR: 'ACQUIRE_ERR',
    EXTEND_ERR: 'EXTEND_ERR',
    PROPOSE_ERR: 'PROPOSE_ERR',
}

/**
 * Common reasons for errors that may occur
 */
const ErrorReasons = {
    TRANSACTION_FAILURE: 'TRANSACTION_FAILURE',
    NO_OFFER: 'NO_OFFER',
    NO_TOKEN: 'NO_TOKEN',
    INTERNAL_ERR: 'INTERNAL_ERR',
    TIMEOUT: 'TIMEOUT',
    HOST_INVALID: 'HOST_INVALID',
    HOST_INACTIVE: 'HOST_INACTIVE',
    NO_STATE_KEY: 'NO_STATE_KEY'
}

/**
 * Reputation system constants used in the reputation calculation mechanisms
 */
const ReputationConstants = {
    REP_INFO_BUFFER_SIZE: 43,
    REP_INFO_PUBKEY_OFFSET: 0,
    REP_INFO_PEER_PORT_OFFSET: 33,
    REP_INFO_MOMENT_OFFSET: 35,
    SCORE_EXPIRY_MOMENT_COUNT: 2
}

/**
 * Keys used to access and configure Evernode hook states
 * All keys are prefixed with 'EVR' (0x455652)
 * Config keys sub-prefix: 0x01
 */
const HookStateKeys = {
    // Configuration.
    EVR_ISSUER_ADDR: "4556520100000000000000000000000000000000000000000000000000000001",
    FOUNDATION_ADDR: "4556520100000000000000000000000000000000000000000000000000000002",
    MOMENT_SIZE: "4556520100000000000000000000000000000000000000000000000000000003",
    MINT_LIMIT: "4556520100000000000000000000000000000000000000000000000000000004",
    FIXED_REG_FEE: "4556520100000000000000000000000000000000000000000000000000000005",
    HOST_HEARTBEAT_FREQ: "4556520100000000000000000000000000000000000000000000000000000006",
    LEASE_ACQUIRE_WINDOW: "4556520100000000000000000000000000000000000000000000000000000007",
    REWARD_CONFIGURATION: "4556520100000000000000000000000000000000000000000000000000000008",
    MAX_TOLERABLE_DOWNTIME: "4556520100000000000000000000000000000000000000000000000000000009",
    MOMENT_TRANSIT_INFO: "455652010000000000000000000000000000000000000000000000000000000A",
    MAX_TRX_EMISSION_FEE: "455652010000000000000000000000000000000000000000000000000000000B",
    HEARTBEAT_ADDR: "455652010000000000000000000000000000000000000000000000000000000C",
    REGISTRY_ADDR: "455652010000000000000000000000000000000000000000000000000000000D",
    GOVERNANCE_CONFIGURATION: "455652010000000000000000000000000000000000000000000000000000000E",
    NETWORK_CONFIGURATION: "455652010000000000000000000000000000000000000000000000000000000F",
    REPUTATION_ADDR: "4556520100000000000000000000000000000000000000000000000000000010",

    // Singleton
    HOST_COUNT: "4556523200000000000000000000000000000000000000000000000000000000",
    MOMENT_BASE_INFO: "4556523300000000000000000000000000000000000000000000000000000000",
    HOST_REG_FEE: "4556523400000000000000000000000000000000000000000000000000000000",
    MAX_REG: "4556523500000000000000000000000000000000000000000000000000000000",
    REWARD_INFO: "4556523600000000000000000000000000000000000000000000000000000000",
    GOVERNANCE_INFO: "4556523700000000000000000000000000000000000000000000000000000000",
    TRX_FEE_BASE_INFO: "4556523800000000000000000000000000000000000000000000000000000000",

    // Prefixes
    PREFIX_HOST_TOKENID: "45565202",
    PREFIX_HOST_ADDR: "45565203",
    PREFIX_TRANSFEREE_ADDR: "45565204",
    PREFIX_CANDIDATE_OWNER: "45565205",
    PREFIX_CANDIDATE_ID: "45565206",
}

/**
 * Keys used to access specific parameters within Evernode hooks
 * All keys are prefixed with 'EVR' (0x455652)
 */
const HookParamKeys = {
    PARAM_STATE_HOOK_KEY: "4556520100000000000000000000000000000000000000000000000000000001",
    PARAM_EVENT_TYPE_KEY: "4556520100000000000000000000000000000000000000000000000000000002",
    PARAM_EVENT_DATA_KEY: "4556520100000000000000000000000000000000000000000000000000000003",
    PARAM_EVENT_DATA2_KEY: "4556520100000000000000000000000000000000000000000000000000000004",
}

/**
 * Events emitted by Evernode
 */
const EvernodeEvents = {
    HostRegistered: "HostRegistered",
    HostDeregistered: "HostDeregistered",
    HostTransfer: "HostTransfer",
    AcquireLease: "AcquireLease",
    AcquireSuccess: "AcquireSuccess",
    AcquireError: "AcquireError",
    Heartbeat: "Heartbeat",
    ExtendLease: "ExtendLease",
    ExtendSuccess: "ExtendSuccess",
    ExtendError: "ExtendError",
    TerminateLease: 'TerminateLease',
    HostRegUpdated: "HostRegUpdated",
    HostReRegistered: "HostReRegistered",
    Initialized: "Initialized",
    DeadHostPrune: "DeadHostPrune",
    HostRebate: "HostRebate",
    CandidateProposed: "CandidateProposed",
    CandidateWithdrawn: "CandidateWithdrawn",
    ChildHookUpdated: "ChildHookUpdated",
    GovernanceModeChanged: "GovernanceModeChanged",
    FoundationVoted: "FoundationVoted",
    DudHostReported: "DudHostReported",
    DudHostRemoved: "DudHostRemoved",
    DudHostStatusChanged: "DudHostStatusChanged",
    FallbackToPiloted: "FallbackToPiloted",
    NewHookStatusChanged: "NewHookStatusChanged",
    LinkedDudHostCandidateRemoved: "LinkedDudHostCandidateRemoved",
    HostReputationUpdated: "HostReputationUpdated"
}

/**
 * Types of URI tokens used within Evernode
 */
const URITokenTypes = {
    LEASE_URI_TOKEN: 1,
    REGISTRATION_URI_TOKEN: 2
}

/**
 * Regular expressions for validating data formats
 */
const RegExp = {
    PublicPrivateKey: /^[0-9A-Fa-f]{66}$/
}

module.exports = {
    EvernodeConstants,
    EventTypes,
    MemoFormats,
    ErrorCodes,
    ErrorReasons,
    HookStateKeys,
    EvernodeEvents,
    URITokenTypes,
    HookParamKeys,
    RegExp,
    ReputationConstants
}