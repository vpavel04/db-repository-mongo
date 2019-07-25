npm install --save 'db-repository';
npm install --save 'db-repository-mongo';


```
import * as db from 'db-repository';
import * as mongoDbRepo from 'db-repository-mongo';

// if you want to use mongoDb
process.env.MONGODB_PATH = 'mongoDb uri';
db.use(mongoDbRepo.init());


interface DbTest extends db.IDbObject {
    test: string;
}
const fn = async () => {

    const t: DbTest = <DbTest>{
        test: 'text1'
    }

    const r: db.IRepository<DbTest> = db.repo<DbTest>({ table: 'test' });
    await r.add(t);
    const res = await r.list(db.query().all());
    t.test = 'text2';
    const res2 = await r.update(t);
    const res3 = await r.list(db.query().all());
    const res4 = await r.remove(db.query().all());
    console.log(res);
};

fn();
```
