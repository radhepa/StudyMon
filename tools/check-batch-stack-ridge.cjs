/* Phase 7 Slice 7, batch 2 ("Two paces up Stack Ridge"): the trigger table
   end to end, the reliable whistle hint true and retired by the real grant,
   rewards once, and the web edge deepening. The cross-content repetition and
   vocabulary review lives in check-batch-chart-exchange.cjs and covers this
   batch too. */
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
    const meet = (id, points) => { S.friends[id] = Object.assign(freshFriend(), { met: true, meetings: 1, points: points || 0 }); };
    const watch = id => { openWalkin(id); const w = worldContent('walkin', id); for (let i = 1; i < w.beats.length; i++) walkinBeat(id, i); finishWalkin(id); };
    const ids = ['thread:ridge-pace', 'walkin:ridge-switchback', 'walkin:ridge-summit', 'rumor:roan-whistle', 'rumor:burl-pack',
      'rumor:ridge-two-cups', 'mail:june-ridge-flower', 'mail:burl-spare-berries', 'vignette:june-pressed-flower'];
    out.registered = ids.filter(key => !WORLD_CONTENT[key]);
    out.errors = validateWorldState().concat(validateRumors(), validateMail(), validateVignettes(), validateWalkins(), validateRelationshipWeb());

    // Ridge closed below four badges: nothing.
    fresh();
    meet('burl');
    for (let n = 1; n <= 3; n++) S.badges[n] = true;
    out.closed = walkinAt('ridge') === null && !rumorsFor('kes').some(x => x.id === 'roan-whistle');

    // Ridge open: the whistle hint is first from ridge folk and true.
    S.badges[4] = true;
    const first = pickRumor('kes');
    out.whistleFirst = first && first.rumor.id;
    out.roanExcluded = !rumorsFor('roan').some(x => x.id === 'roan-whistle');
    const w0 = itemCount('carvedWhistle');
    talkTo('roan'); closeModal();
    out.whistle = { gained: itemCount('carvedWhistle') - w0, receipt: !!S.town.receipts['discovery:ridge-whistle'],
      retired: !rumorsFor('kes').some(x => x.id === 'roan-whistle') };

    // Biased rumor about the pack, until the summit.
    out.packBefore = rumorsFor('flint').some(x => x.id === 'burl-pack');

    // Thread: switchback, gap, summit.
    out.firstScene = walkinAt('ridge') && walkinAt('ridge').id;
    openTown('ridge');
    out.card = !!document.querySelector('.walkin-card[data-walkin="ridge-switchback"]');
    const friends = JSON.stringify(S.friends);
    watch('ridge-switchback');
    out.noFriendship = JSON.stringify(S.friends) === friends;
    out.waiting = walkinAt('ridge') === null;
    S.activityClock += 20;
    out.summitOffered = walkinAt('ridge') && walkinAt('ridge').id;
    meet('crag');
    const webBefore = relationshipWebKnown().edges.find(e => e.id === 'burl-crag');
    watch('ridge-summit');
    out.afterSummit = {
      stage: threadStage('ridge-pace'),
      pack: rumorsFor('flint').some(x => x.id === 'burl-pack'),
      cups: rumorsFor('kes').some(x => x.id === 'ridge-two-cups'),
      web: [webBefore && webBefore.learned, relationshipWebKnown().edges.find(e => e.id === 'burl-crag').learned],
      letter: mailEligible().some(m => m.id === 'burl-spare-berries')
    };

    // Burl's berries: once.
    deliverMail();
    const o0 = itemCount('oran');
    openLetter('burl-spare-berries'); takeEnclosure('burl-spare-berries'); takeEnclosure('burl-spare-berries'); closeModal();
    activateSave(normalizeSave(JSON.parse(JSON.stringify(S))));
    takeEnclosure('burl-spare-berries'); closeModal();
    out.berries = itemCount('oran') - o0;

    // June's flower: needs comfortable; the vignette needs the postcard's flower.
    meet('june', 30);
    out.juneNotYet = !mailEligible().some(m => m.id === 'june-ridge-flower');
    S.friends.june.points = 250;
    giveItem('pressedFlower', 1);
    out.flowerSilent = vignetteButtonHtml('pressedFlower') === '';
    deliverMail(); openLetter('june-ridge-flower'); takeEnclosure('june-ridge-flower'); closeModal();
    out.flowerMemory = /A memory/.test(vignetteButtonHtml('pressedFlower'));
    showScreen('map');
    return out;
  });

  check('every batch ID is registered', r.registered.length === 0, r.registered.join(','));
  check('all Phase 7 registries validate together', r.errors.length === 0, r.errors.join('; '));
  check('nothing on the ridge before it opens', r.closed);
  check('the whistle hint comes first from ridge folk, never from Roan', r.whistleFirst === 'roan-whistle' && r.roanExcluded, r.whistleFirst);
  check('the hint is true: talking to Roan grants the whistle and retires it', r.whistle.gained === 1 && r.whistle.receipt && r.whistle.retired, JSON.stringify(r.whistle));
  check('the biased pack rumor is told while the thread is open', r.packBefore);
  check('the switchback scene is offered and shown in the directory', r.firstScene === 'ridge-switchback' && r.card);
  check('watching changes no friendship', r.noFriendship);
  check('the summit waits for its gap', r.waiting && r.summitOffered === 'ridge-summit', r.summitOffered);
  const a = r.afterSummit;
  check('the summit completes the thread and changes the talk', a.stage === 'summit' && !a.pack && a.cups && a.letter, JSON.stringify(a));
  check('the web learns the hikers\' deeper line', a.web[0] === 'public' && a.web[1] === 'deep', JSON.stringify(a.web));
  check('Burl\'s berries arrive once, even across a reload', r.berries === 3, String(r.berries));
  check('June\'s postcard needs a comfortable friendship', r.juneNotYet);
  check('the flower memory needs June\'s flower, not any flower', r.flowerSilent && r.flowerMemory);
  check('no page errors', errors.length === 0, errors.join(' | '));

  await browser.close();
  const failed = results.filter(x => !x.ok).length;
  console.log('\n' + (results.length - failed) + '/' + results.length + ' stack-ridge batch checks passed');
  process.exit(failed ? 1 : 0);
})().catch(error => { console.error(error); process.exit(1); });
