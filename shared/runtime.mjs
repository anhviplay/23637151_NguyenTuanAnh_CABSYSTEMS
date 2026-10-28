import express from 'express';
import helmet from 'helmet';
import crypto from 'node:crypto';
import {Kafka,logLevel} from 'kafkajs';
import {createClient} from 'redis';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import {openStore} from './store.mjs';
import * as h from './helpers.mjs';

export const topics=['identity.account-created','driver.profile-submitted','driver.verification-changed','driver.availability-changed','booking.created','assignment.offered','assignment.responded','booking.driver-assigned','booking.no-driver-available','booking.cancelled','trip.status-changed','trip.completed','payment.status-changed','rating.submitted'];
const proto=grpc.loadPackageDefinition(protoLoader.loadSync('/app/proto/dispatch.proto',{keepCase:true,defaults:true})).cab;
const subscriptions={
 'identity-service':[],
 'customer-service':['identity.account-created','trip.completed'],
 'driver-service':['identity.account-created','booking.driver-assigned','trip.completed','booking.cancelled','trip.status-changed'],
 'location-service':[],
 'booking-service':['driver.availability-changed','trip.status-changed','trip.completed'],
 'trip-service':['booking.driver-assigned','booking.cancelled'],
 'payment-service':['trip.completed'],
 'notification-service':['driver.verification-changed','booking.created','assignment.offered','booking.driver-assigned','booking.no-driver-available','booking.cancelled','trip.status-changed','payment.status-changed'],
 'operations-service':topics
};
export async function startService(name,module){
 const store=await openStore(), app=express(); app.use(helmet());app.set('json escape',true);app.use(express.json({limit:'64kb'}));
 let ready=false,consumerReady=false;
 const kafka=new Kafka({clientId:name,brokers:['kafka:9092'],logLevel:logLevel.NOTHING,retry:{retries:20}});
 const producer=kafka.producer();await producer.connect();
 let redis;
 if(process.env.REDIS_HOST){redis=createClient({url:`redis://:${encodeURIComponent(process.env.REDIS_PASSWORD)}@${process.env.REDIS_HOST}:6379`});redis.on('error',()=>{});await redis.connect();}
 const clients={driver:new proto.Driver('driver-service:50051',grpc.credentials.createInsecure()),location:new proto.Location('location-service:50051',grpc.credentials.createInsecure())};
 const ctx={name,store,app,redis,...h,
   ok:(data,status=200)=>({status,data}),
   emit:(tx,type,aggregate,version,payload,correlationId)=>tx.emit(h.eventFor(name,type,aggregate,version,payload,correlationId)),
   rpc:(target,method,body)=>new Promise((resolve,reject)=>{
     const metadata=new grpc.Metadata();metadata.set('x-internal-key',process.env.INTERNAL_SECRET);
     clients[target][method]({json:JSON.stringify(body)},metadata,{deadline:Date.now()+10000},(error,result)=>error?reject(Object.assign(Error('DEPENDENCY_UNAVAILABLE'),{status:503})):resolve(JSON.parse(result.json)));
   }),
   permission:(actor,permission)=>{if(actor.actorType!=='OPERATIONS'||!actor.permissions?.includes(permission))h.fail(403,'FORBIDDEN');},
   route:(method,path,roles,handler,options={})=>{
    app[method.toLowerCase()](path,async(req,res)=>{
     const correlationId=req.headers['x-correlation-id']||h.id();
     const actor=roles==='PUBLIC'?null:h.decodeToken(req.headers.authorization);
     if(actor&&roles&&!roles.includes(actor.actorType))h.fail(403,'FORBIDDEN');
     const command=!['GET','HEAD'].includes(method)&&options.idempotent!==false;
     const key=req.headers['idempotency-key'];
     if(command&&(!key||String(key).length>200))h.fail(400,'IDEMPOTENCY_KEY_REQUIRED');
     const scope=actor?.sub||'public';const cacheId=scope+':'+key;
     const fingerprint=crypto.createHmac('sha256',process.env.DATA_ENCRYPTION_KEY).update(JSON.stringify([method,req.path,req.body])).digest('hex');
     const output=await store.transaction(async tx=>{
      if(command){const cached=await tx.get('idempotency',cacheId);if(cached){if(cached.fingerprint!==fingerprint)h.fail(409,'IDEMPOTENCY_CONFLICT');return JSON.parse(h.decrypt(cached.response));}}
      const result=await handler({tx,actor,body:req.body||{},query:req.query,params:req.params,correlationId,req});
      const response={status:result.status||200,body:result.meta?{data:result.data,meta:result.meta}:{data:result.data,meta:{correlationId,occurredAt:h.now()}}};
      if(response.status===204)response.body=null;
      if(command)await tx.put('idempotency',cacheId,{fingerprint,response:h.encrypt(JSON.stringify(response))});
      return response;
     });
     if(output.body===null)res.sendStatus(output.status);else res.status(output.status).json(output.body);
    });
   }
 };
 app.get('/health',async(req,res)=>{try{await store.ping();res.json({data:{name,status:'HEALTHY'}});}catch{res.status(503).json({data:{name,status:'UNHEALTHY'}});}});
 app.get('/ready',(req,res)=>res.status(ready?200:503).json({data:{status:ready?'READY':'NOT_READY'}}));
 if(module.grpc){
  const server=new grpc.Server();const service=name==='driver-service'?proto.Driver.service:proto.Location.service;
  const handlers={};for(const [method,handler] of Object.entries(module.grpc))handlers[method]=async(call,callback)=>{
   if(call.metadata.get('x-internal-key')[0]!==process.env.INTERNAL_SECRET)return callback({code:grpc.status.UNAUTHENTICATED,message:'Unauthorized'});
   try{const result=await store.transaction(tx=>handler(ctx,tx,JSON.parse(call.request.json)));callback(null,{json:JSON.stringify(result)});}catch{callback({code:grpc.status.UNAVAILABLE,message:'Query unavailable'});}
  };
  server.addService(service,handlers);await new Promise((resolve,reject)=>server.bindAsync('0.0.0.0:50051',grpc.ServerCredentials.createInsecure(),e=>e?reject(e):resolve()));ctx.grpcServer=server;
 }
 await module.register(ctx);
 let consumer;
 if(subscriptions[name].length){
  consumer=kafka.consumer({groupId:name});await consumer.connect();await consumer.subscribe({topics:subscriptions[name],fromBeginning:true});
  await consumer.run({eachMessage:async({message})=>{
   const event=JSON.parse(message.value.toString());
   await store.transaction(async tx=>{
    if(await tx.seen(event.eventId))return;
    if(module.event)await module.event(ctx,tx,event);
    await tx.remember(event.eventId);
   });
  }});
 }
 consumerReady=true;
 let publishing=false;
 const publisher=setInterval(async()=>{
  if(publishing)return;publishing=true;
  try{await store.transaction(async tx=>{for(const entry of await tx.pending()){await producer.send({topic:entry.event.eventType,messages:[{key:entry.event.aggregateId,value:JSON.stringify(entry.event)}]});await tx.mark(entry._id);}});}catch{console.error(JSON.stringify({service:name,error:'OUTBOX_RETRY'}));}finally{publishing=false;}
 },300);
 let background;
 if(module.tick){let running=false;background=setInterval(async()=>{if(running)return;running=true;try{await module.tick(ctx);}catch{console.error(JSON.stringify({service:name,error:'BACKGROUND_RETRY'}));}finally{running=false;}},500);}
 app.use((req,res)=>res.status(404).json({error:{code:'NOT_FOUND',message:'Operation not found',fieldErrors:[],correlationId:h.id()}}));
 app.use((error,req,res,next)=>{const status=error.status||500;res.status(status).json({error:{code:error.code|| (status===400?'VALIDATION_ERROR':'INTERNAL_ERROR'),message:status>=500?'Service unavailable':error.code||'Invalid request',fieldErrors:[],correlationId:req.headers['x-correlation-id']||h.id()}});});
 const server=app.listen(3000,'0.0.0.0');ready=consumerReady;
 process.on('SIGTERM',async()=>{ready=false;clearInterval(publisher);if(background)clearInterval(background);server.close();if(consumer)await consumer.disconnect();await producer.disconnect();if(redis)await redis.quit();await store.close();process.exit(0);});
 console.log(JSON.stringify({service:name,status:'READY'}));
 return ctx;
}
