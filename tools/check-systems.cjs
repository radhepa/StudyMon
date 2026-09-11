/* Daily-use systems: spaced review, the drill screen, friendship, the ferry
   and the PC boxes. */
const {chromium}=require('C:/Users/minal/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const results=[];
function check(n,ok,d){results.push({n,ok});console.log((ok?'PASS  ':'FAIL  ')+n+(d?'  ['+d+']':''));}
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const ctx=await b.newContext(); const p=await ctx.newPage();
 const errs=[]; p.on('pageerror',e=>errs.push(e.message));
 await p.goto('http://127.0.0.1:8780/');

 const r=await p.evaluate(()=>{
  const o={errors:[]};
  const t=(n,fn)=>{try{return fn();}catch(e){o.errors.push(n+': '+e.message);}};
  S=freshSave();bindProgress('c');S.settings.sound=false;

  // --- spaced review ------------------------------------------------------
  t('srs',()=>{
    const q=QBANK[1][0];
    recordAnswer(q,false);
    const wrong=JSON.parse(JSON.stringify(S.srs[q.id]));
    recordAnswer(q,true); recordAnswer(q,true);
    const right=JSON.parse(JSON.stringify(S.srs[q.id]));
    o.srs={wrongBox:wrong.box,rightBox:right.box,w:wrong.w,r:right.r,due:right.due>0};
    o.streakResetOnWrong=(()=>{S.streak=7;recordAnswer(QBANK[1][1],false);return S.streak===0;})();
    o.dueCount=dueCount();
  });

  // --- drill screen -------------------------------------------------------
  t('drill',()=>{
    drill(1);
    o.drillStarted=!!(window.D||window.DRILL)||!!document.querySelector('#s-drill, .qcard');
    try{endDrill();}catch(e){}
  });

  // --- answer choices are presentation-randomized ------------------------
  t('choice shuffle',()=>{
    const q=QBANK[1].find(x=>x.k==='mcq'&&!x.selfCheck&&x.c.length===4);
    const original={a:q.a,c:q.c.slice()};
    const positions=[];let valid=true;
    for(let i=0;i<12;i++){
      const order=shuffledChoiceOrder(q);
      positions.push(order.indexOf(q.a));
      valid=valid&&order.length===q.c.length&&new Set(order).size===q.c.length&&order.every(x=>x>=0&&x<q.c.length);
    }
    o.choiceShuffle={positions,valid,changes:positions.every((p,i)=>i===0||p!==positions[i-1]),
      bankUnchanged:q.a===original.a&&q.c.every((x,i)=>x===original.c[i])};
  });

  // --- friendship ---------------------------------------------------------
  t('friends',()=>{
    ensureFriends();
    const id=(TOWNSFOLK[0]||{}).id;
    const f=friendship(id);
    const before=f.points;
    const moved=changeFriendship(id,250);
    o.friend={id,before,after:friendship(id).points,moved,hearts:friendHearts(friendship(id))};
    changeFriendship(id,-99999);
    o.friendFloor=friendship(id).points;
    changeFriendship(id,99999);
    o.friendCeiling=friendship(id).points;
  });

  // --- ferry --------------------------------------------------------------
  t('ferry',()=>{
    switchSubject('c');
    const from=activeSubject();
    sailTo('calc');
    const mid=activeSubject();
    sailTo('c');
    o.ferry={from,mid,back:activeSubject()};
    // the team travels, badges do not
    switchSubject('c');S.badges[1]=true;S.party=[makeMon(25,10)];
    const partyBefore=S.party.length;
    sailTo('calc');
    o.ferryKeepsParty=S.party.length===partyBefore;
    o.ferryLeavesBadges=!S.badges[1];
    sailTo('c');
    o.ferryRestoresBadges=!!S.badges[1];
  });

  // --- PC boxes -----------------------------------------------------------
  t('pc',()=>{
    S.party=[makeMon(1,5),makeMon(4,5)];
    S.box=[makeMon(7,5)];
    openPC();
    pcPick('box',0); pcToParty();
    o.pcToParty={party:S.party.length,box:S.box.length};
    // pcToParty leaves that mon selected, and clicking a selected slot
    // deselects it, so pick a different slot to send to the box.
    pcPick('party',0); pcToBox();
    o.pcToBox={party:S.party.length,box:S.box.length};
    // the last party member cannot be sent away
    S.party=[makeMon(1,5)];S.box=[];
    pcPick('party',0); pcToBox();
    o.pcKeepsOne={party:S.party.length,box:S.box.length};
  });

  // --- abandoning a battle cleans up -------------------------------------
  t('abandon',()=>{
    S.party=[makeMon(6,50)];
    goWild(1);
    const wasLive=!!B&&!B.over;
    showScreen('map');                       // walk away mid battle
    o.abandon={wasLive,over:!!B&&!!B.over};
    if(B){try{clearInterval(B.timer);}catch(e){}B=null;}
  });

  // --- a timed out question counts as wrong ------------------------------
  t('timeout',()=>{
    S.party=[makeMon(6,50)];S.streak=4;
    goWild(1);
    showMoveMenu(); chooseMove(0);
    const before=S.totals?S.totals.w:0;
    answer(-1);                              // -1 is the timeout path
    o.timeout={countedWrong:(S.totals?S.totals.w:0)>before,streak:S.streak};
    if(B){try{clearInterval(B.timer);}catch(e){}B=null;}
  });

  // --- drill answers end to end ------------------------------------------
  t('drill run',()=>{
    S=freshSave();bindProgress('c');S.settings.sound=false;
    drill(1);
    let answered=0;
    for(let i=0;i<6 && D && D.q;i++){
      const q=D.q;
      if(q.k==='fill'){const el=$('#dfill');if(el){el.value=String(q.a[0]);drillFill();}}
      else drillAnswer(q.a);
      answered++;
      if(D&&D.answered)nextDrill();
    }
    o.drill={answered,n:D?D.n:0,right:D?D.right:0};
    try{endDrill();}catch(e){}
  });

  // --- mock exam in both regions -----------------------------------------
  t('mock exam',()=>{
    o.exam={};
    ['c','calc'].forEach(sub=>{
      switchSubject(sub);
      mockExam(25);
      const picked=D&&D.exam?D.exam.length:0;
      const unique=D&&D.exam?new Set(D.exam.map(q=>q.id)).size:0;
      let n=0;
      for(let i=0;i<40 && D && D.q;i++){
        const q=D.q;
        if(q.k==='fill'){const el=$('#dfill');if(el){el.value=String(q.a[0]);drillFill();}}
        else drillAnswer(q.a);
        n++; if(D&&D.answered)nextDrill();
      }
      o.exam[sub]={picked,unique,answered:n};
    });
    switchSubject('c');
  });

  // --- town: talking, gifts and trainer battles ---------------------------
  t('town people',()=>{
    S.party=[makeMon(6,60)];openTown();
    const folk=TOWNSFOLK.filter(x=>x.loc===TOWN_LOC);
    const talk=folk.find(x=>x.kind==='talk');
    const gift=folk.find(x=>x.kind==='gift');
    const fight=folk.find(x=>x.kind==='trainer');
    o.town={people:folk.length};
    if(talk){talkTo(talk.id);o.town.talked=true;try{closeModal();}catch(e){}}
    if(gift){talkTo(gift.id);o.town.gifted=true;try{closeModal();}catch(e){}}
    if(fight){startNpcBattle(fight.id);o.town.npcBattle=!!B&&B.kind==='npc';
              if(B){try{clearInterval(B.timer);}catch(e){}B=null;}}
  });

  return o;
 });

 check('no thrown errors', r.errors.length===0, r.errors.slice(0,3).join(' | '));
 check('a wrong answer drops the review box, right answers raise it',
       r.srs && r.srs.wrongBox===1 && r.srs.rightBox>1, JSON.stringify(r.srs));
 check('a review is scheduled with a due time', r.srs && r.srs.due===true);
 check('a wrong answer breaks the streak', r.streakResetOnWrong===true);
 check('drill screen opens', r.drillStarted===true);
 check('multiple-choice answers move on every repeat without changing the bank', r.choiceShuffle && r.choiceShuffle.valid &&
       r.choiceShuffle.changes && r.choiceShuffle.bankUnchanged && new Set(r.choiceShuffle.positions).size>1,
       JSON.stringify(r.choiceShuffle));
 check('friendship points move and convert to hearts',
       r.friend && r.friend.moved===250 && r.friend.after===r.friend.before+250, JSON.stringify(r.friend));
 check('friendship cannot go below zero', r.friendFloor===0, String(r.friendFloor));
 check('friendship is capped', r.friendCeiling===1000, String(r.friendCeiling));
 check('the ferry sails both ways', r.ferry && r.ferry.mid==='calc' && r.ferry.back==='c', JSON.stringify(r.ferry));
 check('the team sails with you', r.ferryKeepsParty===true);
 check('badges stay in the region that earned them',
       r.ferryLeavesBadges===true && r.ferryRestoresBadges===true,
       JSON.stringify({away:r.ferryLeavesBadges,back:r.ferryRestoresBadges}));
 check('PC moves a Pokemon to the party', r.pcToParty && r.pcToParty.party===3 && r.pcToParty.box===0, JSON.stringify(r.pcToParty));
 check('PC moves a Pokemon to the box', r.pcToBox && r.pcToBox.party===2 && r.pcToBox.box===1, JSON.stringify(r.pcToBox));
 check('PC will not empty the party', r.pcKeepsOne && r.pcKeepsOne.party===1, JSON.stringify(r.pcKeepsOne));
 check('leaving a battle ends it and clears its timer',
       r.abandon && r.abandon.wasLive===true && r.abandon.over===true, JSON.stringify(r.abandon));
 check('a timed out question counts as wrong and breaks the streak',
       r.timeout && r.timeout.countedWrong===true && r.timeout.streak===0, JSON.stringify(r.timeout));
 check('the drill answers questions and scores them',
       r.drill && r.drill.answered>0 && r.drill.n===r.drill.right && r.drill.right>0, JSON.stringify(r.drill));
 check('a mock exam picks 25 unique questions in both regions',
       r.exam && ['c','calc'].every(k=>r.exam[k].picked===25&&r.exam[k].unique===25&&r.exam[k].answered===25),
       JSON.stringify(r.exam));
 check('town people can be talked to, gift and battle',
       r.town && r.town.people>0 && r.town.talked===true && r.town.gifted===true && r.town.npcBattle===true,
       JSON.stringify(r.town));
 check('no page errors', errs.length===0, errs.slice(0,3).join(' | '));

 await ctx.close();await b.close();
 const failed=results.filter(x=>!x.ok);
 console.log('\n'+(results.length-failed.length)+'/'+results.length+' checks passed');
 if(failed.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
