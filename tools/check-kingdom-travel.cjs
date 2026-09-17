/* Audits Kingdom travel: path gates, itineraries, multi-district trips, and a
   real walk out of one picture and into the next. Run with a server on 8793
   (or pass a base URL): node tools/check-kingdom-travel.cjs [url] */
const { chromium } = require('./playwright.cjs');
const fs = require('fs');

const BASE = process.argv[2] || 'http://127.0.0.1:8793';

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
    localStorage.removeItem(KINGDOM_TRAVEL_KEY);
    KINGDOM_TRAVEL = null;
    showScreen('kingdom');
    renderKingdom();
  });

  /* Every path is two-way, every gate starts on open ground and ends off-picture,
     and every district pair has a walkable crossing. */
  const gates = await page.evaluate(() => {
    const bad = [];
    for (const loc of KINGDOM_LOCATIONS) {
      if (Object.keys(loc.gates).sort().join() !== loc.neighbors.slice().sort().join()) bad.push(loc.id + ': gates != neighbors');
      for (const id of loc.neighbors) {
        if (!kingdomLocation(id).neighbors.includes(loc.id)) bad.push(loc.id + '-' + id + ' one-way');
        const g = loc.gates[id];
        if (!kingdomIsWalkable(g[0][0], g[0][1], loc)) bad.push(loc.id + '>' + id + ' starts off the ground');
        const end = g[g.length - 1];
        if (!(end[0] < 0 || end[0] > 100 || end[1] < 0 || end[1] > 100)) bad.push(loc.id + '>' + id + ' ends inside picture');
      }
      for (const a of loc.neighbors) {
        for (const b of loc.neighbors) {
          if (a === b) continue;
          const route = kingdomSceneRoute(loc.id, a, b);
          const inner = kingdomFindPath(loc, loc.gates[a][0], loc.gates[b][0]);
          for (let i = 1; i < inner.length; i++) {
            if (!kingdomClearLine(inner[i - 1], inner[i], loc)) bad.push(loc.id + ' ' + a + '>' + b + ' cuts through scenery');
          }
          if (kingdomLineLength(route) > 400) bad.push(loc.id + ' ' + a + '>' + b + ' absurd route');
        }
      }
    }
    return bad;
  });
  if (gates.length) throw new Error('Path gate problems: ' + gates.join('; '));

  /* Itineraries: stays span 5 min .. 3 days, trips follow the town graph,
     and replaying the same Pokemon twice gives the same story. */
  const sim = await page.evaluate(() => {
    const entry = kingdomRoster()[4];
    const key = kingdomPlacementKey(entry);
    const t0 = Date.parse('2026-09-01T00:00:00Z');
    const run = () => {
      const st = kingdomFreshState(key, entry, t0);
      const log = [];
      let at = t0;
      while (at < t0 + 30 * 86400000) {
        at = st.until;
        kingdomTravelAdvance(key, st, at);
        log.push(st.trip ? 'T' + st.trip.path.join('>') : 'S' + st.loc + '@' + st.until);
      }
      return log;
    };
    const a = run(), b = run();
    const stays = [];
    const hops = [];
    let multi = 0;
    for (let n = 0; n < 400; n++) {
      const rand = kingdomTravelRand('probe', n);
      stays.push(kingdomStayMs('probe-' + (n % 40), rand));
      const from = KINGDOM_LOCATIONS[n % 6].id;
      const trip = kingdomPlanTrip('probe', from, null, 0, rand);
      if (trip.path.length > 2) multi++;
      for (let i = 1; i < trip.path.length; i++) {
        hops.push(kingdomLocation(trip.path[i - 1]).neighbors.includes(trip.path[i]));
      }
      if (trip.legs[0].kind !== 'leave' || trip.legs[trip.legs.length - 1].kind !== 'arrive') hops.push(false);
    }
    return {
      same: a.join() === b.join(), events: a.length,
      minStay: Math.min(...stays), maxStay: Math.max(...stays),
      median: stays.sort((x, y) => x - y)[200],
      hopsOk: hops.every(Boolean), multi
    };
  });
  if (!sim.same) throw new Error('Itinerary is not deterministic');
  if (sim.minStay < 5 * 60000 || sim.maxStay > 3 * 86400000 || sim.maxStay < 86400000 || sim.median > 3600000) {
    throw new Error('Stay lengths out of range: ' + JSON.stringify(sim));
  }
  if (!sim.hopsOk || sim.multi < 50) throw new Error('Trips do not follow the town paths: ' + JSON.stringify(sim));

  /* Hovering a town-map button must not move it (the button skin's hover
     transform used to fight the centring and made nodes shake). */
  const mapNode = page.locator('.kingdom-map-node[data-kingdom-loc="hill"]');
  await mapNode.scrollIntoViewIfNeeded();
  const nodeBefore = await mapNode.boundingBox();
  await page.mouse.move(nodeBefore.x + nodeBefore.width / 2, nodeBefore.y + nodeBefore.height / 2);
  await page.waitForTimeout(250);
  const nodeAfter = await mapNode.boundingBox();
  const stillHovered = await mapNode.evaluate(el => el.matches(':hover'));
  if (!stillHovered || Math.abs(nodeAfter.x - nodeBefore.x) > .5) {
    throw new Error('Town map button moves when hovered');
  }
  await page.mouse.move(0, 0);

  /* Census accounts for everyone exactly once. */
  const census = await page.evaluate(() => {
    const c = kingdomTownCensus(Date.now());
    const keys = Object.values(c.groups).flat().concat(c.road).map(kingdomPlacementKey);
    return { total: keys.length, unique: new Set(keys).size };
  });
  if (census.total !== 38 || census.unique !== 38) throw new Error('Census lost or doubled a Pokemon: ' + JSON.stringify(census));

  /* A real walk: Pikachu leaves Green, is seen on the town map, crosses the
     Riverside picture, and arrives on Moonbell Hill. */
  const start = await page.evaluate(() => {
    kingdomGo('square');
    kingdomGo('green');
    const pika = kingdomRoster().find(e => e.mon.id === 25);
    kingdomTravelSettle(pika, 'green', { x: 50, y: 60 });
    renderKingdom();
    const actor = KINGDOM_ACTORS.find(a => a.entry.mon.id === 25);
    kingdomInspect(actor);
    kingdomMoveInspected('hill');
    document.getElementById('kingdom-stage').scrollIntoView({ block: 'center' });
    const st = actor.entry.state;
    return { trip: !!actor.trip, path: st.trip.path, legs: st.trip.legs.map(l => [l.kind, l.start, l.end]) };
  });
  if (!start.trip) throw new Error('Pikachu did not start walking');
  const legEnd = kind => start.legs.find(l => l[0] === kind);
  await page.waitForTimeout(2500);
  await page.screenshot({ path: 'tmp/kingdom-travel-1-leaving.png' });
  const leaving = await page.evaluate(() => {
    const a = KINGDOM_ACTORS.find(x => x.entry.mon.id === 25);
    return a && { x: a.x, y: a.y, opacity: a.el.style.opacity, story: document.getElementById('kingdom-story').textContent };
  });
  if (!leaving) throw new Error('Pikachu vanished instead of walking');
  const leave = legEnd('leave');
  await page.waitForTimeout(Math.max(0, leave[2] - Date.now()) + 2500);
  const gone = await page.evaluate(() => ({
    onStage: KINGDOM_ACTORS.some(a => a.entry.mon.id === 25),
    onMap: !!document.querySelector('#kingdom-map-walkers img'),
    road: document.getElementById('kingdom-road-count').textContent
  }));
  await page.screenshot({ path: 'tmp/kingdom-travel-2-map.png' });
  if (gone.onStage || !gone.onMap) throw new Error('Pikachu did not leave Green for the road: ' + JSON.stringify(gone));

  const cross = start.legs.find(l => l[0] === 'cross' || l[0] === 'arrive');
  const crossLoc = start.path[1];
  await page.evaluate(id => kingdomGo(id), crossLoc);
  await page.waitForTimeout(Math.max(0, cross[1] - Date.now()) + (cross[2] - cross[1]) * .35);
  const crossing = await page.evaluate(() => {
    const a = KINGDOM_ACTORS.find(x => x.entry.mon.id === 25);
    return a && { kind: a.trip && a.trip.kind, x: a.x, y: a.y, story: document.getElementById('kingdom-story').textContent };
  });
  await page.screenshot({ path: 'tmp/kingdom-travel-3-crossing.png' });
  if (!crossing || !crossing.kind) throw new Error('Pikachu was not seen walking through ' + crossLoc);

  const arrive = legEnd('arrive');
  await page.evaluate(() => kingdomGo('hill'));
  await page.waitForTimeout(Math.max(0, arrive[2] - Date.now()) + 1500);
  const arrived = await page.evaluate(() => {
    const a = KINGDOM_ACTORS.find(x => x.entry.mon.id === 25);
    return a && { trip: a.trip, walkable: kingdomIsWalkable(a.x, a.y, a.location) || !!kingdomNearestWalkable(a.x, a.y, a.location),
      where: kingdomWhere(a.entry.state, Date.now()).kind, loc: a.entry.state.loc };
  });
  await page.screenshot({ path: 'tmp/kingdom-travel-4-arrived.png' });
  if (!arrived || arrived.trip || arrived.where !== 'stay' || arrived.loc !== 'hill') {
    throw new Error('Pikachu did not settle on Moonbell Hill: ' + JSON.stringify(arrived));
  }

  /* Leaving and coming back replays from storage. */
  const persisted = await page.evaluate(() => {
    KINGDOM_TRAVEL = null;
    const pika = kingdomRoster().find(e => e.mon.id === 25);
    return kingdomTravelState(pika, Date.now()).loc;
  });
  if (persisted !== 'hill') throw new Error('Itinerary was not saved');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(200);
  if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) {
    throw new Error('Kingdom causes horizontal overflow on mobile');
  }
  await page.screenshot({ path: 'tmp/kingdom-travel-5-mobile.png', fullPage: true });

  if (errors.length) throw new Error('Browser errors: ' + errors.join(' | '));
  console.log('PASS Kingdom travel:', JSON.stringify({ path: start.path, leaving, crossing, sim }));
  await browser.close();
})().catch(err => {
  console.error(err);
  process.exit(1);
});
