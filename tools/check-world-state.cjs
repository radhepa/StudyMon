/* Phase 7 Slice 1: the world-state and discovery contract. Facts resolve from
   the branches that already own them, evaluation never writes, marks and
   attachment claims happen once, and old, junk, reloaded or imported saves
   cannot duplicate a reward or lose discovery history. */
const { chromium } = require('./playwright.cjs');

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok });
  console.log((ok ? 'PASS  ' : 'FAIL  ') + name + (detail ? '  [' + detail + ']' : ''));
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const page = await (await browser.newContext()).newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:8780/');

  const r = await page.evaluate(() => {
    const out = {};
    const fresh = () => { S = freshSave(); activateSave(S); S.settings.sound = false; S.party = [makeMon(6, 30)]; ensureBag(); };
    const snap = () => JSON.stringify(S);
    const reload = () => { activateSave(normalizeSave(JSON.parse(JSON.stringify(S)))); };

    out.validation = validateWorldState();
    out.families = worldFactFamilies().length;
    out.everyFamilyDocumented = worldFactFamilies().every(f => f.source && f.example);

    // Fresh saves carry the four compact buckets.
    fresh();
    out.freshShape = JSON.stringify(S.world);

    // Test content. Registration validates identity and every fact it names.
    const tier1 = castEntries({ tier: 1 }).map(e => e.id);
    const person = tier1.find(id => typeof friendEventRules === 'function' && friendEventRules(id).length) || tier1[0];
    const eventId = friendEventRules(person)[0].eventId;
    out.person = person;
    out.reg = {
      ok: registerWorldContent('rumor', { id: 'test-pier', when: { all: ['badge:c:1'] }, priority: 1 }),
      ok2: registerWorldContent('rumor', { id: 'test-quiet', when: { all: ['met:' + person] }, priority: 5 }),
      mail: registerWorldContent('mail', { id: 'test-letter', when: { any: ['badge:c:2', 'visited:calc'] } }),
      mail2: registerWorldContent('mail', { id: 'test-parcel' }),
      dup: registerWorldContent('rumor', { id: 'test-pier' }),
      badId: registerWorldContent('rumor', { id: 'Test Pier' }),
      badKind: registerWorldContent('gossip', { id: 'test-x' }),
      unknownFact: registerWorldContent('rumor', { id: 'test-ghost', when: { all: ['met:nobody-at-all'] } }),
      unknownFamily: registerWorldContent('rumor', { id: 'test-ghost2', when: { all: ['weather:rain'] } }),
      unknownKey: registerWorldContent('rumor', { id: 'test-ghost3', when: { sometimes: true } })
    };
    out.rejectedNotRegistered = !worldContent('rumor', 'test-ghost') && !worldContent('rumor', 'test-ghost2') &&
      !worldContent('rumor', 'test-ghost3') && !worldContent('rumor', 'Test Pier');
    out.registeredFrozen = Object.isFrozen(worldContent('rumor', 'test-pier'));

    // Facts resolve from their owning branches.
    fresh();
    const before = {
      badge: worldFact('badge:c:1'), met: worldFact('met:' + person), quest: worldFact('quest-complete:c-lab-25'),
      leader: worldFact('leader-beaten:c-gym-1'), caught: worldFact('caught:25')
    };
    S.badges[1] = true;
    if (!S.progress.calc || typeof S.progress.calc !== 'object') S.progress.calc = {};
    S.progress.calc.badges = { 2: true };
    S.visited.calc = true;
    S.friends[person] = Object.assign(S.friends[person] || {}, { met: true, points: 1000, events: [eventId] });
    S.sideQuests.records['c-lab-25'] = { status: 'completed' };
    S.questFraming.records['c-lab-25'] = { outcome: 'guided' };
    S.town.receipts['kern-exp-share'] = true;
    S.items.potion = 2;
    S.caught[25] = true; S.seen[25] = true;
    S.worldFlags['event:sample:scene'] = true;
    const after = {
      badge: worldFact('badge:c:1'), calcBadge: worldFact('badge:calc:2'), calcBadge3: worldFact('badge:calc:3'),
      visited: worldFact('visited:calc'), leader: worldFact('leader-beaten:c-gym-1'), met: worldFact('met:' + person),
      stage: worldFact('stage:' + person + ':close'), heart: worldFact('heart-event:' + person + ':' + eventId),
      quest: worldFact('quest-complete:c-lab-25'), outcome: worldFact('quest-outcome:c-lab-25:guided'),
      outcomeOther: worldFact('quest-outcome:c-lab-25:independent'), receipt: worldFact('receipt:kern-exp-share'),
      item: worldFact('item:potion'), caught: worldFact('caught:25'), seen: worldFact('seen:25'),
      flag: worldFact('flag:event:sample:scene')
    };
    out.factsBefore = before;
    out.factsAfter = after;

    // Unknown or malformed IDs are false and never throw.
    out.unknownFacts = ['met:nobody-at-all', 'weather:rain', 'badge', 'badge:', 'badge:zz:1', 'caught:0', 'caught:abc',
      'heart-event:' + person + ':no-such-event', 'quest-complete:c-lab-999', 'content-seen:rumor:not-registered', 42, null]
      .map(id => worldFact(id));

    // Evaluation, eligibility and every family read never write the save.
    const frozen = snap();
    for (let i = 0; i < 3; i++) {
      Object.keys(WORLD_FACT_FAMILIES).forEach(name => worldFact(name + ':' + (WORLD_FACT_FAMILIES[name].example.split(':').slice(1).join(':'))));
      worldConditionMet({ all: ['badge:c:1'], any: ['visited:calc'], none: ['caught:1'], minActivity: 0, subject: 'c' });
      worldEligible('rumor'); worldEligible('mail', { unseen: true, unresolved: true });
      worldHas('seen', 'rumor', 'test-pier'); worldStamp('known', 'rumor', 'test-pier');
      validateWorldState();
    }
    out.readOnly = snap() === frozen;

    // Conditions.
    out.cond = {
      all: worldConditionMet({ all: ['badge:c:1', 'met:' + person] }),
      allFail: worldConditionMet({ all: ['badge:c:1', 'badge:c:9'] }),
      any: worldConditionMet({ any: ['badge:c:9', 'visited:calc'] }),
      anyFail: worldConditionMet({ any: ['badge:c:9'] }),
      none: worldConditionMet({ none: ['badge:c:1'] }),
      minActivity: worldConditionMet({ minActivity: 5 }),
      subject: worldConditionMet({ subject: 'c' }) && !worldConditionMet({ subject: 'calc' }) && worldConditionMet({ subject: ['calc', 'c'] }),
      unknownKey: worldConditionMet({ sometimes: true }),
      empty: worldConditionMet({}) && worldConditionMet()
    };

    // Eligibility is deterministic: priority, then key.
    out.eligible = worldEligible('rumor').map(x => x.id).filter(id => id.startsWith('test-')).join(',');

    // Marks: first stamp wins, marks imply known, unknown content cannot be marked.
    S.activityClock = 17;
    const markSnap = snap();
    out.markUnknown = worldMark('seen', 'rumor', 'not-registered') || worldMark('seen', 'gossip', 'test-pier') ||
      worldMark('opened', 'rumor', 'test-pier');
    out.markUnknownNoWrite = snap() === markSnap;
    out.markFirst = worldMark('seen', 'rumor', 'test-pier');
    S.activityClock = 40;
    out.markSecond = worldMark('seen', 'rumor', 'test-pier');
    out.markStamp = { seen: worldStamp('seen', 'rumor', 'test-pier'), known: worldStamp('known', 'rumor', 'test-pier') };
    out.contentFact = worldFact('content-seen:rumor:test-pier') && worldFact('known:rumor:test-pier') && !worldFact('resolved:rumor:test-pier');
    out.eligibleUnseen = worldEligible('rumor', { unseen: true }).map(x => x.id).filter(id => id.startsWith('test-')).join(',');

    // Attachments are atomic and one-time.
    const potions = () => S.items.potion || 0;
    const bad = claimWorldReward('mail', 'test-letter', [{ item: 'potion', count: 1 }, { item: 'no-such-item', count: 1 }]);
    out.badBundle = { granted: bad, potions: potions(), receipt: !!S.town.receipts['world:mail:test-letter'],
      rewarded: worldHas('rewarded', 'mail', 'test-letter') };
    const tooMany = claimWorldReward('mail', 'test-letter', [{ item: 'potion', count: 1 }, { item: 'potion', count: 100000 }]);
    out.overStack = { granted: tooMany, potions: potions() };
    out.unregisteredClaim = claimWorldReward('mail', 'not-registered', [{ item: 'potion', count: 1 }]);
    const p0 = potions();
    const first = claimWorldReward('mail', 'test-letter', [{ item: 'potion', count: 2 }]);
    const second = claimWorldReward('mail', 'test-letter', [{ item: 'potion', count: 2 }]);
    out.claim = { first: !!first, second, gained: potions() - p0, receipt: !!S.town.receipts['world:mail:test-letter'],
      rewarded: worldHas('rewarded', 'mail', 'test-letter'), known: worldHas('known', 'mail', 'test-letter'),
      socialReceipt: socialContext(person).ownership.receiptIds.indexOf('world:mail:test-letter') >= 0 };

    // Reload and double activation cannot repeat it.
    const p1 = potions();
    reload(); reload();
    out.afterReload = { again: claimWorldReward('mail', 'test-letter', [{ item: 'potion', count: 2 }]), gained: potions() - p1,
      seenKept: worldStamp('seen', 'rumor', 'test-pier') };

    // An import that lost the rewarded stamp keeps the receipt: repaired, no grant.
    let imported = JSON.parse(JSON.stringify(S));
    delete imported.world.rewarded['mail:test-letter'];
    activateSave(normalizeSave(imported));
    out.importNoStamp = { repaired: worldHas('rewarded', 'mail', 'test-letter'),
      again: claimWorldReward('mail', 'test-letter', [{ item: 'potion', count: 2 }]), gained: potions() - p1 };

    // An import that lost the receipt keeps the stamp: receipt restored, no grant.
    imported = JSON.parse(JSON.stringify(S));
    delete imported.town.receipts['world:mail:test-letter'];
    activateSave(normalizeSave(imported));
    out.importNoReceipt = { receipt: !!S.town.receipts['world:mail:test-letter'],
      again: claimWorldReward('mail', 'test-letter', [{ item: 'potion', count: 2 }]), gained: potions() - p1 };

    // Installed-save round trip through localStorage.
    saveGame();
    out.loadGame = loadGame();
    out.afterLoad = { again: claimWorldReward('mail', 'test-letter', [{ item: 'potion', count: 2 }]), gained: potions() - p1,
      seen: worldStamp('seen', 'rumor', 'test-pier') };

    // Normalisation is idempotent.
    const once = JSON.stringify(normalizeSave(JSON.parse(JSON.stringify(S))));
    const twice = JSON.stringify(normalizeSave(JSON.parse(once)));
    out.idempotent = once === twice;
    const a1 = snap(); activateSave(S); activateSave(S);
    out.activateIdempotent = snap() === a1;

    // Old saves (no world branch) and junk.
    fresh();
    const old = JSON.parse(JSON.stringify(S));
    delete old.world;
    activateSave(normalizeSave(old));
    out.oldSave = JSON.stringify(S.world);

    const junk = JSON.parse(JSON.stringify(S));
    junk.world = 'junk';
    activateSave(normalizeSave(junk));
    out.junkString = JSON.stringify(S.world);

    const messy = JSON.parse(JSON.stringify(S));
    messy.world = {
      version: 0, extra: { keep: true },
      known: [],
      seen: { 'rumor:from-newer-build': 12, 'Bad Key': 1, 'rumor:': 3, 'x': 4, 'rumor:neg': -9, 'rumor:nan': 'soon', 'rumor:bool': true },
      resolved: null,
      rewarded: { 'mail:old-gift': 8 }
    };
    activateSave(normalizeSave(messy));
    out.messy = {
      version: S.world.version, extra: !!(S.world.extra && S.world.extra.keep),
      seen: S.world.seen, known: S.world.known, resolved: S.world.resolved,
      oldGiftReceipt: !!S.town.receipts['world:mail:old-gift']
    };
    // Well-formed unknown content is kept but can never be marked or claimed here.
    out.unknownKept = { mark: worldMark('resolved', 'rumor', 'from-newer-build'),
      claim: claimWorldReward('mail', 'old-gift', [{ item: 'potion', count: 1 }]), resolved: Object.keys(S.world.resolved).length };

    return out;
  });

  check('registry validates', r.validation.length === 0, r.validation.join('; '));
  check('fact families are documented with their owning save branch', r.everyFamilyDocumented && r.families >= 18, r.families + ' families');
  check('fresh save has the four compact buckets', r.freshShape === '{"version":1,"known":{},"seen":{},"resolved":{},"rewarded":{}}', r.freshShape);
  check('valid content registers', !r.reg.ok.length && !r.reg.ok2.length && !r.reg.mail.length && !r.reg.mail2.length,
    JSON.stringify([r.reg.ok, r.reg.ok2, r.reg.mail, r.reg.mail2]));
  check('duplicate, malformed and unknown-kind IDs are refused', r.reg.dup.length > 0 && r.reg.badId.length > 0 && r.reg.badKind.length > 0);
  check('conditions naming unknown facts or keys are refused at registration',
    r.reg.unknownFact.length > 0 && r.reg.unknownFamily.length > 0 && r.reg.unknownKey.length > 0 && r.rejectedNotRegistered,
    JSON.stringify([r.reg.unknownFact, r.reg.unknownFamily, r.reg.unknownKey]));
  check('registered records are frozen', r.registeredFrozen);
  check('facts start false on a fresh save', Object.values(r.factsBefore).every(v => v === false), JSON.stringify(r.factsBefore));
  const fa = r.factsAfter;
  check('facts resolve from their owning branches',
    fa.badge && fa.calcBadge && !fa.calcBadge3 && fa.visited && fa.leader && fa.met && fa.stage && fa.heart && fa.quest &&
    fa.outcome && !fa.outcomeOther && fa.receipt && fa.item && fa.caught && fa.seen && fa.flag, JSON.stringify(fa));
  check('unknown or malformed fact IDs are false', r.unknownFacts.every(v => v === false), JSON.stringify(r.unknownFacts));
  check('evaluation and eligibility never write the save (3 passes)', r.readOnly);
  const c = r.cond;
  check('conditions: all / any / none / minActivity / subject', c.all && !c.allFail && c.any && !c.anyFail && !c.none && !c.minActivity && c.subject && c.empty,
    JSON.stringify(c));
  check('unknown condition keys fail closed', c.unknownKey === false);
  check('eligibility is ordered by priority then key', r.eligible === 'test-quiet,test-pier', r.eligible);
  check('unknown content, kinds and buckets cannot be marked', r.markUnknown === false && r.markUnknownNoWrite);
  check('first mark wins and later marks report false', r.markFirst === true && r.markSecond === false &&
    r.markStamp.seen === 17 && r.markStamp.known === 17, JSON.stringify(r.markStamp));
  check('Phase 7 buckets are readable as facts', r.contentFact);
  check('unseen filter hides seen content', r.eligibleUnseen === 'test-quiet', r.eligibleUnseen);
  check('an invalid bundle grants nothing and leaves no receipt', r.badBundle.granted === null && r.badBundle.potions === 2 &&
    !r.badBundle.receipt && !r.badBundle.rewarded, JSON.stringify(r.badBundle));
  check('an over-stack bundle is all-or-nothing', r.overStack.granted === null && r.overStack.potions === 2, JSON.stringify(r.overStack));
  check('unregistered content cannot be claimed', r.unregisteredClaim === null);
  check('an attachment is granted exactly once', r.claim.first && r.claim.second === null && r.claim.gained === 2 &&
    r.claim.receipt && r.claim.rewarded && r.claim.known, JSON.stringify(r.claim));
  check('attachment receipts are visible to social context', r.claim.socialReceipt);
  check('reload and double activation cannot repeat a claim', r.afterReload.again === null && r.afterReload.gained === 0 &&
    r.afterReload.seenKept === 17, JSON.stringify(r.afterReload));
  check('import missing the rewarded stamp is repaired without a grant', r.importNoStamp.repaired && r.importNoStamp.again === null &&
    r.importNoStamp.gained === 0, JSON.stringify(r.importNoStamp));
  check('import missing the receipt is repaired without a grant', r.importNoReceipt.receipt && r.importNoReceipt.again === null &&
    r.importNoReceipt.gained === 0, JSON.stringify(r.importNoReceipt));
  check('installed save round trip keeps stamps and receipts', r.loadGame === true && r.afterLoad.again === null &&
    r.afterLoad.gained === 0 && r.afterLoad.seen === 17, JSON.stringify(r.afterLoad));
  check('normalisation and activation are idempotent', r.idempotent && r.activateIdempotent);
  check('old saves gain an empty world branch', r.oldSave === '{"version":1,"known":{},"seen":{},"resolved":{},"rewarded":{}}', r.oldSave);
  check('a junk world branch is replaced', r.junkString === '{"version":1,"known":{},"seen":{},"resolved":{},"rewarded":{}}', r.junkString);
  const m = r.messy;
  check('malformed keys are dropped and bad stamps clamp to 0',
    JSON.stringify(m.seen) === JSON.stringify({ 'rumor:from-newer-build': 12, 'rumor:neg': 0, 'rumor:nan': 0, 'rumor:bool': 1 }),
    JSON.stringify(m.seen));
  check('seen/rewarded imply known; unknown fields survive', m.version === 1 && m.extra && m.known['rumor:from-newer-build'] === 12 &&
    m.known['mail:old-gift'] === 8 && JSON.stringify(m.resolved) === '{}' && m.oldGiftReceipt, JSON.stringify(m));
  check('unknown content is kept but never marked or claimed', r.unknownKept.mark === false && r.unknownKept.claim === null &&
    r.unknownKept.resolved === 0, JSON.stringify(r.unknownKept));
  check('no page errors', errors.length === 0, errors.join(' | '));

  await browser.close();
  const failed = results.filter(x => !x.ok).length;
  console.log('\n' + (results.length - failed) + '/' + results.length + ' world-state checks passed');
  process.exit(failed ? 1 : 0);
})().catch(error => { console.error(error); process.exit(1); });
