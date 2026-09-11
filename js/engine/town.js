/* The region screen: eight locations, sixty-odd people, and what each of them
   does when you walk up to them.

   Battles here are deliberately chapter-agnostic. Each townsperson suggests a
   chapter that suits them, but you pick what to study, so the cast survives
   C-MON growing past C into other subjects. */

var TOWN_LOC = 'town';        // which location is open
var TOWN_PERSON = null;       // who you are talking to

/* Friendships are shared across regions, so a person has to be findable from
   anywhere - otherwise someone you befriended on the Isles disappears from the
   Friends screen as soon as you sail home. Search the local cast first (cheap,
   and it is the common case), then everyone. */
function townsfolkById(id) {
  var i;
  for (i = 0; i < TOWNSFOLK.length; i++) if (TOWNSFOLK[i].id === id) return TOWNSFOLK[i];
  var all = (typeof everyPerson === 'function') ? everyPerson() : [];
  for (i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
  return null;
}
function locationById(id) {
  for (var i = 0; i < LOCATIONS.length; i++) if (LOCATIONS[i].id === id) return LOCATIONS[i];
  return LOCATIONS[0];
}
function peopleAt(loc) {
  return TOWNSFOLK.filter(function (p) { return p.loc === loc; });
}

/* Who you have already beaten / already accepted a gift from. */
function ensureTown() {
  if (!S) return;
  if (!S.town || typeof S.town !== 'object' || Array.isArray(S.town)) S.town = {};
  if (!S.town.beaten || typeof S.town.beaten !== 'object') S.town.beaten = {};
  if (!S.town.gifts || typeof S.town.gifts !== 'object') S.town.gifts = {};
  if (!S.town.met || typeof S.town.met !== 'object') S.town.met = {};
}

function locationOpen(l) { return badgeCount() >= (l.badges || 0); }

function openTown(loc) {
  ensureTown(); ensureFriends();
  if (loc) {
    var want = locationById(loc);
    if (!locationOpen(want)) {
      toast(want.locked || ('That place wants ' + want.badges + ' badges.'));
      loc = TOWN_LOC;
    }
  }
  if (loc) TOWN_LOC = loc;
  TOWN_PERSON = null;
  showScreen('town');
  renderTown();
}

/* Their teams grow with your badges, the same way the companions' do. */
function npcTeam(p) {
  var stages = Math.floor(badgeCount() / 5);
  var size = Math.max(1, Math.min((p.team || []).length, 1 + Math.floor(badgeCount() / 6)));
  return (p.team || []).slice(0, size).map(function (id) {
    return scaleSpecies(evolveSpecies(id, stages), partyCapBst() * 1.2);
  });
}

var KIND_LABEL = { trainer: 'Battle', shop: 'Shop', heal: 'Poké Centre', talk: 'Talk', gift: 'Gift' };

/* Some people want badges of their own before they will deal with you. */
function cardButton(p, beaten, taken) {
  if ((p.badges || 0) > badgeCount()) {
    return '<button disabled>Wants ' + p.badges + ' badges</button>';
  }
  var label = p.kind === 'trainer' ? (beaten ? 'Battle again' : 'Battle') :
              p.kind === 'shop' ? 'Browse' :
              p.kind === 'heal' ? 'Rest here' :
              p.kind === 'gift' ? (taken ? 'Say hello' : 'Accept') : 'Talk';
  return '<button class="' + (p.kind === 'trainer' && !beaten ? 'primary' : '') +
         '" onclick="talkTo(\'' + p.id + '\')">' + label + '</button>';
}

/* A headshot if this person has one, otherwise nothing: the card reads fine
   either way, so art can arrive one character at a time. */
function townFace(id, name) {
  var art = (window.FOLK_PORTRAITS || {})[id];
  if (!art) return '';
  return '<div class="town-face"><img style="--head-shift:' +
    ((window.FOLK_HEAD_SHIFT || {})[id] || 0) + '%" src="' + art +
    '" alt="' + esc(name) + '"></div>';
}

/* The companions live in the region too. You meet them where they happen to be
   rather than being handed them on the Friends screen, so each location shows
   whoever calls it home. */
function companionsAt(loc) {
  var home = window.COMPANION_HOME || {};
  return TRAINERS.filter(function (t) { return home[t.id] === loc; });
}

function companionCard(t) {
  var f = friendship(t.id);
  var art = (window.TRAINER_PORTRAITS || {})[t.id];
  var face = art ? '<div class="town-face"><img style="--head-shift:' +
      ((window.TRAINER_HEAD_SHIFT || {})[t.id] || 0) + '%" src="' + art +
      '" alt="' + esc(t.name) + '"></div>' : '';
  var note = !f.met ? 'You have not spoken yet'
           : isFriend(t.id) ? friendHearts(f) + '♥ friend'
           : friendHearts(f) + '♥ · getting to know you';
  return '<article class="town-card companion" style="--trainer-color:' + t.color + '">' +
    '<div class="town-head"><span class="town-cls">' + esc(t.role) + '</span>' +
    '<span class="town-kind k-friend">Friend</span></div>' + face +
    '<h3>' + esc(t.name) + '</h3>' +
    '<p class="small">' + esc(t.bio) + '</p>' +
    '<p class="town-note">' + note + '</p>' +
    '<button class="' + (f.met ? '' : 'primary') + '" onclick="openFriend(\'' + t.id + '\')">' +
    (f.met ? 'Spend time together' : 'Introduce yourself') + '</button></article>';
}

function renderTown() {
  ensureTown(); ensureBag();
  var loc = locationById(TOWN_LOC);
  var h = '<div class="section-intro"><span class="eyebrow">' +
    esc((subjectDef().region || 'THE C-MON REGION').toUpperCase()) + '</span>' +
    '<h2>' + esc(loc.name) + '</h2><p>' + esc(loc.blurb) + '</p>' +
    '<div class="region-tabs" aria-label="Places">';
  LOCATIONS.forEach(function (l) {
    var open = locationOpen(l);
    h += '<button class="' + (l.id === TOWN_LOC ? 'active' : '') + (open ? '' : ' locked') +
      '" aria-pressed="' + (l.id === TOWN_LOC) + '" onclick="openTown(\'' + l.id + '\')">' +
      esc(l.name) + (open ? '' : ' <small>' + l.badges + '◆</small>') + '</button>';
  });
  h += '</div></div>';

  if (!locationOpen(loc)) {
    h += '<div class="panel"><h3>Closed to you for now</h3><p class="muted">' +
      esc(loc.locked || 'You need more badges.') + '</p><p class="small">You have ' + badgeCount() +
      ' of the ' + loc.badges + ' badges this place asks for.</p></div>';
    $('#s-town').innerHTML = h; renderTopbar(); return;
  }
  var list = peopleAt(TOWN_LOC);
  h += '<p class="muted">' + (list.length + companionsAt(TOWN_LOC).length) + ' people here · ' +
    list.filter(function (p) { return p.kind === 'trainer'; }).length + ' will battle you' +
    (typeof ferryHere === 'function' && ferryHere() ? ' · ferry berth' : '') + '</p>';

  h += '<div class="town-grid">';
  if (typeof ferryHere === 'function' && ferryHere()) h += ferryCard();
  companionsAt(TOWN_LOC).forEach(function (t) { h += companionCard(t); });
  list.forEach(function (p) {
    var beaten = !!S.town.beaten[p.id];
    var taken = !!S.town.gifts[p.id];
    var note = '';
    if ((p.badges || 0) > badgeCount()) note = p.want || ('Wants ' + p.badges + ' badges first.');
    else if (p.kind === 'trainer') note = beaten ? 'Beaten · rematch any time' : 'Prize ₵' + battlePrize('npc', playerLevel(), p.pay);
    else if (p.kind === 'gift') note = taken ? 'Already given you one' : 'Has something for you';
    else if (p.kind === 'shop') note = 'Sells balls and potions';
    else if (p.kind === 'heal') note = 'Will heal your party';
    else note = 'Has something to say';
    var fr2 = S.friends && S.friends[p.id];
    var hearts = fr2 ? friendHearts(fr2) : 0;
    if ((p.badges || 0) > badgeCount()) { /* their refusal stands on its own */ }
    else if (hearts > 0) note += ' · ' + hearts + '♥ friend';
    else if (fr2 && fr2.points > 0) note += ' · getting to know you';

    h += '<article class="town-card' + (p.kind === 'trainer' && beaten ? ' done' : '') +
      ((p.badges || 0) > badgeCount() ? ' gated' : '') + '">' +
      '<div class="town-head"><span class="town-cls">' + esc(p.cls) + '</span>' +
      '<span class="town-kind k-' + p.kind + '">' + KIND_LABEL[p.kind] + '</span></div>' +
      townFace(p.id, p.name) +
      '<h3>' + esc(p.name) + '</h3>' +
      '<p class="small">' + esc(p.say) + '</p>' +
      '<p class="town-note">' + esc(note) + '</p>' +
      cardButton(p, beaten, taken) + '</article>';
  });
  h += '</div>';
  $('#s-town').innerHTML = h;
  renderTopbar();
}

function talkTo(id) {
  ensureTown(); ensureBag();
  var p = townsfolkById(id);
  if (!p) return;
  if ((p.badges || 0) > badgeCount()) {
    toast(p.want || (p.name + ' is not interested until you have ' + p.badges + ' badges.'));
    return;
  }
  var firstMeeting = !S.town.met[p.id];
  S.town.met[p.id] = true;
  var fr = friendship(p.id);
  if (!fr.met) { fr.met = true; changeFriendship(p.id, 20); syncFriendStory(); }
  else if (firstMeeting) changeFriendship(p.id, 10);

  if (p.kind === 'shop') { saveGame(); openShop(p.id); return; }

  if (p.kind === 'heal') {
    healParty(); changeFriendship(p.id, 6); saveGame();
    modal('<h2>' + esc(p.name) + '</h2><p class="scene-prose">' + esc(p.say) + '</p>' +
      '<p class="muted">Your party is fully healed.</p>' +
      '<button class="primary" onclick="closeModal();renderTown()">Thank you</button>');
    return;
  }

  if (p.kind === 'gift') {
    if (S.town.gifts[p.id]) {
      saveGame();
      modal('<h2>' + esc(p.name) + '</h2><p class="scene-prose">' + esc(p.say) + '</p>' +
        '<p class="muted">They have already given you what they had.</p>' +
        '<button class="primary" onclick="closeModal();renderTown()">Back</button>');
      return;
    }
    S.town.gifts[p.id] = true;
    giveItem(p.item, p.amount);
    changeFriendship(p.id, 25);
    saveGame();
    modal('<h2>' + esc(p.name) + '</h2><p class="scene-prose">' + esc(p.say) + '</p>' +
      '<p class="friend-change">Received ' + p.amount + ' ' + esc(ITEMS[p.item].name) +
      (p.amount > 1 ? 's' : '') + '.</p>' +
      '<button class="primary" onclick="closeModal();renderTown()">Thanks</button>');
    return;
  }

  if (p.kind === 'talk') {
    if (!friendWait(friendship(p.id), 'Talk')) { changeFriendship(p.id, 12); friendship(p.id).lastTalk = S.clock; friendship(p.id).talks++; }
    saveGame();
    modal('<h2>' + esc(p.name) + '</h2><span class="friend-role">' + esc(p.cls) + '</span>' +
      '<p class="scene-prose">' + esc(p.say) + '</p>' +
      (p.tip ? '<div class="note" style="text-align:left;margin-top:12px"><b>Worth remembering.</b><br>' +
        esc(p.tip) + '</div>' : '') +
      '<button class="primary" onclick="closeModal();renderTown()">Back</button>');
    return;
  }

  /* trainer: let the player choose what to revise, then fight */
  var h = '<h2>' + esc(p.name) + '</h2><span class="friend-role">' + esc(p.cls) + '</span>' +
    '<p class="scene-prose">' + esc(p.say) + '</p>' +
    '<div class="town-team">';
  npcTeam(p).forEach(function (sp) {
    h += '<figure><img src="' + spriteUrl(sp) + '" alt=""><figcaption>' +
      esc(titleCase(dexOf(sp).name)) + '</figcaption></figure>';
  });
  h += '</div><label class="small" for="npc-chapter">Study chapter</label><select id="npc-chapter">';
  CHAPTERS.forEach(function (c) {
    h += '<option value="' + c.n + '"' + (c.n === p.ch ? ' selected' : '') + '>' +
      c.n + '. ' + esc(c.title) + '</option>';
  });
  h += '</select><p class="small">They suggest chapter ' + (p.ch || 1) +
    ', but the questions come from whatever you pick. Prize: ₵' +
    battlePrize('npc', playerLevel(), p.pay) + '.</p>' +
    '<div class="row" style="justify-content:center;margin-top:12px">' +
    '<button class="primary" onclick="startNpcBattle(\'' + p.id + '\')">Battle</button>' +
    '<button class="ghost" onclick="closeModal()">Not now</button></div>';
  modal(h);
}

function startNpcBattle(id) {
  var p = townsfolkById(id);
  if (!p) return;
  if (!partyAlive()) { toast('Your party needs a rest first.'); return; }
  var sel = $('#npc-chapter');
  var chapter = sel ? Number(sel.value) : (p.ch || 1);
  if (!chapterByNumber(chapter)) chapter = p.ch || CHAPTERS[0].n;
  closeModal();
  var foes = npcTeam(p).map(function (sp, i) {
    return makeMon(sp, clampLvl(playerLevel() - 1 + i));
  });
  clearLog();
  startBattle({
    kind: 'npc', chapters: [chapter], foes: foes,
    title: p.cls + ' ' + p.name, leader: p.name,
    npcId: p.id, npcPay: p.pay
  });
}

/* Called from winBattle / loseBattle in battle.js. */
function finishNpcBattle(won) {
  if (!B || B.kind !== 'npc') return null;
  ensureTown(); ensureBag();
  var p = townsfolkById(B.npcId);
  if (!p) return null;
  var first = !S.town.beaten[p.id];
  var prize = 0;
  var fr = friendship(p.id);
  if (!fr.met) { fr.met = true; changeFriendship(p.id, 20); }
  if (!friendWait(fr, 'Battle')) {
    changeFriendship(p.id, won ? 22 : 14);
    fr.lastBattle = S.clock;
  }
  fr.battles++; if (won) fr.wins++;
  if (won) {
    S.town.beaten[p.id] = true;
    prize = battlePrize('npc', playerLevel(), p.npcPay || p.pay);
    if (!first) prize = Math.round(prize * 0.5);      // rematches pay less
    addMoney(prize);
  }
  saveGame();
  return { person: p, prize: prize, first: first, line: won ? p.win : p.lose };
}

/* How much of the cast you have found, for the trainer card. */
function townProgress() {
  ensureTown();
  var trainers = TOWNSFOLK.filter(function (p) { return p.kind === 'trainer'; });
  return {
    met: Object.keys(S.town.met).length,
    total: TOWNSFOLK.length,
    beaten: trainers.filter(function (p) { return S.town.beaten[p.id]; }).length,
    trainers: trainers.length
  };
}
