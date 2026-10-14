/* Gym 1 - Measurement and Significant Figures (Silberberg 1.1-1.5, lesson 1).
   Loaded by gen-fundamentals-a.cjs. The correct choice is always written first. */
module.exports = function ({ M, N, chk, sci, fx, fd, setCh }) {
  setCh(1);
  const L = 1;

  /* ---------------- SI base units and prefixes ---------------- */
  M(L, 1, 'Concept', 'Which of the following is NOT an SI base unit?',
    'liter (L)', ['kelvin (K)', 'kilogram (kg)', 'mole (mol)', 'second (s)'],
    'The SI base units the course uses are the kilogram (mass), meter (length), second (time), kelvin (temperature) and mole (amount); ampere and candela complete the seven. The liter is a DERIVED unit of volume built from length: 1 L = 1 dm³ = 10⁻³ m³. Trap: the liter is used so often that it feels fundamental, but volume is length cubed.',
    ['There are seven SI base units; volume is not one of the seven quantities.', 'Ask which unit can be written in terms of another unit.', '1 L = 1 dm³ - it is built from the meter.']);

  M(L, 1, 'Trap', 'What is the SI base unit of mass?',
    'kilogram', ['gram', 'pound', 'milligram', 'newton'],
    'The SI base unit of mass is the kilogram (kg) - the only base unit that already carries a prefix. The gram is a perfectly good unit, but it is 10⁻³ of the base unit. The pound is not SI, and the newton is the unit of FORCE (weight), not mass. Trap: "gram" looks like the root unit, but the base unit is the kilogram.',
    ['One SI base unit is unusual because its name already contains a prefix.', 'Mass, not weight: the newton measures force.', 'kilo- is built into the base unit of mass.']);

  M(L, 1, 'Concept', 'The prefix micro- (μ) means multiply the unit by:',
    '10⁻⁶', ['10⁻³', '10⁻⁹', '10⁻¹²', '10⁶'],
    'micro (μ) = 10⁻⁶, so 1 μg = 10⁻⁶ g. For comparison: milli (m) = 10⁻³, nano (n) = 10⁻⁹, pico (p) = 10⁻¹², and mega (M) = 10⁶. Trap: 10⁶ is mega - the same size of exponent with the opposite sign.',
    ['Order the small prefixes: milli, micro, nano, pico.', 'Each step down that list is a factor of 10⁻³.', 'milli is 10⁻³, so the next one down is 10⁻⁶.']);

  M(L, 1, 'Concept', 'Which prefix corresponds to a factor of 10⁻⁹?',
    'nano- (n)', ['pico- (p)', 'micro- (μ)', 'milli- (m)', 'centi- (c)'],
    'nano (n) = 10⁻⁹ - the prefix of the nanometer used for wavelengths of light. pico = 10⁻¹², micro = 10⁻⁶, milli = 10⁻³, centi = 10⁻². Trap: pico and micro are the neighbours on either side.',
    ['Visible light is about 400-700 of these meters.', 'milli 10⁻³ → micro 10⁻⁶ → ? 10⁻⁹.', 'It is the prefix in "nm".']);

  M(L, 2, 'Calculation', 'A red laser pointer emits light of wavelength 635 nm. What is this wavelength in meters?',
    sci(635e-9, 3) + ' m', [sci(6.35e-9, 3) + ' m', sci(635e-6, 3) + ' m', sci(635e9, 3) + ' m', sci(6.35e-11, 3) + ' m'],
    '635 nm × (10⁻⁹ m / 1 nm) = 635 × 10⁻⁹ m = 6.35 × 10⁻⁷ m. Moving the decimal two places left (635 → 6.35) raises the exponent by 2 (10⁻⁹ → 10⁻⁷). Distractors: 6.35 × 10⁻⁹ m forgets that 635 = 6.35 × 10²; 6.35 × 10⁻⁴ m uses micro (10⁻⁶) instead of nano; 6.35 × 10¹¹ m multiplies by 10⁹ instead of 10⁻⁹; 6.35 × 10⁻¹¹ m shifts the exponent the wrong way.',
    ['nano means 10⁻⁹.', 'Write 635 × 10⁻⁹ m, then put 635 into proper scientific notation.', '635 = 6.35 × 10², so the exponent becomes −9 + 2.']);

  M(L, 2, 'Calculation', 'A radio station broadcasts at 96.5 MHz. What is this frequency in hertz (s⁻¹)?',
    sci(96.5e6, 3) + ' Hz', [sci(96.5e3, 3) + ' Hz', sci(96.5e9, 3) + ' Hz', sci(9.65e6, 3) + ' Hz', sci(96.5e-6, 3) + ' Hz'],
    'M (mega) = 10⁶: 96.5 MHz = 96.5 × 10⁶ Hz = 9.65 × 10⁷ Hz. Distractors: 9.65 × 10⁴ Hz treats M as kilo; 9.65 × 10¹⁰ Hz treats it as giga; 9.65 × 10⁶ Hz forgets that 96.5 = 9.65 × 10¹; 9.65 × 10⁻⁵ Hz divides by 10⁶ (confusing M with μ).',
    ['Capital M is mega.', 'mega = 10⁶; write 96.5 × 10⁶ Hz.', 'Shift 96.5 to 9.65 and add 1 to the exponent.']);

  M(L, 2, 'Calculation', 'Express 0.0250 mg in micrograms (μg).',
    '25.0 μg', [fx(0.0250 / 1000, 3).replace(/^0\.0000/, '0.0000') + ' μg', '2.50 × 10⁴ μg', '2.50 μg', '25 μg'],
    '1 mg = 10⁻³ g and 1 μg = 10⁻⁶ g, so 1 mg = 1000 μg. 0.0250 mg × (1000 μg / 1 mg) = 25.0 μg. The measurement 0.0250 has three significant figures (the trailing zero after the decimal point counts), so the answer is 25.0 μg, not 25 μg. Distractors: 0.0000250 μg divides by 1000 (wrong direction); 2.50 × 10⁴ μg multiplies by 10⁶ (forgot the milli); 2.50 μg uses a factor of 100; 25 μg drops a significant zero.',
    ['A microgram is smaller than a milligram, so the number must get bigger.', '1 mg = 1000 μg.', '0.0250 × 1000, keeping three significant figures.']);

  N(L, 2, 'Calculation', 'Convert 0.0458 km to centimeters. (Enter a number in cm.)',
    '4.58 × 10³ cm', 4580,
    '0.0458 km × (1000 m / 1 km) × (100 cm / 1 m) = 0.0458 × 10⁵ cm = 4.58 × 10³ cm (4580 cm, three significant figures). Check: a kilometer is 10⁵ cm, so the number must grow by 10⁵.',
    ['Go km → m → cm.', '1 km = 10³ m and 1 m = 10² cm, so 1 km = 10⁵ cm.', '0.0458 × 10⁵ = ?']);

  M(L, 3, 'Calculation', 'A sample of a hormone has a mass of 7.8 ng. What is this mass in milligrams?',
    sci(7.8e-6, 2) + ' mg', [sci(7.8e-3, 2) + ' mg', sci(7.8e-9, 2) + ' mg', sci(7.8e6, 2) + ' mg', sci(7.8e3, 2) + ' mg'],
    '7.8 ng × (10⁻⁹ g / 1 ng) × (1 mg / 10⁻³ g) = 7.8 × 10⁻⁶ mg. A nanogram is a millionth of a milligram (10⁻⁹ / 10⁻³ = 10⁻⁶). Distractors: 7.8 × 10⁻³ mg goes only one prefix step (ng → μg); 7.8 × 10⁻⁹ mg stops at grams and relabels them as mg; 7.8 × 10⁶ mg and 7.8 × 10³ mg move in the wrong direction - a smaller unit to a larger one must give a SMALLER number.',
    ['Is a milligram bigger or smaller than a nanogram? So should the number shrink or grow?', 'Convert ng → g, then g → mg.', '10⁻⁹ g per ng divided by 10⁻³ g per mg gives 10⁻⁶.']);

  M(L, 3, 'Concept', 'Arrange these lengths in order of INCREASING size: 2.5 × 10⁷ nm, 0.0030 km, 3.5 × 10² mm, 25 cm.',
    '2.5 × 10⁷ nm < 25 cm < 3.5 × 10² mm < 0.0030 km',
    ['0.0030 km < 25 cm < 3.5 × 10² mm < 2.5 × 10⁷ nm', '0.0030 km < 3.5 × 10² mm < 25 cm < 2.5 × 10⁷ nm', '25 cm < 2.5 × 10⁷ nm < 3.5 × 10² mm < 0.0030 km', '2.5 × 10⁷ nm < 3.5 × 10² mm < 25 cm < 0.0030 km'],
    'Convert everything to meters: 2.5 × 10⁷ nm × 10⁻⁹ = 0.025 m; 25 cm = 0.25 m; 3.5 × 10² mm = 350 mm × 10⁻³ = 0.35 m; 0.0030 km = 3.0 m. Increasing: 0.025 m < 0.25 m < 0.35 m < 3.0 m. Distractors: ordering by the bare numbers (0.0030 looks smallest, 2.5 × 10⁷ biggest) ignores the units; the others mis-size the mm or nm conversion.',
    ['You cannot compare numbers with different units - convert to one unit first.', 'Use meters: nm × 10⁻⁹, mm × 10⁻³, cm × 10⁻², km × 10³.', 'The values are 0.025, 3.0, 0.35 and 0.25 m.']);
  chk('ranking nm', 2.5e7 * 1e-9, 0.025, 1e-9); chk('ranking mm', 350e-3, 0.35, 1e-9);

  /* ---------------- volume, squared and cubed units ---------------- */
  M(L, 1, 'Concept', 'Exactly how large is 1 mL?',
    '1 cm³', ['1 dm³', '10 cm³', '1 × 10⁻³ cm³', '100 mm³'],
    'By definition 1 L = 1 dm³ = 1000 cm³, so 1 mL = 10⁻³ L = 1 cm³ exactly. Distractors: 1 dm³ is a whole liter; 10 cm³ and 10⁻³ cm³ are off by factors of 10 and 1000; 1 cm³ = (10 mm)³ = 1000 mm³, so 100 mm³ is only a tenth of a mL.',
    ['A liter is a cube 10 cm on each side.', '1 L = 1000 cm³ and 1 L = 1000 mL.', 'So one mL and one cm³ are the same volume.']);

  M(L, 2, 'Trap', 'How many cubic centimeters are in 1 m³?',
    '10⁶ cm³', ['10² cm³', '10³ cm³', '10⁴ cm³', '10⁹ cm³'],
    '1 m = 100 cm, so 1 m³ = (100 cm)³ = 100³ cm³ = 10⁶ cm³. Both the number and the unit get cubed. Distractors: 10² forgets to cube the factor; 10⁴ squares it (that is cm² per m²); 10³ is the number of liters in a m³; 10⁹ is the number of mm³ in a m³.',
    ['Start from the length relationship 1 m = 100 cm.', 'Cube both sides: (1 m)³ = (100 cm)³.', '100³ = 1,000,000.']);

  M(L, 3, 'Calculation', 'A storage tank holds 2.50 m³ of water. What is this volume in liters?',
    sci(2.50e3, 3) + ' L', ['2.50 L', sci(2.50e6, 3) + ' L', sci(2.50e-3, 3) + ' L', '250. L'],
    '1 m³ = 10⁶ cm³ = 10⁶ mL = 10³ L (equivalently 1 m³ = (10 dm)³ = 1000 dm³ = 1000 L). 2.50 m³ × (10³ L / 1 m³) = 2.50 × 10³ L. Distractors: 2.50 L treats m³ as liters; 2.50 × 10⁶ L stops at cm³ (mL) and calls them liters; 2.50 × 10⁻³ L divides instead of multiplying; 250. L uses a factor of 100 instead of 1000.',
    ['A cubic meter is a big box; it holds much more than one liter.', '1 m = 10 dm, so 1 m³ = 10³ dm³ - and 1 dm³ = 1 L.', 'Multiply by 1000 L per m³.']);

  M(L, 3, 'Trap', 'A laboratory bench top has an area of 4.70 × 10⁴ cm². What is the area in m²?',
    '4.70 m²', ['470. m²', '0.0470 m²', sci(4.70e8, 3) + ' m²', sci(4.70e6, 3) + ' m²'],
    '1 m = 100 cm, so 1 m² = (100 cm)² = 10⁴ cm². 4.70 × 10⁴ cm² × (1 m² / 10⁴ cm²) = 4.70 m². Distractors: 470. m² divides by 100 (forgot to square the factor); 0.0470 m² divides by 10⁶ (cubed it); 4.70 × 10⁸ m² and 4.70 × 10⁶ m² multiply instead of divide.',
    ['Area units carry the conversion factor SQUARED.', '1 m² = (100 cm)² = 10⁴ cm².', 'Divide 4.70 × 10⁴ by 10⁴.']);

  M(L, 3, 'Calculation', 'A microscope slide has an area of 18.5 in². What is its area in cm²? (1 in = 2.54 cm exactly)',
    fx(18.5 * 2.54 * 2.54, 3) + ' cm²', [fx(18.5 * 2.54, 3) + ' cm²', fx(18.5 / 2.54, 3) + ' cm²', fx(18.5 / 2.54 / 2.54, 3) + ' cm²', fx(18.5 * 2.54 ** 3, 3) + ' cm²'],
    `1 in² = (2.54 cm)² = 6.4516 cm² (exact). 18.5 in² × 6.4516 cm²/in² = ${fx(18.5 * 6.4516, 5)} cm² → ${fx(18.5 * 6.4516, 3)} cm² (three significant figures from 18.5; the 2.54 is exact). Distractors: ${fx(18.5 * 2.54, 3)} cm² uses 2.54 only once (unit squared, number not); ${fx(18.5 / 2.54, 3)} and ${fx(18.5 / 6.4516, 3)} cm² divide instead of multiply; ${fx(18.5 * 2.54 ** 3, 3)} cm² cubes the factor.`,
    ['Square inches to square centimeters needs the factor squared.', '(2.54 cm/in)² = 6.4516 cm²/in².', '18.5 × 6.4516 = ?']);

  N(L, 3, 'Calculation', 'A rectangular aquarium measures 1.20 m × 0.500 m × 0.350 m. How many liters of water does it hold when full? (Enter a number in L.)',
    sci(1.20 * 0.500 * 0.350 * 1000, 3) + ' L', 1.20 * 0.500 * 0.350 * 1000,
    `V = 1.20 m × 0.500 m × 0.350 m = ${fx(1.20 * 0.5 * 0.35, 3)} m³. Since 1 m³ = 1000 L, V = ${fx(0.21, 3)} × 1000 = 2.10 × 10² L (210. L, three significant figures). Trap: 0.210 L comes from forgetting that a cubic meter is 1000 liters.`,
    ['Volume of a box = length × width × height.', 'The result is in m³; 1 m³ = 1000 L.', '0.210 m³ × 1000 L/m³.']);
  chk('aquarium', 1.20 * 0.500 * 0.350 * 1000, 210, 1e-9);

  M(L, 4, 'Trap', 'Ethanol has a density of 0.789 g/cm³. What is its density in kg/m³?',
    '789 kg/m³', ['0.0789 kg/m³', sci(0.789 / 1e6 * 1000, 3) + ' kg/m³', sci(0.789 * 1e6, 3) + ' kg/m³', '0.789 kg/m³'],
    '0.789 g/cm³ × (1 kg / 1000 g) × (10⁶ cm³ / 1 m³) = 0.789 × 10³ kg/m³ = 789 kg/m³. The cm³ → m³ factor is (100)³ = 10⁶ and it goes in the numerator because cm³ is in the denominator of the starting unit. Distractors: 0.0789 kg/m³ uses 100 cm³ per m³ (did not cube); 7.89 × 10⁻⁴ kg/m³ flips the volume factor; 7.89 × 10⁵ kg/m³ forgets g → kg; 0.789 kg/m³ assumes the number does not change.',
    ['Convert the numerator (g → kg) and the denominator (cm³ → m³) separately.', 'There are 10⁶ cm³ in a m³; a "per cm³" quantity becomes 10⁶ times bigger per m³.', '0.789 ÷ 1000 × 10⁶.']);

  M(L, 2, 'Concept', 'Which of the following equalities is FALSE?',
    '1 L = 100 cm³', ['1 L = 1 dm³', '1 mL = 1 cm³', '1 m³ = 1000 L', '1 cm³ = 10⁻⁶ m³'],
    '1 L = 1 dm³ = (10 cm)³ = 1000 cm³, so "1 L = 100 cm³" is false. The others are all true: 1 mL = 1 cm³; 1 m³ = (10 dm)³ = 1000 dm³ = 1000 L; 1 cm³ = (10⁻² m)³ = 10⁻⁶ m³.',
    ['Check each line by cubing a length relationship.', '1 dm = 10 cm, so 1 dm³ = ? cm³.', 'A liter is 1000 cm³, not 100.']);

  N(L, 2, 'Calculation', 'A gas sample has a volume of 1.20 × 10⁴ cm³. What is its volume in cubic meters? (Enter a number in m³.)',
    '0.0120 m³', 0.0120,
    '1 m³ = (100 cm)³ = 10⁶ cm³, so 1.20 × 10⁴ cm³ × (1 m³ / 10⁶ cm³) = 1.20 × 10⁻² m³ = 0.0120 m³. Trap: dividing by 100 (not cubing the factor) gives 120 m³, a volume the size of a large room.',
    ['Cubic units need the length factor cubed.', '1 m³ = 10⁶ cm³.', 'Divide 1.20 × 10⁴ by 10⁶.']);

  /* ---------------- temperature ---------------- */
  M(L, 2, 'Calculation', 'Dry ice (solid CO₂) sublimes at −78 °C. What is this temperature in kelvins?',
    '195 K', ['351 K', '−195 K', '−351 K', '195.15 K'],
    'T(K) = T(°C) + 273.15 = −78 + 273.15 = 195.15 → 195 K. In addition, keep the fewest decimal places: −78 has none, so the answer is rounded to the ones place. Distractors: 351 K adds 273 to +78 (dropped the minus sign); −195 K and −351 K are impossible (no negative kelvin temperatures); 195.15 K reports more precision than −78 °C has.',
    ['K = °C + 273.15.', 'Keep the sign of −78 °C.', 'Addition rule: −78 has no decimal places, so round 195.15 to the ones place.']);
  chk('dry ice', -78 + 273.15, 195.15, 1e-9);

  M(L, 2, 'Calculation', 'Room temperature is 22.5 °C. What is it in °F?',
    fd(9 / 5 * 22.5 + 32, 1) + ' °F', [fd(9 / 5 * 22.5, 1) + ' °F', fd(5 / 9 * 22.5 + 32, 1) + ' °F', fd((22.5 - 32) * 5 / 9, 1) + ' °F', fd(9 / 5 * (22.5 + 32), 1) + ' °F'],
    '°F = (9/5)(°C) + 32 = (9/5)(22.5) + 32 = 40.5 + 32 = 72.5 °F. Distractors: 40.5 °F forgets to add 32; 44.5 °F uses 5/9 instead of 9/5; −5.3 °F uses the °F → °C formula backwards; 98.1 °F adds 32 BEFORE multiplying by 9/5.',
    ['Use °F = (9/5)°C + 32.', 'Change the degree size first (× 9/5), then shift the zero (+ 32).', '9/5 × 22.5 = 40.5.']);

  M(L, 2, 'Concept', 'At what temperature do the Celsius and Fahrenheit scales show the same number?',
    '−40°', ['0°', '32°', '−32°', '−273.15°'],
    'Set °F = °C = x in °F = (9/5)°C + 32: x = (9/5)x + 32 → −(4/5)x = 32 → x = −40. So −40 °C = −40 °F. Distractors: 0 °C is 32 °F and 32 °F is 0 °C (the freezing point of water on each scale); −273.15 °C is absolute zero, which is −459.67 °F.',
    ['Call the shared reading x and substitute it into °F = (9/5)°C + 32.', 'x = 1.8x + 32.', 'Solve: −0.8x = 32.']);

  N(L, 3, 'Calculation', 'Paper ignites at about 451 °F. Express this temperature in kelvins. (Enter a number in K.)',
    fx((451 - 32) * 5 / 9 + 273.15, 3) + ' K', Number(fx((451 - 32) * 5 / 9 + 273.15, 3)),
    `°C = (451 − 32) × 5/9 = 419 × 5/9 = ${fx((451 - 32) * 5 / 9, 5)} °C; K = ${fx((451 - 32) * 5 / 9, 5)} + 273.15 = ${fx((451 - 32) * 5 / 9 + 273.15, 5)} → ${fx((451 - 32) * 5 / 9 + 273.15, 3)} K. Trap: forgetting to subtract 32 first gives 524 K; skipping the Celsius step altogether (451 + 273) gives 724 K.`,
    ['There is no direct °F → K formula; go through °C.', '°C = (°F − 32) × 5/9.', 'Then add 273.15 to the Celsius value.']);

  M(L, 1, 'Concept', 'What is absolute zero on the Celsius scale?',
    '−273.15 °C', ['0 °C', '−459.67 °C', '273.15 °C', '−32 °C'],
    'Absolute zero is 0 K, and T(°C) = T(K) − 273.15, so absolute zero = −273.15 °C. Distractors: 0 °C is the freezing point of water; −459.67 is absolute zero on the FAHRENHEIT scale; +273.15 has the wrong sign; −32 confuses the 32 °F freezing point.',
    ['Absolute zero is 0 on the kelvin scale.', 'K = °C + 273.15, so °C = K − 273.15.', '0 − 273.15 = ?']);

  M(L, 2, 'Trap', 'During a reaction the temperature of a solution rises by 15.0 °C. What is the temperature CHANGE in kelvins?',
    '15.0 K', ['288.2 K', '27.0 K', '8.33 K', '−258.2 K'],
    'A kelvin and a Celsius degree are the same size; the scales differ only in where zero is. A change of 15.0 °C is therefore a change of 15.0 K. Adding 273.15 is only for converting an actual temperature, not a difference. Distractors: 288.2 K adds 273.15 to a difference; 27.0 K multiplies by 9/5 (that is the change in °F); 8.33 K multiplies by 5/9; −258.2 K subtracts 273.15.',
    ['Is this an absolute temperature or a difference between two temperatures?', 'ΔT(K) = T₂(K) − T₁(K) = (T₂ + 273.15) − (T₁ + 273.15).', 'The 273.15 cancels.']);

  M(L, 4, 'Exam', 'Which of the following temperatures is the LOWEST?',
    '−50 °F', ['−40 °C', '230 K', '−42 °C', '0 °F'],
    `Convert all to kelvins. −50 °F: (−50 − 32) × 5/9 = ${fx((-50 - 32) * 5 / 9, 4)} °C = ${fx((-50 - 32) * 5 / 9 + 273.15, 4)} K. −40 °C = 233.15 K. 230 K. −42 °C = 231.15 K. 0 °F: (0 − 32) × 5/9 = −17.78 °C = ${fx((0 - 32) * 5 / 9 + 273.15, 4)} K. The lowest is −50 °F (about 227.6 K). Trap: comparing the raw numbers (−50 vs −42 vs −40) only works on the same scale.`,
    ['Put every temperature on one scale before comparing.', 'Kelvin is easiest: °F → °C → K.', '−50 °F is about −45.6 °C.']);

  M(L, 3, 'Calculation', 'Liquid nitrogen boils at 77 K. What is this temperature in °F?',
    fx(9 / 5 * (77 - 273.15) + 32, 3) + ' °F', [fx(9 / 5 * (77 - 273.15), 3) + ' °F', fx(5 / 9 * (77 - 273.15) + 32, 2) + ' °F', fx(9 / 5 * (77 - 273.15 + 32), 3) + ' °F', fx(9 / 5 * 77 + 32, 3) + ' °F'],
    `°C = 77 − 273.15 = −196.15 °C. °F = (9/5)(−196.15) + 32 = ${fx(9 / 5 * -196.15, 5)} + 32 = ${fx(9 / 5 * -196.15 + 32, 5)} → ${fx(9 / 5 * (77 - 273.15) + 32, 3)} °F. Distractors: ${fx(9 / 5 * -196.15, 3)} °F forgets the +32; ${fx(5 / 9 * -196.15 + 32, 2)} °F uses 5/9; ${fx(9 / 5 * (-196.15 + 32), 3)} °F adds 32 before multiplying; ${fx(9 / 5 * 77 + 32, 3)} °F treats 77 K as 77 °C.`,
    ['Two steps: K → °C, then °C → °F.', '°C = K − 273.15 = −196.15.', '°F = 1.8 × (−196.15) + 32.']);

  M(L, 4, 'Trap', 'At what Kelvin temperature is the Fahrenheit reading exactly twice the Celsius reading?',
    '433 K', ['160 K', '320 K', '593 K', '249 K'],
    'Let the Celsius reading be C. Then °F = 2C, and °F = (9/5)C + 32, so 2C = 1.8C + 32 → 0.2C = 32 → C = 160 °C (and °F = 320 °F). In kelvins: 160 + 273.15 = 433.15 ≈ 433 K. Distractors: 160 K stops at the Celsius value; 320 K reports the Fahrenheit value; 593 K adds 273 to the Fahrenheit value; 249 K solves the reversed condition C = 2F.',
    ['Write °F = 2C and substitute into the conversion formula.', '2C = 1.8C + 32.', 'C = 160 °C; the question wants kelvins.']);
  chk('twice', 32 / 0.2 + 273.15, 433.15, 1e-9); chk('reversed', (64 / -2.6) + 273.15, 248.5, 0.05);

  M(L, 4, 'Trap', 'Two temperatures differ by 18.0 Fahrenheit degrees. By how many kelvins do they differ?',
    '10.0 K', [fx(((18 - 32) * 5 / 9) + 273.15, 4) + ' K', '32.4 K', '−7.8 K', '291.2 K'],
    'A Fahrenheit degree is 5/9 the size of a Celsius degree (180 F° span the same range as 100 C°), and a Celsius degree equals a kelvin. ΔT = 18.0 F° × (5 K / 9 F°) = 10.0 K. No 32 and no 273.15 appear, because those shift ZERO points and cancel in a difference. Distractors: 265.4 K converts 18.0 °F as if it were an actual temperature; 32.4 K multiplies by 9/5; −7.8 K subtracts 32 from a difference; 291.2 K adds 273.15 to 18.0.',
    ['This is a temperature DIFFERENCE, not a temperature.', 'Only the size of the degree matters: 9 F° = 5 C° = 5 K.', '18.0 × 5/9.']);

  N(L, 2, 'Calculation', 'Normal body temperature is 98.6 °F. What is it in °C? (Enter a number in °C.)',
    '37.0 °C', 37.0,
    '°C = (°F − 32) × 5/9 = (98.6 − 32) × 5/9 = 66.6 × 5/9 = 37.0 °C. Subtract 32 FIRST (shift the zero), then change the degree size. Trap: 98.6 × 5/9 − 32 = 22.8 gives a nonsense body temperature.',
    ['Undo the °F formula in reverse order.', 'Subtract 32, then multiply by 5/9.', '66.6 × 5/9 = ?']);
  chk('body', (98.6 - 32) * 5 / 9, 37.0, 1e-9);

  /* ---------------- density ---------------- */
  M(L, 2, 'Calculation', 'A 25.0 g piece of metal has a volume of 9.26 cm³. What is its density, correctly rounded?',
    fx(25.0 / 9.26, 3) + ' g/cm³', [fx(9.26 / 25.0, 3) + ' g/cm³', fx(25.0 * 9.26, 3) + ' g/cm³', '2.7 g/cm³', fx(25.0 / 9.26, 5) + ' g/cm³'],
    `d = m/V = 25.0 g / 9.26 cm³ = ${fx(25.0 / 9.26, 5)} g/cm³ → 2.70 g/cm³ (both data have three significant figures, so the answer has three - the trailing zero is significant). Distractors: 0.370 g/cm³ is V/m; 232 g/cm³ multiplies; 2.7 g/cm³ drops a significant zero; 2.6998 g/cm³ has too many digits.`,
    ['Density = mass ÷ volume.', 'Divide, then apply the multiplication/division sig-fig rule.', 'Three significant figures: 2.6998 rounds to ?']);

  N(L, 2, 'Calculation', 'An 8.50 g sample of a liquid occupies 10.2 mL. What is its density? (Enter a number in g/mL.)',
    fx(8.50 / 10.2, 3) + ' g/mL', Number(fx(8.50 / 10.2, 3)),
    `d = m/V = 8.50 g ÷ 10.2 mL = ${fx(8.50 / 10.2, 5)} → ${fx(8.50 / 10.2, 3)} g/mL (three significant figures). It is less dense than water. Trap: V/m = 1.20 mL/g has the wrong units for a density.`,
    ['Density = mass ÷ volume.', 'Keep three significant figures.', '8.50 g divided by 10.2 mL.']);

  M(L, 2, 'Calculation', 'Gold has a density of 19.3 g/cm³. What is the mass of a 12.0 cm³ gold bar?',
    fx(19.3 * 12.0, 3) + ' g', [fx(12.0 / 19.3, 3) + ' g', fx(19.3 / 12.0, 3) + ' g', fx(19.3 * 12.0, 4) + ' g', fx(19.3 + 12.0, 3) + ' g'],
    `mass = density × volume = 19.3 g/cm³ × 12.0 cm³ = ${fx(19.3 * 12.0, 4)} g → 232 g (three significant figures). Distractors: 0.622 g is V/d and 1.61 g is d/V (the units would not even cancel to grams); 231.6 g has too many significant figures; 31.3 g adds the numbers.`,
    ['Use density as a conversion factor: 19.3 g = 1 cm³.', 'cm³ × (g/cm³) leaves grams.', '19.3 × 12.0, rounded to three significant figures.']);

  M(L, 2, 'Calculation', 'Ethanol has a density of 0.789 g/mL. What volume does 250.0 g of ethanol occupy?',
    fx(250.0 / 0.789, 3) + ' mL', [fx(250.0 * 0.789, 3) + ' mL', sci(0.789 / 250.0, 3) + ' mL', fx(250.0 / 0.789, 5) + ' mL', fx(250.0 / 0.789 / 1000, 3) + ' mL'],
    `V = m/d = 250.0 g ÷ 0.789 g/mL = ${fx(250.0 / 0.789, 5)} mL → 317 mL (0.789 has only three significant figures). Check: ethanol is less dense than water, so 250 g takes up MORE than 250 mL. Distractors: 197 mL multiplies (units would be g²/mL); 3.16 × 10⁻³ mL is d/m; 316.86 mL has too many digits; 0.317 mL divides by 1000 as if converting to liters but keeps mL.`,
    ['Rearrange d = m/V for V.', 'V = m ÷ d.', 'Less dense than water, so the volume in mL should exceed the mass in g.']);

  M(L, 4, 'Trap', 'A graduated cylinder contains 19.9 mL of water. When a 34.7 g piece of metal is added, the water level rises to 24.5 mL. What is the density of the metal, correctly rounded?',
    fx(34.7 / (24.5 - 19.9), 2) + ' g/mL', [fx(34.7 / 4.6, 3) + ' g/mL', fx(34.7 / 24.5, 3) + ' g/mL', fx(34.7 / 19.9, 3) + ' g/mL', fx(4.6 / 34.7, 2) + ' g/mL'],
    `Volume of metal = volume displaced = 24.5 mL − 19.9 mL = 4.6 mL. Subtraction keeps the fewest DECIMAL places (one), so the volume has only TWO significant figures. d = 34.7 g / 4.6 mL = ${fx(34.7 / 4.6, 5)} → 7.5 g/mL (two significant figures). Distractors: 7.54 g/mL keeps three significant figures; 1.42 and 1.74 g/mL divide by the total water level instead of the change; 0.13 g/mL is V/m.`,
    ['The metal\'s volume is the CHANGE in the water level.', 'After subtracting, count the significant figures of the difference, not of the readings.', '4.6 mL has 2 significant figures, so the density does too.']);

  N(L, 3, 'Calculation', 'An aluminum cube (density 2.70 g/cm³) has an edge length of 2.50 cm. What is its mass? (Enter a number in g.)',
    fx(2.5 ** 3 * 2.70, 3) + ' g', Number(fx(2.5 ** 3 * 2.70, 3)),
    `V = (2.50 cm)³ = ${fx(2.5 ** 3, 5)} cm³; m = d × V = 2.70 g/cm³ × 15.625 cm³ = ${fx(2.5 ** 3 * 2.70, 6)} g → ${fx(2.5 ** 3 * 2.70, 3)} g. Trap: using the edge length (or its square) as the volume gives 6.75 g or 16.9 g.`,
    ['First find the volume of the cube.', 'V = edge³.', 'Mass = density × volume.']);

  M(L, 4, 'Trap', 'A lead sphere (density 11.3 g/cm³) has a DIAMETER of 1.20 cm. What is its mass? (V of a sphere = (4/3)πr³)',
    fx(11.3 * 4 / 3 * Math.PI * 0.6 ** 3, 3) + ' g', [fx(11.3 * 4 / 3 * Math.PI * 1.2 ** 3, 3) + ' g', fx(11.3 * Math.PI * 0.6 ** 3, 3) + ' g', fx(11.3 * 4 / 3 * Math.PI * 0.6 ** 2, 3) + ' g', fx(4 / 3 * Math.PI * 0.6 ** 3 / 11.3, 3) + ' g'],
    `r = diameter/2 = 0.600 cm. V = (4/3)π(0.600 cm)³ = ${fx(4 / 3 * Math.PI * 0.216, 4)} cm³. m = 11.3 g/cm³ × ${fx(4 / 3 * Math.PI * 0.216, 4)} cm³ = ${fx(11.3 * 4 / 3 * Math.PI * 0.216, 4)} → ${fx(11.3 * 4 / 3 * Math.PI * 0.216, 3)} g. Distractors: 81.8 g uses the diameter as the radius (8× too big); 7.67 g drops the 4/3; 17.0 g squares the radius; 0.0801 g divides V by d.`,
    ['The formula needs the RADIUS.', 'r = 0.600 cm; cube it before multiplying.', 'm = 11.3 × (4/3)π(0.600)³.']);

  M(L, 3, 'Concept', 'Water has a density of 1.00 g/mL. Which object will FLOAT in water?',
    'a block with mass 8.0 g and volume 10.0 cm³', ['a block with mass 50.0 g and volume 40.0 cm³', 'a block with mass 100. g and volume 95.0 cm³', 'a block with mass 3.0 g and volume 2.5 cm³', 'a block with mass 27.0 g and volume 10.0 cm³'],
    'An object floats if its density is LESS than the liquid\'s. Densities: 8.0/10.0 = 0.80 g/cm³ (floats); 50.0/40.0 = 1.25; 100./95.0 = 1.05; 3.0/2.5 = 1.2; 27.0/10.0 = 2.70 g/cm³ (all sink). Trap: the lightest object is not automatically the one that floats - the 3.0 g block is denser than water.',
    ['Compare densities, not masses.', 'Compute m/V for each block.', 'Floats if d is below 1.00 g/cm³.']);

  M(L, 2, 'Concept', 'Equal 100-g masses of gold (19.3 g/cm³), lead (11.3 g/cm³), aluminum (2.70 g/cm³), water (1.00 g/mL) and ethanol (0.789 g/mL) are measured. Which sample occupies the GREATEST volume?',
    'ethanol', ['gold', 'lead', 'aluminum', 'water'],
    'V = m/d. With the same mass, the smallest density gives the largest volume: ethanol, 100 g / 0.789 g/mL = 127 mL (gold only 5.18 cm³). Trap: picking gold confuses "densest" with "largest".',
    ['Volume = mass ÷ density.', 'Same mass in every case, so only the density changes.', 'Smallest density → largest volume.']);

  M(L, 3, 'Calculation', 'An empty flask has a mass of 45.27 g. Filled with 50.0 mL of a liquid, its mass is 92.84 g. What is the density of the liquid?',
    fx((92.84 - 45.27) / 50.0, 3) + ' g/mL', [fx(92.84 / 50.0, 3) + ' g/mL', fx(45.27 / 50.0, 3) + ' g/mL', fx(50.0 / (92.84 - 45.27), 3) + ' g/mL', fx((92.84 - 45.27) / 50.0, 4) + ' g/mL'],
    `Mass of liquid = 92.84 g − 45.27 g = 47.57 g (four significant figures - subtraction keeps two decimal places). d = 47.57 g / 50.0 mL = ${fx(47.57 / 50.0, 5)} → 0.951 g/mL (50.0 limits it to three). Distractors: 1.86 g/mL uses the full flask mass; 0.905 g/mL uses the empty flask; 1.05 g/mL is V/m; 0.9514 g/mL keeps a fourth significant figure.`,
    ['First find the mass of the liquid alone.', 'Mass by difference, then d = m/V.', '47.57 g ÷ 50.0 mL, three significant figures.']);

  M(L, 4, 'Exam', 'A "gold" ring with a mass of 5.25 g raises the water level in a graduated cylinder by 0.40 mL. Pure gold has a density of 19.3 g/cm³. Which conclusion is correct?',
    'd = 13 g/mL, well below 19.3 g/cm³, so the ring is not pure gold',
    ['d = 13.1 g/mL, close enough to call the ring pure gold', 'd = 0.076 g/mL, so the ring must be hollow', 'd = 2.1 g/mL, so the ring is mostly aluminum', 'd = 13 g/mL, which matches gold because density depends on sample size'],
    'Volume displaced = 0.40 mL = 0.40 cm³ (two significant figures). d = 5.25 g / 0.40 cm³ = 13.125 → 13 g/cm³. That is far below gold\'s 19.3 g/cm³, so the ring contains a less dense metal. Distractors: 13.1 has too many significant figures AND the wrong conclusion; 0.076 is V/m; 2.1 multiplies m × V; density is INTENSIVE, so it does not depend on sample size.',
    ['Density from mass and displaced volume.', 'Two significant figures from 0.40 mL.', 'Compare 13 with 19.3 - is it the same material?']);

  N(L, 3, 'Calculation', 'What volume is occupied by 1.00 kg of an aqueous salt solution whose density is 1.19 g/mL? (Enter a number in mL.)',
    fx(1000 / 1.19, 3) + ' mL', Number(fx(1000 / 1.19, 3)),
    `1.00 kg = 1.00 × 10³ g. V = m/d = 1.00 × 10³ g ÷ 1.19 g/mL = ${fx(1000 / 1.19, 5)} → 840. mL (three significant figures). Trap: forgetting kg → g gives 0.840 mL.`,
    ['Get the mass in grams to match the density units.', 'V = m ÷ d.', '1000 g ÷ 1.19 g/mL.']);

  M(L, 3, 'Calculation', 'Mercury has a density of 13.6 g/mL. What is the mass of 2.50 L of mercury?',
    fx(2.50 * 1000 * 13.6 / 1000, 3) + ' kg', [fx(2.50 * 13.6, 3) + ' g', fx(2.50 / 13.6, 3) + ' kg', sci(2.50 * 1000 * 13.6 * 1000, 3) + ' kg', fx(13.6 / 2.50, 3) + ' kg'],
    '2.50 L = 2.50 × 10³ mL. m = 2.50 × 10³ mL × 13.6 g/mL = 3.40 × 10⁴ g = 34.0 kg. Distractors: 34.0 g never converts L to mL; 0.184 kg is V/d; 3.40 × 10⁷ kg multiplies by 1000 when going g → kg; 5.44 kg is d/V.',
    ['The density is per mL, so convert the volume to mL first.', 'm = V × d gives grams.', '3.40 × 10⁴ g ÷ 1000 g/kg.']);

  M(L, 4, 'Exam', 'A rectangular slab of a soft metal measures 15.0 mm × 12.5 mm × 8.00 mm and has a mass of 3.24 × 10³ mg. What is its density in g/cm³?',
    fx(3.24 / (1.50 * 1.25 * 0.800), 3) + ' g/cm³', [sci(3240 / (1.50 * 1.25 * 0.800), 3) + ' g/cm³', sci(3.24 / (15.0 * 12.5 * 8.00), 3) + ' g/cm³', fx(3.24 / (1.50 * 1.25 * 8.00), 3) + ' g/cm³', fx((1.50 * 1.25 * 0.800) / 3.24, 3) + ' g/cm³'],
    `Mass: 3.24 × 10³ mg × (1 g / 1000 mg) = 3.24 g. Edges in cm: 1.50, 1.25 and 0.800 cm, so V = 1.50 × 1.25 × 0.800 = ${fx(1.5 * 1.25 * 0.8, 3)} cm³. d = 3.24 g / 1.50 cm³ = ${fx(3.24 / 1.5, 3)} g/cm³. Distractors: 2.16 × 10³ leaves the mass in mg; 2.16 × 10⁻³ leaves the volume in mm³; 0.216 converts only two of the three edges; 0.463 is V/m.`,
    ['Convert mass to g and every edge to cm before combining.', '10 mm = 1 cm for EACH of the three edges.', 'V = 1.50 × 1.25 × 0.800 cm³.']);

  M(L, 4, 'Calculation', 'A rectangular sheet of aluminum foil (density 2.70 g/cm³) measures 25.0 cm × 30.5 cm and has a mass of 1.85 g. How thick is the foil in micrometers (μm)?',
    fx(1.85 / 2.70 / (25.0 * 30.5) * 1e4, 3) + ' μm', [fx(1.85 / 2.70 / (25.0 * 30.5) * 1e6, 3) + ' μm', sci(1.85 / 2.70 / (25.0 * 30.5), 3) + ' μm', fx(1.85 * 2.70 / (25.0 * 30.5) * 1e4, 3) + ' μm', fx(1.85 / 2.70 / (25.0 * 30.5) * 1e3, 3) + ' μm'],
    `V = m/d = 1.85 g ÷ 2.70 g/cm³ = ${fx(1.85 / 2.7, 4)} cm³. Area = 25.0 × 30.5 = 762.5 cm². Thickness = V/area = ${sci(1.85 / 2.7 / 762.5, 4)} cm. 1 cm = 10⁴ μm, so thickness = ${fx(1.85 / 2.7 / 762.5 * 1e4, 3)} μm. Distractors: 899 μm uses 10⁶ (that is m → μm, not cm → μm); 8.99 × 10⁻⁴ μm never converts from cm; 65.5 μm multiplies m × d; 0.899 μm uses 10³.`,
    ['Volume from mass and density; thickness = volume ÷ area.', 'The thickness comes out in cm.', '1 cm = 10⁻² m = 10⁴ μm.']);

  M(L, 4, 'Trap', 'The density of air at 20 °C is 1.20 g/L. What is this density in kg/m³?',
    '1.20 kg/m³', [sci(1.20e-3, 3) + ' kg/m³', sci(1.20e3, 3) + ' kg/m³', sci(1.20e-6, 3) + ' kg/m³', sci(1.20e6, 3) + ' kg/m³'],
    '1.20 g/L × (1 kg / 1000 g) × (1000 L / 1 m³) = 1.20 kg/m³. The two factors of 1000 cancel: g/L and kg/m³ are numerically identical units. Distractors come from applying only one of the two factors (1.20 × 10⁻³ or 1.20 × 10³) or using 10⁶ for one of them.',
    ['Convert numerator and denominator separately.', 'g → kg divides by 1000; per L → per m³ multiplies by 1000 (1 m³ = 1000 L).', 'What happens when you multiply and divide by the same factor?']);

  M(L, 4, 'Exam', 'A 15.32 g piece of metal is lowered into an overflow can full of water, and 5.67 g of water (density 1.00 g/mL) spills out. What is the density of the metal?',
    fx(15.32 / 5.67, 3) + ' g/mL', [fx(5.67 / 15.32, 3) + ' g/mL', fx(15.32 * 5.67, 3) + ' g/mL', fx(15.32 / 5.67, 4) + ' g/mL', fx((15.32 - 5.67) / 5.67, 3) + ' g/mL'],
    `The metal displaces its own volume of water: V = 5.67 g ÷ 1.00 g/mL = 5.67 mL. d = 15.32 g / 5.67 mL = ${fx(15.32 / 5.67, 5)} → 2.70 g/mL (5.67 and 1.00 both have three significant figures). Distractors: 0.370 is V/m; 86.9 multiplies; 2.702 has four significant figures; 1.70 subtracts the water mass from the metal mass.`,
    ['The spilled water has the same volume as the metal.', 'Turn the mass of water into a volume with water\'s density.', 'd = 15.32 g ÷ 5.67 mL.']);

  M(L, 3, 'Calculation', 'Which sample has the GREATEST mass?',
    '1.00 L of mercury (13.6 g/mL)', ['10.0 kg of water', '5.00 L of ethanol (0.789 g/mL)', '500. cm³ of gold (19.3 g/cm³)', '12.0 L of air (1.20 g/L)'],
    'Masses: mercury 1000 mL × 13.6 g/mL = 13.6 kg; water 10.0 kg; ethanol 5000 mL × 0.789 = 3.95 kg; gold 500. × 19.3 = 9.65 kg; air 12.0 × 1.20 = 14.4 g = 0.0144 kg. Mercury wins. Trap: the largest volume (air) is the lightest by far.',
    ['Convert every sample to a mass in the same unit.', 'm = V × d; watch L vs mL.', 'Mercury comes to 13.6 kg.']);

  M(L, 2, 'Concept', 'As the temperature of most liquids increases, their density:',
    'decreases, because the volume increases while the mass stays the same', ['increases, because the molecules move faster', 'stays the same, because density is an intensive property', 'decreases, because the mass decreases', 'increases, because the volume decreases'],
    'Most substances expand when heated: the same mass occupies more volume, so d = m/V falls. (Silberberg notes that because volume changes with temperature, so does density.) Distractors: being intensive means density does not depend on the AMOUNT of sample - it can still depend on temperature; heating does not change mass.',
    ['Mass does not change on heating.', 'What happens to the volume of a liquid as it warms (think of a thermometer)?', 'Larger V with the same m gives a smaller m/V.']);

  N(L, 3, 'Calculation', 'Lead has a density of 11.3 g/cm³. What volume does 1.00 lb of lead occupy? (1 kg = 2.205 lb; enter a number in cm³.)',
    fx(1000 / 2.205 / 11.3, 3) + ' cm³', Number(fx(1000 / 2.205 / 11.3, 3)),
    `1.00 lb × (1 kg / 2.205 lb) × (1000 g / 1 kg) = ${fx(1000 / 2.205, 4)} g. V = m/d = ${fx(1000 / 2.205, 4)} g ÷ 11.3 g/cm³ = ${fx(1000 / 2.205 / 11.3, 4)} → ${fx(1000 / 2.205 / 11.3, 3)} cm³. Trap: multiplying by 2.205 instead of dividing gives 195 cm³.`,
    ['Convert pounds to grams first.', 'lb → kg (÷ 2.205), kg → g (× 1000).', 'Then V = m ÷ d.']);

  M(L, 4, 'Exam', 'A metal cylinder is 5.08 cm long, has a diameter of 1.2 cm, and a mass of 15.32 g. What is its density, correctly rounded? (V = πr²h)',
    fx(15.32 / (Math.PI * 0.6 ** 2 * 5.08), 2) + ' g/cm³', [fx(15.32 / (Math.PI * 0.6 ** 2 * 5.08), 3) + ' g/cm³', fx(15.32 / (Math.PI * 1.2 ** 2 * 5.08), 3) + ' g/cm³', fx(15.32 / (0.6 ** 2 * 5.08), 2) + ' g/cm³', fx((Math.PI * 0.6 ** 2 * 5.08) / 15.32, 2) + ' g/cm³'],
    `r = 1.2/2 = 0.60 cm. V = π(0.60)²(5.08) = ${fx(Math.PI * 0.36 * 5.08, 4)} cm³. d = 15.32 / ${fx(Math.PI * 0.36 * 5.08, 4)} = ${fx(15.32 / (Math.PI * 0.36 * 5.08), 4)} g/cm³. The diameter 1.2 cm has only TWO significant figures, so d = 2.7 g/cm³. Distractors: 2.67 keeps three significant figures; 0.667 uses the diameter as the radius; ${fx(15.32 / (0.6 ** 2 * 5.08), 2)} drops π; ${fx((Math.PI * 0.6 ** 2 * 5.08) / 15.32, 2)} is V/m.`,
    ['Halve the diameter to get r.', 'The least precise measurement (1.2 cm) sets the sig figs.', 'Two significant figures: 2.666... becomes ?']);

  M(L, 4, 'Exam', 'A 0.250 kg piece of an unknown metal is dropped into a graduated cylinder, and the water level rises from 25.0 mL to 47.2 mL. Which metal is it? (Al 2.70, Fe 7.87, Cu 8.96, Ag 10.5, Pb 11.3 g/cm³)',
    'lead', ['silver', 'copper', 'iron', 'aluminum'],
    `V = 47.2 − 25.0 = 22.2 mL = 22.2 cm³. m = 0.250 kg = 250. g. d = 250. g / 22.2 cm³ = ${fx(250 / 22.2, 3)} g/cm³ → lead (11.3). Traps: using 25.0 mL as the volume gives 10.0 g/cm³ (looks like silver); using 47.2 mL gives 5.30; leaving the mass in kg gives 0.0113.`,
    ['Volume of the metal = the rise in water level.', 'Convert kg to g so the density is in g/cm³.', '250. g ÷ 22.2 cm³ = ?']);

  M(L, 4, 'Exam', 'A copper wire (density 8.96 g/cm³) has a diameter of 0.0640 cm. What length of this wire, in meters, has a mass of 1.00 kg? (cross-section area = πr²)',
    fx(1000 / 8.96 / (Math.PI * 0.032 ** 2) / 100, 3) + ' m', [fx(1000 / 8.96 / (Math.PI * 0.064 ** 2) / 100, 3) + ' m', sci(1000 / 8.96 / (Math.PI * 0.032 ** 2), 3) + ' m', fx(1 / 8.96 / (Math.PI * 0.032 ** 2) / 100, 3) + ' m', sci(1000 / 8.96 / (0.032 ** 2) / 100, 3) + ' m'],
    `V = m/d = 1000 g ÷ 8.96 g/cm³ = ${fx(1000 / 8.96, 4)} cm³. r = 0.0320 cm, area = π(0.0320)² = ${sci(Math.PI * 0.032 ** 2, 4)} cm². Length = V/area = ${sci(1000 / 8.96 / (Math.PI * 0.032 ** 2), 4)} cm = ${fx(1000 / 8.96 / (Math.PI * 0.032 ** 2) / 100, 3)} m. Distractors: 86.7 m uses the diameter as the radius; 3.47 × 10⁴ m never converts cm to m; 0.347 m forgets kg → g; 1.09 × 10³ m drops π.`,
    ['A wire is a long cylinder: V = (area) × (length).', 'Get V from mass and density; get the area from the RADIUS.', 'length (cm) = V ÷ πr², then ÷ 100 for meters.']);

  M(L, 4, 'Exam', 'An empty 250.0 mL volumetric flask has a mass of 87.236 g. Filled to the mark with a solution, its mass is 342.418 g. What is the density of the solution?',
    fx((342.418 - 87.236) / 250.0, 4) + ' g/mL', [fx((342.418 - 87.236) / 250.0, 5) + ' g/mL', fx(342.418 / 250.0, 4) + ' g/mL', fx(250.0 / (342.418 - 87.236), 4) + ' g/mL', fx((342.418 - 87.236) / 250.0, 3) + ' g/mL'],
    `Mass of solution = 342.418 − 87.236 = 255.182 g (three decimal places, six significant figures). d = 255.182 g / 250.0 mL = ${fx(255.182 / 250, 6)} → ${fx(255.182 / 250, 4)} g/mL. The volume 250.0 mL has FOUR significant figures, so the density has four. Distractors: 1.0207 keeps five; 1.370 uses the full flask mass; 0.9797 is V/m; 1.02 rounds to only three.`,
    ['Mass of solution by difference.', 'The flask volume 250.0 mL has four significant figures.', '255.182 ÷ 250.0, rounded to four significant figures.']);

  M(L, 4, 'Exam', 'A metal cube is 1.50 in on each edge and has a mass of 0.437 kg. What is its density in g/cm³? (1 in = 2.54 cm)',
    fx(437 / (1.50 * 2.54) ** 3, 3) + ' g/cm³', [fx(437 / (1.5 ** 3 * 2.54), 3) + ' g/cm³', fx(0.437 / (1.50 * 2.54) ** 3, 3) + ' g/cm³', fx((1.50 * 2.54) ** 3 / 437, 3) + ' g/cm³', fx(437 / (1.5 ** 3 * 2.54 ** 2), 3) + ' g/cm³'],
    `Edge = 1.50 in × 2.54 cm/in = 3.81 cm. V = (3.81 cm)³ = ${fx(3.81 ** 3, 5)} cm³. m = 0.437 kg = 437 g. d = 437 / ${fx(3.81 ** 3, 5)} = ${fx(437 / 3.81 ** 3, 4)} → ${fx(437 / 3.81 ** 3, 3)} g/cm³. Distractors: 51.0 converts in³ to cm³ with 2.54 only once; 20.1 squares it; 0.00790 leaves the mass in kg; 0.127 is V/m.`,
    ['Convert the edge length to cm BEFORE cubing (or cube the factor).', '(2.54 cm/in)³ = 16.387 cm³/in³.', 'd = 437 g ÷ (3.81 cm)³.']);

  N(L, 3, 'Calculation', 'Gasoline has a density of 0.737 g/mL. What is the mass of 1.00 gal of gasoline? (1 gal = 3.785 L; enter a number in kg.)',
    fx(3785 * 0.737 / 1000, 3) + ' kg', Number(fx(3785 * 0.737 / 1000, 3)),
    `1.00 gal × 3.785 L/gal × 1000 mL/L = 3785 mL. m = 3785 mL × 0.737 g/mL = ${fx(3785 * 0.737, 5)} g = ${fx(3785 * 0.737 / 1000, 3)} kg. Trap: skipping L → mL gives 2.79 g, a thousand times too small.`,
    ['Chain gal → L → mL.', 'Then mass = volume × density.', 'Finally g → kg.']);

  /* ---------------- properties, changes, states ---------------- */
  M(L, 1, 'Concept', 'Which of the following is an EXTENSIVE property?',
    'mass', ['density', 'temperature', 'melting point', 'color'],
    'Extensive properties depend on the amount of substance (mass, volume, heat content). Intensive properties do not (density, temperature, melting point, color). Cut a sample in half and its mass halves, but its density and melting point stay the same.',
    ['Imagine doubling the sample. Which property doubles?', 'Extensive = depends on how much you have.', 'Mass and volume are the textbook examples.']);

  M(L, 2, 'Concept', 'Which pair consists of two INTENSIVE properties?',
    'density and boiling point', ['mass and density', 'volume and temperature', 'mass and volume', 'heat content and temperature'],
    'Density (a ratio of two extensive properties) and boiling point do not depend on the amount of sample, so both are intensive. Each distractor pairs one or two extensive properties (mass, volume, heat content) with an intensive one.',
    ['Check each property separately: does it change if the sample doubles?', 'Mass, volume and heat are extensive.', 'Both members of the right pair stay the same for any sample size.']);

  M(L, 2, 'Concept', 'A copper block is cut exactly in half. Which property of EACH half is half of the original block\'s value?',
    'volume', ['density', 'melting point', 'temperature', 'color'],
    'Volume is extensive: each half has half the volume (and half the mass). Density = m/V stays the same because both m and V halve. Melting point, temperature and color are intensive.',
    ['Which properties depend on the amount of copper?', 'Density is a ratio of two quantities that both halve.', 'Only an extensive property halves.']);

  M(L, 2, 'Concept', 'A bathtub of water and a cup of water are both at 40 °C. Which statement is correct?',
    'They are at the same temperature, but the bathtub contains much more heat (thermal energy)',
    ['The bathtub is at a higher temperature because it contains more water', 'Both contain the same amount of heat because their temperatures are equal', 'The cup is at a higher temperature because it is smaller', 'Temperature is extensive, so the bathtub\'s temperature is the sum of many cups'],
    'Temperature is intensive, so both are at 40 °C. The heat (thermal energy) content is extensive: the bathtub has far more water, so it holds far more energy - Silberberg\'s own example of heat vs temperature.',
    ['Is temperature intensive or extensive?', 'Is heat content intensive or extensive?', 'Same temperature, very different amounts of energy.']);

  M(L, 1, 'Concept', 'Which of the following is a PHYSICAL change?',
    'ice melting', ['iron rusting', 'wood burning', 'milk souring', 'an egg cooking'],
    'In a physical change the substance keeps its composition: ice and liquid water are both H₂O. Rusting, burning, souring and cooking all produce new substances with different compositions, so they are chemical changes.',
    ['Ask: is a new substance formed?', 'A change of state is not a change in composition.', 'Melted ice is still H₂O.']);

  M(L, 1, 'Concept', 'Which of the following is a CHEMICAL property?',
    'flammability', ['density', 'melting point', 'color', 'electrical conductivity'],
    'A chemical property describes how a substance changes into a different substance (here, whether it burns). Density, melting point, color and conductivity can be observed without changing the composition, so they are physical properties.',
    ['Can you observe the property without turning the substance into something else?', 'Measuring conductivity leaves a wire unchanged.', 'Burning creates new substances.']);

  M(L, 2, 'Concept', 'Which process is a CHEMICAL change?',
    'silver tarnishing', ['sugar dissolving in water', 'water boiling', 'an aluminum can being crushed', 'an iron nail being magnetized'],
    'Tarnish is silver sulfide, a new substance formed from silver and sulfur compounds in air - a chemical change. Dissolving, boiling, crushing and magnetizing leave the substances\' compositions unchanged.',
    ['Look for a new substance with a new composition.', 'Tarnish is a different compound from silver metal.', 'Phase changes and changes of shape are physical.']);

  M(L, 3, 'Concept', 'Consider these statements about copper: (1) it conducts electricity; (2) it reacts with nitric acid to give a brown gas; (3) it is reddish-brown; (4) it melts at 1085 °C; (5) it forms a green coating in moist air. Which are CHEMICAL properties?',
    '2 and 5 only', ['1, 2 and 5', '2 only', '3 and 5 only', '1 and 4 only'],
    'Chemical properties involve forming new substances: reacting with nitric acid (2) and forming the green copper carbonate/hydroxide coating (5). Conductivity (1), color (3) and melting point (4) are observed without changing copper\'s composition, so they are physical.',
    ['Mark each statement: does copper turn into something else?', 'Melting is a change of state, not of composition.', 'Two statements describe reactions.']);

  M(L, 2, 'Concept', 'Which statement correctly compares boiling water with passing an electric current through water to form H₂ and O₂?',
    'Boiling is a physical change; electrolysis is a chemical change', ['Both are physical changes', 'Both are chemical changes', 'Boiling is a chemical change; electrolysis is a physical change', 'Boiling breaks the O−H bonds, so it is a chemical change'],
    'Steam is still H₂O, so boiling only overcomes forces BETWEEN molecules - a physical change. Electrolysis turns water into two new substances, hydrogen and oxygen - a chemical change. Trap: boiling does not break covalent O−H bonds.',
    ['What substance is present after each process?', 'Steam = H₂O; electrolysis products = H₂ and O₂.', 'A new substance means a chemical change.']);

  M(L, 3, 'Concept', 'Which statement is FALSE?',
    'Burning gasoline is a physical change because the gasoline only changes from liquid to gas',
    ['Frost forming on a cold window is a physical change', 'A change that produces substances with new compositions is a chemical change', 'The temperature at which a substance melts is a physical property', 'A chemical property can be observed only by changing the composition of the substance'],
    'Burning gasoline is combustion: hydrocarbons react with O₂ to give CO₂ and H₂O - new substances, so it is a CHEMICAL change. The other four statements are true (frost is water vapor depositing as ice, a change of state).',
    ['Find the statement that mislabels a process.', 'Combustion makes CO₂ and H₂O.', 'Is combustion just evaporation?']);

  M(L, 1, 'Concept', 'Which state of matter has a fixed volume but takes the shape of its container?',
    'liquid', ['solid', 'gas', 'both solid and gas', 'none of the three states'],
    'A liquid has a definite volume (particles stay close together) but flows to take the shape of its container. A solid keeps both its shape and volume; a gas fills its whole container, so it has neither a fixed shape nor a fixed volume.',
    ['Pour water from a glass into a bowl: what changes and what does not?', 'The particles in this state are close but can move past each other.', 'Fixed volume, variable shape.']);

  M(L, 2, 'Concept', 'Why are gases much more compressible than liquids or solids?',
    'Gas particles are far apart, so most of a gas is empty space', ['Gas particles are smaller than the particles of liquids', 'Gas particles have no mass', 'Gas particles do not move', 'Gas particles are held in fixed positions'],
    'In a gas the particles are far apart and move randomly, so pressure can push them closer together. In liquids and solids the particles already touch, leaving little room to compress. Distractors: a substance\'s particles are the same size in every state; gas particles have mass and move rapidly.',
    ['Picture the spacing of particles in each state.', 'Compression squeezes out empty space.', 'Which state has the most space between particles?']);

  M(L, 2, 'Concept', 'Two oppositely charged particles are pulled farther apart. What happens to the potential energy of the pair?',
    'It increases', ['It decreases', 'It stays the same', 'It becomes zero', 'It is converted into mass'],
    'Opposite charges attract. Pulling them apart works against that attraction, so energy is stored as potential energy: the potential energy INCREASES. (Releasing them lets them move together, converting potential energy into kinetic energy.)',
    ['Do opposite charges attract or repel?', 'Separating attracting particles takes work.', 'Work done against an attraction is stored as potential energy.']);

  /* ---------------- counting significant figures ---------------- */
  M(L, 1, 'Concept', 'How many significant figures are in 0.0055?',
    '2', ['4', '5', '3', '1'],
    'Leading zeros only locate the decimal point and are never significant. In 0.0055 only the two 5s count: 2 significant figures (5.5 × 10⁻³). This is the lecture slide\'s example.',
    ['Leading zeros are placeholders.', 'Write it in scientific notation.', '5.5 × 10⁻³.']);

  M(L, 2, 'Concept', 'How many significant figures are in 0.06060 g?',
    '4', ['6', '5', '3', '2'],
    '0.06060: the two leading zeros do not count; the 6, the captured 0 between the 6s, the second 6 and the trailing 0 (after a decimal point) all count: 4 significant figures (6.060 × 10⁻²).',
    ['Ignore the leading zeros.', 'Zeros between nonzero digits count; trailing zeros count when there is a decimal point.', '6.060 × 10⁻².']);

  M(L, 2, 'Trap', 'How many significant figures are in 5300 (written with no decimal point)?',
    '2', ['4', '3', '1', 'unlimited'],
    'Trailing zeros with NO decimal point are not significant, so 5300 has 2 significant figures (5.3 × 10³). Written "5300." it would have 4. This exact pair is on the Lecture 1 slide.',
    ['Is there a decimal point?', 'Trailing zeros without a decimal point are placeholders.', 'Compare 5300 with 5300.']);

  M(L, 2, 'Concept', 'How many significant figures are in 3040 kg?',
    '3', ['4', '2', '1', '5'],
    'The 3, the captured 0 and the 4 are significant; the final 0 is a trailing zero with no decimal point, so it is not. 3040 kg has 3 significant figures (3.04 × 10³ kg).',
    ['Captured zeros (between nonzero digits) always count.', 'The last zero has no decimal point after it.', '3.04 × 10³.']);

  M(L, 2, 'Concept', 'How many significant figures are in 6.500 × 10⁻²?',
    '4', ['2', '3', '5', '6'],
    'In scientific notation every digit of the coefficient is significant, and the exponent never counts. 6.500 has 4 significant figures. Writing 6.5 × 10⁻² would show only 2.',
    ['Only the coefficient matters.', 'Trailing zeros after a decimal point count.', 'Count the digits in 6.500.']);

  M(L, 2, 'Concept', 'Which quantity is EXACT (has an unlimited number of significant figures)?',
    'the 1000 mL in exactly 1 L', ['1 kg = 2.205 lb', 'the speed of light, 2.998 × 10⁸ m/s', 'a mass of 12.00 g read from a balance', 'the density of water, 1.00 g/mL'],
    'Exact numbers come from definitions (1000 mL = 1 L, 2.54 cm = 1 in, 60 s = 1 min) or from counting. 1 kg = 2.205 lb is a ROUNDED conversion (4 significant figures). The speed of light, a balance reading and 1.00 g/mL are reported to a limited number of figures.',
    ['Exact numbers are defined or counted, not measured.', 'Is 2.205 the full value of pounds per kilogram?', 'Metric prefixes define exact relationships.']);

  M(L, 3, 'Concept', 'Which number has the MOST significant figures?',
    '40.050', ['0.000450', '4.050 × 10³', '405,000', '0.04005'],
    'Counts: 0.000450 → 3 (4, 5, 0); 4.050 × 10³ → 4; 405,000 → 3 (trailing zeros, no decimal point); 40.050 → 5 (captured zeros and a trailing zero after the decimal point); 0.04005 → 4. The answer is 40.050.',
    ['Count each one using the zero rules.', 'Leading zeros never count; trailing zeros count only with a decimal point.', 'One of them has five.']);

  M(L, 3, 'Concept', 'Which number has exactly THREE significant figures?',
    '0.0300', ['300', '3.000', '0.003', '30.03'],
    '0.0300: leading zeros do not count; the 3 and the two trailing zeros (after a decimal point) do: 3 significant figures (3.00 × 10⁻²). 300 has 1; 3.000 has 4; 0.003 has 1; 30.03 has 4.',
    ['Apply the leading- and trailing-zero rules.', 'Trailing zeros count when there is a decimal point.', '3.00 × 10⁻².']);

  M(L, 3, 'Trap', 'A measured time is written "57,600. s". Which is the same value in scientific notation with the correct number of significant figures?',
    '5.7600 × 10⁴ s', ['5.76 × 10⁴ s', '5.760 × 10⁴ s', '5.7600 × 10⁻⁴ s', '57.600 × 10³ s'],
    'The decimal point after 57,600 makes both trailing zeros significant: 5 significant figures, so 5.7600 × 10⁴ s. Distractors: 5.76 and 5.760 drop significant zeros; 10⁻⁴ has the wrong sign; 57.600 × 10³ has the right digits but is not proper scientific notation (the coefficient must be between 1 and 10).',
    ['The decimal point at the end matters.', 'How many significant figures does 57,600. have?', 'Keep all five digits in the coefficient.']);

  M(L, 2, 'Concept', 'Express 0.0000007160 cm³ in scientific notation with the correct number of significant figures.',
    '7.160 × 10⁻⁷ cm³', ['7.16 × 10⁻⁷ cm³', '7.160 × 10⁻⁸ cm³', '7.160 × 10⁷ cm³', '7.160 × 10⁻⁶ cm³'],
    'Move the decimal point 7 places right to get 7.160, so the exponent is −7. The leading zeros vanish (not significant) but the trailing zero stays (significant): 4 significant figures, 7.160 × 10⁻⁷ cm³. Distractors: 7.16 drops a significant zero; −8, −6 and +7 miscount the decimal shift.',
    ['Count how many places the decimal point moves.', 'A number less than 1 has a negative exponent.', 'The trailing zero in 0.0000007160 is significant.']);

  M(L, 1, 'Lecture', 'When you record a reading from a ruler, buret or graduated cylinder, you should write down:',
    'all the digits known with certainty plus one estimated digit', ['only the digits known with certainty', 'all certain digits plus two estimated digits', 'as many digits as your calculator shows', 'the value of the nearest marked line only'],
    'Lecture 1: to record the uncertainty properly, a measurement uses all the known digits plus ONE estimated digit (the shell measured as 4.1 cm on a ruler marked in cm; the cylinder read as 17.5 mL). Those digits are the significant figures.',
    ['The last digit of any measurement is estimated.', 'How many estimated digits does a measurement carry?', 'Certain digits + one guess between the lines.']);

  M(L, 2, 'Concept', 'A buret is marked every 0.1 mL. Which reading is recorded correctly?',
    '22.47 mL', ['22.5 mL', '22.473 mL', '22 mL', '22.4700 mL'],
    'With marks every 0.1 mL, the tenths digit is certain and you estimate one more digit, the hundredths: 22.47 mL. 22.5 and 22 omit the estimated digit; 22.473 and 22.4700 claim precision the buret cannot give.',
    ['The markings give the certain digits.', 'Estimate one digit beyond the smallest division.', 'Smallest division 0.1 mL → record to 0.01 mL.']);

  M(L, 3, 'Lecture', 'Multiply and round to the correct number of significant figures: 3.951 × 0.83 = ?',
    '3.3', ['3.28', '3.27933', '3.27', '3.279'],
    '3.951 × 0.83 = 3.27933. In multiplication the answer keeps the FEWEST significant figures of the data: 0.83 has 2, so the answer is 3.3. (This is the Lecture 1 clicker question.) Distractors keep too many digits, and 3.27 also truncates instead of rounding.',
    ['Multiplication rule: fewest significant figures.', '0.83 has two significant figures.', 'Round 3.27933 to two significant figures.']);
  chk('clicker', 3.951 * 0.83, 3.27933, 1e-6);

  /* ---------------- rounding ---------------- */
  M(L, 2, 'Concept', 'Round 9.786 to three significant figures.',
    '9.79', ['9.78', '9.8', '9.786', '9.7'],
    'Keep 9.78, and look at the first digit removed: 6, which is more than 5, so the last kept digit goes up: 9.79. 9.78 truncates; 9.8 is two significant figures; 9.786 is four; 9.7 truncates to two.',
    ['Keep three digits and look at the next one.', 'If the removed digit is more than 5, round up.', 'The digit after 9.78 is 6.']);

  M(L, 2, 'Trap', 'Round 0.0063496 to three significant figures.',
    '0.00635', ['0.00634', '0.006', '0.0063', '0.006350'],
    'The first three significant figures are 6, 3, 4; the next digit is 9, so 4 rounds up to 5: 0.00635. Distractors: 0.00634 truncates; 0.006 and 0.0063 keep too few; 0.006350 adds a fourth significant figure. Leading zeros are not counted.',
    ['Leading zeros do not count - start with the 6.', 'Keep 6, 3, 4 and look at the next digit.', 'The next digit is 9.']);

  M(L, 3, 'Trap', 'Round 1.4564 to two significant figures.',
    '1.5', ['1.4', '1.46', '1.45', '1.456'],
    'Keep 1.4; the removed digits are 564. The first removed digit is 5 and it is followed by NONZERO digits, so the value is above the halfway point and rounds up: 1.5 (the lecture\'s own example). 1.4 treats it as an exact half or truncates; the others keep too many digits.',
    ['Look at all the digits being removed, not just the first.', '0.0564 is more than half of 0.1.', 'A 5 followed by nonzero digits always rounds up.']);

  M(L, 3, 'Lecture', 'The CHM 11510 Lecture 1 rounding rules say: if the digit removed is 5 followed only by zeros (or nothing), the preceding digit goes up if it is odd and stays the same if it is even. Using that rule, round 1.4500 to two significant figures.',
    '1.4', ['1.5', '1.45', '1.450', '1.40'],
    'The digits removed are 500 - an exact 5 followed by zeros - and the preceding digit 4 is EVEN, so it stays: 1.4 (the slide\'s example; 1.75 → 1.8 because 7 is odd). Note: the 10th-edition textbook text instead says a removed 5 always rounds up, which would give 1.5; the stem here asks for the lecture rule. Exam choices rarely hinge on this case.',
    ['Is the removed part exactly half (5 then zeros)?', 'Then look at whether the digit before it is odd or even.', '4 is even.']);

  M(L, 3, 'Lecture', 'Your calculator shows 2458.72 for a speed that should have three significant figures. How should you report it?',
    '2.46 × 10³', ['2.45 × 10³', '246', '2459', '2.4587 × 10³'],
    'Three significant figures: 2, 4, 5, and the next digit (8) rounds the 5 up → 2.46 × 10³. Writing "2460" would be ambiguous about the trailing zero, so scientific notation is clearest. Distractors: 2.45 × 10³ truncates; 246 loses the magnitude (it is 2460, not 246); 2459 and 2.4587 × 10³ keep too many digits.',
    ['Keep three digits and check the fourth.', 'Use scientific notation to avoid an ambiguous trailing zero.', '2458.72 → 2.46 × 10³.']);

  /* ---------------- sig figs in calculations ---------------- */
  M(L, 2, 'Calculation', 'A sheet of material measures 9.2 cm × 6.8 cm × 0.3744 cm. What is its volume, correctly rounded?',
    '23 cm³', ['23.4 cm³', '23.42 cm³', fx(9.2 * 6.8 * 0.3744, 8) + ' cm³', '2 × 10¹ cm³'],
    `9.2 × 6.8 × 0.3744 = ${fx(9.2 * 6.8 * 0.3744, 8)} cm³. Multiplication keeps the fewest significant figures: 9.2 and 6.8 each have 2, so V = 23 cm³. The precise thickness cannot rescue the two-figure length and width.`,
    ['Multiplication/division rule.', 'Find the measurement with the fewest significant figures.', 'Two significant figures.']);

  M(L, 2, 'Calculation', 'You add 23.28 mL of water from a buret to 83.5 mL of solution in a graduated cylinder. What total volume should you report?',
    '106.8 mL', ['106.78 mL', '107 mL', '106.780 mL', '1.1 × 10² mL'],
    '83.5 + 23.28 = 106.78 mL. Addition keeps the fewest DECIMAL PLACES: 83.5 has one, so the answer is 106.8 mL (four significant figures - more than 83.5 has, which is fine for addition). Distractors: 107 mL wrongly applies the "three significant figures" rule from multiplication.',
    ['Addition rule: decimal places, not significant figures.', '83.5 has one decimal place.', 'Round 106.78 to the tenths place.']);

  M(L, 2, 'Lecture', 'Add and round correctly: 197.843 + 98.7 = ?',
    '296.5', ['296.543', '296.54', '297', '3.0 × 10²'],
    '197.843 + 98.7 = 296.543. The answer keeps the fewest decimal places of the data: 98.7 has one, so 296.5 (the Lecture 1 example). 297 wrongly uses the significant-figure count of 98.7.',
    ['Addition rule.', 'Which number has the fewest decimal places?', 'One decimal place.']);

  M(L, 2, 'Lecture', 'Multiply and round correctly: 1.9 × 87.6 = ?',
    '1.7 × 10²', ['166.44', '166.4', '166', '1.66 × 10²'],
    '1.9 × 87.6 = 166.44. Multiplication keeps the fewest significant figures: 1.9 has 2, so the answer is 1.7 × 10² (the slide writes it as 170). The others keep three or more figures.',
    ['Multiplication rule.', '1.9 has two significant figures.', 'Round 166.44 to two significant figures.']);

  M(L, 4, 'Trap', 'Evaluate (35.62 − 32.1) ÷ 2.115 and report the answer with the correct number of significant figures.',
    fx((35.62 - 32.1) / 2.115, 2), [fx((35.62 - 32.1) / 2.115, 3), fx((35.62 - 32.1) / 2.115, 4), fx((35.62 - 32.1) / 2.115, 5), '2'],
    `Do the subtraction first: 35.62 − 32.1 = 3.52, but 32.1 has one decimal place, so the difference is good to the tenths place: 3.5 (TWO significant figures). Then 3.52 ÷ 2.115 = ${fx(3.52 / 2.115, 5)}, which must be reported to two significant figures: 1.7. Trap: 2.115 has four figures, but the subtraction step already limited the result.`,
    ['Mixed operations: do the subtraction first and note its precision.', '3.52 is only good to one decimal place - how many significant figures is that?', 'Two significant figures in the final answer.']);
  chk('mixed1 same either way', Number(fx(3.5 / 2.115, 2)), Number(fx(3.52 / 2.115, 2)), 1e-9);

  M(L, 4, 'Calculation', 'Evaluate (8.21 + 0.0155) × 4.1 and report the answer with the correct number of significant figures.',
    fx((8.21 + 0.0155) * 4.1, 2), [fx((8.21 + 0.0155) * 4.1, 3), fx((8.21 + 0.0155) * 4.1, 4), fx((8.21 + 0.0155) * 4.1, 5), '30'],
    `Addition first: 8.21 + 0.0155 = 8.2255 → good to two decimal places (8.23, three significant figures). Then × 4.1: 8.2255 × 4.1 = ${fx(8.2255 * 4.1, 5)}. 4.1 has two significant figures, so the answer is 34. Distractors keep too many figures; "30" has only one.`,
    ['Addition step: decimal places. Multiplication step: significant figures.', 'The sum has three significant figures; 4.1 has two.', 'Two significant figures in the end.']);
  chk('mixed2 same either way', Number(fx(8.23 * 4.1, 2)), Number(fx(8.2255 * 4.1, 2)), 1e-9);

  M(L, 3, 'Calculation', 'Three weighings of the same object give 10.25 g, 10.31 g and 10.28 g. What is the average mass, correctly reported?',
    '10.28 g', ['10.3 g', '10.280 g', '10 g', '10.2800 g'],
    'Sum = 10.25 + 10.31 + 10.28 = 30.84 g (two decimal places). Dividing by 3 - an exact count - does not limit the figures: 30.84 / 3 = 10.28 g. Distractors: 10.3 drops a significant figure; 10 treats the count 3 as a one-significant-figure measurement; 10.280 and 10.2800 add figures the data do not have.',
    ['Add first (decimal-place rule), then divide by the count.', 'The 3 is a counted, exact number.', 'Keep four significant figures.']);

  M(L, 3, 'Lecture', 'You are driving at 55.0 mi/h. What is your speed in cm/s? (1 mi = 5280 ft, 1 ft = 12 in, 1 in = 2.54 cm, all exact)',
    sci(55.0 * 5280 * 12 * 2.54 / 3600, 3) + ' cm/s', [fx(55.0 * 5280 * 12 * 2.54 / 3600, 6) + ' cm/s', sci(55.0 * 5280 * 12 * 2.54 / 3600, 2) + ' cm/s', sci(55.0 * 5280 * 12 * 2.54 / 60, 3) + ' cm/s', sci(55.0 * 5280 * 12 * 2.54, 3) + ' cm/s'],
    `55.0 mi/h × 5280 ft/mi × 12 in/ft × 2.54 cm/in × 1 h/3600 s = ${fx(55.0 * 5280 * 12 * 2.54 / 3600, 6)} cm/s → 2.46 × 10³ cm/s (the Lecture 1 example: 55.0 has three significant figures; the conversion factors are exact). Distractors: 2458.72 cm/s is unrounded; 2.5 × 10³ has only two figures; 1.48 × 10⁵ divides by 60 only (minutes); 8.85 × 10⁶ never converts hours to seconds.`,
    ['Chain the length conversions mi → ft → in → cm.', 'Then convert hours to seconds: 1 h = 3600 s.', 'Three significant figures from 55.0.']);

  M(L, 4, 'Trap', 'A student adds 2.35 g to a mass measured as 1.0 × 10³ g. How should the total mass be reported?',
    '1.0 × 10³ g', ['1002.35 g', '1002.4 g', '1002 g', '1.00 × 10³ g'],
    '1.0 × 10³ g is known only to the HUNDREDS place (two significant figures: 1.0 thousand). Addition keeps the precision of the least precise term, so 1000 + 2.35 = 1002.35 must be rounded to the hundreds place: 1.0 × 10³ g. The 2.35 g is lost in the uncertainty. Distractors all claim precision in the tens place or beyond, which the large mass does not have.',
    ['Where is the last significant digit of 1.0 × 10³?', 'Write 1.0 × 10³ as a number with its uncertain digit marked: 1,0̲00.', 'Round 1002.35 to the hundreds place.']);

  M(L, 3, 'Calculation', 'A calorimetry calculation gives q = 4.184 J/(g·°C) × 50.0 g × 6.7 °C. How should q be reported?',
    sci(4.184 * 50.0 * 6.7, 2) + ' J', [fx(4.184 * 50.0 * 6.7, 5) + ' J', sci(4.184 * 50.0 * 6.7, 3) + ' J', fx(4.184 * 50.0 * 6.7, 4) + ' J', '1 × 10³ J'],
    `4.184 × 50.0 × 6.7 = ${fx(4.184 * 50 * 6.7, 5)} J. The temperature change 6.7 °C has only two significant figures, so q = 1.4 × 10³ J. This is why a ΔT measured to only two figures limits a whole thermochemistry answer.`,
    ['Multiplication rule.', 'Find the factor with the fewest significant figures.', '6.7 has two significant figures.']);

  /* ---------------- accuracy, precision, error ---------------- */
  M(L, 1, 'Concept', 'In measurement, PRECISION refers to:',
    'how closely repeated measurements agree with one another', ['how close a measurement is to the true value', 'the number of digits a calculator displays', 'the absence of systematic error', 'the difference between the largest measurement and the true value'],
    'Precision (reproducibility) is the closeness of measurements in a series to EACH OTHER. Accuracy is closeness to the ACTUAL value. A set can be precise without being accurate (tightly clustered around the wrong value).',
    ['Two words, two meanings: accuracy and precision.', 'One compares measurements with each other, the other with the true value.', 'Reproducibility is the other name for this one.']);

  const sets = 'The true mass of an object is 25.00 g. Four students each weigh it three times: Set A: 25.01, 24.99, 25.00 g; Set B: 26.02, 26.01, 26.03 g; Set C: 24.50, 25.60, 24.90 g; Set D: 26.90, 25.70, 27.20 g.';
  M(L, 2, 'Concept', sets + ' Which set is precise but NOT accurate?',
    'Set B', ['Set A', 'Set C', 'Set D', 'Sets A and B'],
    'Set B values agree within 0.02 g (precise) but all sit about 1.02 g above 25.00 g (not accurate - a systematic error). Set A is precise AND accurate (so "Sets A and B" is wrong). Set C scatters widely but averages 25.00 g; Set D scatters and averages 26.60 g.',
    ['Precise = close to each other. Accurate = close to 25.00 g.', 'Look for a tight cluster in the wrong place.', 'One set is consistently about 1 g high.']);

  M(L, 3, 'Concept', sets + ' Which set shows large random error but an AVERAGE close to the true value?',
    'Set C', ['Set A', 'Set B', 'Set D', 'Sets C and D'],
    'Averages: A 25.00, B 26.02, C (24.50 + 25.60 + 24.90)/3 = 25.00, D (26.90 + 25.70 + 27.20)/3 = 26.60 g. C and D both scatter by about 1 g (large random error, low precision), but only C\'s average lands on the true value. D also has a systematic error.',
    ['Large random error = widely scattered values.', 'Compute the averages of the two scattered sets.', 'Only one scattered set averages 25.00 g.']);

  M(L, 2, 'Concept', 'A balance reads 0.50 g too high on every weighing. What kind of error is this, and what does it affect?',
    'systematic error; it lowers accuracy', ['random error; it lowers precision', 'systematic error; it lowers precision only', 'random error; it lowers accuracy only', 'no error, because the readings are reproducible'],
    'An error that pushes every reading the same way (all high or all low) is systematic, typically from faulty or uncalibrated equipment. It makes results inaccurate even if they are perfectly reproducible (precise). Random error scatters values above and below and lowers precision.',
    ['Are the readings off in the same direction every time?', 'Same direction every time = systematic.', 'Systematic error hurts accuracy.']);

  M(L, 3, 'Concept', 'Which action best reduces a SYSTEMATIC error in a measurement?',
    'calibrating the instrument against a known standard', ['averaging more repeated trials', 'recording more digits from the display', 'carrying extra digits through the calculation', 'rounding only at the end of the calculation'],
    'Systematic error shifts every reading the same way, so averaging cannot remove it; it is corrected by calibration - comparing the device with a known standard. Averaging more trials reduces the effect of RANDOM error; the other choices are about sig-fig bookkeeping, not measurement error.',
    ['Does averaging help if every reading is too high by the same amount?', 'You need to find out how far off the instrument is.', 'Compare the device with a standard of known value.']);

  M(L, 2, 'Concept', 'Large RANDOM error in a set of measurements results in:',
    'low precision', ['low accuracy only, with high precision', 'values that are all too high', 'values that are all too low', 'no effect, because random errors cancel in each measurement'],
    'Random error scatters values above and below the actual value, so the measurements disagree with each other: low precision. (Their average can still be close to the true value.) All-high or all-low values are the signature of systematic error.',
    ['Random = sometimes high, sometimes low.', 'Scattered values disagree with each other.', 'Disagreement among repeats is low ___.']);

  M(L, 4, 'Exam', 'The true density of aluminum is 2.70 g/cm³. Four students measure it three times each. Student 1: 2.71, 2.69, 2.70. Student 2: 2.95, 2.94, 2.96. Student 3: 2.55, 2.88, 2.67. Student 4: 2.31, 2.62, 2.40 (all g/cm³). Which statement is FALSE?',
    'Student 2\'s results are more accurate than Student 3\'s because they are more precise',
    ['Student 2\'s results show a systematic error', 'Student 3\'s average is accurate even though the results are imprecise', 'Student 1\'s results are both precise and accurate', 'Student 4\'s results have low precision and low accuracy'],
    `Averages: Student 1 = ${fx((2.71 + 2.69 + 2.70) / 3, 3)}, Student 2 = ${fx((2.95 + 2.94 + 2.96) / 3, 3)}, Student 3 = ${fx((2.55 + 2.88 + 2.67) / 3, 3)}, Student 4 = ${fx((2.31 + 2.62 + 2.40) / 3, 3)} g/cm³. Student 2 is precise (spread 0.02) but every value is about 0.25 high - a systematic error, so NOT accurate. Student 3 scatters (imprecise) but averages 2.70, the true value, so Student 3 is the more accurate. Precision does not imply accuracy - that statement is false. The other four statements are true.`,
    ['Compute each student\'s average and spread.', 'Accuracy compares the average with 2.70; precision compares the values with each other.', 'Does being tightly clustered make a result correct?']);
  chk('s3 avg', (2.55 + 2.88 + 2.67) / 3, 2.70, 1e-9); chk('s2 avg', (2.95 + 2.94 + 2.96) / 3, 2.95, 1e-9);

  M(L, 2, 'Concept', 'A thermometer always reads 2 °C higher than the true temperature. Which description fits measurements made with it?',
    'They can be precise but are not accurate', ['They are accurate but not precise', 'They are neither precise nor accurate, because the error is random', 'They are accurate, because the error is the same every time', 'They have only random error'],
    'A constant offset is a systematic error: repeated readings can agree closely (precise) while all being 2 °C too high (inaccurate). Calibration would fix it.',
    ['Is the error the same every time or scattered?', 'A constant offset is systematic.', 'Systematic error affects accuracy, not reproducibility.']);

  /* ---------------- dimensional analysis chains ---------------- */
  M(L, 3, 'Calculation', 'Speaker wire costs $1.25 per foot. What is the cost of 325 cm of wire? (2.54 cm = 1 in, 12 in = 1 ft)',
    '$' + fx(325 / 2.54 / 12 * 1.25, 3), ['$' + fx(325 * 1.25, 3), '$' + fx(325 / 12 * 1.25, 3), '$' + fx(325 / 2.54 * 1.25, 3), '$' + fx(325 * 2.54 / 12 * 1.25, 3)],
    `325 cm × (1 in / 2.54 cm) × (1 ft / 12 in) × ($1.25 / 1 ft) = ${fx(325 / 2.54 / 12, 4)} ft × $1.25/ft = $${fx(325 / 2.54 / 12 * 1.25, 4)} → $13.3. Distractors: $406 never converts the length; $33.9 skips cm → in; $160 skips in → ft; $86.0 multiplies by 2.54 instead of dividing.`,
    ['Get the length in feet, because the price is per foot.', 'cm → in → ft, arranging each factor so units cancel.', 'Then multiply by $1.25 per foot.']);

  M(L, 3, 'Calculation', 'A drug is prescribed at 2.5 mg per kg of body mass. How many milligrams should a 165 lb patient receive? (1 kg = 2.205 lb)',
    sci(165 / 2.205 * 2.5, 2) + ' mg', [sci(165 * 2.5, 2) + ' mg', sci(165 * 2.205 * 2.5, 2) + ' mg', fx(165 / 2.5, 2) + ' mg', sci(165 / 2.205 * 2.5, 3) + ' mg'],
    `165 lb × (1 kg / 2.205 lb) = ${fx(165 / 2.205, 4)} kg; × 2.5 mg/kg = ${fx(165 / 2.205 * 2.5, 4)} mg → 1.9 × 10² mg (2.5 mg/kg has two significant figures). Distractors: ${sci(165 * 2.5, 2)} mg uses pounds as if they were kg; 9.1 × 10² mg multiplies by 2.205; 66 mg divides by the dose; 1.87 × 10² mg keeps three figures.`,
    ['The dose is per kilogram, so convert the patient\'s mass to kg.', 'Divide pounds by 2.205.', 'Then multiply by 2.5 mg/kg and round to two significant figures.']);

  M(L, 4, 'Exam', 'A child of mass 22.0 kg needs an antibiotic dose of 15 mg per kg. The liquid suspension contains 125 mg of drug per 5.00 mL. What volume of suspension should be given?',
    fx(22.0 * 15 / 125 * 5.00, 2) + ' mL', [fx(22.0 * 15 / 5.00, 2) + ' mL', fx(22.0 * 15 / 125, 2) + ' mL', '8.2 × 10³ mL', fx(15 * 5.00 / 125, 2) + ' mL'],
    `Dose = 22.0 kg × 15 mg/kg = 330 mg. Volume = 330 mg × (5.00 mL / 125 mg) = ${fx(330 * 5 / 125, 3)} mL → 13 mL (15 mg/kg has two significant figures). Distractors: 66 mL divides by 5.00 instead of using the concentration; 2.6 mL divides by 125 but forgets the 5.00 mL; 8.2 × 10³ mL inverts the concentration (8250, with the exact 5 rounded to even as in Lecture 1); 0.60 mL ignores the child's mass.`,
    ['First find the dose in mg.', 'Use the label as a conversion factor: 125 mg = 5.00 mL.', '330 mg × 5.00 mL/125 mg.']);

  chk('inverted dose (8250 rounds half-even to 8.2e3)', 22.0 * 15 * 125 / 5.00, 8250, 1e-9);

  M(L, 3, 'Calculation', 'An IV line delivers 2.0 drops per second, and each drop has a mass of 55 mg. What mass, in kilograms, is delivered in 6.0 hours?',
    fx(2.0 * 55 * 6.0 * 3600 / 1e6, 2) + ' kg', [sci(2.0 * 55 * 6.0 * 3600 / 1e3, 2) + ' kg', fx(2.0 * 55 * 6.0 * 60 / 1e6, 2) + ' kg', sci(2.0 * 55 * 6.0 / 1e6, 2) + ' kg', sci(2.0 * 55 * 6.0 * 3600, 2) + ' kg'],
    `6.0 h × 3600 s/h = 21,600 s. Drops = 2.0 drops/s × 21,600 s = 43,200 drops. Mass = 43,200 × 55 mg = ${sci(2.0 * 55 * 21600, 4)} mg × (1 g / 1000 mg) × (1 kg / 1000 g) = ${fx(2.0 * 55 * 21600 / 1e6, 4)} → 2.4 kg. Distractors: 2.4 × 10³ kg converts mg → g but calls it kg; 0.040 kg converts hours to minutes only; 6.6 × 10⁻⁴ kg never converts hours to seconds; 2.4 × 10⁶ kg skips mg → kg.`,
    ['The rate is per second, so convert the time to seconds.', 'drops/s × s → drops; × mg/drop → mg.', 'mg → kg is ÷ 10⁶.']);

  N(L, 3, 'Calculation', 'Convert a speed of 55.0 mi/h to meters per second. (1 mi = 5280 ft, 1 ft = 12 in, 1 in = 2.54 cm, all exact; enter a number in m/s.)',
    fx(55.0 * 5280 * 12 * 2.54 / 100 / 3600, 3) + ' m/s', Number(fx(55.0 * 5280 * 12 * 2.54 / 100 / 3600, 3)),
    `55.0 mi/h × 5280 ft/mi × 12 in/ft × 2.54 cm/in × (1 m/100 cm) × (1 h/3600 s) = ${fx(55.0 * 5280 * 12 * 2.54 / 100 / 3600, 5)} → 24.6 m/s. Trap: forgetting the 3600 s/h gives 8.85 × 10⁴ m/s.`,
    ['Convert the distance unit and the time unit separately.', 'mi → ft → in → cm → m on top; h → s on the bottom.', '1 mi = 1609.344 m exactly; divide by 3600.']);

  M(L, 3, 'Calculation', 'A professor walks one mile in 15 minutes. At this pace, how many minutes does it take to walk 10,500 m? (1 mi = 1.609 km)',
    fx(10.5 / 1.609 * 15, 2) + ' min', [sci(10.5 * 1.609 * 15, 2) + ' min', fx(10.5 / 1.609, 2) + ' min', sci(10500 * 15, 2) + ' min', fx(10.5 / 1.609 * 15, 4) + ' min'],
    `10,500 m = 10.5 km. 10.5 km × (1 mi / 1.609 km) = ${fx(10.5 / 1.609, 4)} mi. × 15 min/mi = ${fx(10.5 / 1.609 * 15, 4)} min → 98 min (15 min has two significant figures). Distractors: 2.5 × 10² min multiplies by 1.609; 6.5 min stops at miles; 1.6 × 10⁵ min treats meters as miles; 97.89 min keeps too many figures.`,
    ['Convert the distance into miles.', 'm → km → mi.', 'Then multiply by 15 min per mile; two significant figures.']);

  M(L, 3, 'Calculation', 'A standard apple contains 159 mg of potassium, and there are 3 apples per pound (treat as exact). How many grams of potassium are in 3.25 kg of apples? (1 kg = 2.205 lb)',
    fx(3.25 * 2.205 * 3 * 159 / 1000, 3) + ' g', [fx(3.25 / 2.205 * 3 * 159 / 1000, 3) + ' g', sci(3.25 * 2.205 * 3 * 159, 3) + ' g', fx(3.25 * 2.205 * 159 / 1000, 3) + ' g', fx(3.25 * 2.205 / 3 * 159 / 1000, 3) + ' g'],
    `3.25 kg × 2.205 lb/kg = ${fx(3.25 * 2.205, 4)} lb; × 3 apples/lb = ${fx(3.25 * 2.205 * 3, 4)} apples; × 159 mg/apple = ${fx(3.25 * 2.205 * 3 * 159, 5)} mg = ${fx(3.25 * 2.205 * 3 * 159 / 1000, 3)} g. Distractors: 0.703 g divides by 2.205; 3.42 × 10³ g leaves the answer in mg; 1.14 g forgets the 3 apples per pound; 0.380 g divides by 3.`,
    ['Plan the road map: kg → lb → apples → mg K → g K.', 'There are 2.205 lb in a kg (so the number of pounds is larger).', 'Remember the final mg → g step.']);

  M(L, 4, 'Exam', 'A car averages 28.5 mi per gallon and gasoline costs $3.89 per gallon. What is the fuel cost of a 452 km trip? (1 mi = 1.609 km)',
    '$' + fx(452 / 1.609 / 28.5 * 3.89, 3), ['$' + fx(452 / 28.5 * 3.89, 3), '$' + fx(452 * 1.609 / 28.5 * 3.89, 3), '$' + sci(452 / 1.609 * 28.5 * 3.89, 3), '$' + fx(452 / 1.609 / 28.5, 3)],
    `452 km × (1 mi / 1.609 km) = ${fx(452 / 1.609, 4)} mi; ÷ 28.5 mi/gal = ${fx(452 / 1.609 / 28.5, 4)} gal; × $3.89/gal = $${fx(452 / 1.609 / 28.5 * 3.89, 4)} → $38.3. Distractors: $61.7 treats km as miles; $99.3 multiplies by 1.609; $3.11 × 10⁴ multiplies by the mileage instead of dividing; $9.86 is the number of gallons, not the cost.`,
    ['km → mi → gal → $.', 'Miles per gallon is used upside down: gal/mi.', 'Check that the units cancel to dollars.']);

  M(L, 4, 'Trap', 'One gallon of paint covers 3.50 × 10² ft². How many gallons are needed to paint 125 m² of wall? (1 ft = 0.3048 m exactly)',
    fx(125 / 0.3048 ** 2 / 350, 3) + ' gal', [fx(125 / 0.3048 / 350, 3) + ' gal', fx(125 / 350, 3) + ' gal', fx(125 * 0.3048 ** 2 / 350, 3) + ' gal', sci(125 / 0.3048 ** 2, 3) + ' gal'],
    `1 ft² = (0.3048 m)² = 0.09290 m². 125 m² × (1 ft² / 0.09290 m²) = ${fx(125 / 0.3048 ** 2, 5)} ft². ÷ 350 ft²/gal = ${fx(125 / 0.3048 ** 2 / 350, 4)} → 3.84 gal. Distractors: 1.17 gal converts with 0.3048 unsquared; 0.357 gal never converts m² to ft²; 0.0332 gal multiplies by 0.0929; 1.35 × 10³ is the area in ft², not gallons.`,
    ['The area must be in ft² to use the coverage.', 'Square the length factor: (0.3048 m)² = 1 ft².', 'ft² ÷ 350 ft²/gal.']);

  M(L, 4, 'Exam', 'A furniture maker receives 4 bolts of fabric, each holding exactly 150 m². Each chair needs 27.0 ft² of fabric. How many COMPLETE chairs can be upholstered? (1 ft = 0.3048 m exactly)',
    String(Math.floor(600 / 0.3048 ** 2 / 27.0)) + ' chairs', [String(Math.floor(600 / 0.3048 / 27.0)) + ' chairs', String(Math.floor(600 / 27.0)) + ' chairs', String(Math.floor(600 * 0.3048 ** 2 / 27.0)) + ' chairs', String(Math.floor(600 / 0.3048 ** 2)) + ' chairs'],
    `Fabric = 4 × 150 m² = 600 m². 1 ft² = (0.3048)² m² = 0.09290 m², so 600 m² = ${fx(600 / 0.3048 ** 2, 5)} ft². Chairs = ${fx(600 / 0.3048 ** 2, 5)} ÷ 27.0 = ${fx(600 / 0.3048 ** 2 / 27, 4)} → 239 complete chairs. Distractors: 72 squares only the unit, not 0.3048 (the textbook's highlighted error); 22 skips the conversion; 2 multiplies by the factor; 6458 forgets to divide by 27.0 ft² per chair.`,
    ['Total fabric in m² first.', 'Convert m² to ft² with (0.3048)², not 0.3048.', 'Divide by 27.0 ft² per chair and keep whole chairs.']);

  N(L, 3, 'Calculation', 'A virus particle has a diameter of 25 nm. How many of these particles could line up side by side along a line 1.0 cm long? (Enter a number.)',
    sci(1e-2 / 25e-9, 2) + ' particles', 1e-2 / 25e-9,
    '1.0 cm = 1.0 × 10⁻² m and 25 nm = 25 × 10⁻⁹ m = 2.5 × 10⁻⁸ m. Number = (1.0 × 10⁻² m) ÷ (2.5 × 10⁻⁸ m per particle) = 4.0 × 10⁵ particles. Trap: dividing 1.0 by 25 without converting units gives 0.040.',
    ['Put both lengths in the same unit.', 'cm → m (× 10⁻²); nm → m (× 10⁻⁹).', 'Divide the line length by one particle\'s diameter.']);

  M(L, 2, 'Concept', 'Write 0.000470 in scientific notation with the correct number of significant figures.',
    '4.70 × 10⁻⁴', ['4.7 × 10⁻⁴', '4.70 × 10⁴', '47.0 × 10⁻⁵', '4.70 × 10⁻³'],
    'Move the decimal point 4 places right: 4.70 × 10⁻⁴. The trailing zero is significant (3 significant figures) and must stay. Distractors: 4.7 drops it; 10⁴ has the wrong sign; 47.0 × 10⁻⁵ is not proper notation; 10⁻³ miscounts the places.',
    ['Count the places the decimal point moves.', 'Small numbers get negative exponents.', 'Keep the trailing zero - it is significant.']);

  M(L, 2, 'Calculation', 'Calculate (3.0 × 10⁴)(2.0 × 10⁻⁶).',
    '6.0 × 10⁻²', ['6.0 × 10⁻²⁴', '6.0 × 10¹⁰', '5.0 × 10⁻²', '6.0 × 10²'],
    'Multiply the coefficients (3.0 × 2.0 = 6.0) and ADD the exponents (4 + (−6) = −2): 6.0 × 10⁻². Distractors: −24 multiplies the exponents; 10¹⁰ subtracts them; 5.0 adds the coefficients; 10² drops the minus sign.',
    ['Coefficients multiply; exponents add.', '4 + (−6) = ?', '3.0 × 2.0 = 6.0.']);

  M(L, 2, 'Calculation', 'Calculate (6.022 × 10²³) ÷ (2.0 × 10³) with the correct number of significant figures.',
    '3.0 × 10²⁰', ['3.011 × 10²⁰', '3.0 × 10²⁶', '1.2 × 10²⁷', '3.0 × 10¹⁹'],
    'Divide the coefficients (6.022 ÷ 2.0 = 3.011) and SUBTRACT the exponents (23 − 3 = 20): 3.011 × 10²⁰ → 3.0 × 10²⁰ (2.0 has two significant figures). Distractors: 3.011 keeps too many figures; 10²⁶ adds the exponents; 1.2 × 10²⁷ multiplies; 10¹⁹ miscounts.',
    ['Division: divide coefficients, subtract exponents.', '23 − 3 = 20.', 'Two significant figures from 2.0.']);
};
