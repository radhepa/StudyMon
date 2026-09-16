/* Phase 4 character batch: c-hawthorn (Professor Hawthorn). Every string is a
   complete contextual response; categories count responses rather than
   fragments. Hawthorn is folk-sourced (Calc-region townsfolk), not a bespoke
   companion: his four heart events live directly in FOLK_EVENTS.archivist
   (see folk-events.js). This slice splits him out of the shared
   `Pokémon Professor` -> `professor` archetype he transiently inherited from
   Linden's Slice 9 batch: his `cls` is now the unique 'Observatory Director',
   mapped in CLASS_STORY to a new 'archivist' archetype, so his content no
   longer leaks onto Linden and hers no longer leaks onto him. There is no
   legacy consolidation step here — this is his first dedicated content. */
(function () {
  function pool(id, category, when, priority, lines, extra) {
    var value = { id: 'c-hawthorn-dialogue-' + id, category: category, when: when || {}, priority: priority || 0, lines: lines };
    if (extra) Object.keys(extra).forEach(function (key) { value[key] = extra[key]; });
    return value;
  }

  var D = [
    pool('first-meeting', 'firstMeeting', { firstMeeting: true }, 120, [
      'You have interrupted a measurement. I will forgive it, provisionally, if you turn out to be worth the interruption.',
      'Professor Hawthorn. Seven badges before I consider you a serious correspondent; fewer than that, you are merely early.',
      'Solveig will have told you what I do here. Assume she was precise about it. She generally is.',
      'I observe long, slow things: weather, series, the patience required to distinguish a pattern from a coincidence.',
      'Ask a real question if you have one. I have considerably less patience for the ceremonial kind than my formality suggests.',
      'The observatory is cold at night and warmer in argument. Both, I am told, are part of the charm.',
      'I do not flatter beginners and I do not dismiss them either. You will find out shortly which category you occupy.',
      'Return when you have observed something worth my interrupting a measurement for. I mean that literally, not as a threshold.'
    ]),
    pool('stage-acquaintance', 'friendshipStages', { stage: 'acquaintance' }, 40, [
      'You asked a precise question this time, rather than a general one. Noted, and appreciated.',
      'You did not touch the instruments before asking. That alone distinguishes you from most visitors.',
      'I have begun writing your name correctly in the log, rather than "the trainer." A small formality. It matters to me.',
      'You waited for the reading to finish before speaking. I am unreasonably grateful for that kind of patience.',
      'Solveig mentioned you returned a borrowed reference without dog-earing it. I noted that with some approval.',
      'The observatory is not, generally, a social space. You are welcome regardless, provisionally.',
      'I do not yet know if you are here for the sky or for something to say about it later. Ask me again once you decide.',
      'You have not once used the word "stargazing" in my presence. I consider that an excellent start.',
      'Come back after dusk if you would like an actual demonstration rather than a description of one.',
      'I remain, for now, cautiously willing to be interrupted by you again.'
    ]),
    pool('stage-recognition', 'friendshipStages', { stage: 'recognition' }, 40, [
      'You noticed the drift in the old instrument before I mentioned it. That is not a small thing to notice unprompted.',
      'Solveig says you ask her real questions, not just questions meant for me. I approve of that distinction.',
      'You return at the hours I actually keep, rather than the hours a visitor typically prefers. Convenient, and telling.',
      'I have started explaining the qualifications behind a claim to you, rather than just the claim. You seem to want both.',
      'You did not repeat the reading back to me as though checking my arithmetic. I noticed the restraint.',
      'The archive staff mentioned you asked a genuinely specific question about the indexing. Rare, from a visitor.',
      'You have stopped calling the deck instruments "telescopes" collectively. Precision, however small, is still precision.',
      'I have begun to suspect you may have actually noticed something out here, rather than simply enjoyed the view.',
      'Come by on an archive day. The instruments are more interesting with context than without it.',
      'You are, cautiously, becoming someone whose questions I look forward to rather than merely tolerate.'
    ]),
    pool('stage-comfortable', 'friendshipStages', { stage: 'comfortable' }, 40, [
      'I let you read a draft before it left the observatory. That is not a casual permission, from me.',
      'You caught an inconsistency in one of my own footnotes. I corrected it and did not resent the correction.',
      'The instrument deck door has a particular latch. You know it now, the same as Solveig does.',
      'I have started asking what you actually think of a conclusion, rather than whether you find it impressive.',
      'You sat through a full explanation of a measurement\'s qualifications without once asking for the short version.',
      'I keep old, imprecise instruments rather than replacing them. You are the only regular who has ever asked why, properly.',
      'The long-term record has a note in the margin now, in your hand rather than mine. I left it there deliberately.',
      'I trust your reading of an instrument nearly as much as Solveig\'s. That is considerable, from me.',
      'You ask good questions. I do not say that often, and I do not say it lightly.',
      'Stay while I finish this measurement. The company changes very little about the accuracy and rather a lot about the evening.'
    ]),
    pool('stage-beginning', 'friendshipStages', { stage: 'beginning' }, 40, [
      'I told you why I keep the instrument uncorrected. You did not once suggest I simply fix it.',
      'You told me a conclusion of mine looked stronger than the evidence behind it. I checked. You were correct.',
      'Solveig says you ask her the same exacting questions you ask me. I consider that a compliment to us both.',
      'I revised a public claim because of something you noticed. The footnote records it plainly, with your name attached.',
      'You do not flinch when I qualify a statement into near nothing. Most people wait for me to simply commit.',
      'The archive roster lists you as a correspondent now, rather than a visitor. A small, deliberate change.',
      'I asked what you actually thought of my methodology and meant the question. You answered it. I am still considering the answer.',
      'We disagreed about a claim\'s scope and neither of us backed down cleanly. I count that as considerable progress.',
      'You are welcome to challenge a conclusion of mine directly. I would rather be corrected precisely than agreed with vaguely.',
      'Linden wishes to hear your reading of the disputed record as well. That is not a small invitation, from her either.'
    ]),
    pool('stage-friend', 'friendshipStages', { stage: 'friend' }, 40, [
      'You know which page of the log I return to when a measurement will not settle. I no longer hide that from you.',
      'I let you sit in on the review where Solveig corrected my own table. Most visitors never see that particular formality fail.',
      'You bring me observations I did not ask for now. I read every one, formally, and mean it each time.',
      'I trust your read on a disputed record nearly as much as Linden\'s, and I extend that comparison rarely.',
      'The observatory\'s resident Hoothoot has taken an interest in you. It takes an interest in very few people.',
      'I have stopped performing certainty in your presence. It is, unexpectedly, a considerable relief.',
      'You are the reason the last correction went out promptly rather than eventually. I am not thanking you formally. Consider this the thanks.',
      'We should walk the instrument deck together some clear night. Not to measure anything. Simply to walk it.',
      'I keep your name near the front of the credit list now, not folded into an appendix.',
      'Same observatory, same cold, and somehow the conversation is never quite the one we had before. I have noticed that.'
    ]),
    pool('stage-trusted', 'friendshipStages', { stage: 'trusted' }, 40, [
      'I told you what I would do if the long-term record came back inconclusive, before anyone required me to plan for it.',
      'You receive the log with my crossed-out qualifications now, not the clean copy I show a visiting committee.',
      'I no longer double-check your readings. Once, from you, has become sufficient.',
      'Solveig and I share the archive oversight properly now, and you are a considerable part of why that arrangement exists.',
      'You know the specific phrasing that means I am conceding a point, without me explaining it again.',
      'I read you the qualification I was most reluctant to add. The uncomfortable clauses included.',
      'We disagree about next season\'s claim. I want your objection recorded in writing before I finalize anything.',
      'I trust you with unpublished observations now. That is further than I extend most colleagues.',
      'Come with me to file the next record. Your name belongs on the cover, not merely the acknowledgments.',
      'You are the only person outside the observatory who has seen me genuinely undecided about a conclusion.'
    ]),
    pool('stage-close', 'friendshipStages', { stage: 'close' }, 40, [
      'The long-term record carries both our names now, and I checked the ordering twice, from habit rather than doubt.',
      'You ask what I actually wish to observe next, not what would read as responsible to a committee. I am still adjusting to being asked that.',
      'I no longer perform composure around you. You have seen me genuinely uncertain, and you never once mistook it for incompetence.',
      'The next record is considerably larger. I want you present from its first page, not consulted once it is finished.',
      'There is no version of the archive\'s credit page without your name recorded near the top of it.',
      'I still keep every imprecise instrument. They have simply stopped being a solitary kind of evidence.',
      'You are permitted to challenge my habits now, not merely my conclusions. I have extended that to exactly one other person before you.',
      'The observatory has a second chair at the instrument deck that has started to look like yours. I noticed before remarking on it.',
      'Ask the difficult question. I would rather you did than that you waited politely for a more convenient night.',
      'Same instrument deck tomorrow, same cold, and this time we will divide the late watch evenly.'
    ]),
    pool('post-imperfect-instrument', 'postEvent', { completedEventIds: ['c-hawthorn-folk-archivist-event-earn-access-to-an-imperfect-instrument'], recentEventIds: ['c-hawthorn-folk-archivist-event-earn-access-to-an-imperfect-instrument'] }, 90, [
      'The old instrument still reads three degrees off true. I have stopped considering that a flaw worth correcting.',
      'The decision to decline the recalibration is recorded in the log now, beside the day it was made. I have not needed to explain it twice.',
      'You still ask what a measurement\'s error has taught before you ask why it was not corrected. I have started expecting that order.',
      'The visiting engineer wrote once more, offering again. I gave her the same honest answer, more briefly the second time.',
      'I caught myself nearly apologizing for the drift last week. I stopped myself before finishing the sentence.',
      'The logbook stayed exactly as inconsistent, and considerably more honestly explained, since that evening.',
      'A colleague asked why I keep an instrument I know to be wrong. I gave her the real answer this time, not the polite one.',
      'You helped me annotate the older volumes that night. I still find your corrections in the right margins.',
      'I do not defend a flawed instrument out of sentiment alone anymore. The record gets the final say, as always, but I mean it more precisely now.',
      'The next instrument, when it eventually arrives, will keep its own drift on record from the first day. I have already decided that much.'
    ], { acknowledgesEventId: 'c-hawthorn-folk-archivist-event-earn-access-to-an-imperfect-instrument' }),
    pool('post-disputed-record', 'postEvent', { completedEventIds: ['c-hawthorn-folk-archivist-event-compare-a-disputed-record-with-linden'], recentEventIds: ['c-hawthorn-folk-archivist-event-compare-a-disputed-record-with-linden'] }, 91, [
      'The joint footnote with Linden still stands, unedited, exactly as we agreed to it.',
      'I do not send a reply to her without having Solveig check the tables first. That step is no longer optional.',
      'You still ask whose data was actually wrong before you ask who apologized. I have started expecting that order as well.',
      'Linden has written twice since, disputing smaller things, considerably more amicably each time.',
      'I keep the corrected draft, qualifications and all, rather than a clean final version. It is the more honest of the two.',
      'Solveig does not wait for me to notice her corrections anymore. She states them, and I have learned to simply say thank you.',
      'I do not treat a disagreement with Linden as a contest anymore. Most days. I am working on the remainder.',
      'A colleague asked how Linden and I manage to disagree so often without apparent malice. I gave her the honest, unglamorous answer.',
      'The footnote crediting all three of us is still the one I am proudest of this year.',
      'I am not drafting a reply without checking the tables first again. I meant that the first time and I mean it still.'
    ], { acknowledgesEventId: 'c-hawthorn-folk-archivist-event-compare-a-disputed-record-with-linden' }),
    pool('post-bounded-claim', 'postEvent', { completedEventIds: ['c-hawthorn-folk-archivist-event-choose-a-bounded-claim-for-publication'], recentEventIds: ['c-hawthorn-folk-archivist-event-choose-a-bounded-claim-for-publication'] }, 92, [
      'The published claim remains narrower than the data technically allowed. It has also, so far, remained entirely true.',
      'The student who asked the difficult question has since asked two more of similar difficulty. I have started answering promptly.',
      'You still ask what a claim actually rests on before you ask whether it is impressive. Considerably the better question.',
      'New evidence arrived, three months on, that would have quietly undercut the larger claim I nearly made. The narrow one held.',
      'I no longer treat a smaller conclusion as a lesser one. Most days. I am, again, working on the remainder.',
      'A visiting committee asked whether the claim was worth publishing at all, given its modesty. I gave them the footnote as my answer.',
      'The first-year who found the gap in my evidence has since been credited in two further papers, mine included.',
      'Being cautious in public did not cost me anything I have missed. I have started saying that plainly, to students who need to hear it.',
      'I reread that footnote rather more than is strictly necessary. I have stopped being embarrassed about admitting so.',
      'I qualify a claim more readily now, and regret it rather less than I once expected to.'
    ], { acknowledgesEventId: 'c-hawthorn-folk-archivist-event-choose-a-bounded-claim-for-publication' }),
    pool('post-archive-open', 'postEvent', { completedEventIds: ['c-hawthorn-folk-archivist-event-open-the-archive-to-successor-observations'], recentEventIds: ['c-hawthorn-folk-archivist-event-open-the-archive-to-successor-observations'] }, 93, [
      'The archive runs, formally, without requiring me to be the only one who can read it. That took some years to arrange.',
      'Solveig and the visiting student both log entries now, in their own hands, without waiting for my review first.',
      'You ask how the archive is holding up before you ask what I have observed lately. I have started answering both, in that order.',
      'Linden and I share the indexing without dispute now. I confess I still find that faintly remarkable.',
      'The opening page still credits every contributor by name, in the order the work occurred. I check it more than is strictly necessary.',
      'I go out to the instrument deck more freely now. The archive does not require my constant presence to remain accurate.',
      'A colleague asked whether I regretted opening the method to successors. I told her the honest answer: less each season.',
      'The archive has entries in three different hands now, continuing past wherever my own notes happen to stop.',
      'I still find something to reorganize when I visit. There is simply rather less of it than there used to be.',
      'Ask me again in a decade whether handing it over was a loss. I suspect I already know, and am simply not yet willing to say so plainly.'
    ], { acknowledgesEventId: 'c-hawthorn-folk-archivist-event-open-the-archive-to-successor-observations' }),
    pool('pre-gym', 'gymStory', { homeBadgeBand: 'early', location: 'observatory:instrument-deck' }, 70, [
      'Seven badges before I consider you a serious correspondent. Fewer than that, you are simply early, which is not a fault.',
      'You are still counting badges under your breath at the instrument deck door. It will not alter the total.',
      'Take the weather log with you if you are heading out. It is precise, so return it precise, not merely returned.',
      'I cannot accompany you into a gym. I can have a proper conversation prepared for when you return from one.',
      'A badge is a measurement, not a verdict. I dislike the metaphor as much as you likely do, and it remains accurate.',
      'Solveig logged your gym date before you mentioned it to either of us. The archive schedule made it apparent.',
      'Go when you are genuinely prepared, not merely when you feel prepared. The two are rarely identical at your stage.',
      'Whatever occurs in there, the long-term record still needs annotating this evening. A small comfort. A genuine one.',
      'You require no permission from me to attempt this. You have it regardless.',
      'Return and tell me the part that nearly failed before the part everyone else will ask about. I find it the more useful account.'
    ]),
    pool('story-middle', 'gymStory', { homeBadgeBand: 'middle' }, 50, [
      'You describe your battles differently now. Less as anecdote, more as observation. I approve of the shift.',
      'Halfway through any long endeavor is where the untested assumptions surface. Yours are surfacing precisely on schedule.',
      'Your questions have sharpened considerably since we began. I notice that rather more than I notice your badge count.',
      'You ask what specifically went wrong in a loss now, not merely whether you prevailed. A considerably better question.',
      'I hear of your battles from Solveig before you mention them yourself. The accounts mostly withstand scrutiny.',
      'You have begun checking your own preparation before a gym without prompting. A good habit. I will claim partial, unearned credit.',
      'Bring me an ordinary observation sometime, not merely badge news. Those are rarer than you would expect.',
      'You need not sound certain about the next gym. Uncertain and prepared may occupy the same clause.',
      'The observatory roster no longer asks whether the trainer is still about. It assumes so, correctly.'
    ]),
    pool('post-gym', 'gymStory', { homeBadgeBand: 'late', location: 'observatory:instrument-deck' }, 70, [
      'You returned standing differently, even fatigued. The badge count does not record that particular detail.',
      'One further line in a considerably long record. Heavier than the line itself suggests.',
      'Tell me the decision nobody prepared you to make in there before you tell me the outcome.',
      'You made a determination in there with no established procedure behind it. That is the part I genuinely respect.',
      'I logged the badge total already. Solveig will ask before I do, which tells you something about the two of us.',
      'The instrument deck remained exactly as I left it, as promised. Whatever occurred in there did not alter that arrangement.',
      'Sit before you report anything. The record can wait a quarter hour. It generally can.',
      'Whatever occurred in there, the archive schedule did not move. Neither did I.',
      'Same deck, same cold, and you appear rather more like a correspondent than a visitor now.'
    ]),
    pool('location-observatory', 'location', { location: 'observatory' }, 60, [
      'The observatory runs cold after dusk and considerably warmer in argument. Both, I am assured, are part of the appeal.',
      'That brass fitting has been polished so often it no longer shows its actual age. I am aware of the irony.',
      'Solveig restocks the requisitions before I have finished noticing the shortage. Comes with long practice.',
      'Visitors assume an observatory runs on funding. It runs on precise habit and Solveig declining to let anything slip.',
      'The lower shelf holds every superseded instrument I have owned. I have not yet found the will to remove any of them.',
      'This building keeps its own particular silence after midnight, distinct from ordinary quiet.',
      'Most of the genuine work here happens well after any committee would consider it a reasonable hour.',
      'The Hoothoot in the rafters has opinions about visitors. It has not yet complained about you.',
      'The second chair at the instrument deck was, until recently, simply called "the spare." Nobody calls it that anymore.'
    ]),
    pool('location-instrument-deck', 'location', { location: 'instrument-deck' }, 60, [
      'The deck\'s oldest instrument drifts three degrees off true. I have decided, formally, that this is acceptable.',
      'Clear nights are rarer here than the brochures imply. I would rather have one honest cloud than a dishonest promise of none.',
      'That railing has held steady through considerably worse weather than tonight\'s. I trust it more than most colleagues.',
      'The log beside the largest instrument has four decades of the same careful hand in it, mine, until recently.',
      'I keep a kettle up here specifically so the cold stops being an argument against staying longer.',
      'The deck faces exactly the direction it needs to. That took considerably longer to arrange than it looks.',
      'Nobody sleeps well up here the first night. Most adjust to it by the third. Reliable, in its way.',
      'This is where the actual observation happens, while any committee elsewhere debates what to call the results.',
      'The chair by the largest instrument used to be mine exclusively. It no longer is, and I find I do not mind.'
    ]),
    pool('location-archive', 'location', { location: 'archive' }, 60, [
      'The archive holds every log I have kept and, as of recently, several I did not keep alone.',
      'That drawer is filed slightly out of order on purpose. It discourages the people who should not be browsing it.',
      'Regional archive days start earlier than I would prefer and end considerably later than scheduled. Reliable, if inconvenient.',
      'The index has three overlapping systems in it now. Only one of them is presently correct, and I am fixing that.',
      'Visitors assume an archive is simply storage. It is closer to an argument, conducted very slowly, in ink.',
      'The oldest volumes are the most fragile and, unhelpfully, also the most frequently requested.',
      'I annotate the weather beside every measurement in here. It has saved more conclusions than it has complicated.',
      'This is where a disagreement gets settled properly, given enough patience and sufficiently precise footnotes.',
      'The newest shelf holds entries in three different hands now. I check it rather more often than is strictly necessary.'
    ]),
    pool('location-town', 'location', { location: 'town' }, 60, [
      'Half of town assumes I am nocturnal by temperament rather than by profession. Both, as it happens, are true.',
      'I visit town for exactly two reasons: requisitions, and telling Solveig something in person rather than by note.',
      'The notice board carries an outdated lecture announcement of mine. I have stopped correcting it.',
      'People assume long observation implies patience with small talk. It implies the opposite, generally.',
      'The archivist\'s supply desk stocks my requisitions before I request them, sparing us both a tedious exchange.',
      'I am recognizable by the instrument case before anyone recognizes my face. I have made my peace with that.',
      'Town is smaller than it appears, once you have disputed a measurement with most of the people in it.',
      'If you require me and I am not at the observatory, assume the archive, then the instrument deck, in that order.'
    ]),
    pool('mood-tense', 'recentMoodRumor', { mood: 'tense' }, 75, [
      'I am not fit for methodological discussion tonight. Ask again once I have stopped rereading the same qualification.',
      'A reading failed to reconcile today, and the fault was mine, not an assistant\'s. I would rather state that plainly than not.',
      'Allow me a moment before you ask what occurred. I am still determining how much of it was genuinely avoidable.',
      'Something in the record will not resolve tonight, and it will resolve eventually, and I remain irritated regardless.',
      'I require quiet rather than solutions for a short while. Remain if you wish. Do not attempt to correct anything yet.',
      'Linden said something needlessly blunt today. She likely meant well. I remain annoyed nonetheless.',
      'We may review the figures tomorrow. Tonight I would rather finish the filing in silence.',
      'I heard the apology. I remain frustrated about the remainder of it. Both may be true simultaneously.'
    ]),
    pool('mood-content', 'recentMoodRumor', { mood: 'content' }, 55, [
      'Every reading tonight reconciled with the model precisely. That occurs rarely enough to remark upon.',
      'I completed the week\'s correspondence early and did not immediately begin the next week\'s. Restful, briefly.',
      'Nobody required correcting today, and the tea was properly brewed. A genuinely good day, by my own measure.',
      'The Hoothoot was uncharacteristically sociable tonight. Small thing. Genuine pleasure.',
      'I am in an unusually good mood and have elected not to interrogate it further.',
      'The visiting student\'s revised figures returned clean. Small matter. Real relief.',
      'The long-term record came in ahead of its own conservative estimate. I will accept the pleasant surprise without suspicion, for once.',
      'The archive managed itself again today. I am choosing to enjoy that rather than audit it.'
    ]),
    pool('rumor-long-record', 'recentMoodRumor', { worldFlags: ['rumor:the-long-record'] }, 78, [
      'The rumor holds that I have already published the long-term record. I have not. I am still verifying the final decade.',
      'Someone is telling people the record proves the old measurements were fabricated. It proves them imprecise, not invented. A different claim entirely.',
      'The exaggerated account has me discarding forty years of instrument logs. I kept every one. An imprecise record is still a record.',
      'People keep asking whether the record contains something dramatic. The honest answer is "clarifying," which is less thrilling and more true.',
      'The market version claims Solveig runs the archive with no oversight whatsoever. She runs it well, which is a different claim.',
      'Someone credited the entire result to luck. Most of it was rereading the same figures three times, without any glamour to it.',
      'I will correct the account of the record myself, in due course, and allow the remainder of the rumor to run its course.'
    ]),
    pool('item-teatin', 'itemPokemon', { itemIds: ['teaTin'] }, 72, [
      'Tea, properly brewed, is the one imprecision I permit myself without qualification.',
      'Keep the tin sealed against the damp up here. I learned that the exact hard way, with a ruined first tin.',
      'I have a particular blend I rely on during the long watches. This is a very acceptable substitute, or addition.',
      'Most gifts are ceremony. This one is actually useful at three in the morning, which I value rather more.',
      'I will share a pot with you properly, up on the deck, rather than simply thank you for it down here.',
      'Thank you. I intend that plainly, not as the reflex the phrase has become for most people.',
      'This will go in the cupboard beside the instruments, not the kitchen. The higher honor, for what it is worth.',
      'A good tin of tea does not pretend to be more than it is. I find that an admirable quality in an object.',
      'I have become difficult to surprise on this front since someone first understood the correct gift. Fair warning, should you make a habit of it.',
      'Solveig says I am marginally less formal after the first cup. I would neither confirm nor entirely deny that.'
    ]),
    pool('pokemon-hoothoot', 'itemPokemon', { pokemonSeen: [163] }, 73, [
      'That is the observatory\'s resident Hoothoot. It keeps rather better hours than most of my visiting colleagues.',
      'It does not react to most people. It reacts to consistent, quiet habits, which suits this building precisely.',
      'It has taken to sitting nearest whichever instrument I am currently favoring. I have stopped considering that a coincidence.',
      'It sleeps through most of the daylight complaints made about this profession and wakes for all the interesting parts.',
      'I have logged its calls against the weather for years. The correlation is better documented than several published papers.',
      'It regards a clear night the way I do: with considerable suspicion that the streak will not last.',
      'It does not tolerate careless visitors particularly well. I have found this to be a reliable early indicator.',
      'Solveig feeds it on a schedule I did not design and would not dare adjust at this point.',
      'It watches the instrument deck door before anyone else notices someone has arrived. A better early warning than most systems here.',
      'I designed nothing about its behavior. I have simply spent considerable time noticing it. The distinction matters to me.'
    ]),
    pool('relationship-linden', 'relationships', { relationshipIds: ['linden'] }, 35, [
      'Linden and I dispute at least one conclusion annually. It is among the more reliable arrangements in my life.',
      'She commits to a claim first and revises loudly afterward. I qualify first and commit slowly. Between us, the record generally arrives correct.',
      'I send her disputed figures before I send them to anyone else. She will tell me plainly if I am mistaken.',
      'She credits every contributor in her own record now. I would like to think the habit runs in both directions between us.',
      'We have not agreed on a route in years and have never once ceased corresponding about it.',
      'My patience reads as hesitation to her, at a distance. Closer up it is closer to rigor. I do not always have patience for her lack of it.',
      'She asked after you specifically last season. That is not, from her, a small gesture.',
      'I trust her second read on a claim nearly as much as my own, and I extend that trust to very few people.',
      'We argue about publication timing constantly. Neither of us has ever conceded that argument out of mere impatience.',
      'She keeps every contributor\'s name in her record now. I recognized the habit before I adopted it properly myself.',
      'Linden does not flatter a beginner\'s work for kindness\'s sake. Neither do I. It is among the reasons the correspondence functions.',
      'I would trust Linden with an unfinished draft before I would trust most people with a completed one.'
    ]),
    pool('rare-archive-open', 'rare', { location: 'archive', completedEventIds: ['c-hawthorn-folk-archivist-event-open-the-archive-to-successor-observations'], pokemonCaught: [163], minStage: 'trusted' }, 110, [
      'Your Hoothoot and the observatory\'s are perched on the same shelf tonight. Unplanned, and I find I do not mind it.',
      'The credit page, the finished archive, and both our names recorded properly on the same line. I did not engineer this outcome. I will accept it regardless.',
      'I have kept a great many records out of this archive. Keeping one that no longer requires my constant presence is a different sensation entirely.',
      'The archive continued without me for an entire season. You observed it happen. I am still determining what that means for how I manage things.',
      'Sit a moment. The log can wait, the correction can wait, and tonight, for once, so can I.'
    ]),
    pool('repeat-talk', 'repeatInteraction', { repeatAtLeast: { talks: 8 } }, 45, [
      'Same deck, same question on your face. Yes, the record is still holding.',
      'I have already explained the instrument\'s drift once. It has not altered its answer since.',
      'You know where the spare logs are filed. Take one; tell me which line to annotate.',
      'Weather talk, archive gossip, or simply sitting while I finish a reading? All three remain available.',
      'Nothing remarkable occurred since we last spoke. I logged the minor details regardless, since you would ask.',
      'You continue to appear at the instrument deck. I have stopped being surprised and begun simply expecting it.',
      'Same question, same precise answer: consult the archive drafts, then ask me if anything remains unclear.',
      'I have a task in mind that involves you. It can wait until you say whatever you actually came to say.',
      'Come up. Mind the loose step; it has been loose longer than either of us has known each other.',
      'We have done this often enough that the greeting no longer requires saying. Sit down.'
    ])
  ];

  window.CORE_CAST_DIALOGUE = window.CORE_CAST_DIALOGUE || {};
  window.CORE_CAST_DIALOGUE['c-hawthorn'] = D;
})();
