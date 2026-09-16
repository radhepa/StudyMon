/* Phase 4 Slice 5: Theo dialogue, four-event arc and save compatibility. */
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
      const friend = friendship('theo'); friend.met = true; friend.meetings = 20; friend.points = 1000;
      for (let i = 1; i <= 15; i++) S.badges[i] = true;
      return friend;
    }
    const friend = readySave();
    const report = characterDialogueReport('theo');
    const dialogueErrors = validateCharacterDialogue('theo');
    const eventErrors = validateHeartEventContent('theo');
    const rules = friendEventRules('theo');
    const scenes = rules.map(rule => sceneBeats('theo', 'event', rule.eventId));
    const trainer = TRAINERS.find(t => t.id === 'theo');
    const inventory = CORE_CAST_PRODUCTION.theo.eventInventory;
    const categoryTargets = Object.keys(CORE_CAST_DIALOGUE_CATEGORIES).every(category =>
      (report.categories[category] || 0) >= CORE_CAST_DIALOGUE_CATEGORIES[category].target);
    const contaminated = (CORE_CAST_DIALOGUE.theo || []).flatMap(pool => pool.lines).filter(line =>
      /\b(calculus|compiler|pointer|quiz|exam|homework|study|lesson)\b/i.test(line));
    const contexts = [
      selectCharacterDialogue('theo', { firstMeeting: true }),
      selectCharacterDialogue('theo', { location: 'repair-shop', mood: 'neutral' }),
      selectCharacterDialogue('theo', { location: 'bakery-steps', mood: 'tense' })
    ];
    S.items.teaTin = 1;
    contexts.push(selectCharacterDialogue('theo', { mood: 'neutral' }));
    delete S.items.teaTin;
    S.seen[81] = true;
    contexts.push(selectCharacterDialogue('theo', { mood: 'neutral' }));
    const deterministicA = selectCharacterDialogue('theo', { location: 'hill-path', mood: 'neutral' });
    const deterministicB = selectCharacterDialogue('theo', { location: 'hill-path', mood: 'neutral' });
    const freshFirst = nextFriendEvent('theo').rule.eventId;
    friend.events = [rules[0].eventId];
    const midNext = nextFriendEvent('theo').rule.eventId;

    const legacy = freshSave(); bindProgress('c');
    legacy.friends = { theo: freshFriend() };
    legacy.friends.theo.met = true; legacy.friends.theo.meetings = 20; legacy.friends.theo.points = 1000;
    legacy.friends.theo.events = ['theo-event-the-quiet-bench', 'theo-event-an-unsigned-ticket',
      'theo-event-the-wrong-part', 'theo-event-your-frequency'];
    const oldScene = sceneBeats('theo', 'event', 'theo-event-your-frequency');
    legacy.friends.theo.history = [{ kind: 'event', sceneId: oldScene.id,
      choiceId: oldScene.beats[0].c[0].id, choiceIds: oldScene.beats.map(beat => beat.c[0].id), change: 52, clock: 9 }];
    activateSave(normalizeSave(legacy)); ensureFriends();
    const legacyComplete = nextFriendEvent('theo') === null;
    readMemory('theo', oldScene.id);
    const replayTitle = document.querySelector('#s-friends h2') && document.querySelector('#s-friends h2').textContent;

    readySave();
    const activeId = rules[0].eventId;
    startFriendScene('theo', 'event', activeId);
    let activeScene = sceneBeats('theo', 'event', activeId);
    for (let i = 0; i < 4; i++) {
      const beat = activeScene.beats.find(item => item.id === S.friendScene.beatId);
      resolveFriendChoice(beat.c[0].id);
    }
    const pendingBefore = copySaveValue(S.friendScene);
    activateSave(normalizeSave(copySaveValue(S))); ensureFriends();
    const interruptedStable = JSON.stringify(S.friendScene) === JSON.stringify(pendingBefore) &&
      !!sceneBeats('theo', 'event', S.friendScene.sceneId).beats.find(beat => beat.id === S.friendScene.beatId);
    while (S.friendScene) {
      activeScene = sceneBeats('theo', 'event', S.friendScene.sceneId);
      const beat = activeScene.beats.find(item => item.id === S.friendScene.beatId);
      resolveFriendChoice(beat.c[0].id);
    }
    const consequence = !!S.worldFlags['event:theo:' + activeId];
    const acknowledgment = selectCharacterDialogue('theo').poolId === 'theo-dialogue-post-drawer';

    return { report, dialogueErrors, eventErrors, categoryTargets, contaminated,
      ruleIds: rules.map(rule => rule.eventId), beatCounts: scenes.map(scene => scene.beats.length),
      allSceneIds: trainer.events.map(event => event.id), inventory,
      contexts: contexts.map(line => line && ({ id: line.id, category: line.category })),
      deterministic: deterministicA && deterministicB && deterministicA.id === deterministicB.id,
      freshFirst, midNext, legacyComplete, replayTitle, interruptedStable, consequence, acknowledgment };
  });

  const activeIds = ['theo-event-the-stuck-drawer', 'theo-event-an-unsigned-ticket',
    'theo-event-the-wrong-part', 'theo-event-open-workshop'];
  const checks = [
    ['Theo has at least 250 whole, unique contextual lines', result.report.lines >= 250 && result.report.uniqueTexts === result.report.lines && result.report.uniqueLineIds === result.report.lines],
    ['every dialogue category meets its production target', result.categoryTargets],
    ['dialogue conditions and four later acknowledgments validate', result.dialogueErrors.length === 0],
    ['Theo dialogue avoids educational voice contamination', result.contaminated.length === 0],
    ['four active events use the frozen canonical IDs', JSON.stringify(result.ruleIds) === JSON.stringify(activeIds)],
    ['each active event is substantial and structurally valid', result.beatCounts.every(count => count >= 6) && result.eventErrors.length === 0],
    ['all seven legacy Theo scene IDs and inventories remain resolvable', result.allSceneIds.length === 7 && result.inventory.length === 7 && result.inventory.every(event => event.beatIds.length && event.choiceIds.length)],
    ['first-meeting, location, mood, item, and Pokémon contexts select authored lines', result.contexts.every(Boolean) && result.contexts.map(x => x.category).join(',') === 'firstMeeting,location,recentMoodRumor,itemPokemon,itemPokemon'],
    ['dialogue selection is deterministic for identical state', result.deterministic],
    ['fresh and mid-progress saves advance by canonical event ID', result.freshFirst === activeIds[0] && result.midNext === activeIds[1]],
    ['consolidated legacy completions satisfy all four canonical events', result.legacyComplete],
    ['a consolidated legacy journal memory still replays', result.replayTitle === 'Your frequency'],
    ['an interrupted late beat survives normalization and resumes by stable ID', result.interruptedStable],
    ['completion writes a consequence and unlocks later acknowledgment', result.consequence && result.acknowledgment],
    ['no page errors', pageErrors.length === 0]
  ];
  checks.forEach(([name, ok]) => console.log((ok ? 'PASS  ' : 'FAIL  ') + name));
  if (checks.some(([, ok]) => !ok)) {
    console.log(JSON.stringify({ ...result, pageErrors }, null, 2));
    process.exitCode = 1;
  } else console.log(checks.length + '/' + checks.length + ' checks passed; ' + result.report.lines + ' Theo lines across ' + result.report.pools + ' context pools');
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
