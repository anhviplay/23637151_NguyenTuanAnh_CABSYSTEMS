export async function register(c){
 c.route('GET','/api/v1/notifications/me',['CUSTOMER','DRIVER','OPERATIONS'],async({tx,actor,query})=>({...c.page((await tx.list('notification')).filter(n=>n.recipientId===actor.actorId).sort((a,b)=>b.createdAt.localeCompare(a.createdAt)),query),status:200}));
}
export async function event(c,tx,e){
 const p=e.payload;const recipients=[p.customerId,p.driverId].filter(Boolean);
 for(const recipientId of new Set(recipients)){
  const details={status:p.verificationStatus||p.currentStatus||p.status||(e.eventType==='booking.cancelled'?'CANCELED':null),reason:p.reason||p.reasonCode||null};
  const notification={notificationId:c.id(),recipientId,eventId:e.eventId,eventType:e.eventType,bookingId:p.bookingId,tripId:p.tripId,paymentId:p.paymentId,details,channel:'IN_APP',status:'AVAILABLE',createdAt:c.now()};await tx.put('notification',notification.notificationId,notification);
 }
}
