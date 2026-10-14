/* Generator for js/data/chem/chem-q-final.js (Gym 12 Gases, Gym 13 Nuclear,
   chapter 93 Exam 3 review, chapter 94 Final review).

     node tools/chem/gen-final.cjs

   Every number in a question, its choices and its worked solution is computed
   here from the course constants, so the answer key and the explanation can
   never disagree. The question text lives in the four part files
   gen-final-12.cjs, gen-final-13.cjs, gen-final-93.cjs and gen-final-94.cjs. */
const fs = require('fs');
const path = require('path');

const SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻', '+': '⁺' };
const supn = n => String(n).split('').map(c => SUP[c]).join('');

/* Course rule (Lecture 1 slides): an EXACT 5 is rounded to the even digit (1.45 → 1.4,
   3.125 → 3.12); anything past the 5 rounds up as usual. a ≥ 0, d = decimals to keep. */
function fixedEven(a, d) {
  const p = Math.pow(10, d), v = a * p, fl = Math.floor(v), fr = v - fl;
  if (Math.abs(fr - 0.5) < 1e-9 * Math.max(1, v)) {
    const n = fl % 2 === 0 ? fl : fl + 1;
    return d >= 0 ? (n / p).toFixed(d) : String(n / p);
  }
  return d >= 0 ? a.toFixed(d) : String(Math.round(v) / p);
}
/* x in scientific notation with sf significant figures: "3.13 × 10⁻¹⁹". */
function sci(x, sf) {
  if (x === 0) return '0';
  const neg = x < 0, a = Math.abs(x);
  let e = Math.floor(Math.log10(a));
  let ms = fixedEven(a / Math.pow(10, e), sf - 1);
  if (parseFloat(ms) >= 10) { e += 1; ms = fixedEven(a / Math.pow(10, e), sf - 1); }
  return (neg ? '−' : '') + ms + ' × 10' + supn(e);
}
/* x with sf significant figures; plain when that is unambiguous, else scientific.
   A whole number whose last significant digit is a zero gets a trailing decimal point
   (360. has 3 sig figs, 360 only 2). */
function s(x, sf) {
  if (x === 0) return (0).toFixed(Math.max(0, sf - 1));
  const a = Math.abs(x);
  const e0 = Math.floor(Math.log10(a));
  const r = Number(fixedEven(a, sf - 1 - e0));
  const e = Math.floor(Math.log10(r));
  if ((e >= sf && e >= 3) || r < 1e-3 || r >= 1e5) return sci(x, sf);
  let out = r.toFixed(Math.max(0, sf - 1 - e));
  if (sf - 1 - e === 0 && /0$/.test(out)) out += '.';
  return (x < 0 ? '−' : '') + out;
}
/* fixed decimals with a Unicode minus */
const f = (x, d) => (x < 0 ? '−' : '') + fixedEven(Math.abs(x), d);
const sg = (x, sf) => (x > 0 ? '+' : '') + s(x, sf);   // signed

function parseNumber(str) {
  let t = String(str).trim().toLowerCase();
  t = t.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/g, ch => ({ '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-', '⁺': '+' })[ch]);
  t = t.replace(/−/g, '-').replace(/,/g, '').replace(/\s+/g, ' ');
  t = t.replace(/\s*[×x*]\s*10\s*\^?\s*\(?\s*([+-]?\d+)\s*\)?/, 'e$1');
  const m = t.match(/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/);
  return m ? Number(m[0]) : NaN;
}

const H = {
  s, sci, f, sg, parseNumber,
  K: c => c + 273.15,
  R: 0.08206, R8: 8.314, NA: 6.022e23, h: 6.626e-34, c: 2.998e8,
  amu: 1.6605e-27, MeV: 931.5, me: 9.109e-31,
  M: { H: 1.008, He: 4.003, Li: 6.94, Be: 9.012, B: 10.81, C: 12.01, N: 14.01, O: 16.00, F: 19.00, Ne: 20.18,
       Na: 22.99, Mg: 24.31, Al: 26.98, Si: 28.09, P: 30.97, S: 32.06, Cl: 35.45, Ar: 39.95, K: 39.10, Ca: 40.08,
       Ti: 47.87, Cr: 52.00, Mn: 54.94, Fe: 55.85, Co: 58.93, Ni: 58.69, Cu: 63.55, Zn: 65.38, Br: 79.90, Kr: 83.80,
       Sr: 87.62, Ag: 107.87, Sn: 118.71, I: 126.90, Xe: 131.29, Cs: 132.91, Ba: 137.33, Pt: 195.08, Au: 196.97,
       Hg: 200.59, Pb: 207.2, U: 238.03 }
};
/* molar mass from a formula like "C3H8" or "NaN3" (no parentheses) */
H.mm = formula => {
  let total = 0;
  formula.replace(/([A-Z][a-z]?)(\d*)/g, (_, el, n) => {
    if (H.M[el] == null) throw new Error('no mass for ' + el);
    total += H.M[el] * (n ? Number(n) : 1);
  });
  return Math.round(total * 1000) / 1000;
};

const PERM = [2, 0, 3, 1, 4, 1, 3, 0, 4, 2];
const counters = {};
const spots = {};
const out = [];
const problems = [];

function add(ch, q) {
  const n = (counters[ch] = (counters[ch] || 0) + 1);
  const id = 'm' + ch + '-a-' + String(n).padStart(3, '0');
  if (!q.h || q.h.length !== 3) problems.push(id + ': needs 3 hints');
  if (q.num != null) {
    const v = parseNumber(q.a);
    const tol = q.tol || 0.01;
    const slack = q.abs != null ? q.abs : Math.abs(q.num) * tol + 1e-300;
    if (!(Math.abs(v - q.num) <= slack)) problems.push(id + ': display ' + q.a + ' vs ' + q.num);
    const opts = q.abs != null ? { abs: q.abs } : q.tol ? { tol: q.tol } : null;
    out.push([id, ch, q.l, q.t, q.tag, 'num', q.q, [q.a], q.num, q.why, q.h].concat(opts ? [opts] : []));
    return;
  }
  if (!Array.isArray(q.c) || q.c.length !== 5) { problems.push(id + ': needs 5 choices'); return; }
  const norm = q.c.map(x => String(x).trim().toLowerCase());
  if (new Set(norm).size !== 5) problems.push(id + ': duplicate choices ' + JSON.stringify(q.c));
  const right = q.c[0];
  let choices, ans;
  if (q.fixed != null) { choices = q.c.slice(); ans = q.fixed; }
  else if (q.sort) {
    /* Numeric choices in order (ascending or descending, whichever puts the key on the
       less-used letter). If both orders land on an over-used letter (the middle one),
       the distractors stay in order and the key is slotted into the least-used letter. */
    const used = (spots[ch] = spots[ch] || [0, 0, 0, 0, 0]);
    const asc = q.c.slice().sort((x, y) => parseNumber(x) - parseNumber(y));
    if (asc.some(x => isNaN(parseNumber(x)))) problems.push(id + ': unsortable choice');
    const pa = asc.indexOf(right), pd = 4 - pa;
    const least = Math.min.apply(null, used);
    if (used[pa] <= least + 1 || used[pd] <= least + 1) {
      if (used[pd] < used[pa]) { choices = asc.slice().reverse(); ans = pd; }
      else { choices = asc; ans = pa; }
    } else {
      const p = used.indexOf(least);
      const rest = asc.filter(x => x !== right);
      choices = rest.slice(0, p).concat([right], rest.slice(p));
      ans = p;
    }
  } else {
    const p = PERM[(n - 1) % PERM.length];
    const rest = q.c.slice(1);
    choices = rest.slice(0, p).concat([right], rest.slice(p));
    ans = p;
  }
  (spots[ch] = spots[ch] || [0, 0, 0, 0, 0])[ans]++;
  out.push([id, ch, q.l, q.t, q.tag, 'mcq', q.q, choices, ans, q.why, q.h]);
}

[['12', 12], ['13', 13], ['93', 93], ['94', 94]].forEach(([file, ch]) => {
  require('./gen-final-' + file + '.cjs')(H).forEach(q => add(ch, q));
});

if (problems.length) { console.error(problems.join('\n')); process.exit(1); }

const header = `/* Periodic Coast - GENERATED by tools/chem/gen-final.cjs (do not hand-edit; edit the generator).

   Gym 12 Gases (Silberberg Ch 5, lectures 25-26), Gym 13 Nuclear chemistry (Silberberg 24.1,
   24.5-24.7 and decay kinetics, lectures 27-28), chapter 93 (Evening Exam 3 review: Ch 9, 10, 12,
   13 and 15.6 in exam format) and chapter 94 (comprehensive Final review: cross-chapter problems,
   extra weight on gases and nuclear, plus ten Ch 1-4 refresher items).

   Sources: the gym notes in chem-world.js, the course constants sheet (R = 0.08206 L·atm/(mol·K)
   = 8.314 J/(mol·K), 1 atm = 760 torr = 101.325 kPa, STP 0 °C and 1 atm with 22.4 L/mol,
   1 amu = 931.5 MeV), and Silberberg 10th ed. sample-problem and end-of-chapter problem types,
   written as original questions. Every number in a stem, a choice and a worked solution is
   computed by the generator from those constants, so keys and explanations agree. */
`;
const body = 'chemAddQuestions([\n' + out.map(r => JSON.stringify(r)).join(',\n') + '\n]);\n';
const dest = path.join(__dirname, '..', '..', 'js', 'data', 'chem', 'chem-q-final.js');
fs.writeFileSync(dest, header + body);

const tally = {};
out.forEach(r => {
  const k = r[1];
  tally[k] = tally[k] || { n: 0, t: [0, 0, 0, 0, 0], num: 0, pos: [0, 0, 0, 0, 0] };
  tally[k].n++; tally[k].t[r[3]]++;
  if (r[5] === 'num') tally[k].num++; else tally[k].pos[r[8]]++;
});
Object.keys(tally).forEach(k => {
  const x = tally[k];
  console.log('ch ' + k + ': ' + x.n + '  tiers 1-4: ' + x.t.slice(1).join('/') + '  num ' + x.num + '  answer spots ' + x.pos.join('/'));
});
console.log('wrote ' + out.length + ' questions to ' + dest);
