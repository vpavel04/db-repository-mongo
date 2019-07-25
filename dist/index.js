"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoDBQueryBuilder_1 = require("./MongoDBQueryBuilder");
const MongoDBRepository_1 = require("./MongoDBRepository");
class MongoDbModuleFactory {
    createRepository(opts) {
        return new MongoDBRepository_1.MongoDBRepository(opts.table);
    }
    createQueryBuilder(opts) {
        return new MongoDBQueryBuilder_1.MongoDBQueryBuilder();
    }
}
exports.MongoDbModuleFactory = MongoDbModuleFactory;
exports.init = () => new MongoDbModuleFactory();
//# sourceMappingURL=index.js.map