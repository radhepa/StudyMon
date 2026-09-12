/* Phase 2 deterministic social-context and stable choice-outcome interfaces. */
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

  const contexts = await page.evaluate(() => {
    S = freshSave(); bindProgress('c'); ensureFriends(); ensureBag(); ensureTown();
    const early = socialContext('rowan', { subject: 'c', location: 'town:practice-field' });

    for (let i = 1; i <= 4; i++) S.badges[i] = true;
    const f = friendship('rowan');
    f.met = true; f.meetings = 4; f.points = 120; f.talks = 3; f.outings = 1;
    const eventId = friendEventRules('rowan')[0].eventId;
    f.events = [eventId];
    f.history = [{ kind: 'event', sceneId: eventId, choiceIds: ['rowan-event-1-choice-offer-your-spare-pencil'], change: 25, clock: 12 }];
    S.items.expShare = 1; S.town.receipts['aide-exp-share'] = true;
    S.seen[447] = true; S.caught[447] = true;
    S.worldFlags['rowan:invited'] = true;
    recordDialogueChoiceOutcome('rowan-event-1-choice-offer-your-spare-pencil', 'offered-pencil');
    const beforeRead = JSON.stringify(S);
    const middle = socialContext('rowan', { subject: 'c', location: 'bookshop' });
    const readOnly = beforeRead === JSON.stringify(S);

    for (let i = 5; i <= 8; i++) S.badges[i] = true;
    switchSubject('calc');
    for (let i = 1; i <= 7; i++) S.badges[i] = true;
    const crossRegion = socialContext('rowan', { subject: 'calc', location: 'observatory' });
    const lateLeader = socialContext('calc-gym-1', { subject: 'calc', location: 'calc:gym:1' });

    return { early, middle, crossRegion, lateLeader, readOnly };
  });
  check('early, middle, and late badge bands are deterministic across both subjects',
    contexts.early.badgeBand === 'early' && contexts.middle.badgeBand === 'middle' &&
      contexts.crossRegion.badgeBand === 'late' && contexts.crossRegion.homeBadgeBand === 'late' &&
      contexts.lateLeader.badgeBand === 'late', JSON.stringify({
        early: contexts.early.badgeBand, middle: contexts.middle.badgeBand,
        cross: [contexts.crossRegion.badgeBand, contexts.crossRegion.homeBadgeBand], late: contexts.lateLeader.badgeBand
      }));
  check('context exposes stage, stable events, relationships, ownership, repeats, observations, flags, and mood',
    contexts.middle.friendshipStage === 'friend' && contexts.middle.completedEventIds.length === 1 &&
      contexts.middle.relationshipIds.includes('theo') && contexts.middle.ownership.itemIds.includes('expShare') &&
      contexts.middle.ownership.receiptIds.includes('aide-exp-share') && contexts.middle.repeatInteractions.talks === 3 &&
      contexts.middle.pokemonObservations.caughtIds.includes(447) && contexts.middle.worldFlags.includes('rowan:invited') &&
      contexts.middle.dialogueFlags.some(flag => flag.endsWith('::offered-pencil')) && contexts.middle.mood === 'content');
  check('social context reads do not mutate save state', contexts.readOnly);

  const selection = await page.evaluate(() => {
    S = freshSave(); bindProgress('c'); ensureFriends();
    const f = friendship('rowan'); f.met = true; f.points = 320; f.talks = 4;
    S.worldFlags['mood:rowan:content'] = true;
    S.worldFlags['mood:rowan:distressed'] = true;
    const context = socialContext('rowan', { subject: 'c', location: 'bookshop' });
    const variants = [
      { id: 'z-general', priority: 4, when: { subject: 'c' } },
      { id: 'a-specific', priority: 4, when: { subject: 'c', location: 'bookshop', minStage: 'friend', repeatAtLeast: { talks: 2 } } },
      { id: 'higher', priority: 5, when: { mood: 'distressed' } },
      { id: 'fallback', priority: 999, fallback: true }
    ];
    const first = selectSocialContext(context, variants);
    const reversed = selectSocialContext(context, variants.slice().reverse());
    const specificity = selectSocialContext(context, variants.filter(v => v.id !== 'higher'));
    const fallback = selectSocialContext(context, [
      { id: 'ordinary-no', priority: 1, when: { subject: 'calc' } },
      { id: 'fallback-b', priority: 1, fallback: true },
      { id: 'fallback-a', priority: 1, fallback: true }
    ]);
    const unsupported = socialContextMatches(context, { inventedCondition: true });
    return { mood: context.mood, first: first.id, reversed: reversed.id, specificity: specificity.id,
      fallback: fallback.id, unsupported };
  });
  check('several true conditions resolve by explicit priority independently of array or object order',
    selection.mood === 'distressed' && selection.first === 'higher' && selection.reversed === 'higher', JSON.stringify(selection));
  check('equal-priority variants use specificity, while fallbacks use stable lexical IDs',
    selection.specificity === 'a-specific' && selection.fallback === 'fallback-a' && !selection.unsupported, JSON.stringify(selection));

  const legacy = await page.evaluate(() => {
    const old = freshSave();
    delete old.dialogueFlags;
    old.friends = { mart: { points: 210, met: true, meetings: 2, events: ['unknown-old-event'], history: [
      { kind: 'event', sceneId: 'unknown-old-event', choiceId: 'old-choice', change: -5, clock: 2 }
    ], talks: 2, outings: 0, battles: 0, wins: 0, lastTalk: 0, lastOuting: -5, lastBattle: -5, lastHeal: -5,
      rewardPacing: { anchor: 0, counts: {} }, storyBadgesBySubject: {} } };
    const loaded = normalizeSave(old); activateSave(loaded);
    const beforeKeys = Object.keys(S.friends).sort();
    const context = socialContext('mart', { subject: 'c', location: 'town' });
    const invalid = recordDialogueChoiceOutcome('Not stable!', 'answer');
    const validKey = recordDialogueChoiceOutcome('legacy-choice', 'kept-answer');
    const remembered = hasDialogueChoiceOutcome('legacy-choice', 'kept-answer');
    const normalized = normalizeSave(S);
    return { beforeKeys, afterKeys: Object.keys(S.friends).sort(), context, invalid, validKey, remembered,
      persisted: !!normalized.dialogueFlags[validKey] };
  });
  check('legacy and reclassified records remain queryable without creating new friendships',
    JSON.stringify(legacy.beforeKeys) === JSON.stringify(legacy.afterKeys) && legacy.context.friendshipStage === 'friend' &&
      legacy.context.recentEvents[0].sceneId === 'unknown-old-event' && legacy.context.mood === 'tense', JSON.stringify(legacy));
  check('stable choice outcomes validate IDs and survive save normalization',
    legacy.invalid === null && legacy.validKey === 'legacy-choice::kept-answer' && legacy.remembered && legacy.persisted);

  check('no page errors', errors.length === 0, errors.join(' | '));
  await browser.close();
  const passed = results.filter(result => result.ok).length;
  console.log(passed + '/' + results.length + ' checks passed');
  if (passed !== results.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
