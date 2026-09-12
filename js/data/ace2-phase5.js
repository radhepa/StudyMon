/* Phase 5 Slice 5: Tier 2 batch, the Gym Quarter Ace Trainers (2 of 2) -
   Delia (the "ace2" cast entry). Every string is a complete contextual
   response; categories count responses rather than fragments, same
   convention as sci-oak-phase5.js, oz-phase5.js/sal-phase5.js and
   barista-phase5.js/dax-phase5.js. Delia is Tier 2, so she gets no
   CAST_BIBLES entry - her voice and arc live entirely in this file and in
   her dedicated FOLK_EVENTS['standards'] arc (see folk-events.js). She was
   carved out of the shared 'veteran' archetype alongside Corin (see
   ace1-phase5.js) in the same batch, so this content does not leak onto
   the other veteran-archetype townsfolk (Osk, Beauty, the referee, Gus,
   Kes, Ida, Tor, Odile). Delia and Corin's arcs complete each other by ordinary
   narrative reference only - see each character's Event 2 - not the
   relationshipIds gate; see oz-phase5.js's header comment and the Phase 5
   handoff's "Known risks" for why.

   Delia's personal `badges: 12` meeting gate (set in js/data/townsfolk.js)
   is higher than the standard Tier 2 event badge floor, so both of her
   heart events use badges 12/13 instead of the usual 2/5 - the same
   precedent Dr. Oakes's `badges: 10` gate set in Slice 2, so the events
   are never satisfiable before she can even be met in the first place. */
(function () {
  function pool(id, category, when, priority, lines, extra) {
    var value = { id: 'ace2-dialogue-' + id, category: category, when: when || {}, priority: priority || 0, lines: lines };
    if (extra) Object.keys(extra).forEach(function (key) { value[key] = extra[key]; });
    return value;
  }

  var D = [
    pool('first-meeting', 'firstMeeting', { firstMeeting: true }, 120, [
      'Structure first. Then padding. Then, if you are lucky, speed. You have twelve badges, so I assume you already know that.',
      'Delia. I run the drill line, and I enforce standards most people would rather I did not.',
      'Ask Corin about the warm-up. Ask me about actually being ready. Between us you get the full picture.',
      'Well aligned, or you are not. There is very little in between, in my experience.',
      'The quarter has standards. I am, unfortunately for some people, the one who enforces them.',
      'Twelve badges gets you a conversation with me. Staying interesting keeps it going.',
      'I do not soften the drill for anyone. I have found that softening it undermines the whole point before it can land.',
      'Corin will tell you a joke about the door. I will tell you exactly what you are missing before it costs you something.',
      'Welcome to the quarter. Everyone here is either structured or about to learn why they should be.',
      'Come find me if you want the honest assessment of anything happening in this quarter. I deal exclusively in honest assessments.'
    ]),
    pool('stage-acquaintance', 'friendshipStages', { stage: 'acquaintance' }, 40, [
      'You came back. Most people hear one correction from me and decide the relationship is concluded.',
      'You asked why the standards matter, not just how to meet them. Different question. Better one.',
      'I have started noting your specific gaps without deciding to. Small thing, from someone who tracks everyone\'s.',
      'You took a correction without flinching. Rare, that, in someone your level.',
      'Corin mentioned you asked about me too. I will pretend that does not interest me. It interests me.',
      'You did not argue with the drill. Correct instinct, at this stage.',
      'Come back if you like the standards applied to you specifically. I do not extend that to everyone.',
      'I remember your gap from last time without needing the reminder. Unusually good going, for me.',
      'You have not yet asked me to go easier on you. I am beginning to trust that you understand why I would not.'
    ]),
    pool('stage-recognition', 'friendshipStages', { stage: 'recognition' }, 40, [
      'You have started closing your own gaps before I point them out. That is further along than most reach in a month.',
      'I caught you watching how I run the drill before you ran it yourself. Correct order.',
      'Corin asked, in his way, who the trainer who actually listens to me was. I told him your name properly, for once.',
      'You have not once suggested I go easier on beginners. I appreciate the restraint.',
      'I have started explaining the reasoning behind a drill, not just the drill itself, for you specifically.',
      'You return to the same spot on the drill line now. I have noticed. I have decided to allow it.',
      'You ask what actually matters in a real match, not just what looks correct in practice. Correct order of questions.',
      'I trust your read on whether a gap is dangerous or just untidy nearly as much as my own.',
      'You ask what I am actually protecting people from. Uncomfortably accurate question.'
    ]),
    pool('stage-comfortable', 'friendshipStages', { stage: 'comfortable' }, 40, [
      'I told you about the gap. Most people just get the reputation for standards.',
      'You asked why I never loosen them, and I gave you the honest answer instead of the short one.',
      'Corin lets you stand near the drill line without comment now. That almost never happens for anyone I bring near it.',
      'I have stopped performing "unmovable standards" quite so hard around you specifically.',
      'You sat through an entire difficult drill without once suggesting I ease up. Good instinct.',
      'I trust your judgment on whether a correction actually landed nearly as much as my own read.',
      'There is a spot on the drill line that is basically yours now, if you want it.',
      'Corin would call this "unusually generous access to my actual reasoning," and for once he would not be wrong.',
      'You ask what is actually going on with me before you ask about the next drill. I have noticed, and I permit it.'
    ]),
    pool('stage-beginning', 'friendshipStages', { stage: 'beginning' }, 40, [
      'I told you about the match properly, for once, and you did not make it bigger than it was.',
      'You said the standards sounded like insurance rather than cruelty, and I have not entirely stopped thinking about that since.',
      'The drill has your name attached to a specific correction now, somehow, in my own head if nowhere else.',
      'I have started actually considering whether the standards need a human sentence in front of them.',
      'You do not flinch when I admit the standards cost me something too. Most people just say "so change them," which helps less than they think.',
      'Corin wants your opinion on something now too, apparently. That is not nothing, coming through him.',
      'I told you the plain version of what the gap actually cost me. It is a smaller story than the reputation suggests.',
      'You are welcome to question any standard I set. I would rather be challenged properly than followed blindly.',
      'There is a version of the drill in my head now that starts differently. I have not run it yet. I am considering it.'
    ]),
    pool('stage-friend', 'friendshipStages', { stage: 'friend' }, 40, [
      'You know which precision is actually care and which one is just habit. I have stopped hiding the difference from you.',
      'I let you see how much the old match still costs me. Most people never get shown that at all.',
      'You bring up the human sentence before I can talk myself out of trying it again. I have started letting you win that race.',
      'I trust your judgment on whether a correction is kind or just correct nearly as much as Corin\'s, and I do not say that lightly.',
      'The drill line has stopped feeling like the only thing I am here for. I choose to believe that means something.',
      'I have stopped performing certainty I do not have, around you specifically. It is a relief, oddly.',
      'You are the reason I finally said something human before a drill instead of just running it. Consider this the thanks I am bad at giving directly.',
      'We should watch a match together sometime. Not to critique it. Just to watch.',
      'Corin calls you "the trainer who actually gets her to loosen up." Coming from him, that is the whole compliment.'
    ]),
    pool('stage-trusted', 'friendshipStages', { stage: 'trusted' }, 40, [
      'I told you I was scared the standards were the only thing holding me together, before I had worked out whether that fear was fair. You did not rush me to an answer.',
      'You get the honest account of how badly that match actually went, not the tidy version I give most people.',
      'I do not need you to confirm a correction is right anymore before I trust it myself. That took a while to build.',
      'You know the two things that actually make me admit a standard is not helping, without me listing them again.',
      'I told you about the morning the drill line genuinely felt like armor instead of a method. The uncomfortable parts included.',
      'We disagree about whether the old match was really unwinnable. I have started thinking you might have a point either way.',
      'I trust you with an unfinished thought now, which is further than I extend most people who only hear the finished ones.',
      'You are one of maybe two people who have seen me genuinely uncertain about something.',
      'I trust you with a decision before I know how it turns out. That is further than I extend most people who only hear how it ended.'
    ]),
    pool('stage-close', 'friendshipStages', { stage: 'close' }, 40, [
      'The drill has a human sentence in front of it now, every time, and you were there when that started, which felt correct rather than incidental.',
      'You ask what I actually think before you ask what is correct. I have started expecting that, and preferring it.',
      'I do not perform the unmovable-standards bit for you at all anymore. You have seen me actually uncertain, plainly, and never once made it smaller than it was.',
      'There is no version of a real correction out here that I do not want to explain to you properly, standard or otherwise.',
      'I still hold people to exact standards more than most Aces bother to. I have simply stopped mistaking that for the whole method.',
      'You are allowed to call out an over-correction mid-sentence now, not just afterward. I have extended that to exactly one other person, and he does it constantly.',
      'Ask me the plain version of anything I am protecting myself from. I would rather you heard it true than heard it composed.',
      'Same drill line tomorrow, probably a slightly warmer me after that, and somehow you make either version feel worth turning up for.',
      'Years of treating structure like the whole answer, and you are the reason I finally understand what it was always missing.'
    ]),
    pool('post-the-gap-in-the-middle', 'postEvent', { completedEventIds: ['ace2-folk-standards-event-the-gap-in-the-middle'], recentEventIds: ['ace2-folk-standards-event-the-gap-in-the-middle'] }, 90, [
      'I explained a correction properly again today, out loud, before enforcing it. Small habit. Sticking, so far.',
      'You still ask what the standard is actually protecting against before you ask what it requires. I have started expecting that question first, from anyone.',
      'I have not gone back to silent enforcement since. It stuck, mostly.',
      'Corin asked if I had actually meant what I said about the gap. I told him yes, which is apparently rare enough that he checked twice.',
      'I caught myself about to enforce a different standard in silence last week. I explained it instead, on purpose.',
      'The drill has not changed. I have decided that is fine either way, for now.',
      'You were there for the plain version of that story. I still think about that more than I let on.',
      'A newer trainer asked about the gap directly. I told them the real version this time.',
      'I have not needed years of silence to explain a reason since. Turns out saying it plainly works better.',
      'The reputation for standards still holds. It is just not the only thing people hear from me anymore.'
    ], { acknowledgesEventId: 'ace2-folk-standards-event-the-gap-in-the-middle' }),
    pool('post-what-structure-cannot-reach', 'postEvent', { completedEventIds: ['ace2-folk-standards-event-what-structure-cannot-reach'], recentEventIds: ['ace2-folk-standards-event-what-structure-cannot-reach'] }, 91, [
      'The trainer came back, by the way, in case Corin has not already told everyone in the quarter.',
      'You still ask how the human sentence is going before you ask about the drills. Fair, given what actually mattered that week.',
      'I open every session with something true and ordinary now, same as I said I would.',
      'I do not need every correction to start cold anymore. Most days. I am working on the rest.',
      'You watched me actually try Corin\'s approach, awkwardly, the first time. I have not forgotten who was there for that.',
      'Corin still will not let me forget it worked. I am, reluctantly, letting him have this one.',
      'A newer trainer asked if I ever soften the drills now. I got to say sometimes, properly, for once.',
      'The old reputation for pure standards is still mostly accurate. It has a human sentence in front of it now, though.',
      'I have started telling people the reason behind a correction before the correction itself. Turns out that lands better.'
    ], { acknowledgesEventId: 'ace2-folk-standards-event-what-structure-cannot-reach' }),
    pool('location-quarter', 'location', { location: 'quarter' }, 60, [
      'This drill line is mine, and it has been for longer than I care to specify precisely.',
      'Corin runs the entrance, easy and welcoming, for longer than I have run this line, if not by much.',
      'Osk trains quietly at the far end. Reliable. I do not have to correct him nearly as often as most.',
      'Beauty holds court near the benches. I let her; morale is not nothing, even if it is not my method.',
      'Rocker drifts through occasionally, humming, contributing nothing to anyone\'s actual preparation.',
      'The referee keeps the serious matches fair. I keep the preparation exact. We rarely need to discuss it.',
      'Champ trains past the far door, rarely seen. I have my own standards to maintain without watching for that.',
      'This whole quarter runs on precision most days, and on Corin\'s warmth the rest of the time. Both matter, apparently.',
      'Ask anyone here how exact my standards are and you will get the same answer, word for word, every time.'
    ]),
    pool('location-town', 'location', { location: 'town' }, 55, [
      'I leave the quarter rarely, and usually only for supplies the drill line genuinely cannot provide.',
      'Half of town assumes I am always correcting someone. Mostly accurate, admittedly.',
      'The quarter does not miss me for an afternoon. It used to feel like it would fall apart without me. It does not.',
      'People expect an Ace Trainer to be approachable. I specialize in exactness instead, deliberately.',
      'If I am not at the quarter, ask Corin. He will know, generally, before I do.',
      'The general store has learned to have my order exact and ready. Small consistency I have come to rely on.'
    ]),
    pool('mood-tense', 'recentMoodRumor', { mood: 'tense' }, 75, [
      'Bad day at the drill line. A correction that should have landed cleanly did not, and I am still working out why.',
      'I almost enforced a standard in silence again today, out of habit. Did not. Barely.',
      'Give me a minute before you ask how it is going. The honest answer needs more precision than I currently have for it.',
      'Corin asked about the gap again today and I deflected harder than usual. That is more about me than him.',
      'Something about today\'s drill did not sit right, and I have not worked out why. Give it time.',
      'I need quiet, not conversation, for a while today. Stay if you like. Do not fill the silence on my behalf.',
      'A trainer questioned the standard today, bluntly, and I had no good answer ready. That one stung more than it should have.'
    ]),
    pool('mood-content', 'recentMoodRumor', { mood: 'content' }, 55, [
      'Good day. Every correction landed clean and nobody needed the human sentence twice.',
      'Corin actually agreed with a standard of mine today, out loud. Rare enough to mention on its own.',
      'Nobody needed the difficult version of anything from me today. The plain version was enough, and it was good.',
      'I opened a session with something human today without having to think about it first. Progress, apparently.',
      'The trainer from before came back and stayed the whole session. Small thing. Made my entire week.',
      'A genuinely good day here, by my standard, which is admittedly a demanding one most days.',
      'Corin told me a correction of mine actually worked on someone stubborn. Coming from him, that is a full parade.'
    ]),
    pool('item-bentspoon', 'itemPokemon', { itemIds: ['bentSpoon'] }, 72, [
      'A bent spoon. Structurally incorrect and, against my better judgment, I find that oddly restful.',
      'Corin will ask what it is for and I will not have a good answer, which apparently amuses him greatly.',
      'I have no use for it whatsoever and I am keeping it regardless. Note the inconsistency. I am choosing not to correct it.',
      'This might be the first thing anyone has given me here that I did not immediately try to categorize properly.',
      'Fair warning: I will absolutely display this somewhere precise and orderly, which defeats its entire point.',
      'An object with no explanation and no function. Thank you, genuinely, for the novelty of that.',
      'I am difficult to buy for, apparently, since I claim to want nothing and mean almost none of it. This one I mean.',
      'This will sit exactly where I put it, unexplained, indefinitely. I have decided that is allowed.'
    ]),
    pool('pokemon-machop-quarter', 'itemPokemon', { pokemonSeen: [66] }, 70, [
      'One of these trains here most mornings, same as the rest of us. It keeps better form than half the trainers who come through.',
      'Corin insists it is some kind of unofficial mascot. I insist it is simply well-drilled. We have not resolved this.',
      'It matches its reps precisely, every time, without needing to be told twice. I respect that enormously.',
      'It showed up the same season I tightened the drill line\'s standards. I have decided that is coincidence and not proof of anything.',
      'Osk says it sparred him fair, once. From him, that is real praise.',
      'It is, against all expectation, good for morale. Even I have noticed.'
    ]),
    pool('repeat-talk', 'repeatInteraction', { repeatAtLeast: { talks: 8 } }, 45, [
      'Same drill line, same question on your face. No, nothing has changed since this morning.',
      'You know the routine by now. Same standard, same correction, same precision, same as always.',
      'Come in. Mind the uneven paving near the benches; Corin has been meaning to mention it to someone for weeks.',
      'Drill talk, an explanation of a standard, or just standing here while I finish a correction. All three remain on offer.',
      'Nothing dramatic happened since we last spoke. I noticed the small things anyway, because you would ask.',
      'You keep turning up at this line. I have stopped being surprised and started simply expecting it.',
      'Same question, same honest answer: ask Corin if you want encouragement; ask me if you want the exact standard.',
      'Come on down. Corin is at the entrance, being considerably more thoughtful than usual lately.',
      'The explanation gets a little longer every time you ask. I have noticed. I am choosing to allow it.',
      'You have a standing welcome at this line now. I do not extend those to just anyone who meets the badge requirement.',
      'Same drill line, same standards, same general refusal to soften them quickly. I would not trade it for an easier method.'
    ]),
    pool('rare-full-circle', 'rare', { location: 'quarter', completedEventIds: ['ace2-folk-standards-event-what-structure-cannot-reach'], minStage: 'trusted' }, 108, [
      'Corin sent a nervous trainer my way on purpose, for the standards specifically. That is new, coming from him.',
      'I have opened two sessions now with something human before the drill. I am choosing to be alarmed about that later.',
      'The gap, the human sentence, and a trainer who came back after quitting once: apparently this is what actually changing looks like, close up.',
      'Sit a while, if standards allow it. The drill can wait, the correction already landed once properly, and today, for once, so did the rest of it.'
    ])
  ];

  window.CORE_CAST_DIALOGUE = window.CORE_CAST_DIALOGUE || {};
  window.CORE_CAST_DIALOGUE.ace2 = D;
})();
