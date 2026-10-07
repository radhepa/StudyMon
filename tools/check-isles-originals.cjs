/* The fifteen Converging Isles originals (1032-1046): data, evolutions, where
   they live, assets, cries, and the Kingdom Sandbox filter.
   Needs the local server:  node tools/check-isles-originals.cjs [baseUrl] */
const { chromium } = require('./playwright.cjs');
const BASE = (process.argv[2] || 'http://127.0.0.1:8780/').replace(/\/?$/, '/');
const results = [];
function check(name, ok, detail) {
  results.push({ name, ok });
  console.log((ok ? 'PASS  ' : 'FAIL  ') + name + (detail ? '  [' + detail + ']' : ''));
}

const ROSTER = [
  [1032, 'budloth', 'grass'], [1033, 'bromelaze', 'grass,ground'], [1034, 'canopodon', 'grass,ground'],
  [1035, 'cryoad', 'ice,poison'], [1036, 'rimecroak', 'ice,poison'],
  [1037, 'tallybara', 'normal,psychic'], [1038, 'kilnscarab', 'fire,bug'],
  [1039, 'drenchic', 'water,electric'], [1040, 'condusken', 'water,electric'], [1041, 'blitziken', 'water,electric'],
  [1042, 'fernip', 'bug,grass'], [1043, 'brackenwing', 'bug,grass'],
  [1044, 'cairnkid', 'rock,fairy'], [1045, 'cragibex', 'rock,fairy'],
  [1046, 'tumblerook', 'steel,flying']
];
// from, level, to
const EVOLUTIONS = [[1032, 16, 1033], [1033, 36, 1034], [1035, 30, 1036], [1039, 16, 1040],
  [1040, 36, 1041], [1042, 22, 1043], [1044, 32, 1045]];
// route -> first stages that live there (Calc routes past Evening Exam I only)
const HOMES = { 4: [1039], 5: [1035], 6: [1037, 1046], 7: [1042], 8: [1038], 9: [1032], 10: [1044] };

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
  });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(BASE);

    const r = await page.evaluate(async ({ ROSTER, EVOLUTIONS, HOMES }) => {
      S = freshSave();
      S.settings.sound = false;
      switchSubject('calc');
      const ids = ROSTER.map(row => row[0]);
      const dex = ids.map(dexOf);

      const evolved = EVOLUTIONS.map(([from, level, to]) => {
        const mon = makeMon(from, level - 1);
        const events = giveXp(mon, xpToNext(level - 1));
        return { from, to, got: mon.id, evolved: events.some(e => e.kind === 'evolve') };
      });

      // Where every new id appears, across both regions' tables.
      const seen = {};
      ['c', 'calc'].forEach(region => Object.keys(ENCOUNTERS[region]).forEach(route => {
        ENCOUNTERS[region][route].forEach(([id, rarity]) => {
          if (id >= 1032 && id <= 1046) (seen[id] = seen[id] || []).push(region + ':' + route + ':' + rarity);
        });
      }));

      const saved = Math.random;
      const forced = {};
      Object.keys(HOMES).forEach(route => HOMES[route].forEach(id => {
        const table = ENCOUNTERS.calc[route];
        ENCOUNTERS.calc[route] = [[id, 'uncommon']];
        Math.random = () => 0.5;
        forced[id] = wildFor(chapterByNumber(Number(route))).id;
        Math.random = saved;
        ENCOUNTERS.calc[route] = table;
      }));

      // Before Evening Exam I every route that holds one is shut.
      const blockedBefore = Object.keys(HOMES).map(n => !!gymBlockedBy(Number(n)));
      S.elite.x1 = true;
      const openAfterExam = [4, 5, 6].map(n => !gymBlockedBy(n));
      delete S.elite.x1;

      const sprite = async (kind, id) => {
        const img = new Image();
        img.src = spriteUrl(id, kind);
        try { await img.decode(); } catch (e) { return kind + '/' + id + ' failed'; }
        return img.naturalWidth === 96 && img.naturalHeight === 96 ? null : kind + '/' + id + ' ' + img.naturalWidth + 'x' + img.naturalHeight;
      };
      const spriteProblems = [];
      for (const id of ids) for (const kind of ['front', 'back', 'shiny']) {
        const p = await sprite(kind, id);
        if (p) spriteProblems.push(p);
      }
      const art = await Promise.all(ids.map(async id => (await fetch(artUrl(id))).ok));
      const cries = await Promise.all(ids.map(async id => (await fetch('assets/cries/' + id + '.ogg')).ok));
      const seats = ids.filter(id => !(SPRITE_SEAT_DATA.front[id] && SPRITE_SEAT_DATA.back[id]));

      const played = [];
      const SavedAudio = window.Audio;
      window.Audio = function (url) { played.push(url); return { pause() {}, play() { return Promise.resolve(); }, volume: 0 }; };
      S.settings.sound = true;
      ids.forEach(playCry);
      S.settings.sound = false;
      window.Audio = SavedAudio;

      return {
        dexLength: DEX.length,
        names: dex.map(d => d && d.name),
        types: dex.map(d => d && d.types.join(',')),
        statsOk: dex.map(d => d && Object.values(d.stats).reduce((a, b) => a + b, 0) === d.bst),
        tiers: dex.map(d => d && d.moves.map(m => m.tier).join(',')),
        custom: dex.map(d => d && d.custom === true && d.cry === true),
        evolved, seen, forced, blockedBefore, openAfterExam, spriteProblems,
        artMissing: ids.filter((id, i) => !art[i]),
        criesMissing: ids.filter((id, i) => !cries[i]),
        seats, played
      };
    }, { ROSTER, EVOLUTIONS, HOMES });

    check('the dex ends at the fifteen Isles originals', r.dexLength === 1046, String(r.dexLength));
    check('names are registered in order',
      r.names.join(',') === ROSTER.map(x => x[1]).join(','), r.names.join(','));
    check('types match the approved designs',
      r.types.join('/') === ROSTER.map(x => x[2]).join('/'), r.types.join(' / '));
    check('every stat line sums to its BST', r.statsOk.every(Boolean));
    check('every species has four moves in tiers 1-4', r.tiers.every(t => t === '1,2,3,4'), r.tiers.join(' '));
    check('every species is marked custom and has a cry', r.custom.every(Boolean));
    r.evolved.forEach(e => check(e.from + ' evolves into ' + e.to + ' at its level',
      e.evolved && e.got === e.to, e.got + ''));

    const expected = {};
    Object.keys(HOMES).forEach(route => HOMES[route].forEach(id => { expected[id] = 'calc:' + route + ':uncommon'; }));
    const wrong = Object.keys(r.seen).filter(id => r.seen[id].join('|') !== expected[id]);
    check('only first stages are wild, each on its one post-exam Calc route',
      wrong.length === 0 && Object.keys(r.seen).length === Object.keys(expected).length,
      wrong.map(id => id + '=' + r.seen[id].join('|')).join(' ') || Object.keys(r.seen).join(','));
    check('each route can create its original in a wild battle',
      Object.keys(r.forced).every(id => r.forced[id] === Number(id)), JSON.stringify(r.forced));
    check('every route that holds one is shut until Evening Exam I is sat',
      r.blockedBefore.every(Boolean), r.blockedBefore.join(','));
    check('routes 4-6 open once Evening Exam I is beaten', r.openAfterExam.every(Boolean), r.openAfterExam.join(','));
    check('front, back and shiny sprites are 96x96', r.spriteProblems.length === 0, r.spriteProblems.join(', '));
    check('artwork loads', r.artMissing.length === 0, r.artMissing.join(','));
    check('every sprite has a seat entry', r.seats.length === 0, r.seats.join(','));
    check('all fifteen cry files load', r.criesMissing.length === 0, r.criesMissing.join(','));
    check('playCry plays each species\' own cry',
      r.played.join(',') === ROSTER.map(x => 'assets/cries/' + x[0] + '.ogg').join(','), r.played.length + ' played');
    check('no page errors in the game', errors.length === 0, errors.join(' | '));

    const sandbox = await browser.newPage();
    const sandboxErrors = [];
    sandbox.on('pageerror', error => sandboxErrors.push(error.message));
    await sandbox.goto(BASE + 'kingdom-sandbox.html');
    await sandbox.selectOption('#sbx-type', 'originals');
    const listed = await sandbox.$$eval('#sbx-list .sbx-mon', cards => cards.map(c => Number(c.getAttribute('data-id'))));
    check('the Sandbox originals filter lists all 21 StudyMon originals',
      listed.length === 21 && ROSTER.every(x => listed.includes(x[0])), listed.join(','));
    await sandbox.click('#sbx-list .sbx-mon[data-id="1039"]');
    await sandbox.waitForTimeout(400);
    const spawned = await sandbox.evaluate(() => SANDBOX.mons.some(row => row.mon.id === 1039));
    check('clicking Drenchic in the Sandbox puts it in the Kingdom', spawned);
    check('no page errors in the Sandbox', sandboxErrors.length === 0, sandboxErrors.join(' | '));
    await sandbox.evaluate(() => { if (typeof sandboxClear === 'function') sandboxClear(); });
  } finally {
    await browser.close();
  }
  const failed = results.filter(row => !row.ok);
  console.log('\n' + (results.length - failed.length) + '/' + results.length + ' checks passed');
  if (failed.length) process.exitCode = 1;
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
