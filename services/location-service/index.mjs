async function nearby(c,tx,input){
 c.coordinates(input);const radius=Number(input.radiusMeters||process.env.DISPATCH_RADIUS_METERS);if(!Number.isFinite(radius)||radius<=0)c.fail(400,'INVALID_RADIUS');
 const hits=await c.redis.sendCommand(['GEOSEARCH','drivers:current','FROMLONLAT',String(input.longitude),String(input.latitude),'BYRADIUS',String(radius),'m','ASC','WITHDIST']);
 const list=[];
 for(const [driverId,dist] of hits){const position=await tx.get('current',driverId);if(position&&Date.now()-Date.parse(position.observedAt)<=Number(process.env.LOCATION_MAX_AGE_SECONDS)*1000)list.push({driverId,distanceMeters:Number(dist),observedAt:position.observedAt});}
 return list.sort((a,b)=>a.distanceMeters-b.distanceMeters||a.driverId.localeCompare(b.driverId));
}
export async function register(c){
 c.route('POST','/api/v1/drivers/me/locations',['DRIVER'],async({tx,actor,body})=>{
  c.coordinates(body);c.requireFields(body,'observedAt','sequence');if(!Number.isInteger(body.sequence)||!Number.isFinite(Date.parse(body.observedAt)))c.fail(400,'VALIDATION_ERROR');
  const old=await tx.get('current',actor.actorId);if(old&&body.sequence<=old.sequence)c.fail(409,'LOCATION_SEQUENCE_CONFLICT');
  const position={locationId:c.id(),driverId:actor.actorId,latitude:body.latitude,longitude:body.longitude,observedAt:body.observedAt,sequence:body.sequence,receivedAt:c.now()};
  await tx.put('history',position.locationId,position);await tx.put('current',actor.actorId,position);await c.redis.sendCommand(['GEOADD','drivers:current',String(body.longitude),String(body.latitude),actor.actorId]);
  return c.ok({locationId:position.locationId,receivedAt:position.receivedAt,acceptedForDispatch:Date.now()-Date.parse(body.observedAt)<=Number(process.env.LOCATION_MAX_AGE_SECONDS)*1000},201);
 });
 c.route('GET','/api/v1/drivers/nearby',['OPERATIONS'],async({tx,actor,query})=>{c.permission(actor,'location:read');const list=await nearby(c,tx,{latitude:Number(query.latitude),longitude:Number(query.longitude),radiusMeters:query.radiusMeters});return {...c.page(list,query),status:200};});
}
export const grpc={
 FindNearbyDrivers:async(c,tx,input)=>({drivers:await nearby(c,tx,{...input.pickup,radiusMeters:input.radiusMeters})}),
 EstimateETA:async(c,tx,input)=>{const position=await tx.get('current',input.driverId);if(!position)return {etaSeconds:null,distanceMeters:null,calculatedAt:c.now()};const meters=c.distance(position,input.pickup);return {etaSeconds:Math.ceil(meters/Number(process.env.ETA_SPEED_METERS_PER_SECOND)),distanceMeters:meters,calculatedAt:c.now()};}
};
