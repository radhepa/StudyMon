/* The Periodic Coast's data sheet.

   CHM 11510 exams hand out a periodic table, a page of "useful information"
   (constants and formulas) and the solubility table. A chemistry question here
   may need a molar mass just like the real paper does, so the same sheet sits
   one button away on every chemistry question card. It is a separate overlay,
   not the shared modal, so opening it mid-battle never touches the battle. */

var CHEM_ELEMENTS = [
  'H 1.008', 'He 4.003', 'Li 6.94', 'Be 9.012', 'B 10.81', 'C 12.01', 'N 14.01', 'O 16.00', 'F 19.00', 'Ne 20.18',
  'Na 22.99', 'Mg 24.31', 'Al 26.98', 'Si 28.09', 'P 30.97', 'S 32.06', 'Cl 35.45', 'Ar 39.95', 'K 39.10', 'Ca 40.08',
  'Sc 44.96', 'Ti 47.87', 'V 50.94', 'Cr 52.00', 'Mn 54.94', 'Fe 55.85', 'Co 58.93', 'Ni 58.69', 'Cu 63.55', 'Zn 65.38',
  'Ga 69.72', 'Ge 72.63', 'As 74.92', 'Se 78.97', 'Br 79.90', 'Kr 83.80', 'Rb 85.47', 'Sr 87.62', 'Y 88.91', 'Zr 91.22',
  'Nb 92.91', 'Mo 95.95', 'Tc (98)', 'Ru 101.07', 'Rh 102.91', 'Pd 106.42', 'Ag 107.87', 'Cd 112.41', 'In 114.82', 'Sn 118.71',
  'Sb 121.76', 'Te 127.60', 'I 126.90', 'Xe 131.29', 'Cs 132.91', 'Ba 137.33', 'La 138.91', 'Ce 140.12', 'Pr 140.91', 'Nd 144.24',
  'Pm (145)', 'Sm 150.36', 'Eu 151.96', 'Gd 157.25', 'Tb 158.93', 'Dy 162.50', 'Ho 164.93', 'Er 167.26', 'Tm 168.93', 'Yb 173.05',
  'Lu 174.97', 'Hf 178.49', 'Ta 180.95', 'W 183.84', 'Re 186.21', 'Os 190.23', 'Ir 192.22', 'Pt 195.08', 'Au 196.97', 'Hg 200.59',
  'Tl 204.38', 'Pb 207.2', 'Bi 208.98', 'Po (209)', 'At (210)', 'Rn (222)', 'Fr (223)', 'Ra (226)', 'Ac (227)', 'Th 232.04',
  'Pa 231.04', 'U 238.03', 'Np (237)', 'Pu (244)', 'Am (243)', 'Cm (247)', 'Bk (247)', 'Cf (251)', 'Es (252)', 'Fm (257)',
  'Md (258)', 'No (259)', 'Lr (262)', 'Rf (267)', 'Db (268)', 'Sg (269)', 'Bh (270)', 'Hs (269)', 'Mt (278)', 'Ds (281)',
  'Rg (282)', 'Cn (285)', 'Nh (286)', 'Fl (289)', 'Mc (290)', 'Lv (293)', 'Ts (294)', 'Og (294)'
];

var CHEM_CONSTANTS = [
  ['Avogadro’s number', 'N_A = 6.022 × 10²³ mol⁻¹'],
  ['Planck’s constant', 'h = 6.626 × 10⁻³⁴ J·s'],
  ['Speed of light', 'c = 2.998 × 10⁸ m/s'],
  ['Gas constant', 'R = 8.314 J/(mol·K) = 0.08206 L·atm/(mol·K)'],
  ['Hydrogen energy levels', 'Eₙ = −2.18 × 10⁻¹⁸ J (1/n²)'],
  ['Rydberg constant', 'R = 1.097 × 10⁷ m⁻¹'],
  ['Electron mass', 'mₑ = 9.109 × 10⁻³¹ kg'],
  ['Atomic mass unit', '1 amu = 1.6605 × 10⁻²⁷ kg ≈ 931.5 MeV'],
  ['Pressure', '1 atm = 760 mmHg = 760 torr = 101.325 kPa'],
  ['Energy', '1 L·atm = 101.3 J · 1 cal = 4.184 J · 1 eV = 1.602 × 10⁻¹⁹ J'],
  ['Temperature', 'K = °C + 273.15 · °F = (9/5)°C + 32'],
  ['Water', 'c = 4.184 J/(g·°C) · d = 1.00 g/mL · K_f = 1.86 °C/m · K_b = 0.512 °C/m'],
  ['Molar volume at STP', '22.4 L/mol (0 °C, 1 atm)']
];

var CHEM_FORMULAS = [
  ['Measurement', 'd = m/V · % yield = actual/theoretical × 100'],
  ['Solutions', 'M = mol/L · M₁V₁ = M₂V₂ · m = mol solute/kg solvent'],
  ['Thermochemistry', 'ΔE = q + w · w = −PΔV · q = mcΔT · q(soln) = −q(rxn)'],
  ['Enthalpy', 'ΔH°rxn = Σ nΔH°f(products) − Σ mΔH°f(reactants) ≈ Σ BE(broken) − Σ BE(formed)'],
  ['Light', 'c = λν · E = hν = hc/λ · λ = h/(mv) · Δx·mΔv ≥ h/4π'],
  ['Hydrogen atom', 'ΔE = −2.18 × 10⁻¹⁸ J (1/n²final − 1/n²initial) · 1/λ = R(1/n₁² − 1/n₂²)'],
  ['Gases', 'PV = nRT · d = PM/RT · Pᵢ = XᵢP(total) · u(rms) = √(3RT/M) · rate₁/rate₂ = √(M₂/M₁)'],
  ['Phases', 'ln(P₂/P₁) = −(ΔH(vap)/R)(1/T₂ − 1/T₁)'],
  ['Unit cells', 'SC a = 2r (1 atom) · BCC a = 4r/√3 (2 atoms) · FCC a = 2√2·r (4 atoms)'],
  ['Colligative', 'ΔT(b) = iK(b)m · ΔT(f) = iK(f)m · Π = iMRT · P = X(solvent)P°'],
  ['Nuclear', 'ln(N/N₀) = −kt · t½ = 0.693/k · ΔE = Δmc²']
];

var CHEM_SOLUBILITY = [
  ['Soluble: all Group 1 (Li⁺, Na⁺, K⁺ …) and NH₄⁺ compounds', 'no exceptions'],
  ['Soluble: nitrates NO₃⁻, acetates CH₃COO⁻, chlorates ClO₃⁻, perchlorates ClO₄⁻', 'no exceptions'],
  ['Soluble: chlorides Cl⁻, bromides Br⁻, iodides I⁻', 'except with Ag⁺, Pb²⁺, Cu⁺, Hg₂²⁺'],
  ['Soluble: fluorides F⁻', 'except PbF₂ and Group 2 fluorides'],
  ['Soluble: sulfates SO₄²⁻', 'except CaSO₄, SrSO₄, BaSO₄, Ag₂SO₄, PbSO₄, Hg₂SO₄'],
  ['Insoluble: metal hydroxides OH⁻', 'except Group 1, Ca(OH)₂, Sr(OH)₂, Ba(OH)₂'],
  ['Insoluble: carbonates CO₃²⁻, chromates CrO₄²⁻, phosphates PO₄³⁻', 'except Group 1 and NH₄⁺'],
  ['Insoluble: sulfides S²⁻', 'except Group 1, Group 2 and NH₄⁺']
];

/* Where element Z sits: [row, column] on an 18-column table, with the
   lanthanides and actinides in two rows of their own underneath. */
function chemElementSpot(z) {
  if (z === 1) return [1, 1];
  if (z === 2) return [1, 18];
  var starts = [[3, 2], [11, 3], [19, 4], [37, 5], [55, 6], [87, 7]];
  for (var i = starts.length - 1; i >= 0; i--) {
    var first = starts[i][0], row = starts[i][1], k = z - first;
    if (z < first) continue;
    if (row <= 3) return [row, k < 2 ? k + 1 : k + 11];              // s then p, no d
    if (row <= 5) return [row, k + 1];                                // full 18
    if (k < 2) return [row, k + 1];                                   // Cs Ba / Fr Ra
    if (k < 17) return [row === 6 ? 9 : 10, k + 1];                   // La-Lu / Ac-Lr row
    return [row, k - 14 + 1];                                         // Hf onward / Rf onward
  }
  return [1, 1];
}

function chemPeriodicTableHtml() {
  var h = '<div class="pt-grid" role="table" aria-label="Periodic table with molar masses">';
  CHEM_ELEMENTS.forEach(function (entry, i) {
    var z = i + 1, bits = entry.split(' '), spot = chemElementSpot(z);
    var block = (z >= 57 && z <= 71) || (z >= 89 && z <= 103) ? ' f' : '';
    h += '<div class="pt-el' + block + '" style="grid-row:' + spot[0] + ';grid-column:' + spot[1] + '" ' +
      'title="' + z + ' ' + bits[0] + ' ' + bits[1] + ' g/mol"><span class="pt-z">' + z + '</span>' +
      '<b>' + bits[0] + '</b><span class="pt-m">' + bits[1] + '</span></div>';
  });
  h += '<div class="pt-gap" style="grid-row:8;grid-column:1/-1"></div>';
  return h + '</div>';
}

function chemDataSheetHtml() {
  var rows = function (list) {
    return list.map(function (r) { return '<tr><th>' + esc(r[0]) + '</th><td>' + esc(r[1]) + '</td></tr>'; }).join('');
  };
  return '<div class="ds-card" role="dialog" aria-modal="false" aria-label="Chemistry data sheet">' +
    '<div class="ds-head"><b>Data sheet</b><span class="small">what the exam hands you</span>' +
    '<span class="spacer"></span><button type="button" onclick="toggleChemDataSheet(false)">Close</button></div>' +
    '<div class="ds-body">' + chemPeriodicTableHtml() +
    '<div class="ds-cols"><section><h4>Constants</h4><table>' + rows(CHEM_CONSTANTS) + '</table></section>' +
    '<section><h4>Useful equations</h4><table>' + rows(CHEM_FORMULAS) + '</table></section></div>' +
    '<section><h4>Solubility rules (Table 4.1)</h4><table>' + rows(CHEM_SOLUBILITY) + '</table></section>' +
    '</div></div>';
}

function toggleChemDataSheet(show) {
  var el = document.getElementById('chem-datasheet');
  if (show === undefined) show = !el;
  if (!show) { if (el) el.remove(); return; }
  if (el) return;
  el = document.createElement('div');
  el.id = 'chem-datasheet';
  el.innerHTML = chemDataSheetHtml();
  el.addEventListener('click', function (e) { if (e.target === el) toggleChemDataSheet(false); });
  document.body.appendChild(el);
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && document.getElementById('chem-datasheet')) {
    e.stopPropagation();
    toggleChemDataSheet(false);
  }
}, true);

/* The button that sits beside Copy on a chemistry question card. */
function questionDataButton(q) {
  if (typeof isChemQuestion !== 'function' || !isChemQuestion(q)) return '';
  return '<button type="button" class="qcopy qdata" onclick="toggleChemDataSheet()" ' +
    'title="Periodic table, constants, equations and solubility rules" aria-label="Open the data sheet">' +
    '<span class="qcopy-ico" aria-hidden="true">⚗</span><span class="qcopy-txt">Data</span></button>';
}
