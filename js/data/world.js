/* The C-MON region.
   Each chapter of Forouzan & Gilberg, "Computer Science: A Structured Programming
   Approach in C", becomes a Route (wild Pokemon to catch) plus a Gym (the boss).
   Chapter topic -> Pokemon type is a deliberate mnemonic: pointers are Ghost because
   they haunt indirectly, I/O is Water because it is a stream, arrays are Rock because
   they are one contiguous block, and so on. */

window.CHAPTERS = [
  {
    n: 1, type: 'normal', route: 'Route 1 - Boot Sector',
    title: 'Introduction to Computers',
    leader: 'Byte', epithet: 'The First Boot', badge: 'Boot Badge',
    blurb: 'Hardware, software, the SDLC, and how a source file becomes an executable.',
    teamTypes: ['normal'], ace: 143,
    notes: [
      'Computer system = hardware + software. Hardware is five parts: input devices, CPU, primary storage (main memory), output devices, auxiliary storage.',
      'System software (operating system, system support, system development) vs application software (general-purpose vs application-specific).',
      'Language levels: machine language (binary, the only one the CPU runs) -> symbolic/assembly (mnemonics, needs an assembler) -> high-level (portable, needs a compiler).',
      'Build pipeline: source file -> preprocessor -> translator/compiler -> object file -> linker (adds library code) -> executable file -> loader -> running program.',
      'Three error classes: compile-time errors (syntax), run-time errors (crash), and logic errors (it runs and is wrong). Only the first two are reported to you.',
      'SDLC: system requirements, analysis, design, code, system test, maintenance. Program development: understand the problem, develop a solution, write the program, test it.',
      '"Resist the temptation to code" - design before typing. Structure charts show design top-down; flowcharts and pseudocode show algorithms.',
      'Time-sharing: dumb terminals, all work on a central computer. Client/server: the terminal does part of the work.'
    ]
  },
  {
    n: 2, type: 'grass', route: 'Route 2 - Declaration Grove',
    title: 'Introduction to the C Language',
    leader: 'Vera Bell', epithet: 'Seedling of Syntax', badge: 'Hello Badge',
    blurb: 'Identifiers, types, variables, constants, and your first printf.',
    teamTypes: ['grass'], ace: 3,
    notes: [
      'Identifiers: letters, digits and underscore only; cannot start with a digit; case sensitive; no keywords. Names starting with an underscore are reserved for the system.',
      'Atomic data types: void, char, int (short/int/long, signed/unsigned), float (float/double/long double). Derived types come later: arrays, pointers, structs, unions.',
      'A variable must be declared before use. Declaration reserves memory; initialization gives it a first value. An uninitialized local variable holds garbage, not 0.',
      'Constants: literal (5, 3.2, \'A\', "hi"), defined (#define MAX 100 - preprocessor text substitution, no semicolon, no type), and memory (const float PI = 3.14;).',
      'A character constant is in single quotes and is an int-valued code; a string literal is in double quotes and is a char array ending in \\0. \'A\' != "A".',
      'printf format: %d int, %ld long, %u unsigned, %f float/double, %e scientific, %c char, %s string, %% a literal percent. Width/precision: %8.2f.',
      'scanf needs the ADDRESS of each variable: scanf("%d", &x). Forgetting & is the classic beginner crash. Strings are the exception - an array name is already an address.',
      'Every C program has exactly one main. Comments /* ... */ do not nest; // runs to end of line.'
    ]
  },
  {
    n: 3, type: 'electric', route: 'Route 3 - Operator Current',
    title: 'Structure of a C Program',
    leader: 'Ohma', epithet: 'Operator of the Current', badge: 'Operand Badge',
    blurb: 'Expressions, precedence, side effects, and type conversion.',
    teamTypes: ['electric'], ace: 26,
    notes: [
      'Expression types: primary, postfix (x++), prefix (++x), unary, binary, ternary (?:), assignment, comma.',
      'x++ yields the OLD value then adds 1. ++x adds 1 then yields the NEW value. Both leave x incremented.',
      'Integer division truncates toward zero: 7/2 is 3, -7/2 is -3. The % operator needs integer operands; the sign of a%b follows a.',
      'Precedence decides which operator grabs an operand; associativity breaks ties among equals. Assignment is right-associative: a = b = 5.',
      'Compound assignment: x += 3 is x = x + 3. Also -= *= /= %=.',
      'Implicit conversion promotes the narrower operand to the wider one (int -> float -> double). 1/2 is 0, but 1/2.0 is 0.5.',
      'An explicit cast (int)x converts a COPY for that expression only; the variable itself never changes type in memory.',
      'Do not mix side effects with the same variable in one expression - a = i++ + i++ is undefined behavior, not a puzzle with a right answer.',
      'The value of an assignment expression is the value assigned, which is why x = y = 0 works.'
    ]
  },
  {
    n: 4, type: 'fighting', route: 'Route 4 - Callers Dojo',
    title: 'Functions',
    leader: 'Callum', epithet: 'One Call, One Return', badge: 'Return Badge',
    blurb: 'Declarations, definitions, parameter passing, and scope.',
    teamTypes: ['fighting'], ace: 68,
    notes: [
      'A function declaration (prototype) ends in a semicolon and tells the compiler the return type and parameter types. The definition has the body.',
      'C passes arguments BY VALUE - the function gets a copy. To change the caller\'s variable, pass its address and use a pointer (pass by reference).',
      'void return type means no value returned; void parameter list means no parameters. int f() and int f(void) are not the same declaration in classic C.',
      'A local variable lives inside its block; it is created on entry and destroyed on exit. Two locals with the same name in different blocks are different variables.',
      'A global variable is declared outside all functions and is visible from its declaration to the end of the file. Prefer parameters to globals.',
      'static on a local variable makes it keep its value between calls and initialize only once. static on a global limits it to that file.',
      'Structure chart terms: a function is called by its caller; the "black box" idea says the caller needs only the interface, not the body.',
      'Standard library functions used here: abs, fabs, ceil, floor, pow, sqrt (math.h); rand, srand, abs (stdlib.h); isalpha and friends (ctype.h).'
    ]
  },
  {
    n: 5, type: 'psychic', route: 'Route 5 - Branch Mindscape',
    title: 'Selection - Making Decisions',
    leader: 'Elsie Fitz', epithet: 'Mind of Many Branches', badge: 'Branch Badge',
    blurb: 'Logical data, if...else, switch, and the dangling else.',
    teamTypes: ['psychic'], ace: 65,
    notes: [
      'C has no boolean type in the classic sense: 0 is false, ANY non-zero value is true. Relational operators yield 1 for true and 0 for false.',
      'Logical operators && and || short-circuit: if the left side settles the answer, the right side is never evaluated (and its side effects never happen).',
      '== is comparison, = is assignment. if (x = 5) assigns and is always true. Compilers may not warn.',
      'Never compare floats with == - compare fabs(a - b) < epsilon instead.',
      'An else always binds to the NEAREST unmatched if. Use braces to force the pairing you meant - this is the dangling else problem.',
      'switch requires an INTEGRAL expression; case labels must be constant and unique. No ranges, no floats, no variables.',
      'Without break, control falls through into the next case. Deliberate fall-through gives you multi-valued cases; accidental fall-through is a classic bug.',
      'default handles everything unmatched and may appear anywhere, but put it last for readability.',
      'ctype.h classification: isalpha, isdigit, isalnum, isspace, ispunct, isupper, islower; conversion: toupper, tolower.'
    ]
  },
  {
    n: 6, type: 'flying', route: 'Route 6 - Loop Updraft',
    title: 'Repetition',
    leader: 'Willa Doo', epithet: 'She Never Stops', badge: 'Loop Badge',
    blurb: 'while, for, do...while, nesting, and recursion.',
    teamTypes: ['flying'], ace: 18,
    notes: [
      'Every loop needs three things: initialization, a testing condition, and an update. Miss the update and you loop forever.',
      'while and for are PRETEST loops - the body may run zero times. do...while is a POSTTEST loop - the body always runs at least once, and it ends with a semicolon.',
      'for (init; limit; update) - all three parts are optional. for (;;) is a perpetual loop. Comma lets you do several things in one part.',
      'Loop control can be counter-controlled (a known number of times), event-controlled (until something happens), or sentinel-controlled (until a marker value).',
      'for (i = 0; i < n; i++) runs n times. for (i = 1; i <= n; i++) also runs n times. for (i = 0; i <= n; i++) runs n+1 times - the classic off-by-one.',
      'A stray semicolon after for(...) or while(...) makes an empty body; the real body then runs exactly once, after the loop.',
      'break exits the innermost loop or switch immediately. continue skips the rest of THIS iteration - in a for loop the update still happens, in a while loop it may not.',
      'Recursion needs a base case that stops it and a general case that moves toward the base. Without the base case you overflow the stack.',
      'Recursive factorial and Fibonacci are clear but expensive; the iterative versions do far less work. Recursion is right when the problem is naturally recursive (Towers of Hanoi).'
    ]
  },
  {
    n: 7, type: 'water', route: 'Route 7 - Stream Delta',
    title: 'Text Input/Output',
    leader: 'Scanlon Prince', epithet: 'Master of Streams', badge: 'Stream Badge',
    blurb: 'Formatted and character I/O, files, and reading until EOF.',
    teamTypes: ['water'], ace: 130,
    notes: [
      'A stream is a general name for a flow of data. stdin, stdout and stderr are opened for you; other files you open yourself.',
      'fopen(name, mode) returns a FILE* or NULL on failure - always test it. Modes: "r" read (must exist), "w" write (creates/TRUNCATES), "a" append.',
      'fclose flushes buffers and releases the file. Failing to close a written file can lose data.',
      'printf/scanf are the stdin/stdout versions of fprintf/fscanf. fprintf(stdout, ...) is the same as printf(...).',
      'scanf returns the NUMBER OF ITEMS successfully converted, not the value read. Test it: if (scanf("%d", &x) != 1) is how you detect bad input.',
      'scanf with %d %f %s skips leading whitespace; %c does NOT - it reads the next character, including a leftover newline.',
      'EOF is a negative constant (usually -1). while ((ch = getchar()) != EOF) is the standard character-read loop, and ch must be an int, not a char.',
      'Field width in scanf ("%3d") limits how much is read. The suppression flag ("%*d") reads a field and throws it away.',
      'Character I/O: getchar/putchar for stdin/stdout, fgetc/fputc for any file, fgets/fputs for lines. fgets keeps the newline; gets is unsafe and gone.'
    ]
  },
  {
    n: 8, type: 'rock', route: 'Route 8 - Index Quarry',
    title: 'Arrays',
    leader: 'Indira Bounds', epithet: 'Zero To N Minus One', badge: 'Index Badge',
    blurb: 'One- and two-dimensional arrays, sorting, and searching.',
    teamTypes: ['rock'], ace: 95,
    notes: [
      'An array is a fixed-size, contiguous set of elements of ONE type. Declaring int a[25] gives valid indexes 0 through 24.',
      'C does NOT check array bounds. Reading or writing a[25] in a 25-element array compiles fine and corrupts memory.',
      'Initialization: int a[5] = {1,2,3}; fills the rest with 0. int a[] = {1,2,3}; sizes itself to 3. You cannot assign one whole array to another.',
      'The array name is the address of element 0. Passing an array to a function passes that address, so the function CAN change the caller\'s data.',
      'Because only the address is passed, the function cannot know the size - pass the element count as a separate parameter.',
      'sizeof(a)/sizeof(a[0]) gives the element count, but only where a is the real array, never inside a function that received it as a parameter.',
      'Selection sort: repeatedly find the smallest of the unsorted part and swap it into place. Bubble sort: repeatedly swap adjacent out-of-order pairs so the smallest bubbles up. Insertion sort: take the next element and slide it back into the sorted part.',
      'Sequential search works on any list and is O(n). Binary search needs a SORTED list, halves the range each time, and is O(log n).',
      'Two-dimensional arrays are stored ROW BY ROW (row-major). int t[3][5] is 3 rows of 5. Passing it needs the column size: f(int t[][5], int rows).'
    ]
  },
  {
    n: 9, type: 'ghost', route: 'Route 9 - Indirection Tower',
    title: 'Pointers',
    leader: 'Astrid Starr', epithet: 'The Dereferencer', badge: 'Deref Badge',
    blurb: 'Addresses, dereferencing, pointers to pointers, and pass by reference.',
    teamTypes: ['ghost', 'psychic'], ace: 94,
    notes: [
      'A pointer holds an ADDRESS, not a value. & is the address-of operator; * (dereference/indirection) gets the value at that address.',
      'int *p; declares p as a pointer to int. The * belongs to the variable, so int *p, q; makes p a pointer and q a plain int.',
      '& and * are inverses: *&x is x. p = &x makes *p another name for x.',
      'Every pointer is the same size regardless of what it points to, because an address is an address. But the TYPE matters for dereferencing and arithmetic.',
      'Pointers must be initialized before use. A pointer to nothing should be set to NULL; dereferencing an uninitialized or NULL pointer is a run-time crash.',
      'Pass by reference: void swap(int *a, int *b) called as swap(&x, &y) lets a function change the caller\'s variables. This is how scanf can fill your variables.',
      'A pointer to a pointer (int **pp) holds the address of a pointer. *pp is the pointer, **pp is the value.',
      'A function can return a pointer, but never a pointer to its own local variable - that memory is gone when the function returns.',
      'void* is a generic pointer that can hold any address but cannot be dereferenced until it is cast to a real type.'
    ]
  },
  {
    n: 10, type: 'poison', route: 'Route 10 - The Heap Marsh',
    title: 'Pointer Applications',
    leader: 'Mal Locke', epithet: 'Keeper of the Heap', badge: 'Heap Badge',
    blurb: 'Pointer arithmetic, arrays as pointers, and dynamic memory.',
    teamTypes: ['poison'], ace: 89,
    notes: [
      'Pointer arithmetic is SCALED by the pointed-to type: p + 1 moves forward by sizeof(*p) bytes, not one byte.',
      'a[i] is exactly *(a + i). The array name is a constant pointer, so a++ is illegal but p++ on a pointer variable is fine.',
      'Subtracting two pointers into the same array gives the number of ELEMENTS between them. Adding two pointers is meaningless and illegal.',
      'Pointer comparison (<, >, ==) is only meaningful inside one array, and is the idiom for walking it: for (p = a; p < a + n; p++).',
      'malloc(n) returns a void* to n UNINITIALIZED bytes, or NULL if it fails - always test the return. calloc(count, size) does the same but zeroes the memory. realloc resizes a block.',
      'Always size with sizeof: p = (int*)malloc(n * sizeof(int)); never with a hard-coded byte count.',
      'free(p) returns the block to the heap. Freeing twice, freeing something malloc did not return, or using memory after free are all serious bugs.',
      'A memory leak is allocated memory you can no longer reach because you overwrote the only pointer to it. A dangling pointer still points at freed memory.',
      'Memory is not returned by going out of scope - only free does that. Dynamic memory lives until you free it or the program ends.'
    ]
  },
  {
    n: 11, type: 'fairy', route: 'Route 11 - Terminator Glade',
    title: 'Strings',
    leader: 'Nula Terminel', epithet: 'Bearer of the Silent Zero', badge: 'NUL Badge',
    blurb: 'Fixed character arrays, the null character, and string.h.',
    teamTypes: ['fairy', 'normal'], ace: 242,
    notes: [
      'A C string is a char array ending with the null character \\0. That terminator takes a byte, so "Hello" needs 6 bytes.',
      'char s[] = "cat"; is a modifiable array of 4 chars. char *s = "cat"; points at a string literal you must not modify.',
      '\'A\' is a character (1 byte, an int value). "A" is a string (2 bytes: \'A\' and \'\\0\'). They are not interchangeable.',
      'Read: scanf("%s", str) stops at the first whitespace and does NOT need &. fgets(str, size, stdin) reads a whole line and is the safe choice.',
      'Print: printf("%s", str) or puts(str) (puts adds a newline).',
      'strlen counts characters BEFORE the \\0, so strlen("Hello") is 5 while sizeof holds 6.',
      'strcpy(dst, src) copies including the terminator; strncpy limits the count but may leave dst unterminated. You cannot copy strings with =.',
      'strcmp(s1, s2) returns negative if s1 < s2, 0 if equal, positive if s1 > s2 - comparison is by character code, so "Zoo" < "apple" in ASCII. You cannot compare strings with ==.',
      'strcat appends; the destination must already have room for both plus the terminator. strchr finds a character, strstr finds a substring, strtok splits on delimiters.'
    ]
  },
  {
    n: 12, type: 'steel', route: 'Route 12 - Struct Foundry',
    title: 'Enumerated, Structure, and Union Types',
    leader: 'Padma Align', epithet: 'Architect of the Struct', badge: 'Struct Badge',
    blurb: 'enum, struct, union, typedef, and arrays of structures.',
    teamTypes: ['steel', 'rock'], ace: 208,
    notes: [
      'enum gives names to integer constants, numbered from 0 unless you assign values; after an assignment, numbering continues from there.',
      'A structure groups related members of possibly DIFFERENT types under one name. Each member gets its own memory.',
      'Access: s.member for a structure variable, p->member for a pointer to a structure. p->m is shorthand for (*p).m - the parentheses are required.',
      'Unlike arrays, a whole structure CAN be assigned, passed by value, and returned by value. But passing a big structure by value copies all of it - pass a pointer instead.',
      'You cannot compare two structures with == ; compare member by member.',
      'typedef creates a new NAME for an existing type; it does not create a new type. typedef struct {...} STUDENT; then STUDENT s;',
      'A union stores all its members in the SAME memory, sized to the largest. Writing one member overwrites the others, so only the most recently written member is valid.',
      'A common design is a structure holding a tag plus a union, where the tag records which union member is live.',
      'Structures may be nested and may contain arrays; an array of structures is the standard way to hold a table of records.'
    ]
  },
  {
    n: 13, type: 'ice', route: 'Route 13 - Binary Glacier',
    title: 'Binary Input/Output',
    leader: 'Fee Seeker', epithet: 'Reader of Raw Bytes', badge: 'Seek Badge',
    blurb: 'Binary files, fread/fwrite, and random access.',
    teamTypes: ['ice', 'water'], ace: 131,
    notes: [
      'A text file stores characters and is human-readable; a binary file stores the internal bit pattern and is not. 12345 is 5 bytes of text but 4 bytes as a binary int.',
      'Binary modes add b: "rb", "wb", "ab", and the update modes "r+b", "w+b", "a+b". Update mode allows both reading and writing.',
      'fread(ptr, size, count, fp) and fwrite(ptr, size, count, fp) each return the number of ITEMS actually transferred - compare it with count to detect errors.',
      'fwrite(&student, sizeof(STUDENT), 1, fp) writes a whole structure in one call. This is why binary files are used for records.',
      'Random access needs fixed-length records: the address of record n is n * sizeof(record) (counting from 0).',
      'fseek(fp, offset, origin) moves the file marker. Origins: SEEK_SET (start), SEEK_CUR (current), SEEK_END (end). Offset may be negative.',
      'ftell returns the current byte offset; rewind sets the marker back to the start and clears the error flags.',
      'feof(fp) is only true AFTER a read has already failed at end of file - test the read\'s return value instead of looping on feof.',
      'Binary files are compact and fast but not portable between machines with different sizes or byte order.'
    ]
  },
  {
    n: 14, type: 'bug', route: 'Route 14 - Bitmask Hollow',
    title: 'Bitwise Operators',
    leader: 'Xora Mask', epithet: 'Sculptor of Bits', badge: 'Mask Badge',
    blurb: 'Logical bitwise operators, shifts, and masks.',
    teamTypes: ['bug'], ace: 214,
    notes: [
      'Bitwise operators work bit by bit: & AND (1 only if both are 1), | inclusive OR (1 if either is 1), ^ exclusive OR (1 if the bits DIFFER), ~ one\'s complement (flips every bit).',
      'Do not confuse & with && or | with ||. The single ones combine bits; the double ones combine truth values and short-circuit.',
      'A mask is a constant chosen to isolate the bits you care about. To TEST or CLEAR bits use & , to SET bits use | , to FLIP bits use ^.',
      'Set bit p: n |= (1 << p). Clear bit p: n &= ~(1 << p). Flip bit p: n ^= (1 << p). Test bit p: (n >> p) & 1.',
      'x ^ x is 0 and x ^ 0 is x, which is why XOR undoes itself - apply the same mask twice and you are back where you started.',
      'x << n shifts left and, with no overflow, multiplies by 2 to the n. Vacated bits on the right are filled with 0.',
      'x >> n shifts right and divides by 2 to the n. For UNSIGNED values 0s come in on the left; for signed negative values the fill is implementation-dependent, so use unsigned for bit work.',
      'Bits shifted off the end are lost - shifting is not a rotation. A rotate must be built from two shifts and an OR.',
      'Bitwise operators require integral operands; they are undefined for float and double. Hex is the natural notation: each hex digit is exactly 4 bits.'
    ]
  },
  {
    n: 15, type: 'dragon', route: 'Route 15 - The Endless Chain',
    title: 'Lists',
    leader: 'Linka Head', epithet: 'The Endless Chain', badge: 'Node Badge',
    blurb: 'Linked lists, stacks, queues, and binary trees.',
    teamTypes: ['dragon'], ace: 149,
    notes: [
      'A linked list node holds data plus a pointer to the next node. The head pointer names the list; the last node\'s link is NULL.',
      'Unlike an array, a linked list is not contiguous, has no fixed size, and gives O(1) insert/delete once you hold the right pointer - but no random access.',
      'To insert you need pPre (the predecessor) and pNew. Order matters: point pNew->link at the successor FIRST, then relink the predecessor. Reverse it and you lose the rest of the list.',
      'Inserting at the head is the special case where pPre is NULL - then pNew->link = head and head = pNew.',
      'To delete a node you need its predecessor, so a search typically returns both pPre and pLoc. Always free the deleted node.',
      'A stack is last in, first out (LIFO). push adds at the head, pop removes from the head. Function calls, undo, and expression evaluation all use stacks.',
      'A queue is first in, first out (FIFO). enqueue adds at the rear, dequeue removes from the front, so a queue keeps both a front and a rear pointer.',
      'A binary tree node has a left and a right subtree. A binary SEARCH tree keeps everything smaller on the left and everything larger on the right.',
      'Traversals differ only in when the node is processed: preorder is node-left-right, inorder is left-node-right (which prints a BST in sorted order), postorder is left-right-node.'
    ]
  }
];

/* The gauntlet after all fifteen badges - this is the exam simulator. */
window.ELITE = [
  {
    id: 'e1', name: 'Seg Fault', epithet: 'Elite Four', types: ['ghost', 'poison'],
    chapters: [9, 10], ace: 94,
    intro: 'You dereferenced something you did not own. I am what happens next.'
  },
  {
    id: 'e2', name: 'Ida Overflow', epithet: 'Elite Four', types: ['rock', 'steel'],
    chapters: [8, 11, 12], ace: 248,
    intro: 'Twenty-five elements. You wrote twenty-six. Let me show you where the last one went.'
  },
  {
    id: 'e3', name: 'Fee Seeker II', epithet: 'Elite Four', types: ['water', 'ice'],
    chapters: [7, 13], ace: 131,
    intro: 'Every stream ends somewhere. Yours ends here.'
  },
  {
    id: 'e4', name: 'Uma Bee', epithet: 'Elite Four - Undefined Behavior', types: ['psychic', 'fire'],
    chapters: [3, 5, 6, 14], ace: 380,
    intro: 'There is no right answer to i++ + i++. There is only me.'
  },
  {
    id: 'champ', name: 'ANSI', epithet: 'Champion - The Standard', types: ['dragon', 'steel', 'psychic'],
    chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], ace: 249,
    intro: 'Fifteen chapters. One conformance test. Begin.'
  }
];

/* Starters, chosen for what they teach. Type decides which chapters your first
   Pokemon walks through and which ones will hurt. */
window.STARTERS = [{"id":1,"region":"Kanto"},{"id":4,"region":"Kanto"},{"id":7,"region":"Kanto"},{"id":152,"region":"Johto"},{"id":155,"region":"Johto"},{"id":158,"region":"Johto"},{"id":252,"region":"Hoenn"},{"id":255,"region":"Hoenn"},{"id":258,"region":"Hoenn"},{"id":387,"region":"Sinnoh"},{"id":390,"region":"Sinnoh"},{"id":393,"region":"Sinnoh"},{"id":495,"region":"Unova"},{"id":498,"region":"Unova"},{"id":501,"region":"Unova"},{"id":650,"region":"Kalos"},{"id":653,"region":"Kalos"},{"id":656,"region":"Kalos"},{"id":722,"region":"Alola"},{"id":725,"region":"Alola"},{"id":728,"region":"Alola"},{"id":810,"region":"Galar"},{"id":813,"region":"Galar"},{"id":816,"region":"Galar"},{"id":906,"region":"Paldea"},{"id":909,"region":"Paldea"},{"id":912,"region":"Paldea"},{"id":25,"region":"Partners"},{"id":133,"region":"Partners"}];

window.BADGE_ORDER = window.CHAPTERS.map(c => c.badge);

/* Gym greetings, shown before the player begins a match. */
window.GYM_DIALOGUE = {
  "1": {
    "intro": "First gym? Take a breath. Snorlax took three naps while I set up, so we are in no hurry. Show me what you know, and we will start from there.",
    "rematch": "Back for another round? Good. Snorlax has almost finished warming up."
  },
  "2": {
    "intro": "Welcome in. Mind the seedlings by the door. A little care at the start saves a lot of trouble later. Ready to show me your C basics?",
    "rematch": "Look at you, back already. Let us see what has taken root since last time."
  },
  "3": {
    "intro": "Hear that hum? Raichu gets impatient before a match. I prefer to work things out before the sparks fly. Your move.",
    "rematch": "Raichu recognized your footsteps. I think someone wants a rematch."
  },
  "4": {
    "intro": "Leave your shoes by the mat. We practice one move at a time here: know what goes in, know what comes back. Let us see how you handle a call.",
    "rematch": "You know the routine. Step onto the mat when you are ready."
  },
  "5": {
    "intro": "Alakazam thinks it already knows how this ends. I told it you might surprise us. Take your time with the choices. They matter here.",
    "rematch": "I had a feeling you would come back. Alakazam says it knew. Of course it does."
  },
  "6": {
    "intro": "One more lap! Sorry, that was for my team. They would keep going all afternoon without me. Knowing when to stop is part of the practice. Ready?",
    "rematch": "Another round? Now you are speaking my language."
  },
  "7": {
    "intro": "Come in out of the rain. There is a towel by the door. Around here, we pay attention to what comes in and what goes out. Shall we?",
    "rematch": "Good to see you again. Dry floor today, so neither of us gets that excuse."
  },
  "8": {
    "intro": "Your place is marked on the floor. Mine too. I like knowing exactly where everyone belongs. Stay within the lines, and we will get along.",
    "rematch": "Same places as last time. A new match, though. Do not get too comfortable."
  },
  "9": {
    "intro": "Gengar was right behind you a moment ago. It likes being somewhere other than where you expect. Keep track of what points where, and you will be fine.",
    "rematch": "Gengar has been waiting for you. Probably behind you again."
  },
  "10": {
    "intro": "I have cleared some room for your team. Use what you need, and leave the place tidy when you go. Ready to put those pointers to work?",
    "rematch": "Welcome back. I kept your side of the arena clear."
  },
  "11": {
    "intro": "I was just labeling the lockers. There is always someone who forgets where a name ends. Yours is ready. Shall we begin?",
    "rematch": "Your name is still on the locker. I thought you might be back."
  },
  "12": {
    "intro": "Every member of my team has a job. Getting them to work together took longer than teaching the moves. Let us see how your team fits together.",
    "rematch": "A familiar face. I have changed our formation since your last visit."
  },
  "13": {
    "intro": "The doors are shut, the records are ready, and nobody is touching my filing cabinet. Good. We can have a battle now.",
    "rematch": "I pulled up the record of our last match. Time to add another entry."
  },
  "14": {
    "intro": "Just a moment. One switch... there. I like small changes that make a big difference. Watch closely when the match starts.",
    "rematch": "Back to flip the result? I was hoping you would."
  },
  "15": {
    "intro": "You have come a long way to reach this room. Sit for a moment if you need to. When you are ready, we will see how well you can keep everything connected.",
    "rematch": "There you are. I wondered when our paths would link up again."
  }
};
