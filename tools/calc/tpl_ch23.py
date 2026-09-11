"""Chapters 2 and 3 - area, volume, arc length and physical applications.

Field Manual lessons 5-9 (sections 6.2-6.7). The manual's traps drive the
distractors:

  L5  curves that swap places need the integral split; top minus bottom
  L6  (R - r)^2 is not R^2 - r^2, and a shifted axis needs new radii
  L7  the 2 pi and the extra factor of x are what people drop
  L8  square the derivative properly and keep the +1
  L9  work is an integral because the force varies, not the distance
"""
import sympy as sp
from genlib import (MINUS, num, sup, ex, Bank, shuffled_options, rng_for, accepted)
from tpl_ch1 import pick3, nz

LETTERS = 'bcdefghij'
X = sp.Symbol('x', positive=True)
Y = sp.Symbol('y')


def pin(name):
    """A multiple of pi, written the way the questions ask for it."""
    return name


# --------------------------------------------------------------------------
# L5 - regions between curves
# --------------------------------------------------------------------------

def v2_001(bank, i):
    """Area between y = ax^2 and y = bx. Trap: which curve is on top."""
    qid = 'k2-p-001' + LETTERS[i]
    r = rng_for(qid)
    a = r.choice([1, 1, 2, 3])
    b = r.choice([2, 3, 4, 6, 8])
    hi = sp.Rational(b, a)
    area = sp.integrate(b * X - a * X ** 2, (X, 0, hi))
    assert area > 0, 'area came out negative, so the curves are the wrong way round'
    wrong = [sp.integrate(a * X ** 2 - b * X, (X, 0, hi)),
             sp.integrate(b * X - a * X ** 2, (X, 0, 1)),
             sp.integrate(b * X + a * X ** 2, (X, 0, hi))]
    top = 'y = %sx' % (num(b) if b != 1 else '')
    bot = 'y = %sx%s' % (num(a) if a != 1 else '', sup(2))
    bank.add(qid, 2, 5, 2, 'Applied', 'fill',
             'Find the area of the region between %s and %s. Give the exact value.' % (bot, top),
             accepted(num(area), sp.N(area, 6)), None,
             'They meet where %sx%s = %sx, at x = 0 and x = %s, with the line on top there. '
             '%s(%sx %s %sx%s) dx over [0, %s] = %s.'
             % (num(a), sup(2), num(b), num(hi), '∫', num(b), MINUS, num(a), sup(2),
                num(hi), num(area)),
             ['Find the intersections first - they are the limits - and decide which curve is on top between them.',
              '%sx%s = %sx gives x = 0 and x = %s. On that interval the line is above the parabola.'
              % (num(a), sup(2), num(b), num(hi)),
              'Integrate top minus bottom: %s%sx %s %sx%s%s dx from 0 to %s.'
              % ('(', num(b), MINUS, num(a), sup(2), ')', num(hi))])


def v2_002(bank, i):
    """Area enclosed by two parabolas that open opposite ways."""
    qid = 'k2-p-002' + LETTERS[i]
    r = rng_for(qid)
    c = r.choice([1, 4, 9, 16, 25])
    a = r.choice([1, 2])
    # y = a x^2 - c and y = c - a x^2 meet where a x^2 = c
    hi = sp.sqrt(sp.Rational(c, a))
    area = sp.integrate((c - a * X ** 2) - (a * X ** 2 - c), (X, -hi, hi))
    wrong = [sp.integrate((c - a * X ** 2) - (a * X ** 2 - c), (X, 0, hi)),
             sp.integrate(c - a * X ** 2, (X, -hi, hi)),
             sp.integrate((a * X ** 2 - c) - (c - a * X ** 2), (X, -hi, hi))]
    f1 = '%sx%s %s %s' % (num(a) if a != 1 else '', sup(2), MINUS, num(c))
    f2 = '%s %s %sx%s' % (num(c), MINUS, num(a) if a != 1 else '', sup(2))
    bank.add(qid, 2, 5, 3, 'Applied', 'fill',
             'Find the area enclosed by y = %s and y = %s. Give the exact value.' % (f1, f2),
             accepted(num(area), sp.N(area, 6)), None,
             'They meet where %sx%s %s %s = %s %s %sx%s, so x = %s%s. The second curve is on top, '
             'and the integral of the difference over that interval is %s.'
             % (num(a), sup(2), MINUS, num(c), num(c), MINUS, num(a), sup(2), '±', num(hi),
                num(area)),
             ['Set the two expressions equal to find where they cross, then integrate top minus bottom.',
              'Solving gives x = %s%s, and %s is the upper curve between them.' % ('±', num(hi), f2),
              'The integrand simplifies to %s(%s %s %sx%s). Symmetry lets you double the integral from 0.'
              % (2, num(c), MINUS, num(a), sup(2))])


def v2_003(bank, i):
    """Which dy integral gives the area. Trap: left/right instead of top/bottom."""
    qid = 'k2-p-003' + LETTERS[i]
    r = rng_for(qid)
    b = r.choice([2, 3, 4, 6])
    # x = y^2 and x = y + b meet where y^2 - y - b = 0
    disc = 1 + 4 * b
    while not sp.sqrt(disc).is_Integer:
        b = r.choice([2, 6, 12, 20, 30])
        disc = 1 + 4 * b
    lo = sp.Rational(1 - int(sp.sqrt(disc)), 2)
    hi = sp.Rational(1 + int(sp.sqrt(disc)), 2)
    val = sp.integrate(Y + b - Y ** 2, (Y, lo, hi))
    fm = lambda a1, a2, body: '%s%s^%s (%s) dy' % ('∫', num(a1), num(a2), body)
    correct = fm(lo, hi, 'y + %s %s y%s' % (num(b), MINUS, sup(2)))
    cands = [fm(lo, hi, 'y%s %s y %s %s' % (sup(2), MINUS, MINUS, num(b))),
             fm(0, hi, 'y + %s %s y%s' % (num(b), MINUS, sup(2))),
             fm(-hi, -lo, 'y + %s %s y%s' % (num(b), MINUS, sup(2)))]
    opts, ai = shuffled_options(r, correct, pick3(correct, cands))
    bank.add(qid, 2, 5, 4, 'Exam', 'mcq',
             'The region bounded by x = y%s and x = y + %s is easiest to integrate in y. Which '
             'integral gives its area?' % (sup(2), num(b)),
             opts, ai,
             'Setting y%s = y + %s gives y = %s and y = %s. In y the right boundary is always the '
             'line, so the integrand is right minus left: (y + %s) %s y%s. Its value is %s.'
             % (sup(2), num(b), num(lo), num(hi), num(b), MINUS, sup(2), num(val)),
             ['Integrating in y means RIGHT boundary minus LEFT boundary, and the limits are y-values.',
              'y%s = y + %s gives y = %s and y = %s.' % (sup(2), num(b), num(lo), num(hi)),
              'On that interval the line x = y + %s lies to the right of the parabola x = y%s.'
              % (num(b), sup(2))])


def v2_008(bank, i):
    """Total AREA under a sine arch, where the signed integral cancels."""
    qid = 'k2-p-008' + LETTERS[i]
    r = rng_for(qid)
    k = r.choice([1, 2, 3])
    periods = r.choice([1, 2])
    hi = sp.pi * periods * 2 / k
    signed = sp.integrate(sp.sin(k * X), (X, 0, hi))
    area = sp.integrate(sp.Abs(sp.sin(k * X)), (X, 0, hi))
    arg = 'sin x' if k == 1 else 'sin(%dx)' % k
    lim = ('2%s' % 'π') if (periods * 2 / k == 2) else num(hi)
    bank.add(qid, 2, 5, 4, 'Exam', 'fill',
             'Find the total AREA between y = %s and the x-axis from x = 0 to x = %s.' % (arg, lim),
             accepted(num(area), sp.N(area, 6)), None,
             'The plain integral is %s because the humps cancel. Area needs the absolute value, so '
             'each hump contributes its size: the total is %s.' % (num(signed), num(area)),
             ['Sketch it. The curve is above the axis on some stretches and below on others.',
              'The signed integral over the whole range is %s, which is not the area.' % num(signed),
              'Take the size of each hump and add them: there are %d of them, each of area %s.'
              % (int(area / 2), 2)])


# --------------------------------------------------------------------------
# L6 - disks, washers and known cross-sections
# --------------------------------------------------------------------------

def v2_004(bank, i):
    """Disk volume. Trap: forgetting to square the radius."""
    qid = 'k2-p-004' + LETTERS[i]
    r = rng_for(qid)
    kind = r.choice(['sqrt', 'lin', 'sq'])
    b = r.choice([1, 2, 3, 4, 5, 6])
    f = {'sqrt': sp.sqrt(X), 'lin': X, 'sq': X ** 2}[kind]
    label = {'sqrt': '%sx' % '√', 'lin': 'x', 'sq': 'x%s' % sup(2)}[kind]
    vol = sp.pi * sp.integrate(f ** 2, (X, 0, b))
    wrong = [sp.pi * sp.integrate(f, (X, 0, b)),
             sp.integrate(f ** 2, (X, 0, b)),
             2 * sp.pi * sp.integrate(X * f, (X, 0, b))]
    fmt = lambda v: num(sp.simplify(v / sp.pi)) + 'π'
    bank.add(qid, 2, 6, 2, 'Applied', 'fill',
             'The region under y = %s from x = 0 to x = %d is revolved about the x-axis. Find the '
             'volume. Give it as a multiple of %s, for example 8%s.' % (label, b, 'π', 'π'),
             accepted(fmt(vol), fmt(vol).replace('π', 'pi'), fmt(vol).replace('π', ' pi')), None,
             'Disks: V = %s%s R%s dx with R = %s, so V = %s%s (%s)%s dx over [0, %d] = %s.'
             % ('π', '∫', sup(2), label, 'π', '∫', label, sup(2), b, fmt(vol)),
             ['Rotating about the x-axis with no hole means disks: V = %s%s R%s dx, where R is the curve.'
              % ('π', '∫', sup(2)),
              'R = %s, so R%s = %s.' % (label, sup(2), ex(f ** 2)),
              'Integrate %s from 0 to %d, then multiply by %s.' % (ex(f ** 2), b, 'π')])


def v2_005(bank, i):
    """Washer volume. The manual's trap: (R - r)^2 is not R^2 - r^2."""
    qid = 'k2-p-005' + LETTERS[i]
    r = rng_for(qid)
    n = r.choice([2, 3])
    m = r.choice([1])
    # y = x (outer) above y = x^n on [0,1]
    outer, inner = X ** m, X ** n
    vol = sp.pi * sp.integrate(outer ** 2 - inner ** 2, (X, 0, 1))
    bad = sp.pi * sp.integrate((outer - inner) ** 2, (X, 0, 1))
    wrong = [bad, sp.pi * sp.integrate(outer ** 2 + inner ** 2, (X, 0, 1)),
             sp.pi * sp.integrate(inner ** 2 - outer ** 2, (X, 0, 1))]
    fmt = lambda v: num(sp.simplify(v / sp.pi)) + 'π'
    correct = fmt(vol)
    cands = [fmt(w) for w in wrong]
    opts, ai = shuffled_options(r, correct, pick3(correct, cands,
                                                  [fmt(vol * 2), fmt(vol / 2), fmt(-vol)]))
    lab_o = 'x' if m == 1 else 'x%s' % sup(m)
    lab_i = 'x%s' % sup(n)
    bank.add(qid, 2, 6, 3, 'Applied', 'mcq',
             'The region between y = %s and y = %s from 0 to 1 is revolved about the x-axis. What '
             'is the volume?' % (lab_i, lab_o),
             opts, ai,
             'Washers, with y = %s on top as the outer radius: V = %s%s (%s %s %s) dx over [0, 1] '
             '= %s. Using %s(R %s r)%s dx instead gives %s, which is the classic error.'
             % (lab_o, 'π', '∫', ex(outer ** 2), MINUS, ex(inner ** 2), correct, 'π', MINUS,
                sup(2), fmt(bad)),
             ['Two curves and a hole in the middle means washers: %s%s (R%s %s r%s) dx.'
              % ('π', '∫', sup(2), MINUS, sup(2)),
              'On (0, 1) the curve y = %s is ABOVE y = %s, so R = %s and r = %s.'
              % (lab_o, lab_i, lab_o, lab_i),
              'Square each radius BEFORE subtracting: (R %s r)%s is not R%s %s r%s.'
              % (MINUS, sup(2), sup(2), MINUS, sup(2))])


def v2_006(bank, i):
    """Volume from known cross-sections on a circular base."""
    qid = 'k2-p-006' + LETTERS[i]
    r = rng_for(qid)
    R = r.choice([1, 2, 3])
    shape = r.choice(['square', 'semicircle', 'triangle'])
    half = sp.sqrt(R ** 2 - X ** 2)
    if shape == 'square':
        A = (2 * half) ** 2
        desc = 'squares'
        side = 'the full chord 2%s(%d %s x%s)' % ('√', R ** 2, MINUS, sup(2))
    elif shape == 'semicircle':
        A = sp.pi * (half) ** 2 / 2
        desc = 'semicircles with the chord as diameter'
        side = 'a semicircle of radius %s(%d %s x%s)' % ('√', R ** 2, MINUS, sup(2))
    else:
        A = sp.sqrt(3) / 4 * (2 * half) ** 2
        desc = 'equilateral triangles'
        side = 'an equilateral triangle on the full chord'
    vol = sp.integrate(A, (X, -R, R))
    wrong = [sp.integrate(A, (X, 0, R)), sp.integrate(sp.sqrt(A), (X, -R, R)),
             sp.integrate(A / 2, (X, -R, R))]
    correct = num(vol)
    opts, ai = shuffled_options(r, correct, pick3(correct, [num(w) for w in wrong],
                                                  [num(vol * 2), num(vol / 4), num(vol + 1)]))
    bank.add(qid, 2, 6, 3, 'Applied', 'mcq',
             'A solid has a circular base of radius %d, and cross-sections perpendicular to a '
             'diameter are %s. What is its volume?' % (R, desc),
             opts, ai,
             'The chord at position x runs from %s%s(%d %s x%s) to +%s(%d %s x%s), so A(x) is built '
             'on %s and V = %sA(x) dx from %s%d to %d = %s.'
             % (MINUS, '√', R ** 2, MINUS, sup(2), '√', R ** 2, MINUS, sup(2), side, '∫',
                MINUS, R, R, correct),
             ['Volume by slicing is %sA(x) dx. Find the cross-section at position x first.' % '∫',
              'The chord of the circle at x has full length 2%s(%d %s x%s).'
              % ('√', R ** 2, MINUS, sup(2)),
              'A(x) = %s, so integrate that across the whole base, from %s%d to %d.'
              % (ex(sp.simplify(A)), MINUS, R, R)])


def v2_007(bank, i):
    """Radius when the axis is shifted. The manual's second trap in L6."""
    qid = 'k2-p-007' + LETTERS[i]
    r = rng_for(qid)
    c = r.choice([1, 2, 3, 4, 5])
    horiz = r.random() < 0.5
    if horiz:
        q = ('The region under y = f(x) is revolved about the line y = %d rather than the x-axis. '
             'What is the radius of a disk at position x?' % c)
        correct = '|f(x) %s %d|' % (MINUS, c)
        cands = ['f(x)', 'f(x) + %d' % c, 'f(x)/%d' % c]
        why = ('The radius is always the DISTANCE from the axis of revolution to the curve, which '
               'is |f(x) %s %d|. Using f(x) silently assumes the axis is y = 0.' % (MINUS, c))
        hints = ['The radius is a distance, and a distance from the AXIS, not from zero.',
                 'The axis is the horizontal line y = %d, and the curve is at height f(x).' % c,
                 'The gap between them is f(x) %s %d, and a radius cannot be negative.' % (MINUS, c)]
    else:
        q = ('A region is revolved about the vertical line x = %d, using disks in y. What is the '
             'radius of a disk at height y, if the boundary is x = g(y)?' % c)
        correct = '|g(y) %s %d|' % (MINUS, c)
        cands = ['g(y)', 'g(y) + %d' % c, '%d %s g(y)%s' % (c, MINUS, sup(2))]
        why = ('The radius is the distance from the axis x = %d to the boundary x = g(y), so '
               '|g(y) %s %d|. A vertical axis also means you must integrate in y.' % (c, MINUS, c))
        hints = ['The radius is a distance from the AXIS, not from the y-axis.',
                 'The axis is the vertical line x = %d, and the boundary sits at x = g(y).' % c,
                 'A vertical axis with disks forces the integration variable to be y, not x.']
    opts, ai = shuffled_options(r, correct, pick3(correct, cands))
    bank.add(qid, 2, 6, 4, 'Exam', 'mcq', q, opts, ai, why, hints)


# --------------------------------------------------------------------------
# L7 - shells
# --------------------------------------------------------------------------

def v3_001(bank, i):
    """Shell volume about the y-axis. Trap: dropping the 2 pi or the x."""
    qid = 'k3-p-001' + LETTERS[i]
    r = rng_for(qid)
    n = r.choice([1, 2, 3])
    b = r.choice([1, 2, 3, 4])
    f = X ** n
    vol = 2 * sp.pi * sp.integrate(X * f, (X, 0, b))
    fmt = lambda v: num(sp.simplify(v / sp.pi)) + 'π'
    lab = 'x' if n == 1 else 'x%s' % sup(n)
    bank.add(qid, 3, 7, 2, 'Applied', 'fill',
             'The region under y = %s from x = 0 to x = %d is revolved about the y-axis. Using '
             'shells, find the volume. Give it as a multiple of %s.' % (lab, b, 'π'),
             accepted(fmt(vol), fmt(vol).replace('π', 'pi'), fmt(vol).replace('π', ' pi')), None,
             'Shells: V = 2%s%s x%sf(x) dx = 2%s%s %s dx over [0, %d] = %s. Shells let you keep '
             'integrating in x even though the axis is vertical.'
             % ('π', '∫', '·', 'π', '∫', ex(X * f), b, fmt(vol)),
             ['Shells about the y-axis use V = 2%s%s (radius)(height) dx, with radius x.' % ('π', '∫'),
              'The height of the shell at x is f(x) = %s, so the integrand is x%s%s = %s.'
              % (lab, '·', lab, ex(X * f)),
              'Integrate %s from 0 to %d, then multiply by 2%s. Dropping either the 2%s or the '
              'extra x is the usual slip.' % (ex(X * f), b, 'π', 'π')])


def v3_002(bank, i):
    """Shell radius about a vertical line."""
    qid = 'k3-p-002' + LETTERS[i]
    r = rng_for(qid)
    c = r.choice([4, 5, 6, 7, 8])
    b = r.choice([2, 3])
    while b >= c:
        b = r.choice([2, 3])
    correct = '%d %s x' % (c, MINUS)
    cands = ['x', 'x %s %d' % (MINUS, c), '%d + x' % c]
    opts, ai = shuffled_options(r, correct, pick3(correct, cands))
    bank.add(qid, 3, 7, 4, 'Exam', 'mcq',
             'A region lying in 0 %s x %s %d is revolved about the line x = %d, using shells. '
             'What is the shell radius?' % ('≤', '≤', b, c),
             opts, ai,
             'The radius is the distance from the strip at position x to the axis x = %d, which is '
             '%d %s x and stays positive throughout 0 %s x %s %d.'
             % (c, c, MINUS, '≤', '≤', b),
             ['The radius is the distance from the strip to the axis of revolution.',
              'The strip sits at position x; the axis sits at %d.' % c,
              'On 0 %s x %s %d the axis is to the RIGHT, so the distance must come out positive.'
              % ('≤', '≤', b)])


# --------------------------------------------------------------------------
# L8 - arc length
# --------------------------------------------------------------------------

def v3_003(bank, i):
    """Arc length of a curve chosen so the radical collapses."""
    qid = 'k3-p-003' + LETTERS[i]
    r = rng_for(qid)
    m, bs = r.choice([(1, [3, 8, 15]), (4, [2, 6, 12]), (9, [7]), (16, [5])])
    b = r.choice(bs)
    a = sp.Rational(2, 3) * sp.sqrt(m)
    f = a * X ** sp.Rational(3, 2)
    integrand = sp.sqrt(1 + sp.diff(f, X) ** 2)
    assert sp.simplify(integrand - sp.sqrt(1 + m * X)) == 0, 'the radical did not collapse'
    L = sp.integrate(sp.sqrt(1 + m * X), (X, 0, b))
    coef = num(a)
    bank.add(qid, 3, 8, 3, 'Applied', 'fill',
             'Find the arc length of y = %sx^(3/2) from x = 0 to x = %d. Give the exact value.'
             % (('(%s)' % coef) if a != 1 else '', b),
             accepted(num(L), sp.N(L, 6)), None,
             "f%s(x) = %s, so 1 + f%s%s = 1 + %dx and the integrand is %s(1 + %dx). Integrating "
             'from 0 to %d gives %s.'
             % ('′', ex(sp.diff(f, X)), '′', sup(2), m, '√', m, b, num(L)),
             ['Arc length is %s%s(1 + f%s(x)%s) dx. Differentiate first and see what the radical becomes.'
              % ('∫', '√', '′', sup(2)),
              "f%s(x) = %s, so f%s(x)%s = %dx and the integrand is %s(1 + %dx)."
              % ('′', ex(sp.diff(f, X)), '′', sup(2), m, '√', m),
              'The antiderivative of (1 + %dx)^(1/2) is 2(1 + %dx)^(3/2)/(3%s%d). Evaluate from 0 to %d.'
              % (m, m, '·', m, b)])


def v3_004(bank, i):
    """Arc length of a straight line - the sanity check against the distance formula."""
    qid = 'k3-p-004' + LETTERS[i]
    r = rng_for(qid)
    m = r.choice([2, 3, 4, 5, 6, 7])
    b = r.choice([1, 2, 3, 4])
    L = sp.simplify(b * sp.sqrt(1 + m ** 2))
    bank.add(qid, 3, 8, 2, 'Applied', 'fill',
             'Find the arc length of y = %dx from x = 0 to x = %d using the arc length formula. '
             'Give the exact value.' % (m, b),
             accepted(num(L), sp.N(L, 6)), None,
             "f%s = %d, so the integrand is %s(1 + %d) = %s, a constant, and the length is that "
             'times the interval width %d, giving %s. It matches the straight-line distance from '
             '(0, 0) to (%d, %d).'
             % ('′', m, '√', m ** 2, num(sp.sqrt(1 + m ** 2)), b, num(L), b, m * b),
             ['The integrand is %s(1 + f%s%s), and for a straight line f%s is constant.'
              % ('√', '′', sup(2), '′'),
              "f%s = %d, so %s(1 + %d) = %s for every x." % ('′', m, '√', m ** 2, num(sp.sqrt(1 + m ** 2))),
              'Integrating a constant over [0, %d] just multiplies it by %d. Check it against the '
              'distance from (0, 0) to (%d, %d).' % (b, b, b, m * b)])


# --------------------------------------------------------------------------
# L9 - mass, work, springs
# --------------------------------------------------------------------------

def v3_005(bank, i):
    """Mass from a variable linear density."""
    qid = 'k3-p-005' + LETTERS[i]
    r = rng_for(qid)
    k = r.choice([2, 3, 4, 5, 6])
    n = r.choice([1, 2, 3])
    b = r.choice([1, 2, 3, 4])
    rho = k * X ** n
    m = sp.integrate(rho, (X, 0, b))
    bank.add(qid, 3, 9, 2, 'Applied', 'fill',
             'A rod on [0, %d] has linear density %s(x) = %s. Find its mass.'
             % (b, 'ρ', ex(rho)),
             accepted(num(m), sp.N(m, 6)), None,
             'Mass is %s%s dx = %s%s dx over [0, %d] = %s. Multiplying a density by a length only '
             'works when the density is constant.' % ('∫', 'ρ', '∫', ex(rho), b, num(m)),
             ['Mass is the integral of density over the rod.',
              '%s%s dx from 0 to %d.' % ('∫', ex(rho), b),
              'The antiderivative of %s is %s. Evaluate it from 0 to %d.'
              % (ex(rho), ex(sp.integrate(rho, X)), b)])


def v3_006(bank, i):
    """Work to stretch a spring. Trap: treating a varying force as constant."""
    qid = 'k3-p-006' + LETTERS[i]
    r = rng_for(qid)
    k = r.choice([4, 6, 8, 10, 12, 15, 20])
    d = r.choice([sp.Rational(1, 5), sp.Rational(2, 5), sp.Rational(1, 2), 1, 2, 3])
    W = sp.integrate(k * X, (X, 0, d))
    forms = accepted(num(W), sp.N(W, 6), '%s j' % num(W))
    bank.add(qid, 3, 9, 3, 'Applied', 'fill',
             'A spring with constant k = %d N/m is stretched from its natural length to %s m. '
             'Find the work done, in joules.' % (k, num(d)),
             forms, None,
             "Hooke's law gives F(x) = kx, so W = %s%dx dx from 0 to %s = %s%s(%s)%s = %s J. "
             'Equivalently W = %skd%s.'
             % ('∫', k, num(d), num(sp.Rational(k, 2)), '·', num(d), sup(2), num(W), '½', sup(2)),
             ['The force is not constant, so work is an integral: W = %sF(x) dx with F(x) = kx.' % '∫',
              'W = %s%dx dx from 0 to %s.' % ('∫', k, num(d)),
              'That evaluates to %s(%s)%s, or use the shortcut %skd%s.'
              % (num(sp.Rational(k, 2)), num(d), sup(2), '½', sup(2))])


def v3_007(bank, i):
    """Spring constant from the work - the same relation run backwards."""
    qid = 'k3-p-007' + LETTERS[i]
    r = rng_for(qid)
    k = r.choice([5, 8, 10, 12, 16, 20, 25])
    d = r.choice([1, 2, 3, 4])
    W = sp.Rational(k, 2) * d ** 2
    bank.add(qid, 3, 9, 4, 'Exam', 'fill',
             'A spring needs %s J of work to stretch from its natural length to %d m. Find its '
             'spring constant k, in N/m.' % (num(W), d),
             accepted(num(k), '%s n/m' % num(k)), None,
             'W = %skd%s, so %s = %sk(%d) and k = %d N/m. This is the spring work problem run '
             'backwards, which is how it usually appears on an exam.'
             % ('½', sup(2), num(W), '½', d ** 2, k),
             ['Start from the work formula for a spring and solve for k instead of W.',
              'W = %skd%s with W = %s and d = %d.' % ('½', sup(2), num(W), d),
              '%s = %sk(%d%s) = %sk.' % (num(W), '½', d, sup(2), num(sp.Rational(d ** 2, 2)))])


def v3_008(bank, i):
    """Winding a hanging cable. What makes it an integral is the varying distance."""
    qid = 'k3-p-008' + LETTERS[i]
    r = rng_for(qid)
    L = r.choice([6, 8, 10, 12, 15, 20])
    w = r.choice([1, 2, 3, 4, 5])
    W = sp.integrate(w * X, (X, 0, L))
    bank.add(qid, 3, 9, 4, 'Exam', 'fill',
             'A %d m cable weighing %d N/m hangs from a winch. Find the work needed to wind the '
             'whole cable up, in joules.' % (L, w),
             accepted(num(W), '%s j' % num(W)), None,
             'A slice at distance x below the top weighs %d dx and must rise x, so W = %s%dx dx '
             'over [0, %d] = %s J. What makes it an integral is that the DISTANCE varies from '
             'slice to slice; the weight per metre does not.' % (w, '∫', w, L, num(W)),
             ['Each slice of cable is lifted a DIFFERENT distance, which is what makes this an integral.',
              'A slice at depth x weighs %d dx and must be raised by x.' % w,
              'W = %s%dx dx from 0 to %d.' % ('∫', w, L)])


TEMPLATES = [v2_001, v2_002, v2_003, v2_004, v2_005, v2_006, v2_007, v2_008,
             v3_001, v3_002, v3_003, v3_004, v3_005, v3_006, v3_007, v3_008]


def gen(bank):
    for t in TEMPLATES:
        for i in range(9):
            t(bank, i)
