/* End-to-end autograder checks against an isolated save.

   Never touches the real save: each scenario runs in a fresh browser context
   whose localStorage is seeded and discarded. */
const fs = require('fs');
const { chromium } = require('C:/Users/minal/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const URL = 'http://127.0.0.1:8780/';
const refs = JSON.parse(fs.readFileSync('tools/quest-reference-fixtures.json', 'utf8'));

const results = [];
const LOG = 'output/autograder-check.log';
try { fs.unlinkSync(LOG); } catch (e) {}
function say(line) { console.log(line); fs.appendFileSync(LOG, line + '\n'); }
function check(name, ok, detail) { results.push({ name, ok, detail }); say((ok ? 'PASS  ' : 'FAIL  ') + name + (detail ? '  [' + detail + ']' : '')); }

/* Drive a real submission through the page's own runQuestCode and wait for the
   grader to settle, so the test exercises the shipped code path. */
async function submit(page, questId, source, doSubmit) {
  return page.evaluate(({ questId, source, doSubmit }) => new Promise(resolve => {
    openSideQuest(questId);
    const p = sideQuestProgress(questId);
    p.draft = source;
    runQuestCode(doSubmit);
    const started = Date.now();
    const poll = setInterval(() => {
      if (!C_JOB) {
        clearInterval(poll);
        const q = sideQuestProgress(questId);
        resolve({ status: q.status, lastGrade: q.lastGrade ? { passed: q.lastGrade.passed, total: q.lastGrade.total } : null,
                  lastRun: q.lastRun || null, rewardClaimed: !!q.rewardClaimed, money: S.money,
                  submission: q.submission ? { method: q.submission.method, passed: q.submission.passed } : null });
      } else if (Date.now() - started > 180000) { clearInterval(poll); resolve({ timeout: true }); }
    }, 250);
  }), { questId, source, doSubmit });
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(URL);
  // Seed an isolated game. This context has its own localStorage and is
  // discarded at the end, so the real save is never touched.
  await page.evaluate(() => { S = freshSave(); bindProgress('c'); S.settings.sound = false; saveGame(); });

  const QUEST = 'c-lab-01';
  const good = refs[QUEST];
  const moneyBefore = await page.evaluate(() => S.money);

  // 1. The verified reference passes every test and is rewarded once.
  let r = await submit(page, QUEST, good, true);
  check('reference passes all tests', r.lastGrade && r.lastGrade.passed === r.lastGrade.total && r.lastGrade.total > 0, JSON.stringify(r.lastGrade));
  check('passing marks the quest completed', r.status === 'completed', r.status);
  check('passing grants the reward', r.rewardClaimed === true && r.money > moneyBefore, 'money ' + moneyBefore + ' -> ' + r.money);
  const moneyAfter = r.money;

  // 2. Re-submitting the same passing code must not pay twice.
  r = await submit(page, QUEST, good, true);
  check('resubmitting cannot pay the reward twice', r.money === moneyAfter, 'money ' + r.money);

  // 3. Wrong output must fail, and must not pay.

  const q2 = 'c-lab-02';
  const good2 = refs[q2];
  const m2 = await page.evaluate(() => S.money);
  r = await submit(page, q2, good2.replace(/printf/, 'printf') + '\n', true);
  check('a second reference lab also passes', r.lastGrade && r.lastGrade.passed === r.lastGrade.total, JSON.stringify(r.lastGrade));

  // 4. Trailing-space output fails (exactness).
  const q3 = 'c-lab-03';
  const m3 = await page.evaluate(() => S.money);
  const sloppy = refs[q3].replace('int main(void){', 'int main(void){printf(" ");');
  r = await submit(page, q3, sloppy, true);
  check('extra trailing space fails the exact comparison', r.lastGrade && r.lastGrade.passed < r.lastGrade.total, JSON.stringify(r.lastGrade));
  check('a failing submission pays nothing', r.money === m3, 'money ' + r.money);
  check('a failing submission is needs-revision', r.status === 'needs-revision', r.status);

  // 5. Code that does not compile fails cleanly and pays nothing.
  const m4 = await page.evaluate(() => S.money);
  r = await submit(page, 'c-lab-04', 'int main(void){ this is not C }', true);
  check('a compiler error pays nothing', r.money === m4, 'money ' + r.money);
  check('a compiler error leaves the quest needing revision', r.status === 'needs-revision', r.status);
  check('a compiler error surfaces diagnostics', !!(r.lastRun && r.lastRun.diagnostics), r.lastRun ? String(r.lastRun.diagnostics).slice(0, 60) : 'none');

  // 6. An infinite loop is stopped by the watchdog rather than hanging.
  const m5 = await page.evaluate(() => S.money);
  r = await submit(page, 'c-lab-05', '#include <stdio.h>\nint main(void){for(;;){}return 0;}', true);
  check('an infinite loop is stopped by the watchdog', !r.timeout, r.timeout ? 'HUNG' : 'stopped');
  check('a timed-out submission pays nothing', r.money === m5, 'money ' + r.money);

  // 7. Grade results are labelled stale once the draft moves on.
  const stale = await page.evaluate(questId => {
    openSideQuest(questId);
    const p = sideQuestProgress(questId);
    const had = !!p.lastGrade, hadSource = p.lastGrade ? p.lastGrade.source !== undefined : false;
    p.draft = p.draft + '\n/* edited */\n';
    renderSideQuest();
    const el = document.querySelector('#sq-grade-results');
    return { had: had, hadSource: hadSource, marked: !!el && el.textContent.indexOf('earlier draft') !== -1 };
  }, QUEST);
  check('an edited draft marks earlier results as stale', stale.marked === true, 'lastGrade=' + stale.had + ' source=' + stale.hadSource);

  // 8. The removed self-review flow leaves no controls behind.
  const strays = await page.evaluate(() => {
    const t = document.body.innerText.toLowerCase();
    return ['import quest', 'export quest', 'self-review', 'self review'].filter(w => t.indexOf(w) !== -1);
  });
  check('no self-review or import/export controls remain', strays.length === 0, strays.join(','));

  check('no page errors', errors.length === 0, errors.slice(0, 3).join(' | '));

  await ctx.close(); await browser.close();
  const failed = results.filter(r => !r.ok);
  console.log('\n' + (results.length - failed.length) + '/' + results.length + ' checks passed');
  if (failed.length) process.exitCode = 1;
})().catch(e => { console.error(e); process.exitCode = 1; });
