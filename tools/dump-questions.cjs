/* Load every question bank the way index.html does and dump it as JSON.
   Used by tools/check-questions.cjs; no game engine is loaded. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const FILES = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8')
  .split('\n')
  .map(l => (l.match(/<script src="(js\/data\/(?:questions|calc)\/[^"?]+)/) || [])[1])
  .filter(Boolean);
/* In a browser `window.X = ...` also defines the bare global X, and some banks
   rely on that. Making the sandbox its own window reproduces it. */
const ctx = { console };
ctx.window = ctx;
vm.createContext(ctx);
for (const f of FILES) {
  try { vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f }); }
  catch (e) { console.error('LOAD FAIL', f, e.message); process.exit(1); }
}
module.exports = { window: ctx, files: FILES };
if (require.main === module) {
  const w = ctx;
  console.log('window keys:', Object.keys(w).filter(k => k !== 'window' && k !== 'console').join(', '));
  for (const k of Object.keys(w)) {
    if (k === 'window' || k === 'console') continue;
    const v = w[k];
    if (v && typeof v === 'object') {
      const n = Array.isArray(v) ? v.length
        : Object.values(v).reduce((s, x) => s + (Array.isArray(x) ? x.length : 0), 0);
      console.log('  %s: %s (%d entries)', k, Array.isArray(v) ? 'array' : 'object', n);
    }
  }
}
