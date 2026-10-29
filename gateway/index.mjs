import express from 'express';
import helmet from 'helmet';
import https from 'node:https';
import fs from 'node:fs';
import {expandInput} from './input.mjs';
import {createClient} from 'redis';
import {decodeToken,id,now,fail} from '../shared/helpers.mjs';
const services=['identity','customer','driver','location','booking','trip','payment','notification','operations'].map(x=>x+'-service');
const app=express();app.use(helmet());app.set('json escape',true);app.use(express.json({limit:'64kb'}));
const redis=createClient({url:`redis://:${encodeURIComponent(process.env.REDIS_PASSWORD)}@redis-gateway:6379`});redis.on('error',()=>{});await redis.connect();
const envelope=data=>({data,meta:{correlationId:id(),occurredAt:now()}});
app.get('/health',(req,res)=>res.json(envelope({status:'HEALTHY'})));
app.get('/ready',async(req,res)=>{try{await redis.ping();res.json(envelope({status:'READY'}));}catch{res.status(503).json(envelope({status:'NOT_READY'}));}});
app.use(async(req,res,next)=>{
 try{
  const path=req.path;
  const publicPath=/^\/api\/v1\/auth\/(sessions|(?:customer|driver)\/(?:registrations|registration-otp(?:\/verify)?))$/.test(path)||path==='/api/v1/integrations/payments/local-sandbox/results'||path==='/api/v1/sandbox/otp';
  const actor=publicPath?null:decodeToken(req.headers.authorization);req.actor=actor;
  const rateKey='rate:'+req.ip+':'+(actor?.sub||'public')+':'+req.method+':'+path;const count=Number(await redis.eval("local n=redis.call('INCR',KEYS[1]);if n==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]);end;return n",{keys:[rateKey],arguments:[String(process.env.RATE_LIMIT_WINDOW_SECONDS)]}));
  if(count>Number(process.env.RATE_LIMIT_REQUESTS)){res.set('Retry-After',process.env.RATE_LIMIT_WINDOW_SECONDS);fail(429,'RATE_LIMIT_EXCEEDED');}
  next();
 }catch(e){next(e);}
});
app.get('/health/services',async(req,res)=>{
 if(req.actor?.actorType!=='OPERATIONS'||!req.actor.permissions?.includes('health:read'))fail(403,'FORBIDDEN');
 const results=await Promise.all(services.map(async name=>{try{const r=await fetch(`http://${name}:3000/health`,{signal:AbortSignal.timeout(3000)});return {name,status:r.ok?'HEALTHY':'UNHEALTHY'};}catch{return {name,status:'UNKNOWN'};}}));res.json(envelope({services:results}));
});
app.use(async(req,res)=>{
 const path=req.path;let target;
 if(path.startsWith('/api/v1/sandbox/payments/')){
  if(req.actor?.actorType!=='OPERATIONS'||!req.actor.permissions?.includes('payment:sandbox'))fail(403,'FORBIDDEN');
  const sandboxPath=req.originalUrl.replace('/api/v1/sandbox','');
  req.body=expandInput(req.body,path);
  return proxy(req,res,'https://payment-sandbox:3000'+sandboxPath,{'X-Sandbox-Key':process.env.SANDBOX_API_KEY});
 }
 if(path.startsWith('/api/v1/auth/')||path==='/api/v1/sandbox/otp')target='identity';
 else if(path==='/api/v1/drivers/nearby'||path==='/api/v1/drivers/me/locations')target='location';
 else if(path.endsWith('/rating-summary')||/^\/api\/v1\/trips\/[^/]+\/ratings$/.test(path))target='customer';
 else if(path==='/api/v1/drivers/me/assignments/current'||path.startsWith('/api/v1/assignments/')||path.startsWith('/api/v1/bookings')||path==='/api/v1/customers/me/bookings')target='booking';
 else if(path.startsWith('/api/v1/payments/')||path.startsWith('/api/v1/integrations/payments/')||/^\/api\/v1\/trips\/[^/]+\/fare$/.test(path))target='payment';
 else if(path.startsWith('/api/v1/trips/')||path==='/api/v1/customers/me/trips')target='trip';
 else if(path.startsWith('/api/v1/customers/'))target='customer';
 else if(path.startsWith('/api/v1/drivers/')||/^\/api\/v1\/operations\/drivers\/[^/]+\/verification$/.test(path))target='driver';
 else if(path.startsWith('/api/v1/notifications/'))target='notification';
 else if(path.startsWith('/api/v1/operations/'))target='operations';
 else fail(404,'NOT_FOUND');
 req.body=expandInput(req.body,path);
 return proxy(req,res,`http://${target}-service:3000`+req.originalUrl);
});
async function proxy(req,res,url,extraHeaders={}){
 const headers={'X-Correlation-Id':req.headers['x-correlation-id']||id(),...extraHeaders};
 for(const key of ['authorization','idempotency-key','if-match','x-sandbox-key'])if(req.headers[key]&&!extraHeaders['X-Sandbox-Key'])headers[key]=req.headers[key];
 if(!['GET','HEAD'].includes(req.method))headers['Content-Type']='application/json';
 let response;try{response=await fetch(url,{method:req.method,headers,body:['GET','HEAD'].includes(req.method)?undefined:JSON.stringify(req.body||{}),signal:AbortSignal.timeout(15000),redirect:'manual'});}catch{fail(503,'SERVICE_UNAVAILABLE');}
 res.status(response.status);if(response.headers.get('content-type'))res.set('Content-Type',response.headers.get('content-type'));res.send(Buffer.from(await response.arrayBuffer()));
}
app.use((error,req,res,next)=>res.status(error.status||500).json({error:{code:error.code||(error.status===400?'VALIDATION_ERROR':'INTERNAL_ERROR'),message:error.status>=500?'Service unavailable':error.code||'Invalid request',fieldErrors:[],correlationId:id()}}));
https.createServer({key:fs.readFileSync('/tls/key.pem'),cert:fs.readFileSync('/tls/cert.pem')},app).listen(8443,'0.0.0.0',()=>console.log('Gateway ready'));
