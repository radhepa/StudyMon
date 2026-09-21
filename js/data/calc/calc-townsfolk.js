/* The people of the Converging Isles.

   Every `cls` here is one the C region already defines an arc for in
   folk-events.js, so each of these forty gets their three heart events for
   free - write a name, an isle and a line, and the friendship system does the
   rest. Keep it that way when you add more: check CLASS_STORY before inventing
   a job title, or the person will have nothing to say at one heart.

   `ch` is a gym number on THIS island chain (1-10), not a C chapter. */


window.CALC_TOWNSFOLK = [

  /* ---------------- Origin Harbour ---------------- */
  { id: 'c-nurse-harbour', name: 'Nurse Pell', cls: 'Harbour Nurse', loc: 'harbour', kind: 'heal',
    say: 'Everything on these isles is measured from this room. Including how tired you look. Sit down.' },
  { id: 'c-mart-harbour', name: 'Tobin', cls: 'Mart Clerk', loc: 'harbour', kind: 'shop',
    say: 'Balls, potions, and a chart of the archipelago that is only approximately right.' },
  { id: 'c-vesta', name: 'Vesta', cls: 'Note Taker', loc: 'harbour', kind: 'talk',
    say: 'Thirty-five lessons. I have written all their titles on the wall so I can cross them off.',
    tip: 'Ten of the thirty-five are only ever tested on an exam. Nobody quizzes you on them first.' },
  { id: 'c-bram', name: 'Leif', cls: 'Sailor', loc: 'harbour', kind: 'trainer', ch: 1, team: [278, 279], pay: 140,
    say: 'A heading and a length. That is all a course is, and all a vector is.',
    win: 'Fine. Your bearing was better than mine.', lose: 'Magnitude without direction gets you nowhere.' },
  { id: 'c-tess', name: 'Tess', cls: 'Lass', loc: 'harbour', kind: 'trainer', ch: 1, team: [16, 21], pay: 130,
    say: 'I can tell you the angle class from the sign of the dot product alone. Watch.',
    win: 'Obtuse. I knew it was obtuse.', lose: 'Positive, so acute. Told you.' },
  { id: 'c-odell', name: 'Odell', cls: 'Ferryman', loc: 'harbour', kind: 'gift', item: 'fieldNotebook', amount: 1,
    say: 'First crossing is on the house. So is this.' },

  /* ---------------- The Slide Rule ---------------- */
  { id: 'c-nurse-sliderule', name: 'Nurse Ame', cls: 'Centre Nurse', loc: 'sliderule', kind: 'heal',
    say: 'We share a wall with the bar, so the healing bay is louder than it should be. It still works.' },
  { id: 'c-marlo', name: 'Marlo', cls: 'Barista', loc: 'sliderule', kind: 'talk',
    say: 'Table four has been arguing about whether the harmonic series converges since Tuesday. It does not.',
    tip: 'Terms going to zero is necessary, never sufficient. That table learned it the slow way.' },
  { id: 'c-imre', name: 'Imre', cls: 'Debate Club', loc: 'sliderule', kind: 'trainer', ch: 2, team: [43, 69], pay: 160,
    say: 'I will argue either side. Currently: whether you should ever integrate in dx.',
    win: 'Fewer integrals in dy. I concede.', lose: 'Two integrals where one would do. As I said.' },
  { id: 'c-suzu', name: 'Suzu', cls: 'Study Group Lead', loc: 'sliderule', kind: 'talk',
    say: 'We meet before every quiz. Bring the problem you could not finish, not the one you could.' },
  { id: 'c-piet', name: 'Piet', cls: 'Waiter', loc: 'sliderule', kind: 'gift', item: 'tinyUmbrella', amount: 1,
    say: 'You have been staring at the same page for an hour. Take this and go outside.' },
  { id: 'c-noor', name: 'Noor', cls: 'Night Owl', loc: 'sliderule', kind: 'trainer', ch: 2, team: [92, 41], pay: 165,
    badges: 2, want: 'Come back with two badges. I only play people who have finished a quiz.',
    say: 'I do my best work at two in the morning. It is currently the afternoon, so be gentle.',
    win: 'Sharper than me. At this hour, anyway.', lose: 'Told you. Afternoon.' },

  /* ---------------- Riemann Flats ---------------- */
  { id: 'c-nurse-flats', name: 'Nurse Nessa', cls: 'Field Nurse', loc: 'flats', kind: 'heal',
    say: 'The tide comes in over the flats in even strips. Very restful. Sit and watch it while I work.' },
  { id: 'c-adia', name: 'Adia', cls: 'Bug Catcher', loc: 'flats', kind: 'trainer', ch: 2, team: [10, 13], pay: 120,
    firstWinItems: [{ item: 'integralToken', count: 1 }],
    say: 'I count things in strips. Rectangles first, then curves. That is the whole idea, is it not?',
    win: 'More strips next time. Thinner ones.', lose: 'You have to add up ALL of them.' },
  { id: 'c-hollis', name: 'Celia', cls: 'Picnicker', loc: 'flats', kind: 'talk',
    say: 'Find where the curves cross before you set up anything. I lost a whole afternoon to that once.',
    tip: 'If the curves swap places inside your interval, one integral is not enough. Split it there.' },
  { id: 'c-fen', name: 'Ludo', cls: 'Camper', loc: 'flats', kind: 'trainer', ch: 3, team: [37, 58], pay: 145,
    say: 'Shells or washers. Pick one and commit. You do not get to change your mind halfway.',
    win: 'You picked the one that avoided solving for x. Correct.', lose: 'Now you have to invert the function. Enjoy.' },
  { id: 'c-ilse', name: 'Ilse', cls: 'Flower Seller', loc: 'flats', kind: 'gift', item: 'integralToken', amount: 1,
    say: 'For the strip between the curves. Two of them, since there are two curves.' },

  /* ---------------- Lathe Point ---------------- */
  { id: 'c-nurse-lathe', name: 'Nurse Coble', cls: 'Ridge Nurse', loc: 'lathe', kind: 'heal',
    say: 'Machine shop injuries and exam nerves. I see about the same number of each.' },
  { id: 'c-arne', name: 'Arne', cls: 'Systems Engineer', loc: 'lathe', kind: 'trainer', ch: 3, team: [82, 205], pay: 175,
    say: 'Everything in this yard turns on an axis. The radius is measured from THAT axis, not the origin.',
    win: 'You measured from the right line. Most do not.', lose: 'Wrong axis. Everything downstream was wrong too.' },
  { id: 'c-mirit', name: 'Mirit', cls: 'Shop Hand', loc: 'lathe', kind: 'shop',
    say: 'Supplies, and a warning: the difference of the squares, never the square of the difference.' },
  { id: 'c-dov', name: 'Dov', cls: 'Hiker', loc: 'lathe', kind: 'trainer', ch: 3, team: [95, 74], pay: 170,
    say: 'I measure the walk up the headland by laying string along it. Then I square the slope. Then I regret it.',
    win: 'The one under the radical is the DERIVATIVE. I keep forgetting.', lose: 'Squared, and plus one. Always plus one.' },
  { id: 'c-yannick', name: 'Yannick', cls: 'Bait Seller', loc: 'lathe', kind: 'talk',
    say: 'A spring does not pull the same at every stretch, so you cannot just multiply. That is the whole of work.',
    tip: 'Slice, write what one slice contributes, integrate. Every physical application is those three steps.' },

  /* ---------------- Helix Ridge ---------------- */
  { id: 'c-nurse-helix', name: 'Nurse Ilva', cls: 'Ridge Nurse', loc: 'helix', kind: 'heal', badges: 3,
    say: 'The spiral path is longer than it looks. Everybody arrives here surprised.' },
  { id: 'c-sable', name: 'Sable', cls: 'Mountain Guide', loc: 'helix', kind: 'trainer', ch: 4, team: [181, 125], pay: 190,
    say: 'Odd power, save one. Say it on the way up and you will not forget it at the top.',
    win: 'Peeled the right factor. Good.', lose: 'You needed a du and you did not save one.' },
  { id: 'c-orin', name: 'Orin', cls: 'Ranger', loc: 'helix', kind: 'talk',
    say: 'Everything up here is wearing a shape that is not its own. Match the radical to its identity.',
    tip: 'Three radicals, three substitutions: a²−x² takes sine, a²+x² takes tangent, x²−a² takes secant.' },
  { id: 'c-brisa', name: 'Brisa', cls: 'Psychic', loc: 'helix', kind: 'trainer', ch: 5, team: [64, 97], pay: 200,
    badges: 4, want: 'Four badges. I do not read for people who are still on their first quiz.',
    say: 'I can tell you which technique an integral wants before you finish writing it down.',
    win: 'You named it first. That is the only skill that matters here.', lose: 'Parts. It was always parts.' },
  { id: 'c-tovah', name: 'Tovah', cls: 'Caver', loc: 'helix', kind: 'gift', item: 'carvedWhistle', amount: 1,
    say: 'Take it. The climb from here only gets steeper.' },

  /* ---------------- The Integral Table ---------------- */
  { id: 'c-nurse-table', name: 'Nurse Quen', cls: 'Reading Room Nurse', loc: 'table', kind: 'heal', badges: 5,
    say: 'Quietly, please. You may rest, but the tables are being read.' },
  { id: 'c-lorne', name: 'Lorne', cls: 'Archivist', loc: 'table', kind: 'talk',
    say: 'Every antiderivative anyone has ever needed is in this room. Knowing which page is the actual skill.',
    tip: 'Simplify, substitute, parts, trigonometric, partial fractions. Most integrals fall to the first three.' },
  { id: 'c-perpetua', name: 'Perpetua', cls: 'Archivist Emeritus', loc: 'table', kind: 'trainer', ch: 5, team: [122, 199], pay: 210,
    badges: 5,
    say: 'Improper numerator? Divide first. I will not hear the decomposition until you have.',
    win: 'You divided. Forty years and most people still do not.', lose: 'Degree of the top must be less. Always.' },
  { id: 'c-abel', name: 'Abel', cls: 'Copyist', loc: 'table', kind: 'trainer', ch: 6, team: [93, 42], pay: 205,
    say: 'I copy out limits by hand. Every improper integral in this building has one written above it.',
    win: 'You wrote the limit. Half of them do not.', lose: 'An improper integral without a limit is an assertion.' },
  { id: 'c-noam', name: 'Noam', cls: 'Retired Lecturer', loc: 'table', kind: 'talk', badges: 6,
    want: 'Six badges. Then I will know you have sat a real exam.',
    say: 'A sequence is a list. A series adds the list up. Nearly every mistake after this point starts there.' },

  /* ---------------- Hawthorn Observatory ---------------- */
  { id: 'c-nurse-obs', name: 'Nurse Elgar', cls: 'Lab Nurse', loc: 'observatory', kind: 'heal', badges: 6,
    say: 'They measure all night and forget to eat. You are at least going to rest.' },
  { id: 'c-hawthorn', name: 'Professor Hawthorn', cls: 'Observatory Director', loc: 'observatory', kind: 'talk', badges: 7,
    want: 'Seven badges. Come back when you have something worth me interrupting a measurement for.',
    say: 'A polynomial can impersonate any smooth function you like, provided you do not walk too far from the centre. My whole life\'s work is finding out how far that is.',
    tip: 'The Ratio Test gives you the radius and then goes silent. The endpoints are two separate problems.' },
  { id: 'c-ravi', name: 'Ravi', cls: 'Field Researcher', loc: 'observatory', kind: 'trainer', ch: 9, team: [65, 178], pay: 230,
    badges: 6,
    say: 'Six series memorised. Everything else I build from them by substituting.',
    win: 'Built from a known one. Faster than derivatives every time.', lose: 'You computed those derivatives one at a time, did you not.' },
  { id: 'c-solveig', name: 'Solveig', cls: 'Lab Aide', loc: 'observatory', kind: 'shop',
    say: 'Requisitions. And yes, the error bound needs a bound on the next derivative. Everyone asks.' },
  { id: 'c-pim', name: 'Ivo', cls: 'Data Analyst', loc: 'observatory', kind: 'trainer', ch: 7, team: [233, 137], pay: 220,
    say: 'I sort series into converges and does not. There is no third pile.',
    win: 'Correctly sorted.', lose: 'That one goes in the other pile.' },

  /* ---------------- Cauchy Deep ---------------- */
  { id: 'c-nurse-deep', name: 'Nurse Halla', cls: 'Cavern Nurse', loc: 'deep', kind: 'heal', badges: 8,
    say: 'Cold down here. Partial sums go down and do not come back. You, however, are going back up.' },
  { id: 'c-vidar', name: 'Vidar', cls: 'Pearl Diver', loc: 'deep', kind: 'trainer', ch: 8, team: [130, 131], pay: 245,
    badges: 8,
    say: 'Sign first, then size. Get the order wrong down here and you do not surface.',
    win: 'Both conditions. On the sizes, not the terms.', lose: 'Decreasing in SIZE. The signs were never the issue.' },
  { id: 'c-esker', name: 'Esker', cls: 'Hex Maniac', loc: 'deep', kind: 'talk',
    say: 'The alternating harmonic series converges. Take its absolute values and it does not. Both are true at once.',
    tip: 'That is conditional convergence, and it is the only place two true statements feel like a contradiction.' },
  { id: 'c-ruben', name: 'Ruben', cls: 'Miner', loc: 'deep', kind: 'trainer', ch: 8, team: [95, 208], pay: 240,
    say: 'Factorials go to the Ratio Test. Powers to the Root Test. I have never needed a third rule.',
    win: 'Right tool.', lose: 'You brought a comparison to a factorial fight.' },

  /* ---------------- The Exam Hall ---------------- */
  { id: 'c-nurse-hall', name: 'Nurse Odd', cls: 'Quarter Nurse', loc: 'hall', kind: 'heal', badges: 9,
    say: 'Everyone who comes through that door is either about to sit one or has just sat one. Rest either way.' },
  { id: 'c-invigilator', name: 'Kestrel', cls: 'Referee', loc: 'hall', kind: 'talk', badges: 9,
    say: 'Three evening papers and a Final. You do not get past the second gym block until the first is behind you.',
    tip: 'Lessons 10, 11, 20, 27 and 35 appear on no quiz. The exams are where the course tests them, so they turn up on the routes too: 10 on Route 3, 11 on Route 4, 20 on Route 6, 27 on Route 9, 35 on Route 10.' },
  { id: 'c-thane', name: 'Thane', cls: 'Ace Trainer', loc: 'hall', kind: 'trainer', ch: 10, team: [671, 282], pay: 280,
    badges: 9,
    say: 'Angle first, then reach. And count the petals before you integrate over them.',
    win: 'Odd k, k petals. You counted.', lose: 'You integrated over the whole circle and got four times the answer.' },
  { id: 'c-supply-hall', name: 'Odalys', cls: 'Quarter Trader', loc: 'hall', kind: 'shop', badges: 9,
    say: 'Last stop before the hall. Buy what you need; there is no shop inside.' },
  { id: 'c-mireille', name: 'Mireille', cls: 'Gentleman', loc: 'hall', kind: 'trainer', ch: 9, team: [65, 196], pay: 300,
    badges: 10, want: 'All ten badges. The Final does not take walk-ins and neither do I.',
    say: 'Thirty-five lessons, in any order, with no warning about which. Shall we rehearse?',
    win: 'In any order. You were ready.', lose: 'That is what the Final feels like. Go and study.' }
];

/* Isles portraits live in FOLK_PORTRAITS in townsfolk.js alongside the C cast.
   Folk ids are unique across both regions, and friends.js and town.js read
   only that one map, so there is nothing region specific to keep here. */
window.CALC_FOLK_HEAD_SHIFT = {};

/* Nobody from the C region lives here, and none of the five companions have
   moved - friendships are shared, so they stay findable in their own region. */
window.CALC_COMPANION_HOME = {};

if (window.CALC_SUBJECT) window.CALC_SUBJECT.TOWNSFOLK = window.CALC_TOWNSFOLK;
