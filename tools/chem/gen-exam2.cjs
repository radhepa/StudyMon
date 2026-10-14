/* Generator for js/data/chem/chem-q-exam2.js - Chapter 92, the Evening Exam 2 review set
   (Thermochemistry Ch 6, Quantum Theory Ch 7, Electron Configuration & Periodicity Ch 8).

     node tools/chem/gen-exam2.cjs

   Every number that appears in a stem, a choice or an explanation is computed here from the
   course constants, so the key and the distractors cannot drift apart. Each distractor is the
   result of one named mistake, computed the same way. The answer position of every
   five-choice question is assigned by a balanced, seeded shuffle. */
'use strict';
const fs = require('fs');
const path = require('path');

/* ---------- constants (the course data sheet) ---------- */
const h = 6.626e-34, c = 2.998e8, NA = 6.022e23, hc = h * c;
const RH = 2.18e-18;      // Bohr constant used in the course notes
const RHW = 2.179e-18;    // value used on the Week 7 recitation worksheet
const me = 9.109e-31;     // electron mass from the data sheet
const cw = 4.184;
const A = { H: 1.008, C: 12.01, N: 14.01, O: 16.00, Na: 22.99, Mg: 24.31, Al: 26.98, S: 32.06, Fe: 55.85 };

/* ---------- formatting ---------- */
const SUPD = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
const sup = n => String(n).split('').map(ch => SUPD[ch]).join('');
function sci(x, n) {
  if (x === 0) return '0';
  let e = Math.floor(Math.log10(Math.abs(x)));
  let ms = (Math.abs(x) / Math.pow(10, e)).toFixed(n - 1);
  if (parseFloat(ms) >= 10) { e++; ms = (Math.abs(x) / Math.pow(10, e)).toFixed(n - 1); }
  if (parseFloat(ms) < 1) { e--; ms = (Math.abs(x) / Math.pow(10, e)).toFixed(n - 1); }
  return (x < 0 ? '−' : '') + ms + ' × 10' + sup(e);
}
function fx(x, d) { const s = Math.abs(x).toFixed(d); return (x < 0 && parseFloat(s) !== 0 ? '−' : '') + s; }
function sfx(x, d) { const s = fx(x, d); return x > 0 && parseFloat(s) !== 0 ? '+' + s : s; }
function g(x, n) { const s = Math.abs(x).toPrecision(n); if (/e/.test(s)) return sci(x, n); return (x < 0 ? '−' : '') + s; }

/* ---------- record builders ---------- */
const R = [];
const counts = [0, 0, 0, 0, 0];
let seed = 920021;
function rnd() { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; }
function pickPos() {
  const min = Math.min.apply(null, counts);
  const opts = [0, 1, 2, 3, 4].filter(i => counts[i] === min);
  const p = opts[Math.floor(rnd() * opts.length)];
  counts[p]++; return p;
}
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
const norm = s => String(s).trim().toLowerCase().replace(/\s+/g, ' ');
let nId = 0;
const nextId = () => 'm92-x-' + String(++nId).padStart(3, '0');
function check(id, q, why, hints) {
  if (!Array.isArray(hints) || hints.length !== 3) throw new Error(id + ': needs 3 hints');
  [q, why].concat(hints).forEach(t => { if (/undefined|NaN/.test(t)) throw new Error(id + ': bad text ' + t.slice(0, 80)); });
}
function mcq(lesson, tier, tag, q, right, wrong, why, hints) {
  const id = nextId();
  if (wrong.length !== 4) throw new Error(id + ': needs 4 wrong choices');
  const all = [right].concat(wrong);
  if (new Set(all.map(norm)).size !== 5) throw new Error(id + ': duplicate choices ' + JSON.stringify(all));
  all.forEach(s => { if (/undefined|NaN/.test(s)) throw new Error(id + ': bad choice ' + s); });
  check(id, q, why, hints);
  const pos = pickPos();
  const ch = shuffle(wrong); ch.splice(pos, 0, right);
  R.push([id, 92, lesson, tier, tag, 'mcq', q, ch, pos, why, hints]);
}
function num(lesson, tier, tag, q, disp, val, why, hints, opts) {
  const id = nextId();
  check(id, q, why, hints);
  if (!Number.isFinite(val)) throw new Error(id + ': bad value');
  R.push([id, 92, lesson, tier, tag, 'num', q, [disp], val, why, hints, opts || { tol: 0.01 }]);
}

/* =====================================================================
   THERMOCHEMISTRY (lessons 7, 8, 9)
   ===================================================================== */

/* --- Week 6 Q1 (exact) : thermite --- */
{
  const mFe = 725 / 850 * 2 * A.Fe, mol = 725 / 850 * 2;
  mcq(8, 3, 'Worksheet',
    'Recitation Week 6, Q1. The thermite reaction is 2Al(s) + Fe₂O₃(s) → 2Fe(s) + Al₂O₃(s), ΔH = −850 kJ. What mass of iron is formed when 725 kJ of heat is released?',
    g(mFe, 3) + ' g',
    [g(725 / 850 * A.Fe, 3) + ' g', g(850 / 725 * 2 * A.Fe, 3) + ' g', g(725 / 850 * 2 * A.Al, 3) + ' g', '−' + g(mFe, 3) + ' g'],
    `Use ΔH like a mole ratio: −850 kJ goes with 2 mol Fe. "Released" means q = −725 kJ, so mol Fe = (−725 kJ) × (2 mol Fe / −850 kJ) = ${g(mol, 4)} mol Fe, and ${g(mol, 4)} mol × 55.85 g/mol = ${g(mFe, 3)} g. The two negatives cancel: a mass is never negative (−${g(mFe, 3)} g carried the sign into the answer). ${g(725 / 850 * A.Fe, 3)} g forgets the coefficient 2 on Fe; ${g(850 / 725 * 2 * A.Fe, 3)} g turns the ratio upside down (850/725); ${g(725 / 850 * 2 * A.Al, 3)} g uses aluminum's molar mass instead of iron's.`,
    ['ΔH = −850 kJ belongs to the equation exactly as written: 2 mol of Fe form per 850 kJ released.',
     'kJ released → mol Fe (× 2 mol Fe / 850 kJ) → grams (× 55.85 g/mol).',
     `725/850 × 2 = ${g(mol, 4)} mol Fe; multiply by 55.85 g/mol.`]);
}

/* --- Week 6 Q2 (exact, six parts) : NaOH + HCl coffee cup --- */
const W6Q2 = 'Recitation Week 6, Q2. 50.0 g of 1.0 M NaOH at 23.0 °C is mixed with 50.0 g of 1.0 M HCl at 23.0 °C in a coffee-cup calorimeter whose calorimeter constant is 0. The temperature rises to 29.7 °C. Treat the solution like water: c = 4.184 J/(g·°C), d = 1.00 g/mL.';
const w2dT = 29.7 - 23.0, w2q = 100.0 * cw * w2dT, w2n = 0.0500 * 1.0, w2dH = -w2q / w2n / 1000;
{
  mcq(8, 2, 'Worksheet', W6Q2 + ' Part (a): what is ΔT of the solution?',
    '+6.7 °C', ['−6.7 °C', '+3.4 °C', '+13.4 °C', '+52.7 °C'],
    'ΔT = T(final) − T(initial) = 29.7 °C − 23.0 °C = +6.7 °C. Both solutions start at 23.0 °C, so the mixture starts at 23.0 °C and ends at 29.7 °C. −6.7 °C subtracts in the wrong order (initial − final); +3.4 °C splits the rise between the two halves; +13.4 °C counts the same 6.7 °C rise once for each solution; +52.7 °C adds the temperatures instead of subtracting.',
    ['ΔT is always final minus initial.', 'Both solutions start at the same temperature, so there is only one initial temperature.', '29.7 − 23.0.']);

  mcq(8, 2, 'Worksheet', W6Q2 + ' Part (b): what is q for the solution, q(soln)?',
    '+' + sci(w2q, 2) + ' J',
    ['+' + sci(50.0 * cw * w2dT, 2) + ' J', '−' + sci(w2q, 2) + ' J', '+' + sci(100.0 * cw * 29.7, 2) + ' J', '+' + sci(100.0 * w2dT, 2) + ' J'],
    `q(soln) = m·c·ΔT. The solution is BOTH portions: m = 50.0 g + 50.0 g = 100.0 g. q = (100.0 g)(4.184 J/(g·°C))(+6.7 °C) = ${fx(w2q, 1)} J ≈ +${sci(w2q, 2)} J (2 sig figs, from ΔT = 6.7). The solution warmed, so its q is positive. +${sci(50.0 * cw * w2dT, 2)} J uses only 50.0 g; −${sci(w2q, 2)} J is the sign of q(rxn), not q(soln); +${sci(100.0 * cw * 29.7, 2)} J plugs in the final temperature instead of ΔT; +${sci(100.0 * w2dT, 2)} J forgets the specific heat.`,
    ['The solution absorbs the heat, so its q has the sign of ΔT.', 'q = m·c·ΔT with m = the total mass of the mixture.', `100.0 g × 4.184 × 6.7 = ${fx(w2q, 0)} J.`]);

  mcq(8, 3, 'Worksheet', W6Q2 + ' Part (c): what is q for the reaction, q(rxn)?',
    '−' + sci(w2q, 2) + ' J',
    ['+' + sci(w2q, 2) + ' J', '−' + sci(w2q / 2, 2) + ' J', '0 J, because the calorimeter constant is 0', '−' + sci(2 * w2q, 2) + ' J'],
    `Energy is conserved: q(rxn) + q(soln) = 0 (the cup itself absorbs nothing), so q(rxn) = −q(soln) = −${sci(w2q, 2)} J. The reaction released the heat that warmed the solution. +${sci(w2q, 2)} J copies q(soln) without flipping the sign (this exact slip happened on the worksheet). A calorimeter constant of 0 only means the CUP absorbs no heat; the solution still does, so 0 J is wrong. −${sci(w2q / 2, 2)} J and −${sci(2 * w2q, 2)} J come from using 50.0 g or 200.0 g of solution.`,
    ['Who gained the heat, and who lost it?', 'q(rxn) + q(soln) = 0 when the calorimeter absorbs nothing.', `q(rxn) = −q(soln) = −(${fx(w2q, 0)} J).`]);

  mcq(8, 2, 'Worksheet', W6Q2 + ' Part (d): how many moles of HCl reacted?',
    '0.050 mol', ['0.10 mol', '50 mol', '0.025 mol', '1.0 mol'],
    '50.0 g of solution at 1.00 g/mL is 50.0 mL = 0.0500 L. mol HCl = M × V = (1.0 mol/L)(0.0500 L) = 0.050 mol (NaOH is also 0.050 mol, so neither is in excess). 0.10 mol uses the 100.0 mL total volume; 50 mol forgets mL → L; 0.025 mol applies a "dilution" to 0.50 M after mixing - but the moles of HCl you added do not change on mixing; 1.0 mol confuses molarity with moles.',
    ['Moles come from molarity × volume in liters.', 'Convert the 50.0 g of HCl solution to mL with the density, then to L.', '1.0 mol/L × 0.0500 L.']);

  num(8, 3, 'Worksheet', W6Q2 + ' Part (e): what is ΔH of the reaction per mole of HCl? Enter a number in kJ/mol (include the sign).',
    '−56 kJ/mol', Number(w2dH.toFixed(2)),
    `ΔH = q(rxn) / mol HCl = (−${fx(w2q, 0)} J) / (0.050 mol) = ${fx(w2dH * 1000, 0)} J/mol = ${fx(w2dH, 1)} kJ/mol ≈ −56 kJ/mol (2 sig figs). Use q(rxn), not q(soln): the sign must be negative because the reaction released heat. Remember J → kJ (÷ 1000).`,
    ['ΔH per mole = q(rxn) divided by the moles that reacted.', 'Use q(rxn) from part (c) and mol HCl from part (d); convert J to kJ.', `−${fx(w2q, 0)} J ÷ 0.050 mol, then ÷ 1000.`], { tol: 0.02 });

  mcq(8, 2, 'Worksheet', W6Q2 + ' Part (f): is the neutralization endothermic or exothermic?',
    'Exothermic: the solution warmed, so q(rxn) < 0 and ΔH < 0',
    ['Endothermic: the temperature rose, so heat was absorbed and ΔH > 0', 'Exothermic: heat was released, so ΔH > 0', 'Endothermic: q(soln) is positive, so ΔH of the reaction is positive', 'Neither: with a calorimeter constant of 0, no heat is exchanged'],
    'The solution (the surroundings) got hotter, so heat flowed OUT of the reacting system: q(rxn) < 0, ΔH < 0, exothermic. A temperature rise in a coffee cup always means an exothermic reaction. "ΔH > 0" with "released" mixes the two conventions; the positive q belongs to the solution, not the reaction; a zero calorimeter constant does not stop heat flowing into the solution.',
    ['Is the reaction the system or the surroundings?', 'Surroundings warm up → heat left the system.', 'Heat released by the system means ΔH is negative.']);
}

/* --- Week 6 Q3 (exact) : titanium --- */
{
  const qw = 75.0 * cw * (49.30 - 50.00), d = -qw / (33.2 * 0.228), Ti = 49.30 - d;
  const swap = 49.30 - 33.2 * cw * 0.70 / (75.0 * 0.228), noC = 49.30 - 75.0 * 0.70 / (33.2 * 0.228);
  mcq(7, 3, 'Worksheet',
    'Recitation Week 6, Q3. A 33.2 g piece of titanium is added to 75.0 g of water at 50.00 °C. When they reach the same temperature, the water has cooled to 49.30 °C. With c(Ti) = 0.228 J/(g·K) and c(water) = 4.184 J/(g·K), and no heat lost to the surroundings, what was the initial temperature of the titanium?',
    fx(Ti, 1) + ' °C', [fx(49.30 + d, 1) + ' °C', fx(d, 1) + ' °C', fx(swap, 1) + ' °C', fx(noC, 1) + ' °C'],
    `Heat lost by the water = heat gained by the titanium: q(water) = (75.0 g)(4.184)(49.30 − 50.00) = ${fx(qw, 1)} J, so q(Ti) = +${fx(-qw, 1)} J. ΔT(Ti) = ${fx(-qw, 1)} / (33.2 × 0.228) = +${fx(d, 2)} °C, and T(initial) = 49.30 − ${fx(d, 2)} = ${fx(Ti, 1)} °C. The titanium was COLDER than the water, which is why the water cooled. ${fx(49.30 + d, 1)} °C adds ΔT with the wrong sign; ${fx(d, 1)} °C reports ΔT itself; ${fx(swap, 1)} °C swaps the two masses; ${fx(noC, 1)} °C leaves out water's specific heat.`,
    ['The water cooled, so the metal must have been colder and warmed up.', '−q(water) = q(Ti), and both end at 49.30 °C.', `q(Ti) = +${fx(-qw, 1)} J = 33.2 × 0.228 × (49.30 − T(initial)).`]);
}

/* --- Week 6 Q4 (exact) : ethylene glycol --- */
{
  const d = 688 / (27.7 * 2.394), Tf = 27.4 + d;
  mcq(7, 3, 'Worksheet',
    'Recitation Week 6, Q4. 27.7 g of ethylene glycol (c = 2.394 J/(g·K)) absorbs 688 J of heat. Its initial temperature is 27.4 °C. What is its final temperature?',
    fx(Tf, 1) + ' °C', [fx(27.4 - d, 1) + ' °C', fx(d, 1) + ' °C', fx(27.4 + 688 / (27.7 * cw), 1) + ' °C', fx(27.4 + 688 / 27.7, 1) + ' °C'],
    `ΔT = q/(m·c) = 688 J / (27.7 g × 2.394 J/(g·K)) = +${fx(d, 2)} K (= °C). Heat absorbed means the temperature RISES: T(final) = 27.4 + ${fx(d, 2)} = ${fx(Tf, 1)} °C. ${fx(27.4 - d, 1)} °C subtracts ΔT; ${fx(d, 1)} °C stops at ΔT; ${fx(27.4 + 688 / (27.7 * cw), 1)} °C uses water's 4.184 instead of glycol's 2.394; ${fx(27.4 + 688 / 27.7, 1)} °C leaves out the specific heat.`,
    ['Absorbing heat makes the temperature go up.', 'Rearrange q = m·c·ΔT for ΔT, then add it to the initial temperature.', `ΔT = 688/(27.7 × 2.394) = ${fx(d, 2)} °C.`]);
}

/* --- Week 6 Q5 (exact) : unknown volume of water --- */
{
  const V = 24.4 * (35.0 - 23.5) / (23.5 - 18.2);
  mcq(7, 3, 'Worksheet',
    'Recitation Week 6, Q5. An unknown volume of water at 18.2 °C is added to 24.4 mL of water at 35.0 °C. The final temperature is 23.5 °C. What was the unknown volume? (d = 1.00 g/mL; no heat lost.)',
    fx(V, 1) + ' mL', [fx(24.4 * 5.3 / 11.5, 1) + ' mL', fx(24.4 * 16.8 / 5.3, 1) + ' mL', fx(24.4 * 11.5 / 16.8, 1) + ' mL', '24.4 mL'],
    `Heat lost by the warm water = heat gained by the cool water, and c cancels: m(cool)(23.5 − 18.2) = (24.4 g)(35.0 − 23.5). m(cool) = 24.4 × 11.5 / 5.3 = ${fx(V, 2)} g = ${fx(V, 1)} mL. Check: the final temperature is closer to 18.2 °C, so there must be MORE cool water than warm. ${fx(24.4 * 5.3 / 11.5, 1)} mL flips the ratio; ${fx(24.4 * 16.8 / 5.3, 1)} mL and ${fx(24.4 * 11.5 / 16.8, 1)} mL use the full 35.0 − 18.2 gap as one of the ΔT values; 24.4 mL would put the final temperature at the average, 26.6 °C.`,
    ['The final temperature sits closer to one starting temperature - which sample is bigger?', 'm₁·c·ΔT₁ = m₂·c·ΔT₂ (sizes of the changes), and c cancels.', 'm × (23.5 − 18.2) = 24.4 × (35.0 − 23.5).']);
}

/* --- Week 6 Q6 (exact) : propane combustion from ΔH°f --- */
{
  const ok = 3 * -393.5 + 4 * -285.8 - (-103.8), gas = 3 * -393.5 + 4 * -241.8 + 103.8, wrongSign = 3 * -393.5 + 4 * -285.8 - 103.8, noCoef = -393.5 - 285.8 + 103.8;
  mcq(9, 3, 'Worksheet',
    'Recitation Week 6, Q6. Calculate ΔH°comb for 1.00 mol of propane: C₃H₈(g) + 5O₂(g) → 3CO₂(g) + 4H₂O(l). ΔH°f (kJ/mol): C₃H₈(g) −103.8, CO₂(g) −393.5, H₂O(l) −285.8, H₂O(g) −241.8.',
    fx(ok, 1) + ' kJ', [fx(gas, 1) + ' kJ', fx(wrongSign, 1) + ' kJ', sfx(-ok, 1) + ' kJ', fx(noCoef, 1) + ' kJ'],
    `ΔH° = Σn·ΔH°f(products) − Σm·ΔH°f(reactants) = [3(−393.5) + 4(−285.8)] − [(−103.8) + 5(0)] = (−1180.5 − 1143.2) + 103.8 = ${fx(ok, 1)} kJ. O₂ is an element in its standard state (0). ${fx(gas, 1)} kJ uses H₂O(g) although the equation makes H₂O(l); ${fx(wrongSign, 1)} kJ subtracts −103.8 as if it were +103.8; +${fx(-ok, 1)} kJ is reactants − products; ${fx(noCoef, 1)} kJ ignores the coefficients 3 and 4.`,
    ['Products minus reactants, each times its coefficient.', 'Read the phase of water in the equation; O₂ has ΔH°f = 0.', '[3(−393.5) + 4(−285.8)] − (−103.8).']);
}

/* --- Week 6 Q7 (exact) : Hess, acetylene --- */
{
  const ok = 2 * -393.5 + -285.8 + 1299.5;
  mcq(9, 3, 'Worksheet',
    'Recitation Week 6, Q7. Use Hess’s law to find ΔH for 2C(s) + H₂(g) → C₂H₂(g), given: (1) C₂H₂(g) + 5/2 O₂(g) → 2CO₂(g) + H₂O(l), ΔH = −1299.5 kJ; (2) C(s) + O₂(g) → CO₂(g), ΔH = −393.5 kJ; (3) H₂(g) + ½O₂(g) → H₂O(l), ΔH = −285.8 kJ.',
    sfx(ok, 1) + ' kJ', [sfx(-ok, 1) + ' kJ', sfx(-393.5 - 285.8 + 1299.5, 1) + ' kJ', fx(2 * -393.5 - 285.8 - 1299.5, 1) + ' kJ', sfx(2 * -393.5 + 1299.5, 1) + ' kJ'],
    `Flip, scale, add. C₂H₂ must be a PRODUCT, so reverse (1): +1299.5 kJ. The target needs 2 C, so double (2): 2(−393.5) = −787.0 kJ. Keep (3) as written: −285.8 kJ. The 2CO₂, H₂O and 5/2 O₂ all cancel. ΔH = 1299.5 − 787.0 − 285.8 = ${sfx(ok, 1)} kJ. ${sfx(-ok, 1)} kJ has the overall sign wrong; ${sfx(-393.5 - 285.8 + 1299.5, 1)} kJ forgets to double (2); ${fx(2 * -393.5 - 285.8 - 1299.5, 1)} kJ forgets to reverse (1); ${sfx(2 * -393.5 + 1299.5, 1)} kJ leaves out (3).`,
    ['Where must C₂H₂ end up - reactant or product side?', 'Reverse (1) and change its sign; multiply (2) by 2; keep (3).', '+1299.5 + 2(−393.5) + (−285.8).']);
}

/* ---------- Week 6 variations ---------- */

/* Q1 variations: ΔH as a mole ratio */
{
  const M = 2 * A.Fe + 3 * A.O, q = 50.0 / M * 850;
  num(8, 3, 'Exam',
    'Thermite: 2Al(s) + Fe₂O₃(s) → 2Fe(s) + Al₂O₃(s), ΔH = −850 kJ. How much heat is released when 50.0 g of Fe₂O₃ reacts with excess aluminum? Enter a positive number in kJ.',
    g(q, 3) + ' kJ', Number(q.toFixed(1)),
    `Molar mass Fe₂O₃ = 2(55.85) + 3(16.00) = ${fx(M, 2)} g/mol. mol Fe₂O₃ = 50.0 / ${fx(M, 2)} = ${g(50 / M, 4)} mol. The equation has 1 mol Fe₂O₃ per 850 kJ released, so q = ${g(50 / M, 4)} × 850 = ${g(q, 3)} kJ released. (Do not use the coefficient 2 here: it belongs to Fe and Al, not Fe₂O₃.)`,
    ['Grams → moles of Fe₂O₃ first.', 'The equation releases 850 kJ per 1 mol of Fe₂O₃.', `${g(50 / M, 4)} mol × 850 kJ/mol.`]);
}
{
  const m = 52.0 / 1204 * 2 * A.Mg;
  mcq(8, 3, 'Trap',
    'Variation of the lecture example: 2Mg(s) + O₂(g) → 2MgO(s), ΔH = −1204 kJ. A strip of magnesium burns in excess oxygen and 52.0 kJ of heat is released. What mass of magnesium burned?',
    fx(m, 2) + ' g', ['−' + fx(m, 2) + ' g', fx(m / 2, 2) + ' g', fx(52.0 / 1204 * 2 * (A.Mg + A.O), 2) + ' g', g(52.0 / 1204 * 2, 3) + ' g'],
    `(−52.0 kJ) × (2 mol Mg / −1204 kJ) × 24.31 g/mol = ${fx(m, 2)} g. "Released" already means q is negative, so the two negatives cancel and the mass is positive (the lecture slide makes exactly this point). −${fx(m, 2)} g carries the sign into a mass; ${fx(m / 2, 2)} g forgets the 2 mol Mg; ${fx(52.0 / 1204 * 2 * (A.Mg + A.O), 2)} g uses the molar mass of MgO; ${g(52.0 / 1204 * 2, 3)} g is the number of MOLES of Mg written as grams.`,
    ['A mass can never be negative.', 'kJ → mol Mg with (2 mol Mg / 1204 kJ), then mol → g.', `52.0/1204 × 2 = ${g(52.0 / 1204 * 2, 4)} mol Mg.`]);
}
{
  const MO2 = 2 * A.O, MCH4 = A.C + 4 * A.H, nO2 = 25.0 / MO2, q = nO2 * 891 / 2;
  mcq(8, 4, 'Trap',
    'CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l), ΔH = −891 kJ. How much heat is released when 25.0 g of O₂ is consumed (CH₄ in excess)?',
    g(q, 3) + ' kJ', [g(2 * q, 3) + ' kJ', g(q / 2, 3) + ' kJ', sci(25.0 / MCH4 * 891, 3) + ' kJ', '891 kJ'],
    `mol O₂ = 25.0 g / 32.00 g/mol = ${g(nO2, 4)} mol. The −891 kJ goes with 2 mol O₂, so q = ${g(nO2, 4)} mol O₂ × (891 kJ / 2 mol O₂) = ${g(q, 3)} kJ released. ${g(2 * q, 3)} kJ treats 891 kJ as per mole of O₂ (ignores the coefficient 2); ${g(q / 2, 3)} kJ divides by 2 twice; ${sci(25.0 / MCH4 * 891, 3)} kJ uses the molar mass of CH₄ for O₂; 891 kJ is the heat for the whole equation, not for 25.0 g.`,
    ['Which coefficient pairs with the substance you were given?', 'Conversion factor: −891 kJ per 2 mol O₂.', `${g(nO2, 4)} mol O₂ × 891/2.`]);
}

/* Q2 variations: coffee-cup reaction ΔH */
{
  const q = 100.0 * cw * (24.64 - 22.50), n = 0.0400 * 0.400, dH = -q / n / 1000;
  mcq(8, 4, 'Trap',
    '60.0 mL of 0.600 M NaOH and 40.0 mL of 0.400 M HCl, both at 22.50 °C, are mixed in a coffee-cup calorimeter. The final temperature is 24.64 °C. Assume the solution has d = 1.00 g/mL and c = 4.184 J/(g·°C), and the calorimeter absorbs no heat. What is ΔH per mole of water formed?',
    fx(dH, 1) + ' kJ/mol', [fx(-q / (0.0600 * 0.600) / 1000, 1) + ' kJ/mol', sfx(-dH, 1) + ' kJ/mol', fx(-(60.0 * cw * 2.14) / n / 1000, 1) + ' kJ/mol', fx(-q / 1000, 3) + ' kJ/mol'],
    `q(soln) = (100.0 g)(4.184)(24.64 − 22.50) = ${fx(q, 1)} J, so q(rxn) = −${fx(q, 1)} J. Moles: NaOH = 0.0600 L × 0.600 M = 0.0360 mol; HCl = 0.0400 L × 0.400 M = 0.0160 mol. HCl is LIMITING, so 0.0160 mol H₂O forms. ΔH = −${fx(q / 1000, 4)} kJ / 0.0160 mol = ${fx(dH, 1)} kJ/mol. ${fx(-q / (0.0600 * 0.600) / 1000, 1)} kJ/mol divides by the NaOH moles (the excess reagent); +${fx(-dH, 1)} has the sign of q(soln); ${fx(-(60.0 * cw * 2.14) / n / 1000, 1)} uses only the 60.0 g of NaOH solution as the mass; ${fx(-q / 1000, 3)} never divides by moles.`,
    ['Only the limiting reactant decides how much water forms.', 'Total mass 100.0 g; compare 0.0360 mol NaOH with 0.0160 mol HCl.', `ΔH = −${fx(q, 0)} J ÷ 0.0160 mol, in kJ.`]);
}
{
  const q = 100.0 * cw * (21.30 - 24.80), Q = sci(Math.abs(q), 3) + ' J';
  mcq(8, 3, 'Trap',
    'A reaction run in a coffee-cup calorimeter makes 100.0 g of solution cool from 24.80 °C to 21.30 °C (c = 4.184 J/(g·°C); calorimeter absorbs no heat). Which line is correct?',
    `q(soln) = −${Q}; q(rxn) = +${Q}; endothermic`,
    [`q(soln) = +${Q}; q(rxn) = −${Q}; exothermic`, `q(soln) = −${Q}; q(rxn) = −${Q}; exothermic`, `q(soln) = −${Q}; q(rxn) = +${Q}; exothermic`, `q(soln) = +${Q}; q(rxn) = +${Q}; endothermic`],
    `ΔT = 21.30 − 24.80 = −3.50 °C, so q(soln) = (100.0)(4.184)(−3.50) = ${fx(q, 1)} J ≈ −${Q}. The solution LOST heat, and it went into the reaction: q(rxn) = −q(soln) = +${Q}, ΔH > 0, endothermic. The wrong lines either give q(soln) the wrong sign, give both the same sign (they must be opposite), or call a positive q(rxn) exothermic.`,
    ['The solution cooled. Where did its heat go?', 'q(rxn) and q(soln) are always equal in size and opposite in sign.', 'A reaction that absorbs heat from the solution is endothermic.']);
}
{
  const M = 2 * A.N + 4 * A.H + 3 * A.O, q = 64.0 * cw * (18.20 - 23.00), n = 4.00 / M, dH = -q / n / 1000;
  num(8, 4, 'Exam',
    'Cold pack: 4.00 g of NH₄NO₃(s) dissolves in water in a coffee-cup calorimeter. The 64.0 g of solution cools from 23.00 °C to 18.20 °C (c = 4.184 J/(g·°C); calorimeter absorbs no heat). What is ΔH of solution per mole of NH₄NO₃? Enter a number in kJ/mol (include the sign).',
    sfx(dH, 1) + ' kJ/mol', Number(dH.toFixed(2)),
    `q(soln) = (64.0 g)(4.184)(18.20 − 23.00) = ${fx(q, 1)} J, so q(rxn) = +${fx(-q, 1)} J (the dissolving absorbed heat). Molar mass NH₄NO₃ = 2(14.01) + 4(1.008) + 3(16.00) = ${fx(M, 2)} g/mol; mol = 4.00 / ${fx(M, 2)} = ${g(n, 4)} mol. ΔH = +${fx(-q / 1000, 4)} kJ / ${g(n, 4)} mol = ${sfx(dH, 1)} kJ/mol. Positive: the solution cooled, so dissolving is endothermic.`,
    ['The solution cooled - what sign must ΔH have?', 'q(rxn) = −m·c·ΔT, then divide by moles of NH₄NO₃.', `q(rxn) = +${fx(-q, 0)} J; mol = 4.00 g ÷ ${fx(M, 2)} g/mol.`], { tol: 0.02 });
}

/* Q3 variations: metal + water */
{
  const qw = 50.0 * cw * (24.10 - 22.00), cs = qw / (5.00 * (100.0 - 24.10));
  mcq(7, 3, 'Exam',
    'Variation of the lecture worked problem: 5.00 g of an unknown solid is heated to 100.0 °C and dropped into 50.0 mL of water in a coffee-cup calorimeter. The water warms from 22.00 °C to 24.10 °C. What is the specific heat capacity of the solid? (water: 1.00 g/mL, 4.184 J/(g·°C))',
    fx(cs, 2) + ' J/(g·°C)', [fx(qw / (5.00 * 2.10), 1) + ' J/(g·°C)', fx(qw / (5.00 * 78.0), 2) + ' J/(g·°C)', g(5.00 * cw * 2.10 / (50.0 * 75.90), 3) + ' J/(g·°C)', '−' + fx(cs, 2) + ' J/(g·°C)'],
    `Key idea: −q(solid) = q(water). q(water) = (50.0 g)(4.184)(+2.10 °C) = ${fx(qw, 1)} J. The solid's ΔT = 24.10 − 100.0 = −75.90 °C, so c = −q(water)/(m·ΔT) = −${fx(qw, 1)} / (5.00 × −75.90) = ${fx(cs, 2)} J/(g·°C). A specific heat is never negative (−${fx(cs, 2)} drops the solid's negative ΔT). ${fx(qw / (5.00 * 2.10), 1)} uses the WATER's ΔT for the solid; ${fx(qw / (5.00 * 78.0), 2)} uses 100.0 − 22.00, but the solid ends at 24.10 °C, not 22.00 °C; ${g(5.00 * cw * 2.10 / (50.0 * 75.90), 3)} swaps the two masses.`,
    ['Both the solid and the water end at the same final temperature.', 'q(water) = m·c·ΔT, then c(solid) = q / (m(solid) × |ΔT(solid)|).', `${fx(qw, 1)} J ÷ (5.00 g × 75.90 °C).`]);
}
{
  const a = 45.0 * 0.385, b = 120.0 * cw, Tf = (a * 95.0 + b * 21.5) / (a + b);
  num(7, 3, 'Exam',
    'A 45.0 g block of copper (c = 0.385 J/(g·°C)) at 95.0 °C is dropped into 120.0 g of water (c = 4.184 J/(g·°C)) at 21.5 °C in an insulated cup. What is the final temperature? Enter a number in °C.',
    fx(Tf, 1) + ' °C', Number(Tf.toFixed(2)),
    `Heat lost by Cu = heat gained by water: (45.0)(0.385)(95.0 − T) = (120.0)(4.184)(T − 21.5). ${fx(a, 3)}(95.0 − T) = ${fx(b, 2)}(T − 21.5). Solve: T = (${fx(a, 3)} × 95.0 + ${fx(b, 2)} × 21.5)/(${fx(a, 3)} + ${fx(b, 2)}) = ${fx(Tf, 2)} °C ≈ ${fx(Tf, 1)} °C. Water's heat capacity is about 29 times the copper's, so the final temperature stays close to 21.5 °C.`,
    ['Both objects finish at the same temperature T.', 'm(Cu)·c(Cu)·(95.0 − T) = m(w)·c(w)·(T − 21.5).', `T = (${fx(a, 3)}·95.0 + ${fx(b, 2)}·21.5) / (${fx(a, 3)} + ${fx(b, 2)}).`], { abs: 0.1 });
}
{
  const qw = 60.0 * cw * (26.85 - 22.00), d = qw / (28.5 * 0.900), Ti = 26.85 + d;
  mcq(7, 3, 'Exam',
    'Like recitation Q3, but the metal is hot: a 28.5 g piece of aluminum (c = 0.900 J/(g·°C)) is placed in 60.0 g of water at 22.00 °C. The water warms to 26.85 °C. What was the aluminum’s initial temperature?',
    fx(Ti, 1) + ' °C', [fx(26.85 - d, 1) + ' °C', fx(d, 1) + ' °C', fx(22.00 + d, 1) + ' °C', fx(26.85 + qw / (28.5 * cw), 1) + ' °C'],
    `q(water) = (60.0)(4.184)(26.85 − 22.00) = +${fx(qw, 1)} J, so q(Al) = −${fx(qw, 1)} J. ΔT(Al) = −${fx(qw, 1)} / (28.5 × 0.900) = −${fx(d, 2)} °C. T(initial) = T(final) − ΔT = 26.85 + ${fx(d, 2)} = ${fx(Ti, 1)} °C. ${fx(26.85 - d, 1)} °C has the sign of ΔT backwards (the Al must have been hotter than the water it warmed); ${fx(d, 1)} °C is ΔT itself; ${fx(22.00 + d, 1)} °C starts from the water's initial instead of the shared final temperature; ${fx(26.85 + qw / (28.5 * cw), 1)} °C uses water's specific heat for the aluminum.`,
    ['The water warmed, so the aluminum started hotter and cooled.', 'q(Al) = −q(water); ΔT(Al) = q(Al)/(m·c).', `ΔT(Al) = −${fx(qw, 1)}/(28.5 × 0.900); T(initial) = 26.85 − ΔT.`]);
}

/* Q4 variations: q = mcΔT */
{
  const d = 1250 / (35.0 * 2.44), Tf = 21.6 + d;
  mcq(7, 3, 'Trap',
    '35.0 g of ethanol (c = 2.44 J/(g·°C)) at 21.6 °C absorbs 1.25 kJ of heat. What is its final temperature?',
    fx(Tf, 1) + ' °C', ['21.6 °C (essentially no change)', fx(21.6 - d, 1) + ' °C', fx(21.6 + 1250 / (35.0 * cw), 1) + ' °C', fx(d, 1) + ' °C'],
    `Convert first: 1.25 kJ = 1250 J. ΔT = 1250 / (35.0 × 2.44) = +${fx(d, 2)} °C, so T(final) = 21.6 + ${fx(d, 2)} = ${fx(Tf, 1)} °C. Leaving q as 1.25 (kJ) gives ΔT = 0.0146 °C, i.e. "21.6 °C"; ${fx(21.6 - d, 1)} °C subtracts ΔT although heat was absorbed; ${fx(21.6 + 1250 / (35.0 * cw), 1)} °C uses water's c; ${fx(d, 1)} °C reports ΔT, not the final temperature.`,
    ['Specific heat is in J, but q is given in kJ.', 'ΔT = q/(m·c) with q = 1250 J; heat absorbed → T rises.', `ΔT = 1250/(35.0 × 2.44) = ${fx(d, 2)} °C.`]);
}
{
  const cs = 207 / (15.0 * 30.0);
  num(7, 3, 'Exam',
    'A 15.0 g metal sample absorbs 0.207 kJ of heat, and its temperature rises from 22.0 °C to 52.0 °C. What is the metal’s specific heat capacity? Enter a number in J/(g·°C).',
    fx(cs, 3) + ' J/(g·°C)', Number(cs.toFixed(4)),
    `q = 0.207 kJ = 207 J; ΔT = 52.0 − 22.0 = 30.0 °C. c = q/(m·ΔT) = 207 J / (15.0 g × 30.0 °C) = ${fx(cs, 3)} J/(g·°C) (close to iron, 0.450). Forgetting kJ → J gives 0.000460, a thousand times too small.`,
    ['q = m·c·ΔT, solved for c.', 'Convert 0.207 kJ to J before dividing.', '207 ÷ (15.0 × 30.0).']);
}
{
  const q = 250.0 * cw * (25.0 - 80.0) / 1000;
  mcq(7, 2, 'Exam',
    'What is q for 250.0 g of water that cools from 80.0 °C to 25.0 °C? (c = 4.184 J/(g·°C))',
    fx(q, 1) + ' kJ', [sfx(-q, 1) + ' kJ', sci(q * 1000, 3) + ' kJ', fx(-250.0 * cw * 25.0 / 1000, 1) + ' kJ', fx(-250.0 * cw * 80.0 / 1000, 1) + ' kJ'],
    `ΔT = 25.0 − 80.0 = −55.0 °C. q = (250.0 g)(4.184)(−55.0) = ${fx(q * 1000, 0)} J = ${fx(q, 1)} kJ. Negative: the water released heat. +${fx(-q, 1)} kJ subtracts in the wrong order; ${sci(q * 1000, 3)} kJ forgets J → kJ; ${fx(-250.0 * cw * 25.0 / 1000, 1)} and ${fx(-250.0 * cw * 80.0 / 1000, 1)} kJ use one temperature instead of ΔT.`,
    ['Cooling → q is negative.', 'ΔT = final − initial; q = m·c·ΔT.', '250.0 × 4.184 × (−55.0) J, then ÷ 1000.']);
}

/* Q5 variations: mixing water */
{
  const T = (85.0 * 72.0 + 155.0 * 18.5) / 240.0;
  num(7, 3, 'Exam',
    '85.0 mL of water at 72.0 °C is mixed with 155.0 mL of water at 18.5 °C in an insulated container. What is the final temperature? (d = 1.00 g/mL; no heat lost.) Enter a number in °C.',
    fx(T, 1) + ' °C', Number(T.toFixed(2)),
    `Heat lost by hot = heat gained by cold, and c cancels: 85.0(72.0 − T) = 155.0(T − 18.5). T = (85.0 × 72.0 + 155.0 × 18.5)/(85.0 + 155.0) = (6120 + 2867.5)/240.0 = ${fx(T, 2)} °C. It is a mass-weighted average, pulled toward the larger (cold) sample - not the plain average 45.3 °C.`,
    ['The answer must lie between 18.5 and 72.0 °C, closer to the bigger sample.', 'm₁(72.0 − T) = m₂(T − 18.5).', 'T = (85.0·72.0 + 155.0·18.5)/240.0.'], { abs: 0.1 });
}
{
  const m = 200.0 * 15.0 / 55.0;
  mcq(7, 3, 'Exam',
    'What volume of water at 90.0 °C must be added to 200.0 mL of water at 20.0 °C to give a final temperature of 35.0 °C? (d = 1.00 g/mL; no heat lost.)',
    fx(m, 1) + ' mL', [fx(200.0 * 55.0 / 15.0, 0) + ' mL', fx(200.0 * 15.0 / 70.0, 1) + ' mL', fx(200.0 * 35.0 / 90.0, 1) + ' mL', '200.0 mL'],
    `m(hot)(90.0 − 35.0) = (200.0 g)(35.0 − 20.0) → m(hot) = 200.0 × 15.0 / 55.0 = ${fx(m, 1)} g = ${fx(m, 1)} mL. Sense check: 35.0 °C is much closer to 20.0 °C, so far less hot water than cold is needed. ${fx(200.0 * 55.0 / 15.0, 0)} mL flips the ratio; ${fx(200.0 * 15.0 / 70.0, 1)} mL uses 90.0 − 20.0 for the hot water's ΔT; ${fx(200.0 * 35.0 / 90.0, 1)} mL uses temperatures instead of temperature CHANGES; 200.0 mL would give 55.0 °C, the average.`,
    ['Is 35.0 °C closer to the hot or the cold water?', 'm(hot)·ΔT(hot) = m(cold)·ΔT(cold), with ΔT measured to 35.0 °C.', 'm × 55.0 = 200.0 × 15.0.']);
}
{
  mcq(7, 2, 'Exam',
    '50 g of water at 70 °C is mixed with 100 g of water at 10 °C (insulated, no heat lost). What is the final temperature?',
    '30 °C', ['40 °C', '50 °C', 'It cannot be found without knowing the specific heat of water', '20 °C'],
    'Heat lost = heat gained: 50(70 − T) = 100(T − 10) → 3500 − 50T = 100T − 1000 → T = 4500/150 = 30 °C. The specific heat is the same on both sides, so it cancels - you do not need it. 40 °C is the plain average (equal masses only); 50 °C weights the samples the wrong way round; 20 °C would mean the hot water lost 50 °C while the cold water gained only 10 °C, which does not balance 50 g × 50 against 100 g × 10.',
    ['The bigger sample changes temperature less.', 'm₁(70 − T) = m₂(T − 10); c cancels.', '50(70 − T) = 100(T − 10).']);
}

/* Q6 variations: ΔH°f */
{
  const ok = 4 * 90.3 + 6 * -241.8 - 4 * -45.9, liq = 4 * 90.3 + 6 * -285.8 - 4 * -45.9, ws = 4 * 90.3 + 6 * -241.8 + 4 * -45.9, nc = 90.3 - 241.8 + 45.9;
  mcq(9, 3, 'Exam',
    'Lecture example: 4NH₃(g) + 5O₂(g) → 4NO(g) + 6H₂O(g). ΔH°f (kJ/mol): NH₃(g) −45.9, NO(g) 90.3, H₂O(g) −241.8, H₂O(l) −285.8. What is ΔH°rxn?',
    fx(ok, 1) + ' kJ', [fx(liq, 1) + ' kJ', sfx(-ok, 1) + ' kJ', fx(ws, 1) + ' kJ', fx(nc, 1) + ' kJ'],
    `ΔH° = [4(90.3) + 6(−241.8)] − [4(−45.9) + 5(0)] = (361.2 − 1450.8) − (−183.6) = ${fx(ok, 1)} kJ. ${fx(liq, 1)} kJ uses H₂O(l) though the equation says H₂O(g); +${fx(-ok, 1)} kJ is reactants − products; ${fx(ws, 1)} kJ adds the NH₃ term instead of subtracting it; ${fx(nc, 1)} kJ ignores every coefficient.`,
    ['Check the phase of every species before reading the table.', 'Σn·ΔH°f(products) − Σm·ΔH°f(reactants); O₂ = 0.', '[4(90.3) + 6(−241.8)] − [4(−45.9)].']);
}
{
  const M = A.C + 4 * A.H + A.O, dH = 2 * -393.5 + 4 * -285.8 - 2 * -238.6, perG = -dH / 2 / M;
  num(9, 4, 'Exam',
    'Methanol burns: 2CH₃OH(l) + 3O₂(g) → 2CO₂(g) + 4H₂O(l). ΔH°f (kJ/mol): CH₃OH(l) −238.6, CO₂(g) −393.5, H₂O(l) −285.8. How many kJ of heat are released per GRAM of methanol burned? Enter a positive number in kJ/g.',
    fx(perG, 1) + ' kJ/g', Number(perG.toFixed(2)),
    `ΔH° = [2(−393.5) + 4(−285.8)] − [2(−238.6)] = −787.0 − 1143.2 + 477.2 = ${fx(dH, 1)} kJ for 2 mol CH₃OH, i.e. ${fx(dH / 2, 1)} kJ/mol. Molar mass CH₃OH = 12.01 + 4(1.008) + 16.00 = ${fx(M, 3)} g/mol. Heat released per gram = ${fx(-dH / 2, 1)} / ${fx(M, 3)} = ${fx(perG, 1)} kJ/g. Forgetting that the equation burns 2 mol gives ${fx(-dH / M, 1)} kJ/g.`,
    ['First ΔH° from formation enthalpies, then per mole of methanol, then per gram.', 'The equation as written burns 2 mol of CH₃OH.', `${fx(-dH, 1)} kJ ÷ 2 mol ÷ ${fx(M, 2)} g/mol.`]);
}
{
  const ok = -393.5 + 2 * -296.8 - 87.9;
  mcq(9, 3, 'Exam',
    'CS₂(l) + 3O₂(g) → CO₂(g) + 2SO₂(g). ΔH°f (kJ/mol): CS₂(l) 87.9, CO₂(g) −393.5, SO₂(g) −296.8, SO₃(g) −396.0. What is ΔH°rxn?',
    fx(ok, 1) + ' kJ', [fx(-393.5 + 2 * -296.8 + 87.9, 1) + ' kJ', fx(-393.5 - 296.8 - 87.9, 1) + ' kJ', fx(-393.5 + 2 * -396.0 - 87.9, 1) + ' kJ', sfx(-ok, 1) + ' kJ'],
    `ΔH° = [(−393.5) + 2(−296.8)] − [87.9 + 3(0)] = −987.1 − 87.9 = ${fx(ok, 1)} kJ. CS₂ has a POSITIVE ΔH°f, so subtracting it makes the answer more negative. ${fx(-393.5 + 2 * -296.8 + 87.9, 1)} kJ adds CS₂ instead of subtracting it; ${fx(-393.5 - 296.8 - 87.9, 1)} kJ forgets the 2 on SO₂; ${fx(-393.5 + 2 * -396.0 - 87.9, 1)} kJ uses SO₃, which is not a product; +${fx(-ok, 1)} kJ reverses products and reactants.`,
    ['Watch the sign of CS₂’s formation enthalpy.', 'Products − reactants; 2 mol SO₂; O₂ = 0.', '[−393.5 + 2(−296.8)] − (+87.9).']);
}

/* Q7 variations: Hess */
{
  const ok = -802.3 - 2 * 44.0;
  mcq(9, 3, 'Trap',
    'Like the lecture glucose example: CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g) has ΔH = −802.3 kJ. Water’s ΔH(vap) is +44.0 kJ/mol (at 25 °C). What is ΔH for the same reaction when it produces liquid water, CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)?',
    fx(ok, 1) + ' kJ', [fx(-802.3 + 88.0, 1) + ' kJ', fx(-802.3 - 44.0, 1) + ' kJ', fx(-802.3 + 44.0, 1) + ' kJ', '−802.3 kJ, because ΔH is a state function'],
    `Add 2 × [H₂O(g) → H₂O(l)], the reverse of vaporization: ΔH = 2(−44.0) = −88.0 kJ. Total: −802.3 − 88.0 = ${fx(ok, 1)} kJ. Condensing releases heat, so making liquid water is MORE exothermic. ${fx(-802.3 + 88.0, 1)} kJ adds +88.0 (vaporization instead of condensation); ${fx(-802.3 - 44.0, 1)} and ${fx(-802.3 + 44.0, 1)} kJ handle only 1 mol of water; "state function" is a trap - the final STATE is different (liquid vs gas), so ΔH is different.`,
    ['Which way is the water going: gas → liquid or liquid → gas?', 'Condensation ΔH = −ΔH(vap) per mole; there are 2 mol of water.', '−802.3 + 2(−44.0).']);
}
{
  const ok = 66.4 - 180.6;
  mcq(9, 3, 'Exam',
    'Given N₂(g) + O₂(g) → 2NO(g), ΔH = +180.6 kJ and N₂(g) + 2O₂(g) → 2NO₂(g), ΔH = +66.4 kJ, find ΔH for 2NO(g) + O₂(g) → 2NO₂(g).',
    fx(ok, 1) + ' kJ', [sfx(66.4 + 180.6, 1) + ' kJ', sfx(-ok, 1) + ' kJ', fx(ok / 2, 2) + ' kJ', fx(-(66.4 + 180.6), 1) + ' kJ'],
    `NO must be a reactant, so reverse the first equation: 2NO → N₂ + O₂, ΔH = −180.6 kJ. Keep the second: N₂ + 2O₂ → 2NO₂, +66.4 kJ. Adding cancels N₂ and one O₂: 2NO + O₂ → 2NO₂, ΔH = −180.6 + 66.4 = ${fx(ok, 1)} kJ. +247.0 kJ adds without reversing; +114.2 kJ reverses the wrong equation; −57.10 kJ halves it (the target already has 2 NO₂, like the given equations); −247.0 kJ reverses both.`,
    ['Which given equation has NO on the wrong side?', 'Reverse it (change the sign), keep the other, and add.', '−180.6 + 66.4.']);
}
{
  const ok = -393.5 + 2 * -285.8 + 890.3;
  mcq(9, 4, 'Exam',
    'Find ΔH°f of CH₄(g), the ΔH of C(graphite) + 2H₂(g) → CH₄(g), from: (1) CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l), ΔH = −890.3 kJ; (2) C(graphite) + O₂(g) → CO₂(g), ΔH = −393.5 kJ; (3) H₂(g) + ½O₂(g) → H₂O(l), ΔH = −285.8 kJ.',
    fx(ok, 1) + ' kJ', [sfx(-ok, 1) + ' kJ', sfx(-393.5 - 285.8 + 890.3, 1) + ' kJ', fx(-393.5 + 2 * -285.8 - 890.3, 1) + ' kJ', fx(-393.5 - 285.8 - 890.3, 1) + ' kJ'],
    `Keep (2): −393.5. Double (3): 2(−285.8) = −571.6. Reverse (1) so CH₄ is a product: +890.3. Sum: −393.5 − 571.6 + 890.3 = ${fx(ok, 1)} kJ (Table 6.3 lists −74.9 kJ/mol, so this checks). +${fx(-ok, 1)} kJ has the sign backwards; +${fx(-393.5 - 285.8 + 890.3, 1)} kJ forgets to double (3); ${fx(-393.5 + 2 * -285.8 - 890.3, 1)} kJ forgets to reverse (1); ${fx(-393.5 - 285.8 - 890.3, 1)} kJ makes both mistakes.`,
    ['A formation reaction makes 1 mol CH₄ as a product, from C and H₂.', 'Flip the combustion of CH₄; double the H₂ combustion; keep the C combustion.', '−393.5 + 2(−285.8) + 890.3.']);
}

/* ---------- Silberberg sample-problem types and lecture concepts ---------- */
{
  const dE = -2500 + 860;
  mcq(7, 3, 'Exam',
    'A system releases 2.50 kJ of heat to its surroundings while the surroundings do 860 J of work on it. What is ΔE of the system?',
    fx(dE / 1000, 2) + ' kJ', [sfx(-dE / 1000, 2) + ' kJ', fx((-2500 - 860) / 1000, 2) + ' kJ', sfx((2500 + 860) / 1000, 2) + ' kJ', '+857.5 J'],
    `ΔE = q + w with signs from the system’s point of view. Heat released: q = −2.50 kJ = −2500 J. Work done ON the system: w = +860 J. ΔE = −2500 + 860 = ${fx(dE, 0)} J = ${fx(dE / 1000, 2)} kJ. +${fx(-dE / 1000, 2)} flips both signs; ${fx((-2500 - 860) / 1000, 2)} kJ makes w negative (that would be work done BY the system); +3.36 kJ takes both as positive; +857.5 J adds 860 to −2.50 without converting kJ to J.`,
    ['Released → q negative. Work done ON the system → w positive.', 'ΔE = q + w, both in the same units.', '−2500 J + 860 J.']);
}
{
  const w = -1.20 * (7.75 - 2.50) * 101.3, dE = 1450 + w;
  mcq(7, 4, 'Exam',
    'A gas in a cylinder absorbs 1.45 kJ of heat and expands from 2.50 L to 7.75 L against a constant external pressure of 1.20 atm. What is ΔE of the gas? (1 L·atm = 101.3 J)',
    sfx(dE, 0) + ' J', [sfx(1450 - w, 0) + ' J', sfx(1450 - 1.20 * 5.25, 0) + ' J', fx(-dE, 0) + ' J', sfx(1450 - 1.20 * 7.75 * 101.3, 0) + ' J'],
    `w = −PΔV = −(1.20 atm)(7.75 − 2.50 L) = −6.30 L·atm × 101.3 J/(L·atm) = ${fx(w, 1)} J (an expanding gas does work on the surroundings, so w < 0). q = +1450 J (absorbed). ΔE = q + w = 1450 − ${fx(-w, 1)} = ${sfx(dE, 0)} J. +${fx(1450 - w, 0)} J gives w the wrong sign; +${fx(1450 - 1.20 * 5.25, 0)} J never converts L·atm to J; ${fx(-dE, 0)} J flips the final sign; +${fx(1450 - 1.20 * 7.75 * 101.3, 0)} J uses the final volume instead of ΔV.`,
    ['Expansion against a pressure: the system does work, so w is negative.', 'w = −PΔV in L·atm, × 101.3 J; then ΔE = q + w.', `w = ${fx(w, 1)} J; q = +1450 J.`]);
}
mcq(7, 3, 'Exam',
  'Silberberg-style enthalpy diagram: for the freezing of water, H₂O(l) → H₂O(s), which description is correct?',
  'H₂O(s) lies below H₂O(l); ΔH < 0; heat is released to the surroundings',
  ['H₂O(s) lies above H₂O(l); ΔH > 0; heat is absorbed from the surroundings', 'H₂O(s) lies below H₂O(l); ΔH > 0; heat is absorbed from the surroundings', 'H₂O(s) lies above H₂O(l); ΔH < 0; heat is released to the surroundings', 'Both lie at the same level because the temperature stays at 0 °C, so ΔH = 0'],
  'Melting is endothermic (the lecture slide: H₂O(s) → H₂O(l) has ΔH > 0, "heat in"). Freezing is the reverse, so ΔH < 0: the product, ice, has LOWER enthalpy and sits below the liquid on the diagram, and the difference leaves as heat. The diagram, the sign and the words must agree: "below" ↔ ΔH < 0 ↔ released. A phase change at constant temperature still has ΔH ≠ 0 (ΔH(fus) = 6.02 kJ/mol).',
  ['Is melting endothermic or exothermic? Freezing is its reverse.', 'Exothermic: products lower than reactants, ΔH negative, heat out.', 'Ice has less enthalpy than liquid water.']);
{
  const M = 12 * A.C + 22 * A.H + 11 * A.O, q = 10.25 * (25.30 - 22.40), n = 1.800 / M, perMol = q / n;
  num(7, 4, 'Exam',
    'Bomb calorimetry (Silberberg SP 6.7 type): 1.800 g of sucrose, C₁₂H₂₂O₁₁, burns in a bomb calorimeter whose heat capacity is 10.25 kJ/K. The temperature rises from 22.40 °C to 25.30 °C. How much heat is released per MOLE of sucrose? Enter a positive number in kJ/mol.',
    sci(perMol, 3) + ' kJ/mol', Number(perMol.toFixed(0)),
    `q(calorimeter) = C·ΔT = (10.25 kJ/K)(2.90 K) = ${fx(q, 3)} kJ released by the sample. Molar mass C₁₂H₂₂O₁₁ = 12(12.01) + 22(1.008) + 11(16.00) = ${fx(M, 2)} g/mol; mol = 1.800/${fx(M, 2)} = ${sci(n, 4)} mol. Heat per mole = ${fx(q, 3)} / ${sci(n, 4)} = ${fx(perMol, 0)} kJ/mol ≈ ${sci(perMol, 3)} kJ/mol. A bomb calorimeter is given as one heat capacity in kJ/K, so there is no m·c here.`,
    ['A bomb calorimeter’s heat capacity already includes the water and the steel.', 'q = C(cal) × ΔT, then divide by moles of sucrose.', `${fx(q, 3)} kJ ÷ (1.800 g ÷ ${fx(M, 2)} g/mol).`]);
}
mcq(9, 3, 'Exam',
  'Silberberg SP 6.10 type: which equation’s ΔH° is the standard enthalpy of formation of CH₃OH(l)?',
  'C(graphite) + 2H₂(g) + ½O₂(g) → CH₃OH(l)',
  ['2C(graphite) + 4H₂(g) + O₂(g) → 2CH₃OH(l)', 'C(diamond) + 2H₂(g) + ½O₂(g) → CH₃OH(l)', 'C(g) + 4H(g) + O(g) → CH₃OH(l)', 'CO(g) + 2H₂(g) → CH₃OH(l)'],
  'A formation equation makes exactly ONE mole of the compound from its ELEMENTS in their STANDARD STATES (298 K, 1 atm). Carbon’s standard state is graphite, hydrogen and oxygen are H₂(g) and O₂(g), and a ½ coefficient is fine. The doubled equation makes 2 mol (ΔH would be 2ΔH°f); diamond is not carbon’s standard state (ΔH°f = 1.9 kJ/mol); gaseous atoms are not the standard states; CO is a compound, not an element.',
  ['Exactly 1 mol of product.', 'Only elements, each in its standard state, as reactants.', 'Graphite, H₂(g), O₂(g) - fractions allowed.']);
mcq(9, 1, 'Exam',
  'Which substance has ΔH°f = 0 at 298 K?',
  'Br₂(l)', ['O₃(g)', 'C(diamond)', 'Cl(g)', 'Na(g)'],
  'ΔH°f = 0 only for an element in its standard state. Bromine is a liquid at 298 K, so Br₂(l) is its standard state. O₃ is not the standard form of oxygen (O₂ is; ΔH°f(O₃) = 143 kJ/mol); diamond is not the standard form of carbon (graphite is; 1.9 kJ/mol); Cl(g) atoms and Na(g) are not the standard states (121.0 and 107.8 kJ/mol in Table 6.3).',
  ['Being an element is not enough.', 'The element must be in its most stable form at 298 K and 1 atm.', 'Which element is a liquid at room temperature?']);
mcq(7, 4, 'Exam',
  'At constant pressure, 2H₂(g) + O₂(g) → 2H₂O(l) releases heat and the system’s volume shrinks sharply (3 mol of gas become liquid). Which statement is correct?',
  'w > 0, and ΔE is less negative than ΔH',
  ['w < 0, and ΔE is more negative than ΔH', 'w > 0, and ΔE is more negative than ΔH', 'w = 0, and ΔE = ΔH exactly', 'w < 0, and ΔE is less negative than ΔH'],
  'At constant P, q = ΔH (negative here) and w = −PΔV. The volume decreases (ΔV < 0), so w > 0: the surroundings push the system together and do work ON it. ΔE = q + w = ΔH + (a positive number), so ΔE is less negative than ΔH. w < 0 would need an expansion; w = 0 would need no volume change (true only when the moles of gas do not change).',
  ['Which way does the volume change?', 'w = −PΔV; at constant pressure ΔE = ΔH + w.', 'ΔV < 0 → w > 0 → ΔE = ΔH + something positive.']);
{
  const n = 250.0 / (2 * A.H + A.O), q = n * 40.7;
  mcq(8, 3, 'Exam',
    'Like the lecture sweat question: an athlete evaporates 250. mL of water as sweat. How much heat does this carry away from the body? (ΔH(vap) = 40.7 kJ/mol; d = 1.00 g/mL)',
    g(q, 3) + ' kJ', [sci(250.0 * 40.7, 3) + ' kJ', g(n * 6.02, 3) + ' kJ', g(250.0 / 16.00 * 40.7, 3) + ' kJ', g(n, 3) + ' kJ'],
    `250. mL × 1.00 g/mL = 250. g; mol H₂O = 250. / 18.016 = ${g(n, 4)} mol. q = ${g(n, 4)} mol × 40.7 kJ/mol = ${g(q, 3)} kJ absorbed by the evaporating water, i.e. carried away from the body. ${sci(250.0 * 40.7, 3)} kJ treats 250 g as 250 mol; ${g(n * 6.02, 3)} kJ uses the heat of FUSION (6.02) - but sweat evaporates, it does not melt; ${g(250.0 / 16.00 * 40.7, 3)} kJ uses 16.00 g/mol (just O) for water; ${g(n, 3)} kJ stops at moles.`,
    ['Evaporation is vaporization: use ΔH(vap), per mole.', 'mL → g → mol of water, then × 40.7 kJ/mol.', `250./18.016 = ${g(n, 4)} mol.`]);
}

/* ---------- cross-topic thermochemistry ---------- */
const mgQ = 100.0 * cw * 6.89, mgN = 0.1500 / A.Mg, mgDH = -mgQ / mgN / 1000;
num(8, 4, 'Exam',
  'Hess’s-law lab, part 1. 0.1500 g of Mg ribbon dissolves in excess HCl(aq) in a coffee-cup calorimeter: Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g). Take the solution mass as 100.0 g (c = 4.184 J/(g·°C)); the calorimeter absorbs no heat. The temperature rises by 6.89 °C. What is ΔH₁ per mole of Mg? Enter a number in kJ/mol (include the sign).',
  fx(mgDH, 0) + ' kJ/mol', Number(mgDH.toFixed(1)),
  `q(soln) = (100.0 g)(4.184)(6.89) = ${fx(mgQ, 1)} J, so q(rxn) = −${fx(mgQ, 1)} J. mol Mg = 0.1500 / 24.31 = ${sci(mgN, 4)} mol (Mg is limiting; HCl is in excess). ΔH₁ = −${fx(mgQ / 1000, 4)} kJ / ${sci(mgN, 4)} mol = ${fx(mgDH, 1)} kJ/mol ≈ ${fx(mgDH, 0)} kJ/mol.`,
  ['The temperature rose - what sign does ΔH₁ have?', 'q(rxn) = −m·c·ΔT; divide by moles of the limiting reactant, Mg.', `−${fx(mgQ, 0)} J ÷ ${sci(mgN, 4)} mol.`]);
{
  const d1 = Number(mgDH.toFixed(0)), ok = d1 + 146.0 - 285.8;
  mcq(9, 4, 'Exam',
    `Hess’s-law lab, part 2. Use your calorimetry result ΔH₁ = ${fx(d1, 0)} kJ for Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g), together with ΔH₂ = −146.0 kJ for MgO(s) + 2HCl(aq) → MgCl₂(aq) + H₂O(l) and ΔH₃ = −285.8 kJ for H₂(g) + ½O₂(g) → H₂O(l). What is ΔH°f of MgO(s), the ΔH of Mg(s) + ½O₂(g) → MgO(s)?`,
    fx(ok, 1) + ' kJ', [fx(d1 - 146.0 - 285.8, 1) + ' kJ', fx(d1 + 146.0 + 285.8, 1) + ' kJ', fx(d1 - 146.0 + 285.8, 1) + ' kJ', sfx(-ok, 1) + ' kJ'],
    `Keep (1): Mg + 2HCl → MgCl₂ + H₂, ${fx(d1, 0)} kJ. Reverse (2) so MgO is a product: MgCl₂ + H₂O → MgO + 2HCl, +146.0 kJ. Keep (3): H₂ + ½O₂ → H₂O, −285.8 kJ. MgCl₂, 2HCl, H₂ and H₂O cancel, leaving Mg + ½O₂ → MgO with ΔH = ${fx(d1, 0)} + 146.0 − 285.8 = ${fx(ok, 1)} kJ. (The tabulated value is −601.6 kJ/mol; the lab is within about 1%.) ${fx(d1 - 146.0 - 285.8, 1)} kJ does not reverse (2); ${fx(d1 + 146.0 + 285.8, 1)} kJ reverses (3) as well; ${fx(d1 - 146.0 + 285.8, 1)} kJ makes both sign errors; +${fx(-ok, 1)} kJ flips the whole answer.`,
    ['MgO must end up as a product; which given equation has it as a reactant?', 'Keep (1), reverse (2), keep (3), then add.', `${fx(d1, 0)} + 146.0 + (−285.8).`]);
}
mcq(9, 4, 'Exam',
  'Cross-check of recitation Q2. Your coffee-cup experiment gave ΔH ≈ −56 kJ per mole of HCl for HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l). Using ΔH°f (kJ/mol) H⁺(aq) 0, OH⁻(aq) −230.0, H₂O(l) −285.8, compute ΔH° for the net ionic reaction H⁺(aq) + OH⁻(aq) → H₂O(l). What do you conclude?',
  '−55.8 kJ/mol, which agrees with the experiment',
  ['+55.8 kJ/mol, so the experiment has the wrong sign', '−515.8 kJ/mol, so the calorimeter lost most of the heat', '−285.8 kJ/mol, because the ions are not elements and are left out', 'No comparison is possible, because the experiment used HCl and NaOH rather than H⁺ and OH⁻'],
  'ΔH° = ΔH°f(H₂O(l)) − [ΔH°f(H⁺) + ΔH°f(OH⁻)] = −285.8 − (0 − 230.0) = −55.8 kJ/mol, within 0.4% of the measured −56 kJ/mol. Na⁺ and Cl⁻ are spectator ions: they appear unchanged on both sides, so any strong acid + strong base gives the same ΔH per mole of water - which is exactly why the comparison works. +55.8 subtracts in the wrong order; −515.8 adds −230.0 instead of subtracting it; ions in solution DO have formation enthalpies and must be included.',
  ['Na⁺ and Cl⁻ are spectators - do they change the heat?', 'Products − reactants, using the three values given.', '−285.8 − (0 + (−230.0)).']);

/* =====================================================================
   LIGHT AND QUANTUM THEORY (lessons 10, 11, 12)
   ===================================================================== */
const ORDER_WHY_TAIL = ' Memory aid: wavelength and energy run in OPPOSITE directions. Gamma rays are the SHORT, high-energy end; radio waves are the LONG, low-energy end.';

/* --- Week 7 Q1 (exact) --- */
mcq(10, 3, 'Worksheet',
  'Recitation Week 7, Q1. Arrange gamma rays, infrared, visible light, ultraviolet and radio waves in order of INCREASING wavelength.',
  'gamma ray < ultraviolet < visible < infrared < radio',
  ['radio < infrared < visible < ultraviolet < gamma ray', 'gamma ray < visible < ultraviolet < infrared < radio', 'ultraviolet < gamma ray < visible < infrared < radio', 'gamma ray < ultraviolet < infrared < visible < radio'],
  'Shortest to longest wavelength: gamma (about 10⁻¹² m) < ultraviolet (10-400 nm) < visible (400-700 nm) < infrared (700 nm-1 mm) < radio (cm to km). "radio < infrared < visible < ultraviolet < gamma" is the exact reverse - that is DECREASING wavelength (increasing energy), the order written on the worksheet. The other lists swap one neighbouring pair (UV sits between gamma and visible; IR sits between visible and radio).' + ORDER_WHY_TAIL,
  ['Which end of the spectrum has the shortest waves?', 'Gamma rays are the most energetic, so they have the shortest wavelength.', 'Start with gamma; UV is just shorter than visible; IR just longer.']);

/* --- Week 7 Q2 (exact) --- */
{
  const E = hc / 635e-9, kJ = E * NA / 1000;
  num(10, 3, 'Worksheet',
    'Recitation Week 7, Q2. What is the energy of one MOLE of photons with wavelength 635 nm? Enter a number in kJ/mol.',
    g(kJ, 3) + ' kJ/mol', Number(kJ.toFixed(2)),
    `Per photon: E = hc/λ = (6.626 × 10⁻³⁴ J·s)(2.998 × 10⁸ m/s) / (635 × 10⁻⁹ m) = ${sci(E, 4)} J. Per mole: × 6.022 × 10²³ = ${sci(E * NA, 4)} J/mol; ÷ 1000 = ${g(kJ, 3)} kJ/mol. Two conversions: nm → m first, J → kJ last.`,
    ['Find the energy of ONE photon first.', 'E = hc/λ with λ in meters; then × N_A and ÷ 1000.', `One photon: ${sci(E, 4)} J.`]);
}

/* --- Week 7 Q3 (exact) --- */
{
  const nu = 96.5e6, lam = c / nu;
  mcq(10, 2, 'Worksheet',
    'Recitation Week 7, Q3. The radio station WAZY broadcasts at 96.5 MHz. What is the wavelength of its radio waves?',
    g(lam, 3) + ' m', [sci(c / 96.5, 3) + ' m', g(nu / c, 3) + ' m', sci(c * nu, 3) + ' m', sci(c / 96.5e9, 3) + ' m'],
    `λ = c/ν = (2.998 × 10⁸ m/s) / (96.5 × 10⁶ s⁻¹) = ${g(lam, 4)} m ≈ ${g(lam, 3)} m. M (mega) = 10⁶. ${sci(c / 96.5, 3)} m forgets the "mega"; ${g(nu / c, 3)} m divides the wrong way (ν/c); ${sci(c * nu, 3)} m multiplies; ${sci(c / 96.5e9, 3)} m treats MHz as GHz (10⁹). Radio waves are meters long, as expected.`,
    ['Radio waves should be a few meters long.', 'λ = c/ν with ν in s⁻¹ (Hz).', '96.5 MHz = 9.65 × 10⁷ Hz.']);
}

/* --- Week 7 Q4 (exact, three parts) --- */
const W7Q4 = 'Recitation Week 7, Q4. A green laser pointer emits light of wavelength 532 nm.';
const nu532 = c / 532e-9, E532 = h * nu532;
mcq(10, 2, 'Worksheet', W7Q4 + ' Part (a): what is the frequency of this light?',
  sci(nu532, 3) + ' Hz', [sci(c / 532, 3) + ' Hz', sci(532e-9 / c, 3) + ' Hz', sci(c * 532e-9, 3) + ' Hz', sci(c / 532e-12, 3) + ' Hz'],
  `ν = c/λ = (2.998 × 10⁸ m/s) / (532 × 10⁻⁹ m) = ${sci(nu532, 4)} s⁻¹ ≈ ${sci(nu532, 3)} Hz. Visible light is always around 10¹⁴-10¹⁵ Hz. ${sci(c / 532, 3)} Hz leaves λ in nm; ${sci(532e-9 / c, 3)} Hz divides λ by c; ${sci(c * 532e-9, 3)} Hz multiplies; ${sci(c / 532e-12, 3)} Hz uses 10⁻¹² (pm) for nm.`,
  ['Convert 532 nm to meters first.', 'ν = c/λ.', '2.998 × 10⁸ ÷ 5.32 × 10⁻⁷.']);
num(10, 2, 'Worksheet', W7Q4 + ' Part (b): what is the energy of ONE photon? Enter a number in J.',
  sci(E532, 3) + ' J', Number(E532.toPrecision(4)),
  `E = hν = (6.626 × 10⁻³⁴ J·s)(${sci(nu532, 4)} s⁻¹) = ${sci(E532, 4)} J ≈ ${sci(E532, 3)} J (or E = hc/λ directly). This is per photon - no Avogadro’s number. Type it as 3.73e-19.`,
  ['One photon → no Avogadro’s number.', 'E = hν using the frequency from part (a).', `6.626 × 10⁻³⁴ × ${sci(nu532, 4)}.`]);
mcq(10, 2, 'Worksheet', W7Q4 + ' Part (c): without calculating, would a 700 nm red photon have more or less energy than the 532 nm green photon?',
  'Less, because the longer wavelength means a lower frequency, and E = hν',
  ['More, because energy increases with wavelength', 'More, because red light is at the high-energy end of the visible spectrum', 'The same, because both are visible photons travelling at c', 'Less, because red light has a smaller amplitude'],
  'E = hc/λ: energy is INVERSELY proportional to wavelength. 700 nm > 532 nm, so the red photon has lower frequency and less energy (about 2.84 × 10⁻¹⁹ J vs 3.73 × 10⁻¹⁹ J). Red is the LOW-energy end of the visible range (violet is the high end). All photons travel at c, but their energies differ. Amplitude sets brightness (how many photons), not the energy of each photon.',
  ['E = hc/λ - is λ on top or on the bottom?', 'Longer wavelength → lower frequency.', 'Lower frequency → less energy per photon.']);

/* --- Week 7 Q5 (exact, two parts) --- */
{
  const lam = h / (9.11e-31 * 2e6);
  mcq(12, 3, 'Worksheet',
    'Recitation Week 7, Q5. An electron (mass 9.11 × 10⁻³¹ kg) moves at 2 × 10⁶ m/s. Part (a): what is its de Broglie wavelength?',
    sci(lam, 2) + ' m', [sci(h / (9.11e-28 * 2e6), 2) + ' m', sci(1 / lam, 2) + ' m', sci(9.11e-31 * 2e6, 2) + ' m', sci(h / (0.5 * 9.11e-31 * 4e12), 2) + ' m'],
    `λ = h/(mv) = (6.626 × 10⁻³⁴ J·s) / [(9.11 × 10⁻³¹ kg)(2 × 10⁶ m/s)] = ${sci(lam, 4)} m. Report it as the worksheet key does, ${sci(lam, 2)} m (the speed is read as 2.0 × 10⁶ m/s, so 2 sig figs; copying every calculator digit, 3.637 × 10⁻¹⁰, was the sig-fig slip on the worksheet). That is about the size of an atom. ${sci(h / (9.11e-28 * 2e6), 2)} m uses the mass in grams; ${sci(1 / lam, 2)} m is mv/h, upside down; ${sci(9.11e-31 * 2e6, 2)} is the momentum mv, not a wavelength; ${sci(h / (0.5 * 9.11e-31 * 4e12), 2)} m divides by the kinetic energy ½mv² instead of the momentum mv. (1 J·s = 1 kg·m²/s, so h/(kg·m/s) leaves meters.)`,
    ['de Broglie uses momentum, mv.', 'λ = h/(mv) with m in kg and v in m/s.', '6.626 × 10⁻³⁴ ÷ (9.11 × 10⁻³¹ × 2 × 10⁶).']);
}
mcq(12, 2, 'Worksheet',
  'Recitation Week 7, Q5 part (b). Without calculating: if the electron moved twice as fast, what would happen to its de Broglie wavelength?',
  'It would decrease to half its value',
  ['It would double', 'It would stay the same, because λ depends only on the mass', 'It would decrease to one quarter of its value', 'It would increase by a factor of √2'],
  'λ = h/(mv): λ is inversely proportional to v. Doubling v doubles the momentum and halves λ. One quarter would need λ ∝ 1/v² (confusing momentum with kinetic energy); √2 has no basis here; mass is only one of the two factors in the momentum.',
  ['Is v in the numerator or the denominator of λ = h/(mv)?', 'Inverse proportion: double one, halve the other.', 'Faster electron → shorter wavelength.']);

/* --- Week 7 Q6 (exact, two parts) --- */
{
  const E = h * 7.50e14;
  mcq(10, 2, 'Worksheet',
    'Recitation Week 7, Q6. An ultraviolet photon has frequency 7.50 × 10¹⁴ Hz. Part (a): what is the energy of one photon?',
    sci(E, 3) + ' J', [sci(h / 7.50e14, 3) + ' J', sci(E * NA, 3) + ' J', sci(E / 1000, 3) + ' J', sci(E / c, 3) + ' J'],
    `E = hν = (6.626 × 10⁻³⁴ J·s)(7.50 × 10¹⁴ s⁻¹) = ${sci(E, 3)} J. ${sci(h / 7.50e14, 3)} J divides h by ν; ${sci(E * NA, 3)} J is the energy of a MOLE of photons; ${sci(E / 1000, 3)} J is the right number converted to kJ but labelled J; ${sci(E / c, 3)} J divides by c as if ν were a wavelength.`,
    ['A single photon: E = hν.', 'J·s × s⁻¹ = J.', '6.626 × 10⁻³⁴ × 7.50 × 10¹⁴.']);
  num(10, 3, 'Worksheet',
    'Recitation Week 7, Q6 part (b). What is the energy of one MOLE of these 7.50 × 10¹⁴ Hz photons? Enter a number in kJ/mol.',
    g(E * NA / 1000, 3) + ' kJ/mol', Number((E * NA / 1000).toFixed(2)),
    `Per photon ${sci(E, 4)} J (part a). × 6.022 × 10²³ photons/mol = ${sci(E * NA, 4)} J/mol; ÷ 1000 = ${g(E * NA / 1000, 3)} kJ/mol.`,
    ['Start from the energy of one photon.', 'Multiply by Avogadro’s number, then convert J → kJ.', `${sci(E, 4)} × 6.022 × 10²³ ÷ 1000.`]);
}

/* --- Week 7 Q7 (exact) --- */
mcq(10, 2, 'Worksheet',
  'Recitation Week 7, Q7. Without calculating: does a photon of frequency 4.00 × 10¹⁴ Hz have more or less energy than the 7.50 × 10¹⁴ Hz UV photon from Q6?',
  'Less, because E = hν and its frequency is lower',
  ['More, because a lower frequency means a longer wavelength, and energy grows with wavelength', 'The same, because every photon travels at the speed of light', 'Less, because a lower-frequency photon has a smaller amplitude', 'It cannot be decided without the wavelength of each photon'],
  'E = hν: energy is directly proportional to frequency, so 4.00 × 10¹⁴ Hz (red / near-infrared) carries less energy than 7.50 × 10¹⁴ Hz (UV) - in fact 4.00/7.50 = 0.533 times as much. Energy goes DOWN as wavelength goes up. Speed is the same for all photons; amplitude is brightness; and frequency alone is enough to compare energies.',
  ['Which equation links energy to frequency directly?', 'E = hν - double ν, double E.', '4.00 × 10¹⁴ < 7.50 × 10¹⁴.']);

/* --- Week 7 Q8 (exact, two parts) --- */
const dE51 = -RHW * (1 / 1 - 1 / 25), lam51 = hc / Math.abs(dE51);
const W7Q8 = 'Recitation Week 7, Q8. A hydrogen atom drops from n = 5 to n = 1. Use Eₙ = −2.179 × 10⁻¹⁸ J (1/n²).';
mcq(11, 3, 'Worksheet', W7Q8 + ' Part (a): what is the wavelength of the emitted photon?',
  fx(lam51 * 1e9, 1) + ' nm',
  [fx(hc / (RHW * (1 - 1 / 5)) * 1e9, 0) + ' nm', sci(hc / (RHW / 25) * 1e9, 3) + ' nm', fx(hc / (RHW * (1 / 4 - 1 / 25)) * 1e9, 0) + ' nm', sci(hc / (Math.abs(dE51) * NA) * 1e9, 3) + ' nm'],
  `ΔE(atom) = −2.179 × 10⁻¹⁸ J (1/1² − 1/5²) = −2.179 × 10⁻¹⁸ × 0.96 = ${sci(dE51, 4)} J (negative: the atom loses energy). The photon carries |ΔE| = ${sci(-dE51, 4)} J. λ = hc/E = (1.9865 × 10⁻²⁵ J·m) / (${sci(-dE51, 4)} J) = ${sci(lam51, 4)} m = ${fx(lam51 * 1e9, 1)} nm (ultraviolet, Lyman series). Use the energy of ONE photon here - multiplying by Avogadro’s number first gives the absurd ${sci(hc / (Math.abs(dE51) * NA) * 1e9, 3)} nm (the worksheet mistake). ${fx(hc / (RHW * (1 - 1 / 5)) * 1e9, 0)} nm forgets to square n; ${sci(hc / (RHW / 25) * 1e9, 3)} nm uses only the n = 5 term; ${fx(hc / (RHW * (1 / 4 - 1 / 25)) * 1e9, 0)} nm ends at n = 2 instead of n = 1.`,
  ['Find ΔE for ONE atom, then λ from that one photon.', 'ΔE = −2.179 × 10⁻¹⁸ (1/n²final − 1/n²initial); λ = hc/|ΔE|.', `|ΔE| = 2.179 × 10⁻¹⁸ × (1 − 1/25) = ${sci(-dE51, 4)} J.`]);
mcq(11, 3, 'Worksheet', W7Q8 + ' Part (b): what is ΔE for one MOLE of hydrogen atoms making this transition (the change in energy of the atoms)?',
  sci(dE51 * NA, 4) + ' J',
  [sci(-dE51 * NA, 4).replace(/^/, '+') + ' J', sci(dE51, 4) + ' J', sci(dE51 * NA / 1000, 4) + ' J', sci(dE51 / NA, 4) + ' J'],
  `Per atom ΔE = ${sci(dE51, 4)} J. Per mole: × 6.022 × 10²³ = ${sci(dE51 * NA, 4)} J (= ${fx(dE51 * NA / 1000, 0)} kJ/mol). The sign is negative because the atoms EMIT energy as they fall to n = 1. +${sci(-dE51 * NA, 4)} J is the energy of the emitted mole of photons, not the change for the atoms; ${sci(dE51, 4)} J is per ATOM (the per-atom/per-mole mix-up); ${sci(dE51 * NA / 1000, 4)} J is the kJ number labelled J; ${sci(dE51 / NA, 4)} J divides by Avogadro’s number instead of multiplying.`,
  ['The atoms emit, so their energy goes down.', 'Per-atom ΔE × (atoms per mole).', `${sci(dE51, 4)} J × 6.022 × 10²³.`]);

/* ---------- spectrum ordering (the student’s weak spot) ---------- */
mcq(10, 3, 'Trap',
  'Arrange microwaves, X-rays, visible light, radio waves and ultraviolet in order of DECREASING frequency.',
  'X-ray > ultraviolet > visible > microwave > radio',
  ['radio > microwave > visible > ultraviolet > X-ray', 'X-ray > visible > ultraviolet > microwave > radio', 'ultraviolet > X-ray > visible > microwave > radio', 'X-ray > ultraviolet > visible > radio > microwave'],
  'Highest frequency = shortest wavelength = highest energy: X-ray, then ultraviolet, visible, microwave, and radio last (lowest frequency, longest waves). "radio > … > X-ray" is the increasing-frequency order read backwards. UV lies between X-rays and visible light; microwaves lie between infrared and radio.' + ORDER_WHY_TAIL,
  ['Frequency and energy go up together.', 'The high-frequency end is X-rays/gamma; the low end is radio.', 'X-ray, UV, visible, microwave, radio - check the direction asked.']);
mcq(10, 3, 'Trap',
  'Which list is in order of INCREASING energy per photon?',
  'radio < microwave < infrared < visible < ultraviolet',
  ['ultraviolet < visible < infrared < microwave < radio', 'radio < infrared < microwave < visible < ultraviolet', 'microwave < radio < infrared < visible < ultraviolet', 'radio < microwave < visible < infrared < ultraviolet'],
  'Energy per photon E = hν rises with frequency and falls with wavelength, so increasing energy = decreasing wavelength: radio (longest) < microwave < infrared < visible < ultraviolet. The reversed list is increasing WAVELENGTH. Microwaves sit between radio and infrared; infrared sits just below visible.' + ORDER_WHY_TAIL,
  ['Increasing energy is the same as decreasing wavelength.', 'Start from the longest waves.', 'radio, then microwave, then infrared...']);
mcq(10, 3, 'Trap',
  'Which lists the colors of visible light in order of INCREASING wavelength?',
  'violet < blue < green < yellow < red',
  ['red < yellow < green < blue < violet', 'violet < green < blue < yellow < red', 'blue < violet < green < yellow < red', 'violet < blue < green < red < yellow'],
  'Visible light runs from violet (about 400 nm, shortest, most energetic) to red (about 700 nm, longest, least energetic): violet < blue < green < yellow < red. "red < … < violet" is decreasing wavelength - the same reversal as on the worksheet. Ultra-VIOLET lies just beyond violet; infra-RED just beyond red: the names tell you which end is which.',
  ['Ultraviolet is next to which visible color?', 'Violet ≈ 400 nm, red ≈ 700 nm.', 'Start at violet and end at red.']);
mcq(10, 3, 'Trap',
  'Asked for INCREASING wavelength, a student wrote: radio, infrared, visible, ultraviolet, gamma. Reading the student’s list from left to right, which quantity actually INCREASES?',
  'Frequency and energy per photon - the list is in DECREASING wavelength',
  ['Wavelength, so the list answers the question', 'Both wavelength and frequency', 'The speed of the radiation', 'Nothing - the list is not in any physical order'],
  'Radio has the longest wavelength and gamma the shortest, so wavelength DECREASES along the student’s list, while frequency (ν = c/λ) and photon energy (E = hν) increase. Wavelength and frequency can never increase together, because their product is fixed at c. All electromagnetic radiation travels at the same speed, c, in a vacuum.',
  ['Which end of the list has the longest waves?', 'λν = c, so λ and ν always move in opposite directions.', 'Gamma rays have the shortest wavelength and the highest energy.']);
mcq(10, 3, 'Trap',
  'Arrange these photons in order of INCREASING frequency: a red photon (700 nm), a gamma-ray photon, an infrared photon, a microwave photon and a violet photon (400 nm).',
  'microwave < infrared < red < violet < gamma ray',
  ['gamma ray < violet < red < infrared < microwave', 'microwave < infrared < violet < red < gamma ray', 'infrared < microwave < red < violet < gamma ray', 'red < violet < infrared < microwave < gamma ray'],
  'Increasing frequency = decreasing wavelength. Microwaves (cm) are longest, then infrared (μm), then red 700 nm, then violet 400 nm, then gamma rays (pm): microwave < infrared < red < violet < gamma. Swapping red and violet treats the larger number (700 nm) as the higher frequency - it is the lower one.',
  ['Turn the question into wavelength: increasing frequency = decreasing wavelength.', 'Which visible color has the shorter wavelength, red or violet?', 'Longest waves first: microwave, infrared, red...']);
mcq(10, 1, 'Exam',
  'Which region of the electromagnetic spectrum has wavelengths LONGER than visible light but SHORTER than microwaves?',
  'Infrared', ['Ultraviolet', 'X-ray', 'Radio', 'Gamma ray'],
  'In order of increasing wavelength: gamma < X-ray < ultraviolet < visible < infrared < microwave < radio. The region between visible and microwave is infrared ("below red"). Ultraviolet is on the SHORT side of visible - picking it is the same reversal as the worksheet error.',
  ['"Infra" means below - below red in frequency.', 'Which region is right next to red light?', 'Visible, then ___, then microwave.']);

/* ---------- Week 7 Q2 variations: kJ/mol ↔ wavelength ---------- */
{
  const Ep = 3.00e5 / NA, lam = hc / Ep;
  mcq(10, 3, 'Exam',
    'A mole of photons carries 3.00 × 10² kJ of energy. What is the wavelength of the light?',
    fx(lam * 1e9, 0) + ' nm', [sci(hc / 3.00e5 * 1e9, 3) + ' nm', sci(hc * NA / 300 * 1e9, 3) + ' nm', sci(lam, 3) + ' nm', sci(Ep / h, 3) + ' nm'],
    `Per photon: E = 3.00 × 10⁵ J/mol ÷ 6.022 × 10²³ = ${sci(Ep, 4)} J. λ = hc/E = 1.9865 × 10⁻²⁵ J·m / ${sci(Ep, 4)} J = ${sci(lam, 4)} m = ${fx(lam * 1e9, 0)} nm (violet edge). ${sci(hc / 3.00e5 * 1e9, 3)} nm skips Avogadro’s number (treats a mole of photons as one); ${sci(hc * NA / 300 * 1e9, 3)} nm leaves 300 in kJ; ${sci(lam, 3)} nm is the answer in meters labelled nm; ${sci(Ep / h, 3)} is the frequency E/h, not λ.`,
    ['λ = hc/E needs the energy of ONE photon, in J.', 'kJ/mol → J/mol (× 1000) → J/photon (÷ N_A).', `E per photon = ${sci(Ep, 4)} J.`]);
}
{
  const kJ = hc / 254e-9 * NA / 1000;
  num(10, 3, 'Exam',
    'A germicidal UV lamp emits at 254 nm. What is the energy of one mole of these photons? Enter a number in kJ/mol.',
    g(kJ, 3) + ' kJ/mol', Number(kJ.toFixed(2)),
    `E(photon) = hc/λ = 1.9865 × 10⁻²⁵ J·m / 2.54 × 10⁻⁷ m = ${sci(hc / 254e-9, 4)} J. × 6.022 × 10²³ = ${sci(hc / 254e-9 * NA, 4)} J/mol = ${g(kJ, 3)} kJ/mol - more than enough to break many chemical bonds, which is why UV-C damages DNA.`,
    ['Convert nm to m first.', 'E = hc/λ per photon, × N_A, ÷ 1000.', `${sci(hc / 254e-9, 4)} J × 6.022 × 10²³ ÷ 1000.`]);
}
{
  const Ep = 347000 / NA, lam = hc / Ep;
  mcq(10, 4, 'Exam',
    'The C–C bond energy is 347 kJ/mol. What is the LONGEST wavelength of light whose photons each carry enough energy to break one C–C bond?',
    fx(lam * 1e9, 0) + ' nm', [sci(hc / 347000 * 1e9, 3) + ' nm', sci(hc * NA / 347 * 1e9, 3) + ' nm', sci(Ep / h, 3) + ' nm', sci(lam, 3) + ' nm'],
    `One bond needs 347 000 J/mol ÷ 6.022 × 10²³ = ${sci(Ep, 4)} J. λ(max) = hc/E = 1.9865 × 10⁻²⁵ / ${sci(Ep, 4)} = ${sci(lam, 4)} m = ${fx(lam * 1e9, 0)} nm. Any LONGER wavelength has less energy per photon and cannot break the bond, however bright. ${sci(hc / 347000 * 1e9, 3)} nm forgets to divide by N_A; ${sci(hc * NA / 347 * 1e9, 3)} nm forgets kJ → J; ${sci(Ep / h, 3)} is a frequency (E/h); ${sci(lam, 3)} nm is meters mislabelled.`,
    ['Breaking ONE bond takes one photon - use energy per bond, not per mole.', 'E per bond = 347 × 10³ J ÷ N_A; λ = hc/E.', `E = ${sci(Ep, 4)} J.`]);
}

/* ---------- Week 7 Q3 variations: λ ↔ ν ---------- */
{
  const lam = c / 1.020e6;
  mcq(10, 2, 'Exam',
    'An AM radio station broadcasts at 1020 kHz. What is the wavelength of the signal?',
    fx(lam, 0) + ' m', [sci(c / 1020, 3) + ' m', sci(1.020e6 / c, 3) + ' m', sci(c * 1.020e6, 3) + ' m', g(c / 1.020e9, 3) + ' m'],
    `λ = c/ν = 2.998 × 10⁸ m/s ÷ 1.020 × 10⁶ s⁻¹ = ${fx(lam, 1)} m ≈ ${fx(lam, 0)} m. k (kilo) = 10³. ${sci(c / 1020, 3)} m forgets the kilo; ${sci(1.020e6 / c, 3)} m is ν/c; ${sci(c * 1.020e6, 3)} m multiplies; ${g(c / 1.020e9, 3)} m treats kHz as MHz.`,
    ['kHz = 10³ Hz.', 'λ = c/ν.', '2.998 × 10⁸ ÷ 1.020 × 10⁶.']);
}
{
  const lam = c / 2.45e9;
  mcq(10, 3, 'Exam',
    'A microwave oven operates at 2.45 GHz. What is the wavelength of the microwaves, in centimeters?',
    fx(lam * 100, 1) + ' cm', [fx(lam * 10, 2) + ' cm', fx(lam, 3) + ' cm', fx(2.45e9 / c, 2) + ' cm', sci(c / 2.45 * 100, 3) + ' cm'],
    `λ = c/ν = 2.998 × 10⁸ / 2.45 × 10⁹ = ${fx(lam, 4)} m; × 100 cm/m = ${fx(lam * 100, 1)} cm. ${fx(lam * 10, 2)} cm uses 10 cm per meter; ${fx(lam, 3)} cm is the meter value with no conversion; ${fx(2.45e9 / c, 2)} cm is ν/c; ${sci(c / 2.45 * 100, 3)} cm ignores the "giga" (10⁹).`,
    ['GHz = 10⁹ Hz, and 1 m = 100 cm.', 'λ = c/ν in meters, then convert.', `${fx(lam, 4)} m × 100.`]);
}
{
  const nu = c / 10.6e-6;
  num(10, 3, 'Exam',
    'A CO₂ laser emits infrared light at 10.6 μm. What is its frequency? Enter a number in Hz.',
    sci(nu, 3) + ' Hz', Number(nu.toPrecision(4)),
    `10.6 μm = 10.6 × 10⁻⁶ m = 1.06 × 10⁻⁵ m. ν = c/λ = 2.998 × 10⁸ / 1.06 × 10⁻⁵ = ${sci(nu, 4)} Hz ≈ ${sci(nu, 3)} Hz - lower than visible light (≈ 10¹⁴-10¹⁵ Hz), as infrared should be. Type it as 2.83e13.`,
    ['μ (micro) = 10⁻⁶.', 'ν = c/λ with λ in meters.', '2.998 × 10⁸ ÷ 1.06 × 10⁻⁵.']);
}

/* ---------- Week 7 Q4 variations ---------- */
{
  const E = hc / 405e-9;
  mcq(10, 3, 'Exam',
    'A Blu-ray laser emits violet light at 405 nm. What is the energy of one photon?',
    sci(E, 3) + ' J', [sci(hc / 405, 3) + ' J', sci(E * NA, 3) + ' J', sci(h * 405e-9, 3) + ' J', sci(h / 405e-9, 3) + ' J'],
    `E = hc/λ = (6.626 × 10⁻³⁴)(2.998 × 10⁸) / (405 × 10⁻⁹ m) = ${sci(E, 3)} J. ${sci(hc / 405, 3)} J leaves λ in nm; ${sci(E * NA, 3)} J is per mole; ${sci(h * 405e-9, 3)} J multiplies h by λ; ${sci(h / 405e-9, 3)} J is h/λ, which is the photon’s momentum, not its energy.`,
    ['Convert 405 nm to meters.', 'E = hc/λ for one photon.', '1.9865 × 10⁻²⁵ ÷ 4.05 × 10⁻⁷.']);
}
{
  const lam = hc / 3.20e-19 * 1e9;
  num(10, 3, 'Exam',
    'A photon has an energy of 3.20 × 10⁻¹⁹ J. What is its wavelength? Enter a number in nm.',
    fx(lam, 0) + ' nm', Number(lam.toFixed(1)),
    `λ = hc/E = (6.626 × 10⁻³⁴ × 2.998 × 10⁸) / 3.20 × 10⁻¹⁹ = ${sci(lam * 1e-9, 4)} m = ${fx(lam, 0)} nm (orange-red visible light).`,
    ['Rearrange E = hc/λ.', 'λ = hc/E gives meters; × 10⁹ for nm.', `1.9865 × 10⁻²⁵ ÷ 3.20 × 10⁻¹⁹ m.`]);
}
mcq(10, 2, 'Exam',
  'Without calculating, compare a 450 nm (blue) photon with a 650 nm (red) photon.',
  'The blue photon has the higher frequency and the higher energy',
  ['The red photon has the higher frequency and the higher energy', 'The blue photon has the higher frequency but the lower energy', 'The red photon has the higher energy because it has the longer wavelength', 'They have equal energies because both are visible light'],
  'Shorter wavelength → higher frequency (ν = c/λ) → higher energy (E = hν). 450 nm < 650 nm, so blue wins on both. Frequency and energy always move together for photons, so "higher frequency but lower energy" is impossible; longer wavelength means LESS energy; being in the same region does not make energies equal.',
  ['Compare the wavelengths first.', 'E = hc/λ: smaller λ, bigger E.', 'Blue light is shorter-wavelength than red.']);

/* ---------- Week 7 Q5 variations: matter waves ---------- */
{
  const lam = h / (me * 5.00e6);
  mcq(12, 3, 'Exam',
    'What is the de Broglie wavelength of an electron (m = 9.109 × 10⁻³¹ kg) moving at 5.00 × 10⁶ m/s?',
    sci(lam, 3) + ' m', [sci(h / (me * 1000 * 5.00e6), 3) + ' m', sci(1 / lam, 3) + ' m', sci(me * 5.00e6, 3) + ' m', sci(h / (0.5 * me * 25e12), 3) + ' m'],
    `λ = h/(mv) = 6.626 × 10⁻³⁴ / (9.109 × 10⁻³¹ × 5.00 × 10⁶) = ${sci(lam, 3)} m (0.145 nm, the size of an atom). ${sci(h / (me * 1000 * 5.00e6), 3)} m uses grams; ${sci(1 / lam, 3)} is mv/h; ${sci(me * 5.00e6, 3)} is the momentum; ${sci(h / (0.5 * me * 25e12), 3)} m divides by ½mv² instead of mv.`,
    ['λ = h / momentum.', 'Momentum = mv, with m in kg.', '6.626 × 10⁻³⁴ ÷ (9.109 × 10⁻³¹ × 5.00 × 10⁶).']);
}
mcq(12, 2, 'Exam',
  'Without calculating: a proton and an electron move at the same speed. Which has the LONGER de Broglie wavelength?',
  'The electron, because λ = h/(mv) and it has the smaller mass',
  ['The proton, because it has the larger mass', 'Neither - they have equal wavelengths because their speeds are equal', 'The proton, because its positive charge spreads its wave out', 'Neither has a wavelength; only light behaves as a wave'],
  'λ = h/(mv). At equal v, the smaller mass gives the longer wavelength; the electron is about 1836 times lighter, so its wavelength is about 1836 times longer. Charge does not appear in the de Broglie relation, and all moving matter has a wavelength (electron diffraction proves it).',
  ['What is in the denominator of λ = h/(mv)?', 'Same v, so compare masses.', 'Lighter particle → longer wavelength.']);
{
  const lam = h / (0.145 * 40.0);
  mcq(12, 3, 'Exam',
    'A 0.145 kg baseball is thrown at 40.0 m/s. What is its de Broglie wavelength?',
    sci(lam, 3) + ' m', [sci(h / (145 * 40.0), 3) + ' m', sci(1 / lam, 3) + ' m', sci(h / (0.5 * 0.145 * 1600), 3) + ' m', fx(0.145 * 40.0, 2) + ' m'],
    `λ = h/(mv) = 6.626 × 10⁻³⁴ / (0.145 kg × 40.0 m/s) = ${sci(lam, 3)} m - far smaller than a nucleus, so a baseball shows no observable wave behaviour. ${sci(h / (145 * 40.0), 3)} m uses 145 (grams); ${sci(1 / lam, 3)} m is upside down; ${sci(h / (0.5 * 0.145 * 1600), 3)} m uses ½mv²; ${fx(0.145 * 40.0, 2)} m is just the momentum mv.`,
    ['Same formula as for an electron.', 'λ = h/(mv), mass already in kg.', '6.626 × 10⁻³⁴ ÷ 5.80.']);
}
{
  const v = h / (me * 0.100e-9);
  num(12, 3, 'Exam',
    'At what speed must an electron (m = 9.109 × 10⁻³¹ kg) travel to have a de Broglie wavelength of 0.100 nm? Enter a number in m/s.',
    sci(v, 3) + ' m/s', Number(v.toPrecision(4)),
    `Rearrange λ = h/(mv): v = h/(mλ) = 6.626 × 10⁻³⁴ / (9.109 × 10⁻³¹ kg × 1.00 × 10⁻¹⁰ m) = ${sci(v, 3)} m/s (about 2.4% of c). Type it as 7.27e6.`,
    ['Solve λ = h/(mv) for v.', 'v = h/(mλ) with λ in meters.', '0.100 nm = 1.00 × 10⁻¹⁰ m.']);
}

/* ---------- Week 7 Q6 variations ---------- */
{
  const E = h * 3.00e18;
  mcq(10, 2, 'Exam',
    'An X-ray photon has frequency 3.00 × 10¹⁸ Hz. What is its energy?',
    sci(E, 3) + ' J', [sci(h / 3.00e18, 3) + ' J', sci(E * NA, 3) + ' J', sci(E / c, 3) + ' J', sci(3.00e18 / h, 3) + ' J'],
    `E = hν = 6.626 × 10⁻³⁴ × 3.00 × 10¹⁸ = ${sci(E, 3)} J - about 4000 times a visible photon. ${sci(h / 3.00e18, 3)} J is h/ν; ${sci(E * NA, 3)} J is a mole of photons; ${sci(E / c, 3)} J divides by c; ${sci(3.00e18 / h, 3)} J is ν/h.`,
    ['Frequency given → E = hν directly.', 'No c needed when ν is given.', '6.626 × 10⁻³⁴ × 3.00 × 10¹⁸.']);
}
{
  const Ep = 425000 / NA, nu = Ep / h;
  num(10, 3, 'Exam',
    'Light whose photons carry 425 kJ per mole: what is its frequency? Enter a number in Hz.',
    sci(nu, 3) + ' Hz', Number(nu.toPrecision(4)),
    `Per photon: 425 000 J/mol ÷ 6.022 × 10²³ = ${sci(Ep, 4)} J. ν = E/h = ${sci(Ep, 4)} / 6.626 × 10⁻³⁴ = ${sci(nu, 3)} Hz (ultraviolet). Type it as 1.07e15.`,
    ['Energy per photon first.', 'kJ/mol × 1000 ÷ N_A = J/photon; then ν = E/h.', `${sci(Ep, 4)} J ÷ 6.626 × 10⁻³⁴.`]);
}
{
  const N = 1.00 / E532;
  mcq(10, 3, 'Exam',
    'How many photons of 532 nm green light carry a total energy of 1.00 J?',
    sci(N, 3), [sci(E532, 3), sci(N / NA, 3), sci(1.00 / (hc / 532), 3), sci(N * NA, 3)],
    `E(one photon) = hc/λ = 1.9865 × 10⁻²⁵ / 5.32 × 10⁻⁷ = ${sci(E532, 4)} J. Number = total ÷ per photon = 1.00 J / ${sci(E532, 4)} J = ${sci(N, 3)} photons. ${sci(E532, 3)} is the energy of one photon, not a count; ${sci(N / NA, 3)} is MOLES of photons; ${sci(1.00 / (hc / 532), 3)} leaves λ in nm; ${sci(N * NA, 3)} multiplies by N_A for no reason.`,
    ['Total energy ÷ energy per photon = number of photons.', 'Energy per photon = hc/λ, λ in m.', `1.00 ÷ ${sci(E532, 4)}.`]);
}

/* ---------- Week 7 Q7 variations: compare without calculating ---------- */
mcq(10, 3, 'Exam',
  'If the frequency of a photon is tripled, what happens to its energy and its wavelength?',
  'Energy triples; wavelength becomes one-third',
  ['Energy triples; wavelength triples', 'Energy becomes one-third; wavelength triples', 'Energy is unchanged; wavelength becomes one-third', 'Energy becomes nine times larger; wavelength becomes one-ninth'],
  'E = hν, so E is directly proportional to ν: triple ν, triple E. λ = c/ν, so λ is inversely proportional to ν: triple ν, one-third λ. Wavelength and frequency cannot rise together (their product is fixed at c), and nothing here is squared.',
  ['E = hν and λ = c/ν.', 'Direct proportion for E, inverse for λ.', '×3 and ÷3.']);
mcq(10, 3, 'Exam',
  'Light just above a metal’s threshold frequency ejects electrons. The light is made twice as BRIGHT, at the same frequency. What happens?',
  'Twice as many electrons are ejected, each with the same maximum kinetic energy',
  ['The same number of electrons are ejected, each moving faster', 'Twice as many electrons are ejected, each moving faster', 'Nothing changes at all', 'Each photon now carries twice as much energy'],
  'Brightness (intensity, amplitude) is the NUMBER of photons per second; each photon’s energy is still hν. Twice the photons → twice the electrons, but each electron gets the same energy from one photon, so their maximum kinetic energy is unchanged. Only a higher frequency would make the electrons faster. This is the observation that forced the photon model.',
  ['What does brightness change: the number of photons or the energy of each?', 'Each electron is ejected by one photon of energy hν.', 'Same ν → same energy per electron; more photons → more electrons.']);
mcq(10, 3, 'Exam',
  'Red light shining on a metal ejects no electrons at all. Which change could make electrons come out?',
  'Use light of a higher frequency, such as ultraviolet',
  ['Make the red light much brighter', 'Shine the red light on the metal for a longer time', 'Use light of a longer wavelength, such as infrared', 'Move the red light source closer to the metal'],
  'Below the threshold frequency, no single photon has enough energy to free an electron, and electrons do not save up energy from several photons. Brighter, longer or closer only delivers MORE of the same too-weak photons. Infrared photons are even weaker. Only raising the frequency (shorter wavelength, e.g. blue or UV) raises the energy of each photon above the threshold.',
  ['What sets the energy of each photon?', 'Photon energy depends only on frequency: E = hν.', 'Bigger ν = more energy per photon.']);
{
  const lamB = c / 1.0e15 * 1e9;
  mcq(10, 3, 'Exam',
    'Photon A has a wavelength of 250 nm. Photon B has a frequency of 1.0 × 10¹⁵ Hz. Which photon has more energy?',
    `A, because its wavelength (250 nm) is shorter than B’s (about ${fx(lamB, 0)} nm)`,
    ['B, because its frequency is higher than A’s', 'They have the same energy', 'B, because 1.0 × 10¹⁵ is a larger number than 250', 'A, because its wavelength is longer than B’s'],
    `Put both in the same quantity. B: λ = c/ν = 2.998 × 10⁸ / 1.0 × 10¹⁵ = ${sci(lamB * 1e-9, 2)} m ≈ ${fx(lamB, 0)} nm. A is 250 nm, the SHORTER wavelength, so A has the higher frequency (${sci(c / 250e-9, 2)} Hz) and the higher energy. Comparing 10¹⁵ with 250 compares numbers in different units; B’s frequency is actually lower than A’s.`,
    ['Convert both photons to the same quantity before comparing.', 'λ(B) = c/ν(B).', `B is about ${fx(lamB, 0)} nm; A is 250 nm.`]);
}

/* ---------- Week 7 Q8 variations: Bohr hydrogen ---------- */
{
  const E = RH * (1 / 4 - 1 / 16), lam = hc / E * 1e9;
  mcq(11, 3, 'Exam',
    'Use Eₙ = −2.18 × 10⁻¹⁸ J (1/n²). What is the wavelength of the photon emitted when a hydrogen atom drops from n = 4 to n = 2?',
    fx(lam, 0) + ' nm', [fx(hc / (RH * (1 / 2 - 1 / 4)) * 1e9, 0) + ' nm', fx(hc / (RH * (1 - 1 / 16)) * 1e9, 1) + ' nm', fx(hc / (RH * (1 / 4 - 1 / 9)) * 1e9, 0) + ' nm', sci(hc / (RH / 16) * 1e9, 3) + ' nm'],
    `|ΔE| = 2.18 × 10⁻¹⁸ (1/2² − 1/4²) = 2.18 × 10⁻¹⁸ × 0.1875 = ${sci(E, 4)} J. λ = hc/|ΔE| = 1.9865 × 10⁻²⁵ / ${sci(E, 4)} = ${sci(lam * 1e-9, 4)} m = ${fx(lam, 0)} nm (the blue-green Balmer line). ${fx(hc / (RH * (1 / 2 - 1 / 4)) * 1e9, 0)} nm forgets to square n; ${fx(hc / (RH * (1 - 1 / 16)) * 1e9, 1)} nm ends at n = 1; ${fx(hc / (RH * (1 / 4 - 1 / 9)) * 1e9, 0)} nm is the 3 → 2 line; ${sci(hc / (RH / 16) * 1e9, 3)} nm uses only the n = 4 term.`,
    ['Square both n values.', 'ΔE = 2.18 × 10⁻¹⁸ (1/4 − 1/16); λ = hc/ΔE.', `ΔE = ${sci(E, 4)} J.`]);
}
{
  const dE = RH * (1 - 1 / 9), kJ = dE * NA / 1000;
  mcq(11, 3, 'Trap',
    'Use Eₙ = −2.18 × 10⁻¹⁸ J (1/n²). How much energy must be absorbed to excite one MOLE of hydrogen atoms from n = 1 to n = 3? (Give ΔE for the atoms.)',
    '+' + sci(kJ, 3) + ' kJ/mol', ['−' + sci(kJ, 3) + ' kJ/mol', '+' + sci(dE, 3) + ' kJ/mol', '+' + sci(RH * NA / 1000, 3) + ' kJ/mol', '+' + sci(kJ * 1000, 3) + ' kJ/mol'],
    `Per atom: ΔE = −2.18 × 10⁻¹⁸ (1/3² − 1/1²) = −2.18 × 10⁻¹⁸ × (−0.8889) = +${sci(dE, 4)} J. Positive: going UP in n absorbs energy. Per mole: × 6.022 × 10²³ = ${sci(dE * NA, 4)} J = +${sci(kJ, 3)} kJ/mol. The negative value is emission (3 → 1); +${sci(dE, 3)} is the per-ATOM number in J; +${sci(RH * NA / 1000, 3)} kJ/mol is the ionization energy (n = 1 → ∞); +${sci(kJ * 1000, 3)} forgets J → kJ.`,
    ['Up in n = absorbed = positive ΔE.', 'ΔE per atom from the Bohr formula, then × N_A and ÷ 1000.', `Per atom: +${sci(dE, 4)} J.`]);
}
mcq(11, 3, 'Exam',
  'Hydrogen’s visible emission spectrum has a red line at 656 nm. Using Eₙ = −2.18 × 10⁻¹⁸ J (1/n²), which transition produces it?',
  'n = 3 → n = 2', ['n = 2 → n = 1', 'n = 4 → n = 2', 'n = 3 → n = 1', 'n = 6 → n = 2'],
  `Visible hydrogen lines all END at n = 2 (Balmer series), which rules out 2 → 1 (${fx(hc / (RH * 0.75) * 1e9, 0)} nm) and 3 → 1 (${fx(hc / (RH * (1 - 1 / 9)) * 1e9, 0)} nm), both ultraviolet. The red line is the SMALLEST visible energy drop: 3 → 2 gives |ΔE| = 2.18 × 10⁻¹⁸ (1/4 − 1/9) = ${sci(RH * (1 / 4 - 1 / 9), 3)} J and λ = ${fx(hc / (RH * (1 / 4 - 1 / 9)) * 1e9, 0)} nm. 4 → 2 gives ${fx(hc / (RH * (1 / 4 - 1 / 16)) * 1e9, 0)} nm (blue-green) and 6 → 2 gives ${fx(hc / (RH * (1 / 4 - 1 / 36)) * 1e9, 0)} nm (violet).`,
  ['Red = longest visible wavelength = smallest energy drop.', 'Visible hydrogen lines end at n = 2.', 'Test 3 → 2: 2.18 × 10⁻¹⁸ (1/4 − 1/9).']);
{
  const t = [[7, 5], [4, 1], [3, 2], [5, 3], [6, 4]].map(p => ({ p, f: 1 / (p[1] * p[1]) - 1 / (p[0] * p[0]) }));
  const L = t.map(o => `${o.p[0]} → ${o.p[1]}: ${fx(o.f, 4)}`).join('; ');
  mcq(11, 3, 'Exam',
    'Which hydrogen-atom transition emits the photon with the LONGEST wavelength?',
    'n = 7 → n = 5', ['n = 4 → n = 1', 'n = 3 → n = 2', 'n = 5 → n = 3', 'n = 6 → n = 4'],
    `Longest wavelength = smallest energy gap. |ΔE| ∝ (1/n²final − 1/n²initial): ${L}. The smallest is 7 → 5, so it gives the longest wavelength (${fx(hc / (RH * t[0].f) * 1e9, 0)} nm, infrared). Levels crowd together as n grows, so a jump between two high levels releases very little energy even if it spans two levels. 4 → 1 is the largest gap and the SHORTEST wavelength.`,
    ['Longest wavelength ↔ smallest energy.', 'Compare (1/n²final − 1/n²initial) for each.', 'High-n levels are packed closely together.']);
}
{
  const kJ = RH * NA / 1000, lam = hc / RH * 1e9;
  mcq(11, 4, 'Exam',
    'Using Eₙ = −2.18 × 10⁻¹⁸ J (1/n²), what is the ionization energy of ground-state hydrogen, and the longest wavelength of light that can ionize one H atom?',
    `${sci(kJ, 3)} kJ/mol; ${fx(lam, 1)} nm`,
    [`${sci(kJ, 3)} kJ/mol; ${sci(hc / (RH * NA) * 1e9, 3)} nm`, `2.18 × 10⁻¹⁸ kJ/mol; ${fx(lam, 1)} nm`, `−${sci(kJ, 3)} kJ/mol; ${fx(lam, 1)} nm`, `${sci(kJ, 3)} kJ/mol; ${fx(hc / (RH * 0.75) * 1e9, 1)} nm`],
    `Ionization is n = 1 → n = ∞: ΔE = −2.18 × 10⁻¹⁸ (0 − 1) = +2.18 × 10⁻¹⁸ J per atom. Per mole: × 6.022 × 10²³ ÷ 1000 = ${sci(kJ, 3)} kJ/mol (positive: energy must be supplied). One photon must ionize one atom, so λ = hc/E(atom) = 1.9865 × 10⁻²⁵ / 2.18 × 10⁻¹⁸ = ${fx(lam, 1)} nm. Using the per-mole energy in λ = hc/E gives ${sci(hc / (RH * NA) * 1e9, 3)} nm; 2.18 × 10⁻¹⁸ is per atom in J, not kJ/mol; ionization energy is never negative; ${fx(hc / (RH * 0.75) * 1e9, 1)} nm only reaches n = 2.`,
    ['Ionization means n goes to infinity.', 'kJ/mol for the IE; per-ATOM energy for the photon wavelength.', 'E(atom) = 2.18 × 10⁻¹⁸ J.']);
}

/* ---------- lesson 12: uncertainty, quantum numbers, nodes ---------- */
{
  const dx = h / (4 * Math.PI * me * 1.0e5);
  mcq(12, 3, 'Exam',
    'The speed of an electron (m = 9.109 × 10⁻³¹ kg) is known to within Δv = 1.0 × 10⁵ m/s. Using Δx·mΔv ≥ h/4π, what is the minimum uncertainty in its position?',
    sci(dx, 2) + ' m', [sci(h / (me * 1.0e5), 2) + ' m', sci(h / (4 * Math.PI * me * 1000 * 1.0e5), 2) + ' m', sci(1 / dx, 2) + ' m', sci(h / (2 * Math.PI * me * 1.0e5), 2) + ' m'],
    `Δx ≥ h/(4π·m·Δv) = 6.626 × 10⁻³⁴ / (4π × 9.109 × 10⁻³¹ × 1.0 × 10⁵) = ${sci(dx, 2)} m - about the size of an atom, so we cannot say where in the atom the electron is. ${sci(h / (me * 1.0e5), 2)} m forgets the 4π; ${sci(h / (4 * Math.PI * me * 1000 * 1.0e5), 2)} m uses the mass in grams; ${sci(1 / dx, 2)} m is upside down; ${sci(h / (2 * Math.PI * me * 1.0e5), 2)} m uses 2π instead of 4π.`,
    ['Solve the inequality for Δx.', 'Δx = h/(4π m Δv).', '6.626 × 10⁻³⁴ ÷ (12.566 × 9.109 × 10⁻³¹ × 1.0 × 10⁵).']);
}
mcq(12, 3, 'Exam',
  'Which set of quantum numbers (n, l, mₗ, mₛ) is NOT allowed?',
  '(3, 3, 1, −½)', ['(3, 2, −2, +½)', '(4, 0, 0, −½)', '(2, 1, 0, +½)', '(5, 3, −3, +½)'],
  'l can only be 0 to n − 1, so n = 3 allows l = 0, 1, 2 - not 3 (there is no "3f"). Check the rest: (3, 2, −2) is a 3d orbital with |mₗ| ≤ 2; (4, 0, 0) is 4s; (2, 1, 0) is 2p; (5, 3, −3) is 5f with mₗ = −3 allowed for l = 3; ±½ is always fine for mₛ.',
  ['Check l against n first.', 'l = 0 … n − 1; mₗ = −l … +l; mₛ = ±½.', 'Can l equal n?']);
mcq(12, 4, 'Trap',
  'How many electrons in one atom can have the quantum numbers n = 4 and mₗ = −1?',
  '6', ['2', '3', '8', '32'],
  'For n = 4, l can be 0, 1, 2 or 3. mₗ = −1 exists only when l ≥ 1, so there is one such orbital in 4p, one in 4d and one in 4f: 3 orbitals. Each orbital holds 2 electrons (mₛ = +½, −½): 6 electrons. 2 counts only one orbital; 3 counts orbitals, not electrons; 8 wrongly includes 4s (l = 0 has only mₗ = 0); 32 is every electron with n = 4.',
  ['Which values of l are possible when n = 4?', 'mₗ = −1 needs l ≥ 1; each orbital holds 2 electrons.', '4p, 4d and 4f each contribute one orbital.']);
mcq(12, 2, 'Exam',
  'A sublevel has n = 4 and l = 3. What is its name, how many orbitals does it contain, and how many electrons can it hold?',
  '4f; 7 orbitals; 14 electrons', ['4d; 5 orbitals; 10 electrons', '4f; 7 orbitals; 7 electrons', '4f; 3 orbitals; 6 electrons', '4p; 3 orbitals; 6 electrons'],
  'l = 0, 1, 2, 3 ↔ s, p, d, f, so l = 3 is f: the 4f sublevel. Orbitals = 2l + 1 = 7 (mₗ = −3 … +3); each holds 2 electrons, so 14. 4d is l = 2; 7 electrons forgets the two spins; 3 orbitals is the p count.',
  ['Map l to a letter: 0 s, 1 p, 2 d, 3 f.', 'Number of orbitals = 2l + 1.', '7 orbitals × 2 electrons.']);
mcq(12, 3, 'Exam',
  'How many radial nodes and how many angular nodes does a 4d orbital have?',
  '1 radial, 2 angular', ['2 radial, 1 angular', '3 radial, 0 angular', '0 radial, 2 angular', '1 radial, 3 angular'],
  'Total nodes = n − 1 = 3. Angular nodes = l = 2 (d). Radial nodes = n − l − 1 = 4 − 2 − 1 = 1. "3 radial, 0 angular" is the 4s pattern; "0 radial, 2 angular" is 3d; the others swap or miscount l.',
  ['Total nodes = n − 1.', 'Angular nodes = l; radial = n − l − 1.', 'n = 4, l = 2.']);
mcq(11, 3, 'Exam',
  'Which statement about the Bohr model of the hydrogen atom is FALSE?',
  'It correctly predicts the line spectra of all elements, not just hydrogen',
  ['It explains hydrogen’s line spectrum with quantized energy levels', 'An atom emits a photon when its electron drops to a lower energy level', 'The energy levels get closer together as n increases', 'It treats the electron as moving in fixed circular orbits around the nucleus'],
  'The Bohr model works only for hydrogen and other one-electron species (He⁺, Li²⁺); it fails for atoms with two or more electrons, which is why the quantum-mechanical (orbital) model replaced it. Everything else listed is true: quantized levels explain the lines, a drop in n emits a photon, the levels crowd together as n grows (Eₙ ∝ −1/n²), and Bohr pictured fixed circular orbits.',
  ['Look for the overclaim.', 'Bohr’s formula has only one electron in it.', 'Does it work for helium?']);

/* ---------- cross-topic light problems ---------- */
{
  const Ep = 496000 / NA, lam = hc / Ep;
  mcq(10, 4, 'Exam',
    'The first ionization energy of sodium is 496 kJ/mol. What is the longest wavelength of light that can ionize a single gaseous Na atom?',
    fx(lam * 1e9, 0) + ' nm', [sci(hc / 496000 * 1e9, 3) + ' nm', sci(hc * NA / 496 * 1e9, 3) + ' nm', sci(Ep / h, 3) + ' nm', sci(lam, 3) + ' nm'],
    `Energy per atom = 496 000 J/mol ÷ 6.022 × 10²³ = ${sci(Ep, 4)} J. λ(max) = hc/E = 1.9865 × 10⁻²⁵ / ${sci(Ep, 4)} = ${sci(lam, 4)} m = ${fx(lam * 1e9, 0)} nm (UV). Shorter wavelengths also work; longer ones never do. ${sci(hc / 496000 * 1e9, 3)} nm skips N_A; ${sci(hc * NA / 496 * 1e9, 3)} nm skips kJ → J; ${sci(Ep / h, 3)} is the threshold FREQUENCY; ${sci(lam, 3)} nm is the meter value mislabelled.`,
    ['One photon ionizes one atom: use energy per atom.', 'kJ/mol → J/atom (× 1000 ÷ N_A), then λ = hc/E.', `E = ${sci(Ep, 4)} J.`]);
}
{
  const Ep = 891000 / NA, lam = hc / Ep;
  mcq(10, 4, 'Exam',
    'Burning CH₄ releases 891 kJ per mole. If the energy released by ONE molecule were emitted as a single photon, what would its wavelength be, and in what region of the spectrum?',
    `${fx(lam * 1e9, 0)} nm, ultraviolet`, [`${fx(lam * 1e9, 0)} nm, visible`, `${sci(hc * NA / 891 * 1e9, 3)} nm, infrared`, `${sci(hc / 891000 * 1e9, 3)} nm, gamma ray`, `${sci(lam, 3)} nm, gamma ray`],
    `Per molecule: 891 000 J ÷ 6.022 × 10²³ = ${sci(Ep, 4)} J. λ = hc/E = 1.9865 × 10⁻²⁵ / ${sci(Ep, 4)} = ${sci(lam, 4)} m = ${fx(lam * 1e9, 0)} nm. Visible light is 400-700 nm, so ${fx(lam * 1e9, 0)} nm is ultraviolet. ${sci(hc * NA / 891 * 1e9, 3)} nm forgets kJ → J; ${sci(hc / 891000 * 1e9, 3)} nm forgets to divide by N_A; ${sci(lam, 3)} nm is meters mislabelled as nm.`,
    ['One molecule → divide the molar heat by N_A.', 'λ = hc/E, then compare with 400-700 nm.', `E per molecule = ${sci(Ep, 4)} J.`]);
}
{
  const MCH4 = A.C + 4 * A.H, q = 891 * 1.00 / MCH4 * 1000, Ep = hc / 600e-9, N = q / Ep;
  mcq(10, 4, 'Exam',
    'CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l), ΔH = −891 kJ. How many 600. nm photons carry the same total energy as the heat released by burning 1.00 g of CH₄?',
    sci(N, 3) + ' photons', [sci(N / 1000, 3) + ' photons', sci(891000 / Ep, 3) + ' photons', g(N / NA, 3) + ' photons', sci(q / (hc / 600), 3) + ' photons'],
    `Heat: 1.00 g ÷ ${fx(MCH4, 3)} g/mol = ${g(1 / MCH4, 4)} mol CH₄ × 891 kJ/mol = ${g(q / 1000, 4)} kJ = ${sci(q, 4)} J. One 600. nm photon: hc/λ = 1.9865 × 10⁻²⁵ / 6.00 × 10⁻⁷ = ${sci(Ep, 4)} J. Number = ${sci(q, 4)} / ${sci(Ep, 4)} = ${sci(N, 3)} photons. ${sci(N / 1000, 3)} leaves the heat in kJ; ${sci(891000 / Ep, 3)} uses a whole mole of CH₄ instead of 1.00 g; ${g(N / NA, 3)} is MOLES of photons; ${sci(q / (hc / 600), 3)} leaves λ in nm.`,
    ['Two separate energies: heat from 1.00 g of fuel, and the energy of one photon.', 'g → mol CH₄ → kJ → J; photon energy = hc/λ.', `${sci(q, 4)} J ÷ ${sci(Ep, 4)} J.`]);
}
{
  const q = 10.0 * cw * 1.50, N = q / E532;
  mcq(10, 4, 'Exam',
    'A 532 nm laser beam is completely absorbed by 10.0 g of water (c = 4.184 J/(g·°C)), raising its temperature by 1.50 °C. How many photons were absorbed?',
    sci(N, 3), [sci(q / (hc / 532), 3), g(N / NA, 3), sci(q / 1000 / E532, 3), sci(q * E532, 3)],
    `Heat absorbed by the water: q = m·c·ΔT = (10.0)(4.184)(1.50) = ${fx(q, 2)} J. Energy of one 532 nm photon = hc/λ = ${sci(E532, 4)} J. Number = ${fx(q, 2)} / ${sci(E532, 4)} = ${sci(N, 3)} photons. ${sci(q / (hc / 532), 3)} leaves λ in nm; ${g(N / NA, 3)} is moles of photons; ${sci(q / 1000 / E532, 3)} uses q in kJ; ${sci(q * E532, 3)} multiplies instead of dividing.`,
    ['Calorimetry gives the total energy; the photon formula gives energy per photon.', 'q = m·c·ΔT; E = hc/λ; N = q/E.', `${fx(q, 2)} J ÷ ${sci(E532, 4)} J.`]);
}

/* =====================================================================
   ELECTRON CONFIGURATION AND PERIODICITY (lessons 13, 14)
   ===================================================================== */
mcq(13, 3, 'Exam',
  'Silberberg SP 8.1 type: which set of quantum numbers (n, l, mₗ, mₛ) could describe the 8th electron added to an oxygen atom in its ground state?',
  '(2, 1, −1, −½)', ['(2, 2, 1, −½)', '(2, 0, 0, −½)', '(3, 1, 0, −½)', '(2, 1, −2, −½)'],
  'O is 1s² 2s² 2p⁴. Electrons 5-7 enter the three 2p orbitals singly (Hund); the 8th pairs up in the first of them with opposite spin, so it is a 2p electron: n = 2, l = 1, and with the usual convention of filling mₗ = −1, 0, +1 from left to right and giving the first electron in each orbital mₛ = +½, the 8th electron is (2, 1, −1, −½). (2, 2, …) is impossible (l < n); (2, 0, 0) is a 2s electron (electrons 3 and 4); n = 3 is empty in ground-state O; mₗ = −2 is impossible for l = 1.',
  ['Write the configuration and find which sublevel the 8th electron enters.', 'It is the 4th electron in 2p, so it pairs up.', '2p means n = 2, l = 1; |mₗ| ≤ 1.']);
mcq(13, 3, 'Exam',
  'Silberberg SP 8.2 type: which gives the ground-state configuration of selenium (Z = 34) and its number of valence electrons?',
  '[Ar] 4s² 3d¹⁰ 4p⁴; 6 valence electrons',
  ['[Ar] 4s² 3d¹⁰ 4p⁴; 16 valence electrons', '[Ar] 4s² 4p⁴; 6 valence electrons', '[Ar] 4s² 3d¹⁰ 4p⁶; 8 valence electrons', '[Ar] 4s¹ 3d¹⁰ 4p⁵; 6 valence electrons'],
  'After Ar (18 electrons): 4s² (20), 3d¹⁰ (30), 4p⁴ (34). Valence electrons of a main-group element = outer s + p = 4s² 4p⁴ = 6 (group 16). The filled 3d¹⁰ is NOT counted as valence (16 counts it). Skipping 3d leaves only 24 electrons; 4p⁶ is krypton (36); moving an s electron is a d-block exception (Cr, Cu), not something p-block atoms do.',
  ['Count 16 electrons past argon in filling order.', '4s, then 3d, then 4p. Valence = outer s + p only.', 'Se is in group 16.']);
mcq(14, 3, 'Trap',
  'What is the ground-state electron configuration of Fe³⁺?',
  '[Ar] 3d⁵', ['[Ar] 4s² 3d³', '[Ar] 4s¹ 3d⁴', '[Ar] 3d⁶', '[Ar] 4s² 3d⁶'],
  'Fe is [Ar] 4s² 3d⁶. Transition metals lose their 4s electrons FIRST, then 3d: Fe²⁺ = [Ar] 3d⁶, Fe³⁺ = [Ar] 3d⁵ (5 unpaired electrons). [Ar] 4s² 3d³ removes the last-filled 3d electrons - the classic trap; [Ar] 4s¹ 3d⁴ mixes the two; [Ar] 3d⁶ is Fe²⁺; [Ar] 4s² 3d⁶ is the neutral atom.',
  ['Start from neutral Fe.', 'Remove 4s electrons before 3d electrons.', '[Ar] 4s² 3d⁶ minus 3 electrons, 4s first.']);
mcq(13, 3, 'Exam',
  'What is the ground-state electron configuration of copper (Z = 29)?',
  '[Ar] 4s¹ 3d¹⁰', ['[Ar] 4s² 3d⁹', '[Ar] 4s² 3d¹⁰', '[Ar] 4s¹ 3d⁹', '[Ar] 3d¹⁰ 4p¹'],
  'Copper is an exception: a filled 3d¹⁰ set is extra stable, so one 4s electron moves into 3d, giving [Ar] 4s¹ 3d¹⁰ (11 electrons past Ar). [Ar] 4s² 3d⁹ is the aufbau prediction that the exception overrides; [Ar] 4s² 3d¹⁰ is zinc (30); [Ar] 4s¹ 3d⁹ has only 28 electrons; 4p does not fill before 4s.',
  ['Cu is one of the two exceptions you must know (with Cr).', 'A filled d¹⁰ set is extra stable.', 'Move one 4s electron into 3d.']);
mcq(14, 4, 'Trap',
  'What is the ground-state configuration of Cu⁺, and is the ion paramagnetic or diamagnetic?',
  '[Ar] 3d¹⁰, diamagnetic', ['[Ar] 4s¹ 3d⁹, paramagnetic', '[Ar] 3d¹⁰, paramagnetic', '[Ar] 4s² 3d⁸, paramagnetic', '[Ar] 4s¹ 3d⁹, diamagnetic'],
  'Cu = [Ar] 4s¹ 3d¹⁰. Remove the 4s electron first: Cu⁺ = [Ar] 3d¹⁰. Every 3d orbital holds a pair, so there are no unpaired electrons: diamagnetic. [Ar] 4s¹ 3d⁹ removes a 3d electron instead of 4s (and would have 2 unpaired electrons); a filled d¹⁰ set cannot be paramagnetic; [Ar] 4s² 3d⁸ starts from the wrong (non-exception) configuration and also removes d electrons.',
  ['Start from copper’s exceptional configuration.', 'Lose the 4s electron first; then count unpaired electrons.', 'd¹⁰ = five full orbitals.']);
mcq(14, 4, 'Exam',
  'A period-3 element has successive ionization energies (kJ/mol) of 578, 1817, 2745, 11 577 and 14 842. What is the ground-state configuration of the ion it most commonly forms?',
  '1s² 2s² 2p⁶', ['1s² 2s² 2p⁶ 3s² 3p¹', '1s² 2s² 2p⁶ 3s²', '1s² 2s² 2p⁶ 3s² 3p⁶', '1s² 2s² 2p⁶ 3s¹'],
  'The huge jump comes between IE₃ (2745) and IE₄ (11 577): the first three electrons are valence electrons, and the fourth would come from the core. Three valence electrons in period 3 = aluminum (group 13, [Ne] 3s² 3p¹). It forms Al³⁺ by losing all three, leaving the neon core 1s² 2s² 2p⁶. 1s² 2s² 2p⁶ 3s² 3p¹ is neutral Al; …3s² is Al⁺; …3s¹ is Al²⁺; …3s² 3p⁶ would be an anion like P³⁻.',
  ['Look for the biggest jump between consecutive IEs.', 'The jump comes after the last valence electron is removed.', 'Three valence electrons, period 3 - remove them all.']);
mcq(14, 3, 'Exam',
  'Silberberg SP 8.5 type: an element in period 4 has successive ionization energies (kJ/mol) of 590, 1145, 4912, 6491 and 8153. Which element is it?',
  'Ca', ['K', 'Sc', 'Ga', 'Ti'],
  'The big jump is between IE₂ (1145) and IE₃ (4912), so there are 2 valence electrons: group 2, period 4 = calcium. K (group 1) would jump after IE₁; Sc and Ga (3 valence electrons) after IE₃; Ti (4) after IE₄.',
  ['Find where the IEs jump by a large factor.', 'Number of IEs before the jump = number of valence electrons.', 'Two valence electrons in period 4.']);
mcq(14, 3, 'Exam',
  'Which ion is diamagnetic?',
  'Zn²⁺', ['Fe²⁺', 'Cu²⁺', 'Ti²⁺', 'Cr³⁺'],
  'Remove 4s electrons first: Zn²⁺ = [Ar] 3d¹⁰ (all paired, diamagnetic). Fe²⁺ = 3d⁶ (4 unpaired), Cu²⁺ = 3d⁹ (1 unpaired), Ti²⁺ = 3d² (2 unpaired), Cr³⁺ = 3d³ (3 unpaired) - all paramagnetic.',
  ['Diamagnetic = no unpaired electrons.', 'Write each ion’s d count after removing 4s electrons.', 'Only a d¹⁰ (or d⁰) ion here has everything paired.']);
mcq(13, 4, 'Trap',
  'Which ground-state atom has the MOST unpaired electrons?',
  'Cr', ['Mn', 'Fe', 'Co', 'Ni'],
  'Cr is an exception: [Ar] 4s¹ 3d⁵, with one unpaired 4s electron and five unpaired 3d electrons = 6. Mn = [Ar] 4s² 3d⁵ has 5; Fe (3d⁶) 4; Co (3d⁷) 3; Ni (3d⁸) 2. Picking Mn misses the chromium exception.',
  ['Remember the chromium exception.', 'Cr = [Ar] 4s¹ 3d⁵ - count the 4s electron too.', '1 + 5 = 6.']);
mcq(14, 3, 'Exam',
  'What is the ground-state configuration of Mn²⁺, and how many unpaired electrons does it have?',
  '[Ar] 3d⁵; 5 unpaired', ['[Ar] 4s² 3d³; 3 unpaired', '[Ar] 3d⁵; 1 unpaired', '[Ar] 4s¹ 3d⁴; 5 unpaired', '[Ar] 4s² 3d⁷; 3 unpaired'],
  'Mn = [Ar] 4s² 3d⁵. Remove the two 4s electrons: Mn²⁺ = [Ar] 3d⁵. By Hund’s rule the five d electrons occupy the five d orbitals singly with parallel spins: 5 unpaired. Removing 3d electrons gives 4s² 3d³; pairing them up ignores Hund’s rule; 4s² 3d⁷ ADDS two electrons instead of removing them.',
  ['Cations lose 4s electrons first.', 'Then fill five d orbitals by Hund’s rule.', 'd⁵ = one electron in each d orbital.']);
mcq(14, 3, 'Trap',
  'An element X forms the ion X²⁺ with the ground-state configuration [Ar] 3d⁷. What is X?',
  'Co', ['Mn', 'Fe', 'Cu', 'Ni'],
  'X²⁺ has 18 + 7 = 25 electrons, so X has 27: cobalt, [Ar] 4s² 3d⁷, which loses its two 4s electrons to give [Ar] 3d⁷. Mn (25) forgets to add back the 2 electrons lost; Fe (26) adds back only one; Cu would follow from putting the two returned electrons into 3d (3d⁹) and reading off a neutral atom; Ni²⁺ is 3d⁸.',
  ['Count the ion’s electrons, then add back the charge.', '18 + 7 + 2 = the atomic number.', 'So Z = 27: find it on the periodic table.']);
mcq(14, 3, 'Exam',
  'Silberberg SP 8.3 type: arrange K, Na, Mg, S and Cl in order of INCREASING atomic radius.',
  'Cl < S < Mg < Na < K', ['K < Na < Mg < S < Cl', 'Na < Mg < S < Cl < K', 'Cl < S < Na < Mg < K', 'S < Cl < Mg < Na < K'],
  'Across period 3 (Na → Cl) radius DECREASES because the nuclear charge rises while the electrons stay in the n = 3 shell (higher Z(eff)). Down group 1, K (n = 4) is bigger than Na. So Cl < S < Mg < Na < K. The reversed list is decreasing radius; "Na < Mg < S < Cl" has the period trend backwards; the other two swap a neighbouring pair.',
  ['Radius shrinks left → right across a period.', 'Radius grows down a group (new shell).', 'Smallest is upper right; largest is lower left.']);
mcq(14, 4, 'Trap',
  'Silberberg SP 8.4 type: arrange Mg, Al, Si, P and S in order of INCREASING first ionization energy.',
  'Al < Mg < Si < S < P', ['Mg < Al < Si < P < S', 'S < P < Si < Al < Mg', 'Al < Mg < Si < P < S', 'Mg < Al < Si < S < P'],
  'The general trend rises across the period, with TWO dips. Al (3p¹) is below Mg (3s²): its electron comes from a higher-energy 3p sublevel. S (3p⁴) is below P (3p³): S loses an electron from a doubly occupied orbital, where electron-electron repulsion makes it easier to remove. Actual values: Al 578 < Mg 738 < Si 787 < S 1000 < P 1012 kJ/mol. The smooth order ignores both dips; the others include only one.',
  ['The trend rises across a period - but with two exceptions.', 'Group 13 < group 2; group 16 < group 15.', 'Al below Mg, and S below P.']);
mcq(14, 3, 'Exam',
  'Arrange the isoelectronic species S²⁻, Cl⁻, Ar, K⁺ and Ca²⁺ in order of INCREASING radius.',
  'Ca²⁺ < K⁺ < Ar < Cl⁻ < S²⁻', ['S²⁻ < Cl⁻ < Ar < K⁺ < Ca²⁺', 'Ar < K⁺ < Ca²⁺ < Cl⁻ < S²⁻', 'K⁺ < Ca²⁺ < Ar < Cl⁻ < S²⁻', 'Ca²⁺ < K⁺ < Cl⁻ < S²⁻ < Ar'],
  'All five have 18 electrons ([Ar]). With the same number of electrons, the radius depends on the nuclear charge: Ca (Z = 20) pulls hardest and is smallest; S (Z = 16) pulls least and is largest. Ca²⁺ < K⁺ < Ar < Cl⁻ < S²⁻. The reverse list ranks by Z the wrong way; a noble gas is not automatically the smallest or the largest.',
  ['Same electron count → compare nuclear charges.', 'More protons pull the same 18 electrons in tighter.', 'Highest Z = smallest.']);
mcq(14, 3, 'Exam',
  'Which process RELEASES energy?',
  'Cl(g) + e⁻ → Cl⁻(g)', ['O⁻(g) + e⁻ → O²⁻(g)', 'Na(g) → Na⁺(g) + e⁻', 'Mg⁺(g) → Mg²⁺(g) + e⁻', 'Ne(g) + e⁻ → Ne⁻(g)'],
  'Chlorine has the most negative electron affinity of the main-group elements (about −349 kJ/mol): the added electron completes its 3p subshell, so energy is released. Adding a second electron to an anion (O⁻ → O²⁻) is repelled and always costs energy. Removing an electron (any ionization) always costs energy. Ne’s added electron would have to start a new shell, so it is not bound and energy would be required.',
  ['Ionizations always need energy.', 'Which atom is one electron short of a noble-gas configuration?', 'Halogens have the most negative electron affinities.']);
mcq(14, 2, 'Exam',
  'Which oxide dissolves in water to give an ACIDIC solution?',
  'SO₃', ['Na₂O', 'CaO', 'MgO', 'Al₂O₃'],
  'Nonmetal oxides are acidic: SO₃ + H₂O → H₂SO₄. Metal oxides are basic (Na₂O + H₂O → 2NaOH; CaO and MgO give hydroxides too). Al₂O₃ is amphoteric (reacts with both acids and bases) and does not make water acidic.',
  ['Metal or nonmetal?', 'Nonmetal oxide + water → an acid.', 'Sulfur is the only nonmetal listed.']);
mcq(13, 3, 'Exam',
  'Which element has the ground-state configuration [Kr] 5s² 4d¹⁰ 5p³?',
  'Sb', ['As', 'Bi', 'In', 'Te'],
  '5p³ means period 5, group 15 (three electrons into the 5p block): antimony, Sb (Z = 36 + 2 + 10 + 3 = 51). As is the group-15 element in period 4 ([Ar] 4s² 3d¹⁰ 4p³); Bi is period 6; In is 5p¹; Te is 5p⁴.',
  ['The last sublevel tells you the period and block.', '5p³: period 5, third column of the p-block.', 'Z = 36 + 15 = 51.']);
mcq(13, 3, 'Trap',
  'Which configuration represents an EXCITED state of a neutral atom (allowed, but not the ground state)?',
  '1s² 2s² 2p⁵ 3s¹', ['1s² 2s² 2p⁶ 3s¹', '1s² 2s³ 2p⁴', '1s² 2s² 2p⁶ 3s² 3p⁶ 4s²', '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹ 4s²'],
  '1s² 2s² 2p⁵ 3s¹ has 10 electrons (neon) but one electron sits in 3s while a 2p orbital still has room: allowed, but higher in energy than 1s² 2s² 2p⁶ - an excited state. 1s² 2s² 2p⁶ 3s¹ is ground-state Na; 2s³ breaks the Pauli principle (an s orbital holds 2), so it is not allowed at all; …4s² is ground-state Ca; …3d¹ 4s² is ground-state Sc written in n order (writing 3d before 4s does not change the state).',
  ['Excited = a lower sublevel is not full while a higher one is occupied.', 'First reject anything impossible (more than 2 electrons in an s orbital).', 'Look for a gap in 2p with an electron in 3s.']);
mcq(13, 1, 'Exam',
  'A student draws the ground-state 2p orbital diagram of nitrogen as one paired orbital (↑↓), one orbital with a single ↑, and one empty orbital. What is wrong with it?',
  'It violates Hund’s rule: the three 2p electrons should occupy separate orbitals with parallel spins',
  ['It violates the Pauli exclusion principle', 'It violates the aufbau principle', 'Nothing - this is the ground state of nitrogen', 'It violates Hund’s rule because the paired electrons must have parallel spins'],
  'Hund’s rule: in equal-energy orbitals, electrons go in singly with parallel spins before any pairing, so N’s 2p³ is ↑ ↑ ↑ with three unpaired electrons. The paired orbital itself is fine for Pauli (opposite spins). The aufbau order (2s before 2p) is followed. Paired electrons must have OPPOSITE spins, never parallel.',
  ['The diagram has the right number of electrons in the right sublevel.', 'How should electrons fill orbitals of equal energy?', 'One per orbital, parallel spins, before pairing.']);
mcq(13, 3, 'Exam',
  'How many electrons in a ground-state phosphorus atom have l = 1?',
  '9', ['3', '6', '15', '5'],
  'l = 1 means p orbitals. P = 1s² 2s² 2p⁶ 3s² 3p³: the p electrons are 2p⁶ + 3p³ = 9. 3 counts only 3p; 6 counts only 2p; 15 is every electron; 5 counts the valence electrons (3s² 3p³), which include s electrons.',
  ['l = 1 is which sublevel letter?', 'Write the full configuration and add every p electron.', '2p⁶ + 3p³.']);
mcq(13, 4, 'Trap',
  'How many electrons in a ground-state iron atom (Z = 26) have n = 3?',
  '14', ['8', '16', '6', '18'],
  'Fe = 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶. The n = 3 electrons are 3s² + 3p⁶ + 3d⁶ = 14. 8 forgets that 3d is part of the n = 3 shell (it is filled after 4s, but its n is still 3); 16 counts the 4s² electrons as n = 3; 6 counts only 3d; 18 is the capacity of the n = 3 shell, not its occupancy in Fe.',
  ['Group by n, not by filling order.', '3s, 3p and 3d all have n = 3; 4s has n = 4.', '2 + 6 + 6.']);
mcq(14, 3, 'Exam',
  'Which species is NOT isoelectronic with neon?',
  'S²⁻', ['Na⁺', 'Mg²⁺', 'F⁻', 'O²⁻'],
  'Ne has 10 electrons. Na⁺ (11 − 1), Mg²⁺ (12 − 2), F⁻ (9 + 1) and O²⁻ (8 + 2) all have 10. S²⁻ has 16 + 2 = 18 electrons, isoelectronic with Ar.',
  ['Isoelectronic = same number of electrons.', 'Electrons = Z − charge.', 'Neon has 10.']);
mcq(14, 3, 'Exam',
  'Rank Fe, Fe²⁺ and Fe³⁺ from largest to smallest.',
  'Fe > Fe²⁺ > Fe³⁺', ['Fe³⁺ > Fe²⁺ > Fe', 'Fe²⁺ > Fe > Fe³⁺', 'Fe > Fe³⁺ > Fe²⁺', 'All three are the same size because the nucleus is the same'],
  'The nucleus (26 protons) is the same, so the fewer the electrons, the less electron-electron repulsion and the more strongly each is held: Fe (26 e⁻, with 4s electrons) > Fe²⁺ (24 e⁻, 4s gone) > Fe³⁺ (23 e⁻). Cations are always smaller than their parent atoms, and higher charge means smaller still.',
  ['Same nucleus, fewer electrons.', 'Cations are smaller than their atoms.', 'Higher positive charge → smaller ion.']);
mcq(14, 4, 'Exam',
  'Which atom has the LARGEST second ionization energy (IE₂)?',
  'Na', ['Mg', 'Al', 'Si', 'K'],
  'IE₂ removes the second electron. For Na ([Ne] 3s¹) the first electron empties the valence shell, so the second must come from the 2p CORE: IE₂(Na) ≈ 4562 kJ/mol. Mg (1451), Al (1817) and Si (1577) still lose valence electrons. K’s second electron is also a core electron, but from n = 3, which is farther from the nucleus than Na’s n = 2 core (IE₂(K) ≈ 3052).',
  ['After the first ionization, which atom has run out of valence electrons?', 'Removing a core electron costs far more energy.', 'Group 1; the smaller one wins.']);
mcq(14, 3, 'Exam',
  'Chlorine has more electrons than sodium, yet a Cl atom is much SMALLER than a Na atom. Why?',
  'Cl has a higher nuclear charge, and its added electrons are in the same n = 3 shell, so they feel a larger effective nuclear charge and are pulled closer',
  ['Cl has more electron shells than Na', 'Electron-electron repulsion is weaker in Cl', 'Cl gains an electron to become Cl⁻, which is smaller', 'Na’s valence electron is in a d orbital, which is larger'],
  'Na (Z = 11) and Cl (Z = 17) both have their outer electrons in n = 3. Across the period six protons are added but electrons in the same shell shield each other poorly, so Z(eff) rises and the electron cloud contracts. Both have three occupied shells; repulsion actually increases with more electrons; Cl⁻ is LARGER than Cl; Na’s valence electron is 3s.',
  ['Same period → same outermost shell.', 'What changes across the period is the nuclear charge.', 'Higher Z(eff), smaller atom.']);
mcq(14, 3, 'Exam',
  'Why is the first ionization energy of oxygen LOWER than that of nitrogen?',
  'O’s electron is removed from a doubly occupied 2p orbital, where electron-electron repulsion makes it easier to remove',
  ['O has a smaller nuclear charge than N', 'O’s electron is removed from the 2s orbital', 'N’s outer electron is in a higher-energy sublevel than O’s', 'O is a larger atom than N'],
  'N = 2p³ (three half-filled orbitals); O = 2p⁴ (one orbital holds a pair). The paired electron in O is pushed by its partner, so less energy is needed to remove it, even though O has the larger nuclear charge (8 vs 7). Both lose a 2p electron, and O is slightly SMALLER than N.',
  ['Draw the 2p orbital diagrams of N and O.', 'Which atom has a paired 2p electron?', 'Pairing adds repulsion.']);
mcq(14, 3, 'Exam',
  'What is the ground-state configuration of Cr³⁺, and is it paramagnetic?',
  '[Ar] 3d³; 3 unpaired electrons, paramagnetic',
  ['[Ar] 4s¹ 3d²; 3 unpaired electrons, paramagnetic', '[Ar] 4s² 3d¹; 1 unpaired electron, paramagnetic', '[Ar] 3d³; 3 unpaired electrons, diamagnetic', '[Ar] 4s¹ 3d⁵; 6 unpaired electrons, paramagnetic'],
  'Cr = [Ar] 4s¹ 3d⁵ (exception). Remove the 4s electron first, then two 3d electrons: Cr³⁺ = [Ar] 3d³, with three unpaired electrons (Hund), so paramagnetic. [Ar] 4s¹ 3d² removes 3d electrons before 4s; [Ar] 4s² 3d¹ starts from the non-exception configuration and removes d electrons; any ion with unpaired electrons is paramagnetic, not diamagnetic; [Ar] 4s¹ 3d⁵ is neutral Cr.',
  ['Start from chromium’s exceptional configuration.', '4s out first, then 3d.', '24 − 3 = 21 electrons: [Ar] + 3.']);
mcq(13, 3, 'Exam',
  'Which set of quantum numbers (n, l, mₗ, mₛ) could describe the highest-energy electron of a ground-state gallium atom?',
  '(4, 1, −1, +½)', ['(4, 0, 0, +½)', '(3, 2, 1, +½)', '(4, 2, 0, +½)', '(4, 1, 2, +½)'],
  'Ga = [Ar] 4s² 3d¹⁰ 4p¹. The last, highest-energy electron is the single 4p electron: n = 4, l = 1, and by the usual convention (first p orbital mₗ = −1, first electron mₛ = +½) it is (4, 1, −1, +½). (4, 0, 0) is a 4s electron and (3, 2, 1) a 3d electron - both lower in energy; 4d (l = 2 with n = 4) is empty in Ga; mₗ = 2 is impossible when l = 1.',
  ['Write Ga’s configuration and find the last electron.', '4p → n = 4, l = 1.', 'mₗ must be −1, 0 or +1.']);
mcq(14, 3, 'Exam',
  'Arrange I, Te, Sn, Sr and Rb (all in period 5) in order of INCREASING metallic character.',
  'I < Te < Sn < Sr < Rb', ['Rb < Sr < Sn < Te < I', 'Te < I < Sn < Sr < Rb', 'I < Te < Sr < Sn < Rb', 'Rb < Sr < I < Te < Sn'],
  'Metallic character increases down a group and to the LEFT across a period (larger atoms, lower ionization energy, easier to lose electrons). In period 5 the order left → right is Rb (1), Sr (2), Sn (14), Te (16), I (17), so increasing metallic character runs right → left: I < Te < Sn < Sr < Rb. The reversed list is decreasing metallic character.',
  ['Metallic character follows the opposite trend to ionization energy.', 'More metallic toward the left of a period.', 'Order them by group, from 17 back to 1.']);
{
  const lamK = hc / (419000 / NA) * 1e9;
  mcq(14, 4, 'Exam',
    'The first ionization energy of potassium is 419 kJ/mol. Of the following wavelengths, which is the LONGEST one whose photons can ionize a gaseous K atom?',
    '275 nm', ['200 nm', '300 nm', '350 nm', '450 nm'],
    `Threshold: E per atom = 419 000 / 6.022 × 10²³ = ${sci(419000 / NA, 4)} J; λ(max) = hc/E = ${fx(lamK, 0)} nm. Any wavelength SHORTER than ${fx(lamK, 0)} nm has enough energy per photon. Of the choices, 200 nm and 275 nm qualify, and 275 nm is the longer. 300, 350 and 450 nm are longer than the threshold, so their photons are too weak, however bright the light.`,
    ['Find the threshold wavelength from the energy per atom.', 'λ(max) = hc ÷ (419 000 J/mol ÷ N_A).', `λ(max) = ${fx(lamK, 0)} nm; pick the longest choice below it.`]);
}

/* =====================================================================
   WRITE THE DATA FILE
   ===================================================================== */
const header = `/* Periodic Coast - Chapter 92, the Evening Exam 2 review set (CHM 11510, Wed Oct 21).
   GENERATED by tools/chem/gen-exam2.cjs - edit the generator, not this file.

   A full-length exam simulation for Thermochemistry (Ch 6, lessons 7-9), Quantum Theory
   (Ch 7, lessons 10-12) and Electron Configuration & Periodicity (Ch 8, lessons 13-14):
   five-choice items, about half conceptual and half calculation, mostly tier 3-4.
   Sources: the Week 6 and Week 7 recitation worksheets (every part reproduced, tagged
   Worksheet, plus at least three numeric/phrasing variations of each problem), the lecture
   slides' worked examples (NH₃ + O₂ as on the slide; variations of the Mg ribbon, the
   limiting-reagent coffee-cup problem, sweat and glucose/ΔH(vap) examples), and Silberberg
   10th ed. sample-problem types 6.1-6.11, 7.1-7.4 and 8.1-8.5 (original wording and numbers).
   Cross-topic items join calorimetry with Hess's law, ionization energy with photon
   wavelength, and reaction heat with photon counts.
   Every answer and every numeric distractor is computed by the generator from the course
   constants (h = 6.626 × 10⁻³⁴ J·s, c = 2.998 × 10⁸ m/s, N_A = 6.022 × 10²³; Bohr
   2.18 × 10⁻¹⁸ J, 2.179 × 10⁻¹⁸ J on the worksheet's Q8); each distractor encodes one named
   mistake (sign, per-atom vs per-mole, unit conversion, coefficient, 4s-before-3d...). */
`;
const body = R.map(r => '[' + r.map(v => JSON.stringify(v)).join(',\n ') + ']').join(',\n');
const out = header + 'chemAddQuestions([\n' + body + '\n]);\n';
const file = path.join(__dirname, '..', '..', 'js', 'data', 'chem', 'chem-q-exam2.js');
fs.writeFileSync(file, out);
const by = (k) => R.reduce((m, r) => { m[r[k]] = (m[r[k]] || 0) + 1; return m; }, {});
const topic = R.reduce((m, r) => { const t = r[2] <= 9 ? 'thermo' : r[2] <= 12 ? 'quantum' : 'config'; m[t] = (m[t] || 0) + 1; return m; }, {});
console.log('wrote ' + R.length + ' questions to ' + file);
console.log('by lesson', by(2), '\nby tier', by(3), '\nby tag', by(4), '\nby kind', by(5), '\nby topic', topic, '\npositions', counts);
