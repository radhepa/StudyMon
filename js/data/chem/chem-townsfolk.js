/* The people of the Periodic Coast.

   Every `cls` here is one CLASS_STORY in folk-events.js already writes an arc
   for, so each person gets their three heart events for free. Check that list
   before inventing a job title, or the person will have nothing to say at one
   heart.

   Ids start with 'h-' so they never collide with the C region (no prefix) or
   the Converging Isles ('c-'). `ch` is a gym number on THIS coast (1-13).
   Talkers' tips may be about chemistry and must stay correct. */

window.CHEM_TOWNSFOLK = [

  /* ---------------- Avogadro Landing ---------------- */
  { id: 'h-nurse-landing', name: 'Nurse Merrin', cls: 'Harbour Nurse', loc: 'landing', kind: 'heal',
    say: 'Off the ferry and straight to me, good. The sea air is lovely, and it is also why everyone arrives looking tired.' },
  { id: 'h-mart-landing', name: 'Ansel', cls: 'Mart Clerk', loc: 'landing', kind: 'shop',
    say: 'Balls, potions, and a pocket periodic table that folds up very small. The table is free. Do not tell my manager.' },
  { id: 'h-corwin', name: 'Corwin', cls: 'Ferryman', loc: 'landing', kind: 'gift', item: 'seaGlass', amount: 1,
    say: 'First crossing to the Coast is on me, and so is this. Picked it off the pier the morning the brass sign gained another digit.' },
  { id: 'h-tegan', name: 'Tegan', cls: 'Note Taker', loc: 'landing', kind: 'talk',
    say: 'I measured the pier three times and got three answers. All of them were right, to the digits I could actually read.',
    tip: 'Leading zeros never count as significant figures; trailing zeros after a decimal point do. So 0.00520 has three, and 5300. has four.' },
  { id: 'h-bryony', name: 'Bryony', cls: 'Lass', loc: 'landing', kind: 'trainer', ch: 1, team: [81, 399], pay: 130,
    say: 'Read the meniscus at eye level, from the bottom of the curve. Vera made me practise it for a week.',
    win: 'You read it level. I read it from above.', lose: 'Parallax. You were standing on tiptoe.' },
  { id: 'h-ozias', name: 'Ozias', cls: 'Youngster', loc: 'landing', kind: 'trainer', ch: 2, team: [74, 100], pay: 140,
    say: 'Most of an atom is empty space. Most of my pockets are empty space too. Battle me.',
    win: 'Bounced straight off the nucleus.', lose: 'Straight through, like alpha particles through gold foil.' },
  { id: 'h-tamsin', name: 'Tamsin', cls: 'Swimmer', loc: 'landing', kind: 'trainer', ch: 4, team: [118, 72], pay: 165,
    say: 'I swim below Precipitate Falls. When two clear streams meet and the water turns cloudy, something solid just formed.',
    win: 'Silver chloride. I knew that white cloud.', lose: 'Nothing fell out. Everything stayed dissolved.' },

  /* ---------------- The Resource Room ---------------- */
  { id: 'h-nurse-resource', name: 'Nurse Aldith', cls: 'Reading Room Nurse', loc: 'resource', kind: 'heal',
    say: 'This is a quiet room, so heal quietly. Your Pokémon may snore. You may not.' },
  { id: 'h-halvard', name: 'Halvard', cls: 'Lab Aide', loc: 'resource', kind: 'talk',
    say: 'A TA asked me what my units were and I said "numbers". We are still talking about it.',
    tip: 'Write the unit on every number and cancel units like factors. If the units come out right, the setup almost always is.' },
  { id: 'h-carys', name: 'Carys', cls: 'Café Regular', loc: 'resource', kind: 'talk',
    say: 'I have been at this table since breakfast with one problem and too much coffee. The problem is losing.',
    tip: 'Never put grams into a mole ratio. Grams to moles first, then the coefficients, then back to grams.' },
  { id: 'h-bastien', name: 'Bastien', cls: 'Debate Club', loc: 'resource', kind: 'trainer', ch: 3, team: [27, 263], pay: 150,
    say: 'I will argue that the reactant you have less of is always the limiting one. I will probably lose.',
    win: 'Convert both to moles of product. Fine. You win.', lose: 'It happened to be true this time. It is not always.' },

  /* ---------------- Brown Lab Terraces ---------------- */
  { id: 'h-isaura', name: 'Isaura', cls: 'Scientist', loc: 'brown', kind: 'talk',
    say: 'Goggles on, hair tied back, and never pipette by mouth. Those are the only three rules I will shout about.',
    tip: 'In a net ionic equation, split only strong electrolytes into ions. Solids, liquids, gases and weak acids stay whole.' },
  { id: 'h-hester', name: 'Hester', cls: 'Field Researcher', loc: 'brown', kind: 'talk',
    say: 'A coffee-cup calorimeter is just a coffee cup with ambitions. Mine has a lid and a thermometer and no coffee in it, sadly.',
    tip: 'In q = mcΔT, a temperature change is the same size in °C and in kelvin, so ΔT never needs converting.' },
  { id: 'h-fenwick', name: 'Fenwick', cls: 'Lab Aide', loc: 'brown', kind: 'trainer', ch: 4, team: [88, 109], pay: 180,
    say: 'I wash the glassware on the Terraces. Most of it smells of something I am not allowed to name.',
    win: 'Spectators crossed out. Clean.', lose: 'You left the sodium in. It was only watching.' },
  { id: 'h-oriel', name: 'Oriel', cls: 'Scientist', loc: 'brown', kind: 'trainer', ch: 5, team: [4, 218, 104], pay: 200,
    say: 'Heat released means a negative ΔH. I have that written on the inside of my goggles.',
    win: 'Exothermic, and I still flipped the sign.', lose: 'Sign first, size second.' },

  /* ---------------- Spectral Point ---------------- */
  { id: 'h-lisle', name: 'Lisle', cls: 'Lamplighter', loc: 'spectra', kind: 'talk',
    say: 'Through the prism up there, hydrogen glows in four lines: red, blue-green, blue-violet and violet.',
    tip: 'Shorter wavelength means higher energy, E = hc/λ. A violet photon (~400 nm) carries more energy than a red one (~700 nm).' },
  { id: 'h-gwilym', name: 'Gwilym', cls: 'Field Researcher', loc: 'spectra', kind: 'talk',
    say: 'I map Dmitra’s staircase from the lighthouse window. Some floors fill before the ones below them look full.',
    tip: 'Transition metals lose their 4s electrons before 3d: Fe is [Ar] 4s² 3d⁶, but Fe²⁺ is [Ar] 3d⁶.' },
  { id: 'h-morwenna', name: 'Morwenna', cls: 'Sailor', loc: 'spectra', kind: 'trainer', ch: 6, team: [170, 179, 175], pay: 220,
    say: 'Brighter lamps do not make stronger photons, just more of them. The fishing fleet never believes me.',
    win: 'More light, same energy each. You got it.', lose: 'Below the threshold, nothing happens, however bright.' },
  { id: 'h-thaddeus', name: 'Thaddeus', cls: 'Psychic', loc: 'spectra', kind: 'trainer', ch: 7, team: [63, 436], pay: 240,
    say: 'I sense an iron ion. It has lost two electrons. From the 4s.',
    win: 'Fe²⁺, [Ar] 3d⁶. You saw it too.', lose: 'You took them from the 3d. Everyone does, once.' },
  { id: 'h-perrin', name: 'Perrin', cls: 'Bird Keeper', loc: 'spectra', kind: 'trainer', ch: 12, team: [425, 163], pay: 300,
    say: 'Warm a balloon from 10 °C to 20 °C and it does not double. Go from 283 K to 566 K and it does.',
    win: 'Kelvin, every time. Right.', lose: 'You used Celsius. The gas noticed.' },

  /* ---------------- Crystal Caverns ---------------- */
  { id: 'h-elowen', name: 'Elowen', cls: 'Caver', loc: 'crystal', kind: 'talk',
    say: 'Every wall in here is the same tiny box, repeated more times than anyone could count.',
    tip: 'Atoms per cubic unit cell: simple cubic 1, body-centred 2, face-centred 4. Corners count ⅛, faces ½, the centre counts whole.' },
  { id: 'h-rhodri', name: 'Rhodri', cls: 'Cave Guide', loc: 'crystal', kind: 'talk',
    say: 'Mind the quartz. It is harder than your boots and older than the Coast.',
    tip: 'Hydrogen bonding needs H bonded directly to N, O or F. Methane’s C−H bonds never hydrogen-bond, which is why it boils so low.' },
  { id: 'h-brannock', name: 'Brannock', cls: 'Black Belt', loc: 'crystal', kind: 'trainer', ch: 8, team: [66, 304, 296], pay: 280,
    say: 'Charge beats size. Magnesium oxide melts above 2800 °C because 2+ meets 2−.',
    win: 'Bigger charges, stronger lattice. Yours held.', lose: 'You forgot both charges were doubled.' },
  { id: 'h-sigrun', name: 'Sigrun', cls: 'Cryogenics', loc: 'crystal', kind: 'trainer', ch: 9, team: [361, 220, 712], pay: 300,
    say: 'Four electron groups around oxygen, two of them lone pairs. That is why water is bent.',
    win: 'About 104.5 degrees, not 109.5. Right.', lose: 'Lone pairs count as groups. Always.' },
  { id: 'h-kelda', name: 'Kelda', cls: 'Miner', loc: 'crystal', kind: 'trainer', ch: 13, team: [690, 23], pay: 320,
    say: 'Down here some rocks are warm for no good reason. I do not lick them.',
    win: 'Three half-lives, one eighth left. You counted.', lose: 'Alpha takes four off the top and two off the bottom.' },

  /* ---------------- Elliott Hall of Music ---------------- */
  { id: 'h-orla', name: 'Orla', cls: 'Referee', loc: 'hall', kind: 'talk',
    say: 'Six thousand seats, every one assigned. Find your row the night before, not the minute before.',
    tip: 'After n half-lives the fraction left is (½)ⁿ: one leaves 50%, two leave 25%, three leave 12.5%.' },
  { id: 'h-ignatius', name: 'Ignatius', cls: 'Ace Trainer', loc: 'hall', kind: 'trainer', ch: 10, team: [86, 363, 872], pay: 360,
    say: 'Boiling breaks the forces between molecules, never the bonds inside them. Steam is still water.',
    win: 'Between, not within. Fine.', lose: 'You said the O−H bonds broke. They never do.' },
  { id: 'h-marguerite', name: 'Marguerite', cls: 'Beauty', loc: 'hall', kind: 'trainer', ch: 11, team: [270, 43, 10], pay: 380,
    say: 'Calcium chloride lowers the freezing point three times as much as sugar at the same molality. Three particles, not one.',
    win: 'i equals three. You counted.', lose: 'Sugar does not split. Salt does.' }
];

if (window.CHEM_SUBJECT) window.CHEM_SUBJECT.TOWNSFOLK = window.CHEM_TOWNSFOLK;
