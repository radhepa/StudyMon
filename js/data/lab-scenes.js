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
  }
};
