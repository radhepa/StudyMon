/* Phase 7 threads and walk-ins. Registered through registerThread() and
   registerWalkin() (js/engine/walkins.js). Threads load first so walk-ins and
   the thread-aware rumors at the bottom can name their stages.

   Thread fields: id, title, people (2+ cast IDs), stages (ordered stage IDs).
   Walk-in fields: id, location (a directory place), people, title, beats
   ([{who?, text}]), thread + stage (optional; one scene per stage), minGap
   (answered questions after the previous stage; default WALKIN_THREAD_GAP),
   priority, when, close (optional last-button label).

   Both threads grow out of arcs the Phase 5 batches already wrote: Oz and Sal
   at the pier (restless / patient), Mo and Dax at the café counter
   (counter / fixture). Nothing here asks the player to befriend anyone. */
(function () {
  registerThread({ id: 'pier-post', title: 'The end post', people: ['oz', 'sal'],
    stages: ['wager', 'squall', 'shared-post'] });
  registerThread({ id: 'window-table', title: 'The window table', people: ['barista', 'dax'],
    stages: ['reserved-sign', 'settled'] });

  [
    { id: 'pier-wager', location: 'pier', people: ['oz', 'sal'], thread: 'pier-post', stage: 'wager',
      title: 'A bet on the end post',
      beats: [
        { who: 'oz', text: 'Oz is walking backwards down the pier with his rod over his shoulder, talking the whole way. "Moving is fishing, Sal. You go where the fish are. You do not wait for them to write."' },
        { who: 'sal', text: 'Sal has not looked up from his float. "Fish do not write. That is why you wait."' },
        { who: 'oz', text: '"Bet you. One week. I fish anywhere I like, you stay on that post, most fish wins. Loser carries the bait bucket."' },
        { who: 'sal', text: 'A long pause. The float bobs once. "Deal. Mind the third board, it is loose." Oz steps on the third board. It is loose.' }
      ] },
    { id: 'pier-squall', location: 'pier', people: ['oz', 'sal'], thread: 'pier-post', stage: 'squall', minGap: 20,
      title: 'Squall off the water',
      beats: [
        { text: 'The sky goes grey all at once and the wind turns the river to hammered tin. Lines snap sideways. Somebody\'s hat goes in.' },
        { who: 'oz', text: 'Oz is already running - he has fished every corner of this pier this week, and he knows exactly which shed has a door that shuts. "Sal! Boathouse! Now!"' },
        { who: 'sal', text: 'Sal is reeling in both their lines at once, calm as a lighthouse, untangling Oz\'s by feel. "Take the bucket. I have got the rods."' },
        { text: 'Twenty minutes later they are sitting on upturned crates in the boathouse, soaked, sharing a thermos and not mentioning the bet at all.' }
      ] },
    { id: 'pier-shared-post', location: 'pier', people: ['oz', 'sal'], thread: 'pier-post', stage: 'shared-post', minGap: 20,
      title: 'Two rods, one post',
      beats: [
        { text: 'There are two rods on the end post today. Oz is sitting still. Actually still. It looks like it costs him something.' },
        { who: 'sal', text: 'Sal gets up, walks the full length of the pier, and comes back. "Wanted to see what you see down there," he says. "Mostly boards."' },
        { who: 'oz', text: '"The bet was a draw," Oz announces to nobody. "We are calling it a draw. I will carry the bucket anyway. I have the legs for it."' }
      ],
      close: 'Leave them to the quiet' },

    { id: 'cafe-reserved-sign', location: 'cafe', people: ['barista', 'dax'], thread: 'window-table', stage: 'reserved-sign',
      title: 'A sign on the window table',
      beats: [
        { text: 'There is a small folded card on the window table this morning. Hand-lettered, slightly crooked: RESERVED.' },
        { who: 'dax', text: 'Dax stands over it like it might be a trap. "Reserved for who?" He does not sit down. He does not leave either.' },
        { who: 'barista', text: 'Mo does not look up from the milk jug. "For whoever keeps sitting there every day, I suppose. Seemed tidier than pretending."' },
        { who: 'dax', text: 'Dax sits. He moves the card one inch to the left, which is apparently the correct place for it, and orders the usual.' }
      ] },
    { id: 'cafe-window-settled', location: 'cafe', people: ['barista', 'dax'], thread: 'window-table', stage: 'settled', minGap: 15,
      title: 'The table gets wiped',
      beats: [
        { text: 'Near closing, Dax is wiping down the window table. Then the one next to it. Then, after a visible struggle with himself, the counter.' },
        { who: 'barista', text: 'Mo watches him do it and says nothing, which from Mo is a whole speech.' },
        { text: 'The card has been rewritten. It now says RESERVED - DAX (AND GUESTS). The "and guests" is in different handwriting. Both of theirs, probably.' }
      ] }
  ].forEach(registerWalkin);

  /* Later talk reacts to thread stages. This file loads before
     js/data/rumors.js, whose biased window-table rumor retires once the
     thread settles. */
  [
    { id: 'pier-bet', reliability: 'biased', about: 'oz', speakers: ['skiff', 'coral', 'wade'],
      when: { all: ['thread-at:pier-post:wager'] }, resolvedBy: ['thread-at:pier-post:shared-post'],
      text: 'Oz swears he is winning the bet with Sal, and he has the bucket-free hands to prove it. Sal has not said a word, which Oz insists is a confession.' },
    { id: 'pier-draw', reliability: 'flavor', about: 'sal', speakers: ['skiff', 'coral', 'wade', 'nemo'],
      when: { all: ['thread-at:pier-post:shared-post'] },
      text: 'The two old anglers share the end post now. You can tell which rod is whose: one never moves, and the other has been reeled in and recast eleven times since lunch.' },
    { id: 'window-guests', reliability: 'flavor', about: 'dax', speakers: ['kip', 'nel', 'rook'],
      when: { all: ['thread-at:window-table:settled'] },
      text: 'The window table has a sign now: RESERVED - DAX (AND GUESTS). Nobody is quite sure who counts as a guest. People have started sitting there anyway and Dax has started letting them.' }
  ].forEach(registerRumor);
})();
