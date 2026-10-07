/* Phase 7 Slice 4: item vignettes. Only curated notable items, never an
   interruption (no pop-ups on acquisition in rewards, shops, gifts, mail or
   imports), shown from the bag with a read-only button, seen/resolved stamped
   once, resumable after a reload, and refused during a battle. */
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
    const meet = id => { S.friends[id] = Object.assign(freshFriend(), { met: true, meetings: 1 }); };
    const modalHtml = () => (document.querySelector('#modal') || {}).innerHTML || '';
    const modalOpen = () => { const m = document.querySelector('#modal'); return !!m && m.classList.contains('on'); };
    const all = worldContentList('vignette');

    out.errors = validateVignettes().concat(validateWorldState());
    out.count = all.length;
    out.routine = all.filter(v => ['capture', 'medicine', 'battle-utility'].indexOf(itemById(v.item).category) >= 0 || itemById(v.item).rarity === 'common').map(v => v.id);
    const banned = /\b(study|studying|exam|exams|question|questions|quiz|chapter|lesson|homework|revise|revision|syntax|compile|compiler|pointer|pointers|code|coding|program|programming|calculus|integral|derivative|variable|function|array|loop)\b/i;
    out.vocabulary = all.filter(v => banned.test(v.title + ' ' + v.text)).map(v => v.id);
    out.coverage = Object.keys(ITEMS).length + ' items, ' + new Set(all.map(v => v.item)).size + ' with vignettes';
    out.refused = {
      potion: registerVignette({ id: 'test-potion', item: 'potion', title: 'A potion', text: 'x'.repeat(100) }).length > 0,
      ball: registerVignette({ id: 'test-ball', item: 'great', title: 'A ball', text: 'x'.repeat(100) }).length > 0,
      common: registerVignette({ id: 'test-umbrella', item: 'tinyUmbrella', title: 'Umbrella', text: 'x'.repeat(100) }).length > 0,
      person: registerVignette({ id: 'test-person', item: 'bentSpoon', with: 'nobody-at-all', title: 'Spoon', text: 'x'.repeat(100) }).length > 0,
      absent: ['test-potion', 'test-ball', 'test-umbrella', 'test-person'].every(id => !worldContent('vignette', id))
    };
    VIGNETTE_ERRORS = [];

    // Not held: no button. Acquisition itself never opens anything.
    fresh();
    showScreen('map'); closeModal();
    out.noItemNoButton = vignetteButtonHtml('bentSpoon') === '';
    giveItem('bentSpoon', 1);
    out.acquisitionQuiet = !modalOpen();
    const before = snap();
    const button = vignetteButtonHtml('bentSpoon');
    vignettesForItem('bentSpoon'); vignetteButtonHtml('expShare'); vignetteButtonHtml('potion');
    out.button = /A memory/.test(button);
    out.readOnly = snap() === before;

    // Routine items get no button even when held.
    out.potionNoButton = vignetteButtonHtml('potion') === '' && vignetteButtonHtml('great') === '';

    // The bag shows the button on the party screen.
    showScreen('party'); renderParty();
    out.bagButton = !!document.querySelector('.bag-item .vignette-button');

    // Refused mid-battle without a write.
    B = { over: false };
    const battleSnap = snap();
    out.battleRefused = openVignette('bent-spoon-drawer') === false && snap() === battleSnap;
    B = null;

    // Opening stamps seen; a reload before finishing offers to resume.
    out.opened = openVignette('bent-spoon-drawer') && worldHas('seen', 'vignette', 'bent-spoon-drawer') &&
      /It was like that when you found it/.test(modalHtml());
    closeModal();
    activateSave(normalizeSave(JSON.parse(snap())));
    out.resume = /Finish the memory/.test(vignetteButtonHtml('bentSpoon')) && !worldHas('resolved', 'vignette', 'bent-spoon-drawer');
    openVignette('bent-spoon-drawer');
    finishVignette('bent-spoon-drawer');
    const stamp = worldStamp('resolved', 'vignette', 'bent-spoon-drawer');
    S.activityClock += 30;
    finishVignette('bent-spoon-drawer');
    out.resolved = { stamp, again: worldStamp('resolved', 'vignette', 'bent-spoon-drawer'), label: vignetteButtonHtml('bentSpoon') };

    // Re-reading a finished memory writes nothing.
    const rereadSnap = snap();
    openVignette('bent-spoon-drawer'); closeModal();
    out.rereadNoWrite = snap() === rereadSnap;

    // Cross-system: the tea tin memory needs Mira's letter enclosure, not
    // just a tin from anywhere; with the letter, the enclosure path unlocks it.
    fresh();
    meet('mira'); S.friends.mira.points = 250;
    giveItem('teaTin', 1);
    out.shopTinSilent = vignetteButtonHtml('teaTin') === '';
    deliverMail(); openLetter('mira-tea'); takeEnclosure('mira-tea'); closeModal();
    out.letterTin = /A memory/.test(vignetteButtonHtml('teaTin')) && !modalOpen();

    // A character vignette needs its person met.
    fresh();
    giveItem('expShare', 1);
    out.needsMet = vignetteButtonHtml('expShare') === '';
    meet('aide');
    out.metShows = /A memory/.test(vignetteButtonHtml('expShare'));

    // Imported saves holding an item see the button but nothing is marked.
    fresh();
    const imported = JSON.parse(snap());
    imported.items.prismStone = 1;
    activateSave(normalizeSave(imported));
    out.imported = /A memory/.test(vignetteButtonHtml('prismStone')) && !worldHas('seen', 'vignette', 'prism-stone-light');

    // Wild-battle reward path: an item given during a battle reward is quiet.
    fresh();
    closeModal();
    B = { over: true };
    giveItem('prismStone', 1);
    out.rewardQuiet = !modalOpen();
    B = null;
    showScreen('map');
    return out;
  });

  check('vignette registry validates', r.errors.length === 0, r.errors.join('; '));
  check('a small curated set, never routine items', r.count >= 4 && r.count <= 12 && r.routine.length === 0, r.coverage);
  check('no course vocabulary in vignettes', r.vocabulary.length === 0, r.vocabulary.join(','));
  check('routine, common and unknown-person vignettes are refused', Object.values(r.refused).every(Boolean), JSON.stringify(r.refused));
  check('no button without the item; acquisition never interrupts', r.noItemNoButton && r.acquisitionQuiet);
  check('the bag button renders read-only', r.button && r.readOnly);
  check('routine items get no button', r.potionNoButton);
  check('the party-screen bag shows the button', r.bagButton);
  check('refused during a battle without a write', r.battleRefused);
  check('opening stamps seen and shows the memory', r.opened);
  check('a reload mid-memory offers to finish it', r.resume);
  check('finishing stamps resolved once', r.resolved.stamp >= 0 && r.resolved.again === r.resolved.stamp && /Remember/.test(r.resolved.label), JSON.stringify(r.resolved));
  check('re-reading a finished memory writes nothing', r.rereadNoWrite);
  check('the tea tin memory needs the letter, not any tin', r.shopTinSilent && r.letterTin);
  check('a character memory needs that person met', r.needsMet && r.metShows);
  check('an imported item shows the button without marking it', r.imported);
  check('items given during a battle reward are quiet', r.rewardQuiet);
  check('no page errors', errors.length === 0, errors.join(' | '));

  await browser.close();
  const failed = results.filter(x => !x.ok).length;
  console.log('\n' + (results.length - failed) + '/' + results.length + ' vignette checks passed');
  process.exit(failed ? 1 : 0);
})().catch(error => { console.error(error); process.exit(1); });
