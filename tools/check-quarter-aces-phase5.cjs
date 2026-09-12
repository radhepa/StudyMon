/* Phase 5 Slice 5: second Tier 2 relationship/location batch - Corin and
   Delia, the Gym Quarter Ace Trainers. Both carved out of the shared
   'veteran' archetype into their own dedicated archetypes ('warmup' /
   'standards'), same Tier 2 shape as sci-oak-phase5.js, oz-phase5.js/
   sal-phase5.js and barista-phase5.js/dax-phase5.js: a 150-line target
   each, Tier 2-scaled category minimums, and two active heart events each
   instead of four. Their arcs are written to complete each other through
   ordinary narrative reference (each mentions the other by name and
   history), not the relationshipIds gate - Tier 2 has no bible, so that
   gate cannot fire for it (see the Phase 5 handoff's "Known risks"). This
   suite also confirms the carve-out did not leak onto the other eight
   townsfolk still sharing the plain 'veteran' archetype (Osk/`blk`, Beauty,
   the referee, Gus, Kes, Ida, Tor, Odile/`champ`). Delia's personal
   `badges: 12` meeting gate
   means her own heart events use badges 12/13 rather than the usual 2/5 -
   confirmed by driving `talkTo()` directly, same as Dr. Oakes's `badges:
   10` gate in Slice 2. */
const { chromium } = require('./playwright.cjs');

const CHARACTERS = [
  { id: 'ace1', archetype: 'warmup', item: 'circuitToken', otherId: 'ace2',
    eventIds: ['ace1-folk-warmup-event-the-same-door', 'ace1-folk-warmup-event-knocking-for-once'],
    firstAcknowledgePool: 'ace1-dialogue-post-the-same-door', replayTitle: 'The same door' },
  { id: 'ace2', archetype: 'standards', item: 'bentSpoon', otherId: 'ace1',
    eventIds: ['ace2-folk-standards-event-the-gap-in-the-middle', 'ace2-folk-standards-event-what-structure-cannot-reach'],
    firstAcknowledgePool: 'ace2-dialogue-post-the-gap-in-the-middle', replayTitle: 'The gap in the middle' }
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
        selectCharacterDialogue(id, { location: 'quarter', mood: 'neutral' }),
        selectCharacterDialogue(id, { location: 'town', mood: 'tense' })
      ];
      S.items[item] = 1;
      contexts.push(selectCharacterDialogue(id, { mood: 'neutral' }));
      delete S.items[item];
      S.seen[66] = true;
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
    const corinLines = (CORE_CAST_DIALOGUE.ace1 || []).flatMap(pool => pool.lines).join(' ');
    const deliaLines = (CORE_CAST_DIALOGUE.ace2 || []).flatMap(pool => pool.lines).join(' ');
    const warmupEventText = (window.FOLK_EVENTS['warmup'] || []).flatMap(event => event.beats.map(beat => beat.s)).join(' ');
    const standardsEventText = (window.FOLK_EVENTS['standards'] || []).flatMap(event => event.beats.map(beat => beat.s)).join(' ');
    return {
      corinMentionsDelia: /\bDelia\b/.test(corinLines) && /\bDelia\b/.test(warmupEventText),
      deliaMentionsCorin: /\bCorin\b/.test(deliaLines) && /\bCorin\b/.test(standardsEventText)
    };
  });
  check('Corin\'s dialogue and event text reference Delia by name (ordinary narrative cross-reference, not the relationshipIds gate)', crossRef.corinMentionsDelia);
  check('Delia\'s dialogue and event text reference Corin by name (ordinary narrative cross-reference, not the relationshipIds gate)', crossRef.deliaMentionsCorin);

  const gate = await page.evaluate(() => {
    S = freshSave(); bindProgress('c'); ensureFriends(); ensureTown(); ensureBag();
    talkTo('ace2');
    const blockedBelowTwelve = !friendship('ace2').met;
    for (let i = 1; i <= 12; i++) S.badges[i] = true;
    talkTo('ace2');
    const meetsAtTwelve = friendship('ace2').met;
    return { blockedBelowTwelve, meetsAtTwelve };
  });
  check('Delia\'s personal 12-badge gate still blocks meeting her before then, unrelated to the friendship engine',
    gate.blockedBelowTwelve && gate.meetsAtTwelve, JSON.stringify(gate));

  const isolation = await page.evaluate(() => {
    const remaining = ['blk', 'beauty', 'referee', 'gus', 'kes', 'ida', 'tor', 'champ'].map(id => {
      const source = castSource(castById(id));
      const arcKey = (window.CLASS_STORY || {})[source.cls];
      const arc = (window.FOLK_EVENTS || {})[arcKey] || [];
      return { id, cls: source.cls, arcKey, eventCount: arc.length };
    });
    return remaining;
  });
  check('the carve-out did not leak onto the remaining plain-veteran townsfolk (still 3 events each)',
    isolation.every(r => r.cls !== 'Quarter Warm-Up Ace' && r.cls !== 'Quarter Standards Ace' && r.arcKey === 'veteran' && r.eventCount === 3),
    JSON.stringify(isolation));

  check('no page errors', errors.length === 0, errors.join(' | '));

  const passed = results.filter(result => result.ok).length;
  console.log(passed + '/' + results.length + ' checks passed');
  if (passed !== results.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
