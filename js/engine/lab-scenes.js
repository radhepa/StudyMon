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
  var framing = S.questFraming && S.questFraming.records && S.questFraming.records[id];
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

/* Keep one thought on screen at a time, including friendship/outcome variants.
   Prefer sentence boundaries; a long sentence can still wrap at a word. */
function labTextPages(text) {
  var words = String(text || '').trim().split(/\s+/), pages = [], line = '';
  words.forEach(function (word) {
    if (line && (line.length + word.length > 210 || (line.length > 120 && /[.!?]["']?$/.test(line)))) {
      pages.push(line); line = '';
    }
    line += (line ? ' ' : '') + word;
  });
  if (line) pages.push(line);
  return pages.length ? pages : [''];
}

/* ---- the reward handover ------------------------------------------------- */

function labRewardCard(q) {
  var r = q.rewards, p = sideQuestProgress(q.id), items = [];
  items.push('<li class="lab-reward-money"><span class="lab-reward-icon" aria-hidden="true">' + labRewardGlyph('coin') + '</span><b>' + r.money.toLocaleString() + '</b><small>coins</small></li>');
  r.berries.forEach(function (b) {
    var item = itemById(b.id);
    items.push('<li><span class="lab-reward-icon" aria-hidden="true">' + labItemGlyph(item) + '</span><b>' + b.count + ' × ' + esc(item ? item.name : b.id) + '</b><small>' + esc(item ? titleCase(item.rarity) : '') + '</small></li>');
  });
  // The quest's own keepsake, then any first-job or set-complete keepsake this claim unlocked.
  var extra = p && p.rewardReceipt && Array.isArray(p.rewardReceipt.keepsakes) ? p.rewardReceipt.keepsakes : [];
  [r.keepsake].concat(extra).filter(function (id, i, all) { return id && all.indexOf(id) === i; }).forEach(function (id) {
    var k = typeof collectItem === 'function' ? collectItem(id) : null;
    items.push('<li class="lab-reward-keepsake"><span class="lab-reward-icon" aria-hidden="true">' + labRewardGlyph('keepsake') + '</span><b>' + esc(k ? k.name : id) + '</b><small>' + (id === r.keepsake ? 'Keepsake' : 'Bonus keepsake') + ' · in the chest at home</small></li>');
  });
  if (r.pokemon) {
    var mon = dexOf(r.pokemon.id), shiny = !!r.pokemon.shiny;
    var art = shiny ? spriteUrl(r.pokemon.id, 'shiny') : artUrl(r.pokemon.id);
    items.push('<li class="lab-reward-mon' + (shiny ? ' shiny' : '') + '"><img src="' + art + '" alt=""><b>' + (shiny ? 'Shiny ' : '') + esc(titleCase(mon.name)) + '</b><small>Level ' + r.pokemon.level + (p && p.rewardReceipt && p.rewardReceipt.deliveredTo ? ' · sent to your ' + (p.rewardReceipt.deliveredTo === 'box' ? 'PC box' : 'party') : '') + '</small></li>');
  }
  var note = p && p.rewardClaimed ? (LAB_SCENE && LAB_SCENE.replay ? 'Handed over when you finished this job.' : 'Packed for your next adventure.') : 'Granted when every test passes.';
  return '<div class="lab-reward" role="group" aria-label="Reward" tabindex="0"><p class="lab-reward-head">' + (LAB_SCENE && LAB_SCENE.replay ? 'A favour remembered' : 'With thanks') + '</p><ul>' + items.join('') + '</ul><p class="lab-reward-note">' + note + '</p></div>';
}
/* Small brass line icons share one weight and palette on every platform. */
function labRewardGlyph(kind) {
  var paths = {
    coin: '<circle cx="12" cy="12" r="9"/><path d="M15 8c-5-3-9 5-3 8h3M12 5v14"/>',
    berry: '<path d="M12 9c-8-5-12 7-4 11 2 1 3 0 4 0s2 1 4 0c8-4 4-16-4-11Zm0 0c-1-5 2-7 6-7-1 4-3 6-6 6Z"/>',
    capture: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M3 12h6m6 0h6"/>',
    medicine: '<path d="M8 3h8v4H8zM9 7v3l-3 3v7h12v-7l-3-3V7M9 16h6m-3-3v6"/>',
    training: '<path d="m12 3 3 6 6 3-6 3-3 6-3-6-6-3 6-3Z"/>',
    evolution: '<path d="m8 3 8 2 4 9-8 8-8-8Zm0 0 4 19 4-17M4 14h16"/>',
    keepsake: '<circle cx="12" cy="9" r="6"/><path d="m8 14-2 8 6-3 6 3-2-8M10 9h4m-2-2v4"/>',
    gift: '<path d="M3 9h18v4H3zM5 13v8h14v-8M12 9v12M12 9C2 8 6 0 12 9Zm0 0c10-1 6-9 0 0Z"/>'
  };
  return '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (paths[kind] || paths.keepsake) + '</svg>';
}
function labItemGlyph(item) {
  return labRewardGlyph(item && item.kind === 'berry' ? 'berry' : item && item.category);
}

/* ---- playing a scene ----------------------------------------------------- */

function playLabScene(id, kind, opts) {
  opts = opts || {};
  var q = questById(id), scene = labSceneData(id, kind);
  if (!q || !scene) { if (opts.onDone) opts.onDone(); return false; }
  closeLabScene(true);
  LAB_SCENE = { id: id, kind: kind, index: 0, page: 0, scene: scene, onDone: opts.onDone || null, replay: !!opts.replay, typing: null,
    returnFocus: document.activeElement, pages: scene.beats.map(function (beat) { return labTextPages(labBeatText(id, beat)); }), inert: [] };
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
  var setting = (window.LAB_SCENE_SETTINGS || {})[scene.setting] || {};
  root.innerHTML = '<div class="lab-scene-backdrop" aria-hidden="true"></div>' +
    '<div class="lab-scene-frame">' +
    '<header class="lab-scene-card"><span class="lab-scene-chapter">' + (opts.replay ? 'A story revisited' : kind === 'open' ? 'A favour to ask' : 'A favour returned') +
    '</span><h2>' + esc(scene.title || q.title) + '</h2><p class="lab-scene-place">' + esc(scene.place || q.giver) + '</p></header>' +
    '<div class="lab-scene-stage"></div><div class="lab-scene-dialogue"></div></div>';
  var backdrop = root.querySelector('.lab-scene-backdrop');
  if (setting.image) backdrop.style.backgroundImage = 'url("' + setting.image + '")';
  if (setting.size) backdrop.style.backgroundSize = setting.size;
  if (setting.position) backdrop.style.backgroundPosition = setting.position;
  root.dataset.setting = scene.setting || '';
  Array.prototype.forEach.call(document.body.children, function (el) {
    if (el === root || /^(SCRIPT|STYLE|LINK)$/.test(el.tagName)) return;
    LAB_SCENE.inert.push({ el: el, value: el.inert }); el.inert = true;
  });
  document.body.classList.add('lab-scene-open');
  document.addEventListener('keydown', labSceneKey, true);
  renderLabBeat();
  return true;
}
function renderLabBeat() {
  var st = LAB_SCENE; if (!st) return;
  var root = document.getElementById('lab-scene'); if (!root) return;
  var q = questById(st.id), beats = st.scene.beats, beat = beats[st.index];
  var speaker = labSpeaker(beat.who), text = st.pages[st.index][st.page];
  var last = st.index === beats.length - 1 && st.page === st.pages[st.index].length - 1;
  var current = st.page + 1, total = 0;
  st.pages.forEach(function (pages, i) { total += pages.length; if (i < st.index) current += pages.length; });
  var finish = st.kind === 'open' ? (st.replay ? 'Back to the quest' : 'Start the lab') : 'Back to the quest';
  root.classList.toggle('has-reward', !!beat.reward);
  var stage = root.querySelector('.lab-scene-stage');
  if (stage.dataset.reward !== String(!!beat.reward)) {
    var setting = (window.LAB_SCENE_SETTINGS || {})[st.scene.setting] || {};
    stage.innerHTML = beat.reward ? labRewardCard(q) : '<p class="lab-scene-atmosphere">' + esc(st.scene.atmosphere || setting[st.kind] || '') + '</p>';
    stage.dataset.reward = String(!!beat.reward);
  }
  root.querySelector('.lab-scene-dialogue').innerHTML =
    '<section class="lab-scene-box' + (speaker.you ? ' you' : '') + (speaker.narrator ? ' narrator' : '') + (speaker.portrait ? '' : ' no-portrait') + '" onclick="advanceLabScene()">' +
      (speaker.portrait ? '<img class="lab-scene-portrait" src="' + speaker.portrait + '" alt="">' : '') +
      '<div class="lab-scene-copy">' +
        (speaker.narrator ? '' : '<p class="lab-scene-name"><b>' + esc(speaker.name) + '</b>' + (speaker.role ? '<span>' + esc(speaker.role) + '</span>' : '') + '</p>') +
        '<div class="lab-scene-line"><p class="lab-scene-text-reserve" aria-hidden="true">' + esc(text) + '</p><p class="lab-scene-text" aria-hidden="true"></p></div>' +
        '<p class="sr-only" role="status">' + esc((speaker.name ? speaker.name + ': ' : '') + text) + '</p>' +
        '<div class="lab-scene-controls" onclick="event.stopPropagation()">' +
          '<span class="lab-scene-progress" aria-label="Page ' + current + ' of ' + total + '">' + current + ' <span>/ ' + total + '</span></span>' +
          '<button class="ghost lab-scene-back" onclick="previousLabScene()"' + (current === 1 ? ' disabled' : '') + '>Back</button>' +
          (last ? '' : '<button class="ghost lab-scene-skip" onclick="skipLabScene()">Skip scene</button>') +
          '<button class="primary" id="lab-scene-next" onclick="advanceLabScene()" data-label="' + (last ? finish : 'Continue') + '">' + (last ? finish : 'Continue') + '</button>' +
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
    if (shown >= text.length && LAB_SCENE && LAB_SCENE.typing) labFinishTyping();
  }, LAB_SCENE_TYPE_MS) };
  var next = document.getElementById('lab-scene-next');
  if (next) next.textContent = 'Show line';
}
function labFinishTyping() {
  var st = LAB_SCENE; if (!st || !st.typing) return;
  clearInterval(st.typing.timer); st.typing.el.textContent = st.typing.text; st.typing = null;
  var next = document.getElementById('lab-scene-next');
  if (next) next.textContent = next.dataset.label;
}
function previousLabScene() {
  var st = LAB_SCENE; if (!st || (!st.index && !st.page)) return;
  labFinishTyping();
  if (st.page > 0) st.page--;
  else { st.index--; st.page = st.pages[st.index].length - 1; }
  renderLabBeat();
}
function advanceLabScene() {
  var st = LAB_SCENE; if (!st) return;
  if (st.typing) { labFinishTyping(); return; }
  if (st.page < st.pages[st.index].length - 1) { st.page++; renderLabBeat(); return; }
  if (st.index < st.scene.beats.length - 1) { st.index++; st.page = 0; renderLabBeat(); return; }
  finishLabScene();
}
function skipLabScene() { if (LAB_SCENE) finishLabScene(); }
function finishLabScene() {
  var st = LAB_SCENE; if (!st) return;
  if (!st.replay) markLabSceneSeen(st.id, st.kind);
  closeLabScene(false);
  if (st.onDone) {
    st.onDone();
    var editor = document.getElementById('sq-source');
    if (editor) editor.focus({ preventScroll: true });
  }
}
function closeLabScene(silent) {
  var st = LAB_SCENE;
  if (st && st.typing) clearInterval(st.typing.timer);
  if (st) st.inert.forEach(function (entry) { entry.el.inert = entry.value; });
  LAB_SCENE = null;
  document.removeEventListener('keydown', labSceneKey, true);
  document.body.classList.remove('lab-scene-open');
  var root = document.getElementById('lab-scene');
  if (root) { root.className = 'lab-scene'; root.innerHTML = ''; }
  if (!silent) {
    var focus = st && st.returnFocus && st.returnFocus.isConnected && st.returnFocus !== document.body ? st.returnFocus : document.getElementById('sq-source') || document.querySelector('#s-quests button');
    if (focus) focus.focus({ preventScroll: true });
  }
}
/* Enter/Space activate the focused button; arrows review/advance, Escape
   skips, and Tab stays inside the scene until it closes. */
function labSceneKey(e) {
  if (!LAB_SCENE) return;
  if (e.key === 'Tab') {
    var controls = Array.prototype.slice.call(document.querySelectorAll('#lab-scene button:not(:disabled), #lab-scene [tabindex="0"]'));
    var at = controls.indexOf(document.activeElement);
    if ((e.shiftKey && at <= 0) || (!e.shiftKey && (at < 0 || at === controls.length - 1))) {
      e.preventDefault(); controls[e.shiftKey ? controls.length - 1 : 0].focus();
    }
    e.stopPropagation(); return;
  }
  if (e.repeat && /^(Enter| |ArrowRight|ArrowLeft)$/.test(e.key)) { e.preventDefault(); return; }
  if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); skipLabScene(); return; }
  if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); previousLabScene(); return; }
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
      if (!(window.LAB_SCENE_SETTINGS || {})[scene.setting]) errors.push(q.id + '/' + kind + ': missing painted setting');
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
