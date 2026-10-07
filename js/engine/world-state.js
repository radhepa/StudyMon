/* Phase 7 world-state contract: the shared ground that rumors, mail, item
   vignettes, walk-ins and the relationship web stand on.

   Three rules keep reactivity from looping or firing twice:

   1. Facts are never copied. A world fact ID ("badge:c:3", "met:mira",
      "quest-complete:c-lab-25") is resolved on demand from the save branch
      that already owns it. Nothing here writes badges, friendships, quests,
      receipts or items.
   2. Trigger evaluation is read-only. worldFact() and worldConditionMet() may
      run on every render and load without changing the save, so a scene can be
      drawn twice without being "seen" twice.
   3. Effects are claimed explicitly. worldMark() stamps one of four compact
      buckets (known, seen, resolved, rewarded) keyed "<kind>:<id>" once, and
      claimWorldReward() gives a whole attachment or nothing under a single
      town receipt, so reloads, imports and reopening mail cannot duplicate it.

   Content (rumors, letters, vignettes, walk-ins, threads) registers through
   registerWorldContent(); its conditions are validated against the fact
   families below at registration, so a typo fails loudly instead of silently
   making a hint unreachable. There is no event bus: something that "happened"
   is a fact that became true. */

var WORLD_STATE_VERSION = 1;
var WORLD_BUCKETS = ['known', 'seen', 'resolved', 'rewarded'];
var WORLD_CONTENT_KINDS = ['rumor', 'mail', 'vignette', 'walkin', 'thread'];
var WORLD_ID_PATTERN = /^[a-z0-9][a-z0-9-]*$/;
var WORLD_KEY_PATTERN = /^[a-z][a-z-]*:[a-z0-9][a-z0-9-]*$/;
var WORLD_CONDITION_KEYS = ['all', 'any', 'none', 'minActivity', 'subject'];
var WORLD_CONTENT = {};   // "<kind>:<id>" -> frozen record

/* ---------- read-only helpers over existing save branches ---------- */

function worldPlain(value) { return !!value && typeof value === 'object' && !Array.isArray(value); }

/* The active subject's badges and boss clears live on S.badges / S.elite until
   stashProgress copies them back, so the flat fields win for that subject. */
function worldSubjectProgress(subject) {
  if (!S) return { badges: {}, elite: {} };
  var active = (S.subject || 'c') === subject;
  var bucket = worldPlain(S.progress) && worldPlain(S.progress[subject]) ? S.progress[subject] : {};
  return {
    badges: active && worldPlain(S.badges) ? S.badges : (worldPlain(bucket.badges) ? bucket.badges : {}),
    elite: active && worldPlain(S.elite) ? S.elite : (worldPlain(bucket.elite) ? bucket.elite : {})
  };
}
/* Content registers while data files load, before installSubjects() fills
   SUBJECTS, so the two shipped subjects are also recognised by their globals. */
function worldSubjectKnown(subject) {
  if (window.SUBJECTS && SUBJECTS[subject]) return true;
  return subject === 'c' || (subject === 'calc' && !!window.CALC_SUBJECT);
}
function worldFriend(castId) { return S && worldPlain(S.friends) && worldPlain(S.friends[castId]) ? S.friends[castId] : null; }
function worldQuestRecord(questId) {
  var box = S && S.sideQuests && S.sideQuests.records;
  return worldPlain(box) && worldPlain(box[questId]) ? box[questId] : null;
}
function worldSpecies(arg) { var n = Number(arg); return Number.isInteger(n) && n > 0 && String(n) === arg ? n : null; }
function worldArgParts(arg, n) {
  var parts = String(arg).split(':');
  return parts.length === n && parts.every(function (p) { return p.length > 0; }) ? parts : null;
}
function worldCastKnown(id) { return typeof castById === 'function' && !!castById(id); }

/* ---------- fact families: the audit of what the save already knows ----------
   `source` records which branch owns the fact so later slices reuse it rather
   than inventing a parallel flag. `valid` checks an argument against live
   registries; `read` resolves it without writing. */
var WORLD_FACT_FAMILIES = {
  badge: {
    source: 'S.badges (active subject) / S.progress[subject].badges',
    example: 'badge:c:3',
    valid: function (arg) { var p = worldArgParts(arg, 2); return !!p && worldSubjectKnown(p[0]) && /^\d+$/.test(p[1]); },
    read: function (arg) { var p = arg.split(':'); return !!worldSubjectProgress(p[0]).badges[p[1]]; }
  },
  boss: {
    source: 'S.elite (active subject) / S.progress[subject].elite',
    example: 'boss:c:e1',
    valid: function (arg) { var p = worldArgParts(arg, 2); return !!p && worldSubjectKnown(p[0]); },
    read: function (arg) { var p = arg.split(':'); return !!worldSubjectProgress(p[0]).elite[p[1]]; }
  },
  'badges-at-least': {
    source: 'count of S.badges (active subject) / S.progress[subject].badges',
    example: 'badges-at-least:c:2',
    valid: function (arg) { var p = worldArgParts(arg, 2); return !!p && worldSubjectKnown(p[0]) && /^\d+$/.test(p[1]); },
    read: function (arg) {
      var p = arg.split(':'), badges = worldSubjectProgress(p[0]).badges;
      return Object.keys(badges).filter(function (k) { return !!badges[k]; }).length >= Number(p[1]);
    }
  },
  'region-cleared': {
    source: 'every gym badge and boss clear of a subject (leaderRegionCleared)',
    example: 'region-cleared:calc',
    valid: function (arg) { return worldSubjectKnown(arg); },
    read: function (arg) { return typeof leaderRegionCleared === 'function' && !!leaderRegionCleared(arg); }
  },
  visited: {
    source: 'S.visited[subject]',
    example: 'visited:calc',
    valid: function (arg) { return worldSubjectKnown(arg); },
    read: function (arg) { return !!(S && worldPlain(S.visited) && S.visited[arg]); }
  },
  'leader-beaten': {
    source: 'badge/boss clear behind a gym leader (leaderBeaten); S.leaders holds only visits and rematches',
    example: 'leader-beaten:c-gym-1',
    valid: function (arg) { return typeof leaderById === 'function' && !!leaderById(arg); },
    read: function (arg) { return typeof leaderBeaten === 'function' && !!leaderBeaten(leaderById(arg)); }
  },
  'rematch-won': {
    source: 'S.leaders.records[castId].rematch.wins',
    example: 'rematch-won:c-gym-1',
    valid: function (arg) { return typeof leaderById === 'function' && !!leaderById(arg); },
    read: function (arg) {
      var rec = S && S.leaders && worldPlain(S.leaders.records) ? S.leaders.records[arg] : null;
      return !!(rec && rec.rematch && Number(rec.rematch.wins) > 0);
    }
  },
  met: {
    source: 'S.friends[castId].met',
    example: 'met:mira',
    valid: function (arg) { return worldCastKnown(arg); },
    read: function (arg) { var f = worldFriend(arg); return !!(f && f.met); }
  },
  stage: {
    source: 'S.friends[castId].points through friendStage (FRIEND_STAGES ranks)',
    example: 'stage:mira:friend',
    valid: function (arg) {
      var p = worldArgParts(arg, 2);
      return !!p && worldCastKnown(p[0]) && typeof FRIEND_STAGES !== 'undefined' &&
        FRIEND_STAGES.some(function (s) { return s.id === p[1]; });
    },
    read: function (arg) { var p = arg.split(':'); return typeof friendStageAtLeast === 'function' && friendStageAtLeast(worldFriend(p[0]), p[1]); }
  },
  'heart-event': {
    source: 'S.friends[castId].events (completed heart-event scene IDs)',
    example: 'heart-event:mira:<eventId>',
    valid: function (arg) {
      var i = String(arg).indexOf(':');
      if (i < 1 || i === arg.length - 1 || !worldCastKnown(arg.slice(0, i))) return false;
      return typeof sceneBeats === 'function' && !!sceneBeats(arg.slice(0, i), 'event', arg.slice(i + 1));
    },
    read: function (arg) {
      var i = arg.indexOf(':'), f = worldFriend(arg.slice(0, i));
      return !!(f && Array.isArray(f.events) && f.events.indexOf(arg.slice(i + 1)) >= 0);
    }
  },
  receipt: {
    source: 'S.town.receipts (unique grants, first-win bundles, Phase 7 attachments)',
    example: 'receipt:kern-exp-share',
    valid: function (arg) { return typeof arg === 'string' && arg.length > 0; },
    read: function (arg) { return !!(S && S.town && worldPlain(S.town.receipts) && S.town.receipts[arg]); }
  },
  /* An NPC-to-NPC thread has reached a stage: some walk-in scene that moves
     the thread to that stage or a later one has been watched to the end. The
     stage is derived from resolved walk-ins, so it has no separate counter. */
  'thread-at': {
    source: 'S.world.resolved["walkin:<id>"] for walk-ins that carry thread + stage (Phase 7)',
    example: 'thread-at:pier-post:wager',
    valid: function (arg) {
      var p = worldArgParts(arg, 2), t = p && WORLD_CONTENT['thread:' + p[0]];
      return !!t && Array.isArray(t.stages) && t.stages.indexOf(p[1]) >= 0;
    },
    read: function (arg) {
      var p = arg.split(':'), t = WORLD_CONTENT['thread:' + p[0]];
      return worldThreadIndex(p[0]) >= t.stages.indexOf(p[1]);
    }
  },
  'town-gift': {
    source: 'S.town.gifts[personId] (one-off hand-outs such as the potions Tam hands out)',
    example: 'town-gift:tam',
    valid: function (arg) { return worldCastKnown(arg); },
    read: function (arg) { return !!(S && S.town && worldPlain(S.town.gifts) && S.town.gifts[arg]); }
  },
  item: {
    source: 'S.items (owned count > 0)',
    example: 'item:exp-share',
    valid: function (arg) { return typeof itemById === 'function' && !!itemById(arg); },
    read: function (arg) { return !!(S && worldPlain(S.items) && Number(S.items[arg]) > 0); }
  },
  'quest-complete': {
    source: 'S.sideQuests.records[questId].status',
    example: 'quest-complete:c-lab-25',
    valid: function (arg) { return !!(window.SIDE_QUESTS && SIDE_QUESTS.some(function (q) { return q.id === arg; })); },
    read: function (arg) { var r = worldQuestRecord(arg); return !!(r && r.status === 'completed'); }
  },
  'quest-outcome': {
    source: 'S.questFraming.records[questId].outcome (independent | guided | persisted)',
    example: 'quest-outcome:c-lab-25:independent',
    valid: function (arg) {
      var p = worldArgParts(arg, 2);
      return !!p && !!(window.QUEST_FRAMING && QUEST_FRAMING[p[0]]) && ['independent', 'guided', 'persisted'].indexOf(p[1]) >= 0;
    },
    read: function (arg) {
      var p = arg.split(':'), box = S && S.questFraming && S.questFraming.records;
      return !!(worldPlain(box) && box[p[0]] && box[p[0]].outcome === p[1]);
    }
  },
  seen: {
    source: 'S.seen[speciesId]',
    example: 'seen:25',
    valid: function (arg) { return worldSpecies(arg) !== null; },
    read: function (arg) { return !!(S && worldPlain(S.seen) && S.seen[arg]); }
  },
  caught: {
    source: 'S.caught[speciesId]',
    example: 'caught:25',
    valid: function (arg) { return worldSpecies(arg) !== null; },
    read: function (arg) { return !!(S && worldPlain(S.caught) && S.caught[arg]); }
  },
  flag: {
    source: 'S.worldFlags (existing story flags, e.g. event:<eventId>:<sceneId>, mood:<id>:<mood>)',
    example: 'flag:event:mira-e1:scene',
    valid: function (arg) { return typeof arg === 'string' && arg.length > 0; },
    read: function (arg) { return !!(S && worldPlain(S.worldFlags) && S.worldFlags[arg]); }
  },
  /* Phase 7's own buckets, so one piece of content can follow another. */
  known: worldBucketFamily('known'),
  'content-seen': worldBucketFamily('seen'),
  resolved: worldBucketFamily('resolved'),
  rewarded: worldBucketFamily('rewarded')
};

function worldBucketFamily(bucket) {
  return {
    source: 'S.world.' + bucket + '["<kind>:<id>"] (Phase 7)',
    example: (bucket === 'seen' ? 'content-seen' : bucket) + ':rumor:<id>',
    valid: function (arg) { return !!WORLD_CONTENT[arg]; },
    read: function (arg) { return !!(S && S.world && worldPlain(S.world[bucket]) && Object.prototype.hasOwnProperty.call(S.world[bucket], arg)); }
  };
}

/* Highest stage index a thread has reached (-1 = not started). Read-only. */
function worldThreadIndex(threadId) {
  var t = WORLD_CONTENT['thread:' + threadId];
  if (!t || !S || !S.world || !worldPlain(S.world.resolved)) return -1;
  var best = -1;
  Object.keys(WORLD_CONTENT).forEach(function (key) {
    var w = WORLD_CONTENT[key];
    if (w.kind !== 'walkin' || w.thread !== threadId || !w.stage) return;
    if (!Object.prototype.hasOwnProperty.call(S.world.resolved, key)) return;
    best = Math.max(best, t.stages.indexOf(w.stage));
  });
  return best;
}

function worldFactParse(factId) {
  if (typeof factId !== 'string') return null;
  var i = factId.indexOf(':');
  if (i < 1 || i === factId.length - 1) return null;
  var family = WORLD_FACT_FAMILIES[factId.slice(0, i)];
  return family ? { family: family, name: factId.slice(0, i), arg: factId.slice(i + 1) } : null;
}

function validateWorldFactId(factId) {
  var parsed = worldFactParse(factId);
  return !!parsed && !!parsed.family.valid(parsed.arg);
}

/* Unknown or malformed fact IDs are simply false: content written for a newer
   build, or naming a retired character, stays dormant instead of throwing. */
function worldFact(factId) {
  if (!S) return false;
  var parsed = worldFactParse(factId);
  if (!parsed || !parsed.family.valid(parsed.arg)) return false;
  try { return !!parsed.family.read(parsed.arg); } catch (e) { return false; }
}

/* when = { all:[facts], any:[facts], none:[facts], minActivity:n, subject:'c'|['c','calc'] }.
   An unknown key fails closed, matching socialContextMatches. */
function worldConditionMet(when) {
  if (!S) return false;
  when = when || {};
  if (!worldPlain(when)) return false;
  var keys = Object.keys(when);
  if (keys.some(function (k) { return WORLD_CONDITION_KEYS.indexOf(k) < 0; })) return false;
  if (when.all && !when.all.every(worldFact)) return false;
  if (when.any && when.any.length && !when.any.some(worldFact)) return false;
  if (when.none && when.none.some(worldFact)) return false;
  if (when.minActivity !== undefined && worldClock() < Number(when.minActivity)) return false;
  if (when.subject !== undefined) {
    var subject = S.subject || 'c';
    if (Array.isArray(when.subject) ? when.subject.indexOf(subject) < 0 : when.subject !== subject) return false;
  }
  return true;
}

function validateWorldCondition(when, label) {
  var errors = [];
  label = label || 'condition';
  if (when === undefined) return errors;
  if (!worldPlain(when)) return [label + ': condition must be an object'];
  Object.keys(when).forEach(function (k) { if (WORLD_CONDITION_KEYS.indexOf(k) < 0) errors.push(label + ': unknown condition key ' + k); });
  ['all', 'any', 'none'].forEach(function (k) {
    if (when[k] === undefined) return;
    if (!Array.isArray(when[k])) { errors.push(label + ': ' + k + ' must be a list'); return; }
    when[k].forEach(function (fact) { if (!validateWorldFactId(fact)) errors.push(label + ': unknown fact ' + fact); });
  });
  if (when.minActivity !== undefined && !(Number(when.minActivity) >= 0)) errors.push(label + ': invalid minActivity');
  if (when.subject !== undefined) {
    [].concat(when.subject).forEach(function (s) { if (!worldSubjectKnown(s)) errors.push(label + ': unknown subject ' + s); });
  }
  return errors;
}

function worldClock() { return Math.max(0, Math.floor(Number(S && S.activityClock) || 0)); }

/* ---------- content registry ---------- */

function worldContentKey(kind, id) {
  return WORLD_CONTENT_KINDS.indexOf(kind) >= 0 && WORLD_ID_PATTERN.test(String(id)) ? kind + ':' + id : null;
}

/* Registers one record; returns the list of problems (empty = registered).
   Later slices add kind-specific fields; this contract checks only identity
   and conditions so every kind shares one discovery model. */
function registerWorldContent(kind, record) {
  var errors = [];
  var key = record && worldContentKey(kind, record.id);
  if (WORLD_CONTENT_KINDS.indexOf(kind) < 0) errors.push('unknown content kind ' + kind);
  else if (!key) errors.push(kind + ': invalid id ' + (record && record.id));
  else if (WORLD_CONTENT[key]) errors.push(key + ': duplicate id');
  if (record) errors = errors.concat(validateWorldCondition(record.when, key || kind));
  if (!errors.length) {
    var copy = copyWorldRecord(record);
    copy.kind = kind;
    copy.key = key;
    WORLD_CONTENT[key] = Object.freeze(copy);
  }
  return errors;
}

function copyWorldRecord(value) {
  if (Array.isArray(value)) return Object.freeze(value.map(copyWorldRecord));
  if (worldPlain(value)) {
    var out = {};
    Object.keys(value).forEach(function (k) { out[k] = copyWorldRecord(value[k]); });
    return out;
  }
  return value;
}

function worldContent(kind, id) { var key = worldContentKey(kind, id); return key ? WORLD_CONTENT[key] || null : null; }
function worldContentList(kind) {
  return Object.keys(WORLD_CONTENT).sort().map(function (k) { return WORLD_CONTENT[k]; })
    .filter(function (r) { return !kind || r.kind === kind; });
}

/* Read-only: registered content of a kind whose conditions hold now. Ordering
   is stable (priority, then key); selection with variety belongs to each
   kind's own engine. */
function worldEligible(kind, options) {
  options = options || {};
  return worldContentList(kind).filter(function (r) {
    if (options.unseen && worldHas('seen', r.kind, r.id)) return false;
    if (options.unresolved && worldHas('resolved', r.kind, r.id)) return false;
    return worldConditionMet(r.when);
  }).sort(function (a, b) { return (Number(b.priority) || 0) - (Number(a.priority) || 0) || a.key.localeCompare(b.key); });
}

/* ---------- save buckets ---------- */

function freshWorldState() { return { version: WORLD_STATE_VERSION, known: {}, seen: {}, resolved: {}, rewarded: {} }; }

/* Idempotent. Malformed keys are dropped; well-formed but unknown IDs are kept
   so content from a newer build (or temporarily retired content) survives a
   round trip. Anything seen, resolved or rewarded is also known, and a Phase 7
   reward receipt and its rewarded stamp always travel together. */
function ensureWorldState() {
  if (!S) return null;
  var w = S.world;
  if (!worldPlain(w)) w = S.world = freshWorldState();
  w.version = WORLD_STATE_VERSION;
  WORLD_BUCKETS.forEach(function (bucket) {
    if (!worldPlain(w[bucket])) w[bucket] = {};
    Object.keys(w[bucket]).forEach(function (key) {
      if (!WORLD_KEY_PATTERN.test(key)) { delete w[bucket][key]; return; }
      var n = Math.floor(Number(w[bucket][key]));
      w[bucket][key] = Number.isFinite(n) && n > 0 ? n : 0;
    });
  });
  var receipts = S.town && worldPlain(S.town.receipts) ? S.town.receipts : null;
  if (receipts) {
    Object.keys(receipts).forEach(function (rid) {
      var key = worldRewardKeyFromReceipt(rid);
      if (key && receipts[rid] && !Object.prototype.hasOwnProperty.call(w.rewarded, key)) w.rewarded[key] = 0;
    });
    Object.keys(w.rewarded).forEach(function (key) { receipts[worldRewardReceipt(key)] = true; });
  }
  ['seen', 'resolved', 'rewarded'].forEach(function (bucket) {
    Object.keys(w[bucket]).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(w.known, key)) w.known[key] = w[bucket][key];
    });
  });
  return w;
}

function worldHas(bucket, kind, id) {
  var key = worldContentKey(kind, id);
  return !!(key && S && S.world && WORLD_BUCKETS.indexOf(bucket) >= 0 && worldPlain(S.world[bucket]) &&
    Object.prototype.hasOwnProperty.call(S.world[bucket], key));
}

function worldStamp(bucket, kind, id) {
  var key = worldContentKey(kind, id);
  if (!worldHas(bucket, kind, id)) return null;
  return S.world[bucket][key];
}

/* The only writer for discovery state. First stamp wins; returns true only the
   first time, so callers can gate one-off effects on its result. Content this
   build does not know cannot be marked. */
function worldMark(bucket, kind, id) {
  if (!S || WORLD_BUCKETS.indexOf(bucket) < 0) return false;
  var key = worldContentKey(kind, id);
  if (!key || !WORLD_CONTENT[key]) return false;
  ensureWorldState();
  var fresh = !Object.prototype.hasOwnProperty.call(S.world[bucket], key);
  var clock = worldClock();
  if (fresh) S.world[bucket][key] = clock;
  if (!Object.prototype.hasOwnProperty.call(S.world.known, key)) S.world.known[key] = clock;
  return fresh;
}

function worldRewardReceipt(key) { return 'world:' + key; }
function worldRewardKeyFromReceipt(receiptId) {
  var m = /^world:([a-z][a-z-]*:[a-z0-9][a-z0-9-]*)$/.exec(String(receiptId));
  return m ? m[1] : null;
}

/* Atomic attachment claim. Validates the whole bundle through
   claimReceiptItems (all-or-nothing under the town receipt), then stamps
   `rewarded`. A receipt that already exists - from a reload, an import or a
   save edited by hand - repairs the stamp and grants nothing. Returns the
   granted list, or null when nothing was granted. */
function claimWorldReward(kind, id, bundle) {
  if (!S) return null;
  var key = worldContentKey(kind, id);
  if (!key || !WORLD_CONTENT[key]) return null;
  ensureTown();
  ensureWorldState();
  var receipt = worldRewardReceipt(key);
  if (Object.prototype.hasOwnProperty.call(S.world.rewarded, key) || S.town.receipts[receipt]) {
    worldMark('rewarded', kind, id);
    S.town.receipts[receipt] = true;
    return null;
  }
  var granted = claimReceiptItems(receipt, bundle);
  if (!granted) return null;
  worldMark('rewarded', kind, id);
  return granted;
}

/* ---------- audit ---------- */

function validateWorldState() {
  var errors = [];
  Object.keys(WORLD_FACT_FAMILIES).forEach(function (name) {
    var f = WORLD_FACT_FAMILIES[name];
    if (!f.source || typeof f.valid !== 'function' || typeof f.read !== 'function') errors.push('fact family ' + name + ' is incomplete');
    if (!/^[a-z][a-z-]*$/.test(name)) errors.push('fact family ' + name + ' has an invalid name');
  });
  Object.keys(WORLD_CONTENT).forEach(function (key) {
    var r = WORLD_CONTENT[key];
    if (key !== r.kind + ':' + r.id) errors.push(key + ': key does not match its record');
    errors = errors.concat(validateWorldCondition(r.when, key));
  });
  return errors;
}

function worldFactFamilies() {
  return Object.keys(WORLD_FACT_FAMILIES).sort().map(function (name) {
    return { family: name, source: WORLD_FACT_FAMILIES[name].source, example: WORLD_FACT_FAMILIES[name].example };
  });
}
