import pg from 'pg';
import {MongoClient} from 'mongodb';

export async function openStore() {
  if(process.env.MONGO_HOST){
    const user=encodeURIComponent(process.env.DB_USER), password=encodeURIComponent(process.env.DB_PASSWORD), name=process.env.DB_NAME;
    const client=new MongoClient(`mongodb://${user}:${password}@mongo:27017/${name}?authSource=${name}&replicaSet=cab-rs`);
    await client.connect();const db=client.db(name);
    for(const collection of ['records','outbox','inbox']){
      try{await db.createCollection(collection);}catch(e){if(e.code!==48)throw e;}
    }
    async function transaction(fn){
      const session=client.startSession();let result;
      try{await session.withTransaction(async()=>{result=await fn({
        get:async(kind,id)=>(await db.collection('records').findOne({_id:kind+':'+id},{session}))?.body||null,
        list:async kind=>(await db.collection('records').find({kind},{session}).toArray()).map(x=>x.body),
        put:async(kind,id,body)=>{await db.collection('records').replaceOne({_id:kind+':'+id},{_id:kind+':'+id,kind,body},{session,upsert:true});},
        emit:async event=>{await db.collection('outbox').insertOne({_id:event.eventId,event,published:false},{session});},
        pending:async()=>await db.collection('outbox').find({published:false},{session}).limit(20).toArray(),
        mark:async id=>{await db.collection('outbox').updateOne({_id:id},{$set:{published:true}},{session});},
        seen:async id=>!!await db.collection('inbox').findOne({_id:id},{session}),
        remember:async id=>{await db.collection('inbox').insertOne({_id:id},{session});}
      });});return result;}finally{await session.endSession();}
    }
    return {transaction,ping:()=>db.command({ping:1}),close:()=>client.close()};
  }
  const pool=new pg.Pool({host:'postgres',database:process.env.DB_NAME,user:process.env.DB_USER,password:process.env.DB_PASSWORD,max:5});
  await pool.query(`CREATE TABLE IF NOT EXISTS records(kind text NOT NULL,id text NOT NULL,body jsonb NOT NULL,PRIMARY KEY(kind,id));
    CREATE TABLE IF NOT EXISTS outbox(id uuid PRIMARY KEY,event jsonb NOT NULL,published boolean NOT NULL DEFAULT false);
    CREATE TABLE IF NOT EXISTS inbox(id uuid PRIMARY KEY);`);
  async function transaction(fn){
    const c=await pool.connect();
    try{
      await c.query('BEGIN');await c.query("SELECT pg_advisory_xact_lock(hashtext('cab-service-write'))");
      const result=await fn({
        get:async(kind,id)=>(await c.query('SELECT body FROM records WHERE kind=$1 AND id=$2',[kind,id])).rows[0]?.body||null,
        list:async kind=>(await c.query('SELECT body FROM records WHERE kind=$1',[kind])).rows.map(x=>x.body),
        put:async(kind,id,body)=>{await c.query('INSERT INTO records(kind,id,body) VALUES($1,$2,$3) ON CONFLICT(kind,id) DO UPDATE SET body=EXCLUDED.body',[kind,id,body]);},
        emit:async event=>{await c.query('INSERT INTO outbox(id,event) VALUES($1,$2)',[event.eventId,event]);},
        pending:async()=>(await c.query('SELECT id AS _id,event FROM outbox WHERE NOT published ORDER BY id LIMIT 20')).rows,
        mark:async id=>{await c.query('UPDATE outbox SET published=true WHERE id=$1',[id]);},
        seen:async id=>(await c.query('SELECT 1 FROM inbox WHERE id=$1',[id])).rowCount>0,
        remember:async id=>{await c.query('INSERT INTO inbox(id) VALUES($1)',[id]);}
      });await c.query('COMMIT');return result;
    }catch(e){await c.query('ROLLBACK');throw e;}finally{c.release();}
  }
  return {transaction,ping:()=>pool.query('SELECT 1'),close:()=>pool.end()};
}
