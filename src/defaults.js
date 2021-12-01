const DefaultValues = {
    hookAddress: 'rDPqJv7zu6DfeXexAYseABNM2hT2j2rpHv',
    rippledServer: 'wss://hooks-testnet.xrpl-labs.com',
    xrplApi: null
}

class Defaults {
    static set(newDefaults) {
        Object.assign(DefaultValues, newDefaults)
    }

    static get() {
        return { ...DefaultValues };
    }
}

module.exports = {
    DefaultValues,
    Defaults
}