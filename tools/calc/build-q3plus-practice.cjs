/* Generate the Field Manual practice set for Quiz 3 onward.

   Lessons map to the real course calendar: quiz lessons go to gym chapters
   3..10, while the five lessons absent from quizzes go to the matching exam
   mini-boss chapters 91..94. Quiz 1 and Quiz 2 are deliberately out of scope.

   Exact stems already present in earlier hand-curated banks are not copied.
   Single-result problems become fill-ins. Multi-part, proof, explanation and
   derivation prompts use a reveal-then-self-check card so the original task is
   not distorted into a brittle one-line answer. */
const fs = require('fs');
const path = require('path');
const { ROOT, SOURCE, words, practiceRows, loadGameQuestions } = require('./audit-manual-practice.cjs');

const TARGET = 'js/data/calc/calc-questions-field-manual-q3plus.js';
const GYM = { 3:[7,8,9], 4:[12,13,14], 5:[15,16,17], 6:[18,19],
              7:[21,22,23], 8:[24,25,26], 9:[28,29,30,31], 10:[32,33,34] };
const EXAM_ONLY = { 91:[10,11], 92:[20], 93:[27], 94:[35] };
const TIER = { w:1, c:2, e:3, h:4 };
const TAG = { w:'Warm-up', c:'Core', e:'Exam level', h:'Stretch' };

function chapterOf(lesson) {
  for (const [chapter, lessons] of Object.entries(GYM)) if (lessons.includes(lesson)) return Number(chapter);
  for (const [chapter, lessons] of Object.entries(EXAM_ONLY)) if (lessons.includes(lesson)) return Number(chapter);
  return null;
}

const SCRIPT = {
  '⁰':'^0','¹':'^1','²':'^2','³':'^3','⁴':'^4','⁵':'^5','⁶':'^6','⁷':'^7','⁸':'^8','⁹':'^9','ⁿ':'^n',
  '₀':'_0','₁':'_1','₂':'_2','₃':'_3','₄':'_4','₅':'_5','₆':'_6','₇':'_7','₈':'_8','₉':'_9','ₙ':'_n','ₖ':'_k','ₓ':'_x'
};

function asciiMath(value) {
  return String(value)
    .replace(/[⁰¹²³⁴-⁹ⁿ₀-₉ₙₖₓ]/g, c => SCRIPT[c] || c)
    .replace(/−/g, '-').replace(/π/g, 'pi').replace(/∞/g, 'infinity')
    .replace(/√\(([^)]+)\)/g, 'sqrt($1)').replace(/√([A-Za-z0-9]+)/g, 'sqrt($1)')
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

function hintsFor(row) {
  const lines = row.solution.split('\n').map(line => line.trim()).filter(Boolean);
  const first = row.difficulty === 'w'
    ? 'Start from the definition or formula introduced in this lesson.'
    : row.difficulty === 'h'
      ? 'Break the problem into a setup, a calculation, and a reason the method applies.'
      : 'Identify the governing formula or convergence test before doing the algebra.';
  return [first, lines[0] || 'Write the relevant quantities and conditions explicitly.',
    lines[1] || 'Carry the calculation through carefully and check the result against the original conditions.'];
}

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
  const record = {
    id, chapter, lesson: row.lesson, t: TIER[row.difficulty] || 2,
    tag: TAG[row.difficulty] || 'Practice', q: row.question,
    why: row.solution, hints: hintsFor(row), code: '',
    source: `Calculus II Field Manual, Lesson ${row.lesson}, Practice ${row.number}`,
    family: `field-manual-L${String(row.lesson).padStart(2, '0')}-P${String(row.number).padStart(2, '0')}`,
    familyName: `${row.title} - practice ${row.number}`, variation: 1
  };
  if (row.bold.length === 1) {
    record.k = 'fill';
    record.a = answerVariants(row.bold[0]);
  } else {
    record.k = 'mcq';
    record.c = ['I got it', 'I need to review it'];
    record.a = 0;
    record.selfCheck = true;
  }
  added.push(record);
  exact.add(key);
}

if (manual.length !== 204) throw new Error(`Expected 204 Quiz 3+ practice problems, found ${manual.length}`);
if (added.some(q => q.chapter < 3 && q.chapter < 91)) throw new Error('Quiz 1 or Quiz 2 would be modified');
if (new Set(added.map(q => q.id)).size !== added.length) throw new Error('Duplicate generated IDs');
if (added.some(q => !q.q || !q.why || !q.hints || q.hints.length !== 3)) throw new Error('Incomplete generated record');

const header = `/* GENERATED by tools/calc/build-q3plus-practice.cjs - do not edit by hand.\n` +
  `   Exact Field Manual practice coverage for Quiz 3 onward. Quiz 1 and Quiz 2\n` +
  `   are intentionally untouched. Source: ${SOURCE.replace(/\\/g, '/')} */\n`;
let js = header + `(function () {\nwindow.CALC_QBANK = window.CALC_QBANK || {};\n`;
js += `const rows = ${JSON.stringify(added, null, 2)};\n`;
js += `for (const q of rows) {\n  CALC_QBANK[q.chapter] = CALC_QBANK[q.chapter] || [];\n` +
  `  if (CALC_QBANK[q.chapter].some(old => old.id === q.id)) throw Error('Duplicate Field Manual ID: ' + q.id);\n` +
  `  CALC_QBANK[q.chapter].push(q);\n}\n`;
js += `window.CALC_FIELD_MANUAL_Q3PLUS = { total: ${manual.length}, preserved: ${preserved.length}, added: rows.length };\n})();\n`;

fs.writeFileSync(path.join(ROOT, TARGET), js, 'utf8');
const verification = {
  source: SOURCE, scope: 'Lessons 7-35; quiz gyms 3-10 plus exam mini-boss chapters 91-94',
  manualCount: manual.length, preservedExactCount: preserved.length, addedCount: added.length,
  fillCount: added.filter(q => q.k === 'fill').length,
  selfCheckCount: added.filter(q => q.selfCheck).length,
  chapterCounts: Object.fromEntries([...new Set(added.map(q => q.chapter))].sort((a,b) => a-b).map(ch => [ch, added.filter(q => q.chapter === ch).length])),
  preserved, added: added.map(q => ({ id:q.id, chapter:q.chapter, lesson:q.lesson, source:q.source, kind:q.selfCheck ? 'self-check' : 'fill' }))
};
fs.writeFileSync(path.join(ROOT, 'output/calc/q3plus-practice-verification.json'), JSON.stringify(verification, null, 2), 'utf8');
console.log(`Field Manual Quiz 3+ scope: ${manual.length}`);
console.log(`Preserved exact questions already live: ${preserved.length}`);
console.log(`Generated additions: ${added.length} (${verification.fillCount} fill, ${verification.selfCheckCount} self-check)`);
console.log(`Chapter additions: ${JSON.stringify(verification.chapterCounts)}`);
