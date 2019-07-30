"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_repository_1 = require("db-repository");
const mongodb_1 = require("mongodb");
class MongoDBQueryBuilder {
    all() {
        return {
            build: () => {
                return null;
            }
        };
    }
    byId(id) {
        return {
            build: () => {
                const filter = {};
                if (id instanceof db_repository_1.DbObjectId) {
                    const dbId = id;
                    filter['_id'] = new mongodb_1.ObjectID(dbId.value);
                }
                else {
                    const strId = id;
                    filter['_id'] = new mongodb_1.ObjectID(strId);
                }
                return filter;
            }
        };
    }
    byProperty(propName, propVal) {
        return {
            build: () => {
                const filter = {};
                if (propVal instanceof db_repository_1.DbObjectId)
                    filter[propName] = new mongodb_1.ObjectID(propVal.value);
                else
                    filter[propName] = propVal;
                return filter;
            }
        };
    }
    byProperties(dict) {
        return {
            build: () => {
                this.updateIdsToMongo(dict);
                return dict;
            }
        };
    }
    updateIdsToMongo(dict) {
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
                this.updateIdsToMongo(val);
            }
        }
    }
}
exports.MongoDBQueryBuilder = MongoDBQueryBuilder;
//# sourceMappingURL=MongoDBQueryBuilder.js.map