const assert=require('assert/strict');
const fs=require('fs');
const {chromium}=require('C:/Users/minal/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 try{
 const page=await browser.newPage();await page.goto('http://127.0.0.1:8780/');
 const run=source=>page.evaluate(source=>new Promise(resolve=>{const w=new Worker('js/engine/c-worker.js');let timer;const result=[];const done=r=>{clearTimeout(timer);w.terminate();resolve(r);};const arm=ms=>{clearTimeout(timer);timer=setTimeout(()=>done({error:'timeout'}),ms);};arm(45000);w.onerror=e=>done({error:e.message});w.onmessage=e=>{const d=e.data;if(d.type==='phase')arm(d.phase==='compile'?45000:4000);if(d.type==='error')done({error:d});if(d.type==='case')result.push(d);if(d.type==='done')done(result[0]);};w.postMessage({source,cases:[{input:''}]});}),source);
 const cases=[
 ['split UTF-8 writes preserve characters','#include <stdio.h>\nint main(void){putchar(0xc3);fflush(stdout);putchar(0xa9);return 0;}',r=>r.output==='é'&&!r.error],
 ['UTF-8 BOM is not silently discarded','#include <stdio.h>\nint main(void){putchar(0xef);putchar(0xbb);putchar(0xbf);return 0;}',r=>r.output==='\ufeff'],
 ['stderr escape codes remain visible to the grader','#include <stdio.h>\nint main(void){fputs("\\033[31m",stderr);return 0;}',r=>r.stderr==='\x1b[31m'],
 ['nonzero exit remains a failure','int main(void){return 7;}',r=>r.exitCode===7],
 ['invalid UTF-8 cannot match an empty answer','#include <stdio.h>\nint main(void){putchar(0xff);return 0;}',r=>!!r.error],
 ['output flood is bounded','#include <stdio.h>\nint main(void){for(int i=0;i<20000;i++)putchar(65);return 0;}',r=>/Output limit/.test(r.error)],
 ['sandbox file growth is bounded','#include <stdio.h>\nint main(void){FILE *f=fopen("big","wb");if(!f)return 2;if(fseek(f,1048576,SEEK_SET))return 3;fputc(1,f);return fclose(f);}',r=>/Sandbox file limit/.test(r.error)],
 ['standard input has a real EOF','#include <stdio.h>\nint main(void){return getchar()==EOF?0:1;}',r=>r.exitCode===0&&!r.error]
 ];
 for(const [name,source,predicate] of cases){const result=await run(source);assert.ok(predicate(result),name+': '+JSON.stringify(result));console.log('PASS '+name);}
 await page.evaluate(()=>{S=freshSave();bindProgress('c');S.settings.sound=false;openSideQuest('c-lab-02');sideQuestProgress('c-lab-02').draft='int main(void){for(;;){}}';runQuestCode(true);});
 await page.waitForFunction(()=>C_JOB&&C_JOB.phase==='run',{},{timeout:45000});
 await page.locator('#sq-stop').click();assert.ok(await page.evaluate(()=>!C_JOB&&!sideQuestProgress('c-lab-02').rewardClaimed));console.log('PASS Stop terminates execution without rewards');
 await page.evaluate(()=>runQuestCode(true));await page.waitForFunction(()=>C_JOB&&C_JOB.phase==='run',{},{timeout:45000});
 await page.evaluate(()=>openSideQuests());assert.ok(await page.evaluate(()=>!C_JOB&&!sideQuestProgress('c-lab-02').rewardClaimed));console.log('PASS leaving a quest cancels execution without rewards');
 await page.evaluate(()=>{S=freshSave();switchSubject('calc');S.party=[makeMon(255,10)];B=null;beginGymBattle(4);});
 assert.ok(await page.evaluate(()=>!B));console.log('PASS direct gym entry enforces exam prerequisites');
 console.log('PASS: runtime edge cases and cancellation');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
