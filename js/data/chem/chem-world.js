/* The Periodic Coast - CHM 11510, General Chemistry I (Purdue, Fall 2026).

   Textbook: Silberberg & Amateis, Chemistry: The Molecular Nature of Matter
   and Change (10th / Evergreen edition). The course has no quizzes - it runs on
   28 lectures, a weekly recitation worksheet, weekly Achieve homework, three
   evening exams and a comprehensive final - so a GYM IS ONE LECTURE TOPIC (the
   block of lectures that shares a textbook chapter), and the four exams are the
   boss battles, sitting where the real calendar puts them:

     Exam 1  Thu Sept 24   Fundamentals 1-6            (Ch 1-4)   gyms 1-4
     Exam 2  Wed Oct 21    Thermochem, Quantum, Config (Ch 6-8)   gyms 5-7
     Exam 3  Thu Nov 19    Bonding through Colligative (Ch 9-13)  gyms 8-11
     Final   Dec 14-19     everything                             gyms 1-13

   Gases (Ch 5) and Nuclear (Ch 24) are taught after Exam 3, so the only place
   the course tests them is the Final. They still get gyms - each has its own
   lectures - but that is why the Final cannot be skipped.

   Each exam also owns a review chapter (91-94): exam-format, multi-step problems
   modelled on the recitation worksheets and the evening exams (five choices,
   a-e), drawn on the exam's revision route alongside every gym it covers. */

window.CHEM_LESSONS = {
  1:  'Fundamentals 1: units, measurement and problem solving',
  2:  'Fundamentals 2: the atom, elements and ions',
  3:  'Fundamentals 3: chemical formulas and the mole',
  4:  'Fundamentals 4: chemical equations and stoichiometry',
  5:  'Fundamentals 5: molarity and solution stoichiometry',
  6:  'Fundamentals 6: precipitation and acid-base reactions',
  7:  'Thermochemistry 1: heat, work, enthalpy and calorimetry',
  8:  'Thermochemistry 2: coffee-cup calorimetry and thermochemical equations',
  9:  'Thermochemistry 3: Hess’s law and enthalpies of formation',
  10: 'Quantum Theory 1: the nature of light',
  11: 'Quantum Theory 2: atomic spectra and the Bohr model',
  12: 'Quantum Theory 3: matter waves, uncertainty and quantum numbers',
  13: 'Electron Configuration and Periodicity 1: many-electron atoms and configurations',
  14: 'Electron Configuration and Periodicity 2: periodic trends, ions and magnetism',
  15: 'Models of Chemical Bonding 1: bond types and ionic bonding',
  16: 'Models of Chemical Bonding 2: covalent bonds, bond energy and electronegativity',
  17: 'Shapes of Molecules 1: Lewis structures, resonance and formal charge',
  18: 'Shapes of Molecules 2: VSEPR',
  19: 'Shapes of Molecules 3: molecular polarity and bond angles',
  20: 'Intermolecular forces',
  21: 'Physical states and phase changes',
  22: 'The solid state: crystal structures',
  23: 'Intermolecular forces in solution; biological macromolecules',
  24: 'Colligative properties of solutions',
  25: 'Gases 1: pressure and the gas laws',
  26: 'Gases 2: stoichiometry, mixtures and kinetic-molecular theory',
  27: 'Nuclear Chemistry 1: radioactive decay and nuclear stability',
  28: 'Nuclear Chemistry 2: half-life, mass-energy, fission and fusion'
};

/* ==========================================================================
   THIRTEEN GYMS, ONE PER LECTURE TOPIC
   `sections` are the Silberberg sections the schedule assigns.
   ========================================================================== */
window.CHEM_CHAPTERS = [
  {
    n: 1, lessons: [1], exam: 'x1', sections: '1.3-1.5',
    type: 'steel', teamTypes: ['steel', 'normal'], ace: 437,
    route: 'Route 1 - The Graduated Cylinder',
    title: 'Measurement and Significant Figures',
    leader: 'Vera Meniscus', epithet: 'Read the Bottom of the Curve', badge: 'Meniscus Badge',
    blurb: 'SI units and prefixes, how many digits a measurement has earned, and the conversion chains every later problem runs on.',
    notes: [
      'SI base units the course uses: mass kg, length m, time s, temperature K, amount mol. Volume is derived: 1 L = 1 dm³ = 1000 cm³, and 1 mL = 1 cm³ exactly.',
      'Prefixes to know cold: G 10⁹, M 10⁶, k 10³, c 10⁻², m 10⁻³, μ 10⁻⁶, n 10⁻⁹, p 10⁻¹². A nanometre is 10⁻⁹ m, so 635 nm = 6.35 × 10⁻⁷ m - the conversion every light problem in Chapter 7 starts with.',
      'Temperature: K = °C + 273.15. A temperature CHANGE is the same size in °C and K, so ΔT in a calorimetry problem never needs converting - but an absolute temperature in a gas law always does.',
      'Significant figures: every nonzero digit counts; zeros between nonzero digits count; leading zeros never count (0.0055 has 2); trailing zeros count only if there is a decimal point (5300. has 4, 5300 has 2). Exact numbers - counts and defined conversions like 1000 mL = 1 L - have unlimited sig figs.',
      'Multiply or divide: the answer keeps the FEWEST SIG FIGS of any measurement. Add or subtract: the answer keeps the FEWEST DECIMAL PLACES. Mixed operations: do the addition or subtraction first, note its sig figs, then carry on.',
      'Round only at the end. Rounding each step drifts answers by a unit in the last place, and exam choices are often one unit apart.',
      'This course rounds an exact 5 to EVEN (Lecture 1 slides): 1.45 → 1.4 but 1.75 → 1.8, and 1.4500 → 1.4. A 5 followed by any nonzero digit rounds up as usual (1.4564 → 1.5). The textbook rounds every 5 up - on CHM 11510 exams use the lecture rule.',
      'Density = mass/volume. Water is 1.00 g/mL, so for a dilute aqueous solution mL of solution ≈ g of solution - the shortcut every coffee-cup calorimetry problem uses.',
      'Dimensional analysis: write the given quantity, then multiply by conversion factors arranged so the unwanted unit cancels diagonally. If the units come out right the arithmetic usually is too.',
      'Accuracy is closeness to the true value; precision is agreement between repeated measurements. Systematic error hurts accuracy; random error hurts precision. Tightly clustered but wrong is precise and inaccurate.',
      'Cubed and squared units convert with the factor cubed or squared: 1 m³ = (100 cm)³ = 10⁶ cm³, not 100 cm³.'
    ]
  },
  {
    n: 2, lessons: [2, 3], exam: 'x1', sections: '2.3-2.7',
    type: 'rock', teamTypes: ['rock', 'electric'], ace: 476,
    route: 'Route 2 - Gold Foil Pass',
    title: 'Atoms, Ions and Chemical Names',
    leader: 'Ernest Foyle', epithet: 'Mostly Empty Space', badge: 'Nucleus Badge',
    blurb: 'The mass laws that proved atoms exist, what lives inside one, isotopes and average atomic mass, the ions each group makes, and naming what they build.',
    notes: [
      'Law of mass conservation: total mass is unchanged in a chemical reaction. Law of definite composition: a compound always has the same elements in the same mass fractions. Law of multiple proportions: when two elements make more than one compound, the masses of one that combine with a fixed mass of the other are in small whole-number ratios.',
      'Dalton: atoms of an element are identical in mass and properties and are rearranged, not created or destroyed, in reactions. (Isotopes later broke "identical in mass".)',
      'Thomson’s cathode rays found the electron (negative, tiny mass). Millikan’s oil drop measured its charge. Rutherford’s gold foil: most alpha particles passed straight through, a few bounced back - so the atom is mostly empty space around a tiny, dense, positive nucleus.',
      'Atomic number Z = protons (defines the element). Mass number A = protons + neutrons. Neutrons N = A − Z. Electrons in an ion = Z − charge, so ³²S²⁻ has 16 p, 16 n, 18 e⁻.',
      'Isotopes: same Z, different N. Average atomic mass = Σ(isotopic mass × fractional abundance). The average sits closer to the more abundant isotope - a quick check on any answer.',
      'The periodic table: periods are rows, groups are columns. Group 1 alkali metals (+1), Group 2 alkaline earth metals (+2), Group 17 halogens (−1), Group 18 noble gases. Metals are on the left, nonmetals upper right, metalloids along the staircase (B, Si, Ge, As, Sb, Te).',
      'Main-group ions reach the nearest noble gas: Na⁺, Mg²⁺, Al³⁺, N³⁻, O²⁻, F⁻, S²⁻, Cl⁻. Metals lose electrons to become cations; nonmetals gain electrons to become anions.',
      'Ionic compounds (metal + nonmetal) are named cation then anion; transition-metal cations need a Roman numeral for their charge (iron(III) oxide = Fe₂O₃). Molecular (binary nonmetal) compounds use prefixes: dinitrogen tetroxide = N₂O₄; mono- is dropped on the first element.',
      'Polyatomic ions to know by heart: NH₄⁺ ammonium, OH⁻ hydroxide, NO₃⁻ nitrate, NO₂⁻ nitrite, SO₄²⁻ sulfate, SO₃²⁻ sulfite, PO₄³⁻ phosphate, CO₃²⁻ carbonate, HCO₃⁻ hydrogen carbonate, ClO₄⁻ perchlorate, ClO₃⁻ chlorate, ClO₂⁻ chlorite, ClO⁻ hypochlorite, CH₃COO⁻ acetate, CN⁻ cyanide, MnO₄⁻ permanganate, CrO₄²⁻ chromate, Cr₂O₇²⁻ dichromate.',
      'Formula (molecular) mass = sum of the atomic masses in the formula. Ca(OH)₂ counts the O and H twice: 40.08 + 2(16.00 + 1.008) = 74.10 amu.'
    ]
  },
  {
    n: 3, lessons: [3, 4], exam: 'x1', sections: '3.1, 3.3-3.4',
    type: 'ground', teamTypes: ['ground', 'normal'], ace: 232,
    route: 'Route 3 - Avogadro’s Quarry',
    title: 'The Mole and Stoichiometry',
    leader: 'Amedeo Kask', epithet: 'Count by Weighing', badge: 'Mole Badge',
    blurb: 'The mole as a counting unit, molar mass, balancing equations, and the grams-to-moles-to-moles-to-grams road every reaction calculation travels.',
    notes: [
      'One mole = 6.022 × 10²³ entities. Molar mass (g/mol) has the same number as the formula mass (amu). Grams ÷ molar mass = moles; moles × 6.022 × 10²³ = particles.',
      'Atoms inside a compound: multiply by the subscript. 0.50 mol of Fe₂O₃ contains 1.0 mol of Fe atoms and 1.5 mol of O atoms.',
      'Mass percent of an element = (mass of that element in one mole) ÷ (molar mass) × 100.',
      'Balance by changing COEFFICIENTS only, never subscripts. Balance elements that appear in one compound on each side first; leave free elements (O₂, H₂, Fe) for last; keep polyatomic ions as units if they survive unchanged.',
      'The mole ratio comes from the coefficients and only works in MOLES. Never put grams into a coefficient ratio.',
      'The road: grams A → (÷ M_A) → mol A → (× coefficient ratio) → mol B → (× M_B) → grams B.',
      'Limiting reactant: convert each reactant to moles of the SAME product. The one that makes less product is limiting, and that smaller amount is the theoretical yield. The reactant with the smaller mass is not necessarily limiting.',
      'Excess left over = starting moles of the excess reactant − moles it actually used (from the limiting reactant and the mole ratio).',
      'Percent yield = actual ÷ theoretical × 100. Both must be in the same units, and the theoretical yield always comes from the limiting reactant.',
      'Combustion of a hydrocarbon in excess O₂ gives CO₂ and H₂O. Balance C, then H, then O last - and if O comes out odd, double everything.'
    ]
  },
  {
    n: 4, lessons: [5, 6], exam: 'x1', sections: '4.1-4.3',
    type: 'water', teamTypes: ['water', 'poison'], ace: 73,
    route: 'Route 4 - Precipitate Falls',
    title: 'Solutions and Aqueous Reactions',
    leader: 'Lena Titra', epithet: 'Watch for What Falls Out', badge: 'Solubility Badge',
    blurb: 'Molarity, dilution, electrolytes, the solubility table, net ionic equations, strong acids and titration.',
    notes: [
      'Molarity M = moles of solute ÷ LITRES OF SOLUTION (not litres of solvent). So moles = M × V(L), and V = moles ÷ M.',
      'Dilution keeps the moles of solute fixed: M₁V₁ = M₂V₂. The volumes just need the same units on both sides.',
      'Ions in solution: 0.10 M Ca(NO₃)₂ is 0.10 M in Ca²⁺ and 0.20 M in NO₃⁻ - multiply by the subscript. 451 mL of 0.0120 M Ca(OH)₂ holds 2 × 0.451 × 0.0120 = 0.0108 mol OH⁻.',
      'Strong electrolytes break completely into ions (soluble ionic compounds, strong acids, strong bases). Weak electrolytes ionize only partly (weak acids like acetic acid, weak bases like NH₃). Nonelectrolytes stay as molecules (sugar, alcohols).',
      'The six strong acids in this course: HCl, HBr, HI, HNO₃, H₂SO₄, HClO₄. Every other acid you meet is weak. Strong bases: Group 1 hydroxides plus Ca(OH)₂, Sr(OH)₂ and Ba(OH)₂.',
      'Solubility table (given on the exam): Group 1, NH₄⁺, NO₃⁻, acetate, ClO₃⁻ and ClO₄⁻ compounds are always soluble. Cl⁻, Br⁻, I⁻ are soluble except with Ag⁺, Pb²⁺, Cu⁺, Hg₂²⁺. Sulfates are soluble except Ca, Sr, Ba, Ag, Pb and Hg₂²⁺. Hydroxides, carbonates, chromates, phosphates and sulfides are insoluble except with Group 1 and NH₄⁺ (and some Group 2 hydroxides and sulfides).',
      'Three equations: molecular (whole formulas), total ionic (every strong electrolyte split into ions, with states), net ionic (spectators crossed out). Solids, liquids, gases and weak electrolytes are NEVER split.',
      'Precipitation: the key event is a solid forming - Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s). Neutralization: acid + base → salt + water; for strong acid + strong base the net ionic equation is always H⁺(aq) + OH⁻(aq) → H₂O(l).',
      'Titration: at the equivalence point, moles of H⁺ supplied = moles of OH⁻ supplied. For diprotic H₂SO₄ each mole delivers 2 mol H⁺.',
      'Solution stoichiometry is the Chapter 3 road with a different on-ramp: volume × molarity → moles → mole ratio → moles → mass (or ÷ molarity → volume).'
    ]
  },
  {
    n: 5, lessons: [7, 8, 9], exam: 'x2', sections: '6.1-6.6',
    type: 'fire', teamTypes: ['fire', 'ground'], ace: 467,
    route: 'Route 5 - The Coffee-Cup Caldera',
    title: 'Thermochemistry',
    leader: 'Hessa Kalor', epithet: 'Heat Ignores the Path', badge: 'Enthalpy Badge',
    blurb: 'System and surroundings, the signs of q and w, calorimetry, thermochemical equations, Hess’s law and enthalpies of formation.',
    notes: [
      'ΔE = q + w. Signs are from the SYSTEM’s point of view: heat absorbed by the system is q > 0, heat released is q < 0; work done ON the system is w > 0, work done BY the system is w < 0.',
      'Pressure-volume work: w = −PΔV. An expanding gas (ΔV > 0) does work on the surroundings, so w is negative. Convert L·atm to joules with 1 L·atm = 101.3 J.',
      'ΔH = q at constant pressure. ΔH < 0 is EXOTHERMIC (heat released, surroundings warm up); ΔH > 0 is ENDOTHERMIC (heat absorbed, surroundings cool). ΔH = H(products) − H(reactants).',
      'q = m·c·ΔT with ΔT = T(final) − T(initial). Water: c = 4.184 J/(g·°C) and 1.00 g/mL. A ΔT in °C equals the ΔT in K.',
      'Calorimetry is bookkeeping: heat lost = heat gained. q(rxn) = −q(solution), and for a hot metal dropped in water, −q(metal) = q(water). Both final temperatures are the SAME number.',
      'ΔH per mole: divide q(rxn) by moles of the LIMITING reactant (or of the product the question names). In the classic 50.0 mL NaOH + 25.0 mL HCl problem HCl is limiting; dividing by NaOH halves the answer.',
      'A thermochemical equation’s ΔH is for the moles written. Double the equation, double ΔH. Reverse it, change the sign. Use ΔH like a mole ratio: −891 kJ per 1 mol CH₄.',
      '"Heat released" is already a negative ΔH. If an exam asks for a mass from "74.3 kJ released", the mass comes out positive: 3.00 g of Mg, not −3.00 g.',
      'Hess’s law: flip, scale, add. ΔH depends only on the start and end states (a state function), so any route between them gives the same total.',
      'Standard enthalpy of formation ΔH°f: forms ONE mole of compound from its elements in their standard states at 298 K and 1 atm. Elements in their standard state (O₂(g), C(graphite), Na(s), Br₂(l)) have ΔH°f = 0; O₃, C(diamond) and Cl(g) do not.',
      'ΔH°rxn = Σ n·ΔH°f(products) − Σ m·ΔH°f(reactants). Multiply each by its coefficient, and read the PHASE: H₂O(l) is −285.8 kJ/mol, H₂O(g) is −241.8 kJ/mol.',
      'Phase changes: ΔH(vap) and ΔH(fus) are positive; condensing and freezing release the same amount (negative). Making liquid water instead of steam makes a combustion MORE exothermic.'
    ]
  },
  {
    n: 6, lessons: [10, 11, 12], exam: 'x2', sections: '7.1-7.4',
    type: 'electric', teamTypes: ['electric', 'fairy'], ace: 171,
    route: 'Route 6 - The Spectral Line',
    title: 'Light and Quantum Theory',
    leader: 'Max Planck-Rydell', epithet: 'Energy Comes in Packets', badge: 'Photon Badge',
    blurb: 'Waves and photons, the electromagnetic spectrum, hydrogen’s line spectrum and the Bohr model, matter waves, and the four quantum numbers.',
    notes: [
      'c = λν with c = 2.998 × 10⁸ m/s. Wavelength and frequency are inversely proportional. Convert nm to m first (× 10⁻⁹).',
      'Photon energy E = hν = hc/λ with h = 6.626 × 10⁻³⁴ J·s. Short wavelength = high frequency = high energy. For a MOLE of photons multiply by 6.022 × 10²³ and divide by 1000 for kJ/mol.',
      'Electromagnetic spectrum in order of INCREASING wavelength (decreasing energy): gamma < X-ray < ultraviolet < visible < infrared < microwave < radio. Within visible: violet (~400 nm) is shortest and most energetic, red (~700 nm) is longest.',
      'Amplitude is the height of the wave = intensity (brightness). It does not change the energy of each photon; only frequency does.',
      'Photoelectric effect: no electrons are ejected below a threshold frequency, however bright the light. Brighter light above threshold ejects MORE electrons, not faster ones. That is why light must come in quanta.',
      'Bohr model of hydrogen: Eₙ = −2.18 × 10⁻¹⁸ J (1/n²). ΔE = −2.18 × 10⁻¹⁸ J (1/n²final − 1/n²initial). A drop to lower n EMITS a photon (ΔE negative for the atom); a jump up ABSORBS one.',
      'Series: transitions ending at n = 1 are ultraviolet (Lyman), ending at n = 2 are visible (Balmer), ending at n = 3 are infrared (Paschen). The 5 → 1 transition gives a 95.0 nm photon.',
      'de Broglie: λ = h/(mv). Use kg and m/s. Faster or heavier means SHORTER wavelength. A baseball’s wavelength is too tiny to observe; an electron’s is about the size of an atom.',
      'Heisenberg: Δx·mΔv ≥ h/4π. You cannot pin down both position and speed of an electron, which is why we speak of orbitals (probability) instead of orbits.',
      'Quantum numbers: n = 1, 2, 3, … (size/energy); l = 0 to n − 1 (shape: s, p, d, f for 0, 1, 2, 3); mₗ = −l … +l (orientation); mₛ = +½ or −½ (spin). A level n has n sublevels and n² orbitals.',
      'Count nodes: total nodes = n − 1; angular nodes = l; radial nodes = n − l − 1. A 3p orbital has 1 radial and 1 angular node.',
      'Impossible sets are an exam favourite: n = 2, l = 2 is impossible (l < n); l = 1, mₗ = −2 is impossible (|mₗ| ≤ l); no "2d" or "1p" sublevel exists.'
    ]
  },
  {
    n: 7, lessons: [13, 14], exam: 'x2', sections: '8.1-8.4',
    type: 'psychic', teamTypes: ['psychic', 'steel'], ace: 376,
    route: 'Route 7 - Mendeleev’s Staircase',
    title: 'Electron Configuration and Periodicity',
    leader: 'Dmitra Aufbaum', epithet: 'Fill From the Bottom Up', badge: 'Aufbau Badge',
    blurb: 'Pauli, Hund and aufbau, configurations and orbital diagrams, the periodic trends in size, ionization energy and electron affinity, and the ions that come out of them.',
    notes: [
      'Pauli exclusion: no two electrons share all four quantum numbers, so an orbital holds at most 2 electrons with opposite spins. Sublevel capacities: s 2, p 6, d 10, f 14.',
      'In many-electron atoms, shielding and penetration split the sublevels: for the same n, energy rises s < p < d < f. That is why 4s fills before 3d.',
      'Aufbau filling order: 1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s 4f 5d 6p. Read it off the periodic table: s-block (groups 1-2), p-block (13-18), d-block (transition metals, n − 1), f-block (n − 2).',
      'Hund’s rule: in a set of equal-energy orbitals, put one electron in each with parallel spins before pairing any. Nitrogen 2p³ has three unpaired electrons.',
      'Condensed configurations use the previous noble gas: Fe = [Ar] 4s² 3d⁶. Valence electrons of a main-group element = its outer s + p electrons (= the group number’s last digit).',
      'Exceptions you must know: Cr = [Ar] 4s¹ 3d⁵ and Cu = [Ar] 4s¹ 3d¹⁰ (half-filled and filled d sets are extra stable). Mo and Ag follow the same pattern.',
      'Transition-metal cations lose their ns electrons BEFORE (n−1)d: Fe²⁺ = [Ar] 3d⁶, Fe³⁺ = [Ar] 3d⁵. Writing Fe²⁺ as [Ar] 4s² 3d⁴ is the classic trap.',
      'Paramagnetic = at least one unpaired electron (attracted to a magnet). Diamagnetic = all paired. Zn²⁺ ([Ar] 3d¹⁰) is diamagnetic; Fe³⁺ has 5 unpaired electrons.',
      'Atomic radius: increases DOWN a group (new shell) and decreases ACROSS a period left to right (higher effective nuclear charge, same shell). Biggest: lower left (Cs, Fr). Smallest: upper right (He).',
      'First ionization energy: the opposite of radius - increases across a period, decreases down a group. Two dips: Group 13 is below Group 2 (removing a higher-energy p electron) and Group 16 is below Group 15 (removing a paired electron).',
      'Successive ionization energies jump hugely once you start removing CORE electrons. Mg: IE₁, IE₂ small, IE₃ enormous - so Mg forms Mg²⁺ and has 2 valence electrons.',
      'Ions: cations are SMALLER than their parent atoms, anions LARGER. In an isoelectronic series (O²⁻, F⁻, Na⁺, Mg²⁺ all have 10 e⁻) the radius shrinks as nuclear charge rises: O²⁻ > F⁻ > Na⁺ > Mg²⁺.',
      'Electron affinity is usually negative (energy released) and becomes more negative across a period, with the halogens most negative. Adding a second electron (O⁻ → O²⁻) always costs energy.',
      'Metallic character increases down and to the left. Metal oxides are basic (Na₂O + H₂O → NaOH); nonmetal oxides are acidic (SO₃ + H₂O → H₂SO₄); Al₂O₃ is amphoteric.'
    ]
  },
  {
    n: 8, lessons: [15, 16], exam: 'x3', sections: '9.1-9.6',
    type: 'fighting', teamTypes: ['fighting', 'steel'], ace: 448,
    route: 'Route 8 - Lattice Ridge',
    title: 'Models of Chemical Bonding',
    leader: 'Linus Paulsen', epithet: 'Share, Steal or Pool', badge: 'Bond Badge',
    blurb: 'Ionic, covalent and metallic bonding, Lewis dot symbols, lattice energy, bond order, length and energy, ΔH from bond energies, and electronegativity.',
    notes: [
      'Three models: ionic (metal + nonmetal, electron transfer, large ΔEN), covalent (nonmetals, electrons shared), metallic (metals, a "sea" of delocalized valence electrons).',
      'Lewis dot symbols show valence electrons only. Main-group atoms bond toward an octet (H toward 2).',
      'Lattice energy ΔH°lattice is the energy to separate one mole of an ionic solid into gaseous ions - always positive, and larger when the ions are smaller and more highly charged (Coulomb’s law, ∝ q₁q₂/r). MgO ≫ NaF; LiF > NaCl > KBr.',
      'Charge beats size: doubling both charges quadruples the attraction, which is why MgO’s lattice energy is about four times NaF’s even though the ions are similar in size.',
      'The Born-Haber cycle is Hess’s law for an ionic solid: atomize the metal, ionize it, atomize the nonmetal, add its electron affinity, then the lattice step. The step that makes ionic solids stable overall is the very exothermic lattice formation.',
      'Ionic solids: high melting points, hard and brittle, conduct when melted or dissolved but not as solids. Covalent molecular substances: low melting points, nonconducting.',
      'Bond order = number of shared pairs between two atoms. Higher bond order means SHORTER and STRONGER: C≡C < C=C < C−C in length, and the reverse in bond energy.',
      'Bond energy (BE) is always positive - the energy to BREAK one mole of bonds in the gas phase. ΔH°rxn ≈ ΣBE(bonds broken) − ΣBE(bonds formed). Note the order: reactants minus products, the reverse of the ΔH°f formula.',
      'Electronegativity rises up and to the right (F = 4.0 is the highest; O 3.5, N and Cl 3.0, C 2.5, H 2.1). ΔEN ≈ 0 nonpolar covalent; 0 < ΔEN < 1.7 polar covalent; ΔEN ≳ 1.7 mostly ionic. It is a continuum, not three boxes.',
      'In a polar bond the more electronegative atom carries δ−. Bond polarity is about one bond; whether a whole molecule is polar is a Chapter 10 question.'
    ]
  },
  {
    n: 9, lessons: [17, 18, 19], exam: 'x3', sections: '10.1-10.3',
    type: 'ice', teamTypes: ['ice', 'rock'], ace: 615,
    route: 'Route 9 - Tetrahedral Glacier',
    title: 'Lewis Structures and Molecular Shape',
    leader: 'Gillespie Nyholm', epithet: 'Electron Groups Keep Their Distance', badge: 'Geometry Badge',
    blurb: 'Drawing Lewis structures, resonance and formal charge, octet exceptions, VSEPR electron-group and molecular geometries, bond angles, and whether a molecule is polar.',
    notes: [
      'Lewis recipe (Silberberg’s order): (1) place the atoms - least electronegative atom in the centre, never H; (2) count TOTAL valence electrons, adding one per negative charge and removing one per positive charge; (3) single bonds to each outer atom; (4) complete outer octets, then put leftovers on the centre; (5) if the centre still lacks an octet, turn lone pairs into multiple bonds.',
      'Formal charge = valence electrons − (lone-pair electrons + ½ bonding electrons). The best structure has formal charges closest to zero, with any negative charge on the more electronegative atom. Formal charges sum to the overall charge.',
      'Resonance: when more than one valid structure differs only in where electrons sit, the real molecule is the average (a hybrid). NO₃⁻ and CO₃²⁻ have three equal bonds of bond order 4/3; O₃ has two equal bonds of order 1.5.',
      'Octet exceptions: electron-deficient centres (Be with 4 e⁻ in BeCl₂, B with 6 in BF₃); odd-electron molecules (NO, NO₂); and expanded octets for period 3 and below (PCl₅, SF₆, XeF₄, I₃⁻), which can use d orbitals.',
      'VSEPR counts ELECTRON GROUPS around the central atom: each lone pair and each BOND (single, double or triple alike) is one group. 2 linear 180°, 3 trigonal planar 120°, 4 tetrahedral 109.5°, 5 trigonal bipyramidal 90°/120°, 6 octahedral 90°.',
      'Molecular shape names only the atoms: 4 groups with 1 lone pair is trigonal pyramidal (NH₃), with 2 is bent (H₂O); 3 groups with 1 lone pair is bent (SO₂); 5 groups give seesaw, T-shaped and linear; 6 give square pyramidal and square planar.',
      'Lone pairs repel more than bonding pairs and squeeze the angles: CH₄ 109.5°, NH₃ 107°, H₂O 104.5°. Double bonds also repel a little more than single bonds.',
      'In trigonal bipyramidal geometry lone pairs go EQUATORIAL (that is why SF₄ is a seesaw and I₃⁻ is linear). In octahedral, two lone pairs go opposite each other (XeF₄ is square planar).',
      'A molecule is polar if it has polar bonds AND a shape that does not cancel them. CO₂, BF₃, CH₄, CCl₄, SF₆, XeF₄ and PCl₅ are nonpolar despite polar bonds; H₂O, NH₃, SO₂, CH₂Cl₂ and CHCl₃ are polar.',
      'Check both steps every time: a symmetric shape with DIFFERENT outer atoms (CH₃Cl) is polar.'
    ]
  },
  {
    n: 10, lessons: [20, 21, 22], exam: 'x3', sections: '12.1-12.3, 12.6',
    type: 'ice', teamTypes: ['water', 'ice'], ace: 365,
    route: 'Route 10 - Triple Point Lake',
    title: 'Intermolecular Forces, Phases and Solids',
    leader: 'Clausia Clapey', epithet: 'Between the Molecules', badge: 'Phase Badge',
    blurb: 'Dispersion, dipole-dipole and hydrogen bonding, boiling points, heating curves, vapor pressure, phase diagrams, and the crystal lattices of solids.',
    notes: [
      'Intermolecular forces (between molecules) are much weaker than bonds (within them). Boiling a liquid breaks IMFs, never covalent bonds - steam is still H₂O.',
      'London dispersion forces act between ALL molecules and grow with molar mass and surface area (more polarizable electron clouds). Long, unbranched molecules beat compact, branched isomers.',
      'Dipole-dipole forces act between polar molecules. Hydrogen bonding is an especially strong dipole-dipole force: an H covalently bonded to N, O or F, attracted to a lone pair on another N, O or F. C−H never hydrogen bonds.',
      'Ion-dipole forces hold ions in water and are the strongest of the group. Ranking: ion-dipole > H-bond > dipole-dipole > dispersion, but a large enough molecule’s dispersion can beat a small molecule’s dipole forces.',
      'Stronger IMFs mean a higher boiling point, melting point, ΔH(vap), surface tension and viscosity, and a LOWER vapor pressure.',
      'Heating curve: on sloped segments q = m·c·ΔT for that phase; on flat segments (melting, boiling) the temperature stays constant and q = n·ΔH(phase change). Vaporizing takes far more energy than melting.',
      'Vapor pressure rises with temperature. A liquid boils when its vapor pressure equals the external pressure, so at high altitude water boils below 100 °C. Normal boiling point = vapor pressure 1 atm.',
      'Clausius-Clapeyron: ln(P₂/P₁) = −(ΔH(vap)/R)(1/T₂ − 1/T₁), with R = 8.314 J/(mol·K), T in kelvin and ΔH in J/mol.',
      'Phase diagram: the triple point is where all three phases coexist; past the critical point liquid and gas become one supercritical fluid. Water’s solid-liquid line slopes LEFT (ice is less dense than liquid water), so pressure can melt ice.',
      'Cubic unit cells: simple cubic 1 atom per cell (8 corners × ⅛); body-centred cubic 2 (+1 in the centre); face-centred cubic 4 (+6 faces × ½). Edge length and radius: SC a = 2r, BCC a = 4r/√3, FCC a = 2√2 r.',
      'Density of a crystal = (atoms per cell × molar mass ÷ 6.022 × 10²³) ÷ a³, with a in cm. Packing efficiency: SC 52%, BCC 68%, FCC and hexagonal close-packed 74%.',
      'Types of solids: atomic (noble gases), molecular (ice, I₂ - soft, low mp), ionic (NaCl - hard, brittle, high mp), metallic (Cu - malleable, conducts), network covalent (diamond, quartz SiO₂ - hardest, highest mp).'
    ]
  },
  {
    n: 11, lessons: [23, 24], exam: 'x3', sections: '13.1, 13.6, 15.6',
    type: 'grass', teamTypes: ['grass', 'bug'], ace: 272,
    route: 'Route 11 - Osmotic Marsh',
    title: 'Solutions, Colligative Properties and Biomolecules',
    leader: 'Raoul Van’t-Hoff', epithet: 'Count the Particles, Not Their Kind', badge: 'Colligative Badge',
    blurb: 'Like dissolves like, the forces at work in solutions, molality and the van ’t Hoff factor, vapor-pressure lowering, boiling and freezing point shifts, osmotic pressure, and the macromolecules of life.',
    notes: [
      'Like dissolves like: polar and ionic solutes dissolve in polar solvents (water); nonpolar solutes dissolve in nonpolar solvents (hexane). Methanol mixes with water (H-bonds) while octanol barely does (long nonpolar tail).',
      'Ion-dipole forces dissolve salts; H-bonding dissolves alcohols, sugars and NH₃; dispersion forces dissolve nonpolar molecules in nonpolar solvents.',
      'Colligative properties depend on the NUMBER of solute particles, not their identity: vapor-pressure lowering, boiling-point elevation, freezing-point depression and osmotic pressure.',
      'Molality m = moles of solute ÷ KILOGRAMS OF SOLVENT (not solution). It does not change with temperature, which is why the boiling and freezing formulas use it.',
      'The van ’t Hoff factor i counts particles per formula unit: glucose 1, NaCl 2, CaCl₂ 3, Al₂(SO₄)₃ 5. Weak electrolytes sit just above 1.',
      'ΔT(b) = i·K(b)·m and ΔT(f) = i·K(f)·m. Water: K(b) = 0.512 °C/m, K(f) = 1.86 °C/m. The boiling point goes UP and the freezing point goes DOWN.',
      'Raoult’s law: P(solution) = X(solvent) · P°(solvent). Adding a nonvolatile solute LOWERS the vapor pressure.',
      'Osmotic pressure Π = i·M·R·T with R = 0.08206 L·atm/(mol·K) and T in kelvin. Water flows from low solute concentration to high across a semipermeable membrane.',
      'Molar mass from a colligative measurement: ΔT → molality → moles of solute (× kg solvent) → molar mass = grams ÷ moles.',
      'Biomolecules: proteins are chains of amino acids joined by peptide (amide) bonds; primary structure is the sequence, secondary is α-helix and β-sheet (H-bonds along the backbone), tertiary is the overall fold, quaternary is several chains together.',
      'Polysaccharides (starch, cellulose, glycogen) are chains of sugar units. DNA is a double helix held together by hydrogen bonds between base pairs: A-T (2 H-bonds) and G-C (3 H-bonds), with dispersion forces from base stacking.'
    ]
  },
  {
    n: 12, lessons: [25, 26], exam: 'final', sections: 'Ch 5',
    type: 'flying', teamTypes: ['flying', 'ghost'], ace: 426,
    route: 'Route 12 - Barometer Bluff',
    title: 'Gases',
    leader: 'Evangelista Torre', epithet: 'PV = nRT, Every Time', badge: 'Pressure Badge',
    blurb: 'Pressure and its units, the gas laws, PV = nRT, gas density and molar mass, gas stoichiometry, partial pressures, kinetic-molecular theory, effusion and real gases. Tested only on the Final.',
    notes: [
      'Pressure units: 1 atm = 760 mmHg = 760 torr = 101.325 kPa = 1.01325 bar. Gas-law temperatures are ALWAYS in kelvin.',
      'Boyle P₁V₁ = P₂V₂ (constant n, T). Charles V₁/T₁ = V₂/T₂. Gay-Lussac P₁/T₁ = P₂/T₂. Avogadro V₁/n₁ = V₂/n₂. All of them are PV = nRT with something held fixed.',
      'Ideal gas law PV = nRT, R = 0.08206 L·atm/(mol·K) (or 8.314 J/(mol·K)). Match R’s units: litres, atmospheres, moles, kelvin.',
      'STP is 0 °C (273.15 K) and 1 atm, where one mole of ideal gas occupies 22.4 L.',
      'Gas density d = PM/RT, so molar mass M = dRT/P. Denser gases have larger molar masses at the same T and P.',
      'Dalton’s law: P(total) = ΣP(i), and P(i) = X(i)·P(total) with mole fraction X(i) = n(i)/n(total). Gas collected over water: P(gas) = P(total) − P(water vapor).',
      'Gas stoichiometry: PV = nRT turns a volume into moles; then the usual mole ratio. At the same T and P, volumes react in the same ratio as the coefficients.',
      'Kinetic-molecular theory: particles have negligible volume, no attractions, elastic collisions, and average kinetic energy proportional to absolute temperature. At the same T every gas has the same average KE.',
      'Root-mean-square speed u(rms) = √(3RT/M) with R = 8.314 and M in kg/mol. Lighter molecules move faster.',
      'Graham’s law: rate₁/rate₂ = √(M₂/M₁). H₂ effuses four times as fast as O₂ (√(32/2) = 4).',
      'Real gases deviate most at HIGH pressure (molecular volume matters) and LOW temperature (attractions matter). van der Waals: (P + an²/V²)(V − nb) = nRT; a corrects for attractions, b for volume.'
    ]
  },
  {
    n: 13, lessons: [27, 28], exam: 'final', sections: '24.1, 24.5-24.7',
    type: 'dragon', teamTypes: ['dragon', 'poison'], ace: 691,
    route: 'Route 13 - Half-Life Hollow',
    title: 'Nuclear Chemistry',
    leader: 'Marie Becquerel', epithet: 'Half Remains', badge: 'Isotope Badge',
    blurb: 'Alpha, beta, positron, gamma and electron capture, balancing nuclear equations, the band of stability, half-life, mass defect and binding energy, fission and fusion. Tested only on the Final.',
    notes: [
      'Nuclear equations balance MASS NUMBER (top) and ATOMIC NUMBER (bottom) separately. Chemical reactions never change the nucleus; nuclear reactions do.',
      'Alpha ⁴₂He: A − 4, Z − 2. Beta ⁰₋₁β (a neutron becomes a proton): A same, Z + 1. Positron ⁰₊₁β (a proton becomes a neutron): A same, Z − 1. Electron capture (a proton captures an electron): A same, Z − 1. Gamma: no change in A or Z.',
      'Penetrating power: alpha < beta < gamma. Alpha is stopped by paper or skin but is the most damaging if ingested.',
      'Band of stability: the stable N/Z ratio is about 1 for light nuclei and rises to about 1.5 for heavy ones. Above the band (too many neutrons) → beta decay. Below the band (too many protons) → positron emission or electron capture. Z > 83 → alpha decay.',
      'Magic numbers (2, 8, 20, 28, 50, 82 and N = 126) and even numbers of protons and neutrons go with stability.',
      'Half-life: after n half-lives the fraction left is (½)ⁿ. Radioactive decay is first order: ln(N/N₀) = −kt and k = 0.693/t½. 12.5% left means three half-lives.',
      'Mass-energy: ΔE = Δm·c². The mass defect is the mass of the separate nucleons minus the mass of the nucleus; the binding energy is that defect times c². 1 amu ≈ 931.5 MeV.',
      'Binding energy per nucleon peaks near ⁵⁶Fe. Heavy nuclei release energy by FISSION (splitting), light nuclei by FUSION (joining).',
      'Fission chain reactions need a critical mass. Fusion powers the Sun and needs enormous temperatures to overcome proton-proton repulsion.',
      'Applications: radioactive tracers, medical imaging and therapy, carbon-14 dating (t½ ≈ 5730 yr) of once-living material.'
    ]
  }
];

/* ==========================================================================
   FOUR BOSS BATTLES - the evening exams, where the calendar puts them.
   Exams are on paper, 60 minutes, multiple choice, about half conceptual and
   half calculation, and "likely to include questions taken from homework".
   ========================================================================== */
window.CHEM_ELITE = [
  {
    id: 'x1', name: 'Wren Scantly', epithet: 'Evening Exam 1',
    types: ['water', 'steel'], ace: 9,
    after: 4, lessons: [1, 6],
    chapters: [1, 2, 3, 4, 91],
    date: 'Thu Sept 24, 8:00-9:00 PM',
    route: 'Revision Route I - The Fundamentals Flats',
    intro: 'Six lectures of fundamentals, sixty minutes, one scantron. Units, atoms, moles, molarity and what falls out of solution. The solubility table is on the back page. Begin.',
    rematch: 'The fundamentals never leave. Sit down again.'
  },
  {
    id: 'x2', name: 'Ione Ardent', epithet: 'Evening Exam 2',
    types: ['fire', 'psychic'], ace: 6,
    after: 7, lessons: [7, 14],
    chapters: [5, 6, 7, 92],
    date: 'Wed Oct 21, 8:00-9:00 PM',
    route: 'Revision Route II - The Emission Coast',
    intro: 'Heat, light and where the electrons sit. Signs on every ΔH, nanometres converted before anything else, and Fe²⁺ loses its 4s electrons first. Begin.',
    rematch: 'Check the sign. Then check the units. Then begin.'
  },
  {
    id: 'x3', name: 'Cassius Vell', epithet: 'Evening Exam 3',
    types: ['ice', 'fighting'], ace: 282,
    after: 11, lessons: [15, 24],
    chapters: [8, 9, 10, 11, 93],
    date: 'Thu Nov 19, 8:00-9:00 PM',
    route: 'Revision Route III - The Bonding Barrens',
    intro: 'Bonds, shapes, the forces between molecules and the particles in a solution. Draw the Lewis structure before you name the shape. Always.',
    rematch: 'Count the electron groups. Again.'
  },
  {
    id: 'final', name: 'Provost Nobel', epithet: 'CHM 11510 Final', champion: true,
    types: ['dragon', 'psychic'], ace: 149,
    after: 13, lessons: [1, 28], only: [25, 26, 27, 28],
    onlyNote: 'Gases and nuclear chemistry (lectures 25-28) are on no evening exam - only here',
    chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 91, 92, 93, 94],
    date: 'Finals week, Dec 14-19 (time TBA)',
    route: 'Revision Route IV - The Whole Periodic Coast',
    intro: 'Twenty-eight lectures, no warning about which. Gases and nuclear chemistry have never been on an evening exam. They are on this one.',
    rematch: 'Comprehensive means comprehensive. Sit down.'
  }
];

/* ==========================================================================
   THE COAST
   ========================================================================== */
window.CHEM_LOCATIONS = [
  { id: 'landing', name: 'Avogadro Landing', badges: 0,
    blurb: 'The ferry pier. A brass sign counts the people who have stepped off here; it is approaching 6.022 × 10²³.' },
  { id: 'resource', name: 'The Resource Room', badges: 0,
    blurb: 'Long tables, a periodic table on every wall, and TAs who will not give you the answer but will ask you what the units are.' },
  { id: 'brown', name: 'Brown Lab Terraces', badges: 2,
    blurb: 'Fume hoods in rows down the hillside. Goggles are not optional and the safety shower is always one step away.',
    locked: 'Lab access starts at two badges. Finish the safety quiz first.' },
  { id: 'spectra', name: 'Spectral Point', badges: 5,
    blurb: 'A lighthouse whose lamp burns hydrogen. Look through the prism and the light splits into four bright lines.',
    locked: 'The lighthouse keeper lets visitors up from five badges.' },
  { id: 'crystal', name: 'Crystal Caverns', badges: 9,
    blurb: 'Caves lined with salt cubes and quartz columns. Every surface is a unit cell, repeated.',
    locked: 'The caverns open at nine badges. Bring a light.' },
  { id: 'hall', name: 'Elliott Hall of Music', badges: 4,
    blurb: 'Where the evening exams are sat: six thousand seats, assigned, and a clock on the wall.',
    locked: 'The hall opens for exams. Come back with four badges.' }
];

window.CHEM_GYM_DIALOGUE = {
  1:  { intro: 'Before you calculate anything: how many significant figures does 0.00520 have? Three. If you said five, we have work to do.',
        rematch: 'Read the meniscus at eye level. Again.' },
  2:  { intro: 'Fire alpha particles at gold foil and most of them sail straight through. Tell me what that means, and then tell me how many neutrons are in chlorine-37.',
        rematch: 'Mostly empty space. Still.' },
  3:  { intro: 'Grams to moles, moles to moles, moles to grams. Never grams to grams. And the limiting reactant is not the one you have less of.',
        rematch: 'Convert to moles first. Always.' },
  4:  { intro: 'Mix two clear solutions and watch. If something falls out, you can write me its net ionic equation. If nothing does, you can tell me why.',
        rematch: 'Cross out the spectators. Again.' },
  5:  { intro: 'Heat released is negative. Work done by the system is negative. Get the sign wrong and the magnitude will not save you.',
        rematch: 'Flip, scale, add. Watch the sign.' },
  6:  { intro: 'Short wavelength, high frequency, high energy. Convert your nanometres before you touch h or c, and tell me whether that photon was emitted or absorbed.',
        rematch: 'Gamma rays are the SHORT ones. Again.' },
  7:  { intro: 'Fill from the bottom up, one per box before you pair, and when iron becomes Fe²⁺ the 4s electrons leave first. Every time.',
        rematch: 'Chromium and copper. You know the trick.' },
  8:  { intro: 'Share, steal or pool. Tell me which kind of bond, and tell me why magnesium oxide melts at 2800 °C when sodium fluoride manages less than half that.',
        rematch: 'Charge beats size. Again.' },
  9:  { intro: 'Draw the Lewis structure first. Count the electron groups. Only then name the shape - and only then tell me whether it is polar.',
        rematch: 'Lone pairs count. Bonds count once. Again.' },
  10: { intro: 'Boil water and the bonds stay whole; only the forces between molecules give way. Rank them for me, strongest first.',
        rematch: 'Does it hydrogen-bond? N, O or F. Again.' },
  11: { intro: 'The freezing point does not care whether you dissolved sugar or salt - only how many pieces landed in the water. Count the particles.',
        rematch: 'What is i for calcium chloride? Again.' },
  12: { intro: 'Kelvin. Always kelvin. If you put 25 into PV = nRT, the gas will not forgive you and neither will I.',
        rematch: 'Match R to your units. Again.' },
  13: { intro: 'Balance the top numbers and the bottom numbers separately, and remember: after three half-lives, one eighth remains.',
        rematch: 'Half remains. Then half of that.' }
};

/* The four exam review sets. They have no gym and no map row; they live on the
   exams' revision routes so the boss and its route can draw them. */
window.CHEM_EXAM_CHAPTERS = [
  { n: 91, examOnly: true, noteLabel: 'Exam 1', exam: 'x1', lessons: [1, 2, 3, 4, 5, 6], type: 'water', teamTypes: ['water', 'steel'],
    title: 'Exam 1 review: fundamentals in exam format',
    route: 'Revision Route I - The Fundamentals Flats',
    blurb: 'Multi-step problems in the style of the recitation worksheets and Evening Exam 1.',
    notes: [
      'Exam 1 covered Fundamentals 1-6 (Ch 1-4). It is behind you, but the Final is comprehensive and every later chapter leans on moles and molarity.',
      'Before any calculation write the balanced equation. Most lost points on stoichiometry are a skipped coefficient, not bad arithmetic.',
      'Sig figs on the scantron: answer choices are often the same number with different digits. Track sig figs from the given data.'
    ] },
  { n: 92, examOnly: true, noteLabel: 'Exam 2', exam: 'x2', lessons: [7, 8, 9, 10, 11, 12, 13, 14], type: 'fire', teamTypes: ['fire', 'psychic'],
    title: 'Exam 2 review: thermochemistry, quantum and periodicity in exam format',
    route: 'Revision Route II - The Emission Coast',
    blurb: 'Multi-step, exam-format problems for Evening Exam 2, Wednesday October 21.',
    notes: [
      'Exam 2 covers Thermochemistry 1-3, Quantum Theory 1-3 and Electron Configuration and Periodicity 1-2 (Ch 6, 7, 8). Check the posted learning objectives in case Models of Bonding 1 (Mon Oct 19) is also included.',
      'Every thermochemistry answer has a sign. Decide it from words like "released", "absorbed", "exothermic" before computing anything.',
      'Every light answer starts with a unit conversion. nm → m, kJ/mol → J/photon (÷ 6.022 × 10²³, × 1000).',
      'Every configuration answer for a transition-metal ion removes ns electrons first.'
    ] },
  { n: 93, examOnly: true, noteLabel: 'Exam 3', exam: 'x3', lessons: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24], type: 'ice', teamTypes: ['ice', 'fighting'],
    title: 'Exam 3 review: bonding, shape, IMFs and solutions in exam format',
    route: 'Revision Route III - The Bonding Barrens',
    blurb: 'Multi-step, exam-format problems for Evening Exam 3, Thursday November 19.',
    notes: [
      'Exam 3 covers Models of Bonding through Colligative Properties (Ch 9, 10, 12, 13 and 15.6).',
      'Lewis structure → electron groups → geometry → polarity → IMFs → physical properties. Most Exam 3 questions sit somewhere on that chain.'
    ] },
  { n: 94, examOnly: true, noteLabel: 'Final', exam: 'final', lessons: [1, 28], type: 'dragon', teamTypes: ['dragon', 'psychic'],
    title: 'Final review: the whole course in exam format',
    route: 'Revision Route IV - The Whole Periodic Coast',
    blurb: 'Cumulative problems that cross chapters, the way the comprehensive Final does.',
    notes: [
      'The Final counts double (two exam-sized scores) and can replace your lowest midterm. It is comprehensive and adds Gases (Ch 5) and Nuclear (Ch 24), which no midterm tested.',
      'Cross-chapter problems are the Final’s signature: a gas produced by a reaction (Ch 3 + Ch 5), the energy of a photon that ionizes an atom (Ch 7 + Ch 8), the IMFs of a molecule you first have to draw (Ch 10 + Ch 12).'
    ] }
];

/* Registered by subjects.js once every data file has loaded. */
window.CHEM_SUBJECT = {
  id: 'chem',
  name: 'General Chemistry I',
  short: 'Chem',
  region: 'The Periodic Coast',
  book: 'CHM 11510 - Silberberg & Amateis, Chemistry (10th ed.)',
  blurb: 'Thirteen lecture topics, three evening exams, one comprehensive final.',
  mapIntro: 'Thirteen gyms, one per lecture topic on the CHM 11510 schedule, with the three ' +
    'evening exams and the Final where the calendar puts them. Every gym, route and exam ' +
    'is open from the start: study whatever your lecture is on this week. A gym fights ' +
    'like the next badge you are due, whichever one you pick.',
  CHAPTERS: window.CHEM_CHAPTERS,
  QBANK: null,                 // filled by the chem question files
  GYM_DIALOGUE: window.CHEM_GYM_DIALOGUE,
  ELITE: window.CHEM_ELITE,
  LOCATIONS: window.CHEM_LOCATIONS,
  EXAM_CHAPTERS: window.CHEM_EXAM_CHAPTERS,
  TOWNSFOLK: null,             // filled by chem-townsfolk.js
  LESSONS: window.CHEM_LESSONS,
  lessonWord: 'lectures',
  mockPerExam: 25,           // each exam row offers a 25-question timed mock paper
  sourceNote: 'Each gym is one lecture topic on the Fall 2026 CHM 11510 schedule (Silberberg sections listed on the gym). ' +
    'The four starred sets are exam reviews: multi-step, five-choice problems in the style of the recitation ' +
    'worksheets and evening exams, fought on each exam’s revision route. The questions are original study ' +
    'questions written to the course’s learning objectives, not the Achieve homework or a real exam.',

  /* Same reasoning as the Isles: the course never lets you skip a week, so the
     game never refuses the topic that is on this week. */
  openTopics: true,

  /* Exposure over drilling, the same plan the Isles use: a question answered
     right is left alone for ~50 answers, a wrong one for ~25, and three right
     in a row retires it until unhideQuestions() brings it back. */
  review: { right: 50, wrong: 25, jitter: 0.25, dueChance: 0.95, retireAfter: 3 }
};
