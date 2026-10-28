import {test} from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import {createSandbox,signature} from './server.mjs';

test('sandbox contract: authorization, idempotency, signed callback, replay and result guard',async()=>{
  const events=[];
  const receiver=http.createServer(async(req,res)=>{let body='';for await(const chunk of req)body+=chunk;events.push(JSON.parse(body));res.writeHead(204);res.end();});
  await new Promise(resolve=>receiver.listen(0,'127.0.0.1',resolve));
  const callbackUrl=`http://127.0.0.1:${receiver.address().port}/callback`;
  const app=createSandbox({apiKey:'test-only-key',callbackSecret:'test-only-signature-key',callbackUrl});
  await new Promise(resolve=>app.server.listen(0,'127.0.0.1',resolve));
  const base=`http://127.0.0.1:${app.server.address().port}`;
  const call=(path,body,key='test-only-key')=>fetch(base+path,{method:body?'POST':'GET',headers:{'Content-Type':'application/json','x-sandbox-key':key},body:body?JSON.stringify(body):undefined});
  try{
    assert.equal((await call('/payments',{},'wrong')).status,401);
    const data={paymentId:'test-payment',merchantReference:'test-payment',amount:50000,currency:'VND',commandId:'test-command',callbackUrl};
    const first=await call('/payments',data);assert.equal(first.status,201);const created=await first.json();
    const replay=await call('/payments',data);assert.equal(replay.status,201);assert.deepEqual(await replay.json(),created);
    assert.equal((await call('/payments',{...data,amount:60000})).status,409);
    assert.equal(app.db.prepare('SELECT count(*) AS n FROM payments').get().n,1);
    assert.equal((await call(`/payments/${created.providerReference}/settle`,{result:'SUCCESS'})).status,200);
    assert.equal(events.length,1);assert.equal(events[0].signature,signature(events[0],'test-only-signature-key'));
    await call(`/payments/${created.providerReference}/replay-callback`,{});assert.equal(events.length,2);assert.deepEqual(events[0],events[1]);
    assert.equal((await call(`/payments/${created.providerReference}/settle`,{result:'FAILED'})).status,409);
    assert.equal((await (await call(`/payments/${created.providerReference}`)).json()).providerStatus,'SUCCESS');
    assert.equal((await call('/payments',{...data,commandId:'bad-callback',callbackUrl:'http://unapproved.invalid/'})).status,400);
  }finally{await app.close();await new Promise(resolve=>receiver.close(resolve));}
});
