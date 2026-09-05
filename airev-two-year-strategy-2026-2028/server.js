// Local / sandbox server for the deck — zero dependencies.
// Serves the static deck on 0.0.0.0:PORT (default 4173) and mounts the SAME serverless handlers that
// Vercel runs from the repository root (../api/chat.js, ../api/media.js), so /api/chat and /api/media
// behave identically in the sandbox preview and on Vercel. ONDEMAND_API_KEY comes from the environment.
const http = require('http'), fs = require('fs'), path = require('path');
const root = __dirname, port = parseInt(process.env.PORT || '4173', 10);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json', '.png':'image/png', '.jpg':'image/jpeg', '.svg':'image/svg+xml', '.ico':'image/x-icon', '.txt':'text/plain; charset=utf-8', '.md':'text/markdown; charset=utf-8' };

function loadHandler(name) {
  const p = path.join(root, '..', 'api', name + '.js');
  if (!fs.existsSync(p)) return null;
  try { return require(p); } catch (e) { console.error('cannot load api/' + name, e.message); return null; }
}
const handlers = { chat: loadHandler('chat'), media: loadHandler('media') };

http.createServer(async (req, res) => {
  let p = decodeURIComponent((req.url || '/').split('?')[0].split('#')[0]);
  const api = p.match(/^\/api\/([a-z]+)\/?$/);
  if (api) {
    const h = handlers[api[1]];
    if (!h) { res.writeHead(404, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify({ ok: false, error: 'no such function' })); }
    try { await h(req, res); } catch (e) { if (!res.headersSent) res.writeHead(500, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ ok: false, error: 'handler failure' })); }
    return;
  }
  // The deck lives at the repository path /airev-two-year-strategy-2026-2028/ on Vercel; serve it there and at / here.
  p = p.replace(/^\/airev-two-year-strategy-2026-2028(\/|$)/, '/');
  if (p === '/' || p === '') p = '/index.html';
  const file = path.normalize(path.join(root, p));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end('forbidden'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain' }); return res.end('not found'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'X-Robots-Tag': 'noindex' });
    res.end(data);
  });
}).listen(port, '0.0.0.0', () => console.log(`AIREV strategy deck listening on http://0.0.0.0:${port} · api/chat ${handlers.chat ? 'mounted' : 'missing'} · api/media ${handlers.media ? 'mounted' : 'missing'}`));
