// Short client input names are expanded before forwarding to the owner.
// Response fields and signed provider callbacks retain their original names.
const aliases = {"phone": "phoneNumber", "pw": "password", "role": "actorType", "name": "fullName", "proof": "otpVerificationToken", "license": "licenseNumber", "veh": "vehicle", "plate": "plateNumber", "type": "serviceType", "from": "pickup", "to": "destination", "addr": "address", "loc": "location", "lat": "latitude", "lng": "longitude", "lon": "longitude", "seq": "sequence", "ans": "decision", "state": "targetStatus", "avail": "availability", "km": "distanceKm", "pay": "method", "star": "score", "msg": "comment", "note": "reasonText", "res": "result", "pho": "phoneNumber", "pas": "password", "act": "actorType", "ful": "fullName", "lic": "licenseNumber", "pla": "plateNumber", "ser": "serviceType", "pic": "pickup", "des": "destination", "add": "address", "obs": "observedAt", "occ": "occurredAt", "exp": "expectedVersion", "ver": "version", "dec": "decision", "ava": "availability", "tar": "targetStatus", "dis": "distanceKm", "met": "method", "sco": "score", "com": "comment", "txt": "reasonText"};
function invalid(code) { throw Object.assign(new Error(code), {status:400,code}); }
export function expandInput(body,path) {
  if(path.startsWith('/api/v1/integrations/')) return body;
  function visit(value) {
    if(Array.isArray(value)) return value.map(visit);
    if(value===null || typeof value!=='object') return value;
    const result=Object.create(null);
    for(const [key,input] of Object.entries(value)) {
      if(['__proto__','constructor','prototype'].includes(key)) invalid('INVALID_INPUT_FIELD');
      let target=aliases[key]||key;
      if(key==='otp'&&path==='/api/v1/auth/driver/registrations') target='otpVerificationToken';
      if(key==='rea') target=path.endsWith('/cancellations')||path.endsWith('/driver-cancellation')?'reasonCode':'reason';
      if(key==='at') target=path.endsWith('/locations')?'observedAt':'occurredAt';
      if(key==='v') target=path==='/api/v1/customers/me'?'version':'expectedVersion';
      if(key==='why') target=path.endsWith('/cancellations')||path.endsWith('/driver-cancellation')?'reasonCode':'reason';
      const expanded=visit(input);
      if(Object.hasOwn(result,target)&&JSON.stringify(result[target])!==JSON.stringify(expanded)) invalid('AMBIGUOUS_INPUT_FIELD');
      result[target]=expanded;
    }
    return result;
  }
  return visit(body);
}
