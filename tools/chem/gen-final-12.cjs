/* Gym 12 - Gases (Silberberg Ch 5), lectures 25 and 26. Part of gen-final.cjs. */
module.exports = function (H) {
  const { s, sci, f, K, R, R8, mm } = H;
  const Q = [];
  const add = q => Q.push(q);

  /* ---------------- Lecture 25: pressure and the gas laws ---------------- */
  add({ l: 25, t: 1, tag: 'Concept',
    q: 'Which of the following pressure equalities is FALSE?',
    c: ['1 atm = 14.7 kPa', '1 atm = 760 mmHg', '1 atm = 760 torr', '1 atm = 101.325 kPa', '1 atm = 1.01325 bar'],
    why: '1 atm = 760 mmHg = 760 torr = 101.325 kPa = 1.01325 bar are all true. 14.7 is the number of POUNDS PER SQUARE INCH (psi) in 1 atm, not kilopascals - 1 atm is 101.325 kPa. The trap is remembering the number 14.7 without its unit.',
    h: ['Four of these are on the course constants sheet.', 'Torr and mmHg are the same size unit; a kilopascal is 1000 Pa.', '14.7 belongs to a non-SI unit (psi).'] });

  { const P = 745 / 760;
    add({ l: 25, t: 2, tag: 'Calculation',
      q: 'A mercury barometer reads 745 mmHg. What is the atmospheric pressure in atmospheres?',
      c: [s(P, 3) + ' atm', s(760 / 745, 3) + ' atm', sci(745 * 760, 3) + ' atm', s(745 / 101.325, 3) + ' atm', '0.745 atm'],
      why: `P = 745 mmHg × (1 atm / 760 mmHg) = ${s(P, 3)} atm. A pressure a little below 760 mmHg must come out a little below 1 atm. ${s(760 / 745, 3)} atm is the factor upside down, ${sci(745 * 760, 3)} multiplied instead of dividing, ${s(745 / 101.325, 3)} used the kPa factor, and 0.745 just converted mm to m.`,
      h: ['Which unit conversion factor links mmHg and atm?', '1 atm = 760 mmHg; arrange it so mmHg cancels.', '745 ÷ 760.'] }); }

  { const v = 0.875 * 101.325;
    add({ l: 25, t: 2, tag: 'Calculation',
      q: 'Convert a pressure of 0.875 atm to kilopascals. (Enter a number in kPa.)',
      a: s(v, 3) + ' kPa', num: v,
      why: `0.875 atm × (101.325 kPa / 1 atm) = ${s(v, 3)} kPa (3 sig figs from 0.875).`,
      h: ['Look up how many kPa equal 1 atm.', '1 atm = 101.325 kPa.', 'Multiply 0.875 by 101.325.'] }); }

  { const v = 98.6 / 101.325 * 760;
    add({ l: 25, t: 3, tag: 'Calculation',
      q: 'A weather report gives the air pressure as 98.6 kPa. What is this pressure in mmHg?',
      c: [sci(v, 3) + ' mmHg', sci(98.6 * 760, 3) + ' mmHg', sci(98.6 / 760, 3) + ' mmHg', sci(98.6 * 101.325 / 760, 3) + ' mmHg', sci(760 / 98.6 * 101.325, 3) + ' mmHg'],
      sort: true,
      why: `Go through atm: 98.6 kPa × (1 atm / 101.325 kPa) × (760 mmHg / 1 atm) = ${s(v, 3)} mmHg. Sanity check: 98.6 kPa is just under 1 atm, so the answer must be just under 760 mmHg. The other choices skip the kPa → atm step (${sci(98.6 * 760, 3)}), divide where they should multiply, or invert a factor.`,
      h: ['Is 98.6 kPa more or less than 1 atm? So should the answer be more or less than 760?', 'Two factors: kPa → atm, then atm → mmHg.', '98.6 ÷ 101.325 × 760.'] }); }

  add({ l: 25, t: 1, tag: 'Concept',
    q: 'A mercury barometer is a long glass tube, closed at the top, filled with mercury and inverted into a dish of mercury. Which change would change the VERTICAL height of the mercury column?',
    c: ['Carrying the barometer to the top of a mountain', 'Using a tube with twice the diameter', 'Tilting the tube at an angle', 'Using a longer tube', 'Pouring more mercury into the dish'],
    why: 'The column is held up by atmospheric pressure pushing on the mercury in the dish, so its vertical height depends only on the outside pressure (and the density of the liquid). On a mountain the air pressure is lower, so the column falls. Pressure is force per area, so a wider tube has more weight but also more area - no change. Tilting lengthens the column along the glass but the vertical height is the same; a longer tube or more mercury in the dish changes nothing.',
    h: ['What pushes the mercury up the tube?', 'The column height balances the outside air pressure.', 'Which choice changes the air pressure itself?'] });

  { const hw = 760 * 13.6 / 1000;
    add({ l: 25, t: 2, tag: 'Calculation',
      q: 'Mercury (d = 13.6 g/mL) stands 760 mm high in a barometer at 1 atm. How tall would the column be at 1 atm if the barometer used water (d = 1.00 g/mL) instead?',
      c: [s(hw, 3) + ' m', s(760 / 13.6 / 1000, 3) + ' m', '0.760 m', s(hw / 10, 3) + ' m', s(hw * 10, 3) + ' m'],
      sort: true,
      why: `The same pressure supports a column whose height is inversely proportional to the liquid's density: h(water) = 760 mm × (13.6 / 1.00) = ${s(760 * 13.6, 3)} mm = ${s(hw, 3)} m. Water is less dense, so the column must be TALLER - which is why barometers use mercury. Dividing by 13.6 gives a column shorter than mercury's, which is backwards.`,
      h: ['Will a less dense liquid need a taller or shorter column to balance the same pressure?', 'h × d is the same for both liquids.', '760 mm × 13.6, then convert mm to m.'] }); }

  { const P = (755 + 52) / 760;
    add({ l: 25, t: 3, tag: 'Calculation',
      q: 'A flask of gas is connected to an open-end mercury manometer; the other arm is open to the air at 755 mmHg. The mercury in the OPEN arm stands 52 mm HIGHER than the mercury in the arm attached to the flask. What is the gas pressure in atm?',
      c: [s(P, 3) + ' atm', s((755 - 52) / 760, 3) + ' atm', s(52 / 760, 3) + ' atm', s(755 / 760, 3) + ' atm', '807 atm'],
      why: `The gas has pushed the mercury away from the flask and up the open arm, so the gas pressure is GREATER than the air's by 52 mmHg: P = 755 + 52 = 807 mmHg = 807/760 = ${s(P, 3)} atm. Subtracting (${s((755 - 52) / 760, 3)} atm) gets the direction backwards; 52 mmHg alone would be a closed-end reading; 807 atm forgot to convert.`,
      h: ['Which side is pushing harder - the gas or the atmosphere?', 'Open-end: P(gas) = P(atm) ± Δh; the gas side is the side the mercury is pushed away from.', '755 + 52 mmHg, then divide by 760.'] }); }

  { const P = (763 - 38) / 760 * 101.325;
    add({ l: 25, t: 3, tag: 'Calculation',
      q: 'An open-end mercury manometer is attached to a flask. Atmospheric pressure is 763 mmHg, and the mercury in the arm attached to the FLASK is 38 mm higher than in the open arm. What is the gas pressure in kPa?',
      c: [s(P, 3) + ' kPa', s((763 + 38) / 760 * 101.325, 3) + ' kPa', s(38 / 760 * 101.325, 3) + ' kPa', s(763 / 760 * 101.325, 3) + ' kPa', '725 kPa'],
      why: `The atmosphere has pushed the mercury toward the flask, so the gas is at LOWER pressure than the air: P = 763 − 38 = 725 mmHg × (101.325 kPa / 760 mmHg) = ${s(P, 3)} kPa. Adding the 38 mm gets the direction backwards; 725 kPa forgot that mmHg is not kPa.`,
      h: ['The mercury is higher on the flask side - who pushed it there?', 'P(gas) = P(atm) − Δh when the flask side is higher.', '725 mmHg × 101.325/760.'] }); }

  { const P = 225 / 760;
    add({ l: 25, t: 2, tag: 'Calculation',
      q: 'In a CLOSED-end manometer (vacuum above the mercury in the closed arm) attached to a flask, the mercury in the closed arm is 225 mm higher than in the flask arm. What is the gas pressure?',
      c: [s(P, 3) + ' atm', s((760 + 225) / 760, 3) + ' atm', s((760 - 225) / 760, 3) + ' atm', s(760 / 225, 3) + ' atm', '0.225 atm'],
      why: `With a vacuum on the closed side, nothing pushes back except the mercury itself, so the height difference IS the gas pressure: P = 225 mmHg = 225/760 = ${s(P, 3)} atm. Atmospheric pressure does not enter a closed-end reading - adding or subtracting 760 is the open-end habit applied to the wrong device.`,
      h: ['What is above the mercury in the closed arm?', 'For a closed-end manometer P(gas) = Δh.', '225 ÷ 760.'] }); }

  { const P2 = 1.20 * 2.50 / 0.800;
    add({ l: 25, t: 2, tag: 'Calculation',
      q: 'A 2.50 L sample of gas at 1.20 atm is compressed to 0.800 L at constant temperature. What is the new pressure?',
      c: [s(P2, 3) + ' atm', s(1.20 * 0.800 / 2.50, 3) + ' atm', '1.20 atm', s(1.20 * (2.50 - 0.800), 3) + ' atm', s(2.50 / 0.800, 3) + ' atm'],
      sort: true,
      why: `Boyle's law (n and T fixed): P₁V₁ = P₂V₂ → P₂ = (1.20 atm)(2.50 L)/(0.800 L) = ${s(P2, 3)} atm. Squeezing the gas into a smaller volume must RAISE the pressure; ${s(1.20 * 0.800 / 2.50, 3)} atm inverts the volume ratio.`,
      h: ['Smaller volume at constant T: does P go up or down?', 'P₁V₁ = P₂V₂.', 'P₂ = 1.20 × 2.50 / 0.800.'] }); }

  add({ l: 25, t: 1, tag: 'Concept',
    q: 'For a fixed amount of gas at constant temperature, which plot gives a straight line passing through the origin?',
    c: ['P versus 1/V', 'P versus V', 'V versus P', '1/P versus 1/V', 'PV versus V'],
    why: 'Boyle: PV = constant, so P = k(1/V) - P plotted against 1/V is a straight line through the origin. P versus V (or V versus P) is a curve (hyperbola); 1/P versus 1/V is also a hyperbola; PV versus V is a horizontal line that does not pass through the origin.',
    h: ['Write Boyle’s law as P = something.', 'PV = k means P = k × (1/V).', 'y = kx is a line through the origin - which variables are y and x?'] });

  { const V2 = 455 * K(98) / K(22);
    add({ l: 25, t: 2, tag: 'Calculation',
      q: 'A balloon holds 455 mL of gas at 22 °C. It is heated to 98 °C at constant pressure. What is the new volume?',
      c: [s(V2, 3) + ' mL', s(455 * 98 / 22, 3) + ' mL', s(455 * K(22) / K(98), 3) + ' mL', s(455 * 22 / 98, 3) + ' mL', s(455 + 76, 3) + ' mL'],
      sort: true,
      why: `Charles's law needs kelvin: T₁ = 22 + 273.15 = 295.15 K, T₂ = 98 + 273.15 = 371.15 K. V₂ = 455 mL × (371.15/295.15) = ${s(V2, 3)} mL. Using °C (${s(455 * 98 / 22, 3)} mL) multiplies the volume by more than 4 - the kelvin trap. ${s(455 * K(22) / K(98), 3)} mL inverts the ratio (heating must expand the gas).`,
      h: ['Heating at constant pressure: bigger or smaller?', 'V₁/T₁ = V₂/T₂ with T in kelvin.', '455 × 371.15 / 295.15.'] }); }

  add({ l: 25, t: 4, tag: 'Trap',
    q: 'A sample of gas at 10 °C is heated to 20 °C at constant pressure. What happens to its volume?',
    c: ['It increases by about 3.5%', 'It doubles', 'It increases by exactly 10%', 'It halves', 'It does not change, because pressure is constant'],
    why: `Volume is proportional to KELVIN temperature: V₂/V₁ = (20 + 273.15)/(10 + 273.15) = 293.15/283.15 = ${(293.15 / 283.15).toFixed(4)}, an increase of about 3.5%. "Doubles" treats 10 → 20 °C as doubling the temperature, but °C has an arbitrary zero. Constant pressure is exactly the condition for Charles's law, so the volume does change.`,
    h: ['Is 20 °C really twice as hot as 10 °C?', 'Convert both temperatures to kelvin.', 'Compute 293.15/283.15.'] });

  { const P2 = 2.20 * K(45) / K(15);
    add({ l: 25, t: 2, tag: 'Calculation',
      q: 'A rigid steel tank contains air at 2.20 atm and 15 °C. It sits in the sun until the air is at 45 °C. What is the new pressure in atm? (Enter a number in atm.)',
      a: s(P2, 3) + ' atm', num: P2,
      why: `Rigid tank: V and n fixed, so Gay-Lussac's law P₁/T₁ = P₂/T₂ in KELVIN. P₂ = 2.20 atm × (318.15 K / 288.15 K) = ${s(P2, 3)} atm. Using °C would give 6.60 atm - a tripling the real tank never sees.`,
      h: ['Which two variables change? Which stay fixed?', 'P/T is constant for fixed n and V; T in kelvin.', '2.20 × 318.15 / 288.15.'] }); }

  { const T2 = K(25) * 2; const C = T2 - 273.15;
    add({ l: 25, t: 4, tag: 'Trap',
      q: 'An aerosol can contains gas at 1.50 atm at 25 °C. It will burst if the internal pressure reaches 3.00 atm. Treating the can as rigid, at what temperature (°C) will it burst?',
      c: [s(C, 3) + ' °C', '50.0 °C', s(T2, 3) + ' °C', s(T2 + 273.15, 3) + ' °C', s(K(25) / 2 - 273.15, 3) + ' °C'],
      sort: true,
      why: `Doubling the pressure of a rigid container doubles the KELVIN temperature: T₂ = 298.15 K × (3.00/1.50) = ${s(T2, 4)} K = ${s(C, 3)} °C. Doubling the °C value (50.0 °C) is the classic trap; ${s(T2, 3)} °C forgot to convert back from kelvin, and ${s(T2 + 273.15, 3)} °C added 273 instead of subtracting.`,
      h: ['Is P proportional to °C or to K?', 'P₁/T₁ = P₂/T₂ with T in K, then convert the answer back to °C.', 'T₂ = 2 × 298.15 K; subtract 273.15.'] }); }

  add({ l: 25, t: 2, tag: 'Calculation',
    q: 'A balloon holds 0.220 mol of helium in 5.00 L. Another 0.110 mol of helium is added at the same temperature and pressure. What is the new volume?',
    c: ['7.50 L', '2.50 L', '10.0 L', '3.33 L', '5.00 L'],
    why: 'Avogadro\'s law: V/n is constant at fixed T and P. n₂ = 0.220 + 0.110 = 0.330 mol, so V₂ = 5.00 L × (0.330/0.220) = 7.50 L. 10.0 L treats "added 0.110" as doubling; 3.33 L inverts the ratio; 2.50 L subtracts.',
    h: ['More gas at the same T and P takes up more room.', 'V₁/n₁ = V₂/n₂ - use the TOTAL moles after the addition.', '5.00 × 0.330/0.220.'] });

  { const V = 1.75 * (745 / 760) * (273.15 / K(25));
    add({ l: 25, t: 3, tag: 'Calculation',
      q: 'A gas sample occupies 1.75 L at 25 °C and 745 torr. What volume would it occupy at STP?',
      c: [s(V, 3) + ' L', s(1.75 * (745 / 760) * (K(25) / 273.15), 3) + ' L', s(1.75 * (760 / 745) * (273.15 / K(25)), 3) + ' L', s(1.75 * 745 / 760, 3) + ' L', s(1.75 * 273.15 / K(25), 3) + ' L'],
      sort: true,
      why: `Combined gas law: V₂ = V₁ × (P₁/P₂) × (T₂/T₁) = 1.75 L × (745/760) × (273.15/298.15) = ${s(V, 3)} L. Both corrections shrink the volume here (the pressure rises to 760 torr and the gas cools). Each wrong choice flips one ratio or leaves one correction out.`,
      h: ['STP = 0 °C and 760 torr. Will each change make the gas bigger or smaller?', 'P₁V₁/T₁ = P₂V₂/T₂, T in kelvin.', '1.75 × (745/760) × (273.15/298.15).'] }); }

  { const V = 12.0 * (1.00 / 0.310) * (K(-35) / K(22));
    add({ l: 25, t: 3, tag: 'Calculation',
      q: 'A weather balloon holds 12.0 L of helium at 1.00 atm and 22 °C. It rises to an altitude where the pressure is 0.310 atm and the temperature is −35 °C. What is its volume there in liters? (Enter a number in L.)',
      a: s(V, 3) + ' L', num: V,
      why: `V₂ = V₁ × (P₁/P₂) × (T₂/T₁) = 12.0 L × (1.00/0.310) × (238.15 K / 295.15 K) = ${s(V, 3)} L. The pressure drop makes it expand a lot; the cold makes it shrink a little. −35 °C must become 238.15 K before it goes into a ratio.`,
      h: ['Two things change: P and T.', 'P₁V₁/T₁ = P₂V₂/T₂ with kelvin temperatures.', '12.0 × (1.00/0.310) × (238.15/295.15).'] }); }

  { const n = 1.12 * 3.25 / (R * K(27));
    add({ l: 25, t: 2, tag: 'Calculation',
      q: 'How many moles of gas are in a 3.25 L flask at 1.12 atm and 27 °C? (Enter a number in mol.)',
      a: s(n, 3) + ' mol', num: n,
      why: `n = PV/RT = (1.12 atm)(3.25 L) / [(0.08206 L·atm/(mol·K))(300.15 K)] = ${s(n, 3)} mol.`,
      h: ['Which equation links P, V, n and T?', 'n = PV/RT, R = 0.08206 L·atm/(mol·K), T in K.', '(1.12 × 3.25)/(0.08206 × 300.15).'] }); }

  { const V = 0.500 * R * K(35) / 0.850;
    add({ l: 25, t: 2, tag: 'Calculation',
      q: 'What volume does 0.500 mol of N₂ occupy at 35 °C and 0.850 atm?',
      c: [s(V, 3) + ' L', s(0.500 * R * 35 / 0.850, 3) + ' L', s(0.500 * R8 * K(35) / 0.850, 3) + ' L', s(0.500 * R * K(35) * 0.850, 3) + ' L', '11.2 L'],
      sort: true,
      why: `V = nRT/P = (0.500 mol)(0.08206)(308.15 K)/(0.850 atm) = ${s(V, 3)} L. ${s(0.500 * R * 35 / 0.850, 3)} L used 35 instead of 308.15 K; ${s(0.500 * R8 * K(35) / 0.850, 3)} L used R = 8.314 with atm and L (units do not match); ${s(0.500 * R * K(35) * 0.850, 3)} L multiplied by P; 11.2 L is half of 22.4 - the STP molar volume, but this gas is not at STP.`,
      h: ['Not STP, so 22.4 L/mol does not apply.', 'V = nRT/P with the L·atm value of R.', '0.500 × 0.08206 × 308.15 / 0.850.'] }); }

  { const n = 4.40 / mm('CO2'); const P = n * R * K(25) / 2.00;
    add({ l: 25, t: 3, tag: 'Calculation',
      q: 'What is the pressure exerted by 4.40 g of CO₂ in a 2.00 L container at 25 °C?',
      c: [s(P, 3) + ' atm', s(4.40 * R * K(25) / 2.00, 3) + ' atm', s(n * R * 25 / 2.00, 3) + ' atm', s(n * R8 * K(25) / 2.00, 3) + ' atm', s(n * R * K(25), 3) + ' atm'],
      sort: true,
      why: `n = 4.40 g ÷ 44.01 g/mol = ${s(n, 4)} mol. P = nRT/V = (${s(n, 4)})(0.08206)(298.15)/(2.00) = ${s(P, 3)} atm. The traps: grams used as moles (${s(4.40 * R * K(25) / 2.00, 3)} atm), 25 °C left unconverted, R = 8.314 with L and atm, or forgetting to divide by V.`,
      h: ['PV = nRT needs moles, not grams.', 'Convert 4.40 g CO₂ to mol first (M = 44.01 g/mol).', 'P = 0.1000 × 0.08206 × 298.15 / 2.00.'] }); }

  { const T = 1.50 * 5.00 / (0.250 * R); const C = T - 273.15;
    add({ l: 25, t: 3, tag: 'Calculation',
      q: 'A 0.250 mol sample of gas fills a 5.00 L container at 1.50 atm. What is its temperature in degrees Celsius? (Enter a number in °C.)',
      a: s(C, 3) + ' °C', num: C,
      why: `T = PV/nR = (1.50)(5.00)/[(0.250)(0.08206)] = ${s(T, 4)} K. The question asks for °C: ${s(T, 4)} − 273.15 = ${s(C, 3)} °C. Entering the kelvin value is the trap.`,
      h: ['Solve PV = nRT for T.', 'T comes out in kelvin; the question wants °C.', 'T = 7.50/(0.250 × 0.08206), then subtract 273.15.'] }); }

  { const n = 155 * 12.0 / (R * K(21)); const g = n * 32.00;
    add({ l: 25, t: 3, tag: 'Calculation',
      q: 'A 12.0 L steel cylinder holds oxygen gas at 155 atm and 21 °C. What mass of O₂ is in the cylinder?',
      c: [sci(g, 3) + ' g', sci(n * 16.00, 3) + ' g', sci(155 * 12.0 / (R * 21) * 32.00, 3) + ' g', s(n, 3) + ' g', s(155 * 12.0 / (R8 * K(21)) * 32.00, 3) + ' g'],
      sort: true,
      why: `n = PV/RT = (155)(12.0)/[(0.08206)(294.15)] = ${s(n, 4)} mol O₂; mass = ${s(n, 4)} mol × 32.00 g/mol = ${sci(g, 3)} g. Using 16.00 g/mol forgets that oxygen gas is diatomic O₂; ${s(n, 3)} g stops at moles; the others used 21 K or the J-unit R.`,
      h: ['First find moles with PV = nRT.', 'T = 294.15 K; then multiply by the molar mass of O₂ (not O).', 'n ≈ 77.1 mol; × 32.00 g/mol.'] }); }

  add({ l: 25, t: 1, tag: 'Concept',
    q: 'Standard temperature and pressure (STP) for gases in this course means:',
    c: ['0 °C and 1 atm', '25 °C and 1 atm', '0 K and 1 atm', '0 °C and 0 atm', '100 °C and 1 atm'],
    why: 'STP is 0 °C (273.15 K) and 1 atm, where 1 mol of ideal gas occupies 22.4 L. 25 °C and 1 atm are the conditions for STANDARD STATES in thermochemistry (ΔH°f) - a different convention, and the most common mix-up.',
    h: ['It is the condition where molar volume is 22.4 L.', 'The temperature is the freezing point of water.', '273.15 K and 760 torr.'] });

  add({ l: 25, t: 2, tag: 'Calculation',
    q: 'How many moles of helium are in 5.60 L of He at STP?',
    c: ['0.250 mol', '4.00 mol', '125 mol', s(0.250 / 4.003, 3) + ' mol', s(5.60 / 4.003, 3) + ' mol'],
    why: 'At STP 1 mol occupies 22.4 L: n = 5.60 L ÷ 22.4 L/mol = 0.250 mol. 4.00 mol is 22.4/5.60 (upside down); 125 mol multiplies; dividing by 4.003 g/mol mixes up volume and mass.',
    h: ['What volume does one mole of gas occupy at STP?', 'n = V ÷ 22.4 L/mol.', '5.60 ÷ 22.4.'] });

  { const n = 5.60 / (R * K(25));
    add({ l: 25, t: 4, tag: 'Trap',
      q: 'How many moles of gas are in 5.60 L at 25 °C and 1.00 atm?',
      c: [s(n, 3) + ' mol', '0.250 mol', s(5.60 / (R * 25), 3) + ' mol', '4.00 mol', s(5.60 / 22.4 * K(25) / 273.15, 3) + ' mol'],
      sort: true,
      why: `This is NOT STP (25 °C, not 0 °C), so 22.4 L/mol does not apply. n = PV/RT = (1.00)(5.60)/[(0.08206)(298.15)] = ${s(n, 3)} mol. 0.250 mol is the STP shortcut applied at the wrong temperature; ${s(5.60 / 22.4 * K(25) / 273.15, 3)} mol corrected the temperature in the wrong direction (a warmer gas has FEWER moles in the same volume).`,
      h: ['Check the temperature before reaching for 22.4 L/mol.', 'Use n = PV/RT at 298.15 K.', '5.60/(0.08206 × 298.15).'] }); }

  { const d = 1.00 * 44.01 / (R * 273.15);
    add({ l: 25, t: 2, tag: 'Calculation',
      q: 'What is the density of CO₂ gas at STP?',
      c: [s(d, 3) + ' g/L', s(44.01 / (R * K(25)), 3) + ' g/L', s(R * 273.15 / 44.01, 3) + ' g/L', s(44.01 / (R8 * 273.15), 3) + ' g/L', s(32.00 / (R * 273.15), 3) + ' g/L'],
      sort: true,
      why: `d = PM/RT = (1.00 atm)(44.01 g/mol)/[(0.08206)(273.15 K)] = ${s(d, 3)} g/L (the same as 44.01 g ÷ 22.4 L). ${s(44.01 / (R * K(25)), 3)} g/L used 25 °C; ${s(R * 273.15 / 44.01, 3)} g/L is the formula upside down (that is L per gram); ${s(44.01 / (R8 * 273.15), 3)} used the J-unit R; ${s(32.00 / (R * 273.15), 3)} g/L used the molar mass of O₂.`,
      h: ['Density of a gas: d = PM/RT.', 'At STP you can also divide the molar mass by 22.4 L.', '44.01 ÷ 22.4.'] }); }

  { const M = mm('SF6'); const d = 0.950 * M / (R * K(35));
    add({ l: 25, t: 3, tag: 'Calculation',
      q: 'Sulfur hexafluoride, SF₆, is a very dense gas. What is its density at 0.950 atm and 35 °C? (Enter a number in g/L.)',
      a: s(d, 3) + ' g/L', num: d,
      why: `M(SF₆) = 32.06 + 6(19.00) = ${f(M, 2)} g/mol. d = PM/RT = (0.950)(${f(M, 2)})/[(0.08206)(308.15)] = ${s(d, 3)} g/L - about five times denser than air.`,
      h: ['d = PM/RT.', 'Find the molar mass of SF₆ and convert 35 °C to K.', '0.950 × 146.06 / (0.08206 × 308.15).'] }); }

  { const M = 2.39 * R * K(25) / 0.910;
    add({ l: 25, t: 3, tag: 'Calculation',
      q: 'An unknown gas has a density of 2.39 g/L at 25 °C and 0.910 atm. Which gas is it?',
      c: ['SO₂', 'O₂', 'Cl₂', 'SO₃', 'CO₂'],
      why: `M = dRT/P = (2.39 g/L)(0.08206)(298.15 K)/(0.910 atm) = ${s(M, 3)} g/mol, which matches SO₂ (64.06 g/mol). O₂ is 32.00, CO₂ 44.01, Cl₂ 70.90 and SO₃ 80.06 g/mol.`,
      h: ['Rearrange d = PM/RT for M.', 'M = dRT/P with T in kelvin.', 'You should get about 64 g/mol.'] }); }

  { const n = (750 / 760) * 0.354 / (R * K(100)); const M = 0.846 / n;
    add({ l: 25, t: 3, tag: 'Calculation',
      q: 'A volatile liquid is vaporized in a 354 mL flask at 100.0 °C and 750. torr; the vapor that fills the flask has a mass of 0.846 g. What is the molar mass of the compound? (Enter a number in g/mol.)',
      a: s(M, 3) + ' g/mol', num: M,
      why: `Convert first: P = 750./760 = ${s(750 / 760, 4)} atm, V = 0.354 L, T = 373.15 K. n = PV/RT = (${s(750 / 760, 4)})(0.354)/[(0.08206)(373.15)] = ${sci(n, 4)} mol. M = 0.846 g ÷ ${sci(n, 4)} mol = ${s(M, 3)} g/mol (diethyl ether is 74.12).`,
      h: ['Molar mass = grams ÷ moles; get moles from PV = nRT.', 'Convert torr → atm, mL → L, °C → K before using R = 0.08206.', 'n ≈ 0.01141 mol.'] }); }

  add({ l: 25, t: 1, tag: 'Concept',
    q: 'At the same temperature and pressure, which gas has the greatest density?',
    c: ['SF₆', 'He', 'CH₄', 'N₂', 'CO₂'],
    why: 'At fixed T and P, d = PM/RT is proportional to molar mass M. SF₆ (146 g/mol) beats CO₂ (44), N₂ (28), CH₄ (16) and He (4).',
    h: ['Look at d = PM/RT - what differs between the gases?', 'Density is proportional to molar mass at the same T and P.', 'Find the heaviest molecule.'] });

  { const M = 2.50 * R * 273.15;
    add({ l: 25, t: 4, tag: 'Exam',
      q: 'A hydrocarbon is 85.7% C and 14.3% H by mass, and its vapor has a density of 2.50 g/L at STP. What is its molecular formula?',
      c: ['C₄H₈', 'CH₂', 'C₂H₄', 'C₃H₆', 'C₅H₁₀'],
      why: `Empirical formula: 85.7 g C ÷ 12.01 = 7.14 mol; 14.3 g H ÷ 1.008 = 14.2 mol; ratio 1 : 2, so CH₂ (14.03 g/mol). Molar mass from the density: M = dRT/P = 2.50 × 0.08206 × 273.15 / 1.00 = ${s(M, 3)} g/mol (or 2.50 × 22.4). ${s(M, 3)} ÷ 14.03 = ${s(M / 14.026, 3)} ≈ 4, so the formula is C₄H₈. CH₂ is only the empirical formula.`,
      h: ['Two pieces: an empirical formula from the percentages, and a molar mass from the density.', 'At STP, M = d × 22.4 L/mol.', 'Divide that molar mass by the empirical-formula mass of CH₂.'] }); }

  add({ l: 25, t: 2, tag: 'Concept',
    q: 'A hot-air balloon rises because heating the air inside it at constant pressure:',
    c: ['lowers the air’s density, since d = PM/RT falls as T rises', 'increases the number of moles of air inside the balloon', 'raises the molar mass of the air', 'raises the pressure inside far above the outside pressure', 'makes the air molecules lighter'],
    why: 'd = PM/RT: at the same P and M, a higher T means a lower density. The balloon is open at the bottom, so the hot air inside is less dense than the cooler air outside and the balloon floats. The molecules are not lighter and M does not change; heating actually pushes some air OUT, lowering n.',
    h: ['Which variable in d = PM/RT is the burner changing?', 'Density is inversely proportional to T at fixed P.', 'Less dense air floats on denser air.'] });

  { const P2 = 1.00 * K(327) / K(27);
    add({ l: 25, t: 4, tag: 'Trap',
      q: 'A sealed rigid container holds gas at 1.00 atm and 27 °C. It is heated to 327 °C. What is the new pressure?',
      c: [s(P2, 3) + ' atm', s(327 / 27, 3) + ' atm', '0.500 atm', '1.00 atm', s(27 / 327, 3) + ' atm'],
      sort: true,
      why: `In kelvin: 27 °C = 300.15 K and 327 °C = 600.15 K - the absolute temperature DOUBLES. P₂ = 1.00 atm × 600.15/300.15 = ${s(P2, 3)} atm. ${s(327 / 27, 3)} atm uses the °C ratio, the trap the numbers were chosen to bait.`,
      h: ['Convert both temperatures to kelvin before comparing them.', 'P/T is constant in a rigid, sealed container.', 'What is 600.15/300.15?'] }); }

  add({ l: 25, t: 2, tag: 'Concept',
    q: 'For a fixed amount of gas, the pressure AND the kelvin temperature are both doubled. What happens to the volume?',
    c: ['It stays the same', 'It doubles', 'It quadruples', 'It halves', 'It falls to one-quarter'],
    why: 'V = nRT/P. Doubling T doubles V; doubling P halves it. The two cancel: V is unchanged.',
    h: ['Write V in terms of n, T and P.', 'V ∝ T/P for fixed n.', '(2T)/(2P) = T/P.'] });

  add({ l: 25, t: 3, tag: 'Concept',
    q: 'The moles of a gas sample are doubled, its kelvin temperature is halved, and its pressure is doubled. The new volume is what fraction of the original?',
    c: ['One-half', 'Unchanged', 'Double', 'Four times', 'One-quarter'],
    why: 'V = nRT/P, so V₂/V₁ = (2)(½)/(2) = ½. The doubled moles and halved temperature cancel, leaving only the doubled pressure, which halves V.',
    h: ['V ∝ nT/P.', 'Multiply the factors for n and T, divide by the factor for P.', '(2 × ½) ÷ 2.'] });

  add({ l: 25, t: 4, tag: 'Exam',
    q: 'Which sample contains the greatest number of gas molecules? (Every sample has a volume of 1.0 L.)',
    c: ['O₂ at 0 °C and 2.0 atm', 'H₂ at STP', 'CO₂ at STP', 'N₂ at 273 °C and 1.0 atm', 'He at 25 °C and 1.0 atm'],
    why: 'n = PV/RT, and the identity of the gas does not matter. At the same V, n ∝ P/T: O₂ at 2.0 atm and 273 K has P/T twice that of STP, so it has the most molecules. H₂ and CO₂ at STP tie (Avogadro), N₂ at 546 K has half as many as STP, and He at 298 K has slightly fewer than STP. The heavy CO₂ molecule is a distractor - molar mass does not affect the count.',
    h: ['Does the kind of gas change how many molecules fit in 1 L?', 'n = PV/RT, so compare P/T for each sample.', 'Which sample has the highest pressure and the lowest temperature?'] });

  { const Vm = R * K(25);
    add({ l: 25, t: 2, tag: 'Calculation',
      q: 'What is the molar volume of an ideal gas at 25 °C and 1.00 atm?',
      c: [s(Vm, 3) + ' L/mol', '22.4 L/mol', s(R * 25, 3) + ' L/mol', s(1 / Vm, 3) + ' L/mol', sci(R8 * K(25), 3) + ' L/mol'],
      sort: true,
      why: `V/n = RT/P = (0.08206)(298.15)/1.00 = ${s(Vm, 3)} L/mol. 22.4 L/mol belongs to 0 °C (STP); a warmer gas takes up more room. ${s(R * 25, 3)} used 25 K, and ${sci(R8 * K(25), 3)} used R = 8.314.`,
      h: ['Molar volume = V/n.', 'From PV = nRT, V/n = RT/P.', '0.08206 × 298.15.'] }); }

  { const V = 8.00 / 32.00 * 22.4;
    add({ l: 25, t: 2, tag: 'Calculation',
      q: 'What volume does 8.00 g of O₂ occupy at STP? (Enter a number in L.)',
      a: s(V, 3) + ' L', num: V,
      why: `n = 8.00 g ÷ 32.00 g/mol = 0.250 mol; at STP V = 0.250 mol × 22.4 L/mol = ${s(V, 3)} L. Using 16.00 g/mol (O instead of O₂) doubles the answer.`,
      h: ['Grams → moles first.', 'Molar mass of O₂ is 32.00 g/mol; 22.4 L/mol at STP.', '0.250 mol × 22.4 L/mol.'] }); }

  add({ l: 25, t: 2, tag: 'Calculation',
    q: 'Which gas has a density of 0.714 g/L at STP?',
    c: ['CH₄', 'NH₃', 'He', 'Ne', 'N₂'],
    why: `M = d × 22.4 L/mol = 0.714 × 22.4 = ${s(0.714 * 22.4, 3)} g/mol, which is CH₄ (16.04). NH₃ is 17.03 g/mol (density ${s(17.03 / 22.4, 3)} g/L), Ne 20.18, N₂ 28.02, He 4.003.`,
    h: ['Density × molar volume = molar mass.', 'At STP the molar volume is 22.4 L/mol.', 'Which gas has M ≈ 16.0 g/mol?'] });

  { const v = 640 / 760 * 101.325;
    add({ l: 25, t: 2, tag: 'Calculation',
      q: 'The air pressure on a high plateau is 640. torr. Express it in kilopascals. (Enter a number in kPa.)',
      a: s(v, 3) + ' kPa', num: v,
      why: `640. torr × (1 atm/760 torr) × (101.325 kPa/1 atm) = ${s(v, 3)} kPa.`,
      h: ['Go through atmospheres.', '760 torr = 1 atm = 101.325 kPa.', '640 × 101.325 / 760.'] }); }

  /* ------------- Lecture 26: stoichiometry, mixtures, KMT, real gases ------------- */
  { const nN2 = 1.15 * 65.0 / (R * K(25)); const MN = mm('NaN3'); const g = nN2 * 2 / 3 * MN;
    add({ l: 26, t: 4, tag: 'Exam',
      q: 'Automobile airbags inflate by the reaction 2NaN₃(s) → 2Na(s) + 3N₂(g). What mass of NaN₃ is needed to fill a 65.0 L airbag with N₂ at 1.15 atm and 25 °C?',
      c: [s(g, 3) + ' g', s(nN2 * MN, 3) + ' g', s(nN2 * 3 / 2 * MN, 3) + ' g', sci(1.15 * 65.0 / (R * 25) * 2 / 3 * MN, 3) + ' g', s(65.0 / 22.4 * 2 / 3 * MN, 3) + ' g'],
      sort: true,
      why: `n(N₂) = PV/RT = (1.15)(65.0)/[(0.08206)(298.15)] = ${s(nN2, 4)} mol. Mole ratio: ${s(nN2, 4)} mol N₂ × (2 mol NaN₃/3 mol N₂) = ${s(nN2 * 2 / 3, 4)} mol NaN₃. M(NaN₃) = 22.99 + 3(14.01) = ${f(MN, 2)} g/mol, so mass = ${s(g, 3)} g. Skipping the 2/3 ratio, inverting it (3/2), using 25 K, or using 22.4 L/mol (not STP) gives the other choices.`,
      h: ['Gas volume → moles of N₂ → moles of NaN₃ → grams.', 'PV = nRT for the N₂, then the 2 : 3 coefficient ratio.', 'n(N₂) ≈ 3.06 mol; × 2/3 × 65.02 g/mol.'] }); }

  { const n = 3.27 / 65.38; const V = n * R * K(22) / 0.985;
    add({ l: 26, t: 3, tag: 'Calculation',
      q: 'Zinc reacts with excess hydrochloric acid: Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g). What volume of H₂, measured at 22 °C and 0.985 atm, forms from 3.27 g of Zn? (Enter a number in L.)',
      a: s(V, 3) + ' L', num: V,
      why: `n(Zn) = 3.27/65.38 = ${s(n, 4)} mol = n(H₂) (1 : 1). V = nRT/P = (${s(n, 4)})(0.08206)(295.15)/0.985 = ${s(V, 3)} L. HCl's coefficient of 2 does not matter - zinc is limiting and H₂ is 1 : 1 with Zn.`,
      h: ['Grams of Zn → mol Zn → mol H₂.', 'Mole ratio Zn : H₂ is 1 : 1; then V = nRT/P.', 'n ≈ 0.0500 mol; T = 295.15 K.'] }); }

  add({ l: 26, t: 2, tag: 'Calculation',
    q: 'For N₂(g) + 3H₂(g) → 2NH₃(g), what volume of NH₃ forms from 6.0 L of H₂ with excess N₂, all volumes measured at the same temperature and pressure?',
    c: ['4.0 L', '2.0 L', '12 L', '18 L', '6.0 L'],
    why: 'At the same T and P, volume is proportional to moles (Avogadro), so gas volumes react in the coefficient ratio. 6.0 L H₂ × (2 L NH₃/3 L H₂) = 4.0 L NH₃. No molar volume or PV = nRT is needed.',
    h: ['At the same T and P, what are volumes proportional to?', 'Use the coefficients directly as a volume ratio.', '6.0 × 2/3.'] });

  add({ l: 26, t: 4, tag: 'Exam',
    q: 'In 2H₂(g) + O₂(g) → 2H₂O(g), 5.0 L of H₂ is mixed with 3.0 L of O₂ and they react completely. What is the total volume of gas afterward, at the same temperature and pressure (water stays a gas)?',
    c: ['5.5 L', '5.0 L', '8.0 L', '0.5 L', '6.0 L'],
    why: 'Volumes react in the coefficient ratio. 5.0 L H₂ needs only 2.5 L O₂, so H₂ is limiting and 0.5 L O₂ is left over. Product: 5.0 L H₂ × (2/2) = 5.0 L H₂O(g). Total = 5.0 + 0.5 = 5.5 L. 5.0 L forgets the leftover O₂; 6.0 L treats O₂ as limiting; 8.0 L ignores the reaction.',
    h: ['Find the limiting reactant using the volume ratio 2 : 1.', 'Leftover gas still counts toward the total volume.', 'H₂ is limiting; add the water vapor formed to the O₂ left over.'] });

  { const n = 15.0 / mm('CaCO3');
    add({ l: 26, t: 3, tag: 'Calculation',
      q: 'Heating 15.0 g of CaCO₃ decomposes it completely: CaCO₃(s) → CaO(s) + CO₂(g). What volume of CO₂ is produced at STP?',
      c: [s(n * 22.4, 3) + ' L', s(15.0 / 44.01 * 22.4, 3) + ' L', s(n * R * K(25), 3) + ' L', s(n * 22.4 * 2, 3) + ' L', s(n * 22.4 / 2, 3) + ' L'],
      sort: true,
      why: `n(CaCO₃) = 15.0 g ÷ 100.09 g/mol = ${s(n, 4)} mol = n(CO₂) (1 : 1). At STP: V = ${s(n, 4)} × 22.4 = ${s(n * 22.4, 3)} L. ${s(15.0 / 44.01 * 22.4, 3)} L treats the 15.0 g as CO₂; ${s(n * R * K(25), 3)} L uses 25 °C instead of STP.`,
      h: ['Moles of CaCO₃ first.', '1 mol CaCO₃ gives 1 mol CO₂; 22.4 L/mol at STP.', '0.1499 mol × 22.4 L/mol.'] }); }

  add({ l: 26, t: 2, tag: 'Calculation',
    q: 'Propane burns: C₃H₈(g) + 5O₂(g) → 3CO₂(g) + 4H₂O(g). What volume of O₂ is needed to burn 2.50 L of propane, both measured at the same temperature and pressure?',
    c: ['12.5 L', '2.50 L', '0.500 L', '7.50 L', '10.0 L'],
    why: 'Same T and P → volumes in the coefficient ratio: 2.50 L C₃H₈ × (5 L O₂/1 L C₃H₈) = 12.5 L O₂. 7.50 L and 10.0 L are the CO₂ and H₂O volumes; 0.500 L divides by 5.',
    h: ['Volumes behave like moles here.', 'Use the C₃H₈ : O₂ coefficient ratio, 1 : 5.', '2.50 × 5.'] });

  { const n = 10.0 / mm('C3H8'); const V = 3 * n * R * K(25);
    add({ l: 26, t: 4, tag: 'Exam',
      q: 'What volume of CO₂, measured at 25 °C and 1.00 atm, is produced by burning 10.0 g of propane? C₃H₈(g) + 5O₂(g) → 3CO₂(g) + 4H₂O(l)',
      c: [s(V, 3) + ' L', s(n * R * K(25), 3) + ' L', s(3 * n * 22.4, 3) + ' L', s(4 * n * R * K(25), 3) + ' L', s(3 * n * R * 25, 3) + ' L'],
      sort: true,
      why: `n(C₃H₈) = 10.0 ÷ 44.09 = ${s(n, 4)} mol; × 3 mol CO₂/mol C₃H₈ = ${s(3 * n, 4)} mol CO₂. V = nRT/P = (${s(3 * n, 4)})(0.08206)(298.15)/1.00 = ${s(V, 3)} L. Forgetting the 3, using 22.4 L/mol at 25 °C, using the water coefficient, or using 25 K gives the distractors.`,
      h: ['grams propane → mol propane → mol CO₂ → volume.', 'Coefficient ratio 3 CO₂ : 1 C₃H₈; then V = nRT/P at 298.15 K.', 'n(CO₂) ≈ 0.680 mol.'] }); }

  add({ l: 26, t: 4, tag: 'Exam',
    q: 'For 4NH₃(g) + 5O₂(g) → 4NO(g) + 6H₂O(g), 10.0 L of NH₃ and 10.0 L of O₂ are mixed at the same temperature and pressure. What volume of NO can form?',
    c: ['8.00 L', '10.0 L', '12.5 L', '12.0 L', '4.00 L'],
    why: '10.0 L NH₃ would need 10.0 × 5/4 = 12.5 L O₂, but only 10.0 L is present, so O₂ is limiting. NO formed = 10.0 L O₂ × (4 NO/5 O₂) = 8.00 L. 10.0 L assumes NH₃ is limiting; 12.0 L is the H₂O volume from 10.0 L O₂ (6/5).',
    h: ['Equal volumes does not mean neither is limiting - compare with the coefficients.', 'Find which gas runs out first using the 4 : 5 ratio.', 'O₂ is limiting; use 4 NO per 5 O₂.'] });

  add({ l: 26, t: 4, tag: 'Exam',
    q: 'A rigid flask at constant temperature contains CO at a partial pressure of 1.00 atm and O₂ at 0.80 atm. They react completely by 2CO(g) + O₂(g) → 2CO₂(g). What is the total pressure afterward?',
    c: ['1.30 atm', '1.80 atm', '1.00 atm', '0.30 atm', '2.30 atm'],
    why: 'In a rigid flask at constant T, partial pressure ∝ moles, so pressures react in the coefficient ratio. CO is limiting: 1.00 atm CO uses 0.50 atm O₂ and makes 1.00 atm CO₂. Left: 0.80 − 0.50 = 0.30 atm O₂. Total = 1.00 + 0.30 = 1.30 atm. 1.80 atm ignores the reaction (3 mol of gas become 2); 1.00 atm forgets the leftover O₂.',
    h: ['At constant V and T, partial pressures act like moles.', 'Find the limiting reactant, then the products and leftovers.', 'P(CO₂) = 1.00 atm, P(O₂ left) = 0.30 atm.'] });

  add({ l: 26, t: 3, tag: 'Calculation',
    q: 'A gas mixture contains 2.00 mol N₂ and 0.500 mol O₂ at a total pressure of 1.50 atm. What is the partial pressure of O₂?',
    c: ['0.300 atm', '0.375 atm', '1.20 atm', '0.750 atm', '0.200 atm'],
    why: 'X(O₂) = 0.500/(2.00 + 0.500) = 0.200. P(O₂) = X·P(total) = 0.200 × 1.50 = 0.300 atm. 0.375 atm used 0.500/2.00 (moles of N₂, not total) as the fraction; 1.20 atm is N₂\'s partial pressure; 0.200 is the mole fraction itself.',
    h: ['Partial pressure = mole fraction × total pressure.', 'The mole fraction divides by the TOTAL moles.', 'X(O₂) = 0.500/2.50.'] });

  { const nHe = 4.00 / 4.003; const P = nHe * R * K(27) / 10.0;
    add({ l: 26, t: 3, tag: 'Calculation',
      q: 'A 10.0 L flask at 27 °C contains 4.00 g of He and 16.0 g of O₂. What is the partial pressure of helium? (Enter a number in atm.)',
      a: s(P, 3) + ' atm', num: P,
      why: `Each gas behaves as if it were alone: n(He) = 4.00/4.003 = ${s(nHe, 4)} mol, P(He) = nRT/V = (${s(nHe, 4)})(0.08206)(300.15)/10.0 = ${s(P, 3)} atm. The O₂ (0.500 mol) only matters for the total pressure.`,
      h: ['Dalton: each gas fills the whole flask on its own.', 'P(He) = n(He)RT/V.', 'n(He) ≈ 0.999 mol; T = 300.15 K.'] }); }

  { const r = 32.00 / 2.016;
    add({ l: 26, t: 4, tag: 'Trap',
      q: 'Equal MASSES of H₂ and O₂ are placed in the same container. What is the ratio P(H₂)/P(O₂)?',
      c: [s(r, 3), '1.00', s(1 / r, 3), s(Math.sqrt(r), 3), s(r / 2, 3)],
      sort: true,
      why: `Partial pressure is proportional to MOLES, not mass. For equal masses m: n(H₂)/n(O₂) = (m/2.016)/(m/32.00) = 32.00/2.016 = ${s(r, 3)}. 1.00 assumes equal masses give equal pressures; ${s(Math.sqrt(r), 3)} borrows the square root from Graham's law.`,
      h: ['What is partial pressure proportional to?', 'Convert equal masses to moles - the lighter gas has more moles.', 'The ratio is M(O₂)/M(H₂).'] }); }

  add({ l: 26, t: 2, tag: 'Calculation',
    q: 'Air is 20.9 mol% O₂. On a mountain where the atmospheric pressure is 0.680 atm, what is the partial pressure of O₂?',
    c: [s(0.209 * 0.680, 3) + ' atm', '0.209 atm', s(0.680 / 0.209, 3) + ' atm', s(0.791 * 0.680, 3) + ' atm', '0.680 atm'],
    sort: true,
    why: `P(O₂) = X(O₂)·P(total) = 0.209 × 0.680 atm = ${s(0.209 * 0.680, 3)} atm. 0.209 atm is the sea-level value; ${s(0.791 * 0.680, 3)} atm is the rest of the air (N₂ etc.). The PERCENT of O₂ is the same on the mountain - there is just less air.`,
    h: ['mol% ÷ 100 is the mole fraction.', 'Dalton: P(i) = X(i) × P(total).', '0.209 × 0.680.'] });

  add({ l: 26, t: 2, tag: 'Calculation',
    q: 'A mixture of N₂ and H₂ has a total pressure of 2.50 atm, and the partial pressure of N₂ is 0.65 atm. What is the mole fraction of H₂?',
    c: ['0.740', '0.260', '1.85', '0.35', '3.8'],
    why: 'P(H₂) = 2.50 − 0.65 = 1.85 atm. X(H₂) = P(H₂)/P(total) = 1.85/2.50 = 0.740 (1.85 and 2.50 both have three sig figs). 0.260 is N₂\'s mole fraction; 1.85 is a pressure, not a fraction (a mole fraction can never exceed 1); 0.35 treats 0.65 atm as if it were a mole fraction; 3.8 is 2.50/0.65 upside down.',
    h: ['First find H₂’s partial pressure.', 'X(i) = P(i)/P(total).', '1.85 ÷ 2.50.'] });

  { const pHe = 1.50 * 2.00 / 5.00, pNe = 0.800 * 3.00 / 5.00;
    add({ l: 26, t: 4, tag: 'Exam',
      q: 'A 2.00 L flask of He at 1.50 atm is joined by a valve to a 3.00 L flask of Ne at 0.800 atm. The valve is opened and the gases mix at constant temperature. What is the total pressure?',
      c: [s(pHe + pNe, 3) + ' atm', '2.30 atm', '1.15 atm', s(pHe, 3) + ' atm', s(pNe, 3) + ' atm'],
      sort: true,
      why: `Each gas expands into the full 5.00 L (Boyle): P(He) = 1.50 × 2.00/5.00 = ${s(pHe, 3)} atm; P(Ne) = 0.800 × 3.00/5.00 = ${s(pNe, 3)} atm. Total = ${s(pHe + pNe, 3)} atm. Adding 1.50 + 0.800 forgets the expansion; averaging them (1.15) ignores that the flasks have different sizes.`,
      h: ['What volume does each gas occupy after the valve opens?', 'Apply Boyle’s law to each gas separately, then add (Dalton).', 'P(He) = 0.600 atm.'] }); }

  { const nHe = 50.0 / 4.003, nAr = 50.0 / 39.95, X = nHe / (nHe + nAr);
    add({ l: 26, t: 4, tag: 'Trap',
      q: 'A gas mixture is 50.0% helium and 50.0% argon BY MASS, at a total pressure of 1.00 atm. What is the partial pressure of helium?',
      c: [s(X, 3) + ' atm', '0.500 atm', s(1 - X, 3) + ' atm', s(4.003 / 39.95, 3) + ' atm', s(1 - 4.003 / 39.95, 3) + ' atm'],
      sort: true,
      why: `Per 100.0 g: n(He) = 50.0/4.003 = ${s(nHe, 4)} mol, n(Ar) = 50.0/39.95 = ${s(nAr, 4)} mol. X(He) = ${s(nHe, 4)}/${s(nHe + nAr, 4)} = ${s(X, 3)}, so P(He) = ${s(X, 3)} atm. 0.500 atm treats mass % as mole %; ${s(1 - X, 3)} atm is argon's share; ${s(4.003 / 39.95, 3)} and ${s(1 - 4.003 / 39.95, 3)} atm play with the ratio of the molar masses instead of computing moles.`,
      h: ['Partial pressures follow MOLE fractions, not mass fractions.', 'Assume 100 g: 50.0 g of each, convert to moles.', 'Helium has about ten times as many moles as argon.'] }); }

  { const P = (755 - 23.8) / 760; const n = P * 0.250 / (R * K(25));
    add({ l: 26, t: 3, tag: 'Calculation',
      q: 'A 0.250 L sample of O₂ is collected over water at 25 °C; the total pressure is 755 torr and the vapor pressure of water at 25 °C is 23.8 torr. How many moles of O₂ were collected?',
      c: [sci(n, 3) + ' mol', sci(755 / 760 * 0.250 / (R * K(25)), 3) + ' mol', sci((755 + 23.8) / 760 * 0.250 / (R * K(25)), 3) + ' mol', s((755 - 23.8) * 0.250 / (R * K(25)), 3) + ' mol', s(P * 0.250 / (R * 25), 3) + ' mol'],
      sort: true,
      why: `The collected gas is wet: P(O₂) = 755 − 23.8 = 731.2 torr = ${s(P, 4)} atm. n = PV/RT = (${s(P, 4)})(0.250)/[(0.08206)(298.15)] = ${sci(n, 3)} mol. Forgetting to subtract the water vapor, adding it, leaving the pressure in torr, or using 25 K gives the other choices.`,
      h: ['The gas in the bottle is a mixture of O₂ and water vapor.', 'P(O₂) = P(total) − P(H₂O), then convert to atm.', 'P(O₂) = 731.2 torr.'] }); }

  { const P = (762 - 22.4) / 760; const nO2 = P * 0.128 / (R * K(24)); const g = nO2 * 2 / 3 * mm('KClO3');
    add({ l: 26, t: 4, tag: 'Exam',
      q: 'Heating KClO₃ releases oxygen: 2KClO₃(s) → 2KCl(s) + 3O₂(g). The O₂ is collected over water: 128 mL at 24 °C and a total pressure of 762 torr (vapor pressure of water at 24 °C = 22.4 torr). What mass of KClO₃ decomposed? (Enter a number in g.)',
      a: s(g, 3) + ' g', num: g, tol: 0.02,
      why: `P(O₂) = 762 − 22.4 = 739.6 torr = ${s(P, 4)} atm. n(O₂) = PV/RT = (${s(P, 4)})(0.128 L)/[(0.08206)(297.15 K)] = ${sci(nO2, 4)} mol. n(KClO₃) = ${sci(nO2, 4)} × 2/3 = ${sci(nO2 * 2 / 3, 4)} mol. M(KClO₃) = 39.10 + 35.45 + 3(16.00) = 122.55 g/mol → ${s(g, 3)} g.`,
      h: ['Dry-gas pressure first: subtract the water vapor.', 'PV = nRT gives mol O₂; then the 2 : 3 ratio back to KClO₃.', 'n(O₂) ≈ 5.11 × 10⁻³ mol.'] }); }

  add({ l: 26, t: 1, tag: 'Concept',
    q: 'Which statement is NOT a postulate of the kinetic-molecular theory of an ideal gas?',
    c: ['Gas particles attract one another strongly at all distances', 'The volume of the particles themselves is negligible compared with the container volume', 'Particles move randomly in straight lines between collisions', 'Collisions are elastic: no net kinetic energy is lost', 'The average kinetic energy of the particles is proportional to the kelvin temperature'],
    why: 'KMT assumes NO attractions or repulsions between particles (except during collisions). Real gases do attract one another, which is exactly why they deviate from ideal behavior at low temperature. The other four are the postulates.',
    h: ['An ideal gas is the simplest possible model.', 'Which force would make the gas condense?', 'Ideal gas particles ignore each other except when they collide.'] });

  add({ l: 26, t: 2, tag: 'Trap',
    q: 'A sample of He and a sample of Xe are both at 300 K. Which statement about the average kinetic energy of their atoms is correct?',
    c: ['They are equal', 'He atoms have a larger average kinetic energy because they move faster', 'Xe atoms have a larger average kinetic energy because they are heavier', 'It depends on the pressure of each sample', 'It depends on the volume of each container'],
    why: 'Average kinetic energy depends ONLY on the kelvin temperature: KE(avg) = (3/2)(R/N_A)T. At the same T, every gas has the same average KE. He atoms are faster but lighter; Xe atoms are slower but heavier - ½mv² comes out the same.',
    h: ['What single variable does average KE depend on?', 'KMT: average KE ∝ T (in K).', 'Same T means the same average KE.'] });

  add({ l: 26, t: 2, tag: 'Calculation',
    q: 'The temperature of a gas is raised from 300 K to 1200 K. By what factor does its rms speed change?',
    c: ['× 2', '× 4', '× 16', '× √2', '× ½'],
    why: 'u(rms) = √(3RT/M) ∝ √T. T increases by 1200/300 = 4, so u(rms) increases by √4 = 2. × 4 is the change in average KE, not speed.',
    h: ['How does rms speed depend on T?', 'u(rms) ∝ √T.', '√(1200/300).'] });

  { const r = K(200) / K(100);
    add({ l: 26, t: 4, tag: 'Trap',
      q: 'A gas is heated from 100 °C to 200 °C. By what factor does the average kinetic energy of its molecules increase?',
      c: [s(r, 3), '2.00', s(Math.sqrt(r), 3), s(1 / r, 3), '4.00'],
      sort: true,
      why: `Average KE ∝ KELVIN temperature: 473.15/373.15 = ${s(r, 3)}. "Doubles" uses °C, which has an arbitrary zero. ${s(Math.sqrt(r), 3)} is the factor for the rms SPEED, not the kinetic energy.`,
      h: ['Is 200 °C twice as hot as 100 °C?', 'KE(avg) ∝ T in kelvin.', '473.15/373.15.'] }); }

  { const u = Math.sqrt(3 * R8 * K(25) / 0.02802);
    add({ l: 26, t: 3, tag: 'Calculation',
      q: 'Calculate the root-mean-square speed of N₂ molecules at 25 °C. (Enter a number in m/s.)',
      a: s(u, 3) + ' m/s', num: u,
      why: `u(rms) = √(3RT/M) with R = 8.314 J/(mol·K) and M in kg/mol: M(N₂) = 28.02 g/mol = 0.02802 kg/mol. u = √[3(8.314)(298.15)/0.02802] = ${s(u, 3)} m/s. (A J is kg·m²/s², which is why M must be in kg.)`,
      h: ['Which R and which mass unit does the rms formula need?', 'R = 8.314 J/(mol·K); M = 0.02802 kg/mol; T = 298.15 K.', '√(3 × 8.314 × 298.15 / 0.02802).'] }); }

  { const Mk = 0.004003, u = Math.sqrt(3 * R8 * K(27) / Mk);
    add({ l: 26, t: 3, tag: 'Calculation',
      q: 'What is the rms speed of helium atoms at 27 °C?',
      c: [s(u, 3) + ' m/s', s(Math.sqrt(3 * R8 * 27 / Mk), 3) + ' m/s', sci(3 * R8 * K(27) / Mk, 3) + ' m/s', s(Math.sqrt(3 * R8 * K(27) / 4.003), 3) + ' m/s', s(Math.sqrt(R8 * K(27) / Mk), 3) + ' m/s'],
      sort: true,
      why: `u(rms) = √(3RT/M) = √[3(8.314)(300.15)/0.004003] = ${s(u, 3)} m/s. The traps: M in g/mol (${s(Math.sqrt(3 * R8 * K(27) / 4.003), 3)} m/s), 27 K instead of 300.15 K, forgetting the square root, or dropping the 3.`,
      h: ['M must be in kg/mol.', 'He: 4.003 g/mol = 0.004003 kg/mol; T = 300.15 K.', '√(3 × 8.314 × 300.15 / 0.004003).'] }); }

  add({ l: 26, t: 2, tag: 'Concept',
    q: 'Rank these gases in order of INCREASING rms speed at the same temperature: He, N₂, Ar, SO₂.',
    c: ['SO₂ < Ar < N₂ < He', 'He < N₂ < Ar < SO₂', 'He < Ar < N₂ < SO₂', 'SO₂ < N₂ < Ar < He', 'N₂ < He < SO₂ < Ar'],
    why: 'At the same T, u(rms) ∝ 1/√M: the heaviest molecule is slowest. M: SO₂ 64.06, Ar 39.95, N₂ 28.02, He 4.003. So SO₂ < Ar < N₂ < He. The reverse order is the "heavier is faster" mistake.',
    h: ['Same T means the same average KE - so which gas must move fastest?', 'u(rms) ∝ 1/√M.', 'Order the molar masses from largest to smallest.'] });

  { const r = Math.sqrt(32.00 / 2.016);
    add({ l: 26, t: 3, tag: 'Calculation',
      q: 'At the same temperature, what is the ratio of the rms speed of H₂ to that of O₂?',
      c: [s(r, 3), s(r * r, 3), s(1 / r, 3), '1.00', s(1 / (r * r), 3)],
      sort: true,
      why: `u ∝ 1/√M, so u(H₂)/u(O₂) = √(M(O₂)/M(H₂)) = √(32.00/2.016) = ${s(r, 3)}. ${s(r * r, 3)} forgets the square root; ${s(1 / r, 3)} inverts the ratio (H₂ must be faster); 1.00 confuses equal KE with equal speed.`,
      h: ['Which molecule is faster?', 'u(rms) = √(3RT/M) - the ratio keeps only the M’s.', '√(32.00/2.016).'] }); }

  { const r = Math.sqrt(mm('CH4') / 4.003);
    add({ l: 26, t: 2, tag: 'Calculation',
      q: 'How many times faster does helium effuse than methane, CH₄, under the same conditions?',
      c: [s(r, 3), s(r * r, 3), s(1 / r, 3), s(1 / (r * r), 3), '1.00'],
      sort: true,
      why: `Graham's law: rate(He)/rate(CH₄) = √(M(CH₄)/M(He)) = √(16.04/4.003) = ${s(r, 3)}. Without the square root you get ${s(r * r, 3)}; the inverted ratios would make the heavier gas faster.`,
      h: ['Lighter gases effuse faster.', 'rate₁/rate₂ = √(M₂/M₁).', '√(16.04/4.003).'] }); }

  { const M = 4.003 / (0.355 * 0.355);
    add({ l: 26, t: 3, tag: 'Calculation',
      q: 'An unknown gas effuses at 0.355 times the rate of helium under the same conditions. Which gas could it be?',
      c: ['O₂', 'N₂', 'CH₄', 'Ar', 'CO₂'],
      why: `rate(X)/rate(He) = √(M(He)/M(X)) = 0.355 → M(X) = 4.003/(0.355)² = ${s(M, 3)} g/mol ≈ O₂ (32.00). N₂ is 28.02, CH₄ 16.04, Ar 39.95, CO₂ 44.01. Forgetting to square 0.355 gives 11.3 g/mol, which matches nothing.`,
      h: ['Slower than He means heavier than He.', 'Square both sides of Graham’s law.', 'M = 4.003 ÷ 0.355².'] }); }

  { const M = 28.02 * (82.6 / 38.0) ** 2;
    add({ l: 26, t: 3, tag: 'Calculation',
      q: 'A sample of N₂ takes 38.0 s to effuse through a pinhole. An equal amount of an unknown gas takes 82.6 s under the same conditions. What is the molar mass of the unknown gas? (Enter a number in g/mol.)',
      a: s(M, 3) + ' g/mol', num: M,
      why: `Effusion TIME is inversely proportional to rate, so time ∝ √M: t(X)/t(N₂) = √(M(X)/M(N₂)). M(X) = 28.02 × (82.6/38.0)² = ${s(M, 3)} g/mol (close to xenon, 131.29). Treating time like rate would give a molar mass smaller than N₂'s - impossible for a slower gas.`,
      h: ['A gas that takes longer is heavier.', 'Time ∝ √M (the inverse of rate).', 'M = 28.02 × (82.6/38.0)².'] }); }

  { const r = Math.sqrt(352.05 / 349.04);
    add({ l: 26, t: 4, tag: 'Exam',
      q: 'Uranium is enriched by effusion of UF₆. Given molar masses ²³⁵UF₆ = 349.04 g/mol and ²³⁸UF₆ = 352.05 g/mol, what is the ratio rate(²³⁵UF₆)/rate(²³⁸UF₆) for one effusion step?',
      c: [r.toFixed(4), (352.05 / 349.04).toFixed(4), (1 / r).toFixed(4), (238.05 / 235.04).toFixed(4), Math.sqrt(238.05 / 235.04).toFixed(4)],
      sort: true,
      why: `rate(235)/rate(238) = √(352.05/349.04) = ${r.toFixed(4)}. The separation per step is tiny, which is why enrichment plants need thousands of stages. ${(352.05 / 349.04).toFixed(4)} skips the square root; ${Math.sqrt(238.05 / 235.04).toFixed(4)} uses the masses of the uranium atoms alone, but the gas that effuses is UF₆.`,
      h: ['The lighter molecule effuses slightly faster.', 'Graham: √(M_heavy/M_light) using the WHOLE molecule.', '√(352.05/349.04).'] }); }

  add({ l: 26, t: 3, tag: 'Calculation',
    q: 'Under identical conditions, gas X takes twice as long as O₂ to effuse. What is the molar mass of X?',
    c: ['128 g/mol', '64.0 g/mol', '16.0 g/mol', '8.00 g/mol', s(32 * Math.SQRT2, 3) + ' g/mol'],
    why: 'time ∝ √M, so t(X)/t(O₂) = 2 = √(M(X)/32.00) → M(X) = 32.00 × 2² = 128 g/mol. 64.0 forgets to square; 16.0 and 8.00 treat a slower gas as lighter.',
    h: ['Slower to effuse means heavier.', 'Square the time ratio.', '32.00 × 4.'] });

  { const ratio = Math.sqrt(36.46 / 17.03); const fromNH3 = 100 * ratio / (1 + ratio);
    add({ l: 26, t: 4, tag: 'Exam',
      q: 'Cotton plugs soaked in NH₃ and in HCl are placed at opposite ends of a 100.0 cm glass tube. Where a white ring of NH₄Cl forms, the gases met. If each gas moved at a rate given by Graham’s law, how far from the NH₃ end would the ring form?',
      c: [s(fromNH3, 3) + ' cm', s(100 - fromNH3, 3) + ' cm', '50.0 cm', s(100 * (36.46 / 17.03) / (1 + 36.46 / 17.03), 3) + ' cm', s(100 * (17.03 / 36.46) / (1 + 17.03 / 36.46), 3) + ' cm'],
      sort: true,
      why: `NH₃ (17.03) is lighter than HCl (36.46), so it travels farther: distance ratio = √(36.46/17.03) = ${s(ratio, 4)}. NH₃ covers ${s(ratio, 4)}/(1 + ${s(ratio, 4)}) of the tube = ${s(fromNH3, 3)} cm from its end (the ring sits nearer the HCl end). ${s(100 - fromNH3, 3)} cm is the distance from the HCl end; the others skip the square root.`,
      h: ['Which gas is lighter, so travels farther in the same time?', 'Distances travelled are in the ratio of the rates, √(M₂/M₁).', 'NH₃ covers 1.463 parts out of 2.463.'] }); }

  { const M = 28.02 / (0.695 * 0.695);
    add({ l: 26, t: 4, tag: 'Exam',
      q: 'An unknown hydrocarbon gas effuses at 0.695 times the rate of N₂ under the same conditions. Which formula fits?',
      c: ['C₄H₁₀', 'C₂H₆', 'C₃H₈', 'C₅H₁₂', 'C₄H₈'],
      why: `M = M(N₂)/(0.695)² = 28.02/0.4830 = ${s(M, 3)} g/mol. C₄H₁₀ = 58.12 g/mol fits; C₄H₈ is 56.10, C₃H₈ 44.09, C₂H₆ 30.07, C₅H₁₂ 72.15.`,
      h: ['Square the rate ratio.', 'M(X) = 28.02 ÷ 0.695².', 'You need about 58 g/mol.'] }); }

  add({ l: 26, t: 2, tag: 'Concept',
    q: 'How does the Maxwell-Boltzmann distribution of molecular speeds for a gas change when its temperature is raised?',
    c: ['The peak moves to higher speed and the curve becomes lower and broader', 'The peak moves to higher speed and the curve becomes taller and narrower', 'The peak moves to lower speed and the curve becomes broader', 'The area under the curve increases because there are more molecules', 'Every molecule ends up moving at the same, higher speed'],
    why: 'At higher T the most probable speed increases and the speeds spread out, so the curve flattens and broadens. The area under the curve represents the total number of molecules, which does not change - so if the curve spreads out its peak must drop. Molecules always have a RANGE of speeds.',
    h: ['Hotter molecules move faster on average - which way does the peak shift?', 'The total number of molecules (the area) stays fixed.', 'Spreading out a fixed area makes the peak lower.'] });

  add({ l: 26, t: 2, tag: 'Concept',
    q: 'Maxwell-Boltzmann speed distributions are drawn for He and Ar at the same temperature. Which statement is FALSE?',
    c: ['The two curves are identical because the temperature is the same', 'The He curve peaks at a higher speed', 'The Ar curve is taller and narrower', 'Both gases have the same average kinetic energy', 'The area under each curve represents the total number of atoms'],
    why: 'Same T means the same average KINETIC ENERGY, not the same speeds. The lighter He atoms move faster, so the He curve peaks at a higher speed and is broader and flatter; the Ar curve is taller and narrower. So "identical curves" is false.',
    h: ['Does the same temperature mean the same speed?', 'Same average KE; lighter particles must be faster.', 'Lighter gas → peak at higher speed, flatter curve.'] });

  add({ l: 26, t: 1, tag: 'Concept',
    q: 'Real gases deviate MOST from ideal behavior under which conditions?',
    c: ['High pressure and low temperature', 'Low pressure and high temperature', 'High pressure and high temperature', 'Low pressure and low temperature', 'Deviations do not depend on P or T'],
    why: 'At high pressure the molecules are crowded, so their own volume is no longer negligible; at low temperature they move slowly enough for attractions to matter. Both break KMT assumptions. Low P and high T is where gases are MOST ideal.',
    h: ['Which two KMT assumptions fail for real gases?', 'Molecular volume matters when crowded; attractions matter when slow.', 'Crowded = high P; slow = low T.'] });

  add({ l: 26, t: 1, tag: 'Concept',
    q: 'In the van der Waals equation (P + an²/V²)(V − nb) = nRT, what do the constants a and b correct for?',
    c: ['a: attractions between molecules; b: the volume of the molecules themselves', 'a: the volume of the molecules; b: attractions between molecules', 'a: the speed of the molecules; b: their mass', 'a: elastic collisions; b: inelastic collisions', 'a: temperature errors; b: pressure-gauge errors'],
    why: 'Attractions make molecules hit the walls less hard, so the measured P is lower than ideal; adding an²/V² corrects it upward. The molecules occupy real space, so the free volume is V − nb. Large a = strong IMFs; large b = big molecules.',
    h: ['One term adds to P, the other subtracts from V.', 'Attractions lower the measured pressure; molecular size reduces the free volume.', 'a goes with attractions.'] });

  add({ l: 26, t: 2, tag: 'Concept',
    q: 'Which gas would be expected to have the LARGEST van der Waals constant a?',
    c: ['H₂O', 'He', 'Ne', 'N₂', 'CH₄'],
    why: 'a measures intermolecular attraction. H₂O molecules hydrogen bond, by far the strongest attractions in the list (a ≈ 5.46 L²·atm/mol², versus 2.25 for CH₄, 1.39 for N₂ and 0.034 for He). The others have only dispersion forces.',
    h: ['a reflects the forces between molecules.', 'Which gas has the strongest intermolecular forces?', 'Look for hydrogen bonding.'] });

  add({ l: 26, t: 2, tag: 'Concept',
    q: 'Which gas would be expected to have the LARGEST van der Waals constant b?',
    c: ['C₄H₁₀', 'H₂', 'CH₄', 'C₂H₆', 'C₃H₈'],
    why: 'b is the excluded volume per mole - the size of the molecule. Butane, C₄H₁₀, is the largest molecule here (b ≈ 0.12 L/mol, versus about 0.027 for H₂).',
    h: ['b is about molecular size.', 'Bigger molecules exclude more volume.', 'Pick the largest molecule.'] });

  { const ideal = R * 300 / 1.00, rep = R * 300 / (1.00 - 0.0427), real = rep - 3.59;
    add({ l: 26, t: 4, tag: 'Calculation',
      q: 'For 1.00 mol of CO₂ in a 1.00 L container at 300. K, calculate the pressure from the van der Waals equation (a = 3.59 L²·atm/mol², b = 0.0427 L/mol).',
      c: [s(real, 3) + ' atm', s(ideal, 3) + ' atm', s(rep + 3.59, 3) + ' atm', s(rep, 3) + ' atm', s(ideal - 3.59, 3) + ' atm'],
      sort: true,
      why: `P = nRT/(V − nb) − an²/V² = (1.00)(0.08206)(300.)/(1.00 − 0.0427) − (3.59)(1.00)²/(1.00)² = ${s(rep, 4)} − 3.59 = ${s(real, 3)} atm. The ideal gas law gives ${s(ideal, 3)} atm; the real pressure is lower because attractions dominate here. Adding the a-term (${s(rep + 3.59, 3)}) has its sign backwards; ${s(rep, 3)} includes only b and ${s(ideal - 3.59, 3)} only a.`,
      h: ['Solve the van der Waals equation for P.', 'P = nRT/(V − nb) − an²/V².', 'nRT/(V − nb) ≈ 25.7 atm.'] }); }

  { const n = 2.00, V = 4.00, T = 273.15, a = 6.49, b = 0.0562; const P = n * R * T / (V - n * b) - a * n * n / (V * V);
    add({ l: 26, t: 4, tag: 'Calculation',
      q: 'Use the van der Waals equation to find the pressure of 2.00 mol of Cl₂ in a 4.00 L tank at 0 °C (a = 6.49 L²·atm/mol², b = 0.0562 L/mol). (Enter a number in atm.)',
      a: s(P, 3) + ' atm', num: P,
      why: `nRT = (2.00)(0.08206)(273.15) = ${s(n * R * T, 4)} L·atm. V − nb = 4.00 − 2.00(0.0562) = ${s(V - n * b, 4)} L. an²/V² = 6.49(4.00)/16.0 = ${s(a * n * n / (V * V), 4)} atm. P = ${s(n * R * T, 4)}/${s(V - n * b, 4)} − ${s(a * n * n / (V * V), 4)} = ${s(P, 3)} atm (the ideal gas law gives ${s(n * R * T / V, 3)} atm). Remember n² in the a-term.`,
      h: ['P = nRT/(V − nb) − an²/V².', 'n² = 4.00, V² = 16.0; T = 273.15 K.', 'First term ≈ 11.53 atm; subtract ≈ 1.62 atm.'] }); }

  add({ l: 26, t: 2, tag: 'Concept',
    q: 'At 1 atm and 300 K, which gas behaves MOST like an ideal gas?',
    c: ['He', 'NH₃', 'H₂O', 'SO₂', 'CO₂'],
    why: 'Helium atoms are tiny and have only very weak dispersion forces, so both van der Waals corrections are smallest. NH₃ and H₂O hydrogen bond, SO₂ is polar, and CO₂ is larger with stronger dispersion forces.',
    h: ['Ideal means no attractions and negligible size.', 'Which particle is smallest and least attractive?', 'Think noble gas.'] });

  add({ l: 26, t: 4, tag: 'Concept',
    q: 'For CH₄ at 300 K, PV/nRT is LESS than 1 at moderate pressures (around 100 atm) but GREATER than 1 at very high pressures (around 1000 atm). Which explanation is correct?',
    c: ['At moderate pressure attractions lower the pressure; at very high pressure the molecules’ own volume dominates', 'At moderate pressure the molecules’ volume lowers PV; at very high pressure attractions raise it', 'The molecules slow down at high pressure, raising their kinetic energy', 'Collisions become inelastic at moderate pressure and elastic again at high pressure', 'The CH₄ molecules break apart at high pressure, increasing n'],
    why: 'Attractions pull molecules back from the walls, making the real P (and PV) lower than ideal - this wins at moderate pressure. When the gas is squeezed hard, the molecules’ own volume means the real volume (and PV) is larger than ideal, so PV/nRT rises above 1. Swapping the two effects is the trap.',
    h: ['Which correction lowers PV and which raises it?', 'Attractions lower P; excluded volume makes the real V larger than the ideal V.', 'Crowding matters most at the highest pressures.'] });

  add({ l: 26, t: 2, tag: 'Concept',
    q: 'According to kinetic-molecular theory, why does the pressure of a gas increase when its volume is decreased at constant temperature?',
    c: ['The molecules strike the walls more often because they have less space to cross', 'The molecules move faster in a smaller container', 'Each molecule hits the wall with more force', 'The molecules attract each other more strongly', 'The molecules themselves get smaller'],
    why: 'At constant T the molecules keep the same average speed and kinetic energy. In a smaller volume they travel shorter distances between wall collisions, so collisions are more FREQUENT - and pressure is the force of those collisions per unit area. Faster molecules or harder hits require a higher temperature.',
    h: ['Constant temperature means constant average speed.', 'Pressure comes from wall collisions.', 'What changes when the walls are closer together?'] });

  { const E = 1.5 * R8 * K(25);
    add({ l: 26, t: 3, tag: 'Calculation',
      q: 'The average kinetic energy of one mole of gas molecules is (3/2)RT. What is it at 25 °C?',
      c: [s(E / 1000, 3) + ' kJ', s(1.5 * R8 * 25 / 1000, 3) + ' kJ', s(R8 * K(25) / 1000, 3) + ' kJ', s(1.5 * R * K(25), 3) + ' J', s(3 * R8 * K(25) / 1000, 3) + ' kJ'],
      sort: true,
      why: `E = (3/2)(8.314 J/(mol·K))(298.15 K) = ${s(E, 4)} J = ${s(E / 1000, 3)} kJ per mole - the same for ANY gas at 25 °C. Using 25 K, leaving out the 3/2, using R in L·atm, or doubling the 3/2 gives the other values.`,
      h: ['Energy needs R in joules.', 'R = 8.314 J/(mol·K), T = 298.15 K.', '1.5 × 8.314 × 298.15, then convert J to kJ.'] }); }

  { const T = 300 * mm('SO2') / 32.00;
    add({ l: 26, t: 4, tag: 'Calculation',
      q: 'At what kelvin temperature would SO₂ molecules have the same rms speed as O₂ molecules at 300. K? (Enter a number in K.)',
      a: s(T, 3) + ' K', num: T,
      why: `u(rms) = √(3RT/M) is the same when T/M is the same: T(SO₂) = 300. K × (64.06/32.00) = ${s(T, 3)} K. The heavier molecule must be hotter to move as fast.`,
      h: ['Set the two rms expressions equal.', 'T₁/M₁ = T₂/M₂.', '300 × 64.06/32.00.'] }); }

  add({ l: 26, t: 1, tag: 'Concept',
    q: 'According to kinetic-molecular theory, what causes the pressure a gas exerts on its container?',
    c: ['Collisions of the gas particles with the container walls', 'Attractions between the gas particles', 'The weight of the gas pressing down on the bottom', 'Repulsions between the gas particles at a distance', 'Heat flowing out through the container walls'],
    why: 'Pressure is force per unit area, and in a gas the force comes from particles striking the walls. Ideal gas particles have no attractions or repulsions; the weight of a gas is negligible compared with collision forces.',
    h: ['What do the particles do to the walls?', 'Force per area from many impacts.', 'Collisions.'] });

  add({ l: 26, t: 3, tag: 'Concept',
    q: 'A sealed, rigid container of gas is heated. According to kinetic-molecular theory, which statement explains why its pressure rises?',
    c: ['The molecules move faster, so they hit the walls both more often and harder', 'The molecules grow larger and fill more of the container', 'More molecules are formed as the temperature rises', 'The attractions between molecules increase', 'The molecules move faster but hit the walls less often'],
    why: 'Average kinetic energy is proportional to T. Faster molecules collide with the walls more frequently AND transfer more momentum per collision, so the pressure rises (Gay-Lussac: P ∝ T at fixed n and V). The number and size of the molecules do not change.',
    h: ['What does temperature measure at the molecular level?', 'Average KE ∝ T.', 'Two effects: frequency and force of collisions.'] });

  return Q;
};
