/* Phase 7 rumors. Registered through registerRumor() (js/engine/rumors.js),
   which checks speakers, facts, reliability and perspective framing.

   Fields: id, reliability (reliable | biased | flavor), speakers (cast IDs)
   and/or anyoneAt (location IDs: anyone whose home it is, except the person
   the rumor is about), about (cast or fact ID), priority, when (world
   condition), resolvedBy (facts that retire it), fact (what a reliable rumor
   asserts; it is withheld whenever that is not true), actionable (a reliable
   hint the player can act on; always told first), text.

   Reliable rumors here are mechanically true in this build:
   - Kern's EXP Share is the grant on his town talk (receipt aide-exp-share).
   - Tam's potions are the one-off town gift (S.town.gifts.tam).
   - Theo's home is the pier (COMPANION_HOME), which opens at two badges;
     June's is the ridge, which opens at four.
   - Byte's hangouts after defeat include the cafe (GYM_LEADER_PROFILES). */
(function () {
  [
    { id: 'kern-drawer', reliability: 'reliable', actionable: true, about: 'aide',
      anyoneAt: ['town'], speakers: ['postie'], resolvedBy: ['receipt:aide-exp-share'],
      text: 'Kern, the Professor\'s aide, keeps asking whether you have been by. He has something in his desk drawer he means to give the next trainer who stops for a proper chat.' },
    { id: 'tam-potions', reliability: 'reliable', actionable: true, about: 'tam',
      anyoneAt: ['town', 'cafe'], resolvedBy: ['town-gift:tam'],
      text: 'Tam, the shop hand by the Mart, has a box of potions the boss wants handed to anyone heading for a gym. You only have to say hello.' },
    { id: 'theo-winches', reliability: 'reliable', actionable: true, about: 'theo',
      anyoneAt: ['town', 'cafe', 'meadow'], when: { all: ['badges-at-least:c:2'] }, resolvedBy: ['met:theo'],
      text: 'The repair shop apprentice, Theo, has been down at Riverside Pier for days with his sleeves rolled up, fixing the harbour winches. That is where to find him.' },
    { id: 'june-ridge', reliability: 'reliable', actionable: true, about: 'june',
      anyoneAt: ['town', 'cafe', 'pier'], when: { all: ['badges-at-least:c:4'] }, resolvedBy: ['met:june'],
      text: 'June, the trail guide, is taking people up Stack Ridge now that the path is open to you. She packs extra lunch and pretends she did not.' },
    { id: 'byte-radiator', reliability: 'reliable', about: 'c-gym-1', fact: 'leader-beaten:c-gym-1',
      speakers: ['barista', 'kip', 'nel'], when: { all: ['leader-beaten:c-gym-1'] }, priority: 2,
      text: 'Byte from the first gym comes into the café some afternoons now. Screwdriver in her bag, Snorlax across two chairs, always the seat nearest the radiator.' },
    { id: 'oz-on-sal', reliability: 'biased', about: 'sal',
      speakers: ['skiff', 'coral', 'wade'],
      text: 'Oz reckons Sal has not moved off the end post since spring and that the fish only bite for him out of pity. Sal landed more than Oz last week, mind you.' },
    { id: 'dax-window', reliability: 'biased', about: 'dax',
      speakers: ['kip', 'nel', 'rook'], resolvedBy: ['thread-at:window-table:settled'],
      text: 'Dax insists the window table is his by right of seniority. According to Mo, nobody ever agreed to that, and Dax has never once asked.' },
    { id: 'mira-bundles', reliability: 'flavor', about: 'mira',
      speakers: ['mo2', 'wisp', 'holt', 'quill'],
      text: 'Somebody keeps leaving little bundles of dried herbs at the field Centre door, tied with garden twine. Nobody asks. Everybody knows it is Mira.' },
    { id: 'isles-mailbag', reliability: 'flavor', about: 'calc-gym-1',
      speakers: ['postie'], when: { all: ['visited:calc'] },
      text: 'The mailbag from the Isles is heaviest the week one of Rhea Dexter\'s hand-drawn charts is due. Byte writes back the same afternoon, every single time.' }
  ].forEach(registerRumor);
})();
