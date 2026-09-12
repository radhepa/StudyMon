/* Phase 5 Slice 8: fifth Tier 2 relationship/location batch - Vell and Ink,
   the archive's "breadth versus precision" pair. Both carved out of the
   shared 'scholar' cls family into their own dedicated archetypes
   ('catalog' / 'facsimile'), same Tier 2 shape as sci-oak-phase5.js,
   oz-phase5.js/sal-phase5.js, barista-phase5.js/dax-phase5.js,
   ace1-phase5.js/ace2-phase5.js, burl-phase5.js/crag-phase5.js and
   null-phase5.js/leak-phase5.js/geo-phase5.js: a 150-line target each,
   Tier 2-scaled category minimums, and two active heart events each. Their
   arcs are the same joint effort - tracking down every copy made from
   Ink's one flawed original, using Vell's index - told from each woman's
   own angle, completed through ordinary narrative reference (each mentions
   the other by name and history), not the relationshipIds gate - Tier 2
   has no bible, so that gate cannot fire for it (see the Phase 5 handoff's
   "Known risks"). This suite also confirms the carve-out did not leak onto
   the seventeen remaining plain-scholar-family townsfolk across both
   subjects. Neither Vell nor Ink has a personal badge gate, so both use
   the standard Tier 2 badge floor (2/5). */
const { chromium } = require('./playwright.cjs');

const CHARACTERS = [
  { id: 'libr', archetype: 'catalog', item: 'circuitToken', otherId: 'ink',
    eventIds: ['libr-folk-catalog-event-the-gap-in-the-index', 'libr-folk-catalog-event-what-ink-found'],
    firstAcknowledgePool: 'libr-dialogue-post-the-gap-in-the-index', replayTitle: 'The gap in the index' },
  { id: 'ink', archetype: 'facsimile', item: 'integralToken', otherId: 'libr',
    eventIds: ['ink-folk-facsimile-event-the-one-stray-character', 'ink-folk-facsimile-event-correcting-it-out-loud'],
    firstAcknowledgePool: 'ink-dialogue-post-the-one-stray-character', replayTitle: 'The one stray character' }
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
        selectCharacterDialogue(id, { location: 'archive', mood: 'neutral' }),
        selectCharacterDialogue(id, { location: 'town', mood: 'tense' })
      ];
      S.items[item] = 1;
      contexts.push(selectCharacterDialogue(id, { mood: 'neutral' }));
      delete S.items[item];
      S.seen[436] = true;
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
    const librLines = (CORE_CAST_DIALOGUE.libr || []).flatMap(pool => pool.lines).join(' ');
    const inkLines = (CORE_CAST_DIALOGUE.ink || []).flatMap(pool => pool.lines).join(' ');
    const catalogEventText = (window.FOLK_EVENTS['catalog'] || []).flatMap(event => event.beats.map(beat => beat.s)).join(' ');
    const facsimileEventText = (window.FOLK_EVENTS['facsimile'] || []).flatMap(event => event.beats.map(beat => beat.s)).join(' ');
    return {
      librMentionsInk: /\bInk\b/.test(librLines) && /\bInk\b/.test(catalogEventText),
      inkMentionsVell: /\bVell\b/.test(inkLines) && /\bVell\b/.test(facsimileEventText)
    };
  });
  check('Vell\'s dialogue and event text reference Ink by name (ordinary narrative cross-reference, not the relationshipIds gate)', crossRef.librMentionsInk);
  check('Ink\'s dialogue and event text reference Vell by name (ordinary narrative cross-reference, not the relationshipIds gate)', crossRef.inkMentionsVell);

  const isolation = await page.evaluate(() => {
    /* Derived by grepping every townsfolk.js/calc-townsfolk.js member still
       using a plain scholar-family cls string (Scientist, Archivist, Data
       Analyst, Behaviourist, Systems Engineer, Cryogenics, Field
       Researcher, Copyist, Archivist Emeritus, Retired Lecturer, Move
       Tutor, Lab Aide) after this carve-out, rather than assumed - Slice 5
       found a wrong, incomplete list this way when it was guessed instead. */
    const remaining = ['c-arne', 'c-lorne', 'c-perpetua', 'c-abel', 'c-noam', 'c-ravi', 'c-solveig', 'c-pim',
      'sci1', 'sci2', 'tutor', 'shelf', 'sci-ash', 'sci-holly', 'sci-yew', 'sci-birk', 'sci-nim'].map(id => {
      const source = castSource(castById(id));
      const arcKey = (window.CLASS_STORY || {})[source.cls];
      const arc = (window.FOLK_EVENTS || {})[arcKey] || [];
      return { id, cls: source.cls, arcKey, eventCount: arc.length };
    });
    return remaining;
  });
  check('the carve-out did not leak onto the remaining plain scholar-family townsfolk (still 3 events each)',
    isolation.every(r => r.cls !== 'Chief Archivist' && r.cls !== 'Precise Copyist' && r.arcKey === 'scholar' && r.eventCount === 3),
    JSON.stringify(isolation));

  check('no page errors', errors.length === 0, errors.join(' | '));

  const passed = results.filter(result => result.ok).length;
  console.log(passed + '/' + results.length + ' checks passed');
  if (passed !== results.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
