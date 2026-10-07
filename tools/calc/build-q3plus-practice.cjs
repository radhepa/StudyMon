/* Generate the Field Manual practice set for Quiz 3 onward.

   Lessons map to the real course calendar: quiz lessons go to gym chapters
   3..10, while the five lessons absent from quizzes go to the matching exam
   mini-boss chapters 91..94. Quiz 1 and Quiz 2 are deliberately out of scope.

   Exact stems already present in earlier hand-curated banks are not copied.
   Single-result problems become fill-ins. Multi-part, proof, explanation and
   derivation prompts use a reveal-then-self-check card so the original task is
   not distorted into a brittle one-line answer.

   The manual's own text needs repairs the parser cannot make (raised letters
   shifted in the source, a wrong answer, prompts that lean on a neighbouring
   problem, answers players type differently). Those live in
   q3plus-practice-overrides.json, keyed by question id: each entry replaces
   whole fields of the generated record (null deletes a field). Keys starting
   with "$" steer the builder and are not copied: "$hintKeys" lists answer text
   the generated hints must not give away.

   Usage: node tools/calc/build-q3plus-practice.cjs [manual.html]
            [--out=path.js] [--verification=path.json]
            [--overrides=path.json | --no-overrides] */
const fs = require('fs');
const path = require('path');
const { ROOT, SOURCE, words, practiceRows, loadGameQuestions } = require('./audit-manual-practice.cjs');

const TARGET = 'js/data/calc/calc-questions-field-manual-q3plus.js';
const OVERRIDES = path.join(__dirname, 'q3plus-practice-overrides.json');
const GYM = { 3:[7,8,9], 4:[12,13,14], 5:[15,16,17], 6:[18,19],
              7:[21,22,23], 8:[24,25,26], 9:[28,29,30,31], 10:[32,33,34] };
const EXAM_ONLY = { 91:[10,11], 92:[20], 93:[27], 94:[35] };
const TIER = { w:1, c:2, e:3, h:4 };
const TAG = { w:'Warm-up', c:'Core', e:'Exam level', h:'Stretch' };
const KEY_ORDER = ['id', 'chapter', 'lesson', 't', 'tag', 'q', 'why', 'hints', 'code', 'source',
  'family', 'familyName', 'variation', 'k', 'c', 'a', 'selfCheck'];

function chapterOf(lesson) {
  for (const [chapter, lessons] of Object.entries(GYM)) if (lessons.includes(lesson)) return Number(chapter);
  for (const [chapter, lessons] of Object.entries(EXAM_ONLY)) if (lessons.includes(lesson)) return Number(chapter);
  return null;
}

/* Damage that comes from the manual's markup itself: &ocirc; is read as the
   ring operator, and the third derivative is written with &#8407; (a combining
   arrow) instead of the triple prime. */
function repairText(value) {
  return String(value)
    .replace(/H∘pital/g, 'Hôpital')
    .replace(/f⃗/g, 'f‴');
}

const SCRIPT = {
  '⁰':'^0','¹':'^1','²':'^2','³':'^3','⁴':'^4','⁵':'^5','⁶':'^6','⁷':'^7','⁸':'^8','⁹':'^9','ⁿ':'^n',
  '₀':'_0','₁':'_1','₂':'_2','₃':'_3','₄':'_4','₅':'_5','₆':'_6','₇':'_7','₈':'_8','₉':'_9','ₙ':'_n','ₖ':'_k','ₓ':'_x'
};

/* Radicals are read before π is spelled out, so √2π stays sqrt(2)pi and never
   becomes sqrt(2pi), which is a different number. */
function asciiMath(value) {
  return String(value)
    .replace(/[⁰¹²³⁴-⁹ⁿ₀-₉ₙₖₓ]/g, c => SCRIPT[c] || c)
    .replace(/√\(([^)]+)\)/g, 'sqrt($1)').replace(/√([A-Za-z0-9]+)/g, 'sqrt($1)')
    .replace(/−/g, '-').replace(/π/g, 'pi').replace(/∞/g, 'infinity')
    .replace(/·/g, '*').replace(/½/g, '1/2').replace(/¼/g, '1/4')
    .replace(/≈/g, '~').replace(/≤/g, '<=').replace(/≥/g, '>=').replace(/≠/g, '!=');
}

function answerVariants(answer) {
  const values = new Set();
  const add = value => {
    value = String(value || '').trim();
    if (!value) return;
    values.add(value);
    values.add(asciiMath(value));
    values.add(value.replace(/\s+/g, ''));
    values.add(asciiMath(value).replace(/\s+/g, ''));
  };
  add(answer);
  if (answer.includes('≈')) {
    const sides = answer.split('≈');
    add(sides[0]);
    add(sides[sides.length - 1]);
  }
  const rhs = answer.match(/^[A-Za-z][A-Za-z0-9]*(?:\([^)]*\))?\s*=\s*(.+)$/);
  if (rhs) add(rhs[1]);
  return [...values].filter((value, index, all) => value && all.indexOf(value) === index);
}

/* ---- hints ---------------------------------------------------------------

   Hint 1 names the lesson's own method. Hints 2 and 3 are the first lines of
   the worked solution, cut short before they state the final answer: a line
   that reaches the answer ends in "…" at the last relation sign, and nothing
   after it is used. */
const LESSON_HINT = {
  7: 'Sketch the region and the axis. A shell has volume 2π(radius)(height)(thickness): write the radius and the height in terms of the variable you integrate.',
  8: 'Arc length is ∫√(1 + (f′)²) dx and surface area about the x-axis is ∫2πf√(1 + (f′)²) dx. Find f′ and simplify 1 + (f′)² before you integrate.',
  9: 'Slice it up: mass is ∫ρ dx, the center of mass is ∫xρ dx divided by the mass, and work is ∫(force on a slice)(distance it moves). For a spring, F = kx with x measured from natural length.',
  10: 'Slice horizontally. Pumping: integrate ρg·A(y)·(distance that slice is lifted). Force on a vertical wall: integrate ρg·(depth)·(strip width) over the depth.',
  11: 'Integration by parts: choose u to get simpler when differentiated and dv to be easy to integrate, then use ∫u dv = uv − ∫v du.',
  12: 'With an odd power, peel off one factor and convert the rest using sin²x + cos²x = 1. With only even powers, use the half-angle identities.',
  13: 'Odd power of tan x: save sec x tan x and set u = sec x. Even power of sec x: save sec²x and set u = tan x. If neither fits, try integration by parts.',
  14: 'Match the radical: a² − x² → x = a sinθ, a² + x² → x = a tanθ, x² − a² → x = a secθ. Check first whether a plain u-substitution already works.',
  15: 'Complete the square if needed, pick the trig substitution, and either change the limits to θ or convert back to x with a reference triangle.',
  16: 'Factor the denominator, write one partial fraction per factor, and solve for the constants by plugging in roots and matching coefficients.',
  17: 'Check for a simple form first (substitution, arctan). Otherwise factor the denominator completely over the reals; an irreducible quadratic factor gets (Bx + C) on top.',
  18: 'Replace the infinite limit, or the point where the integrand blows up, with a variable; integrate, then take the limit. Remember ∫₁^∞ dx/xᵖ converges only when p > 1.',
  19: 'Keep the sequence aₙ and the partial sums Sₙ apart: a series converges exactly when its partial sums approach a finite limit, and aₙ = Sₙ − Sₙ₋₁.',
  20: 'Treat aₙ as f(n): divide by the highest power, compare growth rates, or use L\'Hôpital on f(x). For a recursive sequence, show it is monotone and bounded, then solve L = f(L).',
  21: 'Decide whether it is geometric (find the first term a and the ratio r: it converges only if |r| < 1, to a/(1 − r)) or telescoping (write out partial sums and cancel).',
  22: 'First check whether the terms go to 0; if not, the series diverges. Otherwise compare with a p-series, or use the Integral Test after checking f is positive, continuous and decreasing.',
  23: 'Find the dominant part of the terms (highest powers, or exponentials), then compare directly or compute lim aₙ/bₙ.',
  24: 'Test Σ|aₙ| first. If that diverges, check the Alternating Series Test (terms decreasing to 0). For an estimate, the error is less than the first omitted term.',
  25: 'Compute ρ = lim |aₙ₊₁/aₙ|, or lim |aₙ|^(1/n) when there are nth powers: ρ < 1 converges absolutely, ρ > 1 diverges, ρ = 1 says nothing.',
  26: 'Read the shape of the terms: factorials point to the Ratio Test, nth powers to the Root Test, rational functions to Limit Comparison with a p-series, alternating signs to absolute values first and then the AST.',
  27: 'Compute f and its first few derivatives at the center a, then build pₙ(x) = Σ f⁽ᵏ⁾(a)(x − a)ᵏ/k!.',
  28: 'Use the remainder bound |Rₙ| ≤ M|x − a|ⁿ⁺¹/(n+1)!, where M bounds |f⁽ⁿ⁺¹⁾| between a and x.',
  29: 'Apply the Ratio Test to get |x − a| < R, then test each endpoint separately with an ordinary series test.',
  30: 'Start from 1/(1 − u) = Σuᵏ for |u| < 1, then substitute, multiply, differentiate or integrate term by term.',
  31: 'Build from known Maclaurin series (eˣ, sin x, cos x, 1/(1 − x)) by substituting, multiplying or dividing, rather than differentiating over and over.',
  32: 'Replace each function with enough terms of its Maclaurin series, simplify, then take the limit, integrate term by term, or match a known series.',
  33: 'Use x = r cosθ, y = r sinθ, r² = x² + y² and tanθ = y/x, and check which quadrant the point is in. Multiplying an equation by r often helps.',
  34: 'Compare with the standard forms (circles, cardioids, limaçons, roses). Slopes come from dy/dx = (r′sinθ + r cosθ)/(r′cosθ − r sinθ). For intersections, check the origin separately.',
  35: 'Area is ½∫r² dθ between the angles where the region starts and ends, often where r = 0 or where two curves meet.'
};
const FALLBACK_STEP = 'Write out each quantity the method needs before combining them.';
const FALLBACK_CHECK = 'Carry the calculation through carefully and check the result against the original conditions.';

/* The pieces of an answer a hint must not state: "2π(2 + ln 3) ≈ 19.47" gives
   both sides, "k = 40 N/m" gives "40 N/m" and "40", "1/2, converges" gives
   "1/2" and the whole converge family of words. */
function answerKeys(texts) {
  const keys = new Set();
  const add = value => { value = String(value).trim().replace(/\.$/, '').trim(); if (value) keys.add(value); };
  for (const text of texts) {
    for (let part of String(text).split(/≈| ~ /)) {
      part = part.trim();
      const rhs = part.match(/^[A-Za-z][A-Za-z0-9]*(?:\([^)]*\))?\s*=\s*(.+)$/);
      const pieces = [part];
      if (rhs) pieces.push(rhs[1]);
      for (const piece of pieces) {
        add(piece);
        for (const bit of piece.split(/,\s+/)) {
          add(bit);
          add(bit.replace(/\s*(N\/m|ft·lb|kg|J|N|m|ft|terms?)\.?$/, ''));
        }
      }
    }
  }
  const all = [...keys];
  if (all.some(k => /^(converges?|convergent)$/i.test(k))) ['converges', 'convergent', 'converge'].forEach(k => keys.add(k));
  if (all.some(k => /^(diverges?|divergent)$/i.test(k))) ['diverges', 'divergent', 'diverge', '∞'].forEach(k => keys.add(k));
  return [...keys].filter(k => k.length > 0);
}

/* "converges", "limaçon with an inner loop" - but not π or e⁵, which are math. */
function isWordKey(key) { return /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ ]+$/.test(key); }
function alnum(text) { return text.replace(/[^\p{L}\p{N}]/gu, '').length; }

/* Where a line first states one of the keys: { index, length }, or null.
   A formula only counts as stated when it follows a relation sign (or opens
   the line), so the 1 inside "(x+1)" is never mistaken for an answer of 1.
   A formula after a colon, "is" or "gives" counts only when nothing better
   is on the line: in "the quotient is 1 + x/2 + … → 1" the answer is the
   last 1, not the first. */
function answerIndex(line, keys) {
  let strong = null, weak = null;
  const take = (hit, isStrong) => {
    if (isStrong) { if (!strong || hit.index < strong.index) strong = hit; }
    else if (!weak || hit.index < weak.index) weak = hit;
  };
  for (const key of keys) {
    if (isWordKey(key)) {
      const m = new RegExp('(?<!\\p{L})' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'iu').exec(line);
      if (m) take({ index: m.index, length: m[0].length }, true);
      continue;
    }
    for (let i = line.indexOf(key); i >= 0; i = line.indexOf(key, i + 1)) {
      const before = line.slice(0, i).replace(/\s+$/, '');
      const after = line.slice(i + key.length);
      const ends = after === '' || /^[\s,;)]/.test(after) || /^\.(?!\d)/.test(after);
      if (!ends) continue;
      if (/[=≈→⇒]$/.test(before)) take({ index: i, length: key.length }, true);
      else if (before === '' || /:$/.test(before) || /\b(is|gives|equals)$/.test(before)) take({ index: i, length: key.length }, false);
    }
  }
  return strong || weak;
}

/* A solution line as a hint: unchanged when it does not state the answer,
   otherwise cut at the last relation sign before it ("… = 2π[x⁴/4]₀² = …").
   A line that opens with the answer keeps only what follows it. */
function hintLine(line, keys) {
  const hit = keys.length ? answerIndex(line, keys) : null;
  if (!hit) return line;
  const before = line.slice(0, hit.index).replace(/\s+$/, '');
  let text = null;
  if (before === '') {
    const rest = line.slice(hit.index + hit.length).replace(/^[.,;:!]?\s*/, '');
    if (rest && !answerIndex(rest, keys)) text = rest.charAt(0).toUpperCase() + rest.slice(1);
  } else if (/[=≈→⇒<>≤≥]$/.test(before)) {
    text = before + ' …';
  } else if (!/:$/.test(before)) {
    const cut = Math.max(before.lastIndexOf(', '), before.lastIndexOf('; '), before.lastIndexOf('. '));
    if (cut > 0) text = before.slice(0, cut) + '.';
  }
  return text && alnum(text) >= 4 ? text : null;
}

function hintsFor(record, keyTexts) {
  const keys = answerKeys(keyTexts.filter(Boolean));
  const out = [LESSON_HINT[record.lesson] || 'Identify the method this lesson introduces before doing the algebra.'];
  for (const raw of record.why.split('\n')) {
    if (out.length === 3) break;
    const line = raw.trim();
    if (!line) continue;
    const text = hintLine(line, keys);
    if (text && !out.includes(text)) out.push(text);
  }
  if (out.length === 1) out.push(FALLBACK_STEP);
  if (out.length === 2) out.push(FALLBACK_CHECK);
  return out;
}

function canonical(record) {
  const out = {};
  for (const key of KEY_ORDER) if (record[key] !== undefined) out[key] = record[key];
  for (const key of Object.keys(record)) if (!(key in out)) out[key] = record[key];
  return out;
}

/* ---- build ---------------------------------------------------------------- */

function buildRows(overrides) {
  const manual = practiceRows().filter(row => row.lesson >= 7);
  const existing = loadGameQuestions([TARGET]);
  const exact = new Set(existing.map(q => `${q.lesson}|${words(q.q)}`));
  const added = [];
  const preserved = [];

  for (const row of manual) {
    const key = `${row.lesson}|${words(row.question)}`;
    if (exact.has(key)) { preserved.push({ lesson: row.lesson, number: row.number, question: row.question }); continue; }
    const chapter = chapterOf(row.lesson);
    if (!chapter) throw new Error(`No quiz or exam home for lesson ${row.lesson}`);
    const id = `k${chapter}-fm-L${String(row.lesson).padStart(2, '0')}-P${String(row.number).padStart(2, '0')}`;
    const bold = row.bold.map(repairText);
    let record = {
      id, chapter, lesson: row.lesson, t: TIER[row.difficulty] || 2,
      tag: TAG[row.difficulty] || 'Practice', q: repairText(row.question),
      why: repairText(row.solution), hints: null, code: '',
      source: `Calculus II Field Manual, Lesson ${row.lesson}, Practice ${row.number}`,
      family: `field-manual-L${String(row.lesson).padStart(2, '0')}-P${String(row.number).padStart(2, '0')}`,
      familyName: `${row.title} - practice ${row.number}`, variation: 1
    };
    if (bold.length === 1) {
      record.k = 'fill';
      record.a = answerVariants(bold[0]);
    } else {
      record.k = 'mcq';
      record.c = ['I got it', 'I need to review it'];
      record.a = 0;
      record.selfCheck = true;
    }
    const fix = overrides[id] || {};
    for (const [field, value] of Object.entries(fix)) {
      if (field.startsWith('$')) continue;
      if (value === null) delete record[field];
      else record[field] = value;
    }
    if (!fix.hints) {
      record.hints = hintsFor(record, [record.k === 'fill' ? record.a[0] : null,
        ...(fix.$hintKeys || []), bold.length === 1 ? bold[0] : null]);
    }
    added.push(canonical(record));
    exact.add(key);
  }

  if (manual.length !== 204) throw new Error(`Expected 204 Quiz 3+ practice problems, found ${manual.length}`);
  if (added.some(q => q.chapter < 3 && q.chapter < 91)) throw new Error('Quiz 1 or Quiz 2 would be modified');
  if (new Set(added.map(q => q.id)).size !== added.length) throw new Error('Duplicate generated IDs');
  if (added.some(q => !q.q || !q.why || !q.hints || q.hints.length !== 3)) throw new Error('Incomplete generated record');
  if (added.some(q => q.selfCheck ? !(q.k === 'mcq' && q.c && q.c.length === 2 && q.a === 0)
    : !(q.k === 'fill' && Array.isArray(q.a) && q.a.length))) throw new Error('Malformed fill-in or self-check record');
  const missing = Object.keys(overrides).filter(id => !added.some(q => q.id === id));
  if (missing.length) throw new Error('Overrides name questions that were not generated (did another bank change?): ' + missing.join(', '));
  return { manual, added, preserved };
}

function main() {
  const flag = name => (process.argv.find(arg => arg.startsWith(`--${name}=`)) || '').slice(name.length + 3);
  const overrides = process.argv.includes('--no-overrides') ? {}
    : JSON.parse(fs.readFileSync(flag('overrides') || OVERRIDES, 'utf8'));
  const { manual, added, preserved } = buildRows(overrides);

  const header = `/* GENERATED by tools/calc/build-q3plus-practice.cjs - do not edit by hand.\n` +
    `   Exact Field Manual practice coverage for Quiz 3 onward. Quiz 1 and Quiz 2\n` +
    `   are intentionally untouched. Source: ${SOURCE.replace(/\\/g, '/')} */\n`;
  let js = header + `(function () {\nwindow.CALC_QBANK = window.CALC_QBANK || {};\n`;
  js += `const rows = ${JSON.stringify(added, null, 2)};\n`;
  js += `for (const q of rows) {\n  CALC_QBANK[q.chapter] = CALC_QBANK[q.chapter] || [];\n` +
    `  if (CALC_QBANK[q.chapter].some(old => old.id === q.id)) throw Error('Duplicate Field Manual ID: ' + q.id);\n` +
    `  CALC_QBANK[q.chapter].push(q);\n}\n`;
  js += `window.CALC_FIELD_MANUAL_Q3PLUS = { total: ${manual.length}, preserved: ${preserved.length}, added: rows.length };\n})();\n`;

  fs.writeFileSync(flag('out') || path.join(ROOT, TARGET), js, 'utf8');
  const verification = {
    source: SOURCE, scope: 'Lessons 7-35; quiz gyms 3-10 plus exam mini-boss chapters 91-94',
    manualCount: manual.length, preservedExactCount: preserved.length, addedCount: added.length,
    fillCount: added.filter(q => q.k === 'fill').length,
    selfCheckCount: added.filter(q => q.selfCheck).length,
    chapterCounts: Object.fromEntries([...new Set(added.map(q => q.chapter))].sort((a,b) => a-b).map(ch => [ch, added.filter(q => q.chapter === ch).length])),
    preserved, added: added.map(q => ({ id:q.id, chapter:q.chapter, lesson:q.lesson, source:q.source, kind:q.selfCheck ? 'self-check' : 'fill' }))
  };
  fs.writeFileSync(flag('verification') || path.join(ROOT, 'output/calc/q3plus-practice-verification.json'), JSON.stringify(verification, null, 2), 'utf8');
  console.log(`Field Manual Quiz 3+ scope: ${manual.length}`);
  console.log(`Preserved exact questions already live: ${preserved.length}`);
  console.log(`Generated additions: ${added.length} (${verification.fillCount} fill, ${verification.selfCheckCount} self-check)`);
  console.log(`Chapter additions: ${JSON.stringify(verification.chapterCounts)}`);
}

module.exports = { buildRows, hintsFor, answerKeys, answerVariants, asciiMath, repairText, canonical, LESSON_HINT };
if (require.main === module) main();
