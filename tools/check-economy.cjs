/* Phase 3 Slice 8: deterministic economy scenarios and save/receipt closeout. */
const { chromium } = require('./playwright.cjs');
const results=[];
function check(name,ok,detail){results.push({name,ok});console.log((ok?'PASS  ':'FAIL  ')+name+(detail?'  ['+detail+']':''));}
(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
  try{
    const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:8780/');

    let r=await page.evaluate(()=>{
      function scenario(name,level,wildWins,trainerWins,gymWins,questMoney){
        const income=500+wildWins*battlePrize('wild',level)+trainerWins*battlePrize('npc',level,170)+gymWins*battlePrize('gym',level)+questMoney;
        return {name,level,income,potions:Math.floor(income/ITEMS.potion.price),revives:Math.floor(income/ITEMS.revive.price),
          cheapestGift:Math.floor(income/Math.min(ITEMS.teaTin.price,ITEMS.pressedFlower.price,ITEMS.hotSauce.price,ITEMS.carvedWhistle.price))};
      }
      return [scenario('early',8,5,2,1,600),scenario('middle',35,12,8,4,4200),scenario('late',70,20,16,8,9000)];
    });
    check('early, middle, and late income supports healing without making premium supplies trivial',r[0].potions>=5&&r[0].revives<4&&r[1].revives>=8&&r[2].income>r[1].income&&r[1].income>r[0].income,JSON.stringify(r));
    check('gift costs remain meaningful but reachable across progression',r[0].cheapestGift>=2&&r[0].cheapestGift<10&&r[1].cheapestGift>r[0].cheapestGift,JSON.stringify(r));

    r=await page.evaluate(()=>{
      const early=SHOP_INVENTORIES.mart.map(e=>e.item),middle=SHOP_INVENTORIES.clerk2.map(e=>e.item),late=SHOP_INVENTORIES.shopq.map(e=>e.item);
      const limited=[];Object.keys(SHOP_INVENTORIES).forEach(v=>SHOP_INVENTORIES[v].forEach(e=>{if(Number.isFinite(e.stock))limited.push(v+':'+e.item+':'+e.stock);}));
      const rareEverywhere=['rareCandy','prismStone'].every(id=>Object.keys(SHOP_INVENTORIES).every(v=>SHOP_INVENTORIES[v].some(e=>e.item===id)));
      return {early,middle,late,limited:limited.length,rareEverywhere};
    });
    check('healing tiers are available in progression-appropriate regional stock',r.early.includes('potion')&&r.middle.includes('revive')&&r.late.includes('superpotion')&&r.late.includes('revive'),JSON.stringify(r));
    check('limited shelves preserve item scarcity and no rare training/evolution item is universal',r.limited>=10&&!r.rareEverywhere,JSON.stringify(r));

    r=await page.evaluate(()=>{
      S=freshSave();bindProgress('c');ensureFriends();ensureBag();ensureTown();
      const first=claimReceiptItems('sim:unique',[{item:'expShare',count:1}]);const second=claimReceiptItems('sim:unique',[{item:'expShare',count:1}]);
      const other=claimReceiptItems('sim:unique-other',[{item:'expShare',count:1}]);
      return {first:!!first,second:!!second,other:!!other,count:itemCount('expShare'),receipts:Object.keys(S.town.receipts)};
    });
    check('unique items and receipt IDs resist duplicate rewards independently',r.first&&!r.second&&!r.other&&r.count===1&&r.receipts.filter(id=>id==='sim:unique').length===1,JSON.stringify(r));

    r=await page.evaluate(()=>{
      const legacy={v:1,subject:'c',trainer:'OLD',party:[],box:[],seen:{},caught:{},badges:{},elite:{},money:777,items:{potion:2,futureRelic:{n:4}},town:{beaten:{},gifts:{},met:{},receipts:{}},srs:{},clock:0,chapterStats:{},totals:{r:0,w:0,battles:0,wins:0,caught:0},streak:0,bestStreak:0,settings:{sound:true}};
      const save=normalizeSave(legacy);activateSave(save);const before={schema:S.schemaVersion,money:S.money,unknown:JSON.stringify(S.items.futureRelic),giftLedger:!!S.giftLedger,shops:!!S.town.shopPurchases};
      S.giftLedger.rowan={n:1,d:{teaTin:'loved'},r:{'export:1':1}};S.town.shopPurchases={'mart:teaTin':1};
      const exported=JSON.stringify(S),imported=normalizeSave(JSON.parse(exported));activateSave(imported);
      return {before,external:S.v,discovery:S.giftLedger.rowan.d.teaTin,purchase:S.town.shopPurchases['mart:teaTin'],unknown:JSON.stringify(S.items.futureRelic)};
    });
    check('legacy saves hydrate and exported-imported saves retain gift, shop, and unknown item state',r.before.schema===3&&r.before.money===777&&r.before.giftLedger&&r.before.shops&&r.external===1&&r.discovery==='loved'&&r.purchase===1&&r.unknown===r.before.unknown,JSON.stringify(r));

    r=await page.evaluate(()=>{
      S=freshSave();bindProgress('c');ensureFriends();ensureBag();const f=friendship('rowan');f.met=true;giveItem('teaTin',1);
      const real=persistGiftTransaction;persistGiftTransaction=()=>false;const result=giveGift('rowan','teaTin',{receiptId:'economy:failed-save'});persistGiftTransaction=real;
      return {result,count:itemCount('teaTin'),points:friendship('rowan').points,ledger:S.giftLedger.rowan};
    });
    check('failed storage leaves currency-adjacent gift state fully atomic',!r.result.accepted&&r.result.reason==='save-failed'&&r.count===1&&r.points===0&&(!r.ledger||(!Object.keys(r.ledger.d).length&&!Object.keys(r.ledger.r).length)),JSON.stringify(r));

    r=await page.evaluate(()=>{
      S=freshSave();bindProgress('c');ensureBag();S.money=5000;
      SHOP_KEEPER='mart';buyItem('teaTin',1);const afterC={money:S.money,count:itemCount('teaTin'),purchases:shopPurchaseCount('mart','teaTin')};
      SHOP_KEEPER='c-mart-harbour';buyItem('pressedFlower',1);const afterCalc={money:S.money,count:itemCount('pressedFlower'),purchases:shopPurchaseCount('c-mart-harbour','pressedFlower')};
      return {afterC,afterCalc,distinct:JSON.stringify(shopInventory('mart'))!==JSON.stringify(shopInventory('c-mart-harbour'))};
    });
    check('C and Calculus shops use distinct stock and persistent vendor purchase counters',r.afterC.money===4580&&r.afterC.count===1&&r.afterC.purchases===1&&r.afterCalc.money===4220&&r.afterCalc.count===1&&r.afterCalc.purchases===1&&r.distinct,JSON.stringify(r));
    check('no page errors',errors.length===0,errors.join(' | '));
  }finally{await browser.close();}
  const passed=results.filter(r=>r.ok).length;console.log('\n'+passed+'/'+results.length+' checks passed');if(passed!==results.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
