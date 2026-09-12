/* Phase 4 slices 1–3: production matrix, Rowan vertical slice, shared schema. */
const { chromium } = require('./playwright.cjs');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const page = await browser.newPage();
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto('http://127.0.0.1:8780/');

  const result = await page.evaluate(() => {
    S = freshSave(); bindProgress('c'); ensureFriends();
    const f = friendship('rowan'); f.met = true; f.meetings = 20; f.points = 1000;
    for (let i = 1; i <= 15; i++) S.badges[i] = true;

    const tierOneIds = castEntries({ tier: 1 }).map(entry => entry.id).sort();
    const plans = Object.keys(CORE_CAST_PRODUCTION).sort();
    const matrixErrors = validateCoreCastProduction();
    const dialogueErrors = validateCharacterDialogue('rowan');
    const eventErrors = validateHeartEventContent('rowan');
    const report = characterDialogueReport('rowan');
    const rules = friendEventRules('rowan');
    const scenes = rules.map(rule => sceneBeats('rowan', 'event', rule.eventId));
    const allSceneIds = TRAINERS.find(t => t.id === 'rowan').events.map(event => event.id);
    const inventory = CORE_CAST_PRODUCTION.rowan.eventInventory;

    const contexts = [
      selectCharacterDialogue('rowan', { firstMeeting: true }),
      selectCharacterDialogue('rowan', { location: 'bookshop', mood: 'neutral' }),
      selectCharacterDialogue('rowan', { location: 'town:practice-field', mood: 'tense' })
    ];
    const deterministicA = selectCharacterDialogue('rowan', { location: 'bookshop', mood: 'neutral' });
    const deterministicB = selectCharacterDialogue('rowan', { location: 'bookshop', mood: 'neutral' });

    const legacy = freshSave(); bindProgress('c');
    legacy.friends = { rowan: freshFriend() };
    legacy.friends.rowan.met = true; legacy.friends.rowan.meetings = 20; legacy.friends.rowan.points = 1000;
    legacy.friends.rowan.events = ['rowan-event-the-erased-score', 'rowan-event-a-bad-afternoon',
      'rowan-event-your-corner', 'rowan-event-the-empty-line'];
    const oldScene = sceneBeats('rowan', 'event', 'rowan-event-the-erased-score');
    legacy.friends.rowan.history = [{ kind: 'event', sceneId: oldScene.id,
      choiceId: oldScene.beats[0].c[0].id, choiceIds: oldScene.beats.map(beat => beat.c[0].id), change: 44, clock: 7 }];
    activateSave(normalizeSave(legacy)); ensureFriends();
    const legacyComplete = nextFriendEvent('rowan') === null;
    readMemory('rowan', oldScene.id);
    const replayTitle = document.querySelector('#s-friends h2') && document.querySelector('#s-friends h2').textContent;

    S = freshSave(); bindProgress('c'); ensureFriends();
    const interruptedFriend = friendship('rowan'); interruptedFriend.met = true; interruptedFriend.meetings = 20; interruptedFriend.points = 1000;
    for (let i = 1; i <= 15; i++) S.badges[i] = true;
    const activeId = rules[0].eventId;
    startFriendScene('rowan', 'event', activeId);
    let activeScene = sceneBeats('rowan', 'event', activeId);
    for (let i = 0; i < 4; i++) {
      const beat = activeScene.beats.find(item => item.id === S.friendScene.beatId);
      resolveFriendChoice(beat.c[0].id);
    }
    const pendingBefore = copySaveValue(S.friendScene);
    const resumedSave = normalizeSave(copySaveValue(S));
    activateSave(resumedSave); ensureFriends();
    const interruptedStable = JSON.stringify(S.friendScene) === JSON.stringify(pendingBefore) &&
      !!sceneBeats('rowan', 'event', S.friendScene.sceneId).beats.find(beat => beat.id === S.friendScene.beatId);
    while (S.friendScene) {
      activeScene = sceneBeats('rowan', 'event', S.friendScene.sceneId);
      const beat = activeScene.beats.find(item => item.id === S.friendScene.beatId);
      resolveFriendChoice(beat.c[0].id);
    }
    const consequence = !!S.worldFlags['event:rowan:' + activeId];
    const acknowledgment = selectCharacterDialogue('rowan').poolId === 'rowan-dialogue-post-pencil';

    return { tierOneIds, plans, matrixErrors, dialogueErrors, eventErrors, report,
      ruleIds: rules.map(rule => rule.eventId), beatCounts: scenes.map(scene => scene.beats.length),
      allSceneIds, inventory, contexts: contexts.map(line => line && ({ id: line.id, category: line.category })),
      deterministic: deterministicA && deterministicB && deterministicA.id === deterministicB.id,
      legacyComplete, replayTitle, interruptedStable, consequence, acknowledgment };
  });

  const checks = [
    ['matrix freezes exactly the approved ten Tier 1 IDs', JSON.stringify(result.tierOneIds) === JSON.stringify(result.plans)],
    ['all production matrix records and legacy ID inventories validate', result.matrixErrors.length === 0],
    ['Rowan has at least 250 whole, unique contextual lines', result.report.lines >= 250 && result.report.uniqueTexts === result.report.lines && result.report.uniqueLineIds === result.report.lines],
    ['Rowan dialogue conditions and later acknowledgments validate', result.dialogueErrors.length === 0],
    ['four active events use the frozen canonical IDs', JSON.stringify(result.ruleIds) === JSON.stringify([
      'rowan-event-the-spare-pencil', 'rowan-event-a-bad-afternoon', 'rowan-event-the-letter-home', 'rowan-event-same-time-tomorrow'])],
    ['each active event is substantial and structurally valid', result.beatCounts.every(count => count >= 5) && result.eventErrors.length === 0],
    ['all seven legacy Rowan scene IDs remain resolvable', result.allSceneIds.length === 7 && result.inventory.length === 7 && result.inventory.every(event => event.beatIds.length && event.choiceIds.length)],
    ['first-meeting, location, and mood contexts select authored lines', result.contexts.every(Boolean) && result.contexts[0].category === 'firstMeeting' && result.contexts[1].category === 'location' && result.contexts[2].category === 'recentMoodRumor'],
    ['dialogue selection is deterministic for identical state', result.deterministic],
    ['consolidated legacy completions satisfy all four canonical events', result.legacyComplete],
    ['a consolidated legacy journal memory still replays', result.replayTitle === 'The erased score'],
    ['an interrupted late beat survives normalization and resumes by stable ID', result.interruptedStable],
    ['completion writes a consequence and unlocks later acknowledgment', result.consequence && result.acknowledgment],
    ['no page errors', pageErrors.length === 0]
  ];
  checks.forEach(([name, ok]) => console.log((ok ? 'PASS  ' : 'FAIL  ') + name));
  if (checks.some(([, ok]) => !ok)) {
    console.log(JSON.stringify({ ...result, pageErrors }, null, 2));
    process.exitCode = 1;
  } else console.log(checks.length + '/' + checks.length + ' checks passed; ' + result.report.lines + ' Rowan lines across ' + result.report.pools + ' context pools');
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
