/* Glitches a play test found, each driven through the real page so they stay
   fixed.

   - keyboard answers pick the choice shown under that letter (choices are
     shuffled on screen), six-choice questions letter A to F, Ctrl+C never
     answers, and spaces in a choice survive ("   42|" is not "42|")
   - Enter in a type-in answer shows the explanation instead of skipping it,
     in a battle and in a drill, and a blank answer does not cost the turn
   - one pick per turn: a triple click on a move draws one question, a double
     click on a Potion spends one
   - the scene is updated in place, so a hit's shake survives the redraw
   - a nickname with HTML in it cannot break the battle log
   - the battle frames its controls above the nav dock at laptop sizes, and
     Continue never snaps the page upwards
   - the dock asks before abandoning a gym fight
   - no ferry before a partner is chosen; a save with no party opens the
     starter picker; Escape on "joined you", "Gotcha!", a battle result or a
     drill summary carries on to the map
   - importing rejects species the game does not know and backs up the game
     it replaces

   Needs the local server running (see TESTING.md). Uses a throwaway browser
   context, so your own save is never touched. */
const {chromium}=require('./playwright.cjs');
const BASE=process.argv[2]||'http://127.0.0.1:8780/';
const results=[];
function check(n,ok,d){results.push(ok);console.log((ok?'PASS  ':'FAIL  ')+n+(d?'  ['+d+']':''));}

const SEED=(subject)=>{
  S=freshSave();bindProgress('c');S.settings.sound=false;
  if(subject==='calc')switchSubject('calc');
  S.party=[makeMon(6,30),makeMon(9,30)];ensureBag();saveGame();
};

(async()=>{
 const b=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 try{
  const ctx=await b.newContext({viewport:{width:1366,height:768}});
  const p=await ctx.newPage();
  const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.goto(BASE);

  // put one known question on screen in a fresh wild battle
  const battleWith=(qid,subject)=>p.evaluate(([qid,subject,seed])=>{
    eval('('+seed+')')(subject);
    const q=allQuestions().find(x=>x.id===qid);
    startBattle({kind:'wild',chapters:[questionChapter(q)],foes:[makeMon(19,5)],title:'Test'});
    B.q=q;B.qAnswered=false;B.choiceOrder=null;B.choiceOrderQuestion=null;
    B.pendingMove=movesOf(B.you)[0];B.choosing=false;
    renderQuestion();
    return [...document.querySelectorAll('#quiz .choices .choice')].map(x=>({id:x.id,k:x.querySelector('.k').textContent}));
  },[qid,subject,SEED.toString()]);
  const picked=()=>p.evaluate(()=>{const w=document.querySelector('#quiz .choice.wrong'),r=document.querySelector('#quiz .choice.right');return (w||r||{}).id||null;});

  // --- keyboard -----------------------------------------------------------
  let miss=0,n=0;
  for(const [key,pos] of [['a',0],['b',1],['c',2],['d',3],['1',0],['2',1],['3',2],['4',3]]){
    for(let t=0;t<2;t++){
      const shown=await battleWith('c1-01','c');
      await p.keyboard.press(key);
      n++; if((await picked())!==shown[pos].id) miss++;
    }
  }
  check('letter and number keys answer the choice shown in that position',miss===0,miss+' of '+n+' missed');
  const six=await battleWith('k1-be-002','calc');
  check('six-choice questions letter A to F',six.map(x=>x.k).join('')==='ABCDEF',six.map(x=>x.k).join(''));
  await p.keyboard.press('f');
  check('F answers the sixth choice shown',(await picked())===six[5].id);
  await battleWith('c1-01','c');
  await p.keyboard.press('Control+c');
  check('Ctrl+C does not answer',!(await p.evaluate(()=>B.qAnswered)));
  await battleWith('c2-42','c');
  const widths=await p.evaluate(()=>{const m={};document.querySelectorAll('#quiz .choice .k + span').forEach(s=>{m[s.textContent]=s.getBoundingClientRect().width;});return m;});
  const padded=Object.keys(widths).find(k=>/^ +42\|$/.test(k));
  check('spaces in a choice survive on screen',padded&&widths[padded]>widths['42|']+4,JSON.stringify(widths));

  // --- type-in answers ----------------------------------------------------
  const fillId=await p.evaluate(()=>{return allQuestions().find(q=>q.k==='fill'&&!q.selfCheck).id;});
  await battleWith(fillId,'c');
  await p.click('#fillin'); await p.keyboard.press('Enter');
  check('a blank type-in answer does not cost the turn',!(await p.evaluate(()=>B.qAnswered)));
  await p.keyboard.type('definitely not it'); await p.keyboard.press('Enter');
  await p.waitForTimeout(150);
  const afterEnter=await p.evaluate(()=>({answered:B.qAnswered,why:!!document.querySelector('#quiz .why'),cont:!!document.querySelector('#contbtn'),turn:B.turn}));
  check('Enter in a battle type-in shows the explanation, not the next turn',afterEnter.answered&&afterEnter.why&&afterEnter.cont&&afterEnter.turn===0,JSON.stringify(afterEnter));
  const drillFillOk=await p.evaluate(async([fid,seed])=>{
    eval('('+seed+')')('c');
    const q=allQuestions().find(x=>x.id===fid);
    drill(questionChapter(q)); D.q=q; D.answered=false; renderDrill();
    const f=document.getElementById('dfill'); f.focus(); f.value='nope';
    f.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}));
    return {why:!!document.querySelector('#s-drill .why'),next:!!document.getElementById('dnext'),same:D.q===q};
  },[fillId,SEED.toString()]);
  check('Enter in a drill type-in shows the explanation',drillFillOk.why&&drillFillOk.next&&drillFillOk.same,JSON.stringify(drillFillOk));

  // --- one pick per turn ----------------------------------------------------
  const triple=await p.evaluate((seed)=>{
    eval('('+seed+')')('c');
    startBattle({kind:'wild',chapters:[1],foes:[makeMon(19,5)],title:'Test'});
    const btn=document.querySelector('#quiz .move');
    btn.click();btn.click();btn.click();
    return Object.keys(B.asked).length;
  },SEED.toString());
  check('a triple click on a move draws one question',triple===1,triple+' asked');
  const potions=await p.evaluate(async(seed)=>{
    eval('('+seed+')')('c');
    S.items.potion=5; S.party[0].hp=10;
    startBattle({kind:'wild',chapters:[1],foes:[makeMon(19,5)],title:'Test'});
    openBattleItemMenu();
    const opt=[...document.querySelectorAll('#quiz .ball-opt')].find(x=>/Potion/.test(x.textContent)&&!/Super|Hyper|Max/.test(x.textContent));
    opt.click();opt.click();
    const menuGone=!document.querySelector('#quiz .ball-menu');
    return {left:itemCount('potion'),menuGone};
  },SEED.toString());
  check('a double click on a Potion spends one and closes the menu',potions.left===4&&potions.menuGone,JSON.stringify(potions));

  // --- the scene ------------------------------------------------------------
  const shake=await p.evaluate((seed)=>{
    eval('('+seed+')')('c');
    startBattle({kind:'wild',chapters:[1],foes:[makeMon(149,60)],title:'Test'});
    const img=document.getElementById('foeimg');
    B.pendingMove=movesOf(B.you)[0];B.qAnswered=true;B.choosing=false;
    resolveTurn(true);
    const same=document.getElementById('foeimg')===img;
    return {same,shaking:img.classList.contains('shake')};
  },SEED.toString());
  check('a hit shake survives the redraw (the scene updates in place)',shake.same&&shake.shaking,JSON.stringify(shake));
  const nick=await p.evaluate((seed)=>{
    eval('('+seed+')')('c');
    S.party[0].nick='A<b>B<i';
    startBattle({kind:'wild',chapters:[1],foes:[makeMon(19,5)],title:'Test'});
    B.pendingMove=movesOf(B.you)[0];B.qAnswered=true;B.choosing=false;
    resolveTurn(false);
    const log=document.getElementById('battlelog');
    return {bold:!!log.querySelector('b,i'),text:log.textContent.indexOf('A<B>B<I')>=0};
  },SEED.toString());
  check('a nickname with HTML in it stays text in the battle log',!nick.bold&&nick.text,JSON.stringify(nick));

  // --- framing at laptop size -------------------------------------------
  await p.evaluate((seed)=>{eval('('+seed+')')('c');startBattle({kind:'wild',chapters:[1],foes:[makeMon(149,30)],title:'Test'});},SEED.toString());
  const settle=async()=>{let last=-1;for(let i=0;i<30;i++){const y=await p.evaluate(()=>scrollY);if(y===last)break;last=y;await p.waitForTimeout(120);}};
  await p.waitForTimeout(300); await settle();
  const dockTop=await p.evaluate(()=>document.getElementById('nav').getBoundingClientRect().top);
  const startFit=await p.evaluate(()=>document.querySelector('#quiz').lastElementChild.getBoundingClientRect().bottom);
  check('the moves and actions open above the nav dock',startFit<=dockTop,Math.round(startFit)+' vs dock '+Math.round(dockTop));
  await p.evaluate(()=>chooseMove(0)); await p.waitForTimeout(300); await settle();
  const card=await p.evaluate(()=>{const r=document.querySelector('#quiz .qcard').getBoundingClientRect();return [r.top,r.bottom];});
  check('a question card opens fully on screen',card[0]>=0&&card[1]<=dockTop,card.map(Math.round).join('..'));
  await p.evaluate(()=>document.querySelector('#quiz .choice').click()); await p.waitForTimeout(300); await settle();
  const cont=await p.evaluate(()=>document.getElementById('contbtn').getBoundingClientRect().bottom);
  check('Continue is on screen after answering',cont<=dockTop,Math.round(cont)+' vs dock '+Math.round(dockTop));
  const before=await p.evaluate(()=>scrollY);
  await p.evaluate(()=>document.getElementById('contbtn').click());
  const jump=await p.evaluate(()=>scrollY);
  check('Continue does not snap the page',Math.abs(jump-before)<40,before+' -> '+jump);

  // --- leaving a gym ----------------------------------------------------
  const gymStart=await p.evaluate((seed)=>{
    eval('('+seed+')')('c');
    const ch=CHAPTERS[0];
    startBattle({kind:'gym',chapters:[ch.n],chapter:ch,foes:[makeMon(19,5)],title:'Gym',leader:'Test'});
    return CUR;
  },SEED.toString());
  let asked=0; const onDialog=d=>{asked++;d.dismiss();};
  p.on('dialog',onDialog);
  await p.click('#nav button[data-scr="map"]');
  p.off('dialog',onDialog);
  const stayed=await p.evaluate(()=>({cur:CUR,over:B.over}));
  check('the dock asks before abandoning a gym fight, and "no" stays',gymStart==='battle'&&asked===1&&stayed.cur==='battle'&&!stayed.over,JSON.stringify({asked,stayed}));

  // --- stuck states ---------------------------------------------------------
  const starter=await p.evaluate(()=>{
    S=freshSave();bindProgress('c');S.settings.sound=false;
    showScreen('starter');renderStarter();
    const bar=getComputedStyle(document.getElementById('topbar')).display;
    sailTo('calc');
    return {bar,region:activeSubject(),party:S.party.length};
  });
  check('no top bar or ferry before a partner is chosen',starter.bar==='none'&&starter.region==='c'&&starter.party===0,JSON.stringify(starter));
  await p.evaluate(()=>pickStarter(STARTERS[0].id));
  await p.keyboard.press('Escape'); await p.waitForTimeout(80);
  check('Escape on "joined you" goes on to the map',await p.evaluate(()=>CUR==='map'));
  const empty=await p.evaluate(()=>{
    const s=freshSave(); s.party=[]; localStorage.setItem(SAVE_KEY,JSON.stringify(s));
    continueGame(); return CUR;
  });
  check('a save with no party opens the starter picker',empty==='starter',empty);
  for(const [name,open] of [
    ['Gotcha!','()=>{showScreen("battle");B.over=true;showCaught(S.party[0]);}'],
    ['a battle result','()=>{showScreen("battle");B.over=true;showResult(true,"Won","","");}'],
    ['a drill summary','()=>{drill(1);endDrill();}'],
  ]){
    await p.evaluate(([seed,open])=>{eval('('+seed+')')('c');startBattle({kind:'wild',chapters:[1],foes:[makeMon(19,5)],title:'T'});eval('('+open+')')();},[SEED.toString(),open]);
    await p.keyboard.press('Escape'); await p.waitForTimeout(80);
    check('Escape on '+name+' goes on to the map',await p.evaluate(()=>CUR==='map'));
  }
  const drillAgain=await p.evaluate(()=>{try{endDrill();return 'ok';}catch(e){return e.message;}});
  check('ending a drill twice is harmless',drillAgain==='ok',drillAgain);

  // --- import ---------------------------------------------------------------
  const imp=await p.evaluate(async(seed)=>{
    eval('('+seed+')')('c');
    const mine=localStorage.getItem(SAVE_KEY);
    const run=o=>new Promise(res=>importSave(new File([typeof o==='string'?o:JSON.stringify(o)],'x.json'),e=>res(e?e.message:null)));
    const bad=freshSave(); bad.party=[{id:99999,lvl:5,hp:10}];
    const strays=await run(bad);
    const junk=await run('not json at all');
    const keptAfterRejects=localStorage.getItem(SAVE_KEY)===mine;
    const ok=freshSave(); ok.party=[makeMon(25,7)];
    const good=await run(ok);
    return {strays,junk,keptAfterRejects,good,backup:localStorage.getItem(SAVE_IMPORT_BACKUP_KEY)===mine};
  },SEED.toString());
  check('import rejects species the game does not know, and non-saves, untouched',!!imp.strays&&!!imp.junk&&imp.keptAfterRejects,JSON.stringify(imp));
  check('a good import keeps the game it replaced as a backup',imp.good===null&&imp.backup,JSON.stringify(imp));

  check('no page errors',errs.length===0,errs.join(' | '));
 } finally { await b.close(); }
 const passed=results.filter(Boolean).length;
 console.log(passed+'/'+results.length+' checks passed');
 process.exitCode=passed===results.length?0:1;
})();
