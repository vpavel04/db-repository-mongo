"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const IdConversion_1 = require("./IdConversion");
class MongoDBRepository {
    constructor(className) {
        this.tableName = className;
        this.url = process.env.MONGODB_PATH;
    }
    add(obj) {
        return new Promise((fulfill, reject) => {
            mongodb_1.MongoClient.connect(this.url, { useNewUrlParser: true }, (err1, client) => {
                if (err1) {
                    reject(err1);
                }
                else {
                    this.createCollection(client, (err2, res1) => {
                        if (err2) {
                            client.close();
                            reject(err2);
                        }
                        else {
                            IdConversion_1.replaceRepoIdsWithMongoIds(obj);
                            client.db().collection(this.getTableName()).insertOne(obj, (err3, res2) => {
                                IdConversion_1.replaceMongoIdsWithRepoIds(obj);
                                client.close();
                                if (err3) {
                                    reject(err3);
                                }
                                else {
                                    fulfill();
                                }
                            });
                        }
                    });
                }
            });
        });
    }
    remove(filter) {
        return new Promise((fulfill, reject) => {
            mongodb_1.MongoClient.connect(this.url, { useNewUrlParser: true }, (err1, client) => {
                if (err1) {
                    reject(err1);
                }
                else {
                    client.db().collection(this.getTableName()).deleteMany(filter.build(), (err2, result) => {
                        client.close();
                        if (err2) {
                            reject(err2);
                        }
                        else {
                            fulfill(result.deletedCount);
                        }
                    });
                }
            });
        });
    }
    list(filter) {
        return new Promise((fulfill, reject) => {
            mongodb_1.MongoClient.connect(this.url, { useNewUrlParser: true }, (err1, client) => {
                if (err1) {
                    reject(err1);
                }
                else {
                    client.db().collection(this.getTableName()).find(filter.build()).toArray((err2, result) => {
                        client.close();
                        if (err2) {
                            reject(err2);
                        }
                        else {
                            result.forEach(obj => {
                                IdConversion_1.replaceMongoIdsWithRepoIds(obj);
                            });
                            fulfill(result);
                        }
                    });
                }
            });
        });
    }
    update(obj) {
        return new Promise((fulfill, reject) => {
            mongodb_1.MongoClient.connect(this.url, { useNewUrlParser: true }, (err1, client) => {
                if (err1) {
                    reject(err1);
                }
                else {
                    const query = { _id: new mongodb_1.ObjectID(obj._id.value) };
                    IdConversion_1.replaceRepoIdsWithMongoIds(obj);
                    const update = {
                        $set: Object.assign({}, obj)
                    };
                    delete update.$set._id;
                    IdConversion_1.replaceMongoIdsWithRepoIds(obj);
                    client.db().collection(this.getTableName()).updateOne(query, update, (err2, ret) => {
                        client.close();
                        if (err2) {
                            reject(err2);
                        }
                        else {
                            fulfill(ret.result.nModified);
                        }
                    });
                }
            });
        });
    }
    getTableName() {
        return this.tableName;
    }
    createCollection(client, callback) {
        client.db().createCollection(this.getTableName(), (err, res) => {
            callback(err, res);
        });
    }
}
exports.MongoDBRepository = MongoDBRepository;
//# sourceMappingURL=MongoDBRepository.js.map