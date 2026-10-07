/* Phase 6: gym leaders and bosses after the match.

   Before this file a leader existed only inside the one gym battle. Now every
   gym leader and boss in both subjects:

   - resolves through the cast registry (gymLeaderRegistry / leaderById),
   - has a presence state derived from badges that already exist in the save
     (unbeaten, just-defeated, settled, later-badges, region-cleared), so an
     old save with badges sees the post-defeat world immediately,
   - is sometimes out at one of their subject's LOCATIONS instead of the gym,
   - can be visited from the map (openLeader) and befriended like anyone else,
   - offers an optional rematch through its own battle kind, `rematch`, which
     never touches badges, boss clears, gym gates, receipts or first-win items.

   Save state lives in S.leaders = { version: 1, records: { castId: record } },
   separate from badge ownership. A record is created lazily; no record just
   means "no history this build has seen", never "unbeaten". */

var LEADER_SAVE_VERSION = 1;
var LEADER_JUST_DEFEATED_WINDOW = 60;   // answered questions a fresh win stays "fresh"
var LEADER_LATER_MARKERS = 3;           // badges/boss clears since the win that make it "later"
var LEADER_HANGOUT_WINDOW = 20;         // answered questions per whereabouts roll
var LEADER_REMATCH_COOLDOWN = 40;       // answered questions between rematch wins
var LEADER_REMATCH_PAID_CEILING = 6;    // rematch wins that pay money, per leader, ever
var LEADER_REMATCH_PRIZE = { 1: 0.3, 2: 0.4, 3: 0.5 };   // share of the first-win prize
var LEADER_REMATCH_MAX_TIER = 3;
var LEADER_REMATCH_EXP = 1.3;           // EXP multiplier per KO: wild 1.0 < rematch < first-time gym 1.6

/* ---- registry ------------------------------------------------------------ */

var LEADER_REGISTRY_CACHE = null;

function leaderSubjectDef(subject) {
  if (window.SUBJECTS && SUBJECTS[subject]) return SUBJECTS[subject];
  if (subject === 'calc') return { CHAPTERS: window.CALC_CHAPTERS || [], ELITE: window.CALC_ELITE || [],
    LOCATIONS: window.CALC_LOCATIONS || [], GYM_DIALOGUE: window.CALC_GYM_DIALOGUE || {} };
  return { CHAPTERS: window.CHAPTERS || [], ELITE: window.ELITE || [], LOCATIONS: window.LOCATIONS || [],
    GYM_DIALOGUE: window.GYM_DIALOGUE || {} };
}

function leaderBossAfter(subject, boss) {
  return typeof boss.after === 'number' ? boss.after : leaderSubjectDef(subject).CHAPTERS.length;
}

/* How far into its subject a leader stands: the number of gyms and bosses you
   would hold on beating them in map order. Used to estimate "later" for saves
   that predate leader records. */
function leaderStops(subject) {
  var def = leaderSubjectDef(subject), out = [];
  var bosses = (def.ELITE || []).slice().sort(function (a, b) {
    return leaderBossAfter(subject, a) - leaderBossAfter(subject, b);
  });
  var placed = {};
  (def.CHAPTERS || []).forEach(function (c) {
    out.push(subject + '-gym-' + c.n);
    bosses.forEach(function (e) {
      if (!placed[e.id] && leaderBossAfter(subject, e) === c.n) { out.push(subject + '-boss-' + e.id); placed[e.id] = 1; }
    });
  });
  bosses.forEach(function (e) { if (!placed[e.id]) out.push(subject + '-boss-' + e.id); });
  return out;
}

function gymLeaderRegistry() {
  if (LEADER_REGISTRY_CACHE) return LEADER_REGISTRY_CACHE;
  if (typeof castEntries !== 'function') return [];
  var profiles = window.GYM_LEADER_PROFILES || {}, portraits = window.LEADER_PORTRAITS || {};
  var order = {};
  ['c', 'calc'].forEach(function (subject) {
    leaderStops(subject).forEach(function (id, i) { order[id] = i + 1; });
  });
  var out = castEntries({ sourceKind: ['gym-leader', 'boss'] }).map(function (entry) {
    var source = castSource(entry) || {};
    var kind = entry.sourceKind === 'gym-leader' ? 'gym' : 'boss';
    return Object.freeze({
      castId: entry.id, subject: entry.homeSubject, kind: kind, ref: entry.sourceRef,
      name: entry.name, epithet: source.epithet || entry.role, tier: entry.tier,
      befriendable: entry.befriendable, homeLocation: entry.recurringLocations[0],
      position: order[entry.id] || 0,
      champion: kind === 'boss' && (!!source.champion || source.id === 'champ'),
      profile: profiles[entry.id] || null,
      portrait: portraits[entry.name] || null
    });
  });
  if (window.SUBJECTS && SUBJECTS.c && SUBJECTS.calc) LEADER_REGISTRY_CACHE = out;
  return out;
}

function leaderById(castId) {
  var list = gymLeaderRegistry();
  for (var i = 0; i < list.length; i++) if (list[i].castId === castId) return list[i];
  return null;
}
function isLeaderId(castId) { return !!leaderById(castId); }
function leaderForGym(n, subject) { return (subject || activeSubject()) + '-gym-' + n; }
function leaderForBoss(id, subject) { return (subject || activeSubject()) + '-boss-' + id; }
function leaderSource(leader) { return leader ? castSource(leader.castId) : null; }
function leaderFirstName(leader) { return String(leader.name).split(' ')[0]; }

/* ---- save state ---------------------------------------------------------- */

function freshLeaderRecord() {
  return { beatenAt: null, visits: 0, lastVisitClock: -1,
    rematch: { wins: 0, losses: 0, paidWins: 0, lastWinClock: null, bestTier: 0 } };
}

function leaderCount(value) { return Math.max(0, Math.floor(Number(value) || 0)); }

function normalizeLeaderRecord(record) {
  var base = freshLeaderRecord();
  if (!record || typeof record !== 'object' || Array.isArray(record)) return base;
  var beatenAt = record.beatenAt;
  base.beatenAt = beatenAt && typeof beatenAt === 'object' && !Array.isArray(beatenAt)
    ? { clock: leaderCount(beatenAt.clock), marker: leaderCount(beatenAt.marker) } : null;
  base.visits = leaderCount(record.visits);
  base.lastVisitClock = Number.isFinite(Number(record.lastVisitClock)) ? Math.floor(Number(record.lastVisitClock)) : -1;
  var r = record.rematch && typeof record.rematch === 'object' && !Array.isArray(record.rematch) ? record.rematch : {};
  base.rematch.wins = leaderCount(r.wins);
  base.rematch.losses = leaderCount(r.losses);
  base.rematch.paidWins = Math.min(base.rematch.wins, leaderCount(r.paidWins));
  base.rematch.lastWinClock = r.lastWinClock === null || r.lastWinClock === undefined || !Number.isFinite(Number(r.lastWinClock))
    ? null : leaderCount(r.lastWinClock);
  base.rematch.bestTier = Math.min(LEADER_REMATCH_MAX_TIER, leaderCount(r.bestTier));
  return base;
}

/* Unknown IDs are normalised and kept, so a record written by a newer build
   survives a round trip through this one. */
function ensureLeaders() {
  if (!S) return;
  var box = S.leaders;
  if (!box || typeof box !== 'object' || Array.isArray(box)) box = S.leaders = { version: LEADER_SAVE_VERSION, records: {} };
  if (!box.records || typeof box.records !== 'object' || Array.isArray(box.records)) box.records = {};
  box.version = LEADER_SAVE_VERSION;
  Object.keys(box.records).forEach(function (id) { box.records[id] = normalizeLeaderRecord(box.records[id]); });
}

function leaderRecord(castId, create) {
  ensureLeaders();
  if (S.leaders.records[castId]) return S.leaders.records[castId];
  if (!create || !isLeaderId(castId)) return null;
  return S.leaders.records[castId] = freshLeaderRecord();
}

/* ---- progress and presence ----------------------------------------------- */

function leaderTrueCount(obj) {
  return Object.keys(obj || {}).filter(function (key) { return !!obj[key]; }).length;
}

function leaderProgress(subject) {
  if (!S) return { badges: {}, elite: {} };
  if (subject === activeSubject()) return { badges: S.badges || {}, elite: S.elite || {} };
  var p = S.progress && S.progress[subject];
  return { badges: (p && p.badges) || {}, elite: (p && p.elite) || {} };
}

function leaderMarker(subject) {
  var p = leaderProgress(subject);
  return leaderTrueCount(p.badges) + leaderTrueCount(p.elite);
}

function leaderBeaten(leader) {
  if (!leader) return false;
  var p = leaderProgress(leader.subject);
  return leader.kind === 'gym' ? !!p.badges[leader.ref] : !!p.elite[leader.ref];
}

function leaderRegionCleared(subject) {
  var def = leaderSubjectDef(subject), p = leaderProgress(subject);
  return (def.CHAPTERS || []).every(function (c) { return !!p.badges[c.n]; }) &&
    (def.ELITE || []).every(function (e) { return !!p.elite[e.id]; });
}

function leaderClock() { return Math.max(0, Number(S && S.activityClock) || 0); }

/* Called by winBattle on the FIRST gym/boss win only, after the badge is set. */
function leaderRecordFirstDefeat(castId) {
  var leader = leaderById(castId);
  if (!leader) return null;
  var record = leaderRecord(castId, true);
  if (!record.beatenAt) record.beatenAt = { clock: leaderClock(), marker: leaderMarker(leader.subject) };
  return record;
}

function leaderState(castId) {
  var leader = leaderById(castId);
  if (!leader || !S) return null;
  if (!leaderBeaten(leader)) return 'unbeaten';
  if (leaderRegionCleared(leader.subject)) return 'region-cleared';
  var record = leaderRecord(castId, false), marker = leaderMarker(leader.subject);
  if (record && record.beatenAt) {
    if (marker - record.beatenAt.marker >= LEADER_LATER_MARKERS) return 'later-badges';
    if (marker <= record.beatenAt.marker && leaderClock() - record.beatenAt.clock < LEADER_JUST_DEFEATED_WINDOW) return 'just-defeated';
    return 'settled';
  }
  // A save from before leader records: no fresh win to remember, so estimate
  // "later" from where this leader stands in the region.
  return marker - leader.position >= LEADER_LATER_MARKERS ? 'later-badges' : 'settled';
}

function leaderHash(text) {
  var h = 0;
  for (var i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) % 1000003;
  return h;
}

function leaderLocationDef(subject, id) {
  var list = leaderSubjectDef(subject).LOCATIONS || [];
  for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
  return null;
}

function leaderHomeLabel(leader) {
  var source = leaderSource(leader) || {};
  if (leader.kind === 'gym') {
    var route = String(source.route || '');
    return 'the gym on ' + (route.indexOf(' - ') >= 0 ? route.split(' - ')[1] : route || 'their route');
  }
  return leader.subject === 'calc' ? 'the Exam Hall' : 'Victory Road';
}

/* Deterministic, so the same save in the same moment always agrees: a leader
   is at home until beaten and on the day of the win, then out at one of their
   open hangouts for about four activity windows in ten. */
function leaderWhereabouts(castId) {
  var leader = leaderById(castId);
  if (!leader) return null;
  var home = { away: false, locationId: leader.homeLocation, name: leaderHomeLabel(leader) };
  var state = leaderState(castId);
  if (state === 'unbeaten' || state === 'just-defeated') return home;
  var badges = leaderTrueCount(leaderProgress(leader.subject).badges);
  var hangouts = ((leader.profile && leader.profile.hangouts) || []).filter(function (id) {
    var loc = leaderLocationDef(leader.subject, id);
    return !!loc && badges >= (loc.badges || 0);
  });
  if (!hangouts.length) return home;
  var slot = Math.floor(leaderClock() / LEADER_HANGOUT_WINDOW);
  var roll = leaderHash(castId + ':' + slot) % 10;
  if (roll < 6) return home;
  var id = hangouts[roll % hangouts.length];
  return { away: true, locationId: id, name: leaderLocationDef(leader.subject, id).name };
}

/* Leaders out and about at one of the active subject's locations. */
function leadersAt(locationId) {
  return gymLeaderRegistry().filter(function (leader) {
    if (leader.subject !== activeSubject()) return false;
    var where = leaderWhereabouts(leader.castId);
    return !!where && where.away && where.locationId === locationId;
  });
}

/* One compact selector for the UI and later phases. */
function leaderAvailability(castId) {
  var leader = leaderById(castId);
  if (!leader) return null;
  return { castId: castId, state: leaderState(castId), whereabouts: leaderWhereabouts(castId),
    rematch: leaderRematchStatus(castId) };
}

/* ---- dialogue ------------------------------------------------------------ */

var LEADER_STATE_POOL = {
  'just-defeated': 'justDefeated', settled: 'settled', 'later-badges': 'laterBadges', 'region-cleared': 'regionCleared'
};

function leaderLines(castId, pool) {
  var leader = leaderById(castId);
  var lines = leader && leader.profile && leader.profile.lines && leader.profile.lines[pool];
  return Array.isArray(lines) ? lines : [];
}

function leaderPickLine(castId, pool, turn, place) {
  var lines = leaderLines(castId, pool);
  if (!lines.length) return null;
  var index = (leaderCount(turn) + leaderHash(castId + ':' + pool)) % lines.length;
  return { id: castId + '-' + pool + '-' + (index + 1), pool: pool,
    text: lines[index].replace(/\{place\}/g, place || 'this spot') };
}

function leaderTurn(castId) {
  var record = leaderRecord(castId, false), f = S && S.friends && S.friends[castId];
  return (record ? record.visits : 0) + (f ? leaderCount(f.talks) : 0);
}

/* What the leader says when you find them. */
function leaderGreeting(castId) {
  var where = leaderWhereabouts(castId), state = leaderState(castId);
  if (!where || state === 'unbeaten') return null;
  var pool = where.away ? 'away' : LEADER_STATE_POOL[state] || 'settled';
  return leaderPickLine(castId, pool, leaderTurn(castId), where.name) ||
    leaderPickLine(castId, 'settled', leaderTurn(castId), where.name);
}

/* A chat alternates between their own life and where things stand with you.
   Also the fallback for the shared friend screens, which only know how to ask
   selectCharacterDialogue() for Phase 4/5 cast. */
function leaderSocialLine(castId) {
  if (!isLeaderId(castId)) return null;
  var state = leaderState(castId), turn = leaderTurn(castId);
  if (state === 'unbeaten') return leaderPickLine(castId, 'chat', turn);
  var pool = turn % 2 ? 'chat' : (LEADER_STATE_POOL[state] || 'settled');
  return leaderPickLine(castId, pool, Math.floor(turn / 2)) || leaderPickLine(castId, 'chat', turn);
}

function leaderBio(castId) {
  var leader = leaderById(castId);
  return leader && leader.profile ? leader.profile.bio : null;
}

/* The rematch invitation reuses the lines already written for each leader. */
function leaderRematchInvite(leader) {
  var source = leaderSource(leader) || {};
  if (leader.kind === 'gym') {
    var d = (leaderSubjectDef(leader.subject).GYM_DIALOGUE || {})[leader.ref];
    if (d && d.rematch) return d.rematch;
  } else if (source.rematch) return source.rematch;
  return 'Another round? I would like that.';
}

/* ---- rematch contract ---------------------------------------------------- */

/* Tier is the lower of two bands, so a rematch climbs only as fast as both
   your progress through that subject and your prior rematch wins allow:
     progress band  - share of that subject's gyms you hold: <1/3, <2/3, rest
     victory band   - 1 + rematch wins against this leader
   Tier sets the team transformation, the minimum question tier and the prize. */
function leaderProgressBand(subject) {
  var def = leaderSubjectDef(subject), total = (def.CHAPTERS || []).length || 1;
  var share = leaderTrueCount(leaderProgress(subject).badges) / total;
  return share >= 2 / 3 ? 3 : share >= 1 / 3 ? 2 : 1;
}

function leaderRematchTier(castId) {
  var record = leaderRecord(castId, false);
  var victories = 1 + (record ? record.rematch.wins : 0);
  return Math.max(1, Math.min(LEADER_REMATCH_MAX_TIER, leaderProgressBand((leaderById(castId) || {}).subject), victories));
}

function leaderRematchStatus(castId) {
  var leader = leaderById(castId);
  var out = { eligible: false, reason: null, message: '', tier: 0, wait: 0, paid: false, prize: 0,
    questionFloor: 0, wins: 0, losses: 0, paidWins: 0 };
  if (!leader || !S) { out.reason = 'unknown'; out.message = 'Nobody by that name keeps a gym.'; return out; }
  var record = leaderRecord(castId, false) || freshLeaderRecord();
  out.wins = record.rematch.wins; out.losses = record.rematch.losses; out.paidWins = record.rematch.paidWins;
  out.tier = leaderRematchTier(castId);
  out.questionFloor = out.tier;
  out.paid = record.rematch.paidWins < LEADER_REMATCH_PAID_CEILING;
  var source = leaderSource(leader);
  out.prize = out.paid ? Math.round(battlePrize(leader.kind === 'gym' ? 'gym' : 'elite') * LEADER_REMATCH_PRIZE[out.tier]) : 0;
  function refuse(reason, message) { out.reason = reason; out.message = message; return out; }
  if (!leaderBeaten(leader)) return refuse('unbeaten', 'Win the first match before asking for a rematch.');
  if (leader.subject !== activeSubject()) return refuse('other-subject', leaderFirstName(leader) + ' battles on home ground. Cross over to ' + (leaderSubjectDef(leader.subject).region || 'their region') + ' first.');
  if (leader.kind === 'gym' && typeof gymBlockedBy === 'function' && gymBlockedBy(leader.ref)) return refuse('blocked', 'That gym is behind an unfinished challenge right now.');
  if (leader.kind === 'boss' && typeof bossOpen === 'function' && source && !bossOpen(source)) return refuse('boss-locked', 'That challenge needs more badges than you hold right now.');
  if (typeof B !== 'undefined' && B && !B.over) return refuse('battle-active', 'Finish the battle you are in first.');
  if (!partyAlive()) return refuse('party-fainted', 'Everyone has fainted. Visit the Poké Center.');
  var last = record.rematch.lastWinClock;
  if (last !== null) {
    out.wait = Math.max(0, last + LEADER_REMATCH_COOLDOWN - leaderClock());
    if (out.wait) return refuse('cooldown', leaderFirstName(leader) + ' wants a breather after your last rematch. Ready again after ' + out.wait + ' more questions.');
  }
  out.eligible = true;
  return out;
}

/* Legal transformations only: the ordinary first-match team, every member
   walked forward by evolution as the tier rises, the leader's own signature
   species joining from tier 2, and a small level step. Species are pulled
   back down their own lines if they would badly outclass your party. */
function leaderRematchTeam(castId, tier) {
  var leader = leaderById(castId), source = leaderSource(leader);
  if (!leader || !source) return [];
  tier = Math.max(1, Math.min(LEADER_REMATCH_MAX_TIER, tier || 1));
  var base = leader.kind === 'gym' ? gymTeam(source) : eliteTeam(source);
  var floor = leader.kind === 'gym' ? gymBstFloor(source.n) : bossBstFloor(source);
  var cap = Math.max(partyCapBst() * (1.15 + 0.1 * tier), floor);
  var ace = base.pop();
  var members = base.map(function (mon) {
    return { id: scaleSpecies(evolveSpecies(mon.id, tier - 1), cap), lvl: mon.lvl + tier };
  });
  var signature = leader.profile && leader.profile.signature;
  if (tier >= 2 && signature && dexOf(signature)) {
    var sig = scaleSpecies(evolveSpecies(signature, tier - 2), cap);
    var taken = members.some(function (m) { return m.id === sig; }) || sig === ace.id;
    if (!taken) {
      if (members.length + 2 > 6) members.shift();
      var lvl = members.length ? members[members.length - 1].lvl : ace.lvl - ACE_BONUS + tier;
      members.push({ id: sig, lvl: lvl });
    }
  }
  var aceId = tier >= 3 ? scaleSpecies(evolveSpecies(ace.id, 1), Math.max(cap * 1.1, floor)) : ace.id;
  var team = members.map(function (m) { return makeMon(m.id, clampLvl(m.lvl)); });
  team.push(makeMon(aceId, clampLvl(ace.lvl + tier)));
  return team;
}

function leaderRematchPreview(castId) {
  var status = leaderRematchStatus(castId);
  var team = leaderRematchTeam(castId, status.tier || 1);
  return { tier: status.tier, size: team.length,
    level: team.reduce(function (m, mon) { return Math.max(m, mon.lvl); }, 0),
    species: team.map(function (mon) { return mon.id; }) };
}

function startLeaderRematch(castId) {
  var leader = leaderById(castId), status = leaderRematchStatus(castId);
  if (!status.eligible) { toast(status.message); return false; }
  var source = leaderSource(leader);
  if (typeof closeModal === 'function') closeModal();
  clearLog();
  startBattle({
    kind: 'rematch',
    chapters: leader.kind === 'gym' ? [source.n] : source.chapters,
    foes: leaderRematchTeam(castId, status.tier),
    chapter: leader.kind === 'gym' ? source : null,
    elite: leader.kind === 'boss' ? source : null,
    leader: leader.name,
    title: 'Rematch · ' + leader.name + ' · Tier ' + status.tier,
    rematch: { castId: castId, tier: status.tier, paid: status.paid, prize: status.prize },
    questionFloor: status.tier
  });
  return true;
}

/* The one rematch settlement path, called from winBattle/loseBattle. It pays
   only the rematch prize fixed when the battle began, and it never reads or
   writes badges, boss clears, receipts or first-win item bundles. */
function settleLeaderRematch(won) {
  if (!B || B.kind !== 'rematch' || !B.rematch || B.rematch.settled) return null;
  B.rematch.settled = true;
  var castId = B.rematch.castId, leader = leaderById(castId);
  var record = leaderRecord(castId, true);
  var prize = 0;
  if (won) {
    record.rematch.wins++;
    record.rematch.bestTier = Math.max(record.rematch.bestTier, B.rematch.tier);
    record.rematch.lastWinClock = leaderClock();
    if (B.rematch.paid && record.rematch.paidWins < LEADER_REMATCH_PAID_CEILING && B.rematch.prize > 0) {
      record.rematch.paidWins++;
      prize = addMoney(B.rematch.prize);
    }
  } else record.rematch.losses++;
  var f = S.friends && S.friends[castId], friendship = null;
  if (f && f.met && typeof awardFriendship === 'function') {
    friendship = awardFriendship(castId, 'battle', { source: 'rematch', won: won,
      answered: (B.correctThisBattle || 0) + (B.wrongThisBattle || 0), eligibleAtStart: true, countMeeting: true });
    if (friendshipEligible(castId)) { f.battles++; if (won) f.wins++; }
  }
  var line = leaderPickLine(castId, won ? 'rematchWin' : 'rematchLoss', won ? record.rematch.wins : record.rematch.losses);
  return { leader: leader, prize: prize, tier: B.rematch.tier, line: line ? line.text : '',
    friendship: friendship, record: record };
}

function showLeaderRematchResult(won, result) {
  var answered = B.correctThisBattle + B.wrongThisBattle;
  var leader = result && result.leader;
  modal('<h2 style="color:' + (won ? 'var(--accent)' : 'var(--red)') + '">' +
    esc(won ? 'You won the rematch!' : 'The rematch got away from you.') + '</h2>' +
    (leader ? '<span class="friend-role">' + esc(leader.name) + ' · Tier ' + result.tier + ' rematch</span>' +
      (result.line ? '<p class="scene-prose">' + esc(result.line) + '</p>' : '') : '') +
    (answered ? '<p class="muted">' + B.correctThisBattle + '/' + answered + ' questions correct this battle.</p>' : '') +
    (won ? '<p class="friend-change">' + (result.prize ? 'Rematch prize: ₵' + result.prize + '.' : 'No prize money this time; this rematch was for the match itself.') + '</p>' : '') +
    (result.friendship && result.friendship.accepted && result.friendship.change ? '<p class="small">' + esc(result.friendship.message) + '</p>' : '') +
    '<p class="small">Badges and first-win rewards are untouched by rematches. Your party has been healed.</p>' +
    '<div class="row" style="justify-content:center;margin-top:14px">' +
    (leader ? '<button class="primary" onclick="closeModal();showScreen(\'map\');renderMap();openLeader(\'' + leader.castId + '\')">Back to ' + esc(leaderFirstName(leader)) + '</button>' : '') +
    '<button onclick="closeModal();showScreen(\'map\');renderMap()">To the map</button></div>');
}

/* ---- the leader hub ------------------------------------------------------ */

function leaderFaceHtml(leader) {
  return leader.portrait ? '<img class="leader-face" src="' + leader.portrait + '" alt="' + esc(leader.name) + '">'
    : '<div class="leader-face leader-face-disc" aria-hidden="true">' + esc(leader.name.charAt(0)) + '</div>';
}

function leaderRoleText(leader) {
  return leader.kind === 'gym' ? 'Gym Leader · ' + leader.epithet : leader.epithet;
}

function leaderRematchPanel(leader) {
  var status = leaderRematchStatus(leader.castId);
  var h = '<section class="leader-rematch"><h3>Rematch</h3>' +
    '<p class="scene-prose leader-invite">' + esc(leaderRematchInvite(leader)) + '</p>';
  if (status.reason === 'other-subject' || status.reason === 'unbeaten' || status.reason === 'unknown') {
    return h + '<p class="small">' + esc(status.message) + '</p></section>';
  }
  var preview = leaderRematchPreview(leader.castId);
  h += '<p class="small">Tier ' + status.tier + ' of ' + LEADER_REMATCH_MAX_TIER + ' · ' + preview.size +
    ' Pokémon · Lv ~' + preview.level + ' · ' +
    (status.questionFloor > 1 ? 'every question tier ' + status.questionFloor + ' or harder' : 'questions as in your first match') + ' · ' +
    (status.paid ? 'prize ₵' + status.prize : 'no prize money left in this rivalry') +
    (status.wins || status.losses ? ' · rematch record ' + status.wins + '–' + status.losses : '') + '</p>' +
    '<p class="small muted">Optional. Tier rises with your badges in this region and your rematch wins against ' +
    esc(leaderFirstName(leader)) + '. Badges and first-win rewards never change.</p>' +
    (status.eligible ? '' : '<p class="small leader-wait">' + esc(status.message) + '</p>') +
    '<button class="primary" ' + (status.eligible ? '' : 'disabled ') + 'onclick="startLeaderRematch(\'' + leader.castId + '\')">Rematch ' +
    esc(leaderFirstName(leader)) + '</button></section>';
  return h;
}

function renderLeaderHub(castId, line, note) {
  var leader = leaderById(castId);
  if (!leader) return;
  var where = leaderWhereabouts(castId), f = S.friends && S.friends[castId];
  var greeting = line || leaderGreeting(castId);
  var friendNote = f && f.met ? friendHearts(f) + '♥ · ' + friendStage(f).label : 'You have not really talked yet';
  modal('<div class="gym-greeting leader-hub">' + leaderFaceHtml(leader) +
    '<span class="friend-role">' + esc(leaderRoleText(leader)) + '</span>' +
    '<h2>' + esc(leader.name) + '</h2>' +
    '<p class="leader-where">' + (where.away ? 'Out today at <b>' + esc(where.name) + '</b>' : 'At <b>' + esc(where.name) + '</b>') + '</p>' +
    (greeting ? '<p class="scene-prose">' + esc(greeting.text) + '</p>' : '') +
    (note ? '<p class="small">' + esc(note) + '</p>' : '') +
    '<p class="small">' + esc(friendNote) + '</p>' +
    '<div class="row leader-actions"><button onclick="leaderChat(\'' + castId + '\')">Have a chat</button>' +
    '<button class="ghost" onclick="closeModal();openFriend(\'' + castId + '\')">Friendship and gifts</button></div>' +
    leaderRematchPanel(leader) +
    '<div class="row"><button class="ghost" onclick="closeModal()">Leave</button></div></div>');
}

/* The post-defeat entry point. An unbeaten leader still greets you the old way
   at the gym door, so nothing about the first match changes. */
function openLeader(castId) {
  var leader = leaderById(castId);
  if (!leader || !S) return;
  if (!leaderBeaten(leader)) {
    if (leader.subject !== activeSubject()) { toast(leader.name + ' is waiting for a first match in ' + (leaderSubjectDef(leader.subject).region || 'their region') + '.'); return; }
    if (leader.kind === 'gym') goGym(leader.ref); else goElite(leader.ref);
    return;
  }
  var record = leaderRecord(castId, true);
  record.visits++;
  record.lastVisitClock = leaderClock();
  if (typeof friendMeetingGate === 'function' && friendMeetingGate(castId).allowed) {
    awardFriendship(castId, 'meet', { source: 'town' });
    syncFriendStory();
  }
  saveGame();
  renderLeaderHub(castId);
}

function leaderChat(castId) {
  var leader = leaderById(castId);
  if (!leader) return;
  var f = S.friends && S.friends[castId];
  var award = f && f.met ? awardFriendship(castId, 'talk', { source: 'town', countMeeting: true }) : null;
  var line = leaderSocialLine(castId);
  saveGame();
  renderLeaderHub(castId, line, award ? award.message : null);
}

/* A short panel for the shared friend detail screen. */
function leaderFriendPanel(castId) {
  var leader = leaderById(castId);
  if (!leader) return '';
  var status = leaderRematchStatus(castId), where = leaderWhereabouts(castId);
  var beaten = leaderBeaten(leader);
  return '<section class="panel leader-friend-panel"><h3>' + esc(leaderRoleText(leader)) + '</h3>' +
    '<p class="small">' + (beaten ? (where.away ? 'Out today at ' + esc(where.name) + '.' : 'At ' + esc(where.name) + '.') +
      ' Rematch record ' + status.wins + '–' + status.losses + '.' : 'You have not won your first match yet.') + '</p>' +
    (leader.subject === activeSubject() ? '<button onclick="openLeader(\'' + castId + '\')">' +
      (beaten ? 'Go and find ' + esc(leaderFirstName(leader)) : 'Head to the challenge') + '</button>' :
      '<p class="small">Found in ' + esc(leaderSubjectDef(leader.subject).region || 'another region') + '.</p>') + '</section>';
}

/* Cards for the location directory in js/engine/town.js. */
function leaderTownCard(leader) {
  var f = S.friends && S.friends[leader.castId];
  return '<article class="town-card leader-card"><div class="town-head"><span class="town-cls">' +
    esc(leaderRoleText(leader)) + '</span><span class="town-kind k-talk">Visiting</span></div>' +
    (leader.portrait ? '<div class="town-face"><img src="' + leader.portrait + '" alt="' + esc(leader.name) + '"></div>' : '') +
    '<h3>' + esc(leader.name) + '</h3><p class="small">' + esc(leaderBio(leader.castId) || '') + '</p>' +
    '<p class="town-note">' + (f && f.met ? friendHearts(f) + '♥ ' + friendStage(f).label.toLowerCase() : 'Off duty today') + '</p>' +
    '<button onclick="openLeader(\'' + leader.castId + '\')">Talk</button></article>';
}

/* ---- validation (tools/check-gym-leaders.cjs) ---------------------------- */

var LEADER_REQUIRED_POOLS = ['justDefeated', 'settled', 'laterBadges', 'regionCleared', 'away', 'chat', 'rematchWin', 'rematchLoss'];
var LEADER_COURSE_WORDS = /\b(calculus|compiler|pointer|quiz|exam|exams|homework|study|studying|lesson|lessons|algorithm|programming|midterm|gpa|assignment|coursework|syllabus|textbook|integral|derivative|vector|series|array|struct|malloc|printf)\b/i;

function validateGymLeaderRegistry() {
  var errors = [], warnings = [], seenText = {}, names = {};
  var registry = gymLeaderRegistry();
  var townIds = {};
  ['c', 'calc'].forEach(function (subject) {
    (leaderSubjectDef(subject).TOWNSFOLK || []).forEach(function (p) { townIds[p.id] = subject; });
  });
  (window.TRAINERS || []).forEach(function (t) { townIds[t.id] = 'companion'; });
  if (registry.length !== 34) errors.push('expected 34 gym leaders and bosses, found ' + registry.length);
  registry.forEach(function (leader) {
    var id = leader.castId, p = leader.profile;
    if (townIds[id]) errors.push(id + ': cast ID collides with a townsfolk or companion ID');
    if (names[leader.name]) errors.push(id + ': name collides with ' + names[leader.name]);
    names[leader.name] = id;
    if (!leaderSource(leader)) errors.push(id + ': source record not found');
    if (!leader.befriendable) errors.push(id + ': leaders are meant to be befriendable');
    if (!p) { errors.push(id + ': missing profile'); return; }
    if (!p.bio || LEADER_COURSE_WORDS.test(p.bio)) errors.push(id + ': bio missing or uses course vocabulary');
    if (!Array.isArray(p.hangouts) || !p.hangouts.length) errors.push(id + ': no hangouts');
    (p.hangouts || []).forEach(function (loc) {
      if (!leaderLocationDef(leader.subject, loc)) errors.push(id + ': hangout ' + loc + ' is not a ' + leader.subject + ' location');
    });
    if (!p.signature || !dexOf(p.signature)) errors.push(id + ': signature species missing from the dex');
    (p.related || []).forEach(function (other) {
      var o = leaderById(other);
      if (!o) errors.push(id + ': related leader ' + other + ' does not exist');
      else if (!((o.profile && o.profile.related) || []).some(function (x) { return x === id; })) errors.push(id + ': relationship with ' + other + ' is not reciprocal');
    });
    LEADER_REQUIRED_POOLS.forEach(function (pool) {
      var lines = (p.lines || {})[pool];
      if (!Array.isArray(lines) || !lines.length) { errors.push(id + ': empty pool ' + pool); return; }
      lines.forEach(function (text) {
        if (typeof text !== 'string' || text.trim().length < 20) errors.push(id + ': fragment in ' + pool);
        if (LEADER_COURSE_WORDS.test(text)) errors.push(id + ': course vocabulary in ' + pool + ': ' + text.slice(0, 40));
        if (seenText[text]) errors.push(id + ': duplicate line shared with ' + seenText[text]);
        seenText[text] = id;
        if (pool === 'away' && text.indexOf('{place}') < 0) errors.push(id + ': away line without {place}');
      });
    });
    if (!leader.portrait) warnings.push(id + ' (' + leader.name + ') has no painted portrait');
  });
  var known = {};
  registry.forEach(function (leader) { known[leader.name] = true; });
  Object.keys(window.LEADER_PORTRAITS || {}).forEach(function (name) {
    if (!known[name]) warnings.push('portrait "' + name + '" matches no gym leader or boss');
  });
  return { errors: errors, warnings: warnings };
}
