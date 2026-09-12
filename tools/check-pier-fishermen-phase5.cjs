/* Phase 5 Slice 3: first Tier 2 relationship/location batch - Oz and Sal,
   the pier fishermen. Both carved out of the shared 'angler' archetype into
   their own dedicated archetypes ('restless-angler' / 'patient-angler'),
   same Tier 2 shape as sci-oak-phase5.js (the Slice 2 template): a 150-line
   target each, Tier 2-scaled category minimums, and two active heart events
   each instead of four. Their arcs are written to complete each other
   through ordinary narrative reference (each mentions the other by name and
   history), not the relationshipIds gate - Tier 2 has no bible, so that
   gate cannot fire for it (see the Phase 5 handoff's "Known risks"). This
   suite also confirms the carve-out did not leak onto the other four
   townsfolk still sharing the plain 'angler' archetype (Coral, Brine, Perl,
   Skiff). */
const { chromium } = require('./playwright.cjs');

const CHARACTERS = [
  { id: 'oz', archetype: 'restless-angler', item: 'hotSauce', otherId: 'sal',
    eventIds: ['oz-folk-restless-angler-event-the-one-that-possibly-existed', 'oz-folk-restless-angler-event-standing-still-for-once'],
    firstAcknowledgePool: 'oz-dialogue-post-one-that-possibly-existed', replayTitle: 'The one that possibly existed' },
  { id: 'sal', archetype: 'patient-angler', item: 'carvedWhistle', otherId: 'oz',
    eventIds: ['sal-folk-patient-angler-event-what-the-pier-remembers', 'sal-folk-patient-angler-event-teaching-the-wait'],
    firstAcknowledgePool: 'sal-dialogue-post-what-the-pier-remembers', replayTitle: 'What the pier remembers' }
];

const tier2Targets = { firstMeeting: 6, friendshipStages: 40, postEvent: 12, location: 10, recentMoodRumor: 8, itemPokemon: 8, repeatInteraction: 6 };

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok });
  console.log((ok ? 'PASS  ' : 'FAIL  ') + name + (detail ? '  [' + detail + ']' : ''));
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:8780/');

  for (const person of CHARACTERS) {
    const data = await page.evaluate(({ id, item, eventIds }) => {
      function readySave() {
        S = freshSave(); bindProgress('c'); ensureFriends();
        const friend = friendship(id); friend.met = true; friend.meetings = 20; friend.points = 1000;
        for (let i = 1; i <= 15; i++) S.badges[i] = true;
        return friend;
      }
      const ledgerRecord = window.TIER2_TIER3_LEDGER.entries[id];
      const friend = readySave();
      const report = characterDialogueReport(id);
      const dialogueErrors = validateCharacterDialogue(id);
      const eventErrors = validateHeartEventContent(id);
      const rules = friendEventRules(id);
      const scenes = rules.map(rule => sceneBeats(id, 'event', rule.eventId));
      const contaminated = (CORE_CAST_DIALOGUE[id] || []).flatMap(pool => pool.lines).filter(line =>
        /\b(calculus|compiler|pointer|quiz|exam|homework|study|studying|lesson|lessons|algorithm|programming|midterm|gpa|assignment|coursework|syllabus|textbook)\b/i.test(line));
      const contexts = [
        selectCharacterDialogue(id, { firstMeeting: true }),
        selectCharacterDialogue(id, { location: 'pier', mood: 'neutral' }),
        selectCharacterDialogue(id, { location: 'town', mood: 'tense' })
      ];
      S.items[item] = 1;
      contexts.push(selectCharacterDialogue(id, { mood: 'neutral' }));
      delete S.items[item];
      S.seen[129] = true;
      contexts.push(selectCharacterDialogue(id, { mood: 'neutral' }));
      const deterministicA = selectCharacterDialogue(id, { location: 'town', mood: 'neutral' });
      const deterministicB = selectCharacterDialogue(id, { location: 'town', mood: 'neutral' });
      const freshFirst = nextFriendEvent(id).rule.eventId;
      friend.events = [rules[0].eventId];
      const midNext = nextFriendEvent(id).rule.eventId;

      readySave();
      const activeId = rules[0].eventId;
      startFriendScene(id, 'event', activeId);
      let activeScene = sceneBeats(id, 'event', activeId);
      for (let i = 0; i < 4; i++) {
        const beat = activeScene.beats.find(item2 => item2.id === S.friendScene.beatId);
        resolveFriendChoice(beat.c[0].id);
      }
      const pendingBefore = copySaveValue(S.friendScene);
      activateSave(normalizeSave(copySaveValue(S))); ensureFriends();
      const interruptedStable = JSON.stringify(S.friendScene) === JSON.stringify(pendingBefore) &&
        !!sceneBeats(id, 'event', S.friendScene.sceneId).beats.find(beat => beat.id === S.friendScene.beatId);
      while (S.friendScene) {
        activeScene = sceneBeats(id, 'event', S.friendScene.sceneId);
        const beat = activeScene.beats.find(item2 => item2.id === S.friendScene.beatId);
        resolveFriendChoice(beat.c[0].id);
      }
      const consequence = !!S.worldFlags['event:' + id + ':' + activeId];
      const acknowledgedPoolId = selectCharacterDialogue(id).poolId;
      readMemory(id, activeId);
      const replayTitle = document.querySelector('#s-friends h2') && document.querySelector('#s-friends h2').textContent;

      return { ledgerRecord, report, dialogueErrors, eventErrors, contaminated,
        ruleIds: rules.map(rule => rule.eventId), beatCounts: scenes.map(scene => scene.beats.length),
        contexts: contexts.map(line => line && ({ id: line.id, category: line.category })),
        deterministic: deterministicA && deterministicB && deterministicA.id === deterministicB.id,
        freshFirst, midNext, interruptedStable, consequence, acknowledgedPoolId, replayTitle };
    }, { id: person.id, item: person.item, eventIds: person.eventIds });

    const categoryTargets = Object.keys(tier2Targets).every(category => (data.report.categories[category] || 0) >= tier2Targets[category]);

    check(person.id + ': the ledger already scoped this character as ready with a 2-event / 150-line target',
      data.ledgerRecord.reachability === 'ready' && data.ledgerRecord.eventTarget === 2 && data.ledgerRecord.lineTarget === 150);
    check(person.id + ': has at least 150 whole, unique contextual lines',
      data.report.lines >= 150 && data.report.uniqueTexts === data.report.lines && data.report.uniqueLineIds === data.report.lines,
      data.report.lines + ' lines');
    check(person.id + ': every Tier 2-scaled dialogue category meets its production target', categoryTargets, JSON.stringify(data.report.categories));
    check(person.id + ': dialogue conditions and both later acknowledgments validate', data.dialogueErrors.length === 0, data.dialogueErrors.join(' | '));
    check(person.id + ': dialogue avoids educational voice contamination', data.contaminated.length === 0, data.contaminated.join(' | '));
    check(person.id + ': two active events use the dedicated archetype IDs', JSON.stringify(data.ruleIds) === JSON.stringify(person.eventIds), JSON.stringify(data.ruleIds));
    check(person.id + ': each active event is substantial and structurally valid (>= 5 beats)',
      data.beatCounts.every(count => count >= 5) && data.eventErrors.length === 0, JSON.stringify(data.beatCounts));
    check(person.id + ': first-meeting, location, mood, item, and Pokémon contexts select authored lines',
      data.contexts.every(Boolean) && data.contexts.map(x => x.category).join(',') === 'firstMeeting,location,recentMoodRumor,itemPokemon,itemPokemon',
      JSON.stringify(data.contexts));
    check(person.id + ': dialogue selection is deterministic for identical state', data.deterministic);
    check(person.id + ': fresh and mid-progress saves advance by canonical event ID',
      data.freshFirst === person.eventIds[0] && data.midNext === person.eventIds[1]);
    check(person.id + ': an interrupted late beat survives normalization and resumes by stable ID', data.interruptedStable);
    check(person.id + ': completion writes a consequence and unlocks later acknowledgment',
      data.consequence && data.acknowledgedPoolId === person.firstAcknowledgePool, data.acknowledgedPoolId);
    check(person.id + ': a completed heart event replays from the journal', data.replayTitle === person.replayTitle, data.replayTitle);
  }

  const crossRef = await page.evaluate(() => {
    const ozLines = (CORE_CAST_DIALOGUE.oz || []).flatMap(pool => pool.lines).join(' ');
    const salLines = (CORE_CAST_DIALOGUE.sal || []).flatMap(pool => pool.lines).join(' ');
    const ozEventText = (window.FOLK_EVENTS['restless-angler'] || []).flatMap(event => event.beats.map(beat => beat.s)).join(' ');
    const salEventText = (window.FOLK_EVENTS['patient-angler'] || []).flatMap(event => event.beats.map(beat => beat.s)).join(' ');
    return {
      ozMentionsSal: /\bSal\b/.test(ozLines) && /\bSal\b/.test(ozEventText),
      salMentionsOz: /\bOz\b/.test(salLines) && /\bOz\b/.test(salEventText)
    };
  });
  check('Oz\'s dialogue and event text reference Sal by name (ordinary narrative cross-reference, not the relationshipIds gate)', crossRef.ozMentionsSal);
  check('Sal\'s dialogue and event text reference Oz by name (ordinary narrative cross-reference, not the relationshipIds gate)', crossRef.salMentionsOz);

  const isolation = await page.evaluate(() => {
    const remaining = ['coral', 'brine', 'perl', 'skiff'].map(id => {
      const source = castSource(castById(id));
      const arcKey = (window.CLASS_STORY || {})[source.cls];
      const arc = (window.FOLK_EVENTS || {})[arcKey] || [];
      return { id, cls: source.cls, arcKey, eventCount: arc.length };
    });
    return remaining;
  });
  check('the carve-out did not leak onto the four remaining plain-angler townsfolk (still 3 events each)',
    isolation.every(r => r.cls !== 'Restless Fisherman' && r.cls !== 'Patient Fisherman' && r.arcKey === 'angler' && r.eventCount === 3),
    JSON.stringify(isolation));

  check('no page errors', errors.length === 0, errors.join(' | '));

  const passed = results.filter(result => result.ok).length;
  console.log(passed + '/' + results.length + ' checks passed');
  if (passed !== results.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
