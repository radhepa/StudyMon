/* Original StudyMon roster, asset, encounter and evolution checks. */
const { chromium } = require('./playwright.cjs');
const results = [];
function check(name, ok, detail) {
  results.push({ name, ok });
  console.log((ok ? 'PASS  ' : 'FAIL  ') + name + (detail ? '  [' + detail + ']' : ''));
}

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:8780/');

  const result = await page.evaluate(async () => {
    S = freshSave();
    S.settings.sound = false;
    switchSubject('calc');

    const family = [1026, 1027, 1028].map(dexOf);
    const abyssFamily = [1029, 1030, 1031].map(dexOf);
    const route = routeSpecies(chapterByNumber(3));

    const savedTable = ENCOUNTERS.calc[3];
    const savedRandom = Math.random;
    ENCOUNTERS.calc[3] = [[1026, 'common']];
    Math.random = () => 0.5;
    const wild = wildFor(chapterByNumber(3));
    ENCOUNTERS.calc[3] = [[1029, 'common']];
    const abyssWild = wildFor(chapterByNumber(3));
    Math.random = savedRandom;
    ENCOUNTERS.calc[3] = savedTable;

    const mon = makeMon(1026, 29);
    const firstEvents = giveXp(mon, xpToNext(29));
    const firstEvolution = mon.id;
    mon.lvl = 54;
    mon.xp = 0;
    mon.hp = maxHp(mon);
    const secondEvents = giveXp(mon, xpToNext(54));

    const abyss = makeMon(1029, 15);
    const abyssFirstEvents = giveXp(abyss, xpToNext(15));
    const abyssFirstEvolution = abyss.id;
    abyss.lvl = 35;
    abyss.xp = 0;
    abyss.hp = maxHp(abyss);
    const abyssSecondEvents = giveXp(abyss, xpToNext(35));

    const assetUrls = [];
    ['front', 'back', 'shiny', 'art'].forEach(kind => {
      [1026, 1027, 1028, 1029, 1030, 1031].forEach(id => assetUrls.push('assets/sprites/' + kind + '/' + id + '.png'));
    });
    const assets = await Promise.all(assetUrls.map(async url => ({
      url,
      ok: (await fetch(url)).ok
    })));
    const cryAssets = await Promise.all([1029, 1030, 1031].map(async id => ({
      url: 'assets/cries/' + id + '.ogg',
      ok: (await fetch('assets/cries/' + id + '.ogg')).ok
    })));
    const playedCryUrls = [];
    const SavedAudio = window.Audio;
    window.Audio = function (url) {
      playedCryUrls.push(url);
      return { pause() {}, play() { return Promise.resolve(); }, volume: 0 };
    };
    S.settings.sound = true;
    [1029, 1030, 1031].forEach(playCry);
    S.settings.sound = false;
    window.Audio = SavedAudio;

    return {
      dexLength: DEX.length,
      names: family.map(d => d && d.name),
      types: family.map(d => d && d.types),
      moveCounts: family.map(d => d && d.moves.length),
      tiers: family.map(d => d && d.moves.map(m => m.tier).join(',')),
      abyssNames: abyssFamily.map(d => d && d.name),
      abyssTypes: abyssFamily.map(d => d && d.types),
      abyssStatTotals: abyssFamily.map(d => d && Object.values(d.stats).reduce((sum, value) => sum + value, 0)),
      abyssBst: abyssFamily.map(d => d && d.bst),
      abyssMoveCounts: abyssFamily.map(d => d && d.moves.length),
      abyssTiers: abyssFamily.map(d => d && d.moves.map(m => m.tier).join(',')),
      abyssCries: abyssFamily.map(d => d && d.cry),
      playedCryUrls,
      abyssRouteEntry: route.find(row => row.id === 1029),
      abyssWildId: abyssWild.id,
      routeEntry: route.find(row => row.id === 1026),
      wildId: wild.id,
      firstEvolution,
      finalEvolution: mon.id,
      firstEvents: firstEvents.map(e => e.kind),
      secondEvents: secondEvents.map(e => e.kind),
      abyssFirstEvolution,
      abyssFinalEvolution: abyss.id,
      abyssFirstEvents: abyssFirstEvents.map(e => e.kind),
      abyssSecondEvents: abyssSecondEvents.map(e => e.kind),
      missingAssets: assets.filter(asset => !asset.ok).map(asset => asset.url),
      missingCries: cryAssets.filter(asset => !asset.ok).map(asset => asset.url)
    };
  });

  check('the three original StudyMon extend the roster',
    result.dexLength === 1031 && result.names.join(',') === 'papyrunt,codexal,lexidrake',
    result.dexLength + ' / ' + result.names.join(','));
  check('the family gains Dragon on its middle evolution',
    result.types[0].join(',') === 'psychic' &&
    result.types[1].join(',') === 'psychic,dragon' &&
    result.types[2].join(',') === 'psychic,dragon');
  check('every family member has four tiered moves',
    result.moveCounts.every(count => count === 4) &&
    result.tiers.every(tiers => tiers === '1,2,3,4'),
    result.tiers.join(' / '));
  check('Papyrunt is an uncommon Converging Isles Route 3 encounter',
    result.routeEntry && result.routeEntry.rarity === 'uncommon',
    JSON.stringify(result.routeEntry));
  check('Route 3 can create a Papyrunt wild battle', result.wildId === 1026, String(result.wildId));
  check('Papyrunt evolves into Codexal at level 30',
    result.firstEvolution === 1027 && result.firstEvents.includes('evolve'),
    result.firstEvolution + ' / ' + result.firstEvents.join(','));
  check('Codexal evolves into Lexidrake at level 55',
    result.finalEvolution === 1028 && result.secondEvents.includes('evolve'),
    result.finalEvolution + ' / ' + result.secondEvents.join(','));
  check('the Abyssqueak family is registered in order',
    result.abyssNames.join(',') === 'abyssqueak,trenchmaw,leviathorn',
    result.abyssNames.join(','));
  check('the Abyssqueak family changes from Water/Dark to Water/Dragon',
    result.abyssTypes[0].join(',') === 'water,dark' &&
    result.abyssTypes[1].join(',') === 'water,dark' &&
    result.abyssTypes[2].join(',') === 'water,dragon',
    result.abyssTypes.map(types => types.join(',')).join(' / '));
  check('Abyssqueak family stats match each declared BST',
    result.abyssStatTotals.join(',') === result.abyssBst.join(','),
    result.abyssStatTotals.join(',') + ' / ' + result.abyssBst.join(','));
  check('every Abyssqueak family member has four tiered moves',
    result.abyssMoveCounts.every(count => count === 4) &&
    result.abyssTiers.every(tiers => tiers === '1,2,3,4'),
    result.abyssTiers.join(' / '));
  check('every Abyssqueak family member enables its custom cry',
    result.abyssCries.every(Boolean),
    result.abyssCries.join(','));
  check('all three Abyssqueak family cry files load',
    result.missingCries.length === 0,
    result.missingCries.join(','));
  check('playCry selects each custom family audio asset',
    result.playedCryUrls.join(',') === 'assets/cries/1029.ogg,assets/cries/1030.ogg,assets/cries/1031.ogg',
    result.playedCryUrls.join(','));
  check('Abyssqueak is an uncommon Converging Isles Quiz 3 encounter',
    result.abyssRouteEntry && result.abyssRouteEntry.rarity === 'uncommon',
    JSON.stringify(result.abyssRouteEntry));
  check('Quiz 3 can create an Abyssqueak wild battle',
    result.abyssWildId === 1029,
    String(result.abyssWildId));
  check('Abyssqueak evolves into Trenchmaw at level 16',
    result.abyssFirstEvolution === 1030 && result.abyssFirstEvents.includes('evolve'),
    result.abyssFirstEvolution + ' / ' + result.abyssFirstEvents.join(','));
  check('Trenchmaw evolves into Leviathorn at level 36',
    result.abyssFinalEvolution === 1031 && result.abyssSecondEvents.includes('evolve'),
    result.abyssFinalEvolution + ' / ' + result.abyssSecondEvents.join(','));
  check('all front, back, shiny and artwork assets load',
    result.missingAssets.length === 0,
    result.missingAssets.join(','));
  check('no page errors', errors.length === 0, errors.join(' | '));

  await browser.close();
  const failed = results.filter(row => !row.ok);
  console.log('\n' + (results.length - failed.length) + '/' + results.length + ' checks passed');
  if (failed.length) process.exitCode = 1;
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
