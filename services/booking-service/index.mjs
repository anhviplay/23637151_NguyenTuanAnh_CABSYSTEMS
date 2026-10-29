export async function register(c){
 c.route('POST','/api/v1/bookings',['CUSTOMER'],async({tx,actor,body,correlationId})=>{
  c.requireFields(body,'pickup','destination','serviceType');c.coordinates(body.pickup.location);c.coordinates(body.destination.location);if(!['BIKE','CAR_4','CAR_7'].includes(body.serviceType))c.fail(400,'VALIDATION_ERROR');
  const booking={bookingId:c.id(),customerId:actor.actorId,pickup:body.pickup,destination:body.destination,serviceType:body.serviceType,status:'SEARCHING',createdAt:c.now(),version:1};await tx.put('booking',booking.bookingId,booking);await c.emit(tx,'booking.created',booking.bookingId,1,booking,correlationId);return c.ok(booking,201);
 });
 c.route('GET','/api/v1/bookings/:bookingId',['CUSTOMER'],async({tx,actor,params})=>{const b=await tx.get('booking',params.bookingId);c.owned(actor,b);return c.ok(c.rideView(b));});
 c.route('GET','/api/v1/customers/me/bookings',['CUSTOMER'],async({tx,actor,query})=>{const list=(await tx.list('booking')).filter(b=>b.customerId===actor.actorId).sort((a,b)=>b.createdAt.localeCompare(a.createdAt)||a.bookingId.localeCompare(b.bookingId));return {...c.page(list.map(c.rideView),query),status:200};});
 c.route('GET','/api/v1/drivers/me/assignments/current',['DRIVER'],async({tx,actor})=>{const current=(await tx.list('assignment')).find(a=>a.driverId===actor.actorId&&a.status==='OFFERED'&&Date.parse(a.expiresAt)>Date.now());return c.ok(current||null);});
 c.route('POST','/api/v1/assignments/:assignmentId/responses',['DRIVER'],async({tx,actor,params,body,correlationId})=>{
  const a=await tx.get('assignment',params.assignmentId);c.owned(actor,a,'driverId');const b=await tx.get('booking',a.bookingId);
  if(!['ACCEPTED','REJECTED'].includes(body.decision))c.fail(400,'VALIDATION_ERROR');if(a.status!=='OFFERED'||b.status!=='SEARCHING'||Date.parse(a.expiresAt)<=Date.now())c.fail(409,'ASSIGNMENT_NOT_AVAILABLE');
  const updated={...a,status:body.decision,respondedAt:c.now()};await tx.put('assignment',a.assignmentId,updated);await c.emit(tx,'assignment.responded',a.assignmentId,2,updated,correlationId);
  if(body.decision==='ACCEPTED'){
   const reservation=await tx.get('reservation',a.driverId);if(reservation?.bookingId&&reservation.bookingId!==b.bookingId)c.fail(409,'DRIVER_ALREADY_ASSIGNED');
   const eligible=await c.rpc('driver','CheckDriverEligibility',{driverId:a.driverId,serviceType:b.serviceType,bookingId:b.bookingId});if(!eligible.eligible)c.fail(409,'DRIVER_NOT_ELIGIBLE');
   await tx.put('reservation',a.driverId,{bookingId:b.bookingId});const version=b.version+1;const assigned={...b,status:'DRIVER_ASSIGNED',driverId:a.driverId,vehicleId:eligible.vehicleId,driverInfo:eligible.driverInfo,assignmentId:a.assignmentId,version};await tx.put('booking',b.bookingId,assigned);
   await c.emit(tx,'booking.driver-assigned',b.bookingId,version,{...assigned,acceptedAt:c.now()},correlationId);
  }
  return c.ok(updated);
 });
 c.route('POST','/api/v1/bookings/:bookingId/cancellations',['CUSTOMER'],async({tx,actor,params,body,correlationId})=>{
  const b=await tx.get('booking',params.bookingId);c.owned(actor,b);c.version(body,b);c.requireFields(body,'reasonCode');
  if(!['SEARCHING','DRIVER_ASSIGNED','TRIP_CREATED'].includes(b.status)||['PICKED_UP','IN_PROGRESS','COMPLETED'].includes(b.tripStatus))c.fail(422,'CANCELLATION_NOT_ALLOWED');
  const updated={...b,status:'CANCELED',version:b.version+1};await tx.put('booking',b.bookingId,updated);for(const a of await tx.list('assignment'))if(a.bookingId===b.bookingId&&a.status==='OFFERED')await tx.put('assignment',a.assignmentId,{...a,status:'EXPIRED'});
  if(b.driverId)await tx.put('reservation',b.driverId,{bookingId:null});await c.emit(tx,'booking.cancelled',b.bookingId,updated.version,{bookingId:b.bookingId,tripId:b.tripId,driverId:b.driverId,customerId:b.customerId,cancelledBy:actor.actorId,reasonCode:body.reasonCode,cancelledAt:c.now()},correlationId);return c.ok(updated);
 });
}
export async function tick(c){
 await c.store.transaction(async tx=>{
  for(const b of (await tx.list('booking')).filter(x=>x.status==='SEARCHING')){
   const history=(await tx.list('assignment')).filter(a=>a.bookingId===b.bookingId);const active=history.find(a=>a.status==='OFFERED');if(active&&Date.parse(active.expiresAt)>Date.now())continue;
   if(active)await tx.put('assignment',active.assignmentId,{...active,status:'NO_RESPONSE'});
   const near=await c.rpc('location','FindNearbyDrivers',{pickup:b.pickup.location,serviceType:b.serviceType,radiusMeters:Number(process.env.DISPATCH_RADIUS_METERS)});let selected;
   for(const driver of near.drivers){if(history.some(a=>a.driverId===driver.driverId))continue;const reserved=await tx.get('reservation',driver.driverId);if(reserved?.bookingId)continue;const eligible=await c.rpc('driver','CheckDriverEligibility',{driverId:driver.driverId,serviceType:b.serviceType,bookingId:b.bookingId});if(eligible.eligible){selected={...driver,vehicleId:eligible.vehicleId};break;}}
   if(!selected){await tx.put('booking',b.bookingId,{...b,status:'NO_DRIVER_AVAILABLE',version:b.version+1});await c.emit(tx,'booking.no-driver-available',b.bookingId,b.version+1,{bookingId:b.bookingId,customerId:b.customerId});continue;}
   const eta=await c.rpc('location','EstimateETA',{driverId:selected.driverId,pickup:b.pickup.location});const assignment={assignmentId:c.id(),bookingId:b.bookingId,driverId:selected.driverId,vehicleId:selected.vehicleId,pickup:b.pickup,serviceType:b.serviceType,status:'OFFERED',sequence:history.length+1,expiresAt:new Date(Date.now()+Number(process.env.ASSIGNMENT_RESPONSE_SECONDS)*1000).toISOString()};
   await tx.put('assignment',assignment.assignmentId,assignment);await tx.put('booking',b.bookingId,{...b,etaSeconds:eta.etaSeconds});await c.emit(tx,'assignment.offered',assignment.assignmentId,1,assignment);
  }
 });
}
export async function event(c,tx,e){
 const p=e.payload;if(!p.bookingId)return;const b=await tx.get('booking',p.bookingId);if(!b)return;
 if(e.eventType==='trip.status-changed'){
  if(b.tripVersion&&b.tripVersion>=e.aggregateVersion)return;
  const status=p.currentStatus==='CREATED'?'TRIP_CREATED':p.currentStatus==='CANCELED'?'CANCELED':b.status;
  await tx.put('booking',b.bookingId,{...b,tripId:p.tripId,tripStatus:p.currentStatus,tripVersion:e.aggregateVersion,status,version:b.version+1});
 }
 if(e.eventType==='trip.completed'){await tx.put('booking',b.bookingId,{...b,tripId:p.tripId,tripVersion:e.aggregateVersion,status:'COMPLETED',tripStatus:'COMPLETED',version:b.version+1});}
 if(e.eventType==='trip.completed'||p.currentStatus==='CANCELED')if(b.driverId)await tx.put('reservation',b.driverId,{bookingId:null});
}
