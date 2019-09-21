"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_repository_1 = require("db-repository");
const mongodb_1 = require("mongodb");
exports.replaceMongoIdsWithRepoIds = (dict) => {
    if (!dict ||
        typeof (dict) === 'string' || dict instanceof String ||
        typeof (dict) === 'number' || dict instanceof Number ||
        typeof (dict) === 'boolean' || dict instanceof Boolean)
        return;
    for (const key in dict) {
        if (dict.hasOwnProperty(key)) {
            const val = dict[key];
            if (val instanceof mongodb_1.ObjectID) {
                dict[key] = new db_repository_1.DbObjectId(val.toHexString());
            }
            else {
                exports.replaceMongoIdsWithRepoIds(val);
            }
        }
    }
};
exports.replaceRepoIdsWithMongoIds = (dict) => {
    if (!dict ||
        typeof (dict) === 'string' || dict instanceof String ||
        typeof (dict) === 'number' || dict instanceof Number ||
        typeof (dict) === 'boolean' || dict instanceof Boolean)
        return;
    for (const key in dict) {
        if (dict.hasOwnProperty(key)) {
            const val = dict[key];
            if (val instanceof db_repository_1.DbObjectId) {
                dict[key] = new mongodb_1.ObjectID(val.value);
            }
            else {
                exports.replaceRepoIdsWithMongoIds(val);
            }
        }
    }
};
//# sourceMappingURL=IdConversion.js.map