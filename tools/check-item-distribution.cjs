/* Phase 3 Slice 5: regional stock, scarcity, and stable acquisition receipts. */
const { chromium } = require('./playwright.cjs');
const results=[];
function check(name,ok,detail){results.push({name,ok});console.log((ok?'PASS  ':'FAIL  ')+name+(detail?'  ['+detail+']':''));}
(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
  try{
    const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:8780/');
    let r=await page.evaluate(()=>{
      const shops=Object.keys(SHOP_INVENTORIES),people=everyPerson();
      const invalidShops=shops.filter(id=>!people.some(p=>p.id===id&&p.kind==='shop'));
      const invalidEntries=[];
      shops.forEach(id=>SHOP_INVENTORIES[id].forEach(e=>{
        const item=itemById(e.item);if(!item||!Number.isFinite(item.price)||(e.badges!==undefined&&e.badges<0)||(e.stock!==undefined&&e.stock<1))invalidEntries.push(id+':'+e.item);
      }));
      return {shops,invalidShops,invalidEntries,maxLines:Math.max(...shops.map(id=>SHOP_INVENTORIES[id].length)),
        c:shops.filter(id=>!id.startsWith('c-')).length,calc:shops.filter(id=>id.startsWith('c-')).length};
    });
    check('every regional shop has a valid bounded stock table',!r.invalidShops.length&&!r.invalidEntries.length&&r.maxLines<=6&&r.c===5&&r.calc===4,JSON.stringify(r));

    r=await page.evaluate(()=>{
      S=freshSave();bindProgress('c');ensureBag();ensureTown();S.money=10000;SHOP_KEEPER='mart';
      const start=S.money;buyItem('superpotion',1);const locked=S.money===start&&itemCount('superpotion')===0;
      S.badges={1:true,2:true};const price=itemById('superpotion').price;buyItem('superpotion',1);
      return {locked,bought:itemCount('superpotion'),debit:start-S.money,price};
    });
    check('badge-locked stock unlocks at its exact canonical price',r.locked&&r.bought===1&&r.debit===r.price,JSON.stringify(r));

    r=await page.evaluate(()=>{
      S=freshSave();bindProgress('c');ensureBag();ensureTown();S.money=10000;SHOP_KEEPER='mart';
      buyItem('teaTin',3);const afterThree={count:itemCount('teaTin'),money:S.money,remaining:shopStockRemaining('mart',shopEntry('mart','teaTin'))};
      buyItem('teaTin',1);const refused=itemCount('teaTin')===afterThree.count&&S.money===afterThree.money;
      const raw=JSON.parse(localStorage.getItem(SAVE_KEY));activateSave(normalizeSave(raw));
      return {afterThree,refused,reloaded:shopPurchaseCount('mart','teaTin')};
    });
    check('limited shelves sell out and remain sold out after reload',r.afterThree.count===3&&r.afterThree.remaining===0&&r.refused&&r.reloaded===3,JSON.stringify(r));

    r=await page.evaluate(()=>{
      S=freshSave();bindProgress('c');ensureBag();ensureTown();SHOP_KEEPER='nemo';S.money=10;
      const before=JSON.stringify({money:S.money,items:S.items,purchases:S.town.shopPurchases});buyItem('pokeDoll',1);
      const insufficient=before===JSON.stringify({money:S.money,items:S.items,purchases:S.town.shopPurchases});
      SHOP_KEEPER='mart';S.money=9999;buyItem('rareCandy',1);
      return {insufficient,foreignRefused:itemCount('rareCandy')===0};
    });
    check('insufficient funds and unstocked purchases change nothing',r.insufficient&&r.foreignRefused,JSON.stringify(r));

    r=await page.evaluate(()=>{
      S=freshSave();bindProgress('c');ensureBag();ensureTown();
      const first=claimReceiptItems('gym-reward:c:5',[{item:'revive',count:1}]);
      const second=claimReceiptItems('gym-reward:c:5',[{item:'revive',count:1}]);
      const invalid=claimReceiptItems('bad-bundle',[{item:'missing',count:1}]);
      return {first:!!first,second:!!second,count:itemCount('revive'),receipt:!!S.town.receipts['gym-reward:c:5'],invalid:!!invalid,badReceipt:!!S.town.receipts['bad-bundle']};
    });
    check('milestone bundles are atomic and cannot repeat',r.first&&!r.second&&r.count===1&&r.receipt&&!r.invalid&&!r.badReceipt,JSON.stringify(r));

    r=await page.evaluate(()=>{
      S=freshSave();bindProgress('c');ensureBag();ensureTown();
      const aide=townsfolkById('aide');const grant=claimTownGrant(aide);const again=claimTownGrant(aide);
      const saved=JSON.parse(JSON.stringify(S));delete saved.items.expShare;activateSave(normalizeSave(saved));ensureTown();
      return {grant:!!grant,again:!!again,count:itemCount('expShare'),receipt:!!S.town.receipts['aide-exp-share']};
    });
    check('unique town acquisitions remain single and old saves normalize safely',r.grant&&!r.again&&r.count===1&&r.receipt,JSON.stringify(r));

    r=await page.evaluate(()=>{
      const sources={shops:new Set(),town:new Set(),trainers:new Set(),quests:new Set(),gyms:new Set()};
      Object.values(SHOP_INVENTORIES).flat().forEach(e=>sources.shops.add(e.item));
      everyPerson().forEach(p=>{if(p.item)sources.town.add(p.item);if(p.grant)sources.town.add(p.grant.item);(p.firstWinItems||[]).forEach(e=>sources.trainers.add(e.item));});
      SIDE_QUESTS.forEach(q=>q.rewards.berries.forEach(e=>sources.quests.add(e.id)));
      Object.values(GYM_ITEM_REWARDS).forEach(region=>Object.values(region).flat().forEach(e=>sources.gyms.add(e.item)));
      return Object.fromEntries(Object.entries(sources).map(([k,v])=>[k,v.size]));
    });
    check('items are distributed across shops, townsfolk, trainers, quests, and gyms',Object.values(r).every(n=>n>0),JSON.stringify(r));
    check('no page errors',errors.length===0,errors.join(' | '));
  }finally{await browser.close();}
  const passed=results.filter(r=>r.ok).length;console.log('\n'+passed+'/'+results.length+' checks passed');if(passed!==results.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
