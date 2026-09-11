"""Shared machinery for generating calculus problem variants.

Every variant's answer is COMPUTED with sympy rather than typed, so a template
cannot ship a wrong answer the way a hand-written question can. Distractors are
produced from named error modes - the specific mistake a student makes - so a
wrong option is always a plausible piece of work, not noise.

Output notation matches the hand-written problems: plain Unicode, no markup,
because question text is escaped before it reaches the page.
"""
import random
import re
import sympy as sp

X, Y, Z, T, TH, N, K = sp.symbols('x y z t theta n k')

MINUS = '\u2212'      # proper minus sign, not a hyphen
LANG, RANG = '\u27e8', '\u27e9'
SUP = str.maketrans('0123456789+-n', '\u2070\u00b9\u00b2\u00b3\u2074\u2075\u2076\u2077\u2078\u2079\u207a\u207b\u207f')
SUB = str.maketrans('0123456789', '\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089')


def sup(s):
    """Superscript a short exponent, e.g. sup(3) -> the cubed glyph."""
    return str(s).translate(SUP)


def sub(s):
    return str(s).translate(SUB)


def neg(s):
    """Replace ASCII hyphens with the typographic minus used everywhere else."""
    return str(s).replace('-', MINUS)


def num(e):
    """Render a sympy number the way the hand-written questions do.

    Integers plain, rationals as a/b, square roots as radicals, pi as the
    glyph. Anything unrecognised falls back to sympy's own printer with the
    hyphens fixed, which is still readable.
    """
    e = sp.nsimplify(e) if not isinstance(e, sp.Basic) else e
    e = sp.simplify(e)
    if e.is_Integer:
        return neg(str(e))
    if e.is_Rational:
        return neg('%s/%s' % (e.p, e.q))
    # c * sqrt(r), possibly divided
    r = sp.radsimp(e)
    s = sp.sstr(r)
    s = s.replace('sqrt(', '\u221a(').replace('pi', '\u03c0').replace('exp(', 'e^(')
    s = s.replace('**', '^').replace('*', '')
    # a radical or power of a bare integer reads better without the brackets
    s = re.sub('\u221a' + r'\((\d+)\)', lambda m: '\u221a' + m.group(1), s)
    s = re.sub(r'e\^\((-?\d+)\)', lambda m: 'e^' + m.group(1), s)
    return neg(s)


def rad(n):
    """A square root, simplified: rad(50) -> 5 root 2."""
    return num(sp.sqrt(sp.Integer(n)))


def vec(v):
    """Format a vector in the angle-bracket notation the manual uses."""
    return LANG + ', '.join(num(c) for c in v) + RANG


def poly(coeffs, var='x'):
    """Render a polynomial from highest power down, skipping zero terms."""
    out = []
    d = len(coeffs) - 1
    for i, c in enumerate(coeffs):
        p = d - i
        if c == 0:
            continue
        a = abs(c)
        body = ('' if a == 1 and p > 0 else num(a)) + (var if p >= 1 else '') + (sup(p) if p >= 2 else '')
        sign = (' ' + MINUS + ' ') if c < 0 else (' + ' if out else '')
        out.append(sign + body)
    return (''.join(out).strip() or '0').lstrip('+ ').strip()


class Bank:
    """Collects generated questions and enforces the things that must hold."""

    def __init__(self):
        self.rows = []
        self.seen_ids = set()
        self.seen_stems = {}

    def add(self, qid, chapter, lesson, tier, tag, kind, q, options, answer, why, hints,
            source=None):
        assert qid not in self.seen_ids, 'duplicate id %s' % qid
        assert len(hints) == 3, '%s needs exactly 3 hints, got %d' % (qid, len(hints))
        assert all(isinstance(h, str) and len(h.strip()) > 10 for h in hints), \
            '%s has an empty or stub hint' % qid
        assert isinstance(why, str) and len(why.strip()) > 20, '%s has no real explanation' % qid
        if kind == 'mcq':
            assert isinstance(options, (list, tuple)) and len(options) == 4, \
                '%s needs 4 choices' % qid
            assert len(set(map(str, options))) == 4, '%s has duplicate choices: %r' % (qid, options)
            assert isinstance(answer, int) and 0 <= answer < 4, '%s bad answer index' % qid
        else:
            assert isinstance(options, (list, tuple)) and options, '%s has no accepted answers' % qid
            assert len(set(str(o).strip().lower() for o in options)) == len(options), \
                '%s lists the same accepted answer twice: %r' % (qid, options)
            answer = None
        key = (q.strip(), str(options))
        if key in self.seen_stems:
            raise AssertionError('%s duplicates %s exactly' % (qid, self.seen_stems[key]))
        self.seen_stems[key] = qid
        self.seen_ids.add(qid)
        self.rows.append(dict(id=qid, chapter=chapter, lesson=lesson, tier=tier, tag=tag,
                              kind=kind, q=q, options=list(options), answer=answer,
                              why=why, hints=list(hints), source=source))

    def js(self, header):
        """Emit the bank in the record format calc-questions-problems.js uses."""
        def s(v):
            return '"' + str(v).replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ') + '"'
        lines = [header, 'window.CALC_QBANK = window.CALC_QBANK || {};',
                 '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 91, 92, 93, 94].forEach(function (n) {',
                 '  CALC_QBANK[n] = CALC_QBANK[n] || [];', '});', '(function () {', 'var Q = [']
        for r in self.rows:
            opts = '[' + ','.join(s(o) for o in r['options']) + ']'
            ans = 'null' if r['answer'] is None else str(r['answer'])
            hints = '[' + ','.join(s(h) for h in r['hints']) + ']'
            lines.append(' [%s,%d,%d,%d,%s,%s,%s,%s,%s,%s,%s],' % (
                s(r['id']), r['chapter'], r['lesson'], r['tier'], s(r['tag']), s(r['kind']),
                s(r['q']), opts, ans, s(r['why']), hints))
        if lines[-1].endswith(','):
            lines[-1] = lines[-1][:-1]
        lines += ['];', 'Q.forEach(function (r) {',
                  "  var rec = { id: r[0], chapter: r[1], lesson: r[2], t: r[3], k: r[5], tag: r[4],",
                  "              q: r[6], why: r[9], hints: r[10], code: '' };",
                  "  if (r[5] === 'fill') rec.a = r[7];",
                  '  else { rec.c = r[7]; rec.a = r[8]; }',
                  '  CALC_QBANK[r[1]].push(rec);', '});', '})();', '']
        return '\n'.join(lines)


def shuffled_options(rng, correct, wrong):
    """Place the correct option at a rotating position.

    Templates naturally list the right answer first; leaving it there would
    make the whole generated bank guessable, so the position is chosen here.
    """
    opts = [correct] + list(wrong)
    assert len(opts) == 4, 'need exactly 3 distractors, got %d' % len(wrong)
    i = rng.randrange(4)
    opts[0], opts[i] = opts[i], opts[0]
    return opts, i


def rng_for(qid):
    """A generator seeded by id, so regenerating produces identical output."""
    return random.Random('cmon-calc-' + qid)


def accepted(*forms):
    """De-duplicate accepted fill answers the way the matcher compares them."""
    out, seen = [], set()
    for f in forms:
        f = str(f)
        key = ' '.join(f.split()).lower()
        if key and key not in seen:
            seen.add(key)
            out.append(f)
    return out


# ---------------------------------------------------------------------------
# Expression rendering for the integration chapters.
#
# sympy's own printer is close but not in the manual's dialect: it writes
# x**2, sqrt(x), log(x) and Abs(x) where the manual writes x-squared, a radical,
# ln and vertical bars. This converts, and superscripts small integer powers so
# an integrand reads the way it does on paper.
# ---------------------------------------------------------------------------
_FUNCS = [('asin', 'arcsin'), ('acos', 'arccos'), ('atan', 'arctan'),
          ('asec', 'arcsec'), ('log', 'ln'), ('sqrt', '__RAD__')]


def ex(e, var='x'):
    """Render a sympy expression in the Field Manual's plain-Unicode dialect."""
    s = sp.sstr(sp.simplify(e) if isinstance(e, sp.Basic) else e)
    for a, b in _FUNCS:
        s = re.sub(r'\b' + a + r'\(', b + '(', s)
    s = s.replace('__RAD__(', '\u221a(')
    s = s.replace('pi', '\u03c0')
    # Abs(...) becomes |...|, innermost first so nesting resolves cleanly
    while 'Abs(' in s:
        nxt = re.sub(r'Abs\(([^()]*)\)', lambda m: '|' + m.group(1) + '|', s)
        if nxt == s:
            break
        s = nxt
    s = s.replace('exp(', 'e^(')
    # small integer powers become superscripts; larger ones keep the caret
    s = re.sub(r'\*\*(\d)\b', lambda m: sup(m.group(1)), s)
    s = re.sub(r'\*\*\(([^()]*)\)', lambda m: '^(' + m.group(1) + ')', s)
    s = s.replace('**', '^')
    s = s.replace('*', '')
    s = re.sub('\u221a' + r'\((\d+)\)', lambda m: '\u221a' + m.group(1), s)
    return neg(s)


def integ(lo=None, hi=None):
    """The integral sign, with sub/superscript limits when they are given."""
    if lo is None:
        return '\u222b'
    return '\u222b' + str(lo) + '^' + str(hi)
