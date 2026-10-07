/* Phase 7 Slice 7, connected batch 1: "The chart exchange".

   One bounded cluster around an established cross-region friendship: Byte
   (c-gym-1, the Boot Sector Gym) and Rhea Dexter (calc-gym-1, the Landfall
   Gym), Tier 1 correspondents in their Phase 2 bibles, with Phase 6 lines
   about swapping wiring maps and charts. It ties together their rematches,
   the café (Byte's hangout), Origin Harbour, two regional keepsakes, and the
   relationship web.

   Trigger table (every ID is stable):
   | ID                         | kind     | fires when                                              | resolves / receipt                     |
   | thread chart-exchange      | thread   | stages first-visit -> return-visit                      | derived from resolved walk-ins         |
   | walkin cafe-rhea-visits    | walk-in  | both leaders beaten, one of them met; at the café       | thread-at chart-exchange:first-visit   |
   | walkin harbour-byte-visits | walk-in  | first-visit + 30 answered questions; Origin Harbour     | thread-at chart-exchange:return-visit  |
   | rumor rhea-crossing        | reliable | same as cafe-rhea-visits (actionable)                   | retires on first-visit                 |
   | rumor byte-gerald          | biased   | after first-visit                                       | none (perspective, repeats rarely)     |
   | rumor harbour-mechanic     | flavor   | after return-visit; Origin Harbour folk                 | none                                   |
   | mail byte-rematch-note     | letter   | a rematch won against Byte                              | receipt world:mail:byte-rematch-note   |
   | mail rhea-rematch-note     | postcard | a rematch won against Rhea                              | receipt world:mail:rhea-rematch-note   |
   | mail rhea-come-over        | invite   | after first-visit                                       | none                                   |
   | vignette byte-circuit-token| vignette | Copper Circuit Token held + Byte's letter enclosure taken | resolved on "Put it away"            |
   | vignette rhea-brass-token  | vignette | Brass Integral Token held + Rhea's postcard enclosure taken | resolved on "Put it away"          |
   The web edge byte-rhea (js/data/relationship-web.js) also reveals its
   deeper line on thread-at:chart-exchange:first-visit.

   Contradiction review: Rhea gets lost in buildings and rides ferries at the
   rail (Phase 6 lines); Byte names her cables (Gerald), keeps Snorlax by the
   radiator and frames Rhea's charts. Neither region is framed as the smarter
   one (bible rule). Rewards are single regional keepsakes whose item notes
   already plan them for rematches; no money, nothing unique. */
(function () {
  registerThread({ id: 'chart-exchange', title: 'The chart exchange', people: ['c-gym-1', 'calc-gym-1'],
    stages: ['first-visit', 'return-visit'] });

  var bothBeaten = ['leader-beaten:c-gym-1', 'leader-beaten:calc-gym-1'];
  var eitherMet = ['met:c-gym-1', 'met:calc-gym-1'];

  [
    { id: 'cafe-rhea-visits', location: 'cafe', people: ['c-gym-1', 'calc-gym-1'], thread: 'chart-exchange', stage: 'first-visit',
      priority: 5, when: { all: bothBeaten, any: eitherMet },
      title: 'A visitor from across the water',
      beats: [
        { text: 'Someone is standing just inside the café door, turning slowly on the spot with a folded chart in one hand. It is Rhea Dexter from the Landfall Gym, who crossed open water this morning without a second thought, and is now lost between the counter and the coat hooks.' },
        { who: 'c-gym-1', text: 'Byte does not get up from the seat by the radiator. She just raises a hand. "Left at the counter, then keep going until you hit Snorlax. Everybody finds me that way."' },
        { who: 'calc-gym-1', text: '"Forty miles of sea and I nearly walked into your broom cupboard." Rhea sits, unfolds the chart across the table, and pins one corner down with the sugar bowl.' },
        { text: 'Byte produces a wiring diagram with every cable labelled in tiny capitals. One label says GERALD. Rhea asks. Byte does not explain. They trade anyway, and talk until Mo starts stacking chairs around them.' }
      ] },
    { id: 'harbour-byte-visits', location: 'harbour', people: ['c-gym-1', 'calc-gym-1'], thread: 'chart-exchange', stage: 'return-visit',
      minGap: 30, priority: 5,
      title: 'Byte makes landfall',
      beats: [
        { text: 'Byte is on the harbour wall, holding the rail with both hands although the ferry has been tied up for ten minutes. Her screwdriver is in her top pocket, where she can reach it in an emergency.' },
        { who: 'calc-gym-1', text: '"Told you the rail was the best seat," Rhea says, and is very kind about not mentioning anything else.' },
        { who: 'c-gym-1', text: '"Your whole region is outdoors," Byte says, looking around. "Where do you keep anything?" Rhea points straight up. "Up there. Mostly wind."' },
        { text: 'They walk the headland. Byte stops at every lighthouse mechanism to see how it works. Rhea stops at every Wingull. Neither of them hurries the other along.' }
      ],
      close: 'Leave them to the headland' }
  ].forEach(registerWalkin);

  [
    { id: 'rhea-crossing', reliability: 'reliable', actionable: true, about: 'calc-gym-1', fact: 'leader-beaten:calc-gym-1',
      anyoneAt: ['cafe'], speakers: ['postie'], when: { all: bothBeaten, any: eitherMet },
      resolvedBy: ['thread-at:chart-exchange:first-visit'],
      text: 'Rhea Dexter from the Landfall Gym is coming over on the ferry to see Byte at the café. Stands at the rail the whole crossing, apparently. Worth dropping in.' },
    { id: 'byte-gerald', reliability: 'biased', about: 'c-gym-1', speakers: ['kip', 'rook'],
      when: { all: ['thread-at:chart-exchange:first-visit'] },
      text: 'Rook insists the cable Byte calls Gerald is load-bearing, and that the whole Boot Sector Gym would come down without it. Byte has not denied this, which Rook takes as proof.' },
    { id: 'harbour-mechanic', reliability: 'flavor', about: 'c-gym-1', anyoneAt: ['harbour'],
      when: { all: ['thread-at:chart-exchange:return-visit'] },
      text: 'The gym leader from over the water came through with Rhea. She looked at every lighthouse mechanism on the headland, oiled two of them, and left a note on the third saying it would last another hundred years.' }
  ].forEach(registerRumor);

  [
    { id: 'byte-rematch-note', type: 'letter', from: 'c-gym-1', priority: 2,
      when: { all: ['rematch-won:c-gym-1'] },
      title: 'Result logged, with a star',
      body: 'I put a star next to our rematch in the log, which breaks my own filing rules. Snorlax stayed awake for all of it. That has not happened in months, so take it as a compliment from both of us.\n\nThis turned up while I was clearing out an old machine: a stamped copper trace from the circuit works that closed before I was born. I have three. You should have one.',
      sign: '- Byte',
      attachment: [{ item: 'circuitToken', count: 1 }] },
    { id: 'rhea-rematch-note', type: 'postcard', from: 'calc-gym-1', priority: 2,
      when: { all: ['rematch-won:calc-gym-1'] },
      title: 'A good crossing',
      body: 'That was a clean crossing, start to finish. Machamp has been flexing at the gulls about it all week.\n\nThe brass token is from the old hillside tram. The conductor used to hand them to anyone who rode to the top in bad weather. You earned one in bad weather.',
      attachment: [{ item: 'integralToken', count: 1 }] },
    { id: 'rhea-come-over', type: 'invitation', from: 'calc-gym-1', priority: 1,
      when: { all: ['thread-at:chart-exchange:first-visit'] },
      title: 'Come and see the harbour',
      body: 'Byte has agreed to come over on the ferry, which is brave for someone who thinks a room without walls is a design flaw. If you are on the Isles, come down to Origin Harbour and wave her in.\n\nNo rush. The harbour is not going anywhere. It is the one thing out here that stays put.',
      invitation: { location: 'harbour' } }
  ].forEach(registerMail);

  [
    { id: 'byte-circuit-token', item: 'circuitToken', with: 'c-gym-1',
      when: { all: ['rewarded:mail:byte-rematch-note'] },
      title: 'One of three',
      text: 'The copper is warm-coloured even in the cold, and the trace pattern on it is so neat it looks drawn with a ruler. On the back, scratched very small, is a number: 2 of 3.\n\nByte never said what happened to number 1. You have a feeling it is somewhere in the Boot Sector Gym, labelled, and that it has a name.',
      close: 'Keep it safe' },
    { id: 'rhea-brass-token', item: 'integralToken', with: 'calc-gym-1',
      when: { all: ['rewarded:mail:rhea-rematch-note'] },
      title: 'For riding up in bad weather',
      text: 'It is heavier than it looks, the way brass always is. One side shows the old tram climbing the hill; the other is worn almost smooth by some earlier pocket.\n\nThere is a tiny scratch across the tram, like a wind arrow. It may just be a scratch. With Rhea, you are never entirely sure.',
      close: 'Pocket the token' }
  ].forEach(registerVignette);
})();
