/* Phase 5 Slice 2: Tier 2 vertical slice - Dr. Oakes (the "sci-oak" cast entry).
   Every string is a complete contextual response; categories count responses
   rather than fragments, same convention as the Phase 4 folk-sourced files.
   Dr. Oakes is Tier 2 (supporting cast), not Tier 1, so he gets no CAST_BIBLES
   entry - validateCastEntries() rejects a bible on a non-Tier-1 registry
   entry by design. His voice, arc and relationships live entirely in this
   dialogue file and in his dedicated FOLK_EVENTS.emeritus arc (see
   folk-events.js), the same split Kern/Linden/Hawthorn used in Phase 4,
   scaled down to Tier 2's two-event target instead of four. He was carved
   out of the shared 'scholar' archetype first (cls changed from 'Archivist
   Emeritus' to 'Lab Archivist Emeritus' in townsfolk.js) so this content does
   not leak onto the other scholar-archetype townsfolk. */
(function () {
  function pool(id, category, when, priority, lines, extra) {
    var value = { id: 'sci-oak-dialogue-' + id, category: category, when: when || {}, priority: priority || 0, lines: lines };
    if (extra) Object.keys(extra).forEach(function (key) { value[key] = extra[key]; });
    return value;
  }

  var D = [
    pool('first-meeting', 'firstMeeting', { firstMeeting: true }, 120, [
      'Ten badges to get this far, and you still have to wait for me to finish a sentence. I am told that is fair.',
      'I am Dr. Oakes. Emeritus, which is a polite word for "still here, technically retired."',
      'I taught for thirty years before I stepped back from the lecture side of things. I have not stepped back from the archive.',
      'Ask me a real question and I will give you a real answer, at whatever length the answer actually needs.',
      'Most visitors expect a museum piece. I am closer to a very opinionated card catalogue.',
      'Professor Linden runs the lab now. I ran it before her, and taught her before that, in roughly that order.',
      'I am selective about who gets an afternoon of my time. You have apparently qualified. Do not waste it.',
      'Sit if you like. The good chair squeaks. I have never fixed it on purpose; it tells me when someone has sat down.',
      'I set a personal bar of ten badges before I bother with visitors. You cleared it. I hope you find the archive worth the wait.',
      'Most people ask what I discovered. Better question: what did I get wrong for thirty years before anyone noticed?'
    ]),
    pool('stage-acquaintance', 'friendshipStages', { stage: 'acquaintance' }, 40, [
      'You came back. Most people treat one conversation with an old archivist as sufficient for a lifetime.',
      'You asked a follow-up question instead of thanking me and leaving. Promising.',
      'I have started setting aside the transcripts you might actually find interesting. A small thing.',
      'You did not call me "professor." I have not held that title in years. I noticed you got it right.',
      'The squeaky chair has your dent in it now, more or less. Sit wherever you like.',
      'I filed our last conversation under "worth continuing." That is a narrower category than you might think.',
      'You ask what a document says before you ask how old it is. Correct order, for once.',
      'I do not remember most visitors by name after a week. I remember yours already.',
      'You are welcome to sit and read while I work. Silence is a perfectly acceptable form of company down here.'
    ]),
    pool('stage-recognition', 'friendshipStages', { stage: 'recognition' }, 40, [
      'You have started asking what a correction actually changed, not just that one was made. That is the harder, better question.',
      'I let you read one of the old transcripts unsupervised. That is not nothing, from me.',
      'You noticed the wrong margin note before I pointed it out. I was, briefly, impressed.',
      'Linden asked, in passing, who the trainer bothering me with good questions was. I told her your name correctly.',
      'You have stopped apologizing for taking up my time. Good. I offered it; use it.',
      'I keep your questions in the same mental drawer as the ones worth answering properly.',
      'You return a borrowed page in the same condition you found it. Rarer than it should be.',
      'I have started explaining things at the speed I actually think, rather than the speed I lecture. Faster, for what it is worth.',
      'You return with a genuine follow-up rather than a fresh unrelated question. That is a discipline most visitors never build.'
    ]),
    pool('stage-comfortable', 'friendshipStages', { stage: 'comfortable' }, 40, [
      'I showed you the transcript with my own error in it. Most visitors get the tidy version. You get the actual archive.',
      'You asked why I kept teaching something I no longer believed the department valued. I gave you the honest answer, not the graceful one.',
      'The squeaky chair is, at this point, simply your chair. I have stopped pretending otherwise.',
      'I trust your read on an old page nearly as much as my own, which took considerably longer to extend to a colleague than it did to you.',
      'You sat through the long version of a story I usually cut short. I noticed, and did not cut it short again.',
      'I have started keeping two cups down here. One is, unmistakably, for you.',
      'You ask good questions about bad decades-old decisions. I find that a more useful skill than most in this lab credit it for.',
      'Linden would call this "unusually generous access," and she would not be entirely wrong.',
      'You ask what a document actually proves before you ask how impressive it sounds. I trust that instinct more than most credentials.'
    ]),
    pool('stage-beginning', 'friendshipStages', { stage: 'beginning' }, 40, [
      'I told you about the four cohorts I taught the same wrong proof to. You did not once try to make me feel better about it.',
      'You said a correction I made was overdue, plainly, and you were right, and I did not particularly enjoy hearing it. I still asked you to keep saying things like that.',
      'The archive board has your initials on a correction now, alongside mine. Small. Earned.',
      'I revised a standing claim of mine because you asked one inconvenient question I could not talk my way around.',
      'You do not flinch when I concede I was wrong for thirty years about something. Most people wait for me to look embarrassed first. I generally do not.',
      'I have started reading you the parts of the archive I usually keep for myself.',
      'You are welcome to argue with an old conclusion of mine directly. I would rather be corrected properly than agreed with politely.',
      'Linden wants your read on a disputed page too, apparently. That is not a small invitation, coming secondhand through her.',
      'You have started asking what a decades-old decision cost, not just what it accomplished. That is the more honest ledger.'
    ]),
    pool('stage-friend', 'friendshipStages', { stage: 'friend' }, 40, [
      'You know which shelf I go to when I am avoiding a decision. I have stopped pretending otherwise around you.',
      'I let you see the page with Linden\'s name on it before I decided what to do about it. Most people never see that drawer at all.',
      'You bring me questions I have not asked for anymore, and I read every one properly, not politely.',
      'I trust your judgment on an old document nearly as much as hers, and I do not extend that comparison lightly.',
      'The squeaky chair has stopped squeaking quite so loudly. I choose to believe that means something.',
      'I have stopped performing certainty around you. It is, unexpectedly, a relief.',
      'You are the reason the correction slip went up at all rather than sitting in a drawer for another decade. I am not thanking you formally. Consider this that.',
      'We should go through the older boxes together sometime. Not for a correction. Simply to see what is in them.',
      'I have started saving you the interesting mistakes instead of only the tidy conclusions. The mistakes are usually the better story.'
    ]),
    pool('stage-trusted', 'friendshipStages', { stage: 'trusted' }, 40, [
      'I told you what I planned to say to Linden before I managed to actually say it. You did not tell me to hurry, which helped more than hurrying would have.',
      'You get the drawer with my genuine mistakes now, not the version I would show a visiting colleague.',
      'I do not double-check your reading of an old page anymore. Once was enough, from you.',
      'You know the two things that make me actually admit I was wrong, without me listing them again.',
      'I read you the sentence I most did not want to write. The uncomfortable parts included.',
      'We disagree about how a page from my own hand should be filed. I want your objection in writing before I decide.',
      'I trust you with an unfinished correction now, which is further than I extend most people who still have their eyesight for the fine print.',
      'You are one of perhaps three people who have seen me genuinely undecided about something.',
      'I trust you with a page before it is ready to be right yet. That is further than I extend most former colleagues.'
    ]),
    pool('stage-close', 'friendshipStages', { stage: 'close' }, 40, [
      'The corrected transcript has both our initials pinned beside it now, and I checked the order twice, out of habit, not doubt.',
      'You ask what I actually want to go back through next, not what would look tidy on a shelf. I am still adjusting to being asked that.',
      'I do not perform composure for you anymore. You have seen me frustrated with my own younger self, and never once treated it as a verdict on my judgment now.',
      'There is no version of the archive board without your initials near mine at this point.',
      'I still keep every wrong page. They have simply stopped being solitary evidence of failure, is all.',
      'You are permitted to challenge my filing now, not just my findings. I have extended that to exactly one other person before you, and she runs this lab.',
      'Ask me the difficult question about my own career. I would rather you did than that you waited for a kinder moment.',
      'Same shelves tomorrow, same squeaking chair, and I find I am, against long habit, looking forward to it.',
      'Thirty years of teaching, and you are the reason I finally understand what a colleague is supposed to feel like.'
    ]),
    pool('post-marginal-note', 'postEvent', { completedEventIds: ['sci-oak-folk-emeritus-event-the-marginal-note'], recentEventIds: ['sci-oak-folk-emeritus-event-the-marginal-note'] }, 90, [
      'The correction slip is still pinned beside the old wrong version. I have not needed to explain why twice.',
      'I still keep the page with my own error on it. It has earned its place more than most of the correct ones.',
      'You still ask what the archive says now instead of what I published thirty years ago. I have started expecting that question.',
      'Linden\'s first proof sketch stays in the same folder as my correction now. I moved it there on purpose.',
      'I caught myself about to repeat the old wrong version out of habit last week. I stopped myself before finishing the sentence.',
      'The shelf stayed one transcript tidier, and considerably more honest, since that afternoon.',
      'A visiting student asked why I keep the disproven version pinned up at all. I gave her the honest answer this time, not the polished one.',
      'You were there when I found Linden\'s first attempt underneath my own. I still think about that order more than I say.',
      'A colleague asked why I bothered correcting something so old. I told her the honest reason: because it was still being taught as true.',
      'I have not repeated the wrong version since, not even as a cautionary example. It no longer feels like mine to repeat.'
    ], { acknowledgesEventId: 'sci-oak-folk-emeritus-event-the-marginal-note' }),
    pool('post-only-sentence', 'postEvent', { completedEventIds: ['sci-oak-folk-emeritus-event-the-only-sentence-he-has-not-rehearsed'], recentEventIds: ['sci-oak-folk-emeritus-event-the-only-sentence-he-has-not-rehearsed'] }, 91, [
      'I said the plain version to Linden directly. I have not needed a card to say it since.',
      'You still ask whether I have said the important thing yet, before you ask about the archive. Fair, given the precedent.',
      'Linden has not brought it up again. I take that as her way of keeping it, rather than dismissing it.',
      'I stopped drafting things I intend to say out loud anyway. It turns out four true words do not need three attempts on paper.',
      'You watched me finally manage a sentence I had rehearsed badly for thirty years. I have not forgotten who was standing there.',
      'A colleague asked if retirement had made me sentimental. I told her the honest, unflattering version: it made me overdue, not sentimental.',
      'The torn-up card is still in the bin under my desk. I have chosen not to tidy it away yet.',
      'I do not wait for the right moment to say something true anymore. Most days. I am working on the rest.',
      'Kern asked what finally changed. I told him nothing changed. I simply ran out of reasons to keep postponing it.',
      'Linden mentioned the moment once, briefly, weeks later, as if checking it had actually happened. I confirmed that it had.'
    ], { acknowledgesEventId: 'sci-oak-folk-emeritus-event-the-only-sentence-he-has-not-rehearsed' }),
    pool('location-lab', 'location', { location: 'lab' }, 60, [
      'This corner has been mine since before most of the current staff were trainers themselves.',
      'The shelving is alphabetized by a system only I fully understand, which I consider a feature.',
      'Kern brings the delivery crates past this desk on purpose. It is the only reliable way to make me look up from a transcript.',
      'The centrifuge hums off-key two rooms over. I have stopped noticing it, which took about a decade.',
      'Visitors assume the archive is decoration. It is closer to a second, slower-moving laboratory.',
      'That drawer sticks in humid weather, same as the lab door does. Nobody has fixed either on principle at this point.',
      'This is where the older work actually lives, while the newer work gets all the attention two rooms over.',
      'The chair by my desk squeaks. I have had thirty years to fix it and have chosen, deliberately, not to.',
      'Linden\'s desk is two rooms over. Close enough to hear an argument start; far enough not to be blamed for it.',
      'This lab has outlasted three of my retirement announcements. I have stopped announcing them.'
    ]),
    pool('location-town', 'location', { location: 'town' }, 55, [
      'I come into town rarely, and mostly for the same two reasons: correspondence, and a coffee that is not lab coffee.',
      'Half of town still calls me "professor," out of old habit rather than accuracy. I have stopped correcting all of them.',
      'The archive does not miss me for an afternoon. I have made my peace with that, mostly.',
      'People expect a retired academic to reminisce constantly. I mostly just want the coffee.',
      'If you need me and I am not at the lab, the walk into town rarely takes me anywhere interesting. Try the lab first.',
      'Bell at the post counter still addresses my letters to "Professor," decades on. I have given up correcting her too.',
      'I do not linger in town longer than the errand requires. There is always a page somewhere better spent on.'
    ]),
    pool('mood-tense', 'recentMoodRumor', { mood: 'tense' }, 75, [
      'I found another old error today. I would rather not discuss the specifics until I have stopped being annoyed at my younger self.',
      'A correction I filed decades late got a pointed question today. I answered it honestly, which did not make it comfortable.',
      'Give me a moment before you ask what is wrong. I am still deciding how much of it was actually avoidable.',
      'Something did not reconcile in the older records today, and it will resolve, and I remain irritated regardless.',
      'I need quiet, not solutions, for a while. Stay if you like. Do not tidy anything yet.',
      'Linden said something briskly efficient today. She almost certainly meant well. I am still faintly annoyed.',
      'A page did not reconcile with my own memory of writing it. That is a stranger, colder feeling than being simply wrong.',
      'I would rather sit with it in silence than explain it badly right now. Come back this afternoon.'
    ]),
    pool('mood-content', 'recentMoodRumor', { mood: 'content' }, 55, [
      'I found a transcript today that held up perfectly after thirty years. That happens rarely enough to mention.',
      'I finished a correction I had been putting off and did not immediately find the next one to dread. Restful, briefly.',
      'Nobody needed correcting today, and the coffee in town was passable. A genuinely good day, by my standard.',
      'The archive is in order, the chair still squeaks appropriately, and I sat down for an actual meal. Recommended.',
      'I am in an uncharacteristically good mood and have decided not to interrogate it too closely.',
      'A student found something I had missed for years and seemed almost apologetic about it. I told her not to be.',
      'Linden stopped by just to borrow a pen and stayed twenty minutes without an agenda. I will take the good mood at face value.',
      'I reread an old lecture today and found it still held up. Small vindication, thirty years late, still worth having.'
    ]),
    pool('item-teatin', 'itemPokemon', { itemIds: ['teaTin'] }, 72, [
      'Tea, properly kept, outlasts most of the arguments people have over it. I approve of the gift on principle.',
      'I will put this in the good tin, not the one Kern raids on delivery days.',
      'Thank you. Plainly, not as the reflex word people generally mean it as.',
      'I have been difficult to buy for since I retired the lecture circuit. This is, unusually, exactly right.',
      'A decent tea tin has outlasted three departmental reorganizations in this lab. I trust it will outlast a few more.',
      'Linden drinks the lab coffee out of stubbornness, not preference. I have never understood it. This, I understand.',
      'I will ration it properly rather than finish the tin in a week out of enthusiasm, which is exactly what I did the last time.'
    ]),
    pool('pokemon-porygon-lab', 'itemPokemon', { pokemonSeen: [137] }, 70, [
      'That is the lab\'s Porygon. It sorted my entire archive once, uninvited, and I did not agree with all its choices.',
      'It has opinions about filing that I have never fully reconciled with my own. We have reached an uneasy truce.',
      'It recognizes which drawer holds the oldest material and avoids it, which I choose to interpret as respect.',
      'Linden designed half its sorting logic herself, back when she still had time to. I recognize her hand in it immediately.',
      'It does not react to most visitors down here. It reacted to you almost at once, which I noted and said nothing about at the time.',
      'I designed the earliest version of its sorting habits, before Linden rebuilt most of it properly. A few of my instincts survived the rebuild.'
    ]),
    pool('repeat-talk', 'repeatInteraction', { repeatAtLeast: { talks: 8 } }, 45, [
      'Same shelves, same question on your face. Yes, the archive is still standing.',
      'I already explained the filing system once. It has not changed its logic since yesterday, nor will it.',
      'You know where the good chair is. Sit. Mind the squeak; it is load-bearing to my mood, apparently.',
      'Archive talk, an old story, or simply sitting while I finish a page. All three remain on offer.',
      'Nothing dramatic happened since we last spoke. I logged the small things anyway, because you would ask.',
      'You keep finding your way down here. I have stopped being surprised and started simply expecting it.',
      'Same question, same honest answer: check the correction board, then ask me if anything is unclear.',
      'Come in. Mind the crate by the door; Kern left it exactly where it should not be, again.',
      'You have a standing welcome down here now. I do not extend those loosely.',
      'Same lab, same squeak, and somehow it is never actually the same conversation. I have noticed that too, same as Linden does.'
    ]),
    pool('rare-full-circle', 'rare', { location: 'lab', completedEventIds: ['sci-oak-folk-emeritus-event-the-only-sentence-he-has-not-rehearsed'], minStage: 'trusted' }, 108, [
      'Linden stopped by this corner today, unprompted, just to look at the shelves. She has not done that in years.',
      'I did not plan to become the sort of retired academic people still sought out. I am finding I do not mind it.',
      'The correction board has three sets of initials on it now: mine, Linden\'s first attempt, and yours, somewhere in the margin of all of it.',
      'Sit a moment. The archive can wait, the coffee is bad regardless of timing, and today, for once, so can I.'
    ])
  ];

  window.CORE_CAST_DIALOGUE = window.CORE_CAST_DIALOGUE || {};
  window.CORE_CAST_DIALOGUE['sci-oak'] = D;
})();
