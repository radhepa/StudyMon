// Thirty C11 labs with exact executable autograder contracts.
window.SIDE_QUESTS = [
  {
    "id": "c-lab-01",
    "subject": "c",
    "title": "Welcome to the Pokemon Center",
    "topics": [
      "input and output"
    ],
    "published": true,
    "prompt": "No input. Declare and initialize the trainer ID (42), party count (3), and fee in cents (125). Print exactly the three labeled lines in the sample, each ending in a newline.",
    "starterCode": "#include <stdio.h>\n\nint main(void)\n{\n    /* Write your implementation here. */\n    return 0;\n}\n",
    "tests": [],
    "rewards": {
      "money": 600,
      "berries": [
        {
          "id": "oran",
          "count": 3
        }
      ],
      "pokemon": null
    },
    "difficulty": "easy",
    "estimatedMinutes": {
      "min": 15,
      "max": 25
    },
    "chapters": [
      1,
      2
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 1,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 2,
      "prerequisiteChapters": [
        1
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "No input. Declare and initialize the trainer ID (42), party count (3), and fee in cents (125). Print exactly the three labeled lines in the sample, each ending in a newline.",
    "learningObjectives": [
      "No input. Declare and initialize the trainer ID (42), party count (3), and fee in cents (125). Print exactly the three labeled lines in the sample, each ending in a newline."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Nurse Ada",
    "story": "The front desk needs a clear check-in slip. Start with a small program the next shift can read.",
    "steps": [
      "Declare three int variables",
      "Print each value with a useful label",
      "Change one value and rebuild"
    ],
    "hints": [
      "A variable stores a value. Use %d to print an int.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "program",
      "harness": "",
      "tests": [
        {
          "id": "c-lab-01-case-1",
          "label": "Case 1",
          "input": "",
          "files": {},
          "stdout": "Trainer ID: 42\nParty count: 3\nFee (cents): 125\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-02",
    "subject": "c",
    "title": "The Poke Mart Receipt",
    "topics": [
      "arithmetic"
    ],
    "published": true,
    "prompt": "Input: two integer quantities, balls then potions, each 0-99. Prices are 200 and 300 cents. Print Total: $D.CC followed by a newline. Invalid quantities print ERROR and a newline. Do not print input prompts.",
    "starterCode": "#include <stdio.h>\n\nint main(void)\n{\n    /* Write your implementation here. */\n    return 0;\n}\n",
    "tests": [],
    "rewards": {
      "money": 600,
      "berries": [
        {
          "id": "oran",
          "count": 3
        }
      ],
      "pokemon": null
    },
    "difficulty": "easy",
    "estimatedMinutes": {
      "min": 20,
      "max": 25
    },
    "chapters": [
      2,
      3
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 2,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 3,
      "prerequisiteChapters": [
        2
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Input: two integer quantities, balls then potions, each 0-99. Prices are 200 and 300 cents. Print Total: $D.CC followed by a newline. Invalid quantities print ERROR and a newline. Do not print input prompts.",
    "learningObjectives": [
      "Input: two integer quantities, balls then potions, each 0-99. Prices are 200 and 300 cents. Print Total: $D.CC followed by a newline. Invalid quantities print ERROR and a newline. Do not print input prompts."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Wren",
    "story": "The register is down. Help Wren total an order without losing cents to rounding.",
    "steps": [
      "Store prices in integer cents",
      "Multiply each price by its quantity",
      "Split the total into dollars and remaining cents"
    ],
    "hints": [
      "For a nonnegative total, / 100 finds dollars and % 100 finds cents. Use a two-digit field for the cents.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "program",
      "harness": "",
      "tests": [
        {
          "id": "c-lab-02-case-1",
          "label": "Case 1",
          "input": "2 3\n",
          "files": {},
          "stdout": "Total: $13.00\n"
        },
        {
          "id": "c-lab-02-case-2",
          "label": "Case 2",
          "input": "0 0\n",
          "files": {},
          "stdout": "Total: $0.00\n"
        },
        {
          "id": "c-lab-02-case-3",
          "label": "Case 3",
          "input": "99 99\n",
          "files": {},
          "stdout": "Total: $495.00\n"
        },
        {
          "id": "c-lab-02-case-4",
          "label": "Case 4",
          "input": "1 0\n",
          "files": {},
          "stdout": "Total: $2.00\n"
        },
        {
          "id": "c-lab-02-case-5",
          "label": "Case 5",
          "input": "0 1\n",
          "files": {},
          "stdout": "Total: $3.00\n"
        },
        {
          "id": "c-lab-02-case-6",
          "label": "Case 6",
          "input": "-1 3\n",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-02-case-7",
          "label": "Case 7",
          "input": "100 0\n",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-02-case-8",
          "label": "Case 8",
          "input": "7 13\n",
          "files": {},
          "stdout": "Total: $53.00\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-03",
    "subject": "c",
    "title": "Choose Your Battle Plan",
    "topics": [
      "selection"
    ],
    "published": true,
    "prompt": "Input: current HP, maximum HP, potion flag (0 or 1). Maximum is 1-999, current is 0 through maximum. Invalid input prints ERROR. Otherwise print RETREAT at zero HP, HEAL at or below 25% with a potion, or ATTACK. Print one newline.",
    "starterCode": "#include <stdio.h>\n\nint main(void)\n{\n    /* Write your implementation here. */\n    return 0;\n}\n",
    "tests": [],
    "rewards": {
      "money": 600,
      "berries": [
        {
          "id": "oran",
          "count": 3
        }
      ],
      "pokemon": null
    },
    "difficulty": "easy",
    "estimatedMinutes": {
      "min": 15,
      "max": 25
    },
    "chapters": [
      2,
      3,
      5
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 5,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 5,
      "prerequisiteChapters": [
        2,
        3
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Input: current HP, maximum HP, potion flag (0 or 1). Maximum is 1-999, current is 0 through maximum. Invalid input prints ERROR. Otherwise print RETREAT at zero HP, HEAL at or below 25% with a potion, or ATTACK. Print one newline.",
    "learningObjectives": [
      "Input: current HP, maximum HP, potion flag (0 or 1). Maximum is 1-999, current is 0 through maximum. Invalid input prints ERROR. Otherwise print RETREAT at zero HP, HEAL at or below 25% with a potion, or ATTACK. Print one newline."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Rowan",
    "story": "Rowan wants a battle plan that a tired trainer can follow.",
    "steps": [
      "Check invalid HP and then fainting first",
      "Test potion availability and the healing threshold",
      "Choose exactly one action"
    ],
    "hints": [
      "Compare current * 4 <= maximum to avoid integer percentage rounding for the given bounds.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "program",
      "harness": "",
      "tests": [
        {
          "id": "c-lab-03-case-1",
          "label": "Case 1",
          "input": "25 100 1",
          "files": {},
          "stdout": "HEAL\n"
        },
        {
          "id": "c-lab-03-case-2",
          "label": "Case 2",
          "input": "26 100 1",
          "files": {},
          "stdout": "ATTACK\n"
        },
        {
          "id": "c-lab-03-case-3",
          "label": "Case 3",
          "input": "25 100 0",
          "files": {},
          "stdout": "ATTACK\n"
        },
        {
          "id": "c-lab-03-case-4",
          "label": "Case 4",
          "input": "0 100 1",
          "files": {},
          "stdout": "RETREAT\n"
        },
        {
          "id": "c-lab-03-case-5",
          "label": "Case 5",
          "input": "1 3 1",
          "files": {},
          "stdout": "ATTACK\n"
        },
        {
          "id": "c-lab-03-case-6",
          "label": "Case 6",
          "input": "1 4 1",
          "files": {},
          "stdout": "HEAL\n"
        },
        {
          "id": "c-lab-03-case-7",
          "label": "Case 7",
          "input": "10 0 1",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-03-case-8",
          "label": "Case 8",
          "input": "101 100 0",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-03-case-9",
          "label": "Case 9",
          "input": "249 999 1",
          "files": {},
          "stdout": "HEAL\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-04",
    "subject": "c",
    "title": "A Week of Training",
    "topics": [
      "loops"
    ],
    "published": true,
    "prompt": "Read exactly seven integers, each 0-10000. Use a loop without an array to print total, average to two decimals, and earliest best day (1-based), on one line separated by single spaces. Invalid value or missing input prints ERROR. End with a newline.",
    "starterCode": "#include <stdio.h>\n\nint main(void)\n{\n    /* Write your implementation here. */\n    return 0;\n}\n",
    "tests": [],
    "rewards": {
      "money": 600,
      "berries": [
        {
          "id": "oran",
          "count": 3
        }
      ],
      "pokemon": null
    },
    "difficulty": "easy",
    "estimatedMinutes": {
      "min": 20,
      "max": 25
    },
    "chapters": [
      2,
      3,
      5,
      6
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 7,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 6,
      "prerequisiteChapters": [
        2,
        3,
        5
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Read exactly seven integers, each 0-10000. Use a loop without an array to print total, average to two decimals, and earliest best day (1-based), on one line separated by single spaces. Invalid value or missing input prints ERROR. End with a newline.",
    "learningObjectives": [
      "Read exactly seven integers, each 0-10000. Use a loop without an array to print total, average to two decimals, and earliest best day (1-based), on one line separated by single spaces. Invalid value or missing input prints ERROR. End with a newline."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "June",
    "story": "June has seven days of training notes. Find the totals before planning the next hike.",
    "steps": [
      "Keep running sum and maximum variables",
      "Read one value per loop iteration",
      "Update the best day only when a larger value appears"
    ],
    "hints": [
      "An earliest tie needs > rather than >=. Divide the sum by 7.0 for an average.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "program",
      "harness": "",
      "tests": [
        {
          "id": "c-lab-04-case-1",
          "label": "Case 1",
          "input": "1 2 3 4 5 6 7",
          "files": {},
          "stdout": "28 4.00 7\n"
        },
        {
          "id": "c-lab-04-case-2",
          "label": "Case 2",
          "input": "0 0 0 0 0 0 0",
          "files": {},
          "stdout": "0 0.00 1\n"
        },
        {
          "id": "c-lab-04-case-3",
          "label": "Case 3",
          "input": "9 1 9 2 3 4 5",
          "files": {},
          "stdout": "33 4.71 1\n"
        },
        {
          "id": "c-lab-04-case-4",
          "label": "Case 4",
          "input": "10000 10000 10000 10000 10000 10000 10000",
          "files": {},
          "stdout": "70000 10000.00 1\n"
        },
        {
          "id": "c-lab-04-case-5",
          "label": "Case 5",
          "input": "1 2 -1 4 5 6 7",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-04-case-6",
          "label": "Case 6",
          "input": "1 2 3",
          "files": {},
          "stdout": "ERROR\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-05",
    "subject": "c",
    "title": "The Move Tutor",
    "topics": [
      "functions"
    ],
    "published": true,
    "prompt": "Implement int heal_hp(int current,int maximum,int amount) and int estimate_damage(int power,int attack,int defense). Valid HP: maximum 1-999, current 0..maximum, amount 0..999. Healing clamps at maximum. Damage arguments are 1-100 and result is power*attack/defense with integer division. Invalid arguments return -1. Driver input H c m a or D p a d; prints the returned integer.",
    "starterCode": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\nint heal_hp(int current,int maximum,int amount);\nint estimate_damage(int power,int attack,int defense);\n/* Implement the functions above. The game supplies main(). */\n",
    "tests": [],
    "rewards": {
      "money": 1400,
      "berries": [
        {
          "id": "revive",
          "count": 1
        }
      ],
      "pokemon": null
    },
    "difficulty": "medium",
    "estimatedMinutes": {
      "min": 35,
      "max": 50
    },
    "chapters": [
      2,
      3,
      4,
      5,
      6
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 9,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 4,
      "prerequisiteChapters": [
        2,
        3,
        5,
        6
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Implement int heal_hp(int current,int maximum,int amount) and int estimate_damage(int power,int attack,int defense). Valid HP: maximum 1-999, current 0..maximum, amount 0..999. Healing clamps at maximum. Damage arguments are 1-100 and result is power*attack/defense with integer division. Invalid arguments return -1. Driver input H c m a or D p a d; prints the returned integer.",
    "learningObjectives": [
      "Implement int heal_hp(int current,int maximum,int amount) and int estimate_damage(int power,int attack,int defense). Valid HP: maximum 1-999, current 0..maximum, amount 0..999. Healing clamps at maximum. Damage arguments are 1-100 and result is power*attack/defense with integer division. Invalid arguments return -1. Driver input H c m a or D p a d; prints the returned integer."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Kern",
    "story": "Kern needs reusable calculations for the training station.",
    "steps": [
      "Write and test the two required functions first",
      "Put input and validation in the menu caller",
      "Call the functions from several menu choices"
    ],
    "hints": [
      "A function returns a result. Updating a local parameter does not update the caller's variable.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "functions",
      "harness": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\n#include \"quest.c\"\nint main(void){char c;int a,b,d;if(scanf(\" %c%d%d%d\",&c,&a,&b,&d)!=4)return 1;printf(\"%d\\n\",c=='H'?heal_hp(a,b,d):estimate_damage(a,b,d));return 0;}",
      "tests": [
        {
          "id": "c-lab-05-case-1",
          "label": "Case 1",
          "input": "H 35 39 10",
          "files": {},
          "stdout": "39\n"
        },
        {
          "id": "c-lab-05-case-2",
          "label": "Case 2",
          "input": "H 20 39 10",
          "files": {},
          "stdout": "30\n"
        },
        {
          "id": "c-lab-05-case-3",
          "label": "Case 3",
          "input": "H 0 1 999",
          "files": {},
          "stdout": "1\n"
        },
        {
          "id": "c-lab-05-case-4",
          "label": "Case 4",
          "input": "H 40 39 0",
          "files": {},
          "stdout": "-1\n"
        },
        {
          "id": "c-lab-05-case-5",
          "label": "Case 5",
          "input": "D 10 20 8",
          "files": {},
          "stdout": "25\n"
        },
        {
          "id": "c-lab-05-case-6",
          "label": "Case 6",
          "input": "D 1 1 100",
          "files": {},
          "stdout": "0\n"
        },
        {
          "id": "c-lab-05-case-7",
          "label": "Case 7",
          "input": "D 10 20 0",
          "files": {},
          "stdout": "-1\n"
        },
        {
          "id": "c-lab-05-case-8",
          "label": "Case 8",
          "input": "D 100 100 1",
          "files": {},
          "stdout": "10000\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-06",
    "subject": "c",
    "title": "Party Roll Call",
    "topics": [
      "arrays"
    ],
    "published": true,
    "prompt": "Input: party size 1-6 followed by that many levels 1-100. Store levels in a six-element array. Print min max average on one line, average with two decimals. Invalid size, level or missing value prints ERROR. End with a newline.",
    "starterCode": "#include <stdio.h>\n\nint main(void)\n{\n    /* Write your implementation here. */\n    return 0;\n}\n",
    "tests": [],
    "rewards": {
      "money": 600,
      "berries": [
        {
          "id": "oran",
          "count": 3
        }
      ],
      "pokemon": null
    },
    "difficulty": "easy",
    "estimatedMinutes": {
      "min": 20,
      "max": 25
    },
    "chapters": [
      2,
      3,
      5,
      6,
      8
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 10,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 8,
      "prerequisiteChapters": [
        2,
        3,
        5,
        6
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Input: party size 1-6 followed by that many levels 1-100. Store levels in a six-element array. Print min max average on one line, average with two decimals. Invalid size, level or missing value prints ERROR. End with a newline.",
    "learningObjectives": [
      "Input: party size 1-6 followed by that many levels 1-100. Store levels in a six-element array. Print min max average on one line, average with two decimals. Invalid size, level or missing value prints ERROR. End with a newline."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Nurse Ada",
    "story": "Check which party members need gentler training.",
    "steps": [
      "Validate count before using the array",
      "Store exactly count levels",
      "Compute summaries over occupied entries"
    ],
    "hints": [
      "Initialize min and max from the first valid level, not from zero.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "program",
      "harness": "",
      "tests": [
        {
          "id": "c-lab-06-case-1",
          "label": "Case 1",
          "input": "3 5 10 15",
          "files": {},
          "stdout": "5 15 10.00\n"
        },
        {
          "id": "c-lab-06-case-2",
          "label": "Case 2",
          "input": "1 5",
          "files": {},
          "stdout": "5 5 5.00\n"
        },
        {
          "id": "c-lab-06-case-3",
          "label": "Case 3",
          "input": "6 100 1 20 30 40 50",
          "files": {},
          "stdout": "1 100 40.17\n"
        },
        {
          "id": "c-lab-06-case-4",
          "label": "Case 4",
          "input": "0",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-06-case-5",
          "label": "Case 5",
          "input": "7 1 2 3 4 5 6 7",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-06-case-6",
          "label": "Case 6",
          "input": "2 0 5",
          "files": {},
          "stdout": "ERROR\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-07",
    "subject": "c",
    "title": "The Nickname Registry",
    "topics": [
      "strings"
    ],
    "published": true,
    "prompt": "Use Registry from the starter. Implement registry_add: name must contain 1-20 ASCII letters/spaces and at least one letter. Return 1 if added, 0 for a case-insensitive duplicate, -1 for invalid input or full capacity (6). Preserve original spelling. Duplicate detection takes priority over full capacity. Driver: count then one nickname per line; prints result and current count after each addition, then all stored names. Registry begins empty.",
    "starterCode": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\ntypedef struct {char names[6][21]; int count;} Registry;\nint registry_add(Registry *r,const char *name);\n/* Implement the functions above. The game supplies main(). */\n",
    "tests": [],
    "rewards": {
      "money": 1400,
      "berries": [
        {
          "id": "sitrus",
          "count": 2
        }
      ],
      "pokemon": null
    },
    "difficulty": "medium",
    "estimatedMinutes": {
      "min": 35,
      "max": 50
    },
    "chapters": [
      5,
      6,
      8,
      9,
      10
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 16,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 10,
      "prerequisiteChapters": [
        5,
        6,
        8,
        9
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Use Registry from the starter. Implement registry_add: name must contain 1-20 ASCII letters/spaces and at least one letter. Return 1 if added, 0 for a case-insensitive duplicate, -1 for invalid input or full capacity (6). Preserve original spelling. Duplicate detection takes priority over full capacity. Driver: count then one nickname per line; prints result and current count after each addition, then all stored names. Registry begins empty.",
    "learningObjectives": [
      "Use Registry from the starter. Implement registry_add: name must contain 1-20 ASCII letters/spaces and at least one letter. Return 1 if added, 0 for a case-insensitive duplicate, -1 for invalid input or full capacity (6). Preserve original spelling. Duplicate detection takes priority over full capacity. Driver: count then one nickname per line; prints result and current count after each addition, then all stored names. Registry begins empty."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Bell",
    "story": "Two parcels have nearly identical nicknames. Keep the register unambiguous.",
    "steps": [
      "Read a bounded full line",
      "Normalize only for duplicate comparisons",
      "Insert only after validation and capacity checks"
    ],
    "hints": [
      "Keep the original spelling for display. If using tolower, convert through unsigned char.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "functions",
      "harness": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\n#include \"quest.c\"\nint main(void){Registry r;memset(&r,0,sizeof r);int n;if(scanf(\"%d\",&n)!=1)return 1;getchar();for(int i=0;i<n;i++){char s[256];if(!fgets(s,sizeof s,stdin))s[0]=0;s[strcspn(s,\"\\r\\n\")]=0;int v=registry_add(&r,s);printf(\"%d %d\\n\",v,r.count);}for(int i=0;i<r.count;i++)puts(r.names[i]);return 0;}",
      "tests": [
        {
          "id": "c-lab-07-case-1",
          "label": "Case 1",
          "input": "3\nPikachu\npikachu\nMr Mime\n",
          "files": {},
          "stdout": "1 1\n0 1\n1 2\nPikachu\nMr Mime\n"
        },
        {
          "id": "c-lab-07-case-2",
          "label": "Case 2",
          "input": "4\n\n123\n   \nEevee\n",
          "files": {},
          "stdout": "-1 0\n-1 0\n-1 0\n1 1\nEevee\n"
        },
        {
          "id": "c-lab-07-case-3",
          "label": "Case 3",
          "input": "8\nA\nB\nC\nD\nE\nF\nG\na\n",
          "files": {},
          "stdout": "1 1\n1 2\n1 3\n1 4\n1 5\n1 6\n-1 6\n0 6\nA\nB\nC\nD\nE\nF\n"
        },
        {
          "id": "c-lab-07-case-4",
          "label": "Case 4",
          "input": "2\nABCDEFGHIJKLMNOPQRST\nABCDEFGHIJKLMNOPQRSTU\n",
          "files": {},
          "stdout": "1 1\n-1 1\nABCDEFGHIJKLMNOPQRST\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-08",
    "subject": "c",
    "title": "Professor Linden's Field Records",
    "topics": [
      "structs"
    ],
    "published": true,
    "prompt": "Implement filter_observations with the supplied Observation type. Copy records matching habitat and level >= minimum into out, preserving order; return the number copied. n is 0-10 and input records are valid. Driver: n habitat(0=forest,1=water,2=cave) minimum, then n lines species level habitat. Output is count, then matching records (one per line).",
    "starterCode": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\ntypedef enum {FOREST,WATER,CAVE} Habitat;\ntypedef struct {char species[21];int level;Habitat habitat;} Observation;\nsize_t filter_observations(const Observation *items,size_t n,Habitat habitat,int minimum,Observation *out);\n/* Implement the functions above. The game supplies main(). */\n",
    "tests": [],
    "rewards": {
      "money": 1400,
      "berries": [
        {
          "id": "sitrus",
          "count": 2
        }
      ],
      "pokemon": null
    },
    "difficulty": "medium",
    "estimatedMinutes": {
      "min": 40,
      "max": 60
    },
    "chapters": [
      4,
      5,
      6,
      8,
      10,
      11
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 19,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 11,
      "prerequisiteChapters": [
        4,
        5,
        6,
        8,
        10
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Implement filter_observations with the supplied Observation type. Copy records matching habitat and level >= minimum into out, preserving order; return the number copied. n is 0-10 and input records are valid. Driver: n habitat(0=forest,1=water,2=cave) minimum, then n lines species level habitat. Output is count, then matching records (one per line).",
    "learningObjectives": [
      "Implement filter_observations with the supplied Observation type. Copy records matching habitat and level >= minimum into out, preserving order; return the number copied. n is 0-10 and input records are valid. Driver: n habitat(0=forest,1=water,2=cave) minimum, then n lines species level habitat. Output is count, then matching records (one per line)."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Professor Linden",
    "story": "Organize a set of field observations so the lab can find them again.",
    "steps": [
      "Define the habitat enum and Observation struct",
      "Add records into a bounded array",
      "Filter by both habitat and minimum level"
    ],
    "hints": [
      "A struct groups related fields. Test a filter that matches nothing.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "functions",
      "harness": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\n#include \"quest.c\"\nint main(void){Observation a[10],out[10];int n,h,m;if(scanf(\"%d%d%d\",&n,&h,&m)!=3||n<0||n>10)return 1;for(int i=0;i<n;i++){int x;if(scanf(\"%20s%d%d\",a[i].species,&a[i].level,&x)!=3)return 1;a[i].habitat=(Habitat)x;}size_t k=filter_observations(a,(size_t)n,(Habitat)h,m,out);if(k>10)return 1;printf(\"%zu\\n\",k);for(size_t i=0;i<k;i++)printf(\"%s %d %d\\n\",out[i].species,out[i].level,out[i].habitat);return 0;}",
      "tests": [
        {
          "id": "c-lab-08-case-1",
          "label": "Case 1",
          "input": "2 0 10\nPikachu 12 0\nZubat 8 2",
          "files": {},
          "stdout": "1\nPikachu 12 0\n"
        },
        {
          "id": "c-lab-08-case-2",
          "label": "Case 2",
          "input": "0 2 1",
          "files": {},
          "stdout": "0\n"
        },
        {
          "id": "c-lab-08-case-3",
          "label": "Case 3",
          "input": "3 1 20\nSquirtle 20 1\nLapras 30 1\nPikachu 50 0",
          "files": {},
          "stdout": "2\nSquirtle 20 1\nLapras 30 1\n"
        },
        {
          "id": "c-lab-08-case-4",
          "label": "Case 4",
          "input": "1 0 100\nPikachu 99 0",
          "files": {},
          "stdout": "0\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-09",
    "subject": "c",
    "title": "Room for One More",
    "topics": [
      "dynamic allocation"
    ],
    "published": true,
    "prompt": "Implement roster_init, roster_append and roster_destroy. init allocates capacity 2 and returns 1, or resets all fields and returns 0 on failure. Append valid levels (1-100), doubling capacity only when full; return 0 without changes on invalid level, allocation failure, or size overflow. Destroy frees memory and zeros all fields. Driver input: command count, then A level, F (fail next allocation), or X (destroy). It prints append result, size, capacity and values after A, then cleanup and outstanding-allocation count. A failed append must preserve earlier values.",
    "starterCode": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\ntypedef struct {int *data;size_t size,capacity;} Roster;\nint roster_init(Roster *r);\nint roster_append(Roster *r,int level);\nvoid roster_destroy(Roster *r);\n/* Implement the functions above. The game supplies main(). */\n",
    "tests": [],
    "rewards": {
      "money": 3000,
      "berries": [
        {
          "id": "circuitToken",
          "count": 2
        }
      ],
      "pokemon": {
        "id": 133,
        "level": 15
      }
    },
    "difficulty": "hard",
    "estimatedMinutes": {
      "min": 75,
      "max": 110
    },
    "chapters": [
      4,
      5,
      6,
      8,
      9
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 15,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 9,
      "prerequisiteChapters": [
        4,
        5,
        6,
        8
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Implement roster_init, roster_append and roster_destroy. init allocates capacity 2 and returns 1, or resets all fields and returns 0 on failure. Append valid levels (1-100), doubling capacity only when full; return 0 without changes on invalid level, allocation failure, or size overflow. Destroy frees memory and zeros all fields. Driver input: command count, then A level, F (fail next allocation), or X (destroy). It prints append result, size, capacity and values after A, then cleanup and outstanding-allocation count. A failed append must preserve earlier values.",
    "learningObjectives": [
      "Implement roster_init, roster_append and roster_destroy. init allocates capacity 2 and returns 1, or resets all fields and returns 0 on failure. Append valid levels (1-100), doubling capacity only when full; return 0 without changes on invalid level, allocation failure, or size overflow. Destroy frees memory and zeros all fields. Driver input: command count, then A level, F (fail next allocation), or X (destroy). It prints append result, size, capacity and values after A, then cleanup and outstanding-allocation count. A failed append must preserve earlier values."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Theo",
    "story": "The starter roster is outgrowing its first allocation. Give it room without losing anyone.",
    "steps": [
      "Track data, size and capacity separately",
      "Grow using a temporary realloc result",
      "Release the buffer on every exit path"
    ],
    "hints": [
      "Check the new capacity and byte count before allocation. Commit the new pointer only on success.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "functions",
      "harness": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\nstatic void *allocations[256];\nstatic int fail_next=0;\nstatic int live_blocks(void){int n=0;for(int i=0;i<256;i++)n+=allocations[i]!=NULL;return n;}\nstatic void remember(void *p){if(!p)return;for(int i=0;i<256;i++)if(!allocations[i]){allocations[i]=p;return;}abort();}\nstatic void forget(void *p){if(!p)return;for(int i=0;i<256;i++)if(allocations[i]==p){allocations[i]=NULL;return;}abort();}\nstatic void *q_malloc(size_t n){if(fail_next){fail_next=0;return NULL;}void *p=malloc(n);remember(p);return p;}\nstatic void *q_calloc(size_t n,size_t s){if(fail_next){fail_next=0;return NULL;}void *p=calloc(n,s);remember(p);return p;}\nstatic void *q_realloc(void *p,size_t n){if(fail_next){fail_next=0;return NULL;}void *old=p;void *next=realloc(p,n);if(next||!n){forget(old);remember(next);}return next;}\nstatic void q_free(void *p){forget(p);free(p);}\n#define malloc q_malloc\n#define calloc q_calloc\n#define realloc q_realloc\n#define free q_free\n\n#include \"quest.c\"\n\n#undef malloc\n#undef calloc\n#undef realloc\n#undef free\nstatic void track_ready(void){(void)q_malloc;(void)q_calloc;(void)q_realloc;(void)q_free;}\nint main(void){track_ready();Roster r={0};printf(\"INIT %d\\n\",roster_init(&r));int n;if(scanf(\"%d\",&n)!=1)return 1;for(int i=0;i<n;i++){char c;int v;if(scanf(\" %c\",&c)!=1)return 1;if(c=='F')fail_next=1;else if(c=='X')roster_destroy(&r);else if(c=='O'){size_t os=r.size,oc=r.capacity;r.size=r.capacity=SIZE_MAX/2+1;printf(\"OVERFLOW %d\\n\",roster_append(&r,5));r.size=os;r.capacity=oc;}else{if(scanf(\"%d\",&v)!=1)return 1;int ok=roster_append(&r,v);printf(\"%d %zu %zu\",ok,r.size,r.capacity);if(r.size>100)return 1;for(size_t j=0;j<r.size;j++)printf(\" %d\",r.data[j]);puts(\"\");}}roster_destroy(&r);printf(\"CLEAN %zu %zu %d\\n\",r.size,r.capacity,r.data==NULL);printf(\"LIVE %d\\n\",live_blocks());return 0;}",
      "tests": [
        {
          "id": "c-lab-09-case-1",
          "label": "Case 1",
          "input": "5 A 5 A 10 A 15 A 20 A 25",
          "files": {},
          "stdout": "INIT 1\n1 1 2 5\n1 2 2 5 10\n1 3 4 5 10 15\n1 4 4 5 10 15 20\n1 5 8 5 10 15 20 25\nCLEAN 0 0 1\nLIVE 0\n"
        },
        {
          "id": "c-lab-09-case-2",
          "label": "Case 2",
          "input": "5 A 5 A 10 F A 15 A 20",
          "files": {},
          "stdout": "INIT 1\n1 1 2 5\n1 2 2 5 10\n0 2 2 5 10\n1 3 4 5 10 20\nCLEAN 0 0 1\nLIVE 0\n"
        },
        {
          "id": "c-lab-09-case-3",
          "label": "Case 3",
          "input": "4 A 0 A 101 X A 7",
          "files": {},
          "stdout": "INIT 1\n0 0 2\n0 0 2\n1 1 2 7\nCLEAN 0 0 1\nLIVE 0\n"
        },
        {
          "id": "c-lab-09-case-4",
          "label": "Case 4",
          "input": "1 O",
          "files": {},
          "stdout": "INIT 1\nOVERFLOW 0\nCLEAN 0 0 1\nLIVE 0\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-10",
    "subject": "c",
    "title": "The PC Backup",
    "topics": [
      "file I/O"
    ],
    "published": true,
    "prompt": "Implement save_roster(path,records,count) and load_roster(path,out,count). Return 1 on success, 0 on failure. Capacity 6. Text file: species,level plus newline per record; species is 1-20 ASCII letters, level 1-100. Empty file is valid. Missing file, malformed/trailing data, overlong lines or >6 records fail without changing out or *count. Save rejects invalid records before opening a file. Driver: S n followed by species level records, or L to load roster.txt. It prints success/count and the resulting roster. A failed load keeps the initial Keep,1 record.",
    "starterCode": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\ntypedef struct {char species[21];int level;} Record;\nint save_roster(const char *path,const Record *items,size_t count);\nint load_roster(const char *path,Record *out,size_t *count);\n/* Implement the functions above. The game supplies main(). */\n",
    "tests": [],
    "rewards": {
      "money": 3000,
      "berries": [
        {
          "id": "sitrus",
          "count": 4
        }
      ],
      "pokemon": null
    },
    "difficulty": "hard",
    "estimatedMinutes": {
      "min": 60,
      "max": 100
    },
    "chapters": [
      4,
      7,
      8,
      10,
      11,
      12
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 22,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 12,
      "prerequisiteChapters": [
        4,
        7,
        8,
        10,
        11
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Implement save_roster(path,records,count) and load_roster(path,out,count). Return 1 on success, 0 on failure. Capacity 6. Text file: species,level plus newline per record; species is 1-20 ASCII letters, level 1-100. Empty file is valid. Missing file, malformed/trailing data, overlong lines or >6 records fail without changing out or *count. Save rejects invalid records before opening a file. Driver: S n followed by species level records, or L to load roster.txt. It prints success/count and the resulting roster. A failed load keeps the initial Keep,1 record.",
    "learningObjectives": [
      "Implement save_roster(path,records,count) and load_roster(path,out,count). Return 1 on success, 0 on failure. Capacity 6. Text file: species,level plus newline per record; species is 1-20 ASCII letters, level 1-100. Empty file is valid. Missing file, malformed/trailing data, overlong lines or >6 records fail without changing out or *count. Save rejects invalid records before opening a file. Driver: S n followed by species level records, or L to load roster.txt. It prints success/count and the resulting roster. A failed load keeps the initial Keep,1 record."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Tam",
    "story": "A power cut should not erase the PC desk roster.",
    "steps": [
      "Document the line format",
      "Write and check file operations",
      "Load into a temporary roster before replacing the current one"
    ],
    "hints": [
      "A successful fopen does not guarantee later writes succeed. Check fclose after writing.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "functions",
      "harness": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\n#include \"quest.c\"\nint main(void){Record a[6]={{\"Keep\",1}};size_t n=1;char cmd;if(scanf(\" %c\",&cmd)!=1)return 1;if(cmd=='S'){size_t k;Record v[6];if(scanf(\"%zu\",&k)!=1||k>6)return 1;for(size_t i=0;i<k;i++)if(scanf(\"%20s%d\",v[i].species,&v[i].level)!=2)return 1;printf(\"SAVE %d\\n\",save_roster(\"roster.txt\",v,k));}int ok=load_roster(\"roster.txt\",a,&n);printf(\"%d %zu\\n\",ok,n);if(n>6)return 1;for(size_t i=0;i<n;i++)printf(\"%s %d\\n\",a[i].species,a[i].level);return 0;}",
      "tests": [
        {
          "id": "c-lab-10-case-1",
          "label": "Case 1",
          "input": "S 2 Pikachu 12 Zubat 8",
          "files": {},
          "stdout": "SAVE 1\n1 2\nPikachu 12\nZubat 8\n"
        },
        {
          "id": "c-lab-10-case-2",
          "label": "Case 2",
          "input": "L",
          "files": {
            "roster.txt": "Pikachu,12\nZubat,8\n"
          },
          "stdout": "1 2\nPikachu 12\nZubat 8\n"
        },
        {
          "id": "c-lab-10-case-3",
          "label": "Case 3",
          "input": "L",
          "files": {},
          "stdout": "0 1\nKeep 1\n"
        },
        {
          "id": "c-lab-10-case-4",
          "label": "Case 4",
          "input": "L",
          "files": {
            "roster.txt": "Pikachu,12x\n"
          },
          "stdout": "0 1\nKeep 1\n"
        },
        {
          "id": "c-lab-10-case-5",
          "label": "Case 5",
          "input": "L",
          "files": {
            "roster.txt": ""
          },
          "stdout": "1 0\n"
        },
        {
          "id": "c-lab-10-case-6",
          "label": "Case 6",
          "input": "L",
          "files": {
            "roster.txt": "A,1\nA,1\nA,1\nA,1\nA,1\nA,1\nA,1\n"
          },
          "stdout": "0 1\nKeep 1\n"
        },
        {
          "id": "c-lab-10-case-7",
          "label": "Case 7",
          "input": "L",
          "files": {
            "roster.txt": "A,0\n"
          },
          "stdout": "0 1\nKeep 1\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-11",
    "subject": "c",
    "title": "Follow the Evolution Tree",
    "topics": [
      "recursion"
    ],
    "published": true,
    "prompt": "Implement void print_paths(const Node *nodes,int root). The input is an acyclic tree of at most 16 nodes, with up to three children per node. Print every root-to-leaf path in child order, joining names with > and ending each path with newline. Use recursion. The driver chooses a supplied tree by input 0 (single Eevee), 1 (three Eevee branches), 2 (four-node chain) or 3 (two nested branches).",
    "starterCode": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\ntypedef struct {const char *name;int children[3];int count;} Node;\nvoid print_paths(const Node *nodes,int root);\n/* Implement the functions above. The game supplies main(). */\n",
    "tests": [],
    "rewards": {
      "money": 3000,
      "berries": [
        {
          "id": "sitrus",
          "count": 4
        }
      ],
      "pokemon": {
        "id": 280,
        "level": 18
      }
    },
    "difficulty": "hard",
    "estimatedMinutes": {
      "min": 60,
      "max": 90
    },
    "chapters": [
      4,
      5,
      6,
      8,
      9,
      15
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 28,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 15,
      "prerequisiteChapters": [
        4,
        5,
        6,
        8,
        9
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Implement void print_paths(const Node *nodes,int root). The input is an acyclic tree of at most 16 nodes, with up to three children per node. Print every root-to-leaf path in child order, joining names with > and ending each path with newline. Use recursion. The driver chooses a supplied tree by input 0 (single Eevee), 1 (three Eevee branches), 2 (four-node chain) or 3 (two nested branches).",
    "learningObjectives": [
      "Implement void print_paths(const Node *nodes,int root). The input is an acyclic tree of at most 16 nodes, with up to three children per node. Print every root-to-leaf path in child order, joining names with > and ending each path with newline. Use recursion. The driver chooses a supplied tree by input 0 (single Eevee), 1 (three Eevee branches), 2 (four-node chain) or 3 (two nested branches)."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Professor Linden",
    "story": "Show every possible path through a small evolution family.",
    "steps": [
      "Traverse the supplied node fixture",
      "Push a name onto the current path",
      "Print at a leaf and return to the parent"
    ],
    "hints": [
      "The recursive call handles a smaller subtree. A node with zero children is a base case.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "functions",
      "harness": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\n#include \"quest.c\"\nint main(void){int m;if(scanf(\"%d\",&m)!=1)return 1;Node t[7]={{\"Eevee\",{1,2,3},3},{\"Vaporeon\",{0},0},{\"Jolteon\",{0},0},{\"Flareon\",{0},0},{\"Bud\",{0},0},{\"Bloom\",{0},0},{\"Tree\",{0},0}};if(m==0)t[0].count=0;if(m==2){t[0].count=1;t[1].count=1;t[1].children[0]=2;t[2].count=1;t[2].children[0]=3;}if(m==3){t[0].name=\"Seed\";t[0].count=2;t[0].children[0]=4;t[0].children[1]=6;t[4].count=1;t[4].children[0]=5;}print_paths(t,0);return 0;}",
      "tests": [
        {
          "id": "c-lab-11-case-1",
          "label": "Case 1",
          "input": "0",
          "files": {},
          "stdout": "Eevee\n"
        },
        {
          "id": "c-lab-11-case-2",
          "label": "Case 2",
          "input": "1",
          "files": {},
          "stdout": "Eevee>Vaporeon\nEevee>Jolteon\nEevee>Flareon\n"
        },
        {
          "id": "c-lab-11-case-3",
          "label": "Case 3",
          "input": "2",
          "files": {},
          "stdout": "Eevee>Vaporeon>Jolteon>Flareon\n"
        },
        {
          "id": "c-lab-11-case-4",
          "label": "Case 4",
          "input": "3",
          "files": {},
          "stdout": "Seed>Bud>Bloom\nSeed>Tree\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-12",
    "subject": "c",
    "title": "Build a Trainer Field Journal",
    "topics": [
      "integration"
    ],
    "published": true,
    "prompt": "Implement the five Journal functions in the starter. Capacity 20; duplicates allowed. Valid species: 1-20 ASCII letters; level 1-100; habitat 0-2. add returns 1/0. find returns count and copies all exact case-sensitive matches in order. Save/load use journal.txt lines species,level,habitat (habitat numeric 0-2). Return 1/0; a failed load preserves the old journal. Driver starts empty: command count then A species level habitat, F species, S, or L. A/S/L print return value. F prints count followed by matching records. All records end with newline.",
    "starterCode": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\ntypedef enum {FOREST,WATER,CAVE} Habitat;\ntypedef struct {char species[21];int level;Habitat habitat;} Observation;\ntypedef struct {Observation items[20];size_t count;} Journal;\nint journal_add(Journal *j,const Observation *r);\nsize_t journal_find(const Journal *j,const char *name,Observation *out);\nint journal_save(const Journal *j,const char *path);\nint journal_load(Journal *j,const char *path);\n/* Implement the functions above. The game supplies main(). */\n",
    "tests": [],
    "rewards": {
      "money": 3000,
      "berries": [
        {
          "id": "sitrus",
          "count": 4
        }
      ],
      "pokemon": {
        "id": 131,
        "level": 25
      }
    },
    "difficulty": "hard",
    "estimatedMinutes": {
      "min": 90,
      "max": 120
    },
    "chapters": [
      4,
      5,
      6,
      7,
      8,
      10,
      11,
      12
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 23,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 12,
      "prerequisiteChapters": [
        4,
        5,
        6,
        7,
        8,
        10,
        11
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Implement the five Journal functions in the starter. Capacity 20; duplicates allowed. Valid species: 1-20 ASCII letters; level 1-100; habitat 0-2. add returns 1/0. find returns count and copies all exact case-sensitive matches in order. Save/load use journal.txt lines species,level,habitat (habitat numeric 0-2). Return 1/0; a failed load preserves the old journal. Driver starts empty: command count then A species level habitat, F species, S, or L. A/S/L print return value. F prints count followed by matching records. All records end with newline.",
    "learningObjectives": [
      "Implement the five Journal functions in the starter. Capacity 20; duplicates allowed. Valid species: 1-20 ASCII letters; level 1-100; habitat 0-2. add returns 1/0. find returns count and copies all exact case-sensitive matches in order. Save/load use journal.txt lines species,level,habitat (habitat numeric 0-2). Return 1/0; a failed load preserves the old journal. Driver starts empty: command count then A species level habitat, F species, S, or L. A/S/L print return value. F prints count followed by matching records. All records end with newline."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Ellis",
    "story": "Ellis wants one place to keep field sightings between trips.",
    "steps": [
      "Reuse earlier record, search and parser helpers",
      "Add a small menu around them",
      "Check persistence before polishing the display"
    ],
    "hints": [
      "Keep a working in-memory journal if a load fails. Build one feature at a time.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "functions",
      "harness": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\n#include \"quest.c\"\nint main(void){Journal j;memset(&j,0,sizeof j);int n;if(scanf(\"%d\",&n)!=1)return 1;for(int i=0;i<n;i++){char c;if(scanf(\" %c\",&c)!=1)return 1;if(c=='A'){Observation r;int h;if(scanf(\"%20s%d%d\",r.species,&r.level,&h)!=3)return 1;r.habitat=(Habitat)h;printf(\"%d\\n\",journal_add(&j,&r));}else if(c=='F'){char s[21];Observation out[20];if(scanf(\"%20s\",s)!=1)return 1;size_t k=journal_find(&j,s,out);if(k>20)return 1;printf(\"%zu\\n\",k);for(size_t z=0;z<k;z++)printf(\"%s %d %d\\n\",out[z].species,out[z].level,out[z].habitat);}else printf(\"%d\\n\",c=='S'?journal_save(&j,\"journal.txt\"):journal_load(&j,\"journal.txt\"));}return 0;}",
      "tests": [
        {
          "id": "c-lab-12-case-1",
          "label": "Case 1",
          "input": "5 A Pikachu 12 0 S A Zubat 8 2 L F Zubat",
          "files": {},
          "stdout": "1\n1\n1\n1\n0\n"
        },
        {
          "id": "c-lab-12-case-2",
          "label": "Case 2",
          "input": "3 A Eevee 5 0 A Eevee 10 1 F Eevee",
          "files": {},
          "stdout": "1\n1\n2\nEevee 5 0\nEevee 10 1\n"
        },
        {
          "id": "c-lab-12-case-3",
          "label": "Case 3",
          "input": "2 A A 0 0 F A",
          "files": {},
          "stdout": "0\n0\n"
        },
        {
          "id": "c-lab-12-case-4",
          "label": "Case 4",
          "input": "21 A A 5 0 A A 5 0 A A 5 0 A A 5 0 A A 5 0 A A 5 0 A A 5 0 A A 5 0 A A 5 0 A A 5 0 A A 5 0 A A 5 0 A A 5 0 A A 5 0 A A 5 0 A A 5 0 A A 5 0 A A 5 0 A A 5 0 A A 5 0 A A 5 0",
          "files": {},
          "stdout": "1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n0\n"
        },
        {
          "id": "c-lab-12-case-5",
          "label": "Case 5",
          "input": "3 A Keep 1 0 L F Keep",
          "files": {
            "journal.txt": "A,5,3\n"
          },
          "stdout": "1\n0\n1\nKeep 1 0\n"
        },
        {
          "id": "c-lab-12-case-6",
          "label": "Case 6",
          "input": "2 L F Pika",
          "files": {
            "journal.txt": "Pika,7,0\n"
          },
          "stdout": "1\n1\nPika 7 0\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-13",
    "subject": "c",
    "title": "Route Distance Planner",
    "starterCode": "#include <stdio.h>\n\nint main(void)\n{\n    /* Write your implementation here. */\n    return 0;\n}\n",
    "tests": [],
    "rewards": {
      "money": 600,
      "berries": [
        {
          "id": "oran",
          "count": 3
        }
      ],
      "pokemon": null
    },
    "difficulty": "easy",
    "estimatedMinutes": {
      "min": 10,
      "max": 20
    },
    "chapters": [
      2,
      3
    ],
    "prompt": "Input: meters (0-100000) and speed in km/h (0.1-20), both double. Print kilometers and minutes with two decimal places, separated by one space and ending with newline. Invalid input prints ERROR.",
    "published": true,
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "topics": [
      "Route Distance Planner"
    ],
    "recommendedOrder": 3,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 3,
      "prerequisiteChapters": [
        2
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Input: meters (0-100000) and speed in km/h (0.1-20), both double. Print kilometers and minutes with two decimal places, separated by one space and ending with newline. Invalid input prints ERROR.",
    "learningObjectives": [
      "Input: meters (0-100000) and speed in km/h (0.1-20), both double. Print kilometers and minutes with two decimal places, separated by one space and ending with newline. Invalid input prints ERROR."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "June",
    "story": "Estimate the next walk before everyone leaves the Pokemon Center.",
    "steps": [
      "Convert meters into kilometers",
      "Divide by speed to get hours",
      "Convert hours to minutes and print units"
    ],
    "hints": [
      "Write the units beside each intermediate calculation to check the formula.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "program",
      "harness": "",
      "tests": [
        {
          "id": "c-lab-13-case-1",
          "label": "Case 1",
          "input": "1500 3",
          "files": {},
          "stdout": "1.50 30.00\n"
        },
        {
          "id": "c-lab-13-case-2",
          "label": "Case 2",
          "input": "0 1",
          "files": {},
          "stdout": "0.00 0.00\n"
        },
        {
          "id": "c-lab-13-case-3",
          "label": "Case 3",
          "input": "100000 20",
          "files": {},
          "stdout": "100.00 300.00\n"
        },
        {
          "id": "c-lab-13-case-4",
          "label": "Case 4",
          "input": "2500 5",
          "files": {},
          "stdout": "2.50 30.00\n"
        },
        {
          "id": "c-lab-13-case-5",
          "label": "Case 5",
          "input": "10 0",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-13-case-6",
          "label": "Case 6",
          "input": "-1 1",
          "files": {},
          "stdout": "ERROR\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-14",
    "subject": "c",
    "title": "Potion Packing Station",
    "starterCode": "#include <stdio.h>\n\nint main(void)\n{\n    /* Write your implementation here. */\n    return 0;\n}\n",
    "tests": [],
    "rewards": {
      "money": 600,
      "berries": [
        {
          "id": "oran",
          "count": 3
        }
      ],
      "pokemon": null
    },
    "difficulty": "easy",
    "estimatedMinutes": {
      "min": 15,
      "max": 25
    },
    "chapters": [
      2,
      3
    ],
    "prompt": "Input: bottle count 0-10000 and crate capacity 1-100. Print full crates and leftovers separated by one space and followed by newline. Invalid input prints ERROR.",
    "published": true,
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "topics": [
      "Potion Packing Station"
    ],
    "recommendedOrder": 4,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 3,
      "prerequisiteChapters": [
        2
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Input: bottle count 0-10000 and crate capacity 1-100. Print full crates and leftovers separated by one space and followed by newline. Invalid input prints ERROR.",
    "learningObjectives": [
      "Input: bottle count 0-10000 and crate capacity 1-100. Print full crates and leftovers separated by one space and followed by newline. Invalid input prints ERROR."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Tam",
    "story": "Pack Potions into full crates and keep the leftovers visible.",
    "steps": [
      "Read the bottle count and positive capacity",
      "Compute quotient and remainder",
      "Label both results"
    ],
    "hints": [
      "The divisor must be positive before either division or remainder.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "program",
      "harness": "",
      "tests": [
        {
          "id": "c-lab-14-case-1",
          "label": "Case 1",
          "input": "10 3",
          "files": {},
          "stdout": "3 1\n"
        },
        {
          "id": "c-lab-14-case-2",
          "label": "Case 2",
          "input": "12 4",
          "files": {},
          "stdout": "3 0\n"
        },
        {
          "id": "c-lab-14-case-3",
          "label": "Case 3",
          "input": "0 5",
          "files": {},
          "stdout": "0 0\n"
        },
        {
          "id": "c-lab-14-case-4",
          "label": "Case 4",
          "input": "10000 99",
          "files": {},
          "stdout": "101 1\n"
        },
        {
          "id": "c-lab-14-case-5",
          "label": "Case 5",
          "input": "3 0",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-14-case-6",
          "label": "Case 6",
          "input": "-1 5",
          "files": {},
          "stdout": "ERROR\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-15",
    "subject": "c",
    "title": "Center Admission Desk",
    "starterCode": "#include <stdio.h>\n\nint main(void)\n{\n    /* Write your implementation here. */\n    return 0;\n}\n",
    "tests": [],
    "rewards": {
      "money": 600,
      "berries": [
        {
          "id": "oran",
          "count": 3
        }
      ],
      "pokemon": null
    },
    "difficulty": "easy",
    "estimatedMinutes": {
      "min": 15,
      "max": 25
    },
    "chapters": [
      2,
      3,
      5
    ],
    "prompt": "Read one integer level. Print BASIC for 1-15, STANDARD for 16-35, ADVANCED for 36-100, otherwise ERROR. End with newline.",
    "published": true,
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "topics": [
      "Center Admission Desk"
    ],
    "recommendedOrder": 6,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 5,
      "prerequisiteChapters": [
        2,
        3
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Read one integer level. Print BASIC for 1-15, STANDARD for 16-35, ADVANCED for 36-100, otherwise ERROR. End with newline.",
    "learningObjectives": [
      "Read one integer level. Print BASIC for 1-15, STANDARD for 16-35, ADVANCED for 36-100, otherwise ERROR. End with newline."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Nurse Ada",
    "story": "Direct each Pokemon to the right training-care desk.",
    "steps": [
      "Reject out-of-range levels",
      "Use nonoverlapping ordered branches",
      "Test values on both sides of each cutoff"
    ],
    "hints": [
      "After handling <=15, the next <=35 branch already excludes the BASIC group.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "program",
      "harness": "",
      "tests": [
        {
          "id": "c-lab-15-case-1",
          "label": "Case 1",
          "input": "0",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-15-case-2",
          "label": "Case 2",
          "input": "1",
          "files": {},
          "stdout": "BASIC\n"
        },
        {
          "id": "c-lab-15-case-3",
          "label": "Case 3",
          "input": "15",
          "files": {},
          "stdout": "BASIC\n"
        },
        {
          "id": "c-lab-15-case-4",
          "label": "Case 4",
          "input": "16",
          "files": {},
          "stdout": "STANDARD\n"
        },
        {
          "id": "c-lab-15-case-5",
          "label": "Case 5",
          "input": "35",
          "files": {},
          "stdout": "STANDARD\n"
        },
        {
          "id": "c-lab-15-case-6",
          "label": "Case 6",
          "input": "36",
          "files": {},
          "stdout": "ADVANCED\n"
        },
        {
          "id": "c-lab-15-case-7",
          "label": "Case 7",
          "input": "100",
          "files": {},
          "stdout": "ADVANCED\n"
        },
        {
          "id": "c-lab-15-case-8",
          "label": "Case 8",
          "input": "101",
          "files": {},
          "stdout": "ERROR\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-16",
    "subject": "c",
    "title": "Training Progress Chart",
    "starterCode": "#include <stdio.h>\n\nint main(void)\n{\n    /* Write your implementation here. */\n    return 0;\n}\n",
    "tests": [],
    "rewards": {
      "money": 600,
      "berries": [
        {
          "id": "oran",
          "count": 3
        }
      ],
      "pokemon": null
    },
    "difficulty": "easy",
    "estimatedMinutes": {
      "min": 20,
      "max": 25
    },
    "chapters": [
      2,
      3,
      5,
      6
    ],
    "prompt": "Read integer sessions 1-10. Row i contains exactly i asterisks, followed by newline. Invalid sessions print ERROR. Use nested loops, with no spaces in the chart.",
    "published": true,
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "topics": [
      "Training Progress Chart"
    ],
    "recommendedOrder": 8,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 6,
      "prerequisiteChapters": [
        2,
        3,
        5
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Read integer sessions 1-10. Row i contains exactly i asterisks, followed by newline. Invalid sessions print ERROR. Use nested loops, with no spaces in the chart.",
    "learningObjectives": [
      "Read integer sessions 1-10. Row i contains exactly i asterisks, followed by newline. Invalid sessions print ERROR. Use nested loops, with no spaces in the chart."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Rowan",
    "story": "Make a small chart to mark steadily longer practice sessions.",
    "steps": [
      "Use an outer loop for the row",
      "Use an inner loop for the stars",
      "Print one newline after each row"
    ],
    "hints": [
      "On row i, the inner loop must run exactly i times.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "program",
      "harness": "",
      "tests": [
        {
          "id": "c-lab-16-case-1",
          "label": "Case 1",
          "input": "1",
          "files": {},
          "stdout": "*\n"
        },
        {
          "id": "c-lab-16-case-2",
          "label": "Case 2",
          "input": "3",
          "files": {},
          "stdout": "*\n**\n***\n"
        },
        {
          "id": "c-lab-16-case-3",
          "label": "Case 3",
          "input": "10",
          "files": {},
          "stdout": "*\n**\n***\n****\n*****\n******\n*******\n********\n*********\n**********\n"
        },
        {
          "id": "c-lab-16-case-4",
          "label": "Case 4",
          "input": "0",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-16-case-5",
          "label": "Case 5",
          "input": "11",
          "files": {},
          "stdout": "ERROR\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-17",
    "subject": "c",
    "title": "The Sighting Counter",
    "starterCode": "#include <stdio.h>\n\nint main(void)\n{\n    /* Write your implementation here. */\n    return 0;\n}\n",
    "tests": [],
    "rewards": {
      "money": 600,
      "berries": [
        {
          "id": "oran",
          "count": 3
        }
      ],
      "pokemon": null
    },
    "difficulty": "easy",
    "estimatedMinutes": {
      "min": 20,
      "max": 25
    },
    "chapters": [
      2,
      3,
      5,
      6,
      8
    ],
    "prompt": "Read count 0-100 then count species codes 1-6. Print six counts in code order, separated by single spaces, no trailing space, and newline. Any invalid count/code or missing input prints only ERROR.",
    "published": true,
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "topics": [
      "The Sighting Counter"
    ],
    "recommendedOrder": 11,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 8,
      "prerequisiteChapters": [
        2,
        3,
        5,
        6
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Read count 0-100 then count species codes 1-6. Print six counts in code order, separated by single spaces, no trailing space, and newline. Any invalid count/code or missing input prints only ERROR.",
    "learningObjectives": [
      "Read count 0-100 then count species codes 1-6. Print six counts in code order, separated by single spaces, no trailing space, and newline. Any invalid count/code or missing input prints only ERROR."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Bram",
    "story": "Count six species without leaving the quiet ones out.",
    "steps": [
      "Initialize six counters to zero",
      "Validate each code before translating to an index",
      "Print every counter in order"
    ],
    "hints": [
      "Code 1 belongs at array index 0. Check the code before subtracting and indexing.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "program",
      "harness": "",
      "tests": [
        {
          "id": "c-lab-17-case-1",
          "label": "Case 1",
          "input": "3 1 1 6",
          "files": {},
          "stdout": "2 0 0 0 0 1\n"
        },
        {
          "id": "c-lab-17-case-2",
          "label": "Case 2",
          "input": "0",
          "files": {},
          "stdout": "0 0 0 0 0 0\n"
        },
        {
          "id": "c-lab-17-case-3",
          "label": "Case 3",
          "input": "6 6 5 4 3 2 1",
          "files": {},
          "stdout": "1 1 1 1 1 1\n"
        },
        {
          "id": "c-lab-17-case-4",
          "label": "Case 4",
          "input": "2 0 1",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-17-case-5",
          "label": "Case 5",
          "input": "2 1 7",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-17-case-6",
          "label": "Case 6",
          "input": "100 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2",
          "files": {},
          "stdout": "0 100 0 0 0 0\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-18",
    "subject": "c",
    "title": "Find That Pokemon",
    "starterCode": "#include <stdio.h>\n\nint main(void)\n{\n    /* Write your implementation here. */\n    return 0;\n}\n",
    "tests": [],
    "rewards": {
      "money": 1400,
      "berries": [
        {
          "id": "rareCandy",
          "count": 1
        }
      ],
      "pokemon": null
    },
    "difficulty": "medium",
    "estimatedMinutes": {
      "min": 30,
      "max": 45
    },
    "chapters": [
      4,
      5,
      6,
      8
    ],
    "prompt": "Read count 0-20, count levels 1-100, then a search level 1-100. Use insertion sort ascending and linear search for the first match. Print sorted levels separated by spaces on line 1 (empty if count 0), then the 0-based first index or -1 on line 2. Invalid input prints ERROR.",
    "published": true,
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "topics": [
      "applied implementation"
    ],
    "recommendedOrder": 12,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 8,
      "prerequisiteChapters": [
        4,
        5,
        6
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Read count 0-20, count levels 1-100, then a search level 1-100. Use insertion sort ascending and linear search for the first match. Print sorted levels separated by spaces on line 1 (empty if count 0), then the 0-based first index or -1 on line 2. Invalid input prints ERROR.",
    "learningObjectives": [
      "Read count 0-20, count levels 1-100, then a search level 1-100. Use insertion sort ascending and linear search for the first match. Print sorted levels separated by spaces on line 1 (empty if count 0), then the 0-based first index or -1 on line 2. Invalid input prints ERROR."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Kern",
    "story": "Find a level in a tidy list before the next practice match.",
    "steps": [
      "Implement insertion sort",
      "Keep duplicate entries",
      "Search from the first element"
    ],
    "hints": [
      "An insertion sort moves larger preceding values right to make a place for the current value.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "program",
      "harness": "",
      "tests": [
        {
          "id": "c-lab-18-case-1",
          "label": "Case 1",
          "input": "3 3 1 3 3",
          "files": {},
          "stdout": "1 3 3\n1\n"
        },
        {
          "id": "c-lab-18-case-2",
          "label": "Case 2",
          "input": "0 5",
          "files": {},
          "stdout": "\n-1\n"
        },
        {
          "id": "c-lab-18-case-3",
          "label": "Case 3",
          "input": "5 5 4 3 2 1 8",
          "files": {},
          "stdout": "1 2 3 4 5\n-1\n"
        },
        {
          "id": "c-lab-18-case-4",
          "label": "Case 4",
          "input": "1 100 100",
          "files": {},
          "stdout": "100\n0\n"
        },
        {
          "id": "c-lab-18-case-5",
          "label": "Case 5",
          "input": "2 0 5 5",
          "files": {},
          "stdout": "ERROR\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-19",
    "subject": "c",
    "title": "The Berry Garden",
    "starterCode": "#include <stdio.h>\n\nint main(void)\n{\n    /* Write your implementation here. */\n    return 0;\n}\n",
    "tests": [],
    "rewards": {
      "money": 1400,
      "berries": [
        {
          "id": "sitrus",
          "count": 2
        }
      ],
      "pokemon": null
    },
    "difficulty": "medium",
    "estimatedMinutes": {
      "min": 35,
      "max": 55
    },
    "chapters": [
      4,
      5,
      6,
      8
    ],
    "prompt": "Read twelve yields (0-1000) in row-major order for a 3x4 garden. Print three row totals on line 1 and the best plot row and column (0-based) on line 2. Choose the earliest row-major plot on ties. Invalid input prints ERROR.",
    "published": true,
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "topics": [
      "applied implementation"
    ],
    "recommendedOrder": 13,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 8,
      "prerequisiteChapters": [
        4,
        5,
        6
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Read twelve yields (0-1000) in row-major order for a 3x4 garden. Print three row totals on line 1 and the best plot row and column (0-based) on line 2. Choose the earliest row-major plot on ties. Invalid input prints ERROR.",
    "learningObjectives": [
      "Read twelve yields (0-1000) in row-major order for a 3x4 garden. Print three row totals on line 1 and the best plot row and column (0-based) on line 2. Choose the earliest row-major plot on ties. Invalid input prints ERROR."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Mira",
    "story": "Find the best patch in a small berry garden.",
    "steps": [
      "Store the fixed grid in a two-dimensional array",
      "Calculate each row total",
      "Track a best plot in row-major order"
    ],
    "hints": [
      "Use nested loops and update the best plot only on a strictly greater yield.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "program",
      "harness": "",
      "tests": [
        {
          "id": "c-lab-19-case-1",
          "label": "Case 1",
          "input": "1 2 3 4 0 0 0 0 2 2 2 9",
          "files": {},
          "stdout": "10 0 15\n2 3\n"
        },
        {
          "id": "c-lab-19-case-2",
          "label": "Case 2",
          "input": "0 0 0 0 0 0 0 0 0 0 0 0",
          "files": {},
          "stdout": "0 0 0\n0 0\n"
        },
        {
          "id": "c-lab-19-case-3",
          "label": "Case 3",
          "input": "9 9 0 0 0 0 0 0 0 0 0 0",
          "files": {},
          "stdout": "18 0 0\n0 0\n"
        },
        {
          "id": "c-lab-19-case-4",
          "label": "Case 4",
          "input": "-1 0 0 0 0 0 0 0 0 0 0 0",
          "files": {},
          "stdout": "ERROR\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-20",
    "subject": "c",
    "title": "Supply Order Decoder",
    "starterCode": "#include <stdio.h>\n\nint main(void)\n{\n    /* Write your implementation here. */\n    return 0;\n}\n",
    "tests": [],
    "rewards": {
      "money": 1400,
      "berries": [
        {
          "id": "sitrus",
          "count": 2
        }
      ],
      "pokemon": null
    },
    "difficulty": "medium",
    "estimatedMinutes": {
      "min": 30,
      "max": 50
    },
    "chapters": [
      4,
      5,
      6,
      7,
      8,
      9,
      10
    ],
    "prompt": "Read supply lines until EOF. Each is item,quantity: item 1-20 ASCII letters, quantity 1-3 decimal digits with numeric value 0-999. No spaces, signs, quotes or extra comma. Strip CR/LF, accept final line without newline. Reject lines over 32 characters as one ERROR line. For each valid line print item then a space then numeric quantity and newline; invalid lines print ERROR.",
    "published": true,
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "topics": [
      "applied implementation"
    ],
    "recommendedOrder": 17,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 10,
      "prerequisiteChapters": [
        4,
        5,
        6,
        7,
        8,
        9
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Read supply lines until EOF. Each is item,quantity: item 1-20 ASCII letters, quantity 1-3 decimal digits with numeric value 0-999. No spaces, signs, quotes or extra comma. Strip CR/LF, accept final line without newline. Reject lines over 32 characters as one ERROR line. For each valid line print item then a space then numeric quantity and newline; invalid lines print ERROR.",
    "learningObjectives": [
      "Read supply lines until EOF. Each is item,quantity: item 1-20 ASCII letters, quantity 1-3 decimal digits with numeric value 0-999. No spaces, signs, quotes or extra comma. Strip CR/LF, accept final line without newline. Reject lines over 32 characters as one ERROR line. For each valid line print item then a space then numeric quantity and newline; invalid lines print ERROR."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Wren",
    "story": "Read the supply order before it reaches the counter.",
    "steps": [
      "Read each complete line",
      "Split exactly once at the comma",
      "Validate the whole quantity token before conversion is accepted"
    ],
    "hints": [
      "strtol can stop before the end of a token. Check the end pointer and range, not just its return value.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "program",
      "harness": "",
      "tests": [
        {
          "id": "c-lab-20-case-1",
          "label": "Case 1",
          "input": "Potion,12\nBerry,000\n",
          "files": {},
          "stdout": "Potion 12\nBerry 0\n"
        },
        {
          "id": "c-lab-20-case-2",
          "label": "Case 2",
          "input": "Potion,12x\nPotion\nA,-1\nA,1000\n",
          "files": {},
          "stdout": "ERROR\nERROR\nERROR\nERROR\n"
        },
        {
          "id": "c-lab-20-case-3",
          "label": "Case 3",
          "input": "Potion,12",
          "files": {},
          "stdout": "Potion 12\n"
        },
        {
          "id": "c-lab-20-case-4",
          "label": "Case 4",
          "input": "A,1,2\n,1\n A,1\n",
          "files": {},
          "stdout": "ERROR\nERROR\nERROR\n"
        },
        {
          "id": "c-lab-20-case-5",
          "label": "Case 5",
          "input": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA,1\nB,2\n",
          "files": {},
          "stdout": "ERROR\nB 2\n"
        },
        {
          "id": "c-lab-20-case-6",
          "label": "Case 6",
          "input": "Potion,12\r\n",
          "files": {},
          "stdout": "Potion 12\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-21",
    "subject": "c",
    "title": "Hands-On Healing",
    "starterCode": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\nint swap_levels(int *a,int *b);\nint heal_in_place(int *hp,int maximum,int amount);\n/* Implement the functions above. The game supplies main(). */\n",
    "tests": [],
    "rewards": {
      "money": 1400,
      "berries": [
        {
          "id": "sitrus",
          "count": 2
        }
      ],
      "pokemon": null
    },
    "difficulty": "medium",
    "estimatedMinutes": {
      "min": 35,
      "max": 55
    },
    "chapters": [
      4,
      5,
      6,
      9
    ],
    "prompt": "Implement swap_levels and heal_in_place returning 1 on success, 0 on invalid input. Null pointers fail. Swap accepts any int and permits identical pointers. For healing: maximum 1..INT_MAX, current 0..maximum, amount 0..INT_MAX, clamping without signed overflow. Driver commands S a b, I a (same address), N (null swap), H current max amount, Z (null healing). Driver prints return value followed by updated values.",
    "published": true,
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "topics": [
      "applied implementation"
    ],
    "recommendedOrder": 14,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 9,
      "prerequisiteChapters": [
        4,
        5,
        6
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Implement swap_levels and heal_in_place returning 1 on success, 0 on invalid input. Null pointers fail. Swap accepts any int and permits identical pointers. For healing: maximum 1..INT_MAX, current 0..maximum, amount 0..INT_MAX, clamping without signed overflow. Driver commands S a b, I a (same address), N (null swap), H current max amount, Z (null healing). Driver prints return value followed by updated values.",
    "learningObjectives": [
      "Implement swap_levels and heal_in_place returning 1 on success, 0 on invalid input. Null pointers fail. Swap accepts any int and permits identical pointers. For healing: maximum 1..INT_MAX, current 0..maximum, amount 0..INT_MAX, clamping without signed overflow. Driver commands S a b, I a (same address), N (null swap), H current max amount, Z (null healing). Driver prints return value followed by updated values."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Nurse Poppy",
    "story": "Update a caller's HP without losing track of which Pokemon it belongs to.",
    "steps": [
      "Validate pointers and values before writing",
      "Swap through a temporary int",
      "Clamp healing at maximum HP"
    ],
    "hints": [
      "Dereferencing changes the pointed-to object. Reassigning the pointer itself does not replace the caller's object.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "functions",
      "harness": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\n#include \"quest.c\"\nint main(void){char c;int a=5,b=10,m,v;if(scanf(\" %c\",&c)!=1)return 1;if(c=='S'){if(scanf(\"%d%d\",&a,&b)!=2)return 1;int ok=swap_levels(&a,&b);printf(\"%d %d %d\\n\",ok,a,b);}else if(c=='I'){if(scanf(\"%d\",&a)!=1)return 1;int ok=swap_levels(&a,&a);printf(\"%d %d\\n\",ok,a);}else if(c=='N'){int ok=swap_levels(NULL,&a);printf(\"%d %d\\n\",ok,a);}else if(c=='Z')printf(\"%d\\n\",heal_in_place(NULL,10,2));else{if(scanf(\"%d%d%d\",&a,&m,&v)!=3)return 1;int ok=heal_in_place(&a,m,v);printf(\"%d %d\\n\",ok,a);}return 0;}",
      "tests": [
        {
          "id": "c-lab-21-case-1",
          "label": "Case 1",
          "input": "S 5 10",
          "files": {},
          "stdout": "1 10 5\n"
        },
        {
          "id": "c-lab-21-case-2",
          "label": "Case 2",
          "input": "I 7",
          "files": {},
          "stdout": "1 7\n"
        },
        {
          "id": "c-lab-21-case-3",
          "label": "Case 3",
          "input": "N",
          "files": {},
          "stdout": "0 5\n"
        },
        {
          "id": "c-lab-21-case-4",
          "label": "Case 4",
          "input": "Z",
          "files": {},
          "stdout": "0\n"
        },
        {
          "id": "c-lab-21-case-5",
          "label": "Case 5",
          "input": "H 35 39 10",
          "files": {},
          "stdout": "1 39\n"
        },
        {
          "id": "c-lab-21-case-6",
          "label": "Case 6",
          "input": "H 1 2147483647 2147483647",
          "files": {},
          "stdout": "1 2147483647\n"
        },
        {
          "id": "c-lab-21-case-7",
          "label": "Case 7",
          "input": "H 10 5 1",
          "files": {},
          "stdout": "0 10\n"
        },
        {
          "id": "c-lab-21-case-8",
          "label": "Case 8",
          "input": "H 3 5 -1",
          "files": {},
          "stdout": "0 3\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-22",
    "subject": "c",
    "title": "A Trainer Has Many Jobs",
    "starterCode": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\ntypedef enum {BATTLE,TRAVEL,SHOP} ActivityTag;\ntypedef struct {ActivityTag tag;union {int foeLevel;int distance;int cents;} data;} Activity;\nint activity_set(Activity *a,int tag,int value);\n/* Implement the functions above. The game supplies main(). */\n",
    "tests": [],
    "rewards": {
      "money": 1400,
      "berries": [
        {
          "id": "sitrus",
          "count": 2
        }
      ],
      "pokemon": null
    },
    "difficulty": "medium",
    "estimatedMinutes": {
      "min": 40,
      "max": 60
    },
    "chapters": [
      4,
      5,
      6,
      10,
      11
    ],
    "prompt": "Implement activity_set(Activity*,int tag,int value). Tags: BATTLE=0 (level 1-100), TRAVEL=1 (meters 0-100000), SHOP=2 (cents 0-100000). Return 1 on success; return 0 and preserve the old activity on invalid tag/value or NULL. Set tag and corresponding union field together. Driver reads count followed by tag/value pairs and prints result tag value after each operation; starts at TRAVEL 0.",
    "published": true,
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "topics": [
      "applied implementation"
    ],
    "recommendedOrder": 20,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 11,
      "prerequisiteChapters": [
        4,
        5,
        6,
        10
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Implement activity_set(Activity*,int tag,int value). Tags: BATTLE=0 (level 1-100), TRAVEL=1 (meters 0-100000), SHOP=2 (cents 0-100000). Return 1 on success; return 0 and preserve the old activity on invalid tag/value or NULL. Set tag and corresponding union field together. Driver reads count followed by tag/value pairs and prints result tag value after each operation; starts at TRAVEL 0.",
    "learningObjectives": [
      "Implement activity_set(Activity*,int tag,int value). Tags: BATTLE=0 (level 1-100), TRAVEL=1 (meters 0-100000), SHOP=2 (cents 0-100000). Return 1 on success; return 0 and preserve the old activity on invalid tag/value or NULL. Set tag and corresponding union field together. Driver reads count followed by tag/value pairs and prints result tag value after each operation; starts at TRAVEL 0."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Bell",
    "story": "A trainer can be traveling, shopping or battling. Store the right details for the current activity.",
    "steps": [
      "Define a tag enum",
      "Define matching union fields",
      "Use the tag to choose what to print"
    ],
    "hints": [
      "Only one union member holds the active payload. Keep tag and payload updates together.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "functions",
      "harness": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\n#include \"quest.c\"\nint main(void){Activity a={TRAVEL,{0}};int n;if(scanf(\"%d\",&n)!=1)return 1;for(int i=0;i<n;i++){int t,v;if(scanf(\"%d%d\",&t,&v)!=2)return 1;int ok=activity_set(&a,t,v);int x=a.tag==BATTLE?a.data.foeLevel:a.tag==TRAVEL?a.data.distance:a.data.cents;printf(\"%d %d %d\\n\",ok,a.tag,x);}printf(\"NULL %d\\n\",activity_set(NULL,0,1));return 0;}",
      "tests": [
        {
          "id": "c-lab-22-case-1",
          "label": "Case 1",
          "input": "3 0 25 1 1500 2 125",
          "files": {},
          "stdout": "1 0 25\n1 1 1500\n1 2 125\nNULL 0\n"
        },
        {
          "id": "c-lab-22-case-2",
          "label": "Case 2",
          "input": "4 0 0 3 1 1 -1 2 100001",
          "files": {},
          "stdout": "0 1 0\n0 1 0\n0 1 0\n0 1 0\nNULL 0\n"
        },
        {
          "id": "c-lab-22-case-3",
          "label": "Case 3",
          "input": "2 0 100 1 100000",
          "files": {},
          "stdout": "1 0 100\n1 1 100000\nNULL 0\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-23",
    "subject": "c",
    "title": "The Badge Case",
    "starterCode": "#include <stdio.h>\n\nint main(void)\n{\n    /* Write your implementation here. */\n    return 0;\n}\n",
    "tests": [],
    "rewards": {
      "money": 1400,
      "berries": [
        {
          "id": "sitrus",
          "count": 2
        }
      ],
      "pokemon": null
    },
    "difficulty": "medium",
    "estimatedMinutes": {
      "min": 40,
      "max": 60
    },
    "chapters": [
      3,
      4,
      5,
      6,
      13
    ],
    "prompt": "Input command count 0-100 then commands E index (earn), R index (remove), C index (check). Start with mask 0; valid indices 0-7. Print unsigned mask after E/R, 0 or 1 after C, or ERROR for invalid index/command. Preserve the mask after errors. Use bitwise operations; one output line per command.",
    "published": true,
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "topics": [
      "applied implementation"
    ],
    "recommendedOrder": 24,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 13,
      "prerequisiteChapters": [
        3,
        4,
        5,
        6
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Input command count 0-100 then commands E index (earn), R index (remove), C index (check). Start with mask 0; valid indices 0-7. Print unsigned mask after E/R, 0 or 1 after C, or ERROR for invalid index/command. Preserve the mask after errors. Use bitwise operations; one output line per command.",
    "learningObjectives": [
      "Input command count 0-100 then commands E index (earn), R index (remove), C index (check). Start with mask 0; valid indices 0-7. Print unsigned mask after E/R, 0 or 1 after C, or ERROR for invalid index/command. Preserve the mask after errors. Use bitwise operations; one output line per command."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Gus",
    "story": "Keep eight earned badges in a compact badge case.",
    "steps": [
      "Validate indices 0-7",
      "Build masks with 1u",
      "Use OR, AND and complemented masks for the three operations"
    ],
    "hints": [
      "To remove a badge, clear only that bit and keep every other bit unchanged.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "program",
      "harness": "",
      "tests": [
        {
          "id": "c-lab-23-case-1",
          "label": "Case 1",
          "input": "4 E 0 E 7 R 0 C 7",
          "files": {},
          "stdout": "1\n129\n128\n1\n"
        },
        {
          "id": "c-lab-23-case-2",
          "label": "Case 2",
          "input": "5 E 3 E 3 R 2 C 2 C 3",
          "files": {},
          "stdout": "8\n8\n8\n0\n1\n"
        },
        {
          "id": "c-lab-23-case-3",
          "label": "Case 3",
          "input": "3 E -1 E 8 C 0",
          "files": {},
          "stdout": "ERROR\nERROR\n0\n"
        },
        {
          "id": "c-lab-23-case-4",
          "label": "Case 4",
          "input": "2 X 0 C 0",
          "files": {},
          "stdout": "ERROR\n0\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-24",
    "subject": "c",
    "title": "Read the Battle Log",
    "starterCode": "#include <stdio.h>\n\nint main(void)\n{\n    /* Write your implementation here. */\n    return 0;\n}\n",
    "tests": [],
    "rewards": {
      "money": 1400,
      "berries": [
        {
          "id": "sitrus",
          "count": 2
        }
      ],
      "pokemon": null
    },
    "difficulty": "medium",
    "estimatedMinutes": {
      "min": 40,
      "max": 60
    },
    "chapters": [
      4,
      5,
      6,
      7,
      10
    ],
    "prompt": "No stdin. Read battle.txt from the in-app sandbox. Each complete line exactly WIN or LOSS counts accordingly; every other line (including blank) counts as unrecognized. Remove LF or CRLF line endings only. Accept a final line without newline. Print wins losses unrecognized separated by spaces and newline, or ERROR if the file cannot be opened.",
    "published": true,
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "topics": [
      "applied implementation"
    ],
    "recommendedOrder": 18,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 7,
      "prerequisiteChapters": [
        4,
        5,
        6,
        10
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "No stdin. Read battle.txt from the in-app sandbox. Each complete line exactly WIN or LOSS counts accordingly; every other line (including blank) counts as unrecognized. Remove LF or CRLF line endings only. Accept a final line without newline. Print wins losses unrecognized separated by spaces and newline, or ERROR if the file cannot be opened.",
    "learningObjectives": [
      "No stdin. Read battle.txt from the in-app sandbox. Each complete line exactly WIN or LOSS counts accordingly; every other line (including blank) counts as unrecognized. Remove LF or CRLF line endings only. Accept a final line without newline. Print wins losses unrecognized separated by spaces and newline, or ERROR if the file cannot be opened."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Rowan",
    "story": "Count the results in Rowan's battle notebook.",
    "steps": [
      "Read one complete line at a time",
      "Remove only line endings",
      "Classify the full remaining line"
    ],
    "hints": [
      "Do not match prefixes. WINNER is not WIN, and blank lines are unrecognized.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "program",
      "harness": "",
      "tests": [
        {
          "id": "c-lab-24-case-1",
          "label": "Case 1",
          "input": "",
          "files": {
            "battle.txt": "WIN\nLOSS\nDRAW\n"
          },
          "stdout": "1 1 1\n"
        },
        {
          "id": "c-lab-24-case-2",
          "label": "Case 2",
          "input": "",
          "files": {
            "battle.txt": ""
          },
          "stdout": "0 0 0\n"
        },
        {
          "id": "c-lab-24-case-3",
          "label": "Case 3",
          "input": "",
          "files": {
            "battle.txt": "WIN\r\nLOSS"
          },
          "stdout": "1 1 0\n"
        },
        {
          "id": "c-lab-24-case-4",
          "label": "Case 4",
          "input": "",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-24-case-5",
          "label": "Case 5",
          "input": "",
          "files": {
            "battle.txt": "WINNER\n\nwin\nWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW\nWIN\n"
          },
          "stdout": "1 0 4\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-25",
    "subject": "c",
    "title": "The Waiting Room",
    "starterCode": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\ntypedef struct Patient {int id;struct Patient *next;} Patient;\ntypedef struct {Patient *head,*tail;} Queue;\nint enqueue(Queue *q,int id);\nint dequeue(Queue *q,int *id);\nvoid queue_destroy(Queue *q);\n/* Implement the functions above. The game supplies main(). */\n",
    "tests": [],
    "rewards": {
      "money": 3000,
      "berries": [
        {
          "id": "prismStone",
          "count": 1
        }
      ],
      "pokemon": {
        "id": 447,
        "level": 20
      }
    },
    "difficulty": "hard",
    "estimatedMinutes": {
      "min": 75,
      "max": 120
    },
    "chapters": [
      4,
      5,
      6,
      9,
      11,
      14
    ],
    "prompt": "Implement enqueue, dequeue and queue_destroy using a singly linked list. Queue starts with NULL head/tail. enqueue returns 1 or 0 on allocation failure; any int ID and duplicates are allowed. dequeue writes an ID and returns 1, or returns 0 on empty without changing output. Destroy frees all nodes and sets head/tail NULL. Driver: command count then E id, S (serve), X (destroy), F (fail next allocation). Prints enqueue result, or serve result and ID (initially -999). Ends with CLEAN head-null tail-null and LIVE allocation count. Failure must preserve the queue.",
    "published": true,
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "topics": [
      "multi-concept implementation"
    ],
    "recommendedOrder": 26,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 14,
      "prerequisiteChapters": [
        4,
        5,
        6,
        9,
        11
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Implement enqueue, dequeue and queue_destroy using a singly linked list. Queue starts with NULL head/tail. enqueue returns 1 or 0 on allocation failure; any int ID and duplicates are allowed. dequeue writes an ID and returns 1, or returns 0 on empty without changing output. Destroy frees all nodes and sets head/tail NULL. Driver: command count then E id, S (serve), X (destroy), F (fail next allocation). Prints enqueue result, or serve result and ID (initially -999). Ends with CLEAN head-null tail-null and LIVE allocation count. Failure must preserve the queue.",
    "learningObjectives": [
      "Implement enqueue, dequeue and queue_destroy using a singly linked list. Queue starts with NULL head/tail. enqueue returns 1 or 0 on allocation failure; any int ID and duplicates are allowed. dequeue writes an ID and returns 1, or returns 0 on empty without changing output. Destroy frees all nodes and sets head/tail NULL. Driver: command count then E id, S (serve), X (destroy), F (fail next allocation). Prints enqueue result, or serve result and ID (initially -999). Ends with CLEAN head-null tail-null and LIVE allocation count. Failure must preserve the queue."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Nurse Ada",
    "story": "Keep the waiting room in arrival order.",
    "steps": [
      "Define a node and head/tail pointers",
      "Append at the tail and remove from the head",
      "Reset both pointers after serving the final patient"
    ],
    "hints": [
      "An empty queue needs both head and tail to be null. Free the removed node after saving its ID.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "functions",
      "harness": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\nstatic void *allocations[256];\nstatic int fail_next=0;\nstatic int live_blocks(void){int n=0;for(int i=0;i<256;i++)n+=allocations[i]!=NULL;return n;}\nstatic void remember(void *p){if(!p)return;for(int i=0;i<256;i++)if(!allocations[i]){allocations[i]=p;return;}abort();}\nstatic void forget(void *p){if(!p)return;for(int i=0;i<256;i++)if(allocations[i]==p){allocations[i]=NULL;return;}abort();}\nstatic void *q_malloc(size_t n){if(fail_next){fail_next=0;return NULL;}void *p=malloc(n);remember(p);return p;}\nstatic void *q_calloc(size_t n,size_t s){if(fail_next){fail_next=0;return NULL;}void *p=calloc(n,s);remember(p);return p;}\nstatic void *q_realloc(void *p,size_t n){if(fail_next){fail_next=0;return NULL;}void *old=p;void *next=realloc(p,n);if(next||!n){forget(old);remember(next);}return next;}\nstatic void q_free(void *p){forget(p);free(p);}\n#define malloc q_malloc\n#define calloc q_calloc\n#define realloc q_realloc\n#define free q_free\n\n#include \"quest.c\"\n\n#undef malloc\n#undef calloc\n#undef realloc\n#undef free\nstatic void track_ready(void){(void)q_malloc;(void)q_calloc;(void)q_realloc;(void)q_free;}\nint main(void){track_ready();Queue q={0};int n;if(scanf(\"%d\",&n)!=1)return 1;for(int i=0;i<n;i++){char c;if(scanf(\" %c\",&c)!=1)return 1;if(c=='E'){int v;if(scanf(\"%d\",&v)!=1)return 1;printf(\"%d\\n\",enqueue(&q,v));}else if(c=='S'){int v=-999;int ok=dequeue(&q,&v);printf(\"%d %d\\n\",ok,v);}else if(c=='X')queue_destroy(&q);else fail_next=1;}queue_destroy(&q);printf(\"CLEAN %d %d\\nLIVE %d\\n\",q.head==NULL,q.tail==NULL,live_blocks());return 0;}",
      "tests": [
        {
          "id": "c-lab-25-case-1",
          "label": "Case 1",
          "input": "7 E 10 E 20 E 30 S S S S",
          "files": {},
          "stdout": "1\n1\n1\n1 10\n1 20\n1 30\n0 -999\nCLEAN 1 1\nLIVE 0\n"
        },
        {
          "id": "c-lab-25-case-2",
          "label": "Case 2",
          "input": "5 E 1 F E 2 S S",
          "files": {},
          "stdout": "1\n0\n1 1\n0 -999\nCLEAN 1 1\nLIVE 0\n"
        },
        {
          "id": "c-lab-25-case-3",
          "label": "Case 3",
          "input": "5 E 5 X E 7 S S",
          "files": {},
          "stdout": "1\n1\n1 7\n0 -999\nCLEAN 1 1\nLIVE 0\n"
        },
        {
          "id": "c-lab-25-case-4",
          "label": "Case 4",
          "input": "2 E 4 E 4",
          "files": {},
          "stdout": "1\n1\nCLEAN 1 1\nLIVE 0\n"
        },
        {
          "id": "c-lab-25-case-5",
          "label": "Case 5",
          "input": "0",
          "files": {},
          "stdout": "CLEAN 1 1\nLIVE 0\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-26",
    "subject": "c",
    "title": "The Traveling Inventory",
    "starterCode": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\ntypedef struct ItemNode {char name[21];int quantity;struct ItemNode *next;} ItemNode;\nint inventory_add(ItemNode **head,const char *name,int quantity);\nint inventory_remove(ItemNode **head,const char *name);\nItemNode *inventory_find(ItemNode *head,const char *name);\nvoid inventory_destroy(ItemNode **head);\n/* Implement the functions above. The game supplies main(). */\n",
    "tests": [],
    "rewards": {
      "money": 3000,
      "berries": [
        {
          "id": "sitrus",
          "count": 4
        }
      ],
      "pokemon": {
        "id": 246,
        "level": 20
      }
    },
    "difficulty": "hard",
    "estimatedMinutes": {
      "min": 75,
      "max": 120
    },
    "chapters": [
      4,
      5,
      6,
      9,
      10,
      11,
      14
    ],
    "prompt": "Implement inventory_add, inventory_remove, inventory_find, inventory_destroy for a singly linked list. Names: 1-20 ASCII letters; quantities 0-999. add inserts a new name or adds to its existing quantity, returning 1; invalid data, overflow or allocation failure returns 0 without changes. remove returns 1 if found/freed, else 0. find returns matching node or NULL. destroy sets head NULL. Driver: command count; A name quantity, R name, G name (prints quantity or -1), X destroy, F fail next allocation. Ends with CLEAN head-null and LIVE allocation count.",
    "published": true,
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "topics": [
      "multi-concept implementation"
    ],
    "recommendedOrder": 27,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 14,
      "prerequisiteChapters": [
        4,
        5,
        6,
        9,
        10,
        11
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Implement inventory_add, inventory_remove, inventory_find, inventory_destroy for a singly linked list. Names: 1-20 ASCII letters; quantities 0-999. add inserts a new name or adds to its existing quantity, returning 1; invalid data, overflow or allocation failure returns 0 without changes. remove returns 1 if found/freed, else 0. find returns matching node or NULL. destroy sets head NULL. Driver: command count; A name quantity, R name, G name (prints quantity or -1), X destroy, F fail next allocation. Ends with CLEAN head-null and LIVE allocation count.",
    "learningObjectives": [
      "Implement inventory_add, inventory_remove, inventory_find, inventory_destroy for a singly linked list. Names: 1-20 ASCII letters; quantities 0-999. add inserts a new name or adds to its existing quantity, returning 1; invalid data, overflow or allocation failure returns 0 without changes. remove returns 1 if found/freed, else 0. find returns matching node or NULL. destroy sets head NULL. Driver: command count; A name quantity, R name, G name (prints quantity or -1), X destroy, F fail next allocation. Ends with CLEAN head-null and LIVE allocation count."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Wren",
    "story": "Maintain a traveling inventory whose entries can come and go.",
    "steps": [
      "Find a node before updating or inserting",
      "Handle head removal separately or use pointer-to-pointer traversal",
      "Destroy every remaining node on exit"
    ],
    "hints": [
      "A node removed from the chain must be freed exactly once. Do not follow its next pointer after freeing it.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "functions",
      "harness": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\nstatic void *allocations[256];\nstatic int fail_next=0;\nstatic int live_blocks(void){int n=0;for(int i=0;i<256;i++)n+=allocations[i]!=NULL;return n;}\nstatic void remember(void *p){if(!p)return;for(int i=0;i<256;i++)if(!allocations[i]){allocations[i]=p;return;}abort();}\nstatic void forget(void *p){if(!p)return;for(int i=0;i<256;i++)if(allocations[i]==p){allocations[i]=NULL;return;}abort();}\nstatic void *q_malloc(size_t n){if(fail_next){fail_next=0;return NULL;}void *p=malloc(n);remember(p);return p;}\nstatic void *q_calloc(size_t n,size_t s){if(fail_next){fail_next=0;return NULL;}void *p=calloc(n,s);remember(p);return p;}\nstatic void *q_realloc(void *p,size_t n){if(fail_next){fail_next=0;return NULL;}void *old=p;void *next=realloc(p,n);if(next||!n){forget(old);remember(next);}return next;}\nstatic void q_free(void *p){forget(p);free(p);}\n#define malloc q_malloc\n#define calloc q_calloc\n#define realloc q_realloc\n#define free q_free\n\n#include \"quest.c\"\n\n#undef malloc\n#undef calloc\n#undef realloc\n#undef free\nstatic void track_ready(void){(void)q_malloc;(void)q_calloc;(void)q_realloc;(void)q_free;}\nint main(void){track_ready();ItemNode *h=NULL;int n;if(scanf(\"%d\",&n)!=1)return 1;for(int i=0;i<n;i++){char c,s[21];if(scanf(\" %c\",&c)!=1)return 1;if(c=='X')inventory_destroy(&h);else if(c=='F')fail_next=1;else{if(scanf(\"%20s\",s)!=1)return 1;if(c=='A'){int v;if(scanf(\"%d\",&v)!=1)return 1;printf(\"%d\\n\",inventory_add(&h,s,v));}else if(c=='R')printf(\"%d\\n\",inventory_remove(&h,s));else{ItemNode *p=inventory_find(h,s);printf(\"%d\\n\",p?p->quantity:-1);}}}inventory_destroy(&h);printf(\"CLEAN %d\\nLIVE %d\\n\",h==NULL,live_blocks());return 0;}",
      "tests": [
        {
          "id": "c-lab-26-case-1",
          "label": "Case 1",
          "input": "3 A Potion 2 A Potion 3 G Potion",
          "files": {},
          "stdout": "1\n1\n5\nCLEAN 1\nLIVE 0\n"
        },
        {
          "id": "c-lab-26-case-2",
          "label": "Case 2",
          "input": "8 A A 1 A B 2 A C 3 R B R C R A G A R Z",
          "files": {},
          "stdout": "1\n1\n1\n1\n1\n1\n-1\n0\nCLEAN 1\nLIVE 0\n"
        },
        {
          "id": "c-lab-26-case-3",
          "label": "Case 3",
          "input": "5 A A 999 A A 1 G A A B -1 G B",
          "files": {},
          "stdout": "1\n0\n999\n0\n-1\nCLEAN 1\nLIVE 0\n"
        },
        {
          "id": "c-lab-26-case-4",
          "label": "Case 4",
          "input": "4 A A 2 F A B 2 G A",
          "files": {},
          "stdout": "1\n0\n2\nCLEAN 1\nLIVE 0\n"
        },
        {
          "id": "c-lab-26-case-5",
          "label": "Case 5",
          "input": "2 X X",
          "files": {},
          "stdout": "CLEAN 1\nLIVE 0\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-27",
    "subject": "c",
    "title": "Find the Hidden Grotto",
    "starterCode": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\nint find_path(const int maze[5][5],int sr,int sc,int gr,int gc,int path[25][2]);\n/* Implement the functions above. The game supplies main(). */\n",
    "tests": [],
    "rewards": {
      "money": 3000,
      "berries": [
        {
          "id": "sitrus",
          "count": 4
        }
      ],
      "pokemon": {
        "id": 359,
        "level": 25
      }
    },
    "difficulty": "hard",
    "estimatedMinutes": {
      "min": 60,
      "max": 100
    },
    "chapters": [
      4,
      5,
      6,
      8,
      15
    ],
    "prompt": "Implement int find_path(const int maze[5][5],int sr,int sc,int gr,int gc,int path[25][2]). Cells 0=open and 1=wall. Return path length including start and goal, or 0 if unreachable or coordinates invalid. Use recursive DFS, visiting neighbors up, right, down, left in that order; never revisit a cell. Driver input: sr sc gr gc then 25 row-major cells. Prints length, then path coordinates one per line. The input matrix must not be modified.",
    "published": true,
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "topics": [
      "multi-concept implementation"
    ],
    "recommendedOrder": 29,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 15,
      "prerequisiteChapters": [
        4,
        5,
        6,
        8
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Implement int find_path(const int maze[5][5],int sr,int sc,int gr,int gc,int path[25][2]). Cells 0=open and 1=wall. Return path length including start and goal, or 0 if unreachable or coordinates invalid. Use recursive DFS, visiting neighbors up, right, down, left in that order; never revisit a cell. Driver input: sr sc gr gc then 25 row-major cells. Prints length, then path coordinates one per line. The input matrix must not be modified.",
    "learningObjectives": [
      "Implement int find_path(const int maze[5][5],int sr,int sc,int gr,int gc,int path[25][2]). Cells 0=open and 1=wall. Return path length including start and goal, or 0 if unreachable or coordinates invalid. Use recursive DFS, visiting neighbors up, right, down, left in that order; never revisit a cell. Driver input: sr sc gr gc then 25 row-major cells. Prints length, then path coordinates one per line. The input matrix must not be modified."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "June",
    "story": "Find one safe route to a hidden grotto.",
    "steps": [
      "Use the supplied fixed maze",
      "Reject walls, visited cells and out-of-bounds coordinates",
      "Backtrack the path when a direction fails"
    ],
    "hints": [
      "Mark a cell visited before exploring its neighbors so cycles cannot repeat forever.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "functions",
      "harness": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\n#include \"quest.c\"\nint main(void){int m[5][5],p[25][2],sr,sc,gr,gc;if(scanf(\"%d%d%d%d\",&sr,&sc,&gr,&gc)!=4)return 1;for(int r=0;r<5;r++)for(int c=0;c<5;c++)if(scanf(\"%d\",&m[r][c])!=1)return 1;int n=find_path((const int (*)[5])m,sr,sc,gr,gc,p);if(n<0||n>25)return 1;printf(\"%d\\n\",n);for(int i=0;i<n;i++)printf(\"%d %d\\n\",p[i][0],p[i][1]);return 0;}",
      "tests": [
        {
          "id": "c-lab-27-case-1",
          "label": "Case 1",
          "input": "0 0 4 4 0 0 1 1 1 1 0 0 0 1 1 0 1 0 1 1 0 1 0 0 1 0 0 0 0",
          "files": {},
          "stdout": "9\n0 0\n0 1\n1 1\n1 2\n1 3\n2 3\n3 3\n3 4\n4 4\n"
        },
        {
          "id": "c-lab-27-case-2",
          "label": "Case 2",
          "input": "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
          "files": {},
          "stdout": "1\n0 0\n"
        },
        {
          "id": "c-lab-27-case-3",
          "label": "Case 3",
          "input": "0 0 4 4 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1",
          "files": {},
          "stdout": "0\n"
        },
        {
          "id": "c-lab-27-case-4",
          "label": "Case 4",
          "input": "0 0 4 4 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
          "files": {},
          "stdout": "9\n0 0\n0 1\n0 2\n0 3\n0 4\n1 4\n2 4\n3 4\n4 4\n"
        },
        {
          "id": "c-lab-27-case-5",
          "label": "Case 5",
          "input": "-1 0 4 4 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
          "files": {},
          "stdout": "0\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-28",
    "subject": "c",
    "title": "The Binary PC Archive",
    "starterCode": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\nint write_record(FILE *f,unsigned long species,int level);\nint read_record(FILE *f,unsigned long *species,int *level);\nint record_at(FILE *f,size_t index,unsigned long *species,int *level);\n/* Implement the functions above. The game supplies main(). */\n",
    "tests": [],
    "rewards": {
      "money": 3000,
      "berries": [
        {
          "id": "sitrus",
          "count": 4
        }
      ],
      "pokemon": {
        "id": 137,
        "level": 25
      }
    },
    "difficulty": "hard",
    "estimatedMinutes": {
      "min": 75,
      "max": 120
    },
    "chapters": [
      4,
      5,
      6,
      7,
      8,
      11,
      12,
      13
    ],
    "prompt": "Implement write_record, read_record and record_at. Sandbox ABI: CHAR_BIT=8, unsigned long is 32 bits. Record: species (1-1025) as four little-endian bytes, level (1-100) as two little-endian bytes, no header. Return 1 on success or 0 on invalid data/I/O error. Reads preserve output arguments on failure. record_at validates whole file length is a multiple of six and seeks by 0-based index. Driver input W species level (prints return then written bytes as uppercase hex) or A index (reads archive.bin; prints return species level, initially 7/7). Never write raw structs.",
    "published": true,
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "topics": [
      "multi-concept implementation"
    ],
    "recommendedOrder": 25,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 12,
      "prerequisiteChapters": [
        4,
        5,
        6,
        7,
        8,
        11,
        13
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Implement write_record, read_record and record_at. Sandbox ABI: CHAR_BIT=8, unsigned long is 32 bits. Record: species (1-1025) as four little-endian bytes, level (1-100) as two little-endian bytes, no header. Return 1 on success or 0 on invalid data/I/O error. Reads preserve output arguments on failure. record_at validates whole file length is a multiple of six and seeks by 0-based index. Driver input W species level (prints return then written bytes as uppercase hex) or A index (reads archive.bin; prints return species level, initially 7/7). Never write raw structs.",
    "learningObjectives": [
      "Implement write_record, read_record and record_at. Sandbox ABI: CHAR_BIT=8, unsigned long is 32 bits. Record: species (1-1025) as four little-endian bytes, level (1-100) as two little-endian bytes, no header. Return 1 on success or 0 on invalid data/I/O error. Reads preserve output arguments on failure. record_at validates whole file length is a multiple of six and seeks by 0-based index. Driver input W species level (prints return then written bytes as uppercase hex) or A index (reads archive.bin; prints return species level, initially 7/7). Never write raw structs."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Theo",
    "story": "Build an archive another machine can read without knowing your struct layout.",
    "steps": [
      "Encode each integer into explicit bytes",
      "Check record size and index before seeking",
      "Decode and validate fields after reading"
    ],
    "hints": [
      "Endianness is a property of your format, not something to inherit accidentally from the host.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "functions",
      "harness": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\n#include \"quest.c\"\nint main(void){char c;if(scanf(\" %c\",&c)!=1)return 1;if(c=='W'){unsigned long s;int l;if(scanf(\"%lu%d\",&s,&l)!=2)return 1;FILE *f=fopen(\"out.bin\",\"w+b\");if(!f)return 1;printf(\"%d\\n\",write_record(f,s,l));rewind(f);int b,first=1;while((b=fgetc(f))!=EOF){printf(\"%s%02X\",first?\"\":\" \",b);first=0;}puts(\"\");fclose(f);}else{size_t i;if(scanf(\"%zu\",&i)!=1)return 1;unsigned long s=7;int l=7;FILE *f=fopen(\"archive.bin\",\"rb\");int ok=record_at(f,i,&s,&l);if(f)fclose(f);printf(\"%d %lu %d\\n\",ok,s,l);}return 0;}",
      "tests": [
        {
          "id": "c-lab-28-case-1",
          "label": "Case 1",
          "input": "W 25 5",
          "files": {},
          "stdout": "1\n19 00 00 00 05 00\n"
        },
        {
          "id": "c-lab-28-case-2",
          "label": "Case 2",
          "input": "W 1025 100",
          "files": {},
          "stdout": "1\n01 04 00 00 64 00\n"
        },
        {
          "id": "c-lab-28-case-3",
          "label": "Case 3",
          "input": "W 0 5",
          "files": {},
          "stdout": "0\n\n"
        },
        {
          "id": "c-lab-28-case-4",
          "label": "Case 4",
          "input": "W 25 101",
          "files": {},
          "stdout": "0\n\n"
        },
        {
          "id": "c-lab-28-case-5",
          "label": "Case 5",
          "input": "A 1",
          "files": {
            "archive.bin": [
              25,
              0,
              0,
              0,
              5,
              0,
              1,
              4,
              0,
              0,
              100,
              0
            ]
          },
          "stdout": "1 1025 100\n"
        },
        {
          "id": "c-lab-28-case-6",
          "label": "Case 6",
          "input": "A 2",
          "files": {
            "archive.bin": [
              25,
              0,
              0,
              0,
              5,
              0
            ]
          },
          "stdout": "0 7 7\n"
        },
        {
          "id": "c-lab-28-case-7",
          "label": "Case 7",
          "input": "A 0",
          "files": {
            "archive.bin": [
              25,
              0,
              0,
              0,
              5
            ]
          },
          "stdout": "0 7 7\n"
        },
        {
          "id": "c-lab-28-case-8",
          "label": "Case 8",
          "input": "A 0",
          "files": {
            "archive.bin": [
              0,
              0,
              0,
              0,
              5,
              0
            ]
          },
          "stdout": "0 7 7\n"
        },
        {
          "id": "c-lab-28-case-9",
          "label": "Case 9",
          "input": "A 0",
          "files": {},
          "stdout": "0 7 7\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-29",
    "subject": "c",
    "title": "Practice Battle Simulator",
    "starterCode": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\ntypedef struct {int hp[2][2];int active[2];int potions[2];int turn;int winner;} Battle;\nint battle_act(Battle *b,char action,int target);\n/* Implement the functions above. The game supplies main(). */\n",
    "tests": [],
    "rewards": {
      "money": 3000,
      "berries": [
        {
          "id": "sitrus",
          "count": 4
        }
      ],
      "pokemon": {
        "id": 374,
        "level": 25
      }
    },
    "difficulty": "hard",
    "estimatedMinutes": {
      "min": 75,
      "max": 120
    },
    "chapters": [
      4,
      5,
      6,
      8,
      11
    ],
    "prompt": "Implement battle_act(Battle*,char action,int target) returning 1 on valid action, 0 with no state change otherwise. Initial state: both teams have two Pokemon at 40 HP, active indices 0, one potion each, turn 0, winner -1. A attacks for 17 damage; H heals active Pokemon by 20, clamped to 40, consumes one potion (invalid at full HP); S switches to living target index 0 or 1 (invalid if already active). Valid actions consume a turn. A faint automatically selects the first living teammate for free. If both opposing Pokemon faint, set winner to attacker and leave turn there. No actions after a winner. Driver prints result turn winner active0 active1 potions0 potions1 hp00 hp01 hp10 hp11 after each command. Input: count followed by action and target (use 0 for A/H).",
    "published": true,
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "topics": [
      "multi-concept implementation"
    ],
    "recommendedOrder": 21,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 11,
      "prerequisiteChapters": [
        4,
        5,
        6,
        8
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Implement battle_act(Battle*,char action,int target) returning 1 on valid action, 0 with no state change otherwise. Initial state: both teams have two Pokemon at 40 HP, active indices 0, one potion each, turn 0, winner -1. A attacks for 17 damage; H heals active Pokemon by 20, clamped to 40, consumes one potion (invalid at full HP); S switches to living target index 0 or 1 (invalid if already active). Valid actions consume a turn. A faint automatically selects the first living teammate for free. If both opposing Pokemon faint, set winner to attacker and leave turn there. No actions after a winner. Driver prints result turn winner active0 active1 potions0 potions1 hp00 hp01 hp10 hp11 after each command. Input: count followed by action and target (use 0 for A/H).",
    "learningObjectives": [
      "Implement battle_act(Battle*,char action,int target) returning 1 on valid action, 0 with no state change otherwise. Initial state: both teams have two Pokemon at 40 HP, active indices 0, one potion each, turn 0, winner -1. A attacks for 17 damage; H heals active Pokemon by 20, clamped to 40, consumes one potion (invalid at full HP); S switches to living target index 0 or 1 (invalid if already active). Valid actions consume a turn. A faint automatically selects the first living teammate for free. If both opposing Pokemon faint, set winner to attacker and leave turn there. No actions after a winner. Driver prints result turn winner active0 active1 potions0 potions1 hp00 hp01 hp10 hp11 after each command. Input: count followed by action and target (use 0 for A/H)."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Rowan",
    "story": "Test a battle plan where the same choices always produce the same result.",
    "steps": [
      "Store each team's state in structs",
      "Validate an action before advancing the turn",
      "Check for fainting and the end of battle after each action"
    ],
    "hints": [
      "Keep damage calculation separate from state changes. No randomness is needed.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "functions",
      "harness": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\n#include \"quest.c\"\nint main(void){Battle b={{{40,40},{40,40}},{0,0},{1,1},0,-1};int n;if(scanf(\"%d\",&n)!=1)return 1;for(int i=0;i<n;i++){char c;int v;if(scanf(\" %c%d\",&c,&v)!=2)return 1;int ok=battle_act(&b,c,v);printf(\"%d %d %d %d %d %d %d %d %d %d %d\\n\",ok,b.turn,b.winner,b.active[0],b.active[1],b.potions[0],b.potions[1],b.hp[0][0],b.hp[0][1],b.hp[1][0],b.hp[1][1]);}return 0;}",
      "tests": [
        {
          "id": "c-lab-29-case-1",
          "label": "Case 1",
          "input": "1 A 0",
          "files": {},
          "stdout": "1 1 -1 0 0 1 1 40 40 23 40\n"
        },
        {
          "id": "c-lab-29-case-2",
          "label": "Case 2",
          "input": "5 H 0 S 0 S 2 X 0 A 0",
          "files": {},
          "stdout": "0 0 -1 0 0 1 1 40 40 40 40\n0 0 -1 0 0 1 1 40 40 40 40\n0 0 -1 0 0 1 1 40 40 40 40\n0 0 -1 0 0 1 1 40 40 40 40\n1 1 -1 0 0 1 1 40 40 23 40\n"
        },
        {
          "id": "c-lab-29-case-3",
          "label": "Case 3",
          "input": "5 A 0 H 0 A 0 H 0 A 0",
          "files": {},
          "stdout": "1 1 -1 0 0 1 1 40 40 23 40\n1 0 -1 0 0 1 0 40 40 40 40\n1 1 -1 0 0 1 0 40 40 23 40\n0 1 -1 0 0 1 0 40 40 23 40\n1 0 -1 0 0 1 0 23 40 23 40\n"
        },
        {
          "id": "c-lab-29-case-4",
          "label": "Case 4",
          "input": "20 A 0 A 0 A 0 A 0 A 0 A 0 A 0 A 0 A 0 A 0 A 0 A 0 A 0 A 0 A 0 A 0 A 0 A 0 A 0 A 0",
          "files": {},
          "stdout": "1 1 -1 0 0 1 1 40 40 23 40\n1 0 -1 0 0 1 1 23 40 23 40\n1 1 -1 0 0 1 1 23 40 6 40\n1 0 -1 0 0 1 1 6 40 6 40\n1 1 -1 0 1 1 1 6 40 0 40\n1 0 -1 1 1 1 1 0 40 0 40\n1 1 -1 1 1 1 1 0 40 0 23\n1 0 -1 1 1 1 1 0 23 0 23\n1 1 -1 1 1 1 1 0 23 0 6\n1 0 -1 1 1 1 1 0 6 0 6\n1 0 0 1 1 1 1 0 6 0 0\n0 0 0 1 1 1 1 0 6 0 0\n0 0 0 1 1 1 1 0 6 0 0\n0 0 0 1 1 1 1 0 6 0 0\n0 0 0 1 1 1 1 0 6 0 0\n0 0 0 1 1 1 1 0 6 0 0\n0 0 0 1 1 1 1 0 6 0 0\n0 0 0 1 1 1 1 0 6 0 0\n0 0 0 1 1 1 1 0 6 0 0\n0 0 0 1 1 1 1 0 6 0 0\n"
        },
        {
          "id": "c-lab-29-case-5",
          "label": "Case 5",
          "input": "4 S 1 A 0 S 0 H 0",
          "files": {},
          "stdout": "1 1 -1 1 0 1 1 40 40 40 40\n1 0 -1 1 0 1 1 40 23 40 40\n1 1 -1 0 0 1 1 40 23 40 40\n0 1 -1 0 0 1 1 40 23 40 40\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-30",
    "subject": "c",
    "title": "Run Your Own Poke Mart",
    "starterCode": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\ntypedef struct {char name[21];unsigned stock,price;} StockItem;\ntypedef struct {StockItem *data;size_t count,capacity;unsigned long revenue;} Shop;\nint shop_init(Shop *s);\nvoid shop_destroy(Shop *s);\nint shop_find(const Shop *s,const char *name);\nint shop_add(Shop *s,const char *name,unsigned stock,unsigned price);\nint shop_restock(Shop *s,const char *name,unsigned count);\nint shop_sell(Shop *s,const char *name,unsigned count);\nint shop_save(const Shop *s,const char *path);\nint shop_load(Shop *s,const char *path);\n/* Implement the functions above. The game supplies main(). */\n",
    "tests": [],
    "rewards": {
      "money": 3000,
      "berries": [
        {
          "id": "sitrus",
          "count": 4
        }
      ],
      "pokemon": {
        "id": 147,
        "level": 25
      }
    },
    "difficulty": "hard",
    "estimatedMinutes": {
      "min": 90,
      "max": 120
    },
    "chapters": [
      4,
      5,
      6,
      9,
      10,
      11,
      12
    ],
    "prompt": "Implement the Shop functions in the starter. init creates empty shop (capacity 2, revenue 0); destroy frees and zeros fields. Capacity doubles up to 20. Names 1-20 ASCII letters, case-sensitive and unique; stock 0-999, price 0-100000 cents. add/restock/sell/save/load return 1 on success, 0 otherwise with no state change. find returns index or -1. Selling checks stock and unsigned-long revenue overflow (32-bit ULONG_MAX=4294967295). Text file shop.txt: first line revenue, then name,stock,price lines. Transactional load rejects malformed/duplicate/over-capacity records. Driver commands: A name stock price; R name count; B name count; G name; S save; L load; F fail next allocation. G prints stock price or MISSING. Other actions print return code; ends with REVENUE value and LIVE count after cleanup. Input begins with command count.",
    "published": true,
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "topics": [
      "multi-concept implementation"
    ],
    "recommendedOrder": 30,
    "schemaVersion": 4,
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 12,
      "prerequisiteChapters": [
        4,
        5,
        6,
        9,
        10,
        11
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Implement the Shop functions in the starter. init creates empty shop (capacity 2, revenue 0); destroy frees and zeros fields. Capacity doubles up to 20. Names 1-20 ASCII letters, case-sensitive and unique; stock 0-999, price 0-100000 cents. add/restock/sell/save/load return 1 on success, 0 otherwise with no state change. find returns index or -1. Selling checks stock and unsigned-long revenue overflow (32-bit ULONG_MAX=4294967295). Text file shop.txt: first line revenue, then name,stock,price lines. Transactional load rejects malformed/duplicate/over-capacity records. Driver commands: A name stock price; R name count; B name count; G name; S save; L load; F fail next allocation. G prints stock price or MISSING. Other actions print return code; ends with REVENUE value and LIVE count after cleanup. Input begins with command count.",
    "learningObjectives": [
      "Implement the Shop functions in the starter. init creates empty shop (capacity 2, revenue 0); destroy frees and zeros fields. Capacity doubles up to 20. Names 1-20 ASCII letters, case-sensitive and unique; stock 0-999, price 0-100000 cents. add/restock/sell/save/load return 1 on success, 0 otherwise with no state change. find returns index or -1. Selling checks stock and unsigned-long revenue overflow (32-bit ULONG_MAX=4294967295). Text file shop.txt: first line revenue, then name,stock,price lines. Transactional load rejects malformed/duplicate/over-capacity records. Driver commands: A name stock price; R name count; B name count; G name; S save; L load; F fail next allocation. G prints stock price or MISSING. Other actions print return code; ends with REVENUE value and LIVE count after cleanup. Input begins with command count."
    ],
    "language": {
      "standard": "C11",
      "extensions": false,
      "buildFlags": [
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-Wpedantic"
      ]
    },
    "validation": {
      "mode": "autograder",
      "publicationReady": true
    },
    "rewardPolicy": {
      "status": "ready",
      "eligibleTypes": [
        "money",
        "berries",
        "rarePokemon"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Wren",
    "story": "Run a tiny Poke Mart from opening stock to the final saved ledger.",
    "steps": [
      "Reuse dynamic storage, parsing and file helpers",
      "Validate a transaction completely before changing stock or money",
      "Load into temporary storage before replacing live data"
    ],
    "hints": [
      "Treat a sale as one operation: either every check succeeds and both values change, or neither changes.",
      "Implement the exact contract above. For function labs, keep the starter types and signatures; the game supplies main().",
      "Use Run with the sample input, then test boundaries. Submit compares every output byte; extra spaces or missing newlines fail."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "functions",
      "harness": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\nstatic void *allocations[256];\nstatic int fail_next=0;\nstatic int live_blocks(void){int n=0;for(int i=0;i<256;i++)n+=allocations[i]!=NULL;return n;}\nstatic void remember(void *p){if(!p)return;for(int i=0;i<256;i++)if(!allocations[i]){allocations[i]=p;return;}abort();}\nstatic void forget(void *p){if(!p)return;for(int i=0;i<256;i++)if(allocations[i]==p){allocations[i]=NULL;return;}abort();}\nstatic void *q_malloc(size_t n){if(fail_next){fail_next=0;return NULL;}void *p=malloc(n);remember(p);return p;}\nstatic void *q_calloc(size_t n,size_t s){if(fail_next){fail_next=0;return NULL;}void *p=calloc(n,s);remember(p);return p;}\nstatic void *q_realloc(void *p,size_t n){if(fail_next){fail_next=0;return NULL;}void *old=p;void *next=realloc(p,n);if(next||!n){forget(old);remember(next);}return next;}\nstatic void q_free(void *p){forget(p);free(p);}\n#define malloc q_malloc\n#define calloc q_calloc\n#define realloc q_realloc\n#define free q_free\n\n#include \"quest.c\"\n\n#undef malloc\n#undef calloc\n#undef realloc\n#undef free\nstatic void track_ready(void){(void)q_malloc;(void)q_calloc;(void)q_realloc;(void)q_free;}\nint main(void){track_ready();Shop s={0};if(!shop_init(&s))return 1;int n;if(scanf(\"%d\",&n)!=1)return 1;for(int i=0;i<n;i++){char c,name[21];unsigned a,b;if(scanf(\" %c\",&c)!=1)return 1;if(c=='F'){fail_next=1;continue;}if(c=='S'||c=='L'){printf(\"%d\\n\",c=='S'?shop_save(&s,\"shop.txt\"):shop_load(&s,\"shop.txt\"));continue;}if(scanf(\"%20s\",name)!=1)return 1;if(c=='G'){int k=shop_find(&s,name);if(k<0)puts(\"MISSING\");else printf(\"%u %u\\n\",s.data[k].stock,s.data[k].price);continue;}if(scanf(\"%u\",&a)!=1)return 1;if(c=='A'){if(scanf(\"%u\",&b)!=1)return 1;printf(\"%d\\n\",shop_add(&s,name,a,b));}else printf(\"%d\\n\",c=='R'?shop_restock(&s,name,a):shop_sell(&s,name,a));}printf(\"REVENUE %lu\\n\",s.revenue);shop_destroy(&s);printf(\"LIVE %d\\n\",live_blocks());return 0;}",
      "tests": [
        {
          "id": "c-lab-30-case-1",
          "label": "Case 1",
          "input": "5 A Potion 3 200 B Potion 2 G Potion B Potion 2 G Potion",
          "files": {},
          "stdout": "1\n1\n1 200\n0\n1 200\nREVENUE 400\nLIVE 0\n"
        },
        {
          "id": "c-lab-30-case-2",
          "label": "Case 2",
          "input": "6 A A 999 100 A A 1 2 R A 1 B Missing 1 S L",
          "files": {},
          "stdout": "1\n0\n0\n0\n1\n1\nREVENUE 0\nLIVE 0\n"
        },
        {
          "id": "c-lab-30-case-3",
          "label": "Case 3",
          "input": "6 A A 1 2 A B 1 3 F A C 1 4 G A G C",
          "files": {},
          "stdout": "1\n1\n0\n1 2\nMISSING\nREVENUE 0\nLIVE 0\n"
        },
        {
          "id": "c-lab-30-case-4",
          "label": "Case 4",
          "input": "4 L G A B A 1 G A",
          "files": {
            "shop.txt": "4294967295\nA,2,1\n"
          },
          "stdout": "1\n2 1\n0\n2 1\nREVENUE 4294967295\nLIVE 0\n"
        },
        {
          "id": "c-lab-30-case-5",
          "label": "Case 5",
          "input": "3 A Keep 2 3 L G Keep",
          "files": {
            "shop.txt": "0\nBad,5,1\nBad,2,1\n"
          },
          "stdout": "1\n0\n2 3\nREVENUE 0\nLIVE 0\n"
        },
        {
          "id": "c-lab-30-case-6",
          "label": "Case 6",
          "input": "3 A Keep 2 3 L G Keep",
          "files": {
            "shop.txt": "oops\n"
          },
          "stdout": "1\n0\n2 3\nREVENUE 0\nLIVE 0\n"
        },
        {
          "id": "c-lab-30-case-7",
          "label": "Case 7",
          "input": "4 A A 2 3 S B A 1 L",
          "files": {},
          "stdout": "1\n1\n1\n1\nREVENUE 0\nLIVE 0\n"
        }
      ]
    }
  }
];
