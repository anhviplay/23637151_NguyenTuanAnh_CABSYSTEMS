const service=process.env.SERVICE_NAME;
if(service==='gateway') await import('../gateway/index.mjs');
else {
 const {startService}=await import('./runtime.mjs');
 const module=await import(`../services/${service}/index.mjs`);
 await startService(service,module);
}
