const fs = require('fs');

const DefinitionsPath = './resources/definitions.json';

const Definitions = require(DefinitionsPath);

const DefaultValues = {
    xrplApi: null,
}

const RequiredInfoKeys = [
    "governorAddress",
    "rippledServer",
    "stateIndexId",
    "networkID"
]

const HookTypes = {
    governor: 'GOVERNOR',
    registry: 'REGISTRY',
    heartbeat: 'HEARTBEAT'
}

class Defaults {
    /**
     * Load defaults from the public definitions json.
     * @param {string} network Network to choose the info.
     */
    static useNetwork(network) {
        if (!Definitions[network])
            throw 'Invalid network';

        this.set(Definitions[network]);
    }

    /**
     * Override Evernode default configs.
     * @param {object} newDefaults Configurations to override `{ governorAddress: '{string} governor xrpl address', rippledServer: '{string} rippled server url', xrplApi: '{XrplApi} xrpl instance', stateIndexId: '{string} firestore index', networkID: '{number} rippled network id' }`
     */
    static set(newDefaults) {
        Object.assign(DefaultValues, newDefaults)
    }

    /**
     * Read Evernode default configs.
     * @returns The Object of Evernode configs
     */
    static get values() {
        var notFound = RequiredInfoKeys.find(k => !DefaultValues[k]);
        if (notFound)
            throw `Value for ${notFound} is not set.`;

        return { ...DefaultValues };
    }
}

module.exports = {
    Defaults,
    HookTypes
}