/* CS 159 past-exam twins, set D.
   Original questions modelled on the skills tested in past Purdue CS 159 exams
   (Boilerexams practice sets), written fresh - no exam text is reproduced.
   Each question's src names the exam question whose skill it practises, so
   coverage can be audited. Low-accuracy source items have two twins (the second
   slightly harder). Chapter numbers are the live (fourth-edition) numbers:
   9 Pointers, 10 Strings, 15 Recursion. Every code snippet was compiled with
   gcc -std=c11 -Wall and run; the keyed outputs are the real outputs. */
(function () {
  function add(q) {
    (QBANK[q.chapter] = QBANK[q.chapter] || []).push(q);
  }

  /* ---- Chapter 1 ---- */
  add({ id: 'c1-bxd-001', chapter: 1, t: 2, k: 'mcq', tag: 'Concept', source: '2024 SPRING Final Q4',
    q: 'List these three storage levels from LARGEST typical capacity to SMALLEST.',
    c: ['Secondary storage, main (primary) memory, registers', 'Registers, main (primary) memory, secondary storage', 'Main (primary) memory, secondary storage, registers', 'None of the above.'], a: 0,
    why: 'Capacity and speed move in opposite directions. Disks and SSDs (secondary storage) hold the most, main memory holds less, and the handful of registers inside the CPU hold the least - which is also why registers are the fastest.',
    hints: ['Speed and capacity trade off against each other in the memory hierarchy.', 'Which level lives inside the processor itself? It must be tiny.', 'Biggest = the level that keeps your files when the power is off.'] });
  add({ id: 'c1-bxd-002', chapter: 1, t: 2, k: 'mcq', tag: 'Concept', source: '2024 FALL Exam 1 Q3',
    q: 'Which statement about the parts of the central processing unit is FALSE?',
    c: ['The control unit decides which instruction is carried out next and directs the other parts.', 'Registers are small storage cells inside the processor that hold the values it is working on right now.', 'The arithmetic and logic unit (ALU) does the calculations and the comparisons.', 'None of the above.'], a: 3,
    why: 'All three describe real CPU components correctly: control unit, registers and ALU are each part of the processor. Main memory and disks are outside the CPU, but none of the statements claims otherwise.',
    hints: ['Check each statement on its own; a "FALSE" question can have no false statement.', 'Name the three pieces the course places inside the CPU.', 'Control unit, registers, ALU - are any of them described wrongly?'] });
  add({ id: 'c1-bxd-003', chapter: 1, t: 2, k: 'mcq', tag: 'Concept', source: '2024 FALL Exam 1 Q4',
    q: 'A processor repeats the same short cycle for every machine instruction. Which item does NOT belong in that cycle?',
    c: ['Decoding the instruction', 'Executing the instruction', 'Compiling the source file', 'None of the above.'], a: 2,
    why: 'The machine cycle is fetch, decode, execute (with reading and storing data as needed). Compiling happens once, before the program ever runs, and is done by a separate program - it is not a step the CPU repeats per instruction.',
    hints: ['The cycle runs while the program is executing.', 'Which item happens before the program even exists as machine code?', 'Fetch - decode - execute. Which choice is not like those?'] });
  add({ id: 'c1-bxd-004', chapter: 1, t: 3, k: 'mcq', tag: 'Concept', source: '2024 FALL Exam 1 Q4',
    q: 'Which statement about the instruction cycle of a CPU is TRUE?',
    c: ['An instruction has to be fetched from memory before the control unit can decode it.', 'The control unit executes an instruction first so it can find out what kind of instruction it was.', 'Displaying a result on the screen is one of the fixed steps performed for every instruction.', 'None of the above.'], a: 0,
    why: 'The order is fetch, then decode, then execute. Decoding needs the instruction already in the processor, and executing needs to know what to do. Producing screen output is something a particular program may do - it is not a step of the hardware cycle.',
    hints: ['Put fetch, decode and execute in order.', 'Can you decode something you have not fetched yet?', 'Output to a screen happens only when a program asks for it.'] });
  add({ id: 'c1-bxd-005', chapter: 1, t: 2, k: 'mcq', tag: 'Concept', source: '2024 FALL Exam 1 Q7',
    q: 'Which statement about the memory hierarchy is TRUE?',
    c: ['Registers have the largest capacity because they sit closest to the processor.', 'Secondary storage is the fastest level because it keeps data without power.', 'The hierarchy exists largely because one level that is both huge and very fast would cost far too much for a typical user.', 'None of the above.'], a: 2,
    why: 'Fast memory is expensive per byte, so computers combine a little very fast memory (registers, then main memory) with a lot of cheap, slow storage. Registers are the smallest level and secondary storage is the slowest.',
    hints: ['Speed and capacity trade off.', 'Why not just build all memory as fast as registers?', 'Think about price per byte.'] });
  add({ id: 'c1-bxd-006', chapter: 1, t: 3, k: 'mcq', tag: 'Concept', source: '2025 SPRING Exam 1 Q2',
    q: 'Using the simplified memory hierarchy from the course (registers, main memory, secondary storage), which statement is FALSE?',
    c: ['Main memory holds programs and data temporarily while they are being processed.', 'Secondary storage keeps programs and files even after the computer is switched off.', 'Registers trade capacity for speed: they are the quickest level to reach but hold the least.', 'None of the above.'], a: 3,
    why: 'Each statement is accurate. Main memory is temporary working storage, secondary storage is non-volatile, and registers are the fastest and smallest level. With no false statement, the answer is None of the above.',
    hints: ['Test each statement separately against the hierarchy.', 'Volatile vs non-volatile: which level loses its contents at power-off?', 'If all three are correct, what must you pick?'] });
  add({ id: 'c1-bxd-007', chapter: 1, t: 4, k: 'mcq', tag: 'Concept', source: '2025 SPRING Exam 1 Q2',
    q: 'Which statement about the memory hierarchy is FALSE?',
    c: ['Main memory is volatile: its contents are lost when the power is removed.', 'Many secondary storage devices are slow partly because they rely on moving mechanical parts.', 'Moving away from the processor down the hierarchy, both capacity and access speed increase.', 'None of the above.'], a: 2,
    why: 'Going down the hierarchy (registers -> main memory -> secondary storage), capacity increases but access speed DECREASES. The other two statements are true.',
    hints: ['Two quantities change as you move away from the CPU. Do they move together?', 'Are disks faster or slower than registers?', 'Capacity goes up; what happens to speed?'] });
  add({ id: 'c1-bxd-008', chapter: 1, t: 2, k: 'mcq', tag: 'Concept', source: '2024 FALL Exam 1 Q9',
    q: 'Which statement comparing high-level and low-level programming languages is TRUE?',
    c: ['Machine language is called high-level because the hardware runs it directly.', 'A program written in a high-level language such as C can be translated for many different kinds of computer without being rewritten.', 'C counts as a low-level language simply because it was created decades ago.', 'None of the above.'], a: 1,
    why: 'High-level languages are written for people and are translated (compiled) for a particular machine, so the same source can target many machines. Machine language is the lowest level, and a language\'s age has nothing to do with its level.',
    hints: ['"High" and "low" describe distance from the hardware, not age.', 'Which kind of language is tied to one processor\'s instruction set?', 'What does a compiler let you do with one C source file?'] });
  add({ id: 'c1-bxd-009', chapter: 1, t: 2, k: 'mcq', tag: 'Concept', source: '2024 FALL Exam 1 Q10',
    q: 'Which statement about building and running a C program is FALSE?',
    c: ['The linker joins your object code with the library functions you used to form the executable file.', 'The compiler translates C source code into machine language (object code).', 'The program you use to type and save your source code is called the preprocessor.', 'None of the above.'], a: 2,
    why: 'You type source code in a text editor. The preprocessor is part of compiling: it handles lines such as #include and #define before the translator runs. The linker and compiler statements are correct.',
    hints: ['Name the tool used at each step: write, compile, link, run.', 'What does the preprocessor work on - your keystrokes, or the saved file?', 'Writing code happens in an editor.'] });
  add({ id: 'c1-bxd-010', chapter: 1, t: 2, k: 'mcq', tag: 'Concept', source: '2025 SPRING Exam 1 Q21',
    q: 'Which claim about the waterfall approach to building software is FALSE?',
    c: ['The requirements are gathered and studied before any design work starts.', 'Testing is a full phase of its own rather than something squeezed in at the end.', 'If the earlier phases are done well, the maintenance phase is skipped entirely.', 'None of the above.'], a: 2,
    why: 'Maintenance is always the last phase: real programs get bug reports and change requests. Careful planning makes maintenance easier, not unnecessary.',
    hints: ['List the waterfall phases in order.', 'Is maintenance ever avoided completely in real software?', 'Good planning changes how hard a phase is, not whether it exists.'] });

  /* ---- Chapter 2 ---- */
  add({ id: 'c2-bxd-001', chapter: 2, t: 3, k: 'mcq', tag: 'Concept', source: '2025 SPRING Exam 1 Q22',
    q: 'Which statement about the preprocessor and #define is FALSE?',
    c: ['All #define substitutions are finished before the translator (the compiler proper) starts its work.', 'A #define line normally has no semicolon; a semicolon placed there would become part of the replacement text.', 'The preprocessor also replaces the defined name when it appears inside a string literal, such as "RATE" in a printf format.', 'None of the above.'], a: 2,
    why: 'Macro replacement works on tokens, and a string literal is one token. So printf("RATE\\n"); still prints the word RATE even after #define RATE 5. The other two statements are true.',
    hints: ['How does the preprocessor treat the text between double quotes?', 'Try #define RATE 5 followed by printf("RATE\\n");', 'A string literal is a single token - nothing inside it is replaced.'] });
  add({ id: 'c2-bxd-002', chapter: 2, t: 4, k: 'mcq', tag: 'Trace', source: '2025 SPRING Exam 1 Q22',
    q: 'The replacement text of a defined constant is not wrapped in parentheses. What does the program print?',
    code: '#include <stdio.h>\n#define WIDTH 3 + 2\n\nint main(void)\n{\n  printf("WIDTH: %d\\n", WIDTH * 2);\n  return 0;\n}',
    c: ['WIDTH: 10', '3 + 2: 7', 'WIDTH: 7', 'None of the above.'], a: 2,
    why: 'The preprocessor substitutes text, so WIDTH * 2 becomes 3 + 2 * 2, which is 3 + 4 = 7. The name inside the string literal is not replaced, so the label stays "WIDTH:".',
    hints: ['Do the substitution by hand, character for character.', 'After substitution, which operator is applied first?', 'Is WIDTH inside the quotes replaced?'] });
  add({ id: 'c2-bxd-003', chapter: 2, t: 2, k: 'mcq', tag: 'Concept', source: '2024 FALL Exam 1 Q13',
    q: 'Which statement about char data in C is TRUE?',
    c: ['A char can take part in addition and subtraction, for example turning \'c\' into \'d\' by adding 1.', 'A char variable may only be printed with %c; using %d is rejected by the compiler.', 'Because characters are text, char is not one of C\'s integral types.', 'None of the above.'], a: 0,
    why: 'char is an integral type: each character is stored as a small whole number (its character code). So \'c\' + 1 is \'d\', and printing a char with %d legally shows that number.',
    hints: ['How is a character actually stored in memory?', 'What does printf("%d", \'A\') show?', 'If it is a number, ordinary arithmetic works.'] });
  add({ id: 'c2-bxd-004', chapter: 2, t: 2, k: 'mcq', tag: 'Concept', source: '2025 SPRING Exam 1 Q8',
    q: 'Which statement about symbolic (defined) constants is FALSE?',
    c: ['#define TAX_RATE 0.07 gives an otherwise unexplained number a meaningful name.', 'Because 0.07 is a double literal, expressions that use TAX_RATE follow double arithmetic.', 'Later in the program the constant can be updated with an assignment statement such as TAX_RATE = 0.08;', 'None of the above.'], a: 2,
    why: 'After preprocessing, TAX_RATE = 0.08; becomes 0.07 = 0.08; - you cannot assign to a literal, so it does not compile. A defined constant is set once by #define, never by assignment.',
    hints: ['What does the compiler see after the substitution?', 'Can a literal like 0.07 appear on the left of =?', 'Defined constants are fixed by the directive, not by =.'] });
  add({ id: 'c2-bxd-005', chapter: 2, t: 2, k: 'mcq', tag: 'Concept', source: '2025 SPRING Exam 1 Q19',
    q: 'Which statement about choosing a data type for a variable is FALSE?',
    c: ['An int and a double usually occupy different amounts of memory.', 'Whether % can be used with a variable is decided by the variable\'s type.', 'The format conversion code used to print a variable with printf depends on its type.', 'None of the above.'], a: 3,
    why: 'All three are true: sizes differ (commonly 4 vs 8 bytes), % is defined only for integer operands, and printf needs %d for int but %lf or %f for double.',
    hints: ['Check each statement against what a type controls.', 'Try 7.5 % 2 in your head - does it compile?', 'Size, operations and representation all depend on type.'] });
  add({ id: 'c2-bxd-006', chapter: 2, t: 2, k: 'mcq', tag: 'Concept', source: '2025 SPRING Exam 1 Q5',
    q: 'Which item below is NOT a programming standard of the course?',
    c: ['Every variable must be given the value 0 (or 0.0) in the same statement that declares it.', 'All of a function\'s variables are declared in its local declaration section, before the first executable statement.', 'Variables are declared inside functions; global variables are not permitted.', 'None of the above.'], a: 0,
    why: 'The course requires local declarations that come before the executable statements and forbids global variables, but it does not require that every variable be initialized in its declaration. A variable that scanf fills in, for example, does not need a starting value.',
    hints: ['Two of these are rules about WHERE declarations go.', 'Does a variable filled by scanf need a starting value?', 'Which item is a habit some people like but the course does not require?'] });
  add({ id: 'c2-bxd-007', chapter: 2, t: 2, k: 'mcq', tag: 'Concept', source: '2024 FALL Exam 1 Q11',
    q: 'Following the course\'s standards, which statement about how a C program is organized is TRUE?',
    c: ['Variables shared by several functions should be declared globally so they need not be passed as parameters.', 'A function\'s body includes both its local declarations and its executable statements.', 'Mixing declarations among executable statements is acceptable whenever it makes the code shorter.', 'None of the above.'], a: 1,
    why: 'The body is everything between the function\'s braces: the local declaration section followed by the executable statement section. The course forbids global variables and requires all declarations before the first executable statement.',
    hints: ['What lies between the opening and closing brace of a function?', 'Does the course allow global variables?', 'Declarations come first - always.'] });
  add({ id: 'c2-bxd-008', chapter: 2, t: 3, k: 'mcq', tag: 'Concept', source: '2024 SPRING Final Q7',
    q: 'Which statement about printf and scanf is FALSE?',
    c: ['In printf("%.2f", x), the .2 rounds the shown value to two digits after the decimal point.', 'Each scanf placeholder needs a matching address in the address list, such as &count for an int.', 'Printing a double with %d is a mismatch whose result the C standard leaves undefined.', 'None of the above.'], a: 3,
    why: 'All three are true. Precision rounds the displayed value, scanf needs addresses, and a conversion code that does not match the argument type gives undefined behaviour.',
    hints: ['Check each statement independently.', 'What does printf("%.2f", 2.346) show?', 'If none is false, which choice remains?'] });
  add({ id: 'c2-bxd-009', chapter: 2, t: 2, k: 'mcq', tag: 'Concept', source: '2025 SPRING Exam 1 Q6',
    q: 'Which statement about scanf is TRUE?',
    c: ['One call such as scanf("%d %lf", &n, &rate); can read two values.', 'scanf receives a format string followed by the values (not the addresses) of the variables to fill.', 'To read into a double variable, scanf uses %f exactly as printf does.', 'None of the above.'], a: 0,
    why: 'A single format string may hold several placeholders, each matched to one address. scanf needs addresses (&n), and reading a double requires %lf; %f in scanf is for float.',
    hints: ['How many placeholders can one format string hold?', 'Why do we write & in front of the variables?', 'float vs double in scanf: %f or %lf?'] });

  /* ---- Chapter 3 ---- */
  add({ id: 'c3-bxd-001', chapter: 3, t: 2, k: 'mcq', tag: 'Concept', source: '2022 SPRING Final Q49',
    q: 'A program declares int count;. Which of the following would make count a double for the rest of the program?',
    c: ['Writing the cast (double) count inside an expression', 'Assigning a double to it, as in count = 2.5;', 'Using count in an expression together with a double so that it is promoted', 'None of the above.'], a: 3,
    why: 'A declared type is permanent. A cast or a promotion only changes the type of the VALUE used in that one expression, and assigning 2.5 converts the value to int (count becomes 2). Nothing changes count\'s declared type.',
    hints: ['What is fixed by a declaration?', 'After count = 2.5;, what does count hold?', 'Casts and promotions affect a value in one expression, not the variable.'] });
  add({ id: 'c3-bxd-002', chapter: 3, t: 4, k: 'mcq', tag: 'Trace', source: '2022 SPRING Final Q49',
    q: 'What does this segment print?',
    code: 'int units = 7;\ndouble avg;\n\navg = (double) units / 2;\nunits = avg;\nprintf("%d %.1f\\n", units, avg);',
    c: ['3 3.5', '3.5 3.5', '7 3.5', 'None of the above.'], a: 0,
    why: 'The cast makes 7.0 / 2 = 3.5, but units stays an int. Assigning 3.5 to units is an assignment conversion that truncates to 3. So the output is 3 3.5.',
    hints: ['Does the cast change the variable units?', 'What happens when a double is stored in an int?', 'Truncation drops the fraction.'] });
  add({ id: 'c3-bxd-003', chapter: 3, t: 3, k: 'mcq', tag: 'Concept', source: '2024 SPRING Final Q3',
    q: 'Which of these conversions can lose information, such as dropping the fractional part of a value?',
    c: ['An explicit conversion (cast), such as (int) 9.8', 'An assignment conversion, such as storing 9.8 in an int variable', 'An implicit conversion inside arithmetic, such as int + double', 'More than one of the above.'], a: 3,
    why: 'A cast and an assignment can both demote a value to a lower-ranked type, which may lose data (9.8 becomes 9). Implicit conversion in an arithmetic expression only promotes to the higher type, so it is the safe one. Two of the three are potentially unsafe.',
    hints: ['Which conversions can move a value DOWN in rank?', 'Can a cast demote? Can an assignment?', 'Implicit arithmetic conversion always promotes.'] });
  add({ id: 'c3-bxd-004', chapter: 3, t: 2, k: 'mcq', tag: 'Concept', source: '2024 FALL Exam 1 Q15',
    q: 'Which statement about data type conversion is FALSE?',
    c: ['Storing a higher-ranked value in a lower-ranked variable can lose part of it, such as the fraction of a double stored in an int.', 'In the assignment x = y; the value of y is converted to the type of x, whether that is a promotion or a demotion.', 'Writing (float) total is the programmer choosing the type of that operand for the expression.', 'None of the above.'], a: 3,
    why: 'All three are correct: demotion may lose data, assignment converts to the type on the left, and a cast is an explicit conversion chosen by the programmer.',
    hints: ['Check each statement independently.', 'In an assignment, which side\'s type wins?', 'If nothing is false, pick None of the above.'] });
  add({ id: 'c3-bxd-005', chapter: 3, t: 3, k: 'mcq', tag: 'Concept', source: '2025 SPRING Exam 1 Q11',
    q: 'Which statement about type conversion is FALSE?',
    c: ['When an int and a double meet in an arithmetic expression, the int is converted up to double, never the reverse.', 'Casting a variable, as in (int) price, leaves price declared with whatever type it had before.', 'The course lists assignment conversion as its own category, apart from implicit conversion, because an assignment can demote a value.', 'None of the above.'], a: 3,
    why: 'All three are true. Implicit conversion promotes the lower rank, a cast affects only the value used in that expression, and assignment conversion is treated separately because it can go either way.',
    hints: ['Implicit conversion in arithmetic: up or down?', 'Does a cast touch the variable\'s declaration?', 'Why would assignment be its own category?'] });
  add({ id: 'c3-bxd-006', chapter: 3, t: 4, k: 'mcq', tag: 'Trace', source: '2025 SPRING Exam 1 Q11',
    q: 'Where the cast is placed matters. What does this segment print?',
    code: 'int a = 7;\nint b = 2;\ndouble r1;\ndouble r2;\ndouble r3;\n\nr1 = a / b;\nr2 = (double) a / b;\nr3 = (double) (a / b);\nprintf("%.1f %.1f %.1f\\n", r1, r2, r3);',
    c: ['3.0 3.5 3.0', '3.5 3.5 3.5', '3.0 3.5 3.5', 'None of the above.'], a: 0,
    why: 'r1: 7 / 2 is integer division (3), then stored as 3.0. r2: the cast happens first, so 7.0 / 2 = 3.5. r3: the parentheses force 7 / 2 = 3 first, and only then is 3 cast to 3.0.',
    hints: ['Integer / integer gives an integer.', 'In r2, does the cast happen before or after the division?', 'In r3, the division is inside the parentheses.'] });
  add({ id: 'c3-bxd-007', chapter: 3, t: 2, k: 'mcq', tag: 'Concept', source: '2024 FALL Exam 1 Q16',
    q: 'Which statement about the increment and decrement operators is TRUE?',
    c: ['In y = x++;, y receives the value x has after it is increased.', '5++ is a legal expression because 5 is an int.', 'An expression such as n++ * n++ changes n twice without sequencing, so its result is undefined.', 'None of the above.'], a: 2,
    why: 'Modifying the same variable twice in one expression with no sequence point is undefined behaviour. Postfix yields the OLD value, and ++ needs a modifiable variable, not a constant.',
    hints: ['Postfix: use first, then change.', 'Can you store a new value into the literal 5?', 'What does C say about changing one variable twice in a single expression?'] });
  add({ id: 'c3-bxd-008', chapter: 3, t: 2, k: 'mcq', tag: 'Concept', source: '2025 SPRING Exam 1 Q10',
    q: 'Which statement about prefix and postfix operators is FALSE?',
    c: ['As a statement on its own line, ++count; and count++; have the same effect.', 'Applying -- to a literal, as in --10, is allowed because 10 is an integer.', 'Using one variable with both ++ and -- inside a single expression should be avoided, since the result may be undefined.', 'None of the above.'], a: 1,
    why: 'The operand of ++ or -- must be a modifiable variable (an lvalue). --10 asks C to store a new value in a constant, so it does not compile.',
    hints: ['What does -- have to do to its operand?', 'Can a constant be given a new value?', 'Try compiling int k = --10;'] });
  add({ id: 'c3-bxd-009', chapter: 3, t: 3, k: 'mcq', tag: 'Concept', source: '2025 SPRING Exam 1 Q23',
    q: 'Let m and n be int variables with 0 < m < n. Which describes every possible value of m % n?',
    c: ['Any value from 0 up to n - 1', 'Any value from 0 up to m - 1', 'It always equals m', 'None of the above.'], a: 2,
    why: 'When the left operand is smaller than the right, n goes into m zero times and the whole of m is left over. So m % n is always m (for example 3 % 8 is 3).',
    hints: ['How many times does n fit into a smaller number m?', 'Try 3 % 8 and 5 % 9.', 'Quotient 0 means the remainder is everything.'] });

  /* ---- Chapter 4 ---- */
  add({ id: 'c4-bxd-001', chapter: 4, t: 2, k: 'mcq', tag: 'Concept', source: '2024 FALL Exam 1 Q18',
    q: 'Which statement about parameters and local variables is FALSE?',
    c: ['Arguments are matched to parameters by their position in the call, not by their names.', 'Inside a function, a local variable may reuse the name of one of that function\'s parameters.', 'A local variable of one function cannot be used by name inside any other function.', 'None of the above.'], a: 1,
    why: 'A parameter already belongs to the outermost block of the function, so declaring a local with the same name there is a redeclaration error. The other two statements are true.',
    hints: ['Where do the parameters live inside a function?', 'Try int f(int a) { int a = 2; return a; }', 'Two declarations of one name in the same scope do not compile.'] });
  add({ id: 'c4-bxd-002', chapter: 4, t: 2, k: 'mcq', tag: 'Concept', source: '2024 FALL Exam 1 Q21',
    q: 'Which statement about function calls and the flow of control is TRUE?',
    c: ['When any function finishes, control jumps back to main, even if a different function made the call.', 'A call sends control into the function, and when it returns, the caller continues right after the call.', 'Functions execute in the order their prototypes are listed in the global section.', 'None of the above.'], a: 1,
    why: 'Control returns to whichever function made the call, at the point just after the call. The order of prototypes or definitions has no effect on the order of execution; only calls decide that.',
    hints: ['If f calls g, where does g return to?', 'Do prototypes run anything?', 'Calls, not declarations, decide execution order.'] });
  add({ id: 'c4-bxd-003', chapter: 4, t: 2, k: 'mcq', tag: 'Concept', source: '2024 FALL Exam 1 Q22',
    q: 'The course lists reasons for writing user-defined functions. Which item below is NOT one of those advantages?',
    c: ['A function can be checked on its own, which narrows down where a newly found bug can be.', 'Dividing a big problem into separate tasks yields pieces that are simpler to work out.', 'A task written once as a function can be called from several places instead of repeating the code.', 'None of the above.'], a: 3,
    why: 'All three are benefits of user-defined functions: separate testing, problem factoring, and reuse that removes duplicate code. None of them is a non-benefit.',
    hints: ['Look for a statement that is NOT an advantage.', 'Testing, factoring, reuse - are all three advantages?', 'If every item is a benefit, pick None of the above.'] });
  add({ id: 'c4-bxd-004', chapter: 4, t: 2, k: 'mcq', tag: 'Concept', source: '2025 SPRING Exam 1 Q18',
    q: 'In the prototype below, what does the leading word double describe?',
    code: 'double average(int total, int count);',
    c: ['The type of value average sends back to its caller', 'The type both parameters are converted to inside the function', 'The type of every local variable declared in average', 'None of the above.'], a: 0,
    why: 'The type written before a function\'s name is its return type. Parameter types are listed separately inside the parentheses, and local variables have their own declarations.',
    hints: ['Where are the parameter types written?', 'What does a function "produce"?', 'The word before the name = the type of the returned value.'] });
  add({ id: 'c4-bxd-005', chapter: 4, t: 2, k: 'mcq', tag: 'Concept', source: '2025 SPRING Exam 1 Q24',
    q: 'Under the course\'s design standards, which statement about main is TRUE?',
    c: ['main mostly coordinates the calls to other functions and holds the variables that carry data between them.', 'Input and output belong in main so the program needs fewer user-defined functions.', 'Whenever any function finishes, control goes back to main.', 'None of the above.'], a: 0,
    why: 'In the course, main is a coordinator: it declares the data the program needs and calls the functions that do the work. Input and output go in their own functions, and control returns to the caller, which is not always main.',
    hints: ['What is main\'s job once you have user-defined functions?', 'Where should scanf and printf work live?', 'If calcA calls calcB, where does calcB return to?'] });
  add({ id: 'c4-bxd-006', chapter: 4, t: 2, k: 'mcq', tag: 'Concept', source: '2025 SPRING Exam 2 Q4',
    q: 'Under the course standards, which condition is NOT needed before a function may use pass-by-address parameters?',
    c: ['The caller needs to see more than one value updated after the call returns.', 'The function still does a single, well-defined job even though it updates several values.', 'Once one parameter uses an address, every other parameter of that function must use an address too.', 'None of the above.'], a: 2,
    why: 'The course uses pass by address when a single-task function must send back several values. There is no rule that all parameters switch to addresses - a function can mix value and address parameters.',
    hints: ['Why can return alone not do the job?', 'Can one function take some ints by value and some by address?', 'Look for the "all or nothing" claim.'] });
  add({ id: 'c4-bxd-007', chapter: 4, t: 2, k: 'mcq', tag: 'Concept', source: '2025 SPRING Exam 2 Q6',
    q: 'Which statement about scope is FALSE?',
    c: ['A parameter can be used anywhere inside the body of its function.', 'A variable declared in main can be used by name inside any function that main calls.', 'An identifier\'s scope is the part of the source code where that name can be used.', 'None of the above.'], a: 1,
    why: 'Local variables of main are visible only inside main. A called function sees the values only if they are passed in as arguments (or their addresses are).',
    hints: ['Where does a local variable\'s scope end?', 'How does a called function get main\'s data?', 'Visible by name vs passed as an argument.'] });
  add({ id: 'c4-bxd-008', chapter: 4, t: 2, k: 'mcq', tag: 'Concept', source: '2025 SPRING Exam 2 Q13',
    q: 'Which statement about pass-by-address parameters is TRUE?',
    c: ['A function that has pointer parameters is not allowed to return a value.', 'To receive &total where total is a double, the matching parameter must be declared as double *.', 'The variable passed by address must have the same identifier as the parameter that receives it.', 'None of the above.'], a: 1,
    why: 'The parameter\'s type must match the address being sent: the address of a double is a double *. Names do not need to match, and such a function may still return a value.',
    hints: ['What type is &total if total is a double?', 'Are arguments matched by name or by position?', 'Can a function both return a value and update through a pointer?'] });
  add({ id: 'c4-bxd-009', chapter: 4, t: 2, k: 'mcq', tag: 'Concept', source: '2025 SPRING Exam 2 Q16',
    q: 'You want to find out whether getInput receives one of its parameters by address. Which of the following would give you NO way to tell?',
    c: ['The prototype of getInput in the global declaration section', 'A statement in main that calls getInput', 'The header line at the start of getInput\'s definition', 'None of the above.'], a: 3,
    why: 'All three show it: the prototype and the definition header use * on that parameter, and the call passes an address such as &value. Every one of them can reveal pass by address.',
    hints: ['What symbol marks an address parameter in a declaration?', 'What symbol shows up in the call?', 'If all three can show it, which choice is left?'] });
  add({ id: 'c4-bxd-010', chapter: 4, t: 2, k: 'mcq', tag: 'Concept', source: '2025 SPRING Exam 2 Q21',
    q: 'Which statement about designing user-defined functions is FALSE?',
    c: ['If two functions need the same steps, those steps belong in one function both can call.', 'A function should end at one return statement rather than at several.', 'Each function should be testable on its own, before the whole program is finished.', 'None of the above.'], a: 3,
    why: 'All three are course design rules: no duplicated logic, one return (single point of termination), and functions that can be tested separately.',
    hints: ['Each statement is a design guideline - is any wrong?', 'How many return statements does the course allow?', 'If all are good practice, choose None of the above.'] });
  add({ id: 'c4-bxd-011', chapter: 4, t: 2, k: 'mcq', tag: 'Concept', source: '2022 SPRING Exam 2 Q20',
    q: 'Which statement about rand and srand is FALSE?',
    c: ['srand takes the seed as its argument and returns nothing.', 'Seeding twice with the same value restarts the same sequence of numbers.', 'Every call to rand returns the next value of the current pseudo-random sequence.', 'None of the above.'], a: 3,
    why: 'All three are true. srand(seed) sets the starting point, the same seed always reproduces the same sequence, and each rand() call moves to the next number.',
    hints: ['Check the job of each function.', 'What happens if you call srand(7) twice?', 'Nothing false? Then None of the above.'] });
  add({ id: 'c4-bxd-012', chapter: 4, t: 4, k: 'mcq', tag: 'Trace', source: '2022 SPRING Exam 2 Q20',
    q: 'srand is called inside the loop on every pass. Which statement about the output is TRUE?',
    code: 'int k;\n\nfor (k = 0; k < 3; k++)\n{\n  srand(25);\n  printf("%d ", rand() % 2);\n}\nprintf("\\n");',
    c: ['All three numbers printed are the same.', 'The three numbers are guaranteed to differ from one another.', 'The output is always 0 1 0.', 'None of the above.'], a: 0,
    why: 'Re-seeding with 25 before every call restarts the sequence each time, so rand() returns the same first number on all three passes. That is why srand should be called only once per sequence.',
    hints: ['What does srand(25) do to the sequence?', 'After restarting, which number of the sequence does rand return?', 'Same seed + first call = same value.'] });
  add({ id: 'c4-bxd-013', chapter: 4, t: 2, k: 'mcq', tag: 'Concept', source: '2022 SPRING Exam 2 Q21',
    q: 'Which expression gives a random integer from 10 to 50, inclusive?',
    c: ['rand() % 40 + 10', 'rand() % 41 + 10', 'rand() % 50 + 10', 'None of the above.'], a: 1,
    why: 'There are 50 - 10 + 1 = 41 possible values. rand() % 41 gives 0..40, and adding 10 shifts that to 10..50. % 40 stops at 49 and % 50 reaches 59.',
    hints: ['Count the values in the range, including both ends.', 'rand() % k gives 0 through k - 1.', 'Shift the result up by the smallest value.'] });
  add({ id: 'c4-bxd-014', chapter: 4, t: 2, k: 'mcq', tag: 'Concept', source: '2022 FALL Exam 2 Q26',
    q: 'A program keeps a seed value in the unsigned int variable start. Which statement uses it to seed the random number generator?',
    c: ['start = srand();', 'rand(start);', 'srand(start);', 'None of the above.'], a: 2,
    why: 'srand takes the seed as its parameter and returns nothing, so it is called as a statement: srand(start);. rand takes no arguments.',
    hints: ['Which function sets the seed?', 'Does srand return anything you could store?', 'The seed goes in the parentheses.'] });

  /* ---- Chapter 5 ---- */
  add({ id: 'c5-bxd-001', chapter: 5, t: 3, k: 'mcq', tag: 'Trace', source: '2022 SPRING Exam 2 Q11',
    q: 'What value of x does this segment display?',
    code: 'int a = 4;\nint b = 0;\nint c = -3;\nint x;\n\nx = a > b && b || c;\nprintf("x: %d\\n", x);',
    c: ['x: -3', 'x: 0', 'x: 1', 'None of the above.'], a: 2,
    why: '&& binds tighter than ||, so the expression is (a > b && b) || c. a > b is 1, but b is 0, so the && part is 0. Then 0 || c: c is -3, which is nonzero (true), so the whole expression is 1. Logical operators always produce 0 or 1, never the value -3. (gcc -Wall even suggests adding parentheses here, because this precedence trips people up.)',
    hints: ['Which binds tighter, && or ||?', 'Group it as (a > b && b) || c.', 'What values can a logical expression produce?'] });
  add({ id: 'c5-bxd-002', chapter: 5, t: 4, k: 'mcq', tag: 'Trace', source: '2022 SPRING Exam 2 Q11',
    q: 'Unary operators bind tighter than binary ones. What does this segment print?',
    code: 'int p = 5;\nint q = 2;\nint r = 0;\nint x;\n\nx = (p % q == 1) + !r * -q + (p && r - 1);\nprintf("x: %d\\n", x);',
    c: ['x: 0', 'x: -2', 'x: 1', 'None of the above.'], a: 0,
    why: 'p % q is 1, so the first term is 1. !r is 1 and -q is -2, and both unary operators apply before *, giving 1 * -2 = -2. r - 1 is -1 (nonzero), so p && -1 is 1. Total: 1 - 2 + 1 = 0.',
    hints: ['Evaluate the three terms separately.', '!r and -q are each worked out before the multiplication.', 'p && (r - 1): is -1 true or false?'] });
  add({ id: 'c5-bxd-003', chapter: 5, t: 3, k: 'mcq', tag: 'Trace', source: '2022 SPRING Exam 2 Q12',
    q: 'What does this segment print?',
    code: 'int w = 3;\nint y = -2;\nint z = 0;\n\nif (w > 2 || ++y)\n{\n  z = y++ && w--;\n}\nprintf("y: %d, z: %d\\n", y, z);',
    c: ['y: -1, z: 1', 'y: 0, z: 1', 'y: -1, z: 0', 'None of the above.'], a: 0,
    why: 'w > 2 is true, so || short-circuits and ++y never runs. Inside the if, y++ yields -2 (nonzero, true) and then y becomes -1; w-- yields 3 (true), so z = 1. Output: y: -1, z: 1.',
    hints: ['Is the right operand of || evaluated when the left is true?', 'y++ yields the old value (-2) - is that true or false?', 'Count how many times y actually changes.'] });
  add({ id: 'c5-bxd-004', chapter: 5, t: 3, k: 'mcq', tag: 'Trace', source: '2022 SPRING Exam 2 Q13',
    q: 'In the segment, which logical operator evaluates only its LEFT operand (short-circuits)?',
    code: 'int w = 3;\nint y = -2;\nint z = 0;\n\nif (w > 2 || ++y)\n{\n  z = y++ && w--;\n}\nprintf("y: %d, z: %d\\n", y, z);',
    c: ['The || in the if condition', 'The && in the assignment to z', 'Both of them', 'None of the above.'], a: 0,
    why: 'w > 2 is true, which settles the || without evaluating ++y. For the &&, the left operand y++ yields -2, which is true, so the right operand w-- must also be evaluated - no short circuit there.',
    hints: ['|| stops early when its left operand is true.', '&& stops early only when its left operand is false (0).', 'What does y++ yield on its first use: -2 or -1?'] });
  add({ id: 'c5-bxd-005', chapter: 5, t: 2, k: 'mcq', tag: 'Concept', source: '2022 SPRING Exam 2 Q14',
    q: 'Which statement about case labels in a switch is FALSE?',
    c: ['A label such as case 2 * 3 + 1: is legal because its value is known when the program is compiled.', 'A case label may use a character constant such as \'Y\'.', 'A case label may use an int variable, as in case limit: where limit was read with scanf.', 'None of the above.'], a: 2,
    why: 'Each case label must be an integral CONSTANT expression. 2 * 3 + 1 is a constant expression (it may contain several operators), and \'Y\' is an integral constant. A variable is not a constant, so case limit: does not compile.',
    hints: ['A case label must be known at compile time.', 'Can an expression with several operators still be a constant?', 'Is a value read with scanf known at compile time?'] });
  add({ id: 'c5-bxd-006', chapter: 5, t: 3, k: 'mcq', tag: 'Concept', source: '2022 SPRING Exam 2 Q18',
    q: 'Which choice is the complement of this expression?',
    code: 'm >= lo && m <= hi || m == k',
    c: ['m < lo || m > hi && m != k', 'm < lo || m > hi || m != k', '(m < lo || m > hi) && m != k', 'None of the above.'], a: 2,
    why: '&& binds tighter, so the original is (m >= lo && m <= hi) || m == k. Complement each part and swap the operators: (m < lo || m > hi) && m != k. The parentheses are needed, because without them && would bind m > hi && m != k together.',
    hints: ['First add the implied parentheses to the original.', 'De Morgan: negate each relation and swap && with ||.', 'Does the result still need parentheses to keep the grouping?'] });
  add({ id: 'c5-bxd-007', chapter: 5, t: 4, k: 'mcq', tag: 'Concept', source: '2022 SPRING Exam 2 Q18',
    q: 'Which choice is the complement of this expression, if any?',
    code: 't > 0 || u < 5 && t != u',
    c: ['t <= 0 && u >= 5 || t == u', 't <= 0 || u >= 5 && t == u', '!(t > 0) && !(u < 5) && t == u', 'None of the above.'], a: 3,
    why: 'The original groups as t > 0 || (u < 5 && t != u). Its complement is t <= 0 && (u >= 5 || t == u). Choice 1 loses the parentheses, so && grabs u >= 5 first. Choice 2 forgets to swap the operators. Choice 3 replaces || with && inside. None matches.',
    hints: ['Which operator does the original evaluate first?', 'Write the complement with parentheses, then compare.', 'Removing needed parentheses changes the meaning.'] });
  add({ id: 'c5-bxd-008', chapter: 5, t: 2, k: 'mcq', tag: 'Concept', source: '2022 SPRING Exam 2 Q19',
    q: 'Which statement about the if...else construct is TRUE?',
    c: ['Every if must be followed by a matching else.', 'Any expression with a scalar value, as in if (count), may serve as the condition.', 'Indenting an else so it lines up with the outer if attaches it to the outer if.', 'None of the above.'], a: 1,
    why: 'C tests whether the condition is zero or nonzero, so if (count) is legal and means "if count is not 0". The else is optional, and indentation never changes which if an else belongs to - braces do.',
    hints: ['Is else ever optional?', 'Does the compiler read indentation?', 'Nonzero means true.'] });
  add({ id: 'c5-bxd-009', chapter: 5, t: 3, k: 'mcq', tag: 'Trace', source: '2022 SPRING Exam 2 Q24',
    q: 'What is printed by this program?',
    code: '#include <stdio.h>\n\nchar rank(int score);\n\nint main(void)\n{\n  printf("Rank #1: %c, Rank #2: %c\\n", rank(100), rank(69));\n  return 0;\n}\n\nchar rank(int score)\n{\n  char r = \'F\';\n\n  switch (score / 10)\n  {\n    case 10:\n    case 9: r = \'A\';\n            break;\n    case 8: r = \'B\';\n            break;\n    case 7: r = \'C\';\n            break;\n    case 6: r = \'D\';\n            break;\n  }\n  return r;\n}',
    c: ['Rank #1: F, Rank #2: D', 'Rank #1: A, Rank #2: C', 'Rank #1: A, Rank #2: D', 'None of the above.'], a: 2,
    why: '100 / 10 is 10. case 10 has no statements of its own, so control falls into case 9 and r becomes \'A\'. 69 / 10 is 6 with integer division (no rounding up), so r becomes \'D\'.',
    hints: ['Compute score / 10 with integer division.', 'What happens when a case label has no statements?', '69 / 10 is 6, not 7.'] });
  add({ id: 'c5-bxd-010', chapter: 5, t: 3, k: 'mcq', tag: 'Trace', source: '2022 SPRING Exam 2 Q25',
    q: 'All of the break statements have been removed from rank. What does the program print now?',
    code: '#include <stdio.h>\n\nchar rank(int score);\n\nint main(void)\n{\n  printf("Rank #1: %c, Rank #2: %c\\n", rank(100), rank(69));\n  return 0;\n}\n\nchar rank(int score)\n{\n  char r = \'F\';\n\n  switch (score / 10)\n  {\n    case 10:\n    case 9: r = \'A\';\n    case 8: r = \'B\';\n    case 7: r = \'C\';\n    case 6: r = \'D\';\n  }\n  return r;\n}',
    c: ['Rank #1: A, Rank #2: D', 'Rank #1: D, Rank #2: D', 'Rank #1: F, Rank #2: D', 'None of the above.'], a: 1,
    why: 'Without break, once a case matches, every following statement runs. For 100, control enters at case 10 and falls through r = \'A\', \'B\', \'C\', then \'D\'. For 69 it enters at case 6, which is already the last one, so r is \'D\'.',
    hints: ['Where does execution stop without break?', 'Follow 100 from case 10 to the end of the switch.', 'The last assignment executed wins.'] });
  add({ id: 'c5-bxd-011', chapter: 5, t: 2, k: 'mcq', tag: 'Concept', source: '2022 FALL Exam 2 Q1',
    q: 'Shipping is free when the order total is at least 50 and the item is not oversized, or whenever the customer is a member. Which expression is true exactly when shipping is free? (oversized and member hold 1 for yes and 0 for no.)',
    c: ['total >= 50 && !(oversized || member)', 'total >= 50 && !oversized || member', '(total >= 50 || member) && !oversized', 'None of the above.'], a: 1,
    why: '&& binds tighter than ||, so total >= 50 && !oversized || member means (total >= 50 && !oversized) || member - exactly the rule. Choice 3 wrongly denies members with oversized items, and choice 1 denies all members.',
    hints: ['Write the rule as (A and B) or C.', 'Which operator binds tighter, && or ||?', 'Test a member ordering an oversized item.'] });
  add({ id: 'c5-bxd-012', chapter: 5, t: 3, k: 'mcq', tag: 'Concept', source: '2022 FALL Exam 2 Q2',
    q: 'Which expression is the logical complement of the one shown? (Remember that a nonzero remainder counts as true.)',
    code: 'n % 3 == 0 && n % 9 != 0 || n % 27 == 0',
    c: ['(n % 3 || !(n % 9)) && n % 27', '!(n % 3) || n % 9 && !(n % 27)', '(n % 3 != 0 || n % 9 != 0) && n % 27 != 0', 'None of the above.'], a: 0,
    why: 'The complement is (n % 3 != 0 || n % 9 == 0) && n % 27 != 0. Since x != 0 can be written as just x, and x == 0 as !x, that is (n % 3 || !(n % 9)) && n % 27. Choice 3 negates n % 9 != 0 incorrectly (it should become n % 9 == 0).',
    hints: ['Write the complement with == and != first.', 'n % 3 != 0 is the same test as n % 3 by itself.', 'n % 9 == 0 is the same test as !(n % 9).'] });
  add({ id: 'c5-bxd-013', chapter: 5, t: 2, k: 'mcq', tag: 'Trace', source: '2022 FALL Exam 2 Q3',
    q: 'What does the program display?',
    code: '#include <stdio.h>\n\nchar classify(int age, double score);\n\nint main(void)\n{\n  printf("Category: %c\\n", classify(17, 88.5));\n  return 0;\n}\n\nchar classify(int age, double score)\n{\n  char cat;\n\n  if (age >= 18)\n  {\n    if (score >= 90)\n    {\n      cat = \'P\';\n    }\n    else\n    {\n      cat = \'Q\';\n    }\n  }\n  else if (score > 85)\n  {\n    cat = \'R\';\n  }\n  else\n  {\n    cat = \'S\';\n  }\n  return cat;\n}',
    c: ['Category: Q', 'Category: S', 'Category: R', 'None of the above.'], a: 2,
    why: 'age is 17, so the outer if is false and the inner if is never reached. The else-if tests 88.5 > 85, which is true, so cat is \'R\'.',
    hints: ['Start with the outer condition age >= 18.', 'If it is false, skip the whole first block.', 'Is 88.5 greater than 85?'] });
  add({ id: 'c5-bxd-014', chapter: 5, t: 3, k: 'mcq', tag: 'Trace', source: '2022 FALL Exam 2 Q4',
    q: 'The call in main now passes an age of 18 and a score of 90.0. What does the program display?',
    code: '#include <stdio.h>\n\nchar classify(int age, double score);\n\nint main(void)\n{\n  printf("Category: %c\\n", classify(18, 90.0));\n  return 0;\n}\n\nchar classify(int age, double score)\n{\n  char cat;\n\n  if (age >= 18)\n  {\n    if (score >= 90)\n    {\n      cat = \'P\';\n    }\n    else\n    {\n      cat = \'Q\';\n    }\n  }\n  else if (score > 85)\n  {\n    cat = \'R\';\n  }\n  else\n  {\n    cat = \'S\';\n  }\n  return cat;\n}',
    c: ['Category: Q', 'Category: R', 'Category: S', 'None of the above.'], a: 3,
    why: 'age >= 18 is true (18 >= 18), and score >= 90 is true (90.0 >= 90), so cat is \'P\' and the output is Category: P - which is not listed.',
    hints: ['>= includes the boundary value.', 'Is 18 >= 18? Is 90.0 >= 90?', 'Which letter is assigned when both inner tests pass?'] });
  add({ id: 'c5-bxd-015', chapter: 5, t: 3, k: 'mcq', tag: 'Concept', source: '2022 FALL Exam 2 Q5',
    q: 'Segment A and Segment B each set the char variable cat from the int r. For which range of r do the two segments always give cat the same value?',
    code: '/* Segment A */\nif (r < 40)\n{\n  cat = \'L\';\n}\nelse if (r < 80)\n{\n  cat = \'M\';\n}\nelse\n{\n  cat = \'H\';\n}\n\n/* Segment B */\nif (r >= 80)\n{\n  cat = \'H\';\n}\nif (r < 40)\n{\n  cat = \'L\';\n}\nelse\n{\n  cat = \'M\';\n}',
    c: ['r < 80', 'r >= 40', 'r >= 80', 'None of the above.'], a: 0,
    why: 'In B the two ifs are independent. For r >= 80, B sets \'H\' and then the second if (r < 40 is false) overwrites it with \'M\', while A gives \'H\'. For every r below 80 both segments give \'L\' (r < 40) or \'M\' (40 to 79). So they agree exactly when r < 80.',
    hints: ['In B, does the second if run even after the first one matched?', 'Trace r = 90 through both segments.', 'Then try r = 20 and r = 60.'] });
  add({ id: 'c5-bxd-016', chapter: 5, t: 4, k: 'mcq', tag: 'Concept', source: '2022 FALL Exam 2 Q5',
    q: 'Both segments set the int variable code from the int r. For which values of r do they always produce the same code?',
    code: '/* Segment A */\nif (r % 2 == 0 && r > 50)\n{\n  code = 1;\n}\nelse if (r > 50)\n{\n  code = 2;\n}\nelse\n{\n  code = 3;\n}\n\n/* Segment B */\nif (r > 50)\n{\n  code = 2;\n}\nelse if (r % 2 == 0)\n{\n  code = 1;\n}\nelse\n{\n  code = 3;\n}',
    c: ['Exactly when r is odd', 'Exactly when r > 50', 'Exactly when r <= 50', 'None of the above.'], a: 0,
    why: 'Check the four cases. Even and > 50: A gives 1, B gives 2. Odd and > 50: both give 2. Even and <= 50: A gives 3, B gives 1. Odd and <= 50: both give 3. They agree exactly for odd r.',
    hints: ['Split r into four groups: even/odd and above/not above 50.', 'Trace one value from each group, such as 60, 61, 10, 11.', 'Which groups give matching codes?'] });
  add({ id: 'c5-bxd-017', chapter: 5, t: 3, k: 'mcq', tag: 'Trace', source: '2022 FALL Exam 2 Q6',
    q: 'What does the first printf display?',
    code: 'int x = 0;\nint y = 2;\nint z = \'A\';\n\nif (x++ && y--)\n{\n  z += 1;\n}\nif (y > 1 || ++z)\n{\n  z += x + y;\n}\nprintf("x=%d y=%d\\n", x, y);\nprintf("z=%d\\n", z);',
    c: ['x=1 y=1', 'x=1 y=2', 'x=0 y=2', 'None of the above.'], a: 1,
    why: 'x++ yields 0 (then x becomes 1). Because the left side of && is 0, y-- is skipped and y stays 2. So the first line is x=1 y=2.',
    hints: ['What value does x++ yield the first time?', 'When the left side of && is 0, is the right side evaluated?', 'x changes even though the condition is false.'] });
  add({ id: 'c5-bxd-018', chapter: 5, t: 3, k: 'mcq', tag: 'Trace', source: '2022 FALL Exam 2 Q7',
    q: 'The character \'A\' is stored as 65. What does the final printf display?',
    code: 'int x = 0;\nint y = 2;\nint z = \'A\';\n\nif (x++ && y--)\n{\n  z += 1;\n}\nif (y > 1 || ++z)\n{\n  z += x + y;\n}\nprintf("x=%d y=%d\\n", x, y);\nprintf("z=%d\\n", z);',
    c: ['z=66', 'z=67', 'z=69', 'None of the above.'], a: 3,
    why: 'The first if body is skipped, so z stays 65. In the second if, y > 1 is true and || short-circuits, so ++z does not run. The body adds x + y = 1 + 2, giving z=68, which is not listed.',
    hints: ['Does the first if body run?', 'Is ++z evaluated in the second condition?', '65 + x + y with x = 1, y = 2.'] });
  add({ id: 'c5-bxd-019', chapter: 5, t: 3, k: 'mcq', tag: 'Concept', source: '2022 FALL Exam 2 Q8',
    q: 'Which logical operator(s) in this segment short-circuit?',
    code: 'int x = 0;\nint y = 2;\nint z = \'A\';\n\nif (x++ && y--)\n{\n  z += 1;\n}\nif (y > 1 || ++z)\n{\n  z += x + y;\n}\nprintf("x=%d y=%d\\n", x, y);\nprintf("z=%d\\n", z);',
    c: ['Only the && in the first if', 'Only the || in the second if', 'Neither of them', 'Both of them'], a: 3,
    why: 'The && short-circuits because x++ yields 0, so y-- is never evaluated. The || short-circuits because y > 1 is already true, so ++z is never evaluated. Both operators skip their right operand.',
    hints: ['Check each operator separately.', '&& skips its right side when the left is 0.', '|| skips its right side when the left is nonzero.'] });
  add({ id: 'c5-bxd-020', chapter: 5, t: 4, k: 'mcq', tag: 'Concept', source: '2022 FALL Exam 2 Q8',
    q: 'Which logical operators in this segment short-circuit?',
    code: 'int a = 1;\nint b = 0;\nint c = 5;\n\nif (a-- || b++)\n{\n  c++;\n}\nif (a || b++ && c--)\n{\n  c += 10;\n}\nprintf("a=%d b=%d c=%d\\n", a, b, c);',
    c: ['Only the || in the first if', 'The || in the first if and the || in the second if', 'The || in the first if and the && in the second if', 'None of the above.'], a: 2,
    why: 'First if: a-- yields 1, so || skips b++ (a becomes 0, c becomes 6). Second if: a is now 0, so || must evaluate its right side, b++ && c--. b++ yields 0 (b becomes 1), so && skips c--. The program prints a=0 b=1 c=6.',
    hints: ['Track a after a-- in the first condition.', 'In the second condition, is the left side of || true?', 'The right side of || is itself an && - check its left operand.'] });
  add({ id: 'c5-bxd-021', chapter: 5, t: 2, k: 'mcq', tag: 'Concept', source: '2022 FALL Exam 2 Q9',
    q: 'Which statement about C\'s operators is TRUE?',
    c: ['The expression !(-7) evaluates to 0, and !0 evaluates to 1.', 'The expression 3 < 5 evaluates to 5, the larger of the two operands.', 'Writing (a) && (b) with extra parentheses makes C evaluate b even when a is 0.', 'None of the above.'], a: 0,
    why: '! turns any nonzero value into 0 and 0 into 1. Relational operators also give only 0 or 1 (3 < 5 is 1), and parentheses never switch off short-circuit evaluation.',
    hints: ['What values can a relational or logical operator produce?', 'Is -7 true or false?', 'Do parentheses change the order of evaluation rules for &&?'] });
  add({ id: 'c5-bxd-022', chapter: 5, t: 2, k: 'mcq', tag: 'Concept', source: '2022 FALL Exam 2 Q10',
    q: 'Which statement about multiway selection is FALSE?',
    c: ['The tests in an if / else if / else chain may be listed in any order without affecting which branch runs.', 'When every case ends with break, the cases of a switch may be rearranged without changing the behaviour.', 'Nesting if...else statements can produce the same effect as a multiway chain.', 'None of the above.'], a: 0,
    why: 'An else-if chain stops at the FIRST true test, so the order matters when ranges overlap (for example testing score >= 60 before score >= 90 would send a 95 to the wrong branch). Switch cases that all end in break are independent, so their order does not matter.',
    hints: ['Which branch runs when two tests in a chain are both true?', 'Try putting score >= 60 before score >= 90.', 'With break on every case, does switch order matter?'] });
  add({ id: 'c5-bxd-023', chapter: 5, t: 2, k: 'mcq', tag: 'Concept', source: '2022 FALL Exam 2 Q11',
    q: 'Which statement about the switch construct is TRUE?',
    c: ['The control expression may be a double, as in switch (price).', 'Several statements may follow one case label before its break.', 'The default label has to be the last label in the switch.', 'None of the above.'], a: 1,
    why: 'A case may have any number of statements. The control expression must have an integral type (int, char...), so a double is rejected, and default may appear anywhere among the labels.',
    hints: ['What kind of type must the switch expression have?', 'Is there a limit on statements per case?', 'Does C force default to be last?'] });
  add({ id: 'c5-bxd-024', chapter: 5, t: 2, k: 'mcq', tag: 'Trace', source: '2022 FALL Exam 2 Q16',
    q: 'What does this segment print?',
    code: 'int x = 10;\n\nif (x >= 10 || x < 0)\n{\n  x = x * 11;\n}\nif (x > 100 && x % 2)\n{\n  x = x - 10;\n}\nprintf("x = %d\\n", x);',
    c: ['x = 100', 'x = 110', 'x = 10', 'None of the above.'], a: 1,
    why: 'x >= 10 is true, so x becomes 110. In the second condition, 110 > 100 is true but 110 % 2 is 0 (false), so the && is false and x stays 110.',
    hints: ['Is 10 >= 10?', 'What is 110 % 2, and is that true or false?', 'Both sides of && must be nonzero.'] });
  add({ id: 'c5-bxd-025', chapter: 5, t: 3, k: 'mcq', tag: 'Concept', source: '2022 FALL Exam 2 Q17',
    q: 'Which single change to the segment would make it print x = 100?',
    code: 'int x = 10;\n\nif (x >= 10 || x < 0)\n{\n  x = x * 11;\n}\nif (x > 100 && x % 2)\n{\n  x = x - 10;\n}\nprintf("x = %d\\n", x);',
    c: ['Change the second condition to x > 100 && x % 2 == 0', 'Change the first condition to x > 10 || x < 0', 'Change the second condition to x > 110 && x % 2 == 0', 'None of the above.'], a: 0,
    why: 'With x % 2 == 0, the second test becomes 110 > 100 && 1, which is true, so x becomes 100. Changing the first condition to x > 10 leaves x at 10. x > 110 is false for 110, so x stays 110.',
    hints: ['After the first if, x is 110. What must the second if do?', 'Try each change on its own.', 'Is 110 > 110?'] });
  add({ id: 'c5-bxd-026', chapter: 5, t: 2, k: 'mcq', tag: 'Concept', source: '2024 SPRING Final Q13',
    q: 'Which statement about the switch construct is FALSE?',
    c: ['Stacking case 1: case 2: lets two values share one block of statements.', 'Each case label stands for an integral value the control expression might produce.', 'Two labels with the same value in one switch, such as case 4: and case 2 + 2:, cause a compile-time error.', 'None of the above.'], a: 3,
    why: 'All three are true. Stacked labels share actions, labels are integral constants, and duplicate label values (even written differently) are a compile error.',
    hints: ['Is each statement correct?', 'Does case 2 + 2 have the same value as case 4?', 'If none is false, choose None of the above.'] });
  add({ id: 'c5-bxd-027', chapter: 5, t: 4, k: 'mcq', tag: 'Trace', source: '2024 SPRING Final Q13',
    q: 'Notice where default is placed and which cases have break. What does this segment print?',
    code: 'int k;\nint total = 0;\n\nfor (k = 1; k <= 4; k++)\n{\n  switch (k % 3)\n  {\n    default: total += 100;\n    case 1:  total += 10;\n             break;\n    case 2:  total += 1;\n  }\n}\nprintf("total: %d\\n", total);',
    c: ['total: 121', 'total: 131', 'total: 231', 'None of the above.'], a: 1,
    why: 'k = 1: k % 3 is 1, add 10 (10). k = 2: case 2 adds 1 (11). k = 3: k % 3 is 0, no case matches, so default adds 100 and falls into case 1, adding 10 (121). k = 4: k % 3 is 1, add 10 (131).',
    hints: ['default runs only when no case matches - its position does not matter for that.', 'After default, is there a break?', 'Work out k % 3 for k = 1, 2, 3, 4.'] });
  add({ id: 'c5-bxd-028', chapter: 5, t: 3, k: 'mcq', tag: 'Concept', source: '2024 SPRING Final Q17',
    q: 'Which of these expressions is a complement of the one shown?',
    code: 'p % 4 != 0 && (q > 7 || !(r % 2 == 0))',
    c: ['!(p % 4) || q <= 7 && !(r % 2)', 'p % 4 == 0 && q <= 7 || r % 2 != 0', '!(p % 4) && (q <= 7 || r % 2)', 'More than one of the above.'], a: 0,
    why: 'The complement is p % 4 == 0 || (q <= 7 && r % 2 == 0). Since && binds tighter than ||, the parentheses can go, and x == 0 can be written !x: !(p % 4) || q <= 7 && !(r % 2). Choices 2 and 3 swap the wrong operators.',
    hints: ['Complement the outer && first: it becomes ||.', 'Then complement the inner || and the !(...) part.', '!(r % 2 == 0) is r % 2 != 0; what is its complement?'] });
  add({ id: 'c5-bxd-029', chapter: 5, t: 3, k: 'mcq', tag: 'Trace', source: '2024 SPRING Final Q19',
    q: 'What does this segment print?',
    code: 'int a = 2;\nint b = 5;\nint z = 2;\n\nz += (a < b) < b;\nz *= (b > a) + (a == 2) * 10;\nz -= !a || b;\nprintf("z: %d\\n", z);',
    c: ['z: 21', 'z: 28', 'z: 32', 'None of the above.'], a: 2,
    why: '(a < b) is 1, and then 1 < b (1 < 5) is 1 - not the maths reading 2 < 5 < 5 - so z becomes 3. Next (b > a) + (a == 2) * 10 is 1 + 10 = 11, so z becomes 33. Finally !a || b: !a is 0 and b is 5 (true), so the expression is 1 and z becomes 32.',
    hints: ['A relational result is 0 or 1 - then compare that with b.', 'Do * before + inside the second statement.', 'Does !a || b produce 5, or 1?'] });
  add({ id: 'c5-bxd-030', chapter: 5, t: 3, k: 'mcq', tag: 'Concept', source: '2025 SPRING Exam 2 Q8',
    q: 'Which expression is a complement of the one shown?',
    code: 's != 0 || t >= 2 && u < 9',
    c: ['s == 0 && t < 2 || u >= 9', '!s && (t < 2 || u >= 9)', 's == 0 || t < 2 && u >= 9', 'None of the above.'], a: 1,
    why: 'The original is s != 0 || (t >= 2 && u < 9). Its complement is s == 0 && (t < 2 || u >= 9), and s == 0 can be written !s. Choice 1 drops the parentheses, so && grabs t < 2 first.',
    hints: ['Mark the && group in the original first.', 'Swap || and && and negate every relation.', 'Keep the parentheses that protect the inner group.'] });
  add({ id: 'c5-bxd-031', chapter: 5, t: 2, k: 'mcq', tag: 'Concept', source: '2025 SPRING Exam 2 Q18',
    q: 'What must be present in the code for a dangling-else error to be possible?',
    c: ['A switch statement without a default label', 'One if statement nested inside another, with only one else written', 'A condition that uses negative logic, such as !done', 'None of the above.'], a: 1,
    why: 'A dangling else happens when an inner if sits inside an outer if and a single else could belong to either. C attaches it to the nearest unmatched if. Without nesting there is no ambiguity.',
    hints: ['"Dangling" means it is unclear which if the else belongs to.', 'How many ifs are needed for that question to arise?', 'One must be inside the other.'] });
  add({ id: 'c5-bxd-032', chapter: 5, t: 2, k: 'mcq', tag: 'Concept', source: '2025 SPRING Exam 2 Q19',
    q: 'Which statement about the conditional operator ?: is TRUE?',
    c: ['Its false part may be left out, as in x > 0 ? y;', 'It produces a value, so it can be used on the right side of an assignment, as in max = a > b ? a : b;', 'Each of its parts may contain a block of several statements in braces.', 'None of the above.'], a: 1,
    why: 'A conditional expression is an expression: it yields a value, so it can be assigned. Both the true and false parts are required, and each must be an expression, not a block of statements.',
    hints: ['Is ?: a statement or an expression?', 'How many operands does ?: always need?', 'Can an expression contain braces and statements?'] });
  add({ id: 'c5-bxd-033', chapter: 5, t: 2, k: 'mcq', tag: 'Concept', source: '2025 SPRING Exam 2 Q22',
    q: 'Which statement about choosing a selection construct is FALSE?',
    c: ['An else-if chain is the natural choice when each branch covers a range of values, such as 90 to 100.', 'A switch works best when the control expression has a small set of specific results.', 'A switch that does not include a default label will not compile.', 'None of the above.'], a: 2,
    why: 'default is optional in a switch; if no case matches and there is no default, the switch simply does nothing. Ranges suit else-if, and a few exact values suit switch.',
    hints: ['Which construct handles ranges easily?', 'Is default required by the language?', 'What happens when no case matches and there is no default?'] });

  /* ---- Chapter 6 ---- */
  add({ id: 'c6-bxd-001', chapter: 6, t: 2, k: 'mcq', tag: 'Trace', source: '2022 SPRING Exam 2 Q1',
    q: 'What is printed after the loop finishes?',
    code: 'int i;\nint total = 0;\n\nfor (i = 3; i <= 15; i += 4)\n{\n  total += i * 2;\n}\nprintf("total: %d\\n", total);',
    c: ['total: 42', 'total: 72', 'total: 110', 'None of the above.'], a: 1,
    why: 'i takes the values 3, 7, 11 and 15 (15 <= 15 is true; 19 stops the loop). The sum is 36, doubled to 72. Stopping before 15 gives 42; running once more (19) gives 110.',
    hints: ['List every value of i that passes the test.', 'Is 15 <= 15?', 'Add the values, then double.'] });
  add({ id: 'c6-bxd-002', chapter: 6, t: 2, k: 'mcq', tag: 'Trace', source: '2022 SPRING Exam 2 Q2',
    q: 'This loop keeps only some of the digits. What does it print?',
    code: 'int n = 90817;\nint keep = 0;\nint place = 1;\nint d;\n\nwhile (n > 0)\n{\n  d = n % 10;\n  if (d % 2 == 1)\n  {\n    keep += d * place;\n    place *= 10;\n  }\n  n /= 10;\n}\nprintf("n: %d\\n", keep);',
    c: ['n: 719', 'n: 917', 'n: 9817', 'None of the above.'], a: 1,
    why: 'Digits come off the right end: 7 (odd, keep = 7), 1 (odd, keep = 17), 8 (even), 0 (even), 9 (odd, keep = 917). Each kept digit goes one place further left, so the original order of the odd digits is preserved.',
    hints: ['n % 10 takes the rightmost digit.', 'Which digits are odd?', 'place grows by 10 only when a digit is kept.'] });
  add({ id: 'c6-bxd-003', chapter: 6, t: 2, k: 'mcq', tag: 'Trace', source: '2022 SPRING Exam 2 Q3',
    q: 'What does this segment print?',
    code: 'int x = 20;\nint total = 0;\n\ndo\n{\n  total++;\n  x -= 6;\n} while (x > 0);\nprintf("total: %d\\n", total);',
    c: ['total: 3', 'total: 4', 'total: 5', 'None of the above.'], a: 1,
    why: 'x goes 20 -> 14 -> 8 -> 2 -> -4. The body runs four times; only after the fourth pass is x no longer positive.',
    hints: ['A do-while runs the body before testing.', 'Write x after each pass.', 'Is 2 > 0?'] });
  add({ id: 'c6-bxd-004', chapter: 6, t: 2, k: 'mcq', tag: 'Trace', source: '2022 SPRING Exam 2 Q4',
    q: 'What is displayed?',
    code: 'int n = 17;\n\nwhile (n >= 5)\n{\n  n -= 5;\n}\nprintf("n: %d\\n", n);',
    c: ['n: 2', 'n: -3', 'n: 7', 'None of the above.'], a: 0,
    why: 'n goes 17 -> 12 -> 7 -> 2. At 2 the test 2 >= 5 is false, so the loop ends before n can go negative.',
    hints: ['The test happens before each subtraction.', 'Write the value of n after each pass.', 'Is 2 >= 5?'] });
  add({ id: 'c6-bxd-005', chapter: 6, t: 3, k: 'mcq', tag: 'Trace', source: '2022 SPRING Exam 2 Q5',
    q: 'The inner loop\'s starting value depends on the outer counter. What is printed?',
    code: 'int i;\nint j;\nint total = 0;\n\nfor (i = 1; i <= 3; i++)\n{\n  for (j = i; j <= 4; j++)\n  {\n    total += j;\n  }\n}\nprintf("total: %d\\n", total);',
    c: ['total: 30', 'total: 19', 'total: 26', 'None of the above.'], a: 2,
    why: 'i = 1 adds 1+2+3+4 = 10, i = 2 adds 2+3+4 = 9, i = 3 adds 3+4 = 7. Total 26. Starting j at 1 every time would give 30.',
    hints: ['Where does j start on each outer pass?', 'Add the inner sums separately.', '10 + 9 + 7.'] });
  add({ id: 'c6-bxd-006', chapter: 6, t: 3, k: 'mcq', tag: 'Trace', source: '2022 SPRING Exam 2 Q6',
    q: 'How many passes does the loop make? The segment prints the count.',
    code: 'int n = 1;\nint count = 0;\n\nwhile (n < 300)\n{\n  n *= 3;\n  count++;\n}\nprintf("count: %d\\n", count);',
    c: ['count: 5', 'count: 6', 'count: 7', 'None of the above.'], a: 1,
    why: 'n becomes 3, 9, 27, 81, 243, 729. The test 243 < 300 is still true, so the sixth pass happens and produces 729, which ends the loop. count is 6.',
    hints: ['Write n after every pass.', 'The test uses the value BEFORE multiplying.', 'Is 243 < 300?'] });
  add({ id: 'c6-bxd-007', chapter: 6, t: 3, k: 'mcq', tag: 'Trace', source: '2022 SPRING Exam 2 Q7',
    q: 'What does this segment print?',
    code: 'int k;\nint total = 0;\n\nfor (k = 10; k > 0; k -= 3)\n{\n  if (k % 2 == 0)\n  {\n    total += k * k;\n  }\n  else\n  {\n    total -= k;\n  }\n}\nprintf("total: %d\\n", total);',
    c: ['total: 116', 'total: 112', 'total: 108', 'None of the above.'], a: 2,
    why: 'k takes 10, 7, 4, 1. Even values add their square: +100, +16. Odd values subtract: -7, -1. 100 - 7 + 16 - 1 = 108.',
    hints: ['List k: start at 10 and subtract 3 while k > 0.', 'Even k adds k*k; odd k subtracts k.', 'Does k = -2 pass the test?'] });
  add({ id: 'c6-bxd-008', chapter: 6, t: 3, k: 'mcq', tag: 'Trace', source: '2022 SPRING Exam 2 Q8',
    q: 'What is the final value of sum?',
    code: 'int a = 1;\nint b = 1;\nint sum = 2;\nint next;\n\nnext = a + b;\nwhile (next < 30)\n{\n  sum += next;\n  a = b;\n  b = next;\n  next = a + b;\n}\nprintf("sum: %d\\n", sum);',
    c: ['sum: 33', 'sum: 54', 'sum: 88', 'None of the above.'], a: 1,
    why: 'next takes 2, 3, 5, 8, 13, 21 (each added), then 34 stops the loop. sum = 2 + 2 + 3 + 5 + 8 + 13 + 21 = 54.',
    hints: ['Each new term is the sum of the previous two.', 'List the values of next until one reaches 30.', 'Do not forget the starting sum of 2.'] });
  add({ id: 'c6-bxd-009', chapter: 6, t: 3, k: 'mcq', tag: 'Trace', source: '2022 SPRING Exam 2 Q9',
    q: 'The increment is inside the loop condition. What is printed?',
    code: 'int i = 0;\nint total = 0;\n\nwhile (i++ < 5)\n{\n  total += i * 10;\n}\nprintf("total: %d\\n", total);',
    c: ['total: 100', 'total: 150', 'total: 210', 'None of the above.'], a: 1,
    why: 'The test compares the OLD value of i (0..4) with 5, but by the time the body runs i has already been increased, so the body sees 1, 2, 3, 4, 5. 10 + 20 + 30 + 40 + 50 = 150.',
    hints: ['i++ < 5 compares the old value, then increases i.', 'Which values of i does the body see?', 'The test with old value 5 fails.'] });
  add({ id: 'c6-bxd-010', chapter: 6, t: 4, k: 'mcq', tag: 'Trace', source: '2022 SPRING Exam 2 Q9',
    q: 'A do-while is nested inside a for loop. What is printed?',
    code: 'int i;\nint j;\nint total = 0;\n\nfor (i = 4; i > 0; i -= 2)\n{\n  j = i;\n  do\n  {\n    total += i * j;\n    j--;\n  } while (j > i / 2);\n}\nprintf("total: %d\\n", total);',
    c: ['total: 36', 'total: 30', 'total: 32', 'None of the above.'], a: 2,
    why: 'i = 4: j = 4 adds 16, j becomes 3 (3 > 2, continue), adds 12, j becomes 2 (2 > 2 is false). i = 2: j = 2 adds 4, j becomes 1 (1 > 1 is false). 16 + 12 + 4 = 32.',
    hints: ['The outer loop runs for i = 4 and i = 2.', 'The do-while always runs at least once.', 'i / 2 is integer division.'] });
  add({ id: 'c6-bxd-011', chapter: 6, t: 3, k: 'mcq', tag: 'Concept', source: '2022 SPRING Exam 2 Q10',
    q: 'Which statement about this program is TRUE?',
    code: '#include <stdio.h>\n\nint main(void)\n{\n  int n;\n  int digits = 0;\n  int sum = 0;\n\n  do\n  {\n    printf("Enter a positive integer: ");\n    scanf("%d", &n);\n  } while (n <= 0);\n\n  while (n > 0)\n  {\n    sum += n % 10;\n    n /= 10;\n    digits++;\n  }\n  printf("\\n%d digits, sum %d\\n", digits, sum);\n  return 0;\n}',
    c: ['The do-while loop is a counter-controlled process.', 'The body of the while loop runs once for each digit of the accepted value.', 'The program uses nested repetition.', 'None of the above.'], a: 1,
    why: 'Each pass of the while loop removes one digit (n /= 10), so it runs once per digit. The do-while repeats until a valid value is entered - an event, not a count - and the two loops follow one another rather than being nested.',
    hints: ['What ends the do-while: a count or an event?', 'Is one loop inside the other?', 'What does n /= 10 do to the number of digits?'] });
  add({ id: 'c6-bxd-012', chapter: 6, t: 2, k: 'mcq', tag: 'Concept', source: '2022 SPRING Exam 2 Q17',
    q: 'According to the course standards, which statement about for loops is FALSE?',
    c: ['When the number of iterations is known before the loop starts, the course expects a for loop.', 'A for header that leaves out its update expression does not meet the course standard.', 'Declaring the counter in the header, as in for (int k = 0; k < n; k++), meets the course rule that all declarations come first.', 'None of the above.'], a: 2,
    why: 'The course requires every variable to be declared in the local declaration section, before the executable statements. Declaring k inside the for header breaks that rule, even though C99 and later allow it. The other two are course expectations.',
    hints: ['Where must all declarations appear under course standards?', 'Is a for header part of the executable statements?', 'Legal C is not always course standard.'] });
  add({ id: 'c6-bxd-013', chapter: 6, t: 2, k: 'mcq', tag: 'Concept', source: '2022 SPRING Exam 2 Q22',
    q: 'Which statement about loops is FALSE?',
    c: ['A while loop\'s control variable must already hold a value before the condition is first tested.', 'In a do-while loop that iterates 5 times, the condition is evaluated 6 times.', 'An update such as while (--n > 0) can be part of a pretest loop\'s condition.', 'None of the above.'], a: 1,
    why: 'In a post-test loop the condition is checked once at the end of every pass, so 5 iterations mean exactly 5 tests (the fifth one is false). The "one extra test" rule belongs to pretest loops.',
    hints: ['Where is the test in a do-while?', 'Count tests for a do-while that runs once.', 'Which kind of loop tests one more time than it iterates?'] });
  add({ id: 'c6-bxd-014', chapter: 6, t: 2, k: 'mcq', tag: 'Concept', source: '2025 SPRING Exam 2 Q15',
    q: 'Which statement about pretest loops (while and for) is FALSE?',
    c: ['A pretest loop can finish without running its body even once.', 'In a for loop that iterates 4 times, the condition is checked 5 times.', 'A for loop runs its update expression once before the condition is tested for the first time.', 'None of the above.'], a: 2,
    why: 'A for loop runs: initialization, test, body, update, test, body, update ... The update never comes before the first test. The other statements are true.',
    hints: ['Write out the order of the three parts of a for header.', 'What runs first: the initialization or the update?', 'A loop that iterates n times tests n + 1 times.'] });
  add({ id: 'c6-bxd-015', chapter: 6, t: 3, k: 'mcq', tag: 'Concept', source: '2022 SPRING Exam 2 Q23',
    q: 'Which of the following may show that a pretest loop was chosen where a post-test loop would fit better?',
    c: ['I: The same prompt and scanf appear just before the loop and again inside its body.', 'II: The control variable is given a made-up value only so that the first test is sure to pass.', 'III: The control expression uses both && and ||.', 'Both I and II.'], a: 3,
    why: 'Repeating the body\'s code before the loop (I) or forcing the first test to pass with a dummy value (II) both mean the body must run at least once - the job of a do-while. A compound condition (III) says nothing about which loop to use.',
    hints: ['Which loop guarantees one pass?', 'Why would someone copy the loop body above the loop?', 'Does the number of logical operators matter here?'] });
  add({ id: 'c6-bxd-016', chapter: 6, t: 4, k: 'mcq', tag: 'Concept', source: '2022 SPRING Exam 2 Q23',
    q: 'What does this input loop suggest about the choice of looping construct?',
    code: 'int score;\n\nscore = -1;\nwhile (score < 0 || score > 100)\n{\n  printf("Score: ");\n  scanf("%d", &score);\n}',
    c: ['The made-up starting value -1 suggests a do-while loop would be the better construct.', 'A for loop should replace it, because the number of iterations is known in advance.', 'The compound condition means the loop should be split into two separate loops.', 'None of the above.'], a: 0,
    why: 'score is set to -1 only to force the first test to pass. The prompt must always run at least once, which is exactly what a post-test (do-while) loop provides. The number of passes depends on the user, so a for loop does not fit.',
    hints: ['Why is score set to -1 before the loop?', 'How many times must the prompt run at minimum?', 'Which loop tests after the body?'] });
  add({ id: 'c6-bxd-017', chapter: 6, t: 3, k: 'mcq', tag: 'Trace', source: '2022 FALL Exam 2 Q13',
    q: 'The loop compares the last two digits on each pass. What is printed?',
    code: 'int x = 3608;\nint y = 0;\n\nwhile (x > 9)\n{\n  if (x % 10 > x / 10 % 10)\n  {\n    y++;\n  }\n  x /= 10;\n}\nprintf("y: %d\\n", y);',
    c: ['y: 1', 'y: 2', 'y: 3', 'None of the above.'], a: 1,
    why: 'x = 3608: 8 > 0, y = 1. x = 360: 0 > 6 is false. x = 36: 6 > 3, y = 2. x = 3 fails x > 9. y is 2.',
    hints: ['x / 10 % 10 is the second digit from the right.', 'Write x on every pass.', 'Does the loop run when x is a single digit?'] });
  add({ id: 'c6-bxd-018', chapter: 6, t: 3, k: 'mcq', tag: 'Concept', source: '2022 FALL Exam 2 Q14',
    q: 'For the segment shown, how many times in total is the loop control expression x > 9 evaluated?',
    code: 'int x = 3608;\nint y = 0;\n\nwhile (x > 9)\n{\n  if (x % 10 > x / 10 % 10)\n  {\n    y++;\n  }\n  x /= 10;\n}\nprintf("y: %d\\n", y);',
    c: ['Three times.', 'Four times.', 'Five times.', 'None of the above.'], a: 1,
    why: 'It is tested with x = 3608, 360 and 36 (all true, three passes) and once more with x = 3 (false). A pretest loop that iterates 3 times tests its condition 4 times.',
    hints: ['How many times does the body run?', 'A pretest loop tests once more than it iterates.', 'List the values of x at each test.'] });
  add({ id: 'c6-bxd-019', chapter: 6, t: 3, k: 'mcq', tag: 'Trace', source: '2022 FALL Exam 2 Q15',
    q: 'Suppose x starts at 13579 instead. What is printed?',
    code: 'int x = 13579;\nint y = 0;\n\nwhile (x > 9)\n{\n  if (x % 10 > x / 10 % 10)\n  {\n    y++;\n  }\n  x /= 10;\n}\nprintf("y: %d\\n", y);',
    c: ['y: 3', 'y: 4', 'y: 5', 'None of the above.'], a: 1,
    why: 'Pairs from the right: 9 > 7, 7 > 5, 5 > 3, 3 > 1 - all true, so y counts 4. The loop stops when x is 1, a single digit; there are only four adjacent pairs in a five-digit number.',
    hints: ['How many adjacent digit pairs does a five-digit number have?', 'Is each right digit bigger than its left neighbour?', 'The loop ends when one digit is left.'] });
  add({ id: 'c6-bxd-020', chapter: 6, t: 3, k: 'mcq', tag: 'Trace', source: '2022 FALL Exam 2 Q31',
    q: 'Which line does the for loop in main never print?',
    code: '#include <stdio.h>\n\nint calcVals(int d);\n\nint main(void)\n{\n  int n;\n  int total = 0;\n\n  for (n = 4072; n > 0; n /= 10)\n  {\n    printf("n: %d\\n", n);\n    total += calcVals(n % 10);\n  }\n  printf("grand: %d\\n", total);\n  return 0;\n}\n\nint calcVals(int d)\n{\n  int k;\n  int sum = 0;\n\n  for (k = 1; k <= d; k += 2)\n  {\n    sum += k;\n    printf("sum: %d\\n", sum);\n  }\n  return sum;\n}',
    c: ['n: 407', 'n: 4', 'n: 0', 'None of the above.'], a: 2,
    why: 'n takes 4072, 407, 40 and 4. After 4 / 10 gives 0, the test n > 0 fails before the body runs again, so n: 0 is never printed.',
    hints: ['Write n after each n /= 10.', 'When is the test checked relative to the printf?', 'Does the body run once n is 0?'] });
  add({ id: 'c6-bxd-021', chapter: 6, t: 3, k: 'mcq', tag: 'Trace', source: '2022 FALL Exam 2 Q32',
    q: 'Which line is never printed from inside calcVals?',
    code: '#include <stdio.h>\n\nint calcVals(int d);\n\nint main(void)\n{\n  int n;\n  int total = 0;\n\n  for (n = 4072; n > 0; n /= 10)\n  {\n    printf("n: %d\\n", n);\n    total += calcVals(n % 10);\n  }\n  printf("grand: %d\\n", total);\n  return 0;\n}\n\nint calcVals(int d)\n{\n  int k;\n  int sum = 0;\n\n  for (k = 1; k <= d; k += 2)\n  {\n    sum += k;\n    printf("sum: %d\\n", sum);\n  }\n  return sum;\n}',
    c: ['sum: 16', 'sum: 0', 'sum: 4', 'None of the above.'], a: 1,
    why: 'calcVals is called with the digits 2, 7, 0 and 4. For d = 2 it prints sum: 1; for 7 it prints 1, 4, 9, 16; for 0 the loop never runs, so nothing is printed; for 4 it prints 1 and 4. The printf comes after sum += k, so sum: 0 never appears.',
    hints: ['Which digits does main pass in?', 'For d = 0, does the loop body run?', 'Is the printf before or after the addition?'] });
  add({ id: 'c6-bxd-022', chapter: 6, t: 3, k: 'mcq', tag: 'Trace', source: '2022 FALL Exam 2 Q33',
    q: 'What is the last line printed by the program?',
    code: '#include <stdio.h>\n\nint calcVals(int d);\n\nint main(void)\n{\n  int n;\n  int total = 0;\n\n  for (n = 4072; n > 0; n /= 10)\n  {\n    printf("n: %d\\n", n);\n    total += calcVals(n % 10);\n  }\n  printf("grand: %d\\n", total);\n  return 0;\n}\n\nint calcVals(int d)\n{\n  int k;\n  int sum = 0;\n\n  for (k = 1; k <= d; k += 2)\n  {\n    sum += k;\n    printf("sum: %d\\n", sum);\n  }\n  return sum;\n}',
    c: ['grand: 14', 'grand: 21', 'grand: 22', 'None of the above.'], a: 1,
    why: 'calcVals returns the sum of the odd numbers up to d: d = 2 gives 1, d = 7 gives 1+3+5+7 = 16, d = 0 gives 0, d = 4 gives 1+3 = 4. 1 + 16 + 0 + 4 = 21. Stopping at k < d for 7 would wrongly give 14.',
    hints: ['List the digits main passes: 2, 7, 0, 4.', 'Is 7 included when k <= d?', 'Add the four returned sums.'] });
  add({ id: 'c6-bxd-023', chapter: 6, t: 2, k: 'mcq', tag: 'Concept', source: '2022 FALL Exam 2 Q34',
    q: 'Which statement about this program is TRUE?',
    code: '#include <stdio.h>\n\nint calcVals(int d);\n\nint main(void)\n{\n  int n;\n  int total = 0;\n\n  for (n = 4072; n > 0; n /= 10)\n  {\n    printf("n: %d\\n", n);\n    total += calcVals(n % 10);\n  }\n  printf("grand: %d\\n", total);\n  return 0;\n}\n\nint calcVals(int d)\n{\n  int k;\n  int sum = 0;\n\n  for (k = 1; k <= d; k += 2)\n  {\n    sum += k;\n    printf("sum: %d\\n", sum);\n  }\n  return sum;\n}',
    c: ['The logic uses nested repetition, since every pass of main\'s loop runs the loop inside calcVals.', 'The loop in calcVals is event-controlled because its update adds 2 instead of 1.', 'The loop in main always runs exactly 4 times, whatever value n starts with.', 'None of the above.'], a: 0,
    why: 'Each iteration of main\'s loop calls calcVals, whose loop runs completely inside that iteration - nested repetition through a function call. The step size does not make a loop event-controlled, and the number of passes in main depends on how many digits n has.',
    hints: ['Does one loop run inside each pass of the other?', 'What makes a loop counter-controlled vs event-controlled?', 'What if n started at 25?'] });
  add({ id: 'c6-bxd-024', chapter: 6, t: 2, k: 'mcq', tag: 'Concept', source: '2025 SPRING Exam 2 Q17',
    q: 'Which statement about the course\'s expectations for input validation is FALSE?',
    c: ['An if statement alone is not enough, because it gives the user only a fixed number of chances to enter good data.', 'The course expects you to detect when the user types letters where a number was requested.', 'The validation loop usually belongs in the same function as the prompt and the scanf call.', 'None of the above.'], a: 1,
    why: 'In this course you validate the RANGE of values (for example, a positive integer), not the data type that was typed. Validation needs a loop, and it normally sits with the prompt and scanf.',
    hints: ['What kind of checking does the course require: range or type?', 'Why is a loop needed instead of a single if?', 'Where does the scanf for that value live?'] });

  /* ---- Chapter 8 ---- */
  add({ id: 'c8-bxd-001', chapter: 8, t: 3, k: 'mcq', tag: 'Trace', source: '2022 SPRING Exam 2 Q26',
    q: 'What does the first printf display?',
    code: 'int data[6] = {4, 9, 1, 7, 3, 8};\nint k;\nint y = 0;\nint z = 0;\n\nfor (k = 1; k < 6; k++)\n{\n  if (data[k] > data[k - 1])\n  {\n    y++;\n  }\n  z += data[k] * (k % 2);\n}\nprintf("y: %d\\n", y);\nprintf("z: %d\\n", z);',
    c: ['y: 2', 'y: 3', 'y: 4', 'None of the above.'], a: 1,
    why: 'y counts the places where an element is larger than the one before it: 9 > 4, 7 > 1 and 8 > 3. The pairs 1 vs 9 and 3 vs 7 do not count. y is 3.',
    hints: ['k starts at 1, so the first comparison is data[1] with data[0].', 'Compare each neighbouring pair once.', 'How many times does a value go UP?'] });
  add({ id: 'c8-bxd-002', chapter: 8, t: 3, k: 'mcq', tag: 'Trace', source: '2022 SPRING Exam 2 Q27',
    q: 'What is the second line of output?',
    code: 'int data[6] = {4, 9, 1, 7, 3, 8};\nint k;\nint y = 0;\nint z = 0;\n\nfor (k = 1; k < 6; k++)\n{\n  if (data[k] > data[k - 1])\n  {\n    y++;\n  }\n  z += data[k] * (k % 2);\n}\nprintf("y: %d\\n", y);\nprintf("z: %d\\n", z);',
    c: ['z: 8', 'z: 32', 'z: 24', 'None of the above.'], a: 2,
    why: 'k % 2 is 1 for odd k and 0 for even k, so only data[1], data[3] and data[5] are added: 9 + 7 + 8 = 24. Adding the even indexes instead would give 8.',
    hints: ['What is k % 2 for k = 1 through 5?', 'Multiplying by 0 adds nothing.', 'Which indexes are odd?'] });
  add({ id: 'c8-bxd-003', chapter: 8, t: 2, k: 'mcq', tag: 'Concept', source: '2022 SPRING Exam 2 Q28',
    q: 'The array scores has 8 elements. Which loop header visits every element exactly once?',
    c: ['for (k = 1; k <= 8; k++)', 'for (k = 0; k <= 8; k++)', 'for (k = 7; k >= 0; k--)', 'None of the above.'], a: 2,
    why: 'Valid indexes are 0 through 7. Counting down from 7 to 0 visits each of them once. The first header skips index 0 and uses the invalid index 8; the second also reaches index 8.',
    hints: ['What are the first and last valid indexes of an 8-element array?', 'A loop may count down as well as up.', 'Does any header touch index 8?'] });
  add({ id: 'c8-bxd-004', chapter: 8, t: 3, k: 'mcq', tag: 'Concept', source: '2022 SPRING Exam 2 Q29',
    q: 'Given the declaration double temps[4];, which of the following correctly does what it describes?',
    c: ['scanf("%lf", temps); reads all four values in one call.', 'temps == other compares whether two double arrays hold the same four values.', 'temps[4] = 0.0; appends one more value after the last one.', 'None of the above.'], a: 3,
    why: 'scanf with one %lf reads one value (into temps[0]). Comparing array names compares their addresses, not their contents. temps[4] is past the end of the array - arrays never grow. Element-by-element loops are needed for all three jobs.',
    hints: ['How many values does one %lf read?', 'What does an array name evaluate to?', 'Can a fixed-length array change size?'] });
  add({ id: 'c8-bxd-005', chapter: 8, t: 4, k: 'mcq', tag: 'Concept', source: '2022 SPRING Exam 2 Q29',
    q: 'src and dst are both int arrays of size 5. Which code copies every value of src into dst?',
    c: ['dst = src;', 'for (k = 1; k <= 5; k++) dst[k] = src[k];', 'for (k = 0; k < 5; k++) dst[k] = src[k];', 'None of the above.'], a: 2,
    why: 'Arrays cannot be assigned as a whole, so dst = src; does not compile. The loop from 1 to 5 skips index 0 and uses the invalid index 5. Copying index 0 through 4 one element at a time is correct.',
    hints: ['Can you assign one array name to another?', 'Which indexes exist in a size-5 array?', 'Copy element by element.'] });
  add({ id: 'c8-bxd-006', chapter: 8, t: 2, k: 'mcq', tag: 'Concept', source: '2022 SPRING Exam 2 Q30',
    q: 'Which statement about arrays in C is FALSE?',
    c: ['Element k + 1 is stored in memory immediately after element k.', 'Every element of one array has the same data type.', 'Passing an array\'s name to a function gives the function both the array\'s address and how many elements it has.', 'None of the above.'], a: 2,
    why: 'An array name passed to a function is just the address of element 0; the size is not passed along. That is why functions that process arrays also take the number of elements as a separate parameter.',
    hints: ['What does a function actually receive when you pass an array name?', 'Why do array functions usually take a size parameter?', 'Contiguous storage and one type are both true.'] });
  add({ id: 'c8-bxd-007', chapter: 8, t: 3, k: 'mcq', tag: 'Concept', source: '2022 SPRING Exam 2 Q31',
    q: 'The function sumAll receives a whole int array as its only parameter and returns nothing. Which declaration below would the compiler NOT accept?',
    c: ['void sumAll(int vals[]);', 'void sumAll(int vals[10]);', 'void sumAll(int *);', 'None of the above.'], a: 3,
    why: 'All three are valid. An array parameter may be written with empty brackets, with a size (which the compiler ignores), or as a pointer; a prototype may also leave out the parameter name.',
    hints: ['Does a number inside the brackets of a parameter matter?', 'Is int vals[] the same as int *vals for a parameter?', 'Prototypes may omit parameter names.'] });
  add({ id: 'c8-bxd-008', chapter: 8, t: 4, k: 'mcq', tag: 'Concept', source: '2022 SPRING Exam 2 Q31',
    q: 'A void function takes one int array. Which prototype for it is rejected by the compiler?',
    c: ['void sumAll(int list[]);', 'void sumAll(int []list);', 'void sumAll(int[50]);', 'None of the above.'], a: 1,
    why: 'The brackets go after the parameter name: int list[]. Writing int []list is a syntax error. int[50] without a name is a legal prototype (the 50 is ignored).',
    hints: ['Where do the brackets go relative to the name?', 'Can a prototype leave out the name?', 'Is the size inside the brackets checked?'] });
  add({ id: 'c8-bxd-009', chapter: 8, t: 3, k: 'mcq', tag: 'Concept', source: '2022 SPRING Exam 2 Q32',
    q: 'main declares int scores[8]; and must pass the whole array to void show(int s[]);. Which call is correct?',
    c: ['show(int scores);', 'show(scores[0]);', 'show(scores);', 'None of the above.'], a: 2,
    why: 'To pass a whole array you write just its name, which gives the address of element 0. scores[0] is a single int, and types are never written in a call.',
    hints: ['What does the name scores by itself mean?', 'Is scores[0] an array or one int?', 'Do you write types in a function call?'] });
  add({ id: 'c8-bxd-010', chapter: 8, t: 4, k: 'mcq', tag: 'Concept', source: '2022 SPRING Exam 2 Q32',
    q: 'main declares int scores[8]; and must pass the whole array to void show(int s[]);. Which call is correct?',
    c: ['show(scores[]);', 'show(*scores);', 'show(&scores[0]);', 'None of the above.'], a: 2,
    why: '&scores[0] is the address of the first element - exactly the value the name scores evaluates to - so it passes the whole array. scores[] is not valid in an expression, and *scores is the int stored in element 0.',
    hints: ['What is the value of an array name?', 'What does *scores give you?', 'Address of element 0 = the array name.'] });
  add({ id: 'c8-bxd-011', chapter: 8, t: 3, k: 'mcq', tag: 'Trace', source: '2022 SPRING Exam 2 Q33',
    q: 'What does this program print?',
    code: '#include <stdio.h>\n\nvoid fill(int y[]);\n\nint main(void)\n{\n  int x[6] = {0};\n\n  fill(x);\n  printf("x[5]: %d\\n", x[5]);\n  return 0;\n}\n\nvoid fill(int y[])\n{\n  int k;\n\n  y[0] = 2;\n  for (k = 1; k < 6; k++)\n  {\n    y[k] = y[k - 1] * 2 + k;\n  }\n}',
    c: ['x[5]: 0', 'x[5]: 58', 'x[5]: 121', 'None of the above.'], a: 2,
    why: 'The function receives the address of x, so its changes are made in main\'s array. y[1] = 5, y[2] = 12, y[3] = 27, y[4] = 58, y[5] = 121. Thinking the array was copied gives 0; stopping one step early gives 58.',
    hints: ['Does fill change main\'s array or a copy?', 'Build the values one index at a time.', 'Each value is twice the previous plus the index.'] });
  add({ id: 'c8-bxd-012', chapter: 8, t: 3, k: 'mcq', tag: 'Concept', source: '2022 SPRING Exam 2 Q34',
    q: 'Inside a function: double w[4]; and double v[4] = {2.5, 1.0};. What can be said about w[3] and v[2]?',
    c: ['w[3] holds an unknown (garbage) value and v[2] is 0.0', 'Both w[3] and v[2] are 0.0', 'w[3] is 0.0 and v[2] is 1.0', 'None of the above.'], a: 0,
    why: 'A local array with no initializer is not initialized, so its elements hold unknown values. When an initializer list is shorter than the array, the remaining elements are set to zero - the last listed value is not repeated.',
    hints: ['Does a local array without an initializer get default values?', 'What happens to elements the initializer list does not reach?', 'Is the last initializer repeated?'] });
  add({ id: 'c8-bxd-013', chapter: 8, t: 4, k: 'mcq', tag: 'Trace', source: '2022 SPRING Exam 2 Q34',
    q: 'Only part of the array is listed in its initializer. What does this segment print?',
    code: 'int c[6] = {5, 4};\nint k;\nint s = 0;\n\nfor (k = 0; k < 6; k++)\n{\n  s += c[k] * (k + 1);\n}\nprintf("s: %d\\n", s);',
    c: ['s: 13', 's: 85', 'The output is unpredictable, because c[2] through c[5] were never given values.', 'None of the above.'], a: 0,
    why: 'Elements not covered by the initializer list are set to 0, so c is {5, 4, 0, 0, 0, 0}. s = 5*1 + 4*2 = 13. Repeating the last value 4 would give 85.',
    hints: ['With a partial initializer list, what are the other elements?', 'Is the output really unpredictable?', 'Only the first two terms are nonzero.'] });
  add({ id: 'c8-bxd-014', chapter: 8, t: 3, k: 'mcq', tag: 'Trace', source: '2022 FALL Exam 2 Q18',
    q: 'Each element is updated using its already-updated neighbour. What is printed?',
    code: 'int x[5] = {2, 5, 1, 4, 3};\nint k;\n\nfor (k = 1; k < 5; k++)\n{\n  x[k] += x[k - 1];\n}\nprintf("x[3] = %d\\n", x[3]);',
    c: ['x[3] = 5', 'x[3] = 12', 'x[3] = 8', 'None of the above.'], a: 1,
    why: 'Each pass adds the NEW value of the previous element, building running totals: x becomes {2, 7, 8, 12, 15}. x[3] = 4 + 8 = 12. Using the original x[2] (1) would give 5.',
    hints: ['When k = 3, has x[2] already changed?', 'Write the whole array after each pass.', 'This builds a running total.'] });
  add({ id: 'c8-bxd-015', chapter: 8, t: 4, k: 'mcq', tag: 'Trace', source: '2022 FALL Exam 2 Q18',
    q: 'The programmer meant to shift every value one place to the right. What does the segment actually print?',
    code: 'int x[5] = {10, 20, 30, 40, 50};\nint k;\n\nfor (k = 1; k < 5; k++)\n{\n  x[k] = x[k - 1];\n}\nprintf("x[3] = %d\\n", x[3]);',
    c: ['x[3] = 30', 'x[3] = 40', 'x[3] = 10', 'None of the above.'], a: 2,
    why: 'Going left to right, x[1] becomes 10, then x[2] copies the NEW x[1] (10), and so on - every element becomes 10. A right shift has to run from the end backward (k = 4 down to 1) to keep the old values.',
    hints: ['After k = 1, what is in x[1]?', 'When k = 2, which value is copied?', 'Which direction should a right shift loop run?'] });
  add({ id: 'c8-bxd-016', chapter: 8, t: 3, k: 'mcq', tag: 'Trace', source: '2022 FALL Exam 2 Q19',
    q: 'Pay attention to operator precedence. What is printed?',
    code: 'int x[8];\nint k;\n\nfor (k = 0; k < 8; k++)\n{\n  x[k] = k * k % 5;\n}\nprintf("x[6] = %d\\n", x[6]);',
    c: ['x[6] = 6', 'x[6] = 36', 'x[6] = 1', 'None of the above.'], a: 2,
    why: '* and % have the same precedence and group left to right, so k * k % 5 is (k * k) % 5. For k = 6: 36 % 5 = 1. Reading it as k * (k % 5) would give 6.',
    hints: ['* and % have equal precedence - which way do they group?', 'Compute 6 * 6 first.', 'What is 36 % 5?'] });
  add({ id: 'c8-bxd-017', chapter: 8, t: 4, k: 'mcq', tag: 'Trace', source: '2022 FALL Exam 2 Q19',
    q: 'Two loops run one after the other on the same array. What is printed?',
    code: 'int x[7] = {0};\nint k;\n\nfor (k = 0; k < 7; k += 2)\n{\n  x[k] = k + 1;\n}\nfor (k = 1; k < 7; k++)\n{\n  x[k] += x[k - 1];\n}\nprintf("x[6] = %d\\n", x[6]);',
    c: ['x[6] = 7', 'x[6] = 12', 'x[6] = 16', 'None of the above.'], a: 2,
    why: 'After the first loop x is {1, 0, 3, 0, 5, 0, 7}. The second loop builds running totals: {1, 1, 4, 4, 9, 9, 16}. x[6] is 16. Forgetting that x[5] had already changed gives 7.',
    hints: ['Which indexes does the first loop set?', 'Write the array after the first loop.', 'The second loop uses already-updated neighbours.'] });
  add({ id: 'c8-bxd-018', chapter: 8, t: 2, k: 'mcq', tag: 'Concept', source: '2022 FALL Exam 2 Q21',
    q: 'A loop accidentally stores a value in arr[10], where arr was declared int arr[10];. Which of the following can NOT happen?',
    c: ['The program seems to run correctly.', 'Another variable\'s value is changed without warning.', 'C automatically enlarges arr to 11 elements to make room.', 'None of the above.'], a: 2,
    why: 'Writing past the end is undefined behaviour: the program may crash, quietly corrupt other memory, or appear to work. Arrays in C never resize themselves.',
    hints: ['Does C check array indexes at run time?', 'Can a fixed-length array change its size?', 'Undefined behaviour can even look correct.'] });
  add({ id: 'c8-bxd-019', chapter: 8, t: 2, k: 'mcq', tag: 'Concept', source: '2022 FALL Exam 2 Q22',
    q: 'Which statement about arrays in C is TRUE?',
    c: ['arr[-1] refers to the last element of arr.', 'Defining int arr[20]; inside a function sets all 20 elements to 0.', 'The expression arr has the same value as &arr[0].', 'None of the above.'], a: 2,
    why: 'An array name evaluates to the address of its first element. C has no negative indexing from the end (arr[-1] is out of bounds), and a local array without an initializer is not zeroed.',
    hints: ['What does the array name evaluate to?', 'Does C count backward from the end with negative indexes?', 'Are local arrays initialized automatically?'] });
  add({ id: 'c8-bxd-020', chapter: 8, t: 3, k: 'mcq', tag: 'Concept', source: '2022 FALL Exam 2 Q23',
    q: 'Which statement about arrays and functions is FALSE?',
    c: ['swap(&v[0], &v[3]) lets a function change two individual elements of v.', 'Calling f(v[1], v[2]) gives f the addresses of those two elements, so f can change them.', 'When a whole array is passed, changes the function makes to its elements are seen by the caller.', 'None of the above.'], a: 1,
    why: 'v[1] and v[2] are individual int values, so they are passed by value - f gets copies. To let f change them you must send their addresses with &. Passing the whole array (its name) shares the same elements with the caller.',
    hints: ['What type is v[1]?', 'How are single int values passed by default?', 'Where is the & in the first statement?'] });
  add({ id: 'c8-bxd-021', chapter: 8, t: 4, k: 'mcq', tag: 'Trace', source: '2022 FALL Exam 2 Q23',
    q: 'One element and the whole array are passed to the same function. What does the program print?',
    code: '#include <stdio.h>\n\nvoid adjust(int a, int b[]);\n\nint main(void)\n{\n  int v[3] = {4, 5, 6};\n\n  adjust(v[2], v);\n  printf("%d %d %d\\n", v[0], v[1], v[2]);\n  return 0;\n}\n\nvoid adjust(int a, int b[])\n{\n  a = a * 2;\n  b[0] = b[0] + a;\n}',
    c: ['16 5 12', '4 5 6', '16 5 6', 'None of the above.'], a: 2,
    why: 'v[2] is passed by value, so a is a copy (6) that becomes 12 without touching v[2]. The whole array is shared, so b[0] = 4 + 12 = 16 changes v[0]. Output: 16 5 6.',
    hints: ['Is a a copy or the real v[2]?', 'Is b a copy or main\'s array?', 'Which element actually changes?'] });
  add({ id: 'c8-bxd-022', chapter: 8, t: 3, k: 'mcq', tag: 'Trace', source: '2022 FALL Exam 2 Q24',
    q: 'The loop remembers an index, not a value. What is printed?',
    code: 'int vals[7] = {6, 2, 9, 2, 9, 1, 9};\nint k;\nint result = 0;\n\nfor (k = 1; k < 7; k++)\n{\n  if (vals[k] >= vals[result])\n  {\n    result = k;\n  }\n}\nprintf("result: %d\\n", result);',
    c: ['result: 2', 'result: 9', 'result: 6', 'None of the above.'], a: 2,
    why: 'result is the index of the largest value so far. Because the test is >=, a later tie replaces it: index 2 (9), then index 4 (9), then index 6 (9). With > it would stay at 2; 9 is the value, not the index.',
    hints: ['Does result store a value or an index?', 'What happens on a tie when the test is >=?', 'Where is the LAST 9?'] });
  add({ id: 'c8-bxd-023', chapter: 8, t: 4, k: 'mcq', tag: 'Trace', source: '2022 FALL Exam 2 Q24',
    q: 'A relational result is added straight into result. What is printed?',
    code: 'int v[8] = {3, 3, 5, 5, 5, 2, 3, 1};\nint k;\nint result = 1;\n\nfor (k = 1; k < 8; k++)\n{\n  result += v[k] != v[k - 1];\n}\nprintf("result: %d\\n", result);',
    c: ['result: 3', 'result: 4', 'result: 5', 'None of the above.'], a: 2,
    why: 'v[k] != v[k - 1] is 1 whenever a new run of equal values starts: at indexes 2, 5, 6 and 7. Starting from 1, result becomes 5 (the number of runs). Forgetting the starting value of 1 gives 4.',
    hints: ['A relational expression adds 0 or 1.', 'Where does the value change from its left neighbour?', 'Do not forget result starts at 1.'] });
  add({ id: 'c8-bxd-024', chapter: 8, t: 3, k: 'mcq', tag: 'Trace', source: '2022 FALL Exam 2 Q25',
    q: 'What does this program print?',
    code: '#include <stdio.h>\n#define SIZE 6\n\nint main(void)\n{\n  int x[SIZE] = {7, 7, 7, 7, 7, 7};\n  int k;\n\n  for (k = 0; k < SIZE - 1; k++)\n  {\n    x[k] = x[k + 1] - k;\n  }\n  printf("x[SIZE - 1]: %d\\n", x[SIZE - 1]);\n  return 0;\n}',
    c: ['x[SIZE - 1]: 3', 'x[SIZE - 1]: 2', 'x[SIZE - 1]: 7', 'None of the above.'], a: 2,
    why: 'k runs from 0 to SIZE - 2 (4), so the loop writes x[0] through x[4] only. x[SIZE - 1], which is x[5], is never assigned and keeps its initial 7.',
    hints: ['What is the largest k the loop uses?', 'Which elements are written - x[k] or x[k + 1]?', 'Is x[5] ever on the left of =?'] });
  add({ id: 'c8-bxd-025', chapter: 8, t: 4, k: 'mcq', tag: 'Trace', source: '2022 FALL Exam 2 Q25',
    q: 'The array values are used as indexes into the same array. What does the program print?',
    code: '#include <stdio.h>\n#define SIZE 5\n\nint main(void)\n{\n  int x[SIZE] = {4, 1, 3, 0, 2};\n  int k = 0;\n  int steps = 0;\n\n  while (x[k] != 0)\n  {\n    k = x[k];\n    steps++;\n  }\n  printf("k: %d, steps: %d\\n", k, steps);\n  return 0;\n}',
    c: ['k: 0, steps: 3', 'k: 3, steps: 4', 'k: 3, steps: 3', 'None of the above.'], a: 2,
    why: 'Follow the chain: k = 0 holds 4, so k = 4 (1 step); x[4] is 2, k = 2 (2 steps); x[2] is 3, k = 3 (3 steps); x[3] is 0, so the loop stops. k is the index whose value is 0, which is 3.',
    hints: ['Each pass jumps to the index stored at the current one.', 'Write k and steps after every pass.', 'The loop stops when the VALUE at x[k] is 0.'] });
  add({ id: 'c8-bxd-026', chapter: 8, t: 3, k: 'mcq', tag: 'Trace', source: '2022 FALL Exam 2 Q28',
    q: 'This is one pass of comparing neighbours and swapping. What is printed?',
    code: 'int x[5] = {4, 2, 5, 1, 3};\nint k;\nint temp;\n\nfor (k = 0; k < 4; k++)\n{\n  if (x[k] > x[k + 1])\n  {\n    temp = x[k];\n    x[k] = x[k + 1];\n    x[k + 1] = temp;\n  }\n}\nprintf("x[2] = %d\\n", x[2]);',
    c: ['x[2] = 5', 'x[2] = 3', 'x[2] = 1', 'None of the above.'], a: 2,
    why: 'Swap 4 and 2: {2, 4, 5, 1, 3}. 4 and 5 stay. Swap 5 and 1: {2, 4, 1, 5, 3}. Swap 5 and 3: {2, 4, 1, 3, 5}. The largest value moves to the end, and x[2] is 1.',
    hints: ['Redraw the array after each comparison.', 'A swapped value can be compared again on the next step.', 'Where does 5 end up?'] });
  add({ id: 'c8-bxd-027', chapter: 8, t: 4, k: 'mcq', tag: 'Trace', source: '2022 FALL Exam 2 Q28',
    q: 'The index used on each pass comes from the array itself, which keeps changing. What is printed?',
    code: 'int x[5] = {3, 0, 4, 1, 2};\nint k;\n\nfor (k = 0; k < 5; k++)\n{\n  x[x[k] % 5] += 1;\n}\nprintf("x[0] = %d\\n", x[0]);',
    c: ['x[0] = 3', 'x[0] = 4', 'x[0] = 5', 'None of the above.'], a: 1,
    why: 'k = 0: x[3] becomes 2. k = 1: x[1] is 0, so x[0] becomes 4. k = 2: x[4] becomes 3. k = 3: x[3] is now 2, so x[2] becomes 5. k = 4: x[4] is now 3, so x[3] becomes 3. x[0] is 4.',
    hints: ['First read x[k], then use it as an index.', 'Some values are read after they have been changed.', 'Which pass touches x[0]?'] });
  add({ id: 'c8-bxd-028', chapter: 8, t: 3, k: 'mcq', tag: 'Trace', source: '2022 FALL Exam 2 Q29',
    q: 'The loop steps by 2. What is printed?',
    code: 'int x[6] = {5, 3, 8, 6, 2, 7};\nint k;\n\nfor (k = 0; k < 6; k += 2)\n{\n  x[k] -= x[k + 1];\n}\nprintf("x[4] = %d\\n", x[4]);',
    c: ['x[4] = 5', 'x[4] = -5', 'x[4] = 2', 'None of the above.'], a: 1,
    why: 'k takes 0, 2 and 4. On the last pass x[4] = 2 - x[5] = 2 - 7 = -5. Subtracting in the wrong order would give 5.',
    hints: ['Which values does k take?', 'x[k] -= x[k + 1] means x[k] = x[k] - x[k + 1].', 'For k = 4: 2 - 7.'] });
  add({ id: 'c8-bxd-029', chapter: 8, t: 4, k: 'mcq', tag: 'Trace', source: '2022 FALL Exam 2 Q29',
    q: 'The inner loop starts at the outer counter. What is printed?',
    code: 'int x[5] = {0};\nint i;\nint j;\n\nfor (i = 0; i < 5; i++)\n{\n  for (j = i; j < 5; j++)\n  {\n    x[j] -= i;\n  }\n}\nprintf("x[4] = %d\\n", x[4]);',
    c: ['x[4] = -4', 'x[4] = -6', 'x[4] = -10', 'None of the above.'], a: 2,
    why: 'x[4] is touched on every outer pass (j always reaches 4), so it loses 0 + 1 + 2 + 3 + 4 = 10. Only subtracting the last i gives -4; stopping at i = 3 gives -6.',
    hints: ['On which outer passes does j reach 4?', 'How much is subtracted each time?', 'Sum 0 through 4.'] });
  add({ id: 'c8-bxd-030', chapter: 8, t: 3, k: 'mcq', tag: 'Trace', source: '2022 FALL Exam 2 Q30',
    q: 'The loop runs from the back of the array toward the front. What is printed?',
    code: 'int x[7] = {1, 2, 3, 4, 5, 6, 7};\nint k;\n\nfor (k = 6; k > 0; k--)\n{\n  x[k] = x[k] + x[k - 1];\n}\nprintf("x[6] = %d\\n", x[6]);',
    c: ['x[6] = 28', 'x[6] = 7', 'x[6] = 6', 'None of the above.'], a: 3,
    why: 'Going backward, x[6] is updated first, while x[5] still holds its original 6: x[6] = 7 + 6 = 13. 13 is not listed. A front-to-back loop would have produced a running total (28).',
    hints: ['Which element is updated first?', 'When x[6] is computed, has x[5] changed yet?', '7 + 6.'] });
  add({ id: 'c8-bxd-031', chapter: 8, t: 4, k: 'mcq', tag: 'Trace', source: '2022 FALL Exam 2 Q30',
    q: 'What is printed?',
    code: 'int x[7] = {2, 0, 0, 0, 0, 0, 0};\nint k = 0;\n\nwhile (k < 6)\n{\n  x[k + 1] = x[k] + k;\n  k += 2;\n}\nprintf("x[6] = %d\\n", x[6]);',
    c: ['x[6] = 4', 'x[6] = 6', 'x[6] = 8', 'None of the above.'], a: 3,
    why: 'k takes 0, 2 and 4, so the loop writes x[1], x[3] and x[5] only (2, 2 and 4). k = 6 fails k < 6, so x[6] is never written and stays 0 - not listed.',
    hints: ['Which indexes does x[k + 1] reach?', 'Does the loop body run when k is 6?', 'What was x[6] initialized to?'] });
  add({ id: 'c8-bxd-032', chapter: 8, t: 2, k: 'mcq', tag: 'Concept', source: '2024 SPRING Final Q2',
    q: 'Which statement about passing a whole array to a function is TRUE?',
    c: ['The function gets its own copy of the array before it starts running.', 'A function written for a 10-element int array cannot be called with a 25-element int array.', 'The parameter may be written as int data[] or as int *data with the same meaning.', 'None of the above.'], a: 2,
    why: 'An array parameter is really a pointer to the first element, so int data[] and int *data are equivalent. No copy is made, and the function works with any length (which is why the size is passed separately).',
    hints: ['What does the function actually receive?', 'Is the array length part of what is passed?', 'Array notation vs pointer notation in a parameter list.'] });
  add({ id: 'c8-bxd-033', chapter: 8, t: 3, k: 'mcq', tag: 'Concept', source: '2024 SPRING Final Q11',
    q: 'Which statement about two-dimensional arrays is FALSE?',
    c: ['int grid[4][6]; holds 24 int values in total.', 'A function can receive grid with the parameter int g[][6].', 'A parameter written as int g[][], leaving out both sizes, is acceptable for a two-dimensional array.', 'None of the above.'], a: 2,
    why: 'The first dimension may be left empty, but every later dimension must be given so the compiler can find each row. int g[][] does not compile. 4 x 6 = 24 is the capacity.',
    hints: ['Capacity = product of the dimensions.', 'Which dimension may be omitted in a parameter?', 'How would the compiler know the row length without the second size?'] });
  add({ id: 'c8-bxd-034', chapter: 8, t: 3, k: 'mcq', tag: 'Concept', source: '2024 SPRING Final Q9',
    q: 'Which statement about insertion sort (into ascending order) is TRUE?',
    c: ['An array of n elements is sorted after n - 1 passes.', 'Each pass finds the smallest unsorted value and swaps it into place.', 'A value placed in the sorted part on an early pass keeps that same index for the rest of the sort.', 'None of the above.'], a: 0,
    why: 'The first element starts as a sorted list of one, and each pass inserts one more element, so n - 1 passes finish the job. Finding the smallest is selection sort, and later insertions can shift earlier values to the right.',
    hints: ['How many elements are in the sorted part before the first pass?', 'Which algorithm hunts for the smallest value?', 'Can inserting a small value move earlier ones?'] });
  add({ id: 'c8-bxd-035', chapter: 8, t: 3, k: 'mcq', tag: 'Concept', source: '2024 SPRING Final Q21',
    q: 'The course\'s binary search looks for a target of 1 in this array. Which are the FINAL values of first and last?',
    code: '{ 3, 8, 14, 20, 26, 31, 39, 47, 52 }',
    c: ['first = 0, last = 0', 'first = 0, last = -1', 'first = 1, last = 0', 'None of the above.'], a: 1,
    why: 'first = 0, last = 8. mid = 4 (26): 1 is smaller, last = 3. mid = 1 (8): last = 0. mid = 0 (3): last = -1. Now first > last and the loop ends with first = 0, last = -1.',
    hints: ['A target smaller than every element only ever moves last.', 'last = mid - 1 each time.', 'The loop ends when first > last.'] });
  add({ id: 'c8-bxd-036', chapter: 8, t: 4, k: 'mcq', tag: 'Concept', source: '2024 SPRING Final Q21',
    q: 'The course\'s binary search looks for 30 (which is not present) in this array. Which are the FINAL values of first and last?',
    code: '{ 2, 5, 9, 13, 18, 22, 27, 33, 38, 41, 47, 56 }',
    c: ['first = 6, last = 6', 'first = 7, last = 7', 'first = 8, last = 7', 'None of the above.'], a: 3,
    why: 'first = 0, last = 11. mid = 5 (22): first = 6. mid = 8 (38): last = 7. mid = 6 (27): first = 7. mid = 7 (33): last = 6. The search ends with first = 7, last = 6 - not listed.',
    hints: ['mid = (first + last) / 2 uses integer division.', 'Update only one of first or last on each step.', 'The loop ends as soon as first > last.'] });
  add({ id: 'c8-bxd-037', chapter: 8, t: 3, k: 'mcq', tag: 'Concept', source: '2024 SPRING Final Q22',
    q: 'An array is shown before sorting and again after exactly TWO passes of an ascending sort. Which algorithm(s) are consistent with the second array?',
    code: 'Before:      { 22, 15,  8, 30, 27, 35, 31 }\nAfter two:   {  8, 15, 22, 30, 27, 35, 31 }',
    c: ['Selection.', 'Bubble.', 'Insertion.', 'More than one of the above.'], a: 3,
    why: 'Selection: pass 1 swaps 8 to the front, pass 2 leaves 15 in place -> match. Insertion: pass 1 orders 22 and 15, pass 2 inserts 8 at the front -> match. Bubble would carry 30 and then 35 to the end, giving { 8, 15, 22, 27, 30, 31, 35 }. Two algorithms fit.',
    hints: ['Run two passes of each algorithm by hand.', 'Where would bubble sort have moved the largest values?', 'More than one can match.'] });
  add({ id: 'c8-bxd-038', chapter: 8, t: 4, k: 'mcq', tag: 'Concept', source: '2024 SPRING Final Q22',
    q: 'An array is shown before sorting and again after exactly TWO passes of an ascending sort. Which algorithm(s) are consistent with the second array?',
    code: 'Before:      { 20, 13, 27,  8, 15, 31, 22 }\nAfter two:   { 13, 20, 27,  8, 15, 31, 22 }',
    c: ['Selection.', 'Bubble.', 'Insertion.', 'More than one of the above.'], a: 2,
    why: 'Insertion: pass 1 puts 13 before 20, pass 2 inserts 27, which is already in place. Selection would bring 8 to the front on its first pass, and bubble would move 31 and then 27 toward the end. Only insertion fits.',
    hints: ['Selection\'s first pass always puts the smallest value at index 0.', 'Where are 8 and 31 after two bubble passes?', 'Insertion only rearranges the first three values in two passes.'] });
  add({ id: 'c8-bxd-039', chapter: 8, t: 3, k: 'mcq', tag: 'Concept', source: '2024 SPRING Final Q23',
    q: 'An array is shown before sorting and again after exactly TWO passes of an ascending sort. Which algorithm(s) are consistent with the second array?',
    code: 'Before:      { 12, 20,  5, 17, 26,  9, 24 }\nAfter two:   {  5, 12, 17,  9, 20, 24, 26 }',
    c: ['Selection.', 'Bubble.', 'Insertion.', 'More than one of the above.'], a: 1,
    why: 'Each bubble pass compares neighbours and carries the largest remaining value to the end: 26 after pass 1, 24 after pass 2, which matches. Selection would give { 5, 9, 12, ... } and insertion only rearranges the first three values.',
    hints: ['Look at the end of the "after" array.', 'Which algorithm builds the sorted part at the END?', 'Check selection: what would be at index 1?'] });
  add({ id: 'c8-bxd-040', chapter: 8, t: 2, k: 'mcq', tag: 'Concept', source: '2024 SPRING Final Q25',
    q: 'Which statement about sequential (linear) search is FALSE?',
    c: ['It works on an array whether or not the values are sorted.', 'If the target is the first element, sequential search finds it with fewer comparisons than binary search needs on the same array.', 'On a sorted array, sequential search always needs at least as many comparisons as binary search to find a target that is present.', 'None of the above.'], a: 2,
    why: 'For a target near the front, sequential search can win: it finds element 0 with one comparison while binary search starts in the middle. So "always at least as many" is false. The other two statements are true.',
    hints: ['Where does binary search look first?', 'How many comparisons does sequential search need for element 0?', '"Always" is a strong word.'] });
  add({ id: 'c8-bxd-041', chapter: 8, t: 3, k: 'mcq', tag: 'Concept', source: '2024 SPRING Final Q29',
    q: 'Insertion sort is applied to the array below; the sort may arrange the values in either ascending or descending order, and the sorted part grows from index 0. Which configuration is NOT possible after exactly TWO passes?',
    code: '{ 31, 12, 26, 8, 40, 18, 35 }',
    c: ['{ 12, 26, 31, 8, 40, 18, 35 }', '{ 31, 26, 12, 8, 40, 18, 35 }', '{ 8, 12, 26, 31, 40, 18, 35 }', 'None of the above.'], a: 2,
    why: 'Two passes of insertion sort only arrange the first three values. Ascending gives { 12, 26, 31, ... } and descending gives { 31, 26, 12, ... }. Bringing 8 to the front needs a third pass, so the last configuration is not possible.',
    hints: ['How many values are in the sorted part after two passes?', 'Try both ascending and descending.', 'Which choice has moved a value from index 3?'] });
  add({ id: 'c8-bxd-042', chapter: 8, t: 3, k: 'mcq', tag: 'Concept', source: '2024 SPRING Final Q31',
    q: 'The course\'s binary search looks for 75 in this array. Which are the values of mid, in order?',
    code: '{ 4, 10, 15, 21, 28, 33, 37, 42, 50, 58, 61, 70, 79 }',
    c: ['6, 9, 11', '6, 9, 11, 12', '6, 10, 11, 12', 'None of the above.'], a: 1,
    why: 'first = 0, last = 12. mid = 6 (37): first = 7. mid = 9 (58): first = 10. mid = 11 (70): first = 12. mid = 12 (79): 75 is smaller, last = 11. Now first > last, so the search ends after four mids.',
    hints: ['mid = (first + last) / 2 with integer division.', 'When first = last = 12, is there another comparison?', 'Stop only when first > last.'] });
  add({ id: 'c8-bxd-043', chapter: 8, t: 4, k: 'mcq', tag: 'Concept', source: '2024 SPRING Final Q31',
    q: 'The course\'s binary search looks for 51 in this array. Which are the values of mid, in order?',
    code: '{ 3, 6, 11, 17, 24, 30, 36, 45, 51, 60 }',
    c: ['4, 7, 8', '5, 7, 8', '4, 7, 9', 'None of the above.'], a: 0,
    why: 'first = 0, last = 9. mid = 4 (24): first = 5. mid = (5 + 9) / 2 = 7 (45): first = 8. mid = (8 + 9) / 2 = 8 (51): found. Integer division rounds down, so the first mid is 4, not 5.',
    hints: ['(0 + 9) / 2 in integer division is?', 'Move first past mid when the target is larger.', 'The search stops when list[mid] equals the target.'] });

  /* ---- Chapter 9 ---- */
  add({ id: 'c9-bxd-001', chapter: 9, t: 2, k: 'mcq', tag: 'Concept', source: '2024 SPRING Final Q12',
    q: 'Which statement about pointer variables is FALSE?',
    c: ['A pointer declared as double *p; is meant to hold the address of a double.', 'After p = &rate;, the statement *p = 4.5; changes the value of rate.', 'Initializing a pointer, as in int *q = &count;, places an address in q.', 'None of the above.'], a: 3,
    why: 'All three are true. A pointer\'s type says what it points to, *p gives indirect access to the variable it points at, and initialization stores an address in the pointer.',
    hints: ['Check each statement on its own.', 'What does *p = 4.5 do when p holds &rate?', 'None false? Pick None of the above.'] });
  add({ id: 'c9-bxd-002', chapter: 9, t: 2, k: 'mcq', tag: 'Concept', source: '2024 SPRING Final Q16',
    q: 'Which statement about memory allocation in C is TRUE?',
    c: ['Static allocation is the tool for data whose size is only learned while the program runs.', 'malloc and calloc both leave the new memory filled with unknown values.', 'Memory obtained from malloc should be treated as holding garbage until the program stores values in it.', 'None of the above.'], a: 2,
    why: 'malloc does not initialize the block, so its contents are unknown. Static allocation needs the size at compile time (dynamic allocation handles run-time sizes), and calloc sets every byte to zero.',
    hints: ['Which kind of allocation handles a size known only at run time?', 'What does calloc do that malloc does not?', 'Does malloc clear the memory?'] });

  /* ---- Chapter 15 ---- */
  add({ id: 'c15-bxd-001', chapter: 15, t: 3, k: 'mcq', tag: 'Trace', source: '2022 SPRING Exam 2 Q15',
    q: 'Which line is printed first?',
    code: '#include <stdio.h>\n\nint trail(int n);\n\nint main(void)\n{\n  int out;\n\n  printf("data:");\n  out = trail(8);\n  printf("\\nresult: %d\\n", out);\n  return 0;\n}\n\nint trail(int n)\n{\n  int r;\n\n  if (n <= 1)\n  {\n    r = n - 2;\n  }\n  else\n  {\n    printf(" %d", n);\n    r = trail(n - 3) + 1;\n  }\n  return r;\n}',
    c: ['data: 8 5 2', 'data: 8 5 2 -1', 'data: 5 2 -1', 'None of the above.'], a: 0,
    why: 'trail prints n before calling itself with n - 3: 8, 5, 2. The call trail(-1) reaches the base case (n <= 1), which prints nothing.',
    hints: ['Which calls take the else branch?', 'Does the base case print anything?', 'The print happens before the recursive call.'] });
  add({ id: 'c15-bxd-002', chapter: 15, t: 4, k: 'mcq', tag: 'Trace', source: '2022 SPRING Exam 2 Q15',
    q: 'In this version the printf comes AFTER the recursive call. Which line is printed first?',
    code: '#include <stdio.h>\n\nint trail(int n);\n\nint main(void)\n{\n  int out;\n\n  printf("data:");\n  out = trail(8);\n  printf("\\nresult: %d\\n", out);\n  return 0;\n}\n\nint trail(int n)\n{\n  int r;\n\n  if (n <= 1)\n  {\n    r = n - 2;\n  }\n  else\n  {\n    r = trail(n - 3) + 1;\n    printf(" %d", n);\n  }\n  return r;\n}',
    c: ['data: 8 5 2', 'data: 2 5 8', 'data: -1 2 5 8', 'None of the above.'], a: 1,
    why: 'Each call waits for its recursive call to finish before printing. The deepest call that prints is trail(2), so 2 appears first, then 5 as that call returns, then 8.',
    hints: ['Which call finishes first?', 'Does the base case print?', 'Printing after the call reverses the order.'] });
  add({ id: 'c15-bxd-003', chapter: 15, t: 3, k: 'mcq', tag: 'Trace', source: '2022 SPRING Exam 2 Q16',
    q: 'Which line is printed last?',
    code: '#include <stdio.h>\n\nint trail(int n);\n\nint main(void)\n{\n  int out;\n\n  printf("data:");\n  out = trail(8);\n  printf("\\nresult: %d\\n", out);\n  return 0;\n}\n\nint trail(int n)\n{\n  int r;\n\n  if (n <= 1)\n  {\n    r = n - 2;\n  }\n  else\n  {\n    printf(" %d", n);\n    r = trail(n - 3) + 1;\n  }\n  return r;\n}',
    c: ['result: -3', 'result: 3', 'result: 0', 'None of the above.'], a: 2,
    why: 'The base case trail(-1) returns -1 - 2 = -3. Each of the three calls above it adds 1 on the way back: trail(2) = -2, trail(5) = -1, trail(8) = 0.',
    hints: ['What does the base case return for n = -1?', 'How many calls add 1 on the way back?', '-3 + 1 + 1 + 1.'] });
  add({ id: 'c15-bxd-004', chapter: 15, t: 4, k: 'mcq', tag: 'Trace', source: '2022 SPRING Exam 2 Q16',
    q: 'What does this program print?',
    code: '#include <stdio.h>\n\nint combo(int n);\n\nint main(void)\n{\n  printf("result: %d\\n", combo(4));\n  return 0;\n}\n\nint combo(int n)\n{\n  int r;\n\n  if (n == 0)\n  {\n    r = 1;\n  }\n  else if (n % 2 == 0)\n  {\n    r = 2 * combo(n - 1);\n  }\n  else\n  {\n    r = combo(n - 1) - n;\n  }\n  return r;\n}',
    c: ['result: -3', 'result: 0', 'result: -6', 'None of the above.'], a: 2,
    why: 'Work up from the base case: combo(0) = 1, combo(1) = 1 - 1 = 0, combo(2) = 2 * 0 = 0, combo(3) = 0 - 3 = -3, combo(4) = 2 * -3 = -6.',
    hints: ['Start at the base case and work upward.', 'Even n doubles; odd n subtracts n.', 'combo(3) is -3; now apply the even rule.'] });
  add({ id: 'c15-bxd-005', chapter: 15, t: 2, k: 'mcq', tag: 'Concept', source: '2022 FALL Exam 2 Q20',
    q: 'Which statement about recursion is FALSE?',
    c: ['Every recursive function has to return a value, so a void function cannot call itself.', 'Each recursive call gets its own copies of the parameters and local variables.', 'Recursion that never reaches its base case will eventually use up memory and crash the program.', 'None of the above.'], a: 0,
    why: 'A void function can be recursive - for example one that prints a value and then calls itself with a smaller argument. Each call has its own frame, and runaway recursion overflows the stack.',
    hints: ['Can a void function call itself?', 'Where are each call\'s parameters stored?', 'What happens if there is no reachable base case?'] });
  add({ id: 'c15-bxd-006', chapter: 15, t: 3, k: 'mcq', tag: 'Trace', source: '2022 FALL Exam 2 Q20',
    q: 'countdown is a recursive void function. What does the program print?',
    code: '#include <stdio.h>\n\nvoid countdown(int n);\n\nint main(void)\n{\n  countdown(7);\n  printf("\\n");\n  return 0;\n}\n\nvoid countdown(int n)\n{\n  if (n > 0)\n  {\n    printf("[%d]", n);\n    countdown(n - 2);\n  }\n}',
    c: ['[7][5][3][1]', '[7][5][3][1][-1]', '[1][3][5][7]', 'None of the above.'], a: 0,
    why: 'Each call prints first, then recurses with n - 2: 7, 5, 3, 1. countdown(-1) fails n > 0, so it prints nothing and the recursion stops. No return value is needed.',
    hints: ['Is the print before or after the recursive call?', 'Does countdown(-1) print?', 'A void function can still recurse.'] });
  add({ id: 'c15-bxd-007', chapter: 15, t: 2, k: 'mcq', tag: 'Concept', source: '2024 SPRING Final Q14',
    q: 'Which statement about recursion is TRUE?',
    c: ['The base case is the part of the function that makes the recursive call.', 'For a counting process that would need hundreds of thousands of calls, a loop is a better choice than recursion.', 'Recursive solutions always run faster than the equivalent loops.', 'None of the above.'], a: 1,
    why: 'Every recursive call uses stack memory, so a counter-controlled process with a huge number of calls risks running out of memory - a loop is the safer choice. The base case is the part that does NOT recurse, and recursion is not automatically faster.',
    hints: ['What does each recursive call cost in memory?', 'Which part of a recursive function stops the calls?', '"Always faster" - is that likely?'] });
})();
