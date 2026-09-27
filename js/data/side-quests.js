// C11 Side Quest labs with exact executable autograder contracts.
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
  },
  {
    "id": "c-lab-31",
    "subject": "c",
    "title": "The Build Line",
    "topics": [
      "intro to computers",
      "compilation pipeline",
      "memory"
    ],
    "published": true,
    "prompt": "Input: memory size K in kilobytes (1-4096) and word size W in bytes (1, 2, 4 or 8). First print the five steps that turn a C source file into a running program, one per line as Step N: name, using the names linker, editor, loader, translator and preprocessor, in the order the work actually happens. Then print Memory: K KB = B bytes = b bits, Addresses: 0 to A, and Words: N, where 1 KB is 1024 bytes, 1 byte is 8 bits, every byte has its own address counting from 0, and N is B divided by W. Missing or invalid input prints only ERROR. Every line ends with a newline.",
    "starterCode": "#include <stdio.h>\n\nint main(void)\n{\n    /* Write your implementation here. */\n    return 0;\n}\n",
    "tests": [],
    "rewards": {
      "money": 600,
      "berries": [
        {
          "id": "potion",
          "count": 2
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
    "recommendedOrder": 31,
    "schemaVersion": 4,
    "collection": "midterm-review",
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 1,
      "prerequisiteChapters": [],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Input: memory size K in kilobytes (1-4096) and word size W in bytes (1, 2, 4 or 8). First print the five steps that turn a C source file into a running program, one per line as Step N: name, using the names linker, editor, loader, translator and preprocessor, in the order the work actually happens. Then print Memory: K KB = B bytes = b bits, Addresses: 0 to A, and Words: N, where 1 KB is 1024 bytes, 1 byte is 8 bits, every byte has its own address counting from 0, and N is B divided by W. Missing or invalid input prints only ERROR. Every line ends with a newline.",
    "learningObjectives": [
      "Input: memory size K in kilobytes (1-4096) and word size W in bytes (1, 2, 4 or 8). First print the five steps that turn a C source file into a running program, one per line as Step N: name, using the names linker, editor, loader, translator and preprocessor, in the order the work actually happens. Then print Memory: K KB = B bytes = b bits, Addresses: 0 to A, and Words: N, where 1 KB is 1024 bytes, 1 byte is 8 bits, every byte has its own address counting from 0, and N is B divided by W. Missing or invalid input prints only ERROR. Every line ends with a newline."
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
    "story": "Theo is bringing the repair shop's old terminal back to life and wants its start-up screen to say how a program gets built and how much memory it has.",
    "steps": [
      "Read K and W and reject bad values first",
      "Print the five build steps in order",
      "Work out bytes, bits, the last address and the word count"
    ],
    "hints": [
      "The compiler is really two programs: the preprocessor runs first, then the translator makes an object module. The linker adds library code; the loader puts the executable in memory.",
      "One kilobyte is 1024 bytes and one byte is 8 bits. With B bytes the addresses run from 0 to B - 1.",
      "Check every input rule before printing the first Step line, because an invalid run prints only ERROR."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "program",
      "harness": "",
      "tests": [
        {
          "id": "c-lab-31-case-1",
          "label": "Case 1",
          "input": "64 4",
          "files": {},
          "stdout": "Step 1: editor\nStep 2: preprocessor\nStep 3: translator\nStep 4: linker\nStep 5: loader\nMemory: 64 KB = 65536 bytes = 524288 bits\nAddresses: 0 to 65535\nWords: 16384\n"
        },
        {
          "id": "c-lab-31-case-2",
          "label": "Case 2",
          "input": "1 1",
          "files": {},
          "stdout": "Step 1: editor\nStep 2: preprocessor\nStep 3: translator\nStep 4: linker\nStep 5: loader\nMemory: 1 KB = 1024 bytes = 8192 bits\nAddresses: 0 to 1023\nWords: 1024\n"
        },
        {
          "id": "c-lab-31-case-3",
          "label": "Case 3",
          "input": "4096 8",
          "files": {},
          "stdout": "Step 1: editor\nStep 2: preprocessor\nStep 3: translator\nStep 4: linker\nStep 5: loader\nMemory: 4096 KB = 4194304 bytes = 33554432 bits\nAddresses: 0 to 4194303\nWords: 524288\n"
        },
        {
          "id": "c-lab-31-case-4",
          "label": "Case 4",
          "input": "3 2",
          "files": {},
          "stdout": "Step 1: editor\nStep 2: preprocessor\nStep 3: translator\nStep 4: linker\nStep 5: loader\nMemory: 3 KB = 3072 bytes = 24576 bits\nAddresses: 0 to 3071\nWords: 1536\n"
        },
        {
          "id": "c-lab-31-case-5",
          "label": "Case 5",
          "input": "0 4",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-31-case-6",
          "label": "Case 6",
          "input": "4097 1",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-31-case-7",
          "label": "Case 7",
          "input": "16 3",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-31-case-8",
          "label": "Case 8",
          "input": "",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-31-case-9",
          "label": "Case 9",
          "input": "8 x",
          "files": {},
          "stdout": "ERROR\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-32",
    "subject": "c",
    "title": "Exactly As Printed",
    "topics": [
      "printf",
      "scanf",
      "format specifiers",
      "input buffer"
    ],
    "published": true,
    "prompt": "Input: an int, a double and one non-space character, separated by spaces or newlines. Print seven lines: the int right-aligned in a field 6 wide, then left-aligned in a field 6 wide, then zero-padded to width 6, each inside square brackets; the double with 2 decimals in brackets, then with 3 decimals right-aligned in a field 10 wide in brackets; the character in brackets followed by code and its ASCII value; and finally the int followed by a percent sign. If the three values cannot all be read, print only ERROR. The expected output for each fixture shows the exact layout.",
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
      7
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 32,
    "schemaVersion": 4,
    "collection": "midterm-review",
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
    "implementationContract": "Input: an int, a double and one non-space character, separated by spaces or newlines. Print seven lines: the int right-aligned in a field 6 wide, then left-aligned in a field 6 wide, then zero-padded to width 6, each inside square brackets; the double with 2 decimals in brackets, then with 3 decimals right-aligned in a field 10 wide in brackets; the character in brackets followed by code and its ASCII value; and finally the int followed by a percent sign. If the three values cannot all be read, print only ERROR. The expected output for each fixture shows the exact layout.",
    "learningObjectives": [
      "Input: an int, a double and one non-space character, separated by spaces or newlines. Print seven lines: the int right-aligned in a field 6 wide, then left-aligned in a field 6 wide, then zero-padded to width 6, each inside square brackets; the double with 2 decimals in brackets, then with 3 decimals right-aligned in a field 10 wide in brackets; the character in brackets followed by code and its ASCII value; and finally the int followed by a percent sign. If the three values cannot all be read, print only ERROR. The expected output for each fixture shows the exact layout."
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
    "giver": "Coral",
    "story": "Coral's swim-club board prints results in tidy columns, and Ink has volunteered to check every character of it.",
    "steps": [
      "Read an int, a double and a char with one scanf",
      "Print the int three ways, the double two ways",
      "Print the char, its code and a percent sign"
    ],
    "hints": [
      "scanf needs %lf for a double; printf prints a double with %f.",
      "%c reads the very next character, even a newline left in the buffer. A space before it (\" %c\") skips whitespace first.",
      "Width is a minimum, not a maximum: a number wider than the field is printed in full. Test with the long-number fixture."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "program",
      "harness": "",
      "tests": [
        {
          "id": "c-lab-32-case-1",
          "label": "Case 1",
          "input": "42 3.14159 A",
          "files": {},
          "stdout": "[    42]\n[42    ]\n[000042]\n[3.14]\n[     3.142]\n[A] code 65\n42%\n"
        },
        {
          "id": "c-lab-32-case-2",
          "label": "Case 2",
          "input": "42\n3.14159\nA\n",
          "files": {},
          "stdout": "[    42]\n[42    ]\n[000042]\n[3.14]\n[     3.142]\n[A] code 65\n42%\n"
        },
        {
          "id": "c-lab-32-case-3",
          "label": "Case 3",
          "input": "-7 -0.5 q",
          "files": {},
          "stdout": "[    -7]\n[-7    ]\n[-00007]\n[-0.50]\n[    -0.500]\n[q] code 113\n-7%\n"
        },
        {
          "id": "c-lab-32-case-4",
          "label": "Case 4",
          "input": "0 0 0",
          "files": {},
          "stdout": "[     0]\n[0     ]\n[000000]\n[0.00]\n[     0.000]\n[0] code 48\n0%\n"
        },
        {
          "id": "c-lab-32-case-5",
          "label": "Case 5",
          "input": "123456789 1234.5 z",
          "files": {},
          "stdout": "[123456789]\n[123456789]\n[123456789]\n[1234.50]\n[  1234.500]\n[z] code 122\n123456789%\n"
        },
        {
          "id": "c-lab-32-case-6",
          "label": "Case 6",
          "input": "5 2.675\n\n  #",
          "files": {},
          "stdout": "[     5]\n[5     ]\n[000005]\n[2.67]\n[     2.675]\n[#] code 35\n5%\n"
        },
        {
          "id": "c-lab-32-case-7",
          "label": "Case 7",
          "input": "12 x A",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-32-case-8",
          "label": "Case 8",
          "input": "",
          "files": {},
          "stdout": "ERROR\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-33",
    "subject": "c",
    "title": "One More Thing in the Bag",
    "topics": [
      "data types",
      "sizeof",
      "overflow",
      "representation"
    ],
    "published": true,
    "prompt": "Input: ints a and b (each 0 to 2147483647), a load u (0-255), a step count k (0-1000) and an int n (0 to 100000000). Print six lines. sizes: char 1 short 2 int 4 long long 8 float 4 double 8, with every number produced by sizeof (print a size_t with %zu). limits: INT_MAX X INT_MIN Y, using limits.h. sum: S where S is a + b, or sum: OVERFLOW when that sum does not fit in an int; decide without performing an overflowing signed addition, which is undefined behavior. half: H D where H is a / 2 in int arithmetic and D is a / 2.0 with one decimal. wrap: W, the value of an unsigned char that starts at u after it is increased by 1, k times (unsigned arithmetic wraps from 255 back to 0). float: F, the int you get back after storing n in a float variable. Invalid or missing input prints only ERROR.",
    "starterCode": "#include <stdio.h>\n\nint main(void)\n{\n    /* Write your implementation here. */\n    return 0;\n}\n",
    "tests": [],
    "rewards": {
      "money": 1400,
      "berries": [
        {
          "id": "sitrus",
          "count": 2
        },
        {
          "id": "oran",
          "count": 1
        }
      ],
      "pokemon": null,
      "keepsake": "rollover-odometer"
    },
    "difficulty": "medium",
    "estimatedMinutes": {
      "min": 30,
      "max": 45
    },
    "chapters": [
      2,
      3
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 33,
    "schemaVersion": 4,
    "collection": "midterm-review",
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
    "implementationContract": "Input: ints a and b (each 0 to 2147483647), a load u (0-255), a step count k (0-1000) and an int n (0 to 100000000). Print six lines. sizes: char 1 short 2 int 4 long long 8 float 4 double 8, with every number produced by sizeof (print a size_t with %zu). limits: INT_MAX X INT_MIN Y, using limits.h. sum: S where S is a + b, or sum: OVERFLOW when that sum does not fit in an int; decide without performing an overflowing signed addition, which is undefined behavior. half: H D where H is a / 2 in int arithmetic and D is a / 2.0 with one decimal. wrap: W, the value of an unsigned char that starts at u after it is increased by 1, k times (unsigned arithmetic wraps from 255 back to 0). float: F, the int you get back after storing n in a float variable. Invalid or missing input prints only ERROR.",
    "learningObjectives": [
      "Input: ints a and b (each 0 to 2147483647), a load u (0-255), a step count k (0-1000) and an int n (0 to 100000000). Print six lines. sizes: char 1 short 2 int 4 long long 8 float 4 double 8, with every number produced by sizeof (print a size_t with %zu). limits: INT_MAX X INT_MIN Y, using limits.h. sum: S where S is a + b, or sum: OVERFLOW when that sum does not fit in an int; decide without performing an overflowing signed addition, which is undefined behavior. half: H D where H is a / 2 in int arithmetic and D is a / 2.0 with one decimal. wrap: W, the value of an unsigned char that starts at u after it is increased by 1, k times (unsigned arithmetic wraps from 255 back to 0). float: F, the int you get back after storing n in a float variable. Invalid or missing input prints only ERROR."
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
        "rarePokemon",
        "keepsake"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Ida Overflow",
    "story": "Ida Overflow always packs one more thing than the bag can hold. Before the next trip, measure exactly what each type can carry.",
    "steps": [
      "Print sizes with sizeof and limits from limits.h",
      "Test for int overflow before adding",
      "Show int versus double division, unsigned wraparound and float rounding"
    ],
    "hints": [
      "With a and b both non-negative, a + b overflows exactly when a > INT_MAX - b. Test that before adding.",
      "An unsigned char holds 0-255; adding past 255 wraps to 0, and that wrap is well defined. Signed overflow is not.",
      "A float keeps 24 bits of precision, so 16777217 comes back as 16777216. Store n in a float variable, then cast it back to int."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "program",
      "harness": "",
      "tests": [
        {
          "id": "c-lab-33-case-1",
          "label": "Case 1",
          "input": "7 5 250 10 16777217",
          "files": {},
          "stdout": "sizes: char 1 short 2 int 4 long long 8 float 4 double 8\nlimits: INT_MAX 2147483647 INT_MIN -2147483648\nsum: 12\nhalf: 3 3.5\nwrap: 4\nfloat: 16777216\n"
        },
        {
          "id": "c-lab-33-case-2",
          "label": "Case 2",
          "input": "2147483647 0 0 0 0",
          "files": {},
          "stdout": "sizes: char 1 short 2 int 4 long long 8 float 4 double 8\nlimits: INT_MAX 2147483647 INT_MIN -2147483648\nsum: 2147483647\nhalf: 1073741823 1073741823.5\nwrap: 0\nfloat: 0\n"
        },
        {
          "id": "c-lab-33-case-3",
          "label": "Case 3",
          "input": "2147483647 1 255 1 100000000",
          "files": {},
          "stdout": "sizes: char 1 short 2 int 4 long long 8 float 4 double 8\nlimits: INT_MAX 2147483647 INT_MIN -2147483648\nsum: OVERFLOW\nhalf: 1073741823 1073741823.5\nwrap: 0\nfloat: 100000000\n"
        },
        {
          "id": "c-lab-33-case-4",
          "label": "Case 4",
          "input": "1073741824 1073741824 128 1000 16777219",
          "files": {},
          "stdout": "sizes: char 1 short 2 int 4 long long 8 float 4 double 8\nlimits: INT_MAX 2147483647 INT_MIN -2147483648\nsum: OVERFLOW\nhalf: 536870912 536870912.0\nwrap: 104\nfloat: 16777220\n"
        },
        {
          "id": "c-lab-33-case-5",
          "label": "Case 5",
          "input": "1073741823 1073741824 0 256 33554435",
          "files": {},
          "stdout": "sizes: char 1 short 2 int 4 long long 8 float 4 double 8\nlimits: INT_MAX 2147483647 INT_MIN -2147483648\nsum: 2147483647\nhalf: 536870911 536870911.5\nwrap: 0\nfloat: 33554436\n"
        },
        {
          "id": "c-lab-33-case-6",
          "label": "Case 6",
          "input": "0 0 300 1 5",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-33-case-7",
          "label": "Case 7",
          "input": "5 -1 0 0 0",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-33-case-8",
          "label": "Case 8",
          "input": "1 2 3 4",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-33-case-9",
          "label": "Case 9",
          "input": "9 9 0 0 100000001",
          "files": {},
          "stdout": "ERROR\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-34",
    "subject": "c",
    "title": "Locker Label Cipher",
    "topics": [
      "char",
      "ASCII",
      "ctype.h",
      "character arithmetic"
    ],
    "published": true,
    "prompt": "Input: a shift k (0-25) on the first line, then one line of text (at most 200 characters) that ends at a newline or at the end of input. Ignore anything else on the first line after k. Print the text with every letter moved k places forward in the alphabet, keeping its case (z wraps around to a) and every other character unchanged, then a newline. Then print upper U lower L digits D spaces S other O for the original text (spaces counts only the space character; other counts everything that is not a letter, digit or space), and digit sum: T, the sum of the digit characters' values (the character 7 adds 7). The newline that ends the text is not part of it. An invalid k prints only ERROR.",
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
      "max": 29
    },
    "chapters": [
      2,
      7
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 34,
    "schemaVersion": 4,
    "collection": "midterm-review",
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
    "implementationContract": "Input: a shift k (0-25) on the first line, then one line of text (at most 200 characters) that ends at a newline or at the end of input. Ignore anything else on the first line after k. Print the text with every letter moved k places forward in the alphabet, keeping its case (z wraps around to a) and every other character unchanged, then a newline. Then print upper U lower L digits D spaces S other O for the original text (spaces counts only the space character; other counts everything that is not a letter, digit or space), and digit sum: T, the sum of the digit characters' values (the character 7 adds 7). The newline that ends the text is not part of it. An invalid k prints only ERROR.",
    "learningObjectives": [
      "Input: a shift k (0-25) on the first line, then one line of text (at most 200 characters) that ends at a newline or at the end of input. Ignore anything else on the first line after k. Print the text with every letter moved k places forward in the alphabet, keeping its case (z wraps around to a) and every other character unchanged, then a newline. Then print upper U lower L digits D spaces S other O for the original text (spaces counts only the space character; other counts everything that is not a letter, digit or space), and digit sum: T, the sum of the digit characters' values (the character 7 adds 7). The newline that ends the text is not part of it. An invalid k prints only ERROR."
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
    "giver": "Nula Terminel",
    "story": "Nula Terminel labels every locker at Terminator Glade in a gentle letter-shift code. Write the encoder and a tally of what each label contains.",
    "steps": [
      "Read k, then skip the rest of that line",
      "Read the text one character at a time with getchar",
      "Shift letters, count categories and add up digit values"
    ],
    "hints": [
      "scanf(\"%d\") leaves the newline in the buffer. Read and discard characters until you reach it before the text starts.",
      "For a lowercase c, (c - 'a' + k) % 26 is its position after shifting; add 'a' back to get a character.",
      "c - '0' turns a digit character into its value, so '7' - '0' is 7."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "program",
      "harness": "",
      "tests": [
        {
          "id": "c-lab-34-case-1",
          "label": "Case 1",
          "input": "3\nHello, World 42!\n",
          "files": {},
          "stdout": "Khoor, Zruog 42!\nupper 2 lower 8 digits 2 spaces 2 other 2\ndigit sum: 6\n"
        },
        {
          "id": "c-lab-34-case-2",
          "label": "Case 2",
          "input": "25\nabc XYZ\n",
          "files": {},
          "stdout": "zab WXY\nupper 3 lower 3 digits 0 spaces 1 other 0\ndigit sum: 0\n"
        },
        {
          "id": "c-lab-34-case-3",
          "label": "Case 3",
          "input": "0\nNo change 123\n",
          "files": {},
          "stdout": "No change 123\nupper 1 lower 7 digits 3 spaces 2 other 0\ndigit sum: 6\n"
        },
        {
          "id": "c-lab-34-case-4",
          "label": "Case 4",
          "input": "13\nzZ9 \n",
          "files": {},
          "stdout": "mM9 \nupper 1 lower 1 digits 1 spaces 1 other 0\ndigit sum: 9\n"
        },
        {
          "id": "c-lab-34-case-5",
          "label": "Case 5",
          "input": "5\n\n",
          "files": {},
          "stdout": "\nupper 0 lower 0 digits 0 spaces 0 other 0\ndigit sum: 0\n"
        },
        {
          "id": "c-lab-34-case-6",
          "label": "Case 6",
          "input": "26\nabc\n",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-34-case-7",
          "label": "Case 7",
          "input": "-1\nabc\n",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-34-case-8",
          "label": "Case 8",
          "input": "1\nTab\there",
          "files": {},
          "stdout": "Ubc\tifsf\nupper 1 lower 6 digits 0 spaces 0 other 1\ndigit sum: 0\n"
        },
        {
          "id": "c-lab-34-case-9",
          "label": "Case 9",
          "input": "7 extra words\nMixed 0 & 9\n",
          "files": {},
          "stdout": "Tpelk 0 & 9\nupper 1 lower 4 digits 2 spaces 3 other 1\ndigit sum: 9\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-35",
    "subject": "c",
    "title": "The Watering Calendar",
    "topics": [
      "modulus",
      "integer division",
      "divisibility"
    ],
    "published": true,
    "prompt": "Input: a day number d (1-100000) and a length of time m in minutes (0-1000000). Print four lines: week W day D, where the calendar runs in weeks of 7 days starting at week 1 day 1 (so day 8 is week 2 day 1); water YES when d is a multiple of 3, otherwise water NO; feed YES when d is a multiple of 5, otherwise feed NO; and time X days HH:MM, splitting m into whole days, hours (00-23) and minutes (00-59) with hours and minutes always printed as two digits. Invalid or missing input prints only ERROR.",
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
      3
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 35,
    "schemaVersion": 4,
    "collection": "midterm-review",
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
    "implementationContract": "Input: a day number d (1-100000) and a length of time m in minutes (0-1000000). Print four lines: week W day D, where the calendar runs in weeks of 7 days starting at week 1 day 1 (so day 8 is week 2 day 1); water YES when d is a multiple of 3, otherwise water NO; feed YES when d is a multiple of 5, otherwise feed NO; and time X days HH:MM, splitting m into whole days, hours (00-23) and minutes (00-59) with hours and minutes always printed as two digits. Invalid or missing input prints only ERROR.",
    "learningObjectives": [
      "Input: a day number d (1-100000) and a length of time m in minutes (0-1000000). Print four lines: week W day D, where the calendar runs in weeks of 7 days starting at week 1 day 1 (so day 8 is week 2 day 1); water YES when d is a multiple of 3, otherwise water NO; feed YES when d is a multiple of 5, otherwise feed NO; and time X days HH:MM, splitting m into whole days, hours (00-23) and minutes (00-59) with hours and minutes always printed as two digits. Invalid or missing input prints only ERROR."
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
    "story": "Mira waters every third day and feeds the beds every fifth. She wants one program that turns a day number and a stretch of minutes into a plan.",
    "steps": [
      "Convert the day number to week and weekday",
      "Use % to test divisibility",
      "Split minutes into days, hours and minutes"
    ],
    "hints": [
      "Count from zero first: (d - 1) / 7 and (d - 1) % 7 give a zero-based week and weekday. Add 1 to each.",
      "A number is divisible by 3 exactly when n % 3 == 0.",
      "A day has 1440 minutes. m % 1440 is what is left after whole days; divide that by 60 for hours."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "program",
      "harness": "",
      "tests": [
        {
          "id": "c-lab-35-case-1",
          "label": "Case 1",
          "input": "1 0",
          "files": {},
          "stdout": "week 1 day 1\nwater NO\nfeed NO\ntime 0 days 00:00\n"
        },
        {
          "id": "c-lab-35-case-2",
          "label": "Case 2",
          "input": "7 59",
          "files": {},
          "stdout": "week 1 day 7\nwater NO\nfeed NO\ntime 0 days 00:59\n"
        },
        {
          "id": "c-lab-35-case-3",
          "label": "Case 3",
          "input": "8 60",
          "files": {},
          "stdout": "week 2 day 1\nwater NO\nfeed NO\ntime 0 days 01:00\n"
        },
        {
          "id": "c-lab-35-case-4",
          "label": "Case 4",
          "input": "15 1439",
          "files": {},
          "stdout": "week 3 day 1\nwater YES\nfeed YES\ntime 0 days 23:59\n"
        },
        {
          "id": "c-lab-35-case-5",
          "label": "Case 5",
          "input": "30 1440",
          "files": {},
          "stdout": "week 5 day 2\nwater YES\nfeed YES\ntime 1 days 00:00\n"
        },
        {
          "id": "c-lab-35-case-6",
          "label": "Case 6",
          "input": "100000 1000000",
          "files": {},
          "stdout": "week 14286 day 5\nwater NO\nfeed YES\ntime 694 days 10:40\n"
        },
        {
          "id": "c-lab-35-case-7",
          "label": "Case 7",
          "input": "0 5",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-35-case-8",
          "label": "Case 8",
          "input": "5 -1",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-35-case-9",
          "label": "Case 9",
          "input": "12",
          "files": {},
          "stdout": "ERROR\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-36",
    "subject": "c",
    "title": "Skating Backwards",
    "topics": [
      "modulus",
      "negative operands",
      "division semantics"
    ],
    "published": true,
    "prompt": "Implement the four functions in the starter. is_odd returns 1 when n is odd and 0 when it is even, for every int including negatives. wrap_index returns the slot you land on in a ring of size slots (size 1-1000, numbered 0 to size - 1) after moving position steps forward from slot 0; a negative position moves backward, so wrap_index(-1, 5) is 4. The result is always 0 to size - 1 for any int position. floor_div and floor_mod divide a by b rounding the quotient down toward negative infinity (C's / rounds toward zero), so floor_mod always has the sign of b or is 0 and floor_div(a, b) * b + floor_mod(a, b) equals a. b is never 0 and the driver never divides INT_MIN by -1. Driver input: a command count, then O n, W position size or D a b. For D the driver also prints C's own a / b and a % b so you can compare.",
    "starterCode": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\nint is_odd(int n);\nint wrap_index(int position, int size);\nint floor_div(int a, int b);\nint floor_mod(int a, int b);\n/* Implement the functions above. The game supplies main(). */\n",
    "tests": [],
    "rewards": {
      "money": 3000,
      "berries": [
        {
          "id": "sitrus",
          "count": 2
        }
      ],
      "pokemon": {
        "id": 363,
        "level": 22
      }
    },
    "difficulty": "hard",
    "estimatedMinutes": {
      "min": 60,
      "max": 90
    },
    "chapters": [
      3,
      4
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 36,
    "schemaVersion": 4,
    "collection": "midterm-review",
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
    "implementationContract": "Implement the four functions in the starter. is_odd returns 1 when n is odd and 0 when it is even, for every int including negatives. wrap_index returns the slot you land on in a ring of size slots (size 1-1000, numbered 0 to size - 1) after moving position steps forward from slot 0; a negative position moves backward, so wrap_index(-1, 5) is 4. The result is always 0 to size - 1 for any int position. floor_div and floor_mod divide a by b rounding the quotient down toward negative infinity (C's / rounds toward zero), so floor_mod always has the sign of b or is 0 and floor_div(a, b) * b + floor_mod(a, b) equals a. b is never 0 and the driver never divides INT_MIN by -1. Driver input: a command count, then O n, W position size or D a b. For D the driver also prints C's own a / b and a % b so you can compare.",
    "learningObjectives": [
      "Implement the four functions in the starter. is_odd returns 1 when n is odd and 0 when it is even, for every int including negatives. wrap_index returns the slot you land on in a ring of size slots (size 1-1000, numbered 0 to size - 1) after moving position steps forward from slot 0; a negative position moves backward, so wrap_index(-1, 5) is 4. The result is always 0 to size - 1 for any int position. floor_div and floor_mod divide a by b rounding the quotient down toward negative infinity (C's / rounds toward zero), so floor_mod always has the sign of b or is 0 and floor_div(a, b) * b + floor_mod(a, b) equals a. b is never 0 and the driver never divides INT_MIN by -1. Driver input: a command count, then O n, W position size or D a b. For D the driver also prints C's own a / b and a % b so you can compare."
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
    "giver": "Fee Seeker II",
    "story": "Fee Seeker II skates laps backwards around the harbour rink, and the lap board keeps landing on slots that do not exist. Fix the arithmetic for negative numbers.",
    "steps": [
      "Write is_odd so it works for negative n",
      "Turn C's remainder into a slot from 0 to size - 1",
      "Adjust C's truncated quotient and remainder into floored ones"
    ],
    "hints": [
      "In C, -7 / 2 is -3 and -7 % 2 is -1. That is why n % 2 == 1 is false for -3.",
      "For a positive size, position % size is between -(size - 1) and size - 1. When it is negative, adding size once fixes it. A loop that keeps adding size also works, but from INT_MIN it can run two billion times.",
      "Floored and truncated results differ only when the remainder is not 0 and a and b have different signs. Then the quotient is one lower and the remainder moves by b."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "functions",
      "harness": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\n#include \"quest.c\"\nint main(void){int n;if(scanf(\"%d\",&n)!=1)return 1;for(int i=0;i<n;i++){char c;if(scanf(\" %c\",&c)!=1)return 1;if(c=='O'){int v;if(scanf(\"%d\",&v)!=1)return 1;printf(\"is_odd(%d) = %d\\n\",v,is_odd(v));}else if(c=='W'){int p,s;if(scanf(\"%d%d\",&p,&s)!=2)return 1;printf(\"wrap_index(%d, %d) = %d\\n\",p,s,wrap_index(p,s));}else if(c=='D'){int a,b;if(scanf(\"%d%d\",&a,&b)!=2)return 1;printf(\"%d, %d -> C: %d r %d | floor: %d r %d\\n\",a,b,a/b,a%b,floor_div(a,b),floor_mod(a,b));}else return 1;}return 0;}",
      "tests": [
        {
          "id": "c-lab-36-case-1",
          "label": "Case 1",
          "input": "5 O 7 O -3 O -4 O 0 O -1",
          "files": {},
          "stdout": "is_odd(7) = 1\nis_odd(-3) = 1\nis_odd(-4) = 0\nis_odd(0) = 0\nis_odd(-1) = 1\n"
        },
        {
          "id": "c-lab-36-case-2",
          "label": "Case 2",
          "input": "4 O 2147483647 O -2147483648 O 1 O -2147483647",
          "files": {},
          "stdout": "is_odd(2147483647) = 1\nis_odd(-2147483648) = 0\nis_odd(1) = 1\nis_odd(-2147483647) = 1\n"
        },
        {
          "id": "c-lab-36-case-3",
          "label": "Case 3",
          "input": "6 W 0 5 W 7 5 W -1 5 W -6 5 W -5 5 W 12 1",
          "files": {},
          "stdout": "wrap_index(0, 5) = 0\nwrap_index(7, 5) = 2\nwrap_index(-1, 5) = 4\nwrap_index(-6, 5) = 4\nwrap_index(-5, 5) = 0\nwrap_index(12, 1) = 0\n"
        },
        {
          "id": "c-lab-36-case-4",
          "label": "Case 4",
          "input": "3 W -2147483648 1000 W 2147483647 1000 W -2147483648 1",
          "files": {},
          "stdout": "wrap_index(-2147483648, 1000) = 352\nwrap_index(2147483647, 1000) = 647\nwrap_index(-2147483648, 1) = 0\n"
        },
        {
          "id": "c-lab-36-case-5",
          "label": "Case 5",
          "input": "8 D 7 2 D -7 2 D 7 -2 D -7 -2 D 6 3 D -6 3 D 0 5 D -1 1000",
          "files": {},
          "stdout": "7, 2 -> C: 3 r 1 | floor: 3 r 1\n-7, 2 -> C: -3 r -1 | floor: -4 r 1\n7, -2 -> C: -3 r 1 | floor: -4 r -1\n-7, -2 -> C: 3 r -1 | floor: 3 r -1\n6, 3 -> C: 2 r 0 | floor: 2 r 0\n-6, 3 -> C: -2 r 0 | floor: -2 r 0\n0, 5 -> C: 0 r 0 | floor: 0 r 0\n-1, 1000 -> C: 0 r -1 | floor: -1 r 999\n"
        },
        {
          "id": "c-lab-36-case-6",
          "label": "Case 6",
          "input": "4 D -2147483648 3 D 2147483647 -1 D -2147483648 1 D 1 -1000",
          "files": {},
          "stdout": "-2147483648, 3 -> C: -715827882 r -2 | floor: -715827883 r 1\n2147483647, -1 -> C: -2147483647 r 0 | floor: -2147483647 r 0\n-2147483648, 1 -> C: -2147483648 r 0 | floor: -2147483648 r 0\n1, -1000 -> C: 0 r 1 | floor: -1 r -999\n"
        },
        {
          "id": "c-lab-36-case-7",
          "label": "Case 7",
          "input": "4 D -15 4 W -15 4 O -15 D 15 -4",
          "files": {},
          "stdout": "-15, 4 -> C: -3 r -3 | floor: -4 r 1\nwrap_index(-15, 4) = 1\nis_odd(-15) = 1\n15, -4 -> C: -3 r 3 | floor: -4 r -1\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-37",
    "subject": "c",
    "title": "Now Serving",
    "topics": [
      "prefix increment",
      "postfix increment",
      "decrement"
    ],
    "published": true,
    "prompt": "Input: a starting ticket number t (0-9999), then commands until the end of input, one character each; spaces and newlines between them are ignored. T takes a ticket: print take N with the current number, and the counter moves up one afterwards. S skips ahead: the counter moves up one first, then print skip N with the new number. R returns a ticket: the counter moves down one and nothing is printed, except that R when the counter is 0 prints ERROR and changes nothing. Any other character prints ERROR and changes nothing. After the last command print next: N with the counter's value. Use ++ and -- on the counter. An invalid t prints only ERROR.",
    "starterCode": "#include <stdio.h>\n\nint main(void)\n{\n    /* Write your implementation here. */\n    return 0;\n}\n",
    "tests": [],
    "rewards": {
      "money": 600,
      "berries": [
        {
          "id": "teaTin",
          "count": 1
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
      3
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 37,
    "schemaVersion": 4,
    "collection": "midterm-review",
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
    "implementationContract": "Input: a starting ticket number t (0-9999), then commands until the end of input, one character each; spaces and newlines between them are ignored. T takes a ticket: print take N with the current number, and the counter moves up one afterwards. S skips ahead: the counter moves up one first, then print skip N with the new number. R returns a ticket: the counter moves down one and nothing is printed, except that R when the counter is 0 prints ERROR and changes nothing. Any other character prints ERROR and changes nothing. After the last command print next: N with the counter's value. Use ++ and -- on the counter. An invalid t prints only ERROR.",
    "learningObjectives": [
      "Input: a starting ticket number t (0-9999), then commands until the end of input, one character each; spaces and newlines between them are ignored. T takes a ticket: print take N with the current number, and the counter moves up one afterwards. S skips ahead: the counter moves up one first, then print skip N with the new number. R returns a ticket: the counter moves down one and nothing is printed, except that R when the counter is 0 prints ERROR and changes nothing. Any other character prints ERROR and changes nothing. After the last command print next: N with the counter's value. Use ++ and -- on the counter. An invalid t prints only ERROR."
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
    "giver": "Kip",
    "story": "Kip's café hands out numbered order tickets. Some orders take the current ticket, some skip ahead, and a few get handed back.",
    "steps": [
      "Read the starting number and validate it",
      "Loop over the commands with scanf(\" %c\")",
      "Use t++ for take, ++t for skip and t-- for returns"
    ],
    "hints": [
      "printf(\"%d\", t++) prints the old value and then t grows. printf(\"%d\", ++t) grows t first.",
      "scanf(\" %c\", &c) skips spaces and newlines before reading each command, and returns EOF at the end of input.",
      "R at zero is an error: check t > 0 before t--."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "program",
      "harness": "",
      "tests": [
        {
          "id": "c-lab-37-case-1",
          "label": "Case 1",
          "input": "5\nTTT",
          "files": {},
          "stdout": "take 5\ntake 6\ntake 7\nnext: 8\n"
        },
        {
          "id": "c-lab-37-case-2",
          "label": "Case 2",
          "input": "5\nSSS",
          "files": {},
          "stdout": "skip 6\nskip 7\nskip 8\nnext: 8\n"
        },
        {
          "id": "c-lab-37-case-3",
          "label": "Case 3",
          "input": "10\nT S T R T",
          "files": {},
          "stdout": "take 10\nskip 12\ntake 12\ntake 12\nnext: 13\n"
        },
        {
          "id": "c-lab-37-case-4",
          "label": "Case 4",
          "input": "0\nR T",
          "files": {},
          "stdout": "ERROR\ntake 0\nnext: 1\n"
        },
        {
          "id": "c-lab-37-case-5",
          "label": "Case 5",
          "input": "9999\n",
          "files": {},
          "stdout": "next: 9999\n"
        },
        {
          "id": "c-lab-37-case-6",
          "label": "Case 6",
          "input": "3\nTx?S",
          "files": {},
          "stdout": "take 3\nERROR\nERROR\nskip 5\nnext: 5\n"
        },
        {
          "id": "c-lab-37-case-7",
          "label": "Case 7",
          "input": "-1\nT",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-37-case-8",
          "label": "Case 8",
          "input": "7\nRRT\nS\n",
          "files": {},
          "stdout": "take 5\nskip 7\nnext: 7\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-38",
    "subject": "c",
    "title": "Stepping Stones",
    "topics": [
      "prefix and postfix",
      "side effects",
      "pointers"
    ],
    "published": true,
    "prompt": "Implement the five functions in the starter. read_next returns the stone at *index and then moves *index forward by one. skip_read moves *index forward by one first and then returns the stone at the new *index. use_then_bump returns *counter and then adds one to it. bump_then_use adds one to *counter and returns the new value. tally adds one to *a and subtracts one from *b, and returns twice the value *a had before it grew plus the value *b has after it shrank. Each can be one short expression using ++ or -- on the pointed-to value; watch what the * applies to. Driver input: ten stone values, a starting index (-1 to 9), a counter, a and b (each -1000 to 1000), a command count, then R, K, U, B or L. The driver refuses any read that would leave the ten stones.",
    "starterCode": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\nint read_next(const int *stones, int *index);\nint skip_read(const int *stones, int *index);\nint use_then_bump(int *counter);\nint bump_then_use(int *counter);\nint tally(int *a, int *b);\n/* Implement the functions above. The game supplies main(). */\n",
    "tests": [],
    "rewards": {
      "money": 3000,
      "berries": [],
      "pokemon": {
        "id": 607,
        "level": 20
      },
      "keepsake": "unsequenced-die"
    },
    "difficulty": "hard",
    "estimatedMinutes": {
      "min": 60,
      "max": 90
    },
    "chapters": [
      3,
      9
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 38,
    "schemaVersion": 4,
    "collection": "midterm-review",
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 3,
      "prerequisiteChapters": [
        2,
        9
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Implement the five functions in the starter. read_next returns the stone at *index and then moves *index forward by one. skip_read moves *index forward by one first and then returns the stone at the new *index. use_then_bump returns *counter and then adds one to it. bump_then_use adds one to *counter and returns the new value. tally adds one to *a and subtracts one from *b, and returns twice the value *a had before it grew plus the value *b has after it shrank. Each can be one short expression using ++ or -- on the pointed-to value; watch what the * applies to. Driver input: ten stone values, a starting index (-1 to 9), a counter, a and b (each -1000 to 1000), a command count, then R, K, U, B or L. The driver refuses any read that would leave the ten stones.",
    "learningObjectives": [
      "Implement the five functions in the starter. read_next returns the stone at *index and then moves *index forward by one. skip_read moves *index forward by one first and then returns the stone at the new *index. use_then_bump returns *counter and then adds one to it. bump_then_use adds one to *counter and returns the new value. tally adds one to *a and subtracts one from *b, and returns twice the value *a had before it grew plus the value *b has after it shrank. Each can be one short expression using ++ or -- on the pointed-to value; watch what the * applies to. Driver input: ten stone values, a starting index (-1 to 9), a counter, a and b (each -1000 to 1000), a command count, then R, K, U, B or L. The driver refuses any read that would leave the ten stones."
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
        "rarePokemon",
        "keepsake"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Tilda",
    "story": "Tilda crosses the brook one stone at a time, in order, no skipping. Uma Bee crosses it however she likes. Write the rules down so they cannot argue.",
    "steps": [
      "Decide for each function whether the value is used before or after it changes",
      "Put parentheses where * would otherwise bind to the wrong thing",
      "Check the index and counter the driver prints after every call"
    ],
    "hints": [
      "*index++ means *(index++): it moves the pointer, not the number it points at. Write (*index)++ or ++*index.",
      "stones[(*index)++] reads at the old index; stones[++*index] reads at the new one.",
      "Modifying the same variable twice in one expression is undefined behavior (Clang refuses i++ + i++). tally touches *a once and *b once, so 2 * (*a)++ + --*b is fine."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "functions",
      "harness": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\n#include \"quest.c\"\nint main(void){int stones[10],index,counter,a,b,n;for(int i=0;i<10;i++)if(scanf(\"%d\",&stones[i])!=1)return 1;if(scanf(\"%d%d%d%d%d\",&index,&counter,&a,&b,&n)!=5)return 1;for(int i=0;i<n;i++){char c;if(scanf(\" %c\",&c)!=1)return 1;if(c=='R'){if(index<0||index>9){puts(\"R blocked\");continue;}int v=read_next(stones,&index);printf(\"R %d, index %d\\n\",v,index);}else if(c=='K'){if(index<-1||index>8){puts(\"K blocked\");continue;}int v=skip_read(stones,&index);printf(\"K %d, index %d\\n\",v,index);}else if(c=='U'){int v=use_then_bump(&counter);printf(\"U %d, counter %d\\n\",v,counter);}else if(c=='B'){int v=bump_then_use(&counter);printf(\"B %d, counter %d\\n\",v,counter);}else if(c=='L'){int v=tally(&a,&b);printf(\"L %d, a %d, b %d\\n\",v,a,b);}else return 1;}return 0;}",
      "tests": [
        {
          "id": "c-lab-38-case-1",
          "label": "Case 1",
          "input": "10 20 30 40 50 60 70 80 90 100 0 5 3 9 6 R R K R U B",
          "files": {},
          "stdout": "R 10, index 1\nR 20, index 2\nK 40, index 3\nR 40, index 4\nU 5, counter 6\nB 7, counter 7\n"
        },
        {
          "id": "c-lab-38-case-2",
          "label": "Case 2",
          "input": "10 20 30 40 50 60 70 80 90 100 8 0 0 0 3 K R R",
          "files": {},
          "stdout": "K 100, index 9\nR 100, index 10\nR blocked\n"
        },
        {
          "id": "c-lab-38-case-3",
          "label": "Case 3",
          "input": "7 -7 14 -14 21 -21 28 -28 35 -35 -1 -1 -2 0 6 K K U B L L",
          "files": {},
          "stdout": "K 7, index 0\nK -7, index 1\nU -1, counter 0\nB 1, counter 1\nL -5, a -1, b -1\nL -4, a 0, b -2\n"
        },
        {
          "id": "c-lab-38-case-4",
          "label": "Case 4",
          "input": "1 2 3 4 5 6 7 8 9 10 4 100 3 9 8 L L L U U B B R",
          "files": {},
          "stdout": "L 14, a 4, b 8\nL 15, a 5, b 7\nL 16, a 6, b 6\nU 100, counter 101\nU 101, counter 102\nB 103, counter 103\nB 104, counter 104\nR 5, index 5\n"
        },
        {
          "id": "c-lab-38-case-5",
          "label": "Case 5",
          "input": "5 5 5 5 5 5 5 5 5 9 9 0 10 -10 4 K R L B",
          "files": {},
          "stdout": "K blocked\nR 9, index 10\nL 9, a 11, b -11\nB 1, counter 1\n"
        },
        {
          "id": "c-lab-38-case-6",
          "label": "Case 6",
          "input": "0 1 2 3 4 5 6 7 8 9 -1 7 0 1 10 K K K K K K K K K K",
          "files": {},
          "stdout": "K 0, index 0\nK 1, index 1\nK 2, index 2\nK 3, index 3\nK 4, index 4\nK 5, index 5\nK 6, index 6\nK 7, index 7\nK 8, index 8\nK 9, index 9\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-39",
    "subject": "c",
    "title": "Order of Operations",
    "topics": [
      "operator precedence",
      "associativity",
      "integer division"
    ],
    "published": true,
    "prompt": "Input: ints a, b and c (each -10000 to 10000) and a Fahrenheit temperature f (-1000 to 1000). Print five lines. average: X, the mean of a, b and c with 2 decimals (1 2 2 gives 1.67). celsius: C, computed in int arithmetic as f minus 32, times 5, divided by 9, in that order (C's / truncates toward zero). percent: P, a times 100 divided by the total a + b + c in int arithmetic, or percent: none when the total is 0. r1: R, the remainder of a divided by 7, then doubled. r2: R, a doubled, then the remainder of that divided by 7. Get each grouping right with precedence and parentheses. Invalid or missing input prints only ERROR.",
    "starterCode": "#include <stdio.h>\n\nint main(void)\n{\n    /* Write your implementation here. */\n    return 0;\n}\n",
    "tests": [],
    "rewards": {
      "money": 600,
      "berries": [
        {
          "id": "great",
          "count": 2
        }
      ],
      "pokemon": null
    },
    "difficulty": "easy",
    "estimatedMinutes": {
      "min": 15,
      "max": 29
    },
    "chapters": [
      3
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 39,
    "schemaVersion": 4,
    "collection": "midterm-review",
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
    "implementationContract": "Input: ints a, b and c (each -10000 to 10000) and a Fahrenheit temperature f (-1000 to 1000). Print five lines. average: X, the mean of a, b and c with 2 decimals (1 2 2 gives 1.67). celsius: C, computed in int arithmetic as f minus 32, times 5, divided by 9, in that order (C's / truncates toward zero). percent: P, a times 100 divided by the total a + b + c in int arithmetic, or percent: none when the total is 0. r1: R, the remainder of a divided by 7, then doubled. r2: R, a doubled, then the remainder of that divided by 7. Get each grouping right with precedence and parentheses. Invalid or missing input prints only ERROR.",
    "learningObjectives": [
      "Input: ints a, b and c (each -10000 to 10000) and a Fahrenheit temperature f (-1000 to 1000). Print five lines. average: X, the mean of a, b and c with 2 decimals (1 2 2 gives 1.67). celsius: C, computed in int arithmetic as f minus 32, times 5, divided by 9, in that order (C's / truncates toward zero). percent: P, a times 100 divided by the total a + b + c in int arithmetic, or percent: none when the total is 0. r1: R, the remainder of a divided by 7, then doubled. r2: R, a doubled, then the remainder of that divided by 7. Get each grouping right with precedence and parentheses. Invalid or missing input prints only ERROR."
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
    "story": "Gus is converting his grandmother's tea recipes and insists that precedence is character. Help him get every grouping right.",
    "steps": [
      "Compute the mean with a real divisor",
      "Keep the int formula in the stated order",
      "Check how * / and % group left to right"
    ],
    "hints": [
      "a + b + c / 3.0 divides only c. The whole sum needs parentheses.",
      "5 / 9 * (f - 32) is always 0 in int arithmetic, because 5 / 9 is 0. Multiply first, then divide.",
      "a % 7 * 2 is (a % 7) * 2, while a * 2 % 7 is (a * 2) % 7. They are different numbers."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "program",
      "harness": "",
      "tests": [
        {
          "id": "c-lab-39-case-1",
          "label": "Case 1",
          "input": "1 2 2 212",
          "files": {},
          "stdout": "average: 1.67\ncelsius: 100\npercent: 20\nr1: 2\nr2: 2\n"
        },
        {
          "id": "c-lab-39-case-2",
          "label": "Case 2",
          "input": "50 25 25 32",
          "files": {},
          "stdout": "average: 33.33\ncelsius: 0\npercent: 50\nr1: 2\nr2: 2\n"
        },
        {
          "id": "c-lab-39-case-3",
          "label": "Case 3",
          "input": "-1 -1 -2 0",
          "files": {},
          "stdout": "average: -1.33\ncelsius: -17\npercent: 25\nr1: -2\nr2: -2\n"
        },
        {
          "id": "c-lab-39-case-4",
          "label": "Case 4",
          "input": "5 0 -5 -40",
          "files": {},
          "stdout": "average: 0.00\ncelsius: -40\npercent: none\nr1: 10\nr2: 3\n"
        },
        {
          "id": "c-lab-39-case-5",
          "label": "Case 5",
          "input": "10000 10000 10000 1000",
          "files": {},
          "stdout": "average: 10000.00\ncelsius: 537\npercent: 33\nr1: 8\nr2: 1\n"
        },
        {
          "id": "c-lab-39-case-6",
          "label": "Case 6",
          "input": "7 7 7 33",
          "files": {},
          "stdout": "average: 7.00\ncelsius: 0\npercent: 33\nr1: 0\nr2: 0\n"
        },
        {
          "id": "c-lab-39-case-7",
          "label": "Case 7",
          "input": "3 4 5 -1000",
          "files": {},
          "stdout": "average: 4.00\ncelsius: -573\npercent: 25\nr1: 6\nr2: 6\n"
        },
        {
          "id": "c-lab-39-case-8",
          "label": "Case 8",
          "input": "1 2 3 10001",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-39-case-9",
          "label": "Case 9",
          "input": "1 2",
          "files": {},
          "stdout": "ERROR\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-40",
    "subject": "c",
    "title": "The League Damage Formula",
    "topics": [
      "operator precedence",
      "integer arithmetic",
      "casts",
      "conditional operator"
    ],
    "published": true,
    "prompt": "Input: level L (1-100), power P (1-250), attack A (1-999), defense D (1-999), type code T (0-5), STAB flag s (0 or 1), roll r (0-255) and the defender's HP h (1-9999). Use int arithmetic with C's integer division unless a step says otherwise. base: take 2 times L, divide by 5 and add 2; multiply that by P, then by A; divide by D, then by 50; finally add 2. damage starts as base. STAB: if s is 1, multiply damage by 3 and then divide by 2. Type: T 0 makes damage 0, T 1 divides it by 4, T 2 divides it by 2, T 3 leaves it, T 4 doubles it and T 5 multiplies it by 4. Roll: add 217 to the remainder of r divided by 39, multiply damage by that sum and then divide by 255. Critical: the hit is critical when r is a multiple of 16 and T is not 0; a critical hit doubles damage. Minimum: if T is not 0 and damage is below 1, damage becomes 1. Print five lines: base B, damage X, critical YES or critical NO, share S where S is damage times 100 divided by h as a real number with one decimal, and next N where N is one more than the larger of base and damage. Invalid or missing input prints only ERROR.",
    "starterCode": "#include <stdio.h>\n\nint main(void)\n{\n    /* Write your implementation here. */\n    return 0;\n}\n",
    "tests": [],
    "rewards": {
      "money": 3000,
      "berries": [],
      "pokemon": {
        "id": 599,
        "level": 22
      },
      "keepsake": "precedence-plaque"
    },
    "difficulty": "hard",
    "estimatedMinutes": {
      "min": 60,
      "max": 90
    },
    "chapters": [
      3,
      5
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 40,
    "schemaVersion": 4,
    "collection": "midterm-review",
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
    "implementationContract": "Input: level L (1-100), power P (1-250), attack A (1-999), defense D (1-999), type code T (0-5), STAB flag s (0 or 1), roll r (0-255) and the defender's HP h (1-9999). Use int arithmetic with C's integer division unless a step says otherwise. base: take 2 times L, divide by 5 and add 2; multiply that by P, then by A; divide by D, then by 50; finally add 2. damage starts as base. STAB: if s is 1, multiply damage by 3 and then divide by 2. Type: T 0 makes damage 0, T 1 divides it by 4, T 2 divides it by 2, T 3 leaves it, T 4 doubles it and T 5 multiplies it by 4. Roll: add 217 to the remainder of r divided by 39, multiply damage by that sum and then divide by 255. Critical: the hit is critical when r is a multiple of 16 and T is not 0; a critical hit doubles damage. Minimum: if T is not 0 and damage is below 1, damage becomes 1. Print five lines: base B, damage X, critical YES or critical NO, share S where S is damage times 100 divided by h as a real number with one decimal, and next N where N is one more than the larger of base and damage. Invalid or missing input prints only ERROR.",
    "learningObjectives": [
      "Input: level L (1-100), power P (1-250), attack A (1-999), defense D (1-999), type code T (0-5), STAB flag s (0 or 1), roll r (0-255) and the defender's HP h (1-9999). Use int arithmetic with C's integer division unless a step says otherwise. base: take 2 times L, divide by 5 and add 2; multiply that by P, then by A; divide by D, then by 50; finally add 2. damage starts as base. STAB: if s is 1, multiply damage by 3 and then divide by 2. Type: T 0 makes damage 0, T 1 divides it by 4, T 2 divides it by 2, T 3 leaves it, T 4 doubles it and T 5 multiplies it by 4. Roll: add 217 to the remainder of r divided by 39, multiply damage by that sum and then divide by 255. Critical: the hit is critical when r is a multiple of 16 and T is not 0; a critical hit doubles damage. Minimum: if T is not 0 and damage is below 1, damage becomes 1. Print five lines: base B, damage X, critical YES or critical NO, share S where S is damage times 100 divided by h as a real number with one decimal, and next N where N is one more than the larger of base and damage. Invalid or missing input prints only ERROR."
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
        "rarePokemon",
        "keepsake"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "ANSI",
    "story": "ANSI has written the league's official damage formula in plain words. Translate it into C without changing what a single step means.",
    "steps": [
      "Translate base with every grouping in the right place",
      "Apply STAB, type, roll, critical and minimum in order",
      "Print share as a real number and next with the conditional operator"
    ],
    "hints": [
      "(2 * L / 5 + 2) needs its parentheses before it is multiplied by P. Everything after that runs left to right.",
      "damage * (217 + r % 39) / 255 keeps the sum in parentheses; dividing that sum by 255 first would give 0.",
      "The ?: operator binds more loosely than +, so base > damage ? base : damage + 1 adds one on only one side. Parenthesize the whole choice."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "program",
      "harness": "",
      "tests": [
        {
          "id": "c-lab-40-case-1",
          "label": "Case 1",
          "input": "50 80 120 100 3 1 100 150",
          "files": {},
          "stdout": "base 44\ndamage 61\ncritical NO\nshare 40.7\nnext 62\n"
        },
        {
          "id": "c-lab-40-case-2",
          "label": "Case 2",
          "input": "10 40 30 50 4 0 0 20",
          "files": {},
          "stdout": "base 4\ndamage 12\ncritical YES\nshare 60.0\nnext 13\n"
        },
        {
          "id": "c-lab-40-case-3",
          "label": "Case 3",
          "input": "100 250 999 1 0 1 16 9999",
          "files": {},
          "stdout": "base 209792\ndamage 0\ncritical NO\nshare 0.0\nnext 209793\n"
        },
        {
          "id": "c-lab-40-case-4",
          "label": "Case 4",
          "input": "1 1 1 999 1 0 5 1",
          "files": {},
          "stdout": "base 2\ndamage 1\ncritical NO\nshare 100.0\nnext 3\n"
        },
        {
          "id": "c-lab-40-case-5",
          "label": "Case 5",
          "input": "30 90 70 45 3 1 77 61",
          "files": {},
          "stdout": "base 41\ndamage 61\ncritical NO\nshare 100.0\nnext 62\n"
        },
        {
          "id": "c-lab-40-case-6",
          "label": "Case 6",
          "input": "75 120 200 150 1 1 48 500",
          "files": {},
          "stdout": "base 104\ndamage 68\ncritical YES\nshare 13.6\nnext 105\n"
        },
        {
          "id": "c-lab-40-case-7",
          "label": "Case 7",
          "input": "100 250 999 1 5 1 38 9999",
          "files": {},
          "stdout": "base 209792\ndamage 1258752\ncritical NO\nshare 12588.8\nnext 1258753\n"
        },
        {
          "id": "c-lab-40-case-8",
          "label": "Case 8",
          "input": "0 50 50 50 3 0 0 10",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-40-case-9",
          "label": "Case 9",
          "input": "50 50 50 0 3 0 0 10",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-40-case-10",
          "label": "Case 10",
          "input": "50 50 50 50 6 0 0 10",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-40-case-11",
          "label": "Case 11",
          "input": "50 50 50 50 3 0 0 0",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-40-case-12",
          "label": "Case 12",
          "input": "1 2 3",
          "files": {},
          "stdout": "ERROR\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-41",
    "subject": "c",
    "title": "Trail Permits",
    "topics": [
      "logical operators",
      "truthiness",
      "De Morgan"
    ],
    "published": true,
    "prompt": "Input: badges b (0-16), level v (1-100), a pass value p and a weather value w. p and w can be any int and follow C truthiness: 0 is false and anything else is true (w true means clear weather, w false means a storm). Print five lines. ridge: YES when b is at least 4 and v is at least 20, or when p is true. lake: YES unless v is below 10, or it is stormy and there is no pass. ferry: YES when exactly one of these is true: b is at least 8; p is true. cave: YES when it is not the case that b is below 2 or v is below 15. Print NO wherever a rule is not met, in the form ridge: YES. Last print truth: X Y Z where X is !p, Y is !!w and Z is p && w, exactly as C evaluates them. Invalid b or v, or missing input, prints only ERROR.",
    "starterCode": "#include <stdio.h>\n\nint main(void)\n{\n    /* Write your implementation here. */\n    return 0;\n}\n",
    "tests": [],
    "rewards": {
      "money": 1400,
      "berries": [
        {
          "id": "ultra",
          "count": 2
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
      5
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 42,
    "schemaVersion": 4,
    "collection": "midterm-review",
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 5,
      "prerequisiteChapters": [
        3
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Input: badges b (0-16), level v (1-100), a pass value p and a weather value w. p and w can be any int and follow C truthiness: 0 is false and anything else is true (w true means clear weather, w false means a storm). Print five lines. ridge: YES when b is at least 4 and v is at least 20, or when p is true. lake: YES unless v is below 10, or it is stormy and there is no pass. ferry: YES when exactly one of these is true: b is at least 8; p is true. cave: YES when it is not the case that b is below 2 or v is below 15. Print NO wherever a rule is not met, in the form ridge: YES. Last print truth: X Y Z where X is !p, Y is !!w and Z is p && w, exactly as C evaluates them. Invalid b or v, or missing input, prints only ERROR.",
    "learningObjectives": [
      "Input: badges b (0-16), level v (1-100), a pass value p and a weather value w. p and w can be any int and follow C truthiness: 0 is false and anything else is true (w true means clear weather, w false means a storm). Print five lines. ridge: YES when b is at least 4 and v is at least 20, or when p is true. lake: YES unless v is below 10, or it is stormy and there is no pass. ferry: YES when exactly one of these is true: b is at least 8; p is true. cave: YES when it is not the case that b is below 2 or v is below 15. Print NO wherever a rule is not met, in the form ridge: YES. Last print truth: X Y Z where X is !p, Y is !!w and Z is p && w, exactly as C evaluates them. Invalid b or v, or missing input, prints only ERROR."
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
    "giver": "Roan",
    "story": "Roan checks permits at the foot of the ridge. The rules are written in plain words; the gate needs them in C.",
    "steps": [
      "Read the four values and validate b and v",
      "Translate each rule with &&, || and !",
      "Print the raw 0 and 1 values C produces"
    ],
    "hints": [
      "\"Exactly one of A, B\" is (A) != (B) only when both sides are 0 or 1. p can be 5, so compare !!p or (p != 0).",
      "not (A or B) is the same as (not A) and (not B).",
      "Clang rejects a && b || c without parentheses. Parenthesize the && part."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "program",
      "harness": "",
      "tests": [
        {
          "id": "c-lab-41-case-1",
          "label": "Case 1",
          "input": "4 20 0 1",
          "files": {},
          "stdout": "ridge: YES\nlake: YES\nferry: NO\ncave: YES\ntruth: 1 1 0\n"
        },
        {
          "id": "c-lab-41-case-2",
          "label": "Case 2",
          "input": "3 50 0 1",
          "files": {},
          "stdout": "ridge: NO\nlake: YES\nferry: NO\ncave: YES\ntruth: 1 1 0\n"
        },
        {
          "id": "c-lab-41-case-3",
          "label": "Case 3",
          "input": "0 5 7 0",
          "files": {},
          "stdout": "ridge: YES\nlake: NO\nferry: YES\ncave: NO\ntruth: 0 0 0\n"
        },
        {
          "id": "c-lab-41-case-4",
          "label": "Case 4",
          "input": "8 30 -1 0",
          "files": {},
          "stdout": "ridge: YES\nlake: YES\nferry: NO\ncave: YES\ntruth: 0 0 0\n"
        },
        {
          "id": "c-lab-41-case-5",
          "label": "Case 5",
          "input": "16 100 0 0",
          "files": {},
          "stdout": "ridge: YES\nlake: NO\nferry: YES\ncave: YES\ntruth: 1 0 0\n"
        },
        {
          "id": "c-lab-41-case-6",
          "label": "Case 6",
          "input": "9 9 5 5",
          "files": {},
          "stdout": "ridge: YES\nlake: NO\nferry: NO\ncave: NO\ntruth: 0 1 1\n"
        },
        {
          "id": "c-lab-41-case-7",
          "label": "Case 7",
          "input": "2 15 0 -3",
          "files": {},
          "stdout": "ridge: NO\nlake: YES\nferry: NO\ncave: YES\ntruth: 1 1 0\n"
        },
        {
          "id": "c-lab-41-case-8",
          "label": "Case 8",
          "input": "17 20 0 0",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-41-case-9",
          "label": "Case 9",
          "input": "1 0 0 0",
          "files": {},
          "stdout": "ERROR\n"
        },
        {
          "id": "c-lab-41-case-10",
          "label": "Case 10",
          "input": "4 20 1",
          "files": {},
          "stdout": "ERROR\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-42",
    "subject": "c",
    "title": "The Haunted Hallway",
    "topics": [
      "short-circuit evaluation",
      "logical operators",
      "guards"
    ],
    "published": true,
    "prompt": "The game supplies is_registered(id) and is_cleared(id). Every call is recorded, and after each command the driver prints which checks ran. Implement the six functions so that a check is called only when its answer can still change the result, exactly as && and || short-circuit from left to right. can_enter: badges is at least 3 and is_registered(id). needs_escort: level is below 10, or id is not cleared (!is_cleared(id)). fair_share: count is above 0 and total / count is at least 50; never divide when count is 0 or negative. open_gate: is_registered(id), and then either key is true or is_cleared(id). implies: the truth value of if p then q, which is !p || q. not_both: 1 unless both p and q are true. Every function returns exactly 0 or 1. Driver input: a command count, then E badges id, N level id, F total count, G id key, I p q or X p q.",
    "starterCode": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\nint is_registered(int id); /* supplied by the game */\nint is_cleared(int id); /* supplied by the game */\n\nint can_enter(int badges, int id);\nint needs_escort(int level, int id);\nint fair_share(int total, int count);\nint open_gate(int id, int key);\nint implies(int p, int q);\nint not_both(int p, int q);\n\n/* Implement the functions above. The game supplies main() and both checks. */\n",
    "tests": [],
    "rewards": {
      "money": 3000,
      "berries": [],
      "pokemon": {
        "id": 479,
        "level": 25,
        "shiny": true
      }
    },
    "difficulty": "hard",
    "estimatedMinutes": {
      "min": 60,
      "max": 90
    },
    "chapters": [
      5
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 43,
    "schemaVersion": 4,
    "collection": "midterm-review",
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 5,
      "prerequisiteChapters": [
        3,
        4
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "The game supplies is_registered(id) and is_cleared(id). Every call is recorded, and after each command the driver prints which checks ran. Implement the six functions so that a check is called only when its answer can still change the result, exactly as && and || short-circuit from left to right. can_enter: badges is at least 3 and is_registered(id). needs_escort: level is below 10, or id is not cleared (!is_cleared(id)). fair_share: count is above 0 and total / count is at least 50; never divide when count is 0 or negative. open_gate: is_registered(id), and then either key is true or is_cleared(id). implies: the truth value of if p then q, which is !p || q. not_both: 1 unless both p and q are true. Every function returns exactly 0 or 1. Driver input: a command count, then E badges id, N level id, F total count, G id key, I p q or X p q.",
    "learningObjectives": [
      "The game supplies is_registered(id) and is_cleared(id). Every call is recorded, and after each command the driver prints which checks ran. Implement the six functions so that a check is called only when its answer can still change the result, exactly as && and || short-circuit from left to right. can_enter: badges is at least 3 and is_registered(id). needs_escort: level is below 10, or id is not cleared (!is_cleared(id)). fair_share: count is above 0 and total / count is at least 50; never divide when count is 0 or negative. open_gate: is_registered(id), and then either key is true or is_cleared(id). implies: the truth value of if p then q, which is !p || q. not_both: 1 unless both p and q are true. Every function returns exactly 0 or 1. Driver input: a command count, then E badges id, N level id, F total count, G id key, I p q or X p q."
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
    "giver": "Seg Fault",
    "story": "Seg Fault guards a hallway where every door check costs something. Only ask a question when its answer can still change the outcome.",
    "steps": [
      "Put the cheap test on the left of && or ||",
      "Let the operator skip the check you do not need",
      "Never divide by a count that could be 0"
    ],
    "hints": [
      "A && B never evaluates B when A is false; A || B never evaluates B when A is true. Storing a call in a variable first defeats this.",
      "count > 0 && total / count >= 50 is safe; count != 0 is not enough, because negative counts must give 0.",
      "Logical operators return 0 or 1, but ! and | are not the same: !p | q can return 5. Use ||."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "functions",
      "harness": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\nstatic char trace[512];\nstatic size_t used=0;\nstatic void note(const char *check,int id){if(used<sizeof trace-40)used+=(size_t)sprintf(trace+used,\"%s%s(%d)\",used?\" \":\"\",check,id);}\nint is_registered(int id){note(\"registered\",id);return id%2!=0;}\nint is_cleared(int id){note(\"cleared\",id);return id%3==0;}\n#include \"quest.c\"\nstatic void report(char c,int x,int y,int result){printf(\"%c %d %d -> %d | %s\\n\",c,x,y,result,used?trace:\"no checks\");used=0;trace[0]='\\0';}\nint main(void){int n;if(scanf(\"%d\",&n)!=1)return 1;for(int i=0;i<n;i++){char c;int x,y,r;if(scanf(\" %c%d%d\",&c,&x,&y)!=3)return 1;if(c=='E')r=can_enter(x,y);else if(c=='N')r=needs_escort(x,y);else if(c=='F')r=fair_share(x,y);else if(c=='G')r=open_gate(x,y);else if(c=='I')r=implies(x,y);else if(c=='X')r=not_both(x,y);else return 1;report(c,x,y,r);}return 0;}",
      "tests": [
        {
          "id": "c-lab-42-case-1",
          "label": "Case 1",
          "input": "6 E 3 7 E 2 7 E 3 8 E 5 -1 E 0 0 E 10 9",
          "files": {},
          "stdout": "E 3 7 -> 1 | registered(7)\nE 2 7 -> 0 | no checks\nE 3 8 -> 0 | registered(8)\nE 5 -1 -> 1 | registered(-1)\nE 0 0 -> 0 | no checks\nE 10 9 -> 1 | registered(9)\n"
        },
        {
          "id": "c-lab-42-case-2",
          "label": "Case 2",
          "input": "5 N 5 3 N 10 3 N 10 4 N 9 4 N 50 6",
          "files": {},
          "stdout": "N 5 3 -> 1 | no checks\nN 10 3 -> 0 | cleared(3)\nN 10 4 -> 1 | cleared(4)\nN 9 4 -> 1 | no checks\nN 50 6 -> 0 | cleared(6)\n"
        },
        {
          "id": "c-lab-42-case-3",
          "label": "Case 3",
          "input": "6 F 100 2 F 99 2 F 500 0 F -200 -2 F 0 5 F 150 3",
          "files": {},
          "stdout": "F 100 2 -> 1 | no checks\nF 99 2 -> 0 | no checks\nF 500 0 -> 0 | no checks\nF -200 -2 -> 0 | no checks\nF 0 5 -> 0 | no checks\nF 150 3 -> 1 | no checks\n"
        },
        {
          "id": "c-lab-42-case-4",
          "label": "Case 4",
          "input": "6 G 7 1 G 7 0 G 9 0 G 8 1 G 3 5 G -3 0",
          "files": {},
          "stdout": "G 7 1 -> 1 | registered(7)\nG 7 0 -> 0 | registered(7) cleared(7)\nG 9 0 -> 1 | registered(9) cleared(9)\nG 8 1 -> 0 | registered(8)\nG 3 5 -> 1 | registered(3)\nG -3 0 -> 1 | registered(-3) cleared(-3)\n"
        },
        {
          "id": "c-lab-42-case-5",
          "label": "Case 5",
          "input": "8 I 0 0 I 0 5 I 5 0 I -2 7 X 0 0 X 3 0 X 3 -4 X 0 9",
          "files": {},
          "stdout": "I 0 0 -> 1 | no checks\nI 0 5 -> 1 | no checks\nI 5 0 -> 0 | no checks\nI -2 7 -> 1 | no checks\nX 0 0 -> 1 | no checks\nX 3 0 -> 1 | no checks\nX 3 -4 -> 0 | no checks\nX 0 9 -> 1 | no checks\n"
        },
        {
          "id": "c-lab-42-case-6",
          "label": "Case 6",
          "input": "5 F 2147483647 1 F -2147483648 1 E 3 2147483647 N 10 -9 G 0 0",
          "files": {},
          "stdout": "F 2147483647 1 -> 1 | no checks\nF -2147483648 1 -> 0 | no checks\nE 3 2147483647 -> 1 | registered(2147483647)\nN 10 -9 -> 0 | cleared(-9)\nG 0 0 -> 0 | registered(0)\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-43",
    "subject": "c",
    "title": "True, False and C",
    "topics": [
      "truth values",
      "relational operators",
      "nonzero is true"
    ],
    "published": true,
    "prompt": "Input: three ints x, y and z. Print eight lines, each value exactly as C produces it (every comparison and logical operator gives 1 or 0). x truthy: V, the value of !!x. falsy count: V, how many of x, y and z are 0, computed as !x + !y + !z. in order: V, 1 when x is less than y and y is less than z in the mathematical sense, otherwise 0. C reads x < y < z as: V, the value C really computes for x < y < z (it compares x < y first, then compares that 0 or 1 with z). x == y == z: V, the value of (x == y) == z. any: V, the value of x || y || z. all: V, the value of x && y && z. x > y: V. Missing input prints only ERROR.",
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
      5
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 41,
    "schemaVersion": 4,
    "collection": "midterm-review",
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 5,
      "prerequisiteChapters": [
        3
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Input: three ints x, y and z. Print eight lines, each value exactly as C produces it (every comparison and logical operator gives 1 or 0). x truthy: V, the value of !!x. falsy count: V, how many of x, y and z are 0, computed as !x + !y + !z. in order: V, 1 when x is less than y and y is less than z in the mathematical sense, otherwise 0. C reads x < y < z as: V, the value C really computes for x < y < z (it compares x < y first, then compares that 0 or 1 with z). x == y == z: V, the value of (x == y) == z. any: V, the value of x || y || z. all: V, the value of x && y && z. x > y: V. Missing input prints only ERROR.",
    "learningObjectives": [
      "Input: three ints x, y and z. Print eight lines, each value exactly as C produces it (every comparison and logical operator gives 1 or 0). x truthy: V, the value of !!x. falsy count: V, how many of x, y and z are 0, computed as !x + !y + !z. in order: V, 1 when x is less than y and y is less than z in the mathematical sense, otherwise 0. C reads x < y < z as: V, the value C really computes for x < y < z (it compares x < y first, then compares that 0 or 1 with z). x == y == z: V, the value of (x == y) == z. any: V, the value of x || y || z. all: V, the value of x && y && z. x > y: V. Missing input prints only ERROR."
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
    "giver": "Sasha",
    "story": "Sasha will argue either side of anything, so the debate club wants a program that settles what C itself thinks is true.",
    "steps": [
      "Read x, y and z",
      "Print each expression's value with %d",
      "Compare the mathematical chain with what C really does"
    ],
    "hints": [
      "!!x turns any non-zero value into 1 and keeps 0 as 0.",
      "x < y < z is (x < y) < z: the first comparison becomes 0 or 1, and that is compared with z.",
      "For \"in order\" you need two comparisons joined with &&."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "program",
      "harness": "",
      "tests": [
        {
          "id": "c-lab-43-case-1",
          "label": "Case 1",
          "input": "1 2 3",
          "files": {},
          "stdout": "x truthy: 1\nfalsy count: 0\nin order: 1\nC reads x < y < z as: 1\nx == y == z: 0\nany: 1\nall: 1\nx > y: 0\n"
        },
        {
          "id": "c-lab-43-case-2",
          "label": "Case 2",
          "input": "3 2 1",
          "files": {},
          "stdout": "x truthy: 1\nfalsy count: 0\nin order: 0\nC reads x < y < z as: 1\nx == y == z: 0\nany: 1\nall: 1\nx > y: 1\n"
        },
        {
          "id": "c-lab-43-case-3",
          "label": "Case 3",
          "input": "0 0 0",
          "files": {},
          "stdout": "x truthy: 0\nfalsy count: 3\nin order: 0\nC reads x < y < z as: 0\nx == y == z: 0\nany: 0\nall: 0\nx > y: 0\n"
        },
        {
          "id": "c-lab-43-case-4",
          "label": "Case 4",
          "input": "-5 -5 1",
          "files": {},
          "stdout": "x truthy: 1\nfalsy count: 0\nin order: 0\nC reads x < y < z as: 1\nx == y == z: 1\nany: 1\nall: 1\nx > y: 0\n"
        },
        {
          "id": "c-lab-43-case-5",
          "label": "Case 5",
          "input": "5 5 5",
          "files": {},
          "stdout": "x truthy: 1\nfalsy count: 0\nin order: 0\nC reads x < y < z as: 1\nx == y == z: 0\nany: 1\nall: 1\nx > y: 0\n"
        },
        {
          "id": "c-lab-43-case-6",
          "label": "Case 6",
          "input": "-1 0 2",
          "files": {},
          "stdout": "x truthy: 1\nfalsy count: 1\nin order: 1\nC reads x < y < z as: 1\nx == y == z: 0\nany: 1\nall: 0\nx > y: 0\n"
        },
        {
          "id": "c-lab-43-case-7",
          "label": "Case 7",
          "input": "7 3 0",
          "files": {},
          "stdout": "x truthy: 1\nfalsy count: 1\nin order: 0\nC reads x < y < z as: 0\nx == y == z: 1\nany: 1\nall: 0\nx > y: 1\n"
        },
        {
          "id": "c-lab-43-case-8",
          "label": "Case 8",
          "input": "1 2",
          "files": {},
          "stdout": "ERROR\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-44",
    "subject": "c",
    "title": "No Branches Allowed",
    "topics": [
      "selection by calculation",
      "relational values",
      "array indexing"
    ],
    "published": true,
    "prompt": "In this lab if, switch, while, for, do and goto are switched off: while your file compiles, the driver turns each of those keywords into an error, so make every choice by calculation. A comparison is worth 1 or 0, so you can multiply by it, add it up or use it as an array index. The ?: operator cannot be switched off, but leave it out too; that is the point of the lab. grade_points(score) for 0-100 returns 4 for 90 and up, 3 for 80-89, 2 for 70-79, 1 for 60-69, otherwise 0. larger(a, b) returns the larger of any two ints. sign_of(n) returns -1, 0 or 1. shipping_cents(grams) for 1-100000 returns 300 up to 500 grams, 700 up to 2000 grams, otherwise 1500. parity_name(n) returns the string \"even\" or \"odd\" for any int, including negatives. days_in_month(month, leap) for month 1-12 and leap 0 or 1 returns that month's days, February having 29 when leap is 1. Driver input: a command count, then G score, L a b, S n, P grams, N n or M month leap.",
    "starterCode": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\nint grade_points(int score);\nint larger(int a, int b);\nint sign_of(int n);\nint shipping_cents(int grams);\nconst char *parity_name(int n);\nint days_in_month(int month, int leap);\n\n/* if, switch, while, for, do and goto are switched off in this lab.\n   Implement the functions above by calculation. The game supplies main(). */\n",
    "tests": [],
    "rewards": {
      "money": 1400,
      "berries": [
        {
          "id": "prismStone",
          "count": 1
        }
      ],
      "pokemon": null
    },
    "difficulty": "medium",
    "estimatedMinutes": {
      "min": 30,
      "max": 60
    },
    "chapters": [
      3,
      5
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 44,
    "schemaVersion": 4,
    "collection": "midterm-review",
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 5,
      "prerequisiteChapters": [
        3,
        4
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "In this lab if, switch, while, for, do and goto are switched off: while your file compiles, the driver turns each of those keywords into an error, so make every choice by calculation. A comparison is worth 1 or 0, so you can multiply by it, add it up or use it as an array index. The ?: operator cannot be switched off, but leave it out too; that is the point of the lab. grade_points(score) for 0-100 returns 4 for 90 and up, 3 for 80-89, 2 for 70-79, 1 for 60-69, otherwise 0. larger(a, b) returns the larger of any two ints. sign_of(n) returns -1, 0 or 1. shipping_cents(grams) for 1-100000 returns 300 up to 500 grams, 700 up to 2000 grams, otherwise 1500. parity_name(n) returns the string \"even\" or \"odd\" for any int, including negatives. days_in_month(month, leap) for month 1-12 and leap 0 or 1 returns that month's days, February having 29 when leap is 1. Driver input: a command count, then G score, L a b, S n, P grams, N n or M month leap.",
    "learningObjectives": [
      "In this lab if, switch, while, for, do and goto are switched off: while your file compiles, the driver turns each of those keywords into an error, so make every choice by calculation. A comparison is worth 1 or 0, so you can multiply by it, add it up or use it as an array index. The ?: operator cannot be switched off, but leave it out too; that is the point of the lab. grade_points(score) for 0-100 returns 4 for 90 and up, 3 for 80-89, 2 for 70-79, 1 for 60-69, otherwise 0. larger(a, b) returns the larger of any two ints. sign_of(n) returns -1, 0 or 1. shipping_cents(grams) for 1-100000 returns 300 up to 500 grams, 700 up to 2000 grams, otherwise 1500. parity_name(n) returns the string \"even\" or \"odd\" for any int, including negatives. days_in_month(month, leap) for month 1-12 and leap 0 or 1 returns that month's days, February having 29 when leap is 1. Driver input: a command count, then G score, L a b, S n, P grams, N n or M month leap."
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
    "giver": "Marn",
    "story": "Marn always knows which branch you will take. Leave her nothing to predict: make every choice with arithmetic.",
    "steps": [
      "Replace each decision with a sum or product of comparisons",
      "Use a comparison as an array index for the string and month choices",
      "Check negative numbers and the extreme ints"
    ],
    "hints": [
      "(score >= 60) + (score >= 70) + (score >= 80) + (score >= 90) counts how many thresholds were passed.",
      "a * (a >= b) + b * (a < b) picks one of two values without a branch; exactly one comparison is 1.",
      "n % 2 is -1 for negative odd n, so it is not a safe index. n % 2 != 0 is 0 or 1 for every int."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "functions",
      "harness": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n#include <stdbool.h>\n#include <math.h>\n#pragma clang diagnostic ignored \"-Wkeyword-macro\"\n#define if NO_if_ALLOWED_selection_by_calculation\n#define switch NO_switch_ALLOWED_selection_by_calculation\n#define while NO_while_ALLOWED_selection_by_calculation\n#define for NO_for_ALLOWED_selection_by_calculation\n#define do NO_do_ALLOWED_selection_by_calculation\n#define goto NO_goto_ALLOWED_selection_by_calculation\n#include \"quest.c\"\n#undef if\n#undef switch\n#undef while\n#undef for\n#undef do\n#undef goto\nint main(void){int n;if(scanf(\"%d\",&n)!=1)return 1;for(int i=0;i<n;i++){char c;int x,y=0;if(scanf(\" %c%d\",&c,&x)!=2)return 1;if((c=='L'||c=='M')&&scanf(\"%d\",&y)!=1)return 1;if(c=='G')printf(\"grade_points(%d) = %d\\n\",x,grade_points(x));else if(c=='L')printf(\"larger(%d, %d) = %d\\n\",x,y,larger(x,y));else if(c=='S')printf(\"sign_of(%d) = %d\\n\",x,sign_of(x));else if(c=='P')printf(\"shipping_cents(%d) = %d\\n\",x,shipping_cents(x));else if(c=='N')printf(\"parity_name(%d) = %s\\n\",x,parity_name(x));else if(c=='M')printf(\"days_in_month(%d, %d) = %d\\n\",x,y,days_in_month(x,y));else return 1;}return 0;}",
      "tests": [
        {
          "id": "c-lab-44-case-1",
          "label": "Case 1",
          "input": "10 G 100 G 90 G 89 G 80 G 79 G 70 G 69 G 60 G 59 G 0",
          "files": {},
          "stdout": "grade_points(100) = 4\ngrade_points(90) = 4\ngrade_points(89) = 3\ngrade_points(80) = 3\ngrade_points(79) = 2\ngrade_points(70) = 2\ngrade_points(69) = 1\ngrade_points(60) = 1\ngrade_points(59) = 0\ngrade_points(0) = 0\n"
        },
        {
          "id": "c-lab-44-case-2",
          "label": "Case 2",
          "input": "6 L 3 9 L 9 3 L -4 -4 L -2147483648 2147483647 L 2147483647 -2147483648 L 0 -1",
          "files": {},
          "stdout": "larger(3, 9) = 9\nlarger(9, 3) = 9\nlarger(-4, -4) = -4\nlarger(-2147483648, 2147483647) = 2147483647\nlarger(2147483647, -2147483648) = 2147483647\nlarger(0, -1) = 0\n"
        },
        {
          "id": "c-lab-44-case-3",
          "label": "Case 3",
          "input": "5 S 42 S -42 S 0 S 2147483647 S -2147483648",
          "files": {},
          "stdout": "sign_of(42) = 1\nsign_of(-42) = -1\nsign_of(0) = 0\nsign_of(2147483647) = 1\nsign_of(-2147483648) = -1\n"
        },
        {
          "id": "c-lab-44-case-4",
          "label": "Case 4",
          "input": "7 P 1 P 500 P 501 P 2000 P 2001 P 100000 P 1999",
          "files": {},
          "stdout": "shipping_cents(1) = 300\nshipping_cents(500) = 300\nshipping_cents(501) = 700\nshipping_cents(2000) = 700\nshipping_cents(2001) = 1500\nshipping_cents(100000) = 1500\nshipping_cents(1999) = 700\n"
        },
        {
          "id": "c-lab-44-case-5",
          "label": "Case 5",
          "input": "6 N 0 N 7 N -3 N -4 N 2147483647 N -2147483648",
          "files": {},
          "stdout": "parity_name(0) = even\nparity_name(7) = odd\nparity_name(-3) = odd\nparity_name(-4) = even\nparity_name(2147483647) = odd\nparity_name(-2147483648) = even\n"
        },
        {
          "id": "c-lab-44-case-6",
          "label": "Case 6",
          "input": "8 M 1 0 M 2 0 M 2 1 M 4 1 M 12 0 M 9 0 M 11 1 M 7 0",
          "files": {},
          "stdout": "days_in_month(1, 0) = 31\ndays_in_month(2, 0) = 28\ndays_in_month(2, 1) = 29\ndays_in_month(4, 1) = 30\ndays_in_month(12, 0) = 31\ndays_in_month(9, 0) = 30\ndays_in_month(11, 1) = 30\ndays_in_month(7, 0) = 31\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-45",
    "subject": "c",
    "title": "One Call, One Return",
    "topics": [
      "functions",
      "prototypes",
      "return types",
      "pass by value"
    ],
    "published": true,
    "prompt": "Implement the five functions in the starter, keeping every prototype. square(n) returns n times n (n is between -46340 and 46340). percent_of(part, whole) returns what percent part is of whole as a double (whole is at least 1), so percent_of(1, 3) is 33.33...; watch out for int division. nearest(x) returns x rounded to the nearest int with halves rounded away from zero (2.5 gives 3, -2.5 gives -3); x is between -1000000000 and 1000000000. repeat_char(c, n) prints c exactly n times (n is 0-60) followed by a newline and returns nothing. fourth_power(x) returns x to the fourth power by calling square twice (x is between -215 and 215). Driver input: a command count, then Q n, P part whole, R x, C char n or F x.",
    "starterCode": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\nint square(int n);\ndouble percent_of(int part, int whole);\nint nearest(double x);\nvoid repeat_char(char c, int n);\nint fourth_power(int x);\n/* Implement the functions above. The game supplies main(). */\n",
    "tests": [],
    "rewards": {
      "money": 600,
      "berries": [
        {
          "id": "potion",
          "count": 2
        }
      ],
      "pokemon": null
    },
    "difficulty": "easy",
    "estimatedMinutes": {
      "min": 15,
      "max": 29
    },
    "chapters": [
      4
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 45,
    "schemaVersion": 4,
    "collection": "midterm-review",
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 4,
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
    "implementationContract": "Implement the five functions in the starter, keeping every prototype. square(n) returns n times n (n is between -46340 and 46340). percent_of(part, whole) returns what percent part is of whole as a double (whole is at least 1), so percent_of(1, 3) is 33.33...; watch out for int division. nearest(x) returns x rounded to the nearest int with halves rounded away from zero (2.5 gives 3, -2.5 gives -3); x is between -1000000000 and 1000000000. repeat_char(c, n) prints c exactly n times (n is 0-60) followed by a newline and returns nothing. fourth_power(x) returns x to the fourth power by calling square twice (x is between -215 and 215). Driver input: a command count, then Q n, P part whole, R x, C char n or F x.",
    "learningObjectives": [
      "Implement the five functions in the starter, keeping every prototype. square(n) returns n times n (n is between -46340 and 46340). percent_of(part, whole) returns what percent part is of whole as a double (whole is at least 1), so percent_of(1, 3) is 33.33...; watch out for int division. nearest(x) returns x rounded to the nearest int with halves rounded away from zero (2.5 gives 3, -2.5 gives -3); x is between -1000000000 and 1000000000. repeat_char(c, n) prints c exactly n times (n is 0-60) followed by a newline and returns nothing. fourth_power(x) returns x to the fourth power by calling square twice (x is between -215 and 215). Driver input: a command count, then Q n, P part whole, R x, C char n or F x."
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
    "giver": "Kes",
    "story": "Kes trains on one principle: one call, one return, nothing wasted in between. Write five small functions that live up to it.",
    "steps": [
      "Keep each prototype exactly as given",
      "Return the right type from each function",
      "Reuse square inside fourth_power"
    ],
    "hints": [
      "100 * part / whole is int division. Make one operand a double first: 100.0 * part / whole.",
      "Casting to int truncates toward zero. Add 0.5 for positive x and subtract 0.5 for negative x before casting.",
      "A void function returns nothing; it just prints. fourth_power(x) can be square(square(x))."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "functions",
      "harness": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\n#include \"quest.c\"\nint main(void){int n;if(scanf(\"%d\",&n)!=1)return 1;for(int i=0;i<n;i++){char c;if(scanf(\" %c\",&c)!=1)return 1;if(c=='Q'){int v;if(scanf(\"%d\",&v)!=1)return 1;int r=square(v);printf(\"square(%d) = %d\\n\",v,r);}else if(c=='P'){int a,b;if(scanf(\"%d%d\",&a,&b)!=2)return 1;printf(\"percent_of(%d, %d) = %.1f\\n\",a,b,percent_of(a,b));}else if(c=='R'){double x;if(scanf(\"%lf\",&x)!=1)return 1;printf(\"nearest(%.2f) = %d\\n\",x,nearest(x));}else if(c=='C'){char ch;int k;if(scanf(\" %c%d\",&ch,&k)!=2)return 1;printf(\"repeat_char('%c', %d): \",ch,k);repeat_char(ch,k);}else if(c=='F'){int v;if(scanf(\"%d\",&v)!=1)return 1;printf(\"fourth_power(%d) = %d\\n\",v,fourth_power(v));}else return 1;}return 0;}",
      "tests": [
        {
          "id": "c-lab-45-case-1",
          "label": "Case 1",
          "input": "5 Q 7 Q -7 Q 0 Q 46340 Q 1",
          "files": {},
          "stdout": "square(7) = 49\nsquare(-7) = 49\nsquare(0) = 0\nsquare(46340) = 2147395600\nsquare(1) = 1\n"
        },
        {
          "id": "c-lab-45-case-2",
          "label": "Case 2",
          "input": "6 P 1 3 P 2 3 P 5 5 P 0 7 P 7 8 P -1 4",
          "files": {},
          "stdout": "percent_of(1, 3) = 33.3\npercent_of(2, 3) = 66.7\npercent_of(5, 5) = 100.0\npercent_of(0, 7) = 0.0\npercent_of(7, 8) = 87.5\npercent_of(-1, 4) = -25.0\n"
        },
        {
          "id": "c-lab-45-case-3",
          "label": "Case 3",
          "input": "8 R 2.4 R 2.5 R -2.5 R -2.4 R 0 R 999999999.5 R -0.5 R 7",
          "files": {},
          "stdout": "nearest(2.40) = 2\nnearest(2.50) = 3\nnearest(-2.50) = -3\nnearest(-2.40) = -2\nnearest(0.00) = 0\nnearest(999999999.50) = 1000000000\nnearest(-0.50) = -1\nnearest(7.00) = 7\n"
        },
        {
          "id": "c-lab-45-case-4",
          "label": "Case 4",
          "input": "4 C * 5 C # 1 C x 0 C = 12",
          "files": {},
          "stdout": "repeat_char('*', 5): *****\nrepeat_char('#', 1): #\nrepeat_char('x', 0): \nrepeat_char('=', 12): ============\n"
        },
        {
          "id": "c-lab-45-case-5",
          "label": "Case 5",
          "input": "4 F 2 F -3 F 0 F 215",
          "files": {},
          "stdout": "fourth_power(2) = 16\nfourth_power(-3) = 81\nfourth_power(0) = 0\nfourth_power(215) = 2136750625\n"
        },
        {
          "id": "c-lab-45-case-6",
          "label": "Case 6",
          "input": "5 R 0.49 R -0.51 P 50 200 F 1 Q -46340",
          "files": {},
          "stdout": "nearest(0.49) = 0\nnearest(-0.51) = -1\npercent_of(50, 200) = 25.0\nfourth_power(1) = 1\nsquare(-46340) = 2147395600\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-46",
    "subject": "c",
    "title": "The Archive Calendar",
    "topics": [
      "functions",
      "function composition",
      "validation"
    ],
    "published": true,
    "prompt": "Implement the five calendar functions, building each on the ones before it. is_leap(year) returns 1 for a leap year and 0 otherwise: a year divisible by 4 and not by 100, or divisible by 400. days_in_month(month, year) returns 28-31 for months 1-12, or 0 for any other month. is_valid_date(day, month, year) returns 1 when year is 1-9999, month is 1-12 and day is 1 through that month's length, otherwise 0. day_of_year(day, month, year) returns the date's position in its year (1 January is 1) or -1 for an invalid date. days_left_in_year(day, month, year) returns how many days of the year come after the date (31 December gives 0) or -1 for an invalid date. Driver input: a command count, then L year, M month year, V day month year, Y day month year or R day month year.",
    "starterCode": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\nint is_leap(int year);\nint days_in_month(int month, int year);\nint is_valid_date(int day, int month, int year);\nint day_of_year(int day, int month, int year);\nint days_left_in_year(int day, int month, int year);\n/* Implement the functions above. The game supplies main(). */\n",
    "tests": [],
    "rewards": {
      "money": 3000,
      "berries": [],
      "pokemon": {
        "id": 177,
        "level": 20
      },
      "keepsake": "leap-day-stamp"
    },
    "difficulty": "hard",
    "estimatedMinutes": {
      "min": 60,
      "max": 90
    },
    "chapters": [
      4,
      5
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 46,
    "schemaVersion": 4,
    "collection": "midterm-review",
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 4,
      "prerequisiteChapters": [
        3
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Implement the five calendar functions, building each on the ones before it. is_leap(year) returns 1 for a leap year and 0 otherwise: a year divisible by 4 and not by 100, or divisible by 400. days_in_month(month, year) returns 28-31 for months 1-12, or 0 for any other month. is_valid_date(day, month, year) returns 1 when year is 1-9999, month is 1-12 and day is 1 through that month's length, otherwise 0. day_of_year(day, month, year) returns the date's position in its year (1 January is 1) or -1 for an invalid date. days_left_in_year(day, month, year) returns how many days of the year come after the date (31 December gives 0) or -1 for an invalid date. Driver input: a command count, then L year, M month year, V day month year, Y day month year or R day month year.",
    "learningObjectives": [
      "Implement the five calendar functions, building each on the ones before it. is_leap(year) returns 1 for a leap year and 0 otherwise: a year divisible by 4 and not by 100, or divisible by 400. days_in_month(month, year) returns 28-31 for months 1-12, or 0 for any other month. is_valid_date(day, month, year) returns 1 when year is 1-9999, month is 1-12 and day is 1 through that month's length, otherwise 0. day_of_year(day, month, year) returns the date's position in its year (1 January is 1) or -1 for an invalid date. days_left_in_year(day, month, year) returns how many days of the year come after the date (31 December gives 0) or -1 for an invalid date. Driver input: a command count, then L year, M month year, V day month year, Y day month year or R day month year."
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
        "rarePokemon",
        "keepsake"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Vell",
    "story": "Vell dates every record in the archive by its day of the year. Build the calendar functions the index depends on, one on top of another.",
    "steps": [
      "Write is_leap and days_in_month",
      "Validate dates with days_in_month",
      "Build day_of_year and days_left_in_year from the others"
    ],
    "hints": [
      "1900 is not a leap year and 2000 is. Check divisibility by 400 as well as by 4 and 100.",
      "is_valid_date should call days_in_month instead of repeating the month table.",
      "day_of_year is the day plus the lengths of all earlier months in the same year; days_left_in_year is 365 or 366 minus that."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "functions",
      "harness": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\n#include \"quest.c\"\nint main(void){int n;if(scanf(\"%d\",&n)!=1)return 1;for(int i=0;i<n;i++){char c;if(scanf(\" %c\",&c)!=1)return 1;if(c=='L'){int y;if(scanf(\"%d\",&y)!=1)return 1;printf(\"is_leap(%d) = %d\\n\",y,is_leap(y));}else if(c=='M'){int m,y;if(scanf(\"%d%d\",&m,&y)!=2)return 1;printf(\"days_in_month(%d, %d) = %d\\n\",m,y,days_in_month(m,y));}else{int d,m,y;if(scanf(\"%d%d%d\",&d,&m,&y)!=3)return 1;if(c=='V')printf(\"is_valid_date(%d, %d, %d) = %d\\n\",d,m,y,is_valid_date(d,m,y));else if(c=='Y')printf(\"day_of_year(%d, %d, %d) = %d\\n\",d,m,y,day_of_year(d,m,y));else if(c=='R')printf(\"days_left_in_year(%d, %d, %d) = %d\\n\",d,m,y,days_left_in_year(d,m,y));else return 1;}}return 0;}",
      "tests": [
        {
          "id": "c-lab-46-case-1",
          "label": "Case 1",
          "input": "8 L 2000 L 1900 L 2024 L 2023 L 2100 L 2400 L 4 L 1",
          "files": {},
          "stdout": "is_leap(2000) = 1\nis_leap(1900) = 0\nis_leap(2024) = 1\nis_leap(2023) = 0\nis_leap(2100) = 0\nis_leap(2400) = 1\nis_leap(4) = 1\nis_leap(1) = 0\n"
        },
        {
          "id": "c-lab-46-case-2",
          "label": "Case 2",
          "input": "8 M 2 2024 M 2 2023 M 2 1900 M 2 2000 M 4 2023 M 12 1 M 0 2023 M 13 2023",
          "files": {},
          "stdout": "days_in_month(2, 2024) = 29\ndays_in_month(2, 2023) = 28\ndays_in_month(2, 1900) = 28\ndays_in_month(2, 2000) = 29\ndays_in_month(4, 2023) = 30\ndays_in_month(12, 1) = 31\ndays_in_month(0, 2023) = 0\ndays_in_month(13, 2023) = 0\n"
        },
        {
          "id": "c-lab-46-case-3",
          "label": "Case 3",
          "input": "9 V 29 2 2023 V 29 2 2024 V 31 4 2023 V 30 4 2023 V 0 1 2023 V 1 1 0 V 31 12 9999 V 1 1 10000 V 32 1 2023",
          "files": {},
          "stdout": "is_valid_date(29, 2, 2023) = 0\nis_valid_date(29, 2, 2024) = 1\nis_valid_date(31, 4, 2023) = 0\nis_valid_date(30, 4, 2023) = 1\nis_valid_date(0, 1, 2023) = 0\nis_valid_date(1, 1, 0) = 0\nis_valid_date(31, 12, 9999) = 1\nis_valid_date(1, 1, 10000) = 0\nis_valid_date(32, 1, 2023) = 0\n"
        },
        {
          "id": "c-lab-46-case-4",
          "label": "Case 4",
          "input": "8 Y 1 1 2023 Y 31 12 2023 Y 31 12 2024 Y 1 3 2024 Y 1 3 2023 Y 29 2 2023 Y 15 6 2000 Y 29 2 1900",
          "files": {},
          "stdout": "day_of_year(1, 1, 2023) = 1\nday_of_year(31, 12, 2023) = 365\nday_of_year(31, 12, 2024) = 366\nday_of_year(1, 3, 2024) = 61\nday_of_year(1, 3, 2023) = 60\nday_of_year(29, 2, 2023) = -1\nday_of_year(15, 6, 2000) = 167\nday_of_year(29, 2, 1900) = -1\n"
        },
        {
          "id": "c-lab-46-case-5",
          "label": "Case 5",
          "input": "6 R 31 12 2023 R 1 1 2024 R 1 1 2023 R 29 2 2024 R 30 2 2024 R 1 13 2023",
          "files": {},
          "stdout": "days_left_in_year(31, 12, 2023) = 0\ndays_left_in_year(1, 1, 2024) = 365\ndays_left_in_year(1, 1, 2023) = 364\ndays_left_in_year(29, 2, 2024) = 306\ndays_left_in_year(30, 2, 2024) = -1\ndays_left_in_year(1, 13, 2023) = -1\n"
        },
        {
          "id": "c-lab-46-case-6",
          "label": "Case 6",
          "input": "5 V -1 5 2023 Y 31 1 2023 R 28 2 1900 M -3 2023 L 400",
          "files": {},
          "stdout": "is_valid_date(-1, 5, 2023) = 0\nday_of_year(31, 1, 2023) = 31\ndays_left_in_year(28, 2, 1900) = 306\ndays_in_month(-3, 2023) = 0\nis_leap(400) = 1\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-47",
    "subject": "c",
    "title": "Down, Grab, Up",
    "topics": [
      "pointers",
      "pass by reference",
      "address-of",
      "dereference"
    ],
    "published": true,
    "prompt": "Implement the four functions in the starter. swap_ints exchanges the values that a and b point to; it must also work when a and b point to the same int (the value stays the same). sort_three rearranges the three values so that *a <= *b <= *c. split_seconds splits total (0-359999) into hours, minutes (0-59) and seconds (0-59) and writes them through the three pointers. pick_larger returns whichever of the two pointers points to the larger value, or a on a tie; return the pointer you were given, because the driver writes through it. Driver input: a command count, then S x y, I x (swap x with itself), T x y z, H total or P x y.",
    "starterCode": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\nvoid swap_ints(int *a, int *b);\nvoid sort_three(int *a, int *b, int *c);\nvoid split_seconds(int total, int *hours, int *minutes, int *seconds);\nint *pick_larger(int *a, int *b);\n/* Implement the functions above. The game supplies main(). */\n",
    "tests": [],
    "rewards": {
      "money": 1400,
      "berries": [],
      "pokemon": null,
      "keepsake": "address-pearl"
    },
    "difficulty": "medium",
    "estimatedMinutes": {
      "min": 30,
      "max": 60
    },
    "chapters": [
      9
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 47,
    "schemaVersion": 4,
    "collection": "midterm-review",
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 9,
      "prerequisiteChapters": [
        4
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Implement the four functions in the starter. swap_ints exchanges the values that a and b point to; it must also work when a and b point to the same int (the value stays the same). sort_three rearranges the three values so that *a <= *b <= *c. split_seconds splits total (0-359999) into hours, minutes (0-59) and seconds (0-59) and writes them through the three pointers. pick_larger returns whichever of the two pointers points to the larger value, or a on a tie; return the pointer you were given, because the driver writes through it. Driver input: a command count, then S x y, I x (swap x with itself), T x y z, H total or P x y.",
    "learningObjectives": [
      "Implement the four functions in the starter. swap_ints exchanges the values that a and b point to; it must also work when a and b point to the same int (the value stays the same). sort_three rearranges the three values so that *a <= *b <= *c. split_seconds splits total (0-359999) into hours, minutes (0-59) and seconds (0-59) and writes them through the three pointers. pick_larger returns whichever of the two pointers points to the larger value, or a on a tie; return the pointer you were given, because the driver writes through it. Driver input: a command count, then S x y, I x (swap x with itself), T x y z, H total or P x y."
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
        "rarePokemon",
        "keepsake"
      ],
      "grantOn": "autograded-completion",
      "oncePerQuest": true,
      "requiresImplementedInventory": true
    },
    "giver": "Perl",
    "story": "Perl dives to the exact spot on the seabed, grabs what is there and comes back up. Pointers work the same way. Practise the dive.",
    "steps": [
      "Write swap_ints with a temporary variable",
      "Build sort_three from swap_ints",
      "Return results through output pointers and return a pointer itself"
    ],
    "hints": [
      "Swapping with a temporary works even when a and b point at the same int. The XOR trick does not.",
      "Three compare-and-swap steps sort three values: a with b, b with c, then a with b again.",
      "pick_larger must return a or b itself; the driver adds 100 through the returned pointer and checks which variable changed."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "functions",
      "harness": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\n#include \"quest.c\"\nint main(void){int n;if(scanf(\"%d\",&n)!=1)return 1;for(int i=0;i<n;i++){char c;if(scanf(\" %c\",&c)!=1)return 1;if(c=='S'){int x,y;if(scanf(\"%d%d\",&x,&y)!=2)return 1;swap_ints(&x,&y);printf(\"swap -> %d %d\\n\",x,y);}else if(c=='I'){int x;if(scanf(\"%d\",&x)!=1)return 1;swap_ints(&x,&x);printf(\"self swap -> %d\\n\",x);}else if(c=='T'){int x,y,z;if(scanf(\"%d%d%d\",&x,&y,&z)!=3)return 1;sort_three(&x,&y,&z);printf(\"sorted -> %d %d %d\\n\",x,y,z);}else if(c=='H'){int t,h=-1,m=-1,s=-1;if(scanf(\"%d\",&t)!=1)return 1;split_seconds(t,&h,&m,&s);printf(\"%d s -> %d h %d m %d s\\n\",t,h,m,s);}else if(c=='P'){int x,y;if(scanf(\"%d%d\",&x,&y)!=2)return 1;int *p=pick_larger(&x,&y);const char *which=p==&x?\"first\":p==&y?\"second\":\"neither\";if(p==&x||p==&y)*p+=100;printf(\"larger is the %s -> %d %d\\n\",which,x,y);}else return 1;}return 0;}",
      "tests": [
        {
          "id": "c-lab-47-case-1",
          "label": "Case 1",
          "input": "4 S 1 2 S -3 7 S 4 4 S -2147483648 2147483647",
          "files": {},
          "stdout": "swap -> 2 1\nswap -> 7 -3\nswap -> 4 4\nswap -> 2147483647 -2147483648\n"
        },
        {
          "id": "c-lab-47-case-2",
          "label": "Case 2",
          "input": "3 I 5 I -9 I 2147483647",
          "files": {},
          "stdout": "self swap -> 5\nself swap -> -9\nself swap -> 2147483647\n"
        },
        {
          "id": "c-lab-47-case-3",
          "label": "Case 3",
          "input": "8 T 3 1 2 T 1 2 3 T 3 2 1 T 2 2 1 T -5 0 -5 T -2147483648 2147483647 0 T 2 3 1 T 1 3 2",
          "files": {},
          "stdout": "sorted -> 1 2 3\nsorted -> 1 2 3\nsorted -> 1 2 3\nsorted -> 1 2 2\nsorted -> -5 -5 0\nsorted -> -2147483648 0 2147483647\nsorted -> 1 2 3\nsorted -> 1 2 3\n"
        },
        {
          "id": "c-lab-47-case-4",
          "label": "Case 4",
          "input": "6 H 3661 H 359999 H 0 H 59 H 3600 H 86399",
          "files": {},
          "stdout": "3661 s -> 1 h 1 m 1 s\n359999 s -> 99 h 59 m 59 s\n0 s -> 0 h 0 m 0 s\n59 s -> 0 h 0 m 59 s\n3600 s -> 1 h 0 m 0 s\n86399 s -> 23 h 59 m 59 s\n"
        },
        {
          "id": "c-lab-47-case-5",
          "label": "Case 5",
          "input": "5 P 5 9 P 9 5 P 7 7 P -1 -2 P -2147483648 2147483547",
          "files": {},
          "stdout": "larger is the second -> 5 109\nlarger is the first -> 109 5\nlarger is the first -> 107 7\nlarger is the first -> 99 -2\nlarger is the second -> -2147483648 2147483647\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-48",
    "subject": "c",
    "title": "The Dereferencer's Range",
    "topics": [
      "pointer arithmetic",
      "arrays and pointers",
      "half-open ranges"
    ],
    "published": true,
    "prompt": "Every function works on the half-open range [begin, end): begin points at the first element and end points one past the last, so begin == end is an empty range. Use pointer arithmetic. find_first returns a pointer to the first element equal to value, or end if there is none. count_range returns how many elements the range holds. reverse_range reverses the range in place and leaves everything outside it alone. max_element returns a pointer to the largest element (the first one on a tie), or end for an empty range. sum_stride adds begin[0], begin[step], begin[2 * step] and so on for as long as the element is still inside the range (step is 1-5). The driver prints each returned pointer as an index into its own array, so a pointer into a copy fails. Driver input: n (1-12) and n values, a command count, then F lo hi value, C lo hi, R lo hi, M lo hi or S lo hi step, with 0 <= lo <= hi <= n.",
    "starterCode": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\nint *find_first(int *begin, int *end, int value);\nint count_range(const int *begin, const int *end);\nvoid reverse_range(int *begin, int *end);\nint *max_element(int *begin, int *end);\nint sum_stride(const int *begin, const int *end, int step);\n/* Implement the functions above. The game supplies main(). */\n",
    "tests": [],
    "rewards": {
      "money": 3000,
      "berries": [],
      "pokemon": {
        "id": 299,
        "level": 25,
        "shiny": true
      }
    },
    "difficulty": "hard",
    "estimatedMinutes": {
      "min": 60,
      "max": 90
    },
    "chapters": [
      9
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 48,
    "schemaVersion": 4,
    "collection": "midterm-review",
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 9,
      "prerequisiteChapters": [
        4,
        8
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "Every function works on the half-open range [begin, end): begin points at the first element and end points one past the last, so begin == end is an empty range. Use pointer arithmetic. find_first returns a pointer to the first element equal to value, or end if there is none. count_range returns how many elements the range holds. reverse_range reverses the range in place and leaves everything outside it alone. max_element returns a pointer to the largest element (the first one on a tie), or end for an empty range. sum_stride adds begin[0], begin[step], begin[2 * step] and so on for as long as the element is still inside the range (step is 1-5). The driver prints each returned pointer as an index into its own array, so a pointer into a copy fails. Driver input: n (1-12) and n values, a command count, then F lo hi value, C lo hi, R lo hi, M lo hi or S lo hi step, with 0 <= lo <= hi <= n.",
    "learningObjectives": [
      "Every function works on the half-open range [begin, end): begin points at the first element and end points one past the last, so begin == end is an empty range. Use pointer arithmetic. find_first returns a pointer to the first element equal to value, or end if there is none. count_range returns how many elements the range holds. reverse_range reverses the range in place and leaves everything outside it alone. max_element returns a pointer to the largest element (the first one on a tie), or end for an empty range. sum_stride adds begin[0], begin[step], begin[2 * step] and so on for as long as the element is still inside the range (step is 1-5). The driver prints each returned pointer as an index into its own array, so a pointer into a copy fails. Driver input: n (1-12) and n values, a command count, then F lo hi value, C lo hi, R lo hi, M lo hi or S lo hi step, with 0 <= lo <= hi <= n."
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
    "giver": "Astrid Starr",
    "story": "Astrid Starr of Indirection Tower hands out a gauntlet of array ranges given only as two pointers. Walk them without ever stepping off the edge.",
    "steps": [
      "Loop with a pointer from begin while it is less than end",
      "Return pointers, not indexes",
      "Handle empty and one-element ranges"
    ],
    "hints": [
      "end - begin is a count of elements, not bytes. p + 1 moves to the next int, 4 bytes on in this sandbox.",
      "For an empty range begin == end: find_first and max_element must return end without reading anything.",
      "Reverse with two pointers moving toward each other; stop when fewer than two elements remain between them."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "functions",
      "harness": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\n#include \"quest.c\"\nint main(void){int a[12],n,k;if(scanf(\"%d\",&n)!=1||n<1||n>12)return 1;for(int i=0;i<n;i++)if(scanf(\"%d\",&a[i])!=1)return 1;if(scanf(\"%d\",&k)!=1)return 1;for(int i=0;i<k;i++){char c;int lo,hi;if(scanf(\" %c%d%d\",&c,&lo,&hi)!=3||lo<0||hi<lo||hi>n)return 1;if(c=='F'){int v;if(scanf(\"%d\",&v)!=1)return 1;int *p=find_first(a+lo,a+hi,v);printf(\"find %d in [%d, %d) -> index %d\\n\",v,lo,hi,(int)(p-a));}else if(c=='C')printf(\"count [%d, %d) -> %d\\n\",lo,hi,count_range(a+lo,a+hi));else if(c=='R'){reverse_range(a+lo,a+hi);printf(\"reverse [%d, %d) ->\",lo,hi);for(int j=0;j<n;j++)printf(\" %d\",a[j]);printf(\"\\n\");}else if(c=='M'){int *p=max_element(a+lo,a+hi);printf(\"max [%d, %d) -> index %d\\n\",lo,hi,(int)(p-a));}else if(c=='S'){int s;if(scanf(\"%d\",&s)!=1||s<1||s>5)return 1;printf(\"stride %d over [%d, %d) -> %d\\n\",s,lo,hi,sum_stride(a+lo,a+hi,s));}else return 1;}return 0;}",
      "tests": [
        {
          "id": "c-lab-48-case-1",
          "label": "Case 1",
          "input": "8 5 3 9 3 7 9 1 4 8 F 0 8 3 F 0 8 9 F 3 8 9 F 0 8 42 F 2 2 9 C 0 8 C 3 3 C 2 6",
          "files": {},
          "stdout": "find 3 in [0, 8) -> index 1\nfind 9 in [0, 8) -> index 2\nfind 9 in [3, 8) -> index 5\nfind 42 in [0, 8) -> index 8\nfind 9 in [2, 2) -> index 2\ncount [0, 8) -> 8\ncount [3, 3) -> 0\ncount [2, 6) -> 4\n"
        },
        {
          "id": "c-lab-48-case-2",
          "label": "Case 2",
          "input": "8 5 3 9 3 7 9 1 4 6 M 0 8 M 3 8 M 6 8 M 4 4 M 2 3 M 0 2",
          "files": {},
          "stdout": "max [0, 8) -> index 2\nmax [3, 8) -> index 5\nmax [6, 8) -> index 7\nmax [4, 4) -> index 4\nmax [2, 3) -> index 2\nmax [0, 2) -> index 0\n"
        },
        {
          "id": "c-lab-48-case-3",
          "label": "Case 3",
          "input": "7 1 2 3 4 5 6 7 5 R 0 7 R 0 6 R 2 5 R 3 3 R 6 7",
          "files": {},
          "stdout": "reverse [0, 7) -> 7 6 5 4 3 2 1\nreverse [0, 6) -> 2 3 4 5 6 7 1\nreverse [2, 5) -> 2 3 6 5 4 7 1\nreverse [3, 3) -> 2 3 6 5 4 7 1\nreverse [6, 7) -> 2 3 6 5 4 7 1\n"
        },
        {
          "id": "c-lab-48-case-4",
          "label": "Case 4",
          "input": "10 1 2 3 4 5 6 7 8 9 10 6 S 0 10 1 S 0 10 2 S 1 10 3 S 0 10 5 S 0 0 2 S 9 10 5",
          "files": {},
          "stdout": "stride 1 over [0, 10) -> 55\nstride 2 over [0, 10) -> 25\nstride 3 over [1, 10) -> 15\nstride 5 over [0, 10) -> 7\nstride 2 over [0, 0) -> 0\nstride 5 over [9, 10) -> 10\n"
        },
        {
          "id": "c-lab-48-case-5",
          "label": "Case 5",
          "input": "5 -4 -2 -9 -3 -1 5 M 0 5 F 1 5 -3 R 1 4 M 0 5 S 0 5 2",
          "files": {},
          "stdout": "max [0, 5) -> index 4\nfind -3 in [1, 5) -> index 3\nreverse [1, 4) -> -4 -3 -9 -2 -1\nmax [0, 5) -> index 4\nstride 2 over [0, 5) -> -14\n"
        },
        {
          "id": "c-lab-48-case-6",
          "label": "Case 6",
          "input": "1 42 4 F 0 1 42 M 0 1 R 0 1 C 0 1",
          "files": {},
          "stdout": "find 42 in [0, 1) -> index 0\nmax [0, 1) -> index 0\nreverse [0, 1) -> 42\ncount [0, 1) -> 1\n"
        }
      ]
    }
  },
  {
    "id": "c-lab-49",
    "subject": "c",
    "title": "Reproducible Luck",
    "topics": [
      "rand",
      "srand",
      "scaling random numbers"
    ],
    "published": true,
    "prompt": "The game swaps the real rand() and srand() for scripted versions: rand() returns the next number from the test's script (0 once the script runs out), and every call to rand() and srand() is counted. Implement: start_session(seed) seeds the generator by calling srand(seed) exactly once. roll_die(sides) returns 1 to sides (sides 1-100) as rand() % sides + 1. roll_range(low, high) returns low to high inclusive (-1000 <= low <= high <= 1000) as low + rand() % (high - low + 1). coin_flip() returns rand() % 2, where 1 means heads. count_hits(trials, chance) calls rand() once per trial (0-100 trials, even when chance is 0 or 100) and returns how many trials had rand() % 100 below chance (0-100). Call rand() exactly once per roll and never call srand() outside start_session. Driver input: the script length (0-64) and its values, a command count, then S seed, D sides, R low high, C or H trials chance.",
    "starterCode": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\nvoid start_session(unsigned int seed);\nint roll_die(int sides);\nint roll_range(int low, int high);\nint coin_flip(void);\nint count_hits(int trials, int chance);\n\n/* Implement the functions above. The game supplies main(). */\n",
    "tests": [],
    "rewards": {
      "money": 1400,
      "berries": [],
      "pokemon": {
        "id": 327,
        "level": 18
      }
    },
    "difficulty": "medium",
    "estimatedMinutes": {
      "min": 30,
      "max": 45
    },
    "chapters": [
      4
    ],
    "contentStatus": "autograded",
    "rewardStatus": "ready",
    "recommendedOrder": 49,
    "schemaVersion": 4,
    "collection": "midterm-review",
    "curriculum": {
      "subject": "c",
      "edition": 4,
      "isbn": "9780357506134",
      "primaryChapter": 4,
      "prerequisiteChapters": [
        3
      ],
      "basis": "Original lab aligned to the in-game fourth-edition curriculum; not a reproduced textbook exercise.",
      "localReferences": [
        "js/data/curriculum.js",
        "js/data/curriculum-notes.js",
        "output/curriculum/Curriculum-review.md"
      ]
    },
    "implementationContract": "The game swaps the real rand() and srand() for scripted versions: rand() returns the next number from the test's script (0 once the script runs out), and every call to rand() and srand() is counted. Implement: start_session(seed) seeds the generator by calling srand(seed) exactly once. roll_die(sides) returns 1 to sides (sides 1-100) as rand() % sides + 1. roll_range(low, high) returns low to high inclusive (-1000 <= low <= high <= 1000) as low + rand() % (high - low + 1). coin_flip() returns rand() % 2, where 1 means heads. count_hits(trials, chance) calls rand() once per trial (0-100 trials, even when chance is 0 or 100) and returns how many trials had rand() % 100 below chance (0-100). Call rand() exactly once per roll and never call srand() outside start_session. Driver input: the script length (0-64) and its values, a command count, then S seed, D sides, R low high, C or H trials chance.",
    "learningObjectives": [
      "The game swaps the real rand() and srand() for scripted versions: rand() returns the next number from the test's script (0 once the script runs out), and every call to rand() and srand() is counted. Implement: start_session(seed) seeds the generator by calling srand(seed) exactly once. roll_die(sides) returns 1 to sides (sides 1-100) as rand() % sides + 1. roll_range(low, high) returns low to high inclusive (-1000 <= low <= high <= 1000) as low + rand() % (high - low + 1). coin_flip() returns rand() % 2, where 1 means heads. count_hits(trials, chance) calls rand() once per trial (0-100 trials, even when chance is 0 or 100) and returns how many trials had rand() % 100 below chance (0-100). Call rand() exactly once per roll and never call srand() outside start_session. Driver input: the script length (0-64) and its values, a command count, then S seed, D sides, R low high, C or H trials chance."
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
    "giver": "Dr. Ohm",
    "story": "Dr. Ohm insists that every result is reproducible, even a roll of the dice. Seed once, scale correctly, and prove it with a scripted generator.",
    "steps": [
      "Call srand once, only in start_session",
      "Scale rand() with % and an offset",
      "Call rand() exactly once per roll or trial"
    ],
    "hints": [
      "Seeding again inside a roll restarts the sequence. The driver counts srand calls, so it notices.",
      "rand() % (high - low + 1) is 0 to high - low; adding low shifts it into range.",
      "count_hits must call rand() on every trial, even when chance is 0 or 100."
    ],
    "inputPolicy": "Exact output is required: case, spaces, numbers and final newlines must match. No extra prompts or labels. Every test starts in a fresh sandbox. C11 compilation uses -Wall -Wextra -Werror -pedantic-errors. Standard library files are in-memory only. Run uses the test driver for function labs. Submit must pass every test. Runtime limits: 3 seconds per test, 64 MB program memory, 16 KB output. Compiler preparation may take longer.",
    "grading": {
      "version": 1,
      "mode": "functions",
      "harness": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <limits.h>\n#include <stdint.h>\n#include <ctype.h>\n\nstatic int script[64];\nstatic int script_len=0,script_pos=0,rand_calls=0,srand_calls=0;\nstatic unsigned last_seed=0;\nint quest_rand(void){rand_calls++;return script_pos<script_len?script[script_pos++]:0;}\nvoid quest_srand(unsigned seed){srand_calls++;last_seed=seed;}\n#define rand quest_rand\n#define srand quest_srand\n#include \"quest.c\"\n#undef rand\n#undef srand\nstatic void counts(void){printf(\" | rand calls %d, srand calls %d\\n\",rand_calls,srand_calls);rand_calls=srand_calls=0;last_seed=0;}\nint main(void){int n;if(scanf(\"%d\",&script_len)!=1||script_len<0||script_len>64)return 1;for(int i=0;i<script_len;i++)if(scanf(\"%d\",&script[i])!=1)return 1;if(scanf(\"%d\",&n)!=1)return 1;for(int i=0;i<n;i++){char c;if(scanf(\" %c\",&c)!=1)return 1;if(c=='S'){unsigned s;if(scanf(\"%u\",&s)!=1)return 1;start_session(s);printf(\"start_session(%u) -> seeded with %u\",s,last_seed);counts();}else if(c=='D'){int s;if(scanf(\"%d\",&s)!=1)return 1;int r=roll_die(s);printf(\"roll_die(%d) -> %d\",s,r);counts();}else if(c=='R'){int lo,hi;if(scanf(\"%d%d\",&lo,&hi)!=2)return 1;int r=roll_range(lo,hi);printf(\"roll_range(%d, %d) -> %d\",lo,hi,r);counts();}else if(c=='C'){int r=coin_flip();printf(\"coin_flip() -> %d\",r);counts();}else if(c=='H'){int t,ch;if(scanf(\"%d%d\",&t,&ch)!=2)return 1;int r=count_hits(t,ch);printf(\"count_hits(%d, %d) -> %d\",t,ch,r);counts();}else return 1;}return 0;}",
      "tests": [
        {
          "id": "c-lab-49-case-1",
          "label": "Case 1",
          "input": "8 0 5 6 11 2147483647 100 99 12345 7 S 42 D 6 D 6 D 6 D 6 D 6 D 1",
          "files": {},
          "stdout": "start_session(42) -> seeded with 42 | rand calls 0, srand calls 1\nroll_die(6) -> 1 | rand calls 1, srand calls 0\nroll_die(6) -> 6 | rand calls 1, srand calls 0\nroll_die(6) -> 1 | rand calls 1, srand calls 0\nroll_die(6) -> 6 | rand calls 1, srand calls 0\nroll_die(6) -> 2 | rand calls 1, srand calls 0\nroll_die(1) -> 1 | rand calls 1, srand calls 0\n"
        },
        {
          "id": "c-lab-49-case-2",
          "label": "Case 2",
          "input": "6 0 7 20 2147483647 999 4 5 R 1 6 R 10 20 R -1000 1000 R 5 5 R 0 9",
          "files": {},
          "stdout": "roll_range(1, 6) -> 1 | rand calls 1, srand calls 0\nroll_range(10, 20) -> 17 | rand calls 1, srand calls 0\nroll_range(-1000, 1000) -> -980 | rand calls 1, srand calls 0\nroll_range(5, 5) -> 5 | rand calls 1, srand calls 0\nroll_range(0, 9) -> 9 | rand calls 1, srand calls 0\n"
        },
        {
          "id": "c-lab-49-case-3",
          "label": "Case 3",
          "input": "5 0 1 2 3 2147483647 5 C C C C C",
          "files": {},
          "stdout": "coin_flip() -> 0 | rand calls 1, srand calls 0\ncoin_flip() -> 1 | rand calls 1, srand calls 0\ncoin_flip() -> 0 | rand calls 1, srand calls 0\ncoin_flip() -> 1 | rand calls 1, srand calls 0\ncoin_flip() -> 1 | rand calls 1, srand calls 0\n"
        },
        {
          "id": "c-lab-49-case-4",
          "label": "Case 4",
          "input": "10 0 49 50 99 100 149 150 12345 2147483647 7 2 H 10 50 H 0 50",
          "files": {},
          "stdout": "count_hits(10, 50) -> 7 | rand calls 10, srand calls 0\ncount_hits(0, 50) -> 0 | rand calls 0, srand calls 0\n"
        },
        {
          "id": "c-lab-49-case-5",
          "label": "Case 5",
          "input": "12 1 2 3 4 5 6 7 8 9 10 11 12 4 S 7 H 4 0 H 4 100 H 4 3",
          "files": {},
          "stdout": "start_session(7) -> seeded with 7 | rand calls 0, srand calls 1\ncount_hits(4, 0) -> 0 | rand calls 4, srand calls 0\ncount_hits(4, 100) -> 4 | rand calls 4, srand calls 0\ncount_hits(4, 3) -> 0 | rand calls 4, srand calls 0\n"
        },
        {
          "id": "c-lab-49-case-6",
          "label": "Case 6",
          "input": "3 2147483647 2147483646 2147483645 3 R -1000 1000 D 100 C",
          "files": {},
          "stdout": "roll_range(-1000, 1000) -> -558 | rand calls 1, srand calls 0\nroll_die(100) -> 47 | rand calls 1, srand calls 0\ncoin_flip() -> 1 | rand calls 1, srand calls 0\n"
        },
        {
          "id": "c-lab-49-case-7",
          "label": "Case 7",
          "input": "1 9 3 D 10 D 10 S 5",
          "files": {},
          "stdout": "roll_die(10) -> 10 | rand calls 1, srand calls 0\nroll_die(10) -> 1 | rand calls 1, srand calls 0\nstart_session(5) -> seeded with 5 | rand calls 0, srand calls 1\n"
        }
      ]
    }
  }
];
