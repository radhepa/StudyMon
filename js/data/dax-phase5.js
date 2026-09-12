/* Phase 5 Slice 4: Tier 2 batch, the Compiler Café counter (2 of 2) - Dax
   (the "dax" cast entry). Every string is a complete contextual response;
   categories count responses rather than fragments, same convention as
   sci-oak-phase5.js and oz-phase5.js/sal-phase5.js. Dax is Tier 2, so he
   gets no CAST_BIBLES entry - his voice and arc live entirely in this file
   and in his dedicated FOLK_EVENTS['fixture'] arc (see folk-events.js). He
   was carved out of the shared 'dreamer' archetype alongside Mo (see
   barista-phase5.js) in the same batch, so this content does not leak onto
   the other dreamer-archetype townsfolk (Nel, Sasha, Juno, Rook). Dax and
   Mo's arcs complete each other by ordinary narrative reference only - see
   each character's Event 2 - not the relationshipIds gate; see
   oz-phase5.js's header comment and the Phase 5 handoff's "Known risks" for
   why. */
(function () {
  function pool(id, category, when, priority, lines, extra) {
    var value = { id: 'dax-dialogue-' + id, category: category, when: when || {}, priority: priority || 0, lines: lines };
    if (extra) Object.keys(extra).forEach(function (key) { value[key] = extra[key]; });
    return value;
  }

  var D = [
    pool('first-meeting', 'firstMeeting', { firstMeeting: true }, 120, [
      'I have been in this chair since ten. Give me a reason to stand up.',
      'Dax. Ask Mo about me and she will tell you I have not moved in hours. She is not wrong.',
      'This is my chair, informally. Nobody has contested it in years, which I choose to take as a compliment.',
      'You want the honest version of why I am here or the version that makes for a better story? I only really have the honest one.',
      'Mo keeps refilling my cup whether I ask or not. I have stopped questioning the arrangement.',
      'Ask me anything. I have nowhere else to be, which is either freeing or a small crisis, depending on the day.',
      'Sit if you want. The chair across from me gets used more than you would think.',
      'I have watched most of this café\'s regulars come and go from this exact seat. Occupational hazard of sitting still.',
      'Mo will tell you I have been here since ten. She would be right, and I am not particularly ashamed of that.',
      'Welcome to the café. Take any table except mine. Mine is, structurally, spoken for.'
    ]),
    pool('stage-acquaintance', 'friendshipStages', { stage: 'acquaintance' }, 40, [
      'You came back. Most people see me in this chair once and assume there is nothing more to say.',
      'You asked why I never leave, not just whether I would move. Different question. Better one.',
      'I have started saving you the chair across from mine. Small thing, from someone who barely moves for anything.',
      'You did not ask if I am always here. You just assumed it, correctly, and moved on. I respect that.',
      'Mo mentioned you asked about me. I will pretend that does not interest me. It interests me.',
      'You sat a while without demanding conversation. Rare, in someone new.',
      'Come by again. I will still be in this chair, almost certainly.',
      'I remember your name, which for me, sitting still all day, is unusually good going.',
      'You have not yet asked me to just stand up already. I am choosing not to test that patience.'
    ]),
    pool('stage-recognition', 'friendshipStages', { stage: 'recognition' }, 40, [
      'You have started asking what I am actually doing here, not just commenting on the chair. Better question.',
      'I caught you glancing at the envelope in my coat before I noticed you noticing. Observant.',
      'Mo asked, in passing, who the trainer who actually talks to me was. I told her your name correctly, which is rare for me.',
      'You have not once told me to just get up already, unlike literally everyone else who has met me.',
      'I have started actually answering your questions instead of deflecting them with a joke.',
      'You return to the same seat across from me now. I have noticed. I am pretending I have not.',
      'You ask what I am avoiding instead of just what I am doing. Uncomfortably accurate question.',
      'Come find me before you head off. I like reporting the day\'s nothing to someone specific.',
      'You have started asking what is actually in my pocket instead of pretending not to notice it.'
    ]),
    pool('stage-comfortable', 'friendshipStages', { stage: 'comfortable' }, 40, [
      'I showed you the envelope. Most people just get the joke about the chair.',
      'You asked why I have not opened it, and I actually answered instead of deflecting for once.',
      'Mo lets you sit at my table without comment now. That almost never happens for anyone I let sit here.',
      'I have stopped performing the "permanent fixture" bit quite so hard around you.',
      'You sat through an entire afternoon of me saying almost nothing and did not once suggest I do something else instead.',
      'I trust your read on whether I am actually fine or just saying so nearly as much as Mo\'s.',
      'There is a second chair here now that is, unmistakably, yours when you want it.',
      'Mo would call this "unusually generous access to my actual table," and for once she would be right.',
      'You ask what is actually going on before you ask if anything is biting, so to speak. I appreciate the order.'
    ]),
    pool('stage-beginning', 'friendshipStages', { stage: 'beginning' }, 40, [
      'I told you about the envelope properly, for once, and you did not make it bigger than it was.',
      'You said not deciding was still a decision, and I have not entirely stopped thinking about that since.',
      'The envelope has your visit attached to it now, somehow, in my own head if nowhere else.',
      'I have started actually considering the offer instead of just carrying it around unopened.',
      'You do not flinch when I admit I am scared to decide. Most people just say "so decide," which helps less than they think.',
      'Mo wants your opinion on something now too, apparently. That is not nothing, coming through her.',
      'I told you the plain version of what is actually keeping me in this chair. It is a smaller reason than I made it sound.',
      'You are welcome to argue with any excuse I give you about the chair. I would rather be caught out than believed by mistake.',
      'There is a page in my head now, if not literally on paper, of reasons that turned out not to be reasons at all.'
    ]),
    pool('stage-friend', 'friendshipStages', { stage: 'friend' }, 40, [
      'You know which stillness is actually rest and which one is just avoidance. I have stopped hiding the difference from you.',
      'I let you see the envelope before I had decided what to do with it. Most people never get shown that at all.',
      'You bring up the decision before I can deflect it again. I have started letting you win that race.',
      'I trust your judgment on whether I am actually ready nearly as much as Mo\'s, and I do not say that lightly.',
      'The chair has stopped feeling like the whole point of me being here. I choose to believe that means something.',
      'I have stopped performing contentment I do not have, around you specifically. It is a relief, oddly.',
      'You are the reason I finally read the letter instead of just carrying it around. Consider this the thanks I am bad at giving directly.',
      'We should sit here again sometime. Not to decide anything. Just to sit, the way we used to before there was anything to decide.',
      'Mo calls you "the trainer who actually gets him talking." Coming from her, that is the whole compliment.'
    ]),
    pool('stage-trusted', 'friendshipStages', { stage: 'trusted' }, 40, [
      'I told you I was scared the offer was real, before I had worked out whether that fear was fair. You did not rush me to an answer.',
      'You get the honest count of how many days I actually spent avoiding it, not the version where it was only a few.',
      'I do not need you to confirm a decision is right anymore before I trust it myself. That took a while to build.',
      'You know the two things that actually make me admit I am avoiding something, without me listing them again.',
      'I told you about the morning the chair genuinely felt like a trap instead of a comfort. The uncomfortable parts included.',
      'We disagree about whether staying would have been the safer choice. I have started thinking you might have a point either way.',
      'I trust you with an unfinished decision now, which is further than I extend most people who only hear the finished ones.',
      'You are one of maybe two people who have seen me genuinely uncertain about something.',
      'I trust you with a decision before I know how it turns out. That is further than I extend most people who only hear how it ended.'
    ]),
    pool('stage-close', 'friendshipStages', { stage: 'close' }, 40, [
      'The chair has someone else\'s name attached to it now, and you were there for that, which felt correct rather than incidental.',
      'You ask what I actually want before you ask what is safest. I have started expecting that, and preferring it.',
      'I do not perform the unbothered-fixture bit for you at all anymore. You have seen me actually scared, plainly, and never once made it smaller than it was.',
      'There is no version of a real decision out here that I do not want to tell you about, plain or otherwise.',
      'I still sit still more than most people. I have simply stopped mistaking that for having no choices.',
      'You are allowed to call out an excuse mid-sentence now, not just afterward. I have extended that to exactly one other person, and she does it constantly.',
      'Ask me the plain version of anything I am avoiding. I would rather you heard it true than heard it comfortable.',
      'Same café tomorrow, probably a different chair after that, and somehow you make either one feel worth turning up for.',
      'Years of treating stillness like safety, and you are the reason I finally understand why moving mattered all along.'
    ]),
    pool('post-the-unopened-envelope', 'postEvent', { completedEventIds: ['dax-folk-fixture-event-the-unopened-envelope'], recentEventIds: ['dax-folk-fixture-event-the-unopened-envelope'] }, 90, [
      'I read the letter properly, that night, like I said I would.',
      'The envelope is not in my pocket anymore. It is filed, plainly, wherever letters are supposed to go.',
      'You still ask what it actually said before you ask how I feel about it. I have started expecting that question first, from anyone.',
      'I have not gone back to carrying things around unopened since. Small habit. Sticking, so far.',
      'Mo asked if I finally did it. I told her yes, which is apparently rare enough that she checked twice.',
      'I caught myself avoiding a different decision last week. I opened it early instead, on purpose.',
      'The chair has not changed. I have decided that is fine either way, for now.',
      'You were there for the plain version of that night. I still think about that more than I let on.',
      'A second letter arrived since. I opened it the same day, which felt like proof of something.',
      'I have not needed three weeks to open something since. Turns out opening things early works better.'
    ], { acknowledgesEventId: 'dax-folk-fixture-event-the-unopened-envelope' }),
    pool('post-leaving-the-chair-for-now', 'postEvent', { completedEventIds: ['dax-folk-fixture-event-leaving-the-chair-for-now'], recentEventIds: ['dax-folk-fixture-event-leaving-the-chair-for-now'] }, 91, [
      'The apprenticeship is going, by the way, in case Mo has not already told everyone in town.',
      'You still ask when I am coming back before you ask how it is going. Fair, given what actually mattered that day.',
      'Kip still has the chair. I have decided I am, mostly, fine with that.',
      'I send word properly now, opened, the way I said I would.',
      'You watched me actually stand up and leave, the first time. I have not forgotten who was there for that.',
      'I still sit down more than most people, out of habit. I have just started noticing when it is habit and when it is actually rest.',
      'Mo says the café is quieter without the running joke about my chair. I choose to take that as a compliment.',
      'I do not need to have every answer before I leave for something anymore. Most days. I am working on the rest.',
      'The letters keep coming, opened, on time. Small thing. I am oddly proud of it.'
    ], { acknowledgesEventId: 'dax-folk-fixture-event-leaving-the-chair-for-now' }),
    pool('location-cafe', 'location', { location: 'cafe' }, 60, [
      'This chair by the window is mine, mostly by habit rather than any actual claim on it anymore.',
      'Mo runs the counter. Has, for longer than I have been sitting here, which is itself a considerable while.',
      'Nel\'s group meets two tables over on Thursdays. I have absorbed more of their arguments than I would like to admit.',
      'Sasha will debate you about anything given half a chance. I let her practice on me sometimes, out of boredom more than interest.',
      'Juno comes in near closing most nights. We have never once overlapped long enough to actually talk.',
      'Rook does the crossword at the corner table for hours. I have started guessing answers silently just to have something to do.',
      'Kip covers the counter and, apparently, my chair now too, on his breaks.',
      'This whole café runs on the same handful of people showing up in roughly the same order every day. I am, unmistakably, one of them.',
      'Ask anyone in here how long I have had this seat and you will get a different, exaggerated number every time.'
    ]),
    pool('location-town', 'location', { location: 'town' }, 55, [
      'I leave the café rarely, and usually only because Mo has physically run out of coffee.',
      'Half of town assumes I never move. For a long time, they were correct.',
      'The café does not miss me for an afternoon anymore. It used to. I have decided that is progress.',
      'People expect someone who sits still all day to have nothing going on. I used to prove them right on purpose.',
      'If I am not at the café, ask Mo. She will know, generally, before I do.',
      'The general store has started keeping an eye out for letters addressed to me. Small consistency I did not expect to rely on.'
    ]),
    pool('mood-tense', 'recentMoodRumor', { mood: 'tense' }, 75, [
      'Bad day in this chair. Nothing was actually wrong and I still could not settle.',
      'I almost threw the envelope away today instead of dealing with it properly. Did not. Barely.',
      'Give me a minute before you ask how it is going. The honest answer needs more thought than I currently have for it.',
      'Mo asked about the letter again today and I deflected harder than usual. That is more about me than her.',
      'Something about today did not sit right, and I have not worked out why. Give it time.',
      'I need quiet, not conversation, for a while. Stay if you like. Do not fill the silence on my behalf.',
      'A regular asked why I never leave, bluntly, today, and I had no good answer ready. That one stung more than it should have.'
    ]),
    pool('mood-content', 'recentMoodRumor', { mood: 'content' }, 55, [
      'Good day. I finished my coffee without needing three refills to get through it.',
      'Mo actually sat down across from me for a minute today. Rare enough to mention on its own.',
      'Nobody needed the difficult version of anything from me today. The plain version was enough, and it was good.',
      'I stood up and stretched today without an actual reason to. Progress, possibly.',
      'The chair got used by someone else briefly today while I ran an actual errand. Strange. Fine, though.',
      'A genuinely good day here, by my standard, which admittedly has a low bar most days.',
      'Mo told me a joke and I laughed properly instead of just acknowledging it. Rare enough to note.'
    ]),
    pool('item-tinyumbrella', 'itemPokemon', { itemIds: ['tinyUmbrella'] }, 72, [
      'A tiny paper umbrella. Exactly the correct amount of effort for a drink I am not even having.',
      'Mo will pretend this is ridiculous and then put it in her own drink by next week. Watch.',
      'I will find a use for this that is not the obvious one, purely out of stubbornness.',
      'This might be the first thing anyone has given me here that I did not immediately question the point of.',
      'Fair warning: I will absolutely leave this in my drink for far longer than is structurally sound.',
      'A café and a paper umbrella pair oddly well. Thank you, genuinely.',
      'I am difficult to buy for, apparently, since I claim to want nothing and mean almost none of it. This one I mean.',
      'This will not survive contact with my drink for long. I intend to enjoy the brief overlap regardless.'
    ]),
    pool('pokemon-combee-cafe', 'itemPokemon', { pokemonSeen: [415] }, 70, [
      'One of these has been getting into the pastry case for weeks. Mo has given up chasing it off properly.',
      'It only ever bothers my table, according to Mo. I have watched it visit every table equally. She remains unconvinced by my testimony.',
      'Rook leaves it a crumb deliberately, apparently. I have decided not to mention that to anyone official.',
      'It shows up right before the afternoon rush, reliably enough that I have started expecting it before Mo does.',
      'Skiff apparently sees a whole cluster of them near the shore. Explains a great deal about where ours disappears to.',
      'It is, against everyone\'s better judgment, good for business. People ask about it more than they ask about me some days.'
    ]),
    pool('repeat-talk', 'repeatInteraction', { repeatAtLeast: { talks: 8 } }, 45, [
      'Same chair, same question on your face. No, nothing new since this morning.',
      'You know the routine by now. Sit across from me, same as always.',
      'Come sit. Mind Mo\'s mood if the machine is acting up; I have learned to read the signs.',
      'Café talk, an excuse for why I have not moved, or just sitting while I fail to make a decision. All three remain on offer.',
      'Nothing dramatic happened since we last spoke. I noticed the small things anyway, because you would ask.',
      'You keep turning up at this table. I have stopped being surprised and started simply expecting it.',
      'Same question, same honest answer: ask Mo if you want the real advice; ask me if you want the excuses.',
      'Come on down. Mind the wet floor near the door; Mo has been meaning to mention it to someone for weeks.',
      'The excuse gets bigger or smaller depending on my mood. Ask twice and you might get two different reasons.',
      'You have a standing invitation to this table now. I do not extend those to just anyone who sits down.',
      'Same chair, same coffee, same general refusal to make a decision quickly. I would not trade it for a faster life.'
    ]),
    pool('rare-full-circle', 'rare', { location: 'cafe', completedEventIds: ['dax-folk-fixture-event-leaving-the-chair-for-now'], minStage: 'trusted' }, 108, [
      'Mo sent a letter back, for once, instead of just handing me a coffee and calling it a conversation.',
      'I have not sat in one place for more than an hour today. I am choosing to be alarmed about that later.',
      'The envelope, Mo\'s letter, and a chair somebody else now sits in: apparently this is what actually deciding looks like, close up.',
      'Sit a while. The coffee can wait, the decision already got made, and today, for once, so can I.'
    ])
  ];

  window.CORE_CAST_DIALOGUE = window.CORE_CAST_DIALOGUE || {};
  window.CORE_CAST_DIALOGUE.dax = D;
})();
