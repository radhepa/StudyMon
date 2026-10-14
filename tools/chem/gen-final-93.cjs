/* Chapter 93 - Evening Exam 3 review (Ch 9, 10, 12, 13, 15.6; lectures 15-24) in exam format.
   Part of gen-final.cjs. */
module.exports = function (H) {
  const { s, sci, f, K, R, R8, NA, mm } = H;
  const Q = [];
  const add = q => Q.push(q);

  /* ---------- Lewis → shape → polarity → IMF → property chains ---------- */
  add({ l: 20, t: 3, tag: 'Exam',
    q: 'SO₂ boils at −10 °C, while CO₂ sublimes at −78 °C. Which explanation, based on their Lewis structures, is correct?',
    c: ['SO₂ is bent and polar, so it has dipole-dipole forces as well as dispersion; CO₂ is linear and nonpolar', 'CO₂ has polar bonds but SO₂ does not', 'SO₂ is linear and CO₂ is bent', 'SO₂ molecules hydrogen bond to one another', 'SO₂ has stronger covalent bonds, which must break when it boils'],
    why: 'Lewis structures: CO₂ has two electron groups on C (two double bonds) → linear, and the two C=O dipoles cancel. SO₂ has three electron groups on S (two bonds + one lone pair) → bent, so its S−O dipoles do not cancel. A polar molecule adds dipole-dipole attractions, raising the boiling point. Boiling breaks IMFs, never covalent bonds, and neither molecule has an H to hydrogen bond with.',
    h: ['Draw both Lewis structures and count electron groups on the central atom.', 'Does the lone pair on S change the shape?', 'Bent and polar beats linear and nonpolar.'] });

  add({ l: 19, t: 4, tag: 'Exam',
    q: 'Which statement correctly compares BF₃ and NF₃?',
    c: ['BF₃ is trigonal planar and nonpolar; NF₃ is trigonal pyramidal and polar', 'Both are trigonal planar and nonpolar', 'Both are trigonal pyramidal and polar', 'BF₃ is trigonal pyramidal and polar; NF₃ is trigonal planar and nonpolar', 'BF₃ is trigonal planar and polar; NF₃ is trigonal pyramidal and nonpolar'],
    why: 'BF₃: B has 3 valence electrons, makes three bonds and has no lone pair (an electron-deficient octet exception) → 3 electron groups, trigonal planar; the three B−F dipoles cancel → nonpolar. NF₃: N has 5 valence electrons → three bonds + one lone pair → 4 electron groups, trigonal pyramidal → the dipoles do not cancel → polar. Same formula type, different shape.',
    h: ['Count valence electrons on B and on N.', 'A lone pair on the central atom changes the molecular shape.', 'Planar AX₃ cancels; pyramidal AX₃ does not.'] });

  add({ l: 20, t: 4, tag: 'Trap',
    q: 'CH₂Cl₂ is polar and CCl₄ is nonpolar, yet CCl₄ boils at 77 °C and CH₂Cl₂ at 40 °C. Which explanation is correct?',
    c: ['CCl₄ is larger with more electrons, so its dispersion forces outweigh the dipole-dipole forces of CH₂Cl₂', 'CCl₄ molecules hydrogen bond to each other', 'CCl₄ is actually polar because its C−Cl bonds are polar', 'Boiling CCl₄ requires breaking C−Cl covalent bonds', 'CH₂Cl₂ hydrogen bonds, and hydrogen bonding lowers the boiling point'],
    why: 'Polarity is not the whole story. CCl₄ (153.8 g/mol, 74 electrons) is far more polarizable than CH₂Cl₂ (84.9 g/mol, 42 electrons), so its London dispersion forces are larger than CH₂Cl₂\'s dispersion + dipole-dipole forces combined. CCl₄ is tetrahedral and symmetric, so its bond dipoles cancel; neither compound can hydrogen bond (no H on N, O or F).',
    h: ['Dispersion forces grow with the number of electrons.', 'Compare molar masses: 153.8 versus 84.9 g/mol.', 'A big enough nonpolar molecule can out-boil a small polar one.'] });

  add({ l: 18, t: 3, tag: 'Exam',
    q: 'What are the molecular shape and polarity of XeF₄?',
    c: ['Square planar, nonpolar', 'Tetrahedral, nonpolar', 'Seesaw, polar', 'Square pyramidal, polar', 'Octahedral, polar'],
    why: 'Xe has 8 valence electrons; four bonds to F use 4, leaving 2 lone pairs: 6 electron groups (octahedral arrangement). The two lone pairs sit opposite each other, so the four F atoms form a square plane. The Xe−F dipoles cancel in pairs → nonpolar.',
    h: ['Count electron groups on Xe: bonds + lone pairs.', '6 groups with 2 lone pairs.', 'Lone pairs go opposite each other (trans).'] });

  add({ l: 18, t: 3, tag: 'Exam',
    q: 'What are the molecular shape and polarity of SF₄?',
    c: ['Seesaw, polar', 'Tetrahedral, nonpolar', 'Square planar, nonpolar', 'Trigonal pyramidal, polar', 'Seesaw, nonpolar'],
    why: 'S has 6 valence electrons: four S−F bonds + one lone pair = 5 electron groups (trigonal bipyramidal). The lone pair takes an equatorial position, giving a seesaw. The shape is not symmetric, so the bond dipoles do not cancel → polar.',
    h: ['Count S’s valence electrons and its bonds.', '5 electron groups, 1 lone pair.', 'Lone pair equatorial → seesaw.'] });

  add({ l: 18, t: 3, tag: 'Exam',
    q: 'What is the molecular shape of ClF₃, and is it polar?',
    c: ['T-shaped, polar', 'Trigonal planar, nonpolar', 'Trigonal pyramidal, polar', 'T-shaped, nonpolar', 'Seesaw, polar'],
    why: 'Cl has 7 valence electrons: three Cl−F bonds + two lone pairs = 5 electron groups. Both lone pairs go equatorial, leaving the three F atoms in a T. The dipoles do not cancel → polar. Writing "trigonal planar" ignores the lone pairs.',
    h: ['Cl has 7 valence electrons.', '3 bonds + 2 lone pairs = 5 groups.', 'Two equatorial lone pairs leave a T.'] });

  add({ l: 18, t: 2, tag: 'Exam',
    q: 'What is the molecular shape of the triiodide ion, I₃⁻?',
    c: ['Linear', 'Bent', 'Trigonal planar', 'T-shaped', 'Trigonal pyramidal'],
    why: 'Total valence electrons = 3(7) + 1 = 22. The central I has two bonds and three lone pairs = 5 electron groups (trigonal bipyramidal). All three lone pairs occupy equatorial positions, leaving the two bonded I atoms at the axial positions, 180° apart: linear.',
    h: ['Count 22 valence electrons and place them.', 'The central I has 2 bonds and 3 lone pairs.', 'Three equatorial lone pairs → axial atoms in a line.'] });

  add({ l: 20, t: 3, tag: 'Exam',
    q: 'Propane (CH₃CH₂CH₃, 44.1 g/mol), dimethyl ether (CH₃OCH₃, 46.1 g/mol) and ethanol (CH₃CH₂OH, 46.1 g/mol) have nearly equal molar masses. Rank them in order of INCREASING boiling point.',
    c: ['propane < dimethyl ether < ethanol', 'ethanol < dimethyl ether < propane', 'dimethyl ether < propane < ethanol', 'propane < ethanol < dimethyl ether', 'they are all about equal because their molar masses are equal'],
    why: 'With similar dispersion forces, the other IMFs decide. Propane: nonpolar, dispersion only (bp −42 °C). Dimethyl ether: bent at O, polar → dipole-dipole, but no O−H so no hydrogen bonding between its molecules (bp −24 °C). Ethanol: O−H → hydrogen bonding (bp 78 °C).',
    h: ['Same mass means similar dispersion forces.', 'Which ones are polar? Which have an H bonded to O?', 'Dispersion only < dipole-dipole < hydrogen bonding.'] });

  add({ l: 20, t: 3, tag: 'Exam',
    q: 'Rank H₂O, H₂S, H₂Se and H₂Te in order of INCREASING boiling point.',
    c: ['H₂S < H₂Se < H₂Te < H₂O', 'H₂O < H₂S < H₂Se < H₂Te', 'H₂Te < H₂Se < H₂S < H₂O', 'H₂S < H₂O < H₂Se < H₂Te', 'H₂O < H₂Te < H₂Se < H₂S'],
    why: 'For H₂S, H₂Se and H₂Te, dispersion forces grow with size, so the boiling point rises down the group (−60, −41, −2 °C). H₂O breaks the trend: it hydrogen bonds strongly, so it boils at 100 °C - highest of all despite being the lightest. "H₂O lowest" follows molar mass alone and forgets hydrogen bonding.',
    h: ['Which of these can hydrogen bond?', 'For the others, bigger means stronger dispersion.', 'Water is the anomaly.'] });

  add({ l: 15, t: 2, tag: 'Exam',
    q: 'Rank the lattice energies of MgO, NaCl, KBr and NaF from SMALLEST to LARGEST.',
    c: ['KBr < NaCl < NaF < MgO', 'MgO < NaF < NaCl < KBr', 'NaF < NaCl < KBr < MgO', 'KBr < NaF < NaCl < MgO', 'NaCl < KBr < NaF < MgO'],
    why: 'Lattice energy ∝ (q₁q₂)/r. MgO has 2+ and 2− ions, so it is by far the largest (~3800 kJ/mol). Among the 1+/1− salts, smaller ions give larger lattice energies: NaF (923) > NaCl (787) > KBr (671).',
    h: ['Coulomb’s law: charge product over distance.', 'Charge matters most; then size.', 'Doubly charged ions first; then smallest ions.'] });

  add({ l: 15, t: 2, tag: 'Concept',
    q: 'Which substance has the HIGHEST melting point?',
    c: ['MgO', 'NaCl', 'KBr', 'I₂', 'CO₂'],
    why: 'Ionic solids melt when the lattice is broken, and MgO (2+/2− ions, small) has the largest lattice energy, melting near 2800 °C. NaCl (801 °C) and KBr (734 °C) have smaller lattice energies; I₂ and CO₂ are molecular solids held only by dispersion forces.',
    h: ['Ionic or molecular?', 'Among ionic solids, look at charge and size.', 'Highest ion charges.'] });

  add({ l: 15, t: 1, tag: 'Concept',
    q: 'The lattice energy of an ionic compound, as defined in Silberberg, is:',
    c: ['the energy needed to separate one mole of the solid into gaseous ions - always positive', 'the energy released when the solid dissolves in water', 'the energy needed to melt one mole of the solid', 'the energy released when gaseous atoms form the solid', 'always negative, because ionic solids are stable'],
    why: 'ΔH°lattice is the enthalpy change for MX(s) → M⁺(g) + X⁻(g), which always ABSORBS energy (positive). The reverse step, forming the lattice from gaseous ions, releases the same amount.',
    h: ['Think "taking the lattice apart".', 'Separating opposite charges costs energy.', 'Solid → gaseous ions, ΔH > 0.'] });

  add({ l: 20, t: 1, tag: 'Concept',
    q: 'What is the strongest intermolecular force between methanol (CH₃OH) molecules?',
    c: ['Hydrogen bonding', 'London dispersion forces', 'Ion-dipole forces', 'Covalent bonding', 'Ionic bonding'],
    why: 'Methanol has an H bonded directly to O, and O lone pairs on neighbouring molecules - the requirement for hydrogen bonding. Dispersion forces are present too but weaker. Covalent and ionic bonds are INTRAmolecular, not between molecules.',
    h: ['Look for H attached to N, O or F.', 'The O−H group.', 'An especially strong dipole-dipole force.'] });

  add({ l: 20, t: 3, tag: 'Exam',
    q: 'Which molecule is polar AND can hydrogen bond with other molecules of itself?',
    c: ['NH₃', 'CH₃F', 'CH₃OCH₃', 'CO₂', 'H₂S'],
    why: 'NH₃ is trigonal pyramidal (polar) and has H atoms bonded to N, which can bond to the lone pair of a neighbouring N. CH₃F and CH₃OCH₃ are polar but their H atoms are bonded to C, so they cannot hydrogen bond with themselves. H₂S is polar but S is not electronegative enough. CO₂ is nonpolar.',
    h: ['Two tests: polarity, and an H on N, O or F.', 'C−H never hydrogen bonds.', 'Which molecule has N−H bonds?'] });

  add({ l: 19, t: 3, tag: 'Exam',
    q: 'Which AX₃ molecule has NO net dipole moment?',
    c: ['SO₃', 'NH₃', 'PCl₃', 'ClF₃', 'NF₃'],
    why: 'SO₃: all six of S’s valence electrons are in bonds, so S has no lone pair (whether SO₃ is drawn with three S=O bonds or as resonance forms with one S=O and two S−O) → trigonal planar, symmetric, dipoles cancel → nonpolar. NH₃, PCl₃ and NF₃ have a lone pair (trigonal pyramidal); ClF₃ has two lone pairs (T-shaped). All four are polar.',
    h: ['An AX₃ molecule is nonpolar only if it is trigonal planar.', 'Which central atom has no lone pair?', 'Count S’s electrons in SO₃.'] });

  add({ l: 19, t: 4, tag: 'Exam',
    q: 'Which molecule is NONPOLAR even though all of its bonds are polar, so that only dispersion forces act between its molecules?',
    c: ['PCl₅', 'SF₄', 'NH₃', 'CHCl₃', 'SO₂'],
    why: 'PCl₅: 5 bonding groups, no lone pair → trigonal bipyramidal, and the dipoles cancel → nonpolar, so dispersion only. SF₄ (seesaw), NH₃ (pyramidal), CHCl₃ (tetrahedral but with different atoms) and SO₂ (bent) are all polar and add dipole-dipole forces (and NH₃ hydrogen bonds).',
    h: ['Look for a symmetric shape with identical outer atoms.', 'No lone pairs on the central atom.', 'Five identical bonds around P.'] });

  add({ l: 19, t: 2, tag: 'Concept',
    q: 'Which molecule has the SMALLEST bond angle around its central atom?',
    c: ['H₂O', 'CH₄', 'NH₃', 'BF₃', 'CO₂'],
    why: 'All of CH₄, NH₃ and H₂O have four electron groups, but lone pairs repel more than bonding pairs and squeeze the angle: CH₄ 109.5°, NH₃ 107°, H₂O 104.5° (two lone pairs). BF₃ is 120° and CO₂ is 180°.',
    h: ['Start from the electron-group geometry.', 'Each lone pair compresses the bond angles.', 'Two lone pairs squeeze the most.'] });

  add({ l: 17, t: 2, tag: 'Calculation',
    q: 'In a Lewis structure of SO₄²⁻ drawn with four S−O SINGLE bonds (each O with three lone pairs), what is the formal charge on sulfur?',
    c: ['+2', '0', '−2', '+1', '+6'],
    why: 'FC = valence e⁻ − (lone-pair e⁻ + ½ bonding e⁻) = 6 − (0 + ½ × 8) = +2. Each O is 6 − (6 + 1) = −1. Check: +2 + 4(−1) = −2, the ion charge. (Expanding S’s octet with two S=O bonds brings S to 0, which is why that structure is often preferred.)',
    h: ['FC = V − (L + B/2).', 'S has 6 valence electrons, no lone pairs and 8 bonding electrons.', 'FC = 6 − 4.'] });

  add({ l: 17, t: 3, tag: 'Exam',
    q: 'Rank the carbon-oxygen bond lengths in CO, CO₂, CO₃²⁻ and CH₃OH from SHORTEST to LONGEST.',
    c: ['CO < CO₂ < CO₃²⁻ < CH₃OH', 'CH₃OH < CO₃²⁻ < CO₂ < CO', 'CO₂ < CO < CO₃²⁻ < CH₃OH', 'CO < CO₃²⁻ < CO₂ < CH₃OH', 'CO₃²⁻ < CO < CO₂ < CH₃OH'],
    why: 'Higher bond order = shorter bond. CO has a triple bond (order 3); CO₂ two double bonds (order 2); CO₃²⁻ is a resonance hybrid of one double and two single bonds (order 4/3); CH₃OH has a C−O single bond (order 1).',
    h: ['Find the C−O bond order in each.', 'Carbonate has three resonance structures.', 'Order: 3, 2, 4/3, 1.'] });

  add({ l: 16, t: 1, tag: 'Concept',
    q: 'Which nitrogen-nitrogen bond is both the SHORTEST and the STRONGEST?',
    c: ['The N≡N bond in N₂', 'The N=N bond in N₂H₂', 'The N−N bond in N₂H₄', 'They are all the same length', 'The N−N bond, because single bonds are strongest'],
    why: 'Bond order 3 > 2 > 1: more shared pairs pull the atoms closer and take more energy to break. N≡N (110 pm, 945 kJ/mol) beats N=N (122 pm, 418) and N−N (146 pm, 160).',
    h: ['Count shared electron pairs.', 'Higher bond order → shorter and stronger.', 'Triple bond.'] });

  /* ---------------- Bond energies versus formation enthalpies ---------------- */
  { const broken = 4 * 413 + 2 * 498, formed = 2 * 799 + 4 * 467;
    add({ l: 16, t: 4, tag: 'Exam',
      q: 'Use bond energies to estimate ΔH for CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g). Bond energies (kJ/mol): C−H 413, O=O 498, C=O (in CO₂) 799, O−H 467.',
      c: [String(broken - formed).replace('-', '−') + ' kJ', '+' + (formed - broken) + ' kJ', '−802 kJ', '−' + formed + ' kJ', '+' + broken + ' kJ'],
      why: `ΔH ≈ Σ(bonds broken) − Σ(bonds formed). Broken: 4 C−H + 2 O=O = 4(413) + 2(498) = ${broken} kJ. Formed: 2 C=O + 4 O−H = 2(799) + 4(467) = ${formed} kJ. ΔH ≈ ${broken} − ${formed} = −${formed - broken} kJ. The ΔH°f route gives −802 kJ; bond energies are averages, so the estimate differs a little - but the question asked for the bond-energy estimate. +${formed - broken} reverses the order (formed − broken).`,
      h: ['Bonds broken cost energy (+); bonds formed release it (−).', 'Count: 4 C−H and 2 O=O broken; 2 C=O and 4 O−H formed.', 'ΔH = 2648 − 3466.'] }); }

  add({ l: 16, t: 2, tag: 'Concept',
    q: 'ΔH calculated from bond energies usually differs slightly from ΔH calculated from standard enthalpies of formation. Why?',
    c: ['Bond energies are AVERAGE values over many different molecules', 'Bond energies include the energy of the electrons in lone pairs', 'ΔH°f values are only estimates, while bond energies are exact', 'Bond energies are measured for liquids, not gases', 'The two methods use opposite sign conventions, so they can never agree'],
    why: 'A C−H bond in CH₄ is not exactly the same strength as one in CH₃OH; tables list averages, so a bond-energy ΔH is an estimate. ΔH°f values are measured for the actual compounds and are more accurate. Bond energies apply to the GAS phase.',
    h: ['Is every C−H bond identical in strength?', 'Tables give one number for each bond type.', 'Averages → estimates.'] });

  { const dH = 432 + 243 - 2 * 427;
    add({ l: 16, t: 3, tag: 'Calculation',
      q: 'Using bond energies H−H 432, Cl−Cl 243 and H−Cl 427 kJ/mol, estimate ΔH for H₂(g) + Cl₂(g) → 2HCl(g).',
      c: [String(dH).replace('-', '−') + ' kJ', '+' + (-dH) + ' kJ', '−' + (2 * 427) + ' kJ', '+' + (432 + 243 - 427) + ' kJ', '−184.6 kJ'],
      why: `Broken: H−H + Cl−Cl = 432 + 243 = 675 kJ. Formed: 2 H−Cl = 2(427) = 854 kJ. ΔH ≈ 675 − 854 = −${-dH} kJ. Forgetting the 2 on HCl gives +${432 + 243 - 427} kJ; reversing the subtraction gives +${-dH}. (−184.6 kJ is 2 × ΔH°f(HCl) - close, but not the bond-energy estimate.)`,
      h: ['Bonds broken minus bonds formed.', 'Two H−Cl bonds form.', '675 − 854.'] }); }

  { const step = 107.8 + 496 + 121.0 - 349, U = -(-411.1 - step);
    add({ l: 15, t: 4, tag: 'Exam',
      q: 'Use a Born-Haber cycle to find the lattice energy of NaCl. Data (kJ/mol): ΔH°f NaCl(s) = −411.1; Na(s) → Na(g) +107.8; IE₁ of Na +496; ½Cl₂(g) → Cl(g) +121.0; electron affinity of Cl −349.',
      c: ['+' + s(U, 3) + ' kJ/mol', s(-U, 3) + ' kJ/mol', '+' + sci(-411.1 + -(107.8 + 496 + 121.0 + 349), 3).replace('−', '') + ' kJ/mol', '+' + s(411.1 + 107.8 + 496 + 242 - 349, 3) + ' kJ/mol', '+' + s(step - 411.1 < 0 ? 411.1 - step : step - 411.1, 3) + ' kJ/mol'],
      why: `Hess: ΔH°f = (atomize Na) + IE + (atomize Cl) + EA + (lattice-forming step). The four steps sum to 107.8 + 496 + 121.0 − 349 = ${f(step, 1)} kJ. Lattice-forming step = −411.1 − ${f(step, 1)} = ${f(-U, 1)} kJ, so the lattice energy (separating the solid) = +${s(U, 3)} kJ/mol. Using +349 for the EA, using 242 kJ (all of Cl₂) instead of 121.0, or simply adding ΔH°f to the steps gives the other choices.`,
      h: ['The formation reaction equals the sum of the five steps.', 'The electron affinity is negative; only ½ Cl₂ is atomized.', 'Lattice step = −411.1 − 375.8.'] }); }

  /* ---------------- Phases, Clausius-Clapeyron, heating curves ---------------- */
  { const T1 = K(34.9), T2 = K(63.5), P2 = 100 * Math.exp(-(38600 / R8) * (1 / T2 - 1 / T1));
    add({ l: 21, t: 3, tag: 'Calculation',
      q: 'Ethanol has a vapor pressure of 100. torr at 34.9 °C and ΔH(vap) = 38.6 kJ/mol. Estimate its vapor pressure at 63.5 °C.',
      c: [s(P2, 3) + ' torr', s(100 * Math.exp((38600 / R8) * (1 / T2 - 1 / T1)), 3) + ' torr', '1.00 × 10² torr', s(100 * T2 / T1, 3) + ' torr', s(100 * 63.5 / 34.9, 3) + ' torr'],
      sort: true,
      why: `ln(P₂/P₁) = −(ΔH/R)(1/T₂ − 1/T₁) with ΔH = 38,600 J/mol, T₁ = 308.05 K, T₂ = 336.65 K: ln(P₂/100.) = −(38600/8.314)(${sci(1 / T2 - 1 / T1, 4)}) = ${s(-(38600 / R8) * (1 / T2 - 1 / T1), 4)}. P₂ = 100. × e^${s(-(38600 / R8) * (1 / T2 - 1 / T1), 4)} = ${s(P2, 3)} torr. A sign error gives ${s(100 * Math.exp((38600 / R8) * (1 / T2 - 1 / T1)), 3)} torr (heating must RAISE the vapor pressure); leaving ΔH in kJ leaves P almost unchanged; scaling P with T is not how vapor pressure behaves.`,
      h: ['Vapor pressure rises steeply (exponentially) with T.', 'Clausius-Clapeyron with ΔH in J/mol and T in K.', 'ln(P₂/P₁) ≈ +1.28.'] }); }

  { const dH = R8 * Math.log(487 / 115) / (1 / K(25.0) - 1 / K(60.0)) / 1000;
    add({ l: 21, t: 4, tag: 'Calculation',
      q: 'A liquid has a vapor pressure of 115 torr at 25.0 °C and 487 torr at 60.0 °C. Calculate its enthalpy of vaporization. (Enter a number in kJ/mol.)',
      a: s(dH, 3) + ' kJ/mol', num: dH,
      why: `ΔH(vap) = R ln(P₂/P₁)/(1/T₁ − 1/T₂) = (8.314)(ln 4.235)/(1/298.15 − 1/333.15) = (8.314)(${s(Math.log(487 / 115), 4)})/(${sci(1 / K(25.0) - 1 / K(60.0), 4)}) = ${s(dH * 1000, 4)} J/mol = ${s(dH, 3)} kJ/mol.`,
      h: ['Rearrange Clausius-Clapeyron for ΔH.', 'Use kelvin; the answer comes out in J/mol.', 'ΔH = 8.314 × 1.443 ÷ 3.524 × 10⁻⁴.'] }); }

  { const inv = 1 / 373.15 - R8 * Math.log(0.800) / 40700, T = 1 / inv - 273.15;
    add({ l: 21, t: 4, tag: 'Exam',
      q: 'Water boils at 100.0 °C at 1.00 atm, and ΔH(vap) = 40.7 kJ/mol. At what temperature does water boil on a mountain where the pressure is 0.800 atm?',
      c: [s(T, 3) + ' °C', s(1 / (1 / 373.15 + R8 * Math.log(0.800) / 40700) - 273.15, 4) + ' °C', '80.0 °C', s(0.800 * 373.15 - 273.15, 3) + ' °C', '100.0 °C'],
      sort: true,
      why: `A liquid boils when its vapor pressure equals the outside pressure. 1/T₂ = 1/T₁ − (R/ΔH) ln(P₂/P₁) = 1/373.15 − (8.314/40700) ln(0.800) = ${sci(inv, 5)} K⁻¹, so T₂ = ${s(1 / inv, 4)} K = ${s(T, 3)} °C. A sign slip gives a boiling point ABOVE 100 °C; scaling the °C or kelvin temperature by 0.800 is not how vapor pressure works; and the boiling point does depend on pressure.`,
      h: ['Boiling point = temperature where vapor pressure = outside pressure.', 'Clausius-Clapeyron from (373.15 K, 1.00 atm) to (T₂, 0.800 atm).', 'ln(0.800) = −0.223.'] }); }

  { const q1 = 25.0 * 2.09 * 10.0, q2 = 25.0 / 18.02 * 6020, q3 = 25.0 * 4.184 * 25.0, tot = q1 + q2 + q3;
    add({ l: 21, t: 3, tag: 'Calculation',
      q: 'How much heat is needed to turn 25.0 g of ice at −10.0 °C into liquid water at 25.0 °C? (c(ice) = 2.09 J/(g·°C), c(water) = 4.184 J/(g·°C), ΔH(fus) = 6.02 kJ/mol)',
      c: [s(tot / 1000, 3) + ' kJ', s((q1 + q3) / 1000, 3) + ' kJ', s(q2 / 1000, 3) + ' kJ', s((q2 + q3) / 1000, 3) + ' kJ', s((q1 + 25.0 * 6.02 + q3) / 1000, 3) + ' kJ'],
      sort: true,
      why: `Three steps. Warm ice: q = 25.0 × 2.09 × 10.0 = ${s(q1, 3)} J. Melt: (25.0/18.02 mol) × 6020 J/mol = ${s(q2, 4)} J. Warm water: 25.0 × 4.184 × 25.0 = ${s(q3, 4)} J. Total = ${s(tot, 4)} J = ${s(tot / 1000, 3)} kJ. Skipping the melting step or the ice-warming step, or multiplying ΔH(fus) by grams instead of moles, gives the other choices.`,
      h: ['Sketch the heating curve: slope, plateau, slope.', 'q = mcΔT on slopes; q = nΔH(fus) on the plateau.', 'The melting step is the largest: about 8.35 kJ.'] }); }

  add({ l: 21, t: 1, tag: 'Concept',
    q: 'On a phase diagram, what is true above the critical point?',
    c: ['The liquid and gas phases become indistinguishable (a supercritical fluid)', 'Solid, liquid and gas coexist in equilibrium', 'The substance can only exist as a solid', 'The vapor pressure becomes zero', 'The liquid boils at any pressure'],
    why: 'Beyond the critical temperature and pressure no amount of pressure can liquefy the gas: liquid and gas merge into one supercritical fluid. All three phases coexist at the TRIPLE point, a different point.',
    h: ['Do not confuse the critical point with the triple point.', 'The liquid-gas line ends at the critical point.', 'Liquid and gas become one phase.'] });

  add({ l: 21, t: 2, tag: 'Concept',
    q: 'Rank water, ethanol and diethyl ether in order of INCREASING vapor pressure at 25 °C.',
    c: ['water < ethanol < diethyl ether', 'diethyl ether < ethanol < water', 'ethanol < water < diethyl ether', 'water < diethyl ether < ethanol', 'all three are equal at the same temperature'],
    why: 'Stronger IMFs hold molecules in the liquid and LOWER the vapor pressure. Water has the most hydrogen bonding (two O−H per molecule); ethanol has one O−H; diethyl ether is polar but cannot hydrogen bond with itself, so it evaporates most easily.',
    h: ['Vapor pressure goes the opposite way to IMF strength.', 'Count O−H groups available for hydrogen bonding.', 'Ether has none.'] });

  /* ---------------- Solids ---------------- */
  add({ l: 22, t: 1, tag: 'Concept',
    q: 'How many atoms are in one face-centered cubic (FCC) unit cell?',
    c: ['4', '1', '2', '8', '14'],
    why: '8 corners × ⅛ = 1, plus 6 faces × ½ = 3: a total of 4 atoms. 14 counts every atom touching the cell without sharing; 2 is body-centered cubic; 1 is simple cubic.',
    h: ['Corner atoms are shared by 8 cells, face atoms by 2.', '8 × ⅛ + 6 × ½.', '1 + 3 atoms.'] });

  { const a = 361.5e-10, d = 4 * 63.55 / NA / Math.pow(a, 3);
    add({ l: 22, t: 3, tag: 'Calculation',
      q: 'Copper crystallizes in a face-centered cubic lattice with an edge length of 361.5 pm. Calculate the density of copper.',
      c: [s(d, 3) + ' g/cm³', s(d / 2, 3) + ' g/cm³', s(d / 4, 3) + ' g/cm³', s(d * 2, 3) + ' g/cm³', sci(d * 1e6, 3) + ' g/cm³'],
      sort: true,
      why: `Mass of one cell = 4 atoms × 63.55 g/mol ÷ 6.022 × 10²³ = ${sci(4 * 63.55 / NA, 4)} g. Edge = 361.5 pm = 3.615 × 10⁻⁸ cm, so V = (3.615 × 10⁻⁸ cm)³ = ${sci(Math.pow(a, 3), 4)} cm³. d = ${sci(4 * 63.55 / NA, 4)}/${sci(Math.pow(a, 3), 4)} = ${s(d, 3)} g/cm³. Using 2 or 1 atoms per cell (BCC, simple cubic) or 8 gives the other densities; a pm → cm slip gives an absurd 10⁶.`,
      h: ['Density = mass of one cell ÷ volume of one cell.', 'FCC has 4 atoms; 1 pm = 10⁻¹⁰ cm.', 'V = (3.615 × 10⁻⁸ cm)³.'] }); }

  { const a3 = 2 * 55.85 / (NA * 7.874), a = Math.cbrt(a3), r = Math.sqrt(3) * a / 4 * 1e10;
    add({ l: 22, t: 4, tag: 'Calculation',
      q: 'Iron crystallizes in a body-centered cubic lattice and has a density of 7.874 g/cm³. Calculate the atomic radius of iron. (Enter a number in pm.)',
      a: s(r, 3) + ' pm', num: r,
      why: `BCC has 2 atoms per cell. V = mass/density = (2 × 55.85/6.022 × 10²³ g)/(7.874 g/cm³) = ${sci(a3, 4)} cm³, so a = ∛V = ${sci(a, 4)} cm = ${s(a * 1e10, 4)} pm. In BCC the atoms touch along the body diagonal: 4r = √3·a, so r = √3 × ${s(a * 1e10, 4)}/4 = ${s(r, 3)} pm.`,
      h: ['Work backwards from density to the cell volume.', 'BCC: 2 atoms per cell and 4r = √3·a.', 'a ≈ 287 pm.'] }); }

  add({ l: 22, t: 3, tag: 'Concept',
    q: 'Quartz (SiO₂) is very hard, does not conduct electricity, and melts above 1600 °C. What type of solid is it?',
    c: ['Network covalent', 'Molecular', 'Ionic', 'Metallic', 'Atomic'],
    why: 'In quartz every Si is covalently bonded to four O atoms in a continuous 3-D network; melting requires breaking covalent bonds, hence the high melting point and hardness. It does not conduct (no mobile ions or electrons). Molecular solids such as dry ice (CO₂) are soft and melt low.',
    h: ['SiO₂ is not made of separate SiO₂ molecules.', 'What must break for it to melt?', 'Covalent bonds throughout the crystal.'] });

  /* ---------------- Solutions and colligative properties ---------------- */
  { const m = 1.38 / 5.12, n = m * 0.0250, M = 1.50 / n;
    add({ l: 24, t: 4, tag: 'Exam',
      q: 'Dissolving 1.50 g of a nonelectrolyte in 25.0 g of benzene lowers the freezing point by 1.38 °C. K(f) of benzene = 5.12 °C/m. What is the molar mass of the solute?',
      c: [s(M, 3) + ' g/mol', s(1.50 / (m * 25.0), 3) + ' g/mol', s(1.50 / (1.38 / 1.86 * 0.0250), 3) + ' g/mol', s(M / 2, 3) + ' g/mol', s(M * 2, 3) + ' g/mol'],
      sort: true,
      why: `m = ΔT/K(f) = 1.38/5.12 = ${s(m, 4)} mol/kg. Moles = m × kg solvent = ${s(m, 4)} × 0.0250 kg = ${sci(n, 4)} mol. M = 1.50 g ÷ ${sci(n, 4)} mol = ${s(M, 3)} g/mol. Using 25.0 kg instead of 0.0250 kg, water's K(f) (1.86), or i = 2 for a nonelectrolyte gives the other choices.`,
      h: ['ΔT(f) → molality → moles → molar mass.', 'Molality uses KILOGRAMS of solvent: 0.0250 kg.', 'm = 0.2695 mol/kg.'] }); }

  { const Pi = 2.65 / 760, Mol = Pi / (R * K(25)), n = Mol * 0.1000, M = 0.500 / n;
    add({ l: 24, t: 4, tag: 'Calculation',
      q: 'A solution of 0.500 g of a protein in enough water to make 100.0 mL has an osmotic pressure of 2.65 torr at 25 °C. What is the molar mass of the protein? (Enter a number in g/mol.)',
      a: sci(M, 3) + ' g/mol', num: M,
      why: `Π = MRT (i = 1). Π = 2.65/760 = ${sci(Pi, 4)} atm. M = Π/RT = ${sci(Pi, 4)}/(0.08206 × 298.15) = ${sci(Mol, 4)} mol/L. Moles in 0.1000 L = ${sci(n, 4)} mol. Molar mass = 0.500 g ÷ ${sci(n, 4)} mol = ${sci(M, 3)} g/mol.`,
      h: ['Osmotic pressure gives molarity: M = Π/RT.', 'Π must be in atm to match R = 0.08206.', 'Then moles = M × 0.1000 L.'] }); }

  { const dT = 3 * 1.86 * 0.150;
    add({ l: 24, t: 3, tag: 'Calculation',
      q: 'What is the freezing point of a 0.150 m aqueous solution of CaCl₂? (K(f) of water = 1.86 °C/m; assume complete dissociation.)',
      c: [f(-dT, 3) + ' °C', f(-1.86 * 0.150, 3) + ' °C', f(-2 * 1.86 * 0.150, 3) + ' °C', '+' + f(dT, 3) + ' °C', f(-3 * 0.512 * 0.150, 3) + ' °C'],
      sort: true,
      why: `CaCl₂ → Ca²⁺ + 2Cl⁻, so i = 3. ΔT(f) = iK(f)m = 3 × 1.86 × 0.150 = ${f(dT, 3)} °C. The freezing point is 0.000 − ${f(dT, 3)} = ${f(-dT, 3)} °C. i = 1 or 2, a positive sign (freezing points go DOWN), or K(b) instead of K(f) gives the other choices.`,
      h: ['How many ions does one CaCl₂ make?', 'ΔT(f) = iK(f)m, and the freezing point is lowered.', 'i = 3 for CaCl₂.'] }); }

  add({ l: 24, t: 3, tag: 'Exam',
    q: 'Which aqueous solution has the LOWEST freezing point? (Assume complete dissociation of electrolytes.)',
    c: ['0.10 m CaCl₂', '0.10 m NaCl', '0.20 m glucose', '0.12 m KNO₃', '0.050 m Al₂(SO₄)₃'],
    why: 'ΔT(f) ∝ i·m. CaCl₂: 3 × 0.10 = 0.30. Al₂(SO₄)₃: 5 × 0.050 = 0.25. KNO₃: 2 × 0.12 = 0.24. NaCl: 2 × 0.10 = 0.20. Glucose: 1 × 0.20 = 0.20. The largest i·m (CaCl₂) gives the biggest drop. Al₂(SO₄)₃ has the largest i, but its molality is only half.',
    h: ['Colligative: count particles, not formula units.', 'Compute i × m for each.', 'Largest i·m → lowest freezing point.'] });

  { const ng = 50.0 / 180.16, nw = 500.0 / 18.02, Xw = nw / (nw + ng), P = Xw * 23.76;
    add({ l: 24, t: 3, tag: 'Calculation',
      q: 'What is the vapor pressure at 25 °C of a solution of 50.0 g of glucose (C₆H₁₂O₆, 180.16 g/mol) in 500.0 g of water? (P° of water at 25 °C = 23.76 torr)',
      c: [s(P, 3) + ' torr', s(23.76 - P, 3) + ' torr', s(500 / 550 * 23.76, 3) + ' torr', '23.8 torr', s(nw / (nw + 2 * ng) * 23.76, 3) + ' torr'],
      sort: true,
      why: `Raoult: P = X(water)·P°. n(glucose) = 50.0/180.16 = ${s(ng, 4)} mol; n(water) = 500.0/18.02 = ${s(nw, 4)} mol. X(water) = ${s(nw, 4)}/${s(nw + ng, 4)} = ${s(Xw, 4)}. P = ${s(Xw, 4)} × 23.76 = ${s(P, 3)} torr. ${s(23.76 - P, 3)} torr is the LOWERING, not the vapor pressure; using mass fractions or i = 2 (glucose does not dissociate) gives the others.`,
      h: ['Raoult’s law uses the mole fraction of the SOLVENT.', 'Convert both masses to moles.', 'X(water) ≈ 0.990.'] }); }

  { const m = 25.0 / 58.44 / 0.500, dT = 2 * 0.512 * m;
    add({ l: 24, t: 3, tag: 'Calculation',
      q: 'By how many degrees does the boiling point of water rise when 25.0 g of NaCl is dissolved in 500. g of water? (K(b) = 0.512 °C/m; assume complete dissociation. Enter a number in °C.)',
      a: s(dT, 3) + ' °C', num: dT,
      why: `m = (25.0/58.44 mol)/0.500 kg = ${s(m, 4)} mol/kg. NaCl gives i = 2. ΔT(b) = iK(b)m = 2 × 0.512 × ${s(m, 4)} = ${s(dT, 3)} °C, so the solution boils at about ${f(100 + dT, 2)} °C.`,
      h: ['Molality first: mol NaCl per kg water.', 'i = 2 for NaCl.', 'ΔT(b) = 2 × 0.512 × 0.856.'] }); }

  { const m = 10.0 / mm('C2H6O2') / 0.1000, dT = 1.86 * m;
    add({ l: 24, t: 4, tag: 'Calculation',
      q: 'What is the freezing point of a solution of 10.0 g of ethylene glycol (C₂H₆O₂, a nonelectrolyte) in 100.0 g of water? (K(f) = 1.86 °C/m; enter a number in °C.)',
      a: f(-dT, 2) + ' °C', num: -dT,
      why: `M(C₂H₆O₂) = ${f(mm('C2H6O2'), 2)} g/mol, so n = ${s(10.0 / mm('C2H6O2'), 4)} mol and m = ${s(10.0 / mm('C2H6O2'), 4)}/0.1000 kg = ${s(m, 4)} m. ΔT(f) = 1.86 × ${s(m, 4)} = ${f(dT, 2)} °C. The freezing point is 0.00 − ${f(dT, 2)} = ${f(-dT, 2)} °C. Entering +${f(dT, 2)} gives the depression, not the freezing point.`,
      h: ['Is the answer the change or the new freezing point?', 'm = mol solute / kg water; i = 1.', 'The freezing point is negative.'] }); }

  add({ l: 23, t: 2, tag: 'Concept',
    q: 'Which substance is MOST soluble in hexane, C₆H₁₄?',
    c: ['CCl₄', 'CH₃OH', 'NaCl', 'glycerol, C₃H₅(OH)₃', 'acetic acid, CH₃COOH'],
    why: 'Like dissolves like: hexane is nonpolar, held together by dispersion forces, and dissolves nonpolar CCl₄. Methanol, glycerol and acetic acid hydrogen bond and prefer polar solvents; NaCl needs ion-dipole forces from a polar solvent such as water.',
    h: ['Is hexane polar or nonpolar?', 'Like dissolves like.', 'Pick the nonpolar solute.'] });

  /* ---------------- Biomolecules (15.6) ---------------- */
  add({ l: 23, t: 3, tag: 'Exam',
    q: 'Two DNA double helices have the same length. Helix A is 60% G-C base pairs; helix B is 40% G-C. Which one needs the higher temperature to separate its strands, and why?',
    c: ['A, because each G-C pair is held by three hydrogen bonds versus two for A-T', 'B, because A-T pairs are held by three hydrogen bonds', 'A, because G-C pairs are joined by covalent bonds', 'B, because it has more base pairs', 'They are the same, because both have the same length'],
    why: 'The two strands are held together by hydrogen bonds between complementary bases (plus base stacking). G-C pairs have three hydrogen bonds and A-T pairs two, so the G-C-rich helix A needs more energy to separate. Base pairs are not covalently bonded to each other.',
    h: ['What holds the two strands together?', 'Count hydrogen bonds per base pair.', 'G-C: 3, A-T: 2.'] });

  add({ l: 23, t: 2, tag: 'Concept',
    q: 'The α-helix and β-pleated sheet (protein secondary structure) are held together mainly by:',
    c: ['hydrogen bonds between backbone N−H and C=O groups', 'covalent disulfide bonds between cysteine side chains', 'ionic bonds between charged side chains', 'peptide bonds between neighbouring amino acids', 'dispersion forces between nonpolar side chains'],
    why: 'Secondary structure comes from regular hydrogen bonding along the backbone: the N−H of one peptide group to the C=O of another. Disulfide bridges, salt bridges and dispersion forces between side chains shape the TERTIARY structure; peptide bonds define the primary sequence.',
    h: ['Secondary structure involves the backbone, not the side chains.', 'Which backbone groups can hydrogen bond?', 'N−H ··· O=C.'] });

  add({ l: 23, t: 3, tag: 'Exam',
    q: 'In a folded protein, the side chain of lysine (−CH₂CH₂CH₂CH₂NH₃⁺) lies next to the side chain of aspartate (−CH₂COO⁻). Which interaction holds them together most strongly?',
    c: ['An ionic attraction (salt bridge) between NH₃⁺ and COO⁻', 'A disulfide bond', 'London dispersion forces only', 'A peptide bond', 'A covalent C−N bond'],
    why: 'At body pH lysine’s side chain carries NH₃⁺ and aspartate’s carries COO⁻; the opposite charges attract (a salt bridge), one of the tertiary-structure interactions. Disulfide bonds need two cysteines; peptide bonds join backbone amino and carboxyl groups.',
    h: ['Look at the charges on the two side chains.', 'Opposite charges attract.', 'Salt bridge.'] });

  add({ l: 23, t: 2, tag: 'Concept',
    q: 'Glucose (C₆H₁₂O₆) dissolves easily in water, but cholesterol (C₂₇H₄₆O) barely dissolves. Why?',
    c: ['Glucose has five O−H groups that hydrogen bond with water; cholesterol has one O−H on a large nonpolar hydrocarbon skeleton', 'Cholesterol is ionic and glucose is covalent', 'Glucose has the larger molar mass', 'Cholesterol hydrogen bonds more strongly than glucose', 'Water is nonpolar, so it dissolves only small molecules'],
    why: 'Solubility in water needs solute-water attractions that can replace water-water hydrogen bonds. Glucose is covered in O−H groups, so it hydrogen bonds extensively with water. Cholesterol is mostly C−H: its single O−H cannot drag the big nonpolar part into water.',
    h: ['Like dissolves like.', 'Count O−H groups relative to the size of the molecule.', 'Cholesterol is mostly hydrocarbon.'] });

  return Q;
};
