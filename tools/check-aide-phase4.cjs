/* Phase 4 Slice 8: Kern (aide) dialogue and four-event arc.
   Kern is folk-sourced (townsfolk), not a bespoke companion, so this suite
   differs from the companion-batch checks: there is no seven-scene legacy
   inventory and no consolidation/alias replay to verify. His four heart
   events are newly authored directly in FOLK_EVENTS.aide. */
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
      const friend = friendship('aide'); friend.met = true; friend.meetings = 20; friend.points = 1000;
      for (let i = 1; i <= 15; i++) S.badges[i] = true;
      return friend;
    }
    const friend = readySave();
    const report = characterDialogueReport('aide');
    const dialogueErrors = validateCharacterDialogue('aide');
    const eventErrors = validateHeartEventContent('aide');
    const rules = friendEventRules('aide');
    const scenes = rules.map(rule => sceneBeats('aide', 'event', rule.eventId));
    const inventory = CORE_CAST_PRODUCTION.aide.eventInventory;
    const categoryTargets = Object.keys(CORE_CAST_DIALOGUE_CATEGORIES).every(category =>
      (report.categories[category] || 0) >= CORE_CAST_DIALOGUE_CATEGORIES[category].target);
    const contaminated = (CORE_CAST_DIALOGUE.aide || []).flatMap(pool => pool.lines).filter(line =>
      /\b(calculus|compiler|pointer|quiz|exam|homework|study|lesson)\b/i.test(line));
    const contexts = [
      selectCharacterDialogue('aide', { firstMeeting: true }),
      selectCharacterDialogue('aide', { location: 'linden-lab', mood: 'neutral' }),
      selectCharacterDialogue('aide', { location: 'field-station', mood: 'tense' })
    ];
    S.items.hotSauce = 1;
    contexts.push(selectCharacterDialogue('aide', { mood: 'neutral' }));
    delete S.items.hotSauce;
    S.seen[137] = true;
    contexts.push(selectCharacterDialogue('aide', { mood: 'neutral' }));
    const deterministicA = selectCharacterDialogue('aide', { location: 'town', mood: 'neutral' });
    const deterministicB = selectCharacterDialogue('aide', { location: 'town', mood: 'neutral' });
    const freshFirst = nextFriendEvent('aide').rule.eventId;
    friend.events = [rules[0].eventId];
    const midNext = nextFriendEvent('aide').rule.eventId;

    readySave();
    const activeId = rules[0].eventId;
    startFriendScene('aide', 'event', activeId);
    let activeScene = sceneBeats('aide', 'event', activeId);
    for (let i = 0; i < 4; i++) {
      const beat = activeScene.beats.find(item => item.id === S.friendScene.beatId);
      resolveFriendChoice(beat.c[0].id);
    }
    const pendingBefore = copySaveValue(S.friendScene);
    activateSave(normalizeSave(copySaveValue(S))); ensureFriends();
    const interruptedStable = JSON.stringify(S.friendScene) === JSON.stringify(pendingBefore) &&
      !!sceneBeats('aide', 'event', S.friendScene.sceneId).beats.find(beat => beat.id === S.friendScene.beatId);
    while (S.friendScene) {
      activeScene = sceneBeats('aide', 'event', S.friendScene.sceneId);
      const beat = activeScene.beats.find(item => item.id === S.friendScene.beatId);
      resolveFriendChoice(beat.c[0].id);
    }
    const consequence = !!S.worldFlags['event:aide:' + activeId];
    const acknowledgment = selectCharacterDialogue('aide').poolId === 'aide-dialogue-post-routine-delivery';
    readMemory('aide', activeId);
    const replayTitle = document.querySelector('#s-friends h2') && document.querySelector('#s-friends h2').textContent;

    return { report, dialogueErrors, eventErrors, categoryTargets, contaminated,
      ruleIds: rules.map(rule => rule.eventId), beatCounts: scenes.map(scene => scene.beats.length),
      inventory,
      contexts: contexts.map(line => line && ({ id: line.id, category: line.category })),
      deterministic: deterministicA && deterministicB && deterministicA.id === deterministicB.id,
      freshFirst, midNext, interruptedStable, consequence, acknowledgment, replayTitle };
  });

  const activeIds = ['aide-folk-aide-event-the-routine-delivery', 'aide-folk-aide-event-the-checklist-that-failed',
    'aide-folk-aide-event-survey-ownership', 'aide-folk-aide-event-the-field-day'];
  const checks = [
    ['Kern has at least 250 whole, unique contextual lines', result.report.lines >= 250 && result.report.uniqueTexts === result.report.lines && result.report.uniqueLineIds === result.report.lines],
    ['every dialogue category meets its production target', result.categoryTargets],
    ['dialogue conditions and four later acknowledgments validate', result.dialogueErrors.length === 0],
    ['Kern dialogue avoids educational voice contamination', result.contaminated.length === 0],
    ['four active events use the dedicated aide archetype IDs', JSON.stringify(result.ruleIds) === JSON.stringify(activeIds)],
    ['each active event is substantial and structurally valid', result.beatCounts.every(count => count >= 6) && result.eventErrors.length === 0],
    ['the production inventory has exactly four events with full ID coverage', result.inventory.length === 4 && result.inventory.every(event => event.beatIds.length >= 6 && event.choiceIds.length >= 12)],
    ['first-meeting, location, mood, item, and Pokémon contexts select authored lines', result.contexts.every(Boolean) && result.contexts.map(x => x.category).join(',') === 'firstMeeting,location,recentMoodRumor,itemPokemon,itemPokemon'],
    ['dialogue selection is deterministic for identical state', result.deterministic],
    ['fresh and mid-progress saves advance by canonical event ID', result.freshFirst === activeIds[0] && result.midNext === activeIds[1]],
    ['an interrupted late beat survives normalization and resumes by stable ID', result.interruptedStable],
    ['completion writes a consequence and unlocks later acknowledgment', result.consequence && result.acknowledgment],
    ['a completed heart event replays from the journal', result.replayTitle === 'The routine delivery'],
    ['no page errors', pageErrors.length === 0]
  ];
  checks.forEach(([name, ok]) => console.log((ok ? 'PASS  ' : 'FAIL  ') + name));
  if (checks.some(([, ok]) => !ok)) {
    console.log(JSON.stringify({ ...result, pageErrors }, null, 2));
    process.exitCode = 1;
  } else console.log(checks.length + '/' + checks.length + ' checks passed; ' + result.report.lines + ' Kern lines across ' + result.report.pools + ' context pools');
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
