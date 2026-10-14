/* Midterm route: preserve the bank, reuse all Chapters 1–10, keep draws inside
   the selected syllabus, and play its map, drill and catch flows in fresh storage.
   Optional first argument overrides the local server URL. */
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { chromium } = require('./playwright.cjs');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'output', 'midterm-route');
const url = process.argv[2] || 'http://127.0.0.1:8780/';
function check(name, condition, detail) {
  assert(condition, name + (detail ? ': ' + detail : ''));
  console.log('PASS  ' + name + (detail ? ' [' + detail + ']' : ''));
}

// Evaluate only the curriculum and route data, comparing the bank before and after.
const data = { window: null, console, localStorage: { getItem: () => null, setItem: () => {} } };
data.window = data;
vm.createContext(data);
const scripts = [...fs.readFileSync(path.join(root, 'index.html'), 'utf8')
  .matchAll(/<script src="([^"?]+)[^"]*"/g)].map(m => m[1]);
let before, baseline;
for (const file of scripts) {
  if (!file.startsWith('js/data/')) continue;
  if (file === 'js/data/questions/cs159-midterm.js') baseline = Object.values(data.QBANK).flat().map(q => JSON.stringify(q));
  if (file === 'js/data/c-midterm.js') before = JSON.stringify(data.QBANK);
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), data, { filename: file });
  if (file === 'js/data/c-midterm.js') break;
}
check('adding the route leaves every existing question unchanged', before === JSON.stringify(data.QBANK));
const route = data.C_REVISION_ROUTES[0];
const original = Object.values(data.QBANK).flat();
const originalIds = new Set(original.map(q => q.id));
const originalSerialized = new Set(original.map(q => JSON.stringify(q)));
check('all 1025 existing questions retain their IDs and content',
  baseline.length === 1025 && baseline.every(q => originalSerialized.has(q)));
check('every uploaded exercise is included once',
  route.questionIds.length === 82 && data.C_MIDTERM_SOURCES.every(source =>
    source.questionIds.every(id => route.questionIds.includes(id))));
check('every supplemental ID exists and appears once',
  route.questionIds.every(id => originalIds.has(id)) && new Set(route.questionIds).size === route.questionIds.length);
check('the C bank still contains exactly 1107 questions and no synthetic chapter',
  original.length === 1107 && !data.QBANK[route.n]);

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ headless: true,
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 }, reducedMotion: 'reduce' });
  try {
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(url);
    await page.waitForFunction(() => typeof freshSave === 'function' && installSubjects.done);
    await page.evaluate(() => {
      S = freshSave(); bindProgress('c'); S.settings.sound = false;
      S.party = [makeMon(6, 35)]; ensureBag(); S.money = 99999; buyItem('ultra', 30);
      S.badges = {}; showScreen('map'); renderMap();
    });
    const result = await page.evaluate(() => {
      const c = chapterByNumber(91), pool = routeQuestions(91), all = allQuestions();
      const ids = new Set(pool.map(q => q.id));
      const originalById = new Map(all.map(q => [q.id, q]));
      const included = { 'c7-01': 1, 'c7-02': 1, 'c10-03': 1, 'c10-19': 1, 'c11-22': 1 };
      const excluded = { 'c12-01': 1, 'c13-01': 1, 'c14-01': 1, 'c15-01': 1 };
      let drawEscapes = 0, unreachable = 0;
      const priorBank = JSON.stringify(QBANK);
      for (let i = 0; i < 1000; i++) {
        if (!ids.has(pickQuestion(c.chapters, 1 + i % 4, {}, null, pool).q.id)) drawEscapes++;
      }
      // Every selected card remains reachable, even when the rest were asked.
      const excludedIds = Object.fromEntries(pool.map(q => [q.id, true]));
      pool.forEach(q => {
        delete excludedIds[q.id];
        if (pickQuestion(c.chapters, q.t, excludedIds, null, pool).q !== q) unreachable++;
        excludedIds[q.id] = true;
      });
      const table = routeSpecies(c);
      const source = new Map([1,2,3,4,5].flatMap(n => routeSpecies(chapterByNumber(n)))
        .map(r => [r.id, r.rarity]));
      let sampled = new Set(), invalidEncounter = false;
      const random = Math.random;
      try {
        for (let i = 0; i < 4096; i++) {
          Math.random = () => (i + 0.5) / 4096;
          const wild = wildFor(c); sampled.add(wild.id);
          if (!table.some(r => r.id === wild.id)) invalidEncounter = true;
        }
      } finally { Math.random = random; }
      // A progressed save must still draw only from Routes 1–5, even on a roaming roll.
      const badges = S.badges;
      let progressedEscapes = 0;
      try {
        S.badges = { 1:true, 2:true, 3:true, 4:true, 5:true };
        Math.random = () => 0;
        for (let i = 0; i < 20; i++) if (!source.has(wildFor(c).id)) progressedEscapes++;
      } finally { S.badges = badges; Math.random = random; }
      return {
        size: pool.length, bankSize: all.length, unique: ids.size === pool.length,
        full: [1,2,3,4,5,6,7,8,9,10].every(n => QBANK[n].every(q => ids.has(q.id))),
        originalObjects: pool.every(q => originalById.get(q.id) === q),
        extras: c.questionIds.every(id => ids.has(id)),
        included: Object.keys(included).every(id => ids.has(id)),
        plain: pool.filter(q => q.source).every(q => !/CS159 practice|Lecture \d/.test(q.q + q.tag)),
        excluded: Object.keys(excluded).every(id => !ids.has(id)),
        drawEscapes, unreachable, unchanged: priorBank === JSON.stringify(QBANK),
        pokemon: table.length, uniquePokemon: new Set(table.map(r => r.id)).size,
        sourceCount: source.size, sourceMatches: table.length === source.size &&
          table.every(r => source.get(r.id) === r.rarity), progressedEscapes,
        previewMatches: c.previewSpecies.every(id => source.has(id)),
        validPokemon: table.every(r => !!dexOf(r.id) && !dexOf(r.id).custom && !dexOf(r.id).legendary),
        invalidEncounter, sampled: sampled.size, gyms: CHAPTERS.length,
        byChapter: Object.fromEntries([...new Set(pool.map(q => q.chapter))].map(n => [n, pool.filter(q => q.chapter === n).length]))
      };
    });
    check('the route contains all of Chapters 1–10', result.full, JSON.stringify(result.byChapter));
    check('787 unique questions reuse their bank objects and all supplemental IDs',
      result.size === 787 && result.unique && result.originalObjects && result.extras);
    check('file I/O, heap allocation and string libraries are included; later unrelated chapters stay outside', result.included && result.excluded);
    check('new exercises show plain question labels', result.plain);
    check('all 787 questions can be drawn and 1000 mixed draws stay inside the syllabus',
      result.unreachable === 0 && result.drawEscapes === 0 && result.unchanged);
    check('all 60 Pokemon from Routes 1–5 retain their source rarities and are catchable',
      result.sourceCount === 60 && result.sourceMatches && result.uniquePokemon === result.sourceCount &&
      result.validPokemon && !result.invalidEncounter && result.sampled === result.sourceCount);
    check('five badges and a roaming roll cannot introduce an outside species', result.progressedEscapes === 0);
    check('the card previews only Pokemon from Routes 1–5', result.previewMatches);
    check('the route adds no gym or question-bank chapter', result.gyms === 15 && result.bankSize === 1107);

    const card = page.locator('.midterm-route');
    check('the map exposes the route with no badges', await card.isVisible());
    check('the revision route sits once between Chapters 7 and 8', await page.evaluate(() => {
      const card = document.querySelector('.midterm-route');
      return document.querySelectorAll('.midterm-route').length === 1 && card.parentElement.classList.contains('maplist') &&
        card.previousElementSibling.querySelector('.ttl').textContent.startsWith('Ch 7 ·') &&
        card.nextElementSibling.querySelector('.ttl').textContent.startsWith('Ch 8 ·');
    }));
    await card.screenshot({ path: path.join(out, 'desktop-card.png') });
    await card.getByRole('button', { name: 'Route info', exact: true }).click();
    check('route info advertises the same 60 Pokemon and 787 questions',
      await page.locator('#modal .routecell').count() === result.sourceCount &&
      (await page.locator('#modal .question-base').innerText()).includes('/787'));
    await page.locator('#modal').getByRole('button', { name: 'See all questions' }).click();
    check('the complete catalog keeps the chapter labels',
      await page.locator('#modal .question-entry').count() === 787 &&
      (await page.locator('#modal .question-entry-meta').last().innerText()).includes('Ch '));
    await page.locator('#modal').getByRole('button', { name: 'Close', exact: true }).click();

    await card.getByRole('button', { name: 'Drill', exact: true }).click();
    check('the drill identifies the midterm route and uses the complete pool',
      (await page.locator('#s-drill h2').innerText()) === 'Midterm Revision Route' &&
      await page.evaluate(() => D.pool.length === 787));
    for (let i = 0; i < 12; i++) {
      const q = await page.evaluate(() => ({ id: D.q.id, kind: D.q.k, answer: D.q.a, chapter: D.q.chapter }));
      if (q.kind === 'fill') {
        await page.locator('#dfill').fill(String(q.answer[0]));
        await page.locator('#s-drill').getByRole('button', { name: 'Check', exact: true }).click();
      } else await page.locator('#dch' + q.answer).click();
      check('drill answer ' + (i + 1) + ' uses the original chapter and review entry',
        await page.evaluate(({ id, chapter }) => !!S.srs[id] && S.chapterStats[chapter].r > 0 &&
          !S.chapterStats[91] && D.pool.some(x => x.id === id), q));
      await page.locator('#dnext').click();
    }
    await page.locator('#s-drill').getByRole('button', { name: 'End session' }).click();
    await page.locator('#modal').getByRole('button', { name: 'Back to the map' }).click();
    check('the map shows shared question progress after drilling',
      !(await card.innerText()).includes('0/787'));

    await card.getByRole('button', { name: 'Wild battle', exact: true }).click();
    check('a catchable wild battle starts without badges and uses the exact revision pool',
      await page.evaluate(() => B.kind === 'wild' && B.title === 'Midterm Revision Route' &&
        B.pool.length === 787 && badgeCount() === 0));
    await page.locator('#quiz .move').first().click();
    check('attacking draws from the revision pool',
      await page.evaluate(() => B.pool.some(q => q === B.q)));
    let q = await page.evaluate(() => ({ kind: B.q.k, answer: B.q.a }));
    if (q.kind === 'fill') {
      await page.locator('#fillin').fill(String(q.answer[0]));
      await page.locator('#quiz').getByRole('button', { name: 'Check', exact: true }).click();
    } else await page.locator('#ch' + q.answer).click();
    check('a battle answer reveals its existing explanation', await page.locator('#quiz .why').isVisible());
    // Start a fresh foe for the catch flow, then use real ball/answer/Continue controls.
    await page.evaluate(() => {
      B.over = true; goWild(91);
      // A wounded common resident makes this integration catch deterministic.
      B.foes[0] = makeMon(174, 35); foe().hp = 1; markSeen(foe().id); renderBattle(); showMoveMenu();
    });
    const species = await page.evaluate(() => foe().id);
    for (let attempt = 0; attempt < 10; attempt++) {
      await page.locator('#quiz button[onclick="openBallMenu()"] ').click();
      await page.locator('#quiz .ball-opt').filter({ hasText: 'Ultra Ball' }).click();
      check('catching also draws from the same selected pool',
        await page.evaluate(() => B.pool.some(q => q === B.q)));
      q = await page.evaluate(() => ({ kind: B.q.k, answer: B.q.a }));
      if (q.kind === 'fill') {
        await page.locator('#fillin').fill(String(q.answer[0]));
        await page.locator('#quiz').getByRole('button', { name: 'Check', exact: true }).click();
      } else await page.locator('#ch' + q.answer).click();
      await page.locator('#contbtn').click();
      await page.waitForFunction(() => B.over || !!document.querySelector('#quiz button[onclick="openBallMenu()"]'));
      if (await page.evaluate(() => B.caught)) break;
    }
    check('a real catch joins the party, updates the dex and consumes its ball',
      await page.evaluate(id => B.caught && S.caught[id] && S.party.some(m => m.id === id) && itemCount('ultra') < 30, species));
    check('the caught Pokemon belongs to this route',
      await page.evaluate(id => routeSpecies(chapterByNumber(91)).some(r => r.id === id), species));

    await page.evaluate(() => { closeModal(); B = null; showScreen('map'); renderMap(); });
    for (const order of ['weak', 'course']) {
      await page.evaluate(order => setMapOrder(order), order);
      check('the revision route stays immediately after Chapter 7 in ' + order + ' map order',
        await card.isVisible() && await page.evaluate(() =>
          document.querySelector('.midterm-route').previousElementSibling.querySelector('.ttl').textContent.startsWith('Ch 7 ·')));
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForFunction(() => !document.querySelector('#toast').classList.contains('on'));
    await page.evaluate(() => window.scrollTo(0,
      document.querySelector('.midterm-route').getBoundingClientRect().top + scrollY - 20));
    await card.screenshot({ path: path.join(out, 'mobile-card.png') });
    check('the mobile map and card fit the viewport', await page.evaluate(() => {
      const r = document.querySelector('.midterm-route').getBoundingClientRect();
      return r.left >= 0 && r.right <= innerWidth && document.documentElement.scrollWidth <= innerWidth;
    }));
    const region = await page.evaluate(() => {
      switchSubject('calc'); showScreen('map'); renderMap();
      const calc = { route: chapterByNumber(91).exam === 'x1', questions: routeQuestions(91).length,
        absent: !document.querySelector('.midterm-route') };
      switchSubject('c'); renderMap();
      return { calc, restored: chapterByNumber(91).revision && routeQuestions(91).length === 787 };
    });
    check('calculus keeps its own revision route and the C route returns after travel',
      region.calc.route && region.calc.questions > 0 && region.calc.absent && region.restored);
    await page.reload();
    await page.waitForFunction(() => typeof continueGame === 'function' && installSubjects.done);
    await page.locator('#s-title button[onclick="continueGame()"] ').click();
    check('shared route progress and catches survive reload', await page.evaluate(id =>
      activeSubject() === 'c' && S.caught[id] && routeQuestions(91).some(questionWasEncountered), species));
    check('the page raised no JavaScript errors', errors.length === 0, errors.join(' | '));
    console.log('Screenshots: ' + out);
  } finally {
    await context.close();
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
