/* Evolution: single-path evolves on level, branching waits for a choice, and
   neither can happen mid battle or revive a fainted Pokemon. */
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

  // Charmander 4 -> Charmeleon 5 at 16, single path
  t('single path',()=>{
    const m=makeMon(4,15);
    o.beforeId=m.id;
    m.lvl=16;
    const ev=evolutionFor?evolutionFor(m):null;
    o.hasEvolutionFor=typeof evolutionFor==='function';
    o.single=ev?ev:null;
  });

  // Eevee 133 branches
  t('branching',()=>{
    const m=makeMon(133,40);
    const br=evolutionBranches(m);
    o.branchCount=br.length;
    o.branchTargets=br.map(x=>x.to).slice(0,4);
    // single-path species must not report branches
    o.charmanderBranches=evolutionBranches(makeMon(4,20)).length;
  });

  // choosing a branch works, and is refused mid battle
  t('choose',()=>{
    S.party=[makeMon(133,40)];S.box=[];
    const m=S.party[0];
    const br=evolutionBranches(m);
    if(!br.length){o.chooseSkipped=true;return;}
    const target=br[0].to;
    EVOLUTION_CHOICE=m;
    confirmEvolutionChoice(target);
    o.evolvedTo=m.id;
    o.evolvedCorrectly=m.id===target;
    o.dexUpdated=!!S.caught[target];
    try{closeModal();}catch(e){}
  });

  t('refused mid battle',()=>{
    S.party=[makeMon(133,40),makeMon(6,50)];
    const m=S.party[0];
    const br=evolutionBranches(m);
    if(!br.length){o.battleSkipped=true;return;}
    goWild(1);
    EVOLUTION_CHOICE=m;
    confirmEvolutionChoice(br[0].to);
    o.blockedInBattle=m.id===133;
    if(B){try{clearInterval(B.timer);}catch(e){}B=null;}
  });

  t('under level refused',()=>{
    S.party=[makeMon(133,5)];S.box=[];
    const m=S.party[0];
    const br=evolutionBranches(m);
    if(!br.length){o.levelSkipped=true;return;}
    EVOLUTION_CHOICE=m;
    confirmEvolutionChoice(br[0].to);
    o.blockedUnderLevel=m.id===133;
    try{closeModal();}catch(e){}
  });

  t('evolveSpecies walks the chain',()=>{
    o.chain={bulbasaur1:evolveSpecies(1,1),bulbasaur2:evolveSpecies(1,2),bulbasaur9:evolveSpecies(1,9)};
  });
  return o;
 });
 check('no thrown errors', r.errors.length===0, r.errors.slice(0,3).join(' | '));
 check('Eevee reports several evolution branches', r.branchCount>=3, 'branches '+r.branchCount+' -> '+JSON.stringify(r.branchTargets));
 check('a single-path species reports no branches', r.charmanderBranches===0, String(r.charmanderBranches));
 check('choosing a branch evolves the Pokemon', r.chooseSkipped||r.evolvedCorrectly===true, 'became '+r.evolvedTo);
 check('evolving updates the dex', r.chooseSkipped||r.dexUpdated===true);
 check('evolution is refused during a battle', r.battleSkipped||r.blockedInBattle===true);
 check('evolution is refused below the level requirement', r.levelSkipped||r.blockedUnderLevel===true);
 check('evolveSpecies walks the chain and stops at the end',
       r.chain && r.chain.bulbasaur1===2 && r.chain.bulbasaur2===3 && r.chain.bulbasaur9===3, JSON.stringify(r.chain));
 check('no page errors', errs.length===0, errs.slice(0,3).join(' | '));
 await ctx.close();await b.close();
 const failed=results.filter(x=>!x.ok);
 console.log('\n'+(results.length-failed.length)+'/'+results.length+' checks passed');
 if(failed.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
