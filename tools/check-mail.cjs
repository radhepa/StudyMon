/* Phase 7 Slice 3: mail. Delivery happens only at explicit moments, listing
   is read-only, enclosures are granted once, nothing expires, returning notes
   are warm and optional, and being away never costs anything. */
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
    const snap = () => JSON.stringify(S);
    const meet = (id, points) => { S.friends[id] = Object.assign(freshFriend(), { met: true, meetings: 1, points: points || 0 }); };
    const all = worldContentList('mail');
    const DAY = 24 * 60 * 60 * 1000;

    out.errors = validateMail().concat(validateWorldState());
    out.count = all.length;
    out.types = [...new Set(all.map(m => m.type))].sort().join(',');
    out.returning = all.filter(m => m.returning).length;
    out.enclosures = all.filter(m => m.attachment).length;
    const banned = /\b(study|studying|exam|exams|question|questions|quiz|chapter|lesson|homework|revise|revision|syntax|compile|compiler|pointer|pointers|code|coding|program|programming|calculus|integral|derivative|variable|function|array|loop)\b/i;
    out.vocabulary = all.filter(m => banned.test(m.title + ' ' + m.body)).map(m => m.id);
    const guilt = /\b(miss(ed)? you|where (have|were) you|you never|disappointed|forgot(ten)? (about )?(me|us)|days? (ago|since)|haven't seen you|long time no)\b/i;
    out.guilt = all.filter(m => m.returning && guilt.test(m.body)).map(m => m.id);

    out.refused = {
      sender: registerMail({ id: 'test-a', type: 'letter', from: 'nobody-at-all', title: 'Hello', body: 'x'.repeat(80) }).length > 0,
      keyItem: registerMail({ id: 'test-b', type: 'letter', from: 'mira', title: 'Hello', body: 'x'.repeat(80), attachment: [{ item: 'expShare', count: 1 }] }).length > 0,
      badItem: registerMail({ id: 'test-c', type: 'letter', from: 'mira', title: 'Hello', body: 'x'.repeat(80), attachment: [{ item: 'nothing', count: 1 }] }).length > 0,
      returningNoStage: registerMail({ id: 'test-d', type: 'letter', from: 'mira', returning: true, title: 'Hello', body: 'x'.repeat(80) }).length > 0,
      returningGift: registerMail({ id: 'test-e', type: 'letter', from: 'mira', returning: true, when: { all: ['stage:mira:friend'] }, title: 'Hello', body: 'x'.repeat(80), attachment: [{ item: 'potion', count: 1 }] }).length > 0,
      inviteNoPlace: registerMail({ id: 'test-f', type: 'invitation', from: 'mira', title: 'Hello', body: 'x'.repeat(80) }).length > 0,
      absent: ['test-a', 'test-b', 'test-c', 'test-d', 'test-e', 'test-f'].every(id => !worldContent('mail', id))
    };
    MAIL_ERRORS = [];

    // A fresh save has no mail and no chip.
    fresh();
    out.freshEmpty = mailEligible().length === 0 && mailWaiting() === 0 && mailChip() === '';

    // Nobody writes to a stranger; the condition must hold too.
    S.town.receipts['aide-exp-share'] = true;
    out.strangerSilent = !mailEligible().some(m => m.id === 'kern-first-week');
    meet('aide');
    out.kernEligible = mailEligible().some(m => m.id === 'kern-first-week');

    // Listing, counting and the chip never write.
    const before = snap();
    for (let i = 0; i < 3; i++) { mailEligible(); mailbox(); mailWaiting(); mailChip(); mailEligible({ awayMs: 10 * DAY }); }
    out.readOnly = snap() === before;
    out.waiting = mailWaiting();

    // Pacing: at most three per moment, the rest wait (they do not expire).
    fresh();
    S.town.receipts['aide-exp-share'] = true; S.badges[1] = true; S.badges[2] = true; S.badges[3] = true;
    S.visited.calc = true;
    ['aide', 'theo', 'postie', 'c-gym-1'].forEach(id => meet(id));
    meet('mira', 250);
    out.eligibleCount = mailEligible().length;
    const d1 = deliverMail().map(m => m.id);
    S.activityClock += 50000;
    const d2 = deliverMail().map(m => m.id);
    out.pacing = { d1, d2, total: mailbox().length };

    // Returning notes: only on an opening after a while, one per opening, and
    // being away changes no friendship.
    fresh();
    meet('rowan', 450); meet('mira', 450);
    out.noAwayNoNote = deliverMail().every(m => !m.returning);
    const points = JSON.stringify([S.friends.rowan.points, S.friends.mira.points]);
    out.firstOpening = mailOnOpening(1e12).map(m => m.id);   // never opened before: no gap
    out.shortGap = mailOnOpening(1e12 + DAY).map(m => m.id);
    out.longGap1 = mailOnOpening(1e12 + 5 * DAY).map(m => m.id);
    out.longGap2 = mailOnOpening(1e12 + 10 * DAY).map(m => m.id);
    out.pointsUnchanged = JSON.stringify([S.friends.rowan.points, S.friends.mira.points]) === points;

    // Opening a letter stamps it; the enclosure is granted exactly once.
    fresh();
    meet('aide'); S.town.receipts['aide-exp-share'] = true;
    deliverMail();
    const sp0 = itemCount('superpotion');
    openLetter('kern-first-week');
    out.opened = worldHas('seen', 'mail', 'kern-first-week');
    out.letterHtml = /Take it/.test(document.querySelector('#modal').innerHTML);
    takeEnclosure('kern-first-week');
    const sp1 = itemCount('superpotion');
    takeEnclosure('kern-first-week');
    out.enclosure = { gained: sp1 - sp0, again: itemCount('superpotion') - sp1,
      noButton: !/Take it/.test(document.querySelector('#modal').innerHTML) };
    activateSave(normalizeSave(JSON.parse(snap())));
    out.afterReload = claimWorldReward('mail', 'kern-first-week', worldContent('mail', 'kern-first-week').attachment) === null &&
      itemCount('superpotion') === sp1;

    // A full bag grants nothing and the enclosure keeps.
    fresh();
    meet('aide'); S.town.receipts['aide-exp-share'] = true; deliverMail();
    S.items.superpotion = itemById('superpotion').maxStack;
    takeEnclosure('kern-first-week');
    out.fullBag = { taken: worldHas('rewarded', 'mail', 'kern-first-week'), receipt: !!S.town.receipts['world:mail:kern-first-week'],
      keeps: /It will keep/.test(document.querySelector('#modal').innerHTML) };
    S.items.superpotion = 0;
    takeEnclosure('kern-first-week');
    out.fullBagLater = itemCount('superpotion') === 2;

    // Invitations offer the way there.
    fresh();
    meet('c-gym-1'); S.badges[1] = true; deliverMail();
    openLetter('byte-open-afternoon');
    out.invite = /Go to The Compiler Café/.test(document.querySelector('#modal').innerHTML);
    closeModal();

    // The hidden topbar button leaves waiting mail available in the mailbox.
    fresh();
    meet('aide'); S.town.receipts['aide-exp-share'] = true;
    renderTopbar();
    out.chip = (document.querySelector('.mail-chip') || {}).textContent || '';
    out.hiddenWaiting = mailWaiting();
    openMailbox();
    out.mailboxHtml = /About that drawer/.test(document.querySelector('#modal').innerHTML) && /just arrived/.test(document.querySelector('#modal').innerHTML);
    closeModal();

    // Opening an installed save delivers what is waiting.
    fresh();
    meet('theo'); S.badges[1] = true; S.badges[2] = true; S.badges[3] = true;
    saveGame();
    out.loaded = loadGame();
    out.deliveredOnLoad = worldHas('known', 'mail', 'theo-winch');
    out.lastOpened = Number(S.world.lastOpenedAt) > 0;
    showScreen('map');
    return out;
  });

  check('mail registry validates', r.errors.length === 0, r.errors.join('; '));
  check('seed covers letters, postcards, invitations, enclosures and returning notes',
    r.count >= 6 && r.types === 'invitation,letter,postcard' && r.returning >= 1 && r.enclosures >= 1, JSON.stringify([r.count, r.types, r.returning, r.enclosures]));
  check('no course vocabulary in mail', r.vocabulary.length === 0, r.vocabulary.join(','));
  check('returning notes carry no guilt', r.guilt.length === 0, r.guilt.join(','));
  check('unsafe mail is refused and not registered', Object.values(r.refused).every(Boolean), JSON.stringify(r.refused));
  check('a fresh save has no mail and no chip', r.freshEmpty);
  check('nobody writes to a stranger; conditions hold', r.strangerSilent && r.kernEligible);
  check('listing, counting and the chip never write', r.readOnly && r.waiting === 1, 'waiting ' + r.waiting);
  check('at most three letters arrive per moment; the rest wait', r.eligibleCount >= 5 && r.pacing.d1.length === 3 &&
    r.pacing.d2.length === r.eligibleCount - 3 && r.pacing.total === r.eligibleCount, JSON.stringify(r.pacing));
  check('returning notes need an opening after a few days', r.noAwayNoNote && r.firstOpening.length === 0 && r.shortGap.length === 0,
    JSON.stringify([r.firstOpening, r.shortGap]));
  check('one returning note per opening, both eventually arrive', r.longGap1.length === 1 && r.longGap2.length === 1 &&
    r.longGap1[0] !== r.longGap2[0], JSON.stringify([r.longGap1, r.longGap2]));
  check('being away never changes friendship', r.pointsUnchanged);
  check('opening a letter stamps it and offers the enclosure', r.opened && r.letterHtml);
  check('an enclosure is granted exactly once', r.enclosure.gained === 2 && r.enclosure.again === 0 && r.enclosure.noButton, JSON.stringify(r.enclosure));
  check('a reload cannot repeat an enclosure', r.afterReload);
  check('a full bag grants nothing and the enclosure keeps', !r.fullBag.taken && !r.fullBag.receipt && r.fullBag.keeps && r.fullBagLater,
    JSON.stringify(r.fullBag));
  check('invitations offer the way there', r.invite);
  check('the Mail button stays hidden without discarding waiting mail', r.chip === '' && r.hiddenWaiting === 1);
  check('opening the mailbox delivers and lists', r.mailboxHtml);
  check('opening an installed save delivers waiting mail', r.loaded && r.deliveredOnLoad && r.lastOpened);
  check('no page errors', errors.length === 0, errors.join(' | '));

  await browser.close();
  const failed = results.filter(x => !x.ok).length;
  console.log('\n' + (results.length - failed) + '/' + results.length + ' mail checks passed');
  process.exit(failed ? 1 : 0);
})().catch(error => { console.error(error); process.exit(1); });
