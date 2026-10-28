export async function register(c){
 c.route('GET','/api/v1/customers/:customerId',['CUSTOMER','OPERATIONS'],async({tx,actor,params})=>{
  if(actor.actorType==='CUSTOMER'&&params.customerId!==actor.actorId)c.fail(403,'FORBIDDEN');if(actor.actorType==='OPERATIONS')c.permission(actor,'customer:read');
  const profile=await tx.get('customer',params.customerId);if(!profile)c.fail(404,'NOT_FOUND');return c.ok({customerId:profile.customerId,fullName:profile.fullName,status:profile.status,version:profile.version});
 });
 c.route('PATCH','/api/v1/customers/me',['CUSTOMER'],async({tx,actor,body})=>{
  const profile=await tx.get('customer',actor.actorId);if(!profile)c.fail(404,'NOT_FOUND');c.version(body,profile);if(typeof body.fullName!=='string')c.fail(400,'VALIDATION_ERROR');
  const updated={...profile,fullName:body.fullName,version:profile.version+1};await tx.put('customer',profile.customerId,updated);return c.ok({customerId:updated.customerId,fullName:updated.fullName,status:updated.status,version:updated.version});
 });
 c.route('POST','/api/v1/trips/:tripId/ratings',['CUSTOMER'],async({tx,actor,body,params,correlationId})=>{
  const completed=await tx.get('completed_trip',params.tripId);if(!completed)c.fail(409,'TRIP_NOT_READY_FOR_RATING');c.owned(actor,completed);
  if(await tx.get('rating',params.tripId))c.fail(409,'RATING_ALREADY_EXISTS');if(!Number.isInteger(body.score)||body.score<1||body.score>5||typeof body.comment!=='string'||!body.comment.trim())c.fail(400,'VALIDATION_ERROR');
  const rating={ratingId:c.id(),tripId:params.tripId,customerId:actor.actorId,driverId:completed.driverId,score:body.score,comment:body.comment,createdAt:c.now()};await tx.put('rating',params.tripId,rating);await c.emit(tx,'rating.submitted',rating.ratingId,1,rating,correlationId);return c.ok(rating,201);
 });
 c.route('GET','/api/v1/drivers/:driverId/rating-summary',['CUSTOMER','DRIVER','OPERATIONS'],async({tx,params})=>{const ratings=(await tx.list('rating')).filter(x=>x.driverId===params.driverId);return c.ok({driverId:params.driverId,ratingCount:ratings.length,averageScore:ratings.length?ratings.reduce((n,x)=>n+x.score,0)/ratings.length:null,updatedAt:c.now()});});
}
export async function event(c,tx,e){
 const p=e.payload;if(e.eventType==='identity.account-created'&&p.actorType==='CUSTOMER')await tx.put('customer',p.actorId,{customerId:p.actorId,accountId:p.accountId,fullName:p.fullName,phoneCipher:p.phoneCipher,status:'ACTIVE',version:1});
 if(e.eventType==='trip.completed')await tx.put('completed_trip',p.tripId,p);
}
