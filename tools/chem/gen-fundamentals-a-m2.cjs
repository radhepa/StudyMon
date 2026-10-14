/* Gym 2 - Atoms, Ions and Chemical Names (Silberberg 2.1-2.7 + nomenclature,
   lessons 2-3). Loaded by gen-fundamentals-a.cjs. The correct choice is written first.
   Lesson 2 = matter, mass laws, atomic theory, the atom, isotopes, periodic table, ions.
   Lesson 3 = formulas, names, counting atoms, formula masses. */
module.exports = function ({ M, N, chk, sci, fx, fd, fmass, AM, Z, setCh }) {
  setCh(2);
  const A2 = 2, A3 = 3;
  /* protons, neutrons, electrons of a nuclide/ion */
  const pne = (sym, A, q) => ({ p: Z[sym], n: A - Z[sym], e: Z[sym] - (q || 0) });
  const FM = f => fd(fmass(f), 2);

  /* ================= classification of matter, separations (lesson 2) ================= */
  M(A2, 1, 'Concept', 'Which of the following is a COMPOUND?',
    'sodium chloride', ['oxygen gas', 'brass', 'air', 'seawater'],
    'A compound is a substance of two or more elements chemically combined in a fixed ratio: sodium chloride is always NaCl. Oxygen gas (O₂) is an element; brass (copper + zinc), air and seawater are mixtures whose composition can vary.',
    ['Is it a pure substance or a mixture?', 'A compound has a fixed composition of two or more elements.', 'Which choice has a single chemical formula with two elements?']);

  M(A2, 2, 'Concept', 'Which of the following is a HOMOGENEOUS mixture?',
    'salt dissolved in water', ['pure water', 'oil and water', 'granite', 'sodium chloride'],
    'A homogeneous mixture (a solution) has the same composition throughout and no visible boundaries: salt water. Pure water and sodium chloride are pure substances (compounds), not mixtures. Oil and water and granite are heterogeneous - you can see the different parts.',
    ['First rule out the pure substances.', 'Homogeneous = uniform throughout (a solution).', 'Which mixture looks like a single phase?']);

  M(A2, 2, 'Concept', 'Which of the following is a HETEROGENEOUS mixture?',
    'oil-and-vinegar salad dressing', ['brass', 'air', 'sugar dissolved in water', 'pure ethanol'],
    'Oil and vinegar separate into visible layers, so the mixture is not uniform: heterogeneous. Brass (a solid solution), air and sugar water are homogeneous mixtures; pure ethanol is a compound.',
    ['Heterogeneous = you can see different regions.', 'Alloys and gas mixtures are uniform.', 'Which mixture separates into layers?']);

  M(A2, 2, 'Concept', 'Which statement correctly distinguishes a compound from a mixture?',
    'A compound has a fixed composition by mass; a mixture\'s composition can vary', ['A compound can be separated into its elements by filtration; a mixture cannot', 'A mixture always contains only one element', 'A compound keeps the properties of its component elements', 'A mixture always contains exactly two substances'],
    'By the law of definite composition, every sample of a compound has the same mass fractions of its elements. A mixture\'s components can be present in any proportion and keep their own properties. Compounds have properties DIFFERENT from their elements (NaCl is nothing like Na metal or Cl₂ gas) and can only be broken down chemically.',
    ['Think of salt water made with more or less salt.', 'Compounds obey the law of definite composition.', 'Fixed vs variable composition.']);

  M(A2, 2, 'Concept', 'Which technique would recover pure water from salt water?',
    'distillation', ['filtration', 'chromatography', 'decanting', 'using a magnet'],
    'Distillation separates components by differences in volatility (boiling point): the water boils off and is condensed, leaving the salt behind. Filtration only removes undissolved solids - dissolved salt passes through the filter. Chromatography separates by differing attraction to a stationary phase and is used for small analytical samples.',
    ['Is the salt dissolved or suspended?', 'Water and salt have very different boiling points.', 'Boil, then condense the vapor.']);

  M(A2, 1, 'Concept', 'Which technique separates sand from water?',
    'filtration', ['distillation of the sand', 'chromatography', 'crystallization', 'electrolysis'],
    'Sand does not dissolve, so passing the mixture through a filter paper holds back the solid and lets the water through. Electrolysis is a chemical change, not a separation of a mixture.',
    ['Is the sand dissolved?', 'An insoluble solid can be caught by a porous barrier.', 'Use filter paper.']);

  M(A2, 1, 'Concept', 'A substance that cannot be broken down into simpler substances by chemical means is:',
    'an element', ['a compound', 'a homogeneous mixture', 'a heterogeneous mixture', 'a molecule of a compound'],
    'An element consists of only one kind of atom and cannot be decomposed chemically. Compounds can be decomposed into their elements (water → H₂ + O₂ by electrolysis); mixtures can be separated physically.',
    ['Think of the simplest kind of pure substance.', 'Compounds CAN be broken down chemically.', 'Only one kind of atom.']);

  M(A2, 3, 'Concept', 'A pure liquid is decomposed by an electric current into two different gases, which recombine to give back the original liquid. The original liquid must be:',
    'a compound', ['an element', 'a homogeneous mixture', 'a heterogeneous mixture', 'an alloy'],
    'Being broken down by a CHEMICAL process (electrolysis) into simpler substances means it is not an element; being a single pure substance with a fixed composition (it re-forms exactly) makes it a compound - water is the classic example. A mixture would be separated by physical means.',
    ['Elements cannot be decomposed chemically.', 'The liquid is described as pure.', 'Pure + chemically decomposable = ?']);

  /* ================= mass laws (lesson 2) ================= */
  M(A2, 1, 'Concept', 'Which statement is the law of DEFINITE COMPOSITION?',
    'A compound always contains the same elements in the same proportions by mass', ['The total mass of substances does not change during a chemical reaction', 'When two elements form more than one compound, the masses of one that combine with a fixed mass of the other are in small whole-number ratios', 'Atoms of an element are identical in mass', 'Equal volumes of gases contain equal numbers of particles'],
    'Definite (constant) composition: no matter its source, a compound has the same elements in the same parts by mass (NO₂ is always 30.45% N). The first distractor is mass conservation, the second is multiple proportions, the fourth is one of Dalton\'s postulates, and the last is Avogadro\'s hypothesis.',
    ['Three mass laws: conservation, definite composition, multiple proportions.', 'This one is about a SINGLE compound.', 'Fixed mass fractions.']);

  M(A2, 2, 'Concept', 'Every sample of pure water, from any source, contains 11.19% hydrogen by mass. This illustrates:',
    'the law of definite composition', ['the law of mass conservation', 'the law of multiple proportions', 'the existence of isotopes', 'the nuclear model of the atom'],
    'A fixed mass percentage of each element in a compound regardless of source is the law of definite composition. Multiple proportions needs TWO compounds of the same elements; mass conservation is about mass before and after a reaction.',
    ['How many compounds are involved?', 'The statement is about one compound always having the same make-up.', 'Same proportions → definite composition.']);

  M(A2, 2, 'Concept', 'When 10.0 g of calcium carbonate is heated, it forms 5.60 g of calcium oxide and 4.40 g of carbon dioxide. Which law do these data illustrate?',
    'the law of mass conservation', ['the law of definite composition', 'the law of multiple proportions', 'Dalton\'s postulate that atoms are indivisible', 'the law of constant volume'],
    '5.60 g + 4.40 g = 10.00 g: the total mass of the products equals the mass of the reactant, which is the law of mass conservation. Nothing here compares the composition of different samples (definite composition) or of two compounds of the same elements (multiple proportions).',
    ['Add up the product masses.', 'Compare with the reactant mass.', 'Mass before = mass after.']);

  M(A2, 2, 'Calculation', 'In a sealed flask, 2.43 g of magnesium reacts completely with oxygen to form 4.03 g of magnesium oxide. What mass of oxygen reacted?',
    fd(4.03 - 2.43, 2) + ' g', [fd(4.03 + 2.43, 2) + ' g', fx(2.43 / 4.03, 3) + ' g', fx(4.03 / 2.43, 3) + ' g', '2.43 g'],
    'Mass is conserved: mass of Mg + mass of O₂ = mass of MgO, so mass of O₂ = 4.03 g − 2.43 g = 1.60 g. Distractors: 6.46 g adds the masses; 0.603 and 1.66 are ratios, not masses; 2.43 g assumes equal masses react.',
    ['Mass conservation: reactant masses add to the product mass.', 'Mg + O₂ → MgO.', 'Subtract 2.43 g from 4.03 g.']);

  M(A2, 2, 'Concept', 'Wood burned in an open fire leaves ashes that weigh much less than the wood. Does this violate the law of mass conservation?',
    'No - gases such as CO₂ and H₂O escaped; in a closed container the total mass would not change', ['Yes - mass is destroyed when wood burns', 'Yes - the law applies only to physical changes', 'No - because the ashes have a higher density than the wood', 'No - because mass conservation applies only to elements, not compounds'],
    'The products of combustion include gases that leave the open fire. If all reactants (including O₂) and all products were weighed in a sealed container, the total mass would be unchanged. Mass conservation applies to every chemical reaction.',
    ['Where did the "missing" mass go?', 'Combustion produces gases.', 'Weigh everything, including the gases, in a closed system.']);

  const fe = 44.2, fgs = 95.0, fe2 = 60.0;
  M(A2, 4, 'Calculation', `A ${fd(fgs, 1)} g sample of "fool's gold" (a compound of only iron and sulfur) contains ${fd(fe, 1)} g of iron. What mass of sulfur is in a sample of fool's gold that contains ${fd(fe2, 1)} g of iron?`,
    fx((fgs - fe) / fe * fe2, 3) + ' g', [fx(fgs / fe * fe2, 3) + ' g', fx(fe / (fgs - fe) * fe2, 3) + ' g', fx(fe2 * (fgs - fe) / fgs, 3) + ' g', fx(fgs - fe2, 3) + ' g'],
    `By definite composition the S:Fe mass ratio is the same in every sample. First sample: S = ${fd(fgs, 1)} − ${fd(fe, 1)} = ${fd(fgs - fe, 1)} g, so S/Fe = ${fd(fgs - fe, 1)}/${fd(fe, 1)} = ${fx((fgs - fe) / fe, 4)}. Second sample: S = ${fd(fe2, 1)} g Fe × ${fx((fgs - fe) / fe, 4)} = ${fx((fgs - fe) / fe * fe2, 3)} g. Distractors: ${fx(fgs / fe * fe2, 3)} g is the mass of the whole second sample; ${fx(fe / (fgs - fe) * fe2, 3)} g inverts the ratio; ${fx(fe2 * (fgs - fe) / fgs, 3)} g treats 60.0 g as the mass of the whole sample; ${fx(fgs - fe2, 3)} g subtracts unrelated masses.`,
    ['Find the mass of sulfur in the first sample by difference.', 'The ratio (g S)/(g Fe) is fixed for this compound.', 'Multiply that ratio by the new mass of iron.']);

  N(A2, 3, 'Calculation', 'A 31.4 g sample of silver bromide contains 18.0 g of silver, with bromine the only other element. What mass of bromine is in 5.25 g of silver bromide? (Enter a number in g.)',
    fx((31.4 - 18.0) / 31.4 * 5.25, 3) + ' g', Number(fx((31.4 - 18.0) / 31.4 * 5.25, 3)),
    `Mass of Br in the analysed sample = 31.4 − 18.0 = 13.4 g, so the mass fraction of Br = 13.4/31.4 = ${fx(13.4 / 31.4, 4)}. In 5.25 g: 5.25 g × ${fx(13.4 / 31.4, 4)} = ${fx(13.4 / 31.4 * 5.25, 4)} → ${fx(13.4 / 31.4 * 5.25, 3)} g Br. (The silver is ${fx(18.0 / 31.4 * 5.25, 3)} g; the two add to 5.25 g.) Trap: using the silver fraction gives ${fx(18.0 / 31.4 * 5.25, 3)} g.`,
    ['Definite composition: the mass fraction of Br is fixed.', 'Mass fraction = mass of element ÷ mass of compound.', 'Multiply 5.25 g by (13.4 g / 31.4 g).']);

  M(A2, 4, 'Trap', 'A 50.0 g sample of a uranium oxide contains 42.4 g of uranium. What mass of oxygen is in 250. kg of this oxide?',
    fx((50.0 - 42.4) / 50.0 * 250, 2) + ' kg', [fx(42.4 / 50.0 * 250, 3) + ' kg', fx(50.0 / 42.4 * 250, 3) + ' kg', fx((50.0 - 42.4) / 42.4 * 250, 2) + ' kg', fx((50.0 - 42.4) / 50.0, 3) + ' kg'],
    `Oxygen in the analysed sample = 50.0 − 42.4 = 7.6 g. Subtraction keeps one decimal place, so 7.6 g has only TWO significant figures. Mass fraction O = 7.6/50.0 = 0.152; 250. kg × 0.152 = 38 kg (two significant figures). Distractors: 212 kg is the uranium; 295 kg inverts the uranium fraction; 45 kg uses the O:U ratio instead of the O:oxide fraction; 0.152 kg is the mass fraction itself.`,
    ['Find the mass of oxygen in the 50.0 g sample.', 'Mass fraction of O = (g O)/(g oxide), and the same fraction applies in kg.', 'Watch the significant figures of 50.0 − 42.4.']);

  M(A2, 3, 'Calculation', 'Two samples of a white solid are analysed. Sample 1: 1.50 g of solid contains 0.600 g of calcium. Sample 2: 4.00 g of solid contains 1.60 g of calcium. What can you conclude?',
    'Both are 40.0% calcium, consistent with the same compound (definite composition)', ['They must be different compounds because the masses of calcium differ', 'Sample 2 is 160% calcium, so it is impure', 'They illustrate the law of multiple proportions', 'They show that mass is not conserved'],
    'Mass fraction of Ca: sample 1 = 0.600/1.50 = 0.400; sample 2 = 1.60/4.00 = 0.400. Equal mass fractions are exactly what definite composition predicts for samples of one compound. Different SAMPLE sizes naturally contain different masses of Ca. Multiple proportions would need two different compounds of the same elements.',
    ['Compare mass fractions, not raw masses.', 'Fraction = mass of Ca ÷ mass of sample.', 'Both come to 0.400.']);

  M(A2, 2, 'Concept', 'Which pair of compounds illustrates the law of MULTIPLE PROPORTIONS?',
    'SO₂ and SO₃', ['NaCl and NaBr', 'O₂ and O₃', 'H₂O and H₂S', 'CH₄ and SiH₄'],
    'Multiple proportions needs the SAME two elements forming more than one compound. In SO₂ and SO₃, the masses of O combining with a fixed mass of S are in the ratio 2 : 3. NaCl/NaBr, H₂O/H₂S and CH₄/SiH₄ each involve different element pairs; O₂ and O₃ are two forms of one element, not compounds.',
    ['Both compounds must contain exactly the same two elements.', 'Then the ratio of one element\'s mass (per fixed mass of the other) is a small whole-number ratio.', 'Look for a pair like CO/CO₂.']);

  const cuI = 11.2 / 88.8, cuII = 20.1 / 79.9;
  M(A2, 4, 'Exam', 'Copper forms two oxides. Oxide I is 88.8% Cu and 11.2% O by mass; oxide II is 79.9% Cu and 20.1% O. What is the ratio of the mass of oxygen per gram of copper in oxide II to that in oxide I?',
    '2 : 1', [fx(20.1 / 11.2, 3) + ' : 1', '1 : 2', fx(88.8 / 79.9, 3) + ' : 1', '3 : 2'],
    `Take 100 g of each oxide. Oxide I: ${fx(cuI, 4)} g O per g Cu (11.2/88.8). Oxide II: ${fx(cuII, 4)} g O per g Cu (20.1/79.9). Ratio II : I = ${fx(cuII / cuI, 4)} ≈ 2 : 1 - a small whole-number ratio, as the law of multiple proportions requires (oxide I is Cu₂O, oxide II is CuO). Distractors: ${fx(20.1 / 11.2, 3)} : 1 compares the mass percents directly without fixing the mass of copper; 1 : 2 inverts the ratio; ${fx(88.8 / 79.9, 3)} : 1 compares the copper; 3 : 2 is a guess.`,
    ['Fix the mass of copper: compute grams of O per gram of Cu in each oxide.', 'Then divide oxide II\'s value by oxide I\'s.', 'You should get close to a whole number.']);
  chk('CuO/Cu2O', cuII / cuI, 2.0, 0.02);

  const nA = 1.14, nB = 2.28, nC = 2.85;
  M(A2, 4, 'Exam', `Three oxides of nitrogen contain, per 1.00 g of nitrogen, ${nA} g (oxide A), ${nB} g (oxide B) and ${nC} g (oxide C) of oxygen. If oxide A is NO, what is the formula of oxide C?`,
    'N₂O₅', ['NO₃', 'NO₂', 'N₂O₃', 'N₅O₂'],
    `For a fixed 1.00 g of N, the oxygen masses are in the ratio ${nA} : ${nB} : ${nC} = 1 : ${fx(nB / nA, 3)} : ${fx(nC / nA, 3)} = 2 : 4 : 5. If A (2 parts O) is NO, the O-to-N atom ratio is 1 for A, 2 for B (NO₂) and 2.5 for C - so C has 5 O atoms per 2 N atoms: N₂O₅. Distractors: NO₃ rounds 2.5 up; NO₂ is oxide B; N₂O₃ would be a ratio of 1.5; N₅O₂ inverts the ratio.`,
    ['Divide each oxygen mass by the smallest one.', 'C has 2.5 times as much O per N as A does.', 'O : N = 2.5 : 1 = 5 : 2.']);
  chk('NO ratio', (AM.O / AM.N), 1.142, 0.002); chk('N2O5 ratio', 5 * AM.O / (2 * AM.N), 2.855, 0.002);

  /* ================= Dalton and the experiments (lesson 2) ================= */
  M(A2, 2, 'Concept', 'Which of Dalton\'s postulates is still accepted WITHOUT modification?',
    'Compounds form by the chemical combination of a specific ratio of atoms of different elements', ['Atoms are indivisible and contain no smaller particles', 'All atoms of a given element are identical in mass', 'Atoms of one element can never be converted into atoms of another element by any process', 'Atoms of different elements always have different mass numbers'],
    'The postulate that compounds have fixed ratios of atoms still stands (it explains definite composition). Atoms are NOT indivisible (electrons, protons and neutrons); atoms of an element are NOT all identical in mass (isotopes); nuclear reactions DO convert one element into another; and different elements can share a mass number (⁴⁰Ar and ⁴⁰Ca).',
    ['Think about what electrons, isotopes and nuclear reactions did to Dalton\'s ideas.', 'Isotopes broke "identical in mass".', 'Which postulate is about compounds?']);

  M(A2, 2, 'Concept', 'The discovery of ISOTOPES showed that which of Dalton\'s ideas needed to be modified?',
    'All atoms of an element are identical in mass', ['Atoms combine in fixed whole-number ratios', 'Atoms are rearranged, not created or destroyed, in chemical reactions', 'Compounds have fixed compositions', 'Matter consists of atoms'],
    'Isotopes are atoms of the same element (same Z) with different numbers of neutrons and therefore different masses - so atoms of an element are NOT all identical in mass. (Their chemical behavior is nearly identical, which is why Dalton\'s other ideas still work.)',
    ['What differs between ³⁵Cl and ³⁷Cl?', 'Same element, different mass.', 'Dalton said atoms of one element have the same mass.']);

  M(A2, 2, 'Concept', 'Cathode rays were deflected by magnetic and electric fields, bent toward the positive plate, and were the same no matter what metal the cathode was made of. What was concluded?',
    'Atoms of all elements contain negatively charged particles (electrons)', ['Atoms have a small, dense, positive nucleus', 'Electrons carry a charge of −1.602 × 10⁻¹⁹ C', 'Atoms are indivisible', 'Cathode rays are a beam of neutral atoms'],
    'Bending in fields → charged particles; bending toward the + plate → negative; identical for every cathode material → found in all matter. These particles (electrons) showed atoms are NOT indivisible. The nucleus came from Rutherford, and the electron\'s charge from Millikan.',
    ['Match each observation to a conclusion.', 'Attracted to the positive plate means what charge?', 'Same for every metal → present in all matter.']);

  M(A2, 2, 'Concept', 'What did Millikan\'s oil-drop experiment measure?',
    'the charge of the electron', ['the mass-to-charge ratio of the electron', 'the size of the nucleus', 'the mass of the proton', 'the number of neutrons in an atom'],
    'Millikan found that the charges on oil droplets were always whole-number multiples of one smallest charge, which he identified as the electron\'s charge (−1.602 × 10⁻¹⁹ C). Thomson had already measured the charge-to-mass ratio; combining the two gives the electron\'s mass.',
    ['Thomson measured a ratio; Millikan measured one of its parts.', 'Charged droplets were suspended in an electric field.', 'Every droplet charge was a multiple of the same value.']);

  M(A2, 2, 'Concept', 'In Rutherford\'s gold-foil experiment, MOST alpha particles passed straight through the foil. What did this show?',
    'An atom is mostly empty space', ['The nucleus is negatively charged', 'Electrons are much heavier than alpha particles', 'Gold atoms are packed with positive charge spread evenly throughout', 'Alpha particles have no charge'],
    'If most alpha particles meet nothing, most of each atom must be empty space (occupied only by light electrons). The rare large deflections are what revealed the tiny, dense, positive nucleus.',
    ['What did the alpha particles encounter on their way through?', 'Nothing deflected them - so what is there?', 'Most of the atom\'s volume is ...']);

  M(A2, 3, 'Concept', 'In the gold-foil experiment, a very few alpha particles (about 1 in 20,000) bounced back at large angles. Which conclusion follows from THIS observation?',
    'Each atom has a tiny, very dense, positively charged nucleus', ['Electrons are spread evenly through a positive "pudding"', 'The atom is mostly empty space', 'Electrons orbit the nucleus in fixed circular paths', 'The nucleus contains neutrons'],
    'Only a massive, concentrated positive charge could repel heavy, positive alpha particles back toward the source; that it happened so rarely means the target is tiny. "Mostly empty space" comes from the OTHER observation (most passed straight through). The plum-pudding model predicted no large deflections; neutrons were discovered later by Chadwick.',
    ['Which observation is this one - the many or the few?', 'What could push a fast, heavy, positive particle backwards?', 'Small target + large repulsion.']);

  M(A2, 2, 'Concept', 'Which atomic model did Rutherford\'s gold-foil results disprove?',
    'Thomson\'s "plum-pudding" model', ['the nuclear model', 'Dalton\'s law of multiple proportions', 'the existence of electrons', 'the law of mass conservation'],
    'Thomson pictured a diffuse positive sphere with electrons embedded in it. That model predicted almost no deflection of alpha particles; the large-angle scattering showed the positive charge is concentrated in a nucleus, which replaced the plum-pudding picture.',
    ['What model was Rutherford testing?', 'It spread positive charge throughout the atom.', 'Raisins in a pudding.']);

  const drops = [6.40, 9.60, 16.0, 12.8];
  M(A2, 4, 'Exam', 'In an oil-drop experiment, four droplets carry charges of −6.40 × 10⁻¹⁹ C, −9.60 × 10⁻¹⁹ C, −16.0 × 10⁻¹⁹ C and −12.8 × 10⁻¹⁹ C. Assuming every charge is a whole-number multiple of one fundamental charge, what is the LARGEST value of that fundamental charge consistent with these data?',
    '−3.20 × 10⁻¹⁹ C', ['−6.40 × 10⁻¹⁹ C', '−1.60 × 10⁻¹⁹ C', '−11.2 × 10⁻¹⁹ C', '−4.80 × 10⁻¹⁹ C'],
    'Divide each charge by trial values. ÷ 3.20: 6.40 → 2, 9.60 → 3, 16.0 → 5, 12.8 → 4 - all whole numbers. ÷ 6.40 gives 1.5 for 9.60 (not whole); ÷ 4.80 gives 1.33 for 6.40. 1.60 also divides evenly, but it is not the LARGEST such value. The average (11.2) has no meaning here. (With these invented numbers the "unit" is twice the real electron charge - Millikan\'s method finds the greatest common divisor of the data.)',
    ['Each charge = n × (unit) with n a whole number.', 'Try dividing each value by the smallest one, then by smaller candidates.', '6.40, 9.60, 12.8 and 16.0 are 2, 3, 4 and 5 times the same number.']);
  drops.forEach(d => chk('drop', Math.abs(d / 3.20 - Math.round(d / 3.20)), 0, 1e-9));

  N(A2, 3, 'Calculation', 'Thomson found the electron\'s charge-to-mass ratio to be −1.76 × 10⁸ C/g, and Millikan measured its charge as −1.602 × 10⁻¹⁹ C. What is the mass of an electron in grams? (Enter a number in g.)',
    sci(1.602e-19 / 1.76e8, 3) + ' g', 1.602e-19 / 1.76e8,
    'mass = charge ÷ (charge/mass) = (−1.602 × 10⁻¹⁹ C) ÷ (−1.76 × 10⁸ C/g) = 9.10 × 10⁻²⁸ g (three significant figures from 1.76). Trap: multiplying the two values gives 2.82 × 10⁻¹¹, which has units of C²/g, not grams.',
    ['Let the units guide you: C ÷ (C/g) = g.', 'mass = charge ÷ (charge/mass).', '1.602 × 10⁻¹⁹ ÷ 1.76 × 10⁸.']);

  /* ================= structure of the atom (lesson 2) ================= */
  M(A2, 1, 'Concept', 'Which statement about the neutron is correct?',
    'It has no charge and is found in the nucleus', ['It has a −1 charge and is found outside the nucleus', 'It has a +1 charge and is found in the nucleus', 'It has no charge and orbits outside the nucleus', 'It has about 1/1836 the mass of a proton'],
    'Neutron: relative charge 0, mass about 1.00866 amu (very slightly more than a proton), located in the nucleus. The electron is the −1 particle outside the nucleus; the proton is +1 in the nucleus; the electron has about 1/1836 the mass of a proton.',
    ['Neutral → charge?', 'Protons and neutrons together make up the nucleus.', 'Neutron: 0 charge, ~1 amu, nucleus.']);

  M(A2, 1, 'Concept', 'Which subatomic particle has by far the SMALLEST mass?',
    'electron', ['proton', 'neutron', 'alpha particle', 'hydrogen nucleus'],
    'The electron\'s mass is 0.00054858 amu (9.109 × 10⁻²⁸ g), about 1/1836 of a proton\'s. Protons and neutrons are each about 1 amu; an alpha particle (2 p + 2 n) is about 4 amu; a hydrogen nucleus is a single proton.',
    ['Compare relative masses in amu.', 'Protons and neutrons are about 1 amu each.', 'The particle about 2000 times lighter than a proton.']);

  M(A2, 2, 'Concept', 'A proton is approximately how many times more massive than an electron?',
    'about 1800 times', ['about the same mass', 'about 2 times', 'about 100 times', 'about 1 million times'],
    'Proton 1.00727 amu ÷ electron 0.00054858 amu ≈ 1836. That is why essentially all of an atom\'s mass is in its nucleus (99.97%) and why electrons are ignored when calculating mass numbers.',
    ['Electron mass ≈ 0.00055 amu; proton mass ≈ 1.007 amu.', 'Divide the two.', 'Roughly two thousand.']);

  M(A2, 2, 'Concept', 'Which statement about the nucleus is correct?',
    'It contains nearly all of the atom\'s mass but only a tiny fraction of its volume', ['It contains most of the atom\'s volume but little of its mass', 'It contains the electrons and protons', 'It is negatively charged', 'Its diameter is about half the diameter of the atom'],
    'The nucleus holds the protons and neutrons - about 99.97% of the mass - yet an atom\'s diameter (~10⁻¹⁰ m) is roughly 20,000 times the nucleus\'s (~5 × 10⁻¹⁵ m). It is positively charged, and electrons occupy the space around it.',
    ['Where are the heavy particles?', 'Rutherford: most alpha particles passed straight through.', 'Huge mass, tiny size.']);

  M(A2, 1, 'Concept', 'The atomic number (Z) of an element is equal to the number of:',
    'protons in the nucleus', ['neutrons in the nucleus', 'protons plus neutrons', 'electrons in any ion of the element', 'isotopes of the element'],
    'Z = number of protons, and it defines the element: every carbon atom has Z = 6. In a NEUTRAL atom the number of electrons also equals Z, but in an ion it does not. Protons + neutrons is the mass number A.',
    ['What makes carbon carbon?', 'Electrons change in ions, so they cannot define the element.', 'Z counts one kind of nuclear particle.']);

  M(A2, 1, 'Concept', 'The mass number (A) of an atom equals:',
    'the number of protons plus the number of neutrons', ['the number of protons only', 'the number of neutrons only', 'the average atomic mass from the periodic table', 'the number of protons plus electrons'],
    'A = Z + N, the total number of nucleons. It is a whole number, unlike the average atomic mass on the periodic table (e.g., 35.45 for Cl), which is a weighted average of isotopic masses.',
    ['It counts the heavy particles.', 'Electrons are too light to count toward mass number.', 'A = Z + N.']);

  M(A2, 2, 'Calculation', 'How many neutrons are in an atom of chlorine-37 (³⁷Cl)?',
    '20', ['17', '37', '54', '18'],
    'Chlorine has Z = 17. N = A − Z = 37 − 17 = 20. Distractors: 17 is the number of protons; 37 is the mass number; 54 adds A and Z; 18 is the neutron count of chlorine-35.',
    ['Look up chlorine\'s atomic number.', 'N = A − Z.', '37 − 17.']);

  const br = pne('Br', 81, -1);
  M(A2, 2, 'Calculation', 'How many protons, neutrons and electrons are in the ion ⁸¹Br⁻?',
    `${br.p} p, ${br.n} n, ${br.e} e⁻`, [`${br.p} p, ${br.n} n, ${br.e - 2} e⁻`, `${br.p} p, ${br.n} n, ${br.p} e⁻`, `${br.p} p, 81 n, ${br.e} e⁻`, `${br.n} p, ${br.p} n, ${br.e} e⁻`],
    `Br: Z = 35, so 35 protons. N = 81 − 35 = 46 neutrons. A 1− charge means one EXTRA electron: 35 + 1 = 36 electrons. Distractors: 34 e⁻ removes an electron (the sign of the charge reversed); 35 e⁻ ignores the charge; 81 n uses the mass number; swapping p and n confuses Z with N.`,
    ['Z from the periodic table gives protons.', 'Neutrons = A − Z.', 'A negative charge means MORE electrons than protons.']);

  N(A2, 2, 'Calculation', 'How many electrons are in the ion ⁵⁶Fe³⁺? (Enter a whole number.)',
    String(pne('Fe', 56, 3).e), pne('Fe', 56, 3).e,
    'Fe has Z = 26, so a neutral atom has 26 electrons. A 3+ charge means 3 electrons have been REMOVED: 26 − 3 = 23 electrons. (The ion has 26 protons and 56 − 26 = 30 neutrons.) Trap: adding 3 gives 29.',
    ['Start with the neutral atom: electrons = Z.', 'A positive charge means electrons were lost.', '26 electrons minus 3 lost electrons.'], { abs: 0.4 });

  M(A2, 2, 'Calculation', 'How many protons, neutrons and electrons are in ³²S²⁻?',
    '16 p, 16 n, 18 e⁻', ['16 p, 16 n, 14 e⁻', '16 p, 16 n, 16 e⁻', '18 p, 14 n, 18 e⁻', '16 p, 32 n, 18 e⁻'],
    'S: Z = 16 → 16 protons. N = 32 − 16 = 16 neutrons. 2− charge → two extra electrons: 16 + 2 = 18 e⁻ (the same as argon). Distractors: 14 e⁻ subtracts instead of adding; 16 e⁻ ignores the charge; 18 p changes the element; 32 n uses the mass number.',
    ['Protons come from Z.', 'Neutrons = A − Z.', 'A 2− ion has two more electrons than protons.']);

  M(A2, 2, 'Calculation', 'How many protons, neutrons and electrons are in ²⁷Al³⁺?',
    '13 p, 14 n, 10 e⁻', ['13 p, 14 n, 16 e⁻', '13 p, 14 n, 13 e⁻', '13 p, 27 n, 10 e⁻', '10 p, 14 n, 13 e⁻'],
    'Al: Z = 13 → 13 protons. N = 27 − 13 = 14. 3+ charge → three electrons lost: 13 − 3 = 10 e⁻ (isoelectronic with Ne). Distractors: 16 e⁻ adds the charge; 13 e⁻ ignores it; 27 n uses A; the last one swaps protons and electrons.',
    ['Protons = Z.', 'Neutrons = A − Z.', 'Cation: electrons = Z − charge.']);

  M(A2, 2, 'Calculation', 'How many protons, neutrons and electrons are in ¹³⁷Ba²⁺?',
    '56 p, 81 n, 54 e⁻', ['56 p, 81 n, 58 e⁻', '56 p, 137 n, 54 e⁻', '54 p, 83 n, 54 e⁻', '56 p, 81 n, 56 e⁻'],
    'Ba: Z = 56. N = 137 − 56 = 81. Ba²⁺ has lost 2 electrons: 56 − 2 = 54 (isoelectronic with Xe). Distractors: 58 e⁻ adds the charge; 137 n uses A; 54 p changes the element (the charge never changes the number of protons); 56 e⁻ ignores the charge.',
    ['The charge only changes the electrons.', 'N = A − Z = 137 − 56.', 'A 2+ ion has two fewer electrons than protons.']);

  N(A2, 2, 'Calculation', 'How many neutrons are in an atom of lead-207 (²⁰⁷Pb)? (Enter a whole number.)',
    String(207 - Z.Pb), 207 - Z.Pb,
    'Pb has Z = 82. N = A − Z = 207 − 82 = 125 neutrons. Trap: 207.2 is the average atomic mass of lead, not a mass number - the mass number of this isotope is given as 207.',
    ['Find lead\'s atomic number on the periodic table.', 'N = A − Z.', '207 − 82.'], { abs: 0.4 });

  M(A2, 3, 'Concept', 'Which species has 34 protons, 45 neutrons and 36 electrons?',
    '⁷⁹Se²⁻', ['⁷⁹Br⁻', '⁴⁵Se²⁻', '⁷⁹Kr', '⁷⁹Se²⁺'],
    'Protons fix the element: Z = 34 is selenium. A = 34 + 45 = 79. Charge = protons − electrons = 34 − 36 = −2. So the species is ⁷⁹Se²⁻. Distractors: Br (Z = 35) and Kr (Z = 36) have the wrong number of protons (Kr uses the electron count); ⁴⁵Se uses N as the mass number; Se²⁺ gets the sign of the charge backwards.',
    ['Which element has Z = 34?', 'Mass number = protons + neutrons.', 'Charge = protons − electrons.']);

  M(A2, 3, 'Concept', 'Which species has 26 protons, 30 neutrons and 24 electrons?',
    '⁵⁶Fe²⁺', ['⁵⁶Fe²⁻', '³⁰Fe²⁺', '⁵⁶Cr', '⁵⁴Cr²⁺'],
    'Z = 26 is iron; A = 26 + 30 = 56; charge = 26 − 24 = +2 → ⁵⁶Fe²⁺. Distractors: Fe²⁻ reverses the sign; ³⁰Fe uses N as A; ⁵⁶Cr identifies the element from the electron count (Cr has Z = 24); ⁵⁴Cr²⁺ takes Z from the electron count (Cr) and adds the neutrons to it.',
    ['Protons → element.', 'A = p + n.', 'Fewer electrons than protons → positive ion.']);

  M(A2, 3, 'Concept', 'Which pair are ISOTOPES of the same element?',
    '²³⁵U and ²³⁸U', ['¹⁴C and ¹⁴N', '⁴⁰Ar and ⁴⁰Ca', 'O₂ and O₃', '³⁹K and ⁴⁰Ca'],
    'Isotopes have the same atomic number (same element) and different numbers of neutrons. ²³⁵U and ²³⁸U both have Z = 92 (with 143 and 146 neutrons). ¹⁴C/¹⁴N and ⁴⁰Ar/⁴⁰Ca share a mass number but are different elements; ³⁹K and ⁴⁰Ca share a neutron count (20) but are different elements; O₂ and O₃ are molecules (allotropes), not isotopes.',
    ['Isotopes = same element.', 'The left superscript (A) can differ; the element symbol cannot.', 'Same Z, different N.']);

  const nn = (s, A) => A - Z[s];
  M(A2, 3, 'Concept', 'Which pair of atoms contains the SAME number of neutrons?',
    '¹⁴C and ¹⁶O', ['¹²C and ¹⁴N', '³⁵Cl and ³⁷Cl', '⁴⁰Ar and ⁴⁰K', '²³Na and ²³Mg'],
    `N = A − Z. ¹⁴C: 14 − 6 = ${nn('C', 14)}; ¹⁶O: 16 − 8 = ${nn('O', 16)} → equal. Others: ¹²C ${nn('C', 12)} vs ¹⁴N ${nn('N', 14)}; ³⁵Cl ${nn('Cl', 35)} vs ³⁷Cl ${nn('Cl', 37)} (isotopes differ in neutrons by definition); ⁴⁰Ar ${nn('Ar', 40)} vs ⁴⁰K ${nn('K', 40)}; ²³Na ${nn('Na', 23)} vs ²³Mg ${nn('Mg', 23)}. Trap: the same mass number does NOT mean the same number of neutrons.`,
    ['Work out N = A − Z for every atom.', 'Same A with different Z gives different N.', 'Carbon-14 has 8 neutrons - which oxygen isotope also has 8?']);
  chk('14C=16O', nn('C', 14), nn('O', 16), 0); [['C', 12, 'N', 14], ['Cl', 35, 'Cl', 37], ['Ar', 40, 'K', 40], ['Na', 23, 'Mg', 23]].forEach(([a, b, c, d]) => { if (nn(a, b) === nn(c, d)) throw new Error('neutron pair not distinct ' + a + b); });

  M(A2, 3, 'Concept', 'Which species is ISOELECTRONIC with (has the same number of electrons as) a neon atom?',
    'Mg²⁺', ['Na', 'Ca²⁺', 'Cl⁻', 'F'],
    'Neon has 10 electrons. Mg²⁺: 12 − 2 = 10 ✓. Na has 11; Ca²⁺ has 18 (like Ar); Cl⁻ has 18 (like Ar); F has 9 (F⁻ would have 10).',
    ['Ne has Z = 10.', 'Electrons in an ion = Z − charge.', 'Which ion has 10 electrons?']);

  const sp = [['Cl', 37, -1, '³⁷Cl⁻'], ['Cl', 35, -1, '³⁵Cl⁻'], ['F', 19, -1, '¹⁹F⁻'], ['S', 32, -2, '³²S²⁻'], ['K', 40, 1, '⁴⁰K⁺']];
  const ok = sp.filter(([s, A, q]) => { const x = pne(s, A, q); return x.e > x.p && x.n > x.e; });
  if (ok.length !== 1 || ok[0][3] !== '³⁷Cl⁻') throw new Error('species uniqueness failed');
  M(A2, 4, 'Trap', 'Which species has MORE electrons than protons AND more neutrons than electrons?',
    '³⁷Cl⁻', ['³⁵Cl⁻', '¹⁹F⁻', '³²S²⁻', '⁴⁰K⁺'],
    'Tabulate p, n, e⁻: ³⁷Cl⁻ 17, 20, 18 → e > p and n > e ✓. ³⁵Cl⁻ 17, 18, 18 (n = e). ¹⁹F⁻ 9, 10, 10 (n = e). ³²S²⁻ 16, 16, 18 (n < e). ⁴⁰K⁺ 19, 21, 18 (fewer electrons than protons). Only ³⁷Cl⁻ satisfies both conditions.',
    ['Anions have more electrons than protons - rule out the cation.', 'For each anion compute N = A − Z and e⁻ = Z − charge.', 'Look for n strictly greater than e.']);

  M(A2, 3, 'Calculation', 'An ion has a 2− charge, 18 electrons and a mass number of 34. How many neutrons does it have?',
    '18', ['16', '20', '34', '52'],
    'Protons = electrons + charge on an anion: 18 − 2 = 16 → the element is sulfur (Z = 16). N = A − Z = 34 − 16 = 18. Distractors: 16 is the number of protons; 20 adds the charge instead of subtracting it (Z = 20 would be Ca); 34 is A; 52 adds A and the electron count.',
    ['First find the number of protons from the electrons and the charge.', 'A 2− ion has 2 more electrons than protons.', 'Z = 16; then N = 34 − Z.']);

  M(A2, 3, 'Calculation', 'An atom has a mass number of 88 and contains 50 neutrons. Identify the element, and give the number of neutrons in its isotope with mass number 86.',
    'strontium (Sr); 48 neutrons', ['strontium (Sr); 50 neutrons', 'tin (Sn); 36 neutrons', 'strontium (Sr); 38 neutrons', 'yttrium (Y); 47 neutrons'],
    'Z = A − N = 88 − 50 = 38 → strontium. Isotopes have the same Z, so the A = 86 isotope has N = 86 − 38 = 48 neutrons. Distractors: 50 assumes neutrons stay fixed (they are what changes between isotopes); tin (Z = 50) uses N as Z; 38 is the proton count; yttrium is Z = 39.',
    ['Z = A − N.', 'Isotopes share Z but differ in N.', 'Z = 38; N = 86 − 38.']);

  M(A2, 2, 'Concept', 'Which symbol represents a neutral atom with 17 protons and 20 neutrons?',
    '³⁷₁₇Cl', ['²⁰₁₇Cl', '³⁷₂₀Ca', '³⁷₁₇Cl⁻', '¹⁷₃₇Cl'],
    'In ᴬ_Z X notation the left superscript is the mass number A = 17 + 20 = 37 and the left subscript is Z = 17 (chlorine): ³⁷₁₇Cl. Distractors: ²⁰₁₇Cl uses N as A; ³⁷₂₀Ca uses N as Z; ³⁷₁₇Cl⁻ is an ion (18 electrons), not a neutral atom; ¹⁷₃₇Cl swaps A and Z.',
    ['Top left = mass number, bottom left = atomic number.', 'A = protons + neutrons.', 'Z = 17 is chlorine; A = 37.']);

  M(A2, 4, 'Trap', 'Which statement about ⁴⁰K⁺ and ⁴⁰Ca²⁺ is FALSE?',
    'They are isotopes of each other', ['They have the same number of electrons', 'They have the same mass number', 'They have different numbers of protons', '⁴⁰K⁺ has one more neutron than ⁴⁰Ca²⁺'],
    `⁴⁰K⁺: 19 p, ${40 - 19} n, 18 e⁻. ⁴⁰Ca²⁺: 20 p, ${40 - 20} n, 18 e⁻. Same electrons (18) ✓, same A (40) ✓, different protons ✓, K⁺ has 21 vs 20 neutrons ✓. They are NOT isotopes - isotopes must be the same element (same Z). Trap: equal mass numbers or equal electron counts do not make two species isotopes.`,
    ['List p, n and e⁻ for each ion.', 'Isotopes must have the same number of protons.', 'K has Z = 19 and Ca has Z = 20.']);

  M(A2, 2, 'Concept', 'Why do the isotopes of an element have nearly identical chemical behavior?',
    'They have the same number of protons and therefore the same number of electrons', ['They have the same number of neutrons', 'They have the same mass', 'They have the same mass number', 'Their nuclei are all equally stable'],
    'Chemical behavior is governed by electrons, and the number of electrons in a neutral atom equals the number of protons, which is the same for all isotopes of an element. Isotopes differ in neutrons and therefore in mass, which barely affects chemistry.',
    ['What do isotopes have in common?', 'Which particles take part in chemical reactions?', 'Same Z → same number of electrons.']);

  /* ================= isotopes and average atomic mass (lesson 2) ================= */
  M(A2, 1, 'Concept', 'One atomic mass unit (amu, or dalton) is defined as:',
    'exactly 1/12 the mass of one carbon-12 atom', ['the mass of one hydrogen atom', 'the mass of one proton', 'the mass of one neutron', '1/16 the mass of one oxygen atom'],
    'The modern standard is carbon-12, assigned exactly 12 amu; 1 amu = 1/12 of its mass = 1.66054 × 10⁻²⁴ g. A ¹H atom has a mass of 1.008 amu, and a proton 1.00727 amu, so neither is exactly 1 amu.',
    ['The standard is a specific carbon isotope.', 'That isotope is assigned exactly 12 amu.', 'So 1 amu is one twelfth of it.']);

  M(A2, 2, 'Concept', 'In a mass spectrometer, positive ions of different isotopes pass through a magnetic field. Which ions are deflected the MOST?',
    'the lightest ions (lowest mass/charge ratio)', ['the heaviest ions (highest mass/charge ratio)', 'all ions are deflected equally', 'only neutral atoms are deflected', 'the ions of the most abundant isotope'],
    'A mass spectrometer separates particles by their mass-to-charge ratio. For the same charge, the lightest particles have the least momentum and bend the most; the heaviest bend least. The detector records each isotope\'s position and relative abundance.',
    ['Think of a heavy truck vs a bicycle turning a corner.', 'Same charge, different masses.', 'Lowest m/e bends most.']);

  const cu = [[62.9296, 69.15], [64.9278, 30.85]];
  const avg = iso => iso.reduce((s, [m, p]) => s + m * p / 100, 0);
  M(A2, 2, 'Calculation', 'Copper consists of ⁶³Cu (62.9296 amu, 69.15%) and ⁶⁵Cu (64.9278 amu, 30.85%). What is the average atomic mass of copper?',
    fd(avg(cu), 2) + ' amu', [fd((62.9296 + 64.9278) / 2, 2) + ' amu', fd(62.9296 * 0.3085 + 64.9278 * 0.6915, 2) + ' amu', '64.00 amu', fd(63 * 0.6915 + 65 * 0.3085, 2) + ' amu'],
    `Average atomic mass = Σ(isotopic mass × fractional abundance) = 62.9296(0.6915) + 64.9278(0.3085) = ${fd(62.9296 * 0.6915, 3)} + ${fd(64.9278 * 0.3085, 3)} = ${fd(avg(cu), 2)} amu. It lies closer to 63 because ⁶³Cu is more abundant. Distractors: ${fd((62.9296 + 64.9278) / 2, 2)} is an unweighted average; ${fd(62.9296 * 0.3085 + 64.9278 * 0.6915, 2)} swaps the abundances; 64.00 averages the mass numbers; ${fd(63 * 0.6915 + 65 * 0.3085, 2)} weights the mass numbers instead of the isotopic masses.`,
    ['Convert percents to fractions (÷ 100).', 'Multiply each isotopic mass by its own fraction, then add.', 'The answer must be closer to the more abundant isotope.']);

  const si = [[27.9769, 92.23], [28.9765, 4.67], [29.9738, 3.10]];
  M(A2, 3, 'Calculation', 'Silicon has three naturally occurring isotopes: ²⁸Si (27.9769 amu, 92.23%), ²⁹Si (28.9765 amu, 4.67%) and ³⁰Si (29.9738 amu, 3.10%). What is the average atomic mass of silicon?',
    fd(avg(si), 2) + ' amu', [fd((27.9769 + 28.9765 + 29.9738) / 3, 2) + ' amu', fd(27.9769 * 0.0310 + 28.9765 * 0.0467 + 29.9738 * 0.9223, 2) + ' amu', fd(27.9769 * 0.9223 + 28.9765 * 0.0467, 2) + ' amu', '29.00 amu'],
    `27.9769(0.9223) + 28.9765(0.0467) + 29.9738(0.0310) = ${fd(27.9769 * 0.9223, 3)} + ${fd(28.9765 * 0.0467, 3)} + ${fd(29.9738 * 0.0310, 3)} = ${fd(avg(si), 2)} amu. Distractors: ${fd((27.9769 + 28.9765 + 29.9738) / 3, 2)} is unweighted; ${fd(27.9769 * 0.0310 + 28.9765 * 0.0467 + 29.9738 * 0.9223, 2)} gives the big abundance to the wrong isotope; ${fd(27.9769 * 0.9223 + 28.9765 * 0.0467, 2)} leaves out ³⁰Si; 29.00 averages the mass numbers.`,
    ['Sum (mass × fractional abundance) over all three isotopes.', '92.23% → 0.9223.', 'Check: the answer should be just above 28.']);
  chk('Si avg', avg(si), 28.09, 0.005);

  const mg = [[23.9850, 78.99], [24.9858, 10.00], [25.9826, 11.01]];
  N(A2, 3, 'Calculation', 'Magnesium consists of ²⁴Mg (23.9850 amu, 78.99%), ²⁵Mg (24.9858 amu, 10.00%) and ²⁶Mg (25.9826 amu, 11.01%). Calculate the average atomic mass of magnesium. (Enter a number in amu, to two decimal places.)',
    fd(avg(mg), 2) + ' amu', Number(fd(avg(mg), 2)),
    `23.9850(0.7899) + 24.9858(0.1000) + 25.9826(0.1101) = ${fd(23.9850 * 0.7899, 4)} + ${fd(24.9858 * 0.1, 4)} + ${fd(25.9826 * 0.1101, 4)} = ${fd(avg(mg), 4)} → ${fd(avg(mg), 2)} amu, matching the periodic table. Trap: averaging the three masses without weights gives 24.98 amu.`,
    ['Change each percent into a decimal fraction.', 'Multiply and add the three contributions.', 'The result should be close to 24 because ²⁴Mg dominates.'], { abs: 0.01 });

  M(A2, 2, 'Concept', 'Lithium has two isotopes, ⁶Li (6.015 amu) and ⁷Li (7.016 amu), and an average atomic mass of 6.94 amu. Which statement is correct?',
    '⁷Li is much more abundant than ⁶Li', ['⁶Li is much more abundant than ⁷Li', 'The two isotopes are equally abundant', 'Some lithium atoms have a mass of exactly 6.94 amu', 'The data are impossible because 6.94 is not a whole number'],
    'The average (6.94) lies much closer to 7.016 than to 6.015, so ⁷Li must dominate (about 92%). No individual atom has the average mass, and an average of isotopic masses is not expected to be a whole number.',
    ['The weighted average is pulled toward the more abundant isotope.', 'Is 6.94 nearer to 6.015 or 7.016?', 'Equal abundance would give about 6.52.']);

  const ga = [68.9256, 70.9247], gaAvg = 69.723;
  const xGa = (ga[1] - gaAvg) / (ga[1] - ga[0]);
  N(A2, 4, 'Calculation', `Gallium (atomic mass ${gaAvg} amu) has two isotopes: ⁶⁹Ga (${ga[0]} amu) and ⁷¹Ga (${ga[1]} amu). What is the percent abundance of ⁶⁹Ga? (Enter a number in %.)`,
    fx(xGa * 100, 3) + '%', Number(fx(xGa * 100, 4)),
    `Let x = fractional abundance of ⁶⁹Ga, so ⁷¹Ga is 1 − x. ${ga[0]}x + ${ga[1]}(1 − x) = ${gaAvg} → ${ga[1]} − ${fd(ga[1] - ga[0], 4)}x = ${gaAvg} → x = (${ga[1]} − ${gaAvg}) ÷ ${fd(ga[1] - ga[0], 4)} = ${fx(xGa, 4)} → ${fx(xGa * 100, 3)}% ⁶⁹Ga (and ${fx(100 - xGa * 100, 3)}% ⁷¹Ga). Check: the average is closer to 69, so ⁶⁹Ga should be the majority. Trap: solving for the wrong isotope gives ${fx(100 - xGa * 100, 3)}%.`,
    ['The two fractional abundances add up to 1.', 'Write mass₁·x + mass₂·(1 − x) = average and solve for x.', 'x = (mass₂ − average) ÷ (mass₂ − mass₁).'], { tol: 0.005 });

  const cl = [34.9689, 36.9659], clAvg = 35.45;
  const xCl = (cl[1] - clAvg) / (cl[1] - cl[0]);
  M(A2, 4, 'Exam', `Chlorine (atomic mass ${clAvg} amu) consists of ³⁵Cl (${cl[0]} amu) and ³⁷Cl (${cl[1]} amu). What are the natural abundances?`,
    `${fx(xCl * 100, 3)}% ³⁵Cl and ${fx(100 - xCl * 100, 3)}% ³⁷Cl`, [`${fx(100 - xCl * 100, 3)}% ³⁵Cl and ${fx(xCl * 100, 3)}% ³⁷Cl`, '50.0% ³⁵Cl and 50.0% ³⁷Cl', `${fx((37 - clAvg) / 2 * 100, 3)}% ³⁵Cl and ${fx(100 - (37 - clAvg) / 2 * 100, 3)}% ³⁷Cl`, `${fx(clAvg / cl[1] * 100, 3)}% ³⁵Cl and ${fx(100 - clAvg / cl[1] * 100, 3)}% ³⁷Cl`],
    `Let x = fraction of ³⁵Cl: ${cl[0]}x + ${cl[1]}(1 − x) = ${clAvg} → x = (${cl[1]} − ${clAvg}) ÷ (${cl[1]} − ${cl[0]}) = ${fd(cl[1] - clAvg, 4)} ÷ ${fd(cl[1] - cl[0], 4)} = ${fx(xCl, 4)}. So ${fx(xCl * 100, 3)}% ³⁵Cl and ${fx(100 - xCl * 100, 3)}% ³⁷Cl. Distractors: swapping the two (the average would then be near 36.5); 50/50 (average 35.97); using mass numbers 35 and 37 instead of isotopic masses gives ${fx((37 - clAvg) / 2 * 100, 3)}%; dividing 35.45 by 36.9659 is not an abundance calculation.`,
    ['Fractions add to 1: x and 1 − x.', 'Solve mass₁·x + mass₂(1 − x) = 35.45.', '35.45 is closer to 35, so ³⁵Cl is the majority.']);

  const brm = [78.9183, 80.9163], brAvg = 79.90;
  const xBr = (brm[1] - brAvg) / (brm[1] - brm[0]);
  M(A2, 4, 'Calculation', `Bromine (atomic mass ${fd(brAvg, 2)} amu) has two isotopes, ⁷⁹Br (${brm[0]} amu) and ⁸¹Br (${brm[1]} amu). What is the percent abundance of ⁷⁹Br?`,
    fx(xBr * 100, 3) + '%', [fx(100 - xBr * 100, 3) + '%', '50.0%', fx((81 - brAvg) / 2 * 100, 3) + '%', fx(brAvg / brm[1] * 100, 3) + '%'],
    `x(${brm[0]}) + (1 − x)(${brm[1]}) = ${fd(brAvg, 2)} → x = (${brm[1]} − ${fd(brAvg, 2)}) ÷ (${brm[1]} − ${brm[0]}) = ${fd(brm[1] - brAvg, 4)} ÷ ${fd(brm[1] - brm[0], 4)} = ${fx(xBr, 4)} → ${fx(xBr * 100, 3)}% ⁷⁹Br. The average is almost exactly midway, so the isotopes are nearly 50 : 50 - but not quite. Distractors: ${fx(100 - xBr * 100, 3)}% is ⁸¹Br; 50.0% assumes equal amounts; ${fx((81 - brAvg) / 2 * 100, 3)}% uses mass numbers; ${fx(brAvg / brm[1] * 100, 3)}% divides the average by an isotopic mass.`,
    ['Set up the weighted-average equation with x and 1 − x.', 'Use the isotopic masses, not the mass numbers.', 'x = (80.9163 − 79.90) ÷ 1.9980.']);

  const mg26 = (24.305 - 23.9850 * 0.7899 - 24.9858 * 0.1000) / 0.1101;
  N(A2, 4, 'Calculation', 'Magnesium has an average atomic mass of 24.305 amu. ²⁴Mg (23.9850 amu) is 78.99% abundant and ²⁵Mg (24.9858 amu) is 10.00% abundant; the rest is ²⁶Mg. What is the isotopic mass of ²⁶Mg? (Enter a number in amu.)',
    fd(mg26, 2) + ' amu', Number(fd(mg26, 2)),
    `Abundance of ²⁶Mg = 100.00 − 78.99 − 10.00 = 11.01%. 24.305 = 23.9850(0.7899) + 24.9858(0.1000) + m(0.1101) = ${fd(23.985 * 0.7899, 4)} + ${fd(24.9858 * 0.1, 4)} + 0.1101m. So 0.1101m = 24.305 − ${fd(23.985 * 0.7899 + 2.49858, 4)} = ${fd(24.305 - 23.985 * 0.7899 - 2.49858, 4)}, and m = ${fd(mg26, 2)} amu. Check: it should be just under 26. Trap: forgetting to find the third abundance (or using 100% for it) gives a meaningless mass.`,
    ['The three abundances add to 100%.', 'Write the full weighted-average equation with the unknown mass.', 'Subtract the two known contributions, then divide by 0.1101.'], { abs: 0.02 });

  /* ================= periodic table (lesson 2) ================= */
  M(A2, 1, 'Concept', 'The elements in Group 17 (F, Cl, Br, I) are called the:',
    'halogens', ['alkali metals', 'noble gases', 'alkaline earth metals', 'chalcogens'],
    'Group 17 = halogens (reactive nonmetals that form 1− ions). Group 1 = alkali metals, Group 2 = alkaline earth metals, Group 16 = chalcogens (oxygen family), Group 18 = noble gases.',
    ['Second-to-last column.', 'They form salts with metals (the name means "salt-former").', 'F, Cl, Br, I.']);

  M(A2, 1, 'Concept', 'The horizontal rows of the periodic table are called:',
    'periods', ['groups', 'families', 'blocks', 'series of isotopes'],
    'Horizontal rows are periods; vertical columns are groups (also called families). Elements in the same group have similar chemical behavior.',
    ['Columns are groups.', 'The other direction has a different name.', 'Period 3 runs from Na to Ar.']);

  M(A2, 2, 'Concept', 'Which element is an ALKALINE EARTH metal?',
    'calcium (Ca)', ['sodium (Na)', 'aluminum (Al)', 'chlorine (Cl)', 'iron (Fe)'],
    'Alkaline earth metals are Group 2: Be, Mg, Ca, Sr, Ba, Ra. Sodium is an alkali metal (Group 1); aluminum is in Group 13; chlorine is a halogen; iron is a transition metal.',
    ['Alkaline earth metals form 2+ ions.', 'They are in Group 2.', 'Mg, Ca, Sr, Ba.']);

  M(A2, 2, 'Concept', 'Which element is a METALLOID?',
    'arsenic (As)', ['aluminum (Al)', 'selenium (Se)', 'tin (Sn)', 'phosphorus (P)'],
    'The metalloids lie along the staircase line: B, Si, Ge, As, Sb, Te. Aluminum and tin are metals; selenium and phosphorus are nonmetals.',
    ['Metalloids sit along the stair-step line between metals and nonmetals.', 'The list is B, Si, Ge, As, Sb, Te.', 'Which choice is on that list?']);

  M(A2, 2, 'Concept', 'Which element is a TRANSITION metal?',
    'manganese (Mn)', ['magnesium (Mg)', 'gallium (Ga)', 'calcium (Ca)', 'antimony (Sb)'],
    'Transition metals fill the middle block, Groups 3-12 (Sc to Zn in period 4). Mn is in Group 7. Mg and Ca are Group 2 metals; Ga is a Group 13 main-group metal; Sb is a metalloid. Trap: Mn and Mg look alike.',
    ['Transition metals are in Groups 3 to 12.', 'Find each element\'s group number.', 'Do not confuse Mg with Mn.']);

  M(A2, 3, 'Concept', 'Which description fits the element with atomic number Z = 34?',
    'selenium - a nonmetal in Group 16, period 4', ['selenium - a metal in Group 6, period 4', 'bromine - a halogen in Group 17, period 4', 'arsenic - a metalloid in Group 15, period 4', 'strontium - an alkaline earth metal in Group 2, period 5'],
    'Z = 34 is selenium (Se), in period 4 and Group 16 (same group as O and S), and it is a nonmetal. Bromine is 35, arsenic 33, strontium 38. "Group 6" confuses the old 6A label with the transition-metal Group 6 (Cr).',
    ['Find Z = 34 on the periodic table.', 'It sits just below sulfur.', 'Group 16, period 4.']);

  M(A2, 3, 'Concept', 'Which element is in period 4, Group 15, and what kind of element is it?',
    'arsenic, a metalloid', ['phosphorus, a nonmetal', 'antimony, a metalloid', 'selenium, a nonmetal', 'vanadium, a transition metal'],
    'Period 4, Group 15 is arsenic (As, Z = 33), one of the metalloids. Phosphorus is period 3; antimony is period 5; selenium is Group 16; vanadium is Group 5 (a transition metal) in period 4.',
    ['Period = row, Group = column.', 'Group 15 is the nitrogen family.', 'Go down from N and P to period 4.']);

  M(A2, 2, 'Concept', 'Which property is typical of NONMETALS?',
    'they tend to gain electrons to form anions', ['they are shiny and conduct electricity well', 'they tend to lose electrons to form cations', 'they are malleable and ductile', 'they are all gases at room temperature'],
    'Nonmetals (upper right of the table) tend to gain electrons and form anions (O²⁻, Cl⁻). Shine, conductivity, malleability and forming cations are metal properties. Nonmetals include solids (C, S, P, I) and a liquid (Br₂), not only gases.',
    ['Metals vs nonmetals: which side gains electrons?', 'Think of chlorine becoming chloride.', 'Gaining electrons gives a negative ion.']);

  M(A2, 3, 'Concept', 'Which set contains ONLY metals?',
    'Na, Mg, Fe', ['Na, Si, Fe', 'K, Ca, Br', 'B, Al, Ga', 'Cu, As, Zn'],
    'Na (alkali metal), Mg (alkaline earth metal) and Fe (transition metal) are all metals. Si, B and As are metalloids; Br is a nonmetal.',
    ['Check each element\'s position relative to the staircase.', 'B, Si, Ge, As, Sb, Te are metalloids.', 'One set has no metalloid or nonmetal.']);

  M(A2, 2, 'Concept', 'Which element would you expect to be most similar chemically to sulfur?',
    'selenium (Se)', ['phosphorus (P)', 'chlorine (Cl)', 'silicon (Si)', 'argon (Ar)'],
    'Elements in the same GROUP have similar chemical properties. Selenium is directly below sulfur in Group 16 (both form 2− ions, e.g., H₂S and H₂Se). P, Cl, Si and Ar are sulfur\'s neighbors in the same PERIOD, which does not make them chemically similar.',
    ['Similar chemistry comes from the same group, not the same period.', 'Sulfur is in Group 16.', 'Which choice is in Group 16?']);

  /* ================= ions; ionic vs molecular (lesson 2) ================= */
  M(A2, 1, 'Concept', 'What ion does calcium form?',
    'Ca²⁺', ['Ca⁺', 'Ca²⁻', 'Ca³⁺', 'Ca⁻'],
    'Calcium is in Group 2. It loses its two outer electrons to reach the electron count of argon (20 − 2 = 18), forming Ca²⁺. Metals form cations, never anions.',
    ['Calcium is a metal in Group 2.', 'Group 2 metals lose two electrons.', 'Losing electrons gives a positive charge.']);

  M(A2, 2, 'Concept', 'What monatomic ion does nitrogen form in ionic compounds such as Mg₃N₂?',
    'N³⁻', ['N³⁺', 'N⁵⁺', 'N⁻', 'N⁵⁻'],
    'Nitrogen is a Group 15 nonmetal. Main-group nonmetal anions have charge = group number − 18 = 15 − 18 = −3: N³⁻ (nitride), which has 10 electrons like neon. Check with Mg₃N₂: 3(+2) + 2(−3) = 0.',
    ['Nonmetals gain electrons.', 'Anion charge = group number − 18.', '15 − 18 = ?']);

  M(A2, 2, 'Concept', 'What monatomic ion does selenium form?',
    'Se²⁻', ['Se²⁺', 'Se⁶⁺', 'Se⁻', 'Se⁶⁻'],
    'Selenium is in Group 16 (below O and S): charge = 16 − 18 = −2, so selenide, Se²⁻, with 36 electrons like krypton.',
    ['Selenium is in the oxygen/sulfur group.', 'Group 16 nonmetals gain two electrons.', 'Like O²⁻ and S²⁻.']);

  M(A2, 2, 'Concept', 'Which ion is NOT one you would expect a main-group element to form?',
    'Na²⁺', ['Al³⁺', 'S²⁻', 'I⁻', 'Ba²⁺'],
    'Sodium (Group 1) loses just one electron to reach neon\'s electron count: Na⁺. Removing a second electron would mean removing an inner (core) electron, which is far too costly, so Na²⁺ does not form. Al³⁺ (Group 13), S²⁻ (Group 16), I⁻ (Group 17) and Ba²⁺ (Group 2) are all expected.',
    ['Check each ion against its group.', 'Group 1 → 1+, Group 2 → 2+, Group 13 → 3+, Group 16 → 2−, Group 17 → 1−.', 'Which charge does not match its group?']);

  M(A2, 4, 'Trap', 'A monatomic ion X²⁺ has 36 electrons. What is element X?',
    'strontium (Sr)', ['krypton (Kr)', 'selenium (Se)', 'rubidium (Rb)', 'zirconium (Zr)'],
    'A 2+ ion has 2 fewer electrons than protons, so protons = 36 + 2 = 38 → strontium (Group 2, which does form 2+ ions). Distractors: Kr (36) uses the electron count as Z; Se (34) subtracts the charge; Rb (37) adds only one; Zr is 40.',
    ['Protons = electrons + charge for a cation.', '36 + 2 = ?', 'Z = 38 - find it on the table.']);

  M(A2, 2, 'Concept', 'Which pair of ions BOTH have the same number of electrons as an argon atom?',
    'K⁺ and Cl⁻', ['Na⁺ and Cl⁻', 'K⁺ and F⁻', 'Li⁺ and Br⁻', 'Mg²⁺ and O²⁻'],
    'Argon has 18 electrons. K⁺: 19 − 1 = 18; Cl⁻: 17 + 1 = 18. ✓ Na⁺ (10) and F⁻ (10) and Mg²⁺/O²⁻ (10 each) match neon; Li⁺ (2) matches helium and Br⁻ (36) matches krypton.',
    ['Argon has 18 electrons.', 'Electrons in an ion = Z − charge.', 'Look for the period 3/4 neighbors of argon.']);

  M(A2, 2, 'Concept', 'Which compound is IONIC?',
    'KBr', ['CO₂', 'NH₃', 'SCl₂', 'CH₄'],
    'Ionic compounds generally form between a metal and a nonmetal: potassium (Group 1 metal) transfers an electron to bromine, giving K⁺ and Br⁻. The others are combinations of nonmetals only, so they are covalent (molecular).',
    ['Look for a metal combined with a nonmetal.', 'Which choice contains a metal?', 'Potassium is an alkali metal.']);

  M(A2, 2, 'Concept', 'Which compound is MOLECULAR (covalent) rather than ionic?',
    'N₂O₄', ['CaO', 'MgCl₂', 'Na₂S', 'Al₂O₃'],
    'N₂O₄ contains only nonmetals (N and O), so it is made of discrete covalently bonded molecules. CaO, MgCl₂, Na₂S and Al₂O₃ each combine a metal with a nonmetal and are ionic.',
    ['Covalent compounds usually contain only nonmetals.', 'Check each formula for a metal.', 'The one without a metal is molecular.']);

  M(A2, 3, 'Concept', 'Which substance contains BOTH ionic bonds and covalent bonds?',
    'Na₂SO₄', ['NaCl', 'SO₂', 'H₂O', 'CaF₂'],
    'In Na₂SO₄, Na⁺ ions are held to SO₄²⁻ ions by ionic bonding, while the S and O atoms inside the sulfate ion are held together by covalent bonds. NaCl and CaF₂ are purely ionic (monatomic ions); SO₂ and H₂O are purely covalent.',
    ['Polyatomic ions are held together internally by covalent bonds.', 'Which compound contains a polyatomic ion?', 'Sulfate = SO₄²⁻.']);

  M(A2, 2, 'Concept', 'Which property is typical of an IONIC compound?',
    'It conducts electricity when melted or dissolved in water', ['It has a low melting point', 'It exists as discrete molecules', 'It forms when two nonmetals share electrons', 'It conducts electricity as a solid'],
    'Ionic solids are arrays of ions locked in place, so they do not conduct as solids, but when melted or dissolved the ions can move and carry current. They have high melting points and no discrete molecules. Sharing electrons between nonmetals describes covalent bonding.',
    ['What carries current in a melted salt?', 'In the solid, the ions cannot move.', 'Mobile ions only when molten or dissolved.']);

  M(A2, 3, 'Concept', 'Why does magnesium form Mg²⁺ ions rather than Mg⁺ ions?',
    'Losing two electrons gives Mg the same number of electrons as the noble gas neon', ['Magnesium has two protons', 'Magnesium is in period 2', 'Losing two electrons gives Mg the same number of electrons as argon', 'Magnesium gains two electrons to complete its outer shell'],
    'Mg (Z = 12) loses its two outer electrons to reach 10 electrons, the same as neon, the nearest noble gas. It is in Group 2 and period 3 and has 12 protons. Metals lose electrons; they do not gain them.',
    ['How many electrons does Mg have, and which noble gas is nearest?', 'Ne has 10 electrons.', '12 − 2 = 10.']);

  M(A2, 4, 'Exam', 'Element X is in period 3 and forms an anion with 18 electrons and a 2− charge. Element Y is the Group 13 metal in period 3. What is the formula and name of the compound formed by X and Y?',
    'Al₂S₃, aluminum sulfide', ['Al₃S₂, aluminum sulfide', 'AlS, aluminum sulfide', 'Al₂(SO₄)₃, aluminum sulfate', 'Al₂S₃, dialuminum trisulfide'],
    'X: an anion with 18 e⁻ and 2− charge has 18 − 2 = 16 protons → S, forming S²⁻. Y: Group 13, period 3 → Al, forming Al³⁺. Neutral formula: 2 Al³⁺ (6+) balance 3 S²⁻ (6−) → Al₂S₃, aluminum sulfide. Distractors: Al₃S₂ swaps the subscripts; AlS ignores the charges; sulfate is SO₄²⁻, not S²⁻; ionic compounds never use numerical prefixes.',
    ['Find X from electrons and charge; find Y from its position.', 'Al forms 3+, S forms 2−.', 'Cross the charges: Al₂S₃.']);

  /* ================= nomenclature: binary ionic (lesson 3) ================= */
  M(A3, 1, 'Concept', 'What is the name of MgCl₂?',
    'magnesium chloride', ['magnesium dichloride', 'magnesium(II) chloride', 'manganese(II) chloride', 'magnesium chlorine'],
    'Binary ionic compound: metal name + nonmetal root + -ide. Magnesium forms only Mg²⁺, so no Roman numeral is used, and ionic names never use prefixes like di-. "Manganese" is Mn, a different element; "chlorine" is the element name, not the anion name.',
    ['Cation name, then anion name ending in -ide.', 'Mg forms only one ion, so no Roman numeral.', 'No prefixes in ionic names.']);

  M(A3, 2, 'Concept', 'What is the formula of aluminum oxide?',
    'Al₂O₃', ['AlO', 'Al₃O₂', 'AlO₃', 'Al₂O'],
    'Al³⁺ and O²⁻: the smallest whole numbers that balance charge are 2 Al³⁺ (6+) and 3 O²⁻ (6−) → Al₂O₃. Distractors either ignore the charges (AlO), swap them (Al₃O₂: 9+ and 4−), or leave the compound charged.',
    ['Aluminum forms 3+; oxide is 2−.', 'Find the lowest common multiple of 3 and 2.', 'Total positive charge = total negative charge = 6.']);

  M(A3, 2, 'Concept', 'What is the formula of magnesium nitride?',
    'Mg₃N₂', ['Mg₂N₃', 'MgN', 'Mg(NO₃)₂', 'Mg₃N'],
    'Mg²⁺ and N³⁻ (nitride, 15 − 18 = −3). Three Mg²⁺ (6+) balance two N³⁻ (6−): Mg₃N₂ (Silberberg Sample Problem 2.8). Mg(NO₃)₂ is magnesium NITRATE; the others are not charge-balanced.',
    ['Nitride is the monatomic ion of nitrogen.', 'Mg²⁺ and N³⁻.', 'LCM of 2 and 3 is 6.']);

  M(A3, 2, 'Concept', 'What is the name of Cs₂S?',
    'cesium sulfide', ['cesium sulfate', 'dicesium sulfide', 'cesium(I) sulfide', 'cesium sulfite'],
    'Cs⁺ (Group 1) and S²⁻ (sulfide). Two Cs⁺ balance one S²⁻. Name: cesium sulfide - no prefix (ionic) and no Roman numeral (Cs forms only one ion). Sulfate (SO₄²⁻) and sulfite (SO₃²⁻) contain oxygen.',
    ['Is there any oxygen in the formula?', 'S alone as an anion is sulfide.', 'Group 1 metals need no Roman numeral.']);

  /* transition metals and Roman numerals */
  M(A3, 2, 'Worksheet', 'What is the systematic name of Fe₂O₃ (Week 3 worksheet compound)?',
    'iron(III) oxide', ['iron(II) oxide', 'diiron trioxide', 'iron oxide', 'iron(III) trioxide'],
    'Oxide is O²⁻; three oxide ions carry 6−, so two Fe must carry 6+, i.e., each Fe is 3+. Fe forms more than one ion, so the charge goes in Roman numerals: iron(III) oxide. The numeral is the CHARGE, not the subscript. Prefixes (di-, tri-) are for molecular compounds only; "iron oxide" is ambiguous (FeO or Fe₂O₃).',
    ['Find the charge on each Fe from the total charge of the oxide ions.', '3 × (−2) = −6, shared by 2 Fe.', 'Fe³⁺ → iron(III).']);

  M(A3, 2, 'Concept', 'What is the name of FeO?',
    'iron(II) oxide', ['iron(I) oxide', 'iron(III) oxide', 'iron monoxide', 'iron oxide(II)'],
    'One O²⁻ (2−) means one Fe must be 2+: iron(II) oxide (common name ferrous oxide). The Roman numeral goes right after the metal name. "Monoxide" is molecular naming, not ionic.',
    ['Oxide is 2−.', 'One Fe balances one O²⁻.', 'Fe²⁺ → iron(II).']);

  M(A3, 3, 'Concept', 'What is the systematic name of CrI₃?',
    'chromium(III) iodide', ['chromium triiodide', 'chromium(I) iodide', 'chromium iodide', 'chromium(III) iodine'],
    'Three I⁻ ions (3−) require Cr³⁺: chromium(III) iodide (Silberberg Sample Problem 2.9). Chromium forms more than one ion (Cr²⁺, Cr³⁺), so the numeral is required. No prefixes in ionic names; the anion is iodide, not iodine.',
    ['Iodide is I⁻.', 'Three of them balance one Cr - what is Cr\'s charge?', 'Roman numeral = charge on Cr.']);

  M(A3, 3, 'Concept', 'What is the systematic name of CoS?',
    'cobalt(II) sulfide', ['cobalt(I) sulfide', 'cobalt sulfide', 'copper(II) sulfide', 'cobalt(II) sulfate'],
    'Sulfide is S²⁻, so Co is Co²⁺: cobalt(II) sulfide. Cobalt forms 2+ and 3+ ions, so the numeral is required. Co is cobalt, not copper (Cu); sulfate would be SO₄²⁻.',
    ['S alone is sulfide, 2−.', 'One Co balances one S²⁻.', 'Co²⁺ → cobalt(II).']);

  M(A3, 3, 'Concept', 'What is the formula of lead(IV) oxide?',
    'PbO₂', ['Pb₄O', 'PbO', 'PbO₄', 'Pb₄O₂'],
    'lead(IV) = Pb⁴⁺; oxide = O²⁻. Two O²⁻ (4−) balance one Pb⁴⁺: PbO₂. Trap: the Roman numeral is the charge, not a subscript, so Pb₄O, PbO₄ and Pb₄O₂ all misuse it (none is charge-balanced with Pb⁴⁺ and O²⁻); PbO is lead(II) oxide.',
    ['(IV) means a 4+ charge on lead.', 'Oxide is 2−.', 'How many O²⁻ balance 4+?']);

  M(A3, 3, 'Concept', 'What is the systematic name of Cu₂S?',
    'copper(I) sulfide', ['copper(II) sulfide', 'dicopper sulfide', 'copper(I) sulfite', 'copper sulfide'],
    'S²⁻ (2−) is balanced by two Cu, so each Cu is 1+: copper(I) sulfide (cuprous sulfide). Trap: reading the subscript 2 as the charge gives copper(II). Sulfite is SO₃²⁻; prefixes are not used for ionic compounds; copper forms two ions, so the numeral is needed.',
    ['Total negative charge = 2−, shared by two Cu.', 'Each Cu is +1.', 'The Roman numeral is the charge on ONE copper ion.']);

  M(A3, 3, 'Trap', 'What is the formula of iron(II) sulfate?',
    'FeSO₄', ['Fe₂(SO₄)₃', 'Fe₂SO₄', 'Fe(SO₄)₂', 'FeSO₃'],
    'Fe²⁺ and SO₄²⁻ balance one-to-one: FeSO₄ (Silberberg Sample Problem 2.11 corrects exactly this mistake). Fe₂(SO₄)₃ is iron(III) sulfate; Fe₂SO₄ treats the numeral as a subscript; Fe(SO₄)₂ would need Fe⁴⁺; FeSO₃ is iron(II) sulfite.',
    ['Sulfate is SO₄²⁻.', 'Iron(II) is Fe²⁺.', '2+ and 2− balance in a 1 : 1 ratio.']);

  M(A3, 3, 'Concept', 'What is the formula of copper(II) nitride?',
    'Cu₃N₂', ['Cu(NO₃)₂', 'Cu₂N₃', 'CuN₂', 'Cu₂N'],
    'Cu²⁺ and N³⁻ (nitride). LCM of 2 and 3 is 6: three Cu²⁺ and two N³⁻ → Cu₃N₂. Cu(NO₃)₂ is copper(II) NITRATE (a common confusion); the others are not charge-balanced.',
    ['Nitride (N³⁻) is not nitrate (NO₃⁻).', 'Copper(II) = Cu²⁺.', 'Balance 2+ against 3−.']);

  M(A3, 2, 'Concept', 'What is the formula of tin(IV) chloride?',
    'SnCl₄', ['SnCl₂', 'Sn₄Cl', 'SnCl', 'TiCl₄'],
    'tin(IV) = Sn⁴⁺; four Cl⁻ balance it: SnCl₄. SnCl₂ is tin(II) chloride; Sn₄Cl misuses the numeral as a subscript; Ti is titanium, not tin.',
    ['The symbol for tin is Sn (from Latin stannum).', '(IV) is the charge, +4.', 'Four chloride ions.']);

  M(A3, 1, 'Concept', 'The common (trivial) name "cuprous" refers to which ion?',
    'Cu⁺, copper(I)', ['Cu²⁺, copper(II)', 'Co²⁺, cobalt(II)', 'Cu³⁺, copper(III)', 'Cr³⁺, chromium(III)'],
    'In common names, -ous is the LOWER charge and -ic the higher: cuprous = Cu⁺, cupric = Cu²⁺ (memory aid: the o in -ous and lower, the i in -ic and higher). "Cupr-" is the Latin root for copper.',
    ['-ous vs -ic: which is lower?', 'Copper forms Cu⁺ and Cu²⁺.', 'o in -ous, o in lower.']);

  /* polyatomic ions */
  M(A3, 1, 'Concept', 'What is the formula of the sulfite ion?',
    'SO₃²⁻', ['SO₄²⁻', 'S²⁻', 'SO₃⁻', 'HSO₃⁻'],
    'Sulfate is SO₄²⁻; sulfite has one fewer O and the same charge: SO₃²⁻. S²⁻ is sulfide; HSO₃⁻ is hydrogen sulfite; the charge of sulfite is 2−, not 1−.',
    ['-ate has more oxygen than -ite.', 'Start from sulfate, SO₄²⁻.', 'Remove one O; keep the charge.']);

  M(A3, 1, 'Concept', 'What is the name of the ClO₂⁻ ion?',
    'chlorite', ['chlorate', 'hypochlorite', 'perchlorate', 'chloride'],
    'The chlorine oxoanion family: ClO₄⁻ perchlorate, ClO₃⁻ chlorate, ClO₂⁻ chlorite, ClO⁻ hypochlorite. Chloride is Cl⁻ with no oxygen.',
    ['Recall the four oxoanions of chlorine.', 'Chlorate is ClO₃⁻.', 'One fewer O than chlorate → -ite.']);

  M(A3, 2, 'Concept', 'Which formula-name pair is CORRECT?',
    'MnO₄⁻ - permanganate', ['CrO₄²⁻ - dichromate', 'NO₂⁻ - nitrate', 'HCO₃⁻ - carbonate', 'ClO₃⁻ - perchlorate'],
    'MnO₄⁻ is permanganate ✓. CrO₄²⁻ is chromate (dichromate is Cr₂O₇²⁻); NO₂⁻ is nitrite (nitrate is NO₃⁻); HCO₃⁻ is hydrogen carbonate (carbonate is CO₃²⁻); ClO₃⁻ is chlorate (perchlorate is ClO₄⁻).',
    ['Check each against the polyatomic ion list.', 'Watch for -ate vs -ite, per-, di- and hydrogen.', 'Permanganate has four O and a 1− charge.']);

  M(A3, 2, 'Concept', 'What is the charge on the phosphate ion, PO₄?',
    '3−', ['2−', '1−', '4−', '3+'],
    'Phosphate is PO₄³⁻ (sodium phosphate is Na₃PO₄). Hydrogen phosphate is HPO₄²⁻ and dihydrogen phosphate is H₂PO₄⁻ - each H⁺ added reduces the negative charge by one.',
    ['Na₃PO₄ is sodium phosphate.', 'Three Na⁺ balance one phosphate.', 'So phosphate carries 3−.']);

  M(A3, 2, 'Worksheet', 'What is the name of Li₂SO₃ (Week 3 worksheet compound)?',
    'lithium sulfite', ['lithium sulfate', 'lithium sulfide', 'dilithium sulfite', 'lithium(I) sulfite'],
    'SO₃²⁻ is sulfite; two Li⁺ balance it. Name: lithium sulfite. Sulfate is SO₄²⁻ and sulfide is S²⁻. Ionic names never use prefixes (dilithium), and lithium forms only Li⁺, so no Roman numeral.',
    ['Identify the polyatomic ion SO₃²⁻.', 'Sulfate has 4 O; sulfite has 3.', 'Group 1 metals need no numeral.']);

  M(A3, 1, 'Worksheet', 'What is the name of CaCO₃ (Week 3 worksheet compound)?',
    'calcium carbonate', ['calcium carbide', 'calcium hydrogen carbonate', 'calcium(II) carbonate', 'calcium carbonite'],
    'CO₃²⁻ is the carbonate ion; Ca²⁺ balances it 1 : 1. Name: calcium carbonate (limestone, chalk). Calcium forms only Ca²⁺, so no numeral; hydrogen carbonate is HCO₃⁻ (Ca(HCO₃)₂); "carbonite" is not an ion on the list.',
    ['CO₃²⁻ is a polyatomic ion you must know.', 'Ca forms only one ion.', 'Metal name + polyatomic ion name.']);

  M(A3, 2, 'Worksheet', 'What is the formula of lithium sulfite?',
    'Li₂SO₃', ['LiSO₃', 'Li₂SO₄', 'Li₂S', 'Li(SO₃)₂'],
    'Li⁺ and SO₃²⁻: two Li⁺ balance one sulfite → Li₂SO₃. LiSO₃ is not neutral; Li₂SO₄ is lithium sulfate; Li₂S is lithium sulfide; Li(SO₃)₂ would need Li⁴⁺.',
    ['Sulfite = SO₃²⁻.', 'Lithium = Li⁺.', 'Two Li⁺ per sulfite.']);

  M(A3, 3, 'Concept', 'What is the formula of calcium nitrate?',
    'Ca(NO₃)₂', ['CaNO₃', 'Ca(NO₂)₂', 'Ca₂NO₃', 'Ca₃N₂'],
    'Ca²⁺ needs two NO₃⁻ ions; parentheses show that the whole nitrate ion is doubled: Ca(NO₃)₂. CaNO₃ is not neutral; Ca(NO₂)₂ is calcium nitrite; Ca₂NO₃ has the ratio backwards; Ca₃N₂ is calcium nitride.',
    ['Nitrate = NO₃⁻.', 'Calcium = Ca²⁺.', 'Two nitrates - put the ion in parentheses.']);

  M(A3, 3, 'Concept', 'What is the formula of ammonium phosphate?',
    '(NH₄)₃PO₄', ['(NH₃)₄PO₄', 'NH₄PO₄', '(NH₄)₂PO₄', '(NH₄)₃PO₃'],
    'Ammonium is NH₄⁺; phosphate is PO₄³⁻. Three NH₄⁺ balance one PO₄³⁻: (NH₄)₃PO₄. (NH₃)₄PO₄ confuses ammonia with ammonium (Silberberg Follow-up 2.11A); the next two are not neutral; PO₃³⁻ is phosphite.',
    ['Both ions are polyatomic.', 'NH₄⁺ (1+) and PO₄³⁻ (3−).', 'Three ammonium ions in parentheses.']);

  M(A3, 3, 'Concept', 'What is the formula of aluminum hydroxide?',
    'Al(OH)₃', ['AlOH₃', 'AlOH', 'Al(OH)₂', 'Al₃OH'],
    'Al³⁺ needs three OH⁻: Al(OH)₃. The parentheses matter: AlOH₃ would mean one O and three H, not three hydroxide ions. The others are not charge-balanced.',
    ['Hydroxide is OH⁻.', 'Aluminum is 3+.', 'Three hydroxides need parentheses.']);

  M(A3, 3, 'Concept', 'What is the systematic name of Fe(ClO₄)₂?',
    'iron(II) perchlorate', ['iron(II) chlorate', 'iron diperchlorate', 'iron(III) perchlorate', 'iron(I) perchlorate'],
    'ClO₄⁻ is perchlorate (1−). Two of them (2−) mean Fe is 2+: iron(II) perchlorate (Silberberg Sample Problem 2.10). Chlorate is ClO₃⁻; no prefixes for ionic compounds; the numeral must equal the cation\'s charge.',
    ['Identify the anion: ClO₄⁻.', 'Two of them give 2−.', 'Fe²⁺ → iron(II).']);

  M(A3, 3, 'Trap', 'What is the name of Mg(HCO₃)₂?',
    'magnesium hydrogen carbonate', ['manganese(II) hydrogen carbonate', 'magnesium carbonate', 'magnesium(II) hydrogen carbonate', 'magnesium dihydrogen carbonate'],
    'Mg²⁺ with two HCO₃⁻ (hydrogen carbonate, also called bicarbonate): magnesium hydrogen carbonate. Mg is magnesium, not manganese (Mn) - Silberberg Follow-up 2.11A uses exactly this trap. Carbonate is CO₃²⁻ (MgCO₃); Mg needs no numeral; "dihydrogen" would wrongly describe the ion.',
    ['Mg or Mn? Check the symbol.', 'HCO₃⁻ is hydrogen carbonate.', 'One Mg²⁺, two HCO₃⁻.']);

  M(A3, 3, 'Concept', 'What is the name of Ca(NO₂)₂?',
    'calcium nitrite', ['calcium nitrate', 'cadmium nitrite', 'calcium dinitrite', 'calcium nitride'],
    'NO₂⁻ is nitrite (one fewer O than nitrate, NO₃⁻). Ca is calcium (Cd is cadmium). Ionic names use no prefixes. Nitride is N³⁻ (no oxygen).',
    ['Count the oxygens in the anion.', 'NO₃⁻ nitrate, NO₂⁻ nitrite.', 'Ca = calcium.']);

  M(A3, 3, 'Concept', 'What is the formula of potassium dichromate?',
    'K₂Cr₂O₇', ['K₂CrO₄', 'KCr₂O₇', 'K(Cr₂O₇)₂', 'K₃Cr₂O₇'],
    'Dichromate is Cr₂O₇²⁻; two K⁺ balance it: K₂Cr₂O₇. K₂CrO₄ is potassium chromate (CrO₄²⁻); the other three are not charge-balanced.',
    ['Dichromate = Cr₂O₇²⁻.', 'Potassium = K⁺.', 'Two K⁺ per dichromate.']);

  M(A3, 2, 'Concept', 'What is the formula of sodium hypochlorite (household bleach)?',
    'NaClO', ['NaClO₂', 'NaClO₃', 'NaCl', 'Na(ClO)₂'],
    'Hypochlorite is ClO⁻ (the fewest oxygens in the chlorine family). Na⁺ balances it 1 : 1: NaClO. NaClO₂ is sodium chlorite, NaClO₃ sodium chlorate, NaCl sodium chloride.',
    ['hypo- ... -ite = fewest oxygens.', 'The ion is ClO⁻.', 'Na⁺ and ClO⁻.']);

  M(A3, 4, 'Trap', 'Which name-formula pair is INCORRECT?',
    'Fe₂(SO₄)₃ - iron(II) sulfate', ['Cu(NO₃)₂ - copper(II) nitrate', 'SnO₂ - tin(IV) oxide', 'Na₂CO₃ - sodium carbonate', 'NH₄Cl - ammonium chloride'],
    'In Fe₂(SO₄)₃, three SO₄²⁻ carry 6−, so each of the two Fe is 3+: the name is iron(III) sulfate. The others check out: Cu²⁺ with two NO₃⁻; Sn⁴⁺ with two O²⁻; two Na⁺ with CO₃²⁻; NH₄⁺ with Cl⁻. Trap: reading the subscript 2 on Fe as the Roman numeral.',
    ['For each transition-metal compound, compute the metal\'s charge.', 'Total anion charge ÷ number of metal ions.', '3 × (−2) = −6 shared by 2 Fe.']);

  M(A3, 4, 'Trap', 'Which formula is WRONG for the name given?',
    'aluminum hydroxide - AlOH₃', ['barium acetate - Ba(C₂H₃O₂)₂', 'sodium sulfide - Na₂S', 'cesium carbonate - Cs₂CO₃', 'potassium chlorate - KClO₃'],
    'Aluminum hydroxide is Al(OH)₃ - three hydroxide ions need parentheses; AlOH₃ reads as one O and three H atoms. The others are correct: Ba²⁺ with two acetates; two Na⁺ with S²⁻; two Cs⁺ with one CO₃²⁻ (no parentheses for a single polyatomic ion); K⁺ with ClO₃⁻.',
    ['Check charges AND the use of parentheses.', 'Parentheses are needed when there is more than one of a polyatomic ion.', 'How many OH⁻ does Al³⁺ need?']);

  /* hydrates */
  M(A3, 2, 'Concept', 'What is the name of MgSO₄·7H₂O (Epsom salt)?',
    'magnesium sulfate heptahydrate', ['magnesium sulfate hexahydrate', 'magnesium sulfite heptahydrate', 'magnesium(II) sulfate heptahydrate', 'magnesium heptasulfate hydrate'],
    'Name the ionic compound (magnesium sulfate, SO₄²⁻), then add a Greek prefix for the number of waters + "hydrate": 7 = hepta → magnesium sulfate heptahydrate. Hexa = 6; sulfite is SO₃²⁻; Mg needs no numeral.',
    ['Name the salt first, then the water.', 'Greek prefixes: 6 hexa, 7 hepta, 8 octa.', 'Seven waters → heptahydrate.']);

  M(A3, 3, 'Concept', 'What is the formula of copper(II) sulfate pentahydrate?',
    'CuSO₄·5H₂O', ['Cu₂SO₄·5H₂O', 'CuSO₄·6H₂O', 'CuSO₃·5H₂O', 'Cu(SO₄)₂·5H₂O'],
    'Copper(II) = Cu²⁺; sulfate = SO₄²⁻ → CuSO₄; penta = 5 waters → CuSO₄·5H₂O, the blue crystals that turn white when heated. Cu₂SO₄ would be copper(I) sulfate; 6H₂O is hexahydrate; SO₃ is sulfite; Cu(SO₄)₂ needs Cu⁴⁺.',
    ['Build the salt from its ions.', 'penta = 5.', 'Write the waters after a centered dot.']);

  M(A3, 3, 'Concept', 'What is the name of Ba(OH)₂·8H₂O?',
    'barium hydroxide octahydrate', ['barium dihydroxide octahydrate', 'barium hydroxide heptahydrate', 'barium(II) hydroxide octahydrate', 'barium hydride octahydrate'],
    'Ba²⁺ with two OH⁻ = barium hydroxide (no prefix for the two hydroxides); 8 waters = octahydrate (Silberberg Sample Problem 2.10). Hepta is 7; Ba needs no numeral; hydride is H⁻.',
    ['Ionic part first: Ba²⁺ and OH⁻.', 'No numerical prefixes for the ions in an ionic name.', 'octa = 8.']);

  M(A3, 4, 'Calculation', 'What is the formula mass of copper(II) sulfate pentahydrate?',
    FM('CuSO4.5H2O') + ' amu', [FM('CuSO4') + ' amu', FM('CuSO4.H2O') + ' amu', FM('Cu2SO4.5H2O') + ' amu', FM('CuSO3.5H2O') + ' amu'],
    `CuSO₄·5H₂O: Cu 63.55 + S 32.06 + 4 O (64.00) = ${FM('CuSO4')} for CuSO₄; 5 H₂O = 5 × ${fd(fmass('H2O'), 3)} = ${fd(5 * fmass('H2O'), 2)}. Total = ${FM('CuSO4.5H2O')} amu. Distractors: ${FM('CuSO4')} leaves out the water; ${FM('CuSO4.H2O')} adds only one H₂O; ${FM('Cu2SO4.5H2O')} uses two Cu (copper(I)); ${FM('CuSO3.5H2O')} uses sulfite.`,
    ['Write the formula from the name first.', 'The ·5H₂O adds five whole water molecules.', 'H₂O = 18.016 amu.']);

  /* binary molecular */
  M(A3, 1, 'Worksheet', 'What is the systematic name of N₂O₄ (Week 3 worksheet compound)?',
    'dinitrogen tetroxide', ['nitrogen tetroxide', 'nitrogen(IV) oxide', 'dinitrogen oxide', 'nitrogen dioxide'],
    'N₂O₄ contains only nonmetals, so it is named as a binary covalent compound with Greek prefixes: di- for 2 N, tetra- for 4 O, with the final a dropped before "oxide": dinitrogen tetroxide. The first element takes a prefix whenever there is more than one of it. Roman numerals are for ionic compounds; nitrogen dioxide is NO₂.',
    ['Both elements are nonmetals - use prefixes.', 'di = 2, tetra = 4.', 'tetra + oxide → tetroxide.']);

  M(A3, 2, 'Concept', 'What is the name of PCl₅?',
    'phosphorus pentachloride', ['monophosphorus pentachloride', 'phosphorus chloride', 'potassium pentachloride', 'phosphorus tetrachloride'],
    'Binary covalent: the first element keeps its name (mono- is NOT used on the first element), the second gets a prefix and -ide: penta = 5 → phosphorus pentachloride. P is phosphorus (K is potassium); tetra = 4.',
    ['Two nonmetals → prefixes.', 'Drop mono- on the first element.', 'penta = 5.']);

  M(A3, 2, 'Concept', 'What is the formula of carbon disulfide?',
    'CS₂', ['C₂S', 'CS', 'C₂S₂', 'CaS₂'],
    'No prefix on carbon means one C; di- on sulfide means two S: CS₂. C₂S puts the 2 on the wrong element; CS ignores the prefix; Ca is calcium.',
    ['The prefix belongs to the element it is attached to.', 'di = 2, on sulfur.', 'One C, two S.']);

  M(A3, 2, 'Concept', 'What is the name of SF₄?',
    'sulfur tetrafluoride', ['monosulfur tetrafluoride', 'sulfur pentafluoride', 'sulfide tetrafluoride', 'tetrafluorine sulfide'],
    'Two nonmetals: sulfur (first element, no mono-) + tetra (4) + fluoride → sulfur tetrafluoride (Silberberg Sample Problem 2.14 fixes "monosulfur pentafluoride"). The element named first keeps its element name; the order follows the formula.',
    ['No mono- on the first element.', 'tetra = 4.', 'First element name, then prefix + root + -ide.']);

  M(A3, 3, 'Concept', 'What is the formula of dichlorine heptoxide?',
    'Cl₂O₇', ['Cl₂O₆', 'ClO₇', 'Cl₇O₂', 'Cl₂O₅'],
    'di = 2 Cl, hepta = 7 O → Cl₂O₇. hexa = 6, penta = 5. Cl₇O₂ swaps the subscripts.',
    ['di- goes with chlorine, hepta- with oxygen.', 'hepta = 7.', 'Two Cl, seven O.']);

  M(A3, 3, 'Concept', 'What is the name of N₂O₅?',
    'dinitrogen pentoxide', ['nitrogen pentoxide', 'dinitrogen tetroxide', 'pentanitrogen dioxide', 'nitrogen dioxide'],
    'Two N (di-) and five O (penta-, with the a dropped before oxide): dinitrogen pentoxide. Leaving off di- loses information; tetroxide is 4 O (N₂O₄); the last two have the numbers or elements wrong.',
    ['Both elements need prefixes here.', 'penta = 5.', 'pent(a) + oxide → pentoxide.']);

  M(A3, 3, 'Concept', 'What is the formula of nitrogen monoxide?',
    'NO', ['N₂O', 'NO₂', 'N₂O₂', 'N₂O₄'],
    'No prefix on nitrogen = one N; mono- on oxide = one O: NO. N₂O is dinitrogen monoxide; NO₂ is nitrogen dioxide; N₂O₄ is dinitrogen tetroxide.',
    ['mono = 1.', 'The first element has no prefix, so there is one of it.', 'One N, one O.']);

  M(A3, 3, 'Concept', 'Which name-formula pair for a binary molecular compound is CORRECT?',
    'SiO₂ - silicon dioxide', ['SO₃ - sulfite', 'CO - carbon oxide', 'N₂O₃ - dinitrotrioxide', 'SCl₂ - sulfur chloride'],
    'SiO₂ = one Si, two O = silicon dioxide ✓. SO₃ is sulfur trioxide (sulfite is the ION SO₃²⁻); CO is carbon monoxide; N₂O₃ is dinitrogen trioxide (full element name and a space - Silberberg 2.14); SCl₂ is sulfur dichloride.',
    ['Molecular names need prefixes on the second element.', 'Neutral SO₃ is not the sulfite ion.', 'One correct pair uses di- correctly.']);

  M(A3, 3, 'Concept', 'What is the name of S₂Cl₂?',
    'disulfur dichloride', ['disulfurous dichloride', 'sulfur chloride', 'disulfur chloride', 'dichlorine disulfide'],
    'Two S (di-) and two Cl (di-): disulfur dichloride (Silberberg Follow-up 2.14A corrects "disulfurous dichloride"). "-ous" is for acids and old ion names; both prefixes are needed; the element written first in the formula is named first.',
    ['Both elements need di-.', 'Keep the element name "sulfur" unchanged.', 'Name in the order of the formula.']);

  M(A3, 4, 'Trap', 'Which name is CORRECT?',
    'CO - carbon monoxide', ['CaCl₂ - calcium dichloride', 'FeCl₃ - iron trichloride', 'Na₂O - disodium oxide', 'CO₂ - monocarbon dioxide'],
    'CO is molecular (two nonmetals), so prefixes are used, and mono- is kept on the SECOND element: carbon monoxide ✓. CaCl₂ and Na₂O are ionic - no prefixes: calcium chloride, sodium oxide. FeCl₃ is ionic with a transition metal: iron(III) chloride. CO₂ is carbon dioxide (no mono- on the first element).',
    ['First decide: ionic (metal + nonmetal) or molecular (nonmetals)?', 'Prefixes only for molecular compounds.', 'mono- is dropped only on the first element.']);

  /* acids */
  M(A3, 1, 'Concept', 'What is the name of HCl(aq)?',
    'hydrochloric acid', ['chloric acid', 'hydrochlorous acid', 'chlorous acid', 'perchloric acid'],
    'A binary acid (H + an -ide anion, chloride) is named hydro- + root + -ic + acid: hydrochloric acid. Chloric (HClO₃), chlorous (HClO₂) and perchloric (HClO₄) acids are oxoacids and take no hydro- prefix.',
    ['The anion is chloride (-ide, no oxygen).', 'Binary acids: hydro___ic acid.', 'No oxygen → hydro- prefix.']);

  M(A3, 2, 'Concept', 'What is the name of HNO₂?',
    'nitrous acid', ['nitric acid', 'hydronitrous acid', 'hydronitric acid', 'hyponitrous acid'],
    'HNO₂ contains the nitrite ion (NO₂⁻). Oxoacids: -ate → -ic, -ite → -ous, no hydro-. So nitrite → nitrous acid. Nitric acid is HNO₃ (from nitrate).',
    ['Identify the anion: NO₂⁻.', '-ite anion → -ous acid.', 'Oxoacids never take hydro-.']);

  M(A3, 2, 'Concept', 'What is the name of H₂SO₃?',
    'sulfurous acid', ['sulfuric acid', 'hydrosulfuric acid', 'hydrosulfurous acid', 'sulfitic acid'],
    'H₂SO₃ = 2 H⁺ + sulfite (SO₃²⁻). -ite → -ous: sulfurous acid (Silberberg keeps the "ur" for sulfur acids). Sulfuric acid is H₂SO₄; hydrosulfuric acid is H₂S(aq).',
    ['Anion: SO₃²⁻ = sulfite.', 'sulfite → sulfurous.', 'No hydro- for oxoacids.']);

  M(A3, 3, 'Concept', 'What is the name of HClO?',
    'hypochlorous acid', ['chlorous acid', 'hydrochloric acid', 'perchloric acid', 'hypochloric acid'],
    'HClO contains hypochlorite, ClO⁻. -ite → -ous and the hypo- prefix stays: hypochlorous acid (Sample Problem 2.12). "Hypochloric" wrongly uses -ic for an -ite ion.',
    ['Which chlorine oxoanion has one O?', 'Hypochlorite.', 'Keep hypo-, change -ite to -ous.']);

  M(A3, 3, 'Concept', 'What is the name of HIO₃?',
    'iodic acid', ['iodous acid', 'hydroiodic acid', 'periodic acid', 'hypoiodous acid'],
    'IO₃⁻ is iodate (like chlorate, ClO₃⁻). -ate → -ic: iodic acid. Iodous acid is HIO₂, periodic acid HIO₄, hypoiodous acid HIO, and hydroiodic acid HI(aq).',
    ['Halogen oxoanions follow the chlorine pattern.', 'XO₃⁻ is the -ate ion.', '-ate → -ic.']);

  M(A3, 3, 'Concept', 'What is the name of HCN(aq)?',
    'hydrocyanic acid', ['cyanic acid', 'cyanous acid', 'hydrocyanous acid', 'carbonic acid'],
    'CN⁻ is cyanide, an -ide anion, so the acid is named like a binary acid: hydro- + cyan + -ic + acid = hydrocyanic acid (Sample Problem 2.12). Carbonic acid is H₂CO₃.',
    ['The anion ends in -ide.', '-ide anions give hydro___ic acids.', 'cyanide → hydrocyanic.']);

  M(A3, 2, 'Concept', 'What is the formula of phosphoric acid?',
    'H₃PO₄', ['H₃PO₃', 'HPO₄', 'H₂PO₄', 'H₃P'],
    'phosphoric (-ic) ← phosphate (PO₄³⁻). Three H⁺ balance 3−: H₃PO₄. H₃PO₃ is phosphorous acid (from phosphite); HPO₄ and H₂PO₄ are not neutral; H₃P has no oxygen.',
    ['-ic acid comes from the -ate ion.', 'Phosphate = PO₄³⁻.', 'Add enough H⁺ to make it neutral.']);

  M(A3, 2, 'Concept', 'What is the formula of carbonic acid?',
    'H₂CO₃', ['HCO₃', 'H₂CO₂', 'CH₃COOH', 'H₂C₂O₄'],
    'carbonic ← carbonate (CO₃²⁻); two H⁺ neutralize 2−: H₂CO₃ (it decomposes to CO₂ + H₂O, the fizz in soda). HCO₃ would still be charged (HCO₃⁻ is hydrogen carbonate); H₂CO₂ has one O too few; CH₃COOH is acetic acid and H₂C₂O₄ is oxalic acid.',
    ['-ic ← -ate.', 'Carbonate is CO₃²⁻.', 'Two H⁺ neutralize the 2− charge.']);

  M(A3, 4, 'Exam', 'An acid is formed from the chlorite ion. What are its name and formula?',
    'chlorous acid, HClO₂', ['chloric acid, HClO₃', 'hydrochlorous acid, HClO₂', 'hypochlorous acid, HClO', 'chlorous acid, HClO₃'],
    'Chlorite = ClO₂⁻. Adding one H⁺ gives HClO₂. -ite → -ous, no hydro- for oxoacids: chlorous acid. Chloric acid HClO₃ comes from chlorate; "hydrochlorous" wrongly adds hydro-; hypochlorous acid HClO comes from hypochlorite; the last choice pairs the right name with the chlorate formula.',
    ['Write the chlorite ion\'s formula first.', 'One H⁺ neutralizes a 1− ion.', '-ite → -ous.']);

  M(A3, 4, 'Trap', 'Which acid name is INCORRECT?',
    'HF(aq) - fluoric acid', ['HBr(aq) - hydrobromic acid', 'HNO₃ - nitric acid', 'H₂SO₄ - sulfuric acid', 'HClO₄ - perchloric acid'],
    'HF contains fluoride (an -ide anion, no oxygen), so it is a binary acid: hydrofluoric acid. The others follow the rules: HBr from bromide → hydrobromic; HNO₃ from nitrate → nitric; H₂SO₄ from sulfate → sulfuric; HClO₄ from perchlorate → perchloric.',
    ['Does the acid contain oxygen?', 'Binary (no O) acids need the hydro- prefix.', 'Which binary acid is missing hydro-?']);

  M(A3, 2, 'Concept', 'What is the name and formula of the anion of acetic acid?',
    'acetate, CH₃COO⁻', ['acetite, CH₃COO⁻', 'acetate, CH₃COO²⁻', 'acetide, CH₃COOH⁻', 'carbonate, CO₃²⁻'],
    'Acetic acid (CH₃COOH, -ic) loses its acidic H⁺ to give the acetate ion, CH₃COO⁻ (also written C₂H₃O₂⁻). -ic acid ↔ -ate anion; the charge is 1− because only one H⁺ is removed.',
    ['-ic acid ↔ -ate ion.', 'Acetic acid gives up one H⁺.', 'One H⁺ removed → 1− charge.']);

  /* ================= counting atoms and formula masses (lesson 3) ================= */
  M(A3, 1, 'Concept', 'How many atoms in total are in one formula unit of Ca(OH)₂?',
    '5', ['4', '3', '6', '7'],
    'The subscript 2 outside the parentheses doubles everything inside: Ca 1 + O 2 + H 2 = 5 atoms. Trap: 4 counts the H only once; 3 ignores the parentheses entirely.',
    ['A subscript after parentheses multiplies every atom inside.', 'OH × 2 = 2 O + 2 H.', '1 + 2 + 2.']);

  N(A3, 2, 'Calculation', 'How many atoms in total are in one formula unit of (NH₄)₃PO₄? (Enter a whole number.)',
    '20', 20,
    'N: 1 × 3 = 3; H: 4 × 3 = 12; P: 1; O: 4. Total = 3 + 12 + 1 + 4 = 20 atoms. Trap: forgetting to multiply the H by 3 gives 12.',
    ['Multiply everything inside (NH₄) by 3.', 'Count N, H, P and O separately.', '3 + 12 + 1 + 4.'], { abs: 0.4 });

  M(A3, 2, 'Concept', 'How many hydrogen atoms are in one formula unit of (NH₄)₂HPO₄?',
    '9', ['5', '8', '6', '10'],
    'Two NH₄⁺ ions contribute 2 × 4 = 8 H, and the hydrogen phosphate ion contributes 1 more: 9 H atoms. Distractors: 5 counts NH₄ once; 8 forgets the H in HPO₄; 6 and 10 are miscounts.',
    ['Count H inside the parentheses, times the subscript.', 'Then add any H elsewhere in the formula.', '8 from ammonium plus 1 from HPO₄²⁻.']);

  N(A3, 3, 'Calculation', 'How many oxygen atoms are in one formula unit of the hydrate Al₂(SO₄)₃·18H₂O? (Enter a whole number.)',
    '30', 30,
    'Al₂(SO₄)₃: 4 O × 3 sulfates = 12 O. The 18 waters add 18 × 1 = 18 O. Total = 12 + 18 = 30 O atoms. Trap: forgetting the water of hydration gives 12.',
    ['Count O in the salt and in the waters separately.', 'SO₄ appears 3 times.', '12 + 18.'], { abs: 0.4 });

  N(A3, 2, 'Worksheet', 'Calculate the formula mass of CaCO₃. (Week 3 worksheet, question 1; enter a number in amu.)',
    FM('CaCO3') + ' amu', Number(FM('CaCO3')),
    `Formula mass = Ca + C + 3 O = 40.08 + 12.01 + 3(16.00) = 40.08 + 12.01 + 48.00 = ${FM('CaCO3')} amu. (The molar mass is the same number in g/mol - the bridge to the mole in the next gym.) Trap: counting only one O gives 68.09 amu.`,
    ['Add the atomic masses of every atom in the formula.', 'There are three O atoms.', '40.08 + 12.01 + 48.00.'], { abs: 0.02 });

  M(A3, 2, 'Worksheet', 'Calculate the molecular mass of N₂O₄. (Week 3 worksheet, question 2)',
    FM('N2O4') + ' amu', [FM('NO2') + ' amu', fd(AM.N + 4 * AM.O, 2) + ' amu', FM('N2O5') + ' amu', FM('N2O') + ' amu'],
    `Molecular mass = 2 N + 4 O = 2(14.01) + 4(16.00) = 28.02 + 64.00 = ${FM('N2O4')} amu. Distractors: ${FM('NO2')} is NO₂ (half the molecule); ${fd(AM.N + 4 * AM.O, 2)} counts N only once; ${FM('N2O5')} is N₂O₅; ${FM('N2O')} is N₂O.`,
    ['Multiply each atomic mass by its subscript.', '2 × 14.01 and 4 × 16.00.', 'Add them.']);

  M(A3, 2, 'Worksheet', 'What is the formula mass of iron(III) oxide, Fe₂O₃?',
    FM('Fe2O3') + ' amu', [FM('FeO') + ' amu', fd(AM.Fe + 3 * AM.O, 2) + ' amu', fd(2 * AM.Fe + AM.O, 2) + ' amu', FM('Fe3O4') + ' amu'],
    `2 Fe + 3 O = 2(55.85) + 3(16.00) = 111.70 + 48.00 = ${FM('Fe2O3')} amu. Distractors: ${FM('FeO')} is FeO (iron(II) oxide); ${fd(AM.Fe + 3 * AM.O, 2)} counts Fe once; ${fd(2 * AM.Fe + AM.O, 2)} counts O once; ${FM('Fe3O4')} is Fe₃O₄.`,
    ['Fe₂O₃: two Fe, three O.', 'Fe = 55.85, O = 16.00.', '111.70 + 48.00.']);

  N(A3, 2, 'Worksheet', 'What is the formula mass of lithium sulfite, Li₂SO₃? (Enter a number in amu.)',
    FM('Li2SO3') + ' amu', Number(FM('Li2SO3')),
    `2 Li + S + 3 O = 2(6.94) + 32.06 + 3(16.00) = 13.88 + 32.06 + 48.00 = ${FM('Li2SO3')} amu. (This is the molar mass the Week 3 worksheet uses to turn 9.234 g into ${fx(9.234 / fmass('Li2SO3'), 4)} mol.) Trap: using sulfate (SO₄) gives ${FM('Li2SO4')} amu.`,
    ['Two Li, one S, three O.', 'Li = 6.94, S = 32.06, O = 16.00.', '13.88 + 32.06 + 48.00.'], { abs: 0.02 });
  chk('worksheet Li2SO3 moles', 9.234 / fmass('Li2SO3'), 0.09830, 0.00002);

  M(A3, 3, 'Calculation', 'What is the formula mass of calcium hydroxide, Ca(OH)₂?',
    FM('Ca(OH)2') + ' amu', [FM('CaOH') + ' amu', fd(AM.Ca + AM.O + 2 * AM.H, 2) + ' amu', fd(2 * AM.Ca + 2 * AM.O + 2 * AM.H, 2) + ' amu', fd(AM.Ca + 2 * AM.O, 2) + ' amu'],
    `Ca(OH)₂ = Ca + 2 O + 2 H = 40.08 + 2(16.00) + 2(1.008) = 40.08 + 32.00 + 2.016 = ${FM('Ca(OH)2')} amu. Distractors: ${FM('CaOH')} ignores the subscript 2; ${fd(AM.Ca + AM.O + 2 * AM.H, 2)} doubles only the H; ${fd(2 * AM.Ca + 2 * AM.O + 2 * AM.H, 2)} doubles the Ca too; ${fd(AM.Ca + 2 * AM.O, 2)} forgets the H.`,
    ['The 2 after the parentheses doubles both O and H.', 'Ca 1, O 2, H 2.', '40.08 + 32.00 + 2.016.']);

  N(A3, 3, 'Calculation', 'What is the formula mass of aluminum sulfate, Al₂(SO₄)₃? (Enter a number in amu.)',
    FM('Al2(SO4)3') + ' amu', Number(FM('Al2(SO4)3')),
    `Al₂(SO₄)₃ = 2 Al + 3 S + 12 O = 2(26.98) + 3(32.06) + 12(16.00) = 53.96 + 96.18 + 192.00 = ${FM('Al2(SO4)3')} amu. Trap: applying the 3 only to the O (Al₂SO₁₂) or not at all (Al₂SO₄ = ${FM('Al2SO4')}) gives the wrong mass.`,
    ['The subscript 3 multiplies S AND O.', 'Count: 2 Al, 3 S, 12 O.', '53.96 + 96.18 + 192.00.'], { abs: 0.05 });

  M(A3, 3, 'Calculation', 'What is the formula mass of ammonium phosphate, (NH₄)₃PO₄?',
    FM('(NH4)3PO4') + ' amu', [FM('NH4PO4') + ' amu', FM('(NH4)2PO4') + ' amu', FM('(NH3)4PO4') + ' amu', FM('(NH4)3PO3') + ' amu'],
    `3 N + 12 H + P + 4 O = 3(14.01) + 12(1.008) + 30.97 + 4(16.00) = 42.03 + 12.096 + 30.97 + 64.00 = ${FM('(NH4)3PO4')} amu. Distractors: ${FM('NH4PO4')} ignores the 3; ${FM('(NH4)2PO4')} uses 2 ammonium ions; ${FM('(NH3)4PO4')} is the "(NH₃)₄PO₄" error; ${FM('(NH4)3PO3')} uses phosphite.`,
    ['Write out the atom counts: N 3, H 12, P 1, O 4.', 'Multiply each by its atomic mass.', 'Add the four totals.']);

  M(A3, 2, 'Calculation', 'What is the molecular mass of glucose, C₆H₁₂O₆?',
    FM('C6H12O6') + ' amu', [FM('CH2O') + ' amu', fd(6 * AM.C + 6 * AM.O, 2) + ' amu', fd(AM.C + 12 * AM.H + AM.O, 2) + ' amu', fd(6 * AM.C + 12 * AM.H + AM.O, 2) + ' amu'],
    `6 C + 12 H + 6 O = 6(12.01) + 12(1.008) + 6(16.00) = 72.06 + 12.096 + 96.00 = ${FM('C6H12O6')} amu. Distractors: ${FM('CH2O')} is the empirical formula CH₂O; ${fd(6 * AM.C + 6 * AM.O, 2)} forgets the H; the last two drop subscripts on C or O.`,
    ['Multiply each atomic mass by its subscript.', '6 C, 12 H, 6 O.', '72.06 + 12.096 + 96.00.']);

  M(A3, 3, 'Calculation', 'What is the mass fraction of oxygen in calcium carbonate, CaCO₃?',
    fx(3 * AM.O / fmass('CaCO3'), 3), [fx(AM.O / fmass('CaCO3'), 3), fx(AM.Ca / fmass('CaCO3'), 3), '0.600', fx(AM.C / fmass('CaCO3'), 3)],
    `Mass fraction of O = (mass of O in one formula unit) ÷ (formula mass) = 3(16.00) ÷ ${FM('CaCO3')} = 48.00 ÷ ${FM('CaCO3')} = ${fx(48 / fmass('CaCO3'), 4)} → ${fx(48 / fmass('CaCO3'), 3)}. Distractors: ${fx(AM.O / fmass('CaCO3'), 3)} counts one O; ${fx(AM.Ca / fmass('CaCO3'), 3)} is the Ca fraction; 0.600 is the fraction of ATOMS that are O (3 of 5), not of mass; ${fx(AM.C / fmass('CaCO3'), 3)} is carbon.`,
    ['Mass fraction uses masses, not numbers of atoms.', 'Mass of O = 3 × 16.00.', 'Divide by the formula mass 100.09.']);

  N(A3, 3, 'Calculation', 'What mass of calcium is contained in 75.0 g of calcium carbonate, CaCO₃? (Enter a number in g.)',
    fx(75.0 * AM.Ca / fmass('CaCO3'), 3) + ' g', Number(fx(75.0 * AM.Ca / fmass('CaCO3'), 3)),
    `Mass fraction of Ca = 40.08 ÷ ${FM('CaCO3')} = ${fx(AM.Ca / fmass('CaCO3'), 4)}. Mass of Ca = 75.0 g × ${fx(AM.Ca / fmass('CaCO3'), 4)} = ${fx(75 * AM.Ca / fmass('CaCO3'), 4)} → ${fx(75 * AM.Ca / fmass('CaCO3'), 3)} g. (Silberberg\'s mass-fraction example: about 40% of calcium carbonate is calcium.) Trap: multiplying by 40.08 directly gives a nonsense mass of thousands of grams.`,
    ['Definite composition: Ca is always the same fraction of CaCO₃\'s mass.', 'Fraction = 40.08 / 100.09.', 'Multiply that fraction by 75.0 g.']);

  M(A3, 4, 'Calculation', 'What is the formula mass of iron(III) nitrate nonahydrate, Fe(NO₃)₃·9H₂O?',
    FM('Fe(NO3)3.9H2O') + ' amu', [FM('Fe(NO3)3') + ' amu', FM('Fe(NO3)3.H2O') + ' amu', FM('Fe(NO2)3.9H2O') + ' amu', FM('FeNO3.9H2O') + ' amu'],
    `Fe(NO₃)₃ = 55.85 + 3(14.01 + 48.00) = 55.85 + 186.03 = ${FM('Fe(NO3)3')}; 9 H₂O = 9 × 18.016 = 162.144. Total = ${FM('Fe(NO3)3.9H2O')} amu. Distractors: ${FM('Fe(NO3)3')} omits the water; ${FM('Fe(NO3)3.H2O')} adds one water; ${FM('Fe(NO2)3.9H2O')} uses nitrite; ${FM('FeNO3.9H2O')} ignores the 3 on nitrate.`,
    ['nona = 9 waters.', 'Nitrate (NO₃) appears three times.', 'Add the salt and the nine waters.']);

  M(A3, 4, 'Exam', 'What is the molecular mass of dinitrogen pentoxide?',
    FM('N2O5') + ' amu', [FM('N2O4') + ' amu', FM('NO3') + ' amu', FM('N2O3') + ' amu', fd(AM.N + 5 * AM.O, 2) + ' amu'],
    `Name → formula first: di = 2 N, penta = 5 O → N₂O₅. Mass = 2(14.01) + 5(16.00) = 28.02 + 80.00 = ${FM('N2O5')} amu. Distractors: ${FM('N2O4')} is N₂O₄ (tetroxide); ${FM('NO3')} is NO₃; ${FM('N2O3')} is N₂O₃; ${fd(AM.N + 5 * AM.O, 2)} drops the di- (NO₅).`,
    ['Write the formula from the prefixes.', 'di = 2, penta = 5.', '2(14.01) + 5(16.00).']);

  M(A3, 4, 'Exam', 'What is the formula mass of lithium sulfite?',
    FM('Li2SO3') + ' amu', [FM('Li2SO4') + ' amu', FM('Li2S') + ' amu', fd(AM.Li + AM.S + 3 * AM.O, 2) + ' amu', FM('Li2SO') + ' amu'],
    `Lithium sulfite = Li⁺ and SO₃²⁻ → Li₂SO₃. Mass = 2(6.94) + 32.06 + 3(16.00) = ${FM('Li2SO3')} amu. Distractors: ${FM('Li2SO4')} is lithium sulfate; ${FM('Li2S')} is lithium sulfide; ${fd(AM.Li + AM.S + 3 * AM.O, 2)} uses one Li (LiSO₃, not neutral); ${FM('Li2SO')} drops two O.`,
    ['Get the formula right first: sulfite = SO₃²⁻.', 'Two Li⁺ balance one sulfite.', 'Then add the atomic masses.']);

  M(A3, 4, 'Exam', 'What is the formula mass of iron(III) sulfate?',
    FM('Fe2(SO4)3') + ' amu', [FM('FeSO4') + ' amu', FM('Fe2SO4') + ' amu', FM('Fe(SO4)3') + ' amu', FM('Fe2(SO3)3') + ' amu'],
    `Iron(III) = Fe³⁺, sulfate = SO₄²⁻ → Fe₂(SO₄)₃ (6+ and 6−). Mass = 2(55.85) + 3(32.06) + 12(16.00) = 111.70 + 96.18 + 192.00 = ${FM('Fe2(SO4)3')} amu. Distractors: ${FM('FeSO4')} is iron(II) sulfate; ${FM('Fe2SO4')} reads the numeral as a subscript; ${FM('Fe(SO4)3')} uses one Fe; ${FM('Fe2(SO3)3')} uses sulfite.`,
    ['Formula first: balance Fe³⁺ against SO₄²⁻.', 'LCM of 3 and 2 is 6.', 'Fe₂(SO₄)₃: 2 Fe, 3 S, 12 O.']);

  M(A3, 4, 'Calculation', 'What is the formula mass of copper(II) nitrate trihydrate?',
    FM('Cu(NO3)2.3H2O') + ' amu', [FM('Cu(NO3)2') + ' amu', FM('Cu(NO3)2.H2O') + ' amu', FM('CuNO3.3H2O') + ' amu', FM('Cu(NO2)2.3H2O') + ' amu'],
    `Cu²⁺ + 2 NO₃⁻ → Cu(NO₃)₂ = 63.55 + 2(62.01) = ${FM('Cu(NO3)2')}; tri = 3 H₂O = 54.048. Total = ${FM('Cu(NO3)2.3H2O')} amu. Distractors: ${FM('Cu(NO3)2')} omits the water; ${FM('Cu(NO3)2.H2O')} adds one water; ${FM('CuNO3.3H2O')} uses one nitrate (copper(I)); ${FM('Cu(NO2)2.3H2O')} uses nitrite.`,
    ['Formula from the name: Cu(NO₃)₂·3H₂O.', 'NO₃ = 62.01; H₂O = 18.016.', 'Add salt + 3 waters.']);

  M(A3, 4, 'Exam', 'A molecular oxide of nitrogen has a molecular mass of 76.02 amu. What is its name?',
    'dinitrogen trioxide', ['nitrogen trioxide', 'dinitrogen tetroxide', 'nitrogen dioxide', 'dinitrogen monoxide'],
    `Test candidates: N₂O₃ = 2(14.01) + 3(16.00) = ${FM('N2O3')} ✓. NO₃ = ${FM('NO3')}; N₂O₄ = ${FM('N2O4')}; NO₂ = ${FM('NO2')}; N₂O = ${FM('N2O')}. So the compound is N₂O₃, dinitrogen trioxide.`,
    ['Compute the mass of each candidate formula.', 'N = 14.01, O = 16.00.', '28.02 + 48.00 = 76.02.']);
  chk('N2O3', fmass('N2O3'), 76.02, 0.005);

  const xcl3 = 162.20 - 3 * AM.Cl;
  M(A3, 4, 'Exam', 'A metal chloride with the formula XCl₃ has a formula mass of 162.20 amu. What is the compound?',
    'iron(III) chloride', ['iron(II) chloride', 'cobalt(III) chloride', 'chromium(III) chloride', 'manganese(III) chloride'],
    `Mass of X = 162.20 − 3(35.45) = 162.20 − 106.35 = ${fd(xcl3, 2)} amu → Fe (55.85). With three Cl⁻, iron is Fe³⁺: iron(III) chloride. Check the others: FeCl₂ = ${FM('FeCl2')}, CoCl₃ = ${fd(AM.Co + 3 * AM.Cl, 2)}, CrCl₃ = ${fd(AM.Cr + 3 * AM.Cl, 2)}, MnCl₃ = ${fd(AM.Mn + 3 * AM.Cl, 2)} amu. Trap: iron(II) chloride has the right metal but the wrong formula.`,
    ['Subtract the mass of three Cl atoms.', '3 × 35.45 = 106.35.', 'Which metal has an atomic mass of 55.85?']);
  chk('XCl3', xcl3, AM.Fe, 0.005);
};
