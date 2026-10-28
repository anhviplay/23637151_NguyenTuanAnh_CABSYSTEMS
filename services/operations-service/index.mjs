export async function register(c){
 const mappings={drivers:'driver',bookings:'booking',trips:'trip',payments:'payment'};
 for(const [path,kind] of Object.entries(mappings))c.route('GET','/api/v1/operations/'+path,['OPERATIONS'],async({tx,actor,query})=>{c.permission(actor,kind+':read');return {...c.page(await tx.list(kind),query),status:200};});
 c.route('GET','/api/v1/operations/audit-entries',['OPERATIONS'],async({tx,actor,query})=>{c.permission(actor,'audit:read');return {...c.page(await tx.list('audit'),query),status:200};});
}
export async function event(c,tx,e){
 const p=e.payload;const kind=e.eventType.startsWith('driver.')?'driver':e.eventType.startsWith('booking.')?'booking':e.eventType.startsWith('trip.')?'trip':e.eventType.startsWith('payment.')?'payment':null;
 const key=kind&&p[kind+'Id'];if(key){const old=await tx.get(kind,key);await tx.put(kind,key,{...old,...p,lastEvent:e.eventType,updatedAt:c.now()});}
 const auditId=c.id();await tx.put('audit',auditId,{auditId,actorId:p.actorId||e.producer,action:e.eventType,targetId:e.aggregateId,occurredAt:e.occurredAt,correlationId:e.correlationId});
}
