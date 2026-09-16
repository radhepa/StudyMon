/* Phase 5 Slice 7: first of the three-character Tier 2 batch at the
   "cavern" cluster - Nils (the "null" cast entry), the cave guide. Every
   string is a complete contextual response; categories count responses
   rather than fragments, same convention as sci-oak-phase5.js,
   oz-phase5.js/sal-phase5.js, barista-phase5.js/dax-phase5.js,
   ace1-phase5.js/ace2-phase5.js and burl-phase5.js/crag-phase5.js (the
   Tier 2 templates from Slices 2-6). Nils is Tier 2, so he gets no
   CAST_BIBLES entry - his voice and arc live entirely in this file and in
   his dedicated FOLK_EVENTS['bearings'] arc (see folk-events.js). He was
   carved out of the shared 'Cave Guide' cls in a three-character batch
   alongside Sump (see leak-phase5.js) and Geode (see geo-phase5.js), so
   this content does not leak onto the other climber-archetype townsfolk
   who still share the plain Hiker/Miner/Ranger/Mountain Guide/Caver
   classes (Flint, Moss, Roan, and the Calculus-region Dov/Orin/Ruben/
   Tovah - 'Cave Guide' had no other user to begin with). Nils, Sump and
   Geode's arcs are woven around one shared past incident - the day a seam
   Geode overreached collapsed, sealing a tunnel, and leaving behind a
   split geode Sump later found and kept - and complete each other by
   ordinary narrative reference only, not the relationshipIds gate; see
   oz-phase5.js's header comment and the Phase 5 handoff's "Known risks"
   for why. */
(function () {
  function pool(id, category, when, priority, lines, extra) {
    var value = { id: 'null-dialogue-' + id, category: category, when: when || {}, priority: priority || 0, lines: lines };
    if (extra) Object.keys(extra).forEach(function (key) { value[key] = extra[key]; });
    return value;
  }

  var D = [
    pool('first-meeting', 'firstMeeting', { firstMeeting: true }, 120, [
      'Before you go any further: point to the way back out. Rule one. No exceptions.',
      'Nils. I guide what I know down here, and only what I know.',
      'Ask Sump about what people leave behind. Ask Geode about limits. Ask me about knowing exactly where you are standing.',
      'This cavern rewards caution and punishes confidence in roughly equal measure. Plan accordingly.',
      'Welcome to the cavern. Know your way back out before you go one step further in.',
      'Geode will tell you about limits the expensive way. I would rather you learn it the cheap way, from me, first.',
      'Three trips down here and you will know the safe half of this cavern by feel. That is deliberate.',
      'There is a whole section of this cavern I do not guide. Ask me why sometime. I will tell you, eventually.',
      'Go on, then, in. Mind your bearings, and shout if anything at all changes underfoot.',
      'I have guided this cavern long enough to know exactly which parts of it I trust, and which parts I do not.'
    ]),
    pool('stage-acquaintance', 'friendshipStages', { stage: 'acquaintance' }, 40, [
      'You came back down. Most people hear rule one once and never need me again.',
      'You asked why the rule matters, not just what it is. Different question. Better one.',
      'I have started expecting your bearings check without needing to ask for it. Small thing, from someone who asks everyone.',
      'You pointed to the way out without being told twice. Rare, that, this early.',
      'Sump mentioned you asked about him too. I will pretend that does not interest me. It interests me.',
      'You did not rush past the entrance just to prove something. Correct instinct, down here.',
      'Come back if you want the rule applied properly, not just recited at you. I do not extend that to everyone.',
      'I remember your bearings from last time without needing the reminder. Unusually good going, for me.',
      'You have not yet asked what is past the section I do not guide. I am beginning to trust that you understand why I would not answer yet.'
    ]),
    pool('stage-recognition', 'friendshipStages', { stage: 'recognition' }, 40, [
      'You have started checking your own bearings before I ask. That is further along than most reach in a month.',
      'I caught you noting the way back before I reminded you to. Correct order, finally.',
      'Sump asked, in his way, who the caver who actually listens was. I told him your name properly, for once.',
      'You have not once suggested I skip the rule for someone experienced. I appreciate the restraint.',
      'I have started explaining the reasoning behind a rule, not just the rule itself, for you specifically.',
      'You return to the same spot near the entrance now. I have noticed. I have decided to allow it.',
      'You ask what actually matters underground, not just what looks careful. Correct order of questions.',
      'I trust your read on whether a passage is sound nearly as much as my own, at this point.',
      'You ask what I am actually protecting people from. Uncomfortably accurate question.'
    ]),
    pool('stage-comfortable', 'friendshipStages', { stage: 'comfortable' }, 40, [
      'I told you there was a sealed section. Most people just get the rule and never ask further.',
      'You asked why I never open it back up, and I gave you the honest answer instead of the short one.',
      'Sump lets you near the shelf now without comment. That almost never happens for anyone I bring by.',
      'I have stopped performing "endlessly careful Nils" quite so hard around you specifically.',
      'You sat through an entire slow explanation of a rule without once suggesting I speed it up. Good instinct.',
      'I trust your judgment on whether ground is actually sound nearly as much as my own read.',
      'There is a spot near the entrance that is basically yours now, if you want it.',
      'Sump would call this "unusually generous access to my actual reasoning," and for once he would not be wrong.',
      'You ask what is actually going on with me before you ask about the next passage. I have noticed, and I permit it.'
    ]),
    pool('stage-beginning', 'friendshipStages', { stage: 'beginning' }, 40, [
      'I told you about the day everything changed down here, properly, for once, and you did not make it bigger than it was.',
      'You said sealing the tunnel sounded like grief as much as caution, and I have not entirely stopped thinking about that since.',
      'The entrance has your bearings attached to it now, somehow, in my own head if nowhere else.',
      'I have started actually considering what it would take to walk that tunnel again.',
      'You do not flinch when I admit the rule costs me something too. Most people just say "so go back in," which helps less than they think.',
      'Sump wants your opinion on something now too, apparently. That is not nothing, coming through him.',
      'I told you the plain version of what actually happened that day. It is a heavier story than the rule makes it sound.',
      'You are welcome to question any rule I set. I would rather be challenged properly than followed blindly.',
      'There is a version of that tunnel in my head now that has new rules attached to it. I have not tried them yet. I am considering it.'
    ]),
    pool('stage-friend', 'friendshipStages', { stage: 'friend' }, 40, [
      'You know which caution is actually care and which one is just habit. I have stopped hiding the difference from you.',
      'I let you see how much that old collapse still costs me. Most people never get shown that at all.',
      'You bring up the sealed tunnel before I can deflect the subject again. I have started letting you win that race.',
      'I trust your judgment on whether ground is safe or just familiar nearly as much as Sump\'s, and I do not say that lightly.',
      'The entrance has stopped feeling like the whole edge of what I am willing to do down here. I choose to believe that means something.',
      'I have stopped performing certainty I do not have, around you specifically. It is a relief, oddly.',
      'You are the reason I finally said something true about that day instead of just reciting the rule it produced. Consider this the thanks I am bad at giving directly.',
      'We should walk the safe half of this cavern together sometime. Not to test anything. Just to walk it.',
      'Sump calls you "the caver who actually gets him to talk." Coming from him, that is the whole compliment.'
    ]),
    pool('stage-trusted', 'friendshipStages', { stage: 'trusted' }, 40, [
      'I told you I was scared that opening the tunnel again would cost me the one rule that has always worked, before I had worked out whether that fear was fair. You did not rush me to an answer.',
      'You get the honest account of how badly that old collapse actually went, not the tidy version I give most people.',
      'I do not need you to confirm a passage is safe anymore before I trust it myself. That took a while to build.',
      'You know the two things that actually make me admit the rule is not enough, without me listing them again.',
      'I told you about the morning I first sealed that tunnel, in full. The uncomfortable parts included.',
      'We disagree about whether that old collapse was really my fault alone. I have started thinking you might have a point either way.',
      'I trust you with an unfinished decision now, which is further than I extend most people who only hear the finished ones.',
      'You are one of maybe two people who have seen me genuinely uncertain about something down here.',
      'I trust you with a decision before I know how it turns out. That is further than I extend most people who only hear how it ended.'
    ]),
    pool('stage-close', 'friendshipStages', { stage: 'close' }, 40, [
      'The sealed tunnel has new rules attached to it now, ones that did not exist the first time, and you were there when that started, which felt correct rather than incidental.',
      'You ask what I actually think before you ask what is safest. I have started expecting that, and preferring it.',
      'I do not perform the endlessly-careful bit for you at all anymore. You have seen me actually frozen at a tunnel mouth, plainly, and never once made it smaller than it was.',
      'There is no version of a hard passage out here that I do not want to explain to you properly, careful or otherwise.',
      'I still guide with more rules than most people bother to. I have simply stopped mistaking that for the whole method.',
      'You are allowed to call out when caution is actually fear now, not just afterward. I have extended that to exactly one other person, and he does it constantly.',
      'Ask me the plain version of anything I am protecting myself from. I would rather you heard it true than heard it careful.',
      'Same entrance tomorrow, probably a slightly less rigid me after that, and somehow you make either version feel worth guiding for.',
      'Years of treating one rule like the whole answer, and you are the reason I finally understand what it was always missing.'
    ]),
    pool('post-rule-one', 'postEvent', { completedEventIds: ['null-folk-bearings-event-rule-one'], recentEventIds: ['null-folk-bearings-event-rule-one'] }, 90, [
      'I said the real reason for the sealed tunnel out loud again today, easily this time, no bracing beforehand.',
      'You still ask what is actually down there before you ask if it is safe. Fair, given what actually mattered that week.',
      'I have not gone back to just calling it "the sealed section" since. Small habit. Sticking, so far.',
      'Sump asked if I had actually meant it about walking past my usual boundary. I told him yes, which is apparently rare enough that he checked twice.',
      'I caught myself sealing off a new worry entirely, out of habit, last week. I named it out loud instead, on purpose.',
      'The boundary has not moved overall. I have decided that is fine either way, for now.',
      'You were there for the plain version of that conversation. I still think about that more than I let on.',
      'A newer caver asked me why I do not guide the far section. I gave them the honest answer this time, not just the rule.',
      'I have not needed a whole speech to explain the boundary since. Turns out naming it plainly works better.',
      'Rule one still gets recited the same way. It is just not the only thing I say about caution anymore.'
    ], { acknowledgesEventId: 'null-folk-bearings-event-rule-one' }),
    pool('post-the-tunnel-he-closed-off', 'postEvent', { completedEventIds: ['null-folk-bearings-event-the-tunnel-he-closed-off'], recentEventIds: ['null-folk-bearings-event-the-tunnel-he-closed-off'] }, 91, [
      'The sealed drift stayed open again today, by the way, in case Sump has not already told everyone in the cavern.',
      'You still ask how it felt before you ask if anything went wrong down there. Fair, given what actually mattered that day.',
      'I guide that stretch with new rules now, carefully, same as I said I would.',
      'I do not need every unfamiliar passage to stay sealed forever anymore. Most days. I am working on the rest.',
      'You watched me actually walk back into that tunnel, the first time in years. I have not forgotten who was there for that.',
      'Geode still thanks me for it, more than the tunnel really deserves credit for. I am letting him have this one.',
      'A newer caver asked if I ever open sealed sections back up now. I got to say sometimes, properly, for once.',
      'The old rule about that stretch is retired. I have a new set of rules about actually walking it again.',
      'I have started telling people the reason behind a boundary before the boundary itself. Turns out that lands better.'
    ], { acknowledgesEventId: 'null-folk-bearings-event-the-tunnel-he-closed-off' }),
    pool('location-cavern', 'location', { location: 'cavern' }, 60, [
      'This entrance is mine, mostly by habit, and because somebody has to check everyone\'s bearings first.',
      'Sump keeps his shelf by the sump pool, cataloguing whatever the cavern gives up, same as he has for years.',
      'Geode works the claim near the old seam. We nod. Neither of us brings up that particular stretch unprompted.',
      'Vex reads the cavern for things that are not entirely there. I read it for things that very much are.',
      'Echo calls out into the dark and listens for what comes back. I prefer knowing what is there before I ask it anything.',
      'Wick lights the lower passages and hands out the odd spare item. Reliable sort. Carries a lamp, not much else.',
      'This whole cavern runs on the same handful of regulars finding their spot every single day. I am, unmistakably, one of them.',
      'Ask anyone here how careful I actually am and you will get a slightly different, slightly exasperated answer every time.',
      'There is exactly one stretch of this cavern I still do not guide casually. Ask me about it if you want the real story.'
    ]),
    pool('location-town', 'location', { location: 'town' }, 55, [
      'I leave the cavern rarely, and usually only to check that the way back is still exactly where I left it.',
      'Half of town assumes I am always underground. Mostly correct, admittedly.',
      'The cavern does not miss me for an afternoon. It used to feel like it would. I have decided that is progress.',
      'People expect a cave guide to be fearless. I specialize in the opposite, on purpose.',
      'If I am not at the cavern, ask Sump. He will know, generally, before I do.',
      'The general store has learned not to ask why I buy chalk in bulk. I mark my bearings with it, mostly.'
    ]),
    pool('mood-tense', 'recentMoodRumor', { mood: 'tense' }, 75, [
      'Bad day at the entrance. Nothing was actually wrong and I still checked the same bearings three times anyway.',
      'I almost sealed off a new section entirely today, out of pure habit. Did not. Barely.',
      'Give me a minute before you ask how it is going. The honest answer needs more thought than I currently have for it.',
      'Sump asked about the tunnel again today and I deflected harder than usual. That is more about me than him.',
      'Something about today did not sit right, and I have not worked out why. Give it time.',
      'I need quiet, not encouragement, for a while today. Stay if you like. Do not fill the silence on my behalf.',
      'A newer caver asked why I do not guide the far section, bluntly, today, and I had no good answer ready. That one stung more than it should have.'
    ]),
    pool('mood-content', 'recentMoodRumor', { mood: 'content' }, 55, [
      'Good day. I checked three newcomers\' bearings and every single one actually remembered the way back.',
      'Sump actually laughed today, briefly, at something I said. Rare enough to mention on its own.',
      'Nobody needed the heavy version of anything from me today. The plain version was enough, and it was good.',
      'I walked past my usual boundary today without even noticing I had done it. Progress, apparently.',
      'A nervous caver made it through the safe half and thanked me for the rule. Small thing. Made my whole week.',
      'A genuinely good day here, by my standard, which admittedly has a careful bar most days.',
      'Geode told me a rule of mine actually kept someone out of real trouble. Coming from him, that is a full parade.'
    ]),
    pool('item-hotsauce', 'itemPokemon', { itemIds: ['hotSauce'] }, 72, [
      'Volcano Hot Sauce. Given to the most cautious man in this cavern. I appreciate the irony.',
      'Sump will ask if I am actually going to use it, and the honest answer is probably not, but I am keeping it regardless.',
      'This is, without question, the single least careful thing anyone has ever handed me down here.',
      'I collect very few impractical things. This one is making an exception to that rule, somehow.',
      'Fair warning: I will absolutely tell people this came from someone with a very particular sense of humor.',
      'A dangerous little bottle and a good week pair oddly well. Thank you, genuinely.',
      'I am difficult to buy for, apparently, since I claim to want nothing risky. This one I am keeping anyway.',
      'This is going on a shelf I check regularly, mostly so it does not surprise me later. Old habit, applied to a new object.'
    ]),
    pool('pokemon-zubat-cavern', 'itemPokemon', { pokemonSeen: [41] }, 70, [
      'One of these knows this cavern better than I do, honestly. It never once needs its bearings checked.',
      'Sump insists it is drawn to the shelf specifically. I insist that is coincidence. We have not resolved this.',
      'It navigates the dark stretch without hesitation, every single time. I find that oddly reassuring.',
      'It showed up the same season I sealed the far tunnel. I have decided that means something, sentimentally.',
      'Geode says it startles easily near the claim, which from him counts as an observation, not a complaint.',
      'It is, against all expectation, good company for a careful walk. Knows exactly where it is, always.'
    ]),
    pool('repeat-talk', 'repeatInteraction', { repeatAtLeast: { talks: 8 } }, 45, [
      'Same entrance, same question on your face. Yes, I still check bearings, before you ask.',
      'You know the routine by now. Same rule, same reminder, same offer of the safe route.',
      'Come on in. Mind the low ceiling near the second bend; I keep meaning to flag it to someone who can fix it.',
      'Cavern talk, an explanation of a rule, or just standing here while I check the way back one more time. All three remain on offer.',
      'Nothing dramatic happened since we last spoke. I noticed the small things anyway, because you would ask.',
      'You keep turning up at this entrance. I have stopped being surprised and started simply expecting it.',
      'Same question, same honest answer: ask Sump if you want what the cavern has given up; ask me if you want to get there safely.',
      'Come on down. Sump is at the shelf, being considerably more talkative than usual lately.',
      'The explanation gets a little longer every time you ask. I have noticed. I am choosing to allow it.',
      'You have a standing welcome at this entrance now. I do not extend those to just anyone who walks through.',
      'Same entrance, same careful rule, same general refusal to skip it quickly. I would not trade it for a faster nerve.'
    ]),
    pool('rare-full-circle', 'rare', { location: 'cavern', completedEventIds: ['null-folk-bearings-event-the-tunnel-he-closed-off'], minStage: 'trusted' }, 108, [
      'Sump sent a newer caver my way on purpose, for the bearings check specifically. That is new, coming from him.',
      'I have walked the old sealed drift twice now without needing a whole speech about it beforehand. I am choosing to be alarmed about that later.',
      'The tunnel, the geode, and a newer caver who found their own way back unassisted: apparently this is what actually changing looks like, close up.',
      'Sit a while, if guides sit. The bearings can wait, the tunnel already opened once properly, and today, for once, so did I.'
    ])
  ];

  window.CORE_CAST_DIALOGUE = window.CORE_CAST_DIALOGUE || {};
  window.CORE_CAST_DIALOGUE.null = D;
})();
