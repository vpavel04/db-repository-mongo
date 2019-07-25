import { IDbObject, IModuleFactory, IQueryBuilder, IRepository } from 'db-repository';
import { MongoDBQueryBuilder } from './MongoDBQueryBuilder'
import { MongoDBRepository } from './MongoDBRepository'

import { NOTINITIALIZED } from 'dns';

export class MongoDbModuleFactory implements IModuleFactory {

    public createRepository<T extends IDbObject>(opts: any): IRepository<T> {
        return new MongoDBRepository<T>(opts.table);
    }
    public createQueryBuilder(opts: any): IQueryBuilder {
        return new MongoDBQueryBuilder();
    }
}

export const init = () => new MongoDbModuleFactory();