/* Phase 4 Slice 9: Linden (Professor Linden) dialogue and four-event arc.
   Linden is folk-sourced (townsfolk), not a bespoke companion, so this suite
   differs from the companion-batch checks: there is no seven-scene legacy
   inventory and no consolidation/alias replay to verify. Her four heart
   events are newly authored directly in FOLK_EVENTS.professor, replacing
   that archetype's pre-Phase-4 placeholder content. c-hawthorn transiently
   shares this same archetype until Slice 10 splits him out; that is expected
   and not a defect of this suite. */
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
      const friend = friendship('linden'); friend.met = true; friend.meetings = 20; friend.points = 1000;
      for (let i = 1; i <= 15; i++) S.badges[i] = true;
      return friend;
    }
    const friend = readySave();
    const report = characterDialogueReport('linden');
    const dialogueErrors = validateCharacterDialogue('linden');
    const eventErrors = validateHeartEventContent('linden');
    const rules = friendEventRules('linden');
    const scenes = rules.map(rule => sceneBeats('linden', 'event', rule.eventId));
    const inventory = CORE_CAST_PRODUCTION.linden.eventInventory;
    const categoryTargets = Object.keys(CORE_CAST_DIALOGUE_CATEGORIES).every(category =>
      (report.categories[category] || 0) >= CORE_CAST_DIALOGUE_CATEGORIES[category].target);
    const contaminated = (CORE_CAST_DIALOGUE.linden || []).flatMap(pool => pool.lines).filter(line =>
      /\b(calculus|compiler|pointer|quiz|exam|homework|study|lesson)\b/i.test(line));
    const contexts = [
      selectCharacterDialogue('linden', { firstMeeting: true }),
      selectCharacterDialogue('linden', { location: 'linden-lab', mood: 'neutral' }),
      selectCharacterDialogue('linden', { location: 'field-station', mood: 'tense' })
    ];
    S.items.pressedFlower = 1;
    contexts.push(selectCharacterDialogue('linden', { mood: 'neutral' }));
    delete S.items.pressedFlower;
    S.seen[137] = true;
    contexts.push(selectCharacterDialogue('linden', { mood: 'neutral' }));
    const deterministicA = selectCharacterDialogue('linden', { location: 'town', mood: 'neutral' });
    const deterministicB = selectCharacterDialogue('linden', { location: 'town', mood: 'neutral' });
    const freshFirst = nextFriendEvent('linden').rule.eventId;
    friend.events = [rules[0].eventId];
    const midNext = nextFriendEvent('linden').rule.eventId;

    readySave();
    const activeId = rules[0].eventId;
    startFriendScene('linden', 'event', activeId);
    let activeScene = sceneBeats('linden', 'event', activeId);
    for (let i = 0; i < 4; i++) {
      const beat = activeScene.beats.find(item => item.id === S.friendScene.beatId);
      resolveFriendChoice(beat.c[0].id);
    }
    const pendingBefore = copySaveValue(S.friendScene);
    activateSave(normalizeSave(copySaveValue(S))); ensureFriends();
    const interruptedStable = JSON.stringify(S.friendScene) === JSON.stringify(pendingBefore) &&
      !!sceneBeats('linden', 'event', S.friendScene.sceneId).beats.find(beat => beat.id === S.friendScene.beatId);
    while (S.friendScene) {
      activeScene = sceneBeats('linden', 'event', S.friendScene.sceneId);
      const beat = activeScene.beats.find(item => item.id === S.friendScene.beatId);
      resolveFriendChoice(beat.c[0].id);
    }
    const consequence = !!S.worldFlags['event:linden:' + activeId];
    const acknowledgment = selectCharacterDialogue('linden').poolId === 'linden-dialogue-post-disproven-sketch';
    readMemory('linden', activeId);
    const replayTitle = document.querySelector('#s-friends h2') && document.querySelector('#s-friends h2').textContent;

    return { report, dialogueErrors, eventErrors, categoryTargets, contaminated,
      ruleIds: rules.map(rule => rule.eventId), beatCounts: scenes.map(scene => scene.beats.length),
      inventory,
      contexts: contexts.map(line => line && ({ id: line.id, category: line.category })),
      deterministic: deterministicA && deterministicB && deterministicA.id === deterministicB.id,
      freshFirst, midNext, interruptedStable, consequence, acknowledgment, replayTitle };
  });

  const activeIds = ['linden-folk-professor-event-revisit-a-disproven-field-sketch', 'linden-folk-professor-event-confront-an-uncredited-contribution',
    'linden-folk-professor-event-delegate-a-consequential-survey-decision', 'linden-folk-professor-event-leave-the-lab-and-return-to-find-it-thriving'];
  const checks = [
    ['Linden has at least 250 whole, unique contextual lines', result.report.lines >= 250 && result.report.uniqueTexts === result.report.lines && result.report.uniqueLineIds === result.report.lines],
    ['every dialogue category meets its production target', result.categoryTargets],
    ['dialogue conditions and four later acknowledgments validate', result.dialogueErrors.length === 0],
    ['Linden dialogue avoids educational voice contamination', result.contaminated.length === 0],
    ['four active events use the dedicated professor archetype IDs', JSON.stringify(result.ruleIds) === JSON.stringify(activeIds)],
    ['each active event is substantial and structurally valid', result.beatCounts.every(count => count >= 6) && result.eventErrors.length === 0],
    ['the production inventory has exactly four events with full ID coverage', result.inventory.length === 4 && result.inventory.every(event => event.beatIds.length >= 6 && event.choiceIds.length >= 12)],
    ['first-meeting, location, mood, item, and Pokémon contexts select authored lines', result.contexts.every(Boolean) && result.contexts.map(x => x.category).join(',') === 'firstMeeting,location,recentMoodRumor,itemPokemon,itemPokemon'],
    ['dialogue selection is deterministic for identical state', result.deterministic],
    ['fresh and mid-progress saves advance by canonical event ID', result.freshFirst === activeIds[0] && result.midNext === activeIds[1]],
    ['an interrupted late beat survives normalization and resumes by stable ID', result.interruptedStable],
    ['completion writes a consequence and unlocks later acknowledgment', result.consequence && result.acknowledgment],
    ['a completed heart event replays from the journal', result.replayTitle === 'Revisit a disproven field sketch'],
    ['no page errors', pageErrors.length === 0]
  ];
  checks.forEach(([name, ok]) => console.log((ok ? 'PASS  ' : 'FAIL  ') + name));
  if (checks.some(([, ok]) => !ok)) {
    console.log(JSON.stringify({ ...result, pageErrors }, null, 2));
    process.exitCode = 1;
  } else console.log(checks.length + '/' + checks.length + ' checks passed; ' + result.report.lines + ' Linden lines across ' + result.report.pools + ' context pools');
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
