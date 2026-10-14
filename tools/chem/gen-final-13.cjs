/* Gym 13 - Nuclear chemistry (Silberberg 24.1, 24.5-24.7 + decay kinetics), lectures 27 and 28.
   Part of gen-final.cjs. Nuclide masses are atomic masses (electrons included), so the
   electrons cancel when ¹H atoms stand in for protons. */
module.exports = function (H) {
  const { s, sci, f, MeV, amu, c, NA } = H;
  const Q = [];
  const add = q => Q.push(q);
  const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹', SUB = '₀₁₂₃₄₅₆₇₈₉';
  const up = n => String(n).split('').map(d => SUP[d]).join('');
  const dn = n => (n < 0 ? '₋' : '') + String(Math.abs(n)).split('').map(d => SUB[d]).join('');
  const nuc = (A, Z, X) => up(A) + dn(Z) + X;
  const BETA = '⁰₋₁β', POS = '⁰₊₁β', ALPHA = '⁴₂He', NEUT = '¹₀n', PROT = '¹₁H', GAM = '⁰₀γ', ELEC = '⁰₋₁e';
  const mH = 1.007825, mn = 1.008665, mHe = 4.002603;
  const ln2 = 0.693;

  /* ---------------- Lecture 27: decay, equations, stability ---------------- */
  add({ l: 27, t: 1, tag: 'Concept',
    q: 'Which statement about nuclear reactions is FALSE?',
    c: ['Like chemical reactions, their rates rise sharply with temperature', 'They can change one element into another', 'Different isotopes of the same element can behave completely differently', 'They involve energy changes roughly a million times larger per atom than chemical reactions', 'They involve the nucleus rather than the outer electrons'],
    why: 'Radioactive decay rates are unaffected by temperature, pressure or catalysts - a half-life is a property of the nucleus alone. All the other statements are true: nuclear reactions change Z (so the element), isotopes such as ²³⁵U and ²³⁸U behave very differently, and the energies are about 10⁶ times larger.',
    h: ['Four statements are true differences between nuclear and chemical change.', 'Can you speed up radioactive decay by heating the sample?', 'Decay rate depends only on the nucleus.'] });

  add({ l: 27, t: 1, tag: 'Concept',
    q: 'The term "nucleon" refers to:',
    c: ['protons and neutrons', 'protons only', 'neutrons only', 'protons, neutrons and electrons', 'any particle emitted in radioactive decay'],
    why: 'Nucleons are the particles in the nucleus: protons and neutrons. The mass number A counts nucleons. Electrons are outside the nucleus.',
    h: ['Think "nucleus" + "-on".', 'What does the mass number count?', 'Both kinds of particle found in the nucleus.'] });

  add({ l: 27, t: 1, tag: 'Concept',
    q: 'How many neutrons are in the nuclide ' + nuc(60, 27, 'Co') + '?',
    c: ['33', '27', '60', '87', '30'],
    why: 'N = A − Z = 60 − 27 = 33. 27 is the number of protons; 60 is the mass number (protons + neutrons); 87 adds instead of subtracting.',
    h: ['The top number is the mass number, the bottom the atomic number.', 'N = A − Z.', '60 − 27.'] });

  add({ l: 27, t: 2, tag: 'Concept',
    q: 'Which pair of nuclides are isotopes of each other?',
    c: [nuc(12, 6, 'C') + ' and ' + nuc(14, 6, 'C'), nuc(14, 6, 'C') + ' and ' + nuc(14, 7, 'N'), nuc(40, 18, 'Ar') + ' and ' + nuc(40, 20, 'Ca'), nuc(3, 1, 'H') + ' and ' + nuc(3, 2, 'He'), nuc(16, 8, 'O') + ' and ' + nuc(18, 9, 'F')],
    why: 'Isotopes have the same atomic number Z (same element) but different mass numbers. ¹²C and ¹⁴C both have Z = 6. The other pairs share a mass number (or neither number) but are different elements.',
    h: ['Isotopes are the same element.', 'Same Z, different A.', 'Look for matching subscripts.'] });

  add({ l: 27, t: 1, tag: 'Concept',
    q: 'An alpha particle is identical to:',
    c: ['a helium-4 nucleus, ' + ALPHA, 'a high-speed electron, ' + BETA, 'a positron, ' + POS, 'a high-energy photon, ' + GAM, 'a neutron, ' + NEUT],
    why: 'An α particle is two protons and two neutrons - a ⁴He nucleus with a 2+ charge. β⁻ is an electron, β⁺ a positron, γ a photon.',
    h: ['Alpha has mass number 4.', 'It carries a 2+ charge.', 'Which nucleus has 2 protons and 2 neutrons?'] });

  add({ l: 27, t: 2, tag: 'Concept',
    q: 'When a nucleus emits an alpha particle, how do its mass number A and atomic number Z change?',
    c: ['A decreases by 4, Z decreases by 2', 'A decreases by 2, Z decreases by 4', 'A unchanged, Z increases by 1', 'A decreases by 4, Z unchanged', 'A unchanged, Z decreases by 2'],
    why: 'The nucleus loses ⁴₂He: two protons and two neutrons. So A − 4 and Z − 2 (the element moves two places to the left).',
    h: ['What particle leaves?', 'α = ⁴₂He: subtract its top and bottom numbers.', 'A − 4, Z − 2.'] });

  add({ l: 27, t: 2, tag: 'Concept',
    q: 'In beta (β⁻) decay, what happens inside the nucleus?',
    c: ['A neutron becomes a proton and an electron is emitted, so Z increases by 1', 'A proton becomes a neutron and a positron is emitted, so Z decreases by 1', 'An inner electron is captured, so Z decreases by 1', 'Two protons and two neutrons are emitted, so Z decreases by 2', 'Only energy is emitted, so neither A nor Z changes'],
    why: 'β⁻ decay: ¹₀n → ¹₁p + ⁰₋₁β. A stays the same and Z rises by one. The other choices describe positron emission (p → n, Z − 1), electron capture (Z − 1), alpha decay and gamma emission.',
    h: ['β⁻ is an electron created in the nucleus.', 'Which nucleon can turn into a proton plus an electron?', 'n → p + e⁻, so Z goes up.'] });

  add({ l: 27, t: 2, tag: 'Concept',
    q: 'Which type of decay changes neither the mass number nor the atomic number?',
    c: ['Gamma emission', 'Alpha decay', 'Beta (β⁻) decay', 'Positron emission', 'Electron capture'],
    why: 'A γ ray is a photon (⁰₀γ): it carries away energy from an excited nucleus but no mass number or charge. α lowers A and Z; β⁻ raises Z; positron emission and electron capture lower Z.',
    h: ['Which emission is pure energy?', 'Its symbol has 0 on top and 0 on the bottom.', 'A photon.'] });

  add({ l: 27, t: 4, tag: 'Trap',
    q: 'Which two decay modes produce the SAME daughter nuclide from a given parent?',
    c: ['Positron emission and electron capture', 'Alpha decay and beta (β⁻) decay', 'Beta (β⁻) decay and positron emission', 'Beta (β⁻) decay and electron capture', 'Alpha decay and gamma emission'],
    why: 'Positron emission (p → n + ⁰₊₁β) and electron capture (p + ⁰₋₁e → n) both turn one proton into one neutron: A unchanged, Z − 1. β⁻ goes the other way (Z + 1), which is why "β⁻ and positron" are opposites, not equal.',
    h: ['Write the change in Z for each mode.', 'Which two modes both convert a proton into a neutron?', 'Both give Z − 1 with A unchanged.'] });

  const missing = (l, t, eq, right, wrongs, why, hints, tag) => add({ l, t, tag: tag || 'Calculation', q: 'Identify X in the nuclear equation: ' + eq, c: [right].concat(wrongs), why, h: hints });

  missing(27, 2, nuc(238, 92, 'U') + ' → ' + ALPHA + ' + X', nuc(234, 90, 'Th'), [nuc(234, 91, 'Pa'), nuc(242, 94, 'Pu'), nuc(234, 92, 'U'), nuc(236, 90, 'Th')],
    'Balance the top and bottom numbers separately. A: 238 = 4 + A → A = 234. Z: 92 = 2 + Z → Z = 90, thorium. ²⁴²Pu added the α instead of removing it; ²³⁴Pa got Z wrong.',
    ['Mass numbers must add up on both sides.', 'Subtract 4 from A and 2 from Z.', 'Z = 90 is thorium.']);

  missing(27, 2, nuc(14, 6, 'C') + ' → X + ' + BETA, nuc(14, 7, 'N'), [nuc(14, 5, 'B'), nuc(10, 4, 'Be'), nuc(13, 6, 'C'), nuc(15, 7, 'N')],
    'A: 14 = A + 0 → 14. Z: 6 = Z + (−1) → Z = 7, nitrogen. β⁻ emission RAISES Z. ¹⁴B is the common sign slip (6 − 1 instead of 6 + 1).',
    ['The β particle has charge −1, so mind the sign.', '6 = Z − 1.', 'Z = 7: nitrogen.']);

  missing(27, 2, nuc(226, 88, 'Ra') + ' → ' + nuc(222, 86, 'Rn') + ' + X', ALPHA, [BETA, POS, NEUT, GAM],
    'Missing: A = 226 − 222 = 4 and Z = 88 − 86 = 2, which is ⁴₂He, an alpha particle.',
    ['Find the missing A and Z by subtraction.', 'A = 4 and Z = 2.', 'That is a helium nucleus.']);

  missing(27, 3, nuc(40, 19, 'K') + ' + ' + ELEC + ' → X', nuc(40, 18, 'Ar'), [nuc(40, 20, 'Ca'), nuc(39, 18, 'Ar'), nuc(41, 19, 'K'), nuc(40, 19, 'K')],
    'This is electron capture. A: 40 + 0 = 40. Z: 19 + (−1) = 18, argon. ⁴⁰Ca would come from β⁻ decay (Z + 1), which ⁴⁰K can also do - but the equation as written captures an electron.',
    ['The electron is on the LEFT: it is captured, not emitted.', 'Add the bottom numbers: 19 + (−1).', 'Z = 18: argon.']);

  missing(27, 2, nuc(131, 53, 'I') + ' → X + ' + BETA, nuc(131, 54, 'Xe'), [nuc(131, 52, 'Te'), nuc(127, 51, 'Sb'), nuc(130, 53, 'I'), nuc(132, 54, 'Xe')],
    'β⁻ decay: A unchanged (131), Z + 1 = 54, xenon. ¹³¹Te has the sign backwards.',
    ['β⁻ keeps A and changes Z.', '53 = Z − 1.', 'Z = 54: xenon.']);

  missing(27, 2, nuc(18, 9, 'F') + ' → X + ' + POS, nuc(18, 8, 'O'), [nuc(18, 10, 'Ne'), nuc(17, 9, 'F'), nuc(14, 7, 'N'), nuc(18, 9, 'F')],
    'Positron emission: A unchanged (18); Z: 9 = Z + 1 → Z = 8, oxygen. ¹⁸F is the PET isotope; ¹⁸Ne would be β⁻ decay.',
    ['The positron has charge +1.', '9 = Z + 1.', 'Z = 8: oxygen.']);

  missing(27, 2, nuc(239, 94, 'Pu') + ' → X + ' + ALPHA, nuc(235, 92, 'U'), [nuc(235, 93, 'Np'), nuc(243, 96, 'Cm'), nuc(237, 92, 'U'), nuc(239, 92, 'U')],
    'A: 239 − 4 = 235. Z: 94 − 2 = 92, uranium.',
    ['Alpha removes 4 from A and 2 from Z.', 'A = 235, Z = 92.', 'Uranium.']);

  missing(27, 2, nuc(90, 38, 'Sr') + ' → X + ' + BETA, nuc(90, 39, 'Y'), [nuc(90, 37, 'Rb'), nuc(86, 36, 'Kr'), nuc(89, 38, 'Sr'), nuc(91, 39, 'Y')],
    'β⁻: A stays 90, Z = 38 + 1 = 39, yttrium.',
    ['β⁻ raises Z by one.', 'A does not change.', 'Z = 39: yttrium.']);

  missing(27, 2, nuc(20, 9, 'F') + ' → ' + nuc(20, 10, 'Ne') + ' + X', BETA, [POS, ALPHA, NEUT, PROT],
    'A: 20 = 20 + A → A = 0. Z: 9 = 10 + Z → Z = −1. A particle with A = 0, Z = −1 is a β⁻ particle (an electron). A positron would need Z = +1.',
    ['Find A and Z of X by subtraction.', 'A = 0, Z = −1.', 'Mass number 0 and charge −1.']);

  missing(27, 3, nuc(7, 4, 'Be') + ' + X → ' + nuc(7, 3, 'Li'), ELEC + ' (electron capture)', [POS + ' (positron)', PROT + ' (proton)', NEUT + ' (neutron)', GAM + ' (gamma photon)'],
    'X is on the reactant side. A: 7 + A = 7 → A = 0. Z: 4 + Z = 3 → Z = −1. An electron absorbed by the nucleus = electron capture. A positron would have to be on the PRODUCT side to lower Z.',
    ['X is being added to the nucleus, not emitted.', 'A = 0, Z = −1 on the left side.', 'An inner-shell electron is captured.']);

  missing(27, 2, nuc(210, 84, 'Po') + ' → ' + nuc(206, 82, 'Pb') + ' + X', ALPHA, [BETA, POS, NEUT, '²₁H'],
    'A: 210 − 206 = 4; Z: 84 − 82 = 2 → ⁴₂He, an α particle. Elements beyond Z = 83 typically decay by α.',
    ['Subtract to get the missing numbers.', 'A = 4, Z = 2.', 'An alpha particle.']);

  missing(28, 2, nuc(14, 7, 'N') + ' + ' + ALPHA + ' → ' + nuc(17, 8, 'O') + ' + X', PROT + ' (a proton)', [NEUT + ' (a neutron)', BETA + ' (a β⁻ particle)', '²₁H (a deuteron)', ALPHA + ' (an α particle)'],
    'Rutherford\'s first artificial transmutation (1919). A: 14 + 4 = 17 + A → A = 1. Z: 7 + 2 = 8 + Z → Z = 1. A = 1, Z = 1 is a proton.',
    ['Add the reactants first.', 'A: 18 = 17 + A; Z: 9 = 8 + Z.', 'A = 1, Z = 1.']);

  missing(28, 2, nuc(9, 4, 'Be') + ' + ' + ALPHA + ' → ' + nuc(12, 6, 'C') + ' + X', NEUT + ' (a neutron)', [PROT + ' (a proton)', GAM + ' (a gamma photon)', BETA + ' (a β⁻ particle)', '²₁H (a deuteron)'],
    'Chadwick\'s discovery of the neutron. A: 9 + 4 = 12 + A → A = 1. Z: 4 + 2 = 6 + Z → Z = 0. A = 1, Z = 0 is a neutron.',
    ['Sum the top numbers and the bottom numbers on the left.', 'A = 1, Z = 0.', 'A neutral particle of mass number 1.']);

  missing(28, 2, nuc(27, 13, 'Al') + ' + ' + ALPHA + ' → ' + nuc(30, 15, 'P') + ' + X', NEUT, [PROT, POS, BETA, GAM],
    'A: 27 + 4 = 30 + A → A = 1. Z: 13 + 2 = 15 + Z → Z = 0. X is a neutron. (The ³⁰P made this way was the first artificial radioactive isotope.)',
    ['Balance A and Z separately.', 'A = 1; Z = 0.', 'Neutron.']);

  missing(28, 3, nuc(235, 92, 'U') + ' + ' + NEUT + ' → ' + nuc(141, 56, 'Ba') + ' + ' + nuc(92, 36, 'Kr') + ' + X', '3 ' + NEUT, ['2 ' + NEUT, NEUT, '4 ' + NEUT, '3 ' + PROT],
    'Z: 92 + 0 = 56 + 36 = 92, so X carries no charge. A: 235 + 1 = 236; 141 + 92 = 233, so X must carry 3 mass units: 3 neutrons. Forgetting the incoming neutron gives 2.',
    ['Do not forget the neutron on the LEFT.', 'Left A = 236; right so far = 233.', 'Three uncharged particles of A = 1.']);

  missing(28, 3, nuc(235, 92, 'U') + ' + ' + NEUT + ' → ' + nuc(94, 38, 'Sr') + ' + X + 2' + NEUT, nuc(140, 54, 'Xe'), [nuc(141, 54, 'Xe'), nuc(139, 54, 'Xe'), nuc(140, 56, 'Ba'), nuc(142, 54, 'Xe')],
    'A: 235 + 1 = 236 = 94 + A + 2 → A = 140. Z: 92 = 38 + Z → Z = 54, xenon. ¹³⁹Xe forgets the incoming neutron, ¹⁴¹Xe counts only one product neutron, ¹⁴²Xe ignores both product neutrons, and ¹⁴⁰Ba has the wrong Z.',
    ['Count all neutrons: 1 in, 2 out.', '236 = 94 + A + 2.', 'A = 140, Z = 54.']);

  missing(28, 2, '²₁H + ³₁H → ' + ALPHA + ' + X', NEUT, [PROT, BETA, POS, '²₁H'],
    'Deuterium-tritium fusion. A: 2 + 3 = 4 + A → A = 1. Z: 1 + 1 = 2 + Z → Z = 0. X is a neutron.',
    ['Balance A and Z.', 'A = 1, Z = 0.', 'Neutral, mass number 1.']);

  missing(27, 2, nuc(241, 95, 'Am') + ' → ' + nuc(237, 93, 'Np') + ' + X', ALPHA, [BETA, POS, NEUT, '⁴₁H'],
    'Americium-241 (in smoke detectors) is an α emitter: A drops by 4, Z by 2.',
    ['Subtract to find X.', 'A = 4, Z = 2.', 'α particle.']);

  add({ l: 27, t: 4, tag: 'Exam',
    q: nuc(232, 90, 'Th') + ' undergoes alpha decay, then β⁻ decay, then another β⁻ decay. What is the final nuclide?',
    c: [nuc(228, 90, 'Th'), nuc(228, 88, 'Ra'), nuc(228, 92, 'U'), nuc(224, 88, 'Ra'), nuc(228, 89, 'Ac')],
    why: 'α: ²³²₉₀Th → ²²⁸₈₈Ra. β⁻: → ²²⁸₈₉Ac. β⁻: → ²²⁸₉₀Th. Net: A − 4 and Z back to 90 - an isotope of the starting element. ²²⁸Ra stops after the α, ²²⁸Ac after one β⁻, and ²²⁸U forgets that the α lowered Z by 2.',
    h: ['Apply one step at a time.', 'α: A − 4, Z − 2; each β⁻: Z + 1.', 'Z: 90 − 2 + 1 + 1.'] });

  add({ l: 27, t: 3, tag: 'Calculation',
    q: 'The uranium-238 decay series ends at lead-206 (²³⁸₉₂U → ²⁰⁶₈₂Pb). How many α and β⁻ particles are emitted in total?',
    c: ['8 α and 6 β⁻', '6 α and 8 β⁻', '8 α and 10 β⁻', '8 α and 2 β⁻', '32 α and 10 β⁻'],
    why: 'Only α changes A: (238 − 206)/4 = 8 α. Eight α lower Z by 16: 92 − 16 = 76. To reach Z = 82 you need 82 − 76 = 6 β⁻ (each raises Z by 1). 32 α forgets to divide by 4; 10 β⁻ subtracts the Z drop instead of making it up.',
    h: ['Only α decay changes the mass number.', 'Number of α = ΔA ÷ 4; then fix Z with β⁻.', '8 α take Z to 76.'] });

  add({ l: 27, t: 3, tag: 'Calculation',
    q: 'Thorium-232 decays through a series to lead-208 (²³²₉₀Th → ²⁰⁸₈₂Pb). How many α and β⁻ particles are emitted?',
    c: ['6 α and 4 β⁻', '4 α and 6 β⁻', '6 α and 8 β⁻', '8 α and 6 β⁻', '24 α and 4 β⁻'],
    why: 'α count = (232 − 208)/4 = 6, which lowers Z by 12 to 78. Then 82 − 78 = 4 β⁻.',
    h: ['ΔA comes only from α.', '24 ÷ 4 = 6 α; Z drops to 78.', 'β⁻ count = 82 − 78.'] });

  add({ l: 27, t: 4, tag: 'Calculation',
    q: 'Uranium-235 decays through a series to lead-207 (²³⁵₉₂U → ²⁰⁷₈₂Pb). How many α and β⁻ particles are emitted?',
    c: ['7 α and 4 β⁻', '7 α and 10 β⁻', '4 α and 7 β⁻', '8 α and 6 β⁻', '7 α and 2 β⁻'],
    why: 'α = (235 − 207)/4 = 7, lowering Z by 14 to 78. β⁻ = 82 − 78 = 4. "8 α and 6 β⁻" is the memorised ²³⁸U answer applied to the wrong series.',
    h: ['Do not reuse the U-238 answer - compute.', 'α = (235 − 207) ÷ 4.', 'After 7 α, Z = 78.'] });

  add({ l: 27, t: 4, tag: 'Trap',
    q: 'A nuclide emits one α particle followed by two β⁻ particles. Which statement describes the final nuclide?',
    c: ['It is an isotope of the original element with a mass number 4 lower', 'It is the same nuclide as the original', 'It is an element two places lower with the same mass number', 'It is an element two places higher with a mass number 4 lower', 'It is an isotope of the original element with the same mass number'],
    why: 'α: A − 4, Z − 2. Two β⁻: Z + 2, A unchanged. Net: Z unchanged (same element), A − 4. So it is an isotope of the parent, 4 mass units lighter (e.g. ²³⁸U → ²³⁴U).',
    h: ['Track A and Z separately.', 'Only α changes A; the two β⁻ undo the α’s change in Z.', 'Net ΔZ = 0, ΔA = −4.'] });

  add({ l: 27, t: 1, tag: 'Concept',
    q: 'For stable nuclides of the lighter elements (Z up to about 20), the neutron-to-proton ratio N/Z is approximately:',
    c: ['1', '0.5', '1.5', '2', '3'],
    why: 'The band of stability starts near N/Z = 1 (⁴He, ¹²C, ¹⁶O, ⁴⁰Ca) and rises to about 1.5 for the heaviest stable nuclei (²⁰⁶Pb has 124/82 ≈ 1.51), because extra neutrons are needed to offset proton-proton repulsion.',
    h: ['Think of ¹²C or ¹⁶O.', 'Count neutrons and protons in ¹⁶₈O.', '8 neutrons / 8 protons.'] });

  add({ l: 27, t: 3, tag: 'Concept',
    q: 'Phosphorus-32 (stable phosphorus is phosphorus-31) is radioactive. Its most likely mode of decay is:',
    c: ['β⁻ emission', 'positron emission', 'electron capture', 'α emission', 'neutron capture'],
    why: '³²P (15 p, 17 n) has one more neutron than the stable ³¹P (N/Z = 17/15 = 1.13 versus 1.07), so it lies ABOVE the band of stability - neutron-rich. β⁻ decay turns a neutron into a proton (³²P → ³²S), lowering N/Z. Positron emission and electron capture are for neutron-poor nuclides; α is for Z above 83.',
    h: ['Compare the mass number with the stable isotope (or the atomic mass on the table).', 'Too many neutrons → which decay converts n into p?', 'Neutron-rich nuclides undergo β⁻ decay.'] });

  add({ l: 27, t: 3, tag: 'Concept',
    q: 'Carbon-11 is radioactive (carbon’s atomic mass is 12.01). Its most likely mode of decay is:',
    c: ['positron emission', 'β⁻ emission', 'α emission', 'gamma emission only', 'neutron emission'],
    why: '¹¹C has 6 p and 5 n (N/Z = 0.83), fewer neutrons than stable ¹²C - it is neutron-POOR, below the band. Positron emission (or electron capture) turns a proton into a neutron: ¹¹C → ¹¹B + ⁰₊₁β. β⁻ would make it even more neutron-poor.',
    h: ['Is ¹¹C lighter or heavier than the stable isotope?', 'Neutron-poor nuclides need to turn p into n.', 'β⁺ (or electron capture).'] });

  add({ l: 27, t: 2, tag: 'Concept',
    q: 'Uranium-238 decays mainly by which mode?',
    c: ['α emission', 'β⁻ emission', 'positron emission', 'electron capture', 'it is stable'],
    why: 'No nuclide with Z above 83 is stable; heavy nuclei like ²³⁸U (Z = 92) shed mass and charge efficiently by α emission (²³⁸U → ²³⁴Th + ⁴He).',
    h: ['What is unusual about Z = 92?', 'All nuclides with Z greater than 83 are radioactive.', 'Heavy nuclei lose ⁴He.'] });

  add({ l: 27, t: 4, tag: 'Concept',
    q: 'Which nuclide is most likely to decay by POSITRON emission? (Atomic masses: O 16.00, H 1.008, Ra 226.0.)',
    c: [nuc(15, 8, 'O'), nuc(20, 8, 'O'), nuc(16, 8, 'O'), nuc(3, 1, 'H'), nuc(226, 88, 'Ra')],
    why: '¹⁵O (8 p, 7 n) is lighter than stable ¹⁶O - neutron-poor - so it emits a positron (¹⁵O → ¹⁵N + β⁺); it is a PET isotope. ²⁰O and ³H are neutron-rich (β⁻); ¹⁶O is stable (doubly magic); ²²⁶Ra (Z = 88) emits α.',
    h: ['Positron emitters are neutron-poor.', 'Compare each mass number with the atomic mass on the table.', 'Which oxygen isotope is lighter than 16?'] });

  add({ l: 27, t: 4, tag: 'Concept',
    q: 'Which nuclide is most likely to decay by β⁻ emission? (Atomic masses: Co 58.93, F 19.00, N 14.01, Fe 55.85, Po 209.)',
    c: [nuc(60, 27, 'Co'), nuc(18, 9, 'F'), nuc(13, 7, 'N'), nuc(55, 26, 'Fe'), nuc(210, 84, 'Po')],
    why: '⁶⁰Co is heavier than the stable ⁵⁹Co - neutron-rich - so it undergoes β⁻ decay (⁶⁰Co → ⁶⁰Ni + β⁻, the cancer-therapy source). ¹⁸F, ¹³N and ⁵⁵Fe are lighter than their stable isotopes (neutron-poor: β⁺ or electron capture); ²¹⁰Po (Z = 84) emits α.',
    h: ['β⁻ fixes a neutron excess.', 'Which nuclide has a mass number ABOVE its element’s atomic mass?', '⁶⁰ versus 58.93.'] });

  add({ l: 27, t: 2, tag: 'Concept',
    q: 'Which nuclide is "doubly magic" (a magic number of BOTH protons and neutrons)?',
    c: [nuc(208, 82, 'Pb'), nuc(207, 82, 'Pb'), nuc(209, 83, 'Bi'), nuc(197, 79, 'Au'), nuc(238, 92, 'U')],
    why: 'Magic numbers: 2, 8, 20, 28, 50, 82 (and 126 for neutrons). ²⁰⁸Pb has Z = 82 and N = 208 − 82 = 126 - both magic, making it exceptionally stable. ²⁰⁷Pb has N = 125.',
    h: ['List the magic numbers.', 'Compute N = A − Z for each.', 'Z = 82 and N = 126.'] });

  add({ l: 27, t: 2, tag: 'Concept',
    q: 'Which combination of proton and neutron numbers is MOST common among stable nuclides?',
    c: ['Even Z and even N', 'Odd Z and odd N', 'Even Z and odd N', 'Odd Z and even N', 'All four combinations are about equally common'],
    why: 'Nucleons pair up like electrons do, so even-even nuclides are by far the most numerous stable nuclides (about 157). Odd-odd stable nuclides are very rare (only ²H, ⁶Li, ¹⁰B, ¹⁴N and a few heavy ones).',
    h: ['Nucleons, like electrons, are more stable when paired.', 'Pairing works for both protons and neutrons.', 'Both numbers even.'] });

  add({ l: 27, t: 1, tag: 'Concept',
    q: 'Rank alpha, beta and gamma radiation in order of INCREASING penetrating power.',
    c: ['α < β < γ', 'γ < β < α', 'β < α < γ', 'α < γ < β', 'γ < α < β'],
    why: 'α particles are heavy and doubly charged, so they interact strongly and are stopped by paper or skin. β particles (electrons) go farther - a few mm of aluminum stops them. γ photons have no charge or mass and need thick lead or concrete.',
    h: ['Bigger, more highly charged particles are stopped soonest.', 'Paper stops α; aluminum stops β; lead is needed for γ.', 'α is least penetrating.'] });

  add({ l: 27, t: 2, tag: 'Concept',
    q: 'Which shielding is the MINIMUM needed to stop each type of radiation?',
    c: ['α: a sheet of paper; β: a few mm of aluminum; γ: several cm of lead', 'α: several cm of lead; β: a few mm of aluminum; γ: a sheet of paper', 'α: a few mm of aluminum; β: a sheet of paper; γ: several cm of lead', 'All three are stopped by a sheet of paper', 'All three need several cm of lead'],
    why: 'α (least penetrating) is stopped by paper or the outer layer of skin; β by a thin sheet of metal such as aluminum or by plastic; γ needs dense material - thick lead or concrete.',
    h: ['Penetrating power: α < β < γ.', 'The weakest penetrator needs the thinnest shield.', 'Paper → aluminum → lead.'] });

  add({ l: 27, t: 3, tag: 'Concept',
    q: 'Which statement about the biological hazard of radiation is correct?',
    c: ['An α emitter is most dangerous when inhaled or swallowed, because α particles deposit all their energy in a short path', 'An α emitter is most dangerous outside the body, because α radiation penetrates deepest', 'γ rays are harmless because they have no mass and no charge', 'β particles cannot ionize atoms', 'Radiation damage comes only from heating the tissue'],
    why: 'α particles are the most strongly IONIZING but least penetrating: outside the body your dead skin stops them, but inside (e.g. inhaled radon or polonium) they dump all their energy into nearby cells. γ rays are penetrating and do ionize. Damage comes from ionization - creating ions and free radicals - not heating.',
    h: ['Separate "penetrating" from "ionizing".', 'α: highly ionizing, short range.', 'Inside the body nothing shields the cells.'] });

  add({ l: 27, t: 2, tag: 'Concept',
    q: 'Which of the following is NOT ionizing radiation?',
    c: ['Radio waves', 'X-rays', 'γ rays', 'α particles', 'β particles'],
    why: 'Ionizing radiation carries enough energy to knock electrons out of atoms and molecules, forming ions and free radicals. α, β, γ and X-rays do. Radio waves are low-energy photons (long wavelength) - far too little energy per photon.',
    h: ['Ionizing means energetic enough to remove an electron.', 'Photon energy ∝ 1/λ.', 'Which has the longest wavelength?'] });

  add({ l: 27, t: 3, tag: 'Concept',
    q: 'A beam containing α, β⁻ and γ radiation passes between two electrically charged plates. What happens?',
    c: ['α bends toward the negative plate, β⁻ bends toward the positive plate (more sharply), γ is undeflected', 'α bends toward the positive plate, β⁻ toward the negative plate, γ is undeflected', 'All three bend toward the positive plate', 'γ bends most because it travels fastest', 'None of them bend, because nuclear radiation has no charge'],
    why: 'α is positive (2+) so it is attracted to the negative plate; β⁻ is negative so it bends toward the positive plate, and much more sharply because an electron is about 7000 times lighter. γ photons are uncharged and go straight.',
    h: ['Give each type its charge.', 'Opposite charges attract.', 'A lighter particle is deflected more easily.'] });

  /* ---------------- Lecture 28: half-life, mass-energy, fission, fusion ---------------- */
  add({ l: 28, t: 1, tag: 'Concept',
    q: 'Which statement about the half-life of a radioactive nuclide is correct?',
    c: ['It is the same no matter how much of the nuclide you start with', 'It gets shorter as the sample gets smaller', 'It doubles each time half of the sample decays', 'It can be shortened by heating the sample', 'It is the time for the whole sample to decay'],
    why: 'Radioactive decay is first order, so t½ = 0.693/k is a constant independent of the amount present. Every half-life halves whatever is left; the sample never "finishes". Temperature has no effect on nuclear decay.',
    h: ['Decay is first order.', 't½ = 0.693/k contains no amount.', 'Constant.'] });

  add({ l: 28, t: 2, tag: 'Calculation',
    q: 'What percentage of a radioactive sample remains after four half-lives?',
    c: ['6.25%', '25.0%', '12.5%', '3.12%', '93.8%'],
    why: '(½)⁴ = 1/16 = 0.0625 = 6.25%. 12.5% is three half-lives, 3.12% five (3.125, with the exact 5 rounded to even); 93.8% is the fraction that has DECAYED.',
    h: ['Each half-life multiplies by ½.', 'Fraction left = (½)ⁿ.', 'Compute (½)⁴.'] });

  add({ l: 28, t: 2, tag: 'Calculation',
    q: 'Iodine-131 has a half-life of 8.02 days. How long does it take for 12.5% of a sample to remain?',
    c: ['24.1 days', '8.02 days', '16.0 days', '64.2 days', '1.00 day'],
    why: '12.5% = 1/8 = (½)³, so three half-lives: 3 × 8.02 = 24.1 days. 64.2 days is 8 half-lives (confusing "1/8" with "8 half-lives").',
    h: ['Write 12.5% as a fraction.', '1/8 = (½)ⁿ - find n.', 'n = 3 half-lives.'] });

  add({ l: 28, t: 2, tag: 'Calculation',
    q: 'Phosphorus-32 has a half-life of 14.3 days. What mass of a 80.0 mg sample remains after 57.2 days? (Enter a number in mg.)',
    a: '5.00 mg', num: 5.00,
    why: '57.2/14.3 = 4.00 half-lives. 80.0 mg × (½)⁴ = 80.0/16 = 5.00 mg.',
    h: ['How many half-lives fit into 57.2 days?', 'Mass left = initial × (½)ⁿ.', '80.0 ÷ 16.'] });

  { const k = ln2 / 5.27, N = Math.exp(-k * 2.00);
    add({ l: 28, t: 3, tag: 'Calculation',
      q: 'Cobalt-60 has a half-life of 5.27 years. How much of a 1.00 g sample remains after 2.00 years?',
      c: [s(N, 3) + ' g', s(1 - 2.00 / (2 * 5.27), 3) + ' g', '0.250 g', s(2.00 / 5.27, 3) + ' g', s(1 - N, 3) + ' g'],
      sort: true,
      why: `2.00 years is not a whole number of half-lives, so use first-order kinetics. k = 0.693/5.27 yr = ${s(k, 4)} yr⁻¹. N = N₀e^(−kt) = 1.00 g × e^(−${s(k, 4)} × 2.00) = ${s(N, 3)} g. ${s(1 - 2.00 / (2 * 5.27), 3)} g assumes the decay is linear; 0.250 g treats 2 years as 2 half-lives; ${s(1 - N, 3)} g is the amount that DECAYED.`,
      h: ['A fraction of a half-life: use ln(N/N₀) = −kt.', 'k = 0.693/t½.', 'N = e^(−0.1315 × 2.00).'] }); }

  { const k = ln2 / 28.8;
    add({ l: 28, t: 2, tag: 'Calculation',
      q: 'Strontium-90 has a half-life of 28.8 years. What is its first-order decay constant k? (Enter a number in yr⁻¹.)',
      a: s(k, 3) + ' yr⁻¹', num: k,
      why: `k = 0.693/t½ = 0.693/28.8 yr = ${s(k, 3)} yr⁻¹.`,
      h: ['Decay is first order.', 'k = 0.693/t½.', '0.693 ÷ 28.8.'] }); }

  { const k = ln2 / 28.8, t = Math.log(10) / k;
    add({ l: 28, t: 4, tag: 'Calculation',
      q: 'Strontium-90 has a half-life of 28.8 years. How long until only 10.0% of a sample remains?',
      c: [s(t, 3) + ' yr', '288 yr', s(Math.log10(10) / k, 3) + ' yr', s(-Math.log(0.9) / k, 3) + ' yr', '144 yr'],
      sort: true,
      why: `ln(N/N₀) = −kt with k = 0.693/28.8 = ${s(k, 4)} yr⁻¹. ln(0.100) = −2.303, so t = 2.303/${s(k, 4)} = ${s(t, 3)} yr (about 3.3 half-lives). 288 yr thinks 10% means ten half-lives; ${s(Math.log10(10) / k, 3)} yr used log instead of ln; ${s(-Math.log(0.9) / k, 3)} yr found when 10% has DECAYED.`,
      h: ['10.0% is not a power of ½ - use logarithms.', 'ln(0.100) = −kt.', 't = 2.303 ÷ 0.02406 yr⁻¹.'] }); }

  { const k = Math.log(1200 / 850) / 10.0, t = ln2 / k;
    add({ l: 28, t: 3, tag: 'Calculation',
      q: 'The activity of a radioactive sample falls from 1200 counts/min to 850 counts/min in 10.0 hours. What is its half-life? (Enter a number in hours.)',
      a: s(t, 3) + ' h', num: t,
      why: `Activity is proportional to the number of nuclei, so ln(A/A₀) = −kt. k = ln(1200/850)/10.0 h = ${s(Math.log(1200 / 850), 4)}/10.0 = ${s(k, 4)} h⁻¹. t½ = 0.693/k = ${s(t, 3)} h.`,
      h: ['Activity drops by the same first-order law as the number of nuclei.', 'Find k from ln(A₀/A) = kt.', 'Then t½ = 0.693/k.'] }); }

  add({ l: 28, t: 2, tag: 'Calculation',
    q: 'A wooden artifact has 25.0% of the carbon-14 activity of living wood. How old is it? (t½ of ¹⁴C = 5730 yr)',
    c: ['1.15 × 10⁴ yr', '5.73 × 10³ yr', '1.43 × 10³ yr', '2.29 × 10⁴ yr', '4.30 × 10³ yr'],
    why: '25.0% = ¼ = (½)², so two half-lives: 2 × 5730 = 11,460 ≈ 1.15 × 10⁴ yr. 2.29 × 10⁴ yr is four half-lives (thinking "¼ → 4"); 4.30 × 10³ yr is 75% of 5730.',
    h: ['Write 25% as a power of ½.', '¼ = (½)².', 'Two half-lives.'] });

  { const k = ln2 / 5730, t = Math.log(15.3 / 9.6) / k;
    add({ l: 28, t: 4, tag: 'Calculation',
      q: 'Charcoal from an ancient hearth shows a ¹⁴C activity of 9.60 disintegrations per minute per gram of carbon; living wood shows 15.3 dpm/g. How old is the charcoal? (t½ of ¹⁴C = 5730 yr)',
      c: [sci(t, 3) + ' yr', sci(5730 * 9.6 / 15.3, 3) + ' yr', sci(5730 * (1 - 9.6 / 15.3), 3) + ' yr', sci(Math.log10(15.3 / 9.6) / k, 3) + ' yr', sci(Math.log(15.3 / 9.6) * 5730, 3) + ' yr'],
      sort: true,
      why: `k = 0.693/5730 yr = ${sci(k, 4)} yr⁻¹. t = ln(A₀/A)/k = ln(15.3/9.60)/${sci(k, 4)} = ${s(Math.log(15.3 / 9.6), 4)}/${sci(k, 4)} = ${sci(t, 3)} yr. The traps: treating decay as linear, using log instead of ln, or forgetting to divide by 0.693.`,
      h: ['Activity is proportional to the ¹⁴C remaining.', 't = ln(A₀/A) ÷ k with k = 0.693/5730.', 'ln(15.3/9.60) = 0.466.'] }); }

  { const t = 5730 * Math.log(1 / 0.180) / ln2;
    add({ l: 28, t: 4, tag: 'Calculation',
      q: 'A bone fragment contains 18.0% of the carbon-14 found in living bone. Estimate its age. (t½ of ¹⁴C = 5730 yr; enter a number in years.)',
      a: sci(t, 3) + ' yr', num: t,
      why: `k = 0.693/5730 = ${sci(ln2 / 5730, 4)} yr⁻¹. t = ln(N₀/N)/k = ln(1/0.180)/${sci(ln2 / 5730, 4)} = ${s(Math.log(1 / 0.18), 4)}/${sci(ln2 / 5730, 4)} = ${sci(t, 3)} yr (about 2.5 half-lives).`,
      h: ['18.0% is not a neat power of ½.', 'ln(N/N₀) = −kt with N/N₀ = 0.180.', 't = 1.715 ÷ 1.209 × 10⁻⁴ yr⁻¹.'] }); }

  add({ l: 28, t: 2, tag: 'Concept',
    q: 'Why can radiocarbon dating be used only for objects that were once alive and are less than about 50,000 years old?',
    c: ['Living things keep a constant ¹⁴C/¹²C ratio by exchanging carbon until death; after about 9 half-lives too little ¹⁴C is left to measure', 'Only living things contain any carbon at all', '¹⁴C decays faster in older objects', 'Rocks contain only ¹⁴C, so their ratio never changes', 'After 50,000 years ¹⁴C turns back into ¹²C'],
    why: 'While alive, an organism exchanges CO₂ (by photosynthesis or eating) and matches the atmosphere\'s ¹⁴C/¹²C ratio. At death the exchange stops and ¹⁴C decays with t½ = 5730 yr. After about 50,000 yr (≈ 9 half-lives, 0.2% left) the activity is too small to measure reliably. The half-life never changes.',
    h: ['What sets the starting ¹⁴C level?', 'Exchange with the atmosphere stops at death.', 'How much is left after 9 half-lives?'] });

  add({ l: 28, t: 3, tag: 'Calculation',
    q: 'A 64.0 g sample of a radioactive isotope decays to 4.00 g in 36 days. What is its half-life?',
    c: ['9.0 days', '18 days', '4.0 days', '2.2 days', '12 days'],
    why: '64.0 → 32.0 → 16.0 → 8.00 → 4.00 g is four halvings (64.0/4.00 = 16 = 2⁴). t½ = 36 days ÷ 4 = 9.0 days. 2.2 days divides 36 by the factor 16 (2.25, with the exact 5 rounded to even); 12 days counts 3 halvings.',
    h: ['How many times do you halve 64 to reach 4?', '64/4 = 16 = 2ⁿ.', '36 days ÷ 4.'] });

  add({ l: 28, t: 1, tag: 'Calculation',
    q: 'A 2.40 g sample of a radioactive nuclide decays for three half-lives. What mass of the nuclide remains?',
    c: ['0.300 g', '0.800 g', '0.600 g', '1.20 g', '2.10 g'],
    why: '2.40 → 1.20 → 0.600 → 0.300 g. (½)³ = 1/8 of 2.40 g = 0.300 g. 0.800 g divides by 3; 2.10 g is how much decayed.',
    h: ['Halve it once per half-life.', 'Three halvings.', '2.40 ÷ 8.'] });

  add({ l: 28, t: 4, tag: 'Trap',
    q: 'After exactly two half-lives, what percentage of the ORIGINAL radioactive nuclei has DECAYED?',
    c: ['75%', '25%', '50%', '100%', '12.5%'],
    why: 'After two half-lives (½)² = 25% remains, so 100 − 25 = 75% has decayed. 25% answers "remains" instead of "decayed"; 100% assumes two halves make a whole.',
    h: ['Read the question: decayed, not remaining.', 'Remaining = (½)².', '100% − 25%.'] });

  { const k = ln2 / (1600 * 3.156e7), N = 1.00 / 226.0 * NA, A = k * N;
    add({ l: 28, t: 4, tag: 'Exam',
      q: 'Radium-226 (226.0 g/mol) has a half-life of 1600 years. What is the activity of 1.00 g of radium-226 in decays per second? (1 yr = 3.156 × 10⁷ s; activity = kN.)',
      c: [sci(A, 3) + ' decays/s', sci(ln2 / 1600 * N, 3) + ' decays/s', sci(k * 1.00 / 226.0, 3) + ' decays/s', sci(N / (1600 * 3.156e7), 3) + ' decays/s', sci(A / 2, 3) + ' decays/s'],
      sort: true,
      why: `k = 0.693/(1600 × 3.156 × 10⁷ s) = ${sci(k, 4)} s⁻¹. N = (1.00 g / 226.0 g/mol)(6.022 × 10²³) = ${sci(N, 4)} nuclei. Activity = kN = ${sci(A, 3)} decays/s - about 1 curie, which is how the curie was defined. The traps: leaving k per YEAR (${sci(ln2 / 1600 * N, 3)}), forgetting Avogadro's number, or dividing N by t½ without the 0.693.`,
      h: ['Activity = kN, with k in s⁻¹ and N as a number of nuclei.', 'Convert the half-life to seconds; grams → moles → nuclei.', 'k ≈ 1.37 × 10⁻¹¹ s⁻¹; N ≈ 2.66 × 10²¹.'] }); }

  { const t = 6.01 * Math.log(25.0 / 1.00) / ln2;
    add({ l: 28, t: 4, tag: 'Exam',
      q: 'A patient receives 25.0 mCi of technetium-99m (t½ = 6.01 h). Ignoring biological elimination, how long until the activity has fallen to 1.00 mCi?',
      c: [s(t, 3) + ' h', '150. h', s(6.01 * Math.log10(25) / ln2, 3) + ' h', s(Math.log(25) / ln2, 3) + ' h', '6.01 h'],
      sort: true,
      why: `ln(A₀/A) = kt with k = 0.693/6.01 h = ${s(ln2 / 6.01, 4)} h⁻¹. t = ln(25.0)/${s(ln2 / 6.01, 4)} = ${s(Math.log(25), 4)}/${s(ln2 / 6.01, 4)} = ${s(t, 3)} h (about 4.6 half-lives). ${s(Math.log(25) / ln2, 3)} h is the number of HALF-LIVES, not hours; ${s(6.01 * Math.log10(25) / ln2, 3)} h used log instead of ln; 150. h multiplies the half-life by the ratio 25 instead of taking its logarithm.`,
      h: ['Activity follows first-order decay.', 't = ln(A₀/A) ÷ k.', 'ln 25 = 3.22; k = 0.1153 h⁻¹.'] }); }

  { const t = 4.47e9 * Math.log(1.5) / ln2;
    add({ l: 28, t: 4, tag: 'Exam',
      q: 'A rock contains 0.500 mol of ²⁰⁶Pb for every 1.000 mol of ²³⁸U. Assuming all the lead came from uranium decay (t½ of ²³⁸U = 4.47 × 10⁹ yr), how old is the rock?',
      c: [sci(t, 3) + ' yr', '4.47 × 10⁹ yr', '2.24 × 10⁹ yr', sci(4.47e9 * Math.log(3) / ln2, 3) + ' yr', sci(4.47e9 * Math.log(1.5), 3) + ' yr'],
      sort: true,
      why: `Each ²⁰⁶Pb came from one ²³⁸U, so originally there were 1.000 + 0.500 = 1.500 mol U. N/N₀ = 1.000/1.500. t = ln(N₀/N)/k = ln(1.500) × 4.47 × 10⁹/0.693 = ${sci(t, 3)} yr. 4.47 × 10⁹ yr assumes half the uranium is gone (a Pb : U ratio of 1 : 1 would mean that); ${sci(4.47e9 * Math.log(1.5), 3)} yr forgets the 0.693.`,
      h: ['How much uranium was there at the start?', 'N₀ = U now + Pb formed.', 'N/N₀ = 1.000/1.500; use ln.'] }); }

  add({ l: 28, t: 1, tag: 'Concept',
    q: 'The mass defect of a nucleus is:',
    c: ['the mass of its separate protons and neutrons minus the mass of the nucleus', 'the mass of the nucleus minus the mass of its separate protons and neutrons', 'the mass lost when the atom loses its electrons', 'the mass of the neutrons only', 'the difference between the mass number and the atomic number'],
    why: 'A nucleus weighs LESS than its separated nucleons. That missing mass (Δm = Σ nucleons − nucleus, a positive number) is the mass equivalent of the binding energy, E = Δmc², released when the nucleus forms.',
    h: ['Which is heavier: the nucleus or its free nucleons?', 'Δm is defined to be positive.', 'Separate nucleons minus the nucleus.'] });

  { const dm = 2 * mH + 2 * mn - mHe, E = dm * MeV;
    add({ l: 28, t: 3, tag: 'Calculation',
      q: 'Calculate the binding energy of a helium-4 nucleus. Atomic masses: ⁴He 4.002603 amu, ¹H 1.007825 amu, neutron 1.008665 amu; 1 amu = 931.5 MeV.',
      c: [s(E, 3) + ' MeV', s(E / 4, 3) + ' MeV', s((2 * mH + 2 * mn) * MeV, 3) + ' MeV', s(dm, 3) + ' MeV', s((2 * mH + 2 * mn - mHe + 2 * mH) * MeV, 3) + ' MeV'],
      sort: true,
      why: `Δm = 2(1.007825) + 2(1.008665) − 4.002603 = ${dm.toFixed(6)} amu. Binding energy = ${dm.toFixed(6)} × 931.5 MeV/amu = ${s(E, 3)} MeV. ${s(E / 4, 3)} MeV is the energy PER NUCLEON; ${s(dm, 3)} is the mass defect still in amu. Using ¹H atoms (not bare protons) makes the two electrons cancel with those in the ⁴He atom.`,
      h: ['Mass of the parts minus mass of the whole.', 'Δm = 2 m(¹H) + 2 m(n) − m(⁴He).', 'Multiply Δm in amu by 931.5.'] });
    add({ l: 28, t: 3, tag: 'Calculation',
      q: 'Using the data for helium-4 (atomic mass 4.002603 amu; ¹H 1.007825 amu; neutron 1.008665 amu; 1 amu = 931.5 MeV), what is the binding energy PER NUCLEON? (Enter a number in MeV.)',
      a: s(E / 4, 3) + ' MeV', num: E / 4,
      why: `Δm = ${dm.toFixed(6)} amu → binding energy = ${s(E, 4)} MeV. ⁴He has 4 nucleons, so ${s(E, 4)}/4 = ${s(E / 4, 3)} MeV per nucleon.`,
      h: ['Find the total binding energy first.', 'Divide by the mass number A.', 'About 28.3 MeV ÷ 4.'] }); }

  { const dm = 26 * mH + 30 * mn - 55.934939, E = dm * MeV;
    add({ l: 28, t: 4, tag: 'Calculation',
      q: 'Iron-56 (atomic mass 55.934939 amu) has 26 protons and 30 neutrons. With ¹H = 1.007825 amu, n = 1.008665 amu and 1 amu = 931.5 MeV, what is its binding energy per nucleon? (Enter a number in MeV.)',
      a: s(E / 56, 3) + ' MeV', num: E / 56,
      why: `Δm = 26(1.007825) + 30(1.008665) − 55.934939 = ${dm.toFixed(6)} amu. Binding energy = ${dm.toFixed(6)} × 931.5 = ${s(E, 4)} MeV. Per nucleon: ${s(E, 4)}/56 = ${s(E / 56, 3)} MeV - the peak of the binding-energy curve.`,
      h: ['Mass defect: (26 × ¹H + 30 × n) − m(⁵⁶Fe).', 'Convert with 931.5 MeV/amu.', 'Divide the total by 56.'] }); }

  { const dm = (2 * mH + 2 * mn - mHe) * 1e-3, E = dm * c * c;
    add({ l: 28, t: 4, tag: 'Exam',
      q: 'The mass defect of ⁴He is 0.030377 g/mol. What is its binding energy in kJ per mole of nuclei? (E = Δmc², c = 2.998 × 10⁸ m/s)',
      c: [sci(E / 1000, 3) + ' kJ/mol', sci(0.030377 * c * c / 1000, 3) + ' kJ/mol', s(dm * c / 1000, 3) + ' kJ/mol', sci(E / 1000 / NA, 3) + ' kJ/mol', sci(E / 1000 / 4, 3) + ' kJ/mol'],
      sort: true,
      why: `Δm must be in kg: 0.030377 g = ${sci(dm, 5)} kg. E = (${sci(dm, 5)} kg)(2.998 × 10⁸ m/s)² = ${sci(E, 4)} J = ${sci(E / 1000, 3)} kJ per mole. Leaving Δm in grams gives an answer 1000 times too big; forgetting to square c gives ${s(dm * c / 1000, 3)} kJ; dividing by Avogadro's number gives the energy of ONE nucleus. Compare: burning a mole of methane releases only 890 kJ.`,
      h: ['A joule is kg·m²/s² - convert grams to kg.', 'E = Δm c², then J → kJ.', '3.0377 × 10⁻⁵ kg × 8.988 × 10¹⁶ m²/s².'] }); }

  { const dm = 226.025410 - 222.017578 - mHe, E = dm * MeV;
    add({ l: 28, t: 3, tag: 'Calculation',
      q: 'How much energy is released when one radium-226 nucleus α-decays: ²²⁶Ra → ²²²Rn + ⁴He? Atomic masses: ²²⁶Ra 226.025410, ²²²Rn 222.017578, ⁴He 4.002603 amu; 1 amu = 931.5 MeV.',
      c: [s(E, 3) + ' MeV', s(dm, 3) + ' MeV', s(-E, 3) + ' MeV', s((226.025410 - 222.017578) * MeV, 3) + ' MeV', s(E * 1000, 3) + ' MeV'],
      sort: true,
      why: `Δm = m(reactants) − m(products) = 226.025410 − (222.017578 + 4.002603) = ${dm.toFixed(6)} amu. E = ${dm.toFixed(6)} × 931.5 = ${s(E, 3)} MeV released. ${s((226.025410 - 222.017578) * MeV, 3)} MeV forgets the mass of the α particle.`,
      h: ['Products weigh less than reactants; the missing mass became energy.', 'Δm = 226.025410 − 222.017578 − 4.002603.', 'Multiply by 931.5 MeV/amu.'] }); }

  { const dm = 2.014102 + 3.016049 - mHe - mn, E = dm * MeV;
    add({ l: 28, t: 4, tag: 'Calculation',
      q: 'Deuterium-tritium fusion: ²H + ³H → ⁴He + ¹n. Masses: ²H 2.014102, ³H 3.016049, ⁴He 4.002603, n 1.008665 amu. How much energy is released per fusion event? (1 amu = 931.5 MeV; enter a number in MeV.)',
      a: s(E, 3) + ' MeV', num: E,
      why: `Δm = (2.014102 + 3.016049) − (4.002603 + 1.008665) = ${dm.toFixed(6)} amu. E = ${dm.toFixed(6)} × 931.5 = ${s(E, 3)} MeV per event.`,
      h: ['Sum the reactant masses and the product masses.', 'Δm = reactants − products.', 'Δm ≈ 0.0189 amu.'] }); }

  { const dm = 235.043930 + mn - 140.914411 - 91.926156 - 3 * mn, E = dm * MeV;
    add({ l: 28, t: 4, tag: 'Exam',
      q: 'For the fission ²³⁵U + ¹n → ¹⁴¹Ba + ⁹²Kr + 3 ¹n, the masses are ²³⁵U 235.043930, ¹⁴¹Ba 140.914411, ⁹²Kr 91.926156 and n 1.008665 amu. How much energy is released per fission? (1 amu = 931.5 MeV)',
      c: [s(E, 3) + ' MeV', s((235.043930 + mn - 140.914411 - 91.926156 - mn) * MeV, 3) + ' MeV', s((235.043930 - 140.914411 - 91.926156 - 3 * mn) * MeV, 3) + ' MeV', s(dm, 3) + ' MeV', s(E / 236, 3) + ' MeV'],
      sort: true,
      why: `Δm = (235.043930 + 1.008665) − (140.914411 + 91.926156 + 3 × 1.008665) = ${dm.toFixed(6)} amu. E = ${dm.toFixed(6)} × 931.5 = ${s(E, 3)} MeV. The wrong choices count only one neutron on the right, drop the incoming neutron, leave the answer in amu, or divide by the 236 nucleons. Fission releases about ten times more energy per event than D-T fusion, but far less per gram of fuel.`,
      h: ['Count every neutron on both sides.', 'Left: 236.052595 amu. Right: 140.914411 + 91.926156 + 3.025995.', 'Δm ≈ 0.186 amu.'] }); }

  add({ l: 28, t: 2, tag: 'Calculation',
    q: 'If 1.00 g of matter were converted completely into energy, how much energy would be released? (c = 2.998 × 10⁸ m/s)',
    c: ['8.99 × 10¹³ J', '8.99 × 10¹⁶ J', '3.00 × 10⁵ J', '8.99 × 10¹⁰ J', '3.00 × 10⁸ J'],
    why: 'E = mc² = (1.00 × 10⁻³ kg)(2.998 × 10⁸ m/s)² = 8.99 × 10¹³ J. Using 1.00 kg gives 8.99 × 10¹⁶ J; forgetting to square c gives 3.00 × 10⁵ J.',
    h: ['Mass must be in kilograms.', 'E = mc².', '10⁻³ × 8.988 × 10¹⁶.'] });

  { const dm = 8.90e5 / (c * c) * 1000;
    add({ l: 28, t: 3, tag: 'Calculation',
      q: 'Burning 1 mol of CH₄ releases 890 kJ. What mass is "lost" (converted to energy) in this chemical reaction? (c = 2.998 × 10⁸ m/s)',
      c: [sci(dm, 3) + ' g', sci(dm / 1000, 3) + ' g', s(8.90e5 / c * 1000, 3) + ' g', sci(8.90e5 * c * c * 1000, 3) + ' g', '16.0 g'],
      sort: true,
      why: `Δm = E/c² = 8.90 × 10⁵ J ÷ (2.998 × 10⁸ m/s)² = ${sci(dm / 1000, 3)} kg = ${sci(dm, 3)} g - far too small to weigh, which is why mass is "conserved" in chemical reactions. The traps: reporting the kg value as grams, not squaring c, multiplying by c² instead of dividing, or confusing the energy with the 16.0 g of methane burned.`,
      h: ['E = Δmc², solve for Δm.', 'E must be in joules; Δm comes out in kg.', '8.90 × 10⁵ ÷ 8.988 × 10¹⁶, then kg → g.'] }); }

  add({ l: 28, t: 1, tag: 'Concept',
    q: 'Which description of nuclear fission is correct?',
    c: ['A heavy nucleus splits into two medium-mass nuclei plus neutrons, releasing energy', 'Two light nuclei join into a heavier nucleus, releasing energy', 'A nucleus emits an α particle', 'A nucleus captures an electron from its inner shell', 'A medium-mass nucleus such as ⁵⁶Fe splits, releasing a large amount of energy'],
    why: 'Fission splits a heavy nucleus (e.g. ²³⁵U after absorbing a neutron) into two lighter fragments and 2-3 neutrons. Joining light nuclei is fusion. ⁵⁶Fe sits at the top of the binding-energy curve, so splitting it would ABSORB energy.',
    h: ['"Fission" means splitting.', 'Which nuclei release energy when split?', 'Heavy ones like uranium.'] });

  add({ l: 28, t: 2, tag: 'Concept',
    q: 'Binding energy per nucleon is highest for nuclides near ⁵⁶Fe. Which conclusion follows?',
    c: ['Very heavy nuclei release energy by fission and very light nuclei release energy by fusion', 'All nuclei release energy by fusion', 'All nuclei release energy by fission', 'Iron can release more energy by fusion than hydrogen can', 'Heavy nuclei release energy by fusion and light nuclei by fission'],
    why: 'Energy is released whenever the products have a HIGHER binding energy per nucleon. Moving toward ⁵⁶Fe from either side does that: heavy nuclei split (fission), light nuclei join (fusion). Iron itself cannot release energy either way - which is why it accumulates in dying stars.',
    h: ['Energy is released when nucleons become more tightly bound.', 'Both sides of the curve move toward the peak.', 'Heavy → split; light → join.'] });

  add({ l: 28, t: 2, tag: 'Concept',
    q: 'In a nuclear fission chain reaction, what is the critical mass?',
    c: ['The minimum mass of fissionable material in which, on average, at least one neutron from each fission causes another fission', 'The mass of uranium that releases 1 MeV', 'The mass lost as energy in one fission event', 'The maximum mass of fuel a reactor can hold safely', 'The mass of a neutron'],
    why: 'Each fission releases 2-3 neutrons. In a small piece too many escape through the surface; at the critical mass enough are captured to keep the reaction going (one new fission per fission). Above it (supercritical) the rate grows rapidly.',
    h: ['Think about neutrons escaping from a small sample.', 'A chain reaction must sustain itself.', 'One neutron per fission must go on to cause another.'] });

  add({ l: 28, t: 2, tag: 'Concept',
    q: 'In a nuclear power reactor, what are the jobs of the moderator and the control rods?',
    c: ['Moderator (water or graphite) slows the neutrons; control rods (cadmium or boron) absorb neutrons to control the rate', 'Moderator absorbs neutrons; control rods slow them down', 'Moderator cools the turbine; control rods produce neutrons', 'Both speed up neutrons so they can split ²³⁸U', 'Moderator stores the spent fuel; control rods contain the uranium fuel'],
    why: 'Slow (thermal) neutrons are captured by ²³⁵U far more efficiently, so a moderator such as water or graphite slows them. Control rods of Cd or B absorb neutrons; pushing them in lowers the rate, pulling them out raises it. A separate coolant carries heat to make steam.',
    h: ['Which part speeds things up and which slows the reaction?', '²³⁵U captures SLOW neutrons best.', 'Control rods soak up neutrons.'] });

  add({ l: 28, t: 2, tag: 'Concept',
    q: 'Why does nuclear fusion require temperatures of millions of kelvin?',
    c: ['The positively charged nuclei must move fast enough to overcome their electrostatic repulsion', 'Fusion is endothermic and must absorb heat', 'Heat is needed to remove the neutrons from the nuclei', 'High temperature turns the nuclei into neutrons', 'Heat speeds up radioactive decay'],
    why: 'Nuclei are positive and repel each other. Only at enormous temperatures (as in the Sun\'s core) do they collide hard enough to get close enough for the strong nuclear force to take over. Fusion of light nuclei is strongly EXOTHERMIC once it happens.',
    h: ['What charge do nuclei carry?', 'Like charges repel.', 'They need very high kinetic energy to get close.'] });

  add({ l: 28, t: 1, tag: 'Concept',
    q: 'Positron emission tomography (PET) uses isotopes such as ¹⁸F. What is actually detected?',
    c: ['Two γ photons travelling in opposite directions, produced when a positron annihilates an electron', 'The positrons themselves as they leave the body', 'α particles emitted by the isotope', 'Neutrons released by the isotope', 'Radio waves emitted by the fluorine nucleus'],
    why: 'The emitted positron travels a millimetre or so, meets an electron and both annihilate into two 511 keV γ photons flying in opposite directions. Detectors around the patient record the pairs and locate where the tracer (e.g. ¹⁸F-glucose) has gathered.',
    h: ['A positron is antimatter.', 'Positron + electron → energy.', 'The energy leaves as a pair of photons.'] });

  add({ l: 28, t: 2, tag: 'Concept',
    q: 'Why can a radioactive isotope be used as a tracer to follow an element through a living organism?',
    c: ['A radioisotope behaves chemically like the stable isotopes of the element, but its radiation reveals where it goes', 'Radioactive atoms move faster than stable atoms', 'Radioactive atoms react only with specific organs', 'The radiation makes the organism absorb more of the element', 'Radioactive atoms cannot be metabolized, so they stay put'],
    why: 'Chemistry depends on electrons, which are the same for every isotope of an element. So ¹³¹I is taken up by the thyroid exactly like ordinary iodine, and its emissions show where it went. Tracers follow the normal path; they do not change it.',
    h: ['What determines how an atom reacts chemically?', 'Isotopes have identical electron arrangements.', 'Same chemistry, plus a signal.'] });

  add({ l: 28, t: 3, tag: 'Concept',
    q: 'Which isotope is best suited for diagnostic imaging inside the body?',
    c: ['Tc-99m: γ emitter, t½ = 6.0 h', 'Pu-239: α emitter, t½ = 24,100 yr', 'C-14: β⁻ emitter, t½ = 5730 yr', 'Sr-90: β⁻ emitter, t½ = 28.8 yr', 'Rn-222: α emitter, t½ = 3.8 d'],
    why: 'An imaging isotope needs radiation that escapes the body to reach a detector (γ, penetrating) and a short half-life so the patient\'s dose ends quickly. ⁹⁹ᵐTc has both. α emitters damage tissue and cannot be seen from outside; long half-lives keep irradiating the patient.',
    h: ['The radiation must get OUT of the body.', 'The dose should not linger.', 'Penetrating radiation + short half-life.'] });

  /* ---------------- more numeric practice ---------------- */
  add({ l: 27, t: 2, tag: 'Calculation',
    q: 'Uranium-238 (Z = 92) emits an α particle. How many neutrons are in the daughter nucleus? (Enter a whole number.)',
    a: '144', num: 144, abs: 0.5,
    why: '²³⁸₉₂U → ⁴₂He + ²³⁴₉₀Th. The daughter has A = 234 and Z = 90, so N = 234 − 90 = 144. (The parent had 146; α removes 2 neutrons.)',
    h: ['Write the daughter’s A and Z first.', 'α: A − 4, Z − 2.', 'N = 234 − 90.'] });

  add({ l: 27, t: 2, tag: 'Calculation',
    q: 'Carbon-14 (Z = 6) undergoes β⁻ decay. How many protons are in the daughter nucleus? (Enter a whole number.)',
    a: '7', num: 7, abs: 0.5,
    why: '¹⁴₆C → ¹⁴₇N + ⁰₋₁β. A neutron turns into a proton, so the daughter has 6 + 1 = 7 protons (nitrogen).',
    h: ['β⁻ changes a neutron into a proton.', 'Z goes up by 1.', '6 + 1 protons.'] });

  add({ l: 28, t: 2, tag: 'Calculation',
    q: 'What percentage of a radioactive sample remains after five half-lives? (Enter a number in %.)',
    a: '3.12 %', num: 3.125,
    why: '(½)⁵ = 1/32 = 0.03125 = 3.125%, which is 3.12% to three sig figs - this course rounds an exact 5 to the even digit (Lecture 1).',
    h: ['Multiply by ½ once per half-life.', 'Compute (½)⁵.', '1/32 as a percent.'] });

  { const t = 8.02 * Math.log(1.00 / 0.125) / ln2;
    add({ l: 28, t: 2, tag: 'Calculation',
      q: 'Iodine-131 has a half-life of 8.02 days. How many days does it take a 1.00 mg sample to decay to 0.125 mg? (Enter a number in days.)',
      a: s(t, 3) + ' days', num: t,
      why: '1.00 → 0.500 → 0.250 → 0.125 mg is three half-lives: 3 × 8.02 = 24.1 days.',
      h: ['What fraction of the sample remains?', '0.125 = (½)ⁿ.', 'n = 3 half-lives.'] }); }

  { const N = 5.00 * Math.exp(-ln2 * 10.0 / 3.82);
    add({ l: 28, t: 4, tag: 'Calculation',
      q: 'Radon-222 has a half-life of 3.82 days. What mass remains from a 5.00 g sample after 10.0 days? (Enter a number in g.)',
      a: s(N, 3) + ' g', num: N, tol: 0.02,
      why: `k = 0.693/3.82 d = ${s(ln2 / 3.82, 4)} d⁻¹. N = 5.00 g × e^(−${s(ln2 / 3.82, 4)} × 10.0) = 5.00 × ${s(Math.exp(-ln2 * 10.0 / 3.82), 4)} = ${s(N, 3)} g. (10.0 days is 2.62 half-lives, so the answer must fall between 1.25 g and 0.625 g.)`,
      h: ['10.0 days is not a whole number of half-lives.', 'N = N₀e^(−kt), k = 0.693/t½.', 'kt ≈ 1.81.'] }); }

  { const t = 5.27 * Math.log(1 / 0.300) / ln2;
    add({ l: 28, t: 3, tag: 'Calculation',
      q: 'Cobalt-60 has a half-life of 5.27 yr. How long does it take for a cobalt-60 source to fall to 30.0% of its original activity? (Enter a number in years.)',
      a: s(t, 3) + ' yr', num: t,
      why: `k = 0.693/5.27 = ${s(ln2 / 5.27, 4)} yr⁻¹. t = ln(1/0.300)/k = ${s(Math.log(1 / 0.3), 4)}/${s(ln2 / 5.27, 4)} = ${s(t, 3)} yr.`,
      h: ['ln(A/A₀) = −kt.', 'A/A₀ = 0.300; k = 0.693/5.27.', 'ln(0.300) = −1.204.'] }); }

  { const atoms = 0.75 * 1.00e-3 / 32.0 * NA;
    add({ l: 28, t: 4, tag: 'Exam',
      q: 'A 1.00 mg sample of phosphorus-32 (32.0 g/mol, t½ = 14.3 days) is stored for 28.6 days. How many ³²P atoms DECAYED in that time?',
      c: [sci(atoms, 3) + ' atoms', sci(0.25 * 1.00e-3 / 32.0 * NA, 3) + ' atoms', sci(0.75 * 1.00 / 32.0 * NA, 3) + ' atoms', sci(0.75 * 1.00e-3 * NA, 3) + ' atoms', sci(0.5 * 1.00e-3 / 32.0 * NA, 3) + ' atoms'],
      sort: true,
      why: `28.6 days = 2 half-lives, so ¼ remains and ¾ decayed. Atoms at the start = (1.00 × 10⁻³ g ÷ 32.0 g/mol)(6.022 × 10²³) = ${sci(1.00e-3 / 32.0 * NA, 4)}. Decayed = 0.750 × that = ${sci(atoms, 3)} atoms. The traps: counting the atoms that REMAIN (¼), leaving mg as g, skipping the molar mass, or using one half-life.`,
      h: ['How many half-lives is 28.6 days?', 'Decayed fraction = 1 − (½)ⁿ; then mg → g → mol → atoms.', '¾ of 1.88 × 10¹⁹ atoms.'] }); }

  add({ l: 28, t: 4, tag: 'Exam',
    q: 'Samples of isotope A (t½ = 2.0 h) and isotope B (t½ = 6.0 h) start with equal numbers of nuclei. After 12.0 h, what is the ratio N(A)/N(B)?',
    c: ['0.0625', '0.333', '3.00', '16.0', '0.500'],
    why: 'In 12.0 h, A goes through 6 half-lives: (½)⁶ = 1/64. B goes through 2: (½)² = 1/4. N(A)/N(B) = (1/64)/(1/4) = 1/16 = 0.0625. 0.333 is the ratio of the half-lives (a linear assumption); 16.0 is the ratio upside down.',
    h: ['Count half-lives separately for each isotope.', 'A: 6 half-lives; B: 2 half-lives.', '(½)⁶ ÷ (½)².'] });

  { const per = 173.3, N = 1.00 / 235.04 * NA, kJ = N * per * 1.602e-13 / 1000;
    add({ l: 28, t: 4, tag: 'Calculation',
      q: 'Each fission of a uranium-235 nucleus releases about 173.3 MeV. How much energy is released by the complete fission of 1.00 g of ²³⁵U (235.04 g/mol)? (1 MeV = 1.602 × 10⁻¹³ J; enter a number in kJ.)',
      a: sci(kJ, 3) + ' kJ', num: kJ,
      why: `Nuclei = (1.00 g ÷ 235.04 g/mol)(6.022 × 10²³) = ${sci(N, 4)}. Energy = ${sci(N, 4)} × 173.3 MeV × 1.602 × 10⁻¹³ J/MeV = ${sci(kJ * 1000, 4)} J = ${sci(kJ, 3)} kJ - about what burning 2.5 tonnes of coal gives.`,
      h: ['grams → moles → nuclei.', 'Multiply by MeV per fission, then MeV → J → kJ.', 'About 2.56 × 10²¹ nuclei.'] }); }

  add({ l: 28, t: 3, tag: 'Trap',
    q: 'Which statement about nuclear binding energy is FALSE?',
    c: ['A nucleus has MORE mass than the protons and neutrons that make it up', 'Binding energy is the energy needed to break a nucleus into its separate nucleons', 'Binding energy per nucleon is a measure of nuclear stability', 'The mass defect and the binding energy are related by E = Δmc²', '⁵⁶Fe has one of the highest binding energies per nucleon'],
    why: 'A nucleus has LESS mass than its separated nucleons - the difference (mass defect) was released as binding energy when it formed. All the other statements are true.',
    h: ['Forming a nucleus releases energy.', 'Released energy carries mass away (E = mc²).', 'So is the nucleus lighter or heavier than its parts?'] });

  add({ l: 27, t: 3, tag: 'Concept',
    q: 'A nuclide lies ABOVE the band of stability (its N/Z ratio is too high). Which decay process would bring it closer to the band?',
    c: ['β⁻ emission, which lowers N by 1 and raises Z by 1', 'Positron emission, which raises N by 1 and lowers Z by 1', 'Electron capture, which raises N by 1 and lowers Z by 1', 'Gamma emission, which lowers N/Z directly', 'Neutron capture, which raises N by 1'],
    why: 'Too many neutrons: convert a neutron into a proton. β⁻ decay does exactly that (n → p + e⁻), lowering N and raising Z, so N/Z drops. Positron emission and electron capture do the opposite and suit neutron-poor nuclides; γ changes neither N nor Z; neutron capture makes things worse.',
    h: ['"Above the band" means neutron-rich.', 'You need fewer neutrons and more protons.', 'Which decay turns n into p?'] });

  return Q;
};
