/* Phase 7 Slice 8: the reactivity matrix. Competing triggers, reloads during
   scenes, cross-region travel, imports, duplicate attachments, resolved
   rumors, hidden relationships, old saves and repeated renders, exercised
   together on one late-game save. Optional: pass a directory to save desktop
   and phone screenshots of every Phase 7 surface, e.g.
   node tools/check-phase7-matrix.cjs output/phase7-shots */
const { chromium } = require('./playwright.cjs');
const path = require('path');
const fs = require('fs');

const shotDir = process.argv[2] || null;
const results = [];
function check(name, ok, detail) {
  results.push({ name, ok });
  console.log((ok ? 'PASS  ' : 'FAIL  ') + name + (detail ? '  [' + detail + ']' : ''));
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:8780/');
  if (shotDir) fs.mkdirSync(shotDir, { recursive: true });

  const r = await page.evaluate(() => {
    const out = {};
    const snap = () => JSON.stringify(S);
    const meet = (id, points) => { S.friends[id] = Object.assign(freshFriend(), { met: true, meetings: 1, points: points || 0 }); };
    const watch = id => { openWalkin(id); const w = worldContent('walkin', id); for (let i = 1; i < w.beats.length; i++) walkinBeat(id, i); finishWalkin(id); };
    const fresh = () => { S = freshSave(); activateSave(S); S.settings.sound = false; S.party = [makeMon(6, 30)]; ensureBag(); };

    /* A late-game save: every C badge, the first Calculus badge, both regions
       visited, everyone met at friend stage, both first leaders rematched. */
    const lateGame = () => {
      fresh();
      CHAPTERS.forEach(c => { S.badges[c.n] = true; });
      S.progress.calc = S.progress.calc || {}; S.progress.calc.badges = { 1: true };
      S.visited.calc = true;
      CAST_REGISTRY.forEach(e => meet(e.id, 150));
      ['c-gym-1', 'calc-gym-1'].forEach(id => { S.leaders.records[id] = { rematch: { wins: 1, losses: 0, paidWins: 1, lastWinClock: 0, bestTier: 1 } }; });
      S.activityClock = 500;
    };

    // Repeated renders of every Phase 7 surface never write.
    lateGame();
    const before = snap();
    for (let i = 0; i < 3; i++) {
      renderTopbar(); mailChip(); mailbox(); mailWaiting(); mailEligible();
      LOCATIONS.forEach(l => { TOWN_LOC = l.id; walkinCardHtml(l.id); });
      CAST_REGISTRY.forEach(e => { rumorsFor(e.id); pickRumor(e.id); });
      Object.keys(ITEMS).forEach(k => vignetteButtonHtml(k));
      relationshipWebKnown(); walkinOffers();
    }
    out.rendersReadOnly = snap() === before;

    // Competing triggers in one moment: opening the save and the mailbox at
    // once delivers each letter once and at most three per moment.
    const firstOpen = mailOnOpening(1e12).map(m => m.id);
    const boxOpen = deliverMail().map(m => m.id);
    const all = firstOpen.concat(boxOpen);
    out.competingMail = { first: firstOpen.length, box: boxOpen.length, unique: new Set(all).size === all.length };

    // One talk tells at most one rumor, and the same talk twice in one window
    // moves on rather than repeating.
    const a1 = hearRumor('nel'), a2 = hearRumor('nel');
    out.oneRumorPerTalk = !!a1 && (!a2 || a2.rumor.id !== a1.rumor.id || a2.repeat);

    // Walk-ins across the region never share a person.
    const offers = walkinOffers();
    const people = Object.values(offers).flatMap(w => w.people);
    out.walkinExclusion = { places: Object.keys(offers).length, unique: new Set(people).size === people.length };

    // Reloads during scenes: a walk-in mid-beat, a vignette mid-read and a
    // letter opened with its enclosure untaken all survive and resume.
    const cafe = walkinAt('cafe');
    openWalkin(cafe.id); walkinBeat(cafe.id, 1); closeModal();
    giveItem('bentSpoon', 1); openVignette('bent-spoon-drawer'); closeModal();
    deliverMail(); deliverMail(); deliverMail();
    const withEnclosure = mailbox().find(m => m.attachment && !mailTaken(m));
    openLetter(withEnclosure.id); closeModal();
    saveGame(); loadGame();
    out.reloadDuringScenes = {
      walkin: walkinAt('cafe') && walkinAt('cafe').id === cafe.id && /Keep watching/.test(walkinCardHtml('cafe')),
      vignette: /Finish the memory/.test(vignetteButtonHtml('bentSpoon')),
      letter: mailOpened(withEnclosure) && !mailTaken(withEnclosure)
    };

    // Duplicate attachments: hammering the claim, reloading between claims
    // and importing a copy of the save cannot grant twice.
    const item = withEnclosure.attachment[0].item, n0 = itemCount(item);
    for (let i = 0; i < 5; i++) takeEnclosure(withEnclosure.id);
    closeModal();
    const imported = JSON.parse(snap());
    activateSave(normalizeSave(imported));
    takeEnclosure(withEnclosure.id); closeModal();
    const stripped = JSON.parse(snap());
    delete stripped.world.rewarded['mail:' + withEnclosure.id];
    activateSave(normalizeSave(stripped));
    takeEnclosure(withEnclosure.id); closeModal();
    out.duplicateAttachments = itemCount(item) - n0 === withEnclosure.attachment[0].count;

    // Cross-region travel keeps every stamp; the other region's scenes wait.
    const worldBefore = JSON.stringify(S.world.known) + JSON.stringify(S.world.seen) + JSON.stringify(S.world.resolved);
    switchSubject('calc');
    const inCalc = { harbour: walkinAt('harbour') ? walkinAt('harbour').id : null, cafe: walkinAt('cafe') };
    renderTopbar();
    const chipInCalc = !!document.querySelector('.mail-chip');
    switchSubject('c');
    out.crossRegion = { stamps: JSON.stringify(S.world.known) + JSON.stringify(S.world.seen) + JSON.stringify(S.world.resolved) === worldBefore,
      cafeHiddenInCalc: inCalc.cafe === null, chipInCalc };

    // Resolved rumors stay resolved, even after their fact is undone.
    fresh();
    for (let n = 1; n <= 4; n++) S.badges[n] = true;
    for (let i = 0; i < 4 && !worldHas('seen', 'rumor', 'kern-drawer'); i++) hearRumor('postie', { location: 'town' });
    claimTownGrant(townsfolkById('aide'));
    hearRumor('postie', { location: 'town' });
    const resolvedAt = worldStamp('resolved', 'rumor', 'kern-drawer');
    delete S.town.receipts['aide-exp-share'];      // pretend the fact went away
    saveGame(); loadGame();
    out.resolvedStays = resolvedAt !== null && worldHas('resolved', 'rumor', 'kern-drawer') &&
      !rumorsFor('postie', { location: 'town' }).some(x => x.id === 'kern-drawer');

    // Hidden relationships: on a partial save the web never names an unmet
    // person, and deep lines only appear when earned.
    fresh();
    ['oz', 'barista', 'null', 'leak', 'c-gym-1', 'rowan'].forEach(id => meet(id, 10));
    openRelationshipWeb();
    const webHtml = document.querySelector('#modal .box').innerHTML;
    closeModal();
    const unmetNames = CAST_REGISTRY.filter(e => !(S.friends[e.id] && S.friends[e.id].met)).map(e => e.name)
      .filter(name => name.length > 3 && new RegExp('\\b' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b').test(webHtml));
    out.hidden = { unmetNamed: unmetNames, deep: /What you have learned/.test(webHtml) };

    // Old saves: a pre-schema installed save with receipts and items gains the
    // world branch, gets its mail on opening, and grants nothing extra.
    const legacy = freshSave();
    delete legacy.schemaVersion; delete legacy.world;
    legacy.town.receipts['aide-exp-share'] = true; legacy.items.expShare = 1;
    legacy.friends.aide = Object.assign(freshFriend(), { met: true, meetings: 1, points: 40 });
    localStorage.setItem(SAVE_KEY, JSON.stringify(legacy));
    const loaded = loadGame();
    out.oldSave = { loaded, world: !!S.world && typeof S.world.known === 'object', schema: S.schemaVersion,
      kernLetter: worldHas('known', 'mail', 'kern-first-week'), share: itemCount('expShare'),
      vignette: /A memory/.test(vignetteButtonHtml('expShare')) };

    // A full late-game sweep through every surface raises nothing.
    lateGame();
    let sweepErrors = [];
    try {
      showScreen('friends'); renderFriends(); openRelationshipWeb(); closeModal();
      showScreen('party'); renderParty();
      LOCATIONS.filter(l => l.id !== 'town').forEach(l => { openTown(l.id); });
      openMailbox();
      for (let i = 0; i < 10 && deliverMail().length; i++) {}
      mailbox().forEach(m => { openLetter(m.id); if (m.attachment) takeEnclosure(m.id); }); closeModal();
      worldContentList('vignette').forEach(v => { giveItem(v.item, 1); });
      worldContentList('vignette').filter(vignetteAvailable).forEach(v => { openVignette(v.id); finishVignette(v.id); });
      CAST_REGISTRY.filter(e => S.friends[e.id] && S.friends[e.id].met).slice(0, 40).forEach(e => { talkFriend(e.id); closeModal(); });
    } catch (e) { sweepErrors.push(e.message); }
    out.sweep = { errors: sweepErrors, vignettesDone: worldContentList('vignette').filter(v => worldHas('resolved', 'vignette', v.id)).length,
      vignettes: worldContentList('vignette').length, letters: mailbox().length,
      undelivered: worldContentList('mail').filter(m => !mailDelivered(m)).map(m => m.id),
      unexplained: worldContentList('mail').filter(m => !mailDelivered(m) && !m.returning && worldConditionMet(m.when) && worldFact('met:' + m.from)).map(m => m.id) };
    showScreen('map');
    return out;
  });

  check('repeated renders of every Phase 7 surface never write', r.rendersReadOnly);
  check('competing delivery moments deliver each letter once, three at a time', r.competingMail.unique && r.competingMail.first <= 3 && r.competingMail.box <= 3,
    JSON.stringify(r.competingMail));
  check('one talk tells at most one rumor and moves on', r.oneRumorPerTalk);
  check('offered walk-ins never share a person', r.walkinExclusion.unique && r.walkinExclusion.places >= 1, JSON.stringify(r.walkinExclusion));
  check('walk-ins, vignettes and letters resume after a reload mid-way', Object.values(r.reloadDuringScenes).every(Boolean), JSON.stringify(r.reloadDuringScenes));
  check('hammered, reloaded, imported and stamp-stripped claims grant once', r.duplicateAttachments);
  check('cross-region travel keeps stamps; each region shows its own scenes', r.crossRegion.stamps && r.crossRegion.cafeHiddenInCalc && r.crossRegion.chipInCalc,
    JSON.stringify(r.crossRegion));
  check('a resolved rumor stays resolved after its fact is undone', r.resolvedStays);
  check('the web never names an unmet person on a partial save', r.hidden.unmetNamed.length === 0 && !r.hidden.deep, JSON.stringify(r.hidden));
  check('a pre-schema save gains the world branch, gets its mail, grants nothing extra',
    r.oldSave.loaded && r.oldSave.world && r.oldSave.schema === 3 && r.oldSave.kernLetter && r.oldSave.share === 1 && r.oldSave.vignette, JSON.stringify(r.oldSave));
  check('a late-game sweep through every surface raises nothing', r.sweep.errors.length === 0 && r.sweep.vignettesDone === r.sweep.vignettes && r.sweep.letters >= 8 && r.sweep.unexplained.length === 0,
    JSON.stringify(r.sweep));

  // Desktop and phone interaction pass over every Phase 7 surface.
  async function surfaces(width, height, tag) {
    await page.setViewportSize({ width, height });
    const shots = [];
    const steps = [
      ['rumor', () => { S = freshSave(); activateSave(S); S.party = [makeMon(6, 30)]; ensureBag(); TOWN_LOC = 'cafe'; talkTo('nel'); }],
      ['mailbox', () => { S.friends.aide = Object.assign(freshFriend(), { met: true, meetings: 1 }); S.town.receipts['aide-exp-share'] = true;
        S.friends.mira = Object.assign(freshFriend(), { met: true, meetings: 1, points: 250 }); openMailbox(); }],
      ['letter', () => { openLetter('kern-first-week'); }],
      ['walkin-card', () => { closeModal(); for (let n = 1; n <= 4; n++) S.badges[n] = true; S.friends.oz = Object.assign(freshFriend(), { met: true, meetings: 1 }); openTown('pier'); }],
      ['walkin-scene', () => { openWalkin('pier-wager'); }],
      ['vignette', () => { closeModal(); giveItem('bentSpoon', 1); showScreen('party'); renderParty(); openVignette('bent-spoon-drawer'); }],
      ['web', () => { closeModal(); ['sal', 'rowan', 'theo', 'c-gym-1', 'calc-gym-1'].forEach(id => { S.friends[id] = Object.assign(freshFriend(), { met: true, meetings: 1, points: 150 }); }); openFriends(); openRelationshipWeb(); }]
    ];
    for (const [name, fn] of steps) {
      const res = await page.evaluate(`(${fn.toString()})(); ({ overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
        modalOverflow: (() => { const b = document.querySelector('#modal.on .box'); return !!b && b.scrollWidth > b.clientWidth + 1; })() })`);
      if (shotDir) await page.screenshot({ path: path.join(shotDir, tag + '-' + name + '.png') });
      shots.push({ name, ...res });
    }
    await page.evaluate(() => { closeModal(); showScreen('map'); });
    return shots;
  }
  for (const [w, h, tag] of [[1280, 900, 'desktop'], [375, 812, 'phone']]) {
    const s = await surfaces(w, h, tag);
    const bad = s.filter(x => x.overflow || x.modalOverflow).map(x => x.name);
    check(tag + ' pass: every Phase 7 surface fits without sideways scrolling', bad.length === 0, bad.join(',') || s.map(x => x.name).join(','));
  }
  check('no page errors', errors.length === 0, errors.join(' | '));

  await browser.close();
  const failed = results.filter(x => !x.ok).length;
  console.log('\n' + (results.length - failed) + '/' + results.length + ' Phase 7 matrix checks passed');
  process.exit(failed ? 1 : 0);
})().catch(error => { console.error(error); process.exit(1); });
