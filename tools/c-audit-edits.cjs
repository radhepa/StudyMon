/* One-time, ID-preserving corrections from the independent C audit. */
const fs = require('fs'), path = require('path');
const { window: w, files } = require('./dump-questions.cjs');
const all = Object.values(w.QBANK).flat();
const patches = {};
function fix(id, fields) { patches[id] = {...patches[id], ...fields}; }
function answer(id, text, why) {
  const q = all.find(q => q.id === id);
  const c = (patches[id]?.c || q.c).slice(); c[q.a] = text;
  fix(id, {c, why});
}

fix('c1-01',{q:'In the five-part hardware model used in this course, how many major parts are identified?'});
fix('c1-05',{why:'Preprocessing handles directives, macro replacement, conditional inclusion and header inclusion. Macro replacement operates on preprocessing tokens.'});
fix('c1-09',{q:'In the traditional time-sharing model with dumb terminals, where does application processing happen?',why:'This question concerns dumb terminals. Time-sharing itself means sharing processor time and does not require terminals without processing capability.'});
answer('c1-21','Syntax violations require diagnostics; run-time faults may go undetected; logic errors require validation','C does not guarantee detection of undefined behavior at run time. Tests and other validation can expose incorrect results.');
fix('c1-26',{why:'C supports portable source when programs follow the standard and respect implementation limits. Machine-specific assumptions and undefined behavior can defeat portability.'});
fix('c1-32',{why:'A bit is one binary digit. sizeof(char) is always one C byte; CHAR_BIT is at least 8 and need not equal 8.'});
fix('c1-38',{q:'In the conventional separate compilation and linking model, which file does the compiler produce?',why:'Compilation produces an object file in this model. Compiler drivers can also invoke linking and other build stages.'});
fix('c1-40',{q:'In the traditional ahead-of-time compilation model versus direct interpretation, what is the main distinction?',why:'This is a simplified implementation model. C does not mandate a compilation strategy; interpreters and mixed JIT systems also exist.'});
fix('c1-44',{q:'Which operation has undefined behavior if reached during execution with integer operands?',why:'Integer division by zero has undefined behavior. A diagnostic or predictable crash is not guaranteed.'});
fix('c1-45',{why:'Portable C can be recompiled for different implementations while respecting implementation limits and the standard. Not all C source is portable.'});
fix('c1-55',{why:'Macro replacement operates on preprocessing tokens. The resulting expressions are still typed and checked during later translation; a macro name does not declare a typed object.'});
answer('c1-56','A conforming implementation may arbitrarily change the meaning of fully specified, portable C operations','C permits implementation choices such as type sizes and leaves undefined behavior unconstrained. Fully specified behavior cannot be arbitrarily changed.');
fix('c2-01',{why:'Underscores can begin identifiers. Two initial underscores, or underscore followed by uppercase, are reserved everywhere. Other leading-underscore identifiers are reserved at file scope.'});
fix('c2-05',{why:'MAX is an object-like macro replaced in applicable preprocessing contexts, not inside strings or comments. The resulting constant 100 has type int.'});
fix('c2-06',{q:'Which of these is NOT a built-in C type keyword?',why:'C has no string type keyword. Strings are null-terminated character sequences. Atomic types have a separate meaning in C11 and later.'});
fix('c2-08',{q:'An automatic local int declared without an initializer initially has:'});
answer('c2-08','An indeterminate value, not a guaranteed zero or usable random value','Reading an uninitialized automatic int can have undefined behavior. Static locals, unlike automatic locals, are zero-initialized.');
fix('c2-11',{q:'Assuming ASCII, what does this print?'});
fix('c2-17',{why:'The declaration int x needs a semicolon. Not every C statement ends with one: compound statements and many control statements do not.'});
fix('c2-21',{a:['Hello!']});
fix('c2-24',{why:'The semicolon becomes part of the macro replacement and makes this array declaration invalid. This numeric macro should not end with a semicolon.'});
fix('c2-25',{why:'const declares a typed object. Macro replacement does not declare an object, but the expanded expression still has a type and undergoes type checking.'});
fix('c2-27',{q:'Which pair is guaranteed to reserve the same amount of memory on every conforming implementation?',why:'Both char arrays have four elements. int and char need not differ in size. A three-character unterminated array is valid but is not a C string.'});
fix('c2-38',{q:'In a hosted C implementation, which function is called at program startup?',why:'Hosted execution starts by calling main. Freestanding startup is implementation-defined.'});
fix('c2-39',{why:'Zero and EXIT_SUCCESS signal successful termination. EXIT_FAILURE signals failure; other status values have implementation-defined meanings.'});
fix('c2-43',{q:'Given int n and a writable char array name large enough for the input word and terminator, which pair uses the correct scanf argument types?',why:'%d needs int*. name converts to char* for %s; &name has pointer-to-array type. Bound %s to capacity minus one and check return values in production.'});
answer('c2-48','Undefined behavior - x is an uninitialized automatic int','This reads an uninitialized automatic object that could have been declared register. No output is guaranteed; C does not promise to print prior memory contents.');
fix('c2-50',{code:'printf("%zu", sizeof("abc"));',why:'The literal contains three letters and a null terminator. sizeof yields size_t, so use %zu in C99 and later, not %d.'});
fix('c2-54',{why:'ASCII lowercase letters are 32 code positions above uppercase letters. Portable case conversion uses ctype functions with valid arguments.'});
fix('c3-42',{q:'For arithmetic addition of an int and a double, which conversion occurs?',why:'The int is converted to double for this addition. Conversion can lose precision; not every int value must be exactly representable as double.'});
answer('c3-48','Undefined - the assignment and postfix increment modify a without sequencing between those writes','The assignment and postfix increment make unsequenced modifications of a. Ordinary read-then-write expressions such as a = a + 1 are valid.');
fix('c3-50',{q:'Assuming a + b + c is representable as int, which expression averages three ints without integer-division truncation?',why:'Dividing by 3.0 uses floating-point division. Integer division truncates; casting after it cannot restore the lost fraction.'});
fix('c3-54',{why:'Conversion of a finite floating value to int discards the fraction toward zero when the integral part is representable. Out-of-range conversion is undefined; round expresses rounding instead.'});
answer('c4-06','File scope, from its declaration to the end of the translation unit, except where hidden','Scope controls name visibility. External linkage can connect declarations in different translation units but does not automatically make a name visible everywhere.');
fix('c4-17',{why:'Falling off a non-void function other than main has undefined behavior if the caller uses its result. It does not supply an unspecified value. Return n * n for inputs whose square fits int.'});
fix('c4-23',{why:'C passes pointer values by value. Storing through them simulates reference-style output parameters; returning a structure is another option.'});
fix('c4-25',{q:'Why must a function not return a pointer to its own automatic local for the caller to dereference?',why:'The automatic object ends its lifetime at return and pointers to it become indeterminate. Static locals have a different lifetime.'});
fix('c4-30',{q:'Which function is called at startup in a hosted C program?',why:'Hosted execution starts with main; freestanding startup is implementation-defined.'});
answer('c4-41','In C99 and later, calling an undeclared function violates a constraint and requires a diagnostic','Modern C has no implicit function declarations. A diagnostic is required, though an implementation may continue translation as an extension.');
answer('c4-47','There is no base case; recursion can exhaust resources or eventually cause signed overflow','C does not require a physical call stack or particular crash. Repeated n - 1 eventually exceeds int range if execution gets that far.');
fix('c4-51',{q:'C passes arguments by value. Passing a pointer can simulate pass by ___; fill in the conventional term.',why:'The conventional phrase is pass by reference. C actually copies a pointer value; the callee can modify the pointed-to object.'});
fix('c4-53',{why:'Each file-scope tentative definition becomes a definition at the end of its translation unit. Multiple external definitions violate C requirements; some linkers merge them as an extension. static gives each file its own object.'});
fix('c4-54',{q:'In a conventional stack-frame implementation, what information is associated with an active function call?',why:'Implementations commonly use frames but may keep values in registers or optimize calls away. C does not require a particular stack layout.'});
fix('c5-02',{c:['5','3','The text "true"','1']});
fix('c5-05',{q:'When execution reaches the end of a case body without break, return or another control transfer, what happens?',why:'Control continues with the next statement, even across case labels. At the end of the switch body it leaves the switch.'});
fix('c5-13',{q:'Why can exact == comparison be unsuitable for independently computed floating-point results?',why:'Rounding can make mathematically equal calculations differ. Choose an appropriate absolute or relative tolerance for approximate equality. Exact equality is valid and useful in other situations.'});
fix('c5-16',{why:'Braces attach else to the outer if. Here a is zero, so Y prints. With the same values but no braces, the inner if/else would be skipped.'});
fix('c5-22',{q:'Which test uses short-circuit logical AND to check that int x is between 1 and 10 inclusive?',why:'&& short-circuits. Bitwise & also gives the correct truth result for these side-effect-free 0/1 operands, but does not short-circuit. The chained comparison is always true.'});
fix('c5-24',{why:'Case values must be distinct after conversion to the promoted controlling type. C does not require a jump table.'});
fix('c5-34',{q:'Which keyword exits the innermost switch while continuing execution in the same function?'});
fix('c5-43',{q:'Which condition correctly tests that int x is NOT between 1 and 10 inclusive?'});
answer('c5-49','Case labels must be integer constant expressions, so a variable does not qualify','Values must be available during translation. C does not require a jump table; use if/else to compare against variables.');
fix('c5-52',{q:'Which expression pair normalizes int n to 0 when zero and 1 otherwise?',c:['result = n; and result = -n;','result = !n; and result = n;','result = !!n; and result = (n != 0);','result = n & 1; and result = n % 2;'],why:'Both double logical negation and comparison with zero yield exactly int 0 or 1.'});
fix('c5-55',{q:'Why is the bounds test first in this pattern when i may later range from 0 through 3?',why:'The shown i = 0 is safe either way. For i = 3, the first test prevents evaluation of a[3]. A general signed index also needs a lower-bound check.'});
fix('c6-03',{q:'Which three parts usually organize a terminating counter-controlled loop?',why:'Counted loops commonly initialize, test and update a counter. Other loops need not have all three; for(;;) can exit via break or return.'});
fix('c6-04',{code:'int i;\nfor (i = 0; i < 5; i++)\n   printf("%d ", i);'});
fix('c6-10',{code:'int i, j;\nfor (i = 1; i <= 3; i++)\n   for (j = 1; j <= 2; j++)\n      printf("%d%d ", i, j);'});
fix('c6-11',{why:'This loop first fails its test at i = 6. Other loops can use different steps or leave via break; counters are not universally one past their last body value.'});
fix('c6-19',{q:'For the shown four binary digits, what conversion does this loop perform?',why:'Bits 1, 1, 0, 1 give val = 13. This loop would drop trailing zero digits for inputs such as 1100; a general four-digit converter must process all four positions.'});
answer('c6-26','An always-true condition; the body can still exit via break, return or another control transfer','An omitted for condition is treated as true. The body can arrange termination.');
fix('c6-32',{q:'For nonnegative int n, how often does for (i = 0; i < n; i++) run if the body changes neither i nor n and never exits early?'});
fix('c6-40',{q:'Which loop directly expresses asking once before testing whether the user entered a valid number?',why:'do/while naturally expresses a posttest loop. Other loops can implement validation using a different arrangement.'});
answer('c6-47','i increases away from zero and eventually attempts signed overflow, which is undefined behavior','Use i-- for this countdown. Signed overflow supplies neither a portable wraparound exit nor guaranteed output.');
fix('c6-51',{q:'Assuming a type large enough for 20!, what is a typical cost difference between recursive and iterative factorial(20)?'});
answer('c6-51','Both compute 20!, but ordinary recursion may retain a linear chain of calls while iteration uses constant auxiliary storage','unsigned long long can represent 20!. C does not guarantee a number of stack frames and implementations may optimize calls.');
answer('c6-53','Rounding may prevent f reaching exactly 1.0, so the != condition may never become false','On common binary implementations 0.1 is inexact. Prefer an integer count for fixed repetitions; exact floating equality is not universally wrong.');

// PATCHES

function objectEnd(src, start) {
  let depth=0, quote=null, escaped=false;
  for(let i=start;i<src.length;i++) {
    const c=src[i];
    if(quote) { if(escaped) escaped=false; else if(c==='\\') escaped=true; else if(c===quote) quote=null; continue; }
    if(c==='"'||c==="'"||c==='`') { quote=c; continue; }
    if(c==='{') depth++;
    if(c==='}' && --depth===0) return i+1;
  }
  throw Error('Unclosed object');
}
if(require.main===module) {
  const backup=path.join(__dirname,'../output/c-audit-before');
  fs.mkdirSync(backup,{recursive:true});
  if(!fs.existsSync(path.join(backup,'questions.json'))) fs.writeFileSync(path.join(backup,'questions.json'),JSON.stringify(all,null,2));
  const changed=[];
  for(const file of files.filter(f=>f.startsWith('js/data/questions/'))) {
    let src=fs.readFileSync(file,'utf8'), original=src;
    for(const [id,fields] of Object.entries(patches)) {
      const match=new RegExp("\\bid:\\s*['\"]"+id+"['\"]").exec(src);
      if(!match) continue;
      const start=src.lastIndexOf('{',match.index), end=objectEnd(src,start);
      const q=all.find(q=>q.id===id);
      src=src.slice(0,start)+JSON.stringify({...q,...fields},null,2)+src.slice(end);
      changed.push(id);
    }
    if(src!==original) {
      const dest=path.join(backup,path.basename(file));
      if(!fs.existsSync(dest)) fs.writeFileSync(dest,original);
      fs.writeFileSync(file,src);
    }
  }
  const missing=Object.keys(patches).filter(id=>!changed.includes(id));
  if(missing.length) throw Error('Unapplied: '+missing);
  fs.writeFileSync('output/c-audit-corrections.json',JSON.stringify(patches,null,2));
  console.log('Corrected '+changed.length+' question IDs');
}
module.exports={patches};
