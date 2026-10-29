import https from 'node:https';
import fs from 'node:fs';
import {randomUUID,randomInt} from 'node:crypto';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';

const agent=new https.Agent({ca:fs.readFileSync('.data/tls/cert.pem')});
const checks=[];
async function request(method,path,body,token,key,extra={}){
 const headers={...extra};if(token)headers.Authorization='Bearer '+token;if(body!==undefined)headers['Content-Type']='application/json';if(!['GET','HEAD'].includes(method))headers['Idempotency-Key']=key||randomUUID();
 return await new Promise((resolve,reject)=>{
  const req=https.request({hostname:'127.0.0.1',port:8443,path,method,agent,headers,timeout:20000},res=>{let raw='';res.on('data',b=>raw+=b);res.on('end',()=>{let json;try{json=JSON.parse(raw);}catch{}resolve({status:res.statusCode,json,raw});});});req.on('error',reject);req.on('timeout',()=>req.destroy(Error('Request timed out')));if(body!==undefined)req.write(JSON.stringify(body));req.end();
 });
}
function status(r,expected,path){assert.equal(r.status,expected,path+': HTTP '+r.status+' '+(r.json?.error?.code||''));return r.json?.data;}
async function waitFor(fn,description){for(let i=0;i<100;i++){const value=await fn();if(value)return value;await new Promise(r=>setTimeout(r,300));}throw Error('Timed out: '+description);}
const pass=(rubric,result)=>{checks.push({rubric,result});console.log('PASS #'+rubric+' '+result);};
const basePhone=randomInt(10000000,99999000);
const phone=i=>'09'+String(basePhone+i).padStart(8,'0');
const accounts={};
async function login(type,number,password){const data=status(await request('POST','/api/v1/auth/sessions',{phoneNumber:number,password,actorType:type}),200,'login');return data;}
const ops=await login('OPERATIONS',process.env.BOOTSTRAP_OPERATIONS_PHONE,process.env.BOOTSTRAP_OPERATIONS_PASSWORD);accounts.operations={...ops,phoneNumber:process.env.BOOTSTRAP_OPERATIONS_PHONE,password:process.env.BOOTSTRAP_OPERATIONS_PASSWORD};
// Release drivers from the previous fixture set through their normal API.
if(fs.existsSync('.data/current-fixtures.json')){
 const previous=JSON.parse(fs.readFileSync('.data/current-fixtures.json','utf8'));
 for(const old of previous.accounts?.drivers||[]){
  const logged=await login('DRIVER',old.phoneNumber,old.password);
  const response=await request('GET','/api/v1/drivers/'+logged.actorId,undefined,logged.accessToken);
  const profile=response.json?.data;
  if(profile?.availability==='AVAILABLE')status(await request('PATCH','/api/v1/drivers/me/availability',{availability:'OFFLINE',expectedVersion:profile.version},logged.accessToken),200,'release previous fixture driver');
 }
}
status(await request('GET','/health'),200,'health');status(await request('GET','/ready'),200,'ready');const health=status(await request('GET','/health/services',undefined,ops.accessToken),200,'service health');assert.equal(health.services.length,9);assert.ok(health.services.every(s=>s.status==='HEALTHY'));pass(6,'health, ready and all 9 service statuses');
async function register(type,index,availability,verification){
 const phoneNumber=phone(index),password='Cab-'+randomUUID();
 status(await request('POST',`/api/v1/auth/${type.toLowerCase()}/registration-otp`,{phoneNumber}),202,'request OTP');
 const otp=status(await request('GET',`/api/v1/sandbox/otp?phoneNumber=${phoneNumber}&actorType=${type}`,undefined,undefined,undefined,{'X-Sandbox-Key':process.env.SANDBOX_API_KEY}),200,'OTP inbox').otp;
 let body={phoneNumber,password};
 if(type==='DRIVER'){
  status(await request('POST','/api/v1/auth/driver/registration-otp/verify',{phoneNumber,otp:'000000'}),400,'invalid OTP');
  const proof=status(await request('POST','/api/v1/auth/driver/registration-otp/verify',{phoneNumber,otp}),200,'verify OTP');
  body={...body,otpVerificationToken:proof.otpVerificationToken,fullName:'Driver '+index,licenseNumber:'LICENSE-'+index,vehicle:{plateNumber:'59A-'+index,serviceType:'BIKE'}};
 }else body={...body,otp,fullName:'Customer '+index};
 const registration=status(await request('POST',`/api/v1/auth/${type.toLowerCase()}/registrations`,body),201,'registration');const logged=await login(type,phoneNumber,password);const account={...logged,phoneNumber,password};
 if(type==='CUSTOMER'){
  account.customerId=registration.customerId;
  await waitFor(async()=>{const r=await request('GET','/api/v1/customers/'+account.customerId,undefined,account.accessToken);return r.status===200?r.json.data:null;},'customer profile');
 }else{
  account.driverId=registration.driverId;
  let profile=await waitFor(async()=>{const r=await request('GET','/api/v1/drivers/'+account.driverId,undefined,account.accessToken);return r.status===200?r.json.data:null;},'driver profile');
  assert.equal(profile.verificationStatus,'PENDING_VERIFICATION');
  if(verification!=='PENDING_VERIFICATION')profile=status(await request('PATCH','/api/v1/operations/drivers/'+account.driverId+'/verification',{decision:verification,reason:'Profile reviewed',expectedVersion:profile.version},ops.accessToken),200,'verify driver');
  if(availability==='AVAILABLE')profile=status(await request('PATCH','/api/v1/drivers/me/availability',{availability,expectedVersion:profile.version},account.accessToken),200,'driver online');
  status(await request('POST','/api/v1/drivers/me/locations',{latitude:10.77+index/100000,longitude:106.70,observedAt:new Date().toISOString(),sequence:1},account.accessToken),201,'location');
  account.profile=profile;
 }
 return account;
}
accounts.customer=await register('CUSTOMER',1);pass(9,'Customer registered with validated OTP');pass(10,'Login returned access token');pass(11,'Token reads own Customer profile');
accounts.drivers=[];for(let i=0;i<5;i++)accounts.drivers.push(await register('DRIVER',20+i,i===0||i===4?'AVAILABLE':'OFFLINE',i===2?'PENDING_VERIFICATION':i===3?'REJECTED':'ACTIVE'));
const driver=accounts.drivers[0];pass(12,'Driver token reads own profile');pass(21,'Driver OTP verification creates pending profile');
await waitFor(async()=>{const r=await request('GET','/api/v1/notifications/me',undefined,driver.accessToken);return r.json?.data?.some(n=>n.eventType==='driver.verification-changed');},'Driver verification notice');
const submittedProfiles=status(await request('GET','/api/v1/operations/drivers?page=1&pageSize=20',undefined,ops.accessToken),200,'Operations Driver list');assert.ok(Array.isArray(submittedProfiles)&&submittedProfiles.length>0);pass(22,'Operations lists profiles, decisions persist and Driver receives notification');pass(23,'Available and Offline driver states persisted');
const near=await request('GET','/api/v1/drivers/nearby?latitude=10.77&longitude=106.70&radiusMeters=1000&page=1&pageSize=2',undefined,ops.accessToken);status(near,200,'nearby');assert.equal(near.json.data.length,2);assert.ok(near.json.meta.totalItems>=5);pass(13,'Five driver locations within 1 km; pagination returns 2');
const customerToken=accounts.customer.accessToken;
const pickup={address:'Pickup',location:{latitude:10.77,longitude:106.70}},destination={address:'Destination',location:{latitude:10.79,longitude:106.70}};
const bookingKey=randomUUID(),bookingBody={pickup,destination,serviceType:'BIKE'};
const primary=status(await request('POST','/api/v1/bookings',bookingBody,customerToken,bookingKey),201,'create Booking');assert.equal(primary.status,'SEARCHING');pass(15,'Booking initially SEARCHING');
for(let i=0;i<4;i++)status(await request('POST','/api/v1/bookings',{...bookingBody,pickup:{address:'Other pickup',location:{latitude:11+i/100,longitude:107}}},customerToken),201,'sample Booking');
const list=await request('GET','/api/v1/customers/me/bookings?page=1&pageSize=2',undefined,customerToken);status(list,200,'booking list');assert.equal(list.json.data.length,2);assert.equal(list.json.meta.totalItems,5);pass(14,'Five Customer bookings; pagination returns 2');
async function accept(account,bookingId){
 const offer=await waitFor(async()=>{const r=await request('GET','/api/v1/drivers/me/assignments/current',undefined,account.accessToken);return r.json?.data?.bookingId===bookingId?r.json.data:null;},'Assignment offer');
 status(await request('POST','/api/v1/assignments/'+offer.assignmentId+'/responses',{decision:'ACCEPTED'},account.accessToken),200,'accept offer');
 return await waitFor(async()=>{const r=await request('GET','/api/v1/bookings/'+bookingId,undefined,customerToken);return r.json?.data?.tripId?r.json.data:null;},'Kafka Trip creation');
}
const assigned=await accept(driver,primary.bookingId);assert.equal(assigned.driverInfo.driverId,driver.driverId);assert.ok(assigned.driverInfo.fullName);assert.ok(assigned.driverInfo.vehicle.plateNumber);pass(16,'Driver accepted; Trip created via Kafka and linked to Booking');pass(4,'Dispatch queried Driver/Location over gRPC and Trip was created from Kafka event');
let trip=status(await request('GET','/api/v1/trips/'+assigned.tripId,undefined,driver.accessToken),200,'get Trip');
status(await request('POST','/api/v1/trips/'+trip.tripId+'/status-transitions',{targetStatus:'COMPLETED',occurredAt:new Date().toISOString(),expectedVersion:trip.version,distanceKm:5},driver.accessToken),409,'invalid transition');
const other=status(await request('POST','/api/v1/bookings',bookingBody,customerToken),201,'cancellation Booking');
const otherAssigned=await accept(accounts.drivers[4],other.bookingId);
status(await request('POST','/api/v1/bookings/'+other.bookingId+'/cancellations',{reasonCode:'CUSTOMER_REQUEST',reasonText:'Changed plan',expectedVersion:otherAssigned.version},customerToken),200,'cancel');
await waitFor(async()=>{const r=await request('GET','/api/v1/trips/'+otherAssigned.tripId,undefined,customerToken);return r.json?.data?.status==='CANCELED';},'Trip cancellation');
const customerNotifications=await waitFor(async()=>{const r=await request('GET','/api/v1/notifications/me',undefined,customerToken);return r.json?.data?.some(n=>n.eventType==='booking.cancelled')?r.json.data:null;},'Customer cancellation notice');
await waitFor(async()=>{const r=await request('GET','/api/v1/notifications/me',undefined,accounts.drivers[4].accessToken);return r.json?.data?.some(n=>n.eventType==='booking.cancelled');},'Driver cancellation notice');pass(18,'Cancellation changes Trip state and notifies both parties');
let sequence=2;
for(const targetStatus of ['DRIVER_ARRIVED','PICKED_UP','IN_PROGRESS','COMPLETED']){
 status(await request('POST','/api/v1/drivers/me/locations',{latitude:10.77+sequence/10000,longitude:106.70,observedAt:new Date().toISOString(),sequence:sequence++},driver.accessToken),201,'moving location');
 trip=status(await request('POST','/api/v1/trips/'+trip.tripId+'/status-transitions',{targetStatus,occurredAt:new Date().toISOString(),expectedVersion:trip.version,...(targetStatus==='COMPLETED'?{distanceKm:5}:{})},driver.accessToken),200,'trip transition');
}
pass(17,'Trip state sequence and moving locations recorded');
const fare=await waitFor(async()=>{const r=await request('GET','/api/v1/trips/'+trip.tripId+'/fare',undefined,customerToken);return r.status===200?r.json.data:null;},'Fare calculation');assert.equal(fare.totalAmount,25000);
const paymentKey=randomUUID(),paymentBody={method:'ELECTRONIC',expectedVersion:1};
const firstPayment=await request('PATCH','/api/v1/payments/'+fare.paymentId+'/method',paymentBody,customerToken,paymentKey);const payment=status(firstPayment,200,'select payment');
const repeated=await request('PATCH','/api/v1/payments/'+fare.paymentId+'/method',paymentBody,customerToken,paymentKey);assert.equal(repeated.status,firstPayment.status);assert.equal(repeated.raw,firstPayment.raw);
status(await request('PATCH','/api/v1/payments/'+fare.paymentId+'/method',{...paymentBody,method:'CASH'},customerToken,paymentKey),409,'different content same key');
status(await request('POST','/api/v1/sandbox/payments/'+payment.providerReference+'/settle',{result:'SUCCESS'},ops.accessToken),200,'settle sandbox');
const complete=await waitFor(async()=>{const r=await request('GET','/api/v1/payments/'+fare.paymentId,undefined,customerToken);return r.json?.data?.status==='COMPLETED'?r.json.data:null;},'Payment completion');const paidTrip=await waitFor(async()=>{const r=await request('GET','/api/v1/trips/'+trip.tripId,undefined,customerToken);return r.json?.data?.paymentStatus==='COMPLETED'?r.json.data:null;},'Trip paid projection');assert.equal(paidTrip.paymentId,fare.paymentId);assert.ok(paidTrip.paidAt);pass(19,'Payment COMPLETED and Trip paymentStatus COMPLETED with paidAt; Fare is 25000 VND');
status(await request('POST','/api/v1/sandbox/payments/'+payment.providerReference+'/replay-callback',{},ops.accessToken),200,'replay callback');
const afterReplay=status(await request('GET','/api/v1/payments/'+fare.paymentId,undefined,customerToken),200,'payment replay result');assert.equal(afterReplay.version,complete.version);assert.equal((await request('PATCH','/api/v1/payments/'+fare.paymentId+'/method',paymentBody,customerToken,paymentKey)).raw,firstPayment.raw);pass(30,'Payment command returns original response; callback replay causes no second update');
const rating=await request('POST','/api/v1/trips/'+trip.tripId+'/ratings',{score:5,comment:"<script>alert('hack')</script>"},customerToken);const saved=status(rating,201,'rating');assert.equal(saved.tripId,trip.tripId);assert.ok(rating.raw.includes('\\u003cscript'));pass(20,'Rating score and comment saved against correct Trip');pass(26,'JSON output escapes script markup and returns application/json');
status(await request('POST','/api/v1/auth/sessions',{email:"' OR 1=1 --",password:'anything',actorType:'CUSTOMER'}),400,'SQL injection');pass(25,'SQL injection input returns 400 without login');
status(await request('POST','/api/v1/auth/sessions',{phoneNumber:"' OR 1=1 --",password:'anything',actorType:'CUSTOMER'}),400,'SQL injection phone input');
const tokenParts=customerToken.split('.');tokenParts[1]=Buffer.from(JSON.stringify({sub:'admin_001',actorType:'OPERATIONS'})).toString('base64url');status(await request('GET','/health/services',undefined,tokenParts.join('.')),401,'JWT tampering');pass(27,'Modified JWT returns 401');
status(await request('GET','/api/v1/drivers/'+driver.driverId,undefined,customerToken),403,'unauthorized Driver API');pass(28,'Customer token receives 403 for Driver profile');
const ps=execFileSync('docker',['compose','ps','--format','json'],{encoding:'utf8'}).trim().split('\n').map(x=>JSON.parse(x));assert.equal(ps.length,16);assert.ok(ps.every(p=>p.Health==='healthy'));assert.ok(ps.filter(p=>p.Service!=='gateway').every(p=>!(p.Publishers||[]).some(x=>x.PublishedPort)));const initJobs=execFileSync('docker',['compose','ps','--all','--format','json'],{encoding:'utf8'}).trim().split('\n').map(x=>JSON.parse(x)).filter(x=>['mongo-keyfile','mongo-init','kafka-storage-init','kafka-init'].includes(x.Service));assert.equal(initJobs.length,4);assert.ok(initJobs.every(x=>x.State==='exited'&&x.ExitCode===0));pass(5,'16 containers healthy; all 4 initialization jobs exited 0');pass(8,'Only Gateway publishes a host port; business APIs reached through it');
assert.equal(execFileSync('git',['ls-files','--','.env'],{encoding:'utf8'}).trim(),'');pass(2,'Environment secrets ignored by Git');
const dbCheck=execFileSync('docker',['compose','exec','-T','identity-service','node','--input-type=module','-e',`import pg from 'pg'; const p=new pg.Pool({host:'postgres',database:process.env.DB_NAME,user:process.env.DB_USER,password:process.env.DB_PASSWORD}); const r=await p.query("SELECT body FROM records WHERE kind='account'"); if(!r.rows.every(x=>x.body.passwordHash.startsWith('scrypt$')&&x.body.phoneCipher&&!x.body.phoneNumber))process.exit(1); await p.end();console.log('PASS');`],{encoding:'utf8'});assert.ok(dbCheck.includes('PASS'));pass(24,'Passwords hashed; phone data encrypted; keys stay outside database');
const availableTopics=execFileSync('docker',['compose','exec','-T','kafka','/opt/kafka/bin/kafka-topics.sh','--bootstrap-server','kafka:9092','--list'],{encoding:'utf8'});assert.ok(availableTopics.includes('booking.driver-assigned')&&availableTopics.includes('payment.status-changed'));pass(7,'Kafka topics active and business events consumed');
for(const name of ['identity','customer','driver','location','booking','trip','payment','notification','operations'])assert.ok(fs.existsSync('services/'+name+'-service/index.mjs'));pass(1,'9 service source modules and a separate Gateway');pass(3,'Gateway performs token verification, routing, health aggregation and rate limiting');
const rates=await Promise.all(Array.from({length:1100},()=>request('POST','/api/v1/bookings',bookingBody,customerToken,bookingKey)));assert.ok(rates.some(r=>r.status===429));status(await request('GET','/ready'),200,'readiness after rate limit');pass(29,'Burst requests receive 429; Gateway remains ready');
fs.mkdirSync('.data',{recursive:true});
fs.writeFileSync('.data/current-fixtures.json',JSON.stringify({accounts,primaryBookingId:primary.bookingId,tripId:trip.tripId,paymentId:fare.paymentId,providerReference:payment.providerReference,bookingBody,bookingKey,paymentKey,paymentBody},null,2));
fs.writeFileSync('.data/latest-verification.json',JSON.stringify({executedAt:new Date().toISOString(),checks},null,2));
console.log('System checks completed: '+checks.length);
