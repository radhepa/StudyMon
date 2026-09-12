/* Phase 3 registry contract, acquisition references, and key-item safety. */
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
      const required = ['category', 'rarity', 'value', 'sellable', 'consumable',
        'unique', 'maxStack', 'effectHandler', 'discoveryText'];
      const records = Object.keys(ITEMS).map(id => ({
        id,
        complete: required.every(field => Object.prototype.hasOwnProperty.call(ITEMS[id], field)),
        band: itemValueBand(id)
      }));
      const badKey = JSON.parse(JSON.stringify(ITEMS));
      badKey.expShare.consumable = true;
      return {
        ids: Object.keys(ITEMS), records,
        errors: validateItemRegistry(ITEMS),
        catchesBadKey: validateItemRegistry(badKey).some(message => message.includes('key items')),
        vocabulary: { categories: ITEM_CATEGORIES.slice(), rarities: ITEM_RARITIES.slice() }
      };
    });
    check('the expanded catalog stays under its ceiling and validates every record',
      r.ids.length > 7 && r.ids.length <= 36 && r.records.every(record => record.complete && record.band) && r.errors.length === 0,
      JSON.stringify(r.records));
    check('registry validation rejects an unsafe key-item contract', r.catchesBadKey);
    check('the approved category and rarity vocabularies are installed',
      r.vocabulary.categories.length === 10 && r.vocabulary.rarities.length === 5);

    r = await page.evaluate(() => {
      const people = everyPerson();
      const badPeople = people.filter(person =>
        (person.item && !itemById(person.item)) || (person.grant && !itemById(person.grant.item)));
      const badStock = SHOP_STOCK.filter(id => !itemById(id) || !itemById(id).sellable);
      const badQuestRewards = SIDE_QUESTS.flatMap(quest =>
        quest.rewards.berries.filter(reward => !itemById(reward.id)).map(reward => quest.id + ':' + reward.id));
      const badBalls = Object.keys(BALLS).filter(id =>
        id !== 'poke' && (!itemById(id) || itemById(id).effectHandler !== 'capture'));
      return { badPeople, badStock, badQuestRewards, badBalls };
    });
    check('all town, shop, quest, and capture compatibility references resolve centrally',
      !r.badPeople.length && !r.badStock.length && !r.badQuestRewards.length && !r.badBalls.length,
      JSON.stringify(r));

    r = await page.evaluate(() => {
      S = freshSave(); bindProgress('c'); ensureFriends(); ensureBag(); ensureTown();
      S.items.expShare = 1;
      const beforeMoney = S.money;
      const consumed = useItem('expShare', 1);
      const sold = sellItem('expShare', 1);
      giveItem('expShare', 12);
      S.items.expShare = 8;
      ensureBag();
      return { consumed, sold, count: itemCount('expShare'), money: S.money, beforeMoney };
    });
    check('key items cannot be consumed or sold',
      !r.consumed && !r.sold && r.money === r.beforeMoney && r.count === 1, JSON.stringify(r));
    check('key items cannot stack above one', r.count === 1);

    r = await page.evaluate(() => {
      S = freshSave(); bindProgress('c'); ensureFriends(); ensureBag();
      S.items.expShare = 9;
      ensureTown();
      const itemOnly = { count: itemCount('expShare'), receipt: !!S.town.receipts['aide-exp-share'] };

      S = freshSave(); bindProgress('c'); ensureFriends(); ensureBag();
      S.town.receipts['aide-exp-share'] = true;
      ensureTown();
      const receiptOnly = { count: itemCount('expShare'), receipt: !!S.town.receipts['aide-exp-share'] };
      ensureTown(); giveItem('expShare', 5); ensureTown();
      const repeated = { count: itemCount('expShare'), receipt: !!S.town.receipts['aide-exp-share'] };
      return { itemOnly, receiptOnly, repeated };
    });
    check('unique receipt reconciliation repairs either half without duplication',
      [r.itemOnly, r.receiptOnly, r.repeated].every(pair => pair.count === 1 && pair.receipt), JSON.stringify(r));

    r = await page.evaluate(() => {
      const legacy = freshSave();
      legacy.items.futureRelic = { quantity: 7, extension: ['kept'] };
      const normalized = normalizeSave(legacy);
      S = normalized; bindProgress('c'); ensureFriends(); ensureBag(); ensureTown();
      const before = JSON.stringify(S.items.futureRelic);
      const visibleCount = itemCount('futureRelic');
      const used = useItem('futureRelic', 1);
      const given = giveItem('futureRelic', 1);
      const sold = sellItem('futureRelic', 1);
      return { before, after: JSON.stringify(S.items.futureRelic), visibleCount, used, given, sold };
    });
    check('unknown inventory keys survive normalization without becoming actionable',
      r.before === r.after && r.visibleCount === 0 && !r.used && !r.given && !r.sold, JSON.stringify(r));

    r = await page.evaluate(() => {
      S = freshSave(); bindProgress('c'); ensureBag();
      S.items.potion = 98;
      giveItem('potion', 5);
      const capped = itemCount('potion');
      const before = S.money;
      const sold = sellItem('potion', 2);
      S.items.great = 98;
      const purchaseMoney = S.money;
      buyItem('great', 5);
      const purchaseRefused = S.items.great === 98 && S.money === purchaseMoney;
      S.balls = 20; S.items.great = 98; ensureBag();
      return { capped, after: itemCount('potion'), sold, proceeds: S.money - before,
        purchaseRefused, migrated: itemCount('great'), legacyRemoved: !Object.prototype.hasOwnProperty.call(S, 'balls') };
    });
    check('ordinary items obey the 99 stack cap across grants, purchases, and migration',
      r.capped === 99 && r.purchaseRefused && r.migrated === 99 && r.legacyRemoved, JSON.stringify(r));
    check('selling uses the canonical item value',
      r.sold && r.after === 97 && r.proceeds === 250, JSON.stringify(r));

    r = await page.evaluate(() => {
      S = freshSave(); bindProgress('c'); ensureBag();
      const mon = makeMon(1, 12); S.party = [mon];
      const maximum = maxHp(mon); mon.hp = maximum - 12;
      giveItem('oran', 2);
      const healed = performItemEffect('oran', 'party', mon);
      const afterHeal = { hp: mon.hp, count: itemCount('oran'), amount: healed && healed.amount };
      mon.hp = maxHp(mon);
      const fullRefused = !performItemEffect('oran', 'party', mon);
      mon.hp = 0;
      const faintedRefused = !performItemEffect('oran', 'party', mon);
      giveItem('revive', 1);
      const revived = performItemEffect('revive', 'party', mon);
      const reviveState = { hp: mon.hp, count: itemCount('revive'), amount: revived && revived.amount };
      const livingRefused = !performItemEffect('revive', 'party', mon);
      const wrongContexts = !performItemEffect('potion', 'party', mon) && !performItemEffect('oran', 'battle', mon);
      return { maximum, afterHeal, fullRefused, faintedRefused, reviveState, livingRefused, wrongContexts };
    });
    check('between-battle healing and revival enforce valid targets and contexts',
      r.afterHeal.amount === 10 && r.afterHeal.count === 1 && r.fullRefused && r.faintedRefused &&
      r.reviveState.hp > 0 && r.reviveState.count === 0 && r.livingRefused && r.wrongContexts, JSON.stringify(r));

    r = await page.evaluate(() => {
      S = freshSave(); bindProgress('c'); ensureBag();
      const mon = makeMon(4, 10); S.party = [mon]; mon.hp = maxHp(mon) - 20;
      S.items.potion = 0;
      giveItem('potion', 1); giveItem('pokeDoll', 1);
      B = { over: false, kind: 'wild', you: mon, foes: [makeMon(7, 10)], foeIx: 0 };
      const healed = useBattleItem('potion');
      const healState = { hp: mon.hp, count: itemCount('potion'), healed };
      const escaped = useBattleItem('pokeDoll');
      const escapeState = { over: B.over, count: itemCount('pokeDoll'), escaped };
      B = { over: false, kind: 'gym', you: mon, foes: [makeMon(7, 10)], foeIx: 0 };
      giveItem('pokeDoll', 1);
      const gymRefused = !useBattleItem('pokeDoll') && itemCount('pokeDoll') === 1 && !B.over;
      B = null;
      return { healState, escapeState, gymRefused };
    });
    check('battle handlers heal and escape only in their supported contexts',
      r.healState.healed && r.healState.count === 0 && r.escapeState.escaped && r.escapeState.over &&
      r.escapeState.count === 0 && r.gymRefused, JSON.stringify(r));

    r = await page.evaluate(() => {
      S = freshSave(); bindProgress('c'); ensureBag();
      const mon = makeMon(1, 10); S.party = [mon]; mon.hp = Math.max(1, maxHp(mon) - 8);
      giveItem('oran', 1);
      const before = { hp: mon.hp, count: itemCount('oran') };
      const realPersist = persistBagUse;
      persistBagUse = () => false;
      const used = performItemEffect('oran', 'party', mon);
      persistBagUse = realPersist;
      return { before, after: { hp: mon.hp, count: itemCount('oran') }, used };
    });
    check('failed persistence rolls back both the effect and inventory debit',
      !r.used && r.before.hp === r.after.hp && r.before.count === r.after.count, JSON.stringify(r));

    r = await page.evaluate(() => {
      S = freshSave(); bindProgress('c'); ensureBag();
      const mon = makeMon(1, 10); S.party = [mon]; giveItem('rareCandy', 1);
      const before = mon.lvl;
      const trained = performItemEffect('rareCandy', 'party', mon);
      const raw = localStorage.getItem(SAVE_KEY);
      const saved = JSON.parse(raw);
      activateSave(normalizeSave(saved));
      return { before, after: S.party[0].lvl, count: itemCount('rareCandy'), trained: !!trained };
    });
    check('training effects survive save and reload',
      r.trained && r.after === r.before + 1 && r.count === 0, JSON.stringify(r));

    r = await page.evaluate(() => {
      S = freshSave(); bindProgress('c'); ensureBag();
      const mon = makeMon(133, 5); S.party = [mon]; giveItem('prismStone', 1);
      const branches = evolutionBranches(mon);
      if (!branches.length) return { skipped: true };
      const target = branches[branches.length - 1].to;
      const opened = openEvolutionItemChoice('prismStone', 0);
      const evolved = confirmItemEvolutionChoice(target);
      return { opened, evolved, target, id: mon.id, count: itemCount('prismStone'), seen: !!S.seen[target], caught: !!S.caught[target] };
    });
    check('Prism Stones commit an explicit branching evolution choice',
      r.skipped || (r.opened && r.evolved && r.id === r.target && r.count === 0 && r.seen && r.caught), JSON.stringify(r));

    r = await page.evaluate(() => {
      S = freshSave(); bindProgress('c'); ensureBag();
      ['trailPermit', 'fieldNotebook', 'circuitToken', 'seaGlass', 'integralToken',
        'teaTin', 'pressedFlower', 'hotSauce', 'carvedWhistle', 'bentSpoon', 'tinyUmbrella'].forEach(id => giveItem(id, 1));
      const groups = ITEM_CATEGORIES.reduce((out, category) => {
        out[category] = bagOwnedKeys().filter(id => itemById(id).category === category).length; return out;
      }, {});
      const collection = collectionProgress('regionalKeepsakes');
      const protectedObjects = ['trailPermit', 'fieldNotebook', 'circuitToken', 'seaGlass', 'integralToken']
        .every(id => !itemCanConsume(id));
      const giftUseRefused = !performItemEffect('teaTin', 'party', S.party[0]);
      return { groups, collection, protectedObjects, giftUseRefused };
    });
    check('exploration, collection, gift, and flavor inventory remains distinct and safely grouped',
      r.groups.exploration === 2 && r.groups.collectible === 3 && r.groups.gift === 4 && r.groups.flavor === 2 &&
      r.collection.found === 3 && r.collection.total === 3 && r.protectedObjects && r.giftUseRefused, JSON.stringify(r));

    check('no page errors', errors.length === 0, errors.join(' | '));
  } finally {
    await browser.close();
  }

  const passed = results.filter(result => result.ok).length;
  console.log('\n' + passed + '/' + results.length + ' checks passed');
  if (passed !== results.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
