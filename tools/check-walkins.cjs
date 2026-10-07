/* Phase 7 Slice 5: walk-ins and NPC-to-NPC threads. Scheduling is read-only
   with priority, one scene per place, mutual exclusion and deferral; watching
   is optional and changes no friendship; interruption resumes; thread stages
   are derived from resolved scenes and later talk reacts to them. */
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
    const fresh = () => { S = freshSave(); activateSave(S); S.settings.sound = false; S.party = [makeMon(6, 30)]; ensureBag();
      for (let n = 1; n <= 4; n++) S.badges[n] = true; };
    const snap = () => JSON.stringify(S);
    const meet = id => { S.friends[id] = Object.assign(freshFriend(), { met: true, meetings: 1 }); };
    const modalHtml = () => (document.querySelector('#modal') || {}).innerHTML || '';
    const offered = loc => { const w = walkinAt(loc); return w ? w.id : null; };
    const watch = id => { openWalkin(id); const w = worldContent('walkin', id); for (let i = 1; i < w.beats.length; i++) walkinBeat(id, i); finishWalkin(id); };
    const scenes = worldContentList('walkin');

    out.errors = validateWalkins().concat(validateRumors(), validateWorldState());
    out.counts = { threads: worldContentList('thread').length, walkins: scenes.length };
    const banned = /\b(study|studying|exam|exams|question|questions|quiz|chapter|lesson|homework|revise|revision|syntax|compile|compiler|pointer|pointers|code|coding|program|programming|calculus|integral|derivative|variable|function|array|loop)\b/i;
    out.vocabulary = scenes.filter(w => banned.test(w.title + ' ' + w.beats.map(b => b.text).join(' '))).map(w => w.id);

    out.refused = {
      town: registerWalkin({ id: 'test-town', location: 'town', people: ['oz'], title: 'Town scene', beats: [{ text: 'x'.repeat(30) }, { text: 'y'.repeat(30) }] }).length > 0,
      thread: registerWalkin({ id: 'test-thread', location: 'pier', people: ['oz', 'sal'], thread: 'nope', stage: 'x', title: 'Scene', beats: [{ text: 'x'.repeat(30) }, { text: 'y'.repeat(30) }] }).length > 0,
      dupStage: registerWalkin({ id: 'test-dup', location: 'pier', people: ['oz', 'sal'], thread: 'pier-post', stage: 'wager', title: 'Scene', beats: [{ text: 'x'.repeat(30) }, { text: 'y'.repeat(30) }] }).length > 0,
      speaker: registerWalkin({ id: 'test-speaker', location: 'pier', people: ['oz'], title: 'Scene', beats: [{ who: 'sal', text: 'x'.repeat(30) }, { text: 'y'.repeat(30) }] }).length > 0,
      missingPerson: registerWalkin({ id: 'test-missing', location: 'pier', people: ['oz'], thread: 'pier-post', stage: 'squall', title: 'Scene', beats: [{ text: 'x'.repeat(30) }, { text: 'y'.repeat(30) }] }).length > 0,
      oneBeat: registerWalkin({ id: 'test-one', location: 'pier', people: ['oz'], title: 'Scene', beats: [{ text: 'x'.repeat(30) }] }).length > 0,
      badStage: !validateWorldFactId('thread-at:pier-post:nope') && !validateWorldFactId('thread-at:nope:wager'),
      absent: ['test-town', 'test-thread', 'test-dup', 'test-speaker', 'test-missing', 'test-one'].every(id => !worldContent('walkin', id))
    };
    WALKIN_ERRORS = [];

    // Nobody walks in on a stranger.
    fresh();
    out.strangers = offered('pier') === null && offered('cafe') === null;
    meet('oz');
    out.firstStage = offered('pier');
    const before = snap();
    for (let i = 0; i < 3; i++) { walkinOffers(); walkinCardHtml('pier'); walkinCardHtml('cafe'); threadStage('pier-post'); worldFact('thread-at:pier-post:wager'); }
    out.readOnly = snap() === before;

    // The directory shows the card.
    openTown('pier');
    out.card = !!document.querySelector('.walkin-card[data-walkin="pier-wager"]');

    // Watching changes no friendship and stamps the stage.
    const friends = JSON.stringify(S.friends);
    watch('pier-wager');
    out.noFriendship = JSON.stringify(S.friends) === friends;
    out.stage1 = { stage: threadStage('pier-post'), fact: worldFact('thread-at:pier-post:wager'), later: worldFact('thread-at:pier-post:squall') };

    // Deferral: the next stage waits for its gap.
    out.deferred = offered('pier');
    S.activityClock += 20;
    out.afterGap = offered('pier');

    // Thread-aware rumor appears.
    out.betRumor = rumorsFor('skiff').some(x => x.id === 'pier-bet');

    // Interruption and resume across a reload.
    openWalkin('pier-squall'); walkinBeat('pier-squall', 1); closeModal();
    activateSave(normalizeSave(JSON.parse(snap())));
    out.resume = { offered: offered('pier'), label: /Keep watching/.test(walkinCardHtml('pier')),
      unresolved: !worldHas('resolved', 'walkin', 'pier-squall') && worldHas('seen', 'walkin', 'pier-squall') };
    openWalkin('pier-squall');
    out.restartsAtOne = /1\/4/.test(modalHtml());
    walkinBeat('pier-squall', 3); finishWalkin('pier-squall');
    const stamp = worldStamp('resolved', 'walkin', 'pier-squall');
    S.activityClock += 5;
    finishWalkin('pier-squall');
    out.resolvedOnce = worldStamp('resolved', 'walkin', 'pier-squall') === stamp;

    // Finishing the thread retires the biased bet rumor and adds the draw.
    S.activityClock += 20;
    watch('pier-shared-post');
    out.threadDone = { stage: threadStage('pier-post'), offered: offered('pier'), bet: rumorsFor('skiff').some(x => x.id === 'pier-bet'),
      draw: rumorsFor('skiff').some(x => x.id === 'pier-draw') };

    // Second thread: the café's biased rumor retires when it settles.
    fresh();
    meet('dax');
    out.daxBefore = rumorsFor('nel').some(x => x.id === 'dax-window');
    watch('cafe-reserved-sign');
    S.activityClock += 15;
    watch('cafe-window-settled');
    out.daxAfter = { biased: rumorsFor('nel').some(x => x.id === 'dax-window'), guests: rumorsFor('nel').some(x => x.id === 'window-guests') };

    // Refused mid-battle without a write.
    fresh(); meet('oz');
    B = { over: false };
    const battleSnap = snap();
    out.battle = openWalkin('pier-wager') === false && snap() === battleSnap;
    B = null;

    // Scheduling: one scene per place, and nobody in two scenes at once.
    out.testReg = [
      registerWalkin({ id: 'test-coral-dive', location: 'pier', people: ['coral'], priority: 5, title: 'Coral dives', beats: [{ text: 'Coral goes off the end of the pier in one clean line.' }, { text: 'Nobody claps. Coral surfaces looking pleased anyway.' }] }),
      registerWalkin({ id: 'test-oz-cafe', location: 'cafe', people: ['oz', 'nel'], priority: -1, title: 'Oz at the café', beats: [{ text: 'Oz is telling the boot story again, with new details.' }, { text: 'Nel pretends it is the first time hearing it.' }] })
    ].every(e => e.length === 0);
    fresh(); meet('oz'); meet('coral');
    out.onePerPlace = offered('pier');                 // Coral's priority wins the pier; the wager waits
    out.exclusion = offered('cafe');                   // Oz is free, so he can be at the café
    meet('nel');
    watch('test-coral-dive');
    out.afterCoral = { pier: offered('pier'), cafe: offered('cafe') };  // Oz is back at the pier, so not at the café
    out.cleanup = true;
    showScreen('map');
    return out;
  });

  check('thread and walk-in registries validate', r.errors.length === 0, r.errors.join('; '));
  check('seed: threads with scenes for every stage', r.counts.threads >= 2 && r.counts.walkins >= 5, JSON.stringify(r.counts));
  check('no course vocabulary in scenes', r.vocabulary.length === 0, r.vocabulary.join(','));
  check('unsafe scenes and unknown stages are refused', Object.values(r.refused).every(Boolean), JSON.stringify(r.refused));
  check('nobody walks in on a stranger', r.strangers && r.firstStage === 'pier-wager', r.firstStage);
  check('scheduling and cards are read-only', r.readOnly);
  check('the directory shows the walk-in card', r.card);
  check('watching changes no friendship', r.noFriendship);
  check('a watched scene moves its thread to that stage', r.stage1.stage === 'wager' && r.stage1.fact && !r.stage1.later, JSON.stringify(r.stage1));
  check('the next stage is deferred until its gap passes', r.deferred === null && r.afterGap === 'pier-squall', JSON.stringify([r.deferred, r.afterGap]));
  check('rumors react to the thread stage', r.betRumor);
  check('an interrupted scene is offered again first after a reload', r.resume.offered === 'pier-squall' && r.resume.label && r.resume.unresolved, JSON.stringify(r.resume));
  check('a resumed scene restarts at its first beat', r.restartsAtOne);
  check('a scene resolves once', r.resolvedOnce);
  check('finishing a thread retires the biased rumor and adds the new one',
    r.threadDone.stage === 'shared-post' && r.threadDone.offered === null && !r.threadDone.bet && r.threadDone.draw, JSON.stringify(r.threadDone));
  check('the café thread retires its biased rumor too', r.daxBefore && !r.daxAfter.biased && r.daxAfter.guests, JSON.stringify(r.daxAfter));
  check('refused during a battle without a write', r.battle);
  check('one scene per place by priority', r.testReg && r.onePerPlace === 'test-coral-dive', r.onePerPlace);
  check('a person is in at most one offered scene', r.exclusion === 'test-oz-cafe' && r.afterCoral.pier === 'pier-wager' && r.afterCoral.cafe !== 'test-oz-cafe',
    JSON.stringify([r.exclusion, r.afterCoral]));
  check('no page errors', errors.length === 0, errors.join(' | '));

  await browser.close();
  const failed = results.filter(x => !x.ok).length;
  console.log('\n' + (results.length - failed) + '/' + results.length + ' walk-in checks passed');
  process.exit(failed ? 1 : 0);
})().catch(error => { console.error(error); process.exit(1); });
