import test from 'node:test';
import assert from 'node:assert/strict';
import {expandInput} from './input.mjs';
const plain=x=>JSON.parse(JSON.stringify(x));
test('location shorthand preserves values and full names',()=>{
 const full={latitude:10.78,longitude:106.7,observedAt:'2026-10-29T00:00:00Z',sequence:123};
 assert.deepEqual(plain(expandInput({lat:10.78,lng:106.7,at:full.observedAt,seq:123},'/api/v1/drivers/me/locations')),full);
 assert.deepEqual(plain(expandInput(full,'/api/v1/drivers/me/locations')),full);
});
test('route-specific timestamp, version, cancellation and nested Booking fields',()=>{
 assert.deepEqual(plain(expandInput({state:'COMPLETED',at:'now',v:3,km:5},'/api/v1/trips/id/status-transitions')),{targetStatus:'COMPLETED',occurredAt:'now',expectedVersion:3,distanceKm:5});
 assert.deepEqual(plain(expandInput({name:'Customer',v:2},'/api/v1/customers/me')),{fullName:'Customer',version:2});
 assert.deepEqual(plain(expandInput({why:'CUSTOMER_REQUEST',v:2},'/api/v1/bookings/id/cancellations')),{reasonCode:'CUSTOMER_REQUEST',expectedVersion:2});
 assert.deepEqual(plain(expandInput({from:{addr:'A',loc:{lat:10,lng:106}},to:{addr:'B',loc:{lat:11,lng:107}},type:'BIKE'},'/api/v1/bookings')),{pickup:{address:'A',location:{latitude:10,longitude:106}},destination:{address:'B',location:{latitude:11,longitude:107}},serviceType:'BIKE'});
});
test('reject conflicting aliases and unsafe keys; leave signed callback untouched',()=>{
 assert.throws(()=>expandInput({lat:10,latitude:11},'/api/v1/drivers/me/locations'),{code:'AMBIGUOUS_INPUT_FIELD'});
 assert.throws(()=>expandInput(JSON.parse('{"__proto__":{"polluted":true}}'),'/api/v1/bookings'),{code:'INVALID_INPUT_FIELD'});
 const callback={eventId:'id',occurredAt:'now',signature:'signed'};
 assert.equal(expandInput(callback,'/api/v1/integrations/payments/local-sandbox/results'),callback);
 assert.equal({}.polluted,undefined);
});

test('three-letter prefix input across auth, Booking, Driver and Payment',()=>{
 assert.deepEqual(plain(expandInput({pho:'0901234567',pas:'password',act:'CUSTOMER'},'/api/v1/auth/sessions')),{phoneNumber:'0901234567',password:'password',actorType:'CUSTOMER'});
 assert.deepEqual(plain(expandInput({lat:10.78,lon:106.7,obs:'now',seq:1},'/api/v1/drivers/me/locations')),{latitude:10.78,longitude:106.7,observedAt:'now',sequence:1});
 assert.deepEqual(plain(expandInput({pic:{add:'A',loc:{lat:10,lon:106}},des:{add:'B',loc:{lat:11,lon:107}},ser:'BIKE'},'/api/v1/bookings')),{pickup:{address:'A',location:{latitude:10,longitude:106}},destination:{address:'B',location:{latitude:11,longitude:107}},serviceType:'BIKE'});
 assert.deepEqual(plain(expandInput({otp:'proof',veh:{pla:'59A',ser:'BIKE'},lic:'L',ful:'D'},'/api/v1/auth/driver/registrations')),{otpVerificationToken:'proof',vehicle:{plateNumber:'59A',serviceType:'BIKE'},licenseNumber:'L',fullName:'D'});
 assert.deepEqual(plain(expandInput({otp:'123456'},'/api/v1/auth/driver/registration-otp/verify')),{otp:'123456'});
 assert.deepEqual(plain(expandInput({rea:'CUSTOMER_REQUEST',txt:'Reason',exp:1},'/api/v1/bookings/id/cancellations')),{reasonCode:'CUSTOMER_REQUEST',reasonText:'Reason',expectedVersion:1});
 assert.deepEqual(plain(expandInput({dec:'ACTIVE',rea:'Reviewed',exp:1},'/api/v1/operations/drivers/id/verification')),{decision:'ACTIVE',reason:'Reviewed',expectedVersion:1});
 assert.deepEqual(plain(expandInput({met:'ELECTRONIC',exp:1},'/api/v1/payments/id/method')),{method:'ELECTRONIC',expectedVersion:1});
});
