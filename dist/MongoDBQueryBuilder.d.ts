import { IQuery, IQueryBuilder } from 'db-repository';
export declare class MongoDBQueryBuilder implements IQueryBuilder {
    all(): IQuery;
    byId(id: string): IQuery;
    byProperty(propName: string, propVal: string | number | boolean | Date): IQuery;
    byProperties(dict: any): IQuery;
}
