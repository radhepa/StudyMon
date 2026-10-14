/* Session shiny odds, capture resets, and silent grace periods in isolated storage. */
const { chromium } = require('./playwright.cjs');
const results = [];
function check(name, ok, detail) {
  results.push({ name, ok });
  console.log((ok ? 'PASS  ' : 'FAIL  ') + name + (detail ? '  [' + detail + ']' : ''));
}
const near = (a, b) => Math.abs(a - b) < 1e-12;

(async () => {
  const browser = await chromium.launch({ headless: true,
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  try {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('http://127.0.0.1:8780/');
    await page.clock.install({ time: new Date('2026-10-13T18:00:00Z') });
    await page.clock.pauseAt(new Date('2026-10-13T18:00:10Z'));
    await page.evaluate(() => {
      S = freshSave(); bindProgress('c'); S.settings.sound = false;
      S.party = [makeMon(6, 50, { shiny: false })]; ensureBag();
    });

    let r = await page.evaluate(() => {
      const baseline = wildShinyRate();
      drill(1);
      const q = D.q;
      recordAnswer(q, true);
      const first = wildShinyRate();
      recordAnswer(q, false);
      const second = wildShinyRate();
      for (let i = 0; i < 48; i++) recordAnswer(q, i % 2 === 0);
      const halfway = wildShinyRate();
      for (let i = 0; i < 50; i++) recordAnswer(q, false);
      const cap = wildShinyRate();
      for (let i = 0; i < 20; i++) recordAnswer(q, true);
      return { baseline, first, second, halfway, cap, over: wildShinyRate(), answers: S.shinyStudy.answers,
        correct: S.shinyStudy.correct, total: S.shinyStudy.total };
    });
    check('starts at 1/1000 and rises evenly for both right and wrong answers',
      near(r.baseline, 0.001) && near(r.first, 0.00129) && near(r.second, 0.00158), JSON.stringify(r));
    check('50 mixed answers give 1.55%; 100 total answers reach and hold 3%',
      near(r.halfway, 0.0155) && near(r.cap, 0.03) && near(r.over, 0.03) && r.answers === 100);
    check('session accuracy continues counting beyond the 100-answer odds cap', r.correct === 45 && r.total === 120);

    r = await page.evaluate(() => {
      const old = Math.random;
      try {
        Math.random = () => 0.02;
        const boosted = makeMon(25, 5, { wild: true }).shiny;
        const base = makeMon(25, 5).shiny;
        const route = wildFor(chapterByNumber(1)).shiny;
        const legend = legendaryFor(chapterByNumber(1)).shiny;
        const fallback = wildFor({ n: -100, teamTypes: ['normal'], roaming: false }).shiny;
        const forcedOff = makeMon(25, 5, { wild: true, shiny: false }).shiny;
        const locked = DEX.find(d => d.shiny === false);
        const lockedShiny = locked && makeMon(locked.id, 5, { wild: true, shiny: true }).shiny;
        Math.random = () => 0.030001;
        return { boosted, base, route, legend, fallback, forcedOff, lockedShiny,
          beyondCap: makeMon(25, 5, { wild: true }).shiny };
      } finally { Math.random = old; }
    });
    check('boosted odds reach route, roaming and fallback wild encounters', r.boosted && r.route && r.legend && r.fallback, JSON.stringify(r));
    check('the cap, explicit overrides, shiny locks and ordinary creation are respected',
      !r.base && !r.forcedOff && !r.lockedShiny && !r.beyondCap);

    r = await page.evaluate(() => {
      resetShinyStudy(); drill(1);
      const q = D.q, choice = q.k === 'fill' ? q.a[0] : q.a;
      drillAnswer(choice, q.k === 'fill');
      drillAnswer(choice, q.k === 'fill');
      const drillAnswers = S.shinyStudy.answers;
      goWild(1); chooseMove(0);
      const bq = B.q, wrong = bq.k === 'fill' ? '__wrong__' : (bq.a + 1) % bq.c.length;
      answer(wrong, bq.k === 'fill'); answer(wrong, bq.k === 'fill');
      return { drillAnswers, total: S.shinyStudy.answers, wrong: B.wrongThisBattle,
        sessionCorrect: S.shinyStudy.correct, sessionTotal: S.shinyStudy.total };
    });
    check('real drill and battle submissions count once, including a wrong answer',
      r.drillAnswers === 1 && r.total === 2 && r.wrong === 1 && r.sessionCorrect === 1 && r.sessionTotal === 2, JSON.stringify(r));

    // Switching browser tabs leaves the study session open; homework can take
    // longer than the grace period for actually leaving the study screen.
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await page.clock.fastForward(10 * 60000);
    r = await page.evaluate(() => {
      const before = { correct: S.shinyStudy.correct, total: S.shinyStudy.total,
        answers: S.shinyStudy.answers, away: S.shinyStudy.awaySince };
      delete document.hidden;
      document.dispatchEvent(new Event('visibilitychange'));
      return { before, counter: $('#battle-session-count').textContent, rate: wildShinyRate() };
    });
    check('switching tabs for ten minutes preserves battle accuracy and shiny boost',
      r.before.correct === 1 && r.before.total === 2 && r.before.answers === 2 && r.before.away === 0 &&
      r.counter === '1 / 2' && near(r.rate, 0.00158), JSON.stringify(r));

    await page.evaluate(() => { showScreen('map'); renderMap(); });
    await page.clock.fastForward(10000);
    await page.evaluate(() => { showScreen('party'); renderParty(); });
    await page.clock.fastForward(9999);
    r = await page.evaluate(() => {
      const before = S.shinyStudy.answers;
      drill(1);
      return { before, after: S.shinyStudy.answers, away: S.shinyStudy.awaySince };
    });
    check('returning after 19.999 seconds preserves progress and cancels expiry', r.before === 2 && r.after === 2 && r.away === 0, JSON.stringify(r));
    await page.clock.fastForward(25000);
    check('an active study session survives longer than 20 seconds', await page.evaluate(() => S.shinyStudy.answers === 2));

    await page.evaluate(() => { showScreen('map'); renderMap(); });
    await page.clock.fastForward(10000);
    await page.evaluate(() => { showScreen('party'); renderParty(); });
    await page.clock.fastForward(10000);
    r = await page.evaluate(() => ({ answers: S.shinyStudy.answers,
      rate: wildShinyRate(), saved: JSON.parse(localStorage.getItem(SAVE_KEY)).shinyStudy.answers }));
    check('exactly 20 seconds away silently resets live and saved odds; menus do not extend grace',
      r.answers === 0 && r.saved === 0 && near(r.rate, 0.001), JSON.stringify(r));

    r = await page.evaluate(() => {
      drill(1); recordAnswer(D.q, false); recordAnswer(D.q, true);
      endDrill();
      return { answers: S.shinyStudy.answers, away: S.shinyStudy.awaySince > 0 };
    });
    check('ending a drill starts grace while the result is still open', r.answers === 2 && r.away);
    await page.clock.fastForward(20000);
    await page.evaluate(() => { closeModal(); drill(1); recordAnswer(D.q, false); });

    r = await page.evaluate(() => {
      const old = S.shinyStudy.answers;
      goStudy(1); const notes = S.shinyStudy.awaySince;
      showScreen('quests'); const labs = S.shinyStudy.awaySince;
      return { old, answers: S.shinyStudy.answers, notes, labs };
    });
    await page.clock.fastForward(25000);
    check('chapter notes and homework labs keep the study session active',
      r.notes === 0 && r.labs === 0 && await page.evaluate(() => S.shinyStudy.answers === 1));

    // Exercise tab visibility with its actual event handler without opening a second tab.
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await page.clock.fastForward(19999);
    r = await page.evaluate(() => {
      delete document.hidden;
      document.dispatchEvent(new Event('visibilitychange'));
      return { answers: S.shinyStudy.answers, away: S.shinyStudy.awaySince };
    });
    check('a briefly hidden tab resumes its active study session', r.answers === 1 && r.away === 0, JSON.stringify(r));

    r = await page.evaluate(() => {
      S.shinyStudy.answers = 60;
      const sessionBefore = { correct: S.shinyStudy.correct, total: S.shinyStudy.total };
      goWild(1);
      const rateBefore = wildShinyRate();
      const encountered = S.shinyStudy.answers;
      const old = rollCatch;
      try {
        rollCatch = () => ({ caught: false, shakes: 0, critical: false });
        foe().shiny = true; resolveCatch(true);
        const failed = S.shinyStudy.answers;
        rollCatch = () => ({ caught: true, shakes: 4, critical: false });
        foe().shiny = false; resolveCatch(true);
        const ordinary = S.shinyStudy.answers;
        closeModal(); goWild(1);
        S.party = Array.from({ length: 6 }, () => makeMon(6, 50, { shiny: false }));
        const boxBefore = S.box.length;
        foe().shiny = true; resolveCatch(false);
        const reset = wildShinyRate(), saved = JSON.parse(localStorage.getItem(SAVE_KEY)).shinyStudy.answers;
        const sessionKept = S.shinyStudy.correct === sessionBefore.correct && S.shinyStudy.total === sessionBefore.total;
        closeModal(); drill(1); recordAnswer(D.q, false);
        return { rateBefore, encountered, failed, ordinary, reset, saved, next: wildShinyRate(), sessionKept,
          box: S.box.length === boxBefore + 1 && S.box[S.box.length - 1].shiny };
      } finally { rollCatch = old; }
    });
    check('encountering a shiny, failed throws and ordinary catches keep the boost',
      r.encountered === 60 && r.failed === 60 && r.ordinary === 60, JSON.stringify(r));
    check('a shiny catch resets even into a full-party box, then the next answer rebuilds odds',
      near(r.reset, 0.001) && r.saved === 0 && r.box && near(r.next, 0.00129));
    check('catching a shiny preserves accuracy for the whole study session', r.sessionKept);

    await page.evaluate(() => { resetShinyStudyBoost(); showScreen('map'); renderMap(); });
    await page.clock.fastForward(19999);
    r = await page.evaluate(() => { drill(1); return { total: S.shinyStudy.total, away: S.shinyStudy.awaySince }; });
    check('a brief return preserves session accuracy even with zero shiny boost', r.total === 2 && r.away === 0);
    await page.evaluate(() => { showScreen('map'); renderMap(); });
    await page.clock.fastForward(20000);
    r = await page.evaluate(() => ({ correct: S.shinyStudy.correct, total: S.shinyStudy.total,
      saved: JSON.parse(localStorage.getItem(SAVE_KEY)).shinyStudy.total,
      counter: document.querySelector('#battle-session-count').textContent }));
    check('grace expiry resets session accuracy and its visible counter after a shiny boost reset',
      r.correct === 0 && r.total === 0 && r.saved === 0 && r.counter === '0 / 0', JSON.stringify(r));

    // Actual page departure persists the timestamp; installed saves recheck wall time.
    await page.evaluate(() => { S.shinyStudy.answers = 50; saveGame(); });
    await page.goto('http://127.0.0.1:8780/tools/');
    await page.goto('http://127.0.0.1:8780/');
    r = await page.evaluate(() => {
      const loaded = loadGame();
      const savedAway = S.shinyStudy.awaySince;
      drill(1);
      return { loaded, savedAway, answers: S.shinyStudy.answers };
    });
    check('a real page exit and quick reload preserve the boost and departure timestamp',
      r.loaded && r.savedAway > 0 && r.answers === 50, JSON.stringify(r));
    r = await page.evaluate(() => {
      const installed = JSON.parse(localStorage.getItem(SAVE_KEY));
      installed.shinyStudy = { answers: 100, awaySince: Date.now() - 20000 };
      localStorage.setItem(SAVE_KEY, JSON.stringify(installed));
      const loaded = loadGame();
      drill(1); recordAnswer(D.q, false);
      return { loaded, answers: S.shinyStudy.answers, rate: wildShinyRate() };
    });
    check('a closed-page grace period expires before the first new answer on reload',
      r.loaded && r.answers === 1 && near(r.rate, 0.00129), JSON.stringify(r));

    r = await page.evaluate(() => {
      const legacy = freshSave(); delete legacy.shinyStudy;
      const normal = normalizeSave(legacy);
      S = normal;
      const old = wildShinyRate();
      S.shinyStudy = { answers: Infinity, correct: Infinity, total: -4, awaySince: 'bad' };
      const invalid = wildShinyRate();
      S.shinyStudy = { answers: 999999, awaySince: 0 };
      const high = wildShinyRate();
      S.shinyStudy.awaySince = Number.MAX_VALUE;
      shinyStudyOnLoad();
      return { old, invalid, high, future: S.shinyStudy.awaySince <= Date.now(),
        validCounts: S.shinyStudy.total === 0 && S.shinyStudy.correct === 0 };
    });
    check('older and malformed saves stay within baseline and the 3% cap',
      near(r.old, 0.001) && near(r.invalid, 0.001) && near(r.high, 0.03) && r.future && r.validCounts);
    check('no page errors', errors.length === 0, errors.join(' | '));
    await ctx.close();
  } finally { await browser.close(); }
  const failed = results.filter(r => !r.ok);
  console.log('\n' + (results.length - failed.length) + '/' + results.length + ' checks passed');
  if (failed.length) process.exitCode = 1;
})().catch(e => { console.error(e); process.exitCode = 1; });
