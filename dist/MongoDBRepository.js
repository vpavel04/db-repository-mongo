"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const url = process.env.MONGODB_PATH || 'mongodb://localhost:27017/test';
class MongoDBRepository {
    constructor(className) {
        this.tableName = className;
    }
    add(obj) {
        return new Promise((fulfill, reject) => {
            mongodb_1.MongoClient.connect(url, (err1, client) => {
                if (err1) {
                    reject(err1);
                }
                else {
                    this.createCollection(obj, client, (err2, res1) => {
                        if (err2) {
                            client.close();
                            reject(err2);
                        }
                        else {
                            client.db().collection(this.getTableName()).insertOne(obj, (err3, res2) => {
                                obj._id = obj._id.toHexString();
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
            mongodb_1.MongoClient.connect(url, (err1, client) => {
                if (err1) {
                    reject(err1);
                }
                else {
                    if (filter.build() === null) {
                        client.db().collection(this.getTableName()).deleteMany(null, (err2, result) => {
                            client.close();
                            if (err2) {
                                reject(err2);
                            }
                            else {
                                fulfill(result.deletedCount);
                            }
                        });
                    }
                    else {
                        client.db().collection(this.getTableName()).deleteOne(filter.build(), (err2, result) => {
                            client.close();
                            if (err2) {
                                reject(err2);
                            }
                            else {
                                fulfill(result.deletedCount);
                            }
                        });
                    }
                }
            });
        });
    }
    list(filter) {
        return new Promise((fulfill, reject) => {
            mongodb_1.MongoClient.connect(url, (err1, client) => {
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
                                obj._id = obj._id.toHexString();
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
            mongodb_1.MongoClient.connect(url, (err1, client) => {
                if (err1) {
                    reject(err1);
                }
                else {
                    const query = { _id: new mongodb_1.ObjectID(obj._id) };
                    const update = {
                        $set: Object.assign({}, obj)
                    };
                    delete update.$set._id;
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
    createCollection(obj, client, callback) {
        client.db().createCollection(this.getTableName(), (err, res) => {
            callback(err, res);
        });
    }
}
exports.MongoDBRepository = MongoDBRepository;
//# sourceMappingURL=MongoDBRepository.js.map