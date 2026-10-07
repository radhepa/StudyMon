/* Phase 6: gym leaders and bosses after the match.

   Registry/identity audit (Slice 1), post-defeat presence (Slice 2), the
   rematch contract (Slice 3) and the leader content batches. Every battle here
   is settled through the same winBattle()/loseBattle() the game uses. */
const { chromium } = require('./playwright.cjs');

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok });
  console.log((ok ? 'PASS  ' : 'FAIL  ') + name + (detail ? '  [' + detail + ']' : ''));
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const page = await (await browser.newContext()).newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:8780/');

  const r = await page.evaluate(async () => {
    const out = {};
    const fresh = subject => {
      B = null;
      S = freshSave(); activateSave(S); if (subject && subject !== 'c') switchSubject(subject);
      S.settings.sound = false; S.party = [makeMon(6, 60), makeMon(9, 58), makeMon(3, 58)]; ensureBag(); S.money = 1000;
    };
    const snapshot = () => JSON.stringify({ progress: S.progress, badges: S.badges, elite: S.elite,
      receipts: S.town.receipts, items: S.items, journal: S.journal && S.journal.badges });

    /* ---- Slice 1: registry and identity ---------------------------------- */
    const audit = validateGymLeaderRegistry();
    const reg = gymLeaderRegistry();
    out.registry = { count: reg.length, errors: audit.errors, warnings: audit.warnings,
      gyms: reg.filter(l => l.kind === 'gym').length, bosses: reg.filter(l => l.kind === 'boss').length,
      tier1: reg.filter(l => l.tier === 1).map(l => l.castId).sort(),
      champions: reg.filter(l => l.champion).map(l => l.castId).sort(),
      positionsOk: ['c', 'calc'].every(s => {
        const list = reg.filter(l => l.subject === s).map(l => l.position).sort((a, b) => a - b);
        return list.every((p, i) => p === i + 1);
      }) };

    /* ---- Slice 2: presence on a fresh save ---------------------------------- */
    fresh('c');
    out.freshStates = reg.filter(l => l.subject === 'c').every(l => leaderState(l.castId) === 'unbeaten');
    out.freshHome = reg.filter(l => l.subject === 'c').every(l => !leaderWhereabouts(l.castId).away);
    // An unbeaten leader still greets at the gym door.
    openLeader('c-gym-2');
    out.unbeatenGreeting = document.querySelector('#modal').textContent.includes(GYM_DIALOGUE[2].intro);
    closeModal();

    // First win through the real badge path records the leader as just defeated.
    fresh('c');
    const before = S.money;
    B = null; beginGymBattle(1);
    out.firstGymKind = B && B.kind;
    winBattle(); closeModal();
    out.firstWin = { badge: !!S.badges[1], state: leaderState('c-gym-1'),
      record: JSON.parse(JSON.stringify(S.leaders.records['c-gym-1'] || null)),
      receipt: !!S.town.receipts['gym-reward:c:1'], paid: S.money - before };
    out.justDefeatedHome = !leaderWhereabouts('c-gym-1').away;
    S.activityClock += 61;
    out.afterWindow = leaderState('c-gym-1');
    for (let n = 2; n <= 4; n++) S.badges[n] = true;
    out.laterState = leaderState('c-gym-1');

    // Whereabouts: deterministic, and only ever an open location of that subject.
    const seenWhere = {}; let deterministic = true, invalidWhere = [];
    for (let clock = 0; clock < 2000; clock += 7) {
      S.activityClock = clock;
      const a = leaderWhereabouts('c-gym-1'), b2 = leaderWhereabouts('c-gym-1');
      if (JSON.stringify(a) !== JSON.stringify(b2)) deterministic = false;
      seenWhere[a.locationId] = (seenWhere[a.locationId] || 0) + 1;
      if (a.away) {
        const loc = LOCATIONS.find(l => l.id === a.locationId);
        if (!loc || loc.badges > badgeCount()) invalidWhere.push(a.locationId);
      }
    }
    out.where = { deterministic, invalidWhere, seen: seenWhere };
    // Out at an open location, they show up in that location's directory.
    let awayClock = null;
    for (let clock = 0; clock < 4000 && awayClock === null; clock += LEADER_HANGOUT_WINDOW) {
      S.activityClock = clock; if (leaderWhereabouts('c-gym-1').away) awayClock = clock;
    }
    S.activityClock = awayClock;
    const awayAt = leaderWhereabouts('c-gym-1').locationId;
    out.directory = { awayAt, listed: leadersAt(awayAt).some(l => l.castId === 'c-gym-1') };
    TOWN_LOC = awayAt; showScreen('town'); renderTown();
    out.directory.card = document.querySelector('#s-town').textContent.includes('Byte');

    // Hub: a real visit meets the leader and shows a state line plus the rematch invite.
    S.activityClock = 500;
    openLeader('c-gym-1');
    const modalText = document.querySelector('#modal').textContent;
    out.hub = { hasName: modalText.includes('Byte'), invite: modalText.includes(GYM_DIALOGUE[1].rematch),
      met: !!(S.friends['c-gym-1'] && S.friends['c-gym-1'].met), visits: S.leaders.records['c-gym-1'].visits,
      noUndefined: !/undefined|null/.test(modalText) };
    leaderChat('c-gym-1');
    out.hub.chatTalks = S.friends['c-gym-1'].talks;
    closeModal();
    // The shared friend screens resolve leader lines instead of "undefined".
    openFriend('c-gym-1');
    const friendText = document.querySelector('#s-friends').textContent;
    out.friendScreen = { noUndefined: !/undefined/.test(friendText), bio: friendText.includes(leaderBio('c-gym-1')),
      panel: !!document.querySelector('.leader-friend-panel') };
    talkFriend('c-gym-1');
    out.friendScreen.talk = !/undefined/.test(document.querySelector('#modal').textContent);
    closeModal();

    /* ---- Old save: badges but no leader records --------------------------- */
    fresh('c');
    for (let n = 1; n <= 6; n++) { S.badges[n] = true; S.town.receipts['gym-reward:c:' + n] = true; }
    delete S.leaders;
    const legacy = normalizeSave(JSON.parse(JSON.stringify(S)));
    activateSave(legacy); S.settings.sound = false; S.party = [makeMon(6, 60), makeMon(9, 58)];
    out.legacy = { box: JSON.stringify(S.leaders), first: leaderState('c-gym-1'), sixth: leaderState('c-gym-6'),
      seventh: leaderState('c-gym-7') };
    const legacySnap = snapshot();
    openLeader('c-gym-2'); closeModal();
    B = null; beginGymBattle(3);
    out.legacy.replayKind = B && B.kind;
    winBattle(); closeModal();
    out.legacy.untouched = snapshot() === legacySnap;

    /* ---- Slice 3: the rematch contract ------------------------------------ */
    fresh('c');
    S.badges[1] = true;
    let st = leaderRematchStatus('c-gym-2');
    out.refuseUnbeaten = st.eligible === false && st.reason === 'unbeaten';
    subjectProgress('calc').badges[1] = true;
    out.refuseOtherSubject = leaderRematchStatus('calc-gym-1').reason;
    delete subjectProgress('calc').badges[1];
    st = leaderRematchStatus('c-gym-1');
    out.firstTier = { eligible: st.eligible, tier: st.tier, floor: st.questionFloor, paid: st.paid, prize: st.prize,
      firstWinPrize: battlePrize('gym') };
    const snap = snapshot(), moneyBefore = S.money;
    startLeaderRematch('c-gym-1');
    out.rematchBattle = { kind: B.kind, floor: B.questionFloor, tier: B.rematch.tier, foes: B.foes.length,
      speciesValid: B.foes.every(m => !!dexOf(m.id)), levels: B.foes.map(m => m.lvl) };
    out.refuseBattleActive = leaderRematchStatus('c-gym-1').reason;
    // Every question in a tier-N rematch is tier N or harder where the bank allows.
    winBattle(); closeModal();
    out.rematchWin = { untouched: snapshot() === snap, paid: S.money - moneyBefore,
      record: JSON.parse(JSON.stringify(S.leaders.records['c-gym-1'].rematch)) };
    st = leaderRematchStatus('c-gym-1');
    out.cooldown = { reason: st.reason, wait: st.wait };
    S.activityClock += LEADER_REMATCH_COOLDOWN;
    st = leaderRematchStatus('c-gym-1');
    out.afterCooldown = { eligible: st.eligible, tier: st.tier };   // one badge: progress band keeps tier 1

    // Progress band lifts the tier once you hold more of the region.
    for (let n = 1; n <= 10; n++) S.badges[n] = true;
    st = leaderRematchStatus('c-gym-1');
    out.progressTier = st.tier;   // victory band = 2 after one win
    startLeaderRematch('c-gym-1');
    out.tier2Battle = { floor: B.questionFloor, foes: B.foes.length };
    chooseMove(0);
    out.tier2Question = B.q && B.q.t;
    B.over = true; B = null;

    // Loss: no money, no badge change, a counted loss, a healed party.
    S.leaders.records['c-gym-1'].rematch.lastWinClock = null;
    const lossSnap = snapshot(), lossMoney = S.money;
    startLeaderRematch('c-gym-1');
    S.party.forEach(m => { m.hp = 0; });
    loseBattle(); closeModal();
    out.loss = { untouched: snapshot() === lossSnap, money: S.money - lossMoney,
      losses: S.leaders.records['c-gym-1'].rematch.losses, healed: S.party.every(m => m.hp === maxHp(m)) };

    // Tier 3 teams: evolved lines, the signature species, a fourth member, and a stronger question floor.
    S.leaders.records['c-gym-1'].rematch.wins = 5;
    for (let n = 1; n <= 15; n++) S.badges[n] = true;
    st = leaderRematchStatus('c-gym-1');
    const team3 = leaderRematchTeam('c-gym-1', 3), team1 = leaderRematchTeam('c-gym-1', 1);
    const sigLine = [137, evolveSpecies(137, 1), evolveSpecies(137, 2)];
    out.tier3 = { tier: st.tier, size3: team3.length, size1: team1.length,
      hasSignature: team3.some(m => sigLine.indexOf(m.id) >= 0),
      maxLvl3: Math.max(...team3.map(m => m.lvl)), maxLvl1: Math.max(...team1.map(m => m.lvl)) };
    startLeaderRematch('c-gym-1');
    const tiers = [];
    B.pendingMove = movesOf(B.you)[0];
    for (let i = 0; i < 8; i++) { B.asked = {}; askQuestion(1); tiers.push(B.q.t); }
    out.tier3Questions = tiers;
    B.over = true; B = null;

    // Reward ceiling: after six paid wins the rematch still happens but pays nothing.
    const rec = S.leaders.records['c-gym-1'].rematch;
    rec.paidWins = LEADER_REMATCH_PAID_CEILING; rec.wins = Math.max(rec.wins, rec.paidWins); rec.lastWinClock = null;
    st = leaderRematchStatus('c-gym-1');
    const ceilMoney = S.money;
    startLeaderRematch('c-gym-1'); winBattle(); closeModal();
    out.ceiling = { paid: st.paid, prize: st.prize, earned: S.money - ceilMoney, paidWins: rec.paidWins };

    // Reload: rematch history survives a save round trip and normalises junk.
    saveGame();
    const raw = JSON.parse(localStorage.getItem(SAVE_KEY));
    raw.leaders.records['c-gym-9'] = { beatenAt: 'soon', visits: -4, rematch: { wins: 'x', paidWins: 99, lastWinClock: 'never' } };
    raw.leaders.records['future-leader'] = { visits: 2 };
    activateSave(normalizeSave(raw));
    out.reload = { wins: S.leaders.records['c-gym-1'].rematch.wins, junk: JSON.stringify(S.leaders.records['c-gym-9']),
      future: !!S.leaders.records['future-leader'], version: S.leaders.version };

    /* ---- Boss rematches and the Calculus region --------------------------- */
    fresh('c');
    for (let n = 1; n <= 15; n++) S.badges[n] = true;
    S.elite.e1 = true;
    const bossSnap = snapshot();
    goElite('e1');
    out.bossHub = document.querySelector('#modal') && document.querySelector('#modal').textContent.includes('Seg Fault');
    closeModal();
    startLeaderRematch('c-boss-e1');
    out.bossRematch = { kind: B.kind, foes: B.foes.length, chapters: B.chapters.join(',') };
    winBattle(); closeModal();
    out.bossUntouched = snapshot() === bossSnap;

    fresh('calc');
    S.badges[1] = true;
    openLeader('calc-gym-1');
    out.calcHub = document.querySelector('#modal').textContent.includes('Rhea Dexter') &&
      document.querySelector('#modal').textContent.includes(GYM_DIALOGUE[1].rematch);
    closeModal();
    const calcSnap = snapshot();
    startLeaderRematch('calc-gym-1');
    out.calcRematch = { kind: B && B.kind, questionFromCalc: true };
    chooseMove(0);
    out.calcRematch.questionFromCalc = !!B.q && /^k/.test(B.q.id);
    winBattle(); closeModal();
    out.calcUntouched = snapshot() === calcSnap;
    subjectProgress('c').badges[1] = true;
    out.crossSubject = leaderRematchStatus('c-gym-1').reason;
    switchSubject('c');
    out.crossBack = leaderState('calc-gym-1');

    /* ---- Map buttons -------------------------------------------------------- */
    fresh('c');
    S.badges[1] = true; S.badges[2] = true;
    showScreen('map'); renderMap();
    const mapText = document.querySelector('#s-map').innerHTML;
    out.map = { visit: mapText.includes("openLeader('c-gym-1')"), stillGym: mapText.includes('goGym(3)'),
      noOldRematch: !mapText.includes('Rematch gym') };

    /* ---- Every leader resolves every state -------------------------------- */
    const statesOk = [];
    ['c', 'calc'].forEach(subject => {
      fresh(subject);
      const def = subjectDef(subject);
      def.CHAPTERS.forEach(c => { S.badges[c.n] = true; });
      def.ELITE.forEach(e => { S.elite[e.id] = true; });
      reg.filter(l => l.subject === subject).forEach(l => {
        const hello = leaderGreeting(l.castId), social = leaderSocialLine(l.castId);
        const team = leaderRematchTeam(l.castId, 3);
        statesOk.push({ id: l.castId, state: leaderState(l.castId), hello: !!hello && !/\{place\}/.test(hello.text),
          social: !!social, team: team.length >= 2 && team.length <= 6 && team.every(m => !!dexOf(m.id) && m.lvl >= 2 && m.lvl <= 100) });
      });
    });
    out.allLeaders = statesOk;

    /* ---- Economy guard ------------------------------------------------------ */
    fresh('c');
    const lv = 50;
    out.economy = { firstWin: battlePrize('gym', lv), tier3: Math.round(battlePrize('gym', lv) * LEADER_REMATCH_PRIZE[3]),
      lifetimeCap: Math.round(battlePrize('gym', lv) * LEADER_REMATCH_PRIZE[3]) * LEADER_REMATCH_PAID_CEILING,
      wildPerBattle: battlePrize('wild', lv), rematchExp: LEADER_REMATCH_EXP };
    return out;
  });
  await browser.close();

  const reg = r.registry;
  check('34 gym leaders and bosses resolve through the cast registry (25 gyms, 9 bosses)',
    reg.count === 34 && reg.gyms === 25 && reg.bosses === 9, JSON.stringify({ count: reg.count, gyms: reg.gyms, bosses: reg.bosses }));
  check('registry audit: profiles, hangouts, signatures, relationships and dialogue validate with zero errors',
    reg.errors.length === 0, reg.errors.slice(0, 5).join(' | '));
  console.log('      audit warnings: ' + reg.warnings.join('; '));
  check('the two Tier 1 leaders stay Tier 1 and each region has exactly one champion',
    JSON.stringify(reg.tier1) === JSON.stringify(['c-gym-1', 'calc-gym-1']) &&
    JSON.stringify(reg.champions) === JSON.stringify(['c-boss-champ', 'calc-boss-final']), JSON.stringify(reg.tier1) + ' ' + JSON.stringify(reg.champions));
  check('map positions run 1..N without gaps in both regions', reg.positionsOk);

  check('a fresh save sees every leader unbeaten and at home', r.freshStates && r.freshHome);
  check('an unbeaten leader still gives the original first-match greeting', r.unbeatenGreeting);
  check('the first gym win is still a real gym battle that grants the badge and receipt once',
    r.firstGymKind === 'gym' && r.firstWin.badge && r.firstWin.receipt && r.firstWin.paid > 0, JSON.stringify(r.firstWin));
  check('a fresh win records the leader as just defeated, at home', r.firstWin.state === 'just-defeated' &&
    r.firstWin.record && r.firstWin.record.beatenAt && r.justDefeatedHome, JSON.stringify(r.firstWin.record));
  check('just-defeated fades to settled, then later-badges after three more badges',
    r.afterWindow === 'settled' && r.laterState === 'later-badges', r.afterWindow + ' -> ' + r.laterState);
  check('whereabouts are deterministic and only name open locations of that subject',
    r.where.deterministic && r.where.invalidWhere.length === 0 && Object.keys(r.where.seen).length >= 2, JSON.stringify(r.where));
  check('a leader out at a location appears in that location directory', r.directory.listed && r.directory.card, JSON.stringify(r.directory));
  check('the leader hub meets the leader, shows the rematch invite, and chats earn friendship',
    r.hub.hasName && r.hub.invite && r.hub.met && r.hub.visits === 1 && r.hub.noUndefined && r.hub.chatTalks === 1, JSON.stringify(r.hub));
  check('friend screens resolve leader bios and lines (no "undefined")',
    r.friendScreen.noUndefined && r.friendScreen.bio && r.friendScreen.panel && r.friendScreen.talk, JSON.stringify(r.friendScreen));

  check('an old save with badges and no leader records gets post-defeat states immediately',
    r.legacy.first === 'later-badges' && r.legacy.sixth === 'settled' && r.legacy.seventh === 'unbeaten', JSON.stringify(r.legacy));
  check('old save: the legacy "replay the gym" path is now a rematch and never replays first-win rewards',
    r.legacy.replayKind === 'rematch' && r.legacy.untouched, JSON.stringify(r.legacy));

  check('rematches are refused before the first win and outside the leader\'s subject',
    r.refuseUnbeaten && r.refuseOtherSubject === 'other-subject', r.refuseOtherSubject);
  check('a first rematch is tier 1, question floor 1, and pays 30% of a first-win prize',
    r.firstTier.eligible && r.firstTier.tier === 1 && r.firstTier.floor === 1 && r.firstTier.paid &&
    r.firstTier.prize === Math.round(r.firstTier.firstWinPrize * 0.3), JSON.stringify(r.firstTier));
  check('a rematch runs as its own battle kind with a legal team',
    r.rematchBattle.kind === 'rematch' && r.rematchBattle.tier === 1 && r.rematchBattle.speciesValid && r.rematchBattle.foes >= 2,
    JSON.stringify(r.rematchBattle));
  check('a second rematch cannot start while one is running', r.refuseBattleActive === 'battle-active', r.refuseBattleActive);
  check('winning a rematch leaves badges, boss clears, receipts, items and journal badges untouched',
    r.rematchWin.untouched, JSON.stringify(r.rematchWin));
  check('a rematch win pays only the rematch prize and records the victory',
    r.rematchWin.paid === r.firstTier.prize && r.rematchWin.record.wins === 1 && r.rematchWin.record.paidWins === 1 &&
    r.rematchWin.record.lastWinClock !== null, JSON.stringify(r.rematchWin));
  check('a won rematch starts a cooldown that clears after 40 answered questions',
    r.cooldown.reason === 'cooldown' && r.cooldown.wait === 40 && r.afterCooldown.eligible && r.afterCooldown.tier === 1,
    JSON.stringify([r.cooldown, r.afterCooldown]));
  check('tier needs both progress and prior wins: 10/15 badges + 1 win = tier 2',
    r.progressTier === 2 && r.tier2Battle.floor === 2, JSON.stringify({ tier: r.progressTier, battle: r.tier2Battle }));
  check('a tier 2 rematch asks a tier 2+ question even for a tier 1 move', r.tier2Question >= 2, 'tier ' + r.tier2Question);
  check('losing a rematch pays nothing, changes no progress, counts a loss and heals the party',
    r.loss.untouched && r.loss.money === 0 && r.loss.losses === 1 && r.loss.healed, JSON.stringify(r.loss));
  check('tier 3 teams grow by legal means: signature species, fourth member, a small level step',
    r.tier3.tier === 3 && r.tier3.size3 === r.tier3.size1 + 1 && r.tier3.hasSignature && r.tier3.maxLvl3 - r.tier3.maxLvl1 <= 3,
    JSON.stringify(r.tier3));
  check('a tier 3 rematch never asks an easier question than tier 3', r.tier3Questions.every(t => t >= 3), r.tier3Questions.join(','));
  check('after six paid wins a rematch still runs but pays nothing (reward ceiling)',
    r.ceiling.paid === false && r.ceiling.prize === 0 && r.ceiling.earned === 0 && r.ceiling.paidWins === 6, JSON.stringify(r.ceiling));
  check('rematch history survives a save round trip; junk records normalise; unknown records are kept',
    r.reload.wins >= 6 && r.reload.version === 1 && r.reload.future &&
    r.reload.junk === JSON.stringify({ beatenAt: null, visits: 0, lastVisitClock: -1, rematch: { wins: 0, losses: 0, paidWins: 0, lastWinClock: null, bestTier: 0 } }),
    JSON.stringify(r.reload));

  check('a beaten boss opens the hub and its rematch leaves the Victory Road clear untouched',
    r.bossHub && r.bossRematch.kind === 'rematch' && r.bossUntouched, JSON.stringify(r.bossRematch));
  check('the Calculus region: hub, rematch and questions all stay in their own subject',
    r.calcHub && r.calcRematch.kind === 'rematch' && r.calcRematch.questionFromCalc && r.calcUntouched &&
    r.crossSubject === 'other-subject' && r.crossBack === 'settled', JSON.stringify([r.calcRematch, r.crossSubject, r.crossBack]));
  check('the map offers "Visit <leader>" for beaten gyms and the original gym button otherwise',
    r.map.visit && r.map.stillGym && r.map.noOldRematch, JSON.stringify(r.map));

  const bad = r.allLeaders.filter(x => x.state !== 'region-cleared' || !x.hello || !x.social || !x.team);
  check('all 34 leaders resolve a region-cleared greeting, a chat line and a legal tier 3 team', bad.length === 0 && r.allLeaders.length === 34,
    JSON.stringify(bad.slice(0, 3)));
  check('rematch money stays well under a first win, with a lifetime cap per leader',
    r.economy.tier3 <= r.economy.firstWin * 0.5 && r.economy.lifetimeCap <= r.economy.firstWin * 3, JSON.stringify(r.economy));
  check('rematch EXP sits between wild (1.0x) and a first-time gym (1.6x)', r.economy.rematchExp > 1 && r.economy.rematchExp < 1.6, String(r.economy.rematchExp));
  check('no page errors', errors.length === 0, errors.slice(0, 3).join(' | '));

  const failed = results.filter(x => !x.ok).length;
  console.log((results.length - failed) + '/' + results.length + ' checks passed');
  if (failed) process.exitCode = 1;
})();
