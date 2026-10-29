export async function register(c){
 c.route('GET','/api/v1/trips/:tripId',['CUSTOMER','DRIVER'],async({tx,actor,params})=>{const trip=await tx.get('trip',params.tripId);c.owned(actor,trip,actor.actorType==='DRIVER'?'driverId':'customerId');return c.ok(c.rideView(trip));});
 c.route('GET','/api/v1/customers/me/trips',['CUSTOMER'],async({tx,actor,query})=>({...c.page((await tx.list('trip')).filter(t=>t.customerId===actor.actorId).map(c.rideView),query),status:200}));
 c.route('POST','/api/v1/trips/:tripId/status-transitions',['DRIVER'],async({tx,actor,params,body,correlationId})=>{
  const trip=await tx.get('trip',params.tripId);c.owned(actor,trip,'driverId');c.version(body,trip);const next={CREATED:'DRIVER_ARRIVED',DRIVER_ARRIVED:'PICKED_UP',PICKED_UP:'IN_PROGRESS',IN_PROGRESS:'COMPLETED'};
  if(next[trip.status]!==body.targetStatus)c.fail(409,'TRIP_INVALID_TRANSITION');if(!Number.isFinite(Date.parse(body.occurredAt)))c.fail(400,'VALIDATION_ERROR');
  if(body.targetStatus==='COMPLETED'&&(!Number.isFinite(body.distanceKm)||body.distanceKm<0))c.fail(400,'DISTANCE_REQUIRED');
  const updated={...trip,status:body.targetStatus,version:trip.version+1,history:[...trip.history,{status:body.targetStatus,occurredAt:body.occurredAt}]};if(body.targetStatus==='COMPLETED')updated.distanceKm=body.distanceKm;
  await tx.put('trip',trip.tripId,updated);await statusEvent(c,tx,updated,trip.status,correlationId);
  if(updated.status==='COMPLETED')await c.emit(tx,'trip.completed',trip.tripId,updated.version,{tripId:trip.tripId,bookingId:trip.bookingId,customerId:trip.customerId,driverId:trip.driverId,serviceType:trip.serviceType,distanceKm:updated.distanceKm,completedAt:body.occurredAt},correlationId);
  return c.ok(c.rideView(updated));
 });
 c.route('POST','/api/v1/trips/:tripId/driver-cancellation',['DRIVER'],async({tx,actor,params,body,correlationId})=>{
  const trip=await tx.get('trip',params.tripId);c.owned(actor,trip,'driverId');c.version(body,trip);c.requireFields(body,'reasonCode');if(!['CREATED','DRIVER_ARRIVED'].includes(trip.status))c.fail(422,'CANCELLATION_NOT_ALLOWED');
  const updated={...trip,status:'CANCELED',version:trip.version+1,reasonCode:body.reasonCode};await tx.put('trip',trip.tripId,updated);await statusEvent(c,tx,updated,trip.status,correlationId);return c.ok(c.rideView(updated));
 });
}
async function statusEvent(c,tx,t,previous,correlationId){await c.emit(tx,'trip.status-changed',t.tripId,t.version,{tripId:t.tripId,bookingId:t.bookingId,driverId:t.driverId,customerId:t.customerId,previousStatus:previous,currentStatus:t.status,occurredAt:c.now(),reasonCode:t.reasonCode},correlationId);}
export async function event(c,tx,e){
 const p=e.payload;
 if(e.eventType==='payment.status-changed'){
  const trip=await tx.get('trip',p.tripId);if(!trip)return;
  if(trip.paymentVersion>=e.aggregateVersion||trip.paymentStatus==='COMPLETED')return;
  await tx.put('trip',trip.tripId,{...trip,paymentId:p.paymentId,paymentStatus:p.status,paymentVersion:e.aggregateVersion,paidAt:p.status==='COMPLETED'?p.updatedAt:null});return;
 }
 if(e.eventType==='booking.driver-assigned'){
  if(await tx.get('cancelled_booking',p.bookingId))return;if((await tx.list('trip')).some(t=>t.bookingId===p.bookingId))return;
  const trip={tripId:c.id(),bookingId:p.bookingId,assignmentId:p.assignmentId,customerId:p.customerId,driverId:p.driverId,vehicleId:p.vehicleId,driverInfo:p.driverInfo,serviceType:p.serviceType,paymentStatus:'PENDING',paidAt:null,pickup:p.pickup,destination:p.destination,status:'CREATED',version:1,history:[{status:'CREATED',occurredAt:c.now()}]};await tx.put('trip',trip.tripId,trip);await statusEvent(c,tx,trip,null,e.correlationId);
 }
 if(e.eventType==='booking.cancelled'){
  await tx.put('cancelled_booking',p.bookingId,{cancelledAt:c.now()});const trip=(await tx.list('trip')).find(t=>t.bookingId===p.bookingId);if(!trip)return;if(trip.status==='CANCELED')return;if(!['CREATED','DRIVER_ARRIVED'].includes(trip.status))throw Error('Cancellation state conflict');const updated={...trip,status:'CANCELED',version:trip.version+1,reasonCode:p.reasonCode};await tx.put('trip',trip.tripId,updated);await statusEvent(c,tx,updated,trip.status,e.correlationId);
 }
}
