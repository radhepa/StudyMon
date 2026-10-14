/* Gym 9 - Lewis Structures and Molecular Shape (Silberberg 10.1-10.3), lessons 17-19.
   Lesson 17: Lewis structures, resonance, formal charge, octet exceptions.
   Lesson 18: VSEPR electron-group arrangements and molecular shapes.
   Lesson 19: bond angles (ideal and real) and molecular polarity. */
module.exports = function ({ M, N, chk, setCh }) {
  setCh(9);

  /* ---------------- Lesson 17: counting electrons, skeletons ---------------- */
  M(17, 1, "Lecture", "Which of these is a correct step in drawing a Lewis structure, done BEFORE any bonds or lone pairs are drawn?",
    "Count the total number of valence electrons, adjusting for any ionic charge",
    ["Place a double bond between every pair of atoms", "Put the most electronegative atom in the centre", "Assign formal charges to every atom", "Give every atom, including H, an octet"],
    "Silberberg's recipe: (1) arrange the atoms - the atom with the lower group number (lower electronegativity, never H) goes in the centre; (2) count the total valence electrons (add one per negative charge, subtract one per positive charge); (3) draw a single bond from each outer atom to the centre (2 electrons each); (4) distribute the rest as lone pairs, outer atoms first, then the centre; (5) if the centre lacks an octet, turn outer lone pairs into multiple bonds. Formal charges are checked last, H only gets 2 electrons, and the most electronegative atom usually goes on the outside.",
    ["You need to know how many electrons you have to place.", "Sum the valence electrons of all atoms.", "Then adjust for the charge of an ion."]);

  N(17, 2, "Calculation", "How many valence electrons must be shown in the Lewis structure of the sulfate ion, SO₄²⁻? (Enter a whole number.)",
    "32", 32,
    "S: 6; O: 4 × 6 = 24; the 2− charge adds 2 electrons. Total = 6 + 24 + 2 = 32. Forgetting the charge gives 30; subtracting it gives 28.",
    ["S and O are both in group 6A.", "Add 2 electrons for the 2− charge.", "6 + 4(6) + 2."], { abs: 0 });
  chk("SO4", 6 + 24 + 2, 32);

  N(17, 2, "Calculation", "How many valence electrons are in the ammonium ion, NH₄⁺? (Enter a whole number.)",
    "8", 8,
    "N: 5; H: 4 × 1 = 4; the 1+ charge REMOVES one electron: 5 + 4 − 1 = 8 (four N−H bonds, no lone pairs). Adding the charge instead gives 10.",
    ["A positive charge means electrons were lost.", "5 + 4, then adjust for +1.", "Subtract one electron."], { abs: 0 });

  M(17, 2, "Calculation", "How many valence electrons are in the chlorate ion, ClO₃⁻?",
    "26", ["25", "24", "27", "32"],
    "Cl: 7; O: 3 × 6 = 18; the 1− charge adds 1. Total 7 + 18 + 1 = 26. 25 ignores the charge; 24 subtracts it; 27 adds 2 for a 1− charge; 32 is the count for ClO₄⁻.",
    ["Cl is in group 7A, O in 6A.", "Add one electron for the 1− charge.", "7 + 18 + 1."]);

  N(17, 2, "Calculation", "How many valence electrons are in XeF₄? (Enter a whole number.)",
    "36", 36,
    "Xe (noble gas, group 8A): 8; F: 4 × 7 = 28. Total = 36. (Four Xe−F bonds use 8, the F lone pairs use 24, leaving 4 = two lone pairs on Xe.)",
    ["Xe has 8 valence electrons.", "Each F has 7.", "8 + 4(7)."], { abs: 0 });

  M(17, 2, "Calculation", "How many valence electrons are in the thiocyanate ion, SCN⁻?",
    "16", ["15", "17", "14", "18"],
    "S: 6, C: 4, N: 5, plus 1 for the 1− charge: 6 + 4 + 5 + 1 = 16. 15 ignores the charge; 14 subtracts it; 17 and 18 add extra electrons.",
    ["Group numbers: S 6A, C 4A, N 5A.", "Then the charge.", "6 + 4 + 5 + 1."]);

  M(17, 1, "Concept", "Which atom is the central atom in the Lewis structure of HCN?",
    "C", ["H", "N", "Either H or N, since both are bonded to C only once", "None; H, C and N form a triangle"],
    "H can form only one bond, so it is never central. Of C and N, the less electronegative atom (C, 2.5 vs N 3.0) goes in the centre: H−C≡N. The atoms are in a line, not a triangle.",
    ["Which atom can form only one bond?", "The central atom is usually the least electronegative (never H).", "C is less electronegative than N."]);

  M(17, 1, "Concept", "In a Lewis structure, the central atom is usually:",
    "the atom with the lowest electronegativity, but never H",
    ["the atom with the highest electronegativity", "hydrogen, whenever it is present", "the atom with the most valence electrons", "the heaviest atom, even if it is H"],
    "The central atom shares electrons with several neighbours, so it is normally the least electronegative atom (e.g. S in SO₃, C in CO₂, Cl in ClO₃⁻). H forms only one bond and is always terminal. The most electronegative atoms (F, O) usually sit on the outside.",
    ["Which atoms are most often on the outside: F and O, or C and S?", "The central atom shares its electrons with several partners.", "Lowest EN, never H."]);

  M(17, 2, "Concept", "Which is the correct Lewis structure of N₂?",
    "N≡N with one lone pair on each N (10 valence electrons)",
    ["N=N with two lone pairs on each N", "N−N with three lone pairs on each N", "N≡N with no lone pairs", "N=N with one lone pair on each N"],
    "N₂ has 2 × 5 = 10 valence electrons. A triple bond (6) plus one lone pair on each N (4) uses all 10 and gives each N an octet. N=N with two lone pairs each needs 12 electrons; N−N with three each needs 14; N≡N alone uses only 6; N=N with one pair each uses 8 and leaves each N with 6.",
    ["Count the valence electrons: 2 × 5.", "Each N needs an octet using only one partner.", "Three shared pairs plus one lone pair each."]);

  M(17, 2, "Concept", "Which is the correct Lewis structure of CO₂ (16 valence electrons)?",
    "O=C=O, with two lone pairs on each O and none on C",
    ["O−C−O, with three lone pairs on each O and none on C", "O=C=O, with two lone pairs on each O and one lone pair on C", "O−C−O, with three lone pairs on each O and two lone pairs on C", "C=O=O, with two lone pairs on each end atom"],
    "C (least electronegative) is central. Single bonds + O octets use 4 + 12 = 16 electrons, but C has only 4 → move a lone pair from each O into a bond: O=C=O, two lone pairs on each O, C with an octet, 16 electrons. O−C−O leaves C with 4 electrons; adding lone pairs to C needs 18 or 20 electrons; O is not the central atom.",
    ["C goes in the centre.", "If the centre lacks an octet, make multiple bonds.", "Two double bonds."]);

  M(17, 2, "Concept", "In formaldehyde, H₂CO (C is the central atom), which bond is a double bond?",
    "The C=O bond", ["One of the C−H bonds", "Both C−H bonds", "None; all bonds are single and C has a lone pair", "A bond between the two H atoms"],
    "H₂CO has 4 + 2 + 6 = 12 valence electrons. Single bonds C−H, C−H, C−O (6) + three lone pairs on O (6) = 12, but C has only 6 → one O lone pair becomes a second C−O bond: C=O with two lone pairs on O. H can hold only 2 electrons, so it never forms a double bond, and the H atoms are not bonded to each other.",
    ["H can only ever form one single bond.", "Count: 12 valence electrons; check C's octet.", "Make the multiple bond to O."]);

  M(17, 1, "Concept", "How many electron pairs are shared between the two carbon atoms in ethylene, C₂H₄?",
    "2", ["1", "3", "4", "0"],
    "C₂H₄ has 2(4) + 4(1) = 12 valence electrons. Five single bonds (C−C and four C−H) use 10, leaving 2; giving each C an octet requires a C=C double bond: H₂C=CH₂. Two shared pairs between the carbons.",
    ["Count valence electrons: 12.", "Each C must end up with an octet.", "A double bond."]);

  M(17, 3, "Concept", "How many lone pairs are in the Lewis structure of HCN?",
    "1 (on N)", ["0", "2 (one on C and one on N)", "3 (all on N)", "4"],
    "HCN: 1 + 4 + 5 = 10 valence electrons. H−C≡N uses 8 in bonds (one single + one triple), leaving 2 = one lone pair on N. C already has an octet (4 bonding pairs), so it has no lone pair. Three pairs on N would fit a single C−N bond, which leaves C short.",
    ["Draw H−C≡N.", "10 electrons total; subtract the bonding electrons.", "10 − 8 = 2."]);

  M(17, 2, "Concept", "Which is the correct Lewis structure of carbon monoxide, CO?",
    "C≡O with one lone pair on C and one lone pair on O",
    ["C=O with two lone pairs on O and one lone pair on C", "C=O with two lone pairs on each atom", "C−O with three lone pairs on O and one lone pair on C", "C≡O with no lone pairs"],
    "CO has 4 + 6 = 10 valence electrons. :C≡O: uses 6 bonding + 4 lone-pair electrons and gives both atoms an octet. C=O with 2 + 1 lone pairs uses 10 but leaves C with only 6 electrons; C=O with two pairs each needs 12; C−O with 3 + 1 pairs leaves C with 4; C≡O alone uses only 6.",
    ["10 valence electrons.", "Both atoms need octets, sharing as much as possible.", "Same pattern as N₂."]);

  N(17, 3, "Calculation", "How many lone pairs are there in total (on all atoms) in the Lewis structure of CO₂? (Enter a whole number.)",
    "4", 4,
    "O=C=O: 16 valence electrons; 8 are in the two double bonds; the remaining 8 = 4 lone pairs, two on each O and none on C.",
    ["Draw O=C=O.", "Subtract the bonding electrons from 16.", "8 lone-pair electrons."], { abs: 0 });

  N(17, 3, "Calculation", "How many lone pairs are there in total (on all atoms) in XeF₄? (Enter a whole number.)",
    "14", 14,
    "XeF₄: 36 valence electrons. Four Xe−F bonds use 8 → 28 left = 14 lone pairs: three on each F (12) and two on Xe. Counting only Xe's lone pairs gives 2; only F's gives 12.",
    ["Total valence electrons: 8 + 28.", "Subtract 8 bonding electrons and divide by 2.", "12 on the F atoms + 2 on Xe."], { abs: 0 });
  chk("XeF4 LP", (36 - 8) / 2, 14);

  /* ---------------- Lesson 17: resonance ---------------- */
  M(17, 1, "Concept", "What does resonance mean?",
    "Two or more valid Lewis structures differ only in where electrons are placed, and the real species is an average (hybrid) of them",
    ["The molecule rapidly flips back and forth between the structures", "The structures differ in how the atoms are connected", "Different compounds share the same molecular formula", "Every atom in each structure has zero formal charge"],
    "Resonance structures have the same atom positions but different electron (bond and lone-pair) placements. The real molecule does not flip between them: it is one blended structure, e.g. NO₃⁻ has three identical N−O bonds. Different connectivity means isomers, not resonance; resonance forms can carry formal charges.",
    ["Do the atoms move between resonance structures?", "Only the electrons are placed differently.", "The real thing is a blend, all the time."]);

  M(17, 2, "Concept", "How many equivalent resonance structures can be drawn for the nitrate ion, NO₃⁻ (octets, N central)?",
    "3", ["1", "2", "4", "6"],
    "NO₃⁻ (24 electrons) has one N=O and two N−O bonds. The double bond can be placed on any of the three O atoms, giving three equivalent resonance structures.",
    ["How many N−O bonds are double in one structure?", "How many places can that double bond go?", "Three O atoms."]);

  M(17, 3, "Concept", "What is the N−O bond order in the nitrate ion, NO₃⁻?",
    "4/3 (about 1.33)", ["1", "2", "3/2 (1.5)", "3"],
    "Each resonance structure has one double and two single bonds: 4 shared pairs spread over 3 N−O links → average bond order 4/3 ≈ 1.33. 3/2 is the value for NO₂⁻ or O₃ (3 pairs over 2 links).",
    ["Count the total shared pairs between N and the O atoms in one structure.", "Divide by the number of N−O bonds.", "(2 + 1 + 1)/3."]);

  M(17, 3, "Concept", "Which statement about the C−O bonds in the carbonate ion, CO₃²⁻, is correct?",
    "All three are identical, each with a bond order of 4/3",
    ["One is a double bond (shorter) and two are single bonds (longer)", "All three are double bonds", "Two have bond order 3/2 and one has bond order 1", "They change between single and double many times a second"],
    "CO₃²⁻ (24 electrons) has three resonance structures, each with one C=O and two C−O. The hybrid has three identical C−O bonds, bond order (2 + 1 + 1)/3 = 4/3, all the same length. One drawn structure is not the real ion, and the ion does not flip.",
    ["How many resonance structures are there?", "Average the bond orders over the three bonds.", "4 shared pairs over 3 bonds."]);

  N(17, 3, "Calculation", "What is the average O−O bond order in ozone, O₃? (Enter a number.)",
    "1.5", 1.5,
    "O₃ (18 electrons) has two resonance structures, O=O−O and O−O=O. Each O−O link is double in one and single in the other: 3 shared pairs over 2 bonds → bond order 1.5. Both O−O bonds are identical (128 pm).",
    ["Draw both resonance structures.", "Count the shared pairs and divide by the number of O−O bonds.", "(2 + 1)/2."], { abs: 0.01 });

  M(17, 2, "Concept", "Which species has two equivalent resonance structures, giving an average bond order of 1.5 between the central atom and each O?",
    "NO₂⁻", ["NO₃⁻", "CO₃²⁻", "CO₂", "H₂O"],
    "NO₂⁻ (18 electrons): O=N−O and O−N=O; 3 shared pairs over 2 N−O bonds → 1.5. NO₃⁻ and CO₃²⁻ have three resonance structures and bond order 4/3; CO₂ has two full double bonds (order 2); H₂O has no resonance.",
    ["Look for one double bond shared between two equivalent positions.", "Bond order = shared pairs ÷ number of bonds.", "3 pairs over 2 bonds."]);

  M(17, 3, "Concept", "In the formate ion, HCO₂⁻ (C bonded to H and to both O atoms), how do the two C−O bonds compare?",
    "They are equal in length, each with a bond order of 1.5",
    ["One is C=O (shorter) and the other is C−O (longer)", "Both are double bonds", "Both are single bonds and C carries a lone pair", "Both have a bond order of 4/3"],
    "HCO₂⁻ has 1 + 4 + 12 + 1 = 18 valence electrons. Each structure has one C=O and one C−O(⁻), and the double bond can sit on either O → two resonance structures. The hybrid has two identical C−O bonds of order 3/2. 4/3 would need three equivalent O atoms, as in carbonate.",
    ["Draw one structure, then move the double bond.", "Two equivalent structures.", "3 shared pairs over 2 C−O bonds."]);

  M(17, 3, "Concept", "Which statement about the carbon-carbon bonds in benzene, C₆H₆, is correct?",
    "All six are identical, with a bond order of 1.5 (between single and double)",
    ["Three short C=C bonds alternate with three long C−C bonds", "All six are double bonds", "All six are single bonds", "All six have a bond order of 4/3"],
    "Benzene has two resonance structures with alternating single and double bonds around the ring. Each C−C link is double in one and single in the other, so all six bonds are identical with bond order 1.5 (139 pm, between C−C 154 and C=C 134 pm). The alternating picture is only one resonance form.",
    ["Draw the two alternating-bond structures.", "Each ring bond is single in one, double in the other.", "Average of 1 and 2."]);

  M(17, 4, "Exam", "Arrange in order of INCREASING carbon-oxygen bond length: CO₃²⁻, CO, CH₃OH, CO₂.",
    "CO < CO₂ < CO₃²⁻ < CH₃OH", ["CH₃OH < CO₃²⁻ < CO₂ < CO", "CO < CO₃²⁻ < CO₂ < CH₃OH", "CO₂ < CO < CO₃²⁻ < CH₃OH", "CO < CO₂ < CH₃OH < CO₃²⁻"],
    "Find each C−O bond order: CO is C≡O (3); CO₂ has two C=O (2); CO₃²⁻ resonance gives 4/3; CH₃OH has a C−O single bond (1). Higher bond order → shorter bond, so CO < CO₂ < CO₃²⁻ < CH₃OH. Treating carbonate as having a full double bond puts it before CO₂.",
    ["Draw each Lewis structure and find the C−O bond order.", "Remember carbonate's bond order is a resonance average.", "Orders 3, 2, 4/3, 1."]);

  M(17, 4, "Exam", "Arrange in order of DECREASING nitrogen-oxygen bond length: NO⁺, NO₃⁻, NO₂⁻, NO₂⁺ (O=N=O).",
    "NO₃⁻ > NO₂⁻ > NO₂⁺ > NO⁺", ["NO⁺ > NO₂⁺ > NO₂⁻ > NO₃⁻", "NO₂⁻ > NO₃⁻ > NO₂⁺ > NO⁺", "NO₃⁻ > NO₂⁺ > NO₂⁻ > NO⁺", "NO₃⁻ > NO₂⁻ > NO⁺ > NO₂⁺"],
    "Bond orders: NO⁺ (10 e⁻, like N₂) N≡O = 3; NO₂⁺ (16 e⁻, like CO₂) two N=O = 2; NO₂⁻ resonance 3/2; NO₃⁻ resonance 4/3. Longest bond = lowest order: NO₃⁻ (1.33) > NO₂⁻ (1.5) > NO₂⁺ (2) > NO⁺ (3).",
    ["Count valence electrons for each species to get its Lewis structure.", "Resonance averages: 4/3 for NO₃⁻, 3/2 for NO₂⁻.", "Lowest bond order = longest bond."]);

  /* ---------------- Lesson 17: formal charge ---------------- */
  M(17, 1, "Lecture", "How is the formal charge (FC) of an atom in a Lewis structure calculated?",
    "FC = valence electrons − (lone-pair electrons + ½ bonding electrons)",
    ["FC = valence electrons − (lone-pair electrons + all bonding electrons)", "FC = valence electrons − number of bonds", "FC = (lone-pair electrons + ½ bonding electrons) − valence electrons", "FC = number of bonds − number of lone pairs"],
    "Formal charge assumes bonding electrons are shared equally: the atom 'owns' all its lone-pair electrons and half of each bonding pair. FC = V − (L + ½B). Taking all bonding electrons is the oxidation-number idea gone wrong; reversing the subtraction flips the sign.",
    ["The atom owns its lone pairs fully.", "Bonding electrons are split equally between the two atoms.", "V − (L + ½B)."]);

  M(17, 2, "Calculation", "What is the formal charge on N in the ammonium ion, NH₄⁺?",
    "+1", ["0", "−1", "+4", "−3"],
    "N has 5 valence electrons; in NH₄⁺ it has 0 lone-pair electrons and 4 bonds (8 bonding electrons). FC = 5 − (0 + ½ × 8) = 5 − 4 = +1. Each H: 1 − (0 + 1) = 0. Sum = +1, the ion's charge. −3 is nitrogen's oxidation number, not its formal charge.",
    ["N in NH₄⁺ has four bonds and no lone pairs.", "FC = 5 − (0 + 4).", "Formal charges must add to +1."]);

  N(17, 2, "Calculation", "What is the formal charge on O in the hydronium ion, H₃O⁺ (three O−H bonds, one lone pair on O)? (Enter a number with its sign.)",
    "+1", 1,
    "O: 6 valence electrons; 2 lone-pair electrons; 3 bonds = 6 bonding electrons. FC = 6 − (2 + 3) = +1. Each H is 0, so the formal charges add to +1, the charge of the ion.",
    ["FC = V − (L + ½B).", "L = 2, B = 6 for this O.", "6 − (2 + 3)."], { abs: 0 });

  M(17, 3, "Calculation", "For the ozone structure O=O−O (left O double-bonded with two lone pairs, central O with one lone pair, right O single-bonded with three lone pairs), what are the formal charges (left, centre, right)?",
    "0, +1, −1", ["0, 0, 0", "0, −1, +1", "+1, 0, −1", "0, +2, −2"],
    "Left O: 6 − (4 + 2) = 0. Centre O: 6 − (2 + 3) = +1. Right O: 6 − (6 + 1) = −1. Sum = 0 for neutral O₃. Writing 0, 0, 0 forgets that the central O has three bonds and a lone pair.",
    ["Use FC = V − (L + ½B) for each O.", "The central O has 3 bonds and 1 lone pair.", "Centre: 6 − (2 + 3)."]);

  N(17, 3, "Calculation", "In the Lewis structure of SO₄²⁻ drawn with four S−O single bonds (S has an octet, each O has three lone pairs), what is the formal charge on S? (Enter a number with its sign.)",
    "+2", 2,
    "S: 6 valence electrons, 0 lone-pair electrons, 4 bonds (8 bonding electrons): FC = 6 − (0 + 4) = +2. Each O: 6 − (6 + 1) = −1. Check: +2 + 4(−1) = −2, the ion's charge.",
    ["S has four bonds and no lone pairs here.", "FC = 6 − (0 + ½ × 8).", "Check the sum equals −2."], { abs: 0 });

  M(17, 4, "Exam", "For SO₄²⁻, compare the structure with four S−O single bonds (S has an octet) with the structure with two S=O and two S−O bonds (12 electrons around S). Based on formal charges alone, which structure is preferred, and why?",
    "The one with two S=O bonds: S 0, the two double-bonded O 0, the two single-bonded O −1, closer to zero than S +2 and four O −1",
    ["The all-single structure, because S can never exceed an octet", "The all-single structure, because its formal charges add to −2 and the other's do not", "The two-double structure, because every atom in it has zero formal charge", "Neither, because both have the same number of electrons"],
    "All-single: S = 6 − 4 = +2; each O = −1. Two S=O: S = 6 − (0 + 6) = 0; each S=O oxygen = 6 − (4 + 2) = 0; each S−O oxygen = −1. Both sum to −2, but the second has smaller formal charges, so the formal-charge rule prefers it (S, in period 3, can expand its octet). Two O atoms still carry −1, so not every FC is zero. (Whether S really holds 12 electrons is debated - modern calculations favour the octet structure with very polar S−O bonds - which is why the question says 'based on formal charges alone'; by that rule, the textbook's, the two-double-bond structure wins.)",
    ["Calculate the formal charge of S in each structure.", "Both sets add up to −2; which set is closer to zero?", "S: +2 vs 0."]);

  M(17, 4, "Trap", "For carbon monoxide, :C≡O:, what are the formal charges of C and O, and how do they compare with the oxidation numbers?",
    "Formal charges C −1, O +1; oxidation numbers C +2, O −2",
    ["Formal charges C +2, O −2; oxidation numbers C −1, O +1", "Formal charges C 0, O 0; oxidation numbers C +2, O −2", "Formal charges and oxidation numbers are both C +2, O −2", "Formal charges C +1, O −1; oxidation numbers C +2, O −2"],
    "Formal charge (bonding electrons shared equally): C = 4 − (2 + 3) = −1; O = 6 − (2 + 3) = +1. Oxidation number (all bonding electrons given to the more electronegative O): O 'owns' 8 → 6 − 8 = −2; C owns 2 → 4 − 2 = +2. The two bookkeeping methods differ, and here the formal charges even put the negative charge on the less electronegative atom.",
    ["Formal charge splits bonding electrons equally.", "Oxidation numbers give both electrons of each bond to the more electronegative atom.", "C: 4 − (2 + 3); O as an oxide: −2."]);

  M(17, 4, "Exam", "Three resonance structures with octets can be drawn for the cyanate ion, OCN⁻ (C central): [O=C=N]⁻, [O≡C−N]⁻ and [O−C≡N]⁻. Judged by the formal-charge rules, which contributes MOST to the real ion?",
    "[O−C≡N]⁻, with formal charges O −1, C 0, N 0",
    ["[O=C=N]⁻, with formal charges O 0, C 0, N −1", "[O≡C−N]⁻, with formal charges O +1, C 0, N −2", "[O=C=N]⁻, because two double bonds are always better than one triple bond", "All three contribute equally"],
    "Formal charges: O−C≡N: O 6 − (6 + 1) = −1, C 0, N 5 − (2 + 3) = 0. O=C=N: O 0, C 0, N 5 − (4 + 2) = −1. O≡C−N: O +1, N −2 (worst). The first two both have small charges, but the rule puts the negative charge on the more electronegative atom, O (3.5 vs N 3.0), so [O−C≡N]⁻ is best. The structures are not equivalent, so they do not contribute equally.",
    ["Compute formal charges in each structure.", "Smallest charges first; then negative charge on the more electronegative atom.", "O is more electronegative than N."]);

  M(17, 4, "Exam", "N₂O has the skeleton N−N−O. According to the formal-charge rules (charges closest to zero; any negative formal charge on the more electronegative atom), which resonance structure is MOST important?",
    "N≡N−O, with formal charges 0, +1, −1", ["N=N=O, with formal charges −1, +1, 0", "N−N≡O, with formal charges −2, +1, +1", "N=N=O, with formal charges 0, 0, 0", "N≡N−O, with formal charges 0, 0, 0"],
    "16 valence electrons. N≡N−O (lone pairs 1, 0, 3): terminal N 5 − (2 + 3) = 0; central N 5 − (0 + 4) = +1; O 6 − (6 + 1) = −1. N=N=O (2, 0, 2): −1, +1, 0. N−N≡O (3, 0, 1): −2, +1, +1. The first two have equally small charges, but N≡N−O places the −1 on O, the more electronegative atom, so it is the most important. The central N always has four bonds and no lone pair, so its formal charge is +1, never 0. (The measured bond lengths show N=N=O also contributes substantially; the formal-charge rules rank N≡N−O first, and that ranking is what is asked.)",
    ["Compute formal charges for each structure.", "Smallest charges, then negative on the most electronegative atom.", "The −1 belongs on O."]);

  M(17, 4, "Exam", "Apply the formal-charge rules (formal charges as close to zero as possible; any negative formal charge on the more electronegative atom; EN: S 2.5, N 3.0) to the thiocyanate ion, SCN⁻ (C central, octets on all atoms). Which resonance structure do these rules rank as most important?",
    "[S=C=N]⁻, with formal charges S 0, C 0, N −1",
    ["[S−C≡N]⁻, with formal charges S −1, C 0, N 0", "[S≡C−N]⁻, with formal charges S +1, C 0, N −2", "[S=C=N]⁻, with formal charges S −1, C 0, N 0", "[S−C≡N]⁻, with formal charges S 0, C 0, N −1"],
    "16 electrons. S=C=N (2 lone pairs on S and N): S 6 − (4 + 2) = 0, C 0, N 5 − (4 + 2) = −1. S−C≡N (3 on S, 1 on N): S 6 − (6 + 1) = −1, C 0, N 0. S≡C−N: S +1, N −2. The first two both have one −1; the rule puts it on the more electronegative atom, N, so [S=C=N]⁻ is preferred. The last two choices have the formal charges calculated wrongly. (Real SCN⁻ also has a large [S−C≡N]⁻ contribution - its measured C−N bond is nearly a triple bond - so this is a question about what the formal-charge rules predict, which is how Silberberg-style problems ask it.)",
    ["Find the two structures with only one nonzero formal charge.", "Which atom should hold the −1?", "N (3.0) is more electronegative than S (2.5)."]);

  M(17, 3, "Concept", "The atoms in N₂O could be arranged N−N−O or N−O−N. Which arrangement is better, and why?",
    "N−N−O, because N−O−N would put a large positive formal charge (+2) on the most electronegative atom, O",
    ["N−O−N, because the most electronegative atom always goes in the centre", "N−O−N, because it is symmetric", "Both are equally good, because both have 16 valence electrons", "N−N−O, because an N−N bond is stronger than an N−O bond"],
    "For N=O=N, the central O has four bonds and no lone pair: FC = 6 − (0 + 4) = +2, and each N is −1. A +2 charge on the most electronegative atom is very unfavourable. N−N−O allows structures with charges of only 0, +1, −1. The central atom is usually the LEAST electronegative; symmetry and electron count do not decide it.",
    ["Try formal charges for the O-centred skeleton.", "Central O with four bonds and no lone pairs.", "FC(O) = 6 − 4."]);

  M(17, 2, "Concept", "Which statement about formal charges and choosing the most important resonance structure is FALSE?",
    "Positive formal charges should be placed on the most electronegative atom",
    ["Smaller formal charges (closer to zero) are preferable", "A negative formal charge should be on the more electronegative atom", "Formal charges must add up to the overall charge of the species", "Like charges on adjacent atoms are not desirable"],
    "The rules: formal charges closest to zero; negative formal charges on the more electronegative atoms; same-sign charges on neighbouring atoms are unfavourable; and the formal charges always add up to the species' charge. Positive charge on the most electronegative atom is the OPPOSITE of what is preferred.",
    ["Which way should a negative charge go?", "More electronegative atoms prefer extra electron density.", "Positive charge on the most EN atom is bad."]);

  M(17, 3, "Calculation", "In the chlorate ion, ClO₃⁻, drawn with three Cl−O single bonds and octets on every atom, what is the formal charge on Cl?",
    "+2", ["+1", "0", "−1", "+3"],
    "26 electrons: three Cl−O bonds (6) + three lone pairs on each O (18) + one lone pair on Cl (2). FC(Cl) = 7 − (2 + 3) = +2; each O = 6 − (6 + 1) = −1. Sum: +2 − 3 = −1 ✓. Giving Cl no lone pair gives +3 (and uses only 24 electrons); −1 confuses the ion's overall charge with the Cl atom's formal charge.",
    ["Count 26 valence electrons and place them.", "Cl ends with three bonds and one lone pair.", "7 − (2 + 3)."]);

  M(17, 4, "Exam", "Which statement about the nitrate ion, NO₃⁻, is FALSE?",
    "One N−O bond is shorter than the other two",
    ["It has 24 valence electrons", "The formal charge on N is +1 in each resonance structure", "Each N−O bond has a bond order of 4/3", "It has three equivalent resonance structures"],
    "24 electrons (5 + 18 + 1); in every resonance structure N has four bonds and no lone pair, FC = 5 − 4 = +1; three equivalent structures; bond order 4/3. Because of resonance all three N−O bonds are the SAME length, so 'one bond is shorter' is false - it describes a single resonance structure, not the real ion.",
    ["Check each statement against the resonance hybrid.", "Does the real ion have a distinct double bond?", "All three bonds are equal."]);

  /* ---------------- Lesson 17: octet exceptions, σ/π ---------------- */
  M(17, 1, "Concept", "How many valence electrons surround boron in BF₃?",
    "6", ["8", "4", "10", "3"],
    "BF₃ has 3 + 21 = 24 electrons: three B−F single bonds (6) and three lone pairs on each F (18). B has only 6 electrons around it - an electron-deficient atom. (A B=F double bond would put a + formal charge on F, the most electronegative atom.)",
    ["Draw three B−F single bonds.", "Boron has no lone pairs left.", "3 bonds × 2 electrons."]);

  M(17, 2, "Concept", "Which species has an electron-deficient central atom with only FOUR valence electrons around it?",
    "BeCl₂", ["BF₃", "CO₂", "NO", "H₂O"],
    "BeCl₂: 2 + 14 = 16 electrons; two Be−Cl bonds and three lone pairs on each Cl, so Be has only 4 electrons. In BF₃, B has 6; C in CO₂ and O in H₂O have octets; NO is an odd-electron molecule.",
    ["Be has only 2 valence electrons.", "Each Be−Cl bond gives Be 2 electrons.", "2 bonds = 4 electrons."]);

  M(17, 2, "Concept", "Which molecule has an odd number of valence electrons (a free radical)?",
    "NO₂", ["CO₂", "SO₂", "O₃", "NO₂⁻"],
    "NO₂: 5 + 2(6) = 17 electrons, odd, so one atom must have an unpaired electron. CO₂ 16, SO₂ 18, O₃ 18 and NO₂⁻ 18 are all even.",
    ["Add up the valence electrons for each.", "N contributes an odd number (5).", "5 + 12 = 17."]);

  M(17, 3, "Concept", "Which pair are BOTH odd-electron molecules?",
    "NO and ClO₂", ["NO and CO", "NO₂ and NO₂⁻", "ClO₂ and SO₂", "NO⁺ and CO"],
    "NO: 5 + 6 = 11 (odd). ClO₂: 7 + 12 = 19 (odd). CO 10, NO₂⁻ 18, SO₂ 18 and NO⁺ 10 are even, so each wrong pair contains at least one even-electron species.",
    ["Count valence electrons for each species.", "N and Cl each contribute an odd number.", "11 and 19."]);

  M(17, 3, "Concept", "Why can phosphorus form PCl₅ while nitrogen cannot form NCl₅?",
    "P is in period 3 and can use empty d orbitals to hold more than eight electrons; N, in period 2, has no d orbitals in its valence shell",
    ["N is more electronegative than P", "N atoms are larger than P atoms", "P has more valence electrons than N", "NCl₅ would have an odd number of electrons"],
    "An expanded valence shell (10 or 12 electrons) is possible only for a central atom in period 3 or below, which has empty d orbitals available (and is larger). N is in period 2 (only 2s and 2p), so it is limited to an octet. P and N both have 5 valence electrons; N is smaller, not larger; NCl₅ would have 40 electrons (even).",
    ["Which period is each element in?", "Expanded octets need a period-3-or-lower central atom.", "Period 2 atoms have no d orbitals."]);

  M(17, 2, "Concept", "How many electrons surround the central S atom in SF₆?",
    "12", ["8", "6", "10", "14"],
    "Six S−F single bonds × 2 electrons = 12 electrons around S: an expanded octet (possible for period 3 S). S has no lone pair (48 electrons: 12 in bonds + 36 in F lone pairs).",
    ["Count the S−F bonds.", "Each bond puts 2 electrons around S.", "Six bonds × 2 electrons each."]);

  M(17, 2, "Concept", "In which species does the central atom have an expanded octet (more than 8 electrons)?",
    "I in I₃⁻", ["N in NH₄⁺", "B in BF₃", "C in CO₃²⁻", "O in H₂O"],
    "I₃⁻ (22 electrons): the central I has 2 bonds and 3 lone pairs = 10 electrons. N in NH₄⁺ and C in CO₃²⁻ and O in H₂O have octets; B in BF₃ has only 6.",
    ["Expanded octets need a central atom from period 3 or below.", "Draw I₃⁻ and count around the middle I.", "2 bonds + 3 lone pairs."]);

  N(17, 3, "Calculation", "In XeF₂ (22 valence electrons), how many lone pairs are on the central Xe atom? (Enter a whole number.)",
    "3", 3,
    "Two Xe−F bonds use 4 electrons; three lone pairs on each F use 12; 22 − 16 = 6 electrons = 3 lone pairs on Xe (10 electrons around Xe). This makes XeF₂ AX₂E₃.",
    ["Place bonds and the F lone pairs first.", "22 − 4 − 12 = ?", "6 electrons left on Xe."], { abs: 0 });

  M(17, 4, "Trap", "A student draws ClF₃ with three Cl−F single bonds, three lone pairs on each F, and one lone pair on Cl, then stops because Cl has an octet. What is wrong?",
    "Only 26 of the 28 valence electrons have been placed; the last two go on Cl as a second lone pair, giving Cl 10 electrons",
    ["Nothing; Cl can never have more than an octet", "Cl should form a double bond to one F atom", "Each F should have only two lone pairs", "Cl should have three lone pairs"],
    "ClF₃ has 7 + 21 = 28 valence electrons. Bonds (6) + F lone pairs (18) + one Cl lone pair (2) = 26, so 2 electrons are still unplaced; they go on the central Cl, which (period 3) can expand: 3 bonds + 2 lone pairs = 10 electrons. That is AX₃E₂ → T-shaped. A Cl=F bond would put a + formal charge on F; F needs three lone pairs; three lone pairs on Cl would need 30 electrons.",
    ["Count the total valence electrons first.", "Have all 28 been used?", "Leftover electrons go on the central atom."]);

  M(17, 2, "Concept", "How many σ (sigma) and π (pi) bonds are in HCN?",
    "2 σ and 2 π", ["3 σ and 1 π", "2 σ and 1 π", "1 σ and 3 π", "4 σ and 0 π"],
    "H−C≡N: every single bond is one σ bond; a triple bond is one σ + two π. So H−C (1 σ) + C≡N (1 σ + 2 π) = 2 σ and 2 π. Counting the triple bond as three σ (or as 3 π) is the usual error.",
    ["Draw H−C≡N.", "Single = 1σ; double = 1σ + 1π; triple = 1σ + 2π.", "One single bond and one triple bond."]);

  N(17, 3, "Calculation", "How many σ (sigma) bonds are in ethylene, C₂H₄? (Enter a whole number.)",
    "5", 5,
    "H₂C=CH₂ has four C−H single bonds (4 σ) and one C=C double bond (1 σ + 1 π). Total σ = 5 (and 1 π). Counting the double bond as 2 σ gives 6.",
    ["Draw H₂C=CH₂.", "Every bond contains exactly one σ bond.", "4 C−H + 1 from C=C."], { abs: 0 });

  /* ---------------- Lesson 18: VSEPR ---------------- */
  M(18, 1, "Lecture", "In VSEPR theory, what counts as ONE electron group around a central atom?",
    "Each lone pair, and each bond whether single, double or triple",
    ["Only single bonds; a double bond counts as two groups", "Only bonds; lone pairs are ignored", "Only lone pairs", "Each individual electron"],
    "VSEPR counts regions of electron density: a lone pair is one group, and a single, double or triple bond to one atom is also just one group (it points in one direction). So CO₂ has 2 groups around C, and SO₂ has 3 around S (two bonds + one lone pair).",
    ["How many directions does a double bond point in?", "Lone pairs take up space too.", "Multiple bonds count once."]);

  M(18, 1, "Concept", "Four electron groups around a central atom adopt which arrangement, with what ideal angle?",
    "Tetrahedral, 109.5°", ["Square planar, 90°", "Trigonal planar, 120°", "Trigonal pyramidal, 107°", "Octahedral, 90°"],
    "Four groups get as far apart as possible by pointing to the corners of a tetrahedron: 109.5°. Square planar (90°) keeps them closer; trigonal pyramidal is a MOLECULAR shape (4 groups, 1 lone pair), not an electron-group arrangement.",
    ["Spread four balloons tied together.", "The arrangement is 3-D, not flat.", "Corners of a tetrahedron."]);

  M(18, 1, "Concept", "Five electron groups around a central atom adopt which arrangement?",
    "Trigonal bipyramidal, with 90° and 120° angles", ["Octahedral, with 90° angles", "Square pyramidal, with 90° angles", "Pentagonal planar, with 72° angles", "Tetrahedral, with 109.5° angles"],
    "Five groups: three in a triangle around the 'equator' (120° apart) and two on the axis above and below (90° to the equator): trigonal bipyramidal. Octahedral is six groups; square pyramidal is a molecular shape (AX₅E); a flat pentagon would crowd the groups.",
    ["Three groups around the middle plus two on the axis.", "Equatorial 120°, axial-equatorial 90°.", "Trigonal bipyramid."]);

  M(18, 2, "Concept", "What is the molecular shape of CH₄?",
    "Tetrahedral", ["Square planar", "Trigonal pyramidal", "Trigonal planar", "Seesaw"],
    "C has four bonding pairs and no lone pairs (AX₄): electron-group arrangement and shape are both tetrahedral, H−C−H = 109.5°. A flat square drawing on paper is misleading; the molecule is three-dimensional.",
    ["Count electron groups on C.", "Four bonding groups, no lone pairs.", "Its VSEPR class is AX₄."]);

  M(18, 2, "Concept", "What are the electron-group arrangement and the molecular shape of NH₃?",
    "Tetrahedral; trigonal pyramidal", ["Trigonal planar; trigonal planar", "Tetrahedral; tetrahedral", "Trigonal pyramidal; tetrahedral", "Trigonal planar; trigonal pyramidal"],
    "N has three bonding pairs and one lone pair (AX₃E): 4 groups → tetrahedral arrangement. The shape names only the atoms: N at the apex of a pyramid with three H's → trigonal pyramidal. Trigonal planar would need 3 groups and no lone pair (like BF₃).",
    ["Count bonds and lone pairs on N.", "4 groups → tetrahedral arrangement; one is a lone pair.", "Its VSEPR class is AX₃E."]);

  M(18, 2, "Concept", "What are the electron-group arrangement and the molecular shape of H₂O?",
    "Tetrahedral; bent", ["Linear; linear", "Trigonal planar; bent", "Tetrahedral; tetrahedral", "Tetrahedral; trigonal pyramidal"],
    "O has two bonds and two lone pairs (AX₂E₂): 4 groups → tetrahedral arrangement; with only two atoms attached the shape is bent (V-shaped), H−O−H ≈ 104.5°. Ignoring the lone pairs gives 'linear', the classic error.",
    ["Don't forget oxygen's two lone pairs.", "4 groups, 2 of them lone pairs.", "Its VSEPR class is AX₂E₂."]);

  M(18, 2, "Concept", "What is the molecular shape of CO₂?",
    "Linear", ["Bent", "Trigonal planar", "Tetrahedral", "T-shaped"],
    "O=C=O: C has two electron groups (each double bond counts as one group) and no lone pairs: AX₂, linear, 180°. Counting each double bond as two groups would wrongly give four groups.",
    ["How many electron groups are on C?", "A double bond is one group.", "Its VSEPR class is AX₂."]);

  M(18, 2, "Concept", "What is the molecular shape of BF₃?",
    "Trigonal planar", ["Trigonal pyramidal", "T-shaped", "Tetrahedral", "Bent"],
    "B has three bonding groups and no lone pair (only 6 electrons around B): AX₃, trigonal planar, 120°. Trigonal pyramidal would need a lone pair on B (like NH₃ or NF₃).",
    ["Does B have a lone pair in BF₃?", "Three groups, no lone pairs.", "Its VSEPR class is AX₃."]);

  M(18, 3, "Concept", "What are the electron-group arrangement and the molecular shape of SO₂?",
    "Trigonal planar; bent", ["Linear; linear", "Tetrahedral; bent", "Trigonal planar; trigonal planar", "Tetrahedral; trigonal pyramidal"],
    "SO₂ (18 electrons) has S bonded to two O atoms with one lone pair on S: 3 electron groups (AX₂E) → trigonal planar arrangement, bent shape, O−S−O ≈ 119°. Unlike CO₂, the central atom keeps a lone pair, so it is not linear; it has 3 groups, not 4.",
    ["Draw SO₂ and look for a lone pair on S.", "Two bonds + one lone pair = 3 groups.", "Its VSEPR class is AX₂E."]);

  M(18, 3, "Concept", "What is the molecular shape of SO₃?",
    "Trigonal planar", ["Trigonal pyramidal", "T-shaped", "Tetrahedral", "Bent"],
    "SO₃ (24 electrons): S bonded to three O atoms and no lone pair on S, so AX₃ → trigonal planar, 120°. It is often confused with sulfite, SO₃²⁻ (26 electrons), which has a lone pair on S and is trigonal pyramidal.",
    ["Count the valence electrons: 6 + 18.", "Is any electron pair left on S?", "Its VSEPR class is AX₃."]);

  M(18, 2, "Concept", "What is the shape of the nitrate ion, NO₃⁻?",
    "Trigonal planar", ["Trigonal pyramidal", "Tetrahedral", "T-shaped", "Bent"],
    "N is bonded to three O atoms with no lone pair (24 electrons; resonance makes all three bonds equal): AX₃, trigonal planar, 120°. The negative charge does not add a lone pair to N.",
    ["Draw one resonance structure.", "Count groups on N: three bonds, no lone pair.", "Its VSEPR class is AX₃."]);

  M(18, 3, "Concept", "What is the molecular shape of the hydronium ion, H₃O⁺?",
    "Trigonal pyramidal", ["Trigonal planar", "Tetrahedral", "Bent", "T-shaped"],
    "H₃O⁺ (8 electrons): three O−H bonds and one lone pair on O. Four groups (tetrahedral arrangement), AX₃E → trigonal pyramidal, like NH₃ (they are isoelectronic).",
    ["Count electrons: 6 + 3 − 1.", "Three bonds plus one lone pair on O.", "Same as NH₃."]);

  M(18, 2, "Concept", "What is the shape of the ammonium ion, NH₄⁺?",
    "Tetrahedral", ["Trigonal pyramidal", "Square planar", "Seesaw", "Trigonal planar"],
    "NH₄⁺ (8 electrons) has four N−H bonds and no lone pair: AX₄, tetrahedral, 109.5°. NH₃'s lone pair became the fourth N−H bond, so the pyramid becomes a tetrahedron.",
    ["Count electrons: 5 + 4 − 1.", "Four bonds, no lone pairs.", "Its VSEPR class is AX₄."]);

  M(18, 3, "Trap", "What is the molecular shape of the chlorate ion, ClO₃⁻?",
    "Trigonal pyramidal", ["Trigonal planar", "T-shaped", "Tetrahedral", "Bent"],
    "ClO₃⁻ has 26 valence electrons. Three Cl−O bonds and the O lone pairs use 24; the remaining 2 are a lone pair on Cl. Four groups (AX₃E) → trigonal pyramidal. 'Trigonal planar' (like NO₃⁻) ignores the lone pair; drawing Cl=O double bonds would not change the count of groups.",
    ["Count valence electrons: 7 + 18 + 1.", "After the bonds and O lone pairs, is anything left for Cl?", "Three bonds + one lone pair."]);

  M(18, 3, "Concept", "What is the shape of the perchlorate ion, ClO₄⁻?",
    "Tetrahedral", ["Square planar", "Trigonal pyramidal", "Seesaw", "Square pyramidal"],
    "ClO₄⁻ (32 electrons): four Cl−O bonds and no lone pair on Cl (whether or not Cl=O double bonds are drawn). AX₄ → tetrahedral, like SO₄²⁻ and PO₄³⁻.",
    ["Count valence electrons: 7 + 24 + 1.", "Is there a lone pair on Cl?", "Four groups, all bonding."]);

  M(18, 3, "Exam", "What is the molecular shape of PCl₃?",
    "Trigonal pyramidal", ["Trigonal planar", "T-shaped", "Tetrahedral", "Trigonal bipyramidal"],
    "PCl₃ has 5 + 21 = 26 valence electrons: three P−Cl bonds, three lone pairs on each Cl (18), and one lone pair on P. AX₃E → trigonal pyramidal, like NH₃. The trap is treating it like BF₃ (no lone pair) or PCl₅.",
    ["Count valence electrons: 26.", "P keeps one lone pair.", "Its VSEPR class is AX₃E."]);

  M(18, 2, "Concept", "What is the molecular shape of PCl₅?",
    "Trigonal bipyramidal", ["Square pyramidal", "Octahedral", "Seesaw", "Pentagonal planar"],
    "P has five bonds and no lone pairs (40 electrons: 10 in bonds, 30 on the Cl atoms): AX₅ → trigonal bipyramidal, with 90° and 120° angles.",
    ["Count groups on P.", "Five bonds, no lone pairs.", "Its VSEPR class is AX₅."]);

  M(18, 4, "Trap", "What is the molecular shape of SF₄?",
    "Seesaw", ["Tetrahedral", "Square planar", "Trigonal pyramidal", "T-shaped"],
    "SF₄: 6 + 28 = 34 electrons. Four S−F bonds (8) + F lone pairs (24) = 32, leaving 2 = one lone pair on S. Five groups (trigonal bipyramidal arrangement), AX₄E. The lone pair takes an equatorial position, leaving a seesaw shape. 'Tetrahedral' ignores the lone pair; T-shaped is AX₃E₂.",
    ["Count valence electrons and look for a lone pair on S.", "4 bonds + 1 lone pair = 5 groups.", "AX₄E, lone pair equatorial."]);

  M(18, 4, "Exam", "What is the molecular shape of ClF₃?",
    "T-shaped", ["Trigonal planar", "Trigonal pyramidal", "Seesaw", "Bent"],
    "ClF₃: 28 electrons → three Cl−F bonds and two lone pairs on Cl. Five groups (trigonal bipyramidal), AX₃E₂. Both lone pairs go equatorial, so the three F atoms form a T. Trigonal planar ignores the lone pairs; trigonal pyramidal is AX₃E.",
    ["Count valence electrons: 7 + 21.", "3 bonds + 2 lone pairs = 5 groups.", "Its VSEPR class is AX₃E₂."]);

  M(18, 4, "Trap", "What is the molecular shape of XeF₂?",
    "Linear", ["Bent", "T-shaped", "Trigonal planar", "Seesaw"],
    "XeF₂: 22 electrons → two Xe−F bonds and three lone pairs on Xe. Five groups (trigonal bipyramidal arrangement), AX₂E₃. The three lone pairs occupy the three equatorial positions; the two F atoms are axial, 180° apart → linear. 'Bent' wrongly assumes lone pairs always bend the molecule.",
    ["Count lone pairs on Xe.", "Five groups; where do three lone pairs go in a trigonal bipyramid?", "Lone pairs equatorial, F atoms axial."]);

  M(18, 4, "Exam", "What is the molecular shape of XeF₄?",
    "Square planar", ["Tetrahedral", "Seesaw", "Square pyramidal", "Octahedral"],
    "XeF₄: 36 electrons → four Xe−F bonds and two lone pairs on Xe. Six groups (octahedral arrangement), AX₄E₂. The two lone pairs sit opposite each other (180° apart), leaving the four F atoms in a square plane. 'Tetrahedral' ignores the lone pairs; square pyramidal is AX₅E.",
    ["Count groups: 4 bonds + lone pairs on Xe.", "Six groups; two are lone pairs placed opposite each other.", "Its VSEPR class is AX₄E₂."]);

  M(18, 2, "Concept", "What is the molecular shape of SF₆?",
    "Octahedral", ["Hexagonal planar", "Trigonal bipyramidal", "Square planar", "Trigonal prismatic"],
    "Six S−F bonds and no lone pair on S: AX₆ → octahedral, all adjacent F−S−F angles 90°.",
    ["Count groups on S.", "Six bonding groups, no lone pairs.", "Its VSEPR class is AX₆."]);

  M(18, 3, "Exam", "What is the molecular shape of BrF₅?",
    "Square pyramidal", ["Trigonal bipyramidal", "Octahedral", "Square planar", "Seesaw"],
    "BrF₅: 7 + 35 = 42 electrons → five Br−F bonds (10) + F lone pairs (30) = 40, leaving one lone pair on Br. Six groups (octahedral arrangement), AX₅E → square pyramidal. Trigonal bipyramidal (AX₅) ignores the lone pair.",
    ["Count valence electrons: 42.", "5 bonds + 1 lone pair = 6 groups.", "Its VSEPR class is AX₅E."]);

  M(18, 4, "Trap", "What is the shape of the triiodide ion, I₃⁻?",
    "Linear", ["Bent", "Trigonal planar", "T-shaped", "Trigonal pyramidal"],
    "I₃⁻: 3(7) + 1 = 22 electrons. The central I has two bonds and three lone pairs: AX₂E₃, five groups. The three lone pairs take the equatorial positions, the two outer I atoms are axial → linear (like XeF₂). 'Bent' is the guess if you assume a lone-pair-bearing centre bends.",
    ["Count the electrons, including the 1− charge.", "Central I: 2 bonds + 3 lone pairs.", "Its VSEPR class is AX₂E₃."]);

  M(18, 4, "Exam", "What is the shape of the ICl₄⁻ ion?",
    "Square planar", ["Tetrahedral", "Seesaw", "Square pyramidal", "Trigonal bipyramidal"],
    "ICl₄⁻: 7 + 28 + 1 = 36 electrons. Four I−Cl bonds (8) + Cl lone pairs (24) = 32; 4 left = two lone pairs on I. Six groups, AX₄E₂ → square planar (lone pairs opposite), like XeF₄. Seesaw is AX₄E (one lone pair).",
    ["Count electrons, including the 1− charge.", "4 bonds + 2 lone pairs = 6 groups.", "Same as XeF₄."]);

  M(18, 3, "Concept", "What is the molecular shape of ozone, O₃?",
    "Bent", ["Linear", "Trigonal planar", "Triangular ring", "Trigonal pyramidal"],
    "O₃ (18 electrons): the central O has one double bond, one single bond and one lone pair → three groups (trigonal planar arrangement), AX₂E → bent, angle ≈ 117°. It is not a ring, and not linear because the central atom has a lone pair.",
    ["Draw one resonance structure of O₃.", "Look at the lone pairs on the central O.", "Like SO₂: AX₂E."]);

  M(18, 2, "Concept", "What is the molecular shape of HCN?",
    "Linear", ["Bent", "Trigonal planar", "Trigonal pyramidal", "Tetrahedral"],
    "H−C≡N: C has two electron groups (a single bond and a triple bond) and no lone pair: AX₂ → linear, 180°.",
    ["Count groups on C - the triple bond is one group.", "Two groups, no lone pairs.", "Its VSEPR class is AX₂."]);

  M(18, 2, "Concept", "What is the molecular shape of formaldehyde, H₂CO (C central)?",
    "Trigonal planar", ["Trigonal pyramidal", "Tetrahedral", "Bent", "T-shaped"],
    "C has two C−H bonds and one C=O bond and no lone pair: three groups, AX₃ → trigonal planar. Counting the double bond as two groups would wrongly give a tetrahedral arrangement.",
    ["How many electron groups are on C?", "The C=O double bond is one group.", "Its VSEPR class is AX₃."]);

  M(18, 3, "Concept", "In acetylene, H−C≡C−H, what is the geometry around each carbon atom?",
    "Linear, 180°", ["Trigonal planar, 120°", "Tetrahedral, 109.5°", "Bent, about 105°", "Trigonal pyramidal, 107°"],
    "Each C has two electron groups: one C−H single bond and the C≡C triple bond (one group), no lone pairs → AX₂, linear. The whole molecule is a straight line.",
    ["Count groups on one carbon.", "The triple bond is one group.", "Two groups → 180°."]);

  M(18, 3, "Concept", "Why do lone pairs occupy EQUATORIAL positions in a trigonal bipyramidal arrangement (as in SF₄)?",
    "An equatorial position has only two neighbours at 90°, while an axial position has three, so a lone pair there feels less repulsion",
    ["Equatorial positions are farther from the nucleus", "Axial positions are reserved for the most electronegative atoms", "Lone pairs are smaller than bonding pairs, so they fit in the equator", "The equatorial angle of 120° is smaller than the axial angle"],
    "Repulsions at 90° are the strongest. An axial site is 90° from three equatorial sites; an equatorial site is 90° from only the two axial sites (and 120° from the other two equatorial ones). Lone pairs, which repel most, therefore go equatorial: SF₄ seesaw, ClF₃ T-shaped, XeF₂ linear. Lone pairs are larger (more spread out), not smaller; 120° is larger than 90°.",
    ["Which interactions are worse: at 90° or at 120°?", "Count the 90° neighbours of an axial vs an equatorial site.", "Equatorial: only two 90° neighbours."]);

  M(18, 3, "Concept", "In XeF₄, where are the two lone pairs on Xe?",
    "Opposite each other (180° apart), giving a square planar shape",
    ["Adjacent (90° apart), giving a seesaw shape", "In two equatorial positions of a trigonal bipyramid", "Adjacent (90° apart), giving a square pyramidal shape", "Shared between two of the F atoms"],
    "With six groups (octahedral), two lone pairs 90° apart would repel each other strongly; placing them 180° apart minimizes repulsion, leaving the four F atoms in a square plane. XeF₄ has six groups, not five, so a trigonal bipyramid does not apply.",
    ["How many electron groups surround Xe?", "Lone pairs keep as far apart as possible.", "180° apart in an octahedron."]);

  M(18, 2, "Concept", "Which AXₘEₙ designation gives a seesaw molecular shape?",
    "AX₄E", ["AX₃E", "AX₃E₂", "AX₂E₂", "AX₄E₂"],
    "Seesaw = 5 electron groups with 4 bonds and 1 lone pair (AX₄E, e.g. SF₄). AX₃E is trigonal pyramidal, AX₃E₂ T-shaped, AX₂E₂ bent, AX₄E₂ square planar.",
    ["Seesaw comes from the trigonal bipyramid family (5 groups).", "One position is a lone pair.", "4 atoms + 1 lone pair."]);

  M(18, 2, "Concept", "What molecular shape does an AX₃E₂ molecule have?",
    "T-shaped", ["Trigonal planar", "Trigonal pyramidal", "Seesaw", "Bent"],
    "AX₃E₂ has 5 groups (trigonal bipyramidal arrangement). The two lone pairs take equatorial positions, and the three atoms form a T (example: ClF₃). Trigonal pyramidal is AX₃E; trigonal planar is AX₃.",
    ["Total groups = 3 + 2.", "Five groups → trigonal bipyramid; lone pairs equatorial.", "Example: ClF₃."]);

  M(18, 2, "Concept", "Which species has a molecular shape that is DIFFERENT from its electron-group arrangement?",
    "NH₃", ["CH₄", "BF₃", "PCl₅", "SF₆"],
    "The two differ only when the central atom has lone pairs. NH₃ (one lone pair) has a tetrahedral arrangement but a trigonal pyramidal shape. CH₄, BF₃, PCl₅ and SF₆ have no lone pairs on the central atom, so shape = arrangement.",
    ["When do shape and arrangement differ?", "Look for lone pairs on the central atom.", "Only one choice has a lone pair on the centre."]);

  M(18, 3, "Concept", "Which pair of species has the SAME molecular shape?",
    "NO₃⁻ and BF₃", ["NH₃ and BF₃", "H₂O and CO₂", "SO₂ and CO₂", "ClO₃⁻ and SO₃"],
    "NO₃⁻ and BF₃ are both AX₃ → trigonal planar. NH₃ (pyramidal) vs BF₃ (planar); H₂O (bent) vs CO₂ (linear); SO₂ (bent) vs CO₂ (linear); ClO₃⁻ (pyramidal, lone pair on Cl) vs SO₃ (planar).",
    ["Find the AXₘEₙ type of each species.", "A lone pair on the centre changes the shape.", "Two AX₃ species."]);

  M(18, 3, "Exam", "Which species is NOT linear?",
    "SO₂", ["CO₂", "XeF₂", "I₃⁻", "HCN"],
    "SO₂ is AX₂E (one lone pair on S) → bent. CO₂ and HCN are AX₂ (linear); XeF₂ and I₃⁻ are AX₂E₃, which is also linear because the three lone pairs are equatorial.",
    ["Find the number of lone pairs on each central atom.", "AX₂ and AX₂E₃ are both linear.", "Which one is AX₂E?"]);

  M(18, 3, "Exam", "Which species does NOT have a tetrahedral electron-group arrangement?",
    "SO₃", ["NH₃", "H₂O", "ClO₃⁻", "NH₄⁺"],
    "Four electron groups give a tetrahedral arrangement: NH₃ (3 bonds + 1 lone pair), H₂O (2 + 2), ClO₃⁻ (3 + 1) and NH₄⁺ (4 + 0) all have four. SO₃ has three groups (three bonds, no lone pair on S) → trigonal planar.",
    ["Count electron groups (bonds + lone pairs) on each centre.", "Tetrahedral = 4 groups.", "Which centre has only three groups?"]);

  M(18, 4, "Exam", "Which TWO species are both square planar?",
    "XeF₄ and ICl₄⁻", ["XeF₄ and SF₄", "CCl₄ and ICl₄⁻", "BrF₅ and XeF₄", "SF₄ and CH₄"],
    "Square planar = AX₄E₂. XeF₄ (36 e⁻) and ICl₄⁻ (36 e⁻) both have four bonds and two lone pairs on the centre. SF₄ is AX₄E (seesaw), CCl₄ and CH₄ are AX₄ (tetrahedral), BrF₅ is AX₅E (square pyramidal).",
    ["Square planar needs six groups with two lone pairs.", "Check each species for 4 bonds + 2 lone pairs.", "Both have 36 valence electrons."]);

  N(18, 2, "Calculation", "How many electron groups surround S in SF₄? (Enter a whole number.)",
    "5", 5,
    "SF₄ has 34 valence electrons: four S−F bonds and one lone pair on S. Electron groups = 4 + 1 = 5 (trigonal bipyramidal arrangement). Forgetting the lone pair gives 4.",
    ["Count bonds on S.", "Then check for a lone pair: 34 − 8 − 24.", "4 bonds + 1 lone pair."], { abs: 0 });

  N(18, 3, "Calculation", "How many lone pairs are on the central I atom in IF₅? (Enter a whole number.)",
    "1", 1,
    "IF₅: 7 + 35 = 42 valence electrons. Five I−F bonds use 10, three lone pairs on each F use 30; 42 − 40 = 2 electrons = 1 lone pair on I. So IF₅ is AX₅E, square pyramidal.",
    ["Total valence electrons: 7 + 5(7).", "Subtract bonding electrons and the F lone pairs.", "42 − 10 − 30."], { abs: 0 });
  chk("IF5", (42 - 10 - 30) / 2, 1);

  M(18, 3, "Exam", "Which describes the phosphate ion, PO₄³⁻?",
    "32 valence electrons; tetrahedral; O−P−O angles of 109.5°",
    ["32 valence electrons; square planar; 90°", "29 valence electrons; tetrahedral; 109.5°", "32 valence electrons; trigonal pyramidal; 107°", "26 valence electrons; trigonal planar; 120°"],
    "5 + 4(6) + 3 = 32 electrons. P has four bonds to O and no lone pair: AX₄ → tetrahedral, 109.5°. 29 subtracts the 3− charge instead of adding it; square planar would need two lone pairs; trigonal pyramidal would need a lone pair on P.",
    ["Add 3 electrons for the 3− charge.", "Count groups on P.", "Four bonds, no lone pairs."]);

  M(18, 4, "Trap", "Which describes the sulfite ion, SO₃²⁻?",
    "26 valence electrons; trigonal pyramidal", ["24 valence electrons; trigonal planar", "26 valence electrons; trigonal planar", "24 valence electrons; trigonal pyramidal", "28 valence electrons; T-shaped"],
    "6 + 18 + 2 = 26 electrons. Three S−O bonds and the O lone pairs use 24, leaving one lone pair on S: AX₃E → trigonal pyramidal. 24 electrons and trigonal planar describe neutral SO₃ (no lone pair on S); the 2− charge adds the two electrons that form the lone pair.",
    ["Add 2 electrons for the 2− charge.", "Do the two extra electrons end up on S?", "Three bonds + one lone pair."]);

  /* ---------------- Lesson 19: bond angles ---------------- */
  M(19, 1, "Concept", "What is the approximate H−N−H bond angle in NH₃?",
    "107°", ["109.5°", "120°", "104.5°", "90°"],
    "NH₃ has a tetrahedral arrangement (ideal 109.5°), but its lone pair repels the bonding pairs more strongly and squeezes the H−N−H angle to about 107°. 104.5° is water (two lone pairs); 120° is trigonal planar.",
    ["Start from the tetrahedral angle.", "One lone pair compresses the angle slightly.", "A little less than 109.5°."]);

  M(19, 1, "Concept", "What is the approximate H−O−H bond angle in H₂O?",
    "104.5°", ["109.5°", "107°", "120°", "180°"],
    "Water: four groups (tetrahedral, ideal 109.5°) with two lone pairs, which compress the angle more than NH₃'s single lone pair: 104.5°. 180° would be a linear molecule (ignoring the lone pairs).",
    ["Water has two lone pairs on O.", "Two lone pairs squeeze more than one.", "Less than NH₃'s 107°."]);

  M(19, 2, "Concept", "Why is the H−O−H angle in water smaller than 109.5°?",
    "Lone pairs repel more strongly than bonding pairs, pushing the bonding pairs closer together",
    ["Bonding pairs repel more strongly than lone pairs", "Water's electron-group arrangement is trigonal planar", "Oxygen is a larger atom than carbon", "The two hydrogen atoms attract each other"],
    "A lone pair is held by only one nucleus, so it spreads out and repels more than a bonding pair. Water's two lone pairs push the two O−H bonds together: 104.5°. The arrangement is tetrahedral (4 groups), and the H atoms (both δ+) repel, not attract.",
    ["Compare lone-pair and bonding-pair repulsion.", "Which takes up more room around the central atom?", "Lone pairs repel more."]);

  M(19, 3, "Exam", "Arrange in order of DECREASING H−X−H bond angle: H₂O, CH₄, NH₃.",
    "CH₄ > NH₃ > H₂O", ["H₂O > NH₃ > CH₄", "NH₃ > CH₄ > H₂O", "CH₄ > H₂O > NH₃", "CH₄ = NH₃ = H₂O"],
    "All three have 4 electron groups (tetrahedral arrangement). More lone pairs → more compression: CH₄ (0 lone pairs) 109.5° > NH₃ (1) 107° > H₂O (2) 104.5°. They are not equal even though the arrangement is the same.",
    ["All three have four electron groups.", "Count lone pairs on each central atom.", "0, 1, 2 lone pairs."]);

  M(19, 2, "Concept", "The O−S−O bond angle in SO₂ is best described as:",
    "slightly less than 120°", ["exactly 180°", "exactly 120°", "slightly less than 109.5°", "exactly 90°"],
    "SO₂ is AX₂E: three electron groups (trigonal planar arrangement, ideal 120°), and the lone pair on S compresses the angle a little (≈ 119°). 180° would be linear like CO₂; 109.5° belongs to four groups.",
    ["How many electron groups are on S?", "Three groups → ideal 120°.", "A lone pair squeezes it slightly."]);

  M(19, 3, "Exam", "What are the F−Cl−F bond angles between the axial and equatorial F atoms in ClF₃ (T-shaped)?",
    "Slightly less than 90°", ["120°", "Exactly 180°", "109.5°", "Slightly more than 120°"],
    "ClF₃ is AX₃E₂ in a trigonal bipyramidal arrangement: the axial F atoms are ideally 90° from the equatorial F, and the two equatorial lone pairs push the axial F atoms toward the equatorial one, giving about 87.5°. (The angle between the two axial F atoms is slightly less than 180°.)",
    ["T-shaped comes from a trigonal bipyramid.", "Axial-to-equatorial is ideally 90°.", "Lone pairs compress it."]);

  M(19, 3, "Concept", "In formaldehyde, H₂C=O, the H−C−H angle is:",
    "slightly less than 120°, because the C=O double bond repels the C−H bonds more than they repel each other",
    ["exactly 109.5°", "slightly more than 120°, because the H atoms repel each other strongly", "exactly 180°", "slightly less than 109.5°, because of a lone pair on C"],
    "C has three groups (trigonal planar, ideal 120°). The C=O double bond has more electron density than a single bond, so it pushes the two C−H bonds closer: H−C−H ≈ 116°. C has no lone pair; there are only three groups, so 109.5° does not apply.",
    ["How many groups on C, and what is the ideal angle?", "Double bonds repel a little more than single bonds.", "The H−C−H angle shrinks below 120°."]);

  M(19, 3, "Exam", "In methanol, H₃C−O−H, the C−O−H bond angle is closest to:",
    "slightly less than 109.5° (about 105-108°)", ["120°", "180°", "exactly 109.5°", "90°"],
    "The O atom has two bonds (to C and H) and two lone pairs: four groups, AX₂E₂, bent like water. The ideal tetrahedral angle 109.5° is compressed by the two lone pairs to slightly less than 109.5° (measured ≈ 108°). 180° ignores the lone pairs; 120° would need only three groups.",
    ["Look at the oxygen atom only.", "Two bonds + two lone pairs on O.", "Water-like: a bit less than 109.5°."]);

  M(19, 4, "Exam", "In acetic acid, CH₃COOH (H₃C−C(=O)−O−H), what are the approximate bond angles around (1) the CH₃ carbon, (2) the carbon bonded to both O atoms, and (3) the O bonded to H?",
    "109.5°; 120°; slightly less than 109.5°", ["109.5°; 109.5°; 180°", "120°; 120°; 120°", "109.5°; 180°; 109.5°", "120°; 109.5°; slightly less than 120°"],
    "(1) The CH₃ carbon has four single bonds → AX₄, 109.5°. (2) The carboxyl carbon has three groups (C−C, C=O, C−O) and no lone pair → AX₃, 120°. (3) The O−H oxygen has two bonds and two lone pairs → AX₂E₂, bent, slightly less than 109.5°. Analyze each centre separately; a molecule can have several different geometries.",
    ["Treat each central atom on its own.", "Count groups: 4 on CH₃ carbon, 3 on the C=O carbon, 4 on the OH oxygen.", "Tetrahedral, trigonal planar, bent."]);

  M(19, 4, "Exam", "In glycine, H₂N−CH₂−COOH, what is the geometry around the N atom, and the approximate H−N−H angle?",
    "Trigonal pyramidal; about 107°", ["Trigonal planar; 120°", "Tetrahedral; 109.5°", "Linear; 180°", "Bent; about 104.5°"],
    "The N in the −NH₂ group is bonded to two H atoms and the CH₂ carbon and has one lone pair: AX₃E, trigonal pyramidal like NH₃, angles ≈ 107°. Counting only the two H atoms (and forgetting the bond to C) leads to 'bent'; ignoring the lone pair gives planar or tetrahedral.",
    ["N has three bonds in glycine - two to H and one to C.", "Plus one lone pair.", "Like NH₃."]);

  M(19, 3, "Exam", "In glycine, H₂N−CH₂−COOH, what are the ideal bond angles around the CH₂ carbon and around the carboxyl (COOH) carbon?",
    "109.5° and 120°", ["120° and 109.5°", "109.5° and 109.5°", "120° and 180°", "180° and 120°"],
    "The CH₂ carbon has four single bonds (N, two H, C) → tetrahedral, 109.5°. The carboxyl carbon has three groups (C−C, C=O, C−OH) and no lone pair → trigonal planar, 120°.",
    ["Count electron groups on each carbon.", "Four single bonds vs one double + two single bonds.", "4 groups and 3 groups."]);

  M(19, 2, "Concept", "In a trigonal bipyramidal molecule such as PCl₅, what is the angle between an axial and an equatorial bond?",
    "90°", ["120°", "109.5°", "180°", "72°"],
    "The axial bonds lie along the vertical axis and the three equatorial bonds lie in the horizontal plane: axial-equatorial = 90°, equatorial-equatorial = 120°, axial-axial = 180°.",
    ["Axial bonds are on the vertical axis.", "Equatorial bonds are in a horizontal plane.", "Perpendicular."]);

  M(19, 2, "Concept", "What is the F−Xe−F bond angle in XeF₂?",
    "180°", ["120°", "90°", "109.5°", "About 105°"],
    "XeF₂ is AX₂E₃: the three lone pairs are equatorial and the two F atoms are axial, directly opposite each other → 180°. The lone pairs are spread symmetrically around the equator, so they do not bend the molecule.",
    ["Where do three lone pairs go in a trigonal bipyramid?", "The F atoms take the two axial positions.", "Axial-to-axial."]);

  M(19, 3, "Exam", "Which molecule has the SMALLEST ideal angle between adjacent bonds around its central atom?",
    "SF₆", ["CO₂", "BF₃", "CH₄", "BeCl₂"],
    "Ideal angles: CO₂ and BeCl₂ 180° (linear), BF₃ 120° (trigonal planar), CH₄ 109.5° (tetrahedral), SF₆ 90° (octahedral). More electron groups → smaller angles.",
    ["Find the electron-group arrangement of each.", "More groups crowd closer together.", "Six groups → 90°."]);

  /* ---------------- Lesson 19: molecular polarity ---------------- */
  M(19, 1, "Concept", "A molecule is polar if:",
    "it has polar bonds arranged so that their bond dipoles do not cancel",
    ["it contains at least one polar bond", "its central atom has an expanded octet", "all of its bonds are nonpolar", "it contains a double bond"],
    "Two conditions: (1) polar bonds, and (2) a shape in which the bond dipoles (and lone pairs) do not cancel. CO₂ has polar bonds but is nonpolar because its dipoles cancel, so 'at least one polar bond' is not enough.",
    ["Polar bonds alone are not enough.", "Think about CO₂.", "Bond polarity AND shape."]);

  M(19, 2, "Concept", "Why is CO₂ nonpolar even though C=O bonds are polar?",
    "Its two C=O bond dipoles are equal and point in opposite directions (linear), so they cancel",
    ["C=O bonds are actually nonpolar", "C and O have the same electronegativity", "A lone pair on C cancels the bond dipoles", "Double bonds are never polar"],
    "O (3.5) is more electronegative than C (2.5), so each C=O bond is polar. But CO₂ is linear (AX₂): the two equal dipoles point in opposite directions and cancel, giving zero overall dipole. C has no lone pair in CO₂.",
    ["Is each C=O bond polar?", "What is the shape of CO₂?", "Equal and opposite dipoles."]);

  M(19, 3, "Exam", "SO₂ is polar but CO₂ is not. Why?",
    "SO₂ is bent (a lone pair on S), so its bond dipoles do not cancel; CO₂ is linear, so its dipoles cancel",
    ["S−O bonds are polar but C=O bonds are not", "SO₂ has a larger molar mass", "S is more electronegative than O", "CO₂ has resonance structures and SO₂ does not"],
    "Both have polar bonds. The difference is shape: S in SO₂ has a lone pair (AX₂E, bent ≈ 119°), so the two S−O dipoles add to a net dipole; CO₂ (AX₂) is linear and they cancel. Mass does not decide polarity; O is more electronegative than S; SO₂ does have resonance.",
    ["Compare the shapes, not the bonds.", "Does S in SO₂ have a lone pair?", "Bent vs linear."]);

  M(19, 3, "Exam", "BF₃ is nonpolar, but NF₃ is polar. Why?",
    "NF₃ has a lone pair on N, making it trigonal pyramidal so its dipoles do not cancel; BF₃ is trigonal planar and its three B−F dipoles cancel",
    ["B−F bonds are nonpolar but N−F bonds are polar", "NF₃ has an expanded octet", "BF₃ has a lone pair on B that cancels the dipoles", "F is more electronegative in NF₃ than in BF₃"],
    "BF₃: AX₃, trigonal planar, three equal B−F dipoles at 120° cancel. NF₃: 26 electrons, AX₃E, trigonal pyramidal, the N−F dipoles do not cancel → polar. B−F bonds are very polar (ΔEN 2.0); N has an octet; B has no lone pair; F's electronegativity does not change.",
    ["Count lone pairs on B and on N.", "Planar vs pyramidal.", "Symmetric shapes cancel; pyramids do not."]);

  M(19, 2, "Exam", "Which molecule is polar?",
    "CH₃Cl", ["CCl₄", "CH₄", "CO₂", "BF₃"],
    "CH₃Cl is tetrahedral but has one C−Cl bond and three C−H bonds; the dipoles are not identical, so they do not cancel → polar. CCl₄ and CH₄ (four identical bonds), CO₂ (linear) and BF₃ (trigonal planar) all cancel.",
    ["Look for a molecule whose outer atoms are not all the same.", "Symmetric shape + identical outer atoms → nonpolar.", "One different outer atom breaks the symmetry."]);

  M(19, 3, "Trap", "CH₃Cl and CCl₄ both have a tetrahedral shape. Which statement is correct?",
    "CH₃Cl is polar because its one C−Cl dipole is not balanced by the C−H bonds; CCl₄ is nonpolar because four identical dipoles cancel",
    ["Both are nonpolar, because tetrahedral molecules are always nonpolar", "Both are polar, because both contain polar C−Cl bonds", "CCl₄ is polar and CH₃Cl is nonpolar", "CH₃Cl is nonpolar because C−H bonds are nonpolar"],
    "A symmetric shape cancels dipoles only when the outer atoms are identical. In CCl₄ four equal C−Cl dipoles cancel → nonpolar. In CH₃Cl the C−Cl dipole is much larger than the C−H dipoles, so there is a net dipole → polar. Shape alone or bond polarity alone does not decide it.",
    ["Check both steps: polar bonds, then whether they cancel.", "Are the four outer atoms the same in each?", "Different outer atoms → net dipole."]);

  M(19, 4, "Exam", "For the two isomers of 1,2-dichloroethene, ClHC=CHCl, which statement is correct?",
    "The cis isomer (both Cl on the same side) is polar; the trans isomer (Cl on opposite sides) is nonpolar",
    ["Both isomers are nonpolar", "Both isomers are polar", "The trans isomer is polar; the cis isomer is nonpolar", "Neither isomer has polar bonds"],
    "Each C is trigonal planar and the molecule is flat. In trans, the two C−Cl dipoles point in exactly opposite directions and cancel (as do the C−H dipoles) → nonpolar. In cis, both C−Cl dipoles point toward the same side, giving a net dipole → polar. Same formula, same bonds, different polarity.",
    ["Sketch both isomers in a plane.", "Do the two C−Cl dipoles point opposite ways or the same way?", "Opposite cancels (trans)."]);

  M(19, 4, "Trap", "XeF₄ has polar Xe−F bonds and two lone pairs on Xe. Is XeF₄ polar?",
    "No; in its square planar shape the Xe−F dipoles (and the two lone pairs) are arranged opposite each other, so they cancel",
    ["Yes, because any molecule with lone pairs on the central atom is polar", "Yes, because Xe−F bonds are polar", "No, because Xe−F bonds are nonpolar", "Yes, because XeF₄ is seesaw-shaped"],
    "XeF₄ is AX₄E₂, square planar: each Xe−F dipole has an equal one directly opposite, and the two lone pairs sit 180° apart, so everything cancels → nonpolar. Lone pairs do not automatically make a molecule polar (XeF₂ and XeF₄ are nonpolar); the bonds are polar but cancel; seesaw is SF₄.",
    ["Find the shape first (AX₄E₂).", "Are the lone pairs and the dipoles symmetric?", "Opposite pairs cancel."]);

  M(19, 3, "Exam", "Which molecule is NONPOLAR?",
    "PCl₅", ["PCl₃", "SF₄", "ClF₃", "BrF₅"],
    "PCl₅ is AX₅, trigonal bipyramidal with five identical P−Cl bonds; the axial dipoles cancel each other and the three equatorial dipoles cancel at 120° → nonpolar. PCl₃ (pyramidal), SF₄ (seesaw), ClF₃ (T-shaped) and BrF₅ (square pyramidal) each have a lone pair arrangement that leaves a net dipole.",
    ["Which central atom has no lone pairs?", "Symmetric shape + identical outer atoms → nonpolar.", "Its VSEPR class is AX₅."]);

  M(19, 3, "Exam", "Which set contains ONLY polar molecules?",
    "H₂O, NH₃, SO₂", ["CO₂, H₂O, NH₃", "BF₃, NF₃, SO₂", "CH₄, CH₃Cl, CHCl₃", "XeF₂, SF₄, ClF₃"],
    "H₂O (bent), NH₃ (pyramidal) and SO₂ (bent) are all polar. Each wrong set contains one nonpolar molecule: CO₂ (linear), BF₃ (trigonal planar), CH₄ (tetrahedral, identical bonds) and XeF₂ (linear).",
    ["Check every molecule in each set.", "One nonpolar member spoils a set.", "Look for linear, trigonal planar or fully symmetric members."]);

  M(19, 4, "Exam", "Which set contains ONLY nonpolar molecules?",
    "CO₂, BF₃, XeF₄", ["CO₂, SO₂, XeF₄", "BF₃, NF₃, CH₄", "CCl₄, CH₂Cl₂, SF₆", "SF₄, SF₆, XeF₂"],
    "CO₂ (linear), BF₃ (trigonal planar) and XeF₄ (square planar) all have cancelling dipoles. Each wrong set has one polar member: SO₂ (bent), NF₃ (pyramidal), CH₂Cl₂ (tetrahedral but with two different kinds of outer atom) and SF₄ (seesaw).",
    ["Check the shape of every molecule.", "Bent, pyramidal, seesaw and mixed-substituent molecules are polar.", "Find the set with no such member."]);

  M(19, 3, "Concept", "HCN is linear. Is it polar?",
    "Yes; the H−C and C≡N dipoles both point toward the N end, so they add rather than cancel",
    ["No, linear molecules are always nonpolar", "No, because the C≡N bond is nonpolar", "Yes, because C has a lone pair", "No, because the H and N ends cancel each other"],
    "A linear molecule is nonpolar only if its two ends are identical (like CO₂). In H−C≡N, C (2.5) is more electronegative than H (2.1), and N (3.0) more than C, so both dipoles point from H toward N; they add → polar. C has no lone pair in HCN.",
    ["Are the two ends of the molecule the same?", "Find the δ− end of each bond.", "Both dipoles point toward N."]);

  M(19, 3, "Exam", "Is dichloromethane, CH₂Cl₂, polar?",
    "Yes; the tetrahedral shape cannot cancel two C−Cl dipoles against two much smaller C−H dipoles",
    ["No, because it is tetrahedral", "No, because the two C−Cl dipoles cancel each other in a flat square", "Yes, because C has a lone pair", "No, because C−Cl bonds are nonpolar"],
    "CH₂Cl₂ is tetrahedral (not a flat square, which is only how it looks on paper). The two C−Cl dipoles point to two corners and the two small C−H dipoles to the other two, so there is a net dipole → polar. C has no lone pair; C−Cl is polar (ΔEN 0.5).",
    ["Is the molecule flat or tetrahedral?", "Are all four outer atoms identical?", "Different outer atoms on a tetrahedron → polar."]);

  M(19, 4, "Exam", "Which choice correctly gives the total valence electrons, molecular shape and polarity of SF₄?",
    "34; seesaw; polar", ["34; tetrahedral; nonpolar", "32; tetrahedral; nonpolar", "34; seesaw; nonpolar", "34; square planar; nonpolar"],
    "6 + 4(7) = 34 electrons → four S−F bonds and one lone pair on S (AX₄E) → seesaw. The lone pair makes the shape unsymmetrical, so the S−F dipoles do not cancel → polar. 'Tetrahedral, nonpolar' forgets the lone pair (32 is the count with no lone pair on S).",
    ["Count valence electrons: 6 + 28.", "Is there a lone pair on S?", "AX₄E → seesaw → does it cancel?"]);

  M(19, 4, "Exam", "Which choice correctly gives the molecular shape and polarity of BrF₅?",
    "Square pyramidal; polar", ["Trigonal bipyramidal; nonpolar", "Square pyramidal; nonpolar", "Octahedral; nonpolar", "Square planar; polar"],
    "BrF₅: 42 electrons → five Br−F bonds and one lone pair (AX₅E) → square pyramidal. The four basal Br−F dipoles cancel each other, but the apical Br−F dipole is not balanced (the lone pair is opposite it) → polar. Trigonal bipyramidal and octahedral ignore the lone pair.",
    ["Count valence electrons and lone pairs on Br.", "6 groups, one a lone pair → square pyramidal.", "The apical bond has nothing opposite to cancel it."]);

  M(19, 3, "Concept", "Is 1,1-dichloroethene, Cl₂C=CH₂, polar?",
    "Yes; both C−Cl dipoles are on the same end of the molecule, so they add",
    ["No, because it has the same formula as trans-1,2-dichloroethene", "No, because the C=C double bond cancels the C−Cl dipoles", "No, because planar molecules are always nonpolar", "Yes, because each carbon has a lone pair"],
    "Both Cl atoms are on one carbon, so both C−Cl dipoles point toward the same end of the flat molecule (with the C−H bonds at the other end) → net dipole → polar. Same formula as trans-1,2-dichloroethene does not mean same polarity; planarity alone does not cancel dipoles; neither carbon has a lone pair.",
    ["Where are the two Cl atoms?", "Do the two C−Cl dipoles point toward the same end or opposite ends?", "Same end → they add."]);

  M(19, 2, "Trap", "Which statement about molecular polarity is FALSE?",
    "Every molecule that contains polar bonds is polar",
    ["A diatomic molecule of two identical atoms, such as Cl₂, is nonpolar", "A bent triatomic molecule with polar bonds is polar", "Lone pairs on the central atom often make a molecule polar", "A molecule can have polar bonds yet be nonpolar"],
    "CO₂, BF₃, CCl₄ and SF₆ all contain polar bonds but are nonpolar because their bond dipoles cancel, so 'every molecule with polar bonds is polar' is false. The other statements are true (two identical atoms share electrons equally, so Cl₂ has no dipole; bent molecules like H₂O and SO₂ are polar; lone pairs usually unbalance the shape, though not in XeF₂ or XeF₄).",
    ["Think of CO₂.", "Polar bonds can cancel.", "Find the overgeneralization."]);
};
