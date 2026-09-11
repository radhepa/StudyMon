const fs=require('fs'),vm=require('vm'),assert=require('assert');const root='C:/Users/minal/Cmon/';
const scripts=[...fs.readFileSync(root+'index.html','utf8').matchAll(/<script src="([^"?]+)[^"]*"/g)].map(m=>m[1]);
const ctx={window:null,console,localStorage:{getItem:()=>null,setItem:()=>{}}};ctx.window=ctx;vm.createContext(ctx);
for(const f of scripts)if(f!=='js/main.js')vm.runInContext(fs.readFileSync(root+f,'utf8'),ctx,{filename:f});
const qs=vm.runInContext('allQuestions()',ctx),ids=new Set();
for(const q of qs){assert(!ids.has(q.id),'Duplicate '+q.id);ids.add(q.id);assert(q.chapter>=1&&q.chapter<=15);assert(q.t>=1&&q.t<=4);assert(q.q&&q.why);if(q.k==='mcq'){assert(q.c.length>=2&&Number.isInteger(q.a)&&q.a>=0&&q.a<q.c.length);assert(new Set(q.c).size===q.c.length,'Duplicate choices '+q.id);}else{assert(q.k==='fill'&&Array.isArray(q.a)&&q.a.length);}}
assert.equal(qs.length,1025);assert.equal(ctx.QBANK[15].length,72);for(const c of ctx.CHAPTERS){assert.equal(c.n,ctx.CHAPTERS.indexOf(c)+1);assert(c.notes.length>=6);assert(ctx.GYM_DIALOGUE[c.n].intro);assert(ctx.CURRICULUM_PRACTICE[c.n]);for(let tier=1;tier<=4;tier++)assert(ctx.QBANK[c.n].some(q=>q.t===tier));}
const oldCtx={window:null,console};oldCtx.window=oldCtx;vm.createContext(oldCtx);for(const f of scripts)if(f!=='js/main.js'&&!/curriculum|edition4/.test(f))vm.runInContext(fs.readFileSync(root+f,'utf8'),oldCtx);for(const q of vm.runInContext('allQuestions()',oldCtx))assert(ids.has(q.id),'Lost ID '+q.id);
console.log('All 774 legacy IDs preserved; 1025 questions valid; all 15 chapters have four tiers, notes, practice and dialogue.');
fs.writeFileSync(root+'output/curriculum/coverage.json',JSON.stringify({questions:qs.length,corrections:ctx.CURRICULUM_CORRECTIONS,chapters:ctx.CHAPTERS.map(c=>({chapter:c.n,title:c.title,questions:ctx.QBANK[c.n].length,tiers:[1,2,3,4].map(t=>ctx.QBANK[c.n].filter(q=>q.t===t).length)}))},null,2));
