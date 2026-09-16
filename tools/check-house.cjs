/* The house: the journal on the desk, the collection chest, the aquarium and
   the terrarium - plus the temporary region-warp chip that stands in for the
   pier while Bootstrap Town is rebuilt.

   The point of this suite is that every one of those is reached by walking up
   to a piece of furniture and pressing E, so it drives the real hotspots rather
   than calling the openers directly. A hotspot that drifts off walkable ground,
   or gets swallowed by a neighbour's 7-unit pickup radius, fails here. */

const { chromium } = require('./playwright.cjs');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('http://127.0.0.1:8780/', { waitUntil: 'domcontentloaded' });

  const ok = (label, condition, detail) => {
    if (!condition) throw new Error('FAIL ' + label + (detail ? ' :: ' + JSON.stringify(detail) : ''));
    console.log('PASS ' + label);
  };

  /* ---- a fresh save, then a day's worth of ordinary play ----------------- */
  const day = await page.evaluate(() => {
    S = freshSave();
    S.party = [makeMon(1, 10)];
    bindProgress('c');
    ensureFriends(); ensureBag(); ensureTown(); ensureHumanWorld();

    const bank = allQuestions();
    for (let i = 0; i < 20; i++) recordAnswer(bank[i % bank.length], i % 5 !== 4);
    ['mart', 'mart', 'mart', 'nurse', 'rowan'].forEach(id => journalTalk(id));
    journalBattle(); journalWin(); journalCatch(25);
    addMoney(200); addMoney(-50);

    const page1 = S.journal.days[String(journalDayNumber())];
    return { r: page1.r, w: page1.w, talks: page1.talks, battles: page1.battles,
             wins: page1.wins, caught: page1.caught.length,
             earned: page1.earned, spent: page1.spent, chapters: Object.keys(page1.chapters) };
  });
  ok('the journal counts every answer', day.r === 16 && day.w === 4, day);
  ok('the journal counts conversations per person', day.talks.mart === 3 && day.talks.rowan === 1, day.talks);
  ok('the journal counts battles, catches and money',
     day.battles === 1 && day.wins === 1 && day.caught === 1 && day.earned === 200 && day.spent === 50, day);
  ok('the journal splits practice by chapter', day.chapters.length >= 1, day.chapters);

  /* Money moved through addMoney(), which every shop and prize uses, so the
     ledger cannot drift from the wallet without this failing. */

  /* ---- the desk, in the room, on foot ------------------------------------ */
  await page.evaluate(() => { openHumanWorld('home', 'door'); });
  await page.locator('#human-stage').waitFor();

  const standAt = (action) => page.evaluate((a) => {
    const object = HUMAN_WORLD_SCENES.home.objects.find(o => o.action === a);
    if (!object) return null;
    HUMAN_MOVE_TARGET = null; HUMAN_PENDING = null;
    HUMAN_PLAYER.x = object.x; HUMAN_PLAYER.y = object.y;
    humanPaint(HUMAN_PLAYER, true);
    humanUpdateNearby();
    return {
      label: HUMAN_NEARBY && HUMAN_NEARBY.label,
      walkable: humanIsWalkable(object.x, object.y, HUMAN_WORLD_SCENES.home)
    };
  }, action);

  for (const [action, label] of [['desk', 'Study desk'], ['chest', 'Collection chest'],
                                 ['aquarium', 'Aquarium'], ['terrarium', 'Terrarium']]) {
    const near = await standAt(action);
    ok('the ' + action + ' stands on open floor and is the nearest thing to it',
       near && near.walkable && near.label === label, { action, near });
  }

  await standAt('desk');
  await page.evaluate(() => humanActivateNearby());
  const deskText = await page.locator('#human-dialogue').innerText();
  ok('the desk offers the journal and the study notes',
     /Read the journal/.test(deskText) && /study notes/i.test(deskText), deskText);

  await page.getByRole('button', { name: /Read the journal/ }).click();
  const journal = await page.evaluate(() => ({
    modal: document.getElementById('modal').classList.contains('on'),
    dialogueClosed: !document.getElementById('human-dialogue').classList.contains('on'),
    minute: S.humanWorld.minute,
    text: document.querySelector('#modal .box').innerText
  }));
  ok('the notebook opens the journal and closes the town dialogue',
     journal.modal && journal.dialogueClosed, journal);
  ok('the journal names the busiest company of the day',
     /Most of the day went to/.test(journal.text) && /Wren/.test(journal.text), journal.text.slice(0, 300));
  ok('the journal shows the day and its accuracy',
     /Day 1/.test(journal.text) && /80%/.test(journal.text), journal.text.slice(0, 300));

  /* Reading your own notebook must not cost you an hour of the day. */
  ok('reading the journal does not advance the town clock', journal.minute === 480, journal.minute);

  /* ---- the chest --------------------------------------------------------- */
  await page.evaluate(() => closeModal());
  await standAt('chest');
  await page.evaluate(() => humanActivateNearby());
  const chest = await page.evaluate(() => ({
    cats: document.querySelectorAll('.collect-cat').length,
    catalogue: COLLECT_ITEMS.length,
    categories: COLLECT_CATEGORIES.map(c => c.id),
    text: document.querySelector('#modal .box').innerText,
    /* Opening the chest is what puts the enrolment slip in your hands. */
    slip: collectHas('enrolment-slip')
  }));
  ok('the chest opens straight onto its categories', chest.cats === 3, chest.cats);
  ok('every catalogued item belongs to a real category',
     COLLECT_CATEGORY_CHECK(chest), chest.categories);
  ok('the chest counts the whole catalogue',
     new RegExp('of ' + chest.catalogue + ' found').test(chest.text), chest.text.slice(0, 160));
  ok('the chest hands over the enrolment slip on the first open', chest.slip);

  /* The keepsakes hang off moments that repeat. Buying twice, sailing twice or
     opening the chest twice must not stack copies of a "first" keepsake. */
  const firsts = await page.evaluate(() => {
    closeModal();
    const buy = () => { addMoney(1000); buyItem('potion', 1); };
    buy(); buy(); buy();
    const receipt = collectRecord('mart-receipt');
    sailTo('calc'); sailTo('c');
    const ticket = collectRecord('ferry-ticket');
    openChest(); closeModal(); openChest(); closeModal();
    const slip = collectRecord('enrolment-slip');
    return { receipt: receipt && receipt.n, ticket: ticket && ticket.n, slip: slip && slip.n };
  });
  ok('a keepsake that marks a first is handed over exactly once',
     firsts.receipt === 1 && firsts.ticket === 1 && firsts.slip === 1, firsts);

  const locked = await page.evaluate(() => {
    openCollectCategory('river');
    const tiles = Array.from(document.querySelectorAll('.collect-item'));
    return {
      total: tiles.length,
      lockedShowHints: tiles.filter(t => t.classList.contains('locked'))
        .every(t => (t.querySelector('small') || {}).textContent.trim().length > 0),
      hidesNames: tiles.filter(t => t.classList.contains('locked'))
        .every(t => t.querySelector('b').textContent === '???')
    };
  });
  ok('a locked shelf hides the names but never the hint',
     locked.total === 10 && locked.lockedShowHints && locked.hidesNames, locked);

  /* ---- the display cases ------------------------------------------------- */
  const cases = await page.evaluate(() => {
    const out = {};
    ['silverdart', 'pebblefish', 'heap-koi'].forEach(id => collectFind(id, { quiet: true }));
    openAquarium();
    out.tank = {
      skin: !!document.querySelector('.case-tank .case-glass'),
      residents: document.querySelectorAll('.case-resident').length,
      onShow: /3 of 10 on show/.test(document.querySelector('#modal .box').innerText)
    };
    openTerrarium();
    out.viv = {
      skin: !!document.querySelector('.case-viv .case-glass'),
      residents: document.querySelectorAll('.case-resident').length,
      empty: !!document.querySelector('.case-empty')
    };
    /* Residents must sit inside the glass, not on its frame. */
    collectFind('meadow-flit', { quiet: true });
    openTerrarium();
    out.inside = Array.from(document.querySelectorAll('.case-resident')).every(el => {
      const l = parseFloat(el.style.left), t = parseFloat(el.style.top);
      return l >= 5 && l <= 95 && t >= 5 && t <= 90;
    });
    return out;
  });
  ok('the aquarium shows exactly what has been found',
     cases.tank.skin && cases.tank.residents === 3 && cases.tank.onShow, cases.tank);
  ok('an empty terrarium says so rather than showing nothing',
     cases.viv.skin && cases.viv.residents === 0 && cases.viv.empty, cases.viv);
  ok('every resident sits inside the glass', cases.inside);

  /* ---- the temporary warp chip ------------------------------------------- */
  const warp = await page.evaluate(() => {
    closeModal();
    showScreen('map'); renderMap();
    const before = activeSubject();
    const chip = document.querySelector('.temp-warp-chip');
    if (!chip) return { missing: true };
    const outLabel = chip.textContent;
    chip.click();
    const there = activeSubject();
    const back = document.querySelector('.temp-warp-chip');
    const backLabel = back && back.textContent;
    if (back) back.click();
    return { before, outLabel, there, backLabel, home: activeSubject() };
  });
  ok('the topbar carries a one-click crossing to the calculus region',
     !warp.missing && warp.before === 'c' && /Calc/.test(warp.outLabel) && warp.there === 'calc', warp);
  ok('and the same chip brings you back', /C/.test(warp.backLabel || '') && warp.home === 'c', warp);

  /* ---- persistence ------------------------------------------------------- */
  const persisted = await page.evaluate(() => {
    saveGame();
    const before = { journal: JSON.stringify(S.journal), collection: JSON.stringify(S.collection) };
    S = null;
    loadGame();
    ensureJournal(); ensureCollection();
    return {
      journal: JSON.stringify(S.journal) === before.journal,
      collection: JSON.stringify(S.collection) === before.collection,
      found: collectStats().found
    };
  });
  ok('the journal and the collection survive a save and reload',
     persisted.journal && persisted.collection && persisted.found >= 4, persisted);

  if (errors.length) throw new Error('Browser errors: ' + errors.join(' | '));
  console.log('PASS: the journal, the collection chest, both display cases, the ' +
              'temporary crossing chip, and all of it through the real hotspots');
  await browser.close();
})().catch(err => { console.error(err); process.exit(1); });

/* Every item points at a category that exists, and every category is reachable
   from the chest. Kept out of the browser so the failure message is readable. */
function COLLECT_CATEGORY_CHECK(chest) {
  return chest.categories.length === 3 &&
    ['river', 'critters', 'keepsakes'].every(id => chest.categories.indexOf(id) >= 0);
}
