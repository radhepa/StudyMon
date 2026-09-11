function battleLater(fn, ms) { var owner=B; return setTimeout(function(){if(B===owner && owner && !owner.over) fn();},ms); }
/* Turn-based battle where every attack is paid for with a C question.

   Pick a move -> the game asks a question whose difficulty matches the move's
   power. Answer correctly and the move lands; answer wrong and it fizzles and
   the opponent hits you harder. Stronger moves therefore mean harder questions,
   which is the whole point. */

var B = null;   // live battle

function startBattle(cfg) {
  // cfg: { kind:'wild'|'gym'|'elite', chapters:[n], foes:[mon], title, leader, chapter, elite }
  var you = firstAlive();
  if (!you) { toast('Your whole party has fainted!'); return; }

  B = {
    kind: cfg.kind,
    friendId: cfg.friendId || null,
    npcId: cfg.npcId || null,
    npcPay: cfg.npcPay || 0,
    ballKey: 'poke',
    friendEligible: !!cfg.friendEligible,
    friendRewarded: false,
    chapters: cfg.chapters,
    foes: cfg.foes,
    foeIx: 0,
    you: you,
    title: cfg.title,
    leader: cfg.leader || null,
    chapter: cfg.chapter || null,
    elite: cfg.elite || null,
    over: false,
    asked: {},
    turn: 0,
    correctThisBattle: 0,
    wrongThisBattle: 0,
    correctRun: 0,
    pendingMove: null,
    q: null,
    timer: null,
    caught: false
  };
  S.totals.battles++;
  markSeen(foe().id);
  saveGame();
  showScreen('battle');
  renderBattle();
  log(cfg.kind === 'wild'
    ? (foe().shiny
        ? '<span class="good">✦ The colours are all wrong... a SHINY ' + monName(foe()).toUpperCase() + ' appeared! ✦</span>'
        : foe().isLegendary
        ? '<span class="good">A rare visitor! ' + monName(foe()).toUpperCase() + ' appeared!</span>'
        : 'A wild ' + monName(foe()).toUpperCase() + ' appeared!')
    : (B.leader ? B.leader + ' sent out ' + monName(foe()).toUpperCase() + '!'
      : monName(foe()).toUpperCase() + ' wants to battle!'));
  playCry(foe().id);
  if (cfg.kind === 'wild' && foe().shiny) toast('✦ A shiny! Roughly one in a thousand. Do not let it get away.');
  showMoveMenu();
}

function foe() { return B.foes[B.foeIx]; }

function markSeen(id) { S.seen[id] = true; }

/* ---- move menu ---------------------------------------------------------- */

function showMoveMenu() {
  if (B.over) return;
  var you = B.you, f = foe();
  var moves = movesOf(you);
  var h = '<div class="moves">';
  for (var i = 0; i < moves.length; i++) {
    var mv = moves[i];
    var eff = effectiveness(mv.type, dexOf(f.id).types);
    var hint = eff === 0 ? 'no effect' : eff >= 2 ? 'super effective' : eff <= 0.5 ? 'resisted' : '';
    h += '<button class="move" ' + (mv.locked ? 'disabled' : 'onclick="chooseMove(' + i + ')"') + '>' +
      '<div class="mv-top"><span>' + mv.label + '</span>' +
      '<span class="tp ' + mv.type + '">' + mv.type + '</span></div>' +
      '<div class="mv-bot"><span class="stars">' + '★'.repeat(mv.tier) + '☆'.repeat(4 - mv.tier) +
      ' tier ' + mv.tier + '</span><span>' +
      (mv.locked ? 'learns at Lv ' + mv.need : 'pow ' + mv.power + (hint ? ' · ' + hint : '')) +
      '</span></div></button>';
  }
  h += '</div><div class="row" style="margin-top:8px">';
  if (B.kind === 'wild') {
    h += '<button class="ghost grow" onclick="openBallMenu()">● Throw a ball</button>';
  }
  h += '<button class="ghost grow" onclick="openPotionMenu()">✚ Potions (' +
       (itemCount('potion') + itemCount('superpotion')) + ')</button>';
  h += '<button class="ghost grow" onclick="openSwitch()">⇄ Switch</button>';
  if (B.kind === 'wild') h += '<button class="ghost grow" onclick="runAway()">→ Run</button>';
  h += '</div>';
  $('#quiz').innerHTML = h;
}

function chooseMove(i) {
  if (B.over) return;
  var mv = movesOf(B.you)[i];
  if (!mv || mv.locked) return;
  B.pendingMove = mv;
  askQuestion(B.pendingMove.tier);
}

/* ---- the question ------------------------------------------------------- */

function askQuestion(tier) {
  B.turnResolving = false;
  var got = pickQuestion(B.chapters, tier, B.asked);
  B.qAnswered = false;
  B.q = got.q;
  B.qReview = got.review;
  B.choiceOrder = null;
  B.choiceOrderQuestion = null;
  B.asked[got.q.id] = true;
  B.qStart = Date.now();
  renderQuestion();
}

function renderQuestion() {
  var q = B.q;
  var chNum = questionChapter(q);
  var ch = chapterByNumber(chNum);
  var h = '<div class="qcard">';
  h += '<div class="qhead">';
  h += '<span class="qtag">' + (q.tag || 'Question') + '</span>';
  if (B.qReview) h += '<span class="qtag srs">Review</span>';
  h += '<span>Ch ' + chNum + ' · ' + esc(chapterTitle(chNum)) + '</span>';
  h += '<span class="spacer"></span><span>' + B.pendingMove.label + ' · tier ' + q.t + '</span>';
  h += '</div>';

  if (S.settings.timer) h += '<div class="timerbar"><div class="timerfill" id="tfill" style="width:100%"></div></div>';

  h += '<div class="qtext">' + esc(q.q) + '</div>';
  if (q.code) h += '<pre class="qcode">' + esc(q.code) + '</pre>';

  if (q.selfCheck) {
    h += '<div class="selfcheck">' +
      '<button class="primary" id="revealself" onclick="revealSelfCheck()">Reveal worked solution</button>' +
      '<div id="selfsolution" hidden><div class="why"><b>Worked solution</b>' + esc(q.why) + '</div>' +
      '<div class="note">Compare your complete work, not just the last line. How did you do?</div>' +
      '<div class="choices">' +
      '<button class="choice" id="ch0" onclick="answer(0)"><span class="k">✓</span><span>I got it</span></button>' +
      '<button class="choice" id="ch1" onclick="answer(1)"><span class="k">↺</span><span>I need to review it</span></button>' +
      '</div></div></div>';
  } else if (q.k === 'fill') {
    h += '<div class="fillwrap"><input id="fillin" autocomplete="off" spellcheck="false" placeholder="type your answer">' +
      '<button class="primary" onclick="submitFill()">Attack</button></div>';
  } else {
    h += '<div class="choices">';
    var letters = ['A', 'B', 'C', 'D', 'E'];
    var choiceOrder = displayedChoiceOrder(B, q);
    for (var i = 0; i < choiceOrder.length; i++) {
      var sourceIndex = choiceOrder[i];
      h += '<button class="choice" id="ch' + sourceIndex + '" onclick="answer(' + sourceIndex + ')">' +
        '<span class="k">' + letters[i] + '</span><span>' + esc(q.c[sourceIndex]) + '</span></button>';
    }
    h += '</div>';
  }
  h += hintBlockHtml(q);
  h += '</div>';
  $('#quiz').innerHTML = h;

  var fi = $('#fillin');
  if (fi) {
    fi.focus();
    fi.onkeydown = function (e) { if (e.key === 'Enter') submitFill(); };
  }
  startTimer();
}

function revealSelfCheck() {
  if (!B.q || !B.q.selfCheck || B.qAnswered) return;
  clearInterval(B.timer);
  var button = $('#revealself');
  var solution = $('#selfsolution');
  if (button) button.hidden = true;
  if (solution) solution.hidden = false;
  showAllHints();
  var gotIt = $('#ch0');
  if (gotIt) gotIt.focus();
}

function startTimer() {
  clearInterval(B.timer);
  if (!S.settings.timer) return;
  var total = S.settings.seconds * 1000;
  B.timer = setInterval(function () {
    var left = total - (Date.now() - B.qStart);
    var f = $('#tfill');
    if (!f) { clearInterval(B.timer); return; }
    var pct = Math.max(0, left / total * 100);
    f.style.width = pct + '%';
    f.style.background = pct < 25 ? 'var(--red)' : pct < 55 ? 'var(--amber)' : 'var(--accent-2)';
    if (left <= 0) { clearInterval(B.timer); answer(-1); }
  }, 100);
}

function submitFill() {
  var el = $('#fillin');
  if (!el) return;
  answer(el.value, true);
}

function answer(choice, isFill) {
  if (!B.q || B.over || B.qAnswered) return;
  B.qAnswered = true;
  clearInterval(B.timer);
  var q = B.q;
  var timedOut = (choice === -1);
  var correct;
  if (timedOut) correct = false;
  else if (q.k === 'fill') correct = fillMatches(choice, q.a, q);
  else correct = (choice === q.a);

  var seconds = (Date.now() - B.qStart) / 1000;
  var fast = correct && S.settings.timer && seconds <= S.settings.seconds * 0.35;

  var gotBall = recordAnswer(q, correct);
  if (correct) { B.correctThisBattle++; B.correctRun++; }
  else { B.wrongThisBattle++; B.correctRun = 0; }

  // mark up the choices
  if (q.k !== 'fill') {
    for (var i = 0; i < q.c.length; i++) {
      var el = $('#ch' + i);
      if (!el) continue;
      el.disabled = true;
      if (i === q.a) el.classList.add('right');
      else if (!isFill && i === choice) el.classList.add('wrong');
    }
  } else {
    var fi = $('#fillin');
    if (fi) { fi.disabled = true; fi.classList.add(correct ? 'right' : 'wrong'); }
  }

  var card = $('#quiz .qcard');
  var w = document.createElement('div');
  w.className = 'why' + (correct ? '' : ' bad');
  var head = timedOut ? 'Out of time!' : q.selfCheck ? (correct ? 'Marked correct.' : 'Queued for review.')
    : correct ? (fast ? 'Correct - and fast!' : 'Correct!') : 'Not quite.';
  var ansTxt = q.k === 'fill' ? q.a[0] : q.c[q.a];
  w.innerHTML = '<b>' + head + '</b>' +
    (correct || q.selfCheck ? '' : '<div style="margin-bottom:6px"><strong>Answer:</strong> ' + esc(ansTxt) + '</div>') +
    (q.selfCheck && !timedOut ? '' : esc(q.why));
  card.appendChild(w);
  // a hint you did not need is still worth reading once the answer is in
  showAllHints();

  var next = document.createElement('div');
  next.className = 'row';
  next.style.marginTop = '12px';
  next.innerHTML = '<button class="primary grow" id="contbtn" onclick="resolveTurn(' + correct + ',' + fast + ')">Continue ▶</button>';
  card.appendChild(next);
  var cb = $('#contbtn'); if (cb) cb.focus();

  if (gotBall === 'streak') toast('Streak of ' + S.streak + '! Prize money ₵' + (40 + S.streak * 2) + '.');
  saveGame();
}

/* ---- resolving the turn -------------------------------------------------- */

function resolveTurn(correct, fast) {
  if (!B || B.over || B.turnResolving) return;
  B.turnResolving = true;
  if (B.catching) { B.catching = false; resolveCatch(correct); return; }
  B.turn++;
  var you = B.you, f = foe(), mv = B.pendingMove;
  $('#quiz').innerHTML = '';

  if (correct) {
    var bonus = 1;
    if (fast) bonus *= 1.3;
    if (S.streak >= 10) bonus *= 1.2;
    else if (S.streak >= 5) bonus *= 1.1;
    var r = damageOf(you, f, mv, bonus);
    f.hp = Math.max(0, f.hp - r.dmg);
    var line = monName(you).toUpperCase() + ' used ' + mv.label.toUpperCase() + '!';
    if (r.eff === 0) line += ' <span class="hit">' + effLabel(0) + '</span>';
    else {
      line += ' <span class="good">' + r.dmg + ' damage.</span>';
      var el = effLabel(r.eff); if (el) line += ' ' + el;
      if (fast) line += ' <span class="good">Quick-thinking bonus!</span>';
      if (S.streak >= 5) line += ' <span class="good">Streak x' + S.streak + '!</span>';
    }
    log(line);
    hitAnim('#foeimg');
  } else {
    log('<span class="hit">' + monName(you).toUpperCase() + ' hesitated - the move failed!</span>');
  }

  renderBattle();

  if (f.hp <= 0) { battleLater(foeFainted, 600); return; }
  battleLater(function () { foeTurn(!correct); }, 750);

}

/* punish === true means the player just got the question wrong. A correct
   answer means you moved first and cleanly, so the counter-attack lands soft;
   a wrong one leaves you wide open. Knowing the material IS the defence.

   The 0.35 / 1.5 split was tuned by simulation. It puts a gym win at roughly
   85% for a player answering almost everything right, 55% at 70% accuracy and
   under 10% at 45% - so accuracy, not grinding, is what decides battles, and a
   winning gym run costs about sixteen questions. */
function foeTurn(punish) {
  if (B.over) return;
  var you = B.you, f = foe();
  var moves = usableMoves(f);
  // the foe favours whichever of its moves hits you hardest
  var best = moves[0], bestScore = -1;
  for (var i = 0; i < moves.length; i++) {
    var sc = moves[i].power * effectiveness(moves[i].type, dexOf(you.id).types) *
      (dexOf(f.id).types.indexOf(moves[i].type) >= 0 ? 1.5 : 1) * (0.75 + Math.random() * 0.5);
    if (sc > bestScore) { bestScore = sc; best = moves[i]; }
  }
  var r = damageOf(f, you, best, punish ? 1.5 : 0.35);
  you.hp = Math.max(0, you.hp - r.dmg);
  var line = 'Foe ' + monName(f).toUpperCase() + ' used ' + best.label.toUpperCase() + '!';
  if (r.eff === 0) line += ' ' + effLabel(0);
  else {
    line += ' <span class="hit">' + r.dmg + ' damage.</span>';
    var el = effLabel(r.eff); if (el) line += ' ' + el;
    if (punish) line += ' <span class="hit">Your guard was down!</span>';
    else line += ' <span class="good">You saw it coming.</span>';
  }
  log(line);
  hitAnim('#youimg');
  renderBattle();

  if (you.hp <= 0) { battleLater(youFainted, 700); return; }
  battleLater(showMoveMenu, 500);
}

/* ---- faints / switching -------------------------------------------------- */

function foeFainted() {
  var f = foe();
  var img = $('#foeimg'); if (img) img.classList.add('faint');
  log('Foe ' + monName(f).toUpperCase() + ' fainted!');

  var gain = Math.floor((dexOf(f.id).bst / 6) * f.lvl / 4) + 12;
  if (B.kind !== 'wild') gain = Math.floor(gain * 1.6);
  var evs = giveXp(B.you, gain);
  log(monName(B.you).toUpperCase() + ' gained ' + gain + ' EXP.');
  handleXpEvents(evs);

  battleLater(function () {
    B.foeIx++;
    if (B.foeIx >= B.foes.length) { winBattle(); return; }
    markSeen(foe().id);
    renderBattle();
    log((B.leader || 'The opponent') + ' sent out ' + monName(foe()).toUpperCase() + '!');
    playCry(foe().id);
    showMoveMenu();
  }, 1100);
}

function handleXpEvents(evs) {
  for (var i = 0; i < evs.length; i++) {
    var e = evs[i];
    if (e.kind === 'level') log('<span class="good">' + monName(B.you).toUpperCase() + ' grew to level ' + e.lvl + '!</span>');
    if (e.kind === 'evolve') {
      log('<span class="good">' + e.from.toUpperCase() + ' evolved into ' + e.to.toUpperCase() + '!</span>');
      S.caught[e.id] = true; S.seen[e.id] = true;
      showEvolve(e);
    }
  }
  renderBattle();
  saveGame();
}

function youFainted() {
  var img = $('#youimg'); if (img) img.classList.add('faint');
  log('<span class="hit">' + monName(B.you).toUpperCase() + ' fainted!</span>');
  battleLater(function () {
    if (!partyAlive()) { loseBattle(); return; }
    openSwitch(true);
  }, 900);
}

function openSwitch(forced) {
  var h = '<div class="qcard"><div class="qhead"><span class="qtag">' +
    (forced ? 'Choose your next Pokémon' : 'Switch Pokémon') + '</span></div><div class="grid p3">';
  for (var i = 0; i < S.party.length; i++) {
    var m = S.party[i];
    var dead = m.hp <= 0, cur = (m === B.you);
    h += '<button class="card" style="text-align:left" ' + (dead || cur ? 'disabled' : '') +
      ' onclick="doSwitch(' + i + ')"><div class="top"><img src="' + monSprite(m) + '" alt="">' +
      '<div><div class="nm">' + esc(monName(m)) + '</div><div class="lv">Lv ' + m.lvl +
      (cur ? ' · out' : dead ? ' · fainted' : '') + '</div>' +
      '<div class="hpbar"><div class="hpfill ' + hpClass(m) + '" style="width:' + hpPct(m) + '%"></div></div>' +
      '<div class="hpnum">' + m.hp + '/' + maxHp(m) + '</div></div></div></button>';
  }
  h += '</div>';
  if (!forced) h += '<div class="row" style="margin-top:10px"><button class="ghost grow" onclick="showMoveMenu()">Back</button></div>';
  h += '</div>';
  $('#quiz').innerHTML = h;
}

function doSwitch(i) {
  var m = S.party[i];
  if (m.hp <= 0 || m === B.you) return;
  B.you = m;
  log('Go, ' + monName(m).toUpperCase() + '!');
  playCry(m.id);
  renderBattle();
  var img = $('#youimg'); if (img) img.classList.remove('faint');
  showMoveMenu();
}

/* ---- items and running --------------------------------------------------- */

function openPotionMenu() {
  if (B.over) return;
  var h = '<div class="qcard"><div class="qhead"><span class="qtag">Use an item</span>' +
    '<span>' + esc(monName(B.you)) + ' · ' + B.you.hp + '/' + maxHp(B.you) + ' HP</span></div><div class="ball-menu">';
  ['potion', 'superpotion'].forEach(function (key) {
    var have = itemCount(key);
    h += '<button class="ball-opt" ' + (have > 0 ? 'onclick="usePotion(\'' + key + '\')"' : 'disabled') + '>' +
      '<span class="ball-name">' + ITEMS[key].name + '</span>' +
      '<span class="ball-have">' + have + ' left</span>' +
      '<span class="ball-odds">' + (ITEMS[key].heal >= 1 ? 'restores fully' : 'restores about half') + '</span></button>';
  });
  h += '</div><div class="row" style="margin-top:10px"><button class="ghost grow" onclick="showMoveMenu()">Back</button></div></div>';
  $('#quiz').innerHTML = h;
}

function usePotion(key) {
  key = ITEMS[key] && ITEMS[key].kind === 'heal' ? key : 'potion';
  if (!haveItem(key)) { toast('No ' + ITEMS[key].name + 's left.'); return; }
  if (B.you.hp >= maxHp(B.you)) { toast(monName(B.you) + ' is already at full HP.'); return; }
  useItem(key, 1);
  var heal = Math.min(maxHp(B.you) - B.you.hp, Math.ceil(maxHp(B.you) * ITEMS[key].heal));
  B.you.hp += heal;
  log('You used a ' + ITEMS[key].name + '. ' + monName(B.you).toUpperCase() + ' recovered ' + heal + ' HP.');
  renderBattle(); saveGame();
  battleLater(function () { foeTurn(false); }, 700);
}

function runAway() {
  if (B.kind !== 'wild') { toast('You cannot run from a Gym battle!'); return; }
  log('You got away safely.');
  B.over = true;
  showScreen('map'); renderMap();
}

/* Catching costs a question: you have to prove you understand the topic. */
/* Which ball, and what it is worth. Poké Balls are free, so the question is
   never "can I afford to try", only "is this one worth a better ball". */
function openBallMenu() {
  if (B.over || B.kind !== 'wild') return;
  var f = foe();
  var rate = dexOf(f.id).rate;
  var band = rate >= 200 ? 'very easy to catch' : rate >= 120 ? 'easy to catch' :
             rate >= 60 ? 'a fair catch' : rate >= 25 ? 'hard to catch' :
             rate >= 10 ? 'very hard to catch' : 'almost impossible to catch';
  var h = '<div class="qcard"><div class="qhead"><span class="qtag">Choose a ball</span>' +
    '<span>' + esc(monName(f)) + ' · ' + hpPct(f) + '% HP · ' + band + '</span></div>' +
    '<div class="ball-menu">';
  Object.keys(BALLS).forEach(function (key) {
    var b = BALLS[key];
    var have = b.unlimited ? Infinity : itemCount(key);
    var pct = catchChanceOf(f, key, true) * 100;
    var shown = pct >= 99.5 ? 'certain' : (pct < 1 ? pct.toFixed(1) : Math.round(pct)) + '%';
    h += '<button class="ball-opt" ' + (have > 0 ? 'onclick="tryCatch(\'' + key + '\')"' : 'disabled') + '>' +
      '<span class="ball-name">' + b.name + '</span>' +
      '<span class="ball-have">' + (b.unlimited ? 'unlimited' : have + ' left') + '</span>' +
      '<span class="ball-odds">' + shown + ' if you answer correctly</span></button>';
  });
  h += '</div><p class="small">Capture rate is the species\u2019 own. Weakening it first raises every ' +
    'one of those numbers, and a wrong answer is a fumbled throw.</p>' +
    '<div class="row" style="margin-top:10px"><button class="ghost grow" onclick="showMoveMenu()">Back</button></div></div>';
  $('#quiz').innerHTML = h;
}

/* ---- capture ---------------------------------------------------------------
   The Generation III/IV capture formula, unchanged:

       a = (3*max - 2*cur) * rate * ball / (3*max) * status
       b = 1048560 / sqrt(sqrt(16711680 / a))

   then four shake checks, each passing if a random 16-bit value is under b. The
   species' own capture rate from PokeAPI drives it, so a Caterpie is a Caterpie
   and a Lugia is a Lugia. Rates in this roster run 3 to 255.

   The one thing this game supplies in place of a status condition is the
   question. Answering correctly is worth 1.5x, the same as paralysis in the real
   games; fumbling the answer is worth 0.6x. That is the only liberty taken, and
   it is the whole point of the game.

   Critical captures are the Gen V rule: as the Pokedex fills, throws sometimes
   resolve in a single shake. */

/* The real games multiply the catch rate for a sleeping or paralysed target.
   This game has no status moves, so the equivalent is your own concentration:
   a correct answer is worth 1.5x like paralysis, and three or more correct in a
   row this battle is worth 2x like sleep. A fumbled answer is a fumbled throw. */
function catchStatusBonus(correct) {
  if (!correct) return 0.6;
  return (B && B.correctRun >= 3) ? 2.0 : 1.5;
}

function criticalCaptureRate() {
  var caught = Object.keys(S.caught || {}).length;
  var m = caught > 600 ? 2.5 : caught > 450 ? 2.0 : caught > 300 ? 1.5 :
          caught > 150 ? 1.0 : caught > 30 ? 0.5 : 0;
  return m / 6;                       // 0 to ~0.42 of the per-shake probability
}

/* The 'a' value: everything except the shake checks. */
function catchValue(f, ballKey, correct) {
  var max = maxHp(f);
  var cur = Math.max(1, f.hp);
  var rate = dexOf(f.id).rate;
  var ball = (BALLS[ballKey] || BALLS.poke).mult;
  return ((3 * max - 2 * cur) * rate * ball) / (3 * max) * catchStatusBonus(correct);
}

/* Probability the whole throw succeeds, for showing the player real odds. */
function catchChanceOf(f, ballKey, correct) {
  var a = catchValue(f, ballKey, correct);
  if (a >= 255) return 1;
  var b = 1048560 / Math.sqrt(Math.sqrt(16711680 / a));
  var per = Math.min(1, b / 65536);
  var crit = Math.min(1, criticalCaptureRate() * per);
  // a critical throw needs one shake; an ordinary one needs four
  return crit * per + (1 - crit) * Math.pow(per, 4);
}

/* Roll a real throw. Returns how many times the ball rocked, so the log can say
   so, plus whether it held. */
function rollCatch(f, ballKey, correct) {
  var a = catchValue(f, ballKey, correct);
  if (a >= 255) return { caught: true, shakes: 3, critical: false };
  var b = 1048560 / Math.sqrt(Math.sqrt(16711680 / a));
  var per = b / 65536;
  var critical = Math.random() < Math.min(1, criticalCaptureRate() * per);
  var checks = critical ? 1 : 4;
  var shakes = 0;
  for (var i = 0; i < checks; i++) {
    if (Math.random() * 65536 < b) shakes++;
    else break;
  }
  return { caught: shakes >= checks, shakes: shakes, critical: critical };
}

/* Kept for the ball menu: the odds of a well-thrown ball. */
function baseCatchChance(f) { return catchChanceOf(f, 'poke', true); }

function tryCatch(ballKey) {
  ballKey = BALLS[ballKey] ? ballKey : 'poke';
  var ball = BALLS[ballKey];
  if (!ball.unlimited && !haveItem(ballKey)) { toast('No ' + ball.name + 's left.'); return; }
  B.ballKey = ballKey;
  B.catching = true;
  B.pendingMove = { label: ball.name, tier: 2, type: 'normal', power: 0 };
  askQuestionForCatch();
}

function askQuestionForCatch() {
  B.qAnswered = false;
  B.turnResolving = false;
  var got = pickQuestion(B.chapters, 2, B.asked);
  B.q = got.q; B.qReview = got.review; B.asked[got.q.id] = true; B.qStart = Date.now();
  renderQuestion();
  var card = $('#quiz .qcard');
  var note = document.createElement('div');
  note.className = 'small';
  note.style.marginTop = '10px';
  note.textContent = 'A correct answer improves your catch chance to ' +
    Math.round(catchChanceOf(foe(), B.ballKey, true) * 100) + '%.';
  card.appendChild(note);
}

function resolveCatch(correct) {
  var f = foe();
  var ball = BALLS[B.ballKey] || BALLS.poke;
  if (!ball.unlimited) useItem(B.ballKey, 1);
  var roll = rollCatch(f, B.ballKey, correct);
  if (roll.critical) log('The ball flew differently...');
  if (roll.caught) {
    log('<span class="good">Gotcha! ' + monName(f).toUpperCase() + ' was caught!</span>');
    S.caught[f.id] = true; S.seen[f.id] = true; S.totals.caught++;
    if (S.party.length < 6) S.party.push(f); else S.box.push(f);
    B.over = true; B.caught = true;
    playCry(f.id);
    saveGame();
    showCaught(f);
    return;
  }
  var SHAKE = ['It broke free immediately!', 'The ball shook once, then broke free!',
               'The ball shook twice... it broke free!', 'The ball shook three times... so close!'];
  log(SHAKE[Math.min(3, roll.shakes)] +
      (correct ? '' : ' <span class="hit">A fumbled throw.</span>'));
  if (!ball.unlimited) log('<span class="hit">That was a ' + ball.name + '.</span>');
  saveGame();
  battleLater(function () { foeTurn(false); }, 700);
}

/* ---- end of battle -------------------------------------------------------- */

function winBattle() {
  if (!B || B.over) return;
  if (B.kind === 'trainer') { finishFriendBattle(true); return; }
  if (B.kind === 'npc') { finishNpcBattleResult(true); return; }
  B.over = true;
  S.totals.wins++;
  var msg = '', extra = '';

  if (B.kind === 'gym') {
    var was = !!S.badges[B.chapter.n];
    S.badges[B.chapter.n] = true;
    giveItem('potion', 2); giveItem('great', 1); addMoney(battlePrize('gym'));
    msg = 'You defeated ' + B.leader + '!';
    extra = (was ? 'You already had the ' : 'You earned the ') + B.chapter.badge + '!';
  } else if (B.kind === 'elite') {
    S.elite[B.elite.id] = true;
    giveItem('superpotion', 2); giveItem('ultra', 1); addMoney(battlePrize('elite'));
    msg = 'You defeated ' + B.elite.name + '!';
    extra = ((typeof isChampion === 'function') ? isChampion(B.elite) : B.elite.id === 'champ')
      ? 'You are the Champion! You have cleared every gym and the final challenge.'
      : 'One step closer to the Champion.';
  } else {
    msg = 'You won the battle!';
    var won$ = addMoney(battlePrize('wild'));
    extra = 'You picked up ₵' + won$ + '.';
    if (Math.random() < 0.18) { giveItem('potion', 1); extra += ' And a Potion.'; }
  }
  var acc = B.correctThisBattle + B.wrongThisBattle;
  var accTxt = acc ? B.correctThisBattle + '/' + acc + ' questions correct this battle.' : '';
  syncFriendStory();
  saveGame();
  showResult(true, msg, extra, accTxt);
}

function loseBattle() {
  if (!B || B.over) return;
  if (B.kind === 'trainer') { finishFriendBattle(false); return; }
  if (B.kind === 'npc') { finishNpcBattleResult(false); return; }
  B.over = true;
  healParty();
  saveGame();
  var acc = B.correctThisBattle + B.wrongThisBattle;
  showResult(false, 'Your team was defeated...',
    'You returned to the Poké Center. Your team is fully healed.',
    acc ? B.correctThisBattle + '/' + acc + ' questions correct this battle.' : '');
}


/* An ordinary trainer around the region: pay out, remember the win, and show
   their parting line. */
function finishNpcBattleResult(won) {
  if (!B || B.kind !== 'npc' || B.npcRewarded) return;
  B.npcRewarded = true;
  clearInterval(B.timer);
  B.over = true;
  var r = finishNpcBattle(won);
  if (won) S.totals.wins++;
  healParty();
  saveGame();
  var answered = B.correctThisBattle + B.wrongThisBattle;
  modal('<h2>' + esc(won ? 'You won!' : 'You were beaten.') + '</h2>' +
    (r ? '<span class="friend-role">' + esc(r.person.cls) + ' ' + esc(r.person.name) + '</span>' +
         '<p class="scene-prose">' + esc(r.line) + '</p>' : '') +
    '<p>' + B.correctThisBattle + '/' + answered + ' questions correct.</p>' +
    (r && r.prize ? '<p class="friend-change">Prize money: ₵' + r.prize +
      (r.first ? '' : ' (rematch rate)') + '</p>' : '') +
    '<p class="small">Your party has been healed.</p>' +
    '<div class="row" style="justify-content:center;margin-top:12px">' +
    '<button class="primary" onclick="closeModal();openTown()">Back to the region</button>' +
    '<button class="ghost" onclick="closeModal();showScreen(\'map\');renderMap()">To the map</button></div>');
}
