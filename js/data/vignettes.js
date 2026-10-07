/* Phase 7 item vignettes. Registered through registerVignette()
   (js/engine/vignettes.js). Only curated notable items; never balls,
   medicine, battle items or anything common.

   Fields: id, item, with (optional cast ID; they must have met the player),
   when (world condition), title, text (paragraphs split by a blank line),
   close (optional button label). */
(function () {
  [
    { id: 'exp-share-drawer', item: 'expShare', with: 'aide',
      title: 'The drawer it lived in',
      text: 'There is a strip of masking tape on the underside, half peeled. Someone wrote a date on it and then crossed the date out and wrote "whenever they turn up" instead.\n\nIt still smells faintly of Kern\'s desk: pencil shavings, cold coffee, the rubber of a spare Poké Ball seal. Your Pokémon crowd round it the first night like it is a campfire.\n\nYou peel the tape off and keep it in the notebook. It seems wrong to throw it away.',
      close: 'Keep the tape' },

    { id: 'mira-tea-tin', item: 'teaTin', with: 'mira',
      when: { all: ['rewarded:mail:mira-tea'] },
      title: 'Slightly squashed',
      text: 'The lid is dented exactly the shape of a small, round, leafy Pokémon that sat on it. It still closes. Mostly.\n\nInside, under the juniper, there is a folded scrap of seed packet with "for the kettle, not for Oddish" written on it in careful capitals. The second half of the word "Oddish" has been smudged by something that was probably a leaf.\n\nYou make a cup that evening. It tastes like a garden that has been told to stop growing and absolutely has not.',
      close: 'Put the kettle away' },

    { id: 'rhea-sea-glass', item: 'seaGlass', with: 'calc-gym-1',
      when: { all: ['rewarded:mail:rhea-chart'] },
      title: 'From the tide line',
      text: 'It is warmer than glass has any right to be, as if it kept a little of the afternoon it was found in. Held up to the window it throws a green-blue coin of light across the table.\n\nRhea\'s chart is still in the envelope. The little X where you stood is drawn slightly off the headland, in the sea. Whether that is a joke or an honest estimate is not clear, and you suspect Rhea prefers it that way.',
      close: 'Pocket the glass' },

    { id: 'bent-spoon-drawer', item: 'bentSpoon',
      title: 'It was like that when you found it',
      text: 'You try to straighten it once, carefully, with both thumbs. It bends back. Not dramatically. Just back to where it was, the way a cat returns to a warm step.\n\nYour Pokémon regard it with enormous suspicion and then, one by one, lose interest. Except one, who keeps checking on it in the night.',
      close: 'Leave it bent' },

    { id: 'prism-stone-light', item: 'prismStone',
      title: 'Every colour at once',
      text: 'In daylight it is almost clear. By a lamp it throws a small tidy rainbow onto whatever is nearest, which tonight is the back of your hand and one very confused Pokémon.\n\nIt feels like a choice that has not been made yet: heavy in a way that has nothing to do with its weight. You put it at the bottom of the bag where it will not make the decision for you.',
      close: 'Wrap it back up' }
  ].forEach(registerVignette);
})();
