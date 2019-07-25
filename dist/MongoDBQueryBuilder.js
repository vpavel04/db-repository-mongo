"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
                filter['_id'] = new mongodb_1.ObjectID(id);
                return filter;
            }
        };
    }
    byProperty(propName, propVal) {
        return {
            build: () => {
                const filter = {};
                filter[propName] = propVal;
                return filter;
            }
        };
    }
}
exports.MongoDBQueryBuilder = MongoDBQueryBuilder;
//# sourceMappingURL=MongoDBQueryBuilder.js.map