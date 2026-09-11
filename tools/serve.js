/* Minimal static file server, used by "Play StudyMon.bat" when Python is not installed.
   Serves the StudyMon folder on 127.0.0.1 only. */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PORT = parseInt(process.argv[2], 10) || 8777;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.jfif': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ogg': 'audio/ogg',
  '.ico': 'image/x-icon'
};

/* ---- portrait studio save hook -------------------------------------------
   The one place this server accepts a write. It exists so tools/portrait-studio.html
   can save framing and background edits without a download dance. It writes a
   single fixed file and nothing else. Delete this block together with the
   studio when the portraits are finished. */
const EDITS = path.join(ROOT, 'tools', 'portrait-edits.json');
// Where the full body artwork lives, needed only when an edit erases background.
const ART_SOURCE = 'C:/Users/minal/Downloads/Pokemon Characters';

/* Rebuild the actual portrait files from the saved edits. Without this the
   studio only ever writes JSON and the game keeps showing the old crops. */
function applyPortraits(done) {
  const { execFile } = require('child_process');
  let edits = {};
  try { edits = JSON.parse(fs.readFileSync(EDITS, 'utf8')); } catch (e) {}
  const erasers = Object.keys(edits).filter(n => (edits[n].erase || []).length);
  const log = [];
  const reframe = () => execFile('python', ['tools/reframe-portraits.py'], { cwd: ROOT },
    (err, out, errOut) => {
      log.push(out || '', errOut || '');
      done(err ? 'failed: ' + (errOut || err.message) : log.join('').trim());
    });
  if (!erasers.length) return reframe();
  // Erase points live in the source art, so those characters are re-imported.
  execFile('python', ['tools/import-portraits.py', ART_SOURCE].concat(erasers),
    { cwd: ROOT, maxBuffer: 4e6 }, (err, out, errOut) => {
      log.push(out || '', errOut || '');
      if (err) return done('failed during import: ' + (errOut || err.message));
      reframe();
    });
}

http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (req.method === 'POST' && rel === '/portrait-apply') {
    applyPortraits(msg => {
      res.writeHead(msg.indexOf('failed') === 0 ? 500 : 200,
        { 'Content-Type': 'text/plain; charset=utf-8' }).end(msg);
    });
    return;
  }
  if (req.method === 'POST' && rel === '/portrait-edits') {
    let body = '';
    req.on('data', c => { body += c; if (body.length > 4e6) req.destroy(); });
    req.on('end', () => {
      try {
        JSON.parse(body);                       // refuse anything that is not JSON
        fs.writeFileSync(EDITS, body);
        res.writeHead(200, { 'Content-Type': 'text/plain' }).end('saved');
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'text/plain' }).end('bad json');
      }
    });
    return;
  }
  if (rel === '/' || rel === '') rel = '/index.html';
  const file = path.join(ROOT, path.normalize(rel));
  // never serve anything outside the game folder
  if (!file.startsWith(ROOT)) { res.writeHead(403).end('forbidden'); return; }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain' }).end('not found'); return; }
    res.writeHead(200, {
      'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream',
      // Revalidate every time, so an updated game file is never served stale.
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    res.end(buf);
  });
}).listen(PORT, '127.0.0.1', () => {
  console.log('StudyMon serving ' + ROOT);
  console.log('Open http://localhost:' + PORT + '  (Ctrl+C to stop)');
});
