/* Phase 7 Slice 4: selective item vignettes.

   A vignette is a short memory attached to a notable item - who it came from,
   what it means to them. Only curated items get one; routine healing, balls
   and cheap commodities never do, so buying and using those stays fast.

   They never interrupt. Nothing pops up when an item arrives - in a battle
   reward, a shop, a gift, a letter or an import. Instead the bag (the party
   screen, an explicit and calm place) shows a small "A memory" button beside
   an item with an unread vignette. Rendering that button is read-only.

   World-state buckets, keyed "vignette:<id>":
     seen      opened at least once
     resolved  read to the end ("Put it away")
   A vignette interrupted by a reload stays seen-but-unresolved and the bag
   offers to finish it. Resolved ones can be re-read without any write. */

var VIGNETTE_ROUTINE_CATEGORIES = ['capture', 'medicine', 'battle-utility'];
var VIGNETTE_ERRORS = [];

function validateVignetteRecord(v) {
  var errors = [], label = 'vignette:' + (v && v.id);
  if (!v || typeof v !== 'object') return [label + ': invalid record'];
  var item = typeof itemById === 'function' ? itemById(v.item) : null;
  if (!item) errors.push(label + ': unknown item ' + v.item);
  else {
    if (VIGNETTE_ROUTINE_CATEGORIES.indexOf(item.category) >= 0) errors.push(label + ': routine ' + item.category + ' items get no vignette');
    if (item.rarity === 'common') errors.push(label + ': common items get no vignette');
  }
  if (v.with !== undefined && !(typeof castById === 'function' && castById(v.with))) errors.push(label + ': unknown character ' + v.with);
  if (typeof v.title !== 'string' || v.title.trim().length < 4) errors.push(label + ': missing title');
  if (typeof v.text !== 'string' || v.text.trim().length < 80) errors.push(label + ': text missing or too short');
  return errors;
}

function registerVignette(record) {
  var errors = validateVignetteRecord(record);
  if (!errors.length) errors = registerWorldContent('vignette', record);
  VIGNETTE_ERRORS = VIGNETTE_ERRORS.concat(errors);
  return errors;
}

function validateVignettes() { return VIGNETTE_ERRORS.slice(); }

/* Read-only: vignettes whose item is in the bag and whose conditions hold. */
function vignetteAvailable(v) {
  if (!S || !v) return false;
  if (!worldFact('item:' + v.item)) return false;
  if (v.with && !worldFact('met:' + v.with)) return false;
  return worldConditionMet(v.when);
}

function vignettesForItem(key) {
  return worldContentList('vignette').filter(function (v) { return v.item === key && vignetteAvailable(v); });
}

function vignetteState(v) {
  if (worldHas('resolved', 'vignette', v.id)) return 'resolved';
  if (worldHas('seen', 'vignette', v.id)) return 'interrupted';
  return 'new';
}

/* Read-only bag button: an unfinished memory first, then a new one, then a
   finished one to re-read. */
function vignetteButtonHtml(key) {
  var list = vignettesForItem(key);
  if (!list.length) return '';
  var order = { interrupted: 0, 'new': 1, resolved: 2 };
  list.sort(function (a, b) { return order[vignetteState(a)] - order[vignetteState(b)] || a.id.localeCompare(b.id); });
  var v = list[0], state = vignetteState(v);
  var label = state === 'new' ? '✦ A memory' : state === 'interrupted' ? '✦ Finish the memory' : 'Remember';
  return '<button class="vignette-button vignette-' + state + '" onclick="openVignette(\'' + v.id + '\')">' + label + '</button>';
}

function vignetteBusy() { return typeof B !== 'undefined' && B && !B.over; }

function openVignette(id) {
  var v = worldContent('vignette', id);
  if (!v || !vignetteAvailable(v)) return false;
  if (vignetteBusy()) { toast('That can wait until the battle is over.'); return false; }
  var reread = worldHas('resolved', 'vignette', id);
  if (!reread && worldMark('seen', 'vignette', id)) saveGame();
  var person = v.with ? castById(v.with) : null, item = itemById(v.item);
  modal('<article class="vignette"><span class="eyebrow">' + esc(item.name) + (person ? ' · ' + esc(person.name) : '') + '</span>' +
    '<h2>' + esc(v.title) + '</h2>' +
    v.text.split('\n\n').map(function (p) { return '<p class="scene-prose">' + esc(p) + '</p>'; }).join('') +
    '<button class="primary" onclick="finishVignette(\'' + id + '\')">' + esc(v.close || 'Put it away') + '</button></article>');
  return true;
}

function finishVignette(id) {
  var v = worldContent('vignette', id);
  if (v && worldHas('seen', 'vignette', id) && worldMark('resolved', 'vignette', id)) saveGame();
  closeModal();
  if (typeof renderParty === 'function' && typeof CUR !== 'undefined' && CUR === 'party') renderParty();
}
