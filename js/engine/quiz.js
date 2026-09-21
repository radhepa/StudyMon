/* Question selection with a Leitner spaced-repetition schedule.

   Every question you answer lives in a box 1..5. Getting it right promotes it
   and pushes its next appearance further away; getting it wrong knocks it back
   to box 1 so it returns almost immediately. "Time" is measured in questions
   answered (S.clock), not wall-clock time, so the schedule works the same
   whether you play for ten minutes or three hours. */

var LEITNER_GAP = { 1: 2, 2: 6, 3: 15, 4: 40, 5: 100 };
var LAST_CHOICE_POSITION = {};

/* A subject can swap the Leitner boxes above for its own schedule by carrying a
   `review` block: how many answered questions until a right or a wrong one
   comes back, how much that is allowed to wobble, and how many right answers in
   a row retire a question. Calculus II does. The C region has no block, so
   every branch below that reads this falls straight through to the old boxes. */
function reviewPlan() {
  var def = subjectDef();
  return (def && def.review) || null;
}

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

/* `guestLessons` pulls in questions from the subject's exam-only chapters by
   lesson number. A wild battle on a route uses it to serve the lessons no quiz
   covers, which otherwise have no route of their own and only ever surface in
   an exam. */
function questionsFor(chapters, guestLessons) {
  var out = [];
  for (var i = 0; i < chapters.length; i++) {
    var b = QBANK[chapters[i]];
    if (b) out = out.concat(b);
  }
  if (guestLessons && guestLessons.length) {
    var extra = (subjectDef() || {}).EXAM_CHAPTERS || [];
    for (var e = 0; e < extra.length; e++) {
      var bank = QBANK[extra[e].n] || [];
      for (var j = 0; j < bank.length; j++) {
        if (guestLessons.indexOf(bank[j].lesson) >= 0) out.push(bank[j]);
      }
    }
  }
  return out;
}

/* The exam-only lessons parked on route n, or null. Set per subject in
   `wildGuests`; the C region has none. */
function wildGuestLessons(n) {
  var def = subjectDef();
  var guests = def && def.wildGuests && def.wildGuests[n];
  return guests && guests.length ? guests : null;
}

function srsOf(qid) {
  return S.srs[qid] || null;
}

/* Right answers in a row. Entries saved before the counter existed can be read
   back from the box: it climbs one per right answer and drops to 1 on a miss,
   so box - 1 is the current run. */
function correctRun(e) {
  return typeof e.run === 'number' ? e.run : Math.max(0, (e.box || 1) - 1);
}

/* Retired: right enough times in a row that the question stops being asked.
   Only a subject with a review plan retires anything, and an explicit flag
   (set on every answer, and cleared by unhideQuestions) beats the box-based
   guess used for entries that predate the flag. */
function isHidden(qid) {
  var plan = reviewPlan(), e = S.srs[qid];
  if (!plan || !e) return false;
  if (typeof e.hidden === 'boolean') return e.hidden;
  return correctRun(e) >= plan.retireAfter;
}

function isDue(qid) {
  var e = S.srs[qid];
  return !!e && e.due <= S.clock && !isHidden(qid);
}

/* Questions asked lately, by family, so the fresh pick moves on to a different
   kind of problem instead of serving ten variations of one in a row. A family
   is the set of variations of one problem type; a question with none is its
   own family. Lives for the session only. */
var RECENT_FAMILIES = [];
var RECENT_FAMILY_SPAN = 8;

function familyOf(q) { return q.family || q.id; }

function noteAsked(pick) {
  RECENT_FAMILIES.push(familyOf(pick.q));
  if (RECENT_FAMILIES.length > RECENT_FAMILY_SPAN) RECENT_FAMILIES.shift();
  return pick;
}

/* Choose a never-seen question by problem type first, then by variation. Picking
   straight from the list would hand a ten-variation family ten times the
   chance of a one-off question, and the point is to meet many kinds of problem,
   not many copies of a few. */
function freshByFamily(fresh) {
  var groups = {}, keys = [];
  fresh.forEach(function (q) {
    var k = familyOf(q);
    if (!groups[k]) { groups[k] = []; keys.push(k); }
    groups[k].push(q);
  });
  var away = keys.filter(function (k) { return RECENT_FAMILIES.indexOf(k) < 0; });
  var use = away.length ? away : keys;
  var group = groups[use[Math.floor(Math.random() * use.length)]];
  return group[Math.floor(Math.random() * group.length)];
}

/* The picker for a subject with a review plan. Never-seen questions get most of
   the traffic, because meeting a lot of different problems is the point; a
   review turns up once it has come due, and only some of the time, so it lands
   somewhere near its date rather than on it. */
function pickWithReviewPlan(pool, band, tier, ex, plan) {
  var open = pool.filter(function (q) { return !ex[q.id]; });

  /* A review may come from the tier asked for or one either side of it. Held to
     the exact tier, a due question would wait until the player happened to pick
     a move of that one power, and "about 25 questions later" would quietly turn
     into "whenever". */
  var due = open.filter(function (q) { return isDue(q.id) && Math.abs(q.t - tier) <= 1; });
  var dueHere = due.filter(function (q) { return q.t === tier; });   // the move's own tier goes first
  if (due.length && Math.random() < plan.dueChance) {
    return noteAsked({ q: tagDue(dueHere.length ? dueHere : due), review: true });
  }

  /* Never-seen questions, nearest tier first. When the tier asked for has run
     out of them the next tier over is used before anything is asked a second
     time early: a small tier (tier 1 holds about ten questions a route) would
     otherwise be recycled, and a recycled question is one that gets memorised. */
  var fresh = open.filter(function (q) { return !S.srs[q.id]; });
  for (var away = 0; away <= 2; away++) {
    var ring = fresh.filter(function (q) { return Math.abs(q.t - tier) === away; });
    if (ring.length) return noteAsked({ q: freshByFamily(ring), review: false });
  }

  // Nothing new close by: an overdue question at any tier beats an early repeat.
  var overdue = open.filter(function (q) { return isDue(q.id); });
  if (overdue.length) return noteAsked({ q: tagDue(dueHere.length ? dueHere : overdue), review: true });

  // everything is seen and nothing is due: take whatever is closest to due
  band = band.slice().sort(function (a, b) {
    return (S.srs[a.id] ? S.srs[a.id].due : 0) - (S.srs[b.id] ? S.srs[b.id].due : 0);
  });
  return noteAsked({ q: band[0], review: false });
}

/* Pick one question. `chapters` is an array of chapter numbers, `tier` is 1-4.
   Priority: due-for-review at this tier, then never-seen, then least recently
   asked. Tier is widened if that tier is empty for the chapters in play. A
   subject with a review plan takes the exposure-first path instead, and never
   draws a retired question. */
function pickQuestion(chapters, tier, excludeIds, guestLessons) {
  var plan = reviewPlan();
  var pool = questionsFor(chapters, guestLessons);
  if (!pool.length) pool = allQuestions();
  var ex = excludeIds || {};
  if (plan) {
    // If a pool were ever nothing but retired questions, ask them anyway rather
    // than leave the battle with nothing to draw.
    var live = pool.filter(function (q) { return !isHidden(q.id); });
    if (live.length) pool = live;
  }

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

  if (plan) return pickWithReviewPlan(pool, band, tier, ex, plan);

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

/* Questions until a question comes back under a review plan: the target for a
   right or a wrong answer, wobbled so the return is "around" that mark and not
   a number the player can count down to. */
function reviewGap(plan, correct) {
  var base = correct ? plan.right : plan.wrong;
  var wobble = plan.jitter || 0;
  return Math.max(1, Math.round(base * (1 - wobble + Math.random() * 2 * wobble)));
}

/* Record an answer and reschedule. */
function recordAnswer(q, correct) {
  S.clock++;
  S.activityClock = (Number(S.activityClock) || 0) + 1;
  var e = S.srs[q.id];
  if (!e) e = S.srs[q.id] = { box: 1, due: 0, r: 0, w: 0 };
  var plan = reviewPlan();
  var run = correctRun(e);   // read before the box moves

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
  if (plan) {
    e.run = correct ? run + 1 : 0;
    e.hidden = correct && e.run >= plan.retireAfter;
    e.due = S.clock + reviewGap(plan, correct);
  } else {
    e.due = S.clock + LEITNER_GAP[e.box];
  }

  var n = questionChapter(q);
  if (n) {
    if (!S.chapterStats[n]) S.chapterStats[n] = { r: 0, w: 0 };
    S.chapterStats[n][correct ? 'r' : 'w']++;
  }

  if (typeof journalAnswer === 'function') journalAnswer(q, correct);

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
  for (var id in S.srs) if (isDue(id)) n++;
  return n;
}

/* One line for the answer card when this very answer retired the question. */
function retiredNoteHtml(q) {
  var plan = reviewPlan(), e = S.srs[q.id];
  if (!plan || !e || e.hidden !== true) return '';
  return '<div class="small" style="margin-top:8px"><b>Hidden now.</b> ' + plan.retireAfter +
    ' right in a row, so this one is out of circulation.</div>';
}

/* Ids of every retired question in the active subject. */
function hiddenQuestions() {
  return Object.keys(S.srs).filter(isHidden);
}

/* Put retired questions back into circulation. `which` is 'all' (or nothing), a
   chapter number, one question id, or a list of ids. Each one restarts its run
   of right answers and is given a return date somewhere in the next couple of
   review gaps, so bringing back a few hundred does not flood the next battle.
   Call it while the subject that owns them is the active one. Returns how many
   came back. */
function unhideQuestions(which) {
  var plan = reviewPlan();
  if (!plan) return 0;
  var ids;
  if (which === undefined || which === 'all') ids = hiddenQuestions();
  else if (typeof which === 'number') ids = (QBANK[which] || []).map(function (q) { return q.id; });
  else ids = [].concat(which);
  var back = 0;
  ids.forEach(function (id) {
    var e = S.srs[id];
    if (!e || !isHidden(id)) return;
    e.hidden = false;
    e.run = 0;
    e.box = 1;
    e.due = S.clock + Math.floor(Math.random() * plan.right * 2);
    back++;
  });
  if (back) saveGame();
  return back;
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
