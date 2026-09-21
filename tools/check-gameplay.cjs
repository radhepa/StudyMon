/* Deep functional sweep: drives real gameplay paths in an isolated save and
   reports anything that throws or produces impossible state. */
const {chromium}=require('./playwright.cjs');
const results=[];
function check(n,ok,d){results.push({n,ok,d});console.log((ok?'PASS  ':'FAIL  ')+n+(d?'  ['+d+']':''));}
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const ctx=await b.newContext(); const p=await ctx.newPage();
 const errs=[]; p.on('pageerror',e=>errs.push(e.message));
 await p.goto('http://127.0.0.1:8780/');

 const r=await p.evaluate(()=>{
  const out={errors:[]};
  const t=(name,fn)=>{try{return fn();}catch(e){out.errors.push(name+': '+e.message);return null;}};
  S=freshSave();bindProgress('c');S.settings.sound=false;

  // --- money and shop -----------------------------------------------------
  t('shop',()=>{
    S.money=5000; ensureBag();
    buyItem('great',2); buyItem('ultra',1);
    out.shop={money:S.money,great:itemCount('great'),ultra:itemCount('ultra')};
    buyItem('great',99999);              // unaffordable
    out.shopAfterFail=S.money;
    buyItem('great','abc');              // non-numeric
    out.shopAfterBad=S.money;
  });

  // --- party, healing, berries -------------------------------------------
  t('party',()=>{
    S.party=[makeMon(255,16),makeMon(4,12)];
    S.party[0].hp=1;
    healParty();
    out.healed=S.party[0].hp===maxHp(S.party[0]);
  });

  // --- wild battle -------------------------------------------------------
  t('wild battle',()=>{
    goWild(1);
    out.battleStarted=!!B&&B.kind==='wild';
    out.battleHasQuestion=!!(B&&B.foes&&B.foes.length);
    if(B)B=null;
  });

  // --- gym battle --------------------------------------------------------
  t('gym battle',()=>{
    beginGymBattle(1);
    out.gymStarted=!!B&&B.kind==='gym';
    out.gymTeam=B?B.foes.length:0;
    if(B)B=null;
  });

  // --- boss gating -------------------------------------------------------
  t('boss gate',()=>{
    S.badges={};
    const e=ELITE[0];
    out.bossLockedWithoutBadges=!bossOpen(e);
    for(let i=1;i<=CHAPTERS.length;i++)S.badges[i]=true;
    out.bossOpenWithAllBadges=bossOpen(e);
  });

  // --- PC box ------------------------------------------------------------
  t('pc',()=>{
    S.party=[makeMon(255,16)];S.box=[];
    const m=makeMon(25,10);
    S.box.push(m);
    out.boxCount=S.box.length;
  });

  // --- catching ----------------------------------------------------------
  t('catch',()=>{
    const before=S.dex?Object.keys(S.dex).length:0;
    out.dexBefore=before;
  });

  // --- save/load round trip ----------------------------------------------
  t('save round trip',()=>{
    S.money=1234;S.badges={3:true};
    saveGame();
    const raw=localStorage.getItem(SAVE_KEY);
    S=null; loadGame(); bindProgress(activeSubject());
    out.roundTrip={money:S.money,badge3:!!S.badges[3],rawBytes:raw?raw.length:0};
  });

  // --- region switch keeps things separate --------------------------------
  t('regions',()=>{
    switchSubject('c');S.badges[1]=true;
    switchSubject('calc');
    out.calcBadgesSeparate=!S.badges[1];
    S.badges[2]=true;
    switchSubject('c');
    out.cBadgeKept=!!S.badges[1];
    switchSubject('calc');
    out.calcBadgeKept=!!S.badges[2];
    switchSubject('c');
  });

  // --- every location renders in both regions -----------------------------
  t('locations',()=>{
    const bad=[];
    ['c','calc'].forEach(sub=>{switchSubject(sub);
      LOCATIONS.forEach(l=>{try{TOWN_LOC=l.id;openTown();}catch(e){bad.push(sub+'/'+l.id+': '+e.message);}});});
    switchSubject('c');
    out.badLocations=bad;
  });

  // --- side quest board ---------------------------------------------------
  t('quests',()=>{
    openSideQuests();
    const ids=SIDE_QUESTS.map(q=>q.id);
    ids.forEach(id=>{openSideQuest(id);});
    out.questsOpened=ids.length;
    openSideQuests();
  });

  // --- friends ------------------------------------------------------------
  t('friends',()=>{
    openFriends();
    out.friendsOk=true;
  });

  // --- route info for every chapter ---------------------------------------
  t('route info',()=>{
    const bad=[];
    ['c','calc'].forEach(sub=>{switchSubject(sub);
      CHAPTERS.forEach(c=>{try{openRouteInfo(c.n);openQuestionBase(c.n);closeModal();}catch(e){bad.push(sub+'/'+c.n+': '+e.message);}});});
    switchSubject('calc');
    const c=CHAPTERS[2],pool=routeQuestions(c.n);   // the route's own quiz plus any lesson parked on it
    S.srs[pool[0].id]={box:1,due:0,r:1,w:0};
    S.srs[pool[1].id]={box:1,due:0,r:0,w:1};
    openRouteInfo(c.n);
    out.questionBase={total:pool.length,tally:document.querySelector('.question-base h3').textContent,
      previews:document.querySelectorAll('.question-preview>div').length};
    openQuestionBase(c.n);
    out.questionBase.entries=document.querySelectorAll('.question-entry').length;
    out.questionBase.encountered=document.querySelectorAll('.question-entry.encountered').length;
    closeModal();
    switchSubject('c');
    out.badRouteInfo=bad;
  });

  return out;
 });

 check('no thrown errors in gameplay paths', r.errors.length===0, r.errors.slice(0,4).join(' | '));
 check('shop buys and debits correctly', r.shop && r.shop.money===5000-600*2-1400 && r.shop.great===2 && r.shop.ultra===1, JSON.stringify(r.shop));
 check('unaffordable purchase changes nothing', r.shopAfterFail===r.shop.money, String(r.shopAfterFail));
 check('non-numeric quantity cannot corrupt money', r.shopAfterBad===r.shop.money, String(r.shopAfterBad));
 check('healing restores full HP', r.healed===true);
 check('wild battle starts', r.battleStarted===true&&r.battleHasQuestion===true);
 check('gym battle starts with a team', r.gymStarted===true&&r.gymTeam>0, 'team '+r.gymTeam);
 check('boss locked without badges', r.bossLockedWithoutBadges===true);
 check('boss opens with all badges', r.bossOpenWithAllBadges===true);
 check('save round trip keeps money and badges', r.roundTrip&&r.roundTrip.money===1234&&r.roundTrip.badge3===true, JSON.stringify(r.roundTrip));
 check('regions keep separate badges', r.calcBadgesSeparate===true&&r.cBadgeKept===true&&r.calcBadgeKept===true,
       JSON.stringify({sep:r.calcBadgesSeparate,c:r.cBadgeKept,calc:r.calcBadgeKept}));
 check('every location renders', (r.badLocations||[]).length===0, (r.badLocations||[]).slice(0,3).join(' | '));
 check('every side quest opens', r.questsOpened===30, String(r.questsOpened));
 check('route info opens for every chapter', (r.badRouteInfo||[]).length===0, (r.badRouteInfo||[]).slice(0,3).join(' | '));
 check('route info tracks and catalogs encountered questions', r.questionBase && r.questionBase.tally==='2/'+r.questionBase.total+' questions encountered' &&
       r.questionBase.previews===2 && r.questionBase.entries===r.questionBase.total && r.questionBase.encountered===2,
       JSON.stringify(r.questionBase));
 check('no page errors', errs.length===0, errs.slice(0,3).join(' | '));

 await ctx.close();await b.close();
 const failed=results.filter(x=>!x.ok);
 console.log('\n'+(results.length-failed.length)+'/'+results.length+' checks passed');
 if(failed.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
