/* Fourth-edition alignment. Loaded after legacy data; IDs remain stable for SRS. */
window.CURRICULUM_MAP = {1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:9,11:10,12:11,13:12,14:13,15:14};
function questionChapter(q) { return q.chapter || CURRICULUM_MAP[Number(q.id.match(/^c(\d+)-/)[1])]; }
(function () {
  var old = CHAPTERS.slice(), bank = QBANK, next = {}, greetings = GYM_DIALOGUE;
  for (var i=1;i<=15;i++) next[i]=[];
  Object.keys(bank).forEach(function(k){bank[k].forEach(function(q){q.chapter=CURRICULUM_MAP[k];next[q.chapter].push(q);});});
  window.QBANK=next;
  window.CHAPTERS=old.filter(function(c){return c.n!==10;}).map(function(c){
    var original=c.n; c.n=CURRICULUM_MAP[original];
    c.route=c.route.replace(/^Route \d+/, 'Route '+c.n);
    c.thirdEdition=original===9?'Chapters 9 and 10':'Chapter '+original;
    return c;
  });
  CHAPTERS[8].notes=old[8].notes.concat(old[9].notes);
  CHAPTERS[8].blurb='Addresses, pointer arithmetic, arrays, dynamic allocation, ownership and lifetime.';
  CHAPTERS.push({n:15,type:'psychic',route:'Route 15 - Returning Steps',title:'Recursion',leader:'Reva Call',epithet:'One Step Closer',badge:'Base Case Badge',teamTypes:['psychic'],ace:196,thirdEdition:'Supplement: no standalone recursion chapter',blurb:'Base cases, recursive traces, call depth, divide and conquer, and recursive data structures.',notes:[]});
  window.GYM_DIALOGUE={};
  old.forEach(function(c,i){if(i!==9)GYM_DIALOGUE[CURRICULUM_MAP[i+1]]=greetings[i+1];});
  GYM_DIALOGUE[15]={intro:'You made it. Take a look at the steps behind you. Each one brought you a little closer to this room. That is how we work here, too. One smaller problem at a time. Ready?',rematch:'Back again? Good. You know how to find your way out this time.'};
  ELITE.forEach(function(e){e.chapters=Array.from(new Set(e.chapters.map(function(n){return CURRICULUM_MAP[n];})));if(e.id==='e4'||e.id==='champ')e.chapters.push(15);});
  TRAINERS.forEach(function(t){t.chapters=Array.from(new Set(t.chapters.map(function(n){return CURRICULUM_MAP[n];})));});
  TOWNSFOLK.forEach(function(t){if(t.ch)t.ch=CURRICULUM_MAP[t.ch];});
})();

/* Run before freshSave defaults are merged so an old save cannot be marked new. */
function migrateCurriculumSave(s) {
  if(s.curriculumVersion===4)return false;
  try {if(!localStorage.getItem('cmon.save.before-curriculum4.v1'))localStorage.setItem('cmon.save.before-curriculum4.v1',JSON.stringify(s));}catch(e){}
  var previous=s.badges||{}, stats=s.chapterStats||{};
  s.legacyCurriculum={badges:Object.assign({},previous),chapterStats:JSON.parse(JSON.stringify(stats))};
  s.badges={};s.chapterStats={};
  Object.keys(previous).forEach(function(k){var n=CURRICULUM_MAP[k];if(n&&previous[k])s.badges[n]=true;});
  Object.keys(stats).forEach(function(k){var n=CURRICULUM_MAP[k];if(!n)return;var x=s.chapterStats[n]||(s.chapterStats[n]={r:0,w:0});x.r+=Number(stats[k].r)||0;x.w+=Number(stats[k].w)||0;});
  // Friend story rewards are cumulative. Keep their already-earned points.
  (window.CURRICULUM_CORRECTIONS||[]).forEach(function(id){var e=s.srs&&s.srs[id];if(e){e.box=1;e.due=Number(s.clock)||0;}});
  s.curriculumVersion=4;s.curriculumNotice=true;
  return true;
}
