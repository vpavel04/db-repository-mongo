import { IDbObject, IRepository, IQuery } from 'db-repository';
export declare class MongoDBRepository<T extends IDbObject> implements IRepository<T> {
    private tableName;
    constructor(className: string);
    add(obj: T): Promise<void>;
    remove(filter: IQuery): Promise<number>;
    list(filter: IQuery): Promise<T[]>;
    update(obj: T): Promise<number>;
    private getTableName;
    private createCollection;
}
