/* Phase 4 vertical slice: Rowan. Context pools contain complete, independently
   usable responses. A pool counts its strings, never prose fragments. */
(function () {
  function pool(id, category, when, priority, lines, extra) {
    var value = { id: 'rowan-dialogue-' + id, category: category, when: when || {}, priority: priority || 0, lines: lines };
    if (extra) Object.keys(extra).forEach(function (key) { value[key] = extra[key]; });
    return value;
  }
  var D = [
    pool('first-meeting', 'firstMeeting', { firstMeeting: true }, 120, [
      'Rowan. Riolu is the one pretending not to size up your team. I am doing it openly.',
      'You made it to the practice field. Good. I was starting to think my directions were too polite.',
      'I saved the level patch. That is courtesy, not confidence in your footwork.',
      'Before we start: a clean loss counts, excuses do not, and Riolu gets the first water break.',
      'I know your name. People talk after a new trainer arrives. Mostly the shopkeepers.',
      'If you came to watch, stand by the chalk line. If you came to battle, step over it.',
      'Your lead Pokémon keeps looking at Riolu. At least somebody arranged the match already.',
      'I write down every result. You are allowed to object after you give me one worth recording.',
      'That bag still has new buckles. Do not worry; the trail dust fixes that by lunch.',
      'I was going to offer a gentle first match. Riolu has rejected the proposal.'
    ]),
    pool('stage-acquaintance', 'friendshipStages', { stage: 'acquaintance' }, 40, [
      'Your turn starts too high in the shoulder. I noticed because mine does the same thing.',
      'The west edge dries first after rain. Use it before the younger trainers claim it.',
      'I have not decided whether your last switch was brave or accidental. Do it again.',
      'Riolu remembers you. That is why he brought the practice pad instead of the snack tin.',
      'You can borrow the blue pencil. The red one is for mistakes I intend to remember.',
      'I put your result on the board. Spelling included. You are welcome.',
      'You do not need to fill the silence between drills. I am counting breaths.',
      'That opening works once. Show me it works when I know it is coming.',
      'I am walking to the Center. You can happen to be going the same direction.',
      'Your Pokémon watches your face before choosing. That is useful. Also inconvenient for bluffing.'
    ]),
    pool('stage-recognition', 'friendshipStages', { stage: 'recognition' }, 40, [
      'You always arrive after Riolu stretches and before I finish pretending not to wait.',
      'I found a guide with three excellent notes and one terrible diagram. You would like the argument.',
      'Your second turn gives away the fourth. I will explain after you try to catch me doing it.',
      'I kept the court clear for another ten minutes. Do not make me negotiate with the jump-rope club again.',
      'There is chalk on your sleeve. Good. It makes you look like you had a plan.',
      'Riolu tried your feint this morning. He improved it, which I thought you deserved to know.',
      'You can look at today’s page. Not yesterday’s. We are building trust at a responsible speed.',
      'I ordered two soups by mistake. A highly believable mistake. Sit down.',
      'You recover well after a bad turn. I recover loudly and then write about it.',
      'If you are free tomorrow, I need an opponent who will not let me restart the opening.'
    ]),
    pool('stage-comfortable', 'friendshipStages', { stage: 'comfortable' }, 40, [
      'Move your bag. I am sitting there, and apparently asking is part of friendship now.',
      'I lost the first match today and did not reorganize the entire week. Mark the occasion.',
      'Riolu saved you the less-crushed biscuit. I had nothing to do with the selection process.',
      'Tell me when my plan stops being careful and starts being frightened. I may argue first.',
      'The bookshop has a new box of damaged guides. We should rescue the useful margins.',
      'I tried leaving the score blank. Lasted twelve minutes. Still, twelve is not zero.',
      'Your advice yesterday was annoying, specific, and correct. Two of those were compliments.',
      'We can skip the match and watch the rookies. I need to remember what uncomplicated effort looks like.',
      'I know that expression. You have a new strategy and an unreasonable amount of confidence in it.',
      'Walk the long way back with me. Riolu needs the distance, and I could use the company.'
    ]),
    pool('stage-beginning', 'friendshipStages', { stage: 'beginning' }, 40, [
      'I wrote down the loss before the excuses this time. The page looks strangely clean.',
      'You are allowed to tell me to stop. Not often. Just when I stop hearing Riolu.',
      'My brother wrote back. I have not opened it yet. Stay until I do?',
      'There are two sandwiches. Neither is charity; both are structurally important to practice.',
      'I changed the plan halfway through and nothing caught fire. I may be unstoppable.',
      'You notice when I am performing confidence. That is deeply inconvenient and occasionally useful.',
      'I kept a seat beside me at the match. Someone else tried it. Riolu handled negotiations.',
      'When you lose, you look outward. When I lose, I disappear into the notebook. I am working on that.',
      'I want your real opinion, not the version designed to keep the afternoon pleasant.',
      'Same route home? We do not have to review the match unless one of us gets unbearable.'
    ]),
    pool('stage-friend', 'friendshipStages', { stage: 'friend' }, 40, [
      'I told the younger trainers you were reliable. Please do not make that embarrassing.',
      'Your name has its own shorthand in the notebook now. No, you may not approve it.',
      'I can lose in front of you without feeling smaller. I still prefer winning, for the record.',
      'Riolu packed the practice wraps and your favorite biscuit. One of us pays attention.',
      'I need help testing a bad idea. It may become a good idea after you object to it.',
      'The hill is quiet tonight. Bring your team; we can let them wander while we compare notes.',
      'I saved the ugly part of the match to show you. The good part was obvious.',
      'My brother asked who keeps appearing in the margins. I described your battle style. Mostly.',
      'If your challenge goes badly, I will be outside. If it goes well, I will also be outside.',
      'You can say I am pushing too hard without proving you believe in me less. I finally understand that.'
    ]),
    pool('stage-trusted', 'friendshipStages', { stage: 'trusted' }, 40, [
      'Read the whole page. I crossed out the lie before you got here.',
      'I want the win badly today. If that turns me cruel, end the match.',
      'Riolu is tired of my favorite opening. I think I was the last one to notice.',
      'I sent the honest version of the letter. My hands shook; the postbox survived.',
      'There is a tournament two towns over. Come with me, even if neither of us enters?',
      'I know how you look before you pretend a loss did not hurt. Sit down before you start.',
      'You are in my corner because you choose to be, not because I earned permanent access.',
      'I planned three responses to failure. The fourth is apparently asking you for help.',
      'Keep the notebook tonight. I do not need to reread the score until it changes shape.',
      'You have seen the version of me that cannot turn effort into certainty. You stayed ordinary about it.'
    ]),
    pool('stage-close', 'friendshipStages', { stage: 'close' }, 40, [
      'Same time tomorrow is not a challenge anymore. It is just where tomorrow starts.',
      'I bought two notebooks without pretending the second one was an accident.',
      'Riolu waits for your whistle now. Betrayal can be very well trained.',
      'My brother wants to meet you. I warned him you remember exact scores.',
      'If I leave for the circuit, the hill stays ours. Distance does not get naming rights.',
      'You are the only person whose corrections I keep beside the original plan.',
      'We have enough history to survive a terrible match. I would still rather give you a good one.',
      'I used the short pencil down to nothing. The mark is on the first page, where it belongs.',
      'You do not make me less competitive. You make losing stop feeling like disappearance.',
      'No speech. Practice, dumplings, long way home. You already know the order.'
    ]),
    pool('post-pencil', 'postEvent', { completedEventIds: ['rowan-event-the-spare-pencil'], recentEventIds: ['rowan-event-the-spare-pencil'] }, 90, [
      'The pencil still lives in the inside pocket. It has become too short to lend responsibly.',
      'I let a page stay unfinished yesterday. The notebook did not file a complaint.',
      'You asked when a plan is finished. Current answer: shortly after it becomes useful.',
      'I bought a box of pencils and sharpened exactly one. Restraint deserves witnesses.',
      'Riolu chewed the eraser, so any future mistakes are permanent. He seems pleased.',
      'The first page says “ask more questions.” I have obeyed it aggressively.',
      'I still cover the private pages. Trust is not the same thing as removing the cover.',
      'Your spare pencil wrote three losses and one excellent recovery. Good range.',
      'I found your original tooth marks on the end. Do not deny this; I have evidence.',
      'The notebook has room for uncertainty now. Small handwriting, but room.'
    ], { acknowledgesEventId: 'rowan-event-the-spare-pencil' }),
    pool('post-afternoon', 'postEvent', { completedEventIds: ['rowan-event-a-bad-afternoon'], recentEventIds: ['rowan-event-a-bad-afternoon'] }, 91, [
      'Riolu refused the old opening today. I listened before he had to refuse twice.',
      'We stopped after two bad matches. Tomorrow remained available. Remarkable system.',
      'I tried your one-change rule. It prevented six changes, four of them dramatic.',
      'The dirt diagram washed away. I copied the useful half and left the rest outside.',
      'Riolu took the first water break without asking. Apparently leadership can be learned upward.',
      'A bad afternoon is not a bad month. I wrote that where the scores usually go.',
      'We tested the new opening slowly. It looks less impressive and works twice as often.',
      'I noticed my jaw tightening and called the break myself. You may record that privately.',
      'The kid with the Bidoof came back. We lost once, won once, and all four of us ate biscuits.',
      'Rest is still not my favorite strategy. It has entered the official rotation.'
    ], { acknowledgesEventId: 'rowan-event-a-bad-afternoon' }),
    pool('post-letter', 'postEvent', { completedEventIds: ['rowan-event-the-letter-home'], recentEventIds: ['rowan-event-the-letter-home'] }, 92, [
      'My brother answered the honest letter with three questions and no advice. It was perfect.',
      'I wrote “lost” without circling it, underlining it, or setting the page on fire.',
      'He wants to see the opening we built. I told him it belongs partly to Riolu.',
      'The next letter was longer because I stopped spending half of it hiding the first sentence.',
      'I used to report only results. Now I report what changed. He writes back differently.',
      'The post clerk asked why I looked terrified. I said family administration.',
      'I kept the draft with the lie. Not as punishment—just so I remember the distance.',
      'My brother lost his match last week. He told me before I asked.',
      'I can admire him without turning his record into a wall. Some days, anyway.',
      'Thank you for waiting on the steps. Waiting was the useful part.'
    ], { acknowledgesEventId: 'rowan-event-the-letter-home' }),
    pool('post-tomorrow', 'postEvent', { completedEventIds: ['rowan-event-same-time-tomorrow'], recentEventIds: ['rowan-event-same-time-tomorrow'] }, 93, [
      'The hill has two worn patches now. That counts as a shared improvement.',
      'I recorded the draw accurately. I disliked every letter and kept all of them.',
      'Your notebook missed one of my good turns. I added it in the margin.',
      'Riolu starts walking uphill before I say where we are going.',
      'Same time tomorrow survived rain, travel, and one truly awful sandwich.',
      'The short pencil is gone. The promise it marked is doing fine.',
      'We can change the time, you know. The ritual is ours; it is not a trap.',
      'I passed you once, then you passed me before supper. Very inconsiderate. Excellent work.',
      'The new notebook begins with both names. The scores have to share the page.',
      'Tomorrow does not owe either of us a win. I still intend to ask it for one.'
    ], { acknowledgesEventId: 'rowan-event-same-time-tomorrow' }),
    pool('pre-gym', 'gymStory', { homeBadgeBand: 'early', location: 'town:gym-steps' }, 70, [
      'The first gym makes everyone rush the opening. Breathe before the doors, not after them.',
      'I brought notes. You can refuse them, but then I get both sandwiches.',
      'Watch the leader’s feet when they choose a target. The rest is decoration.',
      'Your team knows the plan. Give them enough room to surprise you.',
      'I will wait here. Not because I am worried. Because the steps have excellent tactical value.',
      'A badge is proof of one day, not a verdict on the trainer who walked in.',
      'If you lose, come out the same door. I checked; there is no shame exit.',
      'Do not perform calm for me. Use the nerves; just do not let them pick the lead.',
      'Your water bottle is in the side pocket. Yes, I checked. No, this is not invasive.',
      'Go on. Riolu is starting to pace, and one rival doing that is enough.'
    ]),
    pool('post-gym', 'gymStory', { homeBadgeBand: 'late', location: 'town:gym-steps' }, 70, [
      'You leave gyms differently now. Less relieved, more curious. That is probably dangerous.',
      'Another badge. Put it away before Riolu decides it is a throwing toy.',
      'The leader changed pace after your third switch. You made them adjust to you.',
      'I remember waiting here before your first challenge. We both used more hair product then.',
      'You do not need my notes anymore. I am still bringing them; usefulness is not the only point.',
      'Late badges make strangers call you talented. I know how many muddy mornings are inside them.',
      'The circuit gets quieter near the end. Keep somebody in your corner anyway.',
      'You won without using the safe opening. I am offended on behalf of preparation and impressed personally.',
      'Take the long way home. The town should have time to notice you before the next task does.',
      'We can celebrate tonight and analyze tomorrow. Write down that I proposed the order.'
    ]),
    pool('story-middle', 'gymStory', { homeBadgeBand: 'middle' }, 50, [
      'The middle of the circuit is strange. Too far in to feel new, too far out to see the finish.',
      'Teams change quickly around this point. Habits pretend they can keep up.',
      'You have enough badges that strangers expect certainty. Do not borrow their mistake.',
      'The next routes get longer. Pack for the walk back, not only the challenge ahead.',
      'I keep comparing us to our first match. Current us would interrupt that match with advice.',
      'This is where plans become history faster than we can rewrite them.',
      'Your team has started choosing around you, not just through you. That is worth noticing.',
      'Halfway achievements are difficult to display. We could eat something instead.',
      'The circuit opens outward from here. Pick the direction you actually want.',
      'We are not beginners now. Good. We are also not finished. Better.'
    ]),
    pool('location-field', 'location', { location: 'town:practice-field' }, 60, [
      'The north line is uneven. Good place to practice recovering your stance.',
      'Someone moved the markers again. Riolu considers this a personal invitation.',
      'The ground is hard enough for speed drills and soft enough to forgive us.',
      'I left the center lane open. Your team takes wider turns than mine.',
      'That scuff is from yesterday’s finish. I have decided it was dramatic, not clumsy.',
      'The rookies are watching. Try not to teach them my worst habit.',
      'Wind from the market carries every lunch smell directly here. Cruel planning.',
      'We can use chalk or trust our feet. Given our history, I brought chalk.',
      'Riolu hid a practice wrap under the bench. He thinks inventory is a game.',
      'One clean round, then water. Say it back so I cannot renegotiate.'
    ]),
    pool('location-bookshop', 'location', { location: 'bookshop' }, 60, [
      'The useful books are in the damaged box. Perfect covers have nothing to prove.',
      'This author recommends never retreating. The margin says “nonsense” in three handwritings.',
      'Do not buy the clean copy yet. I want to know who argued on page forty-two.',
      'The shopkeeper moved a chair into our aisle. We have become predictable furniture.',
      'I found an old tournament program with every losing team annotated kindly.',
      'That diagram is upside down. No—wait. The field is upside down. That is worse.',
      'Secondhand notes are conversations where nobody can interrupt. Useful for me.',
      'I will trade you this guide for the mystery novel you pretend not to be carrying.',
      'Riolu is banned from the lower shelves after the atlas incident.',
      'We can disagree quietly or leave. Apparently there is a volume policy now.'
    ]),
    pool('location-hill', 'location', { location: 'hill-above-town' }, 60, [
      'From here the practice field looks small enough to survive any result.',
      'The wind steals loose pages. I finally bought a clip after learning six times.',
      'Riolu likes this slope because every thrown stick becomes a tactical problem.',
      'The town lights come on one street at a time. We can wait for ours.',
      'I run this climb when I am angry. Walking it with you is considerably less efficient.',
      'There is space up here for a match and enough sky to stop thinking afterward.',
      'You can see the gym roof. It looks less authoritative from above.',
      'The grass keeps the shape of our footwork until morning.',
      'I brought the old pencil out of habit. It is too short to survive this wind.',
      'Sit on the flat stone. Riolu has assigned the other one to himself.'
    ]),
    pool('location-center', 'location', { location: 'center' }, 60, [
      'Riolu is fine. He is acting tragic because the nurse said “rest.”',
      'Your team recovered before you did. Sit down; I already moved the bag.',
      'The vending machine kept my coin. This is the day’s most unacceptable loss.',
      'I wrote the match down without blaming the bruise. Personal growth and ice packs.',
      'The waiting room is neutral territory. No rematch negotiations until we leave.',
      'That Chansey remembers us. I am unsure whether that reflects well on our judgment.',
      'Your Pokémon wants you in sight. Mine wants the snack cart in sight.',
      'We can compare notes after everyone stops pretending not to limp.',
      'I brought fresh wraps. Kern labels the drawers better than any sane person needs.',
      'Next time we stop one round earlier. I am saying it here where witnesses exist.'
    ]),
    pool('mood-tense', 'recentMoodRumor', { mood: 'tense' }, 75, [
      'I am still annoyed. That does not mean leave; it means do not make me translate it into politeness yet.',
      'We disagreed. The field remains available and so do I.',
      'Give me one lap before we talk. You can walk beside me without fixing it.',
      'I heard what you meant after I stopped hearing how it sounded.',
      'Riolu has appointed himself mediator. His method is dropping the same stick at both our feet.',
      'I do not want an apology designed to end the discomfort. Tell me what you would do differently.',
      'I can be angry and still save you a place. Those facts are not opponents.',
      'The notebook version is unfair to you. I closed it before the sentence was finished.',
      'Let us do something ordinary before we decide this became enormous.',
      'I am not ready to joke about it. Check again after dumplings.'
    ]),
    pool('mood-content', 'recentMoodRumor', { mood: 'content' }, 55, [
      'Good match, decent weather, Riolu only stole one glove. Suspiciously successful morning.',
      'I have nothing urgent to improve for at least six minutes.',
      'The result went in the notebook, but the walk home got more space.',
      'You were right about the switch. Enjoy the sentence; production is limited.',
      'Riolu is asleep under the bench, so apparently we practiced exactly enough.',
      'I could get used to an afternoon that does not need rescuing.',
      'The new plan worked. More importantly, changing it did not feel like failure.',
      'Sit down. I bought the dumplings before inventing a reason.',
      'Today was good in a way that will sound smaller if I explain it.',
      'No rematch yet. Let the win be a win before we turn it into a whole production.'
    ]),
    pool('rumor-board', 'recentMoodRumor', { worldFlags: ['rumor:practice-board'] }, 78, [
      'The rumor says I erased the board myself. If I staged drama, the handwriting would be better.',
      'People keep asking about the missing score. I would rather they ask the kid who put it back.',
      'The board story improves every time it crosses the market. We are rivals from separate kingdoms now.',
      'I know who rubbed out the name. They apologized. The town does not need a villain.',
      'Someone added a crown over my score. Riolu is the leading suspect.',
      'The useful part of the rumor is that people started recording losses again.',
      'I am leaving the chalk where anyone can reach it. Accuracy should not require permission.',
      'Theo heard the rumor from three customers and corrected all three versions. Efficient friendship.',
      'If anybody asks, the dramatic pause lasted ten seconds, not an hour.',
      'Let the story fade. The next results deserve room.'
    ]),
    pool('item-tea', 'itemPokemon', { itemIds: ['teaTin'] }, 72, [
      'That tea tin survives every bag you own. Impressive design or stubborn owner?',
      'If that is Mira’s blend, save some for after practice. Riolu dislikes the steam and loves the biscuits.',
      'The lid makes a good marker in an emergency. I am not suggesting we lose the tea.',
      'You carry tea now. We have become the sort of rivals who schedule recovery.',
      'I brought cups. That is planning, not an assumption that you will share.',
      'The smell reached the practice field before you did.',
      'Mira says steep it three minutes. I timed four and received a look.',
      'Keep the tin away from the chalk bag unless you enjoy gray tea.',
      'Hot tea on the hill sounds good. We can call it weather strategy.',
      'I used to bring only water. Apparently having friends expands inventory.'
    ]),
    pool('pokemon-riolu', 'itemPokemon', { pokemonSeen: [447] }, 73, [
      'You have seen how Riolu watches before he moves. That pause is a choice, not hesitation.',
      'Riolu remembers the first time your team surprised him. He practices that answer every Thursday.',
      'He prefers partners who signal clearly. I am trying not to take that personally.',
      'Riolu can hear my confidence fail before I can. Useful and rude.',
      'Your Pokémon greeted him without a challenge today. He looked almost disappointed.',
      'He copies your lead’s footwork when he thinks nobody is watching.',
      'Riolu chose the new opening. I supplied the notebook and excessive commentary.',
      'Do not praise him before the last turn. He starts posing.',
      'He knows the route to the hill, the Center, and every stall that drops food.',
      'You treat him like my partner, not my strategy. He notices.'
    ]),
    pool('relationship-theo', 'relationships', { relationshipIds: ['theo'] }, 35, [
      'Theo fixed the stopwatch and added a button I am apparently forbidden to press repeatedly.',
      'I test Theo’s prototypes. He says “test” does not mean “find the most alarming possible use.”',
      'Theo notices flaws quietly. I notice them at competitive volume. We cover the range.',
      'He made Riolu a training light. Riolu learned the pattern and now judges the machine.',
      'I told Theo his radio worked. He asked for observations instead. Annoyingly fair.',
      'Theo is presenting at the hall. I am sitting in front so he has one familiar person to glare at.',
      'He thinks I plan too much. I think he apologizes too much. Both claims survived review.',
      'The spare stool at his bench is not comfortable. Being invited is doing most of the work.',
      'Theo changed one of my drills after watching once. It is better. This stays between us.',
      'We argue well because neither of us confuses disagreement with departure anymore.'
    ]),
    pool('rare-hill-letter', 'rare', { location: 'hill-above-town', completedEventIds: ['rowan-event-the-letter-home'], pokemonCaught: [447], minStage: 'trusted' }, 110, [
      'Your Riolu and mine chose the same stone. We may need a second hill.',
      'My brother’s letter is in the notebook beside both our team sketches. That arrangement feels accurate.',
      'Two Riolu, one short pencil, and a wind strong enough to steal the score. Ideal conditions.',
      'Yours watches you the way mine watches me before I make a bad decision.',
      'I told my brother there are four of us at practice now. He understood immediately.',
      'The teams are asleep. We can admit the match was excellent without scheduling another tonight.',
      'Your Riolu found the old dirt diagram. Mine has opinions about the erased half.',
      'This is the part I never planned: the rivalry getting larger without getting less ours.',
      'If both Riolu refuse the drill, we agree they are unionized and go for soup.',
      'Keep this evening off the rankings. I want one result nobody else gets to measure.'
    ]),
    pool('repeat-talk', 'repeatInteraction', { repeatAtLeast: { talks: 8 } }, 45, [
      'We have done the greeting enough times. Field, food, or walk?',
      'You know where the spare wraps are. Bring mine too.',
      'No news. I still wanted to see you. Do not make the face.',
      'Riolu heard your step outside and abandoned the drill immediately.',
      'I saved the ordinary story because you are the person I tell those to.',
      'You missed nothing dramatic. The bench is damp and Theo still hates my stopwatch technique.',
      'Same argument as last week? Good. I have improved my evidence.',
      'We can repeat the route without repeating the conversation.',
      'I know, I know: water first, analysis second. Your influence is relentless.',
      'Stay a while. Familiar company is not wasted practice.'
    ])
  ];

  window.CORE_CAST_DIALOGUE = window.CORE_CAST_DIALOGUE || {};
  window.CORE_CAST_DIALOGUE.rowan = D;

  var trainer = (window.TRAINERS || []).find(function (item) { return item.id === 'rowan'; });
  if (trainer) trainer.heartEventIds = (window.ROWAN_ACTIVE_HEART_EVENT_IDS || []).slice();

  /* The opening and original two extra beats retain their IDs. Three appended
     beats turn each active event into a 2–6 minute scene without invalidating
     any completed or interrupted legacy scene. */
  function appendBeats(eventId, beats) {
    var groups = (window.EVENT_BEATS && window.EVENT_BEATS.rowan) || [];
    var group = groups.find(function (item) { return item.sceneId === eventId; });
    if (!group) return;
    Array.prototype.push.apply(group, beats);
  }
  appendBeats('rowan-event-the-spare-pencil', [
    { s: 'A gust lifts the corner of the page. Rowan catches it, but not before you see a column headed “What I cannot plan for.”', c: [['Ask whether your name is in the column.', '“Twice.” He turns the book back around instead of closing it.', 10], ['Offer to look away.', '“You already saw it.” He leaves the page uncovered.', 8]] },
    { s: 'Riolu returns from the water pump carrying a second snapped pencil and places it solemnly beside the first.', c: [['Declare an equipment crisis.', 'Rowan inventories the damage in mock seriousness. Riolu looks vindicated.', 8], ['Give Riolu the unbroken half.', 'He carries it to the chalk line like an official baton.', 10]] },
    { s: 'Before you leave, Rowan writes tomorrow’s plan with several blank spaces between the drills.', c: [['Ask what belongs in the blanks.', '“Whatever actually happens.” He does not fill them in.', 12], ['Suggest lunch for one of them.', 'He writes “dumplings” with unnecessary precision.', 10]] }
  ]);
  appendBeats('rowan-event-a-bad-afternoon', [
    { s: 'On the fifth attempt Riolu stops at the opening mark and looks back. Rowan raises his hand, then lets it fall.', c: [['Call the rest before Rowan has to.', 'He nods, grateful and irritated in equal measure. “Five minutes.”', 10], ['Wait for Rowan to decide.', 'After one breath he kneels beside Riolu. “We are done with this drill.”', 12]] },
    { s: 'The three of you sit under the bridge while rain stipples the old dirt diagram beyond recognition.', c: [['Talk about anything except battling.', 'You rank market dumplings until Riolu falls asleep against both your shoes.', 10], ['Ask what losing felt like today.', '“Like proof.” He watches the diagram disappear. “It was not.”', 12]] },
    { s: 'Rowan tears the failed opening from his notebook, then pauses with the page still attached by one corner.', c: [['Keep the page and mark what changed.', 'He smooths it flat and writes “retired, not erased.”', 12], ['Let him tear it out.', 'He folds it once and puts it in his pocket rather than throwing it away.', 8]] }
  ]);
  appendBeats('rowan-event-the-letter-home', [
    { s: 'His brother’s reply includes a match ticket and a note: “Show me the version you actually use.” Rowan reads the sentence again.', c: [['Offer to travel with him.', '“Not as backup.” He meets your eyes. “As company.”', 12], ['Ask whether he wants to go.', '“Yes. That is the frightening part.”', 12]] },
    { s: 'At the practice field he attempts his brother’s famous opening. Riolu breaks formation on the second turn and wins another way.', c: [['Celebrate Riolu’s choice.', 'Rowan laughs before remembering to look embarrassed. “He made the correct correction.”', 12], ['Ask Rowan what he saw.', '“That I was reenacting a memory instead of watching my partner.”', 12]] },
    { s: 'He writes one last line beneath the reply, then hands you the page without hiding his thumb over any part of it.', c: [['Read it: “Come see who I am now.”', 'He takes the page back carefully. “That is the version I am sending.”', 15], ['Tell him it sounds like him.', '“Good.” He folds it once, cleanly, and does not draft another.', 15]] }
  ]);
  appendBeats('rowan-event-same-time-tomorrow', [
    { s: 'Halfway home, Rowan stops at the fork where the practice field lies one way and the station the other.', c: [['Ask whether the circuit is calling.', '“It is.” He looks toward the station, then back at you. “That does not cancel tomorrow.”', 12], ['Let him choose the road in silence.', 'He takes the station road for ten steps, returns, and laughs at himself.', 10]] },
    { s: 'He admits he has accepted a place in a traveling tournament that will keep him away for several weeks.', c: [['Ask what he is excited about.', 'The answer arrives quickly: new teams, unfamiliar openings, nobody who knows his record.', 12], ['Ask what he is afraid of.', '“Coming back different. Or not different enough.” He lets both answers stand.', 12]] },
    { s: 'At the station board he circles his return date, then draws a second circle around the morning after.', c: [['Write “same time” beside it.', 'He adds “same hill” and hands you the pencil.', 15], ['Suggest leaving the plan open.', 'He considers that, then writes “find each other.” “Open enough.”', 15]] }
  ]);

  if (typeof window.labelEventBeatIds === 'function') window.labelEventBeatIds();

  function markOutcome(eventId, beatIndex, choiceIndex, flag) {
    var group = ((window.EVENT_BEATS || {}).rowan || []).find(function (item) { return item.sceneId === eventId; });
    var choice = group && group[beatIndex] && group[beatIndex].c[choiceIndex];
    if (choice) choice.outcomeFlags = [flag];
  }
  markOutcome('rowan-event-the-spare-pencil', 4, 0, 'leave-space');
  markOutcome('rowan-event-a-bad-afternoon', 3, 1, 'name-loss');
  markOutcome('rowan-event-the-letter-home', 4, 0, 'honest-invitation');
  markOutcome('rowan-event-same-time-tomorrow', 4, 1, 'open-return');

  if (trainer && window.CORE_CAST_PRODUCTION && CORE_CAST_PRODUCTION.rowan) {
    CORE_CAST_PRODUCTION.rowan.eventInventory.forEach(function (record) {
      var scene = trainer.events.find(function (event) { return event.id === record.eventId; });
      var group = ((window.EVENT_BEATS || {}).rowan || []).find(function (item) { return item.sceneId === record.eventId; }) || [];
      record.beatIds = [scene.beatId].concat(group.map(function (beat) { return beat.id; }));
      record.choiceIds = (scene[3] || []).map(function (choice) { return choice.id; });
      group.forEach(function (beat) { record.choiceIds = record.choiceIds.concat(beat.c.map(function (choice) { return choice.id; })); });
    });
  }
})();
