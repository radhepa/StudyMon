/* Chapter 94 - Final review: cumulative cross-chapter problems (lectures 1-28), extra weight on
   gases and nuclear, plus ten Ch 1-4 refresher items. Part of gen-final.cjs. */
module.exports = function (H) {
  const { s, sci, f, K, R, R8, NA, h, c, me, mm } = H;
  const Q = [];
  const add = q => Q.push(q);
  const hc = h * c;

  /* ================= Ch 1-4 refresher, final style ================= */
  add({ l: 1, t: 3, tag: 'Trap',
    q: 'Report the result of (12.50 − 3.1) × 2.000 with the correct number of significant figures.',
    c: ['19', '18.8', '18.80', '18.800', '20.'],
    why: 'Subtraction first: 12.50 − 3.1 = 9.4, kept to ONE decimal place (3.1 has one), so it has 2 sig figs. Then 9.4 × 2.000 = 18.8, which must be reported to 2 sig figs: 19. Carrying 18.8 or 18.80 ignores the subtraction rule; 20. rounds to too few.',
    h: ['Mixed operations: do the subtraction and note its sig figs.', 'Subtraction keeps the fewest DECIMAL PLACES.', '9.4 has two sig figs.'] });

  add({ l: 1, t: 2, tag: 'Calculation',
    q: 'Ethanol has a density of 0.791 g/mL. What is its density in kg/m³?',
    c: ['791 kg/m³', '0.791 kg/m³', '7.91 × 10⁻⁴ kg/m³', '7.91 × 10⁵ kg/m³', '79.1 kg/m³'],
    why: '0.791 g/mL × (1 kg/1000 g) × (10⁶ mL/1 m³) = 791 kg/m³. 1 m³ = (100 cm)³ = 10⁶ cm³ = 10⁶ mL - cubing the factor is the step people miss, and it is what separates 791 from 0.791 or 7.91 × 10⁻⁴.',
    h: ['Two conversions: g → kg and mL → m³.', '1 m³ = 10⁶ mL (cube the 100 cm/m).', '0.791 × 10⁶ ÷ 1000.'] });

  add({ l: 2, t: 2, tag: 'Concept',
    q: 'How many protons, neutrons and electrons are in the ion ⁵⁶Fe³⁺?',
    c: ['26 p, 30 n, 23 e⁻', '26 p, 30 n, 29 e⁻', '26 p, 56 n, 23 e⁻', '23 p, 30 n, 26 e⁻', '30 p, 26 n, 23 e⁻'],
    why: 'Fe has Z = 26 protons. Neutrons = 56 − 26 = 30. A 3+ ion has LOST three electrons: 26 − 3 = 23. 29 electrons adds the charge instead of subtracting it; 56 neutrons confuses A with N.',
    h: ['Z comes from the periodic table.', 'N = A − Z; electrons = Z − charge.', '26 − 3 electrons.'] });

  add({ l: 2, t: 1, tag: 'Concept',
    q: 'What is the name of Fe₂(SO₄)₃?',
    c: ['iron(III) sulfate', 'iron(II) sulfate', 'diiron trisulfate', 'iron(III) sulfite', 'iron sulfide'],
    why: 'Three SO₄²⁻ carry 6− in total, shared between two Fe, so each Fe is 3+: iron(III). SO₄²⁻ is sulfate (SO₃²⁻ is sulfite, S²⁻ sulfide). Ionic compounds do not use Greek prefixes.',
    h: ['Find the charge on each Fe from the anion charge.', '3 × (2−) = 6− over 2 Fe atoms.', 'Fe³⁺ with SO₄²⁻.'] });

  { const x = (70.925 - 69.723) / (70.925 - 68.926);
    add({ l: 2, t: 3, tag: 'Calculation',
      q: 'Gallium (average atomic mass 69.723 amu) has two isotopes: ⁶⁹Ga (68.926 amu) and ⁷¹Ga (70.925 amu). What is the percent abundance of ⁶⁹Ga?',
      c: [f(x * 100, 1) + '%', f((1 - x) * 100, 1) + '%', '50.0%', '69.7%', f(68.926 / 69.723 * 100, 1) + '%'],
      sort: true,
      why: `Let x = fraction of ⁶⁹Ga: 68.926x + 70.925(1 − x) = 69.723 → 70.925 − 1.999x = 69.723 → x = 1.202/1.999 = ${x.toFixed(4)} = ${f(x * 100, 1)}%. Check: the average (69.723) is closer to 68.926, so ⁶⁹Ga must be the more abundant isotope. ${f((1 - x) * 100, 1)}% is ⁷¹Ga.`,
      h: ['Average mass = Σ(mass × fraction).', 'Let the two fractions be x and 1 − x.', 'Solve 68.926x + 70.925(1 − x) = 69.723.'] }); }

  add({ l: 3, t: 3, tag: 'Calculation',
    q: 'A compound is 40.0% C, 6.71% H and 53.3% O by mass, and its molar mass is 180.16 g/mol. What is its molecular formula?',
    c: ['C₆H₁₂O₆', 'CH₂O', 'C₂H₄O₂', 'C₃H₆O₃', 'C₆H₆O₆'],
    why: 'Per 100 g: C 40.0/12.01 = 3.33 mol; H 6.71/1.008 = 6.66 mol; O 53.3/16.00 = 3.33 mol → ratio 1 : 2 : 1, empirical formula CH₂O (30.03 g/mol). 180.16/30.03 = 6.00, so the molecular formula is C₆H₁₂O₆. CH₂O is only the empirical formula.',
    h: ['Assume 100 g and convert each mass to moles.', 'Divide by the smallest to get the empirical formula.', 'Molar mass ÷ empirical-formula mass = 6.'] });

  { const MAl = mm('AlCl3'), nAl = 10.0 / 26.98, nCl = 35.0 / 70.90, g = nCl * 2 / 3 * MAl;
    add({ l: 4, t: 3, tag: 'Exam',
      q: 'For 2Al(s) + 3Cl₂(g) → 2AlCl₃(s), 10.0 g of Al reacts with 35.0 g of Cl₂. What mass of AlCl₃ can form?',
      c: [s(g, 3) + ' g', s(nAl * MAl, 3) + ' g', '45.0 g', s(nCl * MAl, 3) + ' g', s(nCl * 3 / 2 * MAl, 3) + ' g'],
      sort: true,
      why: `From Al: 10.0/26.98 = ${s(nAl, 4)} mol Al → ${s(nAl, 4)} mol AlCl₃ (2 : 2). From Cl₂: 35.0/70.90 = ${s(nCl, 4)} mol Cl₂ × 2/3 = ${s(nCl * 2 / 3, 4)} mol AlCl₃. Cl₂ makes less, so it is limiting: ${s(nCl * 2 / 3, 4)} mol × ${f(MAl, 2)} g/mol = ${s(g, 3)} g. ${s(nAl * MAl, 3)} g treats Al as limiting; 45.0 g just adds the masses (only true if nothing were left over).`,
      h: ['Find moles of product from EACH reactant.', 'The reactant that makes less product is limiting.', 'Cl₂: 0.4937 mol × 2/3.'] }); }

  add({ l: 5, t: 2, tag: 'Calculation',
    q: '25.0 mL of 6.00 M HCl is diluted with water to a final volume of 500.0 mL. What is the new concentration?',
    c: ['0.300 M', '120. M', '0.150 M', '3.00 M', '0.0300 M'],
    why: 'M₁V₁ = M₂V₂: M₂ = (6.00 M)(25.0 mL)/(500.0 mL) = 0.300 M. 120 M inverts the volumes (a dilution cannot raise the concentration).',
    h: ['Moles of HCl do not change on dilution.', 'M₁V₁ = M₂V₂.', '6.00 × 25.0 ÷ 500.0.'] });

  { const n = 0.4512 / 204.22, M = n / 0.02235;
    add({ l: 6, t: 3, tag: 'Calculation',
      q: 'A 0.4512 g sample of KHP (KHC₈H₄O₄, 204.22 g/mol, one acidic H) is titrated to the equivalence point with 22.35 mL of NaOH. What is the molarity of the NaOH? (Enter a number in M.)',
      a: s(M, 4) + ' M', num: M,
      why: `n(KHP) = 0.4512/204.22 = ${sci(n, 4)} mol = n(NaOH) (1 : 1). M = ${sci(n, 4)} mol ÷ 0.02235 L = ${s(M, 4)} M.`,
      h: ['At the equivalence point mol OH⁻ = mol acidic H.', 'KHP : NaOH = 1 : 1; convert mL to L.', '0.002209 mol ÷ 0.02235 L.'] }); }

  add({ l: 6, t: 2, tag: 'Exam',
    q: 'What is the net ionic equation when aqueous Pb(NO₃)₂ and KI are mixed?',
    c: ['Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)', 'K⁺(aq) + NO₃⁻(aq) → KNO₃(s)', 'Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s) + 2KNO₃(aq)', 'Pb²⁺(aq) + I⁻(aq) → PbI(s)', 'No reaction occurs'],
    why: 'Iodides are soluble EXCEPT with Ag⁺, Pb²⁺, Cu⁺ and Hg₂²⁺, so PbI₂ precipitates; KNO₃ is soluble (K⁺ and NO₃⁻ are spectators). The net ionic equation keeps only the species that change. The full Pb(NO₃)₂ + 2KI equation is the molecular equation, not the net ionic one; PbI has the wrong formula; KNO₃ is soluble.',
    h: ['Which product is insoluble?', 'Pb²⁺ is an exception for halides.', 'Cross out K⁺ and NO₃⁻.'] });

  /* ================= cross-chapter: gases + stoichiometry ================= */
  { const nMg = 0.500 / 24.31, nHCl = 0.0500 * 0.300, nH2 = nHCl / 2, V = nH2 * R * K(25);
    add({ l: 26, t: 4, tag: 'Exam',
      q: 'A 0.500 g piece of Mg is dropped into 50.0 mL of 0.300 M HCl: Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g). What volume of H₂ forms at 25 °C and 1.00 atm?',
      c: [s(V, 3) + ' L', s(nMg * R * K(25), 3) + ' L', s(nHCl * R * K(25), 3) + ' L', s(nH2 * 22.4, 3) + ' L', s(nH2 * R * 25, 3) + ' L'],
      sort: true,
      why: `n(Mg) = 0.500/24.31 = ${s(nMg, 4)} mol; n(HCl) = 0.0500 L × 0.300 M = ${s(nHCl, 3)} mol. Mg could make ${s(nMg, 4)} mol H₂ but HCl only ${s(nHCl, 3)}/2 = ${s(nH2, 3)} mol - HCl is limiting. V = nRT/P = (${s(nH2, 3)})(0.08206)(298.15)/1.00 = ${s(V, 3)} L. ${s(nMg * R * K(25), 3)} L assumes Mg is limiting; ${s(nHCl * R * K(25), 3)} L forgets the 2 : 1 ratio; 22.4 L/mol applies only at STP.`,
      h: ['Two reactant amounts: find the limiting one.', 'mol HCl = M × V; H₂ = HCl ÷ 2.', 'HCl gives 0.00750 mol H₂.'] }); }

  { const nH2 = 12.0 / (R * K(25)), nN2 = 5.00 / (R * K(25)), M3 = mm('NH3');
    add({ l: 26, t: 4, tag: 'Exam',
      q: 'For N₂(g) + 3H₂(g) → 2NH₃(g), 5.00 L of N₂ and 12.0 L of H₂, both at 25 °C and 1.00 atm, react as completely as possible. What mass of NH₃ forms?',
      c: [s(nH2 * 2 / 3 * M3, 3) + ' g', s(nN2 * 2 * M3, 3) + ' g', s(12.0 / 22.4 * 2 / 3 * M3, 3) + ' g', s(nH2 * M3, 3) + ' g', s(nH2 / 3 * M3, 3) + ' g'],
      sort: true,
      why: `5.00 L N₂ would need 15.0 L H₂ (1 : 3 by volume), but only 12.0 L is present, so H₂ is limiting. n(H₂) = PV/RT = 12.0/(0.08206 × 298.15) = ${s(nH2, 4)} mol → NH₃ = ${s(nH2, 4)} × 2/3 = ${s(nH2 * 2 / 3, 4)} mol × ${f(M3, 2)} g/mol = ${s(nH2 * 2 / 3 * M3, 3)} g. Treating N₂ as limiting, using 22.4 L/mol at 25 °C, or skipping the 2/3 ratio gives the others.`,
      h: ['Find the limiting gas using the 1 : 3 volume ratio.', 'Then PV = nRT for the limiting gas, and the mole ratio to NH₃.', 'H₂ is limiting: 0.4905 mol.'] }); }

  { const dH = -393.5 + 2 * -285.8 - -74.9, n = 5.00 / 22.4;
    add({ l: 9, t: 4, tag: 'Exam',
      q: 'How much heat is released when 5.00 L of CH₄ at STP burns completely: CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)? (ΔH°f, kJ/mol: CH₄(g) −74.9, CO₂(g) −393.5, H₂O(l) −285.8)',
      c: [s(-dH * n, 3) + ' kJ', s((393.5 + 2 * 241.8 - 74.9) * n, 3) + ' kJ', s(-dH, 3) + ' kJ', s((393.5 + 285.8 - 74.9) * n, 3) + ' kJ', sci(-dH * 5.00, 3) + ' kJ'],
      sort: true,
      why: `ΔH°rxn = [−393.5 + 2(−285.8)] − [−74.9] = ${f(dH, 1)} kJ per mol CH₄. n(CH₄) = 5.00 L ÷ 22.4 L/mol = ${s(n, 4)} mol. Heat released = ${s(n, 4)} × ${f(-dH, 1)} = ${s(-dH * n, 3)} kJ. Using H₂O(g) (−241.8), forgetting the 2 on water, stopping at the per-mole value, or treating 5.00 L as 5.00 mol gives the others.`,
      h: ['Two parts: ΔH per mole from ΔH°f, and moles of CH₄ from the gas volume.', 'Read the phase of water; multiply by its coefficient.', 'ΔH = −890.2 kJ/mol; n = 0.2232 mol.'] }); }

  { const n = 2.00 / (R * K(25)), q = n * 2219.9, m = q * 1000 / (4.184 * 50.0) / 1000;
    add({ l: 8, t: 4, tag: 'Exam',
      q: 'Burning propane releases 2219.9 kJ per mole (C₃H₈ + 5O₂ → 3CO₂ + 4H₂O(l)). What mass of water can be warmed by 50.0 °C by burning 2.00 L of propane measured at 25 °C and 1.00 atm, if all the heat goes into the water? (c(water) = 4.184 J/(g·°C); enter a number in kg.)',
      a: s(m, 3) + ' kg', num: m,
      why: `n(C₃H₈) = PV/RT = 2.00/(0.08206 × 298.15) = ${s(n, 4)} mol. Heat = ${s(n, 4)} × 2219.9 kJ = ${s(q, 4)} kJ = ${sci(q * 1000, 4)} J. m = q/(cΔT) = ${sci(q * 1000, 4)}/(4.184 × 50.0) = ${s(m * 1000, 4)} g = ${s(m, 3)} kg.`,
      h: ['Gas volume → moles → heat → mass of water.', 'q(water) = m c ΔT with q in joules.', 'Heat ≈ 181.5 kJ.'] }); }

  { const E = 496e3 / NA, lam = hc / E;
    add({ l: 14, t: 4, tag: 'Exam',
      q: 'The first ionization energy of sodium is 496 kJ/mol. What is the LONGEST wavelength of light whose photons can ionize a single gaseous Na atom?',
      c: [s(lam * 1e9, 3) + ' nm', sci(hc / (496 / NA) * 1e9, 3) + ' nm', sci(hc / 496e3 * 1e9, 3) + ' nm', s(lam * 1e9 / 2, 3) + ' nm', 'Any wavelength works if the light is bright enough'],
      why: `One photon ionizes one atom, so use the energy PER ATOM: 496 × 10³ J/mol ÷ 6.022 × 10²³ = ${sci(E, 4)} J. λ = hc/E = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/${sci(E, 4)} = ${sci(lam, 4)} m = ${s(lam * 1e9, 3)} nm (ultraviolet). Leaving kJ unconverted or skipping Avogadro's number gives the absurd values. A 121 nm photon could also ionize Na, but it is not the LONGEST wavelength that works. Brightness never substitutes for photon energy (the photoelectric threshold).`,
      h: ['A photon acts on ONE atom: convert kJ/mol to J/atom.', '× 1000, ÷ 6.022 × 10²³, then λ = hc/E.', 'E ≈ 8.24 × 10⁻¹⁹ J per atom.'] }); }

  { const per = 2.18e-18 / 4, kJ = per * NA / 1000;
    add({ l: 11, t: 3, tag: 'Calculation',
      q: 'Using the Bohr model (Eₙ = −2.18 × 10⁻¹⁸ J/n²), how much energy is needed to ionize one MOLE of hydrogen atoms that are all in the n = 2 state?',
      c: [s(kJ, 3) + ' kJ/mol', sci(2.18e-18 * NA / 1000, 3) + ' kJ/mol', s(2.18e-18 * 0.75 * NA / 1000, 3) + ' kJ/mol', s(2.18e-18 / 2 * NA / 1000, 3) + ' kJ/mol', sci(per / 1000, 3) + ' kJ/mol'],
      sort: true,
      why: `Ionization takes the electron from n = 2 to n = ∞: ΔE = 0 − (−2.18 × 10⁻¹⁸/2²) = ${sci(per, 3)} J per atom. Per mole: ${sci(per, 3)} × 6.022 × 10²³ = ${sci(per * NA, 4)} J = ${s(kJ, 3)} kJ/mol. ${sci(2.18e-18 * NA / 1000, 3)} kJ/mol starts from n = 1; ${s(2.18e-18 * 0.75 * NA / 1000, 3)} kJ/mol is the 1 → 2 excitation; dividing by n instead of n² gives ${s(2.18e-18 / 2 * NA / 1000, 3)}.`,
      h: ['Ionization = moving the electron to n = ∞.', 'E needed per atom = 2.18 × 10⁻¹⁸/2².', 'Then × N_A and J → kJ.'] }); }

  { const dE = 2.18e-18 * (1 / 4 - 1 / 9), lam = hc / dE * 1e9;
    add({ l: 11, t: 3, tag: 'Calculation',
      q: 'What is the wavelength of the photon emitted when a hydrogen electron falls from n = 3 to n = 2? (Eₙ = −2.18 × 10⁻¹⁸ J/n²)',
      c: [s(lam, 3) + ' nm', s(hc / (2.18e-18 * (1 / 2 - 1 / 3)) * 1e9, 3) + ' nm', s(hc / (2.18e-18 * (1 - 1 / 9)) * 1e9, 3) + ' nm', s(hc / (2.18e-18 / 4) * 1e9, 3) + ' nm', s(hc / (2.18e-18 * (1 / 9 - 1 / 16)) * 1e9, 3) + ' nm'],
      sort: true,
      why: `|ΔE| = 2.18 × 10⁻¹⁸ (1/2² − 1/3²) = ${sci(dE, 4)} J per photon. λ = hc/|ΔE| = ${sci(lam * 1e-9, 4)} m = ${s(lam, 3)} nm, the red Balmer line. Using 1/n instead of 1/n² gives ${s(hc / (2.18e-18 * (1 / 2 - 1 / 3)) * 1e9, 3)} nm; the 3 → 1 and 4 → 3 transitions give the UV and IR choices.`,
      h: ['ΔE = 2.18 × 10⁻¹⁸ (1/n²final − 1/n²initial).', 'Square the n values.', 'λ = hc/|ΔE|; convert m to nm.'] }); }

  /* ================= periodicity, configuration, bonding ================= */
  add({ l: 14, t: 3, tag: 'Exam',
    q: 'Rank S²⁻, Cl⁻, K⁺ and Ca²⁺ in order of INCREASING radius.',
    c: ['Ca²⁺ < K⁺ < Cl⁻ < S²⁻', 'S²⁻ < Cl⁻ < K⁺ < Ca²⁺', 'K⁺ < Ca²⁺ < S²⁻ < Cl⁻', 'Cl⁻ < S²⁻ < Ca²⁺ < K⁺', 'They are all the same size because they are isoelectronic'],
    why: 'All four have 18 electrons ([Ar] configuration). With the same electrons, the ion with the most protons pulls them in hardest: Ca²⁺ (20 p) < K⁺ (19 p) < Cl⁻ (17 p) < S²⁻ (16 p). Isoelectronic does not mean equal size.',
    h: ['Count the electrons in each ion.', 'Same electron count: compare nuclear charge.', 'More protons → smaller ion.'] });

  add({ l: 14, t: 3, tag: 'Trap',
    q: 'What is the ground-state electron configuration of Mn²⁺, and how many unpaired electrons does it have?',
    c: ['[Ar] 3d⁵, 5 unpaired', '[Ar] 4s² 3d³, 3 unpaired', '[Ar] 4s² 3d⁵, 5 unpaired', '[Ar] 3d⁵, 1 unpaired', '[Ar] 4s¹ 3d⁴, 5 unpaired'],
    why: 'Mn is [Ar] 4s² 3d⁵. A transition-metal cation loses its 4s electrons FIRST: Mn²⁺ = [Ar] 3d⁵. By Hund\'s rule the five d electrons occupy five orbitals singly: 5 unpaired, paramagnetic. Removing 3d electrons first ([Ar] 4s² 3d³) is the classic trap; [Ar] 4s² 3d⁵ is neutral Mn.',
    h: ['Start from neutral Mn.', 'Remove 4s electrons before 3d.', 'Five d electrons in five orbitals.'] });

  add({ l: 14, t: 3, tag: 'Exam',
    q: 'An element X has successive ionization energies (kJ/mol) of 578, 1817, 2745 and 11,577. What is the formula of its oxide?',
    c: ['X₂O₃', 'XO', 'X₂O', 'XO₂', 'X₃O₂'],
    why: 'The huge jump comes after the THIRD electron, so X has 3 valence electrons and forms X³⁺ (this is Al). With O²⁻, charges balance as X₂O₃ (2 × 3+ = 3 × 2−).',
    h: ['Find the big jump in ionization energy.', 'The jump marks the start of core electrons.', '3 valence electrons → X³⁺.'] });

  add({ l: 13, t: 2, tag: 'Concept',
    q: 'Which set of quantum numbers (n, l, mₗ, mₛ) could describe the highest-energy electron in a ground-state gallium atom?',
    c: ['4, 1, 0, +½', '4, 0, 0, +½', '3, 2, 0, +½', '4, 2, 1, +½', '4, 1, 2, +½'],
    why: 'Ga = [Ar] 4s² 3d¹⁰ 4p¹, so the last electron is in 4p: n = 4, l = 1, mₗ = −1, 0 or +1. (4, 1, 0, +½) fits. 4, 0 is a 4s electron; 3, 2 is 3d; 4, 2 is a 4d orbital (empty in Ga); mₗ = 2 is impossible when l = 1.',
    h: ['Write gallium’s configuration.', 'p means l = 1.', 'mₗ must lie between −l and +l.'] });

  add({ l: 14, t: 3, tag: 'Trap',
    q: 'Which element has the larger first ionization energy, nitrogen or oxygen, and why?',
    c: ['Nitrogen, because oxygen’s fourth 2p electron is paired and the extra repulsion makes it easier to remove', 'Oxygen, because ionization energy always increases across a period', 'Oxygen, because it has more protons', 'Nitrogen, because nitrogen atoms are larger', 'They are equal because both are in period 2'],
    why: 'N (1402 kJ/mol) beats O (1314 kJ/mol), an exception to the trend. N’s 2p³ has one electron in each p orbital; O’s 2p⁴ puts two electrons in one orbital, and their mutual repulsion makes one easier to remove. "Always increases" misses the dip; N is actually slightly larger, which would make it EASIER to ionize, so size cannot be the reason.',
    h: ['This pair is one of the two dips in the IE trend.', 'Draw the 2p orbital diagrams for N and O.', 'Paired electrons repel.'] });

  add({ l: 18, t: 4, tag: 'Exam',
    q: 'An element with the ground-state configuration [Ne] 3s² 3p⁴ forms a molecular tetrafluoride. What are the shape and polarity of that molecule?',
    c: ['Seesaw, polar', 'Tetrahedral, nonpolar', 'Square planar, nonpolar', 'Trigonal pyramidal, polar', 'Tetrahedral, polar'],
    why: '[Ne] 3s² 3p⁴ is sulfur, so the molecule is SF₄. S has 6 valence electrons: 4 bonds + 1 lone pair = 5 electron groups (trigonal bipyramidal); the lone pair sits equatorial → seesaw. The asymmetric shape does not cancel the S−F dipoles → polar. "Tetrahedral" counts only the four bonds and forgets the lone pair.',
    h: ['Identify the element from its configuration.', 'Count bonds plus lone pairs on the central atom.', 'Five groups with one lone pair.'] });

  add({ l: 18, t: 3, tag: 'Exam',
    q: 'Which statement correctly describes sulfur trioxide (SO₃) and the sulfite ion (SO₃²⁻)?',
    c: ['SO₃ is trigonal planar; SO₃²⁻ is trigonal pyramidal', 'Both are trigonal planar', 'Both are trigonal pyramidal', 'SO₃ is trigonal pyramidal; SO₃²⁻ is trigonal planar', 'SO₃ is T-shaped; SO₃²⁻ is trigonal planar'],
    why: 'SO₃: 24 valence electrons; S has three bonding groups and no lone pair → trigonal planar (nonpolar). SO₃²⁻: 26 valence electrons; the extra two sit on S as a lone pair → 4 electron groups → trigonal pyramidal. Two extra electrons change the shape.',
    h: ['Count valence electrons, adding 2 for the 2− charge.', 'Where do the extra electrons go?', 'A lone pair on S makes a pyramid.'] });

  { const M = 2.86 * 22.4;
    add({ l: 19, t: 4, tag: 'Exam',
      q: 'A gaseous oxide of sulfur has a density of 2.86 g/L at STP. What are the shape and polarity of its molecules?',
      c: ['Bent and polar (it is SO₂)', 'Trigonal planar and nonpolar (it is SO₃)', 'Linear and nonpolar (it is SO₂)', 'Bent and nonpolar (it is SO₂)', 'Trigonal pyramidal and polar (it is SO₃)'],
      why: `M = d × 22.4 L/mol = 2.86 × 22.4 = ${s(M, 3)} g/mol → SO₂ (64.06; SO₃ is 80.06). SO₂: S has two bonding groups + one lone pair (three electron groups) → bent, so the S−O dipoles do not cancel → polar. Drawing SO₂ like CO₂ (linear) forgets the lone pair on S.`,
      h: ['Molar mass from the density first.', 'At STP, M = d × 22.4.', 'Then the Lewis structure: count electron groups on S.'] }); }

  { const lam = hc / (243e3 / NA) * 1e9;
    add({ l: 10, t: 3, tag: 'Calculation',
      q: 'The Cl−Cl bond energy is 243 kJ/mol. What is the longest wavelength of light that can break a single Cl−Cl bond?',
      c: [s(lam, 3) + ' nm', sci(hc / 243 * NA * 1e9, 3) + ' nm', sci(hc / 243e3 * 1e9, 3) + ' nm', s(lam / 2, 3) + ' nm', s(lam * 2, 3) + ' nm'],
      sort: true,
      why: `Energy per bond = 243 × 10³ J/mol ÷ 6.022 × 10²³ = ${sci(243e3 / NA, 4)} J. λ = hc/E = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/${sci(243e3 / NA, 4)} = ${sci(lam * 1e-9, 4)} m = ${s(lam, 3)} nm (visible light - why chlorine reacts in sunlight). One photon breaks one bond, so the per-mole energy must become per-bond; doubling or halving for "two atoms" is not needed.`,
      h: ['One photon, one bond: you need J per bond.', '× 1000 and ÷ N_A.', 'λ = hc/E, then m → nm.'] }); }

  add({ l: 26, t: 2, tag: 'Exam',
    q: 'At 1 atm and 25 °C, which gas deviates MOST from ideal-gas behavior?',
    c: ['NH₃', 'CH₄', 'He', 'Ne', 'N₂'],
    why: 'KMT assumes no attractions. NH₃ molecules are polar and hydrogen bond, so their attractions are by far the strongest here (largest van der Waals a), making the measured pressure fall furthest below ideal. CH₄, N₂, Ne and He have only weak dispersion forces.',
    h: ['Deviation comes from attractions (and size).', 'Which molecule has the strongest IMFs?', 'Look for hydrogen bonding.'] });

  add({ l: 26, t: 3, tag: 'Trap',
    q: 'Sample A is helium at 300 K; sample B is SF₆ at 310 K. Which statement is correct?',
    c: ['SF₆ molecules have the greater average kinetic energy, but helium atoms have the greater rms speed', 'Helium has both the greater average kinetic energy and the greater rms speed', 'SF₆ has both the greater average kinetic energy and the greater rms speed', 'The average kinetic energies are equal because both are ideal gases', 'Helium has the greater average kinetic energy, but SF₆ has the greater rms speed'],
    why: 'Average KE depends only on T: 310 K beats 300 K, so SF₆ wins on kinetic energy. But u(rms) = √(3RT/M): helium\'s tiny molar mass (4.0 versus 146 g/mol) makes it about six times faster despite the slightly lower T.',
    h: ['KE depends on T only; speed depends on T and M.', 'Compare T for KE.', 'Compare √(T/M) for speed.'] });

  add({ l: 26, t: 1, tag: 'Concept',
    q: 'To calculate an rms speed in m/s with u(rms) = √(3RT/M), which R and which units of M must you use?',
    c: ['R = 8.314 J/(mol·K) with M in kg/mol', 'R = 0.08206 L·atm/(mol·K) with M in g/mol', 'R = 8.314 J/(mol·K) with M in g/mol', 'R = 0.08206 L·atm/(mol·K) with M in kg/mol', 'Any value of R, as long as T is in °C'],
    why: 'A joule is kg·m²/s², so J/(mol·K) × K ÷ (kg/mol) = m²/s², and the square root gives m/s. M in g/mol makes the answer √1000 too small; the L·atm value of R gives meaningless units.',
    h: ['The answer must come out in m/s.', '1 J = 1 kg·m²/s².', 'Match R in joules with M in kilograms.'] });

  add({ l: 25, t: 3, tag: 'Trap',
    q: 'Calculate the moles of gas in a 2.0 L flask at 1.00 atm and 300. K, reported to the correct number of significant figures.',
    c: ['0.081 mol', '0.0812 mol', '0.08124 mol', '0.08 mol', '0.0810 mol'],
    why: `n = PV/RT = (1.00)(2.0)/[(0.08206)(300.)] = ${(2.0 / (R * 300)).toFixed(5)} mol. The least precise measurement is 2.0 L (2 sig figs), so n = 0.081 mol. Leading zeros do not count, so 0.081 has two sig figs and 0.08 only one.`,
    h: ['Find the measurement with the fewest sig figs.', 'Multiplication/division: fewest sig figs wins.', '2.0 L has two.'] });

  { const P = 202.6e3, V = 0.0500, n = P * V / (R8 * 300.);
    add({ l: 25, t: 3, tag: 'Calculation',
      q: 'A 0.0500 m³ tank holds gas at 202.6 kPa and 300. K. How many moles of gas does it hold? (R = 8.314 J/(mol·K) = 8.314 Pa·m³/(mol·K))',
      c: [s(n, 3) + ' mol', sci(202.6 * V / (R8 * 300), 3) + ' mol', sci(P * 50.0 / (R8 * 300), 3) + ' mol', s(202.6 * 50.0 / (R * 300), 3) + ' mol', s(2.00 * 50.0 / (R8 * 300), 3) + ' mol'],
      sort: true,
      why: `With R = 8.314 Pa·m³/(mol·K), P must be in Pa and V in m³: n = (202,600 Pa)(0.0500 m³)/[(8.314)(300.)] = ${s(n, 3)} mol. Check with the other R: 202.6 kPa = 2.00 atm and 0.0500 m³ = 50.0 L, so n = (2.00)(50.0)/(0.08206 × 300.) = ${s(2.00 * 50.0 / (R * 300), 3)} mol - the same. Every wrong choice mismatches one unit with its R.`,
      h: ['Each R value comes with its own units.', 'Pa·m³ with 8.314, or atm·L with 0.08206.', '202,600 × 0.0500 ÷ (8.314 × 300.).'] }); }

  { const n = 2.45 / (R * K(25)), M = n / 0.5000;
    add({ l: 26, t: 3, tag: 'Exam',
      q: 'A 2.45 L sample of HCl gas, measured at 25 °C and 1.00 atm, is dissolved in water to make 500.0 mL of solution. What is the molarity of the hydrochloric acid?',
      c: [s(M, 3) + ' M', s(2.45 / 22.4 / 0.5000, 3) + ' M', sci(n / 500.0, 3) + ' M', s(n * 0.5000, 3) + ' M', s(2.45 / (R * 25) / 0.5000, 3) + ' M'],
      sort: true,
      why: `n(HCl) = PV/RT = (1.00)(2.45)/[(0.08206)(298.15)] = ${s(n, 4)} mol. M = ${s(n, 4)} mol ÷ 0.5000 L = ${s(M, 3)} M. Using 22.4 L/mol (not STP), dividing by mL, or multiplying by the volume gives the others.`,
      h: ['Gas volume → moles with PV = nRT.', 'Molarity = mol ÷ litres of solution.', '0.1001 mol ÷ 0.5000 L.'] }); }

  { const n = 4.236 / mm('Na2CO3'), V = n * R * K(25);
    add({ l: 26, t: 3, tag: 'Worksheet',
      q: 'Na₂CO₃(aq) + 2HCl(aq) → 2NaCl(aq) + H₂O(l) + CO₂(g). If 4.236 g of Na₂CO₃ reacts with excess HCl, what volume of CO₂ is released at 25 °C and 1.00 atm?',
      c: [s(V, 3) + ' L', s(n * 22.4, 3) + ' L', s(2 * V, 3) + ' L', s(n * R * 25, 3) + ' L', s(4.236 / 44.01 * R * K(25), 3) + ' L'],
      sort: true,
      why: `n(Na₂CO₃) = 4.236/105.99 = ${s(n, 4)} mol = n(CO₂) (1 : 1). V = nRT/P = (${s(n, 4)})(0.08206)(298.15)/1.00 = ${s(V, 3)} L. 22.4 L/mol is STP only; the 2 belongs to HCl, not CO₂; 4.236 g is the mass of Na₂CO₃, not of CO₂.`,
      h: ['Moles of Na₂CO₃ first (M = 105.99 g/mol).', 'CO₂ : Na₂CO₃ = 1 : 1; then V = nRT/P.', 'n ≈ 0.0400 mol.'] }); }

  { const M = mm('C4H10'), Mx = 1.20 * R * K(25) / (1.01 * 0.500);
    add({ l: 25, t: 4, tag: 'Exam',
      q: 'A gaseous hydrocarbon is 82.6% C and 17.4% H by mass. A 1.20 g sample occupies 0.500 L at 25 °C and 1.01 atm. What is its molecular formula?',
      c: ['C₄H₁₀', 'C₂H₅', 'C₃H₈', 'C₅H₁₂', 'C₄H₈'],
      why: `Empirical: C 82.6/12.01 = 6.88 mol, H 17.4/1.008 = 17.3 mol; ratio 1 : 2.5 = 2 : 5 → C₂H₅ (29.06 g/mol). Molar mass: n = PV/RT = (1.01)(0.500)/(0.08206 × 298.15) = ${sci(1.01 * 0.5 / (R * K(25)), 4)} mol, so M = 1.20/${sci(1.01 * 0.5 / (R * K(25)), 4)} = ${s(Mx, 3)} g/mol. ${s(Mx, 3)}/29.06 = 2 → C₄H₁₀ (${f(M, 2)} g/mol). C₂H₅ is only the empirical formula.`,
      h: ['Empirical formula from the percentages; molar mass from the gas data.', 'M = mRT/PV.', 'The molar mass is twice the empirical-formula mass.'] }); }

  { const M = 32.00 / (0.672 * 0.672);
    add({ l: 26, t: 3, tag: 'Calculation',
      q: 'An unknown gas effuses 0.672 times as fast as O₂ under the same conditions. Which gas is it?',
      c: ['Cl₂', 'F₂', 'Br₂', 'SO₂', 'Ar'],
      why: `M(X) = M(O₂)/(rate ratio)² = 32.00/(0.672)² = ${s(M, 3)} g/mol → Cl₂ (70.90). SO₂ is 64.06, Ar 39.95, F₂ 38.00, Br₂ 159.8.`,
      h: ['Slower than O₂ → heavier than O₂.', 'rate(X)/rate(O₂) = √(32.00/M(X)).', 'M = 32.00 ÷ 0.672².'] }); }

  { const n = 1 / mm('C8H18'), V = n * 12.5 * 22.4;
    add({ l: 26, t: 3, tag: 'Calculation',
      q: 'What volume of O₂ at STP is needed to burn 1.00 g of octane completely? 2C₈H₁₈(l) + 25O₂(g) → 16CO₂(g) + 18H₂O(l) (Enter a number in L.)',
      a: s(V, 3) + ' L', num: V,
      why: `M(C₈H₁₈) = 8(12.01) + 18(1.008) = ${f(mm('C8H18'), 2)} g/mol, so n = ${sci(n, 4)} mol. O₂ = ${sci(n, 4)} × 25/2 = ${s(n * 12.5, 4)} mol. At STP: ${s(n * 12.5, 4)} × 22.4 = ${s(V, 3)} L.`,
      h: ['grams octane → mol octane → mol O₂ → litres.', 'Ratio 25 O₂ : 2 C₈H₁₈.', '22.4 L/mol at STP.'] }); }

  { const nAl = 0.270 / 26.98, nH2 = nAl * 1.5, P = (760 - 23.8) / 760, V = nH2 * R * K(25) / P * 1000;
    add({ l: 26, t: 4, tag: 'Exam',
      q: 'A 0.270 g piece of aluminum reacts with excess HCl: 2Al(s) + 6HCl(aq) → 2AlCl₃(aq) + 3H₂(g). The H₂ is collected over water at 25 °C and a total pressure of 760. torr (vapor pressure of water at 25 °C = 23.8 torr). What volume of gas is collected? (Enter a number in mL.)',
      a: s(V, 3) + ' mL', num: V,
      why: `n(Al) = 0.270/26.98 = ${sci(nAl, 4)} mol → H₂ = × 3/2 = ${sci(nH2, 4)} mol. The H₂ supplies only part of the pressure: P(H₂) = 760. − 23.8 = 736.2 torr = ${s(P, 4)} atm. V = nRT/P = (${sci(nH2, 4)})(0.08206)(298.15)/${s(P, 4)} = ${s(V / 1000, 4)} L = ${s(V, 3)} mL.`,
      h: ['Moles of H₂ from the mole ratio 3 H₂ : 2 Al.', 'Use the DRY H₂ pressure in PV = nRT.', 'P(H₂) = 736.2 torr.'] }); }

  { const pNO = 0.600, pO2 = 0.500, left = pO2 - pNO / 2, tot = pNO + left;
    add({ l: 26, t: 4, tag: 'Exam',
      q: 'A rigid flask at constant temperature holds NO at 0.600 atm and O₂ at 0.500 atm. They react completely: 2NO(g) + O₂(g) → 2NO₂(g). What is the final total pressure?',
      c: [f(tot, 3) + ' atm', '1.10 atm', '0.600 atm', '0.200 atm', '1.40 atm'],
      sort: true,
      why: `Constant V and T: partial pressures behave like moles. NO is limiting: 0.600 atm NO uses 0.300 atm O₂ and makes 0.600 atm NO₂. O₂ left = 0.500 − 0.300 = ${f(left, 3)} atm. Total = 0.600 + ${f(left, 3)} = ${f(tot, 3)} atm. 1.10 atm ignores the reaction; 0.600 atm forgets the leftover O₂.`,
      h: ['Treat partial pressures like moles.', 'Find the limiting reactant from the 2 : 1 ratio.', 'Add the product pressure and the leftover reactant.'] }); }

  { const n = 0.0500, V = n * R * K(25), w = -V * 101.3;
    add({ l: 7, t: 4, tag: 'Exam',
      q: 'A reaction in an open flask produces 0.0500 mol of H₂ gas at 25 °C against a constant 1.00 atm. How much work does the system do, with the correct sign? (1 L·atm = 101.3 J; ignore the volume of solids and liquids.)',
      c: [s(w, 3) + ' J', '+' + s(-w, 3) + ' J', s(-V, 3) + ' J', s(w / 1000, 3) + ' J', sci(w * 1000, 3) + ' J'],
      sort: true,
      why: `The gas produced pushes back the atmosphere: ΔV = nRT/P = (0.0500)(0.08206)(298.15)/1.00 = ${s(V, 4)} L. w = −PΔV = −(1.00 atm)(${s(V, 4)} L) = −${s(V, 4)} L·atm × 101.3 J/(L·atm) = ${s(w, 3)} J. Work done BY the system is negative; ${s(-V, 3)} J forgets to convert L·atm to J.`,
      h: ['w = −PΔV; the new gas is the volume change.', 'ΔV from PV = nRT.', 'Then L·atm → J with 101.3.'] }); }

  { const w = 3 * R8 * K(25) / 1000;
    add({ l: 7, t: 4, tag: 'Exam',
      q: 'For C₃H₈(g) + 5O₂(g) → 3CO₂(g) + 4H₂O(l) at 25 °C and constant pressure, what is the work w for the reaction of 1 mol of propane? (w = −PΔV = −Δn(gas)RT)',
      c: ['+' + s(w, 3) + ' kJ', s(-w, 3) + ' kJ', s(-R8 * K(25) / 1000, 3) + ' kJ', '+' + s(5 * R8 * K(25) / 1000, 3) + ' kJ', '0 kJ'],
      why: `Count only gases: Δn = 3 − (1 + 5) = −3 mol. w = −ΔnRT = −(−3)(8.314)(298.15) = +${s(w * 1000, 4)} J = +${s(w, 3)} kJ. The gas volume shrinks, so the surroundings do work ON the system: w is positive. Counting H₂O(l) as a gas gives Δn = +1 (w = ${s(-R8 * K(25) / 1000, 3)} kJ); counting only the 5 mol of O₂ consumed gives Δn = −5 (w = +${s(5 * R8 * K(25) / 1000, 3)} kJ).`,
      h: ['Only gas moles change the volume.', 'Δn = moles gas products − moles gas reactants.', 'Δn = −3.'] }); }

  { const Tf = (50.0 * 0.900 * 95.0 + 100.0 * 4.184 * 22.0) / (50.0 * 0.900 + 100.0 * 4.184);
    add({ l: 8, t: 3, tag: 'Worksheet',
      q: 'A 50.0 g block of aluminum (c = 0.900 J/(g·°C)) at 95.0 °C is dropped into 100.0 g of water at 22.0 °C in an insulated cup. What is the final temperature? (Enter a number in °C.)',
      a: s(Tf, 3) + ' °C', num: Tf,
      why: `Heat lost by Al = heat gained by water: 50.0(0.900)(95.0 − T) = 100.0(4.184)(T − 22.0). 4275 − 45.0T = 418.4T − 9204.8, so 463.4T = 13,479.8 and T = ${s(Tf, 3)} °C. It must land between 22.0 and 95.0 °C, close to the water's temperature because water's heat capacity is much larger.`,
      h: ['−q(metal) = q(water); both end at the same T.', 'Write m·c·ΔT for each with ΔT = final − initial.', 'Solve 45.0(95.0 − T) = 418.4(T − 22.0).'] }); }

  { const n = 10.0 / 22.4, q = n * 91.8;
    add({ l: 9, t: 3, tag: 'Calculation',
      q: 'N₂(g) + 3H₂(g) → 2NH₃(g). Using ΔH°f(NH₃, g) = −45.9 kJ/mol, how much heat is released when 10.0 L of N₂ at STP reacts with excess H₂?',
      c: [s(q, 3) + ' kJ', s(n * 45.9, 3) + ' kJ', s(10.0 * 91.8, 3) + ' kJ', s(n / 3 * 91.8, 3) + ' kJ', s(2 * q, 3) + ' kJ'],
      sort: true,
      why: `ΔH°rxn = 2(−45.9) − 0 = −91.8 kJ per mol N₂ (elements have ΔH°f = 0). n(N₂) = 10.0/22.4 = ${s(n, 4)} mol. Heat released = ${s(n, 4)} × 91.8 = ${s(q, 3)} kJ. Forgetting the coefficient 2 on NH₃ halves it; treating 10.0 L as 10.0 mol, or as H₂, gives the others.`,
      h: ['ΔH°rxn from ΔH°f: products − reactants, with coefficients.', 'N₂ and H₂ are elements: ΔH°f = 0.', 'ΔH°rxn = −91.8 kJ per mol N₂.'] }); }

  /* ================= nuclear + other chapters ================= */
  { const dec = 0.750 / 209.98, V = dec * 22.4 * 1000;
    add({ l: 28, t: 4, tag: 'Exam',
      q: 'Polonium-210 (209.98 g/mol, t½ = 138.4 days) decays by α emission to stable ²⁰⁶Pb; each α particle becomes a He atom. A sealed sample starts with 1.00 g of ²¹⁰Po. What volume of He at STP has formed after 276.8 days?',
      c: [s(V, 3) + ' mL', s(1.00 / 209.98 * 22400, 3) + ' mL', s(0.250 / 209.98 * 22400, 3) + ' mL', s(0.500 / 209.98 * 22400, 3) + ' mL', s(V * 4, 3) + ' mL'],
      sort: true,
      why: `276.8 days = 2 half-lives, so ¼ of the Po remains and ¾ (0.750 g) has decayed. Moles decayed = 0.750/209.98 = ${sci(dec, 4)} mol, giving the same number of moles of He. V = ${sci(dec, 4)} × 22.4 L/mol = ${s(V / 1000, 3)} L = ${s(V, 3)} mL. Using the amount REMAINING, one half-life, or all of the sample gives the other volumes.`,
      h: ['How many half-lives have passed?', 'Moles of He = moles of Po that decayed.', '¾ of 1.00 g decayed.'] }); }

  add({ l: 27, t: 4, tag: 'Exam',
    q: 'When 1.00 mol of ²³⁸U decays completely to ²⁰⁶Pb, every α particle becomes a helium atom. What mass of helium forms? (He = 4.003 g/mol)',
    c: ['32.0 g', '4.00 g', '24.0 g', '56.0 g', '128 g'],
    why: 'The series ²³⁸U → ²⁰⁶Pb emits (238 − 206)/4 = 8 α particles (and 6 β⁻). So 1.00 mol U gives 8.00 mol He = 8.00 × 4.003 = 32.0 g. 24.0 g uses the number of β particles; 56.0 g counts all 14 particles as He; 128 g forgets to divide ΔA by 4.',
    h: ['How many α particles in the ²³⁸U → ²⁰⁶Pb series?', 'ΔA ÷ 4 = number of α.', '8 mol He × 4.003 g/mol.'] });

  add({ l: 27, t: 3, tag: 'Calculation',
    q: 'Uranium-238 decays through a series to lead-206. Using mass numbers as molar masses, what mass of ²⁰⁶Pb forms when 1.00 g of ²³⁸U has decayed completely?',
    c: ['0.866 g', '1.00 g', '1.16 g', '0.134 g', '0.433 g'],
    why: '1.00 g ÷ 238 g/mol = 4.20 × 10⁻³ mol U → the same number of moles of Pb (one Pb per U). Mass = 4.20 × 10⁻³ × 206 = 0.866 g. The missing 0.134 g left as α particles (and a tiny amount as energy). 1.16 g inverts the ratio; 0.433 g halves it as if one half-life had passed.',
    h: ['One Pb atom forms per U atom.', 'Moles of U = moles of Pb.', '1.00 × 206/238.'] });

  add({ l: 27, t: 2, tag: 'Concept',
    q: 'Potassium-40 decays mainly by β⁻ emission. In which group of the periodic table is the daughter element?',
    c: ['Group 2, the alkaline earth metals', 'Group 1, the alkali metals', 'Group 18, the noble gases', 'Group 17, the halogens', 'Group 3'],
    why: '⁴⁰₁₉K → ⁴⁰₂₀Ca + ⁰₋₁β. β⁻ raises Z by one, from potassium (Group 1) to calcium (Group 2). Argon (Group 18) is the product of ⁴⁰K\'s minor electron-capture branch, which lowers Z.',
    h: ['β⁻ changes Z by +1.', 'Z = 20: calcium.', 'Calcium’s group.'] });

  add({ l: 27, t: 3, tag: 'Exam',
    q: 'Iodine-131 undergoes β⁻ decay. What is the ground-state electron configuration of the neutral atom of the daughter element?',
    c: ['[Kr] 5s² 4d¹⁰ 5p⁶', '[Kr] 5s² 4d¹⁰ 5p⁵', '[Kr] 5s² 4d¹⁰ 5p⁴', '[Xe] 6s¹', '[Kr] 5s² 4d¹⁰ 5p⁶ 6s²'],
    why: '¹³¹₅₃I → ¹³¹₅₄Xe + β⁻. The daughter is xenon (Z = 54), a noble gas: [Kr] 5s² 4d¹⁰ 5p⁶. 5p⁵ is iodine itself; 5p⁴ is tellurium (the direction a positron emitter would go); [Xe] 6s¹ is cesium.',
    h: ['Identify the daughter first.', 'β⁻: Z + 1 = 54.', 'Xenon fills the 5p subshell.'] });

  { const E = me * c * c, lam = hc / E;
    add({ l: 28, t: 4, tag: 'Exam',
      q: 'When a positron from ¹⁸F meets an electron in a PET scan, both annihilate into two γ photons of equal energy, each carrying the rest energy of one electron (m = 9.109 × 10⁻³¹ kg). What is the wavelength of each photon?',
      c: [sci(lam, 3) + ' m', sci(lam / 2, 3) + ' m', sci(hc / (me * c), 3) + ' m', sci(1 / lam, 3) + ' m', sci(lam * 1e9, 3) + ' m'],
      sort: true,
      why: `E per photon = mc² = (9.109 × 10⁻³¹ kg)(2.998 × 10⁸ m/s)² = ${sci(E, 4)} J (= 0.511 MeV). λ = hc/E = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/${sci(E, 4)} = ${sci(lam, 3)} m - a γ ray, shorter than an X-ray. Giving one photon both electrons' energy halves λ; forgetting to square c gives a nonsense value.`,
      h: ['Mass → energy (E = mc²), then energy → wavelength (E = hc/λ).', 'Each photon carries ONE electron’s rest energy.', 'E ≈ 8.19 × 10⁻¹⁴ J.'] }); }

  { const E = 1.33 * 1.602e-13, lam = hc / E;
    add({ l: 28, t: 3, tag: 'Calculation',
      q: 'Cobalt-60 emits a γ photon of energy 1.33 MeV. What is its wavelength? (1 MeV = 1.602 × 10⁻¹³ J)',
      c: [sci(lam, 3) + ' m', sci(hc / (1.33 * 1.602e-19), 3) + ' m', sci(hc / (1.33 * 1.602e-16), 3) + ' m', sci(hc / 1.33, 3) + ' m', sci(1 / lam, 3) + ' m'],
      sort: true,
      why: `E = 1.33 MeV × 1.602 × 10⁻¹³ J/MeV = ${sci(E, 4)} J. λ = hc/E = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/${sci(E, 4)} = ${sci(lam, 3)} m. Treating MeV as eV or keV, or skipping the conversion to joules, gives the other choices.`,
      h: ['Convert MeV to J first.', 'λ = hc/E.', 'E ≈ 2.13 × 10⁻¹³ J.'] }); }

  add({ l: 28, t: 4, tag: 'Exam',
    q: 'Fission of 1.00 g of ²³⁵U releases about 8.2 × 10⁷ kJ. What mass of methane (16.04 g/mol, 890 kJ released per mole burned) would have to burn to release the same energy?',
    c: ['1.5 × 10³ kg', '1.5 × 10⁶ kg', '92 kg', '5.7 kg', '1.5 kg'],
    why: `Moles of CH₄ = 8.2 × 10⁷ kJ ÷ 890 kJ/mol = ${sci(8.2e7 / 890, 2)} mol. Mass = ${sci(8.2e7 / 890, 2)} × 16.04 g/mol = ${sci(8.2e7 / 890 * 16.04, 2)} g = 1.5 × 10³ kg - about a tonne and a half of fuel to match one gram of uranium. 92 kg skips the molar mass; 5.7 kg divides by the molar mass; 1.5 × 10⁶ kg forgets that 1000 g = 1 kg.`,
    h: ['Energy ÷ (kJ per mol) = moles.', 'Moles × molar mass = grams.', 'Then convert g to kg (2 sig figs).'] });

  add({ l: 25, t: 4, tag: 'Exam',
    q: 'Which sample contains the greatest number of molecules?',
    c: ['10.0 g of H₂O', '10.0 L of N₂ at STP', '22.0 g of CO₂', '1.00 × 10²³ molecules of CO₂', '5.00 L of H₂ at 25 °C and 2.00 atm'],
    why: `Convert all to moles. H₂O: 10.0/18.02 = ${s(10.0 / 18.02, 3)} mol. N₂: 10.0/22.4 = ${s(10.0 / 22.4, 3)} mol. CO₂: 22.0/44.01 = ${s(22.0 / 44.01, 3)} mol. 1.00 × 10²³ ÷ 6.022 × 10²³ = ${s(1e23 / NA, 3)} mol. H₂: PV/RT = (2.00)(5.00)/(0.08206 × 298.15) = ${s(10.0 / (R * K(25)), 3)} mol. Water wins. Grams, litres and counts must all go through moles.`,
    h: ['Put every sample in moles.', 'Gases: PV = nRT (or 22.4 L/mol only at STP).', 'Water: 10.0 ÷ 18.02.'] });

  { const d = 209.0 / NA / Math.pow(336e-10, 3);
    add({ l: 22, t: 3, tag: 'Calculation',
      q: 'Polonium (209.0 g/mol), one of the elements Marie Curie discovered, is the only element that crystallizes in a simple cubic lattice. Its edge length is 336 pm. What is its density?',
      c: [s(d, 3) + ' g/cm³', s(2 * d, 3) + ' g/cm³', s(4 * d, 3) + ' g/cm³', s(8 * d, 3) + ' g/cm³', sci(d * 1e6, 3) + ' g/cm³'],
      sort: true,
      why: `Simple cubic: 8 corners × ⅛ = 1 atom per cell. Mass = 209.0/6.022 × 10²³ = ${sci(209.0 / NA, 4)} g. a = 336 pm = 3.36 × 10⁻⁸ cm, V = a³ = ${sci(Math.pow(336e-10, 3), 4)} cm³. d = ${s(d, 3)} g/cm³. 2 and 4 atoms are BCC and FCC; 8 counts every corner as a whole atom.`,
      h: ['How many atoms belong to a simple cubic cell?', 'd = (atoms × M/N_A) ÷ a³, a in cm.', '1 pm = 10⁻¹⁰ cm.'] }); }

  return Q;
};
