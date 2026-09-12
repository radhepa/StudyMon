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

  // Schema 1: old installed saves are backed up exactly, normalized deeply,
  // and retain data this build does not know about.
  let r = await page.evaluate(() => {
    localStorage.removeItem(SAVE_SCHEMA_BACKUP_KEY);
    const legacy = freshSave();
    delete legacy.schemaVersion;
    legacy.settings = { sound: false, extension: { theme: 'field-notes' } };
    legacy.town = { beaten: { keep: true }, extension: { visits: 7 } };
    legacy.extension = { nested: { answer: 42 } };
    const raw = JSON.stringify(legacy, null, 2);
    localStorage.setItem(SAVE_KEY, raw);
    const loaded = loadGame();
    const firstBackup = localStorage.getItem(SAVE_SCHEMA_BACKUP_KEY);

    const second = freshSave();
    delete second.schemaVersion;
    second.trainer = 'SECOND';
    localStorage.setItem(SAVE_KEY, JSON.stringify(second));
    const loadedAgain = loadGame();
    return {
      loaded, loadedAgain,
      schema: S.schemaVersion,
      exactBackup: firstBackup === raw,
      backupUnchanged: localStorage.getItem(SAVE_SCHEMA_BACKUP_KEY) === raw,
      settingsHydrated: S.settings.sound === true && !('timer' in S.settings) && !('seconds' in S.settings),
      townHydrated: !!S.town.gifts && !!S.town.met,
      unknownRoot: legacy.extension.nested.answer === 42,
      firstUnknownRoot: JSON.parse(firstBackup).extension.nested.answer === 42,
      firstUnknownNested: JSON.parse(firstBackup).settings.extension.theme === 'field-notes'
    };
  });
  check('legacy installed saves reach the current internal schema', r.loaded && r.loadedAgain && r.schema === 3, 'schema ' + r.schema);
  check('the pre-schema backup preserves the exact raw JSON once', r.exactBackup && r.backupUnchanged);
  check('normalization deeply hydrates required nested defaults', r.settingsHydrated && r.townHydrated);
  check('unknown root and nested fields survive legacy handling', r.unknownRoot && r.firstUnknownRoot && r.firstUnknownNested);

  r = await page.evaluate(() => {
    const source = {
      v: 1, schemaVersion: 1, party: [],
      settings: { sound: false, extension: { contrast: 3 } },
      town: { beaten: { keep: true } },
      extension: { future: ['kept'] }
    };
    const one = normalizeSave(source);
    const two = normalizeSave(one);
    return {
      same: JSON.stringify(one) === JSON.stringify(two),
      sourceUntouched: source.town.gifts === undefined,
      unknown: two.extension.future[0] === 'kept' && two.settings.extension.contrast === 3,
      nested: !!two.town.gifts && !!two.town.met && typeof two.totals.wins === 'number'
    };
  });
  check('normalization is idempotent and does not mutate its input', r.same && r.sourceUntouched);
  check('normalization preserves unknown fields while hydrating deeply', r.unknown && r.nested);

  r = await page.evaluate(() => {
    const malformed = {
      v: 1, schemaVersion: 1, curriculumVersion: 4, subject: 'c',
      progress: null, party: {}, box: 'bad', settings: null, town: 'bad',
      items: [], totals: null, badges: null, elite: null, chapterStats: null, srs: null
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(malformed));
    const nestedLoaded = loadGame();
    const nestedFixed = Array.isArray(S.party) && Array.isArray(S.box) &&
      S.settings && S.town && S.items && S.totals && S.progress.c;

    const before = S;
    const badRaw = '{"v":1,';
    localStorage.setItem(SAVE_KEY, badRaw);
    const badLoaded = loadGame();
    return { nestedLoaded, nestedFixed: !!nestedFixed, badLoaded,
             rawUnchanged: localStorage.getItem(SAVE_KEY) === badRaw, liveUnchanged: S === before };
  });
  check('malformed nested data is repaired from required defaults', r.nestedLoaded && r.nestedFixed);
  check('malformed JSON is rejected without changing live or stored data', !r.badLoaded && r.rawUnchanged && r.liveUnchanged);

  r = await page.evaluate(async () => {
    S = freshSave(); bindProgress('c');
    const before = S;
    const futureRaw = JSON.stringify({ v: 1, schemaVersion: CURRENT_SAVE_SCHEMA + 1, party: [], future: true });
    localStorage.setItem(SAVE_KEY, futureRaw);
    const loaded = loadGame();
    const loadSafe = !loaded && S === before && localStorage.getItem(SAVE_KEY) === futureRaw;
    const importError = await new Promise(resolve => {
      importSave(new File([futureRaw], 'future.json', { type: 'application/json' }), e => resolve(e && e.message));
    });
    return { loadSafe, importSafe: !!importError && S === before && localStorage.getItem(SAVE_KEY) === futureRaw };
  });
  check('future schemas are rejected non-destructively on load and import', r.loadSafe && r.importSafe);

  r = await page.evaluate(() => {
    localStorage.removeItem(SAVE_SCHEMA_BACKUP_KEY);
    const legacy = freshSave(); delete legacy.schemaVersion;
    const raw = JSON.stringify(legacy);
    localStorage.setItem(SAVE_KEY, raw);
    const before = S;
    const original = SAVE_MIGRATIONS[1];
    SAVE_MIGRATIONS[1] = function () { throw new Error('simulated migration failure'); };
    let loaded;
    try { loaded = loadGame(); } finally { SAVE_MIGRATIONS[1] = original; }
    return { loaded, main: localStorage.getItem(SAVE_KEY) === raw, live: S === before,
             backup: localStorage.getItem(SAVE_SCHEMA_BACKUP_KEY) === raw };
  });
  check('a failed migration leaves the main and live saves untouched', !r.loaded && r.main && r.live && r.backup);

  r = await page.evaluate(async () => {
    const installedBackup = localStorage.getItem(SAVE_SCHEMA_BACKUP_KEY);
    const legacy = { v: 1, party: [], settings: { sound: false, extension: { import: true } },
                     extension: { source: 'import' } };
    const error = await new Promise(resolve => {
      importSave(new File([JSON.stringify(legacy)], 'legacy.json', { type: 'application/json' }), resolve);
    });
    return { ok: !error, schema: S.schemaVersion,
             unknown: S.extension.source === 'import' && S.settings.extension.import,
             hydrated: !!S.town.met && typeof S.totals.battles === 'number',
             installedBackupUntouched: localStorage.getItem(SAVE_SCHEMA_BACKUP_KEY) === installedBackup };
  });
  check('legacy imports use the same normalized schema path', r.ok && r.schema === 3 && r.hydrated);
  check('legacy imports preserve unknown fields without replacing the installed backup', r.unknown && r.installedBackupUntouched);

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
  r = await page.evaluate(() => {
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
