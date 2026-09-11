/* Screens, rendering and all the small DOM helpers. */

function $(sel) { return document.querySelector(sel); }
function $$(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

var _toastT = null;
function toast(msg) {
  var t = $('#toast');
  t.textContent = msg;
  t.classList.add('on');
  clearTimeout(_toastT);
  _toastT = setTimeout(function () { t.classList.remove('on'); }, 2600);
}

var CUR = 'title';
function showScreen(name) {
  if(name !== 'quests' && typeof cancelCJob === 'function') cancelCJob();
  if (CUR === 'battle' && name !== 'battle' && B && !B.over) {
    B.over=true; clearInterval(B.timer); saveGame();
  }
  CUR = name;
  $$('.screen').forEach(function (s) { s.classList.toggle('on', s.id === 's-' + name); });
  $$('#nav button').forEach(function (b) { b.classList.toggle('sel', b.dataset.scr === name); });
  $('#nav').style.display = (name === 'title' || name === 'starter') ? 'none' : 'flex';
  $('#topbar').style.display = (name === 'title') ? 'none' : 'flex';
  window.scrollTo(0, 0);
  renderTopbar();
}

function renderTopbar() {
  if (!S) return;
  var due = dueCount();
  $('#topbar').innerHTML =
    '<span class="logo">StudyMon</span>' +
    (typeof regionChip === 'function' ? regionChip() : '') +
    '<span class="chip">◆ <b>' + badgeCount() + '</b>/' + CHAPTERS.length + ' badges</span>' +
    '<span class="chip">₵ <b>' + money().toLocaleString() + '</b></span>' +
    '<span class="chip">● <b>' + (itemCount('great') + itemCount('ultra')) + '</b> good balls</span>' +
    '<span class="chip">✚ <b>' + (itemCount('potion') + itemCount('superpotion')) + '</b> potions</span>' +
    '<span class="chip streak-chip">🔥 streak <b>' + S.streak + '</b></span>' +
    (due ? '<span class="chip">⟳ <b>' + due + '</b> to review</span>' : '') +
    '<span class="spacer"></span>' +
    '<span class="chip caught-chip">' + Object.keys(S.caught).length + ' caught</span>';
}

/* ---- battle rendering ---------------------------------------------------- */

function hpPct(m) { return Math.max(0, Math.round(m.hp / maxHp(m) * 100)); }
function hpClass(m) { var p = hpPct(m); return p <= 20 ? 'low' : p <= 50 ? 'mid' : ''; }

function renderBattle() {
  if (!B) return;
  var f = foe(), y = B.you;
  // the scene art is shared; a filter per battle kind keeps them distinct
  var field = $('#battlefield');
  field.className = 'bf-' + (B.kind || 'wild');
  $('#battlefield').innerHTML =
    '<div class="hpbox foe"><div class="nm"><span>' + esc(monName(f).toUpperCase()) + '</span><span>Lv' + f.lvl + '</span></div>' +
    typePills(dexOf(f.id).types) +
    '<div class="hpbar"><div class="hpfill ' + hpClass(f) + '" style="width:' + hpPct(f) + '%"></div></div></div>' +

    '<div class="bf-slot bf-foe"><img id="foeimg" src="' + monSprite(f, f.shiny ? 'shiny' : 'front') + '" alt=""></div>' +
    '<div class="bf-slot bf-you"><img id="youimg" src="' + spriteUrl(y.id, 'back') + '" alt=""></div>' +

    '<div class="hpbox you"><div class="nm"><span>' + esc(monName(y).toUpperCase()) + '</span><span>Lv' + y.lvl + '</span></div>' +
    typePills(dexOf(y.id).types) +
    '<div class="hpbar"><div class="hpfill ' + hpClass(y) + '" style="width:' + hpPct(y) + '%"></div></div>' +
    '<div class="hpnum">' + y.hp + '/' + maxHp(y) + '</div></div>';

  seatSprite($('#foeimg'), $('.bf-foe'));
  seatSprite($('#youimg'), $('.bf-you'));

  $('#btitle').textContent = B.title;
  renderTopbar();
}

/* ---- seating sprites on the battle platforms -------------------------------
   PokeAPI sprites are fixed 96x96 frames with the creature floating somewhere
   inside: the transparent gap below it runs from 8% to 34% depending on the
   species, and the creature is not always horizontally centred either. A single
   fixed offset therefore leaves some Pokemon hovering and others sunk.

   So measure the actual artwork. The sprite is drawn to a canvas once, the
   opaque bounds are read off, and the result is cached per URL and handed to the
   CSS as --seat / --seat-x. Reading pixels back is not permitted for a page
   opened straight off the disk (file://), so any failure falls back to the
   averaged default already in the stylesheet. */
var SPRITE_SEAT = {};

function seatSprite(img, slot) {
  if (!img || !slot) return;
  var url = img.getAttribute('src');
  var cached = SPRITE_SEAT[url] || seatFromTable(url);
  if (cached) { applySeat(slot, cached); return; }

  var apply = function () {
    if (!img.naturalWidth) return;
    var m = measureSprite(img);
    if (!m) return;
    SPRITE_SEAT[url] = m;
    // the slot may already have moved on to another Pokemon
    if (slot.isConnected && img.getAttribute('src') === url) applySeat(slot, m);
  };
  if (img.complete) apply();
  else img.addEventListener('load', apply, { once: true });
}

/* The build-time table, keyed by sprite path. This is the normal path; the
   canvas measurement below only runs for a sprite the table does not know. */
function seatFromTable(url) {
  var t = window.SPRITE_SEAT_DATA;
  if (!t) return null;
  var m = /sprites\/(front|back|shiny)\/(\d+)\.png/.exec(url);
  if (!m) return null;
  var row = t[m[1]] && t[m[1]][m[2]];
  return row ? { bottom: row[0], cx: row[1] } : null;
}

function applySeat(slot, m) {
  slot.style.setProperty('--seat', (m.bottom * 100).toFixed(2) + '%');
  slot.style.setProperty('--seat-x', (m.cx * 100).toFixed(2) + '%');
}

function measureSprite(img) {
  try {
    var w = img.naturalWidth, h = img.naturalHeight;
    var c = document.createElement('canvas');
    c.width = w; c.height = h;
    var g = c.getContext('2d', { willReadFrequently: true });
    g.drawImage(img, 0, 0);
    var d = g.getImageData(0, 0, w, h).data;
    var bottom = -1, left = w, right = -1;
    for (var y = h - 1; y >= 0; y--) {
      for (var x = 0; x < w; x++) {
        if (d[(y * w + x) * 4 + 3] > 25) {
          if (bottom < 0) bottom = y;
          if (x < left) left = x;
          if (x > right) right = x;
        }
      }
    }
    if (bottom < 0) return null;                       // fully transparent
    return { bottom: (h - 1 - bottom) / h, cx: ((left + right) / 2) / w };
  } catch (e) {
    return null;                                        // tainted canvas on file://
  }
}

function typePills(types) {
  return '<div style="margin-top:5px">' + typePillsInline(types) + '</div>';
}
function typePillsInline(types) {
  return types.map(function (t) {
    return '<span class="tp ' + t + '">' + t + '</span>';
  }).join('');
}

var LOGLINES = [];
function log(html) {
  LOGLINES.push(html);
  if (LOGLINES.length > 6) LOGLINES.shift();
  $('#battlelog').innerHTML = LOGLINES.join('<br>');
  $('#battlelog').scrollTop = 9999;
}
function clearLog() { LOGLINES = []; $('#battlelog').innerHTML = ''; }

function hitAnim(sel) {
  var el = $(sel);
  if (!el) return;
  el.classList.remove('shake', 'flash');
  void el.offsetWidth;
  el.classList.add('shake', 'flash');
}

/* ---- modal --------------------------------------------------------------- */

function modal(html) { $('#modal .box').innerHTML = html; $('#modal').classList.add('on'); }
function closeModal() { $('#modal').classList.remove('on'); }

function showEvolve(e) {
  modal('<h2>What? ' + esc(e.from.toUpperCase()) + ' is evolving!</h2>' +
    '<img src="' + artUrl(e.id) + '" alt="">' +
    '<h3 style="color:var(--accent)">' + esc(e.to.toUpperCase()) + '</h3>' +
    '<p class="muted">' + esc(dexOf(e.id).flavor) + '</p>' +
    '<button class="primary" onclick="closeModal()">Continue ▶</button>');
  playCry(e.id);
}

function showCaught(m) {
  var d = dexOf(m.id);
  modal('<h2>Gotcha!</h2><img src="' + artUrl(m.id) + '" alt="">' +
    '<h3>' + esc(monName(m).toUpperCase()) + ' Lv' + m.lvl + '</h3>' +
    typePills(d.types) +
    '<p class="muted" style="margin-top:10px">' + esc(d.genus) + ', ' + esc(d.flavor) + '</p>' +
    (S.party.length >= 6 ? '<p class="muted">Your party is full, so it went to the PC Box.</p>' : '') +
    '<button class="primary" onclick="closeModal();showScreen(\'map\');renderMap()">Continue ▶</button>');
}

function showResult(won, msg, extra, acc) {
  modal('<h2 style="color:' + (won ? 'var(--accent)' : 'var(--red)') + '">' + esc(msg) + '</h2>' +
    (extra ? '<p style="font-size:15px">' + esc(extra) + '</p>' : '') +
    (acc ? '<p class="muted">' + esc(acc) + '</p>' : '') +
    '<div class="row" style="justify-content:center;margin-top:14px">' +
    '<button class="primary" onclick="closeModal();showScreen(\'map\');renderMap()">To the map ▶</button>' +
    '<button class="ghost" onclick="closeModal();goCenter()">Poké Center</button>' +
    '</div>');
}

/* ---- title / new game ---------------------------------------------------- */

function renderTitle() {
  $('#continuebtn').style.display = hasSave() ? '' : 'none';
}

function newGame() {
  if (hasSave() && !confirm('Start a new game? Your current save will be erased.')) return;
  S = freshSave();
  bindProgress('c');          // start in the C region; the Isles are a boat ride away
  showScreen('starter');
  renderStarter();
}

function continueGame() {
  if (!loadGame()) { toast('No save found.'); return; }
  showScreen('map'); renderMap();
}

var starterRegion = 'All';
function renderStarter() {
  var regions = ['All','Kanto','Johto','Hoenn','Sinnoh','Unova','Kalos','Alola','Galar','Paldea','Partners','Hisui','Legends Z-A'];
  var list = STARTERS.filter(function(st) {
    if (starterRegion === 'Hisui') return [722,155,501].includes(st.id);
    if (starterRegion === 'Legends Z-A') return [152,498,656].includes(st.id);
    return starterRegion === 'All' || st.region === starterRegion;
  });
  var h = '<div class="section-intro"><span class="eyebrow">PROFESSOR’S LAB / YOUR FIRST PARTNER</span><h2>Choose your first partner.</h2><p>Every regional starter, plus Pikachu and Eevee. Pick your favorite. You can catch the others later.</p><div class="region-tabs" aria-label="Starter regions">';
  regions.forEach(function(region){ h += '<button class="'+(starterRegion===region?'active':'')+'" aria-pressed="'+(starterRegion===region)+'" onclick="starterRegion=this.textContent;renderStarter()">'+region+'</button>'; });
  h += '</div></div><p class="muted">'+list.length+' partners available · Start at level 5 · Preview before choosing</p><div class="starters">';
  list.forEach(function(st){var d=dexOf(st.id);h += '<button class="starter starter-'+d.types[0]+'" onclick="previewStarter('+st.id+')"><span class="starter-index">'+st.region+' / #'+String(st.id).padStart(3,'0')+'</span><img src="'+artUrl(st.id)+'" alt="'+titleCase(d.name)+'" loading="lazy"><span class="nm">'+titleCase(d.name)+'</span><span class="starter-types">'+typePillsInline(d.types)+'</span><span class="starter-footer">Meet your partner <span>↗</span></span></button>';});
  h += '</div><p class="muted">Hisui and Legends Z-A filters show their starter choices. Evolutions use this game’s default species forms.</p>';
  $('#s-starter').innerHTML=h;
}
function previewStarter(id) {
  var d=dexOf(id), ev=d.evo.map(function(e){return titleCase(dexOf(e.to).name);}).join(' / ');
  modal('<span class="eyebrow">YOUR NEXT ADVENTURE STARTS HERE</span><img class="partner-preview" src="'+artUrl(id)+'" alt="'+titleCase(d.name)+'"><h2>'+titleCase(d.name)+'</h2>'+typePills(d.types)+'<p class="muted">'+esc(d.flavor || d.genus)+'</p>'+(ev?'<p class="muted">Evolves into '+esc(ev)+'</p>':'')+'<div class="row"><button class="primary grow" onclick="pickStarter('+id+')">Choose '+titleCase(d.name)+'</button><button class="ghost" onclick="closeModal()">Keep looking</button></div>');
}

function pickStarter(id) {
  if (!STARTERS.some(function(st){return st.id === id;})) return;
  var m = makeMon(id, 5);
  S.party = [m];
  S.caught[id] = true; S.seen[id] = true;
  saveGame();
  playCry(id);
  modal('<h2>' + titleCase(dexOf(id).name).toUpperCase() + ' joined you!</h2>' +
    '<img src="' + artUrl(id) + '" alt="">' +
    '<p class="muted">Head to Route 1. Every attack you make will cost you a question from ' +
    esc(subjectDef().short || 'C') + ', the harder the move, the harder the question.</p>' +
    '<button class="primary" onclick="closeModal();showScreen(\'map\');renderMap()">Let\'s go ▶</button>');
}

/* ---- map ----------------------------------------------------------------- */

/* Gym leaders and bosses have painted portraits too. Keyed by name, and the
   numbered disc stays as the fallback for anyone not yet painted. */
function leaderFace(name, fallback) {
  var art = (window.LEADER_PORTRAITS || {})[name];
  return art
    ? '<div class="num has-face"><img src="' + art + '" alt="' + esc(name) + '"></div>'
    : '<div class="num">' + fallback + '</div>';
}

function renderMap() {
  var def = subjectDef();
  var h = '<h2>' + esc(def.region) + '</h2>' +
    '<p class="muted" style="margin-bottom:14px">' + esc(def.mapIntro || '') + '</p>';

  if (S.curriculumNotice && activeSubject() === 'c') h = '<div class="panel curriculum-notice"><h3>Your chapters now follow the fourth edition</h3><p>Your Pokémon and question review history are kept. Earlier badges and chapter scores follow their topics. The two pointer chapters now share one badge; Recursion is a new chapter to study. A copy of your earlier chapter record is included in your save.</p><button onclick="dismissCurriculumNotice()">Got it</button></div>' + h;

  /* One list. Gyms in order, and each boss standing exactly where the course
     puts it - which for the C region means all five bunched at the end, and for
     the Isles means an exam every few gyms. */
  if (activeSubject() === 'c') h += questEntryCard();
  var stops = mapStops(), openedBossSection = false;
  h += '<div class="maplist">';

  stops.forEach(function (stop) {
    if (stop.kind === 'gym') {
      var c = stop.ch;
      var got = !!S.badges[c.n];
      var blocker = gymBlockedBy(c.n);
      var st = S.chapterStats[c.n] || { r: 0, w: 0 };
      var tot = st.r + st.w;
      var acc = tot ? Math.round(st.r / tot * 100) + '% of ' + tot : 'not studied yet';
      h += '<div class="route' + (got ? ' done' : '') + (blocker ? ' route-blocked' : '') + '">' +
        leaderFace(c.leader, c.n) +
        '<div><div class="ttl">' + esc(c.title) + ' <span class="badge-dot' + (got ? ' got' : '') + '"></span></div>' +
        '<div class="meta">' + typePillsInline([c.type]) +
        ' ' + esc(c.route) + ' &nbsp;·&nbsp; Gym Leader <b>' + esc(c.leader) + '</b>, ' + esc(c.epithet) +
        ' &nbsp;·&nbsp; <span class="lvl-hint' + (gymExpectedLevel(c) > playerLevel() + 6 ? ' over' : '') +
          '">Lv ~' + gymExpectedLevel(c) + ' · ' + gymTeamSize(c.n) +
          (gymTeamSize(c.n) === 1 ? ' Pokémon' : ' Pokémon') + '</span>' +
        '<br>' + esc(c.blurb) +
        (blocker ? '<br><span class="route-gate">Sit ' + esc(blocker.epithet) + ' before you come back here.</span>'
                 : '<br><span style="opacity:.75">Accuracy: ' + acc + '</span>') +
        '</div></div>' +
        '<div class="acts">' +
        '<button ' + (blocker ? 'disabled' : '') + ' onclick="goWild(' + c.n + ')">Wild battle</button>' +
        '<button class="' + (got || blocker ? '' : 'primary') + '" ' + (blocker ? 'disabled' : '') +
          ' onclick="goGym(' + c.n + ')">' + (got ? 'Rematch gym' : 'Gym') + '</button>' +
        '<button class="ghost" onclick="goStudy(' + c.n + ')">Notes</button>' +
        '<button class="ghost" onclick="openRouteInfo(' + c.n + ')">Route info</button>' +
        '</div></div>';
      return;
    }

    var e = stop.e;
    var beat = bossBeaten(e), open = bossOpen(e), champ = isChampion(e);

    /* The C region still wants its "Victory Road" heading before the block of
       five. The Isles do not - an exam is just the next thing on the calendar. */
    if (!openedBossSection && bossAfter(e) >= CHAPTERS.length && def.bossTitle) {
      openedBossSection = true;
      h += '</div><h2 style="margin-top:22px">' + esc(def.bossTitle) + '</h2>' +
        '<p class="muted" style="margin-bottom:12px">' +
        (open ? 'You have every badge. These battles draw questions from several chapters.'
              : 'Locked until you hold all ' + CHAPTERS.length + ' badges. You have ' + badgeCount() + '.') +
        '</p><div class="maplist">';
    }

    h += '<div class="route boss' + (beat ? ' done' : '') + (champ ? ' final' : '') + '">' +
      leaderFace(e.name, champ ? '★' : '✦') +
      '<div><div class="ttl">' + esc(e.name) + ' <span class="badge-dot' + (beat ? ' got' : '') + '"></span></div>' +
      '<div class="meta">' + (e.types || []).map(function (t) { return '<span class="tp ' + t + '">' + t + '</span>'; }).join('') +
      ' ' + esc(e.epithet) +
      ' &nbsp;·&nbsp; <span class="lvl-hint' + (bossExpectedLevel(e) > playerLevel() + 6 ? ' over' : '') +
        '">Lv ~' + bossExpectedLevel(e) + '</span>' +
      '<br><i>"' + esc(e.intro) + '"</i>' +
      (e.only && e.only.length
        ? '<br><span class="route-only">Only place you are asked about lesson' +
          (e.only.length > 1 ? 's ' : ' ') + e.only.join(', ') + '</span>'
        : '') +
      '<br><span style="opacity:.75">Questions from ' +
        (e.lessons ? 'lessons ' + e.lessons[0] + '–' + e.lessons[e.lessons.length - 1]
                   : 'chapters ' + e.chapters.join(', ')) +
      (open ? '' : ' · needs ' + bossAfter(e) + ' badges, you have ' + badgeCount()) +
      '</span></div></div>' +
      '<div class="acts"><button class="' + (open && !beat ? 'primary' : '') + '" ' + (open ? '' : 'disabled') +
      ' onclick="goElite(\'' + e.id + '\')">' + (beat ? 'Rematch' : 'Challenge') + '</button></div></div>';
  });

  h += '</div><div class="panel town-invite"><h3>Take a break in town</h3><p>Rowan and the others are around. Stop for a chat, make plans, or try a practice match.</p><button onclick="openFriends()">Visit your friends</button></div>';
  $('#s-map').innerHTML = h;
  renderTopbar();
}

function goWild(n) {
  var blocker = gymBlockedBy(n);
  if (blocker) { toast('Sit ' + blocker.epithet + ' first. ' + blocker.name + ' is waiting.'); return; }
  if (!partyAlive()) { toast('Everyone has fainted. Visit the Poké Center.'); return; }
  var c = chapterByNumber(n);
  clearLog();
  startBattle({ kind: 'wild', chapters: [n], foes: [wildFor(c)], title: c.route, chapter: c });
}

function goGym(n) {
  var c = chapterByNumber(n);
  if (!c) return;
  var blocker = gymBlockedBy(n);
  if (blocker) { toast('Sit ' + blocker.epithet + ' first. ' + blocker.name + ' is waiting.'); return; }
  if (!partyAlive()) { toast('Everyone has fainted. Visit the Poké Center.'); return; }
  var dialogue = GYM_DIALOGUE[n];
  var line = S.badges[n] ? dialogue.rematch : dialogue.intro;
  var face = (window.LEADER_PORTRAITS || {})[c.leader];
  modal('<div class="gym-greeting">'+
    (face ? '<img class="leader-face" src="'+face+'" alt="'+esc(c.leader)+'">' : '')+
    '<span class="friend-role">Gym Leader · '+esc(c.epithet)+'</span>'+
    '<h2>'+esc(c.leader)+'</h2><p class="scene-prose">'+esc(line)+'</p>'+
    '<p class="small">Chapter '+c.n+' · '+esc(c.title)+' · '+esc(c.badge)+'</p>'+
    '<div class="row"><button class="primary" id="gymbegin" onclick="beginGymBattle('+c.n+')">Let’s battle</button>'+
    '<button class="ghost" onclick="closeModal()">I need a moment</button></div></div>');
  $('#gymbegin').focus();
}

function beginGymBattle(n) {
  var c = chapterByNumber(n);
  if (!c || (B && !B.over)) return;
  var blocker = gymBlockedBy(n);
  if (blocker) { closeModal(); toast('Sit ' + blocker.epithet + ' first. ' + blocker.name + ' is waiting.'); return; }
  if (!partyAlive()) { closeModal(); toast('Everyone has fainted. Visit the Poké Center.'); return; }
  closeModal();
  clearLog();
  startBattle({
    kind: 'gym', chapters: [n], foes: gymTeam(c), chapter: c, leader: c.leader,
    title: 'Gym Leader ' + c.leader + ', ' + c.badge
  });
}

/* ---- route info ---------------------------------------------------------

   What lives on a route, the way the games have always shown it: a grid of
   everything you can meet there, blacked out until you have caught it. Three
   states, because "I have seen it" and "I have it" are different feelings -
   unseen is a silhouette with no name, seen is a silhouette WITH the name, and
   caught is the Pokemon in full colour. */
function openRouteInfo(n) {
  var c = chapterByNumber(n);
  if (!c) return;
  var list = routeSpecies(c);
  var caught = 0, seen = 0;
  list.forEach(function (r) {
    if (S.caught[r.id]) caught++;
    else if (S.seen[r.id]) seen++;
  });

  var h = '<h2>' + esc(c.route) + '</h2>' +
    '<p class="muted">' + esc(c.title) + ' &nbsp;·&nbsp; ' + typePillsInline([c.type]) +
    '</p>' +
    '<p class="route-tally"><b>' + caught + '</b> of <b>' + list.length +
      '</b> caught here' + (seen ? ' &nbsp;·&nbsp; ' + seen + ' seen but not yet caught' : '') + '</p>';

  if (!list.length) {
    h += '<p class="muted">No encounter table for this route yet.</p>';
  } else {
    h += '<div class="routegrid">';
    list.forEach(function (r) {
      var have = !!S.caught[r.id], met = !!S.seen[r.id];
      var d = dexOf(r.id);
      var label = have || met ? titleCase(d.name) : '???';
      h += '<figure class="routecell ' + (have ? 'have' : met ? 'met' : 'unknown') + '">' +
        '<img src="' + spriteUrl(r.id) + '" alt="' + esc(label) + '">' +
        '<figcaption>' + esc(label) + '</figcaption>' +
        '<span class="rar r-' + r.rarity + '">' + r.rarity + '</span>' +
        '</figure>';
    });
    h += '</div>';
    h += '<p class="small">Common Pokémon turn up about ten times as often as rare ones. ' +
      'Legendaries do not appear on this list - they roam, from five badges onward.</p>';
  }
  h += routeQuestionBaseHtml(c.n);
  h += '<div class="row"><button class="primary" onclick="closeModal();goWild(' + c.n + ')">Hunt here</button>' +
    '<button onclick="closeModal()">Close</button></div>';
  modal(h);
  var routeBox = $('#modal .box');
  if (routeBox) routeBox.scrollTop = 0;
}

function routeQuestions(n) {
  return (QBANK[n] || []).slice().sort(function (a, b) {
    return (Number(a.lesson || 0) - Number(b.lesson || 0)) ||
      (Number(a.t || 0) - Number(b.t || 0)) || String(a.id).localeCompare(String(b.id));
  });
}

function questionWasEncountered(q) {
  return !!(S.srs && S.srs[q.id]);
}

function routeQuestionBaseHtml(n) {
  var questions = routeQuestions(n);
  var met = questions.filter(questionWasEncountered);
  var pct = questions.length ? Math.round(met.length / questions.length * 100) : 0;
  var h = '<section class="question-base"><div class="question-base-head"><div>' +
    '<span class="friend-role">Question base</span>' +
    '<h3>' + met.length + '/' + questions.length + ' questions encountered</h3></div>' +
    '<button class="ghost" onclick="openQuestionBase(' + n + ')">See all questions</button></div>' +
    '<div class="question-progress" role="progressbar" aria-label="Questions encountered" aria-valuemin="0" ' +
    'aria-valuemax="' + questions.length + '" aria-valuenow="' + met.length + '"><span style="width:' + pct + '%"></span></div>';
  if (!questions.length) {
    h += '<p class="muted">No questions are assigned to this route yet.</p>';
  } else if (!met.length) {
    h += '<p class="muted">Questions appear here after you meet them in a battle or drill.</p>';
  } else {
    h += '<div class="question-preview">';
    met.slice(0, 4).forEach(function (q) {
      var stats = S.srs[q.id];
      h += '<div><span>Tier ' + q.t + '</span>' + esc(q.q) +
        '<small>' + ((stats.r || 0) + (stats.w || 0)) + ' attempt' +
        (((stats.r || 0) + (stats.w || 0)) === 1 ? '' : 's') + '</small></div>';
    });
    h += '</div>';
    if (met.length > 4) h += '<p class="small">Plus ' + (met.length - 4) + ' more encountered question' + (met.length - 4 === 1 ? '' : 's') + '.</p>';
  }
  return h + '</section>';
}

function openQuestionBase(n) {
  var c = chapterByNumber(n);
  if (!c) return;
  var questions = routeQuestions(n);
  var met = questions.filter(questionWasEncountered).length;
  var h = '<div class="question-catalog-head"><div><span class="friend-role">' + esc(c.route) + '</span>' +
    '<h2>Question base</h2><p class="muted">' + met + '/' + questions.length +
    ' questions encountered · answers stay hidden</p></div>' +
    '<button class="ghost" onclick="openRouteInfo(' + n + ')">← Route info</button></div>' +
    '<div class="question-catalog">';
  questions.forEach(function (q, i) {
    var metQuestion = questionWasEncountered(q);
    var stats = S.srs[q.id] || { r: 0, w: 0 };
    var attempts = (stats.r || 0) + (stats.w || 0);
    h += '<article class="question-entry ' + (metQuestion ? 'encountered' : 'unseen') + '">' +
      '<div class="question-entry-meta"><span class="qtag">' + esc(q.tag || 'Question') + '</span>' +
      '<span>Tier ' + q.t + (q.lesson ? ' · Lesson ' + q.lesson : '') + '</span>' +
      '<span class="question-status">' + (metQuestion ? 'Encountered' + (attempts ? ' · ' + attempts + ' attempt' + (attempts === 1 ? '' : 's') : '') : 'Not encountered') + '</span></div>' +
      '<div class="question-entry-text"><b>' + (i + 1) + '.</b> ' + esc(q.q) + '</div>' +
      (q.code ? '<pre class="qcode">' + esc(q.code) + '</pre>' : '') + '</article>';
  });
  if (!questions.length) h += '<p class="muted">No questions are assigned to this route yet.</p>';
  h += '</div><div class="row"><button class="primary" onclick="openRouteInfo(' + n + ')">Back to route info</button>' +
    '<button onclick="closeModal()">Close</button></div>';
  modal(h);
  var catalogBox = $('#modal .box');
  if (catalogBox) catalogBox.scrollTop = 0;
}

function goElite(id) {
  var e = ELITE.filter(function (x) { return x.id === id; })[0];
  if (!e) return;
  if (!bossOpen(e)) {
    toast('That needs ' + bossAfter(e) + ' badges. You have ' + badgeCount() + '.');
    return;
  }
  if (!partyAlive()) { toast('Everyone has fainted. Visit the Poké Center.'); return; }
  clearLog();
  startBattle({
    kind: 'elite', chapters: e.chapters, foes: eliteTeam(e), elite: e, leader: e.name,
    title: e.epithet + ', ' + e.name
  });
}

/* ---- party --------------------------------------------------------------- */

var PARTY_SEL = null;

/* The party screen is the PC storage system now; see js/engine/pc.js. */
function renderParty() { renderPC(); renderEvolutionChoices(); renderQuestBerryPouch(); }

/* The old party-card renderer lived here. The party screen is now the PC
   storage system in js/engine/pc.js, so it has been removed. toBox, fromBox
   and rename below are kept as small wrappers around the PC equivalents. */

function toBox(i) {
  PC_SEL = { where: 'party', index: i };
  pcToBox();
}
function fromBox(i) {
  PC_SEL = { where: 'box', index: i };
  pcToParty();
}
/* Kept for any older call sites. prompt() is blocked in many browsers,
   which is why the button used to do nothing; this opens the dialog. */
function rename(i, inBox) {
  var arr = inBox ? S.box : S.party;
  var mon = arr[i];
  if (!mon) return;
  nicknameDialog(mon, function () { renderParty(); });
}

function goCenter() {
  healParty();
  saveGame();
  closeModal();
  showScreen('party'); renderParty();
  toast('Your Pokémon are fully healed.');
}

/* ---- pokedex ------------------------------------------------------------- */

function renderDex() {
  var caught = Object.keys(S.caught).length, seen = Object.keys(S.seen).length;
  var h = '<h2>Pokédex</h2><p class="muted" style="margin-bottom:14px">Caught <b>' + caught +
    '</b> · Seen <b>' + seen + '</b> · of ' + DEX.length + '</p><div class="grid p6">';
  for (var i = 0; i < DEX.length; i++) {
    var d = DEX[i];
    var st = S.caught[d.id] ? 'caught' : S.seen[d.id] ? 'seen' : 'unseen';
    h += '<div class="dexcell ' + st + '" onclick="dexEntry(' + d.id + ')">' +
      '<img src="' + spriteUrl(d.id) + '" alt="" loading="lazy">' +
      '<div class="i">#' + String(d.id).padStart(3, '0') + '</div>' +
      '<div class="n">' + (st === 'unseen' ? '???' : titleCase(d.name)) + '</div></div>';
  }
  h += '</div>';
  $('#s-dex').innerHTML = h;
}

function dexEntry(id) {
  var d = dexOf(id);
  if (!S.seen[id]) { toast('You have not encountered #' + id + ' yet.'); return; }
  var s = d.stats;
  var bars = [['HP', s.hp], ['Attack', s.atk], ['Defense', s.def],
  ['Sp. Atk', s.spa], ['Sp. Def', s.spd], ['Speed', s.spe]];
  modal('<h2>#' + String(id).padStart(3, '0') + ' ' + titleCase(d.name).toUpperCase() + '</h2>' +
    '<img src="' + artUrl(id) + '" alt="">' +
    typePills(d.types) +
    '<p style="font-size:14px"><b>' + esc(d.genus) + '</b></p>' +
    '<p class="muted">' + esc(d.flavor) + '</p>' +
    '<div style="text-align:left;margin-top:12px">' +
    bars.map(function (b) {
      return '<div class="bar-row"><span class="lbl">' + b[0] + '</span>' +
        '<span class="bar-out"><span class="bar-in" style="width:' + Math.min(100, b[1] / 1.8) + '%"></span></span>' +
        '<span class="val">' + b[1] + '</span></div>';
    }).join('') + '</div>' +
    '<p class="muted">Height ' + (d.height / 10) + ' m · Weight ' + (d.weight / 10) + ' kg · Base total ' + d.bst + '</p>' +
    '<button class="primary" onclick="closeModal()">Close</button>');
  playCry(id);
}

/* ---- study notes --------------------------------------------------------- */

var STUDY_CH = 1;

function goStudy(n) { STUDY_CH = n; showScreen('study'); renderStudy(); }

function renderStudy() {
  var c = chapterByNumber(STUDY_CH) || CHAPTERS[0];
  var def = subjectDef();
  var st = S.chapterStats[c.n] || { r: 0, w: 0 };
  var tot = st.r + st.w;
  var h = '<h2>Move Tutor, Chapter Notes</h2>';
  if (activeSubject() === 'c') h += '<p><button onclick="openSideQuests()">Put it into practice: Side Quests</button></p>';

  // Source note is per subject - the fourth-edition alignment is a C-region fact
  // and must not be shown over a calculus chapter.
  if (activeSubject() === 'c') {
    h += '<details class="panel curriculum-source"><summary>Textbook alignment and study scope</summary><p>Fourth edition, ISBN 9780357506134. Chapters 1-8 keep their earlier order; Chapter 9 includes pointer applications, Chapters 10-14 cover strings through lists, and Chapter 15 covers recursion.</p><p>The supplied third edition supports the earlier material. The fourth-edition order is checked against the publisher; individual fourth-edition exercises and every wording change have not been verified. These are original study questions, not the textbook answer key.</p><p>This course uses C99/C11/C17 rules unless a question says otherwise. Required standard headers and declarations are assumed in short snippets.</p><p><a href="https://prod.cengageasia.com/title/default/detail?isbn=9780357506134" target="_blank" rel="noopener">Publisher chapter list</a> · <a href="https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf" target="_blank" rel="noopener">C11 committee draft</a></p></details>';
  } else {
    h += '<details class="panel curriculum-source"><summary>Where these chapters come from</summary><p>' +
      esc(def.book) + '. ' + esc(def.blurb) + '</p><p>Chapters here are quizzes, not textbook chapters. ' +
      'The four numbered above ten are the lessons no quiz covers - the only place they are tested is an exam.</p></details>';
  }

  h += '<div class="row tight" style="margin-bottom:14px">';
  studiableChapters().forEach(function (x) {
    h += '<button class="' + (x.n === STUDY_CH ? 'primary' : 'ghost') +
      (x.examOnly ? ' exam-ch' : '') + '" onclick="goStudy(' + x.n + ')" title="' +
      esc(x.title) + '">' + (x.examOnly ? '✦' : x.n) + '</button>';
  });
  h += '</div>';

  h += '<div class="panel dark" style="margin-bottom:14px">' +
    '<h3 style="color:var(--accent)">' + (c.examOnly ? 'Exam material' : 'Chapter ' + c.n) +
      ', ' + esc(c.title) + '</h3>' +
    '<div class="small">' + typePillsInline([c.type]) + ' ' + esc(c.route || '') +
    (c.leader ? ' · Gym Leader ' + esc(c.leader) + ', ' + esc(c.epithet) : '') +
    '<br>' + esc(c.blurb || '') +
    (c.lessons ? '<br>Lessons ' + c.lessons.join(', ') : '') +
    '<br>Your record here: ' + (tot ? st.r + ' right, ' + st.w + ' wrong (' + Math.round(st.r / tot * 100) + '%)' : 'nothing answered yet') +
    '</div></div>';

  h += '<p class="small">' + ((QBANK[c.n] || []).length) + ' practice questions' +
    (c.thirdEdition ? ' · Third-edition reference: ' + esc(c.thirdEdition) : '') + '</p>';

  h += '<div class="notes">';
  for (var j = 0; j < (c.notes || []).length; j++) h += '<div class="note">' + esc(c.notes[j]) + '</div>';
  h += '</div>';

  // The self-check coding exercise belongs to the C curriculum only.
  var practice = (window.CURRICULUM_PRACTICE || {})[c.n];
  if (practice && activeSubject() === 'c') {
    h += '<section class="panel chapter-practice"><h3>Write some C</h3><p>' + esc(practice[0]) +
      '</p><details><summary>Approach and self-check</summary><p>' + esc(practice[1]) + '</p><p>' +
      esc(practice[2]) + '</p></details><p class="small">Write and run this in your C editor. ' +
      'This exercise is self-checked, not automatically graded.</p></section>';
  }

  h += '<div class="row" style="margin-top:16px">';
  if (!c.examOnly) {
    h += '<button class="primary" onclick="goWild(' + c.n + ')">Test it in a wild battle</button>' +
      '<button onclick="goGym(' + c.n + ')">Challenge ' + esc(c.leader) + '</button>';
  } else {
    var boss = (ELITE || []).filter(function (e) { return e.id === c.exam; })[0];
    if (boss) h += '<button class="primary" onclick="goElite(\'' + boss.id + '\')">Sit ' +
      esc(boss.epithet) + '</button>';
  }
  h += '<button class="ghost" onclick="drill(' + c.n + ')">Drill this chapter (no battle)</button>' +
    '</div>';
  $('#s-study').innerHTML = h;
}

/* ---- drill mode (pure study, no battle) ---------------------------------- */

var D = null;

function drill(ch) {
  D = { chapters: ch === 'review' ? null : [ch], asked: {}, n: 0, right: 0, review: ch === 'review' };
  showScreen('drill');
  nextDrill();
}

/* Mock exam: a fixed number of questions spread across every chapter, timed,
   with a per-chapter breakdown at the end. This is the one mode that is not a
   game - it is meant to feel like sitting the paper. */
function mockExam(count) {
  count = count || 25;
  var picked = [];
  var used = {};
  // spread evenly over the chapters, then fill the remainder at random
  var perCh = Math.floor(count / CHAPTERS.length);
  for (var i = 0; i < CHAPTERS.length; i++) {
    var bank = (QBANK[CHAPTERS[i].n] || []).filter(function (q) { return !q.selfCheck; });
    for (var k = 0; k < perCh && bank.length; k++) {
      var q = bank.splice(Math.floor(Math.random() * bank.length), 1)[0];
      if (!used[q.id]) { used[q.id] = 1; picked.push(q); }
    }
  }
  var all = allQuestions().filter(function (q) { return !used[q.id] && !q.selfCheck; });
  while (picked.length < count && all.length) {
    var q2 = all.splice(Math.floor(Math.random() * all.length), 1)[0];
    used[q2.id] = 1; picked.push(q2);
  }
  // interleave chapters so it does not march 1..15 in order
  picked.sort(function () { return Math.random() - 0.5; });

  D = {
    chapters: null, asked: {}, n: 0, right: 0, review: false,
    exam: picked, examIx: 0, perCh: {}, startedAt: Date.now()
  };
  showScreen('drill');
  nextDrill();
}

function drillReview() {
  var due = [];
  for (var id in S.srs) if (S.srs[id].due <= S.clock) due.push(id);
  if (!due.length) { toast('Nothing is due for review. Go battle!'); return; }
  drill('review');
}

function nextDrill() {
  D.answered = false;
  D.choiceOrder = null;
  D.choiceOrderQuestion = null;
  var chapters = D.chapters;
  if (D.exam) {
    if (D.examIx >= D.exam.length) { endDrill(); return; }
    D.q = D.exam[D.examIx++];
    D.asked[D.q.id] = true;
    D.start = Date.now();
    renderDrill();
    return;
  }
  if (D.review) {
    var due = [];
    var all = allQuestions();
    for (var i = 0; i < all.length; i++) {
      if (S.srs[all[i].id] && S.srs[all[i].id].due <= S.clock && !D.asked[all[i].id]) due.push(all[i]);
    }
    if (!due.length) { endDrill(); return; }
    D.q = due[Math.floor(Math.random() * due.length)];
  } else {
    var got = pickQuestion(chapters, 1 + (D.n % 4), D.asked);
    D.q = got.q;
  }
  D.asked[D.q.id] = true;
  D.start = Date.now();
  renderDrill();
}

function renderDrill() {
  var q = D.q;
  var chNum = questionChapter(q);
  var h;
  if (D.exam) {
    h = '<h2>Mock Exam</h2><p class="muted" style="margin-bottom:12px">Question ' +
      D.examIx + ' of ' + D.exam.length + ' · every chapter, shuffled. ' +
      'Answers and explanations are held back until the end, like a real paper.</p>';
  } else {
    var dch = chapterByNumber(chNum);
    h = '<h2>' + (D.review ? 'Review Center'
          : 'Drill, ' + (dch && dch.examOnly ? esc(dch.title) : 'Chapter ' + chNum)) + '</h2>' +
      '<p class="muted" style="margin-bottom:12px">' + D.right + ' / ' + D.n + ' correct this session. ' +
      'Take your time. There is no battle or timer here.</p>';
  }
  h += '<div class="qcard"><div class="qhead"><span class="qtag">' + (q.tag || 'Question') + '</span>' +
    (S.srs[q.id] ? '<span class="qtag srs">Box ' + S.srs[q.id].box + '/5</span>' : '') +
    '<span>Ch ' + chNum + ' · ' + esc(chapterTitle(chNum)) + '</span>' +
    '<span class="spacer"></span><span>tier ' + q.t + '</span></div>';
  h += '<div class="qtext">' + esc(q.q) + '</div>';
  if (q.code) h += '<pre class="qcode">' + esc(q.code) + '</pre>';
  if (q.selfCheck && !D.exam) {
    h += '<div class="selfcheck">' +
      '<button class="primary" id="drevealself" onclick="revealDrillSelfCheck()">Reveal worked solution</button>' +
      '<div id="dselfsolution" hidden><div class="why"><b>Worked solution</b>' + esc(q.why) + '</div>' +
      '<div class="note">Compare your complete work, not just the last line. How did you do?</div>' +
      '<div class="choices">' +
      '<button class="choice" id="dch0" onclick="drillAnswer(0)"><span class="k">✓</span><span>I got it</span></button>' +
      '<button class="choice" id="dch1" onclick="drillAnswer(1)"><span class="k">↺</span><span>I need to review it</span></button>' +
      '</div></div></div>';
  } else if (q.k === 'fill') {
    h += '<div class="fillwrap"><input id="dfill" autocomplete="off" spellcheck="false" placeholder="type your answer">' +
      '<button class="primary" onclick="drillFill()">Check</button></div>';
  } else {
    h += '<div class="choices">';
    var letters = ['A', 'B', 'C', 'D', 'E'];
    var choiceOrder = displayedChoiceOrder(D, q);
    for (var i = 0; i < choiceOrder.length; i++) {
      var sourceIndex = choiceOrder[i];
      h += '<button class="choice" id="dch' + sourceIndex + '" onclick="drillAnswer(' + sourceIndex + ')">' +
        '<span class="k">' + letters[i] + '</span><span>' + esc(q.c[sourceIndex]) + '</span></button>';
    }
    h += '</div>';
  }
  h += hintBlockHtml(q);
  h += '</div><div class="row" style="margin-top:12px"><button class="ghost" onclick="endDrill()">End session</button></div>';
  $('#s-drill').innerHTML = h;
  var f = $('#dfill');
  if (f) { f.focus(); f.onkeydown = function (e) { if (e.key === 'Enter') drillFill(); }; }
}

function revealDrillSelfCheck() {
  if (!D || !D.q || !D.q.selfCheck || D.answered) return;
  var button = $('#drevealself');
  var solution = $('#dselfsolution');
  if (button) button.hidden = true;
  if (solution) solution.hidden = false;
  showAllHints();
  var gotIt = $('#dch0');
  if (gotIt) gotIt.focus();
}

function drillFill() { var el = $('#dfill'); if (el) drillAnswer(el.value, true); }

function drillAnswer(choice, isFill) {
  if (!D || D.answered) return;
  D.answered = true;
  var q = D.q;
  var correct = q.k === 'fill' ? fillMatches(choice, q.a, q) : choice === q.a;
  recordAnswer(q, correct);
  D.n++; if (correct) D.right++;

  if (q.k !== 'fill') {
    for (var i = 0; i < q.c.length; i++) {
      var el = $('#dch' + i);
      if (!el) continue;
      el.disabled = true;
      if (i === q.a) el.classList.add('right');
      else if (!isFill && i === choice) el.classList.add('wrong');
    }
  } else {
    var f = $('#dfill'); if (f) { f.disabled = true; }
  }
  var card = $('#s-drill .qcard');
  if (D.exam) {
    var chn = questionChapter(q);
    if (!D.perCh[chn]) D.perCh[chn] = { r: 0, w: 0 };
    D.perCh[chn][correct ? 'r' : 'w']++;
    D.exam[D.examIx - 1]._got = correct;
    // an exam does not grade you as you go, so strip the colours back off
    if (q.k !== 'fill') {
      for (var j = 0; j < q.c.length; j++) {
        var e2 = $('#dch' + j);
        if (e2) e2.classList.remove('right', 'wrong');
      }
    }
    var note = document.createElement('div');
    note.className = 'small';
    note.style.marginTop = '10px';
    note.textContent = 'Answer recorded. You will see how you did at the end.';
    card.appendChild(note);
  } else {
    var w = document.createElement('div');
    w.className = 'why' + (correct ? '' : ' bad');
    var ansTxt = q.k === 'fill' ? q.a[0] : q.c[q.a];
    w.innerHTML = '<b>' + (correct ? 'Correct!' : 'Not quite.') + '</b>' +
      (correct ? '' : '<div style="margin-bottom:6px"><strong>Answer:</strong> ' + esc(ansTxt) + '</div>') + esc(q.why);
    if (q.selfCheck) w.innerHTML = '<b>' + (correct ? 'Marked correct.' : 'Queued for review.') + '</b>';
    card.appendChild(w);
  }
  showAllHints();
  var nx = document.createElement('div');
  nx.className = 'row'; nx.style.marginTop = '12px';
  nx.innerHTML = '<button class="primary grow" id="dnext" onclick="nextDrill()">Next ▶</button>';
  card.appendChild(nx);
  var b = $('#dnext'); if (b) b.focus();
  saveGame();
  renderTopbar();
}

function endDrill() {
  var pct = D.n ? Math.round(D.right / D.n * 100) : 0;
  if (D.exam) { showExamReport(pct); return; }
  modal('<h2>Session over</h2><p style="font-size:16px">' + D.right + ' of ' + D.n + ' correct (' + pct + '%)</p>' +
    '<p class="muted">Everything you got wrong is queued for review and will come back soon.</p>' +
    '<button class="primary" onclick="closeModal();showScreen(\'map\');renderMap()">Back to the map</button>');
  D = null;
}

/* Full paper review: score, per-chapter breakdown, then every question you got
   wrong with its worked explanation. */
function showExamReport(pct) {
  var mins = Math.max(1, Math.round((Date.now() - D.startedAt) / 60000));
  var wrong = D.exam.filter(function (q) { return q._got === false; });
  var h = '<h2>Mock Exam , Result</h2>' +
    '<div class="statgrid" style="margin-bottom:14px">' +
    box(pct + '%', 'Score') + box(D.right + '/' + D.n, 'Correct') + box(mins + ' min', 'Time taken') +
    '</div>';

  h += '<div class="panel dark" style="text-align:left"><h3 style="color:var(--accent)">By chapter</h3>';
  var keys = Object.keys(D.perCh).map(Number).sort(function (a, b) {
    var A = D.perCh[a], Bb = D.perCh[b];
    return (A.r / (A.r + A.w)) - (Bb.r / (Bb.r + Bb.w));
  });
  for (var i = 0; i < keys.length; i++) {
    var c = D.perCh[keys[i]], tot = c.r + c.w, p = Math.round(c.r / tot * 100);
    h += '<div class="bar-row"><span class="lbl">' + keys[i] + '. ' + esc(chapterTitle(keys[i])) + '</span>' +
      '<span class="bar-out"><span class="bar-in" style="width:' + p + '%"></span></span>' +
      '<span class="val">' + p + '% \u00b7 ' + tot + '</span></div>';
  }
  h += '</div>';

  if (wrong.length) {
    h += '<div class="panel dark" style="text-align:left;margin-top:14px">' +
      '<h3 style="color:var(--accent)">What you missed (' + wrong.length + ')</h3>';
    for (var j = 0; j < wrong.length; j++) {
      var q = wrong[j];
      var chn = questionChapter(q);
      var ans = q.k === 'fill' ? q.a[0] : q.c[q.a];
      h += '<div class="note" style="margin-bottom:8px">' +
        '<b style="font-family:var(--pixel);font-size:8px">Ch ' + chn + '</b><br>' + esc(q.q) +
        (q.code ? '<pre class="qcode" style="margin-top:8px">' + esc(q.code) + '</pre>' : '') +
        '<div style="margin-top:8px"><b>Answer:</b> ' + esc(ans) + '</div>' +
        '<div style="margin-top:4px">' + esc(q.why) + '</div></div>';
    }
    h += '</div>';
  } else {
    h += '<div class="panel dark" style="margin-top:14px"><p class="small">' +
      'You got every question right. Try another paper or review a different chapter.</p></div>';
  }

  h += '<div class="row" style="margin-top:16px">' +
    '<button class="primary" onclick="mockExam(25)">Another exam</button>' +
    '<button onclick="showScreen(\'stats\');renderStats()">Trainer Card</button>' +
    '<button class="ghost" onclick="showScreen(\'map\');renderMap()">Back to the map</button></div>';

  $('#s-drill').innerHTML = h;
  D = null;
  window.scrollTo(0, 0);
}

/* ---- stats --------------------------------------------------------------- */

function renderStats() {
  var t = S.totals;
  var tot = t.r + t.w;
  var acc = tot ? Math.round(t.r / tot * 100) : 0;
  var mastered = 0, learning = 0, shaky = 0;
  for (var id in S.srs) {
    var b = S.srs[id].box;
    if (b >= 4) mastered++; else if (b >= 2) learning++; else shaky++;
  }
  var totalQ = allQuestions().length;

  var h = '<h2>Trainer Card &amp; Weakness Report</h2>';
  h += '<div class="statgrid trainer-summary-grid">' +
    box(acc + '%', 'Overall accuracy') +
    box(tot, 'Questions answered') +
    box(badgeCount() + '/' + CHAPTERS.length, 'Badges') +
    box(S.bestStreak, 'Best streak') +
    box(Object.keys(S.caught).length, 'Pokémon caught') +
    box(mastered, 'Mastered (box 4-5)') +
    box(shaky, 'Shaky (box 1)') +
    box(Object.keys(S.srs).length + '/' + totalQ, 'Bank seen', 'bank-seen') +
    '</div>';

  h += '<div class="panel dark"><h3 style="color:var(--accent)">Accuracy by chapter, weakest first</h3>' +
    '<p class="small" style="margin-bottom:12px">This is the list to study from. Chapters you have not touched are at the bottom.</p>';
  var w = weakChapters(1);
  if (!w.length) h += '<p class="muted">Answer some questions and this fills in.</p>';
  for (var i = 0; i < w.length; i++) {
    var x = w[i];
    h += '<div class="bar-row"><span class="lbl">' + x.ch.n + '. ' + esc(x.ch.title) + '</span>' +
      '<span class="bar-out"><span class="bar-in" style="width:' + Math.round(x.pct * 100) + '%"></span></span>' +
      '<span class="val">' + Math.round(x.pct * 100) + '% · ' + x.total + '</span></div>';
  }
  var untouched = CHAPTERS.filter(function (c) { var s = S.chapterStats[c.n]; return !s || (s.r + s.w) === 0; });
  if (untouched.length) {
    h += '<p class="small" style="margin-top:12px">Not yet studied: ' +
      untouched.map(function (c) { return 'Ch ' + c.n; }).join(', ') + '</p>';
  }
  h += '</div>';

  var due = dueCount();
  h += '<div class="panel dark" style="margin-top:14px"><h3 style="color:var(--accent)">Review queue</h3>' +
    '<p class="small">' + due + ' question' + (due === 1 ? '' : 's') + ' due right now. ' +
    'Wrong answers come back almost immediately; right answers get pushed further away each time.</p>' +
    '<div class="row" style="margin-top:10px">' +
    '<button class="primary" onclick="drillReview()" ' + (due ? '' : 'disabled') + '>⟳ Review ' + due + ' now</button>' +
    '</div></div>';

  var tp = townProgress();
  h += '<div class="panel dark" style="margin-top:14px"><h3 style="color:var(--accent)">Around the region</h3>' +
    '<div class="statgrid" style="margin:0 0 4px">' +
    box(tp.met + '/' + tp.total, 'People met') +
    box(tp.beaten + '/' + tp.trainers, 'Trainers beaten') +
    box('₵ ' + money().toLocaleString(), 'Money') +
    '</div>' +
    '<div class="row" style="margin-top:10px"><button class="primary" onclick="openTown()">Visit the region</button>' +
    '<button onclick="openShop()">Poké Mart</button></div></div>';

  h += '<div class="panel dark" style="margin-top:14px"><h3 style="color:var(--accent)">Mock exam</h3>' +
    '<p class="small">A shuffled paper drawn from every chapter in ' + esc(subjectDef().region) +
      '. No battle and no hints as you go - ' +
    'you get the score, a per-chapter breakdown and worked answers at the end.</p>' +
    '<div class="row" style="margin-top:10px">' +
    '<button class="primary" onclick="mockExam(25)">Sit a 25-question exam</button>' +
    '<button onclick="mockExam(50)">50 questions</button></div></div>';

  h += '<div class="panel dark" style="margin-top:14px"><h3 style="color:var(--accent)">Save</h3>' +
    '<p class="small">Progress lives in this browser. Export a file to back it up or move it.</p>' +
    '<div class="row" style="margin-top:10px">' +
    '<button onclick="exportSave()">⬇ Export save</button>' +
    '<button onclick="$(\'#importfile\').click()">⬆ Import save</button>' +
    '<button class="danger" onclick="hardReset()">Erase everything</button></div>' +
    '<hr class="sep"><h3 style="color:var(--accent)">Settings</h3><div class="row">' +
    '<button onclick="toggleSetting(\'sound\')">Cries: ' + (S.settings.sound ? 'ON' : 'OFF') + '</button>' +
    '<button onclick="toggleSetting(\'timer\')">Timer: ' + (S.settings.timer ? 'ON' : 'OFF') + '</button>' +
    '<button onclick="cycleSeconds()">' + S.settings.seconds + 's per question</button>' +
    '</div></div>';

  $('#s-stats').innerHTML = h;
  renderTopbar();
}

function box(v, l, cls) {
  return '<div class="statbox' + (cls ? ' ' + cls : '') + '"><div class="v">' + v + '</div><div class="l">' + l + '</div></div>';
}

function toggleSetting(k) { S.settings[k] = !S.settings[k]; saveGame(); renderStats(); }
function cycleSeconds() {
  var opts = [20, 30, 45, 60, 90];
  var i = opts.indexOf(S.settings.seconds);
  S.settings.seconds = opts[(i + 1) % opts.length];
  saveGame(); renderStats();
}
function hardReset() {
  if (!confirm('Erase your save completely? This cannot be undone.')) return;
  wipeSave();
  location.reload();
}

function dismissCurriculumNotice(){S.curriculumNotice=false;saveGame();renderMap();}
