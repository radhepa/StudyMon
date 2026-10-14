/* Gym 8 - Models of Chemical Bonding (Silberberg 9.1-9.6), lessons 15-16.
   Lesson 15: bond types, Lewis dot symbols, ionic bonding, lattice energy, Born-Haber, ionic properties.
   Lesson 16: covalent bonding, bond order/length/energy, ΔH from bond energies, electronegativity,
              bond polarity, metallic bonding. */
module.exports = function ({ M, N, chk, setCh }) {
  setCh(8);

  /* ---------------- Lesson 15: bond types and Lewis symbols ---------------- */
  M(15, 1, "Concept", "Which pair of elements is MOST likely to form an ionic compound?",
    "K and Br", ["C and O", "N and Cl", "Cu and Zn", "S and F"],
    "Ionic bonding happens between a metal and a nonmetal: the metal (low ionization energy) transfers electrons to the nonmetal (high electron affinity), and the ions attract. K is a group 1A metal and Br a group 7A nonmetal, so K and Br form ionic KBr. C/O, N/Cl and S/F are pairs of nonmetals, which share electrons (covalent). Cu and Zn are two metals, which pool electrons (metallic bonding).",
    ["Ask whether each element is a metal or a nonmetal.", "Ionic = metal + nonmetal (big electronegativity difference, electron transfer).", "Only one choice pairs a group 1A metal with a halogen."]);

  M(15, 1, "Concept", "What type of bonding holds the atoms together in a piece of solid copper wire?",
    "Metallic bonding", ["Ionic bonding", "Nonpolar covalent bonding", "Polar covalent bonding", "Hydrogen bonding"],
    "Copper is a metal bonded only to other copper atoms, so it is held by metallic bonding: Cu cations in a 'sea' of delocalized valence electrons. Ionic bonding needs a metal plus a nonmetal; covalent bonding is between nonmetals; hydrogen bonding is an intermolecular force involving H on N, O or F, not a bond within a metal.",
    ["Only one element is present - and it is a metal.", "Silberberg's three models: ionic (metal + nonmetal), covalent (nonmetals), metallic (metals).", "Metal atoms with metal atoms → electron sea."]);

  M(15, 1, "Lecture", "In Silberberg's three bonding models, which description matches IONIC bonding?",
    "Electrons are transferred from a metal to a nonmetal, and the resulting ions attract each other",
    ["Electrons are shared in pairs between two nonmetal atoms",
     "Valence electrons are pooled in a 'sea' shared by all the metal atoms",
     "Electrons are transferred from a nonmetal to a metal, giving metal anions",
     "Two metal atoms share a localized pair of electrons between them"],
    "Ionic model: a metal atom (low IE) loses electrons to a nonmetal atom (high, favourable EA); the cations and anions are held by electrostatic attraction in a lattice. Sharing pairs between nonmetals is covalent bonding; the electron sea is metallic bonding. Metals form cations, not anions, so the 'metal anion' choice reverses the transfer, and metals do not share localized pairs with each other.",
    ["Which kind of atom loses electrons easily?", "Ionic = transfer; covalent = sharing; metallic = pooling.", "Metal → cation, nonmetal → anion."]);

  M(15, 2, "Concept", "Which substance contains BOTH ionic and covalent bonds?",
    "Na₂SO₄", ["NaCl", "CO₂", "MgBr₂", "CH₃OH"],
    "Na₂SO₄ is made of Na⁺ ions and SO₄²⁻ ions (ionic bonding between them), and inside each sulfate ion the S and O atoms share electrons (covalent S−O bonds). NaCl and MgBr₂ are purely ionic (monatomic ions only). CO₂ and CH₃OH are molecules with only covalent bonds.",
    ["Look for a compound that contains a polyatomic ion.", "The bonds between the ions are ionic; the bonds inside a polyatomic ion are covalent.", "Sodium with sulfate."]);

  N(15, 1, "Concept", "How many dots appear in the Lewis electron-dot symbol of arsenic (As)? (Enter a whole number.)",
    "5", 5,
    "A Lewis dot symbol shows only the valence electrons. Arsenic is in group 5A (15): [Ar] 4s² 3d¹⁰ 4p³, so it has 5 valence electrons (the filled 3d¹⁰ is not valence for a main-group element) → 5 dots.",
    ["Lewis symbols show valence electrons only.", "For a main-group element, valence electrons = the A-group number.", "As sits under N and P."], { abs: 0 });

  M(15, 2, "Concept", "In its Lewis electron-dot symbol, which atom shows exactly two pairs of dots and two UNPAIRED dots?",
    "O", ["N", "Cl", "B", "Ar"],
    "O has 6 valence electrons: dots go one per side first, then pair up, giving 2 pairs + 2 single dots (which is why O usually forms 2 bonds). N (5 e⁻) has 1 pair + 3 singles; Cl (7) has 3 pairs + 1 single; B (3) has 3 singles; Ar (8) has 4 pairs and no unpaired dots.",
    ["Count valence electrons for each atom.", "Place dots one per side (four sides) before pairing any.", "6 valence electrons → 2 pairs + 2 singles."]);

  M(15, 1, "Concept", "The number of unpaired dots in a main-group atom's Lewis symbol usually equals the number of covalent bonds it forms. How many bonds does nitrogen usually form?",
    "3", ["5", "1", "2", "4"],
    "N has 5 valence electrons: 1 pair and 3 unpaired dots, so it usually forms 3 bonds (as in NH₃). 5 counts all valence electrons, not the unpaired ones; 1, 2 and 4 are the usual bond counts of H/halogens, O and C.",
    ["Draw nitrogen's Lewis symbol.", "5 valence electrons: one pair plus some single dots.", "Think of NH₃."]);

  M(15, 2, "Concept", "Which ion does calcium form in ionic compounds, and why?",
    "Ca²⁺, because losing its two 4s electrons gives the argon configuration",
    ["Ca⁺, because only one electron is easy to remove",
     "Ca²⁻, because gaining two electrons fills the 4p sublevel",
     "Ca³⁺, because losing three electrons empties the n = 4 shell and one core electron",
     "Ca²⁺, because losing two 3d electrons gives a stable half-filled sublevel"],
    "Ca is [Ar] 4s². Losing the two 4s valence electrons gives Ca²⁺, isoelectronic with Ar; the lattice energy gained with a 2+ ion more than repays IE₂. A third electron would come from the argon core (huge IE₃), so Ca³⁺ does not form. Metals lose electrons rather than gain them (no Ca²⁻), and Ca has no 3d electrons at all.",
    ["Write calcium's electron configuration.", "Group 2A metals lose their ns² electrons.", "[Ar] 4s² → remove 2 electrons."]);

  M(15, 2, "Concept", "What is the formula of the ionic compound formed from aluminum and oxygen?",
    "Al₂O₃", ["AlO", "Al₃O₂", "AlO₃", "Al₂O"],
    "Al (group 3A) forms Al³⁺; O (group 6A) forms O²⁻. The charges must cancel: 2(+3) + 3(−2) = 0, so Al₂O₃. Al₃O₂ swaps the subscripts the wrong way (3(+3) + 2(−2) = +5); AlO and AlO₃ and Al₂O are not neutral.",
    ["Find each ion's charge from its group.", "Al³⁺ and O²⁻; balance total positive and negative charge.", "Lowest common multiple of 3 and 2 is 6."]);

  M(15, 2, "Concept", "Magnesium burns in nitrogen to form an ionic nitride. What is its formula?",
    "Mg₃N₂", ["MgN", "Mg₂N₃", "MgN₂", "Mg₂N"],
    "Mg (group 2A) forms Mg²⁺; N (group 5A) gains 3 electrons to form N³⁻. Neutral: 3(+2) + 2(−3) = 0 → Mg₃N₂. Mg₂N₃ reverses the subscripts (2(+2) + 3(−3) = −5); the others are not neutral.",
    ["What charge does N take as a monatomic ion?", "Mg²⁺ and N³⁻; criss-cross the charges.", "3 × (+2) balances 2 × (−3)."]);

  N(15, 2, "Calculation", "When one formula unit of Al₂O₃ forms from its atoms, how many electrons in total are transferred from aluminum to oxygen? (Enter a whole number.)",
    "6", 6,
    "Each Al atom loses 3 electrons to become Al³⁺; two Al atoms lose 2 × 3 = 6. Check from the other side: three O atoms each gain 2 to become O²⁻, 3 × 2 = 6. Electrons lost = electrons gained = 6.",
    ["Each Al becomes Al³⁺.", "Electrons lost by the metal must equal electrons gained by the nonmetal.", "2 Al × 3 electrons each."], { abs: 0 });

  M(15, 2, "Concept", "In forming CaCl₂ from its atoms, what happens to the valence electrons?",
    "One Ca atom transfers one electron to each of two Cl atoms",
    ["One Ca atom transfers two electrons to a single Cl atom, giving Cl²⁻",
     "Each Cl atom transfers one electron to the Ca atom",
     "The Ca atom shares one pair of electrons with each Cl atom",
     "Two Ca atoms each transfer one electron to one Cl₂ molecule"],
    "Ca ([Ar] 4s²) loses two electrons; each Cl (7 valence electrons) needs exactly one to reach an octet. So Ca gives one electron to each of two Cl atoms → Ca²⁺ and 2 Cl⁻. Cl²⁻ would put an electron into the next shell; Cl does not donate to a metal; sharing is covalent, not ionic; and the formula CaCl₂ has one Ca, not two.",
    ["How many electrons does each Cl need to reach an octet?", "Ca has 2 valence electrons and there are 2 Cl atoms.", "One electron for each Cl atom."]);

  M(15, 2, "Concept", "Which statement about the ions in solid NaF is correct?",
    "Na⁺ and F⁻ are both isoelectronic with neon",
    ["Na⁺ is isoelectronic with neon and F⁻ with argon",
     "Na⁺ is isoelectronic with helium and F⁻ with neon",
     "Both ions are isoelectronic with argon",
     "Na⁺ is isoelectronic with neon, but F⁻ still has an unfilled 2p sublevel"],
    "Na (11 e⁻) loses one electron → Na⁺ has 10 electrons, 1s² 2s² 2p⁶ = [Ne]. F (9 e⁻) gains one → F⁻ has 10 electrons, also [Ne]. Neither ion has 18 electrons (argon) or 2 (helium), and F⁻ has a full 2p⁶ sublevel.",
    ["Count the electrons in each ion.", "Na⁺: 11 − 1. F⁻: 9 + 1.", "Both have 10 electrons."]);

  /* ---------------- Lesson 15: lattice energy ---------------- */
  M(15, 1, "Lecture", "The lattice energy (ΔH°lattice) of an ionic compound is the enthalpy change for:",
    "separating one mole of the ionic solid into its gaseous ions",
    ["forming one mole of the ionic solid from its elements in their standard states",
     "separating one mole of the ionic solid into gaseous atoms",
     "dissolving one mole of the ionic solid in water",
     "melting one mole of the ionic solid"],
    "Silberberg defines ΔH°lattice as the enthalpy change when 1 mol of ionic solid separates into gaseous IONS, e.g. NaCl(s) → Na⁺(g) + Cl⁻(g); it is always positive. Forming the solid from elements is ΔH°f; gaseous atoms (not ions) would skip the ionization and electron-affinity steps; dissolving and melting are different processes.",
    ["The definition ends with gaseous ions.", "Write the equation for NaCl.", "NaCl(s) → Na⁺(g) + Cl⁻(g)."]);

  M(15, 2, "Trap", "With lattice energy defined as solid → gaseous ions, what is the sign of ΔH°lattice, and what is the sign of ΔH for the Born-Haber step in which the gaseous ions come together to form the solid?",
    "ΔH°lattice is positive; the ions-to-solid step is negative (−ΔH°lattice)",
    ["ΔH°lattice is negative; the ions-to-solid step is positive",
     "Both are positive",
     "Both are negative",
     "ΔH°lattice can be either sign; the ions-to-solid step is always positive"],
    "Pulling oppositely charged ions apart always requires energy, so ΔH°lattice (solid → ions) is positive. The Born-Haber cycle uses the reverse step, ions → solid, which releases the same amount: its ΔH is −ΔH°lattice. That large negative step is what makes ionic solids stable.",
    ["Does it take energy to pull a + and a − apart?", "Reversing a process reverses the sign of ΔH.", "Separate = endothermic; come together = exothermic."]);

  M(15, 1, "Concept", "According to Coulomb's law, the electrostatic energy of attraction between two ions is:",
    "directly proportional to the product of their charges and inversely proportional to the distance between them",
    ["directly proportional to the distance between them and inversely proportional to the product of their charges",
     "independent of charge and inversely proportional to the distance between them",
     "proportional to the sum of their charges and independent of the distance",
     "proportional to the product of the ions' masses"],
    "Coulomb's law: energy ∝ (charge A × charge B)/distance. Larger charges → stronger attraction; larger distance (bigger ions) → weaker attraction. That is why lattice energy rises with ionic charge and falls with ionic size. Masses play no role.",
    ["Think about what makes two charges attract more strongly.", "E ∝ q₁q₂/d.", "Product of charges on top, distance on the bottom."]);

  N(15, 2, "Calculation", "Lattice energy ∝ (q_cation × q_anion)/(r_cation + r_anion). Two ionic solids have the same interionic distance, but the ions in the second carry charges of 2+ and 2− instead of 1+ and 1−. By what factor is the second solid's lattice energy larger? (Enter a number.)",
    "4", 4,
    "Only the charge product changes: (2 × 2)/(1 × 1) = 4. Doubling both charges quadruples the attraction (not doubles it), which is why MgO's lattice energy is about four times NaF's.",
    ["Only the numerator changes.", "Compare |q₁ × q₂| for the two solids.", "(2 × 2) ÷ (1 × 1)."], { abs: 0.01 });

  N(15, 3, "Calculation", "Using lattice energy ∝ |q₁ × q₂|/d, by what factor would the lattice energy of a solid made of 3+ and 2− ions exceed that of a solid made of 1+ and 1− ions, if the interionic distance d were the same? (Enter a number.)",
    "6", 6,
    "Charge product: |(+3)(−2)| = 6 versus |(+1)(−1)| = 1. With the same d, the ratio is 6/1 = 6. Adding the charges (3 + 2 = 5) or squaring them (9 × 4 = 36) are the common mistakes.",
    ["Use the product of the charges, not the sum.", "|q₁q₂| = 3 × 2 for the first solid.", "The ratio is 6 ÷ 1."], { abs: 0.01 });
  chk("3x2", 3 * 2, 6);

  M(15, 2, "Concept", "Which compound has the larger lattice energy, NaCl or KCl, and why?",
    "NaCl, because Na⁺ is smaller than K⁺, so the ions are closer together",
    ["KCl, because K⁺ is larger and has more electrons",
     "NaCl, because Na⁺ has a higher charge than K⁺",
     "They are equal, because both cations are 1+ and the anion is the same",
     "KCl, because K transfers its electron more easily than Na"],
    "Both have 1+ and 1− ions, so the charge product is the same; size decides. Na⁺ is smaller than K⁺ (one fewer shell), so the Na⁺−Cl⁻ distance is shorter and the attraction larger: NaCl ≈ 787 kJ/mol vs KCl ≈ 717 kJ/mol. Na⁺ and K⁺ have the same charge; how easily K ionizes is part of the Born-Haber cycle, not of the lattice energy itself.",
    ["Compare the charges first, then the sizes.", "Same charges → smaller ions give a larger lattice energy.", "Na⁺ is above K⁺ in group 1A."]);

  M(15, 3, "Exam", "Arrange in order of INCREASING lattice energy: LiF, KBr, NaCl.",
    "KBr < NaCl < LiF", ["LiF < NaCl < KBr", "NaCl < KBr < LiF", "KBr < LiF < NaCl", "LiF < KBr < NaCl"],
    "All three are 1+/1− compounds, so ion size decides. KBr has the largest ions (K⁺ and Br⁻) → smallest lattice energy (≈ 680 kJ/mol); NaCl is in between (≈ 787); LiF has the smallest ions → largest (≈ 1050). 'LiF < NaCl < KBr' is the reverse order (the decreasing list).",
    ["All the charges are the same.", "Smaller ions → closer together → larger lattice energy.", "Smallest ions: Li⁺ and F⁻."]);

  M(15, 3, "Exam", "Arrange in order of DECREASING lattice energy: NaBr, NaF, NaI, NaCl.",
    "NaF > NaCl > NaBr > NaI", ["NaI > NaBr > NaCl > NaF", "NaF > NaBr > NaCl > NaI", "NaCl > NaF > NaBr > NaI", "NaF > NaCl > NaI > NaBr"],
    "Same cation and same charges, so the anion size decides: F⁻ < Cl⁻ < Br⁻ < I⁻ in radius, so lattice energy NaF (≈ 923) > NaCl (≈ 787) > NaBr (≈ 747) > NaI (≈ 704 kJ/mol). The reversed list is the increasing order.",
    ["Only the anion changes.", "Halide ions get bigger down group 7A.", "Smallest anion → largest lattice energy."]);

  M(15, 3, "Exam", "Which list is in order of DECREASING lattice energy?",
    "MgO > CaO > SrO > BaO",
    ["BaO > SrO > CaO > MgO", "CaO > MgO > SrO > BaO", "MgO > SrO > CaO > BaO", "MgO = CaO = SrO = BaO, because every ion is 2+ or 2−"],
    "The charges are all 2+ and 2−, so cation size decides. Down group 2A the cation grows (Mg²⁺ < Ca²⁺ < Sr²⁺ < Ba²⁺), so the distance grows and lattice energy falls: MgO (≈ 3900) > CaO (≈ 3400) > SrO (≈ 3200) > BaO (≈ 3000 kJ/mol). Equal charges do not mean equal lattice energies.",
    ["The charges are identical; what changes?", "Cation radius increases down a group.", "The smallest cation gives the largest lattice energy."]);

  M(15, 4, "Trap", "The interionic distances in NaF and MgO are similar (about 235 pm and 212 pm). How does the lattice energy of MgO compare with that of NaF?",
    "MgO's is roughly four times NaF's, mainly because the product of the ion charges is 4 instead of 1",
    ["About the same, because the ions are nearly the same size",
     "MgO's is roughly twice NaF's, because each ion's charge is doubled",
     "NaF's is larger, because F is more electronegative than O",
     "MgO's is roughly sixteen times NaF's, because each charge enters squared"],
    "Coulomb: energy ∝ q₁q₂/d. For MgO, (2)(2) = 4; for NaF, (1)(1) = 1. The distances are similar (MgO's is even a little shorter), so MgO's lattice energy is about 4× larger: ≈ 3900 vs ≈ 923 kJ/mol. Doubling each charge multiplies the product by 4, not 2; the charges are not squared individually (that would give 16); electronegativity does not set lattice energy.",
    ["Charge or size - which one differs a lot here?", "Use q₁ × q₂ for each compound.", "(2 × 2)/(1 × 1) with similar distances."]);

  M(15, 4, "Exam", "Rank in order of INCREASING lattice energy: CaS, KI, MgO, LiCl.",
    "KI < LiCl < CaS < MgO", ["MgO < CaS < LiCl < KI", "LiCl < KI < MgO < CaS", "KI < LiCl < MgO < CaS", "LiCl < KI < CaS < MgO"],
    "First sort by charge: KI and LiCl are 1+/1− (charge product 1); CaS and MgO are 2+/2− (product 4), so both 2+/2− solids are far higher. Then sort by size within each pair: KI has larger ions than LiCl, so KI (≈ 650) < LiCl (≈ 850); CaS has larger ions than MgO, so CaS (≈ 3100) < MgO (≈ 3900 kJ/mol). Charge beats size.",
    ["Group the compounds by ion charges first.", "Within a charge group, smaller ions → larger lattice energy.", "The two 1+/1− salts come first; the oxide with the smallest ions comes last."]);

  M(15, 2, "Concept", "Which compound would you expect to have the HIGHEST melting point?",
    "MgO", ["NaCl", "KBr", "CsI", "NaF"],
    "Melting an ionic solid means overcoming the attractions that the lattice energy measures. MgO has 2+ and 2− ions (charge product 4) and small ions, so its lattice energy is by far the largest; it melts near 2850 °C, compared with 993 °C for NaF and 801 °C for NaCl. KBr and CsI have larger, singly charged ions and melt lower still.",
    ["Melting point tracks the strength of the ionic attractions.", "Which compound has doubly charged ions?", "Highest charge product and small ions."]);

  /* ---------------- Lesson 15: Born-Haber cycle ---------------- */
  M(15, 1, "Lecture", "The Born-Haber cycle, which finds a lattice energy from other measured enthalpies, is an application of:",
    "Hess's law", ["Coulomb's law alone", "Avogadro's law", "the law of multiple proportions", "the octet rule"],
    "The Born-Haber cycle breaks the formation of an ionic solid from its elements into steps (atomize, ionize, add electrons, form the lattice). Because enthalpy is a state function, the step enthalpies add up to ΔH°f - that is Hess's law. Coulomb's law explains lattice-energy trends but does not by itself give the cycle.",
    ["The cycle adds up the ΔH of several steps.", "ΔH of an overall process = sum of the ΔH of its steps.", "The Thermochemistry 3 law."]);

  M(15, 1, "Concept", "Which equation represents the ionization step in the Born-Haber cycle for NaCl?",
    "Na(g) → Na⁺(g) + e⁻",
    ["Na(s) → Na⁺(g) + e⁻", "Na(s) → Na(g)", "Cl(g) + e⁻ → Cl⁻(g)", "Na⁺(g) + Cl⁻(g) → NaCl(s)"],
    "Ionization energy is defined for a gaseous atom: Na(g) → Na⁺(g) + e⁻ (IE₁ = +496 kJ/mol). Na(s) → Na(g) is the atomization step that must come first; Na(s) → Na⁺(g) combines two steps; Cl(g) + e⁻ → Cl⁻(g) is the electron-affinity step; the last equation is the lattice-forming step.",
    ["Ionization energy is always for a gaseous atom.", "The sodium must already be in the gas phase.", "Gaseous atom → gaseous cation + electron."]);

  M(15, 2, "Concept", "Which TWO steps of the Born-Haber cycle for NaCl are exothermic?",
    "Cl(g) + e⁻ → Cl⁻(g) and Na⁺(g) + Cl⁻(g) → NaCl(s)",
    ["Na(s) → Na(g) and Na(g) → Na⁺(g) + e⁻",
     "½Cl₂(g) → Cl(g) and Cl(g) + e⁻ → Cl⁻(g)",
     "Na(g) → Na⁺(g) + e⁻ and Na⁺(g) + Cl⁻(g) → NaCl(s)",
     "Na(s) → Na(g) and ½Cl₂(g) → Cl(g)"],
    "Atomizing Na (+107.8), ionizing Na (+496) and breaking Cl₂ (+121.0 per Cl) all absorb energy. Adding an electron to Cl releases energy (EA = −349 kJ/mol), and bringing the gaseous ions together into the lattice releases a lot (−787 kJ/mol). Those two are the exothermic steps.",
    ["Breaking things apart and removing electrons cost energy.", "Chlorine's electron affinity is negative.", "Electron addition to Cl, and the ions coming together."]);

  M(15, 2, "Concept", "In a Born-Haber cycle, ΔH for the step ½Cl₂(g) → Cl(g) equals:",
    "one-half of the Cl−Cl bond energy",
    ["the full Cl−Cl bond energy", "the electron affinity of Cl", "the first ionization energy of Cl", "the negative of the Cl−Cl bond energy"],
    "Breaking one mole of Cl−Cl bonds (243 kJ) gives 2 mol of Cl atoms. Only 1 mol of Cl is needed per mole of NaCl, so the step is ½ × 243 ≈ 121.5 kJ (tabulated ΔH°f of Cl(g) = 121.0 kJ/mol). Using the full bond energy is a common error; the step is endothermic, so it is not negative.",
    ["How many Cl atoms come from one Cl₂ molecule?", "Bond energy is per mole of Cl−Cl bonds broken.", "Half a mole of Cl₂ gives one mole of Cl."]);

  {
    const U = 107.8 + 496 + 121.0 - 349 + 411.1;
    chk("NaCl lattice", U, 786.9);
    N(15, 3, "Calculation", "Use a Born-Haber cycle to find the lattice energy of NaCl. Data (kJ/mol): ΔH°f of NaCl(s) = −411.1; Na(s) → Na(g), +107.8; first ionization energy of Na, +496; ½Cl₂(g) → Cl(g), +121.0; electron affinity of Cl, −349. (Enter a number in kJ/mol.)",
      "787 kJ/mol", 786.9,
      "Hess's law: ΔH°f = ΔH(atomize Na) + IE₁ + ΔH(½Cl₂ → Cl) + EA + (−ΔH°lattice). So −411.1 = 107.8 + 496 + 121.0 − 349 − ΔH°lattice = 375.8 − ΔH°lattice → ΔH°lattice = 375.8 + 411.1 = 786.9 ≈ 787 kJ/mol. It must come out positive (separating ions costs energy).",
      ["Write ΔH°f as the sum of all five steps.", "The lattice-forming step enters as −ΔH°lattice.", "ΔH°lattice = 107.8 + 496 + 121.0 − 349 + 411.1."]);
  }

  {
    const U = 161 + 520 + 79.5 - 328 + 617;
    chk("LiF", U, 1049.5);
    chk("LiF noHalf", 161 + 520 + 159 - 328 + 617, 1129);
    chk("LiF EA sign", 161 + 520 + 79.5 + 328 + 617, 1705.5);
    chk("LiF dHf sign", 161 + 520 + 79.5 - 328 - 617, -184.5);
    M(15, 3, "Calculation", "Calculate the lattice energy of LiF from these data (kJ/mol): ΔH°f of LiF(s) = −617; Li(s) → Li(g), +161; IE₁ of Li, +520; F−F bond energy, +159; electron affinity of F, −328.",
      "1050 kJ/mol", ["1129 kJ/mol", "1706 kJ/mol", "−185 kJ/mol", "−1050 kJ/mol"],
      "Steps: Li(s) → Li(g) +161; Li(g) → Li⁺(g) +520; ½F₂ → F(g) +½(159) = +79.5; F(g) + e⁻ → F⁻(g) −328; ions → LiF(s) = −ΔH°lattice. Sum = ΔH°f: 161 + 520 + 79.5 − 328 − ΔH°lattice = −617 → ΔH°lattice = 432.5 + 617 = 1049.5 ≈ 1050 kJ/mol. 1129 uses the whole F−F energy instead of half; 1706 adds the electron affinity as +328; −185 uses +617 for ΔH°f; −1050 has the lattice-energy sign reversed.",
      ["Only half a mole of F₂ is needed.", "ΔH°f = sum of steps, with the lattice step entering as −ΔH°lattice.", "ΔH°lattice = 161 + 520 + 79.5 − 328 + 617."]);
  }

  {
    const f = 89 + 419 + 121 - 349 - 717;
    chk("KCl", f, -437);
    chk("KCl lattice sign", 89 + 419 + 121 - 349 + 717, 997);
    chk("KCl EA sign", 89 + 419 + 121 + 349 - 717, 261);
    chk("KCl full BE", 89 + 419 + 242 - 349 - 717, -316);
    chk("KCl no IE", 89 + 121 - 349 - 717, -856);
    M(15, 4, "Exam", "Use a Born-Haber cycle to calculate ΔH°f of KCl(s). Data (kJ/mol): K(s) → K(g), +89; IE₁ of K, +419; Cl−Cl bond energy, +242; electron affinity of Cl, −349; lattice energy of KCl, +717.",
      "−437 kJ/mol", ["+997 kJ/mol", "+261 kJ/mol", "−316 kJ/mol", "−856 kJ/mol"],
      "ΔH°f = ΔH(K(s) → K(g)) + IE₁ + ½BE(Cl₂) + EA − ΔH°lattice = 89 + 419 + 121 − 349 − 717 = −437 kJ/mol. +997 adds the lattice energy instead of subtracting it (the ions-to-solid step releases energy); +261 uses +349 for the electron affinity; −316 uses the whole Cl−Cl energy (242) instead of half; −856 leaves out the ionization energy.",
      ["Formation of the solid from the elements is the sum of all steps.", "The final step (ions → solid) is −ΔH°lattice; use ½ of the Cl−Cl energy.", "89 + 419 + 121 − 349 − 717."]);
  }

  {
    const ea = -437 - 89 - 419 - 121.5 + 717;
    chk("EA Cl", ea, -349.5);
    chk("EA lattice sign", -437 - 89 - 419 - 121.5 - 717, -1783.5);
    chk("EA full BE", -437 - 89 - 419 - 243 + 717, -471);
    chk("EA no IE", -437 - 89 - 121.5 + 717, 69.5);
    M(15, 4, "Exam", "Use a Born-Haber cycle to find the electron affinity of chlorine. Data (kJ/mol): ΔH°f of KCl(s) = −437; K(s) → K(g), +89; IE₁ of K, +419; Cl−Cl bond energy, +243; lattice energy of KCl, +717.",
      "−349.5 kJ/mol", ["−1783.5 kJ/mol", "−471.0 kJ/mol", "+349.5 kJ/mol", "+69.5 kJ/mol"],
      "ΔH°f = ΔH(K(s) → K(g)) + IE₁ + ½BE(Cl₂) + EA − ΔH°lattice, so −437 = 89 + 419 + 121.5 + EA − 717. EA = −437 − 89 − 419 − 121.5 + 717 = −349.5 kJ/mol (exothermic, as expected for Cl). −1783.5 treats the ions-to-solid step as +717; −471.0 uses the whole Cl−Cl energy; +69.5 leaves out IE₁; +349.5 has the sign flipped at the end.",
      ["Write ΔH°f as the sum of the five steps, with EA as the unknown.", "Use ½ × 243 for Cl atoms and −717 for the ions-to-solid step.", "EA = −437 − 89 − 419 − 121.5 + 717."]);
  }

  {
    const U = 148 + 738 + 1451 + 249 - 141 + 878 + 601.6;
    chk("MgO", U, 3924.6);
    chk("MgO noIE2", U - 1451, 2473.6);
    chk("MgO EA2 sign", U - 2 * 878, 2168.6);
    chk("MgO full O2", U + 249, 4173.6);
    chk("MgO dHf sign", U - 2 * 601.6, 2721.4);
    M(15, 4, "Exam", "Find the lattice energy of MgO(s). Data (kJ/mol): ΔH°f of MgO(s) = −601.6; Mg(s) → Mg(g), +148; IE₁ of Mg, +738; IE₂ of Mg, +1451; O=O bond energy, +498; first electron affinity of O, −141; second electron affinity of O (O⁻ → O²⁻), +878.",
      "3925 kJ/mol", ["2474 kJ/mol", "2169 kJ/mol", "4174 kJ/mol", "2721 kJ/mol"],
      "Steps: 148 (atomize Mg) + 738 + 1451 (two ionizations) + 249 (½ × 498 to make one O atom) − 141 + 878 (two electron additions; adding an electron to O⁻ is endothermic) − ΔH°lattice = −601.6. So ΔH°lattice = 3323 + 601.6 = 3924.6 ≈ 3925 kJ/mol. 2474 forgets IE₂; 2169 treats the second EA as −878; 4174 uses the full O=O energy; 2721 uses +601.6 for ΔH°f.",
      ["Mg²⁺ needs two ionization steps and O²⁻ needs two electron-addition steps.", "Only ½ mol O₂ is needed; the second electron affinity is positive.", "ΔH°lattice = 148 + 738 + 1451 + 249 − 141 + 878 + 601.6."]);
  }

  {
    const U = 178 + 590 + 1145 + 243 - 2 * 349 + 795.8;
    chk("CaCl2", U, 2253.8);
    chk("CaCl2 one EA", U + 349, 2602.8);
    chk("CaCl2 half BE", U - 121.5, 2132.3);
    chk("CaCl2 no IE2", U - 1145, 1108.8);
    chk("CaCl2 dHf sign", U - 2 * 795.8, 662.2);
    M(15, 4, "Calculation", "Find the lattice energy of CaCl₂(s). Data (kJ/mol): ΔH°f of CaCl₂(s) = −795.8; Ca(s) → Ca(g), +178; IE₁ of Ca, +590; IE₂ of Ca, +1145; Cl−Cl bond energy, +243; electron affinity of Cl, −349.",
      "2254 kJ/mol", ["2603 kJ/mol", "2132 kJ/mol", "1109 kJ/mol", "662 kJ/mol"],
      "One mole of CaCl₂ needs a whole mole of Cl₂ (two Cl atoms) and two electron additions. ΔH°f = 178 + 590 + 1145 + 243 + 2(−349) − ΔH°lattice → −795.8 = 1458 − ΔH°lattice → ΔH°lattice = 2253.8 ≈ 2254 kJ/mol. 2603 uses only one electron affinity; 2132 uses ½(243) as if only one Cl were needed; 1109 forgets IE₂; 662 uses +795.8 for ΔH°f.",
      ["Count how many Cl atoms are in one formula unit.", "Two Cl atoms: the full Cl−Cl bond energy and 2 × EA.", "ΔH°lattice = 178 + 590 + 1145 + 243 − 698 + 795.8."]);
  }

  M(15, 2, "Concept", "The first ionization energy of Na (+496 kJ/mol) is larger in size than the energy released when Cl gains an electron (−349 kJ/mol). Why is forming NaCl(s) from Na(s) and Cl₂(g) still strongly exothermic?",
    "The large energy released when the gaseous ions form the crystal lattice outweighs the net cost of making the ions",
    ["Electron transfer from a Na atom to a Cl atom is itself exothermic",
     "Breaking the Cl−Cl bond releases energy",
     "Sublimation of sodium releases energy",
     "Na⁺ and Cl⁻ have noble-gas configurations, and reaching one always releases energy"],
    "Making the gaseous ions costs net energy: 496 − 349 = +147 kJ/mol (plus atomizing both elements). The payoff is the lattice step: gaseous ions → solid releases about 787 kJ/mol, which is why ΔH°f(NaCl) = −411 kJ/mol. Electron transfer between isolated atoms is endothermic; breaking bonds and subliming absorb energy; reaching a noble-gas configuration does not by itself release energy (forming Na⁺ costs energy).",
    ["Add up IE and EA: is the transfer alone favourable?", "Which Born-Haber step is very large and negative?", "Think about the ions coming together."]);

  M(15, 3, "Concept", "Why does sodium form Na⁺ but never Na²⁺ in ionic compounds?",
    "Removing a second electron would take a core 2p electron, which costs far more energy than the extra lattice energy could repay",
    ["Na has only one electron in total outside its nucleus",
     "A 2+ ion would be too small to fit in a crystal lattice",
     "Na²⁺ would be isoelectronic with neon, which is unstable",
     "Chloride ions can accept only one electron each, so Na can give only one"],
    "Na is [Ne] 3s¹. The first electron (3s) is easy to remove (496 kJ/mol), but the second would come from the filled n = 2 core (IE₂ ≈ 4560 kJ/mol). No increase in lattice energy can pay that back, so compounds of Na²⁺ do not form. Na has 11 electrons; it is Na⁺ (not Na²⁺) that is isoelectronic with Ne; and a metal could give electrons to more anions if it were favourable (as Mg does).",
    ["Write Na's configuration and look at what the second electron would be.", "Compare IE₁ with IE₂ - core electrons are very hard to remove.", "The second electron is in the [Ne] core."]);

  M(15, 4, "Trap", "Forming Mg²⁺ costs IE₁ + IE₂ = 2189 kJ/mol, far more than forming Mg⁺ (738 kJ/mol), and making O²⁻ from O⁻ is also endothermic. Why is MgO still made of Mg²⁺ and O²⁻ ions rather than Mg⁺ and O⁻?",
    "With 2+ and 2− ions the lattice energy is roughly four times larger, which more than repays the extra ionization and electron-addition costs",
    ["Adding the second electron to O⁻ releases a lot of energy",
     "The second ionization energy of magnesium is negative",
     "Mg⁺O⁻ would have the larger lattice energy, but it forms too slowly",
     "Mg⁺ and O⁻ ions cannot exist, even in the gas phase"],
    "Lattice energy ∝ q₁q₂/d: going from (1)(1) to (2)(2) multiplies it by about 4 (≈ 3900 kJ/mol for MgO). That gain is far bigger than the extra cost of IE₂ (1451) plus the endothermic second electron addition (+878), so the 2+/2− solid has the lower total enthalpy. The second electron affinity of O is positive, not exothermic; IE₂ is positive; Mg⁺ and O⁻ do exist as gaseous ions.",
    ["Which term grows a lot when both charges double?", "Coulomb: (2 × 2) vs (1 × 1).", "The bigger lattice energy pays for IE₂ and the second electron addition."]);

  /* ---------------- Lesson 15: properties of ionic compounds ---------------- */
  M(15, 1, "Concept", "Which property is typical of ionic compounds such as NaCl?",
    "They conduct electricity when molten or dissolved in water, but not as solids",
    ["They conduct electricity well as solids", "They have low melting points", "They are soft and easy to bend", "They never conduct electricity, even when molten"],
    "In the solid the ions are locked in place, so there are no mobile charges and no conduction. Melting or dissolving frees the ions to move, so the liquid or the solution conducts. Ionic solids have high melting points and are hard but brittle.",
    ["What must be able to move for electricity to flow?", "Are the ions free to move in the solid?", "Ions move only when the lattice is broken up."]);

  M(15, 2, "Concept", "Why are ionic crystals hard but brittle?",
    "A strong blow shifts one layer of ions so that like charges line up, and the repulsion splits the crystal",
    ["The ions are held by weak forces that break easily",
     "Free electrons move through the crystal and weaken it",
     "The covalent bonds inside each ion break under stress",
     "Ionic crystals contain molecules that slide past each other"],
    "The attractions in the lattice are strong (hard), but if a force moves one layer by one ion, cations face cations and anions face anions. The like-charge repulsions push the layers apart and the crystal cracks (brittle). The forces are not weak; ionic solids have no free electrons and no discrete molecules.",
    ["Picture one row of + − + − sliding along the row below it.", "What happens when like charges end up side by side?", "Repulsion between like charges."]);

  M(15, 2, "Trap", "Which statement about solid sodium chloride is FALSE?",
    "It conducts electricity well because it is made of charged ions",
    ["It has a high melting point (801 °C)", "Its ions are held in fixed positions in a lattice", "Its aqueous solution conducts electricity", "It cracks rather than bends when struck hard"],
    "Solid NaCl does NOT conduct: the ions are held in fixed positions and cannot move. The other statements are true: high melting point from strong ionic attractions, fixed lattice positions, conducting solution (mobile ions), and brittleness.",
    ["Containing ions is not enough for conduction.", "The charges must be free to move.", "Are the ions in a solid free to move?"]);

  M(15, 2, "Concept", "Why do ionic compounds have high melting points?",
    "Each ion is held by strong electrostatic attractions to many oppositely charged neighbours, so much energy is needed to free the ions",
    ["Ionic compounds contain strong covalent bonds that must be broken",
     "The ions are very heavy",
     "Melting requires breaking the bonds inside polyatomic ions",
     "Formula units are held together by hydrogen bonds"],
    "In a lattice every ion is surrounded by several ions of opposite charge; melting means disrupting all these strong Coulomb attractions, which takes a lot of energy (high melting point). There are no covalent bonds between Na⁺ and Cl⁻, mass is not the cause, polyatomic ions stay intact on melting, and hydrogen bonding is not involved.",
    ["What force holds the ions in place?", "Each ion attracts many neighbours, not just one.", "Strong Coulomb attractions throughout the lattice."]);

  M(15, 3, "Exam", "NaF melts at 993 °C. What would you predict for MgO, and why?",
    "Much higher (it melts near 2850 °C), because the 2+ and 2− charges give a much larger lattice energy",
    ["Lower, because O is less electronegative than F",
     "About the same, because the ions are nearly the same size",
     "Lower, because Mg atoms are smaller than Na atoms",
     "Much higher, because MgO is covalent while NaF is ionic"],
    "Both are ionic with similar interionic distances, but MgO's charge product is 4 versus 1, so its lattice energy (≈ 3900 vs ≈ 923 kJ/mol) and melting point are much higher. Similar size does not mean similar strength when the charges differ; electronegativity does not set the melting point; MgO is ionic, not covalent.",
    ["Compare charges and sizes of the ions.", "Lattice energy controls the melting point of an ionic solid.", "Charge product 4 versus 1."]);

  M(15, 1, "Concept", "Which substance is best described as covalent (made of molecules)?",
    "SCl₂", ["CsF", "CaO", "Na₂S", "MgBr₂"],
    "S and Cl are both nonmetals, so they share electrons and form SCl₂ molecules. CsF, CaO, Na₂S and MgBr₂ each combine a metal with a nonmetal and are ionic.",
    ["Classify each element as a metal or a nonmetal.", "Covalent = nonmetal + nonmetal.", "Find the compound with no metal in it."]);

  M(15, 3, "Exam", "Which choice correctly gives the bonding in KCl, Cl₂, HCl and K, in that order?",
    "ionic; nonpolar covalent; polar covalent; metallic",
    ["ionic; polar covalent; nonpolar covalent; metallic",
     "polar covalent; nonpolar covalent; ionic; metallic",
     "ionic; ionic; polar covalent; metallic",
     "metallic; nonpolar covalent; polar covalent; ionic"],
    "KCl: metal + nonmetal → ionic. Cl₂: two identical atoms share electrons equally → nonpolar covalent. HCl: two different nonmetals, Cl more electronegative → polar covalent. K: a pure metal → metallic. Swapping Cl₂ and HCl, or calling HCl ionic, are the usual slips.",
    ["Start with which elements are metals.", "Identical atoms share equally; different nonmetals share unequally.", "Metal+nonmetal, same atoms, different nonmetals, pure metal."]);

  M(15, 2, "Concept", "When lithium and oxygen atoms form Li₂O, what happens in terms of Lewis symbols?",
    "Each of two Li atoms gives its single valence electron to one O atom, which ends up with 8 dots as O²⁻",
    ["One Li atom gives two electrons to O, which ends up with 8 dots",
     "Each Li atom shares one pair with O, giving the molecule Li−O−Li",
     "O gives one electron to each Li atom, so each Li ends up with 2 dots",
     "Each of two Li atoms gives one electron to O, which ends up with 7 dots as O⁻"],
    "Li has 1 valence electron; O has 6 and needs 2 more. Two Li atoms each transfer one electron: 2 Li⁺ and an O²⁻ with an octet (8 dots), formula Li₂O. Li has only one valence electron to give; Li and O form an ionic (not covalent) compound; electrons move from the metal to the nonmetal; and two transferred electrons give O 8 dots and a 2− charge, not 7 and 1−.",
    ["How many valence electrons does each atom start with?", "O needs two electrons; each Li can give one.", "6 + 2 = 8 dots, charge 2−."]);

  M(15, 2, "Concept", "Which element would most likely form a 3− ion in an ionic compound with a reactive metal?",
    "P", ["Al", "Cl", "S", "Na"],
    "P (group 5A) has 5 valence electrons and gains 3 to reach the argon configuration, forming P³⁻ (as in Na₃P). Al and Na are metals that form cations (Al³⁺, Na⁺); Cl gains 1 (Cl⁻); S gains 2 (S²⁻).",
    ["Nonmetals gain electrons until they reach an octet.", "Electrons gained = 8 − valence electrons.", "Group 5A needs 3."]);

  M(15, 3, "Exam", "Which ionic compound would you expect to have the LARGEST lattice energy?",
    "MgO", ["CaO", "BaS", "NaF", "LiCl"],
    "Charge first: MgO, CaO and BaS are 2+/2− (charge product 4); NaF and LiCl are 1+/1− (product 1). Among the 2+/2− compounds, MgO has the smallest ions (Mg²⁺ and O²⁻), so the shortest distance and the largest lattice energy (≈ 3900 kJ/mol vs ≈ 3400 for CaO; BaS has two large ions).",
    ["Highest charges first.", "Then the smallest ions.", "Small 2+ cation with small 2− anion."]);

  M(15, 4, "Trap", "A student argues: 'KF has a larger lattice energy than LiF, because the electronegativity difference in KF is larger.' What is wrong with the argument?",
    "Lattice energy depends on ion charge and size, not ΔEN; K⁺ is larger than Li⁺, so KF's lattice energy is SMALLER (≈ 820 vs ≈ 1050 kJ/mol)",
    ["Nothing; ΔEN controls lattice energy, and KF has the larger ΔEN",
     "KF's lattice energy is smaller, because K⁺ has a smaller charge than Li⁺",
     "The two are equal, because the anion is the same",
     "LiF is covalent, so it has no lattice energy"],
    "Coulomb's law: lattice energy ∝ q₁q₂/d. K⁺ and Li⁺ have the same 1+ charge, but K⁺ is much larger, so the K⁺−F⁻ distance is longer and KF's lattice energy is smaller. ΔEN tells you how ionic a bond is, not how strongly the lattice holds together. Both cations are 1+; the cations differ, so the values are not equal; LiF is ionic.",
    ["What two things appear in Coulomb's law?", "Compare the charges, then the sizes, of Li⁺ and K⁺.", "Same charge; K⁺ is bigger."]);

  M(15, 3, "Exam", "Which quantity is NOT needed to calculate the lattice energy of CaO with a Born-Haber cycle?",
    "The electron affinity of calcium",
    ["The second ionization energy of calcium", "The O=O bond energy", "The second electron affinity of oxygen", "The standard enthalpy of formation of CaO"],
    "The cycle for CaO: Ca(s) → Ca(g); Ca(g) → Ca²⁺(g) (IE₁ + IE₂); ½O₂ → O(g) (½ × O=O bond energy); O(g) → O²⁻(g) (EA₁ + EA₂); ions → CaO(s); and ΔH°f to close the cycle. Calcium loses electrons, so its electron affinity never appears.",
    ["List the steps that turn Ca(s) and O₂(g) into Ca²⁺(g) and O²⁻(g).", "Ca loses electrons; O gains them.", "Which atom never gains an electron?"]);

  M(15, 4, "Exam", "Substance X is shiny, conducts electricity as a solid and as a liquid, and can be drawn into wire. Substance Y is hard and brittle, melts at 1100 °C, and conducts only when molten. Substance Z is a gas at room temperature that does not conduct in any state. Which bonding models fit X, Y and Z?",
    "metallic; ionic; covalent", ["ionic; metallic; covalent", "metallic; covalent; ionic", "covalent; ionic; metallic", "ionic; covalent; metallic"],
    "X: conducts as a solid and is ductile → mobile electron sea → metallic. Y: high melting point, brittle, conducts only when the ions are freed by melting → ionic. Z: low boiling point and nonconducting → small covalent molecules held by weak forces between them.",
    ["Which model allows conduction in the SOLID?", "Brittle + conducts only when molten = ions locked in a lattice.", "A nonconducting gas is made of molecules."]);

  /* ---------------- Lesson 16: covalent bonds, order, length, energy ---------------- */
  M(16, 1, "Lecture", "Bond order is:",
    "the number of electron pairs shared between two bonded atoms",
    ["the total number of bonds an atom forms", "the number of lone pairs on the two bonded atoms", "the energy needed to break the bond", "the number of atoms bonded to a central atom"],
    "Bond order counts shared pairs between ONE pair of atoms: single = 1, double = 2, triple = 3 (and resonance can give averages such as 1.5). It is not the atom's total number of bonds, not lone pairs, and not an energy.",
    ["It describes one bond between two particular atoms.", "Single, double, triple ...", "Count the shared pairs between the two atoms."]);

  N(16, 1, "Concept", "What is the bond order of the nitrogen-nitrogen bond in N₂? (Enter a number.)",
    "3", 3,
    "N₂ has 10 valence electrons: :N≡N:, a triple bond (three shared pairs) with one lone pair on each N. Bond order = 3.",
    ["Draw the Lewis structure of N₂ (10 valence electrons).", "Each N needs an octet with only one partner.", "Three shared pairs."], { abs: 0 });

  M(16, 2, "Concept", "Arrange the carbon-carbon bonds in order of INCREASING bond length: C=C, C≡C, C−C.",
    "C≡C < C=C < C−C", ["C−C < C=C < C≡C", "C=C < C≡C < C−C", "C≡C < C−C < C=C", "C−C = C=C = C≡C"],
    "More shared pairs pull the nuclei closer: higher bond order → shorter bond. C≡C ≈ 121 pm < C=C ≈ 134 pm < C−C ≈ 154 pm. 'C−C < C=C < C≡C' is the order of increasing bond ENERGY with the length idea reversed.",
    ["How does bond order affect bond length?", "Higher bond order = shorter bond.", "Triple is shortest, single is longest."]);

  M(16, 2, "Concept", "Arrange the nitrogen-nitrogen bonds in order of DECREASING bond energy: N−N, N=N, N≡N.",
    "N≡N > N=N > N−N", ["N−N > N=N > N≡N", "N=N > N≡N > N−N", "N≡N > N−N > N=N", "N≡N = N=N = N−N, because each joins two N atoms"],
    "Higher bond order → stronger bond: N≡N (945 kJ/mol) > N=N (418) > N−N (160). Bonds between the same two elements are not equal in strength; the order of shared pairs matters.",
    ["How does bond order affect bond strength?", "Higher bond order = stronger bond.", "Triple > double > single."]);

  M(16, 2, "Concept", "Which carbon-oxygen or carbon-carbon bond is both the SHORTEST and the STRONGEST?",
    "C≡O", ["C=O", "C−O", "C−C", "C=C"],
    "Bond order 3 between small C and O atoms: C≡O (as in carbon monoxide) is 113 pm and 1070 kJ/mol, shorter and stronger than C=O (123 pm, 745), C−O (143 pm, 358), C=C (134 pm, 614) and C−C (154 pm, 347).",
    ["Look for the highest bond order.", "Higher order → shorter and stronger.", "The only triple bond in the list."]);

  M(16, 2, "Exam", "Arrange in order of INCREASING bond length: H−I, H−F, H−Br, H−Cl.",
    "H−F < H−Cl < H−Br < H−I", ["H−I < H−Br < H−Cl < H−F", "H−F < H−Br < H−Cl < H−I", "H−Cl < H−F < H−I < H−Br", "H−F < H−Cl < H−I < H−Br"],
    "All are single bonds, so atom size decides: halogen radius grows F < Cl < Br < I, so bond length grows H−F (92 pm) < H−Cl (127) < H−Br (141) < H−I (161). The reversed list is the order of decreasing length.",
    ["All four are single bonds.", "Bond length ≈ sum of the two atoms' radii.", "Halogen atoms get bigger down the group."]);

  M(16, 3, "Exam", "Arrange in order of DECREASING bond energy: H−Cl, H−I, H−F, H−Br.",
    "H−F > H−Cl > H−Br > H−I", ["H−I > H−Br > H−Cl > H−F", "H−Cl > H−F > H−Br > H−I", "H−F > H−Br > H−Cl > H−I", "H−F > H−Cl > H−I > H−Br"],
    "For bonds of the same order, shorter bonds are stronger. Bond length rises F < Cl < Br < I, so bond energy falls: H−F (565 kJ/mol) > H−Cl (427) > H−Br (363) > H−I (295). Listing them by increasing energy is the reversed trap.",
    ["Same bond order - which are shortest?", "Shorter bond → stronger bond.", "Small F gives the strongest bond to H."]);

  M(16, 1, "Concept", "Which statement about bond energy (BE) is correct?",
    "It is always positive, because energy must be absorbed to break a bond",
    ["It is always negative, because bonds release energy when they break",
     "It is positive for strong bonds and negative for weak bonds",
     "It is the energy released when one mole of a gaseous compound forms from its elements",
     "It is larger for longer bonds between the same two atoms"],
    "Bond energy is the enthalpy change to BREAK one mole of a given bond in gaseous molecules - always endothermic, so always positive. Breaking bonds never releases energy; formation from elements is ΔH°f; and for the same atoms, longer bonds (lower order) are weaker.",
    ["Does breaking a bond take or give energy?", "Bond breaking is endothermic.", "BE is defined for breaking, so its sign is always +."]);

  M(16, 1, "Concept", "Which relationship is correct for bonds between the same pair of atoms?",
    "Higher bond order → shorter bond → greater bond energy",
    ["Higher bond order → longer bond → greater bond energy",
     "Higher bond order → shorter bond → smaller bond energy",
     "Bond order affects bond energy but not bond length",
     "Higher bond order → longer bond → smaller bond energy"],
    "More shared electron pairs pull the nuclei closer together (shorter) and hold them more tightly (stronger). Example: C−C 154 pm, 347 kJ/mol; C=C 134 pm, 614; C≡C 121 pm, 839.",
    ["Think of C−C, C=C, C≡C.", "More shared pairs pull the atoms closer.", "Shorter bonds are stronger."]);

  M(16, 4, "Trap", "C−C bond energy = 347 kJ/mol and C=C bond energy = 614 kJ/mol. Which conclusion is correct?",
    "A C=C bond is stronger than a C−C bond but less than twice as strong, so the second shared pair adds less energy than the first",
    ["A C=C bond is exactly twice as strong as a C−C bond",
     "A C=C bond is more than twice as strong as a C−C bond",
     "A C=C bond is longer than a C−C bond, which is why it is not twice as strong",
     "A C=C bond is weaker than a C−C bond because the double bond strains the atoms"],
    "Twice a single bond would be 2 × 347 = 694 kJ/mol, but C=C is only 614 kJ/mol: stronger than C−C, yet less than double. The second shared pair contributes 614 − 347 = 267 kJ/mol, less than the first. C=C is shorter (134 pm) than C−C (154 pm), not longer.",
    ["Compute 2 × 347.", "Compare 694 with 614.", "Stronger, but less than double."]);
  chk("2x347", 2 * 347, 694); chk("614-347", 614 - 347, 267);

  {
    const L = 199 / 2 + 154 / 2;
    chk("C-Cl length", L, 176.5);
    N(16, 2, "Calculation", "The Cl−Cl bond in Cl₂ is 199 pm long and the C−C bond in ethane is 154 pm long. Using covalent radii, estimate the length of a C−Cl bond. (Enter a number in pm.)",
      "177 pm", 176.5,
      "Covalent radius = half the distance between identical bonded nuclei: r(Cl) = 199/2 = 99.5 pm; r(C) = 154/2 = 77 pm. Bond length ≈ r(C) + r(Cl) = 77 + 99.5 = 176.5 ≈ 177 pm (the measured C−Cl length is about 177 pm). Adding the two full bond lengths, or averaging them, are the usual slips.",
      ["Get each atom's covalent radius from its homonuclear bond.", "Radius = half of the X−X bond length.", "154/2 + 199/2."]);
  }

  M(16, 2, "Concept", "Why does the bond length increase from H−F to H−Cl to H−Br to H−I?",
    "The halogen atom gets larger down the group, so the distance between the bonded nuclei increases",
    ["The bond order decreases from 1 in HF to less than 1 in HI",
     "Electronegativity increases down the group",
     "H−I contains more lone pairs than H−F",
     "Heavier halogens form double bonds with hydrogen"],
    "Each is a single bond (bond order 1). Down group 7A each halogen has one more electron shell, so its covalent radius grows and the H−X distance grows: 92, 127, 141, 161 pm. Electronegativity decreases down the group; each halogen has three lone pairs in H−X; there are no H=X double bonds.",
    ["Is the bond order the same in all four?", "Bond length depends on atomic radius.", "Atomic radius increases down a group."]);

  M(16, 4, "Trap", "Covalent bonds are strong, yet substances made of small covalent molecules (such as CH₄ or I₂) melt and boil at low temperatures. Why?",
    "Melting and boiling separate whole molecules from each other, overcoming only the weak forces BETWEEN molecules; the covalent bonds stay intact",
    ["The covalent bonds in these molecules are weaker than ionic bonds, so they break on melting",
     "Melting breaks about half of the covalent bonds in the sample",
     "There are no attractions of any kind between covalent molecules",
     "These molecules contain metallic bonds, which melt easily"],
    "When CH₄ boils, CH₄ molecules move apart; no C−H bond breaks. The forces between molecules (intermolecular forces) are much weaker than covalent bonds, so little energy is needed. Some attraction must exist between molecules, or they would never condense at all. No covalent or metallic bonds break.",
    ["What actually separates when CH₄ boils - atoms or molecules?", "Distinguish bonds within molecules from forces between molecules.", "The C−H bonds are still there in the gas."]);

  M(16, 2, "Concept", "Diamond and quartz (SiO₂) are covalent substances, but they melt at very high temperatures (quartz above 1600 °C). Why?",
    "They are network covalent solids: covalent bonds link every atom to its neighbours, so melting requires breaking covalent bonds",
    ["They are ionic compounds", "They are held together by an electron sea", "Their small molecules are very heavy", "They contain hydrogen bonds between molecules"],
    "In a network covalent solid there are no separate molecules; the whole crystal is one covalently bonded network, so melting means breaking strong covalent bonds. C and SiO₂ are not ionic or metallic, they are not made of small molecules, and they contain no O−H or N−H for hydrogen bonding.",
    ["Are there separate molecules in diamond?", "Every atom is covalently bonded into one network.", "Melting requires breaking covalent bonds."]);

  M(16, 2, "Concept", "Which substance would you expect to have the LOWEST melting point?",
    "CH₄", ["NaCl", "MgO", "Cu", "SiO₂ (quartz)"],
    "CH₄ is made of small nonpolar molecules held by weak forces between molecules; it melts at −182 °C. NaCl and MgO are ionic (high melting), Cu is metallic (1085 °C), and SiO₂ is a network covalent solid (above 1600 °C).",
    ["Which substance is made of small separate molecules?", "Melting molecules apart overcomes only weak forces.", "The only molecular substance in the list."]);

  M(16, 1, "Concept", "Which statement about energy and bonds is true?",
    "Breaking a bond always absorbs energy, and forming a bond always releases energy",
    ["Breaking a bond always releases energy, and forming a bond always absorbs energy",
     "Breaking strong bonds releases energy, but breaking weak bonds absorbs energy",
     "Both breaking and forming bonds release energy",
     "Forming a bond absorbs energy only when the bond is polar"],
    "Atoms in a bond are at lower energy than separated atoms, so pulling them apart costs energy (endothermic, +BE) and letting them bond releases the same energy (exothermic, −BE). This is true for every bond, strong or weak, polar or not.",
    ["Are bonded atoms at higher or lower energy than separate atoms?", "Going up in energy absorbs energy.", "Breaking = endothermic; forming = exothermic."]);

  /* ---------------- Lesson 16: ΔH from bond energies ---------------- */
  M(16, 2, "Trap", "Which expression estimates ΔH°rxn from average bond energies?",
    "ΔH°rxn ≈ ΣBE(bonds broken in reactants) − ΣBE(bonds formed in products)",
    ["ΔH°rxn ≈ ΣBE(bonds formed in products) − ΣBE(bonds broken in reactants)",
     "ΔH°rxn ≈ ΣBE(reactant bonds) + ΣBE(product bonds)",
     "ΔH°rxn ≈ ΣnΔH°f(products) − ΣBE(reactant bonds)",
     "ΔH°rxn ≈ −ΣBE(bonds broken in reactants)"],
    "Breaking reactant bonds absorbs +ΣBE(broken); forming product bonds releases −ΣBE(formed). Adding: ΔH ≈ ΣBE(broken) − ΣBE(formed), i.e. reactants minus products. This is the REVERSE of the ΔH°f formula (products − reactants), which is exactly the trap in the first distractor. Bond energies and ΔH°f values are never mixed in one formula.",
    ["Breaking costs energy (+); forming releases energy (−).", "Add the two contributions.", "Reactant bonds minus product bonds - opposite to the ΔH°f formula."]);

  M(16, 2, "Concept", "According to bond energies, a reaction is exothermic when:",
    "the bonds formed in the products are, in total, stronger than the bonds broken in the reactants",
    ["the bonds broken in the reactants are, in total, stronger than the bonds formed",
     "more bonds are broken than are formed",
     "the products contain more double bonds than the reactants",
     "all reactants and products are gases"],
    "ΔH ≈ ΣBE(broken) − ΣBE(formed) is negative when ΣBE(formed) is larger - when weaker bonds are traded for stronger ones. The number of bonds, the number of double bonds, or the phase alone do not decide it.",
    ["Use ΔH ≈ ΣBE(broken) − ΣBE(formed).", "When is that difference negative?", "More energy released (formed) than absorbed (broken)."]);

  {
    const d = (432 + 243) - 2 * 427;
    chk("HCl", d, -179);
    chk("HCl once", 432 + 243 - 427, 248);
    chk("HCl noCl2", 432 - 2 * 427, -422);
    chk("HCl allsum", -(432 + 243 + 2 * 427), -1529);
    M(16, 2, "Calculation", "Estimate ΔH°rxn for H₂(g) + Cl₂(g) → 2HCl(g). Bond energies (kJ/mol): H−H 432, Cl−Cl 243, H−Cl 427.",
      "−179 kJ", ["+179 kJ", "+248 kJ", "−422 kJ", "−1529 kJ"],
      "Broken: 1 H−H + 1 Cl−Cl = 432 + 243 = 675 kJ. Formed: 2 H−Cl = 2 × 427 = 854 kJ. ΔH ≈ 675 − 854 = −179 kJ. +179 is formed − broken (wrong order); +248 counts only one H−Cl; −422 forgets to break Cl−Cl; −1529 adds every bond energy with a minus sign.",
      ["List the bonds broken and the bonds formed.", "Two H−Cl bonds form.", "(432 + 243) − 2(427)."]);
  }

  {
    const d = (432 + 159) - 2 * 565;
    chk("HF", d, -539);
    chk("HF once", 591 - 565, 26);
    chk("HF once rev", 565 - 591, -26);
    chk("HF sum", -(591 + 1130), -1721);
    M(16, 2, "Calculation", "Estimate ΔH°rxn for H₂(g) + F₂(g) → 2HF(g). Bond energies (kJ/mol): H−H 432, F−F 159, H−F 565.",
      "−539 kJ", ["+539 kJ", "+26 kJ", "−26 kJ", "−1721 kJ"],
      "Broken: H−H + F−F = 432 + 159 = 591 kJ. Formed: 2 H−F = 1130 kJ. ΔH ≈ 591 − 1130 = −539 kJ. +539 subtracts in the wrong order; ±26 forget the coefficient 2 on HF; −1721 adds all bond energies.",
      ["Count bonds in 2HF, not 1.", "ΔH ≈ ΣBE(broken) − ΣBE(formed).", "(432 + 159) − 2(565)."]);
  }

  {
    const d = 945 + 3 * 432 - 6 * 391;
    chk("NH3", d, -105);
    N(16, 3, "Calculation", "Estimate ΔH°rxn for N₂(g) + 3H₂(g) → 2NH₃(g) using bond energies (kJ/mol): N≡N 945, H−H 432, N−H 391. (Enter a number in kJ, with its sign.)",
      "−105 kJ", -105,
      "Broken: 1 N≡N + 3 H−H = 945 + 3(432) = 945 + 1296 = 2241 kJ. Formed: 2 NH₃ × 3 N−H each = 6 N−H = 6(391) = 2346 kJ. ΔH ≈ 2241 − 2346 = −105 kJ. Common slips: using 3 N−H instead of 6 (gives +1068), or products − reactants (+105).",
      ["Each NH₃ has three N−H bonds - and there are two NH₃.", "Broken: N≡N + 3 H−H; formed: 6 N−H.", "2241 − 2346."], { tol: 0.01 });
    chk("NH3 3NH", 2241 - 3 * 391, 1068);
  }

  N(16, 1, "Concept", "When one CH₄ molecule burns completely (CH₄ + 2O₂ → CO₂ + 2H₂O), how many C−H bonds are broken? (Enter a whole number.)",
    "4", 4,
    "Methane is a C atom single-bonded to four H atoms; in combustion every C−H bond is broken (the carbon ends up in CO₂ and all hydrogens in H₂O), so 4 C−H bonds are broken per CH₄. Counting only one C−H is a classic bond-energy error.",
    ["Draw CH₄.", "Is any C−H bond left in the products?", "Carbon has four H atoms attached."], { abs: 0 });

  {
    const br = 4 * 413 + 2 * 498, fo = 2 * 799 + 4 * 467;
    chk("CH4 comb", br - fo, -818);
    chk("CH4 rev", fo - br, 818);
    chk("CH4 1H2O", br - (2 * 799 + 2 * 467), 116);
    chk("CH4 oneCH", 413 + 2 * 498 - fo, -2057);
    chk("CH4 745", br - (2 * 745 + 4 * 467), -710);
    M(16, 4, "Calculation", "Estimate ΔH°rxn for CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g). Bond energies (kJ/mol): C−H 413, O=O 498, C=O (in CO₂) 799, O−H 467.",
      "−818 kJ", ["+818 kJ", "+116 kJ", "−2057 kJ", "−710 kJ"],
      "Broken: 4 C−H + 2 O=O = 4(413) + 2(498) = 1652 + 996 = 2648 kJ. Formed: 2 C=O (one CO₂) + 4 O−H (two H₂O) = 2(799) + 4(467) = 1598 + 1868 = 3466 kJ. ΔH ≈ 2648 − 3466 = −818 kJ. +818 is formed − broken; +116 counts O−H bonds for only one H₂O; −2057 breaks only one C−H; −710 uses the generic C=O value 745 instead of the CO₂ value given.",
      ["CH₄ has 4 C−H bonds; CO₂ has 2 C=O; each H₂O has 2 O−H.", "Broken = 4(413) + 2(498); formed = 2(799) + 4(467).", "2648 − 3466."]);
  }

  {
    const d = 2 * 432 + 498 - 4 * 467;
    chk("H2O", d, -506);
    N(16, 3, "Calculation", "Estimate ΔH°rxn for 2H₂(g) + O₂(g) → 2H₂O(g) using bond energies (kJ/mol): H−H 432, O=O 498, O−H 467. (Enter a number in kJ, with its sign.)",
      "−506 kJ", -506,
      "Broken: 2 H−H + 1 O=O = 864 + 498 = 1362 kJ. Formed: 2 H₂O × 2 O−H = 4 O−H = 1868 kJ. ΔH ≈ 1362 − 1868 = −506 kJ (for the equation as written, i.e. per 2 mol H₂O).",
      ["Two water molecules each have two O−H bonds.", "Broken: 2(432) + 498. Formed: 4(467).", "1362 − 1868."], { tol: 0.01 });
  }

  {
    const br = 4 * 413 + 614 + 432, fo = 6 * 413 + 347;
    chk("C2H4", br - fo, -127);
    chk("C2H4 single", 4 * 413 + 347 + 432 - fo, -394);
    chk("C2H4 noH2", 4 * 413 + 614 - fo, -559);
    chk("C2H4 newonly", -(347 + 2 * 413), -1173);
    M(16, 3, "Trap", "Estimate ΔH°rxn for C₂H₄(g) + H₂(g) → C₂H₆(g) (ethylene + hydrogen → ethane). Bond energies (kJ/mol): C−H 413, C−C 347, C=C 614, H−H 432.",
      "−127 kJ", ["+127 kJ", "−394 kJ", "−559 kJ", "−1173 kJ"],
      "Ethylene H₂C=CH₂ has 4 C−H + 1 C=C; ethane has 6 C−H + 1 C−C. Broken: 4(413) + 614 + 432 = 2698 kJ. Formed: 6(413) + 347 = 2825 kJ. ΔH ≈ 2698 − 2825 = −127 kJ. (Shortcut: only C=C and H−H break, only C−C and 2 C−H form: 1046 − 1173 = −127.) −394 treats the C=C as a C−C single bond; −559 forgets to break H−H; −1173 counts only the bonds formed; +127 subtracts in the wrong order.",
      ["Draw ethylene: the two carbons share a double bond.", "Broken: 4 C−H, 1 C=C, 1 H−H. Formed: 6 C−H, 1 C−C.", "2698 − 2825."]);
  }

  {
    const br = 4 * 413 + 243, fo = 3 * 413 + 339 + 427;
    chk("CH3Cl", br - fo, -110);
    chk("CH3Cl noHCl", br - (3 * 413 + 339), 317);
    chk("CH3Cl 4CH", br - (4 * 413 + 339 + 427), -523);
    chk("CH3Cl formedonly", -(339 + 427), -766);
    M(16, 3, "Calculation", "Estimate ΔH°rxn for CH₄(g) + Cl₂(g) → CH₃Cl(g) + HCl(g). Bond energies (kJ/mol): C−H 413, Cl−Cl 243, C−Cl 339, H−Cl 427.",
      "−110 kJ", ["+110 kJ", "+317 kJ", "−523 kJ", "−766 kJ"],
      "Broken: 4 C−H + Cl−Cl = 1652 + 243 = 1895 kJ. Formed: 3 C−H + C−Cl + H−Cl = 1239 + 339 + 427 = 2005 kJ. ΔH ≈ 1895 − 2005 = −110 kJ (net: one C−H and one Cl−Cl broken, one C−Cl and one H−Cl formed: 656 − 766). +317 forgets the H−Cl bond formed; −523 gives CH₃Cl four C−H bonds; −766 counts only bonds formed; +110 has the wrong order.",
      ["CH₃Cl keeps three of methane's C−H bonds.", "Net change: break C−H and Cl−Cl; form C−Cl and H−Cl.", "(413 + 243) − (339 + 427)."]);
  }

  {
    const br = 2 * 347 + 8 * 413 + 5 * 498, fo = 6 * 799 + 8 * 467;
    chk("propane", br - fo, -2042);
    chk("propane noCC", 8 * 413 + 5 * 498 - fo, -2736);
    chk("propane 3CO", br - (3 * 799 + 8 * 467), 355);
    chk("propane 4OH", br - (6 * 799 + 4 * 467), -174);
    M(16, 4, "Exam", "Estimate ΔH°rxn for the combustion of propane: C₃H₈(g) + 5O₂(g) → 3CO₂(g) + 4H₂O(g). Bond energies (kJ/mol): C−C 347, C−H 413, O=O 498, C=O (in CO₂) 799, O−H 467.",
      "−2042 kJ", ["+2042 kJ", "−2736 kJ", "+355 kJ", "−174 kJ"],
      "Propane CH₃−CH₂−CH₃ has 2 C−C and 8 C−H bonds. Broken: 2(347) + 8(413) + 5(498) = 694 + 3304 + 2490 = 6488 kJ. Formed: 3 CO₂ × 2 C=O = 6(799) = 4794; 4 H₂O × 2 O−H = 8(467) = 3736; total 8530 kJ. ΔH ≈ 6488 − 8530 = −2042 kJ. −2736 forgets the two C−C bonds; +355 counts one C=O per CO₂; −174 counts one O−H per H₂O; +2042 is formed − broken.",
      ["Draw propane's carbon chain and count C−C and C−H bonds.", "Each CO₂ has 2 C=O; each H₂O has 2 O−H.", "6488 − 8530."]);
  }

  {
    const br = 3 * 413 + 358 + 467 + 1.5 * 498, fo = 2 * 799 + 4 * 467;
    chk("MeOH", br - fo, -655);
    chk("MeOH noOH", br - 467 - fo, -1122);
    chk("MeOH noCO", br - 358 - fo, -1013);
    chk("MeOH x2", 2 * (br - fo), -1310);
    M(16, 4, "Exam", "Estimate ΔH per mole of methanol burned: CH₃OH(g) + 3/2 O₂(g) → CO₂(g) + 2H₂O(g). Bond energies (kJ/mol): C−H 413, C−O 358, O−H 467, O=O 498, C=O (in CO₂) 799.",
      "−655 kJ", ["−1122 kJ", "−1013 kJ", "+655 kJ", "−1310 kJ"],
      "Methanol H₃C−O−H has 3 C−H, 1 C−O and 1 O−H. Broken: 3(413) + 358 + 467 + 1.5(498) = 1239 + 358 + 467 + 747 = 2811 kJ. Formed: 2 C=O + 4 O−H = 1598 + 1868 = 3466 kJ. ΔH ≈ 2811 − 3466 = −655 kJ per mol CH₃OH. −1122 forgets methanol's own O−H bond; −1013 forgets the C−O bond; −1310 is for 2 mol (the equation doubled); +655 has the wrong order.",
      ["Draw methanol and list every bond, including the O−H.", "Broken: 3 C−H, C−O, O−H, 1.5 O=O. Formed: 2 C=O, 4 O−H.", "2811 − 3466."]);
  }

  {
    const br = 2 * 413 + 839 + 2 * 432, fo = 6 * 413 + 347;
    chk("C2H2", br - fo, -296);
    chk("C2H2 oneH2", 2 * 413 + 839 + 432 - fo, -728);
    chk("C2H2 3CC", 2 * 413 + 3 * 347 + 864 - fo, -94);
    chk("C2H2 614", 2 * 413 + 614 + 864 - fo, -521);
    M(16, 4, "Trap", "Estimate ΔH°rxn for C₂H₂(g) + 2H₂(g) → C₂H₆(g) (acetylene → ethane). Bond energies (kJ/mol): C−H 413, C≡C 839, C−C 347, H−H 432.",
      "−296 kJ", ["+296 kJ", "−728 kJ", "−94 kJ", "−521 kJ"],
      "Acetylene H−C≡C−H: 2 C−H + 1 C≡C. Ethane: 6 C−H + 1 C−C. Broken: 2(413) + 839 + 2(432) = 826 + 839 + 864 = 2529 kJ. Formed: 6(413) + 347 = 2825 kJ. ΔH ≈ 2529 − 2825 = −296 kJ. −728 breaks only one H−H; −94 treats C≡C as three single C−C bonds (3 × 347); −521 uses the C=C value (614) for the triple bond; +296 has the wrong order.",
      ["Two moles of H₂ are consumed.", "Use the triple-bond energy given for C≡C.", "(826 + 839 + 864) − (2478 + 347)."]);
  }

  {
    const x = (432 + 193 + 103) / 2;
    chk("HBr", x, 364);
    N(16, 4, "Calculation", "For H₂(g) + Br₂(g) → 2HBr(g), ΔH°rxn = −103 kJ. Given bond energies H−H = 432 kJ/mol and Br−Br = 193 kJ/mol, estimate the H−Br bond energy. (Enter a number in kJ/mol.)",
      "364 kJ/mol", 364,
      "ΔH ≈ ΣBE(broken) − ΣBE(formed): −103 = (432 + 193) − 2·BE(H−Br). So 2·BE(H−Br) = 625 + 103 = 728 and BE(H−Br) = 364 kJ/mol (tables list ≈ 363). Forgetting the 2 gives 728; getting the sign of ΔH backwards gives (625 − 103)/2 = 261.",
      ["Set up ΔH ≈ ΣBE(broken) − ΣBE(formed) with H−Br as the unknown.", "Two H−Br bonds form: −103 = 625 − 2x.", "x = (625 + 103)/2."], { tol: 0.01 });
    chk("HBr signerr", (625 - 103) / 2, 261);
  }

  {
    const x = (2 * 432 + 498 + 483.6) / 4;
    chk("OH from dH", x, 461.4);
    chk("OH /2", (2 * 432 + 498 + 483.6) / 2, 922.8);
    chk("OH sign", (2 * 432 + 498 - 483.6) / 4, 219.6);
    chk("OH oneH2", (432 + 498 + 483.6) / 4, 353.4);
    chk("OH noO2", (2 * 432 + 483.6) / 4, 336.9);
    M(16, 4, "Calculation", "For 2H₂(g) + O₂(g) → 2H₂O(g), ΔH° = −483.6 kJ. Using H−H = 432 kJ/mol and O=O = 498 kJ/mol, estimate the average O−H bond energy.",
      "461 kJ/mol", ["923 kJ/mol", "220 kJ/mol", "353 kJ/mol", "337 kJ/mol"],
      "−483.6 = [2(432) + 498] − 4·BE(O−H), because two H₂O molecules contain 4 O−H bonds. 4·BE(O−H) = 1362 + 483.6 = 1845.6 → BE(O−H) = 461.4 ≈ 461 kJ/mol. 923 divides by 2 (one O−H per H₂O); 220 uses +483.6; 353 breaks only one H−H; 337 forgets the O=O bond.",
      ["How many O−H bonds are in 2H₂O?", "−483.6 = 1362 − 4x.", "x = (1362 + 483.6)/4."]);
  }

  {
    const v = -393.5 + 2 * -241.8 - (-74.9);
    chk("CH4 dHf", v, -802.2);
    chk("CH4 dHf noSub", -393.5 + 2 * -241.8 - 74.9, -952.0);
    chk("CH4 dHf liquid", -393.5 + 2 * -285.8 + 74.9, -890.2);
    chk("CH4 dHf one", -393.5 - 241.8 + 74.9, -560.4);
    M(16, 3, "Calculation", "Use standard enthalpies of formation to find ΔH°rxn for CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g). ΔH°f (kJ/mol): CH₄(g) −74.9; CO₂(g) −393.5; H₂O(g) −241.8; H₂O(l) −285.8.",
      "−802.2 kJ", ["−952.0 kJ", "−890.2 kJ", "−560.4 kJ", "+802.2 kJ"],
      "ΔH° = ΣnΔH°f(products) − ΣnΔH°f(reactants) = [−393.5 + 2(−241.8)] − [−74.9 + 0] = −877.1 + 74.9 = −802.2 kJ. −952.0 adds CH₄'s value instead of subtracting it; −890.2 uses liquid water (the equation says H₂O(g)); −560.4 forgets the coefficient 2; +802.2 is reactants − products. Note the ΔH°f formula is products − reactants, while the bond-energy formula is broken (reactants) − formed (products).",
      ["Products minus reactants for ΔH°f; O₂ is an element (0).", "Use the H₂O(g) value, times 2.", "[−393.5 + 2(−241.8)] − (−74.9)."]);
  }

  M(16, 4, "Concept", "For CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g), average bond energies give ΔH ≈ −818 kJ, while ΔH°f values give −802.2 kJ. What is the main reason for the difference?",
    "Tabulated bond energies are averages over many different molecules, so the bond-energy method is only an estimate",
    ["The bond-energy method gives ΔH per mole of O₂, not per mole of CH₄",
     "ΔH°f values are for liquids, while bond energies are for gases",
     "One of the two methods must have used the wrong sign convention",
     "Bond energies apply only to ionic compounds"],
    "A C−H or O−H bond energy in a table is an AVERAGE over many compounds; the actual bond strength in a particular molecule differs a little, so the sum is approximate (here within about 2%). ΔH°f values come from measurements on the actual substances, so the ΔH°f result is the accurate one. Both results are per mole of CH₄ with gaseous water, and both signs are right.",
    ["The two answers are close but not equal - why only close?", "A bond's energy varies a little from molecule to molecule.", "Average bond energies."]);

  M(16, 4, "Trap", "A student estimates ΔH for H₂ + Cl₂ → 2HCl by calculating 2(427) − (432 + 243) = +179 kJ and concludes the reaction is endothermic. (H−H 432, Cl−Cl 243, H−Cl 427 kJ/mol.) What is the error?",
    "The subtraction is in the wrong order: ΔH ≈ ΣBE(broken) − ΣBE(formed) = 675 − 854 = −179 kJ, so the reaction is exothermic",
    ["Only one H−Cl bond should be counted, so ΔH = −248 kJ",
     "There is no error: forming bonds absorbs energy, so +179 kJ is right",
     "All the bond energies should be added: ΔH = +1529 kJ",
     "Only half the Cl−Cl energy should be used, so ΔH = +300.5 kJ"],
    "The student used products − reactants, the ΔH°f habit. With bond energies it is bonds broken (reactants) minus bonds formed (products): (432 + 243) − 2(427) = −179 kJ, exothermic, because the two H−Cl bonds formed are stronger in total than the bonds broken. Two HCl molecules form (two H−Cl bonds); forming bonds releases energy; and the whole Cl₂ molecule is broken.",
    ["Which formula has products first: ΔH°f or bond energy?", "ΔH ≈ ΣBE(broken) − ΣBE(formed).", "675 − 854."]);
  chk("HCl 300.5", 854 - (432 + 121.5), 300.5); chk("HCl -248", 427 - 675, -248);

  /* ---------------- Lesson 16: electronegativity and polarity ---------------- */
  M(16, 1, "Concept", "Which element has the highest electronegativity?",
    "F", ["O", "Cl", "N", "Cs"],
    "Electronegativity increases up a group and to the right across a period, so fluorine (top right, excluding noble gases) is the highest at 4.0. O is 3.5, N and Cl 3.0; Cs (bottom left) is among the lowest (0.7).",
    ["Where in the table is electronegativity highest?", "Up and to the right.", "Top of group 7A."]);

  M(16, 1, "Lecture", "Electronegativity (EN) is:",
    "the relative ability of a bonded atom to attract the shared electrons in a bond",
    ["the energy change when a gaseous atom gains an electron",
     "the energy needed to remove an electron from a gaseous atom",
     "the number of valence electrons in an atom",
     "the charge an atom carries in an ionic compound"],
    "EN is a relative (unitless, Pauling-scale) measure of how strongly an atom in a bond pulls the shared pair toward itself. The energy change on gaining an electron is the electron affinity; removing one is the ionization energy - both are measured for isolated gaseous atoms.",
    ["It describes an atom IN a bond.", "It is relative, not a measured energy.", "Pull on shared electrons."]);

  M(16, 2, "Concept", "What is the general trend in electronegativity in the periodic table?",
    "It increases from left to right across a period and decreases down a group",
    ["It decreases from left to right across a period and increases down a group",
     "It increases from left to right and increases down a group",
     "It decreases from left to right and decreases down a group",
     "It is roughly the same for all main-group elements"],
    "EN follows effective nuclear charge and size: across a period Z_eff rises and atoms shrink → EN rises; down a group atoms get larger and the shared electrons are farther from the nucleus → EN falls. So F is highest and Cs/Fr lowest.",
    ["Think about where F and Cs sit.", "Smaller atoms with higher Z_eff pull harder on shared electrons.", "Up and to the right = higher."]);

  M(16, 2, "Exam", "Without using a table, arrange in order of INCREASING electronegativity: O, Mg, K, C.",
    "K < Mg < C < O", ["O < C < Mg < K", "Mg < K < C < O", "K < Mg < O < C", "K < C < Mg < O"],
    "EN rises to the right and up. K (period 4, group 1A) is lowest; Mg (period 3, group 2A) is higher; C and O are period 2 nonmetals with O farther right. Values: K 0.8 < Mg 1.2 < C 2.5 < O 3.5. The reversed list is the decreasing order.",
    ["Locate each element: group and period.", "Lower-left is lowest; upper-right is highest.", "The group 1A metal in period 4 is lowest."]);

  M(16, 3, "Concept", "Which statement correctly distinguishes electronegativity (EN) from electron affinity (EA)?",
    "EN describes an atom's pull on shared electrons in a bond (a relative, unitless scale); EA is the energy change when an isolated gaseous atom gains an electron",
    ["They are the same quantity measured in different units",
     "EN is measured for isolated gaseous atoms, while EA applies only to bonded atoms",
     "EN is always negative and EA is always positive",
     "EA is a relative scale with no units, while EN is measured in kJ/mol"],
    "EN (Pauling scale, F = 4.0) is a relative number for atoms in bonds. EA is a measured energy (kJ/mol) for X(g) + e⁻ → X⁻(g), usually negative for nonmetals. They are related trends but different quantities; the other choices swap or invent their definitions and signs.",
    ["One is for atoms in a bond; one is for lone gaseous atoms.", "Which one has units of kJ/mol?", "EN: in a bond, unitless. EA: gaseous atom, energy."]);

  N(16, 1, "Calculation", "Using electronegativities O = 3.5 and H = 2.1, what is ΔEN for an O−H bond? (Enter a number.)",
    "1.4", 1.4,
    "ΔEN = |EN(O) − EN(H)| = 3.5 − 2.1 = 1.4. Between 0 and 1.7, so O−H is a polar covalent bond with O δ− and H δ+.",
    ["ΔEN is a difference, not a sum.", "Subtract the smaller EN from the larger.", "3.5 − 2.1."], { abs: 0.01 });
  chk("dEN OH", 3.5 - 2.1, 1.4, 1e-9);

  M(16, 2, "Concept", "Which bond is the MOST polar? (EN: H 2.1, F 4.0, Cl 3.0, Br 2.8, I 2.5)",
    "H−F", ["H−Cl", "H−Br", "H−I", "H−H"],
    "Bond polarity grows with ΔEN: H−F 1.9, H−Cl 0.9, H−Br 0.7, H−I 0.4, H−H 0. H−F is the most polar.",
    ["Compute ΔEN for each bond.", "Largest ΔEN = most polar.", "4.0 − 2.1."]);
  chk("dEN HF", 4.0 - 2.1, 1.9, 1e-9);

  M(16, 3, "Exam", "Rank in order of INCREASING bond polarity: N−H, F−H, C−H, O−H. (EN: C 2.5, N 3.0, O 3.5, F 4.0, H 2.1)",
    "C−H < N−H < O−H < F−H", ["F−H < O−H < N−H < C−H", "N−H < C−H < O−H < F−H", "C−H < O−H < N−H < F−H", "C−H < N−H < F−H < O−H"],
    "ΔEN values: C−H 0.4, N−H 0.9, O−H 1.4, F−H 1.9. Increasing polarity follows increasing ΔEN: C−H < N−H < O−H < F−H. The reverse list is decreasing polarity.",
    ["Compute ΔEN for each bond.", "Polarity rises with ΔEN.", "0.4, 0.9, 1.4, 1.9."]);

  M(16, 3, "Trap", "Which bond is nonpolar covalent? (EN: C 2.5, S 2.5, O 3.5, N 3.0, H 2.1, Cl 3.0, P 2.1)",
    "C−S", ["C−O", "N−H", "P−Cl", "C−Cl"],
    "C and S both have EN 2.5, so ΔEN = 0 and the electrons are shared equally: nonpolar covalent even though the atoms are different. C−O (1.0), N−H (0.9), P−Cl (0.9) and C−Cl (0.5) are polar covalent. Trap: 'different atoms always make a polar bond' is not true when the ENs are equal.",
    ["Compute ΔEN for each pair.", "Nonpolar means ΔEN ≈ 0.", "Two different elements can have the same EN."]);

  M(16, 3, "Trap", "Which bond is the LEAST polar? (EN: N 3.0, Cl 3.0, H 2.1, O 3.5, C 2.5, F 4.0)",
    "N−Cl", ["N−H", "N−O", "C−N", "Cl−F"],
    "ΔEN: N−Cl 0, N−H 0.9, N−O 0.5, C−N 0.5, Cl−F 1.0. N and Cl have the same Pauling EN (3.0), so the N−Cl bond is essentially nonpolar.",
    ["Compute ΔEN for each bond.", "The smallest ΔEN is the least polar.", "Look for two atoms with EN 3.0."]);

  M(16, 2, "Concept", "In a C−Cl bond (EN: C 2.5, Cl 3.0), which describes the partial charges?",
    "C is δ+ and Cl is δ−",
    ["C is δ− and Cl is δ+", "Both atoms are δ−", "C is +1 and Cl is −1", "There are no partial charges, because both atoms are nonmetals"],
    "The more electronegative atom (Cl, 3.0) pulls the shared pair closer and gets a partial negative charge, δ−; C (2.5) is left δ+. These are partial (fractional) charges, not full ionic +1/−1, and bonds between two different nonmetals are usually polar.",
    ["Which atom pulls harder on the shared pair?", "The more electronegative atom becomes δ−.", "Cl 3.0 vs C 2.5."]);

  M(16, 3, "Trap", "In the C−Mg bond of a Grignard reagent (EN: C 2.5, Mg 1.2), which atom carries the partial NEGATIVE charge?",
    "C, because it is more electronegative than Mg",
    ["Mg, because metals always carry δ−", "Mg, because it has more electrons than C", "Neither; a C−Mg bond is nonpolar", "C, because carbon is δ− in every bond it forms"],
    "δ− goes to the more electronegative atom. C (2.5) is more electronegative than Mg (1.2), so C is δ− and Mg δ+ (ΔEN = 1.3, polar). Metals are the δ+ end; and carbon is not always δ−: in C−Cl or C−O it is δ+.",
    ["Compare the two EN values.", "Higher EN → δ−.", "2.5 vs 1.2."]);

  M(16, 2, "Exam", "Using ΔEN (about 0 → nonpolar covalent; between 0 and about 1.7 → polar covalent; above about 1.7 → mostly ionic), classify the bonding in Cl₂, HCl and KCl. (EN: H 2.1, Cl 3.0, K 0.8)",
    "nonpolar covalent; polar covalent; ionic",
    ["polar covalent; nonpolar covalent; ionic", "nonpolar covalent; ionic; ionic", "nonpolar covalent; polar covalent; polar covalent", "ionic; polar covalent; nonpolar covalent"],
    "Cl₂: ΔEN = 0 → nonpolar covalent. HCl: 3.0 − 2.1 = 0.9 → polar covalent. KCl: 3.0 − 0.8 = 2.2 → mostly ionic.",
    ["Compute ΔEN for each.", "0, 0.9, 2.2.", "Compare each with 0 and 1.7."]);
  chk("dEN KCl", 3.0 - 0.8, 2.2, 1e-9);

  M(16, 3, "Exam", "Which pair of elements forms the bond with the GREATEST ionic character? (EN: K 0.8, F 4.0, Ca 1.0, O 3.5, Na 0.9, Cl 3.0, Li 1.0, Br 2.8, Mg 1.2, S 2.5)",
    "K and F", ["Ca and O", "Na and Cl", "Li and Br", "Mg and S"],
    "Ionic character grows with ΔEN: K−F 3.2, Ca−O 2.5, Na−Cl 2.1, Li−Br 1.8, Mg−S 1.3. KF has the largest ΔEN.",
    ["Ionic character follows ΔEN.", "Compute each difference.", "4.0 − 0.8."]);
  chk("dEN KF", 4.0 - 0.8, 3.2, 1e-9);

  M(16, 4, "Exam", "Which molecule contains the MOST polar bond, and which atom in that bond is δ−? (EN: H 2.1, C 2.5, N 3.0, O 3.5, S 2.5, Cl 3.0)",
    "H₂O; O is δ−", ["NH₃; N is δ−", "H₂S; S is δ−", "HCl; H is δ−", "CH₄; C is δ−"],
    "ΔEN: O−H 1.4, N−H 0.9, Cl−H 0.9, S−H 0.4, C−H 0.4. The O−H bond in water is the most polar, and O (higher EN) is δ−. In HCl the δ− atom would be Cl, not H.",
    ["Find the bond with the largest ΔEN.", "The δ− atom is the more electronegative one.", "3.5 − 2.1."]);

  M(16, 2, "Concept", "In Silberberg's polar-arrow notation, the arrow drawn along a polar bond:",
    "points toward the more electronegative (δ−) atom, with a small cross at its tail at the δ+ end",
    ["points toward the less electronegative atom", "points from the smaller atom toward the larger atom", "points toward whichever atom has more lone pairs, regardless of EN", "is drawn only for ionic bonds"],
    "The polar arrow shows where the shared electrons are pulled: its head is at the δ− (more electronegative) atom and the crossed tail (looking like a + sign) is at the δ+ atom, e.g. H−F with the arrow pointing to F.",
    ["Which way are the shared electrons pulled?", "The tail looks like a plus sign.", "The head points to δ−."]);

  M(16, 3, "Concept", "Chlorine in HCl is assigned an oxidation number of −1. How does that assignment use electronegativity?",
    "Both shared electrons are counted as belonging to the more electronegative atom (Cl), as if the bond were ionic",
    ["The shared electrons are split equally between H and Cl",
     "Both shared electrons are given to H because it is the smaller atom",
     "Cl is −1 simply because it has seven valence electrons",
     "The oxidation number is the formal charge, which is −1 for Cl in HCl"],
    "Oxidation numbers give ALL shared electrons to the more electronegative atom: Cl 'owns' 8 electrons vs 7 valence → −1; H owns 0 vs 1 → +1. Splitting shared electrons equally is the FORMAL-CHARGE bookkeeping, which gives 0 for both atoms in HCl.",
    ["Oxidation numbers treat each bond as if it were ionic.", "Who gets the shared pair?", "The more electronegative atom takes both electrons."]);

  M(16, 3, "Concept", "Bond polarity is described as a continuum. Which statement is correct?",
    "Every bond between atoms of different EN has some polarity; nonpolar, polar covalent and ionic are regions along a continuous scale of ΔEN",
    ["A bond is either 100% ionic or 100% covalent, with nothing in between",
     "Bonds with ΔEN above 1.7 have no shared electron density at all",
     "Any bond between two nonmetals is nonpolar",
     "Any bond to a metal is ionic, whatever the ΔEN"],
    "Bond character changes smoothly with ΔEN: ΔEN 0 shares equally, small ΔEN gives partial charges, large ΔEN approaches full transfer. Even 'ionic' compounds keep some covalent character, many nonmetal−nonmetal bonds are polar, and metal-containing bonds with small ΔEN can be largely covalent. The 1.7 boundary is a rough guide, not a wall.",
    ["Is there a sharp jump at ΔEN = 1.7?", "Think of ΔEN as a dial, not a switch.", "Continuous scale."]);

  M(16, 2, "Concept", "Where are the partial charges in a water molecule? (EN: O 3.5, H 2.1)",
    "δ− on O and δ+ on each H", ["δ+ on O and δ− on each H", "δ− on one H and δ+ on the other H", "No partial charges, because H₂O is covalent", "A full −2 charge on O and +1 on each H"],
    "O is more electronegative (3.5 vs 2.1), so each O−H bond's electrons are pulled toward O: O carries δ−, and each H carries δ+. These are partial charges in polar covalent bonds, not full ionic charges (the oxidation numbers −2/+1 are bookkeeping, not real charges).",
    ["Which atom has the higher EN?", "The more electronegative atom is δ−.", "O pulls the shared pairs."]);

  /* ---------------- Lesson 16: metallic bonding ---------------- */
  M(16, 1, "Concept", "Which best describes the electron-sea model of metallic bonding?",
    "Metal cations sit in a 'sea' of delocalized valence electrons that belong to the whole crystal",
    ["Anions are surrounded by a sea of protons", "Localized electron pairs are shared between neighbouring metal atoms", "Positive and negative ions are held in a lattice", "Neutral atoms are held only by weak attractions between them"],
    "In a metal, each atom donates its valence electrons to a shared pool spread over the whole piece; the remaining cations are held together by their attraction to this mobile electron sea. Localized shared pairs are covalent bonding; a lattice of + and − ions is ionic bonding.",
    ["Who owns the valence electrons in a metal?", "Electrons are delocalized over the whole crystal.", "Cations in an electron sea."]);

  M(16, 2, "Concept", "Why do metals conduct electricity in the solid state?",
    "Their delocalized valence electrons are free to move through the whole piece of metal",
    ["Metal cations move through the solid when a voltage is applied", "Metals contain ions that become mobile only when melted", "Metal atoms transfer electrons to impurities", "Metals have unusually high electronegativities"],
    "Conduction needs mobile charges. In a metal the valence electrons are delocalized, so they move freely even in the solid. The cations stay put; the 'conducts only when molten' description fits ionic compounds; metals have LOW electronegativities.",
    ["What moving particles carry the current in a wire?", "The electron sea is mobile.", "Delocalized electrons."]);

  M(16, 3, "Concept", "Why can metals be hammered into thin sheets, while ionic solids shatter?",
    "When layers of metal cations shift, they are still surrounded by the electron sea, so no strong repulsions develop; shifting an ionic lattice brings like charges together",
    ["Metal atoms are held by weaker forces than ions, so they can bend", "Metals contain covalent bonds that can rotate", "Ionic solids contain free electrons that make them brittle", "Hammering melts the surface of a metal but not of an ionic solid"],
    "In a metal every cation is bathed in delocalized electrons; after a layer slides, the surroundings look the same, so the metal deforms instead of breaking (malleable, ductile). In an ionic solid, sliding a layer puts + next to + and − next to −, and the repulsion cracks the crystal. Metallic bonding is not necessarily weak (many metals melt above 1000 °C).",
    ["Picture the surroundings of a cation before and after a layer slides.", "In a metal, the electron sea moves with the cations.", "No like-charge repulsions develop in a metal."]);

  M(16, 3, "Exam", "Arrange in order of INCREASING melting point: Al, Na, Mg.",
    "Na < Mg < Al", ["Al < Mg < Na", "Mg < Na < Al", "Na < Al < Mg", "Mg < Al < Na"],
    "Across period 3, each atom adds more valence electrons to the sea (Na 1, Mg 2, Al 3) and the cation gets smaller and more highly charged, so metallic bonding strengthens: Na 98 °C < Mg 649 °C < Al 660 °C.",
    ["How many valence electrons does each metal give to the sea?", "More valence electrons → stronger metallic bonding.", "1, 2, 3 valence electrons."]);

  M(16, 3, "Exam", "Which correctly ranks the melting points of the group 1A metals?",
    "Li > Na > K > Rb > Cs", ["Cs > Rb > K > Na > Li", "Na > Li > K > Rb > Cs", "Li > K > Na > Rb > Cs", "Li = Na = K = Rb = Cs, because each gives one electron to the sea"],
    "Each gives one electron to the sea, but down the group the cations get larger, so the attraction between cations and the electron sea weakens: Li 181 °C > Na 98 °C > K 64 °C > Rb 39 °C > Cs 28 °C. Same number of electrons does not mean equal bonding strength; size matters.",
    ["The number of valence electrons is the same.", "What changes down the group?", "Bigger cations → weaker metallic bonding."]);

  M(16, 4, "Concept", "Metals tend to have moderate melting points but very high boiling points (gallium melts at 30 °C but boils at 2403 °C). Why?",
    "Melting only lets the cations move past each other within the electron sea, but boiling must pull individual atoms out of the sea entirely",
    ["Metallic bonds break completely on melting and reform on boiling", "Boiling requires ionizing every metal atom", "Liquid metals form covalent molecules that must be broken to boil", "The electron sea freezes when the metal melts"],
    "On melting, the cations can slide past one another but stay inside the electron sea, so most of the metallic bonding remains (modest energy). Boiling separates atoms completely from the sea and from each other, which takes far more energy. Boiling produces gaseous atoms, not ions; liquid metals are not molecular.",
    ["What is still holding the atoms together in the liquid metal?", "Compare 'moving within the sea' with 'leaving the sea'.", "Boiling must remove atoms from the electron sea."]);

  M(16, 3, "Exam", "Which explanation best accounts for Mg (mp 649 °C) melting much higher than Na (mp 98 °C)?",
    "Each Mg atom gives two valence electrons to the sea and forms a smaller 2+ cation than Na⁺, so the metallic bonding is stronger",
    ["Mg is more electronegative, so its bonds are ionic", "Mg forms Mg₂ molecules held by covalent bonds", "Na atoms are smaller than Mg atoms, so they pack less efficiently", "Mg has a lower first ionization energy than Na"],
    "Metallic bonding strength rises with more valence electrons per atom and a smaller, more highly charged cation: Mg (2 e⁻, Mg²⁺) beats Na (1 e⁻, larger Na⁺). Mg metal is not ionic or molecular; Na atoms are larger, not smaller, than Mg atoms; and Mg's IE₁ (738) is higher than Na's (496).",
    ["Count valence electrons per atom.", "More electrons in the sea + smaller cation → stronger bonding.", "Two vs one."]);
};
