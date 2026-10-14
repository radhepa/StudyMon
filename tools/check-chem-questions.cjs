/* Structural check for the Periodic Coast question bank.

     node tools/check-chem-questions.cjs                 every js/data/chem/chem-q-*.js
     node tools/check-chem-questions.cjs FILE [FILE...]  just those files (ids are still
                                                         checked for clashes with the rest)

   It cannot judge the chemistry. It does catch the mechanical slips that make a
   question unanswerable in battle: a bad answer index, duplicate choices, a
   numeric answer whose own display string does not match it, missing hints,
   markup in the text, ids that clash. Exit code 1 on any error. */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
global.window = global;
require(path.join(root, 'js/data/chem/chem-world.js'));
require(path.join(root, 'js/data/chem/chem-qbank.js'));

const all = fs.readdirSync(path.join(root, 'js/data/chem'))
  .filter(f => /^chem-q-.*\.js$/.test(f)).map(f => path.join(root, 'js/data/chem', f));
const wanted = process.argv.slice(2).map(f => path.resolve(f));
const focus = wanted.length ? new Set(wanted) : new Set(all);

const chapters = {};
window.CHEM_CHAPTERS.forEach(c => { chapters[c.n] = c; });
window.CHEM_EXAM_CHAPTERS.forEach(c => { chapters[c.n] = c; });
const TAGS = ['Concept', 'Calculation', 'Exam', 'Worksheet', 'Lecture', 'Trap'];

/* The same reading of a typed number the game uses (quiz.js parseChemNumber). */
function parseNumber(s) {
  let t = String(s).trim().toLowerCase();
  const sup = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-', '⁺': '+' };
  t = t.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/g, ch => sup[ch]);
  t = t.replace(/−/g, '-').replace(/,/g, '').replace(/\s+/g, ' ');
  t = t.replace(/\s*[×x*]\s*10\s*\^?\s*\(?\s*([+-]?\d+)\s*\)?/, 'e$1');
  const m = t.match(/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/);
  return m ? Number(m[0]) : NaN;
}

const errors = [], warnings = [];
const seen = {};
let focusCount = 0;
const byChapter = {}, byTier = {}, byKind = {}, answerSpots = [0, 0, 0, 0, 0, 0];

all.concat(wanted.filter(f => !all.includes(f))).forEach(file => {
  window.CHEM_QBANK = {};
  try { delete require.cache[require.resolve(file)]; require(file); }
  catch (e) { errors.push(path.basename(file) + ': does not load - ' + e.message); return; }
  const inFocus = focus.has(file);
  Object.keys(window.CHEM_QBANK).forEach(ch => window.CHEM_QBANK[ch].forEach(q => {
    const where = path.basename(file) + ' ' + q.id;
    if (seen[q.id]) errors.push(where + ': id already used in ' + seen[q.id]);
    seen[q.id] = path.basename(file);
    if (!inFocus) return;
    focusCount++;
    const bad = m => errors.push(where + ': ' + m);
    if (!/^m\d+-[a-z]+-\d{3}$/.test(q.id)) bad('id should look like m5-a-001');
    if (!chapters[q.chapter]) bad('unknown chapter ' + q.chapter);
    else if (!/^m(\d+)-/.test(q.id) || Number(q.id.match(/^m(\d+)-/)[1]) !== q.chapter) bad('id prefix does not match chapter ' + q.chapter);
    const lessons = chapters[q.chapter] && chapters[q.chapter].lessons;
    if (!(q.lesson >= 1 && q.lesson <= 28)) bad('lesson must be 1-28');
    else if (lessons && q.chapter < 90 && lessons.indexOf(q.lesson) < 0) bad('lesson ' + q.lesson + ' is not one of chapter ' + q.chapter + "'s lessons " + lessons.join(','));
    if ([1, 2, 3, 4].indexOf(q.t) < 0) bad('tier must be 1-4');
    if (TAGS.indexOf(q.tag) < 0) bad('tag must be one of ' + TAGS.join(', '));
    if (!q.q || q.q.length < 12) bad('question text missing');
    if (!q.why || q.why.length < 20) bad('explanation (why) missing or too short');
    if (!Array.isArray(q.hints) || q.hints.length !== 3 || q.hints.some(h => !h || h.length < 8)) bad('needs exactly three hints');
    const texts = [q.q, q.why].concat(q.hints || []).concat(Array.isArray(q.c) ? q.c : []).concat(Array.isArray(q.a) ? q.a : []);
    texts.forEach(t => {
      if (/<\/?(b|i|u|sub|sup|br|span|div|p|em|strong)\b[^>]*>/i.test(String(t))) bad('markup in text: ' + String(t).slice(0, 60));
      if (/&(lt|gt|amp|nbsp|deg|#\d+);/.test(String(t))) bad('HTML entity in text: ' + String(t).slice(0, 60));
      if (/\s{2,}/.test(String(t).trim())) warnings.push(where + ': double space');
    });
    byChapter[q.chapter] = (byChapter[q.chapter] || 0) + 1;
    byTier[q.t] = (byTier[q.t] || 0) + 1;
    byKind[q.match === 'number' ? 'num' : q.k] = (byKind[q.match === 'number' ? 'num' : q.k] || 0) + 1;
    if (q.k === 'mcq') {
      if (!Array.isArray(q.c) || q.c.length < 4 || q.c.length > 5) bad('mcq needs 4 or 5 choices');
      else {
        if (!(Number.isInteger(q.a) && q.a >= 0 && q.a < q.c.length)) bad('answer index out of range');
        const norm = q.c.map(c => String(c).trim().toLowerCase().replace(/\s+/g, ' '));
        if (new Set(norm).size !== norm.length) bad('duplicate choices');
        if (q.c.some(c => !String(c).trim())) bad('empty choice');
        if (q.c.length === 4) warnings.push(where + ': only 4 choices (the exam uses 5)');
        if (Number.isInteger(q.a)) answerSpots[q.a]++;
      }
    } else if (q.match === 'number') {
      if (!Number.isFinite(q.num)) bad('numeric answer is not a number');
      if (!Array.isArray(q.a) || !q.a.length) bad('numeric answer needs a display string');
      else {
        const v = parseNumber(q.a[0]);
        const ok = q.abs != null ? Math.abs(v - q.num) <= q.abs : Math.abs(v - q.num) <= Math.abs(q.num) * (q.tol || 0.01) + 1e-300;
        if (!ok) bad('display "' + q.a[0] + '" does not match the numeric answer ' + q.num);
      }
    } else if (q.k === 'fill') {
      if (!Array.isArray(q.a) || !q.a.length || q.a.some(a => !String(a).trim())) bad('fill needs accepted answers');
    } else bad('unknown kind ' + q.k);
  }));
});

console.log('checked ' + focusCount + ' questions in ' + focus.size + ' file(s)');
console.log('by chapter: ' + Object.keys(byChapter).map(k => k + ':' + byChapter[k]).join('  '));
console.log('by tier:    ' + Object.keys(byTier).map(k => 't' + k + ' ' + byTier[k]).join(' · '));
console.log('by kind:    ' + Object.keys(byKind).map(k => k + ' ' + byKind[k]).join(' · '));
console.log('mcq answer positions A-E: ' + answerSpots.slice(0, 5).join(' / '));
if (warnings.length) console.log('\n' + warnings.length + ' warning(s):\n  ' + warnings.slice(0, 25).join('\n  ') + (warnings.length > 25 ? '\n  ...' : ''));
if (errors.length) {
  console.log('\n' + errors.length + ' ERROR(S):\n  ' + errors.join('\n  '));
  process.exit(1);
}
console.log('\nOK');
