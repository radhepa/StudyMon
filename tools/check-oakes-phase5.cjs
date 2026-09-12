/* Phase 5 Slice 2: Dr. Oakes (sci-oak) dialogue and two-event arc.
   Dr. Oakes is Tier 2, not Tier 1, so this suite is scaled down from the
   Phase 4 folk-sourced checks (check-linden-phase4.cjs etc.): a 150-line
   target instead of 250, category targets scaled to the ledger's Tier 2
   requirements, and two active heart events instead of four. He is
   folk-sourced (townsfolk), carved out of the shared 'scholar' archetype
   into his own 'emeritus' archetype, same pattern as Kern/Linden/Hawthorn in
   Phase 4 - there is no legacy consolidation step and no CAST_BIBLES entry
   (Tier 2 characters do not get bibles; validateCastEntries() rejects one). */
const { chromium } = require('./playwright.cjs');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const page = await browser.newPage();
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto('http://127.0.0.1:8780/');

  const result = await page.evaluate(() => {
    function readySave() {
      S = freshSave(); bindProgress('c'); ensureFriends();
      const friend = friendship('sci-oak'); friend.met = true; friend.meetings = 20; friend.points = 1000;
      for (let i = 1; i <= 15; i++) S.badges[i] = true;
      return friend;
    }
    const ledgerRecord = window.TIER2_TIER3_LEDGER.entries['sci-oak'];
    const friend = readySave();
    const report = characterDialogueReport('sci-oak');
    const dialogueErrors = validateCharacterDialogue('sci-oak');
    const eventErrors = validateHeartEventContent('sci-oak');
    const rules = friendEventRules('sci-oak');
    const scenes = rules.map(rule => sceneBeats('sci-oak', 'event', rule.eventId));
    const tier2Targets = { firstMeeting: 6, friendshipStages: 40, postEvent: 12, location: 10, recentMoodRumor: 8, itemPokemon: 8, repeatInteraction: 6 };
    const categoryTargets = Object.keys(tier2Targets).every(category => (report.categories[category] || 0) >= tier2Targets[category]);
    const contaminated = (CORE_CAST_DIALOGUE['sci-oak'] || []).flatMap(pool => pool.lines).filter(line =>
      /\b(calculus|compiler|pointer|quiz|exam|homework|study|studying|lesson|lessons|algorithm|programming|midterm|gpa|assignment|coursework|syllabus|textbook)\b/i.test(line));
    const contexts = [
      selectCharacterDialogue('sci-oak', { firstMeeting: true }),
      selectCharacterDialogue('sci-oak', { location: 'lab', mood: 'neutral' }),
      selectCharacterDialogue('sci-oak', { location: 'town', mood: 'tense' })
    ];
    S.items.teaTin = 1;
    contexts.push(selectCharacterDialogue('sci-oak', { mood: 'neutral' }));
    delete S.items.teaTin;
    S.seen[137] = true;
    contexts.push(selectCharacterDialogue('sci-oak', { mood: 'neutral' }));
    const deterministicA = selectCharacterDialogue('sci-oak', { location: 'town', mood: 'neutral' });
    const deterministicB = selectCharacterDialogue('sci-oak', { location: 'town', mood: 'neutral' });
    const freshFirst = nextFriendEvent('sci-oak').rule.eventId;
    friend.events = [rules[0].eventId];
    const midNext = nextFriendEvent('sci-oak').rule.eventId;

    const badgeGate = (() => {
      S = freshSave(); bindProgress('c'); ensureFriends(); ensureTown(); ensureBag();
      talkTo('sci-oak');
      const blockedBelowTen = !friendship('sci-oak').met;
      for (let i = 1; i <= 10; i++) S.badges[i] = true;
      talkTo('sci-oak');
      const meetsAtTen = friendship('sci-oak').met;
      return blockedBelowTen && meetsAtTen;
    })();

    readySave();
    const activeId = rules[0].eventId;
    startFriendScene('sci-oak', 'event', activeId);
    let activeScene = sceneBeats('sci-oak', 'event', activeId);
    for (let i = 0; i < 4; i++) {
      const beat = activeScene.beats.find(item => item.id === S.friendScene.beatId);
      resolveFriendChoice(beat.c[0].id);
    }
    const pendingBefore = copySaveValue(S.friendScene);
    activateSave(normalizeSave(copySaveValue(S))); ensureFriends();
    const interruptedStable = JSON.stringify(S.friendScene) === JSON.stringify(pendingBefore) &&
      !!sceneBeats('sci-oak', 'event', S.friendScene.sceneId).beats.find(beat => beat.id === S.friendScene.beatId);
    while (S.friendScene) {
      activeScene = sceneBeats('sci-oak', 'event', S.friendScene.sceneId);
      const beat = activeScene.beats.find(item => item.id === S.friendScene.beatId);
      resolveFriendChoice(beat.c[0].id);
    }
    const consequence = !!S.worldFlags['event:sci-oak:' + activeId];
    const acknowledgment = selectCharacterDialogue('sci-oak').poolId === 'sci-oak-dialogue-post-marginal-note';
    readMemory('sci-oak', activeId);
    const replayTitle = document.querySelector('#s-friends h2') && document.querySelector('#s-friends h2').textContent;

    return { ledgerRecord, report, dialogueErrors, eventErrors, categoryTargets, contaminated,
      ruleIds: rules.map(rule => rule.eventId), beatCounts: scenes.map(scene => scene.beats.length),
      contexts: contexts.map(line => line && ({ id: line.id, category: line.category })),
      deterministic: deterministicA && deterministicB && deterministicA.id === deterministicB.id,
      freshFirst, midNext, interruptedStable, consequence, acknowledgment, replayTitle, badgeGate };
  });

  const activeIds = ['sci-oak-folk-emeritus-event-the-marginal-note', 'sci-oak-folk-emeritus-event-the-only-sentence-he-has-not-rehearsed'];
  const checks = [
    ['the ledger already scoped this character as ready with a 2-event / 150-line target',
      result.ledgerRecord.reachability === 'ready' && result.ledgerRecord.eventTarget === 2 && result.ledgerRecord.lineTarget === 150],
    ['Dr. Oakes has at least 150 whole, unique contextual lines',
      result.report.lines >= 150 && result.report.uniqueTexts === result.report.lines && result.report.uniqueLineIds === result.report.lines],
    ['every Tier 2-scaled dialogue category meets its production target', result.categoryTargets],
    ['dialogue conditions and both later acknowledgments validate', result.dialogueErrors.length === 0],
    ['Dr. Oakes dialogue avoids educational voice contamination', result.contaminated.length === 0],
    ['two active events use the dedicated emeritus archetype IDs', JSON.stringify(result.ruleIds) === JSON.stringify(activeIds)],
    ['each active event is substantial and structurally valid (>= 5 beats)', result.beatCounts.every(count => count >= 5) && result.eventErrors.length === 0],
    ['first-meeting, location, mood, item, and Pokémon contexts select authored lines',
      result.contexts.every(Boolean) && result.contexts.map(x => x.category).join(',') === 'firstMeeting,location,recentMoodRumor,itemPokemon,itemPokemon'],
    ['dialogue selection is deterministic for identical state', result.deterministic],
    ['fresh and mid-progress saves advance by canonical event ID', result.freshFirst === activeIds[0] && result.midNext === activeIds[1]],
    ['an interrupted late beat survives normalization and resumes by stable ID', result.interruptedStable],
    ['completion writes a consequence and unlocks later acknowledgment', result.consequence && result.acknowledgment],
    ['a completed heart event replays from the journal', result.replayTitle === 'The marginal note'],
    ['his personal 10-badge gate still blocks meeting him before then, unrelated to the friendship engine', result.badgeGate === true],
    ['no page errors', pageErrors.length === 0]
  ];
  checks.forEach(([name, ok]) => console.log((ok ? 'PASS  ' : 'FAIL  ') + name));
  if (checks.some(([, ok]) => !ok)) {
    console.log(JSON.stringify({ ...result, pageErrors }, null, 2));
    process.exitCode = 1;
  } else console.log(checks.length + '/' + checks.length + ' checks passed; ' + result.report.lines + ' Dr. Oakes lines across ' + result.report.pools + ' context pools');
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
