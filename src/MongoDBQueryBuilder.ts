import { IQuery, IQueryBuilder } from 'db-repository';
import { ObjectID } from 'mongodb';

export class MongoDBQueryBuilder implements IQueryBuilder {
    all(): IQuery {
        return {
            build: (): any => {
                return null;
            }
        }
    }
    byId(id: string): IQuery {
        return {
            build: (): any => {
                const filter: any = {};
                filter['_id'] = new ObjectID(id);
                return filter;
            }
        }
    }
    byProperty(propName: string, propVal: string | number | boolean | Date): IQuery {
        return {
            build: (): any => {
                const filter: any = {};
                filter[propName] = propVal;
                return filter;
            }
        }
    }
    byProperties(dict: any): IQuery {
        return {
            build: (): any => {
                return dict;
            }
        }
    }
}