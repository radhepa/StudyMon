/* CS 159 past-exam twins (Fall 2021 Exams 1-2 and Final, Spring 2022 Final).
   Original questions modelled on the skills tested in past Purdue CS 159 exams
   (Boilerexams practice sets), written fresh - no exam text is reproduced.
   Every code snippet was compiled with gcc -std=c11 -Wall and run; keyed outputs
   are the real program output. Chapter numbers are the live (fourth-edition)
   numbers, so this file must load after curriculum.js. src names the exam item
   each question twins, for coverage audits. */
(function () {
  var Q = window.QBANK = window.QBANK || {};
  function add(q) { (Q[q.chapter] = Q[q.chapter] || []).push(q); }

  /* ---- Chapter 1 ---- */
  add({ id: "c1-bxc-001", chapter: 1, t: 2, k: 'mcq', tag: "Concept",
    q: "Which statement about the C language is FALSE?",
    c: ["C source code has to be translated into machine language by a compiler before the computer can run it.", "A C program written on one machine can usually be rebuilt for a different machine, provided a C compiler exists for that machine.", "Because C lets a program work directly with memory addresses, C is classified as a machine language rather than a high-level language.", "None of the above."], a: 2,
    why: "C is a high-level, structured language. Access to addresses (pointers) does not make it a machine language: it is still written in human-readable statements that a compiler translates. The other two statements are true (compilation and portability).",
    hints: ["Machine language is the binary instruction set a CPU executes directly. Can a CPU read C source text?", "Ask whether a pointer feature changes HOW the program is written and translated.", "Low-level features do not change the category of a language that still needs a compiler."],
    source: "2021 FALL Final Q47"
  });
  add({ id: "c1-bxc-002", chapter: 1, t: 2, k: 'mcq', tag: "Concept",
    q: "Which claim about high-level languages such as C or Python is FALSE?",
    c: ["A single high-level statement usually turns into several machine instructions after translation.", "A computer's processor is able to execute high-level source code directly, so no translation step is required.", "High-level programs are generally easier for people to read and maintain than equivalent machine-language programs.", "None of the above."], a: 1,
    why: "The CPU only executes machine language. High-level source must be translated (by a compiler, or an interpreter) first. The other two statements are true.",
    hints: ["What is the only language a processor actually understands?", "Where does the compiler fit between your .c file and the CPU?", "Any claim that removes the translation step is suspicious."],
    source: "2021 FALL Exam 1 Q3"
  });
  add({ id: "c1-bxc-003", chapter: 1, t: 3, k: 'mcq', tag: "Concept",
    q: "Which statement regarding errors in C programs is FALSE?",
    c: ["Leaving out a required semicolon is caught when the program is compiled.", "If compiling produces warnings but no errors, an executable file is still created.", "A logical mistake, such as dividing by a variable whose value is zero, can make a running program stop abnormally.", "None of the above."], a: 3,
    why: "All three are true. Syntax errors (a missing semicolon) stop compilation. Warnings alone do not stop gcc from producing the executable. A logic error can crash a running program, for example integer division by zero.",
    hints: ["Check each statement on its own; it is possible that none is false.", "Does gcc refuse to build a program that only has warnings?", "Can a mistake that the compiler accepted still end the program early at run time?"],
    source: "2022 SPRING Final Q21"
  });
  add({ id: "c1-bxc-004", chapter: 1, t: 4, k: 'mcq', tag: "Concept",
    q: "Which statement regarding errors in C programs is FALSE?",
    c: ["A syntax error found by the compiler prevents a new executable file from being produced.", "A program that compiles with no errors and no warnings is guaranteed to produce correct output.", "A logic error may let the program run to completion while printing a wrong answer.", "None of the above."], a: 1,
    why: "A clean compile only means the code follows the language rules. Logic errors (a wrong formula, a wrong loop bound) are invisible to the compiler, so correct output is never guaranteed. The other statements are true.",
    hints: ["What kind of mistakes can a compiler actually detect?", "Think of a program that computes an average but divides by the wrong count.", "Testing exists precisely because compiling is not enough."],
    source: "2022 SPRING Final Q21"
  });

  /* ---- Chapter 2 ---- */
  add({ id: "c2-bxc-001", chapter: 2, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  int miles = 26;\n  double km;\n\n  km = miles * 1.609;\n  printf(\"+-+-+-+-+-+-+-+-+\\n\");\n  printf(\"Distance:%8.2f km\\n\", km);\n  printf(\"+-+-+-+-+-+-+-+-+\\n\");\n\n  return 0;\n}",
    q: "What is the SECOND line of output? Spaces matter.",
    c: ["Distance:41.83 km", "Distance:   41.83 km", "Distance:   41.834 km", "None of the above."], a: 1,
    why: "km = 26 * 1.609 = 41.834. %8.2f rounds to two decimals (41.83, five characters) and right-justifies it in a field of 8, so three spaces come before it. There is no space in the format between the colon and the placeholder.",
    hints: ["First compute km; the int is converted to double for the multiplication.", "How many characters is the value once it is rounded to 2 decimal places?", "Field width 8 minus the characters of the value = number of leading spaces."],
    source: "2021 FALL Final Q40"
  });
  add({ id: "c2-bxc-002", chapter: 2, t: 4, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  int f = 59;\n  int c;\n  double shown;\n\n  c = (f - 32) * 5.0 / 9;\n  shown = c / 2;\n  printf(\"Reading:%7.2f C\\n\", shown);\n\n  return 0;\n}",
    q: "What is the output of the program? Spaces matter.",
    c: ["Reading:   7.50 C", "Reading:   7.00 C", "Reading:    7.00 C", "None of the above."], a: 1,
    why: "(59 - 32) * 5.0 / 9 = 15.0 is stored in the int c as 15. c / 2 is int / int, so it is 7, and only then is it stored in the double as 7.0. %7.2f prints 7.00 (four characters) right-justified in seven positions: three leading spaces.",
    hints: ["What type is c, and what type is the literal 2?", "The conversion to double happens after the division, at the assignment.", "Count characters: 7.00 is 4 wide, the field is 7 wide."],
    source: "2021 FALL Final Q40"
  });
  add({ id: "c2-bxc-003", chapter: 2, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  double tankVolume = 1250.48;\n\n  printf(\"-=-=-=-=-=-=-=-=-=-=-=-=\\n\");\n  /* missing print statement */\n\n  return 0;\n}",
    q: "Which statement, placed at the comment, prints the line below exactly (five spaces between the colon and the 1)?\n\nTank Volume:     1250.5",
    c: ["printf(\"Tank Volume:%6.1f\\n\", tankVolume);", "printf(\"Tank Volume:%11.1f\\n\", tankVolume);", "printf(\"Tank Volume:%11.2f\\n\", tankVolume);", "None of the above."], a: 1,
    why: "The value printed with one decimal is 1250.5, six characters. Five spaces plus six characters means a field width of 11, so %11.1f. %6.1f leaves no spaces, and %11.2f prints 1250.48 with only four spaces.",
    hints: ["Count the characters in the number as it is displayed.", "Width = leading spaces + characters of the value.", "The precision must also match the single decimal shown."],
    source: "2021 FALL Exam 1 Q1"
  });
  add({ id: "c2-bxc-004", chapter: 2, t: 2, k: 'mcq', tag: "Trace",
    code: "printf(\"Ratio: %.3f\\n\", 2.0 / 3);",
    q: "What is printed?",
    c: ["Ratio: 0.666", "Ratio: 0.667", "Ratio: 0.6667", "None of the above."], a: 1,
    why: "2.0 / 3 is 0.666666... The precision .3 keeps three decimals and ROUNDS the rest, so 0.667. printf never simply chops the digits.",
    hints: ["Is 2.0 / 3 an integer or a floating-point division?", "The .3 controls how many digits follow the decimal point.", "Does printf truncate or round the dropped digits?"],
    source: "2021 FALL Exam 1 Q5"
  });
  add({ id: "c2-bxc-005", chapter: 2, t: 2, k: 'mcq', tag: "Concept",
    q: "Which statement regarding constants in C is FALSE?",
    c: ["A literal such as 2.5 has type double unless a suffix such as f changes it.", "A name created with #define is replaced by its text before the code is compiled.", "A memory constant declared with const can be given a new value later by an ordinary assignment in the same function.", "None of the above."], a: 2,
    why: "Assigning to a const-qualified variable is a compile-time error; that is the point of const. Literals do have types (2.5 is double, 2.5f is float), and #define substitution happens in the preprocessor.",
    hints: ["Every value in C, including a literal, has a type.", "What would be the purpose of const if you could overwrite it?", "gcc reports \"assignment of read-only variable\" for one of these."],
    source: "2021 FALL Exam 1 Q6"
  });
  add({ id: "c2-bxc-006", chapter: 2, t: 3, k: 'mcq', tag: "Concept",
    q: "In conversion codes such as %ld or %Lf, what is the job of the size modifier (the l or L)?",
    c: ["It sets the minimum number of print positions reserved for the value.", "It sets how many digits are shown after the decimal point.", "It tells printf that the value belongs to a larger member of its type family, such as long int or long double.", "None of the above."], a: 2,
    why: "Width (a number before the dot) reserves positions and precision (after the dot) controls decimals. The size modifier (h, l, ll, L) tells the function which size of integer or floating type it is handling.",
    hints: ["A placeholder has flag, width, precision, size and conversion parts.", "Width and precision are numbers; the size modifier is a letter.", "Think of what changes between %d and %ld."],
    source: "2021 FALL Exam 1 Q7"
  });
  add({ id: "c2-bxc-007", chapter: 2, t: 4, k: 'mcq', tag: "Concept",
    q: "rate is declared as double. Which statement correctly reads a value typed by the user into rate?",
    c: ["scanf(\"%f\", &rate);", "scanf(\"%lf\", &rate);", "scanf(\"%lf\", rate);", "None of the above."], a: 1,
    why: "For scanf the size modifier is required: %f stores a float, %lf stores a double. scanf also needs the address of the variable, so the ampersand is required.",
    hints: ["scanf writes into memory, so it needs to know the exact size of the variable.", "Which conversion code means \"double\" for scanf?", "scanf needs an address list, not a data list."],
    source: "2021 FALL Exam 1 Q7"
  });
  add({ id: "c2-bxc-008", chapter: 2, t: 2, k: 'mcq', tag: "Concept",
    q: "Which statement about the C preprocessor is FALSE?",
    c: ["#include <math.h> brings the library's declarations into the program before translation begins.", "#define RATE 0.07 reserves memory for RATE, the same way a variable declaration does.", "Preprocessor directives are the lines that begin with #.", "None of the above."], a: 1,
    why: "#define performs text substitution: every RATE token is replaced by 0.07 before compiling. No storage is created. The other two statements are true.",
    hints: ["Does the preprocessor create variables, or edit text?", "What does the compiler see after the substitution?", "A defined constant has no address you could take with &."],
    source: "2021 FALL Exam 1 Q33"
  });
  add({ id: "c2-bxc-009", chapter: 2, t: 3, k: 'mcq', tag: "Concept",
    q: "Which claim about preprocessing is FALSE?",
    c: ["All directives are handled before the compiler translates the source into object code.", "If RATE is a defined constant, the characters RATE inside a string literal such as \"RATE\" are NOT replaced.", "A semicolon at the end of a #define line becomes part of the replacement text.", "None of the above."], a: 3,
    why: "All three are true. Preprocessing comes first, macros are not expanded inside string literals, and a trailing semicolon is copied into every use of the name (which can break expressions).",
    hints: ["It is possible that every statement is true.", "A macro name is only replaced when it appears as a separate token outside quotes.", "#define copies everything after the name, punctuation included."],
    source: "2022 SPRING Final Q25"
  });
  add({ id: "c2-bxc-010", chapter: 2, t: 3, k: 'mcq', tag: "Concept",
    q: "Which of these properties does a variable's declared type NOT decide?",
    c: ["The range of values the variable is able to hold.", "How the stored bits are interpreted when the value is read back.", "Which operators may be applied to it (for example, % works only on integers).", "None of the above."], a: 3,
    why: "All three depend on the type: it fixes the size and range, the encoding (int vs IEEE double), and the legal operators. So none of them is independent of the type.",
    hints: ["It is possible that every option IS determined by the type.", "Try % on a double and see what gcc says.", "A type describes size, representation, and permitted operations."],
    source: "2021 FALL Exam 1 Q34"
  });
  add({ id: "c2-bxc-011", chapter: 2, t: 4, k: 'mcq', tag: "Concept",
    q: "For a local variable, which property is NOT fixed by its declared type?",
    c: ["The number of bytes the variable occupies.", "Whether the % operator may be applied to it.", "The value it holds before the program assigns anything to it.", "None of the above."], a: 2,
    why: "An uninitialized local variable holds whatever bits happen to be in that memory, an unpredictable value that has nothing to do with its type. Size and permitted operators are fixed by the type.",
    hints: ["Which option depends on run-time circumstances rather than on the declaration?", "Local variables are not set to zero automatically.", "Initialize your variables: that advice exists because of one of these options."],
    source: "2021 FALL Exam 1 Q34"
  });
  add({ id: "c2-bxc-012", chapter: 2, t: 2, k: 'mcq', tag: "Concept",
    q: "Which claim about using printf and scanf is FALSE?",
    c: ["For numeric input, scanf must be given the address of each variable, for example &count.", "Each placeholder in the format string should have exactly one matching value in the list that follows.", "printf must also be given the address of each variable it displays, for example printf(\"%d\", &count);.", "None of the above."], a: 2,
    why: "printf receives values (a data list); scanf receives addresses (an address list) because it must store into the variables. Placeholders and list items must match one to one.",
    hints: ["Which function needs to CHANGE the variables?", "Data list vs address list.", "Passing &count to %d prints an address-sized value, not count."],
    source: "2022 SPRING Final Q4"
  });
  add({ id: "c2-bxc-013", chapter: 2, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  double lat = 40.4237;\n  double lon = -86.9081;\n  int deg;\n  int mins;\n  int d2;\n  int m2;\n\n  deg = lat;\n  mins = (lat - deg) * 60;\n  d2 = lon;\n  m2 = (d2 - lon) * 60 + 0.5;\n\n  printf(\"=-=-=-=-=-=-=-+\\n\");\n  printf(\"Lat:%5d/%-4d|\\n\", deg, mins);\n  printf(\"Lon:%-5d/%3d|\\n\", d2, m2);\n  printf(\"=-=-=-=-=-=-=-+\\n\");\n\n  return 0;\n}",
    q: "What is the SECOND line of output? Spaces matter.",
    c: ["Lat:   40/25  |", "Lat:   40/  25|", "Lat:40   /25  |", "None of the above."], a: 0,
    why: "deg = 40 (the fraction is dropped on assignment). (40.4237 - 40) * 60 = 25.422, stored as 25. %5d right-justifies 40 in 5 positions (3 spaces first); %-4d left-justifies 25 in 4 positions (2 spaces after).",
    hints: ["Assigning a double to an int keeps only the whole part.", "A minus sign in the placeholder means left-justify.", "Count positions: width minus digits = padding, and which side it goes on."],
    source: "2022 SPRING Final Q22"
  });
  add({ id: "c2-bxc-014", chapter: 2, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  double lat = 40.4237;\n  double lon = -86.9081;\n  int deg;\n  int mins;\n  int d2;\n  int m2;\n\n  deg = lat;\n  mins = (lat - deg) * 60;\n  d2 = lon;\n  m2 = (d2 - lon) * 60 + 0.5;\n\n  printf(\"=-=-=-=-=-=-=-+\\n\");\n  printf(\"Lat:%5d/%-4d|\\n\", deg, mins);\n  printf(\"Lon:%-5d/%3d|\\n\", d2, m2);\n  printf(\"=-=-=-=-=-=-=-+\\n\");\n\n  return 0;\n}",
    q: "Using the same program, what is the THIRD line of output? Spaces matter.",
    c: ["Lon:-87  / 54|", "Lon:-86  / 55|", "Lon:-86  / 54|", "None of the above."], a: 2,
    why: "Assigning -86.9081 to an int truncates toward zero, giving -86 (not -87). (-86 - -86.9081) * 60 + 0.5 = 54.986, which truncates to 54. %-5d prints -86 then two spaces; %3d prints one space then 54.",
    hints: ["Conversion to int truncates toward zero, also for negatives.", "Adding 0.5 before truncating rounds only if the fraction reaches .5.", "Compute 0.9081 * 60 carefully before adding 0.5."],
    source: "2022 SPRING Final Q23"
  });
  add({ id: "c2-bxc-015", chapter: 2, t: 4, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  double lon = -86.9081;\n  int whole;\n  int frac;\n\n  whole = lon;\n  frac = (whole - lon) * 100;\n  printf(\"Lon:%6d/%-3d/\\n\", whole, frac / 4);\n\n  return 0;\n}",
    q: "What is the output? Spaces matter.",
    c: ["Lon:   -86/22 /", "Lon:   -87/22 /", "Lon:  -86/ 22/", "None of the above."], a: 0,
    why: "whole = -86 (truncation toward zero). (-86 + 86.9081) * 100 = 90.81, stored as 90; 90 / 4 = 22 (integer division). %6d puts -86 (three characters, the sign counts) after three spaces; %-3d prints 22 then one space.",
    hints: ["The minus sign takes one of the field positions.", "frac / 4 is int / int.", "Left-justified padding goes after the digits."],
    source: "2022 SPRING Final Q23"
  });
  add({ id: "c2-bxc-016", chapter: 2, t: 2, k: 'mcq', tag: "Concept",
    q: "Which name could legally be declared as a C variable?",
    c: ["9lives", "num.total", "Total_9", "None of the above."], a: 2,
    why: "Identifiers use letters, digits and underscores and may not start with a digit. 9lives starts with a digit; num.total contains a period. Total_9 follows every rule.",
    hints: ["Which characters are allowed at all?", "What is the rule for the very first character?", "A period is an operator in C, not part of a name."],
    source: "2022 SPRING Final Q35"
  });

  /* ---- Chapter 3 ---- */
  add({ id: "c3-bxc-001", chapter: 3, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  int s1 = 88;\n  int s2 = 91;\n  int s3 = 79;\n  double avg;\n\n  avg = /* expression goes here */;\n  printf(\"Average: %.2f\\n\", avg);\n\n  return 0;\n}",
    q: "avg must receive the exact average, keeping any fractional part (these three scores happen to average exactly 86). Which expression should NOT be placed at the comment?",
    c: ["(s1 + s2 + s3) / 3", "(s1 + s2 + s3) / 3.0", "(double) (s1 + s2 + s3) / 3", "None of the above."], a: 0,
    why: "With all-int operands, (s1 + s2 + s3) / 3 is integer division: the fraction is lost before the value is stored in avg (for 88, 91, 80 it would print 86.00 instead of 86.33). Making either operand a double (3.0, or the cast applied before dividing) keeps the fraction.",
    hints: ["Look at the types of both operands of the division.", "Storing into a double variable happens AFTER the division.", "Try the scores 88, 91 and 80 in each option."],
    source: "2021 FALL Final Q39"
  });
  add({ id: "c3-bxc-002", chapter: 3, t: 4, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  int f = 100;\n  double c;\n\n  c = /* expression goes here */;\n  printf(\"%.2f\\n\", c);\n\n  return 0;\n}",
    q: "The program must convert f degrees Fahrenheit to Celsius and print 37.78. Which expression at the comment does that?",
    c: ["(f - 32) * 5 / 9", "5 / 9 * (f - 32.0)", "(double) ((f - 32) * 5 / 9)", "(f - 32) * (5 / 9.0)", "None of the above."], a: 3,
    why: "5 / 9.0 is 0.5556 (one operand is double), and 68 * 0.5556 = 37.78. (f - 32) * 5 / 9 is all int: 340 / 9 = 37, printed 37.00. In 5 / 9 * ... the 5 / 9 is evaluated first as int division, giving 0. Casting the whole int result to double is too late: 37.00.",
    hints: ["Evaluate left to right for operators of equal precedence, checking types at each step.", "A cast applied to a finished integer division cannot bring back the fraction.", "Which option makes a double before any division happens?"],
    source: "2021 FALL Final Q39"
  });
  add({ id: "c3-bxc-003", chapter: 3, t: 2, k: 'mcq', tag: "Concept",
    code: "double price = 7.9;\nint whole;\n\nwhole = price;\nprintf(\"%d\\n\", whole);",
    q: "The statement whole = price; converts a value. Which category of conversion is it?",
    c: ["Implicit conversion inside an arithmetic expression.", "Explicit conversion (a cast).", "Assignment conversion.", "None of the above."], a: 2,
    why: "The value on the right is converted to the type of the variable on the left because of the assignment: double 7.9 becomes int 7. There is no cast operator and no arithmetic expression mixing types.",
    hints: ["Is there a (type) cast written anywhere?", "Is there an operator combining two different types?", "The conversion happens because of the = itself."],
    source: "2021 FALL Final Q41"
  });
  add({ id: "c3-bxc-004", chapter: 3, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n#define PI 3.14159\n\nint main(void)\n{\n  int r = 2;\n  int h = 5;\n  double vol;\n\n  vol = r * r * h / 3 * PI;\n  printf(\"Volume: %.2f\\n\", vol);\n\n  return 0;\n}",
    q: "What is printed?",
    c: ["Volume: 20.94", "Volume: 18.85", "Volume: 18.00", "None of the above."], a: 1,
    why: "Left to right: r * r * h = 20, then 20 / 3 = 6 (both int), then 6 * 3.14159 = 18.85. The fraction was lost at the division, before PI made anything a double. 20.94 would be the mathematically intended value.",
    hints: ["* and / have the same precedence and group left to right.", "When does the first double operand appear in the chain?", "Compute 20 / 3 as an integer division."],
    source: "2021 FALL Exam 1 Q2"
  });
  add({ id: "c3-bxc-005", chapter: 3, t: 3, k: 'mcq', tag: "Trace",
    code: "double e = 2.71828;\nint scaled;\n\nscaled = (int) (e * 100) / 100 * 100;\nprintf(\"-=-=-=-=-=-=-=-=-=-=\\n\");\nprintf(\"Value A:%6d\\n\", scaled);",
    q: "What is the second line of output? Spaces matter.",
    c: ["Value A:   271", "Value A:   200", "Value A:200", "None of the above."], a: 1,
    why: "(int) (271.828) = 271. Then 271 / 100 = 2 (int division) and 2 * 100 = 200. %6d right-justifies 200 in six positions: three leading spaces.",
    hints: ["The cast applies only to (e * 100).", "After the cast, every operand is an int.", "Divide then multiply: is 271 / 100 * 100 equal to 271 in integer arithmetic?"],
    source: "2021 FALL Exam 1 Q4"
  });
  add({ id: "c3-bxc-006", chapter: 3, t: 4, k: 'mcq', tag: "Trace",
    code: "double e = 2.71828;\nint r;\n\nr = (int) (e * 1000 + 0.5) / 10 % 100;\nprintf(\"Value B:%-5d|\\n\", r);",
    q: "What is printed? Spaces matter.",
    c: ["Value B:   71|", "Value B:72   |", "Value B:71   |", "None of the above."], a: 2,
    why: "e * 1000 + 0.5 = 2718.78, cast to 2718. 2718 / 10 = 271 (int), 271 % 100 = 71. The - flag left-justifies 71 in five positions, so three spaces come after it, before the |.",
    hints: ["/ and % have the same precedence; go left to right.", "Rounding happened at the thousandths, not at the hundredths.", "The minus flag moves the padding to the right side."],
    source: "2021 FALL Exam 1 Q4"
  });
  add({ id: "c3-bxc-007", chapter: 3, t: 3, k: 'mcq', tag: "Trace",
    code: "int a = 9;\nint b = 4;\ndouble x;\n\nx = a / b * 1.5 + a % b;\nprintf(\"x: %.1f\\n\", x);",
    q: "What is printed?",
    c: ["x: 4.4", "x: 4.0", "x: 3.0", "None of the above."], a: 1,
    why: "a / b = 2 (int division), 2 * 1.5 = 3.0, a % b = 1, so x = 4.0. 4.4 comes from using 2.25 for a / b; 3.0 forgets the remainder term.",
    hints: ["Which happens first: a / b or the multiplication by 1.5?", "Both operands of a / b are int.", "% gives the remainder of 9 divided by 4."],
    source: "2021 FALL Exam 1 Q8"
  });
  add({ id: "c3-bxc-008", chapter: 3, t: 3, k: 'mcq', tag: "Trace",
    code: "double y;\n\ny = 14 / 3 + 14.0 / 3 - 14 % 3;\nprintf(\"y: %.1f\\n\", y);",
    q: "What is printed?",
    c: ["y: 7.3", "y: 6.0", "y: 6.7", "None of the above."], a: 2,
    why: "14 / 3 = 4 (int), 14.0 / 3 = 4.6667, 14 % 3 = 2. 4 + 4.6667 - 2 = 6.6667, shown as 6.7. 7.3 treats both divisions as real; 6.0 treats both as integer.",
    hints: ["Look at each division separately: which has a double operand?", "The modulus of 14 by 3 is 2.", "Round the final value to one decimal."],
    source: "2021 FALL Exam 1 Q9"
  });
  add({ id: "c3-bxc-009", chapter: 3, t: 3, k: 'mcq', tag: "Trace",
    code: "int m = 17;\nint n = 5;\ndouble z;\n\nz = (double) (m / n) + (double) m / n;\nprintf(\"z: %.1f\\n\", z);",
    q: "What is printed?",
    c: ["z: 6.8", "z: 6.4", "z: 6.0", "None of the above."], a: 1,
    why: "(double) (m / n): the parentheses force the int division first, 17 / 5 = 3, then 3.0. (double) m / n: the cast applies to m alone, so 17.0 / 5 = 3.4. Total 6.4.",
    hints: ["The cast has higher precedence than /.", "In the first term, what is inside the parentheses evaluated as?", "Only one of the two terms keeps its fraction."],
    source: "2021 FALL Exam 1 Q10"
  });
  add({ id: "c3-bxc-010", chapter: 3, t: 3, k: 'mcq', tag: "Trace",
    code: "int x = 4;\nint y = 3;\n\nx += y * 2 - 1;\ny -= x - y;\nprintf(\"x: %d y: %d\\n\", x, y);",
    q: "What is printed?",
    c: ["x: 9 y: -3", "x: 13 y: -7", "x: 9 y: 3", "None of the above."], a: 0,
    why: "Compound assignment has the lowest precedence, so the whole right side is computed first: x = 4 + (6 - 1) = 9. Then y = 3 - (9 - 3) = -3. 13 comes from (x + y) * 2 - 1.",
    hints: ["x += expr means x = x + (expr).", "Use the NEW x when evaluating the second statement.", "y -= x - y means y = y - (x - y)."],
    source: "2021 FALL Exam 1 Q11"
  });
  add({ id: "c3-bxc-011", chapter: 3, t: 3, k: 'mcq', tag: "Trace",
    code: "int a = 7;\nint b = 4;\nint c = 3;\nint d = 5;\nint z;\n\nz = a * b + c % d * a - b / c;\nprintf(\"z: %d\\n\", z);",
    q: "What is printed?",
    c: ["z: 30", "z: 48", "z: 1", "None of the above."], a: 1,
    why: "*, / and % are evaluated before + and -, left to right among themselves: a * b = 28, c % d = 3, 3 * a = 21, b / c = 1. Then 28 + 21 - 1 = 48. Reading strictly left to right gives 1; grouping c % (d * a) gives 30.",
    hints: ["List the multiplicative operators and evaluate them first.", "c % d * a groups as (c % d) * a.", "b / c is integer division."],
    source: "2021 FALL Exam 1 Q12"
  });
  add({ id: "c3-bxc-012", chapter: 3, t: 3, k: 'mcq', tag: "Trace",
    code: "char sym = 'k';\nint shift = 3;\n\nprintf(\"Code #1: %c\\n\", sym - ('a' - 'A') + shift);",
    q: "What is printed?",
    c: ["Code #1: n", "Code #1: H", "Code #1: N", "None of the above."], a: 2,
    why: "'a' - 'A' is 32, the distance between lowercase and uppercase letters in ASCII. 'k' - 32 is 'K', and 3 letters later is 'N'. Forgetting the case change gives n; subtracting the shift gives H.",
    hints: ["What does subtracting ('a' - 'A') do to a lowercase letter?", "Characters are small integers, so you can add to them.", "Count three letters forward from K."],
    source: "2021 FALL Exam 1 Q13"
  });
  add({ id: "c3-bxc-013", chapter: 3, t: 3, k: 'mcq', tag: "Trace",
    code: "char letter = 'X';\n\nletter = (letter - 'A' + 5) % 26 + 'A';\nprintf(\"Code #2: %c\\n\", letter);",
    q: "What is printed?",
    c: ["Code #2: ]", "Code #2: C", "Code #2: B", "None of the above."], a: 1,
    why: "'X' - 'A' = 23. (23 + 5) % 26 = 2, and 'A' + 2 is 'C'. The % 26 wraps past Z back to the start of the alphabet; without it, 'X' + 5 is the character ].",
    hints: ["Convert the letter to a position 0-25 first.", "What does % 26 do to 28?", "Then convert the position back into a letter."],
    source: "2021 FALL Exam 1 Q14"
  });
  add({ id: "c3-bxc-014", chapter: 3, t: 2, k: 'mcq', tag: "Trace",
    code: "int score = 87;\nchar grade;\n\ngrade = 'A' + (99 - score) / 10;\nprintf(\"Grade #1: %c\\n\", grade);",
    q: "What is printed?",
    c: ["Grade #1: A", "Grade #1: B", "Grade #1: C", "None of the above."], a: 1,
    why: "(99 - 87) / 10 = 12 / 10 = 1 (integer division). The letter one after A is B.",
    hints: ["Compute 99 - score first.", "Integer division drops the remainder.", "Adding 1 to a character moves one letter forward."],
    source: "2021 FALL Exam 1 Q20"
  });
  add({ id: "c3-bxc-015", chapter: 3, t: 3, k: 'mcq', tag: "Trace",
    code: "int score = 52;\nchar grade;\n\ngrade = 'A' + (99 - score) / 10;\nprintf(\"Grade #2: %c\\n\", grade);",
    q: "What is printed?",
    c: ["Grade #2: F", "Grade #2: D", "Grade #2: E", "None of the above."], a: 2,
    why: "(99 - 52) / 10 = 47 / 10 = 4, and A + 4 is E. The code is pure character arithmetic; it does not know that letter grades usually skip E.",
    hints: ["Do the arithmetic; do not reason from real grading scales.", "47 / 10 in integer division is 4.", "A, B, C, D, ... which letter is four after A?"],
    source: "2021 FALL Exam 1 Q21"
  });
  add({ id: "c3-bxc-016", chapter: 3, t: 2, k: 'mcq', tag: "Concept",
    q: "Which statement regarding the increment operators is FALSE?",
    c: ["The value of the expression ++x is the value of x after it has been increased.", "Applying ++ to a literal constant, as in ++5, is a compile-time error.", "After y = x++; executes, y and x always hold the same value.", "None of the above."], a: 2,
    why: "x++ yields the OLD value of x and then increments x, so after y = x++; y is one less than x. The operand of ++ must be a modifiable variable, so ++5 does not compile.",
    hints: ["Postfix: use first, then change.", "Try x = 4; y = x++; and print both.", "Can you store a new value into the number 5?"],
    source: "2021 FALL Exam 1 Q15"
  });
  add({ id: "c3-bxc-017", chapter: 3, t: 3, k: 'mcq', tag: "Concept",
    q: "Which claim about how C converts values between types is TRUE?",
    c: ["A cast such as (int) rate changes the declared type of rate for the rest of the program.", "In an assignment, the value on the right is always promoted to a higher-ranked type.", "Before any operator in an expression is evaluated, every operand in the whole expression is converted to the highest type present.", "None of the above."], a: 3,
    why: "All three are false. A cast produces a converted VALUE; the variable keeps its type. Assignment converts to the type on the left, which can demote (double to int). Implicit conversion is decided operator by operator, so 1.5 + 7 / 2 still performs 7 / 2 as integer division.",
    hints: ["Each statement uses an absolute word (permanently, always, every). Test it.", "What happens in int n = 3.9; ?", "Evaluate 1.5 + 7 / 2 by hand."],
    source: "2021 FALL Exam 1 Q16"
  });
  add({ id: "c3-bxc-018", chapter: 3, t: 4, k: 'mcq', tag: "Trace",
    code: "double r;\n\nr = 1.5 + 7 / 2;\nprintf(\"%.2f\\n\", r);",
    q: "What is printed?",
    c: ["5.00", "4.50", "4.00", "None of the above."], a: 1,
    why: "Conversions happen one operator at a time. 7 / 2 has two int operands, so it is 3. Only then is 3 converted for the addition: 1.5 + 3 = 4.50. 5.00 assumes every operand was converted to double first.",
    hints: ["Which operator is evaluated first?", "At that moment, what are the types of its two operands?", "The 1.5 does not affect a division it is not part of."],
    source: "2021 FALL Exam 1 Q16"
  });

  /* ---- Chapter 4 ---- */
  add({ id: "c4-bxc-001", chapter: 4, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nvoid splitTime(int *, int *, int *, int);\n\nint main(void)\n{\n  int total = 7384;\n  int h;\n  int m;\n  int s;\n\n  splitTime(&h, &m, &s, total);\n  printf(\"%02d:%02d:%02d\\n\", h, s, m);\n\n  return 0;\n}\n\nvoid splitTime(int *hr, int *mn, int *sc, int t)\n{\n  *hr = t / 3600;\n  *mn = t % 3600 / 60;\n  *sc = t % 60;\n}",
    q: "What does the program print?",
    c: ["02:03:04", "02:04:03", "2:4:3", "None of the above."], a: 1,
    why: "7384 / 3600 = 2 hours; 7384 % 3600 = 184 seconds left, 184 / 60 = 3 minutes; 7384 % 60 = 4 seconds. The printf lists h, s, m, so the seconds (04) print before the minutes (03). %02d pads with a zero to two digits.",
    hints: ["Work out h, m and s first.", "Then read the ORDER of the arguments in printf carefully.", "What does the 0 flag in %02d do to a one-digit number?"],
    source: "2021 FALL Final Q43"
  });
  add({ id: "c4-bxc-002", chapter: 4, t: 3, k: 'mcq', tag: "Concept",
    code: "#include <stdio.h>\n\nvoid splitTime(int *, int *, int *, int);\n\nint main(void)\n{\n  int total = 7384;\n  int h;\n  int m;\n  int s;\n\n  splitTime(&h, &m, &s, total);\n  printf(\"%02d:%02d:%02d\\n\", h, s, m);\n\n  return 0;\n}\n\nvoid splitTime(int *hr, int *mn, int *sc, int t)\n{\n  *hr = t / 3600;\n  *mn = t % 3600 / 60;\n  *sc = t % 60;\n}",
    q: "Which prototype could NOT replace the declaration of splitTime that appears above main?",
    c: ["void splitTime(int *hr, int *mn, int *sc, int t);", "void splitTime(int*, int*, int*, int);", "void splitTime(int *, int *, int *, int total);", "None of the above."], a: 3,
    why: "All three are valid prototypes. Parameter names are optional in a declaration, spacing around * does not matter, and naming some parameters while leaving others unnamed is allowed. Only the types and their order must match the definition.",
    hints: ["What must a prototype tell the compiler?", "Are the parameter names required in a declaration?", "Can a prototype name one parameter and leave the others unnamed?"],
    source: "2021 FALL Final Q44"
  });
  add({ id: "c4-bxc-003", chapter: 4, t: 4, k: 'mcq', tag: "Concept",
    code: "#include <stdio.h>\n\n/* declaration goes here */\n\nint main(void)\n{\n  int list[5] = {8, 3, 11, 6, 2};\n  int lo;\n  int hi;\n\n  findMinMax(list, 5, &lo, &hi);\n  printf(\"%d %d\\n\", lo, hi);\n  return 0;\n}\n\nvoid findMinMax(int *a, int n, int *lo, int *hi)\n{\n  int i;\n  *lo = a[0];\n  *hi = a[0];\n  for (i = 1; i < n; i++)\n  {\n    if (a[i] < *lo)\n    {\n      *lo = a[i];\n    }\n    if (a[i] > *hi)\n    {\n      *hi = a[i];\n    }\n  }\n}",
    q: "Which declaration, placed at the comment, would NOT work with the call findMinMax(list, 5, &lo, &hi); in the program above?",
    c: ["void findMinMax(int *, int, int *, int *);", "void findMinMax(int a[], int n, int *lo, int *hi);", "void findMinMax(int[], int, int, int);", "None of the above."], a: 2,
    why: "An array parameter may be written int a[] or int *: both mean a pointer to int. &lo and &hi are addresses, so those parameters must be int *. Declaring them int makes the call pass a pointer where an int is required, and the declaration also conflicts with the definition: gcc rejects it.",
    hints: ["What type is the expression &lo?", "Are int a[] and int *a different as parameters?", "The declaration must agree with the definition below main."],
    source: "2021 FALL Final Q44"
  });
  add({ id: "c4-bxc-004", chapter: 4, t: 2, k: 'mcq', tag: "Concept",
    q: "Which claim about main, as the course standards describe its role, is FALSE?",
    c: ["main should coordinate the program by calling the functions that do the work and by declaring the data the program needs.", "Every user-defined function in a program must be called directly from main.", "Only a limited number of control structures should appear in main, so that most calls are issued from main.", "None of the above."], a: 1,
    why: "Any function may call another function; a helper called from inside another helper is normal structured design. The other two statements describe the course's expectations for main.",
    hints: ["Can a user-defined function call a different user-defined function?", "Think of a structure chart with more than two levels.", "Which statement uses the word \"every\"?"],
    source: "2021 FALL Final Q46"
  });
  add({ id: "c4-bxc-005", chapter: 4, t: 2, k: 'mcq', tag: "Concept",
    q: "Which statement regarding user-defined functions is FALSE?",
    c: ["The identifier of a parameter must match the identifier of the variable used as the argument in the call.", "Two different functions may each have a local variable named count without any conflict.", "Parameters receive copies of the argument values, matched by position.", "None of the above."], a: 0,
    why: "Arguments are matched to parameters by position, never by name: calling f(total) works with a parameter called n. Locals in different functions are separate variables even when their names match.",
    hints: ["How does the compiler pair arguments with parameters?", "Is a local variable visible outside its function?", "Try calling a function whose parameter has a different name."],
    source: "2021 FALL Final Q48"
  });
  add({ id: "c4-bxc-006", chapter: 4, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint shift(int, int);\n\nint main(void)\n{\n  int x = 5;\n  int y = 2;\n\n  y = shift(x, y);\n  x = shift(y, x);\n  printf(\"x: %d y: %d\\n\", x, y);\n\n  return 0;\n}\n\nint shift(int a, int b)\n{\n  a = a * 2 - b;\n  b = a % 4;\n  return a + b;\n}",
    q: "What is printed?",
    c: ["x: 11 y: 8", "x: 5 y: 8", "x: 14 y: 0", "None of the above."], a: 3,
    why: "First call shift(5, 2): a = 8, b = 0, returns 8, so y = 8. Second call shift(8, 5): a = 11, b = 3, returns 14, so x = 14. Output: x: 14 y: 8. The changes to a and b stay inside the function.",
    hints: ["The second call uses the NEW value of y.", "Inside shift, b is recomputed from the new a before the return.", "Does changing parameter b affect main's y?"],
    source: "2021 FALL Exam 1 Q17"
  });
  add({ id: "c4-bxc-007", chapter: 4, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint mix(int, int);\n\nint main(void)\n{\n  int x = 4;\n  int y = 3;\n  int z;\n\n  z = mix(y, x) + mix(x, y);\n  printf(\"z: %d\\n\", z);\n\n  return 0;\n}\n\nint mix(int y, int x)\n{\n  y += x;\n  return y * 3 - x;\n}",
    q: "What is printed?",
    c: ["z: 34", "z: 35", "z: 36", "None of the above."], a: 1,
    why: "Arguments match parameters by position. mix(y, x) receives 3 then 4: y = 7, returns 21 - 4 = 17. mix(x, y) receives 4 then 3: y = 7, returns 21 - 3 = 18. 17 + 18 = 35. Matching by name instead would give 17 + 17 = 34.",
    hints: ["The parameter names happen to be x and y. Ignore that; use positions.", "In the first call, the parameter y gets the value of main's y, which is 3.", "In the second call, the parameter y gets main's x, which is 4."],
    source: "2021 FALL Exam 1 Q18"
  });
  add({ id: "c4-bxc-008", chapter: 4, t: 4, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint step(int, int);\n\nint main(void)\n{\n  int x = 3;\n  int y = 4;\n  int z;\n\n  z = step(step(x, y), x + y);\n  printf(\"z: %d\\n\", z);\n\n  return 0;\n}\n\nint step(int a, int b)\n{\n  a = a + b;\n  b = a - b;\n  return a * b % 10;\n}",
    q: "What is printed?",
    c: ["z: 1", "z: 5", "z: 8", "None of the above."], a: 2,
    why: "Inner call step(3, 4): a = 7, b = 3, returns 21 % 10 = 1. Outer call step(1, 7): a = 8, b = 1, returns 8 % 10 = 8. Using the original b in each product gives 5; stopping after the inner call gives 1.",
    hints: ["Evaluate the inner call first; its result becomes the first argument.", "Inside step, b changes before the return expression uses it.", "x + y is 7 for the outer call."],
    source: "2021 FALL Exam 1 Q18"
  });
  add({ id: "c4-bxc-009", chapter: 4, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint fold(int);\n\nint main(void)\n{\n  int x = 482;\n\n  x = fold(x) + fold(x / 10);\n  printf(\"x: %d\\n\", x);\n\n  return 0;\n}\n\nint fold(int n)\n{\n  int r;\n\n  r = n % 10 + n / 10 % 10;\n  return r * 2 - n / 100;\n}",
    q: "What is printed?",
    c: ["x: 36", "x: 40", "x: 44", "None of the above."], a: 1,
    why: "fold(482): 2 + 8 = 10, 10 * 2 - 4 = 16. fold(48): 8 + 4 = 12, 12 * 2 - 0 = 24 (48 / 100 is 0). 16 + 24 = 40.",
    hints: ["n % 10 is the last digit; n / 10 % 10 is the tens digit.", "x / 10 is evaluated before the second call: 48.", "What is 48 / 100 in integer division?"],
    source: "2021 FALL Exam 1 Q22"
  });
  add({ id: "c4-bxc-010", chapter: 4, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint trim(int, int);\n\nint main(void)\n{\n  int y;\n\n  y = trim(-23, 4) - trim(7, -3);\n  printf(\"y: %d\\n\", y);\n\n  return 0;\n}\n\nint trim(int a, int b)\n{\n  return a / b * b + a % b * 2;\n}",
    q: "What is printed?",
    c: ["y: -34", "y: -27", "y: -30", "None of the above."], a: 0,
    why: "C division truncates toward zero and the remainder takes the sign of the dividend. trim(-23, 4): -23 / 4 = -5, times 4 = -20; -23 % 4 = -3, times 2 = -6; total -26. trim(7, -3): 7 / -3 = -2, times -3 = 6; 7 % -3 = 1, times 2 = 2; total 8. -26 - 8 = -34. Floor-style division gives -27.",
    hints: ["In C, -23 / 4 is -5, not -6.", "The sign of a % b follows a.", "Compute each call separately, then subtract."],
    source: "2021 FALL Exam 1 Q23"
  });
  add({ id: "c4-bxc-011", chapter: 4, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint countOdd(int, int, int);\n\nint main(void)\n{\n  int z;\n\n  z = countOdd(15, -7, 4);\n  printf(\"z: %d\\n\", z);\n\n  return 0;\n}\n\nint countOdd(int a, int b, int c)\n{\n  return a % 2 + b % 2 + c % 2;\n}",
    q: "What is printed?",
    c: ["z: 2", "z: 1", "z: 0", "None of the above."], a: 2,
    why: "15 % 2 = 1, but -7 % 2 = -1 (the remainder takes the sign of the dividend), and 4 % 2 = 0. 1 + (-1) + 0 = 0. The function was meant to count odd values but fails for negatives.",
    hints: ["What is the sign of -7 % 2 in C?", "Add the three remainders exactly as computed.", "A safer odd test is n % 2 != 0."],
    source: "2021 FALL Exam 1 Q24"
  });
  add({ id: "c4-bxc-012", chapter: 4, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nvoid bump(int *, int);\n\nint main(void)\n{\n  int a = 3;\n  int b = 5;\n\n  bump(&a, b);\n  bump(&a, b);\n  printf(\"a: %d\\n\", a);\n\n  return 0;\n}\n\nvoid bump(int *p, int q)\n{\n  q = q + *p;\n  *p = q * 2;\n}",
    q: "What is printed?",
    c: ["a: 16", "a: 48", "a: 42", "None of the above."], a: 2,
    why: "First call: q = 5 + 3 = 8, a becomes 16. b is passed by value, so main's b is still 5. Second call: q = 5 + 16 = 21, a becomes 42. Assuming b also changed gives 48; ignoring the second call gives 16.",
    hints: ["Which argument is an address and which is a copy?", "Does q = q + *p change main's b?", "The second call starts with a = 16."],
    source: "2021 FALL Exam 1 Q25"
  });
  add({ id: "c4-bxc-013", chapter: 4, t: 4, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nvoid combine(int *, int *);\n\nint main(void)\n{\n  int a = 6;\n  int b = 2;\n\n  combine(&a, &b);\n  combine(&a, &a);\n  printf(\"a: %d b: %d\\n\", a, b);\n\n  return 0;\n}\n\nvoid combine(int *x, int *y)\n{\n  *x = *x + *y;\n  *y = *x - *y;\n}",
    q: "What is printed?",
    c: ["a: 16 b: 6", "a: 0 b: 6", "a: 8 b: 6", "None of the above."], a: 1,
    why: "First call: a = 8, then b = 8 - 2 = 6. Second call passes &a twice, so x and y point to the SAME variable: *x = 8 + 8 = 16 makes a 16, then *y = *x - *y is a = 16 - 16 = 0.",
    hints: ["In the second call, where do x and y point?", "After the first assignment, *y already shows the new value.", "Anything minus itself is..."],
    source: "2021 FALL Exam 1 Q25"
  });
  add({ id: "c4-bxc-014", chapter: 4, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nvoid spread(int *, int *, int);\n\nint main(void)\n{\n  int b = 10;\n  int c = 12;\n  int n = 4;\n\n  spread(&b, &c, n);\n  spread(&c, &b, n);\n  printf(\"b: %d c: %d\\n\", b, c);\n\n  return 0;\n}\n\nvoid spread(int *hi, int *lo, int n)\n{\n  *hi += n * 2;\n  *lo -= n;\n  n = *hi - *lo;\n}",
    q: "What is printed?",
    c: ["b: 26 c: 4", "b: 18 c: 8", "b: 14 c: 16", "None of the above."], a: 2,
    why: "First call (hi = &b, lo = &c): b = 18, c = 8. The last line changes only the local copy n. Second call swaps the roles (hi = &c, lo = &b): c = 8 + 8 = 16, b = 18 - 4 = 14.",
    hints: ["Note which address goes to hi in each call.", "Does n = *hi - *lo change main's n?", "The second call starts from b = 18, c = 8."],
    source: "2021 FALL Exam 1 Q26"
  });
  add({ id: "c4-bxc-015", chapter: 4, t: 2, k: 'mcq', tag: "Concept",
    q: "Which claim about pass-by-address is TRUE?",
    c: ["The address operator & must appear in the parameter list of the function definition.", "A function can return several values through a single return statement by separating them with commas.", "Passing a variable's address lets the called function change that variable for the caller.", "None of the above."], a: 2,
    why: "With the address, the function can store through the pointer (*p = ...) into the caller's variable. The & belongs in the CALL; the definition declares a pointer parameter (int *p). return sends back one value; a comma expression just yields its last operand.",
    hints: ["Where does & go, and where does * go?", "What does return (a, b); actually send back?", "Why do we pass &x to scanf?"],
    source: "2021 FALL Exam 1 Q28"
  });
  add({ id: "c4-bxc-016", chapter: 4, t: 3, k: 'mcq', tag: "Concept",
    code: "int main(void)\n{\n  int count;\n  int low;\n  int high;\n  double avg;\n\n  count = getCount();\n  getRange(&low, &high);\n  avg = calcAverage(count, low, high);\n  printResults(count, avg);\n  showBanner();\n\n  return 0;\n}",
    q: "Following the course standard that a function returns a value only when the caller uses it, how many of the five user-defined functions called in main are void?",
    c: ["Two of them.", "Three of them.", "Four of them.", "None of the above."], a: 1,
    why: "getCount and calcAverage have their results assigned, so they return values. getRange (sends results back through addresses), printResults and showBanner are called as stand-alone statements, so they are void: three.",
    hints: ["Look at which calls appear on the right side of an assignment.", "A function that sends data back through pointers can still be void.", "Count the calls that are complete statements by themselves."],
    source: "2021 FALL Exam 1 Q29"
  });
  add({ id: "c4-bxc-017", chapter: 4, t: 4, k: 'mcq', tag: "Concept",
    code: "int main(void)\n{\n  int a;\n  int b;\n  int total;\n\n  a = readValue();\n  b = readValue();\n  orderPair(&a, &b);\n  total = sumRange(a, b);\n  if (isEven(total))\n  {\n    showLine(total);\n  }\n  printf(\"Max: %d\\n\", larger(a, b));\n  orderPair(&a, &b);\n  showLine(a);\n\n  return 0;\n}",
    q: "Following the course standard that a function returns a value only when the caller uses it, how many DISTINCT functions (each name counted once) that main calls are void?",
    c: ["Two of them.", "Three of them.", "Four of them.", "None of the above."], a: 0,
    why: "The unique functions are readValue, orderPair, sumRange, isEven, showLine and larger. Values are used from readValue and sumRange (assigned), isEven (tested by the if) and larger (passed to printf). Only orderPair and showLine are void. Each is called twice, but unique functions are counted once.",
    hints: ["List each function name once.", "A result can be \"used\" by an if condition or as an argument, not only by an assignment.", "printf is a library function, not user-defined."],
    source: "2021 FALL Exam 1 Q29"
  });
  add({ id: "c4-bxc-018", chapter: 4, t: 3, k: 'mcq', tag: "Concept",
    code: "int main(void)\n{\n  int raw = 40;\n  int level;\n\n  level = scaleLevel(raw, 3);\n  printf(\"Level: %d\\n\", level);\n\n  return 0;\n}",
    q: "Which declaration of scaleLevel is INCORRECT for the call made in main?",
    c: ["int scaleLevel(int, int);", "int scaleLevel(int raw, int factor);", "int scaleLevel(int raw, factor);", "None of the above."], a: 2,
    why: "Every parameter in a prototype needs a type; the names are optional. int scaleLevel(int raw, factor); gives factor no type, which gcc rejects. The other two are correct.",
    hints: ["In a prototype, what is optional: the type or the name?", "Read each parameter of each option on its own.", "Is \"factor\" alone enough for the compiler?"],
    source: "2021 FALL Exam 1 Q30"
  });
  add({ id: "c4-bxc-019", chapter: 4, t: 3, k: 'mcq', tag: "Concept",
    code: "int main(void)\n{\n  int days = 5;\n  double dailyRate = 39.5;\n  int discountPct = 10;\n  double cost;\n\n  cost = rentalCost(days, dailyRate, discountPct);\n  printf(\"Cost: %.2f\\n\", cost);\n\n  return 0;\n}",
    q: "Which prototype for rentalCost fits the call in main?",
    c: ["double rentalCost(int, double, int);", "double rentalCost(int, int, double);", "int rentalCost(int, double, int);", "None of the above."], a: 0,
    why: "The arguments are int, double, int in that order, and the result is stored in a double, so the prototype is double rentalCost(int, double, int);. Swapping the parameter types would silently convert 39.5 to 39; an int return would lose the cents.",
    hints: ["Read the TYPE of each argument in order.", "What type receives the returned value?", "A mismatch would cause silent conversions, not always an error."],
    source: "2021 FALL Exam 1 Q31"
  });
  add({ id: "c4-bxc-020", chapter: 4, t: 3, k: 'mcq', tag: "Concept",
    q: "According to the course standards, which is a valid reason to use pass-by-address?",
    c: ["To cut down how many calls the program makes.", "The called function changes or calculates two or more values that the calling function needs afterward.", "To avoid writing a return statement in a function that computes one value.", "None of the above."], a: 1,
    why: "Pass by address is used when more than one value must get back to the caller. A single result should come back through return, and passing addresses is not a tool for cutting down calls.",
    hints: ["How many values can a return statement send back?", "When is a return statement the better choice?", "Fewer calls is not a design goal by itself."],
    source: "2021 FALL Exam 1 Q32"
  });
  add({ id: "c4-bxc-021", chapter: 4, t: 4, k: 'mcq', tag: "Concept",
    q: "Which of these functions is the best candidate for passing parameters by address?",
    c: ["A function that computes the area of a circle from its radius.", "A function that reads hours and minutes from the user so main can use both values.", "A function that prints a formatted table and sends nothing back.", "None of the above."], a: 1,
    why: "Reading two values for main means two results must come back, which needs addresses. The area is one value (use return). The table printer sends nothing back, so it needs neither.",
    hints: ["Count how many values each function must give back to its caller.", "One value: return. Zero values: void.", "Two or more values: ..."],
    source: "2021 FALL Exam 1 Q32"
  });
  add({ id: "c4-bxc-022", chapter: 4, t: 3, k: 'mcq', tag: "Concept",
    q: "Which statement regarding rand and srand is FALSE? (lo and hi are int variables with lo < hi.)",
    c: ["Without any call to srand, rand produces the same sequence each time the program is run.", "rand() % (hi - lo) + lo can produce every integer from lo through hi.", "srand should be called once, before the first call to rand, rather than before every call.", "None of the above."], a: 1,
    why: "rand() % (hi - lo) gives 0 through hi - lo - 1, so adding lo gives lo through hi - 1: hi is never produced. The inclusive formula is rand() % (hi - lo + 1) + lo. Without srand the default seed is used, so the sequence repeats from run to run.",
    hints: ["What is the largest value of rand() % k?", "Try lo = 1 and hi = 6 in the formula.", "How many different values does the range lo..hi contain?"],
    source: "2021 FALL Final Q42"
  });
  add({ id: "c4-bxc-023", chapter: 4, t: 3, k: 'mcq', tag: "Concept",
    q: "Which statement regarding rand and srand is FALSE?",
    c: ["rand takes no arguments and returns an int from 0 through RAND_MAX.", "rand accepts a maximum value as its argument, which limits the range of numbers it returns.", "Calling srand with the same seed in every run makes the program produce the same sequence each run.", "None of the above."], a: 1,
    why: "rand has no parameters (int rand(void)); a range is made afterwards with % and +. srand(unsigned seed) is void and only chooses the starting point of the sequence.",
    hints: ["Look up the prototype of rand in stdlib.h.", "How do we get dice values 1-6 from rand?", "What is the role of the seed?"],
    source: "2021 FALL Exam 2 Q29"
  });
  add({ id: "c4-bxc-024", chapter: 4, t: 4, k: 'mcq', tag: "Concept",
    q: "Which expression produces a random EVEN integer from 10 through 20 inclusive, with every such value possible?",
    c: ["rand() % 11 + 10", "rand() % 5 * 2 + 10", "rand() % 6 * 2 + 10", "None of the above."], a: 2,
    why: "rand() % 6 gives 0-5; doubling gives 0, 2, ..., 10; adding 10 gives 10, 12, ..., 20. rand() % 5 * 2 + 10 tops out at 18, and rand() % 11 + 10 also produces odd values.",
    hints: ["How many even values are there from 10 to 20?", "% and * have the same precedence, left to right.", "Check the largest value each option can produce."],
    source: "2021 FALL Exam 2 Q29"
  });
  add({ id: "c4-bxc-025", chapter: 4, t: 2, k: 'mcq', tag: "Concept",
    q: "PI is defined as 3.14159265. Which call computes the cosine of a 60-degree angle using the math.h library?",
    c: ["cos(60)", "cos(60) * PI / 180", "cos(60 * PI / 180)", "None of the above."], a: 2,
    why: "sin, cos and tan take their argument in RADIANS. The angle must be converted before the call: 60 * PI / 180 is about 1.0472 radians, and its cosine is 0.5. cos(60) treats 60 as radians, and converting the result afterwards makes no sense.",
    hints: ["What unit do the math.h trig functions expect?", "degrees * PI / 180 = radians.", "Convert the argument, not the answer."],
    source: "2022 SPRING Final Q24"
  });
  add({ id: "c4-bxc-026", chapter: 4, t: 3, k: 'mcq', tag: "Concept",
    q: "Which claim about calling functions is TRUE?",
    c: ["When an array is passed to a function, the function receives a full copy of every element.", "Each active call has its own memory for its parameters and locals, so a very deep chain of recursive calls can run out of memory.", "If a call contains no & operator, nothing is being passed by address.", "None of the above."], a: 1,
    why: "Every call that has not yet returned keeps a stack frame, so very deep recursion can overflow the stack. Passing an array actually passes the address of its first element (no & needed), which also makes the other two statements false.",
    hints: ["What does an array name turn into when it is passed?", "Where are parameters and locals stored while a call is active?", "Can an address be passed without writing &?"],
    source: "2022 SPRING Final Q26"
  });
  add({ id: "c4-bxc-027", chapter: 4, t: 2, k: 'mcq', tag: "Concept",
    q: "Which claim about prototypes and function definitions is FALSE?",
    c: ["A prototype may leave out parameter names, as in double area(double, double);", "The header of a function definition ends with a semicolon, placed just before the opening brace of the body.", "The return type in the prototype must match the return type in the definition.", "None of the above."], a: 1,
    why: "A prototype ends with a semicolon, but a definition header must be followed directly by the body; a semicolon there makes the { ... } block stray code and gcc reports an error. The other statements are true.",
    hints: ["Compare a prototype line with the first line of the matching definition.", "What would the compiler think the { } block belongs to?", "Only the declaration ends with ;."],
    source: "2022 SPRING Final Q27"
  });
  add({ id: "c4-bxc-028", chapter: 4, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\ndouble inchesToCm(int);\nint feetToInches(double);\n\nint main(void)\n{\n  double r1;\n  double r2;\n\n  r1 = inchesToCm(10 / 4);\n  r2 = feetToInches(2.75) / 5;\n  printf(\"Result #1: %.2f\\n\", r1);\n  printf(\"Result #2: %.2f\\n\", r2);\n\n  return 0;\n}\n\ndouble inchesToCm(int in)\n{\n  return in * 2.54;\n}\n\nint feetToInches(double ft)\n{\n  return ft * 12;\n}",
    q: "What is the FIRST line of output?",
    c: ["Result #1: 6.35", "Result #1: 5.08", "Result #1: 5.00", "None of the above."], a: 1,
    why: "10 / 4 is evaluated in main as int division: 2. inchesToCm receives 2 and returns 2 * 2.54 = 5.08. 6.35 assumes 2.5 inches were passed.",
    hints: ["The argument expression is evaluated before the call.", "What is 10 / 4 with two int operands?", "Multiply the received value by 2.54."],
    source: "2022 SPRING Final Q28"
  });
  add({ id: "c4-bxc-029", chapter: 4, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\ndouble inchesToCm(int);\nint feetToInches(double);\n\nint main(void)\n{\n  double r1;\n  double r2;\n\n  r1 = inchesToCm(10 / 4);\n  r2 = feetToInches(2.75) / 5;\n  printf(\"Result #1: %.2f\\n\", r1);\n  printf(\"Result #2: %.2f\\n\", r2);\n\n  return 0;\n}\n\ndouble inchesToCm(int in)\n{\n  return in * 2.54;\n}\n\nint feetToInches(double ft)\n{\n  return ft * 12;\n}",
    q: "Using the same program, what is the SECOND line of output?",
    c: ["Result #2: 6.60", "Result #2: 7.00", "Result #2: 6.00", "None of the above."], a: 2,
    why: "feetToInches computes 2.75 * 12 = 33.0 but its return type is int, so 33 comes back. In main, 33 / 5 is int division: 6, stored in r2 as 6.00.",
    hints: ["What type does feetToInches return?", "Is 33 / 5 an int or a double division?", "The conversion to double happens only at the assignment."],
    source: "2022 SPRING Final Q29"
  });
  add({ id: "c4-bxc-030", chapter: 4, t: 3, k: 'mcq', tag: "Concept",
    code: "#include <stdio.h>\n\ndouble inchesToCm(int);\nint feetToInches(double);\n\nint main(void)\n{\n  double r1;\n  double r2;\n\n  r1 = inchesToCm(10 / 4);\n  r2 = feetToInches(2.75) / 5;\n  printf(\"Result #1: %.2f\\n\", r1);\n  printf(\"Result #2: %.2f\\n\", r2);\n\n  return 0;\n}\n\ndouble inchesToCm(int in)\n{\n  return in * 2.54;\n}\n\nint feetToInches(double ft)\n{\n  return ft * 12;\n}",
    q: "Using the same program, which statement about data type conversion is TRUE?",
    c: ["The argument 10 / 4 reaches inchesToCm as 2.5.", "The literal 2.75 is received by feetToInches without any loss of information.", "The return statement in inchesToCm uses an explicit type conversion.", "None of the above."], a: 1,
    why: "feetToInches has a double parameter and 2.75 is a double literal, so nothing is lost. 10 / 4 is already 2 before the call. There is no cast anywhere, so no conversion is explicit.",
    hints: ["Compare the type of each argument with its parameter.", "An explicit conversion needs a (type) cast.", "Integer division happens before the call."],
    source: "2022 SPRING Final Q30"
  });
  add({ id: "c4-bxc-031", chapter: 4, t: 3, k: 'mcq', tag: "Concept",
    q: "Which C expression correctly computes the cube root of (x squared plus one fourth), all divided by 2x? (x is a double; math.h is included.)",
    c: ["pow(x * x + 1 / 4, 1 / 3) / 2 * x", "pow(x * x + (double) (1 / 4), 1.0 / 3) / (2 * x)", "pow(x * x + 1.0 / 4, 1.0 / 3) / (2 * x)", "None of the above."], a: 2,
    why: "1 / 4 and 1 / 3 are int divisions equal to 0, and casting 1 / 4 after dividing still gives 0.0. \"/ 2 * x\" divides by 2 and then MULTIPLIES by x. Only the third option keeps both fractions and divides by the whole 2x. For x = 2 it gives 0.405.",
    hints: ["What is 1 / 3 in C?", "Does a cast fix a division that has already happened?", "a / 2 * x is (a / 2) * x."],
    source: "2022 SPRING Final Q31"
  });

  /* ---- Chapter 5 ---- */
  add({ id: "c5-bxc-001", chapter: 5, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  int p = 4;\n  int q = 0;\n  int r = 2;\n  int s;\n  int t;\n\n  s = q++ || (p-- && r);\n  t = !p || ((r -= 2) && q);\n  printf(\"p: %d\\n\", p);\n  printf(\"s: %d, t: %d\\n\", s, t);\n\n  return 0;\n}",
    q: "What is the FIRST line of output?",
    c: ["p: 4", "p: 3", "p: 2", "None of the above."], a: 1,
    why: "Statement 1: q++ yields 0 (q becomes 1), so || must evaluate its right side. p-- yields 4, which is true (p becomes 3), so && evaluates r = 2: s = 1. Statement 2: !p is !3 = 0, so || evaluates its right side. (r -= 2) makes r 0, which is false, so && short-circuits and q is never examined: t = 0. Only one decrement of p ever runs, so p is 3.",
    hints: ["Is the left operand of || in the first statement true or false?", "Postfix q++ hands over the old value, 0.", "Count how many times p-- actually executes."],
    source: "2021 FALL Exam 2 Q1"
  });
  add({ id: "c5-bxc-002", chapter: 5, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  int p = 4;\n  int q = 0;\n  int r = 2;\n  int s;\n  int t;\n\n  s = q++ || (p-- && r);\n  t = !p || ((r -= 2) && q);\n  printf(\"p: %d\\n\", p);\n  printf(\"s: %d, t: %d\\n\", s, t);\n\n  return 0;\n}",
    q: "Using the same program, what is the SECOND line of output?",
    c: ["s: 1, t: 1", "s: 0, t: 0", "s: 1, t: 0", "None of the above."], a: 2,
    why: "Statement 1: q++ yields 0 (q becomes 1), so || must evaluate its right side. p-- yields 4, which is true (p becomes 3), so && evaluates r = 2: s = 1. Statement 2: !p is !3 = 0, so || evaluates its right side. (r -= 2) makes r 0, which is false, so && short-circuits and q is never examined: t = 0.",
    hints: ["A logical operator always produces 0 or 1.", "For t, the left operand !p uses the CURRENT p.", "What is the value of (r -= 2)?"],
    source: "2021 FALL Exam 2 Q2"
  });
  add({ id: "c5-bxc-003", chapter: 5, t: 3, k: 'mcq', tag: "Concept",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  int p = 4;\n  int q = 0;\n  int r = 2;\n  int s;\n  int t;\n\n  s = q++ || (p-- && r);\n  t = !p || ((r -= 2) && q);\n  printf(\"p: %d\\n\", p);\n  printf(\"s: %d, t: %d\\n\", s, t);\n\n  return 0;\n}",
    q: "Using the same program, which logical operator short-circuits?",
    c: ["The || in the statement that assigns s.", "The && in the statement that assigns s.", "The && in the statement that assigns t.", "None of the above."], a: 2,
    why: "Statement 1: q++ yields 0 (q becomes 1), so || must evaluate its right side. p-- yields 4, which is true (p becomes 3), so && evaluates r = 2: s = 1. Statement 2: !p is !3 = 0, so || evaluates its right side. (r -= 2) makes r 0, which is false, so && short-circuits and q is never examined: t = 0. An instrumented copy of the program confirms that every operand except the final q is evaluated.",
    hints: ["|| short-circuits only when its left side is true; && only when its left side is false.", "Find the left operand of each operator and its value at that moment.", "In the second statement, r -= 2 produces 0."],
    source: "2021 FALL Exam 2 Q3"
  });
  add({ id: "c5-bxc-004", chapter: 5, t: 3, k: 'mcq', tag: "Concept",
    q: "Which claim about switch statements is FALSE?",
    c: ["Each case label must be an integral constant expression, so case 'Y': is allowed.", "Leaving out a break lets execution continue into the statements of the next case.", "Two case labels with the same value inside one switch cause a compile-time error.", "None of the above."], a: 3,
    why: "All three are true. Character constants are integral constants, missing breaks cause fall-through, and duplicate case values are rejected by the compiler.",
    hints: ["It is possible that none of the statements is false.", "Is 'Y' an integer constant in C?", "What does gcc say about \"duplicate case value\"?"],
    source: "2021 FALL Exam 2 Q7"
  });
  add({ id: "c5-bxc-005", chapter: 5, t: 4, k: 'mcq', tag: "Concept",
    code: "#define LIMIT 9\n\nint main(void)\n{\n  const int limit = 9;\n  int code = 9;\n\n  switch (code)\n  {\n    /* case label goes here */\n      printf(\"match\\n\");\n      break;\n  }\n\n  return 0;\n}",
    q: "Which case label, placed at the comment, causes a compile-time error in C?",
    c: ["case 3 * 3:", "case '9' - '0':", "case LIMIT:", "case limit:", "None of the above."], a: 3,
    why: "A case label must be an integer CONSTANT expression. 3 * 3, '9' - '0' and the macro LIMIT (replaced by 9 before compiling) all qualify. In C a const int variable is still a variable, not a constant expression, so case limit: is rejected.",
    hints: ["The label must be known when the program is compiled.", "What does the preprocessor turn LIMIT into?", "In C (unlike C++), const does not make a constant expression."],
    source: "2021 FALL Exam 2 Q7"
  });
  add({ id: "c5-bxc-006", chapter: 5, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  int x = 2;\n  int y = 0;\n\n  while (x % 7 != 0 && y < 3)\n  {\n    x = x * 3 + 2;\n    y++;\n  }\n  printf(\"x: %d, y: %d\\n\", x, y);\n\n  return 0;\n}",
    q: "What is printed?",
    c: ["x: 26, y: 2", "x: 80, y: 3", "x: 728, y: 5", "None of the above."], a: 1,
    why: "x goes 2, 8, 26, 80 while y goes 0, 1, 2, 3. None of those x values is a multiple of 7, but once y reaches 3 the && becomes false and the loop stops: x: 80, y: 3.",
    hints: ["Both conditions must be true for the loop to continue.", "Make a table of x, x % 7 and y after each pass.", "Which condition fails first?"],
    source: "2021 FALL Exam 2 Q11"
  });
  add({ id: "c5-bxc-007", chapter: 5, t: 4, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  int x = 3;\n  int y = 0;\n\n  while (x % 11 != 0 && y++ < 3)\n  {\n    x = x * 2 + 4;\n  }\n  printf(\"x: %d, y: %d\\n\", x, y);\n\n  return 0;\n}",
    q: "What is printed?",
    c: ["x: 52, y: 3", "x: 52, y: 4", "x: 108, y: 4", "None of the above."], a: 1,
    why: "y++ < 3 is checked only when x % 11 != 0 is true, and y is incremented every time it is checked. The checks with y = 0, 1, 2 pass, so x goes 3, 10, 24, 52. Then 52 % 11 = 8 is nonzero, so y++ < 3 is checked again: 3 < 3 is false but y still becomes 4.",
    hints: ["The increment is part of the condition, not the body.", "Does the final, failing test of y++ < 3 still increment y?", "Track x and y after every evaluation of the condition."],
    source: "2021 FALL Exam 2 Q11"
  });
  add({ id: "c5-bxc-008", chapter: 5, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  int x = 2;\n  int y = 0;\n\n  while (x % 7 != 0 || y < 3)\n  {\n    x = x * 3 + 2;\n    y++;\n  }\n  printf(\"x: %d, y: %d\\n\", x, y);\n\n  return 0;\n}",
    q: "The && in the loop condition is replaced by ||, as shown. What is printed now?",
    c: ["x: 80, y: 3", "x: 242, y: 4", "x: 728, y: 5", "None of the above."], a: 2,
    why: "With ||, the loop continues while EITHER condition holds, so it stops only when x is a multiple of 7 AND y >= 3. x goes 2, 8, 26, 80, 242, 728; 728 = 7 * 104, and by then y = 5.",
    hints: ["When is (A || B) false?", "After y reaches 3, only the multiple-of-7 test can stop the loop.", "Keep going: 80 * 3 + 2, then once more."],
    source: "2021 FALL Exam 2 Q12"
  });
  add({ id: "c5-bxc-009", chapter: 5, t: 4, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  int x = 3;\n  int y = 0;\n\n  while (y++ < 3 || x % 11 != 0)\n  {\n    x = x * 2 + 4;\n  }\n  printf(\"x: %d, y: %d\\n\", x, y);\n\n  return 0;\n}",
    q: "The loop condition is rewritten with || and the operands swapped, as shown. What is printed now?",
    c: ["x: 220, y: 5", "x: 220, y: 6", "x: 52, y: 4", "None of the above."], a: 1,
    why: "y++ is now the left operand, so it runs on EVERY test. The tests with y = 0, 1, 2 are true (x goes to 10, 24, 52). After that y++ < 3 is false, so x % 11 is checked: 52 and 108 are not multiples of 11, so the loop continues to 108 and 220. The test that finally stops it (220 % 11 == 0) also incremented y, to 6.",
    hints: ["Which operand is evaluated first on every test?", "Count the evaluations of the condition: each one adds 1 to y.", "The loop ends only when y++ < 3 is false AND x is a multiple of 11."],
    source: "2021 FALL Exam 2 Q12"
  });
  add({ id: "c5-bxc-010", chapter: 5, t: 3, k: 'mcq', tag: "Concept",
    code: "int getHour(void)\n{\n  int hour;\n\n  printf(\"Enter hour (0-23): \");\n  scanf(\"%d\", &hour);\n  if (/* condition */)\n  {\n    printf(\"Error: hour out of range\\n\");\n  }\n\n  return hour;\n}",
    q: "Which condition should replace the comment so the error message appears exactly when hour is NOT a valid hour from 0 to 23?",
    c: ["hour < 0 || hour > 24", "hour < 0 && hour >= 24", "hour < 0 || hour >= 24", "None of the above."], a: 2,
    why: "The valid range is 0 <= hour <= 23, so the invalid test is its complement: hour < 0 || hour >= 24 (equivalently hour > 23). hour > 24 lets 24 through; joining with && can never be true.",
    hints: ["Write the VALID condition first, then complement it.", "Can a number be below 0 and at least 24 at the same time?", "Test the boundary values 23 and 24."],
    source: "2021 FALL Exam 2 Q22"
  });
  add({ id: "c5-bxc-011", chapter: 5, t: 3, k: 'mcq', tag: "Concept",
    code: "do\n{\n  printf(\"Enter month (1-12): \");\n  scanf(\"%d\", &month);\n} while (/* condition */);",
    q: "The loop must keep asking until the user types a valid month from 1 to 12. Which condition should replace the comment?",
    c: ["month >= 1 && month <= 12", "!(month >= 1 && month <= 12)", "month < 1 && month > 12", "None of the above."], a: 1,
    why: "A do-while repeats while its condition is TRUE, so the condition must describe an INVALID month: the complement of the valid range, !(month >= 1 && month <= 12). The first option repeats on valid input; the third can never be true, so it never repeats.",
    hints: ["When does a do-while loop run again?", "Should the condition describe good input or bad input?", "Negating a whole condition gives its complement."],
    source: "2021 FALL Exam 2 Q23"
  });
  add({ id: "c5-bxc-012", chapter: 5, t: 3, k: 'mcq', tag: "Trace",
    code: "int a = 0;\nint b = 2;\nint c = -1;\nint r;\n\nr = a-- || (++b && c++);\nprintf(\"a: %d, b: %d, c: %d\\n\", a, b, c);\nprintf(\"r: %d\\n\", r);",
    q: "What is the FIRST line of output?",
    c: ["a: -1, b: 2, c: -1", "a: -1, b: 3, c: 0", "a: 0, b: 3, c: 0", "None of the above."], a: 1,
    why: "a-- yields 0 (false) and makes a -1, so || must evaluate the right side. ++b gives 3 (true), so && evaluates c++, which yields -1 (true) and makes c 0. Nothing short-circuits here.",
    hints: ["Postfix a-- hands over the OLD value of a.", "Is 0 true or false? Is -1 true or false?", "Every operand that gets evaluated also performs its side effect."],
    source: "2021 FALL Exam 2 Q27"
  });
  add({ id: "c5-bxc-013", chapter: 5, t: 4, k: 'mcq', tag: "Trace",
    code: "int a = 2;\nint b = -1;\nint c = 0;\nint r;\n\nif ((c++ && ++a) || b++)\n{\n  a += 10;\n}\nr = !(a > 2) || (b-- && --c);\nprintf(\"a: %d, b: %d, c: %d, r: %d\\n\", a, b, c, r);",
    q: "What is printed?",
    c: ["a: 13, b: 0, c: 1, r: 1", "a: 12, b: -1, c: 1, r: 0", "a: 12, b: -1, c: 0, r: 0", "None of the above."], a: 1,
    why: "In the if: c++ yields 0, so && short-circuits (++a is skipped) and c becomes 1. || then evaluates b++, which yields -1 (true) and makes b 0, so a becomes 12. Next: !(12 > 2) is 0, so b-- runs: it yields 0 (false) and makes b -1, so && short-circuits and --c is skipped. r = 0.",
    hints: ["c++ is false because its value is the old c.", "Which increments and decrements are skipped by short-circuiting?", "b-- produces 0, so what happens to --c?"],
    source: "2021 FALL Exam 2 Q27"
  });
  add({ id: "c5-bxc-014", chapter: 5, t: 3, k: 'mcq', tag: "Concept",
    q: "Consider these four expressions (x and y are int):\nL1: x > 3 && y != 0\nL2: x <= 3 || y == 0\nL3: x < 3 || y == 0\nL4: !(x > 3) && y == 0\nWhich pair are complements of each other (one is true exactly when the other is false)?",
    c: ["L1 and L3", "L2 and L4", "L1 and L2", "None of the above."], a: 2,
    why: "By De Morgan, the complement of x > 3 && y != 0 is x <= 3 || y == 0: each comparison is complemented and && becomes ||. L3 uses x < 3, which misses x == 3. L2 and L4 agree whenever x <= 3 and y == 0, so they are not complements.",
    hints: ["Complement each relational operator: > becomes <=, != becomes ==.", "Then swap && and ||.", "Test x = 3, y = 1 in L1 and L3."],
    source: "2021 FALL Exam 2 Q28"
  });
  add({ id: "c5-bxc-015", chapter: 5, t: 3, k: 'mcq', tag: "Concept",
    q: "Which statement about comparing double values is TRUE?",
    c: ["On typical IEEE-754 systems, 0.1 + 0.2 == 0.3 evaluates to 1.", "Testing fabs(a - b) < 1e-9 is a safer way to decide that two computed doubles are equal than a == b.", "A double variable may be used as the control expression of a switch statement.", "None of the above."], a: 1,
    why: "Most decimal fractions cannot be stored exactly, so 0.1 + 0.2 is not exactly 0.3 and == gives 0. Comparing the difference to a small tolerance is the reliable test. A switch requires an integral expression.",
    hints: ["Can 0.1 be stored exactly in binary?", "Run printf(\"%d\", 0.1 + 0.2 == 0.3);.", "What type must a switch expression have?"],
    source: "2021 FALL Exam 2 Q31"
  });
  add({ id: "c5-bxc-016", chapter: 5, t: 2, k: 'mcq', tag: "Concept",
    q: "Which statement about a multiway else-if chain is TRUE?",
    c: ["At most one branch of the chain is executed.", "Every condition in the chain is always evaluated, even after one is found true.", "Any else-if chain can be rewritten as a switch statement.", "None of the above."], a: 0,
    why: "Conditions are tested top to bottom and the first true one wins; the remaining conditions are skipped. A switch cannot replace chains that test ranges or doubles, such as score >= 90.",
    hints: ["What happens after the first true condition?", "Can a case label express \"score >= 90\"?", "The final else runs only if every earlier test was false."],
    source: "2021 FALL Exam 2 Q34"
  });
  add({ id: "c5-bxc-017", chapter: 5, t: 3, k: 'mcq', tag: "Concept",
    q: "a and b are int variables. Where would using the expression (a > b && b > 0) cause a compile-time error?",
    c: ["As the condition of a while loop.", "As an argument to printf matched with %d.", "As the value tested by switch ( ... ).", "None of the above."], a: 3,
    why: "A logical expression has type int with value 0 or 1, so it is legal anywhere an int value is: a loop condition, a function argument, even a switch expression (case 0: and case 1:). gcc may warn about a switch on a boolean value, but it is not an error.",
    hints: ["What is the type of the result of &&?", "A switch needs an integer expression. Is 0 or 1 an integer?", "A warning is not the same as a syntax error."],
    source: "2022 SPRING Final Q3"
  });
  add({ id: "c5-bxc-018", chapter: 5, t: 4, k: 'mcq', tag: "Concept",
    q: "Which statement about using logical expressions is TRUE?",
    c: ["The value of a logical expression is an int, 0 or 1, so it can be stored in an int variable.", "A logical expression may not appear on the right side of an assignment.", "A logical expression that contains variables can be used as a case label.", "None of the above."], a: 0,
    why: "In C, relational and logical operators produce the int values 0 and 1, so int ok = (x > 0 && x < 10); is legal. Case labels, however, must be constant expressions, so a logical expression with variables is not allowed there.",
    hints: ["What does printf(\"%d\", 3 > 2) print?", "Can you write int ok = (x > 0);?", "Case labels must be known at compile time."],
    source: "2022 SPRING Final Q3"
  });
  add({ id: "c5-bxc-019", chapter: 5, t: 3, k: 'mcq', tag: "Trace",
    code: "int x = 312;\n\nif (x % 4 == 0)\n{\n  x += 3;\n}\nif (x % 5 == 0)\n{\n  x += 2;\n}\nelse if (x % 3 == 0)\n{\n  x -= 1;\n}\nelse\n{\n  x += 4;\n}\nprintf(\"x: %d\\n\", x);",
    q: "What is printed?",
    c: ["x: 315", "x: 317", "x: 314", "None of the above."], a: 1,
    why: "The first if is a separate statement: 312 % 4 == 0, so x becomes 315. The second statement then tests the NEW x: 315 % 5 == 0, so x becomes 317 and the rest of that chain is skipped. Testing the original 312 in the second chain would give 314.",
    hints: ["How many separate if statements are there?", "The second chain sees the value after the first if ran.", "In an else-if chain, only the first true branch runs."],
    source: "2022 SPRING Final Q7"
  });
  add({ id: "c5-bxc-020", chapter: 5, t: 4, k: 'mcq', tag: "Trace",
    code: "int x = 47;\n\nswitch (x % 6)\n{\n  case 1:\n  case 5:\n    x += 10;\n  case 3:\n    x *= 2;\n    break;\n  case 0:\n    x -= 7;\n  default:\n    x++;\n}\nprintf(\"x: %d\\n\", x);",
    q: "What is printed?",
    c: ["x: 57", "x: 114", "x: 115", "None of the above."], a: 1,
    why: "47 % 6 = 5, so execution starts at case 5: x = 57. There is no break, so it falls into case 3: x = 114, and that break leaves the switch. The default is never reached.",
    hints: ["Compute 47 % 6 first.", "Without break, execution continues into the next case.", "Where is the first break after case 5?"],
    source: "2022 SPRING Final Q7"
  });
  add({ id: "c5-bxc-021", chapter: 5, t: 3, k: 'mcq', tag: "Trace",
    code: "int y = 230;\nint z = 455;\n\nif (y > z / 2)\n{\n  y -= 15;\n  if (z % 10 == 5)\n  {\n    z += y % 100;\n  }\n  else\n  {\n    z -= 1;\n  }\n}\nelse\n{\n  y += z;\n}\nprintf(\"y: %d z: %d\\n\", y, z);",
    q: "What is printed?",
    c: ["y: 215 z: 485", "y: 685 z: 455", "y: 215 z: 470", "None of the above."], a: 2,
    why: "z / 2 = 227, and 230 > 227, so y becomes 215. 455 % 10 == 5, so z += 215 % 100, which is 15: z = 470. Using the old y (230 % 100 = 30) would give 485.",
    hints: ["z / 2 is integer division.", "y is updated before the inner if uses it.", "What is 215 % 100?"],
    source: "2022 SPRING Final Q8"
  });
  add({ id: "c5-bxc-022", chapter: 5, t: 2, k: 'mcq', tag: "Concept",
    q: "Which statement about logical data in C is TRUE?",
    c: ["A negative value such as -3 is treated as false in a logical context.", "The expression !(-3) evaluates to 0.", "The logical NOT of 0 is -1.", "None of the above."], a: 1,
    why: "Any nonzero value, including -3, is true, so !(-3) is 0. The logical NOT of 0 is 1, not -1.",
    hints: ["Which single value is false in C?", "Is -3 zero?", "Logical operators always produce 0 or 1."],
    source: "2022 SPRING Final Q9"
  });
  add({ id: "c5-bxc-023", chapter: 5, t: 2, k: 'mcq', tag: "Concept",
    q: "Which requirement below is NOT actually enforced by C for a switch?",
    c: ["The case label values within one switch must all be different.", "Every case must end with a break statement.", "The control expression must have an integral type (char counts).", "None of the above."], a: 1,
    why: "break is optional; leaving it out causes fall-through, which is legal (and sometimes intended). Unique labels and an integral expression are real rules.",
    hints: ["Which of these would the compiler actually enforce?", "Does a switch without any break compile?", "Fall-through is a feature, even if it is often a bug."],
    source: "2022 SPRING Final Q13"
  });
  add({ id: "c5-bxc-024", chapter: 5, t: 3, k: 'mcq', tag: "Concept",
    q: "m and n are int variables. Which pair of expressions are EQUIVALENT (always the same truth value)?\nP: !(m && !n)\nQ: !m || n\nR: !m && n\nS: m || !n",
    c: ["P and R", "P and Q", "R and S", "None of the above."], a: 1,
    why: "By De Morgan, !(m && !n) = !m || !!n, which has the same truth value as !m || n. R and S are complements, not equivalents: S is exactly !(!m && n).",
    hints: ["Apply De Morgan to P: negate each operand and flip the operator.", "What does a double negation do to a truth value?", "Equivalent pairs agree on every input; complements disagree on every input."],
    source: "2022 SPRING Final Q16"
  });
  add({ id: "c5-bxc-025", chapter: 5, t: 3, k: 'mcq', tag: "Concept",
    q: "p and q are int variables. Which pair of expressions are COMPLEMENTS (one is true exactly when the other is false)?\nE: !(p || !q)\nF: !p && q\nG: p && !q\nH: !p || q",
    c: ["E and F", "F and H", "E and G", "None of the above."], a: 3,
    why: "E and F are equivalent (De Morgan), not complements. F and H agree whenever p is 0 and q is nonzero. E and G are both false when p and q are both 0. None of the listed pairs is complementary (the complementary pair here is G and H).",
    hints: ["Complements must disagree for EVERY combination of p and q.", "Try p = 0, q = 0 in each pair.", "Is an equivalent pair ever a complementary pair?"],
    source: "2022 SPRING Final Q17"
  });
  add({ id: "c5-bxc-026", chapter: 5, t: 4, k: 'mcq', tag: "Concept",
    q: "p and q are int variables. Which pair of expressions are COMPLEMENTS (one is true exactly when the other is false)?\nE: !(p || !q)\nF: !p && q\nG: p && !q\nH: !p || q",
    c: ["E and F", "G and H", "F and G", "None of the above."], a: 1,
    why: "Applying De Morgan to G = p && !q gives its complement !p || !!q, which has the same truth value as !p || q = H. E and F are equivalent, and F and G are both false when p and q are both 0.",
    hints: ["Write the complement of G using De Morgan.", "!!q has the same truth value as q.", "Do not confuse equivalent pairs with complementary pairs."],
    source: "2022 SPRING Final Q17"
  });

  /* ---- Chapter 6 ---- */
  add({ id: "c6-bxc-001", chapter: 6, t: 2, k: 'mcq', tag: "Concept",
    q: "Which claim about C for loops is FALSE?",
    c: ["Each of the three expressions in a for header may be left empty; for (;;) is legal.", "The update (third) expression runs once before the control expression is tested for the first time.", "When a for loop ends normally, its control expression has been evaluated one more time than the body has run.", "None of the above."], a: 1,
    why: "Order of a for loop: initialization once, then test, body, update, test, body, update, ... The update never runs before the first test. The other two statements are true.",
    hints: ["Write out the order: init, test, body, update, ...", "When does the update run for the first time?", "The final test is the one that comes out false."],
    source: "2021 FALL Final Q45"
  });
  add({ id: "c6-bxc-002", chapter: 6, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  char grades[6] = {'B', 'A', 'C', 'X', 'A', 'B'};\n  int i;\n  int points = 0;\n  int count = 0;\n  double gpa;\n\n  for (i = 5; i > 0; i--)\n  {\n    switch (grades[i])\n    {\n      case 'A':\n        points += 4;\n        count++;\n        break;\n      case 'B':\n        points += 3;\n        count++;\n        break;\n      case 'C':\n        points += 2;\n        count++;\n      default:\n        printf(\"unknown grade\\n\");\n    }\n  }\n  gpa = (double) points / count;\n  printf(\"GPA: %.2f\\n\", gpa);\n\n  return 0;\n}",
    q: "What is the LAST line of output?",
    c: ["GPA: 3.20", "GPA: 3.25", "GPA: 3.00", "None of the above."], a: 1,
    why: "The loop visits indexes 5, 4, 3, 2, 1 (index 0 is skipped because the test is i > 0). B: 3 points, A: 4, X: unknown, C: 2 points and then, with no break, it falls into default and also prints \"unknown grade\", A: 4. That is 13 points over 4 counted grades. 13 / 4 = 3.25 (the cast makes it a real division).",
    hints: ["Which indexes does the loop visit? Check the test i > 0.", "Case C has no break: what runs after points += 2 and count++?", "The cast applies to points before the division."],
    source: "2021 FALL Exam 2 Q4"
  });
  add({ id: "c6-bxc-003", chapter: 6, t: 4, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  char grades[6] = {'B', 'A', 'C', 'X', 'A', 'B'};\n  int i;\n  int points = 0;\n  int count = 0;\n  double gpa;\n\n  for (i = 5; i >= 0; i--)\n  {\n    switch (grades[i])\n    {\n      case 'A':\n        points += 4;\n        count++;\n        break;\n      case 'B':\n        points += 3;\n        count++;\n        break;\n      case 'C':\n        points += 2;\n        count++;\n      default:\n        printf(\"unknown grade\\n\");\n    }\n  }\n  gpa = points / count;\n  printf(\"GPA: %.2f\\n\", gpa);\n\n  return 0;\n}",
    q: "In this version the loop test is i >= 0 and the cast has been removed. What is the LAST line of output?",
    c: ["GPA: 3.20", "GPA: 3.00", "GPA: 3.25", "None of the above."], a: 1,
    why: "Now index 0 (another B) is included: 16 points over 5 grades. points / count is int / int, so 16 / 5 = 3, and only then is it stored as 3.0 in gpa. The cast was what made the earlier version a real division.",
    hints: ["Which extra grade does i >= 0 include?", "Both points and count are int.", "Storing into a double happens after the division."],
    source: "2021 FALL Exam 2 Q4"
  });
  add({ id: "c6-bxc-004", chapter: 6, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  char grades[6] = {'B', 'A', 'C', 'X', 'A', 'B'};\n  int i;\n  int points = 0;\n  int count = 0;\n  double gpa;\n\n  for (i = 5; i > 0; i--)\n  {\n    switch (grades[i])\n    {\n      case 'A':\n        points += 4;\n        count++;\n        break;\n      case 'B':\n        points += 3;\n        count++;\n        break;\n      case 'C':\n        points += 2;\n        count++;\n      default:\n        printf(\"unknown grade\\n\");\n    }\n  }\n  gpa = (double) points / count;\n  printf(\"GPA: %.2f\\n\", gpa);\n\n  return 0;\n}",
    q: "In the original program (loop test i > 0, with the cast), how many times is \"unknown grade\" printed?",
    c: ["One time.", "Two times.", "Three times.", "None of the above."], a: 1,
    why: "The loop visits indexes 5, 4, 3, 2, 1 (index 0 is skipped because the test is i > 0). B: 3 points, A: 4, X: unknown, C: 2 points and then, with no break, it falls into default and also prints \"unknown grade\", A: 4. That is 13 points over 4 counted grades. So the message appears for X and again for C: two times.",
    hints: ["Which grade has no matching case at all?", "Look for a case without a break.", "Index 0 is never visited."],
    source: "2021 FALL Exam 2 Q5"
  });
  add({ id: "c6-bxc-005", chapter: 6, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  char grades[6] = {'B', 'A', 'C', 'X', 'A', 'B'};\n  int i;\n  int points = 0;\n  int count = 0;\n  double gpa;\n\n  for (i = 5; i >= 0; i--)\n  {\n    switch (grades[i])\n    {\n      case 'A':\n        points += 4;\n        count++;\n        break;\n      case 'B':\n        points += 3;\n        count++;\n        break;\n      case 'C':\n        points += 2;\n        count++;\n      default:\n        printf(\"unknown grade\\n\");\n    }\n  }\n  gpa = (double) points / count;\n  printf(\"GPA: %.2f\\n\", gpa);\n\n  return 0;\n}",
    q: "The loop test is changed to i >= 0 (the cast stays). What is the LAST line of output?",
    c: ["GPA: 3.25", "GPA: 3.20", "GPA: 3.00", "None of the above."], a: 1,
    why: "The loop now also visits index 0, a B: 16 points over 5 counted grades, and 16.0 / 5 = 3.20.",
    hints: ["What is stored at index 0?", "Update both the total and the count.", "The cast is still there, so the division is real."],
    source: "2021 FALL Exam 2 Q6"
  });
  add({ id: "c6-bxc-006", chapter: 6, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  int x = 3075812;\n  int y = 0;\n\n  while (x > 0)\n  {\n    if (x % 10 % 3 == 0)\n    {\n      y++;\n    }\n    x /= 10;\n  }\n  printf(\"y: %d\\n\", y);\n\n  return 0;\n}",
    q: "What is printed?",
    c: ["y: 1", "y: 2", "y: 3", "None of the above."], a: 1,
    why: "The loop looks at the digits from the right: 2, 1, 8, 5, 7, 0, 3. A digit passes if it is divisible by 3: that is 0 and 3, so y = 2. Zero counts, because 0 % 3 == 0.",
    hints: ["x % 10 is the last digit; x /= 10 removes it.", "List all seven digits.", "Is 0 divisible by 3?"],
    source: "2021 FALL Exam 2 Q8"
  });
  add({ id: "c6-bxc-007", chapter: 6, t: 3, k: 'mcq', tag: "Concept",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  int x = 3075812;\n  int y = 0;\n\n  while (x > 0)\n  {\n    if (x % 10 % 3 == 0)\n    {\n      y++;\n    }\n    x /= 10;\n  }\n  printf(\"y: %d\\n\", y);\n\n  return 0;\n}",
    q: "In the same program, how many times is the test x > 0 checked?",
    c: ["Seven times.", "Eight times.", "Nine times.", "None of the above."], a: 1,
    why: "The body runs once per digit, 7 times. A pretest loop evaluates its condition once more than the number of iterations (the final, false test when x is 0): 8.",
    hints: ["How many digits does 3075812 have?", "Each iteration is preceded by one test.", "Do not forget the test that ends the loop."],
    source: "2021 FALL Exam 2 Q9"
  });
  add({ id: "c6-bxc-008", chapter: 6, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  int x = 9060;\n  int y = 0;\n\n  while (x > 0)\n  {\n    if (x % 10 % 3 == 0)\n    {\n      y++;\n    }\n    x /= 10;\n  }\n  printf(\"y: %d\\n\", y);\n\n  return 0;\n}",
    q: "Suppose x starts at 9060 instead, as shown. What is printed?",
    c: ["y: 2", "y: 3", "y: 4", "None of the above."], a: 2,
    why: "The digits examined are 0, 6, 0, 9. All four are divisible by 3 (zero included), so y = 4. Note that the zeros are processed: x is still positive while they are being removed.",
    hints: ["Is 9060 > 0 when the last digit 0 is examined?", "Is 906 > 0 when its 6 is examined? And 90?", "Every digit here is a multiple of 3."],
    source: "2021 FALL Exam 2 Q10"
  });
  add({ id: "c6-bxc-009", chapter: 6, t: 2, k: 'mcq', tag: "Concept",
    q: "A for loop should lower i by 3 after every pass. Which update expression fails to do that?",
    c: ["i -= 3", "i - 3", "i = i - 3", "None of the above."], a: 1,
    why: "i - 3 computes a value and throws it away; i never changes, so the loop never progresses. The update must store a new value into i.",
    hints: ["Which option actually stores into i?", "An expression without assignment has no lasting effect.", "gcc even warns \"statement with no effect\" for one of these."],
    source: "2021 FALL Exam 2 Q17"
  });
  add({ id: "c6-bxc-010", chapter: 6, t: 3, k: 'mcq', tag: "Trace",
    code: "int i;\nint total = 0;\n\nfor (i = 3; total < 20; i += 2)\n{\n  total += i;\n}\nprintf(\"i: %d\\n\", i);",
    q: "What is printed?",
    c: ["i: 9", "i: 11", "i: 13", "None of the above."], a: 1,
    why: "total grows 3, 8, 15, 24 as i takes 3, 5, 7, 9. After the body adds 9, the update still runs (i becomes 11) before the test total < 20 fails.",
    hints: ["The loop tests total, not i.", "After the last body, the update runs once more.", "Make a table of i and total."],
    source: "2021 FALL Exam 2 Q18"
  });
  add({ id: "c6-bxc-011", chapter: 6, t: 4, k: 'mcq', tag: "Trace",
    code: "int i;\nint count = 0;\n\nfor (i = 0; i < 12; i += 5);\n{\n  count++;\n}\nprintf(\"i: %d, count: %d\\n\", i, count);",
    q: "What is printed?",
    c: ["i: 10, count: 3", "i: 15, count: 3", "i: 15, count: 1", "None of the above."], a: 2,
    why: "The semicolon after the for header is an empty body, so the loop only updates i: 0, 5, 10, 15. The block that follows is not part of the loop and runs once. (gcc -Wall even warns that this for clause does not guard the block.)",
    hints: ["Look closely at the end of the for line.", "What is the body of this loop?", "The value of i is the first one that makes i < 12 false."],
    source: "2021 FALL Exam 2 Q18"
  });
  add({ id: "c6-bxc-012", chapter: 6, t: 3, k: 'mcq', tag: "Trace",
    code: "int x = 8;\nint y = 0;\n\nwhile (x-- > 3)\n{\n  y++;\n}\nprintf(\"y: %d x: %d\\n\", y, x);",
    q: "What is printed?",
    c: ["y: 5 x: 2", "y: 5 x: 3", "y: 4 x: 3", "None of the above."], a: 0,
    why: "The test compares the OLD x with 3 and then decrements. 8, 7, 6, 5, 4 pass (5 iterations). The test with 3 fails, but x is still decremented, to 2.",
    hints: ["x-- > 3 compares first, then decrements.", "Count the values of x that are greater than 3.", "Does the failing test still decrement x?"],
    source: "2021 FALL Exam 2 Q19"
  });
  add({ id: "c6-bxc-013", chapter: 6, t: 4, k: 'mcq', tag: "Trace",
    code: "int x = 9;\nint y = 1;\n\ndo\n{\n  y += 2;\n} while (--x > 4 && y < 10);\nprintf(\"y: %d\\n\", y);",
    q: "What is printed?",
    c: ["y: 9", "y: 11", "y: 13", "None of the above."], a: 1,
    why: "The body always runs first: y = 3. Then tests: x 8 and y 3 pass (y = 5), x 7 (y = 7), x 6 (y = 9), x 5 and y 9 pass (y = 11). Next test: x becomes 4, 4 > 4 is false, so the loop ends with y = 11.",
    hints: ["A do-while runs the body before the first test.", "The prefix --x changes x before it is compared.", "Both conditions must hold for another pass."],
    source: "2021 FALL Exam 2 Q19"
  });
  add({ id: "c6-bxc-014", chapter: 6, t: 2, k: 'mcq', tag: "Concept",
    code: "int k;\nint total = 0;\n\nfor (k = 10; k > 0; k -= 3)\n{\n  total += k;\n}\nprintf(\"total: %d\\n\", total);",
    q: "Which statement best describes this for loop?",
    c: ["FOUR evaluations of the control expression and FOUR iterations.", "FIVE evaluations of the control expression and FOUR iterations.", "FOUR evaluations of the control expression and THREE iterations.", "None of the above."], a: 1,
    why: "k takes 10, 7, 4, 1 (four iterations); the next value, -2, fails the test. Four passing tests plus one failing test = five evaluations.",
    hints: ["List the values of k that enter the body.", "Then add the final test that ends the loop.", "Evaluations = iterations + 1 for a pretest loop that ends normally."],
    source: "2021 FALL Exam 2 Q20"
  });
  add({ id: "c6-bxc-015", chapter: 6, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  int x = 30;\n  int k;\n\n  for (k = 1; k <= 4; k++)\n  {\n    x -= k;\n    if (x % 2 == 0)\n    {\n      printf(\"x: %d\\n\", x);\n    }\n  }\n\n  return 0;\n}",
    q: "Which line is printed FIRST?",
    c: ["x: 29", "x: 24", "x: 27", "None of the above."], a: 1,
    why: "x becomes 29, 27, 24, 20 as k goes 1 to 4, but only even values are printed: 24 and then 20.",
    hints: ["x changes before the test in each iteration.", "Only even values of x are printed.", "Subtract 1, then 2, then 3, then 4."],
    source: "2021 FALL Exam 2 Q24"
  });
  add({ id: "c6-bxc-016", chapter: 6, t: 4, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  int x = 50;\n\n  while ((x -= 7) > 15)\n  {\n    if (x % 3 != 0)\n    {\n      x += 2;\n      printf(\"x: %d\\n\", x);\n    }\n  }\n\n  return 0;\n}",
    q: "Which line is printed FIRST?",
    c: ["x: 43", "x: 45", "x: 41", "None of the above."], a: 1,
    why: "The condition itself subtracts 7: x becomes 43, which is > 15. 43 % 3 = 1, so 2 is added and x: 45 is printed. The printed value is after the += 2.",
    hints: ["The assignment inside the condition happens before the comparison.", "Is 43 a multiple of 3?", "The printf runs after x += 2."],
    source: "2021 FALL Exam 2 Q24"
  });
  add({ id: "c6-bxc-017", chapter: 6, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  int x = 30;\n  int k;\n\n  for (k = 1; k <= 4; k++)\n  {\n    x -= k;\n    if (x % 2 == 0)\n    {\n      printf(\"x: %d\\n\", x);\n    }\n  }\n\n  return 0;\n}",
    q: "Using the for loop program (x starts at 30), which line is printed LAST?",
    c: ["x: 24", "x: 20", "x: 16", "None of the above."], a: 1,
    why: "x goes 29, 27, 24, 20; the loop stops after k = 4. The last even value printed is 20.",
    hints: ["How many iterations does k <= 4 allow?", "Total subtracted is 1 + 2 + 3 + 4.", "Is the final value even?"],
    source: "2021 FALL Exam 2 Q25"
  });
  add({ id: "c6-bxc-018", chapter: 6, t: 4, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  int x = 50;\n\n  while ((x -= 7) > 15)\n  {\n    if (x % 3 != 0)\n    {\n      x += 2;\n      printf(\"x: %d\\n\", x);\n    }\n  }\n\n  return 0;\n}",
    q: "Using the while loop program (x starts at 50), which line is printed LAST?",
    c: ["x: 26", "x: 28", "x: 21", "None of the above."], a: 1,
    why: "Trace: 43 -> 45 printed; 38 -> 40 printed; 33 is a multiple of 3, nothing printed; 26 -> 28 printed; 21 is a multiple of 3; then 14 fails the test. Last line: x: 28.",
    hints: ["Each test subtracts 7 before comparing with 15.", "Multiples of 3 skip both the += 2 and the printf.", "Keep the +2 from earlier passes in x."],
    source: "2021 FALL Exam 2 Q25"
  });
  add({ id: "c6-bxc-019", chapter: 6, t: 2, k: 'mcq', tag: "Concept",
    q: "Which statement regarding nested repetition is FALSE?",
    c: ["If the inner loop is moved into its own function that the outer loop calls, the process is still nested repetition.", "The inner loop completes all of its iterations during each single iteration of the outer loop.", "An inner loop may not use the outer loop's control variable in its own control expression.", "None of the above."], a: 2,
    why: "Inner loops very often depend on the outer variable, e.g. for (j = 0; j <= i; j++) to print a triangle. Nesting is about the process, not about whether both loops are written in the same function.",
    hints: ["Think of printing a triangle of stars.", "Does moving a loop into a function change what the program repeats?", "Which statement forbids something common?"],
    source: "2021 FALL Exam 2 Q26"
  });
  add({ id: "c6-bxc-020", chapter: 6, t: 2, k: 'mcq', tag: "Concept",
    q: "Which claim about C loops is FALSE?",
    c: ["The body of a do-while loop always executes at least once.", "A for loop is a pretest loop.", "If a while loop's condition is false at the start, its body executes exactly once.", "None of the above."], a: 2,
    why: "A while loop tests before its body, so a condition that is false at the start means the body runs zero times. Only the posttest do-while is guaranteed one pass.",
    hints: ["Where is the test in a while loop: before or after the body?", "Which loop is the posttest loop?", "Minimum iterations: while 0, do-while 1."],
    source: "2021 FALL Exam 2 Q30"
  });
  add({ id: "c6-bxc-021", chapter: 6, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nvoid showDigits(int);\n\nint main(void)\n{\n  showDigits(11);\n\n  return 0;\n}\n\nvoid showDigits(int n)\n{\n  int place = 1;\n  int result = 0;\n\n  while (n > 0)\n  {\n    result += n % 3 * place;\n    place *= 10;\n    n /= 3;\n  }\n  printf(\"%d\\n\", result);\n}",
    q: "What is printed?",
    c: ["201", "102", "1011", "None of the above."], a: 1,
    why: "Each pass takes the last base-3 digit of n and places it at the next decimal position. 11 % 3 = 2 (ones place), 3 % 3 = 0 (tens), 1 % 3 = 1 (hundreds): result = 102, which is 11 written in base 3. 201 reverses the digits; 1011 is 11 in base 2.",
    hints: ["n % 3 gives the lowest base-3 digit; n /= 3 removes it.", "place grows 1, 10, 100 so the first digit found is the ones digit.", "Track n: 11, 3, 1, 0."],
    source: "2021 FALL Exam 2 Q32"
  });
  add({ id: "c6-bxc-022", chapter: 6, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nvoid showDigits(int);\n\nint main(void)\n{\n  showDigits(8);\n\n  return 0;\n}\n\nvoid showDigits(int n)\n{\n  int place = 1;\n  int result = 0;\n\n  while (n > 0)\n  {\n    result += n % 3 * place;\n    place *= 10;\n    n /= 3;\n  }\n  printf(\"%d\\n\", result);\n}",
    q: "The call in main is changed to showDigits(8), as shown. What is printed?",
    c: ["22", "1000", "202", "None of the above."], a: 0,
    why: "8 % 3 = 2 (ones), 8 / 3 = 2; 2 % 3 = 2 (tens), 2 / 3 = 0. Result 22, since 2 * 3 + 2 = 8. 1000 is 8 in binary.",
    hints: ["Use base 3, not base 2.", "Track n: 8, 2, 0.", "Check: 2 * 3 + 2 = ?"],
    source: "2021 FALL Exam 2 Q33"
  });
  add({ id: "c6-bxc-023", chapter: 6, t: 3, k: 'mcq', tag: "Trace",
    code: "int x = 100;\n\nwhile (x > 5 && x % 4 != 1)\n{\n  x = x / 2 - 3;\n}\nprintf(\"x: %d\\n\", x);",
    q: "What is printed?",
    c: ["x: 7", "x: 0", "x: 20", "None of the above."], a: 1,
    why: "x goes 100 -> 47 -> 20 -> 7 -> 0 (7 / 2 - 3 = 0). None of 100, 47, 20 or 7 leaves remainder 1 when divided by 4, so the loop only stops when x > 5 fails, at 0.",
    hints: ["Check both conditions for each value of x.", "7 is still greater than 5, so does the loop run again?", "7 / 2 is integer division."],
    source: "2022 SPRING Final Q1"
  });
  add({ id: "c6-bxc-024", chapter: 6, t: 3, k: 'mcq', tag: "Trace",
    code: "int x = 1;\nint y = 0;\n\nwhile (y < 30 || x % 3 != 0)\n{\n  y += x;\n  x += 2;\n}\nprintf(\"y: %d\\n\", y);",
    q: "What is printed?",
    c: ["y: 36", "y: 49", "y: 64", "None of the above."], a: 1,
    why: "y accumulates 1, 4, 9, 16, 25, 36 while x goes 3, 5, 7, 9, 11, 13. At y = 36 the first condition is false, but 13 % 3 != 0 keeps the || true. One more pass: y = 49, x = 15, and now both parts are false.",
    hints: ["With ||, the loop stops only when BOTH parts are false.", "Track x as well as y.", "Check x % 3 when y first reaches 30 or more."],
    source: "2022 SPRING Final Q2"
  });
  add({ id: "c6-bxc-025", chapter: 6, t: 4, k: 'mcq', tag: "Trace",
    code: "int x = 2;\nint y = 5;\n\ndo\n{\n  y += x * 2;\n} while (x++ < 6 && y % 4 != 0);\nprintf(\"x: %d, y: %d\\n\", x, y);",
    q: "What is printed?",
    c: ["x: 6, y: 33", "x: 7, y: 45", "x: 6, y: 45", "None of the above."], a: 1,
    why: "y goes 9, 15, 23, 33, 45 (adding 4, 6, 8, 10, 12). No y value is a multiple of 4, so the loop ends when x++ < 6 is false: x++ compares 6 < 6 and then still increments x to 7.",
    hints: ["The body uses x before the condition increments it.", "Postfix x++ compares the old value.", "Is any of the y values divisible by 4?"],
    source: "2022 SPRING Final Q2"
  });
  add({ id: "c6-bxc-026", chapter: 6, t: 2, k: 'mcq', tag: "Trace",
    code: "int x = 2;\nint i;\n\nfor (i = 1; i < 10; i += 3)\n{\n  x += i * i;\n}\nprintf(\"x: %d\\n\", x);",
    q: "What is printed?",
    c: ["x: 168", "x: 19", "x: 68", "None of the above."], a: 2,
    why: "i takes 1, 4, 7 (10 fails i < 10). x = 2 + 1 + 16 + 49 = 68. Including i = 10 would give 168.",
    hints: ["List the values of i.", "Is 10 < 10?", "Add the squares to the starting value 2."],
    source: "2022 SPRING Final Q5"
  });
  add({ id: "c6-bxc-027", chapter: 6, t: 3, k: 'mcq', tag: "Trace",
    code: "int result = 0;\nint k;\n\nfor (k = 3; k <= 15; k += 4)\n{\n  if (k % 3 == 0)\n  {\n    result += k * 10;\n  }\n  else\n  {\n    result += k;\n  }\n}\nprintf(\"result: %d\\n\", result);",
    q: "What is printed?",
    c: ["result: 48", "result: 198", "result: 217", "None of the above."], a: 1,
    why: "k takes 3, 7, 11, 15. 3 and 15 are multiples of 3, adding 30 and 150; 7 and 11 add themselves. 30 + 7 + 11 + 150 = 198. Stopping before 15 gives 48.",
    hints: ["Is 15 included by k <= 15?", "Which k values are multiples of 3?", "Add the four contributions."],
    source: "2022 SPRING Final Q6"
  });
  add({ id: "c6-bxc-028", chapter: 6, t: 4, k: 'mcq', tag: "Trace",
    code: "int result = 1;\nint k = 1;\n\nwhile (k < 40)\n{\n  result += k;\n  if (result % 2 == 0)\n  {\n    k *= 3;\n  }\n  else\n  {\n    k += 2;\n  }\n}\nprintf(\"result: %d\\n\", result);",
    q: "What is printed?",
    c: ["result: 25", "result: 42", "result: 93", "None of the above."], a: 1,
    why: "result/k: add 1 -> 2 (even, k = 3); add 3 -> 5 (odd, k = 5); add 5 -> 10 (even, k = 15); add 15 -> 25 (odd, k = 17); add 17 -> 42 (even, k = 51). 51 fails k < 40.",
    hints: ["The parity test uses the NEW result.", "Keep a two-column table: result and k.", "The loop test is on k."],
    source: "2022 SPRING Final Q6"
  });
  add({ id: "c6-bxc-029", chapter: 6, t: 3, k: 'mcq', tag: "Concept",
    q: "Which statement regarding repetition and the course standards is FALSE?",
    c: ["Using break to leave a loop early is not permitted by the course standards.", "Recursion is to be applied only to counter-controlled processes.", "A loop may appear in main as long as the work inside it consists mainly of calls to functions the programmer wrote.", "None of the above."], a: 3,
    why: "All three describe the course standards: no control-forcing statements such as break to end loops, recursion only for counter-controlled problems, and loops in main allowed when they mostly call functions.",
    hints: ["It is possible that every statement is a course rule.", "What does the course say about break?", "When is recursion acceptable in this course?"],
    source: "2022 SPRING Final Q10"
  });
  add({ id: "c6-bxc-030", chapter: 6, t: 4, k: 'mcq', tag: "Concept",
    q: "Which statement regarding repetition and the course standards is FALSE?",
    c: ["A loop in main is acceptable when its body mainly calls user-defined functions.", "Reading values until a sentinel is entered is an event-controlled process, and the course standards say it should be solved with recursion.", "Statements like break, which force control out of a loop, should not be used to end it.", "None of the above."], a: 1,
    why: "A sentinel loop is event-controlled, and recursion in this course is reserved for counter-controlled processes (known number of steps). An event-controlled process belongs in a while or do-while loop.",
    hints: ["Is the number of inputs known in advance for a sentinel loop?", "Which kind of process does the course allow recursion for?", "Event-controlled vs counter-controlled."],
    source: "2022 SPRING Final Q10"
  });
  add({ id: "c6-bxc-031", chapter: 6, t: 3, k: 'mcq', tag: "Trace",
    code: "int count = 0;\nint i;\nint j;\n\nfor (i = 2; i <= 20; i += 3)\n{\n  for (j = i; j < 25; j += 2)\n  {\n    count++;\n  }\n}\nprintf(\"count: %d\\n\", count);",
    q: "What is printed?",
    c: ["count: 49", "count: 51", "count: 84", "None of the above."], a: 1,
    why: "i takes 2, 5, 8, 11, 14, 17, 20. The inner loop runs from j = i up to 24 in steps of 2: 12, 10, 9, 7, 6, 4 and 3 times. 12 + 10 + 9 + 7 + 6 + 4 + 3 = 51.",
    hints: ["The inner loop starts at the current i.", "Count the inner iterations separately for each i.", "For i = 2: j = 2, 4, ..., 24."],
    source: "2022 SPRING Final Q14"
  });
  add({ id: "c6-bxc-032", chapter: 6, t: 3, k: 'mcq', tag: "Trace",
    code: "int total = 0;\nint i;\nint j;\n\nfor (i = 1; i <= 4; i++)\n{\n  for (j = 1; j <= i; j++)\n  {\n    if ((i + j) % 3 == 0)\n    {\n      total += i * j;\n    }\n  }\n}\nprintf(\"total: %d\\n\", total);",
    q: "What is printed?",
    c: ["total: 19", "total: 23", "total: 15", "None of the above."], a: 0,
    why: "Only pairs with j <= i are visited. Those with i + j a multiple of 3 are (2, 1), (3, 3) and (4, 2): 2 + 9 + 8 = 19. (1, 2) and (4, 5) are never visited.",
    hints: ["The inner bound depends on i.", "List the (i, j) pairs whose sum is 3 or 6.", "Add i * j for those pairs."],
    source: "2022 SPRING Final Q15"
  });

  /* ---- Chapter 8 ---- */
  add({ id: "c8-bxc-001", chapter: 8, t: 3, k: 'mcq', tag: "Concept",
    q: "Given the declaration int grid[4][6]; which statement is TRUE?",
    c: ["grid holds 10 elements in total.", "The last element of grid is grid[4][6].", "In memory, grid[1][0] is stored immediately after grid[0][5].", "None of the above."], a: 2,
    why: "A 4 x 6 array has 4 * 6 = 24 elements (the product, not the sum). Every dimension starts at index 0, so the last element is grid[3][5]. C stores 2-D arrays row by row, so row 1 begins right after the last element of row 0.",
    hints: ["How many elements are in 4 rows of 6?", "What is the largest valid index in a dimension of size 4?", "C uses row-major order."],
    source: "2021 FALL Final Q49"
  });
  add({ id: "c8-bxc-002", chapter: 8, t: 3, k: 'mcq', tag: "Concept",
    q: "A program declares int list[10]; and later reads list[10]. What does the C standard guarantee will happen?",
    c: ["The compiler always reports an error.", "The program always crashes at that point.", "The value read is always 0.", "None of the above."], a: 3,
    why: "Accessing outside an array's bounds is undefined behaviour: C performs no bounds checking, so nothing is guaranteed. The program may compile cleanly, may keep running, and may read whatever happens to be stored next in memory.",
    hints: ["Does C check subscripts when it compiles or when it runs?", "Valid indexes for list[10] are 0 through 9.", "Is any of the three outcomes actually guaranteed?"],
    source: "2021 FALL Exam 2 Q21"
  });
  add({ id: "c8-bxc-003", chapter: 8, t: 4, k: 'mcq', tag: "Concept",
    q: "Which statement about array bounds in C is TRUE?",
    c: ["C checks every subscript at run time and stops the program when it is out of range.", "Storing into an element past the end of an array may silently change the value of some other variable.", "Declaring int v[5]; creates the valid elements v[1] through v[5].", "None of the above."], a: 1,
    why: "C does not check bounds, so a write past the end lands in whatever memory follows, which may belong to another variable, with no error message. Valid indexes for v[5] are 0 through 4.",
    hints: ["Is there any automatic bounds checking in C?", "Where does memory for v[5] \"end\"?", "Indexes start at 0."],
    source: "2021 FALL Exam 2 Q21"
  });
  add({ id: "c8-bxc-004", chapter: 8, t: 3, k: 'mcq', tag: "Concept",
    code: "/* Option A */\na = a - b;\nb = b + a;\na = b - a;\n\n/* Option B */\nint temp;\ntemp = a;\na = b;\nb = a;",
    q: "Both variables are ints. Which claim about Options A and B is FALSE?",
    c: ["Option A swaps correctly when it starts from 12 and -5.", "Option A also swaps correctly if both variables start out equal.", "Option B swaps correctly for any two int values.", "None of the above."], a: 2,
    why: "Option B saves a in temp but then copies the NEW a (old b) back into b, so both end up holding the old b; temp is never used to restore. Option A is a valid arithmetic swap (barring overflow): with a = 12, b = -5 it gives a = -5, b = 12, and it also works when a == b.",
    hints: ["Trace each option with real numbers.", "In Option B, what value does the last line copy into b?", "Where should temp be used?"],
    source: "2022 SPRING Final Q20"
  });
  add({ id: "c8-bxc-005", chapter: 8, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  int a[8] = {3, 8, 1, 9, 4, 6, 2, 7};\n  int i;\n  int result1 = 0;\n  int result2 = 0;\n\n  for (i = 0; i < 7; i++)\n  {\n    if (a[i] < a[i + 1])\n    {\n      result1 += a[i + 1] - a[i];\n    }\n  }\n  for (i = 7; i > 0; i -= 2)\n  {\n    result2 += a[i] % a[i - 1];\n  }\n  printf(\"result 1 = %d\\n\", result1);\n  printf(\"result 2 = %d\\n\", result2);\n\n  return 0;\n}",
    q: "What is the FIRST line of output?",
    c: ["result 1 = 20", "result 1 = 6", "result 1 = 25", "None of the above."], a: 0,
    why: "Only the pairs where the next element is larger contribute their difference: 3 -> 8 adds 5, 1 -> 9 adds 8, 4 -> 6 adds 2, 2 -> 7 adds 5. Total 20.",
    hints: ["The loop compares a[i] with a[i + 1] for i = 0..6.", "Only increases are added.", "Find the four rising pairs."],
    source: "2022 SPRING Final Q36"
  });
  add({ id: "c8-bxc-006", chapter: 8, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  int a[8] = {3, 8, 1, 9, 4, 6, 2, 7};\n  int i;\n  int result1 = 0;\n  int result2 = 0;\n\n  for (i = 0; i < 7; i++)\n  {\n    if (a[i] < a[i + 1])\n    {\n      result1 += a[i + 1] - a[i];\n    }\n  }\n  for (i = 7; i > 0; i -= 2)\n  {\n    result2 += a[i] % a[i - 1];\n  }\n  printf(\"result 1 = %d\\n\", result1);\n  printf(\"result 2 = %d\\n\", result2);\n\n  return 0;\n}",
    q: "Using the same program, what is the SECOND line of output?",
    c: ["result 2 = 4", "result 2 = 5", "result 2 = 3", "None of the above."], a: 1,
    why: "i takes 7, 5, 3, 1: 7 % 2 = 1, 6 % 4 = 2, 9 % 1 = 0, 8 % 3 = 2. Total 5. Stopping before i = 1 gives 3.",
    hints: ["The loop moves backward two at a time.", "Each step uses a[i] % a[i - 1].", "Any number % 1 is 0."],
    source: "2022 SPRING Final Q37"
  });
  add({ id: "c8-bxc-007", chapter: 8, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  int list[11] = {6, 13, 17, 25, 25, 25, 31, 38, 44, 52, 60};\n  int target = 70;\n  int first = 0;\n  int last = 10;\n  int mid;\n  int found = -1;\n\n  while (first <= last && found == -1)\n  {\n    mid = (first + last) / 2;\n    if (target > list[mid])\n    {\n      first = mid + 1;\n    }\n    else if (target < list[mid])\n    {\n      last = mid - 1;\n    }\n    else\n    {\n      found = mid;\n    }\n  }\n  printf(\"first = %d last = %d\\n\", first, last);\n  printf(\"index = %d\\n\", found);\n\n  return 0;\n}",
    q: "The program runs a binary search for 70, which is larger than every element. What is the FIRST line of output?",
    c: ["first = 10 last = 10", "first = 11 last = 10", "first = 11 last = 11", "None of the above."], a: 1,
    why: "mid = 5 (25): 70 is larger, first = 6. mid = 8 (44): first = 9. mid = 9 (52): first = 10. mid = 10 (60): first = 11. Now first > last and the search ends without finding the target. A target above every element always ends with first = n and last = n - 1, here 11 and 10.",
    hints: ["Each comparison with a smaller middle value moves first to mid + 1.", "last never changes for a target this large.", "The loop ends when first > last."],
    source: "2022 SPRING Final Q39"
  });
  add({ id: "c8-bxc-008", chapter: 8, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  int list[11] = {6, 13, 17, 25, 25, 25, 31, 38, 44, 52, 60};\n  int target = 33;\n  int first = 0;\n  int last = 10;\n  int mid;\n  int found = -1;\n\n  while (first <= last && found == -1)\n  {\n    mid = (first + last) / 2;\n    if (target > list[mid])\n    {\n      first = mid + 1;\n    }\n    else if (target < list[mid])\n    {\n      last = mid - 1;\n    }\n    else\n    {\n      found = mid;\n    }\n  }\n  printf(\"first = %d last = %d\\n\", first, last);\n  printf(\"index = %d\\n\", found);\n\n  return 0;\n}",
    q: "The same binary search now looks for 33, as shown. What is the FIRST line of output?",
    c: ["first = 7 last = 7", "first = 7 last = 6", "first = 6 last = 7", "None of the above."], a: 1,
    why: "mid = 5 (25): first = 6. mid = 8 (44): last = 7. mid = 6 (31): first = 7. mid = 7 (38): last = 6. first > last, so 33 is not present; first ends at the index where 33 would be inserted.",
    hints: ["Write first, last and mid after every comparison.", "(6 + 7) / 2 is 6 in integer division.", "An unsuccessful search ends with last = first - 1."],
    source: "2022 SPRING Final Q40"
  });
  add({ id: "c8-bxc-009", chapter: 8, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  int list[11] = {6, 13, 17, 25, 25, 25, 31, 38, 44, 52, 60};\n  int target = 25;\n  int first = 0;\n  int last = 10;\n  int mid;\n  int found = -1;\n\n  while (first <= last && found == -1)\n  {\n    mid = (first + last) / 2;\n    if (target > list[mid])\n    {\n      first = mid + 1;\n    }\n    else if (target < list[mid])\n    {\n      last = mid - 1;\n    }\n    else\n    {\n      found = mid;\n    }\n  }\n  printf(\"first = %d last = %d\\n\", first, last);\n  printf(\"index = %d\\n\", found);\n\n  return 0;\n}",
    q: "The same binary search now looks for 25, which appears three times. What is the SECOND line of output?",
    c: ["index = 3", "index = 4", "index = 5", "None of the above."], a: 2,
    why: "The very first middle index is (0 + 10) / 2 = 5, and list[5] is 25, so the search stops there. Binary search returns whichever matching element it lands on first, not necessarily the first occurrence (index 3).",
    hints: ["Compute the first mid before anything else.", "What is stored at that index?", "Binary search does not look for the leftmost match."],
    source: "2022 SPRING Final Q41"
  });
  add({ id: "c8-bxc-010", chapter: 8, t: 3, k: 'mcq', tag: "Concept",
    q: "Which statement about sequential and binary search is FALSE?",
    c: ["If the target is the first element, sequential search finds it with one comparison, while binary search usually needs more.", "Binary search can only be used on data that is in sorted order.", "On a sorted array, sequential search can stop as soon as it passes the position where the target would have to be.", "None of the above."], a: 3,
    why: "All three are true. Sequential search can beat binary search when the target is near the front; binary search depends on sorted data; and on sorted data a sequential search can give up early once the elements exceed the target.",
    hints: ["It is possible that none of these is false.", "Where does binary search look first?", "In sorted data, what does seeing a larger value tell you?"],
    source: "2022 SPRING Final Q42"
  });
  add({ id: "c8-bxc-011", chapter: 8, t: 4, k: 'mcq', tag: "Concept",
    q: "Which statement about sequential and binary search is FALSE?",
    c: ["Each unsuccessful comparison in binary search roughly halves the number of candidates still left.", "For an array of 1000 sorted elements, binary search may need up to about 500 comparisons in the worst case.", "In the worst case, sequential search compares the target with every element.", "None of the above."], a: 1,
    why: "Halving 1000 repeatedly reaches 1 after about 10 steps, so binary search needs at most around 10 comparisons. 500 would be the average for a sequential search.",
    hints: ["How many times can you halve 1000 before reaching 1?", "2 to the 10th power is 1024.", "Which algorithm needs about n / 2 comparisons on average?"],
    source: "2022 SPRING Final Q42"
  });
  add({ id: "c8-bxc-012", chapter: 8, t: 3, k: 'mcq', tag: "Concept",
    q: "Assume ascending order. The selection sort swaps the largest remaining value to the end of the unsorted part on each pass; the bubble sort compares neighbours from left to right, carrying the largest value to the end; the insertion sort inserts the next value into the sorted front part.\nOriginal array: 5 17 23 48 36 12\nAfter TWO passes: 5 17 23 12 36 48\nWhich algorithm was applied?",
    c: ["Selection sort.", "Bubble sort.", "Insertion sort.", "Two or more of these algorithms."], a: 3,
    why: "Selection: pass 1 swaps 48 with 12 (5 17 23 12 36 48); pass 2 finds 36 already in place. Bubble: pass 1 carries 48 to the end (5 17 23 36 12 48); pass 2 carries 36 (5 17 23 12 36 48). Both match. Insertion would only have sorted the first three values, leaving the array unchanged.",
    hints: ["Run two passes of EACH algorithm on paper.", "Do not stop after the first algorithm that matches.", "Insertion only works on the front of the array in early passes."],
    source: "2022 SPRING Final Q43"
  });
  add({ id: "c8-bxc-013", chapter: 8, t: 4, k: 'mcq', tag: "Concept",
    q: "Assume ascending order. The selection sort swaps the largest remaining value to the end of the unsorted part on each pass; the bubble sort compares neighbours from left to right, carrying the largest value to the end; the insertion sort inserts the next value into the sorted front part.\nOriginal array: 31 9 42 16 55 24\nAfter TWO passes: 9 31 42 16 55 24\nWhich algorithm was applied?",
    c: ["Selection sort.", "Bubble sort.", "Insertion sort.", "Two or more of these algorithms."], a: 2,
    why: "Insertion: pass 1 inserts 9 before 31, pass 2 leaves 42 in place, giving 9 31 42 16 55 24. Selection would have moved 55 and then 42 to the end; bubble would have carried 55 and 42 to the end as well.",
    hints: ["Which values reached the end of the array?", "Only one algorithm leaves the right side untouched in early passes.", "Check all three anyway."],
    source: "2022 SPRING Final Q43"
  });
  add({ id: "c8-bxc-014", chapter: 8, t: 3, k: 'mcq', tag: "Concept",
    q: "The array {21, 9, 30, 14, 5, 26} is processed by a selection sort. The sort may be ascending or descending, and each pass may either select the smallest or the largest remaining value. Which configuration is NOT possible after TWO passes?",
    c: ["{5, 9, 30, 14, 21, 26}", "{30, 26, 21, 14, 5, 9}", "{5, 9, 14, 30, 21, 26}", "None of the above."], a: 2,
    why: "Ascending, smallest to the front: {5, 9, 30, 14, 21, 26}. Descending, largest to the front: {30, 26, 21, 14, 5, 9}. (Other variants give {21, 9, 5, 14, 26, 30} and {21, 26, 30, 14, 9, 5}.) {5, 9, 14, ...} has THREE values placed, which takes three passes.",
    hints: ["Each selection pass places exactly one value in its final position.", "Try each of the four variants for two passes.", "Count how many values are already in their final places."],
    source: "2022 SPRING Final Q44"
  });
  add({ id: "c8-bxc-015", chapter: 8, t: 3, k: 'mcq', tag: "Concept",
    code: "#include <stdio.h>\n\nvoid sortData(int[], int);\n\nint main(void)\n{\n  int data[9] = {4, 9, 1, 12, 7, 3, 10, 2, 6};\n  int i;\n\n  sortData(data, 9);\n  for (i = 0; i < 9; i++)\n  {\n    printf(\"%d \", data[i]);\n  }\n  printf(\"\\n\");\n\n  return 0;\n}\n\nvoid sortData(int x[], int n)\n{\n  int pass;\n  int k;\n  int best;\n  int temp;\n\n  for (pass = 0; pass < n - 1; pass++)\n  {\n    best = pass;\n    for (k = pass + 1; k < n; k++)\n    {\n      if (x[k] > x[best])\n      {\n        best = k;\n      }\n    }\n    temp = x[pass];\n    x[pass] = x[best];\n    x[best] = temp;\n  }\n}",
    q: "Which sorting algorithm does sortData implement?",
    c: ["Selection sort.", "Bubble sort.", "Insertion sort.", "None of the above."], a: 0,
    why: "Each pass scans the unsorted part for the position of the largest value (best) and makes ONE swap to put it at index pass. That is selection sort (in descending order). Bubble sort swaps neighbours repeatedly; insertion sort shifts elements to make room.",
    hints: ["How many swaps happen per pass?", "What does the variable best remember?", "Is anything shifted, or are only two elements exchanged?"],
    source: "2022 SPRING Final Q45"
  });
  add({ id: "c8-bxc-016", chapter: 8, t: 4, k: 'mcq', tag: "Concept",
    code: "void arrange(int x[], int n)\n{\n  int k;\n  int j;\n  int hold;\n\n  for (k = 1; k < n; k++)\n  {\n    hold = x[k];\n    j = k - 1;\n    while (j >= 0 && x[j] > hold)\n    {\n      x[j + 1] = x[j];\n      j--;\n    }\n    x[j + 1] = hold;\n  }\n}",
    q: "Which sorting algorithm does arrange implement?",
    c: ["Selection sort.", "Bubble sort.", "Insertion sort.", "None of the above."], a: 2,
    why: "Each pass takes the next value (hold), shifts the larger values of the sorted front part one place to the right, and drops hold into the gap. That is insertion sort. There is no search for a minimum or maximum and no exchange of neighbours.",
    hints: ["What happens to the elements that are larger than hold?", "Is the front part of the array always sorted?", "Shifting to open a gap is the signature of one algorithm."],
    source: "2022 SPRING Final Q45"
  });
  add({ id: "c8-bxc-017", chapter: 8, t: 3, k: 'mcq', tag: "Concept",
    code: "#include <stdio.h>\n\nvoid sortData(int[], int);\n\nint main(void)\n{\n  int data[9] = {4, 9, 1, 12, 7, 3, 10, 2, 6};\n  int i;\n\n  sortData(data, 9);\n  for (i = 0; i < 9; i++)\n  {\n    printf(\"%d \", data[i]);\n  }\n  printf(\"\\n\");\n\n  return 0;\n}\n\nvoid sortData(int x[], int n)\n{\n  int pass;\n  int k;\n  int best;\n  int temp;\n\n  for (pass = 0; pass < n - 1; pass++)\n  {\n    best = pass;\n    for (k = pass + 1; k < n; k++)\n    {\n      if (x[k] > x[best])\n      {\n        best = k;\n      }\n    }\n    temp = x[pass];\n    x[pass] = x[best];\n    x[best] = temp;\n  }\n}",
    q: "Which statement is TRUE once the outer loop of sortData has completed exactly two passes?",
    c: ["data[0] holds 4.", "data[6] holds 10.", "data[1] holds 10.", "None of the above."], a: 2,
    why: "Pass 0: the largest value, 12 (index 3), is swapped with index 0: {12, 9, 1, 4, 7, 3, 10, 2, 6}. Pass 1: the largest of the rest, 10 (index 6), is swapped with index 1: {12, 10, 1, 4, 7, 3, 9, 2, 6}.",
    hints: ["This version selects the LARGEST value each pass.", "Each pass makes exactly one swap.", "After pass 1, where did the 9 go?"],
    source: "2022 SPRING Final Q46"
  });

  /* ---- Chapter 9 ---- */
  add({ id: "c9-bxc-001", chapter: 9, t: 4, k: 'mcq', tag: "Trace",
    code: "int list[5] = {12, 7, 30, 4, 19};\nint *p = list + 1;\nint a;\n\na = *p + 2;\np += 2;\na += *p * 2;\n(*p)++;\na += *(p - 1) + list[3];\nprintf(\"a: %d\\n\", a);",
    q: "What is printed?",
    c: ["a: 51", "a: 47", "a: 26", "None of the above."], a: 3,
    why: "p starts at list[1] (7): a = 9. p moves to list[3] (4): a = 9 + 8 = 17. (*p)++ changes list[3] to 5. *(p - 1) is list[2] = 30, and list[3] is now 5: a = 17 + 35 = 52, which is not listed. 51 forgets that (*p)++ changed list[3]; 47 reads *p + 2 as *(p + 2); 26 reads *(p - 1) as *p - 1.",
    hints: ["*p + 2 adds 2 to the VALUE; *(p + 2) moves the pointer.", "(*p)++ changes the array element, not the pointer.", "p and list[3] refer to the same element after p += 2."],
    source: "2022 SPRING Final Q18"
  });
  add({ id: "c9-bxc-002", chapter: 9, t: 4, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint sumEvery(int *, int);\n\nint main(void)\n{\n  int vals[7] = {3, 8, 1, 6, 5, 2, 9};\n  int a;\n\n  a = sumEvery(vals + 1, 5) - sumEvery(&vals[4], 3);\n  printf(\"a: %d\\n\", a);\n\n  return 0;\n}\n\nint sumEvery(int *p, int n)\n{\n  int s = 0;\n\n  while (n > 0)\n  {\n    s += *p;\n    p += 2;\n    n -= 2;\n  }\n\n  return s;\n}",
    q: "What is printed?",
    c: ["a: 2", "a: -5", "a: 16", "None of the above."], a: 0,
    why: "sumEvery(vals + 1, 5) starts at 8 and adds every second element while n is 5, 3, 1: 8 + 6 + 2 = 16. sumEvery(&vals[4], 3) starts at 5 with n = 3, 1: 5 + 9 = 14. 16 - 14 = 2. Starting the first call at vals[0] would give -5.",
    hints: ["vals + 1 and &vals[1] are the same address.", "n counts down by 2, so how many elements are added?", "Compute each call, then subtract."],
    source: "2022 SPRING Final Q18"
  });
  add({ id: "c9-bxc-003", chapter: 9, t: 3, k: 'mcq', tag: "Trace",
    code: "int data[4] = {5, 9, 2, 7};\nint *q = &data[3];\nint b;\n\nb = *q - *(q - 2);\nq = data;\nb += q[2] * 3 + *q;\nprintf(\"b: %d\\n\", b);",
    q: "What is printed?",
    c: ["b: 13", "b: 9", "b: -2", "None of the above."], a: 1,
    why: "q points to data[3] = 7 and q - 2 points to data[1] = 9, so b = -2. Then q points to data[0]; q[2] is data[2] = 2, so b += 6 + 5, giving 9. Reading *(q - 2) as *q - 2 gives 13.",
    hints: ["*(q - 2) moves back two ELEMENTS first.", "After q = data, q[2] means *(q + 2).", "Add the second statement's result to -2."],
    source: "2022 SPRING Final Q19"
  });
  add({ id: "c9-bxc-004", chapter: 9, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main(void)\n{\n  int n = 6;\n  int *arr;\n  int i;\n  int result1 = 0;\n  int result2 = 0;\n\n  arr = malloc(n * sizeof(int));\n  for (i = 0; i < n; i++)\n  {\n    arr[i] = (i * 7) % 5 + i;\n  }\n  for (i = 1; i < n; i += 2)\n  {\n    result1 += arr[i] * 2;\n  }\n  for (i = 0; i < n; i++)\n  {\n    if (arr[i] > arr[n - 1 - i])\n    {\n      result2++;\n    }\n  }\n  printf(\"result 1 = %d\\n\", result1);\n  printf(\"result 2 = %d\\n\", result2);\n  free(arr);\n\n  return 0;\n}",
    q: "What is the FIRST line of output?",
    c: ["result 1 = 24", "result 1 = 12", "result 1 = 50", "None of the above."], a: 0,
    why: "The array becomes {0, 3, 6, 4, 7, 5} (for example arr[2] = 14 % 5 + 2 = 6). The second loop visits the odd indexes 1, 3, 5: (3 + 4 + 5) * 2 = 24.",
    hints: ["Fill in the six values first: (i * 7) % 5 + i.", "Which indexes does i = 1, 3, 5 visit?", "Each visited value is doubled."],
    source: "2022 SPRING Final Q32"
  });
  add({ id: "c9-bxc-005", chapter: 9, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main(void)\n{\n  int n = 6;\n  int *arr;\n  int i;\n  int result1 = 0;\n  int result2 = 0;\n\n  arr = malloc(n * sizeof(int));\n  for (i = 0; i < n; i++)\n  {\n    arr[i] = (i * 7) % 5 + i;\n  }\n  for (i = 1; i < n; i += 2)\n  {\n    result1 += arr[i] * 2;\n  }\n  for (i = 0; i < n; i++)\n  {\n    if (arr[i] > arr[n - 1 - i])\n    {\n      result2++;\n    }\n  }\n  printf(\"result 1 = %d\\n\", result1);\n  printf(\"result 2 = %d\\n\", result2);\n  free(arr);\n\n  return 0;\n}",
    q: "Using the same program, what is the SECOND line of output?",
    c: ["result 2 = 2", "result 2 = 6", "result 2 = 3", "None of the above."], a: 2,
    why: "The array is {0, 3, 6, 4, 7, 5}. Each element is compared with its mirror: 0 > 5 no, 3 > 7 no, 6 > 4 yes, 4 > 6 no, 7 > 3 yes, 5 > 0 yes. Three comparisons are true.",
    hints: ["arr[n - 1 - i] is the element mirrored from the other end.", "The loop covers all six indexes, so each pair is compared twice (once from each side).", "Count the true comparisons."],
    source: "2022 SPRING Final Q33"
  });
  add({ id: "c9-bxc-006", chapter: 9, t: 2, k: 'mcq', tag: "Concept",
    q: "Which statement about dynamic memory allocation is FALSE?",
    c: ["malloc returns NULL when the requested memory cannot be provided.", "Memory obtained with malloc should be released with free when it is no longer needed.", "calloc and malloc both leave the newly allocated memory holding unpredictable values.", "None of the above."], a: 2,
    why: "calloc sets every byte of the new block to zero; malloc leaves the contents uninitialized. Both return NULL on failure, and the memory should be freed.",
    hints: ["What is the difference between malloc and calloc?", "Which one takes a count and an element size?", "The c in calloc is often remembered as \"clear\"."],
    source: "2022 SPRING Final Q34"
  });
  add({ id: "c9-bxc-007", chapter: 9, t: 3, k: 'mcq', tag: "Concept",
    q: "Which statement about pointer variables is FALSE?",
    c: ["The address operator & can be applied to a variable but not to a literal constant such as 5.", "Once a pointer variable has been initialized, it can never be made to point to a different variable.", "For an int variable x, the expression *&x refers to x itself.", "None of the above."], a: 1,
    why: "A pointer is a variable: assigning a new address (p = &y;) makes it point somewhere else, and that is how pointers walk through arrays. & needs an object with an address, so &5 is an error, and * undoes &.",
    hints: ["Is a pointer a constant or a variable?", "How does p++ move through an array?", "* and & are inverses."],
    source: "2022 SPRING Final Q38"
  });
  add({ id: "c9-bxc-008", chapter: 9, t: 4, k: 'mcq', tag: "Concept",
    q: "Which statement about the indirection operator (*) is FALSE?",
    c: ["If p is a valid pointer, &*p has the same value as p.", "Dereferencing a pointer to int gives a value of type int.", "Applying * to an int variable gives the value stored at the address held in that int.", "None of the above."], a: 2,
    why: "The operand of unary * must have pointer type; applying it to an int is a compile-time error, even if the int happens to contain a number that looks like an address. The other statements are true.",
    hints: ["What type must the operand of unary * have?", "Try int n = 5; printf(\"%d\", *n); with gcc.", "& and * cancel when the pointer is valid."],
    source: "2022 SPRING Final Q38"
  });
  add({ id: "c9-bxc-009", chapter: 9, t: 3, k: 'mcq', tag: "Trace",
    code: "int vals[6] = {4, 0, 7, 0, 0, 3};\nint *p;\nint total = 0;\n\nfor (p = vals; p < vals + 5; p++)\n{\n  if (*p > *(p + 1))\n  {\n    total++;\n  }\n}\nprintf(\"total = %d\\n\", total);",
    q: "What is printed?",
    c: ["total = 3", "total = 2", "total = 1", "None of the above."], a: 1,
    why: "p visits vals[0] through vals[4] and compares each with the next element: 4 > 0 yes, 0 > 7 no, 7 > 0 yes, 0 > 0 no, 0 > 3 no. Two drops.",
    hints: ["The loop stops before p reaches vals + 5, so the last pair is (vals[4], vals[5]).", "*(p + 1) is the element after *p.", "Is 0 > 0 true?"],
    source: "2022 SPRING Final Q47"
  });
  add({ id: "c9-bxc-010", chapter: 9, t: 3, k: 'mcq', tag: "Trace",
    code: "int nums[5] = {2, 4, 6, 8, 10};\nint *a = nums;\nint *b = nums + 4;\nint final;\n\nwhile (a < b)\n{\n  a++;\n  b--;\n}\nfinal = *a + (b - nums);\nprintf(\"final = %d\\n\", final);",
    q: "What is printed?",
    c: ["final = 6", "final = 8", "final = 10", "None of the above."], a: 1,
    why: "a and b walk toward each other: (0, 4) -> (1, 3) -> (2, 2), where a < b is false. *a is nums[2] = 6, and b - nums is the distance in ELEMENTS, 2. 6 + 2 = 8.",
    hints: ["Track the index each pointer refers to.", "Subtracting two pointers into the same array gives a count of elements.", "Where do the pointers meet?"],
    source: "2022 SPRING Final Q48"
  });

  /* ---- Chapter 15 ---- */
  add({ id: "c15-bxc-001", chapter: 15, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint build(int);\n\nint main(void)\n{\n  build(4);\n\n  return 0;\n}\n\nint build(int n)\n{\n  int r;\n\n  if (n <= 1)\n  {\n    r = 2;\n  }\n  else\n  {\n    r = build(n - 1) * 2 - n;\n  }\n  printf(\"%d: %d\\n\", n, r);\n\n  return r;\n}",
    q: "Which line is printed FIRST?",
    c: ["4: -2", "1: 2", "1: 1", "None of the above."], a: 1,
    why: "Each call prints AFTER its recursive call returns, so the deepest call prints first. build(1) = 2; build(2) = 2 * 2 - 2 = 2; build(3) = 2 * 2 - 3 = 1; build(4) = 1 * 2 - 4 = -2. Output order: 1: 2, 2: 2, 3: 1, 4: -2.",
    hints: ["Does each call print before or after making its recursive call?", "Which call finishes first?", "The base case sets r to 2."],
    source: "2021 FALL Exam 2 Q13"
  });
  add({ id: "c15-bxc-002", chapter: 15, t: 4, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint build(int);\n\nint main(void)\n{\n  build(4);\n\n  return 0;\n}\n\nint build(int n)\n{\n  int r;\n\n  if (n <= 1)\n  {\n    r = 2;\n  }\n  else\n  {\n    r = build(n - 1) * 2 - n;\n  }\n  printf(\"%d: %d\\n\", n, r);\n\n  return r;\n}",
    q: "Using the same program, what is the THIRD line of output?",
    c: ["3: 1", "2: 2", "3: 4", "None of the above."], a: 0,
    why: "Each call prints AFTER its recursive call returns, so the deepest call prints first. build(1) = 2; build(2) = 2 * 2 - 2 = 2; build(3) = 2 * 2 - 3 = 1; build(4) = 1 * 2 - 4 = -2. Output order: 1: 2, 2: 2, 3: 1, 4: -2. 3: 4 comes from forgetting to subtract n.",
    hints: ["Lines appear in the order the calls RETURN.", "The third line comes from build(3).", "build(3) = build(2) * 2 - 3."],
    source: "2021 FALL Exam 2 Q13"
  });
  add({ id: "c15-bxc-003", chapter: 15, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint build(int);\n\nint main(void)\n{\n  build(4);\n\n  return 0;\n}\n\nint build(int n)\n{\n  int r;\n\n  if (n <= 1)\n  {\n    r = 2;\n  }\n  else\n  {\n    r = build(n - 1) * 2 - n;\n  }\n  printf(\"%d: %d\\n\", n, r);\n\n  return r;\n}",
    q: "Using the same program, which line is printed LAST?",
    c: ["1: 2", "4: 6", "4: -2", "None of the above."], a: 2,
    why: "Each call prints AFTER its recursive call returns, so the deepest call prints first. build(1) = 2; build(2) = 2 * 2 - 2 = 2; build(3) = 2 * 2 - 3 = 1; build(4) = 1 * 2 - 4 = -2. Output order: 1: 2, 2: 2, 3: 1, 4: -2.",
    hints: ["The original call build(4) is the last to finish.", "It uses the value returned by build(3).", "1 * 2 - 4 = ?"],
    source: "2021 FALL Exam 2 Q14"
  });
  add({ id: "c15-bxc-004", chapter: 15, t: 2, k: 'mcq', tag: "Concept",
    code: "#include <stdio.h>\n\nint build(int);\n\nint main(void)\n{\n  build(4);\n\n  return 0;\n}\n\nint build(int n)\n{\n  int r;\n\n  if (n <= 1)\n  {\n    r = 2;\n  }\n  else\n  {\n    r = build(n - 1) * 2 - n;\n  }\n  printf(\"%d: %d\\n\", n, r);\n\n  return r;\n}",
    q: "In the same program, which best describes the cases of the recursive function build?",
    c: ["Base case when n > 1; recursion when n <= 1.", "Base case when n <= 1; recursion when n > 1.", "Base case when n <= 2; recursion when n > 2.", "None of the above."], a: 1,
    why: "The base case is the branch that answers without another call: n <= 1 sets r = 2 directly. For n > 1 the function calls itself with n - 1, moving toward the base case.",
    hints: ["Which branch makes no further call?", "Read the if condition exactly.", "The recursive case must make progress toward the base case."],
    source: "2021 FALL Exam 2 Q15"
  });
  add({ id: "c15-bxc-005", chapter: 15, t: 2, k: 'mcq', tag: "Concept",
    q: "Which statement about recursive and iterative solutions is TRUE?",
    c: ["A recursive solution always needs more lines of code than the iterative version.", "Under the course standards, recursion is used only for counter-controlled processes, where the number of steps is known in advance.", "A recursive function must contain a loop to repeat its work.", "None of the above."], a: 1,
    why: "The course limits recursion to counter-controlled problems. Recursion repeats by calling itself, so it needs no loop, and recursive code is often shorter than its iterative equivalent.",
    hints: ["How does a recursive function repeat its work?", "What does the course say about when to use recursion?", "Watch for \"always\" and \"must\"."],
    source: "2021 FALL Exam 2 Q16"
  });
  add({ id: "c15-bxc-006", chapter: 15, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint countDown(int);\n\nint main(void)\n{\n  int result;\n\n  result = countDown(9);\n  printf(\"result: %d\\n\", result);\n\n  return 0;\n}\n\nint countDown(int n)\n{\n  int r;\n\n  if (n <= 2)\n  {\n    r = n % 2;\n  }\n  else\n  {\n    printf(\"n: %d\\n\", n);\n    r = countDown(n - 3) + 1;\n  }\n\n  return r;\n}",
    q: "What line of output does main print?",
    c: ["result: 4", "result: 3", "result: 2", "None of the above."], a: 1,
    why: "countDown(9) prints n: 9 and calls countDown(6), which prints n: 6 and calls countDown(3), which prints n: 3 and calls countDown(0). 0 <= 2 is the base case: it returns 0 % 2 = 0 without printing. Returning upward adds 1 three times: 1, 2, 3.",
    hints: ["Follow n: 9, 6, 3, 0.", "What does the base case return for n = 0?", "Each recursive level adds 1 on the way back."],
    source: "2022 SPRING Final Q11"
  });
  add({ id: "c15-bxc-007", chapter: 15, t: 3, k: 'mcq', tag: "Trace",
    code: "#include <stdio.h>\n\nint countDown(int);\n\nint main(void)\n{\n  int result;\n\n  result = countDown(9);\n  printf(\"result: %d\\n\", result);\n\n  return 0;\n}\n\nint countDown(int n)\n{\n  int r;\n\n  if (n <= 2)\n  {\n    r = n % 2;\n  }\n  else\n  {\n    printf(\"n: %d\\n\", n);\n    r = countDown(n - 3) + 1;\n  }\n\n  return r;\n}",
    q: "In the same program, which line is never printed by countDown?",
    c: ["n: 6", "n: 0", "n: 3", "None of the above."], a: 1,
    why: "countDown(9) prints n: 9 and calls countDown(6), which prints n: 6 and calls countDown(3), which prints n: 3 and calls countDown(0). 0 <= 2 is the base case: it returns 0 % 2 = 0 without printing. Returning upward adds 1 three times: 1, 2, 3. So n: 0 is never printed: the base case does not print.",
    hints: ["Which branch contains the printf?", "Is n = 0 handled by the base case?", "List every n that reaches the else branch."],
    source: "2022 SPRING Final Q12"
  });
})();
