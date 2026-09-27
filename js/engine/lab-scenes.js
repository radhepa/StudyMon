/* Lab cutscenes: an opening scene plays when a Side Quest is opened from the
   board for the first time, before the lab loads, and a closing scene plays the
   moment every test passes, where the giver hands the reward over in person.

   Scenes are data (js/data/lab-scenes.js). This file only plays them:
     startSideQuest(id)            board entry; opening scene first, then the lab
     playLabScene(id, kind, opts)  kind 'open' or 'close'; opts.onDone runs after
     labSceneAfterClaim(id)        the closing scene, called by a successful claim
     labSceneStrip(id)             replay buttons on the quest page

   Watching a scene never grants, withholds or changes a reward; the claim in
   js/engine/side-quests.js has already been saved by the time the handover
   beat plays. Seen scenes live in S.labScenes and only decide what autoplays. */
var LAB_SCENE = null;
var LAB_SCENE_TYPE_MS = 18;

function ensureLabScenes() {
  if (!S.labScenes || typeof S.labScenes !== 'object' || Array.isArray(S.labScenes)) S.labScenes = { version: 1, seen: {} };
  if (!S.labScenes.seen || typeof S.labScenes.seen !== 'object' || Array.isArray(S.labScenes.seen)) S.labScenes.seen = {};
  S.labScenes.version = 1;
  return S.labScenes;
}
function labSceneData(id, kind) {
  var scenes = (window.LAB_SCENES || {})[id];
  var scene = scenes && scenes[kind];
  return scene && Array.isArray(scene.beats) && scene.beats.length ? scene : null;
}
function labSceneSeen(id, kind) {
  var record = ensureLabScenes().seen[id];
  return !!(record && record[kind]);
}
function markLabSceneSeen(id, kind) {
  var state = ensureLabScenes();
  var record = state.seen[id] && typeof state.seen[id] === 'object' ? state.seen[id] : (state.seen[id] = {});
  if (!record[kind]) { record[kind] = Date.now(); questPersist(); }
}

/* ---- who is speaking ----------------------------------------------------- */

function labSpeaker(who) {
  if (who === 'you') return { id: 'you', name: 'You', role: '', portrait: '', you: true };
  if (who === 'narrator') return { id: 'narrator', name: '', role: '', portrait: '', narrator: true };
  var cast = (window.LAB_SCENE_CAST || {})[who];
  return cast ? { id: who, name: cast.name, role: cast.role, portrait: cast.portrait } : { id: who, name: who, role: '', portrait: '' };
}
/* Hearts with this person, read-only. Anyone the friendship system does not
   track counts as a stranger. */
function labSceneHearts(who) {
  var f = S.friends && S.friends[who];
  return f && typeof f.points === 'number' ? Math.floor(f.points / 100) : 0;
}
/* How the finished quest went, the same coarse reading the story framing
   uses: any failed submission first means persisted, opened hints means
   guided, otherwise independent. */
function labSceneOutcome(id) {
  var p = sideQuestProgress(id);
  if (!p) return 'independent';
  if ((p.attempts || []).some(function (a) { return a && a.complete === false; })) return 'persisted';
  var framing = S.questFraming && S.questFraming.records && S.questFraming.records['frame-' + id];
  if (p.hints > 0 || (framing && framing.guidance)) return 'guided';
  return 'independent';
}
function labBeatText(id, beat) {
  if (beat.outcome && typeof beat.outcome === 'object') {
    var o = labSceneOutcome(id);
    if (beat.outcome[o]) return beat.outcome[o];
  }
  if (beat.warm && labSceneHearts(beat.who) >= (beat.warmAt || 3)) return beat.warm;
  return beat.text;
}

/* ---- the reward handover ------------------------------------------------- */

function labRewardCard(q) {
  var r = q.rewards, p = sideQuestProgress(q.id), items = [];
  items.push('<li class="lab-reward-money"><span class="lab-reward-icon" aria-hidden="true">₵</span><b>' + r.money.toLocaleString() + '</b><small>coins</small></li>');
  r.berries.forEach(function (b) {
    var item = itemById(b.id);
    items.push('<li><span class="lab-reward-icon" aria-hidden="true">' + labItemGlyph(item) + '</span><b>' + b.count + ' × ' + esc(item ? item.name : b.id) + '</b><small>' + esc(item ? titleCase(item.rarity) : '') + '</small></li>');
  });
  if (r.keepsake) {
    var k = typeof collectItem === 'function' ? collectItem(r.keepsake) : null;
    items.push('<li class="lab-reward-keepsake"><span class="lab-reward-icon" aria-hidden="true">' + (k ? k.icon : '🎗') + '</span><b>' + esc(k ? k.name : r.keepsake) + '</b><small>Keepsake · kept in the chest at home</small></li>');
  }
  if (r.pokemon) {
    var mon = dexOf(r.pokemon.id), shiny = !!r.pokemon.shiny;
    var art = shiny ? spriteUrl(r.pokemon.id, 'shiny') : artUrl(r.pokemon.id);
    items.push('<li class="lab-reward-mon' + (shiny ? ' shiny' : '') + '"><img src="' + art + '" alt=""><b>' + (shiny ? 'Shiny ' : '') + esc(titleCase(mon.name)) + '</b><small>Level ' + r.pokemon.level + (p && p.rewardReceipt && p.rewardReceipt.deliveredTo ? ' · sent to your ' + (p.rewardReceipt.deliveredTo === 'box' ? 'PC box' : 'party') : '') + '</small></li>');
  }
  var note = p && p.rewardClaimed ? (LAB_SCENE && LAB_SCENE.replay ? 'Handed over when you finished this job.' : 'Added to your save.') : 'Granted when every test passes.';
  return '<div class="lab-reward" role="group" aria-label="Reward"><p class="lab-reward-head">Reward</p><ul>' + items.join('') + '</ul><p class="lab-reward-note">' + note + '</p></div>';
}
function labItemGlyph(item) {
  if (!item) return '•';
  if (item.category === 'capture') return '◓';
  if (item.kind === 'berry') return '🫐';
  if (item.category === 'medicine') return '✚';
  if (item.category === 'training') return '▲';
  if (item.category === 'evolution') return '◆';
  if (item.category === 'collectible') return '⬡';
  if (item.category === 'gift') return '🎁';
  return '•';
}

/* ---- playing a scene ----------------------------------------------------- */

function playLabScene(id, kind, opts) {
  opts = opts || {};
  var q = questById(id), scene = labSceneData(id, kind);
  if (!q || !scene) { if (opts.onDone) opts.onDone(); return false; }
  closeLabScene(true);
  LAB_SCENE = { id: id, kind: kind, index: 0, scene: scene, onDone: opts.onDone || null, replay: !!opts.replay, typing: null };
  var root = document.getElementById('lab-scene');
  if (!root) {
    root = document.createElement('div');
    root.id = 'lab-scene';
    root.className = 'lab-scene';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    document.body.appendChild(root);
  }
  root.setAttribute('aria-label', (kind === 'open' ? 'Opening scene: ' : 'Closing scene: ') + q.title);
  root.className = 'lab-scene on ' + (kind === 'open' ? 'is-open' : 'is-close');
  document.body.classList.add('lab-scene-open');
  document.addEventListener('keydown', labSceneKey, true);
  renderLabBeat();
  return true;
}
function renderLabBeat() {
  var st = LAB_SCENE; if (!st) return;
  var root = document.getElementById('lab-scene'); if (!root) return;
  var q = questById(st.id), beats = st.scene.beats, beat = beats[st.index];
  var speaker = labSpeaker(beat.who), text = labBeatText(st.id, beat), last = st.index === beats.length - 1;
  var dots = beats.map(function (_, i) { return '<span class="' + (i < st.index ? 'done' : i === st.index ? 'now' : '') + '"></span>'; }).join('');
  var finish = st.kind === 'open' ? (st.replay ? 'Close' : 'Start the lab') : 'Close';
  root.innerHTML =
    '<div class="lab-scene-backdrop" aria-hidden="true"></div>' +
    '<header class="lab-scene-card"><span>' + (st.kind === 'open' ? 'Side Quest' : 'Job complete') + ' · ' + esc(titleCase(q.difficulty)) + (st.scene.place ? ' · ' + esc(st.scene.place) : '') + '</span><h2>' + esc(st.scene.title || q.title) + '</h2></header>' +
    '<div class="lab-scene-stage">' + (beat.reward ? labRewardCard(q) : '') + '</div>' +
    '<section class="lab-scene-box' + (speaker.you ? ' you' : '') + (speaker.narrator ? ' narrator' : '') + (speaker.portrait ? '' : ' no-portrait') + '" onclick="advanceLabScene()">' +
      (speaker.portrait ? '<img class="lab-scene-portrait" src="' + speaker.portrait + '" alt="">' : '') +
      '<div class="lab-scene-copy">' +
        (speaker.narrator ? '' : '<p class="lab-scene-name"><b>' + esc(speaker.name) + '</b>' + (speaker.role ? '<span>' + esc(speaker.role) + '</span>' : '') + '</p>') +
        '<p class="lab-scene-text" aria-live="polite"></p>' +
        '<div class="lab-scene-controls" onclick="event.stopPropagation()">' +
          '<div class="lab-scene-dots" role="img" aria-label="Line ' + (st.index + 1) + ' of ' + beats.length + '">' + dots + '</div>' +
          (last ? '' : '<button class="ghost" onclick="skipLabScene()">Skip scene</button>') +
          '<button class="primary" id="lab-scene-next" onclick="advanceLabScene()">' + (last ? finish : 'Next ▸') + '</button>' +
        '</div>' +
      '</div>' +
    '</section>';
  labTypeText(root.querySelector('.lab-scene-text'), text);
  var next = document.getElementById('lab-scene-next');
  if (next) next.focus({ preventScroll: true });
}
/* Letters arrive quickly; a click or key press shows the whole line at once. */
function labTypeText(el, text) {
  var st = LAB_SCENE; if (!st || !el) return;
  if (st.typing) clearInterval(st.typing.timer);
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || typeof LAB_SCENE_TYPE_MS !== 'number' || LAB_SCENE_TYPE_MS <= 0) { el.textContent = text; st.typing = null; return; }
  var shown = 0;
  st.typing = { el: el, text: text, timer: setInterval(function () {
    shown = Math.min(text.length, shown + 2);
    el.textContent = text.slice(0, shown);
    if (shown >= text.length && LAB_SCENE && LAB_SCENE.typing) { clearInterval(LAB_SCENE.typing.timer); LAB_SCENE.typing = null; }
  }, LAB_SCENE_TYPE_MS) };
}
function advanceLabScene() {
  var st = LAB_SCENE; if (!st) return;
  if (st.typing) { clearInterval(st.typing.timer); st.typing.el.textContent = st.typing.text; st.typing = null; return; }
  if (st.index < st.scene.beats.length - 1) { st.index++; renderLabBeat(); return; }
  finishLabScene();
}
function skipLabScene() { if (LAB_SCENE) finishLabScene(); }
function finishLabScene() {
  var st = LAB_SCENE; if (!st) return;
  if (!st.replay) markLabSceneSeen(st.id, st.kind);
  closeLabScene(false);
  if (st.onDone) st.onDone();
}
function closeLabScene(silent) {
  if (LAB_SCENE && LAB_SCENE.typing) clearInterval(LAB_SCENE.typing.timer);
  LAB_SCENE = null;
  document.removeEventListener('keydown', labSceneKey, true);
  document.body.classList.remove('lab-scene-open');
  var root = document.getElementById('lab-scene');
  if (root) { root.className = 'lab-scene'; root.innerHTML = ''; }
  if (!silent && CUR === 'quests') { var focus = document.getElementById('sq-source') || document.querySelector('#s-quests button'); if (focus) focus.focus({ preventScroll: true }); }
}
/* Enter and Space press whichever scene button has focus (Next, by default);
   the arrow key always moves on and Escape skips. */
function labSceneKey(e) {
  if (!LAB_SCENE) return;
  if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); skipLabScene(); return; }
  var onButton = e.target && e.target.tagName === 'BUTTON';
  if (e.key === 'ArrowRight' || (!onButton && (e.key === 'Enter' || e.key === ' '))) { e.preventDefault(); e.stopPropagation(); advanceLabScene(); }
}

/* ---- where scenes plug into the quest board -------------------------------- */

function startSideQuest(id) {
  var q = questById(id); if (!q) return;
  var p = sideQuestProgress(id);
  if (p.status === 'completed' && labSceneData(id, 'close') && !labSceneSeen(id, 'close')) {
    // Finished before these scenes existed: show the ending the job never had.
    openSideQuest(id);
    playLabScene(id, 'close');
    return;
  }
  if (p.status !== 'completed' && labSceneData(id, 'open') && !labSceneSeen(id, 'open')) {
    playLabScene(id, 'open', { onDone: function () { openSideQuest(id); } });
    return;
  }
  openSideQuest(id);
}
function labSceneAfterClaim(id) {
  if (!labSceneData(id, 'close')) return false;
  return playLabScene(id, 'close');
}
function replayLabScene(id, kind) {
  var p = sideQuestProgress(id);
  if (kind === 'close' && (!p || p.status !== 'completed')) return;
  playLabScene(id, kind, { replay: true });
}
function labSceneStrip(id) {
  var open = labSceneData(id, 'open'), close = labSceneData(id, 'close');
  if (!open && !close) return '';
  var p = sideQuestProgress(id), done = p && p.status === 'completed';
  var giver = open ? labSpeaker(open.beats[0].who) : null;
  return '<div class="lab-scene-strip panel">' +
    (giver && giver.portrait ? '<img src="' + giver.portrait + '" alt="">' : '') +
    '<p><b>Story</b><span>' + (done ? 'You finished this job. Both scenes can be watched again.' : 'The ending plays the moment every test passes.') + '</span></p>' +
    (open ? '<button class="ghost" onclick="replayLabScene(\'' + id + '\',\'open\')">Replay the opening</button>' : '') +
    (close ? '<button class="ghost" ' + (done ? '' : 'disabled title="Finish the lab first" ') + 'onclick="replayLabScene(\'' + id + '\',\'close\')">' + (done ? 'Watch the ending' : 'Ending locked') + '</button>' : '') +
  '</div>';
}

/* ---- audit -------------------------------------------------------------- */

function validateLabScenes() {
  var errors = [], cast = window.LAB_SCENE_CAST || {}, scenes = window.LAB_SCENES || {};
  var portraits = [window.TRAINER_PORTRAITS || {}, window.FOLK_PORTRAITS || {}];
  Object.keys(cast).forEach(function (who) {
    var c = cast[who], painted = portraits.some(function (map) { return map[who] === c.portrait; }) || (window.LEADER_PORTRAITS || {})[c.name] === c.portrait;
    if (!c.name || !c.portrait) errors.push(who + ': cast entry needs a name and a portrait');
    else if (!painted) errors.push(who + ': portrait is not one of the game\'s finished portraits');
  });
  (window.SIDE_QUESTS || []).filter(function (q) { return q.published; }).forEach(function (q) {
    ['open', 'close'].forEach(function (kind) {
      var scene = labSceneData(q.id, kind);
      if (!scene) { errors.push(q.id + ': missing ' + kind + ' scene'); return; }
      if (scene.beats.length < 3) errors.push(q.id + '/' + kind + ': fewer than three beats');
      var speakers = scene.beats.filter(function (b) { return b.who !== 'you' && b.who !== 'narrator'; });
      if (!speakers.length) errors.push(q.id + '/' + kind + ': nobody with a portrait speaks');
      scene.beats.forEach(function (b, i) {
        var where = q.id + '/' + kind + '/' + i + ': ';
        if (b.who !== 'you' && b.who !== 'narrator' && !cast[b.who]) errors.push(where + 'unknown speaker ' + b.who);
        [b.text, b.warm].concat(b.outcome ? [b.outcome.independent, b.outcome.persisted, b.outcome.guided] : []).forEach(function (t) {
          if (t === undefined) return;
          if (typeof t !== 'string' || !t.trim()) errors.push(where + 'empty line');
          else if (/—/.test(t)) errors.push(where + 'em dash in copy');
        });
        if (typeof b.text !== 'string' || !b.text.trim()) errors.push(where + 'needs a default line');
      });
      var rewards = scene.beats.filter(function (b) { return b.reward; }).length;
      if (kind === 'close' && rewards !== 1) errors.push(q.id + '/close: exactly one beat must hand over the reward');
      if (kind === 'open' && rewards) errors.push(q.id + '/open: rewards are only handed over at the end');
    });
  });
  Object.keys(scenes).forEach(function (id) { if (!questById(id)) errors.push(id + ': scene for a quest that does not exist'); });
  return errors;
}
