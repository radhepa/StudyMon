/* Save state + persistence. One localStorage key, plus JSON export/import
   so a save can be moved between machines or backed up. */

var SAVE_KEY = 'cmon.save.v1';
var SAVE_SCHEMA_BACKUP_KEY = 'cmon.save.v1.backup.pre-schema-1';
var CURRENT_SAVE_SCHEMA = 3;

var S = null;   // the live save object

function freshSave() {
  return {
    v: 1,
    schemaVersion: CURRENT_SAVE_SCHEMA,
    activityClock: 0,    // all answered questions; drives cross-subject friendship cooldowns
    curriculumVersion: 4,
    subject: 'c',
    progress: {},
    visited: { c: true },
    friends: {},
    giftLedger: {},       // characterId -> compact preference discoveries and receipt IDs
    friendScene: null,
    worldFlags: {},       // compact stable story flags used by social prerequisites
    dialogueFlags: {},    // stable choice-id/outcome-id pairs for later contextual dialogue
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
    town: { beaten: {}, gifts: {}, met: {}, receipts: {} },
    srs: {},             // qid -> { box: 1..5, due: <answer clock>, r: 0, w: 0 }
    clock: 0,            // increments on every answered question; drives SRS due dates
    chapterStats: {},    // ch -> { r, w }
    totals: { r: 0, w: 0, battles: 0, wins: 0, caught: 0 },
    streak: 0,
    bestStreak: 0,
    settings: { sound: true }
  };
}

/* Internal save migrations are deliberately separate from the external `v`.
   The external version identifies StudyMon save files; schemaVersion lets this
   build evolve their contents without making old exports unreadable. */
var SAVE_MIGRATIONS = {
  1: function (save) { return save; },
  2: function (save) {
    var progress = isPlainSaveObject(save.progress) ? save.progress : {};
    var subjects = Object.keys(progress);
    if (!subjects.length) subjects = [save.subject || 'c'];

    var activityClock = 0;
    subjects.forEach(function (id) {
      var bucket = isPlainSaveObject(progress[id]) ? progress[id] : null;
      activityClock += Math.max(0, Math.floor(Number(bucket ? bucket.clock :
        (id === (save.subject || 'c') ? save.clock : 0)) || 0));
    });
    var activeClock = Math.max(0, Math.floor(Number(save.clock) || 0));
    activityClock = Math.max(activityClock, activeClock);
    save.activityClock = activityClock;

    var badgeCounts = {};
    subjects.forEach(function (id) {
      var bucket = isPlainSaveObject(progress[id]) ? progress[id] : null;
      var badges = bucket && isPlainSaveObject(bucket.badges) ? bucket.badges :
        (id === (save.subject || 'c') && isPlainSaveObject(save.badges) ? save.badges : {});
      badgeCounts[id] = Object.keys(badges).filter(function (key) { return !!badges[key]; }).length;
    });

    if (isPlainSaveObject(save.friends)) {
      Object.keys(save.friends).forEach(function (id) {
        var friend = save.friends[id];
        if (!isPlainSaveObject(friend)) return;
        ['Talk', 'Outing', 'Battle'].forEach(function (action) {
          var key = 'last' + action;
          if (!Number.isFinite(friend[key])) return;
          var remaining = Math.max(0, friend[key] + 5 - activeClock);
          friend[key] = activityClock + remaining - 5;
        });
        var bySubject = isPlainSaveObject(friend.storyBadgesBySubject) ?
          friend.storyBadgesBySubject : {};
        Object.keys(badgeCounts).forEach(function (subject) {
          bySubject[subject] = badgeCounts[subject];
        });
        friend.storyBadgesBySubject = bySubject;
        delete friend.storyBadges;
      });
    }
    return save;
  },
  3: function (save) {
    if (typeof migrateFriendSceneIds !== 'function') throw new Error('friend scene migration is unavailable');
    return migrateFriendSceneIds(save);
  }
};

function saveSchemaVersion(save) {
  if (!Object.prototype.hasOwnProperty.call(save, 'schemaVersion')) return 0;
  if (!Number.isInteger(save.schemaVersion) || save.schemaVersion < 0) {
    throw new Error('invalid save schema');
  }
  return save.schemaVersion;
}

function isPlainSaveObject(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function copySaveValue(value) {
  if (Array.isArray(value)) return value.map(copySaveValue);
  if (isPlainSaveObject(value)) {
    var copy = {};
    for (var key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) copy[key] = copySaveValue(value[key]);
    }
    return copy;
  }
  return value;
}

/* Fill every required branch from freshSave, not just its first level. Unknown
   fields are intentionally left in place so newer or extension data survives a
   round trip through this build. */
function hydrateSaveDefaults(save, defaults) {
  for (var key in defaults) {
    if (!Object.prototype.hasOwnProperty.call(defaults, key)) continue;
    var fallback = defaults[key];
    var value = save[key];
    if (Array.isArray(fallback)) {
      if (!Array.isArray(value)) save[key] = copySaveValue(fallback);
    } else if (isPlainSaveObject(fallback)) {
      if (!isPlainSaveObject(value)) value = save[key] = {};
      hydrateSaveDefaults(value, fallback);
    } else if (value === undefined ||
               (fallback !== null && typeof value !== typeof fallback)) {
      save[key] = fallback;
    }
  }
  return save;
}

function normalizeSave(input) {
  if (!isPlainSaveObject(input) || input.v !== 1) throw new Error('not a StudyMon save');

  var save = copySaveValue(input);
  var version = saveSchemaVersion(save);
  if (version > CURRENT_SAVE_SCHEMA) {
    throw new Error('save schema ' + version + ' is newer than this build supports');
  }

  while (version < CURRENT_SAVE_SCHEMA) {
    var next = version + 1;
    var migrate = SAVE_MIGRATIONS[next];
    if (typeof migrate !== 'function') throw new Error('missing save migration to schema ' + next);
    save = migrate(save);
    if (!isPlainSaveObject(save)) throw new Error('save migration ' + next + ' failed');
    version = next;
    save.schemaVersion = version;
  }

  /* These older, independently-versioned migrations remain idempotent. Keeping
     them inside normalization preserves saves/tests that identify their legacy
     shape by curriculumVersion or progress rather than schemaVersion. */
  migrateCurriculumSave(save);
  migrateSubjectSave(save);
  hydrateSaveDefaults(save, freshSave());
  delete save.settings.timer;
  delete save.settings.seconds;
  return save;
}

function preserveLegacyInstalledSave(raw, parsed) {
  if (saveSchemaVersion(parsed) !== 0) return;
  if (localStorage.getItem(SAVE_SCHEMA_BACKUP_KEY) === null) {
    localStorage.setItem(SAVE_SCHEMA_BACKUP_KEY, raw);
  }
}

function activateSave(save) {
  var previous = S;
  try {
    S = save;
    bindProgress(activeSubject());
    ensureFriends();
    ensureBag();
    ensureTown();
  } catch (e) {
    S = previous;
    throw e;
  }
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
    if (!isPlainSaveObject(o) || o.v !== 1) return false;
    /* The exact installed bytes are retained once before any legacy migration.
       If storage cannot preserve the backup, the main save is left untouched. */
    preserveLegacyInstalledSave(raw, o);
    activateSave(normalizeSave(o));
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
      activateSave(normalizeSave(o));
      saveGame();
      done(null);
    } catch (e) { done(e); }
  };
  fr.onerror = function () { done(new Error('could not read the file')); };
  fr.readAsText(file);
}

var badgeCount = function () { return Object.keys(S.badges).length; };
