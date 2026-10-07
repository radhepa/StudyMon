const { chromium } = require('./playwright.cjs');
const BASE = process.argv[2] || 'http://127.0.0.1:8780';
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
  });
  fs.mkdirSync('tmp', { recursive: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(BASE);

  await page.evaluate(() => {
    installSubjects();
    S = freshSave();
    S.party = [makeMon(1, 12), makeMon(25, 18), makeMon(4, 10)];
    S.box = [];
    for (let i = 0; i < 35; i++) S.box.push(makeMon(i + 2, 5 + (i % 20)));
    showScreen('kingdom');
    renderKingdom();
  });

  if (await page.locator('.kingdom-map-node').count() !== 10) {
    throw new Error('Expected ten connected Pokémon Kingdom districts');
  }
  const scoreAudit = await page.evaluate(() => {
    const tracks = Object.values(KINGDOM_MUSIC_TRACKS);
    return {
      count: tracks.length,
      names: new Set(tracks.map(track => track.name)).size,
      voices: new Set(tracks.map(track => track.voice)).size,
      validLoops: tracks.every(track =>
        track.melody.length === track.stepsPerBar * track.chords.length &&
        track.bpm >= 60 && track.bpm <= 104)
    };
  });
  if (scoreAudit.count !== 10 || scoreAudit.names !== 10 || scoreAudit.voices < 5 || !scoreAudit.validLoops) {
    throw new Error('Each district needs a distinct, valid music loop');
  }
  const census = await page.evaluate(() => {
    const c = kingdomTownCensus(Date.now());
    const keys = Object.values(c.groups).flat().concat(c.road).map(kingdomPlacementKey);
    return { total: keys.length, unique: new Set(keys).size };
  });
  if (census.total !== 38 || census.unique !== 38) {
    throw new Error('A Pokemon was missing or placed in multiple districts');
  }
  /* Freeze the town so every district view below can be counted exactly. */
  const freezeTown = () => page.evaluate(() => {
    kingdomRoster().forEach(entry => {
      const st = kingdomTravelState(entry, Date.now());
      if (st.trip) st.loc = st.trip.to;
      st.trip = null;
      st.until = Date.now() + 86400000;
    });
    renderKingdom();
  });
  await freezeTown();
  await page.evaluate(() => {
    const census = kingdomTownCensus(Date.now());
    const occupied = KINGDOM_LOCATIONS.find(location => census.groups[location.id].length);
    if (occupied) kingdomGo(occupied.id);
  });

  const collisionAudit = await page.evaluate(() => {
    let seed = 0x51a7c0de;
    const rand = () => {
      seed = Math.imul(seed ^ seed >>> 15, 1 | seed);
      seed ^= seed + Math.imul(seed ^ seed >>> 7, 61 | seed);
      return ((seed ^ seed >>> 14) >>> 0) / 4294967296;
    };
    const rows = KINGDOM_LOCATIONS.map(location => {
      const homeSafe = kingdomIsWalkable(location.nav.home[0], location.nav.home[1], location);
      const namedBorders = location.nav.blocks.length >= 7 &&
        location.nav.blocks.every(block => block.name && ['rect', 'ellipse', 'poly'].includes(block.type));
      let samplesSafe = true;
      let movementSafe = true;
      let movedSteps = 0;
      const actor = { location, ...kingdomPoint(rand, location) };
      for (let trip = 0; trip < 160; trip++) {
        const target = kingdomPoint(rand, location);
        for (let step = 0; step < 80; step++) {
          const dx = target.x - actor.x;
          const dy = target.y - actor.y;
          const distance = Math.hypot(dx, dy);
          if (distance < .25) break;
          if (kingdomTryStep(actor,
            actor.x + dx / distance * .24,
            actor.y + dy / distance * .24)) movedSteps++;
          if (!kingdomIsWalkable(actor.x, actor.y, location)) movementSafe = false;
        }
      }
      for (let i = 0; i < 1200; i++) {
        const point = kingdomPoint(rand, location);
        if (!kingdomIsWalkable(point.x, point.y, location)) samplesSafe = false;
      }
      return { id: location.id, homeSafe, namedBorders, samplesSafe, movementSafe, movedSteps };
    });
    const green = kingdomLocation('green');
    const shared = kingdomPoint(rand, green);
    const first = { location: green, x: shared.x, y: shared.y };
    const second = { location: green, x: shared.x, y: shared.y };
    const overlapAllowed = kingdomTryStep(first, shared.x, shared.y) &&
      kingdomTryStep(second, shared.x, shared.y) && first.x === second.x && first.y === second.y;
    return { rows, overlapAllowed };
  });
  if (collisionAudit.rows.some(row => !row.homeSafe || !row.namedBorders ||
      !row.samplesSafe || !row.movementSafe || row.movedSteps < 1000)) {
    throw new Error('A district is missing a solid border or safe roaming space: ' +
      JSON.stringify(collisionAudit.rows));
  }
  if (!collisionAudit.overlapAllowed) {
    throw new Error('Pokemon should be able to overlap one another');
  }

  await page.locator('.kingdom-mon').first().waitFor();
  const before = await page.locator('.kingdom-mon').first().getAttribute('style');
  await page.waitForTimeout(650);
  const after = await page.locator('.kingdom-mon').first().getAttribute('style');
  if (before === after) throw new Error('Kingdom resident did not wander');

  const actorName = await page.evaluate(() => monName(KINGDOM_ACTORS[0].entry.mon));
  await page.locator('.kingdom-mon').first().evaluate(element => element.click());
  if (!await page.locator('.kingdom-inspector').textContent().then(t => t.includes(actorName))) {
    throw new Error('Resident inspector did not open');
  }

  const gymAudit = await page.evaluate(() => {
    const entry = kingdomRoster()[0];
    const autoEntry = kingdomRoster()[1];
    const key = kingdomPlacementKey(entry);
    kingdomTravelSettle(entry, 'gym', { x: 52, y: 55 });
    kingdomTravelSettle(autoEntry, 'gym', { x: 58, y: 55 });
    kingdomGo('gym');
    KINGDOM_ACTORS.forEach(actor => {
      kingdomGymCancel(actor, false);
      actor.gymAt = Infinity;
    });
    const actor = KINGDOM_ACTORS.find(row => kingdomPlacementKey(row.entry) === key);
    const station = kingdomGymStation('hurdles');
    kingdomInspect(actor);
    const markerCount = document.querySelectorAll('.kingdom-gym-station').length;
    const workoutButtons = document.querySelectorAll('.kingdom-workout-row button').length;
    const spotsWalkable = KINGDOM_GYM_STATIONS.every(row =>
      kingdomIsWalkable(row.x, row.y, kingdomLocation('gym')));
    kingdomUseGymStation(station.id);
    const began = actor.gym && actor.gym.manual && actor.gym.station.id === station.id;
    actor.gym.step = actor.gym.route.length - 1;
    actor.target = actor.gym.route[actor.gym.step];
    actor.x = station.x;
    actor.y = station.y;
    kingdomGymTick(actor, performance.now(), false, .05);
    const working = actor.gym && actor.gym.phase === 'working' &&
      actor.el.classList.contains('gym-working') && actor.el.classList.contains('gym-hurdles');
    const activeMarker = document.querySelector('[data-gym-station="hurdles"]').classList.contains('active');
    const status = document.getElementById('kingdom-inspect-status').textContent;
    const until = actor.gym.until;
    kingdomGymTick(actor, until + 1, false, .05);
    const finished = !actor.gym && !actor.el.classList.contains('gym-working') &&
      !actor.el.querySelector('.kingdom-gym-emote');
    const autoActor = KINGDOM_ACTORS.find(row => row !== actor);
    autoActor.x = 52;
    autoActor.y = 55;
    autoActor.gymAt = 0;
    const simStart = performance.now();
    kingdomGymTick(autoActor, simStart, false, .05);
    const autoBegan = autoActor.gym && !autoActor.gym.manual;
    for (let frame = 1; frame < 700 && autoActor.gym && autoActor.gym.phase !== 'working'; frame++) {
      kingdomGymTick(autoActor, simStart + frame * 50, false, .05);
    }
    const autoWorking = autoActor.gym && autoActor.gym.phase === 'working';
    if (autoWorking) kingdomGymTick(autoActor, autoActor.gym.until + 1, false, .05);
    return { markerCount, workoutButtons, spotsWalkable, began, working, activeMarker, status,
      finished, autoBegan, autoWorking };
  });
  if (gymAudit.markerCount !== 6 || gymAudit.workoutButtons !== 6 || !gymAudit.spotsWalkable ||
      !gymAudit.began || !gymAudit.working || !gymAudit.activeMarker ||
      !gymAudit.status.includes('Agility Hurdles') || !gymAudit.finished ||
      !gymAudit.autoBegan || !gymAudit.autoWorking) {
    throw new Error('Mossroot Gym workout loop failed: ' + JSON.stringify(gymAudit));
  }
  await page.evaluate(() => {
    const actor = KINGDOM_ACTORS[0];
    const station = kingdomGymStation('weights');
    kingdomInspect(actor);
    kingdomUseGymStation(station.id);
    actor.gym.step = actor.gym.route.length - 1;
    actor.target = actor.gym.route[actor.gym.step];
    actor.x = station.x;
    actor.y = station.y;
    kingdomGymTick(actor, performance.now(), false, .05);
  });
  await page.screenshot({ path: 'tmp/kingdom-gym-functional-preview.png', fullPage: true });

  const grabAudit = await page.evaluate(async () => {
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
    const fire = (el, type, x, y) => el.dispatchEvent(new PointerEvent(type, {
      bubbles: true, cancelable: true, clientX: x, clientY: y,
      pointerId: 7, pointerType: 'mouse', button: 0, isPrimary: true
    }));
    kingdomTravelSettle(kingdomRoster()[0], 'green', { x: 50, y: 60 });
    kingdomGo('square');
    kingdomGo('green');
    const stage = document.getElementById('kingdom-stage');
    stage.scrollIntoView({ block: 'center' });
    const actor = KINGDOM_ACTORS.find(a => !a.trip);
    actor.pauseUntil = Infinity;
    const key = kingdomPlacementKey(actor.entry);
    const box = actor.el.getBoundingClientRect();
    const cursor = getComputedStyle(stage).cursor;
    fire(actor.el, 'pointerdown', box.left + box.width / 2, box.top + box.height / 2);
    await wait(500);
    const early = !!KINGDOM_CARRY;
    await wait(700);
    const picked = !!KINGDOM_CARRY && !KINGDOM_ACTORS.includes(actor);
    KINGDOM_CARRY.x = innerWidth / 2;
    KINGDOM_CARRY.y = innerHeight / 2;
    fire(document.body, 'pointerup', 5, 5);
    const clings = !!KINGDOM_CARRY;
    kingdomGo('market');
    const rect = document.getElementById('kingdom-stage').getBoundingClientRect();
    const location = kingdomLocation('market');
    const x = rect.left + rect.width * location.nav.home[0] / 100;
    const y = rect.top + rect.height * location.nav.home[1] / 100 - KINGDOM_CARRY.size * .58;
    fire(document.body, 'pointermove', x, y);
    fire(document.getElementById('kingdom-stage'), 'pointerup', x, y);
    const placed = KINGDOM_ACTORS.find(a => kingdomPlacementKey(a.entry) === key);
    renderKingdom();
    const kept = KINGDOM_ACTORS.some(a => kingdomPlacementKey(a.entry) === key);
    const c = kingdomTownCensus(Date.now());
    const total = Object.values(c.groups).reduce((n, rows) => n + rows.length, 0) + c.road.length;
    const st = KINGDOM_TRAVEL.mons[key];
    /* A set-down Pokemon starts a fresh stay there, and forgets the spot once it moves on. */
    const expires = st.loc === 'market' && !!st.spot && !st.trip &&
      kingdomTravelAdvance(key, JSON.parse(JSON.stringify(st)), st.until).spot === null;
    kingdomGo('green');
    return { cursor, early, picked, clings, placed: !!placed && !KINGDOM_CARRY &&
      kingdomIsWalkable(placed.x, placed.y, location), kept, total, expires };
  });
  if (!grabAudit.cursor.includes('kingdom-hand-open') || grabAudit.early || !grabAudit.picked) {
    throw new Error('The hand did not pick a Pokemon up after a 1 second hold: ' + JSON.stringify(grabAudit));
  }
  if (!grabAudit.clings || !grabAudit.placed || !grabAudit.kept || grabAudit.total !== 38 || !grabAudit.expires) {
    throw new Error('Carrying a Pokemon to another district failed: ' + JSON.stringify(grabAudit));
  }

  await freezeTown();
  const districtAudit = await page.evaluate(() => {
    const rows = [];
    for (const loc of KINGDOM_LOCATIONS) {
      kingdomGo(loc.id);
      rows.push({
        id: loc.id,
        residents: document.querySelectorAll('.kingdom-mon').length,
        party: document.querySelectorAll('.kingdom-party-mark').length,
        lanterns: document.querySelectorAll('.kingdom-lanterns i').length,
        expectedLanterns: loc.lanterns.length,
        splashes: document.querySelectorAll('.kingdom-rain-splashes i').length,
        music: KINGDOM_MUSIC_AUDIO && KINGDOM_MUSIC_AUDIO.active && KINGDOM_MUSIC_AUDIO.active.id,
        background: document.getElementById('kingdom-stage').getAttribute('data-scene'),
        paths: document.querySelectorAll('.kingdom-paths button').length
      });
    }
    return rows;
  });
  if (districtAudit.reduce((n, row) => n + row.residents, 0) !== 38) {
    throw new Error('District views do not account for the whole town population');
  }
  if (districtAudit.reduce((n, row) => n + row.party, 0) !== 3) {
    throw new Error('Party residents are not marked exactly once across town');
  }
  if (districtAudit.some(row => !row.background.includes('kingdom-') || row.paths < 2)) {
    throw new Error('A district is missing its map art or connected walking paths');
  }
  if (districtAudit.some(row => row.lanterns !== row.expectedLanterns) ||
      districtAudit.reduce((n, row) => n + row.lanterns, 0) !==
        districtAudit.reduce((n, row) => n + row.expectedLanterns, 0)) {
    throw new Error('Night lantern lights are missing or assigned to the wrong district');
  }
  if (districtAudit.some(row => row.splashes !== 18 || row.music !== row.id)) {
    throw new Error('Ground rain impacts or district soundtrack switching is incomplete');
  }
  const assetsOk = await page.evaluate(() =>
    KINGDOM_LOCATIONS.every(loc => /^assets\/ui\/kingdom-[a-z-]+\.png$/.test(loc.image)));
  if (!assetsOk) throw new Error('A town district background failed to load');

  const atmosphere = await page.evaluate(() => {
    const night = kingdomEasternTime(Date.parse('2026-09-14T07:00:00Z'));
    const day = kingdomEasternTime(Date.parse('2026-09-14T16:00:00Z'));
    kingdomApplyAtmosphere(Date.parse('2026-09-14T07:00:00Z'));
    const nightApplied = document.getElementById('kingdom-stage').classList.contains('phase-night');
    document.getElementById('kingdom-lanterns').getAnimations().forEach(animation => animation.finish());
    kingdomToggleWeather();
    const raining = document.getElementById('kingdom-stage').classList.contains('weather-rain');
    const rainVisible = getComputedStyle(document.getElementById('kingdom-weather')).display === 'block';
    const rainDuration = parseFloat(getComputedStyle(document.getElementById('kingdom-weather'), '::before').animationDuration);
    const lanternOpacity = parseFloat(getComputedStyle(document.getElementById('kingdom-lanterns')).opacity);
    const pressed = document.getElementById('kingdom-weather-toggle').getAttribute('aria-pressed');
    const audioLayers = KINGDOM_RAIN_AUDIO ? KINGDOM_RAIN_AUDIO.sources.length : 0;
    const musicTrack = KINGDOM_MUSIC_AUDIO && KINGDOM_MUSIC_AUDIO.active && KINGDOM_MUSIC_AUDIO.active.id;
    kingdomToggleRainSound();
    const muted = !KINGDOM_RAIN_SOUND &&
      document.getElementById('kingdom-sound-toggle').getAttribute('aria-pressed') === 'false';
    kingdomToggleRainSound();
    kingdomApplyAtmosphere(Date.parse('2026-09-14T07:00:00Z'));
    document.getElementById('kingdom-lanterns').getAnimations().forEach(animation => animation.finish());
    return { night, day, nightApplied, raining, rainVisible, rainDuration,
      lanternOpacity, pressed, audioLayers, muted, musicTrack, current: KINGDOM_LOCATION };
  });
  if (atmosphere.night.phase !== 'night' || atmosphere.night.hour !== 3 ||
      atmosphere.day.phase !== 'day' || atmosphere.day.hour !== 12 || !atmosphere.nightApplied) {
    throw new Error('Indianapolis day/night cycle did not follow Eastern Time');
  }
  if (!atmosphere.raining || !atmosphere.rainVisible || atmosphere.pressed !== 'true') {
    throw new Error('Weather toggle did not turn rain on');
  }
  if (atmosphere.rainDuration < 1.1 || atmosphere.rainDuration > 1.5 || atmosphere.lanternOpacity < .9) {
    throw new Error('Rain pacing or nighttime lantern ambience is not active');
  }
  if (atmosphere.audioLayers !== 3 || !atmosphere.muted) {
    throw new Error('Layered rain audio or its mute control did not initialize');
  }
  if (atmosphere.musicTrack !== atmosphere.current) throw new Error('District music engine did not initialize');
  await page.screenshot({ path: 'tmp/kingdom-rain-preview.png', fullPage: true });
  await page.evaluate(() => kingdomToggleWeather());

  await page.evaluate(() => {
    kingdomGo('square');
    kingdomApplyAtmosphere(Date.parse('2026-09-14T07:00:00Z'));
    document.getElementById('kingdom-lanterns').getAnimations().forEach(animation => animation.finish());
  });
  await page.screenshot({ path: 'tmp/kingdom-preview.png', fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(120);
  if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) {
    throw new Error('Kingdom causes horizontal overflow on mobile');
  }
  await page.evaluate(() => {
    kingdomTravelSettle(kingdomRoster()[0], 'riverside', { x: 51, y: 69 });
    kingdomGo('riverside');
    kingdomToggleWeather();
  });
  await page.locator('.kingdom-mon img').first().evaluate(img => img.complete
    ? true : new Promise(resolve => img.addEventListener('load', () => resolve(true), { once: true })));
  await page.waitForTimeout(700);
  await page.screenshot({ path: 'tmp/kingdom-mobile-preview.png', fullPage: true });

  const mobileGym = await page.evaluate(() => {
    const entry = kingdomRoster()[0];
    const key = kingdomPlacementKey(entry);
    kingdomTravelSettle(entry, 'gym', { x: 52, y: 55 });
    kingdomGo('gym');
    const actor = KINGDOM_ACTORS.find(row => kingdomPlacementKey(row.entry) === key) || KINGDOM_ACTORS[0];
    kingdomInspect(actor);
    const buttons = Array.from(document.querySelectorAll('.kingdom-workout-row button'));
    return {
      markers: document.querySelectorAll('.kingdom-gym-station').length,
      buttons: buttons.length,
      overflow: document.documentElement.scrollWidth > innerWidth,
      controlsFit: buttons.every(button => {
        const box = button.getBoundingClientRect();
        return box.left >= 0 && box.right <= innerWidth;
      })
    };
  });
  if (mobileGym.markers !== 6 || mobileGym.buttons !== 6 || mobileGym.overflow || !mobileGym.controlsFit) {
    throw new Error('Mossroot Gym controls do not fit mobile: ' + JSON.stringify(mobileGym));
  }
  await page.screenshot({ path: 'tmp/kingdom-gym-mobile-preview.png', fullPage: true });

  const cleanup = await page.evaluate(() => {
    showScreen('map');
    return { raf: KINGDOM_RAF, clock: KINGDOM_CLOCK_TIMER, hour: KINGDOM_SYNC_TIMER };
  });
  if (cleanup.raf || cleanup.clock || cleanup.hour) throw new Error('Kingdom animation kept running after leaving');
  await page.waitForTimeout(180);
  const audioState = await page.evaluate(() => ({
    rain: KINGDOM_RAIN_AUDIO && KINGDOM_RAIN_AUDIO.context.state,
    music: KINGDOM_MUSIC_AUDIO && KINGDOM_MUSIC_AUDIO.context.state,
    musicActive: KINGDOM_MUSIC_AUDIO && KINGDOM_MUSIC_AUDIO.active
  }));
  if ((audioState.rain && audioState.rain !== 'suspended') ||
      (audioState.music && audioState.music !== 'suspended') || audioState.musicActive) {
    throw new Error('Kingdom rain or music audio kept playing after leaving');
  }

  if (errors.length) throw new Error('Browser errors: ' + errors.join(' | '));
  console.log('PASS Kingdom: 10 districts, collision-safe roaming, gym workouts, rain, music, lanterns, mobile fit.');
  await browser.close();
})().catch(err => {
  console.error(err);
  process.exit(1);
});
