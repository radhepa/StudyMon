/* Phase 5 Slice 7: third of the three-character Tier 2 batch at the
   "cavern" cluster - Geode (the "geo" cast entry), the miner. Every string
   is a complete contextual response; categories count responses rather
   than fragments, same convention as the five prior Tier 2 pairs (Slices
   2-6) - see null-phase5.js's header comment for the full list and the
   shared backstory this three-character batch is built around. Geode is
   Tier 2, so he gets no CAST_BIBLES entry - his voice and arc live entirely
   in this file and in his dedicated FOLK_EVENTS['overflow'] arc (see
   folk-events.js). He was carved out of the shared 'Miner' cls alongside
   Nils and Sump, so this content does not leak onto the other
   climber-archetype townsfolk who still share the plain Miner class
   (Flint at the ridge, and the Calculus region's Ruben). Geode's own arc
   turns on the old collapse he caused by pushing a seam too far and the
   split geode he had to leave behind - see his Event 1 and 2, and Nils's/
   Sump's own files for the other two angles on the same incident.
   Cross-referenced by ordinary narrative mention only, not the
   relationshipIds gate; see oz-phase5.js's header comment and the Phase 5
   handoff's "Known risks" for why. */
(function () {
  function pool(id, category, when, priority, lines, extra) {
    var value = { id: 'geo-dialogue-' + id, category: category, when: when || {}, priority: priority || 0, lines: lines };
    if (extra) Object.keys(extra).forEach(function (key) { value[key] = extra[key]; });
    return value;
  }

  var D = [
    pool('first-meeting', 'firstMeeting', { firstMeeting: true }, 120, [
      'Watch the seam, not the ore. The ore will still be there. The seam will not warn you twice.',
      'Geode. I mine this claim exactly, and I mean exactly, down to the measurement.',
      'Ask Nils about knowing where you are. Ask Sump about what gets left behind. Ask me about knowing exactly when to stop.',
      'I learned my limits the expensive way. I would rather you learned yours from watching me, for free.',
      'Welcome to the claim. Mind the old seam past the marker; I do not work that stretch, and neither should you.',
      'Sump keeps what people leave down here. I try very hard not to be the reason he has anything new to keep.',
      'Three visits and you will know exactly how exact I am about a cut. It has never once been an accident.',
      'There is a story behind why I measure everything three times. Ask me sometime. I will tell you, eventually.',
      'Go on, then, have a look. Mind the marker past the old seam. That stretch is not up for discussion today.',
      'I push a claim exactly as far as it is safe to push it, never once further. Old habit. Expensive one to form.'
    ]),
    pool('stage-acquaintance', 'friendshipStages', { stage: 'acquaintance' }, 40, [
      'You came back to the claim. Most people hear the one rule about the old seam and never ask further.',
      'You asked why I measure three times, not just how long it takes. Different question. Better one.',
      'I have started explaining a cut before I make it, for you specifically. Small thing, from someone who mostly works in silence.',
      'You did not touch anything near the old seam without asking first. Rare, that, this early.',
      'Nils mentioned you asked about him too. I will pretend that does not amuse me. It does.',
      'You did not laugh at how careful I am about one particular stretch of rock. Most people do, at least a little.',
      'Come by again. There will be a new cut to see, or the same claim, worked a little more precisely.',
      'I remember your name without needing the second reminder. Unusually good going, for me and how little I say to most people.',
      'You have not yet asked what actually happened at the old seam. I am choosing not to test that patience.'
    ]),
    pool('stage-recognition', 'friendshipStages', { stage: 'recognition' }, 40, [
      'You have started checking a cut yourself before I do. That is further along than most reach in a month.',
      'I caught you noticing the marker past the old seam before I pointed it out. Correct order, finally.',
      'Nils asked, in his way, who the miner who actually listens was. I told him your name properly, for once.',
      'You have not once suggested I push past where I stop. I appreciate the restraint.',
      'I have started explaining the reasoning behind a limit, not just the limit itself, for you specifically.',
      'You return to the same spot near the claim now. I have noticed. I have decided to allow it.',
      'You ask what actually matters when mining this stretch, not just what looks careful. Correct order of questions.',
      'I trust your read on whether a seam is sound nearly as much as my own, at this point.',
      'You ask what I am actually protecting myself from. Uncomfortably accurate question.'
    ]),
    pool('stage-comfortable', 'friendshipStages', { stage: 'comfortable' }, 40, [
      'I told you there was an old seam I do not work. Most people just get the rule and never ask further.',
      'You asked why I never go back to it, and I gave you the honest answer instead of the short one.',
      'Sump lets you near his shelf now without comment, apparently, on my recommendation. That almost never happens for anyone I vouch for.',
      'I have stopped performing "endlessly exacting Geode" quite so hard around you specifically.',
      'You sat through an entire slow cut without once suggesting I speed it up. Good instinct.',
      'I trust your judgment on whether a piece is actually fine or just shiny nearly as much as my own read.',
      'There is a spot near the claim entrance that is basically yours now, if you want it.',
      'Sump would call this "unusually generous access to my actual reasoning," and for once he would not be wrong.',
      'You ask what is actually going on with me before you ask about the next cut. I have noticed, and I permit it.'
    ]),
    pool('stage-beginning', 'friendshipStages', { stage: 'beginning' }, 40, [
      'I told you about the collapse properly, for once, and you did not make it bigger than it was.',
      'You said the exactness sounded like penance as much as skill, and I have not entirely stopped thinking about that since.',
      'The old seam has your name attached to a specific conversation now, somehow, in my own head if nowhere else.',
      'I have started actually considering whether I could trust myself with more than I currently allow.',
      'You do not flinch when I admit the caution costs me something too. Most people just say "so push further," which helps less than they think.',
      'Sump wants your opinion on something now too, apparently. That is not nothing, coming through him.',
      'I told you the plain version of what that day actually cost me. It is a heavier story than the rule makes it sound.',
      'You are welcome to question any limit I set. I would rather be challenged properly than followed blindly.',
      'There is a version of that old seam in my head now that I have not gone back to look at. I have not tried it yet. I am considering it.'
    ]),
    pool('stage-friend', 'friendshipStages', { stage: 'friend' }, 40, [
      'You know which precision is actually care and which one is just fear wearing a measuring tape. I have stopped hiding the difference from you.',
      'I let you see how much that old collapse still costs me. Most people never get shown that at all.',
      'You bring up the old seam before I can deflect the subject again. I have started letting you win that race.',
      'I trust your judgment on whether a cut is sound or just cautious nearly as much as Nils\'s, and I do not say that lightly.',
      'The claim has stopped feeling like the only proof I have that I learned anything. I choose to believe that means something.',
      'I have stopped performing certainty I do not have, around you specifically. It is a relief, oddly.',
      'You are the reason I finally said something true about that day instead of just repeating the rule it produced. Consider this the thanks I am bad at giving directly.',
      'We should look over the whole claim together sometime. Not to test anything. Just to look at it properly.',
      'Sump calls you "the miner\'s friend who actually gets him talking." Coming from him, that is the whole compliment.'
    ]),
    pool('stage-trusted', 'friendshipStages', { stage: 'trusted' }, 40, [
      'I told you I was scared that trusting myself with more would cost me the one rule that has always held, before I had worked out whether that fear was fair. You did not rush me to an answer.',
      'You get the honest account of how badly that old collapse actually went, not the tidy version I give most people.',
      'I do not need you to confirm a cut is safe anymore before I trust it myself. That took a while to build.',
      'You know the two things that actually make me admit the caution is not really about the rock, without me listing them again.',
      'I told you about the morning I first walked away from that seam for good. The uncomfortable parts included.',
      'We disagree about whether that old collapse was really only my fault. I have started thinking you might have a point either way.',
      'I trust you with an unfinished thought now, which is further than I extend most people who only hear the finished ones.',
      'You are one of maybe two people who have seen me genuinely uncertain about something down here.',
      'I trust you with a decision before I know how it turns out. That is further than I extend most people who only hear how it ended.'
    ]),
    pool('stage-close', 'friendshipStages', { stage: 'close' }, 40, [
      'The old seam has a different weight to it now, and you were there when that started to shift, which felt correct rather than incidental.',
      'You ask what I actually think before you ask what is correct by measurement. I have started expecting that, and preferring it.',
      'I do not perform the endlessly-exacting bit for you at all anymore. You have seen me actually uncertain, plainly, and never once made it smaller than it was.',
      'There is no version of a hard decision out here that I do not want to explain to you properly, exact or otherwise.',
      'I still measure more than most miners bother to. I have simply stopped mistaking that for the whole method.',
      'You are allowed to call out when precision is actually fear now, not just afterward. I have extended that to exactly one other person, and he does it constantly.',
      'Ask me the plain version of anything I am protecting myself from. I would rather you heard it true than heard it exact.',
      'Same claim tomorrow, probably a slightly less rigid me after that, and somehow you make either version feel worth showing up for.',
      'Years of treating one hard rule like the whole answer, and you are the reason I finally understand what it was always missing.'
    ]),
    pool('post-learned-it-the-expensive-way', 'postEvent', { completedEventIds: ['geo-folk-overflow-event-learned-it-the-expensive-way'], recentEventIds: ['geo-folk-overflow-event-learned-it-the-expensive-way'] }, 90, [
      'I showed a fine piece of ore to a newer miner again today, plainly, no downplaying it beforehand.',
      'You still ask what I actually lost that day before you ask what the rule is now. Fair, given what actually mattered that week.',
      'I have not gone back to hiding how pleased I am with a good cut since. Small habit. Sticking, so far.',
      'Nils asked if I had actually meant it about trusting myself with a little more. I told him yes, which is apparently rare enough that he checked twice.',
      'I caught myself downplaying a good find out of habit last week. I let myself be pleased instead, on purpose.',
      'The old seam has not changed. I have decided that is fine either way, for now.',
      'You were there for the plain version of that conversation. I still think about that more than I let on.',
      'A newer miner asked me what "the expensive way" actually cost me. I gave them the honest answer this time.',
      'I have not needed to hide the reckless part of that story since. Turns out telling it plainly works better.',
      'The rule about measuring three times still holds. It is just not the only thing I say about that day anymore.'
    ], { acknowledgesEventId: 'geo-folk-overflow-event-learned-it-the-expensive-way' }),
    pool('post-the-half-he-never-got-back', 'postEvent', { completedEventIds: ['geo-folk-overflow-event-the-half-he-never-got-back'], recentEventIds: ['geo-folk-overflow-event-the-half-he-never-got-back'] }, 91, [
      'The geode sits at the claim entrance now, in plain view, in case Sump has not already told everyone in the cavern.',
      'You still ask how it felt getting it back before you ask what I plan to do with it. Fair, given what actually mattered that day.',
      'I tell the whole story now, roof and recklessness included, to anyone standing where I once stood.',
      'I do not need every good find to make me nervous about how much I wanted it anymore. Most days. I am working on the rest.',
      'You watched me actually take it from Sump\'s hands, the first time in years. I have not forgotten who was there for that.',
      'Nils still gets thanked more than the tunnel alone earned him. I am, reluctantly, letting him have this one.',
      'A newer miner asked if I ever go back to old seams now. I got to say carefully, sometimes, properly, for once.',
      'The old rule about measuring three times is retired from being the whole story. It has the real story attached to it now, though.',
      'I have started telling people what I actually lost before I tell them the rule it produced. Turns out that lands better.'
    ], { acknowledgesEventId: 'geo-folk-overflow-event-the-half-he-never-got-back' }),
    pool('location-cavern', 'location', { location: 'cavern' }, 60, [
      'This claim is mine, and it has been for longer than I care to specify precisely.',
      'Nils checks everyone\'s bearings at the entrance, same as always, before anyone gets far enough to need my rules too.',
      'Sump keeps his shelf by the sump pool. Reliable, in his own quiet way. I do not have to worry about anything I lose down here.',
      'Vex reads the cavern for things that are not entirely there. I only deal in the rock that very much is.',
      'Echo calls into the dark and listens for what answers. I would rather listen to the rock itself, honestly.',
      'Wick lights the lower passages and hands out the odd spare item. Reliable sort. Keeps his own claim tidy, which I respect.',
      'This whole cavern runs on precision most days, and on Nils\'s worrying and Sump\'s keeping the rest of the time. All three matter, apparently.',
      'Ask anyone here how exact I am about a cut and you will get the same answer, word for word, every time.',
      'There is exactly one stretch of this claim I do not work casually. Ask me about it if you want the real story.'
    ]),
    pool('location-town', 'location', { location: 'town' }, 55, [
      'I leave the claim rarely, and usually only for supplies the cavern genuinely cannot provide.',
      'Half of town assumes I am always mid-cut. Mostly accurate, admittedly.',
      'The claim does not miss me for an afternoon. It used to feel like it would fall apart without me. It does not.',
      'People expect a miner to chase the big vein regardless of cost. I specialize in the opposite, deliberately, since the roof came down that one time.',
      'If I am not at the claim, ask Nils or Sump. One of them will know, generally, before I do.',
      'The general store has learned my order never changes and my patience for haggling is exactly as short as my patience for shortcuts underground.'
    ]),
    pool('mood-tense', 'recentMoodRumor', { mood: 'tense' }, 75, [
      'Bad day at the claim. A cut that should have landed clean did not, and I am still working out why.',
      'I almost pushed past the marker near the old seam again today, out of pure habit. Did not. Barely.',
      'Give me a minute before you ask how it is going. The honest answer needs more thought than I currently have for it.',
      'Nils asked about the old seam again today and I deflected harder than usual. That is more about me than him.',
      'Something about today\'s cut did not sit right, and I have not worked out why. Give it time.',
      'I need quiet, not conversation, for a while today. Stay if you like. Do not fill the silence on my behalf.',
      'A newer miner questioned the rule today, bluntly, and I had no good answer ready. That one stung more than it should have.'
    ]),
    pool('mood-content', 'recentMoodRumor', { mood: 'content' }, 55, [
      'Good day. Every cut landed clean and I did not have to measure a single one three times.',
      'Nils actually agreed the old seam might be safe to visit someday, out loud. Rare enough to mention on its own.',
      'Nobody needed the difficult version of anything from me today. The plain version was enough, and it was good.',
      'I showed off a good find today without downplaying it first. Progress, apparently.',
      'A newer miner made a clean cut on their first proper try and thanked me for the exact instructions. Small thing. Made my whole week.',
      'A genuinely good day here, by my standard, which is admittedly a demanding one most days.',
      'Sump told me the geode looks right at home at the claim entrance. Coming from him, that is a full parade.'
    ]),
    pool('item-prismstone', 'itemPokemon', { itemIds: ['prismStone'] }, 72, [
      'A stone that resolves into exactly one shape when it is ready, and not a moment before. I understand this object completely.',
      'Sump will ask if I am going to keep it on display, and the honest answer is absolutely, prominently, for once.',
      'I collect very few things that are not strictly useful. This one is making an exception to that rule.',
      'This might be the first thing anyone has given me here that is allowed to just be impressive, no measuring required.',
      'Fair warning: I will absolutely tell people this came from someone who understood exactly what a good stone means to a miner.',
      'A good stone and a good week pair well. Thank you, genuinely.',
      'I am difficult to buy for, apparently, since I claim to want nothing flashy. This one I am keeping anyway, in plain view.',
      'This sits exactly where I can see it working, unhidden, indefinitely. I have decided that is allowed now.'
    ]),
    pool('pokemon-zubat-cavern', 'itemPokemon', { pokemonSeen: [41] }, 70, [
      'One of these startles easily near the claim, which I have come to find oddly companionable.',
      'Nils insists it has better bearings than half the miners who come through. I have watched it. He is not wrong.',
      'It has never once needed anything from me, which suits how I prefer to work.',
      'It showed up the same season I stopped working the old seam. I have decided that is coincidence and not proof of anything.',
      'Sump says it has never once left anything behind for his shelf. From him, that is a genuine compliment.',
      'It is, against all expectation, good company for a slow, exact cut. Patient, in its own way.'
    ]),
    pool('repeat-talk', 'repeatInteraction', { repeatAtLeast: { talks: 8 } }, 45, [
      'Same claim, same question on your face. No, I have not gone back to the old seam, before you ask.',
      'You know the routine by now. Same measurement, same care, same refusal to rush a cut.',
      'Come in. Mind the loose rubble near the marker; Nils has been meaning to mention it to someone for weeks.',
      'Claim talk, an explanation of a rule, or just standing here while I finish a cut. All three remain on offer.',
      'Nothing dramatic happened since we last spoke. I noticed the small things anyway, because you would ask.',
      'You keep turning up at this claim. I have stopped being surprised and started simply expecting it.',
      'Same question, same honest answer: ask Nils if you want the safe way in; ask me if you want the exact way to cut.',
      'Come on down. Nils is at the entrance, being considerably more talkative than usual lately.',
      'The explanation gets a little longer every time you ask. I have noticed. I am choosing to allow it.',
      'You have a standing welcome at this claim now. I do not extend those to just anyone who walks through.',
      'Same claim, same exacting method, same general refusal to push past the marker quickly. I would not trade it for a bolder rock.'
    ]),
    pool('rare-full-circle', 'rare', { location: 'cavern', completedEventIds: ['geo-folk-overflow-event-the-half-he-never-got-back'], minStage: 'trusted' }, 108, [
      'Sump sent a newer miner my way on purpose, for the exact method specifically. That is new, coming from him.',
      'I have shown the reckless part of that old story twice now without flinching through it. I am choosing to be alarmed about that later.',
      'The geode, the marker past the old seam, and a newer miner who made a clean cut on their own: apparently this is what actually changing looks like, close up.',
      'Sit a while, if miners sit. The claim can wait, the old weight already came off once, and today, for once, so did I.'
    ])
  ];

  window.CORE_CAST_DIALOGUE = window.CORE_CAST_DIALOGUE || {};
  window.CORE_CAST_DIALOGUE.geo = D;
})();
