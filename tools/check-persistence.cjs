/* Save-and-storage behaviour the retired browser test used to cover.

   These four are easy to break and expensive to notice: a caught Pokemon
   silently lost when the party is full, a reward half-granted when the save
   fails, a draft that does not survive a reload, and an old save whose earned
   autograder submissions are wiped by the migration. Each runs in a fresh
   browser context with its own localStorage, so the real save is never read
   or written. */
const fs = require('fs');
const { chromium } = require('./playwright.cjs');
const URL = 'http://127.0.0.1:8780/';

const results = [];
const LOG = 'output/persistence-check.log';
try { fs.unlinkSync(LOG); } catch (e) {}
function say(line) { console.log(line); fs.appendFileSync(LOG, line + '\n'); }
function check(name, ok, detail) {
  results.push({ name, ok });
  say((ok ? 'PASS  ' : 'FAIL  ') + name + (detail ? '  [' + detail + ']' : ''));
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(URL);
  await page.evaluate(() => { S = freshSave(); bindProgress('c'); S.settings.sound = false; saveGame(); });

  /* Mark a quest as fully passed so its reward may be claimed. */
  const grant = id => page.evaluate(qid => {
    const q = questById(qid), p = sideQuestProgress(qid);
    p.status = 'completed';
    p.rewardClaimed = false;
    p.submission = { questId: qid, method: 'autograder', graderVersion: q.grading.version,
                     source: 'x', passed: q.grading.tests.length, total: q.grading.tests.length, at: Date.now() };
    return true;
  }, id);

  // 1. A reward Pokemon arrives when the party is already full.
  await grant('c-lab-09');
  let r = await page.evaluate(() => {
    S.party = Array.from({ length: 6 }, () => makeMon(255, 16));
    S.box = [];
    const ok = claimSideQuestReward('c-lab-09');
    return { ok, party: S.party.length, box: S.box.length, boxId: S.box[0] && S.box[0].id,
             seen: !!S.seen[133], caught: !!S.caught[133],
             receipt: (sideQuestProgress('c-lab-09').rewardReceipt || {}).deliveredTo };
  });
  check('a full party sends the reward Pokemon to a box', r.ok && r.party === 6 && r.box === 1 && r.boxId === 133, JSON.stringify(r));
  check('the boxed Pokemon is still recorded in the dex', r.seen && r.caught);
  check('the receipt says where it went', r.receipt === 'box', r.receipt);

  // 2. Claiming again pays nothing.
  r = await page.evaluate(() => {
    const before = { money: S.money, box: S.box.length };
    const ok = claimSideQuestReward('c-lab-09');
    return { ok, same: S.money === before.money && S.box.length === before.box };
  });
  check('a second claim is refused and grants nothing', r.ok === false && r.same);

  // 3. A save that cannot be written rolls the whole reward back.
  await grant('c-lab-11');
  r = await page.evaluate(() => {
    const before = JSON.stringify({ money: S.money, items: S.items, box: S.box, party: S.party.length });
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function () { throw new Error('simulated quota'); };
    let ok;
    try { ok = claimSideQuestReward('c-lab-11'); } finally { Storage.prototype.setItem = original; }
    const after = JSON.stringify({ money: S.money, items: S.items, box: S.box, party: S.party.length });
    return { ok, unchanged: before === after, claimed: sideQuestProgress('c-lab-11').rewardClaimed };
  });
  check('a failed save reports failure', r.ok === false);
  check('a failed save leaves money, items and storage untouched', r.unchanged);
  check('a failed save does not mark the reward claimed', r.claimed === false);

  // 4. A draft survives a reload.
  const draft = 'int main(void){ /* draft across a reload */ return 0; }';
  await page.evaluate(d => { openSideQuest('c-lab-02'); saveSideQuestDraft('c-lab-02', d); saveGame(); }, draft);
  await page.reload();
  r = await page.evaluate(() => {
    const loaded = loadGame();
    return { loaded, draft: sideQuestProgress('c-lab-02').draft };
  });
  check('the save reloads', r.loaded === true);
  check('an edited draft survives a reload', r.draft === draft, JSON.stringify(r.draft || '').slice(0, 60));

  // 5. A version-2 save keeps an earned autograder submission and drops a self-review one.
  r = await page.evaluate(() => {
    S = freshSave(); bindProgress('c');
    const earned = { questId: 'c-lab-01', method: 'autograder', graderVersion: 1, source: 'x', passed: 3, total: 3, at: 1 };
    const selfReview = { questId: 'c-lab-02', method: 'self-review', at: 1 };
    S.sideQuests = { version: 2, records: {
      'c-lab-01': { status: 'completed', draft: 'a', submission: earned, attempts: [1], rewardClaimed: true },
      'c-lab-02': { status: 'completed', draft: 'b', submission: selfReview, attempts: [1] }
    } };
    localStorage.setItem(SAVE_KEY, JSON.stringify(S));
    S = freshSave();
    const loaded = loadGame();
    const a = sideQuestProgress('c-lab-01'), b = sideQuestProgress('c-lab-02');
    return { loaded, version: S.sideQuests.version,
             keptSubmission: !!(a.submission && a.submission.method === 'autograder'),
             keptStatus: a.status, keptDraft: a.draft, keptReward: a.rewardClaimed,
             clearedSubmission: b.submission === null, demoted: b.status, keptLegacy: !!b.legacySubmission,
             draftB: b.draft };
  });
  check('a version-2 save loads and becomes version 3', r.loaded === true && r.version === 3, 'v' + r.version);
  check('an earned autograder submission survives the migration', r.keptSubmission && r.keptStatus === 'completed', r.keptStatus);
  check('a claimed reward is not re-granted after migration', r.keptReward === true);
  check('drafts survive the migration', r.keptDraft === 'a' && r.draftB === 'b');
  check('a self-review submission is cleared, not honoured', r.clearedSubmission && r.demoted === 'needs-revision', r.demoted);
  check('the cleared self-review is kept for reference', r.keptLegacy);

  check('no page errors', errors.length === 0, errors.join(' | '));
  await browser.close();

  const passed = results.filter(x => x.ok).length;
  say(passed + '/' + results.length + ' checks passed');
  if (passed !== results.length) process.exitCode = 1;
})();
