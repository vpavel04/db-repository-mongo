import { DbObjectId, IQuery, IQueryBuilder } from 'db-repository';
import { ObjectID } from 'mongodb';
import { replaceRepoIdsWithMongoIds } from './IdConversion';

export class MongoDBQueryBuilder implements IQueryBuilder {
    all(): IQuery {
        return {
            build: (): any => {
                return null;
            }
        }
    }
    byId(id: string | DbObjectId): IQuery {
        return {
            build: (): any => {
                const filter: any = {};
                if (id instanceof DbObjectId) {
                    const dbId: DbObjectId = id;
                    filter['_id'] = new ObjectID(dbId.value);
                } else {
                    const strId: string = id;
                    filter['_id'] = new ObjectID(strId);
                }

                return filter;
            }
        }
    }
    byProperty(propName: string, propVal: string | number | boolean | Date | DbObjectId): IQuery {
        return {
            build: (): any => {
                const filter: any = {};
                if (propVal instanceof DbObjectId)
                    filter[propName] = new ObjectID(propVal.value);
                else
                    filter[propName] = propVal;

                return filter;
            }
        }
    }
    byProperties(dict: any): IQuery {
        return {
            build: (): any => {
                replaceRepoIdsWithMongoIds(dict);
                return dict;
            }
        }
    }
}
