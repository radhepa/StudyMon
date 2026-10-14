/* Check completeness and independently execute the newly added C exercises. */
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { chromium } = require('./playwright.cjs');
const { window: data } = require('./dump-questions.cjs');
const root = path.resolve(__dirname, '..');
const url = process.argv[2] || 'http://127.0.0.1:8780/';
const added = Object.values(data.QBANK).flat().filter(q => q.source &&
  /^(cs159-practice|lecture-09|lecture-11|lecture-12)$/.test(q.source.document));
const exam = added.filter(q => q.source.document === 'cs159-practice')
  .sort((a,b) => a.source.question - b.source.question);
assert.deepEqual(exam.map(q => q.source.question), Array.from({length:54}, (_,i) => i+1));
assert.equal(added.length, 82);
assert.deepEqual(data.C_MIDTERM_SOURCES.map(s => s.questionIds.length), [54,10,13,5]);
assert.equal(new Set(added.map(q => q.id)).size, 82);
for (const q of added) {
  assert(q.chapter >= 1 && q.chapter <= 10);
  assert(q.q && q.why && q.c.length >= 2 && q.a >= 0 && q.a < q.c.length);
  assert.equal(new Set(q.c).size, q.c.length, q.id + ': duplicate choice');
  assert(!/CS159 practice|Lecture \d|Discussion \d|Address question|Problem solving \d/.test(q.q + q.tag),
    q.id + ': user-facing source label');
}
// These expectations are kept separately from the authored question choices.
const key = [3,3,0,2,0,2,0,1,2,2,0,0,0,0,2,3,2,2,0,0,1,0,2,1,3,2,2,1,0,1,2,2,1,2,2,0,0,0,1,2,2,0,0,1,0,2,2,2,3,2,1,3,2,1];
assert.equal(key.length, 54);
assert.deepEqual(exam.map(q => q.a), key);
console.log('PASS  54 numbered exam questions, 28 lecture exercises, unique IDs and plain labels');

const find = (document, n) => added.find(q => q.source.document === document && q.source.question === n);
const divider = '-=-=-=-=-=-=-=-=-=-=-=-=-=-';
const cases = [
  ['cs159-practice',3,divider+'\nCircumference:       6.5940\n'+divider+'\nArea:      13.847400\n'],
  ['cs159-practice',6,'result: 2\nx: 7\ny: 12\nz: 7\n'],
  ['cs159-practice',20,'num: 151\n'], ['cs159-practice',21,'num: 152\n'],
  ['cs159-practice',22,'total: 20\ndiv: 7\n'],
  ['cs159-practice',24,'sum: 38\nd: 72\n'],
  ['cs159-practice',26,null],
  ['cs159-practice',27,'val: 6\n'],
  ['cs159-practice',31,'ct: 5\ny[0]: 11\ny[5]: -1\n'],
  ['cs159-practice',34,'x[0] = 2\nx[3] = 57\nx[7] = 28\n'],
  ['cs159-practice',37,'x[2] = 22\nx[4] = 0\nx[8] = 18\n'],
  ['cs159-practice',40,'result: 4\n'],
  // strcmp promises a sign, not a particular magnitude; check that separately.
  ['cs159-practice',41,/^result #1: -[1-9]\d*\nresult #2: 8 0\nstr1: ABC Corp str2: ABC Corp\n$/],
  ['cs159-practice',47,'Result: AEAEAT\nFinal ct value: 3\n'],
  ['lecture-09',1,'1.0\n'],
  ['lecture-09','Floating exponent 1','2.0\n'],
  ['lecture-09','Floating exponent 2','2.0\n'],
  ['lecture-09','Floating exponent 3','2.0\n'],
  ['lecture-09',2,'x: 8.5\n'],
  ['lecture-09','Greeting example',"I'm in main -- 1!\nHello from greeting function!\nI'm in main -- 2!\nHello from greeting function!\nI'm in main -- 3!\n"],
  ['lecture-11',1,'z: 2\n'], ['lecture-11',2,'y: 17\n'],
  ['lecture-11','Discussion 1','z: 20\n'],
  ['lecture-11','Discussion 2','Result: 4.0\n'],
  ['lecture-11','Discussion 3','Result: 4.2\n'],
  ['lecture-11','Exchange example','Before the function: x = 3 y = 5\nBefore the exchange: a = 3 b = 5\nAfter the exchange: a = 5 b = 3\nAfter the function: x = 5 y = 3\n'],
  ['lecture-12',1,'x: 14 y: 12\n'], ['lecture-12',2,'z: 10\n'],
  ['lecture-12','Double negation','1\n']
];
const header = ['stdio.h','math.h','string.h'].map(h => '#include <'+h+'>').join('\n')+'\n';
function program(code) {
  return header + (/\bmain\s*\(/.test(code) ? code : 'int main(void) {\n'+code+'\nreturn 0;\n}');
}
// Use the shipped compiler with nonfatal warnings for standalone teaching snippets.
let workerSource = fs.readFileSync(path.join(root,'js/engine/c-worker.js'),'utf8');
for (const [from,to] of [
  ["importScripts('../../assets/compiler/shared.js')","importScripts('../assets/compiler/shared.js')"],
  ["const ROOT='../../assets/compiler/'","const ROOT='../assets/compiler/'"],
  ["'-Wall','-Wextra','-Werror','-pedantic-errors',","'-w',"]
]) {
  assert(workerSource.includes(from), 'compiler worker contract changed: '+from);
  workerSource = workerSource.split(from).join(to);
}
fs.writeFileSync(path.join(root,'tools/c-worker-lax.js'),workerSource);
(async () => {
  const browser = await chromium.launch({headless:true,
    executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
  try {
    const page = await browser.newPage();
    await page.goto(url);
    for (const [document,n,expected] of cases) {
      const q = find(document,n);
      assert(q && q.code, document+'/'+n+': missing code');
      const result = await page.evaluate(source => new Promise(resolve => {
        const worker = new Worker('tools/c-worker-lax.js');
        const result = {output:null,error:null,diagnostics:'',exitCode:null};
        const finish = () => { clearTimeout(timer); worker.terminate(); resolve(result); };
        const timer = setTimeout(() => { result.error = 'timeout'; finish(); },30000);
        worker.onerror = e => { result.error = e.message; finish(); };
        worker.onmessage = e => {
          const m = e.data;
          if (m.type === 'compiled') result.diagnostics = m.diagnostics || '';
          if (m.type === 'case') { result.output = m.output; result.exitCode = m.exitCode; result.error = m.error || null; }
          if (m.type === 'done') finish();
          if (m.type === 'error') { result.error = m.message; result.diagnostics = m.diagnostics || ''; finish(); }
        };
        worker.postMessage({source:source,harness:'',cases:[{input:'',files:{}}]});
      }),program(q.code));
      if (expected === null) assert(result.error && /array|assignable/i.test(result.diagnostics),
        q.id+': must reject array assignment: '+JSON.stringify(result));
      else {
        assert(!result.error && result.exitCode === 0, q.id+': '+JSON.stringify(result));
        if (expected instanceof RegExp) assert(expected.test(result.output),q.id+': '+result.output);
        else assert.equal(result.output,expected,q.id);
      }
      console.log('PASS  compiler trace '+q.id);
    }
    console.log('PASS  all 29 distinct code examples, including the expected compiler error');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode=1; });
