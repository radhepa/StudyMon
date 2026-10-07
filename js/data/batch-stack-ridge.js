/* Phase 7 Slice 7, connected batch 2: "Two paces up Stack Ridge".

   One bounded location cluster at Stack Ridge (opens at four badges): the
   Phase 5 hikers Burl (carries twice what he needs) and Crag (one step, then
   the same step again), June the trail guide (Tier 1; trained on the ridge,
   packs extra lunch), and Roan the mountain guide, whose ordinary talk
   already grants a Carved Bird Whistle (receipt discovery:ridge-whistle).

   Trigger table (every ID is stable):
   | ID                          | kind     | fires when                                           | resolves / receipt                         |
   | thread ridge-pace           | thread   | stages switchback -> summit                          | derived from resolved walk-ins             |
   | walkin ridge-switchback     | walk-in  | Burl, Crag or June met; ridge open                   | thread-at ridge-pace:switchback            |
   | walkin ridge-summit         | walk-in  | switchback + 20 answered questions                   | thread-at ridge-pace:summit                |
   | rumor roan-whistle          | reliable | ridge open; Roan's whistle not yet received (actionable) | retires on receipt:discovery:ridge-whistle |
   | rumor burl-pack             | biased   | Burl met                                             | retires on summit                          |
   | rumor ridge-two-cups        | flavor   | after summit                                         | none                                       |
   | mail june-ridge-flower      | postcard | June at least comfortable                            | receipt world:mail:june-ridge-flower       |
   | mail burl-spare-berries     | letter   | after summit                                         | receipt world:mail:burl-spare-berries      |
   | vignette june-pressed-flower| vignette | Pressed Route Flower held + June's postcard enclosure | resolved on "Put it away"                 |
   The web edge burl-crag also reveals its deeper line after the summit.

   Contradiction review: Burl's Phase 5 lines give spare laces and ropes and
   warn about scree past the second switchback; Crag's say one step at a time
   and that he rarely needs the rope. Burl's heart events ("The full pack",
   "Setting the kettle down") are not retold here; this thread happens
   beside them. Roan's own line says June trained on the ridge and still
   walks faster on the flat. Nobody is pushed into friendship; nothing is
   about the course. */
(function () {
  registerThread({ id: 'ridge-pace', title: 'Two paces up the ridge', people: ['burl', 'crag'],
    stages: ['switchback', 'summit'] });

  [
    { id: 'ridge-switchback', location: 'ridge', people: ['burl', 'crag', 'june'], thread: 'ridge-pace', stage: 'switchback',
      title: 'Rest stop at the second switchback',
      beats: [
        { who: 'burl', text: 'Burl has stopped at the second switchback and is unpacking: a groundsheet, a spare groundsheet, a rope, a smaller rope, and a tin of biscuits "for morale".' },
        { who: 'crag', text: 'Crag has not stopped. Crag is three steps further up, then four, then five, saying over his shoulder, "Same step. Same step. You can rest at the top."' },
        { who: 'june', text: 'June comes down the path the other way with Eevee trotting ahead, takes a biscuit from the tin without breaking stride, and calls back, "You are both slow. Lovely day for it."' },
        { text: 'Burl looks at the biscuit tin. Crag looks at the summit. For a moment they look, unmistakably, at each other.' }
      ] },
    { id: 'ridge-summit', location: 'ridge', people: ['burl', 'crag'], thread: 'ridge-pace', stage: 'summit', minGap: 20,
      title: 'Two cups at the summit',
      beats: [
        { text: 'There is a thin wind at the top of Stack Ridge and a cairn somebody keeps adding stones to. Burl arrives last, as always, and drops his pack like a bag of anvils.' },
        { who: 'crag', text: 'Crag, who carries nothing he does not need, reaches into his coat and takes out two tin cups. Two. He does not explain the second one.' },
        { who: 'burl', text: 'Burl, who carries everything, has the water and the little stove. "Knew one of us would think of cups," he says. Neither of them says which one of them meant to.' },
        { text: 'They drink it looking at the view and not at each other. On the way down, Crag takes the rope. He does not need it. He carries it anyway.' }
      ],
      close: 'Leave them the view' }
  ].forEach(registerWalkin);

  [
    { id: 'roan-whistle', reliability: 'reliable', actionable: true, about: 'roan', fact: 'badges-at-least:c:4',
      anyoneAt: ['ridge'], when: { all: ['badges-at-least:c:4'] }, resolvedBy: ['receipt:discovery:ridge-whistle'],
      text: 'Roan, the mountain guide on the ridge, carves little bird whistles in the evenings and gives one to anybody who stops for a proper chat. It is loud enough to be found by in fog.' },
    { id: 'burl-pack', reliability: 'biased', about: 'burl', speakers: ['flint', 'kes', 'roan', 'moss'],
      when: { all: ['met:burl'] }, resolvedBy: ['thread-at:ridge-pace:summit'],
      text: 'Crag reckons Burl\'s pack weighs more than Burl does, and that one day the pack will carry Burl up instead. Burl says every spare thing in it has been used at least once, by someone.' },
    { id: 'ridge-two-cups', reliability: 'flavor', about: 'crag', anyoneAt: ['ridge'],
      when: { all: ['thread-at:ridge-pace:summit'] },
      text: 'Somebody has hung two tin cups on the summit cairn, one on each side. Nobody touches them. Everyone on the ridge knows exactly whose they are.' }
  ].forEach(registerRumor);

  [
    { id: 'june-ridge-flower', type: 'postcard', from: 'june', priority: 1,
      when: { all: ['stage:june:comfortable'] },
      title: 'From the top path',
      body: 'Found this growing out of a crack on the top path, where nothing should grow. Pressed it in my map case on the way down, so it is flat and a bit map-shaped. Place and date on the back.\n\nEevee wanted to eat it. I said it was for you. Eevee has accepted this, for now.' ,
      attachment: [{ item: 'pressedFlower', count: 1 }] },
    { id: 'burl-spare-berries', type: 'letter', from: 'burl', priority: 1,
      when: { all: ['thread-at:ridge-pace:summit'] },
      title: 'I packed too many again',
      body: 'I packed too many Oran Berries again. I always do. Crag says I should pack fewer. Crag also turned up at the top with two cups, so I am not taking packing advice from Crag this month.\n\nThese are for your next climb. Or your next anything. Spares are never wasted weight; that is the one thing I know for certain.',
      sign: '- Burl',
      attachment: [{ item: 'oran', count: 3 }] }
  ].forEach(registerMail);

  registerVignette({ id: 'june-pressed-flower', item: 'pressedFlower', with: 'june',
    when: { all: ['rewarded:mail:june-ridge-flower'] },
    title: 'A bit map-shaped',
    text: 'It really is a bit map-shaped: one petal has pressed flat against a contour line and taken a faint brown curve from it, like the flower tried to learn the route.\n\nOn the back, in June\'s quick handwriting, a place and a date, and underneath that, smaller: "left path after the bridge. The right one is still mud."',
    close: 'Tuck it in your notebook' });
})();
