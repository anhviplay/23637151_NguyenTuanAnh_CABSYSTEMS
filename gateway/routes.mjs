// Expand before authentication, rate limiting and forwarding so aliases cannot
// acquire different permissions, limits or idempotency scopes.
export const routes = [["GET", "/hea", "/health"], ["GET", "/rea", "/ready"], ["GET", "/hea/all", "/health/services"], ["POST", "/log", "/api/v1/auth/sessions"], ["POST", "/cus/otp", "/api/v1/auth/customer/registration-otp"], ["POST", "/cus/reg", "/api/v1/auth/customer/registrations"], ["POST", "/dri/otp", "/api/v1/auth/driver/registration-otp"], ["POST", "/dri/ver", "/api/v1/auth/driver/registration-otp/verify"], ["POST", "/dri/reg", "/api/v1/auth/driver/registrations"], ["GET", "/otp/cus/:phone", "/api/v1/sandbox/otp?phoneNumber=:phone&actorType=CUSTOMER"], ["GET", "/otp/dri/:phone", "/api/v1/sandbox/otp?phoneNumber=:phone&actorType=DRIVER"], ["GET", "/cus/me/boo", "/api/v1/customers/me/bookings"], ["GET", "/cus/me/tri", "/api/v1/customers/me/trips"], ["PATCH", "/cus/me", "/api/v1/customers/me"], ["GET", "/cus/:id", "/api/v1/customers/:id"], ["GET", "/dri/near", "/api/v1/drivers/nearby"], ["GET", "/dri/ass", "/api/v1/drivers/me/assignments/current"], ["PATCH", "/dri/ava", "/api/v1/drivers/me/availability"], ["POST", "/dri/loc", "/api/v1/drivers/me/locations"], ["GET", "/dri/:id/rat", "/api/v1/drivers/:id/rating-summary"], ["GET", "/dri/:id", "/api/v1/drivers/:id"], ["POST", "/ass/:id", "/api/v1/assignments/:id/responses"], ["POST", "/boo", "/api/v1/bookings"], ["POST", "/boo/:id/can", "/api/v1/bookings/:id/cancellations"], ["GET", "/boo/:id", "/api/v1/bookings/:id"], ["POST", "/tri/:id/sta", "/api/v1/trips/:id/status-transitions"], ["POST", "/tri/:id/can", "/api/v1/trips/:id/driver-cancellation"], ["GET", "/tri/:id/far", "/api/v1/trips/:id/fare"], ["POST", "/tri/:id/rat", "/api/v1/trips/:id/ratings"], ["GET", "/tri/:id", "/api/v1/trips/:id"], ["PATCH", "/pay/:id/met", "/api/v1/payments/:id/method"], ["POST", "/pay/:id/ret", "/api/v1/payments/:id/retry"], ["POST", "/pay/:id/cas", "/api/v1/payments/:id/cash-confirmation"], ["GET", "/pay/:id", "/api/v1/payments/:id"], ["POST", "/pay/:id/ok", "/api/v1/sandbox/payments/:id/settle"], ["POST", "/pay/:id/rep", "/api/v1/sandbox/payments/:id/replay-callback"], ["GET", "/not", "/api/v1/notifications/me"], ["GET", "/ops/dri", "/api/v1/operations/drivers"], ["PATCH", "/ops/dri/:id/ver", "/api/v1/operations/drivers/:id/verification"], ["GET", "/ops/boo", "/api/v1/operations/bookings"], ["GET", "/ops/tri", "/api/v1/operations/trips"], ["GET", "/ops/pay", "/api/v1/operations/payments"], ["GET", "/ops/aud", "/api/v1/operations/audit-entries"]];
const queryNames={lat:'latitude',lon:'longitude',rad:'radiusMeters',pag:'page',lim:'pageSize'};
function bad(){throw Object.assign(Error('AMBIGUOUS_QUERY_FIELD'),{status:400,code:'AMBIGUOUS_QUERY_FIELD'});}
export function expandRoute(method,url){
 const split=url.indexOf('?'),path=split<0?url:url.slice(0,split),query=split<0?'':url.slice(split+1);
 const actual=path.split('/');
 for(const [verb,short,full] of routes){
  if(verb!==method)continue;const parts=short.split('/');if(parts.length!==actual.length)continue;
  const params={};let match=true;
  for(let i=0;i<parts.length;i++){if(parts[i].startsWith(':')){if(!actual[i]){match=false;break;}params[parts[i].slice(1)]=actual[i];}else if(parts[i]!==actual[i]){match=false;break;}}
  if(!match)continue;
  let expanded;try{expanded=full.replace(/:(phone|id)\b/g,(_,key)=>encodeURIComponent(decodeURIComponent(params[key])));}catch{throw Object.assign(Error('INVALID_URL'),{status:400,code:'INVALID_URL'});}
  const target=new URL(expanded,'http://gateway');
  for(const [key,value] of new URLSearchParams(query)){
   const name=queryNames[key]||key;
   if(target.searchParams.has(name)&&target.searchParams.get(name)!==value)bad();
   target.searchParams.set(name,value);
  }
  return target.pathname+target.search;
 }
 return url;
}
