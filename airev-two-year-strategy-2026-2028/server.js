// Minimal static server — no dependencies. Serves the deck on 0.0.0.0:PORT (default 4173).
const http = require('http'), fs = require('fs'), path = require('path');
const root = __dirname, port = parseInt(process.env.PORT || '4173', 10);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json', '.png':'image/png', '.svg':'image/svg+xml', '.ico':'image/x-icon', '.txt':'text/plain; charset=utf-8', '.md':'text/markdown; charset=utf-8' };
http.createServer((req, res) => {
  let p = decodeURIComponent((req.url || '/').split('?')[0].split('#')[0]);
  if (p === '/' || p === '') p = '/index.html';
  const file = path.normalize(path.join(root, p));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end('forbidden'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain' }); return res.end('not found'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'X-Robots-Tag': 'noindex' });
    res.end(data);
  });
}).listen(port, '0.0.0.0', () => console.log('AIREV strategy deck listening on http://0.0.0.0:' + port));
