/* Battle maths: damage responds to type, STAB and level the way it should, and
   catch rates are ordered sensibly from common to legendary. */
const {chromium}=require('C:/Users/minal/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const results=[];
function check(n,ok,d){results.push({n,ok});console.log((ok?'PASS  ':'FAIL  ')+n+(d?'  ['+d+']':''));}
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const ctx=await b.newContext(); const p=await ctx.newPage();
 const errs=[]; p.on('pageerror',e=>errs.push(e.message));
 await p.goto('http://127.0.0.1:8780/');
 const r=await p.evaluate(()=>{
  S=freshSave();bindProgress('c');S.settings.sound=false;
  const o={};
  // average out the damage roll
  const avg=(atk,def,move,n)=>{let s=0;for(let i=0;i<n;i++)s+=damageOf(atk,def,move,1).dmg;return s/n;};
  const mv=(type,power,tier)=>({type:type,power:power,tier:tier||1,label:type+' move'});

  const charizard=makeMon(6,50);      // fire/flying
  const venusaur=makeMon(3,50);       // grass/poison
  const blastoise=makeMon(9,50);      // water

  // fire vs grass/poison is 2x; water vs grass/poison is 0.5x
  o.superEffective=avg(charizard,venusaur,mv('fire',80),400);
  o.notVeryEffective=avg(charizard,venusaur,mv('water',80),400);
  o.neutral=avg(charizard,blastoise,mv('normal',80),400);

  // STAB: charizard using fire vs a neutral target beats an equal non-STAB move
  o.stab=avg(charizard,blastoise,mv('fire',80),400);
  o.noStab=avg(charizard,blastoise,mv('ice',80),400);
  o.stabVsFireResist=effectiveness('fire',dexOf(9).types);   // water resists fire

  // level scaling
  o.lowLevel=avg(makeMon(6,20),blastoise,mv('normal',80),400);
  o.highLevel=avg(makeMon(6,80),blastoise,mv('normal',80),400);

  // immunity deals nothing
  o.immune=avg(charizard,makeMon(95,50),mv('normal',80),50);  // onix is rock/ground, not immune
  o.ghostImmune=effectiveness('normal',dexOf(94).types);      // gengar ghost/poison

  // power ordering
  o.weak=avg(charizard,blastoise,mv('normal',40),400);
  o.strong=avg(charizard,blastoise,mv('normal',100),400);

  // catch rates, common vs legendary at full health
  const chance=(id,ball)=>{const f=makeMon(id,30);return catchChanceOf(f,ball,true);};
  o.catch={caterpie:chance(10,'poke'),pidgey:chance(16,'poke'),
           mewtwo:chance(150,'poke'),mewtwoUltra:chance(150,'ultra'),
           caterpieUltra:chance(10,'ultra')};
  // wounded is easier than healthy
  const f=makeMon(10,30); const full=catchChanceOf(f,'poke',true);
  f.hp=1; const hurt=catchChanceOf(f,'poke',true);
  o.woundedHelps=hurt>full;
  o.wrongAnswerHurts=catchChanceOf(makeMon(10,30),'poke',false)<full;
  return o;
 });
 const near=(a,b,tol)=>Math.abs(a-b)<=tol;
 check('super effective roughly doubles neutral damage',
       r.superEffective>r.neutral*1.5, r.neutral.toFixed(1)+' -> '+r.superEffective.toFixed(1));
 check('not very effective roughly halves it',
       r.notVeryEffective<r.neutral, r.neutral.toFixed(1)+' -> '+r.notVeryEffective.toFixed(1));
 check('STAB beats an equal non-STAB move of the same effectiveness',
       r.stab>r.noStab, 'stab '+r.stab.toFixed(1)+' vs '+r.noStab.toFixed(1)+' (fire vs water = '+r.stabVsFireResist+')');
 check('higher level hits harder', r.highLevel>r.lowLevel*2, r.lowLevel.toFixed(1)+' -> '+r.highLevel.toFixed(1));
 check('higher power hits harder', r.strong>r.weak, r.weak.toFixed(1)+' -> '+r.strong.toFixed(1));
 check('normal cannot touch a ghost', r.ghostImmune===0, String(r.ghostImmune));
 check('a legendary is harder to catch than a common',
       r.catch.mewtwo<r.catch.caterpie, JSON.stringify(r.catch));
 check('an Ultra Ball beats a Poke Ball', r.catch.mewtwoUltra>r.catch.mewtwo && r.catch.caterpieUltra>=r.catch.caterpie);
 check('every catch chance is a sane probability',
       Object.values(r.catch).every(v=>v>=0&&v<=1), JSON.stringify(r.catch));
 check('a wounded target is easier to catch', r.woundedHelps===true);
 check('a wrong answer makes catching harder', r.wrongAnswerHurts===true);
 check('no page errors', errs.length===0, errs.slice(0,3).join(' | '));
 await ctx.close();await b.close();
 const failed=results.filter(x=>!x.ok);
 console.log('\n'+(results.length-failed.length)+'/'+results.length+' checks passed');
 if(failed.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
