/* Phase 4 character batch: Linden (Professor Linden, the "linden" cast entry).
   Every string is a complete contextual response; categories count responses
   rather than fragments. Linden is folk-sourced (townsfolk), not a bespoke
   companion: her four heart events live directly in FOLK_EVENTS.professor
   (see folk-events.js), replacing that archetype's pre-Phase-4 placeholder
   content. She keeps cls: 'Pokémon Professor' for now, so c-hawthorn
   transiently inherits this same arc until Slice 10 splits him into his own
   archetype (see the Phase 4 handoff). There is no legacy consolidation step
   here — this is her first dedicated content, not a migration. */
(function () {
  function pool(id, category, when, priority, lines, extra) {
    var value = { id: 'linden-dialogue-' + id, category: category, when: when || {}, priority: priority || 0, lines: lines };
    if (extra) Object.keys(extra).forEach(function (key) { value[key] = extra[key]; });
    return value;
  }

  var D = [
    pool('first-meeting', 'firstMeeting', { firstMeeting: true }, 120, [
      'You must be the new trainer everyone keeps describing in vague terms. Good. Vague is honest at this stage.',
      'I am Professor Linden. If you came for encouragement, the mart sells that. I deal in evidence.',
      'Kern will have already told you half of what I do here. Assume he is right; he usually is.',
      'Seven badges before I take you seriously as a correspondent. Fewer than that, I will still talk to you. I simply will not remember it well.',
      'Ask me a real question if you have one. I have very little patience for the ceremonial kind.',
      'Most people want a professor who tells them they are doing well. I will tell you what actually happened instead.',
      'The lab is loud, the coffee is bad, and the data is honest. Two out of three is still an improvement on most places.',
      'Come back when you have something worth reporting. I mean that as an invitation, not a dismissal.'
    ]),
    pool('stage-acquaintance', 'friendshipStages', { stage: 'acquaintance' }, 40, [
      'You brought back a location and a date. Half of what I need is exactly that, unprompted.',
      'Most people describe what they saw. You described where. I will take accuracy over enthusiasm every time.',
      'I filed your report under "reliable, unverified." The second word will change or it will not.',
      'You did not interrupt while I was thinking. Rarer than it should be.',
      'I have started writing your sightings down instead of just nodding at them.',
      'Kern mentioned you returned the loaner kit clean. Small thing. I noticed anyway.',
      'The coffee here is bad. I am not going to apologize for it or improve it.',
      'You ask before touching the specimen shelf. That is the correct order of operations.',
      'I do not remember most names from a single meeting. Yours, for now, I do.',
      'Come back with another sighting if you have one. I am not being polite. I mean it.'
    ]),
    pool('stage-recognition', 'friendshipStages', { stage: 'recognition' }, 40, [
      'You have started bringing dates and weather along with your sightings. That is not nothing.',
      'Two of your reports contradicted each other. You noticed before I did and said so. Good.',
      'I have stopped double-checking your counts against Kern\'s. That took a while to earn.',
      'You ask what a sighting is worth before you ask if it was interesting. Correct order, again.',
      'The lab\'s Porygon tolerates you now. It does not tolerate most people.',
      'I keep your reports in the same drawer as my own field notes now, not the visitor pile.',
      'You returned from the routes with a sighting nobody else logged that season. Useful.',
      'Hawthorn asked who the trainer bringing in the migration data was. I told him your name, correctly.',
      'You have not once tried to tell me what I wanted to hear. I have started expecting that from you.',
      'Come by before a survey next time. An extra set of eyes on the route is not a small thing.'
    ]),
    pool('stage-comfortable', 'friendshipStages', { stage: 'comfortable' }, 40, [
      'I let you read a draft before I sent it to the regional office. That is not a casual thing, from me.',
      'You caught an error in one of my own tables. I fixed it and did not resent you for finding it.',
      'The lab door sticks. You know which shoulder to use now, same as Kern.',
      'I have started asking what you actually think of a hypothesis, not just whether you agree with it.',
      'You sat through a full explanation without checking the time once. I noticed, and I appreciated it.',
      'I keep disproven sketches at the front of the binder. You are the only visitor who has ever asked to see them.',
      'The migration survey has your initials on two data points now. Earned, not given.',
      'I trust your field notes almost as much as my own. Almost is a great deal, from me.',
      'You ask good questions. I mean that as the highest compliment I currently have on offer.',
      'Stay while I finish this count. Talking through it helps more than silence would.'
    ]),
    pool('stage-beginning', 'friendshipStages', { stage: 'beginning' }, 40, [
      'I told you about the sketch I got wrong at nineteen. You did not once make it about reassuring me.',
      'You said I was wrong about a route once, plainly, and I checked, and you were right. I have not forgotten that.',
      'Kern says you ask him the same honest questions you ask me. That is a compliment to both of us.',
      'I revised a public claim because of something you noticed. It is in the notes, with your name attached.',
      'You do not flinch when I concede an error out loud. Most people wait for me to look upset about it first.',
      'The lab roster lists you as a correspondent now, not a visitor. Small change. I made it deliberately.',
      'I asked what you actually thought of my methodology, and meant it. You told me. I am still thinking about it.',
      'We disagreed about a conclusion and neither of us backed down cleanly. I count that as progress.',
      'You are welcome to challenge a claim of mine directly. I would rather be corrected than agreed with.',
      'Hawthorn wants to hear your read on the disputed section too. That is not a small invitation, from him.'
    ]),
    pool('stage-friend', 'friendshipStages', { stage: 'friend' }, 40, [
      'You know which page in the binder I go back to when I am stuck. I have stopped hiding that from you.',
      'I let you sit in on the review where Kern challenged my own draft. Most visitors never see that part.',
      'You bring me field notes I have not asked for anymore. I read every one.',
      'I trust your read on a disputed sighting nearly as much as Hawthorn\'s, and I do not say that lightly.',
      'The lab\'s Porygon follows you around now. It has opinions about very few people.',
      'I have stopped performing certainty around you. It is a relief, honestly, more than I expected.',
      'You are the reason the last correction letter went out on time. I am not thanking you formally. Consider this that.',
      'We should walk the early routes together sometime. Not for data. Just to walk them.',
      'I keep your name near the top of the credit list now, not buried in an appendix.',
      'Same lab, same coffee, and somehow it is never actually the same conversation. I have noticed that.'
    ]),
    pool('stage-trusted', 'friendshipStages', { stage: 'trusted' }, 40, [
      'I told you what I would do if the migration survey came back inconclusive, before anyone made me plan for it.',
      'You get the drawer with my crossed-out mistakes now, not the clean copy I show visiting committees.',
      'I do not double-check your field counts anymore. Once is enough, from you.',
      'Kern and I split the survey oversight properly now, and you are the reason that conversation ever started.',
      'You know the three things that make me actually admit I am wrong, without me listing them again.',
      'I read you the correction I was most reluctant to write. The uncomfortable parts included.',
      'We disagree about the route for next season. I want your objection in writing before I finalize it.',
      'I trust you with unpublished data now. That is further than I extend most colleagues.',
      'Come with me to file the next survey. Your name goes on the cover, not just the acknowledgments.',
      'You are the only person outside the lab who has seen me actually undecided about something.'
    ]),
    pool('stage-close', 'friendshipStages', { stage: 'close' }, 40, [
      'The migration survey has both our names on it, and I checked the order twice, out of habit, not doubt.',
      'You ask me what I actually want to look into next, not what would look responsible to fund. I am still adjusting to being asked that.',
      'I do not perform composure for you anymore. You have seen me frustrated, and you never once treated it as a verdict on my judgment.',
      'The next survey is bigger. I want you on it from the first page, not consulted after the fact.',
      'There is no version of the credit list without your name near the top of it.',
      'I still keep every disproven sketch. They have just stopped being solitary evidence, is all.',
      'You are permitted to challenge my habits now, not just my findings. I have extended that to exactly one other person before you.',
      'The lab has a spare desk that has started to look like yours. I noticed before I said anything about it.',
      'Ask me the hard question. I would rather you did than that you waited for a better moment.',
      'Same field station tomorrow, same coffee, and this time we split the early shift evenly.'
    ]),
    pool('post-disproven-sketch', 'postEvent', { completedEventIds: ['linden-folk-professor-event-revisit-a-disproven-field-sketch'], recentEventIds: ['linden-folk-professor-event-revisit-a-disproven-field-sketch'] }, 90, [
      'The corrected route sketch stays at the front of the binder. I have not needed to explain why twice.',
      'I still keep the wrong page. It has earned its place more than most of the right ones.',
      'You still ask what I believe now instead of what I published then. I have started expecting that question.',
      'The migration survey cites the correction properly. It reads better for admitting the mistake, not despite it.',
      'I caught myself about to defend an old claim out of habit last week. I stopped myself before finishing the sentence.',
      'The desk stayed one page shorter, and considerably more honest, since that evening.',
      'A visiting researcher asked why I keep disproven sketches at all. I gave her the honest answer this time.',
      'You helped me file the rest of the notes that night. I still find things in the right drawer because of it.',
      'I do not defend an old measurement just because it is mine anymore. The evidence gets the final say, same as always, but I mean it more now.',
      'The next page is still blank. I am in less of a hurry to fill it than I used to be.'
    ], { acknowledgesEventId: 'linden-folk-professor-event-revisit-a-disproven-field-sketch' }),
    pool('post-uncredited-contribution', 'postEvent', { completedEventIds: ['linden-folk-professor-event-confront-an-uncredited-contribution'], recentEventIds: ['linden-folk-professor-event-confront-an-uncredited-contribution'] }, 91, [
      'The grant letters go out with Kern\'s name spelled correctly now, every time. I check it myself.',
      'I stopped using the standing template. It is slower. It is also accurate, which matters more.',
      'You still ask whose work something actually was before you ask whether it succeeded. I have started expecting that order.',
      'The regional office has written to Kern directly twice since. He mentioned it like it was nothing. It was not nothing.',
      'I keep the messy draft with my corrections still visible. It is a better record than the clean copy would have been.',
      'Kern does not wait for me to notice his work anymore. He tells me, and I listen, and it is a considerable improvement.',
      'I do not draft a credit line without asking who actually did the work first. That used to be optional. It no longer is.',
      'A colleague asked how I finally got around to crediting my own aide properly. I told her the honest, unflattering version.',
      'The letter with both our names on it is still on the wall by the door. Neither of us has taken it down.',
      'I am not doing that again. I meant it the first time and I still mean it now.'
    ], { acknowledgesEventId: 'linden-folk-professor-event-confront-an-uncredited-contribution' }),
    pool('post-survey-decision', 'postEvent', { completedEventIds: ['linden-folk-professor-event-delegate-a-consequential-survey-decision'], recentEventIds: ['linden-folk-professor-event-delegate-a-consequential-survey-decision'] }, 92, [
      'The published section still carries the student\'s name beside mine, in the order the work was actually done.',
      'Hawthorn asked whether I regretted handing off the correction. I told him the true answer: rarely, and less each week.',
      'You still ask what a student found before you ask whether they were being difficult. I have started expecting that question too.',
      'The student who corrected me has since corrected two other papers, mine included. I consider that the entire point working.',
      'I do not treat a challenged conclusion as an attack anymore. Most days. I am working on the rest.',
      'The citation format took longer to finalize than the actual correction did. I have made my peace with academic bureaucracy.',
      'A visiting committee asked who else contributed to the survey. For once I had a full, accurate list ready.',
      'The student still checks in before publishing anything under my name. I have told them, several times now, that they do not have to.',
      'Being wrong publicly did not end anything. I have started saying that out loud, to students who need to hear it more than I do.',
      'I read a disputed claim differently now. Slower, and less like a verdict on whoever raised it.'
    ], { acknowledgesEventId: 'linden-folk-professor-event-delegate-a-consequential-survey-decision' }),
    pool('post-lab-thriving', 'postEvent', { completedEventIds: ['linden-folk-professor-event-leave-the-lab-and-return-to-find-it-thriving'], recentEventIds: ['linden-folk-professor-event-leave-the-lab-and-return-to-find-it-thriving'] }, 93, [
      'The lab ran itself while I was on the routes, and it did not do so by accident. I built that, eventually, on purpose.',
      'Kern still runs the place when I travel. I no longer come back checking for what went wrong first.',
      'You ask how the lab held up before you ask how the survey went. I have started answering both, in that order.',
      'I keep a note in the new binder: check in with Kern and the student, regularly, on purpose. I have kept it, so far.',
      'The migration windows do not worry me the way they used to. Someone is minding the door, properly, without my asking twice.',
      'I still find something to double-check when I get back. There is simply less of it to find, which is the actual change.',
      'A colleague asked if I had finally learned to delegate. I told her I had learned to trust the delegation, which is the harder part.',
      'The lab thrived without me standing over it. I am still, on occasion, mildly offended by how well that went.',
      'I go out on the routes more often now. The lab does not fall apart in my absence, which used to be the entire fear.',
      'Ask me again next season whether that was a relief or a loss. I suspect the answer has already changed.'
    ], { acknowledgesEventId: 'linden-folk-professor-event-leave-the-lab-and-return-to-find-it-thriving' }),
    pool('pre-gym', 'gymStory', { homeBadgeBand: 'early', location: 'linden-lab:lab-door' }, 70, [
      'Seven badges before I fight you myself. Fewer than that, and you are simply here early. That is not a complaint.',
      'You are still counting badges on your fingers in my doorway. It will not change the total.',
      'Take the field kit off the shelf if you are heading out. It is inventoried, so the flask comes back, not just the memory of it.',
      'I cannot walk into a gym with you. I can have a real conversation ready when you walk back out of one.',
      'The badge is a data point, not a verdict. I dislike the phrase as much as you probably do, and it is still true.',
      'Kern logged your gym date before you told either of us. The delivery schedule makes it obvious.',
      'Go when you are actually ready, not when you feel ready. The two are rarely the same thing at your stage.',
      'Whatever happens in there, the migration data still needs sorting this afternoon. Small comfort. A real one.',
      'You do not need my permission to attempt this. You have it anyway.',
      'Come back and tell me the part that nearly went wrong. I find it more useful than the part everyone else will ask about.'
    ]),
    pool('story-middle', 'gymStory', { homeBadgeBand: 'middle' }, 50, [
      'You describe your battles differently now. Less like a story, more like a set of observations. I approve of the shift.',
      'Halfway through anything is where the untested assumptions surface. Yours are surfacing on schedule.',
      'Your questions have sharpened since we started. I notice that more than I notice the badge count.',
      'You ask what actually went wrong in a loss now, not just whether you won. Considerably better question.',
      'I hear about your battles from Kern before you mention them yourself. The reports mostly hold up under scrutiny.',
      'You have started double-checking your own preparation before a gym. Good habit. I will take partial, unearned credit.',
      'Bring me an ordinary field observation sometime, not just badge news. Those are rarer than you would think.',
      'You do not need to sound certain about the next gym. Uncertain and prepared can occupy the same sentence.',
      'The lab roster has stopped asking whether the trainer is still around. It assumes now, correctly.'
    ]),
    pool('post-gym', 'gymStory', { homeBadgeBand: 'late', location: 'linden-lab:lab-door' }, 70, [
      'You came back standing differently, even tired. The badge count does not capture that part.',
      'One more line checked off a very long list. Heavier than the line itself suggests.',
      'Tell me the decision nobody prepared you to make in there before you tell me the score.',
      'You made a call in there with no established procedure behind it. That is the part I actually respect.',
      'I already logged the badge total. Kern will ask before I do, which tells you something about the two of us.',
      'The lab door was open the whole time, as promised. Whatever happened in there did not change that arrangement.',
      'Sit down before you report anything. The migration data can wait ten minutes. It generally can.',
      'Whatever happened in there, the field station schedule did not move. Neither did I.',
      'Same lab, same coffee, and you look a little more like a correspondent than a visitor now.'
    ]),
    pool('location-linden-lab', 'location', { location: 'linden-lab' }, 60, [
      'The centrifuge hums off-key again. Kern says it is companionable. I say it needs oil. We are both correct.',
      'Forty years of field notes live on that desk, mostly alphabetized, entirely out of self-defense.',
      'The Porygon sorts the archive by a logic only it understands. I have stopped auditing the results.',
      'Visitors assume the lab runs on grant money. It runs on checklists and Kern refusing to let anything slide.',
      'That drawer is labeled wrong on purpose. It discourages people who should not be opening it.',
      'The lab door sticks in humid weather. There is a specific shoulder-check for it. Ask Kern, not me; he actually remembers it.',
      'This is where the actual work happens, mostly, while committees elsewhere debate what to call it.',
      'The archive room runs colder than the rest of the building. Nobody has explained why. I have stopped asking.',
      'The spare stool by the aide\'s desk is not spare. Everyone simply calls it that so nobody asks before sitting.'
    ]),
    pool('location-field-station', 'location', { location: 'field-station' }, 60, [
      'Migration windows start here before dawn, which I maintain is the station\'s single honest flaw.',
      'The station log has every survey we have run in it, in at least four different handwritings.',
      'That whiteboard carries three overlapping schedules. Exactly one of them is currently correct.',
      'Nobody sleeps well out here the first night. Everyone sleeps fine by the third. Reliable pattern.',
      'The cot in the corner is nominally for emergencies. It sees more use than "nominally" would suggest.',
      'Supply crates get sorted by weight, not by name. It is a system, and I will defend it in any forum.',
      'This tent flap has never once closed properly. I have made peace with the resulting draft.',
      'The coffee out here is worse than the lab\'s, which I did not think was structurally possible.',
      'Survey days start rough and end honest. I would not trade the second half for a smoother first.'
    ]),
    pool('location-town', 'location', { location: 'town' }, 60, [
      'Half of town knows me as "the professor who is never actually in her lab." Accurate, mostly.',
      'I come into town for two reasons: requisitions, and telling Kern something in person instead of by note.',
      'The notice board has an outdated lecture announcement of mine pinned to it. I have stopped correcting it.',
      'People assume field ecology means I enjoy small talk about the weather. It means the opposite, usually.',
      'The mart stocks my requisitions before I ask, which saves us both a genuinely tedious conversation.',
      'I am recognizable by the field bag before anyone recognizes my face. I have made my peace with that too.',
      'Town is smaller than it looks, once you have argued with most of the people in it about methodology.',
      'I do not linger in town. There is always a page somewhere that needs correcting.',
      'If you need me and I am not at the lab, assume the routes, then assume the field station, in that order.'
    ]),
    pool('location-routes', 'location', { location: 'routes' }, 60, [
      'The regional routes hold the actual answer to the migration question. Everything at the lab is just bookkeeping around it.',
      'I know which stretches flood before the weather does. Forty years buys you exactly that kind of knowledge.',
      'This bend has good sightline for the count. I have stood here longer than is strictly dignified.',
      'The routes do not care about my seniority. I find that clarifying, most days.',
      'A season out here corrects more assumptions than a year in the lab does. I keep having to relearn that.',
      'Half of what I know about this migration, I know because I was standing exactly here, cold, at the right hour.',
      'The routes are quieter than the lab and considerably more honest about what they do not know either.',
      'I would rather be wrong out here than confidently right at a desk. It is a preference, not a virtue.'
    ]),
    pool('mood-tense', 'recentMoodRumor', { mood: 'tense' }, 75, [
      'I am not fit for methodology talk today. Ask me again once I have stopped rereading the same page.',
      'A count went wrong today, and it was my error this time, not a junior researcher\'s. I would rather say that than not.',
      'Give me a minute before you ask what happened. I am still deciding how much of it was actually avoidable.',
      'Something did not add up in the data today, and it will resolve, and I am still irritated about it regardless.',
      'I need quiet, not solutions, for a few minutes. Stay if you like. Do not fix anything yet.',
      'Hawthorn said something needlessly formal today. He almost certainly meant well. I am still annoyed.',
      'We can review the numbers tomorrow. Tonight I would rather just finish the filing in silence.',
      'I heard the apology. I am still frustrated about the rest of it. Both are permitted to be true at once.'
    ]),
    pool('mood-content', 'recentMoodRumor', { mood: 'content' }, 55, [
      'Every count on today\'s survey matched the model. That happens rarely enough to actually mention.',
      'I finished the week\'s correspondence early and did not immediately start next week\'s. Restful, briefly.',
      'Nobody needed correcting today, and the coffee was passable. A genuinely good day, by my standards.',
      'The lab\'s Porygon behaved itself, the archive is in order, and I sat down for an actual meal. Recommended.',
      'I am in an uncharacteristically good mood and have chosen not to interrogate it too closely.',
      'The new student\'s data came back clean. Small thing. Real relief.',
      'The migration count came in ahead of the model\'s low estimate. I will take the good surprise without suspicion, for once.',
      'The lab ran itself again today. I am choosing to enjoy that instead of auditing it.'
    ]),
    pool('rumor-migration-survey', 'recentMoodRumor', { worldFlags: ['rumor:the-migration-survey'] }, 78, [
      'The rumor says I have already published the migration survey. I have not. I am still checking the third region.',
      'Someone is telling people the survey proves the old route was fabricated. It proves it was wrong, not invented. Different claim.',
      'The exaggerated version has the whole lab abandoning the old data. We kept it. Wrong data is still data.',
      'People keep asking if the survey found something dramatic. The honest answer is "clarifying," which is less exciting and more true.',
      'The market version says Kern ran the survey with no oversight at all. He ran it well, which is not the same claim.',
      'Someone credited the result entirely to luck. Most of it was checking the same numbers three times, unglamorously.',
      'I will correct the record on the survey myself, in my own time, and let the rest of the rumor run its course.'
    ]),
    pool('item-pressedflower', 'itemPokemon', { itemIds: ['pressedFlower'] }, 72, [
      'A pressed flower holds its shape years after the plant is gone. That is closer to what I do for a living than most gifts manage.',
      'Keep the stem intact when you press one. I will not lecture you about it unless you ask, which you should.',
      'I have a small collection of these from every route I have surveyed. This one is a decent addition.',
      'Most gifts are ceremony. This one is actually a record. I prefer records.',
      'I press these between field-note pages, which occasionally means finding one three years later, mid-report.',
      'Thank you. I mean that plainly, not as the reflex people use it for.',
      'This will go in the binder, not a drawer. The binder is the higher honor, for what that is worth.',
      'A pressed flower does not pretend to still be alive. I respect that kind of honesty in an object.',
      'I have been difficult to buy for since someone first understood this was the right kind of gift. Fair warning, if you plan to make it a habit.',
      'Kern says I light up slightly when someone brings one of these. I would not put it that dramatically. I would not entirely deny it either.'
    ]),
    pool('pokemon-porygon-lab', 'itemPokemon', { pokemonSeen: [137] }, 73, [
      'That is one of the lab\'s research Porygon. It logs field data more reliably than most of the visiting researchers have.',
      'It does not need feeding or sleep, which the grant committee appreciates rather more than the Porygon does.',
      'It glitches sideways through a wall occasionally. I call that a diagnostic quirk. Kern calls it a Tuesday.',
      'I trust its data over most secondhand field reports. It has earned that, unlike most secondhand field reports.',
      'It sorts the archive by a logic I have stopped trying to reconstruct. The results hold up regardless.',
      'It recognizes the delivery cart\'s engine before Kern has even parked. Efficient, in its narrow way.',
      'It hums near old equipment as if diagnosing something nobody asked it to. I have learned to check anyway.',
      'It does not react to most visitors. It reacts to consistent behavior, which suits this lab exactly.',
      'I designed half its current sorting routine myself. I am, on the whole, quietly proud of that.',
      'It has a corner of the lab it clearly prefers, technically without needing rest. I have stopped questioning the preference.'
    ]),
    pool('relationship-aide', 'relationships', { relationshipIds: ['aide'] }, 35, [
      'Kern keeps two checklists so one can catch what the other missed. I did not design that system. I have come to rely on it regardless.',
      'I signed grant letters with his work folded into "the lab" for longer than I am comfortable admitting. I do not do that anymore.',
      'He does not ask for credit. I have learned to give it before he has to ask, which is the correct order.',
      'I left him the lab key without a checklist attached, which is not a small gesture from me, whatever it looked like from outside.',
      'He ran the survey properly, in the end. I changed one line on his plan and let the rest stand, because the rest was correct.',
      'I trust his judgment on logistics more than I trust most published reports. I have told him this exactly once, out loud.',
      'We disagree about how much I ask of him. I am revising that estimate downward, slowly, and correctly.',
      'He does not perform composure for me the way he used to. I would rather have the honest version, difficult as it sometimes is.',
      'The lab ran without me for an entire survey window. He ran it. I am still recalibrating what that means for how I delegate.',
      'Kern\'s name is on the reports now, properly, not folded into "the lab" the way it used to be. The correction was overdue.',
      'He asked me once, plainly, whether I wanted his opinion or just his agreement. I have thought about that question more than I let on.',
      'I would trust him with an unfinished survey plan before I would trust most colleagues with a completed one.'
    ]),
    pool('relationship-c-hawthorn', 'relationships', { relationshipIds: ['c-hawthorn'] }, 35, [
      'Hawthorn and I disagree about at least one migration conclusion a year. It is one of the more reliable things in my life.',
      'He qualifies everything twice before committing to a claim. I commit first and revise loudly. We meet somewhere in the middle, eventually.',
      'I send him disputed data before I send it anywhere else. He will tell me if I am wrong, and be right about it.',
      'He credits every contributor by name in his own record. I have been slowly learning that habit from him, badly, then less badly.',
      'We have not agreed on a route in years and have never once stopped corresponding about it.',
      'Hawthorn\'s patience looks like hesitation from a distance. Up close it is closer to rigor. I do not always have the patience for his patience.',
      'He asked after you specifically last season. That is not a small thing, from him.',
      'I trust his second read on a claim nearly as much as my own, and I do not extend that to many people.',
      'We argue about publication timing constantly. Neither of us has ever lost that argument to spite.',
      'He keeps every contributor\'s name in his final record. I have started doing the same, later than I should have.',
      'Hawthorn does not flatter a beginner\'s work to be kind. Neither do I. It is one of the reasons the correspondence works.',
      'I would trust Hawthorn with an unfinished draft before I would trust most people with a finished one.'
    ]),
    pool('rare-full-circle', 'rare', { location: 'field-station', completedEventIds: ['linden-folk-professor-event-leave-the-lab-and-return-to-find-it-thriving'], pokemonCaught: [137], minStage: 'trusted' }, 110, [
      'Your Porygon and the lab\'s are running the same idle diagnostic in the corner of the tent. Unplanned, and I am choosing to enjoy it anyway.',
      'The credit list, the finished survey, and both our names near the top of the same page. I did not engineer this. I will still take it.',
      'I have run a great many surveys out of this tent. Running one where the lab does not need me quite so much is a different feeling entirely.',
      'The lab thrived without me. You watched it happen. I am still recalibrating what that means for how I run things.',
      'Sit down a moment. The count can wait, the correction can wait, and today, for once, so can I.'
    ]),
    pool('repeat-talk', 'repeatInteraction', { repeatAtLeast: { talks: 8 } }, 45, [
      'Same lab, same question on your face. Yes, the migration count is still holding.',
      'I already explained the sketch system once. It has not changed its answer since yesterday.',
      'You know where the spare field kits are logged. Take one; tell me which line to cross off.',
      'Route talk, lab gossip, or just sitting while I finish a count? All three remain on offer.',
      'Nothing dramatic happened since we last spoke. I logged the small things anyway, because you would ask.',
      'You keep turning up at the lab door. I have stopped being surprised and started simply expecting it.',
      'Same question, same honest answer: check the survey drafts, then ask me if something is unclear.',
      'I have a task in mind involving you. It can wait until you say whatever you actually came to say.',
      'Come in. Mind the crate by the door; it is heavier than it looks, same as always.',
      'We have done this enough times that the greeting no longer needs saying. Sit down.'
    ])
  ];

  window.CORE_CAST_DIALOGUE = window.CORE_CAST_DIALOGUE || {};
  window.CORE_CAST_DIALOGUE.linden = D;
})();
