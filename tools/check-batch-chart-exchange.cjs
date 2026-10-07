/* Phase 7 Slice 7, batch 1 ("The chart exchange"): the whole trigger table
   end to end across both regions, rewards once, the reliable rumor true when
   told, and a repetition / vocabulary review over every Phase 7 text. */
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
    const meet = id => { S.friends[id] = Object.assign(freshFriend(), { met: true, meetings: 1 }); };
    const watch = id => { openWalkin(id); const w = worldContent('walkin', id); for (let i = 1; i < w.beats.length; i++) walkinBeat(id, i); finishWalkin(id); };
    const ids = ['walkin:cafe-rhea-visits', 'walkin:harbour-byte-visits', 'rumor:rhea-crossing', 'rumor:byte-gerald', 'rumor:harbour-mechanic',
      'mail:byte-rematch-note', 'mail:rhea-rematch-note', 'mail:rhea-come-over', 'vignette:byte-circuit-token', 'vignette:rhea-brass-token', 'thread:chart-exchange'];

    out.registered = ids.filter(key => !WORLD_CONTENT[key]);
    out.errors = validateWorldState().concat(validateRumors(), validateMail(), validateVignettes(), validateWalkins(), validateRelationshipWeb());

    // Repetition and vocabulary across every Phase 7 text.
    const texts = [];
    worldContentList().forEach(c => {
      if (c.text) texts.push([c.key, c.text]);
      if (c.body) texts.push([c.key, c.body]);
      (c.beats || []).forEach((b, i) => texts.push([c.key + '#' + i, b.text]));
    });
    RELATIONSHIP_WEB_EDGES.forEach(e => { texts.push(['web:' + e.id, e.public]); if (e.deep) texts.push(['web:' + e.id + ':deep', e.deep]); });
    const seen = {}, dups = [];
    texts.forEach(([k, t]) => { const n = t.trim().toLowerCase(); if (seen[n]) dups.push(k + ' = ' + seen[n]); seen[n] = k; });
    out.duplicates = dups;
    const sentences = {}, repeated = [];
    texts.forEach(([k, t]) => t.split(/(?<=[.!?])\s+/).filter(s => s.length > 40).forEach(s => {
      const n = s.toLowerCase(); if (sentences[n] && sentences[n] !== k) repeated.push(k + ' ~ ' + sentences[n]); sentences[n] = k; }));
    out.repeatedSentences = repeated;
    const banned = /\b(study|studying|exam|exams|question|questions|quiz|chapter|lesson|homework|revise|revision|syntax|compile|compiler|pointer|pointers|code|coding|program|programming|calculus|integral|derivative|variable|function|array|loop)\b/i;
    out.vocabulary = texts.filter(([, t]) => banned.test(t)).map(([k]) => k);
    out.textCount = texts.length;

    // Before anything: quiet.
    fresh();
    out.quiet = walkinAt('cafe') === null && !rumorsFor('nel').some(x => x.id === 'rhea-crossing');

    // Both leaders beaten and one met: the reliable rumor and the scene agree.
    S.badges[1] = true;
    S.progress.calc = S.progress.calc || {}; S.progress.calc.badges = { 1: true };
    out.notMetYet = walkinAt('cafe') === null && !rumorsFor('nel').some(x => x.id === 'rhea-crossing');
    meet('c-gym-1');
    const told = pickRumor('nel');
    out.rumorFirst = told && told.rumor.id;
    out.rumorTrue = walkinAt('cafe') && walkinAt('cafe').id;

    // Even with the café's own thread ready, the visit takes the café slot.
    meet('dax');
    out.priority = walkinAt('cafe') && walkinAt('cafe').id;

    // Watch the visit: rumor retires, invitation arrives, biased gossip starts,
    // the web learns the deeper line.
    meet('calc-gym-1');
    const webBefore = relationshipWebKnown().edges.find(e => e.id === 'byte-rhea');
    watch('cafe-rhea-visits');
    out.afterVisit = {
      stage: threadStage('chart-exchange'),
      rumorGone: !rumorsFor('nel').some(x => x.id === 'rhea-crossing'),
      gerald: rumorsFor('rook').some(x => x.id === 'byte-gerald'),
      invite: mailEligible().some(m => m.id === 'rhea-come-over'),
      webBefore: webBefore && webBefore.learned,
      webAfter: relationshipWebKnown().edges.find(e => e.id === 'byte-rhea').learned,
      cafeNext: walkinAt('cafe') && walkinAt('cafe').id
    };

    // Invitation in the C region points across the water.
    deliverMail(); openLetter('rhea-come-over');
    out.inviteText = /other side of the water/.test(document.querySelector('#modal').innerHTML);
    closeModal();

    // Cross-region: the return visit happens only on the Isles, after its gap.
    S.activityClock += 30;
    out.notInC = walkinAt('harbour') === null;
    switchSubject('calc');
    out.inCalc = walkinAt('harbour') && walkinAt('harbour').id;
    openLetter('rhea-come-over');
    out.inviteButton = /Go to Origin Harbour/.test(document.querySelector('#modal').innerHTML);
    closeModal();
    watch('harbour-byte-visits');
    const harbourFolk = CAST_REGISTRY.filter(e => e.recurringLocations[0] === 'harbour').map(e => e.id);
    out.harbourRumor = harbourFolk.some(id => rumorsFor(id).some(x => x.id === 'harbour-mechanic'));
    out.threadDone = threadStage('chart-exchange');
    switchSubject('c');

    // Rematch letters, enclosures once, vignettes follow.
    fresh();
    meet('c-gym-1'); meet('calc-gym-1');
    out.noRematchNoLetter = !mailEligible().some(m => m.id === 'byte-rematch-note');
    S.leaders.records['c-gym-1'] = { rematch: { wins: 1, losses: 0, paidWins: 1, lastWinClock: 0, bestTier: 1 } };
    S.leaders.records['calc-gym-1'] = { rematch: { wins: 1, losses: 0, paidWins: 1, lastWinClock: 0, bestTier: 1 } };
    const arrived = deliverMail().map(m => m.id);
    out.rematchLetters = arrived.indexOf('byte-rematch-note') >= 0 && arrived.indexOf('rhea-rematch-note') >= 0;
    out.noVignetteBefore = vignetteButtonHtml('circuitToken') === '';
    const c0 = itemCount('circuitToken'), i0 = itemCount('integralToken');
    ['byte-rematch-note', 'rhea-rematch-note'].forEach(id => { openLetter(id); takeEnclosure(id); takeEnclosure(id); });
    closeModal();
    activateSave(normalizeSave(JSON.parse(JSON.stringify(S))));
    ['byte-rematch-note', 'rhea-rematch-note'].forEach(id => takeEnclosure(id));
    closeModal();
    out.enclosures = { circuit: itemCount('circuitToken') - c0, integral: itemCount('integralToken') - i0 };
    out.vignettes = /A memory/.test(vignetteButtonHtml('circuitToken')) && /A memory/.test(vignetteButtonHtml('integralToken'));
    showScreen('map');
    return out;
  });

  check('every batch ID is registered', r.registered.length === 0, r.registered.join(','));
  check('all Phase 7 registries validate together', r.errors.length === 0, r.errors.join('; '));
  check('no duplicated text across Phase 7 content', r.duplicates.length === 0, r.duplicates.join('; '));
  check('no repeated sentences across Phase 7 content', r.repeatedSentences.length === 0, r.repeatedSentences.join('; '));
  check('no course vocabulary anywhere in Phase 7 text', r.vocabulary.length === 0, r.textCount + ' texts; ' + r.vocabulary.join(','));
  check('nothing fires before the leaders are beaten', r.quiet);
  check('nothing fires until one of them has been met', r.notMetYet);
  check('the reliable rumor is told first and is true when told', r.rumorFirst === 'rhea-crossing' && r.rumorTrue === 'cafe-rhea-visits',
    JSON.stringify([r.rumorFirst, r.rumorTrue]));
  check('the visit outranks the café\'s own thread', r.priority === 'cafe-rhea-visits', r.priority);
  const a = r.afterVisit;
  check('watching the visit moves the thread and retires the rumor', a.stage === 'first-visit' && a.rumorGone, JSON.stringify(a));
  check('the visit unlocks gossip, the invitation and the deeper web line', a.gerald && a.invite && a.webBefore === 'public' && a.webAfter === 'deep', JSON.stringify(a));
  check('the café goes back to its own thread afterwards', a.cafeNext === 'cafe-reserved-sign', a.cafeNext);
  check('the invitation says it will keep while you are in the other region', r.inviteText);
  check('the return visit only happens on the Isles', r.notInC && r.inCalc === 'harbour-byte-visits', JSON.stringify([r.notInC, r.inCalc]));
  check('on the Isles the invitation offers the way there', r.inviteButton);
  check('the return visit finishes the thread and harbour folk react', r.threadDone === 'return-visit' && r.harbourRumor);
  check('rematch letters need a rematch win', r.noRematchNoLetter && r.rematchLetters);
  check('each keepsake is granted exactly once, even across a reload', r.enclosures.circuit === 1 && r.enclosures.integral === 1, JSON.stringify(r.enclosures));
  check('keepsake vignettes wait for the letters, then appear', r.noVignetteBefore && r.vignettes);
  check('no page errors', errors.length === 0, errors.join(' | '));

  await browser.close();
  const failed = results.filter(x => !x.ok).length;
  console.log('\n' + (results.length - failed) + '/' + results.length + ' chart-exchange batch checks passed');
  process.exit(failed ? 1 : 0);
})().catch(error => { console.error(error); process.exit(1); });
