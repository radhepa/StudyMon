/* Kern's one-time EXP Share grant and save reconciliation. */
const { chromium } = require('./playwright.cjs');

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok });
  console.log((ok ? 'PASS  ' : 'FAIL  ') + name + (detail ? '  [' + detail + ']' : ''));
}

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
  });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:8780/');

    let r = await page.evaluate(() => {
      localStorage.clear();
      S = freshSave(); bindProgress('c'); S.settings.sound = false;
      S.party = [makeMon(255, 10)]; ensureFriends(); ensureBag(); ensureTown();
      const before = friendship('aide').points;
      talkTo('aide');
      const firstText = document.querySelector('#modal .box').textContent;
      const first = {
        item: itemCount('expShare'), receipt: !!S.town.receipts['aide-exp-share'],
        met: !!S.town.met.aide && friendship('aide').met,
        talks: friendship('aide').talks, points: friendship('aide').points - before,
        notice: firstText.includes('Received 1 EXP Share.'), dialogue: firstText.includes(townsfolkById('aide').say)
      };
      closeModal();
      talkTo('aide');
      const secondText = document.querySelector('#modal .box').textContent;
      const repeat = {
        item: itemCount('expShare'), receipt: !!S.town.receipts['aide-exp-share'],
        extraNotice: secondText.includes('Received 1 EXP Share.')
      };
      return { first, repeat };
    });
    check('Kern grants one EXP Share during an ordinary first conversation',
      r.first.item === 1 && r.first.receipt && r.first.met && r.first.talks === 1 &&
      r.first.points > 0 && r.first.notice && r.first.dialogue, JSON.stringify(r.first));
    check('repeat conversations preserve the item without another receipt notice',
      r.repeat.item === 1 && r.repeat.receipt && !r.repeat.extraNotice, JSON.stringify(r.repeat));

    r = await page.evaluate(async () => {
      closeModal();
      const exported = JSON.parse(JSON.stringify(S));
      const reloaded = loadGame();
      const afterReload = { item: itemCount('expShare'), receipt: !!S.town.receipts['aide-exp-share'] };
      const imported = await new Promise(resolve => {
        const file = new File([JSON.stringify(exported)], 'save.json', { type: 'application/json' });
        importSave(file, error => resolve(!error));
      });
      return {
        reloaded, imported, afterReload,
        afterImport: { item: itemCount('expShare'), receipt: !!S.town.receipts['aide-exp-share'] }
      };
    });
    check('reload and import preserve the EXP Share receipt pair',
      r.reloaded && r.imported && r.afterReload.item === 1 && r.afterReload.receipt &&
      r.afterImport.item === 1 && r.afterImport.receipt, JSON.stringify(r));

    r = await page.evaluate(() => {
      S = freshSave(); bindProgress('c'); ensureFriends(); ensureBag();
      giveItem('expShare', 1);
      ensureTown();
      const itemOnly = { item: itemCount('expShare'), receipt: !!S.town.receipts['aide-exp-share'] };

      S = freshSave(); bindProgress('c'); ensureFriends(); ensureBag();
      S.town.receipts['aide-exp-share'] = true;
      ensureTown();
      const receiptOnly = { item: itemCount('expShare'), receipt: !!S.town.receipts['aide-exp-share'] };

      giveItem('expShare', 4); giveItem('expShare', 1);
      ensureBag();
      return { itemOnly, receiptOnly, uniqueCount: itemCount('expShare') };
    });
    check('an existing item silently creates its missing receipt',
      r.itemOnly.item === 1 && r.itemOnly.receipt, JSON.stringify(r.itemOnly));
    check('an existing receipt silently restores its missing key item',
      r.receiptOnly.item === 1 && r.receiptOnly.receipt, JSON.stringify(r.receiptOnly));
    check('the EXP Share remains unique', r.uniqueCount === 1, 'count ' + r.uniqueCount);

    r = await page.evaluate(() => {
      S = freshSave(); bindProgress('c'); S.settings.sound = false; ensureBag();
      S.party = [makeMon(6, 60), makeMon(9, 60), makeMon(3, 60)];
      const target = makeMon(10, 20);
      const full = Math.floor((dexOf(target.id).bst / 6) * target.lvl / 4) + 12;
      const before = S.party.map(mon => mon.xp);
      startBattle({ kind: 'wild', chapters: [1], foes: [target], title: 'EXP test' });
      doSwitch(1); doSwitch(0); doSwitch(1);
      const participantCount = B.participants.length;
      foeFainted();
      const gained = S.party.map((mon, index) => mon.xp - before[index]);
      B.over = true; B = null;
      return { full, participantCount, gained };
    });
    check('switching grants full EXP once to every unique participant without EXP Share',
      r.participantCount === 2 && r.gained[0] === r.full && r.gained[1] === r.full && r.gained[2] === 0,
      JSON.stringify(r));

    r = await page.evaluate(() => {
      S = freshSave(); bindProgress('c'); S.settings.sound = false; ensureBag();
      giveItem('expShare', 1);
      const faintedParticipant = makeMon(6, 60);
      const activeParticipant = makeMon(9, 60);
      const shared = makeMon(3, 60);
      const faintedBench = makeMon(149, 60); faintedBench.hp = 0;
      const capped = makeMon(150, 100); capped.xp = 17;
      const boxed = makeMon(151, 60);
      S.party = [faintedParticipant, activeParticipant, shared, faintedBench, capped];
      S.box = [boxed];
      let target = null, full = 0;
      for (let level = 2; level <= 20 && !target; level++) {
        for (let i = 0; i < DEX.length; i++) {
          const candidate = makeMon(DEX[i].id, level);
          const amount = Math.floor((dexOf(candidate.id).bst / 6) * candidate.lvl / 4) + 12;
          if (amount % 2 === 1) { target = candidate; full = amount; break; }
        }
      }
      const before = S.party.concat(S.box).map(mon => mon.xp);
      startBattle({ kind: 'wild', chapters: [1], foes: [target], title: 'EXP exclusions' });
      faintedParticipant.hp = 0;
      doSwitch(1);
      foeFainted();
      const after = S.party.concat(S.box).map(mon => mon.xp);
      const gained = after.map((xp, index) => xp - before[index]);
      B.over = true; B = null;
      return { full, half: Math.floor(full * 0.5), gained, cappedXp: capped.xp };
    });
    check('EXP Share rounds down and excludes fainted, boxed, and level-100 Pokémon',
      r.full % 2 === 1 && r.gained[0] === 0 && r.gained[1] === r.full &&
      r.gained[2] === r.half && r.gained[3] === 0 && r.gained[4] === 0 &&
      r.gained[5] === 0 && r.cappedXp === 17, JSON.stringify(r));

    r = await page.evaluate(async () => {
      const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
      S = freshSave(); bindProgress('c'); S.settings.sound = false; ensureBag(); giveItem('expShare', 1);
      S.party = [makeMon(6, 60), makeMon(9, 60), makeMon(3, 60)];
      const foes = [makeMon(10, 20), makeMon(13, 21)];
      const gains = foes.map(mon => Math.floor((dexOf(mon.id).bst / 6) * mon.lvl / 4) + 12);
      const before = S.party.map(mon => mon.xp);
      startBattle({ kind: 'wild', chapters: [1], foes, title: 'Multi-foe EXP test' });
      doSwitch(1);
      foeFainted();
      await sleep(1250);
      const reset = B.foeIx === 1 && B.participants.length === 1 && B.participants[0] === S.party[1];
      doSwitch(2);
      const secondParticipants = B.participants.map(mon => S.party.indexOf(mon));
      foeFainted();
      const gained = S.party.map((mon, index) => mon.xp - before[index]);
      B.over = true; B = null;
      return { gains, reset, secondParticipants, gained };
    });
    check('each new foe resets participation to the active Pokémon',
      r.reset && JSON.stringify(r.secondParticipants) === JSON.stringify([1, 2]), JSON.stringify(r));
    check('multi-foe awards use each foe’s participant set and EXP Share recipients',
      r.gained[0] === r.gains[0] + Math.floor(r.gains[1] * 0.5) &&
      r.gained[1] === r.gains[0] + r.gains[1] &&
      r.gained[2] === Math.floor(r.gains[0] * 0.5) + r.gains[1], JSON.stringify(r));

    r = await page.evaluate(() => {
      S = freshSave(); bindProgress('c'); S.settings.sound = false; ensureBag(); giveItem('expShare', 1);
      const bulbasaur = makeMon(1, 15); bulbasaur.xp = xpToNext(15) - 1;
      const charmander = makeMon(4, 15); charmander.xp = xpToNext(15) - 1;
      S.party = [bulbasaur, charmander];
      const target = makeMon(150, 100);
      const full = Math.floor((dexOf(target.id).bst / 6) * target.lvl / 4) + 12;
      clearLog();
      const emitted = [];
      const realLog = log;
      log = html => { emitted.push(html); realLog(html); };
      startBattle({ kind: 'wild', chapters: [1], foes: [target], title: 'Evolution queue test' });
      foeFainted();
      log = realLog;
      const queued = EVOLUTION_NOTICES.map(notice => notice.event.from);
      const firstNotice = document.querySelector('#modal .box').textContent;
      closeModal();
      const secondNotice = document.querySelector('#modal .box').textContent;
      closeModal();
      const result = {
        full,
        ids: S.party.map(mon => mon.id),
        levels: S.party.map(mon => mon.lvl),
        queued,
        firstNotice,
        secondNotice,
        queueEmpty: !EVOLUTION_NOTICE_OPEN && EVOLUTION_NOTICES.length === 0,
        dex: !!S.caught[2] && !!S.seen[2] && !!S.caught[5] && !!S.seen[5],
        logs: emitted.join(' ')
      };
      B.over = true; B = null;
      return result;
    });
    check('one award can produce multiple level-ups for multiple recipients',
      r.levels[0] >= 18 && r.levels[1] >= 17 &&
      r.logs.includes('BULBASAUR grew to level 16') && r.logs.includes('CHARMANDER grew to level 16'),
      JSON.stringify({ levels: r.levels, logs: r.logs }));
    check('simultaneous evolution notices are queued in party order with correct names',
      JSON.stringify(r.queued) === JSON.stringify(['Bulbasaur', 'Charmander']) &&
      r.firstNotice.includes('BULBASAUR') && r.firstNotice.includes('IVYSAUR') &&
      r.secondNotice.includes('CHARMANDER') && r.secondNotice.includes('CHARMELEON') && r.queueEmpty,
      JSON.stringify({ queued: r.queued, first: r.firstNotice, second: r.secondNotice }));
    check('recipient evolutions update the correct party objects and Pokédex flags',
      r.ids[0] === 2 && r.ids[1] === 5 && r.dex, JSON.stringify({ ids: r.ids, dex: r.dex }));

    check('no page errors', errors.length === 0, errors.join(' | '));
  } finally {
    await browser.close();
  }

  const passed = results.filter(result => result.ok).length;
  console.log('\n' + passed + '/' + results.length + ' checks passed');
  if (passed !== results.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
