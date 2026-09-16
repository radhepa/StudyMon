const { chromium } = require('./playwright.cjs');
const fs = require('fs');

let browser;
(async () => {
  browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
  });
  fs.mkdirSync('.tmp', { recursive: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('http://127.0.0.1:8780/', { waitUntil: 'domcontentloaded' });

  await page.evaluate(() => {
    S = freshSave();
    S.party = [makeMon(1, 10), makeMon(25, 10)];
    bindProgress('c');
    ensureFriends(); ensureBag(); ensureTown(); ensureHumanWorld();
    openHumanWorld('square', 'southGate');
  });
  await page.locator('#human-stage').waitFor();
  await page.locator('.human-npc').first().waitFor();

  const initial = await page.evaluate(() => ({
    minute: S.humanWorld.minute,
    scene: S.humanWorld.scene,
    actors: HUMAN_ACTORS.map(actor => actor.id),
    wren: humanNpcState('mart').scene,
    ada: humanNpcState('nurse').scene,
    bell: humanNpcState('postie').scene,
    rowan: humanNpcState('rowan').scene,
    background: document.getElementById('human-stage').style.backgroundImage,
    musicName: HUMAN_MUSIC_TRACK.name,
    musicBars: HUMAN_MUSIC_TRACK.chords.length,
    musicSteps: HUMAN_MUSIC_TRACK.melody.length,
    musicActive: !!(HUMAN_MUSIC_AUDIO && HUMAN_MUSIC_AUDIO.active)
  }));
  if (initial.minute !== 480 || initial.scene !== 'square') throw new Error('New game did not begin at Bootstrap square at 8:00 AM');
  if (initial.wren !== 'mart' || initial.ada !== 'center' || initial.bell !== 'square' || initial.rowan !== 'square') {
    throw new Error('Morning schedule did not place the key cast correctly: ' + JSON.stringify(initial));
  }
  if (!initial.background.includes('bootstrap-town-exterior')) throw new Error('Exterior art did not load');
  if (initial.musicName !== 'Sunlit Steps' || initial.musicBars !== 16 || initial.musicSteps !== 128 || !initial.musicActive) {
    throw new Error('Bootstrap Town music did not start with one complete 16-bar theme: ' + JSON.stringify(initial));
  }
  const musicButton = page.getByRole('button', { name: '🎵 Sunlit Steps' });
  if (await musicButton.getAttribute('aria-pressed') !== 'true') throw new Error('Music toggle does not announce its on state');
  await musicButton.click();
  if (await page.evaluate(() => HUMAN_MUSIC_ON || !!HUMAN_MUSIC_AUDIO.active)) throw new Error('Music toggle did not stop the theme');
  await page.getByRole('button', { name: '🎵 Music: off' }).click();
  if (!await page.evaluate(() => HUMAN_MUSIC_ON && !!HUMAN_MUSIC_AUDIO.active)) throw new Error('Music toggle did not restart the theme');

  // Bell stands near the Mart at 08:00; the visible sprite may overlap the
  // doorway visually, but its transparent canvas must not steal the door click.
  await page.getByRole('button', { name: 'Enter Poké Mart' }).click({ timeout: 2000 });
  if (!await page.evaluate(() => HUMAN_PENDING && HUMAN_PENDING.type === 'portal' && HUMAN_PENDING.value.id === 'mart')) {
    throw new Error('Mart door click did not survive the nearby NPC hitbox');
  }
  await page.evaluate(() => { HUMAN_PENDING = null; HUMAN_MOVE_TARGET = null; });

  // The south-gate spawn sits against a narrow path edge. Put the player on
  // the open square so this checks keyboard input rather than border collision.
  const before = await page.evaluate(() => {
    outer: for (let y = 60; y <= 88; y += 2) for (let x = 20; x <= 78; x += 2) {
      if (humanIsWalkable(x, y, humanScene()) && humanIsWalkable(x + 4, y, humanScene()) &&
          !HUMAN_ACTORS.some(actor => humanGap(x, y, actor.x, actor.y) < 8)) {
        HUMAN_PLAYER.x = x; HUMAN_PLAYER.y = y; break outer;
      }
    }
    humanPaint(HUMAN_PLAYER, true);
    return { x: HUMAN_PLAYER.x, y: HUMAN_PLAYER.y };
  });
  await page.keyboard.down('ArrowRight');
  // Drive one deterministic game step as well as the real animation loop;
  // backgrounded CI tabs are allowed to throttle requestAnimationFrame.
  await page.evaluate(() => humanMovePlayer(performance.now() + 200, .1));
  await page.waitForTimeout(120);
  await page.keyboard.up('ArrowRight');
  const after = await page.evaluate(() => ({ x: HUMAN_PLAYER.x, y: HUMAN_PLAYER.y, cur: CUR,
    keys: HUMAN_KEYS, dialogue: !!HUMAN_DIALOGUE, raf: HUMAN_RAF,
    walkable: humanIsWalkable(HUMAN_PLAYER.x + 1, HUMAN_PLAYER.y, humanScene()) }));
  if (after.x <= before.x + .5) throw new Error('Keyboard movement did not move the player: ' + JSON.stringify({ before, after }));

  // Pressing perpendicular keys must never create diagonal travel. The most
  // recently pressed axis wins, matching the game's four-direction rule.
  await page.evaluate(() => {
    outer: for (let y = 60; y <= 88; y += 2) for (let x = 20; x <= 78; x += 2) {
      if (humanIsWalkable(x, y, humanScene()) && humanIsWalkable(x, y + 5, humanScene()) &&
          !HUMAN_ACTORS.some(actor => humanGap(x, y, actor.x, actor.y) < 8)) {
        HUMAN_PLAYER.x = x; HUMAN_PLAYER.y = y; break outer;
      }
    }
    humanPaint(HUMAN_PLAYER, true);
  });
  const fourWayBefore = await page.evaluate(() => ({ x: HUMAN_PLAYER.x, y: HUMAN_PLAYER.y }));
  await page.keyboard.down('ArrowRight');
  await page.keyboard.down('ArrowDown');
  await page.evaluate(() => {
    // Keep the logic test deterministic even when the headless browser
    // temporarily throttles queued keyboard events or animation frames.
    HUMAN_KEYS.right = true; HUMAN_KEYS.down = true; HUMAN_LAST_AXIS = 'vertical';
    humanMovePlayer(performance.now() + 500, .2);
  });
  await page.keyboard.up('ArrowDown');
  await page.keyboard.up('ArrowRight');
  const walkSources = await page.evaluate(() => {
    const sources = [];
    HUMAN_PLAYER.direction = 'down';
    humanSetMoving(HUMAN_PLAYER, true, 'player');
    [0, 105, 210, 315].forEach(now => {
      humanAnimateWalk(HUMAN_PLAYER, now, 'player', null, 105);
      sources.push(document.querySelector('#human-player img').getAttribute('src'));
    });
    humanSetMoving(HUMAN_PLAYER, false, 'player');
    HUMAN_KEYS = {};
    return sources;
  });
  const fourWayAfter = await page.evaluate(() => ({ x: HUMAN_PLAYER.x, y: HUMAN_PLAYER.y }));
  if (Math.abs(fourWayAfter.x - fourWayBefore.x) > .2 || fourWayAfter.y <= fourWayBefore.y + .5) {
    throw new Error('Perpendicular keypresses produced diagonal movement');
  }
  if (new Set(walkSources).size < 3 || walkSources.some(src => !/-down-[012]-v4\.png$/.test(src))) {
    throw new Error('Player did not cycle through the generated down-facing walk frames: ' + JSON.stringify(walkSources));
  }

  await page.evaluate(() => humanOpenDialogue('postie'));
  if (!await page.locator('#human-dialogue').textContent().then(text => text.includes('Bell'))) throw new Error('Proximity dialogue did not open for Bell');
  if (!await page.locator('#human-dialogue').isVisible()) throw new Error('Dialogue exists but is not visibly presented');
  const chatClock = await page.evaluate(() => {
    const before = S.humanWorld.minute;
    humanChat('postie');
    return { before, after: S.humanWorld.minute };
  });
  if (chatClock.after !== chatClock.before) throw new Error('Ordinary conversation advanced the town clock: ' + JSON.stringify(chatClock));
  await page.evaluate(() => humanDialogueBack());
  await page.waitForTimeout(250);
  await page.screenshot({ path: '.tmp/bootstrap-town-dialogue.png', fullPage: true });
  await page.getByRole('button', { name: 'Join delivery round' }).click();
  if (!await page.locator('#human-objective').textContent().then(text => text.includes('Wren'))) throw new Error('Bell delivery objective did not start');

  await page.evaluate(() => humanGo('mart', 'door'));
  await page.locator('.human-npc').first().waitFor();
  const mart = await page.evaluate(() => ({
    scene: S.humanWorld.scene,
    actors: HUMAN_ACTORS.map(actor => actor.id),
    size: document.getElementById('human-stage').style.backgroundSize,
    position: document.getElementById('human-stage').style.backgroundPosition
  }));
  if (!mart.actors.includes('mart') || !mart.actors.includes('postie')) throw new Error('Wren or following Bell did not enter the Mart');
  if (mart.size !== '200% 200%' || mart.position !== '0% 0%') throw new Error('Mart atlas quadrant is wrong');
  await page.screenshot({ path: '.tmp/bootstrap-town-mart.png', fullPage: true });
  await page.evaluate(() => humanOpenDialogue('mart'));
  if (!await page.getByRole('button', { name: 'Hand over Bell’s parcel' }).count()) throw new Error('Delivery action is missing from Wren');
  await page.getByRole('button', { name: 'Hand over Bell’s parcel' }).click();
  if (await page.evaluate(() => S.humanWorld.activity.step) !== 1) throw new Error('Delivery did not advance');

  await page.evaluate(() => { humanDialogueBack(); humanOpenShop('mart'); });
  await page.locator('#s-shop.on').waitFor();
  const shopMinute = await page.evaluate(() => S.humanWorld.minute);
  await page.getByRole('button', { name: 'Back to Bootstrap Town' }).click();
  await page.locator('#s-human.on').waitFor();
  if (await page.evaluate(() => S.humanWorld.minute) !== shopMinute + 10) throw new Error('Shop return did not advance town time exactly once');
  if (await page.evaluate(() => S.humanWorld.scene) !== 'mart') throw new Error('Shop did not return to the Mart');

  const activityAudit = await page.evaluate(() => {
    S.humanWorld.activity = null;
    const potionsBefore = itemCount('potion');
    humanStartActivity('restock');
    for (let i = 0; i < 3; i++) {
      humanActivityObject({ action: 'crate', index: i });
      humanActivityObject({ action: 'shelf', index: i });
    }
    const restockDone = !S.humanWorld.activity && itemCount('potion') === potionsBefore + 2;
    humanGo('square', 'southGate');
    humanStartActivity('warmup');
    const markers = HUMAN_WORLD_ACTIVITY_DEFS.warmup.markers;
    for (const marker of markers) {
      HUMAN_PLAYER.x = marker[0]; HUMAN_PLAYER.y = marker[1];
      humanCheckActivityProximity();
    }
    const warmupDone = !S.humanWorld.activity;
    const beforeReturn = S.humanWorld.minute;
    humanSetReturn(40, 'battle');
    showScreen('battle');
    humanWorldReturn();
    const battleReturn = CUR === 'human' && S.humanWorld.scene === 'square' && S.humanWorld.minute === beforeReturn + 40;
    return { restockDone, warmupDone, battleReturn };
  });
  if (!activityAudit.restockDone || !activityAudit.warmupDone || !activityAudit.battleReturn) {
    throw new Error('Restock, warm-up, or battle return failed: ' + JSON.stringify(activityAudit));
  }

  await page.evaluate(() => {
    S.humanWorld.activity = null;
    S.humanWorld.minute = 720;
    humanGo('square', 'martDoor');
  });
  const lunch = await page.evaluate(() => ({ wren: humanNpcState('mart'), tam: humanNpcState('tam') }));
  if (lunch.wren.scene !== 'square' || lunch.tam.scene !== 'square') throw new Error('Wren and Tam did not share their lunch schedule');

  await page.screenshot({ path: '.tmp/bootstrap-town-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(200);
  if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw new Error('Bootstrap Town overflows horizontally on mobile');
  await page.evaluate(() => humanOpenDialogue('mart'));
  if (!await page.locator('#human-dialogue').isVisible()) throw new Error('Mobile dialogue is not visible');
  await page.waitForTimeout(250);
  await page.screenshot({ path: '.tmp/bootstrap-town-mobile.png', fullPage: true });

  const cleanup = await page.evaluate(() => {
    showScreen('map');
    return { raf: HUMAN_RAF, musicActive: !!(HUMAN_MUSIC_AUDIO && HUMAN_MUSIC_AUDIO.active) };
  });
  if (cleanup.raf) throw new Error('Human-world animation kept running after leaving the screen');
  if (cleanup.musicActive) throw new Error('Bootstrap Town music kept running after leaving the screen');
  await page.waitForTimeout(160);
  const musicContextState = await page.evaluate(() => HUMAN_MUSIC_AUDIO && HUMAN_MUSIC_AUDIO.context.state);
  if (musicContextState && musicContextState !== 'suspended') throw new Error('Bootstrap Town audio context did not suspend after leaving');
  if (errors.length) throw new Error('Browser errors: ' + errors.join(' | '));
  await browser.close();
  console.log('PASS: Bootstrap Town music lifecycle, four-way movement, multi-frame animation, proportions, schedules, dialogue, delivery, interior atlas, shop return, responsive layout and cleanup');
})().catch(async error => {
  console.error(error.stack || error);
  if (browser) await browser.close();
  process.exitCode = 1;
});
