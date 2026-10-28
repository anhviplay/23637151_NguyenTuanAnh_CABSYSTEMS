import crypto from 'node:crypto';
export async function register(c){
 await c.store.transaction(async tx=>{for(const [serviceType,pricePerKm] of Object.entries({BIKE:5000,CAR_4:10000,CAR_7:13000}))if(!await tx.get('service_rate',serviceType))await tx.put('service_rate',serviceType,{rateId:c.id(),serviceType,pricePerKm,effectiveFrom:c.now()});});
 c.route('GET','/api/v1/trips/:tripId/fare',['CUSTOMER'],async({tx,actor,params})=>{const fare=await tx.get('fare',params.tripId);if(!fare)c.fail(409,'FARE_NOT_READY');c.owned(actor,fare);return c.ok(fare);});
 c.route('GET','/api/v1/payments/:paymentId',['CUSTOMER'],async({tx,actor,params})=>{const payment=await tx.get('payment',params.paymentId);c.owned(actor,payment);return c.ok(payment);});
 c.route('PATCH','/api/v1/payments/:paymentId/method',['CUSTOMER'],async({tx,actor,params,body,req,correlationId})=>{
  const payment=await tx.get('payment',params.paymentId);c.owned(actor,payment);c.version(body,payment);if(!['CASH','ELECTRONIC'].includes(body.method))c.fail(400,'VALIDATION_ERROR');
  if(payment.status==='COMPLETED'||(payment.method&&payment.status!=='FAILED'))c.fail(409,'PAYMENT_INVALID_STATE');
  const updated={...payment,method:body.method,status:'PENDING',version:payment.version+1,updatedAt:c.now()};
  if(body.method==='ELECTRONIC')Object.assign(updated,await requestProvider(c,updated,req.headers['idempotency-key']));
  await tx.put('payment',payment.paymentId,updated);await c.emit(tx,'payment.status-changed',payment.paymentId,updated.version,updated,correlationId);return c.ok(updated);
 });
 c.route('POST','/api/v1/payments/:paymentId/retry',['CUSTOMER'],async({tx,actor,params,req,correlationId})=>{
  const payment=await tx.get('payment',params.paymentId);c.owned(actor,payment);if(payment.status!=='FAILED'||payment.method!=='ELECTRONIC')c.fail(409,'PAYMENT_INVALID_STATE');
  const updated={...payment,status:'PENDING',version:payment.version+1,updatedAt:c.now(),...await requestProvider(c,payment,req.headers['idempotency-key'])};await tx.put('payment',payment.paymentId,updated);await c.emit(tx,'payment.status-changed',payment.paymentId,updated.version,updated,correlationId);return c.ok(updated,202);
 });
 c.route('POST','/api/v1/payments/:paymentId/cash-confirmation',['DRIVER'],async({tx,actor,params,correlationId})=>{
  const payment=await tx.get('payment',params.paymentId);c.owned(actor,payment,'driverId');if(payment.method!=='CASH'||payment.status!=='PENDING')c.fail(409,'PAYMENT_INVALID_STATE');
  const updated={...payment,status:'COMPLETED',version:payment.version+1,updatedAt:c.now()};await tx.put('payment',payment.paymentId,updated);await c.emit(tx,'payment.status-changed',payment.paymentId,updated.version,updated,correlationId);return c.ok(updated);
 });
 c.route('POST','/api/v1/integrations/payments/local-sandbox/results','PUBLIC',async({tx,body,correlationId})=>{
  const fields=['eventId','providerReference','merchantReference','result','amount','currency','occurredAt'];c.requireFields(body,...fields,'signature');
  const expected=crypto.createHmac('sha256',process.env.PAYMENT_CALLBACK_SECRET).update(fields.map(k=>String(body[k])).join('|')).digest('hex');const actual=Buffer.from(String(body.signature)),wanted=Buffer.from(expected);
  if(actual.length!==wanted.length||!crypto.timingSafeEqual(actual,wanted))c.fail(401,'INVALID_CALLBACK_SIGNATURE');
  if(await tx.get('callback',body.eventId))return c.ok(null,204);
  const payment=await tx.get('payment',body.merchantReference);if(!payment)c.fail(404,'PAYMENT_NOT_FOUND');
  if(payment.providerReference!==body.providerReference||payment.totalAmount!==body.amount||body.currency!=='VND'||!['SUCCESS','FAILED'].includes(body.result))c.fail(409,'PAYMENT_RECONCILIATION_FAILED');
  if(payment.status!=='COMPLETED'&&payment.method==='ELECTRONIC'){
   const updated={...payment,status:body.result==='SUCCESS'?'COMPLETED':'FAILED',version:payment.version+1,updatedAt:c.now()};await tx.put('payment',payment.paymentId,updated);await c.emit(tx,'payment.status-changed',payment.paymentId,updated.version,updated,correlationId);
  }
  await tx.put('callback',body.eventId,{processedAt:c.now()});return c.ok(null,204);
 },{idempotent:false});
}
async function requestProvider(c,payment,key){
 let response;try{response=await fetch('https://payment-sandbox:3000/payments',{method:'POST',headers:{'Content-Type':'application/json','X-Sandbox-Key':process.env.SANDBOX_API_KEY},body:JSON.stringify({paymentId:payment.paymentId,merchantReference:payment.paymentId,amount:payment.totalAmount,currency:'VND',commandId:payment.paymentId+':'+key,callbackUrl:'https://gateway:8443/api/v1/integrations/payments/local-sandbox/results'}),signal:AbortSignal.timeout(5000)});}catch{c.fail(503,'PAYMENT_PROVIDER_UNAVAILABLE');}
 if(!response.ok)c.fail(502,'PAYMENT_PROVIDER_ERROR');const data=await response.json();return {providerReference:data.providerReference};
}
export async function event(c,tx,e){
 if(e.eventType!=='trip.completed')return;const p=e.payload;if(await tx.get('fare',p.tripId))return;const rate=await tx.get('service_rate',p.serviceType);if(!rate||!Number.isFinite(p.distanceKm)||p.distanceKm<0)throw Error('Invalid fare input');
 const fare={fareId:c.id(),rateId:rate.rateId,tripId:p.tripId,bookingId:p.bookingId,customerId:p.customerId,driverId:p.driverId,serviceType:p.serviceType,billableDistanceKm:p.distanceKm,pricePerKm:rate.pricePerKm,totalAmount:Math.round(p.distanceKm*rate.pricePerKm),currency:'VND',paymentId:c.id(),version:1};
 const payment={paymentId:fare.paymentId,fareId:fare.fareId,tripId:p.tripId,bookingId:p.bookingId,customerId:p.customerId,driverId:p.driverId,totalAmount:fare.totalAmount,currency:'VND',method:null,status:'PENDING',providerReference:null,version:1,updatedAt:c.now()};await tx.put('fare',p.tripId,fare);await tx.put('payment',payment.paymentId,payment);
}
