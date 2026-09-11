/* Second batch of hand-written questions for the Converging Isles.

   Weighted toward tiers 3 and 4 and toward COMPUTATION rather than definitions -
   the first batch covered the vocabulary, and what an exam actually asks is
   "evaluate this". Same Unicode-only notation rule as calc-questions-extra.js:
   no markup, because question text is escaped before it reaches the page.

   IDs use the 'y' prefix so they cannot collide with the 'x' batch or the 'm'
   questions lifted from the field manual. */
(function () {
  var serial = {};
  function mc(ch, lesson, t, tag, q, correct, wrong, why) {
    var n = serial[ch] = (serial[ch] || 0) + 1;
    var c = wrong.slice(), a = n % (wrong.length + 1);
    c.splice(a, 0, correct);
    CALC_QBANK[ch].push({
      id: 'k' + ch + '-y-' + String(n).padStart(3, '0'),
      chapter: ch, lesson: lesson, t: t, k: 'mcq', tag: tag,
      q: q, c: c, a: a, why: why, code: ''
    });
  }

  /* ===================== GYM 1 - Vectors (L1-4) ===================== */
  mc(1, 1, 2, 'Method', 'A vector of length 10 in the direction of v = <3, 4> is:', '<6, 8>',
    ['<30, 40>', '<3/5, 4/5>', '<13, 14>'], '|v| = 5, so the unit vector is <3/5, 4/5> and ten of those is <6, 8>. Scale the UNIT vector, never the original.');
  mc(1, 2, 2, 'Method', 'The distance between P(1, 0, 2) and Q(3, −2, 4) is:', '2√3',
    ['√8', '6', '2√6'], 'The displacement is <2, −2, 2>, so the length is √(4 + 4 + 4) = √12 = 2√3.');
  mc(1, 3, 3, 'Applied', 'For u = <1, 2> and v = <3, 1>, the scalar projection comp_v u is:', '5/√10',
    ['5/10', '5', '√10/5'], 'u · v = 3 + 2 = 5 and |v| = √10, so comp_v u = 5/√10. Dividing by |v|² instead would give the vector projection\'s scalar factor.');
  mc(1, 3, 3, 'Applied', 'For u = <1, 2> and v = <3, 1>, the vector projection proj_v u is:', '<3/2, 1/2>',
    ['<5/√10, 5/√10>', '<3, 1>', '<1/2, 3/2>'], '(u · v)/|v|² = 5/10 = 1/2, and half of <3, 1> is <3/2, 1/2>. The result points along v, never along u.');
  mc(1, 4, 3, 'Applied', 'For u = <1, 0, 0> and v = <0, 1, 0>, the cross product u × v is:', '<0, 0, 1>',
    ['<0, 0, −1>', '<1, 1, 0>', '<0, 0, 0>'], 'i × j = k by the right-hand rule. Reversing the order would give −k, which is the whole point of anticommutativity.');
  mc(1, 4, 4, "Exam", "The area of the triangle with vertices 0, u and v in three dimensions is:", "½|u × v|",
    ["|u × v|","½(u · v)","½|u||v|"], "The cross product magnitude gives the parallelogram; a triangle is half of it. ½|u||v| forgets the sine of the angle.");
  mc(1, 3, 4, 'Exam', 'If |u| = 3, |v| = 4 and the angle between them is 60°, then u · v equals:', '6',
    ['12', '10.4', '2'], 'u · v = |u||v|cos θ = 3 · 4 · ½ = 6. Using sin 60° instead gives the cross product magnitude, about 10.4.');
  mc(1, 4, 4, 'Exam', 'If |u| = 3, |v| = 4 and the angle between them is 60°, then |u × v| equals:', '6√3',
    ['6', '12', '10'], '|u × v| = |u||v| sin θ = 12 · (√3/2) = 6√3 ≈ 10.4. Sine for the cross, cosine for the dot.');
  mc(1, 2, 2, 'Method', 'The equation x² + y² + z² − 4x = 0 describes:', 'A sphere of radius 2 centred at (2, 0, 0)',
    ['A sphere of radius 4 centred at the origin', 'A circle in the xy-plane', 'A plane through the origin'], 'Complete the square: (x − 2)² + y² + z² = 4. Completing the square is as useful in three dimensions as it is under a radical.');
  mc(1, 1, 1, 'Recall', 'Adding two vectors is done:', 'Componentwise',
    ['By multiplying magnitudes', 'By adding magnitudes', 'Only if they are perpendicular'], '<a, b> + <c, d> = <a + c, b + d>. Magnitudes do NOT add unless the vectors happen to point the same way.');
  mc(1, 3, 2, 'Method', 'Two nonzero vectors are parallel exactly when:', 'One is a scalar multiple of the other',
    ['Their dot product is zero', 'Their magnitudes are equal', 'Their cross product has length |u||v|'], 'Parallel means the angle is 0 or π, so the cross product vanishes. A zero DOT product is the perpendicular case instead.');
  mc(1, 4, 3, "Applied", "The vector u × v is perpendicular to:", "Both u and v",
    ["u only","v only","Neither, in general"], "Both dot products u · (u × v) and v · (u × v) are zero. For nonparallel inputs, the right-hand rule selects the orientation of the normal vector.");
  mc(1, 1, 2, 'Method', 'For v = <−6, 8>, the magnitude is:', '10',
    ['2', '14', '√14'], '√(36 + 64) = √100 = 10. Signs disappear under the squares, so a negative component never shortens a vector.');
  mc(1, 3, 4, "Exam", "Work done by a constant force F over displacement d is a scalar because:", "It is a dot product",
    ["It is a cross product","Force is always constant","Displacement has no direction"], "W = F · d. Only the component of force along the displacement contributes, which is exactly what the dot product extracts.");

  /* ===================== GYM 2 - Areas and Slices (L5-6) ===================== */
  mc(2, 5, 3, 'Applied', 'The area between y = x² and y = 4 is:', '32/3',
    ['16/3', '8', '64/3'], 'They meet at x = ±2 with the line on top: ∫₋₂² (4 − x²) dx = 16 − 16/3 = 32/3. Symmetry lets you do 2∫₀².');
  mc(2, 5, 3, 'Applied', 'The area between y = sin x and the x-axis from 0 to 2π is:', '4',
    ['0', '2', '2π'], 'The plain integral is 0 because the halves cancel. AREA needs the absolute value, so it is 2 + 2 = 4. Always ask which one is wanted.');
  mc(2, 5, 2, 'Method', 'To find the area between x = y² and x = y + 2, integrating in dy is preferred because:', 'Both curves are already solved for x',
    ['The region is symmetric', 'dy integrals are always shorter', 'The curves never cross'], 'In dy it is one integral of (right − left) = (y + 2 − y²) from y = −1 to 2. In dx it would need splitting.');
  mc(2, 5, 4, 'Exam', '∫₋₁² (y + 2 − y²) dy evaluates to:', '9/2',
    ['7/2', '5', '9'], '[y²/2 + 2y − y³/3] from −1 to 2 = (2 + 4 − 8/3) − (1/2 − 2 + 1/3) = 10/3 + 7/6 = 9/2.');
  mc(2, 6, 3, 'Applied', 'The region under y = x from 0 to 2 revolved about the x-axis gives volume:', '8π/3',
    ['4π', '8π', '4π/3'], 'V = π∫₀² x² dx = π(8/3) = 8π/3. It is a cone of radius 2 and height 2, and ⅓πr²h agrees.');
  mc(2, 6, 3, 'Applied', 'The region between y = x² and y = x from 0 to 1, revolved about the x-axis, gives volume:', '2π/15',
    ['π/6', 'π/30', '4π/15'], 'Washers: π∫₀¹ (x² − x⁴) dx = π(1/3 − 1/5) = 2π/15. The line is the outer radius because it is on top.');
  mc(2, 6, 4, "Exam", "Revolving the region 0 ≤ y ≤ f(x), with f(x) ≥ 0, about y = −1 makes the outer radius:", "f(x) + 1",
    ["f(x) − 1","f(x)","1 − f(x)"], "The distance from the line y = −1 up to the curve is f(x) − (−1). Getting this sign wrong is the single most common volume error.");
  mc(2, 6, 2, 'Method', 'A solid with semicircular cross-sections of diameter f(x) has A(x) equal to:', 'π f(x)²/8',
    ['π f(x)²/2', 'π f(x)²/4', 'π f(x)²'], 'The radius is f(x)/2, so the full circle is π f(x)²/4 and a semicircle is half of that. Confusing diameter with radius costs a factor of four.');
  mc(2, 5, 1, "Recall", "If f and g exchange order inside [a,b], integrating the fixed difference f(x) − g(x) without splitting gives:", "A signed total, not the area",
    ["The exact area","Twice the area","Always zero"], "A fixed difference becomes negative where f is below g. Geometric area is ∫ₐᵇ |f − g| dx, equivalently the sum of top-minus-bottom integrals after splitting.");
  mc(2, 6, 1, 'Recall', 'The washer method is needed when:', 'The region does not touch the axis of revolution',
    ['The region is above the x-axis', 'The curves are not polynomials', 'You integrate in dy'], 'A gap between the region and the axis becomes a hole in the solid, and a hole needs an inner radius subtracted.');
  mc(2, 5, 2, "Method", "y = x³ and y = x intersect at:", "x = −1, 0 and 1",
    ["x = 0 and 1 only","x = ±1 only","x = 0 only"], "x³ = x gives x(x² − 1) = 0, hence −1, 0 and 1. The two bounded lobes lie on [−1,0] and [0,1]; split at the interior crossing x = 0.");
  mc(2, 6, 3, 'Applied', 'For a solid of revolution about the y-axis using disks, you must first:', 'Solve the curve for x in terms of y',
    ['Differentiate the curve', 'Convert to polar', 'Find the arc length'], 'Disks perpendicular to the y-axis have radius x, so x must be a function of y. Avoiding that inversion is exactly why shells exist.');
  mc(2, 6, 4, 'Exam', 'A solid has square cross-sections of side x on [0, 3]. Its volume is:', '9',
    ['27', '3', '27/2'], 'V = ∫₀³ x² dx = 9. Known cross-sections are never a new technique - just write A(x) and integrate.');
  mc(2, 5, 4, 'Exam', 'The area enclosed by y = √x and y = x² is:', '1/3',
    ['1/6', '1/2', '2/3'], 'They meet at 0 and 1 with √x on top: ∫₀¹ (x^(1/2) − x²) dx = 2/3 − 1/3 = 1/3.');
  mc(2, 6, 2, 'Method', 'Volume by slicing requires cross-sections that are:', 'Perpendicular to the axis you integrate along',
    ['Parallel to the axis you integrate along', 'Always circular', 'Of constant area'], 'The slice thickness is the differential, so the face must be perpendicular to that direction for A(x) dx to be a volume.');
  mc(2, 6, 3, "Applied", "For the region between y = x² and y = x on [0,1], π∫₀¹ ((2 − x²)² − (2 − x)²) dx is its washer volume about:", "The line y = 2",
    ["The x-axis","The y-axis","The line x = 2"], "Each radius is written as 2 minus a curve, which is the distance down from the horizontal line y = 2.");
  mc(2, 5, 1, 'Recall', 'In an area-between-curves problem the limits of integration come from:', 'The intersection points, unless the problem states an interval',
    ['The y-intercepts', 'The maxima of both curves', 'Always 0 and 1'], 'Solve the curves equal to each other first. A stated interval overrides this, but then check for crossings inside it.');
  mc(2, 6, 1, "Recall", "The radius in the disk method is measured:", "From the axis of revolution to the curve",
    ["From the origin to the curve","Along the curve","From the y-intercept"], "The radius is the perpendicular distance from the axis to the boundary curve. About the x-axis it is |y|; about the y-axis it is |x|.");

  /* ============ GYM 3 - Shells, Arc Length and Work (L7-9) ============ */
  mc(3, 7, 3, "Applied", "The region under y = x² from 0 to 2 revolved about the y-axis, by shells, has volume:", "8π",
    ["4π","16π","32π/5"], "Shells give 2π∫₀² x³ dx = 8π. Washers also use one integral: π∫₀⁴ (4 − y) dy = 8π, with outer radius 2 and inner radius √y.");
  mc(3, 7, 3, 'Applied', 'Revolving the region under f about the line x = 5 by shells gives a radius of:', '|5 − x|',
    ['x', 'x + 5', '5'], 'The radius is the horizontal distance from the vertical line x = 5 to the shell at position x.');
  mc(3, 8, 3, 'Applied', 'The arc length of y = (2/3)x^(3/2) from 0 to 3 is:', '14/3',
    ['9/2', '2√3', '16/3'], 'f′ = x^(1/2), so L = ∫₀³ √(1 + x) dx = (2/3)(1 + x)^(3/2) from 0 to 3 = (2/3)(8 − 1) = 14/3.');
  mc(3, 8, 4, 'Exam', 'For a straight line y = 3x on [0, 1], the arc length formula gives:', '√10',
    ['1', '3', '√2'], '∫₀¹ √(1 + 9) dx = √10. It agrees with the Pythagorean distance from (0,0) to (1,3), which is a good sanity check.');
  mc(3, 9, 3, 'Applied', 'A spring needing 20 J to stretch from rest to 2 m has spring constant k equal to:', '10 N/m',
    ['20 N/m', '5 N/m', '40 N/m'], 'W = ½k(2)² = 2k = 20, so k = 10. Solve for k from the given work before answering anything else about the spring.');
  mc(3, 9, 3, 'Applied', 'A rod on [0, 2] has density ρ(x) = 3x². Its mass is:', '8',
    ['12', '4', '6'], 'm = ∫₀² 3x² dx = x³ from 0 to 2 = 8. The units of the answer are mass, not density.');
  mc(3, 7, 2, 'Method', 'The height of a shell in 2π∫ (radius)(height) dx is:', 'The vertical extent of the region at that x',
    ['Always f(x) − x', 'The distance to the axis', 'The arc length of the curve'], 'For a region between two curves it is (top − bottom) at that x, exactly as in an area problem.');
  mc(3, 8, 2, 'Method', 'Arc length integrals are usually left unevaluated because:', '√(1 + f′²) rarely has an elementary antiderivative',
    ['The integral always diverges', 'The formula is only an approximation', 'The limits cannot be found'], 'Exam problems are engineered so the radical collapses. If yours does not, setting it up correctly is the marks.');
  mc(3, 9, 4, "Exam", "A 10 m cable hangs vertically from its top and weighs 2 N/m. Ignoring friction, the work to pull the entire cable up to that top is:", "100 J",
    ["200 J","20 J","50 J"], "A slice at depth x weighs 2 dx and rises x, so W = ∫₀¹⁰ 2x dx = 100 J. Each slice travels a DIFFERENT distance, which is what makes it an integral.");
  mc(3, 9, 4, 'Exam', 'In a work problem, what makes it an integral rather than a product is that:', 'Either the force or the distance varies from slice to slice',
    ['The units are joules', 'Gravity is involved', 'The object is heavy'], 'Constant force over a constant distance is just F × d. Variation in either is what forces the sum.');
  mc(3, 8, 1, 'Recall', 'The surface area formula differs from arc length by a factor of:', '2π times the radius of revolution',
    ['2π only', 'The radius only', 'π times the radius squared'], 'Each arc element sweeps a circle, so it contributes 2π(radius) times its own length.');
  mc(3, 7, 4, 'Exam', '2π∫₀¹ x(√x − x²) dx is the volume of the region between y = √x and y = x² revolved about:', 'The y-axis',
    ['The x-axis', 'The line y = 1', 'The line x = 1'], 'Radius x and height (top − bottom) is the shell setup about the y-axis.');
  mc(3, 9, 2, 'Method', 'A tank problem asks for the distance a slab is lifted. That distance is measured:', 'From the slab to the point it is pumped to',
    ['From the slab to the bottom of the tank', 'From the top of the tank to the bottom', 'The thickness of the slab'], 'Often it is pumped to a spout ABOVE the tank rim, which adds a constant to every slab\'s journey.');
  mc(3, 8, 3, 'Applied', 'For y = f(x) on [a, b], arc length is always:', 'At least b − a',
    ['At most b − a', 'Exactly b − a', 'Independent of f'], 'The radical √(1 + f′²) is at least 1, so a curve is never shorter than the straight interval beneath it.');
  mc(3, 7, 1, 'Recall', 'A cylindrical shell unrolled into a flat sheet has width:', '2π times the radius',
    ['π times the radius', 'The radius', '2π times the height'], 'That is the circumference, and it is where the 2π in the shell formula comes from.');
  mc(3, 9, 1, "Recall", "In a fluid of constant density under constant gravity, hydrostatic gauge pressure at depth d is proportional to:", "The depth",
    ["The square of the depth","The surface area","The total volume"], "Gauge pressure is ρgd, measured relative to pressure at the surface. It grows linearly with depth; absolute pressure also includes the surface pressure.");

  /* ============= GYM 4 - Trigonometric Integrals (L12-14) ============= */
  mc(4, 12, 3, 'Applied', '∫ sin²x dx equals:', 'x/2 − sin(2x)/4 + C',
    ['−cos²x/2 + C', 'sin³x/3 + C', 'x/2 + sin(2x)/4 + C'], 'Both powers even, so use sin²x = (1 − cos 2x)/2 and integrate term by term. The minus sign comes from that identity.');
  mc(4, 12, 3, 'Applied', '∫₀^(π/2) sin²x dx equals:', 'π/4',
    ['π/2', '1', 'π'], 'Half-angle gives x/2 − sin 2x/4, and at π/2 the sine term vanishes, leaving π/4. Over a quarter period sin² and cos² each average ½.');
  mc(4, 12, 3, 'Applied', '∫ sin³x dx equals:', '−cos x + cos³x/3 + C',
    ['cos x − cos³x/3 + C', 'sin⁴x/4 + C', '−cos³x/3 + C'], 'Peel one sin x for du = −sin x dx, convert sin²x = 1 − cos²x, then u-substitute with u = cos x.');
  mc(4, 13, 3, "Applied", "∫ tan x sec²x dx equals:", "tan²x/2 + C",
    ["sec²x + C","ln|sec x| + C","tan x sec x + C"], "With u = tan x, du = sec²x dx, so the integral is tan²x/2 + C. The expression sec²x/2 + C would also be valid, since sec²x − tan²x = 1.");
  mc(4, 13, 4, 'Exam', '∫ tan x dx equals:', '−ln|cos x| + C',
    ['ln|cos x| + C', 'sec²x + C', 'ln|sin x| + C'], 'Write tan = sin/cos and substitute u = cos x. Equivalently ln|sec x| + C.');
  mc(4, 14, 3, "Applied", "For ∫ dx/√(4 − x²), take x = 2 sin θ with −π/2 < θ < π/2. The integrand becomes:", "dθ",
    ["2 dθ","cos θ dθ","4 cos²θ dθ"], "√(4 − x²) = 2cos θ and dx = 2cos θ dθ, so everything cancels and the answer is θ = arcsin(x/2) + C.");
  mc(4, 14, 4, 'Exam', '∫ dx/(x² + 9) equals:', '(1/3)arctan(x/3) + C',
    ['arctan(x/3) + C', '(1/9)arctan(x/3) + C', 'ln(x² + 9) + C'], 'The standard form ∫dx/(x² + a²) = (1/a)arctan(x/a). Losing the leading 1/a is the usual slip.');
  mc(4, 12, 2, 'Method', '∫ sin x cos x dx can be done fastest by:', 'Substituting u = sin x',
    ['Half-angle identities', 'Integration by parts', 'Partial fractions'], 'du = cos x dx is sitting right there, giving sin²x/2 + C. u = cos x works equally well and differs by a constant.');
  mc(4, 13, 2, 'Method', 'The derivative of sec x is:', 'sec x tan x',
    ['sec²x', 'tan²x', '−csc x cot x'], 'That is why an odd tangent power pairs with saving sec x tan x for du.');
  mc(4, 14, 2, 'Method', 'For √(x² + 16), the correct substitution is:', 'x = 4 tan θ',
    ['x = 4 sin θ', 'x = 4 sec θ', 'x = 16 tan θ'], 'x² + 16 = 16(tan²θ + 1) = 16 sec²θ. The a in the substitution is 4, not 16 - it is the square root of the constant.');
  mc(4, 12, 1, 'Recall', 'The identity sin²x + cos²x = 1 is used in trig integrals to:', 'Convert leftover even powers after peeling one factor',
    ['Eliminate the differential', 'Change the limits', 'Reduce the degree of a polynomial'], 'It is what turns sin²x into 1 − cos²x so the whole integrand is in one function plus its du.');
  mc(4, 13, 3, 'Applied', '∫ sec²x dx equals:', 'tan x + C',
    ['sec x + C', 'ln|sec x + tan x| + C', 'sec x tan x + C'], 'It is a derivative you should know cold; it is also the du that makes the even-secant case work.');
  mc(4, 14, 4, "Exam", "For a > 0, after x = a sec θ the radical √(x² − a²) becomes:", "a|tan θ|",
    ["a|sin θ|","a|cos θ|","a²tan²θ"], "x² − a² = a²(sec²θ − 1) = a²tan²θ. The absolute value matters if θ can leave the first quadrant.");
  mc(4, 12, 4, 'Exam', '∫₀^π sin²x dx equals:', 'π/2',
    ['π', '0', '2'], 'Over a full half-period sin² averages ½, so the integral is ½ · π. The half-angle computation confirms it.');

  /* ====== GYM 5 - Substitution and Partial Fractions (L15-17) ====== */
  mc(5, 16, 3, 'Applied', 'Decomposing 1/(x² − 1) gives:', '½/(x − 1) − ½/(x + 1)',
    ['1/(x − 1) − 1/(x + 1)', '½/(x − 1) + ½/(x + 1)', '1/(x − 1) + 1/(x + 1)'], 'Set x = 1 to get A = ½ and x = −1 to get B = −½. Substituting the roots is far faster than expanding.');
  mc(5, 16, 4, 'Exam', '∫ dx/(x² − 1) equals:', '½ ln|(x − 1)/(x + 1)| + C',
    ['ln|x² − 1| + C', 'arctan x + C', '½ ln|x² − 1| + C'], 'Integrate the decomposition: ½ln|x − 1| − ½ln|x + 1|, then combine the logs.');
  mc(5, 16, 3, "Applied", "The standard decomposition of 1/(x(x − 2)²), with a separate term for every linear-factor power, is:", "A/x + B/(x − 2) + C/(x − 2)²",
    ["A/x + B/(x − 2)²","A/x + (Bx + C)/(x − 2)²","A/x + B/(x − 2)"], "Use A/x + B/(x − 2) + C/(x − 2)². Combining the last two terms into one linear numerator over (x − 2)² is equivalent, but is not the requested separate-power form.");
  mc(5, 17, 3, 'Applied', 'For ∫ (x² + 1)/(x + 1) dx the first step is:', 'Long division, giving x − 1 + 2/(x + 1)',
    ['Partial fractions directly', 'Substituting x = tan θ', 'Completing the square'], 'Numerator degree 2 exceeds denominator degree 1, so the fraction is improper. Divide first, then integrate the pieces.');
  mc(5, 15, 3, 'Applied', 'x² + 4x + 5 completes the square to:', '(x + 2)² + 1',
    ['(x + 2)² − 1', '(x + 4)² + 5', '(x + 2)² + 5'], 'Half of 4 is 2, and 2² = 4, so subtract the 4 you added: 5 − 4 = 1. It is now the u² + a² form.');
  mc(5, 15, 4, 'Exam', '∫ dx/(x² + 4x + 5) equals:', 'arctan(x + 2) + C',
    ['ln|x² + 4x + 5| + C', 'arctan(x + 2)/2 + C', 'arcsin(x + 2) + C'], 'Complete the square to (x + 2)² + 1, then it is the standard arctangent form with a = 1.');
  mc(5, 16, 2, "Method", "After clearing denominators in A/(x − 3) + B/(x + 1) = 5/((x − 3)(x + 1)), A is isolated by:", "Setting x = 3",
    ["Expanding and matching all coefficients","Differentiating both sides","Setting x = 0"], "The polynomial identity is A(x + 1) + B(x − 3) = 5. Set x = 3 to obtain 4A = 5, so A = 5/4. Never substitute a pole into the original rational expressions.");
  mc(5, 17, 2, 'Method', 'A denominator of x² + x + 1 is irreducible because:', 'Its discriminant is negative',
    ['Its degree is 2', 'It has no constant term', 'It is not monic'], '1 − 4 = −3 < 0, so there are no real roots and it cannot split into real linear factors. It takes a linear numerator.');
  mc(5, 15, 2, 'Method', 'For a definite integral, changing the limits during substitution:', 'Removes the need to convert back to the original variable',
    ['Is optional but always slower', 'Changes the value of the integral', 'Only works for trigonometric substitutions'], 'It is both faster and safer, since the reference triangle is where transcription errors happen.');
  mc(5, 16, 1, 'Recall', 'Before decomposing, the denominator must be:', 'Factored completely over the reals',
    ['Expanded', 'Differentiated', 'Made monic'], 'The factorisation dictates the form of the decomposition and nothing else does.');
  mc(5, 17, 4, 'Exam', 'For an integral you do not recognise, the first thing to try is:', 'A plain u-substitution',
    ['Partial fractions', 'Trigonometric substitution', 'Integration by parts'], 'Look for a function and its derivative in the integrand. It is the cheapest technique and it resolves a surprising fraction of problems.');
  mc(5, 16, 4, 'Exam', 'The number of unknown constants when decomposing 1/((x − 1)(x² + 4)) is:', '3',
    ['2', '4', '1'], 'A/(x − 1) contributes one and (Bx + C)/(x² + 4) contributes two. Count them before you start solving.');
  mc(5, 15, 3, 'Applied', 'Under x = 3 sin θ, the definite integral from x = 0 to x = 3 becomes θ from:', '0 to π/2',
    ['0 to 3', '0 to π', '0 to π/6'], 'sin θ = 0 at θ = 0 and sin θ = 1 at θ = π/2. Carrying the old limits into the new variable is a classic error.');
  mc(5, 17, 1, "Recall", "Partial fraction decomposition is useful because it rewrites a proper rational function as:", "A sum of simpler rational fractions",
    ["A polynomial","A trigonometric integral","An improper integral"], "The simpler rational pieces can be integrated using logarithms, arctangents and, for repeated factors, rational terms. For example, ∫(x − a)⁻² dx = −1/(x − a) + C.");
  mc(5, 16, 2, 'Method', 'If a decomposition produces a contradiction when solving, the usual cause is:', 'The assumed form was not general enough',
    ['The integral diverges', 'The numerator was too small', 'A sign error in the limits'], 'Most often a repeated factor was given one term instead of several, or a quadratic was given a constant numerator.');

  /* ======= GYM 6 - Improper Integrals and Sequences (L18-19) ======= */
  mc(6, 18, 3, 'Applied', '∫₀^∞ e^(−x) dx equals:', '1',
    ['0', '∞', 'e'], 'lim_{b→∞} [−e^(−x)]₀ᵇ = lim (−e^(−b) + 1) = 1. Exponential decay always wins against an infinite interval.');
  mc(6, 18, 3, 'Applied', '∫₀¹ dx/√x equals:', '2',
    ['1', '∞', '1/2'], 'Improper at 0 with p = ½ < 1, so it converges. lim_{a→0⁺} [2√x]ₐ¹ = 2.');
  mc(6, 18, 3, 'Applied', '∫₀¹ dx/x² is:', 'Divergent',
    ['1', '2', '1/2'], 'Improper at 0 with p = 2, and near zero convergence needs p < 1. The antiderivative −1/x blows up.');
  mc(6, 18, 4, 'Exam', '∫₋₁¹ dx/x is:', 'Divergent, and must be split at 0',
    ['0, by symmetry', '2 ln 2', 'Convergent to ln 2'], 'The symmetry argument is a trap: each half diverges independently, so the whole thing diverges. Splitting at the bad point is not optional.');
  mc(6, 18, 4, 'Exam', '∫₁^∞ dx/√x is:', 'Divergent',
    ['2', '1', '1/2'], 'p = ½, and at infinity convergence needs p > 1. The near-zero rule is the opposite way round - keep them separate.');
  mc(6, 19, 3, 'Applied', 'The sequence aₙ = (−1)ⁿ:', 'Diverges by oscillation',
    ['Converges to 0', 'Converges to 1', 'Converges to −1'], 'It is bounded but never settles. Bounded alone does not give convergence.');
  mc(6, 19, 3, 'Applied', 'The sequence aₙ = (3n + 1)/(2n − 5) converges to:', '3/2',
    ['0', '∞', '1'], 'Divide through by n: (3 + 1/n)/(2 − 5/n) → 3/2. The ratio of leading coefficients is the limit whenever the degrees match.');
  mc(6, 19, 2, 'Method', 'Σ from n = 1 of (1/3)ⁿ equals:', '1/2',
    ['3/2', '1/3', '3'], 'First term written is 1/3 and r = 1/3, so the sum is (1/3)/(1 − 1/3) = 1/2. Starting at n = 0 would instead give 3/2.');
  mc(6, 19, 4, 'Exam', 'Σ 1/(n(n + 1)) from n = 1 equals:', '1',
    ['1/2', '2', 'Divergent'], 'It telescopes: 1/n − 1/(n+1), so sₙ = 1 − 1/(n+1) → 1. Writing out four terms shows the cancellation.');
  mc(6, 18, 2, "Method", "∫₂^∞ dx/(x − 2)² is improper because:", "The integrand blows up at x = 2 and the interval extends to infinity",
    ["Only the upper limit is infinite","Only the integrand blows up","The integrand is negative"], "x = 2 makes the integrand blow up and the upper limit is infinite. Split it into two independent pieces.");
  mc(6, 19, 1, 'Recall', 'For Σ aₙ, the partial sum sₙ is:', 'a₁ + a₂ + … + aₙ',
    ['aₙ − aₙ₋₁', 'The limit of aₙ', 'The average of the first n terms'], 'The series converges exactly when this sequence of partial sums converges.');
  mc(6, 18, 1, "Recall", "An integral over an infinite interval that converges means:", "The limit of the finite integrals exists and is finite",
    ["The integrand tends to zero","The area is exactly zero","The integrand is bounded"], "Convergence means the defining improper limits exist and are finite. An integrand need not tend to zero: continuous narrow spikes can have finite total area. Conversely, 1/x tends to zero but its integral from 1 to infinity diverges.");
  mc(6, 19, 2, 'Method', 'A geometric series with r = −1/2:', 'Converges, because |r| < 1',
    ['Diverges, because r is negative', 'Converges only if a > 0', 'Diverges by oscillation'], 'Only the MAGNITUDE of r matters. A negative ratio makes an alternating series that still sums to a/(1 − r).');
  mc(6, 18, 3, 'Applied', '∫₁^∞ dx/x^(3/2) equals:', '2',
    ['1', '3/2', 'Divergent'], 'p = 3/2 > 1 so it converges, and [−2x^(−1/2)]₁^∞ = 0 + 2 = 2.');
  mc(6, 19, 4, 'Exam', 'Σ from n = 2 of (1/2)ⁿ equals:', '1/2',
    ['1', '2', '1/4'], 'The first term ACTUALLY WRITTEN is (1/2)² = 1/4, so the sum is (1/4)/(1 − 1/2) = 1/2. The starting index changes a, never r.');
  mc(6, 19, 1, 'Recall', 'aₙ → 0 for a series Σ aₙ means:', 'The Divergence Test is inconclusive',
    ['The series converges', 'The series diverges', 'The series converges absolutely'], 'It only rules out the easy divergence. The harmonic series is the standing counterexample.');
  mc(6, 18, 2, 'Method', 'Comparison for improper integrals requires the integrands to be:', 'Nonnegative on the interval',
    ['Continuous everywhere', 'Decreasing', 'Bounded above by 1'], 'Sign changes break the trapping argument, exactly as they do for series comparison.');
  mc(6, 19, 3, 'Applied', 'The sequence aₙ = n/2ⁿ converges to:', '0',
    ['1', '∞', '1/2'], 'Exponential growth beats polynomial growth, so the denominator wins. L\'Hôpital on x/2ˣ confirms it.');

  /* ============ GYM 7 - Series and the First Tests (L21-23) ============ */
  mc(7, 22, 3, 'Applied', 'Σ 1/n^(3/2) is:', 'Convergent, as a p-series with p = 3/2',
    ['Divergent, as a p-series with p = 3/2', 'Convergent, by the Divergence Test', 'Inconclusive'], 'p = 1.5 > 1. The Divergence Test can never prove convergence, whatever the terms do.');
  mc(7, 22, 3, 'Applied', 'Σ 1/√n is:', 'Divergent, as a p-series with p = ½',
    ['Convergent, as a p-series with p = ½', 'Convergent by comparison with Σ1/n²', 'Inconclusive'], 'p = ½ ≤ 1. Note it sits ABOVE the harmonic series term by term, which is the comparison argument for divergence.');
  mc(7, 22, 3, "Applied", "Which limit of its terms makes the Divergence Test immediately settle Σₙ₌₁^∞ n/(n + 1)?", "Its terms tend to 1, not 0",
    ["It is a p-series with p = 1","It is geometric with r = 1","Its terms tend to 0"], "The Divergence Test settles it in one glance - always the first thing to check.");
  mc(7, 23, 3, 'Applied', 'For Σ (2n² + 1)/(n⁴ + 3), limit comparison against Σ1/n² gives:', 'Convergence, since the limit is 2',
    ['Divergence, since the limit is 2', 'Inconclusive, since the limit is not 1', 'Convergence, since the limit is 0'], 'Keep leading powers: 2n²/n⁴ = 2/n². Any finite POSITIVE limit transfers the verdict; it need not be 1.');
  mc(7, 23, 4, 'Exam', 'To show Σ 1/(n² + n) converges, comparison with Σ1/n² needs the inequality:', '1/(n² + n) ≤ 1/n²',
    ['1/(n² + n) ≥ 1/n²', '1/(n² + n) ≤ 1/n', '1/(n² + n) ≥ 1/n'], 'A bigger denominator makes a smaller term, so it is trapped under a convergent series. The inequality must point that way.');
  mc(7, 22, 4, 'Exam', 'The Integral Test applied to Σ 1/(n ln n) from n = 2 gives:', 'Divergence, since ∫dx/(x ln x) = ln|ln x| diverges',
    ['Convergence, since the terms tend to 0', 'Convergence, by comparison with Σ1/n²', 'Inconclusive'], 'u = ln x turns it into ∫du/u. It diverges, though extremely slowly - a good example of terms tending to zero without convergence.');
  mc(7, 21, 3, 'Applied', 'Σ 3·(2/5)ⁿ from n = 0 equals:', '5',
    ['3', '15/2', '6'], 'a = 3 and r = 2/5, so the sum is 3/(1 − 2/5) = 3/(3/5) = 5.');
  mc(7, 21, 4, 'Exam', 'Σ 2ⁿ/3ⁿ⁺¹ from n = 0 equals:', '1',
    ['2/3', '3', '1/3'], 'Rewrite as (1/3)Σ(2/3)ⁿ = (1/3)(1/(1 − 2/3)) = (1/3)(3) = 1. Pull constants out before identifying a and r.');
  mc(7, 21, 2, "Method", "For Sₙ = Σₖ₌₁ⁿ (1/k − 1/(k + 2)), telescoping gives:", "1 + ½ − 1/(n+1) − 1/(n+2)",
    ["1 − 1/(n + 2)","1/n − 1/(n + 2)","1 + 1/n"], "With a gap of two, TWO terms survive at each end. Writing four terms out is the only reliable way to see this.");
  mc(7, 23, 2, 'Method', 'Limit comparison is usually preferred over direct comparison for:', 'Ratios of polynomials',
    ['Alternating series', 'Series with factorials', 'Geometric series'], 'Comparing with the ratio of leading powers is immediate, while constructing a valid inequality for direct comparison can be fiddly.');
  mc(7, 22, 2, 'Method', 'Before applying the Integral Test you must verify the function is:', 'Positive, continuous and decreasing on the interval',
    ['Differentiable', 'Bounded above', 'Increasing'], 'All three. Skipping the decreasing check is how this test gets misapplied.');
  mc(7, 21, 1, 'Recall', 'In the geometric sum a/(1 − r), a is:', 'The first term of the series as written',
    ['Always the n = 0 term', 'The common ratio', 'The number of terms'], 'If the sum starts at n = 3, then a is the n = 3 term. r is unaffected by the starting index.');
  mc(7, 23, 1, 'Recall', 'Comparison tests require the terms to be:', 'Nonnegative',
    ['Decreasing', 'Bounded by 1', 'Alternating'], 'A sign change breaks the trapping argument. Alternating series need their own test.');
  mc(7, 22, 1, 'Recall', 'The harmonic series Σ1/n:', 'Diverges, though very slowly',
    ['Converges to 1', 'Converges to ln 2', 'Diverges quickly'], 'It is the p = 1 boundary case, and it is the standard counterexample to "terms go to zero so it converges".');
  mc(7, 21, 2, 'Method', 'Σ (−1)ⁿ from n = 0:', 'Diverges, since |r| = 1',
    ['Converges to ½', 'Converges to 0', 'Converges to 1'], 'Geometric with r = −1, and the formula needs |r| < 1 strictly. The partial sums oscillate 1, 0, 1, 0.');
  mc(7, 23, 4, "Exam", "Which convergent geometric series directly bounds Σₙ₌₁^∞ 1/(2ⁿ + n) from above term by term?", "Σ 1/2ⁿ",
    ["Σ 1/n","Σ 1/n²","Σ 2ⁿ"], "2ⁿ + n > 2ⁿ, so the terms sit below a convergent geometric series. Compare with the dominant part of the denominator.");

  /* ====== GYM 8 - Alternating Series and Choosing a Test (L24-26) ====== */
  mc(8, 25, 3, 'Applied', 'For Σ n!/(2ⁿ), the Ratio Test limit is:', '∞, so it diverges',
    ['0, so it converges', '1, inconclusive', '½, so it converges'], 'The ratio is (n+1)/2 → ∞. Factorials outgrow exponentials, so the terms do not even tend to zero.');
  mc(8, 25, 3, "Applied", "For Σₙ₌₀^∞ 2ⁿ/n!, the Ratio Test limit is:", "0, so it converges absolutely",
    ["2, so it diverges","1, inconclusive","∞, so it diverges"], "The ratio is 2/(n+1) → 0. This series is the Maclaurin series for e² evaluated term by term.");
  mc(8, 25, 3, 'Applied', 'For Σ (n/(2n + 1))ⁿ, the Root Test gives:', '½, so it converges',
    ['2, so it diverges', '1, inconclusive', '0, so it converges'], 'The nth root strips the outer power, leaving n/(2n + 1) → ½. An nth power in the term is the Root Test signal.');
  mc(8, 24, 3, "Applied", "Using the first-omitted-term bound for Σₖ₌₁^∞ (−1)ᵏ⁺¹/k², what is the smallest n that guarantees |S − Sₙ| ≤ 0.01?", "9",
    ["5","100","3"], "Require 1/(n + 1)² ≤ 0.01, hence n + 1 ≥ 10 and n ≥ 9. Nine terms are sufficient under this bound. The bound need not give the smallest n for the actual error.");
  mc(8, 24, 4, 'Exam', 'Σ (−1)ⁿ/√n is:', 'Conditionally convergent',
    ['Absolutely convergent', 'Divergent', 'Geometric'], 'The Alternating Series Test passes, but Σ1/√n is a p-series with p = ½ and diverges. So it converges, but not absolutely.');
  mc(8, 24, 4, 'Exam', 'Σ (−1)ⁿ n/(n + 1) is:', 'Divergent, by the Divergence Test',
    ['Conditionally convergent', 'Absolutely convergent', 'Convergent by the Alternating Series Test'], 'The term sizes tend to 1, not 0, so the Alternating Series Test fails at its second condition and the series diverges outright.');
  mc(8, 26, 3, 'Applied', 'The best first test for Σ (n² + 1)/(n³ + 2n) is:', 'Limit comparison with Σ1/n',
    ['The Ratio Test', 'The Alternating Series Test', 'The Root Test'], 'Leading powers give n²/n³ = 1/n, so it diverges. The Ratio Test on a ratio of polynomials always returns 1 and tells you nothing.');
  mc(8, 26, 3, 'Applied', 'The Ratio Test applied to any p-series returns:', '1, which is inconclusive',
    ['0', '∞', 'p'], '(n/(n+1))ᵖ → 1 for every p. That is why you must recognise p-series by sight rather than reaching for the Ratio Test.');
  mc(8, 24, 2, 'Method', 'For the Alternating Series Test, the decreasing condition applies to:', 'The absolute values |aₙ|',
    ['The signed terms aₙ', 'The partial sums', 'The ratios aₙ₊₁/aₙ'], 'The signed terms alternate, so they are never monotonic. It is the SIZES that must shrink.');
  mc(8, 25, 2, "Method", "If the Root Test gives L = 1, then:", "The test is inconclusive and you must switch",
    ["The series converges","The series diverges","The series converges conditionally"], "At L = 1 the Root Test is inconclusive. If the absolute consecutive-term ratio has a limit, the root limit equals it. The Root Test can still be decisive when the ratio limit does not exist.");
  mc(8, 26, 4, "Exam", "For Σₙ₌₀^∞ (−1)ⁿ/n!, the correct conclusion is:", "Absolutely convergent, by the Ratio Test on |aₙ|",
    ["Conditionally convergent","Divergent","Convergent but not absolutely"], "Σ1/n! converges (it sums to e), so the alternating version converges absolutely. It equals 1/e.");
  mc(8, 24, 1, 'Recall', 'A series that converges conditionally has:', 'Σaₙ convergent but Σ|aₙ| divergent',
    ['Both convergent', 'Both divergent', 'Σ|aₙ| convergent but Σaₙ divergent'], 'The last option is impossible - absolute convergence always implies convergence.');
  mc(8, 26, 2, 'Method', 'An nth power throughout the general term suggests:', 'The Root Test',
    ['The Integral Test', 'Direct comparison', 'The Alternating Series Test'], 'The nth root cancels the nth power cleanly, which no other test does.');
  mc(8, 25, 4, 'Exam', 'For Σ nⁿ/n!, the Ratio Test limit is:', 'e, so it diverges',
    ['1/e, so it converges', '1, inconclusive', '0, so it converges'], 'The ratio is (1 + 1/n)ⁿ → e > 1. Note this is the reciprocal situation to Σn!/nⁿ, which converges.');

  /* ========= GYM 9 - Power Series and Taylor Series (L28-31) ========= */
  mc(9, 29, 3, 'Applied', 'The radius of convergence of Σ n! xⁿ is:', '0',
    ['1', '∞', 'e'], 'The Ratio Test gives (n+1)|x| → ∞ unless x = 0. It converges at the centre alone.');
  mc(9, 29, 3, 'Applied', 'The radius of convergence of Σ xⁿ/n! is:', '∞',
    ['0', '1', 'e'], 'The ratio is |x|/(n+1) → 0 for every x. This is the series for eˣ, which is why it converges everywhere.');
  mc(9, 29, 4, 'Exam', 'The interval of convergence of Σ xⁿ/n² is:', '[−1, 1]',
    ['(−1, 1)', '[−1, 1)', '(−1, 1]'], 'R = 1, and BOTH endpoints give convergent series - Σ1/n² and Σ(−1)ⁿ/n², the second absolutely. Both are included.');
  mc(9, 29, 4, 'Exam', 'The interval of convergence of Σ (x − 2)ⁿ/n is:', '[1, 3)',
    ['(1, 3)', '[1, 3]', '(1, 3]'], 'Centre 2, R = 1. At x = 1 it is the alternating harmonic series (converges); at x = 3 it is the harmonic series (diverges).');
  mc(9, 31, 3, 'Applied', 'The Maclaurin series for sin x is:', 'x − x³/3! + x⁵/5! − …',
    ['1 − x²/2! + x⁴/4! − …', 'x + x³/3! + x⁵/5! + …', 'x − x²/2! + x³/3! − …'], 'Sine is odd, so only odd powers appear. Cosine is even and takes the even powers.');
  mc(9, 31, 3, 'Applied', 'The Maclaurin series for 1/(1 + x) is:', '1 − x + x² − x³ + …',
    ['1 + x + x² + x³ + …', '1 − x²/2 + x⁴/24 − …', 'x − x²/2 + x³/3 − …'], 'Substitute −x into the geometric series. Its radius is still 1.');
  mc(9, 30, 3, 'Applied', 'The Maclaurin series for x²eˣ is found by:', 'Multiplying the series for eˣ by x²',
    ['Differentiating the series for eˣ twice', 'Substituting x² into the series for eˣ', 'Integrating the series for eˣ'], 'Multiplying by a power shifts every exponent up by 2 and leaves the radius unchanged.');
  mc(9, 30, 4, "Exam", "For |x| < 1, differentiating Σₙ₌₁^∞ xⁿ/n term by term gives:", "Σ xⁿ⁻¹, which is 1/(1 − x)",
    ["Σ xⁿ⁺¹/(n(n+1))","Σ nxⁿ","Σ xⁿ/n²"], "The n cancels. The radius stays 1, though the endpoint behaviour changes - x = −1 converged before and does not after.");
  mc(9, 28, 3, 'Applied', 'The degree-3 Maclaurin polynomial of eˣ is:', '1 + x + x²/2 + x³/6',
    ['1 + x + x² + x³', '1 + x + x²/2 + x³/3', 'x + x²/2 + x³/6'], 'Every derivative of eˣ is 1 at 0, so the coefficients are 1/k!, giving 1, 1, ½, 1/6.');
  mc(9, 28, 4, 'Exam', 'Using the degree-1 Taylor polynomial of √x at a = 4 to estimate √4.1 gives:', '2.025',
    ['2.05', '2.0025', '2.25'], 'f(4) = 2 and f′(4) = 1/(2√4) = 1/4, so 2 + 0.25(0.1) = 2.025. The true value is 2.02485.');
  mc(9, 29, 2, 'Method', 'When applying the Ratio Test to a power series you must include:', 'The (x − a)ⁿ factor',
    ['Only the coefficients', 'Only the constant term', 'The centre a alone'], 'The whole point is to solve the resulting inequality for |x − a|, which needs that factor present.');
  mc(9, 31, 2, 'Method', 'The Taylor series of a polynomial centred anywhere is:', 'The polynomial itself, rewritten',
    ['An infinite series', 'Always zero', 'Undefined'], 'All derivatives past the degree vanish, so the series terminates and reproduces the polynomial exactly.');
  mc(9, 30, 2, 'Method', 'Integrating a power series term by term:', 'Preserves the radius of convergence',
    ['Doubles the radius', 'Always shrinks the radius to zero', 'Changes the centre'], 'R is unchanged, though endpoint behaviour may improve - integration tends to help convergence at the edges.');
  mc(9, 28, 1, "Recall", "If the same constant M bounds all required derivatives and d = |x − a| is fixed, why does M dⁿ⁺¹/(n + 1)! tend to zero?", "The factorial eventually outgrows the fixed-base power",
    ["The derivative bound M shrinks","The interval shrinks","The centre moves"], "For fixed M and d, consecutive bounds have ratio d/(n + 2), which tends to zero. Without a uniform derivative bound, increasing n need not make the Lagrange bound vanish.");

  /* ======= GYM 10 - Taylor at Work and Polar (L32-34) ======= */
  mc(10, 32, 3, 'Applied', 'lim_{x→0} (1 − cos x)/x² evaluated by series is:', '1/2',
    ['1', '0', '1/6'], 'cos x = 1 − x²/2 + …, so the numerator is x²/2 − … and dividing by x² leaves 1/2.');
  mc(10, 32, 3, 'Applied', 'lim_{x→0} (eˣ − 1 − x)/x² is:', '1/2',
    ['1', '0', '2'], 'eˣ = 1 + x + x²/2 + …, so the numerator is x²/2 + … Series turn an ugly double L\'Hôpital into one line.');
  mc(10, 32, 4, 'Exam', '∫₀¹ sin(x²) dx as a series begins:', '1/3 − 1/42 + …',
    ['1 − 1/6 + …', '1/2 − 1/24 + …', '1/3 − 1/7 + …'], 'sin(x²) = x² − x⁶/6 + …, and integrating gives x³/3 − x⁷/42 + …, evaluated at 1.');
  mc(10, 32, 3, 'Applied', 'The Maclaurin series for arctan x is:', 'x − x³/3 + x⁵/5 − …',
    ['x − x³/3! + x⁵/5! − …', '1 − x²/2 + x⁴/4 − …', 'x + x³/3 + x⁵/5 + …'], 'It comes from integrating 1/(1 + x²) = 1 − x² + x⁴ − … term by term. The denominators are odd integers, not factorials.');
  mc(10, 33, 3, 'Applied', 'The polar point (2, π/3) in rectangular coordinates is:', '(1, √3)',
    ['(√3, 1)', '(2, π/3)', '(1/2, √3/2)'], 'x = 2cos(π/3) = 1 and y = 2sin(π/3) = √3. Cosine with x, sine with y.');
  mc(10, 33, 3, "Applied", "With r > 0 and 0 ≤ θ < 2π, the rectangular point (0, −4) has polar coordinates:", "(4, 3π/2)",
    ["(4, π/2)","(−4, π/2)","(4, 0)"], "The required positive radius is 4 and the angle is 3π/2. Without r > 0, (−4, π/2) would represent the same point as well.");
  mc(10, 34, 3, 'Applied', 'The polar equation r = 2cos θ describes:', 'A circle of radius 1 centred at (1, 0)',
    ['A circle of radius 2 centred at the origin', 'A cardioid', 'A line'], 'Multiply by r: r² = 2r cos θ, so x² + y² = 2x, which completes the square to (x − 1)² + y² = 1.');
  mc(10, 34, 4, 'Exam', 'The rose r = sin 3θ has:', '3 petals',
    ['6 petals', '9 petals', '1 petal'], 'k = 3 is odd, so the count is k. An even k would give 2k, because the second sweep lays down a fresh set.');
  mc(10, 34, 4, 'Exam', 'The rose r = cos 4θ has:', '8 petals',
    ['4 petals', '16 petals', '2 petals'], 'k = 4 is even, so the count is 2k = 8. Odd and even behave differently; this is worth memorising rather than deriving.');
  mc(10, 34, 2, 'Method', 'The polar curve r = 1 + 2cos θ is:', 'A limaçon with an inner loop',
    ['A cardioid', 'A circle', 'A four-petal rose'], 'For r = a ± b cos θ, b > a gives an inner loop, a = b gives a cardioid, and b < a gives a dimpled or convex limaçon.');
  mc(10, 32, 2, 'Method', 'To find the series for cos(2x), you should:', 'Substitute 2x into the series for cos x',
    ['Multiply the series for cos x by 2', 'Differentiate the series for sin x', 'Divide the series for cos x by 2'], 'Substitution into a known series is nearly always faster than computing derivatives one at a time.');
  mc(10, 33, 2, "Method", "Allowing r to be any real number, the polar equation θ = π/4 describes:", "A line through the origin at 45°",
    ["A circle of radius π/4","A ray in the first quadrant only","A spiral"], "With r allowed to be negative it is the whole line. Restricting r ≥ 0 would give only the ray.");
  mc(10, 34, 3, 'Applied', 'For r = 1 + cos θ at θ = π/2, the value of r is:', '1',
    ['0', '2', 'π/2'], 'cos(π/2) = 0, so r = 1. The cardioid reaches 2 at θ = 0 and pinches to 0 at θ = π.');
  mc(10, 32, 1, 'Recall', 'The Maclaurin series for ln(1 + x) is:', 'x − x²/2 + x³/3 − …',
    ['1 − x + x² − …', 'x − x³/3! + x⁵/5! − …', 'x + x²/2 + x³/3 + …'], 'It comes from integrating 1/(1 + x). Its radius is 1, and it converges at x = 1 to ln 2.');
  mc(10, 33, 1, 'Recall', 'A negative r in polar coordinates means:', 'Plot the point in the opposite direction from θ',
    ['The point does not exist', 'Reflect across the x-axis', 'Add 2π to θ'], '(−r, θ) is the same point as (r, θ + π). It is why a polar point has infinitely many names.');
  mc(10, 34, 1, "Recall", "To find where a polar curve passes through the origin, set:", "r = 0 and solve for θ",
    ["θ = 0 and solve for r","dr/dθ = 0","r = 1"], "Solve r(θ) = 0 to locate parameter values at the origin. For a smooth curve at a simple zero with r′(θ) ≠ 0, the tangent line has that angle modulo π. Degenerate cases need a limit analysis.");

  /* ============ EXAM-ONLY: 91 (L10, L11) ============ */
  mc(91, 11, 3, 'Applied', '∫ x sin x dx equals:', '−x cos x + sin x + C',
    ['x cos x − sin x + C', '−x cos x − sin x + C', 'x sin x + cos x + C'], 'u = x and dv = sin x dx give v = −cos x, so uv − ∫v du = −x cos x + ∫cos x dx.');
  mc(91, 11, 3, 'Applied', '∫ x eˣ dx equals:', 'eˣ(x − 1) + C',
    ['eˣ(x + 1) + C', 'x²eˣ/2 + C', 'eˣ + C'], 'uv − ∫v du = xeˣ − ∫eˣ dx = xeˣ − eˣ. Differentiate to check: eˣ(x − 1) + eˣ = xeˣ.');
  mc(91, 11, 4, 'Exam', '∫₀¹ ln x dx is:', 'Convergent, equal to −1',
    ['Divergent', 'Equal to 0', 'Equal to 1'], 'By parts it is [x ln x − x]₀¹. The x ln x term tends to 0 at the lower limit, leaving −1. It is improper at 0 but converges.');
  mc(91, 11, 4, 'Exam', '∫ x² eˣ dx requires integration by parts:', 'Twice',
    ['Once', 'Three times', 'Not at all'], 'Each application drops the polynomial degree by one. A degree-n polynomial times eˣ needs n applications.');
  mc(91, 10, 3, "Applied", "For a tank pumped to a spout 2 m above its rim, a slab at height y above the bottom of a 5 m tank rises:", "7 − y",
    ["5 − y","y + 2","y"], "It must reach 5 + 2 = 7 metres, so the distance is 7 − y. Forgetting the spout height is the classic lost mark.");
  mc(91, 10, 3, 'Applied', 'A slab of water of area A and thickness dy has weight:', 'ρg A dy',
    ['ρ A dy', 'g A dy', 'ρg A'], 'Weight is density times gravity times volume, and the volume of the slab is A dy. For water in SI, ρg is about 9800 N/m³.');
  mc(91, 10, 4, 'Exam', 'Hydrostatic force on a submerged vertical plate is:', '∫ ρg (depth) (width) d(depth)',
    ['∫ ρg (depth) d(depth)', '∫ ρg (width) d(depth)', 'ρg × area × total depth'], 'Pressure ρg·depth times the area of the strip, width·d(depth). Both the depth and the width can vary.');
  mc(91, 10, 2, 'Method', 'In a pumping problem, setting y = 0 at the bottom versus the top:', 'Changes the integrand and the limits, but not the answer',
    ['Changes the answer', 'Is not allowed', 'Only works for cylindrical tanks'], 'Pick whichever makes the geometry simplest, then be consistent. Mixing conventions halfway through is the real danger.');
  mc(91, 11, 2, "Method", "For ∫ x ln x dx, the right choice of u is:", "ln x",
    ["x","x ln x","dx"], "Choose u = ln x and dv = x dx. Then du = dx/x and v = x²/2, so ∫v du = ∫x/2 dx and the result is (x²/2)ln x − x²/4 + C.");
  mc(91, 11, 1, 'Recall', 'In ∫u dv = uv − ∫v du, the term v comes from:', 'Integrating dv',
    ['Differentiating dv', 'Differentiating u', 'Integrating u'], 'You differentiate u and integrate dv. Reversing those is the most common setup error.');

  /* ============ EXAM-ONLY: 92 (L20) ============ */
  mc(92, 20, 3, 'Applied', 'The sequence aₙ = (−1)ⁿ/n is:', 'Convergent to 0 but not monotonic',
    ['Monotonic and convergent', 'Divergent', 'Increasing and unbounded'], 'The sizes shrink to 0 so it converges, but the sign flips every step so it never stays in one direction.');
  mc(92, 20, 3, 'Applied', 'The sequence aₙ = 2 − 1/n is:', 'Increasing and bounded above by 2',
    ['Decreasing and bounded below by 2', 'Unbounded', 'Constant'], 'It rises toward 2 without reaching it, so the Monotone Convergence Theorem gives convergence to 2.');
  mc(92, 20, 4, 'Exam', 'The sequence aₙ = n²/2ⁿ:', 'Converges to 0',
    ['Diverges to ∞', 'Converges to 1', 'Oscillates'], 'Exponential growth beats polynomial growth. Two applications of L\'Hôpital to x²/2ˣ confirm it.');
  mc(92, 20, 4, 'Exam', 'A bounded sequence that is not monotonic:', 'May converge or may diverge',
    ['Always converges', 'Always diverges', 'Is never bounded'], '(−1)ⁿ/n converges and (−1)ⁿ does not, and both are bounded and non-monotonic. Boundedness alone decides nothing.');
  mc(92, 20, 2, 'Method', 'To show aₙ = n/(n + 1) is increasing you can:', 'Show aₙ₊₁ − aₙ > 0, or that f(x) = x/(x+1) has positive derivative',
    ['Compute the limit', 'Check that it is bounded', 'Show the terms are positive'], 'Either the difference or the derivative of the continuous extension works. A limit says nothing about monotonicity.');
  mc(92, 20, 2, "Method", "The sequence aₙ = sin(n) is:", "Bounded but divergent",
    ["Convergent to 0","Unbounded","Monotonic"], "If sin n converged, sin(n + 2) + sin n = 2 cos(1) sin(n + 1) would force its limit to be 0. Then sin(n + 1) = sin n cos(1) + cos n sin(1) would force cos n → 0, contradicting sin²n + cos²n = 1. Angles are in radians.");
  mc(92, 20, 1, 'Recall', 'A sequence bounded above and below is called:', 'Bounded',
    ['Monotonic', 'Convergent', 'Cauchy'], 'Bounded is about size, monotonic is about direction. You need both for the Monotone Convergence Theorem.');
  mc(92, 20, 1, 'Recall', 'If aₙ → L and L is finite, the sequence is:', 'Convergent',
    ['Monotonic', 'Necessarily increasing', 'Necessarily positive'], 'Convergence says only that the terms settle. Direction and sign are separate questions.');
  mc(92, 20, 3, "Applied", "The sequence aₙ = (1 + 1/n)ⁿ converges to:", "e",
    ["1","0","∞"], "This is the defining limit for e. It is the Ratio Test limit for Σ nⁿ/n!; the reciprocal series Σ n!/nⁿ has ratio limit 1/e.");
  mc(92, 20, 4, 'Exam', 'A recursively defined sequence a₁ = 1, aₙ₊₁ = √(2 + aₙ) converges to:', '2',
    ['1', '√2', '∞'], 'It is increasing and bounded above by 2, so it converges to L where L = √(2 + L), giving L² − L − 2 = 0 and L = 2.');

  /* ============ EXAM-ONLY: 93 (L27) ============ */
  mc(93, 27, 3, 'Applied', 'The degree-1 Taylor polynomial of ln x at a = 1 is:', 'x − 1',
    ['ln x', '1 − x', 'x'], 'ln 1 = 0 and the derivative 1/x is 1 at a = 1, so p₁(x) = 0 + 1(x − 1).');
  mc(93, 27, 3, 'Applied', 'The degree-2 Taylor polynomial of eˣ at a = 0 estimates e^0.1 as:', '1.105',
    ['1.1', '1.1052', '1.11'], '1 + 0.1 + 0.005 = 1.105. The true value is 1.10517, so the degree-2 error is about 0.00017.');
  mc(93, 27, 4, "Exam", "The Maclaurin polynomial of sin x through order 2 is:", "x",
    ["x − x²/2","1 − x²/2","x + x²/2"], "The constant and x² coefficients vanish, leaving x. Its actual degree is 1, and it is identical to the order-1 polynomial. The leading error is −x³/6.");
  mc(93, 27, 4, 'Exam', 'A Taylor polynomial approximation is exact when the function is:', 'A polynomial of degree at most n',
    ['Continuous', 'Differentiable', 'Bounded'], 'All derivatives past the degree are zero, so the remainder vanishes identically.');
  mc(93, 27, 2, 'Method', 'The coefficient of (x − a)² in a Taylor polynomial is:', 'f″(a)/2',
    ['f″(a)', 'f″(a)/3', '2f″(a)'], 'It is f⁽ᵏ⁾(a)/k! with k = 2, and 2! = 2.');
  mc(93, 27, 2, 'Method', 'Choosing a centre a for approximating f near a point x means picking a where:', 'f and its derivatives are easy to evaluate, and a is close to x',
    ['f is zero', 'f has a maximum', 'a equals x exactly'], 'Both conditions matter: an easy centre far from x gives a large error term.');
  mc(93, 27, 1, 'Recall', 'The degree-0 Taylor polynomial of f at a is:', 'The constant f(a)',
    ['The tangent line', 'Zero', 'f′(a)'], 'It matches only the value, not the slope. Adding the slope term gives the degree-1 tangent line.');
  mc(93, 27, 3, 'Applied', 'Using p₁(x) = x for sin x, the estimate of sin(0.1) is:', '0.1, an overestimate',
    ['0.1, an underestimate', '0.0998, exact', '0.1, exact'], 'sin 0.1 ≈ 0.09983, so the linear estimate is slightly high - the x³/6 term that was dropped is subtracted.');
  mc(93, 27, 4, 'Exam', 'If |f⁽ⁿ⁺¹⁾| ≤ M on the interval, the Lagrange error at distance d from the centre is at most:', 'M dⁿ⁺¹/(n + 1)!',
    ['M dⁿ/n!', 'M d/(n + 1)', 'M dⁿ⁺¹'], 'Both the power and the factorial carry n + 1. Dropping the factorial makes the bound uselessly large.');
  mc(93, 27, 1, 'Recall', 'Taylor polynomials approximate best:', 'Near the centre',
    ['Near the endpoints of the interval', 'Far from the centre', 'Equally everywhere'], 'The error carries (x − a)ⁿ⁺¹, which grows quickly once you leave the neighbourhood of a.');

  /* ============ EXAM-ONLY: 94 (L35) ============ */
  mc(94, 35, 3, 'Applied', 'The area enclosed by the circle r = 2 is:', '4π',
    ['2π', '8π', 'π'], '½∫₀^(2π) 4 dθ = ½(4)(2π) = 4π, which agrees with πr² for r = 2.');
  mc(94, 35, 3, 'Applied', 'The area enclosed by the cardioid r = 1 + cos θ is:', '3π/2',
    ['π', '2π', '3π'], '½∫₀^(2π) (1 + cos θ)² dθ. Expanding gives 1 + 2cos θ + cos²θ; the cosine term integrates to 0 and cos²θ contributes π, so ½(2π + π) = 3π/2.');
  mc(94, 35, 4, 'Exam', 'The area of one petal of r = cos 2θ is:', 'π/8',
    ['π/4', 'π/2', 'π'], '½∫₋π/4^(π/4) cos²2θ dθ. The half-angle gives π/4 for the integral, halved to π/8. All four petals total π/2.');
  mc(94, 35, 4, 'Exam', 'The area enclosed by r = 2cos θ, integrating over 0 to 2π, gives:', 'Twice the true area, because the circle is traced twice',
    ['The true area', 'Half the true area', 'Zero'], 'The circle is fully traced as θ runs from −π/2 to π/2. Over 0 to 2π you go round it twice, which is why the θ range must be found first.');
  mc(94, 35, 3, 'Applied', 'The arc length of the circle r = 3 from θ = 0 to 2π is:', '6π',
    ['3π', '9π', '2π'], 'dr/dθ = 0, so L = ∫₀^(2π) √9 dθ = 3(2π) = 6π, which is the circumference 2πr.');
  mc(94, 35, 2, "Method", "For an area between ordered nonnegative polar radii, over an interval sweeping the region once, you subtract:", "The squares of the radii, inside one integral",
    ["The radii, then square","The two separate arc lengths","The angles"], "½∫(r_out² − r_in²) dθ. It is the same distinction as washers versus a squared difference.");
  mc(94, 35, 2, "Method", "Even when both curves use nonnegative radii, what intersection can solving r₁(θ) = r₂(θ) at the same θ miss?", "The origin, which can be reached at different θ values",
    ["Only where their equations are equal","The endpoints of the interval","A point whose distances from the origin differ"], "The origin can occur at different angles on the two curves. When negative radii are allowed, also check equivalent representations (r, θ) and (−r, θ + π).");
  mc(94, 35, 1, 'Recall', 'The one-half in the polar area formula comes from:', 'The area of a circular sector, ½r²Δθ',
    ['Averaging the two radii', 'Symmetry of the curve', 'The chain rule'], 'The element is a thin wedge, not a rectangle, and a sector of angle Δθ has area ½r²Δθ.');
  mc(94, 35, 1, 'Recall', 'Polar arc length includes the term r² because:', 'Moving through an angle also moves you along an arc of radius r',
    ['r is always positive', 'The formula is an approximation', 'θ has no units'], 'The element is √((dr)² + (r dθ)²), and factoring out dθ leaves √(r² + (dr/dθ)²).');
  mc(94, 35, 3, 'Applied', 'For the spiral r = θ from θ = 0 to π, the arc length integrand is:', '√(θ² + 1)',
    ['√(θ² − 1)', 'θ', '√(1 + θ⁴)'], 'r = θ and dr/dθ = 1, so √(r² + (dr/dθ)²) = √(θ² + 1).');
})();
