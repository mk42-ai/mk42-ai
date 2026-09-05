import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const base=path.dirname(fileURLToPath(import.meta.url));
const root=process.env.SERVE_ROOT?path.resolve(process.env.SERVE_ROOT):path.join(base,'dist');
const port=Number(process.env.PORT||5173),host=process.env.HOST||'0.0.0.0';
const entry='airev-strategic-overview-chairman-2026-08-30.html';
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.webp':'image/webp','.svg':'image/svg+xml','.otf':'font/otf'};
const manifest=JSON.parse(await readFile(path.join(root,'asset-manifest.json'),'utf8'));
const allow=new Set(manifest.files.map(f=>'/'+f.path));
const server=http.createServer(async(req,res)=>{
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('X-Frame-Options','DENY');
  res.setHeader('Referrer-Policy','no-referrer');
  res.setHeader('X-Robots-Tag','noindex, nofollow, noarchive');
  res.setHeader('Cache-Control','no-store');
  res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=()');
  res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'");
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});return res.end('Method not allowed');}
  let url;try{url=decodeURIComponent(new URL(req.url,'http://local.invalid').pathname);}catch{res.writeHead(400);return res.end('Invalid path');}
  if(url==='/'||url==='/index.html')url='/'+entry;
  if(!allow.has(url)||url.includes('..')||url.includes(String.fromCharCode(0))){res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});return res.end('Not found');}
  const filename=path.join(root,url);
  try{const info=await stat(filename);if(!info.isFile())throw new Error('not a file');res.writeHead(200,{'Content-Type':mime[path.extname(filename)]||'application/octet-stream','Content-Length':info.size});if(req.method==='HEAD')return res.end();createReadStream(filename).pipe(res);}catch{res.writeHead(404);res.end('Not found');}
});
server.listen(port,host,()=>console.log(JSON.stringify({status:'listening',host,port,entry,utc:new Date().toISOString(),externalClientRequests:'disabled by CSP',rawSourceFilesServed:false})));
process.on('SIGTERM',()=>server.close(()=>process.exit(0)));
