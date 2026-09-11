/* Audit Field Manual practice-problem coverage in the Converging Isles.
   The source HTML is authored as one article per lesson and seven `.prob`
   blocks per practice section. This parser deliberately reads content only;
   text inside the manual is never evaluated as code or treated as instructions. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..', '..');
const SOURCE = process.argv.slice(2).find(arg => !arg.startsWith('--')) || 'C:/Users/minal/Downloads/Calculus-II-Field-Manual.html';
const html = fs.readFileSync(SOURCE, 'utf8');

const SUP = {0:'⁰',1:'¹',2:'²',3:'³',4:'⁴',5:'⁵',6:'⁶',7:'⁷',8:'⁸',9:'⁹',n:'ⁿ','+':'⁺','-':'⁻'};
const SUB = {a:'ₐ',e:'ₑ',h:'ₕ',i:'ᵢ',j:'ⱼ',k:'ₖ',l:'ₗ',m:'ₘ',n:'ₙ',o:'ₒ',p:'ₚ',r:'ᵣ',s:'ₛ',t:'ₜ',u:'ᵤ',v:'ᵥ',x:'ₓ',0:'₀',1:'₁',2:'₂',3:'₃',4:'₄',5:'₅',6:'₆',7:'₇',8:'₈',9:'₉','+':'₊','-':'₋','(':'₍',')':'₎'};
const NAMED = {
  amp:'&', lt:'<', gt:'>', quot:'"', apos:"'", nbsp:' ', minus:'−', times:'×', middot:'·',
  le:'≤', ge:'≥', ne:'≠', rarr:'→', rArr:'⇒', hArr:'⇔', larr:'←', infin:'∞', pi:'π', theta:'θ',
  alpha:'α', beta:'β', rho:'ρ', tau:'τ', epsilon:'ε', Delta:'Δ', Sigma:'Σ',
  radic:'√', sum:'Σ', int:'∫', hellip:'…', asymp:'≈', plusmn:'±', sect:'§',
  frac12:'½', frac14:'¼', sup1:'¹', sup2:'²', sup3:'³', prime:'′', Prime:'″',
  deg:'°', perp:'⊥', parallel:'∥', lang:'⟨', rang:'⟩', ocirc:'∘', ccedil:'ç', rsquo:'’', laquo:'«'
};

function scriptChars(text, table) {
  return text.replace(/[a-z0-9+\-()]/gi, c => table[c] || c);
}

function plain(value) {
  return String(value)
    .replace(/<br\s*\/?\s*>/gi, '\n')
    .replace(/<sup>([\s\S]*?)<\/sup>/gi, (_, text) => scriptChars(text, SUP))
    .replace(/<sub>([\s\S]*?)<\/sub>/gi, (_, text) => scriptChars(text, SUB))
    .replace(/<[^>]+>/g, '')
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&([a-z0-9]+);/gi, (all, name) => Object.hasOwn(NAMED, name) ? NAMED[name] : all)
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function practiceRows() {
  const rows = [];
  const articleRe = /<article\b[^>]*\bid="L(\d+)"[^>]*>([\s\S]*?)<\/article>/gi;
  for (const article of html.matchAll(articleRe)) {
    const lesson = Number(article[1]);
    const title = plain((article[2].match(/<h3>([\s\S]*?)<\/h3>/i) || [,''])[1]);
    const practice = (article[2].match(/<div class="practice">([\s\S]*)/i) || [,''])[1];
    const blocks = practice.split(/<div class="prob\s+prob-/i).slice(1);
    blocks.forEach(block => {
      const difficulty = (block.match(/^([wceh])"/) || [,''])[1];
      const number = Number(plain((block.match(/<span class="pnum">([\s\S]*?)<\/span>/i) || [,''])[1]));
      const questionHtml = (block.match(/<div class="pq">([\s\S]*?)<\/div>/i) || [,''])[1];
      const solutionHtml = (block.match(/<div class="psol-b">([\s\S]*?)<\/div>/i) || [,''])[1];
      const bold = [...solutionHtml.matchAll(/<b>([\s\S]*?)<\/b>/gi)].map(m => plain(m[1]));
      rows.push({ lesson, title, number, difficulty, question: plain(questionHtml), solution: plain(solutionHtml), bold });
    });
  }
  return rows;
}

function loadGameQuestions(excludeFiles) {
  const excluded = new Set(excludeFiles || []);
  const files = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8')
    .split(/\r?\n/)
    .map(line => (line.match(/<script src="(js\/data\/calc\/[^"?]+)/) || [])[1])
    .filter(file => file && !excluded.has(file));
  const context = { console };
  context.window = context;
  vm.createContext(context);
  for (const file of files) vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), context, { filename: file });
  return Object.values(context.CALC_QBANK || {}).flat();
}

function words(value) {
  return plain(value).toLowerCase().replace(/[^À-ɏͰ-Ͽ⁰-₟\p{L}\p{N}]+/gu, ' ').trim();
}

const COURSE_HOME = {
  3:[7,8,9], 4:[12,13,14], 5:[15,16,17], 6:[18,19],
  7:[21,22,23], 8:[24,25,26], 9:[28,29,30,31], 10:[32,33,34],
  91:[10,11], 92:[20], 93:[27], 94:[35]
};
function courseChapterOf(lesson) {
  for (const [chapter, lessons] of Object.entries(COURSE_HOME)) if (lessons.includes(lesson)) return Number(chapter);
  return null;
}

function runAudit() {
  const manual = practiceRows();
  const game = loadGameQuestions();
  const byLesson = Object.groupBy(manual, row => row.lesson);
  const exact = new Map(game.map(q => [`${q.lesson}|${words(q.q)}`, q]));
  const covered = manual.filter(row => exact.has(`${row.lesson}|${words(row.question)}`));
  const missing = manual.filter(row => !exact.has(`${row.lesson}|${words(row.question)}`));
  const q3plus = manual.filter(row => row.lesson >= 7);
  const q3plusCovered = q3plus.filter(row => exact.has(`${row.lesson}|${words(row.question)}`));
  const wrongHome = q3plus.filter(row => {
    const q = exact.get(`${row.lesson}|${words(row.question)}`);
    return q && Number(q.chapter) !== courseChapterOf(row.lesson);
  });

  console.log(`Manual practice rows: ${manual.length}`);
  console.log(`Exact stems in live game: ${covered.length}`);
  console.log(`Missing exact stems: ${missing.length}`);
  console.log(`Quiz 3+ / exam scope: ${q3plusCovered.length}/${q3plus.length}`);
  console.log(`Questions mapped to the wrong gym/exam: ${wrongHome.length}`);
  for (let lesson = 1; lesson <= 35; lesson++) {
    const rows = byLesson[lesson] || [];
    const have = rows.filter(row => exact.has(`${lesson}|${words(row.question)}`)).length;
    console.log(`L${String(lesson).padStart(2, '0')} ${String(have).padStart(2)}/${String(rows.length).padStart(2)} ${rows[0] ? rows[0].title : '(missing article)'}`);
  }

  const outDir = path.join(ROOT, 'output', 'calc');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'manual-practice-audit.json'), JSON.stringify({
    source: SOURCE, manualCount: manual.length, coveredCount: covered.length,
    missingCount: missing.length, q3plusCount: q3plus.length,
    q3plusCoveredCount: q3plusCovered.length, wrongHomeCount: wrongHome.length, wrongHome, manual, missing
  }, null, 2));
  console.log('Wrote output/calc/manual-practice-audit.json');

  if (manual.length !== 245) process.exitCode = 1;
  if (process.argv.includes('--require-q3plus') && (q3plusCovered.length !== q3plus.length || wrongHome.length)) process.exitCode = 1;
}

module.exports = { ROOT, SOURCE, plain, words, practiceRows, loadGameQuestions, courseChapterOf };
if (require.main === module) runAudit();
