import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
export async function register(c){
 const permissions=['health:read','customer:read','driver:read','driver:verify','location:read','booking:read','trip:read','payment:read','audit:read','payment:sandbox'];
 if(process.env.BOOTSTRAP_OPERATIONS_PASSWORD)await c.store.transaction(async tx=>{
  const phone=process.env.BOOTSTRAP_OPERATIONS_PHONE,lookup='OPERATIONS:'+c.phoneKey(phone);
  const existing=await tx.get('phone',lookup);
  if(!existing){
   const accountId=c.id(),actorId=c.id();await tx.put('account',accountId,{accountId,actorId,actorType:'OPERATIONS',phoneCipher:c.encrypt(phone),passwordHash:await c.passwordHash(process.env.BOOTSTRAP_OPERATIONS_PASSWORD),permissions,status:'ACTIVE'});await tx.put('phone',lookup,{accountId});
  }else{const account=await tx.get('account',existing.accountId);await tx.put('account',account.accountId,{...account,permissions});}
 });
 for(const type of ['CUSTOMER','DRIVER']){
  const segment=type.toLowerCase();
  c.route('POST',`/api/v1/auth/${segment}/registration-otp`,'PUBLIC',async({tx,body})=>{
   const key=type+':'+c.phoneKey(body.phoneNumber),otp=String(crypto.randomInt(100000,1000000));
   await tx.put('otp',key,{hash:crypto.createHmac('sha256',process.env.JWT_SECRET).update(key+':'+otp).digest('hex'),expiresAt:Date.now()+Number(process.env.OTP_TTL_SECONDS)*1000,used:false});
   await tx.put('otp_delivery',key,{encryptedCode:c.encrypt(otp),channel:'LOCAL_SANDBOX',createdAt:c.now()});
   return c.ok({},202);
  });
  if(type==='DRIVER')c.route('POST','/api/v1/auth/driver/registration-otp/verify','PUBLIC',async({tx,body})=>{
   const key='DRIVER:'+c.phoneKey(body.phoneNumber);await checkOtp(c,tx,key,body.otp);
   const proof=jwt.sign({phoneKey:key,purpose:'DRIVER_REGISTRATION'},process.env.JWT_SECRET,{algorithm:'HS256',jwtid:c.id(),expiresIn:Number(process.env.OTP_TTL_SECONDS)});
   return c.ok({otpVerificationToken:proof});
  });
  c.route('POST',`/api/v1/auth/${segment}/registrations`,'PUBLIC',async({tx,body,correlationId})=>{
   c.requireFields(body,'phoneNumber','password');const lookup=type+':'+c.phoneKey(body.phoneNumber);
   if(await tx.get('phone',lookup))c.fail(409,'PHONE_ALREADY_EXISTS');
   if(type==='CUSTOMER')await checkOtp(c,tx,lookup,body.otp);
   else{
    let proof;try{proof=jwt.verify(body.otpVerificationToken,process.env.JWT_SECRET,{algorithms:['HS256']});}catch{c.fail(400,'OTP_INVALID');}
    if(proof.phoneKey!==lookup||proof.purpose!=='DRIVER_REGISTRATION')c.fail(400,'OTP_INVALID');
    if(await tx.get('used_proof',proof.jti))c.fail(409,'OTP_ALREADY_USED');
    c.requireFields(body,'fullName','licenseNumber','vehicle');c.requireFields(body.vehicle,'plateNumber','serviceType');
    if(!['BIKE','CAR_4','CAR_7'].includes(body.vehicle.serviceType))c.fail(400,'VALIDATION_ERROR');
    await tx.put('used_proof',proof.jti,{usedAt:c.now()});
   }
   const accountId=c.id(),actorId=c.id();const account={accountId,actorId,actorType:type,phoneCipher:c.encrypt(body.phoneNumber),passwordHash:await c.passwordHash(body.password),status:'ACTIVE',permissions:[]};
   await tx.put('account',accountId,account);await tx.put('phone',lookup,{accountId});
   const payload={accountId,actorId,actorType:type,fullName:body.fullName||'',phoneCipher:account.phoneCipher};
   if(type==='DRIVER'){payload.licenseCipher=c.encrypt(body.licenseNumber);payload.vehicle={vehicleId:c.id(),plateCipher:c.encrypt(body.vehicle.plateNumber),serviceType:body.vehicle.serviceType};}
   await c.emit(tx,'identity.account-created',accountId,1,payload,correlationId);
   return c.ok({...c.cleanAccount(account),status:type==='DRIVER'?'PENDING_VERIFICATION':'ACTIVE'},201);
  });
 }
 c.route('POST','/api/v1/auth/sessions','PUBLIC',async({tx,body})=>{
  c.requireFields(body,'phoneNumber','password','actorType');if(!['CUSTOMER','DRIVER','OPERATIONS'].includes(body.actorType))c.fail(400,'VALIDATION_ERROR');
  const ref=await tx.get('phone',body.actorType+':'+c.phoneKey(body.phoneNumber));const account=ref?await tx.get('account',ref.accountId):null;
  if(!account||!await c.passwordMatches(body.password,account.passwordHash))c.fail(401,'INVALID_CREDENTIALS');
  if(account.status!=='ACTIVE')c.fail(403,'ACCOUNT_DISABLED');
  const accessToken=c.tokenFor(account),refreshToken=crypto.randomBytes(32).toString('hex');await tx.put('session',c.id(),{accountId:account.accountId,refreshHash:crypto.createHash('sha256').update(refreshToken).digest('hex'),createdAt:c.now()});
  return c.ok({accessToken,refreshToken,expiresAt:new Date(Date.now()+Number(process.env.TOKEN_TTL_SECONDS)*1000).toISOString(),actorId:account.actorId,accountId:account.accountId,actorType:account.actorType});
 },{idempotent:false});
 c.route('GET','/api/v1/sandbox/otp','PUBLIC',async({tx,query,req})=>{
  if(req.headers['x-sandbox-key']!==process.env.SANDBOX_API_KEY)c.fail(403,'FORBIDDEN');
  const key=String(query.actorType)+':'+c.phoneKey(query.phoneNumber),message=await tx.get('otp_delivery',key);if(!message)c.fail(404,'NOT_FOUND');
  return c.ok({otp:c.decrypt(message.encryptedCode)});
 });
}
async function checkOtp(c,tx,key,code){
 const otp=await tx.get('otp',key);if(!otp)c.fail(400,'OTP_INVALID');if(otp.used)c.fail(409,'OTP_ALREADY_USED');if(otp.expiresAt<Date.now())c.fail(400,'OTP_EXPIRED');
 const actual=crypto.createHmac('sha256',process.env.JWT_SECRET).update(key+':'+String(code)).digest('hex');
 if(actual!==otp.hash)c.fail(400,'OTP_INVALID');await tx.put('otp',key,{...otp,used:true});
}
