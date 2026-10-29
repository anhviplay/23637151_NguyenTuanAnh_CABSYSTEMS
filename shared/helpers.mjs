import crypto from 'node:crypto';
import {promisify} from 'node:util';
import jwt from 'jsonwebtoken';
const scrypt=promisify(crypto.scrypt);
export const id=()=>crypto.randomUUID();
export const now=()=>new Date().toISOString();
export function fail(status,code){throw Object.assign(new Error(code),{status,code});}
export function requireFields(body,...keys){for(const key of keys)if(body[key]===undefined||body[key]===null||body[key]==='')fail(400,'VALIDATION_ERROR');}
export function phoneKey(phone){if(typeof phone!=='string'||!/^\+?[0-9]{9,15}$/.test(phone))fail(400,'VALIDATION_ERROR');return crypto.createHmac('sha256',process.env.DATA_ENCRYPTION_KEY).update(phone).digest('hex');}
export function encrypt(text){const iv=crypto.randomBytes(12),cipher=crypto.createCipheriv('aes-256-gcm',Buffer.from(process.env.DATA_ENCRYPTION_KEY,'hex'),iv);const encrypted=Buffer.concat([cipher.update(String(text),'utf8'),cipher.final()]);return Buffer.concat([iv,cipher.getAuthTag(),encrypted]).toString('base64');}
export function decrypt(text){const buffer=Buffer.from(text,'base64'),cipher=crypto.createDecipheriv('aes-256-gcm',Buffer.from(process.env.DATA_ENCRYPTION_KEY,'hex'),buffer.subarray(0,12));cipher.setAuthTag(buffer.subarray(12,28));return Buffer.concat([cipher.update(buffer.subarray(28)),cipher.final()]).toString('utf8');}
export async function passwordHash(value){if(typeof value!=='string'||value.length<8)fail(400,'PASSWORD_POLICY_VIOLATION');const salt=crypto.randomBytes(16).toString('hex');return 'scrypt$'+salt+'$'+(await scrypt(value,salt,64)).toString('hex');}
export async function passwordMatches(value,hash){if(typeof value!=='string'||typeof hash!=='string')return false;const [,salt,encoded]=hash.split('$');const actual=await scrypt(value,salt,64);const expected=Buffer.from(encoded,'hex');return actual.length===expected.length&&crypto.timingSafeEqual(actual,expected);}
export function tokenFor(account){return jwt.sign({actorType:account.actorType,actorId:account.actorId,permissions:account.permissions||[]},process.env.JWT_SECRET,{algorithm:'HS256',subject:account.accountId,jwtid:id(),issuer:'cab-identity',audience:'cab-client',expiresIn:Number(process.env.TOKEN_TTL_SECONDS||3600)});}
export function decodeToken(header){try{return jwt.verify(String(header||'').replace(/^Bearer /,''),process.env.JWT_SECRET,{algorithms:['HS256'],issuer:'cab-identity',audience:'cab-client'});}catch{fail(401,'INVALID_TOKEN');}}
export function version(body,record){if(body.expectedVersion===undefined&&body.version===undefined)fail(400,'VERSION_REQUIRED');if(Number(body.expectedVersion??body.version)!==record.version)fail(409,'VERSION_CONFLICT');}
export function owned(actor,record,key='customerId'){if(!record)fail(404,'NOT_FOUND');if(record[key]!==actor.actorId)fail(403,'FORBIDDEN');}
export function page(items,query){const number=Number(query.page||1),size=Number(query.pageSize||20);if(!Number.isInteger(number)||number<1||!Number.isInteger(size)||size<1||size>100)fail(400,'INVALID_PAGINATION');return {data:items.slice((number-1)*size,number*size),meta:{page:number,pageSize:size,totalItems:items.length,totalPages:Math.ceil(items.length/size)}};}
export const eventFor=(name,type,aggregate,version,payload,correlationId)=>({eventId:id(),eventType:type,eventVersion:1,occurredAt:now(),producer:name,aggregateId:aggregate,aggregateVersion:version,correlationId:correlationId||id(),payload});
export function distance(a,b){const rad=x=>x*Math.PI/180;const x=Math.sin(rad(b.latitude-a.latitude)/2)**2+Math.cos(rad(a.latitude))*Math.cos(rad(b.latitude))*Math.sin(rad(b.longitude-a.longitude)/2)**2;return 6371000*2*Math.asin(Math.sqrt(Math.min(1,x)));}
export function coordinates(value){if(!value||typeof value.latitude!=='number'||typeof value.longitude!=='number'||Math.abs(value.latitude)>90||Math.abs(value.longitude)>180)fail(400,'INVALID_COORDINATES');}
export const cleanAccount=a=>({accountId:a.accountId,[a.actorType==='DRIVER'?'driverId':a.actorType==='CUSTOMER'?'customerId':'staffId']:a.actorId,status:a.status});

export function rideView(record){if(!record.driverInfo)return record;const {plateCipher,...vehicle}=record.driverInfo.vehicle;return {...record,driverInfo:{...record.driverInfo,vehicle:{...vehicle,...(plateCipher?{plateNumber:decrypt(plateCipher)}:{})}}};}
