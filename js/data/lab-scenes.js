/* Opening and closing cutscenes for every Side Quest lab.

   Played by js/engine/lab-scenes.js. Each lab has `open` (before the lab
   loads) and `close` (the moment every test passes). A beat is
     { who, text }                      who is a LAB_SCENE_CAST id, 'you' or 'narrator'
     { ..., warm: '...' }               replaces text once you have 3+ hearts with who
     { ..., outcome: { independent, persisted, guided } }   closing lines by how it went
     { ..., reward: true }              the handover; the reward card comes from the quest data
   Every speaker has a finished portrait (validated against the game's portrait
   maps by validateLabScenes). Lines in the ten hard labs 9-12 and 25-30 pick up
   the offers already made in js/data/quest-framing.js. */
window.LAB_SCENE_CAST = {
  // Companions
  rowan: { name: 'Rowan', role: 'Rival', portrait: 'assets/trainers/rowan-portrait.png' },
  mira: { name: 'Mira', role: 'Town Gardener', portrait: 'assets/trainers/mira-portrait.png' },
  theo: { name: 'Theo', role: 'Repair Apprentice', portrait: 'assets/trainers/theo-portrait.png' },
  june: { name: 'June', role: 'Trail Guide', portrait: 'assets/trainers/june-portrait.png' },
  ellis: { name: 'Ellis', role: 'Illustrator', portrait: 'assets/trainers/ellis-portrait.png' },
  // Townsfolk
  nurse: { name: 'Nurse Ada', role: 'Centre Nurse', portrait: 'assets/trainers/ada-portrait.png' },
  'nurse-meadow': { name: 'Nurse Poppy', role: 'Field Nurse', portrait: 'assets/trainers/poppy-portrait.png' },
  mart: { name: 'Wren', role: 'Mart Clerk', portrait: 'assets/trainers/wren-portrait.png' },
  tam: { name: 'Tam', role: 'Shop Hand', portrait: 'assets/trainers/tam-portrait.png' },
  aide: { name: 'Kern', role: 'Linden Lab Aide', portrait: 'assets/trainers/kern-portrait.png' },
  linden: { name: 'Professor Linden', role: 'Pokémon Professor', portrait: 'assets/trainers/professor-linden-portrait.png' },
  postie: { name: 'Bell', role: 'Post Runner', portrait: 'assets/trainers/bell-portrait.png' },
  mo2: { name: 'Bram', role: 'Flower Seller', portrait: 'assets/trainers/bram-portrait.png' },
  gus: { name: 'Gus', role: 'Gentleman', portrait: 'assets/trainers/gus-portrait.png' },
  tilda: { name: 'Tilda', role: 'Lass', portrait: 'assets/trainers/tilda-portrait.png' },
  juno: { name: 'Juno', role: 'Night Owl', portrait: 'assets/trainers/juno-portrait.png' },
  ink: { name: 'Ink', role: 'Precise Copyist', portrait: 'assets/trainers/ink-portrait.png' },
  libr: { name: 'Vell', role: 'Chief Archivist', portrait: 'assets/trainers/vell-portrait.png' },
  roan: { name: 'Roan', role: 'Mountain Guide', portrait: 'assets/trainers/roan-portrait.png' },
  holt: { name: 'Holt', role: 'Camper', portrait: 'assets/trainers/holt-portrait.png' },
  'sci-nim': { name: 'Dr. Nimue', role: 'Cryogenics', portrait: 'assets/trainers/dr-nimue-portrait.png' },
  coral: { name: 'Coral', role: 'Swimmer', portrait: 'assets/trainers/coral-portrait.png' },
  kip: { name: 'Kip', role: 'Waiter', portrait: 'assets/trainers/kip-portrait.png' },
  kes: { name: 'Kes', role: 'Black Belt', portrait: 'assets/trainers/kes-portrait.png' },
  sasha: { name: 'Sasha', role: 'Debate Club', portrait: 'assets/trainers/sasha-portrait.png' },
  psy: { name: 'Marn', role: 'Psychic', portrait: 'assets/trainers/marn-portrait.png' },
  perl: { name: 'Perl', role: 'Pearl Diver', portrait: 'assets/trainers/perl-portrait.png' },
  sci1: { name: 'Dr. Ohm', role: 'Scientist', portrait: 'assets/trainers/dr-ohm-portrait.png' },
  // Gym leaders and the Elite Four, off duty
  'c-gym-9': { name: 'Astrid Starr', role: 'Indirection Tower Gym Leader', portrait: 'assets/trainers/astrid-starr-portrait.png' },
  'c-gym-10': { name: 'Nula Terminel', role: 'Terminator Glade Gym Leader', portrait: 'assets/trainers/nula-terminel-portrait.png' },
  'c-gym-11': { name: 'Padma Align', role: 'Foundry Gym Leader', portrait: 'assets/trainers/padma-align-portrait.png' },
  'c-gym-12': { name: 'Fee Seeker', role: 'Binary Glacier Gym Leader', portrait: 'assets/trainers/fee-seeker-portrait.png' },
  'c-gym-13': { name: 'Xora Mask', role: 'Bitmask Hollow Gym Leader', portrait: 'assets/trainers/xora-mask-portrait.png' },
  'c-gym-14': { name: 'Linka Head', role: 'Endless Chain Gym Leader', portrait: 'assets/trainers/linka-head-portrait.png' },
  'c-gym-15': { name: 'Reva Call', role: 'Returning Steps Gym Leader', portrait: 'assets/trainers/reva-call-portrait.png' },
  'c-boss-e1': { name: 'Seg Fault', role: 'Elite Four, off duty', portrait: 'assets/trainers/seg-fault-portrait.png' },
  'c-boss-e2': { name: 'Ida Overflow', role: 'Elite Four, off duty', portrait: 'assets/trainers/ida-overflow-portrait.png' },
  'c-boss-e3': { name: 'Fee Seeker II', role: 'Elite Four, off duty', portrait: 'assets/trainers/fee-seeker-ii-portrait.png' },
  'c-boss-e4': { name: 'Uma Bee', role: 'Elite Four, off duty', portrait: 'assets/trainers/uma-bee-portrait.png' },
  'c-boss-champ': { name: 'ANSI', role: 'Champion', portrait: 'assets/trainers/ansi-portrait.png' }
};

window.LAB_SCENES = {

  /* ---- Labs 1-30 ------------------------------------------------------- */

  'c-lab-01': {
    open: { title: 'The Usual', place: 'Pokémon Centre front desk', beats: [
      { who: 'nurse', text: "Oh, good. A steady pair of hands. The night shift left me three check-in slips that just say 'the usual', in three different handwritings." },
      { who: 'nurse', text: "Every slip needs the same three things: the trainer ID, the party count and the fee in cents. Numbers the morning shift cannot misread at four in the morning." },
      { who: 'you', text: "So I give each one a name, a value, and print it?" },
      { who: 'nurse', text: "Exactly that. A variable is a labelled drawer. Declare it, put the number in, and let printf say it plainly with %d. The label is the part people skip, and it is the part that matters." },
      { who: 'nurse', text: "Start small. A first program that simply says what it means is worth more than a clever one nobody can read.", warm: "You always start small with me, and I have noticed. Rest is part of the work, and so is a first program that simply says what it means." }
    ] },
    close: { title: 'Pinned Above the Desk', place: 'Pokémon Centre front desk', beats: [
      { who: 'nurse', text: "Trainer ID 42, party count 3, fee 125 cents. It reads exactly the same at four in the morning as it does at noon. That was the whole point." },
      { who: 'nurse', text: "I pinned it above the desk. The night shift has stopped writing 'the usual'. One of them drew a small star on it, which I am choosing to count as a review." },
      { who: 'nurse', reward: true, text: "The Centre keeps a little fund for helpers: ₵600, and three Oran Berries from the back room. They restore a few HP between battles, so please do not save them for a special occasion." },
      { who: 'nurse', text: "Come back when you are tired, not only when you are hurt. Rest is not a reward for finishing. It is part of the work." }
    ] }
  },

  'c-lab-02': {
    open: { title: 'A Strong, Confident Nudge', place: 'Poké Mart counter', beats: [
      { who: 'mart', text: "The register's down again. Tam kicked it." },
      { who: 'tam', text: "I nudged it. A strong, confident nudge." },
      { who: 'mart', text: "Balls are 200 cents, Potions 300. I need the total printed as dollars and cents, exactly. Floating-point money is how a Mart ends up forty cents short on a Tuesday and nobody can say why." },
      { who: 'mart', text: "So count whole cents as ints and split them at the very end: cents / 100 for the dollars, cents % 100 for the rest, padded with %02d so five cents prints as .05, not .5." },
      { who: 'tam', text: "And if somebody orders a hundred Potions?" },
      { who: 'mart', text: "Then it says ERROR. We carry ninety-nine at most. We are a small Mart, Tam." }
    ] },
    close: { title: 'Thirteen Dollars Exactly', place: 'Poké Mart counter', beats: [
      { who: 'mart', text: "Two balls and three Potions: Total: $13.00. Not $12.9999. Not 'about thirteen'. Thirteen." },
      { who: 'tam', text: "I tried ordering minus one Poké Ball. It said ERROR. It was very rude about it." },
      { who: 'mart', text: "It was exactly as rude as it needed to be." },
      { who: 'mart', reward: true, text: "Here: ₵600 for the afternoon and three Oran Berries off the back shelf. Call it a staff discount you did not have to be staff for." }
    ] }
  },

  'c-lab-03': {
    open: { title: 'A Rule, Not Advice', place: 'Practice field', beats: [
      { who: 'rowan', text: "You're here. Good. I don't want advice. I want a rule." },
      { who: 'rowan', text: "Mid-battle, nobody thinks clearly. So: zero HP, retreat. A quarter of max or less, and you still have a Potion, heal. Otherwise attack. Same input, same answer, every single time." },
      { who: 'rowan', text: "Order matters. Check the fainted case first, or a Pokémon with zero HP charges straight in. I've seen it happen. I was the trainer." },
      { who: 'rowan', text: "Keep it in ints: HP times four at most max means a quarter or less. I'm not letting a rounding error decide my matches.", warm: "...I lost a match last week because I panicked and healed at full HP. It's in the notebook. Useful data. Help me make it the last entry like that." }
    ] },
    close: { title: 'Taped Inside the Cover', place: 'Practice field', beats: [
      { who: 'rowan', text: "Twenty-five out of a hundred with a Potion: HEAL. Twenty-six: ATTACK. One HP out of four: HEAL. It draws the line exactly where I would, on a good day." },
      { who: 'rowan', text: "I taped it inside the notebook cover. Don't read the rest of the notebook." },
      { who: 'rowan', reward: true, text: "₵600 from the practice-match pot, and three Oran Berries. You'll need them next time we battle. That's not a threat. It's a forecast." },
      { who: 'rowan', text: "We're even now. Until the next match.", warm: "Thanks. I mean it. Same time tomorrow?" }
    ] }
  },

  'c-lab-04': {
    open: { title: 'Switchbacks', place: 'Trailhead notice board', beats: [
      { who: 'june', text: "Seven days of training notes, one number a day. I've been adding them up on the back of a trail map, which is how the map got its coffee ring." },
      { who: 'june', text: "I need the total, the average to two decimals, and the best day. If two days tie, the earlier one wins. First to the summit counts." },
      { who: 'june', text: "No array for this one. Keep a running total and a best-so-far as you go, like counting switchbacks on the way up. You don't need to remember every switchback, just how many, and which one was steepest." },
      { who: 'june', text: "And if a number's missing or silly, say ERROR. A plan built on a bad reading is how people end up camping somewhere they didn't mean to." }
    ] },
    close: { title: 'Confirmed by Something Other Than Pride', place: 'Trailhead notice board', beats: [
      { who: 'june', text: "Total, average, best day. Day three. That was the day it rained and I kept going anyway. Nice to have it confirmed by something that isn't my own pride." },
      { who: 'june', text: "I'm planning next week from this. Longer, not steeper. There's a difference, and my knees know it." },
      { who: 'june', reward: true, text: "₵600 from the guide fund and three Oran Berries. I packed them for two, like always. Turns out the second person was you." }
    ] }
  },

  'c-lab-05': {
    open: { title: 'Eleven Sticky Notes', place: 'Linden Lab training station', beats: [
      { who: 'aide', text: "The training station calculates damage three different ways, depending on who wrote the sticky note. I would like it to be one way." },
      { who: 'aide', text: "Two functions. heal_hp adds healing but never past the maximum. estimate_damage is power times attack over defense, integer division, because that's all the station's ancient display can show." },
      { who: 'aide', text: "Bad arguments return -1. Not 0. Zero is a real answer, and the station will cheerfully heal a Pokémon to zero if you let it." },
      { who: 'aide', text: "Write each one once and call it everywhere. I carry duplicate checklists so the lab doesn't need duplicate code. Division of labour." }
    ] },
    close: { title: 'Naked, and Beautiful', place: 'Linden Lab training station', beats: [
      { who: 'aide', text: "heal_hp(90, 100, 50) gives 100. A defense of zero gives -1 instead of setting the station on fire. Metaphorically. Mostly." },
      { who: 'aide', text: "I've peeled off eleven sticky notes. The station looks naked. It's beautiful." },
      { who: 'aide', reward: true, text: "Linden signed off a Revive from the supply cupboard, plus ₵1,400. She didn't read what she was signing. I'm choosing to call that trust." },
      { who: 'aide', text: "If anyone asks, I did not smile. I was squinting at a bird." }
    ] }
  },

  'c-lab-06': {
    open: { title: 'Gentler Training', place: 'Pokémon Centre ward', beats: [
      { who: 'nurse', text: "Some trainers push a Level 5 as hard as their Level 40, and the little ones end up in my ward sore all over." },
      { who: 'nurse', text: "I'd like a roll call. Store up to six levels in an array, then find the lowest, the highest and the average. The lowest tells me who needs gentler training." },
      { who: 'tilda', text: "Six slots. Index zero to five. Not one to six. Never one to six." },
      { who: 'nurse', text: "Tilda volunteers here on Saturdays. She has opinions about counting." },
      { who: 'tilda', text: "They are correct opinions." }
    ] },
    close: { title: 'Zero to N Minus One', place: 'Pokémon Centre ward', beats: [
      { who: 'nurse', text: "Lowest, highest, average. The Level 5 is flagged, and its trainer has promised a week of walks instead of gyms." },
      { who: 'tilda', text: "Did you start the loop at zero?" },
      { who: 'you', text: "Zero to n minus one." },
      { who: 'tilda', text: "Then you may keep volunteering." },
      { who: 'nurse', reward: true, text: "₵600 from the Centre fund and three Oran Berries. Feed the smallest one on your team first, please. Nurse's orders." }
    ] }
  },

  'c-lab-07': {
    open: { title: 'Sparky and SPARKY', place: 'Post office sorting table', beats: [
      { who: 'postie', text: "Two parcels came in for 'Sparky' and 'SPARKY'. Different trainers, same nickname. One Pikachu received a very confusing birthday card." },
      { who: 'postie', text: "The registry needs to refuse a nickname that's already there, whatever the capitals. But it has to keep the spelling people chose, because they care how their Pokémon's name looks." },
      { who: 'c-gym-10', text: "Everyone deserves to be remembered correctly. Including the capital letters they chose." },
      { who: 'postie', text: "Nula Terminel runs the lockers at the Glade. We compare notes. Mostly about names." },
      { who: 'c-gym-10', text: "Compare the letters case-insensitively, store them exactly. And mind the end of every name. A string is not finished until its zero says so." }
    ] },
    close: { title: 'Birthday Cards, Delivered', place: 'Post office sorting table', beats: [
      { who: 'postie', text: "'Sparky' goes in. 'SPARKY' comes back 0, a duplicate. 'Sp4rky' comes back -1, not a valid name. The birthday cards will find the right trainers now." },
      { who: 'c-gym-10', text: "And you kept their spelling. Blissey approves. Blissey would like to give you an egg." },
      { who: 'postie', text: "Please don't accept the egg on post office time." },
      { who: 'postie', reward: true, text: "What I can give you is ₵1,400 and two Sitrus Berries. Write home and tell them you've been busy. You're allowed to say you're learning, too." }
    ] }
  },

  'c-lab-08': {
    open: { title: 'Order Is Data', place: 'Linden Research Lab', beats: [
      { who: 'linden', text: "Observations. Species, level, habitat. Four hundred of them, filed in whatever order the field teams remembered to hand them in." },
      { who: 'linden', text: "I want the ones from one habitat, at or above a given level, copied out in their original order. Order is data. Reordering it is editorialising." },
      { who: 'linden', text: "Use the struct you're given. A record should travel as one thing, not as three arrays someone will eventually misalign." },
      { who: 'linden', text: "I'll be in the field. Kern knows where. He'll say he doesn't." }
    ] },
    close: { title: 'The Part I Measure', place: 'Linden Research Lab', beats: [
      { who: 'linden', text: "Water, level twenty and above: the matching records, in their original order. Correct." },
      { who: 'linden', text: "I was going to say that was quick, but I've been out since before dawn and have no idea what time it is. It's correct. That's the part I measure." },
      { who: 'linden', reward: true, text: "₵1,400 from the survey budget, and two Sitrus Berries. Kern picked the berries. He'll claim he didn't." }
    ] }
  },

  'c-lab-09': {
    open: { title: 'The Spare Stool', place: 'Repair shop workbench', beats: [
      { who: 'theo', text: "Um. Hi. Sorry, the stool's under the radio parts. There. The spare one's for visitors." },
      { who: 'theo', text: "The starter roster keeps running out of room. Every time a new trainer signs up, someone copies the whole list into a bigger book by hand. Nobody's been lost yet. Yet." },
      { who: 'theo', text: "malloc a small block, and when it's full, realloc it to double. But realloc can fail, and if you write its result straight over your only pointer, you've lost the old list and leaked it. Keep the old pointer until the new one is real." },
      { who: 'theo', text: "I added a switch that makes the next allocation fail on purpose. Don't be mad. I always test the supposedly fine wire last. It's never fine.", warm: "I added a switch that makes the next allocation fail on purpose. I knew you wouldn't mind. You're the only person who checks the supposedly fine wire before I do." }
    ] },
    close: { title: 'Nobody Lost', place: 'Repair shop workbench', beats: [
      { who: 'theo', text: "Two, then four, then eight. And when I flipped the fail switch, nothing was lost. The old list just... stayed. I checked it three times. Four." },
      { who: 'theo', text: "It grew the moment it needed to.", outcome: {
        independent: "You didn't even need the fail switch to find the problem. You just knew. I'm going to pretend that's normal.",
        persisted: "It pushed back a few times and you kept at it. That's the only way anything I've built has ever worked.",
        guided: "You used the notes. Good. I write notes for everything. They're there to be used." } },
      { who: 'theo', reward: true, text: "The shop sent ₵3,000. The starter lab sent an Eevee, Level 15, that's been waiting for someone who keeps lists safe. And two Copper Circuit Tokens from my screw drawer. They're keepsakes. Don't use them as screws. I did once." }
    ] }
  },

  'c-lab-10': {
    open: { title: 'After the Blackout', place: 'PC desk', beats: [
      { who: 'tam', text: "Power went out last week and the PC desk roster went with it. I rebuilt it from memory. Do not ask how that went." },
      { who: 'tam', text: "Okay, it went badly. A Magikarp is now listed as a Gyarados, and nobody has the heart to tell its trainer." },
      { who: 'c-gym-12', text: "Files. You want files. A file does not care whether the lights go out." },
      { who: 'tam', text: "Fee Seeker from the Binary Glacier came by to lecture me. It's been forty minutes." },
      { who: 'c-gym-12', text: "Forty-one. Save each record as one line. Load it back, refuse anything malformed, and if the load fails, leave the old roster exactly as it was. Half a load is worse than no load." }
    ] },
    close: { title: 'Three Pretend Blackouts', place: 'PC desk', beats: [
      { who: 'tam', text: "Pulled the plug on purpose. Everything came back. Every name. I may have cheered. Customers looked." },
      { who: 'c-gym-12', text: "And the corrupted file was refused, with the old roster untouched. Correct. I will tell the other Fee you managed it. They will hate that." },
      { who: 'tam', reward: true, text: "₵3,000 from the desk and four Sitrus Berries. Also, you're now the person I call when the lights flicker. That's not a reward. That's a job." }
    ] }
  },

  'c-lab-11': {
    open: { title: 'Every Branch', place: 'Linden Lab chart room', beats: [
      { who: 'linden', text: "A small evolution family. Every path from the first form to each final one, in order. Can it be listed without missing a branch? That is the question I want answered." },
      { who: 'c-gym-15', text: "Professor. May I?" },
      { who: 'linden', text: "Reva Call. Climbs the Returning Steps every morning, and apparently my stairs as well." },
      { who: 'c-gym-15', text: "To list the paths from a form, list the paths from each of its children, with the form in front. A form with no children is a path all by itself. That is the base case. Leave it out and the story never ends." },
      { who: 'linden', text: "Compressed. I approve." }
    ] },
    close: { title: 'A Story That Stops', place: 'Linden Lab chart room', beats: [
      { who: 'linden', text: "Every path, in order, none missing. The three-way split is where field teams lose a branch. You didn't." },
      { who: 'c-gym-15', text: "It folded back on itself exactly as far as it needed to, and then it stopped. That is all a good story does." },
      { who: 'linden', reward: true, text: "The lab has a Ralts, Level 18. It senses the feelings of whoever looks after it, and I would like it to sense yours. Also ₵3,000 and four Sitrus Berries. Kern will pretend he didn't pack them." }
    ] }
  },

  'c-lab-12': {
    open: { title: 'Backs of Receipts', place: 'Café window table', beats: [
      { who: 'ellis', text: "I keep losing sightings between trips. Scraps of paper, backs of receipts. Smeargle painted over one last week. It was a good sighting." },
      { who: 'ellis', text: "One journal, please. Add a sighting, find every sighting of a species, save it to a file and load it back. And if a load fails, keep the journal I already had. I've lost enough." },
      { who: 'june', text: "Ellis drew a Lapras on the back of my route map and then forgot where they saw it." },
      { who: 'ellis', text: "I didn't forget. I misfiled it. There's a difference, and it's this lab." },
      { who: 'ellis', text: "Take your time. The sightings have waited this long.", warm: "You don't have to get it right the first time. I never do. I just keep the drafts, and I'd like to keep yours." }
    ] },
    close: { title: 'A Sketchbook I Didn\'t Know I Kept', place: 'Café window table', beats: [
      { who: 'ellis', text: "Records in, a search that finds every one, and it survived the save and the reload. Reading it back is like flipping through a sketchbook I didn't know I'd kept." },
      { who: 'june', text: "Found your Lapras, by the way. Pier, level twenty-five, water. The journal knew." },
      { who: 'ellis', reward: true, text: "About that Lapras. It kept following the ferry, and the ferryman says it's been looking for someone patient. Level 25. It's yours, if you'll have it. And ₵3,000, and four Sitrus Berries June insisted on packing." },
      { who: 'june', text: "For two. Always for two." }
    ] }
  },

  'c-lab-13': {
    open: { title: 'A While', place: 'Pokémon Centre steps', beats: [
      { who: 'june', text: "Everyone's waiting outside the Centre asking how long this walk is. I say 'a while'. They don't like 'a while'." },
      { who: 'roan', text: "She said 'a while' about the ridge once. It was nine hours." },
      { who: 'june', text: "Roan's still annoyed about that. Meters and walking speed go in, kilometers and minutes come out, two decimals. Use doubles; nobody walks in whole kilometers." },
      { who: 'june', text: "Distance is in meters but speed is in km per hour. Convert before you divide. Mixing units is the trail version of packing the tent but not the poles." }
    ] },
    close: { title: 'Half an Hour, Meant', place: 'Pokémon Centre steps', beats: [
      { who: 'june', text: "Fifteen hundred meters at three km/h: 1.50 km, 30.00 minutes. Now I can say 'half an hour' and mean it." },
      { who: 'roan', text: "Next time you trace one of these, write the variables down. Your head is not a whiteboard." },
      { who: 'june', reward: true, text: "₵600 and three Oran Berries. Roan's paying for the next snack. That was the deal about the nine hours." }
    ] }
  },

  'c-lab-14': {
    open: { title: 'Written on the Bottom', place: 'Mart stockroom', beats: [
      { who: 'tam', text: "Boss says pack the Potions into crates. Boss did not say how many fit. Boss said 'figure it out'." },
      { who: 'mart', text: "I said the crate size is written on the crate, Tam." },
      { who: 'tam', text: "It's written on the bottom. Of the full crate." },
      { who: 'tam', text: "So: bottles / crate size is full crates, bottles % crate size is what's left on the counter. And a crate size of zero is ERROR, before anybody divides by it. I learned that one from the register." }
    ] },
    close: { title: 'One Lonely Bottle', place: 'Mart stockroom', beats: [
      { who: 'tam', text: "Ten bottles in crates of three: three full crates and one left over. I put the one on the counter and it looks lonely. That's how you know the maths worked." },
      { who: 'mart', text: "And the crate of size zero?" },
      { who: 'tam', text: "ERROR. No explosion." },
      { who: 'mart', text: "Growth." },
      { who: 'tam', reward: true, text: "₵600 and three Oran Berries. Boss said to hand them to anyone who can count. You look like anyone who can count." }
    ] }
  },

  'c-lab-15': {
    open: { title: 'A Blanket and a Lullaby', place: 'Centre admission desk', beats: [
      { who: 'nurse', text: "Three care desks: basic, standard and advanced. This morning a Level 36 Machamp was sent to basic care. Basic care is a blanket and a lullaby." },
      { who: 'nurse', text: "Levels 1 to 15 go to basic, 16 to 35 to standard, 36 to 100 to advanced. Anything else is ERROR, and I'll come and look myself." },
      { who: 'nurse', text: "Mind the edges. Fifteen is still basic; sixteen isn't. People always get the edges wrong, and Pokémon always seem to live right on them." }
    ] },
    close: { title: 'A Thank-You Card', place: 'Centre admission desk', beats: [
      { who: 'nurse', text: "Fifteen: basic. Sixteen: standard. Thirty-six: advanced. Zero comes back ERROR, which is right. A Level 0 Pokémon would be a very strange Pokémon." },
      { who: 'nurse', text: "The Machamp is in advanced care now. It sent a thank-you card. Four hands, and the handwriting is still lovely." },
      { who: 'nurse', reward: true, text: "₵600 from the desk and three Oran Berries. Take a rest before your next job. Also nurse's orders." }
    ] }
  },

  'c-lab-16': {
    open: { title: 'One More Star', place: 'Practice field at dusk', beats: [
      { who: 'rowan', text: "I'm adding one practice session a day. I want a chart: day one, one star; day two, two stars. So I can see it grow." },
      { who: 'rowan', text: "Two loops. The outer one counts the rows; the inner one draws that row's stars, then a newline. No spaces. I'll know." },
      { who: 'juno', text: "Make sure the inner one actually stops. I once wrote a loop that didn't. It ran until morning. So did I." },
      { who: 'rowan', text: "Juno. Why are you awake?" },
      { who: 'juno', text: "It's the afternoon. This is my three a.m." }
    ] },
    close: { title: 'A Staircase', place: 'Practice field at dusk', beats: [
      { who: 'rowan', text: "Ten rows, ten stars at the bottom. It looks like a staircase. I'm choosing to find that motivating." },
      { who: 'juno', text: "And it stopped. Beautiful. Very un-me." },
      { who: 'rowan', reward: true, text: "₵600 and three Oran Berries from the practice pot. Don't tell anyone I keep a star chart.", warm: "₵600 and three Oran Berries from the practice pot. You can tell people I keep a star chart. Just you, though." }
    ] }
  },

  'c-lab-17': {
    open: { title: 'The Quiet Ones', place: 'Meadow flower stall', beats: [
      { who: 'mo2', text: "I count the Pokémon that visit the stall. Bees, mostly. And a Petilil that's either a customer or a thief." },
      { who: 'mo2', text: "Six species, codes one to six. I want a count for each, including the ones that never turn up. A zero is still a count. The shy ones matter." },
      { who: 'mira', text: "Bram. You don't count the Petilil. The Petilil counts you." },
      { who: 'mo2', text: "Mira buys from me on Fridays. She haggles. Don't tell her I said that." },
      { who: 'mira', text: "I'm standing right here." }
    ] },
    close: { title: 'Paid in Pollen', place: 'Meadow flower stall', beats: [
      { who: 'mo2', text: "Six counts, zeros included. The Petilil's code shows three visits. Three. It has never paid once." },
      { who: 'mira', text: "It paid in pollen." },
      { who: 'mo2', reward: true, text: "₵600 and three Oran Berries. Full price. I don't haggle with people who can count." }
    ] }
  },

  'c-lab-18': {
    open: { title: 'Chaos, Alphabetised Later', place: 'Linden Lab records room', beats: [
      { who: 'aide', text: "Practice match in ten minutes and nobody can find which Pokémon is Level 23. The list is in the order they arrived, which is to say, chaos." },
      { who: 'aide', text: "Insertion sort, the way you sort a hand of cards: take the next one and slide it left until it fits. Then search from the front. The first match wins, and missing means -1." },
      { who: 'libr', text: "A sorted list is worth the cost of sorting it the moment you search twice." },
      { who: 'aide', text: "Vell from the archive. Came over to borrow a stapler. Has been here an hour." },
      { who: 'libr', text: "Your stapler was misfiled." }
    ] },
    close: { title: 'On Time', place: 'Linden Lab records room', beats: [
      { who: 'aide', text: "Sorted, searched, found. The match started on time. That has never happened. I don't know what to do with my hands." },
      { who: 'libr', text: "Now keep it sorted. That is the part everyone forgets." },
      { who: 'aide', reward: true, text: "Linden's budget covers ₵1,400 and one Rare Candy. One. I checked the cupboard twice. I'm not being stingy. I'm being accurate." }
    ] }
  },

  'c-lab-19': {
    open: { title: 'The Sunny Corner', place: 'Mira\'s garden beds', beats: [
      { who: 'mira', text: "Three rows of four beds. I weigh what each gives at harvest, and every year I'm sure the sunny corner wins. Every year I'm wrong about which corner is sunny." },
      { who: 'mira', text: "It's a 3 by 4 array, read row by row. Total each row, then find the single best bed, row and column counting from zero. If two tie, the first one you reach wins." },
      { who: 'mira', text: "I've lost my gloves again, so I'll be over here weeding with my hands." },
      { who: 'mira', text: "Take your time. Gardens are patient. I'm working on being like them.", warm: "You always ask about the beds as if they're people. I like that. They sort of are." }
    ] },
    close: { title: 'Four Years Wrong', place: 'Mira\'s garden beds', beats: [
      { who: 'mira', text: "Row totals, and the best bed is in the middle. The shadiest bed in the garden. I have been wrong for four years." },
      { who: 'mira', text: "I'm planting the Sitrus there next spring, and apologising to it." },
      { who: 'mira', reward: true, text: "Speaking of which: two Sitrus Berries from last season, and ₵1,400 from the Friday stall money. Bram doesn't know about this. Bram thinks I haggle." }
    ] }
  },

  'c-lab-20': {
    open: { title: 'Potions, Lots', place: 'Mart back door', beats: [
      { who: 'mart', text: "Supply orders come in by hand, one per line: item, comma, quantity. And every week somebody writes 'Potions, lots'." },
      { who: 'mart', text: "Read line by line until the end of input. Accept exactly the format and nothing else: no spaces, no signs, no extra commas. Anything off prints ERROR, and the next line gets its own fair chance." },
      { who: 'ink', text: "One character out and the whole line means nothing." },
      { who: 'mart', text: "Ink copies our orders for the supplier. Ink has feelings about the word 'lots'." },
      { who: 'ink', text: "Lots is not a quantity. Lots is a mood." }
    ] },
    close: { title: 'Eerily Exact', place: 'Mart back door', beats: [
      { who: 'mart', text: "'Potion,12' prints Potion 12. 'Potions, lots' prints ERROR. The supplier sent exactly twelve Potions this week. It was eerie." },
      { who: 'ink', text: "Correct to the terminator." },
      { who: 'mart', reward: true, text: "₵1,400 and two Sitrus Berries. Ink wrote you a receipt. It's very neat. Don't fold it; Ink will know." }
    ] }
  },

  'c-lab-21': {
    open: { title: 'The Copy of the Chart', place: 'Meadow field tent', beats: [
      { who: 'nurse-meadow', text: "A tent, a bench and a very good kettle. It does the job. What it doesn't do is update the right chart." },
      { who: 'nurse-meadow', text: "Callers phone in their Pokémon's HP, and I write it on a copy of the chart. The copy. The real chart never changes. That's pass by value, apparently, and it's why I've been healing the same Bulbasaur on paper for a week." },
      { who: 'nurse-meadow', text: "So: functions that take pointers and change the real numbers. Swap two levels. Heal in place, clamped to the maximum, without the sum overflowing on the way. And a NULL pointer means nobody handed you a chart at all. Return 0 and touch nothing." },
      { who: 'you', text: "What if both pointers are the same chart?" },
      { who: 'nurse-meadow', text: "Then swapping it with itself leaves it exactly as it was. Good question. Kettle's on." }
    ] },
    close: { title: 'The Paperwork Agrees', place: 'Meadow field tent', beats: [
      { who: 'nurse-meadow', text: "The real chart changed. The Bulbasaur is officially healed, on paper and in fact. It's been healed in fact since Tuesday, but now the paperwork agrees." },
      { who: 'nurse-meadow', text: "And the enormous heal didn't wrap round into a negative number. I'm told that can happen. I'm told it's upsetting." },
      { who: 'nurse-meadow', reward: true, text: "₵1,400 from the field fund and two Sitrus Berries. There's tea too, but that isn't a reward. Tea is just what happens here." }
    ] }
  },

  'c-lab-22': {
    open: { title: 'Never Where You Left Them', place: 'Post office', beats: [
      { who: 'postie', text: "I deliver to trainers, and trainers are never where you left them. Battling, travelling, shopping. Each needs different details: a level, a distance, a budget." },
      { who: 'c-gym-11', text: "One trainer, one job at a time, so store one job at a time. That's a union: one space, several shapes, and a tag saying which shape it currently holds." },
      { who: 'postie', text: "Padma Align runs the foundry gym. Everyone there has a job. Even the Machoke have jobs." },
      { who: 'c-gym-11', text: "Set the tag and the field together, or not at all. A tag that says TRAVEL over a shopping budget is how parcels end up at the wrong Mart." }
    ] },
    close: { title: 'Well-Built Parts', place: 'Post office', beats: [
      { who: 'postie', text: "Battle at level 40, then a bad value: refused, and the old activity kept. The parcel went to the right place. First time this month." },
      { who: 'c-gym-11', text: "Tag and value moved together. That's all a well-built part ever asks." },
      { who: 'postie', reward: true, text: "₵1,400 and two Sitrus Berries from the post office. Padma offered you a job at the foundry as well. I said you already have several." }
    ] }
  },

  'c-lab-23': {
    open: { title: 'Eight Little Switches', place: 'Town square bench', beats: [
      { who: 'gus', text: "Ah, a person of character. I keep my badges in a case with eight little switches, one per badge. On: earned. Off: not yet." },
      { who: 'gus', text: "Set a bit with |, clear it with & and ~, check it with &. And mind your parentheses, my friend. Precedence is character." },
      { who: 'c-gym-13', text: "One small switch at a time. Never flip the others." },
      { who: 'gus', text: "Xora Mask adjusts things. I once watched Xora retune an entire hollow by moving a single pebble." },
      { who: 'c-gym-13', text: "Two pebbles. The second was for balance." }
    ] },
    close: { title: 'The Hollow Sings', place: 'Town square bench', beats: [
      { who: 'gus', text: "Earn, remove, check. The mask kept its shape through every error; a bad index changed nothing at all. Crisply done." },
      { who: 'c-gym-13', text: "The hollow sang a little just now. It does that when a bit is set properly." },
      { who: 'gus', reward: true, text: "Allow me: ₵1,400 and two Sitrus Berries. A gentleman pays his debts in full, and in the correct order of operations." }
    ] }
  },

  'c-lab-24': {
    open: { title: 'Don\'t Read It', place: 'Bookshop corner', beats: [
      { who: 'rowan', text: "I don't let people read my battle notebook. So I copied the results into a file. Don't read that either. Just count it." },
      { who: 'rowan', text: "One result per line: WIN or LOSS, exactly. Anything else is unrecognised, blank lines included. Some lines end in a carriage return because I typed them on the library PC. Strip that, not the letters." },
      { who: 'rowan', text: "If the file won't open, print ERROR. Don't guess. Guessing is what the notebook is for.", warm: "...You can read the notebook, actually. If you want. There's nothing embarrassing in there. Page nine excepted." }
    ] },
    close: { title: 'The Kind-Comments Page', place: 'Bookshop corner', beats: [
      { who: 'rowan', text: "Wins, losses, unrecognised. The unrecognised one says 'DRAW?'. I wasn't sure at the time. I'm still not." },
      { who: 'rowan', text: "More wins than I remembered. Which means I remember losses better than wins. That's... useful data." },
      { who: 'rowan', reward: true, text: "₵1,400 and two Sitrus Berries. And I'm adding a line to the back of the notebook, where the kind comments go. Don't ask what it says." }
    ] }
  },

  'c-lab-25': {
    open: { title: 'Everyone in Turn', place: 'Centre waiting room', beats: [
      { who: 'nurse', text: "On busy days the waiting room gets muddled, and someone who arrived early gets seen late. Fairness matters in a place like this." },
      { who: 'c-gym-14', text: "A line where each person only needs to know who is behind them. That's a queue. Keep the head for serving and the tail for arriving." },
      { who: 'nurse', text: "Linka Head brought in a Rhyhorn that swallowed a pebble. The Rhyhorn is fine. Linka stayed to reorganise my queue." },
      { who: 'c-gym-14', text: "Every path eventually links back up. Your waiting room only needs to link forward. And at closing, free every node, or they wander the building forever." }
    ] },
    close: { title: 'Small, and Not Small', place: 'Centre waiting room', beats: [
      { who: 'nurse', text: "Served in exactly the order they arrived. And when I closed up, every node was freed. Nobody left waiting in the dark." },
      { who: 'c-gym-14', text: "Head to tail, nothing dropped. A clean chain." },
      { who: 'nurse', reward: true, text: "₵3,000 from the Centre, and a Prism Stone a grateful trainer left in the donation box. And one more thing: a Riolu has been staying with us, Level 20, waiting for someone who understands that everyone deserves their turn. I think that's you." },
      { who: 'nurse', text: "It's a small thing that is not small at all." }
    ] }
  },

  'c-lab-26': {
    open: { title: 'A Hat of Unknown Origin', place: 'Travelling stall', beats: [
      { who: 'mart', text: "The travelling stall takes stock on the road, and things come and go all day. I need an inventory that can add and drop items without the whole list falling apart." },
      { who: 'mart', text: "A linked list. Adding something already there just adds to its count. Removing unlinks the node and frees it. Save the next pointer before you free anything, or you're reading a note you've already burned." },
      { who: 'tam', text: "Also there's a hat." },
      { who: 'mart', text: "There is a hat. Nobody knows where it came from. It has been in stock for three weeks." }
    ] },
    close: { title: 'Sold, to Tam', place: 'Travelling stall', beats: [
      { who: 'mart', text: "Added, merged, removed, found and destroyed. Not one node lost, and nothing freed twice." },
      { who: 'tam', text: "I bought the hat." },
      { who: 'mart', text: "Tam bought the hat." },
      { who: 'mart', reward: true, text: "₵3,000 and four Sitrus Berries. And a Larvitar, Level 20, that hatched in a crate of Potions somewhere between two towns. It eats gravel and seems happiest near someone who keeps track of things." }
    ] }
  },

  'c-lab-27': {
    open: { title: 'Behind the Falls', place: 'Base of the falls', beats: [
      { who: 'june', text: "There's a grotto behind the falls, but the way in is a maze of fallen rock. I want one safe route mapped before anyone tries it. Safety first, then adventure." },
      { who: 'june', text: "From wherever you stand, try up, right, down, left, in that order. Never step on a rock you've already stood on. If a way's a dead end, come back and try the next. That's the whole trick: coming back is allowed." },
      { who: 'holt', text: "I tried it without a system. Third night out here. I've started naming the rocks." },
      { who: 'june', text: "Holt. Go home." }
    ] },
    close: { title: 'Chalked on the Stone', place: 'Base of the falls', beats: [
      { who: 'june', text: "A route from start to grotto, and it never doubles back on itself. I walked the edge again and it matches, rock for rock." },
      { who: 'holt', text: "I'm going home. Rock number four, Gerald, will miss me." },
      { who: 'june', reward: true, text: "₵3,000, four Sitrus Berries, and... an Absol has been watching the rockfall from the ledge for weeks. They say Absol turn up before disasters. This one's decided you're the reason there won't be one. Level 25." },
      { who: 'june', text: "Your name's getting chalked on the entrance stone. Don't argue. It's already chalked." }
    ] }
  },

  'c-lab-28': {
    open: { title: 'No Opinions', place: 'Archive basement', beats: [
      { who: 'theo', text: "The archive has to be readable on any PC in the region, even ones built differently from ours. Byte by byte. No surprises." },
      { who: 'sci-nim', text: "We store everything raw down here. No formatting, no translation, no opinions." },
      { who: 'theo', text: "If you fwrite a whole struct, you also write its padding and its byte order, and those are opinions. Another machine might not share them." },
      { who: 'sci-nim', text: "So write each field yourself. Four bytes for the species and two for the level, least significant byte first. Then any machine that reads the same way can read it." },
      { who: 'theo', text: "And jump straight to record n by multiplying. Six bytes a record. I checked. Twice. Three times." }
    ] },
    close: { title: 'Readable Anywhere', place: 'Archive basement', beats: [
      { who: 'theo', text: "Wrote it, read it back, jumped straight to record three. A torn file gets refused instead of half-read." },
      { who: 'sci-nim', text: "No opinions detected." },
      { who: 'theo', reward: true, text: "₵3,000 and four Sitrus Berries. And... um. A Porygon, Level 25. It's made of data, so it seemed right. It lived in the lab machine until it read your archive and decided it wanted to see the world." },
      { who: 'theo', text: "Byte asked for a copy for the Boot Sector gym. I said I'd have to ask you. I'm asking.", warm: "Byte asked for a copy for the Boot Sector gym. I said yes before I asked you. I hope that's all right. I knew it would be." }
    ] }
  },

  'c-lab-29': {
    open: { title: 'Same Choices, Same Result', place: 'Practice field', beats: [
      { who: 'rowan', text: "I want to try battle plans without luck getting in the way. Same choices, same result, every time. Then I'll know whether a plan is good or I just got lucky." },
      { who: 'rowan', text: "Two teams, two Pokémon each, forty HP. Attack, heal, switch. An invalid action changes nothing. Not half of something. Nothing." },
      { who: 'theo', text: "It's a state machine. Every action takes you from one exact state to the next. Like a radio dial: it clicks, it doesn't drift." },
      { who: 'rowan', text: "Theo. Were you listening?" },
      { who: 'theo', text: "I was fixing your practice buzzer. It was next to you. Listening happened." }
    ] },
    close: { title: 'Six Identical Results', place: 'Practice field', beats: [
      { who: 'rowan', text: "Ran the same plan six times. Six identical results. Do you know how long I've wanted that?" },
      { who: 'theo', text: "He's going to run thirty more tonight." },
      { who: 'rowan', text: "Twenty-nine. I need some sleep." },
      { who: 'rowan', reward: true, text: "₵3,000, four Sitrus Berries, and a Beldum, Level 25. It came to the field every morning and watched us train in total silence. It's decided you're the one worth watching. I'm choosing not to be offended." }
    ] }
  },

  'c-lab-30': {
    open: { title: 'Run the Mart', place: 'Poké Mart after hours', beats: [
      { who: 'mart', text: "Want to run the Mart for a day? On paper. Opening stock, sales, restocks, and a ledger at close that adds up to the cent. The whole job." },
      { who: 'mart', text: "The stock list grows as it needs to, up to twenty lines. Names are unique. You can't sell what you don't have. And revenue is an unsigned long, so check a sale can't overflow it before you add." },
      { who: 'c-boss-e2', text: "I'd like to buy everything, please." },
      { who: 'mart', text: "That's Ida Overflow. Ida always wants one more than there is." },
      { who: 'c-boss-e2', text: "I have a bag for my bags." }
    ] },
    close: { title: 'The Last Cent', place: 'Poké Mart after hours', beats: [
      { who: 'mart', text: "Opened, sold, restocked, saved, closed and loaded back, and the ledger matches to the cent. The hardest part is the last cent. It always is." },
      { who: 'c-boss-e2', text: "It refused to sell me the forty-first Potion. There were forty. I respect it deeply." },
      { who: 'mart', reward: true, text: "₵3,000, four Sitrus Berries, and a Dratini, Level 25. It's lived in the Mart's water tank since before I started, and it only comes out for people who can balance the books." },
      { who: 'mart', text: "Don't tell the previous manager about the tank." }
    ] }
  },

  /* ---- Labs 31-49: the midterm review set ------------------------------ */

  'c-lab-31': {
    open: { title: 'It Still Boots', place: 'Repair shop, the old terminal', beats: [
      { who: 'theo', text: "This terminal is older than me. Byte from the Boot Sector gym gave it to the shop because 'it still boots'. It does boot. It just doesn't say anything while it does." },
      { who: 'theo', text: "I want it to print how a program gets built. The editor, where you write the source. The preprocessor, which handles the # lines. The translator, which makes an object module. The linker, which joins in the library code. The loader, which puts it all in memory." },
      { who: 'theo', text: "People say 'compile' as if it's one step. The compiler is really the preprocessor and the translator together, and it's still only the middle of the relay." },
      { who: 'you', text: "And the memory line?" },
      { who: 'theo', text: "Kilobytes to bytes, bytes to bits, then the last address. Every byte gets its own address, starting at zero, so the last one is one less than the count. Everyone forgets the zero. I forgot the zero. The terminal forgave me. Barely." }
    ] },
    close: { title: 'Something to Say', place: 'Repair shop, the old terminal', beats: [
      { who: 'theo', text: "Step one, editor. Step five, loader. Sixty-four kilobytes, 65536 bytes, addresses 0 to 65535." },
      { who: 'theo', text: "It said all of that while it booted. It's never said anything before. I know it's a terminal. I still think it's happy.", warm: "It said all of that while it booted. I've been sitting here watching it boot for ten minutes. I'm glad it was you. That sounds odd. It isn't odd." },
      { who: 'theo', reward: true, text: "₵600 from the shop tin and two Potions from the first-aid shelf. The shelf is mostly screws. These were behind the screws." }
    ] }
  },

  'c-lab-32': {
    open: { title: 'Columns That Wander', place: 'Pier swimming board', beats: [
      { who: 'coral', text: "Water is a stream. So is your keyboard. So is this scoreboard, if you think about it. I think about it a lot." },
      { who: 'ink', text: "Coral's board prints times with the columns wandering about. I check every character. It fails every time." },
      { who: 'coral', text: "So: %6d gives a number a field six wide. A minus sign pushes it to the left. A leading zero pads it with zeros. %.2f keeps two decimals, %10.3f keeps three in a field ten wide, and %% prints an actual percent sign." },
      { who: 'coral', text: "Now the trap. scanf with %c takes the very next character in the stream, and if a newline is sitting there from the last number, that's what it takes. Put a space before it, \" %c\", and the space swallows the whitespace first. Buffered! Ha!" },
      { who: 'ink', text: "And a double is read with %lf and printed with %f. One character out and the whole line means nothing." }
    ] },
    close: { title: 'Correct to the Terminator', place: 'Pier swimming board', beats: [
      { who: 'ink', text: "Right-aligned, left-aligned, zero-padded. Brackets lined up. The long number overflowed its field and was printed in full, as a minimum width should allow." },
      { who: 'coral', text: "Ink's smiling. Ink doesn't smile. Look at that." },
      { who: 'ink', text: "Correct to the terminator. That makes twice. I may have to revise my opinion of you, upward." },
      { who: 'coral', reward: true, text: "₵600 from the swim club and three Oran Berries. Eat one before you swim, not during. I learned that one the hard way." }
    ] }
  },

  'c-lab-33': {
    open: { title: 'Every Bag Has a Size', place: 'Victory Road, the second post', beats: [
      { who: 'c-boss-e2', text: "Oh good, you're here. Hold this. And this. And... no, I've got that one. Probably." },
      { who: 'c-boss-e2', text: "Everyone says I overpack. I say every bag has a size and I simply like to find it. So: how big is each type, exactly? sizeof will tell you. char, short, int, long long, float, double." },
      { who: 'c-boss-e2', text: "Then the fun part. Add two big ints and the answer might not fit. In C, signed overflow is undefined, which is a polite way of saying the bag bursts and nobody promises where the socks land. So check before you add: if a is bigger than INT_MAX minus b, it won't fit." },
      { who: 'c-boss-e2', text: "An unsigned char is kinder. Go past 255 and it wraps back to zero, like an odometer, and that's allowed. And a float only keeps twenty-four bits, so store sixteen million and one and you get sixteen million back. The bag was full. One fell out." },
      { who: 'you', text: "Is there anything that doesn't overflow?" },
      { who: 'c-boss-e2', text: "My heart. And my second bag." }
    ] },
    close: { title: 'Room for One More', place: 'Victory Road, the second post', beats: [
      { who: 'c-boss-e2', text: "It said OVERFLOW before it tried the addition. Do you know how rare that is? Most people find out when the zip breaks." },
      { who: 'c-boss-e2', text: "And the float came back one short, exactly where it should. Tyranitar nodded. Tyranitar carries my spare bags, so it would know." },
      { who: 'c-boss-e2', reward: true, text: "I packed you a reward. ₵1,400, two Sitrus Berries, and the Rollover Odometer off my old bike. It clicks round from 99999 to 00000, the way an unsigned number should. Then I found room for one more Oran Berry. There's always room for one more." },
      { who: 'c-boss-e2', text: "Don't look at me like that. It fit." }
    ] }
  },

  'c-lab-34': {
    open: { title: 'Remembered Correctly', place: 'Terminator Glade lockers', beats: [
      { who: 'c-gym-10', text: "Every locker at the Glade carries a name, and every name is written in a gentle code: each letter shifted along the alphabet, with z wrapping round to a. Everyone deserves to be remembered correctly, even in code." },
      { who: 'c-gym-10', text: "A char is a small number. 'A' is 65 and 'a' is 97. To shift a lowercase letter, find its place with c - 'a', add the shift, take % 26 so it wraps, then add 'a' back." },
      { who: 'c-gym-10', text: "Count what each label holds, too: capitals, small letters, digits, spaces. isupper and its friends live in ctype.h. And a digit character is not its value. '7' is 55. '7' - '0' is 7." },
      { who: 'c-gym-10', text: "One more thing. After scanf reads the shift, its newline is still waiting in the stream. Clear the rest of that line before the label starts, or your first label will be blank. Blissey learned this the patient way." }
    ] },
    close: { title: 'A Name Like a Spell', place: 'Terminator Glade lockers', beats: [
      { who: 'c-gym-10', text: "'Hello, World 42!' became 'Khoor, Zruog 42!'. Two capitals, eight small letters, and the digits add to six. The punctuation stayed exactly as it was. Punctuation has feelings too." },
      { who: 'c-gym-10', text: "Blissey is already relabelling the lockers. Yours has your name on it, shifted by three. It looks like a spell." },
      { who: 'c-gym-10', reward: true, text: "₵600 from the Glade and three Oran Berries. Blissey is holding out an egg again. That part isn't a reward; it's just what Blissey does. You may decline. Nobody ever has." }
    ] }
  },

  'c-lab-35': {
    open: { title: 'The Garden Has a Heartbeat', place: 'Mira\'s greenhouse frame', beats: [
      { who: 'mira', text: "Every third day I water. Every fifth day I feed the beds. And every day I lose track of which day it is." },
      { who: 'mira', text: "Day numbers just keep climbing, but weeks come round again, and that's what % is for. Take one off first so the first day counts as zero, divide by seven for the week, keep the remainder for the day, then add one back to both." },
      { who: 'mira', text: "Divisible by three means the remainder is zero. Same for five. My timer counts minutes, and a day is 1440 of them, so split it down: whole days, then hours, then minutes, both printed with two digits." },
      { who: 'mira', text: "My kitchen clock always shows two digits, and I've got used to it. The beds have too.", warm: "You're the only person who's ever asked me which bed gets watered first. It's the unruly one. It always goes first." }
    ] },
    close: { title: 'Trust the Calendar', place: 'Mira\'s greenhouse frame', beats: [
      { who: 'mira', text: "Day fifteen: week three, day one, water YES, feed YES. Day thirty: both again. It's like the garden has a heartbeat, and now I can hear it." },
      { who: 'mira', text: "I've written 'trust the calendar' on a seed packet. I'll lose the packet. But I'll have written it." },
      { who: 'mira', reward: true, text: "₵600 from the stall tin and three Oran Berries from the first bed. Watered on day fifteen. You can taste it." }
    ] }
  },

  'c-lab-36': {
    open: { title: 'Slot Minus One', place: 'Harbour ice rink at dawn', beats: [
      { who: 'c-boss-e3', text: "I skate the harbour before anyone else is awake. Forward, the lap board works. Backward, it tells me I'm on slot minus one. There is no slot minus one." },
      { who: 'c-boss-e3', text: "C's % keeps the sign of the left side. -7 % 2 is -1, not 1. It's also why n % 2 == 1 calls -3 even. It isn't. -3 is extremely odd. I've met it." },
      { who: 'c-boss-e3', text: "For the ring, take the remainder, and if it's negative, add the size once. Then floor division: C's / rounds toward zero, the floor rounds down. They only disagree when there's a remainder and the signs differ, and then the quotient is one lower." },
      { who: 'c-boss-e3', text: "And don't call me the Second. It's a name, not a ranking. I intend to make it the better one." },
      { who: 'you', text: "Understood, Fee." },
      { who: 'c-boss-e3', text: "Good. Now make the board understand." }
    ] },
    close: { title: 'Smooth as Ice', place: 'Harbour ice rink at dawn', beats: [
      { who: 'c-boss-e3', text: "Slot minus one is slot four now. Even INT_MIN lands somewhere real: 352 on a ring of a thousand. I checked it by hand. The board has never once been right before." },
      { who: 'c-boss-e3', text: "Minus seven over two: minus four, remainder one.", outcome: {
        independent: "Minus seven over two: minus four, remainder one. The other Fee said you'd need help. I'm going to enjoy telling them you didn't.",
        persisted: "Minus seven over two: minus four, remainder one. You fell a few times and got back up. That's skating. It's the only way anyone learns ice.",
        guided: "Minus seven over two: minus four, remainder one. You read the notes first. Smart. The other Fee never reads anything. Don't tell them I said so. Actually, do." } },
      { who: 'c-boss-e3', reward: true, text: "₵3,000, two Sitrus Berries, and a Spheal, Level 22. When the tide goes out they roll down the pier in a line, round and round. This one keeps rolling back to wherever you're standing. It has decided." },
      { who: 'c-boss-e3', text: "Smooth as ice. Don't expect me to say that twice." }
    ] }
  },

  'c-lab-37': {
    open: { title: 'Two Customers, One Number', place: 'Café counter', beats: [
      { who: 'kip', text: "On the house. You look like your last battle went long. Also, could you fix the ticket machine?" },
      { who: 'kip', text: "A customer takes a ticket and the number goes up afterwards. Regulars skip ahead: the number goes up first and they get the new one. And now and then someone hands a ticket back, and we go down one." },
      { who: 'kip', text: "It's just t++ and ++t. Postfix hands over the old value and then counts. Prefix counts and then hands over the new one. Put the plus signs on the wrong side and half the café holds the same number." },
      { who: 'kip', text: "Handing back at zero is an ERROR. We've never had a ticket minus one, and I don't want to meet whoever would be holding it." }
    ] },
    close: { title: 'Nobody Fought', place: 'Café counter', beats: [
      { who: 'kip', text: "Take five, take six, skip to eight, next is eight. Nobody argued over a number all morning. First time since spring." },
      { who: 'juno', text: "I came in at noon, which for me is dawn, and got a ticket without an argument. Unheard of." },
      { who: 'kip', reward: true, text: "₵600 from the tip jar, which is a lot for a tip jar, and a tin of the Juniper tea. That one isn't on the house. Well. It is now." }
    ] }
  },

  'c-lab-38': {
    open: { title: 'Across the Brook', place: 'Meadow brook stepping stones', beats: [
      { who: 'tilda', text: "One stone after another, in order, no skipping. That is how you cross a brook." },
      { who: 'c-boss-e4', text: "Or! Hop to the third one, spin, hop back to the first, and see what happens!" },
      { who: 'tilda', text: "What happens is you fall in. Uma Bee of the Elite Four has been improvising across my stones all morning." },
      { who: 'tilda', text: "So I want the rules written down. Read the stone, then step: stones[(*index)++]. Step, then read: stones[++*index]. The star has to reach the number, not the pointer. *index++ moves the pointer itself, and then you're reading stones that aren't there." },
      { who: 'c-boss-e4', text: "And you can't change the same thing twice in one breath! i++ + i++ is undefined. The compiler here refuses to build it at all. I tried. It said no. It said no very firmly." },
      { who: 'tilda', text: "Changing two different things is fine. Grow a, shrink b, one expression. Zero to n minus one, always." }
    ] },
    close: { title: 'Weirdly Relaxing', place: 'Meadow brook stepping stones', beats: [
      { who: 'tilda', text: "Read, step, step, read. Every index exactly where it should be, and nobody fell off the end. Correct." },
      { who: 'c-boss-e4', text: "I crossed your way, in order, one stone at a time. It was weirdly relaxing. I hated it. I'm crossing backwards tomorrow to recover." },
      { who: 'c-boss-e4', reward: true, text: "Here. ₵3,000, a die I carved where no face is in the right order, and a Litwick, Level 20. They follow me around at night like a string of lanterns, but this one kept following the sensible person instead. Take it before I get emotional." },
      { who: 'tilda', text: "The die has two fives." },
      { who: 'c-boss-e4', text: "That's the point!" }
    ] }
  },

  'c-lab-39': {
    open: { title: 'Precedence Is Character', place: 'Tea room off the square', beats: [
      { who: 'gus', text: "My grandmother's recipes, my friend. Temperatures in Fahrenheit, amounts averaged by eye, and not a single parenthesis between them." },
      { who: 'gus', text: "Multiplication, division and remainder bind tighter than addition, and among themselves they go left to right. So a + b + c / 3.0 divides only c. The whole sum wants brackets, and the 3.0 keeps the division from truncating." },
      { who: 'gus', text: "And beware 5 / 9. In integers that is nought, and the kettle never boils. Subtract, multiply by five, then divide by nine." },
      { who: 'gus', text: "The remainder of a by seven, then doubled, is not a doubled, then its remainder by seven. Order of operations, my friend. Order of operations." }
    ] },
    close: { title: 'As Dense as Intended', place: 'Tea room off the square', beats: [
      { who: 'gus', text: "Two hundred and twelve Fahrenheit: one hundred Celsius. The kettle agrees, and the kettle is never wrong." },
      { who: 'gus', text: "The average came out at 1.67 rather than something alarming, so grandmother's scones will be exactly as dense as intended. Which is very." },
      { who: 'gus', reward: true, text: "₵600 and two Great Balls. A gentleman never sends a friend back onto the route unequipped. Crisply done." }
    ] }
  },

  'c-lab-40': {
    open: { title: 'We Do Not Vote on Precedence', place: 'The Champion\'s hall', beats: [
      { who: 'c-boss-champ', text: "Please, sit. The league's damage formula has been computed four different ways in four different gyms, and I find that intolerable." },
      { who: 'c-boss-champ', text: "It is written in words, deliberately. You will translate it into C without changing the meaning of a single step. Two times the level, divided by five, plus two: that whole quantity multiplies the power, so it needs its parentheses. Everything after runs left to right, and the order of the divisions is part of the rule." },
      { who: 'c-boss-champ', text: "Mind the roll. Add 217 to r mod 39, multiply, then divide by 255. Divide the sum first and you deal no damage at all, which would be a very polite battle." },
      { who: 'c-boss-champ', text: "The share is a real number, so the conversion happens before the division, not after. And for one more than the larger of two values, remember that ?: binds more loosely than +. Parenthesise the choice." },
      { who: 'c-boss-champ', text: "The Standard defines the precedence table. We do not vote on it. We simply read it very carefully." }
    ] },
    close: { title: 'The Standard Holds', place: 'The Champion\'s hall', beats: [
      { who: 'c-boss-champ', text: "Base 44, damage 61, share 40.7. Identical to the league's reference, to the last digit. Every gym will use your translation from tomorrow." },
      { who: 'c-boss-champ', text: "You met the standard.", outcome: {
        independent: "You met the standard without a single rejected submission. More than met it.",
        persisted: "It resisted you, and you revised until it did not. That is how every standard was ever written.",
        guided: "You consulted the notes before you wrote. The committee would call that proper procedure. So do I." } },
      { who: 'c-boss-champ', reward: true, text: "₵3,000. The brass precedence table from the wall of this hall; I have had a replacement cast. And a Klink, Level 22. Its gears only ever turn in one order, and it seems to feel that you understand why." },
      { who: 'c-boss-champ', text: "On Thursdays I play board games at the café. The chaotic ones. You would be most welcome. You would also lose." }
    ] }
  },

  'c-lab-41': {
    open: { title: 'The Gate Speaks C', place: 'Ridge trailhead gate', beats: [
      { who: 'roan', text: "June trained up here. She still walks faster than me on the flat. I've made my peace with that. What I can't make peace with is the permit rules." },
      { who: 'roan', text: "They're written in English and the gate speaks C. 'At least four badges and level twenty, or a pass.' && binds tighter than ||, but put the brackets in anyway. Clang won't let you mix them bare, and it's right." },
      { who: 'roan', text: "The lake rule says 'yes unless this or that'. Unless means not, and not of an or is an and of nots. De Morgan. He was a mathematician, not a hiker, but he'd have made a decent one." },
      { who: 'roan', text: "Passes are just numbers. Five counts as true, minus one counts as true. But 'exactly one of these' compares truth values, so turn the pass into a proper 0 or 1 first. Five and one both mean yes, but five isn't equal to one." }
    ] },
    close: { title: 'Write the Variables Down', place: 'Ridge trailhead gate', beats: [
      { who: 'roan', text: "Ridge, lake, ferry, cave. Nine badges and a pass of five: ferry NO, because both were true, not exactly one. The last clerk would have waved them through." },
      { who: 'roan', text: "When a trace gets long, write the variables down. Your head is not a whiteboard. You did. I saw the scratch paper." },
      { who: 'roan', reward: true, text: "₵1,400 from the ranger post and two Ultra Balls. The ridge Pokémon are tough to catch. Don't waste them on anything that's already asleep." }
    ] }
  },

  'c-lab-42': {
    open: { title: 'The Haunted Hallway', place: 'Null Cavern, the candlelit hallway', beats: [
      { who: 'c-boss-e1', text: "Welcome... to the Haunted Hallway. Mwa. Ha. Ha. Sorry, sorry, force of habit. Tea? I have tea." },
      { who: 'c-boss-e1', text: "Every door along here has a check, and every check costs something: a lantern, a Duskull's patience, a minute of my evening. So we only ask a question when its answer can still change the outcome." },
      { who: 'c-boss-e1', text: "&& and || already know this. With A && B, if A is false, B is never asked. With A || B, if A is true, B stays in the dark. Put the cheap test on the left and let the operator skip the rest." },
      { who: 'c-boss-e1', text: "The deadliest door is a division. Count greater than zero first, then total over count. Ask the other way round with a count of zero and the whole hallway divides by nothing. It is very dramatic. I would know. Drama is my job." },
      { who: 'c-boss-e1', text: "Duskull and I will be reading in the corner. The one where nobody did it and it was the weather all along." }
    ] },
    close: { title: 'Not One Door Too Many', place: 'Null Cavern, the candlelit hallway', beats: [
      { who: 'c-boss-e1', text: "No check called when it didn't matter. No division by zero. Not one door opened that didn't need opening. The hallway is disappointed. So am I, professionally. Personally, I'm delighted." },
      { who: 'c-boss-e1', text: "You got through.", outcome: {
        independent: "You walked straight through my best haunting without a single wrong turn. Magnificent. Truly.",
        persisted: "You bumped into a few doors in the dark and kept feeling for the handle. That's how everyone gets out of here.",
        guided: "You brought the notes. Sensible. The notes are the only thing in this hallway that isn't trying to frighten you." } },
      { who: 'c-boss-e1', reward: true, text: "₵3,000, and something rather special. A Rotom lives in the hallway lamps and short-circuits whenever someone opens a door they didn't need to. It hasn't flickered once since you finished. Look at its colour. That's a shiny, Level 25, and it has chosen you." },
      { who: 'c-boss-e1', text: "Boo. Sorry. Couldn't resist. Off you go." }
    ] }
  },

  'c-lab-43': {
    open: { title: 'This House Believes', place: 'Café debate table', beats: [
      { who: 'sasha', text: "I'll take either side of any argument. Today's motion: 'x < y < z means what it looks like it means.' I'm arguing for. I'm going to lose." },
      { who: 'sasha', text: "In C, a comparison is an int. True is 1 and false is 0. And anything that isn't zero counts as true, which is why !!x turns any non-zero number into a tidy 1." },
      { who: 'sasha', text: "So x < y < z compares x < y first, gets a 0 or a 1, then compares that with z. Three, two, one comes out true. Three is not less than two. C does not care about your feelings." },
      { who: 'sasha', text: "Print what C actually thinks. Then print what maths thinks, with two comparisons and an &&. Let the audience decide." }
    ] },
    close: { title: 'The Motion Falls', place: 'Café debate table', beats: [
      { who: 'sasha', text: "Three, two, one. 'In order: 0.' 'C reads x < y < z as: 1.' The motion falls. I concede. Braces. Always braces. Well, brackets, today." },
      { who: 'sasha', text: "Next week I'm arguing that indentation is a lie we tell ourselves. You should come. Bring your own side." },
      { who: 'sasha', reward: true, text: "₵600 from the debate kitty and three Oran Berries. The kitty's official position is that you've earned them. I could argue the other side. I won't." }
    ] }
  },

  'c-lab-44': {
    open: { title: 'Nothing to Predict', place: 'Archive reading room', beats: [
      { who: 'psy', text: "I know which branch you'll take. I usually know before you do. It's terribly dull for me." },
      { who: 'psy', text: "So, a challenge. No if. No switch. No loops. While your file compiles, the driver turns each of those words into an error. No branches means nothing for me to foresee." },
      { who: 'psy', text: "What you have instead: a comparison is worth 1 or 0. Multiply by it. Add a few together; (score >= 60) + (score >= 70) + ... counts the thresholds you passed. Or use one as an array index to pick a word or a month length." },
      { who: 'psy', text: "The ?: operator can't be switched off. I'll know if you use it. I always know." },
      { who: 'you', text: "Can you see what I'm going to write?" },
      { who: 'psy', text: "Usually. Today, for once, I'd like to be surprised." }
    ] },
    close: { title: 'Surprised', place: 'Archive reading room', beats: [
      { who: 'psy', text: "Grades, larger, sign, shipping, parity, months. Not a single branch anywhere. I couldn't see any of it coming. It was wonderful." },
      { who: 'psy', text: "And minus three came out 'odd', not a crash. n % 2 would have handed you minus one as an index. That one I did see coming, and you didn't take it." },
      { who: 'psy', reward: true, text: "₵1,400 and a Prism Stone. It lets a Pokémon with several evolutions choose its path at once, without waiting at a branch. It seemed fitting." }
    ] }
  },

  'c-lab-45': {
    open: { title: 'Nothing Wasted', place: 'Ridge training ledge', beats: [
      { who: 'kes', text: "One call. One return. Nothing wasted in between." },
      { who: 'kes', text: "A function is a technique: a name, what goes in, what comes out. The prototype is the promise. Keep it exactly." },
      { who: 'kes', text: "Arguments are copies. Change one inside and the caller never feels it. That is pass by value. If percent_of returns a double, give it one: 100.0 * part / whole. 100 * part / whole is integer division, and integers don't do thirds." },
      { who: 'kes', text: "Rounding: a cast to int cuts toward zero, so add a half for positives and take a half for negatives. fourth_power calls square twice. Reuse the technique. Don't rewrite it." }
    ] },
    close: { title: 'Clean Form', place: 'Ridge training ledge', beats: [
      { who: 'kes', text: "Square, percent, nearest, repeat, fourth power. Minus two and a half rounded to minus three. Clean form." },
      { who: 'kes', text: "You didn't do too much in the middle. Most people do." },
      { who: 'kes', reward: true, text: "₵600 and two Potions. One call each. Nothing wasted." }
    ] }
  },

  'c-lab-46': {
    open: { title: 'Three Clerks and 1900', place: 'Archive index room', beats: [
      { who: 'libr', text: "Everything here is indexed. Every record is dated by its day of the year, and three of my clerks disagree about 1900." },
      { who: 'libr', text: "Was 1900 a leap year? No. Divisible by four, yes, but also by a hundred, and not by four hundred. 2000 was. The rule has three parts and people remember two." },
      { who: 'libr', text: "Build it in layers. is_leap. Then days_in_month, which asks is_leap. Then is_valid_date, which asks days_in_month. Then day_of_year and days_left_in_year on top. Each function trusts the one below it. That is what an index is: trust, stacked carefully." },
      { who: 'libr', text: "An invalid date returns -1. Never a guess. A guessed date in an archive is worse than a missing one, because nobody knows to look for it." }
    ] },
    close: { title: 'Trust, Stacked Carefully', place: 'Archive index room', beats: [
      { who: 'libr', text: "The fifteenth of June, 2000: day 167. The twenty-ninth of February, 1900: -1. The clerks have stopped arguing about this. They have found something else to argue about, but not this." },
      { who: 'libr', text: "Every layer holds.", outcome: {
        independent: "You built every layer on the one beneath it and never had to take any of it down. Tidy.",
        persisted: "Some of those dates fought back. You re-shelved them until they fitted. That is archiving.",
        guided: "You consulted the notes. Archivists consult things. It is most of the job." } },
      { who: 'libr', reward: true, text: "₵3,000. The Leap Day Stamp, which we use once every four years, except when we don't. And a Natu, Level 20. It stares at the sun for hours and is said to see the past and the future. It has perched on the calendar shelf since you started. I believe it approved." }
    ] }
  },

  'c-lab-47': {
    open: { title: 'Down, Grab, Up', place: 'End of the pier', beats: [
      { who: 'perl', text: "Down, grab, up. If you stay down too long, you don't come up at all." },
      { who: 'perl', text: "A pointer is a dive. You don't carry the pearl bed around with you; you carry where it is. Put a star on the pointer and you're at the bottom with your hand on the pearl. Change it there and it's changed for everyone." },
      { who: 'perl', text: "To swap two values, keep one in your hand, move the other across, put yours down. That works even when both dives go to the same spot. The clever XOR trick doesn't. It comes up empty-handed." },
      { who: 'you', text: "What if I lose the address?" },
      { who: 'perl', text: "Then you've got a pearl and no idea where the bed is. And when someone asks which of two spots holds the bigger pearl, hand them the spot, not a copy of the pearl. They'll be diving there next." }
    ] },
    close: { title: 'Clean Dive', place: 'End of the pier', beats: [
      { who: 'perl', text: "Sorted three. Split the seconds. Swapped a spot with itself and it stayed put. Handed back the real spot, and the driver dived there and came up a hundred richer. Clean dive." },
      { who: 'perl', text: "You didn't hold on too long. Most people do." },
      { who: 'perl', reward: true, text: "₵1,400, and this: a pearl I found years back, with the spot I found it scratched inside the shell. The address, not just the pearl. Seemed right." }
    ] }
  },

  'c-lab-48': {
    open: { title: 'The Gauntlet of Ranges', place: 'Indirection Tower stairs', beats: [
      { who: 'c-gym-9', text: "Welcome to Indirection Tower. Mind the candles. Mind the Gengar. The Gengar is behind you. No, the other side." },
      { who: 'c-gym-9', text: "My gauntlet is a set of ranges, given only as two pointers. begin points at the first element and end points one past the last. Half-open. When begin equals end the range is empty, and you mustn't touch a thing." },
      { who: 'c-gym-9', text: "p + 1 isn't one byte along; it's one int along, four bytes in this sandbox. And end - begin is a count of elements, not bytes. The tower's pointers are very polite about units." },
      { who: 'c-gym-9', text: "Return pointers, not indexes. The driver turns them back into positions in its own array, so a pointer into a copy gets caught. Gengar checks." },
      { who: 'c-gym-9', text: "Misdreavus has stolen one of my socks. It's fine. It happens every day. Focus on the ranges." }
    ] },
    close: { title: 'A Dereference', place: 'Indirection Tower stairs', beats: [
      { who: 'c-gym-9', text: "Found, counted, reversed, maxed and strided. Empty ranges untouched. The first of equal maxima, not the last. Not one step off the end." },
      { who: 'c-gym-9', text: "Gengar is impressed.", outcome: {
        independent: "You always knew exactly where everything was. Gengar is delighted to have finally met its match.",
        persisted: "You lost your place a few times and found it again. In this tower, that is the whole skill.",
        guided: "You used the notes. Even Gengar reads the notes. It pretends it doesn't." } },
      { who: 'c-gym-9', reward: true, text: "₵3,000, and a very particular pointer. A Nosepass: its nose always points north, whatever you do to it. This one is shiny, Level 25, and it has pointed at you since the moment you walked in. I'd call that a dereference." },
      { who: 'c-gym-9', text: "Gengar would like to walk you out. It'll be behind you. Try not to jump." }
    ] }
  },

  'c-lab-49': {
    open: { title: 'Reproducible Luck', place: 'Linden Lab results bench', beats: [
      { who: 'sci1', text: "Every result here is reproducible. Let us see whether you are." },
      { who: 'sci1', text: "rand() is a sequence, not magic. srand(seed) chooses where the sequence starts. Seed once, and the same seed gives the same run every time. Seed inside every roll and you keep restarting it, which is how one trainer got eleven critical hits in a row and wrote to the papers." },
      { who: 'sci1', text: "Scaling: rand() % sides + 1 gives 1 to sides, and low + rand() % (high - low + 1) gives low to high inclusive. Mind that + 1. It is the difference between a six-sided die and a five-sided one." },
      { who: 'sci1', text: "For this experiment I have replaced rand and srand with scripted versions. I know every number they will return, and I count every call. One rand per roll. Exactly one." }
    ] },
    close: { title: 'Reproducible. Noted.', place: 'Linden Lab results bench', beats: [
      { who: 'sci1', text: "One srand. One rand per roll. Every result matches the script. Reproducible. Noted." },
      { who: 'sci1', text: "I ran it four times and got the same numbers each time. I find that more exciting than I can adequately express, so I shall simply write it down." },
      { who: 'sci1', reward: true, text: "₵1,400 and a Spinda, Level 18. Every Spinda's spots are a different random pattern; no two have ever been seen alike. Consider it a control subject for how random the world actually is." }
    ] }
  }
};
