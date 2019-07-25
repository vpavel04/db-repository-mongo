# Db-Repository-Mongo

Db-Repository-Mongo is a mongoDb implementation for [Db-Repository](https://github.com/vpavel04/db-repository) in TypeScript

# How to use it

```
npm install --save 'db-repository';
npm install --save 'db-repository-mongo';
```

Sample code
```
// store mongoDbUri in MONGODB_PATH env variable.
process.env.MONGODB_PATH = 'mongoDb uri';

import * as db from 'db-repository';
import * as mongoDbRepo from 'db-repository-mongo';

db.use(mongoDbRepo.init());

// define new type that works with IRepository
interface DbTest extends db.IDbObject {
    test: string;
}

const testFn = async () => {

  const dbObject: DbTest = <DbTest>{
      test: 'text1'
  }

  // create repository
  const testRepo: db.IRepository<DbTest> = db.repo<DbTest>({ table: 'test' });
  
  // add object
  await testRepo.add(dbObject);
  
  // query all
  const allObjects = await testRepo.list(db.query().all());

  // query by id
  const objectById = await testRepo.list(db.query().byId(dbObject._id));
  
  // update object
  dbObject.test = 'text2';
  const nUpdated = await testRepo.update(dbObject);
  
  // delete objects
  const nDeleted = await testRepo.remove(db.query().all());
};

testFn();
```
