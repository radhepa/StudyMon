/* The pencil-and-paper calculus problems: do they load, render and grade?

   These questions carry hints and a lot of them are fill-in, so the two things
   worth proving are that a hint block appears and steps through, and that the
   answer a student would actually type is accepted. */
const fs = require('fs');
const { chromium } = require('C:/Users/minal/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const results = [];
const LOG = 'output/calc-problems-check.log';
try { fs.unlinkSync(LOG); } catch (e) {}
function say(l) { console.log(l); fs.appendFileSync(LOG, l + '\n'); }
function check(n, ok, d) { results.push({ n, ok }); say((ok ? 'PASS  ' : 'FAIL  ') + n + (d ? '  [' + d + ']' : '')); }

(async () => {
  const b = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const p = await (await b.newContext()).newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://127.0.0.1:8780/');

  let r = await p.evaluate(() => {
    S = freshSave(); switchSubject('calc'); S.settings.sound = false;
    const all = [];
    for (const ch of Object.keys(QBANK)) for (const q of QBANK[ch]) all.push(q);
    const probs = all.filter(q => q.id.indexOf('-p-') >= 0);
    const quiz2 = all.filter(q => q.family && q.family.indexOf('quiz2-') === 0);
    const quiz2Families = Object.values(Object.groupBy(quiz2, q => q.family));
    const tenfold = all.filter(q => q.family && q.family.indexOf('tenfold-') === 0);
    const tenfoldFamilies = Object.values(Object.groupBy(tenfold, q => q.family));
    const atomicFamilies = Object.values(Object.groupBy(quiz2.concat(tenfold), q => q.family));
    const thomas = all.filter(q => q.id.indexOf('-th-') >= 0);
    const guidedByLesson = Object.groupBy(all.filter(q => q.hints && q.hints.length === 3), q => q.lesson);
    const home = {1:1,2:1,3:1,4:1,5:2,6:2,7:3,8:3,9:3,10:91,11:91,12:4,13:4,14:4,
                  15:5,16:5,17:5,18:6,19:6,20:92,21:7,22:7,23:7,24:8,25:8,26:8,
                  27:93,28:9,29:9,30:9,31:9,32:10,33:10,34:10,35:94};
    return {
      total: all.length, probs: probs.length,
      fieldManual: window.CALC_FIELD_MANUAL_Q3PLUS,
      selfChecks: all.filter(q => q.selfCheck).length,
      hinted: probs.filter(q => q.hints && q.hints.length === 3).length,
      hintsAreStrings: probs.every(q => q.hints.every(h => typeof h === 'string' && h.trim().length > 8)),
      fills: probs.filter(q => q.k === 'fill').length,
      chapters: [...new Set(probs.map(q => q.chapter))].sort((a, b) => a - b),
      tiers: probs.reduce((m, q) => (m[q.t] = (m[q.t] || 0) + 1, m), {}),
      quiz2FamilyCount: quiz2Families.length,
      quiz2FamilySizes: quiz2Families.map(family => family.length),
      quiz2Valid: quiz2.length === 190 && quiz2.every(q => q.penPaper && q.hints && q.hints.length === 3 &&
        q.why && ((q.k === 'mcq' && q.c && q.c.length === 4) || (q.k === 'fill' && Array.isArray(q.a) && q.a.length)) &&
        q.variation >= 1 && q.variation <= 10 && q.chapter === home[q.lesson]),
      tenfoldCount: tenfold.length,
      tenfoldFamilyCount: tenfoldFamilies.length,
      tenfoldFamilySizes: tenfoldFamilies.map(family => family.length),
      tenfoldValid: tenfold.every(q => q.penPaper && q.source && q.source.indexOf('original parameterized variation') >= 0 &&
        q.hints && q.hints.length === 3 && q.why && q.c && q.c.length === 4 &&
        q.variation >= 1 && q.variation <= 10 && q.chapter === home[q.lesson]),
      atomicFamilyCount: atomicFamilies.length,
      atomicFamilySizes: atomicFamilies.map(family => family.length),
      atomicChapters: [...new Set(quiz2.concat(tenfold).map(q => q.chapter))].sort((a, b) => a - b),
      thomasCount: thomas.length,
      thomasValid: thomas.every(q => q.penPaper && q.source && q.source.indexOf('13e (accessible reference)') >= 0 &&
        q.hints && q.hints.length === 3 && q.why && q.c && q.c.length === 4 && q.chapter === home[q.lesson]),
      thinLessons: Array.from({ length: 35 }, (_, i) => i + 1).filter(lesson => (guidedByLesson[lesson] || []).length < 10),
      guidedCounts: Array.from({ length: 35 }, (_, i) => (guidedByLesson[i + 1] || []).length)
    };
  });
  check('the expanded problems load into the calculus bank', r.probs === 357 && r.total === 1607, r.probs + ' legacy problems of ' + r.total + ' total');
  check('all Quiz 3+ Field Manual prompts are accounted for', r.fieldManual && r.fieldManual.total === 204 &&
    r.fieldManual.preserved + r.fieldManual.added === 204 && r.fieldManual.added === 150,
    JSON.stringify(r.fieldManual));
  check('proof and derivation prompts use self-check grading', r.selfChecks === 25, r.selfChecks);
  check('every problem carries exactly three hints', r.hinted === r.probs, r.hinted + '/' + r.probs);
  check('every hint is a real sentence', r.hintsAreStrings);
  check('problems reach every gym and every exam route', r.chapters.length === 14, JSON.stringify(r.chapters));
  check('problems sit at the harder tiers', !r.tiers[1] && r.tiers[3] + r.tiers[4] > r.probs / 2, JSON.stringify(r.tiers));
  check('Quiz 2 has nineteen paper-work families with ten variations each',
    r.quiz2FamilyCount === 19 && r.quiz2FamilySizes.every(n => n === 10) && r.quiz2Valid, JSON.stringify(r.quiz2FamilySizes));
  check('all other lessons have sixty-six fully guided tenfold families',
    r.tenfoldCount === 660 && r.tenfoldFamilyCount === 66 && r.tenfoldFamilySizes.every(n => n === 10) && r.tenfoldValid,
    r.tenfoldCount + ' questions; sizes ' + JSON.stringify(r.tenfoldFamilySizes));
  check('all gyms and exam routes total eighty-five atomic families with ten variants each',
    r.atomicFamilyCount === 85 && r.atomicFamilySizes.every(n => n === 10) && r.atomicChapters.length === 14,
    r.atomicFamilyCount + ' families across ' + JSON.stringify(r.atomicChapters));
  check('the Thomas top-up is fully guided and routed to the right gyms',
    r.thomasCount === 42 && r.thomasValid, r.thomasCount);
  check('every calculus lesson has at least ten guided paper problems',
    r.thinLessons.length === 0, 'thin ' + JSON.stringify(r.thinLessons) + '; counts ' + JSON.stringify(r.guidedCounts));

  // every fill answer the bank claims must be accepted by the matcher
  r = await p.evaluate(() => {
    const bad = [];
    for (const ch of Object.keys(QBANK)) for (const q of QBANK[ch]) {
      if (q.k !== 'fill' || q.id.indexOf('-p-') < 0) continue;
      for (const acc of q.a) if (!fillMatches(acc, q.a, q)) bad.push(q.id + ' rejects its own answer ' + JSON.stringify(acc));
      // a wrong answer must be rejected
      if (fillMatches('definitely not the answer', q.a, q)) bad.push(q.id + ' accepts nonsense');
    }
    return bad;
  });
  check('every accepted spelling is actually accepted', r.length === 0, r.slice(0, 3).join(' | '));

  // the hint block renders and steps through, in the drill screen
  r = await p.evaluate(() => {
    const q = QBANK[1].find(x => x.id.indexOf('-p-') >= 0 && x.k === 'mcq');
    drill(1); D.q = q; D.answered = false; renderDrill();
    const out = { id: q.id, btn: (document.querySelector('#hintbtn') || {}).textContent, hidden: [] };
    for (let i = 0; i < 3; i++) out.hidden.push(document.querySelector('#hint' + i).hidden);
    revealHint();
    out.afterOne = document.querySelector('#hint0').hidden === false && document.querySelector('#hint1').hidden === true;
    out.btnAfter = document.querySelector('#hintbtn').textContent;
    revealHint(); revealHint();
    out.allOpen = [0, 1, 2].every(i => !document.querySelector('#hint' + i).hidden);
    out.btnGone = document.querySelector('#hintbtn').hidden;
    // the hint text must actually be on the page
    out.visible = document.querySelector('#s-drill').textContent.indexOf(q.hints[2].slice(0, 20)) >= 0;
    return out;
  });
  check('a hint button appears on a problem', /Need a hint\? \(3\)/.test(r.btn || ''), r.btn);
  check('all three hints start hidden', r.hidden.every(h => h === true));
  check('the first click reveals only the first hint', r.afterOne);
  check('the button counts down', /Another hint \(2\)/.test(r.btnAfter || ''), r.btnAfter);
  check('three clicks reveal all three and retire the button', r.allOpen && r.btnGone);
  check('the hint text reaches the page', r.visible);

  // proof and derivation prompts reveal their complete worked solution before
  // the learner grades their own work; they never enter mock exams.
  r = await p.evaluate(() => {
    const q = Object.values(QBANK).flat().find(x => x.selfCheck);
    drill(q.chapter); D.q = q; D.answered = false; renderDrill();
    const before = { reveal: !!document.querySelector('#drevealself'), hidden: document.querySelector('#dselfsolution').hidden };
    revealDrillSelfCheck();
    const afterReveal = !document.querySelector('#dselfsolution').hidden && !!document.querySelector('#dch0');
    drillAnswer(0);
    return { before, afterReveal, answered: D.answered, recorded: !!S.srs[q.id] };
  });
  check('self-check practice reveals the solution before grading', r.before.reveal && r.before.hidden && r.afterReveal && r.answered && r.recorded, JSON.stringify(r));

  // answering a fill problem correctly is graded correct
  r = await p.evaluate(() => {
    const q = QBANK[1].find(x => x.id.indexOf('-p-') >= 0 && x.k === 'fill');
    drill(1); D.q = q; D.answered = false; renderDrill();
    const before = S.srs[q.id] ? S.srs[q.id].box : null;
    document.querySelector('#dfill').value = q.a[0];
    drillFill();
    const card = document.querySelector('#s-drill').textContent;
    return { id: q.id, typed: q.a[0], correct: card.indexOf('Correct!') >= 0,
             hintsOpen: [0, 1, 2].every(i => !document.querySelector('#hint' + i).hidden), before };
  });
  check('typing the exact answer to a fill problem is graded correct', r.correct, r.id + ' typed ' + JSON.stringify(r.typed));
  check('answering opens every hint for review', r.hintsOpen);

  // Four-digit bank totals must stay visually centered inside the Trainer Card
  // at both desktop and narrow mobile widths.
  await p.evaluate(() => {
    S = freshSave(); switchSubject('calc');
    for (let i = 0; i < 38; i++) S.srs['layout-sample-' + i] = { box: 1 };
    showScreen('stats'); renderStats();
  });
  const bankLayouts = [];
  for (const viewport of [{ width: 1180, height: 900 }, { width: 390, height: 844 }]) {
    await p.setViewportSize(viewport);
    bankLayouts.push(await p.evaluate(() => {
      const card = document.querySelector('#s-stats .bank-seen');
      const value = card.querySelector('.v');
      const cardRect = card.getBoundingClientRect();
      const valueRect = value.getBoundingClientRect();
      const range = document.createRange();
      range.selectNodeContents(value);
      const textRect = range.getBoundingClientRect();
      return {
        viewport: innerWidth,
        text: value.textContent,
        overflow: textRect.left < valueRect.left - 0.5 || textRect.right > valueRect.right + 0.5,
        centerDelta: Math.abs((textRect.left + textRect.width / 2) - (cardRect.left + cardRect.width / 2))
      };
    }));
  }
  check('the four-digit Bank seen counter stays centered on desktop and mobile',
    bankLayouts.every(x => x.text === '38/1607' && !x.overflow && x.centerDelta < 1), JSON.stringify(bankLayouts));

  // a full gym battle still runs with the new questions in the pool
  r = await p.evaluate(async () => {
    const sleep = ms => new Promise(res => setTimeout(res, ms));
    S = freshSave(); switchSubject('calc'); S.settings.sound = false;
    S.party = [makeMon(6, 70), makeMon(9, 70)];
    const asked = [];
    beginGymBattle(1);
    for (let i = 0; i < 400 && B && !B.over; i++) {
      const cont = document.querySelector('#contbtn');
      const move = document.querySelector('.moves button.move:not([disabled])');
      if (B.q && !B.qAnswered) {
        const q = B.q; asked.push(q.id);
        if (q.k === 'fill') { const el = document.querySelector('#fillin'); if (el) { el.value = String(q.a[0]); submitFill(); } }
        else answer(q.a);
      } else if (cont) cont.click(); else if (move) move.click();
      await sleep(70);
    }
    await sleep(500);
    const out = { over: !!(B && B.over), badge: !!S.badges[1], asked: asked.length,
                  sawProblem: asked.some(id => id.indexOf('-p-') >= 0) };
    if (B) { try { clearInterval(B.timer); } catch (e) {} B = null; }
    return out;
  });
  check('a calculus gym battle still completes', r.over && r.badge, 'asked ' + r.asked);

  check('no page errors', errs.length === 0, errs.slice(0, 3).join(' | '));
  await b.close();
  const passed = results.filter(x => x.ok).length;
  say(passed + '/' + results.length + ' checks passed');
  if (passed !== results.length) process.exitCode = 1;
})();
