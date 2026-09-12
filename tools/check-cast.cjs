/* Phase 2 cast census, registry adapters, and friendship eligibility. */
const { chromium } = require('./playwright.cjs');

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

  const census = await page.evaluate(() => {
    const sourceCounts = {
      companions: TRAINERS.length,
      townsfolk: Object.values(SUBJECTS).reduce((n, subject) => n + subject.TOWNSFOLK.length, 0),
      gyms: Object.values(SUBJECTS).reduce((n, subject) => n + subject.CHAPTERS.length, 0),
      bosses: Object.values(SUBJECTS).reduce((n, subject) => n + subject.ELITE.length, 0)
    };
    const ledgerErrors = validateCastEntries(CAST_REGISTRY);
    return {
      sourceCounts,
      census: castCensus(),
      registry: CAST_REGISTRY.length,
      uniqueIds: new Set(CAST_REGISTRY.map(entry => entry.id)).size,
      uniqueSources: new Set(CAST_REGISTRY.map(entry => entry.sourceKey)).size,
      ledgerErrors,
      rules: CAST_INCLUSION_RULES,
      tierOneBibleIds: CAST_REGISTRY.filter(entry => entry.tier === 1 && entry.bible).map(entry => entry.id).sort(),
      reciprocalEdges: CAST_REGISTRY.filter(entry => entry.bible).every(entry =>
        entry.bible.relationships.every(edge => !edge.reciprocal ||
          CAST_REGISTRY.some(other => other.id === edge.id && other.bible &&
            other.bible.relationships.some(back => back.id === entry.id && back.reciprocal)))),
      sourcesResolve: CAST_REGISTRY.every(entry => !!castSource(entry))
    };
  });
  const expectedTotal = Object.values(census.sourceCounts).reduce((sum, n) => sum + n, 0);
  check('the census covers every companion, townsfolk, gym leader, and boss source exactly once',
    expectedTotal === 164 && census.registry === expectedTotal && census.uniqueIds === expectedTotal &&
      census.uniqueSources === expectedTotal && census.sourcesResolve, JSON.stringify(census.sourceCounts));
  check('the approved ledger carries every required classification field',
    census.ledgerErrors.length === 0, census.ledgerErrors.slice(0, 4).join(' | '));
  check('objective inclusion and exclusion rules are recorded with the denominator',
    !!census.rules.included && !!census.rules.excluded && !!census.rules.denominator);
  check('the meaningful-cast friendship quota clears fifty percent',
    census.census.meaningful === 164 && census.census.required === 82 && census.census.befriendable === 127 &&
      census.census.percentage === 77.4, JSON.stringify(census.census));
  check('the ledger selects ten Tier 1 characters without adding new source characters',
    census.census.tiers[1] === 10 && census.census.tiers[2] === 117 && census.census.tiers[3] === 37,
    JSON.stringify(census.census.tiers));
  check('all and only the ten approved Tier 1 characters have complete structural bibles',
    JSON.stringify(census.tierOneBibleIds) === JSON.stringify([
      'aide','c-gym-1','c-hawthorn','calc-gym-1','ellis','june','linden','mira','rowan','theo'
    ]), JSON.stringify(census.tierOneBibleIds));
  check('important reciprocal relationship expectations resolve in both directions', census.reciprocalEdges);

  const adapters = await page.evaluate(() => {
    S = freshSave(); bindProgress('c'); ensureFriends();
    const rowan = castMember('rowan');
    const vesta = castMember('c-vesta');
    const byte = castMember('c-gym-1');
    const people = everyPerson();
    const rowanFriend = friendship('rowan'); rowanFriend.met = true; rowanFriend.points = 100;
    const renFriend = friendship('ren'); renFriend.met = true; renFriend.points = 100;
    return {
      rowan: rowan && rowan.source === TRAINERS.find(person => person.id === 'rowan') && rowan.tier === 1,
      vesta: vesta && vesta.source === SUBJECTS.calc.TOWNSFOLK.find(person => person.id === 'c-vesta') && vesta.subject === 'calc',
      byte: byte && byte.source === SUBJECTS.c.CHAPTERS.find(chapter => chapter.n === 1) && byte.sourceKind === 'gym-leader',
      people: people.length,
      peopleUnique: new Set(people.map(person => person.id)).size,
      subjects: [personSubject('rowan'), personSubject('c-vesta'), personSubject('calc-gym-1')],
      roster: friendRoster().sort()
    };
  });
  check('castMember overlays live sources instead of copying gameplay records', adapters.rowan && adapters.vesta && adapters.byte);
  check('everyPerson and personSubject enumerate through the registry while preserving source shapes',
    adapters.people === 125 && adapters.peopleUnique === 125 &&
      JSON.stringify(adapters.subjects) === JSON.stringify(['c', 'calc', 'calc']), JSON.stringify(adapters));
  check('friendRoster enumerates tracked friends through stable registry IDs',
    JSON.stringify(adapters.roster) === JSON.stringify(['ren', 'rowan']), JSON.stringify(adapters.roster));

  const eligibility = await page.evaluate(() => {
    S = freshSave(); bindProgress('c'); S.settings.sound = false; S.party = [makeMon(1, 10)]; ensureFriends(); ensureBag(); ensureTown();
    const initialCount = Object.keys(S.friends).length;
    const promoted = friendship('aide');
    const promotedStored = promoted === S.friends.aide && friendshipEligible('aide');
    const beforeTier3 = Object.keys(S.friends).length;
    const demotedNew = friendship('mart');
    talkTo('mart');
    const afterTier3 = Object.keys(S.friends).length;

    const scene = sceneBeats('mart', 'event', 0);
    const legacy = freshFriend();
    legacy.met = true; legacy.points = 340; legacy.events = [scene.id];
    legacy.history = [{ kind: 'event', sceneId: scene.id, choiceId: scene.beats[0].c[0].id,
      choiceIds: [scene.beats[0].c[0].id], change: 20, clock: 4 }];
    S.friends.mart = legacy;
    S.friends['retired-person'] = { points: 212, met: true, events: ['retired-event'], history: [{ old: true }] };
    S.friendScene = { id: 'retired-person', kind: 'event', sceneId: 'retired-event', beatId: 'retired-beat', choiceIds: [], gained: 0 };
    ensureFriends();
    const beforeChat = S.friends.mart.points;
    talkFriend('mart');

    const collisionErrors = validateCastEntries(CAST_REGISTRY.concat([CAST_REGISTRY[0]]));
    const calcFriend = friendship('c-vesta');
    const unknownOld = freshSave(); unknownOld.schemaVersion = 2;
    unknownOld.friends = { 'retired-person': { points: 212, met: true, events: ['retired-event'], history: [{ old: true }] } };
    unknownOld.friendScene = { id: 'retired-person', kind: 'event', sceneId: 'retired-event', beatId: 'retired-beat', choiceIds: [], gained: 0 };
    const unknownMigrated = normalizeSave(unknownOld);
    return {
      initialCount,
      promotedStored,
      beforeTier3,
      demotedNew: demotedNew === null,
      afterTier3,
      demotedPreserved: S.friends.mart.points === beforeChat && S.friends.mart.events[0] === scene.id &&
        S.friends.mart.history[0].sceneId === scene.id,
      unknownPreserved: S.friends['retired-person'].points === 212 && S.friends['retired-person'].events[0] === 'retired-event' &&
        S.friendScene && S.friendScene.id === 'retired-person',
      unknownMigrationPreserved: unknownMigrated.friends['retired-person'].events[0] === 'retired-event' &&
        unknownMigrated.friends['retired-person'].history[0].old === true && unknownMigrated.friendScene.id === 'retired-person',
      calcStored: calcFriend === S.friends['c-vesta'] && personSubject('c-vesta') === 'calc',
      collisionCaught: collisionErrors.some(error => /duplicate cast id/.test(error)) &&
        collisionErrors.some(error => /duplicate source/.test(error))
    };
  });
  check('fresh saves lazily create friendship state only for eligible characters',
    eligibility.initialCount === 0 && eligibility.promotedStored && eligibility.beforeTier3 === 1 &&
      eligibility.demotedNew && eligibility.afterTier3 === 1, JSON.stringify(eligibility));
  check('demoted legacy friendship, memories, and history remain recoverable without new gains', eligibility.demotedPreserved);
  check('unknown legacy friendship and pending scene data survive normalization and migration',
    eligibility.unknownPreserved && eligibility.unknownMigrationPreserved);
  check('cross-subject eligible identities create state under one stable ID', eligibility.calcStored);
  check('registry validation rejects cast and source ID collisions', eligibility.collisionCaught);

  check('no page errors', errors.length === 0, errors.join(' | '));
  await browser.close();
  const passed = results.filter(result => result.ok).length;
  console.log(passed + '/' + results.length + ' checks passed');
  if (passed !== results.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
