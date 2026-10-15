/* README screenshots of Pokémon Kingdom life: staged scenes in the Kingdom
   Sandbox (its own storage, so no save is touched), one per district mood.
   Start the local server, then run:
     node tools/capture-kingdom-showcase.cjs http://127.0.0.1:8780/ [scene,scene]
   Writes docs/screenshots/kingdom-<scene>.jpg. */
const fs = require('fs');
const path = require('path');
const { chromium } = require('./playwright.cjs');
const out = path.join(path.resolve(__dirname, '..'), 'docs', 'screenshots');
const base = (process.argv[2] || 'http://127.0.0.1:8780/').replace(/\/?$/, '/');
const only = process.argv[3] ? process.argv[3].split(',') : null;

/* cast rows: [species, spot or ambient id or 'sleep' or null, seat, [x, y] to stand at] */
const SCENES = [
  { name: 'day', loc: 'green', phase: 'day', weather: 'clear', cast: [
    [7, 'green-pool', 0], [54, 'green-drink', 0], [25, 'green-stones', 0], [1, 'green-stream', 0],
    [16, 'green-shelter', 0], [133, 'chase', 0, [44, 60]], [37, 'puff', 0, [56, 56]], [39, 'sing', 0, [64, 66]],
    [143, 'sit', 0, [33, 62]], [52, 'sniff', 0, [50, 72]]] },
  { name: 'night', loc: 'hill', phase: 'night', weather: 'clear', cast: [
    [35, 'hill-bell', 0], [313, 'stargaze', 0, [56, 74]], [197, null, 0, [70, 52]], [64, 'hill-terrace', 0],
    [7, 'hill-pond', 0], [25, 'sleep', 0, [38, 66]], [133, 'sleep', 0, [82, 58]], [37, null, 0, [48, 52]],
    [181, null, 0, [24, 52]], [92, 'fade', 0, [20, 70]]] },
  { name: 'springs', loc: 'springs', phase: 'night', weather: 'clear', cast: [
    [7, 'springs-soak', 0], [25, 'springs-soak', 1], [133, 'springs-soak', 2], [143, 'springs-soak', 3],
    [4, 'springs-circle', 0], [37, 'springs-circle', 1], [77, null, 0, [70, 62]], [1, 'springs-pavilion', 0]] },
  { name: 'gym', loc: 'gym', phase: 'day', weather: 'clear', cast: [
    [66, 'climb', 0], [56, 'bags', 0], [106, 'balance', 0], [107, 'hurdles', 0], [68, 'spar', 0],
    [296, 'weights', 0], [447, 'gym-pavilion', 0]] },
  { name: 'hearth', loc: 'hearth', phase: 'dusk', weather: 'clear', cast: [
    [4, 'hearth-firepit', 0], [25, 'hearth-firepit', 1], [133, 'hearth-firepit', 3], [1, 'hearth-firepit', 4],
    [43, 'hearth-garden', 0], [52, 'hearth-doorstep', 0], [7, 'hearth-creek', 0], [16, 'hearth-bridge', 0]] },
  { name: 'rain', loc: 'green', phase: 'day', weather: 'rain', cast: [
    [4, 'green-shelter', 0], [25, 'green-shelter', 1], [133, 'green-shelter', 2], [7, 'raindance', 0, [46, 58]],
    [1, 'raindance', 0, [58, 64]], [52, 'huddle', 0, [32, 60]], [16, 'shake', 0, [70, 70]], [129, 'karp', 0, [40, 74]]] }
];

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ headless: true,
    executablePath: process.env.STUDYMON_BROWSER || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1500 }, deviceScaleFactor: 2 });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(base + 'kingdom-sandbox.html');
  for (const scene of SCENES) {
    if (only && only.indexOf(scene.name) < 0) continue;
    const notes = await page.evaluate(scene => {
      localStorage.removeItem(KINGDOM_TRAVEL_KEY);
      localStorage.removeItem(KINGDOM_BOND_KEY);
      KINGDOM_TRAVEL = null;
      KINGDOM_BONDS = null;
      KINGDOM_PHASE_OVERRIDE = scene.phase;
      KINGDOM_WEATHER_SET = true;
      KINGDOM_WEATHER = scene.weather;
      KINGDOM_MUSIC_ON = false;
      KINGDOM_RAIN_SOUND = false;
      SANDBOX.mons = [];
      SANDBOX.travel = false;
      scene.cast.forEach(row => sandboxAdd(row[0]));
      sandboxSave();
      kingdomRoster().forEach(entry => kingdomTravelSettle(entry, scene.loc, null));
      KINGDOM_LOCATION = scene.loc;
      renderKingdom();
      const notes = [];
      const now = performance.now();
      scene.cast.forEach((row, i) => {
        const actor = KINGDOM_ACTORS[i];
        if (!actor) { notes.push('missing ' + row[0]); return; }
        kingdomActCancel(actor, false);
        actor.nextTurn = Infinity;
        if (row[3]) { actor.x = row[3][0]; actor.y = row[3][1]; kingdomPaint(actor); }
        if (!row[1]) return;
        const spot = kingdomSpot(row[1]);
        let ok;
        if (spot) {
          const seat = spot.seats[row[2] || 0];
          const start = seat.from || seat.at;
          actor.x = start[0]; actor.y = start[1];
          ok = kingdomActStart(actor, spot, row[2] || 0, { dur: 600000, quiet: true });
        } else if (row[1] === 'sleep') {
          ok = kingdomStartSleep(actor, now, true) !== false;
          if (actor.act) actor.act.until = now + 600000;
        } else {
          ok = kingdomAmbientStart(actor, row[1], now, { dur: 600000, quiet: true });
        }
        if (!ok) notes.push('could not start ' + row[1]);
        /* Settle straight into the activity rather than walking there. */
        for (let k = 0; k < 40 && actor.act && actor.act.phase !== 'do'; k++) kingdomLifeTick(actor, now + k * 4000, true, 16);
      });
      return notes;
    }, scene);
    await page.waitForTimeout(3200);
    const file = path.join(out, 'kingdom-' + scene.name + '.jpg');
    await page.locator('#kingdom-stage').screenshot({ path: file, type: 'jpeg', quality: 82 });
    console.log('wrote', path.relative(process.cwd(), file), notes.length ? notes.join('; ') : '');
  }
  await browser.close();
  if (errors.length) {
    console.error('Page errors:\n' + errors.join('\n'));
    process.exit(1);
  }
})().catch(e => { console.error(e); process.exit(1); });
