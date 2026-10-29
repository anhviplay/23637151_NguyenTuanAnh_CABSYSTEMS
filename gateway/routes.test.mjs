import test from 'node:test';
import assert from 'node:assert/strict';
import {expandRoute} from './routes.mjs';
test('short public auth/OTP and protected routes expand to their original owners',()=>{
 assert.equal(expandRoute('POST','/log'),'/api/v1/auth/sessions');
 assert.equal(expandRoute('GET','/otp/cus/0901234567'),'/api/v1/sandbox/otp?phoneNumber=0901234567&actorType=CUSTOMER');
 assert.equal(expandRoute('GET','/otp/dri/0901234567'),'/api/v1/sandbox/otp?phoneNumber=0901234567&actorType=DRIVER');
 assert.equal(expandRoute('GET','/dri/near?lat=10.77&lon=106.7&rad=1000&pag=1&lim=2'),'/api/v1/drivers/nearby?latitude=10.77&longitude=106.7&radiusMeters=1000&page=1&pageSize=2');
 assert.equal(expandRoute('GET','/dri/ass'),'/api/v1/drivers/me/assignments/current');
 assert.equal(expandRoute('PATCH','/ops/dri/driver-id/ver'),'/api/v1/operations/drivers/driver-id/verification');
 assert.equal(expandRoute('POST','/pay/reference/ok'),'/api/v1/sandbox/payments/reference/settle');
});
test('preserve original routes and require the matching verb; reject query conflicts',()=>{
 const callback='/api/v1/integrations/payments/local-sandbox/results';
 assert.equal(expandRoute('POST',callback),callback);
 assert.equal(expandRoute('GET','/api/v1/drivers/id'),'/api/v1/drivers/id');
 assert.equal(expandRoute('GET','/log'),'/log');
 assert.throws(()=>expandRoute('GET','/otp/cus/0901234567?actorType=DRIVER'),{code:'AMBIGUOUS_QUERY_FIELD'});
 assert.throws(()=>expandRoute('GET','/dri/near?lat=10&latitude=11'),{code:'AMBIGUOUS_QUERY_FIELD'});
});
