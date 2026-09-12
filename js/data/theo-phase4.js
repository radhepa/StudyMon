/* Phase 4 character batch: Theo. Every string is a complete contextual
   response; categories count responses rather than fragments. */
(function () {
  function pool(id, category, when, priority, lines, extra) {
    var value = { id: 'theo-dialogue-' + id, category: category, when: when || {}, priority: priority || 0, lines: lines };
    if (extra) Object.keys(extra).forEach(function (key) { value[key] = extra[key]; });
    return value;
  }

  var D = [
    pool('first-meeting', 'firstMeeting', { firstMeeting: true }, 120, [
      'Oh—hello. The bell is meant to ring once, not keep the door company. I am Theo.',
      'Mind the blue tray, please. Those screws are sorted, and Magnemite has strong opinions about sorting.',
      'I can help in a moment. The kettle is safe; the smoke is from the soldering iron this time.',
      'You found the repair shop. I am Theo, apprentice officially and owner of that loose stool unofficially.',
      'Sorry, the counter looks crowded. There is a clear square exactly the size of one elbow.',
      'If you are waiting for the owner, she is out. I can still look at the problem—carefully, but properly.',
      'The radio is supposed to hiss. The till is not. Today has been specific about its surprises.',
      'There is a spare stool by the bench. Test the left leg before trusting it; that is also my general policy.'
    ]),
    pool('stage-acquaintance', 'friendshipStages', { stage: 'acquaintance' }, 40, [
      'I remember you. You stood beside the blue tray and nothing went missing, which is unusually memorable.',
      'The bell only rings once now. I almost miss knowing exactly how annoyed it was.',
      'You can watch from the stool if you like. Just—perhaps not directly over my shoulder.',
      'Magnemite sorted the washers by shine. It is not useful, but it is internally consistent.',
      'I found the fault in that lamp. The switch was fine; the wire beside it had been pretending.',
      'The shop owner left me the counter for lunch. So far I have sold one fuse and found three pencils.',
      'I am testing a receiver later. It may receive something, which would improve the name.',
      'That stool still wobbles. I know because repairing furniture while sitting on it is difficult.',
      'You need not bring anything broken to visit. That sounded like a rule; it is only an invitation.',
      'I have five minutes before the next pickup. Five exact minutes, unless the clock is also faulty.'
    ]),
    pool('stage-recognition', 'friendshipStages', { stage: 'recognition' }, 40, [
      'I left your stool clear. Well, mostly clear. The coil of wire is decorative until moved.',
      'You ask before touching the bench. That should be ordinary, but I notice it every time.',
      'The radio from yesterday came back. Not broken—the owner wanted to hear the song again.',
      'Magnemite recognizes your footsteps and stops hiding screws under itself.',
      'I made a list of things to explain, then realized conversation is allowed to choose its own order.',
      'There is an apple bun in the drawer above the resistors. Food storage here is improving slowly.',
      'The brass alarm clock loses four minutes a day. It is dependable about being wrong.',
      'I tried your suggestion on the stiff hinge. The hinge disagreed, then conceded after oil.',
      'The owner says I can price simple repairs now. Apparently simple includes people arguing with the price.',
      'Stay until I test this? You do not have to say anything. A second pair of ears is useful.'
    ]),
    pool('stage-comfortable', 'friendshipStages', { stage: 'comfortable' }, 40, [
      'Could you pass the narrow screwdriver? I mean the second narrow one; thank you for understanding that sentence.',
      'I have an idea for a pocket receiver. It is unfinished enough that I can still admit it is mine.',
      'Lunch is on the bakery steps. I intend to discuss anything except wire unless you ask first.',
      'Magnemite stole the labeled screws and returned the unlabeled ones. This may be criticism.',
      'The owner let me choose the repair order today. I put the noisy clock first for everyone’s sake.',
      'You can tell me when I am overchecking. Give me one reason, though, or I will check your claim.',
      'I kept the cracked dial from the old radio. It looks like a tiny moon if you avoid being sensible.',
      'The bench is quiet today. I thought that would help, but apparently I had become used to your questions.',
      'I said “I do not know yet” to a customer. They waited. Nothing collapsed except my planned apology.',
      'There is space beside the parts ledger for your cup. I moved three very important washers to make it.'
    ]),
    pool('stage-beginning', 'friendshipStages', { stage: 'beginning' }, 40, [
      'I put my name on the receiver sketch. In pencil, yes, but on the front rather than the back.',
      'Would you test the range with me? Rowan tests by trying to break things; I need a quieter sample too.',
      'The shop owner asked what I would change here. I gave her the whole answer before apologizing.',
      'You have seen the unfinished casing now. Please judge the hinge; the rest is not ready for a verdict.',
      'Magnemite likes the new shelf because every tool is six centimeters closer to the ceiling.',
      'I saved you an apple bun. I did not measure whether this was fair to the other buns.',
      'The model train took the corner without leaving the table. I cheered, privately but audibly.',
      'Sometimes I explain mechanisms because I am nervous. Sometimes I simply think they are beautiful.',
      'I told a customer the repair would take two days, not “probably soon.” Exact uncertainty feels better.',
      'Could you stay while I show the owner my design? Not speak for me—just remain approximately there.'
    ]),
    pool('stage-friend', 'friendshipStages', { stage: 'friend' }, 40, [
      'Your stool has four sound legs now. I repaired it before admitting I liked keeping it here.',
      'I need an honest test, not encouragement. If the signal drops, mark the place and insult it precisely.',
      'Rowan returned the prototype with a dent and six excellent notes. We are both pretending this is cordial.',
      'The owner called the shelf layout mine. I corrected two measurements and forgot to reject the credit.',
      'Magnemite has started bringing you washers as gifts. They are shop property, so admiration must remain local.',
      'I made the casing green because I wanted green. No technical justification has survived review.',
      'Sit here while I work? The motor is loud, but the company does not have to be.',
      'I can be pleased with a repair before listing what could fail next. I am practicing the order.',
      'We should take the radios to the hill again. This time I packed lunch before spare aerials.',
      'You know when to offer a hand and when to keep both in your pockets. That is rare workshop skill.'
    ]),
    pool('stage-trusted', 'friendshipStages', { stage: 'trusted' }, 40, [
      'I ordered the wrong part again last week. I told the owner in six words and used the seventh for the solution.',
      'Here is the original design. The crossed-out pages are included; pretending they never happened made it less mine.',
      'If I freeze during the workshop, ask what we know. Do not answer for me, even if you know more.',
      'The shop will be mine for Saturday morning. I am frightened in a way that contains some excitement.',
      'Magnemite dropped the prototype. The new dent revealed a weak joint, which is rude and valuable.',
      'You may read the notes in the red folder. The gray one is still private and mostly embarrassing titles.',
      'I want credit for the good work and responsibility for the expensive mistakes. Apparently they arrive together.',
      'The receiver failed in front of Rowan, and he waited while I found out why. That was almost considerate.',
      'I can ask you to stay without inventing a repair that needs two people. So—stay?',
      'Unfinished no longer means unworthy of company. It still means keep drinks away from the open casing.'
    ]),
    pool('stage-close', 'friendshipStages', { stage: 'close' }, 40, [
      'Your radio is on my channel already. I checked before I heard the bell because I know your timing.',
      'The workshop board has my name at the top and twelve other names beneath it. That is the design working.',
      'You have seen every version of this receiver except the one I imagined perfect. I prefer the real collection.',
      'There is always room at the bench. Sometimes the room is seventeen centimeters, but it is yours.',
      'Magnemite hums differently when you arrive. I cannot prove affection, but the frequency is repeatable.',
      'I used to hide mistakes before anyone could mistake them for me. You taught me that was not the only risk.',
      'Rowan says the new casing is too heavy. He is correct, annoyingly and with impressive consistency.',
      'Let us close early and take the long path. Nothing needs diagnosing for at least one hour.',
      'I signed the inside of your radio where repairs will reveal it. That seemed appropriately honest.',
      'You make uncertainty feel like a place two people can stand, not a trapdoor under the bench.'
    ]),
    pool('post-drawer', 'postEvent', { completedEventIds: ['theo-event-the-stuck-drawer'], recentEventIds: ['theo-event-the-stuck-drawer'] }, 90, [
      'The drawer opens without lifting now. I still lift it from habit and feel personally betrayed.',
      'I wrote “hidden screw” on the repair card. It is a diagnosis, not an excuse, which helps.',
      'The customer who interrupted us came back and noticed the drawer before the radio.',
      'Your side of the repair bench remains your side, even when I spread parts across it.',
      'I stopped adjusting the finished radio after two clean tests. The third test was social, not technical.',
      'The shop owner approved our repair and asked why the stool still wobbled. Fair question.',
      'Magnemite has inspected the runner and found no magnetic contribution to make.',
      'I can repair with someone beside me now, provided their hands ask before helping.',
      'The spare screw was not spare after all. That is comforting in a very small way.',
      'We fixed the drawer without either of us becoming the entire repair. I noticed.'
    ], { acknowledgesEventId: 'theo-event-the-stuck-drawer' }),
    pool('post-ticket', 'postEvent', { completedEventIds: ['theo-event-an-unsigned-ticket'], recentEventIds: ['theo-event-an-unsigned-ticket'] }, 91, [
      'The next ticket has my name printed clearly. My handwriting was becoming an avoidance strategy.',
      'A customer asked for me today and I answered before checking whether another Theo had entered.',
      'The thank-you note is on the board. I moved it twice and left it visible both times.',
      'The owner says signed work makes follow-up easier. Credit apparently has administrative uses.',
      'I kept the folded old ticket, but it is no longer folded small enough to disappear.',
      'Magnemite stuck three signed tickets to itself. Recognition has become inconveniently mobile.',
      'I signed a repair that needed a second visit. My name survived the return trip.',
      'The customer remembered the quiet apprentice. I told her quiet and unnamed are different things.',
      'There is space on the board for the design ticket when it is ready. I measured.',
      'Writing my name takes less time now. It still weighs exactly the same.'
    ], { acknowledgesEventId: 'theo-event-an-unsigned-ticket' }),
    pool('post-part', 'postEvent', { completedEventIds: ['theo-event-the-wrong-part'], recentEventIds: ['theo-event-the-wrong-part'] }, 92, [
      'The refund arrived. The mistake cost postage and one difficult conversation, not my entire future.',
      'I changed the order form so two part numbers cannot occupy the same hopeful guess.',
      'The owner let me handle the replacement from apology through installation.',
      'I told the customer the delay was mine before giving the new date. They preferred the date.',
      'Magnemite keeps nudging unopened boxes now, as though accountability is a game.',
      'The wrong motor fits the window fan, so the shop gained a breeze and an unusually expensive reminder.',
      'I prepared twelve apology sentences and used three. The remaining nine have been recycled responsibly.',
      'Responsibility feels less like punishment when it includes permission to repair the consequence.',
      'The return label is pinned beside the order sheet. I am keeping evidence, not a shrine.',
      'I made another order yesterday. I checked it twice, then stopped while twice still meant twice.'
    ], { acknowledgesEventId: 'theo-event-the-wrong-part' }),
    pool('post-workshop', 'postEvent', { completedEventIds: ['theo-event-open-workshop'], recentEventIds: ['theo-event-open-workshop'] }, 93, [
      'Next month’s workshop list has eight names and one blank line labeled “problem we have not met.”',
      'The woman who found the switch fault is teaching lamp repair next time.',
      'I did not know four answers. The room knew three and agreed to investigate the fourth.',
      'Someone brought back a repaired toaster just to show everyone it still worked.',
      'The chairs are stacked badly again. I am leaving them until the chair expert arrives.',
      'My receiver carried instructions across the whole hall without dropping a word.',
      'Rowan asked the hardest question and accepted “test it with me” as an answer.',
      'The owner put “Theo’s open workshop” on the sign. I only adjusted the apostrophe.',
      'Magnemite collected loose screws at the door and accidentally improved attendance.',
      'I led the room without becoming the only capable person in it. That was the useful design.'
    ], { acknowledgesEventId: 'theo-event-open-workshop' }),
    pool('pre-gym', 'gymStory', { homeBadgeBand: 'early', location: 'town:gym-steps' }, 70, [
      'You have checked your bag twice. A third check will mostly confirm that you can count to three.',
      'Your lead Pokémon keeps watching your hands. Unclench them before you ask it to look calm.',
      'I brought the small radio. If you need silence afterward, leave it switched off.',
      'The gym door closes loudly but opens with ordinary hinges. I inspected them while waiting.',
      'You may be uncertain and prepared at the same time. I have extensive field evidence.',
      'Rowan says he has a prediction. I hope you make at least one part of it inconvenient.',
      'I can hold your spare things. I cannot hold the outcome, which is probably healthier.',
      'The badge is metal, not a verdict. Sorry—that sounded rehearsed because it was.',
      'Go in when your team is ready. The people behind you can practice patience.',
      'I will be here after, unless the stair rail finally admits it needs repair.'
    ]),
    pool('story-middle', 'gymStory', { homeBadgeBand: 'middle' }, 50, [
      'Your badge case has one loose corner. The journey is leaving useful maintenance notes.',
      'You talk about distant towns differently now—less like names, more like places with bad chairs.',
      'Halfway is enough experience to know which plans deserve changing.',
      'Your team has routines I did not see at the start. None of them came from a manual.',
      'The shop gets stories about you before you return. Most improve when corrected.',
      'I made a regional receiver map from your reports. One blank stretch remains honestly blank.',
      'You do not need to sound certain when telling me where you are going next.',
      'Bring back a broken ordinary thing sometime. Grand souvenirs make poor test cases.',
      'You have become good at leaving. I think returning is still the more precise skill.'
    ]),
    pool('post-gym', 'gymStory', { homeBadgeBand: 'late', location: 'town:gym-steps' }, 70, [
      'The cheering shook the loose stair rail. It remains attached, as do you.',
      'Your team looks exhausted and pleased. I know that combination from successful repairs.',
      'Rowan already has three notes. You are allowed to celebrate before accepting peer review.',
      'The new badge sits crooked in the case. I can fix the clasp after everyone stops admiring it.',
      'You made a choice in there nobody predicted. I liked the part where the prediction survived being wrong.',
      'The radio picked up the crowd from the shop. Magnemite hummed along inaccurately.',
      'You came back with more skill and the same habit of forgetting lunch.',
      'Tell me the turn that nearly failed, not only the one everyone cheered.',
      'The gym door sounds smaller from this side. Its hinges remain ordinary.'
    ]),
    pool('location-shop', 'location', { location: 'repair-shop' }, 60, [
      'The yellow bins are parts awaiting repair; the red bin is parts awaiting courage.',
      'The back window rattles at one exact wind speed. Today appears to be that speed.',
      'Do not lean on the counter corner. It is secure, but the varnish is still negotiating.',
      'The shop smells like warm dust because three radios arrived from the same attic.',
      'Magnemite may hold your keys while you work. Retrieval requires diplomacy.',
      'The owner’s bench is tidy by method. Mine is tidy by narrow pathways.',
      'Every clock in here shows a different time, and all insist they are repair examples.',
      'The blue tray is for current screws. The green tray is for screws with complicated pasts.',
      'Your stool is beside the shelf. I stopped calling it spare several visits ago.'
    ]),
    pool('location-bakery', 'location', { location: 'bakery-steps' }, 60, [
      'The third step is warm and does not wobble. This is why I eat here.',
      'I bought two apple buns by accident that I repeated deliberately.',
      'The bakery fan squeaks every seventh turn. They know; apparently it is beloved.',
      'We can discuss the weather. Mine currently contains crumbs and no specifications.',
      'Magnemite waits outside because flour sticks to it in structurally ambitious layers.',
      'The shop bell carries this far when the door is open. I am pretending not to hear it.',
      'Someone carved initials under this step. The lettering is uneven and confidently signed.',
      'Lunch lasts until the paper bag is empty, not until I think of another adjustment.',
      'Sit on the left. The right side catches drips from the flower box.'
    ]),
    pool('location-hall', 'location', { location: 'town-hall' }, 60, [
      'The hall has sixteen sockets and one extension lead determined to serve all of them.',
      'These chairs stack in groups of five, despite the cupboard holding room for four.',
      'The notice board makes every small event look official. I find that both helpful and alarming.',
      'The front table is too high for seated repairs, so we borrowed the card tables.',
      'Magnemite likes the ceiling beams. The caretaker and I have a retrieval plan.',
      'Voices echo here half a second late, which makes hesitation sound like a duet.',
      'The workshop sign is straight. I checked from the door, the stage, and one unnecessary angle.',
      'There is room for twenty people if nobody brings a machine larger than optimism.',
      'The old clock works perfectly. I distrust it on principle and admire it in practice.'
    ]),
    pool('location-hill', 'location', { location: 'hill-path' }, 60, [
      'The footbridge is nine hundred steps from the good radio stone. I counted once, defensively.',
      'Signal carries farther above the trees, but so does every embarrassing shout.',
      'That flat rock is where the first receiver worked. The lichen has claimed partial credit.',
      'The path mud holds tripod feet better than shoes, which feels personally targeted.',
      'From here the repair shop roof looks almost level. Distance is generous.',
      'Magnemite follows the buried fence wire and makes excellent accidental maps.',
      'I brought the light toolkit and one heavy snack. The balance is finally correct.',
      'We can keep walking after the test. A hill is allowed to exist without becoming equipment.'
    ]),
    pool('mood-tense', 'recentMoodRumor', { mood: 'tense' }, 75, [
      'I am not ready to make this neat. I can tell you exactly what upset me, though.',
      'Please stop explaining what I meant. I hesitated, but I did finish the sentence.',
      'I need space from the bench and from advice for approximately the same reason.',
      'The repair failed, and I am angry. Those are the facts before we assign meaning.',
      'You can stay, but let the quiet be quiet instead of waiting to become your turn.',
      'I heard the apology. I believe it; I am still upset, which is inconvenient but possible.',
      'Magnemite is hiding under the counter because even it can read this room.',
      'We should continue later. Later is a plan, not a polite word for never.'
    ]),
    pool('mood-content', 'recentMoodRumor', { mood: 'content' }, 55, [
      'Everything on the bench works, including the things meant to remain still.',
      'The shop is quiet enough to hear Magnemite hum against the window latch.',
      'I finished early and did not invent another task. The afternoon appears survivable.',
      'A customer brought biscuits instead of another broken clock. Excellent exchange rate.',
      'The receiver held its signal through rain. I am pleased in complete sentences.',
      'Your stool, my bench, one pot of tea—no diagnostic notes required.',
      'The owner left me the good screwdriver without mentioning it.',
      'Nothing surprising happened today. I had forgotten how pleasant that could be.'
    ]),
    pool('rumor-workshop', 'recentMoodRumor', { worldFlags: ['rumor:open-workshop'] }, 78, [
      'The rumor says I repaired twelve appliances at once. There were six, and the room repaired them.',
      'Someone claims Magnemite taught the workshop. It did collect more screws than anyone else.',
      'The market version says the broken lamp exploded. Its bulb flickered with theatrical timing.',
      'People keep calling me an expert. I keep asking what they need, which is more useful.',
      'The useful rumor is that neighbors are saving repairable things instead of discarding them.',
      'Rowan supposedly challenged my entire class. He asked one difficult question and carried chairs.',
      'I will correct the date of the next workshop and let the rest become a better story.'
    ]),
    pool('item-tea', 'itemPokemon', { itemIds: ['teaTin'] }, 72, [
      'That tea tin closes with a clean click. Sorry, I noticed the lid before the label.',
      'Set the tin away from the soldering mat. Bergamot should not acquire a metallic finish.',
      'I have two cups, one intact and one that pours slightly left.',
      'The dent in that tin keeps it from rolling off the shelf. Damage has found employment.',
      'Tea first, receiver test second. I wrote the order down so it becomes policy.',
      'Magnemite cannot open the lid, which has made the tin extremely interesting.',
      'The blend smells warmer than the shop. That is not difficult, but it is appreciated.',
      'Bring it to the hill next time. Hot tea improves signal testing without affecting the signal.',
      'I repaired the hinge on the little inner box. It was not broken enough to justify how satisfying that was.',
      'There is enough for both of us and the owner, if we use the sensible cups.'
    ]),
    pool('pokemon-magnemite', 'itemPokemon', { pokemonSeen: [81] }, 73, [
      'Magnemite hears a failing transformer before I do and announces this by staring at it.',
      'You have seen how it sorts metal: useful parts first, then every key in the building.',
      'Its magnets are precise. Its understanding of personal property is still experimental.',
      'Magnemite likes finished machines because they hum back without needing conversation.',
      'The screw on its left side is not loose. I checked; it simply enjoys watching me worry.',
      'Your team gives it room near their buckles now. Experience has improved everyone.',
      'It can hold a panel steady for exactly as long as something shinier stays absent.',
      'Magnemite sleeps beside the charging shelf and wakes before every old alarm clock.',
      'It found the missing washer yesterday. It had been wearing it.',
      'The shop is its habitat, workplace, and largest available collection of temptations.'
    ]),
    pool('relationship-rowan', 'relationships', { relationshipIds: ['rowan'] }, 35, [
      'Rowan tests a receiver by taking it somewhere I specifically did not recommend.',
      'He calls my checklists cautious. I call his battle notes checklists with dramatic margins.',
      'Rowan found the weak clasp by dropping the prototype. We disagree about whether this was a method.',
      'He does not tell me a design is good. He tells me exactly where it failed and comes back for the next version.',
      'I make his training timer; he makes me defend every button I add.',
      'Rowan prepares for outcomes. I prepare for repairs. Between us, surprises receive poor hospitality.',
      'He returned the radio muddy, dented, and accompanied by excellent range data.',
      'I told Rowan uncertainty was honest. He said honesty still needed a field test. Annoyingly useful.',
      'We compete over whose notes are more legible. Neither notebook supports either claim.',
      'Rowan waits through my whole answer now, even when the first half sounds like an apology.',
      'He challenges the work, not my right to do it. I noticed the distinction before he did.',
      'I would not ask Rowan for reassurance. I would ask him for the hill, bad weather, and a sharpened pencil.'
    ]),
    pool('rare-signed-radio', 'rare', { location: 'repair-shop', completedEventIds: ['theo-event-open-workshop'], pokemonCaught: [81], minStage: 'trusted' }, 110, [
      'Your Magnemite and mine are holding the signed receiver between them. This is either testing or custody.',
      'Both Magnemite found the same loose joint. I accept the peer review and object to the smug humming.',
      'The workshop sign, my name, your radio—nothing here became less real by being shared.',
      'I once hid prototypes under this bench. Now two Magnemite are demonstrating one to the entire shop.',
      'Leave the casing open a moment. The repair is finished, and I like seeing how we arrived.'
    ]),
    pool('repeat-talk', 'repeatInteraction', { repeatAtLeast: { talks: 8 } }, 45, [
      'Your stool is clear. I moved the same coil of wire I moved before your last three visits.',
      'Nothing dramatic broke today. I saved the small failures because you appreciate scale.',
      'Tea, hill, or five quiet minutes at the bench? All three remain valid.',
      'Magnemite heard the bell and surrendered one of your keys preemptively.',
      'I already told you about the clock. It has lost another four minutes with admirable commitment.',
      'You know where the cups are. Choose the one that pours in your preferred direction.',
      'The receiver still works. We can use it without turning the afternoon into a test.',
      'Same bench, different repair. Familiarity is efficient in ways I did not expect.',
      'I kept a question for you, but it can wait until after the apple bun.',
      'Come in. We have repeated this enough that the welcome is part of the mechanism.'
    ])
  ];

  window.CORE_CAST_DIALOGUE = window.CORE_CAST_DIALOGUE || {};
  window.CORE_CAST_DIALOGUE.theo = D;

  var trainer = (window.TRAINERS || []).find(function (item) { return item.id === 'theo'; });
  if (trainer) trainer.heartEventIds = (window.THEO_ACTIVE_HEART_EVENT_IDS || []).slice();

  function appendBeats(eventId, beats) {
    var groups = (window.EVENT_BEATS && window.EVENT_BEATS.theo) || [];
    var group = groups.find(function (item) { return item.sceneId === eventId; });
    if (group) Array.prototype.push.apply(group, beats);
  }
  appendBeats('theo-event-the-stuck-drawer', [
    { s: 'The repaired drawer sticks again when a warped invoice catches behind the runner. Theo starts to apologize, then stops at the first word.', c: [['Hold the lamp while he inspects it.', 'He finds the paper, explains the difference between a new fault and a failed repair, and fixes only what is wrong.', 12], ['Ask what he wants you to do.', '“Keep the customers from leaning on it.” You guard the counter while he works.', 12]] },
    { s: 'The shop owner asks whether the drawer is ready for the afternoon rush. Theo looks at the open frame and answers before you can.', c: [['Let his answer stand.', '“Ten minutes, then two test loads.” The owner nods and writes the time down.', 15], ['Offer to run the first test.', 'Theo chooses the weight and you pull the handle. The runner moves cleanly.', 12]] },
    { s: 'With the last screw seated, Theo closes the drawer and leaves the screwdriver on your side of the bench.', c: [['Return it without another adjustment.', 'He opens the drawer twice, calls it finished, and trusts the third opening to tomorrow.', 15], ['Ask him to sign the repair card.', 'He writes “Theo—with help holding the lamp,” and files it at the front.', 15]] }
  ]);
  appendBeats('theo-event-an-unsigned-ticket', [
    { s: 'The customer asks what Theo changed inside the kettle. He starts with “only,” then replaces it with the exact repair.', c: [['Listen without simplifying it for her.', 'She follows his explanation and asks for his name again so she can write it correctly.', 15], ['Ask to see the failed contact.', 'Theo shows both of you the scorched piece and lets the evidence carry the answer.', 12]] },
    { s: 'A second ticket waits on the counter, this one for a repair that came back once before.', c: [['Ask whether he will sign this one too.', '“Especially this one.” He signs beside the corrected date.', 15], ['Let him decide what belongs on it.', 'He adds his name, the return visit, and a precise note about what he missed.', 15]] },
    { s: 'The owner gives Theo a small stamp for future work orders. He tests it on scrap paper until every letter is clear.', c: [['Ask which ticket gets the first real mark.', 'He chooses the kettle ticket, then pins it where customers can see.', 12], ['Leave him to place it himself.', 'He stamps the next completed job and hands it across the counter without folding it.', 15]] }
  ]);
  appendBeats('theo-event-the-wrong-part', [
    { s: 'The replacement is delayed, and the customer arrives expecting the finished machine. Theo carries the unopened wrong motor to the counter.', c: [['Stand beside him without interrupting.', 'He names the mistake, the cost, and the new date in that order.', 15], ['Ask the customer what delay they can manage.', 'Theo listens, then arranges a loan machine from the shop instead of promising the impossible.', 12]] },
    { s: 'The owner asks Theo to propose what happens next rather than assigning the solution herself.', c: [['Give him time to think.', 'After a long pause he offers to cover the postage and redesign the order check.', 15], ['Point to the return instructions.', 'He uses them, then adds his own plan for preventing the same error.', 12]] },
    { s: 'Theo installs the correct motor days later while the customer watches from the marked side of the bench.', c: [['Let him finish his own repair.', 'He tests the machine, signs the ticket, and accepts payment without shrinking the price.', 15], ['Ask him to explain the final test.', 'He demonstrates each load and states plainly that the repair is his responsibility.', 15]] }
  ]);
  appendBeats('theo-event-open-workshop', [
    { s: 'A child brings up a toy whose sealed casing defeats Theo’s prepared examples. The whole room waits.', c: [['Ask what everyone can observe without opening it.', 'Theo gathers sounds, movement, and one useful detail from the child before choosing a safe test.', 15], ['Suggest putting it aside until permission is clear.', 'Theo asks the child’s guardian, then explains why waiting is part of responsible repair.', 15]] },
    { s: 'Rowan challenges the pocket receiver from the back row: “What happens when the hill blocks the signal?”', c: [['Let Theo answer the challenge.', '“I do not know at this power.” He draws a field-test route and asks Rowan to carry the second set.', 15], ['Offer your earlier range notes.', 'Theo uses the notes as evidence, then marks the unanswered terrain clearly on the map.', 12]] },
    { s: 'At closing, Theo writes every contributor’s name beside the repair they helped solve, then pauses over the workshop heading.', c: [['Tell him the heading is his decision.', 'He writes “Theo’s open workshop” and leaves the next date beneath it.', 15], ['Ask what he designed today.', '“A room that can say it does not know.” He signs the heading and unlocks next month’s list.', 15]] }
  ]);

  if (typeof window.labelEventBeatIds === 'function') window.labelEventBeatIds();

  function markOutcome(eventId, beatIndex, choiceIndex, flag) {
    var group = ((window.EVENT_BEATS || {}).theo || []).find(function (item) { return item.sceneId === eventId; });
    var choice = group && group[beatIndex] && group[beatIndex].c[choiceIndex];
    if (choice) choice.outcomeFlags = [flag];
  }
  markOutcome('theo-event-the-stuck-drawer', 4, 0, 'finished-together');
  markOutcome('theo-event-an-unsigned-ticket', 4, 1, 'signed-work');
  markOutcome('theo-event-the-wrong-part', 4, 0, 'owned-mistake');
  markOutcome('theo-event-open-workshop', 4, 1, 'open-unknown');

  if (trainer && window.CORE_CAST_PRODUCTION && CORE_CAST_PRODUCTION.theo) {
    CORE_CAST_PRODUCTION.theo.eventInventory.forEach(function (record) {
      var scene = trainer.events.find(function (event) { return event.id === record.eventId; });
      var group = ((window.EVENT_BEATS || {}).theo || []).find(function (item) { return item.sceneId === record.eventId; }) || [];
      record.beatIds = [scene.beatId].concat(group.map(function (beat) { return beat.id; }));
      record.choiceIds = (scene[3] || []).map(function (choice) { return choice.id; });
      group.forEach(function (beat) { record.choiceIds = record.choiceIds.concat(beat.c.map(function (choice) { return choice.id; })); });
    });
  }
})();
