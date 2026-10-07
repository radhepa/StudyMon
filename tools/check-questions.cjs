/* Structural audit of both question banks.

   These are the faults a reader cannot see but a player runs into: an answer
   index pointing past the end of the choice list, two identical choices where
   one of them is "correct", the same question asked twice with two different
   answers, or a chapter whose answers all sit in the same position.

   It checks the banks as players get them: dump-questions.cjs runs the
   curriculum regrouping and the curriculum-notes.js corrections too, so a
   correction that swaps in a new choice list is checked with its real answer. */
const { window: w } = require('./dump-questions.cjs');

const all = [];
for (const ch of Object.keys(w.QBANK)) for (const q of w.QBANK[ch]) all.push({ bank: 'C', ch, ...q });
for (const ch of Object.keys(w.CALC_QBANK)) for (const q of w.CALC_QBANK[ch]) all.push({ bank: 'CALC', ch, ...q });

const fail = [], warn = [];
const bad = (q, msg) => fail.push(`${q.bank} ch${q.ch} ${q.id}: ${msg}`);
const soft = (q, msg) => warn.push(`${q.bank} ch${q.ch} ${q.id}: ${msg}`);

const norm = s => String(s).replace(/\s+/g, ' ').trim().toLowerCase();

// unique ids
const seen = new Map();
for (const q of all) {
  if (seen.has(q.id)) bad(q, `duplicate id, also in ${seen.get(q.id)}`);
  else seen.set(q.id, `${q.bank} ch${q.ch}`);
}

/* Text a player reads. A control character is almost always a JS escape that
   went wrong: '\0' in a source string is a real NUL, not backslash-zero, and
   shows up as nothing at all (*s=='' instead of *s=='\0'). Newlines and tabs
   are fine in code. */
const CONTROL = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;
/* Choices are shuffled on screen, so prose must name a choice by its content,
   never by letter or position ("option B", "both A and C", "the last option"). */
const LETTER_REF = [
  /\b(?:option|choice)s?\s+\(?[A-F]\)?(?![\w'])/i,
  /\b(?:both|either|neither)\s+\(?[A-F]\)?\s+(?:and|or|nor)\s+\(?[A-F]\)?(?![\w'])/,
  /\bthe\s+(?:first|second|third|fourth|last|previous|next)\s+(?:option|choice)s?\b/i,
];
function texts(q) {
  const out = [['question', q.q], ['code', q.code], ['explanation', q.why]];
  (q.hints || []).forEach((h, i) => out.push(['hint ' + i, h]));
  if (q.k === 'mcq' && Array.isArray(q.c)) q.c.forEach((c, i) => out.push(['choice ' + i, c]));
  if (q.k === 'fill' && Array.isArray(q.a)) q.a.forEach((a, i) => out.push(['accepted answer ' + i, a]));
  return out.filter(([, s]) => s != null && s !== '');
}
for (const q of all) {
  for (const [where, s] of texts(q)) {
    const m = CONTROL.exec(String(s));
    if (m) bad(q, `${where} contains control character U+${m[0].charCodeAt(0).toString(16).padStart(4, '0')} (write a backslash-zero for players as '\\\\0' in the source)`);
    if (where === 'code' || where.startsWith('accepted')) continue;
    for (const re of LETTER_REF) {
      const hit = re.exec(String(s));
      if (hit) { soft(q, `${where} names a choice by letter or position (${JSON.stringify(hit[0])}); choices are shuffled`); break; }
    }
  }
  if (q.k === 'fill' && q.match !== undefined && q.match !== 'exact' && q.match !== 'tokens')
    bad(q, `unknown fill match mode ${JSON.stringify(q.match)} (quiz.js knows 'exact' and 'tokens')`);
}

for (const q of all) {
  if (!q.q || !String(q.q).trim()) bad(q, 'empty question text');
  if (!q.why || !String(q.why).trim()) bad(q, 'no explanation');

  if (q.k === 'mcq') {
    if (!Array.isArray(q.c)) { bad(q, 'mcq with no choice list'); continue; }
    if (q.c.length < 2) bad(q, `only ${q.c.length} choice(s)`);
    if (!Number.isInteger(q.a)) bad(q, `answer index is not an integer (${JSON.stringify(q.a)})`);
    else if (q.a < 0 || q.a >= q.c.length) bad(q, `answer index ${q.a} outside 0..${q.c.length - 1}`);
    q.c.forEach((c, i) => { if (!String(c).trim()) bad(q, `choice ${i} is empty`); });
    /* Compare choices EXACTLY. Case and padding are the whole point of a trace
       question: "a" against "A", or "42|" against "   42|", are different
       answers, not duplicates. A looser match is reported as a warning so a
       genuine copy-paste slip still surfaces. */
    const exact = new Map(), loose = new Map();
    q.c.forEach((c, i) => {
      const s = String(c);
      if (exact.has(s)) bad(q, `choices ${exact.get(s)} and ${i} are byte-identical (${JSON.stringify(c)})`);
      else exact.set(s, i);
      const n = norm(c);
      if (loose.has(n)) soft(q, `choices ${loose.get(n)} and ${i} differ only in case or spacing (${JSON.stringify(q.c[loose.get(n)])} vs ${JSON.stringify(c)})`);
      else loose.set(n, i);
    });
    if (q.selfCheck && (q.c.length !== 2 || q.a !== 0))
      bad(q, 'self-check question must use the standard two-choice grading control');
    // "all of the above" only works as the last choice
    q.c.forEach((c, i) => {
      if (/^all of the above/i.test(String(c).trim()) && i !== q.c.length - 1)
        soft(q, `"all of the above" sits at ${i}, not last`);
    });
  } else if (q.k === 'fill') {
    if (!Array.isArray(q.a) || !q.a.length) bad(q, 'fill with no accepted answers');
    else {
      if (q.a.some(x => !String(x).trim())) bad(q, 'fill has an empty accepted answer');
      // 'exact' and 'tokens' matching keep case, so "1u" and "1U" are two answers there
      const n = q.a.map(q.match ? x => String(x).trim() : norm);
      if (new Set(n).size !== n.length) soft(q, 'fill lists the same answer twice');
    }
    if (q.c) soft(q, 'fill also carries a choice list');
  } else bad(q, `unknown kind ${q.k}`);
}

// same stem asked twice
const byStem = new Map();
for (const q of all) {
  const key = norm(q.q) + '||' + (q.code ? norm(q.code) : '');
  (byStem.get(key) || byStem.set(key, []).get(key)).push(q);
}
for (const [, group] of byStem) {
  if (group.length < 2) continue;
  const answerOf = q => q.k === 'mcq' ? norm(q.c[q.a]) : q.a.map(norm).sort().join('|');
  const answers = new Set(group.map(answerOf));
  const ids = group.map(q => `${q.bank} ${q.id}`).join(', ');
  /* Two banks can word the same right answer differently, so a difference in
     the answer TEXT is a prompt to read, not proof of a contradiction. */
  if (answers.size > 1) warn.push(`same question, differently worded answers -> ${ids}\n      ${group[0].q}\n      ${group.map(q => '· ' + answerOf(q)).join('\n      ')}`);
  else warn.push(`duplicate question (same answer) -> ${ids}`);
}

// answer position spread, per bank+chapter
for (const bank of ['C', 'CALC']) {
  const chapters = [...new Set(all.filter(q => q.bank === bank).map(q => q.ch))];
  for (const ch of chapters) {
    const qs = all.filter(q => q.bank === bank && q.ch === ch && q.k === 'mcq' && q.c.length === 4);
    if (qs.length < 12) continue;
    const counts = [0, 0, 0, 0];
    qs.forEach(q => counts[q.a]++);
    const worst = Math.max(...counts) / qs.length;
    if (worst > 0.45) warn.push(`${bank} ch${ch}: ${(worst * 100).toFixed(0)}% of ${qs.length} answers sit in one position [${counts}]`);
  }
}

// longest-choice giveaway: correct answer is the longest choice far too often
for (const bank of ['C', 'CALC']) {
  const qs = all.filter(q => q.bank === bank && q.k === 'mcq' && q.c.length > 2);
  const longest = qs.filter(q => {
    const lens = q.c.map(c => String(c).length);
    return lens[q.a] === Math.max(...lens) && lens.filter(l => l === lens[q.a]).length === 1;
  }).length;
  const share = longest / qs.length;
  if (share > 0.45) warn.push(`${bank}: the correct choice is the longest one in ${(share * 100).toFixed(0)}% of ${qs.length} questions`);
  else console.log(`${bank}: correct choice is longest in ${(share * 100).toFixed(0)}% of ${qs.length} questions (chance is ~${(100 / 4).toFixed(0)}%)`);
}

console.log(`\nchecked ${all.length} questions (${all.filter(q => q.bank === 'C').length} C, ${all.filter(q => q.bank === 'CALC').length} calculus)`);
if (warn.length) { console.log(`\n--- ${warn.length} warning(s) ---`); warn.forEach(x => console.log('  ' + x)); }
if (fail.length) { console.log(`\n--- ${fail.length} FAILURE(s) ---`); fail.forEach(x => console.log('  ' + x)); process.exitCode = 1; }
else console.log('\nno structural failures');
