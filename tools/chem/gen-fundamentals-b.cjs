/* Generator for js/data/chem/chem-q-fundamentals-b.js (Periodic Coast: Gym 3 mole &
   stoichiometry, Gym 4 solutions & aqueous reactions, chapter 91 Exam 1 review).

     node tools/chem/gen-fundamentals-b.cjs

   Every numeric answer and every numeric distractor is computed here from the course
   atomic masses, so the explanation text and the choices cannot drift apart. The
   builder refuses duplicate choices and numeric distractors that sit within 0.5 % of
   the key. Correct-answer positions rotate through A-E. */
const fs = require('fs');
const path = require('path');

/* ---------------- data ---------------- */
const AM = { H: 1.008, He: 4.003, Li: 6.94, Be: 9.012, B: 10.81, C: 12.01, N: 14.01, O: 16.00, F: 19.00,
  Ne: 20.18, Na: 22.99, Mg: 24.31, Al: 26.98, Si: 28.09, P: 30.97, S: 32.06, Cl: 35.45, Ar: 39.95, K: 39.10,
  Ca: 40.08, Ti: 47.87, Cr: 52.00, Mn: 54.94, Fe: 55.85, Co: 58.93, Ni: 58.69, Cu: 63.55, Zn: 65.38,
  Br: 79.90, Kr: 83.80, Sr: 87.62, Ag: 107.87, Sn: 118.71, I: 126.90, Xe: 131.29, Cs: 132.91, Ba: 137.33,
  Pt: 195.08, Au: 196.97, Hg: 200.59, Pb: 207.2, U: 238.03 };
const NA = 6.022e23;

function counts(f) {
  let i = 0;
  function num() { const m = f.slice(i).match(/^\d+/); if (m) { i += m[0].length; return +m[0]; } return 1; }
  function group() {
    const c = {};
    while (i < f.length) {
      const ch = f[i];
      if (ch === '(') { i++; const g = group(); i++; const n = num(); for (const k in g) c[k] = (c[k] || 0) + g[k] * n; }
      else if (ch === ')') return c;
      else {
        const m = f.slice(i).match(/^[A-Z][a-z]?/);
        if (!m) throw new Error('bad formula ' + f);
        i += m[0].length; const n = num(); c[m[0]] = (c[m[0]] || 0) + n;
      }
    }
    return c;
  }
  return group();
}
function mm(f) { const c = counts(f); let s = 0; for (const k in c) { if (!(k in AM)) throw new Error('no mass ' + k); s += AM[k] * c[k]; } return s; }
function isBalanced(eq) {
  const side = s => { const t = {}; s.split('+').forEach(term => { const m = term.trim().match(/^(\d*)(.*)$/); const k = m[1] ? +m[1] : 1; const c = counts(m[2]); for (const e in c) t[e] = (t[e] || 0) + k * c[e]; }); return t; };
  const [l, r] = eq.split('->'); const a = side(l), b = side(r);
  return [...new Set([...Object.keys(a), ...Object.keys(b)])].every(k => (a[k] || 0) === (b[k] || 0));
}
const SUB = '₀₁₂₃₄₅₆₇₈₉';
const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '-': '⁻', '+': '⁺' };
function uf(f) { return f.replace(/\d/g, d => SUB[d]); }
function U(eq) { return eq.split('->').map(s => s.split('+').map(t => { const m = t.trim().match(/^(\d*)(.*)$/); return m[1] + uf(m[2]); }).join(' + ')).join(' → '); }
function fmt(x, n) {
  if (x === 0) return '0';
  const ax = Math.abs(x);
  let s = (ax < 1e-3 || ax >= 1e5) ? x.toExponential(n - 1) : x.toPrecision(n);
  if (/e/.test(s)) { const [m, e] = s.split('e'); return m.replace('-', '−') + ' × 10' + String(Number(e)).split('').map(c => SUP[c]).join(''); }
  return s.replace('-', '−');
}
const f2 = x => fmt(x, 2), f3 = x => fmt(x, 3), f4 = x => fmt(x, 4), f5 = x => fmt(x, 5);
const r2 = x => x.toFixed(2);          // molar masses to 0.01 g/mol

/* ---------------- builders ---------------- */
const OUT = { 3: [], 4: [], 91: [] };
const rot = { 3: 0, 4: 0, 91: 0 };
const ORDER = [2, 0, 3, 1, 4, 1, 4, 0, 2, 3];
function lead(s) {
  let t = String(s).replace(/−/g, '-').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]/g, c => ({ '⁰': 0, '¹': 1, '²': 2, '³': 3, '⁴': 4, '⁵': 5, '⁶': 6, '⁷': 7, '⁸': 8, '⁹': 9, '⁻': '-' })[c]);
  t = t.replace(/\s*×\s*10([+-]?\d+)/, 'e$1');
  const m = t.match(/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/); return m ? Number(m[0]) : NaN;
}
function push(ch, rec) { rec[0] = 'm' + ch + '-a-' + String(OUT[ch].length + 1).padStart(3, '0'); OUT[ch].push(rec); }
function check(q, c, right) {
  if (new Set(c).size !== c.length) throw new Error('duplicate choices: ' + q + '\n' + c.join(' | '));
  if (/,/.test(right) || /significant figures|[Rr]eported correctly/.test(q)) return;   // sig-fig questions are close on purpose
  const rv = lead(right);
  const unit = x => String(x).replace(/^[^a-zA-Z%]*/, '');
  c.forEach((a, i) => c.forEach((b, j) => { if (j <= i) return; const va = lead(a), vb = lead(b); if (!isNaN(va) && !isNaN(vb) && unit(a) === unit(b) && Math.abs(va - vb) <= Math.max(Math.abs(va), Math.abs(vb)) * 0.005) throw new Error('choices too close: ' + q + ' :: ' + a + ' vs ' + b); }));
  if (!isNaN(rv)) c.forEach(w => { if (w === right) return; const wv = lead(w); const unitR = String(right).replace(/^[^a-zA-Z%]*/, ''), unitW = String(w).replace(/^[^a-zA-Z%]*/, ''); if (!isNaN(wv) && unitR === unitW && Math.abs(wv - rv) <= Math.abs(rv) * 0.005) throw new Error('distractor too close: ' + q + '\n' + right + ' vs ' + w); });
}
function M(ch, les, t, tag, q, right, wrong, why, hints) {
  if (wrong.length !== 4) throw new Error('need 4 distractors: ' + q);
  if (hints.length !== 3) throw new Error('need 3 hints: ' + q);
  const p = ORDER[rot[ch]++ % ORDER.length];
  const c = wrong.slice(); c.splice(p, 0, right); check(q, c, right);
  push(ch, [null, ch, les, t, tag, 'mcq', q, c, p, why, hints]);
}
function MF(ch, les, t, tag, q, choices, ans, why, hints) {
  if (choices.length !== 5 || hints.length !== 3) throw new Error('MF shape: ' + q);
  check(q, choices, choices[ans]);
  push(ch, [null, ch, les, t, tag, 'mcq', q, choices, ans, why, hints]);
}
function N(ch, les, t, tag, q, disp, val, why, hints, opts) {
  if (hints.length !== 3) throw new Error('need 3 hints: ' + q);
  const r = [null, ch, les, t, tag, 'num', q, [disp], val, why, hints]; if (opts) r.push(opts); push(ch, r);
}

/* =====================================================================
   GYM 3 - THE MOLE AND STOICHIOMETRY (lessons 3, 4; Silberberg 3.1, 3.3-3.4)
   ===================================================================== */
{
  const G = 3;
  /* ---------- lesson 3: the mole, molar mass, composition ---------- */
  M(G, 3, 1, 'Concept', 'Which statement about one mole is TRUE?',
    '1 mol of H₂O contains 6.022 × 10²³ molecules and 1.807 × 10²⁴ atoms.',
    ['1 mol of H₂O contains 6.022 × 10²³ atoms.', '1 mol of any substance has a mass of 6.022 × 10²³ g.',
     '1 mol of O₂ and 1 mol of H₂ have the same mass.', '1 mol of NaCl contains 6.022 × 10²³ ions.'],
    `A mole is 6.022 × 10²³ ENTITIES of whatever the formula names. For water the entities are molecules, and each molecule has 3 atoms, so 1 mol H₂O = 6.022 × 10²³ molecules = 3 × 6.022 × 10²³ = ${f4(3 * NA)} atoms. Traps: counting molecules as atoms; 6.022 × 10²³ is a count, not a mass (1 mol of H₂O is only 18.02 g); 1 mol O₂ (32.00 g) and 1 mol H₂ (2.016 g) have the same NUMBER of molecules but different masses; NaCl gives one Na⁺ and one Cl⁻ per formula unit, so 1 mol NaCl holds 2 × 6.022 × 10²³ ions.`,
    ['A mole counts the entities the formula names.', 'In water, what are the entities - atoms or molecules - and how many atoms does each contain?', '1 mol H₂O = 6.022 × 10²³ molecules, and each molecule carries 3 atoms.']);

  M(G, 3, 1, 'Concept', 'The molar mass of a compound, in g/mol, is numerically equal to:',
    'its formula (molecular) mass in amu',
    ['its mass number', 'the mass of one molecule in grams', 'the number of atoms in one formula unit × 6.022 × 10²³', 'its density in g/mL'],
    'The mole was chosen so that the mass of 1 mol in grams has the same number as the mass of one formula unit in amu: H₂O is 18.02 amu per molecule and 18.02 g/mol. The mass of ONE molecule in grams is tiny (18.02 g ÷ 6.022 × 10²³ = 2.992 × 10⁻²³ g). Mass number belongs to a single isotope of an atom, not a compound. Atoms × Avogadro is a count, not a mass, and density is a different property altogether.',
    ['Compare H₂O: 18.02 amu per molecule and ? g per mole.', 'The same digits appear in both, only the unit changes.', 'Formula mass (amu) and molar mass (g/mol) share the number.']);

  M(G, 3, 1, 'Concept', 'Which quantity has the units g/mol?',
    'Molar mass',
    ['Avogadro’s number', 'Formula mass', 'Molarity', 'Density'],
    'Molar mass is grams per mole of the substance (e.g. CaCO₃, 100.09 g/mol) - it is the conversion factor between grams and moles. Avogadro’s number has units of entities per mole (mol⁻¹). Formula mass is in amu (per single formula unit). Molarity is mol/L (Chapter 4) and density is g/mL or g/cm³.',
    ['Which quantity converts grams into moles?', 'Divide grams by it and you get moles.', 'grams ÷ (g/mol) = mol.']);

  M(G, 3, 2, 'Worksheet', 'Week 3 worksheet, Q1: What is the formula mass of calcium carbonate, CaCO₃?',
    `${r2(mm('CaCO3'))} amu`,
    [`${r2(mm('CaCO'))} amu`, `${r2(mm('CaCO2'))} amu`, `${r2(mm('CaCO4'))} amu`, `${r2(mm('CO3'))} amu`],
    `Add every atom: Ca 40.08 + C 12.01 + 3 × O 16.00 = 40.08 + 12.01 + 48.00 = ${r2(mm('CaCO3'))} amu. The distractors count O once (${r2(mm('CaCO'))}), twice (${r2(mm('CaCO2'))}) or four times (${r2(mm('CaCO4'))}), or leave out Ca entirely (carbonate ion alone, ${r2(mm('CO3'))}). The subscript 3 multiplies only the O.`,
    ['Carbonate is CO₃²⁻: how many O atoms?', 'Ca + C + 3 O.', '40.08 + 12.01 + 3(16.00).']);

  N(G, 3, 2, 'Worksheet', 'Week 3 worksheet, Q2: What is the molecular mass of dinitrogen tetroxide, N₂O₄? (Enter a number in amu.)',
    `${r2(mm('N2O4'))} amu`, mm('N2O4'),
    `Di- = 2 N, tetr- = 4 O: 2(14.01) + 4(16.00) = 28.02 + 64.00 = ${r2(mm('N2O4'))} amu. (If you got ${r2(mm('NO2'))} you used NO₂, nitrogen dioxide - the molecule N₂O₄ is its dimer.)`,
    ['Translate the prefixes into subscripts first.', 'di = 2, tetra = 4.', '2 × 14.01 + 4 × 16.00.']);

  { const n = 1.894e23 / NA, Mx = mm('Fe2O3'), g = n * Mx;
    M(G, 3, 3, 'Worksheet', 'Week 3 worksheet, Q3: What is the mass of 1.894 × 10²³ molecules (formula units) of Fe₂O₃?',
      `${f3(g)} g`,
      [`${f3(n)} g`, `${f3(n / Mx)} g`, `${f3(n * AM.Fe)} g`, `${f3(1.894e23 * Mx)} g`],
      `Particles → moles → grams. n = 1.894 × 10²³ ÷ 6.022 × 10²³ mol⁻¹ = ${f4(n)} mol. M(Fe₂O₃) = 2(55.85) + 3(16.00) = ${r2(Mx)} g/mol. Mass = ${f4(n)} mol × ${r2(Mx)} g/mol = ${f4(g)} g → ${f3(g)} g (worksheet answer 50.2 g). Traps: ${f3(n)} g stops at moles; ${f3(n / Mx)} g divides by the molar mass; ${f3(n * AM.Fe)} g uses the molar mass of Fe instead of Fe₂O₃; ${f3(1.894e23 * Mx)} g skips the ÷ 6.022 × 10²³ step.`,
      ['Two conversions: particles to moles, then moles to grams.', 'Divide by Avogadro’s number, then multiply by the molar mass of Fe₂O₃.', `${f4(n)} mol × ${r2(Mx)} g/mol.`]); }

  { const g = 4.25e22 / NA * mm('N2O4');
    N(G, 3, 3, 'Worksheet', 'What is the mass of 4.25 × 10²² molecules of N₂O₄? (Enter a number in grams.)',
      `${f3(g)} g`, g,
      `n = 4.25 × 10²² ÷ 6.022 × 10²³ = ${f4(4.25e22 / NA)} mol; × ${r2(mm('N2O4'))} g/mol = ${f4(g)} g → ${f3(g)} g (3 sig figs from 4.25).`,
      ['Same road as the Fe₂O₃ worksheet problem.', 'molecules ÷ N_A = mol; mol × molar mass = g.', `(4.25 × 10²² ÷ 6.022 × 10²³) × ${r2(mm('N2O4'))}.`]); }

  { const n = 25.0 / mm('CO2'), m = n * NA;
    M(G, 3, 2, 'Calculation', 'How many molecules are in 25.0 g of CO₂?',
      `${f3(m)} molecules`,
      [`${f3(3 * m)} molecules`, `${f3(25.0 * NA)} molecules`, `${f3(25.0 * mm('CO2') * NA)} molecules`, `${f3(NA / n)} molecules`],
      `n = 25.0 g ÷ ${r2(mm('CO2'))} g/mol = ${f4(n)} mol; molecules = ${f4(n)} × 6.022 × 10²³ = ${f4(m)} → ${f3(m)}. Traps: ${f3(3 * m)} counts ATOMS (3 per CO₂); ${f3(25.0 * NA)} skips the ÷ molar mass step; ${f3(25.0 * mm('CO2') * NA)} multiplies by the molar mass; ${f3(NA / n)} divides Avogadro’s number by the moles.`,
      ['Grams cannot go straight to molecules - go through moles.', 'g ÷ molar mass → mol; mol × 6.022 × 10²³ → molecules.', `${f4(n)} mol × 6.022 × 10²³.`]); }

  { const Mx = mm('Li2SO3'), n = 9.234 / Mx;
    M(G, 3, 2, 'Worksheet', 'Week 3 worksheet, Q4(a): How many moles of lithium sulfite, Li₂SO₃, are in 9.234 g?',
      `${f4(n)} mol`,
      [`${f4(9.234 / mm('LiSO3'))} mol`, `${f4(9.234 / mm('Li2SO4'))} mol`, `${f4(Mx / 9.234)} mol`, `${f4(9.234 * Mx)} mol`],
      `M(Li₂SO₃) = 2(6.94) + 32.06 + 3(16.00) = ${r2(Mx)} g/mol. n = 9.234 g ÷ ${r2(Mx)} g/mol = ${f4(n)} mol (4 sig figs, as on the worksheet). Traps: ${f4(9.234 / mm('LiSO3'))} mol uses LiSO₃ (forgot that sulfite is 2− so it needs two Li⁺); ${f4(9.234 / mm('Li2SO4'))} mol uses Li₂SO₄ (sulfATE, not sulfITE); ${f4(Mx / 9.234)} is molar mass ÷ grams; ${f4(9.234 * Mx)} multiplies.`,
      ['Sulfite is SO₃²⁻ and lithium is Li⁺ - check the formula first.', 'Moles = grams ÷ molar mass.', `9.234 ÷ ${r2(Mx)}.`]);
    const fu = n * NA;
    N(G, 3, 2, 'Worksheet', 'Week 3 worksheet, Q4(b): How many formula units are in 9.234 g of Li₂SO₃? (Enter a number of formula units, e.g. 1.234 × 10²².)',
      `${f4(fu)} formula units`, fu,
      `From part (a), n = ${f4(n)} mol. Formula units = ${f4(n)} mol × 6.022 × 10²³ mol⁻¹ = ${f4(fu)}. An ionic compound has no molecules, so the entity is called a formula unit.`,
      ['Start from the moles you found in part (a).', 'Multiply moles by Avogadro’s number.', `${f4(n)} × 6.022 × 10²³.`]);
    M(G, 3, 3, 'Worksheet', 'How many lithium IONS are in 9.234 g of Li₂SO₃?',
      `${f4(2 * fu)} Li⁺ ions`,
      [`${f4(fu)} Li⁺ ions`, `${f4(3 * fu)} Li⁺ ions`, `${f4(6 * fu)} Li⁺ ions`, `${f4(fu / 2)} Li⁺ ions`],
      `n(Li₂SO₃) = ${f4(n)} mol, so ${f4(fu)} formula units. Each formula unit holds 2 Li⁺, so Li⁺ = 2 × ${f4(fu)} = ${f4(2 * fu)}. Traps: ${f4(fu)} is the formula units (forgot the subscript 2); ${f4(3 * fu)} counts O atoms; ${f4(6 * fu)} counts every atom; ${f4(fu / 2)} divides by the subscript instead of multiplying.`,
      ['Find formula units first, then look at the subscript on Li.', 'Each Li₂SO₃ contains two Li⁺.', `2 × ${f4(fu)}.`]); }

  { const Mx = mm('Ca(NO3)2'), n = 5.00 / Mx, O = n * 6 * NA;
    M(G, 3, 3, 'Calculation', 'How many oxygen atoms are in 5.00 g of calcium nitrate, Ca(NO₃)₂?',
      `${f3(O)} O atoms`,
      [`${f3(n * 3 * NA)} O atoms`, `${f3(n * NA)} O atoms`, `${f3(5.00 / mm('CaNO3') * 3 * NA)} O atoms`, `${f3(n * 9 * NA)} O atoms`],
      `M(Ca(NO₃)₂) = 40.08 + 2(14.01 + 3 × 16.00) = ${r2(Mx)} g/mol. n = 5.00 ÷ ${r2(Mx)} = ${f4(n)} mol. The parentheses multiply: 2 × 3 = 6 O per formula unit. O atoms = ${f4(n)} × 6 × 6.022 × 10²³ = ${f3(O)}. Traps: ${f3(n * 3 * NA)} uses 3 O (ignored the subscript 2 outside the parentheses); ${f3(n * NA)} counts formula units; ${f3(5.00 / mm('CaNO3') * 3 * NA)} writes the formula as CaNO₃; ${f3(n * 9 * NA)} counts all 9 atoms.`,
      ['How many O atoms are in one Ca(NO₃)₂?', 'The 2 outside the parentheses doubles everything inside: 6 O.', `${f4(n)} mol × 6 × 6.022 × 10²³.`]); }

  MF(G, 3, 2, 'Concept', 'How many moles of O atoms are in 0.50 mol of Fe₂O₃?',
    ['0.50 mol', '1.0 mol', '1.5 mol', '2.5 mol', '3.0 mol'], 2,
    'Each formula unit of Fe₂O₃ has 3 O atoms, so moles of O = 3 × 0.50 = 1.5 mol (and moles of Fe = 2 × 0.50 = 1.0 mol). 0.50 mol is the compound itself, 1.0 mol is the Fe, 2.5 mol counts all 5 atoms, 3.0 mol multiplies by 3 and then by 2 again.',
    ['Look at the subscript on O.', 'Moles of an element = subscript × moles of compound.', '3 × 0.50.']);

  N(G, 3, 2, 'Calculation', 'How many moles of H atoms are in 0.250 mol of ammonium phosphate, (NH₄)₃PO₄? (Enter a number in mol.)',
    '3.00 mol', 3.00,
    '(NH₄)₃PO₄ has 3 ammonium ions × 4 H = 12 H per formula unit. Moles of H = 12 × 0.250 = 3.00 mol. (Using 4 gives 1.00 mol - the 3 outside the parentheses was ignored.)',
    ['Count H in one formula unit, remembering the parentheses.', '(NH₄)₃ means 3 × 4 H.', '12 × 0.250.']);

  { const Mx = mm('(NH4)2SO4'), N2 = 2 * AM.N, g = 2.50 * N2 / Mx;
    M(G, 3, 3, 'Calculation', 'What mass of nitrogen is contained in 2.50 g of ammonium sulfate, (NH₄)₂SO₄?',
      `${f3(g)} g`,
      [`${f3(g / 2)} g`, `${f3(2.50 * 2 * mm('NH4') / Mx)} g`, `${f3(2 * g)} g`, `${f3(2 * 2.50 / Mx)} g`],
      `M((NH₄)₂SO₄) = 2(14.01 + 4 × 1.008) + 32.06 + 4(16.00) = ${r2(Mx)} g/mol, and one mole contains 2 × 14.01 = 28.02 g N. Mass fraction of N = 28.02 / ${r2(Mx)} = ${f4(N2 / Mx)}. Mass of N = 2.50 g × ${f4(N2 / Mx)} = ${f3(g)} g. Traps: ${f3(g / 2)} g counts only one N; ${f3(2.50 * 2 * mm('NH4') / Mx)} g uses the mass of the whole NH₄⁺ ion; ${f3(2 * g)} g counts N four times; ${f3(2 * 2.50 / Mx)} is the MOLES of N, not grams.`,
      ['Mass of element = mass of sample × mass fraction of that element.', 'Mass fraction of N = (2 × 14.01) ÷ molar mass of (NH₄)₂SO₄.', `2.50 × 28.02 / ${r2(Mx)}.`]); }

  { const Mx = mm('NH4NO3'), p = 2 * AM.N / Mx * 100;
    M(G, 3, 2, 'Calculation', 'What is the mass percent of nitrogen in ammonium nitrate, NH₄NO₃?',
      `${p.toFixed(2)}%`,
      [`${(p / 2).toFixed(2)}%`, `${(48 / Mx * 100).toFixed(2)}%`, `${(4 * AM.H / Mx * 100).toFixed(2)}%`, `${(2 / 9 * 100).toFixed(2)}%`],
      `NH₄NO₃ has 2 N (one in NH₄⁺, one in NO₃⁻). M = 2(14.01) + 4(1.008) + 3(16.00) = ${r2(Mx)} g/mol. %N = 28.02 / ${r2(Mx)} × 100 = ${p.toFixed(2)}%. Traps: ${(p / 2).toFixed(2)}% counts only one N; ${(48 / Mx * 100).toFixed(2)}% is the percent O; ${(4 * AM.H / Mx * 100).toFixed(2)}% is the percent H; ${(2 / 9 * 100).toFixed(2)}% is the fraction of ATOMS that are N (2 of 9) - mass percent uses masses.`,
      ['Count the N atoms: there is one in each ion.', 'Mass percent = (mass of N in 1 mol) ÷ (molar mass) × 100.', `28.02 ÷ ${r2(Mx)} × 100.`]); }

  { const list = [['CO(NH2)2', 'urea, CO(NH₂)₂', 2], ['NH4NO3', 'NH₄NO₃', 2], ['NH4Cl', 'NH₄Cl', 1], ['(NH4)2SO4', '(NH₄)₂SO₄', 2], ['NaNO3', 'NaNO₃', 1]];
    const pc = list.map(([f, n, k]) => [n, k * AM.N / mm(f) * 100]);
    M(G, 3, 3, 'Calculation', 'Which fertilizer has the greatest mass percent of nitrogen?',
      pc[0][0], pc.slice(1).map(x => x[0]),
      `Compute each: ${pc.map(x => x[0] + ' ' + x[1].toFixed(1) + '%').join('; ')}. Urea wins: it carries 2 N on a small molar mass (60.06 g/mol). (NH₄)₂SO₄ also has 2 N, but the heavy sulfate dilutes them. Having the most N atoms is not enough - the N mass is divided by the whole molar mass.`,
      ['Mass percent depends on both the N count and the molar mass.', 'For each: (number of N × 14.01) ÷ molar mass × 100.', 'Two N on the lightest formula wins.']); }

  { const anh = mm('CuSO4'), w = 5 * mm('H2O'), tot = anh + w, p = w / tot * 100;
    M(G, 3, 3, 'Calculation', 'What is the mass percent of water in copper(II) sulfate pentahydrate, CuSO₄·5H₂O?',
      `${p.toFixed(1)}%`,
      [`${(mm('H2O') / tot * 100).toFixed(1)}%`, `${(w / anh * 100).toFixed(1)}%`, `${(anh / tot * 100).toFixed(1)}%`, `${(64 / tot * 100).toFixed(1)}%`],
      `M(CuSO₄) = 63.55 + 32.06 + 64.00 = ${r2(anh)}; 5 H₂O = 5 × 18.016 = ${r2(w)}; M(hydrate) = ${r2(tot)} g/mol. % water = ${r2(w)} / ${r2(tot)} × 100 = ${p.toFixed(1)}%. Traps: ${(mm('H2O') / tot * 100).toFixed(1)}% counts one water; ${(w / anh * 100).toFixed(1)}% divides by the anhydrous salt instead of the whole hydrate; ${(anh / tot * 100).toFixed(1)}% is the percent CuSO₄; ${(64 / tot * 100).toFixed(1)}% is the O in sulfate only.`,
      ['The "·5H₂O" adds five whole water molecules to the formula mass.', 'Percent = mass of 5 H₂O ÷ mass of the whole hydrate × 100.', `${r2(w)} ÷ ${r2(tot)} × 100.`]); }

  { const g = 25.0 * 2 * AM.Cl / mm('CaCl2');
    N(G, 3, 3, 'Calculation', 'How many grams of chlorine are in 25.0 g of calcium chloride, CaCl₂? (Enter a number in grams.)',
      `${f3(g)} g`, g,
      `M(CaCl₂) = 40.08 + 2(35.45) = ${r2(mm('CaCl2'))} g/mol; it contains 70.90 g Cl per mole. Mass of Cl = 25.0 × 70.90 / ${r2(mm('CaCl2'))} = ${f3(g)} g. (Using 35.45 instead of 70.90 gives half of that.)`,
      ['Find the fraction of CaCl₂’s mass that is chlorine.', 'Two Cl per formula unit: 2 × 35.45 = 70.90 g per mole.', `25.0 × 70.90 ÷ ${r2(mm('CaCl2'))}.`]); }

  { const list = [['CH4', 'CH₄'], ['NH3', 'NH₃'], ['H2O', 'H₂O'], ['O2', 'O₂'], ['CO2', 'CO₂']];
    M(G, 3, 2, 'Concept', 'You have 10.0 g of each substance. Which sample contains the greatest number of MOLES?',
      'CH₄', ['NH₃', 'H₂O', 'O₂', 'CO₂'],
      `Equal masses: moles = 10.0 g ÷ molar mass, so the smallest molar mass gives the most moles. ${list.map(([f, n]) => n + ' ' + r2(mm(f)) + ' g/mol → ' + f3(10 / mm(f)) + ' mol').join('; ')}. CH₄ wins (narrowly over NH₃).`,
      ['With equal masses, what decides the number of moles?', 'n = m ÷ M: smaller M, more moles.', 'Find the lightest molar mass.']); }

  M(G, 3, 2, 'Concept', 'You have 1.00 mol of each substance. Which sample contains the greatest number of ATOMS?',
    'CH₄', ['H₂O', 'NH₃', 'CO₂', 'Ne'],
    'With equal moles, the number of atoms depends only on atoms per formula: CH₄ 5, NH₃ 4, H₂O 3, CO₂ 3, Ne 1. So 1.00 mol CH₄ has 5 × 6.022 × 10²³ = 3.011 × 10²⁴ atoms. Molar mass does not matter here - the question fixed the moles, not the mass.',
    ['The moles are all equal, so count atoms per formula.', 'Add the subscripts in each formula.', 'C + 4 H = 5 atoms.']);

  { const Mx = mm('K2Cr2O7'), g = 0.0250 * Mx;
    M(G, 3, 2, 'Calculation', 'What is the mass of 0.0250 mol of potassium dichromate, K₂Cr₂O₇?',
      `${f3(g)} g`,
      [`${f3(0.0250 * mm('K2CrO4'))} g`, `${f3(0.0250 * mm('KCr2O7'))} g`, `${f3(0.0250 / Mx)} g`, `${f3(Mx / 0.0250)} g`],
      `M(K₂Cr₂O₇) = 2(39.10) + 2(52.00) + 7(16.00) = ${r2(Mx)} g/mol. Mass = 0.0250 mol × ${r2(Mx)} g/mol = ${f3(g)} g. Traps: ${f3(0.0250 * mm('K2CrO4'))} g uses chromate K₂CrO₄ instead of dichromate; ${f3(0.0250 * mm('KCr2O7'))} g drops one K; ${f3(0.0250 / Mx)} g divides; ${f3(Mx / 0.0250)} g divides the other way.`,
      ['Dichromate is Cr₂O₇²⁻; how many K⁺ balance it?', 'grams = moles × molar mass.', `0.0250 × ${r2(Mx)}.`]); }

  { const g = AM.Au / NA;
    M(G, 3, 2, 'Calculation', 'What is the mass of ONE gold atom?',
      `${f4(g)} g`,
      [`${f4(AM.Au * NA)} g`, `${f4(NA / AM.Au)} g`, '196.97 g', `${f4(1 / NA)} g`],
      `One mole of Au (6.022 × 10²³ atoms) has a mass of 196.97 g, so one atom = 196.97 g ÷ 6.022 × 10²³ = ${f4(g)} g (= 196.97 amu). Traps: multiplying by N_A gives a mass bigger than a planet’s ocean; N_A ÷ 196.97 is atoms per gram; 196.97 g is a whole mole; ${f4(1 / NA)} g is 1 amu, the mass of one atom of mass 1, not of gold.`,
      ['A single atom must have a very small mass.', 'Molar mass ÷ Avogadro’s number = mass of one particle.', '196.97 ÷ 6.022 × 10²³.']); }

  { const n = 1000 / mm('H2O');
    N(G, 3, 2, 'Calculation', 'How many moles of water are in 1.00 kg of water? (Enter a number in mol.)',
      `${f3(n)} mol`, n,
      `1.00 kg = 1000 g. M(H₂O) = 2(1.008) + 16.00 = ${r2(mm('H2O'))} g/mol. n = 1000 ÷ ${r2(mm('H2O'))} = ${f4(n)} mol → ${f3(n)} mol. (Forgetting kg → g gives 0.0555 mol.)`,
      ['Convert kilograms to grams first.', 'n = mass ÷ molar mass.', `1000 ÷ ${r2(mm('H2O'))}.`]); }

  { const n = 3.00e23 / NA, g = n * 16.00;
    M(G, 3, 3, 'Trap', 'What is the mass of 3.00 × 10²³ oxygen ATOMS?',
      `${f3(g)} g`,
      [`${f3(n * 32.00)} g`, `${f3(n)} g`, `${f3(g / 2)} g`, `${f3(g * 10)} g`],
      `n(O atoms) = 3.00 × 10²³ ÷ 6.022 × 10²³ = ${f4(n)} mol. Atoms of O have molar mass 16.00 g/mol, so mass = ${f4(n)} × 16.00 = ${f3(g)} g. The trap is using 32.00 g/mol (that is O₂ MOLECULES), which gives ${f3(n * 32.00)} g. ${f3(n)} g stops at moles; ${f3(g / 2)} g halves for no reason; ${f3(g * 10)} g is a power-of-ten slip.`,
      ['Atoms, not molecules - which molar mass?', 'O atoms: 16.00 g/mol; O₂ molecules: 32.00 g/mol.', `(3.00 × 10²³ ÷ 6.022 × 10²³) × 16.00.`]); }

  /* ---------- 3.2 bonus (the reading skips it): empirical / molecular formula ---------- */
  { const c = 40.0 / 12.01, h = 6.71 / 1.008, o = 53.3 / 16.00;
    M(G, 3, 4, 'Calculation', 'Bonus (Silberberg 3.2): A sugar is 40.0% C, 6.71% H and 53.3% O by mass, and its molar mass is 180.2 g/mol. What is its molecular formula?',
      'C₆H₁₂O₆', ['CH₂O', 'C₂H₄O₂', 'C₃H₆O₃', 'C₁₂H₂₂O₁₁'],
      `Take 100 g: C ${f4(c)} mol, H ${f4(h)} mol, O ${f4(o)} mol. Divide by the smallest (${f4(o)}): C 1.00, H ${f3(h / o)}, O 1.00 → empirical formula CH₂O (30.03 g/mol). Multiplier = 180.2 ÷ 30.03 = 6.00, so the molecular formula is C₆H₁₂O₆. CH₂O is only the empirical formula; C₂H₄O₂ and C₃H₆O₃ have the right ratio but molar masses 60 and 90; C₁₂H₂₂O₁₁ is sucrose (342 g/mol, different ratio).`,
      ['Assume 100 g so percents become grams.', 'Grams → moles → divide by the smallest → empirical formula; then compare molar masses.', 'Empirical CH₂O = 30.03 g/mol; 180.2 ÷ 30.03 = ?']); }

  { const c = 85.6 / 12.01, h = 14.4 / 1.008;
    M(G, 3, 4, 'Calculation', 'Bonus (Silberberg 3.2): A hydrocarbon is 85.6% C and 14.4% H by mass and has a molar mass of 56.1 g/mol. What is its molecular formula?',
      'C₄H₈', ['CH₂', 'C₂H₄', 'C₄H₁₀', 'C₃H₆'],
      `100 g: C ${f4(c)} mol, H ${f4(h)} mol; ratio H/C = ${f3(h / c)} → empirical CH₂ (14.03 g/mol). 56.1 ÷ 14.03 = ${f3(56.1 / 14.03)} → (CH₂)₄ = C₄H₈. CH₂ is the empirical formula only; C₂H₄ (28.05) and C₃H₆ (42.08) have the right ratio but the wrong molar mass; C₄H₁₀ (58.12) has the wrong ratio.`,
      ['Percent → grams (in 100 g) → moles.', 'Find the C:H mole ratio, then scale to the molar mass.', 'Empirical CH₂ = 14.03 g/mol; 56.1 ÷ 14.03 = 4.']); }

  { const s = 1.000, M3 = mm('C3H6O'), co2 = +(s / M3 * 3 * mm('CO2')).toFixed(3), h2o = +(s / M3 * 3 * mm('H2O')).toFixed(4);
    const nC = co2 / mm('CO2'), nH = 2 * h2o / mm('H2O'), gC = nC * 12.01, gH = nH * 1.008, gO = s - gC - gH, nO = gO / 16.00;
    M(G, 3, 4, 'Calculation', `Bonus (Silberberg 3.2, combustion analysis): Burning 1.000 g of a compound containing only C, H and O gives ${co2.toFixed(3)} g CO₂ and ${h2o.toFixed(4)} g H₂O. What is its empirical formula?`,
      'C₃H₆O', ['C₂H₆O', 'CH₂O', 'C₃H₈O', 'C₃H₆O₂'],
      `All C ends up in CO₂: n(C) = ${co2.toFixed(3)} ÷ 44.01 = ${f4(nC)} mol (${f4(gC)} g). All H ends up in H₂O, two per molecule: n(H) = 2 × ${h2o.toFixed(4)} ÷ 18.016 = ${f4(nH)} mol (${f4(gH)} g). O is found by difference (the O₂ burned also supplies O, so you cannot use the products’ O): g O = 1.000 − ${f4(gC)} − ${f4(gH)} = ${f4(gO)} g → ${f4(nO)} mol. Divide by ${f4(nO)}: C ${f3(nC / nO)}, H ${f3(nH / nO)}, O 1 → C₃H₆O. Forgetting the factor 2 for H gives C₃H₃O-type ratios; ignoring O gives a hydrocarbon.`,
      ['C comes only from CO₂ and H only from H₂O; get O by difference.', 'n(C) = g CO₂ ÷ 44.01; n(H) = 2 × g H₂O ÷ 18.016; g O = sample − g C − g H.', 'Divide all three mole amounts by the smallest.']); }

  { const nC = 8.80 / mm('CO2'), nH = 2 * 2.70 / mm('H2O');
    M(G, 3, 4, 'Calculation', 'Bonus (Silberberg 3.2): Complete combustion of a hydrocarbon gives 8.80 g CO₂ and 2.70 g H₂O. Its molar mass is 54.1 g/mol. What is its molecular formula?',
      'C₄H₆', ['C₂H₃', 'C₄H₈', 'CH', 'C₃H₄'],
      `n(C) = 8.80 ÷ 44.01 = ${f4(nC)} mol; n(H) = 2 × 2.70 ÷ 18.016 = ${f4(nH)} mol. H/C = ${f3(nH / nC)} = 3/2 → empirical C₂H₃ (27.04 g/mol). 54.1 ÷ 27.04 = 2.00 → C₄H₆. Forgetting the 2 H per water halves H (H/C = 0.75), and CH is a careless rounding of that; C₂H₃ is only empirical; C₄H₈ and C₃H₄ have the wrong ratio.`,
      ['Each CO₂ holds one C; each H₂O holds two H.', 'Get the H:C mole ratio, clear the fraction, then compare with 54.1 g/mol.', 'H/C = 1.5 → C₂H₃ (27.04) → ×2.']); }

  { const nFe = 2.233 / AM.Fe, nO = (3.193 - 2.233) / 16.00;
    M(G, 3, 4, 'Calculation', 'Bonus (Silberberg 3.2): Heating 2.233 g of iron in oxygen gives 3.193 g of an iron oxide. What is its empirical formula?',
      'Fe₂O₃', ['FeO', 'Fe₃O₄', 'FeO₂', 'Fe₃O₂'],
      `Mass of O gained = 3.193 − 2.233 = 0.960 g → 0.960 ÷ 16.00 = ${f4(nO)} mol O. Fe = 2.233 ÷ 55.85 = ${f4(nFe)} mol. O/Fe = ${f3(nO / nFe)} = 3/2 → Fe₂O₃. The trap is using 3.193 g (the whole oxide) as the mass of O, or using 32.00 (O₂) for oxygen atoms, which gives O/Fe = 0.75, a ratio that matches none of the iron oxides.`,
      ['The mass gained is the mass of oxygen.', 'Moles of Fe and moles of O atoms (16.00 g/mol), then the ratio.', 'O/Fe = 1.5 = 3:2.']); }

  /* ---------- lesson 4: equations ---------- */
  M(G, 4, 1, 'Concept', 'When you balance a chemical equation, you are allowed to change only:',
    'the coefficients in front of the formulas',
    ['the subscripts inside the formulas', 'both the coefficients and the subscripts', 'the physical-state labels', 'the products, until the atoms match'],
    'Subscripts define WHAT the substance is - changing H₂O to H₂O₂ turns water into hydrogen peroxide. Only coefficients (how many units) may change. States describe the substances and are not a balancing tool, and you cannot invent different products.',
    ['What would changing H₂O to H₂O₂ do?', 'Subscripts fix identity; coefficients fix amount.', 'Only the big numbers in front.']);

  M(G, 4, 1, 'Concept', 'The coefficients in a balanced equation give the ratio of:',
    'moles (or molecules) of reactants and products',
    ['masses in grams of reactants and products', 'atoms in each molecule', 'volumes of every substance, including solids', 'subscripts in each formula'],
    'Coefficients count units: 2H₂ + O₂ → 2H₂O means 2 molecules (or 2 mol) of H₂ react with 1 molecule (1 mol) of O₂. They are NOT a gram ratio - 2 g H₂ does not react with 1 g O₂. Atoms per molecule are the subscripts. Volume ratios apply only to gases (Chapter 5), never to solids.',
    ['Read 2H₂ + O₂ → 2H₂O aloud with units.', 'Coefficients count particles, so they also count moles.', 'mol, not g.']);

  M(G, 4, 1, 'Concept', 'A correctly balanced chemical equation must have the same number of ___ on both sides.',
    'atoms of each element',
    ['molecules', 'moles of substances', 'coefficients', 'substances in each physical state'],
    'Conservation of mass: atoms are rearranged, not created or destroyed, so each element’s atom count is equal on both sides. The number of molecules (or moles) usually changes: 2H₂ + O₂ → 2H₂O has 3 molecules on the left and 2 on the right. States can change too (gases make a liquid).',
    ['Which law does a balanced equation express?', 'Atoms are conserved; molecules can be rearranged into fewer or more.', 'Count each element separately.']);

  M(G, 4, 1, 'Concept', 'Which definition matches the course slides?',
    'Theoretical yield: the maximum amount of product that can be formed by the limiting reactant.',
    ['Theoretical yield: the amount of product actually collected in the lab.', 'Actual yield: the amount calculated from the reactant in excess.', 'Percent yield: (theoretical yield ÷ actual yield) × 100.', 'Limiting reactant: the reactant with the smaller mass.'],
    'From the slides: Theoretical yield - the maximum amount of product that can be formed by the limiting reactant. Actual yield - the amount actually formed in the lab. Percent yield = (actual ÷ theoretical) × 100. The limiting reactant is the one that makes the LEAST product, which is not necessarily the smaller mass.',
    ['Which yield is calculated and which is measured?', 'Theoretical = calculated maximum from the limiting reactant.', 'Percent yield puts actual on top.']);

  M(G, 4, 1, 'Concept', 'Complete combustion of any hydrocarbon (CₓHᵧ) in excess oxygen produces:',
    'CO₂ and H₂O',
    ['CO and H₂', 'C and H₂O', 'CO₂ and H₂', 'CH₄ and O₂'],
    'In excess O₂ every C ends up as CO₂ and every H as H₂O. CO and soot (C) form only with too little oxygen (incomplete combustion); H₂ is never a combustion product.',
    ['What does burning a fuel in plenty of air make?', 'Carbon goes fully oxidized, hydrogen goes to water.', 'Carbon dioxide and water.']);

  M(G, 4, 1, 'Concept', 'The limiting reactant is the reactant that:',
    'is used up first and so determines the maximum amount of product',
    ['has the smallest mass', 'has the smallest coefficient in the equation', 'is left over when the reaction stops', 'has the largest molar mass'],
    'The limiting reactant runs out first, so it caps how much product can form. You find it by converting each reactant to moles of the same product - not by comparing masses or coefficients. The one left over is the EXCESS reactant.',
    ['Think sandwich-making: what stops you?', 'Whichever reactant runs out first.', 'It sets the theoretical yield.']);

  { const ok = 'C3H8 + 5O2 -> 3CO2 + 4H2O'; if (!isBalanced(ok)) throw new Error(ok);
    MF(G, 4, 2, 'Calculation', 'Balance the combustion of propane with the smallest whole-number coefficients: C₃H₈ + __O₂ → __CO₂ + __H₂O. What is the coefficient of O₂?',
      ['3', '4', '5', '7', '10'], 2,
      `${U(ok)}. Balance C first (3 CO₂), then H (8 H → 4 H₂O), then O last: right side has 3(2) + 4(1) = 10 O, so 5 O₂. 10 is the number of O ATOMS, not O₂ molecules; 3 and 4 are the other coefficients; 7 comes from counting H₂O as having 2 O.`,
      ['Balance C, then H, then O last.', '3 CO₂ and 4 H₂O; count the O atoms on the right.', '10 O atoms ÷ 2 per O₂.']); }

  { const ok = '2C4H10 + 13O2 -> 8CO2 + 10H2O'; if (!isBalanced(ok)) throw new Error(ok);
    MF(G, 4, 3, 'Calculation', 'When the combustion of butane, C₄H₁₀ + O₂ → CO₂ + H₂O, is balanced with the smallest whole-number coefficients, what is the SUM of the coefficients?',
      ['16.5', '23', '29', '33', '66'], 3,
      `C: 4 CO₂; H: 5 H₂O; O on right = 8 + 5 = 13 atoms → 13/2 O₂. A fraction is not allowed in the final answer, so double everything: ${U(ok)}. Sum = 2 + 13 + 8 + 10 = 33. 16.5 is the sum with the fraction left in; 66 doubles again (not smallest); 23 and 29 come from mis-counting O.`,
      ['Balance C, then H, then O - O will come out as a fraction.', 'C₄H₁₀ + 13/2 O₂ → 4CO₂ + 5H₂O, then clear the fraction.', 'Double: 2, 13, 8, 10.']); }

  { const ok = '4Fe + 3O2 -> 2Fe2O3'; if (!isBalanced(ok)) throw new Error(ok);
    MF(G, 4, 2, 'Calculation', 'Balance Fe + O₂ → Fe₂O₃ with the smallest whole-number coefficients. What is the coefficient of Fe?',
      ['1', '2', '3', '4', '6'], 3,
      `O: 2 per O₂ and 3 per Fe₂O₃, so the least common multiple is 6: 3 O₂ and 2 Fe₂O₃. Then Fe: 2 × 2 = 4 Fe. ${U(ok)}. 2 is the coefficient of Fe₂O₃, 3 is O₂’s, and 6 is the O-atom count.`,
      ['Start with O: it appears in only one substance on each side.', 'LCM of 2 and 3 is 6 O atoms.', '2 Fe₂O₃ needs how many Fe?']); }

  { const ok = '2Al + 6HCl -> 2AlCl3 + 3H2'; if (!isBalanced(ok)) throw new Error(ok);
    MF(G, 4, 2, 'Calculation', 'Balance Al + HCl → AlCl₃ + H₂ with the smallest whole-number coefficients. What is the sum of the coefficients?',
      ['4', '7', '9', '13', '26'], 3,
      `${U(ok)}: Cl forces 3 HCl per AlCl₃; then H on the left is odd per AlCl₃, so use 2 AlCl₃ → 6 HCl → 6 H = 3 H₂ → 2 Al. Sum = 2 + 6 + 2 + 3 = 13. 7 is Al + 3HCl → AlCl₃ + 3/2 H₂ rounded badly; 26 is doubled again.`,
      ['Balance Cl with HCl first.', '6 HCl gives 6 H = 3 H₂ and 6 Cl = 2 AlCl₃.', '2 + 6 + 2 + 3.']); }

  { const ok = 'Ca3(PO4)2 + 3H2SO4 -> 3CaSO4 + 2H3PO4'; if (!isBalanced(ok)) throw new Error(ok);
    if (isBalanced('Ca3(PO4)2 + 2H2SO4 -> 3CaSO4 + 2H3PO4') || isBalanced('Ca3(PO4)2 + 3H2SO4 -> 3CaSO4 + H3PO4')) throw new Error('distractor balanced');
    M(G, 4, 3, 'Calculation', 'Which coefficients balance Ca₃(PO₄)₂ + __H₂SO₄ → __CaSO₄ + __H₃PO₄ (in that order, with Ca₃(PO₄)₂ = 1)?',
      '1, 3, 3, 2', ['1, 2, 3, 2', '1, 3, 3, 1', '1, 3, 1, 2', '1, 6, 3, 2'],
      `${U(ok)}. Keep the polyatomic ions whole: 3 Ca → 3 CaSO₄ → 3 SO₄ → 3 H₂SO₄; 2 PO₄ → 2 H₃PO₄; check H: 3 × 2 = 6 = 2 × 3. ✓ The others fail on SO₄ (1, 2, 3, 2), on PO₄ (1, 3, 3, 1), on Ca (1, 3, 1, 2) or on H and SO₄ (1, 6, 3, 2).`,
      ['Treat SO₄ and PO₄ as single units - they survive unchanged.', 'Balance Ca first, then sulfate, then phosphate, check H last.', '3 Ca → 3 CaSO₄; 2 PO₄ → 2 H₃PO₄.']); }

  { const eqs = ['2KClO3 -> 2KCl + 3O2', 'C2H6 + 3O2 -> 2CO2 + 3H2O', '2Al + 3O2 -> Al2O3', '4NH3 + 5O2 -> 4NO + 4H2O', 'Fe2O3 + 2CO -> 2Fe + 2CO2'];
    eqs.forEach((e, i) => { if (isBalanced(e) !== (i === 0)) throw new Error('balance set ' + e); });
    M(G, 4, 2, 'Concept', 'Which equation is correctly balanced?',
      U(eqs[0]), eqs.slice(1).map(U),
      `Check atom by atom. ${U(eqs[0])}: K 2 = 2, Cl 2 = 2, O 6 = 6 ✓. ${U(eqs[1])}: O is 6 on the left but 4 + 3 = 7 on the right (needs 2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O). ${U(eqs[2])}: O 6 vs 3 (needs 4Al + 3O₂ → 2Al₂O₃). ${U(eqs[3])}: H 12 vs 8 (needs 6H₂O). ${U(eqs[4])}: O 5 vs 4 (needs Fe₂O₃ + 3CO → 2Fe + 3CO₂).`,
      ['Count every element on each side; one mismatch disqualifies.', 'O and H are where most of these fail.', 'KClO₃: K, Cl and O all match with 2, 2, 3.']); }

  { const ok = '4NH3 + 5O2 -> 4NO + 6H2O'; if (!isBalanced(ok)) throw new Error(ok);
    MF(G, 4, 3, 'Calculation', 'Balance NH₃ + O₂ → NO + H₂O with the smallest whole-number coefficients. What is the coefficient of H₂O?',
      ['2', '3', '4', '5', '6'], 4,
      `H: 2 NH₃ → 3 H₂O (6 H). N: 2 NO. O on the right = 2 + 3 = 5 → 5/2 O₂. Double: ${U(ok)}. Check O: 10 = 4 + 6 ✓. 3 is the coefficient before clearing the fraction; 5 is O₂’s; 4 is NH₃’s and NO’s.`,
      ['Balance H between NH₃ and H₂O first.', 'You will get 5/2 O₂ - clear it by doubling.', '4, 5, 4, ?']); }

  M(G, 4, 2, 'Concept', 'Which equation correctly describes: "Solid potassium chlorate decomposes on heating into solid potassium chloride and oxygen gas"?',
    '2KClO₃(s) → 2KCl(s) + 3O₂(g)',
    ['KClO₃(s) → KCl(s) + O₃(g)', '2KClO₃(s) → 2KCl(s) + 3O(g)', 'KClO₃(s) → KCl(s) + O₂(g)', '2KClO(s) → 2KCl(s) + O₂(g)'],
    'Chlorate is ClO₃⁻, so potassium chlorate is KClO₃; oxygen gas is diatomic O₂. 2KClO₃ → 2KCl + 3O₂ balances (6 O each side). O₃ is ozone (changing the product to dodge balancing); O(g) is not oxygen gas; KClO₃ → KCl + O₂ is unbalanced (3 O vs 2); KClO is potassium hypochlorite.',
    ['Write the correct formulas first, then balance.', 'Chlorate = ClO₃⁻; oxygen gas = O₂.', 'KClO₃ → KCl + O₂, then balance O with 2 and 3.']);

  M(G, 4, 3, 'Concept', 'Which equation correctly describes: "Solid aluminum reacts with oxygen gas to form solid aluminum oxide"?',
    '4Al(s) + 3O₂(g) → 2Al₂O₃(s)',
    ['2Al(s) + 3O(g) → Al₂O₃(s)', 'Al(s) + O₂(g) → AlO₂(s)', '4Al(s) + 3O₂(g) → 2Al₃O₂(s)', '2Al(s) + O₂(g) → 2AlO(s)'],
    'Aluminum oxide is Al₂O₃ (Al³⁺ and O²⁻: 2 × (+3) = 3 × (−2) in magnitude), and oxygen gas is O₂. Balancing O with 3 O₂ and 2 Al₂O₃ needs 4 Al. Using O atoms instead of O₂, or writing AlO₂, Al₃O₂ or AlO (wrong charges) changes the substances.',
    ['Get the formula of aluminum oxide from the ion charges.', 'Al³⁺ and O²⁻ → Al₂O₃; oxygen gas is O₂.', 'Balance O with LCM 6.']);

  M(G, 4, 3, 'Concept', 'Which equation describes: "Solid sodium reacts with liquid water to give aqueous sodium hydroxide and hydrogen gas"?',
    '2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g)',
    ['Na(s) + H₂O(l) → NaOH(aq) + H(g)', '2Na(s) + H₂O(l) → Na₂O(aq) + H₂(g)', 'Na(s) + 2H₂O(l) → Na(OH)₂(aq) + H₂(g)', '2Na(s) + 2H₂O(l) → 2NaOH(s) + H₂(l)'],
    'Sodium hydroxide is NaOH (Na⁺, OH⁻) and hydrogen gas is H₂. Na + H₂O → NaOH + ½H₂, doubled: 2Na + 2H₂O → 2NaOH + H₂. H(g) is not hydrogen gas; Na₂O is sodium oxide; Na(OH)₂ has the wrong charge for Na⁺; and the states in the last choice contradict the words (aqueous, gas).',
    ['Translate each name into a formula with its state.', 'Hydrogen gas is diatomic.', 'Na + H₂O → NaOH + ½ H₂, then double.']);

  { const ok = '4NH3 + 5O2 -> 4NO + 6H2O';
    MF(G, 4, 2, 'Calculation', 'For 4NH₃ + 5O₂ → 4NO + 6H₂O, how many moles of O₂ are needed to react completely with 3.20 mol NH₃?',
      ['2.56 mol', '3.20 mol', '4.00 mol', '4.80 mol', '16.0 mol'], 2,
      `Mole ratio O₂ : NH₃ = 5 : 4. n(O₂) = 3.20 × 5/4 = 4.00 mol. 2.56 mol uses the ratio upside down (× 4/5); 3.20 mol ignores the ratio; 4.80 mol uses 6/4 (the H₂O coefficient); 16.0 mol multiplies by 5 without dividing by 4.`,
      ['Use the coefficients as a mole ratio.', 'Wanted over given: 5 O₂ / 4 NH₃.', '3.20 × 5 ÷ 4.']); }

  N(G, 4, 2, 'Calculation', 'For N₂ + 3H₂ → 2NH₃, how many moles of NH₃ form from 4.50 mol H₂ (N₂ in excess)? (Enter a number in mol.)',
    '3.00 mol', 3.00,
    'n(NH₃) = 4.50 mol H₂ × (2 mol NH₃ / 3 mol H₂) = 3.00 mol. (× 3/2 would give 6.75 mol - ratio upside down.)',
    ['Only the H₂ amount matters - N₂ is in excess.', 'Ratio NH₃ : H₂ = 2 : 3.', '4.50 × 2/3.']);

  { const n = 10.0 / mm('C3H8'), g = n * 5 * 32.00;
    M(G, 4, 3, 'Calculation', 'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O. What mass of O₂ is needed to burn 10.0 g of propane completely?',
      `${f3(g)} g`,
      [`${f3(n * 32.00)} g`, '50.0 g', `${f3(n * 5)} g`, `${f3(n * 10 * 32.00)} g`],
      `n(C₃H₈) = 10.0 ÷ ${r2(mm('C3H8'))} = ${f4(n)} mol. n(O₂) = 5 × ${f4(n)} = ${f4(5 * n)} mol. Mass = ${f4(5 * n)} × 32.00 = ${f3(g)} g. Traps: ${f3(n * 32.00)} g forgets the 5; 50.0 g puts grams into the coefficient ratio (10.0 g × 5); ${f3(n * 5)} g is the moles of O₂ labelled as grams; ${f3(n * 10 * 32.00)} g uses 10 (O atoms) instead of 5 O₂.`,
      ['grams → moles → mole ratio → moles → grams.', 'Propane 44.09 g/mol; 5 O₂ per C₃H₈; O₂ 32.00 g/mol.', `${f4(n)} × 5 × 32.00.`]); }

  { const n = 25.0 / mm('C8H18'), g = n * 8 * mm('CO2');
    N(G, 4, 3, 'Calculation', '2C₈H₁₈ + 25O₂ → 16CO₂ + 18H₂O. What mass of CO₂ forms when 25.0 g of octane burns completely? (Enter a number in grams.)',
      `${f3(g)} g`, g,
      `n(C₈H₁₈) = 25.0 ÷ ${r2(mm('C8H18'))} = ${f4(n)} mol. CO₂ : C₈H₁₈ = 16 : 2 = 8 : 1 → ${f4(8 * n)} mol CO₂. × 44.01 g/mol = ${f3(g)} g. (Using 16 : 1 doubles it; ignoring the ratio gives ${f3(n * mm('CO2'))} g.)`,
      ['Octane molar mass first: 8 C + 18 H.', 'Ratio 16 CO₂ : 2 C₈H₁₈.', `${f4(n)} × 8 × 44.01.`]); }

  /* Worksheet Q5 - five parts */
  { const MA = mm('Ag2S'), nA = 174 / MA, MC = mm('AgCl'), nC = 2 * nA, g = nC * MC;
    M(G, 3, 2, 'Worksheet', 'Week 3 worksheet, Q5(a): Ag₂S(s) + 2HCl(aq) → 2AgCl(s) + H₂S(g). What is the molar mass of Ag₂S?',
      `${r2(MA)} g/mol`,
      [`${r2(mm('AgS'))} g/mol`, `${r2(2 * AM.Ag)} g/mol`, `${r2(mm('Ag2S2'))} g/mol`, `${r2(mm('Ag3S'))} g/mol`],
      `2 Ag + 1 S = 2(107.87) + 32.06 = ${r2(MA)} g/mol. ${r2(mm('AgS'))} uses one Ag; ${r2(2 * AM.Ag)} leaves out S; ${r2(mm('Ag2S2'))} and ${r2(mm('Ag3S'))} mis-read the subscripts.`,
      ['Silver sulfide: how many Ag per S?', 'Ag⁺ and S²⁻ → Ag₂S.', '2 × 107.87 + 32.06.']);
    M(G, 4, 2, 'Worksheet', 'Week 3 worksheet, Q5(b): How many moles of Ag₂S are in 174 g of Ag₂S?',
      `${f3(nA)} mol`,
      [`${f3(174 / mm('AgS'))} mol`, `${f3(2 * nA)} mol`, `${f3(174 * MA)} mol`, `${f3(nA / 2)} mol`],
      `n = 174 g ÷ ${r2(MA)} g/mol = ${f4(nA)} mol → ${f3(nA)} mol (174 has 3 sig figs). ${f3(174 / mm('AgS'))} uses AgS; ${f3(2 * nA)} is already the AgCl step; ${f3(174 * MA)} multiplies; ${f3(nA / 2)} applies a ratio that does not belong here.`,
      ['Grams to moles of the same substance - no ratio yet.', 'n = m ÷ M.', `174 ÷ ${r2(MA)}.`]);
    N(G, 4, 2, 'Worksheet', 'Week 3 worksheet, Q5(c): How many moles of AgCl can form from 174 g of Ag₂S (HCl in excess)? (Enter a number in mol.)',
      `${f3(nC)} mol`, nC,
      `n(Ag₂S) = ${f4(nA)} mol; ratio AgCl : Ag₂S = 2 : 1 → n(AgCl) = 2 × ${f4(nA)} = ${f3(nC)} mol. (Each Ag₂S carries two Ag, and each AgCl takes one.)`,
      ['Use the coefficients from the balanced equation.', '2 AgCl per 1 Ag₂S.', `2 × ${f4(nA)}.`]);
    M(G, 4, 2, 'Worksheet', 'Week 3 worksheet, Q5(d): What is the molar mass of AgCl?',
      `${r2(MC)} g/mol`,
      [`${r2(mm('AgCl2'))} g/mol`, `${r2(AM.Ag)} g/mol`, `${r2(2 * MC)} g/mol`, `${r2(mm('Ag2Cl'))} g/mol`],
      `107.87 + 35.45 = ${r2(MC)} g/mol. The coefficient 2 in "2AgCl" does NOT change the molar mass (${r2(2 * MC)} is that mistake); AgCl₂ and Ag₂Cl are wrong formulas; ${r2(AM.Ag)} is Ag alone.`,
      ['Molar mass is per one formula unit - ignore coefficients.', 'Ag + Cl.', '107.87 + 35.45.']);
    M(G, 4, 3, 'Worksheet', 'Week 3 worksheet, Q5(e): What mass of AgCl forms from 174 g of Ag₂S with excess HCl?',
      `${f3(g)} g`,
      [`${f3(nA * MC)} g`, '348 g', '87.0 g', `${f3(nC)} g`],
      `174 g ÷ ${r2(MA)} = ${f4(nA)} mol Ag₂S → × 2 = ${f4(nC)} mol AgCl → × ${r2(MC)} = ${f4(g)} g → ${f3(g)} g (worksheet: 201 g). Traps: ${f3(nA * MC)} g forgets the 2 : 1 ratio; 348 g and 87.0 g apply the coefficient ratio to GRAMS; ${f3(nC)} g is the moles labelled as grams.`,
      ['Chain parts (b), (c) and (d).', 'g Ag₂S → mol Ag₂S → × 2 → mol AgCl → × 143.32.', `${f4(nC)} mol × ${r2(MC)} g/mol.`]); }

  /* Worksheet Q6 */
  { const nCo = 1.25 / AM.Co, nHg = nCo * 3 / 2, g = nHg * AM.Hg;
    M(G, 4, 3, 'Worksheet', 'Week 3 worksheet, Q6: 2Co(s) + 3HgCl₂(aq) → 2CoCl₃(aq) + 3Hg(l). What mass of mercury forms from 1.25 g of cobalt (HgCl₂ in excess)?',
      `${f3(g)} g`,
      [`${f3(nCo * 2 / 3 * AM.Hg)} g`, `${f3(nCo * AM.Hg)} g`, `${f3(1.25 * 3 / 2)} g`, `${f3(nCo * 3 * AM.Hg)} g`],
      `n(Co) = 1.25 ÷ 58.93 = ${f4(nCo)} mol. Hg : Co = 3 : 2 → ${f4(nHg)} mol Hg. × 200.59 = ${f3(g)} g. Traps: ${f3(nCo * 2 / 3 * AM.Hg)} g uses 2/3 (ratio inverted); ${f3(nCo * AM.Hg)} g skips the ratio; ${f3(1.25 * 3 / 2)} g multiplies GRAMS by 3/2; ${f3(nCo * 3 * AM.Hg)} g uses 3 instead of 3/2.`,
      ['grams Co → mol Co → mol Hg → grams Hg.', 'Mole ratio Hg : Co = 3 : 2.', `${f4(nCo)} × 3/2 × 200.59.`]); }

  { const nCo = 1.25 / AM.Co, g = nCo * 3 / 2 * mm('HgCl2');
    N(G, 4, 3, 'Worksheet', 'Same reaction, 2Co(s) + 3HgCl₂(aq) → 2CoCl₃(aq) + 3Hg(l): what mass of HgCl₂ is consumed by 1.25 g of Co? (Enter a number in grams.)',
      `${f3(g)} g`, g,
      `n(Co) = ${f4(nCo)} mol → HgCl₂ = 3/2 × ${f4(nCo)} = ${f4(nCo * 1.5)} mol. M(HgCl₂) = 200.59 + 2(35.45) = ${r2(mm('HgCl2'))} g/mol. Mass = ${f3(g)} g.`,
      ['Same mole road, different target.', 'HgCl₂ : Co = 3 : 2; then × molar mass of HgCl₂.', `${f4(nCo * 1.5)} mol × ${r2(mm('HgCl2'))}.`]); }

  { const nCo = 2.50 / AM.Co, g = nCo * mm('CoCl3');
    M(G, 4, 3, 'Worksheet', 'Same reaction, 2Co(s) + 3HgCl₂(aq) → 2CoCl₃(aq) + 3Hg(l): what mass of cobalt(III) chloride forms from 2.50 g of Co?',
      `${f3(g)} g`,
      [`${f3(nCo * 2 / 3 * mm('CoCl3'))} g`, `${f3(nCo * 3 / 2 * mm('CoCl3'))} g`, '2.50 g', `${f3(nCo * mm('CoCl2'))} g`],
      `n(Co) = 2.50 ÷ 58.93 = ${f4(nCo)} mol. CoCl₃ : Co = 2 : 2 = 1 : 1. M(CoCl₃) = 58.93 + 3(35.45) = ${r2(mm('CoCl3'))} g/mol → ${f3(g)} g. Traps: 2/3 and 3/2 borrow the HgCl₂/Hg coefficients; 2.50 g assumes mass is passed through unchanged; ${f3(nCo * mm('CoCl2'))} g uses CoCl₂ (cobalt(II)).`,
      ['Which two coefficients matter here?', 'Co and CoCl₃ are both 2: a 1 : 1 ratio.', `${f4(nCo)} mol × ${r2(mm('CoCl3'))}.`]); }

  /* Worksheet Q7 - three parts + variations */
  { const nK = 2.457 / mm('KCl'), nF = 9.235 / mm('Fe2(CO3)3'), pK = nK * 2 / 6, pF = nF * 2, MFe = mm('FeCl3'), g = pK * MFe, pct = 0.9126 / g * 100;
    if (!(pK < pF)) throw new Error('W3Q7 LR');
    M(G, 4, 3, 'Worksheet', 'Week 3 worksheet, Q7(a): 6KCl(aq) + Fe₂(CO₃)₃(aq) → 2FeCl₃(s) + 3K₂CO₃(aq). 2.457 g KCl is mixed with 9.235 g Fe₂(CO₃)₃. Which is the limiting reactant?',
      'KCl', ['Fe₂(CO₃)₃', 'Neither - they are in the exact stoichiometric ratio', 'FeCl₃', 'K₂CO₃'],
      `n(KCl) = 2.457 ÷ ${r2(mm('KCl'))} = ${f4(nK)} mol → FeCl₃ = ${f4(nK)} × 2/6 = ${f4(pK)} mol. n(Fe₂(CO₃)₃) = 9.235 ÷ ${r2(mm('Fe2(CO3)3'))} = ${f4(nF)} mol → FeCl₃ = ${f4(nF)} × 2 = ${f4(pF)} mol. KCl makes less product, so KCl is limiting. (KCl also happens to be the smaller mass here, but that is not the test - the 6 : 1 ratio is what makes it run out.) FeCl₃ and K₂CO₃ are products and cannot be limiting.`,
      ['Convert each reactant to moles of the SAME product.', 'KCl → FeCl₃ uses 2/6; Fe₂(CO₃)₃ → FeCl₃ uses 2/1.', `${f4(pK)} vs ${f4(pF)} mol FeCl₃.`]);
    M(G, 4, 3, 'Worksheet', 'Week 3 worksheet, Q7(b): For the same mixture (2.457 g KCl + 9.235 g Fe₂(CO₃)₃), what is the theoretical yield of FeCl₃?',
      `${f4(g)} g`,
      [`${f4(pF * MFe)} g`, `${f4(nK * MFe)} g`, `${f4(nK / 6 * MFe)} g`, `${f4(2.457 + 9.235 - 9.235)} g`],
      `KCl is limiting: ${f4(nK)} mol KCl × 2/6 = ${f4(pK)} mol FeCl₃ × ${r2(MFe)} g/mol = ${f4(g)} g. Traps: ${f4(pF * MFe)} g uses the EXCESS reactant; ${f4(nK * MFe)} g ignores the 2 : 6 ratio; ${f4(nK / 6 * MFe)} g divides by 6 but forgets × 2; 2.457 g assumes the KCl mass simply becomes product mass.`,
      ['The theoretical yield always comes from the limiting reactant.', 'mol KCl × (2 FeCl₃ / 6 KCl) × M(FeCl₃).', `${f4(pK)} mol × ${r2(MFe)}.`]);
    N(G, 4, 3, 'Worksheet', 'Week 3 worksheet, Q7(c): If the actual yield of FeCl₃ is 0.9126 g, what is the percent yield? (Enter a number in percent.)',
      `${pct.toFixed(2)}%`, pct,
      `Theoretical yield (part b) = ${f4(g)} g. Percent yield = 0.9126 ÷ ${f4(g)} × 100 = ${pct.toFixed(2)}%. (Dividing by the excess-reactant yield, ${f4(pF * MFe)} g, gives ${(0.9126 / (pF * MFe) * 100).toFixed(2)}% - wrong.)`,
      ['Percent yield = actual ÷ theoretical × 100.', 'Use the theoretical yield from the limiting reactant (part b).', `0.9126 ÷ ${f4(g)} × 100.`]);
    const usedF = nK / 6, left = (nF - usedF) * mm('Fe2(CO3)3');
    M(G, 4, 4, 'Worksheet', 'Same mixture (2.457 g KCl + 9.235 g Fe₂(CO₃)₃): what mass of the excess reactant remains when the reaction is complete?',
      `${f4(left)} g of Fe₂(CO₃)₃`,
      [`${f4(usedF * mm('Fe2(CO3)3'))} g of Fe₂(CO₃)₃`, `${f4(9.235 - 2.457)} g of Fe₂(CO₃)₃`, `${f4((nF - nK / 3) * mm('Fe2(CO3)3'))} g of Fe₂(CO₃)₃`, '2.457 g of KCl'],
      `Fe₂(CO₃)₃ used = ${f4(nK)} mol KCl × 1/6 = ${f4(usedF)} mol (= ${f4(usedF * mm('Fe2(CO3)3'))} g). Remaining = (${f4(nF)} − ${f4(usedF)}) mol × ${r2(mm('Fe2(CO3)3'))} g/mol = ${f4(left)} g. Traps: ${f4(usedF * mm('Fe2(CO3)3'))} g is the amount USED, not left; ${f4(9.235 - 2.457)} g subtracts masses of different substances; ${f4((nF - nK / 3) * mm('Fe2(CO3)3'))} g uses a 1 : 3 ratio; "2.457 g KCl" names the limiting reactant, which is used up completely.`,
      ['Find how much excess reactant the limiting reactant consumes.', 'mol used = mol KCl × 1/6; left = start − used.', `(${f4(nF)} − ${f4(usedF)}) × ${r2(mm('Fe2(CO3)3'))}.`]); }

  { const nK = 5.000 / mm('KCl'), nF = 2.000 / mm('Fe2(CO3)3'), pK = nK / 3, pF = 2 * nF, MFe = mm('FeCl3');
    if (!(pF < pK)) throw new Error('W3Q7 var LR');
    M(G, 4, 4, 'Worksheet', 'Same reaction, 6KCl + Fe₂(CO₃)₃ → 2FeCl₃ + 3K₂CO₃, but now 5.000 g KCl reacts with 2.000 g Fe₂(CO₃)₃. What is the theoretical yield of FeCl₃?',
      `${f4(pF * MFe)} g`,
      [`${f4(pK * MFe)} g`, `${f4(nF * MFe)} g`, `${f4(nK * MFe)} g`, '7.000 g'],
      `KCl: ${f4(nK)} mol × 2/6 = ${f4(pK)} mol FeCl₃. Fe₂(CO₃)₃: ${f4(nF)} mol × 2 = ${f4(pF)} mol FeCl₃. Now Fe₂(CO₃)₃ makes less, so it is limiting - even though it is the SMALLER mass this time and KCl was limiting in the worksheet. Theoretical yield = ${f4(pF)} × ${r2(MFe)} = ${f4(pF * MFe)} g. ${f4(pK * MFe)} g uses the excess KCl; ${f4(nF * MFe)} g forgets × 2; ${f4(nK * MFe)} g ignores everything but KCl moles; 7.000 g just adds the masses.`,
      ['Never assume the limiting reactant from last time - recompute.', 'Convert both to mol FeCl₃ and take the smaller.', `${f4(pF)} mol × ${r2(MFe)}.`]); }

  /* lecture review slide: Mg + O2 */
  { const nMg = 0.67 / 24.3, nO2 = 1 / 22.4, g = nMg * 40.3;
    M(G, 4, 3, 'Lecture', 'Lecture review slide: 0.67 g of Mg reacts with 1 L of O₂ (22.4 L O₂ = 1 mol; Mg = 24.3 g/mol; MgO = 40.3 g/mol) by 2Mg(s) + O₂(g) → 2MgO(s). What mass of MgO is produced?',
      `${f2(g)} g`,
      [`${f2(nO2 * 2 * 40.3)} g`, `${f2(nO2 * 40.3)} g`, `${f2(nMg / 2 * 40.3)} g`, '0.67 g'],
      `Mg: 0.67 ÷ 24.3 = ${f3(nMg)} mol → ${f3(nMg)} mol MgO (2 : 2). O₂: 1 ÷ 22.4 = ${f3(nO2)} mol → ${f3(2 * nO2)} mol MgO. Mg makes less, so Mg is limiting: ${f3(nMg)} mol × 40.3 = ${f2(g)} g MgO (2 sig figs from 0.67 g). Traps: ${f2(nO2 * 2 * 40.3)} g uses the excess O₂; ${f2(nO2 * 40.3)} g also ignores the 2 : 1 ratio; ${f2(nMg / 2 * 40.3)} g halves the Mg moles; 0.67 g pretends the mass is unchanged.`,
      ['Two reactant amounts given: find the limiting reactant first.', 'Moles of MgO from each: Mg × 2/2, O₂ × 2/1.', `${f3(nMg)} mol MgO × 40.3 g/mol.`]); }

  { const nH = 10.0 / mm('H2'), nO = 10.0 / mm('O2'), g = 2 * nO * mm('H2O');
    M(G, 4, 4, 'Trap', '2H₂(g) + O₂(g) → 2H₂O(l). 10.0 g of H₂ and 10.0 g of O₂ react as completely as possible. What mass of water forms?',
      `${f3(g)} g`,
      [`${f3(nH * mm('H2O'))} g`, '20.0 g', `${f3(nO * mm('H2O'))} g`, `${f3(4 * nO * mm('H2O'))} g`],
      `n(H₂) = 10.0 ÷ 2.016 = ${f4(nH)} mol → ${f4(nH)} mol H₂O. n(O₂) = 10.0 ÷ 32.00 = ${f4(nO)} mol → ${f4(2 * nO)} mol H₂O. O₂ is limiting (equal masses, but far fewer moles of O₂). Water = ${f4(2 * nO)} × 18.016 = ${f3(g)} g. Traps: ${f3(nH * mm('H2O'))} g uses H₂ (the excess reactant); 20.0 g assumes both are used up; ${f3(nO * mm('H2O'))} g forgets the 2 : 1 ratio; ${f3(4 * nO * mm('H2O'))} g doubles twice.`,
      ['Equal masses are not equal moles.', 'Convert both to mol H₂O and keep the smaller.', `O₂: ${f4(nO)} mol × 2 = ${f4(2 * nO)} mol H₂O.`]); }

  M(G, 4, 4, 'Trap', '3.0 mol H₂ and 2.0 mol O₂ react by 2H₂ + O₂ → 2H₂O until one runs out. Which statement is TRUE?',
    '3.0 mol H₂O forms and 0.5 mol O₂ is left over.',
    ['O₂ is limiting because there is less of it.', '4.0 mol H₂O forms and 1.0 mol H₂ is left over.', '5.0 mol H₂O forms and nothing is left over.', '3.0 mol H₂O forms and 1.0 mol O₂ is left over.'],
    'H₂ → H₂O: 3.0 × 2/2 = 3.0 mol. O₂ → H₂O: 2.0 × 2/1 = 4.0 mol. H₂ makes less, so H₂ is limiting even though there are MORE moles of it - the reaction uses 2 H₂ per O₂. 3.0 mol H₂ consumes 1.5 mol O₂, leaving 2.0 − 1.5 = 0.5 mol O₂. "Less of it" is the classic trap; 4.0 mol uses O₂ as limiting; 5.0 mol adds moles; 1.0 mol O₂ left uses a 1 : 1 ratio.',
    ['Compare the moles of product each reactant could make.', 'O₂ could make 4.0 mol H₂O; H₂ only 3.0.', '3.0 mol H₂ uses 1.5 mol O₂.']);

  { const nF = 100.0 / mm('Fe2O3'), nA = 40.0 / AM.Al, pF = 2 * nF, pA = nA, g = pF * AM.Fe;
    if (!(pF < pA)) throw new Error('thermite LR');
    M(G, 4, 4, 'Trap', 'Thermite: Fe₂O₃(s) + 2Al(s) → 2Fe(l) + Al₂O₃(s). 100.0 g Fe₂O₃ reacts with 40.0 g Al. What mass of iron forms?',
      `${f3(g)} g`,
      [`${f3(pA * AM.Fe)} g`, `${f3(nF * AM.Fe)} g`, '140. g', `${f3(nA / 2 * AM.Fe)} g`],
      `Fe₂O₃: 100.0 ÷ ${r2(mm('Fe2O3'))} = ${f4(nF)} mol → × 2 = ${f4(pF)} mol Fe. Al: 40.0 ÷ 26.98 = ${f4(nA)} mol → × 2/2 = ${f4(pA)} mol Fe. Fe₂O₃ makes less, so Fe₂O₃ - the LARGER mass - is limiting. Fe = ${f4(pF)} × 55.85 = ${f3(g)} g. Traps: ${f3(pA * AM.Fe)} g uses Al; ${f3(nF * AM.Fe)} g forgets the 2 Fe per Fe₂O₃; 140. g adds the reactant masses; ${f3(nA / 2 * AM.Fe)} g halves the Al moles.`,
      ['A big mass of a heavy compound can still be few moles.', 'Moles of Fe from each reactant: Fe₂O₃ × 2, Al × 1.', `${f4(pF)} mol Fe × 55.85.`]); }

  { const nA = 5.00 / AM.Al, nC = 5.00 / mm('Cl2'), pA = nA, pC = nC * 2 / 3, MA = mm('AlCl3'), g = pC * MA;
    M(G, 4, 4, 'Trap', '2Al(s) + 3Cl₂(g) → 2AlCl₃(s). 5.00 g of Al and 5.00 g of Cl₂ react. What mass of AlCl₃ forms?',
      `${f3(g)} g`,
      [`${f3(pA * MA)} g`, `${f3(nC * MA)} g`, '10.0 g', `${f3(nC / 3 * MA)} g`],
      `Al: 5.00 ÷ 26.98 = ${f4(nA)} mol → ${f4(pA)} mol AlCl₃. Cl₂: 5.00 ÷ 70.90 = ${f4(nC)} mol → × 2/3 = ${f4(pC)} mol AlCl₃. Cl₂ is limiting. Mass = ${f4(pC)} × ${r2(MA)} = ${f3(g)} g. Traps: ${f3(pA * MA)} g uses the excess Al; ${f3(nC * MA)} g skips the 2/3; 10.0 g assumes all reactant mass becomes product; ${f3(nC / 3 * MA)} g uses 1/3.`,
      ['Equal masses again - convert to moles of product.', 'Cl₂ is 70.90 g/mol and needs a 2/3 ratio.', `${f4(pC)} mol × ${r2(MA)} g/mol.`]); }

  { const nA = 1.00, nC = 1.00;
    M(G, 4, 4, 'Trap', '1.00 mol Al and 1.00 mol Cl₂ react by 2Al + 3Cl₂ → 2AlCl₃. Which statement is TRUE when the reaction is complete?',
      'Cl₂ is limiting; 0.667 mol AlCl₃ forms and 0.333 mol Al remains.',
      ['Neither is limiting because the moles are equal.', 'Al is limiting; 1.00 mol AlCl₃ forms.', 'Cl₂ is limiting; 1.00 mol AlCl₃ forms and no Al remains.', 'Cl₂ is limiting; 0.667 mol AlCl₃ forms and 0.667 mol Al remains.'],
      `Equal moles do not mean equal use: the equation needs 1.5 mol Cl₂ per mol Al. Cl₂ → AlCl₃: 1.00 × 2/3 = 0.667 mol; Al → AlCl₃: 1.00 × 2/2 = 1.00 mol. Cl₂ is limiting. Al used = 1.00 mol Cl₂ × 2/3 = 0.667 mol, so 1.00 − 0.667 = 0.333 mol Al remains. The last choice confuses Al used with Al left.`,
      ['Equal moles is not the same as the stoichiometric ratio.', 'Which needs more of the other: 2 Al per 3 Cl₂.', 'Al used = 2/3 × 1.00.']); }

  { const th = 15.0 / mm('CaCO3') * mm('CaO'), pct = 7.25 / th * 100;
    M(G, 4, 3, 'Calculation', 'CaCO₃(s) → CaO(s) + CO₂(g). Heating 15.0 g of CaCO₃ gives 7.25 g of CaO. What is the percent yield?',
      `${pct.toFixed(1)}%`,
      [`${(7.25 / 15.0 * 100).toFixed(1)}%`, `${(th / 7.25 * 100).toFixed(0)}%`, `${(15.0 / 7.25 * 100).toFixed(0)}%`, `${(100 - pct).toFixed(1)}%`],
      `Theoretical yield of CaO = 15.0 ÷ ${r2(mm('CaCO3'))} × ${r2(mm('CaO'))} = ${f4(th)} g. Percent yield = 7.25 ÷ ${f4(th)} × 100 = ${pct.toFixed(1)}%. Traps: ${(7.25 / 15.0 * 100).toFixed(1)}% divides by the REACTANT mass; ${(th / 7.25 * 100).toFixed(0)}% is theoretical ÷ actual (over 100% is a red flag); ${(15.0 / 7.25 * 100).toFixed(0)}% is reactant ÷ product; ${(100 - pct).toFixed(1)}% is the percent lost.`,
      ['First find how much CaO 15.0 g of CaCO₃ could make.', 'Theoretical = 15.0 × (56.08/100.09); then actual ÷ theoretical.', `7.25 ÷ ${f4(th)} × 100.`]); }

  { const th = 7.00 / mm('N2') * 2 * mm('NH3'), pct = 6.50 / th * 100;
    N(G, 4, 3, 'Calculation', 'N₂ + 3H₂ → 2NH₃. 7.00 g of N₂ reacts with excess H₂ and 6.50 g of NH₃ is collected. What is the percent yield? (Enter a number in percent.)',
      `${pct.toFixed(1)}%`, pct,
      `Theoretical: 7.00 ÷ 28.02 = ${f4(7 / 28.02)} mol N₂ → × 2 = ${f4(2 * 7 / 28.02)} mol NH₃ → × ${r2(mm('NH3'))} = ${f4(th)} g. Percent yield = 6.50 ÷ ${f4(th)} × 100 = ${pct.toFixed(1)}%.`,
      ['Find the theoretical yield of NH₃ first.', '1 N₂ → 2 NH₃.', `6.50 ÷ ${f4(th)} × 100.`]); }

  { const th = 20.0 / mm('C3H8') * 3 * mm('CO2'), act = th * 0.720;
    M(G, 4, 4, 'Calculation', 'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O. If the percent yield is 72.0%, what mass of CO₂ is actually obtained from 20.0 g of propane (O₂ in excess)?',
      `${f3(act)} g`,
      [`${f3(th)} g`, `${f3(th / 0.720)} g`, `${f3(20.0 * 0.720)} g`, `${f3(20.0 / mm('C3H8') * 4 * mm('H2O') * 0.720)} g`],
      `Theoretical: 20.0 ÷ ${r2(mm('C3H8'))} = ${f4(20 / mm('C3H8'))} mol C₃H₈ → × 3 = ${f4(60 / mm('C3H8'))} mol CO₂ → × 44.01 = ${f4(th)} g. Actual = 0.720 × ${f4(th)} = ${f3(act)} g. Traps: ${f3(th)} g is the theoretical yield; ${f3(th / 0.720)} g divides by the yield (makes more than the maximum!); ${f3(20.0 * 0.720)} g applies the yield to the reactant mass; ${f3(20.0 / mm('C3H8') * 4 * mm('H2O') * 0.720)} g is the actual mass of WATER, not CO₂.`,
      ['Actual yield cannot exceed the theoretical yield.', 'Find the theoretical yield, then multiply by 0.720.', `${f4(th)} g × 0.720.`]); }

  { const th = 50.0 / 0.800, nN = th / mm('NH3') / 2, g = nN * mm('N2');
    M(G, 4, 4, 'Calculation', 'N₂ + 3H₂ → 2NH₃ runs at 80.0% yield. What mass of N₂ (with excess H₂) is needed to actually obtain 50.0 g of NH₃?',
      `${f3(g)} g`,
      [`${f3(50.0 * 0.800 / mm('NH3') / 2 * mm('N2'))} g`, `${f3(50.0 / mm('NH3') / 2 * mm('N2'))} g`, `${f3(th / mm('NH3') * mm('N2'))} g`, `${f3(50.0 / mm('NH3') * mm('N2'))} g`],
      `To COLLECT 50.0 g at 80.0% you must aim for a theoretical yield of 50.0 ÷ 0.800 = 62.5 g NH₃ = ${f4(th / mm('NH3'))} mol. N₂ = ½ × ${f4(th / mm('NH3'))} = ${f4(nN)} mol × 28.02 = ${f3(g)} g. Traps: ${f3(50.0 * 0.800 / mm('NH3') / 2 * mm('N2'))} g multiplies by 0.800 (you would need LESS reactant for a worse reaction - impossible); ${f3(50.0 / mm('NH3') / 2 * mm('N2'))} g ignores the yield; the last two forget the 1 : 2 ratio.`,
      ['A lower yield means you need MORE starting material.', 'Theoretical needed = 50.0 ÷ 0.800; then NH₃ → N₂ with 1 : 2.', '62.5 g NH₃ → mol → ÷ 2 → × 28.02.']); }

  M(G, 4, 2, 'Concept', 'Why is the actual yield of a reaction usually LESS than the theoretical yield?',
    'Side reactions, incomplete reaction and product lost during isolation',
    ['The excess reactant runs out before the limiting reactant does', 'Mass is not conserved in chemical reactions', 'The excess reactant also turns into product', 'The theoretical yield is calculated from the excess reactant'],
    'The theoretical yield assumes every unit of limiting reactant becomes the desired product and none is lost. In the lab, competing side reactions, reactions that do not go to completion, and losses during filtering, transferring and drying lower the actual yield. The excess reactant cannot run out first - by definition the limiting reactant is the one that runs out; mass is always conserved; the excess reactant cannot add product beyond the limit; and the theoretical yield comes from the limiting reactant.',
    ['What does the theoretical yield assume?', 'Think about real lab losses and competing reactions.', 'Side reactions + incomplete reaction + handling losses.']);

  M(G, 4, 4, 'Trap', 'A student reports a percent yield of 112% for a dried solid product. What is the most likely explanation?',
    'The product was still wet or contained impurities, so its mass was too high',
    ['The reaction produced more product than the limiting reactant allows', 'The student chose the wrong excess reactant', 'Some product was lost during filtering', 'The reaction had side reactions that consumed reactant'],
    'Matter cannot be created, so a yield above 100% means the WEIGHED mass includes something that is not product - typically leftover solvent (water) or impurities. Lost product and side reactions push the yield DOWN, not up. "More product than the limiting reactant allows" is impossible.',
    ['Can a reaction really make more than its maximum?', 'What could make the measured mass too large?', 'Water or impurities weighed along with the product.']);

  M(G, 4, 2, 'Concept', 'Which is a correct reading of 2H₂(g) + O₂(g) → 2H₂O(l)?',
    '2 mol of H₂ react with 1 mol of O₂ to give 2 mol of H₂O.',
    ['2 g of H₂ react with 1 g of O₂ to give 2 g of H₂O.', '3 g of reactants give 2 g of product.', '2 molecules of H₂ react with 1 atom of O to give 2 molecules of H₂O.', '2 L of H₂ give 2 L of liquid water.'],
    'Coefficients are mole (or molecule) ratios. Grams do not follow the coefficients (4.032 g H₂ + 32.00 g O₂ → 36.03 g H₂O - mass is conserved, so 3 g of reactants can never give 2 g of product). O₂ is a molecule, not an atom, and liquid water does not obey gas-volume ratios.',
    ['Coefficients count particles.', 'Moles are particles counted in bunches of 6.022 × 10²³.', 'mol H₂ : mol O₂ : mol H₂O = 2 : 1 : 2.']);

  { const nN = 14.0 / mm('N2'), g = 2 * nN * mm('NO');
    M(G, 4, 4, 'Calculation', 'Reactions in sequence: N₂ + 3H₂ → 2NH₃, then 4NH₃ + 5O₂ → 4NO + 6H₂O. What mass of NO can be made from 14.0 g of N₂ (all other reactants in excess, 100% yield each step)?',
      `${f3(g)} g`,
      [`${f3(nN * mm('NO'))} g`, `${f3(2 * nN * 5 / 4 * mm('NO'))} g`, `${f3(2 * nN * 4 / 5 * mm('NO'))} g`, '14.0 g'],
      `n(N₂) = 14.0 ÷ 28.02 = ${f4(nN)} mol → NH₃ = 2 × ${f4(nN)} = ${f4(2 * nN)} mol → NO = ${f4(2 * nN)} × 4/4 = ${f4(2 * nN)} mol → × 30.01 = ${f3(g)} g. (N atoms are conserved: each N₂ ends up as 2 NO.) Traps: ${f3(nN * mm('NO'))} g forgets the 2 NH₃; ${f3(2 * nN * 5 / 4 * mm('NO'))} and ${f3(2 * nN * 4 / 5 * mm('NO'))} g borrow the O₂ coefficient; 14.0 g assumes mass passes through.`,
      ['The product of step 1 is the reactant of step 2.', 'N₂ → 2 NH₃ → 2 NO (4 : 4).', `${f4(2 * nN)} mol NO × 30.01.`]); }

  { const n = 100.0 / mm('Cu2S'), g = 2 * n * AM.Cu;
    M(G, 4, 4, 'Calculation', 'Copper is made in two steps: 2Cu₂S + 3O₂ → 2Cu₂O + 2SO₂, then 2Cu₂O + Cu₂S → 6Cu + SO₂. Adding the steps (so the Cu₂O cancels) gives the overall reaction. What maximum mass of Cu can be made from 100.0 g of Cu₂S?',
      `${f3(g)} g`,
      [`${f3(n * AM.Cu)} g`, `${f3(6 * n * AM.Cu)} g`, `${f3(2 / 3 * n * 2 * AM.Cu)} g`, '100. g'],
      `Add step 1 and step 2: 2Cu₂S + 3O₂ + Cu₂S → 6Cu + 3SO₂, i.e. 3Cu₂S + 3O₂ → 6Cu + 3SO₂, or Cu₂S + O₂ → 2Cu + SO₂. Every Cu atom in Cu₂S ends up as metal: 2 Cu per Cu₂S. n(Cu₂S) = 100.0 ÷ ${r2(mm('Cu2S'))} = ${f4(n)} mol → ${f4(2 * n)} mol Cu × 63.55 = ${f3(g)} g. Traps: ${f3(n * AM.Cu)} g uses one Cu per Cu₂S; ${f3(6 * n * AM.Cu)} g reads 6 Cu per Cu₂S from step 2 alone; ${f3(2 / 3 * n * 2 * AM.Cu)} g counts only the Cu₂S that went through step 1; 100. g ignores the S lost.`,
      ['Add the two equations and cancel the intermediate.', 'Overall: Cu₂S + O₂ → 2Cu + SO₂.', `${f4(n)} mol Cu₂S × 2 × 63.55.`]); }

  { const n = 0.500 * 0.820 * 0.650;
    M(G, 4, 4, 'Calculation', 'A two-step synthesis converts A → B (82.0% yield) and then B → C (65.0% yield), each 1 : 1 by moles. Starting from 0.500 mol of A, how many moles of C are obtained?',
      `${f3(n)} mol`,
      [`${f3(0.500 * (0.820 + 0.650) / 2)} mol`, `${f3(0.500 * 0.820)} mol`, `${f3(0.500 * 0.650)} mol`, `${f3(0.500 * (0.820 + 0.650))} mol`],
      `Yields multiply: overall = 0.820 × 0.650 = ${f3(0.820 * 0.650)} (53.3%). n(C) = 0.500 × 0.820 × 0.650 = ${f3(n)} mol. Traps: averaging the yields (${f3(0.500 * 0.735)} mol), using only one step (${f3(0.500 * 0.820)} or ${f3(0.500 * 0.650)} mol), or adding the yields (more than you started with).`,
      ['Step 2 can only use the B that step 1 actually made.', 'Overall yield = product of the step yields.', '0.500 × 0.820 × 0.650.']); }

  MF(G, 4, 2, 'Calculation', 'How many moles of O₂ are needed to burn 1 mol of pentane, C₅H₁₂, completely to CO₂ and H₂O?',
    ['5', '6', '8', '11', '16'], 2,
    'C₅H₁₂ + 8O₂ → 5CO₂ + 6H₂O. O on the right = 5(2) + 6(1) = 16 atoms = 8 O₂. 16 is the O-atom count; 5 and 6 are the CO₂ and H₂O coefficients; 11 adds 5 + 6.',
    ['Balance C and H first.', '5 CO₂ and 6 H₂O - count the O atoms.', '16 O atoms ÷ 2.']);

  { const n = 5.00 / mm('C2H6'), g = n * 3 * mm('H2O');
    N(G, 4, 3, 'Calculation', '2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O. What mass of water forms when 5.00 g of ethane burns in excess oxygen? (Enter a number in grams.)',
      `${f3(g)} g`, g,
      `n(C₂H₆) = 5.00 ÷ ${r2(mm('C2H6'))} = ${f4(n)} mol. H₂O : C₂H₆ = 6 : 2 = 3 : 1 → ${f4(3 * n)} mol × 18.016 = ${f3(g)} g.`,
      ['grams ethane → mol → mol water → grams.', 'Ratio 6 H₂O : 2 C₂H₆.', `${f4(n)} × 3 × 18.016.`]); }

  { const n = 9.00 / mm('C6H12O6'), g = 6 * n * mm('CO2');
    M(G, 4, 3, 'Calculation', 'Glucose burns: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O. What mass of CO₂ forms from 9.00 g of glucose?',
      `${f3(g)} g`,
      [`${f3(n * mm('CO2'))} g`, '54.0 g', `${f3(6 * n * mm('H2O'))} g`, `${f3(9.00 * 6 / mm('CO2'))} g`],
      `n(glucose) = 9.00 ÷ ${r2(mm('C6H12O6'))} = ${f4(n)} mol → × 6 = ${f4(6 * n)} mol CO₂ → × 44.01 = ${f3(g)} g. Traps: ${f3(n * mm('CO2'))} g forgets the 6; 54.0 g multiplies grams by 6; ${f3(6 * n * mm('H2O'))} g is the mass of WATER; the last choice divides by the molar mass of CO₂.`,
      ['Glucose molar mass: 6 C, 12 H, 6 O.', '1 glucose → 6 CO₂.', `${f4(6 * n)} mol × 44.01.`]); }

  { const n = 1000 / mm('C8H18'), g = n * 12.5 * 32.00 / 1000;
    M(G, 4, 4, 'Calculation', '2C₈H₁₈ + 25O₂ → 16CO₂ + 18H₂O. What mass of O₂ is needed to burn 1.00 kg of octane?',
      `${f3(g)} kg`,
      [`${f3(n * 32.00 / 1000)} kg`, `${f3(2 * g)} kg`, `${f3(g / 2)} kg`, `${f3(n * 8 * 32.00 / 1000)} kg`],
      `n(octane) = 1000 g ÷ ${r2(mm('C8H18'))} = ${f4(n)} mol. O₂ = 25/2 × ${f4(n)} = ${f4(12.5 * n)} mol × 32.00 = ${f4(12.5 * n * 32)} g = ${f3(g)} kg. Traps: ${f3(n * 32.00 / 1000)} kg ignores the ratio; ${f3(2 * g)} kg uses 25 : 1 instead of 25 : 2; ${f3(g / 2)} kg uses the molar mass of O atoms (16.00) instead of O₂; ${f3(n * 8 * 32.00 / 1000)} kg uses the CO₂ ratio (16 : 2).`,
      ['Convert kg to g, then to moles of octane.', 'O₂ : C₈H₁₈ = 25 : 2 = 12.5 : 1.', `${f4(12.5 * n)} mol × 32.00 g/mol ÷ 1000.`]); }

  { const nN3 = 65.0 / mm('N2'), g = nN3 * 2 / 3 * mm('NaN3');
    M(G, 4, 3, 'Calculation', 'An air bag inflates by 2NaN₃(s) → 2Na(s) + 3N₂(g). What mass of sodium azide, NaN₃, is needed to make 65.0 g of N₂?',
      `${f3(g)} g`,
      [`${f3(nN3 * 3 / 2 * mm('NaN3'))} g`, `${f3(nN3 * mm('NaN3'))} g`, `${f3(65.0 * 2 / 3)} g`, `${f3(nN3 * 2 / 3)} g`],
      `n(N₂) = 65.0 ÷ 28.02 = ${f4(nN3)} mol. NaN₃ : N₂ = 2 : 3 → ${f4(nN3 * 2 / 3)} mol. M(NaN₃) = 22.99 + 3(14.01) = ${r2(mm('NaN3'))} g/mol → ${f3(g)} g. Traps: ${f3(nN3 * 3 / 2 * mm('NaN3'))} g inverts the ratio; ${f3(nN3 * mm('NaN3'))} g ignores it; ${f3(65.0 * 2 / 3)} g applies the ratio to grams; ${f3(nN3 * 2 / 3)} g stops at moles.`,
      ['Work backwards from the product.', 'mol N₂ × (2 NaN₃ / 3 N₂).', `${f4(nN3 * 2 / 3)} mol × ${r2(mm('NaN3'))}.`]); }

  { const nH = 4.00 / mm('H2'), nO = 16.0 / mm('O2'), left = (nH - 2 * nO) * mm('H2');
    M(G, 4, 3, 'Calculation', '2H₂ + O₂ → 2H₂O. 4.00 g of H₂ reacts with 16.0 g of O₂. Which reactant is in excess, and what mass of it remains?',
      `${f3(left)} g of H₂`,
      ['12.0 g of O₂', 'None - the reactants are in the exact ratio', `${f3(nH - 2 * nO)} g of H₂`, '3.00 g of H₂'],
      `n(H₂) = 4.00 ÷ 2.016 = ${f4(nH)} mol; n(O₂) = 16.0 ÷ 32.00 = 0.500 mol. 0.500 mol O₂ needs 1.000 mol H₂, which is less than ${f4(nH)}, so O₂ is limiting and H₂ is in excess. H₂ left = (${f4(nH)} − 1.000) mol × 2.016 g/mol = ${f3(left)} g. Traps: 12.0 g O₂ subtracts the masses; ${f3(nH - 2 * nO)} "g" is the leftover MOLES; 3.00 g subtracts 1.00 g of H₂ as if 1 mol weighed 1 g.`,
      ['Find the limiting reactant first.', 'O₂ 0.500 mol needs 1.000 mol H₂; how much H₂ do you have?', 'Left = moles start − moles used, then × 2.016.']); }

  /* molecular scenes in words */
  M(G, 4, 2, 'Concept', 'A flask holds 6 molecules of H₂ and 4 molecules of O₂. They react by 2H₂ + O₂ → 2H₂O as completely as possible. What does the flask contain afterwards?',
    '6 H₂O molecules and 1 O₂ molecule',
    ['6 H₂O molecules and 2 O₂ molecules', '8 H₂O molecules and no leftover', '4 H₂O molecules and 2 H₂ molecules', '10 H₂O molecules'],
    '6 H₂ need 3 O₂ and make 6 H₂O. 4 O₂ would need 8 H₂ (only 6 available), so H₂ is limiting and 4 − 3 = 1 O₂ is left. 8 H₂O would need 8 H₂; 4 H₂O treats O₂ as limiting with a 1 : 1 ratio; 10 just adds the molecules.',
    ['Which reactant runs out?', '6 H₂ use 3 O₂.', '6 H₂O + (4 − 3) O₂.']);

  M(G, 4, 3, 'Concept', 'A container holds 5 N₂ molecules and 9 H₂ molecules, which react by N₂ + 3H₂ → 2NH₃ as completely as possible. What is present afterwards?',
    '6 NH₃ and 2 N₂',
    ['10 NH₃ and no leftover', '6 NH₃ and 4 N₂', '5 NH₃ and 4 H₂', '3 NH₃ and 2 N₂'],
    '9 H₂ ÷ 3 = 3 N₂ needed, so H₂ is limiting; 3 N₂ + 9 H₂ → 6 NH₃, leaving 5 − 3 = 2 N₂. 10 NH₃ would need 15 H₂; 4 N₂ left subtracts only 1; 5 NH₃/4 H₂ uses 1 : 1; 3 NH₃ forgets the 2.',
    ['Each N₂ needs three H₂.', '9 H₂ can only use 3 N₂.', '3 N₂ → 6 NH₃; 2 N₂ unused.']);

  M(G, 4, 3, 'Concept', 'A molecular scene shows 4 AB₂ molecules and 3 B₂ molecules before reaction, and 4 AB₃ molecules and 1 B₂ molecule after. Which balanced equation (smallest whole numbers) describes the reaction?',
    '2AB₂ + B₂ → 2AB₃',
    ['4AB₂ + 3B₂ → 4AB₃ + B₂', 'AB₂ + B₂ → AB₃', 'AB₂ + B → AB₃', '4AB₂ + 2B₂ → 4AB₃'],
    'Only what actually reacted goes in the equation: 4 AB₂ and 3 − 1 = 2 B₂ were consumed to make 4 AB₃. That is 4AB₂ + 2B₂ → 4AB₃, which reduces to 2AB₂ + B₂ → 2AB₃ (check: A 2 = 2, B 4 + 2 = 6 = 6). Writing the leftover B₂ on both sides is wrong; AB₂ + B₂ → AB₃ is unbalanced; B is not the molecule present; 4, 2, 4 is not in lowest terms.',
    ['The unreacted B₂ is not part of the reaction.', 'Count what was used: 4 AB₂, 2 B₂ → 4 AB₃.', 'Divide by 2.']);

  M(G, 4, 4, 'Concept', 'A flask contains 8 CH₄ molecules and 12 O₂ molecules, which react by CH₄ + 2O₂ → CO₂ + 2H₂O as far as possible. What is in the flask afterwards?',
    '6 CO₂, 12 H₂O and 2 CH₄',
    ['8 CO₂, 16 H₂O and no leftover', '8 CO₂, 16 H₂O and 4 O₂ left over', '6 CO₂, 12 H₂O and 2 O₂', '12 CO₂, 24 H₂O and no leftover'],
    '8 CH₄ would need 16 O₂, but only 12 are present, so O₂ is limiting: 12 O₂ react with 6 CH₄ to give 6 CO₂ and 12 H₂O, leaving 8 − 6 = 2 CH₄. The trap is assuming CH₄ (fewer molecules) is limiting - the 1 : 2 ratio makes O₂ run out first.',
    ['Check how many O₂ the 8 CH₄ would need.', '16 O₂ needed, 12 available - which is limiting?', '12 O₂ ÷ 2 = 6 CH₄ react.']);
  M(G, 3, 1, 'Concept', 'What is the value of Avogadro’s number, N_A?',
    '6.022 × 10²³ entities per mole',
    ['6.022 × 10⁻²³ entities per mole', '6.626 × 10⁻³⁴ entities per mole', '1.661 × 10⁻²⁴ entities per mole', '22.4 entities per mole'],
    'N_A = 6.022 × 10²³ mol⁻¹: one mole of anything contains 6.022 × 10²³ of its entities. 6.626 × 10⁻³⁴ is Planck’s constant (Chapter 7); 1.661 × 10⁻²⁴ g is the mass of 1 amu (= 1/N_A grams); 22.4 L/mol is the molar volume of a gas at STP (Chapter 5); 6.022 × 10⁻²³ has the wrong sign on the exponent.',
    ['A mole is a huge count.', 'The exponent is positive and in the twenties.', '6.022 × 10²³.']);

  MF(G, 4, 1, 'Concept', 'How many oxygen atoms are represented by 2Fe₂O₃?',
    ['2', '3', '5', '6', '10'], 3,
    'The coefficient multiplies every atom in the formula: 2 formula units × 3 O each = 6 O (and 2 × 2 = 4 Fe). 3 ignores the coefficient; 5 adds 2 + 3; 10 counts all atoms (4 Fe + 6 O); 2 is just the coefficient.',
    ['A coefficient multiplies the whole formula.', 'Subscript × coefficient.', '2 formula units × 3 O each.']);

  M(G, 4, 1, 'Concept', 'The EXCESS reactant in a reaction is the one that:',
    'is left over after the limiting reactant has been used up',
    ['is used up first', 'determines the theoretical yield', 'has the largest coefficient in the balanced equation', 'is present in the larger mass'],
    'When the limiting reactant runs out the reaction stops, and whatever remains of the other reactant is the excess. Being used up first and setting the theoretical yield describe the LIMITING reactant. Coefficients and masses alone do not decide which is in excess - you must compare moles of product.',
    ['Think about what is still in the flask at the end.', 'The limiting reactant runs out; the other one…', 'It is the leftover.']);

  { const n = 174 / mm('Ag2S'), g = n * mm('H2S');
    M(G, 4, 3, 'Worksheet', 'Worksheet Q5 variation: Ag₂S(s) + 2HCl(aq) → 2AgCl(s) + H₂S(g). What mass of H₂S gas forms from 174 g of Ag₂S with excess HCl?',
      `${f3(g)} g`,
      [`${f3(2 * n * mm('H2S'))} g`, `${f3(n * mm('HCl') * 2)} g`, `${f3(174 * mm('H2S') / mm('AgCl'))} g`, `${f3(n)} g`],
      `n(Ag₂S) = 174 ÷ ${r2(mm('Ag2S'))} = ${f4(n)} mol. H₂S : Ag₂S = 1 : 1 → ${f4(n)} mol × ${r2(mm('H2S'))} g/mol = ${f3(g)} g. Traps: ${f3(2 * n * mm('H2S'))} g borrows the 2 from AgCl; ${f3(n * mm('HCl') * 2)} g is the HCl consumed; ${f3(174 * mm('H2S') / mm('AgCl'))} g divides by the wrong molar mass (AgCl); ${f3(n)} g is the moles.`,
      ['Which coefficients link Ag₂S and H₂S?', 'Both are 1: a 1 : 1 ratio.', `${f4(n)} mol × ${r2(mm('H2S'))} g/mol.`]); }

  { const n = 50.0 / mm('Ag2S'), g = 2 * n * mm('HCl');
    N(G, 4, 3, 'Worksheet', 'Worksheet Q5 variation: Ag₂S(s) + 2HCl(aq) → 2AgCl(s) + H₂S(g). What mass of HCl is consumed by 50.0 g of Ag₂S? (Enter a number in grams.)',
      `${f3(g)} g`, g,
      `n(Ag₂S) = 50.0 ÷ ${r2(mm('Ag2S'))} = ${f4(n)} mol → HCl = 2 × ${f4(n)} = ${f4(2 * n)} mol → × ${r2(mm('HCl'))} g/mol = ${f3(g)} g.`,
      ['grams Ag₂S → mol → mol HCl → grams.', 'HCl : Ag₂S = 2 : 1; M(HCl) = 36.46 g/mol.', `${f4(2 * n)} mol × ${r2(mm('HCl'))}.`]); }

}

/* =====================================================================
   GYM 4 - SOLUTIONS AND AQUEOUS REACTIONS (lessons 5, 6; Silberberg 4.1-4.3)
   ===================================================================== */
{
  const G = 4;
  /* ---------- lesson 5: solutions, electrolytes, molarity, dilution ---------- */
  M(G, 5, 1, 'Lecture', 'Using the definitions on the course slides, the SOLVENT in a solution is:',
    'the largest component of the solution',
    ['the smallest component of the solution', 'always water', 'the substance that is dissolved', 'whichever component is a solid'],
    'Slides: "Solvent: largest component of the solution. Solute: smallest component of the solution. Can be gas, liquid or solid." Water is the most common solvent but not by definition; the dissolved substance is the solute; a solute can be a solid, liquid or gas.',
    ['The slide defines both terms by amount.', 'Solvent = largest, solute = smaller.', 'Which component is present in the greatest amount?']);

  M(G, 5, 2, 'Trap', 'Rubbing alcohol is 70% isopropyl alcohol and 30% water by volume (isopropyl alcohol is also the larger part by mass). Using the course definitions, which is the solvent?',
    'Isopropyl alcohol, because it is the largest component',
    ['Water, because water is always the solvent', 'Water, because it is the smaller component', 'Neither - a mixture of two liquids has no solvent', 'Both are solutes'],
    'The solvent is the largest component, so here it is isopropyl alcohol (70%) and water (30%) is the solute. "Water is always the solvent" is the trap - most solutions we meet are aqueous, but the definition is about amount. Liquid-liquid solutions still have a solvent.',
    ['Apply the definition, not habit.', 'Largest component = solvent.', '70% beats 30%.']);

  M(G, 5, 1, 'Lecture', 'According to the course slides, an electrolyte is a compound that:',
    'breaks apart into ions when dissolved in water, so the solution conducts electricity',
    ['dissolves in water as intact molecules', 'conducts electricity as a pure solid', 'contains only nonmetals', 'reacts with water to form a gas'],
    'Slides: electrolytes "break apart into ions when dissolved in water" and their solutions conduct electricity - e.g. NaCl, HCl, KOH. Nonelectrolytes (sugar, alcohols) dissolve as molecules and do not conduct. Solid ionic compounds do NOT conduct - their ions are locked in place. HCl contains only nonmetals yet is a (strong) electrolyte.',
    ['What has to be present for a solution to conduct?', 'Mobile charged particles - ions.', 'It ionizes or dissociates in water.']);

  M(G, 5, 1, 'Concept', 'Which compound is a NONELECTROLYTE when dissolved in water?',
    'Sucrose, C₁₂H₂₂O₁₁',
    ['NaCl', 'HCl', 'KOH', 'Ca(NO₃)₂'],
    'Sugars and alcohols dissolve as whole molecules - no ions - so their solutions do not conduct (the slide’s examples of nonelectrolytes). NaCl, KOH and Ca(NO₃)₂ are soluble ionic compounds and HCl is a strong acid: all four are strong electrolytes.',
    ['Which one is a molecular compound that is not an acid?', 'Sugars and alcohols stay as molecules.', 'C₁₂H₂₂O₁₁ is table sugar.']);

  M(G, 5, 2, 'Concept', 'Which substance is a WEAK electrolyte in water?',
    'Acetic acid, CH₃COOH',
    ['Nitric acid, HNO₃', 'Potassium bromide, KBr', 'Methanol, CH₃OH', 'Sodium hydroxide, NaOH'],
    'Acetic acid is not one of the six strong acids, so it ionizes only slightly - a weak electrolyte. HNO₃ is a strong acid (completely ionized), KBr and NaOH are soluble ionic compounds (completely dissociated): strong electrolytes. Methanol is an alcohol: a nonelectrolyte.',
    ['Weak electrolytes ionize only partly.', 'Any acid not on the list of six strong acids is weak.', 'Vinegar’s acid.']);

  MF(G, 5, 2, 'Concept', 'How many of the following are STRONG electrolytes in water: HNO₃, CH₃COOH, KCl, C₆H₁₂O₆, Ba(OH)₂, CH₃OH?',
    ['1', '2', '3', '4', '5'], 2,
    'Strong: HNO₃ (strong acid), KCl (soluble salt), Ba(OH)₂ (soluble strong base) → 3. CH₃COOH is a weak acid (weak electrolyte); glucose C₆H₁₂O₆ and methanol CH₃OH are nonelectrolytes.',
    ['Sort each into strong, weak or non.', 'Strong = soluble ionic compounds, strong acids, strong bases.', 'HNO₃, KCl, Ba(OH)₂.']);

  M(G, 5, 3, 'Concept', 'Which 0.10 M aqueous solution conducts electricity BEST?',
    'Al(NO₃)₃',
    ['NaCl', 'CaCl₂', 'CH₃COOH', 'C₂H₅OH'],
    'At the same molarity, conductivity rises with the concentration of ions. Al(NO₃)₃ → Al³⁺ + 3NO₃⁻: 4 ions per unit, 0.40 M ions. CaCl₂ gives 3 (0.30 M), NaCl 2 (0.20 M). Acetic acid is a weak electrolyte (few ions) and ethanol is a nonelectrolyte.',
    ['More dissolved ions → better conduction.', 'Count the ions each formula unit releases.', 'Al³⁺ + 3 NO₃⁻ = 4 ions.']);

  M(G, 5, 1, 'Concept', 'What are the units of molarity?',
    'moles of solute per liter of solution',
    ['moles of solute per liter of solvent', 'grams of solute per liter of solution', 'moles of solute per kilogram of solvent', 'grams of solute per 100 g of solution'],
    'M = mol solute ÷ L of SOLUTION (slide: "1.00 M means 1 mole of solute in 1 liter of solution"). Per liter of solvent is the classic mistake; g/L is a mass concentration; mol/kg solvent is molality (Chapter 13); g per 100 g is mass percent.',
    ['The slide: "1 M = 1 mole solute / 1 L ___".', 'It is the volume of the finished solution.', 'mol / L solution.']);

  M(G, 5, 2, 'Lecture', 'Which procedure correctly prepares 1.00 L of 1.00 M NaCl (58.44 g/mol)?',
    'Dissolve 58.44 g NaCl in some water, then add water until the total volume of solution is 1.00 L.',
    ['Dissolve 58.44 g NaCl in exactly 1.00 L of water.', 'Dissolve 1.00 g NaCl in enough water to make 1.00 L of solution.', 'Dissolve 58.44 g NaCl in 1.00 kg of water.', 'Dissolve 29.22 g NaCl in enough water to make 1.00 L of solution.'],
    'Molarity uses the volume of SOLUTION. Adding 58.44 g of salt to 1.00 L of water gives a little MORE than 1.00 L of solution, so the concentration is slightly below 1.00 M - the "improper preparation" demo from lecture. 1.00 g is not 1.00 mol; 1.00 kg of water defines molality; 29.22 g is only 0.500 mol.',
    ['Is 1.00 L of water the same as 1.00 L of solution?', 'Fill to the final volume - a volumetric flask does this.', '1.00 mol in a final volume of 1.00 L.']);

  { const n = 23 / mm('NaOH'), Mo = n / 0.500;
    M(G, 5, 2, 'Lecture', 'Lecture example: What is the molar concentration of a solution made when 23 g of NaOH is dissolved in enough water to make 0.500 L of solution?',
      `${f2(Mo)} M`,
      [`${f2(n)} M`, `${f2(n * 0.500)} M`, '46 M', `${f2(n / 500)} M`],
      `n(NaOH) = 23 g ÷ ${r2(mm('NaOH'))} g/mol = ${f3(n)} mol. M = ${f3(n)} mol ÷ 0.500 L = ${f3(Mo)} M → ${f2(Mo)} M (23 g has 2 sig figs). Traps: ${f2(n)} M stops at moles; ${f2(n * 0.500)} M multiplies by the volume; 46 M is g/L, not mol/L; ${f2(n / 500)} M uses 500 mL without converting to L.`,
      ['Molarity is mol/L - do you have moles yet?', 'Grams → moles with 40.00 g/mol, then ÷ liters.', `${f3(n)} mol ÷ 0.500 L.`]); }

  { const n = 2.748 / mm('LiCl'), Mo = n / 0.12500;
    N(G, 5, 2, 'Worksheet', 'Week 4 worksheet, Q1: What is the molarity of a solution made by dissolving 2.748 g of LiCl in water to a total volume of 125.00 mL? (Enter a number in M.)',
      `${f4(Mo)} M`, Mo,
      `M(LiCl) = 6.94 + 35.45 = ${r2(mm('LiCl'))} g/mol. n = 2.748 ÷ ${r2(mm('LiCl'))} = ${f4(n)} mol. V = 125.00 mL = 0.12500 L. M = ${f4(n)} ÷ 0.12500 = ${f4(Mo)} M (4 sig figs, limited by 2.748 g).`,
      ['Grams → moles, mL → L.', 'M = mol ÷ L.', `${f4(n)} mol ÷ 0.12500 L.`]); }

  { const n = 0.350 * 0.2500, g = n * mm('LiCl');
    M(G, 5, 2, 'Worksheet', 'What mass of LiCl is needed to prepare 250.0 mL of 0.350 M LiCl solution?',
      `${f3(g)} g`,
      [`${f3(0.350 * 250.0 * mm('LiCl'))} g`, `${f3(0.350 / 0.2500 * mm('LiCl'))} g`, `${f3(n)} g`, `${f3(n * AM.Li)} g`],
      `n = M × V = 0.350 mol/L × 0.2500 L = ${f4(n)} mol. Mass = ${f4(n)} × ${r2(mm('LiCl'))} = ${f3(g)} g. Traps: ${f3(0.350 * 250.0 * mm('LiCl'))} g uses 250.0 mL as liters; ${f3(0.350 / 0.2500 * mm('LiCl'))} g divides by the volume; ${f3(n)} g is the moles; ${f3(n * AM.Li)} g uses the molar mass of Li only.`,
      ['Rearrange M = n/V for n.', 'n = M × V(L), then × molar mass.', `0.350 × 0.2500 × ${r2(mm('LiCl'))}.`]); }

  { const Ms = mm('C12H22O11'), n = 5.00 / Ms, V = n / 0.125 * 1000;
    N(G, 5, 3, 'Calculation', 'What volume of 0.125 M sucrose (C₁₂H₂₂O₁₁) solution contains 5.00 g of sucrose? (Enter a number in mL.)',
      `${f3(V)} mL`, V,
      `M(C₁₂H₂₂O₁₁) = 12(12.01) + 22(1.008) + 11(16.00) = ${r2(Ms)} g/mol. n = 5.00 ÷ ${r2(Ms)} = ${f4(n)} mol. V = n ÷ M = ${f4(n)} ÷ 0.125 = ${f4(n / 0.125)} L = ${f3(V)} mL.`,
      ['Find moles of sucrose first.', 'V = n ÷ M gives liters.', `${f4(n)} ÷ 0.125, then × 1000.`]); }

  { const n = 1.65 * 0.2500, g = n * mm('CH3OH'), V = g / 0.792;
    M(G, 5, 3, 'Worksheet', 'Week 4 worksheet, Q2: How many milliliters of methanol (CH₃OH, density 0.792 g/mL) are needed to make 250.0 mL of 1.65 M aqueous methanol?',
      `${f3(V)} mL`,
      [`${f3(g)} mL`, `${f3(g * 0.792)} mL`, `${f3(1.65 * mm('CH3OH') / 0.792)} mL`, `${f3(n / 0.792)} mL`],
      `n = 1.65 mol/L × 0.2500 L = ${f4(n)} mol. M(CH₃OH) = 12.01 + 4(1.008) + 16.00 = ${r2(mm('CH3OH'))} g/mol → ${f4(g)} g. Volume = mass ÷ density = ${f4(g)} ÷ 0.792 = ${f3(V)} mL. Traps: ${f3(g)} mL treats grams as mL; ${f3(g * 0.792)} mL multiplies by density; ${f3(1.65 * mm('CH3OH') / 0.792)} mL forgets the 0.2500 L; ${f3(n / 0.792)} uses moles instead of grams.`,
      ['moles from M × V, grams from molar mass, then volume from density.', 'Density = mass/volume, so volume = mass ÷ density.', `${f4(g)} g ÷ 0.792 g/mL.`]); }

  { const n = 0.750 * 0.5000, g = n * mm('C2H5OH'), V = g / 0.789;
    N(G, 5, 3, 'Worksheet', 'How many milliliters of pure ethanol (C₂H₅OH, density 0.789 g/mL) are needed to make 500.0 mL of 0.750 M aqueous ethanol? (Enter a number in mL.)',
      `${f3(V)} mL`, V,
      `n = 0.750 × 0.5000 = ${f4(n)} mol; × ${r2(mm('C2H5OH'))} g/mol = ${f4(g)} g; ÷ 0.789 g/mL = ${f3(V)} mL.`,
      ['Same road as the methanol worksheet problem.', 'M × V → mol → g → mL (÷ density).', `${f4(g)} ÷ 0.789.`]); }

  { const V1 = 1.75 * 125.0 / 3.45;
    N(G, 5, 2, 'Worksheet', 'Week 4 worksheet, Q3: How many mL of 3.45 M NH₄Cl solution are needed to make 125.0 mL of 1.75 M NH₄Cl? (Enter a number in mL.)',
      `${f3(V1)} mL`, V1,
      `Dilution keeps moles of solute constant: M₁V₁ = M₂V₂. V₁ = (1.75 M × 125.0 mL) ÷ 3.45 M = ${f3(V1)} mL. Then add water to a total of 125.0 mL. (A check: the stock is about twice as concentrated, so you need about half the final volume.)`,
      ['Moles of NH₄Cl stay the same when you dilute.', 'M₁V₁ = M₂V₂; mL can stay mL on both sides.', '1.75 × 125.0 ÷ 3.45.']); }

  { const V1 = 0.150 * 500.0 / 12.0;
    M(G, 5, 2, 'Worksheet', 'What volume of 12.0 M HCl is needed to prepare 500.0 mL of 0.150 M HCl?',
      `${f3(V1)} mL`,
      [`${f3(500.0 - V1)} mL`, `${f3(12.0 * 500.0 / 0.150)} mL`, `${f3(0.150 * 500.0)} mL`, `${f3(V1 / 1000)} mL`],
      `V₁ = M₂V₂ ÷ M₁ = 0.150 × 500.0 ÷ 12.0 = ${f3(V1)} mL. Traps: ${f3(500.0 - V1)} mL is the WATER you add; ${f3(12.0 * 500.0 / 0.150)} mL inverts the ratio (more than the final volume - impossible); ${f3(0.150 * 500.0)} mL forgets to divide by 12.0; ${f3(V1 / 1000)} mL is the answer in liters labelled mL.`,
      ['A concentrated stock needs only a small volume.', 'M₁V₁ = M₂V₂.', '0.150 × 500.0 ÷ 12.0.']); }

  { const V1 = 0.75 * 0.20 / 4.5 * 1000;
    M(G, 5, 2, 'Lecture', 'Lecture example: How many milliliters of 4.5 M HCl are required to prepare 0.20 L of 0.75 M HCl?',
      `${f2(V1)} mL`,
      [`${f2(4.5 * 0.20 / 0.75 * 1000)} mL`, `${f2(V1 / 1000)} mL`, `${f2(200 - V1)} mL`, `${f2(4.5 * 0.75 * 0.20)} mL`],
      `V₁ = M₂V₂ ÷ M₁ = (0.75 M)(0.20 L) ÷ 4.5 M = ${f3(V1 / 1000)} L = ${f2(V1)} mL. Traps: ${f2(4.5 * 0.20 / 0.75 * 1000)} mL swaps the molarities; ${f2(V1 / 1000)} mL forgets L → mL; ${f2(200 - V1)} mL is the water added; ${f2(4.5 * 0.75 * 0.20)} multiplies everything.`,
      ['Moles of HCl are the same before and after.', 'V₁ = M₂V₂ ÷ M₁; answer in L then convert.', '0.75 × 0.20 ÷ 4.5 = 0.033 L.']); }

  { const V = 0.0175 / 0.250 * 1000;
    M(G, 5, 2, 'Lecture', 'Lecture example: A biopharmaceutical process needs 0.0175 mol of NaOH to adjust a pH, and the plant’s stock solution is 0.250 M NaOH. How many milliliters of stock should be added?',
      `${f3(V)} mL`,
      [`${f3(0.0175 * 0.250 * 1000)} mL`, `${f3(0.250 / 0.0175)} mL`, `${f3(V / 1000)} mL`, `${f3(V / 10)} mL`],
      `V = n ÷ M = 0.0175 mol ÷ 0.250 mol/L = 0.0700 L = ${f3(V)} mL. Traps: ${f3(0.0175 * 0.250 * 1000)} mL multiplies n × M; ${f3(0.250 / 0.0175)} mL divides M by n; ${f3(V / 1000)} "mL" is liters mislabelled; ${f3(V / 10)} mL slips a decimal.`,
      ['You know the moles you need and the concentration.', 'V = n ÷ M.', '0.0175 ÷ 0.250 = 0.0700 L.']); }

  M(G, 5, 1, 'Concept', 'When water is added to dilute a solution, which quantity stays the same?',
    'The number of moles of solute',
    ['The molarity', 'The volume of solution', 'The mass of the solution', 'The number of moles of water'],
    'Dilution adds only solvent: the moles of solute are unchanged while the volume increases and the molarity decreases. That is why M₁V₁ = M₂V₂ - both sides equal the same number of moles. The mass of the solution and the moles of water both increase.',
    ['What do you add when you dilute?', 'Only solvent is added; the solute is untouched.', 'n = M × V is constant.']);

  { const M2 = 6.00 * 25.0 / 150.0;
    N(G, 5, 3, 'Calculation', '25.0 mL of 6.00 M HNO₃ is diluted with water to a final volume of 150.0 mL. What is the new concentration? (Enter a number in M.)',
      `${f3(M2)} M`, M2,
      `M₂ = M₁V₁ ÷ V₂ = 6.00 × 25.0 ÷ 150.0 = ${f3(M2)} M. "Diluted TO 150.0 mL" means 150.0 mL is the final volume (not 175.0 mL).`,
      ['Moles of HNO₃ do not change.', 'M₂ = M₁V₁ ÷ V₂.', '6.00 × 25.0 ÷ 150.0.']); }

  { const c = 2.00 * 10.0 / 100.0 * 5.00 / 250.0;
    M(G, 5, 4, 'Calculation', 'Serial dilution: 10.0 mL of 2.00 M NaCl is diluted to 100.0 mL. Then 5.00 mL of THAT solution is diluted to 250.0 mL. What is the final concentration?',
      `${f3(c)} M`,
      [`${f3(2.00 * 10.0 / 100.0)} M`, `${f3(2.00 * 5.00 / 250.0)} M`, `${f3(c / 10)} M`, `${f3(2.00 / 60)} M`],
      `Step 1: 2.00 × 10.0/100.0 = 0.200 M. Step 2: 0.200 × 5.00/250.0 = ${f3(c)} M. The dilution factors multiply (10 × 50 = 500; 2.00/500 = ${f3(c)} M). Traps: ${f3(2.00 * 10.0 / 100.0)} M stops after step 1; ${f3(2.00 * 5.00 / 250.0)} M takes the 5.00 mL from the ORIGINAL solution; ${f3(c / 10)} M is a decimal slip; ${f3(2.00 / 60)} M ADDS the dilution factors (10 + 50).`,
      ['Do one dilution at a time.', 'The second dilution starts from the result of the first.', '0.200 M × 5.00/250.0.']); }

  { M(G, 5, 3, 'Lecture', 'Lecture example: A student plans a fermentation, C₆H₁₂O₆(aq) → 2C₂H₅OH(aq) + 2CO₂(g), to produce 4.0 L of 1.0 M ethanol (~5.3% abv). What volume of 5.0 M glucose solution should be used?',
      '0.40 L (400 mL)',
      ['0.80 L (800 mL)', '1.6 L', '2.0 L', '20 L'],
      'Follow the slide flowchart: volume A → moles A → mole ratio → moles B → volume B. Ethanol: 4.0 L × 1.0 M = 4.0 mol. Glucose = 4.0 × (1 glucose / 2 ethanol) = 2.0 mol. Volume = 2.0 mol ÷ 5.0 M = 0.40 L = 400 mL. Traps: 0.80 L ignores the 1 : 2 ratio; 1.6 L inverts it (8.0 mol glucose); 2.0 L is the moles of glucose written as liters; 20 L multiplies the 4.0 mol of ethanol by 5.0 M (skipping the ratio, and multiplying instead of dividing).',
      ['Volume → moles → ratio → moles → volume.', 'Ethanol moles = M × V; glucose : ethanol = 1 : 2.', '2.0 mol glucose ÷ 5.0 M.']); }

  { const oh = 2 * 0.451 * 0.0120;
    M(G, 5, 2, 'Worksheet', 'Week 4 worksheet, Q4: How many moles of OH⁻ ions are in 451 mL of 0.0120 M Ca(OH)₂?',
      `${f3(oh)} mol`,
      [`${f3(oh / 2)} mol`, `${f3(2 * 451 * 0.0120)} mol`, `${f3(2 * 0.0120)} mol`, `${f3(oh / 4)} mol`],
      `n(Ca(OH)₂) = 0.0120 mol/L × 0.451 L = ${f4(oh / 2)} mol. Each Ca(OH)₂ gives 2 OH⁻ → ${f3(oh)} mol OH⁻. Traps: ${f3(oh / 2)} mol forgets the subscript 2 (that is the Ca²⁺); ${f3(2 * 451 * 0.0120)} mol uses mL; ${f3(2 * 0.0120)} is the OH⁻ concentration (M), not moles; ${f3(oh / 4)} divides by 2 instead of multiplying.`,
      ['Moles of compound first: M × V(L).', 'Then use the subscript: 2 OH⁻ per Ca(OH)₂.', `2 × 0.451 × 0.0120.`]); }

  MF(G, 5, 2, 'Calculation', 'What is the concentration of Cl⁻ ions in 0.25 M AlCl₃?',
    ['0.083 M', '0.25 M', '0.50 M', '0.75 M', '1.00 M'], 3,
    'AlCl₃ → Al³⁺ + 3Cl⁻, so [Cl⁻] = 3 × 0.25 = 0.75 M. 0.25 M is [Al³⁺]; 1.00 M is the TOTAL ion concentration; 0.083 M divides by 3; 0.50 M uses a subscript of 2.',
    ['Write the dissociation equation.', 'Each AlCl₃ releases three Cl⁻.', '3 × 0.25.']);

  { const n = 0.150 * 0.0250;
    M(G, 5, 3, 'Calculation', 'How many moles of IONS (total) are in 25.0 mL of 0.150 M Na₃PO₄?',
      `${f3(4 * n)} mol`,
      [`${f3(n)} mol`, `${f3(3 * n)} mol`, `${f3(4 * 0.150)} mol`, `${f3(4 * 25.0 * 0.150)} mol`],
      `n(Na₃PO₄) = 0.150 × 0.0250 = ${f3(n)} mol. Na₃PO₄ → 3Na⁺ + PO₄³⁻: 4 ions per formula unit → ${f3(4 * n)} mol ions. Traps: ${f3(n)} counts formula units; ${f3(3 * n)} counts only Na⁺; ${f3(4 * 0.150)} forgets the volume; ${f3(4 * 25.0 * 0.150)} uses mL as L.`,
      ['How many ions does one Na₃PO₄ give?', '3 Na⁺ + 1 PO₄³⁻ = 4 ions; phosphate stays whole.', `4 × 0.150 × 0.0250.`]); }

  { const n = 3 * 0.250 * 0.0350;
    N(G, 5, 2, 'Worksheet', 'How many moles of Cl⁻ ions are in 35.0 mL of 0.250 M FeCl₃? (Enter a number in mol.)',
      `${f3(n)} mol`, n,
      `n(FeCl₃) = 0.250 × 0.0350 = ${f4(n / 3)} mol; × 3 Cl⁻ per FeCl₃ = ${f3(n)} mol Cl⁻.`,
      ['Moles of FeCl₃ = M × V(L).', 'Three Cl⁻ per FeCl₃.', `3 × 0.250 × 0.0350.`]); }

  { const n = 2.00 / mm('Na2SO4'), na = 2 * n / 0.1000;
    M(G, 5, 3, 'Calculation', '2.00 g of Na₂SO₄ is dissolved in water to make 100.0 mL of solution. What is [Na⁺]?',
      `${f3(na)} M`,
      [`${f3(na / 2)} M`, `${f3(2 * n)} M`, `${f3(na * 1.5)} M`, `${f3(na / 1000)} M`],
      `n(Na₂SO₄) = 2.00 ÷ ${r2(mm('Na2SO4'))} = ${f4(n)} mol; [Na₂SO₄] = ${f4(n)} ÷ 0.1000 L = ${f4(n / 0.1)} M; [Na⁺] = 2 × that = ${f3(na)} M. Traps: ${f3(na / 2)} M is [Na₂SO₄]; ${f3(2 * n)} is moles of Na⁺, not M; ${f3(na * 1.5)} M is total ion concentration; ${f3(na / 1000)} M uses 100.0 mL as liters.`,
      ['Molarity of the salt first, then the subscript.', 'mol = g ÷ 142.04; M = mol ÷ 0.1000 L.', '× 2 for Na⁺.']); }

  { const n = 0.0200 * 0.2500, g = n * mm('KMnO4');
    M(G, 5, 2, 'Calculation', 'What mass of KMnO₄ is needed to prepare 250.0 mL of 0.0200 M KMnO₄?',
      `${f3(g)} g`,
      [`${f3(0.0200 * 250.0 * mm('KMnO4'))} g`, `${f3(0.0200 / 0.2500 * mm('KMnO4'))} g`, `${f3(n)} g`, `${f3(n * mm('K2MnO4'))} g`],
      `n = 0.0200 × 0.2500 = ${f3(n)} mol. M(KMnO₄) = 39.10 + 54.94 + 4(16.00) = ${r2(mm('KMnO4'))} g/mol → ${f3(g)} g. Traps: ${f3(0.0200 * 250.0 * mm('KMnO4'))} g uses mL as L; ${f3(0.0200 / 0.2500 * mm('KMnO4'))} g divides by volume; ${f3(n)} g is moles; ${f3(n * mm('K2MnO4'))} g uses K₂MnO₄ (manganate) instead of permanganate.`,
      ['n = M × V(L), then grams.', 'Permanganate is MnO₄⁻, so potassium permanganate is KMnO₄.', `${f3(n)} mol × ${r2(mm('KMnO4'))}.`]); }

  { const c = (0.0500 * 0.200 + 0.0250 * 0.500) / 0.0750;
    N(G, 5, 4, 'Calculation', '50.0 mL of 0.200 M NaCl is mixed with 25.0 mL of 0.500 M NaCl. Assuming the volumes add, what is the concentration of NaCl in the mixture? (Enter a number in M.)',
      `${f3(c)} M`, c,
      `Moles add, and volumes add: n = 0.0500 × 0.200 + 0.0250 × 0.500 = 0.0100 + 0.0125 = 0.0225 mol; V = 75.0 mL = 0.0750 L; M = 0.0225 ÷ 0.0750 = ${f3(c)} M. Averaging the molarities (0.350 M) ignores the different volumes; adding them (0.700 M) is impossible - a mixture cannot be more concentrated than its strongest part.`,
      ['You cannot average or add molarities directly.', 'Add the moles; add the volumes.', '0.0225 mol ÷ 0.0750 L.']); }

  { const n = 4.236 / mm('Na2CO3'), c = 2 * n / 0.3750;
    M(G, 5, 3, 'Worksheet', 'Week 4 worksheet, Q5: Na₂CO₃(aq) + 2HCl(aq) → 2NaCl(aq) + H₂O(l) + CO₂(g). 4.236 g of Na₂CO₃ reacts completely with HCl, and the final volume is 375.0 mL. What is the molarity of NaCl?',
      `${f4(c)} M`,
      [`${f4(c / 2)} M`, `${f4(4.236 / 0.3750)} M`, `${f4(2 * n / 375.0)} M`, `${f4(2 * n)} M`],
      `M(Na₂CO₃) = 2(22.99) + 12.01 + 3(16.00) = ${r2(mm('Na2CO3'))} g/mol. n = 4.236 ÷ ${r2(mm('Na2CO3'))} = ${f4(n)} mol. NaCl : Na₂CO₃ = 2 : 1 → ${f4(2 * n)} mol NaCl. M = ${f4(2 * n)} ÷ 0.3750 L = ${f4(c)} M. Traps: ${f4(c / 2)} M forgets the 2 NaCl; ${f4(4.236 / 0.3750)} is grams per liter; ${f4(2 * n / 375.0)} M uses mL; ${f4(2 * n)} is moles, not molarity.`,
      ['Solution stoichiometry: grams → mol → ratio → mol → ÷ L.', 'Each Na₂CO₃ gives 2 NaCl.', `${f4(2 * n)} mol ÷ 0.3750 L.`]); }

  { const V = 2 * 4.236 / mm('Na2CO3') / 0.500 * 1000;
    M(G, 5, 4, 'Worksheet', 'Na₂CO₃(aq) + 2HCl(aq) → 2NaCl(aq) + H₂O(l) + CO₂(g). What volume of 0.500 M HCl reacts exactly with 4.236 g of Na₂CO₃?',
      `${f3(V)} mL`,
      [`${f3(V / 2)} mL`, `${f3(V / 4)} mL`, `${f3(V / 1000)} mL`, `${f3(2 * 4.236 / mm('Na2CO3'))} L`],
      `n(Na₂CO₃) = ${f4(4.236 / mm('Na2CO3'))} mol → HCl = 2 × that = ${f4(2 * 4.236 / mm('Na2CO3'))} mol. V = n ÷ M = ${f4(2 * 4.236 / mm('Na2CO3'))} ÷ 0.500 = ${f4(V / 1000)} L = ${f3(V)} mL. Traps: ${f3(V / 2)} mL forgets the 2 : 1 ratio; ${f3(V / 4)} mL inverts it; ${f3(V / 1000)} "mL" is liters mislabelled; the last choice writes the moles of HCl as liters.`,
      ['Moles of HCl needed come from the ratio.', '2 HCl per Na₂CO₃; then V = n ÷ M.', `${f4(2 * 4.236 / mm('Na2CO3'))} mol ÷ 0.500 M.`]); }

  { const n = 0.148 / mm('AgCl'), c = n / 0.0450;
    N(G, 6, 3, 'Worksheet', 'Week 4 worksheet, Q6: AgNO₃(aq) + NaCl(aq) → AgCl(s) + NaNO₃(aq). 45.0 mL of AgNO₃ solution reacts with excess NaCl and gives 0.148 g of precipitate. What is the molarity of the AgNO₃ solution? (Enter a number in M.)',
      `${f3(c)} M`, c,
      `The precipitate is AgCl (143.32 g/mol): n = 0.148 ÷ 143.32 = ${f4(n)} mol. AgNO₃ : AgCl = 1 : 1, so n(AgNO₃) = ${f4(n)} mol. M = ${f4(n)} ÷ 0.0450 L = ${f3(c)} M.`,
      ['Which product is the precipitate?', 'mol AgCl = mol AgNO₃ (1 : 1).', `${f4(n)} mol ÷ 0.0450 L.`]); }

  { const n = 0.350 / mm('BaSO4'), c = n / 0.0250;
    M(G, 6, 3, 'Worksheet', 'BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s) + 2NaCl(aq). 25.0 mL of BaCl₂ solution reacts with excess Na₂SO₄ and gives 0.350 g of BaSO₄. What was [BaCl₂]?',
      `${f3(c)} M`,
      [`${f3(c / 2)} M`, `${f3(c * 2)} M`, `${f3(0.350 / mm('BaCl2') / 0.0250)} M`, `${f3(n / 25.0)} M`],
      `n(BaSO₄) = 0.350 ÷ ${r2(mm('BaSO4'))} = ${f4(n)} mol = n(BaCl₂) (1 : 1). M = ${f4(n)} ÷ 0.0250 L = ${f3(c)} M. Traps: halving or doubling uses a ratio that is not there (the 2 belongs to NaCl); ${f3(0.350 / mm('BaCl2') / 0.0250)} M divides the precipitate mass by the molar mass of BaCl₂; ${f3(n / 25.0)} M uses mL.`,
      ['The mass given is of the solid BaSO₄.', 'mol BaSO₄ = mol BaCl₂.', `${f4(n)} mol ÷ 0.0250 L.`]); }

  { const n = 0.156 * 0.10, g = n / 3 * mm('Al(OH)3');
    M(G, 6, 3, 'Worksheet', 'Week 4 worksheet, Q8: Al(OH)₃(s) + 3HCl(aq) → AlCl₃(aq) + 3H₂O(l). What mass of Al(OH)₃ reacts exactly with 156 mL of 0.10 M HCl?',
      `${f2(g)} g`,
      [`${f2(n * mm('Al(OH)3'))} g`, `${f2(3 * n * mm('Al(OH)3'))} g`, `${f2(156 * 0.10 / 3 * mm('Al(OH)3'))} g`, `${f2(n / 3 * mm('AlCl3'))} g`],
      `n(HCl) = 0.156 L × 0.10 M = ${f3(n)} mol. Al(OH)₃ : HCl = 1 : 3 → ${f3(n / 3)} mol. M(Al(OH)₃) = 26.98 + 3(16.00 + 1.008) = ${r2(mm('Al(OH)3'))} g/mol → ${f3(g)} g → ${f2(g)} g (0.10 M has 2 sig figs). Traps: ${f2(n * mm('Al(OH)3'))} g ignores the ratio; ${f2(3 * n * mm('Al(OH)3'))} g multiplies by 3; ${f2(156 * 0.10 / 3 * mm('Al(OH)3'))} g uses mL; ${f2(n / 3 * mm('AlCl3'))} g uses the molar mass of AlCl₃.`,
      ['Moles of HCl from M × V, then the 1 : 3 ratio.', 'One Al(OH)₃ neutralizes three HCl.', `${f3(n / 3)} mol × ${r2(mm('Al(OH)3'))} g/mol.`]); }

  { const n = 0.150 * 0.0250, g = n / 2 * mm('Mg(OH)2');
    N(G, 6, 3, 'Worksheet', 'Mg(OH)₂(s) + 2HCl(aq) → MgCl₂(aq) + 2H₂O(l). What mass of Mg(OH)₂ reacts exactly with 25.0 mL of 0.150 M HCl? (Enter a number in grams.)',
      `${f3(g)} g`, g,
      `n(HCl) = 0.150 × 0.0250 = ${f4(n)} mol → Mg(OH)₂ = ½ × that = ${f4(n / 2)} mol. M(Mg(OH)₂) = 24.31 + 2(17.008) = ${r2(mm('Mg(OH)2'))} g/mol → ${f3(g)} g.`,
      ['Same road as the Al(OH)₃ worksheet problem.', 'Mg(OH)₂ : HCl = 1 : 2.', `${f4(n / 2)} mol × ${r2(mm('Mg(OH)2'))}.`]); }

  /* ---------- lesson 6: precipitation, acids and bases ---------- */
  M(G, 6, 1, 'Lecture', 'The course slides group double-displacement (metathesis) reactions in aqueous solution into which two classes?',
    'Precipitation reactions and acid-base reactions',
    ['Combustion reactions and decomposition reactions', 'Oxidation reactions and reduction reactions', 'Synthesis reactions and single-displacement reactions', 'Nuclear reactions and phase changes'],
    'Slide: "Double-displacement reactions: precipitation reactions and acid base reactions." In both, the cations and anions swap partners; the key event is a solid forming (precipitation) or water forming (neutralization). Redox was only previewed.',
    ['Partners swap: AB + CD → AD + CB.', 'One class makes a solid, the other makes water.', 'Precipitation and neutralization.']);

  M(G, 6, 1, 'Lecture', 'In an acid-base neutralization between a strong acid and a strong base, the "key event" is:',
    'H⁺(aq) and OH⁻(aq) combining to form H₂O(l)',
    ['a solid salt precipitating', 'a gas bubbling out of solution', 'the spectator ions combining', 'the acid molecules breaking into atoms'],
    'Acid + base → salt + water. For HCl + NaOH the net ionic equation is H⁺(aq) + OH⁻(aq) → H₂O(l): forming water is the driving force. The salt (NaCl) stays dissolved as spectator ions; no gas or solid forms.',
    ['What new substance forms that was not there as ions?', 'acid + base → salt + water.', 'H⁺ + OH⁻ → H₂O.']);

  M(G, 6, 1, 'Concept', 'Per Table 4.1, all common compounds containing which anion are soluble, with NO exceptions?',
    'Nitrate, NO₃⁻',
    ['Chloride, Cl⁻', 'Sulfate, SO₄²⁻', 'Carbonate, CO₃²⁻', 'Hydroxide, OH⁻'],
    'Nitrates (with acetates, chlorates and perchlorates) are always soluble. Chlorides have exceptions (Ag⁺, Pb²⁺, Cu⁺, Hg₂²⁺), sulfates have exceptions (Ca, Sr, Ba, Ag, Pb, Hg₂²⁺), and carbonates and hydroxides are mostly INSOLUBLE.',
    ['Look for the row whose exceptions column says "None".', 'Group 1, NH₄⁺, NO₃⁻, acetate, ClO₃⁻, ClO₄⁻.', 'Nitrates always dissolve.']);

  M(G, 6, 2, 'Trap', 'According to the course’s solubility table (Table 4.1), which compound is INSOLUBLE in water?',
    'Ag₂SO₄',
    ['K₂SO₄', '(NH₄)₂CO₃', 'Pb(NO₃)₂', 'CaCl₂'],
    'Sulfates are soluble EXCEPT CaSO₄, SrSO₄, BaSO₄, Ag₂SO₄, PbSO₄ and Hg₂SO₄ - so Ag₂SO₄ is insoluble on the course table (this is why AgNO₃ + K₂SO₄ gives a precipitate in lecture). K₂SO₄ (Group 1) and (NH₄)₂CO₃ (ammonium) are always soluble; nitrates are always soluble; CaCl₂ is a soluble chloride.',
    ['Check the sulfate row’s exceptions.', 'Exceptions: Ca, Sr, Ba, Ag, Pb, Hg₂²⁺.', 'Silver sulfate.']);

  M(G, 6, 2, 'Concept', 'According to Table 4.1, which hydroxide is SOLUBLE in water?',
    'Ba(OH)₂',
    ['Fe(OH)₃', 'Mg(OH)₂', 'Cu(OH)₂', 'Al(OH)₃'],
    'Metal hydroxides are insoluble except Group 1 hydroxides and Ca(OH)₂, Sr(OH)₂ and Ba(OH)₂. Mg(OH)₂ is NOT on that list (Mg is Group 2 but not one of the three), and Fe(OH)₃, Cu(OH)₂ and Al(OH)₃ are insoluble.',
    ['Hydroxides are insoluble with a short list of exceptions.', 'Exceptions: Group 1, Ca, Sr, Ba.', 'Barium hydroxide.']);

  M(G, 6, 2, 'Concept', 'Which sulfate is SOLUBLE according to Table 4.1?',
    'MgSO₄',
    ['CaSO₄', 'SrSO₄', 'BaSO₄', 'PbSO₄'],
    'The insoluble sulfates are CaSO₄, SrSO₄, BaSO₄, Ag₂SO₄, PbSO₄ and Hg₂SO₄. Mg²⁺ is not on that list, so MgSO₄ (Epsom salt) is soluble.',
    ['Recite the sulfate exceptions.', 'Ca, Sr, Ba, Ag, Pb, Hg₂²⁺ - is Mg there?', 'Epsom salt dissolves in bath water.']);

  M(G, 6, 4, 'Trap', 'Which chloride is INSOLUBLE in water according to Table 4.1?',
    'CuCl',
    ['CuCl₂', 'FeCl₃', 'ZnBr₂', 'NH₄I'],
    'The halide exceptions are Ag⁺, Pb²⁺, Cu⁺ and Hg₂²⁺. CuCl contains copper(I), Cu⁺, so it is insoluble. CuCl₂ contains copper(II), Cu²⁺, which is NOT an exception - it dissolves. The trap is seeing "Cu" and stopping: the charge decides. FeCl₃ and ZnBr₂ are ordinary soluble halides; NH₄I is always soluble.',
    ['The exception list is about specific ions, including their charge.', 'Ag⁺, Pb²⁺, Cu⁺, Hg₂²⁺ - which copper ion is in each formula?', 'CuCl has Cu⁺.']);

  M(G, 6, 2, 'Concept', 'Which fluoride is INSOLUBLE according to Table 4.1?',
    'CaF₂',
    ['NaF', 'KF', 'AgF', 'NH₄F'],
    'Fluorides are soluble except PbF₂ and the fluorides of Group 2 - so CaF₂ (fluorite) is insoluble. NaF, KF and NH₄F are always soluble (Group 1, ammonium), and AgF is soluble: silver is an exception for Cl⁻, Br⁻ and I⁻, but NOT for F⁻.',
    ['Fluorides have their own exception list.', 'PbF₂ and Group 2 fluorides.', 'Calcium is Group 2.']);

  M(G, 6, 3, 'Concept', 'Which sulfide is SOLUBLE according to Table 4.1?',
    '(NH₄)₂S',
    ['CuS', 'PbS', 'Ag₂S', 'FeS'],
    'Sulfides are insoluble except those of Group 1, Group 2 and NH₄⁺. (NH₄)₂S is soluble; CuS, PbS, Ag₂S and FeS are classic insoluble (black) sulfides.',
    ['Sulfides are mostly insoluble.', 'Exceptions: Group 1, Group 2, NH₄⁺.', 'Ammonium compounds always dissolve.']);

  M(G, 6, 2, 'Concept', 'Which pair of aqueous solutions forms a precipitate when mixed?',
    'Pb(NO₃)₂ and NaI',
    ['NaNO₃ and KCl', 'NH₄Cl and KNO₃', 'Na₂SO₄ and MgCl₂', 'K₂CO₃ and NaOH'],
    'Swap partners and check each new combination. Pb(NO₃)₂ + 2NaI → PbI₂ + 2NaNO₃: PbI₂ is an iodide exception (Pb²⁺) → yellow precipitate (the lecture demo). NaNO₃ + KCl: NaCl, KNO₃ both soluble. NH₄Cl + KNO₃: NH₄NO₃, KCl soluble. Na₂SO₄ + MgCl₂: MgSO₄ and NaCl soluble. K₂CO₃ + NaOH: no new partners that are insoluble (all Group 1).',
    ['Swap the cations’ partners and test each product.', 'Look for an exception: Ag⁺, Pb²⁺, Cu⁺, Hg₂²⁺ with halides.', 'Lead(II) iodide, PbI₂, is the yellow solid.']);

  M(G, 6, 3, 'Concept', 'Which pair of aqueous solutions does NOT form a precipitate when mixed?',
    'Mg(NO₃)₂ and KCl',
    ['BaCl₂ and Na₂SO₄', 'AgNO₃ and KBr', 'CuSO₄ and NaOH', 'Na₃PO₄ and CaCl₂'],
    'Mg(NO₃)₂ + KCl could give MgCl₂ and KNO₃ - both soluble, so nothing happens. The others: BaSO₄ (insoluble sulfate), AgBr (Ag⁺ halide), Cu(OH)₂ (insoluble hydroxide) and Ca₃(PO₄)₂ (insoluble phosphate) all precipitate.',
    ['Test the two new combinations in each pair.', 'MgCl₂: is Mg²⁺ a chloride exception?', 'Both possible products in one pair dissolve.']);

  M(G, 6, 2, 'Lecture', 'Lecture slide: Al₂(SO₄)₃(aq) + 3Ba(NO₃)₂(aq) → 2Al(NO₃)₃(aq) + 3BaSO₄(s). What is the net ionic equation?',
    'Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)',
    ['Al³⁺(aq) + 3NO₃⁻(aq) → Al(NO₃)₃(aq)', '2Al³⁺(aq) + 3SO₄²⁻(aq) → Al₂(SO₄)₃(s)', '3Ba²⁺(aq) + 6NO₃⁻(aq) → 3Ba(NO₃)₂(aq)', 'Ba(NO₃)₂(aq) + SO₄²⁻(aq) → BaSO₄(s) + 2NO₃⁻(aq)'],
    'Write all soluble species as ions; BaSO₄ is the only solid. Al³⁺ and NO₃⁻ appear unchanged on both sides → spectators. Net: Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s) (the coefficient 3 divides out). Al(NO₃)₃ is soluble - nothing forms there; Al₂(SO₄)₃ is a reactant, not a precipitate; Ba(NO₃)₂ should be written as ions.',
    ['Which product is the solid?', 'Cross out ions that appear identically on both sides.', 'Only the ions that build BaSO₄ remain.']);

  M(G, 6, 3, 'Concept', 'Solutions of K₃PO₄ and CaCl₂ are mixed. What is the precipitate?',
    'Ca₃(PO₄)₂',
    ['KCl', 'CaPO₄', 'K₃Cl', 'No precipitate forms'],
    'Swapping partners gives KCl (Group 1, soluble) and calcium phosphate. Phosphates are insoluble except with Group 1 and NH₄⁺, so calcium phosphate precipitates. Its formula balances the charges Ca²⁺ and PO₄³⁻: 3 × (+2) = +6 and 2 × (−3) = −6 → Ca₃(PO₄)₂. CaPO₄ and K₃Cl have unbalanced charges.',
    ['Swap partners, then fix each formula with the ion charges.', 'Phosphates are insoluble unless Group 1 or NH₄⁺.', 'Ca²⁺ and PO₄³⁻ combine 3 : 2.']);

  M(G, 6, 3, 'Lecture', 'Lecture example: What are the products when AgNO₃(aq) and K₂SO₄(aq) are mixed (use the course’s Table 4.1)?',
    'Ag₂SO₄(s) and KNO₃(aq)',
    ['AgSO₄(s) and KNO₃(aq)', 'Ag₂SO₄(aq) and KNO₃(s)', 'No reaction - all the ions stay dissolved', 'Ag₂SO₄(s) and K(NO₃)₂(aq)'],
    'On the slide: 2AgNO₃(aq) + K₂SO₄(aq) → Ag₂SO₄(s) + 2KNO₃(aq). Ag₂SO₄ is one of the insoluble sulfate exceptions on the course table, so it precipitates; KNO₃ (Group 1, nitrate) stays dissolved. AgSO₄ and K(NO₃)₂ have unbalanced charges (Ag⁺, K⁺); KNO₃ can never be the solid; "no reaction" assumes all sulfates dissolve.',
    ['Swap partners and write correct formulas from the charges.', 'Ag⁺ with SO₄²⁻ → Ag₂SO₄; check the sulfate exceptions.', 'Ag₂SO₄ is on the course’s insoluble list.']);

  M(G, 6, 3, 'Lecture', 'Lecture example: What is the net ionic equation for the reaction of AgNO₃(aq) with K₂SO₄(aq)?',
    '2Ag⁺(aq) + SO₄²⁻(aq) → Ag₂SO₄(s)',
    ['Ag⁺(aq) + SO₄²⁻(aq) → AgSO₄(s)', '2K⁺(aq) + 2NO₃⁻(aq) → 2KNO₃(s)', 'Ag₂⁺(aq) + SO₄²⁻(aq) → Ag₂SO₄(s)', '2AgNO₃(aq) + SO₄²⁻(aq) → Ag₂SO₄(s) + 2NO₃⁻(aq)'],
    'Slide answer: 2Ag⁺(aq) + SO₄²⁻(aq) → Ag₂SO₄(s). K⁺ and NO₃⁻ are spectators. "AgSO₄" has the wrong formula; KNO₃ is soluble so it never precipitates; there is no "Ag₂⁺" ion (two separate Ag⁺ ions); and AgNO₃ must be written as ions in an ionic equation.',
    ['Split every soluble strong electrolyte into ions.', 'K⁺ and NO₃⁻ appear on both sides.', 'Two Ag⁺ for one SO₄²⁻.']);

  M(G, 6, 2, 'Lecture', 'Lecture slide: Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s) + 2KNO₃(aq). What is the net ionic equation?',
    'Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)',
    ['K⁺(aq) + NO₃⁻(aq) → KNO₃(aq)', 'Pb²⁺(aq) + I₂⁻(aq) → PbI₂(s)', 'Pb(NO₃)₂(aq) + 2I⁻(aq) → PbI₂(s) + 2NO₃⁻(aq)', 'Pb²⁺(aq) + 2I⁻(aq) → PbI₂(aq)'],
    'Slide: "Focus on the reaction that generates the solid." Net: Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s); K⁺ and NO₃⁻ are spectators. There is no I₂⁻ ion (two separate I⁻); Pb(NO₃)₂ must be split into ions; and PbI₂ is the solid (s), not (aq) - it is the yellow precipitate.',
    ['The driving force is the solid.', 'Cross out K⁺ and NO₃⁻.', 'Pb²⁺ + 2 I⁻ → the yellow solid.']);

  M(G, 6, 3, 'Lecture', 'What is the TOTAL ionic equation for Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s) + 2KNO₃(aq)?',
    'Pb²⁺(aq) + 2NO₃⁻(aq) + 2K⁺(aq) + 2I⁻(aq) → PbI₂(s) + 2K⁺(aq) + 2NO₃⁻(aq)',
    ['Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)', 'Pb²⁺(aq) + 2NO₃⁻(aq) + 2K⁺(aq) + 2I⁻(aq) → Pb²⁺(aq) + 2I⁻(aq) + 2K⁺(aq) + 2NO₃⁻(aq)', 'Pb²⁺(aq) + NO₃⁻(aq) + K⁺(aq) + I⁻(aq) → PbI₂(s) + K⁺(aq) + NO₃⁻(aq)', 'Pb(NO₃)₂(aq) + 2K⁺(aq) + 2I⁻(aq) → PbI₂(s) + 2KNO₃(aq)'],
    'The slide’s ionic equation writes out ALL ions with states: Pb²⁺ + 2NO₃⁻ + 2K⁺ + 2I⁻ → PbI₂(s) + 2K⁺ + 2NO₃⁻. The solid stays together. The first distractor is the NET ionic equation; the second splits the solid into ions (then nothing would have happened); the third drops the coefficients and is unbalanced; the last leaves strong electrolytes unsplit.',
    ['"Write out all ions and states!"', 'Every (aq) strong electrolyte becomes ions with the right coefficients; the (s) stays whole.', 'Two NO₃⁻ per Pb(NO₃)₂; 2 KI → 2 K⁺ + 2 I⁻.']);

  M(G, 6, 2, 'Concept', 'Which ions are SPECTATORS when Al₂(SO₄)₃(aq) and Ba(NO₃)₂(aq) are mixed?',
    'Al³⁺ and NO₃⁻',
    ['Ba²⁺ and SO₄²⁻', 'Al³⁺ and SO₄²⁻', 'Ba²⁺ and NO₃⁻', 'There are no spectator ions'],
    'BaSO₄ precipitates, so Ba²⁺ and SO₄²⁻ are the reacting ions. Al³⁺ and NO₃⁻ end up as dissolved Al(NO₃)₃ - unchanged on both sides - so they are the spectators.',
    ['Find the precipitate first.', 'The ions IN the precipitate are not spectators.', 'The other two ions.']);

  /* Worksheet Q7 - H2SO4 + BaCl2 in parts */
  M(G, 6, 2, 'Worksheet', 'Week 4 worksheet, Q7(a): What is the balanced MOLECULAR equation for the reaction of sulfuric acid with barium chloride?',
    'H₂SO₄(aq) + BaCl₂(aq) → BaSO₄(s) + 2HCl(aq)',
    ['H₂SO₄(aq) + BaCl₂(aq) → BaSO₄(aq) + 2HCl(aq)', 'H₂SO₄(aq) + BaCl₂(aq) → BaSO₄(s) + HCl(aq)', 'H₂SO₄(aq) + BaCl₂(aq) → BaH₂(s) + SO₄Cl₂(aq)', 'H₂SO₄(aq) + BaCl₂(aq) → BaS(s) + 2HClO₂(aq)'],
    'Swap partners: Ba²⁺ with SO₄²⁻ → BaSO₄ (insoluble sulfate exception → s); H⁺ with Cl⁻ → HCl (strong acid, aq). Balance Cl/H with 2HCl. BaSO₄ is not aqueous; one HCl leaves H and Cl unbalanced; the last two pair ions that cannot combine (cation with cation, or tearing sulfate apart).',
    ['Swap the cations’ partners.', 'BaSO₄ - check the sulfate exceptions; HCl - is it soluble?', 'Balance H and Cl with 2 HCl.']);

  M(G, 6, 3, 'Worksheet', 'Week 4 worksheet, Q7(b): What is the TOTAL ionic equation for H₂SO₄(aq) + BaCl₂(aq) → BaSO₄(s) + 2HCl(aq)?',
    '2H⁺(aq) + SO₄²⁻(aq) + Ba²⁺(aq) + 2Cl⁻(aq) → BaSO₄(s) + 2H⁺(aq) + 2Cl⁻(aq)',
    ['Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)', 'H₂SO₄(aq) + Ba²⁺(aq) + 2Cl⁻(aq) → BaSO₄(s) + 2H⁺(aq) + 2Cl⁻(aq)', '2H⁺(aq) + SO₄²⁻(aq) + Ba²⁺(aq) + 2Cl⁻(aq) → Ba²⁺(aq) + SO₄²⁻(aq) + 2H⁺(aq) + 2Cl⁻(aq)', 'H₂⁺(aq) + SO₄²⁻(aq) + Ba²⁺(aq) + Cl₂⁻(aq) → BaSO₄(s) + 2HCl(aq)'],
    'H₂SO₄ is one of the six strong acids → 2H⁺ + SO₄²⁻. BaCl₂ is a soluble salt → Ba²⁺ + 2Cl⁻. HCl is a strong acid → H⁺ + Cl⁻ (×2). BaSO₄(s) stays whole. The first distractor is the NET ionic equation; the second leaves the strong acid unsplit; the third splits the solid; the last invents H₂⁺ and Cl₂⁻ ions and leaves HCl molecular.',
    ['Split every strong electrolyte; keep the solid whole.', 'H₂SO₄ is a strong acid; HCl is a strong acid.', '2H⁺ + SO₄²⁻ + Ba²⁺ + 2Cl⁻ → BaSO₄(s) + 2H⁺ + 2Cl⁻.']);

  M(G, 6, 2, 'Worksheet', 'Week 4 worksheet, Q7(c): What is the NET ionic equation for the reaction of H₂SO₄(aq) with BaCl₂(aq)?',
    'Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)',
    ['H⁺(aq) + Cl⁻(aq) → HCl(aq)', '2H⁺(aq) + 2Cl⁻(aq) → 2HCl(aq)', 'H₂SO₄(aq) + Ba²⁺(aq) → BaSO₄(s) + 2H⁺(aq)', 'Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(aq)'],
    'Cancel the ions that appear unchanged on both sides of the total ionic equation (2H⁺ and 2Cl⁻): Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s). HCl stays ionized, so "forming HCl" is not a reaction; H₂SO₄ should be split; and BaSO₄ must be (s).',
    ['Start from the total ionic equation.', 'Cancel H⁺ and Cl⁻.', 'Only the ions that form the solid remain.']);

  M(G, 6, 2, 'Worksheet', 'Week 4 worksheet, Q7(d): Which ions are the spectator ions when H₂SO₄(aq) reacts with BaCl₂(aq)?',
    'H⁺ and Cl⁻',
    ['Ba²⁺ and SO₄²⁻', 'H⁺ and SO₄²⁻', 'Ba²⁺ and Cl⁻', 'There are none - every ion reacts'],
    'H⁺ and Cl⁻ appear (as 2H⁺ and 2Cl⁻) on both sides unchanged: spectators. Ba²⁺ and SO₄²⁻ form the precipitate BaSO₄. (Contrast H₂SO₄ + Ba(OH)₂, where H⁺ and OH⁻ also react and there are no spectators.)',
    ['Which ions do not end up in the solid?', 'Compare both sides of the total ionic equation.', 'The ions of HCl.']);

  M(G, 6, 3, 'Worksheet', 'What is the net ionic equation when aqueous Na₂CO₃ and CaCl₂ are mixed?',
    'Ca²⁺(aq) + CO₃²⁻(aq) → CaCO₃(s)',
    ['Na⁺(aq) + Cl⁻(aq) → NaCl(s)', '2Na⁺(aq) + CO₃²⁻(aq) → Na₂CO₃(s)', 'Ca²⁺(aq) + 2Cl⁻(aq) → CaCl₂(s)', 'Ca²⁺(aq) + CO₃²⁻(aq) → CaCO₃(aq)'],
    'Products: CaCO₃ (carbonates are insoluble except Group 1 and NH₄⁺) and NaCl (soluble). Net: Ca²⁺ + CO₃²⁻ → CaCO₃(s); Na⁺ and Cl⁻ are spectators. NaCl, Na₂CO₃ and CaCl₂ are all soluble, and the precipitate must be labelled (s).',
    ['Which product is insoluble?', 'Carbonates are insoluble unless Group 1 or NH₄⁺.', 'Calcium carbonate.']);

  M(G, 6, 3, 'Worksheet', 'What is the net ionic equation when aqueous CuSO₄ and NaOH are mixed?',
    'Cu²⁺(aq) + 2OH⁻(aq) → Cu(OH)₂(s)',
    ['Na⁺(aq) + SO₄²⁻(aq) → NaSO₄(s)', 'Cu²⁺(aq) + OH⁻(aq) → CuOH(s)', '2Na⁺(aq) + SO₄²⁻(aq) → Na₂SO₄(s)', 'H⁺(aq) + OH⁻(aq) → H₂O(l)'],
    'CuSO₄ + 2NaOH → Cu(OH)₂(s) + Na₂SO₄(aq). Hydroxides are insoluble except Group 1 and Ca, Sr, Ba, so Cu(OH)₂ precipitates (blue). Net: Cu²⁺ + 2OH⁻ → Cu(OH)₂(s). Na₂SO₄ is soluble (Group 1); CuOH has the wrong charge for Cu²⁺; there is no H⁺ here, so it is not a neutralization.',
    ['Swap partners; which product is insoluble?', 'Cu²⁺ needs two OH⁻.', 'Copper(II) hydroxide.']);

  M(G, 6, 4, 'Trap', 'What is the net ionic equation for H₂SO₄(aq) + Ba(OH)₂(aq) → BaSO₄(s) + 2H₂O(l)?',
    '2H⁺(aq) + SO₄²⁻(aq) + Ba²⁺(aq) + 2OH⁻(aq) → BaSO₄(s) + 2H₂O(l)',
    ['H⁺(aq) + OH⁻(aq) → H₂O(l)', 'Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)', 'H₂SO₄(aq) + Ba(OH)₂(aq) → BaSO₄(aq) + 2H₂O(l)', '2H⁺(aq) + 2OH⁻(aq) → 2H₂O(l), with Ba²⁺ and SO₄²⁻ as spectators'],
    'Both products are non-ionized: BaSO₄ is a solid AND water is a liquid molecule. Every ion on the left is consumed, so there are NO spectators and the net ionic equation equals the total ionic equation. Writing only H⁺ + OH⁻ → H₂O (or only the BaSO₄ part) leaves out half the chemistry; Ba²⁺ and SO₄²⁻ cannot be spectators because they form the precipitate.',
    ['Check every product: solid? liquid? dissolved ions?', 'BaSO₄(s) and H₂O(l) both remove ions from solution.', 'No ion survives unchanged - no spectators.']);

  M(G, 6, 1, 'Lecture', 'Which of these is NOT one of the six strong acids listed in the course?',
    'HF',
    ['HCl', 'HI', 'HClO₄', 'HNO₃'],
    'The six strong acids: HCl, HBr, HI, HNO₃, H₂SO₄, HClO₄. HF is a WEAK acid even though the other hydrohalic acids are strong - a favourite exam trap.',
    ['Recite the six.', 'HCl, HBr, HI, HNO₃, H₂SO₄, HClO₄.', 'One hydrogen halide is missing from the list.']);

  M(G, 6, 2, 'Concept', 'Which acid is completely ionized (strong) in water?',
    'HClO₄',
    ['HF', 'CH₃COOH', 'H₃PO₄', 'HNO₂'],
    'Perchloric acid, HClO₄, is one of the six strong acids. HF, acetic acid, phosphoric acid and nitrous acid (HNO₂ - not HNO₃) are all weak and only partly ionized.',
    ['Strong acids completely ionize - which is on the list of six?', 'Watch nitrous (HNO₂) vs nitric (HNO₃).', 'Perchloric acid.']);

  M(G, 6, 3, 'Trap', 'Which statement about phosphoric acid, H₃PO₄, is TRUE?',
    'It is triprotic but a WEAK acid.',
    ['It is a strong acid because it has three acidic hydrogens.', 'It is a monoprotic strong acid.', 'It is a diprotic acid like H₂SO₄.', 'It is a strong base because it contains phosphate.'],
    'The slides classify H₃PO₄ as triprotic (three acidic H). Strength is a separate question: it is not one of the six strong acids, so it is weak. The number of acidic H atoms does not decide strength - H₂SO₄ (diprotic) is strong, H₃PO₄ (triprotic) is weak, HF (monoprotic) is weak.',
    ['Number of acidic H and acid strength are different properties.', 'Is H₃PO₄ on the list of six strong acids?', 'Triprotic, weak.']);

  MF(G, 6, 2, 'Lecture', 'According to the slides, sulfuric acid, H₂SO₄, is classified as:',
    ['monoprotic and weak', 'monoprotic and strong', 'diprotic and weak', 'diprotic and strong', 'triprotic and strong'], 3,
    'H₂SO₄ has two acidic hydrogens (diprotic; the slides list it as the diprotic example) and is one of the six strong acids. Monoprotic examples are HCl and HNO₃; the triprotic example is H₃PO₄, which is weak.',
    ['Count the acidic H atoms.', 'Is it on the list of six strong acids?', 'Two H, strong.']);

  M(G, 6, 1, 'Lecture', 'An H⁺ ion released by an acid in water actually exists as:',
    'the hydronium ion, H₃O⁺',
    ['a free proton surrounded by vacuum', 'the hydroxide ion, OH⁻', 'an H atom', 'an H₂ molecule'],
    'A bare proton is far too reactive to float alone; it bonds to a water molecule, giving H₃O⁺ (hydronium), which is itself hydrogen-bonded to more water (lecture slide). H⁺(aq) is shorthand for H₃O⁺(aq).',
    ['A proton attaches to something in water.', 'What does H⁺ + H₂O give?', 'H⁺ + H₂O → H₃O⁺.']);

  M(G, 6, 2, 'Concept', 'Which compound is a strong base (a soluble hydroxide that dissociates completely)?',
    'Ba(OH)₂',
    ['NH₃', 'CH₃OH', 'Fe(OH)₃', 'H₂SO₄'],
    'Strong bases: Group 1 hydroxides plus Ca(OH)₂, Sr(OH)₂ and Ba(OH)₂. NH₃ is a weak base; CH₃OH contains an OH group but is an alcohol (nonelectrolyte, releases no OH⁻); Fe(OH)₃ is insoluble; H₂SO₄ is an acid.',
    ['Strong base = soluble hydroxide.', 'Group 1 hydroxides plus Ca, Sr, Ba.', 'Barium hydroxide.']);

  M(G, 6, 2, 'Lecture', 'Lecture example: HNO₃(aq) + KOH(aq) → KNO₃(aq) + H₂O(l). What is the total ionic equation?',
    'H⁺(aq) + NO₃⁻(aq) + K⁺(aq) + OH⁻(aq) → K⁺(aq) + NO₃⁻(aq) + H₂O(l)',
    ['H⁺(aq) + OH⁻(aq) → H₂O(l)', 'HNO₃(aq) + K⁺(aq) + OH⁻(aq) → K⁺(aq) + NO₃⁻(aq) + H₂O(l)', 'H⁺(aq) + NO₃⁻(aq) + K⁺(aq) + OH⁻(aq) → K⁺(aq) + NO₃⁻(aq) + H⁺(aq) + OH⁻(aq)', 'H⁺(aq) + NO₃⁻(aq) + K⁺(aq) + OH⁻(aq) → KNO₃(s) + H₂O(l)'],
    'HNO₃ is a strong acid, KOH a strong base and KNO₃ a soluble salt - all split into ions. Water stays molecular. The first distractor is the NET ionic equation; the second leaves the strong acid unsplit (only correct for a WEAK acid); the third splits water; KNO₃ is soluble, never (s).',
    ['Split every strong electrolyte; keep water whole.', 'Strong acid, strong base, soluble salt.', 'Only H₂O(l) stays molecular.']);

  M(G, 6, 2, 'Lecture', 'What is the net ionic equation for HNO₃(aq) + KOH(aq) → KNO₃(aq) + H₂O(l)?',
    'H⁺(aq) + OH⁻(aq) → H₂O(l)',
    ['K⁺(aq) + NO₃⁻(aq) → KNO₃(aq)', 'HNO₃(aq) + OH⁻(aq) → NO₃⁻(aq) + H₂O(l)', 'H⁺(aq) + KOH(aq) → K⁺(aq) + H₂O(l)', 'There is no net ionic equation; all ions are spectators'],
    'K⁺ and NO₃⁻ are spectators; the net reaction for a strong acid + strong base whose salt is soluble is always H⁺(aq) + OH⁻(aq) → H₂O(l). (If the salt is insoluble, as BaSO₄ from H₂SO₄ + Ba(OH)₂, the precipitate joins the net equation.) The second and third choices leave a strong electrolyte unsplit; the fourth forgets that water forms.',
    ['Cancel spectators from the total ionic equation.', 'K⁺ and NO₃⁻ appear on both sides.', 'Strong acid + strong base with a soluble salt always gives the same net equation.']);

  M(G, 6, 4, 'Trap', 'What is the net ionic equation for the reaction of acetic acid with sodium hydroxide, CH₃COOH(aq) + NaOH(aq) → CH₃COONa(aq) + H₂O(l)?',
    'CH₃COOH(aq) + OH⁻(aq) → CH₃COO⁻(aq) + H₂O(l)',
    ['H⁺(aq) + OH⁻(aq) → H₂O(l)', 'CH₃COO⁻(aq) + Na⁺(aq) → CH₃COONa(aq)', 'CH₃COOH(aq) + NaOH(aq) → CH₃COO⁻(aq) + Na⁺(aq) + H₂O(l)', 'CH₃COOH(aq) + OH⁻(aq) → CH₃COOH₂⁺(aq) + O²⁻(aq)'],
    'Acetic acid is WEAK: in solution it is mostly un-ionized CH₃COOH molecules, so it is written as a molecule in the ionic equations. NaOH is a strong base (Na⁺ + OH⁻) and CH₃COONa a soluble salt (Na⁺ + CH₃COO⁻). Cancel Na⁺: CH₃COOH(aq) + OH⁻(aq) → CH₃COO⁻(aq) + H₂O(l). "H⁺ + OH⁻ → H₂O" is the strong-acid answer - the trap. Leaving NaOH unsplit or inventing CH₃COOH₂⁺ are also wrong.',
    ['Is acetic acid strong or weak? How is a weak acid written?', 'Weak electrolytes stay as molecules; strong ones split.', 'The OH⁻ pulls H⁺ off the acetic acid molecule.']);

  M(G, 6, 4, 'Trap', 'What is the net ionic equation for HF(aq) + KOH(aq) → KF(aq) + H₂O(l)?',
    'HF(aq) + OH⁻(aq) → F⁻(aq) + H₂O(l)',
    ['H⁺(aq) + OH⁻(aq) → H₂O(l)', 'K⁺(aq) + F⁻(aq) → KF(s)', 'H⁺(aq) + F⁻(aq) + K⁺(aq) + OH⁻(aq) → KF(aq) + H₂O(l)', 'HF(aq) + KOH(aq) → KF(aq) + H₂O(l)'],
    'HF is a weak acid (not on the list of six), so it stays molecular. KOH and KF are strong electrolytes; K⁺ is a spectator. Net: HF(aq) + OH⁻(aq) → F⁻(aq) + H₂O(l). Treating HF as strong gives H⁺ + OH⁻ → H₂O; KF is soluble (Group 1); the last choice is just the molecular equation.',
    ['HF: strong or weak?', 'Weak acids appear as molecules; K⁺ cancels.', 'HF + OH⁻ → F⁻ + H₂O.']);

  M(G, 6, 4, 'Trap', 'Milk of magnesia, Mg(OH)₂(s), neutralizes stomach acid: Mg(OH)₂(s) + 2HCl(aq) → MgCl₂(aq) + 2H₂O(l). What is the net ionic equation?',
    'Mg(OH)₂(s) + 2H⁺(aq) → Mg²⁺(aq) + 2H₂O(l)',
    ['H⁺(aq) + OH⁻(aq) → H₂O(l)', 'Mg²⁺(aq) + 2OH⁻(aq) + 2H⁺(aq) → Mg²⁺(aq) + 2H₂O(l)', 'Mg²⁺(aq) + 2Cl⁻(aq) → MgCl₂(s)', 'Mg(OH)₂(s) + 2H⁺(aq) + 2Cl⁻(aq) → MgCl₂(s) + 2H₂O(l)'],
    'Mg(OH)₂ is listed on the slides as a base, but Table 4.1 says it is INSOLUBLE (Mg is not one of the Ca/Sr/Ba exceptions), so it is written as a solid. HCl → H⁺ + Cl⁻; MgCl₂ is soluble. Cancel Cl⁻: Mg(OH)₂(s) + 2H⁺(aq) → Mg²⁺(aq) + 2H₂O(l). Splitting Mg(OH)₂ into ions treats it as soluble; MgCl₂ is not a solid.',
    ['Is Mg(OH)₂ soluble according to Table 4.1?', 'Solids are never split into ions.', 'Only Cl⁻ is a spectator.']);

  M(G, 6, 4, 'Worksheet', 'For the worksheet reaction Al(OH)₃(s) + 3HCl(aq) → AlCl₃(aq) + 3H₂O(l), what is the net ionic equation?',
    'Al(OH)₃(s) + 3H⁺(aq) → Al³⁺(aq) + 3H₂O(l)',
    ['3H⁺(aq) + 3OH⁻(aq) → 3H₂O(l)', 'Al³⁺(aq) + 3Cl⁻(aq) → AlCl₃(aq)', 'Al(OH)₃(s) + 3H⁺(aq) + 3Cl⁻(aq) → Al³⁺(aq) + 3Cl⁻(aq) + 3H₂O(l)', 'Al(OH)₃(s) + 3HCl(aq) → Al³⁺(aq) + 3Cl⁻(aq) + 3H₂O(l)'],
    'Al(OH)₃ is an insoluble hydroxide (written as a solid); HCl is a strong acid (3H⁺ + 3Cl⁻); AlCl₃ is a soluble chloride (Al³⁺ + 3Cl⁻). Cancel the 3Cl⁻: Al(OH)₃(s) + 3H⁺(aq) → Al³⁺(aq) + 3H₂O(l). The third choice is the total ionic equation (Cl⁻ not cancelled); the last leaves HCl unsplit.',
    ['Is Al(OH)₃ dissolved or solid?', 'Split HCl and AlCl₃; keep Al(OH)₃(s) and H₂O(l).', 'Cl⁻ is the only spectator.']);

  M(G, 6, 3, 'Lecture', 'Lecture example: Consider the decomposition 2H₂O₂(aq) → 2H₂O(l) + O₂(g). In this reaction, H₂O₂ is serving as:',
    'none of these - it is a decomposition (redox) reaction, not an electrolyte, acid or base reaction',
    ['an electrolyte, because it breaks into ions', 'an acid, because it releases H⁺', 'a base, because it releases OH⁻', 'both an acid and a base, because it makes water'],
    'Nothing in this reaction produces ions, H⁺ or OH⁻: H₂O₂ molecules break into H₂O molecules and O₂ gas. It is a decomposition in which oxygen is both oxidized (to O₂) and reduced (to H₂O) - a redox reaction, previewed in the lecture. Forming water does not make it an acid-base reaction; neutralization needs H⁺ meeting OH⁻.',
    ['Look at the products: are there any ions?', 'Acids release H⁺, bases release OH⁻, electrolytes release ions. Does any of that happen?', 'It is a decomposition - the redox preview.']);

  { const n = 2 * 0.100 * 0.0250;
    MF(G, 6, 2, 'Calculation', 'How many moles of H⁺ are supplied by 25.0 mL of 0.100 M H₂SO₄ (treat both protons as released, as in a titration with NaOH)?',
      ['1.25 × 10⁻³ mol', '2.50 × 10⁻³ mol', '5.00 × 10⁻³ mol', '0.200 mol', '5.00 mol'], 2,
      `n(H₂SO₄) = 0.100 × 0.0250 = 2.50 × 10⁻³ mol. Diprotic: 2 H⁺ each → ${fmt(n, 3)} mol H⁺. 2.50 × 10⁻³ forgets the 2; 1.25 × 10⁻³ halves instead of doubling; 0.200 is the H⁺ concentration (M), not moles; 5.00 uses mL as L.`,
      ['Moles of acid = M × V(L).', 'H₂SO₄ is diprotic.', '2 × 0.100 × 0.0250.']); }

  M(G, 6, 3, 'Concept', 'Which 0.10 M solution has the highest concentration of H⁺(aq)?',
    'H₂SO₄',
    ['HCl', 'CH₃COOH', 'HF', 'H₃PO₄'],
    'H₂SO₄ is a strong acid AND diprotic, so 0.10 M H₂SO₄ releases more than 0.10 M H⁺ (its first proton completely, plus some of the second). HCl (strong, monoprotic) gives 0.10 M H⁺. CH₃COOH, HF and H₃PO₄ are weak acids - only a small fraction ionizes, so even triprotic H₃PO₄ gives far less H⁺.',
    ['Two questions: strong or weak? how many acidic H?', 'Weak acids barely ionize, whatever their proticity.', 'The strong diprotic acid.']);

  { const n = 0.1050 * 0.01845, c = n / 0.02500;
    N(G, 6, 3, 'Calculation', 'A 25.00 mL sample of HCl is titrated to the equivalence point with 18.45 mL of 0.1050 M NaOH. What is the concentration of the HCl? (Enter a number in M.)',
      `${f4(c)} M`, c,
      `At equivalence, mol H⁺ = mol OH⁻. n(NaOH) = 0.1050 × 0.01845 = ${f4(n)} mol = n(HCl) (1 : 1). [HCl] = ${f4(n)} ÷ 0.02500 L = ${f4(c)} M (4 sig figs).`,
      ['At the equivalence point the moles of acid and base match the equation.', 'HCl + NaOH is 1 : 1.', `${f4(n)} mol ÷ 0.02500 L.`]); }

  { const n = 0.1200 * 0.03260, c = n / 2 / 0.02000;
    M(G, 6, 4, 'Trap', 'A 20.00 mL sample of H₂SO₄ requires 32.60 mL of 0.1200 M NaOH to reach the equivalence point: H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O. What is [H₂SO₄]?',
      `${f4(c)} M`,
      [`${f4(2 * c)} M`, `${f4(c / 2)} M`, `${f4(0.1200 * 20.00 / 32.60)} M`, `${f4(n)} M`],
      `n(NaOH) = 0.1200 × 0.03260 = ${f4(n)} mol. Each H₂SO₄ uses 2 NaOH → n(H₂SO₄) = ${f4(n / 2)} mol. [H₂SO₄] = ${f4(n / 2)} ÷ 0.02000 = ${f4(c)} M. Traps: ${f4(2 * c)} M treats the acid as monoprotic (M₁V₁ = M₂V₂ blindly); ${f4(c / 2)} M divides by 2 twice; ${f4(0.1200 * 20.00 / 32.60)} M inverts the volumes; ${f4(n)} is moles of NaOH, not a molarity.`,
      ['M₁V₁ = M₂V₂ only works for 1 : 1 reactions.', 'mol NaOH → ÷ 2 → mol H₂SO₄ → ÷ L.', `${f4(n / 2)} mol ÷ 0.02000 L.`]); }

  { const nH = 0.200 * 0.0300, V = nH / 2 / 0.150 * 1000;
    M(G, 6, 4, 'Trap', 'What volume of 0.150 M Ba(OH)₂ is needed to neutralize 30.0 mL of 0.200 M HCl? (2HCl + Ba(OH)₂ → BaCl₂ + 2H₂O)',
      `${f3(V)} mL`,
      [`${f3(2 * V)} mL`, `${f3(V / 2)} mL`, `${f3(0.150 * 30.0 / 0.200)} mL`, `${f3(V / 1000)} mL`],
      `n(HCl) = 0.200 × 0.0300 = ${f3(nH)} mol H⁺. Each Ba(OH)₂ supplies 2 OH⁻, so n(Ba(OH)₂) = ${f3(nH / 2)} mol. V = ${f3(nH / 2)} ÷ 0.150 = ${f3(V / 1000)} L = ${f3(V)} mL. Traps: ${f3(2 * V)} mL ignores the 2 OH⁻ per Ba(OH)₂ (M₁V₁ = M₂V₂ used blindly); ${f3(V / 2)} mL applies the 2 twice; ${f3(0.150 * 30.0 / 0.200)} mL swaps the molarities; ${f3(V / 1000)} is liters labelled mL.`,
      ['Count OH⁻ per formula unit of the base.', 'mol H⁺ = mol OH⁻ = 2 × mol Ba(OH)₂.', `${f3(nH / 2)} mol ÷ 0.150 M.`]); }

  { const nH = 0.1000 * 0.03120, c = nH / 2 / 0.02500;
    M(G, 6, 4, 'Calculation', '25.00 mL of Ba(OH)₂ solution is titrated with 31.20 mL of 0.1000 M HCl. What is [Ba(OH)₂]?',
      `${f4(c)} M`,
      [`${f4(2 * c)} M`, `${f4(0.1000 * 25.00 / 31.20)} M`, `${f4(nH)} M`, `${f4(4 * c)} M`],
      `n(HCl) = 0.1000 × 0.03120 = ${f4(nH)} mol = mol OH⁻ needed. n(Ba(OH)₂) = ${f4(nH)} ÷ 2 = ${f4(nH / 2)} mol. [Ba(OH)₂] = ${f4(nH / 2)} ÷ 0.02500 = ${f4(c)} M. Traps: ${f4(2 * c)} M is [OH⁻], not [Ba(OH)₂]; ${f4(0.1000 * 25.00 / 31.20)} M inverts the volumes; ${f4(nH)} is moles; ${f4(4 * c)} M multiplies by 2 instead of dividing.`,
      ['Each Ba(OH)₂ neutralizes two HCl.', 'mol Ba(OH)₂ = mol HCl ÷ 2.', `${f4(nH / 2)} mol ÷ 0.02500 L.`]); }

  { const nH = 3 * 0.250 * 0.0100, V = nH / 0.100 * 1000;
    M(G, 6, 4, 'Calculation', 'What volume of 0.100 M NaOH is needed to neutralize ALL the acidic hydrogens in 10.0 mL of 0.250 M H₃PO₄? (H₃PO₄ + 3NaOH → Na₃PO₄ + 3H₂O)',
      `${f3(V)} mL`,
      [`${f3(V / 3)} mL`, `${f3(V * 2 / 3)} mL`, `${f3(V / 9)} mL`, `${f3(0.100 * 10.0 / 0.250)} mL`],
      `n(H₃PO₄) = 0.250 × 0.0100 = 2.50 × 10⁻³ mol; triprotic → ${f3(nH)} mol NaOH. V = ${f3(nH)} ÷ 0.100 = ${f3(V / 1000)} L = ${f3(V)} mL. (Weak acids still give up all their protons to a strong base - weak describes how much ionizes in water alone, not how much can be neutralized.) Traps: ${f3(V / 3)} mL treats it as monoprotic; ${f3(V * 2 / 3)} mL as diprotic; ${f3(V / 9)} mL divides by 3 instead of multiplying; the last swaps concentrations.`,
      ['How many NaOH per H₃PO₄?', 'mol NaOH = 3 × mol H₃PO₄.', `${f3(nH)} mol ÷ 0.100 M.`]); }

  { const n = 0.100 * 0.0500, g = n * mm('AgCl');
    N(G, 6, 3, 'Calculation', 'What mass of AgCl precipitates when 50.0 mL of 0.100 M AgNO₃ is mixed with excess NaCl(aq)? (Enter a number in grams.)',
      `${f3(g)} g`, g,
      `n(Ag⁺) = 0.100 × 0.0500 = ${f3(n)} mol → ${f3(n)} mol AgCl (1 : 1) × ${r2(mm('AgCl'))} g/mol = ${f3(g)} g.`,
      ['Moles of the reactant that is NOT in excess.', 'Ag⁺ + Cl⁻ → AgCl(s), 1 : 1.', `${f3(n)} mol × ${r2(mm('AgCl'))}.`]); }

  { const nPb = 0.200 * 0.0250, nI = 0.300 * 0.0300, pP = nPb, pI = nI / 2, Mp = mm('PbI2'), g = Math.min(pP, pI) * Mp;
    if (!(pI < pP)) throw new Error('PbI2 LR');
    M(G, 6, 4, 'Calculation', '25.0 mL of 0.200 M Pb(NO₃)₂ is mixed with 30.0 mL of 0.300 M KI. Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s). What mass of PbI₂ forms?',
      `${f3(g)} g`,
      [`${f3(pP * Mp)} g`, `${f3(nI * Mp)} g`, `${f3(pI * mm('KI'))} g`, `${f3(nPb * Mp / 2)} g`],
      `n(Pb²⁺) = 0.200 × 0.0250 = ${f3(nPb)} mol → could make ${f3(pP)} mol PbI₂. n(I⁻) = 0.300 × 0.0300 = ${f3(nI)} mol → ÷ 2 = ${f3(pI)} mol PbI₂. I⁻ is limiting. Mass = ${f3(pI)} × ${r2(Mp)} = ${f3(g)} g. Traps: ${f3(pP * Mp)} g uses the excess Pb²⁺; ${f3(nI * Mp)} g forgets that each PbI₂ needs 2 I⁻; ${f3(pI * mm('KI'))} g uses the molar mass of KI; ${f3(nPb * Mp / 2)} g halves the lead.`,
      ['Two solutions, two amounts: find the limiting reactant.', 'mol = M × V for each; PbI₂ needs 2 I⁻ per Pb²⁺.', `${f3(pI)} mol PbI₂ × ${r2(Mp)} g/mol.`]); }

  { const nBa = 0.150 * 0.0400, nS = 0.200 * 0.0250, g = Math.min(nBa, nS) * mm('BaSO4');
    N(G, 6, 4, 'Calculation', '40.0 mL of 0.150 M BaCl₂ is mixed with 25.0 mL of 0.200 M Na₂SO₄. What mass of BaSO₄ precipitates? (Enter a number in grams.)',
      `${f3(g)} g`, g,
      `n(Ba²⁺) = 0.150 × 0.0400 = ${f3(nBa)} mol; n(SO₄²⁻) = 0.200 × 0.0250 = ${f3(nS)} mol. Ba²⁺ + SO₄²⁻ → BaSO₄ is 1 : 1, so SO₄²⁻ (fewer moles) is limiting: ${f3(nS)} mol × ${r2(mm('BaSO4'))} g/mol = ${f3(g)} g. (Using Ba²⁺ gives ${f3(nBa * mm('BaSO4'))} g - too much.)`,
      ['Find the moles of each reacting ion.', 'Ba²⁺ + SO₄²⁻ → BaSO₄(s) is 1 : 1; smaller wins.', `${f3(nS)} mol × ${r2(mm('BaSO4'))}.`]); }

  { const nNa = 2 * 0.200 * 0.0250, V = 0.0650, c = nNa / V;
    M(G, 6, 4, 'Calculation', 'In the same mixture (40.0 mL of 0.150 M BaCl₂ + 25.0 mL of 0.200 M Na₂SO₄), what is the concentration of the spectator ion Na⁺ after mixing?',
      `${f3(c)} M`,
      [`${f3(nNa / 0.0250)} M`, `${f3(c / 2)} M`, '0.200 M', `${f3(nNa)} M`],
      `Spectators are not consumed, but they ARE diluted. n(Na⁺) = 2 × 0.200 × 0.0250 = ${f3(nNa)} mol. Total volume = 40.0 + 25.0 = 65.0 mL = 0.0650 L. [Na⁺] = ${f3(nNa)} ÷ 0.0650 = ${f3(c)} M. Traps: ${f3(nNa / 0.0250)} M ignores the added 40.0 mL; ${f3(c / 2)} M forgets 2 Na⁺ per Na₂SO₄; 0.200 M is the original salt concentration; ${f3(nNa)} is moles.`,
      ['Spectator ions keep their moles but share a bigger volume.', 'mol Na⁺ = 2 × M × V; total volume = sum of volumes.', `${f3(nNa)} mol ÷ 0.0650 L.`]); }

  { const nBa = 0.150 * 0.0400, nS = 0.200 * 0.0250, c = (nBa - nS) / 0.0650;
    M(G, 6, 4, 'Calculation', 'In the same mixture (40.0 mL of 0.150 M BaCl₂ + 25.0 mL of 0.200 M Na₂SO₄), what is the concentration of Ba²⁺ remaining in solution after BaSO₄ precipitates?',
      `${f3(c)} M`,
      [`${f3(nBa / 0.0650)} M`, `${f3((nBa - nS) / 0.0400)} M`, '0 M', `${f3(0.200 - 0.150)} M`],
      `Ba²⁺ is in excess. Left = ${f3(nBa)} − ${f3(nS)} = ${f3(nBa - nS)} mol, in 0.0650 L → ${f3(c)} M. Traps: ${f3(nBa / 0.0650)} M forgets that some Ba²⁺ precipitated; ${f3((nBa - nS) / 0.0400)} M uses only the BaCl₂ volume; 0 M assumes Ba²⁺ was limiting; 0.0500 M subtracts the molarities.`,
      ['Which ion is in excess?', 'Remaining moles = start − used; divide by the TOTAL volume.', `${f3(nBa - nS)} mol ÷ 0.0650 L.`]); }

  { const c = (0.0200 * 0.100 + 2 * 0.0300 * 0.200) / 0.0500;
    M(G, 5, 4, 'Calculation', '20.0 mL of 0.100 M NaCl is mixed with 30.0 mL of 0.200 M CaCl₂ (no reaction occurs). What is [Cl⁻] in the mixture?',
      `${f3(c)} M`,
      [`${f3((0.0200 * 0.100 + 0.0300 * 0.200) / 0.0500)} M`, `${f3(0.100 + 2 * 0.200)} M`, `${f3((0.100 + 0.200) / 2)} M`, `${f3(0.0200 * 0.100 + 2 * 0.0300 * 0.200)} M`],
      `Moles of Cl⁻: from NaCl 0.0200 × 0.100 = 0.00200 mol; from CaCl₂ 2 × 0.0300 × 0.200 = 0.0120 mol. Total 0.0140 mol in 50.0 mL = 0.0500 L → ${f3(c)} M. Traps: ${f3((0.0200 * 0.100 + 0.0300 * 0.200) / 0.0500)} M forgets 2 Cl⁻ per CaCl₂; ${f3(0.100 + 2 * 0.200)} M adds concentrations; ${f3((0.100 + 0.200) / 2)} M averages them; ${f3(0.0200 * 0.100 + 2 * 0.0300 * 0.200)} is moles.`,
      ['Add moles of Cl⁻ from both sources, then divide by total volume.', 'CaCl₂ gives 2 Cl⁻.', '0.0140 mol ÷ 0.0500 L.']); }

  M(G, 6, 3, 'Concept', 'Molecular scene in words: Beaker A holds 4 Ag⁺ and 4 NO₃⁻ ions; beaker B holds 3 Na⁺ and 3 Cl⁻ ions. The beakers are mixed. Which description of the result is correct?',
    '3 units of AgCl(s); dissolved: 1 Ag⁺, 4 NO₃⁻ and 3 Na⁺',
    ['4 units of AgCl(s); dissolved: 4 NO₃⁻ and 3 Na⁺', '3 units of AgCl(s) and 3 units of NaNO₃(s); dissolved: 1 Ag⁺ and 1 NO₃⁻', '3 units of AgCl(s); dissolved: 4 NO₃⁻ and 3 Na⁺ only', 'No solid; dissolved: 4 Ag⁺, 4 NO₃⁻, 3 Na⁺ and 3 Cl⁻'],
    'Ag⁺ + Cl⁻ → AgCl(s), 1 : 1. Only 3 Cl⁻ are available, so 3 AgCl form and 1 Ag⁺ is left dissolved. Na⁺ and NO₃⁻ are spectators and stay dissolved (NaNO₃ is soluble). 4 AgCl would need 4 Cl⁻; forgetting the leftover Ag⁺ breaks charge balance (4 NO₃⁻ but only 3 Na⁺); AgCl is insoluble, so "no solid" is wrong.',
    ['Which pair of ions makes an insoluble compound?', 'AgCl forms 1 : 1 - which ion runs out?', '3 AgCl, and one Ag⁺ has no partner.']);

  M(G, 6, 2, 'Concept', 'Which ions are spectators when HCl(aq) reacts with NaOH(aq)?',
    'Na⁺ and Cl⁻',
    ['H⁺ and OH⁻', 'Na⁺ and OH⁻', 'H⁺ and Cl⁻', 'There are none'],
    'Total ionic: H⁺ + Cl⁻ + Na⁺ + OH⁻ → Na⁺ + Cl⁻ + H₂O(l). Na⁺ and Cl⁻ appear unchanged on both sides (slide 15); H⁺ and OH⁻ react to make water.',
    ['Which ions make the water?', 'The others are spectators.', 'The ions of the salt NaCl.']);

  M(G, 6, 4, 'Trap', 'You have 25.0 mL of 0.10 M HCl and 25.0 mL of 0.10 M CH₃COOH. Which statement is TRUE?',
    'Both need the same volume of 0.10 M NaOH to reach the equivalence point.',
    ['The HCl needs more NaOH because it is a strong acid.', 'The CH₃COOH needs more NaOH because it is a weak acid.', 'The two solutions conduct electricity equally well.', 'The two solutions have the same concentration of H⁺(aq).'],
    'Both contain 2.5 × 10⁻³ mol of a MONOPROTIC acid, and a strong base pulls every proton off either one (CH₃COOH + OH⁻ → CH₃COO⁻ + H₂O goes to completion). So both need 25.0 mL of 0.10 M NaOH. Strength controls how many ions exist in water BEFORE any base is added: HCl is fully ionized (higher [H⁺], better conductor); CH₃COOH is only slightly ionized.',
    ['Neutralization capacity depends on moles of acidic H, not on strength.', 'Both are monoprotic with the same moles.', 'Strength affects [H⁺] and conductivity, not the equivalence volume.']);

  M(G, 6, 4, 'Trap', 'A solution contains both Ag⁺ and Ba²⁺. Using the course’s Table 4.1, which reagent would precipitate ONLY the Ag⁺, leaving Ba²⁺ in solution?',
    'NaCl',
    ['Na₂SO₄', 'Na₂CO₃', 'NaNO₃', 'Na₃PO₄'],
    'AgCl is insoluble (Ag⁺ is a chloride exception) but BaCl₂ is soluble, so Cl⁻ separates them. On the course table both Ag₂SO₄ and BaSO₄ are insoluble, so sulfate precipitates BOTH (the trap if you think Ag₂SO₄ dissolves). Carbonate and phosphate precipitate both (Ag and Ba are not Group 1). Nitrate precipitates neither.',
    ['You need an anion that is insoluble with one cation but soluble with the other.', 'Check Cl⁻: Ag⁺ is an exception, Ba²⁺ is not.', 'Sulfate fails because Ag₂SO₄ is also insoluble on the course table.']);

  { const nAg = 0.7603 / mm('AgCl'), g = nAg * mm('NaCl'), p = g / 0.5000 * 100;
    M(G, 6, 4, 'Calculation', 'A 0.5000 g mixture of NaCl and KNO₃ is dissolved in water, and excess AgNO₃(aq) is added. 0.7603 g of AgCl is collected. What is the mass percent of NaCl in the mixture?',
      `${p.toFixed(1)}%`,
      [`${(0.7603 / 0.5000 * 100).toFixed(1)}%`, `${(100 - p).toFixed(1)}%`, `${(nAg * AM.Cl / 0.5000 * 100).toFixed(1)}%`, `${(nAg * AM.Na / 0.5000 * 100).toFixed(1)}%`],
      `Only the Cl⁻ (from NaCl) precipitates; KNO₃ is a bystander. n(AgCl) = 0.7603 ÷ ${r2(mm('AgCl'))} = ${f4(nAg)} mol = n(NaCl). Mass NaCl = ${f4(nAg)} × ${r2(mm('NaCl'))} = ${f4(g)} g. % = ${f4(g)} ÷ 0.5000 × 100 = ${p.toFixed(1)}%. Traps: ${(0.7603 / 0.5000 * 100).toFixed(1)}% divides the precipitate mass by the sample; ${(100 - p).toFixed(1)}% is the KNO₃; the last two count only the Cl or only the Na in NaCl.`,
      ['Which component of the mixture makes the precipitate?', 'mol AgCl = mol Cl⁻ = mol NaCl.', `Mass NaCl ÷ 0.5000 g × 100.`]); }
  M(G, 5, 1, 'Concept', 'Which compound is a STRONG electrolyte in water?',
    'KNO₃',
    ['CH₃COOH', 'C₆H₁₂O₆', 'C₂H₅OH', 'NH₃'],
    'KNO₃ is a soluble ionic compound: it dissociates completely into K⁺ and NO₃⁻. Acetic acid and ammonia are weak electrolytes (only partly ionized); glucose and ethanol are nonelectrolytes (they dissolve as molecules).',
    ['Strong electrolytes break apart completely into ions.', 'Soluble ionic compounds, strong acids and strong bases.', 'The only ionic compound in the list.']);

  M(G, 6, 1, 'Lecture', 'According to the course slides, a BASE is a substance that:',
    'produces OH⁻ when dissolved in water',
    ['produces H⁺ when dissolved in water', 'forms a precipitate with any metal ion', 'contains oxygen', 'does not conduct electricity in water'],
    'Slide definitions: an acid produces H⁺ in water; a base produces OH⁻ in water (examples NaOH, KOH, Mg(OH)₂). Producing H⁺ is the acid definition; containing O does not make something a base (methanol, CH₃OH, is not a base); bases that dissolve are electrolytes, so they do conduct.',
    ['Acid ↔ H⁺; base ↔ ?', 'NaOH → Na⁺ + ?', 'It releases hydroxide ions.']);

  M(G, 6, 1, 'Lecture', 'Which acid is MONOPROTIC?',
    'HNO₃',
    ['H₂SO₄', 'H₃PO₄', 'H₂CO₃', 'H₂C₂O₄'],
    'Monoprotic acids release one H⁺ per molecule; the slides give HCl and HNO₃ as examples. H₂SO₄, H₂CO₃ and oxalic acid H₂C₂O₄ are diprotic; H₃PO₄ is triprotic.',
    ['Count the acidic H atoms written at the front of the formula.', 'Mono = one.', 'Nitric acid has one H.']);

  { const n = 2.00 * 0.1000, g = n * mm('C3H6O'), V = g / 0.791;
    M(G, 5, 3, 'Worksheet', 'Worksheet Q2 variation: How many milliliters of acetone (C₃H₆O, density 0.791 g/mL) are needed to make 100.0 mL of 2.00 M aqueous acetone?',
      `${f3(V)} mL`,
      [`${f3(g)} mL`, `${f3(g * 0.791)} mL`, `${f3(2.00 * mm('C3H6O') / 0.791)} mL`, `${f3(100.0 - V)} mL`],
      `n = 2.00 × 0.1000 = 0.200 mol; M(C₃H₆O) = 3(12.01) + 6(1.008) + 16.00 = ${r2(mm('C3H6O'))} g/mol → ${f4(g)} g; V = ${f4(g)} ÷ 0.791 = ${f3(V)} mL. Traps: ${f3(g)} mL treats grams as mL; ${f3(g * 0.791)} mL multiplies by density; ${f3(2.00 * mm('C3H6O') / 0.791)} mL forgets the 0.1000 L; ${f3(100.0 - V)} mL is the water, roughly.`,
      ['M × V → mol → g → mL.', 'Volume = mass ÷ density.', `${f4(g)} g ÷ 0.791 g/mL.`]); }

  { const n = 4.236 / mm('Na2CO3'), g = n * mm('CO2');
    M(G, 5, 3, 'Worksheet', 'Worksheet Q5 variation: Na₂CO₃(aq) + 2HCl(aq) → 2NaCl(aq) + H₂O(l) + CO₂(g). What mass of CO₂ gas is released when 4.236 g of Na₂CO₃ reacts completely?',
      `${f3(g)} g`,
      [`${f3(2 * g)} g`, `${f3(g / 2)} g`, `${f3(4.236 * mm('CO2') / mm('NaCl'))} g`, `${f3(n)} g`],
      `n(Na₂CO₃) = 4.236 ÷ ${r2(mm('Na2CO3'))} = ${f4(n)} mol. CO₂ : Na₂CO₃ = 1 : 1 → ${f4(n)} mol × 44.01 = ${f3(g)} g. Traps: doubling or halving borrows the 2 from HCl/NaCl; ${f3(4.236 * mm('CO2') / mm('NaCl'))} g divides by the molar mass of NaCl; ${f3(n)} g is the moles.`,
      ['Every carbonate C ends up in one CO₂.', 'CO₂ : Na₂CO₃ = 1 : 1.', `${f4(n)} mol × 44.01 g/mol.`]); }

}

/* =====================================================================
   CHAPTER 91 - EXAM 1 REVIEW (lessons 1-6, Ch 1-4), exam format
   ===================================================================== */
{
  const G = 91;
  { const ge = 15.0 * 0.789, nE = ge / mm('C2H5OH'), nO = 30.0 / 32.00, pE = 2 * nE, pO = nO * 2 / 3, g = Math.min(pE, pO) * mm('CO2');
    if (!(pE < pO)) throw new Error('91 ethanol LR');
    M(G, 4, 4, 'Exam', '15.0 mL of ethanol (C₂H₅OH, density 0.789 g/mL) is burned with 30.0 g of O₂: C₂H₅OH(l) + 3O₂(g) → 2CO₂(g) + 3H₂O(l). What mass of CO₂ can form?',
      `${f3(g)} g`,
      [`${f3(pO * mm('CO2'))} g`, `${f3(15.0 / mm('C2H5OH') * 2 * mm('CO2'))} g`, `${f3(nE * mm('CO2'))} g`, `${f3(15.0 / 0.789 / mm('C2H5OH') * 2 * mm('CO2'))} g`],
      `Mass of ethanol = 15.0 mL × 0.789 g/mL = ${f4(ge)} g → ÷ ${r2(mm('C2H5OH'))} = ${f4(nE)} mol → × 2 = ${f4(pE)} mol CO₂. O₂: 30.0 ÷ 32.00 = ${f4(nO)} mol → × 2/3 = ${f4(pO)} mol CO₂. Ethanol is limiting: ${f4(pE)} × 44.01 = ${f3(g)} g. Traps: ${f3(pO * mm('CO2'))} g uses the excess O₂; ${f3(15.0 / mm('C2H5OH') * 2 * mm('CO2'))} g treats 15.0 mL as 15.0 g; ${f3(nE * mm('CO2'))} g forgets the 2 CO₂; ${f3(15.0 / 0.789 / mm('C2H5OH') * 2 * mm('CO2'))} g divides by the density.`,
      ['Volume → mass with density, then moles.', 'Compare the CO₂ each reactant could make.', `${f4(pE)} mol CO₂ × 44.01.`]); }

  { const nPb = 0.200 * 0.0500, nI = 0.300 * 0.0400, p = Math.min(nPb, nI / 2), g = p * mm('PbI2');
    M(G, 6, 4, 'Exam', '50.0 mL of 0.200 M lead(II) nitrate is mixed with 40.0 mL of 0.300 M sodium iodide. What mass of precipitate forms?',
      `${f3(g)} g`,
      [`${f3(nPb * mm('PbI2'))} g`, `${f3(nI * mm('PbI2'))} g`, `${f3(nI / 2 * mm('NaNO3') * 2)} g`, `${f3(nI / 2 * mm('PbI'))} g`.replace(/.*/, `${f3(nI / 2 * mm('Pb(NO3)2'))} g`)],
      `Names → formulas: Pb(NO₃)₂ and NaI. Precipitate: PbI₂ (Pb²⁺ is an iodide exception); NaNO₃ stays dissolved. n(Pb²⁺) = 0.200 × 0.0500 = ${f3(nPb)} mol; n(I⁻) = 0.300 × 0.0400 = ${f3(nI)} mol, which can make only ${f3(nI / 2)} mol PbI₂ → I⁻ limiting. Mass = ${f3(nI / 2)} × ${r2(mm('PbI2'))} = ${f3(g)} g. Traps: ${f3(nPb * mm('PbI2'))} g uses the excess Pb²⁺; ${f3(nI * mm('PbI2'))} g forgets 2 I⁻ per PbI₂; ${f3(nI / 2 * mm('NaNO3') * 2)} g is the mass of NaNO₃ (soluble, not a precipitate); ${f3(nI / 2 * mm('Pb(NO3)2'))} g uses the molar mass of lead(II) nitrate.`,
      ['Identify the precipitate from Table 4.1, then find the limiting ion.', 'Pb²⁺ + 2I⁻ → PbI₂(s).', `${f3(nI / 2)} mol PbI₂ × ${r2(mm('PbI2'))} g/mol.`]); }

  { const Mk = mm('KHC8H4O4'), n = 0.4512 / Mk, c = n / 0.02235;
    N(G, 6, 4, 'Exam', 'A 0.4512 g sample of potassium hydrogen phthalate (KHP, KHC₈H₄O₄, a monoprotic acid) is titrated to the equivalence point with 22.35 mL of NaOH solution. What is the molarity of the NaOH? (Enter a number in M to 4 sig figs.)',
      `${f4(c)} M`, c,
      `M(KHC₈H₄O₄) = 39.10 + 5(1.008) + 8(12.01) + 4(16.00) = ${r2(Mk)} g/mol. n(KHP) = 0.4512 ÷ ${r2(Mk)} = ${f4(n)} mol = n(NaOH) (monoprotic, 1 : 1). M = ${f4(n)} ÷ 0.02235 L = ${f4(c)} M - 4 sig figs, matching 0.4512 g and 22.35 mL.`,
      ['KHP has one acidic H, so it reacts 1 : 1 with NaOH.', 'mol KHP = g ÷ molar mass (count all 5 H).', `${f4(n)} mol ÷ 0.02235 L.`], { tol: 0.005 }); }

  { const n = 5.00 / AM.Fe, g = n * mm('FeCl3');
    M(G, 4, 3, 'Exam', 'Iron metal reacts with chlorine gas to form iron(III) chloride. What mass of iron(III) chloride forms from 5.00 g of iron with excess chlorine?',
      `${f3(g)} g`,
      [`${f3(n * mm('FeCl2'))} g`, `${f3(n * 3 / 2 * mm('FeCl3'))} g`, `${f3(5.00 + 3 * AM.Cl)} g`, `${f3(n * 2 / 3 * mm('FeCl3'))} g`],
      `Iron(III) means Fe³⁺, so the formula is FeCl₃; balanced: 2Fe + 3Cl₂ → 2FeCl₃. n(Fe) = 5.00 ÷ 55.85 = ${f4(n)} mol → FeCl₃ 1 : 1 → × ${r2(mm('FeCl3'))} = ${f3(g)} g. Traps: ${f3(n * mm('FeCl2'))} g uses FeCl₂ (iron(II)); ${f3(n * 3 / 2 * mm('FeCl3'))} and ${f3(n * 2 / 3 * mm('FeCl3'))} g borrow the Cl₂ coefficient; ${f3(5.00 + 3 * AM.Cl)} g adds the 5.00 g of Fe to 3 × 35.45 (mixing grams with molar masses).`,
      ['The Roman numeral gives the charge on iron.', 'Fe³⁺ + 3 Cl⁻ → FeCl₃; 2Fe + 3Cl₂ → 2FeCl₃.', `${f4(n)} mol × ${r2(mm('FeCl3'))}.`]); }

  { const n = 10.0 / mm('N2O4'), m = 2 * n * NA;
    M(G, 3, 3, 'Exam', 'Dinitrogen tetroxide decomposes completely to nitrogen dioxide: N₂O₄(g) → 2NO₂(g). How many molecules of NO₂ form from 10.0 g of dinitrogen tetroxide?',
      `${f3(m)} molecules`,
      [`${f3(n * NA)} molecules`, `${f3(n * NA / 2)} molecules`, `${f3(6 * n * NA)} molecules`, `${f3(2 * n)} molecules`],
      `N₂O₄: 2(14.01) + 4(16.00) = ${r2(mm('N2O4'))} g/mol. n = 10.0 ÷ ${r2(mm('N2O4'))} = ${f4(n)} mol → NO₂ = 2 × ${f4(n)} = ${f4(2 * n)} mol → × 6.022 × 10²³ = ${f3(m)}. Traps: ${f3(n * NA)} forgets the 2; ${f3(n * NA / 2)} halves instead of doubling; ${f3(6 * n * NA)} counts atoms (3 per NO₂); ${f3(2 * n)} stops at moles. (Shortcut check: 10.0 g of NO₂ is ${f4(10.0 / mm('NO2'))} mol - mass is conserved, so the same answer.)`,
      ['Name → formula first: di = 2, tetr = 4.', 'g → mol N₂O₄ → × 2 → mol NO₂ → × N_A.', `${f4(2 * n)} mol × 6.022 × 10²³.`]); }

  MF(G, 5, 4, 'Trap', '1.2 g of NaCl is dissolved in water to make 250.0 mL of solution. Reported with the correct number of significant figures, the molarity is:',
    ['0.08 M', '0.082 M', '0.0821 M', '0.08214 M', '4.8 M'], 1,
    `n = 1.2 g ÷ 58.44 g/mol = ${f4(1.2 / 58.44)} mol; M = ${f4(1.2 / 58.44)} ÷ 0.2500 L = ${f4(1.2 / 58.44 / 0.25)} M. Multiplication/division keeps the fewest sig figs: 1.2 g has 2 (58.44 has 4, 250.0 mL has 4), so 0.082 M. 0.08 M has 1 sig fig; 0.0821 and 0.08214 M keep too many; 4.8 is grams per liter.`,
    ['The arithmetic is easy - the sig figs are the question.', 'Which measurement has the fewest sig figs?', '1.2 g → 2 sig figs.']);

  { const c = 1000 * 1.19 * 0.370 / mm('HCl');
    M(G, 5, 4, 'Exam', 'Concentrated hydrochloric acid is 37.0% HCl by mass and has a density of 1.19 g/mL. What is its molarity?',
      `${f3(c)} M`,
      [`${f3(1000 * 0.370 / mm('HCl'))} M`, `${f3(1000 * 1.19 / mm('HCl'))} M`, `${f3(37.0 / mm('HCl'))} M`, `${f3(1000 / 1.19 * 0.370 / mm('HCl'))} M`],
      `Take 1.000 L = 1000 mL of solution: mass = 1000 × 1.19 = 1190 g; HCl = 0.370 × 1190 = 440.3 g; ÷ ${r2(mm('HCl'))} = ${f4(c)} mol in 1 L → ${f3(c)} M. Traps: ${f3(1000 * 0.370 / mm('HCl'))} M ignores the density; ${f3(1000 * 1.19 / mm('HCl'))} M ignores the 37.0%; ${f3(37.0 / mm('HCl'))} M treats 37.0 g as in 1 L; ${f3(1000 / 1.19 * 0.370 / mm('HCl'))} M divides by the density.`,
      ['Pick a convenient amount: 1 L of solution.', 'mass of solution = volume × density; mass HCl = 37.0% of that.', '0.370 × 1190 g ÷ 36.46 g/mol.']); }

  { const n = 2.00 * 0.250, g = n * mm('HCl'), gs = g / 0.370, V = gs / 1.19;
    N(G, 5, 4, 'Exam', 'How many mL of concentrated HCl (37.0% HCl by mass, density 1.19 g/mL) are needed to prepare 2.00 L of 0.250 M HCl? (Enter a number in mL.)',
      `${f3(V)} mL`, V,
      `n(HCl) needed = 2.00 × 0.250 = 0.500 mol × ${r2(mm('HCl'))} = ${f4(g)} g HCl. Mass of concentrated solution = ${f4(g)} ÷ 0.370 = ${f4(gs)} g. Volume = ${f4(gs)} ÷ 1.19 = ${f3(V)} mL.`,
      ['Work out the grams of pure HCl you need first.', 'Grams HCl ÷ 0.370 = grams of solution; ÷ density = mL.', `${f4(gs)} g ÷ 1.19 g/mL.`]); }

  { const avg = 0.7578 * 34.969 + 0.2422 * 36.966, n = 10.0 / avg;
    M(G, 2, 4, 'Exam', 'Chlorine has two isotopes: ³⁵Cl (34.969 amu, 75.78%) and ³⁷Cl (36.966 amu, 24.22%). How many moles of chlorine ATOMS are in 10.0 g of chlorine gas, Cl₂? (Report 4 digits to compare.)',
      `${(n).toFixed(4)} mol`,
      [`${(10.0 / ((34.969 + 36.966) / 2)).toFixed(4)} mol`, `${(10.0 / (2 * avg)).toFixed(4)} mol`, `${(10.0 / 34.969).toFixed(4)} mol`, `${(10.0 / 36.966).toFixed(4)} mol`],
      `Average atomic mass = 0.7578 × 34.969 + 0.2422 × 36.966 = ${avg.toFixed(3)} amu, so Cl atoms are ${avg.toFixed(3)} g/mol. Every Cl₂ molecule is two Cl atoms, and 10.0 g of Cl₂ is 10.0 g of Cl atoms: n = 10.0 ÷ ${avg.toFixed(3)} = ${n.toFixed(4)} mol atoms. Traps: ${(10.0 / ((34.969 + 36.966) / 2)).toFixed(4)} mol uses the simple (unweighted) average; ${(10.0 / (2 * avg)).toFixed(4)} mol is moles of Cl₂ MOLECULES; ${(10.0 / 34.969).toFixed(4)} and ${(10.0 / 36.966).toFixed(4)} mol use a single isotope.`,
      ['Weighted average first: Σ(mass × fractional abundance).', 'The question asks for atoms, not Cl₂ molecules.', `10.0 g ÷ ${avg.toFixed(3)} g/mol.`]); }

  { const n = 2.40 / AM.Mg, e = n * 10 * NA;
    M(G, 2, 4, 'Trap', 'How many electrons are in 2.40 g of Mg²⁺ ions? (The mass of the missing electrons is negligible.)',
      `${f3(e)} electrons`,
      [`${f3(n * 12 * NA)} electrons`, `${f3(n * 2 * NA)} electrons`, `${f3(n * 14 * NA)} electrons`, `${f3(n * NA)} electrons`],
      `n(Mg²⁺) = 2.40 ÷ 24.31 = ${f4(n)} mol. Mg has Z = 12; Mg²⁺ has lost 2 electrons → 10 e⁻ per ion. Electrons = ${f4(n)} × 10 × 6.022 × 10²³ = ${f3(e)}. Traps: 12 per ion uses the neutral atom; 2 per ion counts only the charge; 14 ADDS 2 for the 2+ charge; ${f3(n * NA)} counts ions.`,
      ['How many electrons does one Mg²⁺ ion have?', 'Electrons = Z − charge = 12 − 2.', `${f4(n)} mol × 10 × 6.022 × 10²³.`]); }

  { const V = Math.pow(2.00, 3), g = V * 2.70, at = g / AM.Al * NA;
    M(G, 1, 3, 'Exam', 'A cube of aluminum is 2.00 cm on each edge. The density of aluminum is 2.70 g/cm³. How many aluminum atoms does the cube contain?',
      `${f3(at)} atoms`,
      [`${f3(2.00 * 2.70 / AM.Al * NA)} atoms`, `${f3(4.00 * 2.70 / AM.Al * NA)} atoms`, `${f3(V / 2.70 / AM.Al * NA)} atoms`, `${f3(g / AM.Al)} atoms`],
      `V = (2.00 cm)³ = 8.00 cm³; m = 8.00 × 2.70 = ${f3(g)} g; n = ${f3(g)} ÷ 26.98 = ${f4(g / AM.Al)} mol; atoms = ${f3(at)}. Traps: using 2.00 cm (not cubed) or 4.00 cm² (squared) as the volume; dividing by the density; stopping at moles.`,
      ['Cube the edge length to get the volume.', 'Volume × density = mass; mass → moles → atoms.', `${f3(g)} g ÷ 26.98 × 6.022 × 10²³.`]); }

  { const n = 0.200 * 0.0385 / 2, g = n * mm('CaCO3'), p = g / 0.500 * 100;
    N(G, 6, 4, 'Exam', 'An antacid tablet with mass 0.500 g reacts with exactly 38.5 mL of 0.200 M HCl: CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g). Assuming only the CaCO₃ reacts, what is the mass percent of CaCO₃ in the tablet? (Enter a number in percent.)',
      `${p.toFixed(1)}%`, p,
      `n(HCl) = 0.200 × 0.0385 = ${f3(0.200 * 0.0385)} mol → CaCO₃ = ÷ 2 = ${f3(n)} mol → × ${r2(mm('CaCO3'))} = ${f4(g)} g. % = ${f4(g)} ÷ 0.500 × 100 = ${p.toFixed(1)}%. (Forgetting the 1 : 2 ratio gives over 100% - impossible, a built-in check.)`,
      ['mol HCl → mol CaCO₃ → g CaCO₃ → percent of the tablet.', 'CaCO₃ : HCl = 1 : 2.', `${f4(g)} g ÷ 0.500 g × 100.`]); }

  { const n = 0.5000 * 0.01420, g = n * mm('CH3COOH'), gs = 10.00 * 1.005, p = g / gs * 100;
    M(G, 6, 4, 'Exam', 'A 10.00 mL sample of vinegar (density 1.005 g/mL) needs 14.20 mL of 0.5000 M NaOH to reach the equivalence point. What is the mass percent of acetic acid (CH₃COOH) in the vinegar?',
      `${p.toFixed(2)}%`,
      [`${(n * mm('NaOH') / gs * 100).toFixed(2)}%`, `${(n / gs * 100).toFixed(3)}%`, `${(p * 2).toFixed(2)}%`, `${(g / 14.20 * 100).toFixed(2)}%`],
      `n(NaOH) = 0.5000 × 0.01420 = ${f4(n)} mol = n(CH₃COOH) (monoprotic). Mass = ${f4(n)} × ${r2(mm('CH3COOH'))} = ${f4(g)} g. Mass of vinegar = 10.00 mL × 1.005 g/mL = ${f4(gs)} g. % = ${f4(g)} ÷ ${f4(gs)} × 100 = ${p.toFixed(2)}%. Traps: ${(n * mm('NaOH') / gs * 100).toFixed(2)}% uses the molar mass of NaOH instead of acetic acid; ${(n / gs * 100).toFixed(3)}% uses moles instead of grams; ${(p * 2).toFixed(2)}% treats acetic acid as diprotic (it has 4 H but only one is acidic); the last divides by the NaOH volume.`,
      ['Titration gives moles of acid; density gives the mass of the sample.', 'Acetic acid is monoprotic: mol acid = mol NaOH.', `${f4(g)} g ÷ ${f4(gs)} g × 100.`]); }

  MF(G, 1, 3, 'Trap', 'A student weighs an empty beaker on an analytical balance (45.237 g), adds NaCl, and reweighs the beaker on a top-loading balance (47.6 g). Reported correctly, the mass of NaCl is:',
    ['2.363 g', '2.36 g', '2.4 g', '2 g', '2.3630 g'], 2,
    '47.6 − 45.237 = 2.363 on the calculator, but addition/subtraction keeps the fewest DECIMAL PLACES: 47.6 has one (tenths), so the difference is 2.4 g. 2.363 and 2.36 g claim precision the top-loader never had; 2 g drops a digit that is known; 2.3630 g invents one.',
    ['Subtraction: count decimal places, not sig figs.', '47.6 is known only to the tenths place.', 'Round 2.363 to one decimal place.']);

  { const n = 2.50 / mm('CaCl2'), c = 2 * n / 0.150;
    M(G, 5, 3, 'Exam', '2.50 × 10³ mg of CaCl₂ is dissolved in enough water to make 150. mL of solution. What is [Cl⁻]?',
      `${f3(c)} M`,
      [`${f3(c / 2)} M`, `${f3(2 * 2500 / mm('CaCl2') / 0.150)} M`, `${f3(2 * n / 150)} M`, `${f3(2 * 2.50 / mm('NaCl') / 0.150)} M`],
      `2.50 × 10³ mg = 2.50 g. n(CaCl₂) = 2.50 ÷ ${r2(mm('CaCl2'))} = ${f4(n)} mol; [CaCl₂] = ${f4(n)} ÷ 0.150 L = ${f4(n / 0.15)} M; [Cl⁻] = 2 × that = ${f3(c)} M. Traps: ${f3(c / 2)} M is [CaCl₂]; ${f3(2 * 2500 / mm('CaCl2') / 0.150)} M forgets mg → g; ${f3(2 * n / 150)} M forgets mL → L; the last uses the molar mass of NaCl.`,
      ['Two unit conversions: mg → g and mL → L.', 'Then moles of CaCl₂, molarity, and × 2 for Cl⁻.', `2 × ${f4(n)} mol ÷ 0.150 L.`]); }

  { const n = 25.0 / mm('N2O5'), g = n / 2 * 32.00;
    M(G, 4, 3, 'Exam', 'Dinitrogen pentoxide decomposes: 2N₂O₅(g) → 4NO₂(g) + O₂(g). What mass of oxygen gas forms from 25.0 g of dinitrogen pentoxide?',
      `${f3(g)} g`,
      [`${f3(n * 32.00)} g`, `${f3(n / 2 * 16.00)} g`, `${f3(25.0 / mm('N2O4') / 2 * 32.00)} g`, `${f3(25.0 / 2)} g`],
      `N₂O₅: 2(14.01) + 5(16.00) = ${r2(mm('N2O5'))} g/mol. n = 25.0 ÷ ${r2(mm('N2O5'))} = ${f4(n)} mol → O₂ = ½ × ${f4(n)} = ${f4(n / 2)} mol → × 32.00 = ${f3(g)} g. Traps: ${f3(n * 32.00)} g forgets the 1 : 2; ${f3(n / 2 * 16.00)} g uses O atoms (16.00) for oxygen gas; ${f3(25.0 / mm('N2O4') / 2 * 32.00)} g uses N₂O₄ (tetroxide); ${f3(25.0 / 2)} g halves the grams.`,
      ['Penta = 5; oxygen gas = O₂.', 'Ratio O₂ : N₂O₅ = 1 : 2.', `${f4(n / 2)} mol × 32.00.`]); }

  { const nCa = 0.150 * 0.0300, n = nCa / 3, g = n * mm('Ca3(PO4)2');
    M(G, 6, 4, 'Exam', '30.0 mL of 0.150 M calcium nitrate is mixed with excess sodium phosphate solution. What mass of precipitate forms?',
      `${f3(g)} g`,
      [`${f3(nCa * mm('Ca3(PO4)2'))} g`, `${f3(nCa * mm('Ca3(PO4)2') / 2)} g`, `${f3(2 * nCa * mm('NaNO3'))} g`, `${f3(nCa / 3 * mm('Ca(NO3)2'))} g`],
      `3Ca(NO₃)₂(aq) + 2Na₃PO₄(aq) → Ca₃(PO₄)₂(s) + 6NaNO₃(aq). Calcium phosphate is insoluble (phosphates are insoluble except Group 1/NH₄⁺). n(Ca²⁺) = 0.150 × 0.0300 = ${f3(nCa)} mol → Ca₃(PO₄)₂ = ÷ 3 = ${f3(n)} mol. M(Ca₃(PO₄)₂) = 3(40.08) + 2(30.97 + 64.00) = ${r2(mm('Ca3(PO4)2'))} g/mol → ${f3(g)} g. Traps: ${f3(nCa * mm('Ca3(PO4)2'))} g forgets the 3 Ca per formula unit; ${f3(nCa * mm('Ca3(PO4)2') / 2)} g divides by 2 (the phosphate coefficient) instead of 3; ${f3(2 * nCa * mm('NaNO3'))} g is the mass of NaNO₃ formed (it stays dissolved); ${f3(nCa / 3 * mm('Ca(NO3)2'))} g uses calcium nitrate’s molar mass.`,
      ['Which product is insoluble, and what is its formula?', 'Ca²⁺ and PO₄³⁻ → Ca₃(PO₄)₂; 3 Ca per unit.', `${f3(n)} mol × ${r2(mm('Ca3(PO4)2'))}.`]); }

  { const n = 0.150 * 0.0205, Mx = 0.500 / n;
    N(G, 6, 4, 'Exam', 'A 0.500 g sample of an unknown monoprotic acid needs 20.5 mL of 0.150 M NaOH to reach the equivalence point. What is the molar mass of the acid? (Enter a number in g/mol.)',
      `${f3(Mx)} g/mol`, Mx,
      `n(NaOH) = 0.150 × 0.0205 = ${f4(n)} mol = n(acid) (monoprotic, 1 : 1). Molar mass = 0.500 g ÷ ${f4(n)} mol = ${f3(Mx)} g/mol.`,
      ['Molar mass = grams ÷ moles. You have grams; find moles.', 'Titration: mol acid = mol NaOH.', `0.500 ÷ ${f4(n)}.`]); }

  { const g = 3.785 * 1000 * 0.703, n = g / mm('C8H18'), co2 = n * 8 * mm('CO2') / 1000;
    M(G, 4, 4, 'Exam', 'A car burns 1.00 gal of octane (C₈H₁₈; 1 gal = 3.785 L; density 0.703 g/mL): 2C₈H₁₈ + 25O₂ → 16CO₂ + 18H₂O. What mass of CO₂ is released?',
      `${f3(co2)} kg`,
      [`${f3(n * mm('CO2') / 1000)} kg`, `${f3(2 * co2)} kg`, `${f3(3785 / mm('C8H18') * 8 * mm('CO2') / 1000)} kg`, `${f3(g / 1000)} kg`],
      `Mass of octane = 3785 mL × 0.703 g/mL = ${f4(g)} g → ÷ ${r2(mm('C8H18'))} = ${f4(n)} mol. CO₂ : C₈H₁₈ = 16 : 2 = 8 → ${f4(8 * n)} mol × 44.01 = ${f4(co2 * 1000)} g = ${f3(co2)} kg. Traps: ${f3(n * mm('CO2') / 1000)} kg forgets the 8; ${f3(2 * co2)} kg uses 16 : 1; ${f3(3785 / mm('C8H18') * 8 * mm('CO2') / 1000)} kg skips the density (treats mL as g); ${f3(g / 1000)} kg is the mass of the octane itself. (Yes - burning fuel releases about three times its own mass of CO₂, because the O comes from the air.)`,
      ['gal → L → mL → g (density) → mol.', 'Each octane gives 8 CO₂.', `${f4(8 * n)} mol × 44.01 g/mol, then g → kg.`]); }

  { const n = 0.100 * 0.0250, g = n * mm('BaSO4');
    M(G, 6, 3, 'Exam', '25.0 mL of 0.100 M Ba(OH)₂ is mixed with 25.0 mL of 0.100 M H₂SO₄. What mass of BaSO₄ precipitates?',
      `${f3(g)} g`,
      [`${f3(2 * g)} g`, `${f3(g / 2)} g`, `${f3(n * mm('Ba(OH)2'))} g`, `${f3(n * mm('BaSO4') * 1000)} g`],
      `Ba(OH)₂ + H₂SO₄ → BaSO₄(s) + 2H₂O(l). n(Ba²⁺) = 0.100 × 0.0250 = ${f3(n)} mol; n(SO₄²⁻) = ${f3(n)} mol - exact 1 : 1, so ${f3(n)} mol BaSO₄ × ${r2(mm('BaSO4'))} = ${f3(g)} g. Traps: doubling or halving applies the H₂O / OH⁻ coefficients to BaSO₄; ${f3(n * mm('Ba(OH)2'))} g uses the molar mass of Ba(OH)₂; ${f3(n * mm('BaSO4') * 1000)} g forgets mL → L.`,
      ['Write the molecular equation first.', 'Ba²⁺ + SO₄²⁻ → BaSO₄ is 1 : 1; the reagents are in equal moles.', `${f3(n)} mol × ${r2(mm('BaSO4'))}.`]); }

  { const n = 1.00 / mm('H2O'), m = n * NA;
    M(G, 1, 3, 'Exam', 'How many water molecules are in 1.00 mL of liquid water (density 1.00 g/mL)?',
      `${f3(m)} molecules`,
      [`${f3(3 * m)} molecules`, `${f3(NA)} molecules`, `${f3(1000 * m)} molecules`, `${f3(mm('H2O') * NA)} molecules`],
      `1.00 mL × 1.00 g/mL = 1.00 g; ÷ 18.02 g/mol = ${f4(n)} mol; × 6.022 × 10²³ = ${f3(m)} molecules. Traps: ${f3(3 * m)} counts atoms; ${f3(NA)} assumes 1 g = 1 mol; ${f3(1000 * m)} treats 1.00 mL as 1.00 L; the last multiplies by the molar mass.`,
      ['Volume → mass with density.', 'mass → moles → molecules.', `${f4(n)} mol × 6.022 × 10²³.`]); }

  { const g = 25.0 * 6 * 16.00 / mm('Ca(NO3)2');
    N(G, 3, 3, 'Exam', 'What mass of oxygen is contained in 25.0 g of calcium nitrate? (Enter a number in grams.)',
      `${f3(g)} g`, g,
      `Calcium nitrate = Ca(NO₃)₂ (Ca²⁺, two NO₃⁻), ${r2(mm('Ca(NO3)2'))} g/mol, containing 6 O = 96.00 g per mole. Mass of O = 25.0 × 96.00 / ${r2(mm('Ca(NO3)2'))} = ${f3(g)} g. (Using 3 O gives half; using CaNO₃ gives a wrong molar mass.)`,
      ['Write the formula from the name; count the O atoms.', 'Ca(NO₃)₂ has 2 × 3 = 6 O.', `25.0 × 96.00 ÷ ${r2(mm('Ca(NO3)2'))}.`]); }

  MF(G, 5, 4, 'Trap', '25.0 mL of 2.00 M NaOH is mixed with 75.0 mL of water. What is the new concentration of NaOH?',
    ['0.500 M', '0.667 M', '1.50 M', '6.00 M', '0.0500 M'], 0,
    'Mixing WITH 75.0 mL of water gives a final volume of 25.0 + 75.0 = 100.0 mL. M₂ = 2.00 × 25.0 ÷ 100.0 = 0.500 M. 0.667 M treats 75.0 mL as the final volume ("diluted TO 75.0 mL"); 6.00 M inverts the volumes; 1.50 M subtracts; 0.0500 M slips a decimal.',
    ['Read carefully: "mixed with" or "diluted to"?', 'Final volume = 25.0 + 75.0 mL.', '2.00 × 25.0 ÷ 100.0.']);

  { const nNO = 10.0 / mm('NO'), nO = 10.0 / 32.00, used = nNO / 2, left = (nO - used) * 32.00;
    if (!(used < nO)) throw new Error('91 NO');
    M(G, 4, 4, 'Exam', '2NO(g) + O₂(g) → 2NO₂(g). 10.0 g of NO reacts with 10.0 g of O₂. What mass of the excess reactant remains?',
      `${f3(left)} g of O₂`,
      [`${f3(used * 32.00)} g of O₂`, '0 g - neither is in excess', `${f3((nNO - nO) * mm('NO'))} g of NO`, `${f3((nO - nNO / 2) * mm('NO'))} g of O₂`],
      `n(NO) = 10.0 ÷ 30.01 = ${f4(nNO)} mol; n(O₂) = 10.0 ÷ 32.00 = ${f4(nO)} mol. NO needs ½ × ${f4(nNO)} = ${f4(used)} mol O₂ (less than available), so NO is limiting and O₂ is in excess. O₂ left = (${f4(nO)} − ${f4(used)}) × 32.00 = ${f3(left)} g. Traps: ${f3(used * 32.00)} g is the O₂ USED; "0 g" assumes equal masses react exactly; ${f3((nNO - nO) * mm('NO'))} g of NO compares moles 1 : 1 and calls NO the excess; the last uses NO’s molar mass for the leftover O₂.`,
      ['Equal masses again - convert to moles.', 'NO needs half its moles in O₂.', `(${f4(nO)} − ${f4(used)}) mol × 32.00.`]); }

  { const nN = 26.0 / mm('N2'), nH = 4.00 / mm('H2'), pN = 2 * nN, pH = nH * 2 / 3, th = Math.min(pN, pH) * mm('NH3'), pct = 18.5 / th * 100;
    if (!(pH < pN)) throw new Error('91 NH3');
    N(G, 4, 4, 'Exam', 'N₂(g) + 3H₂(g) → 2NH₃(g). 26.0 g of N₂ reacts with 4.00 g of H₂, and 18.5 g of NH₃ is obtained. What is the percent yield? (Enter a number in percent.)',
      `${pct.toFixed(1)}%`, pct,
      `N₂: 26.0 ÷ 28.02 = ${f4(nN)} mol → ${f4(pN)} mol NH₃. H₂: 4.00 ÷ 2.016 = ${f4(nH)} mol → × 2/3 = ${f4(pH)} mol NH₃. H₂ is limiting (the smaller mass this time, but you must check). Theoretical = ${f4(pH)} × ${r2(mm('NH3'))} = ${f4(th)} g. % yield = 18.5 ÷ ${f4(th)} × 100 = ${pct.toFixed(1)}%. (Using N₂ gives ${(18.5 / (pN * mm('NH3')) * 100).toFixed(1)}%.)`,
      ['Limiting reactant first; theoretical yield from it.', 'mol NH₃ from each: N₂ × 2, H₂ × 2/3.', `18.5 ÷ ${f4(th)} × 100.`]); }

  { const Mx = mm('(NH4)3PO4');
    M(G, 3, 3, 'Exam', 'What is the molar mass of ammonium phosphate?',
      `${r2(Mx)} g/mol`,
      [`${r2(mm('NH4PO4'))} g/mol`, `${r2(mm('(NH4)2PO4'))} g/mol`, `${r2(mm('(NH4)3PO3'))} g/mol`, `${r2(mm('H3PO4'))} g/mol`],
      `Ammonium = NH₄⁺, phosphate = PO₄³⁻ → three NH₄⁺ balance one PO₄³⁻: (NH₄)₃PO₄ = 3(14.01 + 4 × 1.008) + 30.97 + 4(16.00) = ${r2(Mx)} g/mol. Traps: NH₄PO₄ and (NH₄)₂PO₄ ignore the 3− charge; (NH₄)₃PO₃ is ammonium phosphITE; H₃PO₄ is phosphoric acid.`,
      ['Get the formula from the ion charges first.', 'NH₄⁺ and PO₄³⁻ → 3 : 1.', '(NH₄)₃PO₄: 3 N, 12 H, 1 P, 4 O.']); }

  { const s = [['H2O', 'H₂O', 18.0, 3], ['C', 'C', 12.0, 1], ['H2', 'H₂', 1.00, 2], ['Ne', 'Ne', 20.0, 1], ['O2', 'O₂', 32.0, 2]];
    const at = s.map(([f, n, g, k]) => [n, g, g / mm(f) * k]);
    if (!(at[0][2] > Math.max(...at.slice(1).map(x => x[2])))) throw new Error('91 atoms');
    M(G, 3, 4, 'Trap', 'Which sample contains the greatest number of ATOMS?',
      '18.0 g of H₂O', ['12.0 g of C', '1.00 g of H₂', '20.0 g of Ne', '32.0 g of O₂'],
      `Moles of atoms = (g ÷ molar mass) × atoms per formula: ${at.map(([n, g, a]) => g.toFixed(g < 10 ? 2 : 1) + ' g ' + n + ' → ' + a.toFixed(3) + ' mol atoms').join('; ')}. Water wins: 1 mol of molecules × 3 atoms. 32.0 g O₂ is 1 mol of molecules but only 2 mol of atoms; the others are about 1 mol of atoms each.`,
      ['Convert each to moles of the substance, then to moles of atoms.', 'Multiply by the number of atoms in each formula.', 'About 1 mol H₂O × 3 atoms.']); }

  { const nAg = 2.583 / mm('AgCl'), nM = nAg / 2, Mx = 1.000 / nM, metal = Mx - 2 * AM.Cl;
    M(G, 6, 4, 'Exam', 'A 1.000 g sample of a metal chloride MCl₂ is dissolved, and excess AgNO₃(aq) precipitates 2.583 g of AgCl. What is the metal M?',
      'Ca', ['Mg', 'Sr', 'Ba', 'Fe'],
      `n(AgCl) = 2.583 ÷ ${r2(mm('AgCl'))} = ${f4(nAg)} mol = mol Cl⁻. Each MCl₂ has 2 Cl⁻, so n(MCl₂) = ${f4(nM)} mol. Molar mass of MCl₂ = 1.000 ÷ ${f4(nM)} = ${f4(Mx)} g/mol; M = ${f4(Mx)} − 2(35.45) = ${f4(metal)} g/mol → calcium (40.08). Forgetting the 2 Cl per MCl₂ gives a molar mass near 55.5 and the wrong metal (MgCl₂ is 95.21, SrCl₂ 158.52, BaCl₂ 208.23, FeCl₂ 126.75 g/mol).`,
      ['mol AgCl = mol Cl⁻.', 'mol MCl₂ = mol Cl⁻ ÷ 2; then molar mass = g ÷ mol.', `Subtract 2 × 35.45 from ${f4(Mx)}.`]); }

  { const hyd = mm('CuSO4') + 5 * mm('H2O'), n = 3.000 / hyd, c1 = n / 0.2500, c2 = c1 * 10.00 / 100.0;
    M(G, 5, 4, 'Trap', '3.000 g of CuSO₄·5H₂O is dissolved to make 250.0 mL of solution. Then 10.00 mL of that solution is diluted to 100.0 mL. What is [Cu²⁺] in the final solution?',
      `${f4(c2)} M`,
      [`${f4(3.000 / mm('CuSO4') / 0.2500 * 0.1)} M`, `${f4(c1)} M`, `${f4(c2 / 10)} M`, `${f4(c1 * 10.00 / 110.0)} M`],
      `M(CuSO₄·5H₂O) = 159.61 + 5(18.016) = ${r2(hyd)} g/mol - the waters are part of what you weighed. n = 3.000 ÷ ${r2(hyd)} = ${f4(n)} mol; ÷ 0.2500 L = ${f4(c1)} M. Dilution: ${f4(c1)} × 10.00/100.0 = ${f4(c2)} M. Traps: ${f4(3.000 / mm('CuSO4') / 0.2500 * 0.1)} M uses anhydrous CuSO₄ (159.61); ${f4(c1)} M skips the dilution; ${f4(c2 / 10)} M dilutes twice; ${f4(c1 * 10.00 / 110.0)} M adds 100.0 mL of water instead of diluting TO 100.0 mL.`,
      ['The hydrate’s molar mass includes the 5 H₂O.', 'Molarity of the stock, then M₁V₁ = M₂V₂.', `${f4(c1)} M × 10.00/100.0.`]); }

  MF(G, 6, 3, 'Trap', '20.00 mL of HCl is titrated with 18.5 mL of 0.1000 M NaOH. Reported with correct significant figures, [HCl] is:',
    ['0.09250 M', '0.0925 M', '0.093 M', '0.108 M', '0.1081 M'], 1,
    `n(NaOH) = 0.1000 × 0.0185 = 1.85 × 10⁻³ mol = n(HCl); [HCl] = 1.85 × 10⁻³ ÷ 0.02000 = 0.0925 M. The least precise measurement is 18.5 mL (3 sig figs), so 0.0925 M. 0.09250 M has 4 sig figs; 0.093 M has 2; 0.108 and 0.1081 M divide the volumes the wrong way (0.1000 × 20.00/18.5).`,
    ['mol acid = mol base for HCl + NaOH.', 'Which value limits the sig figs?', '18.5 mL has 3 sig figs.']);

  { const Mx = mm('Fe2(SO4)3'), n = 10.0 / Mx;
    M(G, 2, 4, 'Exam', 'How many moles of IONS are released when 10.0 g of iron(III) sulfate dissolves completely in water?',
      `${f3(5 * n)} mol`,
      [`${f3(n)} mol`, `${f3(2 * 10.0 / mm('FeSO4'))} mol`, `${f3(17 * n)} mol`, `${f3(2 * n)} mol`],
      `Iron(III) = Fe³⁺, sulfate = SO₄²⁻ → Fe₂(SO₄)₃ (2 × 3+ = 3 × 2−). M = 2(55.85) + 3(32.06 + 64.00) = ${r2(Mx)} g/mol. n = 10.0 ÷ ${r2(Mx)} = ${f4(n)} mol. Fe₂(SO₄)₃ → 2Fe³⁺ + 3SO₄²⁻: 5 ions per unit → ${f3(5 * n)} mol ions. Traps: ${f3(n)} mol counts formula units; ${f3(2 * 10.0 / mm('FeSO4'))} mol uses FeSO₄ (iron(II)); ${f3(17 * n)} mol counts every atom (sulfate stays whole!); ${f3(2 * n)} mol counts only Fe³⁺.`,
      ['Name → formula from the charges; polyatomic ions stay whole in water.', '2 Fe³⁺ + 3 SO₄²⁻ = 5 ions per unit.', `5 × ${f4(n)} mol.`]); }

  M(G, 6, 3, 'Exam', 'Which statement about aqueous reactions is FALSE?',
    'In a net ionic equation, a weak acid such as HF is written as H⁺ and F⁻.',
    ['In a net ionic equation, insoluble solids are written as formula units, not ions.', 'When a strong acid reacts with a strong base and the salt formed is soluble, the net ionic equation is H⁺(aq) + OH⁻(aq) → H₂O(l).', 'Spectator ions appear unchanged on both sides of the total ionic equation.', 'H₂SO₄ is a strong, diprotic acid.'],
    'Weak acids are mostly un-ionized, so they are written as molecules (HF(aq)) in ionic and net ionic equations - that statement is false. The other four are true: solids stay as formula units; strong acid + strong base with a soluble salt nets to H⁺ + OH⁻ → H₂O (with an insoluble salt such as BaSO₄ from H₂SO₄ + Ba(OH)₂, the precipitate also appears in the net equation - which is why that statement names a soluble salt); spectators are unchanged; and H₂SO₄ is strong and diprotic.',
    ['Look for the statement about how a weak electrolyte is written.', 'Weak acids are mostly molecules in solution.', 'HF stays as HF.']);

  M(G, 4, 3, 'Exam', 'A container holds 6 molecules of NO and 5 molecules of O₂, which react by 2NO + O₂ → 2NO₂ as completely as possible. What does the container hold afterwards?',
    '6 NO₂ and 2 O₂',
    ['6 NO₂ and no leftover', '10 NO₂ and 1 NO', '5 NO₂ and 1 NO', '6 NO₂ and 5 O₂'],
    '6 NO need 3 O₂ and make 6 NO₂; 5 − 3 = 2 O₂ are left. 10 NO₂ would need 10 NO; 5 NO₂ uses a 1 : 1 ratio; leaving all 5 O₂ forgets that O₂ is consumed.',
    ['Which reactant runs out first?', '6 NO use half as many O₂.', '3 O₂ used; 2 left.']);

  { const c = 1.00 * 10.0 / 100.0, n = c * 0.0250, g = n * mm('AgCl');
    M(G, 5, 4, 'Exam', '10.0 mL of 1.00 M AgNO₃ is diluted to 100.0 mL. Then 25.0 mL of the diluted solution reacts with excess NaCl(aq). What mass of AgCl forms?',
      `${f3(g)} g`,
      [`${f3(1.00 * 0.0250 * mm('AgCl'))} g`, `${f3(1.00 * 0.0100 * mm('AgCl'))} g`, `${f3(n * mm('AgNO3'))} g`, `${f3(g / 10)} g`],
      `Diluted: 1.00 × 10.0/100.0 = ${f3(c)} M. 25.0 mL of it: ${f3(c)} × 0.0250 = ${f3(n)} mol Ag⁺ → ${f3(n)} mol AgCl × ${r2(mm('AgCl'))} = ${f3(g)} g. Traps: ${f3(1.00 * 0.0250 * mm('AgCl'))} g uses the undiluted 1.00 M; ${f3(1.00 * 0.0100 * mm('AgCl'))} g uses all the silver from the original 10.0 mL (but only a quarter of the diluted solution reacts); ${f3(n * mm('AgNO3'))} g uses AgNO₃’s molar mass; the last is a power-of-ten slip.`,
      ['Find the diluted concentration first.', 'Only 25.0 of the 100.0 mL reacts.', `${f3(n)} mol AgCl × ${r2(mm('AgCl'))}.`]); }

  { const list = [['CO2', 'CO₂', 2], ['H2O', 'H₂O', 1], ['N2O5', 'N₂O₅', 5], ['SO3', 'SO₃', 3], ['Fe2O3', 'Fe₂O₃', 3]];
    const v = list.map(([f, n, k]) => [n, 10.0 * k * 16.00 / mm(f)]);
    if (!(v[1][1] > Math.max(v[0][1], v[2][1], v[3][1], v[4][1]))) throw new Error('91 O mass');
    M(G, 3, 4, 'Trap', 'You have 10.0 g of each compound. Which sample contains the greatest MASS of oxygen?',
      'H₂O', ['CO₂', 'N₂O₅', 'SO₃', 'Fe₂O₃'],
      `Mass of O = 10.0 g × mass fraction of O: ${v.map(([n, g]) => n + ' ' + g.toFixed(2) + ' g').join('; ')}. Water wins because almost all of its small molar mass is oxygen (88.8%). N₂O₅ has the most O atoms per molecule, but per GRAM it has less - the trap.`,
      ['Equal masses: compare mass PERCENT of oxygen.', '%O = (n × 16.00) ÷ molar mass.', 'H₂O is 88.8% O by mass.']); }

  { const nH = 0.200 * 0.0250, nOH = 0.250 * 0.0150, c = (nH - nOH) / 0.0400;
    M(G, 6, 4, 'Exam', '25.0 mL of 0.200 M HCl is mixed with 15.0 mL of 0.250 M NaOH. After neutralization, which ion is in excess and what is its concentration?',
      `H⁺, ${f3(c)} M`,
      [`H⁺, ${f3((nH - nOH) / 0.0250)} M`, `OH⁻, ${f3(c)} M`, `H⁺, ${f3(nH - nOH)} M`, 'Neither - the acid and base exactly neutralize each other'],
      `n(H⁺) = 0.200 × 0.0250 = ${f3(nH)} mol; n(OH⁻) = 0.250 × 0.0150 = ${f3(nOH)} mol. They react 1 : 1, leaving ${f3(nH - nOH)} mol H⁺ in excess, in 25.0 + 15.0 = 40.0 mL. [H⁺] = ${f3(nH - nOH)} ÷ 0.0400 = ${f3(c)} M. Traps: dividing by only the acid volume; calling OH⁻ the excess (it has the higher molarity but fewer moles); reporting moles as M; assuming exact neutralization without comparing moles.`,
      ['Compare MOLES of H⁺ and OH⁻, not molarities.', 'Excess moles ÷ total volume.', `${f3(nH - nOH)} mol ÷ 0.0400 L.`]); }

  { const L = 2.50e-4, n = L * 0.200, mg = n * mm('NaCl') * 1000;
    M(G, 5, 4, 'Trap', 'How many milligrams of NaCl are in 2.50 × 10² μL of 0.200 M NaCl?',
      `${f3(mg)} mg`,
      [`${f3(mg / 1000)} mg`, `${f3(mg * 1000)} mg`, `${f3(250 * 0.200 * mm('NaCl') * 1000)} mg`, `${f3(n * 1e3)} mg`],
      `2.50 × 10² μL = 250 μL = 0.250 mL = 2.50 × 10⁻⁴ L. n = 2.50 × 10⁻⁴ × 0.200 = ${fmt(n, 3)} mol × 58.44 g/mol = ${fmt(n * mm('NaCl'), 3)} g = ${f3(mg)} mg. Traps: ${f3(mg / 1000)} mg leaves the answer in grams; ${f3(mg * 1000)} mg converts μL as if it were mL; ${f3(250 * 0.200 * mm('NaCl') * 1000)} mg treats 250 μL as 250 L; ${f3(n * 1e3)} mg reports mmol as mg.`,
      ['1 μL = 10⁻⁶ L.', 'Moles = M × V(L); grams = mol × 58.44; then g → mg.', `${fmt(n, 3)} mol × 58.44 × 1000.`]); }

  { const n = 64.1 / mm('SO2'), m = n * 0.900 * 0.950, g = m * mm('H2SO4');
    M(G, 4, 4, 'Exam', 'Sulfuric acid is made in two steps: 2SO₂ + O₂ → 2SO₃ (90.0% yield), then SO₃ + H₂O → H₂SO₄ (95.0% yield). What mass of H₂SO₄ is obtained from 64.1 g of SO₂?',
      `${f3(g)} g`,
      [`${f3(n * mm('H2SO4'))} g`, `${f3(n * 0.900 * mm('H2SO4'))} g`, `${f3(n * (0.900 + 0.950) / 2 * mm('H2SO4'))} g`, `${f3(64.1 * 0.900 * 0.950)} g`],
      `n(SO₂) = 64.1 ÷ ${r2(mm('SO2'))} = ${f4(n)} mol → SO₃ (1 : 1) at 90.0%: ${f4(n * 0.9)} mol → H₂SO₄ (1 : 1) at 95.0%: ${f4(m)} mol × ${r2(mm('H2SO4'))} = ${f3(g)} g. Traps: ${f3(n * mm('H2SO4'))} g ignores both yields; ${f3(n * 0.900 * mm('H2SO4'))} g uses only the first; averaging the yields; ${f3(64.1 * 0.900 * 0.950)} g applies the yields to grams of SO₂.`,
      ['Each step only gets what the previous step actually made.', 'Overall yield = 0.900 × 0.950; both steps are 1 : 1.', `${f4(m)} mol × ${r2(mm('H2SO4'))}.`]); }

  { const Mx = mm('Al2(SO4)3'), g = 5.00 / Mx * 3 * mm('SO4');
    M(G, 3, 4, 'Exam', 'What mass of sulfate ions, SO₄²⁻, is present in 5.00 g of aluminum sulfate?',
      `${f3(g)} g`,
      [`${f3(5.00 / Mx * mm('SO4'))} g`, `${f3(5.00 / mm('AlSO4') * mm('SO4'))} g`, `${f3(5.00 / Mx * 3 * mm('SO3'))} g`, `${f3(5.00 / Mx * 3)} g`],
      `Al³⁺ and SO₄²⁻ → Al₂(SO₄)₃, ${r2(Mx)} g/mol. n = 5.00 ÷ ${r2(Mx)} = ${f4(5 / Mx)} mol → SO₄²⁻ = 3 × that = ${f4(15 / Mx)} mol × 96.06 g/mol = ${f3(g)} g. Traps: one sulfate per unit; the formula AlSO₄ (charges not balanced); using sulfite SO₃²⁻ (80.06 g/mol) instead of sulfate; stopping at moles.`,
      ['Formula from charges: Al³⁺, SO₄²⁻.', 'Three sulfate ions (96.06 g/mol each) per Al₂(SO₄)₃.', `${f4(15 / Mx)} mol × 96.06.`]); }

  M(G, 6, 3, 'Exam', 'Molecular scene in words: after 100 formula units of an acid HX dissolve in water, the solution contains 100 H₃O⁺ ions, 100 X⁻ ions and no HX molecules. Which acid could HX be?',
    'HBr', ['HF', 'CH₃COOH', 'HNO₂', 'H₃PO₄'],
    'Every HX ionized, so HX is a strong acid, and it is monoprotic (one H₃O⁺ per HX). Of the choices only HBr is on the list of six strong acids. HF, acetic acid and nitrous acid are weak (most would stay as HX molecules); H₃PO₄ is weak and triprotic.',
    ['Complete ionization means what kind of acid?', 'Which choice is one of the six strong acids?', 'HCl, HBr, HI, HNO₃, H₂SO₄, HClO₄.']);

  { const g = 1000 * 0.650 * 2 * AM.Fe / mm('Fe2O3');
    N(G, 3, 4, 'Exam', 'An iron ore is 65.0% Fe₂O₃ by mass (the rest contains no iron). What mass of iron is in 1.00 kg of ore? (Enter a number in grams.)',
      `${f3(g)} g`, g,
      `Fe₂O₃ in the ore = 0.650 × 1000 g = 650. g. Mass fraction of Fe in Fe₂O₃ = 2(55.85) ÷ ${r2(mm('Fe2O3'))} = ${f4(2 * AM.Fe / mm('Fe2O3'))}. Fe = 650. × ${f4(2 * AM.Fe / mm('Fe2O3'))} = ${f3(g)} g. (Forgetting the 2 Fe gives half; forgetting the 65.0% gives ${f3(g / 0.65)} g.)`,
      ['Two fractions multiply: ore → Fe₂O₃ → Fe.', 'Fe fraction of Fe₂O₃ = 111.70 / 159.70.', `1000 × 0.650 × 0.6994.`]); }

  { const nMg = 2 * 0.150 * 0.0250, nNa = 0.200 * 0.0750, c = (nMg + nNa) / 0.1000;
    M(G, 5, 4, 'Exam', '25.0 mL of 0.150 M MgCl₂ is mixed with 75.0 mL of 0.200 M NaCl. What is [Cl⁻] in the mixture?',
      `${f3(c)} M`,
      [`${f3((nMg / 2 + nNa) / 0.1000)} M`, `${f3(2 * 0.150 + 0.200)} M`, `${f3((nMg + nNa) / 0.0750)} M`, `${f3((0.150 + 0.200) / 2)} M`],
      `Cl⁻ from MgCl₂: 2 × 0.150 × 0.0250 = ${f3(nMg)} mol; from NaCl: 0.200 × 0.0750 = ${f3(nNa)} mol. Total ${f3(nMg + nNa)} mol in 25.0 + 75.0 = 100.0 mL = 0.1000 L → ${f3(c)} M. Traps: ${f3((nMg / 2 + nNa) / 0.1000)} M forgets 2 Cl⁻ per MgCl₂; ${f3(2 * 0.150 + 0.200)} M adds concentrations; ${f3((nMg + nNa) / 0.0750)} M ignores the MgCl₂ volume; ${f3((0.150 + 0.200) / 2)} M averages the salt molarities.`,
      ['Add moles of Cl⁻ from each source.', 'MgCl₂ gives 2 Cl⁻; total volume 100.0 mL.', `${f3(nMg + nNa)} mol ÷ 0.1000 L.`]); }
}



/* ---------------- write ---------------- */
const header = `/* GENERATED by tools/chem/gen-fundamentals-b.cjs - edit the generator, not this file.

   Periodic Coast question bank, part "fundamentals-b":
   - Gym 3, The Mole and Stoichiometry (Silberberg 3.1, 3.3-3.4; lessons 3-4): Avogadro's number,
     molar mass, mass/moles/particles, atoms within a compound, mass percent and mass of an element,
     a few tier-4 bonus items from 3.2 (empirical/molecular formula, combustion analysis), balancing,
     equations from words, mole ratios, mass-mass stoichiometry, limiting reactant (by moles of
     product, with smaller-mass and fewer-moles traps), theoretical/actual/percent yield, excess left,
     reactions in sequence, hydrocarbon combustion, molecular scenes described in words. Week 3
     recitation worksheet items 1-7 reproduced part by part, plus variations.
   - Gym 4, Solutions and Aqueous Reactions (Silberberg 4.1-4.3; lessons 5-6): solute/solvent
     (course definitions), electrolytes, molarity, mass of solute, ion concentrations and moles of
     ions, dilution (the Lecture 5 slide examples), the course's Table 4.1 (Ag2SO4 counted insoluble,
     as the course table says), molecular/total ionic/net ionic equations and spectators, the six
     strong acids, mono/di/triprotic, strong bases, weak-acid net ionic equations, hydronium,
     titration, solution stoichiometry with limiting reactants, the H2O2 slide question. Week 4
     recitation worksheet items 1-8 reproduced part by part, plus variations.
   - Chapter 91, Exam 1 review: five-choice multi-step problems mixing Ch 1-4.

   Every numeric answer and distractor is computed in the generator from the course atomic masses
   (N_A = 6.022 × 10²³); the generator refuses duplicate choices and distractors within 0.5 % of a key,
   and checks every "balanced" equation atom by atom. */
`;
const sections = { 3: 'Gym 3 · The mole and stoichiometry', 4: 'Gym 4 · Solutions and aqueous reactions', 91: 'Chapter 91 · Exam 1 review' };
let out = header + 'chemAddQuestions([\n';
[3, 4, 91].forEach(ch => {
  if (!OUT[ch].length) return;
  out += '/* ---------------- ' + sections[ch] + ' ---------------- */\n';
  OUT[ch].forEach(r => { out += JSON.stringify(r) + ',\n'; });
});
out += ']);\n';
const target = path.join(__dirname, '..', '..', 'js', 'data', 'chem', 'chem-q-fundamentals-b.js');
fs.writeFileSync(target, out);
const stat = ch => { const t = [0, 0, 0, 0, 0]; let num = 0; OUT[ch].forEach(r => { t[r[3]]++; if (r[5] === 'num') num++; }); return `ch ${ch}: ${OUT[ch].length} (t1 ${t[1]}, t2 ${t[2]}, t3 ${t[3]}, t4 ${t[4]}; num ${num})`; };
console.log([3, 4, 91].map(stat).join('\n'));
console.log('wrote ' + target);
