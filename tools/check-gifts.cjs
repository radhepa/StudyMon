/* Phase 3 Slices 6-7: atomic gifts, authored reactions, presentation, and discovery. */
const { chromium } = require('./playwright.cjs');
const results=[];
function check(name,ok,detail){results.push({name,ok});console.log((ok?'PASS  ':'FAIL  ')+name+(detail?'  ['+detail+']':''));}
(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
  try{
    const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:8780/');
    let r=await page.evaluate(()=>({loved:giftPreferenceBand('rowan','teaTin'),liked:giftPreferenceBand('c-hawthorn','carvedWhistle'),neutral:giftPreferenceBand('rowan','pressedFlower'),disliked:giftPreferenceBand('theo','carvedWhistle'),hated:giftPreferenceBand('rowan','hotSauce')}));
    check('all five preference bands resolve from stable item IDs and tags',JSON.stringify(r)===JSON.stringify({loved:'loved',liked:'liked',neutral:'neutral',disliked:'disliked',hated:'hated'}),JSON.stringify(r));

    r=await page.evaluate(()=>{
      S=freshSave();bindProgress('c');ensureFriends();ensureBag();friendship('rowan').met=true;giveItem('teaTin',2);
      const before=friendship('rowan').points,first=giveGift('rowan','teaTin',{receiptId:'test:first'}),afterFirst=friendship('rowan').points,count=itemCount('teaTin');
      const duplicate=giveGift('rowan','teaTin',{receiptId:'test:first'});
      return {first,delta:afterFirst-before,count,duplicate,afterDuplicate:friendship('rowan').points,discovery:giftDiscovery('rowan')};
    });
    check('a valid gift debits once, awards friendship, and discovers preference',r.first.accepted&&r.first.band==='loved'&&r.delta>0&&r.count===1&&!r.duplicate.accepted&&r.duplicate.reason==='duplicate-receipt'&&r.afterDuplicate===r.delta&&r.discovery.teaTin==='loved',JSON.stringify(r));

    r=await page.evaluate(()=>{
      S=freshSave();bindProgress('c');ensureFriends();ensureBag();friendship('rowan').met=true;giveItem('teaTin',4);
      const changes=[];for(let i=0;i<3;i++)changes.push(giveGift('rowan','teaTin',{receiptId:'pace:'+i}).change);
      const before={count:itemCount('teaTin'),points:friendship('rowan').points};const fourth=giveGift('rowan','teaTin',{receiptId:'pace:3'});
      const afterFourth={count:itemCount('teaTin'),points:friendship('rowan').points};S.activityClock+=FRIEND_WINDOW;const reset=giveGift('rowan','teaTin',{receiptId:'pace:4'});
      return {changes,before,fourth,afterFourth,reset};
    });
    check('per-character gift pacing diminishes then enforces and resets its limit',r.changes[0]>r.changes[1]&&r.changes[1]>r.changes[2]&&!r.fourth.accepted&&r.fourth.reason==='frequency-limit'&&r.before.count===r.afterFourth.count&&r.reset.accepted,JSON.stringify(r));

    r=await page.evaluate(()=>{
      S=freshSave();bindProgress('c');ensureFriends();ensureBag();giveItem('teaTin',1);giveItem('potion',1);
      const before=JSON.stringify(S.items);const unknown=giveGift('missing','teaTin'),unmet=giveGift('rowan','teaTin');friendship('rowan').met=true;const notGift=giveGift('rowan','potion');
      const world=castEntries({befriendable:false})[0];const nonfriend=world?giveGift(world.id,'teaTin'):null;
      return {same:before===JSON.stringify(S.items),unknown:unknown.reason,unmet:unmet.reason,notGift:notGift.reason,nonfriend:nonfriend&&nonfriend.reason};
    });
    check('invalid recipients and item choices never debit inventory',r.same&&r.unknown==='unknown-character'&&r.unmet==='not-met'&&r.notGift==='not-a-gift'&&r.nonfriend==='not-befriendable',JSON.stringify(r));

    r=await page.evaluate(()=>{
      S=freshSave();bindProgress('c');ensureFriends();ensureBag();friendship('rowan').met=true;giveItem('teaTin',1);
      const real=persistGiftTransaction;persistGiftTransaction=()=>false;
      const gift=giveGift('rowan','teaTin',{receiptId:'save:fail'});persistGiftTransaction=real;
      const record=S.giftLedger.rowan;return {gift,count:itemCount('teaTin'),points:friendship('rowan').points,
        discovery:record&&Object.keys(record.d).length,receipts:record&&Object.keys(record.r).length,
        giftPacing:friendship('rowan').rewardPacing.counts.gift||0};
    });
    check('failed persistence rolls back friendship, discovery, receipt, and item debit',!r.gift.accepted&&r.gift.reason==='save-failed'&&r.count===1&&r.points===0&&!r.discovery&&!r.receipts&&!r.giftPacing,JSON.stringify(r));

    r=await page.evaluate(()=>{
      S=freshSave();bindProgress('c');ensureFriends();ensureBag();const f=friendship('rowan');f.met=true;f.points=598;giveItem('teaTin',2);
      const first=giveGift('rowan','teaTin',{receiptId:'cap:1'});S.activityClock+=FRIEND_WINDOW;const second=giveGift('rowan','teaTin',{receiptId:'cap:2'});
      const raw=JSON.parse(localStorage.getItem(SAVE_KEY));activateSave(normalizeSave(raw));
      return {first:first.change,second:second.change,points:friendship('rowan').points,discovery:giftDiscovery('rowan').teaTin,receipts:Object.keys(S.giftLedger.rowan.r).length};
    });
    check('gifts cannot independently cross the close-friend ceiling and survive reload',r.first===1&&r.second===0&&r.points===599&&r.discovery==='loved'&&r.receipts===2,JSON.stringify(r));

    r=await page.evaluate(()=>{
      const ids=castEntries({tier:1}).map(c=>c.id),bands=['loved','liked','neutral','disliked','hated'];
      const lines=ids.flatMap(id=>bands.map(b=>giftReaction(id,b)));
      const contaminated=lines.filter(line=>/\b(code|coding|calculus|derivative|integral|question|quiz|study|lesson)\b/i.test(line));
      return {ids,count:lines.length,unique:new Set(lines).size,missing:lines.filter(line=>!line||/accept the gift and tell you plainly/.test(line)).length,contaminated};
    });
    check('all Tier 1 characters have five distinct authored reactions without educational contamination',r.ids.length===10&&r.count===50&&r.unique===50&&!r.missing&&!r.contaminated.length,JSON.stringify(r));

    r=await page.evaluate(()=>{
      S=freshSave();bindProgress('c');ensureFriends();ensureBag();const f=friendship('rowan');f.met=true;f.points=100;
      giveItem('teaTin',1);giveItem('expShare',1);openFriend('rowan');
      const panel=!!document.querySelector('.friend-gifts'),choice=document.querySelector('#friend-gift-choice');
      const tea=choice&&choice.querySelector('option[value="teaTin"]'),flower=choice&&choice.querySelector('option[value="pressedFlower"]'),protectedOption=choice&&choice.querySelector('option[value="expShare"]');
      return {panel,value:choice&&choice.value,teaDisabled:tea&&tea.disabled,flowerDisabled:flower&&flower.disabled,protectedDisabled:protectedOption&&protectedOption.disabled,
        protectedLabel:protectedOption&&protectedOption.textContent,unknown:document.querySelector('.gift-discoveries').textContent};
    });
    check('friend gift picker previews owned choices, disables unavailable/protected items, and hides unknown preferences',r.panel&&r.value==='teaTin'&&!r.teaDisabled&&r.flowerDisabled&&r.protectedDisabled&&/protected/.test(r.protectedLabel)&&/Nothing discovered yet/.test(r.unknown)&&!/Loved|Liked|Hated/.test(r.unknown),JSON.stringify(r));

    await page.click('#friend-gift-submit');
    r=await page.evaluate(()=>({modal:document.querySelector('#modal').textContent,count:itemCount('teaTin'),points:friendship('rowan').points,discovery:giftDiscovery('rowan').teaTin}));
    check('browser gift path uses the transaction and reports reaction, band, and exact friendship change',/Rowan/.test(r.modal)&&/Loved/.test(r.modal)&&/Friendship \+34/.test(r.modal)&&r.count===0&&r.points===134&&r.discovery==='loved',JSON.stringify(r));

    check('no page errors',errors.length===0,errors.join(' | '));
  }finally{await browser.close();}
  const passed=results.filter(r=>r.ok).length;console.log('\n'+passed+'/'+results.length+' checks passed');if(passed!==results.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
