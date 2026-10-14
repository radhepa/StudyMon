/* Generator for js/data/chem/chem-q-quantum.js (Gym 6, Light and Quantum Theory,
   Silberberg 7.1-7.4, lessons 10-12). Every numeric answer and every numeric
   distractor is computed here from the course constants, so the data file is
   GENERATED - edit this script, then run:

     node tools/chem/gen-quantum.cjs

   Correct choices are written first in this source and moved to a balanced
   position (0-4) when the file is written. */
const fs = require('fs');
const path = require('path');

const h = 6.626e-34, c = 2.998e8, NA = 6.022e23, RB = 2.18e-18, RY = 1.097e7, me = 9.109e-31;
const PI = Math.PI;

/* ---------- formatting ---------- */
const SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
function E(x, sf) {                     // 3.13 × 10⁻¹⁹
  const neg = x < 0; x = Math.abs(x);
  let e = Math.floor(Math.log10(x));
  let ms = (x / Math.pow(10, e)).toFixed(sf - 1);
  if (parseFloat(ms) >= 10) { e++; ms = (x / Math.pow(10, e)).toFixed(sf - 1); }
  return (neg ? '−' : '') + ms + ' × 10' + String(e).split('').map(ch => SUP[ch]).join('');
}
function F(x, sf) {                     // plain decimal with sf significant figures
  const s = x.toPrecision(sf);
  if (/e/.test(s)) return E(x, sf);
  return s.replace(/^-/, '−');
}
const mnus = s => String(s).replace(/-/g, '−');

/* ---------- record builders ---------- */
const out = [];
function M(lesson, tier, tag, q, choices, why, hints) {
  if (choices.length !== 5) throw new Error('need 5 choices: ' + q);
  const norm = choices.map(s => s.trim().toLowerCase());
  if (new Set(norm).size !== 5) throw new Error('duplicate choices: ' + q + ' ' + JSON.stringify(choices));
  if (hints.length !== 3) throw new Error('need 3 hints: ' + q);
  out.push({ kind: 'mcq', lesson, tier, tag, q, choices, why, hints });
}
function N(lesson, tier, tag, q, display, num, why, hints, opts) {
  if (hints.length !== 3) throw new Error('need 3 hints: ' + q);
  out.push({ kind: 'num', lesson, tier, tag, q, display, num, why, hints, opts });
}

/* Photon helpers */
const Elam = lam => h * c / lam;               // J per photon, lam in m
const lamE = en => h * c / en;                 // m
const bohr = (nf, ni) => -RB * (1 / (nf * nf) - 1 / (ni * ni));   // ΔE of atom, J
const ryd = (n1, n2) => 1 / (RY * (1 / (n1 * n1) - 1 / (n2 * n2))); // m

/* ======================================================================
   LESSON 10 - Quantum Theory 1: the nature of light (7.1)
   ====================================================================== */

M(10, 1, 'Concept', 'How are the wavelength (λ) and frequency (ν) of electromagnetic radiation related in a vacuum?',
  ['λν = c, so λ and ν are inversely proportional',
   'λ/ν = c, so λ and ν are directly proportional',
   'λ = cν, so a longer wavelength means a higher frequency',
   'λν = h, so their product is Planck’s constant',
   'λ and ν are independent; only the amplitude depends on ν'],
  'All electromagnetic radiation travels at c = 2.998 × 10⁸ m/s in a vacuum, and c = λν. Because c is fixed, if λ goes up ν must go down by the same factor: they are inversely proportional. "Directly proportional" and "λ = cν" both get the direction backwards; λν = h mixes up the wave equation with Planck’s constant; amplitude is a separate property (intensity).',
  ['One of the two equations on this topic contains only λ, ν and a constant speed.', 'c = λν, and c never changes in a vacuum.', 'If the product is fixed, one goes up when the other goes down.']);

M(10, 1, 'Concept', 'The amplitude of a light wave (the height of its crests) determines the light’s:',
  ['intensity (brightness)', 'frequency', 'energy per photon', 'speed in a vacuum', 'wavelength'],
  'Amplitude is the height of the wave and corresponds to intensity: a brighter beam has a larger amplitude (more photons). Frequency and wavelength are set by the distance between crests, and the energy of each photon depends only on frequency (E = hν). The speed in a vacuum is always c.',
  ['Two waves can have the same wavelength but different heights.', 'Height of the crest ↔ how bright the light looks.', 'Energy per photon depends on ν, not on height.']);

M(10, 1, 'Concept', 'In a vacuum, how does the speed of X-rays compare with the speed of radio waves?',
  ['They are the same, 2.998 × 10⁸ m/s',
   'X-rays are faster because they have a higher frequency',
   'Radio waves are faster because they have a longer wavelength',
   'X-rays are faster because each photon carries more energy',
   'It depends on the amplitude (intensity) of each wave'],
  'Every kind of electromagnetic radiation, from gamma rays to radio waves, travels at c = 2.998 × 10⁸ m/s in a vacuum. Regions differ in λ and ν (and so in photon energy), but λν is always the same c. Higher frequency or higher photon energy does not mean faster.',
  ['What does the "c" in c = λν stand for?', 'c is a constant for ALL electromagnetic radiation.', 'Different λ, different ν, same product.']);

M(10, 1, 'Concept', 'Visible light covers roughly which range of wavelengths?',
  ['400 to 700 nm', '400 to 700 pm', '4 to 7 nm', '400 to 700 μm', '4000 to 7000 nm'],
  'The visible window runs from about 400 nm (violet) to about 700 nm (red). 400-700 pm and 4-7 nm are X-ray wavelengths; 400-700 μm is far infrared/microwave; 4000-7000 nm is infrared.',
  ['The green laser in recitation was 532 nm, and it was visible.', 'Violet is near 400 nm, red near 700 nm.', 'It is a few hundred nanometres.']);

M(10, 1, 'Concept', 'Which colour of visible light has the highest energy per photon?',
  ['violet', 'red', 'orange', 'green', 'blue'],
  'Within the visible region violet has the shortest wavelength (about 400 nm), so it has the highest frequency and therefore the highest photon energy (E = hc/λ). Red (about 700 nm) is the lowest-energy visible light. Blue is close to violet but has a slightly longer wavelength.',
  ['Shorter wavelength means more energy per photon.', 'ROYGBIV runs from long λ (red) to short λ (violet).', 'The colour just before ultraviolet.']);

M(10, 1, 'Concept', 'Which colour of visible light has the LONGEST wavelength?',
  ['red', 'violet', 'blue', 'green', 'yellow'],
  'Red light sits at the long-wavelength end of the visible spectrum (about 700 nm), next to infrared. Violet is at the short end (about 400 nm), next to ultraviolet. Longest wavelength also means lowest frequency and lowest photon energy.',
  ['Which colour borders infrared?', 'INFRA-red is just past red on the long-wavelength side.', 'About 700 nm.']);

M(10, 2, 'Concept', 'Which lists visible colours in order of INCREASING wavelength?',
  ['violet, blue, green, yellow, red',
   'red, yellow, green, blue, violet',
   'violet, green, blue, yellow, red',
   'blue, violet, green, yellow, red',
   'yellow, green, blue, violet, red'],
  'Violet (~400 nm) has the shortest wavelength and red (~700 nm) the longest, with blue, green and yellow in between in that order (the ROYGBIV order read backwards). "red, yellow, green, blue, violet" is the order of DECREASING wavelength - the same reversal trap as the recitation spectrum question.',
  ['Start with the shortest wavelength.', 'ROYGBIV is red→violet, i.e. long λ → short λ.', 'Read ROYGBIV backwards.']);

M(10, 2, 'Worksheet', 'Week 7 recitation, Q1: Arrange gamma rays, infrared, visible light, ultraviolet and radio waves in order of INCREASING wavelength.',
  ['gamma < ultraviolet < visible < infrared < radio',
   'radio < infrared < visible < ultraviolet < gamma',
   'gamma < visible < ultraviolet < infrared < radio',
   'ultraviolet < gamma < visible < radio < infrared',
   'gamma < ultraviolet < infrared < visible < radio'],
  'Shortest wavelength first: gamma rays (below ~0.01 nm) < ultraviolet (~10-400 nm) < visible (400-700 nm) < infrared (700 nm-1 mm) < radio (metres and longer). The order "radio, infrared, visible, ultraviolet, gamma" is DECREASING wavelength (it is the order of increasing frequency and energy) - the most common mistake on this question. Gamma rays are the SHORT ones.',
  ['Which of these is the most energetic? High energy means short wavelength.', 'Gamma rays have the shortest λ; radio waves the longest.', 'Gamma, then UV, then visible, then IR, then radio.']);

M(10, 4, 'Trap', 'Arrange gamma rays, infrared, visible light, ultraviolet and radio waves in order of INCREASING frequency.',
  ['radio < infrared < visible < ultraviolet < gamma',
   'gamma < ultraviolet < visible < infrared < radio',
   'radio < visible < infrared < ultraviolet < gamma',
   'infrared < radio < visible < gamma < ultraviolet',
   'radio < infrared < ultraviolet < visible < gamma'],
  'Frequency is inversely proportional to wavelength (c = λν), so the order of increasing FREQUENCY is the order of increasing wavelength read backwards. Increasing λ: gamma < UV < visible < IR < radio; therefore increasing ν: radio < IR < visible < UV < gamma. "gamma < ultraviolet < visible < infrared < radio" is the correct answer to the WAVELENGTH question - read the stem for which property is being ranked.',
  ['Is this asking about wavelength or frequency?', 'Frequency and wavelength run in opposite directions.', 'Lowest frequency = longest wavelength = radio.']);

M(10, 3, 'Concept', 'Arrange in order of DECREASING photon energy: X-rays, microwaves, visible light, ultraviolet, infrared.',
  ['X-ray > ultraviolet > visible > infrared > microwave',
   'microwave > infrared > visible > ultraviolet > X-ray',
   'X-ray > visible > ultraviolet > infrared > microwave',
   'ultraviolet > X-ray > visible > microwave > infrared',
   'X-ray > ultraviolet > visible > microwave > infrared'],
  'Photon energy E = hν rises with frequency and falls with wavelength. Most energetic (shortest λ) first: X-ray > UV > visible > IR > microwave. The reversed list is increasing energy. Microwaves have longer wavelengths than infrared, so they carry LESS energy per photon.',
  ['Most energetic = shortest wavelength.', 'Order by wavelength first, then reverse if needed.', 'Microwaves have longer λ than infrared.']);

M(10, 3, 'Concept', 'Arrange in order of DECREASING wavelength: microwave, ultraviolet, X-ray, infrared.',
  ['microwave > infrared > ultraviolet > X-ray',
   'X-ray > ultraviolet > infrared > microwave',
   'infrared > microwave > ultraviolet > X-ray',
   'microwave > infrared > X-ray > ultraviolet',
   'microwave > ultraviolet > infrared > X-ray'],
  'Longest first: microwaves (mm to cm) > infrared (μm) > ultraviolet (tens to hundreds of nm) > X-rays (fractions of a nm). The reversed list is increasing wavelength (= decreasing energy order backwards).',
  ['Which of these is used in a kitchen oven and has cm-scale waves?', 'Long λ end: radio, microwave, infrared. Short λ end: UV, X-ray, gamma.', 'Microwave first, X-ray last.']);

M(10, 2, 'Concept', 'Which kind of radiation has the SHORTEST wavelength?',
  ['X-rays', 'radio waves', 'microwaves', 'ultraviolet light', 'red light'],
  'X-rays (about 0.01-10 nm) have shorter wavelengths than ultraviolet (10-400 nm), red light (~700 nm), microwaves (mm-cm) or radio waves (metres). Shortest wavelength also means highest frequency and energy of these choices.',
  ['Which of these can pass through soft tissue in a medical image?', 'Order: X-ray < UV < visible < microwave < radio.', 'The most energetic choice has the shortest λ.']);

M(10, 2, 'Concept', 'Which kind of radiation has the LOWEST frequency?',
  ['radio waves', 'gamma rays', 'infrared', 'visible light', 'ultraviolet'],
  'Radio waves have the longest wavelengths (metres to km) in the spectrum, and since ν = c/λ they have the lowest frequencies. Gamma rays are the opposite extreme.',
  ['Lowest frequency = longest wavelength.', 'ν = c/λ.', 'The waves an FM station broadcasts.']);

M(10, 2, 'Concept', 'Which photon carries the MOST energy?',
  ['a gamma-ray photon', 'an X-ray photon', 'an ultraviolet photon', 'a violet-light photon', 'an infrared photon'],
  'Photon energy rises as wavelength falls. In order of decreasing energy: gamma > X-ray > UV > violet light > infrared. Gamma rays sit at the extreme short-wavelength, high-energy end of the spectrum.',
  ['E = hc/λ.', 'Find the shortest wavelength in the list.', 'The far end of the spectrum, past X-rays.']);

M(10, 3, 'Concept', 'Arrange in order of INCREASING photon energy: infrared, ultraviolet, microwave, visible.',
  ['microwave < infrared < visible < ultraviolet',
   'ultraviolet < visible < infrared < microwave',
   'infrared < microwave < visible < ultraviolet',
   'microwave < visible < infrared < ultraviolet',
   'visible < infrared < microwave < ultraviolet'],
  'Least energetic = longest wavelength. Microwaves (cm) < infrared (μm) < visible (400-700 nm) < ultraviolet (below 400 nm). The fully reversed list is decreasing energy.',
  ['Lowest energy = longest wavelength.', 'Microwaves have longer λ than infrared.', 'Start with microwave, end with ultraviolet.']);

M(10, 3, 'Concept', 'Which statement is FALSE?',
  ['An ultraviolet photon carries less energy than a photon of red light.',
   'X-rays have a higher frequency than microwaves.',
   'Radio waves have longer wavelengths than infrared radiation.',
   'Violet light has a shorter wavelength than red light.',
   'Gamma rays and radio waves travel at the same speed in a vacuum.'],
  'Ultraviolet light has a SHORTER wavelength than red light (below 400 nm vs ~700 nm), so a UV photon carries MORE energy, not less - that is why UV causes sunburn and red light does not. All the other statements are true: X-rays have higher ν than microwaves, radio waves are longer than IR, violet is shorter than red, and all EM radiation moves at c in a vacuum.',
  ['Check each statement against the spectrum order gamma, X, UV, visible, IR, micro, radio.', 'Energy rises toward the gamma end.', 'Which one claims the shorter-wavelength photon has less energy?']);

M(10, 4, 'Trap', 'Which statement is TRUE?',
  ['Infrared radiation has a lower frequency and a longer wavelength than visible light.',
   'Ultraviolet light has a longer wavelength than visible light because it is more energetic.',
   'Radio waves have the highest frequency because they have the longest wavelength.',
   'Red light (700 nm) has a higher frequency than violet light (400 nm).',
   'Making a red laser brighter makes each of its photons more energetic.'],
  'Infrared lies just past red: longer λ, so lower ν (ν = c/λ) - both parts are true. UV is MORE energetic because its wavelength is SHORTER. Radio waves have the LOWEST frequency. Red (700 nm) has a lower frequency than violet (400 nm). Brightness is amplitude/number of photons; each photon’s energy depends only on frequency.',
  ['For each statement ask: does λ go one way and ν the other?', 'Longest λ always pairs with lowest ν.', 'Look for the statement where λ and ν move in opposite directions correctly.']);

M(10, 4, 'Trap', 'Which list is in order of INCREASING wavelength?',
  ['gamma ray, X-ray, visible, radio',
   'radio, visible, X-ray, gamma ray',
   'X-ray, gamma ray, visible, radio',
   'gamma ray, visible, X-ray, radio',
   'visible, gamma ray, X-ray, radio'],
  'Shortest wavelength first: gamma rays < X-rays < visible < radio. "radio, visible, X-ray, gamma ray" is the order of increasing FREQUENCY/energy - exactly the reversal made on the recitation worksheet. Gamma rays are the SHORT ones.',
  ['Which of these is the most energetic? It goes first.', 'Increasing wavelength = decreasing energy.', 'Start at gamma, end at radio.']);

M(10, 4, 'Trap', 'Which list starts with the LEAST energetic photon and ends with the MOST energetic one?',
  ['radio, microwave, infrared, ultraviolet, gamma ray',
   'gamma ray, ultraviolet, infrared, microwave, radio',
   'microwave, radio, infrared, ultraviolet, gamma ray',
   'radio, infrared, microwave, ultraviolet, gamma ray',
   'radio, microwave, ultraviolet, infrared, gamma ray'],
  'Increasing energy = increasing frequency = decreasing wavelength: radio < microwave < infrared < ultraviolet < gamma. The reverse list runs most → least energetic. Microwaves are less energetic than infrared, and infrared less than ultraviolet.',
  ['Least energetic = longest wavelength.', 'Radio is longest; then microwave; then infrared.', 'End with the shortest wavelength.']);

M(10, 4, 'Trap', 'A list of radiation types is in order of DECREASING frequency. Which list could it be?',
  ['ultraviolet, visible, infrared, radio',
   'radio, infrared, visible, ultraviolet',
   'visible, ultraviolet, infrared, radio',
   'ultraviolet, infrared, visible, radio',
   'infrared, visible, ultraviolet, radio'],
  'Decreasing frequency = increasing wavelength: ultraviolet (shortest λ, highest ν) > visible > infrared > radio (lowest ν). "radio, infrared, visible, ultraviolet" is increasing frequency.',
  ['Highest frequency first.', 'Highest ν = shortest λ.', 'UV first, radio last.']);

M(10, 4, 'Trap', 'Compare light of 450 nm with light of 650 nm. Which statement is correct?',
  ['450 nm light has the higher frequency and the higher energy per photon',
   '650 nm light has the higher frequency because its wavelength is larger',
   'Both have the same energy per photon because both are visible light',
   '650 nm light has more energy per photon and travels faster',
   '450 nm light travels faster in a vacuum'],
  'Shorter wavelength → higher frequency (ν = c/λ) → higher photon energy (E = hν). 450 nm (blue) beats 650 nm (red) on both. A larger wavelength gives a SMALLER frequency, every visible colour has a different photon energy, and all light travels at c in a vacuum.',
  ['Which is shorter, 450 or 650 nm?', 'ν = c/λ and E = hν.', 'The shorter wavelength wins on frequency and energy.']);

/* --- which region / colour --- */
M(10, 2, 'Concept', 'Electromagnetic radiation with a wavelength of 250 nm lies in which region of the spectrum?',
  ['ultraviolet', 'visible', 'infrared', 'X-ray', 'microwave'],
  'Visible light runs from about 400 to 700 nm. 250 nm is shorter than violet (400 nm) but much longer than X-rays (about 0.01-10 nm), so it is ultraviolet (about 10-400 nm).',
  ['Compare 250 nm with the visible window.', 'Visible is 400-700 nm; just shorter than violet is…', 'Ultra-VIOLET is beyond violet.']);

M(10, 3, 'Concept', 'Radiation with a wavelength of 1.0 × 10⁻⁵ m (10 μm, emitted by warm objects) lies in which region?',
  ['infrared', 'ultraviolet', 'visible', 'microwave', 'X-ray'],
  '1.0 × 10⁻⁵ m = 10,000 nm, far longer than red light (700 nm) but much shorter than microwaves (millimetres and up). That is the infrared region (about 700 nm to 1 mm), the "heat" radiation warm bodies give off.',
  ['Convert to nm: 1.0 × 10⁻⁵ m × 10⁹ nm/m.', '10,000 nm is longer than 700 nm but shorter than 1 mm.', 'Just past red.']);

{
  const nu = 1.5e15, lam = c / nu;
  M(10, 3, 'Calculation', 'Radiation has a frequency of 1.5 × 10¹⁵ Hz. In which region of the spectrum does it lie?',
    ['ultraviolet', 'visible', 'infrared', 'X-ray', 'microwave'],
    `λ = c/ν = (2.998 × 10⁸ m/s)/(1.5 × 10¹⁵ s⁻¹) = ${E(lam, 2)} m = ${F(lam * 1e9, 2)} nm. That is shorter than violet light (400 nm) and longer than X-rays (below about 10 nm), so it is ultraviolet.`,
    ['Convert ν into λ first.', 'λ = c/ν, then change m to nm.', `λ ≈ ${F(lam * 1e9, 2)} nm.`]);
}
{
  const nu = 2.0e18, lam = c / nu;
  M(10, 3, 'Calculation', 'Radiation has a frequency of 2.0 × 10¹⁸ Hz. In which region of the spectrum does it lie?',
    ['X-ray', 'ultraviolet', 'visible', 'infrared', 'radio'],
    `λ = c/ν = (2.998 × 10⁸)/(2.0 × 10¹⁸) = ${E(lam, 2)} m = ${F(lam * 1e9, 2)} nm. Wavelengths of roughly 0.01-10 nm are X-rays (this is close to the 0.154 nm X-rays used in crystallography).`,
    ['Get λ from c = λν.', 'Express λ in nm and compare with UV (10-400 nm).', `λ ≈ ${F(lam * 1e9, 2)} nm - much shorter than UV.`]);
}
{
  const nu = 5.0e14, lam = c / nu;
  M(10, 3, 'Calculation', 'Radiation has a frequency of 5.0 × 10¹⁴ Hz. In which region of the spectrum does it lie?',
    ['visible', 'ultraviolet', 'infrared', 'microwave', 'X-ray'],
    `λ = c/ν = (2.998 × 10⁸)/(5.0 × 10¹⁴) = ${E(lam, 2)} m = ${F(lam * 1e9, 2)} nm, inside the 400-700 nm visible window (orange light).`,
    ['Convert ν into λ.', 'λ = c/ν, then × 10⁹ for nm.', `λ ≈ ${F(lam * 1e9, 2)} nm.`]);
}
{
  const nu = 96.5e6, lam = c / nu;
  M(10, 2, 'Concept', 'The radio station WAZY broadcasts at 96.5 MHz. Which region of the spectrum is this, and roughly how long is the wave?',
    [`radio; about ${F(lam, 1)} m`, 'microwave; about 3 cm', 'infrared; about 3 μm', 'radio; about 3 km', 'ultraviolet; about 300 nm'],
    `λ = c/ν = (2.998 × 10⁸ m/s)/(96.5 × 10⁶ s⁻¹) = ${F(lam, 3)} m - a wave about ${F(lam, 1)} m long, which is radio. (MHz = 10⁶ Hz.) The other choices are off by powers of ten in length or name the wrong region.`,
    ['MHz means 10⁶ Hz.', 'λ = c/ν = 2.998 × 10⁸ / 9.65 × 10⁷.', 'Metre-scale waves are radio waves.']);
}
M(10, 2, 'Concept', 'A laser pointer emits light of wavelength 532 nm. What colour is it?',
  ['green', 'red', 'violet', 'yellow', 'orange'],
  '532 nm sits in the middle of the visible range (roughly 495-570 nm is green). Red is about 620-700 nm, orange about 590-620 nm, yellow about 570-590 nm and violet about 400-450 nm.',
  ['Visible runs 400 (violet) to 700 (red) nm.', '532 nm is near the middle of that range.', 'The middle of ROYGBIV.']);

M(10, 3, 'Concept', 'Radiation with a wavelength of 1.0 × 10⁻¹³ m (0.10 pm) is best classified as:',
  ['gamma rays', 'X-rays', 'ultraviolet', 'microwaves', 'radio waves'],
  '1.0 × 10⁻¹³ m = 1.0 × 10⁻⁴ nm, far shorter than X-rays (about 0.01-10 nm). Only gamma rays (emitted by nuclei) have wavelengths this short.',
  ['Convert to nm: × 10⁹.', 'X-rays bottom out around 0.01 nm.', 'Shorter than X-rays means…']);

/* --- unit conversions --- */
M(10, 1, 'Concept', 'One nanometre (1 nm) is equal to:',
  ['1 × 10⁻⁹ m', '1 × 10⁻⁶ m', '1 × 10⁻¹² m', '1 × 10⁻¹⁰ m', '1 × 10⁹ m'],
  'Nano = 10⁻⁹, so 1 nm = 10⁻⁹ m. 10⁻⁶ m is a micrometre (μm), 10⁻¹² m a picometre (pm), 10⁻¹⁰ m an ångström (Å). Every light problem starts by converting nm to m.',
  ['n = nano.', 'nano is three steps below micro.', '10 to the minus nine.']);

M(10, 3, 'Concept', 'Which of the following is NOT equal to 450 nm?',
  ['4.50 × 10⁻⁹ m', '4.50 × 10⁻⁷ m', '4.50 × 10⁵ pm', '4500 Å', '0.450 μm'],
  '450 nm × 10⁻⁹ m/nm = 4.50 × 10⁻⁷ m. In pm: 450 × 1000 = 4.50 × 10⁵ pm. In Å (1 Å = 0.1 nm): 450/0.1 = 4500 Å. In μm: 450/1000 = 0.450 μm. 4.50 × 10⁻⁹ m forgets that 450 is not 4.50 - it is off by 100.',
  ['Convert 450 nm to metres carefully.', '450 nm = 450 × 10⁻⁹ m - now move the decimal.', '450 × 10⁻⁹ = 4.50 × 10⁻⁷, not 4.50 × 10⁻⁹.']);

/* --- c = λν calculations --- */
{
  const lam = c / 96.5e6;
  M(10, 2, 'Worksheet', 'Week 7 recitation, Q3: Radio station WAZY broadcasts at 96.5 MHz. What is the wavelength of these radio waves, in metres?',
    [`${F(lam, 3)} m`, `${E(lam * 1e6, 3)} m`, `${E(lam * 1e3, 3)} m`, `${F(96.5e6 / c, 3)} m`, `${E(c * 96.5e6, 3)} m`],
    `λ = c/ν. Convert first: 96.5 MHz = 96.5 × 10⁶ Hz = 9.65 × 10⁷ s⁻¹. λ = (2.998 × 10⁸ m/s)/(9.65 × 10⁷ s⁻¹) = ${F(lam, 3)} m. Traps: leaving ν as 96.5 gives ${E(lam * 1e6, 3)} m; using kHz (10³) gives ${E(lam * 1e3, 3)} m; ν/c gives ${F(96.5e6 / c, 3)}; c × ν gives ${E(c * 96.5e6, 3)}.`,
    ['Mega = 10⁶.', 'λ = c/ν with ν in s⁻¹.', '2.998 × 10⁸ ÷ 9.65 × 10⁷.']);
}
{
  const lam = c / 101.1e6;
  N(10, 2, 'Exam', 'An FM station broadcasts at 101.1 MHz. What is the wavelength of its radio waves? (Enter a number in m.)',
    [`${F(lam, 4)} m`], lam,
    `λ = c/ν = (2.998 × 10⁸ m/s)/(101.1 × 10⁶ s⁻¹) = ${F(lam, 4)} m. Remember MHz = 10⁶ Hz; forgetting it gives a wavelength a million times too big.`,
    ['Convert MHz to Hz.', 'λ = c/ν.', '2.998 × 10⁸ / 1.011 × 10⁸.']);
}
{
  const lam = c / 2.45e9;
  N(10, 2, 'Calculation', 'A microwave oven operates at 2.45 GHz. What is the wavelength of the microwaves? (Enter a number in cm.)',
    [`${F(lam * 100, 3)} cm`], lam * 100,
    `GHz = 10⁹ Hz, so ν = 2.45 × 10⁹ s⁻¹. λ = c/ν = (2.998 × 10⁸)/(2.45 × 10⁹) = ${F(lam, 3)} m = ${F(lam * 100, 3)} cm. Centimetre-scale waves are microwaves.`,
    ['G = giga = 10⁹.', 'λ = c/ν gives metres; × 100 for cm.', `λ = ${F(lam, 3)} m.`]);
}
{
  const lam = c / 1010e3;
  M(10, 3, 'Calculation', 'An AM radio station broadcasts at 1010 kHz. What is the wavelength of its signal?',
    [`${F(lam, 3)} m`, `${F(lam / 1000, 3)} m`, `${E(lam * 1000, 3)} m`, `${E(1010e3 / c, 3)} m`, `${E(c * 1010e3, 3)} m`],
    `kHz = 10³ Hz, so ν = 1.010 × 10⁶ s⁻¹. λ = c/ν = (2.998 × 10⁸)/(1.010 × 10⁶) = ${F(lam, 3)} m. Treating kHz as MHz gives ${F(lam / 1000, 3)} m; forgetting the prefix gives ${E(lam * 1000, 3)} m; dividing the wrong way (ν/c) gives ${E(1010e3 / c, 3)}; multiplying gives ${E(c * 1010e3, 3)}.`,
    ['k = kilo = 10³.', 'λ = c/ν.', '2.998 × 10⁸ ÷ 1.010 × 10⁶.']);
}
{
  const lam = 532e-9, nu = c / lam;
  M(10, 2, 'Worksheet', 'Week 7 recitation, Q4(a): A green laser pointer emits light of wavelength 532 nm. What is the frequency of this light?',
    [`${E(nu, 3)} Hz`, `${E(c / 532, 3)} Hz`, `${E(lam / c, 3)} Hz`, `${E(c * lam, 3)} Hz`, `${E(c / 532e-12, 3)} Hz`],
    `ν = c/λ with λ in metres: 532 nm = 532 × 10⁻⁹ m = 5.32 × 10⁻⁷ m. ν = (2.998 × 10⁸ m/s)/(5.32 × 10⁻⁷ m) = ${E(nu, 3)} s⁻¹ (Hz). Leaving λ as 532 gives ${E(c / 532, 3)} Hz; λ/c gives ${E(lam / c, 3)}; c·λ gives ${E(c * lam, 3)}; converting as if pm gives ${E(c / 532e-12, 3)} Hz.`,
    ['Convert nm to m before anything else.', 'ν = c/λ.', '2.998 × 10⁸ ÷ 5.32 × 10⁻⁷.']);
}
{
  const nu = c / 450e-9;
  N(10, 2, 'Calculation', 'What is the frequency of blue light with a wavelength of 450. nm? (Enter a number in Hz.)',
    [`${E(nu, 3)} Hz`], nu,
    `ν = c/λ = (2.998 × 10⁸ m/s)/(450. × 10⁻⁹ m) = ${E(nu, 3)} Hz.`,
    ['nm → m first.', 'ν = c/λ.', '2.998 × 10⁸ / 4.50 × 10⁻⁷.']);
}
{
  const lam = c / 6.00e14;
  N(10, 3, 'Calculation', 'Light has a frequency of 6.00 × 10¹⁴ Hz. What is its wavelength? (Enter a number in nm.)',
    [`${E(lam * 1e9, 3)} nm`], lam * 1e9,
    `λ = c/ν = (2.998 × 10⁸)/(6.00 × 10¹⁴) = ${E(lam, 3)} m. Convert to nm: × 10⁹ nm/m = ${E(lam * 1e9, 3)} nm (blue-green visible light).`,
    ['λ = c/ν gives metres.', 'Multiply metres by 10⁹ to get nm.', `${E(lam, 3)} m.`]);
}
{
  const lam = 1.54e-10, nu = c / lam;
  N(10, 3, 'Calculation', 'Copper X-ray tubes produce X-rays with λ = 1.54 Å (1 Å = 10⁻¹⁰ m). What is their frequency? (Enter a number in Hz.)',
    [`${E(nu, 3)} Hz`], nu,
    `1.54 Å = 1.54 × 10⁻¹⁰ m (= 0.154 nm). ν = c/λ = (2.998 × 10⁸)/(1.54 × 10⁻¹⁰) = ${E(nu, 3)} Hz.`,
    ['1 Å = 10⁻¹⁰ m = 0.1 nm.', 'ν = c/λ.', '2.998 × 10⁸ / 1.54 × 10⁻¹⁰.']);
}
M(10, 1, 'Concept', 'If the wavelength of a light wave is doubled (in a vacuum), its frequency:',
  ['is halved', 'is doubled', 'is unchanged', 'is quadrupled', 'is cut to one quarter'],
  'c = λν with c constant, so λ and ν are inversely proportional: doubling λ halves ν (and halves the photon energy).',
  ['Which quantity in c = λν cannot change?', 'If λ × ν is fixed and λ doubles…', '…ν must drop by a factor of 2.']);

M(10, 2, 'Trap', 'A red laser beam is made twice as intense without changing its wavelength. What happens to the energy of each photon?',
  ['It stays the same; the beam simply carries twice as many photons',
   'It doubles, because intensity measures photon energy',
   'It halves, because the energy is shared among more photons',
   'It increases, and the light shifts toward blue',
   'It doubles, and the wavelength halves'],
  'Photon energy is E = hν = hc/λ: it depends only on frequency (wavelength). Intensity (amplitude) measures how many photons arrive per second. Twice the intensity at the same λ = twice as many photons, each with the same energy, and the colour does not change.',
  ['What does intensity (amplitude) count?', 'E(photon) = hc/λ - is intensity in that equation?', 'Same λ → same energy per photon.']);

/* --- refraction / diffraction / wave vs particle --- */
M(10, 1, 'Concept', 'The bending of light as it passes at an angle from air into glass (which lets a prism spread white light into colours) is called:',
  ['refraction', 'diffraction', 'interference', 'the photoelectric effect', 'emission'],
  'Refraction is the change in direction when a wave moves into a medium where its speed is different. Different wavelengths bend by different amounts, which is how a prism separates white light. Diffraction is the bending of a wave around an edge or through a small opening.',
  ['The light crosses a boundary between two materials.', 'Its speed changes at the boundary.', 'Starts with "re-".']);

M(10, 2, 'Concept', 'Waves passing through a slit about as wide as their wavelength spread out, and with two slits they make a pattern of bright and dark bands. This behaviour is:',
  ['diffraction, which is characteristic of waves',
   'refraction, which is characteristic of particles',
   'the photoelectric effect, which is characteristic of particles',
   'diffraction, which is characteristic of particles',
   'refraction, which is characteristic of waves'],
  'Bending around an edge or spreading through an opening is diffraction, and the overlapping spread-out waves interfere to give bright and dark bands. Particles would pass straight through and give only two bright images, so diffraction is the signature of WAVE behaviour. Refraction is bending when crossing into a new medium; the photoelectric effect shows particle behaviour.',
  ['The light is spreading through a gap, not crossing into glass.', 'Interference bands appear only when waves overlap.', 'Diffraction is a wave property.']);

M(10, 2, 'Concept', 'Which observation could NOT be explained by treating light purely as a wave?',
  ['The photoelectric effect: no electrons are ejected below a threshold frequency, however bright the light',
   'The refraction of white light into colours by a prism',
   'The diffraction of light through a narrow slit',
   'The pattern of bright and dark bands from two slits',
   'All colours of light travelling at the same speed in a vacuum'],
  'In a pure wave picture, a bright enough beam of any frequency would eventually deliver enough energy to free an electron. The threshold frequency is explained only if light comes in particles (photons) of energy hν, one photon per electron. Refraction, diffraction, interference and a constant speed are all wave behaviours.',
  ['Which of these needs light to come in packets?', 'In a pure wave picture a brighter beam should always help - here it does not.', 'Einstein’s explanation used photons.']);

/* --- Planck --- */
M(10, 1, 'Concept', 'According to Planck’s quantum theory, an object can emit or absorb energy:',
  ['only in whole-number multiples of hν (E = nhν)',
   'in any amount, as long as the light is bright enough',
   'only in amounts that depend on intensity, not frequency',
   'only in multiples of hλ',
   'only in fractions of hν such as ½hν and ⅓hν'],
  'Planck proposed that energy is quantized: an atom vibrating at frequency ν can change its energy only by whole-number multiples of hν, E = nhν (n = 1, 2, 3, …). The smallest packet, hν, is one quantum. Energy depends on frequency, not intensity, and fractions of a quantum are not allowed.',
  ['Quantized = comes in packets.', 'The packet size is set by frequency.', 'n = 1, 2, 3 …']);

M(10, 1, 'Concept', 'Planck first proposed that energy is quantized in order to explain:',
  ['the light (blackbody radiation) given off by hot objects',
   'the line spectrum of hydrogen',
   'the diffraction of electrons by a nickel crystal',
   'the uncertainty principle',
   'the shapes of p orbitals'],
  'Classical wave theory could not reproduce how the colour and intensity of light from a glowing (blackbody) object change with temperature - it predicted unlimited ultraviolet output. Planck fixed this in 1900 by assuming energy is emitted in quanta of hν. Bohr later used quantization for hydrogen’s spectrum; electron diffraction and uncertainty came later still.',
  ['Think of a stove element glowing red, then orange.', 'Hot objects, not hydrogen atoms.', 'Blackbody radiation.']);

M(10, 2, 'Concept', 'An atom vibrates with frequency ν. According to Planck, which change in its energy is NOT allowed?',
  ['1.5hν', 'hν', '2hν', '3hν', '5hν'],
  'Allowed energy changes are whole-number multiples of hν: ΔE = nhν with n = 1, 2, 3, … So hν, 2hν, 3hν and 5hν are allowed; 1.5hν would be half a quantum, which is not.',
  ['ΔE = nhν.', 'n must be a whole number.', 'Which multiplier is not an integer?']);

M(10, 3, 'Concept', 'Photon A has a wavelength of 200 nm and photon B a wavelength of 600 nm. What is E(A)/E(B)?',
  ['3', '1/3', '9', '1/9', '1'],
  'E = hc/λ, so energy is inversely proportional to wavelength. E(A)/E(B) = λ(B)/λ(A) = 600/200 = 3. The 200 nm (UV) photon has three times the energy. 1/3 inverts the ratio; 9 and 1/9 wrongly square it.',
  ['E = hc/λ.', 'The ratio of energies is the INVERSE ratio of wavelengths.', '600 ÷ 200.']);

M(10, 2, 'Trap', 'Photon A has twice the frequency of photon B. Compared with photon B, photon A has:',
  ['twice the energy and half the wavelength',
   'twice the energy and twice the wavelength',
   'half the energy and half the wavelength',
   'the same energy, since energy depends on amplitude',
   'four times the energy and half the wavelength'],
  'E = hν is directly proportional to ν: double ν, double E. λ = c/ν is inversely proportional to ν: double ν, half λ. Photon energy does not depend on amplitude.',
  ['Photon energy: E = hν.', 'Wavelength: λ = c/ν.', 'One doubles, the other halves.']);

{
  const lam = 532e-9, en = Elam(lam), nu = c / lam;
  M(10, 3, 'Worksheet', 'Week 7 recitation, Q4(b): What is the energy of ONE photon of the 532 nm green laser light?',
    [`${E(en, 3)} J`, `${E(Elam(532), 3)} J`, `${E(en * NA, 3)} J`, `${E(h / lam, 3)} J`, `${E(h / nu, 3)} J`],
    `E = hc/λ = (6.626 × 10⁻³⁴ J·s)(2.998 × 10⁸ m/s)/(5.32 × 10⁻⁷ m) = ${E(en, 3)} J (or E = hν with ν = ${E(nu, 3)} Hz). Traps: λ left in nm gives ${E(Elam(532), 3)} J; multiplying by Avogadro’s number gives ${E(en * NA, 3)} J, which is per MOLE; h/λ (${E(h / lam, 3)}) is the photon’s momentum, not its energy; h/ν gives ${E(h / nu, 3)}.`,
    ['One photon: E = hν = hc/λ.', 'λ = 5.32 × 10⁻⁷ m.', '(6.626 × 10⁻³⁴)(2.998 × 10⁸)/(5.32 × 10⁻⁷).']);
}
M(10, 2, 'Worksheet', 'Week 7 recitation, Q4(c): Without calculating, would a photon of 700 nm red light have more or less energy than a 532 nm green photon?',
  ['Less energy, because a longer wavelength means a lower frequency',
   'More energy, because a longer wavelength carries more energy',
   'The same energy, because both are visible light',
   'More energy, because red light is more intense',
   'Less energy, because red light travels more slowly'],
  'E = hc/λ: energy is inversely proportional to wavelength. 700 nm is longer than 532 nm, so the red photon has a lower frequency and LESS energy (about 532/700 = 0.76 times as much). Intensity does not set photon energy, and all light travels at c.',
  ['E = hc/λ.', 'λ is in the denominator.', 'Longer λ → less energy.']);

{
  const nu = 7.50e14, en = h * nu;
  M(10, 2, 'Worksheet', 'Week 7 recitation, Q6(a): An ultraviolet photon has a frequency of 7.50 × 10¹⁴ Hz. What is the energy of one photon?',
    [`${E(en, 3)} J`, `${E(en * NA, 3)} J`, `${E(h / nu, 3)} J`, `${E(h * nu / c, 3)} J`, `${E(en / 1000, 3)} J`],
    `E = hν = (6.626 × 10⁻³⁴ J·s)(7.50 × 10¹⁴ s⁻¹) = ${E(en, 3)} J per photon. Multiplying by N_A (${E(en * NA, 3)} J) gives a MOLE of photons; h/ν (${E(h / nu, 3)}) divides instead of multiplying; hν/c (${E(h * nu / c, 3)}) is a momentum; ${E(en / 1000, 3)} is the right number in kJ mislabelled as J.`,
    ['Given ν directly: no wavelength needed.', 'Use E = hν for one photon.', '6.626 × 10⁻³⁴ × 7.50 × 10¹⁴.']);
}
{
  const nu = 7.50e14, en = h * nu, mol = en * NA / 1000;
  N(10, 3, 'Worksheet', 'Week 7 recitation, Q6(b): For the same 7.50 × 10¹⁴ Hz ultraviolet light, what is the energy of one MOLE of photons? (Enter a number in kJ/mol.)',
    [`${F(mol, 3)} kJ/mol`], mol,
    `Per photon: E = hν = (6.626 × 10⁻³⁴)(7.50 × 10¹⁴) = ${E(en, 3)} J. Per mole: × 6.022 × 10²³ photons/mol = ${E(en * NA, 3)} J/mol. ÷ 1000: ${F(mol, 3)} kJ/mol. Two separate steps: per photon first, then × N_A, then J → kJ.`,
    ['Find the energy of ONE photon first.', 'Then multiply by 6.022 × 10²³.', 'Divide by 1000 to turn J into kJ.']);
}
M(10, 2, 'Worksheet', 'Week 7 recitation, Q7: Without calculating, does a photon of 4.00 × 10¹⁴ Hz light have more or less energy than the 7.50 × 10¹⁴ Hz ultraviolet photon?',
  ['Less, because E = hν and its frequency is lower',
   'More, because a lower frequency means a longer, more energetic wave',
   'The same, because all photons carry the same energy',
   'More, because it is closer to visible light',
   'It cannot be decided without knowing the intensity'],
  'E = hν: photon energy is directly proportional to frequency. 4.00 × 10¹⁴ Hz < 7.50 × 10¹⁴ Hz, so the photon has less energy (4.00/7.50 = 0.533 times as much; it is red/near-infrared light, λ ≈ 750 nm). Intensity never changes the energy of a single photon.',
  ['Photon energy: E = hν.', 'Compare the two frequencies.', 'Lower ν → lower E.']);

{
  const lam = 635e-9, en = Elam(lam), mol = en * NA / 1000;
  M(10, 3, 'Worksheet', 'Week 7 recitation, Q2: What is the energy, in kJ/mol, of photons with a wavelength of 635 nm?',
    [`${F(mol, 3)} kJ/mol`, `${E(mol * 1000, 3)} kJ/mol`, `${E(en / 1000, 3)} kJ/mol`, `${E(Elam(635) * NA / 1000, 3)} kJ/mol`, `${F(mol / 1000, 3)} kJ/mol`],
    `Step 1, one photon: E = hc/λ = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/(6.35 × 10⁻⁷ m) = ${E(en, 3)} J. Step 2, one mole: × 6.022 × 10²³ = ${E(en * NA, 3)} J/mol. Step 3: ÷ 1000 = ${F(mol, 3)} kJ/mol. Traps: forgetting ÷ 1000 gives ${E(mol * 1000, 3)}; stopping at one photon gives ${E(en / 1000, 3)} kJ; leaving λ in nm gives ${E(Elam(635) * NA / 1000, 3)}; dividing by 10⁶ gives ${F(mol / 1000, 3)}.`,
    ['Per photon first: E = hc/λ with λ in m.', 'Then × 6.022 × 10²³ for a mole.', `Then J → kJ: ${E(en * NA, 3)} J ÷ 1000.`]);
}
{
  const en = Elam(405e-9), mol = en * NA / 1000;
  N(10, 3, 'Exam', 'Blu-ray players use a 405 nm violet laser. What is the energy of one mole of these photons? (Enter a number in kJ/mol.)',
    [`${F(mol, 3)} kJ/mol`], mol,
    `E(photon) = hc/λ = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/(4.05 × 10⁻⁷) = ${E(en, 3)} J. × 6.022 × 10²³ = ${E(en * NA, 3)} J/mol = ${F(mol, 3)} kJ/mol.`,
    ['nm → m, then E = hc/λ.', 'Multiply by Avogadro’s number.', 'Divide by 1000 for kJ.']);
}
{
  const per = 250e3 / NA, lam = lamE(per);
  M(10, 4, 'Trap', 'Light whose photons carry 250. kJ per mole of photons has what wavelength?',
    [`${F(lam * 1e9, 3)} nm`, `${E(lamE(250e3) * 1e9, 3)} nm`, `${E(lamE(250 / NA) * 1e9, 3)} nm`, `${E(lam, 3)} nm`, `${E(lamE(250e3 * NA) * 1e9, 3)} nm`],
    `λ comes from the energy of ONE photon. Per photon: 250. kJ/mol × 1000 J/kJ ÷ 6.022 × 10²³ = ${E(per, 3)} J. λ = hc/E = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/(${E(per, 3)}) = ${E(lam, 3)} m = ${F(lam * 1e9, 3)} nm. Traps: using 2.50 × 10⁵ J (the whole mole) gives ${E(lamE(250e3) * 1e9, 3)} nm; forgetting kJ → J gives ${E(lamE(250 / NA) * 1e9, 3)} nm; not converting m → nm gives ${E(lam, 3)}; multiplying by N_A instead of dividing gives ${E(lamE(250e3 * NA) * 1e9, 3)} nm.`,
    ['λ needs the energy of ONE photon.', 'kJ/mol × 1000 ÷ 6.022 × 10²³ = J per photon.', 'Then λ = hc/E and convert m to nm.']);
}
{
  const per = 495e3 / NA, lam = lamE(per);
  N(10, 3, 'Trap', 'Breaking the O=O bond in O₂ requires 495 kJ/mol. What is the LONGEST wavelength of light whose photons can each break one O=O bond? (Enter a number in nm.)',
    [`${F(lam * 1e9, 3)} nm`], lam * 1e9,
    `One photon breaks one bond, so use the energy per BOND: 495 × 10³ J/mol ÷ 6.022 × 10²³ = ${E(per, 3)} J. λ = hc/E = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/(${E(per, 3)}) = ${E(lam, 3)} m = ${F(lam * 1e9, 3)} nm. Longer wavelengths carry less energy per photon and cannot break the bond.`,
    ['Convert kJ/mol into J per bond (per photon).', '× 1000, ÷ 6.022 × 10²³; then λ = hc/E.', `E per bond = ${E(per, 3)} J.`]);
}
{
  const per = 339e3 / NA, lam = lamE(per);
  M(10, 4, 'Exam', 'The C−Cl bond energy is 339 kJ/mol. Which of these radiations can break a C−Cl bond with a single photon?',
    ['ultraviolet light of 300 nm', 'violet light of 400 nm', 'green light of 532 nm', 'infrared radiation of 1000 nm', 'microwaves of 12.2 cm'],
    `Energy per bond = 339 × 10³ J ÷ 6.022 × 10²³ = ${E(per, 3)} J. The longest wavelength with at least that much energy is λ = hc/E = ${F(lam * 1e9, 3)} nm. Only light SHORTER than ${F(lam * 1e9, 3)} nm works, so only the 300 nm UV qualifies - this is why UV in the stratosphere breaks C−Cl bonds in CFCs while visible light does not.`,
    ['Find the maximum wavelength that can break the bond.', 'Per-bond energy = 339 000 / 6.022 × 10²³; λ = hc/E.', `λ(max) ≈ ${F(lam * 1e9, 3)} nm; pick the shorter one.`]);
}
{
  const per = 300e3 / NA;
  M(10, 3, 'Calculation', 'A mole of photons of a certain light carries 3.00 × 10² kJ. What is the energy of ONE of these photons?',
    [`${E(per, 3)} J`, `${E(300 / NA, 3)} J`, `${E(0.300 / NA, 3)} J`, `${E(300 * NA, 3)} J`, `${E(300e3 * NA, 3)} J`],
    `3.00 × 10² kJ = 3.00 × 10⁵ J for 6.022 × 10²³ photons. One photon: 3.00 × 10⁵ ÷ 6.022 × 10²³ = ${E(per, 3)} J. Forgetting kJ → J gives ${E(300 / NA, 3)}; dividing by 1000 instead of multiplying gives ${E(0.300 / NA, 3)}; multiplying by N_A gives absurdly large values.`,
    ['kJ → J first.', 'Per photon = per mole ÷ N_A.', '3.00 × 10⁵ / 6.022 × 10²³.']);
}
{
  const per = Elam(532e-9), n = 1.00e-3 / per;
  M(10, 3, 'Calculation', 'A green laser (532 nm) fires a pulse carrying 1.00 mJ of energy. How many photons are in the pulse?',
    [`${E(n, 3)} photons`, `${E(1.00 / per, 3)} photons`, `${E(1.00e-3 / Elam(532), 3)} photons`, `${E(per / 1.00e-3, 3)} photons`, `${E(n / NA, 3)} photons`],
    `Energy of one photon: E = hc/λ = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/(5.32 × 10⁻⁷) = ${E(per, 3)} J. Number = total ÷ per photon = 1.00 × 10⁻³ J ÷ ${E(per, 3)} J = ${E(n, 3)} photons. Traps: 1.00 mJ read as 1.00 J gives ${E(1.00 / per, 3)}; λ left in nm gives ${E(1.00e-3 / Elam(532), 3)}; dividing the wrong way gives ${E(per / 1.00e-3, 3)}; ${E(n / NA, 3)} is the number of MOLES of photons.`,
    ['Number of photons = total energy ÷ energy of one photon.', 'mJ = 10⁻³ J; E(photon) = hc/λ.', `1.00 × 10⁻³ ÷ ${E(per, 3)}.`]);
}
{
  const per = Elam(1064e-9), n = 1.00 / per;
  N(10, 3, 'Calculation', 'A Nd:YAG laser pulse at 1064 nm delivers 1.00 J. How many photons does it contain? (Enter a number of photons.)',
    [`${E(n, 3)}`], n,
    `E(photon) = hc/λ = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/(1.064 × 10⁻⁶ m) = ${E(per, 3)} J. Photons = 1.00 J ÷ ${E(per, 3)} J = ${E(n, 3)}.`,
    ['How much energy is in ONE photon?', 'E = hc/λ with λ = 1.064 × 10⁻⁶ m.', 'Divide the total energy by that.']);
}
{
  const per = Elam(405e-9), tot = 5.00e-3 * 10.0, n = tot / per;
  M(10, 4, 'Exam', 'A 405 nm laser has a power of 5.00 mW (1 W = 1 J/s). How many photons does it emit in 10.0 s?',
    [`${E(n, 3)}`, `${E(5.00 * 10.0 / per, 3)}`, `${E(5.00e-3 / per, 3)}`, `${E(tot / Elam(405), 3)}`, `${E(n / NA, 3)}`],
    `Energy emitted = power × time = (5.00 × 10⁻³ J/s)(10.0 s) = ${E(tot, 3)} J. One photon: hc/λ = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/(4.05 × 10⁻⁷) = ${E(per, 3)} J. Photons = ${E(tot, 3)} ÷ ${E(per, 3)} = ${E(n, 3)}. Traps: mW read as W gives ${E(5.00 * 10.0 / per, 3)}; forgetting the 10.0 s gives ${E(5.00e-3 / per, 3)}; λ left in nm gives ${E(tot / Elam(405), 3)}; ${E(n / NA, 3)} is moles of photons.`,
    ['First find the total energy in joules.', 'J = W × s, then divide by the energy of one photon.', `Total = ${E(tot, 3)} J; per photon = ${E(per, 3)} J.`]);
}
{
  const q = 250. * 4.184 * 50.0, per = Elam(0.122), n = q / per;
  M(10, 4, 'Exam', 'A microwave oven heats 250. g of water from 20.0 °C to 70.0 °C using microwaves of λ = 12.2 cm. Assuming all the energy goes into the water (c = 4.184 J/g·°C), how many photons are absorbed?',
    [`${E(n, 3)} photons`, `${E(q / Elam(12.2), 3)} photons`, `${E((q / 1000) / per, 3)} photons`, `${E(250 * 4.184 / per, 3)} photons`, `${E(n / NA, 3)} photons`],
    `Heat: q = m·c·ΔT = (250. g)(4.184 J/g·°C)(50.0 °C) = ${E(q, 3)} J. One photon: λ = 12.2 cm = 0.122 m, E = hc/λ = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/(0.122) = ${E(per, 3)} J. Photons = ${E(q, 3)} ÷ ${E(per, 3)} = ${E(n, 3)}. Traps: λ left as 12.2 (m) gives ${E(q / Elam(12.2), 3)}; q in kJ gives ${E((q / 1000) / per, 3)}; dropping ΔT gives ${E(250 * 4.184 / per, 3)}; ${E(n / NA, 3)} is moles of photons.`,
    ['Two chapters: q = mcΔT, then photons.', 'cm → m before E = hc/λ.', `q = ${E(q, 3)} J; divide by ${E(per, 3)} J.`]);
}
{
  const nu = 3.00e-19 / h;
  N(10, 2, 'Calculation', 'A photon has an energy of 3.00 × 10⁻¹⁹ J. What is its frequency? (Enter a number in Hz.)',
    [`${E(nu, 3)} Hz`], nu,
    `E = hν, so ν = E/h = (3.00 × 10⁻¹⁹ J)/(6.626 × 10⁻³⁴ J·s) = ${E(nu, 3)} s⁻¹.`,
    ['Rearrange E = hν.', 'ν = E/h.', '3.00 × 10⁻¹⁹ / 6.626 × 10⁻³⁴.']);
}
{
  const lam = lamE(3.00e-19);
  N(10, 3, 'Calculation', 'A photon has an energy of 3.00 × 10⁻¹⁹ J. What is its wavelength? (Enter a number in nm.)',
    [`${F(lam * 1e9, 3)} nm`], lam * 1e9,
    `λ = hc/E = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/(3.00 × 10⁻¹⁹) = ${E(lam, 3)} m = ${F(lam * 1e9, 3)} nm (red light).`,
    ['Rearrange E = hc/λ.', 'λ = hc/E, in metres.', 'Multiply by 10⁹ for nm.']);
}
{
  const lam = lamE(4.00e-19);
  M(10, 3, 'Exam', 'A photon carries 4.00 × 10⁻¹⁹ J. What are its wavelength and region of the spectrum?',
    [`${F(lam * 1e9, 3)} nm, visible`, `${F(lam * 1e9, 3)} nm, ultraviolet`, `${E(lam, 3)} nm, gamma ray`, `${E(4.00e-19 / h, 3)} nm, radio`, `${E(4.00e-19 / (h * c), 3)} m, radio`],
    `λ = hc/E = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/(4.00 × 10⁻¹⁹) = ${E(lam, 3)} m = ${F(lam * 1e9, 3)} nm, inside 400-700 nm: visible (blue-green). Traps: forgetting m → nm gives ${E(lam, 3)}; E/h is the FREQUENCY (${E(4.00e-19 / h, 3)} Hz), not λ; E/(hc) is 1/λ in m⁻¹.`,
    ['λ = hc/E.', 'Convert metres to nm.', 'Is the result between 400 and 700 nm?']);
}
{
  const en = Elam(1.54e-10);
  M(10, 3, 'Calculation', 'What is the energy of one X-ray photon with λ = 1.54 Å (1 Å = 10⁻¹⁰ m)?',
    [`${E(en, 3)} J`, `${E(Elam(1.54e-9), 3)} J`, `${E(Elam(1.54e-12), 3)} J`, `${E(Elam(1.54), 3)} J`, `${E(en * NA, 3)} J`],
    `1.54 Å = 1.54 × 10⁻¹⁰ m. E = hc/λ = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/(1.54 × 10⁻¹⁰) = ${E(en, 3)} J. Treating Å as nm gives ${E(Elam(1.54e-9), 3)}; as pm gives ${E(Elam(1.54e-12), 3)}; not converting gives ${E(Elam(1.54), 3)}; × N_A gives a per-mole value.`,
    ['Å → m first.', 'E = hc/λ.', '(6.626 × 10⁻³⁴)(2.998 × 10⁸)/(1.54 × 10⁻¹⁰).']);
}
{
  const b = 250e3 / NA;
  M(10, 4, 'Trap', 'Photon A has an energy of 4.00 × 10⁻¹⁹ J. Photon B comes from a beam whose photons carry 250. kJ per mole. Which photon has more energy?',
    [`Photon B: it carries ${E(b, 3)} J, slightly more than A`,
     `Photon A: B carries only ${E(250 / NA, 3)} J`,
     `Photon B: it carries 2.50 × 10⁵ J, vastly more than A`,
     'They are equal: both are 4.00 × 10⁻¹⁹ J',
     `Photon B: it carries ${E(250e3 * NA, 3)} J, vastly more than A`],
    `Put both on a per-photon basis: 250. kJ/mol × 1000 J/kJ ÷ 6.022 × 10²³ photons/mol = ${E(b, 3)} J per photon, which is a little more than 4.00 × 10⁻¹⁹ J. Forgetting the kJ → J step gives ${E(250 / NA, 3)} J; 2.50 × 10⁵ J is the energy of a whole MOLE of photons, not one.`,
    ['Compare like with like: J per photon.', 'kJ/mol → J/photon: × 1000, ÷ 6.022 × 10²³.', `B = ${E(b, 3)} J.`]);
}

/* --- photoelectric effect --- */
M(10, 1, 'Concept', 'In the photoelectric effect, the threshold frequency ν₀ of a metal is:',
  ['the minimum frequency of light that can eject electrons from the metal',
   'the maximum frequency of light that can eject electrons',
   'the frequency at which ejected electrons have the greatest kinetic energy',
   'the minimum intensity of light needed to eject electrons',
   'the frequency of light the metal emits when heated'],
  'Below ν₀ no electrons are ejected however bright the light, because each photon (energy hν) is too weak to free an electron. At or above ν₀, electrons come out at once. hν₀ is the work function φ. The threshold is about frequency, not intensity.',
  ['"Threshold" = the point you must reach.', 'Below it, nothing happens however bright the light.', 'It is a minimum frequency.']);

M(10, 3, 'Trap', 'Light ABOVE the threshold frequency shines on a metal and ejects electrons. The intensity is doubled at the same frequency. What happens?',
  ['Twice as many electrons are ejected, each with the same maximum kinetic energy',
   'The same number of electrons are ejected, each with twice the kinetic energy',
   'Twice as many electrons are ejected, each with twice the kinetic energy',
   'Nothing changes, because intensity has no effect at all',
   'Fewer electrons are ejected, because each photon now carries less energy'],
  'Doubling intensity doubles the number of photons, and one photon frees one electron, so twice as many electrons come out. Each photon still has energy hν, so each electron’s maximum KE = hν − φ is unchanged. To make electrons FASTER you must raise the frequency, not the brightness.',
  ['Intensity = number of photons per second.', 'One photon ejects one electron; KE = hν − φ.', 'More photons, same energy each.']);

M(10, 2, 'Trap', 'Light BELOW the threshold frequency shines on a metal and ejects no electrons. Its intensity is increased 100-fold. What happens?',
  ['Still no electrons are ejected',
   'Electrons are ejected once enough energy has built up',
   'Electrons are ejected with 100 times the kinetic energy',
   '100 times as many electrons are ejected',
   'Electrons are ejected, but only after a delay'],
  'Each photon has energy hν, which is less than the work function φ when ν is below ν₀. A brighter beam just delivers more of these too-weak photons; an electron cannot add up energy from several of them. So no electrons are ejected at any intensity. This is the observation the wave theory could not explain.',
  ['Does intensity change the energy of ONE photon?', 'An electron needs hν ≥ φ from a single photon.', 'More weak photons are still weak photons.']);

M(10, 2, 'Concept', 'Light above threshold ejects electrons from a metal. The frequency is increased while the number of photons per second stays the same. What happens?',
  ['Each ejected electron has more kinetic energy; about the same number are ejected',
   'More electrons are ejected, each with the same kinetic energy',
   'Fewer electrons are ejected, each with less kinetic energy',
   'Nothing changes, because only intensity matters',
   'The work function of the metal increases'],
  'KE(max) = hν − φ: higher ν means each photon brings more energy, and the extra goes into the electron’s kinetic energy. The number of electrons depends on the number of photons, which is unchanged. φ is a property of the metal and does not change.',
  ['KE = hν − φ.', 'Which term grows when ν grows?', 'Same photon count, more energy each.']);

M(10, 1, 'Concept', 'Which experiment gave the strongest evidence that light behaves as a stream of particles (photons)?',
  ['the photoelectric effect', 'the diffraction of light through a slit', 'the refraction of light by a prism', 'the Davisson-Germer electron diffraction experiment', 'Rutherford’s gold foil experiment'],
  'The photoelectric effect (threshold frequency, no time delay, KE depending on frequency) is explained only if light comes in photons of energy hν (Einstein, 1905). Diffraction and refraction show WAVE behaviour; Davisson-Germer showed that ELECTRONS behave as waves; the gold foil experiment found the nucleus.',
  ['Which one needs light to come in packets?', 'Einstein won his Nobel Prize for explaining it.', 'Light knocking electrons out of a metal.']);

M(10, 2, 'Concept', 'Einstein’s explanation of the photoelectric effect gives the kinetic energy of an ejected electron as:',
  ['KE = hν − φ', 'KE = φ − hν', 'KE = hν + φ', 'KE = h(ν + ν₀)', 'KE = n·hν, where n is the light intensity'],
  'One photon of energy hν is absorbed by one electron. Part of it (the work function φ = hν₀) is used to free the electron from the metal; the rest becomes kinetic energy: KE = hν − φ. If hν is less than φ, no electron is ejected.',
  ['Energy in = energy to escape + energy left over.', 'Energy in = hν; energy to escape = φ.', 'Subtract the escape energy.']);

{
  const phi = 3.65e-19, lam = lamE(phi);
  N(10, 3, 'Calculation', 'The work function of sodium is 3.65 × 10⁻¹⁹ J. What is the LONGEST wavelength of light that can eject an electron from sodium? (Enter a number in nm.)',
    [`${F(lam * 1e9, 3)} nm`], lam * 1e9,
    `At threshold the photon energy equals φ: hc/λ₀ = φ, so λ₀ = hc/φ = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/(3.65 × 10⁻¹⁹) = ${E(lam, 3)} m = ${F(lam * 1e9, 3)} nm. Any longer wavelength has too little energy per photon.`,
    ['At threshold, E(photon) = φ.', 'λ₀ = hc/φ.', 'Convert m to nm.']);
}
{
  const phi = h * 1.10e15;
  N(10, 2, 'Calculation', 'The threshold frequency of a metal is 1.10 × 10¹⁵ Hz. What is its work function? (Enter a number in J.)',
    [`${E(phi, 3)} J`], phi,
    `φ = hν₀ = (6.626 × 10⁻³⁴ J·s)(1.10 × 10¹⁵ s⁻¹) = ${E(phi, 3)} J.`,
    ['The work function is the energy of a threshold photon.', 'φ = hν₀.', '6.626 × 10⁻³⁴ × 1.10 × 10¹⁵.']);
}
{
  const phi = 4.41e-19, en = Elam(300e-9), ke = en - phi;
  M(10, 3, 'Calculation', 'Light of 300. nm shines on a metal whose work function is 4.41 × 10⁻¹⁹ J. What is the maximum kinetic energy of an ejected electron?',
    [`${E(ke, 3)} J`, `${E(en, 3)} J`, `${E(en + phi, 3)} J`, `${E(phi - en, 3)} J`, `${E(phi, 3)} J`],
    `Photon energy: E = hc/λ = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/(3.00 × 10⁻⁷) = ${E(en, 3)} J. KE = hν − φ = ${E(en, 3)} − 4.41 × 10⁻¹⁹ = ${E(ke, 3)} J. Traps: stopping at the photon energy; adding φ; subtracting the wrong way (a negative KE is impossible); answering with φ.`,
    ['KE = (photon energy) − (work function).', 'Photon energy = hc/λ with λ in m.', `${E(en, 3)} − 4.41 × 10⁻¹⁹.`]);
}
{
  const phi = 3.65e-19, en = Elam(600e-9);
  M(10, 3, 'Concept', 'Sodium has a work function of 3.65 × 10⁻¹⁹ J. Will 600. nm light eject electrons from sodium?',
    [`No: each photon carries ${E(en, 3)} J, less than φ, and brightness cannot make up the difference`,
     `Yes: each photon carries ${E(en, 3)} J, more than φ`,
     'Yes, as long as the light is made bright enough',
     'No, because visible light can never eject electrons from any metal',
     `Yes: the electrons leave with ${E(en, 3)} J of kinetic energy`],
    `E(photon) = hc/λ = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/(6.00 × 10⁻⁷) = ${E(en, 3)} J, which is less than φ = 3.65 × 10⁻¹⁹ J. No single photon can free an electron, and intensity does not change photon energy. (Visible light CAN eject electrons from metals with small work functions - sodium’s threshold is about 544 nm.)`,
    ['Compare the photon energy with the work function.', 'E = hc/λ with λ = 6.00 × 10⁻⁷ m.', `E = ${E(en, 3)} J - bigger or smaller than φ?`]);
}
{
  const phi = 4.41e-19, en = Elam(250e-9), ke = en - phi, v = Math.sqrt(2 * ke / me);
  M(10, 4, 'Exam', 'Light of 250. nm strikes a metal with work function 4.41 × 10⁻¹⁹ J. What is the maximum speed of the ejected electrons? (mₑ = 9.109 × 10⁻³¹ kg; KE = ½mv²)',
    [`${E(v, 3)} m/s`, `${E(Math.sqrt(ke / me), 3)} m/s`, `${E(Math.sqrt(2 * en / me), 3)} m/s`, `${E(2 * ke / me, 3)} m/s`, `${E(Math.sqrt(2 * phi / me), 3)} m/s`],
    `E(photon) = hc/λ = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/(2.50 × 10⁻⁷) = ${E(en, 3)} J. KE = ${E(en, 3)} − 4.41 × 10⁻¹⁹ = ${E(ke, 3)} J. v = √(2KE/m) = √(2 × ${E(ke, 3)} / 9.109 × 10⁻³¹) = ${E(v, 3)} m/s. Traps: dropping the 2 gives ${E(Math.sqrt(ke / me), 3)}; forgetting to subtract φ gives ${E(Math.sqrt(2 * en / me), 3)}; forgetting the square root gives ${E(2 * ke / me, 3)}; using φ alone gives ${E(Math.sqrt(2 * phi / me), 3)}.`,
    ['Find the electron’s KE first.', 'KE = hc/λ − φ, then v = √(2KE/m).', `KE = ${E(ke, 3)} J.`]);
}
{
  const en = -bohr(1, 2), ke = en - 6.94e-19;
  M(10, 4, 'Exam', 'A hydrogen atom drops from n = 2 to n = 1 (Eₙ = −2.18 × 10⁻¹⁸ J/n²). The emitted photon strikes zinc, whose work function is 6.94 × 10⁻¹⁹ J. What is the maximum kinetic energy of the ejected electron?',
    [`${E(ke, 3)} J`, `${E(en, 3)} J`, `${E(en + 6.94e-19, 3)} J`, `${E(RB - 6.94e-19, 3)} J`, `${E(-ke, 3)} J`],
    `Photon energy = |ΔE| = 2.18 × 10⁻¹⁸ (1/1² − 1/2²) = 2.18 × 10⁻¹⁸ × 0.750 = ${E(en, 3)} J. KE = hν − φ = ${E(en, 3)} − 6.94 × 10⁻¹⁹ = ${E(ke, 3)} J. Traps: stopping at the photon energy; adding φ; using the ionization energy 2.18 × 10⁻¹⁸ J instead of the 2 → 1 gap; a negative KE is impossible.`,
    ['First find the energy of the photon from the Bohr levels.', '|ΔE| = 2.18 × 10⁻¹⁸ (1 − ¼).', 'Then subtract the work function.']);
}

/* ======================================================================
   LESSON 11 - Quantum Theory 2: atomic spectra and the Bohr model (7.2)
   ====================================================================== */
M(11, 1, 'Concept', 'White light from an incandescent bulb and light from a tube of excited hydrogen gas are each passed through a prism. What is observed?',
  ['a continuous spectrum from the bulb and a line spectrum from hydrogen',
   'a line spectrum from the bulb and a continuous spectrum from hydrogen',
   'line spectra from both sources',
   'continuous spectra from both sources',
   'a continuous spectrum from the bulb and no visible light from hydrogen'],
  'A hot filament emits all wavelengths, giving an unbroken rainbow (continuous spectrum). Excited hydrogen atoms emit only certain wavelengths, giving a few bright lines (a line spectrum) - in the visible, red 656 nm, blue-green 486 nm and violet 434 and 410 nm.',
  ['A glowing solid vs. isolated gas atoms.', 'Atoms emit only certain energies.', 'Rainbow vs. separate bright lines.']);

M(11, 1, 'Concept', 'Hydrogen’s emission spectrum consists of separate lines rather than a continuous rainbow because:',
  ['the electron can have only certain energies, so only certain photon energies are emitted',
   'hydrogen atoms emit light only when struck by light of one colour',
   'the prism absorbs most wavelengths before they reach the screen',
   'the electron radiates energy continuously as it spirals toward the nucleus',
   'each line comes from a different isotope of hydrogen'],
  'The electron’s energy is quantized. A photon is emitted only when the electron drops between two allowed levels, so E(photon) = ΔE can take only certain values, and each value is one line. A continuously spiralling electron (the classical picture) would give a continuous spectrum and the atom would collapse.',
  ['What is quantized inside the atom?', 'Each line = one allowed energy difference.', 'Only certain ΔE values exist.']);

M(11, 1, 'Concept', 'Each element has its own unique line spectrum, which is why flame tests and spectroscopy can identify elements. The reason is that:',
  ['each element’s atoms have their own set of allowed energy levels',
   'each element’s atoms have a different speed of light inside them',
   'heavier atoms always emit longer wavelengths',
   'only metals produce line spectra',
   'the colour depends only on the temperature of the flame'],
  'The allowed electron energies depend on the nuclear charge and the electrons present, so each element has a different set of energy differences, and therefore a different set of lines (a "fingerprint"). The flame’s temperature only supplies the energy to excite the atoms.',
  ['Lines come from energy differences between levels.', 'Different elements, different levels.', 'Different levels, different lines.']);

{
  const lam = ryd(2, 3);
  N(11, 2, 'Calculation', 'Use the Rydberg equation, 1/λ = R(1/n₁² − 1/n₂²) with R = 1.097 × 10⁷ m⁻¹, to find the wavelength of the line emitted when a hydrogen electron falls from n = 3 to n = 2. (Enter a number in nm.)',
    [`${F(lam * 1e9, 3)} nm`], lam * 1e9,
    `1/λ = 1.097 × 10⁷ (1/2² − 1/3²) = 1.097 × 10⁷ (0.2500 − 0.1111) = ${E(1 / lam, 4)} m⁻¹. λ = ${E(lam, 4)} m = ${F(lam * 1e9, 3)} nm - the red Balmer line.`,
    ['n₁ is the lower level (2), n₂ the upper (3).', '1/λ = R(1/4 − 1/9), then take the reciprocal.', `λ = ${E(lam, 3)} m.`]);
}
{
  const lam = ryd(2, 4), noSq = 1 / (RY * (1 / 2 - 1 / 4)), added = 1 / (RY * (1 / 4 + 1 / 16));
  M(11, 3, 'Calculation', 'Using 1/λ = R(1/n₁² − 1/n₂²), R = 1.097 × 10⁷ m⁻¹, find the wavelength of the photon emitted when a hydrogen electron falls from n = 4 to n = 2.',
    [`${F(lam * 1e9, 3)} nm`, `${F(noSq * 1e9, 3)} nm`, `${E(1 / lam, 3)} nm`, `${F(added * 1e9, 3)} nm`, `${E(lam, 3)} nm`],
    `1/λ = 1.097 × 10⁷ (1/4 − 1/16) = 1.097 × 10⁷ × 0.1875 = ${E(1 / lam, 4)} m⁻¹, so λ = ${E(lam, 4)} m = ${F(lam * 1e9, 3)} nm (blue-green Balmer line). Traps: not squaring n (1/2 − 1/4) gives ${F(noSq * 1e9, 3)} nm; reporting 1/λ as λ; adding the terms gives ${F(added * 1e9, 3)} nm; leaving metres labelled nm.`,
    ['Square the n values.', '1/λ = R(1/4 − 1/16); λ is the reciprocal.', `1/λ = ${E(1 / lam, 4)} m⁻¹.`]);
}
{
  const lam = ryd(1, 2), noSq = 1 / (RY * (1 - 1 / 2)), lim = 1 / RY;
  M(11, 3, 'Calculation', 'Using the Rydberg equation (R = 1.097 × 10⁷ m⁻¹), what is the wavelength of the photon emitted in hydrogen’s n = 2 → n = 1 transition, and in which region does it lie?',
    [`${F(lam * 1e9, 3)} nm, ultraviolet`, `${F(lam * 1e9, 3)} nm, infrared`, `${F(noSq * 1e9, 3)} nm, ultraviolet`, `${F(lim * 1e9, 3)} nm, ultraviolet`, `${F(ryd(2, 3) * 1e9, 3)} nm, visible`],
    `1/λ = 1.097 × 10⁷ (1/1² − 1/2²) = 1.097 × 10⁷ × 0.750 = ${E(1 / lam, 4)} m⁻¹. λ = ${F(lam * 1e9, 3)} nm, shorter than 400 nm, so ultraviolet. Every transition ending at n = 1 (Lyman series) is UV. Not squaring 2 gives ${F(noSq * 1e9, 3)} nm; using only the 1/1² term gives ${F(lim * 1e9, 3)} nm (that is the ionization limit); ${F(ryd(2, 3) * 1e9, 3)} nm is the 3 → 2 line.`,
    ['1/λ = R(1/1² − 1/2²).', 'Take the reciprocal and convert to nm.', 'Lines ending at n = 1 are beyond violet.']);
}
{
  const lam = ryd(3, 4);
  M(11, 3, 'Calculation', 'Using the Rydberg equation (R = 1.097 × 10⁷ m⁻¹), what is the wavelength of hydrogen’s n = 4 → n = 3 emission, and in which region does it lie?',
    [`${E(lam * 1e9, 3)} nm, infrared`, `${E(lam * 1e9, 3)} nm, ultraviolet`, `${F(ryd(2, 4) * 1e9, 3)} nm, visible`, `${F(ryd(2, 3) * 1e9, 3)} nm, visible`, `${E(1 / lam, 3)} m, radio`],
    `1/λ = 1.097 × 10⁷ (1/9 − 1/16) = ${E(1 / lam, 4)} m⁻¹, so λ = ${E(lam, 4)} m = ${E(lam * 1e9, 3)} nm. That is longer than red light (700 nm), so infrared - all lines ending at n = 3 (Paschen series) are IR. ${F(ryd(2, 4) * 1e9, 3)} nm is 4 → 2; ${F(ryd(2, 3) * 1e9, 3)} nm is 3 → 2; the last choice reports 1/λ as λ.`,
    ['n₁ = 3, n₂ = 4.', '1/λ = R(1/9 − 1/16).', 'Longer than 700 nm means…']);
}
M(11, 1, 'Concept', 'Hydrogen’s visible emission lines (the Balmer series) all come from transitions that:',
  ['end at n = 2', 'end at n = 1', 'end at n = 3', 'start at n = 2', 'start at n = 1'],
  'Drops ending at n = 1 (Lyman) are large and give UV photons; drops ending at n = 3 (Paschen) are small and give IR photons. Drops ending at n = 2 (Balmer: 3 → 2, 4 → 2, 5 → 2, 6 → 2) give the visible lines at 656, 486, 434 and 410 nm.',
  ['Emission = a drop; which level is it a drop TO?', 'n = 1 is UV, n = 3 is IR.', 'Balmer ends one level above the ground state.']);

M(11, 2, 'Concept', 'Which of the following is NOT one of the postulates of the Bohr model of the hydrogen atom?',
  ['The electron’s location is described only by a probability, not a fixed path',
   'The electron moves in circular orbits of fixed energy (stationary states)',
   'An electron in a stationary state does not radiate energy',
   'A photon is absorbed or emitted only when the electron moves between orbits',
   'The photon’s energy equals the energy difference between the two orbits'],
  'Bohr kept a definite circular orbit for the electron and added quantization: only certain orbits (energies) are allowed, the electron does not radiate while in one, and it absorbs or emits a photon of energy ΔE only when it changes orbit. Describing the electron by a probability (an orbital, ψ²) comes from the later quantum-mechanical model (Schrödinger, Heisenberg), which replaced Bohr’s fixed orbits.',
  ['Bohr still pictured a definite path.', 'Which choice sounds like Schrödinger, not Bohr?', 'Probability clouds came later.']);

M(11, 2, 'Concept', 'The main failure of the Bohr model is that it:',
  ['works only for one-electron species such as H, He⁺ and Li²⁺',
   'cannot explain why hydrogen has a line spectrum',
   'predicts a continuous spectrum for hydrogen',
   'gives the wrong wavelengths for hydrogen’s visible lines',
   'assumes the electron’s energy is quantized'],
  'The Bohr model reproduces hydrogen’s line spectrum very accurately, and quantized energy is its key success. But it ignores electron-electron repulsions, so it fails for any atom with more than one electron (even helium), and its fixed circular orbits were later shown to be wrong.',
  ['Where does the Bohr model work well?', 'It is exact for hydrogen.', 'What happens with a second electron?']);

M(11, 2, 'Trap', 'For which species can the Bohr model correctly predict the line spectrum?',
  ['Li²⁺', 'He', 'Li⁺', 'H⁻', 'H₂'],
  'The Bohr model works only for one-electron species. Li²⁺ has 3 − 2 = 1 electron. He has 2 electrons, Li⁺ has 2, H⁻ has 2, and H₂ has 2 (and is a molecule). Count electrons, not the element’s name.',
  ['Count the electrons in each species.', 'Electrons = Z − charge.', 'Which has exactly one electron?']);

{
  const e3 = -RB / 9;
  M(11, 2, 'Calculation', 'In the Bohr model, Eₙ = −2.18 × 10⁻¹⁸ J (1/n²). What is the energy of a hydrogen electron in the n = 3 level?',
    [`${E(e3, 3)} J`, `${E(-e3, 3)} J`, `${E(-RB / 3, 3)} J`, `${E(-RB * 9, 3)} J`, `${E(-RB * 3, 3)} J`],
    `E₃ = −2.18 × 10⁻¹⁸ J / 3² = −2.18 × 10⁻¹⁸ / 9 = ${E(e3, 3)} J. Bound energies are always negative (zero is the free electron). Dividing by 3 instead of 9 gives ${E(-RB / 3, 3)}; multiplying gives values more negative than the ground state, which is impossible.`,
    ['Plug n = 3 into Eₙ = −2.18 × 10⁻¹⁸/n².', 'Square n.', 'Divide by 9; keep the minus sign.']);
}
{
  const e4 = -RB / 16;
  N(11, 2, 'Calculation', 'Using Eₙ = −2.18 × 10⁻¹⁸ J (1/n²), what is the energy of a hydrogen electron in the n = 4 level? (Enter a number in J, with its sign.)',
    [`${E(e4, 3)} J`], e4,
    `E₄ = −2.18 × 10⁻¹⁸ / 4² = −2.18 × 10⁻¹⁸ / 16 = ${E(e4, 3)} J. The value is negative because the bound electron has less energy than a free one.`,
    ['n² = 16.', 'Keep the negative sign.', '−2.18 × 10⁻¹⁸ ÷ 16.']);
}
M(11, 1, 'Concept', 'In the Bohr model, the zero of energy (E = 0) corresponds to an electron that:',
  ['has been completely removed from the atom (n = ∞)',
   'is in the ground state, n = 1',
   'sits at the nucleus',
   'is in the level n = 0',
   'is moving at its maximum speed'],
  'Eₙ = −2.18 × 10⁻¹⁸ J/n² approaches 0 as n → ∞, which is the electron completely separated from the nucleus. Every bound level is negative, and n = 1 is the lowest (most negative). There is no n = 0 level.',
  ['What value does −2.18 × 10⁻¹⁸/n² approach as n grows?', 'n → ∞ means the electron is free.', 'Bound states are below zero.']);

M(11, 2, 'Trap', 'Which statement about a hydrogen electron in n = 1 compared with n = 2 is correct?',
  ['n = 1 is lower in energy, because −2.18 × 10⁻¹⁸ J is more negative than −5.45 × 10⁻¹⁹ J',
   'n = 2 is lower in energy, because 5.45 × 10⁻¹⁹ is the smaller number',
   'n = 2 is lower in energy, because it is farther from the nucleus',
   'They have the same energy, because the atom is the same',
   'n = 1 is higher in energy, because its energy has the larger magnitude'],
  'E₁ = −2.18 × 10⁻¹⁸ J and E₂ = −2.18 × 10⁻¹⁸/4 = −5.45 × 10⁻¹⁹ J. On a number line −2.18 × 10⁻¹⁸ is further below zero, so n = 1 is LOWER in energy (more stable). Comparing magnitudes and ignoring the minus sign gets this backwards.',
  ['These energies are negative.', 'More negative = lower energy.', 'The ground state is the lowest.']);

M(11, 2, 'Concept', 'As n increases in the hydrogen atom, the spacing between adjacent energy levels:',
  ['decreases, so the levels crowd together', 'increases', 'stays the same', 'doubles each time', 'depends on the intensity of the light'],
  'Eₙ ∝ −1/n². E₂ − E₁ = 0.75 × 2.18 × 10⁻¹⁸ J, E₃ − E₂ = 0.139 × 2.18 × 10⁻¹⁸ J, E₄ − E₃ = 0.049 × 2.18 × 10⁻¹⁸ J … the gaps shrink and the levels converge toward E = 0 at n = ∞.',
  ['Compute 1 − 1/4 and 1/4 − 1/9.', 'Compare the gaps.', 'They get smaller.']);

{
  const ie = RB, mol = RB * NA / 1000;
  N(11, 3, 'Calculation', 'Using Eₙ = −2.18 × 10⁻¹⁸ J (1/n²), what is the ionization energy of hydrogen atoms in the ground state, per MOLE of atoms? (Enter a number in kJ/mol.)',
    [`${E(mol, 3)} kJ/mol`], mol,
    `Ionizing from n = 1 to n = ∞: ΔE = −2.18 × 10⁻¹⁸ (1/∞² − 1/1²) = +2.18 × 10⁻¹⁸ J per atom. Per mole: × 6.022 × 10²³ = ${E(ie * NA, 4)} J/mol; ÷ 1000 = ${E(mol, 3)} kJ/mol (positive: energy must be supplied).`,
    ['Ionization: n = 1 → n = ∞.', 'Per atom: 2.18 × 10⁻¹⁸ J.', 'Multiply by 6.022 × 10²³, divide by 1000.']);
}
{
  const ie2 = RB / 4;
  M(11, 3, 'Trap', 'How much energy is needed to remove the electron from a hydrogen atom that is in the n = 2 level? (Eₙ = −2.18 × 10⁻¹⁸ J/n²)',
    [`${E(ie2, 3)} J`, `${E(RB, 3)} J`, `${E(RB / 2, 3)} J`, `${E(-bohr(1, 2), 3)} J`, `${E(-ie2, 3)} J`],
    `To ionize from n = 2: ΔE = E(∞) − E₂ = 0 − (−2.18 × 10⁻¹⁸/4) = +${E(ie2, 3)} J. 2.18 × 10⁻¹⁸ J is the ionization energy from n = 1; dividing by 2 instead of 4 forgets to square n; ${E(-bohr(1, 2), 3)} J is the 2 → 1 gap; the energy SUPPLIED is positive.`,
    ['Remove = go to n = ∞, where E = 0.', 'Energy needed = 0 − E₂.', 'E₂ = −2.18 × 10⁻¹⁸/4.']);
}
{
  const lam = lamE(RB / 4);
  N(11, 3, 'Calculation', 'What is the longest wavelength of light that can ionize a hydrogen atom whose electron is in n = 2? (Eₙ = −2.18 × 10⁻¹⁸ J/n²) (Enter a number in nm.)',
    [`${F(lam * 1e9, 3)} nm`], lam * 1e9,
    `Energy needed = 0 − E₂ = 2.18 × 10⁻¹⁸/4 = ${E(RB / 4, 3)} J per atom (one photon). λ = hc/E = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/(${E(RB / 4, 3)}) = ${E(lam, 3)} m = ${F(lam * 1e9, 3)} nm.`,
    ['First find the ionization energy from n = 2.', 'E = 2.18 × 10⁻¹⁸ / 4; then λ = hc/E.', 'Convert m to nm.']);
}
{
  const nu = RB / h;
  N(11, 3, 'Calculation', 'What is the minimum frequency of light that can ionize a ground-state hydrogen atom? (Eₙ = −2.18 × 10⁻¹⁸ J/n²) (Enter a number in Hz.)',
    [`${E(nu, 3)} Hz`], nu,
    `Ionization from n = 1 needs ΔE = +2.18 × 10⁻¹⁸ J per atom = one photon. ν = E/h = (2.18 × 10⁻¹⁸)/(6.626 × 10⁻³⁴) = ${E(nu, 3)} Hz (far ultraviolet).`,
    ['Ionization from n = 1 needs 2.18 × 10⁻¹⁸ J.', 'One photon supplies it: E = hν.', 'ν = 2.18 × 10⁻¹⁸ / 6.626 × 10⁻³⁴.']);
}
{
  const dE = bohr(1, 3);
  M(11, 3, 'Trap', 'What is ΔE for a hydrogen atom whose electron drops from n = 3 to n = 1? (Eₙ = −2.18 × 10⁻¹⁸ J/n²)',
    [`${E(dE, 3)} J`, `${E(-dE, 3)} J`, `${E(-RB * (1 - 1 / 3), 3)} J`, `${E(-RB / 9, 3)} J`, `${E(dE * NA, 3)} J`],
    `ΔE = E(final) − E(initial) = −2.18 × 10⁻¹⁸ (1/1² − 1/3²) = −2.18 × 10⁻¹⁸ (8/9) = ${E(dE, 3)} J. Negative: the atom loses energy and EMITS a photon of ${E(-dE, 3)} J. The positive value is the photon’s energy, not the atom’s ΔE; 1 − 1/3 forgets to square; ${E(-RB / 9, 3)} is just E₃; × N_A gives a per-mole value.`,
    ['ΔE = E(final) − E(initial).', 'E(final) = E₁ is more negative than E₃.', 'A drop gives a negative ΔE for the atom.']);
}
M(11, 2, 'Concept', 'A hydrogen atom absorbs a photon and its electron moves from n = 1 to n = 3. ΔE for the atom is:',
  ['positive, and equal to the energy of the absorbed photon',
   'negative, and equal to the energy of the absorbed photon',
   'positive, and larger than the energy of the absorbed photon',
   'zero, because energy is conserved',
   'negative, because n = 3 is farther from the nucleus'],
  'Moving up (1 → 3) raises the electron to a less negative level, so the atom GAINS energy: ΔE > 0. Conservation of energy means the atom gains exactly the photon’s energy, hν = ΔE. Emission (a drop) is the case with negative ΔE.',
  ['Up in n = up in energy.', 'Absorption: the atom takes in the photon.', 'ΔE(atom) = +E(photon).']);

M(11, 1, 'Concept', 'Which hydrogen transition involves ABSORPTION of a photon?',
  ['n = 2 → n = 5', 'n = 5 → n = 2', 'n = 3 → n = 1', 'n = 4 → n = 3', 'n = 6 → n = 2'],
  'An electron moves to a HIGHER level (larger n) only by absorbing a photon. 2 → 5 goes up. All the others go down (larger n to smaller n) and emit photons.',
  ['Absorbing energy moves the electron up.', 'Look for the final n that is larger.', 'Low n → high n.']);

{
  const dE = bohr(4, 2), lam = lamE(dE), nu = dE / h;
  M(11, 3, 'Calculation', 'A hydrogen electron is excited from n = 2 to n = 4 (Eₙ = −2.18 × 10⁻¹⁸ J/n²). What are ΔE for the atom and the wavelength of the absorbed photon?',
    [`+${E(dE, 3)} J; ${F(lam * 1e9, 3)} nm`, `${E(-dE, 3)} J; ${F(lam * 1e9, 3)} nm`, `+${E(dE, 3)} J; ${E(lam, 3)} nm`, `+${E(RB * 0.25, 3)} J; ${F(lamE(RB * 0.25) * 1e9, 3)} nm`, `+${E(dE, 3)} J; ${E(nu, 3)} nm`],
    `ΔE = −2.18 × 10⁻¹⁸ (1/4² − 1/2²) = −2.18 × 10⁻¹⁸ (0.0625 − 0.2500) = +${E(dE, 3)} J (positive: absorption). λ = hc/ΔE = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/(${E(dE, 3)}) = ${E(lam, 3)} m = ${F(lam * 1e9, 3)} nm. Traps: a negative sign means emission; not converting m to nm; not squaring n (1/2 − 1/4) gives ${E(RB * 0.25, 3)} J; ${E(nu, 3)} is the FREQUENCY in Hz.`,
    ['ΔE = E(final) − E(initial), final = 4.', 'Going up → positive ΔE.', 'λ = hc/ΔE, then m → nm.']);
}
{
  const R2 = 2.179e-18, dE = -R2 * (1 - 1 / 25), lam = h * c / -dE;
  M(11, 4, 'Worksheet', 'Week 7 recitation, Q8(a): An electron in a hydrogen atom falls from n = 5 to n = 1. Using Eₙ = −2.179 × 10⁻¹⁸ J (1/n²), what is the wavelength of the emitted photon?',
    [`${F(lam * 1e9, 3)} nm`, `${E(h * c / (-dE * NA) * 1e9, 3)} nm`, `${F(h * c / (R2 * (1 - 1 / 5)) * 1e9, 3)} nm`, `${F(h * c / (R2 * (1 / 4 - 1 / 25)) * 1e9, 3)} nm`, `${E(lam, 3)} nm`],
    `ΔE(atom) = −2.179 × 10⁻¹⁸ (1/1² − 1/5²) = −2.179 × 10⁻¹⁸ (0.96) = ${E(dE, 4)} J (negative: emission). The photon carries |ΔE| = ${E(-dE, 4)} J. λ = hc/|ΔE| = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/(${E(-dE, 4)}) = ${E(lam, 3)} m = ${F(lam * 1e9, 3)} nm (ultraviolet, Lyman series). Do NOT bring Avogadro’s number into λ: λ comes from ONE photon from ONE atom; using the per-mole energy gives ${E(h * c / (-dE * NA) * 1e9, 3)} nm. Not squaring n gives ${F(h * c / (R2 * (1 - 1 / 5)) * 1e9, 3)} nm; ending at n = 2 gives ${F(h * c / (R2 * (1 / 4 - 1 / 25)) * 1e9, 3)} nm.`,
    ['ΔE = −2.179 × 10⁻¹⁸ (1/1² − 1/5²) for ONE atom.', 'λ = hc/|ΔE| - no Avogadro’s number here.', `|ΔE| = ${E(-dE, 4)} J; convert λ to nm.`]);
}
{
  const R2 = 2.179e-18, dE = -R2 * (1 - 1 / 25), mol = dE * NA;
  M(11, 4, 'Worksheet', 'Week 7 recitation, Q8(b): For the same n = 5 → n = 1 transition (Eₙ = −2.179 × 10⁻¹⁸ J/n²), what is the energy change of the atoms, in joules, for ONE MOLE of hydrogen atoms?',
    [`${E(mol, 4)} J`, `${E(dE, 4)} J`, `${E(-mol, 4)} J`, `${E(mol / 1000, 4)} J`, `${E(-R2 * NA, 4)} J`],
    `Per atom: ΔE = −2.179 × 10⁻¹⁸ (1 − 1/25) = ${E(dE, 4)} J. Per mole: × 6.022 × 10²³ atoms/mol = ${E(mol, 4)} J (= ${F(mol / 1000, 4)} kJ). Negative because energy is emitted. ${E(dE, 4)} J is ONE atom; the positive value has the wrong sign for emission; ${E(mol / 1000, 4)} is the kJ number labelled J; ${E(-R2 * NA, 4)} J ignores the 1/25 term (that is ionization from n = 1).`,
    ['First get ΔE for one atom.', 'Then multiply by Avogadro’s number.', 'Emission → keep the negative sign.']);
}
{
  const dE = bohr(2, 6), lam = lamE(-dE);
  M(11, 4, 'Trap', 'A hydrogen electron drops from n = 6 to n = 2 (Eₙ = −2.18 × 10⁻¹⁸ J/n²). What is the wavelength of the emitted photon?',
    [`${F(lam * 1e9, 3)} nm`, `${E(lamE(-dE * NA) * 1e9, 3)} nm`, `${F(lamE(RB * (1 / 2 - 1 / 6)) * 1e9, 3)} nm`, `${F(lamE(-bohr(1, 6)) * 1e9, 3)} nm`, `${E(lam, 3)} nm`],
    `ΔE = −2.18 × 10⁻¹⁸ (1/2² − 1/6²) = −2.18 × 10⁻¹⁸ (0.2500 − 0.02778) = ${E(dE, 3)} J. λ = hc/|ΔE| = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/(${E(-dE, 3)}) = ${E(lam, 3)} m = ${F(lam * 1e9, 3)} nm (the violet Balmer line). Traps: multiplying by N_A before finding λ gives ${E(lamE(-dE * NA) * 1e9, 3)} nm - λ is per photon; not squaring n gives ${F(lamE(RB * (1 / 2 - 1 / 6)) * 1e9, 3)} nm; using n = 1 as the final level gives ${F(lamE(-bohr(1, 6)) * 1e9, 3)} nm; leaving metres gives ${E(lam, 3)}.`,
    ['λ needs the energy of ONE photon.', '|ΔE| = 2.18 × 10⁻¹⁸ (1/4 − 1/36).', 'λ = hc/|ΔE|; m → nm.']);
}
{
  const dE = bohr(1, 4), lam = lamE(-dE);
  N(11, 3, 'Exam', 'What is the wavelength of the photon emitted when a hydrogen electron falls from n = 4 to n = 1? (Eₙ = −2.18 × 10⁻¹⁸ J/n²) (Enter a number in nm.)',
    [`${F(lam * 1e9, 3)} nm`], lam * 1e9,
    `|ΔE| = 2.18 × 10⁻¹⁸ (1/1² − 1/4²) = 2.18 × 10⁻¹⁸ × 0.9375 = ${E(-dE, 3)} J per atom. λ = hc/|ΔE| = ${E(lam, 3)} m = ${F(lam * 1e9, 3)} nm (UV).`,
    ['Per-atom ΔE first.', '|ΔE| = 2.18 × 10⁻¹⁸ (1 − 1/16).', 'λ = hc/|ΔE|, in nm.']);
}
{
  const dE = bohr(1, 4), mol = -dE * NA / 1000;
  N(11, 3, 'Exam', 'How much energy is released when one MOLE of hydrogen atoms undergoes the n = 4 → n = 1 transition? (Eₙ = −2.18 × 10⁻¹⁸ J/n²) (Enter a positive number in kJ.)',
    [`${E(mol, 3)} kJ`], mol,
    `Per atom: ΔE = −2.18 × 10⁻¹⁸ (1 − 1/16) = ${E(dE, 3)} J. Per mole: × 6.022 × 10²³ = ${E(dE * NA, 3)} J = ${E(-mol, 3)} kJ. "Released" means the magnitude: ${E(mol, 3)} kJ.`,
    ['Find ΔE for one atom.', 'Multiply by 6.022 × 10²³ atoms.', 'Convert J to kJ and report the amount released.']);
}
{
  const mol = bohr(2, 1) * NA / 1000;
  N(11, 4, 'Trap', 'How much energy must be absorbed to excite one MOLE of ground-state hydrogen atoms to n = 2? (Eₙ = −2.18 × 10⁻¹⁸ J/n²) (Enter a number in kJ.)',
    [`${F(mol, 3)} kJ`], mol,
    `Per atom: ΔE = −2.18 × 10⁻¹⁸ (1/2² − 1/1²) = +${E(bohr(2, 1), 3)} J. Per mole: × 6.022 × 10²³ = ${E(mol * 1000, 3)} J = ${F(mol, 3)} kJ. (Not 1310 kJ - that would be ionization all the way to n = ∞.)`,
    ['ΔE per atom for 1 → 2.', '2.18 × 10⁻¹⁸ × 0.75, positive for absorption.', 'Then × N_A and ÷ 1000.']);
}
M(11, 3, 'Concept', 'Which hydrogen transition releases the MOST energy?',
  ['n = 3 → n = 1', 'n = 6 → n = 2', 'n = 2 → n = 1', 'n = 4 → n = 2', 'n = ∞ → n = 2'],
  '|ΔE| ∝ (1/n_low² − 1/n_high²). 3 → 1: 1 − 1/9 = 0.889; 2 → 1: 0.750; ∞ → 2: 0.250; 6 → 2: 0.222; 4 → 2: 0.1875. Drops that end at n = 1 dwarf drops that end at n = 2 - even from n = ∞ - because the levels crowd together at high n.',
  ['Compute (1/n_final² − 1/n_initial²) for each.', 'Drops to n = 1 are the biggest.', 'Among drops to n = 1, a higher start releases more.']);

M(11, 3, 'Concept', 'Which hydrogen emission produces the photon with the SHORTEST wavelength?',
  ['n = 6 → n = 2', 'n = 3 → n = 2', 'n = 4 → n = 2', 'n = 5 → n = 3', 'n = 7 → n = 4'],
  'Shortest wavelength = largest energy gap. 6 → 2: 1/4 − 1/36 = 0.222; 4 → 2: 0.1875; 3 → 2: 0.139; 5 → 3: 0.0711; 7 → 4: 0.0421. So 6 → 2 (410 nm, violet) has the largest ΔE and the shortest λ.',
  ['Short λ = big ΔE.', 'Compare 1/n_low² − 1/n_high².', 'The lowest final level and the highest start win.']);

M(11, 2, 'Concept', 'Which hydrogen emission produces a photon of VISIBLE light?',
  ['n = 4 → n = 2', 'n = 2 → n = 1', 'n = 5 → n = 3', 'n = 3 → n = 1', 'n = 6 → n = 4'],
  'Visible hydrogen lines are the Balmer series, ending at n = 2: 4 → 2 gives 486 nm. Drops ending at n = 1 (2 → 1, 3 → 1) are ultraviolet; drops ending at n = 3 or 4 (5 → 3, 6 → 4) are infrared.',
  ['Which final level gives visible light?', 'Balmer = ends at n = 2.', 'Find the transition ending at 2.']);

M(11, 3, 'Concept', 'Rank these hydrogen emission lines in order of INCREASING wavelength: (i) 2 → 1, (ii) 3 → 2, (iii) 4 → 3.',
  ['(i) < (ii) < (iii)', '(iii) < (ii) < (i)', '(ii) < (i) < (iii)', '(i) < (iii) < (ii)', '(ii) < (iii) < (i)'],
  'Gaps (× 2.18 × 10⁻¹⁸ J): 2 → 1 is 0.750 (122 nm, UV); 3 → 2 is 0.139 (656 nm, red); 4 → 3 is 0.0486 (1875 nm, IR). Largest energy = shortest wavelength, so increasing λ: 2 → 1 < 3 → 2 < 4 → 3. The reversed order, (iii) < (ii) < (i), ranks them by increasing ENERGY - read which property the stem asks for.',
  ['Find |ΔE| for each.', 'Increasing λ = decreasing energy.', 'The biggest gap goes first.']);

M(11, 4, 'Trap', 'Which transition in a hydrogen atom ABSORBS the highest-energy photon?',
  ['n = 1 → n = 3', 'n = 4 → n = 1', 'n = 1 → n = 2', 'n = 2 → n = 6', 'n = 3 → n = 5'],
  'Absorption means going UP. Of the upward jumps: 1 → 3 needs 2.18 × 10⁻¹⁸(1 − 1/9) = 0.889 units; 1 → 2 needs 0.750; 2 → 6 needs 0.222; 3 → 5 needs 0.071. n = 4 → n = 1 has an even bigger gap (0.9375), but it is a DROP, so it EMITS a photon - read the direction.',
  ['First discard any transition that goes down.', 'Then compare (1/n_low² − 1/n_high²).', 'Biggest upward jump wins.']);

M(11, 4, 'Exam', 'A sample of hydrogen atoms is excited so that electrons sit in n = 4. Counting every possible downward transition (directly or in steps), how many different emission lines can the sample produce?',
  ['6', '3', '4', '10', '1'],
  'Every pair of levels among n = 1, 2, 3, 4 gives one line: 4→3, 4→2, 4→1, 3→2, 3→1, 2→1 = 6 lines (the number of pairs is 4 × 3/2 = 6). 3 counts only drops of one level at a time from n = 4; 10 would need n = 5.',
  ['List every pair of levels from 1 to 4.', 'Start with drops from 4, then from 3, then from 2.', '3 + 2 + 1.']);

{
  const x = 1 / (102.6e-9 * RY), n2 = 1 / (1 - x);
  if (Math.abs(n2 - 9) > 0.2) throw new Error('102.6 nm check ' + n2);
  M(11, 4, 'Exam', 'A ground-state hydrogen atom absorbs a photon of wavelength 102.6 nm. To which level is the electron excited? (1/λ = R(1/n₁² − 1/n₂²), R = 1.097 × 10⁷ m⁻¹)',
    ['n = 3', 'n = 2', 'n = 4', 'n = 5', 'n = 6'],
    `1/λ = 1/(1.026 × 10⁻⁷ m) = ${E(1 / 102.6e-9, 4)} m⁻¹. Divide by R: ${E(1 / 102.6e-9, 4)}/1.097 × 10⁷ = ${F(x, 4)} = 1/1² − 1/n₂². So 1/n₂² = 1 − ${F(x, 4)} = ${F(1 - x, 3)} → n₂² = ${F(n2, 3)} ≈ 9 → n₂ = 3.`,
    ['n₁ = 1 (ground state); solve for n₂.', '1/n₂² = 1 − 1/(λR).', 'n₂² comes out close to a perfect square.']);
}
{
  const x = 1 / (434e-9 * RY), inv = 0.25 - x, n2 = 1 / inv;
  if (Math.abs(n2 - 25) > 0.3) throw new Error('434 nm check ' + n2);
  M(11, 4, 'Exam', 'One of hydrogen’s visible (Balmer, n₁ = 2) emission lines is at 434 nm. From which level did the electron fall? (1/λ = R(1/n₁² − 1/n₂²), R = 1.097 × 10⁷ m⁻¹)',
    ['n = 5', 'n = 3', 'n = 4', 'n = 6', 'n = 7'],
    `1/λ = 1/(4.34 × 10⁻⁷ m) = ${E(1 / 434e-9, 4)} m⁻¹; ÷ R = ${F(x, 4)} = 1/4 − 1/n₂². 1/n₂² = 0.2500 − ${F(x, 4)} = ${F(inv, 3)} → n₂² = ${F(n2, 3)} ≈ 25 → n₂ = 5. (Check: 3 → 2 is 656 nm, 4 → 2 is 486 nm, 6 → 2 is 410 nm.)`,
    ['Balmer: the lower level is n = 2.', '1/n₂² = 1/4 − 1/(λR).', 'n₂² ≈ 25.']);
}
{
  const ie = RB * 4;
  M(11, 3, 'Exam', 'For a one-electron ion, Eₙ = −2.18 × 10⁻¹⁸ J (Z²/n²). What is the ionization energy of a ground-state He⁺ ion (Z = 2)?',
    [`${E(ie, 3)} J`, `${E(RB, 3)} J`, `${E(RB * 2, 3)} J`, `${E(RB * 9, 3)} J`, `${E(RB / 4, 3)} J`],
    `He⁺ has one electron, so the Bohr formula applies with Z = 2: E₁ = −2.18 × 10⁻¹⁸ × 2²/1² = ${E(-ie, 3)} J. Ionization energy = 0 − E₁ = ${E(ie, 3)} J, four times hydrogen’s. Ignoring Z gives hydrogen’s value; using Z instead of Z² gives ${E(RB * 2, 3)}; Z = 3 (Li²⁺) gives ${E(RB * 9, 3)}; dividing by Z² gives ${E(RB / 4, 3)}.`,
    ['He⁺ is hydrogen-like: one electron.', 'Multiply by Z², not Z.', '2.18 × 10⁻¹⁸ × 4.']);
}
{
  const dE = RB * 9 * 0.75, lam = lamE(dE);
  M(11, 4, 'Exam', 'For one-electron ions Eₙ = −2.18 × 10⁻¹⁸ J (Z²/n²). What is the wavelength of the photon emitted when Li²⁺ (Z = 3) falls from n = 2 to n = 1?',
    [`${F(lam * 1e9, 3)} nm`, `${F(lamE(RB * 0.75) * 1e9, 3)} nm`, `${F(lamE(RB * 3 * 0.75) * 1e9, 3)} nm`, `${F(lamE(RB * 4 * 0.75) * 1e9, 3)} nm`, `${E(lam, 3)} nm`],
    `|ΔE| = 2.18 × 10⁻¹⁸ × 3² × (1/1² − 1/2²) = 2.18 × 10⁻¹⁸ × 9 × 0.750 = ${E(dE, 3)} J. λ = hc/|ΔE| = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/(${E(dE, 3)}) = ${E(lam, 3)} m = ${F(lam * 1e9, 3)} nm, one ninth of hydrogen’s 2 → 1 line. Ignoring Z gives ${F(lamE(RB * 0.75) * 1e9, 3)} nm (hydrogen); Z instead of Z² gives ${F(lamE(RB * 3 * 0.75) * 1e9, 3)} nm; Z = 2 (He⁺) gives ${F(lamE(RB * 4 * 0.75) * 1e9, 3)} nm.`,
    ['Li²⁺ has one electron: Bohr applies with Z = 3.', '|ΔE| = 2.18 × 10⁻¹⁸ × 9 × (1 − ¼).', 'λ = hc/|ΔE|, in nm.']);
}

/* ======================================================================
   LESSON 12 - Quantum Theory 3: matter waves, uncertainty, quantum numbers (7.3-7.4)
   ====================================================================== */
{
  const m = 9.11e-31, v = 2e6, lam = h / (m * v);
  M(12, 3, 'Worksheet', 'Week 7 recitation, Q5(a): An electron (mass 9.11 × 10⁻³¹ kg) moves at 2 × 10⁶ m/s. What is its de Broglie wavelength?',
    [`${F(lam / 1e-10, 2)} × 10⁻¹⁰ m`, `${E(h / (m * 1e-3 * v), 2)} m`, `${E(h / m, 2)} m`, `${E(h / (4 * PI * m * v), 2)} m`, `${E(h / (m * v * v), 2)} m`],
    `λ = h/(mv) = (6.626 × 10⁻³⁴ J·s)/[(9.11 × 10⁻³¹ kg)(2 × 10⁶ m/s)] = ${E(lam, 4)} m ≈ ${F(lam / 1e-10, 2)} × 10⁻¹⁰ m - about the size of an atom, which is why electrons diffract from crystals. (J·s/(kg·m/s) = m.) Traps: dividing the mass by 1000 as if it were in grams gives ${E(h / (m * 1e-3 * v), 2)} m; forgetting v gives ${E(h / m, 2)}; using h/4π gives ${E(h / (4 * PI * m * v), 2)}; squaring v (mixing in KE = ½mv²) gives ${E(h / (m * v * v), 2)}. Report in proper scientific notation.`,
    ['de Broglie: λ = h/(mv).', 'The mass is already in kg; v in m/s.', '6.626 × 10⁻³⁴ ÷ (9.11 × 10⁻³¹ × 2 × 10⁶).']);
}
M(12, 2, 'Worksheet', 'Week 7 recitation, Q5(b): If the electron moved twice as fast, its de Broglie wavelength would:',
  ['decrease (be halved)', 'increase (double)', 'stay the same', 'decrease to one quarter', 'increase fourfold'],
  'λ = h/(mv): wavelength is inversely proportional to speed. Doubling v doubles the momentum mv and halves λ. Faster (or heavier) means a SHORTER wavelength. (One quarter would require λ ∝ 1/v², which is the KE formula, not de Broglie.)',
  ['λ = h/(mv).', 'v is in the denominator.', 'Double the denominator → half the value.']);

{
  const lam = h / (me * 5.00e6);
  N(12, 3, 'Calculation', 'What is the de Broglie wavelength of an electron (mₑ = 9.109 × 10⁻³¹ kg) moving at 5.00 × 10⁶ m/s? (Enter a number in m.)',
    [`${E(lam, 3)} m`], lam,
    `λ = h/(mv) = (6.626 × 10⁻³⁴)/[(9.109 × 10⁻³¹)(5.00 × 10⁶)] = ${E(lam, 3)} m (${F(lam * 1e9, 3)} nm).`,
    ['λ = h/(mv).', 'Use kg and m/s.', '6.626 × 10⁻³⁴ ÷ 4.55 × 10⁻²⁴.']);
}
{
  const mn = 1.675e-27, v = 3.00e3, lam = h / (mn * v);
  M(12, 3, 'Calculation', 'A neutron (mass 1.675 × 10⁻²⁷ kg) moves at 3.00 × 10³ m/s. What is its de Broglie wavelength?',
    [`${E(lam, 3)} m`, `${E(h / (me * v), 3)} m`, `${E(h / mn, 3)} m`, `${E(h / (4 * PI * mn * v), 3)} m`, `${E(h / (mn * 1e-3 * v), 3)} m`],
    `λ = h/(mv) = (6.626 × 10⁻³⁴)/[(1.675 × 10⁻²⁷)(3.00 × 10³)] = ${E(lam, 3)} m (about 0.13 nm, so slow neutrons diffract from crystals). Using the electron mass gives ${E(h / (me * v), 3)}; forgetting v gives ${E(h / mn, 3)}; h/4π belongs to the uncertainty principle; dividing the kg mass by 1000 gives ${E(h / (mn * 1e-3 * v), 3)}.`,
    ['λ = h/(mv).', 'm = 1.675 × 10⁻²⁷ kg, v = 3.00 × 10³ m/s.', 'Product mv = 5.03 × 10⁻²⁴ kg·m/s.']);
}
{
  const lam = h / (0.142 * 40.0);
  M(12, 4, 'Trap', 'A 142 g baseball is thrown at 40.0 m/s. What is its de Broglie wavelength, and can it be observed?',
    [`${E(lam, 3)} m, far too small to detect`, `${E(h / (142 * 40.0), 3)} m, far too small to detect`, `${E(lam, 3)} m, about the size of an atom`, `${E(h / 0.142, 3)} m, far too small to detect`, `${E(0.142 * 40.0 / h, 3)} m, far larger than the stadium`],
    `Convert grams: 142 g = 0.142 kg. λ = h/(mv) = (6.626 × 10⁻³⁴)/[(0.142)(40.0)] = ${E(lam, 3)} m - about 10¹⁹ times smaller than a nucleus (~10⁻¹⁵ m), so the wave nature of everyday objects is unobservable. Using 142 (grams) gives ${E(h / (142 * 40.0), 3)}; forgetting v gives ${E(h / 0.142, 3)}; mv/h inverts the formula. An atom is about 10⁻¹⁰ m.`,
    ['Mass must be in kg.', 'λ = h/(mv).', 'Compare the result with an atom (~10⁻¹⁰ m).']);
}
{
  const mp = 1.673e-27, v = 0.0100 * c, lam = h / (mp * v);
  M(12, 3, 'Calculation', 'A proton (mass 1.673 × 10⁻²⁷ kg) moves at 1.00% of the speed of light. What is its de Broglie wavelength?',
    [`${E(lam, 3)} m`, `${E(h / (mp * c), 3)} m`, `${E(h / (me * v), 3)} m`, `${E(h / (4 * PI * mp * v), 3)} m`, `${E(h / (mp * 1.00 * c / 1e4), 3)} m`],
    `v = 0.0100 × 2.998 × 10⁸ = ${E(v, 4)} m/s. λ = h/(mv) = (6.626 × 10⁻³⁴)/[(1.673 × 10⁻²⁷)(${E(v, 4)})] = ${E(lam, 3)} m. Using the full speed of light gives ${E(h / (mp * c), 3)}; using the electron mass gives ${E(h / (me * v), 3)}; h/4π is for uncertainty; treating 1.00% as 1.00 × 10⁻⁴ gives ${E(h / (mp * 1.00 * c / 1e4), 3)}.`,
    ['1.00% of c = 0.0100 × 2.998 × 10⁸ m/s.', 'λ = h/(mv).', `v = ${E(v, 4)} m/s.`]);
}
{
  const v = h / (me * 0.100e-9);
  N(12, 3, 'Calculation', 'At what speed must an electron (mₑ = 9.109 × 10⁻³¹ kg) travel to have a de Broglie wavelength of 0.100 nm? (Enter a number in m/s.)',
    [`${E(v, 3)} m/s`], v,
    `Rearrange λ = h/(mv): v = h/(mλ) = (6.626 × 10⁻³⁴)/[(9.109 × 10⁻³¹)(1.00 × 10⁻¹⁰ m)] = ${E(v, 3)} m/s.`,
    ['Solve λ = h/(mv) for v.', 'v = h/(mλ), with λ in metres.', '0.100 nm = 1.00 × 10⁻¹⁰ m.']);
}
M(12, 2, 'Concept', 'All of the following move at the same speed. Which has the LONGEST de Broglie wavelength?',
  ['an electron', 'a proton', 'a neutron', 'an alpha particle', 'a baseball'],
  'λ = h/(mv). At equal speed, λ is inversely proportional to mass, so the lightest particle has the longest wavelength. The electron is about 1/1836 the mass of a proton or neutron, and far lighter than an alpha particle or a baseball.',
  ['λ = h/(mv) with v fixed.', 'Smaller mass → longer λ.', 'Which is lightest?']);

M(12, 4, 'Trap', 'Each of these particles has the SAME de Broglie wavelength. Which one is moving fastest?',
  ['an electron', 'a proton', 'a neutron', 'an alpha particle', 'a hydrogen atom'],
  'Same λ means the same momentum, mv = h/λ. For a fixed product mv, the lightest particle must have the largest speed. The electron is by far the lightest, so it moves fastest (about 1836 times faster than a proton).',
  ['Same λ → same mv.', 'If mv is fixed, small m needs large v.', 'Find the lightest particle.']);

{
  const mp = 1.673e-27, r = mp / me;
  M(12, 3, 'Calculation', 'An electron (9.109 × 10⁻³¹ kg) and a proton (1.673 × 10⁻²⁷ kg) travel at the same speed. How do their de Broglie wavelengths compare?',
    [`the electron’s is about ${F(r, 3)} times longer`, `the proton’s is about ${F(r, 3)} times longer`, 'they are equal, because the speeds are equal', `the electron’s is about ${F(Math.sqrt(r), 2)} times longer`, `the electron’s is about ${F(r * r, 2)} times longer`],
    `λ = h/(mv), so at equal v, λ(e)/λ(p) = m(p)/m(e) = (1.673 × 10⁻²⁷)/(9.109 × 10⁻³¹) = ${F(r, 4)}. The lighter electron has the LONGER wavelength. The ratio is the mass ratio itself - not its square root or square.`,
    ['Write λ = h/(mv) for each and divide.', 'h and v cancel; the masses remain.', 'λ(e)/λ(p) = m(p)/m(e).']);
}
{
  const ra = 2 * 0.5;
  M(12, 4, 'Trap', 'Particle A has twice the mass of particle B but moves at half B’s speed. What is λ(A)/λ(B)?',
    ['1', '2', '1/2', '4', '1/4'],
    `λ = h/(mv). For A: mv = (2m)(v/2) = mv, the same momentum as B. Same momentum → same wavelength: λ(A)/λ(B) = ${ra}. The doubled mass and halved speed cancel exactly.`,
    ['λ depends on the product mv.', 'Compute (2m)(½v).', 'Same momentum, same λ.']);
}
M(12, 1, 'Concept', 'The Davisson-Germer experiment, in which a beam of electrons striking a nickel crystal produced a diffraction pattern, showed that:',
  ['electrons have wave properties', 'light consists of photons', 'the atom has a small, dense nucleus', 'electron energies are quantized in circular orbits', 'electrons have a negative charge'],
  'Diffraction is a wave behaviour. When electrons diffracted from the regularly spaced atoms of a crystal - just as X-rays do - it confirmed de Broglie’s prediction that matter has a wavelength, λ = h/(mv). The photon idea came from the photoelectric effect, the nucleus from Rutherford, the charge from Thomson and Millikan.',
  ['Diffraction is a signature of what kind of behaviour?', 'Electrons acted like X-rays hitting a crystal.', 'Matter waves.']);

M(12, 1, 'Concept', 'Wave-particle duality means that:',
  ['both light and matter show wave properties and particle properties',
   'light is a wave and matter is made of particles, never the reverse',
   'only electrons can behave as both waves and particles',
   'an object is a wave when moving and a particle when at rest',
   'large objects show wave behaviour more strongly than small ones'],
  'Light shows wave behaviour (diffraction, interference) and particle behaviour (photons in the photoelectric effect). Matter shows particle behaviour (mass, collisions) and wave behaviour (electron diffraction, λ = h/mv). Wave behaviour is only noticeable for very small masses - large objects have immeasurably small wavelengths.',
  ['Photons for light; λ = h/mv for matter.', 'Both kinds of behaviour apply to both.', 'Energy and matter are not as different as classical physics said.']);

M(12, 2, 'Concept', 'Why do we never notice the wave nature of a thrown baseball?',
  ['its wavelength is far smaller than any object or opening it could diffract through',
   'baseballs have no wavelength because they are not charged',
   'its wavelength is too long to fit in a stadium',
   'only objects moving near the speed of light have wavelengths',
   'its wave nature is cancelled by air resistance'],
  'λ = h/(mv) with a large mass gives a wavelength around 10⁻³⁴ m, about 10¹⁹ times smaller than a nucleus (~10⁻¹⁵ m). Diffraction needs an opening comparable to λ, and nothing that small exists, so the wave behaviour is real but unobservable. Charge and speed near c are irrelevant.',
  ['Estimate λ = h/(mv) for m ≈ 0.1 kg.', 'Diffraction needs a gap comparable to λ.', 'λ ≈ 10⁻³⁴ m.']);

M(12, 1, 'Concept', 'The Heisenberg uncertainty principle states that:',
  ['the position and the momentum (speed) of a particle cannot both be known precisely at the same time',
   'the energy of an electron can never be measured',
   'electrons move in circular orbits whose radius is uncertain',
   'an electron’s position is uncertain only because instruments are imprecise',
   'the uncertainty in position always equals the uncertainty in speed'],
  'Δx · mΔv ≥ h/4π: the more precisely the position is fixed (small Δx), the less precisely the momentum can be known, and vice versa. It is a property of nature, not a limit of instruments, and it is why the quantum model gives probabilities (orbitals), not definite orbits.',
  ['It is about pairs of quantities.', 'Δx · mΔv ≥ h/4π.', 'Position and momentum.']);

{
  const dv = 0.0100 * 5.00e6, dx = h / (4 * PI * me * dv);
  N(12, 3, 'Calculation', 'An electron (mₑ = 9.109 × 10⁻³¹ kg) moves at 5.00 × 10⁶ m/s, with its speed known to within 1.00%. What is the minimum uncertainty in its position? (Δx·mΔv ≥ h/4π) (Enter a number in m.)',
    [`${E(dx, 3)} m`], dx,
    `Δv = 1.00% of 5.00 × 10⁶ = ${E(dv, 3)} m/s. Δx ≥ h/(4π m Δv) = (6.626 × 10⁻³⁴)/[4π (9.109 × 10⁻³¹)(${E(dv, 3)})] = ${E(dx, 3)} m - about ten times the size of an atom, so the electron cannot be located within the atom.`,
    ['Δv is the uncertainty, not the speed: 1.00% of 5.00 × 10⁶.', 'Δx = h/(4π m Δv).', `Δv = ${E(dv, 3)} m/s.`]);
}
{
  const dx = h / (4 * PI * 0.142 * 0.100);
  M(12, 4, 'Trap', 'The speed of a 142 g baseball is known to within ±0.100 m/s. What is the minimum uncertainty in its position? (Δx·mΔv ≥ h/4π)',
    [`${E(dx, 3)} m`, `${E(h / (0.142 * 0.100), 3)} m`, `${E(h / (4 * PI * 142 * 0.100), 3)} m`, `${E(h / (2 * PI * 0.142 * 0.100), 3)} m`, `${E(h / (4 * PI * 0.142), 3)} m`],
    `Δx ≥ h/(4π m Δv) = (6.626 × 10⁻³⁴)/[4π (0.142 kg)(0.100 m/s)] = ${E(dx, 3)} m - negligible, so the uncertainty principle does not matter for everyday objects. Leaving out 4π gives ${E(h / (0.142 * 0.100), 3)}; mass in grams gives ${E(h / (4 * PI * 142 * 0.100), 3)}; 2π instead of 4π gives ${E(h / (2 * PI * 0.142 * 0.100), 3)}; leaving out Δv gives ${E(h / (4 * PI * 0.142), 3)}.`,
    ['Mass in kg; the formula has 4π.', 'Δx = h/(4π m Δv).', '6.626 × 10⁻³⁴ ÷ (4π × 0.142 × 0.100).']);
}
{
  const dv = h / (4 * PI * me * 1.00e-10);
  M(12, 4, 'Exam', 'An electron (mₑ = 9.109 × 10⁻³¹ kg) is confined to a region 1.00 × 10⁻¹⁰ m wide (about one atom). What is the minimum uncertainty in its speed? (Δx·mΔv ≥ h/4π)',
    [`${E(dv, 3)} m/s`, `${E(h / (me * 1.00e-10), 3)} m/s`, `${E(h / (2 * PI * me * 1.00e-10), 3)} m/s`, `${E(h / (4 * PI * me * 1e3 * 1.00e-10), 3)} m/s`, `${E(h / (4 * PI * me * 0.100), 3)} m/s`],
    `Δv ≥ h/(4π m Δx) = (6.626 × 10⁻³⁴)/[4π (9.109 × 10⁻³¹)(1.00 × 10⁻¹⁰)] = ${E(dv, 3)} m/s - an enormous spread, which is why an electron in an atom cannot have a definite orbit. Leaving out 4π gives ${E(h / (me * 1.00e-10), 3)}; 2π gives ${E(h / (2 * PI * me * 1.00e-10), 3)}; a mass 1000 times too large gives ${E(h / (4 * PI * me * 1e3 * 1.00e-10), 3)}; using 0.100 (nm, unconverted) gives ${E(h / (4 * PI * me * 0.100), 3)}.`,
    ['Rearrange for Δv.', 'Δv = h/(4π m Δx).', '6.626 × 10⁻³⁴ ÷ (4π × 9.109 × 10⁻³¹ × 1.00 × 10⁻¹⁰).']);
}
{
  const ke = 2.21e-19, v = Math.sqrt(2 * ke / me), lam = h / (me * v);
  M(12, 4, 'Exam', 'Photoelectrons leave a metal with a kinetic energy of 2.21 × 10⁻¹⁹ J. What is their de Broglie wavelength? (mₑ = 9.109 × 10⁻³¹ kg; KE = ½mv²)',
    [`${E(lam, 3)} m`, `${E(h * c / ke, 3)} m`, `${E(h / (me * Math.sqrt(ke / me)), 3)} m`, `${E(h / (me * 2 * ke / me), 3)} m`, `${E(h / (4 * PI * me * v), 3)} m`],
    `Speed: v = √(2KE/m) = √(2 × 2.21 × 10⁻¹⁹ / 9.109 × 10⁻³¹) = ${E(v, 3)} m/s. λ = h/(mv) = (6.626 × 10⁻³⁴)/[(9.109 × 10⁻³¹)(${E(v, 3)})] = ${E(lam, 3)} m. Trap: λ = hc/E is for PHOTONS only - an electron has mass and travels slower than light, giving the wrong ${E(h * c / ke, 3)}. Dropping the 2 in KE = ½mv² gives ${E(h / (me * Math.sqrt(ke / me)), 3)}; skipping the square root gives ${E(h / (me * 2 * ke / me), 3)}; h/4π belongs to the uncertainty principle.`,
    ['An electron is matter, not a photon: use λ = h/(mv).', 'Find v from KE = ½mv² first.', `v = ${E(v, 3)} m/s.`]);
}
M(12, 2, 'Concept', 'The uncertainty principle forced chemists to abandon Bohr’s picture of the electron. What replaced it?',
  ['orbitals: regions where the electron is likely to be found, described by ψ² (probability)',
   'smaller circular orbits with exactly known radii',
   'elliptical orbits with exactly known speeds',
   'a model in which the electron sits motionless at a fixed distance',
   'a model in which electrons have no energy levels'],
  'If position and momentum cannot both be known, a definite path (orbit) is meaningless. Schrödinger’s quantum-mechanical model describes the electron by a wave function ψ, and ψ² gives the probability of finding it in a region: an orbital. Energy levels remain quantized in this model.',
  ['A definite path needs both position and speed.', 'The new model speaks of probability.', 'Orbit → orbital.']);

/* --- Schrödinger, ψ², nodes, shapes --- */
M(12, 1, 'Concept', 'In the quantum-mechanical model of the atom, ψ² (the square of the wave function) represents:',
  ['the probability density of finding the electron at a point',
   'the exact path of the electron',
   'the energy of the electron',
   'the speed of the electron',
   'the number of electrons in the orbital'],
  'ψ itself has no direct physical meaning, but ψ² is the probability density: the chance of finding the electron in a tiny volume at that point. Plotting ψ² in 3-D gives the electron-density (probability) picture of an orbital.',
  ['ψ alone has no physical meaning.', 'Squaring ψ gives a probability.', 'Probability per unit volume.']);

M(12, 1, 'Concept', 'In an electron density diagram (a "dot picture") of an orbital, a region with many closely spaced dots is a region where:',
  ['the probability of finding the electron is high',
   'many electrons are located at the same moment',
   'the electron moves most slowly',
   'the electron’s energy is highest',
   'a node is located'],
  'The dot density is proportional to ψ², the probability density. Many dots = the electron is likely to be found there. The picture is a single electron’s probability, not many electrons. A node is where the density falls to zero (no dots).',
  ['The dots map ψ².', 'Dense dots = high probability.', 'A node would be empty of dots.']);

M(12, 1, 'Concept', 'A node in an atomic orbital is a region where:',
  ['the probability of finding the electron is zero (ψ² = 0)',
   'the probability of finding the electron is greatest',
   'the electron’s energy is zero',
   'two electrons must be paired',
   'the nucleus is located'],
  'At a node ψ = 0, so ψ² = 0: the electron is never found there. Nodes can be spheres (radial nodes) or planes/cones (angular nodes).',
  ['Think of the still points on a vibrating guitar string.', 'ψ = 0 there.', 'Zero probability.']);

M(12, 2, 'Concept', 'The radial probability distribution of a hydrogen 2s orbital shows:',
  ['two maxima separated by one node where the probability is zero',
   'a single maximum and no nodes',
   'three maxima separated by two nodes',
   'a maximum at the nucleus that falls off steadily',
   'two maxima with a small but nonzero probability between them'],
  'A 2s orbital has n − l − 1 = 2 − 0 − 1 = 1 radial node: a spherical shell where the probability is exactly zero. The radial probability curve therefore has a small inner maximum, then the node, then a larger outer maximum. 1s has one maximum and no nodes; 3s has three maxima and two nodes.',
  ['Radial nodes = n − l − 1.', 'For 2s that is 1.', 'One node splits the curve into two peaks.']);

M(12, 4, 'Trap', 'For the hydrogen 1s orbital, which statement is TRUE?',
  ['ψ² is greatest at the nucleus, but the radial probability peaks at a distance from it (about 52.9 pm)',
   'ψ² and the radial probability both peak at the nucleus',
   'ψ² is zero at the nucleus and peaks at 52.9 pm',
   'the electron is always exactly 52.9 pm from the nucleus',
   'the 1s orbital has a radial node at 52.9 pm'],
  'ψ² (probability per unit volume) is largest at the nucleus. The radial probability multiplies ψ² by the area of a thin spherical shell (4πr²), which is zero at r = 0 and grows with r, so the TOTAL probability in a shell peaks at about 52.9 pm (the Bohr radius). The electron is not always there, and 1s has no nodes (n − l − 1 = 0).',
  ['ψ² is per unit volume; radial probability counts a whole shell.', 'A shell at r = 0 has no volume.', 'Two different curves, two different maxima.']);

M(12, 2, 'Concept', 'How many radial and angular nodes does a 3p orbital have?',
  ['1 radial, 1 angular', '2 radial, 0 angular', '0 radial, 2 angular', '1 radial, 2 angular', '2 radial, 1 angular'],
  'Total nodes = n − 1 = 2. Angular nodes = l = 1 (the nodal plane through the nucleus that every p orbital has). Radial nodes = n − l − 1 = 3 − 1 − 1 = 1. Check: 1 + 1 = 2 = n − 1.',
  ['Angular nodes = l; radial = n − l − 1.', 'For p, l = 1.', 'Total must be n − 1 = 2.']);

M(12, 2, 'Concept', 'How many radial nodes does a 4d orbital have?',
  ['1', '0', '2', '3', '4'],
  'Radial nodes = n − l − 1. For 4d, n = 4 and l = 2: 4 − 2 − 1 = 1. Total nodes = n − 1 = 3, of which l = 2 are angular and 1 is radial.',
  ['d means l = 2.', 'Radial nodes = n − l − 1.', '4 − 2 − 1.']);

M(12, 2, 'Concept', 'How many radial and angular nodes does a 5s orbital have?',
  ['4 radial, 0 angular', '5 radial, 0 angular', '0 radial, 4 angular', '3 radial, 1 angular', '4 radial, 1 angular'],
  'For s, l = 0, so there are no angular nodes (s orbitals are spherical). Radial nodes = n − l − 1 = 5 − 0 − 1 = 4. Total = n − 1 = 4.',
  ['s orbitals have l = 0.', 'No angular nodes for a sphere.', 'Radial = n − 1 here.']);

M(12, 3, 'Concept', 'Which orbital has 2 radial nodes and 1 angular node?',
  ['4p', '3p', '3d', '4d', '5s'],
  'Angular nodes = l = 1 → a p orbital. Radial nodes = n − l − 1 = 2 → n = 2 + 1 + 1 = 4. So it is 4p (total nodes 3 = n − 1). 3p has 1 radial node; 3d has 0 radial and 2 angular; 4d has 1 radial and 2 angular; 5s has 4 radial and 0 angular.',
  ['Angular nodes give l.', 'l = 1 is p; then n − 1 − 1 = 2.', 'So n = 4.']);

M(12, 3, 'Concept', 'How many total nodes, radial nodes and angular nodes does a 4f orbital have?',
  ['3 total: 0 radial, 3 angular', '3 total: 3 radial, 0 angular', '4 total: 1 radial, 3 angular', '3 total: 1 radial, 2 angular', '2 total: 0 radial, 2 angular'],
  'Total nodes = n − 1 = 3. f means l = 3, so 3 angular nodes. Radial = n − l − 1 = 4 − 3 − 1 = 0. 4f is the first (lowest-n) f sublevel, so like 1s, 2p and 3d it has no radial nodes.',
  ['f means l = 3.', 'Total = n − 1; angular = l.', 'Radial = 4 − 3 − 1.']);

M(12, 2, 'Concept', 'How many angular nodes do a 3d and a 3s orbital have, and how many radial nodes does the 3d have?',
  ['3d: 2 angular and 0 radial; 3s: 0 angular', '3d: 0 angular and 2 radial; 3s: 2 angular', '3d: 1 angular and 1 radial; 3s: 0 angular', '3d: 2 angular and 1 radial; 3s: 1 angular', '3d: 3 angular and 0 radial; 3s: 0 angular'],
  '3d: l = 2 → 2 angular nodes; radial = 3 − 2 − 1 = 0; total 2 = n − 1. 3s: l = 0 → no angular nodes (its 2 nodes are both radial). Angular nodes depend only on l, the shape.',
  ['Angular nodes = l.', 'd: l = 2; s: l = 0.', 'Radial = n − l − 1.']);

M(12, 2, 'Concept', 'Which s orbital has exactly 2 radial nodes?',
  ['3s', '2s', '1s', '4s', '5s'],
  'For s, l = 0, so radial nodes = n − 1. Two radial nodes → n = 3: the 3s orbital. 2s has 1, 1s has 0, 4s has 3, 5s has 4.',
  ['s orbitals have only radial nodes.', 'Radial nodes = n − 0 − 1.', 'n − 1 = 2.']);

M(12, 1, 'Concept', 'Which describes the shapes of s, p and d orbitals?',
  ['s spherical; p two lobes (dumbbell) on opposite sides of the nucleus; most d four lobes (cloverleaf)',
   's dumbbell; p spherical; d four lobes',
   's spherical; p four lobes; d two lobes',
   'all three are spherical but of different sizes',
   's circular orbit; p elliptical orbit; d figure-eight orbit'],
  's orbitals (l = 0) are spherical. p orbitals (l = 1) have two lobes along an axis (x, y or z) with a nodal plane through the nucleus. Four of the five d orbitals (l = 2) have four lobes in a cloverleaf with two nodal planes; dz² has two lobes plus a ring. Orbitals are probability regions, not orbits.',
  ['l = 0 is the simplest shape.', 'p: one nodal plane, two lobes.', 'd: two nodal planes, four lobes.']);

M(12, 2, 'Concept', 'Compared with a 1s orbital, a 2s orbital is:',
  ['larger, spherical, and has one radial node', 'the same size and shape with no nodes', 'smaller and dumbbell-shaped', 'larger and dumbbell-shaped with one angular node', 'smaller, spherical, and has one radial node'],
  'Both are s (l = 0) and spherical. A higher n means a larger orbital (the electron is, on average, farther from the nucleus) and higher energy. 2s has n − l − 1 = 1 radial node; 1s has none.',
  ['Same l, larger n.', 'n sets size; l sets shape.', 'Radial nodes = n − l − 1.']);

/* --- quantum numbers --- */
M(12, 1, 'Concept', 'Which quantum number describes the ORIENTATION of an orbital in space?',
  ['the magnetic quantum number, mₗ', 'the principal quantum number, n', 'the angular momentum quantum number, l', 'the spin quantum number, mₛ', 'the Rydberg constant, R'],
  'n sets the size and energy level; l sets the shape (s, p, d, f); mₗ sets the orientation (e.g. px, py, pz); mₛ is the electron’s spin (+½ or −½). R is a constant, not a quantum number.',
  ['n: size. l: shape.', 'Which one distinguishes px from py?', 'The magnetic quantum number.']);

M(12, 1, 'Concept', 'What are the allowed values of l when n = 3?',
  ['0, 1, 2', '1, 2, 3', '0, 1, 2, 3', '−2, −1, 0, +1, +2', '3 only'],
  'l runs from 0 to n − 1. For n = 3: l = 0, 1, 2 (the 3s, 3p and 3d sublevels). l = 3 would need n ≥ 4, and negative numbers are mₗ values, not l values.',
  ['l starts at 0.', 'Maximum l = n − 1.', 'n − 1 = 2.']);

M(12, 1, 'Concept', 'What are the allowed values of mₗ when l = 2?',
  ['−2, −1, 0, +1, +2', '0, 1, 2', '−1, 0, +1', '1, 2', '−2, +2'],
  'mₗ runs from −l to +l in whole steps: for l = 2, mₗ = −2, −1, 0, +1, +2 - five values, the five d orbitals (2l + 1 = 5).',
  ['mₗ goes from −l to +l.', 'Include zero.', 'There are 2l + 1 values.']);

M(12, 2, 'Concept', 'Which set of quantum numbers (n, l, mₗ) is NOT allowed?',
  ['n = 2, l = 2, mₗ = 1', 'n = 2, l = 1, mₗ = 0', 'n = 3, l = 2, mₗ = −2', 'n = 4, l = 3, mₗ = −3', 'n = 1, l = 0, mₗ = 0'],
  'l must be less than n (l = 0 to n − 1). For n = 2, l can be only 0 or 1, so l = 2 is impossible - there is no "2d" sublevel. All the others obey l ≤ n − 1 and |mₗ| ≤ l.',
  ['Check l ≤ n − 1 first.', 'Then check −l ≤ mₗ ≤ +l.', 'Is there a 2d sublevel?']);

M(12, 2, 'Concept', 'Which set of quantum numbers (n, l, mₗ) IS allowed?',
  ['n = 5, l = 2, mₗ = 2', 'n = 3, l = 3, mₗ = 0', 'n = 4, l = −1, mₗ = 0', 'n = 2, l = 1, mₗ = −2', 'n = 0, l = 0, mₗ = 0'],
  'n = 5, l = 2 (5d), mₗ = +2 satisfies all rules. l = 3 needs n ≥ 4; l can never be negative; for l = 1, |mₗ| cannot exceed 1; and n starts at 1, never 0.',
  ['n ≥ 1; 0 ≤ l ≤ n − 1; −l ≤ mₗ ≤ +l.', 'Test each set against all three rules.', 'Only one passes all three.']);

M(12, 4, 'Trap', 'Which set of quantum numbers (n, l, mₗ, mₛ) is NOT allowed for an electron?',
  ['3, 2, 1, 0', '3, 1, 0, +½', '2, 0, 0, −½', '4, 3, −2, +½', '1, 0, 0, +½'],
  'mₛ can only be +½ or −½; an electron always has spin, so mₛ = 0 is impossible. The n, l, mₗ in (3, 2, 1, 0) are fine (a 3d orbital) - the fourth number is the problem. All the other sets obey every rule.',
  ['Check all four numbers, not just the first three.', 'What values can mₛ take?', 'Only ±½.']);

M(12, 2, 'Concept', 'Which set of quantum numbers (n, l, mₗ, mₛ) could describe an electron in a 3d orbital?',
  ['3, 2, −1, +½', '3, 3, −1, +½', '3, 1, −1, +½', '2, 2, 0, −½', '3, 2, −3, −½'],
  '3d means n = 3 and l = 2, with mₗ from −2 to +2 and mₛ = ±½: (3, 2, −1, +½) works. (3, 3, …) is impossible; (3, 1, …) is a 3p electron; (2, 2, …) is impossible; mₗ = −3 is outside −2…+2.',
  ['d means l = 2.', 'n = 3 for 3d.', 'Then |mₗ| ≤ 2 and mₛ = ±½.']);

M(12, 2, 'Concept', 'Which set of quantum numbers (n, l, mₗ) describes a 4p orbital?',
  ['4, 1, −1', '4, 2, 1', '4, 0, 0', '3, 1, 0', '4, 1, −2'],
  '4p: n = 4, l = 1 (p), and mₗ = −1, 0 or +1. (4, 2, 1) is 4d; (4, 0, 0) is 4s; (3, 1, 0) is 3p; mₗ = −2 is not allowed for l = 1.',
  ['p ↔ l = 1.', 'n is the number in front.', 'mₗ must be −1, 0 or +1.']);

M(12, 1, 'Concept', 'An orbital has n = 5 and l = 2. What is its designation?',
  ['5d', '5p', '2d', '5f', '3d'],
  'l = 0, 1, 2, 3 correspond to s, p, d, f. n = 5 with l = 2 is a 5d orbital. (The sublevel letter comes from l; the number in front is n.)',
  ['The number is n.', 'l = 2 ↔ d.', 'Number + letter.']);

M(12, 1, 'Concept', 'Which sublevel has n = 4 and l = 3?',
  ['4f', '4d', '3f', '4p', '7s'],
  'l = 3 is f, and n = 4 gives 4f - the first shell in which an f sublevel exists (l ≤ n − 1 means f needs n ≥ 4). There is no 3f.',
  ['Letter from l: 0 s, 1 p, 2 d, 3 f.', 'Number from n.', 'n = 4, f.']);

M(12, 2, 'Trap', 'Which sublevel does NOT exist?',
  ['2d', '4f', '3d', '5d', '2p'],
  'A d sublevel needs l = 2, and l ≤ n − 1, so n must be at least 3. "2d" would need n = 2, l = 2 - impossible. 4f (l = 3 ≤ 3), 3d, 5d and 2p are all allowed.',
  ['l must be ≤ n − 1.', 'd means l = 2.', 'Which has n too small for its letter?']);

M(12, 2, 'Trap', 'Which designation CANNOT exist?',
  ['1p', '6s', '3d', '4f', '5p'],
  'p needs l = 1, which requires n ≥ 2. The first shell (n = 1) has only l = 0, the 1s sublevel. 6s, 3d, 4f and 5p all satisfy l ≤ n − 1.',
  ['The first shell has how many sublevels?', 'n = 1 → l = 0 only.', 'There is no p in shell 1.']);

M(12, 2, 'Trap', 'Which combination of n and l is NOT possible?',
  ['n = 3, l = 3', 'n = 4, l = 3', 'n = 5, l = 2', 'n = 2, l = 1', 'n = 6, l = 0'],
  'l can be at most n − 1. For n = 3, l = 0, 1 or 2 - so l = 3 (a "3f" sublevel) is impossible. 4f, 5d, 2p and 6s are all allowed.',
  ['l ranges from 0 to n − 1.', 'For n = 3, the largest l is 2.', 'There is no 3f.']);

M(12, 1, 'Concept', 'How many orbitals are in a 4d sublevel?',
  ['5', '3', '7', '10', '4'],
  'Any d sublevel has l = 2 and 2l + 1 = 5 orbitals (mₗ = −2, −1, 0, +1, +2), whatever n is. It holds 10 electrons (two per orbital) - 10 is the electron count, not the orbital count.',
  ['Orbitals in a sublevel = 2l + 1.', 'd means l = 2.', 'n does not change the count.']);

M(12, 1, 'Concept', 'How many sublevels are in the n = 4 energy level?',
  ['4', '3', '16', '32', '7'],
  'Level n has n sublevels: n = 4 contains 4s, 4p, 4d and 4f (l = 0, 1, 2, 3). 16 is the number of ORBITALS (n²) and 32 the number of electrons (2n²).',
  ['l runs from 0 to n − 1.', 'Count the l values for n = 4.', 's, p, d, f.']);

M(12, 2, 'Concept', 'How many orbitals are in the n = 4 energy level?',
  ['16', '4', '8', '32', '9'],
  'Number of orbitals = n² = 16: 4s (1) + 4p (3) + 4d (5) + 4f (7) = 16. 4 is the number of sublevels; 32 is the maximum number of electrons (2n²).',
  ['Add up the orbitals in each sublevel.', '1 + 3 + 5 + 7.', 'Or use n².']);

M(12, 2, 'Concept', 'What is the maximum number of electrons in the n = 3 energy level?',
  ['18', '9', '8', '6', '32'],
  'n = 3 has n² = 9 orbitals (3s 1 + 3p 3 + 3d 5), and each holds 2 electrons, so 2n² = 18. 9 is the number of orbitals; 8 forgets the 3d sublevel (it belongs to n = 3 even though it fills after 4s).',
  ['Orbitals = n².', 'Each orbital holds 2 electrons.', 'Maximum = 2n².']);

M(12, 2, 'Concept', 'What is the maximum number of electrons in a 5f sublevel?',
  ['14', '7', '10', '18', '50'],
  'f means l = 3, so 2l + 1 = 7 orbitals, each holding 2 electrons: 14. The n value does not change it. 7 is the orbital count; 50 is the capacity of the whole n = 5 level.',
  ['f means l = 3.', '2l + 1 orbitals, 2 electrons each.', '2 × 7 electrons.']);

M(12, 2, 'Concept', 'How many orbitals have n = 4 and l = 2?',
  ['5', '1', '4', '10', '16'],
  'n = 4, l = 2 is the 4d sublevel. It has 2l + 1 = 5 orbitals (mₗ = −2 … +2). 10 is the number of electrons; 16 is all the orbitals with n = 4.',
  ['Identify the sublevel first.', 'n = 4, l = 2 is 4d.', 'Orbitals = 2l + 1.']);

M(12, 2, 'Trap', 'How many orbitals have the quantum numbers n = 3, l = 1, mₗ = 0?',
  ['1', '3', '2', '9', '6'],
  'Fixing n, l AND mₗ specifies exactly one orbital (here the 3p orbital with mₗ = 0, often labelled 3pz). 3 would be the whole 3p sublevel; 2 is the electron capacity of the single orbital.',
  ['How many quantum numbers define one orbital?', 'n, l and mₗ together pick one orbital.', 'All three are given.']);

M(12, 3, 'Concept', 'How many electrons can have the quantum numbers n = 3 and l = 2?',
  ['10', '5', '18', '6', '2'],
  'n = 3, l = 2 is the 3d sublevel: 5 orbitals × 2 electrons = 10. 5 is the orbital count; 18 is the whole n = 3 level.',
  ['n = 3, l = 2 is which sublevel?', '3d has 5 orbitals.', 'Two electrons per orbital.']);

M(12, 4, 'Trap', 'How many electrons in an atom can have the quantum numbers n = 4 and mₗ = +1?',
  ['6', '2', '8', '3', '14'],
  'For n = 4, l can be 0, 1, 2 or 3. mₗ = +1 is possible only when l ≥ 1: one orbital each in 4p, 4d and 4f = 3 orbitals. Each holds 2 electrons (mₛ = ±½), so 6 electrons. 2 assumes one orbital; 3 counts orbitals, not electrons.',
  ['Which values of l allow mₗ = +1?', 'l = 1, 2, 3 each have exactly one mₗ = +1 orbital.', '3 orbitals × 2 electrons.']);

M(12, 4, 'Trap', 'How many electrons in an atom can have the quantum numbers n = 2 and mₛ = +½?',
  ['4', '8', '2', '1', '6'],
  'n = 2 has n² = 4 orbitals (2s and three 2p). Each orbital holds one electron with mₛ = +½ and one with −½. So 4 electrons have mₛ = +½. 8 is the total for n = 2.',
  ['How many orbitals are in n = 2?', 'Each orbital has one "+½" electron.', 'n² = 4 orbitals.']);

M(12, 4, 'Trap', 'How many orbitals have n = 3 and l = 3?',
  ['0', '7', '1', '14', '9'],
  'For n = 3, l can only be 0, 1 or 2. l = 3 (an f sublevel) does not exist in the third shell, so there are no such orbitals. 7 is how many orbitals an f sublevel would have if it existed (4f onward).',
  ['Is l = 3 allowed for n = 3?', 'l ≤ n − 1 = 2.', 'A sublevel that does not exist has no orbitals.']);

M(12, 4, 'Trap', 'An electron has n = 3 and mₗ = −2. Which statement must be true?',
  ['It is in a 3d orbital', 'It could be in either a 3p or a 3d orbital', 'It is in a 3p orbital', 'Its spin must be mₛ = −½', 'This combination is impossible'],
  '|mₗ| ≤ l, so mₗ = −2 requires l ≥ 2. For n = 3 the largest l is 2, so l must be exactly 2: a 3d orbital. 3p (l = 1) allows only mₗ = −1, 0, +1. The spin can be either +½ or −½.',
  ['mₗ = −2 needs l of at least 2.', 'For n = 3, l can be at most 2.', 'So l = 2.']);

M(12, 2, 'Concept', 'An orbital has n = 4 and l = 1. What is its sublevel label, and how many orbitals are in that sublevel?',
  ['4p; 3 orbitals', '4p; 6 orbitals', '4d; 5 orbitals', '4s; 1 orbital', '1p; 4 orbitals'],
  'l = 1 is a p sublevel; with n = 4 it is 4p. A p sublevel has 2l + 1 = 3 orbitals (px, py, pz), holding 6 electrons - 6 is the electron count, not the orbital count.',
  ['l = 1 ↔ p.', 'Orbitals = 2l + 1.', 'Number = n.']);

M(12, 4, 'Exam', 'How many orbitals are in the n = 5 level, and what is the maximum number of electrons it can hold?',
  ['25 orbitals; 50 electrons', '5 orbitals; 10 electrons', '25 orbitals; 25 electrons', '16 orbitals; 32 electrons', '10 orbitals; 50 electrons'],
  'Orbitals = n² = 25 (5s 1 + 5p 3 + 5d 5 + 5f 7 + 5g 9). Electrons = 2n² = 50. 5 is the number of sublevels; 16 and 32 belong to n = 4.',
  ['Orbitals = n².', 'Electrons = 2 per orbital.', '5² and 2 × 5².']);

M(12, 4, 'Exam', 'Which statement about quantum numbers is FALSE?',
  ['For n = 3, the allowed mₗ values are −3, −2, −1, 0, +1, +2, +3.',
   'The n = 4 level contains 4 sublevels and 16 orbitals.',
   'A 3d sublevel can hold a maximum of 10 electrons.',
   'The l = 3 (f) sublevel first appears at n = 4.',
   'Every p sublevel contains 3 orbitals.'],
  'mₗ is limited by l, not n. For n = 3 the largest l is 2, so mₗ ranges only from −2 to +2. The others are true: n = 4 has n = 4 sublevels and n² = 16 orbitals; d holds 10 electrons; f (l = 3) needs n ≥ 4; p has 2(1) + 1 = 3 orbitals.',
  ['mₗ is bounded by l.', 'Find the largest l for n = 3.', 'Then |mₗ| ≤ that l.']);

M(12, 2, 'Concept', 'Each solution ψ of the Schrödinger equation for the hydrogen atom - an atomic orbital - is specified by:',
  ['three quantum numbers: n, l and mₗ', 'the principal quantum number n only', 'four quantum numbers including mₛ', 'the quantum numbers n and l only', 'the exact radius and speed of the electron’s orbit'],
  'An orbital is defined by n (size/energy), l (shape) and mₗ (orientation). The fourth quantum number, mₛ, describes the spin of an ELECTRON in that orbital, not the orbital itself. The quantum model gives no exact radius or speed (uncertainty principle).',
  ['Orbital = a wave function ψ.', 'Size, shape, orientation.', 'Spin belongs to the electron.']);

M(12, 1, 'Concept', 'In the quantum-mechanical model, an orbital is best described as:',
  ['a region around the nucleus where the electron has a high probability of being found',
   'a fixed circular path that the electron follows around the nucleus',
   'the exact position of the electron at a given moment',
   'a container that always holds exactly two electrons',
   'the path of a photon emitted by the atom'],
  'An orbital is a wave function ψ whose square gives the probability of finding the electron; it is drawn as the region (often enclosing 90% of the probability) where the electron is likely to be. Fixed circular paths are Bohr orbits, which the uncertainty principle rules out. An orbital can hold 0, 1 or 2 electrons.',
  ['Orbit vs orbital.', 'Think probability, not path.', 'ψ² = probability density.']);

/* ---------- extra exam-level items (appended so earlier ids stay stable) ---------- */
{
  const fMw = 2.45e9, fIr = c / 1.0e-5, fG = c / 532e-9, fX = 1.0e18;
  if (!(fMw < fIr && fIr < fG && fG < fX)) throw new Error('ranking check');
  M(10, 4, 'Trap', 'Rank these photons in order of INCREASING energy: (i) 2.45 GHz microwaves, (ii) 532 nm green light, (iii) 1.0 × 10¹⁸ Hz X-rays, (iv) 10 μm infrared.',
    ['(i) < (iv) < (ii) < (iii)', '(iii) < (ii) < (iv) < (i)', '(iv) < (i) < (ii) < (iii)', '(i) < (ii) < (iv) < (iii)', '(ii) < (iv) < (i) < (iii)'],
    `Put everything on one scale (frequency): (i) ${E(fMw, 3)} Hz; (iv) ν = c/λ = 2.998 × 10⁸/1.0 × 10⁻⁵ = ${E(fIr, 2)} Hz; (ii) 2.998 × 10⁸/5.32 × 10⁻⁷ = ${E(fG, 3)} Hz; (iii) 1.0 × 10¹⁸ Hz. E = hν, so increasing energy = increasing ν: microwave < infrared < green < X-ray. The reverse list is decreasing energy; the others misplace microwave vs infrared or infrared vs visible.`,
    ['Convert every item to the same quantity (frequency is easiest).', 'ν = c/λ for the two wavelengths; E = hν.', 'Microwave < infrared < visible < X-ray.']);
}
{
  const f1 = c / 500e-9, f2 = 5.0e14, f3 = 3.0e-19 / h, f4 = (250e3 / NA) / h, f5 = c / 1.5e-6;
  if (!(f4 > f1 && f1 > f2 && f2 > f3 && f3 > f5)) throw new Error('freq check');
  M(10, 4, 'Trap', 'Which of these has the HIGHEST frequency?',
    ['photons carrying 250. kJ per mole', 'light of wavelength 500. nm', 'light of frequency 5.0 × 10¹⁴ Hz', 'a photon of energy 3.0 × 10⁻¹⁹ J', 'light of wavelength 1.5 μm'],
    `Convert each to ν. 250. kJ/mol → 250. × 10³ ÷ 6.022 × 10²³ = ${E(250e3 / NA, 3)} J per photon → ν = E/h = ${E(f4, 3)} Hz. 500. nm → c/λ = ${E(f1, 3)} Hz. 5.0 × 10¹⁴ Hz as given. 3.0 × 10⁻¹⁹ J → E/h = ${E(f3, 2)} Hz. 1.5 μm → ${E(f5, 2)} Hz. Highest: the 250 kJ/mol photons. If you compared 250 with 3.0 × 10⁻¹⁹ directly, or skipped dividing by Avogadro’s number, you could not rank them.`,
    ['Convert every choice to frequency in Hz.', 'kJ/mol → J/photon (× 1000 ÷ N_A), then ν = E/h; for λ use ν = c/λ.', `The kJ/mol beam works out to ${E(f4, 3)} Hz.`]);
}
{
  const l1 = ryd(2, 3), l2 = ryd(1, 2);
  M(11, 4, 'Exam', 'An excited hydrogen atom returns to the ground state by emitting two photons in succession: first one of 656 nm, then one of 122 nm. In which level did the electron start? (1/λ = R(1/n₁² − 1/n₂²), R = 1.097 × 10⁷ m⁻¹)',
    ['n = 3', 'n = 2', 'n = 4', 'n = 5', 'n = 6'],
    `Work backwards from the ground state. 122 nm: 1/λ = R(1 − 1/n²) gives the n = 2 → 1 line (${F(l2 * 1e9, 3)} nm), so the electron was in n = 2 before the second photon. 656 nm: 1/λ = R(1/4 − 1/n²) gives the n = 3 → 2 line (${F(l1 * 1e9, 3)} nm). So it started in n = 3: 3 → 2 (visible red) then 2 → 1 (ultraviolet).`,
    ['The last photon must end at n = 1.', 'Which transition gives 122 nm? Which gives 656 nm?', '656 nm is the red Balmer line, 3 → 2.']);
}
{
  const per = RB / 9, mol = per * NA / 1000;
  N(11, 3, 'Calculation', 'How much energy is needed to ionize one MOLE of hydrogen atoms whose electrons are in n = 3? (Eₙ = −2.18 × 10⁻¹⁸ J/n²) (Enter a number in kJ/mol.)',
    [`${F(mol, 3)} kJ/mol`], mol,
    `Per atom: ΔE = 0 − E₃ = 2.18 × 10⁻¹⁸/9 = ${E(per, 3)} J. Per mole: × 6.022 × 10²³ = ${E(per * NA, 3)} J = ${F(mol, 3)} kJ/mol - only one ninth of the ground-state value (1.31 × 10³ kJ/mol).`,
    ['Ionize = go from n = 3 to n = ∞.', 'Per atom: 2.18 × 10⁻¹⁸ / 3².', 'Then × N_A and ÷ 1000.']);
}
M(11, 4, 'Trap', 'Compare a hydrogen atom EMITTING a photon as its electron drops from n = 3 to n = 2 with an atom ABSORBING a photon as its electron rises from n = 2 to n = 3. Which statement is correct?',
  ['Both photons are 656 nm; ΔE of the atom is negative for emission and positive for absorption',
   'The absorbed photon has a shorter wavelength, because absorbing takes more energy than emitting releases',
   'Both photons are 656 nm, and ΔE of the atom is negative in both cases',
   'The emitted photon is 656 nm, but the absorbed photon is ultraviolet',
   'Both photons are 656 nm, and ΔE of the atom is positive in both cases'],
  'The gap between n = 2 and n = 3 is the same in both directions, |ΔE| = 2.18 × 10⁻¹⁸ (1/4 − 1/9) = 3.03 × 10⁻¹⁹ J, so both photons have λ = hc/|ΔE| = 656 nm. Only the SIGN of the atom’s ΔE differs: emission (down) is negative, absorption (up) is positive. That is why an element’s absorption lines sit at exactly the same wavelengths as its emission lines.',
  ['Is the energy gap different going up and going down?', 'Same gap → same photon wavelength.', 'Only the sign of ΔE(atom) flips.']);
{
  const pw = 100. * 0.100, per = Elam(589e-9), n = pw / per, mol = n / NA;
  M(10, 4, 'Exam', 'A 100. W sodium lamp converts 10.0% of its power into 589 nm light (1 W = 1 J/s). How many MOLES of 589 nm photons does it emit per second?',
    [`${E(mol, 3)} mol`, `${E(mol * 10, 3)} mol`, `${E(n, 3)} mol`, `${E(n * NA, 3)} mol`, `${E(pw / Elam(589) / NA, 3)} mol`],
    `Light power = 0.100 × 100. J/s = ${F(pw, 3)} J/s. One photon: hc/λ = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/(5.89 × 10⁻⁷) = ${E(per, 3)} J. Photons per second = ${F(pw, 3)} ÷ ${E(per, 3)} = ${E(n, 3)}; moles = ÷ 6.022 × 10²³ = ${E(mol, 3)} mol. Traps: using the full 100. W gives ${E(mol * 10, 3)}; ${E(n, 3)} is the number of PHOTONS, not moles; multiplying by N_A goes the wrong way; λ left in nm gives ${E(pw / Elam(589) / NA, 3)}.`,
    ['Only 10.0% of the 100. W becomes light.', 'Photons/s = (J/s of light) ÷ (J per photon).', 'Then divide by 6.022 × 10²³ for moles.']);
}
M(12, 4, 'Trap', 'Which pair of orbitals has the SAME number of radial nodes?',
  ['3s and 4p', '3s and 3p', '2p and 3p', '4d and 4f', '1s and 2s'],
  'Radial nodes = n − l − 1. 3s: 3 − 0 − 1 = 2; 4p: 4 − 1 − 1 = 2 - equal. 3s (2) vs 3p (1); 2p (0) vs 3p (1); 4d (1) vs 4f (0); 1s (0) vs 2s (1). Raising l by one removes one radial node, so to keep the count you must also raise n by one.',
  ['Radial nodes = n − l − 1.', 'Compute it for both orbitals in each pair.', 'A p orbital needs one more n than an s orbital to match.']);
M(12, 4, 'Exam', 'Which statement about the hydrogen atom is FALSE?',
  ['An electron in the n = 3 level must be in a 3d orbital.',
   'The 2s and 2p orbitals of hydrogen differ in shape.',
   'A 3p orbital has one nodal plane through the nucleus.',
   'The n = 3 level contains nine orbitals.',
   'ψ² for a p orbital is zero at the nucleus.'],
  'n = 3 contains 3s, 3p and 3d orbitals; an electron with n = 3 can be in any of them (only mₗ = ±2 would force 3d). The others are true: 2s is spherical, 2p two-lobed; every p orbital has one angular node (a plane through the nucleus), so ψ² = 0 there; n = 3 has n² = 9 orbitals.',
  ['Which statement is too restrictive?', 'For n = 3, l can be 0, 1 or 2.', 'n alone does not fix the sublevel.']);

/* ---------- write the file ---------- */
// Balanced answer positions: each block of 5 MCQs uses a shuffled permutation of 0-4.
let seed = 61;
function rnd() { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; }
function perm() { const p = [0, 1, 2, 3, 4]; for (let i = 4; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; } return p; }
let block = [], mcqCount = 0;

const lines = [];
out.forEach((r, i) => {
  const id = 'm6-a-' + String(i + 1).padStart(3, '0');
  let rec;
  if (r.kind === 'mcq') {
    if (mcqCount % 5 === 0) block = perm();
    const target = block[mcqCount % 5]; mcqCount++;
    const ch = r.choices.slice(1);
    ch.splice(target, 0, r.choices[0]);
    rec = [id, 6, r.lesson, r.tier, r.tag, 'mcq', r.q, ch, target, r.why, r.hints];
  } else {
    rec = [id, 6, r.lesson, r.tier, r.tag, 'num', r.q, r.display, r.num, r.why, r.hints];
    if (r.opts) rec.push(r.opts);
  }
  lines.push(JSON.stringify(rec));
});

const header = `/* GENERATED by tools/chem/gen-quantum.cjs - edit the generator, not this file.

   Gym 6 (Route 6 - The Spectral Line): Light and Quantum Theory, Silberberg 7.1-7.4,
   CHM 11510 lessons 10-12 (Quantum Theory 1-3), on Evening Exam 2.
   Lesson 10: waves, c = λν, the EM spectrum in every ordering direction, visible colours,
   refraction/diffraction, Planck E = nhν, photon energy per photon and per mole (both
   directions), photon counts, the photoelectric effect. Lesson 11: line vs continuous
   spectra, Rydberg equation, Bohr postulates and limits, Eₙ = −2.18 × 10⁻¹⁸ J/n², emission vs
   absorption signs, ionization, ranking transitions, one-electron ions. Lesson 12: de Broglie,
   Davisson-Germer, Heisenberg, ψ and ψ², nodes, orbital shapes, quantum numbers.
   Every Week 7 recitation problem appears once (tag Worksheet) with variations.
   Sources: the course's Week 7 worksheet, the Thermochem 3 → Quantum I learning objectives,
   Silberberg 7.1-7.4 problem types. Constants: h = 6.626 × 10⁻³⁴ J·s, c = 2.998 × 10⁸ m/s,
   N_A = 6.022 × 10²³, Eₙ = −2.18 × 10⁻¹⁸ J/n² (2.179 × 10⁻¹⁸ only in the worksheet Q8 items,
   as on the worksheet), R = 1.097 × 10⁷ m⁻¹, mₑ = 9.109 × 10⁻³¹ kg. Every numeric answer and
   distractor is computed by the generator. */
`;
const body = 'chemAddQuestions([\n' + lines.join(',\n') + '\n]);\n';
const dest = path.join(__dirname, '..', '..', 'js', 'data', 'chem', 'chem-q-quantum.js');
fs.writeFileSync(dest, header + body);

const t = {}, tag = {}, les = {}; let nums = 0, t4te = 0;
out.forEach(r => { t[r.tier] = (t[r.tier] || 0) + 1; tag[r.tag] = (tag[r.tag] || 0) + 1; les[r.lesson] = (les[r.lesson] || 0) + 1; if (r.kind === 'num') nums++; if (r.tier === 4 && (r.tag === 'Trap' || r.tag === 'Exam')) t4te++; });
console.log('wrote', out.length, 'questions to', dest);
console.log('tiers', t, 'tags', tag, 'lessons', les, 'num', nums, 't4 Trap/Exam', t4te);
