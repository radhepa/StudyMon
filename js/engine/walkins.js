/* Phase 7 Slice 5: walk-in scenes and NPC-to-NPC relationship threads.

   A walk-in is a short scene the player can come across at a place they
   already visit: two people who know each other, getting on with their lives.
   It is offered as a card in that place's directory, and watching it is
   optional - nothing is lost by walking past, no friendship changes, and no
   educational activity is asked for.

   Threads connect walk-ins between the same people over time. A thread lists
   ordered stage IDs; each walk-in that carries `thread` + `stage` moves the
   thread to that stage when it is watched to the end. The current stage is
   derived from resolved walk-ins (world fact `thread-at:<thread>:<stage>`), so
   rumors, letters and later walk-ins can react to it with no extra counter.

   Scheduling rules (all read-only until the player acts):
   - Priority: a scene the player walked away from mid-way ("interrupted",
     seen but not resolved) is offered again first; otherwise highest
     `priority`, then ID.
   - One scene per place at a time.
   - Mutual exclusion: a person is in at most one offered scene anywhere.
   - Deferral: a thread's next stage waits until the previous stage has been
     resolved for `minGap` answered questions (default WALKIN_THREAD_GAP), and
     until at least one of its people has been met; nobody walks in on a
     stranger.
   - Interruption/resume: stepping away keeps the scene seen-but-unresolved;
     it restarts from its first beat next time (scenes are a few beats). */

var WALKIN_THREAD_GAP = 15;
var WALKIN_ERRORS = [];

function validateThreadRecord(t) {
  var errors = [], label = 'thread:' + (t && t.id);
  if (!t || typeof t !== 'object') return [label + ': invalid record'];
  if (!Array.isArray(t.people) || t.people.length < 2) errors.push(label + ': a thread needs at least two people');
  else t.people.forEach(function (id) { if (!castById(id)) errors.push(label + ': unknown person ' + id); });
  if (!Array.isArray(t.stages) || !t.stages.length) errors.push(label + ': no stages');
  else {
    t.stages.forEach(function (s) { if (!WORLD_ID_PATTERN.test(String(s))) errors.push(label + ': invalid stage ' + s); });
    if (new Set(t.stages).size !== t.stages.length) errors.push(label + ': duplicate stage');
  }
  if (typeof t.title !== 'string' || !t.title.trim()) errors.push(label + ': missing title');
  return errors;
}

function registerThread(record) {
  var errors = validateThreadRecord(record);
  if (!errors.length) errors = registerWorldContent('thread', record);
  WALKIN_ERRORS = WALKIN_ERRORS.concat(errors);
  return errors;
}

function walkinLocationOk(id) {
  /* Bootstrap Town is the walkable town, which has no directory to host a
     walk-in card yet; every other place (either region) does. */
  return id !== 'town' && typeof rumorLocationKnown === 'function' && rumorLocationKnown(id);
}

function validateWalkinRecord(w) {
  var errors = [], label = 'walkin:' + (w && w.id);
  if (!w || typeof w !== 'object') return [label + ': invalid record'];
  if (!walkinLocationOk(w.location)) errors.push(label + ': location must be a directory place, not ' + w.location);
  if (!Array.isArray(w.people) || !w.people.length) errors.push(label + ': nobody walks in');
  else w.people.forEach(function (id) { if (!castById(id)) errors.push(label + ': unknown person ' + id); });
  if (typeof w.title !== 'string' || w.title.trim().length < 4) errors.push(label + ': missing title');
  if (!Array.isArray(w.beats) || w.beats.length < 2) errors.push(label + ': needs at least two beats');
  else w.beats.forEach(function (b, i) {
    if (!b || typeof b.text !== 'string' || b.text.trim().length < 20) errors.push(label + ': beat ' + (i + 1) + ' is too short');
    if (b && b.who !== undefined && (w.people || []).indexOf(b.who) < 0) errors.push(label + ': beat ' + (i + 1) + ' speaker is not in the scene');
  });
  if (w.thread !== undefined || w.stage !== undefined) {
    var t = WORLD_CONTENT['thread:' + w.thread];
    if (!t) errors.push(label + ': unknown thread ' + w.thread);
    else {
      if (t.stages.indexOf(w.stage) < 0) errors.push(label + ': unknown stage ' + w.stage);
      (t.people || []).forEach(function (id) { if ((w.people || []).indexOf(id) < 0) errors.push(label + ': thread person ' + id + ' is missing'); });
      var taken = Object.keys(WORLD_CONTENT).some(function (key) {
        var o = WORLD_CONTENT[key];
        return o.kind === 'walkin' && o.thread === w.thread && o.stage === w.stage;
      });
      if (taken) errors.push(label + ': stage ' + w.stage + ' already has a scene');
    }
  }
  if (w.minGap !== undefined && !(Number(w.minGap) >= 0)) errors.push(label + ': invalid minGap');
  return errors;
}

function registerWalkin(record) {
  var errors = validateWalkinRecord(record);
  if (!errors.length) errors = registerWorldContent('walkin', record);
  WALKIN_ERRORS = WALKIN_ERRORS.concat(errors);
  return errors;
}

/* Stages the validator could not see (a thread with a stage but no scene). */
function validateWalkins() {
  var errors = WALKIN_ERRORS.slice();
  worldContentList('thread').forEach(function (t) {
    t.stages.forEach(function (stage) {
      var has = worldContentList('walkin').some(function (w) { return w.thread === t.id && w.stage === stage; });
      if (!has) errors.push('thread:' + t.id + ': stage ' + stage + ' has no scene');
    });
  });
  return errors;
}

function threadStage(threadId) {
  var t = worldContent('thread', threadId), i = worldThreadIndex(threadId);
  return t && i >= 0 ? t.stages[i] : null;
}

function walkinState(w) {
  if (worldHas('resolved', 'walkin', w.id)) return 'resolved';
  if (worldHas('seen', 'walkin', w.id)) return 'interrupted';
  return 'new';
}

/* Read-only: can this scene happen now, ignoring other scenes? */
function walkinReady(w) {
  if (!S || !w || worldHas('resolved', 'walkin', w.id)) return false;
  if (!w.people.some(function (id) { return worldFact('met:' + id); })) return false;
  if (w.thread) {
    var t = worldContent('thread', w.thread), want = t.stages.indexOf(w.stage), at = worldThreadIndex(w.thread);
    if (at !== want - 1) return false;
    if (want > 0) {
      var prev = worldContentList('walkin').filter(function (o) { return o.thread === w.thread && o.stage === t.stages[want - 1]; })[0];
      var since = worldClock() - (worldStamp('resolved', 'walkin', prev.id) || 0);
      var gap = w.minGap !== undefined ? Number(w.minGap) : WALKIN_THREAD_GAP;
      if (since < gap) return false;
    }
  }
  if (w.location && typeof LOCATIONS !== 'undefined') {
    var place = (LOCATIONS || []).filter(function (l) { return l.id === w.location; })[0];
    if (!place || (typeof locationOpen === 'function' && !locationOpen(place))) return false;
  }
  return worldConditionMet(w.when);
}

/* Read-only: location -> offered scene, applying priority and exclusion. */
function walkinOffers() {
  var ready = worldContentList('walkin').filter(walkinReady);
  var rank = function (w) { return (walkinState(w) === 'interrupted' ? 1e6 : 0) + (Number(w.priority) || 0); };
  ready.sort(function (a, b) { return rank(b) - rank(a) || a.id.localeCompare(b.id); });
  var offers = {}, busy = {};
  ready.forEach(function (w) {
    if (offers[w.location]) return;
    if (w.people.some(function (id) { return busy[id]; })) return;
    offers[w.location] = w;
    w.people.forEach(function (id) { busy[id] = true; });
  });
  return offers;
}

function walkinAt(location) { return walkinOffers()[location] || null; }

function walkinNames(w) {
  var names = w.people.map(function (id) { return castById(id).name; });
  return names.length > 1 ? names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1] : names[0];
}

/* Read-only directory card. */
function walkinCardHtml(location) {
  var w = walkinAt(location);
  if (!w) return '';
  var state = walkinState(w);
  return '<article class="town-card walkin-card" data-walkin="' + esc(w.id) + '">' +
    '<div class="town-head"><span class="town-cls">Something is going on</span></div>' +
    '<h3>' + esc(w.title) + '</h3><p class="small">' + esc(walkinNames(w)) + '</p>' +
    '<p class="town-note">Watching is optional. Nothing is lost by leaving them to it.</p>' +
    '<button onclick="openWalkin(\'' + w.id + '\')">' + (state === 'interrupted' ? 'Keep watching' : 'Watch') + '</button></article>';
}

function openWalkin(id) {
  var w = worldContent('walkin', id);
  if (!w || walkinAt(w.location) !== w) return false;
  if (typeof B !== 'undefined' && B && !B.over) { toast('That can wait until the battle is over.'); return false; }
  if (worldMark('seen', 'walkin', id)) saveGame();
  walkinBeat(id, 0);
  return true;
}

function walkinBeat(id, index) {
  var w = worldContent('walkin', id);
  if (!w) return;
  index = Math.max(0, Math.min(w.beats.length - 1, Math.floor(Number(index) || 0)));
  var beat = w.beats[index], last = index === w.beats.length - 1;
  var who = beat.who ? castById(beat.who) : null;
  modal('<article class="walkin-scene"><span class="eyebrow">' + esc(w.title) + ' · ' + (index + 1) + '/' + w.beats.length + '</span>' +
    (who ? '<h3>' + esc(who.name) + '</h3>' : '') +
    '<p class="scene-prose">' + esc(beat.text) + '</p>' +
    '<div class="row" style="justify-content:center;margin-top:12px">' +
    (last ? '<button class="primary" onclick="finishWalkin(\'' + id + '\')">' + esc(w.close || 'Leave them to it') + '</button>'
          : '<button class="primary" onclick="walkinBeat(\'' + id + '\',' + (index + 1) + ')">Keep watching</button>' +
            '<button class="ghost" onclick="closeModal()">Step away</button>') +
    '</div></article>');
}

function finishWalkin(id) {
  var w = worldContent('walkin', id);
  if (w && worldHas('seen', 'walkin', id) && worldMark('resolved', 'walkin', id)) saveGame();
  closeModal();
  if (typeof renderTown === 'function' && typeof CUR !== 'undefined' && CUR === 'town') renderTown();
}
