/* Two subjects, one trainer.

   StudyMon started as one region built on one textbook. It is now a shelf: the C
   region for Forouzan, the Converging Isles for MA 16200, and room for whatever
   class comes next. The rule is that your Pokemon, money, bag and friendships
   belong to YOU and cross every border, while badges, chapter scores and review
   history belong to the SUBJECT and stay behind when you sail.

   The trick that keeps this cheap: every data file still writes its globals the
   way it always did, and this file - loaded last - captures them into the
   registry and then replaces the global with an accessor that reads whichever
   subject is active. Nothing in battle.js, ui.js, town.js or friends.js had to
   change to see the second region. */

window.SUBJECTS = {};

/* The five things a subject owns. Everything else is shared. */
var SUBJECT_GLOBALS = ['CHAPTERS', 'QBANK', 'GYM_DIALOGUE', 'ELITE', 'LOCATIONS', 'TOWNSFOLK'];

function registerSubject(def) {
  SUBJECTS[def.id] = def;
  return def;
}

/* Which subject is being studied. S is null on the title screen, and the save
   may predate subjects entirely, so this has to answer before a game loads. */
function activeSubject() {
  var id = (S && S.subject) || 'c';
  return SUBJECTS[id] ? id : 'c';
}

function subjectDef(id) { return SUBJECTS[id || activeSubject()]; }

/* Progress is per subject. Callers that read S.badges keep working because
   switchSubject() points the flat fields at the active subject's bucket. */
function subjectProgress(id) {
  id = id || activeSubject();
  if (!S.progress) S.progress = {};
  if (!S.progress[id]) {
    S.progress[id] = { badges: {}, elite: {}, chapterStats: {}, srs: {}, clock: 0 };
  }
  return S.progress[id];
}

/* Move the live save's progress fields into the bucket we are leaving, then
   point them at the bucket we are entering. Everything the engine already does
   with S.badges / S.srs / S.chapterStats / S.elite / S.clock keeps working; it
   is simply reading a different bucket afterwards. */
function bindProgress(id) {
  var p = subjectProgress(id);
  S.badges = p.badges;
  S.elite = p.elite;
  S.chapterStats = p.chapterStats;
  S.srs = p.srs;
  S.clock = p.clock || 0;
}

function stashProgress() {
  if (!S || !S.progress) return;
  var p = S.progress[activeSubject()];
  if (!p) return;
  p.badges = S.badges; p.elite = S.elite;
  p.chapterStats = S.chapterStats; p.srs = S.srs; p.clock = S.clock;
}

function switchSubject(id) {
  if (!SUBJECTS[id] || id === activeSubject()) return false;
  // A battle holds chapter numbers from the region it started in. Carrying one
  // across the border would draw its next question from the wrong bank, so end
  // it here rather than leaving a live battle pointing at nothing.
  if (typeof B !== 'undefined' && B && !B.over) {
    B.over = true;
    B = null;
  }
  stashProgress();
  S.subject = id;
  bindProgress(id);
  TOWN_LOC = LOCATIONS[0].id;
  saveGame();
  return true;
}

/* Chapters are numbered 1..N inside a subject, but nothing guarantees the array
   is in order or that a subject starts at 1, so never index by n-1. */
function chapterByNumber(n) {
  n = Number(n);
  var list = CHAPTERS, i;
  for (i = 0; i < list.length; i++) if (list[i].n === n) return list[i];
  // Exam-only chapters have no gym and no map row, but a question can still
  // come from one, and everything downstream needs a title for it.
  var extra = (subjectDef() || {}).EXAM_CHAPTERS || [];
  for (i = 0; i < extra.length; i++) if (extra[i].n === n) return extra[i];
  return null;
}

/* A chapter's label that never throws, whatever number arrives. */
function chapterTitle(n) {
  var c = chapterByNumber(n);
  return c ? c.title : 'Chapter ' + n;
}

/* Gyms plus exam-only chapters - everything the Notes screen can show. */
function studiableChapters() {
  return CHAPTERS.concat((subjectDef() || {}).EXAM_CHAPTERS || []);
}

/* --------------------------------------------------------------------------
   Capture the globals the data files wrote, then virtualise them.
   Called once, from main.js, after every data file has run.
   -------------------------------------------------------------------------- */
function installSubjects() {
  if (installSubjects.done) return;
  installSubjects.done = true;

  registerSubject({
    id: 'c',
    name: 'C',
    short: 'C',
    region: 'The C-Region',
    book: 'Forouzan & Afyouni, Computer Science: A Structured Programming Approach in C',
    blurb: 'Fifteen chapters, fifteen routes, one gym each.',
    CHAPTERS: window.CHAPTERS,
    QBANK: window.QBANK,
    GYM_DIALOGUE: window.GYM_DIALOGUE,
    ELITE: window.ELITE,
    LOCATIONS: window.LOCATIONS,
    TOWNSFOLK: window.TOWNSFOLK,
    EXAM_CHAPTERS: [],
    bossTitle: 'Victory Road, the Elite Four',
    mapIntro: 'Fifteen routes, one per chapter of the textbook. Every route is open. ' +
      'Pick the chapter you want to practice. Wild battles let you catch Pokémon; ' +
      'gyms award badges. All fifteen badges open the Elite Four.'
  });
  // No `after` on the C elite, so bossAfter() puts all five behind the last gym.

  if (window.CALC_SUBJECT) {
    // The question bank and cast load after calc-world.js, so bind them now.
    window.CALC_SUBJECT.QBANK = window.CALC_QBANK || {};
    window.CALC_SUBJECT.TOWNSFOLK = window.CALC_TOWNSFOLK || [];
    registerSubject(window.CALC_SUBJECT);
  }

  SUBJECT_GLOBALS.forEach(function (key) {
    delete window[key];
    Object.defineProperty(window, key, {
      configurable: true,
      get: function () { return subjectDef()[key]; }
    });
  });
}

/* v4 -> v5. Before subjects, badges/elite/chapterStats/srs/clock sat flat on the
   save and were all about C. Move them into progress.c and leave the flat fields
   pointing at that same bucket, so nothing that reads S.badges notices. Runs
   AFTER migrateCurriculumSave, which still expects the flat fourth-edition
   shape. Pokemon, box, money, items, town and friends are untouched: they were
   always yours rather than the subject's. */
function migrateSubjectSave(s) {
  if (s.progress && s.subject) return false;
  s.subject = 'c';
  s.progress = {
    c: {
      badges: s.badges || {},
      elite: s.elite || {},
      chapterStats: s.chapterStats || {},
      srs: s.srs || {},
      clock: Number(s.clock) || 0
    }
  };
  return true;
}

/* --------------------------------------------------------------------------
   Where a subject's boss battles sit.

   The C region puts all of its bosses at the very end - that is what an Elite
   Four is. The Converging Isles do not have an Elite Four at all: the three
   evening exams are scattered through the run at the point the real course sits
   them, and only the Final is last. Both are the same data with a different
   `after` number, so one code path draws both.

   `after` is the gym number a boss stands immediately behind. A boss opens once
   you hold that many badges, and until you beat it, every gym past it is shut.
   -------------------------------------------------------------------------- */
function bossAfter(e) {
  return typeof e.after === 'number' ? e.after : CHAPTERS.length;
}

function isChampion(e) { return !!e.champion || e.id === 'champ'; }

function bossOpen(e) { return badgeCount() >= bossAfter(e); }

function bossBeaten(e) { return !!(S && S.elite && S.elite[e.id]); }

/* The unbeaten boss standing between you and gym n, if there is one. */
function gymBlockedBy(n) {
  var list = ELITE || [];
  for (var i = 0; i < list.length; i++) {
    if (bossAfter(list[i]) < n && !bossBeaten(list[i])) return list[i];
  }
  return null;
}

/* Gyms and bosses in the order you actually meet them. */
function mapStops() {
  var bosses = (ELITE || []).slice().sort(function (a, b) { return bossAfter(a) - bossAfter(b); });
  var placed = {}, out = [];
  CHAPTERS.forEach(function (c) {
    out.push({ kind: 'gym', ch: c });
    bosses.forEach(function (e) {
      if (!placed[e.id] && bossAfter(e) === c.n) { out.push({ kind: 'boss', e: e }); placed[e.id] = 1; }
    });
  });
  bosses.forEach(function (e) { if (!placed[e.id]) out.push({ kind: 'boss', e: e }); });
  return out;
}

/* Every subject's people, for the friend roster - friendships are shared, so a
   companion you met in the C region is still your friend on the Isles. */
function everyPerson() {
  if (typeof castEntries === 'function' && typeof castSource === 'function') {
    return castEntries({ sourceKind: 'townsfolk' }).map(castSource).filter(Boolean);
  }
  var out = [];
  for (var id in SUBJECTS) {
    var f = SUBJECTS[id].TOWNSFOLK || [];
    for (var i = 0; i < f.length; i++) out.push(f[i]);
  }
  return out;
}

function personSubject(id) {
  if (typeof castById === 'function') {
    var member = castById(id);
    return member ? member.homeSubject : null;
  }
  for (var s in SUBJECTS) {
    var f = SUBJECTS[s].TOWNSFOLK || [];
    for (var i = 0; i < f.length; i++) if (f[i].id === id) return s;
  }
  return null;
}
