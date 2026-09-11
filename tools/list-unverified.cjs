/* C questions that tools/verify-c-answers.cjs could not settle by running them.
   Args: chapter numbers. */
const fs = require('fs');
const { window: w } = require('./dump-questions.cjs');
let done = new Set();
try {
  const d = JSON.parse(fs.readFileSync('output/c-answer-verification.json', 'utf8'));
  for (const r of d.results) if (!r.error && !/error:/.test(r.diagnostics || '')) done.add(r.id);
} catch (e) {}
const want = process.argv.slice(2);
for (const ch of Object.keys(w.QBANK)) {
  if (want.length && !want.includes(ch)) continue;
  for (const q of w.QBANK[ch]) {
    if (done.has(q.id)) continue;
    const a = q.k === 'fill' ? q.a.join(' / ') : q.c[q.a];
    console.log(q.id + '  ' + q.q.replace(/\s+/g, ' ')
      + (q.code ? '  {' + q.code.replace(/\s+/g, ' ').slice(0, 150) + '}' : '')
      + '   >>> ' + a);
  }
}
