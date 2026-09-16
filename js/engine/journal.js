/* The journal on the study desk.

   A day in StudyMon is an in-world day: it starts when you wake up and ends
   when you sleep, and the Bootstrap Town HUD already names it ("Tue · Day 3").
   The journal keeps one page per in-world day and writes the real calendar
   date on it too, so a page reads as both "day three of the adventure" and
   "what I actually got through on Tuesday the 15th".

   Everything here is defensive on purpose. The recorders are called from hot
   paths - every answered question, every conversation, every coin - and a
   journal that throws would take the whole game down with it. So each one is
   wrapped, each one is a no-op when there is no save, and none of them is
   allowed to be the reason an answer does not count.

   WHAT WRITES HERE (the whole list, so it stays findable):
     js/engine/quiz.js     recordAnswer()        -> journalAnswer
     js/engine/battle.js   startBattle/resolveCatch/winBattle -> journalBattle,
                                                    journalCatch, journalWin,
                                                    journalBadge
     js/engine/shop.js     addMoney()            -> journalMoney
     js/engine/town.js     talkTo()              -> journalTalk
     js/engine/friends.js  talkFriend()          -> journalTalk
     js/engine/human-world.js  humanChat(), humanGo() -> journalTalk, journalVisit
*/

var JOURNAL_VERSION = 1;
/* Pages older than this fall off the back of the book. Sixty in-world days is
   comfortably more history than the summary screens ever show, and it keeps the
   save from growing without bound on a long playthrough. */
var JOURNAL_KEEP_DAYS = 60;
/* Per-page caps, for the same reason. */
var JOURNAL_MAX_CAUGHT = 40;
var JOURNAL_MAX_NOTES = 30;

function ensureJournal() {
  if (!S) return null;
  if (!S.journal || typeof S.journal !== 'object' || Array.isArray(S.journal)) S.journal = {};
  var j = S.journal;
  j.version = JOURNAL_VERSION;
  if (!j.days || typeof j.days !== 'object' || Array.isArray(j.days)) j.days = {};
  if (!j.lifetime || typeof j.lifetime !== 'object') j.lifetime = { talks: {}, days: 0 };
  if (!j.lifetime.talks || typeof j.lifetime.talks !== 'object') j.lifetime.talks = {};
  return j;
}

/* The in-world day number. Bootstrap Town owns the clock; if a save has never
   opened the town, day 1 is the honest answer. */
function journalDayNumber() {
  return (S && S.humanWorld && Number(S.humanWorld.day) > 0) ? Math.floor(S.humanWorld.day) : 1;
}

function freshJournalDay(day) {
  return {
    day: day,
    date: new Date().toISOString().slice(0, 10),
    opened: Date.now(),
    r: 0, w: 0,                 // questions right / wrong
    bestStreak: 0,
    chapters: {},               // "c:4"  -> { r, w }
    subjects: {},               // "c"    -> { r, w }
    talks: {},                  // personId -> conversations
    battles: 0, wins: 0,
    caught: [],                 // species ids, newest last
    badges: [],                 // badge names earned today
    earned: 0, spent: 0,        // money in / out
    scenes: {},                 // Bootstrap Town scene -> times entered
    notes: []                   // { minute, text } headline moments
  };
}

/* Today's page, created on first write. Pass false to peek without creating
   one, so simply opening the journal does not invent an empty page. */
function journalToday(create) {
  var j = ensureJournal();
  if (!j) return null;
  var day = journalDayNumber(), key = String(day);
  if (!j.days[key]) {
    if (create === false) return null;
    j.days[key] = freshJournalDay(day);
    j.lifetime.days = Object.keys(j.days).length;
    journalPrune(j);
  }
  return j.days[key];
}

function journalPrune(j) {
  var keys = Object.keys(j.days).map(Number).filter(function (n) { return n > 0; })
    .sort(function (a, b) { return a - b; });
  while (keys.length > JOURNAL_KEEP_DAYS) delete j.days[String(keys.shift())];
}

/* Every recorder goes through here. One try/catch, one place to look. */
function journalWrite(fn) {
  try {
    var page = journalToday(true);
    if (page) fn(page);
  } catch (e) { /* the journal is never worth breaking play over */ }
}

function journalBump(bucket, key, field) {
  if (!bucket[key]) bucket[key] = { r: 0, w: 0 };
  bucket[key][field]++;
}

/* ---- recorders ----------------------------------------------------------- */

function journalAnswer(q, correct) {
  journalWrite(function (page) {
    page[correct ? 'r' : 'w']++;
    var subject = (typeof activeSubject === 'function') ? activeSubject() : 'c';
    journalBump(page.subjects, subject, correct ? 'r' : 'w');
    var n = (typeof questionChapter === 'function') ? questionChapter(q) : null;
    if (n) journalBump(page.chapters, subject + ':' + n, correct ? 'r' : 'w');
    if (S.streak > page.bestStreak) page.bestStreak = S.streak;
  });
}

function journalTalk(id) {
  if (!id) return;
  journalWrite(function (page) {
    page.talks[id] = (page.talks[id] || 0) + 1;
    var life = ensureJournal().lifetime;
    life.talks[id] = (life.talks[id] || 0) + 1;
  });
}

function journalBattle() {
  journalWrite(function (page) { page.battles++; });
}

function journalWin() {
  journalWrite(function (page) { page.wins++; });
}

function journalCatch(speciesId) {
  journalWrite(function (page) {
    page.caught.push(speciesId);
    if (page.caught.length > JOURNAL_MAX_CAUGHT) page.caught.shift();
  });
}

function journalBadge(name) {
  journalWrite(function (page) {
    if (page.badges.indexOf(name) < 0) page.badges.push(name);
    journalNote('Earned the ' + name + '.');
  });
}

function journalMoney(delta) {
  if (!delta) return;
  journalWrite(function (page) {
    if (delta > 0) page.earned += delta; else page.spent += -delta;
  });
}

function journalVisit(sceneId) {
  if (!sceneId) return;
  journalWrite(function (page) { page.scenes[sceneId] = (page.scenes[sceneId] || 0) + 1; });
}

/* A short headline for the page: a badge, a first meeting, a rare find. */
function journalNote(text) {
  if (!text) return;
  journalWrite(function (page) {
    var minute = (S.humanWorld && S.humanWorld.minute) || 0;
    page.notes.push({ minute: minute, text: String(text) });
    if (page.notes.length > JOURNAL_MAX_NOTES) page.notes.shift();
  });
}

/* ---- reading ------------------------------------------------------------- */

/* Pages newest first. */
function journalPages() {
  var j = ensureJournal();
  if (!j) return [];
  return Object.keys(j.days).map(function (k) { return j.days[k]; })
    .sort(function (a, b) { return b.day - a.day; });
}

function journalPersonName(id) {
  var m = (typeof castMember === 'function') ? castMember(id) : null;
  if (m) return m.name;
  var p = (typeof townsfolkById === 'function') ? townsfolkById(id) : null;
  return p ? p.name : id;
}

function journalPersonRole(id) {
  var m = (typeof castMember === 'function') ? castMember(id) : null;
  return m ? m.role : '';
}

/* Talk counts as a sorted array, biggest first. */
function journalTopTalkers(talks, limit) {
  return Object.keys(talks || {})
    .map(function (id) { return { id: id, n: talks[id] }; })
    .filter(function (x) { return x.n > 0; })
    .sort(function (a, b) { return b.n - a.n || journalPersonName(a.id).localeCompare(journalPersonName(b.id)); })
    .slice(0, limit || 5);
}

function journalAccuracy(r, w) {
  var t = r + w;
  return t ? Math.round(r / t * 100) : 0;
}

function journalChapterLabel(key) {
  var bits = String(key).split(':');
  var subject = bits[0], n = Number(bits[1]);
  var def = (typeof SUBJECTS !== 'undefined') ? SUBJECTS[subject] : null;
  var list = def ? def.CHAPTERS : (typeof CHAPTERS !== 'undefined' ? CHAPTERS : []);
  var ch = (list || []).find(function (c) { return c.n === n; });
  var prefix = def && Object.keys(SUBJECTS).length > 1 ? esc(def.short || def.name) + ' · ' : '';
  return prefix + (ch ? esc(ch.title || ch.route || ('Chapter ' + n)) : 'Chapter ' + n);
}

function journalSceneLabel(id) {
  var scene = (typeof HUMAN_WORLD_SCENES !== 'undefined') ? HUMAN_WORLD_SCENES[id] : null;
  return scene ? scene.name : id;
}

/* ---- the book itself ----------------------------------------------------- */

/* Which page the reader is looking at. Null means today. */
var JOURNAL_VIEW_DAY = null;

function openJournal(day) {
  ensureJournal();
  JOURNAL_VIEW_DAY = (day === undefined || day === null) ? null : Number(day);
  modal(journalHtml());
}

function journalHtml() {
  var pages = journalPages();
  var today = journalDayNumber();
  var wanted = JOURNAL_VIEW_DAY === null ? today : JOURNAL_VIEW_DAY;
  var page = pages.find(function (p) { return p.day === wanted; }) || null;

  var h = '<div class="journal">' +
    '<div class="journal-head"><span class="journal-eyebrow">Field journal</span>' +
    '<h2>' + esc(journalHeading(wanted, page)) + '</h2>' +
    '<p class="journal-sub">' + esc(journalSubheading(wanted, page)) + '</p></div>';

  h += page ? journalPageHtml(page) : journalEmptyHtml(wanted === today);
  h += journalIndexHtml(pages, wanted);
  h += journalLifetimeHtml(pages);
  h += '<div class="journal-actions">' +
    '<button class="primary" onclick="closeModal()">Close the journal</button></div></div>';
  return h;
}

function journalHeading(day, page) {
  var name = (typeof humanDayName === 'function') ? humanDayName(day) : 'Day ' + day;
  return name;
}

function journalSubheading(day, page) {
  var bits = [];
  if (page && page.date) bits.push(page.date);
  if (day === journalDayNumber()) bits.push('today');
  if (S.humanWorld && S.humanWorld.weather && day === journalDayNumber()) {
    bits.push(S.humanWorld.weather === 'rain' ? 'rain' : 'clear skies');
  }
  return bits.join(' · ');
}

function journalEmptyHtml(isToday) {
  return '<p class="journal-empty">' + (isToday
    ? 'Nothing written yet today. Answer a question, talk to somebody, or go ' +
      'somewhere, and this page will start filling itself in.'
    : 'This page was never written.') + '</p>';
}

function journalTile(label, value, note) {
  return '<div class="journal-tile"><span class="jt-label">' + esc(label) + '</span>' +
    '<b class="jt-value">' + esc(String(value)) + '</b>' +
    '<span class="jt-note">' + esc(note) + '</span></div>';
}

function journalPageHtml(page) {
  var answered = page.r + page.w;
  var h = '<div class="journal-tiles">' +
    journalTile('Questions answered', answered, answered ? journalAccuracy(page.r, page.w) + '% right' : 'none yet') +
    journalTile('Right', page.r, page.w + ' wrong') +
    journalTile('Best streak', page.bestStreak, page.bestStreak >= 5 ? 'paid out' : 'keep going') +
    journalTile('Battles', page.battles, page.wins + ' won') +
    '</div>';

  /* Who you spent the day with. This is the half of the journal that is about
     the town rather than the textbook, so it gets the most room. */
  var talkers = journalTopTalkers(page.talks, 5);
  h += '<section class="journal-block"><h3>Who you talked to</h3>';
  if (!talkers.length) {
    h += '<p class="journal-empty">Nobody yet today.</p>';
  } else {
    var most = talkers[0].n;
    h += '<ul class="journal-people">';
    talkers.forEach(function (t, i) {
      var role = journalPersonRole(t.id);
      h += '<li' + (i === 0 ? ' class="top"' : '') + '>' +
        '<span class="jp-name">' + esc(journalPersonName(t.id)) + '</span>' +
        (role ? '<span class="jp-role">' + esc(role) + '</span>' : '') +
        '<span class="jp-bar"><i style="width:' + Math.round(t.n / most * 100) + '%"></i></span>' +
        '<span class="jp-n">' + t.n + '</span></li>';
    });
    h += '</ul>';
    h += '<p class="journal-line">Most of the day went to <b>' +
      esc(journalPersonName(talkers[0].id)) + '</b>.</p>';
  }
  h += '</section>';

  /* What you practised. */
  var chapters = Object.keys(page.chapters).map(function (k) {
    var c = page.chapters[k];
    return { key: k, r: c.r, w: c.w, total: c.r + c.w };
  }).sort(function (a, b) { return b.total - a.total; }).slice(0, 6);
  if (chapters.length) {
    h += '<section class="journal-block"><h3>What you practised</h3><ul class="journal-list">';
    chapters.forEach(function (c) {
      h += '<li><span>' + journalChapterLabel(c.key) + '</span>' +
        '<b>' + c.total + ' · ' + journalAccuracy(c.r, c.w) + '%</b></li>';
    });
    h += '</ul></section>';
  }

  /* Where you went. */
  var scenes = Object.keys(page.scenes).map(function (k) { return { id: k, n: page.scenes[k] }; })
    .sort(function (a, b) { return b.n - a.n; }).slice(0, 5);
  if (scenes.length) {
    h += '<section class="journal-block"><h3>Where you went</h3><p class="journal-line">' +
      scenes.map(function (s) { return esc(journalSceneLabel(s.id)) + ' (' + s.n + ')'; }).join(' · ') +
      '</p></section>';
  }

  /* Money and catches. */
  var money = [];
  if (page.earned) money.push('earned ₵' + page.earned.toLocaleString());
  if (page.spent) money.push('spent ₵' + page.spent.toLocaleString());
  if (page.caught.length) {
    money.push('caught ' + page.caught.length + ' Pokémon (' +
      page.caught.slice(-4).map(function (id) {
        return (typeof dexOf === 'function' && dexOf(id)) ? dexOf(id).name : '#' + id;
      }).join(', ') + ')');
  }
  if (money.length) {
    h += '<section class="journal-block"><h3>The ledger</h3>' +
      '<p class="journal-line">' + esc(money.join(' · ')) + '.</p></section>';
  }

  /* Headlines. */
  if (page.notes.length) {
    h += '<section class="journal-block"><h3>Worth remembering</h3><ul class="journal-notes">';
    page.notes.slice().reverse().forEach(function (n) {
      var time = (typeof humanTimeText === 'function') ? humanTimeText(n.minute) : '';
      h += '<li><span class="jn-time">' + esc(time) + '</span>' + esc(n.text) + '</li>';
    });
    h += '</ul></section>';
  }
  return h;
}

function journalIndexHtml(pages, current) {
  if (pages.length < 2) return '';
  var h = '<section class="journal-block"><h3>Earlier days</h3><div class="journal-index">';
  pages.slice(0, 14).forEach(function (p) {
    var answered = p.r + p.w;
    h += '<button class="' + (p.day === current ? 'on' : '') + '" onclick="openJournal(' + p.day + ')">' +
      '<b>Day ' + p.day + '</b><small>' + answered + 'q' +
      (answered ? ' · ' + journalAccuracy(p.r, p.w) + '%' : '') + '</small></button>';
  });
  return h + '</div></section>';
}

function journalLifetimeHtml(pages) {
  var j = ensureJournal();
  var allTalk = journalTopTalkers(j.lifetime.talks, 3);
  var totalQ = pages.reduce(function (n, p) { return n + p.r + p.w; }, 0);
  var bits = [pages.length + ' day' + (pages.length === 1 ? '' : 's') + ' written',
              totalQ.toLocaleString() + ' questions in this book'];
  if (allTalk.length) {
    bits.push('closest company: ' + allTalk.map(function (t) {
      return journalPersonName(t.id) + ' (' + t.n + ')';
    }).join(', '));
  }
  return '<p class="journal-foot">' + esc(bits.join(' · ')) + '.</p>';
}
