/* Midterm question quality revision.
   Applied after curriculum corrections, before uploaded source questions.
   IDs remain stable; lecture/practice source cards are never changed.
   Choices are authored at comparable specificity, with misconception-based
   distractors. Option order is randomized by the presentation engine. */
(function () {
  var updates = {
  "c1-01": {
    "q": "In the course hardware model, which group contains all five major parts?",
    "c": [
      "Input, ALU, control unit, output, compiler",
      "CPU, compiler, linker, main memory, storage",
      "Input, CPU, operating system, output, storage",
      "Input, CPU, main memory, output, auxiliary storage"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Five: input devices, CPU, primary storage (main memory), output devices, and auxiliary storage devices."
  },
  "c1-05": {
    "why": "Preprocessing handles directives, macro replacement, conditional inclusion and header inclusion. Macro replacement operates on preprocessing tokens.",
    "q": "A build selects one block under #if and expands a macro there. Which stage performs those operations?",
    "c": [
      "Compilation",
      "Link editing",
      "Preprocessing",
      "Program loading"
    ],
    "a": 2,
    "k": "mcq"
  },
  "c1-09": {
    "q": "In traditional time-sharing with dumb terminals, where is the application computation performed?",
    "why": "This question concerns dumb terminals. Time-sharing itself means sharing processor time and does not require terminals without processing capability.",
    "c": [
      "On each terminal processor",
      "On a separate CPU per user",
      "On the shared central computers processor",
      "On the terminal storage controller"
    ],
    "a": 2,
    "k": "mcq"
  },
  "c1-21": {
    "c": [
      "A runtime fault must produce a diagnostic",
      "A successful link establishes correct results",
      "A logic error prevents object-code generation",
      "A syntax violation requires a diagnostic"
    ],
    "why": "C requires diagnostics for syntax and constraint violations. Runtime faults may escape detection, and correct behavior still requires validation.",
    "q": "Which assertion correctly distinguishes translation diagnostics from program validation?",
    "a": 3,
    "k": "mcq"
  },
  "c1-26": {
    "why": "Portable source avoids undefined behavior and unsupported assumptions about implementation choices. Recompilation alone does not repair those assumptions.",
    "q": "Which practice supports recompiling C source for another conforming implementation?",
    "c": [
      "Assuming every object pointer always occupies exactly eight bytes",
      "Respecting standard rules, type ranges, and implementation limits",
      "Relying on the same signed-overflow wraparound on every target",
      "Reading automatic uninitialized storage that contained a useful value"
    ],
    "a": 1,
    "k": "mcq"
  },
  "c1-32": {
    "why": "A bit represents either 0 or 1. A C byte contains CHAR_BIT bits, which is at least eight.",
    "q": "How many possible values can one binary digit represent?",
    "c": [
      "8",
      "2",
      "16",
      "256"
    ],
    "a": 1,
    "k": "mcq"
  },
  "c1-38": {
    "q": "A conventional compile-only command translates one C source file without linking. Which artifact does it produce?",
    "why": "Compilation produces an object file in this model. Compiler drivers can also invoke linking and other build stages.",
    "c": [
      "Executable file",
      "Object file",
      "Header file",
      "Input stream"
    ],
    "a": 1,
    "k": "mcq"
  },
  "c1-40": {
    "q": "Which distinguishes traditional ahead-of-time compilation from direct interpretation?",
    "why": "Ahead-of-time translation produces code for later execution. Real implementations can combine compilation and interpretation; C does not mandate a strategy.",
    "c": [
      "Each source statement is executed as it is translated",
      "Source is executed directly by the CPU control unit",
      "Translation precedes execution of the resulting program",
      "External references are resolved before parsing source"
    ],
    "a": 2,
    "k": "mcq"
  },
  "c1-44": {
    "q": "For integer operands, which operation has undefined behavior if executed?",
    "why": "Integer division by zero has undefined behavior. A diagnostic or predictable crash is not guaranteed.",
    "c": [
      "Dividing a negative value by two",
      "Taking the remainder of a positive value",
      "Converting a representable double to int",
      "Dividing by a zero value"
    ],
    "a": 3,
    "k": "mcq"
  },
  "c1-45": {
    "why": "Portable C can be recompiled for different implementations while respecting implementation limits and the standard. Not all C source is portable.",
    "q": "A C program is compiled for a second target. Which condition still has to hold for portable behavior?",
    "c": [
      "Its object file keeps the original byte layout",
      "Its implementation assumptions remain valid",
      "Its linker uses the original machines addresses",
      "Its executable keeps the original instruction set"
    ],
    "a": 1,
    "k": "mcq"
  },
  "c1-55": {
    "why": "Macro replacement operates on preprocessing tokens. The resulting expressions are still typed and checked during later translation; a macro name does not declare a typed object.",
    "q": "Which work belongs to preprocessing rather than type checking or linking?",
    "c": [
      "Checking a pointer argument against its parameter",
      "Resolving a call to a separately compiled function",
      "Expanding preprocessing macros before ordinary type checking",
      "Placing the linked executable in main memory"
    ],
    "a": 2,
    "k": "mcq"
  },
  "c1-56": {
    "c": [
      "Whether plain char has signed behavior",
      "Whether int division by zero has a valid result",
      "Whether a string literal can be modified safely",
      "Whether an automatic uninitialized int is zero"
    ],
    "why": "Implementation-defined choices such as plain-char signedness must be distinguished from undefined operations.",
    "q": "Which difference can C intentionally leave to a conforming implementation?",
    "a": 0,
    "k": "mcq"
  },
  "c2-01": {
    "why": "An identifier can contain digits after the first character. A hyphen or dot is an operator/punctuator, and a leading digit is not permitted.",
    "q": "Which identifier is legal and avoids the leading-underscore reserved-name rules?",
    "c": [
      "count_2",
      "2_count",
      "count-2",
      "count.2"
    ],
    "a": 0,
    "k": "mcq"
  },
  "c2-05": {
    "why": "An object-like macro replaces preprocessing tokens; it does not itself declare an object. The expanded integer literal has a type when interpreted as C.",
    "q": "After #define MAX 100, what does a later ordinary occurrence of MAX become during preprocessing?",
    "c": [
      "The token 100",
      "An int object",
      "A stored address",
      "A library symbol"
    ],
    "a": 0,
    "k": "mcq"
  },
  "c2-06": {
    "q": "Without user typedefs or macros, which name is not a built-in C17 type specifier?",
    "why": "C17 has built-in arithmetic types including char, int, float, double, and _Bool. A C string is represented by characters ending in a null character.",
    "c": [
      "double",
      "char",
      "_Bool",
      "string"
    ],
    "a": 3,
    "k": "mcq"
  },
  "c2-08": {
    "q": "Which describes int x; declared as an automatic local before any assignment?",
    "c": [
      "The integer zero",
      "A null pointer value",
      "An empty integer object",
      "An indeterminate value"
    ],
    "why": "Reading an uninitialized automatic int can have undefined behavior. Static locals, unlike automatic locals, are zero-initialized.",
    "a": 3,
    "k": "mcq"
  },
  "c2-11": {
    "q": "Assuming ASCII, what does this print?"
  },
  "c2-17": {
    "why": "The declaration needs a semicolon. This does not imply every kind of C statement ends with a semicolon: braced compound statements are counterexamples.",
    "q": "Which line in the shown program violates C syntax?",
    "c": [
      "The assignment x = 5;",
      "The call printf(\"%d\", x);",
      "The statement return 0;",
      "The declaration int x"
    ],
    "a": 3,
    "k": "mcq"
  },
  "c2-21": {
    "a": [
      "Hello!"
    ]
  },
  "c2-24": {
    "why": "The trailing semicolon belongs to the replacement list and is copied inside the brackets. A numeric macro used here must omit it.",
    "q": "After macro replacement, which token sequence explains the shown invalid array declaration?",
    "c": [
      "int a[100;];",
      "int a[MAX];",
      "int a[100];",
      "int a[;100];"
    ],
    "a": 0,
    "k": "mcq"
  },
  "c2-25": {
    "why": "A const-qualified double object has a type and cannot be assigned through its name. A macro replacement expression still undergoes type checking after expansion.",
    "q": "Which declares a typed, nonmodifiable numeric object rather than a macro or a pointer?",
    "c": [
      "#define rate 0.05",
      "double * const rate = 0;",
      "static double rate = 0.05;",
      "const double rate = 0.05;"
    ],
    "a": 3,
    "k": "mcq"
  },
  "c2-27": {
    "q": "Which pair necessarily occupies the same number of C bytes?",
    "why": "Two arrays of four char have the same size. int and pointer sizes are implementation-dependent; three char elements are one C byte smaller.",
    "c": [
      "int a[4]; char b[4];",
      "char a[3]; char b[4];",
      "char a[4]; char b[4];",
      "char a[4]; char *b;"
    ],
    "a": 2,
    "k": "mcq"
  },
  "c2-38": {
    "q": "Which declaration is a standard hosted form of main?",
    "why": "A standard hosted main returns int and has either no parameters or the specified argument-count and argument-vector parameters.",
    "c": [
      "int main(void)",
      "void main(void)",
      "int main(int)",
      "double main(void)"
    ],
    "a": 0,
    "k": "mcq"
  },
  "c2-39": {
    "why": "Zero and EXIT_SUCCESS report success. EXIT_FAILURE reports failure; other exit-status meanings are implementation-defined.",
    "q": "Which return from main reports successful hosted termination?",
    "c": [
      "return EOF;",
      "return -1;",
      "return EXIT_FAILURE;",
      "return 0;"
    ],
    "a": 3,
    "k": "mcq"
  },
  "c2-43": {
    "q": "Given int n and char name[12], which pair matches argument types and bounds the input word?",
    "why": "%d requires int*. %s requires a char* destination, with space for the input plus a terminator; a field width of eleven fits this twelve-char array.",
    "c": [
      "scanf(\"%d\", n); scanf(\"%11s\", name);",
      "scanf(\"%d\", &n); scanf(\"%12s\", name);",
      "scanf(\"%d\", &n); scanf(\"%11s\", &name);",
      "scanf(\"%d\", &n); scanf(\"%11s\", name);"
    ],
    "a": 3,
    "k": "mcq"
  },
  "c2-48": {
    "c": [
      "Implementation-defined behavior",
      "Unspecified behavior",
      "Undefined behavior",
      "Defined behavior"
    ],
    "why": "The uninitialized automatic int is read before assignment. No particular output is guaranteed.",
    "q": "Which C-level result is specified for this automatic uninitialized read?",
    "a": 2,
    "k": "mcq",
    "tag": "Bug Hunt"
  },
  "c2-50": {
    "code": "printf(\"%zu\", sizeof(\"abc\"));",
    "why": "The literal contains three letters and a null terminator. sizeof yields size_t, so use %zu in C99 and later, not %d."
  },
  "c2-54": {
    "why": "ASCII lowercase letters are 32 code positions above uppercase letters. Portable case conversion uses ctype functions with valid arguments.",
    "c": [
      "a",
      "A",
      "b",
      "B"
    ],
    "a": 0
  },
  "c3-42": {
    "q": "For int n = 3; double d = 0.5;, what are the types of n + d and n < d respectively?",
    "why": "The usual arithmetic conversions make addition use double. A relational operator yields int 0 or 1 even when it compares double operands.",
    "c": [
      "double, double",
      "int, double",
      "double, int",
      "int, int"
    ],
    "a": 2,
    "k": "mcq"
  },
  "c3-48": {
    "c": [
      "Defined behavior",
      "Undefined behavior",
      "Unspecified behavior",
      "Implementation-defined behavior"
    ],
    "why": "The assignment and postfix-increment side effect modify a without sequencing between those writes. Ordinary a = a + 1 does not have that conflict.",
    "q": "Which classification applies to a = a++; in the shown C17 code?",
    "a": 1,
    "k": "mcq",
    "tag": "Bug Hunt"
  },
  "c3-50": {
    "q": "Assume a + b + c is representable as int. Which expression computes its average without integer-division truncation?",
    "why": "Dividing by 3.0 uses floating-point division. Integer division truncates; casting after it cannot restore the lost fraction.",
    "c": [
      "(double)((a + b + c) / 3)",
      "a / 3 + b / 3 + c / 3",
      "(a + b + c) / 3.0",
      "(a + b + c) / (int)3.0"
    ],
    "a": 2,
    "k": "mcq"
  },
  "c3-54": {
    "why": "Floating-to-integer conversion discards the fraction toward zero; this differs from rounding down or to nearest.",
    "q": "For a representable result, what does converting -2.9 to int produce?",
    "c": [
      "-3",
      "2",
      "-2",
      "3"
    ],
    "a": 2,
    "k": "mcq"
  },
  "c4-06": {
    "c": [
      "Throughout every separately compiled source file",
      "Before its declaration, except where hidden",
      "Only inside functions declared before it",
      "Within that translation unit after declaration, unless hidden"
    ],
    "why": "File scope runs from the declaration to the end of the translation unit, with possible hiding. Linkage is a separate concept.",
    "q": "A variable is declared outside all functions in one source file. Where is its identifier visible by file scope?",
    "a": 3,
    "k": "mcq"
  },
  "c4-17": {
    "why": "A non-void function whose result is used must provide a value on this path. The intended square is n * n for representable products.",
    "q": "Which statement supplies the intended result on the shown missing-return path?",
    "c": [
      "return n + n;",
      "return n;",
      "return n * n;",
      "return 0;"
    ],
    "a": 2,
    "k": "mcq"
  },
  "c4-23": {
    "why": "The output parameters must point to modifiable ints. The function receives copied pointer values and stores through them.",
    "q": "For valid writable destinations, which interface lets divide store both quotient and remainder without a global?",
    "c": [
      "void divide(int, int, int *, int *);",
      "void divide(int, int, int, int);",
      "void divide(int *, int *, int, int);",
      "void divide(int, int, const int *, const int *);"
    ],
    "a": 0,
    "k": "mcq"
  },
  "c4-25": {
    "q": "A function returns &n. Which declaration lets n remain alive for the caller to read after return?",
    "why": "A static local has program-long storage duration. const or volatile does not extend an automatic locals lifetime.",
    "c": [
      "int n = 7;",
      "const int n = 7;",
      "static int n = 7;",
      "volatile int n = 7;"
    ],
    "a": 2,
    "k": "mcq"
  },
  "c4-30": {
    "q": "Which function is invoked for program startup in the standard hosted C model?",
    "why": "Hosted execution begins by calling main. Freestanding startup is implementation-defined.",
    "c": [
      "start",
      "init",
      "main",
      "entry"
    ],
    "a": 2,
    "k": "mcq"
  },
  "c4-41": {
    "c": [
      "A translation constraint requiring a diagnostic",
      "A rule guaranteeing an int return type",
      "A rule postponing all checking until linking",
      "A runtime rule guaranteeing a zero return value"
    ],
    "why": "C99 and later removed implicit function declarations. A conforming implementation must diagnose the constraint violation.",
    "q": "In C17, calling a function with no visible declaration violates what requirement?",
    "a": 0,
    "k": "mcq"
  },
  "c4-47": {
    "c": [
      "The recursive call receives no argument",
      "The function returns the wrong type",
      "The recursive call modifies a global",
      "No reachable base case is provided"
    ],
    "why": "The recursive step has no terminating case. It may exhaust resources, and continued n - 1 operations can reach signed overflow.",
    "q": "Which design defect is present in the shown recursive function?",
    "a": 3,
    "k": "mcq"
  },
  "c4-51": {
    "q": "C passes arguments by value. Passing a pointer can simulate pass by ___; fill in the conventional term.",
    "why": "The conventional phrase is pass by reference. C actually copies a pointer value; the callee can modify the pointed-to object."
  },
  "c4-53": {
    "why": "Each external tentative definition becomes a definition. Multiple external definitions violate C requirements; internal linkage creates separate per-file objects.",
    "q": "Two source files each have a file-scope int count; and both are linked. Which change gives each file its own object?",
    "c": [
      "Use extern int count; in each file",
      "Use static int count; in each file",
      "Use const int count; in each file",
      "Use volatile int count; in each file"
    ],
    "a": 1,
    "k": "mcq"
  },
  "c4-54": {
    "q": "In a conventional implementation using call frames, which information is associated with an active invocation?",
    "why": "Call frames commonly support per-invocation storage and return control, but C does not require a physical stack or a particular layout.",
    "c": [
      "Per-invocation locals and the return continuation",
      "Every callers automatic locals and stored results",
      "All future arguments and their completed results",
      "The complete set of static and global program objects"
    ],
    "a": 0,
    "k": "mcq"
  },
  "c5-02": {
    "c": [
      "5",
      "3",
      "The text \"true\"",
      "1"
    ]
  },
  "c5-05": {
    "q": "A matched case reaches its end with no break, return, or other transfer. What happens if another case follows?",
    "why": "Control continues with the next statement, even across case labels. At the end of the switch body it leaves the switch.",
    "c": [
      "Execution falls through to the next statement without another case test",
      "The switch tests its controlling value again",
      "The next case value is checked before execution",
      "Execution returns to the enclosing function"
    ],
    "a": 0,
    "k": "mcq"
  },
  "c5-13": {
    "q": "Independent floating calculations of the same mathematical result compare unequal. Which explanation justifies a suitable tolerance check?",
    "why": "Rounding can make separately computed approximations differ. Choose an appropriate absolute or relative tolerance when approximate equality is intended; exact equality is useful in other cases.",
    "c": [
      "The computations can round differently",
      "Equality converts both results to integers",
      "Equality tests the addresses of the results",
      "The comparison changes their precision"
    ],
    "a": 0,
    "k": "mcq"
  },
  "c5-16": {
    "why": "Braces attach else to the outer if. Here a is zero, so Y prints. With the same values but no braces, the inner if/else would be skipped.",
    "c": [
      "X",
      "Y",
      "YX",
      "XY"
    ],
    "a": 1
  },
  "c5-22": {
    "q": "For int x, which expression is true exactly when 1 <= x <= 10 mathematically?",
    "why": "&& short-circuits. Bitwise & also gives the correct truth result for these side-effect-free 0/1 operands, but does not short-circuit. The chained comparison is always true.",
    "c": [
      "x >= 1 || x <= 10",
      "x >= 1 && x <= 10",
      "1 <= x <= 10",
      "x > 1 && x < 10"
    ],
    "a": 1,
    "k": "mcq"
  },
  "c5-24": {
    "why": "Duplicate converted case values violate a constraint requiring a diagnostic. C does not mandate a jump-table implementation.",
    "q": "Two case labels have the same value after conversion to the promoted controlling type. Which requirement is violated?",
    "c": [
      "Each case must declare a local variable",
      "Converted case values must be distinct",
      "Every case must end with a break",
      "Each switch must use a jump table"
    ],
    "a": 1,
    "k": "mcq"
  },
  "c5-34": {
    "q": "Which statement exits the innermost switch without returning from the containing function?",
    "c": [
      "break;",
      "continue;",
      "return;",
      "default:"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Without break, control falls through into the next case."
  },
  "c5-43": {
    "q": "For int x, which test is true exactly when x is outside the inclusive interval 1 through 10?",
    "c": [
      "x < 1 && x > 10",
      "x <= 1 || x >= 10",
      "x != 1 && x != 10",
      "x < 1 || x > 10"
    ],
    "a": 3,
    "k": "mcq",
    "why": "By De Morgan's law this equals (x < 1 || x > 10). x < 1 && x > 10 can never be true, because no number is both below 1 and above 10."
  },
  "c5-49": {
    "c": [
      "It is not a modifiable lvalue",
      "It has the wrong storage duration",
      "It is not an integer constant expression",
      "It lacks a prototype"
    ],
    "why": "A case label needs an integer constant expression. This is a language constraint, independent of whether a compiler uses a jump table.",
    "q": "Why is an ordinary runtime int variable invalid as a case-label value in C17?",
    "a": 2,
    "k": "mcq"
  },
  "c5-52": {
    "q": "For any int n, which assignment stores exactly 0 when n is zero and exactly 1 otherwise?",
    "c": [
      "result = !!n;",
      "result = n;",
      "result = !n;",
      "result = n & 1;"
    ],
    "why": "Double logical negation normalizes truth to 0 or 1. Copying n does not normalize it, and n & 1 tests only its low bit.",
    "a": 0,
    "k": "mcq"
  },
  "c5-55": {
    "q": "In the shown array guard, why must the bounds test be the left operand of &&?",
    "why": "The bounds test must establish a valid index before a[i] is evaluated. Short-circuiting can then skip the access when the test fails.",
    "c": [
      "It can reject an invalid index before evaluating the array element",
      "It converts the index to an unsigned type",
      "It adds a hidden sentinel element",
      "It makes the element comparison execute first"
    ],
    "a": 0,
    "k": "mcq",
    "tag": "Concept"
  },
  "c6-03": {
    "q": "Which group describes the control planning for a counted loop?",
    "why": "Counted loops commonly initialize, test and update a counter. Other loops need not have all three; for(;;) can exit via break or return.",
    "c": [
      "An initialized state, a continuation condition, and a progress update",
      "Function prototype, return type, call expression",
      "Input stream, format width, argument address",
      "Array capacity, null terminator, string length"
    ],
    "a": 0,
    "k": "mcq"
  },
  "c6-04": {
    "code": "int i;\nfor (i = 0; i < 5; i++)\n   printf(\"%d \", i);"
  },
  "c6-10": {
    "code": "int i, j;\nfor (i = 1; i <= 3; i++)\n   for (j = 1; j <= 2; j++)\n      printf(\"%d%d \", i, j);"
  },
  "c6-11": {
    "why": "This loop first fails its test at i = 6. Other loops can use different steps or leave via break; counters are not universally one past their last body value.",
    "c": [
      "5",
      "4",
      "0",
      "6"
    ],
    "a": 3
  },
  "c6-19": {
    "q": "For the four binary digits shown, which conversion is performed?",
    "why": "The updates multiply the accumulated value by two and add the next bit, producing 13 for the displayed input. This particular loop drops trailing zero digits; it is not a general converter.",
    "c": [
      "Base-ten numeral to a binary value",
      "Binary numeral to a base-ten value",
      "Numeral with its digit order reversed",
      "Numeral to the sum of its digits"
    ],
    "a": 1,
    "k": "mcq"
  },
  "c6-26": {
    "c": [
      "return;",
      "continue;",
      ";",
      "An update of an unrelated counter"
    ],
    "why": "An omitted condition is true. return, break, an appropriate goto, or termination can leave the loop; continue cannot.",
    "q": "Which statement can leave for (;;) from inside its body?",
    "a": 0,
    "k": "mcq"
  },
  "c6-32": {
    "q": "For nonnegative int n, how many body executions occur in for (i=0; i<n; i++) if the body changes neither variable and never exits early?",
    "c": [
      "n",
      "n - 1",
      "n + 1",
      "2 * n"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Zero through n-1 inclusive is exactly n iterations. This is the standard array-traversal header."
  },
  "c6-40": {
    "q": "Which loop directly expresses obtaining an input once before testing whether another attempt is required?",
    "why": "A posttest loop naturally performs the initial attempt before checking. Other loop forms can implement the same policy with different arrangements.",
    "c": [
      "do ... while",
      "while",
      "A pretest for loop",
      "A switch statement"
    ],
    "a": 0,
    "k": "mcq"
  },
  "c6-47": {
    "c": [
      "Defined unsigned wraparound",
      "A required syntax diagnostic",
      "Automatic conversion to double",
      "Signed integer overflow"
    ],
    "why": "The update moves away from the intended exit. Continuing until a signed operation exceeds its range has undefined behavior.",
    "q": "Which failure can occur if the shown signed counter continues increasing instead of moving toward its bound?",
    "a": 3,
    "k": "mcq"
  },
  "c6-51": {
    "q": "Assume 20! fits the result type and ordinary unoptimized implementations are used. Which comparison of auxiliary storage is reasonable?",
    "c": [
      "Recursive: fixed local state; iterative: a call chain",
      "Recursive: a call chain; iterative: fixed local state",
      "Both require one call frame per multiplication",
      "Neither requires storage for intermediate state"
    ],
    "why": "A conventional recursive implementation retains pending call state while an iterative accumulator uses fixed auxiliary state. C permits optimization and does not require a physical stack.",
    "a": 1,
    "k": "mcq"
  },
  "c6-53": {
    "c": [
      "The condition is false before the first increment",
      "The condition may remain true after ten increments",
      "The float type forbids an increment expression",
      "The compiler must replace 0.1 with integer zero"
    ],
    "why": "Repeated rounding can prevent reaching exactly 1.0. Use an integer count for a specified number of iterations. The != condition may never become false.",
    "q": "On a typical binary floating implementation, which issue makes this loop unsuitable for exactly ten iterations?",
    "a": 1,
    "k": "mcq"
  },
  "c1-02": {
    "q": "A CPU has fetched instructions from an executable. Which representation does it execute directly?",
    "c": [
      "Machine language",
      "Assembly mnemonics",
      "Preprocessed C",
      "Intermediate code"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Machine language is binary instructions specific to that CPU. Everything else must be translated down to it first."
  },
  "c1-03": {
    "q": "A translated object file refers to a library function whose code is not yet attached. Which stage resolves that reference?",
    "c": [
      "Compilation",
      "Loading",
      "Linking",
      "Preprocessing"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The linker resolves references to library code and other object modules and writes the executable file."
  },
  "c1-04": {
    "q": "An executable exists on disk and has already been linked. Which operation belongs to loading?",
    "c": [
      "Resolving external function names",
      "Expanding conditional directives",
      "Translating statements to object code",
      "Placing executable code in memory"
    ],
    "a": 3,
    "k": "mcq",
    "why": "The loader is the last step: it places the executable program into main memory and hands control to it."
  },
  "c1-06": {
    "q": "All arithmetic stays within its type range, but a program divides by the wrong count. Which error best describes the wrong average?",
    "c": [
      "Syntax error",
      "Logic error",
      "Linking error",
      "Input failure"
    ],
    "a": 1,
    "k": "mcq",
    "why": "A logic error means the code is legal C and does not crash - it simply does the wrong thing. The computer cannot detect it for you."
  },
  "c1-07": {
    "q": "Which program primarily serves an end-user task rather than managing or developing the computer system?",
    "c": [
      "Spreadsheet application",
      "Device driver",
      "C compiler",
      "Operating-system loader"
    ],
    "a": 0,
    "k": "mcq",
    "why": "System software manages the machine (OS, system support, system development tools). Application software solves the user's problem."
  },
  "c1-08": {
    "q": "One spreadsheet product is used for budgets, schedules, and laboratory results. Which software category fits this reuse?",
    "c": [
      "Application-specific system",
      "System-development software",
      "General-purpose application",
      "Operating-system component"
    ],
    "a": 2,
    "k": "mcq",
    "why": "General-purpose software (word processors, spreadsheets, DBMS) serves many purposes; application-specific software solves exactly one problem."
  },
  "c1-10": {
    "q": "A design specifies inputs and finite, unambiguous steps that produce the required outputs. What has been specified?",
    "c": [
      "A source listing",
      "A test oracle",
      "An algorithm",
      "A structure chart"
    ],
    "a": 2,
    "k": "mcq",
    "why": "An algorithm is the ordered set of steps that solves the problem. Flowcharts and pseudocode are two ways to write one down."
  },
  "c1-11": {
    "q": "A diagram shows main calling readData and calculate, without their internal decisions. Which design tool is it?",
    "c": [
      "Algorithm flowchart",
      "State-transition graph",
      "Structure chart",
      "Control-flow graph"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The structure chart is a design tool showing the hierarchy of functions. Flowcharts and pseudocode describe the algorithm within a function."
  },
  "c1-12": {
    "q": "Which ordering matches the course system-development life cycle?",
    "c": [
      "Requirements, design, analysis, code, test, maintenance",
      "Analysis, code, requirements, design, test, maintenance",
      "Requirements, analysis, design, code, test, maintenance",
      "Requirements, analysis, code, test, design, maintenance"
    ],
    "a": 2,
    "k": "mcq",
    "why": "System requirements -> analysis -> design -> code -> system test -> maintenance. Maintenance is the longest and most expensive phase."
  },
  "c1-13": {
    "q": "Which development order reduces the chance of correctly implementing the wrong task?",
    "c": [
      "Understand, design, implement, test",
      "Design, implement, understand, test",
      "Understand, implement, test, design",
      "Implement, understand, design, test"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Understand, design, code, test. Writing code before you understand the problem is exactly what \"resist the temptation to code\" warns against."
  },
  "c1-14": {
    "q": "A student can write the formula immediately but has not established whether an empty input is allowed. What should happen next?",
    "c": [
      "Implement the formula before analysis",
      "Clarify the input contract before coding",
      "Choose variable names before requirements",
      "Treat an empty input as a compiler error"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Understanding the input domain and expected behavior prevents choosing an arbitrary policy for an unspecified case."
  },
  "c1-15": {
    "q": "A machine loses power. Which storage normally loses its working contents?",
    "c": [
      "Flash storage",
      "Magnetic disk",
      "Main RAM",
      "Read-only firmware"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Main memory is fast but volatile. Auxiliary storage keeps programs and data between runs."
  },
  "c1-16": {
    "q": "Two applications both request CPU time and disk access. Which responsibility belongs primarily to the operating system?",
    "c": [
      "Deriving the applications arithmetic formulas",
      "Replacing the applications test cases",
      "Scheduling CPU time and managing shared I/O resources",
      "Translating each source file into object code"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The OS provides the user interface, file and database access, and communication services, managing resources efficiently."
  },
  "c1-17": {
    "q": "Why does an assembly-language program usually require changes for a different CPU instruction set?",
    "c": [
      "Its variables have external linkage",
      "Its source omits a preprocessing stage",
      "Its mnemonics encode target instructions",
      "Its algorithms require volatile storage"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Assembly gives mnemonics for a particular CPU's instructions - basically one-to-one. High-level statements typically expand into many machine instructions and are portable."
  },
  "c1-18": {
    "q": "Which activity best demonstrates software engineering rather than merely producing code?",
    "c": [
      "Increasing statement count to improve functionality",
      "Finishing implementation before choosing requirements",
      "Validating requirements and maintaining tested designs",
      "Using compilation success as acceptance testing"
    ],
    "a": 2,
    "k": "mcq",
    "why": "It applies engineering discipline - measurable, repeatable methods - to building working software."
  },
  "c1-19": {
    "q": "A tester chooses cases from the input contract without reading the implementation. What testing approach is this?",
    "c": [
      "White-box testing",
      "Black-box testing",
      "Translation testing",
      "Linkage analysis"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Black box (functional) testing works from what the program must do. White box (structural) testing uses knowledge of the code to exercise its paths."
  },
  "c1-20": {
    "q": "A compiler produces an object file with an unresolved printf reference. What additional build step is needed before ordinary execution?",
    "c": [
      "Link the object with the missing library implementation",
      "Preprocess the object as C source",
      "Load the source instead of the object",
      "Recompile the source as a header"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The object file has your translated code but unresolved references (like printf). The linker resolves them and produces the executable."
  },
  "c1-22": {
    "q": "Which order describes a conventional C build and launch?",
    "c": [
      "Preprocess, link, compile, load",
      "Compile, load, preprocess, link",
      "Preprocess, compile, link, load",
      "Load, compile, link, preprocess"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Preprocess, translate to object code, link into an executable, then load it into memory to run."
  },
  "c1-23": {
    "q": "A desktop validates an order and a server updates the shared inventory. Which model best describes this division?",
    "c": [
      "Dumb-terminal time-sharing",
      "Standalone personal processing",
      "Client/server processing",
      "Single-user batch processing"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The split of work is exactly what distinguishes client/server from time-sharing."
  },
  "c1-25": {
    "q": "An undocumented system must be changed years after delivery. Which difficulty directly explains the added maintenance cost?",
    "c": [
      "Recovering assumptions and dependencies",
      "Rebuilding objects before preprocessing",
      "Replacing the CPU instruction set",
      "Repeating input acquisition for every source file"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Maintenance requires understanding the existing design, its assumptions, and the effects of changes. Missing documentation makes that understanding harder."
  },
  "c1-27": {
    "q": "Which pairing misidentifies the purpose of a design tool?",
    "c": [
      "Flowchart: paths through an algorithm",
      "Pseudocode: steps without exact C syntax",
      "Structure chart: relationships between modules",
      "Structure chart: decisions within one function"
    ],
    "a": 3,
    "k": "mcq",
    "why": "A structure chart deliberately says nothing about the logic inside a function; that is the job of a flowchart or pseudocode."
  },
  "c1-30": {
    "q": "Which pair describes the two CPU components in the course model?",
    "c": [
      "Control unit and auxiliary storage",
      "Arithmetic-logic unit and primary storage",
      "The arithmetic-logic unit and the instruction control unit",
      "Input interface and output interface"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The ALU performs calculations and comparisons; the control unit directs the flow of instructions and data."
  },
  "c1-31": {
    "q": "Which device primarily sends user data into the computer?",
    "c": [
      "Monitor",
      "Printer",
      "Speaker",
      "Keyboard"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Input devices bring data in. Monitors, printers and speakers all send data out."
  },
  "c1-33": {
    "q": "Which pairing correctly contrasts ROM with ordinary RAM?",
    "c": [
      "Random-order memory; normally volatile",
      "Read-only memory; normally nonvolatile",
      "Read-once memory; volatile after reading",
      "Rewritable-output memory; CPU-managed"
    ],
    "a": 1,
    "k": "mcq",
    "why": "ROM keeps its contents without power and is normally not written by programs; RAM is volatile working memory."
  },
  "c1-34": {
    "q": "A source includes stdio.h but is not yet linked. What has inclusion chiefly supplied?",
    "c": [
      "Executable bodies for library calls",
      "Declarations for library facilities",
      "Resolution of external references",
      "A loaded copy of the C runtime"
    ],
    "a": 1,
    "k": "mcq",
    "why": "The header supplies prototypes and types. The actual machine code for printf is added later, by the linker."
  },
  "c1-35": {
    "q": "A flowchart must branch according to whether count is zero. Which symbol represents that decision?",
    "c": [
      "Rectangle",
      "Parallelogram",
      "Diamond",
      "Oval"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Diamond = decision, rectangle = process, parallelogram = input/output, oval = start/stop."
  },
  "c1-36": {
    "q": "Which group contains the three basic structured control forms?",
    "c": [
      "Input, calculation, output",
      "Declare, assign, return",
      "Sequence, selection, repetition",
      "Preprocess, compile, link"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Any algorithm can be built from just these three. C provides all three directly."
  },
  "c1-37": {
    "q": "A list of raw exam scores is used to compute a class average. In the course terminology, which pairing is correct?",
    "c": [
      "Scores are information; average is data",
      "Scores are data; average is information",
      "Both are source code; neither is data",
      "Both are metadata; neither is information"
    ],
    "a": 1,
    "k": "mcq",
    "why": "A list of test scores is data; the class average computed from them is information."
  },
  "c1-39": {
    "q": "Which item belongs in a conventional compiled library rather than a header?",
    "c": [
      "Prototypes declaring function interfaces",
      "Macro definitions selecting constants",
      "Object code implementing functions",
      "Typedefs describing exposed structures"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The header declares the function; the library holds the compiled code the linker actually attaches."
  },
  "c1-41": {
    "q": "Which module interface best supports testing a calculation independently?",
    "c": [
      "Several hidden globals updated by callers",
      "A shared buffer with undocumented ownership",
      "Explicit inputs and a specified result",
      "A dependency on the callers declaration order"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Explicit inputs and outputs make dependencies visible and allow focused tests."
  },
  "c1-42": {
    "q": "Assume the operations are defined and all input is valid. Which defect is a logic error?",
    "c": [
      "Adding two values where the formula needs multiplication",
      "Using a reserved keyword as a variable identifier",
      "Omitting a declaration required before a function call",
      "Assigning a complete array with the assignment operator"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The program compiles and runs happily; the answer is simply wrong. Nothing but testing will catch it."
  },
  "c1-43": {
    "q": "Which defect requires a translation diagnostic in conforming C?",
    "c": [
      "A wrong but representable average",
      "A loop processing one extra valid element",
      "An unmatched closing brace",
      "An unused branch with an incorrect formula"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Syntax errors are caught during translation. The other three only show up when the program runs."
  },
  "c1-46": {
    "q": "Which property lets pseudocode support design before committing to C syntax?",
    "c": [
      "It expresses the algorithm with an informal notation",
      "It supplies a machine-specific executable format",
      "It resolves object-file library dependencies",
      "It checks argument types during preprocessing"
    ],
    "a": 0,
    "k": "mcq",
    "why": "It lets you reason about the algorithm without arguing with a compiler about punctuation."
  },
  "c1-47": {
    "q": "Requirements specify that a report must contain a median. Which later decision belongs to design?",
    "c": [
      "Choosing the computation algorithm and the module interfaces",
      "Determining whether users need the median",
      "Deciding which outputs stakeholders require",
      "Establishing the accepted input-data contract"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Requirements and analysis establish what is needed; design specifies the implementation that will deliver it."
  },
  "c1-48": {
    "q": "A tester uses the code to choose inputs that exercise both outcomes of every branch. What approach is this?",
    "c": [
      "Black-box testing",
      "White-box testing",
      "Requirements discovery",
      "External-linkage checking"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Black box tests come from the specification; white box tests come from the code, aiming to cover every branch."
  },
  "c1-49": {
    "q": "Why is auxiliary storage suitable for preserving data across ordinary power loss?",
    "c": [
      "It holds each programs active register values",
      "It supplies faster access than main memory",
      "It normally retains its stored contents",
      "It runs the programs current instructions"
    ],
    "a": 2,
    "k": "mcq",
    "why": "It is slower and larger, and it is where programs and data live between runs."
  },
  "c1-50": {
    "q": "sqrt is declared correctly and compilation succeeds, but linking reports an unresolved sqrt. Which step should be investigated first?",
    "c": [
      "Changing the type of the local result",
      "Increasing the number of source comments",
      "Linking the required math implementation",
      "Moving the prototype inside the loop"
    ],
    "a": 2,
    "k": "mcq",
    "why": "A missing header is a COMPILE error. A missing library is a LINK error - the prototype was known but the code was not found."
  },
  "c1-51": {
    "q": "Why can one high-level statement correspond to several target instructions?",
    "c": [
      "The statement combines several lower-level operations",
      "Each source character needs a distinct instruction",
      "The linker expands all statements into macros",
      "The loader assigns one instruction to each variable"
    ],
    "a": 0,
    "k": "mcq",
    "why": "That expansion is exactly the abstraction a high-level language buys you, and why assembly is roughly one-to-one instead."
  },
  "c1-52": {
    "q": "Which question is answered by a structure chart rather than by a flowchart of calculate?",
    "c": [
      "Which branch handles zero within calculate?",
      "Which modules call calculate?",
      "How is the accumulator updated in calculate?",
      "Which loop condition terminates calculate?"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Structure chart = the shape of the program. Flowchart = the shape of one algorithm."
  },
  "c1-53": {
    "q": "Two implementations pass the same tests. Which additional property helps a maintainer change one safely?",
    "c": [
      "Fewer comments about input constraints",
      "More shared variables for communication",
      "Identical names for unrelated local objects",
      "Documented assumptions, interfaces, and module dependencies"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Most of a program's cost is paid after it first works. Readability is an engineering property, not a decoration."
  },
  "c1-57": {
    "q": "A team implements a report efficiently, then learns the required statistic was different. Which earlier activity best prevents this failure?",
    "c": [
      "Confirming the required output with examples",
      "Selecting the compiler warning level",
      "Translating the formulas into source statements",
      "Linking the complete set of library functions"
    ],
    "a": 0,
    "k": "mcq",
    "why": "A misunderstanding caught in requirements costs a conversation; caught in maintenance it costs a rewrite."
  },
  "c1-ed4-001": {
    "q": "A validator accepts integer ages 0 through 120 inclusive. Which test set checks both boundaries and the adjacent rejected values?",
    "c": [
      "0, 1, 119, 120",
      "-1, 0, 120, 121",
      "-2, -1, 121, 122",
      "1, 60, 119, 120"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Tests just inside and outside the limits expose boundary mistakes."
  },
  "c1-ed4-002": {
    "q": "A solution outline lists steps but leaves empty-input behavior unspecified. What remains unresolved before implementation?",
    "c": [
      "The library-linking sequence",
      "The object-file instruction set",
      "The source-file naming convention",
      "The input/output contract"
    ],
    "a": 3,
    "k": "mcq",
    "why": "An algorithm should specify its accepted inputs, required outputs, and terminating steps. Empty-input policy is part of that contract."
  },
  "c1-ed4-003": {
    "q": "A program compiles and runs without violating a C rule, but computes the wrong discount. Which conclusion follows?",
    "c": [
      "The output proves that linking failed",
      "The formula error must be a syntax violation",
      "Successful translation did not establish correctness",
      "A runtime diagnostic is required for the result"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Passing compilation does not establish correctness."
  },
  "c1-ed4-004": {
    "q": "A yes/no flowchart decision has only one outgoing arrow. What information is missing?",
    "c": [
      "The source files machine representation",
      "The libraries externally linked addresses",
      "The destination for the other outcome",
      "The storage class of each local variable"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Both outcomes need a defined next step."
  },
  "c1-tf-001": {
    "q": "Which representation can the processor execute without translating language-level syntax?",
    "c": [
      "Target machine instructions",
      "Assembly-language mnemonics",
      "A preprocessed C translation unit",
      "Algorithm pseudocode"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Machine language is the binary instruction set understood by the processor. Higher-level source must be translated first.",
    "tag": "Concept"
  },
  "c1-tf-002": {
    "q": "A process stores a working total in RAM and a checkpoint on disk. Which normally survives power removal?",
    "c": [
      "The working total in RAM",
      "Both stored values",
      "The checkpoint on disk",
      "Neither stored value"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Ordinary primary memory is volatile; auxiliary storage is used for persistent data.",
    "tag": "Concept"
  },
  "c1-tf-003": {
    "q": "Which property is required of an algorithm intended to compute a result for every valid input?",
    "c": [
      "It uses a fixed number of C functions",
      "It allocates every variable statically",
      "It contains exactly one decision",
      "It terminates for every valid input"
    ],
    "a": 3,
    "k": "mcq",
    "why": "A usable algorithm has ordered, unambiguous steps and must eventually terminate.",
    "tag": "Concept"
  },
  "c1-tf-004": {
    "q": "A denominator is valid, but the formula uses the wrong numerator. What can a conforming compiler conclude from legal syntax alone?",
    "c": [
      "The formula forces a translation diagnostic",
      "The formula forces an external-linkage error",
      "The program can translate despite the wrong formula",
      "The calculation must stop before producing output"
    ],
    "a": 2,
    "k": "mcq",
    "why": "A program with a logic error can compile and run while still producing the wrong result.",
    "tag": "Concept"
  },
  "c1-tf-005": {
    "q": "A test designer sees only a specification and the public interface. Which evidence can guide black-box cases?",
    "c": [
      "Valid inputs, boundaries, and required outputs",
      "The line numbers of every internal branch",
      "The local variable names in each helper",
      "The instruction addresses used by the loader"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Black-box testing checks externally visible behavior against the specification.",
    "tag": "Concept"
  },
  "c1-tf-006": {
    "q": "Which stage combines separately compiled modules before the executable is loaded?",
    "c": [
      "Loading",
      "Preprocessing",
      "Linking",
      "Input validation"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The linker builds the executable; the loader places it into memory for execution.",
    "tag": "Concept"
  },
  "c1-tf-007": {
    "q": "A program passes fifty tests. Which conclusion is supported?",
    "c": [
      "Every possible input has been validated",
      "Those tested cases met their checked expectations",
      "All undefined behavior has been eliminated",
      "The specification must be complete"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Tests show behavior for the cases exercised, but they generally cannot prove the absence of every defect.",
    "tag": "Concept"
  },
  "c1-tf-008": {
    "q": "Which diagram would you choose to show the calling relationships among five modules?",
    "c": [
      "An internal flowchart",
      "A structure chart",
      "An input-data histogram",
      "A source-line coverage chart"
    ],
    "a": 1,
    "k": "mcq",
    "why": "A structure chart shows functional decomposition, while a flowchart describes algorithmic control flow.",
    "tag": "Concept"
  },
  "c2-02": {
    "q": "Given int n = -12, which conversion in printf prints n as a signed decimal integer?",
    "c": [
      "%u",
      "%x",
      "%c",
      "%d"
    ],
    "a": 3,
    "k": "mcq",
    "why": "%d is decimal int, %c is a character, %f is float/double, %s is a string."
  },
  "c2-03": {
    "q": "Which value is sizeof(\"Hello\") in C bytes?",
    "c": [
      "6",
      "5",
      "7",
      "1"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Five characters plus the null character \\0 that terminates every C string."
  },
  "c2-04": {
    "q": "Given int num, which call supplies the argument type required to store a decimal integer?",
    "c": [
      "scanf(\"%d\", num);",
      "scanf(\"%f\", &num);",
      "scanf(\"%u\", &num);",
      "scanf(\"%d\", &num);"
    ],
    "a": 3,
    "k": "mcq",
    "why": "scanf must be given the ADDRESS of the variable so it can store into it, and %d matches an int."
  },
  "c2-07": {
    "q": "Which pairing correctly gives sizeof('A') and sizeof(\"A\")?",
    "c": [
      "sizeof(int), 2",
      "sizeof(char), 1",
      "sizeof(int), 1",
      "sizeof(char), 2"
    ],
    "a": 0,
    "k": "mcq",
    "why": "An ordinary integer character constant has type int. The string literal has two char elements, including its terminator."
  },
  "c2-09": {
    "q": "Which characters does printf(\"%%d\") write?",
    "c": [
      "%",
      "d",
      "%d",
      "%%d"
    ],
    "a": 2,
    "k": "mcq",
    "why": "%% writes one percent sign, and the following d is ordinary literal text."
  },
  "c2-10": {
    "q": "A block declares int total and int Total. Which statement is accurate?",
    "c": [
      "They redeclare one object",
      "They name different objects",
      "They create a syntax error",
      "They share storage by default"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Case matters in C, which is why a typo in capitalization produces an \"undeclared identifier\" error."
  },
  "c2-14": {
    "q": "Which declaration gives PI type double and prevents an ordinary later assignment to PI?",
    "c": [
      "static double PI = 3.1416;",
      "const double PI = 3.1416;",
      "double const *PI;",
      "double * const PI = 0;"
    ],
    "a": 1,
    "k": "mcq",
    "why": "const double declares a const-qualified object. static changes storage duration, while the pointer declarations describe different types."
  },
  "c2-15": {
    "q": "For int x, what differs between scanf(\"%d\", &x) and printf(\"%d\", x)?",
    "c": [
      "A reference argument versus a pointer",
      "A destination pointer versus a value",
      "A size_t argument versus an int",
      "A stored constant versus a variable"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Both calls pass argument values. The value passed to scanf is a pointer through which it stores; printf receives the integer value to display."
  },
  "c2-18": {
    "q": "Which escape writes a newline rather than a carriage return or tab?",
    "c": [
      "\\n",
      "\\r",
      "\\t",
      "\\b"
    ],
    "a": 0,
    "k": "mcq",
    "why": "\\n is newline, \\t is tab, \\r is carriage return, and \\0 is the null character used to end strings."
  },
  "c2-20": {
    "q": "Which sequence closes a /* ... */ comment?",
    "c": [
      "The first subsequent */",
      "A matching number of nested */ markers",
      "The next unescaped newline",
      "The first subsequent // marker"
    ],
    "a": 0,
    "k": "mcq",
    "why": "C block comments do not nest. A nested opening marker does not postpone the first closing marker."
  },
  "c2-22": {
    "q": "In char grade = \"A\";, which replacement gives grade a character value?",
    "c": [
      "char grade = 'A';",
      "char *grade = \"A\";",
      "char grade[] = {'A'};",
      "char grade[] = \"A\";"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Only the first form declares a single char initialized from a character constant. The other forms declare a pointer or an array."
  },
  "c2-23": {
    "q": "Assume unsigned int has a range of 0 through 65535. What is the result of assigning -1 to unsigned int count?",
    "c": [
      "-1",
      "0",
      "65535",
      "32767"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Conversion to unsigned repeatedly adds or subtracts one more than the maximum representable value. -1 therefore converts to the maximum."
  },
  "c2-30": {
    "q": "Which proposed variable name violates identifier syntax?",
    "c": [
      "total1",
      "total_1",
      "1total",
      "Total1"
    ],
    "a": 2,
    "k": "mcq",
    "why": "An identifier may not begin with a digit. Letters and the underscore are the only legal first characters."
  },
  "c2-31": {
    "q": "In C17, which name cannot be a variable identifier because it is a keyword?",
    "c": [
      "Return",
      "return_value",
      "return",
      "returned"
    ],
    "a": 2,
    "k": "mcq",
    "why": "return is reserved. So are int, float, if, else, while, for, switch, break, continue, void, struct and the rest."
  },
  "c2-32": {
    "q": "A printf call receives a double and must use fixed decimal notation. Which conversion is appropriate?",
    "c": [
      "%f",
      "%e",
      "%g",
      "%d"
    ],
    "a": 0,
    "k": "mcq",
    "why": "%f uses fixed decimal notation; %e uses scientific notation and %g chooses its format by precision and exponent rules. %d requires int."
  },
  "c2-33": {
    "q": "Which escape advances to a horizontal tab position?",
    "c": [
      "\\v",
      "\\r",
      "\\t",
      "\\b"
    ],
    "a": 2,
    "k": "mcq",
    "why": "\\n newline, \\t tab, \\\\ backslash, \\\" double quote, \\0 null, \\r carriage return."
  },
  "c2-34": {
    "q": "Which printf call writes one literal backslash?",
    "c": [
      "printf(\"\\n\");",
      "printf(\"/\");",
      "printf(\"\\\\\");",
      "printf(\"%%\");"
    ],
    "a": 2,
    "k": "mcq",
    "why": "A backslash starts an escape sequence, so it has to be escaped with another backslash."
  },
  "c2-35": {
    "q": "Which declaration directly stores one character rather than a pointer or an array?",
    "c": [
      "char *letter = \"Q\";",
      "char letter[2] = \"Q\";",
      "const char *letter = \"Q\";",
      "char letter = 'Q';"
    ],
    "a": 3,
    "k": "mcq",
    "why": "char holds one character. C has no string type - a string is an array of char."
  },
  "c2-36": {
    "q": "On a conforming implementation with CHAR_BIT equal to 16, what is sizeof(char)?",
    "c": [
      "2",
      "8",
      "1",
      "16"
    ],
    "a": 2,
    "k": "mcq",
    "why": "sizeof counts C bytes; one char occupies one byte even if that byte contains sixteen bits."
  },
  "c2-37": {
    "q": "Which statement declares an int object and initializes it to zero?",
    "c": [
      "int count == 0;",
      "count = 0;",
      "int count = 0;",
      "int count; count == 0;"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Type, name, equals, value. == is comparison and := is not C at all."
  },
  "c2-44": {
    "q": "Given const int limit = 10;, which operation violates a constraint?",
    "c": [
      "limit = 12;",
      "int n = limit;",
      "printf(\"%d\", limit);",
      "const int *p = &limit;"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The object cannot be modified by assignment through its const-qualified name. Reading its value or taking its address is permitted."
  },
  "c2-46": {
    "q": "Which declaration is not also a definition of an int object?",
    "c": [
      "int total;",
      "extern int total;",
      "static int total;",
      "int total = 0;"
    ],
    "a": 1,
    "k": "mcq",
    "why": "An extern declaration without an initializer can declare an object defined elsewhere. The file-scope int total; is a tentative definition."
  },
  "c2-47": {
    "q": "In the shown code, what makes text after the nested-looking comment visible to the parser?",
    "c": [
      "The first */ ends the block comment",
      "The inner /* creates an executable statement",
      "The newline closes every block comment",
      "The second */ reopens the outer comment"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Block comments do not nest; the first closing marker ends the comment."
  },
  "c2-49": {
    "q": "Why is the shown printf call invalid at runtime?",
    "c": [
      "The literal text requires a pointer argument",
      "The int value must be passed by address",
      "The newline requires a separate character argument",
      "A %d conversion lacks its corresponding int argument value"
    ],
    "a": 3,
    "k": "mcq",
    "why": "A conversion such as %d needs a corresponding correctly typed variadic argument. A missing argument gives undefined behavior."
  },
  "c2-51": {
    "q": "Why is int int = 3; invalid?",
    "c": [
      "The second int is a reserved keyword",
      "The value 3 exceeds the type range",
      "The identifier must begin uppercase",
      "The initializer must use a cast"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Keywords are reserved and using one as a name is a syntax error, not merely bad style."
  },
  "c2-53": {
    "q": "A rate is duplicated in twelve formulas. Which design most directly reduces inconsistent updates?",
    "c": [
      "Use one named rate in the formulas",
      "Replace every rate with an unnamed literal",
      "Make twelve independently initialized variables",
      "Change the source indentation around each rate"
    ],
    "a": 0,
    "k": "mcq",
    "why": "One meaningful definition centralizes the value and exposes its purpose. Twelve independent definitions preserve the inconsistency risk."
  },
  "c2-55": {
    "q": "On a machine with 8-bit char, which difference is possible between plain char and unsigned char?",
    "c": [
      "Plain char may have a negative range",
      "Unsigned char may have a negative range",
      "Plain char must have exactly 256 positive values",
      "Unsigned char must reserve a separate sign bit"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The signedness of plain char is implementation-defined. With eight-bit bytes, unsigned char ranges from 0 through 255."
  },
  "c2-56": {
    "q": "For printf(\"%d\", 3.0), which change matches the argument type without changing the argument?",
    "c": [
      "Use %u in the format",
      "Use %f in the format",
      "Use %c in the format",
      "Use %ld in the format"
    ],
    "a": 1,
    "k": "mcq",
    "why": "The argument has type double; %f expects double in printf after default argument promotions. %d expects int."
  },
  "c2-57": {
    "q": "A calculation accumulates rounding error in float. Which is a valid reason to consider double?",
    "c": [
      "It makes every decimal exact",
      "It prevents integer overflow",
      "It may provide greater precision",
      "It eliminates the need for input bounds"
    ],
    "a": 2,
    "k": "mcq",
    "why": "double is at least as precise as float and commonly more precise. It still rounds and does not validate inputs or prevent overflow in integer subexpressions."
  },
  "c2-ed4-001": {
    "q": "Which printf format matches the result of sizeof in C99 and later?",
    "c": [
      "%zu",
      "%u",
      "%lu",
      "%d"
    ],
    "a": 0,
    "k": "mcq",
    "why": "sizeof produces size_t; the variadic format must match that type."
  },
  "c2-ed4-002": {
    "q": "Assume signed char ranges from -128 through 127. In C17, how is converting int value 200 to signed char classified?",
    "c": [
      "Defined behavior",
      "Implementation-defined behavior",
      "Undefined behavior",
      "Unspecified behavior"
    ],
    "a": 1,
    "k": "mcq",
    "why": "For an out-of-range conversion to a signed integer type, C17 permits an implementation-defined result or an implementation-defined signal. This differs from out-of-range floating-to-integer conversion.",
    "code": "int value = 200;\nsigned char c = value;"
  },
  "c2-ed4-003": {
    "q": "In C17, which header defines bool as a macro for _Bool?",
    "c": [
      "<stddef.h>",
      "<stdint.h>",
      "<limits.h>",
      "<stdbool.h>"
    ],
    "a": 3,
    "k": "mcq",
    "why": "The underlying language type is _Bool; the header provides convenient names."
  },
  "c2-ed4-004": {
    "q": "Which identifier is reserved to the implementation even for a local object?",
    "c": [
      "buffer__",
      "__buffer",
      "buffer_2",
      "Buffer_2"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Names beginning with two underscores are reserved; do not use them for application identifiers."
  },
  "c2-13": {
    "q": "What is printed?",
    "c": [
      "\"3.14    \"",
      "\"   3.142\"",
      "\"3.1416  \"",
      "\"    3.14\""
    ],
    "a": 3,
    "k": "mcq",
    "why": "A minimum field width of eight right-justifies the four-character value 3.14 with four leading spaces; precision two rounds to two fractional digits."
  },
  "c2-26": {
    "q": "Which diagnosis fits the second printf?",
    "c": [
      "A subscript exceeding an allocated array bound",
      "A dereference through an uninitialized pointer",
      "An assignment to a nonmodifiable left operand",
      "A format conversion not matching its argument type"
    ],
    "a": 3,
    "k": "mcq",
    "why": "%f requires a double argument in printf; the supplied int is not converted by the format string. The mismatch has undefined behavior.",
    "tag": "Concept"
  },
  "c2-tf-001": {
    "q": "Which property of plain char is guaranteed for the basic execution character set?",
    "c": [
      "It is always an unsigned type",
      "It always uses eight bits",
      "It can represent every basic character",
      "It has the same range as int"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The char types are integral types, and plain char can represent every member of C's basic execution character set.",
    "tag": "Concept"
  },
  "c2-tf-002": {
    "q": "Given char c = 3.5; and assuming 3 is representable, which value is stored?",
    "c": [
      "4",
      "3.5",
      "0",
      "3"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Conversion from a floating value to an integer type discards the fractional part when the result is representable. char is an integer type.",
    "tag": "Concept"
  },
  "c2-tf-003": {
    "q": "Assuming ASCII, what is the value of 'D' - 'A'?",
    "c": [
      "4",
      "3",
      "32",
      "0"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Uppercase ASCII letters have consecutive codes. This question explicitly assumes ASCII.",
    "tag": "Concept"
  },
  "c2-tf-004": {
    "q": "Which ASCII value belongs to the initial control-character range rather than the printable-character range?",
    "c": [
      "32",
      "48",
      "10",
      "65"
    ],
    "a": 2,
    "k": "mcq",
    "why": "ASCII values 0 through 31 are control codes such as newline, tab, and carriage return.",
    "tag": "Concept"
  },
  "c2-tf-005": {
    "q": "Given int n = 5; and double d = 5.0;, which statement is accurate?",
    "c": [
      "Equal numeric values need not have the same type or representation",
      "Equal numeric values imply identical object sizes",
      "The initialization changes ns declared type",
      "Both objects acquire the type of the value 5"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Types describe representation and permitted operations; the same mathematical value can be represented by different types.",
    "tag": "Concept"
  },
  "c2-tf-006": {
    "q": "Which use violates the rule that a declaration must be visible before use?",
    "c": [
      "Reading a parameter before local declarations",
      "Calling a declared function before its definition",
      "Reading a static local after its declaration",
      "Reading a local n before its declaration"
    ],
    "a": 3,
    "k": "mcq",
    "why": "A visible declaration is required. A prototype can be sufficient for a function call before its definition.",
    "tag": "Concept"
  },
  "c2-tf-007": {
    "q": "Which pair declares two pointers to int without accidentally declaring a plain int?",
    "c": [
      "int *p, q;",
      "int p, *q;",
      "int p; int *q;",
      "int *p; int *q;"
    ],
    "a": 3,
    "k": "mcq",
    "why": "The star belongs to each declarator. Separate declarations can make this distinction easier to inspect.",
    "tag": "Concept"
  },
  "c2-tf-008": {
    "q": "Which local object is initialized to zero if no initializer is written?",
    "c": [
      "static int n;",
      "int n;",
      "register int n;",
      "int *n;"
    ],
    "a": 0,
    "k": "mcq",
    "why": "A static-storage object is zero-initialized. Automatic objects without initializers have indeterminate values.",
    "tag": "Concept"
  },
  "c2-tf-009": {
    "q": "Which C string literal contains a newline character followed by a terminator?",
    "c": [
      "\"\\\\n\"",
      "\"/n\"",
      "\"\\n\"",
      "\"n\""
    ],
    "a": 2,
    "k": "mcq",
    "why": "The escape \n denotes newline. A doubled backslash denotes a backslash character rather than starting the newline escape.",
    "tag": "Concept"
  },
  "c2-tf-010": {
    "q": "Which C17 expression has type int rather than an array or a pointer?",
    "c": [
      "'A'",
      "\"A\"",
      "\"A\" + 0",
      "&\"A\""
    ],
    "a": 0,
    "k": "mcq",
    "why": "An ordinary integer character constant has type int. A string literal has array type and normally converts to a pointer in expressions.",
    "tag": "Concept"
  },
  "c2-tf-011": {
    "q": "Which literal has type double rather than int, unsigned int, or float?",
    "c": [
      "10.0",
      "10",
      "10u",
      "10.0f"
    ],
    "a": 0,
    "k": "mcq",
    "why": "An unsuffixed floating literal has type double; f selects float and u on an integer literal selects an unsigned integer type.",
    "tag": "Concept"
  },
  "c2-tf-012": {
    "q": "Why must a macro definition appear before the source occurrence intended to use it?",
    "c": [
      "Macros acquire scope after program loading",
      "A macro definition governs later tokens until it is undefined",
      "The linker needs definitions before prototypes",
      "A definition allocates storage for later uses"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Preprocessing directives are processed in order. A later definition does not retroactively expand an earlier occurrence.",
    "tag": "Concept"
  },
  "c2-tf-013": {
    "q": "After #define LIMIT 10u, what type does the expanded literal have in an ordinary expression?",
    "c": [
      "unsigned int",
      "int",
      "double",
      "char"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The macro itself is not an object declaration, but its expanded literal 10u has type unsigned int.",
    "tag": "Concept"
  },
  "c3-05": {
    "q": "For an ordinary int x whose multiplication fits int, which operation is equivalent to x *= 3?",
    "c": [
      "x = x * 3",
      "x = 3 / x",
      "x = x + 3",
      "x = 3 - x"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Compound assignment applies the operator between the variable and the expression, then assigns back."
  },
  "c3-07": {
    "q": "Which operator binds least tightly in a = b + c * d?",
    "c": [
      "=",
      "+",
      "*",
      "-"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Assignment binds last, which is why a = b + c * d computes the whole right side first."
  },
  "c3-13": {
    "q": "Given double x = 4.8; int n = (int)x;, which describes the stored values afterward?",
    "c": [
      "x is 4.0; n is 4",
      "x is 4.8; n is 5",
      "x is 4.8; n is 4",
      "x is 4.0; n is 5"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The cast produces a converted value without changing x. Conversion to int truncates toward zero when the result is representable."
  },
  "c3-20": {
    "q": "Given int x, y;, which assignment violates the modifiable-lvalue requirement?",
    "c": [
      "x + 1 = y;",
      "x = y + 1;",
      "x += y;",
      "y = x;"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The left side of an assignment must be a modifiable lvalue - something with a storage location. x + 1 is a value, not a place."
  },
  "c3-23": {
    "q": "Which language-level classification applies to the shown expression?",
    "c": [
      "Undefined behavior",
      "Unspecified behavior",
      "Implementation-defined behavior",
      "Defined behavior"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The two increments of i are unsequenced relative to each other. This is undefined behavior, not merely a choice of which operand to evaluate first."
  },
  "c3-26": {
    "q": "Given int x; double y = (x = 2.8);, what is stored in y?",
    "c": [
      "2.8",
      "3.0",
      "2.0",
      "0.0"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Assignment first converts 2.8 to int and stores 2 in x. The assignment expression yields that assigned value, which is then converted to double."
  },
  "c3-32": {
    "q": "For an ordinary int x whose subtraction fits int, x -= 4 is equivalent to which expression?",
    "c": [
      "x = 4 - x",
      "x = x / 4",
      "x = -4",
      "x = x - 4"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Compound assignment always puts the variable on the left of the operation."
  },
  "c3-33": {
    "q": "Which group binds most tightly among these four groups?",
    "c": [
      "Multiplicative operators",
      "Additive operators",
      "Relational operators",
      "Equality operators"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Roughly: unary, then * / %, then + -, then relational, then equality, then logical, then assignment last."
  },
  "c3-35": {
    "q": "How does the unary minus in -x + y bind?",
    "c": [
      "-(x + y)",
      "(-x) + y",
      "(-y) + x",
      "-(x - y)"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Unary minus binds more tightly than addition. It has one operand; binary subtraction has two."
  },
  "c3-47": {
    "q": "Given int x = 0; int y = (x = 3, x + 4);, what are x and y afterward?",
    "c": [
      "7 and 7",
      "3 and 4",
      "3 and 7",
      "0 and 7"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The comma operator sequences its left operand before its right and yields the right value. x is assigned 3 before x + 4 is evaluated."
  },
  "c3-52": {
    "q": "On an implementation with INT_MAX = 2147483647, what classification applies to int n = INT_MAX; n += 1;?",
    "c": [
      "Undefined behavior",
      "Defined behavior",
      "Implementation-defined behavior",
      "Unspecified behavior"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The addition overflows the signed int range. A particular wraparound result is not guaranteed."
  },
  "c3-ed4-001": {
    "q": "In C17, how is unsigned int u = UINT_MAX; u++; classified?",
    "c": [
      "Undefined behavior",
      "Unspecified behavior",
      "Defined behavior",
      "Implementation-defined behavior"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Unsigned arithmetic is defined modulo one more than the maximum. Incrementing UINT_MAX yields zero, unlike signed overflow.",
    "code": "unsigned int u = UINT_MAX;\nu++;"
  },
  "c3-ed4-002": {
    "q": "Assume int addition could overflow for a and b, but their sum is representable as double. Which expression avoids integer addition and truncating division?",
    "c": [
      "((double)a + b) / 2.0",
      "(double)(a + b) / 2.0",
      "(a + b) / 2.0",
      "(double)((a + b) / 2)"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Conversion before addition and division avoids integer truncation and integer addition overflow."
  },
  "c3-ed4-003": {
    "q": "For otherwise valid functions in C17, how is the relative order of g() and h() in f(g(), h()) classified?",
    "c": [
      "Left-to-right order",
      "Undefined behavior",
      "Unspecified order",
      "Right-to-left order"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The relative argument-evaluation order is unspecified, not automatically undefined. Argument values are computed before the body of f begins."
  },
  "c3-ed4-004": {
    "q": "For #define SQUARE(x) ((x) * (x)), which problem remains despite the parentheses?",
    "c": [
      "Repeated evaluation of the argument",
      "Reversed multiplication precedence",
      "Loss of the arguments declared type",
      "Automatic conversion of every argument to double"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Parentheses help precedence. They do not prevent evaluating an argument twice, which is unsafe for expressions such as i++ when the evaluations are unsequenced."
  },
  "c3-24": {
    "q": "Which format matches the type of x / 2.0 when x is int?",
    "c": [
      "%d",
      "%u",
      "%f",
      "%ld"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The floating literal makes the division result double. printf does not infer or convert that value from its format string.",
    "tag": "Concept"
  },
  "c3-27": {
    "q": "For the shown positive input, what value and transformation does the expression produce?",
    "c": [
      "90; discard the units digit",
      "100; round to the nearest ten",
      "9; discard the tens place",
      "95; preserve the original integer"
    ],
    "a": 0,
    "k": "mcq",
    "why": "95 / 10 is 9 by integer division, then multiplying by ten gives 90. For negative values this truncation is toward zero, not mathematical floor."
  },
  "c3-46": {
    "q": "Which replacement avoids the truncation seen in the shown division?",
    "c": [
      "(float)(x / y)",
      "(float)x / y",
      "x / (int)y",
      "(int)(x / (float)y)"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Convert an operand before division. A cast after integer division cannot recover the discarded fraction.",
    "tag": "Concept"
  },
  "c3-tf-001": {
    "q": "Which ordering allows a source file to use an object-like macro in a later declaration?",
    "c": [
      "Define the macro after that declaration",
      "Define the macro before that declaration",
      "Link its name before that declaration",
      "Load its address before that declaration"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Preprocessing directives are processed in source order; a macro definition does not apply retroactively.",
    "tag": "Concept"
  },
  "c3-tf-002": {
    "q": "A #if block is excluded before compilation. Which stage determines that exclusion?",
    "c": [
      "Type checking",
      "Link editing",
      "Program loading",
      "Preprocessing"
    ],
    "a": 3,
    "k": "mcq",
    "why": "The preprocessor handles directives, macro replacement, and included headers before compilation continues.",
    "tag": "Concept"
  },
  "c3-tf-003": {
    "q": "What occurs when execution reaches int n = readCount(); inside a function?",
    "c": [
      "The declaration postpones readCount until n is used",
      "The initializer calls readCount",
      "The preprocessor calls readCount",
      "The linker assigns n without executing readCount"
    ],
    "a": 1,
    "k": "mcq",
    "why": "An automatic initializer can execute a function call and side effects. Declarations are not universally devoid of runtime actions.",
    "tag": "Concept"
  },
  "c3-tf-004": {
    "q": "Which definition is one standard hosted main form in C17?",
    "c": [
      "void main(int argc, char *argv[])",
      "int main(double argc, char *argv[])",
      "int main(int argc, char *argv[])",
      "int main(char *argv[], int argc)"
    ],
    "a": 2,
    "k": "mcq",
    "why": "For the hosted programs used in this course, main is the single designated program entry point.",
    "tag": "Concept"
  },
  "c3-tf-005": {
    "q": "In an ordinary hosted program, what happens before control enters the body of main?",
    "c": [
      "The execution environment prepares startup before calling main",
      "The body of every declared helper executes",
      "Every automatic local in every helper is initialized",
      "Every printf statement in the source is evaluated"
    ],
    "a": 0,
    "k": "mcq",
    "why": "After the runtime environment initializes the program, it calls main.",
    "tag": "Concept"
  },
  "c3-tf-006": {
    "q": "Which main return type matches the standard hosted forms and the course compiler requirement?",
    "c": [
      "void",
      "double",
      "int",
      "unsigned int"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The standard hosted forms of main return int, and the course compiler flags incompatible forms.",
    "tag": "Concept"
  },
  "c3-tf-007": {
    "q": "Under the normal course gcc command, which filename suffix selects a C source file?",
    "c": [
      ".o",
      ".h",
      ".c",
      ".exe"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The .c suffix identifies the input as C source under the course build command.",
    "tag": "Concept"
  },
  "c3-tf-008": {
    "q": "Which layout statement distinguishes the course convention from the C17 language?",
    "c": [
      "Both forbid declarations after executable statements",
      "C requires mixing; the course separates declarations",
      "The course separates declarations; C permits mixing",
      "Both require each declaration to follow a statement"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Modern C permits declarations among statements, but the course style separates them for consistent structure and readability.",
    "tag": "Concept"
  },
  "c3-tf-009": {
    "q": "Which part belongs to the function body rather than its prototype?",
    "c": [
      "The return type before the function name",
      "The parameter-type list before the semicolon",
      "A local declaration within the function braces",
      "A header declaration of the function name"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The braces of main enclose its body, including block declarations and statements.",
    "tag": "Concept"
  },
  "c3-tf-010": {
    "q": "The course forbids defining global variables in student programs. What is the correct interpretation?",
    "c": [
      "A universal C17 syntax restriction",
      "A restriction imposed only during linking",
      "A prohibition on passing data between functions",
      "A classroom design convention stricter than the language rules"
    ],
    "a": 3,
    "k": "mcq",
    "why": "This is a course design constraint that encourages data to be local or passed explicitly between functions.",
    "tag": "Concept"
  },
  "c3-tf-011": {
    "q": "Which pair of headers declares the standard I/O and mathematical facilities?",
    "c": [
      "<stdlib.h> and <string.h>",
      "<stdio.h> and <math.h>",
      "<ctype.h> and <limits.h>",
      "<stddef.h> and <stdint.h>"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Headers provide the declarations and macros needed to use corresponding standard-library facilities.",
    "tag": "Concept"
  },
  "c3-tf-012": {
    "q": "In the course hosted-program template, what does return (0); in main convey?",
    "c": [
      "Successful termination",
      "The number of printed characters",
      "Failure to find an input file",
      "A request to restart main"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Returning zero from main reports successful termination to the host environment.",
    "tag": "Concept"
  },
  "c3-tf-013": {
    "q": "In hosted C, returning from the initial call to main is equivalent to which effect?",
    "c": [
      "Returning to the first statement of main",
      "Calling abort regardless of the value",
      "Returning from each active helper in reverse order",
      "Calling exit with the returned value"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Reaching return transfers control from main back to the program's host environment.",
    "tag": "Concept"
  },
  "c3-tf-014": {
    "q": "Which source element primarily documents intent for a human reader and is removed during translation?",
    "c": [
      "A string literal",
      "A comment",
      "A macro invocation",
      "A function prototype"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Comments explain intent, assumptions, and decisions; they are removed during translation and are not executed.",
    "tag": "Concept"
  },
  "c4-01": {
    "q": "A function assigns a new value to its int parameter. What happens to the callers original int argument?",
    "c": [
      "It remains unchanged",
      "It receives the new value",
      "It becomes indeterminate",
      "It is converted to a pointer"
    ],
    "a": 0,
    "k": "mcq",
    "why": "C passes argument values. Reassigning an int parameter changes the parameter object, not the caller object."
  },
  "c4-02": {
    "q": "Which item appears in a function definition but not in a prototype?",
    "c": [
      "The return type",
      "The parameter types",
      "The function body",
      "The function name"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The prototype tells the compiler the return type and parameter types so it can check every call. The definition supplies the code."
  },
  "c4-03": {
    "q": "Which statement can terminate a function declared to return void?",
    "c": [
      "return;",
      "return 0;",
      "return NULL;",
      "return 0.0;"
    ],
    "a": 0,
    "k": "mcq",
    "why": "A void function can return without an expression. Returning an expression value violates the constraint."
  },
  "c4-04": {
    "q": "An ordinary local int must be usable throughout the outer block after declarations. Where should its declaration be placed?",
    "c": [
      "After those uses in the outer block",
      "Inside a later nested block",
      "Before those uses in the outer block",
      "Inside the function prototype"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Block scope begins at the declaration and extends to the end of its containing block; a nested declaration does not acquire outer-block scope."
  },
  "c4-05": {
    "q": "Which header declares both sqrt and pow?",
    "c": [
      "<math.h>",
      "<stdlib.h>",
      "<limits.h>",
      "<float.h>"
    ],
    "a": 0,
    "k": "mcq",
    "why": "math.h declares the mathematical functions: sqrt, pow, ceil, floor, fabs, and the trig functions."
  },
  "c4-07": {
    "q": "To use a function as a black box, which information is essential?",
    "c": [
      "Its exact local-variable declaration order",
      "Its internal branch instruction addresses",
      "Its input requirements and output guarantees",
      "Its helper functions automatic-object layout"
    ],
    "a": 2,
    "k": "mcq",
    "why": "This separation is what makes structured design work: you can replace the inside without touching any caller."
  },
  "c4-10": {
    "q": "What differs between an initialized static local int and an initialized automatic local int in repeated calls?",
    "c": [
      "The automatic object keeps the previous value",
      "The static name acquires external linkage",
      "The static object retains stored state across separate invocations",
      "The automatic initializer executes just once"
    ],
    "a": 2,
    "k": "mcq",
    "why": "A static local exists for the life of the program but is still only NAME-visible inside its function."
  },
  "c4-15": {
    "q": "Which interface exposes a calculation dependency rather than hiding it in global state?",
    "c": [
      "double cost(void); /* reads global rate */",
      "double cost(void); /* reads global price */",
      "double cost(double price, double rate);",
      "double cost(void); /* reads both globals */"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Explicit parameter values expose the function inputs to callers and tests."
  },
  "c4-19": {
    "q": "In one translation unit, int f(void); precedes int f(int n) { return n; }. What is the problem?",
    "c": [
      "Duplicate function calls",
      "An automatic-storage conflict",
      "Conflicting function declarations",
      "A reserved identifier"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The prototype specifies no parameters and the definition specifies one int parameter. These function types conflict and require a diagnostic."
  },
  "c4-21": {
    "q": "How can one C return expression report two related numeric results?",
    "c": [
      "Return two comma-separated scalar values",
      "Declare two scalar return types",
      "Return a structure containing both results",
      "Return the first value, then the second"
    ],
    "a": 2,
    "k": "mcq",
    "why": "One return expression supplies one value, but that value may be a structure with multiple members."
  },
  "c4-26": {
    "q": "Which sequence exemplifies top-down refinement?",
    "c": [
      "Implement helpers, infer requirements, combine outputs",
      "Choose globals, write loops, define the required result",
      "Translate statements, link objects, load instructions",
      "Split the goal, refine tasks, implement small pieces"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Successive refinement. The structure chart is the picture of the result, with main at the top calling the major tasks below it."
  },
  "c4-31": {
    "q": "Which prototype declares a function taking two ints and returning int?",
    "c": [
      "int add(int, int);",
      "int add(int);",
      "void add(int, int);",
      "int *add(int, int);"
    ],
    "a": 0,
    "k": "mcq",
    "why": "A prototype gives the return type and each parameter type, and ends with a semicolon."
  },
  "c4-32": {
    "q": "Which return statement belongs in a void function?",
    "c": [
      "return 1;",
      "return;",
      "return (int)0;",
      "return NULL;"
    ],
    "a": 1,
    "k": "mcq",
    "why": "A bare return; is allowed to leave early, but it may not carry a value."
  },
  "c4-33": {
    "q": "For an int-returning function, which interface technique can report an additional independent int result without changing the return type?",
    "c": [
      "Use return x, y; to return both values",
      "Use return x; return y; on one path",
      "Store an additional result through an output pointer",
      "Declare an extra return-value local in the caller"
    ],
    "a": 2,
    "k": "mcq",
    "why": "A comma expression yields one value, and the first return ends the call. An output pointer supplies an additional result through caller-owned storage."
  },
  "c4-34": {
    "q": "Which header declares rand and srand?",
    "c": [
      "<time.h>",
      "<math.h>",
      "<stdlib.h>",
      "<stdint.h>"
    ],
    "a": 2,
    "k": "mcq",
    "why": "stdlib.h. srand is usually seeded with time(NULL) from time.h."
  },
  "c4-35": {
    "q": "What mathematical value does pow(2.0, 10.0) compute?",
    "c": [
      "1024",
      "20",
      "100",
      "512"
    ],
    "a": 0,
    "k": "mcq",
    "why": "pow(x, y) raises x to the power y. It lives in math.h and returns a double."
  },
  "c4-36": {
    "q": "In int add(int left, int right) { ... }, what are left and right?",
    "c": [
      "Arguments",
      "Global objects",
      "Parameters",
      "Function prototypes"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Parameters are in the definition; arguments are the actual values supplied at the call."
  },
  "c4-37": {
    "q": "A function calls itself on a smaller subproblem. Which description fits that call?",
    "c": [
      "Indirect recursion",
      "Sequential iteration",
      "Direct recursion",
      "External linkage"
    ],
    "a": 2,
    "k": "mcq",
    "why": "It needs a base case that stops it and a general case that moves toward that base case."
  },
  "c4-43": {
    "q": "For an ordinary non-VLA automatic local object, what determines its lifetime?",
    "c": [
      "Entry into and exit from its containing block",
      "The first read and last read of its value",
      "Startup and termination of the entire program",
      "The first call and last call of any helper"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Automatic is the default for locals. It is also why returning a pointer to one is unsafe."
  },
  "c4-49": {
    "q": "At file scope, what does static int count; change compared with int count;?",
    "c": [
      "The object has block scope",
      "The object has automatic duration",
      "The identifier has no linkage",
      "The identifier has internal linkage"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Both declarations have file scope and static storage duration. static gives internal rather than external linkage."
  },
  "c4-50": {
    "q": "Why can hidden mutable globals make repeated unit tests interfere?",
    "c": [
      "A test may leave mutable state that changes a later tests behavior",
      "A parameter value changes its declared type",
      "A return expression creates external linkage",
      "A prototype retains automatic locals between tests"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Parameters and return values make the dependencies visible, which is what makes a function reusable."
  },
  "c4-56": {
    "q": "A function returns a taxed price and writes a taxable flag. Which interface supports both outputs without globals?",
    "c": [
      "double price(double amount, int taxable);",
      "double price(double amount, int *taxable);",
      "int price(double amount, const int *taxable);",
      "void price(double amount, int taxable);"
    ],
    "a": 1,
    "k": "mcq",
    "why": "The return value supplies the price and an int* output parameter lets the function update the callers flag."
  },
  "c4-ed4-001": {
    "q": "For hosted main(int argc, char *argv[]), which argv entry is guaranteed to be a null pointer?",
    "c": [
      "argv[0]",
      "argv[argc]",
      "argv[argc - 1]",
      "argv[1]"
    ],
    "a": 1,
    "k": "mcq",
    "why": "argv[argc] is the terminating null pointer. argc can be zero, so access to an argument string needs an appropriate check."
  },
  "c4-ed4-002": {
    "q": "Which declaration makes fn a pointer to a function taking int and returning int?",
    "c": [
      "int *fn(int);",
      "int (*fn)[3];",
      "int (*fn)(int);",
      "int *fn[3];"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Parentheses bind the pointer declarator before the function parameter list."
  },
  "c4-ed4-003": {
    "q": "A callee executes p = NULL; on an int* parameter. How can its interface instead update the callers int* variable?",
    "c": [
      "Accept const int* and assign to p",
      "Accept int* const and assign to p",
      "Accept int* and return void",
      "Accept int** and assign through *p"
    ],
    "a": 3,
    "k": "mcq",
    "why": "The original parameter is a copy. An int** can point to the callers int* object, enabling assignment through the additional level."
  },
  "c4-ed4-004": {
    "q": "In C17, what does int f(void); specify about parameters?",
    "c": [
      "An unspecified parameter list",
      "One parameter of type void*",
      "Exactly no parameters",
      "A variadic parameter list"
    ],
    "a": 2,
    "k": "mcq",
    "why": "An explicit void parameter list gives a no-argument prototype."
  },
  "c4-tf-001": {
    "q": "Which property is supplied by a prototype before a call is checked?",
    "c": [
      "The function automatic-object values",
      "The function machine instruction addresses",
      "The function return type and parameter types",
      "The function completed return value"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The prototype describes the calling interface before a call is checked.",
    "tag": "Concept"
  },
  "c4-tf-002": {
    "q": "Given void f(int n) { n = 9; } and int x = 2; f(x);, what is x afterward?",
    "c": [
      "9",
      "0",
      "2",
      "11"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Each parameter receives a value; passing a pointer value allows indirect access to the pointed-to object.",
    "tag": "Concept"
  },
  "c4-tf-003": {
    "q": "Which return form is valid inside a void function?",
    "c": [
      "return;",
      "return 0;",
      "return 0.0;",
      "return (void *)0;"
    ],
    "a": 0,
    "k": "mcq",
    "why": "A void function can use return; with no expression, but it does not return a value.",
    "tag": "Concept"
  },
  "c4-tf-004": {
    "q": "Which local object exists for the whole program rather than just one active block execution?",
    "c": [
      "An ordinary int parameter",
      "An ordinary automatic int",
      "A local declared static",
      "An automatic const int"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Its lifetime begins when execution enters its block and ends when that block exits.",
    "tag": "Concept"
  },
  "c4-tf-005": {
    "q": "A static local int n starts at zero and is incremented once on each call. What is n after three calls?",
    "c": [
      "1",
      "0",
      "2",
      "3"
    ],
    "a": 3,
    "k": "mcq",
    "why": "A block-scope static object has program-long storage duration even though its name has local scope.",
    "tag": "Concept"
  },
  "c4-tf-006": {
    "q": "Which body can update the int object referred to by an int* parameter p?",
    "c": [
      "p = NULL;",
      "p++;",
      "*p = 9;",
      "p = &local;"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The pointer itself is passed by value, but dereferencing it accesses the same pointed-to object.",
    "tag": "Concept"
  },
  "c4-tf-007": {
    "q": "Which item contains both a function declaration and the implementation body?",
    "c": [
      "A function prototype",
      "A function call expression",
      "A function definition",
      "A function-pointer declaration"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The definition provides the declaration plus the function body.",
    "tag": "Concept"
  },
  "c4-tf-008": {
    "q": "For integer inputs 0 through 100, which leaf function returns twice n on every path?",
    "c": [
      "int twice(int n) { return n + n; }",
      "int twice(int n) { return n * n; }",
      "int twice(int n) { return n++; }",
      "int twice(int n) { return ++n; }"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The range makes n+n representable on every conforming int type. Squaring is a different function, postfix returns the old n, and prefix adds only one.",
    "tag": "Concept"
  },
  "c5-01": {
    "q": "Which int value is treated as true when used directly as an if condition?",
    "c": [
      "0",
      "0 / 2",
      "5 - 5",
      "-3"
    ],
    "a": 3,
    "k": "mcq",
    "why": "A nonzero scalar value is true in a condition. Negative values are not an exception."
  },
  "c5-04": {
    "q": "Which variable type can directly supply a switch controlling expression in C17?",
    "c": [
      "double",
      "char *",
      "unsigned int",
      "float"
    ],
    "a": 2,
    "k": "mcq",
    "why": "switch works on integral values only. That is why you cannot switch on a float or a string in C."
  },
  "c5-06": {
    "q": "Which ctype function tests whether a valid argument is a decimal digit character?",
    "c": [
      "isalpha",
      "isalnum",
      "isdigit",
      "isxdigit"
    ],
    "a": 2,
    "k": "mcq",
    "why": "isdigit tests decimal digits. isxdigit also accepts hexadecimal digit letters; ctype arguments must be EOF or representable as unsigned char."
  },
  "c5-07": {
    "q": "Without braces changing the association, an else attaches to which if?",
    "c": [
      "The nearest preceding unmatched if",
      "The earliest preceding unmatched if",
      "The if at the same indentation level",
      "The if testing the same variable"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Indentation means nothing to the compiler. This is the dangling else problem, and braces are the fix."
  },
  "c5-19": {
    "q": "Which restriction explains the shown invalid switch?",
    "c": [
      "The control must have pointer type",
      "The cases must be floating literals",
      "The cases must be runtime variables",
      "The control must have integer type"
    ],
    "a": 3,
    "k": "mcq",
    "why": "C switch requires an integer controlling expression and integer constant case expressions. Use other branching for floating values."
  },
  "c5-20": {
    "q": "For score = 85, what does (score >= 90) ? 'A' : (score >= 80) ? 'B' : 'C' yield?",
    "c": [
      "'A'",
      "'B'",
      "'C'",
      "85"
    ],
    "a": 1,
    "k": "mcq",
    "why": "The first test fails, so the second conditional runs: 85 >= 80 is true, giving 'B'. Nested conditionals associate to the right."
  },
  "c5-21": {
    "q": "Which statement is the body of the shown if?",
    "c": [
      "The null statement ;",
      "The following printf call",
      "The following two statements",
      "The entire enclosing block"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The semicolon immediately after the condition is a complete null statement. The later printf is outside that if."
  },
  "c5-32": {
    "q": "Which operator combines truth values and can skip evaluation of its right operand?",
    "c": [
      "&&",
      "&",
      "^",
      "<<"
    ],
    "a": 0,
    "k": "mcq",
    "why": "&& is logical AND and short-circuits. The other listed operators are bitwise operations."
  },
  "c5-33": {
    "q": "Without braces, the body of an if consists of what syntactic unit?",
    "c": [
      "One source line",
      "Every equally indented line",
      "All statements before the next else",
      "One statement"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Indentation means nothing to the compiler. Braces are what group statements."
  },
  "c5-35": {
    "q": "For a valid ctype argument, which function tests spaces, tabs, and newlines?",
    "c": [
      "isblank",
      "iscntrl",
      "isspace",
      "isprint"
    ],
    "a": 2,
    "k": "mcq",
    "why": "isspace includes newline and other whitespace. isblank tests blank characters such as space and tab rather than all whitespace."
  },
  "c5-36": {
    "q": "How many operands participate in one conditional expression condition ? left : right?",
    "c": [
      "3",
      "2",
      "1",
      "4"
    ],
    "a": 0,
    "k": "mcq",
    "why": "condition ? valueIfTrue : valueIfFalse. It is C's only ternary operator."
  },
  "c5-40": {
    "q": "What is printed by the shown independent if statements?",
    "c": [
      "B",
      "C",
      "BC",
      "ABC"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Each if is evaluated independently. Here two conditions are true, so both corresponding output calls run."
  },
  "c5-47": {
    "q": "Assume IEEE binary64 values and binary64 addition rounded to nearest. Which comparison result does the shown program print?",
    "c": [
      "equal",
      "not equal",
      "equalnot equal",
      "No output"
    ],
    "a": 1,
    "k": "mcq",
    "why": "The represented sum of 0.1 and 0.2 differs from the represented value 0.3 under the stated binary64 assumptions. Exact floating equality is not generally forbidden."
  },
  "c5-54": {
    "q": "Which equality spelling turns an accidental replacement of == by = into an assignment-to-constant constraint violation?",
    "c": [
      "x == 5",
      "x != 5",
      "x >= 5",
      "5 == x"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Changing 5 == x to 5 = x makes the left operand nonmodifiable. This is one guard against assignment typos; appropriate compiler warnings are also useful."
  },
  "c5-ed4-001": {
    "q": "What value is produced by !!-9?",
    "c": [
      "0",
      "-9",
      "9",
      "1"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Logical negation produces 0 or 1; applying it twice normalizes truth."
  },
  "c5-ed4-002": {
    "q": "Given p is either NULL or points to a valid int, which condition is true exactly when that int is 7 and avoids a null dereference?",
    "c": [
      "p != NULL && *p == 7",
      "p != NULL || *p == 7",
      "*p == 7 && p != NULL",
      "p == NULL && *p == 7"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Short-circuit && skips the right operand when p is NULL."
  },
  "c5-ed4-003": {
    "q": "Which value directs initial control to default in a switch?",
    "c": [
      "The first value greater than a case",
      "A value for which a case lacks break",
      "A value matching no case label",
      "A value equal to the final case label"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The default label is optional and is selected when no case matches."
  },
  "c5-ed4-004": {
    "q": "A fee changes when balance reaches 100. Which input pair directly tests the transition for integer balances?",
    "c": [
      "50 and 60",
      "101 and 102",
      "0 and 50",
      "99 and 100"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Testing adjacent values on opposite sides of a boundary exposes gaps or overlap in the branch conditions."
  },
  "c5-09": {
    "q": "Why is the division skipped in the shown condition?",
    "c": [
      "The right operand of && has higher precedence",
      "The divisor is zero so division returns zero",
      "The condition is evaluated after printf",
      "The left operand of && is false"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Logical AND skips its right operand when the left is false, so the guarded division is not evaluated.",
    "tag": "Concept"
  },
  "c5-37": {
    "q": "What is printed?",
    "c": [
      "0",
      "1",
      "2",
      "No output"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The left operand of && is zero. The division on the right is skipped and the logical result is 0."
  },
  "c5-38": {
    "q": "What is printed?",
    "c": [
      "0",
      "2",
      "No output",
      "1"
    ],
    "a": 3,
    "k": "mcq",
    "why": "The true left operand determines logical OR, so the right division is skipped and the result is 1."
  },
  "c5-tf-001": {
    "q": "Which condition is true for int n = -2?",
    "c": [
      "if (n == 0)",
      "if (!n)",
      "if (n > 0)",
      "if (n)"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Selection and loop conditions interpret zero as false and nonzero values as true.",
    "tag": "Concept"
  },
  "c5-tf-002": {
    "q": "Given int x = 0;, what are the condition value and new x for if (x = 5)?",
    "c": [
      "False; x is 5",
      "True; x is 0",
      "True; x is 5",
      "False; x is 0"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The assignment stores 5 and its expression value is 5, which is nonzero. Equality would use ==.",
    "tag": "Concept"
  },
  "c5-tf-003": {
    "q": "Given int a = 0, b = 0; int r = a && b++;, what are r and b?",
    "c": [
      "0 and 0",
      "0 and 1",
      "1 and 0",
      "1 and 1"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The false left operand skips the postfix increment, leaving b unchanged.",
    "tag": "Concept"
  },
  "c5-tf-004": {
    "q": "For if (a) if (b) f(); else g();, which condition selects g?",
    "c": [
      "a is true and b is false",
      "a is false and b is false",
      "a is false and b is true",
      "a is true and b is true"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The else belongs to the inner unmatched if. Neither inner branch executes when a is false.",
    "tag": "Concept"
  },
  "c5-tf-005": {
    "q": "Which controlling expression type is permitted by a C17 switch?",
    "c": [
      "enum type",
      "double type",
      "pointer type",
      "structure type"
    ],
    "a": 0,
    "k": "mcq",
    "why": "An enumeration is an integer type for these rules. switch does not accept floating, pointer, or aggregate control types.",
    "tag": "Concept"
  },
  "c5-tf-006": {
    "q": "A case writes one message then executes break. What is skipped by that break?",
    "c": [
      "Later statements in that switch",
      "Later statements in the entire function",
      "The next iteration of every outer loop",
      "The return to the caller of the function"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Without a transfer such as break or return, execution continues into following case labels.",
    "tag": "Concept"
  },
  "c5-tf-007": {
    "q": "Which can be a C17 integer constant case expression?",
    "c": [
      "A function call returning int",
      "2 + 3",
      "An ordinary int variable",
      "A double literal 5.0"
    ],
    "a": 1,
    "k": "mcq",
    "why": "An integer constant expression may include integer constants and permitted operators, but not a runtime variable or function call.",
    "tag": "Concept"
  },
  "c5-tf-008": {
    "q": "Which grouping matches the precedence of a || b && c?",
    "c": [
      "(a || b) && c",
      "(a || c) && b",
      "a || (b && c)",
      "a && (b || c)"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Logical AND binds more tightly than logical OR; parentheses are still useful for clarity.",
    "tag": "Concept"
  },
  "c6-01": {
    "q": "A condition is already false when a loop is first reached. Which form still enters its body once?",
    "c": [
      "while",
      "for",
      "if",
      "do ... while"
    ],
    "a": 3,
    "k": "mcq",
    "why": "do...while is a POSTTEST loop: the body runs, then the condition is tested. while and for are pretest and may run zero times."
  },
  "c6-02": {
    "q": "Which terminating syntax is required after the condition in do { work(); } while (again)?",
    "c": [
      "An opening brace",
      "A semicolon",
      "A return keyword",
      "A colon"
    ],
    "a": 1,
    "k": "mcq",
    "why": "do { ... } while (cond);  - forgetting that semicolon is a compile error."
  },
  "c6-05": {
    "q": "A break inside a switch nested in a loop exits which construct?",
    "c": [
      "The loop",
      "The switch",
      "Both constructs",
      "The containing function"
    ],
    "a": 1,
    "k": "mcq",
    "why": "break exits the innermost enclosing loop or switch. Here the switch is innermost."
  },
  "c6-06": {
    "q": "In a for loop, where does continue transfer control?",
    "c": [
      "To the iteration expression",
      "To the statement after the loop",
      "To the initialization expression",
      "To the next statement in the body"
    ],
    "a": 0,
    "k": "mcq",
    "why": "In a for loop the update part still executes. In a while loop, if the update is at the bottom of the body, continue can skip it and hang the loop."
  },
  "c6-07": {
    "q": "Which condition is needed for recursion intended to terminate on every valid input?",
    "c": [
      "Each recursive step increases its argument",
      "Every return expression uses a static local",
      "Every recursive branch calls itself twice",
      "Each recursive step reaches a terminating case"
    ],
    "a": 3,
    "k": "mcq",
    "why": "The recursive progress measure must lead to a reachable base case. Increasing an argument is not necessarily wrong, but it must still progress toward termination."
  },
  "c6-12": {
    "q": "What missing operation prevents progress in the shown loop?",
    "c": [
      "Resetting i before every test",
      "Printing i as a floating value",
      "Updating i toward the exit bound",
      "Changing i to static storage"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The loop repeats without changing the counter. A suitable update is required for this particular loop to reach its condition-based exit."
  },
  "c6-14": {
    "q": "Input -1 is outside the valid data domain and ends a read loop. What role does -1 play?",
    "c": [
      "Accumulator value",
      "Loop invariant",
      "Sentinel value",
      "Array capacity"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The -1 is the sentinel - a data value that cannot occur naturally and therefore marks the end of the data."
  },
  "c6-23": {
    "q": "An iterative version of a recursive traversal must preserve pending work. Which technique can supply that state?",
    "c": [
      "Changing every parameter to const",
      "An explicitly managed stack",
      "Removing each recursive base case",
      "Replacing each return with continue"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Recursive calls can represent pending work. An iterative formulation can store that state explicitly; neither style has a universal performance guarantee."
  },
  "c6-33": {
    "q": "Which form places initialization, a continuation test, and an iteration expression together in its header?",
    "c": [
      "while",
      "for",
      "do ... while",
      "switch"
    ],
    "a": 1,
    "k": "mcq",
    "why": "A for header puts initialization, test and update in one place, which is what a counted loop needs."
  },
  "c6-34": {
    "q": "Which header expresses an always-true loop condition rather than a one-time loop?",
    "c": [
      "for (;;)",
      "for (; 0;)",
      "while (0)",
      "do {} while (0)"
    ],
    "a": 0,
    "k": "mcq",
    "why": "for with an omitted condition uses a nonzero constant. The body can still exit through a transfer such as break."
  },
  "c6-35": {
    "q": "For nested counted loops, each inner loop completes before the next outer iteration. Which index normally varies fastest?",
    "c": [
      "The outer-loop index",
      "The inner-loop index",
      "Both indexes at the same rate",
      "The index declared first"
    ],
    "a": 1,
    "k": "mcq",
    "why": "The inner loop runs to completion for every single iteration of the outer loop."
  },
  "c6-42": {
    "q": "What does the comma operator do in the initialization and update clauses of the shown for?",
    "c": [
      "Evaluates expressions in unspecified order",
      "Repeats the entire body for each expression",
      "Combines two conditions with logical AND",
      "Sequences expressions from left to right"
    ],
    "a": 3,
    "k": "mcq",
    "why": "The comma operator evaluates left to right. This particular header converges two indexes toward the middle."
  },
  "c6-48": {
    "q": "A nested loop is inside a helper function. Which statement can end both loops and that helper invocation?",
    "c": [
      "break;",
      "return;",
      "continue;",
      "A null statement ;"
    ],
    "a": 1,
    "k": "mcq",
    "why": "return leaves the containing function. break leaves one enclosing loop or switch, and continue starts the next iteration of one loop."
  },
  "c6-ed4-001": {
    "q": "What condition is used for a for loop whose middle clause is omitted?",
    "c": [
      "The previous condition value",
      "The current counter value",
      "The integer zero",
      "A nonzero constant"
    ],
    "a": 3,
    "k": "mcq",
    "why": "The loop can still terminate through break, return, or another exit."
  },
  "c6-ed4-002": {
    "q": "A sum loop claims that sum equals the total of all elements processed so far at its test point. What reasoning tool is this?",
    "c": [
      "Sentinel value",
      "Loop invariant",
      "Function prototype",
      "Termination status"
    ],
    "a": 1,
    "k": "mcq",
    "why": "An invariant connects initialization, each loop step, and the final result."
  },
  "c6-ed4-003": {
    "q": "For for (i=0; i<5; i++), what follows continue in its body?",
    "c": [
      "The next test without i++",
      "i=0 followed by the next test",
      "The statement after the loop",
      "i++ followed by the next test"
    ],
    "a": 3,
    "k": "mcq",
    "why": "The update expression still executes, unlike a body-local update skipped in a while loop."
  },
  "c6-ed4-004": {
    "q": "Why should a count be checked before computing sum / count?",
    "c": [
      "Integer division rounds toward positive infinity",
      "A zero sum makes every denominator invalid",
      "The valid input may contain no values",
      "The count always becomes a floating value"
    ],
    "a": 2,
    "k": "mcq",
    "why": "An empty data set needs an explicit policy instead of division by zero."
  },
  "c6-20": {
    "q": "Which behavior follows from the shown continue before i++?",
    "c": [
      "It prints 01, then stops making progress",
      "It prints 012, then exits the loop",
      "It prints 01234, then exits the loop",
      "It prints 2 repeatedly after printing 01"
    ],
    "a": 0,
    "k": "mcq",
    "why": "When i is 2, continue bypasses the body-local increment. The loop repeats at that same value without printing more characters."
  },
  "c6-25": {
    "q": "Why is y reset in every body execution while x continues accumulating?",
    "c": [
      "The automatic y is initialized anew on each body-block entry",
      "The static y retains its initialization across body-block entries",
      "The copied x parameter is initialized when continue is reached",
      "The condition resets all automatic variables before each body"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The shown automatic y is initialized anew each time its block is entered. x is declared outside that repeated block.",
    "tag": "Concept"
  },
  "c6-tf-001": {
    "q": "Given int n=0; while(n>0) n--; how often is the body entered?",
    "c": [
      "1",
      "2",
      "The condition is not tested",
      "0"
    ],
    "a": 3,
    "k": "mcq",
    "why": "The condition is tested before the first iteration.",
    "tag": "Concept"
  },
  "c6-tf-002": {
    "q": "Given int n=0; do { n++; } while(n<0);, what is n afterward?",
    "c": [
      "1",
      "0",
      "-1",
      "2"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Its condition is tested after the loop body.",
    "tag": "Concept"
  },
  "c6-tf-003": {
    "q": "Which for header is valid C with all three clauses omitted?",
    "c": [
      "for ()",
      "for (;;)",
      "for (;)",
      "for (,,)"
    ],
    "a": 1,
    "k": "mcq",
    "why": "The initialization, condition, and iteration expressions may each be omitted; an omitted condition acts as true.",
    "tag": "Concept"
  },
  "c6-tf-004": {
    "q": "A while contains a for whose body executes break. Which construct is exited?",
    "c": [
      "The while loop",
      "The for loop",
      "Both loops",
      "The containing function"
    ],
    "a": 1,
    "k": "mcq",
    "why": "It does not automatically exit all enclosing loops.",
    "tag": "Concept"
  },
  "c6-tf-005": {
    "q": "In a while loop, continue skips a counter update at the bottom of the body. What is tested next?",
    "c": [
      "The skipped counter update",
      "The while initialization",
      "The statement after the loop",
      "The while condition"
    ],
    "a": 3,
    "k": "mcq",
    "why": "This differs from a while loop, where continue transfers directly to the condition test.",
    "tag": "Concept"
  },
  "c6-tf-006": {
    "q": "What is the body of for (i=0; i<3; i++); printf(\"%d\",i);?",
    "c": [
      "The following printf call",
      "Both the null statement and printf",
      "The null statement ;",
      "The containing function block"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The null statement is a valid body, though an accidental semicolon is a common bug.",
    "tag": "Concept"
  },
  "c6-tf-007": {
    "q": "Which step is required to justify a claimed invariant?",
    "c": [
      "Show every branch changes it",
      "Show the program uses a sentinel",
      "Show each iteration preserves it",
      "Show the loop always executes once"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Invariants help reason about initialization, preservation by the loop body, and the result at termination.",
    "tag": "Concept"
  },
  "c6-tf-008": {
    "q": "A loop condition remains true. Which body action can nevertheless terminate the loop?",
    "c": [
      "A continue in that loop",
      "A break from that loop",
      "Reinitializing an unused local",
      "Printing the condition value"
    ],
    "a": 1,
    "k": "mcq",
    "why": "A break, return, process termination, or other control transfer can still end execution of the loop.",
    "tag": "Concept"
  },
  "c7-01": {
    "q": "A call to fopen cannot open its requested file. Which return value signals that failure?",
    "c": [
      "NULL",
      "EOF",
      "0 as a file descriptor",
      "A pointer to stderr"
    ],
    "a": 0,
    "k": "mcq",
    "why": "fopen returns a FILE* or NULL. Testing that return value is not optional - everything after it dereferences the pointer."
  },
  "c7-02": {
    "q": "A file exists and its old contents must be discarded before writing. Which fopen mode expresses that requirement?",
    "c": [
      "\"a\"",
      "\"w\"",
      "\"r\"",
      "\"r+\""
    ],
    "a": 1,
    "k": "mcq",
    "why": "\"w\" truncates to length zero. Use \"a\" to add to the end of an existing file without losing what is there."
  },
  "c7-03": {
    "q": "Which set contains the three standard streams available at hosted program startup?",
    "c": [
      "input, output, error",
      "stdio, stdout, errno",
      "stdin, stdout, stderr",
      "stdin, stdio, EOF"
    ],
    "a": 2,
    "k": "mcq",
    "why": "They are already open when main begins, which is why printf and scanf need no fopen."
  },
  "c7-04": {
    "q": "For input \"12 abc\", what does scanf(\"%d %d\", &a, &b) return when the first conversion succeeds and the second fails?",
    "c": [
      "1",
      "2",
      "0",
      "EOF"
    ],
    "a": 0,
    "k": "mcq",
    "why": "scanf counts successful assignments. The failed second conversion leaves only one item assigned."
  },
  "c7-05": {
    "q": "Which statement describes EOF as used by getchar?",
    "c": [
      "A null pointer indicating a closed stream",
      "A negative int distinct from character values",
      "A zero character stored at a lines end",
      "A character read after the final newline"
    ],
    "a": 1,
    "k": "mcq",
    "why": "getchar returns each character as a nonnegative int (an unsigned char value) and EOF as a negative int, so EOF differs from every character. A char cannot hold all of those values, so the variable receiving getchar must be an int."
  },
  "c7-06": {
    "q": "Which call writes one character to standard output?",
    "c": [
      "getchar()",
      "fgetc(fp)",
      "ungetc(c, fp)",
      "putchar(c)"
    ],
    "a": 3,
    "k": "mcq",
    "why": "putchar(c) for stdout, fputc(c, fp) for any file. getchar and fgetc read."
  },
  "c7-07": {
    "q": "After successfully opening and writing a stream, what does fclose attempt before releasing it?",
    "c": [
      "Reading the remaining input",
      "Reopening the file in append mode",
      "Flushing pending output",
      "Setting every copied FILE* to NULL"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Closing an output stream flushes unwritten data and releases its resources. Check output and close results; normal termination also closes streams."
  },
  "c7-08": {
    "q": "Which scanf conversion reads a leading newline as data rather than skipping it?",
    "c": [
      "%c",
      "%d",
      "%f",
      "%s"
    ],
    "a": 0,
    "k": "mcq",
    "why": "%c reads the very next character, including the newline left behind by a previous scanf. Use \" %c\" - the leading space skips whitespace."
  },
  "c7-09": {
    "q": "After input \"12\n\" is read by scanf(\"%d\", &n), what does a following scanf(\"%c\", &ch) normally consume?",
    "c": [
      "The remaining newline character",
      "The previously read digit character",
      "The next nonwhitespace character",
      "The input end-of-file marker"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The numeric conversion stops before the newline; %c does not skip whitespace."
  },
  "c7-10": {
    "q": "For a single %d conversion, which return value denotes a matching failure before any assignment?",
    "c": [
      "1",
      "EOF",
      "0",
      "sizeof(int)"
    ],
    "a": 2,
    "k": "mcq",
    "why": "When the input does not match %d, no conversion happens, so the count returned is 0 (or EOF if the stream ended)."
  },
  "c7-11": {
    "q": "Which call targets the same stream as printf(\"%d\", n)?",
    "c": [
      "fprintf(stderr, \"%d\", n)",
      "fscanf(stdin, \"%d\", &n)",
      "fprintf(stdin, \"%d\", n)",
      "fprintf(stdout, \"%d\", n)"
    ],
    "a": 3,
    "k": "mcq",
    "why": "The f-versions take an explicit stream. The plain ones are fixed to stdin or stdout."
  },
  "c7-13": {
    "q": "For input \"11 22\", what does scanf(\"%*d %d\", &x) assign to x and return?",
    "c": [
      "x = 22; return 1",
      "x = 11; return 1",
      "x = 22; return 2",
      "x = 11; return 2"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The first conversion consumes a field without assignment and is not counted. The second assigns 22 and contributes one to the count."
  },
  "c7-14": {
    "q": "For input \"-12345\", what does a successful scanf(\"%3d\", &x) store in x?",
    "c": [
      "-123",
      "123",
      "-12345",
      "-12"
    ],
    "a": 3,
    "k": "mcq",
    "why": "The maximum field width counts input characters, including the sign. Three characters form -12; the remaining 345 is unread."
  },
  "c7-15": {
    "q": "Given char str[80], which call can read up to 79 input characters, including spaces, and append a terminator?",
    "c": [
      "fgets(str, sizeof str - 1, stdin)",
      "scanf(\"%79s\", str)",
      "fgets(str, sizeof str, stdin)",
      "scanf(\"%80s\", str)"
    ],
    "a": 2,
    "k": "mcq",
    "why": "fgets uses a capacity including its terminator and reads spaces. The smaller fgets bound allows only 78 input characters; %s stops at whitespace."
  },
  "c7-16": {
    "q": "With enough destination capacity, scanf(\"%s\", name) reads input \"Mary Smith\". Which string is stored?",
    "c": [
      "Mary Smith",
      "Smith",
      "MarySmith",
      "Mary"
    ],
    "a": 3,
    "k": "mcq",
    "why": "%s stops at the first whitespace. Reading a full name needs fgets, or scanf with a scan set."
  },
  "c7-17": {
    "q": "What must be checked before using the result of fopen as the stream argument to fscanf?",
    "c": [
      "Whether the pointer is NULL",
      "Whether the pointer equals EOF",
      "Whether the file has a newline",
      "Whether the pointer has static duration"
    ],
    "a": 0,
    "k": "mcq",
    "why": "If the file is missing, fopen returns NULL and fscanf would use a null pointer - usually an immediate crash. Test the return of fopen every single time."
  },
  "c7-18": {
    "q": "A log already contains records. Which mode appends new output without truncating those records?",
    "c": [
      "\"w\"",
      "\"r\"",
      "\"a\"",
      "\"w+\""
    ],
    "a": 2,
    "k": "mcq",
    "why": "Opening a log file with \"w\" instead of \"a\" silently erases every previous entry."
  },
  "c7-19": {
    "q": "Why does testing !feof(fp) before attempting a read fail to establish that the next read will succeed?",
    "c": [
      "The end-of-file indicator records a past read failure",
      "feof consumes the next item before testing it",
      "feof reports the number of remaining items",
      "The indicator is set when the last item begins"
    ],
    "a": 0,
    "k": "mcq",
    "why": "An EOF indicator reports an encountered end of file, not a successful future read. Test the read operation result; otherwise stale processing or a malformed-input loop can result."
  },
  "c7-22": {
    "q": "A read-count loop increments the count even after its final fscanf fails. Which condition would prevent counting that failed read?",
    "c": [
      "fscanf(fp, \"%d\", &n) != 0",
      "!feof(fp)",
      "fscanf(fp, \"%d\", &n) == 1",
      "fscanf(fp, \"%d\", &n) == EOF"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Only a successful single assignment should enter the counting body. A failed read supplies no new item to count."
  },
  "c7-23": {
    "q": "Which output-buffering assertion is portable C17?",
    "c": [
      "Initially stderr is not fully buffered",
      "Initially stderr is always fully buffered",
      "Initially stderr is always line buffered",
      "Initially stderr is always unbuffered"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The standard requires stderr not to be fully buffered initially; an implementation may use no buffering or line buffering. Newline flushing depends on mode."
  },
  "c7-30": {
    "q": "Which type is returned by fopen?",
    "c": [
      "int",
      "char *",
      "size_t",
      "FILE *"
    ],
    "a": 3,
    "k": "mcq",
    "why": "You store it in a FILE* and pass that handle to every later call on the file."
  },
  "c7-31": {
    "q": "Which mode requires an existing readable file rather than creating a missing file?",
    "c": [
      "\"w\"",
      "\"a\"",
      "\"r\"",
      "\"a+\""
    ],
    "a": 2,
    "k": "mcq",
    "why": "Read mode requires an existing file; \"w\" and \"a\" both create one if needed."
  },
  "c7-32": {
    "q": "Which standard stream is conventionally intended for error messages?",
    "c": [
      "stdout",
      "stdin",
      "The last fopen stream",
      "stderr"
    ],
    "a": 3,
    "k": "mcq",
    "why": "stderr is separate from stdout and initially not fully buffered. It is not universally required to have no buffering."
  },
  "c7-33": {
    "q": "Which type should receive getchar when every character value must remain distinct from EOF?",
    "c": [
      "char",
      "unsigned char",
      "int",
      "_Bool"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Returning int is what lets EOF be distinguishable from every legitimate byte value."
  },
  "c7-34": {
    "q": "Given char s[20] and input \"A B\n\", which successful call retains the space as part of its line input?",
    "c": [
      "scanf(\"%19s\", s)",
      "fgets(s, sizeof s, stdin)",
      "scanf(\"%19c\", s)",
      "scanf(\" %c\", s)"
    ],
    "a": 1,
    "k": "mcq",
    "why": "fgets reads a line subject to its bound and terminates it. %s stops at whitespace; %c does not implement a terminated line reader."
  },
  "c7-35": {
    "q": "Which stream receives fprintf(stderr, \"oops\n\")?",
    "c": [
      "The standard error stream",
      "The standard output stream",
      "The standard input stream",
      "The most recently opened stream"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The f-versions take an explicit stream, which is how you choose stdout, stderr, or your own file."
  },
  "c7-36": {
    "q": "Which format left-justifies an int in a field of width six?",
    "c": [
      "%-6d",
      "%6d",
      "%06d",
      "%+6d"
    ],
    "a": 0,
    "k": "mcq",
    "why": "%-10s pads on the right. Without the minus, output is right-justified in the field."
  },
  "c7-39": {
    "q": "Which branch recognizes an fopen failure before using the stream?",
    "c": [
      "if (fp == EOF)",
      "if (fp != NULL)",
      "if (feof(fp))",
      "if (fp == NULL)"
    ],
    "a": 3,
    "k": "mcq",
    "why": "fopen returns NULL on failure. Using the handle without checking dereferences NULL and crashes."
  },
  "c7-41": {
    "q": "Input begins with \"abc\" and scanf(\"%d\", &n) returns 0. Without consuming input, what does immediately retrying the same call encounter?",
    "c": [
      "The b after a was consumed",
      "A new line read automatically",
      "The same unmatched a character",
      "An end-of-file indicator"
    ],
    "a": 2,
    "k": "mcq",
    "why": "A numeric matching failure can leave the offending character unread. Handle or discard it before retrying."
  },
  "c7-42": {
    "q": "What does the leading space in scanf(\" %c\", &ch) request?",
    "c": [
      "Consume exactly one space",
      "Reject tabs but accept newlines",
      "Skip all leading whitespace",
      "Clear every pending input character"
    ],
    "a": 2,
    "k": "mcq",
    "why": "A leading space in a scanf format means \"skip whitespace here\", which fixes the classic leftover-newline bug."
  },
  "c7-44": {
    "q": "Which loop preserves the characters read and can distinguish EOF on all ordinary conforming targets?",
    "c": [
      "int c; while ((c=getchar())!=EOF) putchar(c);",
      "char c; while ((c=getchar())!=EOF) putchar(c);",
      "int c; while ((c=getchar())==EOF) putchar(c);",
      "int c; while ((c=getchar()!=EOF)) putchar(c);"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Store getchar in int and test that stored value. char can lose the EOF distinction; misplaced parentheses can store a comparison result instead."
  },
  "c7-45": {
    "q": "How is c = getchar() != EOF grouped without the extra assignment parentheses?",
    "c": [
      "(c = getchar()) != EOF",
      "c = (getchar() != EOF)",
      "(c != getchar()) = EOF",
      "c = getchar() = EOF"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Equality operators bind more tightly than assignment, so c receives the comparison value rather than the character."
  },
  "c7-47": {
    "q": "Which feature lets fgets enforce a destination bound that gets could not enforce?",
    "c": [
      "A different returned pointer type",
      "An automatic allocation for every line",
      "An omitted stream argument",
      "An explicit destination-capacity argument"
    ],
    "a": 3,
    "k": "mcq",
    "why": "fgets receives the capacity and stream. gets lacked a bound and was removed from C11."
  },
  "c7-50": {
    "q": "Which condition enters a body only after successfully reading one integer, handling both EOF and matching failure by stopping?",
    "c": [
      "fscanf(fp, \"%d\", &n) != EOF",
      "fscanf(fp, \"%d\", &n) == 0",
      "fscanf(fp, \"%d\", &n) == 1",
      "!feof(fp)"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Testing for exactly the number of items you asked for catches BOTH end of file and malformed data. feof processes the last item twice."
  },
  "c7-51": {
    "q": "Given a valid terminated userInput, which call prints its text without interpreting embedded conversion specifications?",
    "c": [
      "printf(\"%s\", userInput)",
      "printf(userInput)",
      "printf(\"%d\", userInput)",
      "printf(\"%s\", &userInput)"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The fixed format %s treats the input as data. Treating user input as a format can request missing arguments or other unwanted operations."
  },
  "c7-53": {
    "q": "On a system that translates newlines in text streams, which mode requests binary input without that text translation?",
    "c": [
      "\"r\"",
      "\"rt\"",
      "\"a\"",
      "\"rb\""
    ],
    "a": 3,
    "k": "mcq",
    "why": "On systems that translate line endings in text mode, omitting b silently corrupts binary data."
  },
  "c7-54": {
    "q": "A prompt has no newline and must appear before a blocking read. Which operation explicitly requests delivery of buffered stdout output?",
    "c": [
      "fflush(stdin)",
      "fflush(stdout)",
      "feof(stdout)",
      "fseek(stdout, 0, SEEK_SET)"
    ],
    "a": 1,
    "k": "mcq",
    "why": "End the prompt with a newline, or call fflush(stdout) before reading."
  },
  "c7-ed4-001": {
    "q": "At EOF, which getchar result differs from every possible unsigned-char value?",
    "c": [
      "0",
      "UCHAR_MAX",
      "The last newline",
      "EOF"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Store the result in int so EOF can be distinguished from a returned unsigned-char value."
  },
  "c7-ed4-002": {
    "q": "Given possibly signed char ch containing a non-ASCII byte, which call avoids a negative out-of-domain ctype argument?",
    "c": [
      "isalpha((unsigned char)ch)",
      "isalpha(ch)",
      "isalpha((signed char)ch)",
      "isalpha((int)ch)"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Converting to int alone preserves a negative signed-char value. Convert to unsigned char before the argument promotion, unless the argument is EOF."
  },
  "c7-ed4-003": {
    "q": "A retry loop receives matching failure from scanf. What must it address before retrying?",
    "c": [
      "The declared type of the function",
      "The files allocation lifetime",
      "The unread offending input",
      "The printf output field width"
    ],
    "a": 2,
    "k": "mcq",
    "why": "A matching failure can leave the same unread character in the stream."
  },
  "c7-ed4-004": {
    "q": "A call to fgets encounters EOF before reading any character. Which result should the caller test?",
    "c": [
      "EOF",
      "The destination pointer",
      "A pointer to its terminator",
      "NULL"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Check the return value before treating the buffer as a newly read line."
  },
  "c7-12": {
    "q": "Why should ch in this input-copy loop have type int?",
    "c": [
      "It makes every input newline disappear",
      "It represents both character values and EOF",
      "It guarantees every output call succeeds",
      "It converts text input into binary input"
    ],
    "a": 1,
    "k": "mcq",
    "why": "If ch is a char, a legitimate byte can compare equal to EOF or EOF can be truncated, so the loop ends early or never.",
    "tag": "Concept"
  },
  "c7-43": {
    "q": "Assume fopen and output succeed. Which explicit operation releases the shown stream and reports any final flush failure?",
    "c": [
      "fflush(stdout)",
      "fclose(fp)",
      "free(fp)",
      "feof(fp)"
    ],
    "a": 1,
    "k": "mcq",
    "why": "fclose flushes pending output and closes the stream; its return value should be checked. free is not the stream cleanup operation.",
    "tag": "Concept"
  },
  "c7-tf-001": {
    "q": "For printf, which argument pairing correctly matches a conversion after default promotions?",
    "c": [
      "%d with double",
      "%p with int",
      "%s with char",
      "%f with double"
    ],
    "a": 3,
    "k": "mcq",
    "why": "printf %f expects double. Formats must match argument types; %p expects void* and %s expects a character pointer.",
    "tag": "Concept"
  },
  "c7-tf-002": {
    "q": "For an int n, which scanf destination matches %d?",
    "c": [
      "n",
      "&n",
      "(double *)&n",
      "(char *)&n"
    ],
    "a": 1,
    "k": "mcq",
    "why": "scanf stores through a pointer, so an int conversion normally receives an int *.",
    "tag": "Concept"
  },
  "c7-tf-003": {
    "q": "Why does assigning getchar to unsigned char before checking EOF lose information?",
    "c": [
      "EOF can convert to a character value",
      "It increases the character-set size",
      "It preserves the sign of EOF",
      "It turns matching failure into a newline"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The int return type can represent every unsigned-char value plus the negative EOF sentinel.",
    "tag": "Concept"
  },
  "c7-tf-004": {
    "q": "Given enough space, which sequence does fgets store for a line containing hi followed by newline?",
    "c": [
      "h, i, newline, NUL",
      "h, i, NUL, newline",
      "h, i, NUL",
      "h, i, newline only"
    ],
    "a": 0,
    "k": "mcq",
    "why": "If a newline fits in the buffer, fgets stores it before the terminating null character.",
    "tag": "Concept"
  },
  "c7-tf-005": {
    "q": "Which call adds a newline after the supplied terminated string?",
    "c": [
      "puts(s)",
      "fputs(s, stdout)",
      "printf(\"%s\", s)",
      "fprintf(stdout, \"%s\", s)"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Unlike fputs, puts writes the string followed by a newline.",
    "tag": "Concept"
  },
  "c7-tf-006": {
    "q": "A %d conversion sees a leading letter. Which statement about that matching failure is accurate?",
    "c": [
      "The letter must be consumed",
      "The destination must become zero",
      "The letter can remain unread",
      "The stream must be closed"
    ],
    "a": 2,
    "k": "mcq",
    "why": "A matching failure can leave the same character unread, so a retry loop must handle or discard it.",
    "tag": "Concept"
  },
  "c7-tf-007": {
    "q": "Which explicit request has portable ISO C meaning for pending output?",
    "c": [
      "fflush(stdin)",
      "feof(stdin)",
      "fseek(stdin, 0, SEEK_SET)",
      "fflush(stdout)"
    ],
    "a": 3,
    "k": "mcq",
    "why": "fflush is specified for output and appropriate update-stream states. It is not a portable stdin-discard operation.",
    "tag": "Concept"
  },
  "c7-tf-008": {
    "q": "Which format requests skipping whitespace before one character is assigned?",
    "c": [
      "\"%c\"",
      "\"%1c\"",
      "\"%*c\"",
      "\" %c\""
    ],
    "a": 3,
    "k": "mcq",
    "why": "%c does not skip whitespace by itself; a leading space in the format can consume preceding whitespace.",
    "tag": "Concept"
  },
  "c8-01": {
    "q": "For int a[25], which pair names the first and last valid element indexes?",
    "c": [
      "1 and 25",
      "0 and 25",
      "1 and 24",
      "0 and 24"
    ],
    "a": 3,
    "k": "mcq",
    "why": "C arrays always start at 0, so the last valid index is one less than the size."
  },
  "c8-02": {
    "q": "What is the language-level consequence of assigning to a[25] for int a[25]?",
    "c": [
      "Defined extension of the array",
      "A required bounds diagnostic",
      "Undefined behavior",
      "Assignment to the last valid element"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The access is one past the array. A crash or corruption may occur, but C does not promise a specific outcome or automatic bounds checking."
  },
  "c8-04": {
    "q": "For int a[4], which description correctly distinguishes a from a pointer variable?",
    "c": [
      "a is a const-qualified pointer object",
      "a is an array that usually converts to a pointer",
      "a is a pointer whose target can be reassigned",
      "a is an int value naming the first element"
    ],
    "a": 1,
    "k": "mcq",
    "why": "An array expression normally converts to a pointer to its first element. sizeof and unary address-of are important exceptions; the array is not a constant pointer."
  },
  "c8-05": {
    "q": "Which search relies on sorted order to discard half its remaining interval?",
    "c": [
      "Sequential search",
      "Binary search",
      "A full equality scan",
      "A linear sentinel scan"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Binary search discards half the list each step, which is only valid if order tells you which half to keep."
  },
  "c8-06": {
    "q": "For int t[3][5], which indexed element immediately follows t[0][4] in its row-major layout?",
    "c": [
      "t[0][5]",
      "t[1][4]",
      "t[1][0]",
      "t[2][0]"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The next row follows the previous row contiguously. t[0][5] must not be dereferenced as an element of the first row even though the storage layout is contiguous."
  },
  "c8-07": {
    "q": "Given int a[4], b[4], which statement legally copies all elements without pointer reassignment?",
    "c": [
      "b = a;",
      "memcpy(b, a, sizeof a);",
      "*b = *a;",
      "memcpy(b, a, sizeof a[0]);"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Both arrays are separate objects of equal capacity; memcpy with sizeof a copies their entire representations. *b = *a copies only one element."
  },
  "c8-09": {
    "q": "Inside void f(int a[], int n), what prevents sizeof a from revealing the callers element count?",
    "c": [
      "n becomes the allocated capacity automatically",
      "a is copied into a new array object",
      "Its array parameter declaration is adjusted to a pointer declaration",
      "sizeof measures only initialized elements"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Inside the function the parameter is a pointer. sizeof would give 4 or 8 bytes regardless of how big the array really is."
  },
  "c8-11": {
    "q": "A sort scans the remaining range for its minimum and exchanges that value into the next output position. Which algorithm is it?",
    "c": [
      "Insertion sort",
      "Bubble sort",
      "Binary insertion search",
      "Selection sort"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Selection sort selects the smallest remaining value for each position. An implementation can skip exchanging an element already in the correct position."
  },
  "c8-12": {
    "q": "A sort extends a sorted prefix by moving the next element into the correct place within it. Which algorithm is it?",
    "c": [
      "Selection sort",
      "Insertion sort",
      "Bubble sort",
      "Binary search"
    ],
    "a": 1,
    "k": "mcq",
    "why": "It is how most people sort a hand of playing cards: pick up the next card and slide it into position."
  },
  "c8-14": {
    "q": "How many int elements belong to int table[4][6]?",
    "c": [
      "24",
      "10",
      "4",
      "6"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Rows times columns: 4 rows of 6. Two-dimensional arrays are declared with a size for each dimension."
  },
  "c8-18": {
    "q": "Which parameter declaration matches an argument declared int table[3][5]?",
    "c": [
      "void f(int **t, int rows);",
      "void f(int t[][3], int rows);",
      "void f(int *t, int rows);",
      "void f(int t[][5], int rows);"
    ],
    "a": 3,
    "k": "mcq",
    "why": "The array argument converts to a pointer to a row of five ints, not int** or int*. The later dimension determines the row type."
  },
  "c8-21": {
    "q": "Scores are integers 0 through 100. Buckets are 0-9, 10-19, ..., 80-89, 90-100. Which index is correct for int freq[10]?",
    "c": [
      "score == 100 ? 10 : score / 10",
      "score == 100 ? 9 : score / 10",
      "score == 0 ? 0 : (score - 1) / 10",
      "score == 100 ? 9 : score / 11"
    ],
    "a": 1,
    "k": "mcq",
    "why": "The normal decade index works for 0 through 99. Score 100 must go in the final bucket instead of index 10."
  },
  "c8-23": {
    "q": "Inside void f(int a[], int n), an assignment a[0] = 9 changes what when the caller passes a valid nonempty array?",
    "c": [
      "The first element in the callers original array",
      "The first element in the functions private array copy",
      "The callers pointer, reassigned to a different first element",
      "The local parameter pointer, with its address overwritten"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The adjusted pointer parameter refers to the original elements. The pointer value is copied, but the array elements are not copied by the call."
  },
  "c8-30": {
    "q": "For a nonempty array a, which expression names its first element?",
    "c": [
      "a[1]",
      "a[0]",
      "a[-1]",
      "a[sizeof a]"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Always 0, which is why the last index of an n-element array is n-1."
  },
  "c8-32": {
    "q": "An object is declared int a[10]. Which operation can change this particular array objects element count?",
    "c": [
      "Assigning a = malloc(20 * sizeof(int))",
      "Calling realloc(a, 20 * sizeof(int))",
      "Changing the variable used by the loop bound",
      "No operation resizes that array object"
    ],
    "a": 3,
    "k": "mcq",
    "why": "The declared array object has ten elements throughout its lifetime. realloc cannot be applied to an ordinary array object."
  },
  "c8-34": {
    "q": "For int a[] = {1, 2, 3, 4};, how is the element count determined?",
    "c": [
      "By the four initializer elements",
      "By the size of a pointer",
      "By the largest initialized value",
      "By the size of int in bytes"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The compiler counts the initializers. This only works when an initializer is present."
  },
  "c8-35": {
    "q": "Which sort repeatedly compares adjacent values and exchanges out-of-order neighbors?",
    "c": [
      "Selection sort",
      "Insertion by binary search",
      "Heap construction",
      "Bubble sort"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Each pass \"bubbles\" one extreme value to the end of the range."
  },
  "c8-36": {
    "q": "For int t[5][3], which pair is the row count and column count?",
    "c": [
      "3 and 5",
      "5 and 3",
      "15 and 1",
      "1 and 15"
    ],
    "a": 1,
    "k": "mcq",
    "why": "The first subscript is the row. It holds 15 elements, stored row by row."
  },
  "c8-39": {
    "q": "For a nonempty array that may contain only negative values, why seed a maximum with a[0] instead of zero?",
    "c": [
      "The initial maximum is a member of the data",
      "Zero is outside every signed int range",
      "The first element must be the largest value",
      "A zero initializer makes the search skip negatives"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Seeding with an actual element guarantees the result is genuinely from the data."
  },
  "c8-41": {
    "q": "Which declaration receives a one-dimensional int array and a separately supplied count?",
    "c": [
      "void f(int a, int n[]);",
      "void f(int **a, int n);",
      "void f(int a[], int n);",
      "void f(int a, int *n);"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The size in the brackets is ignored for a parameter, so the count must be passed separately."
  },
  "c8-46": {
    "q": "Inside void f(int a[], int n), what type determines sizeof a?",
    "c": [
      "int[n]",
      "int *",
      "int",
      "int **"
    ],
    "a": 1,
    "k": "mcq",
    "why": "An array parameter declaration is adjusted to pointer type; sizeof a therefore measures a pointer object."
  },
  "c8-49": {
    "q": "An int array has ten elements and a runtime index is unchecked. Which statement is correct?",
    "c": [
      "An invalid access can translate yet have undefined behavior",
      "Translation success proves the index is within the array",
      "The array expands to include any runtime index",
      "The indexing operator must perform a bounds check"
    ],
    "a": 0,
    "k": "mcq",
    "why": "C does not require general runtime array bounds checks. A successful translation does not make an out-of-range evaluation valid."
  },
  "c8-50": {
    "q": "A sorted array contains 1,000,000 items. About how many interval-halving probes does binary search require in its worst case?",
    "c": [
      "1000",
      "20",
      "500000",
      "1000000"
    ],
    "a": 1,
    "k": "mcq",
    "why": "2^20 is just over a million, and each probe halves the range. Sequential search would average half a million."
  },
  "c8-52": {
    "q": "Writing tij for t[i][j], which layout corresponds to row-major storage for int t[2][3]?",
    "c": [
      "t00, t10, t01, t11, t02, t12",
      "t00, t01, t02, t10, t11, t12",
      "t00, t01, t10, t11, t02, t12",
      "t00, t10, t11, t01, t02, t12"
    ],
    "a": 1,
    "k": "mcq",
    "why": "It is why t[i][j] is computed as base + i*columns + j, and why a function needs the COLUMN count but not the row count."
  },
  "c8-53": {
    "q": "Which parameter declaration prevents assignment through a to its int elements?",
    "c": [
      "void f(int *const a, int n);",
      "void f(const int a[], int n);",
      "void f(int a[], const int n);",
      "void f(int a[], int n);"
    ],
    "a": 1,
    "k": "mcq",
    "why": "const int a[] adjusts to a pointer to const int. A const pointer prevents repointing that parameter but does not make its int elements const."
  },
  "c8-ed4-001": {
    "q": "For int a[2][3], what type results when a converts to a pointer?",
    "c": [
      "int **",
      "int *",
      "int (*)[3]",
      "int (*)[2]"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Its elements are rows, each an array of three int."
  },
  "c8-ed4-002": {
    "q": "A binary search discards one half after comparing a middle element. Which precondition justifies that discard?",
    "c": [
      "Every value has the same number of digits",
      "The range has an even element count",
      "Every element is distinct",
      "The range is ordered by the same comparison"
    ],
    "a": 3,
    "k": "mcq",
    "why": "A compatible sorted ordering justifies discarding a half. Binary search can operate with duplicates and odd-sized ranges."
  },
  "c8-ed4-003": {
    "q": "What elements result from int a[4] = {7};?",
    "c": [
      "7, 7, 7, 7",
      "0, 0, 0, 7",
      "7, 1, 2, 3",
      "7, 0, 0, 0"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Unspecified elements in an aggregate initializer are zero-initialized."
  },
  "c8-ed4-004": {
    "q": "Ignoring optional exchange skips, how many comparisons does ordinary selection sort use for n distinct elements?",
    "c": [
      "n * (n + 1) / 2",
      "n - 1",
      "n * (n - 1) / 2",
      "n * n"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The scans compare n-1, then n-2, down to one candidate with the current minimum."
  },
  "c8-15": {
    "q": "Which change removes the shown one-past-end access while visiting all five array elements?",
    "c": [
      "i <= 5",
      "i > 5",
      "i == 5",
      "i < 5"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Valid indexes of the five-element array are 0 through 4. The original access has undefined behavior; its output cannot be predicted from nearby memory.",
    "tag": "Bug Hunt"
  },
  "c8-22": {
    "q": "Why does the shown whole-array assignment require a diagnostic?",
    "c": [
      "The arrays have different element counts",
      "Its array destination is not assignable",
      "An array initializer cannot contain integers",
      "The source pointer has automatic duration"
    ],
    "a": 1,
    "k": "mcq",
    "why": "C does not define assignment to an array object. Copy its elements or use an appropriate bounded memory-copy operation.",
    "tag": "Bug Hunt"
  },
  "c8-tf-001": {
    "q": "Which index is invalid for int a[6]?",
    "c": [
      "0",
      "1",
      "5",
      "6"
    ],
    "a": 3,
    "k": "mcq",
    "why": "C arrays use zero-based indexing.",
    "tag": "Concept"
  },
  "c8-tf-002": {
    "q": "Assume sizeof(int) is four C bytes. How far apart are adjacent elements of one int array?",
    "c": [
      "1 byte",
      "8 bytes",
      "The spacing depends on their values",
      "4 bytes"
    ],
    "a": 3,
    "k": "mcq",
    "why": "This layout makes pointer arithmetic and indexed access correspond element by element.",
    "tag": "Concept"
  },
  "c8-tf-003": {
    "q": "Given int a[3], b[3], which expression assigns only the first element rather than a whole array?",
    "c": [
      "b = a;",
      "b[] = a[];",
      "b[3] = a[3];",
      "b[0] = a[0];"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Element assignment is permitted for valid indexes. Array-object assignment is not; index 3 is one past these arrays.",
    "tag": "Concept"
  },
  "c8-tf-004": {
    "q": "What is a[3] after int a[4] = {7};?",
    "c": [
      "7",
      "3",
      "4",
      "0"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Missing elements of an aggregate initializer are zero-initialized.",
    "tag": "Concept"
  },
  "c8-tf-005": {
    "q": "Assume sizeof(int) is four C bytes. In the block declaring int a[10], what is sizeof a?",
    "c": [
      "10",
      "4",
      "8",
      "40"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Before array-to-pointer conversion, sizeof sees the array type and counts all ten elements.",
    "tag": "Concept"
  },
  "c8-tf-006": {
    "q": "A function receives int a[]. Which additional information can let it safely process a fixed count?",
    "c": [
      "The sizeof value of that parameter",
      "The address of its first element alone",
      "The numeric value of a[0] alone",
      "A separately supplied element count"
    ],
    "a": 3,
    "k": "mcq",
    "why": "An array parameter is adjusted to a pointer type, so the length must be conveyed separately or by convention.",
    "tag": "Concept"
  },
  "c8-tf-007": {
    "q": "For int t[2][3], which row is stored first?",
    "c": [
      "All of column 0, then all of column 1",
      "The last row, then the first row",
      "The rows in the order they are accessed",
      "All of row 0, then all of row 1"
    ],
    "a": 3,
    "k": "mcq",
    "why": "All elements of the first row are contiguous before the elements of the next row.",
    "tag": "Concept"
  },
  "c8-tf-008": {
    "q": "Which expression may be formed for int a[10] but must not be dereferenced?",
    "c": [
      "a + 10",
      "a + 11",
      "a - 1",
      "a + 9"
    ],
    "a": 0,
    "k": "mcq",
    "why": "A one-past pointer is a legal endpoint. Pointers beyond that endpoint or before the array are not valid results of this pointer arithmetic. a+9 points to a real element.",
    "tag": "Concept"
  },
  "c9-01": {
    "q": "Given int x = 5; int *p = &x;, which value is stored in p?",
    "c": [
      "The integer 5",
      "The address of x",
      "The size of int",
      "The address of p"
    ],
    "a": 1,
    "k": "mcq",
    "why": "A pointer stores where something lives. * is then used to reach the value at that location."
  },
  "c9-02": {
    "q": "Given an ordinary int n, which expression obtains a pointer to n?",
    "c": [
      "&n",
      "*n",
      "sizeof n",
      "n & 1"
    ],
    "a": 0,
    "k": "mcq",
    "why": "In this context & is address-of. (As a binary operator between two integers it is bitwise AND - context decides.)"
  },
  "c9-03": {
    "q": "Given int *p = &x, which expression designates the object x?",
    "c": [
      "p",
      "*p",
      "&p",
      "sizeof p"
    ],
    "a": 1,
    "k": "mcq",
    "why": "It is the dereference or indirection operator. If p holds the address of x, then *p is x."
  },
  "c9-05": {
    "q": "Which initialization explicitly marks an int* as pointing to no object?",
    "c": [
      "int *p = 1;",
      "int *p;",
      "int p = 0;",
      "int *p = NULL;"
    ],
    "a": 3,
    "k": "mcq",
    "why": "NULL is the standard \"points at nothing\" value, and it is the value you test for before dereferencing."
  },
  "c9-07": {
    "q": "Which pointer-size equality is guaranteed by C17?",
    "c": [
      "sizeof(int*) == sizeof(double*)",
      "sizeof(int*) == sizeof(int)",
      "sizeof(void*) == sizeof(char*)",
      "sizeof(void*) == sizeof(void(*)(void))"
    ],
    "a": 2,
    "k": "mcq",
    "why": "void* and character pointers have the same representation and alignment requirements. Other listed size equalities are not generally guaranteed."
  },
  "c9-10": {
    "q": "Which classification applies to the shown dereference of an uninitialized automatic pointer?",
    "c": [
      "Undefined behavior",
      "Defined assignment to a new object",
      "Automatic allocation of an int",
      "A required translation failure"
    ],
    "a": 0,
    "k": "mcq",
    "why": "An uninitialized pointer has an indeterminate value; dereferencing it does not designate a known valid object."
  },
  "c9-11": {
    "q": "Which body updates a callers int when the caller passes &var to an int* parameter x?",
    "c": [
      "x = NULL;",
      "x++;",
      "x = &local;",
      "*x = 9;"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Pass by reference. It is exactly how scanf writes into your variables."
  },
  "c9-13": {
    "q": "Given void *v pointing to a valid int, which conversion can C perform without an explicit cast?",
    "c": [
      "int *p = v;",
      "int n = v;",
      "double n = v;",
      "int **p = *v;"
    ],
    "a": 0,
    "k": "mcq",
    "why": "C permits implicit conversion between void* and object pointer types. The appropriate converted pointer can then be dereferenced; void itself supplies no object size."
  },
  "c9-17": {
    "q": "Which returned address refers to an object still alive after its defining function returns?",
    "c": [
      "An automatic const locals address",
      "The address of a local with static storage duration",
      "An ordinary parameters address",
      "An automatic arrays first element address"
    ],
    "a": 1,
    "k": "mcq",
    "why": "A static local persists for the whole program. const does not extend the lifetime of an automatic object."
  },
  "c9-21": {
    "q": "Given int *const p = &x; with modifiable x, which operation is allowed?",
    "c": [
      "p = &y;",
      "p++;",
      "p = NULL;",
      "*p = 9;"
    ],
    "a": 3,
    "k": "mcq",
    "why": "The pointer object is const; the pointed-to int is not. Assignment through *p can change x."
  },
  "c9-23": {
    "q": "For valid arithmetic within an array, what determines the distance advanced by p + 1?",
    "c": [
      "The size of the pointer object itself",
      "The value stored in the first element",
      "The number of elements in the whole array",
      "The size of one element of the pointers referenced type"
    ],
    "a": 3,
    "k": "mcq",
    "why": "It determines the type used for dereferencing and the element size used for pointer arithmetic. C does not require all pointer types to have the same size or double to occupy eight bytes."
  },
  "c9-30": {
    "q": "Which object can double *p point to without an incompatible-pointer conversion?",
    "c": [
      "An object declared float",
      "An object declared int",
      "An object declared double",
      "An object declared double*"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The type is \"pointer to double\". p holds an address; *p is the double living there."
  },
  "c9-32": {
    "q": "Which declaration creates two pointers to int?",
    "c": [
      "int *p, q;",
      "int p, *q;",
      "int p, q;",
      "int *p, *q;"
    ],
    "a": 3,
    "k": "mcq",
    "why": "The star belongs to each declarator, so every pointer needs its own."
  },
  "c9-33": {
    "q": "Which property identifies a null pointer?",
    "c": [
      "It is unequal to a pointer to a live object",
      "It points to an object containing integer zero",
      "It points to the first element of every array",
      "Its representation is guaranteed all-bits-zero"
    ],
    "a": 0,
    "k": "mcq",
    "why": "A null pointer points to no object and compares unequal to pointers to objects or functions. Its representation need not be zero bits."
  },
  "c9-34": {
    "q": "Given int *p, which printf call matches the pointer conversion requirement?",
    "c": [
      "printf(\"%p\", (void *)p);",
      "printf(\"%d\", p);",
      "printf(\"%u\", p);",
      "printf(\"%p\", (int)p);"
    ],
    "a": 0,
    "k": "mcq",
    "why": "%p is the portable way. It expects a void * argument, so cast other pointers: printf(\"%p\", (void *)p)."
  },
  "c9-37": {
    "q": "Which argument should replace the shown f(x) when f expects int* and must change x?",
    "c": [
      "f(x)",
      "f(*x)",
      "f(sizeof x)",
      "f(&x)"
    ],
    "a": 3,
    "k": "mcq",
    "why": "The function needs a pointer to the int object. Supplying its value instead violates the pointer-parameter constraint."
  },
  "c9-39": {
    "q": "Which argument lets scanf(\"%d\", ...) store into an int n?",
    "c": [
      "n",
      "*n",
      "sizeof n",
      "&n"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Everything in C is passed by value, so the only way a function can write to your variable is to be handed its address."
  },
  "c9-41": {
    "q": "Given const int *p = &x;, which operation is permitted on p when y is also int?",
    "c": [
      "p = &y;",
      "*p = 3;",
      "p[0]++;",
      "(*p)--;"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The pointer can be repointed, but the pointed-to object may not be modified through this pointer-to-const access."
  },
  "c9-43": {
    "q": "What object-lifetime rule is violated if the caller dereferences the shown returned pointer?",
    "c": [
      "The returned int value has become unsigned",
      "The callers pointer has external linkage",
      "The automatic local has ended its lifetime",
      "The function prototype has no return type"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The caller gets a dangling pointer. Return the value itself, use static, or allocate with malloc."
  },
  "c9-44": {
    "q": "A caller has int *ptr. A function called as f(&ptr) must assign a new pointer to ptr itself. Which parameter type fits?",
    "c": [
      "int *p",
      "int **p",
      "const int *p",
      "int *const p"
    ],
    "a": 1,
    "k": "mcq",
    "why": "&ptr points to an int* object. An int** parameter permits assigning to that object through *p."
  },
  "c9-46": {
    "q": "Which operation requires converting a void* to an appropriate object-pointer type first?",
    "c": [
      "Comparing the void* with NULL",
      "Assigning the void* to another void*",
      "Accessing the stored object through indirection",
      "Passing the void* to free"
    ],
    "a": 2,
    "k": "mcq",
    "why": "void has no object size or value type for indirection. Assignment to an object pointer may perform the necessary conversion implicitly in C."
  },
  "c9-49": {
    "q": "Why does casting an address to an unrelated pointer type not establish that reading through it is valid?",
    "c": [
      "The cast must reset the address to NULL",
      "The cast copies the pointed-to object",
      "The cast makes every object character-aligned",
      "Alignment and effective-type rules still apply"
    ],
    "a": 3,
    "k": "mcq",
    "why": "A cast does not remove alignment or effective-type restrictions. Character types have special permission to inspect object representations."
  },
  "c9-50": {
    "q": "Which language guarantee applies to dereferencing an uninitialized automatic pointer?",
    "c": [
      "The read must return zero",
      "A diagnostic must stop translation",
      "No behavior is guaranteed",
      "The pointer becomes NULL after the read"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The access has undefined behavior. A particular crash or apparent read of nearby memory is not guaranteed."
  },
  "c9-60": {
    "q": "Which type does int *p; give p?",
    "c": [
      "Pointer to int",
      "Array of int",
      "Pointer to int*",
      "Function returning int"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The declaration says \"*p is an int\", which means p itself is a pointer to int."
  },
  "c9-62": {
    "q": "Which operation requires p to have been given a valid pointed-to object?",
    "c": [
      "Assigning NULL to p",
      "Assigning &x to p",
      "Reading the value through *p",
      "Taking the size sizeof p"
    ],
    "a": 2,
    "k": "mcq",
    "why": "An uninitialized pointer holds a garbage address; dereferencing it is undefined behaviour."
  },
  "c9-64": {
    "q": "A calculation returns an int status and writes an int result through a parameter. Which interface fits?",
    "c": [
      "int compute(int x, int result);",
      "int compute(int x, int *result);",
      "void compute(int x, int result);",
      "int *compute(int x, int result);"
    ],
    "a": 1,
    "k": "mcq",
    "why": "This status-plus-out-parameter pattern is used all through the standard library, scanf included."
  },
  "c9-66": {
    "q": "Given p is either NULL or points to a valid int, why is the shown && test safe for NULL?",
    "c": [
      "The pointer test allocates a missing int",
      "The false pointer test skips indirection",
      "The indirection converts NULL into zero",
      "The right operand executes before the check"
    ],
    "a": 1,
    "k": "mcq",
    "why": "The NULL check must come FIRST. Reversing the two conditions would dereference NULL every time."
  },
  "c9-68": {
    "q": "Which pairing describes int *p[3] and int (*q)[3]?",
    "c": [
      "p: pointer to an array; q: array of pointers",
      "p: array of ints; q: pointer to an int",
      "p: pointer to an int; q: array of ints",
      "p: array of pointers; q: pointer to an array"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Parentheses beat the subscript. Read from the identifier outwards, following precedence."
  },
  "c9-69": {
    "q": "For a nonempty int array a passed as an ordinary function argument, which pointer has the same int* type and value as the converted a?",
    "c": [
      "&a",
      "&a[1]",
      "a + 1",
      "&a[0]"
    ],
    "a": 3,
    "k": "mcq",
    "why": "The ordinary array expression converts to a pointer to element zero. &a has pointer-to-array type rather than the same int* value/type combination."
  },
  "c10-01": {
    "q": "Within a valid int array, sizeof(int) is four C bytes. How far does p + 1 advance relative to p?",
    "c": [
      "1 byte",
      "8 bytes",
      "The number stored in *p",
      "4 bytes"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Pointer arithmetic is scaled by sizeof(*p). You think in ELEMENTS; the compiler multiplies by the element size."
  },
  "c10-02": {
    "q": "For a valid array element index i, which expression is defined to mean a[i]?",
    "c": [
      "*a + i",
      "*(a) * i",
      "*(a + i)",
      "&(a + i)"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Indexing is defined in terms of pointer arithmetic, which is why a[i] and i[a] are both legal (and identical)."
  },
  "c10-03": {
    "q": "For a nonzero size, which result reports malloc failure?",
    "c": [
      "EOF",
      "A pointer to zeroed storage",
      "NULL",
      "A pointer to the requested size"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Every malloc, calloc and realloc result must be tested against NULL before you use it."
  },
  "c10-04": {
    "q": "Which initialization guarantee distinguishes successful calloc from successful malloc?",
    "c": [
      "calloc sets allocated bytes to all-bits-zero",
      "malloc sets allocated bytes to all-bits-zero",
      "calloc supplies a terminator after each element",
      "malloc initializes each object from its type"
    ],
    "a": 0,
    "k": "mcq",
    "why": "calloc zeroes the allocated representation bytes. That is not a universal guarantee of floating-point zero or a null-pointer representation."
  },
  "c10-05": {
    "q": "What does free(p) do to a valid allocated object?",
    "c": [
      "Assigns NULL to every pointer alias",
      "Ends that allocations lifetime",
      "Changes its contents into a defined zero object",
      "Keeps it allocated until the pointer leaves scope"
    ],
    "a": 1,
    "k": "mcq",
    "why": "free deallocates the object. It does not assign to the callers pointer variable; pointers to the ended object become indeterminate."
  },
  "c10-06": {
    "q": "Which header provides the declarations needed for malloc and free in C17?",
    "c": [
      "<stdlib.h>",
      "<stddef.h>",
      "<stdio.h>",
      "<string.h>"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Modern C requires a visible declaration before a function call. An undeclared malloc call requires a diagnostic, rather than a guaranteed implicit int return."
  },
  "c10-07": {
    "q": "Which situation loses the means to release an allocated block?",
    "c": [
      "Copying its pointer to a second variable",
      "Losing the final reference to a still-allocated block before freeing it",
      "Passing its pointer to a read-only helper",
      "Keeping its pointer while checking allocation failure"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Losing every owning reference without freeing the allocation leaks it. A copied pointer by itself does not lose the original allocation."
  },
  "c10-08": {
    "q": "Assume n is positive and the size multiplication fits size_t. Which malloc request provides room for n ints?",
    "c": [
      "malloc(n)",
      "malloc(sizeof(n))",
      "malloc(n * sizeof(int))",
      "malloc(sizeof(int))"
    ],
    "a": 2,
    "k": "mcq",
    "why": "malloc counts BYTES. Always multiply the element count by sizeof the element - never hard-code a byte count."
  },
  "c10-11": {
    "q": "Which operation violates pointer arithmetic constraints?",
    "c": [
      "Subtracting pointers within one array",
      "Adding two pointers",
      "Adding an integer within array bounds",
      "Comparing equality of compatible pointers"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Subtracting gives the number of elements between them, which is useful. The sum of two addresses has no meaning."
  },
  "c10-13": {
    "q": "Which pointer has become dangling?",
    "c": [
      "One whose target allocation was freed",
      "One assigned the address of a live local",
      "One holding a valid one-past endpoint",
      "One explicitly initialized to NULL"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The address is still there and may still \"work\" for a while, which is what makes use-after-free so dangerous."
  },
  "c10-14": {
    "q": "A local pointer to allocated storage goes out of scope without any deallocation. What happens to the allocation?",
    "c": [
      "It remains allocated",
      "It is freed with the local pointer",
      "It becomes a static array",
      "It is resized to zero bytes"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The allocation lifetime does not follow the local pointer scope. An explicit valid deallocation is needed; losing the last reference leaks it."
  },
  "c10-16": {
    "q": "Which defect is present when the shown pointer is overwritten by a new allocation before its old allocation is freed?",
    "c": [
      "Memory leak",
      "Double free",
      "Out-of-bounds indexing",
      "Incompatible pointer conversion"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The first block (ten ints, typically 40 bytes) stays allocated but unreachable for the rest of the program. Free the old block, or keep a separate pointer, before reassigning."
  },
  "c10-17": {
    "q": "Which classification applies to the shown read through p after free(p)?",
    "c": [
      "Defined read of the last stored value",
      "A required compile-time rejection",
      "Automatic reallocation of the freed block",
      "Undefined behavior"
    ],
    "a": 3,
    "k": "mcq",
    "why": "It often appears to print 5, which is the worst outcome: the bug hides until the allocator reuses that block."
  },
  "c10-19": {
    "q": "For positive newSize, successful realloc preserves how much old data?",
    "c": [
      "The smaller of old and new sizes",
      "The larger of old and new sizes",
      "The old size plus one terminator",
      "Only the first pointed-to element"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The first min(oldSize,newSize) bytes are preserved. The object may move; newly added bytes are uninitialized, and the resulting pointer must be used."
  },
  "c10-21": {
    "q": "Why must an allocation result be checked before writing through it?",
    "c": [
      "malloc returns the requested byte count",
      "A valid nonzero request may fail and supply no object to write into",
      "Allocation success initializes every element",
      "The result is never aligned for an int"
    ],
    "a": 1,
    "k": "mcq",
    "why": "A valid request may fail even if a machine appears to have abundant memory. A NULL result cannot be dereferenced."
  },
  "c10-23": {
    "q": "A result array has a runtime count and must remain alive after its creating function returns. Which storage choice supports both requirements?",
    "c": [
      "An automatic fixed-size local array",
      "An automatic variable-length local array",
      "An uninitialized local pointer",
      "A checked dynamic allocation"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Dynamic storage can be sized at runtime and outlive the creating function. Local automatic arrays end their lifetime on return."
  },
  "c10-24": {
    "q": "Which classification applies to the shown second free of the same allocation?",
    "c": [
      "Unspecified behavior",
      "Implementation-defined behavior",
      "Undefined behavior",
      "Defined behavior"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Setting p = NULL right after the first free prevents it, because free(NULL) is defined to do nothing."
  },
  "c10-30": {
    "q": "For a valid array a, which indexed expression corresponds to *(a + 3)?",
    "c": [
      "a[3]",
      "a[2]",
      "a[0] + 3",
      "a[4]"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Indexing IS pointer arithmetic - a[i] is defined as *(a + i)."
  },
  "c10-31": {
    "q": "Given int a[4] and int *p = a, which expression requires a diagnostic?",
    "c": [
      "a++",
      "p++",
      "a[0]++",
      "(*p)++"
    ],
    "a": 0,
    "k": "mcq",
    "why": "An array name is a constant address, so it cannot be assigned to or incremented."
  },
  "c10-32": {
    "q": "What is the declared return type of malloc?",
    "c": [
      "char *",
      "int *",
      "size_t",
      "void *"
    ],
    "a": 3,
    "k": "mcq",
    "why": "A generic pointer. In C it converts automatically to whatever object pointer type you assign it to, so no cast is needed (a cast is allowed; C++ requires one)."
  },
  "c10-33": {
    "q": "Which call is explicitly permitted as a no-op by the C library?",
    "c": [
      "free(&local)",
      "free(p + 1)",
      "free(p) twice",
      "free(NULL)"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Which is why setting a pointer to NULL after freeing it prevents an accidental double free."
  },
  "c10-34": {
    "q": "Which storage duration describes an object obtained through successful malloc?",
    "c": [
      "Automatic storage duration",
      "Allocated storage duration",
      "Static storage duration",
      "Thread storage duration"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Allocated storage lasts until a valid deallocation. The heap is a common implementation model, not a required C physical memory layout."
  },
  "c10-35": {
    "q": "Which call requests 20 double-sized elements with the allocated bytes zeroed?",
    "c": [
      "calloc(20, sizeof(double))",
      "malloc(20 * sizeof(double))",
      "calloc(1, sizeof(double))",
      "malloc(sizeof(double))"
    ],
    "a": 0,
    "k": "mcq",
    "why": "calloc clears the bytes, but all-bits-zero is not guaranteed to be floating-point 0.0 or a null pointer representation."
  },
  "c10-38": {
    "q": "Given valid p, what differs between *p++ and (*p)++?",
    "c": [
      "The first changes its int; the second advances p",
      "Both advance p without changing its int",
      "Both change its int without advancing p",
      "The first advances p; the second changes its int"
    ],
    "a": 3,
    "k": "mcq",
    "why": "The parentheses decide whether ++ applies to the pointer or to what it points at."
  },
  "c10-39": {
    "q": "Assume the count multiplication fits size_t. After int *p = malloc(n * sizeof *p), which branch detects failure before use?",
    "c": [
      "if (*p == 0)",
      "if (p == EOF)",
      "if (p == NULL)",
      "if (sizeof p == n)"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Size in bytes, then always test the result before using it."
  },
  "c10-41": {
    "q": "After free(p) for a non-NULL allocation, which statement is correct?",
    "c": [
      "p is set to NULL by the library call",
      "The value becomes indeterminate when the target ends its lifetime",
      "p still designates an object with its former lifetime",
      "p becomes a pointer to a zero-length live array"
    ],
    "a": 1,
    "k": "mcq",
    "why": "free does not assign to the caller variable. C specifies that a pointer value becomes indeterminate when its target object ends its lifetime. Overwriting p with NULL is permitted."
  },
  "c10-43": {
    "q": "Which bound visits exactly the five allocated int elements from an initial i = 0?",
    "c": [
      "i <= 5",
      "i < 6",
      "i < 5",
      "i <= 6"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Indexes 0 through 4 are valid. The shown i <= 5 attempts a one-past write with undefined behavior."
  },
  "c10-44": {
    "q": "For a valid allocation and positive n, which pattern preserves p if realloc fails?",
    "c": [
      "p = realloc(p,n); if (!p) free(p);",
      "free(p); p = realloc(p,n);",
      "q = realloc(p,n); if (q) p=q;",
      "q = realloc(p,n); if (!q) p=q;"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Store the returned pointer separately. On failure the old object remains allocated; on success use the replacement and do not use the invalidated old pointer."
  },
  "c10-46": {
    "q": "Which lifetime difference holds between an automatic local array and a malloc allocation?",
    "c": [
      "Both are deallocated when the local block ends",
      "Allocated storage can outlive the function and its automatic local arrays",
      "The array remains alive until a free call",
      "The allocation ends when its first pointer is copied"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Dynamic memory buys flexibility and hands you the responsibility of freeing it."
  },
  "c10-49": {
    "q": "Repeated successful allocations are never released after processing finishes. Which defect explains growing memory use?",
    "c": [
      "Double free",
      "Memory leak",
      "Null-pointer initialization",
      "A shrinking array bound"
    ],
    "a": 1,
    "k": "mcq",
    "why": "The signature of a leak is gradual growth. A dangling pointer or double free tends to crash quickly and loudly instead."
  },
  "c10-50": {
    "q": "Which maintenance problem does sizeof *p in an allocation formula directly reduce?",
    "c": [
      "Size/type disagreement after changing the pointer type",
      "Allocation failure after exhausting the available memory",
      "Count multiplication exceeding the size_t value range",
      "Uninitialized elements after receiving a successful allocation"
    ],
    "a": 0,
    "k": "mcq",
    "why": "sizeof *p follows the pointed-to type without evaluating this ordinary int indirection. Separate checks are still needed for multiplication overflow and allocation failure."
  },
  "c10-52": {
    "q": "For pointers into two separate int arrays, which operation has defined comparison semantics without assuming a shared array?",
    "c": [
      "Equality comparison",
      "Relational less-than",
      "Pointer subtraction",
      "Addition of both pointers"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Compatible pointer equality is defined. Relational comparisons and subtraction require applicable same-array or object rules; arbitrary separate arrays do not meet those rules."
  },
  "c9-ed4-001": {
    "q": "For positive n, which check prevents n * sizeof *p from wrapping in size_t before malloc?",
    "c": [
      "n <= SIZE_MAX * sizeof *p",
      "n >= SIZE_MAX / sizeof *p",
      "n <= SIZE_MAX / sizeof *p",
      "sizeof p <= n"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Check the multiplication before allocation, then check the allocation result before using the object."
  },
  "c9-ed4-002": {
    "q": "After a successful allocation, how is the later free in this sequence classified?",
    "c": [
      "Defined behavior",
      "Undefined behavior",
      "Unspecified behavior",
      "Implementation-defined behavior"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The assignment p = NULL overwrites the dangling value. The later free receives a null pointer and is a defined no-op; other aliases are not changed.",
    "code": "int *p = malloc(sizeof *p);\nif (p == NULL) return 1;\nfree(p);\np = NULL;\nfree(p);"
  },
  "c9-ed4-003": {
    "q": "For positive newSize, which object remains allocated when realloc reports failure?",
    "c": [
      "A new zero-filled replacement",
      "The original allocated object",
      "A new truncated copy",
      "Neither allocated object"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Keep the original pointer until a non-NULL replacement is obtained."
  },
  "c9-ed4-004": {
    "q": "Which use of an array one-past pointer is permitted?",
    "c": [
      "Using it as an iteration endpoint",
      "Reading the element through it",
      "Writing an element through it",
      "Adding one more to skip a sentinel"
    ],
    "a": 0,
    "k": "mcq",
    "why": "It can be formed and used as an endpoint, but it does not point to an element."
  },
  "c9-22": {
    "q": "Why does the shown setNull call leave the callers pointer unchanged?",
    "c": [
      "It assigns only the functions copied pointer parameter",
      "It assigns through a pointer to the callers pointer object",
      "It writes to the int addressed by the pointer parameter",
      "It assigns NULL into the original pointed-to integer"
    ],
    "a": 0,
    "k": "mcq",
    "why": "To change the CALLER'S pointer you must pass its address: void setNull(int **p) called as setNull(&ptr).",
    "tag": "Concept"
  },
  "c10-42": {
    "q": "Why is p[1] valid for p pointing to the first element of a two-int allocation?",
    "c": [
      "It means *(p + 1) within that allocated range",
      "It reallocates storage for a second int",
      "It treats p as a pointer-to-pointer",
      "It measures the size of the pointer object"
    ],
    "a": 0,
    "k": "mcq",
    "why": "This is why dynamically allocated memory can be used exactly like an array.",
    "tag": "Concept"
  },
  "c10-48": {
    "q": "Which consequence follows from assigning p = NULL after the shown free?",
    "c": [
      "A later free(p) is a defined no-op",
      "A later *p read is a defined zero value",
      "Every other alias to the allocation becomes NULL",
      "The deallocated object becomes live again"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Clearing this variable makes free(p) harmless, but dereferencing NULL remains invalid and other aliases are unchanged.",
    "tag": "Concept"
  },
  "c10-51": {
    "q": "Which cleanup order releases the shown dynamically allocated row table without losing row pointers?",
    "c": [
      "Free the table, then read and free each row",
      "Free each row, then free the table",
      "Free only the table pointer array",
      "Free only the first row and table"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Each row and the table pointer array have separate allocations. Release rows before losing the pointer array that identifies them.",
    "tag": "Concept"
  },
  "c9-tf-001": {
    "q": "Given ordinary int n, which expression has type int*?",
    "c": [
      "n",
      "sizeof n",
      "n + 1",
      "&n"
    ],
    "a": 3,
    "k": "mcq",
    "why": "The result points to the named object when that object is a valid operand of address-of.",
    "tag": "Concept"
  },
  "c9-tf-002": {
    "q": "Given int *p = NULL;, which operation has undefined behavior?",
    "c": [
      "Assigning p = &n",
      "Reading *p",
      "Comparing p == NULL",
      "Taking sizeof p"
    ],
    "a": 1,
    "k": "mcq",
    "why": "A null pointer points to no object; dereferencing it has undefined behavior.",
    "tag": "Concept"
  },
  "c9-tf-003": {
    "q": "Within an int array, p + 1 advances by how many elements?",
    "c": [
      "sizeof p",
      "1",
      "sizeof(int)",
      "The value of *p"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Pointer arithmetic is scaled by the size of the pointed-to type.",
    "tag": "Concept"
  },
  "c9-tf-004": {
    "q": "Which initialization gives an automatic int* a known null pointer value?",
    "c": [
      "int *p;",
      "int *p = NULL;",
      "static int n; int *p;",
      "int *p = &local;"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Like other uninitialized automatic objects, it has an indeterminate value.",
    "tag": "Concept"
  },
  "c9-tf-005": {
    "q": "Which expression forms a permitted endpoint for int a[5]?",
    "c": [
      "a + 5",
      "a + 6",
      "a - 1",
      "a + sizeof a"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The one-past value is useful as an endpoint, but it does not designate an array element.",
    "tag": "Concept"
  },
  "c9-tf-006": {
    "q": "Which initialization property is guaranteed by successful malloc for a nonzero size?",
    "c": [
      "All elements initialized to zero",
      "Suitably aligned uninitialized storage",
      "A null terminator after the final byte",
      "A count stored before the returned pointer"
    ],
    "a": 1,
    "k": "mcq",
    "why": "malloc provides suitably aligned uninitialized allocated storage. Zeroing is a separate guarantee of calloc.",
    "tag": "Concept"
  },
  "c9-tf-007": {
    "q": "After a successful allocation and one free(p), which next operation safely replaces the dangling value in this variable?",
    "c": [
      "free(p);",
      "p = NULL;",
      "*p = 0;",
      "p++;"
    ],
    "a": 1,
    "k": "mcq",
    "why": "After the first free, another free through the unchanged pointer would be invalid.",
    "tag": "Concept"
  },
  "c9-tf-008": {
    "q": "For positive size, realloc returns NULL. Which pointer should still be retained for cleanup?",
    "c": [
      "The NULL result alone",
      "A pointer one past the original block",
      "A newly zeroed pointer copy",
      "The saved original pointer"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Store the result in a temporary pointer so the original pointer is not lost on a NULL result.",
    "tag": "Concept"
  },
  "c11-01": {
    "q": "Which character terminates a C string?",
    "c": [
      "\\n",
      "EOF",
      "NULL",
      "\\0"
    ],
    "a": 3,
    "k": "mcq",
    "why": "A C string ends at its first null character, conventionally written \\0. EOF and the NULL pointer macro are different concepts."
  },
  "c11-03": {
    "q": "Which header declares strlen, strcpy, and strcmp?",
    "c": [
      "<string.h>",
      "<ctype.h>",
      "<stdlib.h>",
      "<stdio.h>"
    ],
    "a": 0,
    "k": "mcq",
    "why": "string.h. ctype.h holds the single-character classification functions like isalpha."
  },
  "c11-04": {
    "q": "Given distinct valid strings and adequate destination space, which call copies the source including its terminator?",
    "c": [
      "strcat(dst, src)",
      "strcmp(dst, src)",
      "strcpy(dst, src)",
      "strlen(src)"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Assignment would copy an address, not the characters. strcpy copies through the terminator."
  },
  "c11-05": {
    "q": "What return value from strcmp means the two strings compare equal?",
    "c": [
      "1",
      "-1",
      "The shared string length",
      "0"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Zero means \"no difference\". This inverts the usual truth convention, so if (strcmp(a,b)) is true when they DIFFER."
  },
  "c11-06": {
    "q": "For char str[20], why does str match the destination type for scanf(\"%19s\", str)?",
    "c": [
      "It passes all twenty char elements by value",
      "It has the same pointer type as &str",
      "It supplies the input width through its type",
      "The array expression converts to a pointer to its first char element"
    ],
    "a": 3,
    "k": "mcq",
    "why": "str already IS an address, so writing &str would give the address of the array - a different type for the same location."
  },
  "c11-07": {
    "q": "How many char elements are declared by char name[] = \"Bob\";?",
    "c": [
      "4",
      "3",
      "2",
      "5"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Three characters plus the terminator. Sizing a string buffer always means length plus one."
  },
  "c11-08": {
    "q": "Which initialization gives s a writable four-char array containing cat and a terminator?",
    "c": [
      "char *s = \"cat\";",
      "const char s[] = \"cat\";",
      "char s[] = \"cat\";",
      "char s[3] = \"cat\";"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Writing s[0] = 'b' is fine for the array and undefined behavior (often a crash) for the pointer to a literal."
  },
  "c11-09": {
    "q": "What does a == b compare for the two distinct character arrays shown?",
    "c": [
      "The two converted addresses",
      "The two stored strings",
      "The two string lengths",
      "The two allocated capacities"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Comparing arrays with == compares where they are, not what they hold. The test is always false here."
  },
  "c11-13": {
    "q": "Which behavior differs between puts(s) and printf(\"%s\", s)?",
    "c": [
      "puts appends a newline",
      "printf always appends a newline",
      "puts treats s as a format string",
      "printf omits the final displayed character"
    ],
    "a": 0,
    "k": "mcq",
    "why": "puts is simpler and safer for a bare string, since a string containing % would be misread by printf(s)."
  },
  "c11-14": {
    "q": "What minimum destination capacity is needed for the shown strcpy of \"Hello\"?",
    "c": [
      "4",
      "5",
      "6",
      "7"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The terminator has to fit too. This is the classic buffer overflow, and strcpy will not stop it."
  },
  "c11-17": {
    "q": "If src has at least n characters, what does strncpy(dst, src, n) omit?",
    "c": [
      "The first source character",
      "The nth copied character",
      "The existing destination address",
      "A terminating null character"
    ],
    "a": 3,
    "k": "mcq",
    "why": "strncpy copies n characters without adding a terminator in this case. The count must fit the destination; manual termination must also use a valid index."
  },
  "c11-18": {
    "q": "When a newline fits in the destination, what does successful fgets do with it?",
    "c": [
      "Discards it before returning",
      "Stores the newline before NUL",
      "Replaces it with a space",
      "Returns it as the function value"
    ],
    "a": 1,
    "k": "mcq",
    "why": "The usual fix is s[strcspn(s, \"\\n\")] = '\\0'; or checking the last character. fgets(s, size, stdin) reads the keyboard fine."
  },
  "c11-21": {
    "q": "For a non-VLA char array in scope, which operation counts only characters before its first NUL?",
    "c": [
      "sizeof s",
      "sizeof s[0]",
      "sizeof &s",
      "strlen(s)"
    ],
    "a": 3,
    "k": "mcq",
    "why": "strlen examines the string contents up to the terminator. sizeof an ordinary array describes its total storage rather than current string length."
  },
  "c11-22": {
    "q": "Why must the buffer passed to strtok be writable?",
    "c": [
      "The function enlarges the buffer for every token",
      "The function reverses each token before returning",
      "The function converts the buffer pointer to NULL",
      "Tokens are separated by writing NUL characters"
    ],
    "a": 3,
    "k": "mcq",
    "why": "It also keeps hidden state between calls, so you cannot interleave two tokenizations, and it must never be used on a string literal."
  },
  "c11-30": {
    "q": "What is sizeof(\"C\") in C bytes?",
    "c": [
      "2",
      "1",
      "3",
      "sizeof(char *)"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The character C plus the terminating \\0."
  },
  "c11-31": {
    "q": "For a valid terminated string s, which function reports its length excluding NUL?",
    "c": [
      "sizeof(s)",
      "strlen(s)",
      "strcspn(s, \" \")",
      "strcmp(s, \"\")"
    ],
    "a": 1,
    "k": "mcq",
    "why": "strlen walks to the \\0 and does not count it; sizeof reports the reserved bytes, terminator included."
  },
  "c11-32": {
    "q": "Given adequate capacity and nonoverlapping strings, what does strcat(a, b) modify?",
    "c": [
      "b, by appending as characters",
      "a, by appending bs characters",
      "Both arrays, by exchanging contents",
      "Neither array, by returning a new allocation"
    ],
    "a": 1,
    "k": "mcq",
    "why": "a must already have room for both plus the terminator - strcat does not check."
  },
  "c11-33": {
    "q": "Which strcmp result indicates that the first string compares before the second?",
    "c": [
      "Exactly -1 only",
      "Any negative value",
      "Any nonzero value",
      "The first strings length"
    ],
    "a": 1,
    "k": "mcq",
    "why": "strcmp returns a negative value, zero or a positive value. Only the sign is promised: the value may be -1 or 1 on one system and any other negative or positive number on another."
  },
  "c11-34": {
    "q": "What does strchr(s, 'x') return when x occurs several times in a valid string?",
    "c": [
      "A pointer to its last occurrence",
      "The count of its occurrences",
      "A pointer to its first occurrence",
      "The index of its first occurrence"
    ],
    "a": 2,
    "k": "mcq",
    "why": "It returns a POINTER. Subtract s from it if you want an index."
  },
  "c11-35": {
    "q": "Which call writes a string and appends a newline?",
    "c": [
      "fputs(s, stdout)",
      "printf(\"%s\", s)",
      "fprintf(stdout, \"%s\", s)",
      "puts(s)"
    ],
    "a": 3,
    "k": "mcq",
    "why": "puts appends \\n; fputs does not, and printf prints exactly what the format says."
  },
  "c11-40": {
    "q": "Which expression tests whether a valid C string s is empty?",
    "c": [
      "s == NULL",
      "s[1] == '\\0'",
      "s[0] == '\\0'",
      "sizeof s == 0"
    ],
    "a": 2,
    "k": "mcq",
    "why": "An empty string has its terminator at element zero. A NULL pointer is not an empty string."
  },
  "c11-43": {
    "q": "What storage defect exists in char *s; scanf(\"%s\", s); for an automatic uninitialized s?",
    "c": [
      "The conversion reads one character only",
      "The input cannot include decimal digits",
      "No valid destination object is supplied",
      "The pointer reserves only its first char"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Declaring a pointer does not provide character storage or a valid pointer value. Use a suitably bounded array or checked allocation."
  },
  "c11-45": {
    "q": "Which condition selects a valid string s equal to \"quit\"?",
    "c": [
      "strcmp(s, \"quit\") != 0",
      "s == \"quit\"",
      "strlen(s) == strlen(\"quit\")",
      "strcmp(s, \"quit\") == 0"
    ],
    "a": 3,
    "k": "mcq",
    "why": "if (strcmp(s, \"quit\")) is inverted - a non-zero strcmp means they DIFFER, so that branch fires on every other word."
  },
  "c11-48": {
    "q": "Assume strlen is evaluated by scanning the unchanged string on every loop test. What time growth does for(i=0; i<strlen(s); i++) exhibit?",
    "c": [
      "Linear in the string length",
      "Quadratic in the string length",
      "Logarithmic in the string length",
      "Constant in the string length"
    ],
    "a": 1,
    "k": "mcq",
    "why": "There are linearly many tests, each with a linear scan under the stated model. A compiler may optimize some cases; cache the length or test s[i] when appropriate."
  },
  "c11-50": {
    "q": "For a writable comma-separated buffer, which function splits tokens and maintains continuation state between calls?",
    "c": [
      "strchr",
      "strstr",
      "strcspn",
      "strtok"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Never call strtok on a string literal, and never interleave two tokenizations with it."
  },
  "c11-51": {
    "q": "Assuming ASCII, why is strcmp(\"apple\", \"Banana\") positive?",
    "c": [
      "Character order, with lowercase above uppercase in ASCII",
      "Length order, with shorter strings placed before longer strings",
      "Address order, with literals placed consecutively in static storage",
      "Case-insensitive order, with capitals converted before comparison"
    ],
    "a": 0,
    "k": "mcq",
    "why": "For dictionary order you must fold case yourself, or use a case-insensitive comparison function."
  },
  "c11-52": {
    "q": "Why cannot the caller safely use the shown returned pointer after the function returns?",
    "c": [
      "Its automatic array has ended its lifetime",
      "Its characters become uppercase on return",
      "Its array acquires internal linkage",
      "Its terminator is returned by value"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Make it static, allocate with malloc, or have the caller pass in a buffer to fill."
  },
  "c11-60": {
    "q": "Which character sequence is an empty C string?",
    "c": [
      "No allocated characters",
      "One NUL character",
      "One newline character",
      "A null pointer value"
    ],
    "a": 1,
    "k": "mcq",
    "why": "Length is not stored anywhere - which is why strlen has to walk the string to find it."
  },
  "c11-62": {
    "q": "Which function returns a pointer to the first occurrence of a substring, or NULL if absent?",
    "c": [
      "strchr",
      "strcmp",
      "strcspn",
      "strstr"
    ],
    "a": 3,
    "k": "mcq",
    "why": "strstr finds a substring and returns a pointer to it, or NULL. strchr finds a single character."
  },
  "c11-64": {
    "q": "For nonoverlapping src and dst, what minimum destination capacity permits strcpy(dst, src)?",
    "c": [
      "strlen(src) + 1",
      "strlen(src)",
      "sizeof(src)",
      "sizeof(char *)"
    ],
    "a": 0,
    "k": "mcq",
    "why": "The extra byte is for the terminator, and strcpy will happily run past the end without it."
  },
  "c11-67": {
    "q": "In C, what does char s[5] = \"hello\"; create?",
    "c": [
      "Four letters followed by a NUL",
      "A pointer to the literal hello",
      "A required translation error",
      "Five letters with no terminating NUL"
    ],
    "a": 3,
    "k": "mcq",
    "why": "C permits an exact-fitting char array initializer without the terminator. The array contains the letters but is not a terminated string for strlen or %s."
  },
  "c11-69": {
    "q": "Let dst and src be nonoverlapping valid strings, and cap be the separately known capacity of dst. Let d=strlen(dst), s=strlen(src), with d<cap. Which test safely establishes room before strcat?",
    "c": [
      "s < cap - d",
      "s <= cap - d",
      "s < cap",
      "d + s <= sizeof(dst)"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Given d<cap, subtracting d is safe and leaves room for existing data. The strict bound also reserves one char for NUL and avoids overflowing a d+s sum. sizeof a pointer is not a capacity."
  },
  "c10-ed4-001": {
    "q": "An existing string has length 4 and src has length 3. What minimum destination capacity permits strcat?",
    "c": [
      "7",
      "4",
      "3",
      "8"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Check existing length, source length, and destination capacity before writing."
  },
  "c10-ed4-002": {
    "q": "A char buffer has capacity 30 and currently stores \"abc\". What does strlen report?",
    "c": [
      "3",
      "4",
      "30",
      "sizeof(char *)"
    ],
    "a": 0,
    "k": "mcq",
    "why": "strlen counts characters before the first NUL, not allocated storage."
  },
  "c10-ed4-003": {
    "q": "Given char *p=\"cat\", which action has undefined behavior?",
    "c": [
      "p = \"dog\";",
      "p++;",
      "strlen(p);",
      "p[0] = 'b';"
    ],
    "a": 3,
    "k": "mcq",
    "why": "Modifying a string literal is undefined behavior. Use a writable array for editing."
  },
  "c10-ed4-004": {
    "q": "If strcmp(a,b) returns -7, which conclusion is supported?",
    "c": [
      "a is seven characters shorter",
      "a and b differ in seven positions",
      "a contains an invalid character",
      "a compares before b"
    ],
    "a": 3,
    "k": "mcq",
    "why": "The magnitude need not be -1; test the sign, zero, or positivity."
  },
  "c11-23": {
    "q": "Which behavior is specified for the shown attempt to modify a string literal?",
    "c": [
      "Unspecified behavior",
      "Defined behavior",
      "Undefined behavior",
      "Implementation-defined behavior"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Declaring it as char p[] = \"hello\"; makes a private, writable copy and the assignment becomes legal.",
    "tag": "Bug Hunt"
  },
  "c11-38": {
    "q": "Which C-level classification applies to the shown uninitialized remainder and overwritten string terminator used by %s?",
    "c": [
      "Defined behavior",
      "Implementation-defined behavior",
      "Unspecified behavior",
      "Undefined behavior"
    ],
    "a": 3,
    "k": "mcq",
    "why": "The remaining automatic bytes do not establish a valid terminated string. Do not infer a particular continued memory scan or output from an undefined operation.",
    "tag": "Bug Hunt"
  },
  "c11-49": {
    "q": "What is printed?",
    "c": [
      "1",
      "4",
      "6",
      "0"
    ],
    "a": 3,
    "k": "mcq",
    "why": "strncpy copies four characters into dst. dst[3] is d, so the explicit comparison with NUL is false. This comparison is valid even though the array is not a terminated string."
  },
  "c10-tf-001": {
    "q": "Which sequence is a valid C string of length two?",
    "c": [
      "'a', 'b' only",
      "'a', NUL, 'b' as a length-two string",
      "'a', 'b', NUL",
      "'a', 'b', newline only"
    ],
    "a": 2,
    "k": "mcq",
    "why": "String-handling functions use the first \\0 character to find the end.",
    "tag": "Concept"
  },
  "c10-tf-002": {
    "q": "What is strlen(\"ab\\0cd\")?",
    "c": [
      "5",
      "6",
      "2",
      "4"
    ],
    "a": 2,
    "k": "mcq",
    "why": "strlen stops at the first NUL. The later literal characters do not contribute to the string length.",
    "tag": "Concept"
  },
  "c10-tf-003": {
    "q": "For char s[] = \"cat\", what is sizeof s?",
    "c": [
      "3",
      "4",
      "1",
      "sizeof(char *)"
    ],
    "a": 1,
    "k": "mcq",
    "why": "The array contains c, a, t, and the terminating null character.",
    "tag": "Concept"
  },
  "c10-tf-004": {
    "q": "Which operation compares the contents of two valid strings rather than their addresses?",
    "c": [
      "a == b",
      "&a == &b",
      "sizeof a == sizeof b",
      "strcmp(a, b)"
    ],
    "a": 3,
    "k": "mcq",
    "why": "With char pointers, == compares pointer values; strcmp performs lexicographic content comparison.",
    "tag": "Concept"
  },
  "c10-tf-005": {
    "q": "Which declaration permits modifying the first character of the stored cat string?",
    "c": [
      "char *p = \"cat\";",
      "const char p[] = \"cat\";",
      "char p[] = \"cat\";",
      "const char *p = \"cat\";"
    ],
    "a": 2,
    "k": "mcq",
    "why": "A literal may reside in non-writable storage; use a writable char array when modification is required.",
    "tag": "Concept"
  },
  "c10-tf-006": {
    "q": "Which information must the caller establish before strcpy into an existing destination?",
    "c": [
      "The number of changed pointer aliases",
      "An equal source and destination length",
      "Enough space including the terminator",
      "A source allocated by malloc"
    ],
    "a": 2,
    "k": "mcq",
    "why": "The caller must provide sufficient space for all characters and the terminating null character.",
    "tag": "Concept"
  },
  "c10-tf-007": {
    "q": "With src length at least n, what can strncpy(dst,src,n) leave after n copied characters?",
    "c": [
      "One additional NUL at dst[n]",
      "No terminating NUL",
      "A newly enlarged destination",
      "The source shortened to n characters"
    ],
    "a": 1,
    "k": "mcq",
    "why": "If the source length is at least the count, strncpy does not append a terminator.",
    "tag": "Concept"
  },
  "c10-tf-008": {
    "q": "What does strcmp(\"\", \"\") return?",
    "c": [
      "0",
      "1",
      "-1",
      "2"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Both begin with the terminating null character, so neither differs from the other.",
    "tag": "Concept"
  },
  "c7-49": {
    "q": "What three-letter constant does getchar return when it encounters end of file?",
    "a": [
      "EOF"
    ],
    "why": "getchar returns an int character value or the negative int constant EOF. Other read functions can use different failure indicators."
  },
  "c4-40": {
    "q": "For which int n values does the shown printf(\"here\") execute?",
    "c": [
      "n <= 10",
      "n > 10",
      "No n values",
      "Every n value"
    ],
    "a": 2,
    "k": "mcq",
    "why": "Every path returns before the printf, so the call is unreachable."
  },
  "c7-46": {
    "q": "log.txt already contains 500 lines. If the shown fopen succeeds, what happens to those existing lines?",
    "c": [
      "They are removed by truncation",
      "They remain before the new text",
      "They remain after the new text",
      "They are copied into a new file"
    ],
    "a": 0,
    "k": "mcq",
    "why": "Use \"a\" to add to an existing file. Choosing \"w\" for a log file is a genuinely destructive mistake."
  },
  "c7-52": {
    "q": "With the shown retry loop and input \"abc\", why does another attempt encounter the same problem?",
    "c": [
      "The conversion assigns integer zero",
      "The unmatched character remains unread",
      "The conversion discards the whole line",
      "The EOF indicator resets the buffer"
    ],
    "a": 1,
    "k": "mcq",
    "why": "You must consume the offending characters, for instance with a while ((c = getchar()) != '\\n' && c != EOF); loop."
  },
  "c4-13": {
    "c": [
      "7 7.5",
      "-7 7.5",
      "7 -7.5",
      "-7 -7.5"
    ],
    "a": 0
  },
  "c4-52": {
    "c": [
      "12",
      "19",
      "17",
      "5"
    ],
    "a": 2
  },
  "c5-11": {
    "c": [
      "threefourother",
      "threefour",
      "fourother",
      "three"
    ],
    "a": 0
  },
  "c5-12": {
    "c": [
      "other",
      "vowel-ish",
      "vowel-ishother",
      "vowel-ishvowel-ish"
    ],
    "a": 1
  },
  "c5-23": {
    "c": [
      "B",
      "AB",
      "BC",
      "ABC"
    ],
    "a": 0
  },
  "c5-46": {
    "c": [
      "lowhigh",
      "low",
      "high",
      "highlow"
    ],
    "a": 1
  },
  "c5-48": {
    "c": [
      "No output",
      "one",
      "two",
      "onetwo"
    ],
    "a": 0
  },
  "c6-09": {
    "c": [
      "5",
      "10",
      "15",
      "0"
    ],
    "a": 1
  },
  "c6-15": {
    "c": [
      "0",
      "1",
      "2",
      "3"
    ],
    "a": 3,
    "tag": "Trace"
  },
  "c6-43": {
    "c": [
      "*|**|***|",
      "***|***|***|",
      "*|*|*|",
      "***|**|*|"
    ],
    "a": 0
  },
  "c8-10": {
    "c": [
      "1",
      "99",
      "0",
      "100"
    ],
    "a": 1
  },
  "c8-16": {
    "c": [
      "About 10",
      "About 20",
      "About 100",
      "About 1000"
    ],
    "a": 0
  },
  "c9-20": {
    "c": [
      "50",
      "5",
      "10",
      "25"
    ],
    "a": 0
  },
  "c9-36": {
    "c": [
      "1",
      "100",
      "0",
      "101"
    ],
    "a": 1
  },
  "c10-15": {
    "c": [
      "5",
      "0",
      "15",
      "10"
    ],
    "a": 2
  },
  "c11-46": {
    "c": [
      "abcdef",
      "abdef",
      "ab",
      "defab"
    ],
    "a": 1
  },
  "c3-15": {
    "c": [
      "5 5",
      "0 5",
      "5 0",
      "0 0"
    ],
    "a": 0
  },
  "c4-08": {
    "c": [
      "6",
      "0",
      "5",
      "7"
    ],
    "a": 2
  },
  "c4-09": {
    "c": [
      "5",
      "7",
      "0",
      "6"
    ],
    "a": 3
  },
  "c4-42": {
    "c": [
      "0",
      "2",
      "1",
      "3"
    ],
    "a": 1
  },
  "c5-08": {
    "c": [
      "1",
      "0",
      "5",
      "3"
    ],
    "a": 1
  },
  "c5-15": {
    "c": [
      "Y",
      "X",
      "YX",
      "XY"
    ],
    "a": 0
  },
  "c5-30": {
    "c": [
      "1",
      "0",
      "7",
      "-1"
    ],
    "a": 1
  },
  "c5-31": {
    "c": [
      "0",
      "-1",
      "1",
      "2"
    ],
    "a": 2
  },
  "c5-51": {
    "c": [
      "X",
      "Y",
      "Z",
      "XY"
    ],
    "a": 1
  },
  "c5-53": {
    "c": [
      "a",
      "ab",
      "c",
      "b"
    ],
    "a": 3
  },
  "c6-08": {
    "c": [
      "012",
      "123",
      "0123",
      "01"
    ],
    "a": 0
  },
  "c8-03": {
    "c": [
      "Both 3",
      "3 and 0",
      "Both 0",
      "0 and 3"
    ],
    "a": 2
  },
  "c8-33": {
    "c": [
      "0, 0, 0",
      "0, 1, 2",
      "1, 0, 0",
      "1, 1, 1"
    ],
    "a": 0
  },
  "c9-04": {
    "c": [
      "0",
      "5",
      "1",
      "6"
    ],
    "a": 1
  },
  "c9-06": {
    "c": [
      "p: int*; q: int",
      "p: int*; q: int*",
      "p: int; q: int",
      "p: int; q: int*"
    ],
    "a": 0
  },
  "c9-08": {
    "c": [
      "10",
      "20",
      "0",
      "30"
    ],
    "a": 1
  },
  "c9-09": {
    "c": [
      "8",
      "1",
      "7",
      "0"
    ],
    "a": 2
  },
  "c9-14": {
    "c": [
      "0",
      "1",
      "6",
      "5"
    ],
    "a": 3
  },
  "c9-31": {
    "c": [
      "3",
      "5",
      "4",
      "0"
    ],
    "a": 2
  },
  "c9-35": {
    "c": [
      "5",
      "3",
      "8",
      "11"
    ],
    "a": 2
  },
  "c9-40": {
    "c": [
      "7 0 0",
      "7 7 0",
      "0 7 7",
      "7 7 7"
    ],
    "a": 3
  },
  "c9-45": {
    "c": [
      "1",
      "0",
      "10",
      "-1"
    ],
    "a": 0
  },
  "c9-61": {
    "c": [
      "12",
      "20",
      "32",
      "8"
    ],
    "a": 1
  },
  "c9-67": {
    "c": [
      "1",
      "0",
      "3",
      "2"
    ],
    "a": 3
  },
  "c10-22": {
    "c": [
      "1 5",
      "1 4",
      "0 4",
      "0 5"
    ],
    "a": 0
  },
  "c10-53": {
    "c": [
      "12345",
      "543",
      "5432",
      "54321"
    ],
    "a": 3
  },
  "c11-11": {
    "c": [
      "0",
      "1",
      "-1",
      "2"
    ],
    "a": 1
  },
  "c11-61": {
    "c": [
      "d",
      "g",
      "o",
      "O"
    ],
    "a": 2
  }
};
  Object.keys(QBANK).forEach(function (chapter) {
    QBANK[chapter].forEach(function (q) {
      var patch = updates[q.id];
      if (!patch || q.source) return;
      Object.keys(patch).forEach(function (key) { q[key] = patch[key]; });
    });
  });
  window.C_MIDTERM_QUALITY_IDS = Object.keys(updates);
}());
