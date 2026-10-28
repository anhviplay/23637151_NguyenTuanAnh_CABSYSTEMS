export async function register(c){
 c.route('GET','/api/v1/drivers/:driverId',['DRIVER','OPERATIONS'],async({tx,actor,params})=>{
  if(actor.actorType==='DRIVER'&&actor.actorId!==params.driverId)c.fail(403,'FORBIDDEN');if(actor.actorType==='OPERATIONS')c.permission(actor,'driver:read');const driver=await tx.get('driver',params.driverId);if(!driver)c.fail(404,'NOT_FOUND');return c.ok(publicDriver(driver));
 });
 c.route('PATCH','/api/v1/operations/drivers/:driverId/verification',['OPERATIONS'],async({tx,actor,body,params,correlationId})=>{
  c.permission(actor,'driver:verify');const driver=await tx.get('driver',params.driverId);if(!driver)c.fail(404,'NOT_FOUND');c.version(body,driver);if(!['ACTIVE','REJECTED'].includes(body.decision)||!body.reason)c.fail(400,'VALIDATION_ERROR');
  const updated={...driver,verificationStatus:body.decision,version:driver.version+1};await tx.put('driver',driver.driverId,updated);await c.emit(tx,'driver.verification-changed',driver.driverId,updated.version,{...publicDriver(updated),reason:body.reason,actorId:actor.actorId},correlationId);return c.ok(publicDriver(updated));
 });
 c.route('PATCH','/api/v1/drivers/me/availability',['DRIVER'],async({tx,actor,body,correlationId})=>{
  const driver=await tx.get('driver',actor.actorId);if(!driver)c.fail(404,'NOT_FOUND');c.version(body,driver);if(driver.currentTripId)c.fail(409,'ACTIVE_TRIP_EXISTS');if(!['AVAILABLE','OFFLINE'].includes(body.availability))c.fail(400,'VALIDATION_ERROR');if(body.availability==='AVAILABLE'&&driver.verificationStatus!=='ACTIVE')c.fail(422,'DRIVER_NOT_ACTIVE');
  const updated={...driver,availability:body.availability,version:driver.version+1};await tx.put('driver',driver.driverId,updated);await c.emit(tx,'driver.availability-changed',driver.driverId,updated.version,publicDriver(updated),correlationId);return c.ok(publicDriver(updated));
 });
}
function publicDriver(d){return {driverId:d.driverId,verificationStatus:d.verificationStatus,availability:d.availability,vehicleIds:d.vehicles.map(v=>v.vehicleId),version:d.version};}
export const grpc={CheckDriverEligibility:async(c,tx,input)=>{
 const d=await tx.get('driver',input.driverId);const v=d?.vehicles.find(v=>v.serviceType===input.serviceType);const eligible=!!d&&d.verificationStatus==='ACTIVE'&&d.availability==='AVAILABLE'&&!d.currentTripId&&!!v;return {eligible,availability:d?.availability||'OFFLINE',vehicleId:v?.vehicleId||null,reasonCode:eligible?null:'DRIVER_NOT_ELIGIBLE'};
}};
export async function event(c,tx,e){
 const p=e.payload;
 if(e.eventType==='identity.account-created'&&p.actorType==='DRIVER'){
  const driver={driverId:p.actorId,accountId:p.accountId,fullName:p.fullName,phoneCipher:p.phoneCipher,licenseCipher:p.licenseCipher,vehicles:[p.vehicle],verificationStatus:'PENDING_VERIFICATION',availability:'OFFLINE',currentTripId:null,version:1};await tx.put('driver',p.actorId,driver);await c.emit(tx,'driver.profile-submitted',p.actorId,1,{...publicDriver(driver),fullName:driver.fullName},e.correlationId);return;
 }
 if(!p.driverId)return;const d=await tx.get('driver',p.driverId);if(!d)return;
 if(e.eventType==='booking.driver-assigned'){if(await tx.get('closed_booking',p.bookingId))return;await tx.put('driver',p.driverId,{...d,availability:'BUSY',currentTripId:p.bookingId,version:d.version+1});return;}
 if(e.eventType==='trip.completed'||e.eventType==='booking.cancelled'||(e.eventType==='trip.status-changed'&&p.currentStatus==='CANCELED')){
  await tx.put('closed_booking',p.bookingId,{closedAt:c.now()});if(d.currentTripId&&d.currentTripId!==p.bookingId&&d.currentTripId!==p.tripId)return;
  await tx.put('driver',p.driverId,{...d,currentTripId:null,availability:d.availability==='OFFLINE'?'OFFLINE':d.verificationStatus==='ACTIVE'?'AVAILABLE':'OFFLINE',version:d.version+1});
 }
}
