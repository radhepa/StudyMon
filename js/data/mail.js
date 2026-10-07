/* Phase 7 mail. Registered through registerMail() (js/engine/mail.js).

   Fields: id, type (letter | postcard | invitation), from (cast ID; they must
   have met the player), title, body (paragraphs split by a blank line), sign
   (optional), when (world condition), priority, attachment ([{item, count}],
   never key or unique items), invitation ({location}), returning (a warm note
   chosen only when a save is opened after a few days away; needs an
   established friendship in when.all and carries no enclosure).

   Letters are about people's lives. They never mention the course, never
   count days, and never make the player feel behind. */
(function () {
  [
    { id: 'kern-first-week', type: 'letter', from: 'aide', priority: 3,
      when: { all: ['receipt:aide-exp-share'] },
      title: 'About that drawer',
      body: 'Glad the EXP Share finally left my desk. It had been rattling around in there with three dead pens and a sandwich I would rather not discuss.\n\nThe Professor is still out in the field. She sends notes back tied to a Pidgey, which is charming until you are the one untying them in the rain. If you are passing the lab road, wave. I will probably be carrying something.\n\nPut these somewhere useful. I had spares.',
      sign: '- Kern',
      attachment: [{ item: 'superpotion', count: 2 }] },

    { id: 'mira-tea', type: 'postcard', from: 'mira', priority: 2,
      when: { all: ['stage:mira:comfortable'] },
      title: 'The mint came back',
      body: 'The mint behind the Centre came back after the frost, which it does every year, and every year I am surprised. I dried too much of it again.\n\nThere is a tin in with this card. It is not a thank-you, exactly. Oddish sat on the lid while I wrote this, so it may be slightly squashed.',
      attachment: [{ item: 'teaTin', count: 1 }] },

    { id: 'theo-winch', type: 'letter', from: 'theo', priority: 1,
      when: { all: ['badges-at-least:c:3'] },
      title: 'Winch three works',
      body: 'Winch three works. I did not tell anyone I fixed it, I just waited until the fishermen noticed, which took two days, and then Oz said "huh" and went back to casting. Best review I have ever had.\n\nMagnemite has adopted the harbour bell. It hums at it. The bell does not seem to mind.',
      sign: '- Theo (the one with the screws)' },

    { id: 'byte-open-afternoon', type: 'invitation', from: 'c-gym-1', priority: 2,
      when: { all: ['leader-beaten:c-gym-1'] },
      title: 'Open afternoon at the café',
      body: 'Some of us who keep the gyms are meeting at the café one afternoon a week. No matches, no rankings. Just tea, bad jokes and whoever wants to talk about their Pokémon for an hour.\n\nYou are welcome any week you like. Snorlax will be taking up two chairs; that is part of the tradition now.',
      invitation: { location: 'cafe' } },

    { id: 'rhea-chart', type: 'postcard', from: 'calc-gym-1', priority: 1,
      when: { all: ['leader-beaten:calc-gym-1'] },
      title: 'You are here, probably',
      body: 'A chart of the Landfall headland, drawn from the lookout on a clear morning. The arrows are the wind. The little X is where you stood for our match. I copied one for Byte as well. The last one went straight into a frame, which I was told about in a four-page letter.\n\nThe glass is from the tide line below the gym. It turns up after storms.',
      attachment: [{ item: 'seaGlass', count: 1 }] },

    { id: 'bell-isles-card', type: 'postcard', from: 'postie', priority: 0,
      when: { all: ['visited:calc'] },
      title: 'Greetings from the sorting room',
      body: 'Wrote this on the back of a spare card because the Isles run finally has a regular boat and I wanted to send something on it. The ferry crew call me "the one who runs". I have decided that is a compliment.\n\nNo news, really. The bag is heavier on the way back, which I think means people like it over there.' },

    { id: 'rowan-kept-the-spot', type: 'letter', from: 'rowan', returning: true, priority: 5,
      when: { all: ['stage:rowan:friend'] },
      title: 'Kept the good side',
      body: 'I have been keeping the good side of the practice field. Nobody asked me to. It is just easier to hold a spot than to argue for one later.\n\nRiolu learned to stand on one foot. It is not useful. It is very impressive. Come see whenever you are around, there is no hurry on it.' },

    { id: 'mira-garden-news', type: 'letter', from: 'mira', returning: true, priority: 4,
      when: { all: ['stage:mira:friend'] },
      title: 'Garden news, since you asked (you did not ask)',
      body: 'The beans made it over the fence and are now in Nurse Ada\'s window box, which she says she does not mind. The tomatoes split in the rain. Oddish is fine.\n\nNothing needs doing. I just like writing things down for someone. Tea is on whenever you pass.' }
  ].forEach(registerMail);
})();
