import { IDbObject, IModuleFactory, IQueryBuilder, IRepository } from 'db-repository';
export declare class MongoDbModuleFactory implements IModuleFactory {
    createRepository<T extends IDbObject>(opts: any): IRepository<T>;
    createQueryBuilder(opts: any): IQueryBuilder;
}
export declare const init: () => MongoDbModuleFactory;
