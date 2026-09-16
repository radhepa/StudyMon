/* Phase 5 Slice 6: first Tier 2 relationship/location batch of the "ridge"
   cluster - Burl (the "burl" cast entry), one of the two Stack Ridge hikers.
   Every string is a complete contextual response; categories count
   responses rather than fragments, same convention as sci-oak-phase5.js,
   oz-phase5.js/sal-phase5.js, barista-phase5.js/dax-phase5.js and
   ace1-phase5.js/ace2-phase5.js (the Tier 2 templates from Slices 2-5).
   Burl is Tier 2, so he gets no CAST_BIBLES entry - his voice and arc live
   entirely in this file and in his dedicated FOLK_EVENTS['ballast'] arc (see
   folk-events.js). He was carved out of the shared 'Hiker' cls alongside
   Crag (see crag-phase5.js) in the same batch, so this content does not
   leak onto the other climber-archetype townsfolk who still share the
   plain Hiker/Miner/Ranger/Mountain Guide/Caver/Cave Guide classes (Flint,
   Moss, Roan, Geode, Nils, Sump, and the Calculus-region Dov/Orin/
   Ruben/Tovah). Burl and Crag's arcs complete each other by ordinary
   narrative reference only - see each character's Event 2 - not the
   relationshipIds gate; see oz-phase5.js's header comment and the Phase 5
   handoff's "Known risks" for why. */
(function () {
  function pool(id, category, when, priority, lines, extra) {
    var value = { id: 'burl-dialogue-' + id, category: category, when: when || {}, priority: priority || 0, lines: lines };
    if (extra) Object.keys(extra).forEach(function (key) { value[key] = extra[key]; });
    return value;
  }

  var D = [
    pool('first-meeting', 'firstMeeting', { firstMeeting: true }, 120, [
      'Careful on that last stretch. Here, take a spare bootlace, just in case yours goes.',
      'Burl. I hike this ridge most days, usually carrying about twice what I need.',
      'Ask Crag about the fastest way up. Ask me about what to do if the fastest way goes wrong.',
      'I have never once regretted bringing too much. I have regretted the other direction plenty.',
      'Welcome to the ridge. Mind the loose scree past the second switchback, and take some water if you are short.',
      'Crag will tell you one step is all you need. I will tell you a spare rope has never once been wasted weight.',
      'Three trips up this ridge and you will have met most of the regulars. I am usually the one handing out spare gear.',
      'This pack has everything from bandages to a second kettle. Ask me why sometime. I will tell you, eventually.',
      'Go on, then, up the trail. Shout if anything at all goes wrong. I am generally close enough to hear it.',
      'I carry enough for two people on a trail meant for one. Old habit. Possibly not the healthiest one, but mine.'
    ]),
    pool('stage-acquaintance', 'friendshipStages', { stage: 'acquaintance' }, 40, [
      'You came back up. Most people take the spare bootlace and never need me again.',
      'You asked what else is in the pack, not just why it is so heavy. Different question. Better one.',
      'I have started setting aside the lighter items for you specifically. Small thing, from someone who packs for everyone.',
      'You said thank you properly instead of just taking the water and moving on. Rare, that.',
      'Crag mentioned you asked about him too. I will pretend that does not amuse me. It does.',
      'You did not laugh at how much I was carrying. Most people do, at least a little.',
      'Come by again. I will have something new stuffed in this pack, or the same things, packed more carefully.',
      'I remember your name without needing the second reminder. Unusually good going, for me and this many hikers.',
      'You have not yet asked if all of this is really necessary. I am choosing not to test that patience.'
    ]),
    pool('stage-recognition', 'friendshipStages', { stage: 'recognition' }, 40, [
      'You have started packing your own bag a little heavier, I have noticed. Good instinct, up here.',
      'I caught you checking the weather before you asked me to. Fair. I would check twice too.',
      'Crag asked, in his way, who the hiker who actually asks good questions was. I told him your name properly, for once.',
      'You have not once asked me to carry less. I notice the restraint, and I appreciate it.',
      'I have started explaining what is in the pack in more than the usual one sentence, for you specifically.',
      'You come back to this same spot near the gear shed now. I have noticed. I have decided to enjoy it.',
      'You ask what actually helps on a bad day up here, not just what looks prepared. Correct order.',
      'I trust your read on whether the weather is turning nearly as much as my own, at this point.',
      'You ask what I actually do with all of this, beyond carrying it. Uncomfortably good question.'
    ]),
    pool('stage-comfortable', 'friendshipStages', { stage: 'comfortable' }, 40, [
      'I told you about the splint. Most people just get the joke about the weight.',
      'You asked why I never travel lighter, and I actually answered instead of deflecting for once.',
      'Crag lets you walk near the front of the line now without comment. That almost never happens for anyone I bring along.',
      'I have stopped performing "endlessly prepared Burl" quite so hard around you specifically.',
      'You sat through an entire slow afternoon of repacking without once suggesting I hurry it along.',
      'I trust your judgment on whether the ridge is safe today nearly as much as my own gut.',
      'There is a spot by the gear shed that is basically yours now, if you ever want to just wait there a while.',
      'Crag would call this "unusually generous access to my actual thoughts," and for once he would not be wrong.',
      'You ask what is actually going on with me before you ask what is in the pack today. I have noticed, and I like it.'
    ]),
    pool('stage-beginning', 'friendshipStages', { stage: 'beginning' }, 40, [
      'I told you about the hiker and the splint properly, for once, and you did not make it bigger than it was.',
      'You said carrying everything was still a kind of worrying, and I have not entirely stopped thinking about that since.',
      'The trailhead has your visit attached to it now, somehow, in my own head if nowhere else.',
      'I have started actually picturing what it would feel like to leave something behind on purpose.',
      'You do not flinch when I admit the weight is not really about the weight. Most people just say "pack lighter," which helps less than they think.',
      'Crag wants your opinion on something now too, apparently. That is not nothing, coming through him.',
      'I told you the plain version of what actually keeps me overpacking. It is a smaller reason than the pack makes it look.',
      'You are welcome to argue with any joke I make about the kettle. I would rather be caught out than believed by mistake.',
      'There is a list in my head now of things I have packed for that never once happened. It is longer than I expected.'
    ]),
    pool('stage-friend', 'friendshipStages', { stage: 'friend' }, 40, [
      'You know which cheerfulness is real and which one is just the job of looking prepared. I have stopped hiding the difference from you.',
      'I let you see how nervous I actually am about letting someone else carry the water. Most people never get shown that at all.',
      'You bring up the spare rope before I can deflect the subject again. I have started letting you win that race.',
      'I trust your judgment on whether I am actually being careful or just being heavy nearly as much as Crag\'s, and I do not say that lightly.',
      'The pack has stopped feeling like the whole point of me being up here. I choose to believe that means something.',
      'I have stopped performing readiness I do not have, around you specifically. It is a relief, oddly.',
      'You are the reason I finally said out loud what I am actually afraid of, instead of just calling it "being prepared." Consider this the thanks I am bad at giving directly.',
      'We should hike up without either of us carrying anything extra sometime. Just to see how that feels.',
      'Crag calls you "the hiker who actually gets him talking." Coming from him, that is the whole compliment.'
    ]),
    pool('stage-trusted', 'friendshipStages', { stage: 'trusted' }, 40, [
      'I told you I was scared that setting the pack down would cost me who I am up here, before I had worked out whether that fear was fair. You did not rush me to an answer.',
      'You get the honest account of how badly that old trip actually went, not the tidy version I give most people.',
      'I do not need you to confirm the weight is worth it anymore before I trust that myself. That took a while to build.',
      'You know the two things that actually make me admit I am overpacking out of fear, without me listing them again.',
      'I told you about the morning the ridge genuinely felt like too much to carry, in every sense. The uncomfortable parts included.',
      'We disagree about whether carrying everything was ever really keeping anyone safer. I have started thinking you might have a point either way.',
      'I trust you with an unfinished decision now, which is further than I extend most people who only hear the finished ones.',
      'You are one of maybe two people who have seen me genuinely uncertain about something up here.',
      'I trust you with a decision before I know how it turns out. That is further than I extend most people who only hear how it ended.'
    ]),
    pool('stage-close', 'friendshipStages', { stage: 'close' }, 40, [
      'The kettle has your name attached to it now, properly, and you were there for that, which felt correct rather than incidental.',
      'You ask what I actually want before you ask what is safest to carry. I have started expecting that, and preferring it.',
      'I do not perform the endlessly-prepared bit for you at all anymore. You have seen me actually scared, plainly, and never once made it smaller than it was.',
      'There is no version of a hard climb out here that I do not want to tell you about, plain or otherwise.',
      'I still carry more than most hikers bother to. I have simply stopped mistaking that for the only kind of readiness there is.',
      'You are allowed to call out when I am overpacking out of fear now, not just afterward. I have extended that to exactly one other person, and he does it constantly.',
      'Ask me the plain version of anything I am avoiding setting down. I would rather you heard it true than heard it comfortable.',
      'Same ridge tomorrow, probably a slightly lighter pack after that, and somehow you make either version feel worth climbing for.',
      'Years of treating the weight like someone else\'s problem to worry about, and you are the reason I finally understand it was always partly mine to set down.'
    ]),
    pool('post-the-full-pack', 'postEvent', { completedEventIds: ['burl-folk-ballast-event-the-full-pack'], recentEventIds: ['burl-folk-ballast-event-the-full-pack'] }, 90, [
      'I said the real reason for the pack out loud again today, easily this time, no bracing beforehand.',
      'You still ask what is actually in the bag before you ask how heavy it is. Fair, given what actually mattered that week.',
      'I have not gone back to just calling it "being prepared" since. Small habit. Sticking, so far.',
      'Crag asked if I had actually meant it about lending, not leaving. I told him yes, which is apparently rare enough that he checked twice.',
      'I caught myself about to overpack for a short walk last week. I left half of it behind instead, on purpose.',
      'The pack has not gotten any lighter overall. I have decided that is fine either way, for now.',
      'You were there for the plain version of that conversation. I still think about that more than I let on.',
      'A newer hiker asked me why I carry so much. I gave them the honest answer this time, not just the joke.',
      'I have not needed a whole speech to explain the weight since. Turns out naming it plainly works better.',
      'The joke about the kettle still gets a laugh. It just is not the only thing I say about it anymore.'
    ], { acknowledgesEventId: 'burl-folk-ballast-event-the-full-pack' }),
    pool('post-setting-the-kettle-down', 'postEvent', { completedEventIds: ['burl-folk-ballast-event-setting-the-kettle-down'], recentEventIds: ['burl-folk-ballast-event-setting-the-kettle-down'] }, 91, [
      'Someone else poured for the group again today, by the way, in case Crag has not already mentioned it to everyone on the ridge.',
      'You still ask how it felt before you ask if anything went wrong. Fair, given what actually mattered that day.',
      'I hand off the water now and mostly do not hover. Most days. I am working on the rest.',
      'I do not need every climb to end with me carrying the heaviest thing anymore. Turns out I get to set some of it down.',
      'You watched me actually let go of the kettle, the first time. I have not forgotten who was there for that.',
      'Crag still gives that same short nod sometimes. I am still oddly proud of it every single time.',
      'A newer hiker asked if I ever let anyone else carry the water now. I got to say yes, properly, for once.',
      'The old joke about the kettle is retired. I have a new one about actually setting it down.',
      'I have started telling people the truth about being scared to let go first, before the encouraging part. Turns out that lands better.'
    ], { acknowledgesEventId: 'burl-folk-ballast-event-setting-the-kettle-down' }),
    pool('location-ridge', 'location', { location: 'ridge' }, 60, [
      'This trailhead is mine, mostly by habit, and because somebody has to have the spare gear ready.',
      'Crag keeps to the switchbacks, same pace, every single day, for longer than I have been overpacking here.',
      'Flint works the seams further along. We nod. Neither of us interrupts the other\'s routine.',
      'Roan tells the same story about June to every newcomer. I let him; it is a good story, told well.',
      'Moss hands out trail permits near the ranger post. Sensible sort. Carries almost nothing, unlike me.',
      'Tor has walked this ridge forty years and still calls it a chain of one thing leading to the next.',
      'Ida only battles hikers with enough badges to be interesting. I stay well clear of that particular argument.',
      'This whole ridge runs on the same rotation of regulars finding their spot every single day. I am, unmistakably, one of them.',
      'Ask anyone here how much I am carrying and you will get a slightly different, slightly generous number every time.'
    ]),
    pool('location-town', 'location', { location: 'town' }, 55, [
      'I leave the ridge rarely, and usually only to restock whatever the pack has run low on.',
      'Half of town assumes I am always carrying something heavy. Mostly correct, admittedly.',
      'The ridge does not miss me for an afternoon. It used to feel like it would. I have decided that is progress.',
      'People expect a hiker to travel light. I specialize in the opposite, on purpose.',
      'If I am not on the ridge, ask Crag. He will know, generally, before I do.',
      'The general store keeps a running tally of how many spare bootlaces I have bought this season. I choose not to ask the number.'
    ]),
    pool('mood-tense', 'recentMoodRumor', { mood: 'tense' }, 75, [
      'Bad day at the trailhead. Nothing was actually wrong and I still repacked the bag three times anyway.',
      'I almost talked myself into carrying even more today. Did not. Barely.',
      'Give me a minute before you ask how it is going. The honest answer needs more thought than I currently have for it.',
      'Crag asked about the weight again today and I deflected harder than usual. That is more about me than him.',
      'Something about today did not sit right, and I have not worked out why. Give it time.',
      'I need quiet, not encouragement, for a while today. Stay if you like. Do not fill the silence on my behalf.',
      'A newer hiker asked why I carry so much, bluntly, today, and I had no good answer ready. That one stung more than it should have.'
    ]),
    pool('mood-content', 'recentMoodRumor', { mood: 'content' }, 55, [
      'Good day. I handed out three spare items and every single one of them actually got used well.',
      'Crag actually laughed today, briefly, at something I said. Rare enough to mention on its own.',
      'Nobody needed the heavy version of anything from me today. The light version was enough, and it was good.',
      'I set the kettle down for someone else today without even noticing I had done it. Progress, apparently.',
      'A nervous hiker made it to the top and thanked me for the spare water. Small thing. Made my whole week.',
      'A genuinely good day here, by my standard, which admittedly has a heavy bar most days.',
      'Crag told me a piece of gear of mine actually saved someone a bad afternoon. Coming from him, that is a full parade.'
    ]),
    pool('item-pressedflower', 'itemPokemon', { itemIds: ['pressedFlower'] }, 72, [
      'A proper keepsake. I will actually keep this one somewhere light, for once, instead of buried in the pack.',
      'Crag will pretend this means nothing and then ask where you found it by next week. Watch.',
      'I collect a few of these, quietly, from people who make it to the top eventually. This one counts.',
      'This might be the first thing anyone has given me here that weighs almost nothing and I still want to keep.',
      'Fair warning: I will absolutely tell people this came from someone who actually finished the climb properly.',
      'A good keepsake and a good week pair well. Thank you, genuinely.',
      'I am difficult to buy for, apparently, since half my pack is things I bought for other people. This one I mean to keep.',
      'This is going somewhere I will actually see it every day, not buried under bandages. Small change, on purpose.'
    ]),
    pool('pokemon-geodude-ridge', 'itemPokemon', { pokemonSeen: [74] }, 70, [
      'One of these trains up here most mornings, same as the rest of us. Tucks against the rock the moment it is startled.',
      'Crag insists it barely moves at all, which from him is a compliment about pacing.',
      'It has never once needed anything from my pack. I find that oddly reassuring, given how much I carry.',
      'It showed up the same week I started overpacking for this ridge. I have decided that means something, sentimentally.',
      'Flint says it minds the seams better than most people who come through. I have watched it. He is not wrong.',
      'It is, against all expectation, good company on a slow climb. Steady, same as the rock it sits on.'
    ]),
    pool('repeat-talk', 'repeatInteraction', { repeatAtLeast: { talks: 8 } }, 45, [
      'Same trailhead, same question on your face. Yes, I have still got a spare bootlace, before you ask.',
      'You know the routine by now. Same repacking, same joke about the kettle, same offer of water.',
      'Come on up. Mind the loose scree near the second switchback; I keep meaning to flag it to someone who can fix it.',
      'Gear talk, an excuse for why the pack is this heavy, or just standing here while I check the straps one more time. All three remain on offer.',
      'Nothing dramatic happened since we last spoke. I noticed the small things anyway, because you would ask.',
      'You keep turning up at this trailhead. I have stopped being surprised and started simply expecting it.',
      'Same question, same honest answer: ask Crag if you want the fast way up; ask me if you want the safe way regardless of pace.',
      'Come on down. Crag is at the switchback, being considerably more talkative than usual lately.',
      'The pack gets a little lighter every time you ask about it. I have noticed. I am choosing to take that as progress.',
      'You have a standing welcome at this trailhead now. I do not extend those to just anyone who walks through.',
      'Same trailhead, same overloaded pack, same general refusal to leave anything behind quickly. I would not trade it for a lighter conscience.'
    ]),
    pool('rare-full-circle', 'rare', { location: 'ridge', completedEventIds: ['burl-folk-ballast-event-setting-the-kettle-down'], minStage: 'trusted' }, 108, [
      'Crag sent a newer hiker my way on purpose, for the spare gear specifically. That is new, coming from him.',
      'I have set the kettle down twice now without needing a whole speech about it beforehand. I am choosing to be alarmed about that later.',
      'The pouch, Crag\'s nod, and a newer hiker who made it to the top with borrowed water: apparently this is what actually trusting people looks like, close up.',
      'Sit a while, if hikers sit. The pack can wait, the weight already came off once, and today, for once, so did I.'
    ])
  ];

  window.CORE_CAST_DIALOGUE = window.CORE_CAST_DIALOGUE || {};
  window.CORE_CAST_DIALOGUE.burl = D;
})();
