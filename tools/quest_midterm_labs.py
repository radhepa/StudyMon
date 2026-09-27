"""Midterm review labs c-lab-31 to c-lab-49.

Nineteen smaller labs aimed at a first C midterm: fundamentals and I/O,
operators and expressions, control-flow logic, functions, pointers and
rand/srand. They use the same two grading modes as labs 1-30 and the same
pipeline (reference -> tools/build-expected-outputs.cjs -> review -> apply).

Three harness tricks are used, all in the driver, never in the learner's file:
  * lab 42 defines is_registered/is_cleared BEFORE including quest.c, so the
    learner calls the game's own checks and the driver can print which ones ran;
  * lab 44 turns if/switch/while/for/do/goto into undeclared identifiers while
    quest.c is compiled (selection by calculation);
  * lab 49 swaps rand()/srand() for scripted, counted versions, the same way
    the tracked labs swap malloc().
"""

MIDTERM_SET = 'midterm-review'

# ---------------------------------------------------------------------------
# Player-facing metadata. The builder turns each entry into a base record the
# first time it runs; contracts, starters, harnesses and tests come from
# register() below.
# ---------------------------------------------------------------------------
EASY_REWARD = {'money': 600, 'berries': [{'id': 'oran', 'count': 3}], 'pokemon': None}
MEDIUM_REWARD = {'money': 1400, 'berries': [{'id': 'sitrus', 'count': 2}], 'pokemon': None}
HARD_REWARD = {'money': 3000, 'berries': [{'id': 'sitrus', 'count': 4}], 'pokemon': None}

META = {
  31: dict(title='The Build Line', topics=['intro to computers', 'compilation pipeline', 'memory'], giver='Theo',
    difficulty='easy', minutes=(15, 25), chapters=[1, 2], primary=1, prereq=[],
    story='Theo is bringing the repair shop\'s old terminal back to life and wants its start-up screen to say how a program gets built and how much memory it has.',
    steps=['Read K and W and reject bad values first', 'Print the five build steps in order', 'Work out bytes, bits, the last address and the word count'],
    objectives=['Order the steps that turn C source into a running program: editor, preprocessor, translator, linker, loader.', 'Relate kilobytes, bytes, bits, byte addresses and words.', 'Validate input before printing anything.'],
    hints=['The compiler is really two programs: the preprocessor runs first, then the translator makes an object module. The linker adds library code; the loader puts the executable in memory.',
           'One kilobyte is 1024 bytes and one byte is 8 bits. With B bytes the addresses run from 0 to B - 1.',
           'Check every input rule before printing the first Step line, because an invalid run prints only ERROR.']),
  32: dict(title='Exactly As Printed', topics=['printf', 'scanf', 'format specifiers', 'input buffer'], giver='Coral',
    difficulty='easy', minutes=(15, 25), chapters=[2, 7], primary=2, prereq=[1],
    story='Coral\'s swim-club board prints results in tidy columns, and Ink has volunteered to check every character of it.',
    steps=['Read an int, a double and a char with one scanf', 'Print the int three ways, the double two ways', 'Print the char, its code and a percent sign'],
    objectives=['Use field width, left alignment, zero padding and precision in printf.', 'Read a double with %lf and a non-space char with " %c".', 'Print a literal percent sign with %%.'],
    hints=['scanf needs %lf for a double; printf prints a double with %f.',
           '%c reads the very next character, even a newline left in the buffer. A space before it (" %c") skips whitespace first.',
           'Width is a minimum, not a maximum: a number wider than the field is printed in full. Test with the long-number fixture.']),
  33: dict(title='One More Thing in the Bag', topics=['data types', 'sizeof', 'overflow', 'representation'], giver='Ida Overflow',
    difficulty='medium', minutes=(30, 45), chapters=[2, 3], primary=2, prereq=[1],
    story='Ida Overflow always packs one more thing than the bag can hold. Before the next trip, measure exactly what each type can carry.',
    steps=['Print sizes with sizeof and limits from limits.h', 'Test for int overflow before adding', 'Show int versus double division, unsigned wraparound and float rounding'],
    objectives=['Report type sizes with sizeof and %zu.', 'Detect signed overflow without causing it.', 'Contrast int and double division, unsigned wraparound and float precision.'],
    hints=['With a and b both non-negative, a + b overflows exactly when a > INT_MAX - b. Test that before adding.',
           'An unsigned char holds 0-255; adding past 255 wraps to 0, and that wrap is well defined. Signed overflow is not.',
           'A float keeps 24 bits of precision, so 16777217 comes back as 16777216. Store n in a float variable, then cast it back to int.']),
  34: dict(title='Locker Label Cipher', topics=['char', 'ASCII', 'ctype.h', 'character arithmetic'], giver='Nula Terminel',
    difficulty='easy', minutes=(20, 29), chapters=[2, 7], primary=2, prereq=[1],
    story='Nula Terminel labels every locker at Terminator Glade in a gentle letter-shift code. Write the encoder and a tally of what each label contains.',
    steps=['Read k, then skip the rest of that line', 'Read the text one character at a time with getchar', 'Shift letters, count categories and add up digit values'],
    objectives=['Treat characters as small integers with ASCII codes.', 'Use isupper, islower and isdigit from ctype.h.', 'Clear the rest of a line after scanf before reading characters.'],
    hints=['scanf("%d") leaves the newline in the buffer. Read and discard characters until you reach it before the text starts.',
           'For a lowercase c, (c - \'a\' + k) % 26 is its position after shifting; add \'a\' back to get a character.',
           'c - \'0\' turns a digit character into its value, so \'7\' - \'0\' is 7.']),
  35: dict(title='The Watering Calendar', topics=['modulus', 'integer division', 'divisibility'], giver='Mira',
    difficulty='easy', minutes=(15, 25), chapters=[3], primary=3, prereq=[2],
    story='Mira waters every third day and feeds the beds every fifth. She wants one program that turns a day number and a stretch of minutes into a plan.',
    steps=['Convert the day number to week and weekday', 'Use % to test divisibility', 'Split minutes into days, hours and minutes'],
    objectives=['Use / and % together to split a count into units.', 'Test divisibility with %.', 'Print two-digit fields with %02d.'],
    hints=['Count from zero first: (d - 1) / 7 and (d - 1) % 7 give a zero-based week and weekday. Add 1 to each.',
           'A number is divisible by 3 exactly when n % 3 == 0.',
           'A day has 1440 minutes. m % 1440 is what is left after whole days; divide that by 60 for hours.']),
  36: dict(title='Skating Backwards', topics=['modulus', 'negative operands', 'division semantics'], giver='Fee Seeker II',
    difficulty='hard', minutes=(60, 90), chapters=[3, 4], primary=3, prereq=[2],
    story='Fee Seeker II skates laps backwards around the harbour rink, and the lap board keeps landing on slots that do not exist. Fix the arithmetic for negative numbers.',
    steps=['Write is_odd so it works for negative n', 'Turn C\'s remainder into a slot from 0 to size - 1', 'Adjust C\'s truncated quotient and remainder into floored ones'],
    objectives=['Know that C\'s / truncates toward zero and % takes the sign of the left operand.', 'Map any int, including negatives, into a ring of slots.', 'Derive floored division from truncated division.'],
    hints=['In C, -7 / 2 is -3 and -7 % 2 is -1. That is why n % 2 == 1 is false for -3.',
           'For a positive size, position % size is between -(size - 1) and size - 1. When it is negative, adding size once fixes it. A loop that keeps adding size also works, but from INT_MIN it can run two billion times.',
           'Floored and truncated results differ only when the remainder is not 0 and a and b have different signs. Then the quotient is one lower and the remainder moves by b.']),
  37: dict(title='Now Serving', topics=['prefix increment', 'postfix increment', 'decrement'], giver='Kip',
    difficulty='easy', minutes=(15, 25), chapters=[3], primary=3, prereq=[2],
    story='Kip\'s café hands out numbered order tickets. Some orders take the current ticket, some skip ahead, and a few get handed back.',
    steps=['Read the starting number and validate it', 'Loop over the commands with scanf(" %c")', 'Use t++ for take, ++t for skip and t-- for returns'],
    objectives=['Use the value of t++ and ++t inside a printf call.', 'See that postfix yields the old value and prefix the new one.', 'Guard a decrement with a condition.'],
    hints=['printf("%d", t++) prints the old value and then t grows. printf("%d", ++t) grows t first.',
           'scanf(" %c", &c) skips spaces and newlines before reading each command, and returns EOF at the end of input.',
           'R at zero is an error: check t > 0 before t--.']),
  38: dict(title='Stepping Stones', topics=['prefix and postfix', 'side effects', 'pointers'], giver='Tilda',
    difficulty='hard', minutes=(60, 90), chapters=[3, 9], primary=3, prereq=[2, 9],
    story='Tilda crosses the brook one stone at a time, in order, no skipping. Uma Bee crosses it however she likes. Write the rules down so they cannot argue.',
    steps=['Decide for each function whether the value is used before or after it changes', 'Put parentheses where * would otherwise bind to the wrong thing', 'Check the index and counter the driver prints after every call'],
    objectives=['Use postfix and prefix ++ and -- on a pointed-to value.', 'Read (*p)++, ++*p and *p++ correctly.', 'Combine two side effects on different objects in one expression.'],
    hints=['*index++ means *(index++): it moves the pointer, not the number it points at. Write (*index)++ or ++*index.',
           'stones[(*index)++] reads at the old index; stones[++*index] reads at the new one.',
           'Modifying the same variable twice in one expression is undefined behavior (Clang refuses i++ + i++). tally touches *a once and *b once, so 2 * (*a)++ + --*b is fine.']),
  39: dict(title='Order of Operations', topics=['operator precedence', 'associativity', 'integer division'], giver='Gus',
    difficulty='easy', minutes=(15, 29), chapters=[3], primary=3, prereq=[2],
    story='Gus is converting his grandmother\'s tea recipes and insists that precedence is character. Help him get every grouping right.',
    steps=['Compute the mean with a real divisor', 'Keep the int formula in the stated order', 'Check how * / and % group left to right'],
    objectives=['Place parentheses where the default precedence is not what you mean.', 'Know that * / and % share one precedence level and group left to right.', 'Avoid integer division when a real result is wanted.'],
    hints=['a + b + c / 3.0 divides only c. The whole sum needs parentheses.',
           '5 / 9 * (f - 32) is always 0 in int arithmetic, because 5 / 9 is 0. Multiply first, then divide.',
           'a % 7 * 2 is (a % 7) * 2, while a * 2 % 7 is (a * 2) % 7. They are different numbers.']),
  40: dict(title='The League Damage Formula', topics=['operator precedence', 'integer arithmetic', 'casts', 'conditional operator'], giver='ANSI',
    difficulty='hard', minutes=(60, 90), chapters=[3, 5], primary=3, prereq=[2],
    story='ANSI has written the league\'s official damage formula in plain words. Translate it into C without changing what a single step means.',
    steps=['Translate base with every grouping in the right place', 'Apply STAB, type, roll, critical and minimum in order', 'Print share as a real number and next with the conditional operator'],
    objectives=['Translate a worded formula into C with correct grouping.', 'Keep integer truncation at the exact step where it belongs.', 'Use a cast and the conditional operator without precedence surprises.'],
    hints=['(2 * L / 5 + 2) needs its parentheses before it is multiplied by P. Everything after that runs left to right.',
           'damage * (217 + r % 39) / 255 keeps the sum in parentheses; dividing that sum by 255 first would give 0.',
           'The ?: operator binds more loosely than +, so base > damage ? base : damage + 1 adds one on only one side. Parenthesize the whole choice.']),
  41: dict(title='Trail Permits', topics=['logical operators', 'truthiness', 'De Morgan'], giver='Roan',
    difficulty='medium', minutes=(30, 45), chapters=[5], primary=5, prereq=[3],
    story='Roan checks permits at the foot of the ridge. The rules are written in plain words; the gate needs them in C.',
    steps=['Read the four values and validate b and v', 'Translate each rule with &&, || and !', 'Print the raw 0 and 1 values C produces'],
    objectives=['Translate English conditions with &&, || and !.', 'Apply De Morgan\'s laws to rewrite a negated condition.', 'Remember that any non-zero int is true, but true operators give exactly 1.'],
    hints=['"Exactly one of A, B" is (A) != (B) only when both sides are 0 or 1. p can be 5, so compare !!p or (p != 0).',
           'not (A or B) is the same as (not A) and (not B).',
           'Clang rejects a && b || c without parentheses. Parenthesize the && part.']),
  42: dict(title='The Haunted Hallway', topics=['short-circuit evaluation', 'logical operators', 'guards'], giver='Seg Fault',
    difficulty='hard', minutes=(60, 90), chapters=[5], primary=5, prereq=[3, 4],
    story='Seg Fault guards a hallway where every door check costs something. Only ask a question when its answer can still change the outcome.',
    steps=['Put the cheap test on the left of && or ||', 'Let the operator skip the check you do not need', 'Never divide by a count that could be 0'],
    objectives=['Use && and || short-circuiting to control which calls happen.', 'Guard a division with a left-hand test.', 'Return exact 0 or 1 truth values.'],
    hints=['A && B never evaluates B when A is false; A || B never evaluates B when A is true. Storing a call in a variable first defeats this.',
           'count > 0 && total / count >= 50 is safe; count != 0 is not enough, because negative counts must give 0.',
           'Logical operators return 0 or 1, but ! and | are not the same: !p | q can return 5. Use ||.']),
  43: dict(title='True, False and C', topics=['truth values', 'relational operators', 'nonzero is true'], giver='Sasha',
    difficulty='easy', minutes=(15, 25), chapters=[5], primary=5, prereq=[3],
    story='Sasha will argue either side of anything, so the debate club wants a program that settles what C itself thinks is true.',
    steps=['Read x, y and z', 'Print each expression\'s value with %d', 'Compare the mathematical chain with what C really does'],
    objectives=['Know that relational and logical operators produce the int 1 or 0.', 'Treat any non-zero value as true.', 'Explain why x < y < z does not mean what it does in maths.'],
    hints=['!!x turns any non-zero value into 1 and keeps 0 as 0.',
           'x < y < z is (x < y) < z: the first comparison becomes 0 or 1, and that is compared with z.',
           'For "in order" you need two comparisons joined with &&.']),
  44: dict(title='No Branches Allowed', topics=['selection by calculation', 'relational values', 'array indexing'], giver='Marn',
    difficulty='medium', minutes=(30, 60), chapters=[3, 5], primary=5, prereq=[3, 4],
    story='Marn always knows which branch you will take. Leave her nothing to predict: make every choice with arithmetic.',
    steps=['Replace each decision with a sum or product of comparisons', 'Use a comparison as an array index for the string and month choices', 'Check negative numbers and the extreme ints'],
    objectives=['Use the 0 or 1 value of a comparison in arithmetic.', 'Select a value from a table with a computed index.', 'Write branch-free code that is still correct for every input.'],
    hints=['(score >= 60) + (score >= 70) + (score >= 80) + (score >= 90) counts how many thresholds were passed.',
           'a * (a >= b) + b * (a < b) picks one of two values without a branch; exactly one comparison is 1.',
           'n % 2 is -1 for negative odd n, so it is not a safe index. n % 2 != 0 is 0 or 1 for every int.']),
  45: dict(title='One Call, One Return', topics=['functions', 'prototypes', 'return types', 'pass by value'], giver='Kes',
    difficulty='easy', minutes=(15, 29), chapters=[4], primary=4, prereq=[2, 3],
    story='Kes trains on one principle: one call, one return, nothing wasted in between. Write five small functions that live up to it.',
    steps=['Keep each prototype exactly as given', 'Return the right type from each function', 'Reuse square inside fourth_power'],
    objectives=['Implement functions from prototypes with the right return types.', 'Return a double from int parameters without integer division.', 'Round a double to the nearest int and call one function from another.'],
    hints=['100 * part / whole is int division. Make one operand a double first: 100.0 * part / whole.',
           'Casting to int truncates toward zero. Add 0.5 for positive x and subtract 0.5 for negative x before casting.',
           'A void function returns nothing; it just prints. fourth_power(x) can be square(square(x)).']),
  46: dict(title='The Archive Calendar', topics=['functions', 'function composition', 'validation'], giver='Vell',
    difficulty='hard', minutes=(60, 90), chapters=[4, 5], primary=4, prereq=[3],
    story='Vell dates every record in the archive by its day of the year. Build the calendar functions the index depends on, one on top of another.',
    steps=['Write is_leap and days_in_month', 'Validate dates with days_in_month', 'Build day_of_year and days_left_in_year from the others'],
    objectives=['Decompose a problem into small functions that call each other.', 'Handle leap-year rules for 1900, 2000 and 2024 correctly.', 'Return a sentinel value for invalid input.'],
    hints=['1900 is not a leap year and 2000 is. Check divisibility by 400 as well as by 4 and 100.',
           'is_valid_date should call days_in_month instead of repeating the month table.',
           'day_of_year is the day plus the lengths of all earlier months in the same year; days_left_in_year is 365 or 366 minus that.']),
  47: dict(title='Down, Grab, Up', topics=['pointers', 'pass by reference', 'address-of', 'dereference'], giver='Perl',
    difficulty='medium', minutes=(30, 60), chapters=[9], primary=9, prereq=[4],
    story='Perl dives to the exact spot on the seabed, grabs what is there and comes back up. Pointers work the same way. Practise the dive.',
    steps=['Write swap_ints with a temporary variable', 'Build sort_three from swap_ints', 'Return results through output pointers and return a pointer itself'],
    objectives=['Change a caller\'s variables through pointers.', 'Write several results through output parameters.', 'Return a pointer to one of the caller\'s own variables.'],
    hints=['Swapping with a temporary works even when a and b point at the same int. The XOR trick does not.',
           'Three compare-and-swap steps sort three values: a with b, b with c, then a with b again.',
           'pick_larger must return a or b itself; the driver adds 100 through the returned pointer and checks which variable changed.']),
  48: dict(title='The Dereferencer\'s Range', topics=['pointer arithmetic', 'arrays and pointers', 'half-open ranges'], giver='Astrid Starr',
    difficulty='hard', minutes=(60, 90), chapters=[9], primary=9, prereq=[4, 8],
    story='Astrid Starr of Indirection Tower hands out a gauntlet of array ranges given only as two pointers. Walk them without ever stepping off the edge.',
    steps=['Loop with a pointer from begin while it is less than end', 'Return pointers, not indexes', 'Handle empty and one-element ranges'],
    objectives=['Walk an array with pointer arithmetic over a half-open range.', 'Subtract pointers to count elements.', 'Reverse and search in place through pointers.'],
    hints=['end - begin is a count of elements, not bytes. p + 1 moves to the next int, 4 bytes on in this sandbox.',
           'For an empty range begin == end: find_first and max_element must return end without reading anything.',
           'Reverse with two pointers moving toward each other; stop when fewer than two elements remain between them.']),
  49: dict(title='Reproducible Luck', topics=['rand', 'srand', 'scaling random numbers'], giver='Dr. Ohm',
    difficulty='medium', minutes=(30, 45), chapters=[4], primary=4, prereq=[3],
    story='Dr. Ohm insists that every result is reproducible, even a roll of the dice. Seed once, scale correctly, and prove it with a scripted generator.',
    steps=['Call srand once, only in start_session', 'Scale rand() with % and an offset', 'Call rand() exactly once per roll or trial'],
    objectives=['Seed the generator once with srand.', 'Scale rand() into a range with rand() % n + low.', 'Understand that the same seed gives the same sequence.'],
    hints=['Seeding again inside a roll restarts the sequence. The driver counts srand calls, so it notices.',
           'rand() % (high - low + 1) is 0 to high - low; adding low shifts it into range.',
           'count_hits must call rand() on every trial, even when chance is 0 or 100.']),
}

ORDER = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 43, 41, 42, 44, 45, 46, 47, 48, 49]
for i, n in enumerate(ORDER):
  META[n]['order'] = 31 + i
for n, m in META.items():
  m['rewards'] = dict(EASY_REWARD if m['difficulty'] == 'easy' else MEDIUM_REWARD if m['difficulty'] == 'medium' else HARD_REWARD)


def base_record(n):
  """A new quest record in the same shape as labs 1-30."""
  m = META[n]
  return {
    'id': 'c-lab-%02d' % n, 'subject': 'c', 'title': m['title'], 'topics': m['topics'], 'published': True,
    'prompt': '', 'starterCode': '', 'tests': [], 'rewards': m['rewards'], 'difficulty': m['difficulty'],
    'estimatedMinutes': {'min': m['minutes'][0], 'max': m['minutes'][1]}, 'chapters': m['chapters'],
    'contentStatus': 'autograded', 'rewardStatus': 'ready', 'recommendedOrder': m['order'], 'schemaVersion': 4,
    'collection': MIDTERM_SET,
    'curriculum': {
      'subject': 'c', 'edition': 4, 'isbn': '9780357506134', 'primaryChapter': m['primary'],
      'prerequisiteChapters': m['prereq'],
      'basis': 'Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.',
      'localReferences': ['js/data/curriculum.js', 'js/data/curriculum-notes.js', 'output/curriculum/Curriculum-review.md']
    },
    'implementationContract': '', 'learningObjectives': m['objectives'],
    'language': {'standard': 'C11', 'extensions': False, 'buildFlags': ['-std=c11', '-Wall', '-Wextra', '-Wpedantic']},
    'validation': {'mode': 'autograder', 'publicationReady': True},
    'rewardPolicy': {'status': 'ready', 'eligibleTypes': ['money', 'berries', 'rarePokemon'], 'grantOn': 'autograded-completion',
                     'oncePerQuest': True, 'requiresImplementedInventory': True},
    'giver': m['giver'], 'story': m['story'], 'steps': m['steps'], 'hints': list(m['hints']),
    'inputPolicy': '', 'grading': {}
  }


def register(main, lib, custom, INC):
  """Add labs 31-49 to the builder's table."""

  # 31 - Intro to Computers --------------------------------------------------
  main(31, 'Input: memory size K in kilobytes (1-4096) and word size W in bytes (1, 2, 4 or 8). First print the five steps that turn a C source file into a running program, one per line as Step N: name, using the names linker, editor, loader, translator and preprocessor, in the order the work actually happens. Then print Memory: K KB = B bytes = b bits, Addresses: 0 to A, and Words: N, where 1 KB is 1024 bytes, 1 byte is 8 bits, every byte has its own address counting from 0, and N is B divided by W. Missing or invalid input prints only ERROR. Every line ends with a newline.',
    r'''int main(void){int k,w;if(scanf("%d%d",&k,&w)!=2||k<1||k>4096||(w!=1&&w!=2&&w!=4&&w!=8)){puts("ERROR");return 0;}const char *step[5]={"editor","preprocessor","translator","linker","loader"};for(int i=0;i<5;i++)printf("Step %d: %s\n",i+1,step[i]);int bytes=k*1024;printf("Memory: %d KB = %d bytes = %d bits\n",k,bytes,bytes*8);printf("Addresses: 0 to %d\n",bytes-1);printf("Words: %d\n",bytes/w);return 0;}''',
    ['64 4', '1 1', '4096 8', '3 2', '0 4', '4097 1', '16 3', '', '8 x'])

  # 32 - printf and scanf ----------------------------------------------------
  main(32, 'Input: an int, a double and one non-space character, separated by spaces or newlines. Print seven lines: the int right-aligned in a field 6 wide, then left-aligned in a field 6 wide, then zero-padded to width 6, each inside square brackets; the double with 2 decimals in brackets, then with 3 decimals right-aligned in a field 10 wide in brackets; the character in brackets followed by code and its ASCII value; and finally the int followed by a percent sign. If the three values cannot all be read, print only ERROR. The expected output for each fixture shows the exact layout.',
    r'''int main(void){int n;double x;char c;if(scanf("%d%lf %c",&n,&x,&c)!=3){puts("ERROR");return 0;}printf("[%6d]\n[%-6d]\n[%06d]\n[%.2f]\n[%10.3f]\n[%c] code %d\n%d%%\n",n,n,n,x,x,c,c,n);return 0;}''',
    ['42 3.14159 A', '42\n3.14159\nA\n', '-7 -0.5 q', '0 0 0', '123456789 1234.5 z', '5 2.675\n\n  #', '12 x A', ''])

  # 33 - Data types ----------------------------------------------------------
  main(33, 'Input: ints a and b (each 0 to 2147483647), a load u (0-255), a step count k (0-1000) and an int n (0 to 100000000). Print six lines. sizes: char 1 short 2 int 4 long long 8 float 4 double 8, with every number produced by sizeof (print a size_t with %zu). limits: INT_MAX X INT_MIN Y, using limits.h. sum: S where S is a + b, or sum: OVERFLOW when that sum does not fit in an int; decide without performing an overflowing signed addition, which is undefined behavior. half: H D where H is a / 2 in int arithmetic and D is a / 2.0 with one decimal. wrap: W, the value of an unsigned char that starts at u after it is increased by 1, k times (unsigned arithmetic wraps from 255 back to 0). float: F, the int you get back after storing n in a float variable. Invalid or missing input prints only ERROR.',
    r'''int main(void){int a,b,u,k,n;if(scanf("%d%d%d%d%d",&a,&b,&u,&k,&n)!=5||a<0||b<0||u<0||u>255||k<0||k>1000||n<0||n>100000000){puts("ERROR");return 0;}printf("sizes: char %zu short %zu int %zu long long %zu float %zu double %zu\n",sizeof(char),sizeof(short),sizeof(int),sizeof(long long),sizeof(float),sizeof(double));printf("limits: INT_MAX %d INT_MIN %d\n",INT_MAX,INT_MIN);if(a>INT_MAX-b)puts("sum: OVERFLOW");else printf("sum: %d\n",a+b);printf("half: %d %.1f\n",a/2,a/2.0);unsigned char load=(unsigned char)u;for(int i=0;i<k;i++)load++;printf("wrap: %d\n",load);float f=(float)n;printf("float: %d\n",(int)f);return 0;}''',
    ['7 5 250 10 16777217', '2147483647 0 0 0 0', '2147483647 1 255 1 100000000', '1073741824 1073741824 128 1000 16777219',
     '1073741823 1073741824 0 256 33554435', '0 0 300 1 5', '5 -1 0 0 0', '1 2 3 4', '9 9 0 0 100000001'])

  # 34 - Chars ---------------------------------------------------------------
  main(34, 'Input: a shift k (0-25) on the first line, then one line of text (at most 200 characters) that ends at a newline or at the end of input. Ignore anything else on the first line after k. Print the text with every letter moved k places forward in the alphabet, keeping its case (z wraps around to a) and every other character unchanged, then a newline. Then print upper U lower L digits D spaces S other O for the original text (spaces counts only the space character; other counts everything that is not a letter, digit or space), and digit sum: T, the sum of the digit characters\' values (the character 7 adds 7). The newline that ends the text is not part of it. An invalid k prints only ERROR.',
    r'''int main(void){int k,c;if(scanf("%d",&k)!=1||k<0||k>25){puts("ERROR");return 0;}while((c=getchar())!='\n'&&c!=EOF){}int up=0,lo=0,dg=0,sp=0,ot=0,sum=0;while((c=getchar())!='\n'&&c!=EOF){if(isupper(c)){up++;putchar('A'+(c-'A'+k)%26);}else if(islower(c)){lo++;putchar('a'+(c-'a'+k)%26);}else{if(isdigit(c)){dg++;sum+=c-'0';}else if(c==' ')sp++;else ot++;putchar(c);}}putchar('\n');printf("upper %d lower %d digits %d spaces %d other %d\n",up,lo,dg,sp,ot);printf("digit sum: %d\n",sum);return 0;}''',
    ['3\nHello, World 42!\n', '25\nabc XYZ\n', '0\nNo change 123\n', '13\nzZ9 \n', '5\n\n', '26\nabc\n', '-1\nabc\n', '1\nTab\there', '7 extra words\nMixed 0 & 9\n'])

  # 35 - Modulus, easy -------------------------------------------------------
  main(35, 'Input: a day number d (1-100000) and a length of time m in minutes (0-1000000). Print four lines: week W day D, where the calendar runs in weeks of 7 days starting at week 1 day 1 (so day 8 is week 2 day 1); water YES when d is a multiple of 3, otherwise water NO; feed YES when d is a multiple of 5, otherwise feed NO; and time X days HH:MM, splitting m into whole days, hours (00-23) and minutes (00-59) with hours and minutes always printed as two digits. Invalid or missing input prints only ERROR.',
    r'''int main(void){int d,m;if(scanf("%d%d",&d,&m)!=2||d<1||d>100000||m<0||m>1000000){puts("ERROR");return 0;}printf("week %d day %d\n",(d-1)/7+1,(d-1)%7+1);printf("water %s\n",d%3==0?"YES":"NO");printf("feed %s\n",d%5==0?"YES":"NO");printf("time %d days %02d:%02d\n",m/1440,m%1440/60,m%60);return 0;}''',
    ['1 0', '7 59', '8 60', '15 1439', '30 1440', '100000 1000000', '0 5', '5 -1', '12'])

  # 36 - Modulus, hard -------------------------------------------------------
  lib(36, 'Implement the four functions in the starter. is_odd returns 1 when n is odd and 0 when it is even, for every int including negatives. wrap_index returns the slot you land on in a ring of size slots (size 1-1000, numbered 0 to size - 1) after moving position steps forward from slot 0; a negative position moves backward, so wrap_index(-1, 5) is 4. The result is always 0 to size - 1 for any int position. floor_div and floor_mod divide a by b rounding the quotient down toward negative infinity (C\'s / rounds toward zero), so floor_mod always has the sign of b or is 0 and floor_div(a, b) * b + floor_mod(a, b) equals a. b is never 0 and the driver never divides INT_MIN by -1. Driver input: a command count, then O n, W position size or D a b. For D the driver also prints C\'s own a / b and a % b so you can compare.',
    '', 'int is_odd(int n);\nint wrap_index(int position, int size);\nint floor_div(int a, int b);\nint floor_mod(int a, int b);',
    r'''int is_odd(int n){return n%2!=0;}
int wrap_index(int position,int size){int r=position%size;return r<0?r+size:r;}
int floor_div(int a,int b){int q=a/b;if(a%b!=0&&((a<0)!=(b<0)))q--;return q;}
int floor_mod(int a,int b){int r=a%b;if(r!=0&&((r<0)!=(b<0)))r+=b;return r;}
''',
    r'''int main(void){int n;if(scanf("%d",&n)!=1)return 1;for(int i=0;i<n;i++){char c;if(scanf(" %c",&c)!=1)return 1;if(c=='O'){int v;if(scanf("%d",&v)!=1)return 1;printf("is_odd(%d) = %d\n",v,is_odd(v));}else if(c=='W'){int p,s;if(scanf("%d%d",&p,&s)!=2)return 1;printf("wrap_index(%d, %d) = %d\n",p,s,wrap_index(p,s));}else if(c=='D'){int a,b;if(scanf("%d%d",&a,&b)!=2)return 1;printf("%d, %d -> C: %d r %d | floor: %d r %d\n",a,b,a/b,a%b,floor_div(a,b),floor_mod(a,b));}else return 1;}return 0;}''',
    ['5 O 7 O -3 O -4 O 0 O -1', '4 O 2147483647 O -2147483648 O 1 O -2147483647', '6 W 0 5 W 7 5 W -1 5 W -6 5 W -5 5 W 12 1',
     '3 W -2147483648 1000 W 2147483647 1000 W -2147483648 1', '8 D 7 2 D -7 2 D 7 -2 D -7 -2 D 6 3 D -6 3 D 0 5 D -1 1000',
     '4 D -2147483648 3 D 2147483647 -1 D -2147483648 1 D 1 -1000', '4 D -15 4 W -15 4 O -15 D 15 -4'])

  # 37 - Prefix and postfix, easy --------------------------------------------
  main(37, 'Input: a starting ticket number t (0-9999), then commands until the end of input, one character each; spaces and newlines between them are ignored. T takes a ticket: print take N with the current number, and the counter moves up one afterwards. S skips ahead: the counter moves up one first, then print skip N with the new number. R returns a ticket: the counter moves down one and nothing is printed, except that R when the counter is 0 prints ERROR and changes nothing. Any other character prints ERROR and changes nothing. After the last command print next: N with the counter\'s value. Use ++ and -- on the counter. An invalid t prints only ERROR.',
    r'''int main(void){int t;char c;if(scanf("%d",&t)!=1||t<0||t>9999){puts("ERROR");return 0;}while(scanf(" %c",&c)==1){if(c=='T')printf("take %d\n",t++);else if(c=='S')printf("skip %d\n",++t);else if(c=='R'){if(t>0)t--;else puts("ERROR");}else puts("ERROR");}printf("next: %d\n",t);return 0;}''',
    ['5\nTTT', '5\nSSS', '10\nT S T R T', '0\nR T', '9999\n', '3\nTx?S', '-1\nT', '7\nRRT\nS\n'])

  # 38 - Prefix and postfix, hard --------------------------------------------
  lib(38, 'Implement the five functions in the starter. read_next returns the stone at *index and then moves *index forward by one. skip_read moves *index forward by one first and then returns the stone at the new *index. use_then_bump returns *counter and then adds one to it. bump_then_use adds one to *counter and returns the new value. tally adds one to *a and subtracts one from *b, and returns twice the value *a had before it grew plus the value *b has after it shrank. Each can be one short expression using ++ or -- on the pointed-to value; watch what the * applies to. Driver input: ten stone values, a starting index (-1 to 9), a counter, a and b (each -1000 to 1000), a command count, then R, K, U, B or L. The driver refuses any read that would leave the ten stones.',
    '', 'int read_next(const int *stones, int *index);\nint skip_read(const int *stones, int *index);\nint use_then_bump(int *counter);\nint bump_then_use(int *counter);\nint tally(int *a, int *b);',
    r'''int read_next(const int *stones,int *index){return stones[(*index)++];}
int skip_read(const int *stones,int *index){return stones[++*index];}
int use_then_bump(int *counter){return (*counter)++;}
int bump_then_use(int *counter){return ++*counter;}
int tally(int *a,int *b){return 2*(*a)++ + --*b;}
''',
    r'''int main(void){int stones[10],index,counter,a,b,n;for(int i=0;i<10;i++)if(scanf("%d",&stones[i])!=1)return 1;if(scanf("%d%d%d%d%d",&index,&counter,&a,&b,&n)!=5)return 1;for(int i=0;i<n;i++){char c;if(scanf(" %c",&c)!=1)return 1;if(c=='R'){if(index<0||index>9){puts("R blocked");continue;}int v=read_next(stones,&index);printf("R %d, index %d\n",v,index);}else if(c=='K'){if(index<-1||index>8){puts("K blocked");continue;}int v=skip_read(stones,&index);printf("K %d, index %d\n",v,index);}else if(c=='U'){int v=use_then_bump(&counter);printf("U %d, counter %d\n",v,counter);}else if(c=='B'){int v=bump_then_use(&counter);printf("B %d, counter %d\n",v,counter);}else if(c=='L'){int v=tally(&a,&b);printf("L %d, a %d, b %d\n",v,a,b);}else return 1;}return 0;}''',
    ['10 20 30 40 50 60 70 80 90 100 0 5 3 9 6 R R K R U B', '10 20 30 40 50 60 70 80 90 100 8 0 0 0 3 K R R',
     '7 -7 14 -14 21 -21 28 -28 35 -35 -1 -1 -2 0 6 K K U B L L', '1 2 3 4 5 6 7 8 9 10 4 100 3 9 8 L L L U U B B R',
     '5 5 5 5 5 5 5 5 5 9 9 0 10 -10 4 K R L B', '0 1 2 3 4 5 6 7 8 9 -1 7 0 1 10 K K K K K K K K K K'])

  # 39 - Precedence, easy ----------------------------------------------------
  main(39, 'Input: ints a, b and c (each -10000 to 10000) and a Fahrenheit temperature f (-1000 to 1000). Print five lines. average: X, the mean of a, b and c with 2 decimals (1 2 2 gives 1.67). celsius: C, computed in int arithmetic as f minus 32, times 5, divided by 9, in that order (C\'s / truncates toward zero). percent: P, a times 100 divided by the total a + b + c in int arithmetic, or percent: none when the total is 0. r1: R, the remainder of a divided by 7, then doubled. r2: R, a doubled, then the remainder of that divided by 7. Get each grouping right with precedence and parentheses. Invalid or missing input prints only ERROR.',
    r'''int main(void){int a,b,c,f;if(scanf("%d%d%d%d",&a,&b,&c,&f)!=4||a<-10000||a>10000||b<-10000||b>10000||c<-10000||c>10000||f<-1000||f>1000){puts("ERROR");return 0;}printf("average: %.2f\n",(a+b+c)/3.0);printf("celsius: %d\n",(f-32)*5/9);int total=a+b+c;if(total==0)puts("percent: none");else printf("percent: %d\n",a*100/total);printf("r1: %d\n",a%7*2);printf("r2: %d\n",a*2%7);return 0;}''',
    ['1 2 2 212', '50 25 25 32', '-1 -1 -2 0', '5 0 -5 -40', '10000 10000 10000 1000', '7 7 7 33', '3 4 5 -1000', '1 2 3 10001', '1 2'])

  # 40 - Precedence, hard ----------------------------------------------------
  main(40, 'Input: level L (1-100), power P (1-250), attack A (1-999), defense D (1-999), type code T (0-5), STAB flag s (0 or 1), roll r (0-255) and the defender\'s HP h (1-9999). Use int arithmetic with C\'s integer division unless a step says otherwise. base: take 2 times L, divide by 5 and add 2; multiply that by P, then by A; divide by D, then by 50; finally add 2. damage starts as base. STAB: if s is 1, multiply damage by 3 and then divide by 2. Type: T 0 makes damage 0, T 1 divides it by 4, T 2 divides it by 2, T 3 leaves it, T 4 doubles it and T 5 multiplies it by 4. Roll: add 217 to the remainder of r divided by 39, multiply damage by that sum and then divide by 255. Critical: the hit is critical when r is a multiple of 16 and T is not 0; a critical hit doubles damage. Minimum: if T is not 0 and damage is below 1, damage becomes 1. Print five lines: base B, damage X, critical YES or critical NO, share S where S is damage times 100 divided by h as a real number with one decimal, and next N where N is one more than the larger of base and damage. Invalid or missing input prints only ERROR.',
    r'''int main(void){int L,P,A,D,T,s,r,h;if(scanf("%d%d%d%d%d%d%d%d",&L,&P,&A,&D,&T,&s,&r,&h)!=8||L<1||L>100||P<1||P>250||A<1||A>999||D<1||D>999||T<0||T>5||s<0||s>1||r<0||r>255||h<1||h>9999){puts("ERROR");return 0;}int base=(2*L/5+2)*P*A/D/50+2;int damage=base;if(s)damage=damage*3/2;static const int num[6]={0,1,1,1,2,4},den[6]={1,4,2,1,1,1};damage=damage*num[T]/den[T];damage=damage*(217+r%39)/255;int critical=r%16==0&&T!=0;if(critical)damage*=2;if(T!=0&&damage<1)damage=1;printf("base %d\ndamage %d\ncritical %s\n",base,damage,critical?"YES":"NO");printf("share %.1f\n",damage*100.0/h);printf("next %d\n",(base>damage?base:damage)+1);return 0;}''',
    ['50 80 120 100 3 1 100 150', '10 40 30 50 4 0 0 20', '100 250 999 1 0 1 16 9999', '1 1 1 999 1 0 5 1', '30 90 70 45 3 1 77 61',
     '75 120 200 150 1 1 48 500', '100 250 999 1 5 1 38 9999', '0 50 50 50 3 0 0 10', '50 50 50 0 3 0 0 10', '50 50 50 50 6 0 0 10',
     '50 50 50 50 3 0 0 0', '1 2 3'])

  # 41 - Logical expressions, medium -----------------------------------------
  main(41, 'Input: badges b (0-16), level v (1-100), a pass value p and a weather value w. p and w can be any int and follow C truthiness: 0 is false and anything else is true (w true means clear weather, w false means a storm). Print five lines. ridge: YES when b is at least 4 and v is at least 20, or when p is true. lake: YES unless v is below 10, or it is stormy and there is no pass. ferry: YES when exactly one of these is true: b is at least 8; p is true. cave: YES when it is not the case that b is below 2 or v is below 15. Print NO wherever a rule is not met, in the form ridge: YES. Last print truth: X Y Z where X is !p, Y is !!w and Z is p && w, exactly as C evaluates them. Invalid b or v, or missing input, prints only ERROR.',
    r'''int main(void){int b,v,p,w;if(scanf("%d%d%d%d",&b,&v,&p,&w)!=4||b<0||b>16||v<1||v>100){puts("ERROR");return 0;}int ridge=(b>=4&&v>=20)||p;int lake=!(v<10||(!w&&!p));int ferry=(b>=8)!=(p!=0);int cave=!(b<2||v<15);printf("ridge: %s\nlake: %s\nferry: %s\ncave: %s\n",ridge?"YES":"NO",lake?"YES":"NO",ferry?"YES":"NO",cave?"YES":"NO");printf("truth: %d %d %d\n",!p,!!w,p&&w);return 0;}''',
    ['4 20 0 1', '3 50 0 1', '0 5 7 0', '8 30 -1 0', '16 100 0 0', '9 9 5 5', '2 15 0 -3', '17 20 0 0', '1 0 0 0', '4 20 1'])

  # 42 - Logical expressions, hard (short-circuit) ---------------------------
  probes = r'''int is_registered(int id); /* supplied by the game */
int is_cleared(int id); /* supplied by the game */'''
  custom(42, 'The game supplies is_registered(id) and is_cleared(id). Every call is recorded, and after each command the driver prints which checks ran. Implement the six functions so that a check is called only when its answer can still change the result, exactly as && and || short-circuit from left to right. can_enter: badges is at least 3 and is_registered(id). needs_escort: level is below 10, or id is not cleared (!is_cleared(id)). fair_share: count is above 0 and total / count is at least 50; never divide when count is 0 or negative. open_gate: is_registered(id), and then either key is true or is_cleared(id). implies: the truth value of if p then q, which is !p || q. not_both: 1 unless both p and q are true. Every function returns exactly 0 or 1. Driver input: a command count, then E badges id, N level id, F total count, G id key, I p q or X p q.',
    INC + probes + '\n\nint can_enter(int badges, int id);\nint needs_escort(int level, int id);\nint fair_share(int total, int count);\nint open_gate(int id, int key);\nint implies(int p, int q);\nint not_both(int p, int q);\n\n/* Implement the functions above. The game supplies main() and both checks. */\n',
    INC + probes + '\n' + r'''int can_enter(int badges,int id){return badges>=3&&is_registered(id);}
int needs_escort(int level,int id){return level<10||!is_cleared(id);}
int fair_share(int total,int count){return count>0&&total/count>=50;}
int open_gate(int id,int key){return is_registered(id)&&(key||is_cleared(id));}
int implies(int p,int q){return !p||q;}
int not_both(int p,int q){return !(p&&q);}
''',
    INC + r'''
static char trace[512];
static size_t used=0;
static void note(const char *check,int id){if(used<sizeof trace-40)used+=(size_t)sprintf(trace+used,"%s%s(%d)",used?" ":"",check,id);}
int is_registered(int id){note("registered",id);return id%2!=0;}
int is_cleared(int id){note("cleared",id);return id%3==0;}
#include "quest.c"
static void report(char c,int x,int y,int result){printf("%c %d %d -> %d | %s\n",c,x,y,result,used?trace:"no checks");used=0;trace[0]='\0';}
int main(void){int n;if(scanf("%d",&n)!=1)return 1;for(int i=0;i<n;i++){char c;int x,y,r;if(scanf(" %c%d%d",&c,&x,&y)!=3)return 1;if(c=='E')r=can_enter(x,y);else if(c=='N')r=needs_escort(x,y);else if(c=='F')r=fair_share(x,y);else if(c=='G')r=open_gate(x,y);else if(c=='I')r=implies(x,y);else if(c=='X')r=not_both(x,y);else return 1;report(c,x,y,r);}return 0;}''',
    ['6 E 3 7 E 2 7 E 3 8 E 5 -1 E 0 0 E 10 9', '5 N 5 3 N 10 3 N 10 4 N 9 4 N 50 6', '6 F 100 2 F 99 2 F 500 0 F -200 -2 F 0 5 F 150 3',
     '6 G 7 1 G 7 0 G 9 0 G 8 1 G 3 5 G -3 0', '8 I 0 0 I 0 5 I 5 0 I -2 7 X 0 0 X 3 0 X 3 -4 X 0 9',
     '5 F 2147483647 1 F -2147483648 1 E 3 2147483647 N 10 -9 G 0 0'])

  # 43 - True-False ----------------------------------------------------------
  main(43, 'Input: three ints x, y and z. Print eight lines, each value exactly as C produces it (every comparison and logical operator gives 1 or 0). x truthy: V, the value of !!x. falsy count: V, how many of x, y and z are 0, computed as !x + !y + !z. in order: V, 1 when x is less than y and y is less than z in the mathematical sense, otherwise 0. C reads x < y < z as: V, the value C really computes for x < y < z (it compares x < y first, then compares that 0 or 1 with z). x == y == z: V, the value of (x == y) == z. any: V, the value of x || y || z. all: V, the value of x && y && z. x > y: V. Missing input prints only ERROR.',
    r'''int main(void){int x,y,z;if(scanf("%d%d%d",&x,&y,&z)!=3){puts("ERROR");return 0;}printf("x truthy: %d\n",!!x);printf("falsy count: %d\n",!x+!y+!z);printf("in order: %d\n",x<y&&y<z);printf("C reads x < y < z as: %d\n",(x<y)<z);printf("x == y == z: %d\n",(x==y)==z);printf("any: %d\n",x||y||z);printf("all: %d\n",x&&y&&z);printf("x > y: %d\n",x>y);return 0;}''',
    ['1 2 3', '3 2 1', '0 0 0', '-5 -5 1', '5 5 5', '-1 0 2', '7 3 0', '1 2'])

  # 44 - Selection by calculation --------------------------------------------
  banned = ['if', 'switch', 'while', 'for', 'do', 'goto']
  ban = '#pragma clang diagnostic ignored "-Wkeyword-macro"\n' + ''.join('#define %s NO_%s_ALLOWED_selection_by_calculation\n' % (k, k) for k in banned)
  unban = ''.join('#undef %s\n' % k for k in banned)
  sel_protos = 'int grade_points(int score);\nint larger(int a, int b);\nint sign_of(int n);\nint shipping_cents(int grams);\nconst char *parity_name(int n);\nint days_in_month(int month, int leap);'
  custom(44, 'In this lab if, switch, while, for, do and goto are switched off: while your file compiles, the driver turns each of those keywords into an error, so make every choice by calculation. A comparison is worth 1 or 0, so you can multiply by it, add it up or use it as an array index. The ?: operator cannot be switched off, but leave it out too; that is the point of the lab. grade_points(score) for 0-100 returns 4 for 90 and up, 3 for 80-89, 2 for 70-79, 1 for 60-69, otherwise 0. larger(a, b) returns the larger of any two ints. sign_of(n) returns -1, 0 or 1. shipping_cents(grams) for 1-100000 returns 300 up to 500 grams, 700 up to 2000 grams, otherwise 1500. parity_name(n) returns the string "even" or "odd" for any int, including negatives. days_in_month(month, leap) for month 1-12 and leap 0 or 1 returns that month\'s days, February having 29 when leap is 1. Driver input: a command count, then G score, L a b, S n, P grams, N n or M month leap.',
    INC + '\n' + sel_protos + '\n\n/* if, switch, while, for, do and goto are switched off in this lab.\n   Implement the functions above by calculation. The game supplies main(). */\n',
    INC + r'''int grade_points(int score){return (score>=60)+(score>=70)+(score>=80)+(score>=90);}
int larger(int a,int b){return a*(a>=b)+b*(a<b);}
int sign_of(int n){return (n>0)-(n<0);}
int shipping_cents(int grams){return 300+400*(grams>500)+800*(grams>2000);}
const char *parity_name(int n){static const char *const names[2]={"even","odd"};return names[n%2!=0];}
int days_in_month(int month,int leap){static const int days[13]={0,31,28,31,30,31,30,31,31,30,31,30,31};return days[month]+(month==2)*leap;}
''',
    INC + '#include <stdbool.h>\n#include <math.h>\n' + ban + '#include "quest.c"\n' + unban + r'''int main(void){int n;if(scanf("%d",&n)!=1)return 1;for(int i=0;i<n;i++){char c;int x,y=0;if(scanf(" %c%d",&c,&x)!=2)return 1;if((c=='L'||c=='M')&&scanf("%d",&y)!=1)return 1;if(c=='G')printf("grade_points(%d) = %d\n",x,grade_points(x));else if(c=='L')printf("larger(%d, %d) = %d\n",x,y,larger(x,y));else if(c=='S')printf("sign_of(%d) = %d\n",x,sign_of(x));else if(c=='P')printf("shipping_cents(%d) = %d\n",x,shipping_cents(x));else if(c=='N')printf("parity_name(%d) = %s\n",x,parity_name(x));else if(c=='M')printf("days_in_month(%d, %d) = %d\n",x,y,days_in_month(x,y));else return 1;}return 0;}''',
    ['10 G 100 G 90 G 89 G 80 G 79 G 70 G 69 G 60 G 59 G 0', '6 L 3 9 L 9 3 L -4 -4 L -2147483648 2147483647 L 2147483647 -2147483648 L 0 -1',
     '5 S 42 S -42 S 0 S 2147483647 S -2147483648', '7 P 1 P 500 P 501 P 2000 P 2001 P 100000 P 1999',
     '6 N 0 N 7 N -3 N -4 N 2147483647 N -2147483648', '8 M 1 0 M 2 0 M 2 1 M 4 1 M 12 0 M 9 0 M 11 1 M 7 0'])

  # 45 - Functions, easy -----------------------------------------------------
  lib(45, 'Implement the five functions in the starter, keeping every prototype. square(n) returns n times n (n is between -46340 and 46340). percent_of(part, whole) returns what percent part is of whole as a double (whole is at least 1), so percent_of(1, 3) is 33.33...; watch out for int division. nearest(x) returns x rounded to the nearest int with halves rounded away from zero (2.5 gives 3, -2.5 gives -3); x is between -1000000000 and 1000000000. repeat_char(c, n) prints c exactly n times (n is 0-60) followed by a newline and returns nothing. fourth_power(x) returns x to the fourth power by calling square twice (x is between -215 and 215). Driver input: a command count, then Q n, P part whole, R x, C char n or F x.',
    '', 'int square(int n);\ndouble percent_of(int part, int whole);\nint nearest(double x);\nvoid repeat_char(char c, int n);\nint fourth_power(int x);',
    r'''int square(int n){return n*n;}
double percent_of(int part,int whole){return 100.0*part/whole;}
int nearest(double x){return x<0?(int)(x-0.5):(int)(x+0.5);}
void repeat_char(char c,int n){for(int i=0;i<n;i++)putchar(c);putchar('\n');}
int fourth_power(int x){return square(square(x));}
''',
    r'''int main(void){int n;if(scanf("%d",&n)!=1)return 1;for(int i=0;i<n;i++){char c;if(scanf(" %c",&c)!=1)return 1;if(c=='Q'){int v;if(scanf("%d",&v)!=1)return 1;int r=square(v);printf("square(%d) = %d\n",v,r);}else if(c=='P'){int a,b;if(scanf("%d%d",&a,&b)!=2)return 1;printf("percent_of(%d, %d) = %.1f\n",a,b,percent_of(a,b));}else if(c=='R'){double x;if(scanf("%lf",&x)!=1)return 1;printf("nearest(%.2f) = %d\n",x,nearest(x));}else if(c=='C'){char ch;int k;if(scanf(" %c%d",&ch,&k)!=2)return 1;printf("repeat_char('%c', %d): ",ch,k);repeat_char(ch,k);}else if(c=='F'){int v;if(scanf("%d",&v)!=1)return 1;printf("fourth_power(%d) = %d\n",v,fourth_power(v));}else return 1;}return 0;}''',
    ['5 Q 7 Q -7 Q 0 Q 46340 Q 1', '6 P 1 3 P 2 3 P 5 5 P 0 7 P 7 8 P -1 4', '8 R 2.4 R 2.5 R -2.5 R -2.4 R 0 R 999999999.5 R -0.5 R 7',
     '4 C * 5 C # 1 C x 0 C = 12', '4 F 2 F -3 F 0 F 215', '5 R 0.49 R -0.51 P 50 200 F 1 Q -46340'])

  # 46 - Functions, hard -----------------------------------------------------
  lib(46, 'Implement the five calendar functions, building each on the ones before it. is_leap(year) returns 1 for a leap year and 0 otherwise: a year divisible by 4 and not by 100, or divisible by 400. days_in_month(month, year) returns 28-31 for months 1-12, or 0 for any other month. is_valid_date(day, month, year) returns 1 when year is 1-9999, month is 1-12 and day is 1 through that month\'s length, otherwise 0. day_of_year(day, month, year) returns the date\'s position in its year (1 January is 1) or -1 for an invalid date. days_left_in_year(day, month, year) returns how many days of the year come after the date (31 December gives 0) or -1 for an invalid date. Driver input: a command count, then L year, M month year, V day month year, Y day month year or R day month year.',
    '', 'int is_leap(int year);\nint days_in_month(int month, int year);\nint is_valid_date(int day, int month, int year);\nint day_of_year(int day, int month, int year);\nint days_left_in_year(int day, int month, int year);',
    r'''int is_leap(int year){return (year%4==0&&year%100!=0)||year%400==0;}
int days_in_month(int month,int year){static const int d[13]={0,31,28,31,30,31,30,31,31,30,31,30,31};if(month<1||month>12)return 0;return d[month]+(month==2&&is_leap(year));}
int is_valid_date(int day,int month,int year){return year>=1&&year<=9999&&month>=1&&month<=12&&day>=1&&day<=days_in_month(month,year);}
int day_of_year(int day,int month,int year){if(!is_valid_date(day,month,year))return -1;int total=day;for(int m=1;m<month;m++)total+=days_in_month(m,year);return total;}
int days_left_in_year(int day,int month,int year){int n=day_of_year(day,month,year);if(n<0)return -1;return (is_leap(year)?366:365)-n;}
''',
    r'''int main(void){int n;if(scanf("%d",&n)!=1)return 1;for(int i=0;i<n;i++){char c;if(scanf(" %c",&c)!=1)return 1;if(c=='L'){int y;if(scanf("%d",&y)!=1)return 1;printf("is_leap(%d) = %d\n",y,is_leap(y));}else if(c=='M'){int m,y;if(scanf("%d%d",&m,&y)!=2)return 1;printf("days_in_month(%d, %d) = %d\n",m,y,days_in_month(m,y));}else{int d,m,y;if(scanf("%d%d%d",&d,&m,&y)!=3)return 1;if(c=='V')printf("is_valid_date(%d, %d, %d) = %d\n",d,m,y,is_valid_date(d,m,y));else if(c=='Y')printf("day_of_year(%d, %d, %d) = %d\n",d,m,y,day_of_year(d,m,y));else if(c=='R')printf("days_left_in_year(%d, %d, %d) = %d\n",d,m,y,days_left_in_year(d,m,y));else return 1;}}return 0;}''',
    ['8 L 2000 L 1900 L 2024 L 2023 L 2100 L 2400 L 4 L 1', '8 M 2 2024 M 2 2023 M 2 1900 M 2 2000 M 4 2023 M 12 1 M 0 2023 M 13 2023',
     '9 V 29 2 2023 V 29 2 2024 V 31 4 2023 V 30 4 2023 V 0 1 2023 V 1 1 0 V 31 12 9999 V 1 1 10000 V 32 1 2023',
     '8 Y 1 1 2023 Y 31 12 2023 Y 31 12 2024 Y 1 3 2024 Y 1 3 2023 Y 29 2 2023 Y 15 6 2000 Y 29 2 1900',
     '6 R 31 12 2023 R 1 1 2024 R 1 1 2023 R 29 2 2024 R 30 2 2024 R 1 13 2023', '5 V -1 5 2023 Y 31 1 2023 R 28 2 1900 M -3 2023 L 400'])

  # 47 - Pointers, medium ----------------------------------------------------
  lib(47, 'Implement the four functions in the starter. swap_ints exchanges the values that a and b point to; it must also work when a and b point to the same int (the value stays the same). sort_three rearranges the three values so that *a <= *b <= *c. split_seconds splits total (0-359999) into hours, minutes (0-59) and seconds (0-59) and writes them through the three pointers. pick_larger returns whichever of the two pointers points to the larger value, or a on a tie; return the pointer you were given, because the driver writes through it. Driver input: a command count, then S x y, I x (swap x with itself), T x y z, H total or P x y.',
    '', 'void swap_ints(int *a, int *b);\nvoid sort_three(int *a, int *b, int *c);\nvoid split_seconds(int total, int *hours, int *minutes, int *seconds);\nint *pick_larger(int *a, int *b);',
    r'''void swap_ints(int *a,int *b){int t=*a;*a=*b;*b=t;}
void sort_three(int *a,int *b,int *c){if(*a>*b)swap_ints(a,b);if(*b>*c)swap_ints(b,c);if(*a>*b)swap_ints(a,b);}
void split_seconds(int total,int *hours,int *minutes,int *seconds){*hours=total/3600;*minutes=total%3600/60;*seconds=total%60;}
int *pick_larger(int *a,int *b){return *b>*a?b:a;}
''',
    r'''int main(void){int n;if(scanf("%d",&n)!=1)return 1;for(int i=0;i<n;i++){char c;if(scanf(" %c",&c)!=1)return 1;if(c=='S'){int x,y;if(scanf("%d%d",&x,&y)!=2)return 1;swap_ints(&x,&y);printf("swap -> %d %d\n",x,y);}else if(c=='I'){int x;if(scanf("%d",&x)!=1)return 1;swap_ints(&x,&x);printf("self swap -> %d\n",x);}else if(c=='T'){int x,y,z;if(scanf("%d%d%d",&x,&y,&z)!=3)return 1;sort_three(&x,&y,&z);printf("sorted -> %d %d %d\n",x,y,z);}else if(c=='H'){int t,h=-1,m=-1,s=-1;if(scanf("%d",&t)!=1)return 1;split_seconds(t,&h,&m,&s);printf("%d s -> %d h %d m %d s\n",t,h,m,s);}else if(c=='P'){int x,y;if(scanf("%d%d",&x,&y)!=2)return 1;int *p=pick_larger(&x,&y);const char *which=p==&x?"first":p==&y?"second":"neither";if(p==&x||p==&y)*p+=100;printf("larger is the %s -> %d %d\n",which,x,y);}else return 1;}return 0;}''',
    ['4 S 1 2 S -3 7 S 4 4 S -2147483648 2147483647', '3 I 5 I -9 I 2147483647',
     '8 T 3 1 2 T 1 2 3 T 3 2 1 T 2 2 1 T -5 0 -5 T -2147483648 2147483647 0 T 2 3 1 T 1 3 2',
     '6 H 3661 H 359999 H 0 H 59 H 3600 H 86399', '5 P 5 9 P 9 5 P 7 7 P -1 -2 P -2147483648 2147483547'])

  # 48 - Pointers, hard ------------------------------------------------------
  lib(48, 'Every function works on the half-open range [begin, end): begin points at the first element and end points one past the last, so begin == end is an empty range. Use pointer arithmetic. find_first returns a pointer to the first element equal to value, or end if there is none. count_range returns how many elements the range holds. reverse_range reverses the range in place and leaves everything outside it alone. max_element returns a pointer to the largest element (the first one on a tie), or end for an empty range. sum_stride adds begin[0], begin[step], begin[2 * step] and so on for as long as the element is still inside the range (step is 1-5). The driver prints each returned pointer as an index into its own array, so a pointer into a copy fails. Driver input: n (1-12) and n values, a command count, then F lo hi value, C lo hi, R lo hi, M lo hi or S lo hi step, with 0 <= lo <= hi <= n.',
    '', 'int *find_first(int *begin, int *end, int value);\nint count_range(const int *begin, const int *end);\nvoid reverse_range(int *begin, int *end);\nint *max_element(int *begin, int *end);\nint sum_stride(const int *begin, const int *end, int step);',
    r'''int *find_first(int *begin,int *end,int value){for(int *p=begin;p<end;p++)if(*p==value)return p;return end;}
int count_range(const int *begin,const int *end){return (int)(end-begin);}
void reverse_range(int *begin,int *end){while(end-begin>1){int t=*begin;*begin++=*--end;*end=t;}}
int *max_element(int *begin,int *end){if(begin==end)return end;int *best=begin;for(int *p=begin+1;p<end;p++)if(*p>*best)best=p;return best;}
int sum_stride(const int *begin,const int *end,int step){int total=0;long n=end-begin;for(long i=0;i<n;i+=step)total+=begin[i];return total;}
''',
    r'''int main(void){int a[12],n,k;if(scanf("%d",&n)!=1||n<1||n>12)return 1;for(int i=0;i<n;i++)if(scanf("%d",&a[i])!=1)return 1;if(scanf("%d",&k)!=1)return 1;for(int i=0;i<k;i++){char c;int lo,hi;if(scanf(" %c%d%d",&c,&lo,&hi)!=3||lo<0||hi<lo||hi>n)return 1;if(c=='F'){int v;if(scanf("%d",&v)!=1)return 1;int *p=find_first(a+lo,a+hi,v);printf("find %d in [%d, %d) -> index %d\n",v,lo,hi,(int)(p-a));}else if(c=='C')printf("count [%d, %d) -> %d\n",lo,hi,count_range(a+lo,a+hi));else if(c=='R'){reverse_range(a+lo,a+hi);printf("reverse [%d, %d) ->",lo,hi);for(int j=0;j<n;j++)printf(" %d",a[j]);printf("\n");}else if(c=='M'){int *p=max_element(a+lo,a+hi);printf("max [%d, %d) -> index %d\n",lo,hi,(int)(p-a));}else if(c=='S'){int s;if(scanf("%d",&s)!=1||s<1||s>5)return 1;printf("stride %d over [%d, %d) -> %d\n",s,lo,hi,sum_stride(a+lo,a+hi,s));}else return 1;}return 0;}''',
    ['8 5 3 9 3 7 9 1 4 8 F 0 8 3 F 0 8 9 F 3 8 9 F 0 8 42 F 2 2 9 C 0 8 C 3 3 C 2 6', '8 5 3 9 3 7 9 1 4 6 M 0 8 M 3 8 M 6 8 M 4 4 M 2 3 M 0 2',
     '7 1 2 3 4 5 6 7 5 R 0 7 R 0 6 R 2 5 R 3 3 R 6 7', '10 1 2 3 4 5 6 7 8 9 10 6 S 0 10 1 S 0 10 2 S 1 10 3 S 0 10 5 S 0 0 2 S 9 10 5',
     '5 -4 -2 -9 -3 -1 5 M 0 5 F 1 5 -3 R 1 4 M 0 5 S 0 5 2', '1 42 4 F 0 1 42 M 0 1 R 0 1 C 0 1'])

  # 49 - rand and srand ------------------------------------------------------
  rand_protos = 'void start_session(unsigned int seed);\nint roll_die(int sides);\nint roll_range(int low, int high);\nint coin_flip(void);\nint count_hits(int trials, int chance);'
  custom(49, 'The game swaps the real rand() and srand() for scripted versions: rand() returns the next number from the test\'s script (0 once the script runs out), and every call to rand() and srand() is counted. Implement: start_session(seed) seeds the generator by calling srand(seed) exactly once. roll_die(sides) returns 1 to sides (sides 1-100) as rand() % sides + 1. roll_range(low, high) returns low to high inclusive (-1000 <= low <= high <= 1000) as low + rand() % (high - low + 1). coin_flip() returns rand() % 2, where 1 means heads. count_hits(trials, chance) calls rand() once per trial (0-100 trials, even when chance is 0 or 100) and returns how many trials had rand() % 100 below chance (0-100). Call rand() exactly once per roll and never call srand() outside start_session. Driver input: the script length (0-64) and its values, a command count, then S seed, D sides, R low high, C or H trials chance.',
    INC + '\n' + rand_protos + '\n\n/* Implement the functions above. The game supplies main(). */\n',
    INC + r'''void start_session(unsigned int seed){srand(seed);}
int roll_die(int sides){return rand()%sides+1;}
int roll_range(int low,int high){return low+rand()%(high-low+1);}
int coin_flip(void){return rand()%2;}
int count_hits(int trials,int chance){int hits=0;for(int i=0;i<trials;i++)if(rand()%100<chance)hits++;return hits;}
''',
    INC + r'''
static int script[64];
static int script_len=0,script_pos=0,rand_calls=0,srand_calls=0;
static unsigned last_seed=0;
int quest_rand(void){rand_calls++;return script_pos<script_len?script[script_pos++]:0;}
void quest_srand(unsigned seed){srand_calls++;last_seed=seed;}
#define rand quest_rand
#define srand quest_srand
#include "quest.c"
#undef rand
#undef srand
static void counts(void){printf(" | rand calls %d, srand calls %d\n",rand_calls,srand_calls);rand_calls=srand_calls=0;last_seed=0;}
int main(void){int n;if(scanf("%d",&script_len)!=1||script_len<0||script_len>64)return 1;for(int i=0;i<script_len;i++)if(scanf("%d",&script[i])!=1)return 1;if(scanf("%d",&n)!=1)return 1;for(int i=0;i<n;i++){char c;if(scanf(" %c",&c)!=1)return 1;if(c=='S'){unsigned s;if(scanf("%u",&s)!=1)return 1;start_session(s);printf("start_session(%u) -> seeded with %u",s,last_seed);counts();}else if(c=='D'){int s;if(scanf("%d",&s)!=1)return 1;int r=roll_die(s);printf("roll_die(%d) -> %d",s,r);counts();}else if(c=='R'){int lo,hi;if(scanf("%d%d",&lo,&hi)!=2)return 1;int r=roll_range(lo,hi);printf("roll_range(%d, %d) -> %d",lo,hi,r);counts();}else if(c=='C'){int r=coin_flip();printf("coin_flip() -> %d",r);counts();}else if(c=='H'){int t,ch;if(scanf("%d%d",&t,&ch)!=2)return 1;int r=count_hits(t,ch);printf("count_hits(%d, %d) -> %d",t,ch,r);counts();}else return 1;}return 0;}''',
    ['8 0 5 6 11 2147483647 100 99 12345 7 S 42 D 6 D 6 D 6 D 6 D 6 D 1', '6 0 7 20 2147483647 999 4 5 R 1 6 R 10 20 R -1000 1000 R 5 5 R 0 9',
     '5 0 1 2 3 2147483647 5 C C C C C', '10 0 49 50 99 100 149 150 12345 2147483647 7 2 H 10 50 H 0 50',
     '12 1 2 3 4 5 6 7 8 9 10 11 12 4 S 7 H 4 0 H 4 100 H 4 3', '3 2147483647 2147483646 2147483645 3 R -1000 1000 D 100 C',
     '1 9 3 D 10 D 10 S 5'])
