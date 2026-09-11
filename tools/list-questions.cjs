/* Compact dump for reading a bank end to end. Args: C|CALC and a chapter list. */
const { window: w } = require('./dump-questions.cjs');
const bank = (process.argv[2] || 'CALC').toUpperCase();
const want = process.argv.slice(3);
const src = bank === 'C' ? w.QBANK : w.CALC_QBANK;
for (const ch of Object.keys(src)) {
  if (want.length && !want.includes(ch)) continue;
  for (const q of src[ch]) {
    const ans = q.k === 'fill' ? q.a.join(' / ') : q.c[q.a];
    console.log(`${q.id} [${q.tag}] ${q.q}`);
    if (q.code) console.log('    CODE: ' + q.code.replace(/\n/g, ' ; '));
    if (q.k === 'mcq') console.log('    opts: ' + q.c.map((c, i) => (i === q.a ? '**' : '') + c).join(' | '));
    console.log('    ANS: ' + ans);
    console.log('    why: ' + q.why);
  }
}
