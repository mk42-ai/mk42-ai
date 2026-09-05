import {mkdir,readFile,writeFile,readdir,copyFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {createHash} from 'node:crypto';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),dist=path.join(root,'dist');
const entry='airev-strategic-overview-chairman-2026-08-30.html';
const core=[entry,'foundation.css','strategy.css','strategy-app.mjs','strategy-data.mjs','strategy-utils.mjs'];
const assets=['cctv.webp','drone.webp','laptop.webp','modular-data-centre.webp','on-prem-appliance.webp','robot.webp','smart-glasses.webp','inter-regular.otf','inter-semibold.otf','favicon.svg'];
const diskAssets=await readdir(path.join(root,'assets'));
if(diskAssets.some(n=>!assets.includes(n)))throw new Error('Unexpected asset outside explicit allowlist');
await mkdir(path.join(dist,'assets'),{recursive:true});
const files=[...core,...assets.map(n=>'assets/'+n)],manifest=[];
for(const rel of files){const bytes=await readFile(path.join(root,rel));await copyFile(path.join(root,rel),path.join(dist,rel));manifest.push({path:rel,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});}
await writeFile(path.join(dist,'asset-manifest.json'),JSON.stringify({entry,files:manifest,source:'sanitized application assets only'},null,2)+'\n');
console.log(JSON.stringify({status:'built',files:files.length,bytes:manifest.reduce((a,x)=>a+x.bytes,0),entry,dependencies:0,utc:new Date().toISOString()}));
