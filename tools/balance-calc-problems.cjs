/* Even out where the correct answer sits in calc-questions-problems.js.

   Written by hand, the file came out 67% choice A - the author's habit, not a
   design. Same fix as tools/balance-answers.cjs: a single SWAP of the correct
   choice with whichever choice already sits at a target position, so the option
   list keeps every member and the correct text never changes.

   Records are arrays: [id, ch, lesson, tier, tag, kind, q, choices, answer, why, hints].
   Run with --write; without it this is a dry run. */
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'js', 'data', 'calc', 'calc-questions-problems.js');
const WRITE = process.argv.includes('--write');
const BS = String.fromCharCode(92);

function matchBracket(src, open) {
  const close = { '[': ']', '{': '}' }[src[open]];
  let depth = 0, quote = null;
  for (let i = open; i < src.length; i++) {
    const ch = src[i];
    if (quote) { if (ch === BS) { i++; continue; } if (ch === quote) quote = null; continue; }
    if (ch === '"' || ch === "'") { quote = ch; continue; }
    if (ch === src[open]) depth++;
    else if (ch === close) { depth--; if (depth === 0) return i; }
  }
  throw new Error('unbalanced bracket at ' + open);
}

function elements(body) {
  const out = [];
  let start = 0, depth = 0, quote = null;
  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if (quote) { if (ch === BS) { i++; continue; } if (ch === quote) quote = null; continue; }
    if (ch === '"' || ch === "'") { quote = ch; continue; }
    if (ch === '[' || ch === '{') depth++;
    else if (ch === ']' || ch === '}') depth--;
    else if (ch === ',' && depth === 0) { out.push(body.slice(start, i)); start = i + 1; }
  }
  out.push(body.slice(start));
  return out;
}

let src = fs.readFileSync(FILE, 'utf8');
const qStart = src.indexOf('var Q = [');
const arrOpen = src.indexOf('[', qStart);
const arrClose = matchBracket(src, arrOpen);
const recordsBody = src.slice(arrOpen + 1, arrClose);

// locate every top-level record and its absolute offsets
const records = [];
{
  let depth = 0, quote = null, start = -1;
  for (let i = 0; i < recordsBody.length; i++) {
    const ch = recordsBody[i];
    if (quote) { if (ch === BS) { i++; continue; } if (ch === quote) quote = null; continue; }
    if (ch === '"' || ch === "'") { quote = ch; continue; }
    if (ch === '[') { if (depth === 0) start = i; depth++; }
    else if (ch === ']') { depth--; if (depth === 0) records.push([start, i]); }
  }
}

const cursor = {};
const edits = [];
let seen = 0, changed = 0, skipped = 0;
for (const [s, e] of records) {
  const recAbs = arrOpen + 1 + s;
  const inner = recordsBody.slice(s + 1, e);
  const els = elements(inner);
  if (els.length < 11) { skipped++; continue; }
  const kind = els[5].trim().replace(/^["']|["']$/g, '');
  if (kind !== 'mcq') { skipped++; continue; }
  seen++;
  const ch = Number(els[1]);
  // choices array is element 7, answer index element 8
  const choicesRel = inner.indexOf(els[7]);
  const cOpen = arrOpen + 1 + s + 1 + inner.indexOf('[', choicesRel);
  const cClose = matchBracket(src, cOpen);
  const opts = elements(src.slice(cOpen + 1, cClose));
  const a = Number(els[8]);
  if (!(a >= 0 && a < opts.length)) { skipped++; continue; }

  cursor[ch] = ((cursor[ch] || 0) + 1) % opts.length;
  let t = cursor[ch];
  const pinned = i => /^\s*["'](all|none|both|neither) (of )?(the )?(above|these)/i.test(opts[i]);
  let tries = 0;
  while ((pinned(t) || pinned(a)) && tries < opts.length) { t = (t + 1) % opts.length; tries++; }
  if (t === a || pinned(t) || pinned(a)) { skipped++; continue; }

  const swapped = opts.slice();
  const tmp = swapped[a]; swapped[a] = swapped[t]; swapped[t] = tmp;
  // the answer index literal: find it after the choices array
  const after = src.slice(cClose + 1, cClose + 12);
  const m = /^\s*,\s*(\d+)/.exec(after);
  if (!m) { skipped++; continue; }
  const aAbs = cClose + 1 + m[0].length - m[1].length;
  edits.push({ start: cOpen + 1, end: cClose, text: swapped.join(',') });
  edits.push({ start: aAbs, end: aAbs + m[1].length, text: String(t) });
  changed++;
}

edits.sort((x, y) => y.start - x.start);
for (const ed of edits) src = src.slice(0, ed.start) + ed.text + src.slice(ed.end);
if (WRITE) fs.writeFileSync(FILE, src);
console.log((WRITE ? 'wrote: ' : 'dry run: ') + seen + ' mcq seen, ' + changed + ' rebalanced, ' + skipped + ' left alone');
if (!WRITE) console.log('pass --write to apply');
