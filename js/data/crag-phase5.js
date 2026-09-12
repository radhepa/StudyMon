/* Phase 5 Slice 6: second half of the "ridge" batch - Crag (the "crag" cast
   entry), the other Stack Ridge hiker. Every string is a complete
   contextual response; categories count responses rather than fragments,
   same convention as sci-oak-phase5.js, oz-phase5.js/sal-phase5.js,
   barista-phase5.js/dax-phase5.js and ace1-phase5.js/ace2-phase5.js. Crag is
   Tier 2, so he gets no CAST_BIBLES entry - his voice and arc live entirely
   in this file and in his dedicated FOLK_EVENTS['stride'] arc (see
   folk-events.js). He was carved out of the shared 'Hiker' cls alongside
   Burl (see burl-phase5.js) in the same batch, so this content does not
   leak onto the other climber-archetype townsfolk who still share the
   plain Hiker/Miner/Ranger/Mountain Guide/Caver/Cave Guide classes (Flint,
   Moss, Roan, Geode, Nils, Sump, and the Calculus-region Dov/Orin/Ruben/
   Tovah). Crag and Burl's arcs complete each other by ordinary narrative
   reference only - see each character's Event 2 - not the relationshipIds
   gate; see oz-phase5.js's header comment and the Phase 5 handoff's "Known
   risks" for why. */
(function () {
  function pool(id, category, when, priority, lines, extra) {
    var value = { id: 'crag-dialogue-' + id, category: category, when: when || {}, priority: priority || 0, lines: lines };
    if (extra) Object.keys(extra).forEach(function (key) { value[key] = extra[key]; });
    return value;
  }

  var D = [
    pool('first-meeting', 'firstMeeting', { firstMeeting: true }, 120, [
      'One step. Then the same step again. That is the entire method, and it has never once failed.',
      'Crag. I keep the ridge, and I keep it simple.',
      'Ask Burl about spare gear. Ask me about not needing most of it in the first place.',
      'The trail does not get easier if you think about it more. It gets easier if you just keep walking it.',
      'Welcome to the ridge. Keep your eyes on the next step, not the whole climb, and you will be fine.',
      'Burl will hand you a spare rope before you ask. I will tell you when you actually need one, which is rarely.',
      'Three trips up and you will know the whole trail by feel. I am usually the reason it feels that simple.',
      'I have said the same sentence to every nervous hiker on this ridge for longer than I care to count.',
      'Go on, then. One step. It is always just one step, whatever the rest of the climb looks like from here.',
      'I do not overthink this trail, and I would not recommend you start either.'
    ]),
    pool('stage-acquaintance', 'friendshipStages', { stage: 'acquaintance' }, 40, [
      'You came back up. Most people hear the one sentence once and never need me again.',
      'You asked why the method works, not just what it is. Different question. Better one.',
      'I have started noticing your pace specifically. Small thing, from someone who mostly notices steps, not people.',
      'You did not ask me to explain more than I offered. Rare, that, up here.',
      'Burl mentioned you asked about him too. I will pretend that does not interest me. It interests me.',
      'You did not rush the climb just to prove something. Correct instinct, at this stage.',
      'Come back if you want the method applied to you specifically, not just recited at you. I do not extend that to everyone.',
      'I remember your pace from last time without needing the reminder. Unusually good going, for me.',
      'You have not yet asked me to explain further than one step. I am beginning to trust that you understand why I would not.'
    ]),
    pool('stage-recognition', 'friendshipStages', { stage: 'recognition' }, 40, [
      'You have started trusting the next step instead of asking about the whole climb. That is further along than most reach in a month.',
      'I caught you watching how I set my pace before you matched it yourself. Correct order.',
      'Burl asked, in his way, who the hiker who actually listens was. I told him your name properly, for once.',
      'You have not once suggested I plan further ahead. I appreciate the restraint.',
      'I have started explaining the reasoning behind the step, not just the step itself, for you specifically.',
      'You return to the same spot on the switchback now. I have noticed. I have decided to allow it.',
      'You ask what actually matters on a hard climb, not just what looks careful. Correct order of questions.',
      'I trust your read on whether a step is safe nearly as much as my own, at this point.',
      'You ask what I am actually protecting people from. Uncomfortably accurate question.'
    ]),
    pool('stage-comfortable', 'friendshipStages', { stage: 'comfortable' }, 40, [
      'I told you about the weather that turned. Most people just get the reputation for simplicity.',
      'You asked why I never plan further ahead, and I gave you the honest answer instead of the short one.',
      'Burl lets you walk near the front without comment now. That almost never happens for anyone I bring near the line.',
      'I have stopped performing "endlessly unbothered Crag" quite so hard around you specifically.',
      'You sat through an entire slow climb without once suggesting I speed it up. Good instinct.',
      'I trust your judgment on whether a step is actually sound nearly as much as my own read.',
      'There is a spot on the switchback that is basically yours now, if you want it.',
      'Burl would call this "unusually generous access to my actual reasoning," and for once he would not be wrong.',
      'You ask what is actually going on with me before you ask about the next step. I have noticed, and I permit it.'
    ]),
    pool('stage-beginning', 'friendshipStages', { stage: 'beginning' }, 40, [
      'I told you about freezing halfway up, properly, for once, and you did not make it bigger than it was.',
      'You said one step at a time sounded like protection, not just habit, and I have not entirely stopped thinking about that since.',
      'The switchback has your name attached to a specific afternoon now, somehow, in my own head if nowhere else.',
      'I have started actually considering whether the method needs a second step some days.',
      'You do not flinch when I admit the simplicity costs me something too. Most people just say "so plan more," which helps less than they think.',
      'Burl wants your opinion on something now too, apparently. That is not nothing, coming through him.',
      'I told you the plain version of what that old climb actually cost me. It is a smaller story than the reputation suggests.',
      'You are welcome to question the method. I would rather be challenged properly than followed blindly.',
      'There is a version of the trail in my head now that starts with more than one step. I have not tried it yet. I am considering it.'
    ]),
    pool('stage-friend', 'friendshipStages', { stage: 'friend' }, 40, [
      'You know which quiet is actually calm and which one is just the method. I have stopped hiding the difference from you.',
      'I let you see how much that old climb still costs me. Most people never get shown that at all.',
      'You bring up the second step before I can talk myself out of trying it again. I have started letting you win that race.',
      'I trust your judgment on whether a plan is sound or just cautious nearly as much as Burl\'s, and I do not say that lightly.',
      'The switchback has stopped feeling like the only thing I am here for. I choose to believe that means something.',
      'I have stopped performing certainty I do not have, around you specifically. It is a relief, oddly.',
      'You are the reason I finally said something true about that old climb instead of just repeating the method. Consider this the thanks I am bad at giving directly.',
      'We should walk the whole ridge together sometime. Not to test anything. Just to walk it.',
      'Burl calls you "the hiker who actually gets him to slow down." Coming from him, that is the whole compliment.'
    ]),
    pool('stage-trusted', 'friendshipStages', { stage: 'trusted' }, 40, [
      'I told you I was scared that thinking further ahead would cost me the one thing that has always worked, before I had worked out whether that fear was fair. You did not rush me to an answer.',
      'You get the honest account of how badly that old climb actually went, not the tidy version I give most people.',
      'I do not need you to confirm a step is right anymore before I trust it myself. That took a while to build.',
      'You know the two things that actually make me admit the method is not enough, without me listing them again.',
      'I told you about the afternoon the trail genuinely needed more from me than one step. The uncomfortable parts included.',
      'We disagree about whether that old freeze was really unforgivable. I have started thinking you might have a point either way.',
      'I trust you with an unfinished thought now, which is further than I extend most people who only hear the finished ones.',
      'You are one of maybe two people who have seen me genuinely uncertain about something up here.',
      'I trust you with a decision before I know how it turns out. That is further than I extend most people who only hear how it ended.'
    ]),
    pool('stage-close', 'friendshipStages', { stage: 'close' }, 40, [
      'The switchback has a second step attached to it now, when it needs one, and you were there when that started, which felt correct rather than incidental.',
      'You ask what I actually think before you ask what is simplest. I have started expecting that, and preferring it.',
      'I do not perform the unbothered-Crag bit for you at all anymore. You have seen me actually frozen, plainly, and never once made it smaller than it was.',
      'There is no version of a hard climb out here that I do not want to explain to you properly, simple or otherwise.',
      'I still keep things to one step more than most hikers bother to. I have simply stopped mistaking that for the whole method.',
      'You are allowed to call out when one step is not enough now, not just afterward. I have extended that to exactly one other person, and he does it constantly.',
      'Ask me the plain version of anything I am protecting myself from. I would rather you heard it true than heard it simple.',
      'Same switchback tomorrow, probably a slightly less rigid me after that, and somehow you make either version feel worth climbing for.',
      'Years of treating one step like the whole answer, and you are the reason I finally understand what it was always missing.'
    ]),
    pool('post-the-same-step', 'postEvent', { completedEventIds: ['crag-folk-stride-event-the-same-step'], recentEventIds: ['crag-folk-stride-event-the-same-step'] }, 90, [
      'I explained the reason behind the method again today, out loud, before just repeating it. Small habit. Sticking, so far.',
      'You still ask what the step is actually protecting against before you ask what it requires. I have started expecting that question first, from anyone.',
      'I have not gone back to reciting it blankly since. It stuck, mostly.',
      'Burl asked if I had actually meant what I said about freezing that time. I told him yes, which is apparently rare enough that he checked twice.',
      'I caught myself about to explain nothing, out of habit, last week. I explained it instead, on purpose.',
      'The method has not changed. I have decided that is fine either way, for now.',
      'You were there for the plain version of that story. I still think about that more than I let on.',
      'A newer hiker asked about the freeze directly. I told them the real version this time.',
      'I have not needed years of silence to explain a reason since. Turns out saying it plainly works better.',
      'The reputation for simplicity still holds. It is just not the only thing people hear from me anymore.'
    ], { acknowledgesEventId: 'crag-folk-stride-event-the-same-step' }),
    pool('post-more-than-one-step', 'postEvent', { completedEventIds: ['crag-folk-stride-event-more-than-one-step'], recentEventIds: ['crag-folk-stride-event-more-than-one-step'] }, 91, [
      'Everyone got down fine, by the way, in case Burl has not already told everyone on the ridge.',
      'You still ask how the second step is going before you ask about the weather. Fair, given what actually mattered that week.',
      'I carry one extra thing now, every climb, same as I said I would.',
      'I do not need every step to be the only step anymore. Most days. I am working on the rest.',
      'You watched me actually follow Burl\'s plan, awkwardly, the first time. I have not forgotten who was there for that.',
      'Burl still will not let me forget it worked. I am, reluctantly, letting him have this one.',
      'A newer hiker asked if I ever plan further ahead now. I got to say sometimes, properly, for once.',
      'The old reputation for pure simplicity is still mostly accurate. It has one extra step folded into it now, though.',
      'I have started telling people the reason behind a step before the step itself. Turns out that lands better.'
    ], { acknowledgesEventId: 'crag-folk-stride-event-more-than-one-step' }),
    pool('location-ridge', 'location', { location: 'ridge' }, 60, [
      'This switchback is mine, and it has been for longer than I care to specify precisely.',
      'Burl keeps the trailhead, heavy pack and all, for longer than I have kept this line, if not by much.',
      'Flint works the seams quietly further along. Reliable. I do not have to think about his section at all.',
      'Roan tells the same story to every newcomer. Fine by me. Consistency is the entire point up here.',
      'Moss hands out permits near the ranger post, carrying next to nothing. I respect that, honestly.',
      'Tor has walked this ridge forty years and calls it a chain. I call it one step, repeated. Same idea, different words.',
      'Ida only battles hikers with enough badges to be worth her time. I keep to my own section and let her keep to hers.',
      'This whole ridge runs on precision most days, and on Burl\'s worrying the rest of the time. Both matter, apparently.',
      'Ask anyone here how simple my method is and you will get the same answer, word for word, every time.'
    ]),
    pool('location-town', 'location', { location: 'town' }, 55, [
      'I leave the ridge rarely, and usually only for supplies the trail genuinely cannot provide.',
      'Half of town assumes I am always mid-climb. Mostly accurate, admittedly.',
      'The ridge does not miss me for an afternoon. It used to feel like it would fall apart without me. It does not.',
      'People expect a hiker to plan every contingency. I specialize in not doing that, deliberately.',
      'If I am not on the ridge, ask Burl. He will know, generally, before I do.',
      'The general store has learned my order never changes. Small consistency I have come to rely on.'
    ]),
    pool('mood-tense', 'recentMoodRumor', { mood: 'tense' }, 75, [
      'Bad day on the switchback. A step that should have landed clean did not, and I am still working out why.',
      'I almost overthought the whole climb again today, out of habit. Did not. Barely.',
      'Give me a minute before you ask how it is going. The honest answer needs more thought than I currently have for it.',
      'Burl asked about the weather again today and I deflected harder than usual. That is more about me than him.',
      'Something about today\'s climb did not sit right, and I have not worked out why. Give it time.',
      'I need quiet, not conversation, for a while today. Stay if you like. Do not fill the silence on my behalf.',
      'A hiker questioned the method today, bluntly, and I had no good answer ready. That one stung more than it should have.'
    ]),
    pool('mood-content', 'recentMoodRumor', { mood: 'content' }, 55, [
      'Good day. Every step landed clean and nobody needed a second one.',
      'Burl actually agreed the pack could be lighter today, out loud. Rare enough to mention on its own.',
      'Nobody needed the difficult version of anything from me today. The plain version was enough, and it was good.',
      'I explained a step today without being asked twice. Progress, apparently.',
      'The hiker from before came back and finished the whole climb. Small thing. Made my entire week.',
      'A genuinely good day here, by my standard, which is admittedly a plain one most days.',
      'Burl told me a step of mine actually helped someone who was struggling. Coming from him, that is a full parade.'
    ]),
    pool('item-carvedwhistle', 'itemPokemon', { itemIds: ['carvedWhistle'] }, 72, [
      'A clear note, once, is enough. I am not sure why anyone would need more than that.',
      'Burl will ask if it is heavy and be visibly disappointed to learn it is not.',
      'I have no use for it and I am keeping it regardless. One sound, repeated exactly the same way every time. Fitting, somehow.',
      'This might be the first thing anyone has given me here that does exactly one thing and does it well.',
      'Fair warning: I will absolutely use this the same way every single time, without variation.',
      'A simple object with a single, reliable purpose. Thank you, genuinely, for something that matches how I think.',
      'I am difficult to buy for, apparently, since I claim to want nothing and mean most of it. This one I am keeping.',
      'This will sit exactly where I put it, used the same way, indefinitely. I have decided that is correct.'
    ]),
    pool('pokemon-geodude-ridge', 'itemPokemon', { pokemonSeen: [74] }, 70, [
      'One of these trains up here most mornings, same as the rest of us. It moves the exact same way every time. I approve.',
      'Burl insists it is some kind of unofficial mascot. I insist it is simply consistent. We have not resolved this.',
      'It takes the same line up the rock every day, without needing to be told twice. I respect that enormously.',
      'It showed up the same season I settled into this exact routine. I have decided that is coincidence and not proof of anything.',
      'Flint says it minds the seams fair, once. From him, that is real praise.',
      'It is, against all expectation, good company on a slow climb. Even I have noticed.'
    ]),
    pool('repeat-talk', 'repeatInteraction', { repeatAtLeast: { talks: 8 } }, 45, [
      'Same switchback, same question on your face. No, nothing has changed since this morning.',
      'You know the routine by now. Same step, same sentence, same pace, same as always.',
      'Come up. Mind the loose scree near the second switchback; Burl has been meaning to mention it to someone for weeks.',
      'Trail talk, an explanation of the method, or just standing here while I finish a step. All three remain on offer.',
      'Nothing dramatic happened since we last spoke. I noticed the small things anyway, because you would ask.',
      'You keep turning up at this switchback. I have stopped being surprised and started simply expecting it.',
      'Same question, same honest answer: ask Burl if you want the spare gear; ask me if you want the simplest way up.',
      'Come on down. Burl is at the trailhead, being considerably more talkative than usual lately.',
      'The explanation gets a little longer every time you ask. I have noticed. I am choosing to allow it.',
      'You have a standing welcome at this switchback now. I do not extend those to just anyone who meets me here.',
      'Same switchback, same method, same general refusal to overthink it quickly. I would not trade it for a busier mind.'
    ]),
    pool('rare-full-circle', 'rare', { location: 'ridge', completedEventIds: ['crag-folk-stride-event-more-than-one-step'], minStage: 'trusted' }, 108, [
      'Burl sent a nervous hiker my way on purpose, for the method specifically. That is new, coming from him.',
      'I have carried the extra cord twice now without needing to justify it out loud. I am choosing to be alarmed about that later.',
      'The fork, the extra step, and a hiker who made it down safely on a bad afternoon: apparently this is what actually changing looks like, close up.',
      'Sit a while, if the method allows it. The step can wait, the plan already worked once properly, and today, for once, so did the rest of it.'
    ])
  ];

  window.CORE_CAST_DIALOGUE = window.CORE_CAST_DIALOGUE || {};
  window.CORE_CAST_DIALOGUE.crag = D;
})();
