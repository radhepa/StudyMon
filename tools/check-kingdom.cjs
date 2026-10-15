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
  /* Wake the first resident (it may be napping or busy) and send it walking. */
  await page.evaluate(() => {
    const actor = KINGDOM_ACTORS[0];
    kingdomActCancel(actor, false);
    actor.pauseUntil = 0;
    actor.nextTurn = performance.now() + 5000;
    actor.target = kingdomPoint(actor.rand, actor.location);
  });
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
    const key = kingdomPlacementKey(entry);
    kingdomTravelSettle(entry, 'gym', { x: 52, y: 55 });
    kingdomGo('gym');
    KINGDOM_ACTORS.forEach(actor => {
      kingdomActCancel(actor, false);
      actor.nextTurn = Infinity;
    });
    const actor = KINGDOM_ACTORS.find(row => kingdomPlacementKey(row.entry) === key);
    kingdomInspect(actor);
    const markerCount = document.querySelectorAll('.kingdom-gym-station').length;
    const workoutButtons = document.querySelectorAll('.kingdom-workout-row button').length;
    kingdomUseSpot('hurdles');
    const began = !!actor.act && actor.act.manual && actor.act.spot.id === 'hurdles';
    let t = performance.now();
    for (let i = 0; i < 4000 && actor.act && actor.act.phase !== 'do'; i++) {
      t += 50;
      kingdomLifeTick(actor, t, i < 3000, .05);
    }
    const working = !!actor.act && actor.act.phase === 'do' &&
      actor.el.classList.contains('acting') && actor.el.classList.contains('act-hurdles');
    const activeMarker = document.querySelector('[data-gym-station="hurdles"]').classList.contains('active');
    const status = document.getElementById('kingdom-inspect-status').textContent;
    /* The route carries it over the hurdles, not on the spot. */
    const start = [actor.x, actor.y];
    let jumped = false;
    for (let i = 0; i < 80; i++) {
      t += 50;
      kingdomLifeTick(actor, t, false, .05);
      if (actor.el.classList.contains('leg-jump') && actor.lift > 1) jumped = true;
    }
    const travelled = Math.hypot(actor.x - start[0], actor.y - start[1]) > 2;
    const until = actor.act.until;
    t = Math.max(t, until) + 1;
    for (let i = 0; i < 400 && actor.act; i++) {
      t += 50;
      kingdomLifeTick(actor, t, false, .05);
    }
    const finished = !actor.act && !actor.el.classList.contains('acting') &&
      !actor.el.classList.contains('leg-jump') && actor.depthY == null;
    /* Left alone, a fighting type picks gym stations by itself. */
    const fighter = KINGDOM_ACTORS.find(row => row !== actor) || actor;
    const ownTraits = fighter.traits;
    fighter.traits = Object.assign({}, ownTraits, { types: ['fighting'], has: type => type === 'fighting' });
    let autoBegan = false;
    for (let i = 0; i < 300 && !autoBegan; i++) {
      kingdomActCancel(fighter, false);
      fighter.x = 52;
      fighter.y = 55;
      kingdomDecide(fighter, performance.now());
      autoBegan = !!fighter.act && !fighter.act.manual && !!fighter.act.spot.station;
    }
    kingdomActCancel(fighter, false);
    fighter.traits = ownTraits;
    return { markerCount, workoutButtons, began, working, activeMarker, status, jumped, travelled,
      finished, autoBegan };
  });
  if (gymAudit.markerCount !== 6 || gymAudit.workoutButtons !== 6 ||
      !gymAudit.began || !gymAudit.working || !gymAudit.activeMarker ||
      !gymAudit.status.toLowerCase().includes('agility hurdles') || !gymAudit.jumped || !gymAudit.travelled ||
      !gymAudit.finished || !gymAudit.autoBegan) {
    throw new Error('Mossroot Gym workout loop failed: ' + JSON.stringify(gymAudit));
  }
  await page.evaluate(() => {
    const actor = KINGDOM_ACTORS[0];
    kingdomInspect(actor);
    kingdomUseSpot('weights');
    let t = performance.now();
    for (let i = 0; i < 4000 && actor.act && actor.act.phase !== 'do'; i++) kingdomLifeTick(actor, t += 50, true, .05);
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'tmp/kingdom-gym-functional-preview.png', fullPage: true });

  const lifeAudit = await page.evaluate(() => {
    const problems = [];
    /* Every activity spot sits on reachable, open ground with short hops in. */
    const perDistrict = {};
    const reach = {};
    const reachable = loc => {
      if (reach[loc.id]) return reach[loc.id];
      const grid = kingdomWalkGrid(loc);
      const seen = new Uint8Array(101 * 101);
      const queue = [kingdomNearestCell(grid, loc.nav.home)];
      seen[queue[0]] = 1;
      while (queue.length) {
        const cur = queue.pop(), x = cur % 101, y = (cur / 101) | 0;
        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
          const nx = x + dx, ny = y + dy, ni = ny * 101 + nx;
          if (nx < 0 || nx > 100 || ny < 0 || ny > 100 || seen[ni] || !grid[ni]) return;
          seen[ni] = 1;
          queue.push(ni);
        });
      }
      return (reach[loc.id] = { grid, seen });
    };
    KINGDOM_SPOTS.forEach(spot => {
      const loc = kingdomLocation(spot.loc);
      perDistrict[spot.loc] = (perDistrict[spot.loc] || 0) + 1;
      spot.seats.forEach((seat, i) => {
        const start = seat.from || seat.at;
        if (!kingdomIsWalkable(start[0], start[1], loc)) problems.push(spot.id + '#' + i + ' approach blocked');
        const r = reachable(loc);
        const cell = kingdomNearestCell(r.grid, start);
        if (cell < 0 || !r.seen[cell]) problems.push(spot.id + '#' + i + ' unreachable');
        const legs = seat.from ? [seat.from].concat(seat.via || [], [seat.at]) : [];
        for (let k = 1; k < legs.length; k++) {
          if (Math.hypot(legs[k][0] - legs[k - 1][0], legs[k][1] - legs[k - 1][1]) > 11) {
            problems.push(spot.id + '#' + i + ' long hop');
          }
        }
      });
    });
    KINGDOM_LOCATIONS.forEach(loc => {
      if ((perDistrict[loc.id] || 0) < 3) problems.push(loc.id + ' has few spots');
    });

    /* Night: fire types and light-makers glow above the tint; others sleep. */
    kingdomGo('hearth');
    KINGDOM_PHASE_OVERRIDE = 'night';
    KINGDOM_WEATHER_SET = true;
    KINGDOM_WEATHER = 'clear';
    kingdomApplyAtmosphere();
    const glowTraits = [4, 37, 181, 609].map(id => !!kingdomTraits(id).glow);
    const plainTraits = [1, 25, 133].map(id => !!kingdomTraits(id).glow);
    const actor = KINGDOM_ACTORS.find(row => !row.trip) || KINGDOM_ACTORS[0];
    actor.trip = null;
    const fakeFire = { entry: actor.entry, el: actor.el, x: actor.x, y: actor.y, lift: 0,
      location: actor.location, traits: kingdomTraits(4) };
    kingdomGlowEnsure(fakeFire);
    kingdomPaint(fakeFire);
    const haloLit = !!fakeFire.halo && !!fakeFire.halo.parentNode && parseInt(fakeFire.el.style.zIndex, 10) > 5200;
    kingdomGlowRemove(fakeFire);
    actor.el.classList.remove('glows', 'glow-flame');
    kingdomActCancel(actor, false);
    const asleep = kingdomStartSleep(actor, performance.now(), true);
    kingdomLifeTick(actor, performance.now() + 50, true, .05);
    const slept = asleep && actor.el.classList.contains('act-sleep') && !!actor.el.querySelector('.kingdom-zzz');
    kingdomActCancel(actor, false);
    kingdomPaint(actor);

    /* Rain: a fire type looks for shelter, a water type dances in it. */
    KINGDOM_PHASE_OVERRIDE = 'day';
    KINGDOM_WEATHER = 'rain';
    kingdomApplyAtmosphere();
    const choose = (id, want) => {
      const saved = actor.traits;
      actor.traits = kingdomTraits(id);
      let hits = 0;
      for (let i = 0; i < 200; i++) {
        kingdomActCancel(actor, false);
        kingdomDecide(actor, performance.now());
        if (actor.act && want.test(actor.act.spot.id + ' ' + actor.act.spot.motion)) hits++;
      }
      kingdomActCancel(actor, false);
      actor.traits = saved;
      return hits;
    };
    const firesShelter = choose(4, /shelter|rest/);
    const watersDance = choose(7, /raindance|dance/);
    KINGDOM_PHASE_OVERRIDE = null;
    KINGDOM_WEATHER_SET = false;
    kingdomApplyAtmosphere();

    /* Friendship grows meeting by meeting and is saved per pair. */
    const roster = kingdomRoster();
    const ea = roster[0], eb = roster[1];
    const a = { entry: ea, el: actor.el, location: actor.location, traits: kingdomTraits(ea.mon.id), rand: Math.random };
    const b = { entry: eb, el: actor.el, location: actor.location, traits: kingdomTraits(eb.mon.id), rand: Math.random };
    const store = kingdomBondsLoad();
    const id = kingdomBondId(ea, eb);
    delete store.pairs[id];
    for (let i = 0; i < 3; i++) {
      if (store.pairs[id]) store.pairs[id].t = 0;
      kingdomBondMeet(a, b, false);
    }
    const friends = kingdomBondLevel(kingdomBond(ea, eb)) === 1;
    const saved = !!(JSON.parse(localStorage.getItem(KINGDOM_BOND_KEY) || '{}').pairs || {})[id];

    /* Families: a pre-evolution knows its evolved relative. */
    const family = kingdomFamily(4).root === kingdomFamily(6).root &&
      kingdomFamily(4).stage < kingdomFamily(6).stage;

    /* Favourite haunts: water types head for the water more than others do. */
    let seed = 7;
    const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const share = (dexId, places) => {
      let hit = 0;
      for (let i = 0; i < 3000; i++) {
        if (places.includes(kingdomPickDestination('box-0-' + dexId, 'square', rand))) hit++;
      }
      return hit / 3000;
    };
    const waterShare = share(7, ['riverside', 'springs']);
    const plainShare = share(19, ['riverside', 'springs']);

    /* The forecast is the same for everyone at a given time, and rain is occasional. */
    let rainy = 0;
    for (let h = 0; h < 2000; h++) if (kingdomForecast(Date.UTC(2026, 0, 1) + h * 7200000) === 'rain') rainy++;
    const forecastSteady = kingdomForecast(1e12) === kingdomForecast(1e12);
    return { problems, glowTraits, plainTraits, haloLit, slept, firesShelter, watersDance, friends, saved,
      family, waterShare, plainShare, rainShare: rainy / 2000, forecastSteady };
  });
  if (lifeAudit.problems.length) {
    throw new Error('Kingdom activity spots are misplaced: ' + lifeAudit.problems.join(', '));
  }
  if (lifeAudit.glowTraits.includes(false) || lifeAudit.plainTraits.includes(true) || !lifeAudit.haloLit) {
    throw new Error('Night glow is wrong: ' + JSON.stringify(lifeAudit));
  }
  if (!lifeAudit.slept || lifeAudit.firesShelter < 8 || lifeAudit.watersDance < 8) {
    throw new Error('Night sleep or rain behaviour is missing: ' + JSON.stringify(lifeAudit));
  }
  if (!lifeAudit.friends || !lifeAudit.saved || !lifeAudit.family) {
    throw new Error('Friendships or families did not work: ' + JSON.stringify(lifeAudit));
  }
  if (lifeAudit.waterShare < lifeAudit.plainShare * 1.4) {
    throw new Error('Type favourites do not steer where Pokemon go: ' + JSON.stringify(lifeAudit));
  }
  if (!lifeAudit.forecastSteady || lifeAudit.rainShare < .08 || lifeAudit.rainShare > .3) {
    throw new Error('The rain forecast is unsteady or out of range: ' + JSON.stringify(lifeAudit));
  }

  /* Biographies: every resident gets one (with friendships rolled at random),
     hidden facts and diary moments turn up at random over time, and the panel
     lists everyone, opens a biography, and visits the resident. */
  const bioSetup = await page.evaluate(() => {
    const r = kingdomRoster();
    /* The friendship made by meeting above was written into both diaries. */
    const milestone = kingdomBio(r[0]).diary.some(line => /^Became friends with /.test(line.text));
    const bonds = kingdomBondsLoad();
    Object.keys(bonds.pairs).forEach(id => delete bonds.pairs[id]);
    KINGDOM_BIOS = { v: 1, mons: {} };
    KINGDOM_BIO_TICK_AT = 0;
    kingdomBiosTick(Date.now());
    const bios = Object.values(KINGDOM_BIOS.mons);
    const friendships = Object.values(bonds.pairs).filter(b => kingdomBondLevel(b) >= 1 || b.r >= 3).length;
    /* Three hours away with every minute lucky: three new things, never more. */
    kingdomTravelSettle(r[0], 'hill', null);
    kingdomTravelSettle(r[1], 'orchard', null);
    const bio = kingdomBio(r[0]);
    const before = bio.diary.length;
    bio.at -= 180 * 60000;
    const rate = KINGDOM_BIO_RATE;
    KINGDOM_BIO_RATE = 1;
    KINGDOM_BIO_TICK_AT = 0;
    kingdomBiosTick(Date.now());
    KINGDOM_BIO_RATE = rate;
    kingdomBioDiscover(r[0], bio, Date.now());
    bonds.pairs[kingdomBondId(r[0], r[1])] = { n: 10, r: 0, t: 0 };
    kingdomBondsSave();
    kingdomBiosSave();
    const saved = JSON.parse(localStorage.getItem(KINGDOM_BIO_KEY) || '{}').mons || {};
    kingdomGo('square');
    renderKingdom();
    return {
      milestone, bios: bios.length, started: bios.every(b => b.started), friendships,
      added: bio.diary.length - before,
      sorted: bio.diary.every((line, i) => !i || bio.diary[i - 1].t >= line.t),
      oldest: Math.min(...bio.diary.map(line => line.t)),
      saved: Object.keys(saved).length,
      keys: r.slice(0, 2).map(kingdomPlacementKey),
      names: r.slice(0, 2).map(entry => monName(entry.mon))
    };
  });
  if (!bioSetup.milestone || bioSetup.bios !== 38 || !bioSetup.started || bioSetup.friendships < 5 ||
      bioSetup.added < 3 || !bioSetup.sorted || bioSetup.saved !== 38 ||
      bioSetup.oldest > Date.now() - 2 * 60000) {
    throw new Error('Biographies were not written, rolled or saved: ' + JSON.stringify(bioSetup));
  }
  await page.locator('.kingdom-bios-open').click();
  const bioList = await page.evaluate(() => {
    const box = document.getElementById('kingdom-bios');
    return {
      open: box.open,
      cards: box.querySelectorAll('.kingdom-bio-card').length,
      summary: document.getElementById('kingdom-bios-sum').textContent,
      fits: box.getBoundingClientRect().bottom <= innerHeight
    };
  });
  if (!bioList.open || bioList.cards !== 38 || !/^38 residents · \d+ friendships$/.test(bioList.summary) || !bioList.fits) {
    throw new Error('Biographies list is wrong: ' + JSON.stringify(bioList));
  }
  const bioQuery = bioSetup.names[0].slice(0, 3).toLowerCase();
  await page.fill('.kingdom-bios-search input', bioQuery);
  const bioFound = await page.locator('.kingdom-bio-card b').allTextContents();
  if (!bioFound.length || bioFound.length === 38 || !bioFound.every(name => name.toLowerCase().includes(bioQuery))) {
    throw new Error('Biographies search did not filter by name: ' + JSON.stringify(bioFound));
  }
  await page.fill('.kingdom-bios-search input', '');
  await page.screenshot({ path: 'tmp/kingdom-bios-list-preview.png' });
  await page.locator('#kingdom-bios [data-bio="' + bioSetup.keys[0] + '"]').click();
  const bioView = await page.evaluate(() => {
    const body = document.getElementById('kingdom-bios-body');
    const sections = [...body.querySelectorAll('.kingdom-bio section')];
    return {
      name: body.querySelector('.kingdom-bio-hero h4').textContent,
      sections: sections.map(s => s.querySelector('h5').firstChild.textContent.trim()),
      profile: sections[0].querySelectorAll('dd').length,
      found: sections[1].querySelectorAll('.kingdom-bio-facts > div:not(.hidden)').length,
      hidden: [...sections[1].querySelectorAll('.kingdom-bio-facts > .hidden dd')].map(dd => dd.textContent),
      friends: [...sections[2].querySelectorAll('[data-bio]')].map(b => b.getAttribute('data-bio')),
      diary: body.querySelectorAll('.kingdom-bio-diary li').length,
      back: !document.querySelector('.kingdom-bios-back').hidden,
      search: document.querySelector('.kingdom-bios-search').hidden
    };
  });
  if (!bioView.name.startsWith(bioSetup.names[0]) || bioView.sections.join('|') !== 'Profile|Discovered|Friends|Diary' ||
      bioView.profile !== 6 || bioView.found < 1 || bioView.found + bioView.hidden.length !== 4 ||
      bioView.hidden.some(text => text !== '???') || !bioView.friends.includes(bioSetup.keys[1]) ||
      bioView.diary < 4 || !bioView.back || !bioView.search) {
    throw new Error('Biography page is wrong: ' + JSON.stringify(bioView));
  }
  await page.screenshot({ path: 'tmp/kingdom-bio-preview.png' });
  await page.locator('.kingdom-bio-friends [data-bio="' + bioSetup.keys[1] + '"]').click();
  if (await page.evaluate(() => KINGDOM_BIO_VIEW) !== bioSetup.keys[1]) {
    throw new Error('Tapping a friend did not open its biography');
  }
  await page.locator('.kingdom-bios-back').click();
  if (await page.evaluate(() => KINGDOM_BIO_VIEW) !== null) throw new Error('Back did not return to the list');
  await page.locator('#kingdom-bios [data-bio="' + bioSetup.keys[0] + '"]').click();
  await page.locator('.kingdom-bio-visit').click();
  const bioVisit = await page.evaluate(key => ({
    open: document.getElementById('kingdom-bios').open,
    location: KINGDOM_LOCATION,
    inspected: !!KINGDOM_INSPECTED && KINGDOM_INSPECTED.key === key
  }), bioSetup.keys[0]);
  if (bioVisit.open || bioVisit.location !== 'hill' || !bioVisit.inspected) {
    throw new Error('Visit did not take you to the resident: ' + JSON.stringify(bioVisit));
  }
  await page.locator('.kingdom-bio-link').click();
  if (await page.evaluate(() => document.getElementById('kingdom-bios').open && KINGDOM_BIO_VIEW) !== bioSetup.keys[0]) {
    throw new Error('Read biography in the inspector did not open that biography');
  }
  await page.keyboard.press('Escape');
  if (await page.evaluate(() => document.getElementById('kingdom-bios').open)) {
    throw new Error('Escape did not close the Biographies panel');
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('.kingdom-bios-open').click();
  await page.locator('#kingdom-bios [data-bio="' + bioSetup.keys[0] + '"]').click();
  await page.waitForTimeout(150);
  const bioMobile = await page.evaluate(() => {
    const box = document.getElementById('kingdom-bios').getBoundingClientRect();
    const parts = [...document.querySelectorAll('#kingdom-bios .kingdom-bio-hero, #kingdom-bios .kingdom-bio-facts > div, ' +
      '#kingdom-bios .kingdom-bio-friends button, #kingdom-bios .kingdom-bio-diary li')];
    return {
      inside: box.left >= 0 && box.right <= innerWidth && box.bottom <= innerHeight,
      partsFit: parts.every(el => el.scrollWidth <= el.clientWidth + 1 && el.getBoundingClientRect().right <= box.right),
      overflow: document.documentElement.scrollWidth > innerWidth
    };
  });
  if (!bioMobile.inside || !bioMobile.partsFit || bioMobile.overflow) {
    throw new Error('Biographies do not fit a phone: ' + JSON.stringify(bioMobile));
  }
  await page.screenshot({ path: 'tmp/kingdom-bio-mobile-preview.png' });
  await page.locator('#kingdom-bios .kingdom-close').click();
  await page.setViewportSize({ width: 1280, height: 900 });

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
    KINGDOM_WEATHER_SET = true;
    KINGDOM_WEATHER = 'clear';
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
  const mobileMapping = await page.evaluate(() => KINGDOM_ACTORS.every(actor =>
    Math.abs(parseFloat(actor.el.style.left) - (actor.x * 2.222222 - 61.111111)) < .05));
  if (!mobileMapping) throw new Error('Residents do not line up with the cropped town picture on mobile');
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
  console.log('PASS Kingdom: 10 districts, collision-safe roaming, activity spots, gym routes, glow, sleep, ' +
    'rain, bonds, biographies, families, favourites, music, lanterns, mobile fit.');
  await browser.close();
})().catch(err => {
  console.error(err);
  process.exit(1);
});
