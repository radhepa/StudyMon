/* Pull each lesson's teaching content out of the Field Manual.

   The practice problems were extracted separately; this grabs what the manual
   actually TEACHES - its toolkit formulas, worked example, and the trap it
   warns about - so generated variants use the manual's own method and notation
   rather than a generic textbook approach. */
const fs = require('fs');
const html = fs.readFileSync('C:/Users/minal/Downloads/Calculus-II-Field-Manual.html', 'utf8');

const ENT = { lang: '\u27e8', rang: '\u27e9', minus: '\u2212', radic: '\u221a', asymp: '\u2248',
  sup2: '\u00b2', sup3: '\u00b3', sect: '\u00a7', middot: '\u00b7', times: '\u00d7', ne: '\u2260',
  le: '\u2264', ge: '\u2265', rArr: '\u21d2', rarr: '\u2192', theta: '\u03b8', pi: '\u03c0',
  infin: '\u221e', int: '\u222b', sum: '\u2211', alpha: '\u03b1', beta: '\u03b2', deg: '\u00b0',
  nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", hellip: '\u2026', mdash: '\u2014',
  ndash: '\u2013', prime: '\u2032', frac12: '\u00bd', frac14: '\u00bc', perp: '\u22a5',
  sdot: '\u22c5', cdot: '\u00b7', Sigma: '\u03a3', Delta: '\u0394', tau: '\u03c4',
  ocirc: '\u00f4', ccedil: '\u00e7', plusmn: '\u00b1', Prime: '\u2033', lsquo: '\u2018',
  rsquo: '\u2019', ldquo: '\u201c', rdquo: '\u201d', divide: '\u00f7', frasl: '/' };

function decode(s) {
  return s.replace(/&#(\d+);/g, (m, d) => String.fromCodePoint(+d))
          .replace(/&#x([0-9a-f]+);/gi, (m, h) => String.fromCodePoint(parseInt(h, 16)))
          .replace(/&([a-zA-Z][a-zA-Z0-9]*);/g, (m, n) => ENT[n] !== undefined ? ENT[n] : m);
}
function text(s) {
  return decode(String(s).replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|li|div|h4|h5|tr)>/gi, '\n').replace(/<[^>]+>/g, ''))
    .replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
}

const marks = [];
const aRe = /<article class="lesson" id="L(\d+)"[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>[\s\S]*?<p class="lsec">([\s\S]*?)<\/p>/gi;
let m;
while ((m = aRe.exec(html)) !== null) marks.push({ at: m.index, n: +m[1], title: text(m[2]), sec: text(m[3]) });

const out = [];
for (let i = 0; i < marks.length; i++) {
  const body = html.slice(marks[i].at, i + 1 < marks.length ? marks[i + 1].at : html.length);
  const lb = body.slice(0, body.indexOf('<div class="practice"') >= 0 ? body.indexOf('<div class="practice"') : body.length);
  /* Split on the h5 headings rather than matching across them: escapes inside
     a RegExp built from a string do not survive this environment's heredocs,
     and a silently non-matching pattern is worse than no pattern. */
  const sections = {};
  {
    const parts = lb.split(/<h5>/i);
    for (let j = 1; j < parts.length; j++) {
      const end = parts[j].indexOf('</h5>');
      if (end < 0) continue;
      const label = text(parts[j].slice(0, end)).toLowerCase();
      let rest = parts[j].slice(end + 5);
      for (const stop of ['<div class="probs"', '<div class="mastery"']) {
        const at = rest.indexOf(stop);
        if (at >= 0) rest = rest.slice(0, at);
      }
      sections[label] = text(rest);
    }
  }
  const grab = (label) => {
    const key = Object.keys(sections).find(k => k.indexOf(label.toLowerCase()) === 0);
    return key ? sections[key] : '';
  };
  const trap = (/<div class="trap"[^>]*>([\s\S]*?)<\/div>/i.exec(lb) || [])[1];
  const toolkit = (/<div class="fx key">([\s\S]*?)<\/div>/i.exec(lb) || [])[1];
  out.push({
    lesson: marks[i].n, title: marks[i].title, section: marks[i].sec,
    idea: grab('The idea'),
    toolkit: toolkit ? text(toolkit) : grab('Toolkit'),
    worked: grab('Worked example'),
    trap: trap ? text(trap) : ''
  });
}
fs.writeFileSync('output/field-manual-lessons.json', JSON.stringify(out, null, 1));
console.log('lessons: ' + out.length);
console.log('with toolkit: ' + out.filter(l => l.toolkit).length +
            ', worked example: ' + out.filter(l => l.worked).length +
            ', trap: ' + out.filter(l => l.trap).length);
