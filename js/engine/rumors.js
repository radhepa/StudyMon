/* Phase 7 Slice 2: rumors and gossip.

   A rumor is a line someone passes on while you are already talking to them.
   Three kinds, and the player must be able to tell them apart:

   - reliable  mechanically true. If it names a fact (`fact`), that fact holds
               every time the rumor can be told; an actionable one (`actionable`)
               always outranks everything else a speaker could say, so it can
               never be starved by random choice.
   - biased    one person's take. The text must frame itself as perspective
               ("Oz reckons...", "according to Mo...") so it is never a silent
               false instruction.
   - flavor    colour about people and places; asserts nothing you can act on.

   Selection is read-only and deterministic: the same save, speaker and play
   window always pick the same rumor, with no Math.random. hearRumor() is the
   only writer - it runs from an explicit talk and stamps `seen`, and retires
   rumors whose `resolvedBy` facts have come true. Unseen rumors come first;
   once a speaker has nothing new they only occasionally repeat themselves. */

var RUMOR_RELIABILITY = ['reliable', 'biased', 'flavor'];
var RUMOR_WINDOW = 10;             // answered questions per selection window
var RUMOR_REPEAT_EVERY = 3;        // with nothing new, repeat in 1 window of 3
var RUMOR_ACTIONABLE_BOOST = 1000; // actionable reliable rumors always go first
var RUMOR_PERSPECTIVE = /\b(reckons|swears|claims|insists|thinks|says|according to|if you ask|in (?:his|her|their) view|is convinced)\b/i;
var RUMOR_ERRORS = [];

function rumorSeed(text) {
  var h = 2166136261;
  for (var i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  return h >>> 0;
}

function rumorPersonLocation(castId) {
  var member = typeof castById === 'function' ? castById(castId) : null;
  return member ? member.recurringLocations[0] : null;
}

function rumorLocationKnown(id) {
  var lists = [window.LOCATIONS || [], (window.CALC_SUBJECT && CALC_SUBJECT.LOCATIONS) || []];
  if (window.SUBJECTS) Object.keys(SUBJECTS).forEach(function (s) { if (SUBJECTS[s].LOCATIONS) lists.push(SUBJECTS[s].LOCATIONS); });
  return lists.some(function (list) { return list.some(function (l) { return l.id === id; }); });
}

/* Rumor-specific checks on top of the shared world-content contract. */
function validateRumorRecord(r) {
  var errors = [], label = 'rumor:' + (r && r.id);
  if (!r || typeof r !== 'object') return [label + ': invalid record'];
  if (RUMOR_RELIABILITY.indexOf(r.reliability) < 0) errors.push(label + ': unknown reliability ' + r.reliability);
  if (typeof r.text !== 'string' || r.text.trim().length < 30) errors.push(label + ': text missing or too short');
  var speakers = r.speakers || [], places = r.anyoneAt || [];
  if (!Array.isArray(speakers) || !Array.isArray(places)) errors.push(label + ': speakers/anyoneAt must be lists');
  if (!speakers.length && !places.length) errors.push(label + ': nobody can tell it');
  speakers.forEach(function (id) { if (typeof castById !== 'function' || !castById(id)) errors.push(label + ': unknown speaker ' + id); });
  places.forEach(function (id) { if (!rumorLocationKnown(id)) errors.push(label + ': unknown location ' + id); });
  if (r.about !== undefined && !(typeof castById === 'function' && castById(r.about)) && !validateWorldFactId(r.about)) {
    errors.push(label + ': about must be a cast ID or fact ID');
  }
  if (speakers.indexOf(r.about) >= 0) errors.push(label + ': a speaker cannot gossip about themselves');
  (r.resolvedBy || []).forEach(function (f) { if (!validateWorldFactId(f)) errors.push(label + ': unknown resolvedBy fact ' + f); });
  if (r.fact !== undefined) {
    if (r.reliability !== 'reliable') errors.push(label + ': only reliable rumors assert a fact');
    if (!validateWorldFactId(r.fact)) errors.push(label + ': unknown fact ' + r.fact);
  }
  if (r.actionable && r.reliability !== 'reliable') errors.push(label + ': only reliable rumors are actionable');
  if (r.reliability === 'biased' && !RUMOR_PERSPECTIVE.test(r.text || '')) errors.push(label + ': biased text must be framed as perspective');
  return errors;
}

function registerRumor(record) {
  var errors = validateRumorRecord(record);
  if (!errors.length) errors = registerWorldContent('rumor', record);
  RUMOR_ERRORS = RUMOR_ERRORS.concat(errors);
  return errors;
}

function validateRumors() { return RUMOR_ERRORS.slice(); }

function rumorResolved(r) {
  return worldHas('resolved', 'rumor', r.id) || (r.resolvedBy || []).some(worldFact);
}

function rumorSpeakerAllowed(r, castId, location) {
  if ((r.speakers || []).indexOf(castId) >= 0) return true;
  var at = location || rumorPersonLocation(castId);
  return (r.anyoneAt || []).indexOf(at) >= 0 && r.about !== castId;
}

/* Read-only: everything this person could pass on right now. A reliable rumor
   whose fact is not true is withheld rather than told wrong. */
function rumorsFor(castId, options) {
  options = options || {};
  if (!S || !castId) return [];
  return worldContentList('rumor').filter(function (r) {
    if (!rumorSpeakerAllowed(r, castId, options.location)) return false;
    if (rumorResolved(r)) return false;
    if (r.fact && !worldFact(r.fact)) return false;
    return worldConditionMet(r.when);
  });
}

function rumorRank(r) { return (Number(r.priority) || 0) + (r.actionable ? RUMOR_ACTIONABLE_BOOST : 0); }

/* Read-only and deterministic. Returns { rumor, repeat } or null. */
function pickRumor(castId, options) {
  var list = rumorsFor(castId, options);
  if (!list.length) return null;
  var slot = Math.floor(worldClock() / RUMOR_WINDOW);
  var unseen = list.filter(function (r) { return !worldHas('seen', 'rumor', r.id); });
  var pool = unseen, repeat = false;
  if (!pool.length) {
    if (rumorSeed(castId + "#" + slot) % RUMOR_REPEAT_EVERY) return null;
    pool = list; repeat = true;
  }
  var top = Math.max.apply(null, pool.map(rumorRank));
  var best = pool.filter(function (r) { return rumorRank(r) === top; }).sort(function (a, b) { return a.id.localeCompare(b.id); });
  return { rumor: best[rumorSeed(castId + ":" + slot) % best.length], repeat: repeat };
}

/* The only writer. Call it from an explicit conversation, never a render. */
function hearRumor(castId, options) {
  if (!S) return null;
  worldContentList('rumor').forEach(function (r) {
    if (worldHas('seen', 'rumor', r.id) && !worldHas('resolved', 'rumor', r.id) && (r.resolvedBy || []).some(worldFact)) {
      worldMark('resolved', 'rumor', r.id);
    }
  });
  var pick = pickRumor(castId, options);
  if (!pick) return null;
  worldMark('seen', 'rumor', pick.rumor.id);
  return pick;
}

var RUMOR_LABEL = { reliable: 'Heard around', biased: 'Someone\'s take', flavor: 'Idle talk' };

/* Hears a rumor and returns a small aside for a talk modal, or ''. */
function rumorAsideHtml(castId, options) {
  var pick = hearRumor(castId, options);
  if (!pick) return '';
  var r = pick.rumor;
  return '<div class="rumor-aside rumor-' + r.reliability + '" data-rumor="' + esc(r.id) + '"><b>' +
    esc(RUMOR_LABEL[r.reliability]) + (pick.repeat ? ' (again)' : '') + '.</b> ' + esc(r.text) + '</div>';
}
