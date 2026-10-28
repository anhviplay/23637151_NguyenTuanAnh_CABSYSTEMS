import http from 'node:http';
import https from 'node:https';
import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { randomUUID, createHmac, timingSafeEqual } from 'node:crypto';
import { pathToFileURL } from 'node:url';

export function signature(body, secret) {
  const fields = ['eventId','providerReference','merchantReference','result','amount','currency','occurredAt'];
  return createHmac('sha256', secret).update(fields.map(k => String(body[k])).join('|')).digest('hex');
}
function equal(a,b) {
  const x=Buffer.from(String(a||'')), y=Buffer.from(String(b||''));
  return x.length===y.length && timingSafeEqual(x,y);
}
export function createSandbox({path=':memory:', apiKey, callbackSecret, callbackUrl, timeoutMs=5000,tls}) {
  if (!apiKey || !callbackSecret || !callbackUrl) throw Error('Sandbox configuration missing');
  const callback=new URL(callbackUrl);
  if (!['http:','https:'].includes(callback.protocol)) throw Error('Invalid callback URL');
  const db=new DatabaseSync(path);
  db.exec(`PRAGMA journal_mode=WAL; CREATE TABLE IF NOT EXISTS payments (
    reference TEXT PRIMARY KEY, merchant TEXT NOT NULL, command TEXT UNIQUE NOT NULL,
    request TEXT NOT NULL, response TEXT NOT NULL, result TEXT, event TEXT,
    delivered INTEGER NOT NULL DEFAULT 0, attempts INTEGER NOT NULL DEFAULT 0,
    UNIQUE(merchant,command));`);
  let active=false;
  async function deliver(reference) {
    const row=db.prepare('SELECT * FROM payments WHERE reference=?').get(reference);
    if (!row?.event) return {delivered:false};
    try {
      const response=await fetch(callbackUrl,{method:'POST',headers:{'Content-Type':'application/json'},body:row.event,signal:AbortSignal.timeout(timeoutMs),redirect:'error'});
      const ok=response.status===204;
      db.prepare('UPDATE payments SET delivered=?,attempts=attempts+1 WHERE reference=?').run(ok?1:0,reference);
      return {delivered:ok,callbackStatus:response.status};
    } catch {
      db.prepare('UPDATE payments SET attempts=attempts+1 WHERE reference=?').run(reference);
      return {delivered:false,callbackStatus:'UNAVAILABLE'};
    }
  }
  const handler=async(req,res)=>{
    function send(status,data){res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(data));}
    try {
      const path=new URL(req.url,'http://sandbox').pathname;
      if(req.method==='GET'&&path==='/health'){db.prepare('SELECT 1').get();return send(200,{status:'HEALTHY'});}
      if(!equal(req.headers['x-sandbox-key'],apiKey))return send(401,{error:{code:'SANDBOX_UNAUTHORIZED'}});
      const segments=path.split('/').filter(Boolean);
      let data={};
      if(req.method==='POST'){
        let size=0;const chunks=[];
        for await(const chunk of req){size+=chunk.length;if(size>16384)return send(413,{error:{code:'PAYLOAD_TOO_LARGE'}});chunks.push(chunk);}
        try{data=JSON.parse(Buffer.concat(chunks).toString()||'{}');}catch{return send(400,{error:{code:'INVALID_JSON'}});}
      }
      if(req.method==='POST'&&path==='/payments'){
        const fields=['paymentId','merchantReference','amount','currency','commandId'];
        if(fields.some(k=>data[k]===undefined)||!Number.isSafeInteger(data.amount)||data.amount<=0||data.currency!=='VND'||!fields.filter(k=>k!=='amount').every(k=>typeof data[k]==='string'&&data[k].length>0&&data[k].length<200))return send(400,{error:{code:'INVALID_PAYMENT'}});
        if(data.callbackUrl&&data.callbackUrl!==callbackUrl)return send(400,{error:{code:'CALLBACK_URL_NOT_ALLOWED'}});
        const request=JSON.stringify(Object.fromEntries(fields.map(k=>[k,data[k]])));
        const old=db.prepare('SELECT * FROM payments WHERE command=?').get(data.commandId);
        if(old)return old.request===request?send(201,JSON.parse(old.response)):send(409,{error:{code:'IDEMPOTENCY_CONFLICT'}});
        const reference=randomUUID();
        const response={providerReference:reference,providerStatus:'PENDING'};
        db.prepare('INSERT INTO payments(reference,merchant,command,request,response) VALUES(?,?,?,?,?)').run(reference,data.merchantReference,data.commandId,request,JSON.stringify(response));
        return send(201,response);
      }
      if(segments[0]==='payments'&&segments[1]){
        const row=db.prepare('SELECT * FROM payments WHERE reference=?').get(segments[1]);
        if(!row)return send(404,{error:{code:'PAYMENT_NOT_FOUND'}});
        if(req.method==='GET'&&segments.length===2)return send(200,{providerReference:row.reference,merchantReference:row.merchant,providerStatus:row.result||'PENDING',callbackDelivered:!!row.delivered,callbackAttempts:row.attempts});
        if(req.method==='POST'&&segments[2]==='settle'){
          if(!['SUCCESS','FAILED'].includes(data.result))return send(400,{error:{code:'INVALID_RESULT'}});
          if(row.result&&row.result!==data.result)return send(409,{error:{code:'RESULT_ALREADY_RECORDED'}});
          if(!row.result){
            const original=JSON.parse(row.request);
            const event={eventId:randomUUID(),providerReference:row.reference,merchantReference:row.merchant,result:data.result,amount:original.amount,currency:original.currency,occurredAt:new Date().toISOString()};
            event.signature=signature(event,callbackSecret);
            db.prepare('UPDATE payments SET result=?,event=? WHERE reference=?').run(data.result,JSON.stringify(event),row.reference);
          }
          return send(200,{providerReference:row.reference,result:data.result,...await deliver(row.reference)});
        }
        if(req.method==='POST'&&segments[2]==='replay-callback'){
          if(!row.event)return send(409,{error:{code:'PAYMENT_NOT_SETTLED'}});
          return send(200,{providerReference:row.reference,...await deliver(row.reference)});
        }
      }
      return send(404,{error:{code:'NOT_FOUND'}});
    } catch {return send(500,{error:{code:'SANDBOX_INTERNAL_ERROR'}});}
  };
  const server=tls?https.createServer(tls,handler):http.createServer(handler);
  const timer=setInterval(async()=>{
    if(active)return;active=true;
    try{for(const row of db.prepare('SELECT reference FROM payments WHERE event IS NOT NULL AND delivered=0 LIMIT 20').all())await deliver(row.reference);}finally{active=false;}
  },10000);
  timer.unref();
  return {server,db,close:async()=>{clearInterval(timer);await new Promise(resolve=>server.close(resolve));db.close();}};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
  const tls=process.env.TLS_CERT_FILE?{cert:fs.readFileSync(process.env.TLS_CERT_FILE),key:fs.readFileSync(process.env.TLS_KEY_FILE)}:undefined;
  const sandbox=createSandbox({path:process.env.DATABASE_PATH||'/data/payments.sqlite',apiKey:process.env.SANDBOX_API_KEY,callbackSecret:process.env.PAYMENT_CALLBACK_SECRET,callbackUrl:process.env.PAYMENT_CALLBACK_URL,tls});
  sandbox.server.listen(Number(process.env.PORT||3000),'0.0.0.0',()=>console.log('Payment sandbox ready'));
  process.on('SIGTERM',async()=>{await sandbox.close();process.exit(0);});
}
