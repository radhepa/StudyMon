/* Every function named in an onclick must exist. A typo here is invisible:
   the button renders, the click throws into the console, and nothing happens. */
const {chromium}=require('./playwright.cjs');
const fs=require('fs');
const files=[]; 
(function walk(d){for(const f of fs.readdirSync(d,{withFileTypes:true})){
  const p=d+'/'+f.name;
  if(f.isDirectory()){ if(!/node_modules|assets|output|tools/.test(p)) walk(p); }
  else if(/\.(js|html)$/.test(f.name)) files.push(p);
}})('.');

const names=new Set();
const where={};
for(const f of files){
  const src=fs.readFileSync(f,'utf8');
  const re=/on(?:click|change|input|submit|keyup|keydown)\s*=\s*[\\"']*\s*([a-zA-Z_$][\w$]*)\s*\(/g;
  let m;
  // `onclick="if(...)"` and `el.onclick = function(){}` are ordinary JS, not
  // handler names, so the keywords that can appear there are skipped.
  const KEYWORDS=new Set(['if','function','return','typeof','void','new','this','switch','while','for','do','delete']);
  while((m=re.exec(src))){ if(KEYWORDS.has(m[1]))continue; names.add(m[1]); (where[m[1]]=where[m[1]]||new Set()).add(f); }
}
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const ctx=await b.newContext(); const p=await ctx.newPage();
 await p.goto('http://127.0.0.1:8780/');
 const missing=await p.evaluate(list=>list.filter(n=>typeof window[n]!=='function'),[...names]);
 await ctx.close();await b.close();
 console.log('handlers referenced: '+names.size);
 if(missing.length){
   console.log('MISSING ('+missing.length+'):');
   missing.forEach(n=>console.log('  '+n+'  <- '+[...where[n]].join(', ')));
   process.exitCode=1;
 } else console.log('PASS: every referenced handler exists');
})().catch(e=>{console.error(e);process.exitCode=1});
