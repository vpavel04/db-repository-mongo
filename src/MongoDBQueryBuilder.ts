import { DbObjectId, IQuery, IQueryBuilder } from 'db-repository';
import { ObjectID } from 'mongodb';

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
                this.updateIdsToMongo(dict);
                return dict;
            }
        }
    }

    private updateIdsToMongo(dict: any) {
        if (!dict ||
            typeof (dict) === 'string' || dict instanceof String ||
            typeof (dict) === 'number' || dict instanceof Number ||
            typeof (dict) === 'boolean' || dict instanceof Boolean)
            return;

        for (const key in dict) {
            if (dict.hasOwnProperty(key)) {
                const val = dict[key];
                if (val instanceof DbObjectId) {
                    dict[key] = new ObjectID(val.value);
                }
                this.updateIdsToMongo(val);
            }
        }
    }
}
