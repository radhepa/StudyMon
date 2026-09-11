"""Chapter 1 variants - vectors (Field Manual lessons 1-4, sections 13.1-13.4).

Every template follows the manual's own toolkit for its lesson, and the hints
walk the route the manual walks. Where the manual names a trap, a distractor is
built from exactly that mistake:

  L1  points use parentheses, vectors use angle brackets; scale the UNIT vector
  L2  the right side of a sphere equation is r-squared, and (y+3) means -3
  L3  |v| for the scalar projection, |v| squared for the vector projection
  L4  the minus sign on the j component; cross product needs three dimensions
"""
import sympy as sp
from genlib import (X, MINUS, num, vec, sup, sub, rad, neg, Bank, shuffled_options,
                    rng_for, accepted)

LETTERS = 'bcdefghij'          # nine variants, the original keeps its bare id


def nz(rng, lo=-6, hi=6, avoid=(0,)):
    """A small nonzero integer, so the arithmetic stays hand-sized."""
    while True:
        v = rng.randint(lo, hi)
        if v not in avoid:
            return v


def pyth2(rng):
    """A 2-D vector whose length is a whole number, from a Pythagorean pair."""
    pairs = [(3, 4, 5), (6, 8, 10), (5, 12, 13), (8, 15, 17), (9, 12, 15), (7, 24, 25)]
    a, b, c = rng.choice(pairs)
    if rng.random() < 0.5:
        a, b = b, a
    return [a * rng.choice([1, -1]), b * rng.choice([1, -1])], c


def pyth3(rng):
    """A 3-D vector with whole-number length."""
    trips = [(1, 2, 2, 3), (2, 3, 6, 7), (1, 4, 8, 9), (2, 6, 9, 11), (4, 4, 7, 9), (2, 2, 1, 3)]
    a, b, c, L = rng.choice(trips)
    v = [a, b, c]
    rng.shuffle(v)
    return [t * rng.choice([1, -1]) for t in v], L


def pick3(correct, cands, fillers=()):
    """Three distractors, distinct from the answer and from each other.

    An error-mode distractor can collide with the answer by accident - negating
    a zero component reproduces it, for one - so templates pass fillers: further
    plausible slips used only when the named error modes run out.
    """
    out = []
    for c in list(cands) + list(fillers):
        if str(c) != str(correct) and all(str(c) != str(o) for o in out):
            out.append(c)
        if len(out) == 3:
            break
    assert len(out) == 3, 'not enough distinct distractors for %r' % (correct,)
    return out


def vec_slips(v):
    """Plausible arithmetic slips on a vector answer, for use as fillers."""
    out = []
    for j in range(len(v)):
        w = list(v)
        w[j] = -w[j]
        out.append(w)                       # sign slip in one component
    for j in range(len(v)):
        w = list(v)
        w[j] = w[j] + 1
        out.append(w)                       # off-by-one in one component
    if len(v) >= 2:
        w = list(v)
        w[0], w[1] = w[1], w[0]
        out.append(w)                       # two components transposed
    return out


# --------------------------------------------------------------------------
# L1 - vectors in the plane
# --------------------------------------------------------------------------

def v001(bank, i):
    """Scalar combination au - bv. Trap: subtracting a negative component."""
    qid = 'k1-p-001' + LETTERS[i]
    r = rng_for(qid)
    a, b = r.randint(2, 5), r.randint(2, 5)
    u = [nz(r), nz(r)]
    v = [nz(r), nz(r)]
    ans = [a * u[0] - b * v[0], a * u[1] - b * v[1]]
    w1 = [a * u[0] + b * v[0], a * u[1] + b * v[1]]
    w2 = [a * u[0] - b * abs(v[0]), a * u[1] - b * abs(v[1])]
    w3 = [-ans[0], -ans[1]]
    w4 = [u[0] - v[0], u[1] - v[1]]
    opts, ai = shuffled_options(r, vec(ans), pick3(vec(ans), [vec(w) for w in (w1, w2, w3, w4)], [vec(w) for w in vec_slips(ans)]))
    bank.add(qid, 1, 1, 2, 'Applied', 'mcq',
             'Let u = %s and v = %s. What is %du %s %dv?' % (vec(u), vec(v), a, MINUS, b),
             opts, ai,
             '%du = %s and %dv = %s, so %du %s %dv = %s. Scalar multiplication hits every '
             'component, then you subtract componentwise.'
             % (a, vec([a * u[0], a * u[1]]), b, vec([b * v[0], b * v[1]]), a, MINUS, b, vec(ans)),
             ['Scale each vector first, then subtract componentwise. Doing both at once is how signs get lost.',
              '%du = %s and %dv = %s.' % (a, vec([a * u[0], a * u[1]]), b, vec([b * v[0], b * v[1]])),
              'First component: %s %s (%s) = %s. Second: %s %s (%s) = %s.'
              % (num(a * u[0]), MINUS, num(b * v[0]), num(ans[0]),
                 num(a * u[1]), MINUS, num(b * v[1]), num(ans[1]))])


def v002(bank, i):
    """Unit vector from P to Q. Trap: forgetting to divide by the length."""
    qid = 'k1-p-002' + LETTERS[i]
    r = rng_for(qid)
    d, L = pyth2(r)
    P = [nz(r, -8, 8, ()), nz(r, -8, 8, ())]
    Q = [P[0] + d[0], P[1] + d[1]]
    ans = [sp.Rational(d[0], L), sp.Rational(d[1], L)]
    w1 = d
    w2 = [-ans[0], -ans[1]]
    w3 = [sp.Rational(d[0], L * L), sp.Rational(d[1], L * L)]
    w4 = [ans[1], ans[0]]
    opts, ai = shuffled_options(r, vec(ans), pick3(vec(ans), [vec(w) for w in (w1, w2, w3, w4)], [vec(w) for w in vec_slips(ans)]))
    bank.add(qid, 1, 1, 2, 'Applied', 'mcq',
             'Find the unit vector pointing from P(%s, %s) to Q(%s, %s).'
             % (num(P[0]), num(P[1]), num(Q[0]), num(Q[1])),
             opts, ai,
             'PQ = Q %s P = %s, with |PQ| = %s(%d + %d) = %d. Dividing gives %s, and the '
             'components square back to 1.'
             % (MINUS, vec(d), '√', d[0] ** 2, d[1] ** 2, L, vec(ans)),
             ['The vector from P to Q is head minus tail. A unit vector is that divided by its own length.',
              'Q %s P = %s. Now find its magnitude.' % (MINUS, vec(d)),
              'The magnitude is %s(%d + %d) = %d, so divide each component by %d.'
              % ('√', d[0] ** 2, d[1] ** 2, L, L)])


def v003(bank, i):
    """Vector of given length in the opposite direction. Trap: scaling v, not the unit vector."""
    qid = 'k1-p-003' + LETTERS[i]
    r = rng_for(qid)
    w = [nz(r, -4, 4), nz(r, -4, 4)]
    L = r.choice([4, 6, 8, 9, 10, 12])
    mag = sp.sqrt(w[0] ** 2 + w[1] ** 2)
    ans = [sp.simplify(-L * w[0] / mag), sp.simplify(-L * w[1] / mag)]
    assert sp.simplify(sum(t ** 2 for t in ans) - L ** 2) == 0, 'scaled vector has the wrong length'
    w1 = [sp.simplify(L * w[0] / mag), sp.simplify(L * w[1] / mag)]
    w2 = [-L * w[0], -L * w[1]]
    w3 = [sp.simplify(-L * w[0] / mag ** 2), sp.simplify(-L * w[1] / mag ** 2)]
    opts, ai = shuffled_options(r, vec(ans), pick3(vec(ans), [vec(x) for x in (w1, w2, w3)], [vec(x) for x in vec_slips(ans)]))
    bank.add(qid, 1, 1, 3, 'Applied', 'mcq',
             'Find the vector of length %d pointing in the direction OPPOSITE to w = %s.'
             % (L, vec(w)),
             opts, ai,
             '|w| = %s, so the unit vector along w is w/|w|. Length %d in the opposite direction '
             'means the scalar %s%d/|w|, giving %s. Its magnitude checks back to %d.'
             % (num(mag), L, MINUS, L, vec(ans), L),
             ['Normalise first, then scale. Opposite direction is just a negative scalar.',
              '|w| = %s, so the unit vector is %s.'
              % (num(mag), vec([sp.simplify(w[0] / mag), sp.simplify(w[1] / mag)])),
              'Multiply that UNIT vector by %s%d. Scaling w itself would give the wrong length.'
              % (MINUS, L)])


def v004(bank, i):
    """Components from magnitude and angle. Trap: swapping sin and cos, or the quadrant."""
    qid = 'k1-p-004' + LETTERS[i]
    r = rng_for(qid)
    deg = r.choice([30, 120, 135, 150, 210, 225, 240, 300, 315, 330])
    L = r.choice([4, 6, 8, 10, 12])
    th = sp.rad(deg)
    ax, ay = sp.simplify(L * sp.cos(th)), sp.simplify(L * sp.sin(th))
    ans = [ax, ay]
    w1 = [ay, ax]
    w2 = [-ax, -ay]
    w3 = [ax, -ay]
    w4 = [-ax, ay]
    opts, ai = shuffled_options(r, vec(ans), pick3(vec(ans), [vec(x) for x in (w1, w2, w3, w4)], [vec(x) for x in vec_slips(ans)]))
    quad = 1 + (deg % 360) // 90
    bank.add(qid, 1, 1, 3, 'Applied', 'mcq',
             'A vector has magnitude %d and makes an angle of %d%s with the positive x-axis. '
             'Write it in component form.' % (L, deg, '°'),
             opts, ai,
             'v = %s|v|cos %s, |v|sin %s%s = %s. The angle is in quadrant %d, so that sign '
             'pattern is the one to expect.'
             % ('⟨', 'θ', 'θ', '⟩', vec(ans), quad),
             ['Components come from v = %s|v|cos %s, |v|sin %s%s.'
              % ('⟨', 'θ', 'θ', '⟩'),
              'cos %d%s = %s and sin %d%s = %s.'
              % (deg, '°', num(sp.cos(th)), deg, '°', num(sp.sin(th))),
              'Multiply each by %d, then check the quadrant: %d%s lands in quadrant %d.'
              % (L, deg, '°', quad)])


def v005(bank, i):
    """Resultant speed from two velocities. Trap: adding magnitudes instead of vectors."""
    qid = 'k1-p-005' + LETTERS[i]
    r = rng_for(qid)
    speed = r.choice([180, 200, 220, 250, 300, 320])
    wind = r.choice([25, 30, 40, 45, 50, 60])
    deg = r.choice([30, 45, 60])
    wx = wind * sp.cos(sp.rad(deg))
    wy = wind * sp.sin(sp.rad(deg))
    ans = sp.sqrt(wx ** 2 + (speed + wy) ** 2)
    def mph(e):
        return 'About %s mph' % sp.N(e, 5)
    cands = [mph(speed + wind), mph(speed + wy), mph(sp.sqrt(speed ** 2 + wind ** 2))]
    opts, ai = shuffled_options(r, mph(ans), pick3(mph(ans), cands))
    bank.add(qid, 1, 1, 4, 'Exam', 'mcq',
             'A plane flies at airspeed %d mph due north. A wind blows at %d mph toward the '
             'northeast, %d%s from east. What is the resulting ground speed?'
             % (speed, wind, deg, '°'),
             opts, ai,
             'Plane %s0, %d%s, wind %s%dcos%d%s, %dsin%d%s%s %s %s%s, %s%s. Adding componentwise '
             'gives %s%s, %s%s and the speed is the magnitude, about %s mph. Adding magnitudes '
             'instead would give %d.'
             % ('⟨', speed, '⟩', '⟨', wind, deg, '°', wind, deg, '°',
                '⟩', '≈', '⟨', sp.N(wx, 4), sp.N(wy, 4), '⟩',
                '⟨', sp.N(wx, 4), sp.N(speed + wy, 5), '⟩', sp.N(ans, 5), speed + wind),
             ['Velocities add as vectors, never as magnitudes. Put both into components first.',
              'The plane contributes %s0, %d%s and the wind %s%s, %s%s.'
              % ('⟨', speed, '⟩', '⟨', sp.N(wx, 4), sp.N(wy, 4), '⟩'),
              'Add componentwise, then take the magnitude of %s%s, %s%s.'
              % ('⟨', sp.N(wx, 4), sp.N(speed + wy, 5), '⟩')])


def v006(bank, i):
    """Solve a linear combination. Trap: stopping at one equation."""
    qid = 'k1-p-006' + LETTERS[i]
    r = rng_for(qid)
    while True:
        p = [nz(r, -4, 4), nz(r, -4, 4)]
        q = [nz(r, -4, 4), nz(r, -4, 4)]
        det = p[0] * q[1] - p[1] * q[0]
        if det != 0:
            break
    a0, b0 = r.randint(1, 5), r.randint(1, 5)
    tgt = [a0 * p[0] + b0 * q[0], a0 * p[1] + b0 * q[1]]
    assert [a0 * p[j] + b0 * q[j] for j in range(2)] == tgt, 'scalars do not reproduce the target'
    fmt = lambda a, b: 'a = %s, b = %s' % (num(a), num(b))
    cands = [fmt(b0, a0), fmt(-a0, -b0), fmt(a0 + 1, b0 - 1), fmt(tgt[0], tgt[1])]
    opts, ai = shuffled_options(r, fmt(a0, b0), pick3(fmt(a0, b0), cands))
    bank.add(qid, 1, 1, 4, 'Exam', 'mcq',
             'Find scalars a and b with a%s + b%s = %s.' % (vec(p), vec(q), vec(tgt)),
             opts, ai,
             'Matching components gives %sa + %sb = %s and %sa + %sb = %s. Solving the pair gives '
             'a = %s and b = %s, and substituting back reproduces %s.'
             % (num(p[0]), num(q[0]), num(tgt[0]), num(p[1]), num(q[1]), num(tgt[1]),
                num(a0), num(b0), vec(tgt)),
             ['Matching components turns one vector equation into two scalar equations.',
              'The system is %sa + %sb = %s and %sa + %sb = %s.'
              % (num(p[0]), num(q[0]), num(tgt[0]), num(p[1]), num(q[1]), num(tgt[1])),
              'Solve one equation for a variable and substitute. Check your answer in BOTH equations, '
              'not just the one you solved.'])


# --------------------------------------------------------------------------
# L2 - vectors in three dimensions
# --------------------------------------------------------------------------

def v007(bank, i):
    """Distance between two points in space."""
    qid = 'k1-p-007' + LETTERS[i]
    r = rng_for(qid)
    d, L = pyth3(r)
    P = [nz(r, -6, 6, ()), nz(r, -6, 6, ()), nz(r, -6, 6, ())]
    Q = [P[j] + d[j] for j in range(3)]
    bank.add(qid, 1, 2, 2, 'Applied', 'fill',
             'Find the distance between P(%s, %s, %s) and Q(%s, %s, %s). Give the exact value.'
             % tuple(num(t) for t in P + Q),
             accepted(L), None,
             'The displacement is %s, so the distance is %s(%d + %d + %d) = %s%d = %d. The '
             'distance formula is just the magnitude of the displacement vector.'
             % (vec(d), '√', d[0] ** 2, d[1] ** 2, d[2] ** 2, '√', L * L, L),
             ['Distance between two points is the magnitude of the vector joining them.',
              'Q %s P = %s.' % (MINUS, vec(d)),
              'Square each component and add: %d + %d + %d = %d. Now take the square root.'
              % (d[0] ** 2, d[1] ** 2, d[2] ** 2, L * L)])


def v008(bank, i):
    """Complete the square for a sphere. Trap: r vs r-squared, and the sign flip."""
    qid = 'k1-p-008' + LETTERS[i]
    r = rng_for(qid)
    c = [nz(r, -4, 4), nz(r, -4, 4), nz(r, -4, 4)]
    rad_ = r.choice([2, 3, 4, 5, 6])
    const = rad_ ** 2 - (c[0] ** 2 + c[1] ** 2 + c[2] ** 2)
    lin = [-2 * c[0], -2 * c[1], -2 * c[2]]
    def terms():
        out = []
        for name, k in zip('xyz', lin):
            if k == 0:
                continue
            out.append((' %s ' % MINUS if k < 0 else ' + ') + (('%d' % abs(k)) if abs(k) != 1 else '') + name)
        return ''.join(out)
    lhs = 'x%s + y%s + z%s%s' % (sup(2), sup(2), sup(2), terms())
    rhs = num(const)
    fmt = lambda cc, RR: 'Centre (%s, %s, %s), radius %s' % (num(cc[0]), num(cc[1]), num(cc[2]), num(RR))
    cands = [fmt([-t for t in c], rad_), fmt(c, rad_ ** 2), fmt([2 * t for t in c], rad_)]
    opts, ai = shuffled_options(r, fmt(c, rad_), pick3(fmt(c, rad_), cands))
    bank.add(qid, 1, 2, 3, 'Applied', 'mcq',
             'Find the centre and radius of %s = %s.' % (lhs, rhs),
             opts, ai,
             'Completing the square in each variable gives (x %s %s)%s + (y %s %s)%s + (z %s %s)%s = %d, '
             'so the centre is (%s, %s, %s) and the radius is %s%d = %d. The sign flips: a plus '
             'inside the bracket means a negative coordinate.'
             % (MINUS, num(c[0]), sup(2), MINUS, num(c[1]), sup(2), MINUS, num(c[2]), sup(2),
                rad_ ** 2, num(c[0]), num(c[1]), num(c[2]), '√', rad_ ** 2, rad_),
             ['Complete the square separately in x, y and z, and add what you used to BOTH sides.',
              'Half of each linear coefficient, squared, is what you add: %d, %d and %d.'
              % (c[0] ** 2, c[1] ** 2, c[2] ** 2),
              'The right side becomes %d, and the radius is the SQUARE ROOT of that, not the number itself.'
              % rad_ ** 2])


def v009(bank, i):
    """Vector of given length opposite a 3-D vector."""
    qid = 'k1-p-009' + LETTERS[i]
    r = rng_for(qid)
    v, L = pyth3(r)
    want = L * r.choice([2, 3, 4])
    k = sp.Rational(want, L)
    ans = [-k * t for t in v]
    assert sp.simplify(sum(t ** 2 for t in ans) - want ** 2) == 0, 'scaled vector has the wrong length'
    w1 = [k * t for t in v]
    w2 = [-want * t for t in v]
    w3 = [sp.Rational(-t, L) for t in v]
    opts, ai = shuffled_options(r, vec(ans), pick3(vec(ans), [vec(x) for x in (w1, w2, w3)], [vec(x) for x in vec_slips(ans)]))
    bank.add(qid, 1, 2, 3, 'Applied', 'mcq',
             'For v = %s, find the vector of length %d in the direction opposite to v.'
             % (vec(v), want),
             opts, ai,
             '|v| = %d, so the unit vector is v/%d. Times %s%d gives %s, whose magnitude checks '
             'back to %d.' % (L, L, MINUS, want, vec(ans), want),
             ['Find the unit vector first, then scale it. Length %d means the scalar has size %d.'
              % (want, want),
              '|v| = %s(%d + %d + %d) = %d, so the unit vector is v/%d.'
              % ('√', v[0] ** 2, v[1] ** 2, v[2] ** 2, L, L),
              'Multiply the unit vector by %s%d. Multiplying v itself would give length %d.'
              % (MINUS, want, want * L)])


def v010(bank, i):
    """Sphere through a point. Trap: writing r instead of r-squared."""
    qid = 'k1-p-010' + LETTERS[i]
    r = rng_for(qid)
    c = [nz(r, -5, 5, ()), nz(r, -5, 5, ()), nz(r, -5, 5, ())]
    d, L = pyth3(r)
    Pt = [c[j] + d[j] for j in range(3)]
    def eq(cc, rhs):
        parts = []
        for name, t in zip('xyz', cc):
            if t == 0:
                parts.append('%s%s' % (name, sup(2)))
            else:
                parts.append('(%s %s %d)%s' % (name, MINUS if t > 0 else '+', abs(t), sup(2)))
        return ' + '.join(parts) + ' = ' + str(rhs)
    assert sum((Pt[j] - c[j]) ** 2 for j in range(3)) == L * L, 'point is not on the sphere'
    correct = eq(c, L * L)
    cands = [eq(c, L), eq([-t for t in c], L * L), eq(c, 2 * L)]
    opts, ai = shuffled_options(r, correct, pick3(correct, cands))
    bank.add(qid, 1, 2, 4, 'Exam', 'mcq',
             'Write the equation of the sphere centred at (%s, %s, %s) that passes through '
             '(%s, %s, %s).' % tuple(num(t) for t in c + Pt),
             opts, ai,
             'The radius is the distance from the centre to the given point: %s(%d + %d + %d) = %d. '
             'The equation carries r%s, so the right side is %d. Writing %d there is the standard error.'
             % ('√', d[0] ** 2, d[1] ** 2, d[2] ** 2, L, sup(2), L * L, L),
             ['The radius is the distance from the centre to any point the sphere passes through.',
              'That distance is %s(%d + %d + %d) = %d.'
              % ('√', d[0] ** 2, d[1] ** 2, d[2] ** 2, L),
              'Standard form is (x%sh)%s + (y%sk)%s + (z%sl)%s = r%s, so SQUARE the radius.'
              % (MINUS, sup(2), MINUS, sup(2), MINUS, sup(2), sup(2))])


# --------------------------------------------------------------------------
# L3 - dot products
# --------------------------------------------------------------------------

def v011(bank, i):
    """Straight dot product."""
    qid = 'k1-p-011' + LETTERS[i]
    r = rng_for(qid)
    u = [nz(r, -6, 6, ()), nz(r, -6, 6, ()), nz(r, -6, 6, ())]
    v = [nz(r, -6, 6, ()), nz(r, -6, 6, ()), nz(r, -6, 6, ())]
    ans = sum(a * b for a, b in zip(u, v))
    sign = 'acute' if ans > 0 else ('obtuse' if ans < 0 else 'exactly 90 degrees')
    bank.add(qid, 1, 3, 2, 'Applied', 'fill',
             'Compute %s %s %s.' % (vec(u), '·', vec(v)),
             accepted(ans), None,
             '%s. The sign alone classifies the angle, and here it is %s, with no cosine '
             'computation needed.'
             % (' + '.join('(%s)(%s)' % (num(a), num(b)) for a, b in zip(u, v)) + ' = ' + num(ans),
                sign),
             ['The dot product multiplies matching components and adds the results.',
              'The three products are %s.'
              % ', '.join(num(a * b) for a, b in zip(u, v)),
              'Add them: %s.' % ' + '.join(num(a * b) for a, b in zip(u, v))])


def v012(bank, i):
    """Angle between two vectors."""
    qid = 'k1-p-012' + LETTERS[i]
    r = rng_for(qid)
    # a genuine angle needs two vectors that are neither equal nor parallel,
    # or the question degenerates into 0 or 180 degrees
    while True:
        u = [nz(r, -5, 5), nz(r, -5, 5)]
        v = [nz(r, -5, 5), nz(r, -5, 5)]
        if u[0] * v[1] - u[1] * v[0] == 0:
            continue
        dot = u[0] * v[0] + u[1] * v[1]
        if dot == 0:
            continue
        break
    mu, mv = sp.sqrt(u[0] ** 2 + u[1] ** 2), sp.sqrt(v[0] ** 2 + v[1] ** 2)
    th = sp.deg(sp.acos(sp.Rational(dot, 1) / (mu * mv)))
    a = float(sp.N(th, 8))
    fmt = lambda t: 'About %.1f%s' % (float(t), '°')
    cands = [fmt(180 - a), fmt(90 - a) if a < 90 else fmt(a - 90), fmt(45)]
    opts, ai = shuffled_options(r, fmt(a), pick3(fmt(a), cands))
    bank.add(qid, 1, 3, 3, 'Applied', 'mcq',
             'Find the angle between u = %s and v = %s.' % (vec(u), vec(v)),
             opts, ai,
             'u %s v = %s, |u| = %s and |v| = %s, so cos %s = %s/(%s%s%s) and %s %s %s%s. The dot '
             'product is %s, so the angle must be %s.'
             % ('·', num(dot), num(mu), num(mv), 'θ', num(dot), num(mu), '·',
                num(mv), 'θ', '≈', sp.N(a, 4), '°',
                'positive' if dot > 0 else 'negative', 'acute' if dot > 0 else 'obtuse'),
             ['Rearranging the geometric form gives cos %s = (u %s v)/(|u||v|).' % ('θ', '·'),
              'u %s v = %s, |u| = %s and |v| = %s.' % ('·', num(dot), num(mu), num(mv)),
              'cos %s %s %s, and the sign of the dot product tells you whether to expect an acute '
              'or obtuse answer.' % ('θ', '≈', sp.N(sp.Rational(dot, 1) / (mu * mv), 4))])


def v013(bank, i):
    """Scalar and vector projection. The manual's headline trap: |v| vs |v| squared."""
    qid = 'k1-p-013' + LETTERS[i]
    r = rng_for(qid)
    v, L = pyth3(r)
    u = [nz(r, -5, 5, ()), nz(r, -5, 5, ()), nz(r, -5, 5, ())]
    dot = sum(a * b for a, b in zip(u, v))
    if dot == 0:
        u[0] += 1
        dot = sum(a * b for a, b in zip(u, v))
    comp = sp.Rational(dot, L)
    proj = [sp.Rational(dot, L * L) * t for t in v]
    assert sp.simplify(sum((a - b) * c for a, b, c in zip(u, proj, v))) == 0, 'u minus its projection is not orthogonal to v'
    correct = '%s and %s' % (num(comp), vec(proj))
    swapped = [sp.Rational(dot, L) * t for t in v]
    cands = ['%s and %s' % (num(sp.Rational(dot, L * L)), vec(swapped)),
             '%s and %s' % (num(comp), vec(swapped)),
             '%s and %s' % (num(-comp), vec([-t for t in proj]))]
    opts, ai = shuffled_options(r, correct, pick3(correct, cands))
    bank.add(qid, 1, 3, 3, 'Applied', 'mcq',
             'For u = %s and v = %s, find the scalar projection comp%su and the vector projection '
             'proj%su.' % (vec(u), vec(v), 'ᵥ', 'ᵥ'),
             opts, ai,
             'u %s v = %s and |v| = %d. The scalar projection divides by |v|: %s. The vector '
             'projection divides by |v|%s and multiplies by v: %s.'
             % ('·', num(dot), L, num(comp), sup(2), vec(proj)),
             ['One of these divides by |v| and the other by |v|%s. Getting them the right way round '
              'is the whole question.' % sup(2),
              'u %s v = %s and |v| = %d.' % ('·', num(dot), L),
              'Scalar: (u %s v)/|v| = %s. Vector: ((u %s v)/|v|%s)v with |v|%s = %d.'
              % ('·', num(comp), '·', sup(2), sup(2), L * L)])


def v014(bank, i):
    """Decompose u into parallel and orthogonal pieces."""
    qid = 'k1-p-014' + LETTERS[i]
    r = rng_for(qid)
    v = [nz(r, -4, 4), nz(r, -4, 4)]
    u = [nz(r, -6, 6, ()), nz(r, -6, 6, ())]
    dot = u[0] * v[0] + u[1] * v[1]
    vv = v[0] ** 2 + v[1] ** 2
    par = [sp.Rational(dot, vv) * t for t in v]
    orth = [u[j] - par[j] for j in range(2)]
    assert sp.simplify(orth[0] * v[0] + orth[1] * v[1]) == 0, 'orthogonal piece is not orthogonal'
    # the manual's headline trap: |v| where |v| squared belongs
    mag = sp.sqrt(vv)
    badpar = [sp.simplify(sp.Rational(dot, 1) / mag) * t for t in v]
    correct = 'Parallel %s, orthogonal %s' % (vec(par), vec(orth))
    cands = ['Parallel %s, orthogonal %s' % (vec(orth), vec(par)),
             'Parallel %s, orthogonal %s' % (vec(par), vec([-t for t in orth])),
             'Parallel %s, orthogonal %s' % (vec(badpar), vec([u[j] - badpar[j] for j in range(2)])),
             'Parallel %s, orthogonal %s' % (vec([par[1], par[0]]), vec([orth[1], orth[0]])),
             'Parallel %s, orthogonal %s' % (vec([-t for t in par]), vec(orth))]
    opts, ai = shuffled_options(r, correct, pick3(correct, cands))
    bank.add(qid, 1, 3, 3, 'Applied', 'mcq',
             'Decompose u = %s into a piece parallel to v = %s and a piece orthogonal to v.'
             % (vec(u), vec(v)),
             opts, ai,
             'u %s v = %s and |v|%s = %d, so proj%su = (%s)v = %s. The orthogonal piece is what is '
             'left of u: %s, and dotting it with v gives 0.'
             % ('·', num(dot), sup(2), vv, 'ᵥ', num(sp.Rational(dot, vv)), vec(par),
                vec(orth)),
             ['The parallel piece is the vector projection; the orthogonal piece is whatever is left of u.',
              'u %s v = %s and |v|%s = %d, so the projection is (%s)v.'
              % ('·', num(dot), sup(2), vv, num(sp.Rational(dot, vv))),
              'Subtract: u %s proj%su. Dotting your orthogonal piece with v should give 0.'
              % (MINUS, 'ᵥ')])


def v015(bank, i):
    """Work as a dot product. Trap: using the endpoint instead of the displacement."""
    qid = 'k1-p-015' + LETTERS[i]
    r = rng_for(qid)
    F = [r.randint(5, 30), r.randint(5, 30)]
    A = [nz(r, -5, 5, ()), nz(r, -5, 5, ())]
    d = [r.randint(2, 9), r.randint(2, 9)]
    B = [A[0] + d[0], A[1] + d[1]]
    ans = F[0] * d[0] + F[1] * d[1]
    bank.add(qid, 1, 3, 4, 'Exam', 'fill',
             'A force F = %s N moves an object from (%s, %s) to (%s, %s), in metres. How much work '
             'is done, in joules? Give the number only.'
             % (vec(F), num(A[0]), num(A[1]), num(B[0]), num(B[1])),
             accepted(ans, '%d j' % ans, '%d joules' % ans), None,
             'The displacement is %s, so W = F %s d = %d(%d) + %d(%d) = %d J. Work is a dot '
             'product, so only the part of the force along the displacement counts.'
             % (vec(d), '·', F[0], d[0], F[1], d[1], ans),
             ['Work is the dot product of force with DISPLACEMENT, not with the endpoint.',
              'The displacement is %s %s %s = %s.'
              % (vec(B), MINUS, vec(A), vec(d)),
              'W = %d(%d) + %d(%d).' % (F[0], d[0], F[1], d[1])])


def v016(bank, i):
    """Solve for the unknown that makes two vectors orthogonal."""
    qid = 'k1-p-016' + LETTERS[i]
    r = rng_for(qid)
    c = sp.Symbol('c')
    a2, a3 = nz(r, -5, 5), nz(r, -5, 5)
    b1, b3 = nz(r, -5, 5), nz(r, -5, 5)
    # <c, a2, a3> . <b1, c, b3> = b1*c + a2*c + a3*b3
    lin = b1 + a2
    if lin == 0:
        a2 += 1
        lin = b1 + a2
    const = a3 * b3
    sol = sp.Rational(-const, lin)
    assert sp.simplify(b1 * sol + a2 * sol + const) == 0, 'c does not make the dot product zero'
    forms = accepted(num(sol), sp.N(sol, 6) if sol.q != 1 else num(sol))
    bank.add(qid, 1, 3, 4, 'Exam', 'fill',
             'Find the value of c for which %sc, %s, %s%s is orthogonal to %s%s, c, %s%s.'
             % ('⟨', num(a2), num(a3), '⟩', '⟨', num(b1), num(b3), '⟩'),
             forms, None,
             'Orthogonal means the dot product is zero: %sc + %sc + %s = 0, so %sc = %s and '
             'c = %s. These problems are always one equation in one unknown.'
             % (num(b1), num(a2), num(const), num(lin), num(-const), num(sol)),
             ['Orthogonal vectors have a dot product of zero. Set it up and solve.',
              'The dot product is %sc + %sc + (%s)(%s).'
              % (num(b1), num(a2), num(a3), num(b3)),
              'That collapses to %sc + %s = 0.' % (num(lin), num(const))])


# --------------------------------------------------------------------------
# L4 - cross products
# --------------------------------------------------------------------------

def v017(bank, i):
    """Cross product. The manual's trap: the minus sign on the j component."""
    qid = 'k1-p-017' + LETTERS[i]
    r = rng_for(qid)
    u = [nz(r, -5, 5, ()), nz(r, -5, 5, ()), nz(r, -5, 5, ())]
    v = [nz(r, -5, 5, ()), nz(r, -5, 5, ()), nz(r, -5, 5, ())]
    U, V = sp.Matrix(u), sp.Matrix(v)
    cr = list(U.cross(V))
    if all(t == 0 for t in cr):
        v[0] += 1
        cr = list(sp.Matrix(u).cross(sp.Matrix(v)))
    assert sum(a * b for a, b in zip(cr, u)) == 0 and sum(a * b for a, b in zip(cr, v)) == 0, 'cross product is not orthogonal to its inputs'
    nosign = [cr[0], -cr[1], cr[2]]          # forgot the j minus
    rev = [-t for t in cr]                    # crossed in the wrong order
    dotish = [u[j] * v[j] for j in range(3)]  # multiplied componentwise
    opts, ai = shuffled_options(r, vec(cr), pick3(vec(cr), [vec(x) for x in (nosign, rev, dotish)], [vec(x) for x in vec_slips(cr)]))
    bank.add(qid, 1, 4, 2, 'Applied', 'mcq',
             'Compute %s %s %s.' % (vec(u), '×', vec(v)),
             opts, ai,
             'i: (%s)(%s) %s (%s)(%s) = %s. j: %s[(%s)(%s) %s (%s)(%s)] = %s, and that middle '
             'term carries a minus. k: (%s)(%s) %s (%s)(%s) = %s. Dotting %s with each input '
             'gives 0, which is the free check.'
             % (num(u[1]), num(v[2]), MINUS, num(u[2]), num(v[1]), num(cr[0]), MINUS,
                num(u[0]), num(v[2]), MINUS, num(u[2]), num(v[0]), num(cr[1]),
                num(u[0]), num(v[1]), MINUS, num(u[1]), num(v[0]), num(cr[2]), vec(cr)),
             ['Expand the determinant, and remember the j component carries a minus sign in front.',
              'i = u%sv%s %s u%sv%s, j = %s[u%sv%s %s u%sv%s], k = u%sv%s %s u%sv%s.'
              % (sub(2), sub(3), MINUS, sub(3), sub(2), MINUS, sub(1), sub(3), MINUS,
                 sub(3), sub(1), sub(1), sub(2), MINUS, sub(2), sub(1)),
              'Check your answer by dotting it with BOTH inputs - both should come out zero.'])


def v018(bank, i):
    """Area of the parallelogram spanned by two vectors."""
    qid = 'k1-p-018' + LETTERS[i]
    r = rng_for(qid)
    u = [nz(r, -4, 4, ()), nz(r, -4, 4, ()), r.randint(-2, 2)]
    v = [nz(r, -4, 4, ()), nz(r, -4, 4, ()), r.randint(-2, 2)]
    cr = sp.Matrix(u).cross(sp.Matrix(v))
    if all(t == 0 for t in cr):
        v[1] += 1
        cr = sp.Matrix(u).cross(sp.Matrix(v))
    area = sp.sqrt(sum(t ** 2 for t in cr))
    correct = num(area)
    cands = [num(area / 2), num(area ** 2), num(2 * area)]
    opts, ai = shuffled_options(r, correct, pick3(correct, cands))
    bank.add(qid, 1, 4, 2, 'Applied', 'mcq',
             'Find the area of the parallelogram determined by u = %s and v = %s.'
             % (vec(u), vec(v)),
             opts, ai,
             'u %s v = %s, so the area is |u %s v| = %s. Halving it would give the area of the '
             'triangle on the same two edges, not the parallelogram.'
             % ('×', vec(list(cr)), '×', num(area)),
             ['The area of the parallelogram is the MAGNITUDE of the cross product.',
              'u %s v = %s.' % ('×', vec(list(cr))),
              'Take %s(%s). Do not halve it - that would be the triangle.'
              % ('√', ' + '.join(str(t ** 2) for t in cr))])


def v019(bank, i):
    """Area of a triangle from three vertices. Trap: forgetting the half."""
    qid = 'k1-p-019' + LETTERS[i]
    r = rng_for(qid)
    A = [nz(r, -4, 4, ()), nz(r, -4, 4, ()), nz(r, -4, 4, ())]
    AB = [nz(r, -4, 4, ()), nz(r, -4, 4, ()), nz(r, -4, 4, ())]
    AC = [nz(r, -4, 4, ()), nz(r, -4, 4, ()), nz(r, -4, 4, ())]
    cr = sp.Matrix(AB).cross(sp.Matrix(AC))
    if all(t == 0 for t in cr):
        AC[0] += 1
        cr = sp.Matrix(AB).cross(sp.Matrix(AC))
    B = [A[j] + AB[j] for j in range(3)]
    C = [A[j] + AC[j] for j in range(3)]
    full = sp.sqrt(sum(t ** 2 for t in cr))
    area = sp.simplify(full / 2)
    correct = num(area)
    cands = [num(full), num(sp.simplify(full ** 2 / 2)), num(sp.simplify(area / 2))]
    opts, ai = shuffled_options(r, correct, pick3(correct, cands))
    bank.add(qid, 1, 4, 3, 'Applied', 'mcq',
             'Find the area of the triangle with vertices A(%s, %s, %s), B(%s, %s, %s) and '
             'C(%s, %s, %s).' % tuple(num(t) for t in A + B + C),
             opts, ai,
             'Build two edges from the same vertex: AB = %s and AC = %s. Their cross product is %s, '
             'with magnitude %s, and a triangle is half the parallelogram, so the area is %s.'
             % (vec(AB), vec(AC), vec(list(cr)), num(full), num(area)),
             ['Make two edge vectors starting from the SAME vertex, then cross them.',
              'AB = %s and AC = %s, and AB %s AC = %s.'
              % (vec(AB), vec(AC), '×', vec(list(cr))),
              'The cross product has magnitude %s. A triangle is HALF the parallelogram.'
              % num(full)])


def v020(bank, i):
    """Unit vector orthogonal to two given vectors."""
    qid = 'k1-p-020' + LETTERS[i]
    r = rng_for(qid)
    u = [r.randint(-2, 2), r.randint(-2, 2), r.randint(-2, 2)]
    v = [r.randint(-2, 2), r.randint(-2, 2), r.randint(-2, 2)]
    cr = sp.Matrix(u).cross(sp.Matrix(v))
    while all(t == 0 for t in cr) or all(t == 0 for t in u) or all(t == 0 for t in v):
        u = [r.randint(-2, 2), r.randint(-2, 2), r.randint(-2, 2)]
        v = [r.randint(-2, 2), r.randint(-2, 2), r.randint(-2, 2)]
        cr = sp.Matrix(u).cross(sp.Matrix(v))
    mag = sp.sqrt(sum(t ** 2 for t in cr))
    unit = [sp.simplify(t / mag) for t in cr]
    assert sp.simplify(sum(t ** 2 for t in unit) - 1) == 0, 'unit vector is not length 1'
    correct = vec(unit)
    cands = [vec(list(cr)), vec([sp.simplify(t / mag ** 2) for t in cr]),
             vec([sp.simplify(-t / mag) for t in cr])]
    opts, ai = shuffled_options(r, correct, pick3(correct, cands, [vec(x) for x in vec_slips(unit)]))
    bank.add(qid, 1, 4, 3, 'Applied', 'mcq',
             'Find a unit vector orthogonal to both %s and %s.' % (vec(u), vec(v)),
             opts, ai,
             'The cross product is %s, with magnitude %s, so the unit vector is %s. Its negative '
             'is equally valid, since orthogonal does not pick a side.'
             % (vec(list(cr)), num(mag), vec(unit)),
             ['The cross product is orthogonal to both inputs. Then make it length 1.',
              '%s %s %s = %s.' % (vec(u), '×', vec(v), vec(list(cr))),
              'Its magnitude is %s, so divide each component by that - not by its square.'
              % num(mag)])


def v021(bank, i):
    """Torque magnitude. Trap: cosine instead of sine."""
    qid = 'k1-p-021' + LETTERS[i]
    r = rng_for(qid)
    L = r.choice([0.2, 0.25, 0.3, 0.4, 0.5])
    F = r.choice([40, 50, 60, 75, 80, 100])
    deg = r.choice([25, 35, 40, 55, 65, 70, 80])
    prod = sp.Rational(str(L)) * F
    ans = prod * sp.sin(sp.rad(deg))
    fmt = lambda e: 'About %s N%sm' % (sp.N(e, 3), '·')
    cands = ['%s N%sm' % (num(prod), '·'), fmt(prod * sp.cos(sp.rad(deg))),
             fmt(prod * sp.tan(sp.rad(deg)))]
    opts, ai = shuffled_options(r, fmt(ans), pick3(fmt(ans), cands))
    bank.add(qid, 1, 4, 4, 'Exam', 'mcq',
             'A %s m wrench is turned by a %d N force applied at %d%s to the handle. Find the '
             'magnitude of the torque.' % (L, F, deg, '°'),
             opts, ai,
             '|%s| = |r||F|sin %s = (%s)(%d)sin%d%s %s %s N%sm. The sine is why pushing along the '
             'handle produces no torque and pushing perpendicular produces the most.'
             % ('τ', 'θ', L, F, deg, '°', '≈', sp.N(ans, 3), '·'),
             ['Torque is a cross product, so the angle enters through sine, not cosine.',
              '|%s| = |r||F|sin %s = (%s)(%d)sin%d%s.' % ('τ', 'θ', L, F, deg, '°'),
              '(%s)(%d) = %s, and sin%d%s %s %s.'
              % (L, F, num(prod), deg, '°', '≈', sp.N(sp.sin(sp.rad(deg)), 4))])


def v022(bank, i):
    """Parallel or not. Trap: reaching for the dot product."""
    qid = 'k1-p-022' + LETTERS[i]
    r = rng_for(qid)
    base = [nz(r, -4, 4, ()), nz(r, -4, 4, ()), nz(r, -4, 4, ())]
    parallel = r.random() < 0.5
    if parallel:
        k = r.choice([sp.Rational(-3, 2), sp.Rational(3, 2), -2, 2, sp.Rational(-1, 2)])
        other = [k * t for t in base]
        if any(t != int(t) for t in other):
            k = r.choice([-2, 2, 3, -3])
            other = [k * t for t in base]
        correct = ('Yes, one is %s times the other and their cross product is %s0, 0, 0%s'
                   % (num(k), '⟨', '⟩'))
        cands = ['No, their dot product is not zero',
                 'No, they point in opposite directions',
                 'Cannot be determined without the angle']
    else:
        other = [nz(r, -4, 4, ()), nz(r, -4, 4, ()), nz(r, -4, 4, ())]
        cr = sp.Matrix(base).cross(sp.Matrix(other))
        while all(t == 0 for t in cr):
            other = [nz(r, -4, 4, ()), nz(r, -4, 4, ()), nz(r, -4, 4, ())]
            cr = sp.Matrix(base).cross(sp.Matrix(other))
        correct = 'No, their cross product is %s, which is not the zero vector' % vec(list(cr))
        cands = ['Yes, because their dot product is not zero',
                 'Yes, one is a scalar multiple of the other',
                 'Cannot be determined without the angle']
    opts, ai = shuffled_options(r, correct, pick3(correct, cands))
    bank.add(qid, 1, 4, 4, 'Exam', 'mcq',
             'Are %s and %s parallel? Justify by the strongest test.' % (vec(base), vec(other)),
             opts, ai,
             'Parallel means one vector is a scalar multiple of the other, and the formal test is '
             'the cross product: it vanishes exactly when the vectors are parallel, just as a zero '
             'DOT product is the perpendicular test. Vectors pointing opposite ways are still parallel.',
             ['Parallel means one vector is a scalar multiple of the other. One product vanishes exactly then.',
              'Compare the component ratios. A zero dot product would be the PERPENDICULAR test, not this one.',
              'Compute %s %s %s and see whether it is the zero vector.'
              % (vec(base), '×', vec(other))])


TEMPLATES = [v001, v002, v003, v004, v005, v006, v007, v008, v009, v010, v011,
             v012, v013, v014, v015, v016, v017, v018, v019, v020, v021, v022]


def gen(bank):
    for t in TEMPLATES:
        for i in range(9):
            t(bank, i)
