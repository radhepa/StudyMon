/* Hand-written questions for the Converging Isles.

   Notation follows the field manual: plain Unicode, no markup, because StudyMon
   escapes question text. ∫ₐᵇ for bounds, ² ³ ⁿ for powers, √( ) for radicals,
   Σ for sums, → for limits. Keep it that way - anything with a tag in it will
   render as literal angle brackets in battle.

   Tiers are what a move's power asks for: 1 recall, 2 method, 3 applied,
   4 exam-grade. Chapters 91-94 are the exam-only lessons that sit on no quiz.
   Generated questions from the manual live in calc-questions-manual.js. */
(function () {
  var serial = {};
  /* mc(chapter, lesson, tier, tag, question, correct, [wrong...], why)
     The correct answer is rotated through the choice list so the position of
     the right answer carries no information. */
  function mc(ch, lesson, t, tag, q, correct, wrong, why) {
    var n = serial[ch] = (serial[ch] || 0) + 1;
    var c = wrong.slice(), a = n % (wrong.length + 1);
    c.splice(a, 0, correct);
    CALC_QBANK[ch].push({
      id: 'k' + ch + '-x-' + String(n).padStart(3, '0'),
      chapter: ch, lesson: lesson, t: t, k: 'mcq', tag: tag,
      q: q, c: c, a: a, why: why, code: ''
    });
  }

  /* ===================== GYM 1 - Vectors (L1-4) ===================== */
  mc(1, 1, 1, 'Recall', 'For v = <3, 4>, the magnitude |v| is:', '5',
    ['7', '12', '25'], '|v| = √(3² + 4²) = √25 = 5. The magnitude is the square root of the sum of the squared components, never the sum itself.');
  mc(1, 3, 1, 'Recall', 'The dot product of two vectors returns:', 'A scalar',
    ['A vector perpendicular to both', 'A unit vector', 'A vector in the same plane'], 'u · v = u₁v₁ + u₂v₂ + u₃v₃ is a single number. The cross product is the one that returns a vector.');
  mc(1, 4, 1, "Recall", "For any vector u, the cross product u × u equals:", "The zero vector",
    ["|u|²","1","u"], "By anticommutativity, u × u = −(u × u), so u × u = 0. This also covers u = 0, for which an angle is undefined.");
  mc(1, 1, 1, "Recall", "Which formula gives a unit vector along every nonzero vector v?", "v/|v|",
    ["|v| v","v/|v|²","v · v"], "The magnitude of v/|v| is 1. The magnitude of v/|v|² is 1/|v|, which is not generally 1.");
  mc(1, 4, 1, "Recall", "The usual determinant cross product in this course is defined:", "Only in three dimensions",
    ["Only in two dimensions","In every dimension","Only for unit vectors"], "For vectors in three-dimensional Euclidean space, the usual cross product uses the right-hand orientation and has magnitude |u||v| sin θ. The dot product works in any dimension.");
  mc(1, 2, 2, 'Method', 'The vector from P(1, 2, 3) to Q(4, 6, 3) is:', '<3, 4, 0>',
    ['<5, 8, 6>', '<-3, -4, 0>', '<4, 6, 3>'], 'Head minus tail: <4−1, 6−2, 3−3>. Reversing the subtraction gives the vector pointing the other way.');
  mc(1, 4, 2, 'Method', 'The magnitude |u × v| is geometrically:', 'The area of the parallelogram spanned by u and v',
    ['The length of the projection of u onto v', 'The volume of a cube of side |u|', 'The distance between the tips of u and v'], '|u × v| = |u||v| sin θ, which is base times height for the parallelogram. Half of it is the area of the triangle.');
  mc(1, 3, 2, 'Method', 'If u · v = 0 for nonzero vectors u and v, then u and v are:', 'Orthogonal',
    ['Parallel', 'Equal in magnitude', 'Both unit vectors'], 'u · v = |u||v| cos θ, and with both magnitudes nonzero the product vanishes only when cos θ = 0, so θ = 90°.');
  mc(1, 2, 3, 'Applied', 'For u = <1, 2, 2>, the unit vector in the direction of u is:', '<1/3, 2/3, 2/3>',
    ['<1/5, 2/5, 2/5>', '<1, 2, 2>', '<1/9, 2/9, 2/9>'], '|u| = √(1 + 4 + 4) = 3, so divide each component by 3. Dividing by 9 would be dividing by |u|².');
  mc(1, 3, 3, 'Applied', 'For u = <2, −1, 3> and v = <4, 5, −1>, the angle between them is:', 'A right angle',
    ['Acute', 'Obtuse', 'Not determinable without more work'], 'u · v = 8 − 5 − 3 = 0. A zero dot product between nonzero vectors means exactly 90°, with no cosine needed.');
  mc(1, 4, 3, "Applied", "The magnitude of the scalar triple product, |u · (v × w)|, computes:", "The volume of the parallelepiped spanned by u, v and w",
    ["The total length of the three vectors","The area of the triangle they form","The angle between u and the v-w plane"], "v × w gives the area of the base as a vector normal to it; dotting with u picks out the height component.");
  mc(1, 4, 4, 'Exam', 'For nonzero u and v, |u × v| = 0 tells you that u and v are:', 'Parallel',
    ['Orthogonal', 'Of equal magnitude', 'Both in the xy-plane'], 'sin θ = 0 means θ is 0 or π. Contrast this with u · v = 0, which is the orthogonal case - the two products vanish under opposite conditions.');
  mc(1, 3, 4, 'Exam', 'A constant force F = <3, 4> moves an object along the displacement d = <2, 0>. The work done is:', '6',
    ['10', '8', '0'], 'W = F · d = 3(2) + 4(0) = 6. Work is a dot product, so only the component of force along the displacement contributes.');
  mc(1, 4, 4, "Exam", "Which identity fails in general for nonzero vectors u and v in three dimensions?", "u × v = v × u",
    ["u · v = v · u","u × v is orthogonal to u","|u × v| = |u||v| sin θ"], "The cross product anticommutes: u × v = −(v × u). The dot product does commute, which is why the two are easy to confuse under pressure.");

  /* ===================== GYM 2 - Areas and Slices (L5-6) ===================== */
  mc(2, 5, 1, 'Recall', 'The area between two curves, integrating in x, is:', '∫ₐᵇ (top − bottom) dx',
    ['∫ₐᵇ (bottom − top) dx', '∫ₐᵇ (top × bottom) dx', '∫ₐᵇ (top² − bottom²) dx'], 'Upper curve minus lower curve keeps the integrand nonnegative on the interval, so the integral comes out as a positive area.');
  mc(2, 6, 1, 'Recall', 'The general volume-by-slicing formula is:', 'V = ∫ₐᵇ A(x) dx',
    ['V = ∫ₐᵇ A(x)² dx', 'V = 2π∫ₐᵇ A(x) dx', 'V = π∫ₐᵇ A(x) dx'], 'Every solid in this lesson is that one formula. Disks, washers and known cross-sections differ only in what A(x) is.');
  mc(2, 6, 1, 'Recall', 'The disk method uses the cross-sectional area:', 'πR²',
    ['2πR', 'π(R² − r²)', 'πR'], 'A disk is a full circle of radius R. π(R² − r²) is the washer, which is what you use when the solid has a hole.');
  mc(2, 5, 1, "Recall", "For a region enclosed only by two curves, with no interval specified, what determines the integration endpoints?", "Find where the curves intersect",
    ["Differentiate both curves","Convert both to polar form","Check that both are positive"], "Find the intersections that bound the region, then check the order of the curves between them. A separately stated interval can supply endpoints instead.");
  mc(2, 6, 2, "Method", "Rotating a point (x, f(x)) about the line y = 2 gives a circle of radius:", "|f(x) − 2|",
    ["f(x)","f(x) + 2","f(x)/2"], "The radius is always the distance from the axis of revolution to the curve. Using f(x) silently assumes the axis is y = 0.");
  mc(2, 6, 2, "Method", "For washer radii f(x) ≥ g(x) ≥ 0, why is the volume π∫ (f² − g²) dx?", "Each washer has area πf² − πg²",
    ["The squares cancel","The washer area is π(f − g)²","The integral of a difference is always a difference of squares"], "The cross-sectional area is the outer disk area minus the inner disk area: πf(x)² − πg(x)². Integrate these areas along the axis.");
  mc(2, 5, 2, 'Method', 'When two curves cross inside the interval of integration, you should:', 'Split the integral at the crossing point',
    ['Integrate the average of the two', 'Use the absolute value of the limits', 'Rotate the region first'], 'Which curve is on top changes at the crossing, so a single (top − bottom) expression is wrong on one side of it.');
  mc(2, 5, 3, 'Applied', 'The area enclosed by y = x and y = x² between their intersections is:', '1/6',
    ['1/2', '1/3', '1'], 'They meet at x = 0 and x = 1, with the line above the parabola. ∫₀¹ (x − x²) dx = 1/2 − 1/3 = 1/6.');
  mc(2, 6, 3, 'Applied', 'Integrating in dy instead of dx is usually worth doing when:', 'It replaces two integrals with one',
    ['The region is above the x-axis', 'The curves are polynomials', 'The axis of revolution is vertical'], 'A region bounded by one curve on the left and one on the right for its whole height needs one dy integral where dx might need several.');
  mc(2, 6, 4, 'Exam', 'The region under y = √x from 0 to 4 is revolved about the x-axis. The volume is:', '8π',
    ['16π', '4π', '32π/3'], 'V = π∫₀⁴ (√x)² dx = π∫₀⁴ x dx = π(16/2) = 8π. Squaring the radical is what makes this integral trivial.');
  mc(2, 6, 4, 'Exam', 'A solid has a circular base of radius 1 and square cross-sections perpendicular to a diameter. The side of the square at position x is:', '2√(1 − x²)',
    ['√(1 − x²)', '1 − x²', 'π(1 − x²)'], 'The chord of the circle at x runs from −√(1 − x²) to +√(1 − x²), so its full length is twice that. A(x) is then that side squared.');

  /* ===================== GYM 3 - Shells, Arc Length, Work (L7-9) ===================== */
  mc(3, 7, 1, 'Recall', 'The shell method volume formula is:', 'V = 2π∫ (radius)(height) dx',
    ['V = π∫ (radius)² dx', 'V = ∫ (radius)(height) dx', 'V = 2π∫ (radius)² (height) dx'], 'A cylindrical shell unrolls into a rectangle of width 2π(radius) and height equal to the function value, with thickness dx.');
  mc(3, 8, 1, 'Recall', 'The arc length of y = f(x) on [a, b] is:', '∫ₐᵇ √(1 + f′(x)²) dx',
    ['∫ₐᵇ √(1 + f(x)²) dx', '∫ₐᵇ f′(x) dx', '∫ₐᵇ √(f′(x)²) dx'], 'The 1 comes from dx² in the Pythagorean element √(dx² + dy²), and it is never optional. The function inside is the DERIVATIVE, squared.');
  mc(3, 9, 1, 'Recall', 'Work done by a variable force F(x) from a to b is:', '∫ₐᵇ F(x) dx',
    ['F(b) − F(a)', '∫ₐᵇ F′(x) dx', 'F(x)(b − a)'], 'Force times distance only works for a constant force. When the force varies you slice the distance and add up the contributions.');
  mc(3, 9, 1, 'Recall', 'Hooke\'s Law states that the force to stretch a spring x units from rest is:', 'F = kx',
    ['F = k/x', 'F = kx²', 'F = k'], 'The force grows linearly with the stretch, so the work is ∫kx dx = ½kx², not a simple product.');
  mc(3, 7, 2, "Method", "For a region given using y = f(x) and rotation about the y-axis, shells are especially useful when:", "Solving the curve for the other variable is difficult",
    ["The region is above the x-axis","The axis is always vertical","The function is a polynomial"], "Vertical shells use x directly. Horizontal washers may require solving the boundary curves for x in terms of y.");
  mc(3, 8, 2, "Method", "For a continuously differentiable f(x) ≥ 0, the surface area of revolution about the x-axis is:", "2π∫ f(x) √(1 + f′(x)²) dx",
    ["2π∫ x √(1 + f′(x)²) dx","π∫ f(x)² dx","2π∫ f(x) dx"], "It is the arc length element multiplied by the circumference 2π(radius), and about the x-axis the radius is f(x) itself.");
  mc(3, 9, 2, 'Method', 'The mass of a thin rod on [a, b] with linear density ρ(x) is:', '∫ₐᵇ ρ(x) dx',
    ['ρ(b) − ρ(a)', 'ρ(x)(b − a)', '∫ₐᵇ ρ′(x) dx'], 'Density times length gives mass for a uniform rod; when the density varies you slice the rod and integrate.');
  mc(3, 7, 3, "Applied", "Revolving the region 0 ≤ y ≤ f(x), with f(x) ≥ 0 on [0,2], about the y-axis by shells gives:", "2π∫₀² x f(x) dx",
    ["2π∫₀² f(x) dx","π∫₀² f(x)² dx","2π∫₀² x² f(x) dx"], "About the y-axis the radius of the shell at position x is simply x, and the height is f(x).");
  mc(3, 8, 3, 'Applied', 'For y = (2/3)x^(3/2), the arc length integrand √(1 + f′(x)²) simplifies to:', '√(1 + x)',
    ['√(1 + x²)', '1 + x', '√x'], 'f′(x) = x^(1/2), so f′(x)² = x and the radical becomes √(1 + x). Arc length problems are almost always engineered so the radical collapses like this.');
  mc(3, 9, 4, "Exam", "A spring with k = 10 N/m is stretched from rest to 0.4 m. The work done is:", "0.8 J",
    ["4 J","2 J","1.6 J"], "W = ∫₀^0.4 10x dx = 5(0.4)² = 0.8 J. Using the final force 4 N times 0.4 m gives 1.6 J, twice the correct work.");
  mc(3, 7, 4, 'Exam', 'When setting up a shell integral, the "radius" is:', 'The distance from the axis of revolution to the shell',
    ['The distance from the origin to the shell', 'Always the variable of integration', 'The height of the region'], 'Only when the axis happens to be a coordinate axis does the radius equal the variable. Revolving about x = 3 makes the radius |3 − x|.');

  /* ===================== GYM 4 - Trigonometric Integrals (L12-14) ===================== */
  mc(4, 12, 1, 'Recall', 'For ∫ sinᵐx cosⁿx dx with an odd power present, the first step is:', 'Peel off one factor of the odd-powered function',
    ['Use the half-angle identities', 'Substitute x = a sin θ', 'Integrate by parts'], 'The peeled factor becomes du, and sin²x + cos²x = 1 converts the remaining even power into the other function.');
  mc(4, 12, 1, 'Recall', 'When both powers in ∫ sinᵐx cosⁿx dx are even, you use:', 'The half-angle identities',
    ['Integration by parts', 'Partial fractions', 'The substitution u = sin x'], 'With no odd factor to peel there is nothing to serve as du, so sin²x = (1 − cos 2x)/2 and cos²x = (1 + cos 2x)/2 reduce the powers instead.');
  mc(4, 13, 1, 'Recall', 'The identity that pairs with tangent and secant is:', 'sec²x = 1 + tan²x',
    ['sec²x = 1 − tan²x', 'tan²x = 1 + sec²x', 'sec x = 1 + tan x'], 'It is the Pythagorean identity divided through by cos²x, and it is what lets you convert leftover powers after saving a du factor.');
  mc(4, 14, 1, "Recall", "For a > 0, which substitution simplifies √(a² − x²) using 1 − sin²θ = cos²θ?", "x = a sin θ",
    ["x = a tan θ","x = a sec θ","x = 2a sin θ"], "Then a² − x² = a²(1 − sin²θ) = a² cos²θ, and the radical becomes a|cos θ|. Matching the radical to its identity is the whole method.");
  mc(4, 13, 2, "Method", "For nonnegative integers m and even n ≥ 2, which factor is saved from tanᵐx secⁿx to use u = tan x?", "sec²x for du",
    ["sec x tan x for du","tan x for du","One factor of sec x only"], "The derivative of tan x is sec²x, so saving sec²x sets up u = tan x and the remaining even secant power converts with 1 + tan²x.");
  mc(4, 13, 2, "Method", "For positive integers m and n with m odd, which factor is saved from tanᵐx secⁿx to use u = sec x?", "sec x tan x for du",
    ["sec²x for du","tan²x for du","Nothing; use half-angles"], "The derivative of sec x is sec x tan x, so that pairing sets up u = sec x, and tan²x = sec²x − 1 handles the rest.");
  mc(4, 14, 2, "Method", "For a > 0, which standard substitution simplifies √(x² − a²) using sec²θ − 1 = tan²θ?", "x = a sec θ",
    ["x = a sin θ","x = a tan θ","x = a cot θ"], "With x = a sec θ, x² − a² = a²tan²θ. Hence the radical becomes a|tan θ|. Other substitutions can work, but this one uses the stated identity.");
  mc(4, 12, 3, 'Applied', '∫ sin³x cos²x dx is best handled by substituting:', 'u = cos x, after peeling one sin x',
    ['u = sin x, after peeling one cos x', 'The half-angle identity for sin²x', 'Integration by parts with u = sin³x'], 'The sine power is odd, so peel one sin x for du = −sin x dx and convert the remaining sin²x to 1 − cos²x.');
  mc(4, 14, 3, 'Applied', 'After substituting x = 3 sin θ, the differential dx becomes:', '3 cos θ dθ',
    ['3 sin θ dθ', 'cos θ dθ', '3 dθ'], 'Differentiating the substitution is not optional. Dropping dx silently changes the integral and is a common source of lost marks.');
  mc(4, 13, 4, 'Exam', '∫ sec x dx equals:', 'ln|sec x + tan x| + C',
    ['sec x tan x + C', 'tan x + C', 'ln|cos x| + C'], 'It is worth memorising rather than rederiving under exam pressure. Its companion ∫ tan x dx = −ln|cos x| + C is also worth knowing cold.');
  mc(4, 14, 4, 'Exam', 'After a trigonometric substitution in an INDEFINITE integral, you convert back to x using:', 'A reference right triangle built from the substitution',
    ['The original limits of integration', 'A second substitution', 'The half-angle identities'], 'Draw the triangle with the substitution as one ratio and read off every other trig function from its sides. Definite integrals skip this by changing the limits instead.');

  /* ============ GYM 5 - Substitution and Partial Fractions (L15-17) ============ */
  mc(5, 16, 1, 'Recall', 'Partial fraction decomposition requires that the numerator degree be:', 'Strictly less than the denominator degree',
    ['Equal to the denominator degree', 'Greater than the denominator degree', 'Even'], 'If it is not, do polynomial long division first and decompose only the proper remainder.');
  mc(5, 16, 1, "Recall", "In the standard partial-fraction form with a separate term at each power, a repeated linear factor (x − a)² contributes:", "A/(x − a) + B/(x − a)²",
    ["A/(x − a)²only","A/(x − a) only","(Ax + B)/(x − a)²"], "Include a constant numerator at each power for the full standard form. Grouping the terms into one linear numerator over (x − a)² is equivalent but is not the requested separate-power form.");
  mc(5, 16, 1, "Recall", "In the full general partial-fraction form, an irreducible quadratic factor gets a numerator of the form:", "Ax + B",
    ["A","Ax","Ax² + Bx + C"], "Use Ax + B to allow all proper numerators over the quadratic. A or B may turn out to be zero for a particular fraction.");
  mc(5, 15, 1, 'Recall', 'For a DEFINITE trigonometric substitution, the efficient approach is to:', 'Change the limits to θ and never convert back',
    ['Convert back to x, then evaluate', 'Drop the limits and add C', 'Use the reference triangle at the end'], 'Changing the limits removes the need for the reference triangle entirely, which saves both time and a common transcription error.');
  mc(5, 15, 2, 'Method', 'Seeing √(x² + 6x + 5), your first move is to:', 'Complete the square',
    ['Substitute x = 5 sec θ immediately', 'Factor out x²', 'Apply partial fractions'], 'x² + 6x + 5 = (x + 3)² − 4, which is now the √(u² − a²) form. Completing the square is what makes an unrecognisable radical standard.');
  mc(5, 17, 2, "Method", "For distinct linear factors, after clearing denominators, which method isolates each partial-fraction coefficient directly?", "Substitute the roots of each linear factor",
    ["Expand everything and match coefficients","Differentiate both sides","Integrate both sides first"], "Substituting a root into the resulting polynomial identity kills every other term. Repeated factors and irreducible quadratics generally require additional equations.");
  mc(5, 16, 2, 'Method', 'Decomposing 1/(x² − 1) begins by writing the denominator as:', '(x − 1)(x + 1)',
    ['(x − 1)²', 'x(x − 1)', 'An irreducible quadratic'], 'x² − 1 is a difference of squares, so it factors into distinct linear terms and gets A/(x − 1) + B/(x + 1). Always factor completely first.');
  mc(5, 17, 3, 'Applied', 'The general strategy order for an unfamiliar integral is:', 'Simplify, u-substitute, parts, trigonometric methods, partial fractions',
    ['Partial fractions, parts, substitution, simplify', 'Parts first, always', 'Trigonometric substitution, then parts'], 'Most integrals fall to one of the first three. Reaching for the heaviest technique first wastes the time an exam does not give you.');
  mc(5, 16, 3, "Applied", "To write (x³ + 1)/(x² − 1) as a polynomial plus a proper rational remainder, which operation do you use?", "Polynomial long division",
    ["Immediate partial fractions","Trigonometric substitution","Completing the square"], "Polynomial division gives x + (x + 1)/(x² − 1), and the remainder simplifies to 1/(x − 1) on the original domain. Factoring and cancelling first is another valid approach.");
  mc(5, 15, 4, 'Exam', 'Under x = 2 sin θ, the definite integral ∫₀² ... dx has new limits:', 'θ from 0 to π/2',
    ['θ from 0 to 2', 'θ from 0 to π', 'θ from 0 to π/4'], 'x = 0 gives sin θ = 0 so θ = 0; x = 2 gives sin θ = 1 so θ = π/2. Substituting the OLD limits into the new variable is a classic slip.');
  mc(5, 17, 4, 'Exam', 'Decomposing 1/(x(x² + 1)) requires the form:', 'A/x + (Bx + C)/(x² + 1)',
    ['A/x + B/(x² + 1)', 'A/x + B/x²+ C/(x + 1)', '(Ax + B)/(x(x² + 1))'], 'The linear factor takes a constant; the irreducible quadratic takes a linear numerator. Mixing those up leaves the system unsolvable.');

  /* ========== GYM 6 - Improper Integrals and Sequences (L18-19) ========== */
  mc(6, 18, 1, 'Recall', 'An improper integral with an infinite upper limit is evaluated as:', 'lim_{b→∞} ∫ₐᵇ f(x) dx',
    ['∫ₐ^∞ f(x) dx directly', 'f(∞) − f(a)', 'The average of f on [a, ∞)'], 'The limit is the definition, not a formality. An improper integral written without one has been asserted rather than evaluated.');
  mc(6, 18, 1, 'Recall', '∫₁^∞ dx/xᵖ converges exactly when:', 'p > 1',
    ['p < 1', 'p ≥ 0', 'p = 1'], 'At infinity the tail must decay fast enough. Near zero the condition flips to p < 1, which is why the two p-results must be kept separate.');
  mc(6, 19, 1, 'Recall', 'The difference between a sequence and a series is that a series is:', 'The sum of the terms of a sequence',
    ['A sequence with positive terms only', 'A sequence that converges', 'A sequence written in reverse'], 'A sequence is a list; a series adds the list up. Nearly every later error traces back to blurring the two.');
  mc(6, 19, 1, 'Recall', 'A series converges exactly when:', 'Its sequence of partial sums converges',
    ['Its terms tend to zero', 'Its terms are decreasing', 'It has finitely many negative terms'], 'Terms tending to zero is necessary but nowhere near sufficient - the harmonic series is the standard counterexample.');
  mc(6, 18, 2, 'Method', 'An integral improper at both endpoints must be:', 'Split into two independent pieces, both of which must converge',
    ['Evaluated with one limit', 'Doubled after evaluating one end', 'Declared divergent automatically'], 'If either piece diverges the whole thing diverges, and a single limit cannot capture two independent failures.');
  mc(6, 18, 2, 'Method', 'The integrand 1/(x − 2) on the interval [0, 3] makes the integral improper because:', 'It has an infinite discontinuity at x = 2',
    ['The interval is unbounded', 'The integrand is negative somewhere', 'The interval contains zero'], 'Type II impropriety comes from the integrand blowing up inside or at the edge of the interval, so split at x = 2 and take one-sided limits.');
  mc(6, 18, 3, 'Applied', '∫₁^∞ dx/x² equals:', '1',
    ['∞', '0', '1/2'], 'lim_{b→∞} [−1/x]₁ᵇ = lim (−1/b + 1) = 1. Here p = 2 > 1, so convergence was guaranteed before the computation.');
  mc(6, 18, 3, 'Applied', '∫₁^∞ dx/x diverges because:', 'p = 1 is not greater than 1',
    ['The integrand is undefined at 1', 'ln x is negative', 'The integral is improper at both ends'], 'The antiderivative ln b grows without bound. p = 1 is precisely the boundary case, and it falls on the divergent side.');
  mc(6, 19, 4, 'Exam', 'For a convergent geometric series with first term a and ratio r, the sum is:', 'a/(1 − r)',
    ['a/(1 + r)', 'ar/(1 − r)', '(1 − r)/a'], 'The a in the formula is the FIRST TERM ACTUALLY WRITTEN, whatever index the sum starts at. Using the n = 0 term when the sum starts at n = 2 is a frequent slip.');
  mc(6, 18, 4, 'Exam', 'Comparison for improper integrals says that if 0 ≤ f ≤ g on [a, ∞) and ∫g converges, then:', '∫f converges',
    ['∫f diverges', '∫f converges to the same value', 'Nothing can be concluded'], 'Being trapped under something finite forces convergence. Note the verdict transfers but the VALUE does not.');

  /* ============ GYM 7 - Series and the First Tests (L21-23) ============ */
  mc(7, 21, 1, "Recall", "For a ≠ 0, the geometric series Σₙ₌₀^∞ arⁿ converges exactly when:", "|r| < 1",
    ["|r| > 1","r > 0","a < 1"], "The ratio controls everything; the first term only scales the sum. At |r| = 1 the series diverges.");
  mc(7, 22, 1, 'Recall', 'The Divergence Test can:', 'Only ever prove divergence',
    ['Prove convergence when aₙ → 0', 'Prove either outcome', 'Determine the sum'], 'If aₙ does not tend to 0, the series diverges. If it does tend to 0, the test is silent - that is exactly the harmonic series situation.');
  mc(7, 22, 1, 'Recall', 'The p-series Σ1/nᵖ converges exactly when:', 'p > 1',
    ['p < 1', 'p ≥ 1', 'p is an integer'], 'p = 1 is the harmonic series and it diverges, so the boundary case sits on the divergent side.');
  mc(7, 22, 2, 'Method', 'The Integral Test requires the function to be:', 'Positive, continuous and decreasing',
    ['Continuous only', 'Positive and increasing', 'Differentiable and bounded'], 'All three conditions must hold on the interval. Skipping the decreasing check is the usual way this test gets misapplied.');
  mc(7, 22, 2, 'Method', 'When the Integral Test applies, the series and the integral:', 'Converge or diverge together, but need not share a value',
    ['Have exactly the same value', 'Always differ by 1', 'Have values differing by the first term'], 'The test transfers the verdict only. Reporting the integral as the sum of the series is a common and costly confusion.');
  mc(7, 23, 2, "Method", "For eventually positive terms, which limit condition guarantees that Σaₙ and Σbₙ have the same convergence behavior?", "Finite and strictly positive",
    ["Zero","Infinite","Any real number"], "A finite positive limit means the terms are proportional in the tail, so the two series must share a fate.");
  mc(7, 21, 3, 'Applied', 'Σ from n = 0 of (1/2)ⁿ equals:', '2',
    ['1', '1/2', 'Divergent'], 'a = 1 and r = 1/2, so the sum is 1/(1 − 1/2) = 2. Starting the same series at n = 1 would instead give 1.');
  mc(7, 23, 3, 'Applied', 'To test Σ n/(n³ + 1), limit comparison against which series is natural?', 'Σ 1/n²',
    ['Σ 1/n', 'Σ 1/n³', 'Σ n'], 'Keep the leading powers: n/n³ = 1/n². That is a convergent p-series with p = 2, so the original converges too.');
  mc(7, 21, 3, 'Applied', 'To evaluate a telescoping series you should:', 'Write out the partial sum and cancel',
    ['Apply the Ratio Test', 'Compare with a p-series', 'Differentiate the general term'], 'Write four terms before guessing the cancellation pattern, then take the limit of whatever survives at the ends.');
  mc(7, 22, 4, 'Exam', 'For Σ aₙ, knowing that aₙ → 0 lets you conclude:', 'Nothing about convergence',
    ['The series converges', 'The series converges absolutely', 'The series diverges'], 'It is a necessary condition, not a sufficient one. Σ1/n has terms tending to zero and still diverges.');
  mc(7, 23, 4, 'Exam', 'Direct Comparison proves DIVERGENCE when your series is:', 'Bounded below by a divergent series of nonnegative terms',
    ['Bounded above by a divergent series', 'Bounded above by a convergent series', 'Bounded below by a convergent series'], 'The inequality has to point the right way: sitting above something that already diverges forces divergence.');

  /* ====== GYM 8 - Alternating Series and Choosing a Test (L24-26) ====== */
  mc(8, 24, 1, 'Recall', 'The Alternating Series Test requires that the terms:', 'Decrease in size and tend to zero',
    ['Increase and tend to zero', 'Are all positive', 'Form a geometric sequence'], 'Both conditions apply to the SIZES |aₙ|, not to the signed terms, and both must be checked.');
  mc(8, 24, 1, 'Recall', 'Absolute convergence means that:', 'Σ|aₙ| converges',
    ['Σaₙ converges but Σ|aₙ| does not', 'All terms are positive', 'The series converges to a positive number'], 'Absolute convergence implies convergence. Conditional convergence is the other case: Σaₙ converges while Σ|aₙ| does not.');
  mc(8, 25, 1, 'Recall', 'The Ratio Test computes:', 'lim |aₙ₊₁/aₙ|',
    ['lim |aₙ/aₙ₊₁|', 'lim ⁿ√|aₙ|', 'lim n·aₙ'], 'Next term over current term. Inverting the ratio inverts the verdict, so the order matters.');
  mc(8, 25, 1, 'Recall', 'A Ratio Test limit of exactly 1 means:', 'The test is inconclusive',
    ['The series converges', 'The series diverges', 'The series converges conditionally'], 'You must switch tests. Both Σ1/n and Σ1/n² give L = 1 and they behave differently, which is why the case cannot be decided.');
  mc(8, 26, 1, 'Recall', 'Factorials in the general term point you toward:', 'The Ratio Test',
    ['The Integral Test', 'The Alternating Series Test', 'Direct Comparison'], 'Consecutive factorials cancel almost completely in the ratio, leaving a simple limit.');
  mc(8, 24, 2, "Method", "For an alternating series whose term magnitudes decrease to zero, the standard first-omitted-term error bound after n terms is:", "The size of the first omitted term",
    ["The size of the last included term","The sum of all omitted terms","Half the first term"], "The absolute remainder is at most the magnitude of the first omitted term. Monotone decrease in the magnitudes is essential to this bound.");
  mc(8, 25, 2, 'Method', 'The Root Test is the natural choice when the general term:', 'Is raised to the nth power',
    ['Contains a factorial', 'Is a ratio of polynomials', 'Alternates in sign'], 'The nth root cancels the nth power outright, which no other test does as cleanly.');
  mc(8, 26, 2, 'Method', 'The very first thing to check for any series is:', 'Whether the terms tend to zero',
    ['Whether it alternates', 'Whether it is geometric', 'Whether the Integral Test applies'], 'It is one glance and it can end the problem immediately. Only if the terms do tend to zero is any further test worth setting up.');
  mc(8, 24, 3, 'Applied', 'The alternating harmonic series Σ(−1)ⁿ⁺¹/n is:', 'Conditionally convergent',
    ['Absolutely convergent', 'Divergent', 'Geometric'], 'It converges by the Alternating Series Test, but taking absolute values gives the harmonic series, which diverges.');
  mc(8, 25, 3, 'Applied', 'For Σ n!/nⁿ the Ratio Test gives a limit of:', '1/e',
    ['1', 'e', '0'], 'The ratio simplifies to (n/(n+1))ⁿ, which tends to 1/e. Since 1/e < 1, the series converges absolutely.');
  mc(8, 26, 4, 'Exam', 'If the Ratio Test returns L = 1 on Σ1/n², the correct next move is:', 'Recognise it as a convergent p-series',
    ['Conclude divergence', 'Conclude convergence from L = 1', 'Apply the Ratio Test again'], 'An inconclusive test has told you to switch, not failed. p = 2 > 1 settles it at a glance.');
  mc(8, 24, 4, 'Exam', 'A series that converges absolutely:', 'Also converges',
    ['May still diverge', 'Converges only if it alternates', 'Has a sum equal to Σ|aₙ|'], 'Absolute convergence is the stronger condition and it implies ordinary convergence. The converse fails, as the alternating harmonic series shows.');

  /* ========= GYM 9 - Power Series and Taylor Series (L28-31) ========= */
  mc(9, 28, 1, 'Recall', 'The Taylor polynomial coefficient of (x − a)ᵏ is:', 'f⁽ᵏ⁾(a)/k!',
    ['f⁽ᵏ⁾(a)', 'f(a)/k!', 'k!·f⁽ᵏ⁾(a)'], 'The factorial in the denominator is what makes the kth derivative of the polynomial match the kth derivative of f at a.');
  mc(9, 31, 1, 'Recall', 'A Maclaurin series is a Taylor series centred at:', '0',
    ['1', 'The radius of convergence', 'Any point where f is defined'], 'It is not a different construction, only the special case a = 0, which is why the six standard series are all Maclaurin series.');
  mc(9, 29, 1, 'Recall', 'The radius of convergence of a power series is usually found using:', 'The Ratio Test',
    ['The Integral Test', 'Direct Comparison', 'The Alternating Series Test'], 'Apply it to the terms INCLUDING the (x − a)ⁿ factor, then solve the resulting inequality for |x − a|.');
  mc(9, 29, 1, 'Recall', 'A power series can converge:', 'At one point, on an interval, or everywhere',
    ['Only on a finite interval', 'Only at the centre', 'On any set of real numbers'], 'Those three cases correspond to R = 0, finite R, and R = ∞. No other behaviour is possible.');
  mc(9, 29, 2, "Method", "After finding a finite positive radius R, the two endpoints must be:", "Substituted and tested separately as numeric series",
    ["Assumed to converge","Assumed to diverge","Ignored, since R settles it"], "The Ratio Test is silent at |x − a| = R. Each endpoint gives its own numeric series needing its own test, and that is where the marks sit.");
  mc(9, 30, 2, 'Method', 'Differentiating a power series term by term:', 'Preserves the radius of convergence',
    ['Halves the radius', 'Always shrinks the interval to a point', 'Changes the centre'], 'R is unchanged, though behaviour AT the endpoints can change, so those must be rechecked.');
  mc(9, 30, 2, 'Method', 'The quickest way to find the series for 1/(1 + x²) is to:', 'Substitute −x² into the geometric series',
    ['Differentiate the series for arctan x twice', 'Compute derivatives at 0 one at a time', 'Apply integration by parts'], 'Starting from 1/(1 − u) = Σuⁿ with u = −x² gives Σ(−1)ⁿx²ⁿ immediately. Building from known series beats computing derivatives.');
  mc(9, 31, 3, 'Applied', 'The Maclaurin series for eˣ is:', 'Σ xⁿ/n!',
    ['Σ xⁿ', 'Σ (−1)ⁿxⁿ/n!', 'Σ n!xⁿ'], 'Every derivative of eˣ is eˣ, which is 1 at 0, so every coefficient is 1/n!. Its radius of convergence is infinite.');
  mc(9, 29, 3, 'Applied', 'For Σ xⁿ/n, the radius of convergence is:', '1',
    ['0', '∞', '1/2'], 'The Ratio Test gives |x| < 1. At x = 1 it is the harmonic series and diverges; at x = −1 it is the alternating harmonic series and converges, so the interval is [−1, 1).');
  mc(9, 28, 4, "Exam", "The Lagrange error bound needs which quantity?", "A bound M on |f⁽ⁿ⁺¹⁾| between the centre and x",
    ["The exact value of f at the endpoint","The radius of convergence","The sum of the omitted terms"], "|Rₙ(x)| ≤ M|x − a|ⁿ⁺¹/(n + 1)!. Finding a valid M is usually most of the work in the problem.");
  mc(9, 30, 4, "Exam", "Integrating the series for 1/(1 + t) from t = 0 to t = x, with |x| < 1, produces the series for:", "ln(1 + x)",
    ["arctan x","eˣ","1/(1 + x)²"], "And integrating the series for 1/(1 + x²) gives arctan x. Both are standard derivations worth being able to reproduce.");

  /* ======= GYM 10 - Taylor at Work and Polar (L32-34) ======= */
  mc(10, 33, 1, 'Recall', 'The polar-to-rectangular conversions are:', 'x = r cos θ and y = r sin θ',
    ['x = r sin θ and y = r cos θ', 'x = r/cos θ and y = r/sin θ', 'x = cos θ and y = sin θ'], 'Cosine goes with x, sine with y. Swapping them reflects every graph across the line y = x.');
  mc(10, 33, 1, 'Recall', 'In polar coordinates, r² equals:', 'x² + y²',
    ['x² − y²', 'x + y', '(x + y)²'], 'It is the Pythagorean relation. The companion is tan θ = y/x, which needs a quadrant check before you trust the arctangent.');
  mc(10, 34, 1, "Recall", "For a > 0, the polar curve r = a is:", "A circle centred at the origin",
    ["A line through the origin","A cardioid","A spiral"], "The radius is constant while θ sweeps, tracing a circle. By contrast θ = c is the line through the origin at that fixed angle.");
  mc(10, 32, 1, 'Recall', 'The Maclaurin series for 1/(1 − x) is:', 'Σ xⁿ for |x| < 1',
    ['Σ xⁿ/n! for all x', 'Σ (−1)ⁿxⁿ for all x', 'Σ nxⁿ for |x| < 1'], 'It is the geometric series, and it is the source of more derived series than any other on the list.');
  mc(10, 34, 2, "Method", "For r = a cos(kθ), with a > 0 and positive integer k, the number of petals is:", "k when k is odd, and 2k when k is even",
    ["Always k","Always 2k","k when k is even, and 2k when k is odd"], "An odd k retraces the same petals on the second sweep; an even k lays down a fresh set, doubling the count.");
  mc(10, 32, 2, 'Method', 'Series are useful for integrals like ∫ sin(x²) dx because:', 'The function has no elementary antiderivative',
    ['The integral is improper', 'The function is discontinuous', 'Substitution always fails'], 'Expand, integrate term by term, and keep as many terms as the required accuracy demands.');
  mc(10, 33, 2, 'Method', 'A polar point has:', 'Infinitely many representations',
    ['Exactly one representation', 'Exactly two representations', 'One representation per quadrant'], '(r, θ + 2πn) is the same point, and so is (−r, θ + π). Uniqueness is a rectangular luxury.');
  mc(10, 32, 3, 'Applied', 'To evaluate lim_{x→0} (sin x − x)/x³ with series, expand sin x as:', 'x − x³/6 + x⁵/120 − …',
    ['x + x³/6 + x⁵/120 + …', '1 − x²/2 + x⁴/24 − …', 'x − x²/2 + x³/3 − …'], 'The numerator becomes −x³/6 + …, so the limit is −1/6. Cosine is the one with the even powers.');
  mc(10, 34, 3, "Applied", "For a differentiable polar curve where dx/dθ ≠ 0, its slope dy/dx is:", "(dy/dθ)/(dx/dθ) with x = r cos θ and y = r sin θ",
    ["dr/dθ","r′(θ)/r(θ)","tan θ"], "You must product-rule through r(θ) in both x and y. Reporting dr/dθ as the slope is the standard error here.");
  mc(10, 34, 4, "Exam", "The polar curve r = 1 + cos θ is:", "A cardioid",
    ["A circle of radius 1","A four-petal rose","A line"], "Here r = 1 + cos θ is a cardioid. More generally, for positive a and b, r = a ± b cos θ has a cusp when a = b and an inner loop when b > a.");
  mc(10, 32, 4, "Exam", "Which pair of Maclaurin series converges for ALL real x?", "sin x and cos x",
    ["1/(1 − x) and ln(1 + x)","arctan x and 1/(1 − x)","ln(1 + x) and arctan x"], "sin x, cos x and eˣ have infinite-radius Maclaurin series. The geometric series converges on (−1,1), ln(1 + x) on (−1,1], and arctan x on [−1,1].");

  /* ============ EXAM-ONLY LESSONS (no quiz ever covers these) ============ */
  /* 91: L10 pumping and force on a dam, L11 integration by parts */
  mc(91, 11, 1, 'Recall', 'The integration by parts formula is:', '∫u dv = uv − ∫v du',
    ['∫u dv = uv + ∫v du', '∫u dv = u∫v − ∫u′v', '∫u dv = ∫u ∫dv'], 'You are trading one integral for another. The trade is only worth making if ∫v du is easier than what you started with.');
  mc(91, 11, 1, 'Recall', 'The LIATE guideline helps you choose:', 'Which factor to call u',
    ['Which substitution to use', 'Whether the integral is improper', 'The limits of integration'], 'Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential - earlier in the list makes a better u because it simplifies when differentiated.');
  mc(91, 10, 1, 'Recall', 'In a pumping problem, the work to lift one slab of fluid is:', 'Its weight times the distance it must rise',
    ['Its volume times its depth', 'Its area times the tank height', 'Its density times its width'], 'Weight is density times gravity times volume, and the distance varies with the slab, which is exactly why this becomes an integral.');
  mc(91, 11, 2, "Method", "For ∫ x eˣ dx, which choice of u and dv immediately lowers the polynomial degree in the remaining integral?", "u = x, dv = eˣ dx",
    ["u = eˣ, dv = x dx","u = xeˣ, dv = dx","A trigonometric substitution"], "Differentiating x gives 1 and removes the algebraic factor entirely; the exponential integrates back to itself either way.");
  mc(91, 11, 2, 'Method', '∫ ln x dx is handled by parts with:', 'u = ln x and dv = dx',
    ['u = x and dv = ln x dx', 'The substitution u = ln x', 'Partial fractions'], 'There is no obvious dv, so take dv = dx. Then v = x and ∫v du = ∫dx, giving x ln x − x + C.');
  mc(91, 10, 3, "Applied", "For a constant-density fluid under constant gravity pumped to a fixed outlet, which listed quantity varies with a slab’s height?", "The distance the slab must be lifted",
    ["The density of the fluid","The acceleration due to gravity","The thickness of the slab"], "Density and g are constants and the thickness is the differential. The lift distance depends on depth, which is why it belongs inside the integral.");
  mc(91, 10, 3, 'Applied', 'Hydrostatic force on a vertical dam wall is found by integrating:', 'Pressure times the width of the strip, over depth',
    ['Volume times density, over height', 'Force times distance, over width', 'Pressure times depth, over area'], 'Pressure grows linearly with depth, and the width of the wall can change with depth too, so both belong in the integrand.');
  mc(91, 11, 4, 'Exam', 'Applying parts twice to ∫ eˣ sin x dx leads to:', 'The original integral reappearing, which you solve for algebraically',
    ['A polynomial', 'An immediate elementary antiderivative', 'A divergent integral'], 'The integral returns with a coefficient, so move it to the left side and divide. Recognising the loop is the whole trick.');

  /* 92: L20 sequences - limits, monotonicity, boundedness */
  mc(92, 20, 1, 'Recall', 'A sequence is monotonic if it is:', 'Entirely non-increasing or entirely non-decreasing',
    ['Bounded above and below', 'Convergent', 'Alternating in sign'], 'Monotonic means it never changes direction. An alternating sequence is never monotonic.');
  mc(92, 20, 1, 'Recall', 'The Monotone Convergence Theorem says a sequence converges if it is:', 'Monotonic and bounded',
    ['Bounded only', 'Monotonic only', 'Positive and decreasing to a negative limit'], 'Either property alone is not enough: 1, 2, 3, … is monotonic and unbounded, and (−1)ⁿ is bounded and non-monotonic.');
  mc(92, 20, 2, "Method", "If aₙ = f(n) and a real-variable extension f(x) has a finite limit as x → ∞, how can you obtain lim aₙ?", "Treat n as a continuous variable and take the limit at infinity",
    ["Add the first ten terms","Apply the Ratio Test","Check that it alternates"], "The sequence has the same limit as that extension. The converse is false: f(x) = sin(2πx) has no limit at infinity but f(n) = 0. Use L’Hôpital only when its hypotheses hold.");
  mc(92, 20, 3, 'Applied', 'The sequence aₙ = n/(n + 1) is:', 'Increasing and bounded above by 1',
    ['Decreasing and bounded below by 0', 'Unbounded', 'Non-monotonic'], 'It rises toward 1 without ever reaching it, so by the Monotone Convergence Theorem it converges - to 1.');
  mc(92, 20, 4, 'Exam', 'If a sequence converges, then it must be:', 'Bounded',
    ['Monotonic', 'Positive', 'Eventually constant'], 'Convergence forces boundedness, but not the reverse and not monotonicity: (−1)ⁿ/n converges to 0 while changing direction every step.');

  /* 93: L27 approximating functions with polynomials I */
  mc(93, 27, 1, 'Recall', 'The linear approximation of f at a is:', 'f(a) + f′(a)(x − a)',
    ['f(a) + f′(x)(x − a)', 'f(a)(x − a)', 'f′(a) + f(a)(x − a)'], 'It is the Taylor polynomial of degree 1 - the tangent line at a, matching both the value and the slope.');
  mc(93, 27, 1, 'Recall', 'A degree-n Taylor polynomial at a matches f in:', 'Its value and its first n derivatives at a',
    ['Its value at n points', 'Its value everywhere on the interval', 'Its integral over the interval'], 'That matching condition is exactly what forces the coefficients to be f⁽ᵏ⁾(a)/k!.');
  mc(93, 27, 2, 'Method', 'The approximation generally gets worse as x:', 'Moves further from the centre a',
    ['Approaches a', 'Becomes an integer', 'Becomes negative'], 'The error term carries a factor of (x − a)ⁿ⁺¹, so distance from the centre is what drives the error up.');
  mc(93, 27, 3, 'Applied', 'The degree-2 Maclaurin polynomial of cos x is:', '1 − x²/2',
    ['1 − x + x²/2', 'x − x³/6', '1 + x²/2'], 'cos 0 = 1, the first derivative at 0 is 0 and the second is −1, so the x term vanishes and the x² coefficient is −1/2.');
  mc(93, 27, 4, "Exam", "When seeking a more accurate Taylor approximation, which strategies can help, with the error bound checked afterward?", "Raise the degree or move the centre closer to the point of interest",
    ["Only raise the degree","Only widen the interval","Change the variable of integration"], "A closer centre or a higher truncation order can help. Neither guarantees improvement for every function and point; check the derivative bound and the resulting remainder estimate.");

  /* 94: L35 area and arc length in polar */
  mc(94, 35, 1, 'Recall', 'The area swept by a polar curve is:', '½∫ r² dθ',
    ['∫ r dθ', '2π∫ r dθ', '∫ r² dθ'], 'The element is a thin circular sector of area ½r² dθ, not a rectangle. Forgetting the one-half doubles every answer.');
  mc(94, 35, 1, 'Recall', 'Polar arc length is:', '∫ √(r² + (dr/dθ)²) dθ',
    ['∫ √(1 + (dr/dθ)²) dθ', '∫ r dθ', '∫ √(r² + 1) dθ'], 'Both r and its rate of change contribute. The √(1 + f′²) form belongs to rectangular coordinates.');
  mc(94, 35, 2, 'Method', 'Before setting up a polar area integral you must find:', 'The θ values that trace the region exactly once',
    ['The rectangular intersections', 'The radius of convergence', 'The slope at the origin'], 'Integrating over too wide a range double-counts the region, which is the usual reason a rose-petal answer comes out a multiple of the truth.');
  mc(94, 35, 3, "Applied", "Which interval traces the entire right-hand petal of r = cos 2θ once, from the origin back to the origin?", "θ from −π/4 to π/4",
    ["θ from 0 to 2π","θ from 0 to π","θ from 0 to π/2"], "The petal is traced as r goes from 0 up to 1 and back to 0, which happens between the consecutive zeros of cos 2θ.");
  mc(94, 35, 4, "Exam", "For a region swept once with 0 ≤ r_inner(θ) ≤ r_outer(θ), the area between its polar boundaries is:", "½∫ (r_outer² − r_inner²) dθ",
    ["½∫ (r_outer − r_inner)² dθ","∫ (r_outer − r_inner) dθ","½∫ (r_outer² + r_inner²) dθ"], "Subtract the sector areas, not the radii. It is the same distinction that separates washers from a squared difference.");
})();
