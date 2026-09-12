/* Phase 5 Slice 7: second of the three-character Tier 2 batch at the
   "cavern" cluster - Sump (the "leak" cast entry), the caver who collects
   what the cavern gives up. Every string is a complete contextual
   response; categories count responses rather than fragments, same
   convention as the five prior Tier 2 pairs (Slices 2-6) - see
   null-phase5.js's header comment for the full list and the shared
   backstory this three-character batch is built around. Sump is Tier 2, so
   he gets no CAST_BIBLES entry - his voice and arc live entirely in this
   file and in his dedicated FOLK_EVENTS['unclaimed'] arc (see
   folk-events.js). He was carved out of the shared 'Caver' cls alongside
   Nils and Geode, so this content does not leak onto the Calculus region's
   'c-tovah', the only other 'Caver' in the game. Sump's own arc turns on
   the split geode he found after the old collapse and kept, unreturned,
   for years - see his Event 1 and 2, and Nils's/Geode's own files for the
   other two angles on the same incident. Cross-referenced by ordinary
   narrative mention only, not the relationshipIds gate; see
   oz-phase5.js's header comment and the Phase 5 handoff's "Known risks"
   for why. */
(function () {
  function pool(id, category, when, priority, lines, extra) {
    var value = { id: 'leak-dialogue-' + id, category: category, when: when || {}, priority: priority || 0, lines: lines };
    if (extra) Object.keys(extra).forEach(function (key) { value[key] = extra[key]; });
    return value;
  }

  var D = [
    pool('first-meeting', 'firstMeeting', { firstMeeting: true }, 120, [
      'Careful where you drop that. Everything down here eventually ends up on my shelf, tagged and waiting.',
      'Sump. I keep what this cavern gives up, in case anyone ever comes back for it.',
      'Ask Nils about knowing where you are. Ask me about what happens to the things people leave behind.',
      'Almost nobody comes back for anything. I have decided that is not a reason to stop keeping it.',
      'Welcome to the cavern. Mind the sump pool, and if you drop something, tell me. I will probably still have it in a year.',
      'Nils will keep you from getting lost. I will keep whatever you lose anyway, just in case.',
      'Three trips down and you will know my shelf by sight. Dozens of tags, mostly unclaimed, all of them mine to keep track of.',
      'There is one item on that shelf older than the rest by years. Ask me about it sometime. I will tell you, eventually.',
      'Go on, then. If you leave something behind, do not worry. I will have already noticed.',
      'I have kept things longer than most people keep anything at all. Old habit. Possibly not the healthiest one, but mine.'
    ]),
    pool('stage-acquaintance', 'friendshipStages', { stage: 'acquaintance' }, 40, [
      'You came back down. Most people hear about the shelf once and never think about it again.',
      'You asked why I keep them instead of selling them off, not just how many there are. Different question. Better one.',
      'I have started setting aside anything unusual for you to see specifically. Small thing, from someone who mostly keeps things to himself.',
      'You said thank you properly instead of just looking at the shelf and moving on. Rare, that.',
      'Nils mentioned you asked about him too. I will pretend that does not amuse me. It does.',
      'You did not laugh at how much I have kept down here. Most people do, at least a little.',
      'Come by again. There will be something new tagged, or the same old things, dusted more carefully.',
      'I remember your name without needing the second reminder. Unusually good going, for me and how little I say to most people.',
      'You have not yet asked about the oldest thing on the shelf. I am choosing not to test that patience.'
    ]),
    pool('stage-recognition', 'friendshipStages', { stage: 'recognition' }, 40, [
      'You have started asking whose things these actually were, not just what they are. Good instinct, down here.',
      'I caught you reading the tags properly before you asked me about them. Fair. I would read them too.',
      'Nils asked, in his way, who the caver who actually asks good questions was. I told him your name properly, for once.',
      'You have not once suggested I clear the shelf out. I notice the restraint, and I appreciate it.',
      'I have started explaining what is on the shelf in more than the usual one sentence, for you specifically.',
      'You come back to this same spot by the sump pool now. I have noticed. I have decided to enjoy it.',
      'You ask what actually happens to the things nobody claims, not just how many there are. Correct order.',
      'I trust your read on whether something matters to someone nearly as much as my own, at this point.',
      'You ask what I actually do with all of this, beyond keeping it. Uncomfortably good question.'
    ]),
    pool('stage-comfortable', 'friendshipStages', { stage: 'comfortable' }, 40, [
      'I told you about the geode. Most people just get the joke about the shelf being crowded.',
      'You asked why I never just let the old things go, and I actually answered instead of deflecting for once.',
      'Nils lets you stand near the entrance with me now without comment. That almost never happens for anyone I bring along.',
      'I have stopped performing "endlessly patient Sump" quite so hard around you specifically.',
      'You sat through an entire slow afternoon of tagging without once suggesting I hurry it along.',
      'I trust your judgment on whether something is worth keeping nearly as much as my own gut.',
      'There is a spot by the shelf that is basically yours now, if you ever want to just sit there a while.',
      'Nils would call this "unusually generous access to my actual thoughts," and for once he would not be wrong.',
      'You ask what is actually going on with me before you ask what is new on the shelf today. I have noticed, and I like it.'
    ]),
    pool('stage-beginning', 'friendshipStages', { stage: 'beginning' }, 40, [
      'I told you about the collapse properly, for once, and you did not make it bigger than it was.',
      'You said keeping the geode was still a kind of waiting, and I have not entirely stopped thinking about that since.',
      'The shelf has your visit attached to it now, somehow, in my own head if nowhere else.',
      'I have started actually picturing what it would feel like to finally return it.',
      'You do not flinch when I admit the keeping is not really about the objects. Most people just say "give it back, then," which helps less than they think.',
      'Nils wants your opinion on something now too, apparently. That is not nothing, coming through him.',
      'I told you the plain version of why I never went. It is a smaller reason than the years make it look.',
      'You are welcome to argue with any excuse I make about the shelf. I would rather be caught out than believed by mistake.',
      'There is a list in my head now of reasons I told myself for waiting that turned out not to be reasons at all.'
    ]),
    pool('stage-friend', 'friendshipStages', { stage: 'friend' }, 40, [
      'You know which patience is real and which one is just waiting dressed up nicer. I have stopped hiding the difference from you.',
      'I let you see how nervous I actually am about finally returning something. Most people never get shown that at all.',
      'You bring up the geode before I can deflect the subject again. I have started letting you win that race.',
      'I trust your judgment on whether I am actually being careful or just stalling nearly as much as Nils\'s, and I do not say that lightly.',
      'The shelf has stopped feeling like the whole point of me being down here. I choose to believe that means something.',
      'I have stopped performing patience I do not have, around you specifically. It is a relief, oddly.',
      'You are the reason I finally said out loud what I am actually afraid of, instead of just calling it "not the right time yet." Consider this the thanks I am bad at giving directly.',
      'We should walk the whole shelf together sometime, properly, story by story. Not to clear it out. Just to remember it.',
      'Nils calls you "the caver who actually gets him talking." Coming from him, that is the whole compliment.'
    ]),
    pool('stage-trusted', 'friendshipStages', { stage: 'trusted' }, 40, [
      'I told you I was scared that returning the geode would cost me a reason to be careful about anything, before I had worked out whether that fear was fair. You did not rush me to an answer.',
      'You get the honest account of how long I actually knew whose it was, not the tidy version I give most people.',
      'I do not need you to confirm returning it is right anymore before I trust that myself. That took a while to build.',
      'You know the two things that actually make me admit I am stalling out of fear, without me listing them again.',
      'I told you about the morning I almost took it back and did not. The uncomfortable parts included.',
      'We disagree about whether keeping it this long was ever really about him at all. I have started thinking you might have a point either way.',
      'I trust you with an unfinished decision now, which is further than I extend most people who only hear the finished ones.',
      'You are one of maybe two people who have seen me genuinely uncertain about something down here.',
      'I trust you with a decision before I know how it turns out. That is further than I extend most people who only hear how it ended.'
    ]),
    pool('stage-close', 'friendshipStages', { stage: 'close' }, 40, [
      'The shelf has one fewer very old thing on it now, and you were there for that, which felt correct rather than incidental.',
      'You ask what I actually want before you ask what is easiest. I have started expecting that, and preferring it.',
      'I do not perform the endlessly-patient bit for you at all anymore. You have seen me actually scared, plainly, and never once made it smaller than it was.',
      'There is no version of a hard decision out here that I do not want to tell you about, plain or otherwise.',
      'I still keep more than most cavers bother to. I have simply stopped mistaking that for the only kind of caring there is.',
      'You are allowed to call out when I am stalling out of fear now, not just afterward. I have extended that to exactly one other person, and he does it constantly.',
      'Ask me the plain version of anything I am avoiding returning. I would rather you heard it true than heard it comfortable.',
      'Same shelf tomorrow, probably a slightly lighter version of me after that, and somehow you make either version feel worth visiting for.',
      'Years of treating the keeping like the whole answer, and you are the reason I finally understand it was always partly about letting go.'
    ]),
    pool('post-what-nobody-comes-back-for', 'postEvent', { completedEventIds: ['leak-folk-unclaimed-event-what-nobody-comes-back-for'], recentEventIds: ['leak-folk-unclaimed-event-what-nobody-comes-back-for'] }, 90, [
      'I moved the geode again today, out of old habit, before remembering I do not need to hide it on the shelf anymore.',
      'You still ask what is actually on the shelf before you ask how many things are on it. Fair, given what actually mattered that week.',
      'I have not gone back to just calling it "the old geode" since. Small habit. Sticking, so far.',
      'Nils asked if I had actually meant it about finding people instead of waiting. I told him yes, which is apparently rare enough that he checked twice.',
      'I caught myself about to just tag something new and move on last week. I asked around about it instead, on purpose.',
      'The shelf has not gotten any less crowded overall. I have decided that is fine either way, for now.',
      'You were there for the plain version of that conversation. I still think about that more than I let on.',
      'A newer caver asked why I keep so much. I gave them the honest answer this time, not just the joke.',
      'I have not needed a whole speech to explain the shelf since. Turns out naming it plainly works better.',
      'The joke about the crowded shelf still gets a laugh. It just is not the only thing I say about it anymore.'
    ], { acknowledgesEventId: 'leak-folk-unclaimed-event-what-nobody-comes-back-for' }),
    pool('post-walking-it-back', 'postEvent', { completedEventIds: ['leak-folk-unclaimed-event-walking-it-back'], recentEventIds: ['leak-folk-unclaimed-event-walking-it-back'] }, 91, [
      'The geode found its way home properly, by the way, in case Nils has not already told everyone in the cavern.',
      'You still ask how it felt before you ask if anything went wrong down there. Fair, given what actually mattered that day.',
      'I ask around about the older tags now, sometimes. Most days. I am working on the rest.',
      'I do not need every found thing to sit here for years anymore. Turns out I get to actually return some of it.',
      'You watched me actually carry it back, the first time. I have not forgotten who was there for that.',
      'Geode still thanks me more than the years of keeping it really deserve. I am, reluctantly, letting him have this one.',
      'A newer caver asked if I ever go looking for owners now. I got to say sometimes, properly, for once.',
      'The old shelf is still crowded. It has one very old space in it now, though, and I am leaving it empty on purpose.',
      'I have started telling people the story behind a tag before just filing it away. Turns out that lands better.'
    ], { acknowledgesEventId: 'leak-folk-unclaimed-event-walking-it-back' }),
    pool('location-cavern', 'location', { location: 'cavern' }, 60, [
      'This shelf is mine, mostly by habit, and because somebody has to remember whose things these were.',
      'Nils checks everyone\'s bearings at the entrance, same as always, before anyone gets far enough to lose anything to me.',
      'Geode works the claim near the old seam. We nod. Neither of us brings up that particular stretch unprompted.',
      'Vex reads the cavern for things that are not entirely there. I only deal in the things that very much are.',
      'Echo calls into the dark and listens for what answers. I prefer objects. They do not need to be asked twice.',
      'Wick lights the lower passages and hands out the odd spare item. Reliable sort. I have tagged a few of his old lamps, actually.',
      'This whole cavern runs on the same handful of regulars finding their spot every single day. I am, unmistakably, one of them.',
      'Ask anyone here how much I have kept down here and you will get a slightly different, slightly generous number every time.',
      'There is exactly one very old item I no longer keep on that shelf. Ask me about it if you want the real story.'
    ]),
    pool('location-town', 'location', { location: 'town' }, 55, [
      'I leave the cavern rarely, and usually only to actually go looking for someone, which is newer than it sounds.',
      'Half of town assumes I am always down there cataloguing something. Mostly correct, admittedly.',
      'The cavern does not miss me for an afternoon. It used to feel like it would. I have decided that is progress.',
      'People expect a caver to travel light. I specialize in the opposite, on principle rather than necessity.',
      'If I am not at the cavern, ask Nils. He will know, generally, before I do.',
      'The general store keeps a small box for me now, for anything found in town that might belong underground. New arrangement. I am still getting used to it.'
    ]),
    pool('mood-tense', 'recentMoodRumor', { mood: 'tense' }, 75, [
      'Bad day by the shelf. Nothing was actually wrong and I still re-tagged half of it anyway.',
      'I almost talked myself out of asking around about an old tag again today. Did not. Barely.',
      'Give me a minute before you ask how it is going. The honest answer needs more thought than I currently have for it.',
      'Nils asked about the old geode again today and I deflected harder than usual. That is more about me than him.',
      'Something about today did not sit right, and I have not worked out why. Give it time.',
      'I need quiet, not encouragement, for a while today. Stay if you like. Do not fill the silence on my behalf.',
      'A newer caver asked why I never just return anything, bluntly, today, and I had no good answer ready. That one stung more than it should have.'
    ]),
    pool('mood-content', 'recentMoodRumor', { mood: 'content' }, 55, [
      'Good day. I actually returned something small to its owner and they remembered exactly where they had lost it.',
      'Nils actually laughed today, briefly, at something I said. Rare enough to mention on its own.',
      'Nobody needed the heavy version of anything from me today. The plain version was enough, and it was good.',
      'I asked around about an old tag today without even noticing I had decided to. Progress, apparently.',
      'A caver came back for something after years and thanked me for keeping it safe. Small thing. Made my whole week.',
      'A genuinely good day here, by my standard, which admittedly has a quiet bar most days.',
      'Geode told me the geode saved him more than the years of guilt ever cost him. Coming from him, that is a full parade.'
    ]),
    pool('item-seaglass', 'itemPokemon', { itemIds: ['seaGlass'] }, 72, [
      'Something the tide left behind, tumbled smooth by however long it sat there. I understand this object better than most.',
      'Nils will ask if I am going to tag it, and the honest answer is probably yes, out of pure habit.',
      'I collect a few of these, quietly, from people who bring me things the cavern did not actually make. This one counts anyway.',
      'This might be the first thing anyone has given me here that was already someone else\'s letting-go, before it was mine to keep.',
      'Fair warning: I will absolutely tell people this came from someone who understood exactly what I do down here.',
      'A good keepsake and a good week pair well. Thank you, genuinely.',
      'I am difficult to buy for, apparently, since half my shelf is things I never meant to buy at all. This one I mean to keep.',
      'This is going somewhere I will actually notice it daily, not buried under older tags. Small change, on purpose.'
    ]),
    pool('pokemon-zubat-cavern', 'itemPokemon', { pokemonSeen: [41] }, 70, [
      'One of these knows this cavern better than most regulars do. Never once loses its way, as far as I can tell.',
      'Nils insists it has better bearings than half the cavers who come through. I have watched it. He is not wrong.',
      'It has never once left anything behind for me to keep. I find that almost disappointing, given my line of work.',
      'It showed up the same season I started this shelf. I have decided that means something, sentimentally.',
      'Geode says it startles easily near the claim, which from him counts as a real observation.',
      'It is, against all expectation, good company by the sump pool. Steady, in its own particular way.'
    ]),
    pool('repeat-talk', 'repeatInteraction', { repeatAtLeast: { talks: 8 } }, 45, [
      'Same shelf, same question on your face. No, nothing new has turned up since this morning.',
      'You know the routine by now. Same tagging, same story about the shelf, same offer to show you the oldest items.',
      'Come on in. Mind the damp patch near the sump pool; Nils has been meaning to flag it to someone for weeks.',
      'Shelf talk, a story about a tag, or just standing here while I finish cataloguing one more thing. All three remain on offer.',
      'Nothing dramatic happened since we last spoke. I noticed the small things anyway, because you would ask.',
      'You keep turning up at this shelf. I have stopped being surprised and started simply expecting it.',
      'Same question, same honest answer: ask Nils if you want the safe way in; ask me if you want to know what has turned up.',
      'Come on down. Nils is at the entrance, being considerably more talkative than usual lately.',
      'The stories get a little longer every time you ask. I have noticed. I am choosing to allow it.',
      'You have a standing welcome at this shelf now. I do not extend those to just anyone who walks through.',
      'Same shelf, same crowded rows, same general refusal to clear anything out quickly. I would not trade it for a tidier conscience.'
    ]),
    pool('rare-full-circle', 'rare', { location: 'cavern', completedEventIds: ['leak-folk-unclaimed-event-walking-it-back'], minStage: 'trusted' }, 108, [
      'Nils sent a newer caver my way on purpose, for the shelf specifically. That is new, coming from him.',
      'I have returned two things now without needing a whole speech about it beforehand. I am choosing to be alarmed about that later.',
      'The geode, the empty space it left behind, and a caver who came back after years to find their old gear waiting: apparently this is what actually letting go looks like, close up.',
      'Sit a while, if keepers sit. The shelf can wait, the oldest weight already came off once, and today, for once, so did I.'
    ])
  ];

  window.CORE_CAST_DIALOGUE = window.CORE_CAST_DIALOGUE || {};
  window.CORE_CAST_DIALOGUE.leak = D;
})();
