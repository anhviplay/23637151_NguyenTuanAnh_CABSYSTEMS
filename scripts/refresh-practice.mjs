import https from 'node:https';
import fs from 'node:fs';
import {randomInt,randomBytes,randomUUID} from 'node:crypto';
const agent=new https.Agent({ca:fs.readFileSync('.data/tls/cert.pem')});
const fixture=JSON.parse(fs.readFileSync('.data/current-fixtures.json','utf8'));
async function call(path,body,token,method='POST'){
 return new Promise((resolve,reject)=>{const req=https.request({hostname:'127.0.0.1',port:8443,path,method,agent,headers:{'Content-Type':'application/json','Idempotency-Key':randomUUID(),...(token?{Authorization:'Bearer '+token}:{})}},res=>{let raw='';res.on('data',b=>raw+=b);res.on('end',()=>{if(res.statusCode<200||res.statusCode>=300)return reject(Error('HTTP '+res.statusCode+' at '+path));resolve(JSON.parse(raw).data);});});req.on('error',reject);req.end(JSON.stringify(body));});
}
const entries=[['operations',fixture.accounts.operations,'OPERATIONS'],['customer',fixture.accounts.customer,'CUSTOMER'],...fixture.accounts.drivers.map((a,i)=>['driver'+i,a,'DRIVER'])];
for(const [name,account,actorType] of entries){Object.assign(account,await call('/api/v1/auth/sessions',{phoneNumber:account.phoneNumber,password:account.password,actorType}));}
for(let i=0;i<fixture.accounts.drivers.length;i++)await call('/api/v1/drivers/me/locations',{latitude:10.77+(20+i)/100000,longitude:106.70,observedAt:new Date().toISOString(),sequence:Date.now()},fixture.accounts.drivers[i].accessToken);
const customerProfile=await call('/api/v1/customers/'+fixture.accounts.customer.actorId,undefined,fixture.accounts.customer.accessToken,'GET');
if(customerProfile.fullName!=='Customer')await call('/api/v1/customers/me',{fullName:'Customer',version:customerProfile.version},fixture.accounts.customer.accessToken,'PATCH');
fs.writeFileSync('.data/current-fixtures.json',JSON.stringify(fixture,null,2));
const path='.data/CAB-Local.postman_environment.json';
if(fs.existsSync(path)){
 const environment=JSON.parse(fs.readFileSync(path,'utf8'));
 const values={baseUrl:'https://localhost:8443',sandboxKey:process.env.SANDBOX_API_KEY};
 for(const [role,account] of [['operations',fixture.accounts.operations],['customer',fixture.accounts.customer],['driver',fixture.accounts.drivers[0]],['cancelDriver',fixture.accounts.drivers[4]]])Object.assign(values,{[role+'Phone']:account.phoneNumber,[role+'Password']:account.password,[role+'Token']:account.accessToken,[role+'Id']:account.actorId});
 for(const role of ['Customer','Driver'])Object.assign(values,{['new'+role+'Phone']:'08'+randomInt(10000000,99999999),['new'+role+'Password']:'Cab-'+randomBytes(12).toString('hex')});
 for(const entry of environment.values)if(Object.hasOwn(values,entry.key))entry.value=values[entry.key];
 fs.writeFileSync(path,JSON.stringify(environment,null,2));
}
console.log('Accounts signed in and five Driver locations refreshed. Postman environment updated.');
