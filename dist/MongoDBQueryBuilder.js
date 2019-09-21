"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_repository_1 = require("db-repository");
const mongodb_1 = require("mongodb");
const IdConversion_1 = require("./IdConversion");
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
                IdConversion_1.replaceRepoIdsWithMongoIds(dict);
                return dict;
            }
        };
    }
}
exports.MongoDBQueryBuilder = MongoDBQueryBuilder;
//# sourceMappingURL=MongoDBQueryBuilder.js.map