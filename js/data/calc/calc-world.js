/* The Converging Isles - MA 16200, Calculus II.

   The C region is one gym per textbook chapter. This one is not, because a
   calculus course is not shaped like a textbook. It is shaped like a calendar:
   ten quizzes, three evening exams, one final. So a GYM IS A QUIZ - the same
   two-to-four lessons the real quiz covers - and the exams are boss battles
   that interrupt the run.

   The structure pays for itself. Five lessons (10, 11, 20, 27 and 35) appear on
   no quiz at all; the only place the course ever tests them is an exam. That
   makes the bosses mandatory content rather than optional review, and it is why
   each exam owns a revision route of its own. */

window.CALC_LESSONS = {
  1:  'Vectors in the plane',
  2:  'Vectors in three dimensions',
  3:  'Dot products',
  4:  'Cross products',
  5:  'Regions between curves',
  6:  'Volumes by slicing: disks and washers',
  7:  'Volumes by shells',
  8:  'Arc length and surface area',
  9:  'Physical applications I: density, mass and work',
  10: 'Physical applications II: pumping fluid and force on a dam',
  11: 'Integration by parts and basic approaches',
  12: 'Trigonometric integrals I: sines and cosines',
  13: 'Trigonometric integrals II: tangents and secants',
  14: 'Trigonometric substitution I',
  15: 'Trigonometric substitution II: definite integrals and completing the square',
  16: 'Partial fractions I',
  17: 'Partial fractions II and choosing a strategy',
  18: 'Improper integrals',
  19: 'Sequences and series overview',
  20: 'Sequences: limits, monotonicity and boundedness',
  21: 'Infinite series: geometric and telescoping',
  22: 'Divergence Test and Integral Test',
  23: 'Comparison Tests',
  24: 'Alternating series, absolute and conditional convergence',
  25: 'Ratio Test and Root Test',
  26: 'Choosing a convergence test',
  27: 'Approximating functions with polynomials I',
  28: 'Approximating functions with polynomials II',
  29: 'Power series I: radius and interval of convergence',
  30: 'Power series II: building new series from old',
  31: 'Taylor series',
  32: 'Working with Taylor series',
  33: 'Polar coordinates I',
  34: 'Polar coordinates II: graphs and tangent lines',
  35: 'Area and arc length in polar coordinates'
};

/* The four units the manual is organised into, kept for labels. */
window.CALC_UNITS = {
  1: { name: 'Vectors and applications of integration', lessons: [1,2,3,4,5,6,7,8,9,10,11] },
  2: { name: 'Integration techniques and the start of sequences', lessons: [12,13,14,15,16,17,18,19,20] },
  3: { name: 'Infinite series and convergence tests', lessons: [21,22,23,24,25,26,27] },
  4: { name: 'Power series, Taylor series and polar coordinates', lessons: [28,29,30,31,32,33,34,35] }
};

/* ==========================================================================
   TEN GYMS, ONE PER QUIZ
   ========================================================================== */
window.CALC_CHAPTERS = [
  {
    n: 1, quiz: 1, lessons: [1, 2, 3, 4], unit: 1,
    type: 'flying', teamTypes: ['flying', 'fighting'], ace: 68,
    route: 'Route 1 - Landfall Bearing',
    title: 'Vectors',
    leader: 'Rhea Dexter', epithet: 'Magnitude, Direction, Right Hand', badge: 'Arrow Badge',
    blurb: 'Components, magnitude, the dot product that measures agreement and the cross product that leaves the plane.',
    notes: [
      'A vector is a heading and a length, nothing else. In components v = <a, b>, and |v| = sqrt(a² + b²). In three dimensions v = <a, b, c> and |v| = sqrt(a² + b² + c²).',
      'From point P to point Q the vector is <x₂ − x₁, y₂ − y₁, z₂ − z₁>. Subtract the tail from the head, always in that order.',
      'The unit vector in the direction of v is v/|v|. To get a vector of length 7 pointing along v, take 7v/|v|.',
      'Dot product: u · v = u₁v₁ + u₂v₂ + u₃v₃, and also u · v = |u||v|cos θ. It returns a NUMBER, not a vector.',
      'The sign of the dot product alone classifies the angle: positive is acute, zero is a right angle, negative is obtuse. You never need to compute the cosine to answer that question.',
      'Scalar projection comp_v u = (u · v)/|v|. Vector projection proj_v u = ((u · v)/|v|²) v. The denominators differ; that is the single most common lost point.',
      'Cross product exists only in three dimensions. u × v is perpendicular to BOTH u and v, with direction set by the right-hand rule, so u × v = −(v × u) and u × u = 0.',
      '|u × v| = |u||v|sin θ is the area of the parallelogram they span; half of it is the triangle. The scalar triple product |u · (v × w)| is the volume of the parallelepiped.',
      'Work is a dot product, W = F · d. Torque is a cross product, r × F. If the answer should be a number, reach for the dot; if it should be a direction, reach for the cross.'
    ]
  },
  {
    n: 2, quiz: 2, lessons: [5, 6], unit: 1,
    type: 'grass', teamTypes: ['grass', 'steel'], ace: 470,
    route: 'Route 2 - The Fenced Strip',
    title: 'Areas and Slices',
    leader: 'Della Twain', epithet: 'Top Minus Bottom', badge: 'Between Badge',
    blurb: 'The region caught between two curves, and the first solids you build by stacking its cross-sections.',
    notes: [
      'Area between curves in x: A = ∫ₐᵇ (top − bottom) dx. In y: A = ∫ (right − left) dy. Getting the order backwards costs you a sign, not a method.',
      'Find the intersections FIRST. If the curves swap places inside the interval you must split the integral there, or integrate the absolute value in pieces.',
      'Integrating in dy is often one integral where dx would be two. Look at the picture before you commit to a variable.',
      'Volume by slicing: V = ∫ₐᵇ A(x) dx, where A(x) is the area of the cross-section at x. Every solid in this lesson is that one formula with a different A.',
      'Disk: A = πR², so V = π∫ f(x)² dx when the region touches the axis.',
      'Washer: A = π(R² − r²), so V = π∫ (outer² − inner²) dx when there is a gap. Note carefully that (f − g)² is NOT f² − g². That single error is worth more lost marks than any other in the chapter.',
      'The axis matters. Revolving about y = c makes the radius |f(x) − c|, not f(x). Draw the radius as a segment before you square anything.',
      'Known cross-sections - squares, equilateral triangles, semicircles - are not a separate technique. Write A(x) for that shape in terms of the side length the region gives you, then integrate.'
    ]
  },
  {
    n: 3, quiz: 3, lessons: [7, 8, 9], unit: 1,
    type: 'steel', teamTypes: ['steel', 'bug'], ace: 601,
    route: 'Route 3 - Lathe and Line',
    title: 'Shells, Arc Length and Work',
    leader: 'Axel Turner', epithet: 'Everything Spins', badge: 'Revolution Badge',
    blurb: 'Volumes by shells, the true length of a curve, and the first integrals that measure physical effort.',
    notes: [
      'Shells: V = 2π∫ (radius)(height) dx. Revolving about the y-axis that is 2π∫ x f(x) dx. The radius is the distance from the axis to the shell, not from the origin.',
      'Shells versus washers is a choice, not a rule. Pick whichever one lets you avoid solving the equation for the other variable.',
      'Arc length: L = ∫ₐᵇ sqrt(1 + f′(x)²) dx. The derivative is squared inside the radical, and the 1 is never optional.',
      'Surface of revolution about the x-axis: S = 2π∫ f(x) sqrt(1 + f′(x)²) dx. It is arc length with a circumference glued on - 2π times the radius times the arc element.',
      'Mass from density: m = ∫ₐᵇ ρ(x) dx for a rod. The units tell you whether you are integrating a density or a total.',
      'Work with a variable force: W = ∫ₐᵇ F(x) dx. For a spring, Hooke gives F = kx, so W = ∫ kx dx = ½k(b² − a²). Find k from the given stretch before you integrate.',
      'Every physical application in this chapter is the same three steps: slice, write the contribution of one slice, integrate. If you can state what one slice contributes, the integral writes itself.'
    ]
  },
  {
    n: 4, quiz: 4, lessons: [12, 13, 14], unit: 2,
    type: 'electric', teamTypes: ['electric', 'fairy'], ace: 181,
    route: 'Route 4 - Standing Wave',
    title: 'Trigonometric Integrals',
    leader: 'Cosima Wave', epithet: 'Odd Power, Save One', badge: 'Identity Badge',
    blurb: 'Sines, cosines, tangents and secants, and the first substitution that puts x in disguise.',
    notes: [
      '∫ sinᵐx cosⁿx dx with an ODD power: peel one factor off, convert the rest with sin²x + cos²x = 1, and substitute. The peeled factor becomes du.',
      'Both powers EVEN: no factor to peel, so use the half-angle identities sin²x = (1 − cos 2x)/2 and cos²x = (1 + cos 2x)/2 and integrate again.',
      '∫ tanᵐx secⁿx dx with an even power of sec: save sec²x for du and convert the rest with sec²x = 1 + tan²x.',
      'Same integral with an odd power of tan: save sec x tan x for du and convert the rest with tan²x = sec²x − 1.',
      '∫ sec x dx = ln|sec x + tan x| + C. It is worth memorising rather than rederiving under time pressure.',
      'Trigonometric substitution matches the radical to a Pythagorean identity: sqrt(a² − x²) takes x = a sin θ, sqrt(a² + x²) takes x = a tan θ, sqrt(x² − a²) takes x = a sec θ.',
      'Draw the reference triangle immediately. It is what converts the answer back from θ to x at the end, and it is faster than re-deriving each inverse relation.',
      'Do not forget dx. Every substitution brings its own differential - dx = a cos θ dθ and so on - and dropping it silently changes the answer.'
    ]
  },
  {
    n: 5, quiz: 5, lessons: [15, 16, 17], unit: 2,
    type: 'ghost', teamTypes: ['ghost', 'ice'], ace: 778,
    route: 'Route 5 - The Broken Fraction',
    title: 'Substitution and Partial Fractions',
    leader: 'Thea Sinclair', epithet: 'Wear Another Shape', badge: 'Triangle Badge',
    blurb: 'Definite substitution done without ever changing back, and one fraction shattered into pieces you can integrate.',
    notes: [
      'For a DEFINITE trigonometric substitution, change the limits to θ as you substitute and never convert back to x. The triangle is only needed for indefinite integrals.',
      'When you see x² + bx + c under a radical, complete the square first. It turns an unrecognisable expression into one of the three standard forms.',
      'Partial fractions requires the numerator degree to be LESS than the denominator degree. If it is not, do polynomial long division first and integrate the quotient separately.',
      'Factor the denominator completely before writing any coefficients. The factorisation dictates the form of the decomposition and nothing else does.',
      'Distinct linear factors give A/(x − a) + B/(x − b). Repeated linear factors give A/(x − a) + B/(x − a)², one term per power up to the multiplicity.',
      'An irreducible quadratic factor gets a linear numerator: (Ax + B)/(x² + bx + c). A constant on top is not general enough and will fail to solve.',
      'Solve for the coefficients by substituting convenient roots, not by expanding everything. Setting x = a kills every term but one.',
      'The strategy order for any integral you do not recognise: simplify algebraically, try a plain u-substitution, then parts, then trigonometric methods, then partial fractions. Most exam integrals fall to one of the first three.'
    ]
  },
  {
    n: 6, quiz: 6, lessons: [18, 19], unit: 2,
    type: 'dragon', teamTypes: ['dragon', 'normal'], ace: 384,
    route: 'Route 6 - Where the Bound Runs Out',
    title: 'Improper Integrals and Sequences',
    leader: 'Lim Everard', epithet: 'The Limit Does the Work', badge: 'Infinity Badge',
    blurb: 'Integrals whose bounds or integrands misbehave, and the first look at what a series even is.',
    notes: [
      'Type I is an infinite limit of integration: ∫ₐ^∞ f dx = lim_{b→∞} ∫ₐᵇ f dx. Write the limit down. An improper integral evaluated without one is not answered, it is asserted.',
      'Type II is an infinite discontinuity inside or at the edge of the interval. Split at the bad point and take a one-sided limit toward it from each side.',
      'If an integral is improper at BOTH ends, split it into two independent pieces. Both must converge for the whole to converge.',
      'The p-integral at infinity: ∫₁^∞ dx/xᵖ converges exactly when p > 1. Near zero it flips: ∫₀¹ dx/xᵖ converges exactly when p < 1.',
      'Comparison works for integrals too. If 0 ≤ f ≤ g and ∫g converges, so does ∫f; if ∫f diverges, so does ∫g.',
      'A SEQUENCE is a list a₁, a₂, a₃, …; a SERIES is the sum of one. Confusing the two is the root of most series errors later, so fix the distinction now.',
      'A series converges exactly when its sequence of PARTIAL SUMS sₙ = a₁ + … + aₙ converges. Every convergence test is a shortcut around computing that limit directly.'
    ]
  },
  {
    n: 7, quiz: 7, lessons: [21, 22, 23], unit: 3,
    type: 'poison', teamTypes: ['poison', 'water'], ace: 748,
    route: 'Route 7 - First Soundings',
    title: 'Series and the First Tests',
    leader: 'Cora Verge', epithet: 'Does It Survive?', badge: 'Convergence Badge',
    blurb: 'The two series you can actually sum, and the first three tests for the ones you cannot.',
    notes: [
      'Geometric series Σ arⁿ converges exactly when |r| < 1, and then the sum is a/(1 − r) where a is the FIRST TERM ACTUALLY WRITTEN, whatever index it starts at.',
      'Telescoping series: write out the partial sum, cancel the middle, and take the limit of what survives. Do not guess the cancellation - write four terms.',
      'Divergence Test: if aₙ does not tend to 0, the series diverges. It can NEVER prove convergence. aₙ → 0 tells you nothing on its own.',
      'Integral Test: if f is positive, continuous and decreasing on [1, ∞) with f(n) = aₙ, then Σaₙ and ∫₁^∞ f dx converge or diverge together. Check all three conditions before using it.',
      'The integral and the series do not have the same VALUE. The test transfers the verdict only.',
      'p-series Σ1/nᵖ converges exactly when p > 1. The harmonic series p = 1 diverges, slowly and famously.',
      'Direct Comparison: bound your terms above by something convergent or below by something divergent. The inequality must point the right way for the conclusion you want.',
      'Limit Comparison: if lim aₙ/bₙ is finite AND positive, the two series share a fate. It is usually easier than direct comparison for ratios of polynomials - compare with the ratio of leading powers.'
    ]
  },
  {
    n: 8, quiz: 8, lessons: [24, 25, 26], unit: 3,
    type: 'dark', teamTypes: ['dark', 'poison'], ace: 169,
    route: 'Route 8 - Sign and Size',
    title: 'Alternating Series and Choosing a Test',
    leader: 'Alta Rennick', epithet: 'Sign First, Then Size', badge: 'Alternating Badge',
    blurb: 'Series that change sign, the two tests that handle factorials and powers, and the judgement call that ties it together.',
    notes: [
      'Alternating Series Test: the terms must decrease in SIZE and tend to 0. Both conditions, on |aₙ|, not on aₙ.',
      'Alternating series remainder: the error after n terms is at most the size of the FIRST OMITTED TERM. It is the cleanest error bound in the course - use it whenever a question asks how many terms are needed.',
      'Absolute convergence means Σ|aₙ| converges, and it IMPLIES convergence. Conditional convergence means Σaₙ converges but Σ|aₙ| does not - the alternating harmonic series is the standard example.',
      'Ratio Test: L = lim |aₙ₊₁/aₙ|. L < 1 converges absolutely, L > 1 diverges, L = 1 is inconclusive and you must switch tests.',
      'Reach for the Ratio Test when the terms contain factorials or products like n! or (2n)!. Almost everything cancels and what is left is a simple limit.',
      'Root Test: L = lim ⁿ√|aₙ|. Reach for it when the whole term is raised to the nth power. Same three verdicts as the Ratio Test.',
      'Choosing a test, in order: does aₙ → 0? Is it geometric or p? Are there factorials (Ratio) or nth powers (Root)? Is it a ratio of polynomials (Limit Comparison)? Does it alternate? Is it positive, continuous and decreasing (Integral)?',
      'A test that comes back inconclusive has not failed you - it has told you to switch. Write down which test you used and why; on an exam the reasoning carries marks the answer alone does not.'
    ]
  },
  {
    n: 9, quiz: 9, lessons: [28, 29, 30, 31], unit: 4,
    type: 'psychic', teamTypes: ['psychic'], ace: 65,
    route: 'Route 9 - Radius of Belief',
    title: 'Power Series and Taylor Series',
    leader: 'Rae Diuss', epithet: 'How Far From the Centre', badge: 'Radius Badge',
    blurb: 'Polynomials that impersonate functions, how far out the impersonation holds, and where the coefficients come from.',
    notes: [
      'The Taylor polynomial of degree n centred at a is pₙ(x) = Σₖ₌₀ⁿ f⁽ᵏ⁾(a)(x − a)ᵏ/k!. Centred at 0 it is called a Maclaurin polynomial.',
      'The Lagrange error bound: |Rₙ(x)| ≤ M|x − a|ⁿ⁺¹/(n + 1)!, where M bounds |f⁽ⁿ⁺¹⁾| on the interval between a and x. Finding M is most of the work.',
      'A power series Σcₙ(x − a)ⁿ converges on an interval centred at a. Find the radius R with the Ratio Test applied to the terms including the (x − a)ⁿ factor.',
      'The Ratio Test never decides the ENDPOINTS. Substitute x = a − R and x = a + R separately and test each resulting numeric series by hand. That is where the marks are.',
      'Three possibilities only: converges at a alone (R = 0), on a finite interval, or everywhere (R = ∞).',
      'Build new series from old by substituting into a known one, multiplying by a power of x, differentiating, or integrating. Differentiating and integrating preserve R, though endpoint behaviour can change.',
      'The Taylor series of f at a is the power series whose coefficients are cₙ = f⁽ⁿ⁾(a)/n!. Every technique above is a way to avoid computing those derivatives one at a time.'
    ]
  },
  {
    n: 10, quiz: 10, lessons: [32, 33, 34], unit: 4,
    type: 'fairy', teamTypes: ['fairy', 'psychic'], ace: 671,
    route: 'Route 10 - Rose and Spiral',
    title: 'Taylor at Work and Polar Coordinates',
    leader: 'Rose Kardia', epithet: 'Angle First, Then Reach', badge: 'Rose Badge',
    blurb: 'Known series put to work on impossible limits and integrals, then a coordinate system where the pretty graphs live.',
    notes: [
      'Memorise six Maclaurin series: eˣ = Σxⁿ/n!, sin x, cos x, 1/(1 − x) = Σxⁿ for |x| < 1, ln(1 + x) and arctan x. Nearly every "find the series" question is one of these with a substitution.',
      'To find the limit of a sequence given by a formula, treat n as a continuous variable, which makes the usual limit tools available.',
      'Series also integrate functions with no elementary antiderivative, such as ∫ sin(x²) dx or ∫ e^(−x²) dx. Expand, integrate term by term, keep as many terms as the required accuracy needs.',
      'Polar to rectangular: x = r cos θ, y = r sin θ. Rectangular to polar: r² = x² + y², tan θ = y/x. Check the quadrant before trusting the arctangent.',
      'A point has infinitely many polar representations - (r, θ + 2π) is the same point, and (−r, θ + π) is too. Uniqueness is a rectangular luxury.',
      'Know the shapes on sight: r = a is a circle, r = a ± b cos θ or a ± b sin θ is a cardioid or limaçon, and r = a cos kθ is a rose with k petals when k is ODD and 2k petals when k is EVEN.',
      'Slope in polar is dy/dx = (dy/dθ)/(dx/dθ) with x = r cos θ and y = r sin θ, so you must product-rule through r(θ). It is NOT dr/dθ.'
    ]
  }
];

/* ==========================================================================
   FOUR BOSS BATTLES
   The exams do not wait at the end of the region. They interrupt it, and each
   one owns lessons no quiz ever covered.
   ========================================================================== */
window.CALC_ELITE = [
  {
    id: 'x1', name: 'Elara Slate', epithet: 'Evening Exam I',
    types: ['water', 'dark'], ace: 321,
    after: 3, lessons: [1,2,3,4,5,6,7,8,9,10,11], only: [10, 11],
    chapters: [1, 2, 3, 91],
    route: 'Revision Route I - The Long Reservoir',
    intro: 'Eleven lessons, fifty minutes. Two of them were never on a quiz, so this is the first time anyone has asked you about pumping a tank or trading an integral away. Begin.',
    rematch: 'Again? The reservoir has not moved and neither have I.'
  },
  {
    id: 'x2', name: 'Otto Graff', epithet: 'Evening Exam II',
    types: ['dark', 'ghost'], ace: 571,
    after: 6, lessons: [12,13,14,15,16,17,18,19,20], only: [20],
    chapters: [4, 5, 6, 92],
    route: 'Revision Route II - The Technique Yard',
    intro: 'Name the technique before you touch the pencil. Every integral in this room is wearing a disguise, and the only lesson you have not been quizzed on is the one about whether a sequence settles down.',
    rematch: 'Name it again. Faster this time.'
  },
  {
    id: 'x3', name: 'Sera Conn', epithet: 'Evening Exam III',
    types: ['psychic', 'poison'], ace: 579,
    after: 8, lessons: [21,22,23,24,25,26,27], only: [27],
    chapters: [7, 8, 93],
    route: 'Revision Route III - The Sounding Line',
    intro: 'Converges to what? Do not tell me that it converges. Tell me the number. And you have not been quizzed on approximating a function with a polynomial yet, so we will start there.',
    rematch: 'Still want the number? Good.'
  },
  {
    id: 'final', name: 'Dean Aster', epithet: 'The Final', champion: true,
    types: ['psychic', 'dragon'], ace: 150,
    after: 10, lessons: [1,35], only: [35],
    chapters: [1,2,3,4,5,6,7,8,9,10,91,92,93,94],
    route: 'Revision Route IV - Everything, In Any Order',
    intro: 'Thirty-five lessons, no warning about which. One of them - the area swept out by a polar curve - has appeared on no quiz and no evening exam. It appears now. Sit down.',
    rematch: 'The final is never really over. Sit down again.'
  }
];

/* ==========================================================================
   THE NINE ISLES
   ========================================================================== */
window.CALC_LOCATIONS = [
  { id: 'harbour', name: 'Origin Harbour', badges: 0,
    blurb: 'Where you make landfall. Everything on the Isles is measured from this point.' },
  { id: 'sliderule', name: 'The Slide Rule', badges: 0,
    blurb: 'The dockside tavern. Long tables, cheap refills, and an argument about whether the series converges.' },
  { id: 'flats', name: 'Riemann Flats', badges: 0,
    blurb: 'Tidal shallows that drain in even strips. The first place anyone learns to add up rectangles.' },
  { id: 'lathe', name: 'Lathe Point', badges: 2,
    blurb: 'A boatyard where every hull is turned on an axis. Loud, and covered in shavings.',
    locked: 'The yard takes visitors from two badges. There is machinery running.' },
  { id: 'helix', name: 'Helix Ridge', badges: 3,
    blurb: 'A spiral path up the headland, and the only walk on the Isles whose length people argue about.',
    locked: 'The spiral path is roped off below three badges. It is longer than it looks.' },
  { id: 'table', name: 'The Integral Table', badges: 5,
    blurb: 'A library of nothing but reference tables. The quietest building in the archipelago.',
    locked: 'Reading rights start at five badges. The librarian is not negotiable.' },
  { id: 'observatory', name: 'Hawthorn Observatory', badges: 6,
    blurb: 'Professor Hawthorn’s rooms, where they insist a polynomial can impersonate anything if you stay close enough to the centre.',
    locked: 'The observatory admits trainers from six badges. They are mid-measurement.' },
  { id: 'deep', name: 'Cauchy Deep', badges: 8,
    blurb: 'Cold water where divergent things sink. The partial sums go down and never come back.',
    locked: 'Nobody takes you out over the Deep under eight badges.' },
  { id: 'hall', name: 'The Exam Hall', badges: 9,
    blurb: 'Three evening papers and a Final. The chairs face the front and there is a clock on the wall.',
    locked: 'The hall opens to challengers with nine badges.' }
];

window.CALC_GYM_DIALOGUE = {
  1:  { intro: 'Before anything else: a vector is a heading and a length. Tell me which of those the dot product measures and which one the cross product throws away, and we can start.',
        rematch: 'Right hand. Every time. Again.' },
  2:  { intro: 'Two curves, and the strip of water caught between them. Top minus bottom - but only after you have found where they cross.',
        rematch: 'Same strip. Find the crossings first.' },
  3:  { intro: 'Everything in this yard spins. Shells or washers, your choice, but you only get to make it once per problem. Choose the one that does not make you solve for the other variable.',
        rematch: 'Back on the lathe. Pick your method.' },
  4:  { intro: 'Odd power, save one. That single sentence handles most of what I am about to ask you. The rest is knowing which identity to reach for once you have saved it.',
        rematch: 'Peel one off. You know this.' },
  5:  { intro: 'Everything here is wearing something that is not its own shape. If the limits are definite, change them and never look back.',
        rematch: 'New disguise, same trick.' },
  6:  { intro: 'The bound runs out and the limit does the work. Write the limit down - I do not accept an improper integral that was merely asserted.',
        rematch: 'Write the limit. Then we talk.' },
  7:  { intro: 'Three tests, and one of them can only ever say no. Tell me which one that is before we begin.',
        rematch: 'The Divergence Test still cannot prove convergence. Again.' },
  8:  { intro: 'Sign first, then size. And when you finish, tell me not just whether it converged but whether it converged absolutely - those are different answers.',
        rematch: 'Absolutely or conditionally? Be specific.' },
  9:  { intro: 'A polynomial can impersonate a function beautifully, right up until it cannot. My whole gym is about finding out exactly where that is - and the endpoints are not optional.',
        rematch: 'Check the endpoints. You always forget the endpoints.' },
  10: { intro: 'Six series to know by heart, and then a coordinate system where the graphs are finally worth looking at. Angle first, then reach.',
        rematch: 'How many petals? Odd or even? Go.' }
};

/* The lessons no quiz covers live in chapters 91-94 so the exams can draw them.
   They are NOT in CALC_CHAPTERS - there is no gym, no badge and no map row for
   them - but everything that looks a chapter up by number has to be able to find
   them, or the first exam question from lesson 10 takes the battle screen down. */
window.CALC_EXAM_CHAPTERS = [
  { n: 91, examOnly: true, exam: 'x1', lessons: [10, 11], type: 'water',
    title: 'Pumping, dams and integration by parts',
    route: 'Revision Route I - The Long Reservoir',
    blurb: 'The two Unit I lessons that appear on no quiz.',
    notes: [
      'Pumping a tank: the work to lift one slab is its weight times the distance THAT slab must rise. Density and gravity are constants; the distance is what varies, and that is why it is an integral.',
      'Hydrostatic force on a vertical wall: pressure grows linearly with depth, and the width of the wall may change with depth too. Both belong in the integrand.',
      'Integration by parts: ∫u dv = uv − ∫v du. You are trading one integral for another, so only make the trade if ∫v du is easier.',
      'LIATE picks u: Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential. Earlier in the list makes a better u because differentiating it simplifies.',
      '∫ln x dx has no obvious dv, so take dv = dx. Then v = x and the answer is x ln x − x + C.',
      'Applying parts twice to ∫eˣ sin x dx brings the original integral back with a coefficient. Move it to the left side and divide - recognising the loop is the whole trick.'
    ] },
  { n: 92, examOnly: true, exam: 'x2', lessons: [20], type: 'normal',
    title: 'Sequences: limits, monotonicity and boundedness',
    route: 'Revision Route II - The Technique Yard',
    blurb: 'The Unit II lesson that appears on no quiz.',
    notes: [
      'Monotonic means the sequence never changes direction - entirely non-increasing or entirely non-decreasing. An alternating sequence is never monotonic.',
      'Monotone Convergence Theorem: monotonic AND bounded implies convergent. Neither alone is enough - 1, 2, 3, … is monotonic and unbounded; (−1)ⁿ is bounded and not monotonic.',
      'To find the limit of a sequence given by a formula, treat n as a continuous variable, which makes the usual limit tools available.',
      'Convergence forces boundedness, but not monotonicity: (−1)ⁿ/n converges to 0 while flipping direction every step.'
    ] },
  { n: 93, examOnly: true, exam: 'x3', lessons: [27], type: 'psychic',
    title: 'Approximating functions with polynomials I',
    route: 'Revision Route III - The Sounding Line',
    blurb: 'The Unit III lesson that appears on no quiz.',
    notes: [
      'The linear approximation of f at a is f(a) + f′(a)(x − a) - the tangent line, and the degree-1 Taylor polynomial.',
      'A degree-n Taylor polynomial matches f in its value and its first n derivatives at a. That matching condition is what forces the coefficients to be f⁽ᵏ⁾(a)/k!.',
      'The error carries a factor of (x − a)ⁿ⁺¹, so accuracy falls off with distance from the centre.',
      'Two levers improve an approximation: raise the degree, or move the centre closer to the point you care about.'
    ] },
  { n: 94, examOnly: true, exam: 'final', lessons: [35], type: 'fairy',
    title: 'Area and arc length in polar coordinates',
    route: 'Revision Route IV - Everything, In Any Order',
    blurb: 'The Unit IV lesson that appears on no quiz, and the last thing the Final asks.',
    notes: [
      'Polar area: A = ½∫ r² dθ. The element is a thin circular sector, not a rectangle. Forgetting the one-half doubles every answer.',
      'Polar arc length: L = ∫ √(r² + (dr/dθ)²) dθ. Both r and its rate of change contribute; √(1 + f′²) is the rectangular form.',
      'Find the θ range that traces the region exactly once before integrating, or a rose-petal answer comes out a multiple of the truth.',
      'Area between two polar curves subtracts the SECTOR areas: ½∫ (r_outer² − r_inner²) dθ, never the difference of the radii squared.'
    ] }
];

/* Registered by subjects.js once every data file has loaded. */
window.CALC_SUBJECT = {
  id: 'calc',
  name: 'Calculus II',
  short: 'Calc II',
  region: 'The Converging Isles',
  book: 'MA 16200 - Calculus II Field Manual',
  blurb: 'Ten quizzes, three evening exams, one final. The gyms are the quizzes.',
  mapIntro: 'Ten gyms, one per quiz on the real syllabus. Three evening exams stand ' +
    'between them at the points the course sits them, and each one is the only place ' +
    'you are ever asked about the lessons no quiz covers. You cannot walk past an exam ' +
    'you have not sat. The Final is last.',
  CHAPTERS: window.CALC_CHAPTERS,
  QBANK: null,                 // filled by calc-questions.js
  GYM_DIALOGUE: window.CALC_GYM_DIALOGUE,
  ELITE: window.CALC_ELITE,
  LOCATIONS: window.CALC_LOCATIONS,
  EXAM_CHAPTERS: window.CALC_EXAM_CHAPTERS,
  TOWNSFOLK: null              // filled by calc-townsfolk.js
};

/* Which gym, if any, covers a given lesson. Five lessons answer null on
   purpose - 10, 11, 20, 27 and 35 are exam-only. */
function calcGymForLesson(n) {
  for (var i = 0; i < CALC_CHAPTERS.length; i++) {
    if (CALC_CHAPTERS[i].lessons.indexOf(Number(n)) >= 0) return CALC_CHAPTERS[i];
  }
  return null;
}

/* The exam that stands between you and the next gym, if one is unbeaten. */
function calcExamBlocking(gymNumber) {
  for (var i = 0; i < CALC_ELITE.length; i++) {
    var e = CALC_ELITE[i];
    if (e.after < gymNumber && !(S && S.elite && S.elite[e.id])) return e;
  }
  return null;
}
