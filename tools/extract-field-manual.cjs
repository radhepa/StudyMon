/* Pull the practice problems out of the Calculus II Field Manual.

   Each lesson ends with a Practice block of Warm-up / Core / Exam-level
   problems, every one carrying a worked explanation. Those are the real
   pencil-and-paper problems; the game's calculus bank was almost entirely
   vocabulary. This only extracts and normalises them - turning them into
   questions is done by hand from this output. */
const fs = require('fs');
const SRC = 'C:/Users/minal/Downloads/Calculus-II-Field-Manual.html';
const html = fs.readFileSync(SRC, 'utf8');

const ENT = { lang: '\u27e8', rang: '\u27e9', minus: '\u2212', radic: '\u221a', asymp: '\u2248',
  sup2: '\u00b2', sup3: '\u00b3', sect: '\u00a7', middot: '\u00b7', times: '\u00d7', ne: '\u2260',
  le: '\u2264', ge: '\u2265', rArr: '\u21d2', rarr: '\u2192', theta: '\u03b8', pi: '\u03c0',
  infin: '\u221e', int: '\u222b', sum: '\u2211', alpha: '\u03b1', beta: '\u03b2', deg: '\u00b0',
  nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", hellip: '\u2026', mdash: '\u2014',
  ndash: '\u2013', prime: '\u2032', frac12: '\u00bd', perp: '\u22a5', sdot: '\u22c5', cdot: '\u00b7' };

function decode(s) {
  return s.replace(/&#(\d+);/g, (m, d) => String.fromCodePoint(+d))
          .replace(/&#x([0-9a-f]+);/gi, (m, h) => String.fromCodePoint(parseInt(h, 16)))
          .replace(/&([a-zA-Z][a-zA-Z0-9]*);/g, (m, n) => ENT[n] !== undefined ? ENT[n] : m);
}
function text(s) {
  return decode(String(s).replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, ''))
    .replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
}

// Each lesson is an <article class="lesson" id="LN">, so problems map to a
// lesson number exactly rather than by document position.
const lessons = [];
const aRe = /<article class="lesson" id="L(\d+)"[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>/gi;
const marks = [];
let m;
while ((m = aRe.exec(html)) !== null) marks.push({ at: m.index, n: +m[1], title: text(m[2]) });
for (let i = 0; i < marks.length; i++) {
  const body = html.slice(marks[i].at, i + 1 < marks.length ? marks[i + 1].at : html.length);
  lessons.push({ n: marks[i].n, title: marks[i].title, body });
}

const TAG = { 'prob-w': 'Warm-up', 'prob-c': 'Core', 'prob-e': 'Exam' };
const out = [];
for (const L of lessons) {
  const chunks = L.body.split(/<div class="prob (?=prob-[wce]")/);
  for (let i = 1; i < chunks.length; i++) {
    const c = chunks[i];
    const lvl = /^(prob-[wce])/.exec(c);
    const q = /<div class="pq">([\s\S]*?)<\/div>/i.exec(c);
    const sol = /<div class="psol-b">([\s\S]*?)<\/div><\/div>/i.exec(c)
             || /<div class="psol-b">([\s\S]*?)<\/div>/i.exec(c);
    const num = /<span class="pnum">(\d+)<\/span>/i.exec(c);
    if (!q) continue;
    out.push({
      lesson: L.n, lessonTitle: L.title,
      n: num ? +num[1] : null,
      level: lvl ? TAG[lvl[1]] : '?',
      q: text(q[1]),
      solution: sol ? text(sol[1]) : ''
    });
  }
}

fs.writeFileSync('output/field-manual-problems.json', JSON.stringify(out, null, 1));
const byLevel = {};
out.forEach(p => { byLevel[p.level] = (byLevel[p.level] || 0) + 1; });
console.log('extracted ' + out.length + ' practice problems');
console.log('by level: ' + JSON.stringify(byLevel));
console.log('lessons covered: ' + new Set(out.map(p => p.lesson)).size + ' of ' + lessons.length);
console.log('without an explanation: ' + out.filter(p => !p.solution).length);
