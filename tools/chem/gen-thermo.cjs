/* Generator for js/data/chem/chem-q-thermo.js (Gym 5, Thermochemistry, Silberberg 6.1-6.6,
   lessons 7, 8, 9). Every number in a stem, choice or explanation is computed here, so the
   key, the distractors and the worked solutions cannot drift apart.

     node tools/chem/gen-thermo.cjs        writes js/data/chem/chem-q-thermo.js

   Each mcq lists the correct choice FIRST; the generator then moves it to a balanced
   position (A-E) so the keys are spread evenly. `ordered: true` keeps a natural order
   (counts, rankings) and uses the given `ans` index instead. */
const fs = require('fs');
const path = require('path');

/* ---------- number formatting (Unicode minus, × 10ⁿ) ---------- */
const SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
function fx(x, d) {           // round half away from zero (school rounding), immune to binary ties
  const k = Math.pow(10, d), s = (Math.round(Math.abs(x) * k + 1e-7) / k).toFixed(d); return (x < 0 && Number(s) !== 0 ? '−' : '') + s; }
function px(x, d) { return (x > 0 && Number(Math.abs(x).toFixed(d)) !== 0 ? '+' : '') + fx(x, d); }
function sci(x, n) {
  let e = Math.floor(Math.log10(Math.abs(x)));
  let ms = (Math.abs(x) / Math.pow(10, e)).toFixed(n - 1);
  if (Number(ms) >= 10) { e++; ms = (Math.abs(x) / Math.pow(10, e)).toFixed(n - 1); }
  return (x < 0 ? '−' : '') + ms + ' × 10' + String(e).split('').map(ch => SUP[ch]).join('');
}
function sciP(x, n) { return (x > 0 ? '+' : '') + sci(x, n); }
function sg(x, n) {           // n significant figures, plain notation when sensible
  const e = Math.floor(Math.log10(Math.abs(x)));
  if (e >= n + 1 || e < -3) return sci(x, n);
  if (e >= n) return sci(x, n);
  const d = Math.max(0, n - 1 - e);
  return fx(x, d);
}
function sgP(x, n) { return (x > 0 ? '+' : '') + sg(x, n); }

/* ---------- data ---------- */
const AM = { H: 1.008, C: 12.01, N: 14.01, O: 16.00, Mg: 24.31, Al: 26.98, Fe: 55.85, Ba: 137.33, S: 32.06,
  Cl: 35.45, Cu: 63.55, Ag: 107.87, Ti: 47.87, Na: 22.99 };
const cw = 4.184, LATM = 101.3;
const M_H2O = 2 * AM.H + AM.O;                 // 18.016
const M_CH4 = AM.C + 4 * AM.H;                 // 16.042
const M_CH3OH = AM.C + 4 * AM.H + AM.O;        // 32.042
const M_NH4NO3 = 2 * AM.N + 4 * AM.H + 3 * AM.O;
const M_C8H18 = 8 * AM.C + 18 * AM.H;
const M_BaOH2_8 = AM.Ba + 2 * (AM.O + AM.H) + 8 * M_H2O;
const M_BaOH2 = AM.Ba + 2 * (AM.O + AM.H);
const M_Fe2O3 = 2 * AM.Fe + 3 * AM.O;
const M_H2 = 2 * AM.H, M_O2 = 2 * AM.O;
const Hf = { CaO: -635.1, CaCO3: -1206.9, Cdia: 1.9, CO: -110.5, CO2: -393.5, CH4: -74.9, CH3OH: -238.6, HCN: 135,
  CS2: 87.9, Clg: 121.0, HCl: -92.3, Hg: 218.0, NH3: -45.9, NO: 90.3, O3: 143, H2Og: -241.8, H2Ol: -285.8,
  AgCl: -127.0, Nag: 107.8, NaCl: -411.1, SO2: -296.8, SO3: -396.0, C3H8: -103.8 };

const near = (a, b, tol) => { if (Math.abs(a - b) > (tol || 1e-6)) throw new Error('check failed: ' + a + ' vs ' + b); };

/* ---------- question list ---------- */
const Q = [];
const add = o => Q.push(o);
const H = (a, b, c) => [a, b, c];

/* ======================================================================
   LESSON 7 - Thermochemistry 1 (6.1-6.3): system, heat and work, ΔE,
   PV work, state functions, enthalpy, exo/endo, specific heat, calorimetry
   ====================================================================== */

add({ L: 7, t: 1, tag: 'Lecture', k: 'mcq',
  q: 'In the lecture’s coffee-cup calorimeter diagram, the reacting sample is labelled “system”. How is the water around the sample classified?',
  c: ['The surroundings - it absorbs the heat the system releases (or supplies the heat it absorbs)',
      'Part of the system, because it is inside the same cup',
      'An isolated system, because the cups are insulated',
      'The boundary between the system and the rest of the universe',
      'Neither - the water only matters in a bomb calorimeter'],
  why: 'The system is the part of the universe we are studying - here the reaction. Everything else, and in particular the water that exchanges heat with it, is the surroundings. That is why the lecture writes −q(sample) = q(surroundings): whatever heat the system loses, the water gains. The foam cups are insulation that keeps the room out of the bookkeeping; they do not turn the water into a system or an isolated system.',
  h: H('Which part are you actually interested in?', 'Everything that is not the system is the surroundings.', 'You read the water’s temperature change to learn the heat the reaction released or absorbed.') });

add({ L: 7, t: 1, tag: 'Concept', k: 'mcq',
  q: 'A pot of soup boils on a stove with no lid. The soup is the system. What kind of system is it?',
  c: ['Open - both matter (steam) and energy (heat) cross the boundary',
      'Closed - only energy crosses the boundary',
      'Isolated - neither matter nor energy crosses the boundary',
      'Closed - only matter crosses the boundary',
      'Isolated - the pot walls block the exchange of heat'],
  why: 'Open system: exchanges matter AND energy with the surroundings. Closed system: exchanges energy but not matter (a stoppered flask). Isolated system: exchanges neither (an ideal sealed thermos). The uncovered soup loses steam (matter) and takes in heat from the burner (energy), so it is open. A closed system can never exchange matter, so “closed - only matter crosses” mixes up the definitions.',
  h: H('Does anything physically leave the pot?', 'Open = matter + energy; closed = energy only; isolated = neither.', 'Steam escapes and the burner heats the pot.') });

add({ L: 7, t: 1, tag: 'Concept', k: 'mcq',
  q: 'A reaction runs inside a tightly stoppered glass flask resting on a lab bench. The flask gets warm and warms the bench, but no gas escapes. What kind of system is the reaction mixture?',
  c: ['Closed', 'Open', 'Isolated', 'Open, because heat leaves it', 'Isolated, because no gas escapes'],
  why: 'No matter crosses the boundary (the stopper keeps every atom in) but energy does - heat flows through the glass into the bench. Energy only = closed system. An open system would also exchange matter; an isolated system would exchange neither matter nor heat, and this flask clearly warms the bench.',
  h: H('Ask two separate questions: does matter cross? does energy cross?', 'Closed systems exchange energy but not matter.', 'The stopper blocks matter; the glass passes heat.') });

add({ L: 7, t: 1, tag: 'Lecture', k: 'mcq',
  q: 'The lecture divides the energy changes in a chemical reaction into heat and work. Which of these is an example of WORK rather than heat?',
  c: ['A gas produced by a reaction pushes a piston outward against the atmosphere',
      'Energy flows from a hot cup of coffee into a cold mug',
      'The water in a coffee-cup calorimeter warms by 2.21 °C',
      'A hot metal block cools down in room air',
      'Ice melts when it is dropped into warm water'],
  why: 'Lecture definitions: heat is the energy transfer that shows up as (is proportional to) a temperature change; work is every other energy change - for example a change in volume at constant pressure (PV work, w = −PΔV) or electrical work. A gas pushing back a piston (or the atmosphere) is PV work. The other four are all heat flowing because of a temperature difference.',
  h: H('Heat goes with a temperature difference. What is left?', 'Work includes volume change against an external pressure and electrical work.', 'Look for the one involving motion of a piston.') });

add({ L: 7, t: 1, tag: 'Concept', k: 'mcq',
  q: 'A system releases heat to its surroundings, and at the same time the surroundings do work on the system (they compress it). What are the signs of q and w?',
  c: ['q < 0 and w > 0', 'q > 0 and w < 0', 'q < 0 and w < 0', 'q > 0 and w > 0', 'q = 0 and w > 0'],
  why: 'Signs are always from the SYSTEM’s point of view. Heat released by the system (to the surroundings) is negative: q < 0. Work done ON the system (compression by the surroundings) adds energy to it: w > 0. Students who think from the surroundings’ side get both signs backwards (q > 0, w < 0).',
  h: H('Ask: is the system gaining or losing energy in each transfer?', 'Releasing heat = losing energy; being compressed = gaining energy.', 'Losing → negative, gaining → positive.') });

add({ L: 7, t: 1, tag: 'Concept', k: 'mcq',
  q: 'Which statement expresses the first law of thermodynamics?',
  c: ['ΔE(system) = −ΔE(surroundings), so the total energy of the universe is constant',
      'The internal energy of a system is the same before and after every process',
      'ΔE(system) = ΔE(surroundings)',
      'Heat always flows from the system to the surroundings',
      'Heat and work are each conserved separately'],
  why: 'Energy is conserved: any energy the system gains, the surroundings lose, and vice versa, so ΔE(system) + ΔE(surroundings) = 0. The system’s own energy certainly can change (that is what ΔE = q + w measures). Heat and work can convert into each other - only their sum is accounted for, not each separately.',
  h: H('The law is about conservation of energy.', 'The system’s energy can change - but where does it go?', 'System + surroundings = universe; its total energy never changes.') });

{ // ΔE = q + w, absorbs 325 J, does 120 J of work
  const dE = 325 - 120;
  add({ L: 7, t: 2, tag: 'Calculation', k: 'mcq',
    q: 'A system absorbs 325 J of heat from its surroundings and does 120 J of work on the surroundings. What is ΔE for the system?',
    c: [px(dE, 0) + ' J', '+445 J', '−205 J', '−445 J', '+325 J'],
    why: `ΔE = q + w. Heat absorbed: q = +325 J. Work done BY the system: w = −120 J. ΔE = 325 + (−120) = ${px(dE, 0)} J. +445 J comes from giving w the wrong sign; −205 J flips both signs (the surroundings’ view); +325 J ignores the work.`,
    h: H('Write ΔE = q + w and decide each sign first.', 'Absorbed heat is positive; work done BY the system is negative.', 'ΔE = (+325) + (−120).') });
}
{ // releases 455 kJ, 152 kJ work done on it
  const dE = -455 + 152;
  add({ L: 7, t: 2, tag: 'Calculation', k: 'mcq',
    q: 'A system releases 455 kJ of heat while the surroundings do 152 kJ of work on it. What is ΔE of the system?',
    c: [px(dE, 0) + ' kJ', '−607 kJ', '+303 kJ', '+607 kJ', '−455 kJ'],
    why: `q = −455 kJ (released), w = +152 kJ (work done ON the system). ΔE = −455 + 152 = ${px(dE, 0)} kJ. −607 kJ treats the work as done by the system; +303 kJ is the surroundings’ ΔE, not the system’s; −455 kJ ignores the work.`,
    h: H('Released heat has which sign?', 'Work done ON the system is positive.', 'ΔE = −455 + 152.') });
}
{ // num: loses 2.35 kJ, 1.05 kJ work on gas
  const dE = -2.35 + 1.05;
  add({ L: 7, t: 2, tag: 'Calculation', k: 'num',
    q: 'A gas in a cylinder loses 2.35 kJ of heat to the surroundings while a piston compresses it, doing 1.05 kJ of work on the gas. What is ΔE of the gas? Include the sign. (Enter a number in kJ.)',
    c: [fx(dE, 2) + ' kJ'], ans: Number(dE.toFixed(2)),
    why: `q = −2.35 kJ (heat lost by the gas). w = +1.05 kJ (compression = work done ON the gas). ΔE = q + w = −2.35 + 1.05 = ${fx(dE, 2)} kJ. The gas loses more energy as heat than it gains as work, so its internal energy falls.`,
    h: H('Two transfers: one out, one in.', 'q = −2.35 kJ, w = +1.05 kJ.', 'ΔE = −2.35 + 1.05.'), opts: { tol: 0.01 } });
}
{ // back-solve q
  const q = -125 - 85;
  add({ L: 7, t: 3, tag: 'Calculation', k: 'mcq',
    q: 'A gas is compressed by its surroundings, which do 85 J of work on it, and its internal energy changes by ΔE = −125 J. What is q for the gas?',
    c: [fx(q, 0) + ' J (heat released)', '−40 J (heat released)', '+210 J (heat absorbed)', '+40 J (heat absorbed)', '−125 J (heat released)'],
    why: `ΔE = q + w, so q = ΔE − w. Work done ON the gas: w = +85 J. q = −125 − (+85) = ${fx(q, 0)} J. The gas gained 85 J as work and still ended 125 J lower, so it must have released 210 J of heat. −40 J comes from adding instead of subtracting w (q = ΔE + w).`,
    h: H('Rearrange ΔE = q + w for q.', 'q = ΔE − w, with w = +85 J.', 'q = −125 − 85.') });
}
add({ L: 7, t: 2, tag: 'Concept', k: 'mcq',
  q: 'Which combination ALWAYS gives a negative ΔE for the system, whatever the sizes of q and w?',
  c: ['The system releases heat and does work on the surroundings',
      'The system absorbs heat and has work done on it',
      'The system releases heat and has work done on it',
      'The system absorbs heat and does work on the surroundings',
      'No heat flows and work is done on the system'],
  why: 'ΔE = q + w. Releasing heat makes q < 0; doing work on the surroundings makes w < 0. Two negatives always sum to a negative. Absorbing heat with work done on the system (q > 0, w > 0) is always positive, and so is q = 0 with w > 0. The mixed-sign cases depend on which magnitude is bigger.',
  h: H('Translate each phrase into the sign of q and w.', 'Released heat → q < 0; work done BY the system → w < 0.', 'You need both terms negative.') });
add({ L: 7, t: 2, tag: 'Concept', k: 'mcq',
  q: 'For which process can you NOT tell the sign of ΔE without knowing the actual values of q and w?',
  c: ['The system absorbs heat and does work on the surroundings',
      'The system absorbs heat and has work done on it',
      'The system releases heat and does work on the surroundings',
      'No heat flows and the surroundings do work on the system',
      'The system releases heat and no work is done'],
  why: 'Absorbs heat (q > 0) but does work (w < 0): the two terms have opposite signs, so ΔE = q + w could be positive or negative depending on which is larger. Every other choice has q and w with the same sign or one of them zero, so the sign of ΔE is fixed: (+,+) and (0,+) give positive, (−,−) and (−,0) give negative.',
  h: H('Write the sign of q and of w for each choice.', 'If both are the same sign (or one is zero) the sum’s sign is known.', 'Look for a positive q with a negative w.') });

add({ L: 7, t: 1, tag: 'Concept', k: 'mcq',
  q: 'Which of the following is NOT a state function?',
  c: ['Work, w', 'Internal energy, E', 'Enthalpy, H', 'Pressure, P', 'Temperature, T'],
  why: 'A state function depends only on the current state of the system (its P, V, T, composition), not on how it got there. E, H, P, V and T are state functions. Heat q and work w are path functions: the same change of state can be reached with different splits between q and w. Only their sum, ΔE, is fixed by the start and end states.',
  h: H('Which quantity describes a process rather than a state?', 'q and w depend on the path; E, H, P, V, T do not.', 'Only one choice is a path function.') });
add({ L: 7, t: 2, tag: 'Concept', k: 'mcq',
  q: 'Which pair of quantities are BOTH path-dependent (not state functions)?',
  c: ['q and w', 'E and H', 'ΔE and q', 'ΔH and w', 'V and T'],
  why: 'Heat and work are the two ways energy moves, and how much moves each way depends on the path. E, H, V and T (and so ΔE and ΔH) depend only on the initial and final states. ΔE = q + w is path-independent even though q and w separately are not.',
  h: H('State functions: E, H, P, V, T.', 'Which quantities are “energy in transit”?', 'Heat and work.') });
add({ L: 7, t: 2, tag: 'Concept', k: 'mcq',
  q: 'A gas is taken from state A to state B by two different paths. Which quantity must be the same for both paths?',
  c: ['ΔE', 'q', 'w', 'Both q and w separately', 'The heat released by the gas'],
  why: 'E is a state function, so ΔE = E(B) − E(A) is fixed by the two states, whatever route connects them. The split of that ΔE into heat and work (q and w) can be different for each path. Hess’s law relies on the same idea for H.',
  h: H('Which quantity depends only on where you start and finish?', 'q and w are path functions.', 'E is a state function.') });
{ // path A / path B trap
  const dE = 50 - 20, wB = dE - 10;
  add({ L: 7, t: 4, tag: 'Trap', k: 'mcq',
    q: 'A system goes from state 1 to state 2 by path A, with q = +50 J and w = −20 J. The same change is made by path B, in which q = +10 J. What is w for path B?',
    c: [px(wB, 0) + ' J', '−20 J', '+40 J', '−40 J', '+30 J'],
    why: `ΔE depends only on the states, so it is the same for both paths. Path A: ΔE = q + w = 50 + (−20) = +${dE} J. Path B: w = ΔE − q = ${dE} − 10 = ${px(wB, 0)} J. Copying w = −20 J assumes work is a state function - it is not. +30 J is ΔE itself, not w.`,
    h: H('Which quantity is identical for both paths?', 'Find ΔE from path A.', 'w(B) = ΔE − q(B) = 30 − 10.') });
}

{ // PV work expansion 2.50 -> 6.75 L at 1.30 atm
  const wLa = -1.30 * (6.75 - 2.50), wJ = wLa * LATM;
  add({ L: 7, t: 2, tag: 'Calculation', k: 'mcq',
    q: 'A gas expands from 2.50 L to 6.75 L against a constant external pressure of 1.30 atm. What is w for the gas? Include the sign. (1 L·atm = 101.3 J)',
    c: [sci(wJ, 3) + ' J', sciP(-wJ, 3) + ' J', fx(wLa, 2) + ' J', sg(-1.30 * 6.75 * LATM, 3) + ' J', sg(-1.30 * 2.50 * LATM, 3) + ' J'],
    why: `w = −PΔV = −(1.30 atm)(6.75 − 2.50 L) = ${fx(wLa, 3)} L·atm. Convert: ${fx(wLa, 3)} × 101.3 J/(L·atm) = ${fx(wJ, 1)} J ≈ ${sci(wJ, 3)} J. Negative, because the expanding gas does ${sci(-wJ, 3)} J of work ON the surroundings, so the gas loses that energy. ${fx(wLa, 2)} J forgot the L·atm → J conversion; ${sg(-1.30 * 6.75 * LATM, 3)} J and ${sg(-1.30 * 2.50 * LATM, 3)} J used one volume instead of ΔV; the positive answer has the wrong sign.`,
    h: H('w = −PΔV with ΔV = V(final) − V(initial).', 'Get L·atm first, then × 101.3 J.', `ΔV = 4.25 L; −1.30 × 4.25 × 101.3.`) });
}
{ // num compression 10.0 -> 4.50 L at 2.00 atm
  const wLa = -2.00 * (4.50 - 10.0), wJ = wLa * LATM;
  add({ L: 7, t: 2, tag: 'Calculation', k: 'num',
    q: 'A gas is compressed from 10.0 L to 4.50 L by a constant external pressure of 2.00 atm. What is w for the gas, in joules? Include the sign. (1 L·atm = 101.3 J. Enter a number in J.)',
    c: [sciP(wJ, 3) + ' J'], ans: Number(wJ.toFixed(1)),
    why: `w = −PΔV = −(2.00 atm)(4.50 − 10.0 L) = −(2.00)(−5.50) = +${fx(wLa, 1)} L·atm. In joules: ${fx(wLa, 1)} × 101.3 = ${fx(wJ, 1)} J ≈ ${sciP(wJ, 3)} J. Positive: the surroundings do work ON the gas when they compress it (ΔV < 0).`,
    h: H('ΔV is negative for a compression.', 'w = −PΔV, so a negative ΔV gives a positive w.', `−2.00 × (−5.50) = +11.0 L·atm; × 101.3 J.`), opts: { tol: 0.01 } });
}
{ // absorbs 1.20 kJ while expanding 1.00 -> 5.00 L at 1.50 atm
  const wJ = -1.50 * 4.00 * LATM, dE = 1200 + wJ;
  add({ L: 7, t: 3, tag: 'Calculation', k: 'mcq',
    q: 'A gas absorbs 1.20 kJ of heat while it expands from 1.00 L to 5.00 L against a constant pressure of 1.50 atm. What is ΔE for the gas? (1 L·atm = 101.3 J)',
    c: [sgP(dE, 3) + ' J', sciP(1200 - wJ, 3) + ' J', sciP(1200 - 6.00, 3) + ' J', sg(-dE, 3) + ' J', sci(-(1200 - wJ), 3) + ' J'],
    why: `q = +1200 J (absorbed). w = −PΔV = −(1.50 atm)(4.00 L) = −6.00 L·atm × 101.3 = ${fx(wJ, 1)} J. ΔE = q + w = 1200 + (${fx(wJ, 1)}) = ${fx(dE, 1)} J ≈ ${sgP(dE, 3)} J. ${sciP(1200 - wJ, 3)} J adds the work with the wrong sign; ${sciP(1194, 3)} J subtracts 6.00 without converting L·atm to J.`,
    h: H('Put q and w in the same unit (J) before adding.', 'w = −PΔV = −6.00 L·atm; convert with 101.3 J/(L·atm).', `ΔE = 1200 J + (${fx(wJ, 0)} J).`) });
}
add({ L: 7, t: 3, tag: 'Trap', k: 'mcq',
  q: 'A gas in one half of an insulated box expands into the other half, which is a vacuum, when a partition is removed. What is the work done, w?',
  c: ['w = 0, because the gas expands against zero external pressure',
      'w < 0, because the gas expands',
      'w > 0, because the gas spreads out on its own',
      'w = −PΔV using the gas’s own starting pressure',
      'w cannot be found without knowing ΔV'],
  why: 'In w = −PΔV, P is the EXTERNAL pressure the gas pushes against. Expanding into a vacuum, P(external) = 0, so w = −(0)(ΔV) = 0 no matter how big ΔV is. Nothing is pushed back, so no work is done. Using the gas’s own pressure is the trap.',
  h: H('Which pressure goes into w = −PΔV?', 'It is the opposing (external) pressure.', 'What is the pressure of a vacuum?') });
add({ L: 7, t: 2, tag: 'Concept', k: 'mcq',
  q: 'A piston pushes down and compresses a gas at constant external pressure. What are the signs of ΔV and w for the gas?',
  c: ['ΔV < 0 and w > 0', 'ΔV < 0 and w < 0', 'ΔV > 0 and w < 0', 'ΔV > 0 and w > 0', 'ΔV < 0 and w = 0'],
  why: 'Compression makes the volume smaller, so ΔV = V(final) − V(initial) < 0. Then w = −PΔV = −(positive)(negative) > 0: the surroundings do work ON the gas, raising its energy. An expansion is the reverse (ΔV > 0, w < 0).',
  h: H('Is the final volume bigger or smaller?', 'w = −PΔV.', 'A minus times a negative ΔV is positive.') });

add({ L: 7, t: 1, tag: 'Concept', k: 'mcq',
  q: 'The enthalpy change, ΔH, of a process equals which quantity?',
  c: ['The heat transferred at constant pressure, q(p)', 'The heat transferred at constant volume, q(v)',
      'The work done at constant pressure', 'q + w at constant volume', 'The internal energy E of the products'],
  why: 'Enthalpy is defined as H = E + PV, which makes ΔH = ΔE + PΔV. At constant pressure that equals the heat exchanged: ΔH = q(p). The heat at constant volume (bomb calorimeter) is ΔE = q(v), because no PV work is done.',
  h: H('Coffee-cup calorimeters are open to the atmosphere.', 'ΔE = q(v) but ΔH = q(?).', 'Constant pressure.') });
add({ L: 7, t: 1, tag: 'Lecture', k: 'mcq',
  q: 'The lecture boxes the definition of the enthalpy change of a reaction. ΔH equals:',
  c: ['H(products) − H(reactants)', 'H(reactants) − H(products)', 'H(products) + H(reactants)',
      'q + w measured at constant volume', 'H(initial) ÷ H(final)'],
  why: 'ΔH = H(final) − H(initial) = H(products) − H(reactants). If the products sit lower in enthalpy than the reactants, ΔH is negative and the reaction is exothermic; if they sit higher, ΔH is positive (endothermic). Reversing the subtraction is exactly the sign error the exam punishes.',
  h: H('Every Δ in chemistry is final minus initial.', 'Products are the final state.', 'H(products) − H(reactants).') });
add({ L: 7, t: 2, tag: 'Concept', k: 'mcq',
  q: 'For which reaction, run at constant pressure, is ΔH essentially equal to ΔE?',
  c: ['H₂(g) + Cl₂(g) → 2HCl(g)', 'CaCO₃(s) → CaO(s) + CO₂(g)', 'N₂(g) + 3H₂(g) → 2NH₃(g)',
      '2H₂(g) + O₂(g) → 2H₂O(l)', '2CO(g) + O₂(g) → 2CO₂(g)'],
  why: 'ΔH = ΔE + PΔV, so ΔH and ΔE differ only when the volume changes - in practice when the number of moles of GAS changes. H₂ + Cl₂ → 2HCl has 2 mol gas on each side, so ΔV ≈ 0 and ΔH ≈ ΔE. CaCO₃ decomposition makes 1 mol of gas from none; N₂ + 3H₂ (4 → 2), 2H₂ + O₂ (3 → 0) and 2CO + O₂ (3 → 2) all lose gas.',
  h: H('ΔH − ΔE = PΔV.', 'Volume changes come almost entirely from gases.', 'Count moles of gas on each side.') });
{ // ΔH = ΔE + PΔV
  const PdVkJ = 1.00 * 12.0 * LATM / 1000, dH = -250.0 + PdVkJ;
  add({ L: 7, t: 3, tag: 'Calculation', k: 'mcq',
    q: 'A reaction at a constant 1.00 atm has ΔE = −250.0 kJ, and its volume increases by 12.0 L. What is ΔH? (1 L·atm = 101.3 J)',
    c: [fx(dH, 1) + ' kJ', fx(-250.0 - PdVkJ, 1) + ' kJ', '−238.0 kJ', '−250.0 kJ', '−262.0 kJ'],
    why: `ΔH = ΔE + PΔV. PΔV = (1.00 atm)(12.0 L) = 12.0 L·atm × 101.3 J = ${fx(PdVkJ * 1000, 1)} J = ${fx(PdVkJ, 3)} kJ. ΔH = −250.0 + ${fx(PdVkJ, 3)} = ${fx(dH, 1)} kJ. ${fx(-250.0 - PdVkJ, 1)} kJ subtracts PΔV; −238.0 kJ adds 12.0 as if L·atm were kJ; −250.0 kJ assumes ΔH = ΔE even though the volume changed.`,
    h: H('ΔH = ΔE + PΔV.', 'Convert PΔV from L·atm to kJ before adding.', `12.0 L·atm = ${fx(PdVkJ, 3)} kJ.`) });
}
{ // t4 constant P releases 15.0 kJ, V decreases 5.0 L at 1.00 atm
  const w = 1.00 * 5.0 * LATM / 1000, dE = -15.0 + w;
  add({ L: 7, t: 4, tag: 'Exam', k: 'mcq',
    q: 'At a constant 1.00 atm, a reaction releases 15.0 kJ of heat while the volume of the system DECREASES by 5.0 L (gas is consumed). What are ΔH and ΔE for the reaction? (1 L·atm = 101.3 J)',
    c: [`ΔH = −15.0 kJ, ΔE = ${fx(dE, 1)} kJ`, `ΔH = −15.0 kJ, ΔE = ${fx(-15.0 - w, 1)} kJ`, `ΔH = ${fx(dE, 1)} kJ, ΔE = −15.0 kJ`,
        'ΔH = −15.0 kJ, ΔE = −10.0 kJ', `ΔH = +15.0 kJ, ΔE = +${fx(-dE, 1)} kJ`],
    why: `At constant pressure the heat IS the enthalpy change: ΔH = q(p) = −15.0 kJ. Work: w = −PΔV = −(1.00 atm)(−5.0 L) = +5.0 L·atm = +${fx(w * 1000, 0)} J = +${fx(w, 3)} kJ (the surroundings push the system in). ΔE = q + w = −15.0 + ${fx(w, 3)} = ${fx(dE, 1)} kJ. −10.0 kJ adds 5.0 L·atm as though it were 5.0 kJ; ${fx(-15.0 - w, 1)} kJ gives w the wrong sign; swapping the two values confuses q(p) with ΔE.`,
    h: H('Which one equals q at constant pressure?', 'w = −PΔV with ΔV = −5.0 L, so w > 0.', `w = +5.0 L·atm = +${fx(w, 3)} kJ; ΔE = −15.0 + ${fx(w, 3)}.`) });
}
add({ L: 7, t: 4, tag: 'Exam', k: 'mcq',
  q: 'For 2H₂(g) + O₂(g) → 2H₂O(l) run at constant pressure (ΔH is negative), which statement is correct?',
  c: ['w > 0, and ΔE is slightly less negative than ΔH', 'w < 0, and ΔE is more negative than ΔH',
      'w = 0, so ΔE equals ΔH exactly', 'w > 0, and ΔE is more negative than ΔH', 'w < 0, and ΔE is less negative than ΔH'],
  why: 'Three moles of gas become liquid, so the volume shrinks (ΔV < 0) and the atmosphere does work ON the system: w = −PΔV > 0. At constant pressure q = ΔH, so ΔE = q + w = ΔH + (positive) - ΔE is a bit LESS negative than ΔH. (Equivalently ΔH = ΔE + PΔV with PΔV < 0.)',
  h: H('What happens to the volume when 3 mol of gas become liquid?', 'ΔV < 0 gives w = −PΔV > 0.', 'ΔE = ΔH + w with w positive.') });

add({ L: 7, t: 1, tag: 'Concept', k: 'mcq',
  q: 'Which description fits an EXOTHERMIC reaction?',
  c: ['ΔH < 0; heat flows from the system to the surroundings, which warm up',
      'ΔH > 0; heat flows from the surroundings into the system, which feel cold',
      'ΔH < 0; heat flows from the surroundings into the system',
      'ΔH > 0; the products have lower enthalpy than the reactants',
      'ΔH = 0; the temperature of the surroundings does not change'],
  why: 'Exothermic: “heat released” - energy leaves the system as heat, so the products sit lower in enthalpy than the reactants, ΔH = H(products) − H(reactants) < 0, and the surroundings (your hand, the water) warm up. Endothermic is the reverse: ΔH > 0, heat absorbed from the surroundings, which cool.',
  h: H('Exo = out.', 'Heat out of the system lowers its enthalpy.', 'ΔH negative and the surroundings warm.') });
add({ L: 7, t: 2, tag: 'Concept', k: 'mcq',
  q: 'Which process is ENDOTHERMIC?',
  c: ['Dissolving ammonium nitrate, NH₄NO₃, in water (an instant cold pack)', 'Burning methane in a gas stove',
      'Liquid water freezing to ice', 'Steam condensing on a cold window', 'The thermite reaction, 2Al + Fe₂O₃ → Al₂O₃ + 2Fe'],
  why: 'Dissolving NH₄NO₃ absorbs heat from the water, so the solution gets cold - that is how a cold pack works (ΔH(soln) > 0). Combustion and thermite release heat. Freezing and condensing release the same heat that melting and vaporizing absorb, so they are exothermic.',
  h: H('Which one makes its surroundings cold?', 'Freezing and condensing RELEASE heat.', 'Think of an instant cold pack.') });
add({ L: 7, t: 2, tag: 'Concept', k: 'mcq',
  q: 'Which process is EXOTHERMIC?',
  c: ['Liquid water freezing to ice at 0 °C', 'Ice melting at 0 °C', 'Sweat evaporating from skin',
      'Water boiling at 100 °C', 'Dry ice (solid CO₂) subliming to gas'],
  why: 'Going to a more ordered, lower-energy phase releases heat: freezing (ΔH = −ΔH(fus)) and condensing are exothermic. Melting, evaporating, boiling and sublimation all absorb heat (ΔH > 0) - that is why sweat cools you.',
  h: H('Which change goes to a lower-energy phase?', 'Melting, vaporizing and subliming all need heat put in.', 'Freezing is the reverse of melting, so its ΔH has the opposite sign.') });
add({ L: 7, t: 1, tag: 'Lecture', k: 'mcq',
  q: 'In lecture, Ba(OH)₂·8H₂O(s) + 2NH₄SCN(s) → Ba(SCN)₂(aq) + 2NH₃(aq) + 10H₂O(l) has ΔH = +102 kJ. What happens to the flask, and why?',
  c: ['It feels cold, because heat flows from the surroundings (flask, hand) into the system',
      'It feels hot, because heat flows from the system into the surroundings',
      'It feels cold, because the system releases heat',
      'It feels hot, because ΔH is positive',
      'No temperature change, because the solids react without a solvent'],
  why: 'ΔH > 0 means endothermic: energy is transferred as heat FROM the surroundings TO the system (“heat absorbed”). The flask and anything touching it lose heat, so they feel cold - in the classic demo the flask freezes to a wet board. A positive ΔH never means the surroundings get hot.',
  h: H('What does the + sign on ΔH mean?', 'Endothermic = heat absorbed by the system.', 'Where does that heat come from?') });
add({ L: 7, t: 2, tag: 'Lecture', k: 'mcq',
  q: 'The lecture’s thermite reaction is Fe₂O₃(s) + 2Al(s) → Al₂O₃(s) + 2Fe(l), ΔH = −851 kJ. Which statement is TRUE?',
  c: ['The products have 851 kJ less enthalpy than the reactants, and that energy leaves as heat',
      'The products have 851 kJ more enthalpy than the reactants',
      'Heat flows from the surroundings into the system',
      'The reaction absorbs 851 kJ for every 2 mol of Al',
      'Reversing the reaction would also release 851 kJ'],
  why: 'ΔH = H(products) − H(reactants) = −851 kJ, so the products sit 851 kJ lower; the difference is released to the surroundings as heat (so much that the iron comes out molten, above its 1538 °C melting point). It RELEASES 851 kJ per 2 mol Al. The reverse reaction would have ΔH = +851 kJ (absorbed).',
  h: H('Negative ΔH: which side is lower in enthalpy?', 'ΔH = H(products) − H(reactants).', 'Exothermic = heat released from the system.') });
add({ L: 7, t: 2, tag: 'Concept', k: 'mcq',
  q: 'An enthalpy diagram for a reaction shows the products drawn on a HIGHER level than the reactants, with an arrow pointing up. Which describes the reaction?',
  c: ['Endothermic: ΔH > 0 and heat is absorbed', 'Exothermic: ΔH < 0 and heat is released', 'Endothermic: ΔH < 0 and heat is absorbed',
      'Exothermic: ΔH > 0 and heat is released', 'Neither: an enthalpy diagram cannot show the sign of ΔH'],
  why: 'In an enthalpy diagram the vertical axis is H. Products above reactants means H(products) > H(reactants), so ΔH = H(products) − H(reactants) > 0: endothermic, “heat in”. The lecture’s example is H₂O(s) → H₂O(l). Exothermic reactions (like CH₄ combustion) have the products drawn below the reactants.',
  h: H('The vertical axis is enthalpy.', 'ΔH = H(products) − H(reactants).', 'Going up means energy was put in.') });
add({ L: 7, t: 2, tag: 'Concept', k: 'mcq',
  q: 'A reaction is run in a flask sitting in a water bath. The water’s temperature drops from 25.0 °C to 21.3 °C. Which is true of the reaction?',
  c: ['It is endothermic: q(rxn) > 0 and q(water) < 0', 'It is exothermic: q(rxn) < 0 and q(water) > 0',
      'It is endothermic: q(rxn) < 0 and q(water) > 0', 'It is exothermic: q(rxn) > 0 and q(water) < 0',
      'It is endothermic: q(rxn) > 0 and q(water) > 0'],
  why: 'The water (surroundings) cooled, so it lost heat: q(water) = m·c·ΔT < 0 because ΔT < 0. That heat went into the reaction (system): q(rxn) = −q(water) > 0, so ΔH > 0 and the reaction is endothermic. The two q’s always have opposite signs.',
  h: H('Who lost heat: the water or the reaction?', 'q(rxn) = −q(water).', 'The water cooled, so q(water) is negative.') });

add({ L: 7, t: 1, tag: 'Concept', k: 'mcq',
  q: 'Which quantity has units of J/(mol·K)?',
  c: ['Molar heat capacity', 'Specific heat capacity', 'Heat capacity of an object', 'Calorimeter constant', 'Enthalpy of reaction'],
  why: 'Specific heat capacity c: heat to raise 1 GRAM by 1 K, J/(g·K). Molar heat capacity C(m): heat to raise 1 MOLE by 1 K, J/(mol·K) = c × molar mass. Heat capacity C of a whole object (or a calorimeter constant): heat to raise the whole thing by 1 K, J/K. Enthalpies of reaction are in kJ or kJ/mol, with no per-kelvin part.',
  h: H('Read the units: per mole and per kelvin.', 'Specific = per gram; molar = per mole; plain heat capacity = whole object.', 'J/(mol·K) is per mole.') });
{ // Cu molar heat capacity
  const Cm = 0.385 * AM.Cu;
  add({ L: 7, t: 2, tag: 'Calculation', k: 'mcq',
    q: 'Copper has a specific heat capacity of 0.385 J/(g·K). What is its molar heat capacity? (Cu = 63.55 g/mol)',
    c: [sg(Cm, 3) + ' J/(mol·K)', sci(0.385 / AM.Cu, 3) + ' J/(mol·K)', sg(AM.Cu / 0.385, 3) + ' J/(mol·K)', '0.385 J/(mol·K)', sci(Cm * 1000, 3) + ' J/(mol·K)'],
    why: `Molar heat capacity = specific heat × molar mass: 0.385 J/(g·K) × 63.55 g/mol = ${fx(Cm, 2)} ≈ ${sg(Cm, 3)} J/(mol·K). The grams cancel. Dividing instead (${sci(0.385 / AM.Cu, 3)}) leaves g²/mol units; ${sci(Cm * 1000, 3)} slips in a kg conversion that does not belong.`,
    h: H('Which conversion factor turns “per gram” into “per mole”?', 'Multiply by g/mol.', '0.385 × 63.55.') });
}
{ // heat capacity of object -> specific heat
  const c = 56.3 / 125;
  add({ L: 7, t: 2, tag: 'Calculation', k: 'mcq',
    q: 'A 125 g iron skillet has a heat capacity of 56.3 J/°C. What is the specific heat capacity of iron?',
    c: [fx(c, 3) + ' J/(g·°C)', sci(56.3 * 125, 3) + ' J/(g·°C)', fx(125 / 56.3, 2) + ' J/(g·°C)', '56.3 J/(g·°C)', fx(56.3 / 0.125, 0) + '. J/(g·°C)'],
    why: `Heat capacity of an object C = m·c, so c = C/m = 56.3 J/°C ÷ 125 g = ${fx(c, 3)} J/(g·°C). The heat capacity (J/°C) belongs to the whole skillet; the specific heat (J/(g·°C)) belongs to iron itself. ${fx(56.3 / 0.125, 0)}. comes from dividing by 0.125 kg and then calling the result per gram.`,
    h: H('How are C (J/°C) and c (J/(g·°C)) related?', 'C = m × c.', 'c = 56.3 ÷ 125.') });
}
add({ L: 7, t: 2, tag: 'Concept', k: 'mcq',
  q: 'Equal masses of five substances each absorb the same amount of heat. Which one shows the LARGEST temperature increase? Specific heats in J/(g·°C): Al 0.900, Fe 0.450, Cu 0.385, Au 0.129, H₂O 4.184.',
  c: ['Au', 'H₂O', 'Al', 'Fe', 'Cu'],
  why: 'ΔT = q/(m·c). With q and m the same for all five, ΔT is largest when c is SMALLEST. Gold (0.129) heats up fastest; water (4.184) changes temperature the least - which is why water is used to absorb heat in calorimeters and why coastal climates are mild.',
  h: H('Rearrange q = m·c·ΔT for ΔT.', 'ΔT is inversely proportional to c.', 'Pick the smallest specific heat.') });
add({ L: 7, t: 4, tag: 'Trap', k: 'mcq',
  q: 'The same amount of heat is added to 50.0 g of aluminum (c = 0.900 J/(g·°C)) and to 100.0 g of iron (c = 0.450 J/(g·°C)), both starting at 20.0 °C. Which ends up hotter?',
  c: ['They end at the same temperature', 'The aluminum, because it has the smaller mass', 'The iron, because it has the smaller specific heat',
      'The aluminum, because it has the larger specific heat', 'The iron, because it has the larger mass'],
  why: 'ΔT = q/(m·c). Aluminum: m·c = 50.0 × 0.900 = 45.0 J/°C. Iron: m·c = 100.0 × 0.450 = 45.0 J/°C. Same heat capacity, same heat, same ΔT, same final temperature. Looking at only the mass or only the specific heat gives the wrong answer; it is their product that matters.',
  h: H('What controls ΔT for a fixed q?', 'Compute m × c (the heat capacity) for each block.', 'Compare 50.0 × 0.900 with 100.0 × 0.450.') });
add({ L: 7, t: 2, tag: 'Concept', k: 'mcq',
  q: 'A student converts both the initial (22.40 °C) and final (29.10 °C) temperatures to kelvin before finding ΔT for q = m·c·ΔT. How does this change the calculated q?',
  c: ['It does not change q, because a temperature change is the same size in K and in °C',
      'q becomes larger by 273.15 J', 'q must then be divided by 273.15',
      'q changes sign', 'q becomes larger because kelvin temperatures are bigger numbers'],
  why: 'K = °C + 273.15, so ΔT(K) = (29.10 + 273.15) − (22.40 + 273.15) = 6.70 K = 6.70 °C. The 273.15 cancels. So J/(g·°C) and J/(g·K) are interchangeable specific-heat units, and a calorimetry ΔT never needs converting (an absolute temperature in a gas law does).',
  h: H('Subtract the two kelvin temperatures.', 'What happens to the 273.15?', 'A one-degree step is the same size on both scales.') });

{ // num q for water 255 g 22.5 -> 87.0
  const q = 255 * cw * (87.0 - 22.5) / 1000;
  add({ L: 7, t: 2, tag: 'Calculation', k: 'num',
    q: 'How much heat is needed to warm 255 g of water from 22.5 °C to 87.0 °C? (c(water) = 4.184 J/(g·°C). Enter a number in kJ.)',
    c: [sg(q, 3) + ' kJ'], ans: Number(q.toFixed(2)),
    why: `q = m·c·ΔT = (255 g)(4.184 J/(g·°C))(87.0 − 22.5 °C) = (255)(4.184)(64.5) = ${fx(q * 1000, 0)} J = ${sg(q, 3)} kJ. Positive: the water absorbs heat. Remember to divide by 1000 for kJ.`,
    h: H('q = m·c·ΔT.', 'ΔT = 87.0 − 22.5 = 64.5 °C.', '255 × 4.184 × 64.5 J, then ÷ 1000.'), opts: { tol: 0.01 } });
}
{ // Al cools 95.0 -> 25.0
  const q = 45.0 * 0.900 * (22.0 - 95.0) / 1000;
  add({ L: 7, t: 2, tag: 'Calculation', k: 'mcq',
    q: 'A 45.0 g block of aluminum (c = 0.900 J/(g·°C)) cools from 95.0 °C to 22.0 °C. What is q for the aluminum?',
    c: [sg(q, 3) + ' kJ', sgP(-q, 3) + ' kJ', sg(-45.0 * cw * 73.0 / 1000, 3) + ' kJ', sg(-45.0 * 0.900 * 95.0 / 1000, 3) + ' kJ', sg(-45.0 * 0.900 * 22.0 / 1000, 3) + ' kJ'],
    why: `q = m·c·ΔT with ΔT = T(final) − T(initial) = 22.0 − 95.0 = −73.0 °C. q = (45.0)(0.900)(−73.0) = ${fx(q * 1000, 0)} J = ${sg(q, 3)} kJ. Negative because the block loses heat. ${sg(-45.0 * cw * 73.0 / 1000, 3)} kJ uses water’s specific heat; the other two use a single temperature as if it were ΔT.`,
    h: H('ΔT is final minus initial.', 'Cooling means ΔT < 0, so q < 0.', '45.0 × 0.900 × (−73.0) J.') });
}
{ // num mass of water from q
  const m = 15000 / (cw * 25.0);
  add({ L: 7, t: 2, tag: 'Calculation', k: 'num',
    q: 'Adding 15.0 kJ of heat to a sample of water raises its temperature from 20.0 °C to 45.0 °C. What is the mass of the water? (c = 4.184 J/(g·°C). Enter a number in g.)',
    c: [sg(m, 3) + ' g'], ans: Number(m.toFixed(1)),
    why: `m = q/(c·ΔT) = 15 000 J ÷ [(4.184 J/(g·°C))(25.0 °C)] = 15 000 ÷ 104.6 = ${fx(m, 1)} g ≈ ${sg(m, 3)} g. Convert 15.0 kJ to 15 000 J first, or the answer comes out 1000 times too small.`,
    h: H('Rearrange q = m·c·ΔT for m.', 'Use q in joules: 15.0 kJ = 15 000 J.', 'm = 15 000 ÷ (4.184 × 25.0).'), opts: { tol: 0.01 } });
}
{ // unknown c
  const c = 485 / (32.5 * (54.6 - 21.0));
  add({ L: 7, t: 2, tag: 'Calculation', k: 'mcq',
    q: 'A 32.5 g piece of metal absorbs 485 J and warms from 21.0 °C to 54.6 °C. What is its specific heat capacity?',
    c: [fx(c, 3) + ' J/(g·°C)', fx(1 / c, 2) + ' J/(g·°C)', fx(485 / (32.5 * 21.0), 3) + ' J/(g·°C)', fx(485 / (32.5 * 54.6), 3) + ' J/(g·°C)', sci(c * 1000, 3) + ' J/(g·°C)'],
    why: `c = q/(m·ΔT) = 485 J ÷ [(32.5 g)(54.6 − 21.0 °C)] = 485 ÷ (32.5 × 33.6) = 485 ÷ ${fx(32.5 * 33.6, 1)} = ${fx(c, 3)} J/(g·°C). ${fx(1 / c, 2)} is the reciprocal (m·ΔT/q); the other two plug in one temperature instead of the change.`,
    h: H('Solve q = m·c·ΔT for c.', 'ΔT = 54.6 − 21.0 = 33.6 °C.', 'c = 485 ÷ (32.5 × 33.6).') });
}
{ // final T of Cu
  const dT = 1500 / (75.0 * 0.385);
  add({ L: 7, t: 3, tag: 'Calculation', k: 'mcq',
    q: 'A 75.0 g piece of copper (c = 0.385 J/(g·°C)) at 22.0 °C absorbs 1.50 kJ of heat. What is its final temperature?',
    c: [fx(22.0 + dT, 1) + ' °C', fx(22.0 - dT, 1) + ' °C', fx(dT, 1) + ' °C', fx(22.0 + 1500 / (75.0 * cw), 1) + ' °C', fx(22.0 + 1.50 / (75.0 * 0.385), 1) + ' °C'],
    why: `ΔT = q/(m·c) = 1500 J ÷ (75.0 × 0.385) = 1500 ÷ ${fx(75 * 0.385, 3)} = ${fx(dT, 1)} °C. Heat absorbed, so the temperature rises: T(final) = 22.0 + ${fx(dT, 1)} = ${fx(22.0 + dT, 1)} °C. Reporting ${fx(dT, 1)} °C gives ΔT, not T(final); ${fx(22.0 + 1500 / (75.0 * cw), 1)} °C uses water’s specific heat; ${fx(22.0 + 1.50 / (75.0 * 0.385), 1)} °C leaves q in kJ.`,
    h: H('First find ΔT, then add it to the starting temperature.', 'ΔT = q/(m·c) with q in joules.', `ΔT = 1500 ÷ 28.875.`) });
}
{ // num initial T of water
  const dT = 2090 / (50.0 * cw);
  add({ L: 7, t: 3, tag: 'Calculation', k: 'num',
    q: 'A 50.0 g sample of water releases 2.09 kJ of heat and ends at 25.0 °C. What was its initial temperature? (c = 4.184 J/(g·°C). Enter a number in °C.)',
    c: [fx(25.0 + dT, 1) + ' °C'], ans: Number((25.0 + dT).toFixed(2)),
    why: `q = −2090 J (released). ΔT = q/(m·c) = −2090 ÷ (50.0 × 4.184) = −2090 ÷ 209.2 = ${fx(-dT, 2)} °C. ΔT = T(final) − T(initial), so T(initial) = T(final) − ΔT = 25.0 − (${fx(-dT, 2)}) = ${fx(25.0 + dT, 1)} °C. Water that releases heat cools, so it must have started HOTTER than 25.0 °C - a quick sense check against answering ${fx(25.0 - dT, 1)} °C.`,
    h: H('Water that releases heat cools down. Was it hotter or colder before?', 'ΔT = −2090 ÷ (50.0 × 4.184).', 'T(initial) = 25.0 − ΔT = 25.0 + 9.99.'), opts: { abs: 0.06 } });
}
{ // Worksheet Q4 exactly
  const dT = 688 / (27.7 * 2.394);
  add({ L: 7, t: 3, tag: 'Worksheet', k: 'mcq',
    q: 'A 27.7 g sample of ethylene glycol, a car radiator coolant, absorbs 688 J of heat. Its initial temperature is 27.4 °C and its specific heat capacity is 2.394 J/(g·K). What is its final temperature?',
    c: [fx(27.4 + dT, 1) + ' °C', fx(27.4 - dT, 1) + ' °C', fx(dT, 1) + ' °C', fx(27.4 + 688 / (27.7 * cw), 1) + ' °C', fx(27.4 + 688 * 2.394 / 27.7, 1) + ' °C'],
    why: `ΔT = q/(m·c) = 688 J ÷ (27.7 g × 2.394 J/(g·K)) = 688 ÷ ${fx(27.7 * 2.394, 2)} = ${fx(dT, 2)} K (= °C). Heat absorbed, so T rises: T(final) = 27.4 + ${fx(dT, 2)} = ${fx(27.4 + dT, 1)} °C. ${fx(dT, 1)} °C is only ΔT; ${fx(27.4 - dT, 1)} °C subtracts; ${fx(27.4 + 688 / (27.7 * cw), 1)} °C uses water’s c instead of the glycol’s; ${fx(27.4 + 688 * 2.394 / 27.7, 1)} °C multiplies by c instead of dividing.`,
    h: H('Find ΔT from q = m·c·ΔT.', 'A change of 1 K is a change of 1 °C.', `ΔT = 688 ÷ (27.7 × 2.394); add it to 27.4 °C.`) });
}
{ // Worksheet Q4 variation num
  const Tf = 22.0 + 455 / (15.0 * 2.394);
  add({ L: 7, t: 2, tag: 'Worksheet', k: 'num',
    q: 'A 15.0 g sample of ethylene glycol (c = 2.394 J/(g·K)) at 22.0 °C absorbs 455 J of heat. What is its final temperature? (Enter a number in °C.)',
    c: [fx(Tf, 1) + ' °C'], ans: Number(Tf.toFixed(2)),
    why: `ΔT = q/(m·c) = 455 ÷ (15.0 × 2.394) = 455 ÷ ${fx(15 * 2.394, 2)} = ${fx(Tf - 22.0, 2)} °C. T(final) = 22.0 + ${fx(Tf - 22.0, 2)} = ${fx(Tf, 1)} °C.`,
    h: H('Same method as the radiator-coolant worksheet problem.', 'ΔT = q/(m·c).', `ΔT ≈ ${fx(Tf - 22.0, 1)} °C; add to 22.0 °C.`), opts: { abs: 0.06 } });
}
{ // Worksheet Q4 variation: q
  const q = 40.0 * 2.394 * 15.5;
  add({ L: 7, t: 2, tag: 'Worksheet', k: 'mcq',
    q: 'How much heat does 40.0 g of ethylene glycol (c = 2.394 J/(g·K)) absorb when it warms from 20.0 °C to 35.5 °C?',
    c: [sg(q / 1000, 3) + ' kJ', sg(40.0 * cw * 15.5 / 1000, 3) + ' kJ', sg(40.0 * 2.394 * 35.5 / 1000, 3) + ' kJ', sg(q, 3) + ' kJ', sg(40.0 * 15.5 / 2.394 / 1000, 3) + ' kJ'],
    why: `q = m·c·ΔT = (40.0)(2.394)(35.5 − 20.0) = (40.0)(2.394)(15.5) = ${fx(q, 0)} J = ${sg(q / 1000, 3)} kJ. ${sg(40.0 * cw * 15.5 / 1000, 3)} kJ uses water’s c; ${sg(40.0 * 2.394 * 35.5 / 1000, 3)} kJ uses the final temperature as ΔT; ${sg(q, 3)} kJ forgets to convert J to kJ.`,
    h: H('q = m·c·ΔT.', 'ΔT = 15.5 K.', '40.0 × 2.394 × 15.5 J, then to kJ.') });
}

{ // Slide example 6.47 J/(g K)
  const qw = 100 * cw * (28.42 - 25.10), c = qw / (3.00 * (100.0 - 28.42));
  add({ L: 7, t: 4, tag: 'Lecture', k: 'mcq',
    q: 'You heat 3.00 g of a solid to 100.0 °C and add it to 100. mL of water in a coffee-cup calorimeter. The water warms from 25.10 °C to 28.42 °C. What is the specific heat capacity of the solid? (Water: 1.00 g/mL, 4.184 J/(g·K).)',
    c: [fx(c, 2) + ' J/(g·K)', fx(-c, 2) + ' J/(g·K)', sg(qw / (3.00 * 3.32), 3) + ' J/(g·K)', fx(qw / (3.00 * (100.0 - 25.10)), 2) + ' J/(g·K)', fx(1 / c, 3) + ' J/(g·K)'],
    why: `Key idea: −q(sample) = q(surroundings). Water: q = m·c·ΔT = (100. g)(4.184)(28.42 − 25.10) = (100.)(4.184)(3.32) = ${fx(qw, 1)} J. So q(solid) = −${fx(qw, 1)} J. The solid’s ΔT = 28.42 − 100.0 = −71.58 K (it ends at the same final temperature as the water). c = −${fx(qw, 1)} ÷ [(3.00)(−71.58)] = ${fx(c, 2)} J/(g·K). ${sg(qw / (3.00 * 3.32), 3)} uses the WATER’s ΔT for the solid; ${fx(qw / (3.00 * (100.0 - 25.10)), 2)} uses the water’s initial temperature; a negative c means a sign was dropped.`,
    h: H('Heat lost by the solid = heat gained by the water.', 'q(water) = 100. × 4.184 × 3.32; the solid’s ΔT = 28.42 − 100.0.', `c = ${fx(qw, 1)} ÷ (3.00 × 71.58).`) });
}
{ // slide variation num
  const qw = 50.0 * cw * (24.15 - 22.00), c = qw / (5.00 * (98.0 - 24.15));
  add({ L: 7, t: 3, tag: 'Lecture', k: 'num',
    q: 'A 5.00 g sample of an unknown solid is heated to 98.0 °C and dropped into 50.0 mL of water at 22.00 °C in a coffee-cup calorimeter. The final temperature is 24.15 °C. What is the specific heat capacity of the solid? (Water: 1.00 g/mL, 4.184 J/(g·K). Enter a number in J/(g·K).)',
    c: [fx(c, 2) + ' J/(g·K)'], ans: Number(c.toFixed(3)),
    why: `q(water) = (50.0 g)(4.184)(24.15 − 22.00) = (50.0)(4.184)(2.15) = ${fx(qw, 1)} J. q(solid) = −${fx(qw, 1)} J. ΔT(solid) = 24.15 − 98.0 = −73.85 K. c = −${fx(qw, 1)} ÷ [(5.00)(−73.85)] = ${fx(c, 3)} ≈ ${fx(c, 2)} J/(g·K).`,
    h: H('−q(solid) = q(water).', 'q(water) = 50.0 × 4.184 × 2.15 J.', `c = ${fx(qw, 1)} ÷ (5.00 × 73.85).`), opts: { tol: 0.015 } });
}
{ // Fe into water final T
  const a = 25.0 * 0.450, b = 100.0 * cw, Tf = (a * 95.0 + b * 22.0) / (a + b);
  const swap = (25.0 * cw * 95.0 + 100.0 * 0.450 * 22.0) / (25.0 * cw + 100.0 * 0.450);
  const massOnly = (25.0 * 95.0 + 100.0 * 22.0) / 125.0;
  const wrongSign = (b * 22.0 - a * 95.0) / (b - a);
  add({ L: 7, t: 4, tag: 'Trap', k: 'mcq',
    q: 'A 25.0 g piece of iron (c = 0.450 J/(g·°C)) at 95.0 °C is dropped into 100.0 g of water (c = 4.184 J/(g·°C)) at 22.0 °C in an insulated cup. What is the final temperature?',
    c: [fx(Tf, 1) + ' °C', fx((95.0 + 22.0) / 2, 1) + ' °C', fx(swap, 1) + ' °C', fx(massOnly, 1) + ' °C', fx(wrongSign, 1) + ' °C'],
    why: `Heat lost by iron = heat gained by water: −m(Fe)c(Fe)(T − 95.0) = m(w)c(w)(T − 22.0). −(${fx(a, 2)})(T − 95.0) = (${fx(b, 1)})(T − 22.0). Expand: −${fx(a, 2)}T + ${fx(a * 95, 2)} = ${fx(b, 1)}T − ${fx(b * 22, 1)}. So T = (${fx(a * 95, 2)} + ${fx(b * 22, 1)}) ÷ (${fx(a, 2)} + ${fx(b, 1)}) = ${fx(Tf, 1)} °C. Water’s huge heat capacity keeps T close to 22.0 °C. ${fx(wrongSign, 1)} °C (below BOTH starting temperatures, impossible) is what you get by dropping the minus sign; 58.5 °C is a plain average; ${fx(swap, 1)} °C swaps the specific heats; ${fx(massOnly, 1)} °C ignores the specific heats.`,
    h: H('Both objects end at the same temperature T.', '−m(Fe)·c(Fe)·(T − 95.0) = m(w)·c(w)·(T − 22.0).', 'Collect the T terms: T = Σ(m·c·T(initial)) ÷ Σ(m·c).') });
}
{ // Worksheet Q3 exactly
  const qw = 75.0 * cw * (49.30 - 50.00), dTi = -qw / (33.2 * 0.228), Ti = 49.30 - dTi;
  const useWaterC = 49.30 - (-qw) / (33.2 * cw);
  const noCw = 49.30 - (75.0 * 0.70) / (33.2 * 0.228);
  add({ L: 7, t: 4, tag: 'Worksheet', k: 'mcq',
    q: 'A 33.2 g piece of titanium is added to 75.0 g of water at 50.00 °C. The water temperature drops to 49.30 °C. The specific heat capacity of Ti is 0.228 J/(g·K) and of water 4.184 J/(g·K). What was the initial temperature of the titanium?',
    c: [fx(Ti, 1) + ' °C', fx(49.30 + dTi, 1) + ' °C', fx(dTi, 1) + ' °C', fx(useWaterC, 1) + ' °C', fx(noCw, 1) + ' °C'],
    why: `Water: q = (75.0)(4.184)(49.30 − 50.00) = (75.0)(4.184)(−0.70) = ${fx(qw, 1)} J (the water lost heat). So the Ti gained +${fx(-qw, 1)} J. Ti: ΔT = q/(m·c) = ${fx(-qw, 1)} ÷ (33.2 × 0.228) = ${fx(-qw, 1)} ÷ ${fx(33.2 * 0.228, 3)} = +${fx(dTi, 2)} K. The Ti ends at 49.30 °C, so it started at 49.30 − ${fx(dTi, 2)} = ${fx(Ti, 1)} °C (it was colder - the water cooled). ${fx(49.30 + dTi, 1)} °C adds ΔT the wrong way; ${fx(dTi, 1)} °C is ΔT itself; ${fx(useWaterC, 1)} °C uses water’s c for Ti; ${fx(noCw, 1)} °C forgets the 4.184 for the water.`,
    h: H('The water cooled, so the titanium must have been colder and warmed up.', 'q(Ti) = −q(water) = +219.7 J; ΔT(Ti) = q/(m·c).', 'Final temperature of Ti is 49.30 °C; subtract its ΔT.') });
}
{ // Worksheet Q3 variation num: final T
  const a = 25.0 * 0.228, b = 60.0 * cw, Tf = (a * 90.0 + b * 21.50) / (a + b);
  add({ L: 7, t: 3, tag: 'Worksheet', k: 'num',
    q: 'A 25.0 g piece of titanium (c = 0.228 J/(g·K)) at 90.0 °C is placed in 60.0 g of water (c = 4.184 J/(g·K)) at 21.50 °C in an insulated cup. What is the final temperature? (Enter a number in °C, to two decimal places.)',
    c: [fx(Tf, 2) + ' °C'], ans: Number(Tf.toFixed(2)),
    why: `−(25.0)(0.228)(T − 90.0) = (60.0)(4.184)(T − 21.50). −${fx(a, 2)}(T − 90.0) = ${fx(b, 2)}(T − 21.50). T = (${fx(a, 2)} × 90.0 + ${fx(b, 2)} × 21.50) ÷ (${fx(a, 2)} + ${fx(b, 2)}) = (${fx(a * 90, 1)} + ${fx(b * 21.5, 1)}) ÷ ${fx(a + b, 2)} = ${fx(Tf, 2)} °C. Titanium’s small heat capacity barely warms the water.`,
    h: H('Heat lost by Ti = heat gained by water; both end at T.', 'Weight each starting temperature by m·c.', `T = (5.70 × 90.0 + 251.04 × 21.50) ÷ 256.74.`), opts: { abs: 0.06 } });
}
{ // metal ID: Ag
  const Tf = 21.65, c = 40.0 * cw * (Tf - 20.0) / (15.0 * (100.0 - Tf));
  near(c, 0.235, 0.001);
  add({ L: 7, t: 4, tag: 'Exam', k: 'mcq',
    q: 'A 15.0 g metal sample at 100.0 °C is dropped into 40.0 g of water at 20.00 °C in a coffee-cup calorimeter. The final temperature is 21.65 °C. Which metal is it? Specific heats in J/(g·°C): Al 0.900, Fe 0.450, Cu 0.385, Ag 0.235, Au 0.129.',
    c: ['Ag', 'Al', 'Fe', 'Cu', 'Au'],
    why: `q(water) = (40.0)(4.184)(21.65 − 20.00) = (40.0)(4.184)(1.65) = ${fx(40 * cw * 1.65, 1)} J. q(metal) = −${fx(40 * cw * 1.65, 1)} J, with ΔT(metal) = 21.65 − 100.0 = −78.35 °C. c = −${fx(40 * cw * 1.65, 1)} ÷ [(15.0)(−78.35)] = ${fx(c, 3)} J/(g·°C) → silver. Using the water’s ΔT (1.65) for the metal would give a huge, impossible c.`,
    h: H('Find the heat the water gained.', 'The metal lost the same heat; its ΔT is 21.65 − 100.0.', 'c = 276.1 J ÷ (15.0 g × 78.35 °C); match it to the table.') });
}
{ // Worksheet Q5 exactly
  const m = 24.4 * (35.0 - 23.5) / (23.5 - 18.2);
  add({ L: 7, t: 3, tag: 'Worksheet', k: 'mcq',
    q: 'An unknown volume of water at 18.2 °C is added to 24.4 mL of water at 35.0 °C. The final temperature is 23.5 °C. What was the unknown volume? (Water: d = 1.00 g/mL; no heat is lost.)',
    c: [fx(m, 1) + ' mL', fx(24.4 * 5.3 / 11.5, 1) + ' mL', fx(m + 24.4, 1) + ' mL', fx(24.4 * 35.0 / 18.2, 1) + ' mL', '24.4 mL'],
    why: `Heat lost by the warm water = heat gained by the cool water. The c (4.184) cancels from both sides: m(cool)(23.5 − 18.2) = (24.4 g)(35.0 − 23.5). m(cool)(5.3) = (24.4)(11.5) = ${fx(24.4 * 11.5, 1)}. m = ${fx(24.4 * 11.5, 1)} ÷ 5.3 = ${fx(m, 1)} g = ${fx(m, 1)} mL. Sense check: the final 23.5 °C is closer to 18.2 °C, so there must be MORE cool water than warm. ${fx(24.4 * 5.3 / 11.5, 1)} mL pairs each ΔT with the wrong mass; ${fx(m + 24.4, 1)} mL is the total volume.`,
    h: H('−q(warm) = q(cool), and c cancels.', 'Each ΔT goes with its own mass: warm 35.0 → 23.5, cool 18.2 → 23.5.', 'm × 5.3 = 24.4 × 11.5.') });
}
{ // Worksheet Q5 variation num: mixing
  const Tf = (150.0 * 80.0 + 50.0 * 20.0) / 200.0;
  add({ L: 7, t: 2, tag: 'Worksheet', k: 'num',
    q: '150.0 g of water at 80.0 °C is mixed with 50.0 g of water at 20.0 °C in an insulated container. What is the final temperature? (Enter a number in °C.)',
    c: [fx(Tf, 1) + ' °C'], ans: Tf,
    why: `−(150.0)(c)(T − 80.0) = (50.0)(c)(T − 20.0); c cancels. 150.0(80.0 − T) = 50.0(T − 20.0) → 12 000 − 150.0T = 50.0T − 1000 → 200.0T = 13 000 → T = ${fx(Tf, 1)} °C. For the same substance this is just the mass-weighted average, closer to the larger, hotter sample.`,
    h: H('Heat lost by the hot water = heat gained by the cold water.', 'The specific heat cancels; weight by mass.', 'T = (150.0 × 80.0 + 50.0 × 20.0) ÷ 200.0.'), opts: { abs: 0.06 } });
}
{ // Worksheet Q5 variation: mass to add
  const m = 200.0 * (60.0 - 40.0) / (40.0 - 10.0);
  add({ L: 7, t: 3, tag: 'Worksheet', k: 'mcq',
    q: 'How many grams of water at 10.0 °C must be added to 200.0 g of water at 60.0 °C to give a final temperature of 40.0 °C? (No heat is lost.)',
    c: [fx(m, 0) + ' g', '300. g', '200. g', fx(m + 200, 0) + ' g', fx(200 - m, 1) + ' g'],
    why: `Warm water loses 200.0 × c × (60.0 − 40.0) = 200.0c × 20.0. Cold water gains m × c × (40.0 − 10.0) = m·c × 30.0. Setting them equal: m = (200.0 × 20.0) ÷ 30.0 = ${fx(m, 1)} g ≈ ${fx(m, 0)} g. 300. g pairs the ΔTs with the wrong masses. Check: 40.0 °C is closer to 60.0 °C, so less cold water than warm water is needed.`,
    h: H('Set heat lost = heat gained; c cancels.', 'Warm ΔT = 20.0 °C; cold ΔT = 30.0 °C.', 'm × 30.0 = 200.0 × 20.0.') });
}

add({ L: 7, t: 1, tag: 'Concept', k: 'mcq',
  q: 'A bomb calorimeter burns a sample inside a sealed steel vessel of fixed volume. What does it measure directly?',
  c: ['ΔE, because at constant volume no PV work is done and q(v) = ΔE', 'ΔH, because the heat is measured at constant pressure',
      'w, because the gas pressure inside rises', 'ΔH, because the water bath is open to the air', 'q at constant pressure, the same as a coffee cup'],
  why: 'In a rigid bomb ΔV = 0, so w = −PΔV = 0 and ΔE = q + w = q(v): the bomb measures the change in INTERNAL energy. A coffee-cup calorimeter is open to the atmosphere (constant P), so it measures q(p) = ΔH. For most reactions the two differ only slightly.',
  h: H('What does “fixed volume” do to w = −PΔV?', 'If w = 0, ΔE = q + w becomes...', 'q at constant volume is ΔE.') });
{ // bomb per gram
  const q = 10.15 * 2.36, perg = -q / 0.5000;
  add({ L: 7, t: 3, tag: 'Calculation', k: 'mcq',
    q: 'A 0.5000 g sample of a fuel is burned in a bomb calorimeter whose total heat capacity (calorimeter constant) is 10.15 kJ/°C. The temperature rises by 2.36 °C. What is the energy of combustion, ΔE, per gram of fuel?',
    c: [fx(perg, 1) + ' kJ/g', px(-perg, 1) + ' kJ/g', fx(-q, 1) + ' kJ/g', sci(perg / 1000, 3) + ' kJ/g', fx(-10.15 / 2.36 / 0.5000, 2) + ' kJ/g'],
    why: `q(calorimeter) = C(cal) × ΔT = (10.15 kJ/°C)(2.36 °C) = ${fx(q, 2)} kJ. q(rxn) = −${fx(q, 2)} kJ for 0.5000 g. Per gram: −${fx(q, 2)} ÷ 0.5000 = ${fx(perg, 1)} kJ/g. With a calorimeter constant there is no m·c - the constant already covers the whole calorimeter. ${fx(-q, 1)} kJ/g forgets to divide by the mass; ${fx(-10.15 / 2.36 / 0.5000, 2)} kJ/g divides by ΔT instead of multiplying.`,
    h: H('q(cal) = C(cal) × ΔT.', 'q(rxn) = −q(cal).', `−${fx(q, 2)} kJ ÷ 0.5000 g.`) });
}
{ // num calorimeter constant
  const C = 26.38 / 4.673;
  add({ L: 7, t: 3, tag: 'Calculation', k: 'num',
    q: 'To calibrate a bomb calorimeter, 1.000 g of benzoic acid (ΔE(comb) = −26.38 kJ/g) is burned and the temperature rises by 4.673 °C. What is the calorimeter constant? (Enter a number in kJ/°C.)',
    c: [fx(C, 3) + ' kJ/°C'], ans: Number(C.toFixed(3)),
    why: `Heat released by the benzoic acid = (1.000 g)(26.38 kJ/g) = 26.38 kJ; the calorimeter absorbs it: q(cal) = +26.38 kJ. C(cal) = q(cal)/ΔT = 26.38 kJ ÷ 4.673 °C = ${fx(C, 3)} kJ/°C. Every later run in this calorimeter uses q = C(cal) × ΔT.`,
    h: H('The calorimeter absorbs exactly what the benzoic acid releases.', 'C(cal) = q ÷ ΔT.', '26.38 ÷ 4.673.'), opts: { tol: 0.005 } });
}
{ // t4 bomb with hardware + water, octane per mol
  const Ctot = 875 + 1250 * cw, q = Ctot * 8.15 / 1000, perMol = -q / 1.00 * M_C8H18;
  const noWater = -875 * 8.15 / 1000 * M_C8H18, noHw = -1250 * cw * 8.15 / 1000 * M_C8H18;
  add({ L: 7, t: 4, tag: 'Exam', k: 'mcq',
    q: 'A 1.00 g sample of octane, C₈H₁₈ (114.22 g/mol), is burned in a bomb calorimeter that holds 1.250 kg of water. The steel bomb and fittings have a heat capacity of 875 J/°C. The temperature rises by 8.15 °C. What is ΔE of combustion per mole of octane? (c(water) = 4.184 J/(g·°C))',
    c: [sci(perMol, 3) + ' kJ/mol', sci(noHw, 3) + ' kJ/mol', sci(noWater, 3) + ' kJ/mol', sciP(-perMol, 3) + ' kJ/mol', fx(-q, 1) + ' kJ/mol'],
    why: `Heat absorbed by the water: (1250 g)(4.184)(8.15) = ${fx(1250 * cw * 8.15, 0)} J. By the hardware: (875 J/°C)(8.15) = ${fx(875 * 8.15, 0)} J. Total = ${fx(Ctot * 8.15, 0)} J = ${fx(q, 2)} kJ, so q(rxn) = −${fx(q, 2)} kJ for 1.00 g. That is −${fx(q, 2)} kJ per gram; per mole multiply by the molar mass (equivalently, divide by 1.00 g ÷ 114.22 g/mol = ${fx(1 / M_C8H18, 6)} mol): ΔE = −${fx(q, 2)} kJ/g × 114.22 g/mol = ${sci(perMol, 3)} kJ/mol. Leaving out the bomb gives ${sci(noHw, 3)}; leaving out the water gives ${sci(noWater, 3)}; −${fx(q, 1)} is the value per GRAM, not per mole.`,
    h: H('Both the water and the steel absorb heat.', 'q = (m·c(water) + C(bomb)) × ΔT.', 'Then convert per gram to per mole (× 114.22 g/mol).') });
}

{ // Mg slide example (Thermochem 1)
  const mass = 74.3 / 1204 * 2 * 24.3;
  add({ L: 7, t: 3, tag: 'Lecture', k: 'mcq',
    q: 'A student burns a strip of magnesium ribbon in excess oxygen and measures 74.3 kJ of heat released. What was the mass of the magnesium? 2Mg(s) + O₂(g) → 2MgO(s), ΔH = −1204 kJ (Mg = 24.3 g/mol)',
    c: [fx(mass, 2) + ' g', fx(-mass, 2) + ' g', fx(mass / 2, 2) + ' g', fx(74.3 / 1204 * 2, 3) + ' g', sci(74300 / 1204 * 2 * 24.3, 3) + ' g'],
    why: `74.3 kJ × (1 mol rxn / 1204 kJ) × (2 mol Mg / 1 mol rxn) × (24.3 g / 1 mol Mg) = ${fx(mass, 2)} g Mg. “Heat released” already means a negative ΔH, so you use the magnitudes - carrying −74.3 kJ against −1204 kJ is fine, but mixing +74.3 with −1204 gives the meaningless −${fx(mass, 2)} g. ${fx(mass / 2, 2)} g forgets the 2 mol Mg per mole of reaction; ${fx(74.3 / 1204 * 2, 3)} is moles of Mg, not grams; ${sci(74300 / 1204 * 2 * 24.3, 3)} g converts 74.3 kJ to J but not the 1204 kJ.`,
    h: H('Use ΔH like a mole ratio: 1204 kJ per 2 mol Mg.', 'kJ → mol Mg → g Mg.', '74.3 ÷ 1204 × 2 × 24.3.') });
}
{ // Mg num heat from 5.00 g
  const q = 5.00 / AM.Mg * 1204 / 2;
  add({ L: 7, t: 2, tag: 'Lecture', k: 'num',
    q: 'Using 2Mg(s) + O₂(g) → 2MgO(s), ΔH = −1204 kJ, how much heat is released when 5.00 g of Mg burns in excess oxygen? (Mg = 24.31 g/mol. Enter the amount of heat released as a positive number in kJ.)',
    c: [sg(q, 3) + ' kJ'], ans: Number(q.toFixed(1)),
    why: `mol Mg = 5.00 ÷ 24.31 = ${fx(5 / AM.Mg, 4)} mol. The equation releases 1204 kJ per 2 mol Mg: ${fx(5 / AM.Mg, 4)} × (1204 kJ / 2 mol Mg) = ${fx(q, 1)} kJ ≈ ${sg(q, 3)} kJ released (ΔH for this amount = −${sg(q, 3)} kJ). Forgetting the 2 doubles the answer.`,
    h: H('Grams → moles of Mg first.', 'The ΔH is for 2 mol of Mg.', `${fx(5 / AM.Mg, 4)} mol × 602 kJ/mol.`), opts: { tol: 0.01 } });
}

{ // t4 vaporization ΔE vs ΔH
  const w = -1.00 * 30.6 * LATM / 1000, dE = 40.7 + w;
  add({ L: 7, t: 4, tag: 'Exam', k: 'mcq',
    q: 'When 1.00 mol of liquid water vaporizes at 100 °C and a constant 1.00 atm, ΔH = +40.7 kJ and the volume of the system increases by 30.6 L as the steam pushes back the atmosphere. What is ΔE for the vaporization? (1 L·atm = 101.3 J)',
    c: [px(dE, 1) + ' kJ', px(40.7 - w, 1) + ' kJ', '+40.7 kJ', '+10.1 kJ', fx(-dE, 1) + ' kJ'],
    why: `At constant pressure q = ΔH = +40.7 kJ. Work: w = −PΔV = −(1.00 atm)(30.6 L) = −30.6 L·atm × 101.3 J = ${fx(w * 1000, 0)} J = ${fx(w, 2)} kJ (the steam does work on the atmosphere). ΔE = q + w = 40.7 + (${fx(w, 2)}) = ${px(dE, 1)} kJ. ΔE is smaller than ΔH because part of the heat absorbed leaves again as expansion work. ${px(40.7 - w, 1)} kJ gives w the wrong sign; +10.1 kJ subtracts 30.6 as if L·atm were kJ; +40.7 kJ assumes ΔE = ΔH.`,
    h: H('At constant pressure, q equals which quantity?', 'w = −PΔV, converted from L·atm to kJ.', `ΔE = 40.7 kJ + (${fx(w, 2)} kJ).`) });
}
{ // t4 Cu into water in a calorimeter with its own heat capacity
  const a = 50.0 * 0.385, b = 100.0 * cw + 15.0, Tf = (a * 100.0 + b * 20.0) / (a + b);
  const noCal = (a * 100.0 + 100.0 * cw * 20.0) / (a + 100.0 * cw);
  const massOnly = (50.0 * 100.0 + 100.0 * 20.0) / 150.0;
  add({ L: 7, t: 4, tag: 'Exam', k: 'mcq',
    q: 'A 50.0 g copper block (c = 0.385 J/(g·°C)) at 100.0 °C is dropped into 100.0 g of water (c = 4.184 J/(g·°C)) at 20.00 °C in a calorimeter whose own heat capacity is 15.0 J/°C (calorimeter also at 20.00 °C). What is the final temperature?',
    c: [fx(Tf, 2) + ' °C', fx(noCal, 2) + ' °C', fx(massOnly, 2) + ' °C', '60.00 °C', fx((b * 20.0 - a * 100.0) / (b - a), 2) + ' °C'],
    why: `Heat lost by Cu = heat gained by water + calorimeter: −(${fx(a, 2)})(T − 100.0) = (${fx(100 * cw, 1)} + 15.0)(T − 20.00). T = (${fx(a, 2)} × 100.0 + ${fx(b, 1)} × 20.00) ÷ (${fx(a, 2)} + ${fx(b, 1)}) = (${fx(a * 100, 0)} + ${fx(b * 20, 0)}) ÷ ${fx(a + b, 2)} = ${fx(Tf, 2)} °C. Leaving out the calorimeter’s 15.0 J/°C gives ${fx(noCal, 2)} °C; weighting by mass only gives ${fx(massOnly, 2)} °C; 60.00 °C is a plain average; ${fx((b * 20.0 - a * 100.0) / (b - a), 2)} °C (below 20 °C, impossible) drops the minus sign.`,
    h: H('Three things change temperature: copper, water and the calorimeter.', 'The calorimeter absorbs 15.0 J per °C of warming, like extra water.', 'T = (19.25 × 100.0 + 433.4 × 20.00) ÷ 452.65.') });
}
add({ L: 9, t: 3, tag: 'Trap', k: 'mcq',
  q: 'Which reaction has a ΔH°rxn that is EQUAL to the standard enthalpy of formation of its product?',
  c: ['C(graphite) + O₂(g) → CO₂(g)', '2H₂(g) + O₂(g) → 2H₂O(l)', 'CO(g) + ½O₂(g) → CO₂(g)', 'C(diamond) + O₂(g) → CO₂(g)', 'N₂(g) + 3H₂(g) → 2NH₃(g)'],
  why: 'ΔH°rxn = ΔH°f(product) only for a true formation equation: exactly 1 mol of product from elements in their standard states. C(graphite) + O₂(g) → CO₂(g) qualifies. 2H₂O and 2NH₃ are 2 mol of product (ΔH = 2ΔH°f); CO is a compound, not an element; diamond is not carbon’s standard state.',
  h: H('Check three things: one mole, elements only, standard states.', 'What is carbon’s standard state?', 'Only one equation passes all three checks.') });

/* ======================================================================
   LESSON 8 - Thermochemistry 2 (6.3-6.4): coffee-cup calorimetry,
   thermochemical equations, heat from amounts, phase-change enthalpies
   ====================================================================== */

add({ L: 8, t: 1, tag: 'Concept', k: 'mcq',
  q: 'Why does a coffee-cup calorimeter measure ΔH rather than ΔE?',
  c: ['It is open to the atmosphere, so the reaction runs at constant pressure and q(p) = ΔH', 'It is sealed, so the reaction runs at constant volume',
      'Styrofoam absorbs the PV work', 'The water makes the work equal to the heat', 'Its stirrer does work that cancels the PV work'],
  why: 'The loose stopper leaves the cup at atmospheric pressure, so the heat it measures is the heat at constant pressure, which is ΔH by definition. The sealed, rigid bomb calorimeter is the one at constant volume, where q(v) = ΔE.',
  h: H('Which variable does the coffee cup hold constant?', 'ΔH = q at constant ___.', 'The cup is open to the air.') });
add({ L: 8, t: 2, tag: 'Concept', k: 'mcq',
  q: 'When a reaction runs in a coffee-cup calorimeter, the temperature of the solution RISES. Which set of signs is correct?',
  c: ['q(soln) > 0, q(rxn) < 0, exothermic', 'q(soln) < 0, q(rxn) > 0, endothermic', 'q(soln) > 0, q(rxn) > 0, endothermic',
      'q(soln) < 0, q(rxn) < 0, exothermic', 'q(soln) > 0, q(rxn) > 0, exothermic'],
  why: 'The solution (surroundings) warmed, so it gained heat: q(soln) = m·c·ΔT > 0. The lecture rule q(soln) + q(rxn) = 0 means q(rxn) = −q(soln) < 0: the reaction released the heat, so it is exothermic (ΔH < 0). The two q’s can never have the same sign in an insulated calorimeter.',
  h: H('Did the solution gain or lose heat?', 'q(soln) + q(rxn) = 0.', 'A warming solution means the reaction gave away heat.') });
{ // Slide 4 calorimetry example, parts a,b,c
  const m = 75.0, dT = 27.21 - 25.00, qs = m * cw * dT;
  add({ L: 8, t: 2, tag: 'Lecture', k: 'mcq',
    q: 'You mix 50.0 mL of 0.500 M NaOH and 25.0 mL of 0.500 M HCl, both at 25.00 °C, in a coffee-cup calorimeter. The final temperature is 27.21 °C. Assume the volumes add, d = 1.00 g/mL and c = 4.184 J/(g·K). What is q(soln)?',
    c: [px(qs, 0) + ' J', fx(-qs, 0) + ' J', px(50.0 * cw * dT, 0) + ' J', px(25.0 * cw * dT, 0) + ' J', sciP(m * cw * 27.21, 3) + ' J'],
    why: `Mass of solution = (50.0 + 25.0 mL)(1.00 g/mL) = 75.0 g. ΔT = 27.21 − 25.00 = 2.21 K. q(soln) = m·c·ΔT = (75.0)(4.184)(2.21) = ${fx(qs, 1)} J ≈ ${px(qs, 0)} J. Positive: the solution absorbed heat. Use the TOTAL mass (${px(50.0 * cw * dT, 0)} J and ${px(25.0 * cw * dT, 0)} J use only one solution), and use ΔT, not the final temperature.`,
    h: H('The whole 75.0 g of solution warms up.', 'ΔT = 27.21 − 25.00.', 'q = 75.0 × 4.184 × 2.21.') });
  add({ L: 8, t: 2, tag: 'Lecture', k: 'mcq',
    q: 'In the lecture example (50.0 mL of 0.500 M NaOH + 25.0 mL of 0.500 M HCl, 25.00 °C → 27.21 °C, 75.0 g of solution, c = 4.184 J/(g·K)), what is q(rxn)?',
    c: [fx(-qs, 0) + ' J', px(qs, 0) + ' J', '0 J, because the calorimeter is insulated', fx(-50.0 * cw * dT, 0) + ' J', sci(-m * cw * 27.21, 3) + ' J'],
    why: `q(soln) = (75.0)(4.184)(2.21) = +${fx(qs, 0)} J. The lecture’s rule: q(soln) + q(rxn) = 0, so q(rxn) = −q(soln) = ${fx(-qs, 0)} J. The insulation does not make q(rxn) zero - it makes sure all of the reaction’s heat goes into the solution, which is exactly why we can measure it.`,
    h: H('Find q(soln) first.', 'q(soln) + q(rxn) = 0.', 'Same size, opposite sign.') });
  const n = 0.0250 * 0.500, dH = -qs / 1000 / n;
  add({ L: 8, t: 4, tag: 'Trap', k: 'mcq',
    q: 'Same lecture example: 50.0 mL of 0.500 M NaOH + 25.0 mL of 0.500 M HCl, with q(rxn) = −(75.0 g)(4.184 J/(g·K))(2.21 K) = −693.5 J. What is ΔH of the neutralization in kJ per mole of H₂O formed?',
    c: [fx(dH, 1) + ' kJ/mol', fx(-qs / 1000 / 0.0250, 1) + ' kJ/mol', px(-dH, 1) + ' kJ/mol', fx(-qs / 1000 / 0.0375, 1) + ' kJ/mol', sci(-qs / n, 3) + ' kJ/mol'],
    why: `mol NaOH = 0.0500 L × 0.500 M = 0.0250 mol; mol HCl = 0.0250 L × 0.500 M = 0.0125 mol. NaOH + HCl → NaCl + H₂O is 1:1, so HCl is LIMITING and only 0.0125 mol H₂O forms. ΔH = q(rxn)/mol = −${fx(qs / 1000, 4)} kJ ÷ 0.0125 mol = ${fx(dH, 1)} kJ/mol. Dividing by the NaOH (excess) gives ${fx(-qs / 1000 / 0.0250, 1)}; by all 0.0375 mol of reactants gives ${fx(-qs / 1000 / 0.0375, 1)}; ${sci(-qs / n, 3)} forgets J → kJ.`,
    h: H('Which reactant runs out?', 'Only as much water forms as the limiting reactant allows.', 'ΔH = −0.6935 kJ ÷ 0.0125 mol.') });
}
{ // Worksheet Q2 exactly
  const dT = 29.7 - 23.0, qs = 100.0 * cw * dT, n = 0.0500 * 1.0, dH = -qs / 1000 / n;
  add({ L: 8, t: 4, tag: 'Worksheet', k: 'mcq',
    q: '50.0 g of 1.0 M NaOH at 23.0 °C is mixed with 50.0 g of 1.0 M HCl at 23.0 °C in a coffee-cup calorimeter (calorimeter constant 0). The temperature rises to 29.7 °C. Take c = 4.184 J/(g·K) and d = 1.00 g/mL for the solutions. What is ΔH for the reaction per mole of HCl?',
    c: [sg(dH, 2) + ' kJ/mol', sgP(-dH, 2) + ' kJ/mol', sg(dH / 2, 2) + ' kJ/mol', sci(-qs / n, 2) + ' kJ/mol', sci(-100.0 * cw * 29.7 / 1000 / n, 2) + ' kJ/mol'],
    why: `ΔT = 29.7 − 23.0 = 6.7 °C. q(soln) = (100.0 g)(4.184)(6.7) = ${fx(qs, 0)} J ≈ ${sci(qs, 2)} J. q(rxn) = −q(soln) = ${sci(-qs, 2)} J. mol HCl = (50.0 mL = 0.0500 L)(1.0 M) = 0.050 mol (NaOH is also 0.050 mol, so either works). ΔH = −${fx(qs / 1000, 2)} kJ ÷ 0.050 mol = ${fx(dH, 1)} ≈ ${sg(dH, 2)} kJ/mol (2 sig figs from ΔT = 6.7): exothermic. ${sg(dH / 2, 2)} uses only 50.0 g of solution (or divides by 0.100 mol); ${sci(-qs / n, 2)} forgets J → kJ; ${sci(-100.0 * cw * 29.7 / 1000 / n, 2)} uses 29.7 °C instead of ΔT.`,
    h: H('Total mass of solution is 100.0 g.', 'q(rxn) = −m·c·ΔT; mol HCl = 0.0500 L × 1.0 M.', `ΔH = −${fx(qs / 1000, 2)} kJ ÷ 0.050 mol.`) });
  add({ L: 8, t: 2, tag: 'Worksheet', k: 'mcq',
    q: 'For the worksheet neutralization (100.0 g of solution warms from 23.0 °C to 29.7 °C, c = 4.184 J/(g·K)), what is q(rxn)?',
    c: [sci(-qs, 2) + ' J', sciP(qs, 2) + ' J', sci(-qs / 2, 2) + ' J', sciP(qs / 2, 2) + ' J', sci(-100.0 * cw * 29.7, 2) + ' J'],
    why: `q(soln) = (100.0)(4.184)(29.7 − 23.0) = (100.0)(4.184)(6.7) = +${fx(qs, 0)} J. The solution absorbed it, so the reaction released it: q(rxn) = −q(soln) = ${sci(-qs, 2)} J. This sign flip is the step most often missed: a warming solution means a NEGATIVE q(rxn). ${sci(-qs / 2, 2)} J uses 50.0 g instead of the full 100.0 g.`,
    h: H('First find q(soln) with the full 100.0 g.', 'q(rxn) = −q(soln).', 'The solution warmed, so q(rxn) is negative.') });
}
{ // Worksheet Q2 variation, unequal amounts (NaOH limiting)
  const nH = 0.0600 * 1.20, nO = 0.0400 * 1.50, dT = 28.86 - 21.00, qs = 100.0 * cw * dT, dH = -qs / 1000 / nO;
  add({ L: 8, t: 4, tag: 'Exam', k: 'mcq',
    q: '60.0 mL of 1.20 M HCl and 40.0 mL of 1.50 M NaOH, both at 21.00 °C, are mixed in a coffee-cup calorimeter. The temperature rises to 28.86 °C. Assume 100.0 g of solution with c = 4.184 J/(g·°C). What is ΔH per mole of water formed?',
    c: [fx(dH, 1) + ' kJ/mol', fx(-qs / 1000 / nH, 1) + ' kJ/mol', px(-dH, 1) + ' kJ/mol', fx(-qs / 1000 / (nH + nO), 1) + ' kJ/mol', fx(-qs / 1000, 2) + ' kJ/mol'],
    why: `mol HCl = 0.0600 × 1.20 = ${fx(nH, 4)} mol; mol NaOH = 0.0400 × 1.50 = ${fx(nO, 4)} mol. 1:1 reaction, so NaOH is LIMITING and ${fx(nO, 4)} mol H₂O forms. q(soln) = (100.0)(4.184)(7.86) = ${fx(qs, 0)} J; q(rxn) = −${fx(qs / 1000, 3)} kJ. ΔH = −${fx(qs / 1000, 3)} ÷ ${fx(nO, 4)} = ${fx(dH, 1)} kJ/mol. Dividing by the HCl (in excess) gives ${fx(-qs / 1000 / nH, 1)}; by total moles ${fx(-qs / 1000 / (nH + nO), 1)}; ${fx(-qs / 1000, 2)} never divides by moles at all.`,
    h: H('Find the moles of each reactant.', 'The limiting reactant sets the moles of water formed.', `ΔH = q(rxn) ÷ ${fx(nO, 4)} mol.`) });
}
{ // num AgCl precipitation
  const qs = 100.0 * cw * (25.11 - 22.30), n = 0.0500 * 0.400, dH = -qs / 1000 / n;
  add({ L: 8, t: 3, tag: 'Calculation', k: 'num',
    q: '50.0 mL of 0.400 M AgNO₃ and 50.0 mL of 0.400 M HCl, both at 22.30 °C, are mixed in a coffee-cup calorimeter: Ag⁺(aq) + Cl⁻(aq) → AgCl(s). The temperature rises to 25.11 °C. Assume 100.0 g of solution with c = 4.184 J/(g·°C). What is ΔH per mole of AgCl formed? Include the sign. (Enter a number in kJ/mol.)',
    c: [fx(dH, 1) + ' kJ/mol'], ans: Number(dH.toFixed(2)),
    why: `q(soln) = (100.0)(4.184)(25.11 − 22.30) = (100.0)(4.184)(2.81) = ${fx(qs, 1)} J. q(rxn) = −${fx(qs, 1)} J = −${fx(qs / 1000, 4)} kJ. mol AgCl = mol Ag⁺ = mol Cl⁻ = 0.0500 L × 0.400 M = 0.0200 mol. ΔH = −${fx(qs / 1000, 4)} ÷ 0.0200 = ${fx(dH, 1)} kJ/mol (negative: the solution warmed).`,
    h: H('Total mass 100.0 g, ΔT = 2.81 °C.', 'q(rxn) = −q(soln); mol AgCl = 0.0500 × 0.400.', `ΔH = −${fx(qs / 1000, 3)} kJ ÷ 0.0200 mol.`), opts: { tol: 0.01 } });
}
{ // t4 NH4NO3 dissolution
  const n = 10.0 / M_NH4NO3, dT = 22.50 - 15.53, qs = -110.0 * cw * dT, dH = -qs / 1000 / n;
  const water = 100.0 * cw * dT / 1000 / n;
  add({ L: 8, t: 4, tag: 'Exam', k: 'mcq',
    q: '10.0 g of NH₄NO₃ (80.05 g/mol) is dissolved in 100.0 g of water in a coffee-cup calorimeter. The temperature falls from 22.50 °C to 15.53 °C. Taking the solution’s specific heat as 4.184 J/(g·°C), what is ΔH of solution per mole of NH₄NO₃?',
    c: [px(dH, 1) + ' kJ/mol', fx(-dH, 1) + ' kJ/mol', px(water, 1) + ' kJ/mol', px(-qs / 1000, 2) + ' kJ/mol', px(-qs / 1000 / 10.0, 3) + ' kJ/mol'],
    why: `Mass of solution = 100.0 + 10.0 = 110.0 g. q(soln) = (110.0)(4.184)(15.53 − 22.50) = (110.0)(4.184)(−6.97) = ${fx(qs, 0)} J. q(rxn) = +${fx(-qs, 0)} J (the dissolving absorbed heat - endothermic, a cold pack). mol NH₄NO₃ = 10.0 ÷ 80.05 = ${fx(n, 4)} mol. ΔH = +${fx(-qs / 1000, 3)} kJ ÷ ${fx(n, 4)} mol = ${px(dH, 1)} kJ/mol. A negative answer misses the sign flip; ${px(water, 1)} uses only the 100.0 g of water; ${px(-qs / 1000, 2)} never divides by moles; ${px(-qs / 1000 / 10.0, 3)} divides by grams.`,
    h: H('The solution cooled - which way did heat flow?', 'Use the whole solution mass, 110.0 g, then q(rxn) = −q(soln).', 'Divide q(rxn) in kJ by 10.0/80.05 mol.') });
}
{ // t4 predict ΔT of neutralization
  const nH = 0.1000 * 0.500, nO = 0.0500 * 0.800, q = nO * 55.8 * 1000, dT = q / (150.0 * cw);
  add({ L: 8, t: 4, tag: 'Exam', k: 'mcq',
    q: 'H⁺(aq) + OH⁻(aq) → H₂O(l) has ΔH = −55.8 kJ/mol. If 100.0 mL of 0.500 M HCl and 50.0 mL of 0.800 M NaOH, both at the same starting temperature, are mixed in a coffee-cup calorimeter, by how much does the temperature rise? (Assume 150.0 g of solution, c = 4.184 J/(g·°C).)',
    c: [fx(dT, 2) + ' °C', fx(nH * 55800 / (150.0 * cw), 2) + ' °C', fx(q / (100.0 * cw), 2) + ' °C', fx((nH + nO) * 55800 / (150.0 * cw), 2) + ' °C', sci(dT / 1000, 3) + ' °C'],
    why: `mol HCl = 0.1000 × 0.500 = ${fx(nH, 4)}; mol NaOH = 0.0500 × 0.800 = ${fx(nO, 4)}. NaOH is limiting, so ${fx(nO, 4)} mol H₂O forms and q(rxn) = ${fx(nO, 4)} × (−55.8 kJ/mol) = −${fx(q / 1000, 3)} kJ. The solution absorbs +${fx(q, 0)} J: ΔT = ${fx(q, 0)} ÷ (150.0 × 4.184) = ${fx(dT, 2)} °C. Using the HCl moles gives ${fx(nH * 55800 / (150.0 * cw), 2)} °C; using only 100.0 g of solution gives ${fx(q / (100.0 * cw), 2)} °C.`,
    h: H('Which reactant limits how much water forms?', 'q = mol(limiting) × 55.8 kJ/mol, absorbed by 150.0 g of solution.', `ΔT = ${fx(q, 0)} J ÷ (150.0 × 4.184).`) });
}
{ // coffee cup final T
  const dT = 3500 / (150.0 * cw);
  add({ L: 8, t: 3, tag: 'Trap', k: 'mcq',
    q: 'A reaction in a coffee-cup calorimeter releases 3.50 kJ of heat into 150.0 g of solution (c = 4.184 J/(g·°C)) that starts at 24.00 °C. What is the final temperature?',
    c: [fx(24.00 + dT, 2) + ' °C', fx(24.00 - dT, 2) + ' °C', fx(dT, 2) + ' °C', fx(24.00 + 3.50 / (150 * cw), 2) + ' °C', fx(24.00 + 3500 / (100.0 * cw), 2) + ' °C'],
    why: `The reaction releases heat, so the solution gains it: q(soln) = +3500 J. ΔT = 3500 ÷ (150.0 × 4.184) = 3500 ÷ 627.6 = ${fx(dT, 3)} °C. T(final) = 24.00 + ${fx(dT, 2)} = ${fx(24.00 + dT, 2)} °C. Using q(rxn) = −3500 J for the solution gives the impossible cooling to ${fx(24.00 - dT, 2)} °C; leaving q in kJ barely moves the temperature.`,
    h: H('Released by the reaction = absorbed by the solution.', 'q(soln) = +3500 J.', 'ΔT = 3500 ÷ 627.6; add to 24.00 °C.') });
}

{ // reverse/scale NH3
  add({ L: 8, t: 2, tag: 'Calculation', k: 'mcq',
    q: 'N₂(g) + 3H₂(g) → 2NH₃(g), ΔH = −91.8 kJ. What is ΔH for NH₃(g) → ½N₂(g) + 3/2 H₂(g)?',
    c: ['+45.9 kJ', '−45.9 kJ', '+91.8 kJ', '−91.8 kJ', '+183.6 kJ'],
    why: 'Two changes: the reaction is REVERSED (change the sign: +91.8 kJ) and HALVED (2 mol NH₃ → 1 mol NH₃, so halve ΔH): +91.8 ÷ 2 = +45.9 kJ. −45.9 kJ halves but forgets to flip; +91.8 kJ flips but forgets to halve; +183.6 kJ doubles instead of halving.',
    h: H('Two things happened to the equation. What are they?', 'Reverse → change sign. Scale → scale ΔH by the same factor.', 'Flip −91.8 to +91.8, then divide by 2.') });
}
{ // SO3 x2 reverse
  const dH = 2 * Hf.SO3 - 2 * Hf.SO2;
  add({ L: 8, t: 2, tag: 'Calculation', k: 'mcq',
    q: `2SO₂(g) + O₂(g) → 2SO₃(g), ΔH = ${fx(dH, 1)} kJ. What is ΔH for 4SO₃(g) → 4SO₂(g) + 2O₂(g)?`,
    c: [px(-2 * dH, 1) + ' kJ', fx(2 * dH, 1) + ' kJ', px(-dH, 1) + ' kJ', fx(dH, 1) + ' kJ', px(-dH / 2, 1) + ' kJ'],
    why: `The target is the given reaction REVERSED (sign flips: ${px(-dH, 1)} kJ) and DOUBLED (×2): ${px(-2 * dH, 1)} kJ. ${fx(2 * dH, 1)} kJ doubles without flipping; ${px(-dH, 1)} kJ flips without doubling.`,
    h: H('Compare the target with the given equation.', 'It is reversed and has twice the coefficients.', `−(${fx(dH, 1)}) × 2.`) });
}
{ // Worksheet Q1 exactly: thermite 725 kJ
  const nrxn = 725 / 850, mFe = nrxn * 2 * AM.Fe;
  add({ L: 8, t: 3, tag: 'Worksheet', k: 'mcq',
    q: 'The thermite reaction is 2Al(s) + Fe₂O₃(s) → 2Fe(s) + Al₂O₃(s), ΔH = −850 kJ. What mass of iron is formed when 725 kJ of heat is released? (Fe = 55.85 g/mol)',
    c: [fx(mFe, 1) + ' g', fx(mFe / 2, 1) + ' g', fx(nrxn * M_Fe2O3, 0) + ' g', fx(850 / 725 * 2 * AM.Fe, 0) + ' g', fx(-mFe, 1) + ' g'],
    why: `725 kJ × (2 mol Fe / 850 kJ) = ${fx(nrxn * 2, 4)} mol Fe. × 55.85 g/mol = ${fx(mFe, 1)} g Fe. The heat is “released”, so the sign is already accounted for - a mass is never negative. ${fx(mFe / 2, 1)} g forgets the 2 mol Fe per 850 kJ; ${fx(nrxn * M_Fe2O3, 0)} g is the mass of Fe₂O₃ consumed; ${fx(850 / 725 * 2 * AM.Fe, 0)} g turns the kJ ratio upside down.`,
    h: H('Use ΔH as a conversion factor: 850 kJ per 2 mol Fe.', 'kJ → mol Fe → g Fe.', '725 × 2 ÷ 850 × 55.85.') });
}
{ // thermite variation, 10.0 g Al, course value 851
  const q = 10.0 / AM.Al / 2 * 851;
  add({ L: 8, t: 3, tag: 'Worksheet', k: 'mcq',
    q: 'Using the lecture value for thermite, 2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(s), ΔH = −851 kJ, how much heat is involved when 10.0 g of Al reacts with excess Fe₂O₃? (Al = 26.98 g/mol)',
    c: [sg(q, 3) + ' kJ released', sg(2 * q, 3) + ' kJ released', sg(q, 3) + ' kJ absorbed', sg(10.0 / M_Fe2O3 * 851, 3) + ' kJ released', sg(2 * q, 3) + ' kJ absorbed'],
    why: `mol Al = 10.0 ÷ 26.98 = ${fx(10 / AM.Al, 4)} mol. The equation releases 851 kJ per 2 mol Al: ${fx(10 / AM.Al, 4)} × 851/2 = ${fx(q, 1)} kJ ≈ ${sg(q, 3)} kJ RELEASED (ΔH negative). ${sg(2 * q, 3)} kJ forgets the coefficient 2 on Al; ${sg(10.0 / M_Fe2O3 * 851, 3)} kJ divides by the molar mass of Fe₂O₃ instead of Al.`,
    h: H('Grams of Al → moles of Al.', '851 kJ is released per 2 mol Al.', `${fx(10 / AM.Al, 4)} × 425.5 kJ.`) });
}
{ // thermite variation num: mass of Al for 1.00 x 10^3 kJ
  const mAl = 1000 / 851 * 2 * AM.Al;
  add({ L: 8, t: 3, tag: 'Worksheet', k: 'num',
    q: 'Using 2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(s), ΔH = −851 kJ, what mass of aluminum must react to release 1.00 × 10³ kJ of heat? (Al = 26.98 g/mol. Enter a number in g.)',
    c: [sg(mAl, 3) + ' g'], ans: Number(mAl.toFixed(2)),
    why: `1.00 × 10³ kJ × (2 mol Al / 851 kJ) = ${fx(2000 / 851, 4)} mol Al. × 26.98 g/mol = ${fx(mAl, 1)} g ≈ ${sg(mAl, 3)} g Al.`,
    h: H('851 kJ per 2 mol Al.', 'kJ → mol Al → g Al.', '1000 × 2 ÷ 851 × 26.98.'), opts: { tol: 0.01 } });
}
{ // CH4 25.0 g
  const n = 25.0 / M_CH4, q = n * 891;
  add({ L: 8, t: 2, tag: 'Lecture', k: 'mcq',
    q: 'CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l), ΔH = −891 kJ/mol. How much heat is released when 25.0 g of CH₄ burns completely? (CH₄ = 16.04 g/mol)',
    c: [sci(q, 3) + ' kJ', sci(25.0 * 891, 3) + ' kJ', fx(q / 2, 0) + ' kJ', '891 kJ', fx(891 / 25.0, 1) + ' kJ'],
    why: `mol CH₄ = 25.0 ÷ 16.04 = ${fx(n, 4)} mol. Heat = ${fx(n, 4)} mol × 891 kJ/mol = ${fx(q, 0)} kJ ≈ ${sci(q, 3)} kJ released. ${sci(25.0 * 891, 3)} kJ multiplies grams by kJ/mol; ${fx(q / 2, 0)} kJ divides by the 2 of O₂, which has nothing to do with CH₄; 891 kJ is for exactly 1 mol.`,
    h: H('ΔH is per mole of CH₄ as written.', 'Convert grams to moles first.', `${fx(n, 4)} mol × 891 kJ/mol.`) });
}
add({ L: 8, t: 2, tag: 'Lecture', k: 'mcq',
  q: 'The lecture treats ΔH like a mole ratio. For CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l), ΔH = −891 kJ, which conversion factor is CORRECT?',
  c: ['−891 kJ per 2 mol O₂ consumed', '−891 kJ per 1 mol O₂ consumed', '−891 kJ per 2 mol CO₂ formed',
      '−1782 kJ per 1 mol CH₄ consumed', '−445.5 kJ per 1 mol CH₄ consumed'],
  why: 'The ΔH belongs to the equation as written, i.e. to 1 mol CH₄, 2 mol O₂, 1 mol CO₂ and 2 mol H₂O(l) all at once. So −891 kJ / 1 mol CH₄, −891 kJ / 2 mol O₂, −891 kJ / 1 mol CO₂ and −891 kJ / 2 mol H₂O are all valid. Each wrong choice attaches −891 kJ (or a multiple of it) to the wrong number of moles.',
  h: H('Read the coefficients next to each substance.', 'The whole equation as written releases 891 kJ.', 'How many moles of O₂ appear in the equation?') });
{ // CH4 num: 3.20 mol O2
  const q = 3.20 / 2 * 891;
  add({ L: 8, t: 2, tag: 'Calculation', k: 'num',
    q: 'For CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l), ΔH = −891 kJ, how much heat is released when 3.20 mol of O₂ is consumed? (Enter the heat released as a positive number in kJ.)',
    c: [sci(q, 3) + ' kJ'], ans: Number(q.toFixed(1)),
    why: `3.20 mol O₂ × (891 kJ / 2 mol O₂) = ${fx(q, 1)} kJ ≈ ${sci(q, 3)} kJ released. Multiplying 3.20 × 891 (${fx(3.2 * 891, 0)} kJ) ignores the 2 mol O₂ in the equation.`,
    h: H('The −891 kJ goes with 2 mol of O₂.', 'Use 891 kJ / 2 mol O₂ as the conversion factor.', '3.20 × 891 ÷ 2.'), opts: { tol: 0.01 } });
}
{ // t4 CH4 to heat water
  const q = 1000 * cw * 60.0 / 1000, mCH4 = q / 891 * M_CH4;
  add({ L: 8, t: 4, tag: 'Exam', k: 'mcq',
    q: 'What mass of methane must burn (CH₄ + 2O₂ → CO₂ + 2H₂O(l), ΔH = −891 kJ/mol) to heat 1.00 kg of water from 20.0 °C to 80.0 °C, if all the heat goes into the water? (c = 4.184 J/(g·°C); CH₄ = 16.04 g/mol)',
    c: [fx(mCH4, 2) + ' g', sci(mCH4 * 1000, 3) + ' g', fx(1000 * cw * 80.0 / 1000 / 891 * M_CH4, 2) + ' g', fx(q / 891, 3) + ' g', fx(1000 * 60.0 / 1000 / 891 * M_CH4, 2) + ' g'],
    why: `Heat needed: q = (1000 g)(4.184)(80.0 − 20.0) = ${fx(q * 1000, 0)} J = ${fx(q, 1)} kJ. mol CH₄ = ${fx(q, 1)} kJ ÷ 891 kJ/mol = ${fx(q / 891, 4)} mol. Mass = ${fx(q / 891, 4)} × 16.04 = ${fx(mCH4, 2)} g. ${sci(mCH4 * 1000, 3)} g leaves q in joules; ${fx(1000 * cw * 80.0 / 1000 / 891 * M_CH4, 2)} g uses 80.0 °C as ΔT; ${fx(q / 891, 3)} is the MOLES of CH₄; ${fx(1000 * 60.0 / 1000 / 891 * M_CH4, 2)} g forgets the specific heat.`,
    h: H('Step 1: heat the water needs (q = m·c·ΔT).', 'Step 2: kJ → mol CH₄ with 891 kJ/mol.', 'Step 3: mol → g with 16.04 g/mol.') });
}
{ // sweat slide
  const n = 100 / M_H2O, q = n * 40.7;
  add({ L: 8, t: 2, tag: 'Lecture', k: 'mcq',
    q: 'An exercising athlete evaporates 100 mL of water through sweat. How much heat is dissipated into the environment by this process? (ΔH(vap) = +40.7 kJ/mol; water: 1.00 g/mL, 18.02 g/mol)',
    c: [fx(q, 0) + ' kJ', sci(100 * 40.7, 3) + ' kJ', fx(n * 44, 0) + ' kJ', '40.7 kJ', fx(q / 1000, 3) + ' kJ'],
    why: `100 mL × 1.00 g/mL = 100 g. mol = 100 ÷ 18.02 = ${fx(n, 3)} mol. q = ${fx(n, 3)} mol × 40.7 kJ/mol = ${fx(q, 0)} kJ (≈ 2.26 × 10² kJ) carried away from the body. ${sci(100 * 40.7, 3)} kJ multiplies GRAMS by kJ/mol; ${fx(n * 44, 0)} kJ uses the 25 °C value 44 kJ/mol instead of the 40.7 given.`,
    h: H('mL → g → mol of water.', 'ΔH(vap) is per mole.', `${fx(n, 3)} mol × 40.7 kJ/mol.`) });
}
{ // sweat variation num
  const m = 500 / 40.7 * M_H2O;
  add({ L: 8, t: 3, tag: 'Lecture', k: 'num',
    q: 'How many grams of water must evaporate from your skin to remove 500. kJ of heat? (ΔH(vap) = 40.7 kJ/mol; H₂O = 18.02 g/mol. Enter a number in g.)',
    c: [sg(m, 3) + ' g'], ans: Number(m.toFixed(1)),
    why: `mol H₂O = 500. kJ ÷ 40.7 kJ/mol = ${fx(500 / 40.7, 3)} mol. Mass = ${fx(500 / 40.7, 3)} × 18.02 = ${fx(m, 1)} g ≈ ${sg(m, 3)} g.`,
    h: H('Heat ÷ ΔH(vap) gives moles.', 'Then moles × molar mass.', '500. ÷ 40.7 × 18.02.'), opts: { tol: 0.01 } });
}
{ // freezing 36.0 g
  const n = 36.0 / M_H2O, q = -n * 6.02;
  add({ L: 8, t: 2, tag: 'Calculation', k: 'mcq',
    q: 'What is ΔH when 36.0 g of liquid water freezes at 0 °C? (ΔH(fus) = 6.02 kJ/mol; H₂O = 18.02 g/mol)',
    c: [fx(q, 1) + ' kJ', px(-q, 1) + ' kJ', fx(-n * 40.7, 1) + ' kJ', fx(-36.0 * 6.02, 0) + ' kJ', '−6.02 kJ'],
    why: `mol = 36.0 ÷ 18.02 = ${fx(n, 3)} mol. Melting absorbs 6.02 kJ/mol, so freezing (the reverse) releases it: ΔH = ${fx(n, 3)} × (−6.02) = ${fx(q, 1)} kJ. ${px(-q, 1)} kJ is melting, not freezing; ${fx(-n * 40.7, 1)} kJ uses ΔH(vap); ${fx(-36.0 * 6.02, 0)} kJ multiplies grams by kJ/mol.`,
    h: H('Is freezing endothermic or exothermic?', 'ΔH(freezing) = −ΔH(fus).', `${fx(n, 3)} mol × (−6.02 kJ/mol).`) });
}
{ // condensation num
  const q = -25.0 / M_H2O * 40.7;
  add({ L: 8, t: 2, tag: 'Trap', k: 'num',
    q: '25.0 g of steam condenses to liquid water at 100 °C. What is q for the water (the system)? Include the sign. (ΔH(vap) = 40.7 kJ/mol; H₂O = 18.02 g/mol. Enter a number in kJ.)',
    c: [fx(q, 1) + ' kJ'], ans: Number(q.toFixed(2)),
    why: `mol = 25.0 ÷ 18.02 = ${fx(25 / M_H2O, 3)} mol. Condensation is the reverse of vaporization, so ΔH(cond) = −40.7 kJ/mol. q = ${fx(25 / M_H2O, 3)} × (−40.7) = ${fx(q, 1)} kJ. The water releases heat (that is why steam burns are so severe), so q is NEGATIVE.`,
    h: H('Condensing is the reverse of boiling.', 'Reverse the process → flip the sign of ΔH(vap).', `${fx(25 / M_H2O, 3)} mol × (−40.7 kJ/mol).`), opts: { tol: 0.01 } });
}
add({ L: 8, t: 1, tag: 'Lecture', k: 'mcq',
  q: 'The lecture lists C₂H₆O(s) → C₂H₆O(l), ΔH(fus) = +5.0 kJ/mol for ethanol. What is ΔH when 1 mol of liquid ethanol freezes?',
  c: ['−5.0 kJ', '+5.0 kJ', '0 kJ, because the temperature does not change', '−10.0 kJ', '+2.5 kJ'],
  why: 'Freezing is melting run backwards, and reversing a process flips the sign of ΔH: ΔH(freezing) = −ΔH(fus) = −5.0 kJ/mol. Constant temperature during a phase change does not make ΔH zero - the energy goes into changing the phase, not the temperature.',
  h: H('How is freezing related to melting?', 'Reverse a process → change the sign of ΔH.', 'Flip +5.0.') });
add({ L: 8, t: 1, tag: 'Concept', k: 'mcq',
  q: 'Which process has ΔH > 0?',
  c: ['Iodine subliming: I₂(s) → I₂(g)', 'Water vapor condensing: H₂O(g) → H₂O(l)', 'Water freezing: H₂O(l) → H₂O(s)',
      'Frost forming: H₂O(g) → H₂O(s)', 'Methane burning in oxygen'],
  why: 'Going from a more ordered phase to a less ordered one (s → l, l → g, s → g) requires breaking intermolecular attractions, which absorbs heat (ΔH > 0). Sublimation is s → g. Condensation, freezing and deposition release heat, and combustion is exothermic.',
  h: H('Which direction absorbs heat: toward gas or toward solid?', 'Breaking attractions between molecules costs energy.', 'Look for the change that ends as a gas.') });
add({ L: 8, t: 1, tag: 'Concept', k: 'mcq',
  q: 'Which change to a thermochemical equation does NOT change the value of its ΔH?',
  c: ['Writing the reactants in a different order on the left side', 'Multiplying every coefficient by 2', 'Reversing the equation',
      'Changing a product from H₂O(l) to H₂O(g)', 'Dividing every coefficient by 2'],
  why: 'ΔH is for the moles and phases written. Doubling doubles it, halving halves it, reversing flips its sign, and changing a phase changes the enthalpy of that substance (H₂O(g) is 44 kJ/mol higher than H₂O(l) at 25 °C). Merely listing the same reactants in another order describes the identical reaction.',
  h: H('ΔH depends on amounts, direction and phases.', 'Which choice changes none of those?', 'The order you write terms in is cosmetic.') });
{ // glucose slide
  add({ L: 8, t: 3, tag: 'Lecture', k: 'mcq',
    q: 'C₆H₁₂O₆(s) + 6O₂(g) → 6CO₂(g) + 6H₂O(g), ΔH = −2539 kJ/mol. What is ΔH for the same reaction when LIQUID water is produced? (ΔH(vap) of water = +44 kJ/mol)',
    c: [`${fx(-2539 - 6 * 44, 0)} kJ/mol`, `${fx(-2539 + 6 * 44, 0)} kJ/mol`, `${fx(-2539 - 44, 0)} kJ/mol`, `${fx(-2539 - 6 * 40.7, 0)} kJ/mol`, `+${fx(2539 + 6 * 44, 0)} kJ/mol`],
    why: `Add 6 × [H₂O(g) → H₂O(l)], whose ΔH is −44 kJ/mol (condensation, the reverse of vaporization). ΔH = −2539 + 6(−44) = −2539 − 264 = ${fx(-2539 - 264, 0)} kJ/mol. Condensing the steam releases extra heat, so making liquid water is MORE exothermic. Adding +264 (${fx(-2539 + 264, 0)}) uses vaporization instead of condensation; ${fx(-2539 - 44, 0)} forgets the 6; ${fx(-2539 - 6 * 40.7, 0)} uses 40.7 when the problem gives 44.`,
    h: H('What extra step turns H₂O(g) into H₂O(l)?', 'Condensation: ΔH = −44 kJ/mol, and there are 6 mol of water.', '−2539 + 6(−44).') });
}
{ // CH4 to H2O(g)
  add({ L: 8, t: 4, tag: 'Trap', k: 'mcq',
    q: 'CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l), ΔH = −891 kJ. Using ΔH(vap) of water = +44.0 kJ/mol, what is ΔH for CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g)?',
    c: [`${fx(-891 + 88, 0)} kJ`, `${fx(-891 - 88, 0)} kJ`, `${fx(-891 + 44, 0)} kJ`, `${fx(-891 - 44, 0)} kJ`, `+${fx(891 - 88, 0)} kJ`],
    why: `Target = given + 2 × [H₂O(l) → H₂O(g), ΔH = +44.0]. ΔH = −891 + 2(+44.0) = ${fx(-891 + 88, 0)} kJ. Making steam instead of liquid leaves 88 kJ “unreleased” (it stays as the vapor’s enthalpy), so the reaction is LESS exothermic. ${fx(-891 - 88, 0)} kJ goes the wrong way; ${fx(-891 + 44, 0)} kJ forgets there are 2 mol of water.`,
    h: H('What do you add to turn 2H₂O(l) into 2H₂O(g)?', 'Vaporizing is endothermic: +44.0 kJ per mol.', '−891 + 2(44.0).') });
}
{ // Ba(OH)2·8H2O 5.00 g
  const n = 5.00 / M_BaOH2_8, q = n * 102;
  add({ L: 8, t: 3, tag: 'Lecture', k: 'mcq',
    q: 'Ba(OH)₂·8H₂O(s) + 2NH₄SCN(s) → Ba(SCN)₂(aq) + 2NH₃(aq) + 10H₂O(l), ΔH = +102 kJ. How much heat is involved when 5.00 g of Ba(OH)₂·8H₂O (315.5 g/mol) reacts with excess NH₄SCN?',
    c: [fx(q, 2) + ' kJ absorbed', fx(q, 2) + ' kJ released', fx(2 * q, 2) + ' kJ absorbed', fx(5.00 / M_BaOH2 * 102, 2) + ' kJ absorbed', '510. kJ absorbed'],
    why: `mol = 5.00 g ÷ 315.5 g/mol = ${fx(n, 5)} mol. 102 kJ is absorbed per 1 mol Ba(OH)₂·8H₂O: ${fx(n, 5)} × 102 = ${fx(q, 2)} kJ absorbed (ΔH > 0, the flask gets cold). ${fx(2 * q, 2)} kJ applies the 2 that belongs to NH₄SCN; ${fx(5.00 / M_BaOH2 * 102, 2)} kJ uses the molar mass of Ba(OH)₂ without its 8 waters; 510. kJ multiplies grams by kJ.`,
    h: H('Positive ΔH: absorbed or released?', 'Convert grams of the hydrate (315.5 g/mol) to moles.', `${fx(n, 5)} mol × 102 kJ/mol.`) });
}
{ // t4 limiting reactant H2/O2
  const nH2 = 4.00 / M_H2, nO2 = 16.0 / M_O2, q = nO2 * 571.6;
  add({ L: 8, t: 4, tag: 'Trap', k: 'mcq',
    q: '2H₂(g) + O₂(g) → 2H₂O(l), ΔH = −571.6 kJ. How much heat is released when 4.00 g of H₂ and 16.0 g of O₂ react as completely as possible? (H₂ = 2.016 g/mol, O₂ = 32.00 g/mol)',
    c: [fx(q, 0) + ' kJ', fx(nH2 / 2 * 571.6, 0) + ' kJ', fx(nO2 / 2 * 571.6, 0) + ' kJ', sci(nH2 * 571.6, 3) + ' kJ', fx(571.6, 1) + ' kJ'],
    why: `mol H₂ = 4.00 ÷ 2.016 = ${fx(nH2, 3)}; mol O₂ = 16.0 ÷ 32.00 = ${fx(nO2, 3)}. ${fx(nO2, 3)} mol O₂ needs 2 × ${fx(nO2, 3)} = ${fx(2 * nO2, 3)} mol H₂, and there is more than that, so O₂ is LIMITING. ${fx(nO2, 3)} mol O₂ × 571.6 kJ / 1 mol O₂ = ${fx(q, 1)} kJ. Basing it on H₂ (${fx(nH2 / 2 * 571.6, 0)} kJ) assumes O₂ is in excess; ${fx(nO2 / 2 * 571.6, 0)} kJ divides by a 2 that belongs to H₂.`,
    h: H('A thermochemistry problem can have a limiting reactant too.', 'Compare mol O₂ with mol H₂ ÷ 2.', '571.6 kJ per 1 mol O₂.') });
}
{ // per mol CO2 ethane
  add({ L: 8, t: 3, tag: 'Trap', k: 'mcq',
    q: '2C₂H₆(g) + 7O₂(g) → 4CO₂(g) + 6H₂O(l), ΔH = −3119.6 kJ. How much heat is released per mole of CO₂ formed?',
    c: [fx(3119.6 / 4, 1) + ' kJ', fx(3119.6 / 2, 1) + ' kJ', '3119.6 kJ', fx(3119.6 / 6, 1) + ' kJ', fx(3119.6 / 7, 1) + ' kJ'],
    why: `The ΔH is for the equation as written, which forms 4 mol CO₂. Per mole of CO₂: 3119.6 ÷ 4 = ${fx(3119.6 / 4, 1)} kJ released. ${fx(3119.6 / 2, 1)} kJ is per mole of C₂H₆; ${fx(3119.6 / 6, 1)} per mole of H₂O; ${fx(3119.6 / 7, 1)} per mole of O₂.`,
    h: H('ΔH goes with the coefficients written.', 'How many moles of CO₂ appear in the equation?', '3119.6 ÷ 4.') });
}
{ // 10.0 g water formed
  const n = 10.0 / M_H2O, q = n * 571.6 / 2;
  add({ L: 8, t: 3, tag: 'Calculation', k: 'mcq',
    q: '2H₂(g) + O₂(g) → 2H₂O(l), ΔH = −571.6 kJ. How much heat is released when 10.0 g of liquid water is formed? (H₂O = 18.02 g/mol)',
    c: [sg(q, 3) + ' kJ', sg(2 * q, 3) + ' kJ', sci(10.0 * 571.6 / 2, 3) + ' kJ', fx(571.6, 1) + ' kJ', fx(n * 241.8, 0) + ' kJ'],
    why: `mol H₂O = 10.0 ÷ 18.02 = ${fx(n, 4)} mol. The equation releases 571.6 kJ per 2 mol H₂O: ${fx(n, 4)} × 571.6 ÷ 2 = ${fx(q, 1)} kJ ≈ ${sg(q, 3)} kJ. ${sg(2 * q, 3)} kJ forgets the 2 mol H₂O; ${fx(n * 241.8, 0)} kJ uses the value for H₂O(g).`,
    h: H('Grams → moles of H₂O.', '571.6 kJ is released per 2 mol H₂O(l).', `${fx(n, 4)} × 285.8 kJ.`) });
}

{ // t4 Mg + HCl coffee cup
  const qs = 100.0 * cw * (29.33 - 22.21), n = 0.158 / AM.Mg, dH = -qs / 1000 / n;
  add({ L: 8, t: 4, tag: 'Exam', k: 'mcq',
    q: 'A 0.158 g strip of Mg is added to 100.0 mL of 1.0 M HCl (an excess) in a coffee-cup calorimeter: Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g). The temperature rises from 22.21 °C to 29.33 °C. Treat the solution as 100.0 g with c = 4.184 J/(g·°C). What is ΔH of the reaction per mole of Mg? (Mg = 24.31 g/mol)',
    c: [fx(dH, 0) + ' kJ/mol', px(-dH, 0) + ' kJ/mol', fx(-qs / 1000 / 0.158, 1) + ' kJ/mol', sci(-100.0 * cw * 29.33 / 1000 / n, 3) + ' kJ/mol', sci(-qs / n, 3) + ' kJ/mol'],
    why: `q(soln) = (100.0)(4.184)(29.33 − 22.21) = (100.0)(4.184)(7.12) = ${fx(qs, 0)} J, so q(rxn) = −${fx(qs / 1000, 3)} kJ. HCl is in excess, so Mg is limiting: mol Mg = 0.158 ÷ 24.31 = ${sci(n, 3)} mol. ΔH = −${fx(qs / 1000, 3)} kJ ÷ ${sci(n, 3)} mol = ${fx(dH, 0)} kJ/mol. ${fx(-qs / 1000 / 0.158, 1)} is per GRAM of Mg; ${sci(-100.0 * cw * 29.33 / 1000 / n, 3)} uses the final temperature as ΔT; ${sci(-qs / n, 3)} leaves q in joules.`,
    h: H('The limiting reactant is the one that is not “in excess”.', 'q(rxn) = −m·c·ΔT; mol Mg = 0.158 ÷ 24.31.', `ΔH = −${fx(qs / 1000, 3)} kJ ÷ ${sci(n, 3)} mol.`) });
}
{ // t4 thermite with limiting reactant
  const nAl = 10.0 / AM.Al, nFe = 20.0 / M_Fe2O3, q = nFe * 851;
  add({ L: 8, t: 4, tag: 'Trap', k: 'mcq',
    q: 'For 2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(s), ΔH = −851 kJ, how much heat is released when 10.0 g of Al and 20.0 g of Fe₂O₃ react as completely as possible? (Al = 26.98, Fe₂O₃ = 159.70 g/mol)',
    c: [sg(q, 3) + ' kJ released', sg(nAl / 2 * 851, 3) + ' kJ released', sg(2 * q, 3) + ' kJ released', sg(q, 3) + ' kJ absorbed', fx(q / 2, 1) + ' kJ released'],
    why: `mol Al = 10.0 ÷ 26.98 = ${fx(nAl, 4)}; mol Fe₂O₃ = 20.0 ÷ 159.70 = ${fx(nFe, 4)}. The Fe₂O₃ would need 2 × ${fx(nFe, 4)} = ${fx(2 * nFe, 4)} mol Al, and there is ${fx(nAl, 4)} mol, so Fe₂O₃ is LIMITING. 851 kJ is released per 1 mol Fe₂O₃: ${fx(nFe, 4)} × 851 = ${fx(q, 1)} kJ ≈ ${sg(q, 3)} kJ released. Using the Al gives ${sg(nAl / 2 * 851, 3)} kJ - more heat than the Fe₂O₃ can supply. ${sg(2 * q, 3)} kJ applies the 2 that belongs to Al.`,
    h: H('Two reactant amounts are given - find the limiting one.', 'Compare mol Al with 2 × mol Fe₂O₃.', '851 kJ per 1 mol Fe₂O₃.') });
}
{ // t4 Trap the worksheet sign mistake
  add({ L: 8, t: 4, tag: 'Trap', k: 'mcq',
    q: 'On the recitation neutralization (100.0 g of solution warms from 23.0 °C to 29.7 °C), a student writes q(rxn) = +2.8 × 10³ J and concludes the reaction is endothermic with ΔH = +56 kJ/mol. What went wrong?',
    c: ['The solution gained the heat, so q(rxn) = −q(soln) = −2.8 × 10³ J: the reaction is exothermic, ΔH = −56 kJ/mol',
        'Nothing - a rise in temperature means the reaction absorbed heat',
        'The size is wrong: only the 50.0 g of HCl solution counts, so q(rxn) = +1.4 × 10³ J',
        'ΔT must be in kelvin, so q(rxn) is really about +1.3 × 10⁵ J',
        'The sign is right, but ΔH should be divided by the 100.0 g of solution'],
    why: 'q(soln) = (100.0)(4.184)(6.7) = +2.8 × 10³ J: the SOLUTION (surroundings) absorbed heat. Energy is conserved, so the reaction (system) released it: q(rxn) = −2.8 × 10³ J and ΔH = −2.8 kJ ÷ 0.050 mol = −56 kJ/mol, exothermic. A temperature RISE in a coffee cup always means an exothermic reaction. ΔT is the same in K and °C, and the full 100.0 g warms up.',
    h: H('Which part of the setup actually got warmer - system or surroundings?', 'q(soln) + q(rxn) = 0.', 'Warming solution → negative q(rxn).') });
}
{ // t4 vaporization enthalpy from table, then heat for 50.0 g
  const dHv = Hf.H2Og - Hf.H2Ol, n = 50.0 / M_H2O, q = n * dHv;
  add({ L: 8, t: 4, tag: 'Exam', k: 'mcq',
    q: 'Using ΔH°f(H₂O(l)) = −285.8 kJ/mol and ΔH°f(H₂O(g)) = −241.8 kJ/mol, how much heat is absorbed when 50.0 g of water evaporates at 25 °C? (H₂O = 18.02 g/mol)',
    c: [sg(q, 3) + ' kJ', sg(n * 40.7, 3) + ' kJ', sci(50.0 * dHv, 3) + ' kJ', fx(dHv, 1) + ' kJ', sci(n * (285.8 + 241.8), 3) + ' kJ'],
    why: `H₂O(l) → H₂O(g): ΔH° = ΔH°f(g) − ΔH°f(l) = −241.8 − (−285.8) = +${fx(dHv, 1)} kJ/mol. mol = 50.0 ÷ 18.02 = ${fx(n, 3)} mol. q = ${fx(n, 3)} × ${fx(dHv, 1)} = ${fx(q, 1)} kJ ≈ ${sg(q, 3)} kJ absorbed. ${sg(n * 40.7, 3)} kJ uses the 100 °C value (40.7) instead of the 25 °C value the table gives; ${sci(50.0 * dHv, 3)} kJ multiplies grams by kJ/mol; ${fx(dHv, 1)} kJ is for one mole only.`,
    h: H('Treat evaporation as a reaction: H₂O(l) → H₂O(g).', 'ΔH° = ΔH°f(product) − ΔH°f(reactant).', `${fx(dHv, 1)} kJ/mol × (50.0 ÷ 18.02) mol.`) });
}

/* ======================================================================
   LESSON 9 - Thermochemistry 3 (6.5-6.6): Hess's law, standard states,
   formation equations, ΔH°rxn from ΔH°f
   ====================================================================== */

add({ L: 9, t: 1, tag: 'Concept', k: 'mcq',
  q: 'Why does Hess’s law work - why can you add the ΔH values of steps to get the ΔH of the overall reaction?',
  c: ['Enthalpy is a state function, so ΔH depends only on the initial and final states, not the route',
      'Heat is a state function, so every route releases the same heat in every step',
      'Every reaction is really carried out in the steps you write down',
      'Enthalpy is conserved, so ΔH of any reaction is zero overall',
      'The steps always have the same ΔH as each other'],
  why: 'H is a state function. The overall reaction starts and ends in the same states whichever steps you imagine, so ΔH(overall) is the same as the sum of ΔH(steps) - even if the reaction never actually goes that way. Heat q in general is NOT a state function; it equals ΔH only at constant pressure. The lecture haiku: “Many roads may wind / Start and finish stay the same / Heat ignores the path.”',
  h: H('What kind of quantity depends only on start and finish?', 'E, H, P, V and T share this property.', 'State function.') });
add({ L: 9, t: 1, tag: 'Concept', k: 'mcq',
  q: 'To use a given reaction in a Hess’s law problem you must reverse it AND multiply it by 3. What happens to its ΔH?',
  c: ['It becomes −3 ΔH', 'It becomes +3 ΔH', 'It becomes −ΔH/3', 'It becomes ΔH − 3', 'It stays ΔH; only the coefficients change'],
  why: '“Flip, scale, add.” Reversing changes the sign; multiplying by 3 multiplies ΔH by 3. Together: ΔH → −3ΔH. ΔH is extensive - it is for the amounts written - so it must scale with the coefficients.',
  h: H('Reverse → ?', 'Scale by 3 → ?', 'Do both: change the sign and multiply by 3.') });
{ // Hess slide data -77.8 + -519
  add({ L: 9, t: 2, tag: 'Lecture', k: 'mcq',
    q: 'Hess measured heats per gram of SO₃ for diluting sulfuric acid and then neutralizing it: H₂SO₄(l) + H₂O(l) → H₂SO₄(aq), −77.8 cal/g; H₂SO₄(aq) + 2NH₃(aq) → (NH₄)₂SO₄(aq), −519 cal/g. What heat did he predict - and find - for neutralizing the undiluted acid directly, H₂SO₄(l) + 2NH₃(aq) → (NH₄)₂SO₄(aq)?',
    c: ['−597 cal/g', '−441 cal/g', '+441 cal/g', '+597 cal/g', '−519 cal/g'],
    why: 'The two steps add up to the direct route (H₂SO₄(aq) cancels), so the heats add: −77.8 + (−519) = −596.8 ≈ −597 cal/g SO₃, exactly what Hess measured. No matter the route, the same total heat: that observation is Hess’s law. −441 subtracts instead of adding; −519 ignores the dilution step.',
    h: H('Add the two equations: what cancels?', 'When equations add, their ΔH values add.', '−77.8 + (−519).') });
}
{ // Worksheet Q7 exactly: acetylene
  const dH = 2 * -393.5 + -285.8 + 1299.5;
  add({ L: 9, t: 3, tag: 'Worksheet', k: 'mcq',
    q: 'Use Hess’s law to find ΔH for 2C(s) + H₂(g) → C₂H₂(g), given: (1) C₂H₂(g) + 5/2 O₂(g) → 2CO₂(g) + H₂O(l), ΔH = −1299.5 kJ; (2) C(s) + O₂(g) → CO₂(g), ΔH = −393.5 kJ; (3) H₂(g) + ½O₂(g) → H₂O(l), ΔH = −285.8 kJ.',
    c: [px(dH, 1) + ' kJ', fx(-dH, 1) + ' kJ', px(-393.5 - 285.8 + 1299.5, 1) + ' kJ', fx(2 * -393.5 - 285.8 - 1299.5, 1) + ' kJ', px(1299.5 + 393.5 + 285.8, 1) + ' kJ'],
    why: `C₂H₂ is a PRODUCT in the target, so reverse (1): 2CO₂ + H₂O(l) → C₂H₂ + 5/2 O₂, ΔH = +1299.5. The target needs 2 C, so double (2): 2C + 2O₂ → 2CO₂, ΔH = −787.0. Keep (3): H₂ + ½O₂ → H₂O(l), ΔH = −285.8. Adding: 2CO₂, H₂O and 5/2 O₂ cancel, leaving 2C + H₂ → C₂H₂. ΔH = +1299.5 − 787.0 − 285.8 = ${px(dH, 1)} kJ. ${px(-393.5 - 285.8 + 1299.5, 1)} forgets to double (2); ${fx(2 * -393.5 - 285.8 - 1299.5, 1)} forgets to reverse (1).`,
    h: H('Where is C₂H₂ in the target, and where in equation (1)?', 'Reverse (1); multiply (2) by 2; keep (3).', '+1299.5 + 2(−393.5) + (−285.8).') });
}
{ // Hess num: CH4 formation from combustion
  const dH = -393.5 + 2 * -285.8 + 890.3;
  add({ L: 9, t: 3, tag: 'Worksheet', k: 'num',
    q: 'Find ΔH for C(graphite) + 2H₂(g) → CH₄(g), given: CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l), ΔH = −890.3 kJ; C(graphite) + O₂(g) → CO₂(g), ΔH = −393.5 kJ; H₂(g) + ½O₂(g) → H₂O(l), ΔH = −285.8 kJ. Include the sign. (Enter a number in kJ.)',
    c: [fx(dH, 1) + ' kJ'], ans: Number(dH.toFixed(1)),
    why: `Keep the carbon equation (−393.5), double the hydrogen equation (2 × −285.8 = −571.6), and reverse the methane combustion (+890.3). Sum: −393.5 − 571.6 + 890.3 = ${fx(dH, 1)} kJ. Check: CO₂, 2H₂O and 2O₂ all cancel, leaving C + 2H₂ → CH₄.`,
    h: H('CH₄ must end up on the product side.', 'Reverse the methane combustion; double the H₂ equation.', '−393.5 + 2(−285.8) + 890.3.'), opts: { abs: 0.15 } });
}
{ // Hess two-step CO
  const dH = -393.5 - -283.0;
  add({ L: 9, t: 2, tag: 'Calculation', k: 'mcq',
    q: 'Find ΔH for C(graphite) + ½O₂(g) → CO(g), given: (1) C(graphite) + O₂(g) → CO₂(g), ΔH = −393.5 kJ; (2) CO(g) + ½O₂(g) → CO₂(g), ΔH = −283.0 kJ.',
    c: [fx(dH, 1) + ' kJ', fx(-393.5 - 283.0, 1) + ' kJ', px(-dH, 1) + ' kJ', px(393.5 + 283.0, 1) + ' kJ', px(-393.5 + 2 * 283.0, 1) + ' kJ'],
    why: `Keep (1) and reverse (2): CO₂ → CO + ½O₂, ΔH = +283.0. Adding: C + O₂ + CO₂ → CO₂ + CO + ½O₂, which simplifies to C + ½O₂ → CO. ΔH = −393.5 + 283.0 = ${fx(dH, 1)} kJ (the ΔH°f of CO). Adding the two ΔH values as given (${fx(-393.5 - 283.0, 1)}) forgets to reverse (2).`,
    h: H('CO is a product in the target but a reactant in (2).', 'Reverse (2): ΔH becomes +283.0.', '−393.5 + 283.0.') });
}
{ // Hess S -> SO3
  const dH = -296.8 + (2 * Hf.SO3 - 2 * Hf.SO2) / 2, g = 2 * Hf.SO3 - 2 * Hf.SO2;
  add({ L: 9, t: 3, tag: 'Calculation', k: 'mcq',
    q: `Find ΔH for S(s) + 3/2 O₂(g) → SO₃(g), given: (1) S(s) + O₂(g) → SO₂(g), ΔH = −296.8 kJ; (2) 2SO₂(g) + O₂(g) → 2SO₃(g), ΔH = ${fx(g, 1)} kJ.`,
    c: [fx(dH, 1) + ' kJ', fx(-296.8 + g, 1) + ' kJ', fx(-296.8 - g / 2, 1) + ' kJ', px(-dH, 1) + ' kJ', fx(-296.8 - g, 1) + ' kJ'],
    why: `The target makes 1 mol SO₃, so HALVE (2): SO₂ + ½O₂ → SO₃, ΔH = ${fx(g / 2, 1)} kJ. Add (1): S + O₂ → SO₂, ΔH = −296.8. SO₂ cancels: S + 3/2 O₂ → SO₃, ΔH = −296.8 + (${fx(g / 2, 1)}) = ${fx(dH, 1)} kJ (matches ΔH°f of SO₃ in Table 6.3). ${fx(-296.8 + g, 1)} forgets to halve (2); ${fx(-296.8 - g / 2, 1)} reverses it by mistake.`,
    h: H('How many moles of SO₃ does the target make?', 'Halve equation (2), ΔH included.', `−296.8 + (${fx(g / 2, 1)}).`) });
}
{ // Hess NO2 two-step add
  add({ L: 9, t: 2, tag: 'Calculation', k: 'mcq',
    q: 'Find ΔH for N₂(g) + 2O₂(g) → 2NO₂(g), given: (1) N₂(g) + O₂(g) → 2NO(g), ΔH = +180.6 kJ; (2) 2NO(g) + O₂(g) → 2NO₂(g), ΔH = −114.2 kJ.',
    c: ['+66.4 kJ', '+294.8 kJ', '−66.4 kJ', '−294.8 kJ', '+33.2 kJ'],
    why: 'Nothing needs flipping or scaling: adding (1) and (2) cancels 2NO and gives exactly the target. ΔH = +180.6 + (−114.2) = +66.4 kJ. +294.8 subtracts (2) instead of adding it; +33.2 kJ would be per mole of NO₂ (half the target).',
    h: H('Add the equations as written - does 2NO cancel?', 'If the equations add straight to the target, so do the ΔH values.', '180.6 + (−114.2).') });
}
{ // Hess three-step ethane
  const dH = 2 * -393.5 + 3 * -285.8 + 1559.8;
  add({ L: 9, t: 4, tag: 'Exam', k: 'mcq',
    q: 'Find ΔH for 2C(graphite) + 3H₂(g) → C₂H₆(g), given: (1) C₂H₆(g) + 7/2 O₂(g) → 2CO₂(g) + 3H₂O(l), ΔH = −1559.8 kJ; (2) C(graphite) + O₂(g) → CO₂(g), ΔH = −393.5 kJ; (3) H₂(g) + ½O₂(g) → H₂O(l), ΔH = −285.8 kJ.',
    c: [fx(dH, 1) + ' kJ', px(-dH, 1) + ' kJ', fx(2 * -393.5 + 3 * -285.8 - 1559.8, 1) + ' kJ', px(-393.5 - 285.8 + 1559.8, 1) + ' kJ', px(2 * -393.5 - 285.8 + 1559.8, 1) + ' kJ'],
    why: `Reverse (1): +1559.8. Double (2): 2 × −393.5 = −787.0. Triple (3): 3 × −285.8 = −857.4. Check: 2CO₂, 3H₂O and 7/2 O₂ (2 + 3/2) all cancel. ΔH = 1559.8 − 787.0 − 857.4 = ${fx(dH, 1)} kJ. ${fx(2 * -393.5 + 3 * -285.8 - 1559.8, 1)} never reverses (1); ${px(-393.5 - 285.8 + 1559.8, 1)} forgets both multipliers; ${px(2 * -393.5 - 285.8 + 1559.8, 1)} forgets to triple (3).`,
    h: H('Same plan as the acetylene worksheet problem.', 'Reverse (1); ×2 on (2); ×3 on (3).', '1559.8 + 2(−393.5) + 3(−285.8).') });
}
{ // Hess num: propane formation (ties to worksheet Q6)
  const dH = 3 * -393.5 + 4 * -285.8 + 2219.9;
  add({ L: 9, t: 4, tag: 'Exam', k: 'num',
    q: 'Find ΔH for 3C(graphite) + 4H₂(g) → C₃H₈(g), given: C₃H₈(g) + 5O₂(g) → 3CO₂(g) + 4H₂O(l), ΔH = −2219.9 kJ; C(graphite) + O₂(g) → CO₂(g), ΔH = −393.5 kJ; H₂(g) + ½O₂(g) → H₂O(l), ΔH = −285.8 kJ. Include the sign. (Enter a number in kJ.)',
    c: [fx(dH, 1) + ' kJ'], ans: Number(dH.toFixed(1)),
    why: `Reverse the propane combustion (+2219.9), multiply the carbon equation by 3 (−1180.5) and the hydrogen equation by 4 (−1143.2). O₂: 3 + 2 = 5 on the left cancels the 5 O₂ on the right. ΔH = 2219.9 − 1180.5 − 1143.2 = ${fx(dH, 1)} kJ - the ΔH°f of propane used in the worksheet.`,
    h: H('C₃H₈ must be a product.', 'Reverse the combustion; ×3 on C; ×4 on H₂.', '2219.9 + 3(−393.5) + 4(−285.8).'), opts: { abs: 0.15 } });
}
{ // Hess: water liquid from gas + vap
  add({ L: 9, t: 3, tag: 'Calculation', k: 'mcq',
    q: 'Find ΔH for H₂(g) + ½O₂(g) → H₂O(l), given: (1) 2H₂(g) + O₂(g) → 2H₂O(g), ΔH = −483.6 kJ; (2) H₂O(l) → H₂O(g), ΔH = +44.0 kJ.',
    c: [fx(-483.6 / 2 - 44.0, 1) + ' kJ', fx(-483.6 / 2 + 44.0, 1) + ' kJ', fx(-483.6 - 44.0, 1) + ' kJ', fx(-483.6 + 44.0, 1) + ' kJ', px(483.6 / 2 + 44.0, 1) + ' kJ'],
    why: `Halve (1): H₂ + ½O₂ → H₂O(g), ΔH = −241.8 kJ. Reverse (2): H₂O(g) → H₂O(l), ΔH = −44.0 kJ. Add: H₂O(g) cancels. ΔH = −241.8 − 44.0 = ${fx(-241.8 - 44.0, 1)} kJ (the ΔH°f of liquid water). ${fx(-483.6 / 2 + 44.0, 1)} forgets to reverse (2); ${fx(-483.6 - 44.0, 1)} forgets to halve (1).`,
    h: H('The target makes 1 mol of LIQUID water.', 'Halve (1) and reverse (2).', '−241.8 + (−44.0).') });
}
{ // Hess: CO + 2H2 -> CH3OH
  const comb = Hf.CO2 + 2 * Hf.H2Ol - Hf.CH3OH, dH = -283.0 + 2 * -285.8 - comb;
  near(dH, Hf.CH3OH - Hf.CO, 0.05);
  add({ L: 9, t: 4, tag: 'Exam', k: 'mcq',
    q: `Find ΔH for CO(g) + 2H₂(g) → CH₃OH(l), given: (1) CO(g) + ½O₂(g) → CO₂(g), ΔH = −283.0 kJ; (2) H₂(g) + ½O₂(g) → H₂O(l), ΔH = −285.8 kJ; (3) CH₃OH(l) + 3/2 O₂(g) → CO₂(g) + 2H₂O(l), ΔH = ${fx(comb, 1)} kJ.`,
    c: [fx(dH, 1) + ' kJ', px(-dH, 1) + ' kJ', px(-283.0 - 285.8 - comb, 1) + ' kJ', fx(-283.0 + 2 * -285.8 + comb, 1) + ' kJ', fx(-283.0 + 2 * -285.8, 1) + ' kJ'],
    why: `Keep (1): −283.0. Double (2): −571.6. Reverse (3): +${fx(-comb, 1)}. O₂ check: ½ + 1 = 3/2 on the left cancels 3/2 on the right; CO₂ and 2H₂O cancel. ΔH = −283.0 − 571.6 + ${fx(-comb, 1)} = ${fx(dH, 1)} kJ. (Check with Table 6.3: −238.6 − (−110.5) = −128.1 kJ.) ${px(-283.0 - 285.8 - comb, 1)} forgets to double (2); ${fx(-283.0 + 2 * -285.8 + comb, 1)} forgets to reverse (3).`,
    h: H('Which given equation contains CH₃OH, and on which side?', 'Keep (1), ×2 on (2), reverse (3).', `−283.0 + 2(−285.8) + ${fx(-comb, 1)}.`) });
}
{ // Hess PCl3 + Cl2 -> PCl5
  const dH = (-1774 + 1280) / 4;
  add({ L: 9, t: 3, tag: 'Calculation', k: 'mcq',
    q: 'Find ΔH for PCl₃(l) + Cl₂(g) → PCl₅(s), given: (1) P₄(s) + 6Cl₂(g) → 4PCl₃(l), ΔH = −1280 kJ; (2) P₄(s) + 10Cl₂(g) → 4PCl₅(s), ΔH = −1774 kJ.',
    c: [fx(dH, 1) + ' kJ', fx(-1774 + 1280, 0) + ' kJ', px(-dH, 1) + ' kJ', fx((-1774 - 1280) / 4, 1) + ' kJ', px(1774 - 1280, 0) + ' kJ'],
    why: `Reverse (1): 4PCl₃ → P₄ + 6Cl₂, +1280 kJ. Add (2): P₄ + 10Cl₂ → 4PCl₅, −1774 kJ. Net: 4PCl₃ + 4Cl₂ → 4PCl₅, ΔH = +1280 − 1774 = −494 kJ. The target is one quarter of that: −494 ÷ 4 = ${fx(dH, 1)} kJ. −494 kJ forgets to divide by 4; ${fx((-1774 - 1280) / 4, 1)} forgets to reverse (1).`,
    h: H('PCl₃ is a reactant in the target but a product in (1).', 'Reverse (1), add (2), then scale to 1 mol PCl₅.', '(1280 − 1774) ÷ 4.') });
}
{ // sublimation via Hess
  add({ L: 9, t: 3, tag: 'Calculation', k: 'mcq',
    q: 'At 0 °C, ΔH(fus) of ice is 6.01 kJ/mol and ΔH(vap) of water is 45.05 kJ/mol. What is ΔH for the sublimation H₂O(s) → H₂O(g) at 0 °C?',
    c: ['+51.06 kJ/mol', '+39.04 kJ/mol', '−51.06 kJ/mol', '+45.05 kJ/mol', '+6.01 kJ/mol'],
    why: 'Hess’s law with phases: H₂O(s) → H₂O(l), +6.01; H₂O(l) → H₂O(g), +45.05. Adding cancels H₂O(l): H₂O(s) → H₂O(g), ΔH = 6.01 + 45.05 = +51.06 kJ/mol. Both steps absorb heat, so the total is larger than either and positive.',
    h: H('Get from solid to gas through the liquid.', 'Add the two steps.', '6.01 + 45.05.') });
}

add({ L: 9, t: 1, tag: 'Concept', k: 'mcq',
  q: 'What does the standard enthalpy of formation, ΔH°f, of a compound describe?',
  c: ['The enthalpy change when ONE mole of the compound forms from its elements in their standard states',
      'The enthalpy change when the compound forms from its gaseous atoms',
      'The enthalpy change when one mole of the compound burns in oxygen',
      'The enthalpy change when one gram of the compound forms from its elements',
      'The total enthalpy contained in one mole of the compound'],
  why: 'ΔH°f: 1 mol of compound, made from its ELEMENTS in their STANDARD STATES (most stable form at 1 atm and the stated temperature, usually 298 K). Not from atoms, not per gram, not combustion. Absolute enthalpies cannot be measured - ΔH°f is measured relative to the elements, which are set to zero.',
  h: H('Three key words: one mole, elements, standard states.', 'The starting materials are elements, not atoms or other compounds.', 'Exactly 1 mol of product.') });
add({ L: 9, t: 2, tag: 'Concept', k: 'mcq',
  q: 'Which equation’s ΔH is the standard enthalpy of formation of liquid water?',
  c: ['H₂(g) + ½O₂(g) → H₂O(l)', '2H₂(g) + O₂(g) → 2H₂O(l)', 'H₂(g) + ½O₂(g) → H₂O(g)', '2H(g) + O(g) → H₂O(l)', 'H₂(g) + O(g) → H₂O(l)'],
  why: 'A formation equation makes exactly 1 mol of the compound, in the phase named, from elements in their standard states: H₂(g) and O₂(g). Fractional coefficients are fine (½O₂). 2H₂ + O₂ makes 2 mol (its ΔH is 2ΔH°f); H₂O(g) is the wrong phase; H(g) and O(g) atoms are not the standard states of hydrogen and oxygen.',
  h: H('How many moles of H₂O must form?', 'Hydrogen and oxygen are diatomic gases in their standard states.', 'Check the phase of the water too.') });
add({ L: 9, t: 2, tag: 'Concept', k: 'mcq',
  q: 'Which equation represents the standard enthalpy of formation of ammonia gas?',
  c: ['½N₂(g) + 3/2 H₂(g) → NH₃(g)', 'N₂(g) + 3H₂(g) → 2NH₃(g)', 'N(g) + 3H(g) → NH₃(g)', 'NH₃(g) → ½N₂(g) + 3/2 H₂(g)', '½N₂(g) + 3H(g) → NH₃(g)'],
  why: 'Exactly 1 mol of NH₃(g), from N₂(g) and H₂(g), the standard-state forms. That forces fractional coefficients: ½N₂ + 3/2 H₂. N₂ + 3H₂ → 2NH₃ makes 2 mol; atoms are not standard states; the reverse equation is decomposition (its ΔH = −ΔH°f).',
  h: H('One mole of product only.', 'Use N₂(g) and H₂(g), even if that needs fractions.', '½ N₂ and 3/2 H₂.') });
add({ L: 9, t: 2, tag: 'Concept', k: 'mcq',
  q: 'Which equation represents the standard enthalpy of formation of methanol, CH₃OH(l)?',
  c: ['C(graphite) + 2H₂(g) + ½O₂(g) → CH₃OH(l)', 'C(diamond) + 2H₂(g) + ½O₂(g) → CH₃OH(l)', 'C(graphite) + 4H(g) + O(g) → CH₃OH(l)',
      '2C(graphite) + 4H₂(g) + O₂(g) → 2CH₃OH(l)', 'CO(g) + 2H₂(g) → CH₃OH(l)'],
  why: 'Elements in their standard states: carbon as GRAPHITE (diamond is not the standard state; its ΔH°f = 1.9 kJ/mol), H₂(g) and O₂(g). Exactly 1 mol of CH₃OH(l). CO + 2H₂ → CH₃OH is a real reaction, but CO is a compound, not an element.',
  h: H('What is the standard state of carbon?', 'Every reactant must be an element in its standard state.', '1 mol CH₃OH from C(graphite), H₂ and ½O₂.') });
add({ L: 9, t: 2, tag: 'Lecture', k: 'mcq',
  q: 'The lecture writes the formation reaction of table salt with ΔH = ΔH(f) = −411.1 kJ. Which equation is it?',
  c: ['Na(s) + ½Cl₂(g) → NaCl(s)', '2Na(s) + Cl₂(g) → 2NaCl(s)', 'Na⁺(aq) + Cl⁻(aq) → NaCl(s)', 'Na(g) + Cl(g) → NaCl(s)', 'Na(s) + Cl(g) → NaCl(s)'],
  why: 'One mole of NaCl(s) from sodium metal (Na(s)) and chlorine gas (Cl₂(g)), the standard states: Na(s) + ½Cl₂(g) → NaCl(s). 2Na + Cl₂ would have ΔH = −822.2 kJ; ions and gaseous atoms are not elements in their standard states.',
  h: H('Standard state of sodium? Of chlorine?', 'Exactly 1 mol of NaCl.', 'Cl₂ with a ½ coefficient.') });
add({ L: 9, t: 1, tag: 'Concept', k: 'mcq',
  q: 'Which statement about formation equations is FALSE?',
  c: ['Fractional coefficients are not allowed in a formation equation', 'The product coefficient must be 1',
      'Every reactant must be an element in its standard state', 'ΔH°f of an element in its standard state is zero',
      'The ΔH°f of a compound can be positive'],
  why: 'Fractional coefficients are REQUIRED when making exactly 1 mol of product needs them (H₂ + ½O₂ → H₂O). The other statements are true; ΔH°f can be positive (NO 90.3, O₃ 143, HCN 135 kJ/mol in the course table).',
  h: H('Recall the formation equation of water.', 'How do you make exactly one mole of H₂O from O₂?', 'Look for the statement that bans ½.') });
add({ L: 9, t: 2, tag: 'Concept', k: 'mcq',
  q: 'Which substance has ΔH°f = 0 at 298 K?',
  c: ['Br₂(l)', 'Br₂(g)', 'O₃(g)', 'C(diamond)', 'Cl(g)'],
  why: 'ΔH°f = 0 only for an element in its STANDARD STATE (most stable form at 1 atm, 298 K). Bromine is a liquid at room temperature, so Br₂(l) is zero; Br₂(g) is not. O₂ (not O₃), graphite (not diamond, 1.9) and Cl₂(g) (not Cl atoms, 121.0) are the standard forms.',
  h: H('It must be an element AND in its most stable form at 25 °C.', 'What phase is bromine at room temperature?', 'Liquid bromine.') });
add({ L: 9, t: 2, tag: 'Concept', k: 'mcq',
  q: 'Which substance has a NONZERO standard enthalpy of formation?',
  c: ['O₃(g)', 'O₂(g)', 'C(graphite)', 'Hg(l)', 'Na(s)'],
  why: 'O₂(g) is oxygen’s standard state; ozone, O₃(g), is a less stable form, ΔH°f = +143 kJ/mol. Graphite, liquid mercury and solid sodium are each their element’s standard state, so they are all zero.',
  h: H('Which is an element NOT in its most stable form?', 'Oxygen’s standard state is diatomic.', 'Ozone, O₃ - not the diatomic form.') });
add({ L: 9, t: 3, tag: 'Trap', k: 'mcq', ordered: true, ans: 2,
  q: 'How many of these have ΔH°f = 0 at 298 K: O₂(g), O₃(g), C(graphite), C(diamond), Br₂(l), Br₂(g), Hg(l), Cl(g)?',
  c: ['2', '3', '4', '5', '6'],
  why: 'Zero only for the standard state of each element: O₂(g) yes, O₃(g) no (143); C(graphite) yes, C(diamond) no (1.9); Br₂(l) yes, Br₂(g) no; Hg(l) yes (mercury is a liquid at 25 °C); Cl(g) no (121.0 - chlorine’s standard state is Cl₂(g)). That is 4: O₂, graphite, Br₂(l), Hg(l).',
  h: H('Go through them one element at a time.', 'Ask: is this the most stable form of the element at 25 °C, 1 atm?', 'One per element passes: O₂, graphite, Br₂(l), Hg(l).') });
add({ L: 9, t: 2, tag: 'Concept', k: 'mcq',
  q: 'C(diamond) has ΔH°f = +1.9 kJ/mol. Which statement is TRUE?',
  c: ['C(diamond) → C(graphite) has ΔH = −1.9 kJ, so graphite is lower in enthalpy',
      'C(diamond) → C(graphite) has ΔH = +1.9 kJ',
      'Diamond is the standard state of carbon',
      'Graphite has ΔH°f = −1.9 kJ/mol',
      'Diamond and graphite have the same enthalpy because both are pure carbon'],
  why: 'ΔH°f(diamond) = +1.9 means C(graphite) → C(diamond), ΔH = +1.9 kJ: diamond sits 1.9 kJ/mol ABOVE graphite. Reverse it and ΔH = −1.9 kJ. Graphite is the standard state, so its ΔH°f is exactly 0, not −1.9.',
  h: H('Write the formation equation of diamond.', 'Its reactant is graphite (the standard state).', 'Reverse it to go from diamond to graphite.') });
{ // Cl2 -> 2Cl
  add({ L: 9, t: 2, tag: 'Trap', k: 'mcq',
    q: 'Cl(g) has ΔH°f = 121.0 kJ/mol. What is ΔH for Cl₂(g) → 2Cl(g)?',
    c: ['+242.0 kJ', '+121.0 kJ', '−242.0 kJ', '0 kJ, because chlorine is an element', '+60.5 kJ'],
    why: 'ΔH = Σ n ΔH°f(products) − Σ m ΔH°f(reactants) = 2(121.0) − 0 = +242.0 kJ. Cl₂(g) is the standard state (zero); Cl(g) atoms are not, so they carry 121.0 kJ/mol each - and there are TWO of them. Breaking the Cl−Cl bond absorbs energy.',
    h: H('Which of the two species has ΔH°f = 0?', 'Products minus reactants, with coefficients.', '2 × 121.0 − 0.') });
}
add({ L: 9, t: 2, tag: 'Concept', k: 'mcq',
  q: 'In ΔH°rxn = Σ n ΔH°f(products) − Σ m ΔH°f(reactants), why are the reactants’ values SUBTRACTED?',
  c: ['Hess’s law: imagine the reactants decomposing into their elements (the reverse of formation, so −ΔH°f), then the elements forming the products (+ΔH°f)',
      'Because reactants always have positive ΔH°f values',
      'Because the reactants absorb heat and the products release it',
      'Because ΔH°f values of reactants are measured at a different temperature',
      'It is only a convention; adding them would give the same answer'],
  why: 'This is the course’s “decompose the reactants, form the products” picture. Step 1: reactants → elements, which is each reactant’s formation reversed, so its ΔH is −ΔH°f (times its coefficient). Step 2: elements → products, ΔH = +ΔH°f for each product. By Hess’s law ΔH°rxn is the sum: Σ n ΔH°f(products) − Σ m ΔH°f(reactants).',
  h: H('Think of a two-step route through the elements.', 'Turning a compound back into elements is its formation reaction reversed.', 'Reversing a reaction flips the sign of its ΔH.') });

{ // slide example 1
  const dH = 2 * Hf.CO2 - 2 * Hf.CO;
  add({ L: 9, t: 2, tag: 'Lecture', k: 'mcq',
    q: 'Using tabulated enthalpies of formation, predict ΔH° for 2CO(g) + O₂(g) → 2CO₂(g). (ΔH°f: CO(g) −110.5 kJ/mol, CO₂(g) −393.5 kJ/mol)',
    c: [fx(dH, 1) + ' kJ', fx(dH / 2, 1) + ' kJ', px(-dH, 1) + ' kJ', fx(2 * Hf.CO2 - Hf.CO, 1) + ' kJ', fx(2 * Hf.CO2 + 2 * Hf.CO, 1) + ' kJ'],
    why: `ΔH° = Σ n ΔH°f(products) − Σ m ΔH°f(reactants) = 2(−393.5) − [2(−110.5) + 1(0)] = −787.0 + 221.0 = ${fx(dH, 1)} kJ. O₂ is an element in its standard state (0). ${fx(dH / 2, 1)} ignores the coefficients (that is per mole of CO); ${px(-dH, 1)} is reactants − products; ${fx(2 * Hf.CO2 - Hf.CO, 1)} doubles only CO₂; ${fx(2 * Hf.CO2 + 2 * Hf.CO, 1)} adds the reactants instead of subtracting.`,
    h: H('Products minus reactants, each times its coefficient.', 'ΔH°f(O₂) = 0.', '2(−393.5) − 2(−110.5).') });
}
{ // slide example 2
  const dH = 4 * Hf.NO + 6 * Hf.H2Og - 4 * Hf.NH3, liq = 4 * Hf.NO + 6 * Hf.H2Ol - 4 * Hf.NH3;
  add({ L: 9, t: 3, tag: 'Lecture', k: 'mcq',
    q: 'Predict ΔH° for 4NH₃(g) + 5O₂(g) → 4NO(g) + 6H₂O(g). (ΔH°f in kJ/mol: NH₃(g) −45.9, NO(g) 90.3, H₂O(g) −241.8, H₂O(l) −285.8)',
    c: [fx(dH, 1) + ' kJ', fx(liq, 1) + ' kJ', px(-dH, 1) + ' kJ', fx(4 * Hf.NO + 6 * Hf.H2Og, 1) + ' kJ', fx(Hf.NO + Hf.H2Og - Hf.NH3, 1) + ' kJ'],
    why: `Products: 4(90.3) + 6(−241.8) = 361.2 − 1450.8 = −1089.6 kJ. Reactants: 4(−45.9) + 5(0) = −183.6 kJ. ΔH° = −1089.6 − (−183.6) = ${fx(dH, 1)} kJ. The water here is a GAS - using H₂O(l) gives ${fx(liq, 1)} kJ. ${fx(4 * Hf.NO + 6 * Hf.H2Og, 1)} forgets to subtract the reactants; ${fx(Hf.NO + Hf.H2Og - Hf.NH3, 1)} ignores every coefficient.`,
    h: H('Check the phase of the water before you pick its ΔH°f.', 'Products: 4(90.3) + 6(−241.8). Reactants: 4(−45.9) + 0.', 'Products − reactants.') });
}
{ // Worksheet Q6 exactly: propane
  const dH = 3 * Hf.CO2 + 4 * Hf.H2Ol - Hf.C3H8;
  add({ L: 9, t: 3, tag: 'Worksheet', k: 'mcq',
    q: 'Calculate ΔH°comb for 1.00 mol of propane: C₃H₈(g) + 5O₂(g) → 3CO₂(g) + 4H₂O(l). (ΔH°f in kJ/mol: C₃H₈(g) −103.8, CO₂(g) −393.5, H₂O(l) −285.8)',
    c: [fx(dH, 1) + ' kJ', fx(3 * Hf.CO2 + 4 * Hf.H2Og - Hf.C3H8, 1) + ' kJ', fx(3 * Hf.CO2 + 4 * Hf.H2Ol + Hf.C3H8, 1) + ' kJ', fx(Hf.CO2 + Hf.H2Ol - Hf.C3H8, 1) + ' kJ', px(-dH, 1) + ' kJ'],
    why: `Products: 3(−393.5) + 4(−285.8) = −1180.5 − 1143.2 = −2323.7 kJ. Reactants: −103.8 + 5(0) = −103.8 kJ. ΔH° = −2323.7 − (−103.8) = ${fx(dH, 1)} kJ. ${fx(3 * Hf.CO2 + 4 * Hf.H2Og - Hf.C3H8, 1)} uses H₂O(g) (−241.8); ${fx(3 * Hf.CO2 + 4 * Hf.H2Ol + Hf.C3H8, 1)} adds propane instead of subtracting it; ${fx(Hf.CO2 + Hf.H2Ol - Hf.C3H8, 1)} forgets the coefficients 3 and 4.`,
    h: H('ΔH°f(O₂) = 0.', 'Products: 3(−393.5) + 4(−285.8).', 'Subtract the propane: −2323.7 − (−103.8).') });
}
{ // Worksheet Q6 variation num: methane
  const dH = Hf.CO2 + 2 * Hf.H2Ol - Hf.CH4;
  add({ L: 9, t: 3, tag: 'Worksheet', k: 'num',
    q: 'Calculate ΔH° for CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l). (ΔH°f in kJ/mol: CH₄(g) −74.9, CO₂(g) −393.5, H₂O(l) −285.8.) Include the sign. (Enter a number in kJ.)',
    c: [fx(dH, 1) + ' kJ'], ans: Number(dH.toFixed(1)),
    why: `Products: −393.5 + 2(−285.8) = −965.1 kJ. Reactants: −74.9 + 2(0) = −74.9 kJ. ΔH° = −965.1 − (−74.9) = ${fx(dH, 1)} kJ (the lecture’s −891 kJ/mol, within rounding).`,
    h: H('Products minus reactants.', 'Products: −393.5 + 2(−285.8).', '−965.1 + 74.9.'), opts: { abs: 0.15 } });
}
{ // CaCO3 decomposition
  const dH = Hf.CaO + Hf.CO2 - Hf.CaCO3;
  add({ L: 9, t: 2, tag: 'Calculation', k: 'mcq',
    q: 'Calculate ΔH° for CaCO₃(s) → CaO(s) + CO₂(g). (ΔH°f in kJ/mol: CaCO₃(s) −1206.9, CaO(s) −635.1, CO₂(g) −393.5)',
    c: [px(dH, 1) + ' kJ', fx(-dH, 1) + ' kJ', fx(Hf.CaO + Hf.CO2 + Hf.CaCO3, 1) + ' kJ', px(Hf.CaO - Hf.CaCO3, 1) + ' kJ', px(Hf.CO2 - Hf.CaCO3, 1) + ' kJ'],
    why: `ΔH° = [(−635.1) + (−393.5)] − (−1206.9) = −1028.6 + 1206.9 = ${px(dH, 1)} kJ. Positive: decomposing limestone is endothermic (lime kilns need constant heating). ${fx(-dH, 1)} is reactants − products; the last two each leave out one product.`,
    h: H('Two products, one reactant.', 'Products: −635.1 + (−393.5).', '−1028.6 − (−1206.9).') });
}
{ // num CS2 combustion
  const dH = Hf.CO2 + 2 * Hf.SO2 - Hf.CS2;
  add({ L: 9, t: 3, tag: 'Calculation', k: 'num',
    q: 'Calculate ΔH° for CS₂(l) + 3O₂(g) → CO₂(g) + 2SO₂(g). (ΔH°f in kJ/mol: CS₂(l) 87.9, CO₂(g) −393.5, SO₂(g) −296.8.) Include the sign. (Enter a number in kJ.)',
    c: [fx(dH, 1) + ' kJ'], ans: Number(dH.toFixed(1)),
    why: `Products: −393.5 + 2(−296.8) = −987.1 kJ. Reactants: 87.9 + 3(0) = 87.9 kJ. ΔH° = −987.1 − 87.9 = ${fx(dH, 1)} kJ. Note CS₂ has a POSITIVE ΔH°f, so subtracting it makes the answer more negative.`,
    h: H('ΔH°f(O₂) = 0.', 'Products: −393.5 + 2(−296.8).', 'Subtract +87.9.'), opts: { abs: 0.15 } });
}
{ // methanol combustion as written (2 mol)
  const dH = 2 * Hf.CO2 + 4 * Hf.H2Ol - 2 * Hf.CH3OH;
  add({ L: 9, t: 4, tag: 'Trap', k: 'mcq',
    q: 'Calculate ΔH° for 2CH₃OH(l) + 3O₂(g) → 2CO₂(g) + 4H₂O(l). (ΔH°f in kJ/mol: CH₃OH(l) −238.6, CO₂(g) −393.5, H₂O(l) −285.8, H₂O(g) −241.8)',
    c: [fx(dH, 1) + ' kJ', fx(dH / 2, 1) + ' kJ', fx(2 * Hf.CO2 + 4 * Hf.H2Og - 2 * Hf.CH3OH, 1) + ' kJ', fx(2 * Hf.CO2 + 4 * Hf.H2Ol + 2 * Hf.CH3OH, 1) + ' kJ', px(-dH, 1) + ' kJ'],
    why: `Products: 2(−393.5) + 4(−285.8) = −787.0 − 1143.2 = −1930.2 kJ. Reactants: 2(−238.6) = −477.2 kJ. ΔH° = −1930.2 − (−477.2) = ${fx(dH, 1)} kJ for the equation AS WRITTEN (2 mol methanol). ${fx(dH / 2, 1)} kJ is per mole of methanol - right number, wrong question. ${fx(2 * Hf.CO2 + 4 * Hf.H2Og - 2 * Hf.CH3OH, 1)} uses H₂O(g).`,
    h: H('The question is for the equation as written.', 'Products: 2(−393.5) + 4(−285.8); reactants: 2(−238.6).', '−1930.2 + 477.2.') });
}
{ // HCl formation x2
  add({ L: 9, t: 2, tag: 'Calculation', k: 'mcq',
    q: 'Calculate ΔH° for H₂(g) + Cl₂(g) → 2HCl(g). (ΔH°f of HCl(g) = −92.3 kJ/mol)',
    c: ['−184.6 kJ', '−92.3 kJ', '+184.6 kJ', '+92.3 kJ', '0 kJ'],
    why: 'H₂ and Cl₂ are elements in their standard states (0). ΔH° = 2(−92.3) − (0 + 0) = −184.6 kJ. The equation makes 2 mol HCl, so it is twice ΔH°f (which is defined for 1 mol).',
    h: H('What are ΔH°f of H₂ and Cl₂?', 'Count the moles of HCl formed.', '2 × (−92.3).') });
}
{ // thermite from formation data
  const dH = -1675.7 - -824.2;
  add({ L: 9, t: 3, tag: 'Calculation', k: 'mcq',
    q: 'Use ΔH°f values to calculate ΔH° for the thermite reaction 2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(s). (ΔH°f in kJ/mol: Al₂O₃(s) −1675.7, Fe₂O₃(s) −824.2)',
    c: [fx(dH, 1) + ' kJ', px(-dH, 1) + ' kJ', fx(-1675.7 - 824.2, 1) + ' kJ', '−1675.7 kJ', fx(2 * -1675.7 + 824.2, 1) + ' kJ'],
    why: `Al and Fe are elements (0). ΔH° = (−1675.7 + 0) − (0 + (−824.2)) = −1675.7 + 824.2 = ${fx(dH, 1)} kJ - the lecture’s −851 kJ. ${fx(-1675.7 - 824.2, 1)} adds the reactant instead of subtracting; −1675.7 kJ ignores the Fe₂O₃; ${fx(2 * -1675.7 + 824.2, 1)} puts the coefficient 2 on the wrong substance.`,
    h: H('Which four substances have ΔH°f = 0?', 'Only Al₂O₃ and Fe₂O₃ count.', '−1675.7 − (−824.2).') });
}
{ // SO2 -> SO3
  const dH = 2 * Hf.SO3 - 2 * Hf.SO2;
  add({ L: 9, t: 2, tag: 'Calculation', k: 'mcq',
    q: 'Calculate ΔH° for 2SO₂(g) + O₂(g) → 2SO₃(g). (ΔH°f in kJ/mol: SO₂(g) −296.8, SO₃(g) −396.0)',
    c: [fx(dH, 1) + ' kJ', fx(dH / 2, 1) + ' kJ', px(-dH, 1) + ' kJ', fx(2 * Hf.SO3 + 2 * Hf.SO2, 1) + ' kJ', fx(Hf.SO3 + Hf.SO2, 1) + ' kJ'],
    why: `ΔH° = 2(−396.0) − [2(−296.8) + 0] = −792.0 + 593.6 = ${fx(dH, 1)} kJ. ${fx(dH / 2, 1)} ignores the coefficients; ${fx(2 * Hf.SO3 + 2 * Hf.SO2, 1)} adds the reactants.`,
    h: H('Products minus reactants.', 'O₂ contributes 0.', '2(−396.0) − 2(−296.8).') });
}
{ // HCN from CH4 + NH3
  const dH = Hf.HCN - Hf.CH4 - Hf.NH3;
  add({ L: 9, t: 3, tag: 'Calculation', k: 'mcq',
    q: 'Calculate ΔH° for CH₄(g) + NH₃(g) → HCN(g) + 3H₂(g). (ΔH°f in kJ/mol: CH₄(g) −74.9, NH₃(g) −45.9, HCN(g) 135)',
    c: [px(dH, 1) + ' kJ', px(Hf.HCN + Hf.CH4 + Hf.NH3, 1) + ' kJ', fx(-dH, 1) + ' kJ', '+135.0 kJ', px(Hf.HCN - Hf.CH4, 1) + ' kJ'],
    why: `H₂(g) is an element (0). ΔH° = [135 + 3(0)] − [(−74.9) + (−45.9)] = 135 + 120.8 = ${px(dH, 1)} kJ: strongly endothermic. ${px(Hf.HCN + Hf.CH4 + Hf.NH3, 1)} adds the reactants instead of subtracting them; ${px(Hf.HCN - Hf.CH4, 1)} forgets NH₃.`,
    h: H('H₂ has ΔH°f = 0.', 'Subtracting a negative number adds.', '135 − (−74.9 − 45.9).') });
}
{ // num: 3O2 -> 2O3
  add({ L: 9, t: 2, tag: 'Calculation', k: 'num',
    q: 'Using ΔH°f(O₃(g)) = 143 kJ/mol, what is ΔH° for 3O₂(g) → 2O₃(g)? Include the sign. (Enter a number in kJ.)',
    c: ['+286 kJ'], ans: 286,
    why: 'ΔH° = 2(143) − 3(0) = +286 kJ. O₂ is the standard state (0); each mole of ozone is 143 kJ higher. Making ozone is endothermic, which is why it needs lightning or UV light.',
    h: H('ΔH°f(O₂) = 0.', 'Two moles of O₃ form.', '2 × 143.'), opts: { tol: 0.005 } });
}
{ // num 4NH3 + 3O2 -> 2N2 + 6H2O(g)
  const dH = 6 * Hf.H2Og - 4 * Hf.NH3;
  add({ L: 9, t: 3, tag: 'Calculation', k: 'num',
    q: 'Calculate ΔH° for 4NH₃(g) + 3O₂(g) → 2N₂(g) + 6H₂O(g). (ΔH°f in kJ/mol: NH₃(g) −45.9, H₂O(g) −241.8.) Include the sign. (Enter a number in kJ.)',
    c: [fx(dH, 1) + ' kJ'], ans: Number(dH.toFixed(1)),
    why: `N₂ and O₂ are elements (0). ΔH° = 6(−241.8) − 4(−45.9) = −1450.8 + 183.6 = ${fx(dH, 1)} kJ.`,
    h: H('Which species are elements in their standard states?', 'Products: 6(−241.8); reactants: 4(−45.9).', '−1450.8 + 183.6.'), opts: { abs: 0.15 } });
}
add({ L: 9, t: 2, tag: 'Concept', k: 'mcq',
  q: 'Without calculating, how does ΔH° for CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l) compare with ΔH° for the same reaction producing 2H₂O(g)? (ΔH°f: H₂O(l) −285.8, H₂O(g) −241.8 kJ/mol)',
  c: ['The liquid-water reaction is more negative by 88.0 kJ', 'The liquid-water reaction is more negative by 44.0 kJ',
      'The gas-water reaction is more negative by 88.0 kJ', 'They are equal, because the same elements are involved',
      'The liquid-water reaction is less negative by 88.0 kJ'],
  why: 'The only difference is the phase of 2 mol of water. Each mole of H₂O(l) is 285.8 − 241.8 = 44.0 kJ lower than H₂O(g), and there are 2 mol: the liquid version releases 2 × 44.0 = 88.0 kJ MORE (condensation releases heat). Using the wrong phase on an exam shifts the answer by exactly this kind of amount.',
  h: H('Which phase of water is lower in enthalpy?', 'Difference per mole: −285.8 − (−241.8).', 'Multiply by 2 mol of water.') });
{ // 2H2 + O2 -> 2H2O(l)
  add({ L: 9, t: 2, tag: 'Calculation', k: 'mcq',
    q: 'Using ΔH°f(H₂O(l)) = −285.8 kJ/mol, what is ΔH° for 2H₂(g) + O₂(g) → 2H₂O(l)?',
    c: ['−571.6 kJ', '−285.8 kJ', '−483.6 kJ', '+571.6 kJ', '−857.4 kJ'],
    why: 'This is twice the formation reaction of liquid water: ΔH° = 2(−285.8) − 0 = −571.6 kJ. −285.8 is per mole of water; −483.6 kJ would be for 2H₂O(g); −857.4 kJ counts three moles.',
    h: H('H₂ and O₂ are zero.', 'Two moles of liquid water form.', '2 × (−285.8).') });
}

{ // back-solve C2H4
  const x = 2 * Hf.CO2 + 2 * Hf.H2Ol + 1411.1;
  add({ L: 9, t: 4, tag: 'Exam', k: 'mcq',
    q: 'Ethylene burns: C₂H₄(g) + 3O₂(g) → 2CO₂(g) + 2H₂O(l), ΔH° = −1411.1 kJ. Using ΔH°f(CO₂(g)) = −393.5 and ΔH°f(H₂O(l)) = −285.8 kJ/mol, what is ΔH°f of C₂H₄(g)?',
    c: [px(x, 1) + ' kJ/mol', fx(-x, 1) + ' kJ/mol', fx(2 * Hf.CO2 + 2 * Hf.H2Ol - 1411.1, 1) + ' kJ/mol', px(2 * Hf.CO2 + 2 * Hf.H2Og + 1411.1, 1) + ' kJ/mol', px(2 * Hf.CO2 + Hf.H2Ol + 1411.1, 1) + ' kJ/mol'],
    why: `ΔH°rxn = [2(−393.5) + 2(−285.8)] − [x + 3(0)]. −1411.1 = −1358.6 − x, so x = −1358.6 + 1411.1 = ${px(x, 1)} kJ/mol. ${fx(-x, 1)} drops a sign in the rearrangement; ${px(2 * Hf.CO2 + 2 * Hf.H2Og + 1411.1, 1)} uses H₂O(g); ${px(2 * Hf.CO2 + Hf.H2Ol + 1411.1, 1)} forgets the 2 on water.`,
    h: H('Write the products − reactants expression with x for C₂H₄.', 'Products sum to −1358.6 kJ.', '−1411.1 = −1358.6 − x.') });
}
{ // back-solve benzene num
  const x = (12 * Hf.CO2 + 6 * Hf.H2Ol + 6534.6) / 2;
  add({ L: 9, t: 4, tag: 'Exam', k: 'num',
    q: '2C₆H₆(l) + 15O₂(g) → 12CO₂(g) + 6H₂O(l), ΔH° = −6534.6 kJ. Using ΔH°f(CO₂(g)) = −393.5 and ΔH°f(H₂O(l)) = −285.8 kJ/mol, find ΔH°f of C₆H₆(l). Include the sign. (Enter a number in kJ/mol.)',
    c: [px(x, 1) + ' kJ/mol'], ans: Number(x.toFixed(1)),
    why: `Products: 12(−393.5) + 6(−285.8) = −4722.0 − 1714.8 = −6436.8 kJ. −6534.6 = −6436.8 − 2x → 2x = −6436.8 + 6534.6 = 97.8 → x = ${px(x, 1)} kJ/mol. The trap is forgetting that the equation has 2 mol of benzene (that gives 97.8).`,
    h: H('Benzene has a coefficient of 2.', 'Products sum to −6436.8 kJ.', '−6534.6 = −6436.8 − 2x.'), opts: { abs: 0.15 } });
}
{ // back-solve NO2
  const x = (-114.2 + 2 * Hf.NO) / 2;
  add({ L: 9, t: 4, tag: 'Trap', k: 'mcq',
    q: '2NO(g) + O₂(g) → 2NO₂(g), ΔH° = −114.2 kJ. With ΔH°f(NO(g)) = 90.3 kJ/mol, what is ΔH°f of NO₂(g)?',
    c: [px(x, 1) + ' kJ/mol', px(2 * x, 1) + ' kJ/mol', fx(-x, 1) + ' kJ/mol', fx((-114.2 - 2 * Hf.NO) / 2, 1) + ' kJ/mol', fx(-114.2 + Hf.NO, 1) + ' kJ/mol'],
    why: `−114.2 = 2x − [2(90.3) + 0] = 2x − 180.6. 2x = 66.4, x = ${px(x, 1)} kJ/mol. ${px(2 * x, 1)} forgets to divide by the coefficient 2 on NO₂; ${fx((-114.2 - 2 * Hf.NO) / 2, 1)} adds the reactants instead of subtracting; ${fx(-114.2 + Hf.NO, 1)} ignores both coefficients.`,
    h: H('Write ΔH° = 2ΔH°f(NO₂) − 2ΔH°f(NO).', 'Solve: 2x − 180.6 = −114.2.', 'x = 66.4 ÷ 2.') });
}
{ // t4 burn methanol to heat water: ΔH from ΔHf, then calorimetry
  const per = Hf.CO2 + 2 * Hf.H2Ol - Hf.CH3OH, n = 1.00 / M_CH3OH, q = -per * n, dT = q * 1000 / (500.0 * cw);
  const gas = -(Hf.CO2 + 2 * Hf.H2Og - Hf.CH3OH) * n * 1000 / (500.0 * cw);
  add({ L: 9, t: 4, tag: 'Exam', k: 'mcq',
    q: 'CH₃OH(l) + 3/2 O₂(g) → CO₂(g) + 2H₂O(l). Using ΔH°f (kJ/mol): CH₃OH(l) −238.6, CO₂(g) −393.5, H₂O(l) −285.8, find the heat released by burning 1.00 g of methanol (32.04 g/mol). If all of it goes into 500.0 g of water (c = 4.184 J/(g·°C)), by how much does the water’s temperature rise?',
    c: [fx(dT, 1) + ' °C', fx(2 * dT, 1) + ' °C', fx(gas, 2) + ' °C', sci(dT / 1000, 3) + ' °C', fx(-per * 1000 / (500.0 * cw), 0) + ' °C'],
    why: `ΔH°comb = −393.5 + 2(−285.8) − (−238.6) = ${fx(per, 1)} kJ/mol. mol = 1.00 ÷ 32.04 = ${fx(n, 5)} mol, so heat released = ${fx(n, 5)} × ${fx(-per, 1)} = ${fx(q, 2)} kJ. ΔT = ${fx(q * 1000, 0)} J ÷ (500.0 × 4.184) = ${fx(dT, 1)} °C. ${fx(2 * dT, 1)} °C uses the ΔH for 2 mol methanol; ${fx(gas, 2)} °C uses H₂O(g); ${fx(-per * 1000 / (500.0 * cw), 0)} °C treats 1.00 g as 1.00 mol.`,
    h: H('Step 1: ΔH°comb per mole from ΔH°f values.', 'Step 2: scale to 1.00 g (moles). Step 3: ΔT = q/(m·c).', `ΔT = ${fx(q, 2)} kJ ÷ (500.0 g × 4.184 J/(g·°C)), with kJ → J.`) });
}
add({ L: 9, t: 1, tag: 'Concept', k: 'mcq',
  q: 'What is the standard state of an element, as used for ΔH°f values in Table 6.3?',
  c: ['Its most stable form at 1 atm and the stated temperature (298 K in the table)', 'Its gaseous atoms at 298 K and 1 atm',
      'Whatever form it has at 0 °C and 1 atm (STP)', 'Its most stable form at 0 K', 'Its form in a 1 M aqueous solution'],
  why: 'The standard state of an element is its most stable form at 1 atm and the temperature of interest - 298 K for Table 6.3. So carbon is graphite, oxygen is O₂(g), bromine is Br₂(l), mercury is Hg(l), sodium is Na(s). STP (0 °C) is a gas-law reference, not the thermochemical standard; atoms like Cl(g) and H(g) are NOT standard states.',
  h: H('It is a form of the element, not its separate atoms.', 'Think of graphite, O₂(g) and Br₂(l).', 'Most stable form at 1 atm and 298 K.') });
add({ L: 9, t: 3, tag: 'Trap', k: 'mcq',
  q: 'Which statement about ΔH and thermochemical equations is FALSE?',
  c: ['For an exothermic reaction, the products have higher enthalpy than the reactants',
      'Reversing a reaction changes the sign of ΔH but not its size',
      'Doubling all the coefficients doubles ΔH',
      'ΔH°rxn = Σ n ΔH°f(products) − Σ m ΔH°f(reactants)',
      'Hess’s law works because enthalpy is a state function'],
  why: 'Exothermic means heat is released, so the products end LOWER in enthalpy: ΔH = H(products) − H(reactants) < 0. The other four statements are the core rules of the unit (reverse → flip sign, scale → scale ΔH, products minus reactants, state function).',
  h: H('Four of these are rules you use every day in this unit.', 'Think about the enthalpy diagram for an exothermic reaction.', 'Negative ΔH = products below reactants.') });

{ // t4 fuel per gram comparison
  const c1 = Hf.CO2 + 2 * Hf.H2Ol - Hf.CH4, c2 = Hf.CO2 + 2 * Hf.H2Ol - Hf.CH3OH;
  const g1 = -c1 / M_CH4, g2 = -c2 / M_CH3OH;
  const v1 = -(Hf.CO2 + 2 * Hf.H2Og - Hf.CH4) / M_CH4, v2 = -(Hf.CO2 + 2 * Hf.H2Og - Hf.CH3OH) / M_CH3OH;
  add({ L: 9, t: 4, tag: 'Exam', k: 'mcq',
    q: 'Which fuel releases more heat PER GRAM when burned completely to CO₂(g) and H₂O(l): methane, CH₄(g) (16.04 g/mol), or methanol, CH₃OH(l) (32.04 g/mol)? ΔH°f (kJ/mol): CH₄(g) −74.9, CH₃OH(l) −238.6, CO₂(g) −393.5, H₂O(l) −285.8, H₂O(g) −241.8.',
    c: [`CH₄: about ${fx(g1, 1)} kJ/g versus ${fx(g2, 1)} kJ/g for CH₃OH`,
        `CH₃OH: about ${fx(-c2 / M_CH4, 1)} kJ/g versus ${fx(-c1 / M_CH3OH, 1)} kJ/g for CH₄`,
        `CH₄: about ${fx(-c1, 0)} kJ/g versus ${fx(-c2, 0)} kJ/g for CH₃OH`,
        'Neither: each produces 1 mol of CO₂ per mole of fuel, so they release the same heat per gram',
        `CH₄: about ${fx(v1, 1)} kJ/g versus ${fx(v2, 1)} kJ/g for CH₃OH`],
    why: `CH₄ + 2O₂ → CO₂ + 2H₂O(l): ΔH° = −393.5 + 2(−285.8) − (−74.9) = ${fx(c1, 1)} kJ/mol → ÷ 16.04 g/mol = ${fx(-g1, 1)} kJ/g. CH₃OH + 3/2 O₂ → CO₂ + 2H₂O(l): ΔH° = −393.5 + 2(−285.8) − (−238.6) = ${fx(c2, 1)} kJ/mol → ÷ 32.04 = ${fx(-g2, 1)} kJ/g. Methane wins by more than a factor of two: methanol is already partly oxidized and twice as heavy per mole. The swapped choice divides by the wrong molar masses; ${fx(v1, 1)}/${fx(v2, 1)} kJ/g uses H₂O(g); the per-mole values are not per gram.`,
    h: H('Get ΔH°comb per mole for each fuel from the ΔH°f values.', 'Divide each by its own molar mass.', `About ${fx(-c1, 0)} ÷ 16.04 versus ${fx(-c2, 0)} ÷ 32.04.`) });
}
{ // Hess from formation equations (decompose reactants, form products)
  add({ L: 9, t: 3, tag: 'Calculation', k: 'mcq',
    q: 'Given ½N₂(g) + ½O₂(g) → NO(g), ΔH = +90.3 kJ and ½N₂(g) + O₂(g) → NO₂(g), ΔH = +33.2 kJ, what is ΔH for 2NO(g) + O₂(g) → 2NO₂(g)?',
    c: ['−114.2 kJ', '+114.2 kJ', '−57.1 kJ', '+247.0 kJ', '+123.5 kJ'],
    why: 'Decompose the reactant: reverse the NO formation and double it, 2NO → N₂ + O₂, ΔH = 2(−90.3) = −180.6 kJ. Form the product: double the NO₂ formation, N₂ + 2O₂ → 2NO₂, ΔH = 2(+33.2) = +66.4 kJ. Adding: N₂ cancels and O₂ nets to 1 on the left, giving the target with ΔH = −180.6 + 66.4 = −114.2 kJ. This is exactly ΔH° = Σ n ΔH°f(products) − Σ m ΔH°f(reactants). −57.1 kJ forgets to double; +247.0 kJ adds both doubled values without reversing the NO step; +123.5 kJ neither reverses nor doubles.',
    h: H('Route through the elements: NO → elements → NO₂.', 'Reverse and double the NO equation; double the NO₂ equation.', '2(33.2) − 2(90.3).') });
}

/* ---------- assemble ---------- */
let mcq = 0;
const counts = { 7: 0, 8: 0, 9: 0 };
const out = Q.map((o, i) => {
  const id = 'm5-a-' + String(i + 1).padStart(3, '0');
  counts[o.L]++;
  let choices = o.c, ans = o.ans;
  if (o.k === 'mcq') {
    if (o.c.length !== 5) throw new Error(id + ' needs 5 choices');
    if (!o.ordered) {
      const pos = (mcq * 2 + Math.floor(mcq / 5)) % 5;
      const rest = o.c.slice(1);
      rest.splice(pos, 0, o.c[0]);
      choices = rest; ans = pos;
    }
    mcq++;
  }
  const rec = [id, 5, o.L, o.t, o.tag, o.k, o.q, choices, ans, o.why, o.h];
  if (o.opts) rec.push(o.opts);
  return '[' + rec.map(v => JSON.stringify(v)).join(',') + ']';
});

const header = `/* GENERATED by tools/chem/gen-thermo.cjs - edit the generator, not this file.

   Gym 5 - Thermochemistry (CHM 11510 lessons 7, 8, 9; Silberberg 6.1-6.6), for Evening Exam 2.
   Lesson 7 (6.1-6.3): system and surroundings, open/closed/isolated, heat vs work, ΔE = q + w and
   its sign table, w = −PΔV (1 L·atm = 101.3 J), state vs path functions, ΔH = q(p), ΔH vs ΔE,
   exo/endo, specific/molar/object heat capacity, q = m·c·ΔT for every unknown, metal-in-water and
   water-mixing calorimetry, bomb calorimetry, the Mg 74.3 kJ example. Lesson 8 (6.3-6.4):
   coffee-cup calorimetry with q(soln) = −q(rxn) and the limiting reactant, thermochemical
   equations as mole ratios, phase-change enthalpies. Lesson 9 (6.5-6.6): Hess's law, standard
   states, formation equations, ΔH°rxn from ΔH°f and back-solving ΔH°f.
   Sources: the course's Thermochem 1-3 slides (examples reproduced: Mg 3.00 g, solid 6.47 J/(g·K),
   NaOH/HCl −55.5 kJ/mol, CH4 −891, sweat 226 kJ, glucose −2803, CO −566.0, NH3 −906.0, thermite,
   Ba(OH)2 +102, Hess's H2SO4 data), recitation worksheet week 6 (Q1-Q7 each reproduced once with
   variations), Silberberg sample-problem types. Every number in stems, choices and explanations is
   computed by the generator. ${Q.length} questions. */
`;
const body = header + 'chemAddQuestions([\n' + out.join(',\n') + '\n]);\n';
const dest = path.join(__dirname, '..', '..', 'js', 'data', 'chem', 'chem-q-thermo.js');
fs.writeFileSync(dest, body);
console.log('wrote ' + Q.length + ' questions to ' + dest);
console.log('by lesson', counts);
