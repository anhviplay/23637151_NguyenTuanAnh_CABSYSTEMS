const admin = db.getSiblingDB('admin');
try { admin.runCommand({replSetGetStatus:1}); }
catch (e) {
  if (e.code !== 94) throw e;
  const result = admin.runCommand({replSetInitiate:{_id:'cab-rs',members:[{_id:0,host:'mongo:27017'}]}});
  if (!result.ok) throw new Error(result.errmsg);
}
if (!admin.hello().isWritablePrimary) quit(1);
for (const [name,user,key] of [
  ['location_db','location_user','LOCATION_MONGO_PASSWORD'],
  ['notification_db','notification_user','NOTIFICATION_MONGO_PASSWORD']
]) {
  const target = db.getSiblingDB(name);
  if (!target.getUser(user)) target.createUser({user,pwd:process.env[key],roles:[{role:'readWrite',db:name}]});
  print(name + ': user configured');
}
