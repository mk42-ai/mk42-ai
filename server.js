// Minimal zero-dependency static host for the single-file AIREV chairman deck.
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5173;
const HOST = process.env.HOST || '0.0.0.0';
const FILE = path.join(__dirname, 'index.html');

const server = http.createServer((req, res) => {
  const url = (req.url || '/').split('?')[0];
  const method = (req.method || 'GET').toUpperCase();

  // Only reads are meaningful here — everything else previously fell through
  // and answered 200 with the whole deck.
  if (method !== 'GET' && method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain', Allow: 'GET, HEAD' });
    return res.end('method not allowed');
  }

  if (url === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('ok');
  }

  // The browser asks for these on every load; answering with the HTML deck made
  // them look like successful asset fetches.
  if (url === '/favicon.ico') {
    res.writeHead(204);
    return res.end();
  }
  if (/\.(?:js|css|png|jpe?g|gif|svg|webp|ico|json|map|woff2?)$/i.test(url)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('not found');
  }

  fs.readFile(FILE, (err, buf) => {
    if (err) {
      console.error('[deck] cannot read index.html:', err.message);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('deck not found');
    }
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'Content-Length': buf.length
    });
    res.end(buf);
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[deck] port ${PORT} is already in use — set PORT to something else`);
  } else {
    console.error('[deck] server error:', err.message);
  }
  process.exitCode = 1;
});

server.listen(PORT, HOST, () => {
  console.log('AIREV deck served on ' + HOST + ':' + PORT);
});

// Container platforms stop the process with SIGTERM; close the listener first
// so in-flight responses finish instead of being cut off.
for (const sig of ['SIGTERM', 'SIGINT']) {
  process.on(sig, () => {
    console.log(`[deck] ${sig} received — shutting down`);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 3000).unref();
  });
}
