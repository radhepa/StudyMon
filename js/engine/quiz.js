/* Question selection with a Leitner spaced-repetition schedule.

   Every question you answer lives in a box 1..5. Getting it right promotes it
   and pushes its next appearance further away; getting it wrong knocks it back
   to box 1 so it returns almost immediately. "Time" is measured in questions
   answered (S.clock), not wall-clock time, so the schedule works the same
   whether you play for ten minutes or three hours. */

var LEITNER_GAP = { 1: 2, 2: 6, 3: 15, 4: 40, 5: 100 };
var LAST_CHOICE_POSITION = {};

/* Choice order belongs to a presentation, not to the question bank. Keeping
   the source indexes in the shuffled array means grading can still compare
   against q.a without rewriting questions or invalidating saved SRS data.
   The correct answer is also prevented from occupying the same slot on two
   consecutive appearances of the same question. */
function shuffledChoiceOrder(q) {
  var order = (q.c || []).map(function (_, i) { return i; });
  if (q.k === 'fill' || q.selfCheck || order.length < 2) return order;
  for (var i = order.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = order[i]; order[i] = order[j]; order[j] = tmp;
  }
  var position = order.indexOf(q.a);
  var last = LAST_CHOICE_POSITION[q.id];
  if (position === last) {
    var swapWith = (position + 1 + Math.floor(Math.random() * (order.length - 1))) % order.length;
    var hold = order[position]; order[position] = order[swapWith]; order[swapWith] = hold;
    position = swapWith;
  }
  LAST_CHOICE_POSITION[q.id] = position;
  return order;
}

function displayedChoiceOrder(holder, q) {
  if (!holder.choiceOrder || holder.choiceOrderQuestion !== q.id) {
    holder.choiceOrder = shuffledChoiceOrder(q);
    holder.choiceOrderQuestion = q.id;
  }
  return holder.choiceOrder;
}

function allQuestions() {
  var out = [];
  for (var ch in QBANK) out = out.concat(QBANK[ch]);
  return out;
}

function questionsFor(chapters) {
  var out = [];
  for (var i = 0; i < chapters.length; i++) {
    var b = QBANK[chapters[i]];
    if (b) out = out.concat(b);
  }
  return out;
}

function srsOf(qid) {
  return S.srs[qid] || null;
}

function isDue(qid) {
  var e = S.srs[qid];
  return !!e && e.due <= S.clock;
}

/* Pick one question. `chapters` is an array of chapter numbers, `tier` is 1-4.
   Priority: due-for-review at this tier, then never-seen, then least recently
   asked. Tier is widened if that tier is empty for the chapters in play. */
function pickQuestion(chapters, tier, excludeIds) {
  var pool = questionsFor(chapters);
  if (!pool.length) pool = allQuestions();
  var ex = excludeIds || {};

  var tiers = [tier, tier - 1, tier + 1, tier - 2, tier + 2, tier - 3, tier + 3];
  var band = null;
  for (var i = 0; i < tiers.length; i++) {
    var t = tiers[i];
    if (t < 1 || t > 4) continue;
    var c = pool.filter(function (q) { return q.t === t && !ex[q.id]; });
    if (c.length) { band = c; break; }
  }
  if (!band) band = pool.filter(function (q) { return !ex[q.id]; });
  if (!band.length) band = pool;

  var due = band.filter(function (q) { return isDue(q.id); });
  if (due.length && Math.random() < 0.65) return { q: tagDue(due), review: true };

  var fresh = band.filter(function (q) { return !S.srs[q.id]; });
  if (fresh.length) return { q: fresh[Math.floor(Math.random() * fresh.length)], review: false };

  if (due.length) return { q: tagDue(due), review: true };

  // everything is seen and nothing is due: take whatever is closest to due
  band = band.slice().sort(function (a, b) {
    return (S.srs[a.id] ? S.srs[a.id].due : 0) - (S.srs[b.id] ? S.srs[b.id].due : 0);
  });
  return { q: band[0], review: false };
}

function tagDue(due) {
  // among due questions, take the most overdue, breaking ties at random
  due = due.slice().sort(function (a, b) { return S.srs[a.id].due - S.srs[b.id].due; });
  var best = S.srs[due[0].id].due;
  var tied = due.filter(function (q) { return S.srs[q.id].due === best; });
  return tied[Math.floor(Math.random() * tied.length)];
}

/* Record an answer and reschedule. */
function recordAnswer(q, correct) {
  S.clock++;
  var e = S.srs[q.id];
  if (!e) e = S.srs[q.id] = { box: 1, due: 0, r: 0, w: 0 };

  if (correct) {
    e.r++;
    e.box = Math.min(5, e.box + 1);
    S.streak++;
    if (S.streak > S.bestStreak) S.bestStreak = S.streak;
    S.totals.r++;
  } else {
    e.w++;
    e.box = 1;
    S.streak = 0;
    S.totals.w++;
  }
  e.due = S.clock + LEITNER_GAP[e.box];

  var n = questionChapter(q);
  if (n) {
    if (!S.chapterStats[n]) S.chapterStats[n] = { r: 0, w: 0 };
    S.chapterStats[n][correct ? 'r' : 'w']++;
  }

  // a run of five correct answers is worth pocket money
  if (correct && S.streak > 0 && S.streak % 5 === 0) {
    addMoney(40 + S.streak * 2);
    return 'streak';
  }
  return null;
}

/* Loose matching for fill-in answers: case, spaces and trailing punctuation
   should never be the reason a right answer is marked wrong. */
function fillMatches(input, accepted, question) {
  // Output questions preserve case and punctuation. C-token questions also
  // preserve token boundaries, while allowing harmless formatting changes.
  var mode = question && question.match;
  if (mode === 'exact') return accepted.some(function (value) {
    return String(input).trim() === String(value).trim();
  });
  if (mode === 'tokens') {
    var tokens = function (value) {
      var text = String(value).trim().replace(/;$/, '');
      return JSON.stringify(text.match(/[A-Za-z_][A-Za-z_0-9]*|0[xX][0-9a-fA-F]+|[0-9]+|>>=|<<=|->|\+\+|--|&&|\|\||<<|>>|<=|>=|==|!=|[+*\/%&|^!-]=|[^\s]/g) || []);
    };
    return String(input).trim() !== '' && accepted.some(function (value) { return tokens(input) === tokens(value); });
  }
  var norm = function (s) {
    return String(s).toLowerCase()
      .replace(/[\s]+/g, ' ')
      .replace(/^[\s"'`]+|[\s"'`.,;!]+$/g, '')
      .trim();
  };
  var a = norm(input);
  if (!a) return false;
  for (var i = 0; i < accepted.length; i++) if (norm(accepted[i]) === a) return true;
  return false;
}

/* How many questions are waiting for review right now. */
function dueCount() {
  var n = 0;
  for (var id in S.srs) if (S.srs[id].due <= S.clock) n++;
  return n;
}

/* Chapters sorted worst-accuracy-first, for the weakness report. */
function weakChapters(minAnswered) {
  var out = [];
  for (var i = 0; i < CHAPTERS.length; i++) {
    var c = CHAPTERS[i];
    var st = S.chapterStats[c.n] || { r: 0, w: 0 };
    var tot = st.r + st.w;
    out.push({ ch: c, r: st.r, w: st.w, total: tot, pct: tot ? st.r / tot : -1 });
  }
  return out.filter(function (x) { return x.total >= (minAnswered || 0); })
    .sort(function (a, b) { return a.pct - b.pct; });
}

/* ---------------------------------------------------------------------------
   Hints. A question may carry up to three, ordered from a nudge to a near
   giveaway. They are rendered hidden and revealed in place rather than by
   re-rendering the card, because a re-render would wipe a half-typed fill-in
   answer and the disabled state of already-clicked choices.

   Hints cost nothing. The point of this game is to make someone reach for
   paper, and a learner who is stuck needs the next step, not a penalty.
   --------------------------------------------------------------------------- */
function questionHints(q) {
  return q && Array.isArray(q.hints) ? q.hints.filter(function (h) { return !!h; }).slice(0, 3) : [];
}

function hintBlockHtml(q) {
  var hs = questionHints(q);
  if (!hs.length) return '';
  var h = '<div class="hintwrap" data-hints="' + hs.length + '">' +
    '<button type="button" class="ghost hintbtn" id="hintbtn" onclick="revealHint()">' +
    'Need a hint? (' + hs.length + ')</button>';
  for (var i = 0; i < hs.length; i++) {
    /* A span, not a <b>: the parchment skin gives .note b a filled background,
       which would paint the label as a full-width bar. */
    h += '<div class="note hint" id="hint' + i + '" hidden>' +
      '<span class="hint-k">Hint ' + (i + 1) + ' of ' + hs.length + '</span>' + esc(hs[i]) + '</div>';
  }
  return h + '</div>';
}

function revealHint() {
  var wrap = document.querySelector('.hintwrap');
  if (!wrap) return;
  var total = Number(wrap.dataset.hints || 0), shown = 0, i;
  for (i = 0; i < total; i++) {
    var el = document.getElementById('hint' + i);
    if (el && el.hidden) { el.hidden = false; shown = i + 1; break; }
  }
  if (!shown) return;
  var left = total - shown;
  var btn = document.getElementById('hintbtn');
  if (btn) {
    if (left <= 0) btn.hidden = true;
    else btn.textContent = 'Another hint (' + left + ')';
  }
  /* In battle the fixed nav bar sits over the bottom of the card, so a hint
     revealed below the choices can open out of sight. Bring it into view. */
  var el = document.getElementById('hint' + (shown - 1));
  if (el && el.scrollIntoView) {
    try { el.scrollIntoView({ block: 'nearest' }); } catch (e) { el.scrollIntoView(); }
  }
}

/* Once the answer is in, every hint is worth reading. */
function showAllHints() {
  var wrap = document.querySelector('.hintwrap');
  if (!wrap) return;
  var total = Number(wrap.dataset.hints || 0);
  for (var i = 0; i < total; i++) {
    var el = document.getElementById('hint' + i);
    if (el) el.hidden = false;
  }
  var btn = document.getElementById('hintbtn');
  if (btn) btn.hidden = true;
}
