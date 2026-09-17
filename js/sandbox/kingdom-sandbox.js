/* Kingdom Sandbox: the real Pokemon Kingdom with a throwaway roster and a
   Pokedex to spawn from. Loaded only by kingdom-sandbox.html, after
   kingdom.js and kingdom-travel.js, and it swaps a few of their functions so
   the Kingdom reads this roster instead of the save. */

var SANDBOX_KEY = 'studymon.sandbox.kingdom.v1';
var SANDBOX_DRAG_PX = 6;
var SANDBOX = { mons: [], nextUid: 1, travel: false };
var SANDBOX_PRESS = null;

KINGDOM_TRAVEL_KEY = 'studymon.sandbox.kingdom.travel.v1';
CUR = 'kingdom';

function sandboxLoad() {
  try {
    var saved = JSON.parse(localStorage.getItem(SANDBOX_KEY) || 'null');
    if (saved && saved.mons) SANDBOX = saved;
  } catch (error) { }
  SANDBOX.mons = SANDBOX.mons.filter(function (row) { return row.mon && dexOf(row.mon.id); });
  sandboxSyncState();
}

function sandboxSave() {
  try { localStorage.setItem(SANDBOX_KEY, JSON.stringify(SANDBOX)); } catch (error) { }
}

/* The Kingdom header counts S.party and S.box; playCry checks S.settings. */
function sandboxSyncState() {
  S = S || { settings: { sound: true } };
  S.party = SANDBOX.mons.filter(function (row) { return row.party; }).map(function (row) { return row.mon; });
  S.box = SANDBOX.mons.filter(function (row) { return !row.party; }).map(function (row) { return row.mon; });
  var count = $('#sbx-count');
  if (count) count.textContent = SANDBOX.mons.length + ' in the Kingdom';
}

/* Each spawn keeps its uid as its "slot", so removing one never reshuffles
   the others' itineraries the way a real PC reorder would. */
function sandboxEntry(row) {
  return { mon: row.mon, where: row.party ? 'party' : 'box', index: row.uid };
}

kingdomRoster = function () {
  return SANDBOX.mons.map(sandboxEntry);
};

function sandboxRowFor(entry) {
  for (var i = 0; i < SANDBOX.mons.length; i++) {
    if (SANDBOX.mons[i].uid === entry.index) return SANDBOX.mons[i];
  }
  return null;
}

function sandboxAdd(id) {
  var level = Math.max(1, Math.min(100, parseInt($('#sbx-level').value, 10) || 20));
  var mon = makeMon(id, level, { shiny: $('#sbx-shiny').checked });
  var row = { uid: SANDBOX.nextUid++, party: $('#sbx-party').checked, mon: mon };
  SANDBOX.mons.push(row);
  sandboxSyncState();
  sandboxSave();
  return row;
}

function sandboxRemove(entry) {
  var row = sandboxRowFor(entry);
  if (!row) return;
  SANDBOX.mons.splice(SANDBOX.mons.indexOf(row), 1);
  sandboxSyncState();
  sandboxSave();
  KINGDOM_TRAVEL_DIRTY = true;
  kingdomTravelSave();
}

/* ---- Travel switch ----------------------------------------------------------
   With travel off, every stay lasts for years, so residents stay where they
   were put. Turning it back on gives each one a normal stay from now. */

var SANDBOX_FOREVER = 10 * 365 * 86400000;
var sandboxRealStayMs = kingdomStayMs;
kingdomStayMs = function (key, rand) {
  return SANDBOX.travel ? sandboxRealStayMs(key, rand) : SANDBOX_FOREVER;
};

function sandboxSetTravel(on) {
  SANDBOX.travel = on;
  sandboxSave();
  var store = kingdomTravelLoad();
  var now = Date.now();
  Object.keys(store.mons).forEach(function (key) {
    var st = store.mons[key];
    if (st.trip) return;
    if (!on) st.until = now + SANDBOX_FOREVER;
    else if (st.until - now > KINGDOM_STAY_MAX) {
      st.until = now + sandboxRealStayMs(key, kingdomTravelRand(key, st.n++));
    }
  });
  KINGDOM_TRAVEL_DIRTY = true;
  kingdomTravelSave();
  kingdomSync();
}

function sandboxStartTrips() {
  if (!SANDBOX.mons.length) { toast('Spawn some Pokémon first.'); return; }
  var store = kingdomTravelLoad();
  var now = Date.now();
  Object.keys(store.mons).forEach(function (key) {
    if (!store.mons[key].trip) store.mons[key].until = now;
  });
  KINGDOM_TRAVEL_DIRTY = true;
  kingdomSync();
  toast('Everyone is setting off.');
}

function sandboxClear() {
  if (KINGDOM_CARRY) kingdomReturnCarried();
  SANDBOX.mons = [];
  sandboxSyncState();
  sandboxSave();
  KINGDOM_TRAVEL = { v: 1, mons: {} };
  KINGDOM_TRAVEL_DIRTY = true;
  kingdomTravelSave();
  KINGDOM_INSPECTED = null;
  renderKingdom();
}

/* ---- Spawning ---------------------------------------------------------------- */

/* Click: set it down at a random open spot in the district on screen. */
function sandboxSpawnHere(id) {
  var row = sandboxAdd(id);
  var entry = sandboxEntry(row);
  var location = kingdomLocation(KINGDOM_LOCATION);
  var point = kingdomPoint(Math.random, location);
  kingdomTravelSettle(entry, location.id, point);
  kingdomPlaceActor(entry, { loc: location.id, x: point.x, y: point.y }, location);
  playCry(id);
  kingdomSay(monName(row.mon) + ' appeared in ' + location.name + '.');
}

/* Drag: the new Pokemon hangs from the hand exactly like one picked up in
   town. It has no "from" spot, so cancelling it removes it again. */
function sandboxBeginCarry(id, cx, cy) {
  var row = sandboxAdd(id);
  var entry = sandboxEntry(row);
  var size = 72;
  var el = document.createElement('div');
  el.className = 'kingdom-carry outside';
  el.setAttribute('aria-hidden', 'true');
  el.style.setProperty('--size', size + 'px');
  el.innerHTML = '<img src="' + kingdomSprite(row.mon) +
    '" alt="" draggable="false">' + (row.party ? '<span class="kingdom-party-mark">★</span>' : '');
  document.body.appendChild(el);
  KINGDOM_CARRY = {
    entry: entry, key: kingdomPlacementKey(entry), el: el, from: null,
    size: size, x: cx, y: cy, hoverId: null, hoverAt: 0, timer: 0
  };
  document.documentElement.classList.add('kingdom-carrying');
  kingdomMoveCarry(cx, cy);
  KINGDOM_CARRY.timer = setInterval(kingdomCarryTick, 40);
  playCry(id);
  kingdomSay('Carrying ' + monName(row.mon) + '. Let go in town to set it down.');
}

function sandboxOverDex(cx, cy) {
  var under = document.elementFromPoint(cx, cy);
  return !!(under && under.closest && under.closest('#sandbox-dex'));
}

/* Letting go over the Pokedex removes the Pokemon; anywhere else behaves as
   in the game. */
var sandboxRealPointerUp = kingdomPointerUp;
kingdomPointerUp = function (ev) {
  if (KINGDOM_CARRY && !KINGDOM_GRAB && sandboxOverDex(ev.clientX, ev.clientY)) {
    kingdomSetHandClosed(false);
    var carry = KINGDOM_CARRY;
    kingdomEndCarry();
    sandboxRemove(carry.entry);
    kingdomRefreshCounts();
    kingdomSay(monName(carry.entry.mon) + ' went back into the Pokédex.');
    return;
  }
  sandboxRealPointerUp(ev);
};

var sandboxRealReturnCarried = kingdomReturnCarried;
kingdomReturnCarried = function () {
  var carry = KINGDOM_CARRY;
  if (carry && !carry.from) {
    kingdomEndCarry();
    sandboxRemove(carry.entry);
    kingdomSay(monName(carry.entry.mon) + ' went back into the Pokédex.');
    return;
  }
  sandboxRealReturnCarried();
};

var sandboxRealMoveCarry = kingdomMoveCarry;
kingdomMoveCarry = function (cx, cy) {
  sandboxRealMoveCarry(cx, cy);
  var dex = $('#sandbox-dex');
  if (dex && KINGDOM_CARRY) dex.classList.toggle('release-hover', sandboxOverDex(cx, cy));
};

var sandboxRealEndCarry = kingdomEndCarry;
kingdomEndCarry = function () {
  sandboxRealEndCarry();
  var dex = $('#sandbox-dex');
  if (dex) dex.classList.remove('release-hover');
};

/* The details card gets a Remove button. */
var sandboxRealInspect = kingdomInspect;
kingdomInspect = function (actor) {
  sandboxRealInspect(actor);
  var body = $('#kingdom-inspector > div');
  if (!body) return;
  var button = document.createElement('button');
  button.type = 'button';
  button.className = 'sbx-remove';
  button.textContent = 'Remove from Kingdom';
  button.onclick = function () {
    if (KINGDOM_ACTORS.indexOf(actor) < 0) return;
    kingdomRemoveActor(actor);
    sandboxRemove(actor.entry);
    kingdomRefreshCounts();
    kingdomSay(monName(actor.entry.mon) + ' went back into the Pokédex.');
  };
  body.appendChild(button);
};

/* ---- Pokedex list ------------------------------------------------------------ */

function sandboxDexHtml(d) {
  return '<div class="sbx-mon" role="listitem" data-id="' + d.id + '" title="Drag into the Kingdom, or click to drop it here">' +
    '<img src="' + spriteUrl(d.id, 'front') + '" alt="" loading="lazy" draggable="false">' +
    '<span class="sbx-name"><small>#' + String(d.id).padStart(4, '0') + '</small>' +
    esc(titleCase(d.name)) + '</span>' +
    '<span class="sbx-types">' + typePillsInline(d.types) + '</span></div>';
}

function sandboxRenderDex() {
  var query = $('#sbx-search').value.trim().toLowerCase().replace(/^#/, '');
  var type = $('#sbx-type').value;
  var number = /^\d+$/.test(query) ? parseInt(query, 10) : 0;
  var rows = DEX.filter(function (d) {
    if (type && d.types.indexOf(type) < 0) return false;
    if (!query) return true;
    if (number) return String(d.id).indexOf(String(number)) === 0;
    return d.name.indexOf(query.replace(/\s+/g, '-')) >= 0 || titleCase(d.name).toLowerCase().indexOf(query) >= 0;
  });
  var list = $('#sbx-list');
  list.innerHTML = rows.length ? rows.map(sandboxDexHtml).join('') :
    '<p class="sbx-none">No Pokémon match that search.</p>';
  list.scrollTop = 0;
}

function sandboxFillTypes() {
  var seen = {};
  DEX.forEach(function (d) { d.types.forEach(function (t) { seen[t] = true; }); });
  $('#sbx-type').innerHTML += Object.keys(seen).sort().map(function (t) {
    return '<option value="' + t + '">' + titleCase(t) + '</option>';
  }).join('');
}

function sandboxBindDex() {
  var list = $('#sbx-list');
  list.addEventListener('pointerdown', function (ev) {
    if (ev.pointerType === 'mouse' && ev.button !== 0) return;
    var card = ev.target.closest('.sbx-mon');
    if (!card || KINGDOM_CARRY) return;
    if (ev.pointerType === 'mouse') ev.preventDefault();
    SANDBOX_PRESS = { id: parseInt(card.getAttribute('data-id'), 10), x: ev.clientX, y: ev.clientY, pointerId: ev.pointerId };
  });
  window.addEventListener('pointermove', function (ev) {
    var press = SANDBOX_PRESS;
    if (!press || ev.pointerId !== press.pointerId) return;
    if (Math.abs(ev.clientX - press.x) + Math.abs(ev.clientY - press.y) < SANDBOX_DRAG_PX) return;
    SANDBOX_PRESS = null;
    sandboxBeginCarry(press.id, ev.clientX, ev.clientY);
  });
  window.addEventListener('pointerup', function (ev) {
    var press = SANDBOX_PRESS;
    SANDBOX_PRESS = null;
    if (press && ev.pointerId === press.pointerId && !KINGDOM_CARRY) sandboxSpawnHere(press.id);
  });
  window.addEventListener('pointercancel', function () { SANDBOX_PRESS = null; });

  var timer = 0;
  $('#sbx-search').addEventListener('input', function () {
    clearTimeout(timer);
    timer = setTimeout(sandboxRenderDex, 120);
  });
  $('#sbx-type').addEventListener('change', sandboxRenderDex);
  $('#sbx-travel').addEventListener('change', function (ev) { sandboxSetTravel(ev.target.checked); });
  $('#sbx-trips').addEventListener('click', sandboxStartTrips);
  $('#sbx-clear').addEventListener('click', function () {
    if (!SANDBOX.mons.length || confirm('Remove all ' + SANDBOX.mons.length + ' Pokémon from the sandbox Kingdom?')) sandboxClear();
  });
}

sandboxLoad();
$('#sbx-travel').checked = SANDBOX.travel;
sandboxFillTypes();
sandboxRenderDex();
sandboxBindDex();
renderKingdom();
