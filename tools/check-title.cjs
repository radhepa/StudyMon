/* Opening-screen invariants, in disposable storage. No player save is touched.
   node tools/check-title.cjs http://127.0.0.1:8777/ */
const assert = require('assert/strict');
const fs = require('fs');
const { chromium } = require('./playwright.cjs');
const url = process.argv[2] || 'http://127.0.0.1:8780/';
let passed = 0;
function check(name, value) { assert.ok(value, name); console.log('PASS ' + name); passed++; }

(async () => {
  const browser = await chromium.launch({ headless: true,
    executablePath: process.env.STUDYMON_BROWSER || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [], missing = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('response', r => { if (r.status() >= 400) missing.push(r.url()); });
  async function settle() {
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => !document.querySelector('.title-mons').classList.contains('pending'));
  }
  async function seed(ids = [6, 25, 448, 131, 94, 1026]) {
    await page.evaluate(ids => {
      S = freshSave(); activateSave(S); bindProgress('c'); S.settings.sound = false;
      S.trainer = 'RADHE'; S.party = ids.map(id => makeMon(id, 30, { shiny: false }));
      S.box = [makeMon(150, 40), makeMon(384, 40)];
      S.party.forEach(m => { S.caught[m.id] = true; }); S.badges = { 1: true, 2: true, 3: true };
      if (S.party[1]) { S.party[1].shiny = true; S.party[1].nick = 'Sparky'; }
      saveGame(); showScreen('title'); renderTitle();
    }, ids);
    await settle();
  }
  async function lineup() { return page.locator('.title-mons .t-mon').evaluateAll(nodes => nodes.map(n => Number(n.dataset.species))); }
  try {
    await page.goto(url);
    await page.waitForFunction(() => installSubjects.done && typeof renderTitle === 'function');
    await settle();
    check('new trainer sees no preset Pokémon', (await lineup()).length === 0);
    check('new trainer sees a partner invitation', await page.locator('#titleempty').isVisible());
    check('only New Game is offered without a save', !(await page.locator('#continuebtn').isVisible()));
    await page.keyboard.press('Enter');
    check('Enter starts the starter picker', await page.locator('#s-starter').evaluate(e => e.classList.contains('on')));
    await seed();
    check('exact party order, including an original creature', JSON.stringify(await lineup()) === JSON.stringify([6, 25, 448, 131, 94, 1026]));
    check('PC Pokémon never appear on the title', !(await lineup()).includes(150) && !(await lineup()).includes(384));
    check('shiny appearance and nickname are preserved', await page.locator('.t-mon').nth(1).locator('img').evaluate(e => e.src.includes('/shiny/25.png') && e.alt === 'Sparky (shiny)'));
    const before = await page.evaluate(() => ({ save: localStorage.getItem(SAVE_KEY), state: JSON.stringify(S) }));
    await page.evaluate(() => { for (let i = 0; i < 8; i++) renderTitle(); });
    const after = await page.evaluate(() => ({ save: localStorage.getItem(SAVE_KEY), state: JSON.stringify(S) }));
    check('rendering never changes the save or active state', JSON.stringify(before) === JSON.stringify(after));
    check('repeated renders never shuffle or duplicate members', JSON.stringify(await lineup()) === JSON.stringify([6, 25, 448, 131, 94, 1026]));
    await page.reload(); await settle();
    check('a reload restores the exact saved party', JSON.stringify(await lineup()) === JSON.stringify([6, 25, 448, 131, 94, 1026]));

    await page.keyboard.press('ArrowDown');
    check('Down selects New Game', await page.locator('#newgamebtn').evaluate(e => e.classList.contains('first') && document.activeElement === e));
    let confirmations = 0;
    const cancel = async dialog => { confirmations++; await dialog.dismiss(); };
    page.on('dialog', cancel);
    await page.keyboard.press('Enter');
    check('New Game keeps replacement confirmation', confirmations === 1 && await page.evaluate(() => CUR === 'title'));
    page.off('dialog', cancel);
    check('cancelling New Game preserves the saved party', await page.evaluate(raw => localStorage.getItem(SAVE_KEY) === raw, before.save));
    await page.keyboard.press('ArrowUp'); await page.keyboard.press('Enter');
    check('Up and Enter continue into the map', await page.evaluate(() => CUR === 'map' && S.party[1].nick === 'Sparky'));
    await page.evaluate(() => { showScreen('title'); renderTitle(); });
    await page.locator('#newgamebtn').hover();
    check('pointer selection uses one menu cursor', await page.locator('.t-menu button.first').count() === 1 && await page.locator('#newgamebtn').evaluate(e => e.classList.contains('first')));
    await page.locator('#continuebtn').click();
    check('Continue also works with a tap or click', await page.evaluate(() => CUR === 'map'));

    await seed([25, 25, 1026]);
    check('two party members of the same species keep both slots', JSON.stringify(await lineup()) === JSON.stringify([25, 25, 1026]));
    await page.evaluate(() => { const o = JSON.parse(localStorage.getItem(SAVE_KEY)); o.party[0].nick = '<img src=x onerror=alert(1)>'; localStorage.setItem(SAVE_KEY, JSON.stringify(o)); renderTitle(); });
    check('nicknames render as text', await page.locator('.title-mons img').count() === 3 && (await page.locator('.t-mon-name').first().textContent()).includes('<img'));
    await seed([133]);
    check('one partner is shown once, without filler', JSON.stringify(await lineup()) === '[133]');
    await seed([]);
    check('empty party with a full PC still shows no Pokémon', (await lineup()).length === 0);
    await page.locator('#continuebtn').click();
    check('empty-party Continue opens the starter picker', await page.evaluate(() => CUR === 'starter'));
    await page.evaluate(() => { localStorage.setItem(SAVE_KEY, '{broken'); showScreen('title'); renderTitle(); });
    check('a damaged save cannot add fallback Pokémon', (await lineup()).length === 0);
    await seed();
    await page.evaluate(() => document.querySelector('#toast').classList.remove('on'));

    fs.mkdirSync('.tmp', { recursive: true });
    for (const size of [{width:1280,height:800}, {width:1366,height:768}, {width:1024,height:768},
      {width:768,height:1024}, {width:390,height:844}, {width:320,height:568}, {width:844,height:390}]) {
      await page.setViewportSize(size); await settle();
      const layout = await page.evaluate(() => {
        const r = e => { const b = e.getBoundingClientRect(); return {left:b.left,right:b.right,top:b.top,bottom:b.bottom}; };
        const logo = r(document.querySelector('.t-logo'));
        const courses = r(document.querySelector('.t-courses'));
        const mons = [...document.querySelectorAll('.t-mon')].map(r);
        const menu = r(document.querySelector('.t-menu'));
        return { overflow: document.documentElement.scrollWidth > innerWidth,
          mons: mons.every(b => b.left >= 0 && b.right <= innerWidth),
          clear: mons.every(b => b.bottom <= menu.top || b.top >= menu.bottom || b.right <= menu.left || b.left >= menu.right),
          logoClear: logo.bottom <= courses.top, sprites: [...document.querySelectorAll('.title-mons img')].every(i => i.complete && i.naturalWidth > 0),
          still: getComputedStyle(document.querySelector('.title-mons img')).animationName === 'none' };
      });
      check(size.width + '×' + size.height + ' fits without overlap or missing sprites', !layout.overflow && layout.mons && layout.clear && layout.logoClear && layout.sprites);
      check(size.width + '×' + size.height + ' respects reduced motion', layout.still);
      if ([1280, 390, 844].includes(size.width)) await page.screenshot({path:'.tmp/title-final-' + size.width + '.png', fullPage:true});
    }
    await page.emulateMedia({reducedMotion:'no-preference'});
    check('idle animation is enabled when motion is allowed', await page.locator('.title-mons img').first().evaluate(e => getComputedStyle(e).animationName === 'title-idle'));
    check('no page errors or missing assets', errors.length === 0 && missing.length === 0);
    console.log(passed + ' title-screen checks passed.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
