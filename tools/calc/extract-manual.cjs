/* Pull the authored multiple-choice bank out of the Calculus II Field Manual.
   The manual keeps them in one `var AUTH=[ mc(...), ... ];` literal inside an
   IIFE, so we slice that literal out and evaluate it with our own mc(). */
const fs = require('fs');
const SRC = 'C:/Users/minal/Downloads/Calculus-II-Field-Manual.html';

const html = fs.readFileSync(SRC, 'utf8');
const i = html.indexOf('<script id="drill-js"');
const js = html.slice(i, html.indexOf('</script>', i));

const start = js.indexOf('var AUTH=[');
if (start < 0) throw new Error('AUTH bank not found');

// walk brackets so a "]" inside a string cannot end the literal early
let d = 0, inStr = null, esc = false, end = -1;
for (let k = js.indexOf('[', start); k < js.length; k++) {
  const c = js[k];
  if (esc) { esc = false; continue; }
  if (inStr) { if (c.charCodeAt(0) === 92) esc = true; else if (c === inStr) inStr = null; continue; }
  if (c === '"' || c === "'") { inStr = c; continue; }
  if (c === '[') d++;
  else if (c === ']') { d--; if (!d) { end = k + 1; break; } }
}
if (end < 0) throw new Error('unterminated AUTH literal');

const rows = [];
const mc = (id, lesson, diff, q, choices, answer, explain) =>
  rows.push({ id, lesson, diff, q, choices, answer, explain });
new Function('mc', 'return ' + js.slice(js.indexOf('[', start), end))(mc);

const byDiff = {}, byLesson = {};
rows.forEach(r => {
  byDiff[r.diff] = (byDiff[r.diff] || 0) + 1;
  byLesson[r.lesson] = (byLesson[r.lesson] || 0) + 1;
});

fs.mkdirSync('output/calc', { recursive: true });
fs.writeFileSync('output/calc/manual-auth.json', JSON.stringify(rows, null, 1));

console.log('extracted', rows.length, 'authored MCQs');
console.log('difficulties:', byDiff);
console.log('lessons covered:', Object.keys(byLesson).length, 'of 35');
const missing = [];
for (let n = 1; n <= 35; n++) if (!byLesson[n]) missing.push(n);
console.log('lessons with none:', missing.length ? missing.join(',') : '(none)');
console.log('per lesson:', JSON.stringify(byLesson));
const htmlish = rows.filter(r => /<[a-z]/i.test(r.q + r.choices.join('') + r.explain)).length;
console.log('rows containing HTML markup:', htmlish);
