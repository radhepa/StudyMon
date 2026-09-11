/* Verify TYPE_CHART against the canonical Gen VI+ matchups.

   Every attacking type is checked in full: the set of types it hits for double,
   the set it is halved by, and the set it cannot touch. Anything the game
   disagrees with is reported in both directions, so a missing entry and a
   spurious one are both caught. */
const {chromium}=require('C:/Users/minal/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const CANON={
 normal:{double:[],half:['rock','steel'],none:['ghost']},
 fire:{double:['grass','ice','bug','steel'],half:['fire','water','rock','dragon'],none:[]},
 water:{double:['fire','ground','rock'],half:['water','grass','dragon'],none:[]},
 electric:{double:['water','flying'],half:['electric','grass','dragon'],none:['ground']},
 grass:{double:['water','ground','rock'],half:['fire','grass','poison','flying','bug','dragon','steel'],none:[]},
 ice:{double:['grass','ground','flying','dragon'],half:['fire','water','ice','steel'],none:[]},
 fighting:{double:['normal','ice','rock','dark','steel'],half:['poison','flying','psychic','bug','fairy'],none:['ghost']},
 poison:{double:['grass','fairy'],half:['poison','ground','rock','ghost'],none:['steel']},
 ground:{double:['fire','electric','poison','rock','steel'],half:['grass','bug'],none:['flying']},
 flying:{double:['grass','fighting','bug'],half:['electric','rock','steel'],none:[]},
 psychic:{double:['fighting','poison'],half:['psychic','steel'],none:['dark']},
 bug:{double:['grass','psychic','dark'],half:['fire','fighting','poison','flying','ghost','steel','fairy'],none:[]},
 rock:{double:['fire','ice','flying','bug'],half:['fighting','ground','steel'],none:[]},
 ghost:{double:['psychic','ghost'],half:['dark'],none:['normal']},
 dragon:{double:['dragon'],half:['steel'],none:['fairy']},
 dark:{double:['psychic','ghost'],half:['fighting','dark','fairy'],none:[]},
 steel:{double:['ice','rock','fairy'],half:['fire','water','electric','steel'],none:[]},
 fairy:{double:['fighting','dragon','dark'],half:['fire','poison','steel'],none:[]}
};
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const ctx=await b.newContext(); const p=await ctx.newPage();
 await p.goto('http://127.0.0.1:8780/');
 const chart=await p.evaluate(()=>JSON.parse(JSON.stringify(typeof TYPE_CHART!=='undefined'?TYPE_CHART:null)));
 await ctx.close();await b.close();
 if(!chart){console.log('FAIL: TYPE_CHART not found');process.exitCode=1;return;}
 const problems=[];
 const set=a=>new Set(a||[]);
 const diff=(a,b)=>[...set(a)].filter(x=>!set(b).has(x));
 for(const atk of Object.keys(CANON)){
   const got=chart[atk];
   if(!got){problems.push(atk+': missing from the chart');continue;}
   for(const rel of ['double','half','none']){
     const extra=diff(got[rel],CANON[atk][rel]);
     const missing=diff(CANON[atk][rel],got[rel]);
     if(extra.length)problems.push(atk+' '+rel+': should not include '+extra.join(', '));
     if(missing.length)problems.push(atk+' '+rel+': missing '+missing.join(', '));
   }
 }
 const extraTypes=Object.keys(chart).filter(t=>!CANON[t]);
 if(extraTypes.length)problems.push('unknown attacking types: '+extraTypes.join(', '));
 console.log('types checked: '+Object.keys(CANON).length);
 if(problems.length){console.log('MISMATCHES ('+problems.length+'):');problems.forEach(x=>console.log('  '+x));process.exitCode=1;}
 else console.log('PASS: type chart matches the canonical Gen VI+ matchups');
})().catch(e=>{console.error(e);process.exitCode=1});
