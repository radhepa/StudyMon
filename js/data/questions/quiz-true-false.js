/* Quiz-style true/false questions for every C-region gym.
   Statements about classroom layout rules are labelled as course conventions so
   they are not mistaken for restrictions imposed by the C language itself. */
(function () {
  window.QBANK = window.QBANK || {};
  var serial = {};
  function tf(ch, tier, statement, answer, why) {
    var n = serial[ch] = (serial[ch] || 0) + 1;
    var choices = n % 2 ? ['True', 'False'] : ['False', 'True'];
    var q = {
      id: 'c' + ch + '-tf-' + String(n).padStart(3, '0'),
      chapter: ch, t: tier, k: 'mcq', tag: 'True / False',
      q: statement, c: choices,
      a: choices.indexOf(answer ? 'True' : 'False'), why: why
    };
    QBANK[ch] = QBANK[ch] || [];
    if (QBANK[ch].some(function (old) { return old.id === q.id; }))
      throw Error('Duplicate true/false question ID: ' + q.id);
    QBANK[ch].push(q);
  }

  /* Gym 1: Introduction to Computers */
  tf(1,1,'The CPU directly executes machine-language instructions.',true,'Machine language is the binary instruction set understood by the processor. Higher-level source must be translated first.');
  tf(1,1,'Primary memory normally keeps all of its contents after power is removed.',false,'Ordinary primary memory is volatile; auxiliary storage is used for persistent data.');
  tf(1,2,'An algorithm describes a finite sequence of steps for solving a problem.',true,'A usable algorithm has ordered, unambiguous steps and must eventually terminate.');
  tf(1,2,'A logic error always prevents a program from compiling.',false,'A program with a logic error can compile and run while still producing the wrong result.');
  tf(1,3,'Black-box tests can be designed from requirements without examining the implementation.',true,'Black-box testing checks externally visible behavior against the specification.');
  tf(1,3,'A linker is responsible for loading an executable into main memory.',false,'The linker builds the executable; the loader places it into memory for execution.');
  tf(1,4,'Passing a set of tests proves that a nontrivial program has no defects.',false,'Tests show behavior for the cases exercised, but they generally cannot prove the absence of every defect.');
  tf(1,4,'A structure chart focuses on relationships among program modules or functions.',true,'A structure chart shows functional decomposition, while a flowchart describes algorithmic control flow.');
  /* Gym 2: Introduction to the C Language — supplied Quiz 2 concepts. */
  tf(2,1,'A char can represent every member of the basic execution character set.',true,'The char types are integral types, and plain char can represent every member of C\'s basic execution character set.');
  tf(2,1,'The character data type is an integral type and does not store a fractional part.',true,'char belongs to C\'s integer types; character codes are stored as integer values.');
  tf(2,1,'In ASCII, the lowercase letters form one contiguous group, and the uppercase letters form another.',true,'ASCII assigns consecutive codes to A through Z and another consecutive range to a through z.');
  tf(2,1,'The first 32 ASCII codes are control characters rather than letters, digits, or punctuation.',true,'ASCII values 0 through 31 are control codes such as newline, tab, and carriage return.');
  tf(2,1,'Variables are named memory locations that have a type.',true,'A variable names an object, and its declared type determines how its stored value is interpreted and used.');
  tf(2,1,'Under this course\'s coding rules, each variable is declared before it is used.',true,'A declaration must be visible before an identifier is used; the course also has students define local variables before using them.');
  tf(2,2,'Defining one variable per line can make declarations easier to find and maintain.',true,'This is a readability convention: separate declarations make names, types, and initializers easier to inspect.');
  tf(2,2,'Automatic local variables in C are initialized automatically when they are defined without an initializer.',false,'An automatic local object without an initializer has an indeterminate value; reading it can produce undefined behavior.');
  tf(2,1,'The backslash is used to begin escape sequences in C character and string literals.',true,'Sequences such as \\n, \\t, and \\\\ begin with a backslash.');
  tf(2,1,'A character constant such as A is enclosed in double quotes.',false,'A character constant uses single quotes, as in \'A\'; double quotes form a string literal, as in "A".');
  tf(2,2,'A literal constant is an unnamed value written directly in source code.',true,'Examples include 42, 3.5, \'x\', and "hello".');
  tf(2,2,'A #define directive for a symbolic constant is normally placed near the beginning of a source file.',true,'Placing definitions with the other preprocessing directives makes them visible and easy to locate before later use.');
  tf(2,2,'Literal constants in C have no data type.',false,'A literal has a type determined by its spelling and suffixes; for example, 10 is normally int and 10.0 is double.');
  /* Gym 3: Structure of a C Program — supplied Quiz 2 concepts. */
  tf(3,1,'A C source file commonly begins with a section for preprocessor directives.',true,'Directives such as #include and #define are conventionally placed before declarations and function definitions.');
  tf(3,1,'Preprocessing prepares C source for the later translation stages.',true,'The preprocessor handles directives, macro replacement, and included headers before compilation continues.');
  tf(3,1,'The declaration section of a function contains executable instructions for the computer.',false,'Declarations introduce names and types; executable statements perform the function\'s actions.');
  tf(3,1,'A complete hosted C program has exactly one function named main.',true,'For the hosted programs used in this course, main is the single designated program entry point.');
  tf(3,1,'The main function is the starting point for execution of a hosted C program.',true,'After the runtime environment initializes the program, it calls main.');
  tf(3,1,'The gcc configuration used in this course warns when main is not declared to return int.',true,'The standard hosted forms of main return int, and the course compiler flags incompatible forms.');
  tf(3,1,'With the normal Vocareum gcc command used in this course, a C source filename ends in .c.',true,'The .c suffix identifies the input as C source under the course build command.');
  tf(3,2,'Under this course\'s required function layout, local declarations and executable statements are kept in separate sections.',true,'Modern C permits declarations among statements, but the course style separates them for consistent structure and readability.');
  tf(3,2,'The local declarations and executable statements inside main are part of the function body.',true,'The braces of main enclose its body, including block declarations and statements.');
  tf(3,2,'Under this course\'s rules, student programs do not define global variables.',true,'This is a course design constraint that encourages data to be local or passed explicitly between functions.');
  tf(3,2,'The headers stdio.h and math.h declare standard-library facilities for input/output and mathematics.',true,'Headers provide the declarations and macros needed to use corresponding standard-library facilities.');
  tf(3,2,'Under the course program template, return (0); is the final statement in main.',true,'Returning zero from main reports successful termination to the host environment.');
  tf(3,2,'Returning 0 from main terminates that invocation of main and reports success to the host environment.',true,'Reaching return transfers control from main back to the program\'s host environment.');
  tf(3,2,'Comments are intended to improve source-code documentation for human readers.',true,'Comments explain intent, assumptions, and decisions; they are removed during translation and are not executed.');
  /* Gym 4: Functions */
  tf(4,1,'A function prototype tells the compiler a function\'s return type and parameter types.',true,'The prototype describes the calling interface before a call is checked.');
  tf(4,1,'C passes ordinary function arguments by value.',true,'Each parameter receives a value; passing a pointer value allows indirect access to the pointed-to object.');
  tf(4,2,'A function declared with return type void can return an expression value to its caller.',false,'A void function can use return; with no expression, but it does not return a value.');
  tf(4,2,'An automatic local variable normally exists for the entire execution of the program.',false,'Its lifetime begins when execution enters its block and ends when that block exits.');
  tf(4,3,'A static local variable retains its stored value between calls to its function.',true,'A block-scope static object has program-long storage duration even though its name has local scope.');
  tf(4,3,'Passing a pointer to an object can let a function modify that caller-owned object.',true,'The pointer itself is passed by value, but dereferencing it accesses the same pointed-to object.');
  tf(4,4,'A function definition also serves as a declaration of that function.',true,'The definition provides the declaration plus the function body.');
  tf(4,4,'Every function in a C program must call at least one other function.',false,'A function may compute and return a result without calling any other function.');

  /* Gym 5: Selection — Making Decisions */
  tf(5,1,'In a C condition, zero is false and any nonzero scalar value is true.',true,'Selection and loop conditions interpret zero as false and nonzero values as true.');
  tf(5,1,'The expression x = 5 compares x with 5.',false,'A single equals sign assigns; x == 5 performs an equality comparison.');
  tf(5,2,'The right operand of && is skipped when the left operand is false.',true,'The logical AND operator short-circuits because the final result is already known.');
  tf(5,2,'An else is associated with the nearest unmatched if.',true,'Braces make the intended association explicit and avoid dangling-else confusion.');
  tf(5,3,'A switch controlling expression may have type double.',false,'The controlling expression must have integer or enumerated type.');
  tf(5,3,'A break can prevent execution from falling through into the next switch case.',true,'Without a transfer such as break or return, execution continues into following case labels.');
  tf(5,4,'Each case label in a switch requires an integer constant expression.',true,'A runtime variable cannot be used as a case-label value.');
  tf(5,4,'The logical OR operator || has higher precedence than logical AND &&.',false,'Logical AND binds more tightly than logical OR; parentheses are still useful for clarity.');
  /* Gym 6: Repetition */
  tf(6,1,'A while loop can execute its body zero times.',true,'The condition is tested before the first iteration.');
  tf(6,1,'A do-while loop always executes its body at least once.',true,'Its condition is tested after the loop body.');
  tf(6,2,'All three control expressions in a for statement are required.',false,'The initialization, condition, and iteration expressions may each be omitted; an omitted condition acts as true.');
  tf(6,2,'A break statement exits the innermost loop or switch that contains it.',true,'It does not automatically exit all enclosing loops.');
  tf(6,3,'In a for loop, continue transfers control to the iteration expression before the next condition test.',true,'This differs from a while loop, where continue transfers directly to the condition test.');
  tf(6,3,'A semicolon immediately after a loop header can form an empty loop body.',true,'The null statement is a valid body, though an accidental semicolon is a common bug.');
  tf(6,4,'A loop invariant is a claim intended to remain true at a selected point of every iteration.',true,'Invariants help reason about initialization, preservation by the loop body, and the result at termination.');
  tf(6,4,'If a loop condition never becomes false, the loop can only end by reaching its closing brace.',false,'A break, return, process termination, or other control transfer can still end execution of the loop.');

  /* Gym 7: Text Input/Output */
  tf(7,1,'printf uses a format string to describe how later arguments are displayed.',true,'Conversion specifications such as %d and %f must match the corresponding argument types.');
  tf(7,1,'scanf normally needs the address of an int variable when reading it with %d.',true,'scanf stores through a pointer, so an int conversion normally receives an int *.');
  tf(7,2,'getchar should be stored in an int when end-of-file must be distinguished from every character value.',true,'The int return type can represent every unsigned-char value plus the negative EOF sentinel.');
  tf(7,2,'fgets always removes the newline character that it reads.',false,'If a newline fits in the buffer, fgets stores it before the terminating null character.');
  tf(7,3,'puts appends a newline after the string it writes.',true,'Unlike fputs, puts writes the string followed by a newline.');
  tf(7,3,'A failed scanf conversion always consumes the offending input character.',false,'A matching failure can leave the same character unread, so a retry loop must handle or discard it.');
  tf(7,4,'Using fflush(stdin) to discard input is defined by the ISO C standard.',false,'ISO C defines fflush for output streams and update streams in an output state, not as a portable input-discard operation.');
  tf(7,4,'A %c scanf conversion reads leading whitespace unless the format requests whitespace skipping.',true,'%c does not skip whitespace by itself; a leading space in the format can consume preceding whitespace.');
  /* Gym 8: Arrays */
  tf(8,1,'The valid indexes of an array with n elements are 0 through n - 1.',true,'C arrays use zero-based indexing.');
  tf(8,1,'Array elements are stored contiguously in increasing subscript order.',true,'This layout makes pointer arithmetic and indexed access correspond element by element.');
  tf(8,2,'One array object can be assigned to another with the = operator.',false,'C does not define assignment for whole arrays; copy elements or use an appropriate library operation.');
  tf(8,2,'In int a[4] = {7};, the last three elements are initialized to zero.',true,'Missing elements of an aggregate initializer are zero-initialized.');
  tf(8,3,'Inside the block where int a[10] is declared, sizeof a gives the total size of the array.',true,'Before array-to-pointer conversion, sizeof sees the array type and counts all ten elements.');
  tf(8,3,'An array parameter automatically tells a function how many elements the caller supplied.',false,'An array parameter is adjusted to a pointer type, so the length must be conveyed separately or by convention.');
  tf(8,4,'C stores ordinary multidimensional arrays in row-major order.',true,'All elements of the first row are contiguous before the elements of the next row.');
  tf(8,4,'Accessing a[10] is valid for an array declared as int a[10].',false,'The last element is a[9]; forming a one-past pointer is permitted, but dereferencing it is not.');

  /* Gym 9: Pointers */
  tf(9,1,'The unary & operator can produce the address of an object.',true,'The result points to the named object when that object is a valid operand of address-of.');
  tf(9,1,'Dereferencing a null pointer produces a valid zero value.',false,'A null pointer points to no object; dereferencing it has undefined behavior.');
  tf(9,2,'Adding 1 to an int pointer advances it by one int element.',true,'Pointer arithmetic is scaled by the size of the pointed-to type.');
  tf(9,2,'An uninitialized automatic pointer is automatically set to NULL.',false,'Like other uninitialized automatic objects, it has an indeterminate value.');
  tf(9,3,'A pointer one past the end of an array may be formed and compared but not dereferenced.',true,'The one-past value is useful as an endpoint, but it does not designate an array element.');
  tf(9,3,'malloc initializes every byte of the allocated block to zero.',false,'malloc returns uninitialized storage; calloc performs zero-initialization of the allocated bytes.');
  tf(9,4,'Calling free twice on the same allocation has undefined behavior.',true,'After the first free, another free through the unchanged pointer would be invalid.');
  tf(9,4,'If realloc fails for a positive requested size, the original allocated object remains allocated.',true,'Store the result in a temporary pointer so the original pointer is not lost on a NULL result.');
  /* Gym 10: Strings */
  tf(10,1,'A C string ends with a null character.',true,'String-handling functions use the first \\0 character to find the end.');
  tf(10,1,'strlen includes the terminating null character in its result.',false,'strlen counts the characters before the terminator.');
  tf(10,2,'The declaration char s[] = "cat" creates an array of four char elements.',true,'The array contains c, a, t, and the terminating null character.');
  tf(10,2,'The == operator compares the text contained in two C strings.',false,'With char pointers, == compares pointer values; strcmp performs lexicographic content comparison.');
  tf(10,3,'Attempting to modify a string literal has undefined behavior.',true,'A literal may reside in non-writable storage; use a writable char array when modification is required.');
  tf(10,3,'strcpy checks that the destination array is large enough.',false,'The caller must provide sufficient space for all characters and the terminating null character.');
  tf(10,4,'strncpy always writes a terminating null character when its count is positive.',false,'If the source length is at least the count, strncpy does not append a terminator.');
  tf(10,4,'Two empty C strings compare equal with strcmp.',true,'Both begin with the terminating null character, so neither differs from the other.');

  /* Gym 11: Enumerated, Structure, and Union Types */
  tf(11,1,'Each ordinary member of a structure has its own storage within the structure object.',true,'Members occupy distinct portions of the object, though padding may appear between them.');
  tf(11,1,'All members of a union can hold independent values at the same time.',false,'Union members overlap the same storage; storing one member generally replaces the prior member representation.');
  tf(11,2,'Enumeration constants have type int in C.',true,'The named constants introduced by an enum declaration are integer constants of type int.');
  tf(11,2,'Structure objects of the same compatible type can be assigned with =.',true,'Structure assignment copies the value of every member, including nested aggregate values.');
  tf(11,3,'C provides == as a whole-structure equality operator.',false,'Compare relevant members individually; structure operands are not valid for ==.');
  tf(11,3,'A compiler may insert padding between structure members.',true,'Padding can satisfy alignment requirements, so the structure size need not equal the sum of member sizes.');
  tf(11,4,'A typedef creates a new object each time the typedef name is used.',false,'typedef introduces a type alias; an object is created only by a declaration that defines one.');
  tf(11,4,'The address-of operator cannot be applied to a bit-field member.',true,'A bit-field is not a separately addressable object, so it cannot be the operand of unary &.');
  /* Gym 12: Binary Input/Output */
  tf(12,1,'Opening a file with mode "rb" requests binary input.',true,'The r selects reading and b selects binary mode.');
  tf(12,1,'fread returns the number of complete items successfully read.',true,'Its return value is an item count, which can be smaller than requested at end-of-file or on error.');
  tf(12,2,'feof predicts whether the next input operation will reach end-of-file.',false,'The end-of-file indicator is set only after an input operation attempts to read past the available data.');
  tf(12,2,'fclose should be called when a successfully opened stream is no longer needed.',true,'Closing releases stream resources and flushes pending output.');
  tf(12,3,'Binary files written by dumping a struct are guaranteed portable across all C implementations.',false,'Padding, byte order, type sizes, and representations may differ between implementations.');
  tf(12,3,'rewind clears a stream\'s error and end-of-file indicators while returning to the start.',true,'rewind positions the stream at the beginning and clears both indicators.');
  tf(12,4,'A successful fseek can be used to reposition a seekable binary stream.',true,'The offset and origin specify the new file position subject to the stream and platform rules.');
  tf(12,4,'fwrite reports success by returning a byte count regardless of the requested item size.',false,'Like fread, fwrite returns the number of complete items written, not a raw byte count.');

  /* Gym 13: Bitwise Operators */
  tf(13,1,'Bitwise & and logical && are different operators.',true,'& combines corresponding integer bits; && computes a short-circuit logical result.');
  tf(13,1,'For each bit position, exclusive OR produces 1 when its two input bits differ.',true,'The ^ operator sets exactly the positions where one operand bit is 1 and the other is 0.');
  tf(13,2,'The bitwise complement operator ~ flips every bit of its promoted integer operand.',true,'Integer promotions occur first, then each zero bit becomes one and each one bit becomes zero.');
  tf(13,2,'Bitwise operators accept floating-point operands.',false,'Their operands must have integer types.');
  tf(13,3,'For an unsigned value, shifting left by one within range multiplies the value by two.',true,'Unsigned left shift is defined modulo the width when the shift count is valid.');
  tf(13,3,'The result of right-shifting a negative signed integer is fully portable across all C implementations.',false,'The result is implementation-defined, so portable code should not assume arithmetic or logical right shift.');
  tf(13,4,'The expression flags & ~mask can clear every bit selected by mask.',true,'~mask has zeros at the selected positions, and bitwise AND clears those positions in flags.');
  tf(13,4,'Using logical ! on an integer toggles each of its individual bits.',false,'Logical ! produces 0 or 1 from the truth value; bitwise ~ complements individual bits.');
  /* Gym 14: Lists */
  tf(14,1,'An empty singly linked list can be represented by a null head pointer.',true,'With no first node, the head has no object to point to.');
  tf(14,1,'A singly linked node normally stores data and a link to another node.',true,'The link connects the node to its successor.');
  tf(14,2,'A traversal loop must advance its current pointer to avoid repeatedly visiting the same node.',true,'Assigning current = current->next makes progress toward the null endpoint.');
  tf(14,2,'Inserting at the head of a singly linked list requires traversing to the tail first.',false,'A head insertion can link the new node to the old head and then update head in constant time.');
  tf(14,3,'Before freeing a node being removed, the list links needed to bypass it must be preserved or updated.',true,'After free, accessing the removed node to recover its next link would be invalid.');
  tf(14,3,'Overwriting the only pointer to an allocated list can make its nodes unreachable and leak memory.',true,'Without another saved link, the program can no longer traverse the nodes to free them.');
  tf(14,4,'A stack removes elements in first-in, first-out order.',false,'A stack is last-in, first-out; a queue is first-in, first-out.');
  tf(14,4,'A queue normally removes the element that has been waiting the longest.',true,'FIFO order removes from the front and inserts at the rear.');

  /* Gym 15: Recursion */
  tf(15,1,'A recursive function needs a reachable case that returns without another recursive call.',true,'That base case stops the chain of calls.');
  tf(15,1,'Every recursive call should move the problem toward a base case.',true,'Without progress toward termination, recursion can continue until resources are exhausted.');
  tf(15,2,'Active recursive calls normally have separate instances of automatic local variables.',true,'Each active function invocation has its own automatic objects.');
  tf(15,2,'A static local variable gets a separate instance for every recursive call.',false,'A static local has one program-long instance shared by all invocations.');
  tf(15,3,'Statements after a recursive call execute while the nested calls unwind.',true,'A suspended caller resumes after the callee returns.');
  tf(15,3,'The C standard guarantees tail-call optimization for tail-recursive functions.',false,'An implementation may optimize a tail call, but portable C code cannot require it.');
  tf(15,4,'A branching recursive algorithm can make more total calls than its maximum call depth.',true,'Depth counts simultaneous active calls, while total calls include every branch visited over time.');
  tf(15,4,'A recursive solution is always faster than an iterative solution to the same problem.',false,'Performance depends on the algorithm and implementation; recursion also has call overhead and stack usage.');
})();
