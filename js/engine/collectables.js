/* Collectables: the chest, the aquarium and the terrarium.

   This is the system that gives the house a reason to exist. The chest is the
   index - every category, every item, found or not. The aquarium and the
   terrarium are display cases: each one shows a single category as a scene
   rather than a grid, so a filled collection is something you look at instead
   of a percentage you read.

   The full design, including the phase-2 source table, is in COLLECTABLES.md.

   ONE WAY IN. Everything that hands the player a collectable goes through
   collectFind(id). It is idempotent per item for the "first found" record,
   counts duplicates, writes a journal note, and toasts. Nothing else should
   touch S.collection. */

var COLLECT_VERSION = 1;

function collectItem(id) {
  return (window.COLLECT_ITEMS || []).find(function (i) { return i.id === id; }) || null;
}

function collectCategory(id) {
  return (window.COLLECT_CATEGORIES || []).find(function (c) { return c.id === id; }) || null;
}

function collectItemsIn(catId) {
  var order = window.COLLECT_RARITY || {};
  return (window.COLLECT_ITEMS || [])
    .filter(function (i) { return i.cat === catId; })
    .sort(function (a, b) {
      var ra = (order[a.rarity] || {}).order || 0, rb = (order[b.rarity] || {}).order || 0;
      return ra - rb || a.name.localeCompare(b.name);
    });
}

function ensureCollection() {
  if (!S) return null;
  if (!S.collection || typeof S.collection !== 'object' || Array.isArray(S.collection)) S.collection = {};
  var c = S.collection;
  c.version = COLLECT_VERSION;
  if (!c.found || typeof c.found !== 'object' || Array.isArray(c.found)) c.found = {};
  /* Drop anything the catalog no longer knows about, so a renamed item does
     not sit in the save forever counting towards a total it is not part of. */
  Object.keys(c.found).forEach(function (id) { if (!collectItem(id)) delete c.found[id]; });
  return c;
}

function collectHas(id) {
  var c = ensureCollection();
  return !!(c && c.found[id]);
}

function collectRecord(id) {
  var c = ensureCollection();
  return c ? c.found[id] || null : null;
}

/* Hand the player an item. Returns true only the first time, so a caller can
   say something special about a first find without tracking that itself. */
function collectFind(id, opts) {
  try {
    var item = collectItem(id);
    if (!item) return false;
    var c = ensureCollection();
    if (!c) return false;
    opts = opts || {};

    if (c.found[id]) {
      c.found[id].n++;
      if (!opts.quiet) toast('Another ' + item.name + '. (' + c.found[id].n + ')');
      saveGame();
      return false;
    }

    c.found[id] = {
      n: 1,
      day: (typeof journalDayNumber === 'function') ? journalDayNumber() : 1,
      date: new Date().toISOString().slice(0, 10),
      at: Date.now()
    };
    if (typeof journalNote === 'function') journalNote('Found a ' + item.name + ' for the collection.');
    if (!opts.quiet) {
      var cat = collectCategory(item.cat);
      toast('New for the collection: ' + item.name +
        (cat ? ' · ' + cat.name : '') + '.');
    }
    saveGame();
    return true;
  } catch (e) { return false; }
}

/* ---- counting ------------------------------------------------------------ */

function collectStats(catId) {
  var items = catId ? collectItemsIn(catId) : (window.COLLECT_ITEMS || []);
  var found = items.filter(function (i) { return collectHas(i.id); }).length;
  return { found: found, total: items.length, pct: items.length ? Math.round(found / items.length * 100) : 0 };
}

function collectComplete(catId) {
  var s = collectStats(catId);
  return s.total > 0 && s.found === s.total;
}

/* ---- live sources --------------------------------------------------------
   The keepsakes are the category that is wired up today: each one marks a
   first, and each hook sits at the moment that first actually happens. The
   river and the critters wait on fishing and searching (phase 2 in
   COLLECTABLES.md); until then their tiles read as a to-do list.
   ------------------------------------------------------------------------- */
/* A keepsake that marks a first is handed over once and then never mentioned
   again. Without this guard the hooks sit on moments that repeat - every
   purchase, every catch, every crossing - and the second one would toast
   "Another Stamped Ferry Ticket", which is both wrong and noisy. */
function collectFindOnce(id) {
  if (collectHas(id)) return false;
  return collectFind(id);
}

function collectFirstBadge() { collectFindOnce('first-badge-ribbon'); }
function collectFirstCatch() { collectFindOnce('first-catch-tag'); }
function collectFirstPurchase() { collectFindOnce('mart-receipt'); }
function collectFirstCrossing() { collectFindOnce('ferry-ticket'); }
function collectChampion() { collectFindOnce('champion-laurel'); }

/* ---- the chest ----------------------------------------------------------- */

/* Which category the chest is showing. Null is the category list. */
var COLLECT_VIEW = null;

function openChest() {
  ensureCollection();
  /* The slip has been in the chest since the day you moved in; you just had
     not opened it. Quiet, because a toast on top of the chest opening reads
     as a reward for opening a box - and once only, or every open would add
     another copy of it. */
  if (!collectHas('enrolment-slip')) collectFind('enrolment-slip', { quiet: true });
  COLLECT_VIEW = null;
  modal(chestHtml());
}

function openCollectCategory(catId) {
  ensureCollection();
  COLLECT_VIEW = catId;
  modal(chestHtml());
}

function chestHtml() {
  var all = collectStats();
  var h = '<div class="collect">' +
    '<div class="collect-head"><span class="collect-eyebrow">The chest</span>' +
    '<h2>Your collection</h2>' +
    '<p class="collect-sub">' + all.found + ' of ' + all.total + ' found · ' +
    all.pct + '% complete</p>' +
    '<div class="collect-meter"><i style="width:' + all.pct + '%"></i></div></div>';

  h += COLLECT_VIEW ? collectCategoryHtml(COLLECT_VIEW) : collectIndexHtml();

  h += '<div class="collect-actions">' +
    (COLLECT_VIEW ? '<button onclick="openChest()">← All categories</button>' : '') +
    '<button class="primary" onclick="closeModal()">Close the chest</button></div></div>';
  return h;
}

function collectIndexHtml() {
  var h = '<div class="collect-cats">';
  (window.COLLECT_CATEGORIES || []).forEach(function (cat) {
    var s = collectStats(cat.id);
    var done = s.found === s.total && s.total > 0;
    h += '<button class="collect-cat' + (done ? ' done' : '') + '" ' +
      'onclick="openCollectCategory(\'' + cat.id + '\')">' +
      '<span class="cc-icon" aria-hidden="true">' + esc(cat.icon) + '</span>' +
      '<span class="cc-body"><b>' + esc(cat.name) + '</b>' +
      '<small>' + esc(cat.blurb) + '</small>' +
      '<span class="cc-count">' + s.found + ' / ' + s.total +
      (done ? ' · complete' : '') + '</span>' +
      '<span class="cc-meter"><i style="width:' + s.pct + '%"></i></span>' +
      '<small class="cc-where">' + esc(collectDisplayLine(cat)) + '</small></span></button>';
  });
  h += '</div>';
  h += '<p class="collect-note">Two of these live somewhere better than a box. ' +
    'Anything you pull out of the river goes in the aquarium, and anything you ' +
    'find under a leaf goes in the terrarium.</p>';
  return h;
}

function collectDisplayLine(cat) {
  if (cat.display === 'aquarium') return 'Shown in the aquarium';
  if (cat.display === 'terrarium') return 'Shown in the terrarium';
  return 'Kept here on the shelf';
}

function collectCategoryHtml(catId) {
  var cat = collectCategory(catId);
  if (!cat) return '<p class="collect-empty">No such category.</p>';
  var items = collectItemsIn(catId);
  var s = collectStats(catId);

  var h = '<section class="collect-block">' +
    '<h3>' + esc(cat.icon) + ' ' + esc(cat.name) + '</h3>' +
    '<p class="collect-line">' + esc(cat.how) + '</p>' +
    '<p class="collect-where">Where: ' + esc(cat.where) + '</p>';

  if (!cat.live) {
    h += '<p class="collect-pending">Not yet collectable — the ' +
      (cat.display === 'aquarium' ? 'fishing' : 'searching') +
      ' that fills this shelf is still being built. The list below is what ' +
      'will be out there.</p>';
  }

  h += '<div class="collect-grid">';
  items.forEach(function (item) {
    var got = collectHas(item.id);
    var rec = got ? collectRecord(item.id) : null;
    h += '<button class="collect-item cr-' + esc(item.rarity) + (got ? ' got' : ' locked') + '" ' +
      'onclick="openCollectItem(\'' + item.id + '\')">' +
      '<span class="ci-token" aria-hidden="true">' +
      (got ? collectTokenHtml(item) : '?') + '</span>' +
      '<b>' + (got ? esc(item.name) : '???') + '</b>' +
      '<small>' + esc(got ? collectRarityName(item.rarity) : item.found) + '</small>' +
      (rec && rec.n > 1 ? '<span class="ci-n">×' + rec.n + '</span>' : '') +
      '</button>';
  });
  h += '</div>';

  if (cat.display !== 'chest') {
    h += '<div class="collect-jump"><button onclick="' +
      (cat.display === 'aquarium' ? 'openAquarium()' : 'openTerrarium()') + '">' +
      'Look at the ' + cat.display + ' (' + s.found + ' on show)</button></div>';
  }
  return h + '</section>';
}

function collectRarityName(rarity) {
  var r = (window.COLLECT_RARITY || {})[rarity];
  return r ? r.name : rarity;
}

/* A painted token if the art exists, the glyph otherwise. Nothing in the UI
   depends on which one it gets. */
function collectTokenHtml(item) {
  return item.art
    ? '<img src="' + esc(item.art) + '" alt="">'
    : esc(item.icon || '•');
}

function openCollectItem(id) {
  var item = collectItem(id);
  if (!item) return;
  var got = collectHas(id), rec = collectRecord(id);
  var cat = collectCategory(item.cat);

  var h = '<div class="collect collect-detail">' +
    '<span class="collect-eyebrow">' + esc(cat ? cat.name : '') + ' · ' +
    esc(collectRarityName(item.rarity)) + '</span>' +
    '<div class="cd-token cr-' + esc(item.rarity) + '">' +
    (got ? collectTokenHtml(item) : '?') + '</div>' +
    '<h2>' + (got ? esc(item.name) : 'Not found yet') + '</h2>';

  if (got) {
    h += '<p class="collect-line">' + esc(item.blurb) + '</p>' +
      '<p class="collect-where">First found on day ' + rec.day +
      (rec.date ? ' (' + esc(rec.date) + ')' : '') +
      (rec.n > 1 ? ' · found ' + rec.n + ' times' : '') + '.</p>';
  } else {
    h += '<p class="collect-line">' + esc(item.found) + '</p>';
  }

  h += '<div class="collect-actions">' +
    '<button class="primary" onclick="openCollectCategory(\'' + esc(item.cat) + '\')">Back to the shelf</button>' +
    '<button onclick="closeModal()">Close</button></div></div>';
  modal(h);
}

/* ---- the display cases ---------------------------------------------------
   The aquarium and terrarium are the same component with a different skin and
   a different category, because they are the same idea: one scene, the things
   you have found arranged in it, the things you have not left as empty water
   or empty moss. Both work today from glyphs alone; drop painted tokens into
   assets/collect/<category>/<id>.png and set `art` on the item to upgrade one.
   ------------------------------------------------------------------------- */
function openAquarium() { openDisplayCase('river'); }
function openTerrarium() { openDisplayCase('critters'); }

function openDisplayCase(catId) {
  ensureCollection();
  var cat = collectCategory(catId);
  if (!cat) return;
  var items = collectItemsIn(catId);
  var found = items.filter(function (i) { return collectHas(i.id); });
  var s = collectStats(catId);
  var skin = cat.display === 'aquarium' ? 'tank' : 'viv';

  var h = '<div class="collect case-' + skin + '">' +
    '<div class="collect-head"><span class="collect-eyebrow">' +
    esc(cat.display === 'aquarium' ? 'The aquarium' : 'The terrarium') + '</span>' +
    '<h2>' + esc(cat.name) + '</h2>' +
    '<p class="collect-sub">' + s.found + ' of ' + s.total + ' on show</p></div>';

  h += '<div class="case-glass">';
  if (!found.length) {
    h += '<p class="case-empty">' +
      (skin === 'tank'
        ? 'Clean water, a light, and nothing in it yet.'
        : 'Moss, a piece of bark and a warm lamp, waiting for a tenant.') +
      '</p>';
  } else {
    /* Spread the residents over the whole pane deterministically: the same
       collection always looks the same, nothing jumps on a re-render, and a
       tank holding three does not huddle in one corner. The small odd/even
       nudge is what stops the grid reading as a grid. */
    var perRow = Math.min(4, Math.max(1, found.length <= 3 ? found.length : Math.ceil(found.length / 3)));
    var rows = Math.ceil(found.length / perRow);
    found.forEach(function (item, i) {
      var col = i % perRow, row = Math.floor(i / perRow);
      var left = 100 / (perRow + 1) * (col + 1) + ((row % 2) ? 4 : -4);
      var top = 70 / (rows + 1) * (row + 1) + 13 + ((col % 2) ? 5 : -5);
      h += '<button class="case-resident cr-' + esc(item.rarity) + '" ' +
        'style="left:' + Math.max(9, Math.min(91, left)) + '%;' +
        'top:' + Math.max(12, Math.min(80, top)) + '%" ' +
        'title="' + esc(item.name) + '" onclick="openCollectItem(\'' + item.id + '\')">' +
        collectTokenHtml(item) + '</button>';
    });
  }
  h += '</div>';

  var missing = items.length - found.length;
  h += '<p class="collect-note">' + (missing
    ? missing + ' still out there. ' + esc(cat.how)
    : 'Every one of them, accounted for.') + '</p>';

  h += '<div class="collect-actions">' +
    '<button onclick="openCollectCategory(\'' + catId + '\')">See the full list</button>' +
    '<button class="primary" onclick="closeModal()">Step back</button></div></div>';
  modal(h);
}
