/* How a question reads, and how to take it somewhere else.

   1. Math that reads like math.

   The Calculus II bank is plain text written over many sessions in several
   styles at once: x^2 and x², sqrt(x) and √x, "∫ from 0 to 1 of" and ∫₀¹,
   integral_0^2, lim(b→∞), <= and ≤. Escaped as-is it is legible but tiring,
   and the things a calculus question most often asks you to read - a fraction,
   a power, a definite integral - are exactly what plain text does worst.

   mathHtml() turns that text into ordinary HTML that typesets it: raised
   powers, stacked fractions, a radical with a bar over what it covers, integral
   and sum signs with their limits where a textbook puts them, and a real minus
   sign. It never changes what a question says and needs no library, so the game
   still runs offline. Anything it does not recognise is escaped and shown
   exactly as written.

   Only Calculus II questions go through it (questionHtml decides by id). The C
   bank is code, where ^ is XOR, * is a pointer and a/b is integer division.

   2. A copy button on every question card, so a question you are stuck on can
   be pasted, choices and all, into Gemini or any other assistant. */

/* ---- which questions get typeset --------------------------------------- */

/* Calculus II ids all start k<chapter>- (k1-p-001, k3-fm-L07-P02, ...). C ids
   start with c, and nothing else in the game asks questions. */
function isCalcQuestion(q) {
  return !!(q && typeof q.id === 'string' && /^k\d/.test(q.id));
}

/* The one call every renderer makes for question text, choices, hints and
   explanations: typeset for Calculus II, escaped for everything else. */
function questionHtml(q, text) {
  if (text == null) return '';
  return isCalcQuestion(q) ? mathHtml(text) : esc(text);
}

/* ---- step 1: one spelling for everything -------------------------------

   Rewrites the ASCII and long-hand spellings into the Unicode ones the rest
   of the bank already uses, so the typesetter only has to know one form. */

var MATH_GREEK = { alpha: 'α', beta: 'β', rho: 'ρ', lambda: 'λ', phi: 'φ' };
var MATH_FUNCTION_WORD = /^(sin|cos|tan|sec|csc|cot|sinh|cosh|tanh|arcsin|arccos|arctan|log|exp|lim|max|min|sqrt|abs)$/i;

function mathNormalize(s) {
  s = s.replace(/\r\n?/g, '\n');

  // Greek spelled out. theta also turns up glued to a d or a digit (dtheta).
  s = s.replace(/theta/g, 'θ');
  s = s.replace(/(^|[^A-Za-z])(alpha|beta|rho|lambda|phi)(?![A-Za-z])/g,
    function (m, before, word) { return before + MATH_GREEK[word]; });
  s = s.replace(/(^|[^A-Za-z])pi(?![A-Za-z])/g, '$1π');

  s = s.replace(/\bintegral\s+(?=sqrt\s*\()/g, '∫ ');
  s = s.replace(/(^|[^A-Za-z])sqrt\s*\(/g, '$1√(');

  // Integrals and sums written out in words. The word forms need the whole
  // "from a to b of" shape, so prose like "the integral from 0 to 3 becomes"
  // is left alone.
  function bound(x) { return x.replace(/\binfinity\b/g, '∞'); }
  function limits(sym, m, a, b) {
    a = bound(a); b = bound(b);
    // A bound is a number or a short expression, never words: "from the first
    // term to the last of" is a sentence.
    if (/[A-Za-z]{2,}/.test(a.replace(/\b(ln|pi)\b/g, '')) || /[A-Za-z]{2,}/.test(b.replace(/\b(ln|pi)\b/g, ''))) return m;
    return sym + '_{' + a + '}^{' + b + '} ';
  }
  s = s.replace(/\bintegral\s*_/g, '∫_');
  s = s.replace(/(∫\s*|\bintegral\s+)from\s+(\S[^\n]{0,24}?)\s+to\s+(\S[^\n]{0,24}?)\s+of\s+/g,
    function (m, op, a, b) { return limits('∫', m, a, b); });
  s = s.replace(/([Σ∑]\s*|\bsum\s+)from\s+(\S[^\n]{0,16}?)\s+to\s+(\S[^\n]{0,12}?)\s+of\s+/g,
    function (m, op, a, b) { return limits('Σ', m, a, b); });
  s = s.replace(/[Σ∑]\s*from\s+(\S[^\n]{0,16}?)\s+of\s+/g, 'Σ_{$1} ');
  s = s.replace(/[Σ∑]\s*\(\s*([A-Za-z]\s*=\s*[^()\s]+)\s+to\s+([^()\n]+?)\s*\)\s*/g, 'Σ_{$1}^{$2} ');
  s = s.replace(/[Σ∑]\s*\(\s*([A-Za-z]\s*=\s*[^()\s]+)\s*\)\s*/g, 'Σ_{$1} ');

  // lim(b→∞) is a limit under the word, not an argument to it.
  s = s.replace(/\blim\s*\(\s*([^()\n]*?→[^()\n]*?)\s*\)/g, 'lim_{$1}');

  s = s.replace(/<=/g, '≤').replace(/>=/g, '≥').replace(/!=/g, '≠').replace(/->/g, '→');

  // <3, 4> is a vector. A bracket hugging its contents with a comma inside is
  // never a pair of inequalities, which always have spaces round them here.
  s = s.replace(/<([^<>\s][^<>\n]{0,40}?[^<>\s])>/g, function (m, inner) {
    return /,/.test(inner) && /^[-−\w\s.,/√²³π+()·*^]+$/.test(inner) ? '⟨' + inner + '⟩' : m;
  });

  s = s.replace(/\*/g, '·');

  // A hyphen is a minus sign unless it joins two words (x-axis, p-series).
  s = s.replace(/(^|[\s(\[{,=+·/^_<>⟨|:;≤≥→])-(?=[\w(√π∞|⟨.\[θ])/g, '$1−');
  s = s.replace(/ - /g, ' − ');
  // A word joined to a number or a single letter is a hyphen too (degree-3,
  // order-4, degree-n), not "degree minus 3". The non-breaking hyphen keeps
  // the pair on one line and out of the next rule; function names (sin-1)
  // still get a minus.
  s = s.replace(/(^|[^A-Za-z])([A-Za-z]{3,})-(?=\d|[A-Za-z](?![A-Za-z]))/g, function (m, before, word) {
    return MATH_FUNCTION_WORD.test(word) ? m : before + word + '\u2011';
  });
  s = s.replace(/([\w)\]⁰¹²³⁴⁵⁶⁷⁸⁹ⁿ₀₁₂₃₄₅₆₇₈₉|!′'])-(?=\d|\(|√|π|θ|[A-Za-z](?![A-Za-z]))/g, '$1−');
  return s;
}

/* ---- step 2: typeset ---------------------------------------------------- */

var MATH_SUB = {
  '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9',
  '₊': '+', '₋': '−', '₌': '=', '₍': '(', '₎': ')', 'ₐ': 'a', 'ₑ': 'e', 'ₒ': 'o', 'ₓ': 'x', 'ₕ': 'h',
  'ₖ': 'k', 'ₗ': 'l', 'ₘ': 'm', 'ₙ': 'n', 'ₚ': 'p', 'ₛ': 's', 'ₜ': 't', 'ᵢ': 'i', 'ⱼ': 'j', 'ᵣ': 'r',
  'ᵤ': 'u', 'ᵥ': 'v'
};
var MATH_SUP = {
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
  '⁺': '+', '⁻': '−', '⁼': '=', '⁽': '(', '⁾': ')', 'ⁿ': 'n', 'ⁱ': 'i', 'ᵃ': 'a', 'ᵇ': 'b', 'ᶜ': 'c',
  'ᵈ': 'd', 'ᵉ': 'e', 'ᶠ': 'f', 'ᵍ': 'g', 'ʰ': 'h', 'ʲ': 'j', 'ᵏ': 'k', 'ˡ': 'l', 'ᵐ': 'm', 'ᵒ': 'o',
  'ᵖ': 'p', 'ʳ': 'r', 'ˢ': 's', 'ᵗ': 't', 'ᵘ': 'u', 'ᵛ': 'v', 'ʷ': 'w', 'ˣ': 'x', 'ʸ': 'y', 'ᶻ': 'z'
};

/* Names that are functions, set upright and allowed to sit in a fraction. */
var MATH_FUNCS = { sin: 1, cos: 1, tan: 1, sec: 1, csc: 1, cot: 1, arcsin: 1, arccos: 1, arctan: 1,
  sinh: 1, cosh: 1, tanh: 1, ln: 1, log: 1, exp: 1, lim: 1 };

/* Two-letter runs are usually a product or a differential (xy, dx, dθ). These
   are the ones that are English or a unit instead, and so never a fraction's
   top or bottom: "and/or", "kg/m", "lb/ft". */
var MATH_NOT_ATOMS = { an: 1, as: 1, at: 1, be: 1, by: 1, do: 1, go: 1, he: 1, if: 1, in: 1, is: 1,
  it: 1, me: 1, my: 1, no: 1, of: 1, on: 1, or: 1, so: 1, to: 1, up: 1, us: 1, we: 1,
  kg: 1, lb: 1, ft: 1, km: 1, cm: 1, mm: 1, mi: 1, hr: 1, ml: 1 };

function mathIsLetter(c) { return /[A-Za-zα-ωΑ-Ωϕ]/.test(c); }

function mathHtml(text) {
  if (text == null) return '';
  var s = mathNormalize(String(text));
  return mathNodesHtml(mathParse(s, 0, s.length, false));
}

function mathNodesHtml(nodes) {
  return nodes.map(function (n) { return n.h; }).join('');
}

/* The index of the bracket that closes the one at i, or -1. */
function mathMatch(s, i, end, open, close) {
  var depth = 0;
  for (var j = i; j < end; j++) {
    if (s[j] === open) depth++;
    else if (s[j] === close && --depth === 0) return j;
  }
  return -1;
}

/* What follows a ^ or a _ : a braced or bracketed group, or one token. A
   subscript may be a whole word (r_outer); a superscript is one letter (x^n),
   since a power is never spelled out. Returns { h, next } or null. */
function mathScript(s, i, end, isSub) {
  var c = s[i], j;
  if (c === '{' || c === '(') {
    j = mathMatch(s, i, end, c, c === '{' ? '}' : ')');
    if (j < 0) return null;
    return { h: mathNodesHtml(mathParse(s, i + 1, j, true)), next: j + 1 };
  }
  j = i;
  if (s[j] === '−' || s[j] === '+') j++;
  if (/[\d.]/.test(s[j] || '')) {
    while (j < end && /[\d.]/.test(s[j])) j++;
    if (s[j - 1] === '.') j--;
  } else if (s[j] === '∞') {
    j++;
  } else if (mathIsLetter(s[j] || '')) {
    j++;
    if (isSub) while (j < end && mathIsLetter(s[j])) j++;
  } else {
    return null;
  }
  return { h: esc(s.slice(i, j)), next: j };
}

/* Limits written straight after ∫, Σ or an evaluation bracket: _a^b, _{a}^{b},
   or Unicode runs like ₀² and ₐᵇ. Returns { lo, hi, next }. */
function mathLimits(s, i, end) {
  var out = { lo: null, hi: null, next: i }, guard = 0;
  while (guard++ < 2 && out.next < end) {
    var c = s[out.next], j = out.next, r = '';
    if (c === '_' && out.lo == null) {
      var lo = mathScript(s, j + 1, end, true);
      if (!lo) break;
      out.lo = lo.h; out.next = lo.next;
    } else if (c === '^' && out.hi == null) {
      var hi = mathScript(s, j + 1, end, false);
      if (!hi) break;
      out.hi = hi.h; out.next = hi.next;
    } else if (MATH_SUB[c] && out.lo == null) {
      while (j < end && MATH_SUB[s[j]]) r += MATH_SUB[s[j++]];
      out.lo = esc(r); out.next = j;
    } else if (MATH_SUP[c] && out.hi == null) {
      while (j < end && MATH_SUP[s[j]]) r += MATH_SUP[s[j++]];
      out.hi = esc(r); out.next = j;
    } else {
      break;
    }
  }
  return out;
}

/* ∞ is a small glyph in most text fonts, and a limit is already set small. */
function mathInf(h) { return h == null ? h : h.replace(/∞/g, '<span class="minf">∞</span>'); }

/* Upper and lower limits stacked at the right, as on ∫ and [F(x)]. */
function mathSideLimits(lo, hi) {
  lo = mathInf(lo); hi = mathInf(hi);
  return '<span class="ml"><span class="ml-u">' + (hi == null ? '' : hi) + '</span>' +
    '<span class="ml-d">' + (lo == null ? '' : lo) + '</span></span>';
}

/* Limits stacked over and under, as on Σ and lim. */
function mathOverUnder(sym, lo, hi, cls) {
  lo = mathInf(lo); hi = mathInf(hi);
  return '<span class="ms' + (cls ? ' ' + cls : '') + '">' +
    (hi != null ? '<span class="ms-u">' + hi + '</span>' : '') +
    '<span class="ms-s">' + sym + '</span>' +
    (lo != null ? '<span class="ms-d">' + lo + '</span>' : '') + '</span>';
}

/* Inside limits there is no room for spaces round an equals sign. */
function mathTight(h) { return h == null ? h : h.replace(/\s*=\s*/g, '='); }

/* Text to a list of nodes { h: html, a: atomic, k: kind }. Atomic nodes sit
   shoulder to shoulder in a term like 2x², (n + 1) or |v|; a fraction takes
   the unbroken run of atomic nodes on each side of its slash. Inside a script
   (`small`) there are no stacked fractions - they would be unreadably tiny. */
function mathParse(s, start, end, small) {
  var nodes = [], i = start, c, j, r;
  function push(h, a, k, extra) {
    var n = { h: h, a: a, k: k };
    if (extra) for (var key in extra) n[key] = extra[key];
    nodes.push(n);
  }
  /* ∫, Σ and lim should not end a line apart from what they apply to; mark
     them and let mathGlue join them up once the fractions are built. */
  function glue(next) {
    nodes[nodes.length - 1].glue = true;
    return next;
  }
  while (i < end) {
    c = s[i];

    if (/\s/.test(c)) {
      j = i; r = '';
      while (j < end && /\s/.test(s[j])) { r += s[j] === '\n' ? '<br>' : ''; j++; }
      // A long expression wraps after an operator, never before one, so a
      // line never starts with a stranded "− 4". The space stays a real space.
      if (!r && j < end && /[−+=·×≤≥<>→]/.test(s[j])) {
        push('<span class="mnb"> ' + esc(s[j]) + '</span>', false, 'txt');
        i = j + 1; continue;
      }
      push(r || ' ', false, 'sp');
      i = j; continue;
    }

    if (/\d/.test(c) || (c === '.' && /\d/.test(s[i + 1] || '') && !(nodes.length && nodes[nodes.length - 1].k === 'num'))) {
      j = i;
      while (j < end && /\d/.test(s[j])) j++;
      if (s[j] === '.' && /\d/.test(s[j + 1] || '')) { j++; while (j < end && /\d/.test(s[j])) j++; }
      if (j === i) j = i + 1;
      push(esc(s.slice(i, j)), true, 'num');
      i = j; continue;
    }

    if (c === 'Σ' || c === '∑' || c === '∏') {
      var sl = mathLimits(s, i + 1, end);
      if (sl.lo != null || sl.hi != null) push(mathOverUnder(c === '∏' ? '∏' : 'Σ', mathTight(sl.lo), mathTight(sl.hi)), false, 'big');
      else push('<span class="ms-bare">' + c + '</span>', false, 'big');
      i = glue(sl.next); continue;
    }

    if (mathIsLetter(c)) {
      j = i;
      while (j < end && mathIsLetter(s[j])) j++;
      var word = s.slice(i, j);
      if (word === 'lim' && s[j] === '_') {
        var under = mathScript(s, j + 1, end, true);
        if (under) { push(mathOverUnder('lim', under.h, null, 'ms-lim'), false, 'big'); i = glue(under.next); continue; }
      }
      if (MATH_FUNCS[word]) push(esc(word), true, 'fn');
      else if (word.length === 1) push(esc(word), true, 'var');
      else if (word.length === 2 && !MATH_NOT_ATOMS[word.toLowerCase()]) push(esc(word), true, 'var');
      else push(esc(word), false, 'word');
      i = j; continue;
    }

    if (c === '^' || c === '_') {
      var sc = mathScript(s, i + 1, end, c === '_');
      if (sc) {
        push('<' + (c === '^' ? 'sup' : 'sub') + ' class="mx">' + sc.h + '</' + (c === '^' ? 'sup' : 'sub') + '>', true, 'script');
        i = sc.next; continue;
      }
      push(esc(c), false, 'txt'); i++; continue;
    }

    if (c === '√') {
      if (s[i + 1] === '(') {
        j = mathMatch(s, i + 1, end, '(', ')');
        if (j > 0) {
          push('<span class="mr">√<span class="mr-b">' + mathNodesHtml(mathParse(s, i + 2, j, small)) + '</span></span>', true, 'rad');
          i = j + 1; continue;
        }
      } else {
        j = i + 1;
        if (/\d/.test(s[j] || '')) { while (j < end && /[\d.]/.test(s[j])) j++; if (s[j - 1] === '.') j--; }
        else if (mathIsLetter(s[j] || '')) j++;
        if (j > i + 1) {
          push('<span class="mr">√<span class="mr-b">' + esc(s.slice(i + 1, j)) + '</span></span>', true, 'rad');
          i = j; continue;
        }
      }
      push('√', true, 'txt'); i++; continue;
    }

    if (c === '(' || c === '[' || c === '{') {
      var close = c === '(' ? ')' : c === '[' ? ']' : '}';
      j = mathMatch(s, i, end, c, close);
      if (j > 0) {
        var inner = mathNodesHtml(mathParse(s, i + 1, j, small));
        var h = esc(c) + inner + esc(close), next = j + 1;
        if (c === '[') {
          // [F(x)]₀² - an evaluation bar. It needs a lower limit; a lone ² is a square.
          var ev = mathLimits(s, next, end);
          if (ev.lo != null) { h += mathSideLimits(mathTight(ev.lo), mathTight(ev.hi)); next = ev.next; }
        }
        push(h, true, 'grp', { open: c, inner: inner });
        i = next; continue;
      }
      push(esc(c), false, 'txt'); i++; continue;
    }

    if (c === '|') {
      j = s.indexOf('|', i + 1);
      if (j > i + 1 && j < end && j - i <= 41 && s.slice(i + 1, j).indexOf('\n') < 0) {
        push('|' + mathNodesHtml(mathParse(s, i + 1, j, small)) + '|', true, 'grp', { open: '|' });
        i = j + 1; continue;
      }
      push('|', false, 'txt'); i++; continue;
    }

    if (c === '∫' || c === '∬' || c === '∮') {
      var lim = mathLimits(s, i + 1, end);
      push('<span class="mi"><span class="mi-s">' + c + '</span>' +
        (lim.lo != null || lim.hi != null ? mathSideLimits(mathTight(lim.lo), mathTight(lim.hi)) : '') +
        '</span>', false, 'big');
      i = glue(lim.next); continue;
    }

    if (c === '/') { push('/', false, 'slash'); i++; continue; }

    if (MATH_SUP[c] || MATH_SUB[c] || /[∞½⅓¼¾⅔′'!°]/.test(c) || c === '̄' || c === '̅') {
      push(esc(c), true, 'txt'); i++; continue;
    }

    push(esc(c), false, 'txt'); i++;
  }
  return mathGlue(small ? nodes : mathFractions(nodes));
}

/* Keep a marked operator on the same line as the term after it - unless that
   term is long, when holding it together would push past the card's edge. */
function mathGlue(nodes) {
  for (var i = 0; i < nodes.length - 2; i++) {
    if (!nodes[i].glue || nodes[i + 1].k !== 'sp' || nodes[i + 1].h !== ' ') continue;
    var next = nodes[i + 2];
    if (next.k === 'sp' || next.h.replace(/<[^>]*>/g, '').length > 24) continue;
    nodes.splice(i, 3, { h: '<span class="mnb">' + nodes[i].h + ' ' + next.h + '</span>', a: false, k: 'big' });
  }
  return nodes;
}

/* a/b to a stacked fraction, wherever both sides are an unbroken term. */
function mathFractions(nodes) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].k !== 'slash') continue;
    var a = i, b = i + 1;
    while (a > 0 && nodes[a - 1].a) a--;
    while (b < nodes.length && nodes[b].a) b++;
    if (a === i || b === i + 1) continue;
    var top = nodes.slice(a, i), bottom = nodes.slice(i + 1, b);
    var frac = {
      h: '<span class="mf"><span class="mf-n">' + mathFracPart(top) + '</span>' +
        '<span class="mf-d">' + mathFracPart(bottom) + '</span></span>',
      a: true, k: 'frac'
    };
    nodes.splice(a, b - a, frac);
    i = a;
  }
  return nodes;
}

/* One side of a fraction. A single bracketed group loses its brackets - the
   bar already groups it, which is the whole point of stacking. */
function mathFracPart(part) {
  if (part.length === 1 && part[0].k === 'grp' && part[0].open === '(') return part[0].inner;
  return mathNodesHtml(part);
}

/* ---- copy the question --------------------------------------------------

   Plain text, the way you would type it to a tutor: what topic it is, the
   question, any code, and the choices lettered in the order they are on
   screen. The source text is copied rather than the typeset version, because
   x^2 and sqrt(x) are exactly what an assistant reads best. */

function questionCopyButton(where) {
  return '<button type="button" class="qcopy" id="qcopy-' + where + '" onclick="copyQuestion(\'' + where + '\')" ' +
    'title="Copy the question and its choices, to paste into Gemini or another assistant" ' +
    'aria-label="Copy question and choices">' +
    '<span class="qcopy-ico" aria-hidden="true">⧉</span><span class="qcopy-txt">Copy</span></button>';
}

function questionTopicLine(q) {
  var calc = isCalcQuestion(q);
  var subject = calc ? 'Calculus II' : 'C programming';
  if (calc && q.lesson && window.CALC_LESSONS && CALC_LESSONS[q.lesson]) {
    return subject + ' · Lesson ' + q.lesson + ': ' + CALC_LESSONS[q.lesson];
  }
  var ch = typeof questionChapter === 'function' ? questionChapter(q) : q.chapter;
  var title = typeof chapterTitle === 'function' ? chapterTitle(ch) : '';
  return subject + (ch ? ' · Chapter ' + ch + (title ? ': ' + title : '') : '');
}

function questionPlainText(q, order) {
  var lines = [questionTopicLine(q), '', String(q.q || '').trim()];
  if (q.code) lines.push('', String(q.code).replace(/\s+$/, ''));
  lines.push('');
  if (q.selfCheck) {
    lines.push('(Free response - work it out in full.)');
  } else if (q.k === 'fill') {
    lines.push('(Type-in answer - there are no choices.)');
  } else {
    var letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    var ord = order && order.length ? order : (q.c || []).map(function (x, i) { return i; });
    ord.forEach(function (src, i) { lines.push(letters[i] + ') ' + q.c[src]); });
  }
  return lines.join('\n');
}

function copyQuestion(where) {
  var holder = where === 'drill' ? (typeof D !== 'undefined' ? D : null) : (typeof B !== 'undefined' ? B : null);
  var q = holder && holder.q;
  if (!q) return;
  var order = (q.k !== 'fill' && !q.selfCheck && typeof displayedChoiceOrder === 'function')
    ? displayedChoiceOrder(holder, q) : null;
  var text = questionPlainText(q, order);
  var btn = document.getElementById('qcopy-' + where);
  copyTextToClipboard(text, function (ok) {
    if (!ok) { toast('Could not reach the clipboard. Select the question text instead.'); return; }
    toast('Question copied. Paste it into Gemini or any assistant.');
    if (!btn) return;
    btn.classList.add('done');
    var label = btn.querySelector('.qcopy-txt');
    if (label) label.textContent = 'Copied';
    clearTimeout(btn._qcopyT);
    btn._qcopyT = setTimeout(function () {
      btn.classList.remove('done');
      if (label) label.textContent = 'Copy';
    }, 1800);
  });
}

/* The async clipboard needs a secure context (localhost counts; file:// may
   not), so fall back to the old select-and-copy route when it is missing. */
function copyTextToClipboard(text, done) {
  function legacy() {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed'; ta.style.top = '-1000px'; ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    done(ok);
  }
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(function () { done(true); }, legacy);
  } else {
    legacy();
  }
}
