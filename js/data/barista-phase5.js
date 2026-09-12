/* Phase 5 Slice 4: Tier 2 batch, the Compiler Café counter (1 of 2) - Mo (the
   "barista" cast entry). Every string is a complete contextual response;
   categories count responses rather than fragments, same convention as
   sci-oak-phase5.js and oz-phase5.js/sal-phase5.js (the Tier 2 templates from
   Slices 2-3). Mo is Tier 2, so she gets no CAST_BIBLES entry - her voice and
   arc live entirely in this file and in her dedicated FOLK_EVENTS['counter']
   arc (see folk-events.js). She was carved out of the shared 'dreamer'
   archetype alongside Dax (see dax-phase5.js) in the same batch, so this
   content does not leak onto the other dreamer-archetype townsfolk (Nel,
   Sasha, Juno, Rook). Mo and Dax's arcs complete each other by ordinary
   narrative reference only - see each character's Event 2 - not the
   relationshipIds gate; see oz-phase5.js's header comment and the Phase 5
   handoff's "Known risks" for why. */
(function () {
  function pool(id, category, when, priority, lines, extra) {
    var value = { id: 'barista-dialogue-' + id, category: category, when: when || {}, priority: priority || 0, lines: lines };
    if (extra) Object.keys(extra).forEach(function (key) { value[key] = extra[key]; });
    return value;
  }

  var D = [
    pool('first-meeting', 'firstMeeting', { firstMeeting: true }, 120, [
      'Table by the window is taken most afternoons, in case you were wondering. You know the ones.',
      'Mo. I run the counter, which mostly means I remember everyone\'s order better than they remember mine.',
      'Ask Dax about the coffee and he will tell you it is fine. Ask me and I will tell you the truth about it.',
      'I notice things about regulars they would rather I did not. Occupational hazard of standing behind a counter all day.',
      'Two short sessions beat one long one, is what I always say, and then I stand here for ten hours straight myself.',
      'The espresso machine has a temper some mornings. So do I. We manage.',
      'Come find me if you want the honest version of anything happening in this café. I deal exclusively in honest versions.',
      'Dax has been in that chair since ten most days for longer than I have kept precise count. Ask him about it. He will not tell you either.',
      'I have worked this counter long enough to read a regular\'s whole week off the way they order. Yours, I have not figured out yet.',
      'Welcome to the café. Sit anywhere except the window table this afternoon. That one is spoken for, as ever.'
    ]),
    pool('stage-acquaintance', 'friendshipStages', { stage: 'acquaintance' }, 40, [
      'You came back. Most people get one good cup and consider the relationship concluded.',
      'You asked how I take my own coffee, which nobody ever asks the person behind the counter.',
      'I have started making yours slightly differently without you noticing. Small thing.',
      'You remembered my name without me repeating it twice. Genuinely rare.',
      'I have stopped double-checking your order back to you. That is trust, from me.',
      'Dax noticed you talking to me longer than usual. He did not say anything about it, which from him is a whole reaction.',
      'You tip the way someone tips when they have worked a counter themselves. I notice that sort of thing.',
      'Come by again. I will have the good batch on by then, hopefully.',
      'You have not once asked me to hurry up. I appreciate that more than you would guess.'
    ]),
    pool('stage-recognition', 'friendshipStages', { stage: 'recognition' }, 40, [
      'You have started ordering the same thing without me asking. That is further along than most regulars get in a month.',
      'I caught you watching how I read the room before I read yours. Fair. I would watch too.',
      'You have noticed I watch the window table. You have not asked why yet. I appreciate the patience.',
      'Dax asked, offhand, who the trainer who actually talks to me was. I told him your name properly, for once.',
      'You have stopped ordering just to make conversation. Now you actually want the coffee. Better, honestly.',
      'I have started saving you the good seat when I see you coming. Small thing. Deliberate, though.',
      'You return a mug to the counter instead of leaving it at the table. Uncommon, in my experience.',
      'I trust your read on a slow morning versus a bad one now. That took a while to earn.',
      'You ask what is actually good today instead of what is popular. Correct order of questions.'
    ]),
    pool('stage-comfortable', 'friendshipStages', { stage: 'comfortable' }, 40, [
      'I told you about the index card. Most people never even learn it exists.',
      'You asked why I have never made the thing on it, and I gave you the honest answer instead of a joke.',
      'The seat by the counter is basically yours now when you want it, not just the window table.',
      'I have stopped performing "endlessly patient barista" quite so hard around you specifically.',
      'You sat through a genuinely bad rush without once asking me to hurry. Good instinct.',
      'I trust your opinion on the new blend nearly as much as my own tongue at this point.',
      'There is a mug behind the counter that is basically yours now, if you ever want to leave it here between visits.',
      'Dax would call this "unusually generous access to the good seat," and for once he would not be wrong.',
      'You ask what is actually happening with me before you ask what is on the menu. I have noticed, and I like it.'
    ]),
    pool('stage-beginning', 'friendshipStages', { stage: 'beginning' }, 40, [
      'I told you about wanting to make something of my own, for once, instead of the usual menu. You did not laugh.',
      'You said the idea sounded worth trying, and I have not entirely stopped thinking about that since.',
      'The index card has your name pencilled in the corner now, next to a note about a taste test you were there for.',
      'I have started actually considering the thing on the card instead of just keeping it hidden behind the register.',
      'You do not flinch when I admit I am scared to actually try it. Most people just say "you should," which helps less than they think.',
      'Dax wants your opinion on something now too, apparently. That is not nothing, coming through him.',
      'I let you taste an early, terrible version of the idea. It was genuinely bad. You told me so, kindly.',
      'The notebook of possible names for it now has a page. It is shorter than I would like.',
      'You are welcome to tell me an idea is bad. I would rather hear that from you than be humored by a stranger.'
    ]),
    pool('stage-friend', 'friendshipStages', { stage: 'friend' }, 40, [
      'You know which mornings I am actually fine and which ones I am performing fine. I have stopped bothering to hide the difference from you.',
      'I let you see the card before I decided what to actually do with it. Most people never get shown that at all.',
      'You bring up the idea before I can talk myself out of it again. I have started letting you win that race.',
      'I trust your judgment on whether a new batch is actually good nearly as much as my own, and I do not say that lightly.',
      'The window table thing has slowed down around you. I choose to believe that means something.',
      'I have stopped performing calm about the counter being busy, around you specifically. It is a relief, oddly.',
      'You are the reason I finally wrote the recipe down properly instead of just keeping it in my head. Consider this the thanks I am bad at giving directly.',
      'We should sit at an actual table together sometime. Not the counter. Not the window one either. Just any of them.',
      'Dax calls you "the trainer who actually gets her to sit down." Coming from him, that is the whole compliment.'
    ]),
    pool('stage-trusted', 'friendshipStages', { stage: 'trusted' }, 40, [
      'I told you I was scared the idea was just bad, before I had actually tried it properly. You did not rush me to test it.',
      'You get the honest count of how many mornings actually go badly here, not the version where it is always fine.',
      'I do not need you to taste-test something twice before I believe it is good myself anymore. That took a while to build.',
      'You know the two things that actually make me admit a batch did not work, without me spelling them out again.',
      'I told you about a morning that genuinely rattled me, the uncomfortable parts included.',
      'We disagree about whether the window table thing is funny or sad. I have started thinking you might have a point.',
      'I trust you with an unfinished idea now, which is further than I extend most people who only hear the finished ones.',
      'You are one of maybe two people who have seen me actually uncertain whether something was worth trying at all.',
      'I trust you with a recipe before I know if it works. That is further than I extend most people who only taste the finished version.'
    ]),
    pool('stage-close', 'friendshipStages', { stage: 'close' }, 40, [
      'The menu board has your name near an entry now, and I did not need to talk myself into writing either one down.',
      'You ask what I actually think before you ask what sounds good. I have started expecting that, and preferring it.',
      'I do not perform the tireless-barista bit for you at all anymore. You have seen me actually tired, plainly, and never once made it smaller than it was.',
      'There is no version of a good week here that I do not want to tell you about, plain or otherwise.',
      'I still keep some things behind the counter, quietly. I have simply stopped keeping everything there.',
      'You are allowed to call out a bad batch mid-sip now, not just after. I have extended that to exactly one other person, and he does it constantly.',
      'Ask me the plain version of anything happening here. I would rather you heard it true than heard it impressive.',
      'Same counter tomorrow, probably a slightly different me after that, and somehow you make either version feel worth turning up for.',
      'Years of watching the window table from behind this counter, and you are the reason I finally understand why I kept watching it at all.'
    ]),
    pool('post-the-third-untouched-cup', 'postEvent', { completedEventIds: ['barista-folk-counter-event-the-third-untouched-cup'], recentEventIds: ['barista-folk-counter-event-the-third-untouched-cup'] }, 90, [
      'I still ask, now, instead of just refilling. Small habit. Sticking, so far.',
      'Dax\'s cup gets finished most days now. I still notice when it does not.',
      'You still ask what is actually going on before you ask what is on the menu. I have started expecting that question first, from anyone.',
      'I have not gone back to just quietly refilling and hoping. Asking stuck.',
      'Dax mentioned, once, that he noticed I actually asked. From him, noticing out loud is the compliment.',
      'I caught myself starting to just refill someone else\'s cup without asking last week. I stopped and asked instead.',
      'The coffee for his order has not gone back to full strength. I decided that is fine either way.',
      'You were there when I finally asked him outright. I still think about that more than I let on.',
      'A new regular went quiet for a few days recently. I asked early this time, instead of waiting three.',
      'I have not needed three days of silence to notice something is wrong since. Turns out asking early works better.'
    ], { acknowledgesEventId: 'barista-folk-counter-event-the-third-untouched-cup' }),
    pool('post-the-other-side-of-the-counter', 'postEvent', { completedEventIds: ['barista-folk-counter-event-the-other-side-of-the-counter'], recentEventIds: ['barista-folk-counter-event-the-other-side-of-the-counter'] }, 91, [
      'The window-table blend is still on the board. It sells out most afternoons now.',
      'You still ask if I am going to try the next idea before I have even finished the last one.',
      'Dax orders the window-table blend every time he is back in town. He will deny that is sentimental. It obviously is.',
      'I hand the counter to Kip more often now, on purpose, not just the once.',
      'You watched me actually take the risk, the first time. I have not forgotten who was standing there for that.',
      'I have stopped underselling my own ideas to myself quite so automatically. Progress, most days.',
      'A second recipe made it onto the board since. Smaller success. Still counts.',
      'The battered index card is retired now. Everything on it lives on the actual menu.',
      'I still watch the window table out of habit. I have simply stopped only watching it.'
    ], { acknowledgesEventId: 'barista-folk-counter-event-the-other-side-of-the-counter' }),
    pool('location-cafe', 'location', { location: 'cafe' }, 60, [
      'This counter is mine, mostly by default rather than any actual claim on it.',
      'The window table stays taken most afternoons. Ask around and someone will tell you the same running joke.',
      'Nel runs her group two tables over on Thursdays. I keep the pot fresh and stay well out of the argument.',
      'Sasha will debate you about anything if you let her. I have learned not to let her, on slow mornings especially.',
      'Juno comes in near closing most nights. I keep one table lit later than the rest for exactly that reason.',
      'Rook sits quietly with a crossword for hours and orders exactly enough to justify the seat. I do not mind at all.',
      'Dax has had that chair by the window for longer than I have kept precise count.',
      'This whole café runs on the same handful of regulars showing up in roughly the same order every day. It mostly works.',
      'Kip covers the counter when I need a minute. He is better at small talk than I let on to him.'
    ]),
    pool('location-town', 'location', { location: 'town' }, 55, [
      'I come into town mostly for supplies and to hear what people are actually saying about the coffee.',
      'Half of town assumes I never leave the counter. Mostly correct, admittedly.',
      'The café does not miss me for an afternoon. It rarely misses anyone for long.',
      'People expect a barista to be endlessly cheerful. I am occasionally cheerful. That has to be enough.',
      'If I am not at the café, I am probably restocking somewhere in town instead.',
      'The general store keeps my usual order ready without my needing to repeat it. Small consistency I rely on.'
    ]),
    pool('mood-tense', 'recentMoodRumor', { mood: 'tense' }, 75, [
      'Bad morning behind the counter. The machine jammed twice and I nearly said something sharp to someone who did not deserve it.',
      'I almost told a regular the wrong thing today, out of distraction. Caught it in time. Still rattled by how close it was.',
      'Give me a minute before you ask how it is going. The honest answer is not a cheerful one right now.',
      'Dax\'s chair sat empty longer than usual today and it bothered me more than I expected.',
      'Something did not add up in the till today, and it will sort itself out, and I remain irritated regardless.',
      'I need to just work quietly for a bit rather than talk it through. Stay if you like.',
      'Someone complained about the coffee today, unfairly, and I had no good response ready. That one stung more than it should have.'
    ]),
    pool('mood-content', 'recentMoodRumor', { mood: 'content' }, 55, [
      'Good morning today. The machine behaved, the regulars were kind, and nobody needed extra patience from me.',
      'Dax actually finished his coffee today, all of it, without me having to ask. Small thing. Noted anyway.',
      'Nobody needed the difficult version of anything today. The plain, ordinary version was enough, and it was good.',
      'I tried a new pour today and it worked on the first attempt. Rare enough to mention on its own.',
      'The window table got used by someone new today, briefly. I found that oddly nice to watch.',
      'A genuinely good day behind the counter, by my standard, which admittedly requires very little to clear.',
      'Rook actually finished his crossword today and told me the answer unprompted. I am choosing to be pleased about that.'
    ]),
    pool('item-teatin', 'itemPokemon', { itemIds: ['teaTin'] }, 72, [
      'Good tea, this. I will actually drink it myself instead of just serving it to someone else.',
      'Dax will pretend he does not want any and then finish half the tin by next week. Watch.',
      'I will ration this properly rather than use it all at once, which is exactly what I did with the last one someone gave me.',
      'This might be the first thing anyone has given me here that I have not immediately put behind the counter for someone else.',
      'Fair warning: I will absolutely serve this to regulars and take full credit for finding it myself.',
      'A good tea and a slow afternoon pair well. Thank you, genuinely.',
      'I am difficult to buy for, apparently, since I claim to want nothing and mean almost none of it. This one I mean.',
      'This will not last the week once the regulars smell it brewing. I am not even slightly sorry about that.'
    ]),
    pool('pokemon-combee-cafe', 'itemPokemon', { pokemonSeen: [415] }, 70, [
      'One of these has been getting into the pastry case for a week. I have given up chasing it off properly.',
      'Dax insists it only bothers his table. I have watched it visit every table equally. He remains unconvinced.',
      'Rook has started leaving it a single crumb deliberately. I have decided not to mention that to health regulations.',
      'It shows up right before the afternoon rush, reliably enough that I have started timing the ovens by it.',
      'Skiff apparently sees a whole cluster of them near the shore. Explains where ours keeps disappearing to.',
      'It is, against my better judgment, good for business. People ask about it more than they ask about the coffee some days.'
    ]),
    pool('repeat-talk', 'repeatInteraction', { repeatAtLeast: { talks: 8 } }, 45, [
      'Same counter, same question on your face. The window table is still taken, before you ask.',
      'You know the routine by now. Sit anywhere except that one table, same as always.',
      'Come in. Mind the wet floor near the door; I have been meaning to put a sign up for weeks.',
      'Coffee talk, café gossip, or just sitting quietly while I work. All three remain on offer.',
      'Nothing dramatic happened here since we last spoke. I noticed the small things anyway, because you would ask.',
      'You keep turning up around the same time each day. I have stopped being surprised and started simply expecting it.',
      'Same question, same honest answer: the coffee is fine, the tea is better, and I will tell you which is which if you ask.',
      'Come sit. Dax is by the window, being considerably quieter than usual lately.',
      'The regulars ask about you now when you have not been in for a few days. Make of that what you will.',
      'Same counter, same apron, same general refusal to sit down during a shift. I would not trade it for an easier job.',
      'You have a standing welcome at this counter now. I do not extend those to just anyone who orders coffee.'
    ]),
    pool('rare-full-circle', 'rare', { location: 'cafe', completedEventIds: ['barista-folk-counter-event-the-other-side-of-the-counter'], minStage: 'trusted' }, 108, [
      'Dax sent a letter with a pressed leaf inside and nothing else written. I understood it immediately anyway.',
      'The window-table blend outsold everything else again today. I am choosing to be smug about it, quietly.',
      'The index card, the recipe now on the board, and a postcard from three towns over: apparently this is what trying looks like, up close.',
      'Sit a while. The rush is over, the blend is fresh, and today, for once, I am the one taking a break at a table instead of behind one.'
    ])
  ];

  window.CORE_CAST_DIALOGUE = window.CORE_CAST_DIALOGUE || {};
  window.CORE_CAST_DIALOGUE.barista = D;
})();
