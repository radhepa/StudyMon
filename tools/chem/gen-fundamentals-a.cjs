/* Generator for js/data/chem/chem-q-fundamentals-a.js (Gym 1 Measurement and
   Significant Figures, Silberberg 1.3-1.5, lesson 1; Gym 2 Atoms, Ions and Chemical
   Names, Silberberg 2.1-2.7 + nomenclature, lessons 2-3).

     node tools/chem/gen-fundamentals-a.cjs

   The questions live in gen-fundamentals-a-m1.cjs and gen-fundamentals-a-m2.cjs.
   Every numeric answer and numeric distractor is computed in those files from the
   given data (and the course atomic-mass table below), formatted with sci()/fx(), and
   cross-checked with chk(), which throws if a number written into a question
   disagrees with the arithmetic. The correct choice of each mcq is written first in
   the source and placed at a balanced, deterministic position (A-E) by this script. */
const fs = require('fs');
const path = require('path');

const recs = { 1: [], 2: [] };
let CH = 1;

/* course atomic masses (spec / Data Sheet) */
const AM = { H: 1.008, He: 4.003, Li: 6.94, Be: 9.012, B: 10.81, C: 12.01, N: 14.01, O: 16.00, F: 19.00,
  Ne: 20.18, Na: 22.99, Mg: 24.31, Al: 26.98, Si: 28.09, P: 30.97, S: 32.06, Cl: 35.45, Ar: 39.95, K: 39.10,
  Ca: 40.08, Ti: 47.87, Cr: 52.00, Mn: 54.94, Fe: 55.85, Co: 58.93, Ni: 58.69, Cu: 63.55, Zn: 65.38,
  Br: 79.90, Kr: 83.80, Sr: 87.62, Ag: 107.87, Sn: 118.71, I: 126.90, Xe: 131.29, Cs: 132.91, Ba: 137.33,
  Pt: 195.08, Au: 196.97, Hg: 200.59, Pb: 207.2, U: 238.03 };
/* atomic numbers for the elements the questions use */
const Z = { H: 1, He: 2, Li: 3, Be: 4, B: 5, C: 6, N: 7, O: 8, F: 9, Ne: 10, Na: 11, Mg: 12, Al: 13, Si: 14,
  P: 15, S: 16, Cl: 17, Ar: 18, K: 19, Ca: 20, Sc: 21, Ti: 22, V: 23, Cr: 24, Mn: 25, Fe: 26, Co: 27, Ni: 28,
  Cu: 29, Zn: 30, Ga: 31, Ge: 32, As: 33, Se: 34, Br: 35, Kr: 36, Rb: 37, Sr: 38, Y: 39, Zr: 40, Ag: 47,
  Sn: 50, Sb: 51, I: 53, Xe: 54, Cs: 55, Ba: 56, Pb: 82, Ra: 88, U: 92 };

/* formula mass from a plain formula string such as "Fe(NO3)3.9H2O" (dot = hydrate) */
function fmass(f) {
  const parts = f.split('.');
  let total = 0;
  parts.forEach(p => {
    let mult = 1;
    const lead = p.match(/^(\d+)(.*)$/);
    if (lead) { mult = Number(lead[1]); p = lead[2]; }
    total += mult * group(p);
  });
  return total;
  function group(s) {
    let i = 0;
    function parse() {
      let sum = 0;
      while (i < s.length && s[i] !== ')') {
        let m;
        if (s[i] === '(') { i++; const inner = parse(); i++; m = s.slice(i).match(/^\d+/); const n = m ? Number(m[0]) : 1; if (m) i += m[0].length; sum += inner * n; continue; }
        m = s.slice(i).match(/^([A-Z][a-z]?)(\d*)/);
        if (!m || AM[m[1]] == null) throw new Error('bad formula ' + f + ' at ' + s.slice(i));
        sum += AM[m[1]] * (m[2] ? Number(m[2]) : 1);
        i += m[0].length;
      }
      return sum;
    }
    return parse();
  }
}

const SUPD = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻', '+': '⁺' };
function sup(n) { return String(n).split('').map(c => SUPD[c]).join(''); }
function neg(s) { return String(s).replace(/^-/, '−'); }
/* scientific notation with sf significant figures: "6.35 × 10⁻⁷" */
function sci(x, sf) {
  const [mn, e] = Number(x).toExponential(sf - 1).split('e');
  return neg(mn) + ' × 10' + sup(Number(e));
}
/* plain decimal with sf significant figures (no exponent) */
function fx(x, sf) {
  const s = Number(x).toPrecision(sf);
  if (!/e/.test(s)) return neg(s);
  const v = Number(s);
  const d = Math.max(0, sf - 1 - Math.floor(Math.log10(Math.abs(v))));
  return neg(v.toFixed(d));
}
/* fixed number of decimal places */
function fd(x, d) { return neg(Number(x).toFixed(d)); }

function chk(label, got, want, tol) {
  const t = tol == null ? 0.051 : tol;
  if (!(Math.abs(got - want) <= t)) throw new Error('chk failed: ' + label + ' computed ' + got + ' but text says ' + want);
}
function M(l, t, tag, q, right, wrong, why, hints) {
  if (!Array.isArray(wrong) || wrong.length !== 4) throw new Error('need 4 distractors: ' + q.slice(0, 60));
  recs[CH].push({ k: 'mcq', l, t, tag, q, right, wrong, why, hints });
}
function N(l, t, tag, q, disp, val, why, hints, opts) {
  recs[CH].push({ k: 'num', l, t, tag, q, disp, val, why, hints, opts });
}
const api = { M, N, chk, sci, fx, fd, sup, fmass, AM, Z, setCh: n => { CH = n; } };

require('./gen-fundamentals-a-m1.cjs')(api);
require('./gen-fundamentals-a-m2.cjs')(api);

/* deterministic balanced answer positions: each block of five mcqs uses every slot once */
function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function slots(n, seed) {
  const r = rng(seed), out = [];
  while (out.length < n) {
    const b = [0, 1, 2, 3, 4];
    for (let i = 4; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; }
    out.push(...b);
  }
  return out;
}

const lines = [];
const stats = {};
[1, 2].forEach(ch => {
  const list = recs[ch];
  const pos = slots(list.length, ch * 104729 + 17);
  let mi = 0;
  stats[ch] = { n: 0, t: { 1: 0, 2: 0, 3: 0, 4: 0 }, num: 0, lessons: {} };
  list.forEach((r, i) => {
    const id = 'm' + ch + '-a-' + String(i + 1).padStart(3, '0');
    if (!Array.isArray(r.hints) || r.hints.length !== 3) throw new Error(id + ' needs 3 hints');
    const texts = [r.q, r.why].concat(r.hints);
    let rec;
    if (r.k === 'mcq') {
      const p = pos[mi++];
      const c = r.wrong.slice();
      c.splice(p, 0, r.right);
      if (new Set(c.map(s => s.trim().toLowerCase())).size !== 5) throw new Error(id + ' duplicate choices: ' + c.join(' | '));
      texts.push(...c);
      rec = [id, ch, r.l, r.t, r.tag, 'mcq', r.q, c, p, r.why, r.hints];
    } else {
      rec = [id, ch, r.l, r.t, r.tag, 'num', r.q, [r.disp], r.val, r.why, r.hints];
      if (r.opts) rec.push(r.opts);
      stats[ch].num++;
    }
    texts.forEach(s => {
      if (/->|=>|&[a-z]+;|<\/?[a-z]/i.test(s)) throw new Error(id + ' suspicious arrow/markup/entity: ' + s.slice(0, 60));
      if (/undefined|NaN/.test(s)) throw new Error(id + ' undefined/NaN in text: ' + s.slice(0, 80));
    });
    stats[ch].n++; stats[ch].t[r.t]++; stats[ch].lessons[r.l] = (stats[ch].lessons[r.l] || 0) + 1;
    lines.push(JSON.stringify(rec));
  });
});

const header = `/* GENERATED by tools/chem/gen-fundamentals-a.cjs - edit the generator
   (gen-fundamentals-a-m1.cjs, gen-fundamentals-a-m2.cjs), not this file.

   Periodic Coast question bank, Exam 1 fundamentals:
   - Gym 1 (Measurement and Significant Figures, Silberberg 1.1-1.5, lesson 1): SI base
     units and prefixes, squared/cubed unit conversions, volume units, the three
     temperature scales, density (all three unknowns, displacement, floating),
     extensive/intensive and physical/chemical properties, states of matter, counting
     and rounding significant figures, sig figs in calculations, accuracy/precision and
     systematic/random error, scientific notation and multi-step dimensional analysis.
   - Gym 2 (Atoms, Ions and Chemical Names, Silberberg 2.1-2.7 + nomenclature, lessons
     2-3): classification of matter and separations, the three mass laws (mass fraction
     and multiple-proportion calculations), Dalton's postulates, the cathode-ray,
     oil-drop and gold-foil experiments, protons/neutrons/electrons in atoms and ions,
     isotopes and average atomic mass (forward and back-solved abundances), the
     periodic table, monatomic ion charges, ionic vs molecular compounds, naming and
     formulas (binary ionic, Roman numerals, polyatomic ions, hydrates, binary molecular,
     binary acids and oxoacids), counting atoms and formula masses (incl. the Week 3
     recitation worksheet's CaCO3, N2O4, Fe2O3 and Li2SO3 items).

   Sources: the CHM 11510 Lecture 1 slides (sig-fig and rounding rules, clicker and
   55.0 mph examples), the Week 3 recitation worksheet, and Silberberg 10th ed.
   Chapter 1-2 sample-problem and end-of-chapter problem types (original numbers).
   Every number was computed by the generator with the course atomic masses. Rounding
   note: the Lecture 1 slides round a removed 5 (followed by nothing but zeros) to keep
   the preceding digit even, while the 10th-edition text rounds 5 up; questions avoid
   that case except one that states the lecture rule explicitly. */
chemAddQuestions([
`;
const out = header + lines.join(',\n') + '\n]);\n';
const file = path.join(__dirname, '..', '..', 'js', 'data', 'chem', 'chem-q-fundamentals-a.js');
fs.writeFileSync(file, out, 'utf8');
[1, 2].forEach(ch => {
  const s = stats[ch];
  console.log('ch' + ch + ': ' + s.n + ' questions; tiers t1 ' + s.t[1] + ' t2 ' + s.t[2] + ' t3 ' + s.t[3] + ' t4 ' + s.t[4] +
    '; num ' + s.num + '; lessons ' + JSON.stringify(s.lessons));
});
console.log('wrote ' + file);
