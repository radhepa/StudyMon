/* Phase 5 Slice 5: Tier 2 batch, the Gym Quarter Ace Trainers (1 of 2) -
   Corin (the "ace1" cast entry). Every string is a complete contextual
   response; categories count responses rather than fragments, same
   convention as sci-oak-phase5.js, oz-phase5.js/sal-phase5.js and
   barista-phase5.js/dax-phase5.js (the Tier 2 templates from Slices 2-4).
   Corin is Tier 2, so he gets no CAST_BIBLES entry - his voice and arc live
   entirely in this file and in his dedicated FOLK_EVENTS['warmup'] arc (see
   folk-events.js). He was carved out of the shared 'veteran' archetype
   alongside Delia (see ace2-phase5.js) in the same batch, so this content
   does not leak onto the other veteran-archetype townsfolk (Osk, Beauty,
   the referee, Gus, Kes, Ida, Tor, Odile). Corin and Delia's arcs complete each
   other by ordinary narrative reference only - see each character's Event
   2 - not the relationshipIds gate; see oz-phase5.js's header comment and
   the Phase 5 handoff's "Known risks" for why. */
(function () {
  function pool(id, category, when, priority, lines, extra) {
    var value = { id: 'ace1-dialogue-' + id, category: category, when: when || {}, priority: priority || 0, lines: lines };
    if (extra) Object.keys(extra).forEach(function (key) { value[key] = extra[key]; });
    return value;
  }

  var D = [
    pool('first-meeting', 'firstMeeting', { firstMeeting: true }, 120, [
      'Everyone here is warming up for the same door you are. Might as well warm up together.',
      'Corin. I run the newcomers through their paces before the quarter gets serious about them.',
      'Ask Delia about standards. Ask me about showing up. Between us you get the full experience.',
      'The gym door does not care how nervous you are. I find that oddly comforting, most days.',
      'Go on, then. Knock, eventually. Not today, probably. There is no rush, whatever anyone else tells you.',
      'I have warmed up more trainers than I can count for that door. Ask me about it sometime. I will talk for a while.',
      'Delia will tell you the standards. I will tell you it is fine to be nervous first. We cover different ground.',
      'Three laps of the quarter and you will know everyone worth knowing. I am the first lap, usually.',
      'Welcome to the quarter. Everyone here is either warming up or pretending they do not need to. I am somewhere in between.',
      'Come find me before you challenge anything serious. I like sending people off properly.'
    ]),
    pool('stage-acquaintance', 'friendshipStages', { stage: 'acquaintance' }, 40, [
      'You came back. Most people get warmed up once and move straight on to the actual gym.',
      'You asked how long I have been doing this, not just how to do the warm-up. Different question. Better one.',
      'I have started remembering your routine specifically. Small thing, from someone who runs a hundred a week.',
      'You thanked me properly instead of just walking off toward the door. Rare, that.',
      'Delia mentioned you asked about her too. I will pretend that does not amuse me. It does.',
      'You did not rush through the warm-up just to get to the real fight. I appreciated the patience.',
      'Come by again. I will have new stretches, or the same ones, said more convincingly.',
      'I remember your name without needing the second reminder. Unusually good going, for me.',
      'You have not yet asked when I am challenging the door myself. I am choosing not to test that patience.'
    ]),
    pool('stage-recognition', 'friendshipStages', { stage: 'recognition' }, 40, [
      'You have started warming up your own way instead of just copying mine exactly. Good instinct.',
      'I caught you watching how I talk to nervous trainers before I noticed you watching. Fair. I would watch too.',
      'Delia asked, in her way, who the trainer who actually listens to me was. I told her your name properly, for once.',
      'You have not once asked if I am going to challenge the gym myself. I notice the restraint.',
      'I have started explaining the warm-up in more than the usual three sentences, for you specifically.',
      'You come back to this same spot near the entrance now. I have noticed. I have decided to enjoy it.',
      'You ask what actually helps before a real match, not just what looks impressive. Correct order.',
      'I trust your read on whether someone is ready or just pretending to be, nearly as much as my own.',
      'You ask what I actually do here, beyond warming people up. Uncomfortably good question.'
    ]),
    pool('stage-comfortable', 'friendshipStages', { stage: 'comfortable' }, 40, [
      'I told you about the door. Most people just get the joke about it.',
      'You asked why I have never knocked, and I actually answered instead of deflecting for once.',
      'Delia lets you stand near the drill line now without comment. That almost never happens for anyone I bring round.',
      'I have stopped performing "endlessly encouraging Ace" quite so hard around you specifically.',
      'You sat through an entire slow afternoon of warm-ups without once suggesting I skip to the real fight.',
      'I trust your judgment on whether a newcomer is actually ready nearly as much as my own gut.',
      'There is a spot by the entrance that is basically yours now, if you ever want to just watch for a while.',
      'Delia would call this "unusually generous access to my actual thoughts," and for once she would not be wrong.',
      'You ask what is actually going on with me before you ask about the next challenger. I have noticed, and I like it.'
    ]),
    pool('stage-beginning', 'friendshipStages', { stage: 'beginning' }, 40, [
      'I told you about the three years properly, for once, and you did not make it bigger than it was.',
      'You said avoiding the door was still a kind of choosing, and I have not entirely stopped thinking about that since.',
      'The door has your visit attached to it now, somehow, in my own head if nowhere else.',
      'I have started actually picturing knocking on it instead of just joking about someday.',
      'You do not flinch when I admit I am scared to try. Most people just say "so try," which helps less than they think.',
      'Delia wants your opinion on something now too, apparently. That is not nothing, coming through her.',
      'I told you the plain version of what is actually keeping me at the entrance. It is a smaller reason than I made it sound.',
      'You are welcome to argue with any joke I make about the door. I would rather be caught out than believed by mistake.',
      'There is a page in my head now, if not literally on paper, of reasons that turned out not to be reasons at all.'
    ]),
    pool('stage-friend', 'friendshipStages', { stage: 'friend' }, 40, [
      'You know which cheerfulness is real and which one is just the job. I have stopped hiding the difference from you.',
      'I let you see how nervous I actually am about the door. Most people never get shown that at all.',
      'You bring up the challenge before I can deflect it again. I have started letting you win that race.',
      'I trust your judgment on whether I am actually ready nearly as much as Delia\'s, and I do not say that lightly.',
      'The entrance has stopped feeling like the whole point of me being here. I choose to believe that means something.',
      'I have stopped performing confidence I do not have, around you specifically. It is a relief, oddly.',
      'You are the reason I finally said the gym leader\'s name out loud instead of just calling it "the door." Consider this the thanks I am bad at giving directly.',
      'We should watch a real challenger together sometime. Not to warm anyone up. Just to watch.',
      'Delia calls you "the trainer who actually gets him talking." Coming from her, that is the whole compliment.'
    ]),
    pool('stage-trusted', 'friendshipStages', { stage: 'trusted' }, 40, [
      'I told you I was scared knocking would cost me who I am here, before I had worked out whether that fear was fair. You did not rush me to an answer.',
      'You get the honest count of how many years I actually spent avoiding it, not the version where it was only a few months.',
      'I do not need you to confirm a challenge is a good idea anymore before I trust it myself. That took a while to build.',
      'You know the two things that actually make me admit I am stalling, without me listing them again.',
      'I told you about the morning the entrance genuinely felt like a cage instead of a home base. The uncomfortable parts included.',
      'We disagree about whether staying at the entrance forever would have been the safer choice. I have started thinking you might have a point either way.',
      'I trust you with an unfinished decision now, which is further than I extend most people who only hear the finished ones.',
      'You are one of maybe two people who have seen me genuinely uncertain about something.',
      'I trust you with a decision before I know how it turns out. That is further than I extend most people who only hear how it ended.'
    ]),
    pool('stage-close', 'friendshipStages', { stage: 'close' }, 40, [
      'The door has my name attached to it now, properly, and you were there for that, which felt correct rather than incidental.',
      'You ask what I actually want before you ask what is safest. I have started expecting that, and preferring it.',
      'I do not perform the endlessly-ready-Ace bit for you at all anymore. You have seen me actually scared, plainly, and never once made it smaller than it was.',
      'There is no version of a real challenge out here that I do not want to tell you about, plain or otherwise.',
      'I still warm people up more than most Aces bother to. I have simply stopped mistaking that for having no ambitions of my own.',
      'You are allowed to call out a deflection mid-sentence now, not just afterward. I have extended that to exactly one other person, and she does it constantly.',
      'Ask me the plain version of anything I am avoiding. I would rather you heard it true than heard it comfortable.',
      'Same entrance tomorrow, probably a slightly bolder me after that, and somehow you make either version feel worth turning up for.',
      'Years of treating the door like someone else\'s to knock on, and you are the reason I finally understand why it was always mine too.'
    ]),
    pool('post-the-same-door', 'postEvent', { completedEventIds: ['ace1-folk-warmup-event-the-same-door'], recentEventIds: ['ace1-folk-warmup-event-the-same-door'] }, 90, [
      'I said the gym leader\'s actual name again today, easily this time, no bracing beforehand.',
      'You still ask when I am knocking before you ask how the warm-ups are going. Fair, given what actually mattered that week.',
      'I have not gone back to just calling it "the door" since. Small habit. Sticking, so far.',
      'Delia asked if I had actually decided yet. I told her soon, which is apparently rare enough that she raised an eyebrow.',
      'I caught myself deflecting a different decision last week. I named it plainly instead, on purpose.',
      'The entrance has not changed. I have decided that is fine either way, for now.',
      'You were there for the plain version of that conversation. I still think about that more than I let on.',
      'A newer trainer asked me the same question I once dodged. I gave them the honest answer this time.',
      'I have not needed three years to say a hard thing out loud since. Turns out naming it early works better.',
      'The joke about the door still gets a laugh. It just is not the only thing I say about it anymore.'
    ], { acknowledgesEventId: 'ace1-folk-warmup-event-the-same-door' }),
    pool('post-knocking-for-once', 'postEvent', { completedEventIds: ['ace1-folk-warmup-event-knocking-for-once'], recentEventIds: ['ace1-folk-warmup-event-knocking-for-once'] }, 91, [
      'The challenge happened, by the way, in case Delia has not already told everyone in the quarter.',
      'You still ask how it felt before you ask who won. Fair, given what actually mattered that day.',
      'I warm up trainers and take my own turns now, both, same week even. Turns out I get to do both.',
      'I do not need every warm-up to end with someone else at the door anymore. Most days. I am working on the rest.',
      'You watched me actually knock, the first time. I have not forgotten who was there for that.',
      'Delia still gives that same short nod sometimes. I am still oddly proud of it every single time.',
      'A newer trainer asked if I ever challenge the gym myself now. I got to say yes, properly, for once.',
      'The three-year joke about the door is retired. I have a new one about actually going through it.',
      'I have started telling people the truth about being scared first, before the encouraging part. Turns out that lands better.'
    ], { acknowledgesEventId: 'ace1-folk-warmup-event-knocking-for-once' }),
    pool('location-quarter', 'location', { location: 'quarter' }, 60, [
      'This entrance is mine, mostly by habit, and because someone has to greet the nervous ones first.',
      'Delia runs the drill line, precise as ever, for longer than I have been doing warm-ups here.',
      'Osk trains quietly at the far end. We nod. Neither of us interrupts the other\'s routine.',
      'Beauty holds court near the benches most afternoons. I let her; it is good for morale.',
      'Rocker drifts through sometimes, humming something, definitely not warming up for anything specific.',
      'The referee keeps things fair for the serious challenges. I keep things gentle for the nervous ones.',
      'Champ trains up past the far door, rarely seen, constantly discussed. I have my own door to worry about.',
      'This whole quarter runs on the same rotation of regulars finding their spot every single day. I am, unmistakably, one of them.',
      'Ask anyone here how long I have run the warm-ups and you will get a slightly different, slightly generous number every time.'
    ]),
    pool('location-town', 'location', { location: 'town' }, 55, [
      'I leave the quarter rarely, and usually only to remind myself the rest of town exists.',
      'Half of town assumes I am always warming someone up. Mostly correct, admittedly.',
      'The quarter does not miss me for an afternoon. It used to feel like it would. I have decided that is progress.',
      'People expect an Ace Trainer to be intimidating. I specialize in the opposite, on purpose.',
      'If I am not at the quarter, ask Delia. She will know, generally, before I do.',
      'The general store keeps a running tally of how many nervous trainers I have sent their way for supplies. I choose not to ask the number.'
    ]),
    pool('mood-tense', 'recentMoodRumor', { mood: 'tense' }, 75, [
      'Bad day at the entrance. Nothing was actually wrong and I still could not settle into the routine.',
      'I almost talked myself out of the whole idea again today. Did not. Barely.',
      'Give me a minute before you ask how it is going. The honest answer needs more thought than I currently have for it.',
      'Delia asked about the door again today and I deflected harder than usual. That is more about me than her.',
      'Something about today did not sit right, and I have not worked out why. Give it time.',
      'I need quiet, not encouragement, for a while today. Stay if you like. Do not fill the silence on my behalf.',
      'A newcomer asked why I never challenge the gym myself, bluntly, today, and I had no good answer ready. That one stung more than it should have.'
    ]),
    pool('mood-content', 'recentMoodRumor', { mood: 'content' }, 55, [
      'Good day. I warmed up six trainers and every single one of them actually listened.',
      'Delia actually laughed today, briefly, at something I said. Rare enough to mention on its own.',
      'Nobody needed the difficult version of anything from me today. The plain version was enough, and it was good.',
      'I said the gym leader\'s name out loud today without even noticing I had done it. Progress, apparently.',
      'A nervous trainer came back after their first loss instead of quitting. Small thing. Made my whole week.',
      'A genuinely good day here, by my standard, which admittedly has a low bar most days.',
      'Delia told me a warm-up I ran actually worked on someone stubborn. Coming from her, that is a full parade.'
    ]),
    pool('item-circuittoken', 'itemPokemon', { itemIds: ['circuitToken'] }, 72, [
      'A proper keepsake. I will actually keep this one somewhere I can see it, for once.',
      'Delia will pretend this means nothing and then ask where you got it by next week. Watch.',
      'I collect a few of these, quietly, from people who make it through the door eventually. This one counts.',
      'This might be the first thing anyone has given me here that I did not immediately talk myself out of deserving.',
      'Fair warning: I will absolutely tell people this came from someone who actually finished their warm-up properly.',
      'A good keepsake and a good week pair well. Thank you, genuinely.',
      'I am difficult to buy for, apparently, since I claim to want nothing and mean almost none of it. This one I mean.',
      'This is going somewhere I will actually see it every day, not a drawer. Small change, on purpose.'
    ]),
    pool('pokemon-machop-quarter', 'itemPokemon', { pokemonSeen: [66] }, 70, [
      'One of these trains here most mornings, same as the rest of us. Kes claims it as his unofficial mascot.',
      'Delia insists it keeps better form than half the trainers who come through. I have watched it. She is not wrong.',
      'It matches its reps to whoever is warming up beside it, near enough. I find that oddly encouraging.',
      'It showed up the same week I started running warm-ups here. I have decided that means something, sentimentally.',
      'Osk says it spars fair, which from him is real praise.',
      'It is, against all expectation, good for morale. People warm up harder with it watching.'
    ]),
    pool('repeat-talk', 'repeatInteraction', { repeatAtLeast: { talks: 8 } }, 45, [
      'Same entrance, same question on your face. No, I have not knocked yet, before you ask.',
      'You know the routine by now. Same warm-up, same encouragement, same running joke about the door.',
      'Come on in. Mind the loose paving near the benches; I keep meaning to flag it to someone who can fix it.',
      'Warm-up talk, an excuse for why I have not knocked, or just standing here while I work up the nerve. All three remain on offer.',
      'Nothing dramatic happened since we last spoke. I noticed the small things anyway, because you would ask.',
      'You keep turning up at this entrance. I have stopped being surprised and started simply expecting it.',
      'Same question, same honest answer: ask Delia if you want the real standards; ask me if you want the nerve to try anyway.',
      'Come on down. Delia is at the drill line, being considerably more patient than usual lately.',
      'The excuse gets smaller every time you ask. I have noticed. I am choosing to take that as progress.',
      'You have a standing welcome at this entrance now. I do not extend those to just anyone who walks through.',
      'Same entrance, same warm-up, same general refusal to knock quickly. I would not trade it for a faster nerve.'
    ]),
    pool('rare-full-circle', 'rare', { location: 'quarter', completedEventIds: ['ace1-folk-warmup-event-knocking-for-once'], minStage: 'trusted' }, 108, [
      'Delia sent a newer trainer my way on purpose, for the warm-up specifically. That is new, coming from her.',
      'I have knocked twice now without needing three years of nerve beforehand. I am choosing to be alarmed about that later.',
      'The door, Delia\'s nod, and a newer trainer who came back after losing: apparently this is what actually trying looks like, close up.',
      'Sit a while, if Aces sit. The warm-up can wait, the nerve already showed up once, and today, for once, so did I.'
    ])
  ];

  window.CORE_CAST_DIALOGUE = window.CORE_CAST_DIALOGUE || {};
  window.CORE_CAST_DIALOGUE.ace1 = D;
})();
