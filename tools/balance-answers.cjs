/* Even out where the correct answer sits in the hand-written C question files.

   Three quarters of the correct answers in those files were choice B, so a
   player who always picked B scored about 75% without knowing any C. That
   defeats the point of a study tool. edition4.js already rotates its answers
   (a = n % 4) and is left alone.

   The fix is a single SWAP of the correct choice with the one already at the
   target position: the choice list keeps every one of its members, the correct
   text is unchanged, and nothing else in the question moves. Saves are keyed by
   question id, never by choice index, so existing progress is unaffected.

   Run with --write to apply; without it, nothing is written. */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'js', 'data', 'questions');
const FILES = fs.readdirSync(DIR).filter(f => f.endsWith('.js') && f !== 'edition4.js');
const WRITE = process.argv.includes('--write');
// a literal backslash; escapes do not survive this environment's heredocs
const BS = String.fromCharCode(92);

/* A choice that only makes sense in one position must not be moved. */
function pinned(text) {
  return /^\s*(all|none|both|neither)\s+(of\s+)?(the\s+)?(above|these|of them)/i.test(String(text))
    || /^\s*(all|none) of the above/i.test(String(text));
}

/* Walk a JS source and return the index just past the bracket that opens at
   `open`, honouring strings, escapes and comments well enough for this data. */
function matchBracket(src, open) {
  const pairs = { '[': ']', '{': '}', '(': ')' };
  const close = pairs[src[open]];
  let depth = 0, i = open, quote = null;
  for (; i < src.length; i++) {
    const ch = src[i];
    if (quote) {
      if (ch === BS) { i++; continue; }
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === src[open]) depth++;
    else if (ch === close) { depth--; if (depth === 0) return i; }
  }
  throw new Error('unbalanced bracket at ' + open);
}

/* Split an array body into its element source texts, keeping them verbatim. */
function elements(body) {
  const out = [];
  let start = 0, depth = 0, quote = null;
  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if (quote) {
      if (ch === BS) { i++; continue; }
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '[' || ch === '{' || ch === '(') depth++;
    else if (ch === ']' || ch === '}' || ch === ')') depth--;
    else if (ch === ',' && depth === 0) { out.push(body.slice(start, i)); start = i + 1; }
  }
  out.push(body.slice(start));
  return out;
}

const { window: w } = require('./dump-questions.cjs');
const byId = new Map();
for (const ch of Object.keys(w.QBANK)) for (const q of w.QBANK[ch]) byId.set(q.id, { ...q, ch });

/* Target positions, assigned round-robin within each chapter so every chapter
   ends up even rather than merely random. */
const cursor = {};
function target(q) {
  const n = q.c.length;
  cursor[q.ch] = ((cursor[q.ch] || 0) + 1) % n;
  return cursor[q.ch];
}

let changed = 0, skipped = 0, seen = 0;
const notes = [];
for (const file of FILES) {
  const full = path.join(DIR, file);
  let src = fs.readFileSync(full, 'utf8');
  const idRe = /\bid:\s*'([^']+)'/g;
  const edits = [];
  let m;
  while ((m = idRe.exec(src)) !== null) {
    const q = byId.get(m[1]);
    if (!q || q.k !== 'mcq') continue;
    seen++;
    // the object this id belongs to
    let objStart = src.lastIndexOf('{', m.index);
    const objEnd = matchBracket(src, objStart);
    const obj = src.slice(objStart, objEnd + 1);
    const cm = /(^|[\s,{])c:\s*\[/.exec(obj);
    const am = /(^|[\s,{])a:\s*(\d+)/.exec(obj);
    if (!cm || !am) { skipped++; notes.push(q.id + ': no c/a pair found'); continue; }
    const arrOpen = objStart + cm.index + cm[0].length - 1;
    const arrClose = matchBracket(src, arrOpen);
    const els = elements(src.slice(arrOpen + 1, arrClose));
    if (els.length !== q.c.length) { skipped++; notes.push(q.id + ': parsed ' + els.length + ' of ' + q.c.length + ' choices'); continue; }
    const a = Number(am[2]);
    if (a !== q.a) { skipped++; notes.push(q.id + ': a in source (' + a + ') differs from loaded (' + q.a + ')'); continue; }

    let t = target(q);
    // never disturb a choice that must keep its place
    let tries = 0;
    while ((pinned(q.c[t]) || pinned(q.c[a])) && tries < q.c.length) { t = (t + 1) % q.c.length; tries++; }
    if (pinned(q.c[a]) || pinned(q.c[t]) || t === a) { skipped++; continue; }

    const swapped = els.slice();
    const tmp = swapped[a]; swapped[a] = swapped[t]; swapped[t] = tmp;
    edits.push({ arrOpen, arrClose, body: swapped.join(','), aStart: objStart + am.index + am[0].length - String(am[2]).length, aLen: String(am[2]).length, newA: String(t), id: q.id, from: a, to: t });
    changed++;
  }
  // apply from the end so earlier offsets stay valid
  const flat = [];
  for (const e of edits) {
    flat.push({ start: e.arrOpen + 1, end: e.arrClose, text: e.body });
    flat.push({ start: e.aStart, end: e.aStart + e.aLen, text: e.newA });
  }
  flat.sort((x, y) => y.start - x.start);
  for (const f of flat) src = src.slice(0, f.start) + f.text + src.slice(f.end);
  if (WRITE && edits.length) fs.writeFileSync(full, src);
  console.log((WRITE ? 'wrote  ' : 'would ') + file + ': ' + edits.length + ' question(s) rebalanced');
}
console.log('\n' + seen + ' mcq seen, ' + changed + ' rebalanced, ' + skipped + ' left alone');
if (notes.length) { console.log('\nleft alone because:'); notes.slice(0, 20).forEach(n => console.log('  ' + n)); }
if (!WRITE) console.log('\nDRY RUN - pass --write to apply');
