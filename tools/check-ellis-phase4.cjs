/* Phase 4 Slice 7: Ellis dialogue, four-event arc and save compatibility. */
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
      const friend = friendship('ellis'); friend.met = true; friend.meetings = 20; friend.points = 1000;
      for (let i = 1; i <= 15; i++) S.badges[i] = true;
      return friend;
    }
    const friend = readySave();
    const report = characterDialogueReport('ellis');
    const dialogueErrors = validateCharacterDialogue('ellis');
    const eventErrors = validateHeartEventContent('ellis');
    const rules = friendEventRules('ellis');
    const scenes = rules.map(rule => sceneBeats('ellis', 'event', rule.eventId));
    const trainer = TRAINERS.find(t => t.id === 'ellis');
    const inventory = CORE_CAST_PRODUCTION.ellis.eventInventory;
    const categoryTargets = Object.keys(CORE_CAST_DIALOGUE_CATEGORIES).every(category =>
      (report.categories[category] || 0) >= CORE_CAST_DIALOGUE_CATEGORIES[category].target);
    const contaminated = (CORE_CAST_DIALOGUE.ellis || []).flatMap(pool => pool.lines).filter(line =>
      /\b(calculus|compiler|pointer|quiz|exam|homework|study|lesson)\b/i.test(line));
    const contexts = [
      selectCharacterDialogue('ellis', { firstMeeting: true }),
      selectCharacterDialogue('ellis', { location: 'cafe', mood: 'neutral' }),
      selectCharacterDialogue('ellis', { location: 'courtyard', mood: 'tense' })
    ];
    S.items.pressedFlower = 1;
    contexts.push(selectCharacterDialogue('ellis', { mood: 'neutral' }));
    delete S.items.pressedFlower;
    S.seen[235] = true;
    contexts.push(selectCharacterDialogue('ellis', { mood: 'neutral' }));
    const deterministicA = selectCharacterDialogue('ellis', { location: 'gallery', mood: 'neutral' });
    const deterministicB = selectCharacterDialogue('ellis', { location: 'gallery', mood: 'neutral' });
    const freshFirst = nextFriendEvent('ellis').rule.eventId;
    friend.events = [rules[0].eventId];
    const midNext = nextFriendEvent('ellis').rule.eventId;

    const legacy = freshSave(); bindProgress('c');
    legacy.friends = { ellis: freshFriend() };
    legacy.friends.ellis.met = true; legacy.friends.ellis.meetings = 20; legacy.friends.ellis.points = 1000;
    legacy.friends.ellis.events = ['ellis-event-an-unfinished-sketch', 'ellis-event-someone-else-s-wall',
      'ellis-event-the-entry-form', 'ellis-event-a-place-for-mistakes'];
    const oldScene = sceneBeats('ellis', 'event', 'ellis-event-a-place-for-mistakes');
    legacy.friends.ellis.history = [{ kind: 'event', sceneId: oldScene.id,
      choiceId: oldScene.beats[0].c[0].id, choiceIds: oldScene.beats.map(beat => beat.c[0].id), change: 52, clock: 9 }];
    activateSave(normalizeSave(legacy)); ensureFriends();
    const legacyComplete = nextFriendEvent('ellis') === null;
    readMemory('ellis', oldScene.id);
    const replayTitle = document.querySelector('#s-friends h2') && document.querySelector('#s-friends h2').textContent;

    readySave();
    const activeId = rules[0].eventId;
    startFriendScene('ellis', 'event', activeId);
    let activeScene = sceneBeats('ellis', 'event', activeId);
    for (let i = 0; i < 4; i++) {
      const beat = activeScene.beats.find(item => item.id === S.friendScene.beatId);
      resolveFriendChoice(beat.c[0].id);
    }
    const pendingBefore = copySaveValue(S.friendScene);
    activateSave(normalizeSave(copySaveValue(S))); ensureFriends();
    const interruptedStable = JSON.stringify(S.friendScene) === JSON.stringify(pendingBefore) &&
      !!sceneBeats('ellis', 'event', S.friendScene.sceneId).beats.find(beat => beat.id === S.friendScene.beatId);
    while (S.friendScene) {
      activeScene = sceneBeats('ellis', 'event', S.friendScene.sceneId);
      const beat = activeScene.beats.find(item => item.id === S.friendScene.beatId);
      resolveFriendChoice(beat.c[0].id);
    }
    const consequence = !!S.worldFlags['event:ellis:' + activeId];
    const acknowledgment = selectCharacterDialogue('ellis').poolId === 'ellis-dialogue-post-unfinished-sketch';

    return { report, dialogueErrors, eventErrors, categoryTargets, contaminated,
      ruleIds: rules.map(rule => rule.eventId), beatCounts: scenes.map(scene => scene.beats.length),
      allSceneIds: trainer.events.map(event => event.id), inventory,
      contexts: contexts.map(line => line && ({ id: line.id, category: line.category })),
      deterministic: deterministicA && deterministicB && deterministicA.id === deterministicB.id,
      freshFirst, midNext, legacyComplete, replayTitle, interruptedStable, consequence, acknowledgment };
  });

  const activeIds = ['ellis-event-an-unfinished-sketch', 'ellis-event-the-wrong-color',
    'ellis-event-opening-night', 'ellis-event-the-window-seat'];
  const checks = [
    ['Ellis has at least 250 whole, unique contextual lines', result.report.lines >= 250 && result.report.uniqueTexts === result.report.lines && result.report.uniqueLineIds === result.report.lines],
    ['every dialogue category meets its production target', result.categoryTargets],
    ['dialogue conditions and four later acknowledgments validate', result.dialogueErrors.length === 0],
    ['Ellis dialogue avoids educational voice contamination', result.contaminated.length === 0],
    ['four active events use the frozen canonical IDs', JSON.stringify(result.ruleIds) === JSON.stringify(activeIds)],
    ['each active event is substantial and structurally valid', result.beatCounts.every(count => count >= 6) && result.eventErrors.length === 0],
    ['all seven legacy Ellis scene IDs and inventories remain resolvable', result.allSceneIds.length === 7 && result.inventory.length === 7 && result.inventory.every(event => event.beatIds.length && event.choiceIds.length)],
    ['first-meeting, location, mood, item, and Pokémon contexts select authored lines', result.contexts.every(Boolean) && result.contexts.map(x => x.category).join(',') === 'firstMeeting,location,recentMoodRumor,itemPokemon,itemPokemon'],
    ['dialogue selection is deterministic for identical state', result.deterministic],
    ['fresh and mid-progress saves advance by canonical event ID', result.freshFirst === activeIds[0] && result.midNext === activeIds[1]],
    ['consolidated legacy completions satisfy all four canonical events', result.legacyComplete],
    ['a consolidated legacy journal memory still replays', result.replayTitle === 'A place for mistakes'],
    ['an interrupted late beat survives normalization and resumes by stable ID', result.interruptedStable],
    ['completion writes a consequence and unlocks later acknowledgment', result.consequence && result.acknowledgment],
    ['no page errors', pageErrors.length === 0]
  ];
  checks.forEach(([name, ok]) => console.log((ok ? 'PASS  ' : 'FAIL  ') + name));
  if (checks.some(([, ok]) => !ok)) {
    console.log(JSON.stringify({ ...result, pageErrors }, null, 2));
    process.exitCode = 1;
  } else console.log(checks.length + '/' + checks.length + ' checks passed; ' + result.report.lines + ' Ellis lines across ' + result.report.pools + ' context pools');
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
