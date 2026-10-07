/* Load every question bank the way index.html does and dump it as JSON.
   Used by tools/check-questions.cjs and other question tools; no game engine
   is loaded.

   The banks are not final once the question files have run. curriculum.js
   regroups QBANK into the fourth-edition chapters, edition4.js and
   quiz-true-false.js then add to it, and curriculum-notes.js patches some
   questions in place (new wording, new choice lists, new answers). A check
   that skips those steps tests questions no player ever sees, so this loads
   them too, in index.html order, together with the data files curriculum.js
   needs (world.js for CHAPTERS/GYM_DIALOGUE, townsfolk.js, trainers.js).

   Set STUDYMON_RAW_BANK=1 to load only the question files themselves, as
   they sit on disk before any regrouping or patching. Tools that rewrite
   question source by position want that view. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const RAW = /^(1|true|yes)$/i.test(process.env.STUDYMON_RAW_BANK || '');
const WANT = RAW
  ? /^js\/data\/(?:questions|calc)\//
  : /^js\/data\/(?:questions\/|calc\/|world\.js$|townsfolk\.js$|trainers\.js$|curriculum\.js$|curriculum-notes\.js$)/;
const FILES = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8')
  .split('\n')
  .map(l => (l.match(/<script src="(js\/data\/[^"?]+)/) || [])[1])
  .filter(f => f && WANT.test(f));
/* In a browser `window.X = ...` also defines the bare global X, and some banks
   rely on that. Making the sandbox its own window reproduces it. */
const ctx = { console };
ctx.window = ctx;
vm.createContext(ctx);
for (const f of FILES) {
  try { vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f }); }
  catch (e) { console.error('LOAD FAIL', f, e.message); process.exit(1); }
}
module.exports = { window: ctx, files: FILES, raw: RAW };
if (require.main === module) {
  const w = ctx;
  console.log((RAW ? 'raw question files' : 'runtime view') + ', ' + FILES.length + ' files');
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
