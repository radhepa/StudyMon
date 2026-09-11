/* Save state + persistence. One localStorage key, plus JSON export/import
   so a save can be moved between machines or backed up. */

var SAVE_KEY = 'cmon.save.v1';

var S = null;   // the live save object

function freshSave() {
  return {
    v: 1,
    curriculumVersion: 4,
    subject: 'c',
    progress: {},
    visited: { c: true },
    friends: {},
    friendScene: null,
    sideQuests: { version: 3, records: {} },
    trainer: 'TRAINER',
    started: Date.now(),
    party: [],
    box: [],
    seen: {},
    caught: {},
    badges: {},          // chapterNum -> true
    elite: {},           // elite id  -> true
    money: 500,
    items: { great: 0, ultra: 0, potion: 3, superpotion: 0 },
    town: { beaten: {}, gifts: {}, met: {} },
    srs: {},             // qid -> { box: 1..5, due: <answer clock>, r: 0, w: 0 }
    clock: 0,            // increments on every answered question; drives SRS due dates
    chapterStats: {},    // ch -> { r, w }
    totals: { r: 0, w: 0, battles: 0, wins: 0, caught: 0 },
    streak: 0,
    bestStreak: 0,
    settings: { sound: true, timer: true, seconds: 45 }
  };
}

function saveGame() {
  if (typeof stashProgress === 'function') stashProgress();
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); }
  catch (e) { console.warn('save failed', e); }
}

function loadGame() {
  try {
    var raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    var o = JSON.parse(raw);
    if (!o || o.v !== 1) return false;
    S = o;
    migrateCurriculumSave(S);
    migrateSubjectSave(S);
    // tolerate saves written by an older build
    var d = freshSave();
    for (var k in d) if (!(k in S)) S[k] = d[k];
    for (var k2 in d.settings) if (!(k2 in S.settings)) S.settings[k2] = d.settings[k2];
    bindProgress(activeSubject());
    ensureFriends();
    ensureBag();
    ensureTown();
    saveGame();
    return true;
  } catch (e) { return false; }
}

function hasSave() {
  try { return !!localStorage.getItem(SAVE_KEY); } catch (e) { return false; }
}

function wipeSave() {
  try { localStorage.removeItem(SAVE_KEY); } catch (e) { }
  S = null;
}

function exportSave() {
  var blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'cmon-save-' + new Date().toISOString().slice(0, 10) + '.json';
  document.body.appendChild(a); a.click();
  setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}

function importSave(file, done) {
  var fr = new FileReader();
  fr.onload = function () {
    try {
      var o = JSON.parse(fr.result);
      if (!o || o.v !== 1 || !o.party) throw new Error('not a C-MON save');
      S = o;
    migrateCurriculumSave(S);
    migrateSubjectSave(S);
      var defaults=freshSave();
      for(var key in defaults) if(!(key in S)) S[key]=defaults[key];
      S.settings=Object.assign({},defaults.settings,S.settings);
      bindProgress(activeSubject());
      ensureFriends(); ensureBag(); ensureTown(); saveGame(); done(null);
    } catch (e) { done(e); }
  };
  fr.onerror = function () { done(new Error('could not read the file')); };
  fr.readAsText(file);
}

var badgeCount = function () { return Object.keys(S.badges).length; };
