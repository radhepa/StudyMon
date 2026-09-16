/* Pokemon instances: stats, levelling, evolution, sprites, cries.
   Base data comes from PokeAPI via js/data/pokedex.js. */

var DEXBY = {};
(function () { for (var i = 0; i < DEX.length; i++) DEXBY[DEX[i].id] = DEX[i]; })();

function dexOf(id) { return DEXBY[id]; }

function spriteUrl(id, kind) { return 'assets/sprites/' + (kind || 'front') + '/' + id + '.png' + (Number(id) >= 1026 ? '?v=full-line-grid-20260914' : ''); }
function artUrl(id) { return 'assets/sprites/art/' + id + '.png' + (Number(id) >= 1026 ? '?v=full-line-grid-20260914' : ''); }

var _audio = null;
function playCry(id) {
  if (!S || !S.settings.sound) return;
  var d = dexOf(id);
  if (!d || !d.cry) return;
  try {
    if (_audio) { _audio.pause(); }
    _audio = new Audio('assets/cries/' + id + '.ogg');
    _audio.volume = 0.35;
    var p = _audio.play();
    if (p && p.catch) p.catch(function () { });   // browsers block autoplay before a gesture
  } catch (e) { }
}

function titleCase(s) {
  return s.split('-').map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(' ');
}

/* ---- instance creation ------------------------------------------------- */

/* One in a thousand. Rare enough that finding one is worth stopping for, which
   is the point: the odds are what make it feel earned. */
var SHINY_RATE = 1 / 1000;

function makeMon(id, level, opts) {
  opts = opts || {};
  var d = dexOf(id);
  var m = {
    id: id,
    lvl: level,
    xp: 0,
    shiny: d.shiny === false ? false :
      (opts.shiny !== undefined ? opts.shiny : (Math.random() < SHINY_RATE)),
    nick: null,
    hp: 0
  };
  m.hp = maxHp(m);
  return m;
}

function maxHp(m) {
  var b = dexOf(m.id).stats.hp;
  return Math.floor(b * 2 * m.lvl / 100) + m.lvl * 2 + 25;
}

/* Moves unlock with level, which is also how question difficulty unlocks:
   a level-5 Pokemon can only ask you tier-1 recall questions, and Hyper Beam
   (tier 4, the hardest questions in the bank) arrives at level 30. */
var TIER_LEVEL = { 1: 1, 2: 8, 3: 18, 4: 30 };

function movesOf(m) {
  return dexOf(m.id).moves.map(function (mv) {
    var need = TIER_LEVEL[mv.tier];
    var o = {};
    for (var k in mv) o[k] = mv[k];
    o.need = need;
    o.locked = m.lvl < need;
    return o;
  });
}
function usableMoves(m) {
  var u = movesOf(m).filter(function (mv) { return !mv.locked; });
  return u.length ? u : [movesOf(m)[0]];
}
function statOf(m, key) {
  var b = dexOf(m.id).stats[key];
  return Math.floor(b * 2 * m.lvl / 100) + 5;
}
function monName(m) {
  return m.nick || titleCase(dexOf(m.id).name);
}
function monSprite(m, kind) {
  if (m.shiny && (kind === 'front' || !kind)) return spriteUrl(m.id, 'shiny');
  return spriteUrl(m.id, kind || 'front');
}

/* ---- experience --------------------------------------------------------- */

function xpToNext(lvl) { return Math.floor(3 * lvl * lvl + 25 * lvl + 25); }

/* Returns a list of event strings describing what happened. */
function giveXp(m, amount) {
  var events = [];
  if (m.lvl >= 100) return events;
  m.xp += amount;
  while (m.lvl < 100 && m.xp >= xpToNext(m.lvl)) {
    m.xp -= xpToNext(m.lvl);
    var beforeHp = maxHp(m);
    m.lvl++;
    m.hp += maxHp(m) - beforeHp;      // levelling heals by the HP you gained
    events.push({ kind: 'level', lvl: m.lvl });
    var ev = evolutionFor(m);
    if (ev) {
      var from = monName(m);
      m.id = ev.to;
      if (m.hp > maxHp(m)) m.hp = maxHp(m);
      events.push({ kind: 'evolve', from: from, to: monName(m), id: ev.to });
    }
  }
  if (m.lvl >= 100) m.xp = 0;
  return events;
}

function evolutionFor(m) {
  var d = dexOf(m.id);
  if (!d.evo || !d.evo.length) return null;
  // Branching families wait for an explicit choice in the Party screen.
  if (new Set(d.evo.map(function(e){return e.to;})).size > 1) return null;
  for (var i = 0; i < d.evo.length; i++) {
    var e = d.evo[i];
    // stone / trade evolutions are granted by level in this game so every line can finish
    var need = e.level || 32;
    if (m.lvl >= need) return e;
  }
  return null;
}

function healMon(m) { m.hp = maxHp(m); }
function healParty() { for (var i = 0; i < S.party.length; i++) healMon(S.party[i]); }
function partyAlive() { return S.party.some(function (m) { return m.hp > 0; }); }
function firstAlive() { return S.party.find(function (m) { return m.hp > 0; }); }

/* ---- type effectiveness ------------------------------------------------- */

function effectiveness(moveType, defTypes) {
  var rel = TYPE_CHART[moveType];
  if (!rel) return 1;
  var mult = 1;
  for (var i = 0; i < defTypes.length; i++) {
    var t = defTypes[i];
    if (rel.none.indexOf(t) >= 0) return 0;
    if (rel.double.indexOf(t) >= 0) mult *= 2;
    else if (rel.half.indexOf(t) >= 0) mult *= 0.5;
  }
  return mult;
}

function effLabel(x) {
  if (x === 0) return "It had no effect...";
  if (x >= 4) return "It's ridiculously effective!";
  if (x >= 2) return "It's super effective!";
  if (x <= 0.25) return "It's barely a scratch...";
  if (x <= 0.5) return "It's not very effective...";
  return null;
}

/* ---- damage ------------------------------------------------------------- */

function damageOf(attacker, defender, move, bonus) {
  var d = dexOf(attacker.id);
  var special = ['water', 'grass', 'fire', 'electric', 'psychic', 'ice', 'dragon', 'dark'].indexOf(move.type) >= 0;
  var A = statOf(attacker, special ? 'spa' : 'atk');
  var D = statOf(defender, special ? 'spd' : 'def');
  var base = Math.floor(((2 * attacker.lvl / 5 + 2) * move.power * (A / Math.max(1, D))) / 50) + 2;
  var stab = d.types.indexOf(move.type) >= 0 ? 1.5 : 1;
  var eff = effectiveness(move.type, dexOf(defender.id).types);
  var rand = 0.85 + Math.random() * 0.15;
  var dmg = Math.floor(base * stab * eff * rand * (bonus || 1));
  return { dmg: eff === 0 ? 0 : Math.max(eff === 0 ? 0 : 1, dmg), eff: eff, stab: stab > 1 };
}

/* ---- roster helpers ----------------------------------------------------- */

function monsOfType(types, opts) {
  opts = opts || {};
  return DEX.filter(function (d) {
    if (opts.noLegend && d.legendary) return false;
    for (var i = 0; i < types.length; i++) if (d.types.indexOf(types[i]) >= 0) return true;
    return false;
  });
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

/* Reverse evolution map, so an opponent can be de-evolved down to something
   your team can actually fight. Without this the Chapter 1 gym fields Snorlax
   against a level-5 starter. */
var PRE_EVO = {};
(function () {
  for (var i = 0; i < DEX.length; i++) {
    var d = DEX[i];
    for (var j = 0; j < d.evo.length; j++) PRE_EVO[d.evo[j].to] = d.id;
  }
})();

/* Walk an evolution line FORWARDS a number of stages. Branching lines take the
   first branch, which is how the player's own Pokemon evolve too. */
function evolveSpecies(id, stages) {
  var guard = 0;
  while (stages > 0 && guard++ < 4) {
    var d = dexOf(id);
    if (!d.evo || !d.evo.length) break;
    id = d.evo[0].to;
    stages--;
  }
  return id;
}

/* Walk an evolution line backwards until the species is within reach. */
function scaleSpecies(id, capBst) {
  var guard = 0;
  while (dexOf(id).bst > capBst && PRE_EVO[id] && guard++ < 4) id = PRE_EVO[id];
  return id;
}

/* The strongest thing the player currently owns, used as the yardstick. */
function partyCapBst() {
  if (!S || !S.party.length) return 320;
  return S.party.reduce(function (m, p) { return Math.max(m, dexOf(p.id).bst); }, 0);
}

/* Opponent levels track YOUR strongest Pokemon, so a route you have never
   visited is playable on the night you happen to be studying that chapter. */
function playerLevel() {
  if (!S || !S.party.length) return 5;
  return S.party.reduce(function (m, p) { return Math.max(m, p.lvl); }, 1);
}
function clampLvl(n) { return Math.max(2, Math.min(100, Math.round(n))); }

/* ---------------------------------------------------------------- the curve

   Scaling to the player alone made levels meaningless: the fifteenth gym leader
   would open with a level 7 if you turned up with a level 5 starter, and a level
   50 Blaziken ended any gym in one question. So gyms and bosses now have a
   FLOOR set by how far into the region they sit, and the player-scaling is only
   allowed to push them up from there:

       level = max(positional floor, your level + offset)

   Walk into the last gym underlevelled and it is a wall, the way it should be.
   Walk into the first gym at level 60 and it climbs to meet you rather than
   rolling over. Wild routes are deliberately left OUT of this - they still track
   your party exactly - so every chapter stays studiable tonight even when its
   gym is far beyond you. The study function lives on the routes and the Drill
   screen; the gym is the thing you have to earn. */
/* Calibrated against the real games rather than invented. Averaging ace levels
   across Kanto, Hoenn and Sinnoh gives roughly 14, 21, 25, 30, 34, 40, 45, 50
   for the eight gyms - which is very nearly a straight line from 14 to 50, so a
   linear floor across however many gyms a region has reproduces the real shape.
   The Elite Four then sit at 54-60 and the Champion at 63-65, a clear step above
   the last gym rather than a continuation of the same slope.

   The scale-up half aims slightly BELOW your best Pokemon (playerLevel() - 3,
   ace at +3), because in a real playthrough you arrive at a gym a little over-
   levelled and win. Sitting the gym permanently above you would punish exactly
   the heavy, repeated play this game is built for. */
var LEVEL_FLOOR_MIN = 12, LEVEL_FLOOR_MAX = 47;   // + ACE_BONUS lands the ace
                                                  // on 15 and 50, against
                                                  // Brock's 14 and Giovanni's 50
var BST_FLOOR_MIN = 320, BST_FLOOR_MAX = 600;
var ACE_BONUS = 3;             // a leader's ace sits above the rest of the team
var SCALE_UNDERCUT = 3;        // how far below your best the scaling aims

/* How far through the region a gym sits, 0 for the first and 1 for the last. */
function chapterProgress(n) {
  var total = CHAPTERS.length;
  if (total < 2) return 0;
  return Math.max(0, Math.min(1, (Number(n) - 1) / (total - 1)));
}

function gymLevelFloor(n) {
  return LEVEL_FLOOR_MIN + chapterProgress(n) * (LEVEL_FLOOR_MAX - LEVEL_FLOOR_MIN);
}
function gymBstFloor(n) {
  return BST_FLOOR_MIN + chapterProgress(n) * (BST_FLOOR_MAX - BST_FLOOR_MIN);
}

/* A boss is a step above the gym it follows, not a continuation of the slope -
   in the real games the Elite Four open four levels above the eighth gym and the
   Champion sits thirteen above it. */
function bossLevelFloor(e) {
  var after = (typeof bossAfter === 'function') ? bossAfter(e) : CHAPTERS.length;
  if (isChampion(e)) return gymLevelFloor(after) + 13;
  // Bosses sharing a slot ramp against each other the way an Elite Four does -
  // 54, 56, 58, 60 in the real games rather than four identical teams.
  var peers = (ELITE || []).filter(function (x) {
    return !isChampion(x) && bossAfter(x) === after;
  });
  var rank = Math.max(0, peers.indexOf(e));
  return gymLevelFloor(after) + 4 + rank * 2;
}
function bossBstFloor(e) {
  var after = (typeof bossAfter === 'function') ? bossAfter(e) : CHAPTERS.length;
  return gymBstFloor(after) + (isChampion(e) ? 80 : 40);
}

/* How many Pokemon a leader brings, by position rather than by how many badges
   you happen to hold - the last gym in a region is a three-Pokemon fight even on
   a fresh save. */
function gymTeamSize(n) {
  // Real leaders open with two and finish with three or four. Four would make a
  // gym a fifty-question sitting here, since every attack costs a question, so
  // the ramp stops at three.
  return chapterProgress(n) >= 0.35 ? 3 : 2;
}

/* What the map should promise before you walk in. */
function gymExpectedLevel(chapter) {
  return clampLvl(Math.max(gymLevelFloor(chapter.n),
    playerLevel() - SCALE_UNDERCUT) + ACE_BONUS);
}
function bossExpectedLevel(e) {
  // A boss team ramps upward across its members, so the hint should promise the
  // top of that ramp - the thing you actually have to beat last.
  var rank = Math.max(0, (ELITE || []).indexOf(e));
  var base = Math.max(bossLevelFloor(e),
    playerLevel() - SCALE_UNDERCUT + (isChampion(e) ? 8 : 3 + rank * 2));
  return clampLvl(base + (isChampion(e) ? 6 : 4));
}

/* Candidate species for an opponent: type-matched, non-legendary, and no
   stronger than `cap`. The strongest survivors come first. */
function opponentPool(types, cap, allowLegend) {
  var pool = monsOfType(types, { noLegend: !allowLegend })
    .filter(function (d) { return d.bst <= cap; });
  if (!pool.length) {
    // nothing in this type is small enough - de-evolve the whole type instead
    var seen = {};
    pool = monsOfType(types, { noLegend: !allowLegend }).map(function (d) {
      return dexOf(scaleSpecies(d.id, cap));
    }).filter(function (d) { return !seen[d.id] && (seen[d.id] = 1); });
  }
  if (!pool.length) pool = DEX.filter(function (d) { return !d.legendary && d.bst <= cap; });
  if (!pool.length) pool = [dexOf(19)];   // Rattata, the universal fallback
  return pool.slice().sort(function (a, b) { return b.bst - a.bst; });
}

/* Every legendary and mythical in the roster, for the rare roaming encounter. */
function legendaries() {
  return DEX.filter(function (d) { return d.legendary; });
}

/* Once you are five badges in, a wild slot occasionally turns up something that
   should not be there. Type-matched to the route when possible, otherwise any
   legendary - so pure-Fire Entei is still findable even though no chapter maps
   to Fire. They arrive above your level and are very hard to catch. */
function legendaryFor(chapter) {
  var all = legendaries();
  var matched = all.filter(function (d) {
    for (var i = 0; i < chapter.teamTypes.length; i++) {
      if (d.types.indexOf(chapter.teamTypes[i]) >= 0) return true;
    }
    return false;
  });
  var bag = (matched.length && Math.random() > 0.25) ? matched : all;
  if (!bag.length) return null;
  return makeMon(pick(bag).id, clampLvl(playerLevel() + 5));
}

/* The fixed table of what lives on a route, common first. */
function routeTable(chapter) {
  var reg = (window.ENCOUNTERS || {})[activeSubject()] || {};
  return reg[chapter.n] || [];
}

/* Every species a route can give you, for the Route info panel. */
function routeSpecies(chapter) {
  return routeTable(chapter).map(function (r) { return { id: r[0], rarity: r[1] }; });
}

/* Wild encounter for a chapter. Drawn from that route's own table so the Route
   info panel is a promise rather than a guess, weighted by rarity. Levels still
   track your party - a route has to stay studiable the night you need it. */
function wildFor(chapter) {
  if (badgeCount() >= 5 && Math.random() < 0.03) {
    var leg = legendaryFor(chapter);
    if (leg) { leg.isLegendary = true; return leg; }
  }
  var table = routeTable(chapter);
  var base = playerLevel();
  var lvl = clampLvl(base - 2 + Math.floor(Math.random() * 4));

  if (!table.length) {                       // a region with no table yet
    var pool = opponentPool(chapter.teamTypes, Math.max(partyCapBst() * 1.02, 320 + badgeCount() * 25));
    return makeMon(pool[Math.floor(Math.random() * pool.length)].id, lvl);
  }

  var weights = window.RARITY_WEIGHT || { common: 10, uncommon: 4, rare: 1 };
  var total = 0, i;
  for (i = 0; i < table.length; i++) total += weights[table[i][1]] || 1;
  var roll = Math.random() * total;
  for (i = 0; i < table.length; i++) {
    roll -= weights[table[i][1]] || 1;
    if (roll <= 0) return makeMon(table[i][0], lvl);
  }
  return makeMon(table[table.length - 1][0], lvl);
}

/* Gym leader team: three type-matched species, the ace last and strongest.
   The ace de-evolves if your team could not possibly handle its final form. */
function gymTeam(chapter) {
  // Both the species cap and the level take the higher of "what this gym is
  // worth" and "what your team can field", so the gym is never trivial and
  // never a level 7 at the end of the region.
  var bstFloor = gymBstFloor(chapter.n);
  var cap = Math.max(partyCapBst() * 1.12, bstFloor);
  var pool = opponentPool(chapter.teamTypes, cap);
  // De-evolve the ace toward your team's level. If it has no pre-evolution to
  // fall back to (Snorlax, Heracross), swap in the best legal species instead -
  // otherwise the Chapter 1 leader opens with a full Snorlax against a starter.
  var aceCap = Math.max(partyCapBst() * 1.25, bstFloor);
  var ace = scaleSpecies(chapter.ace, aceCap);
  if (dexOf(ace).bst > aceCap * 1.1) ace = pool[0].id;
  var base = Math.max(gymLevelFloor(chapter.n), playerLevel() - SCALE_UNDERCUT);
  // the ramp is positional: early leaders bring one, the last few bring three
  var size = gymTeamSize(chapter.n) - 1;
  var team = [];
  var used = {};
  used[ace] = 1;
  for (var i = 0; i < pool.length && team.length < size; i++) {
    if (used[pool[i].id]) continue;
    used[pool[i].id] = 1;
    team.push(makeMon(pool[i].id, clampLvl(base + team.length)));
  }
  while (team.length < size) team.push(makeMon(pool[0].id, clampLvl(base)));
  team.push(makeMon(ace, clampLvl(base + ACE_BONUS)));
  return team;
}

function eliteTeam(e) {
  var champ = (typeof isChampion === 'function') ? isChampion(e) : e.id === 'champ';
  var bstFloor = bossBstFloor(e);
  var cap = Math.max(partyCapBst() * (champ ? 1.35 : 1.2), bstFloor);
  var pool = opponentPool(e.types, cap, champ);
  var aceCap = Math.max(partyCapBst() * 1.4, bstFloor);
  var ace = scaleSpecies(e.ace, aceCap);
  if (dexOf(ace).bst > aceCap * 1.12) ace = pool[0].id;
  var rank = ELITE.findIndex(function (x) { return x.id === e.id; });
  var base = Math.max(bossLevelFloor(e),
    playerLevel() - SCALE_UNDERCUT + (champ ? 8 : 3 + rank * 2));
  var team = [];
  var used = {};
  used[ace] = 1;
  for (var i = 0; i < pool.length && team.length < (champ ? 5 : 3); i++) {
    if (used[pool[i].id]) continue;
    used[pool[i].id] = 1;
    team.push(makeMon(pool[i].id, clampLvl(base + team.length)));
  }
  while (team.length < (champ ? 5 : 3)) team.push(makeMon(pool[0].id, clampLvl(base)));
  team.push(makeMon(ace, clampLvl(base + (champ ? 6 : 4))));
  return team;
}
