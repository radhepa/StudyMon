/* The wider cast: everyone in the region who is not one of the five companions.

   These are deliberately light. A companion in trainers.js carries a portrait,
   seven heart events and a friendship track; a townsperson carries a name, a
   place, a line or two, and one thing they DO.

   `kind` is that one thing:
       trainer  battle them; they pay out and their team grows with your badges
       shop     opens the counter
       heal     restores your party
       talk     a line and a study tip
       gift     hands over an item once

   `ch` is only a suggestion of which chapter suits them. Every battle here lets
   you choose the chapter yourself, so when StudyMon grows past C the same cast
   still works: swap the curriculum and Ari still wants to fight you about
   whatever you are revising this week. */

/* `badges` is how many gym badges the place wants before it will let you in.
   The early routes are open from the first day; the lab, the cavern and the
   quarter want you to have done some of the course first. */
window.LOCATIONS = [
  { id: 'town',    name: 'Bootstrap Town',   badges: 0,
    blurb: 'Where every run begins. The shops are here, and so is the Centre.' },
  { id: 'cafe',    name: 'The Compiler Café', badges: 0,
    blurb: 'Long tables, cheap refills, and people who will happily argue about pointers.' },
  { id: 'meadow',  name: 'Meadow Route',      badges: 0,
    blurb: 'Tall grass and younger trainers who have not learned to be nervous yet.' },
  { id: 'pier',    name: 'Riverside Pier',    badges: 2,
    blurb: 'Rods in the water, boots on the boards, nobody in a hurry.',
    locked: 'The ferryman only runs the crossing for trainers with two badges.' },
  { id: 'ridge',   name: 'Stack Ridge',       badges: 4,
    blurb: 'A long climb. The people up here carry their own weight and yours.',
    locked: 'The ridge path is roped off below four badges. People have got stuck up there.' },
  { id: 'archive', name: 'The Archive',       badges: 5,
    blurb: 'A library that also lends out Pokémon. Quiet, but not that quiet.',
    locked: 'Borrowing rights start at five badges. The archivist is immovable on this.' },
  { id: 'lab',     name: 'Linden Research Lab', badges: 7,
    blurb: 'Professor Linden’s field station. Six researchers, one very tired coffee machine.',
    locked: 'The lab admits trainers from seven badges. They have had incidents.' },
  { id: 'cavern',  name: 'Null Cavern',       badges: 9,
    blurb: 'Dark, echoing, and full of things that dereference badly.',
    locked: 'Nobody guides you into the cavern under nine badges. Nobody sensible, anyway.' },
  { id: 'quarter', name: 'Gym Quarter',       badges: 11,
    blurb: 'Where the serious challengers warm up before they knock.',
    locked: 'The quarter is for challengers with eleven badges or more.' }
];

window.TOWNSFOLK = [

  /* ---- Bootstrap Town ---------------------------------------------------- */
  { id: 'mart', name: 'Wren', cls: 'Mart Clerk', loc: 'town', kind: 'shop',
    say: 'Poké Balls are on the house, we have crates of them. Anything better, you pay for.' },
  { id: 'nurse', name: 'Nurse Ada', cls: 'Centre Nurse', loc: 'town', kind: 'heal',
    say: 'Set them down here. Rest is not a reward for finishing, it is part of the work.' },
  { id: 'aide', name: 'Kern', cls: 'Linden Lab Aide', loc: 'town', kind: 'talk',
    say: 'I hand out the starters while Professor Linden is out in the field. Which is always.',
    tip: 'A concept you can only recognise is not a concept you know. Try to produce it from nothing.',
    grant: { item: 'expShare', amount: 1, receipt: 'aide-exp-share' } },
  { id: 'postie', name: 'Bell', cls: 'Post Runner', loc: 'town', kind: 'talk',
    say: 'Everyone writes home saying they are winning. You are allowed to write that you are learning.',
    tip: 'Explaining a topic badly to someone else finds the hole faster than rereading does.' },
  { id: 'ren', name: 'Ren', cls: 'Youngster', loc: 'town', kind: 'trainer', ch: 1, team: [19, 16], pay: 90,
    say: 'My Pokémon is not strong but he is extremely brave!',
    win: 'You knew all of that? Straight away?', lose: 'Ha! Brave AND correct!' },
  { id: 'opal', name: 'Opal', cls: 'Lass', loc: 'town', kind: 'trainer', ch: 2, team: [300, 183], pay: 100,
    say: 'I only battle people who can spell their own variables.',
    win: 'Fine. You can spell.', lose: 'Told you. Naming is the hard part.' },
  { id: 'tam', name: 'Tam', cls: 'Shop Hand', loc: 'town', kind: 'gift', item: 'potion', amount: 2,
    say: 'Boss said to hand these out to anyone heading for a gym. You look like anyone.' },
  { id: 'gus', badges: 3, name: 'Gus', cls: 'Gentleman', loc: 'town', kind: 'trainer', ch: 3, team: [58, 83], pay: 180,
    say: 'I find a battle settles the mind before a long evening of study.',
    win: 'Crisply done. Precedence is character, you know.', lose: 'Order of operations, my friend. Order of operations.',
    want: 'A gentleman does not spar with the unproven. Three badges, then we talk.' },

  /* ---- The Compiler Café ------------------------------------------------- */
  { id: 'barista', name: 'Mo', cls: 'Window-Table Barista', loc: 'cafe', kind: 'talk',
    say: 'Table by the window is taken most afternoons. You know the ones.',
    tip: 'Two short sessions beat one long one. Your recall likes the gap in between.' },
  { id: 'dax', name: 'Dax', cls: 'Permanent Fixture', loc: 'cafe', kind: 'trainer', ch: 5, team: [63, 100], pay: 150,
    say: 'I have been in this chair since ten. Give me a reason to stand up.',
    win: 'Worth standing for.', lose: 'Back to my chair, then.' },
  { id: 'nel', name: 'Nel', cls: 'Study Group Lead', loc: 'cafe', kind: 'talk',
    say: 'We meet Thursdays. Bring something you got wrong, not something you got right.',
    tip: 'Wrong answers are the only ones that carry information. Keep a list of yours.' },
  { id: 'kip', name: 'Kip', cls: 'Waiter', loc: 'cafe', kind: 'gift', item: 'teaTin', amount: 1,
    say: 'On the house. You looked like the last battle went long.' },
  { id: 'sasha', name: 'Sasha', cls: 'Debate Club', loc: 'cafe', kind: 'trainer', ch: 5, team: [96, 280], pay: 160,
    say: 'I will take either side of any argument. Currently: dangling else.',
    win: 'Braces. Always braces. I concede.', lose: 'Indentation is a lie we tell ourselves.' },
  { id: 'juno', badges: 3, name: 'Juno', cls: 'Night Owl', loc: 'cafe', kind: 'trainer', ch: 6, team: [92, 41], pay: 170,
    say: 'I do my best work at two in the morning. It is currently the afternoon, so be gentle.',
    win: 'That is what I get for daylight.', lose: 'Perpetual loop. No exit condition. Love that for me.',
    want: 'I only keep the late table for people who have got somewhere. Three badges.' },
  { id: 'rook', name: 'Rook', cls: 'Crossword Setter', loc: 'cafe', kind: 'talk',
    say: 'Nine letters, means the same as "unspecified outcome". I will wait.',
    tip: 'If a question has an answer you cannot justify in one sentence, you have not learned it yet.' },

  /* ---- Meadow Route ------------------------------------------------------ */
  { id: 'ari', name: 'Ari', cls: 'Eager Bug Catcher', loc: 'meadow', kind: 'trainer', ch: 14, team: [10, 13], pay: 70,
    firstWinItems: [{ item: 'circuitToken', count: 1 }],
    say: 'I have got six of these and I am going to use all of them eventually!',
    win: 'Aw. I have got more at home.', lose: 'Told you! Bugs are underrated!' },
  { id: 'flo', name: 'Flo', cls: 'Quiet Bug Catcher', loc: 'meadow', kind: 'trainer', ch: 14, team: [265, 401], pay: 75,
    say: 'Shh. There is a really good one in the grass and you are scaring it.',
    win: 'You scared it off. Thanks a lot.', lose: 'Still here! Still quiet!' },
  { id: 'pim', name: 'Pim', cls: 'Youngster', loc: 'meadow', kind: 'trainer', ch: 1, team: [16, 19], pay: 80,
    say: 'My shorts are comfortable and easy to wear. That is all I have got.',
    win: 'That is fair.', lose: 'THE SHORTS!' },
  { id: 'wisp', name: 'Wisp', cls: 'Picnicker', loc: 'meadow', kind: 'trainer', ch: 2, team: [43, 187], pay: 85,
    say: 'There is enough lunch for two if this goes badly for me.',
    win: 'Sit down, then. I made too much anyway.', lose: 'More for me! No, sit, I am joking.' },
  { id: 'holt', name: 'Holt', cls: 'Camper', loc: 'meadow', kind: 'trainer', ch: 6, team: [396, 399], pay: 90,
    say: 'Third night out here. I have started naming the trees.',
    win: 'Good. I needed an excuse to go home.', lose: 'Night four it is.' },
  { id: 'birdy', name: 'Wynn', cls: 'Bird Keeper', loc: 'meadow', kind: 'trainer', ch: 6, team: [21, 276], pay: 95,
    say: 'They circle until they see an opening. So do I.',
    win: 'You did not give me one.', lose: 'There it was.' },
  { id: 'mo2', name: 'Bram', cls: 'Flower Seller', loc: 'meadow', kind: 'talk',
    say: 'Mira buys from me on Fridays. Do not tell her I said she haggles.',
    tip: 'Study the chapter you are avoiding. The avoidance is the signal.',
    grant: { item: 'pressedFlower', amount: 1, receipt: 'discovery:meadow-flower' } },
  { id: 'tilda', badges: 2, name: 'Tilda', cls: 'Lass', loc: 'meadow', kind: 'trainer', ch: 8, team: [74, 27], pay: 100,
    say: 'One after another, in order, no skipping. That is how I count and how I battle.',
    win: 'You went out of bounds.', lose: 'Zero to n minus one!',
    want: 'Come back with two badges and I will take you seriously.' },
  { id: 'quill', name: 'Quill', cls: 'Note Taker', loc: 'meadow', kind: 'gift', item: 'circuitToken', amount: 1,
    say: 'Found this in the grass. I do not catch things, I just write about them.' },

  /* ---- Riverside Pier ---------------------------------------------------- */
  { id: 'oz', name: 'Oz', cls: 'Restless Fisherman', loc: 'pier', kind: 'trainer', ch: 7, team: [129, 118], pay: 110,
    say: 'Been out here since dawn. Caught one boot and a cold.',
    win: 'That is about how the day was going.', lose: 'First win all week!' },
  { id: 'sal', name: 'Sal', cls: 'Patient Fisherman', loc: 'pier', kind: 'trainer', ch: 7, team: [72, 116], pay: 115,
    say: 'The trick is the wait. Most people cannot do the wait.',
    win: 'You waited. Good.', lose: 'See? The wait.' },
  { id: 'coral', name: 'Coral', cls: 'Swimmer', loc: 'pier', kind: 'trainer', ch: 7, team: [120, 60], pay: 120,
    say: 'Water is a stream. So is your keyboard. I think about that a lot.',
    win: 'Fine, you understand streams.', lose: 'Buffered! Ha!' },
  { id: 'brine', badges: 3, name: 'Brine', cls: 'Sailor', loc: 'pier', kind: 'trainer', ch: 13, team: [278, 90], pay: 140,
    say: 'Everything on my boat is stored in fixed-size crates. Makes it easy to find crate nine.',
    win: 'Fair winds to you.', lose: 'Random access, lad. Random access.',
    want: 'Deep water is for three-badge trainers. Harbour rules, not mine.' },
  { id: 'nemo', name: 'Nemo', cls: 'Bait Seller', loc: 'pier', kind: 'shop',
    say: 'Balls, potions, and opinions. The first two are for sale.' },
  { id: 'skiff', name: 'Skiff', cls: 'Ferryman', loc: 'pier', kind: 'talk',
    say: 'I take people across and back. Mostly back, later, quieter.',
    tip: 'Read the whole question before the options. The options are designed to tempt you.',
    grant: { item: 'seaGlass', amount: 1, receipt: 'discovery:pier-sea-glass' } },
  { id: 'perl', badges: 4, name: 'Perl', cls: 'Pearl Diver', loc: 'pier', kind: 'trainer', ch: 10, team: [366, 90], pay: 150,
    say: 'Down, grab, up. If you stay down too long you do not come up at all.',
    win: 'Clean dive.', lose: 'You held on too long.',
    want: 'I dive with people who can hold their nerve. Four badges says you can.' },
  { id: 'wade', name: 'Wade', cls: 'Fisherman', loc: 'pier', kind: 'gift', item: 'seaGlass', amount: 1,
    say: 'Bought a box of these and I only ever use the red ones. Take a couple.' },

  /* ---- Stack Ridge ------------------------------------------------------- */
  { id: 'burl', name: 'Burl', cls: 'Loaded Hiker', loc: 'ridge', kind: 'trainer', ch: 8, team: [74, 95], pay: 130,
    say: 'I carry everything I need. It is heavy and it is contiguous.',
    win: 'Lighter load going down.', lose: 'Solid. Like the rock.' },
  { id: 'crag', name: 'Crag', cls: 'Steady Hiker', loc: 'ridge', kind: 'trainer', ch: 8, team: [246, 111], pay: 135,
    say: 'Up is simple. One step, then the same step again.',
    win: 'You kept your footing.', lose: 'Off you go. Mind the drop.' },
  { id: 'kes', name: 'Kes', cls: 'Black Belt', loc: 'ridge', kind: 'trainer', ch: 4, team: [66, 236], pay: 160,
    say: 'One call. One return. Nothing wasted in between.',
    win: 'Clean form.', lose: 'You did too much in the middle.' },
  { id: 'roan', name: 'Roan', cls: 'Mountain Guide', loc: 'ridge', kind: 'talk',
    say: 'June trained up here. She still walks faster than me on the flat.',
    tip: 'When a trace gets long, write the variables down. Your head is not a whiteboard.',
    grant: { item: 'carvedWhistle', amount: 1, receipt: 'discovery:ridge-whistle' } },
  { id: 'flint', name: 'Flint', cls: 'Miner', loc: 'ridge', kind: 'trainer', ch: 14, team: [524, 304], pay: 145,
    say: 'You want one seam out of the rock, you cut away everything that is not the seam.',
    win: 'Neat cut.', lose: 'That is masking, that is.' },
  { id: 'ida', badges: 6, name: 'Ida', cls: 'Ace Trainer', loc: 'ridge', kind: 'trainer', ch: 9, team: [92, 200], pay: 220,
    say: 'I do not battle beginners any more. Convince me you are not one.',
    win: 'Consider me convinced.', lose: 'Come back with more chapters.',
    want: 'Ace trainers battle ace trainers. Six badges and you qualify.' },
  { id: 'moss', name: 'Moss', cls: 'Ranger', loc: 'ridge', kind: 'gift', item: 'trailPermit', amount: 1,
    say: 'Stronger than the ones in town. Do not waste it on a scratch.' },
  { id: 'tor', badges: 7, name: 'Tor', cls: 'Veteran', loc: 'ridge', kind: 'trainer', ch: 15, team: [147, 371], pay: 260,
    say: 'Forty years on this ridge. Everything up here is a chain of one thing leading to the next.',
    win: 'You followed it all the way to the end. Good.', lose: 'You let go of the head. Then you lost the list.',
    want: 'Seven badges. Then I will know you are not wasting the climb.' },

  /* ---- The Archive ------------------------------------------------------- */
  { id: 'libr', name: 'Vell', cls: 'Chief Archivist', loc: 'archive', kind: 'talk',
    say: 'Everything here is indexed. Ask me for chapter nine and I will not go looking through chapter one.',
    tip: 'A sorted list is worth the cost of sorting it the moment you search twice.' },
  { id: 'sci1', name: 'Dr. Ohm', cls: 'Scientist', loc: 'archive', kind: 'trainer', ch: 3, team: [81, 100], pay: 190,
    say: 'Every result here is reproducible. Let us see whether you are.',
    win: 'Reproducible. Noted.', lose: 'One data point. Come back.' },
  { id: 'sci2', name: 'Dr. Hale', cls: 'Scientist', loc: 'archive', kind: 'trainer', ch: 12, team: [436, 374], pay: 200,
    say: 'I group related things and give the group a name. It is most of what I do.',
    win: 'Well structured.', lose: 'You left a member out.' },
  { id: 'psy', name: 'Marn', cls: 'Psychic', loc: 'archive', kind: 'trainer', ch: 5, team: [63, 96], pay: 175,
    say: 'I know which branch you will take. I usually know before you do.',
    win: 'I did not see that one.', lose: 'The nearest unmatched one. Always.' },
  { id: 'tutor', badges: 7, name: 'Ms. Lin', cls: 'Move Tutor', loc: 'archive', kind: 'talk',
    say: 'I teach one thing at a time, properly. Come back when you have used it.',
    tip: 'If you can only do a problem with the notes open, schedule it again for tomorrow.',
    want: 'I teach moves to trainers who have earned seven. Otherwise it does not stick.' },
  { id: 'clerk2', name: 'Fitz', cls: 'Supply Desk', loc: 'archive', kind: 'shop',
    say: 'Reference desk on the left, equipment on the right. You want the right.' },
  { id: 'ink', name: 'Ink', cls: 'Precise Copyist', loc: 'archive', kind: 'trainer', ch: 11, team: [235, 175], pay: 165,
    say: 'I copy things exactly. One character out and the whole line means nothing.',
    win: 'Correct to the terminator.', lose: 'You dropped a byte.' },
  { id: 'shelf', badges: 8, name: 'Bram Elder', cls: 'Retired Lecturer', loc: 'archive', kind: 'talk',
    say: 'I taught this material for thirty years. The bit everyone forgets is that the machine does exactly what you wrote.',
    tip: 'When something is wrong, doubt your code before you doubt the compiler. You will be right almost every time.',
    want: 'I stopped lecturing to people who had not done the reading. Eight badges.' },

  /* ---- Null Cavern ------------------------------------------------------- */
  { id: 'spook', name: 'Vex', cls: 'Hex Maniac', loc: 'cavern', kind: 'trainer', ch: 9, team: [92, 353], pay: 185,
    say: 'Everything in here points somewhere. Not everything points somewhere real.',
    win: 'You checked before you followed. Boring. Correct.', lose: 'Straight off the end. They all do it.' },
  { id: 'null', name: 'Nils', cls: 'Careful Cave Guide', loc: 'cavern', kind: 'talk',
    say: 'Rule one: know where you are before you take another step.',
    tip: 'Test a pointer against NULL before you follow it. Every single time.' },
  { id: 'leak', name: 'Sump', cls: 'Keeper Caver', loc: 'cavern', kind: 'trainer', ch: 10, team: [88, 316], pay: 195,
    say: 'People leave things down here and never come back for them. It adds up.',
    win: 'Tidy.', lose: 'That is another one nobody is collecting.' },
  { id: 'echo', name: 'Echo', cls: 'Sound Reader', loc: 'cavern', kind: 'trainer', ch: 15, team: [41, 200], pay: 190,
    say: 'One call, then the same call quieter, then quieter. Until it stops.',
    win: 'You found the base case.', lose: 'No base case. It just kept going.' },
  { id: 'geo', name: 'Geode', cls: 'Exacting Miner', loc: 'cavern', kind: 'trainer', ch: 14, team: [74, 525], pay: 175,
    say: 'Shift everything left, the top falls off. Learned that the expensive way.',
    win: 'You kept your carry.', lose: 'Overflowed. Told you.' },
  { id: 'lamp', name: 'Wick', cls: 'Lamplighter', loc: 'cavern', kind: 'gift', item: 'bentSpoon', amount: 1,
    say: 'Somebody dropped this by the entrance months back. It should go to someone who is actually going in.' },
  { id: 'deep', badges: 11, name: 'Fen', cls: 'Veteran', loc: 'cavern', kind: 'trainer', ch: 13, team: [131, 91], pay: 250,
    say: 'Down here everything is raw. No labels, no formatting. Just what is actually stored.',
    win: 'You can read it raw. Not many can.', lose: 'You were reading the text version. There is not one.',
    want: 'Eleven badges before I take anyone further down. I have carried people out.' },


  /* ---- a Centre in every location --------------------------------------- */
  { id: 'nurse-cafe', name: 'Nurse Beni', cls: 'Centre Nurse', loc: 'cafe', kind: 'heal',
    say: 'We share the back room with the café. Mind the espresso machine, it is louder than the healing bay.' },
  { id: 'nurse-meadow', name: 'Nurse Poppy', cls: 'Field Nurse', loc: 'meadow', kind: 'heal',
    say: 'A tent, a bench and a very good kettle. It does the job.' },
  { id: 'nurse-pier', name: 'Nurse Halcyon', cls: 'Harbour Nurse', loc: 'pier', kind: 'heal',
    say: 'Bring them in off the boards. Everything down here comes in damp.' },
  { id: 'nurse-ridge', name: 'Nurse Corrie', cls: 'Ridge Nurse', loc: 'ridge', kind: 'heal',
    say: 'Halfway up is exactly where a Centre belongs. Sit. Breathe.' },
  { id: 'nurse-archive', name: 'Nurse Quire', cls: 'Reading Room Nurse', loc: 'archive', kind: 'heal',
    say: 'Quietly, please. They recover just as well without an announcement.' },
  { id: 'nurse-lab', name: 'Nurse Sorrel', cls: 'Lab Nurse', loc: 'lab', kind: 'heal',
    say: 'Everything in here is calibrated, including me. Set them down.' },
  { id: 'nurse-cavern', name: 'Nurse Vaultly', cls: 'Cavern Nurse', loc: 'cavern', kind: 'heal',
    say: 'The lamp stays on all night. People find their way here eventually.' },
  { id: 'nurse-quarter', name: 'Nurse Marek', cls: 'Quarter Nurse', loc: 'quarter', kind: 'heal',
    say: 'Straight in, straight out. Half of you will be back within the hour.' },

  /* ---- Linden Research Lab ----------------------------------------------- */
  { id: 'linden', name: 'Professor Linden', cls: 'Pokémon Professor', loc: 'lab', kind: 'trainer',
    ch: 9, team: [137, 233, 479], pay: 420, badges: 7,
    say: 'Seven badges. Good. I only take up the time of people who have already spent some of their own.',
    win: 'Then my notes were wrong, and that is the most useful thing to happen all month.',
    lose: 'Come back when the middle chapters are as solid as the early ones.' },
  { id: 'sci-ash', name: 'Dr. Ashling', cls: 'Field Researcher', loc: 'lab', kind: 'trainer',
    ch: 10, team: [88, 316], pay: 240, firstWinItems: [{ item: 'rareCandy', count: 1 }],
    say: 'I study what gets left behind. You would be amazed how much of it there is.',
    win: 'Noted, filed, and slightly annoying.', lose: 'Another sample for the pile.' },
  { id: 'sci-holly', name: 'Dr. Hollis', cls: 'Data Analyst', loc: 'lab', kind: 'trainer',
    ch: 8, team: [137, 233], pay: 250,
    say: 'One table, indexed from zero, and every question you have ever asked me is in it.',
    win: 'I will add this to the table.', lose: 'Row fourteen. As predicted.' },
  { id: 'sci-yew', name: 'Dr. Yewell', cls: 'Behaviourist', loc: 'lab', kind: 'trainer',
    ch: 5, team: [96, 605], pay: 245,
    say: 'I watch what people choose when they think both options are fine.',
    win: 'Interesting. You did not hesitate.', lose: 'You hesitated. That is the finding.' },
  { id: 'sci-birk', badges: 8, name: 'Dr. Birkin', cls: 'Systems Engineer', loc: 'lab', kind: 'trainer',
    ch: 12, team: [436, 599], pay: 255,
    say: 'Everything in this building is a record with a tag saying which record it is.',
    win: 'Well specified.', lose: 'You read the wrong member.',
    want: 'The rig is live. Eight badges before I let anyone near it.' },
  { id: 'sci-nim', badges: 9, name: 'Dr. Nimue', cls: 'Cryogenics', loc: 'lab', kind: 'trainer',
    ch: 13, team: [225, 615], pay: 250,
    say: 'We store everything raw down here. No formatting, no translation, no opinions.',
    win: 'Read exactly as written.', lose: 'You were expecting text.',
    want: 'The cold room opens at nine badges. Insurance, mostly.' },
  { id: 'sci-oak', badges: 10, name: 'Dr. Oakes', cls: 'Lab Archivist Emeritus', loc: 'lab', kind: 'talk',
    say: 'Linden was my student. I have never once managed to tell her so without her changing the subject.',
    tip: 'Rebuild a solved problem from a blank page a week later. That is the only honest test.',
    want: 'Ten. At my age I am selective about who I spend an afternoon on.' },
  { id: 'lab-shop', name: 'Petra', cls: 'Requisitions', loc: 'lab', kind: 'shop',
    say: 'Research budget. Same prices as town, better shelves.' },

  /* ---- Gym Quarter ------------------------------------------------------- */
  { id: 'ace1', name: 'Corin', cls: 'Quarter Warm-Up Ace', loc: 'quarter', kind: 'trainer', ch: 4, team: [68, 62], pay: 230,
    say: 'Everyone here is warming up for the same door you are.',
    win: 'Go on, then. Knock.', lose: 'Another lap of the quarter for you.' },
  { id: 'ace2', badges: 12, name: 'Delia', cls: 'Quarter Standards Ace', loc: 'quarter', kind: 'trainer', ch: 12, team: [208, 212], pay: 235,
    say: 'Structure first. Then padding. Then, if you are lucky, speed.',
    win: 'Well aligned.', lose: 'You had a gap in the middle.',
    want: 'Twelve badges. The quarter has standards and I enforce them.' },
  { id: 'blk', name: 'Osk', cls: 'Black Belt', loc: 'quarter', kind: 'trainer', ch: 4, team: [107, 297], pay: 210,
    say: 'Pass me the value or pass me the address. Decide before you swing.',
    win: 'By reference. Obviously.', lose: 'You passed a copy. Nothing changed.' },
  { id: 'beauty', name: 'Nova', cls: 'Beauty', loc: 'quarter', kind: 'trainer', ch: 11, team: [36, 40], pay: 205,
    say: 'Everything I own ends properly. Nothing trails off into whatever comes next.',
    win: 'Terminated cleanly.', lose: 'You ran off the end of me.' },
  { id: 'rocker', name: 'Ziv', cls: 'Rocker', loc: 'quarter', kind: 'trainer', ch: 3, team: [100, 125], pay: 200,
    say: 'Loud, fast, and technically an operator.',
    win: 'Short circuit. Fine. FINE.', lose: 'Left side settled it! Never even played the right!' },
  { id: 'referee', badges: 13, name: 'Ash-Grey', cls: 'Referee', loc: 'quarter', kind: 'talk',
    say: 'I call the gym matches. The leaders are not trying to fail you, they are trying to find the gap.',
    tip: 'Before a gym, drill the chapter\'s tier-one questions until they are boring. The hard ones rest on them.',
    want: 'I brief finalists only. Thirteen badges.' },
  { id: 'shopq', name: 'Hale', cls: 'Quarter Trader', loc: 'quarter', kind: 'shop',
    say: 'Best stock in the region, and the prices to match.' },
  { id: 'champ', badges: 14, name: 'Odile', cls: 'Veteran', loc: 'quarter', kind: 'trainer', ch: 15, team: [149, 248], pay: 300,
    say: 'I sat where you are sitting. Fifteen badges and it still felt like guessing.',
    win: 'It stops feeling like guessing. Eventually.', lose: 'Not yet. Soon.',
    want: 'Fourteen. If you are not nearly finished, you are not who I am waiting for.' }
];

/* Painted headshots for the wider cast. Anyone without one falls back to the
   lettered disc, so this can stay a short list and grow when art arrives.
   The shift is the residual offset of the FACE from the centre of the finished
   crop, measured by tools/make-folk-heads.py — the CSS corrects by it so every
   face lands on the same spot regardless of hair. */
window.FOLK_PORTRAITS = {
  'nurse-meadow': 'assets/trainers/poppy-portrait.png'
};
window.FOLK_HEAD_SHIFT = {
  'nurse-meadow': 0
};

/* Where the five companions can be run into. They are met in the world like
   everyone else now, not handed to you on the Friends screen, so each one waits
   somewhere that suits them and opens up as the badge gates do. */
window.COMPANION_HOME = {
  rowan: 'town',      // the practice field, from the first day
  ellis: 'cafe',      // the cafe window, where she draws
  mira:  'meadow',    // her herbs are behind the field Centre
  theo:  'pier',      // 2 badges: he is fixing the harbour winches
  june:  'ridge'      // 4 badges: she guides the climb
};

// Painted portraits share the companion head-and-shoulders framing.
Object.assign(window.FOLK_PORTRAITS, {"nurse": "assets/trainers/ada-portrait.png", "nurse-cafe": "assets/trainers/beni-portrait.png", "dax": "assets/trainers/dax-portrait.png", "barista": "assets/trainers/mo-portrait.png", "gus": "assets/trainers/gus-portrait.png", "tam": "assets/trainers/tam-portrait.png", "mart": "assets/trainers/wren-portrait.png", "opal": "assets/trainers/opal-portrait.png", "postie": "assets/trainers/bell-portrait.png", "aide": "assets/trainers/kern-portrait.png", "ren": "assets/trainers/ren-portrait.png"});

/* Imported from full-body art by tools/import-portraits.py and framed by
   tools/reframe-portraits.py. Folk ids are unique across both regions, so the
   Isles cast shares this map. */
Object.assign(window.FOLK_PORTRAITS, {
  "aide": "assets/trainers/kern-portrait.png",
  "ari": "assets/trainers/ari-portrait.png",
  "barista": "assets/trainers/mo-portrait.png",
  "birdy": "assets/trainers/wynn-portrait.png",
  "brine": "assets/trainers/brine-portrait.png",
  "c-bram": "assets/trainers/leif-portrait.png",
  "c-mart-harbour": "assets/trainers/tobin-portrait.png",
  "c-vesta": "assets/trainers/vesta-portrait.png",
  "clerk2": "assets/trainers/fitz-portrait.png",
  "coral": "assets/trainers/coral-portrait.png",
  "dax": "assets/trainers/dax-portrait.png",
  "flint": "assets/trainers/flint-portrait.png",
  "flo": "assets/trainers/flo-portrait.png",
  "gus": "assets/trainers/gus-portrait.png",
  "holt": "assets/trainers/holt-portrait.png",
  "ida": "assets/trainers/ida-portrait.png",
  "ink": "assets/trainers/ink-portrait.png",
  "juno": "assets/trainers/juno-portrait.png",
  "kes": "assets/trainers/kes-portrait.png",
  "kip": "assets/trainers/kip-portrait.png",
  "lab-shop": "assets/trainers/petra-portrait.png",
  "libr": "assets/trainers/vell-portrait.png",
  "linden": "assets/trainers/professor-linden-portrait.png",
  "mart": "assets/trainers/wren-portrait.png",
  "mo2": "assets/trainers/bram-portrait.png",
  "moss": "assets/trainers/moss-portrait.png",
  "nel": "assets/trainers/nel-portrait.png",
  "nurse": "assets/trainers/ada-portrait.png",
  "nurse-cafe": "assets/trainers/beni-portrait.png",
  "nurse-meadow": "assets/trainers/poppy-portrait.png",
  "nurse-pier": "assets/trainers/nurse-halcyon-portrait.png",
  "opal": "assets/trainers/opal-portrait.png",
  "oz": "assets/trainers/oz-portrait.png",
  "perl": "assets/trainers/perl-portrait.png",
  "pim": "assets/trainers/pim-portrait.png",
  "postie": "assets/trainers/bell-portrait.png",
  "psy": "assets/trainers/marn-portrait.png",
  "quill": "assets/trainers/quill-portrait.png",
  "referee": "assets/trainers/ash-grey-portrait.png",
  "ren": "assets/trainers/ren-portrait.png",
  "roan": "assets/trainers/roan-portrait.png",
  "rook": "assets/trainers/rook-portrait.png",
  "sal": "assets/trainers/sal-portrait.png",
  "sasha": "assets/trainers/sasha-portrait.png",
  "sci-ash": "assets/trainers/dr-ashling-portrait.png",
  "sci-birk": "assets/trainers/dr-birkin-portrait.png",
  "sci-holly": "assets/trainers/dr-hollis-portrait.png",
  "sci-nim": "assets/trainers/dr-nimue-portrait.png",
  "sci-oak": "assets/trainers/dr-oakes-portrait.png",
  "sci-yew": "assets/trainers/dr-yewell-portrait.png",
  "sci1": "assets/trainers/dr-ohm-portrait.png",
  "sci2": "assets/trainers/dr-hale-portrait.png",
  "skiff": "assets/trainers/skiff-portrait.png",
  "tam": "assets/trainers/tam-portrait.png",
  "tilda": "assets/trainers/tilda-portrait.png",
  "tor": "assets/trainers/tor-portrait.png",
  "tutor": "assets/trainers/ms-lin-portrait.png",
  "wade": "assets/trainers/wade-portrait.png",
  "wisp": "assets/trainers/wisp-portrait.png"
});

/* Gym leaders and bosses had no portrait of their own. Keyed by name, which is
   unique across every gym and boss in both regions. */
window.LEADER_PORTRAITS = {
  "ANSI": "assets/trainers/ansi-portrait.png",
  "Astrid Starr": "assets/trainers/astrid-starr-portrait.png",
  "Della Twain": "assets/trainers/della-twain-portrait.png",
  "Fee Seeker": "assets/trainers/fee-seeker-portrait.png",
  "Fee Seeker II": "assets/trainers/fee-seeker-ii-portrait.png",
  "Ida Overflow": "assets/trainers/ida-overflow-portrait.png",
  "Linka Head": "assets/trainers/linka-head-portrait.png",
  "Nula Terminel": "assets/trainers/nula-terminel-portrait.png",
  "Padma Align": "assets/trainers/padma-align-portrait.png",
  "Reva Call": "assets/trainers/reva-call-portrait.png",
  "Rhea Dexter": "assets/trainers/rhea-dexter-portrait.png",
  "Seg Fault": "assets/trainers/seg-fault-portrait.png",
  "Uma Bee": "assets/trainers/uma-bee-portrait.png",
  "Xora Mask": "assets/trainers/xora-mask-portrait.png"
};
