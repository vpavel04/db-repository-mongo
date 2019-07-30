import { DbObjectId, IQuery, IQueryBuilder } from 'db-repository';
export declare class MongoDBQueryBuilder implements IQueryBuilder {
    all(): IQuery;
    byId(id: string | DbObjectId): IQuery;
    byProperty(propName: string, propVal: string | number | boolean | Date | DbObjectId): IQuery;
    byProperties(dict: any): IQuery;
    private updateIdsToMongo;
}
