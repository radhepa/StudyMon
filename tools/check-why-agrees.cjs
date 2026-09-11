/* Does each explanation agree with the choice it marks correct?

   The most likely data-entry fault in a bank this size is an answer index off
   by one: the prose is right, the index points at the wrong line. That shows up
   as an explanation whose distinctive content matches a DIFFERENT choice better
   than the one marked correct. This only ranks suspicion; every hit is read. */
const { window: w } = require('./dump-questions.cjs');

const all = [];
for (const ch of Object.keys(w.QBANK)) for (const q of w.QBANK[ch]) all.push({ bank: 'C', ch, ...q });
for (const ch of Object.keys(w.CALC_QBANK)) for (const q of w.CALC_QBANK[ch]) all.push({ bank: 'CALC', ch, ...q });

const STOP = new Set(('the a an is are it its of to in on and or not for with that this if you your'
  + ' be as at by from so but which what when will can does do has have was were been'
  + ' one two value values same each every any all more most than then there here')
  .split(' '));

function terms(s) {
  return new Set(String(s).toLowerCase().replace(/[^a-z0-9_.%+\-*/<>=]+/g, ' ')
    .split(' ').filter(t => t.length > 1 && !STOP.has(t)));
}

function overlap(a, b) {
  let n = 0;
  for (const t of b) if (a.has(t)) n++;
  return b.size ? n / b.size : 0;
}

const hits = [];
for (const q of all) {
  if (q.k !== 'mcq' || !Array.isArray(q.c) || q.c.length < 3) continue;
  const why = terms(q.why);
  const scores = q.c.map(c => overlap(why, terms(c)));
  const best = scores.indexOf(Math.max(...scores));
  if (best === q.a) continue;
  const gap = scores[best] - scores[q.a];
  // only worth a look when the explanation clearly favours another choice
  if (gap >= 0.5 && scores[best] >= 0.6) hits.push({ q, best, scores, gap });
}

hits.sort((a, b) => b.gap - a.gap);
console.log(`${hits.length} question(s) where the explanation reads closer to another choice\n`);
for (const h of hits) {
  const q = h.q;
  console.log(`--- ${q.bank} ${q.id} (ch${q.ch}) gap ${h.gap.toFixed(2)}`);
  console.log('Q: ' + q.q);
  if (q.code) console.log('CODE: ' + q.code.replace(/\n/g, ' | '));
  q.c.forEach((c, i) => console.log(`   [${i}]${i === q.a ? ' <-marked' : ''}${i === h.best ? ' <-why matches' : ''} ${JSON.stringify(c)}`));
  console.log('WHY: ' + q.why + '\n');
}
