const fs=require('fs');const {chromium}=require('./playwright.cjs');
(async()=>{const b=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});const p=await b.newPage();await p.goto('http://127.0.0.1:8780/');const refs=JSON.parse(fs.readFileSync('tools/quest-reference-fixtures.json','utf8'));const results=[];
for(const [id,source] of Object.entries(refs).sort()){
 const result=await p.evaluate(({id,source})=>new Promise(resolve=>{const q=SIDE_QUESTS.find(x=>x.id===id),w=new Worker('js/engine/c-worker.js');let timer;const events=[];function finish(data){clearTimeout(timer);w.terminate();resolve(data);}function arm(ms){clearTimeout(timer);timer=setTimeout(()=>finish({id,error:'timeout',events}),ms);}arm(45000);w.onmessage=e=>{const d=e.data;if(d.type==='phase')arm(d.phase==='compile'?45000:5000);events.push(d);if(d.type==='error')finish({id,error:d,events});if(d.type==='done')finish({id,events});};w.onerror=e=>finish({id,error:e.message,events});w.postMessage({source,harness:q.grading.harness,cases:q.grading.tests});}),{id,source});
 results.push(result);console.log(id,result.error?'ERROR':result.events.filter(e=>e.type==='case').map(e=>e.error?'FAIL '+e.error:'ok').join(' '));
}
fs.writeFileSync('output/quest-reference-results.json',JSON.stringify(results,null,2));await b.close();if(results.some(r=>r.error||r.events.some(e=>e.type==='case'&&e.exitCode)))process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
