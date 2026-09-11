/* PC storage, in the shape of a real Pokemon storage system: your party down
   the left, a paged box grid in the middle, and a detail panel on the right.

   Interaction is select-then-act rather than drag-and-drop: click a Pokemon to
   select it, then click an empty slot to move it there, or use the buttons. That
   works with a keyboard and on a phone, which dragging does not. */

var PC_PAGE = 0;          // which box page is open
var PC_SEL = null;        // { where: 'party' | 'box', index: n }
var PC_BOX_SIZE = 30;     // slots per box page

function pcBoxCount() {
  return Math.max(1, Math.ceil((S.box.length + 1) / PC_BOX_SIZE));
}

function pcSelected() {
  if (!PC_SEL) return null;
  var arr = PC_SEL.where === 'party' ? S.party : S.box;
  return arr[PC_SEL.index] || null;
}

function pcClearSelectionIfGone() {
  if (PC_SEL && !pcSelected()) PC_SEL = null;
}

function openPC() {
  PC_SEL = null;
  showScreen('party');
  renderParty();
}

/* Clicking a filled slot selects it. Clicking the SAME slot again deselects.
   Clicking an empty slot moves the current selection into that area. */
function pcPick(where, index) {
  var arr = where === 'party' ? S.party : S.box;
  var mon = arr[index];

  if (!mon) {                                  // empty slot: a drop target
    if (!PC_SEL) return;
    if (PC_SEL.where === where) { PC_SEL = null; renderParty(); return; }
    if (where === 'party') pcToParty(); else pcToBox();
    return;
  }
  if (PC_SEL && PC_SEL.where === where && PC_SEL.index === index) PC_SEL = null;
  else PC_SEL = { where: where, index: index };
  renderParty();
}

function pcToParty() {
  var mon = pcSelected();
  if (!mon || PC_SEL.where !== 'box') return;
  if (S.party.length >= 6) { toast('Your party is full. Move someone to a box first.'); return; }
  S.party.push(S.box.splice(PC_SEL.index, 1)[0]);
  PC_SEL = { where: 'party', index: S.party.length - 1 };
  saveGame(); renderParty();
  toast(monName(mon) + ' joined your party.');
}

function pcToBox() {
  var mon = pcSelected();
  if (!mon || PC_SEL.where !== 'party') return;
  if (S.party.length <= 1) { toast('You must keep at least one Pokémon with you.'); return; }
  S.box.push(S.party.splice(PC_SEL.index, 1)[0]);
  PC_SEL = { where: 'box', index: S.box.length - 1 };
  PC_PAGE = Math.floor((S.box.length - 1) / PC_BOX_SIZE);
  saveGame(); renderParty();
  toast(monName(mon) + ' was moved to a box.');
}

function pcRelease() {
  var mon = pcSelected();
  if (!mon) return;
  if (PC_SEL.where === 'party' && S.party.length <= 1) {
    toast('You must keep at least one Pokémon with you.'); return;
  }
  var nm = monName(mon);
  modal('<h2>Release ' + esc(nm) + '?</h2>' +
    '<img class="pc-art" src="' + artUrl(mon.id) + '" alt="">' +
    '<p class="muted">' + esc(nm) + ' will be gone for good. This cannot be undone.</p>' +
    '<div class="row" style="justify-content:center;margin-top:14px">' +
    '<button class="danger" onclick="pcReleaseConfirmed()">Release ' + esc(nm) + '</button>' +
    '<button class="ghost" onclick="closeModal()">Keep them</button></div>');
}

function pcReleaseConfirmed() {
  var mon = pcSelected();
  if (!mon) { closeModal(); return; }
  var nm = monName(mon);
  var arr = PC_SEL.where === 'party' ? S.party : S.box;
  arr.splice(PC_SEL.index, 1);
  PC_SEL = null;
  saveGame(); closeModal(); renderParty();
  toast('You said goodbye to ' + nm + '.');
}

/* ---- nickname ------------------------------------------------------------
   The old version called prompt(), which browsers block or suppress, so the
   button appeared to do nothing. This is an in-page dialog instead. */

function pcNickname() {
  var mon = pcSelected();
  if (!mon) return;
  nicknameDialog(mon, function () { renderParty(); });
}

function nicknameDialog(mon, done) {
  var species = titleCase(dexOf(mon.id).name);
  var current = mon.nick || '';
  modal('<h2>Nickname</h2>' +
    '<img class="pc-art" src="' + artUrl(mon.id) + '" alt="" style="max-width:150px">' +
    '<p class="muted">' + esc(species) + ' · Lv ' + mon.lvl + '</p>' +
    '<div class="nick-form">' +
    '<input id="nickin" maxlength="14" autocomplete="off" spellcheck="false" ' +
    'placeholder="' + esc(species) + '" value="' + esc(current) + '" aria-label="Nickname">' +
    '<p class="nick-hint">Up to 14 characters. Leave it empty to use the species name.</p>' +
    '<div class="row">' +
    '<button class="primary grow" id="nicksave">Save</button>' +
    '<button class="ghost" id="nickreset">Use species name</button>' +
    '<button class="ghost" onclick="closeModal()">Cancel</button>' +
    '</div></div>');

  var input = $('#nickin');
  var commit = function (value) {
    var v = String(value == null ? '' : value).trim().slice(0, 14);
    mon.nick = v || null;
    saveGame();
    closeModal();
    toast(v ? 'Nickname set to ' + v + '.' : 'Nickname cleared.');
    if (done) done();
  };
  $('#nicksave').onclick = function () { commit(input ? input.value : ''); };
  $('#nickreset').onclick = function () { commit(''); };
  if (input) {
    input.focus();
    input.select();
    input.onkeydown = function (e) {
      if (e.key === 'Enter') { e.preventDefault(); commit(input.value); }
      if (e.key === 'Escape') { e.preventDefault(); closeModal(); }
    };
  }
}

/* ---- rendering ------------------------------------------------------------ */

function pcSlotButton(mon, where, index) {
  var sel = PC_SEL && PC_SEL.where === where && PC_SEL.index === index;
  if (!mon) {
    return '<button class="pc-slot empty" onclick="pcPick(\'' + where + '\',' + index + ')">Empty</button>';
  }
  return '<button class="pc-slot' + (sel ? ' sel' : '') + '" onclick="pcPick(\'' + where + '\',' + index + ')" ' +
    'aria-pressed="' + (sel ? 'true' : 'false') + '">' +
    '<img src="' + monSprite(mon) + '" alt="">' +
    '<span class="s-txt"><span class="s-nm">' + esc(monName(mon)) + (mon.shiny ? ' ✦' : '') + '</span>' +
    '<span class="s-lv">Lv ' + mon.lvl + ' · ' + hpPct(mon) + '% HP</span></span></button>';
}

function pcCell(mon, index) {
  var sel = PC_SEL && PC_SEL.where === 'box' && PC_SEL.index === index;
  if (!mon) {
    return '<button class="pc-cell empty" onclick="pcPick(\'box\',' + index + ')" aria-label="Empty slot"></button>';
  }
  return '<button class="pc-cell' + (sel ? ' sel' : '') + '" onclick="pcPick(\'box\',' + index + ')" ' +
    'title="' + esc(monName(mon)) + ' Lv' + mon.lvl + '" aria-pressed="' + (sel ? 'true' : 'false') + '">' +
    '<img src="' + monSprite(mon) + '" alt="' + esc(monName(mon)) + '">' +
    '<span class="lvtag">' + mon.lvl + '</span></button>';
}

function pcDetail() {
  var mon = pcSelected();
  if (!mon) {
    return '<div class="panel pc-detail"><h3>Storage</h3>' +
      '<p class="pc-empty-note">Pick a Pokémon from your party or a box to see its details, ' +
      'give it a nickname, or move it.</p></div>';
  }
  var d = dexOf(mon.id);
  var need = xpToNext(mon.lvl);
  var inParty = PC_SEL.where === 'party';
  return '<div class="panel pc-detail">' +
    '<img class="pc-art" src="' + artUrl(mon.id) + '" alt="">' +
    '<h3>' + esc(monName(mon)) + (mon.shiny ? ' ✦' : '') + '</h3>' +
    '<div class="pc-sub">' + esc(titleCase(d.name)) + ' · Lv ' + mon.lvl + ' · #' + String(mon.id).padStart(4, '0') + '</div>' +
    typePillsInline(d.types) +
    '<div class="pc-bars">' +
    '<div class="hpbar"><div class="hpfill ' + hpClass(mon) + '" style="width:' + hpPct(mon) + '%"></div></div>' +
    '<div class="hpnum">HP ' + mon.hp + ' / ' + maxHp(mon) + '</div>' +
    '<div class="xpbar"><div class="xpfill" style="width:' + Math.min(100, Math.round(mon.xp / need * 100)) + '%"></div></div>' +
    '<div class="hpnum">EXP ' + mon.xp + ' / ' + need + '</div>' +
    '</div>' +
    '<div class="pc-actions">' +
    (inParty
      ? '<button onclick="pcToBox()"' + (S.party.length <= 1 ? ' disabled' : '') + '>Move to box</button>'
      : '<button class="primary" onclick="pcToParty()"' + (S.party.length >= 6 ? ' disabled' : '') + '>Add to party</button>') +
    '<button onclick="pcNickname()">Give a nickname</button>' +
    '<button class="ghost" onclick="pcRelease()">Release</button>' +
    '</div></div>';
}

function renderPC() {
  pcClearSelectionIfGone();
  var boxes = pcBoxCount();
  if (PC_PAGE >= boxes) PC_PAGE = boxes - 1;
  if (PC_PAGE < 0) PC_PAGE = 0;

  var h = '<div class="section-intro"><span class="eyebrow">POKéMON STORAGE SYSTEM</span>' +
    '<h2>Party &amp; Boxes</h2>' +
    '<p class="muted">Click a Pokémon to select it, then use the panel on the right, or click an ' +
    'empty slot to move it there. Your party can hold six.</p></div>';

  h += '<div class="pc-wrap">';

  /* party column */
  h += '<div class="pc-col"><h3>Party · ' + S.party.length + '/6</h3><div class="pc-party">';
  for (var i = 0; i < 6; i++) h += pcSlotButton(S.party[i], 'party', i);
  h += '</div>' +
    '<button class="primary center-button" style="width:100%;margin-top:12px" onclick="goCenter()">' +
    '<img src="assets/sprites/front/113.png" alt=""> Heal everyone</button></div>';

  /* box grid */
  var start = PC_PAGE * PC_BOX_SIZE;
  h += '<div class="pc-col"><div class="pc-boxhead">' +
    '<button class="ghost" onclick="pcPageBy(-1)"' + (PC_PAGE === 0 ? ' disabled' : '') + '>‹ Prev</button>' +
    '<span class="pc-title">Box ' + (PC_PAGE + 1) + ' of ' + boxes + ' · ' + S.box.length + ' stored</span>' +
    '<button class="ghost" onclick="pcPageBy(1)"' + (PC_PAGE >= boxes - 1 ? ' disabled' : '') + '>Next ›</button>' +
    '</div><div class="pc-grid">';
  for (var j = 0; j < PC_BOX_SIZE; j++) h += pcCell(S.box[start + j], start + j);
  h += '</div></div>';

  /* detail */
  h += pcDetail();
  h += '</div>';

  $('#s-party').innerHTML = h;
  renderTopbar();
}

function pcPageBy(delta) {
  PC_PAGE += delta;
  renderPC();
}
