/* Course-specific rules that differ from the textbook.

   CHM 11510's Lecture 1 slides (Fundamentals 1, "Rules for Rounding") round a
   dropped digit of exactly 5 to keep the preceding digit EVEN: 1.45 → 1.4 but
   1.75 → 1.8, and a 5 followed only by zeros counts as exactly 5 (1.4500 → 1.4),
   while a 5 followed by any nonzero digit rounds up (1.4564 → 1.5). Silberberg
   rounds every 5 up, so the course rule gets its own drill. */
chemAddQuestions([
["m1-r-001",1,1,1,"Lecture","mcq",
 "Using the rounding rules from the CHM 11510 Lecture 1 slides, what is 1.45 rounded to 2 significant figures?",
 ["1.5","1.4","1.45","1.40","2"],1,
 "The dropped digit is exactly 5. The course rule: when the digit removed is 5, round so the preceding digit is EVEN. The preceding digit is 4 (already even), so it stays: 1.4. The slide gives exactly this example. 1.5 is the textbook's 'always round 5 up' answer.",
 ["Look at the digit you are removing and the digit before it.","The removed digit is exactly 5, so the course's special rule applies.","Keep the preceding digit even: 4 is even, so it stays."]],
["m1-r-002",1,1,1,"Lecture","mcq",
 "Using the CHM 11510 lecture rounding rules, what is 1.75 rounded to 2 significant figures?",
 ["1.7","1.75","1.8","1.70","2.0"],2,
 "The removed digit is exactly 5 and the preceding digit is 7 (odd), so it increases by 1 to become even: 1.8.",
 ["The removed digit is exactly 5.","Is the preceding digit odd or even?","7 is odd, so round up to the even digit 8."]],
["m1-r-003",1,1,2,"Lecture","mcq",
 "Under the CHM 11510 lecture rounding rules, which pair of results is correct when each value is rounded to 2 significant figures? (i) 2.3500 (ii) 2.3502",
 ["(i) 2.4 and (ii) 2.4","(i) 2.3 and (ii) 2.3","(i) 2.4 and (ii) 2.3","(i) 2.3 and (ii) 2.4","(i) 2.35 and (ii) 2.35"],0,
 "(i) The removed part is 500 - a 5 followed only by zeros counts as exactly 5, so round to even: the 3 is odd and becomes 4, giving 2.4. (ii) The removed part 502 is more than half, so it simply rounds up: 2.4. Both are 2.4, for different reasons.",
 ["A 5 followed only by zeros is treated as exactly 5.","A 5 followed by any nonzero digit is more than half - round up normally.","(i) round 3 to the even 4; (ii) 502 > 500 so round up."]],
["m1-r-004",1,1,2,"Lecture","mcq",
 "Using the CHM 11510 lecture rounding rules, round 0.08450 to 2 significant figures.",
 ["0.085","0.084","0.08","0.0845","0.0850"],1,
 "The significant digits start at 8: 8, 4, then the removed part is 50 (a 5 followed by a zero) - exactly 5. The preceding digit 4 is even, so it stays: 0.084. Rounding 5 up gives 0.085, the textbook answer but not the course's.",
 ["Leading zeros are not significant - count from the 8.","Keep 8 and 4; the removed part is '50'.","Exactly 5 with an even preceding digit: leave the 4 alone."]],
["m1-r-005",1,1,2,"Lecture","mcq",
 "Using the CHM 11510 lecture rounding rules, what is 6.6650 rounded to 3 significant figures?",
 ["6.67","6.66","6.665","6.7","6.660"],1,
 "Keep 6, 6, 6; the removed part is 50 - exactly 5. The preceding digit is 6, which is even, so it stays: 6.66.",
 ["Keep three digits: 6.66 | 50.","The removed part is exactly 5.","6 is even, so do not round it up."]],
["m1-r-006",1,1,3,"Trap","mcq",
 "Using the CHM 11510 lecture rules, multiply 2.5 × 3.0 and report the answer with the correct number of significant figures.",
 ["7.5","8","7","7.50","8.0"],0,
 "Both factors have 2 significant figures, so the product keeps 2: 7.5 exactly, and no rounding is needed at all. The trap is to round to 1 sig fig (7 or 8) - neither factor has only 1.",
 ["Count sig figs in each factor.","Both have 2, so the answer has 2.","7.5 already has 2 significant figures."]],
["m1-r-007",1,1,3,"Lecture","mcq",
 "Using the CHM 11510 lecture rounding rules, add 12.115 g + 3.2 g and report the answer correctly.",
 ["15.315 g","15.3 g","15.4 g","15.32 g","15 g"],1,
 "Addition keeps the fewest DECIMAL PLACES: 3.2 has one, so the sum 15.315 is reported to one decimal place. The removed part is 15 - a 1 first, so it is less than half and the 3 stays: 15.3 g.",
 ["Addition and subtraction follow decimal places, not sig figs.","3.2 has one decimal place.","Look at the first removed digit: 1 is less than 5."]]
]);
