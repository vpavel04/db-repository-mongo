/**
 * Mongo db repository implementation.
 */

import { IDbObject, IRepository, IQuery } from 'db-repository';
import { Collection, Db, MongoCallback, MongoClient, ObjectID } from 'mongodb';

const url: string = process.env.MONGODB_PATH || 'mongodb://localhost:27017/test';

export class MongoDBRepository<T extends IDbObject> implements IRepository<T> {

    private tableName: string;

    public constructor(className: string) {
        this.tableName = className;
    }

    public add(obj: T): Promise<void> {
        return new Promise((fulfill: any, reject: any) => {
            MongoClient.connect(url, (err1, client) => {
                if (err1) {
                    reject(err1);
                } else {
                    this.createCollection(obj, client, (err2, res1) => {
                        if (err2) {
                            client.close();
                            reject(err2);
                        } else {
                            client.db().collection(this.getTableName()).insertOne(obj, (err3, res2) => {
                                (<any>obj)._id = (<any>obj)._id.toHexString();

                                client.close();
                                if (err3) {
                                    reject(err3);
                                } else {
                                    fulfill();
                                }
                            });
                        }
                    });
                }
            });
        });
    }

    public remove(filter: IQuery): Promise<number> {
        return new Promise((fulfill, reject) => {
            MongoClient.connect(url, (err1, client) => {
                if (err1) {
                    reject(err1);
                } else {
                    if (filter.build() === null) {
                        client.db().collection(this.getTableName()).deleteMany(null, (err2, result) => {
                            client.close();

                            if (err2) {
                                reject(err2);
                            } else {
                                fulfill(result.deletedCount);
                            }
                        });
                    } else {
                        client.db().collection(this.getTableName()).deleteOne(filter.build(), (err2, result) => {
                            client.close();

                            if (err2) {
                                reject(err2);
                            } else {
                                fulfill(result.deletedCount);
                            }
                        });
                    }
                }
            });
        });
    }

    public list(filter: IQuery): Promise<T[]> {
        return new Promise((fulfill, reject) => {
            MongoClient.connect(url, (err1, client) => {
                if (err1) {
                    reject(err1);
                } else {
                    client.db().collection(this.getTableName()).find(filter.build()).toArray((err2, result) => {
                        client.close();

                        if (err2) {
                            reject(err2);
                        } else {
                            result.forEach(obj => {
                                (<any>obj)._id = (<any>obj)._id.toHexString();
                            });
                            fulfill(result);
                        }
                    });
                }
            });
        });
    }

    public update(obj: T): Promise<number> {
        return new Promise((fulfill, reject) => {
            MongoClient.connect(url, (err1, client) => {
                if (err1) {
                    reject(err1);
                } else {
                    const query = { _id: new ObjectID(obj._id) };
                    const update = {
                        $set: Object.assign({}, obj)
                    }
                    delete update.$set._id;
                    client.db().collection(this.getTableName()).updateOne(query, update, (err2, ret) => {
                        client.close();
                        if (err2) {
                            reject(err2);
                        } else {
                            fulfill(ret.result.nModified);
                        }
                    });
                }
            });
        });
    }

    private getTableName(): string {
        return this.tableName;
    }
    private createCollection(obj: T, client: MongoClient, callback: MongoCallback<Collection>): void {
        client.db().createCollection(this.getTableName(), (err, res) => {
            callback(err, res);
        });
    }
}
