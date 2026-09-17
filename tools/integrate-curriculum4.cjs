const fs=require('fs'),root='C:/Users/minal/StudyMon/';
function edit(p,fn){let s=fs.readFileSync(root+p,'utf8').replace(/\r\n/g,'\n');fs.writeFileSync(root+p,fn(s));}
edit('index.html',s=>{
 if(!s.includes('js/data/curriculum.js'))s=s.replace(/(<script src="js\/engine\/state\.js[^\n]+)/,'<script src="js/data/curriculum.js?v=curriculum4"></script>\n<script src="js/data/questions/edition4.js?v=curriculum4"></script>\n<script src="js/data/curriculum-notes.js?v=curriculum4"></script>\n$1');
 return s.replaceAll('Forouzan &amp; Gilberg','Forouzan &amp; Afyouni').replaceAll('A Structured Programming Approach in C</i>','A Structured Programming Approach in C</i> · 4th edition').replace(/\?v=[^"\s]+/g,'?v=curriculum4-20260905');
});
edit('js/engine/state.js',s=>s.replace('    v: 1,','    v: 1,\n    curriculumVersion: 4,').replaceAll('S = o;','S = o;\n    migrateCurriculumSave(S);').replace('    ensureTown();\n    return true;','    ensureTown();\n    saveGame();\n    return true;'));
for(const p of ['js/engine/battle.js','js/engine/ui.js'])edit(p,s=>s.replaceAll('parseInt(q.id.match(/^c(\\d+)-/)[1], 10)','questionChapter(q)'));
edit('js/engine/quiz.js',s=>s.replace("  var ch = q.id.match(/^c(\\d+)-/);\n  if (ch) {\n    var n = parseInt(ch[1], 10);","  var n = questionChapter(q);\n  if (n) {"));
edit('js/engine/ui.js',s=>{
 s=s.replaceAll('Forouzan &amp; Gilberg','Forouzan &amp; Afyouni');
 const marker="  var h = '<h2>Move Tutor, Chapter Notes</h2><div class=\"row tight\" style=\"margin-bottom:14px\">';";
 if(!s.includes('curriculum-source'))s=s.replace(marker,`  var h = '<h2>Move Tutor, Chapter Notes</h2>'+ 
    '<details class="panel curriculum-source"><summary>Textbook alignment and study scope</summary><p>Fourth edition, ISBN 9780357506134. Chapters 1-8 keep their earlier order; Chapter 9 includes pointer applications, Chapters 10-14 cover strings through lists, and Chapter 15 covers recursion.</p><p>The supplied third edition supports the earlier material. The fourth-edition order is checked against the publisher; individual fourth-edition exercises and every wording change have not been verified. These are original study questions, not the textbook answer key.</p><p>This course uses C99/C11/C17 rules unless a question says otherwise. Required standard headers and declarations are assumed in short snippets.</p><p><a href="https://prod.cengageasia.com/title/default/detail?isbn=9780357506134" target="_blank" rel="noopener">Publisher chapter list</a> · <a href="https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf" target="_blank" rel="noopener">C11 committee draft</a></p></details>'+ 
    '<div class="row tight" style="margin-bottom:14px">';`);
 const start=s.indexOf('function renderStudy()'),end=s.indexOf('/* ---- drill mode',start);let part=s.slice(start,end);
 part=part.replace("  h += '<div class=\"notes\">';","  h += '<p class=\"small\">'+QBANK[c.n].length+' practice questions · Third-edition reference: '+esc(c.thirdEdition)+'</p>';\n  h += '<div class=\"notes\">';");
 part=part.replace("  h += '</div>';\n  h += '<div class=\"row\" style=\"margin-top:16px\">';", "  h += '</div>';\n  var practice=CURRICULUM_PRACTICE[c.n];\n  h += '<section class=\"panel chapter-practice\"><h3>Write some C</h3><p>'+esc(practice[0])+'</p><details><summary>Approach and self-check</summary><p>'+esc(practice[1])+'</p><p>'+esc(practice[2])+'</p></details><p class=\"small\">Write and run this in your C editor. This exercise is self-checked, not automatically graded.</p></section>';\n  h += '<div class=\"row\" style=\"margin-top:16px\">';");
 s=s.slice(0,start)+part+s.slice(end);
 const mapStart=s.indexOf('function renderMap()');const pos=s.indexOf('  for (var i = 0; i < CHAPTERS.length; i++) {',mapStart);
 if(!s.includes('dismissCurriculumNotice'))s=s.slice(0,pos)+`  if(S.curriculumNotice) h='<div class="panel curriculum-notice"><h3>Your chapters now follow the fourth edition</h3><p>Your Pokémon and question review history are kept. Earlier badges and chapter scores follow their topics. The two pointer chapters now share one badge; Recursion is a new chapter to study. A copy of your earlier chapter record is included in your save.</p><button onclick="dismissCurriculumNotice()">Got it</button></div>'+h;\n`+s.slice(pos);
 // Prevent keyboard or double-click submission from inflating study/exam scores.
 s=s.replace('function nextDrill() {','function nextDrill() {\n  D.answered = false;');
 s=s.replace('function drillAnswer(choice, isFill) {','function drillAnswer(choice, isFill) {\n  if (!D || D.answered) return;\n  D.answered = true;');
 s+='\nfunction dismissCurriculumNotice(){S.curriculumNotice=false;saveGame();renderMap();}\n';
 return s;
});
edit('css/ui.css',s=>s+'\n.curriculum-source,.chapter-practice,.curriculum-notice{margin:18px 0;padding:18px;line-height:1.65}.curriculum-source summary,.chapter-practice summary{cursor:pointer;font-weight:600;min-height:32px}.curriculum-source a{color:#704119;text-decoration:underline}\n');
