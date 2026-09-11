/* Original pencil-and-paper variations aligned to the accessible Thomas' Calculus
   Early Transcendentals, 13th edition PDF. The requested course is 15th edition;
   section provenance is recorded honestly because the supplied PDF is 13th.

   These are newly authored problems, not copied exercise text. They fill the
   remaining thin lesson pools after the Field Manual and Quiz 2 family packs load.
   Every item has three progressive hints and a complete worked explanation. */
(function () {
'use strict';
window.CALC_QBANK = window.CALC_QBANK || {};
var added = [];

function add(rows) {
  rows.forEach(function (r) {
    CALC_QBANK[r.chapter] = CALC_QBANK[r.chapter] || [];
    if (CALC_QBANK[r.chapter].some(function (q) { return q.id === r.id; })) {
      throw Error('Duplicate Thomas practice ID: ' + r.id);
    }
    var q = {
      id: r.id, chapter: r.chapter, lesson: r.lesson, t: r.t,
      k: 'mcq', tag: 'Thomas practice', q: r.q, c: r.c, a: r.a,
      why: r.why, hints: r.hints, code: '', family: r.family,
      familyName: r.familyName, variation: r.variation || 1,
      source: "Thomas' Calculus: Early Transcendentals, 13e (accessible reference), Section " + r.section + '; original variation',
      penPaper: true
    };
    CALC_QBANK[r.chapter].push(q);
    added.push(q);
  });
}

add([
  {
    id: 'k1-th-001', chapter: 1, lesson: 1, t: 2,
    family: 'thomas-12.2-vector-magnitude', familyName: 'Vector magnitude', section: '12.2',
    q: 'Find the magnitude of the vector v = (6, -8).',
    c: ['10', '14', '2', '100'], a: 0,
    why: '|v| = sqrt(6^2 + (-8)^2) = sqrt(36 + 64) = sqrt(100) = 10.',
    hints: ['Magnitude comes from the Pythagorean theorem applied to the components.', 'Compute sqrt(6^2 + (-8)^2).', 'The sum under the radical is 36 + 64 = 100.']
  },
  {
    id: 'k1-th-002', chapter: 1, lesson: 1, t: 2,
    family: 'thomas-12.2-unit-vector', familyName: 'Unit vectors', section: '12.2',
    q: 'Find the unit vector in the direction of v = (-3, 4).',
    c: ['(-3/5, 4/5)', '(3/5, -4/5)', '(-4/5, 3/5)', '(-3, 4)'], a: 0,
    why: '|v| = 5, so v/|v| = (-3/5, 4/5). Its magnitude is 1 and its direction agrees with v.',
    hints: ['Divide the original vector by its magnitude.', 'The magnitude of (-3, 4) is 5.', 'Divide both components, including the negative sign, by 5.']
  },
  {
    id: 'k1-th-003', chapter: 1, lesson: 1, t: 3,
    family: 'thomas-12.2-scaled-direction', familyName: 'Vectors with prescribed length', section: '12.2',
    q: 'Find the vector of length 12 that points in the direction of (3, 4).',
    c: ['(36/5, 48/5)', '(9, 12)', '(3/5, 4/5)', '(12, 16)'], a: 0,
    why: 'The unit direction is (3/5, 4/5). Multiplying it by 12 gives (36/5, 48/5), whose magnitude is 12.',
    hints: ['First turn the direction vector into a unit vector.', '|(3, 4)| = 5, so its unit direction is (3/5, 4/5).', 'Multiply both unit-vector components by the requested length 12.']
  },
  {
    id: 'k1-th-004', chapter: 1, lesson: 1, t: 3,
    family: 'thomas-12.2-displacement', familyName: 'Displacement vectors', section: '12.2',
    q: 'A particle moves from P = (-2, 5) to Q = (4, -3). Find its displacement and the distance traveled in a straight line.',
    c: ['(6, -8) and 10', '(-6, 8) and 10', '(2, 2) and sqrt(8)', '(6, 8) and 14'], a: 0,
    why: 'Subtract tail from head: Q - P = (4 - (-2), -3 - 5) = (6, -8). Its length is sqrt(36 + 64) = 10.',
    hints: ['Displacement from P to Q is Q - P, not P - Q.', 'Subtract corresponding coordinates to get (6, -8).', 'Now use the magnitude formula on the displacement vector.']
  },
  {
    id: 'k1-th-005', chapter: 1, lesson: 2, t: 2,
    family: 'thomas-12.1-distance-3d', familyName: 'Distance in space', section: '12.1',
    q: 'Find the distance between P = (1, -2, 3) and Q = (5, 1, -1).',
    c: ['sqrt(41)', 'sqrt(29)', '9', '41'], a: 0,
    why: 'Q - P = (4, 3, -4), so the distance is sqrt(4^2 + 3^2 + (-4)^2) = sqrt(16 + 9 + 16) = sqrt(41).',
    hints: ['Find the three coordinate differences first.', 'The differences are 4, 3, and -4.', 'Square and add: 16 + 9 + 16.']
  },
  {
    id: 'k1-th-006', chapter: 1, lesson: 2, t: 3,
    family: 'thomas-12.1-sphere-standard-form', familyName: 'Spheres by completing squares', section: '12.1',
    q: 'Put x^2 + y^2 + z^2 - 4x + 6y - 2z - 11 = 0 in standard sphere form. Give its center and radius.',
    c: ['(x - 2)^2 + (y + 3)^2 + (z - 1)^2 = 25; center (2, -3, 1), radius 5', '(x + 2)^2 + (y - 3)^2 + (z + 1)^2 = 25; center (-2, 3, -1), radius 5', '(x - 2)^2 + (y + 3)^2 + (z - 1)^2 = 11; radius sqrt(11)', '(x - 4)^2 + (y + 6)^2 + (z - 2)^2 = 25; radius 5'], a: 0,
    why: 'Complete each square: x^2 - 4x = (x - 2)^2 - 4, y^2 + 6y = (y + 3)^2 - 9, and z^2 - 2z = (z - 1)^2 - 1. Moving constants gives 25 on the right.',
    hints: ['Group the x, y, and z terms and complete each square separately.', 'The shifts are x - 2, y + 3, and z - 1.', 'The three added square constants total 4 + 9 + 1; combine them with 11.']
  },
  {
    id: 'k1-th-007', chapter: 1, lesson: 2, t: 2,
    family: 'thomas-12.1-midpoint-3d', familyName: 'Midpoints in space', section: '12.1',
    q: 'Find the midpoint of the segment joining (-4, 7, 2) and (6, -1, 10).',
    c: ['(1, 3, 6)', '(2, 6, 12)', '(-1, 4, 4)', '(5, 3, 8)'], a: 0,
    why: 'Average corresponding coordinates: ((-4 + 6)/2, (7 - 1)/2, (2 + 10)/2) = (1, 3, 6).',
    hints: ['A midpoint averages each pair of coordinates.', 'Compute (-4 + 6)/2, (7 + (-1))/2, and (2 + 10)/2.', 'Keep the three coordinate averages in x, y, z order.']
  },
  {
    id: 'k1-th-008', chapter: 1, lesson: 2, t: 2,
    family: 'thomas-12.2-displacement-3d', familyName: 'Three-dimensional displacement', section: '12.2',
    q: 'Find the vector from A = (3, -1, 4) to B = (-2, 5, 7).',
    c: ['(-5, 6, 3)', '(5, -6, -3)', '(1, 4, 11)', '(-1, 6, 3)'], a: 0,
    why: 'The vector from A to B is B - A = (-2 - 3, 5 - (-1), 7 - 4) = (-5, 6, 3).',
    hints: ['Use head minus tail.', 'Here B is the head and A is the tail.', 'Subtract each A-coordinate from the matching B-coordinate.']
  },
  {
    id: 'k1-th-009', chapter: 1, lesson: 2, t: 3,
    family: 'thomas-12.1-sphere-diameter', familyName: 'Sphere from a diameter', section: '12.1',
    q: 'A sphere has diameter endpoints A = (0, 0, 0) and B = (2, 4, 6). Find its equation.',
    c: ['(x - 1)^2 + (y - 2)^2 + (z - 3)^2 = 14', '(x - 2)^2 + (y - 4)^2 + (z - 6)^2 = 56', '(x - 1)^2 + (y - 2)^2 + (z - 3)^2 = 56', 'x^2 + y^2 + z^2 = 14'], a: 0,
    why: 'The center is the midpoint (1, 2, 3). The diameter length is sqrt(2^2 + 4^2 + 6^2) = sqrt(56), so r^2 = (diameter^2)/4 = 56/4 = 14.',
    hints: ['The center is the midpoint of the diameter endpoints.', 'Use half the diameter as the radius.', 'It is fastest to compute r^2 directly as (2^2 + 4^2 + 6^2)/4.']
  },
  {
    id: 'k1-th-010', chapter: 1, lesson: 2, t: 3,
    family: 'thomas-12.2-unit-vector-3d', familyName: 'Unit vectors in space', section: '12.2',
    q: 'Find the unit vector in the direction of v = (2, -3, 6).',
    c: ['(2/7, -3/7, 6/7)', '(2/49, -3/49, 6/49)', '(-2/7, 3/7, -6/7)', '(2, -3, 6)'], a: 0,
    why: '|v| = sqrt(4 + 9 + 36) = 7. Dividing every component by 7 gives (2/7, -3/7, 6/7).',
    hints: ['A unit vector is v divided by |v|.', 'The magnitude squared is 2^2 + (-3)^2 + 6^2 = 49.', 'Divide each original component by 7, not by 49.']
  }
]);

add([
  {
    id: 'k1-th-011', chapter: 1, lesson: 3, t: 2,
    family: 'thomas-12.3-dot-angle', familyName: 'Dot product and angle type', section: '12.3',
    q: 'For u = (2, -1, 3) and v = (-1, 4, 2), compute u dot v and classify the angle between them.',
    c: ['0; right', '8; acute', '-8; obtuse', '0; parallel'], a: 0,
    why: 'u dot v = 2(-1) + (-1)4 + 3(2) = -2 - 4 + 6 = 0. Nonzero vectors with zero dot product are orthogonal, so the angle is right.',
    hints: ['Multiply matching components and add.', 'The three products are -2, -4, and 6.', 'A zero dot product means orthogonal vectors.']
  },
  {
    id: 'k1-th-012', chapter: 1, lesson: 3, t: 3,
    family: 'thomas-12.3-scalar-projection', familyName: 'Scalar projection', section: '12.3',
    q: 'Find the scalar projection of u = (5, 2) onto v = (3, 4).',
    c: ['23/5', '23/25', '(69/25, 92/25)', '7'], a: 0,
    why: 'comp_v u = (u dot v)/|v|. The dot product is 15 + 8 = 23 and |v| = 5, so comp_v u = 23/5.',
    hints: ['Scalar projection returns one number, not a vector.', 'Use (u dot v)/|v|.', 'u dot v = 23 and |v| = 5.']
  },
  {
    id: 'k1-th-013', chapter: 1, lesson: 3, t: 3,
    family: 'thomas-12.3-vector-projection', familyName: 'Vector projection', section: '12.3',
    q: 'Find the vector projection of u = (3, 5) onto v = (2, 1).',
    c: ['(22/5, 11/5)', '(11/5, 22/5)', '(6/5, 3/5)', '11/5'], a: 0,
    why: 'proj_v u = ((u dot v)/|v|^2)v. Here u dot v = 11 and |v|^2 = 5, so (11/5)(2, 1) = (22/5, 11/5).',
    hints: ['Vector projection must point parallel to v.', 'Compute the scale factor (u dot v)/|v|^2.', 'The scale factor is 11/5; multiply both components of v by it.']
  },
  {
    id: 'k1-th-014', chapter: 1, lesson: 3, t: 3,
    family: 'thomas-12.3-work', familyName: 'Work from a constant force', section: '12.3',
    q: 'A constant force F = (8, -3, 2) moves an object through displacement d = (4, 1, -2). Find the work.',
    c: ['25', '39', '(32, -3, -4)', 'sqrt(77)'], a: 0,
    why: 'Work is the dot product F dot d = 8(4) + (-3)(1) + 2(-2) = 32 - 3 - 4 = 25.',
    hints: ['Work from a constant vector force is a dot product.', 'Multiply corresponding components of F and d.', 'Add 32, -3, and -4.']
  },
  {
    id: 'k1-th-015', chapter: 1, lesson: 4, t: 3,
    family: 'thomas-12.4-cross-product', familyName: 'Cross products', section: '12.4',
    q: 'Compute u cross v for u = (1, 2, 3) and v = (0, -1, 4).',
    c: ['(11, -4, -1)', '(11, 4, -1)', '(-11, 4, 1)', '(8, -3, -1)'], a: 0,
    why: 'Expanding the determinant gives (2(4) - 3(-1), -(1(4) - 3(0)), 1(-1) - 2(0)) = (11, -4, -1). Its dot product with each original vector is 0.',
    hints: ['Use the determinant with i, j, k in the first row.', 'The middle component receives the cofactor minus sign.', 'The components are 8 + 3, -(4 - 0), and -1 - 0.']
  },
  {
    id: 'k1-th-016', chapter: 1, lesson: 4, t: 2,
    family: 'thomas-12.4-parallelogram-area', familyName: 'Area from a cross product', section: '12.4',
    q: 'Find the area of the parallelogram spanned by u = (2, 0, 0) and v = (1, 3, 0).',
    c: ['6', '3', 'sqrt(14)', '12'], a: 0,
    why: 'u cross v = (0, 0, 6), whose magnitude is 6. The magnitude of a cross product is the parallelogram area.',
    hints: ['Parallelogram area is |u cross v|.', 'Both vectors lie in the xy-plane, so the cross product points along z.', 'The z-component is 2(3) - 0(1) = 6.']
  },
  {
    id: 'k1-th-017', chapter: 1, lesson: 4, t: 4,
    family: 'thomas-12.4-triangle-area', familyName: 'Triangle area in space', section: '12.4',
    q: 'Find the area of the triangle with vertices A = (0, 0, 0), B = (2, 1, 0), and C = (1, 0, 3).',
    c: ['sqrt(46)/2', 'sqrt(46)', '23', 'sqrt(14)/2'], a: 0,
    why: 'AB = (2, 1, 0) and AC = (1, 0, 3). Their cross product is (3, -6, -1), with magnitude sqrt(46). A triangle has half the area of the parallelogram, so its area is sqrt(46)/2.',
    hints: ['Build two side vectors from the same vertex.', 'Compute AB cross AC, then take its magnitude.', 'Remember to divide the parallelogram area by 2.']
  },
  {
    id: 'k1-th-018', chapter: 1, lesson: 4, t: 4,
    family: 'thomas-12.4-triple-product', familyName: 'Parallelepiped volume', section: '12.4',
    q: 'Find the volume of the parallelepiped determined by u = (1, 0, 2), v = (2, 1, 0), and w = (0, 3, 1).',
    c: ['13', 'sqrt(13)', '26', '11'], a: 0,
    why: 'Volume is |u dot (v cross w)|. Since v cross w = (1, -2, 6), u dot (v cross w) = 1 + 12 = 13, so the volume is 13.',
    hints: ['Use the absolute value of a scalar triple product.', 'First compute v cross w = (1, -2, 6).', 'Dot that vector with u and take the absolute value.']
  },
  {
    id: 'k3-th-001', chapter: 3, lesson: 7, t: 3,
    family: 'thomas-6.2-shells', familyName: 'Cylindrical shells', section: '6.2',
    q: 'Use cylindrical shells to find the volume generated by revolving the region under y = 4 - x^2 on 0 <= x <= 2 about the y-axis.',
    c: ['8pi', '16pi/3', '4pi', '32pi/3'], a: 0,
    why: 'A shell has radius x and height 4 - x^2. Thus V = 2pi integral from 0 to 2 of x(4 - x^2) dx = 2pi[2x^2 - x^4/4] from 0 to 2 = 2pi(4) = 8pi.',
    hints: ['For shells about the y-axis, radius = x and height = top minus bottom.', 'Set up 2pi integral from 0 to 2 of x(4 - x^2) dx.', 'An antiderivative of 4x - x^3 is 2x^2 - x^4/4.']
  },
  {
    id: 'k3-th-002', chapter: 3, lesson: 8, t: 4,
    family: 'thomas-6.3-arc-length', familyName: 'Arc length with a perfect-square radical', section: '6.3',
    q: 'Find the arc length of y = (1/3)(x^2 + 2)^(3/2) from x = 0 to x = 1.',
    c: ['4/3', '2/3', 'sqrt(3)', '7/6'], a: 0,
    why: "y' = x sqrt(x^2 + 2), so 1 + (y')^2 = 1 + x^2(x^2 + 2) = (x^2 + 1)^2. The arc-length integrand is x^2 + 1 on this interval. Therefore L = [x^3/3 + x] from 0 to 1 = 4/3.",
    hints: ["Differentiate first, then form sqrt(1 + (y')^2).", "After squaring y', simplify 1 + x^2(x^2 + 2).", 'The expression under the radical is (x^2 + 1)^2.']
  }
]);

add([
  {
    id: 'k91-th-001', chapter: 91, lesson: 11, t: 3,
    family: 'thomas-8.2-parts-definite', familyName: 'Definite integration by parts', section: '8.2',
    q: 'Evaluate the definite integral from 0 to 1 of x e^x dx.',
    c: ['1', 'e - 1', 'e', '0'], a: 0,
    why: 'Choose u = x and dv = e^x dx. Then du = dx and v = e^x, so the integral is [x e^x] from 0 to 1 minus the integral of e^x, or [e^x(x - 1)] from 0 to 1 = 0 - (-1) = 1.',
    hints: ['Use integration by parts with the algebraic factor as u.', 'Take u = x and dv = e^x dx.', 'After parts, combine x e^x - e^x before evaluating the bounds.']
  },
  {
    id: 'k91-th-002', chapter: 91, lesson: 11, t: 3,
    family: 'thomas-8.2-parts-logarithm', familyName: 'Integration by parts with logarithms', section: '8.2',
    q: 'Find an antiderivative of x ln(x) for x > 0.',
    c: ['(x^2/2)ln(x) - x^2/4 + C', 'x^2 ln(x) - x^2/2 + C', '(x^2/2)ln(x) - x/2 + C', 'ln(x^2/2) + C'], a: 0,
    why: 'Let u = ln(x) and dv = x dx. Then du = dx/x and v = x^2/2. Therefore the integral is (x^2/2)ln(x) - integral of x/2 dx = (x^2/2)ln(x) - x^2/4 + C.',
    hints: ['The logarithm should be u because it becomes simpler when differentiated.', 'Take u = ln(x) and dv = x dx.', 'The remaining integral after parts is integral of x/2 dx.']
  },
  {
    id: 'k4-th-001', chapter: 4, lesson: 12, t: 3,
    family: 'thomas-8.3-sine-cosine-odd', familyName: 'Odd-power sine and cosine integrals', section: '8.3',
    q: 'Evaluate the integral from 0 to pi/2 of sin^3(x) cos^2(x) dx.',
    c: ['2/15', '1/5', 'pi/16', '4/15'], a: 0,
    why: 'Save one sin(x): sin^3(x) = (1 - cos^2(x))sin(x). With u = cos(x), the integral becomes the integral from 0 to 1 of (u^2 - u^4) du = 1/3 - 1/5 = 2/15.',
    hints: ['An odd sine power means save one sine factor.', 'Replace the remaining sin^2(x) by 1 - cos^2(x), then use u = cos(x).', 'After reversing the bounds, integrate u^2 - u^4 from 0 to 1.']
  },
  {
    id: 'k4-th-002', chapter: 4, lesson: 12, t: 2,
    family: 'thomas-8.3-even-powers', familyName: 'Even trigonometric powers', section: '8.3',
    q: 'Evaluate the integral from 0 to pi of sin^2(x) dx.',
    c: ['pi/2', 'pi', '2', '1/2'], a: 0,
    why: 'Use sin^2(x) = (1 - cos(2x))/2. The cosine term integrates to zero over 0 to pi, leaving (1/2) times the interval length pi, so the value is pi/2.',
    hints: ['Both powers are even, so use a half-angle identity.', 'sin^2(x) = (1 - cos(2x))/2.', 'The integral of cos(2x) over 0 to pi is zero.']
  },
  {
    id: 'k4-th-003', chapter: 4, lesson: 13, t: 3,
    family: 'thomas-8.3-tangent-secant-substitution', familyName: 'Tangent powers with secant squared', section: '8.3',
    q: 'Evaluate the integral from 0 to pi/4 of tan^3(x) sec^2(x) dx.',
    c: ['1/4', '1/3', 'ln(2)/2', '1'], a: 0,
    why: 'Let u = tan(x), so du = sec^2(x) dx. The bounds become 0 and 1, giving integral from 0 to 1 of u^3 du = [u^4/4] from 0 to 1 = 1/4.',
    hints: ['The sec^2(x) factor is exactly the derivative of tan(x).', 'Use u = tan(x) and change the bounds.', 'The transformed integral is integral from 0 to 1 of u^3 du.']
  },
  {
    id: 'k4-th-004', chapter: 4, lesson: 13, t: 4,
    family: 'thomas-8.3-secant-cubed', familyName: 'The secant-cubed integral', section: '8.3',
    q: 'Find an antiderivative of sec^3(x).',
    c: ['(1/2)(sec(x)tan(x) + ln|sec(x) + tan(x)|) + C', 'sec(x)tan(x) + C', 'tan^3(x)/3 + C', '(1/2)(sec(x)tan(x) - ln|sec(x) + tan(x)|) + C'], a: 0,
    why: 'The standard result, obtained by integration by parts and solving for the original integral, is (1/2)(sec(x)tan(x) + ln|sec(x) + tan(x)|) + C. Differentiating it returns sec^3(x).',
    hints: ['This is the classic integral that requires integration by parts and then algebraically solving for itself.', 'Write sec^3(x) as sec(x)sec^2(x) and use parts.', 'The final result contains both sec(x)tan(x) and ln|sec(x) + tan(x)| with a factor of 1/2.']
  },
  {
    id: 'k4-th-005', chapter: 4, lesson: 13, t: 2,
    family: 'thomas-8.3-tangent-squared', familyName: 'Reducing tangent squared', section: '8.3',
    q: 'Find an antiderivative of tan^2(x).',
    c: ['tan(x) - x + C', 'tan(x) + x + C', 'sec^2(x) + C', 'tan^3(x)/3 + C'], a: 0,
    why: 'Use tan^2(x) = sec^2(x) - 1. Integrating term by term gives tan(x) - x + C.',
    hints: ['Convert tangent squared using a Pythagorean identity.', 'tan^2(x) = sec^2(x) - 1.', 'Integrate sec^2(x) and 1 separately.']
  },
  {
    id: 'k4-th-006', chapter: 4, lesson: 14, t: 3,
    family: 'thomas-8.4-circle-radical', familyName: 'Trigonometric substitution for a circle radical', section: '8.4',
    q: 'Evaluate the integral from 0 to 3 of sqrt(9 - x^2) dx.',
    c: ['9pi/4', '3pi/2', '9pi/2', '6'], a: 0,
    why: 'With x = 3sin(theta), the bounds are theta = 0 to pi/2 and the integral becomes 9 integral of cos^2(theta) dtheta = 9pi/4. Geometrically it is also the area of a quarter-circle of radius 3.',
    hints: ['The radical matches sqrt(a^2 - x^2), so use x = a sin(theta).', 'Here x = 3sin(theta) and dx = 3cos(theta)dtheta.', 'The transformed bounds are 0 and pi/2, and the integrand becomes 9cos^2(theta).']
  },
  {
    id: 'k5-th-001', chapter: 5, lesson: 15, t: 4,
    family: 'thomas-8.4-hyperbolic-radical', familyName: 'Trigonometric substitution for x squared minus a squared', section: '8.4',
    q: 'Evaluate the integral from 2 to 4 of 1/sqrt(x^2 - 4) dx.',
    c: ['ln(2 + sqrt(3))', 'pi/3', 'ln(4)', 'sqrt(3)'], a: 0,
    why: 'Use x = 2sec(theta). Then dx = 2sec(theta)tan(theta)dtheta and sqrt(x^2 - 4) = 2tan(theta), leaving integral sec(theta)dtheta. The bounds are theta = 0 to pi/3, so the result is ln(sec(theta) + tan(theta)) evaluated there, or ln(2 + sqrt(3)).',
    hints: ['The radical sqrt(x^2 - a^2) suggests x = a sec(theta).', 'Use x = 2sec(theta); the transformed integrand simplifies to sec(theta).', 'At x = 4, sec(theta) = 2, so tan(theta) = sqrt(3).']
  },
  {
    id: 'k5-th-002', chapter: 5, lesson: 16, t: 3,
    family: 'thomas-8.5-distinct-linear', familyName: 'Partial fractions with distinct linear factors', section: '8.5',
    q: 'Decompose (5x + 1)/((x + 1)(x + 2)) into partial fractions.',
    c: ['-4/(x + 1) + 9/(x + 2)', '4/(x + 1) + 1/(x + 2)', '9/(x + 1) - 4/(x + 2)', '-9/(x + 1) + 4/(x + 2)'], a: 0,
    why: 'Write A/(x + 1) + B/(x + 2). Then 5x + 1 = A(x + 2) + B(x + 1). Setting x = -1 gives A = -4; setting x = -2 gives B = 9.',
    hints: ['Use one constant numerator for each distinct linear factor.', 'Clear denominators, then substitute roots of the original denominator.', 'At x = -1, -4 = A; at x = -2, -9 = -B.']
  }
]);

add([
  {
    id: 'k5-th-003', chapter: 5, lesson: 16, t: 3,
    family: 'thomas-8.5-linear-factors-integral', familyName: 'Integrating a linear-factor decomposition', section: '8.5',
    q: 'Find an antiderivative of 1/(x^2 - 1).',
    c: ['(1/2)ln|(x - 1)/(x + 1)| + C', 'ln|x^2 - 1| + C', '(1/2)ln|x^2 - 1| + C', 'arctan(x) + C'], a: 0,
    why: 'Since 1/(x^2 - 1) = 1/((x - 1)(x + 1)) = (1/2)/(x - 1) - (1/2)/(x + 1), integration gives (1/2)ln|x - 1| - (1/2)ln|x + 1| + C, which combines to the stated logarithm.',
    hints: ['Factor the denominator before decomposing.', 'Solve 1/((x - 1)(x + 1)) = A/(x - 1) + B/(x + 1).', 'The coefficients are A = 1/2 and B = -1/2; integrate each logarithmic term.']
  },
  {
    id: 'k5-th-004', chapter: 5, lesson: 16, t: 2,
    family: 'thomas-8.5-long-division', familyName: 'Polynomial division before integration', section: '8.5',
    q: 'Evaluate the integral of (2x^2 + 3x + 1)/(x + 1) dx.',
    c: ['x^2 + x + C', '2x + 1 + C', 'x^2 + 3x + C', '2ln|x + 1| + C'], a: 0,
    why: 'The numerator factors as (x + 1)(2x + 1), so the integrand simplifies to 2x + 1 wherever defined. Its antiderivative is x^2 + x + C.',
    hints: ['The numerator degree is not below the denominator degree, so divide or factor first.', '2x^2 + 3x + 1 = (x + 1)(2x + 1).', 'Integrate the simplified polynomial 2x + 1.']
  },
  {
    id: 'k5-th-005', chapter: 5, lesson: 17, t: 3,
    family: 'thomas-8.5-repeated-linear', familyName: 'Repeated linear factors', section: '8.5',
    q: 'Decompose (3x + 5)/(x + 1)^2 into partial fractions.',
    c: ['3/(x + 1) + 2/(x + 1)^2', '3/(x + 1) + 5/(x + 1)^2', '2/(x + 1) + 3/(x + 1)^2', '(3x + 2)/(x + 1)^2'], a: 0,
    why: 'Use A/(x + 1) + B/(x + 1)^2. Clearing denominators gives 3x + 5 = A(x + 1) + B. Matching coefficients gives A = 3 and A + B = 5, so B = 2.',
    hints: ['A repeated factor requires one term for each power.', 'Write A/(x + 1) + B/(x + 1)^2 and clear denominators.', 'Match the x-coefficient first to get A = 3, then solve A + B = 5.']
  },
  {
    id: 'k5-th-006', chapter: 5, lesson: 17, t: 4,
    family: 'thomas-8.5-irreducible-quadratic', familyName: 'Irreducible quadratic terms', section: '8.5',
    q: 'Find an antiderivative of (2x + 3)/(x^2 + 4).',
    c: ['ln(x^2 + 4) + (3/2)arctan(x/2) + C', '2ln(x^2 + 4) + 3arctan(x/2) + C', 'ln(x^2 + 4) + 3arctan(x) + C', '(2x + 3)ln(x^2 + 4) + C'], a: 0,
    why: 'Split the numerator. The integral of 2x/(x^2 + 4) is ln(x^2 + 4). Also, integral dx/(x^2 + 2^2) = (1/2)arctan(x/2), so the remaining 3 contributes (3/2)arctan(x/2).',
    hints: ['Split the numerator into a derivative-of-denominator part and a constant part.', 'The 2x term gives a logarithm.', 'Use integral dx/(x^2 + a^2) = (1/a)arctan(x/a) with a = 2 for the constant term.']
  },
  {
    id: 'k7-th-001', chapter: 7, lesson: 23, t: 3,
    family: 'thomas-10.4-limit-comparison', familyName: 'Limit comparison with rational terms', section: '10.4',
    q: 'Determine whether the series sum from n = 1 to infinity of (3n + 1)/(n^3 + 2) converges. Name a suitable comparison.',
    c: ['Converges by limit comparison with 1/n^2', 'Diverges by comparison with 1/n', 'Converges by the geometric-series test', 'The Divergence Test proves convergence'], a: 0,
    why: 'Compare with b_n = 1/n^2. The limit of ((3n + 1)/(n^3 + 2))/(1/n^2) is the limit of (3n^3 + n^2)/(n^3 + 2) = 3. Because the limit is finite and positive and sum 1/n^2 converges, the given series converges.',
    hints: ['For a rational expression, compare leading powers.', 'The term behaves like 3n/n^3 = 3/n^2.', 'Divide by 1/n^2 and show the limit is 3.']
  },
  {
    id: 'k8-th-001', chapter: 8, lesson: 24, t: 3,
    family: 'thomas-10.6-conditional', familyName: 'Conditional convergence', section: '10.6',
    q: 'Classify the series sum from n = 1 to infinity of (-1)^(n+1)/n.',
    c: ['Conditionally convergent', 'Absolutely convergent', 'Divergent because 1/n diverges', 'Geometric with sum 1/2'], a: 0,
    why: 'The alternating harmonic series converges by the Alternating Series Test because 1/n decreases to 0. Its absolute-value series is the harmonic series, which diverges, so the convergence is conditional.',
    hints: ['Test the alternating series first, then test absolute values separately.', 'The magnitudes 1/n decrease to 0.', 'Removing the signs produces the divergent harmonic series.']
  },
  {
    id: 'k8-th-002', chapter: 8, lesson: 24, t: 3,
    family: 'thomas-10.6-absolute', familyName: 'Absolute convergence', section: '10.6',
    q: 'Classify the series sum from n = 1 to infinity of (-1)^n/n^2.',
    c: ['Absolutely convergent', 'Conditionally convergent', 'Divergent by the Divergence Test', 'Divergent because it alternates'], a: 0,
    why: 'Taking absolute values gives sum 1/n^2, a p-series with p = 2 > 1, so the absolute-value series converges. Therefore the original series converges absolutely.',
    hints: ['Absolute convergence is stronger, so test the absolute-value series first.', 'Removing the signs leaves a p-series.', 'Here p = 2, which is greater than 1.']
  },
  {
    id: 'k93-th-001', chapter: 93, lesson: 27, t: 3,
    family: 'thomas-10.8-taylor-polynomial', familyName: 'Taylor polynomials at a nonzero center', section: '10.8',
    q: 'Find the degree-2 Taylor polynomial for f(x) = ln(x) centered at a = 1.',
    c: ['(x - 1) - (x - 1)^2/2', '(x - 1) + (x - 1)^2/2', '1 + (x - 1) - (x - 1)^2', 'x - x^2/2'], a: 0,
    why: 'f(1) = 0, f prime of 1 = 1, and f double-prime of 1 = -1. Thus P_2(x) = 0 + 1(x - 1) + (-1)(x - 1)^2/2! = (x - 1) - (x - 1)^2/2.',
    hints: ['Use f(a) + f prime(a)(x - a) + f double-prime(a)(x - a)^2/2.', 'For ln(x), the first two derivatives are 1/x and -1/x^2.', 'Evaluate at a = 1 and keep every power in terms of x - 1.']
  },
  {
    id: 'k9-th-001', chapter: 9, lesson: 30, t: 3,
    family: 'thomas-10.7-geometric-substitution', familyName: 'Building a power series by substitution', section: '10.7',
    q: 'Write x^2/(1 - x^3) as a power series and state where it converges.',
    c: ['sum from n = 0 to infinity of x^(3n + 2), for |x| < 1', 'sum from n = 0 to infinity of x^(2n + 3), for |x| < 1', 'sum from n = 0 to infinity of x^(3n), for |x| < 1', 'sum from n = 0 to infinity of x^(3n + 2), for |x| < 3'], a: 0,
    why: 'Start with 1/(1 - u) = sum u^n for |u| < 1. Substitute u = x^3 and multiply by x^2: x^2 sum x^(3n) = sum x^(3n + 2). The condition |x^3| < 1 is |x| < 1.',
    hints: ['Start from the geometric master series.', 'Use u = x^3 in 1/(1 - u).', 'Multiplying by x^2 adds 2 to every exponent; also translate |x^3| < 1.']
  },
  {
    id: 'k9-th-002', chapter: 9, lesson: 30, t: 3,
    family: 'thomas-10.7-differentiate-series', familyName: 'Differentiating a power series', section: '10.7',
    q: 'Use the geometric series to find a power series for 1/(1 - x)^2.',
    c: ['sum from n = 0 to infinity of (n + 1)x^n, for |x| < 1', 'sum from n = 1 to infinity of x^n/n, for |x| < 1', 'sum from n = 0 to infinity of x^(2n), for |x| < 1', 'sum from n = 0 to infinity of nx^n, for all x'], a: 0,
    why: 'Differentiate 1/(1 - x) = sum from n = 0 of x^n. The left side becomes 1/(1 - x)^2 and the right becomes sum from n = 1 of n x^(n-1). Reindexing with k = n - 1 gives sum from k = 0 of (k + 1)x^k.',
    hints: ['A squared geometric denominator suggests differentiating the master series.', 'Differentiate both sides of 1/(1 - x) = sum x^n.', 'Reindex sum n x^(n-1) so the exponent starts at zero.']
  }
]);

add([
  {
    id: 'k9-th-003', chapter: 9, lesson: 31, t: 3,
    family: 'thomas-10.8-maclaurin-substitution', familyName: 'Maclaurin series by substitution', section: '10.8',
    q: 'Write the first four nonzero terms of the Maclaurin series for e^(2x).',
    c: ['1 + 2x + 2x^2 + (4/3)x^3', '1 + 2x + 4x^2 + 8x^3', '1 + x + x^2/2 + x^3/6', '2 + 2x + x^2 + x^3/3'], a: 0,
    why: 'Substitute 2x into e^u = 1 + u + u^2/2! + u^3/3! + ... . This gives 1 + 2x + 4x^2/2 + 8x^3/6 = 1 + 2x + 2x^2 + (4/3)x^3.',
    hints: ['Start with the standard Maclaurin series for e^u.', 'Replace every u by 2x, including inside each power.', 'Simplify (2x)^2/2! and (2x)^3/3!.']
  },
  {
    id: 'k10-th-001', chapter: 10, lesson: 33, t: 3,
    family: 'thomas-11.3-rectangular-to-polar', familyName: 'Rectangular to polar coordinates', section: '11.3',
    q: 'Convert the point (-2, 2) to polar coordinates with r > 0 and 0 <= theta < 2pi.',
    c: ['(2sqrt(2), 3pi/4)', '(2sqrt(2), -pi/4)', '(4, 3pi/4)', '(2sqrt(2), 7pi/4)'], a: 0,
    why: 'r = sqrt((-2)^2 + 2^2) = 2sqrt(2). The point lies in Quadrant II, where the reference angle is pi/4, so theta = 3pi/4.',
    hints: ['Find r from sqrt(x^2 + y^2), then locate the quadrant.', 'Both coordinate magnitudes are 2, so the reference angle is pi/4.', 'Negative x and positive y place the angle in Quadrant II.']
  }
]);

window.CALC_THOMAS_TOPUP = { count: added.length, questions: added };
})();
