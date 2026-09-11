/* The Converging Isles: gating, badges, exams and a real gym battle.

   The C region is well covered; the calculus region shares the engine but has
   its own chapters, bosses and exam-only revision routes, and nothing exercised
   them. Everything runs in a fresh context with its own localStorage. */
const fs = require('fs');
const { chromium } = require('C:/Users/minal/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const results = [];
const LOG = 'output/calc-region-check.log';
try { fs.unlinkSync(LOG); } catch (e) {}
function say(l) { console.log(l); fs.appendFileSync(LOG, l + '\n'); }
function check(n, ok, d) { results.push({ n, ok }); say((ok ? 'PASS  ' : 'FAIL  ') + n + (d ? '  [' + d + ']' : '')); }

(async () => {
  const b = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const p = await (await b.newContext()).newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://127.0.0.1:8780/');

  // --- the region binds and exposes its own data --------------------------
  let r = await p.evaluate(() => {
    S = freshSave(); S.settings.sound = false;
    switchSubject('calc');
    return { subject: activeSubject(), chapters: CHAPTERS.length, elite: ELITE.length,
             questions: Object.keys(QBANK).reduce((n, k) => n + QBANK[k].length, 0),
             emptyChapters: Object.keys(QBANK).filter(k => !QBANK[k].length),
             titles: CHAPTERS.every(c => !!c.title), leaders: CHAPTERS.every(c => !!c.leader),
             dialogue: CHAPTERS.every(c => GYM_DIALOGUE[c.n] && GYM_DIALOGUE[c.n].intro && GYM_DIALOGUE[c.n].rematch) };
  });
  check('switching region binds the calculus curriculum', r.subject === 'calc' && r.chapters === 10 && r.elite === 4,
        r.chapters + ' gyms, ' + r.elite + ' bosses');
  check('every calculus chapter has a title and a leader', r.titles && r.leaders);
  check('every calculus gym has intro and rematch dialogue', r.dialogue);
  // a count, not an exact number: the bank grows, but every chapter must be stocked
  check('the calculus bank is bound and every chapter is stocked',
        r.questions >= 400 && r.emptyChapters.length === 0,
        r.questions + ' questions, empty chapters: ' + JSON.stringify(r.emptyChapters));

  // --- exams gate the gyms behind them ------------------------------------
  r = await p.evaluate(() => {
    S = freshSave(); switchSubject('calc'); S.badges = {}; S.elite = {};
    const open = [], shut = [];
    for (let n = 1; n <= 10; n++) (gymBlockedBy(n) ? shut : open).push(n);
    return { open, shut, firstBlocker: (gymBlockedBy(4) || {}).id };
  });
  check('with no exams passed, only the first unit is reachable', JSON.stringify(r.open) === '[1,2,3]', 'open ' + JSON.stringify(r.open));
  check('gym 4 is blocked by the first evening exam', r.firstBlocker === 'x1', r.firstBlocker);

  r = await p.evaluate(() => {
    S = freshSave(); switchSubject('calc'); S.badges = {}; S.elite = { x1: true };
    const open = [];
    for (let n = 1; n <= 10; n++) if (!gymBlockedBy(n)) open.push(n);
    return { open, blocker7: (gymBlockedBy(7) || {}).id };
  });
  check('passing exam I opens the next unit', JSON.stringify(r.open) === '[1,2,3,4,5,6]', 'open ' + JSON.stringify(r.open));
  check('gym 7 is then blocked by the second exam', r.blocker7 === 'x2', r.blocker7);

  // --- bosses open on badge count -----------------------------------------
  r = await p.evaluate(() => {
    S = freshSave(); switchSubject('calc'); S.badges = {}; S.elite = {};
    const none = ELITE.map(e => bossOpen(e));
    for (let n = 1; n <= 3; n++) S.badges[n] = true;
    const three = ELITE.map(e => bossOpen(e));
    for (let n = 1; n <= 10; n++) S.badges[n] = true;
    const all = ELITE.map(e => bossOpen(e));
    return { none, three, all, finalAfter: bossAfter(ELITE.find(e => e.id === 'final')) };
  });
  check('no boss is open without badges', r.none.every(x => x === false));
  check('three badges open exactly the first exam', JSON.stringify(r.three) === '[true,false,false,false]', JSON.stringify(r.three));
  check('all ten badges open every boss including the Final', r.all.every(x => x === true) && r.finalAfter === 10);

  // --- the revision routes exist and are exam-only ------------------------
  r = await p.evaluate(() => ({
    exams: CALC_EXAM_CHAPTERS.map(c => ({ n: c.n, examOnly: !!c.examOnly, exam: c.exam, notes: (c.notes || []).length, lessons: (c.lessons || []).length })),
    banked: CALC_EXAM_CHAPTERS.every(c => (QBANK[c.n] || []).length > 0),
    linked: CALC_EXAM_CHAPTERS.every(c => ELITE.some(e => e.id === c.exam))
  }));
  check('each revision route is exam-only and carries notes', r.exams.length === 4 && r.exams.every(e => e.examOnly && e.notes > 0 && e.lessons > 0),
        JSON.stringify(r.exams));
  check('each revision route has its own questions', r.banked);
  check('each revision route names a boss that exists', r.linked);

  // --- a real gym battle in the calculus region ---------------------------
  r = await p.evaluate(async () => {
    const sleep = ms => new Promise(res => setTimeout(res, ms));
    S = freshSave(); switchSubject('calc'); S.settings.sound = false;
    S.party = [makeMon(6, 70), makeMon(9, 70), makeMon(3, 70)];
    S.badges = {}; S.elite = {};
    const asked = [];
    beginGymBattle(1);
    const started = !!B;
    for (let i = 0; i < 400 && B && !B.over; i++) {
      const cont = document.querySelector('#contbtn');
      const move = document.querySelector('.moves button.move:not([disabled])');
      if (B.q && !B.qAnswered) {
        const q = B.q; asked.push(q.id);
        if (q.k === 'fill') { const el = document.querySelector('#fillin'); if (el) { el.value = String(q.a[0]); submitFill(); } }
        else answer(q.a);
      } else if (cont) cont.click();
      else if (move) move.click();
      await sleep(80);
    }
    await sleep(600);
    const out = { started, over: !!(B && B.over), badge: !!S.badges[1], asked: asked.length,
                  fromCalc: asked.every(id => /^k/.test(id)), sample: asked.slice(0, 3) };
    if (B) { try { clearInterval(B.timer); } catch (e) {} B = null; }
    return out;
  });
  check('a calculus gym battle starts', r.started);
  check('answering correctly finishes the battle', r.over, 'asked ' + r.asked);
  check('winning the first gym awards its badge', r.badge);
  check('the questions asked come from the calculus bank', r.asked > 0 && r.fromCalc, r.sample.join(', '));

  check('no page errors', errs.length === 0, errs.slice(0, 3).join(' | '));
  await b.close();
  const passed = results.filter(x => x.ok).length;
  say(passed + '/' + results.length + ' checks passed');
  if (passed !== results.length) process.exitCode = 1;
})();
