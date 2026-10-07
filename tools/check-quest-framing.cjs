/* Phase 6 Slices 5-6: story framing and completion reactions for the ten
   substantial C labs. Framing must never change a quest contract, a grade,
   a submission or a reward. */
const { chromium } = require('./playwright.cjs');

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok });
  console.log((ok ? 'PASS  ' : 'FAIL  ') + name + (detail ? '  [' + detail + ']' : ''));
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const page = await (await browser.newContext()).newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:8780/');

  const r = await page.evaluate(() => {
    const out = {};
    const fresh = () => { S = freshSave(); activateSave(S); S.settings.sound = false; S.party = [makeMon(6, 30)]; ensureBag(); };
    const contracts = JSON.stringify(SIDE_QUESTS.map(q => [q.id, q.starterCode, q.grading, q.rewards, q.implementationContract]));
    out.validation = validateQuestFraming();
    out.framed = Object.keys(QUEST_FRAMING).length;

    // Stages follow the quest's own status and never write into the quest record.
    fresh();
    const q = 'c-lab-25';
    out.offer = questFramingStage(q).stage;
    const p = sideQuestProgress(q);
    p.status = 'in-progress';
    out.progress = questFramingStage(q).stage;
    p.status = 'needs-revision';
    out.revision = questFramingStage(q).stage;

    // A pass with no failed submission and no hints is "independent".
    const complete = (questId, attempts) => {
      const pr = sideQuestProgress(questId);
      pr.status = 'completed'; pr.completedAt = Date.now();
      pr.attempts = attempts; pr.rewardClaimed = true;
      pr.submission = { questId, method: 'autograder', passed: 1, total: 1 };
      return pr;
    };
    complete('c-lab-25', [{ complete: true, passed: 5, total: 5 }]);
    const before = JSON.stringify({ quests: S.sideQuests, money: S.money, items: S.items, party: S.party.length });
    const panel = questFramingPanel('c-lab-25');
    out.independent = { stage: questFramingStage('c-lab-25').stage, outcome: S.questFraming.records['c-lab-25'].outcome,
      text: panel.includes(QUEST_FRAMING['c-lab-25'].complete.independent) };
    out.readOnly = JSON.stringify({ quests: S.sideQuests, money: S.money, items: S.items, party: S.party.length }) === before;

    // A failed submission first is "persisted", even with the hints opened.
    questFramingNoteGuidance('c-lab-27');
    complete('c-lab-27', [{ complete: false, passed: 2, total: 6 }, { complete: true, passed: 6, total: 6 }]);
    questFramingPanel('c-lab-27');
    out.persisted = S.questFraming.records['c-lab-27'].outcome;

    // Hints opened and a clean pass is "guided".
    questFramingNoteGuidance('c-lab-29');
    complete('c-lab-29', [{ complete: true, passed: 8, total: 8 }]);
    questFramingPanel('c-lab-29');
    out.guided = S.questFraming.records['c-lab-29'].outcome;

    // The outcome is fixed on first view: a later resubmission does not rewrite it.
    sideQuestProgress('c-lab-25').attempts.push({ complete: false, passed: 0, total: 5 });
    questFramingPanel('c-lab-25');
    out.fixed = S.questFraming.records['c-lab-25'].outcome;

    // After some play the giver acknowledges the job instead.
    S.activityClock += QUEST_FRAMING_ACK_CLOCK;
    out.ack = questFramingStage('c-lab-25');

    // The record stores only coarse facts.
    out.recordKeys = Object.keys(S.questFraming.records['c-lab-25']).sort().join(',');

    // Unframed labs get no wrapper.
    out.unframed = questFramingPanel('c-lab-01') === '' && questFramingStage('c-lab-05') === null;

    // Real UI: the detail page shows the panel and opening the hints records guidance only.
    fresh();
    openSideQuest('c-lab-12');
    const detail = document.querySelector('#s-quests');
    out.ui = { panel: !!detail.querySelector('.sq-framing[data-stage="offer"]'),
      beforeContract: detail.innerHTML.indexOf('sq-framing') < detail.innerHTML.indexOf('The exact contract') };
    const quest = JSON.stringify(sideQuestProgress('c-lab-12'));
    const hints = document.querySelector('#sq-hints');
    hints.open = true; hints.dispatchEvent(new Event('toggle'));
    out.ui.guidance = !!(S.questFraming.records['c-lab-12'] && S.questFraming.records['c-lab-12'].guidance);
    const after = JSON.parse(JSON.stringify(sideQuestProgress('c-lab-12')));
    const beforeQ = JSON.parse(quest);
    delete after.draft; delete beforeQ.draft;
    out.ui.questUntouched = JSON.stringify(after) === JSON.stringify(beforeQ);
    openSideQuests();
    out.ui.boardTags = document.querySelectorAll('.sq-card').length === SIDE_QUESTS.filter(x => x.published).length &&
      [...document.querySelectorAll('.sq-card')].filter(c => c.textContent.includes('Story job')).length === 10;

    // Save round trip and junk normalisation.
    S.questFraming.records['c-lab-09'] = { guidance: 'yes', outcome: 'brilliant', seenClock: 'x' };
    saveGame();
    activateSave(normalizeSave(JSON.parse(localStorage.getItem(SAVE_KEY))));
    out.reload = { kept: S.questFraming.records['c-lab-12'].guidance === true,
      junk: JSON.stringify(S.questFraming.records['c-lab-09']) };

    out.contractsUntouched = JSON.stringify(SIDE_QUESTS.map(q2 => [q2.id, q2.starterCode, q2.grading, q2.rewards, q2.implementationContract])) === contracts;
    return out;
  });
  await browser.close();

  check('ten framed labs, exactly the hard ones, with valid givers and respectful lines', r.framed === 10 && r.validation.length === 0,
    r.validation.slice(0, 4).join(' | '));
  check('stages follow the quest status: offer, in progress, review needed', r.offer === 'offer' && r.progress === 'in-progress' && r.revision === 'in-progress');
  check('a clean pass without hints reads as independent and shows that reaction', r.independent.stage === 'complete' &&
    r.independent.outcome === 'independent' && r.independent.text, JSON.stringify(r.independent));
  check('framing never changes quests, money, items or party', r.readOnly);
  check('a failed submission first reads as persisted, even with hints opened', r.persisted === 'persisted', r.persisted);
  check('opened hints and a clean pass reads as guided', r.guided === 'guided', r.guided);
  check('the outcome is fixed the first time the finished job is viewed', r.fixed === 'independent', r.fixed);
  check('after more play the giver acknowledges the finished job', r.ack && r.ack.stage === 'acknowledgment', JSON.stringify(r.ack));
  check('framing stores only coarse facts', r.recordKeys === 'guidance,outcome,seenAt,seenClock', r.recordKeys);
  check('easy and medium labs get no forced story wrapper', r.unframed);
  check('the detail page shows the framing above the unchanged contract', r.ui.panel && r.ui.beforeContract, JSON.stringify(r.ui));
  check('opening the hints records guidance without touching the quest record', r.ui.guidance && r.ui.questUntouched, JSON.stringify(r.ui));
  check('the quest board marks exactly the ten story jobs', r.ui.boardTags);
  check('framing state survives a save round trip and junk normalises',
    r.reload.kept && r.reload.junk === JSON.stringify({ guidance: false, outcome: null, seenClock: null, seenAt: null }), JSON.stringify(r.reload));
  check('quest contracts, grading and rewards are byte-for-byte unchanged', r.contractsUntouched);
  check('no page errors', errors.length === 0, errors.slice(0, 3).join(' | '));

  const failed = results.filter(x => !x.ok).length;
  console.log((results.length - failed) + '/' + results.length + ' checks passed');
  if (failed) process.exitCode = 1;
})();
