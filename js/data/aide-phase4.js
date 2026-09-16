/* Phase 4 character batch: Kern (the "aide" cast entry). Every string is a
   complete contextual response; categories count responses rather than
   fragments. Kern is folk-sourced (townsfolk), not a bespoke companion: his
   four heart events live directly in FOLK_EVENTS.aide (see folk-events.js),
   split out of the shared "scholar" archetype so no other Lab Aide inherits
   his personal arc. There is no legacy consolidation step here — this is his
   first dedicated content, not a migration. */
(function () {
  function pool(id, category, when, priority, lines, extra) {
    var value = { id: 'aide-dialogue-' + id, category: category, when: when || {}, priority: priority || 0, lines: lines };
    if (extra) Object.keys(extra).forEach(function (key) { value[key] = extra[key]; });
    return value;
  }

  var D = [
    pool('first-meeting', 'firstMeeting', { firstMeeting: true }, 120, [
      'I hand out the starters while Professor Linden is out in the field. Which is always.',
      'Take the bag. It has more in it than starters, but that part is not on the official list.',
      'I am Kern. Lab aide, delivery route, and unofficial keeper of anything Linden forgets to mention.',
      'Sign here. Not for anything ominous—just so I know the starter left with the right person.',
      'The Professor is out. I am, apparently, always in. Ask me anything she would have told you.',
      'You will see me around town more than you see her. That is the job, not a complaint. Mostly.',
      'Here is your Pokédex too. I already logged the serial number, because someone has to.',
      'Welcome to the region. I would give you a longer speech, but the delivery cart does not wait.'
    ]),
    pool('stage-acquaintance', 'friendshipStages', { stage: 'acquaintance' }, 40, [
      'You brought the crate back to the lab yourself. I did not expect that, and I am recalibrating.',
      'I keep a duplicate checklist for deliveries. You are now, unofficially, on the short one.',
      'The Professor asked who helped with the field kits. I said "someone useful," which is high praise from me.',
      'You returned the loaner Pokédex on time. You would be surprised how rare that is.',
      'I remember what you asked about last time. It is a professional habit, not a personal one. Mostly.',
      'The lab coffee is bad. I drink it anyway, out of spite for the coffee, not preference.',
      'You can find me on the delivery route most afternoons if the lab door is locked.',
      'I logged your name in the visitor book properly this time, not just as "the trainer."',
      'Thanks for waiting while I finished the crate count. Interruptions cost more than they look like.',
      'I do not usually explain the checklist system. Ask anyway, if you actually want to know.'
    ]),
    pool('stage-recognition', 'friendshipStages', { stage: 'recognition' }, 40, [
      'You know which door sticks now. Saves us both the shoulder-check every time.',
      'I put your questions on the actual list of things to ask Linden, instead of just answering badly myself.',
      'You noticed I carry two checklists. Most people assume it is one, badly organized.',
      'The Professor mentioned you by name this time, not just "the trainer from the lab."',
      'I saved you the good crate, the one without the loose slat. Small mercies.',
      'You ask before touching the supply shelf. That should be standard. It is not.',
      'I still catalog everything twice. It has saved us more than once, so I am not stopping.',
      'The delivery route has a stop with your name on the drop-off sheet now, informally.',
      'You remembered my name is Kern, not "the aide." I noticed. I always notice that one.',
      'Come by after the morning rush if you want an actual conversation instead of a status update.'
    ]),
    pool('stage-comfortable', 'friendshipStages', { stage: 'comfortable' }, 40, [
      'I told you why I keep two checklists. You did not immediately suggest I only needed one.',
      'The Professor let me choose this week\'s repair order. I put the noisy centrifuge first, for everyone\'s sake.',
      'You can tell me when I am over-preparing. Give me one good reason, though, or I will double-check your reason too.',
      'I ate lunch sitting down today. It felt like an event, which says more about me than the lunch.',
      'We should stop pretending the delivery cart\'s third wheel is fine. It is not. I like it anyway, somehow.',
      'I let a mistake sit uncorrected for a full hour once, on purpose, to see if the world ended. It did not.',
      'You noticed when I was tired and did not ask me to explain the whole week. That helped more than you know.',
      'There is a stool by my desk that has started to feel like yours, unofficially.',
      'I trust your read on a logistics problem almost as much as my own. Almost.',
      'Stay while I finish the count today. Talking mid-tally throws off the number, but the company does not.'
    ]),
    pool('stage-beginning', 'friendshipStages', { stage: 'beginning' }, 40, [
      'I told you about the survey I never asked to lead. You are the first person outside my own head who has that story straight.',
      'Linden lets you carry the fragile crates now. That is not nothing, from her.',
      'I asked what you actually thought of my checklist system, and meant it. Tell me if it is overbuilt.',
      'The shopkeepers on my route know your name now, informally, as "Kern\'s usual company." I did not correct them.',
      'You caught the error in the delivery manifest before I did. I filed the correction with your initials on it.',
      'I do not silently absorb every mistake anymore. If it was not mine, I say so, plainly.',
      'We argued about whether the third checklist was necessary and neither of us won cleanly. Felt like progress.',
      'I saved you a spot on the field-day roster without checking if you were coming. You were.',
      'Linden asks after you specifically now, not just "the trainer." That took some doing.',
      'Tell me the plan you actually want to run, not the safe version you think I expect. I can work with either.'
    ]),
    pool('stage-friend', 'friendshipStages', { stage: 'friend' }, 40, [
      'I stopped double-checking your counts. You tally the way I taught you, which is unreasonably satisfying.',
      'You show up on delivery days you are not even scheduled for. I have stopped questioning it.',
      'You have seen me let a mistake stand in front of Linden. Most people only ever see the composed version of me.',
      'I gave you a key to the supply shed. Lose it and I will mention it exactly once, dryly.',
      'We should run the short route today. Nothing needs finishing before dinner, for once.',
      'I let you plan the last two deliveries. You are annoyingly good at reading a manifest now.',
      'The new lab volunteer asked who taught you logistics. I said you already knew half of it.',
      'You call a checklist finished before I do sometimes now. That is not a small thing to hand someone.',
      'I keep a spot open on the cart for you now, not just for the crates.',
      'Same route, same crates, and somehow it is never actually the same afternoon. I have noticed that.'
    ]),
    pool('stage-trusted', 'friendshipStages', { stage: 'trusted' }, 40, [
      'I told you what I would do if the field survey went wrong, before anyone asked me to plan for that.',
      'Linden lets you into the archive room now, not just the delivery bay. Progress, from her.',
      'You know the three things that make me admit a mistake out loud, without me listing them again.',
      'I read you the actual rejection I got the first time I asked to lead something. The discouraging parts included.',
      'You get the checklist with my crossed-out mistakes still on it now, not the clean copy I show visitors.',
      'I do not double-check your count anymore. Once is enough, from you.',
      'We split the field-day planning properly. Route is mine. Almost everything else is not.',
      'You are the only person I have told about the credit list I started keeping.',
      'I trust you with the field-day roster on days I am too stubborn to trust myself with it.',
      'Come with me to file the survey plan this week. Both our names are going on the cover, not just mine.'
    ]),
    pool('stage-close', 'friendshipStages', { stage: 'close' }, 40, [
      'The survey report has both our names on it now. I checked it twice, and once was only habit.',
      'You get asked for by name at the lab now, not just "is Kern around." I have made peace with this.',
      'You know the whole route now, every stop, including the one I never explained the reason for.',
      'I do not perform composure for you anymore. You have seen me frustrated, and you never once called it weak.',
      'The next survey is soon. I want you on the team, not just hearing about it after.',
      'There is no version of the credit list without your name on it, near the top.',
      'I still keep two checklists. They have just stopped being lonely about it, is all.',
      'You ask what I actually want to run before what is easiest. I am still getting used to being asked that.',
      'The stool by my desk has worn a shape for two people now. I noticed before you did.',
      'Same route tomorrow, same crates, and this time we are splitting the heavy ones evenly.'
    ]),
    pool('post-routine-delivery', 'postEvent', { completedEventIds: ['aide-folk-aide-event-the-routine-delivery'], recentEventIds: ['aide-folk-aide-event-the-routine-delivery'] }, 90, [
      'I still list every stop from memory. The duplicate list is just for when memory has a bad day.',
      'The shopkeeper at the last stop uses my name now, not "the professor\'s assistant." Small thing, real thing.',
      'You still ask before carrying a crate instead of just grabbing it. I still notice, and prefer it.',
      'I ate standing up again yesterday, from habit. Some habits are just efficient, not sad.',
      'The spare receipt copies go to you now as a matter of course. Proof the route happened, same as before.',
      'Another aide asked how I keep the route straight without notes. I told her the honest, unglamorous answer.',
      'You know the shortcut past the mill now. I did not tell you about it so much as you noticed I always took it.',
      'I do not automatically let credit go to whoever signed the order anymore. I say who actually carried it.',
      'The cart\'s third wheel is still bad. I have started treating that as a feature, not a defect.',
      'That first delivery run together set a pace I still use. Efficient, mostly quiet, occasionally worth mentioning.'
    ], { acknowledgesEventId: 'aide-folk-aide-event-the-routine-delivery' }),
    pool('post-checklist-failed', 'postEvent', { completedEventIds: ['aide-folk-aide-event-the-checklist-that-failed'], recentEventIds: ['aide-folk-aide-event-the-checklist-that-failed'] }, 91, [
      'The new checklist line is still there: verify seal after handoff. It has not failed since.',
      'I told a visiting aide about the mistake without softening it this time. She looked relieved, oddly.',
      'Nobody has brought up the crate incident to embarrass me since. One person thanked me for the fix instead.',
      'You still ask what actually went wrong before assigning blame. I have started expecting that order from you.',
      'The other labs copying my line have a name for it now. I try not to look pleased. I fail.',
      'I do not silently take blame that is not mine anymore. It costs a little comfort, saves a lot of confusion.',
      'Linden mentioned the fix again last week, unprompted. She remembers correctly more often than she says wrong things.',
      'The visiting researcher who saw the mistake happen also saw the checklist get better. Fair trade, in the end.',
      'You stood there while I explained it to Linden. I still notice that you did not jump in for me.',
      'I keep the old, wrong checklist page in a drawer now. Evidence the new one earned its place.'
    ], { acknowledgesEventId: 'aide-folk-aide-event-the-checklist-that-failed' }),
    pool('post-survey-ownership', 'postEvent', { completedEventIds: ['aide-folk-aide-event-survey-ownership'], recentEventIds: ['aide-folk-aide-event-survey-ownership'] }, 92, [
      'The survey plan still has my name on the cover, a little larger than I first wrote it.',
      'Linden changed one thing on that plan and nothing else. I have decided that counts as an excellent review.',
      'People ask if I am running my own survey now instead of "helping with the professor\'s." I let the question stand corrected.',
      'You still ask what I actually want to run, not what is easiest to approve. I have started expecting the better question.',
      'The night-before checklist read-aloud has become a habit. You are the only one who has heard the whole thing.',
      'Another aide asked how I got Linden to hand over a survey. I told her the short version, then the long one.',
      'I do not list other people\'s names before mine out of habit anymore. Mine goes where it belongs on the page.',
      'The route from that first plan is still the one we use. It held up, which mattered more than I let on.',
      'You pointed at the blank signature line before I could talk myself out of it. I have not forgotten that.',
      'The plan is filed properly now, cover page and all. I check on it more than is strictly necessary.'
    ], { acknowledgesEventId: 'aide-folk-aide-event-survey-ownership' }),
    pool('post-field-day', 'postEvent', { completedEventIds: ['aide-folk-aide-event-the-field-day'], recentEventIds: ['aide-folk-aide-event-the-field-day'] }, 93, [
      'The team still calls it "Kern\'s survey." I have stopped correcting them, mostly because it is accurate.',
      'The credit list from that day is still in my desk. It has grown since, but that page started it.',
      'You still ask whose names are on a report before you ask about the results. I have started expecting that order.',
      'A junior volunteer from that field day asked to join the next one. I said yes before checking the roster twice.',
      'Linden reads my reports differently now. Fewer questions about the methodology, more about what is next.',
      'I do not defer the credit reflexively anymore. It goes where the work actually happened, plainly.',
      'The route we mapped that day is the one everyone uses now, professor included.',
      'You were there before I said anything, on the morning of the field day. I noticed, and did not say so at the time.',
      'Someone new to the lab asked who Kern was, expecting an assistant. I let the survey answer that question instead.',
      'The duplicate checklists finally have a matching pair headed "credit." Neither list is short anymore.'
    ], { acknowledgesEventId: 'aide-folk-aide-event-the-field-day' }),
    pool('pre-gym', 'gymStory', { homeBadgeBand: 'early', location: 'linden-lab:lab-door' }, 70, [
      'You checked your bag twice in the lab doorway. A third check mostly confirms you can still count to three.',
      'I logged your gym date on the roster before you told me. The delivery schedule makes it obvious.',
      'Take the spare potion from the shelf. It is inventoried, so bring back the wrapper, not the excuse.',
      'You do not need to look calm walking out of here. You need to look ready, and those are different things.',
      'The Professor is out, as always, but she asked me to wish you luck. In her own economical way.',
      'I cannot go into the gym with you. I can have the lab door open when you come back, whatever happens.',
      'The badge is one line on a checklist, not a verdict. Sorry—that sounded rehearsed because it was.',
      'Go when you are ready. The delivery cart and I will both still be here.',
      'You have solved harder problems than this at my desk. Remember that walking in.',
      'Whatever happens in there, the crates still need unloading this afternoon. Small comfort, but a real one.'
    ]),
    pool('story-middle', 'gymStory', { homeBadgeBand: 'middle' }, 50, [
      'You talk about your route differently now, less like a list and more like something you actually planned.',
      'Halfway through anything is where you find out which checklists were only ever hopeful guesses.',
      'Your questions have changed since we started. Sharper, which matters more than confident ever did.',
      'You ask what actually went wrong in a match now, not just whether you won. Better question.',
      'I hear about your battles from the delivery route before you mention them yourself. The stories mostly hold up.',
      'You have started double-checking your own supplies before a gym. Good habit. I take partial credit.',
      'Bring back an ordinary story sometime, not just the badge news. Those are easier to log, honestly.',
      'You do not need to sound certain about the next gym. Uncertain and prepared can share a checklist line.',
      'The lab roster has stopped asking "is the trainer still around." It just assumes now.'
    ]),
    pool('post-gym', 'gymStory', { homeBadgeBand: 'late', location: 'linden-lab:lab-door' }, 70, [
      'You came back standing differently, even tired. That is the part the checklist never quite captures.',
      'The badge is one more line checked off a very long list. Heavier than the line suggests.',
      'Tell me the part that nearly went wrong before the part everyone will ask about. I want the real one.',
      'You made a call in there nobody wrote a checklist for. That is the part I actually respect.',
      'I already logged the badge count. Linden will ask; I like knowing the answer before she does.',
      'The lab door was open the whole time, like I said. Whatever happened in there, that part did not change.',
      'Come sit before you unload anything. The crates can wait ten minutes. They always can.',
      'Whatever happened in there, the delivery route did not move an inch. Neither did I.',
      'Same lab, same door, and somehow you look a little more like you belong on this side of the counter now.'
    ]),
    pool('location-town', 'location', { location: 'town' }, 60, [
      'Half of town knows me by the delivery cart before they know my actual name. Efficient, if impersonal.',
      'The general store restocks faster since I started tracking their shelf gaps for them, unofficially.',
      'You can catch me between stops here most mornings, cart parked wherever it fits.',
      'The town notice board has three of my delivery times pinned to it, all slightly out of date.',
      'I know which shopkeepers pay on delivery and which ones need a polite second visit. Comes with the job.',
      'The bench outside the mart is where I eat when the lab gets too crowded to think in.',
      'People wave at the cart before they wave at me. I have made my peace with that.',
      'The shortcut past the fountain saves four minutes. I have never once told anyone that on purpose.',
      'Town is smaller than it looks once you have delivered to every building in it twice.'
    ]),
    pool('location-linden-lab', 'location', { location: 'linden-lab' }, 60, [
      'The lab smells like ozone and, faintly, whatever the research Porygon knocked into standby mode this week.',
      'That drawer is labeled wrong on purpose. It discourages the people who should not be in it.',
      'Linden\'s desk has forty years of notes on it. Mine has this week\'s, alphabetized out of self-defense.',
      'The centrifuge hums off-key when it needs oil. I have started finding that oddly companionable.',
      'Visitors assume the lab runs on grant money. It runs on checklists and me not letting things slide.',
      'The archive room is colder than the rest of the lab. Nobody has explained why, and I have stopped asking.',
      'This is where most of my actual work happens, quietly, while Linden is out getting credit for the results.',
      'The spare stool by my desk is not spare. I just call it that so nobody feels obligated to ask before sitting.',
      'The lab door sticks in humid weather. I know exactly which shoulder-check fixes it.'
    ]),
    pool('location-delivery-route', 'location', { location: 'delivery-route' }, 60, [
      'This stretch floods first when it rains. I plan the route around it before the weather does.',
      'The mill stop pays late but tips in gossip, which is occasionally more useful than money.',
      'That gate latch has been broken for a year. I fixed it once and it broke worse out of spite.',
      'The cart\'s third wheel squeaks exactly here, every time. I have stopped trying to fix it.',
      'Half this route exists because Linden forgot to mention a standing order two years ago. It stuck.',
      'The shortcut through the orchard saves ten minutes and costs one apologetic wave to the farmer.',
      'I know every dog on this route by temperament, not name. The information is more useful that way.',
      'This bend has the best light in the afternoon. I have never once stopped to actually look at it before now.',
      'The route ends here, technically. I usually keep walking a little further anyway.'
    ]),
    pool('location-field-station', 'location', { location: 'field-station' }, 60, [
      'The field station smells like canvas and last week\'s coffee, in roughly equal measure.',
      'That whiteboard has three overlapping schedules on it. Only one of them is currently accurate.',
      'The cot in the corner is technically for emergencies. It gets used more than "technically" suggests.',
      'Survey days start here before dawn, which I have decided is the station\'s one real flaw.',
      'The supply crates get organized by weight, not by name. It is a system, and I will defend it.',
      'This tent flap has never once closed properly. I have made my peace with the draft.',
      'The station log has every survey we have run written in it, in at least three different handwritings.',
      'Nobody sleeps well out here the first night. Everybody sleeps fine by the third.'
    ]),
    pool('mood-tense', 'recentMoodRumor', { mood: 'tense' }, 75, [
      'I am not in a state to talk logistics right now. Ask me again once I have stopped recounting the same crate.',
      'A delivery went wrong today and it was actually my fault this time. I would rather say that than deflect it.',
      'I need quiet, not solutions, for a few minutes. You can stay, just do not fix anything yet.',
      'Something did not add up today and I am still annoyed about it, even knowing it will add up eventually.',
      'Give me a minute before you ask what happened. I am still deciding how much of it was actually preventable.',
      'I heard the apology. I am still frustrated about the rest of it. Both things are allowed to be true.',
      'We can go over the numbers later. Right now I would rather just finish the count in silence.',
      'Linden said something careless today. She probably did not mean it that way. I am still annoyed regardless.'
    ]),
    pool('mood-content', 'recentMoodRumor', { mood: 'content' }, 55, [
      'Every stop on today\'s route went exactly on schedule, which happens rarely enough to mention.',
      'I finished the week\'s checklists early and did not immediately start next week\'s. Restful, for once.',
      'Nobody needed rescuing, nothing went missing, and the coffee was passable. Good day, plainly.',
      'The lab roster has nothing but green marks on it right now. I am enjoying it while it lasts.',
      'I sat down for an actual lunch today. Recommended, occasionally.',
      'The new volunteer at the lab actually reads the labels correctly. Small thing, real relief.',
      'I am in a good mood and have no particular reason. I am choosing not to audit it too closely.',
      'The delivery cart\'s wheel held the whole route today. I am treating that as a personal victory.'
    ]),
    pool('rumor-survey', 'recentMoodRumor', { worldFlags: ['rumor:kerns-survey'] }, 78, [
      'The rumor says I ran the whole survey alone overnight. I had a team, and it took three actual days.',
      'Someone is telling people Linden did not know about the survey until it was finished. She approved every page.',
      'The exaggerated version has a storm in it. The real version had slightly worse-than-expected mud.',
      'People keep asking if the survey found something huge. I tell them the honest, more modest answer.',
      'The market version says I refuse to work with anyone now. I still run the same route, same crates, same team.',
      'Someone credited the result entirely to luck. Most of it was just checking the numbers twice.',
      'I will correct the story about the survey and let the rest become whatever it becomes.'
    ]),
    pool('item-hotsauce', 'itemPokemon', { itemIds: ['hotSauce'] }, 72, [
      'That is proper volcano-grade hot sauce. I keep a bottle in the delivery bag for exactly this reason.',
      'Careful with that. I have seen a visiting researcher regret a generous pour once, memorably.',
      'That bottle outlasts most of what else is in my bag. Small, dense, always useful. My favorite kind of item.',
      'I trade a dash of that for gossip on the delivery route more often than I would like to admit.',
      'Keep the cap tight. I found that out the hard way, in a crate of otherwise-salvageable field notes.',
      'That is the good brand, not the diluted one the mart tries to pass off in the off-season.',
      'I have three bottles rationed across the year. This would make a genuinely excellent gift, hypothetically.',
      'Someone gave me a bottle of that once and I have been difficult to shop for ever since. Fair warning.',
      'That sauce and a plain sandwich is a complete, defensible meal. I will not be taking further questions.',
      'Keep it out of the lab Porygon\'s reach. It does not eat, but it has knocked over worse for less reason.'
    ]),
    pool('pokemon-porygon', 'itemPokemon', { pokemonSeen: [137] }, 73, [
      'That is one of Linden\'s research Porygon. It logs data more reliably than half the interns we have had.',
      'Porygon does not need feeding or sleep, which the lab budget appreciates more than the Porygon does.',
      'It glitches sideways through a wall occasionally. Linden calls it a feature. I call it a Tuesday.',
      'The Porygon sorts the archive by a system only it understands. I have stopped questioning the results.',
      'It hums faintly near old equipment, like it is diagnosing something nobody asked it to diagnose.',
      'Porygon does not react to most people. It reacts to consistent routines, which suits this lab exactly.',
      'I have caught it rearranging my checklist folder into an order that, infuriatingly, works better.',
      'It recognizes the delivery cart\'s engine sound before I have even parked. Efficient, in its way.',
      'Linden trusts its data over most visiting researchers\' notes. It has earned that, admittedly.',
      'Porygon does not sleep, technically, but it does have a corner of the lab it clearly prefers.'
    ]),
    pool('relationship-mira', 'relationships', { relationshipIds: ['mira'] }, 35, [
      'Mira reminds me to eat. I remind her that sitting down is available to gardeners too.',
      'I carry the heavy crates to her stall without being asked. She accepts half a sandwich without negotiating.',
      'She fixed the shed latch discussion by letting me think I fixed it first. I noticed eventually.',
      'We have known each other long enough to recognize a disguised offer of help from across the market.',
      'Mira carries too much before anyone can ask. I carry too much because people already did. We compare notes.',
      'She packed my lunch once without asking. I rescheduled her afternoon off without asking back. Mutual interference.',
      'Mira never assumes my work needs rescuing. She asks which end of the crate is mine.',
      'When I say I am fine, she brings a chair instead of an argument. It works better than either of us expected.',
      'She knows which favors are gifts and which ones quietly create an obligation. I trust her math on that.',
      'We trade care in both directions. Otherwise one of us would eventually start charging the other.',
      'Mira asked about my survey before anyone else did, and actually wanted the boring logistics part too.',
      'I would trust Mira with the field station roster before I would trust most of the actual lab staff.'
    ]),
    pool('relationship-linden', 'relationships', { relationshipIds: ['linden'] }, 35, [
      'Linden is out in the field more than she is in it. I stopped being surprised by that and started planning around it.',
      'She used to sign her name to work I did and not think twice about it. She thinks twice about it now.',
      'I do not always say when something is heavy. She has started asking anyway, which is new.',
      'She left the lab key with me and no checklist attached. I have not seen her do that with anything else.',
      'We argue about credit more than we argue about anything. It is the only argument I have never minded having.',
      'She reads my reports for the methodology first and asks about me second now. I have not fully adjusted to that.',
      'Linden does not apologize the way most people do. She fixes the letter and lets the fixed letter be the apology.',
      'I ran the lab while she was away and did not mention how well it went until she noticed herself.',
      'She trusts my judgment more than she says out loud. I have learned to hear it in what she stops double-checking.',
      'We have not settled the imbalance completely. We have settled enough of it that I stopped counting.',
      'She asked me once what I actually wanted to run, and waited for the real answer instead of the safe one.',
      'The credit list started because of her mistake. I do not hold it against her anymore, mostly because she never stopped fixing it.'
    ]),
    pool('rare-credit-list', 'rare', { location: 'field-station', completedEventIds: ['aide-folk-aide-event-the-field-day'], pokemonCaught: [137], minStage: 'trusted' }, 110, [
      'Your Porygon and the lab\'s are running the same diagnostic in the corner of the tent, unprompted.',
      'The credit list, the finished survey, and both our names near the top of the same page. I did not plan this, but I will take it.',
      'The lab Porygon has decided this field station is an acceptable place to glitch sideways. High praise, from it.',
      'I have run a lot of surveys out of this tent. Running one with you already on the roster is different.',
      'Sit down a minute. The crates can wait, the checklist can wait, and for once so can I.'
    ]),
    pool('repeat-talk', 'repeatInteraction', { repeatAtLeast: { talks: 8 } }, 45, [
      'Same lab, same question on your face. Yes, the deliveries are still running on schedule.',
      'I already told you about the checklist system. It has not changed its answer since yesterday.',
      'You know where the spare potions are logged. Take one; just tell me which line to cross off.',
      'Route talk, lab gossip, or just sitting while I finish a count? All three are still on offer.',
      'Nothing dramatic happened since we last talked. I logged the small stuff anyway, because you would ask.',
      'You keep turning up at the lab door. I have stopped being surprised and started just expecting it.',
      'Same question, same honest answer: check the roster, then ask me if it is unclear.',
      'I have a task in mind involving you, but it can wait until after whatever you actually came to say.',
      'Come in. Mind the crate by the door; it is heavier than it looks, same as always.',
      'We have done this enough times that the greeting does not need saying anymore. Sit down.'
    ])
  ];

  window.CORE_CAST_DIALOGUE = window.CORE_CAST_DIALOGUE || {};
  window.CORE_CAST_DIALOGUE.aide = D;
})();
