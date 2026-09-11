/* Heart events for the wider cast.

   The five companions in trainers.js have bespoke arcs, seven events each. The
   other seventy-nine share ARCHETYPE arcs: three events of two beats, chosen by
   what the person does for a living. Two Bug Catchers therefore walk the same
   road, told with their own names and in their own place. That is the honest
   trade for a cast this size, and it still gives everyone a beginning, a middle
   and somewhere to end up.

   {name} is replaced with the character's name when the scene is rendered.

   Shape: FOLK_EVENTS[archetype] = [ {title, place, hearts, badges, beats:[...]} ]
   and each beat is { s: prose, c: [[choice, reply, points], ...] }. */

window.CLASS_STORY = {
  'Youngster': 'rookie', 'Lass': 'rookie', 'Bug Catcher': 'rookie',
  'Picnicker': 'rookie', 'Camper': 'rookie', 'Bird Keeper': 'rookie',
  'Note Taker': 'rookie', 'Flower Seller': 'rookie',

  'Fisherman': 'angler', 'Swimmer': 'angler', 'Sailor': 'angler',
  'Pearl Diver': 'angler', 'Ferryman': 'angler',

  'Hiker': 'climber', 'Miner': 'climber', 'Ranger': 'climber',
  'Mountain Guide': 'climber', 'Caver': 'climber', 'Cave Guide': 'climber',

  'Scientist': 'scholar', 'Archivist': 'scholar', 'Data Analyst': 'scholar',
  'Behaviourist': 'scholar', 'Systems Engineer': 'scholar', 'Cryogenics': 'scholar',
  'Field Researcher': 'scholar', 'Copyist': 'scholar', 'Archivist Emeritus': 'scholar',
  'Retired Lecturer': 'scholar', 'Move Tutor': 'scholar', 'Lab Aide': 'scholar',

  'Centre Nurse': 'carer', 'Field Nurse': 'carer', 'Harbour Nurse': 'carer',
  'Ridge Nurse': 'carer', 'Reading Room Nurse': 'carer', 'Lab Nurse': 'carer',
  'Cavern Nurse': 'carer', 'Quarter Nurse': 'carer',

  'Mart Clerk': 'merchant', 'Requisitions': 'merchant', 'Quarter Trader': 'merchant',
  'Supply Desk': 'merchant', 'Shop Hand': 'merchant', 'Bait Seller': 'merchant',
  'Post Runner': 'merchant', 'Lamplighter': 'merchant',

  'Veteran': 'veteran', 'Ace Trainer': 'veteran', 'Black Belt': 'veteran',
  'Referee': 'veteran', 'Gentleman': 'veteran', 'Beauty': 'veteran',

  'Night Owl': 'dreamer', 'Crossword Setter': 'dreamer', 'Café Regular': 'dreamer',
  'Debate Club': 'dreamer', 'Study Group Lead': 'dreamer', 'Barista': 'dreamer',
  'Waiter': 'dreamer', 'Rocker': 'dreamer',

  'Hex Maniac': 'mystic', 'Psychic': 'mystic', 'Sound Reader': 'mystic',

  'Pokémon Professor': 'professor'
};

/* Two hearts for the first, four for the second, six for the third, with a badge
   requirement climbing alongside. Set per event below. */
window.FOLK_EVENTS = {

  rookie: [
    { title: 'The first one they caught', place: 'by the tall grass', hearts: 2, badges: 0, beats: [
      { s: '{name} wants to show you something and is already unclipping the ball before you agree. It is the first Pokémon they ever caught, and it is not very good.',
        c: [['Ask them to tell you about it.', 'The story takes eleven minutes. You hear all of it.', 20],
            ['Say it looks well looked after.', '{name} goes pink and says they brush it every morning, which was not something you asked.', 18]] },
      { s: '"Everyone says I should box it," they say, not looking up. "For a better one."',
        c: [['Tell them it is their team.', '"It is my team," they repeat, trying the shape of it. The ball goes back on the belt.', 22],
            ['Ask what it is good at.', 'They think hard and come up with three things. Two of them are real.', 20]] }
    ]},
    { title: 'A bad loss', place: 'the shade behind the route sign', hearts: 4, badges: 2, beats: [
      { s: 'You find {name} sitting in the shade having lost badly to someone twice their age. They are being extremely brave about it.',
        c: [['Sit down without saying anything.', 'After a while they stop being brave, which is better.', 22],
            ['Ask what happened.', 'They walk you through every turn. Somewhere in the retelling they spot the mistake themselves.', 22]] },
      { s: '"Do you ever lose?" they ask. "Properly, I mean. Not almost."',
        c: [['Tell them about a loss of yours.', 'They cheer up so quickly it is almost insulting.', 22],
            ['Say that everyone does, and that it never stops mattering.', '"Right," they say. "Okay. Right." They pick up their bag.', 22]] }
    ]},
    { title: 'Their own route', place: 'the far end of the meadow', hearts: 6, badges: 5, beats: [
      { s: '{name} has been training out here alone for a month, and they have a plan they want to say out loud to somebody.',
        c: [['Listen to the whole plan.', 'It is a good plan. It has one hole and they find it while explaining.', 24],
            ['Ask what they will do first.', '"Tomorrow. The first gym." They say it like a fact rather than a hope.', 24]] },
      { s: 'They hold out a hand to shake, then change their mind halfway and just look pleased.',
        c: [['Shake it anyway.', '"See you on a route somewhere," they say, and mean it.', 24],
            ['Tell them to come and find you after.', 'They do. It takes six weeks and they arrive with a badge and no shoes.', 24]] }
    ]}
  ],

  angler: [
    { title: 'The long wait', place: 'the end of the boards', hearts: 2, badges: 0, beats: [
      { s: '{name} hands you a spare rod without being asked and goes back to watching the water. Nothing happens for a long time.',
        c: [['Wait with them.', 'Forty minutes. One bite, missed. They say it was a good session.', 22],
            ['Ask what you are waiting for.', '"Anything. That is rather the point of it." The line stays still.', 18]] },
      { s: 'Eventually something takes the line and gets away with half the bait.',
        c: [['Laugh.', 'They laugh too, which they were clearly waiting for permission to do.', 22],
            ['Ask if they want another go.', '"Always." They rebait both rods without looking.', 22]] }
    ]},
    { title: 'The thing that got away', place: 'the boathouse', hearts: 4, badges: 3, beats: [
      { s: '{name} keeps a snapped line coiled on a nail. "Eleven years ago. I never saw what it was."',
        c: [['Ask what they think it was.', 'They describe something enormous and are entirely aware that they are exaggerating.', 22],
            ['Ask why they kept the line.', '"So I remember I was there." They touch it once and put it back.', 24]] },
      { s: '"People think it is about catching things," they say. "It has never once been about catching things."',
        c: [['Ask what it is about.', '"Turning up." They are quiet for a bit. "Every day. Whatever happened yesterday."', 24],
            ['Say you understand.', 'They look at you properly for the first time. "I think you might."', 22]] }
    ]},
    { title: 'Your own nail', place: 'the boathouse', hearts: 6, badges: 6, beats: [
      { s: 'There is a second nail on the wall now, hammered in beside theirs, and it is empty.',
        c: [['Ask whose it is.', '"Yours. For whenever something snaps your line." They do not make it a moment.', 26],
            ['Say you will fill it eventually.', '"They all get filled eventually." They go back to the water.', 24]] },
      { s: 'They see you off at the top of the boards and stay there until you are out of sight.',
        c: [['Look back and wave.', 'They lift a hand without turning round, which is somehow more.', 24],
            ['Tell them you will be back Thursday.', '"I will be here." Of all the promises in the region it is the safest one.', 26]] }
    ]}
  ],

  climber: [
    { title: 'Carrying it yourself', place: 'the first switchback', hearts: 2, badges: 0, beats: [
      { s: '{name} is carrying far too much and will not be talked out of any of it.',
        c: [['Offer to take some.', 'They refuse, then hand you the kettle, which is the heaviest thing.', 20],
            ['Match their pace instead.', 'It nearly kills you. They notice and slow down without mentioning it.', 22]] },
      { s: 'At the top they set everything down and hand you the water first.',
        c: [['Drink and say nothing.', 'They sit beside you and look at the valley like it is new.', 22],
            ['Ask why they carry so much.', '"So that when somebody needs something, I have got it." They shrug.', 22]] }
    ]},
    { title: 'The bit that gave way', place: 'the roped section', hearts: 4, badges: 4, beats: [
      { s: 'A stretch of the path has come away. {name} looks at it for a long time without moving.',
        c: [['Ask what happened here.', '"Somebody came off. Years ago. They were fine." Their voice says it was not fine.', 24],
            ['Start looking for a way round.', 'You find one together. They mark it with three stones, carefully.', 22]] },
      { s: '"I check this bit every week," they admit. "Even though it has been safe for years."',
        c: [['Say you would too.', 'They nod once, hard, and the subject closes properly rather than being dropped.', 24],
            ['Offer to check it with them.', 'Now it is a Tuesday thing. It takes twenty minutes and neither of you skips it.', 26]] }
    ]},
    { title: 'The cairn', place: 'the summit', hearts: 6, badges: 7, beats: [
      { s: 'There is a pile of stones at the top that {name} has been adding to for years. They hand you one.',
        c: [['Put it on the top.', 'It sits crooked. They leave it exactly there.', 24],
            ['Ask what the stones are for.', '"Everyone who came up with me." There are a great many stones.', 26]] },
      { s: 'On the way down they walk in front, which they have never done before.',
        c: [['Follow.', 'You realise they are picking the easy line for you, and have been all year.', 24],
            ['Ask them to walk beside you.', 'They do, and talk the whole way down, which is also new.', 26]] }
    ]}
  ],

  scholar: [
    { title: 'The unfinished paper', place: 'a desk under a window', hearts: 2, badges: 0, beats: [
      { s: '{name} has three drafts of the same page and will not tell you which is newest.',
        c: [['Ask what the question is.', 'They light up. The question takes one sentence. The answer has taken four years.', 22],
            ['Ask which draft they like.', '"The first one." They look surprised to have said it.', 20]] },
      { s: '"It might be wrong," they say, tapping the page. "All of it. I would rather know."',
        c: [['Say that is the right instinct.', '"It is the only instinct." They start a fourth draft, more cheerfully.', 22],
            ['Offer to read it back to them.', 'Hearing it aloud finds the flaw in under a minute. They are delighted, which is unusual.', 24]] }
    ]},
    { title: 'The result that did not hold', place: 'the reading room', hearts: 4, badges: 4, beats: [
      { s: 'Something {name} published two years ago has been shown not to work. They have the notice on the desk.',
        c: [['Ask what the correction was.', 'They explain it fairly, including the part where they should have caught it.', 24],
            ['Say that is how it is meant to work.', '"I know. Knowing does not help as much as you would think." But they sit up.', 22]] },
      { s: '"I keep the wrong ones," they say, opening a drawer full of them. "People only keep the right ones. It gives a false impression."',
        c: [['Ask to see the drawer properly.', 'You go through it together. Half of the good work started in there.', 26],
            ['Say you keep a list of yours.', 'They ask to see it. Then they ask to see it again next month.', 24]] }
    ]},
    { title: 'A name on the paper', place: 'the reading room', hearts: 6, badges: 8, beats: [
      { s: '{name} slides a page across. Your name is on it, under theirs, in the acknowledgements.',
        c: [['Ask what for.', '"You asked the question that broke the old version." They say it like it settles the matter.', 26],
            ['Say it should not be there.', '"It is accurate," they say, which from them is the end of the argument.', 24]] },
      { s: 'They start clearing the far end of the desk without explaining why.',
        c: [['Ask if that is for you.', '"If you want it." There is already a lamp on it.', 26],
            ['Sit down at it.', 'Neither of you mentions it again. You are still there at closing.', 26]] }
    ]}
  ],

  carer: [
    { title: 'The long shift', place: 'behind the counter', hearts: 2, badges: 0, beats: [
      { s: 'It is late and {name} is still here, and has clearly been still here for some time.',
        c: [['Ask when they last sat down.', 'They have to think about it, which is its own answer. They sit down.', 22],
            ['Offer to wait while they finish.', 'They finish faster with someone waiting. You suspect they know that.', 20]] },
      { s: '"Everyone comes in at their worst," they say. "That is the job. It is a good job."',
        c: [['Ask what the good part is.', '"They come back in better. Every time. I never get tired of it."', 24],
            ['Say it must be exhausting.', '"Yes." They smile. "Both things are true."', 22]] }
    ]},
    { title: 'The one they lost', place: 'the back room', hearts: 4, badges: 3, beats: [
      { s: 'There is a ball on the shelf behind the counter that {name} never picks up.',
        c: [['Ask about it.', 'A trainer brought one in too late, years back. {name} kept the ball. Nobody came for it.', 24],
            ['Leave it alone.', 'They notice you noticing and not asking, which they appreciate more.', 22]] },
      { s: '"I could put it away," they say. "I have thought about it every year."',
        c: [['Say it can stay.', '"It can stay." They straighten it slightly and go back to work.', 24],
            ['Ask what the trainer was like.', 'They tell you. It is the first time in a while anyone has asked.', 26]] }
    ]},
    { title: 'Someone to sit with', place: 'the back room', hearts: 6, badges: 6, beats: [
      { s: 'The waiting room is empty for once. {name} makes two cups without asking whether you want one.',
        c: [['Stay for the whole break.', 'Twenty minutes of nothing in particular. They look ten years younger at the end of it.', 26],
            ['Ask about their own Pokémon.', 'They have one. It has been asleep under the counter this entire time.', 24]] },
      { s: '"You can come round the back whenever," they say. "Not as a patient."',
        c: [['Take the spare stool.', 'It has been there the whole time. You had assumed it was for supplies.', 26],
            ['Ask if you can help on the busy nights.', 'They say yes so fast it is clear they had been hoping.', 26]] }
    ]}
  ],

  merchant: [
    { title: 'Counting up', place: 'after closing', hearts: 2, badges: 0, beats: [
      { s: '{name} is counting the day out and the numbers are not going their way.',
        c: [['Offer to count the other drawer.', 'It comes out right on the second pass. They are very quiet about being relieved.', 22],
            ['Wait until they are done.', 'They finish, sigh, and say the shop has had worse weeks. It has not.', 18]] },
      { s: '"People think a shop is stock," they say, locking up. "It is not. It is who walks in."',
        c: [['Ask who walks in.', 'They can name most of the region and what each of them buys. It takes a while.', 24],
            ['Say you will walk in more often.', '"See that you do." They say it sternly and are pleased.', 22]] }
    ]},
    { title: 'The thing that will not sell', place: 'the back shelf', hearts: 4, badges: 3, beats: [
      { s: 'There is one item {name} has never sold and clearly never intends to.',
        c: [['Offer to buy it.', '"It is not for sale." Then, after a pause, the actual reason.', 24],
            ['Ask why they keep it out.', '"So I look at it." It belonged to whoever had the shop before them.', 24]] },
      { s: '"They gave me the keys and about four hours of instructions," they say. "I have been guessing ever since."',
        c: [['Say the guesses are working.', 'They look at the shelves, and around at the shop, and concede the point.', 24],
            ['Ask what the four hours covered.', 'Mostly where things are kept. They can still recite it.', 22]] }
    ]},
    { title: 'A key of your own', place: 'the shop door', hearts: 6, badges: 6, beats: [
      { s: '{name} is holding a spare key and being extremely casual about it.',
        c: [['Take it.', '"For the early deliveries," they say, as if that were the reason.', 26],
            ['Ask if they are sure.', '"I have thought about it for a month, so yes." That is the whole speech.', 26]] },
      { s: 'They go back to the counter and start on tomorrow\'s order, then stop.',
        c: [['Ask what they need.', '"Nothing. It is nice, having someone here after close."', 26],
            ['Start unpacking the crate by the door.', 'They let you. That has never been allowed before.', 26]] }
    ]}
  ],

  veteran: [
    { title: 'The measure of it', place: 'the practice ring', hearts: 2, badges: 1, beats: [
      { s: '{name} watches you battle without commenting, which is somehow worse than commenting.',
        c: [['Ask for their honest read.', 'It is honest. Three things you do well, two you do out of habit.', 24],
            ['Ask them to show you instead.', 'They take your position and move once. You see the difference immediately.', 24]] },
      { s: '"You will get bored of me saying the same thing," they warn.',
        c: [['Say you would rather hear it twice.', '"Good." They say it exactly the same way for a month.', 24],
            ['Ask them to say it differently each time.', 'They try. The third version is the one that finally lands.', 22]] }
    ]},
    { title: 'What it cost', place: 'the empty ring, late', hearts: 4, badges: 5, beats: [
      { s: 'Late on, {name} admits they have not entered a real match in six years.',
        c: [['Ask what stopped them.', '"I lost one I should have won and I never found the way back in."', 26],
            ['Ask if they miss it.', 'A long pause. "Every single day." Then they change the subject firmly.', 24]] },
      { s: '"Do not do that," they say. "Whatever it is you are afraid of losing. Enter anyway."',
        c: [['Promise you will.', 'They make you say which one, and when. Then they write it down.', 26],
            ['Ask them to enter with you.', 'They laugh. Then they stop laughing and ask when the next one is.', 26]] }
    ]},
    { title: 'Back in the ring', place: 'the practice ring', hearts: 6, badges: 9, beats: [
      { s: '{name} has entered. They are pretending this is a small thing and fooling nobody.',
        c: [['Say nothing about it.', 'They thank you for that afterwards, specifically.', 26],
            ['Tell them you will be in the crowd.', '"Do not shout." You shout.', 26]] },
      { s: 'They come second. They find you before they find anyone else.',
        c: [['Congratulate them.', '"Second," they say, testing it. "Second is not nothing."', 26],
            ['Ask when the next one is.', 'They already know the date. They have known for a week.', 28]] }
    ]}
  ],

  dreamer: [
    { title: 'The usual table', place: 'the corner seat', hearts: 2, badges: 0, beats: [
      { s: '{name} has a table, a notebook, and a project they have not described to anyone.',
        c: [['Ask what it is.', 'They describe it badly and at length. It is a genuinely good idea.', 22],
            ['Sit down without asking.', 'They shift their things over. It becomes a two-person table without discussion.', 22]] },
      { s: '"Everybody asks when it will be finished," they say. "Nobody asks what it is."',
        c: [['Ask what it is again, properly.', 'The second explanation is much better. They notice that too.', 24],
            ['Say you will never ask when.', 'They put the pen down. "Deal."', 22]] }
    ]},
    { title: 'The stalled month', place: 'the corner seat', hearts: 4, badges: 3, beats: [
      { s: 'The notebook has not moved in weeks. {name} is at the table anyway, out of habit.',
        c: [['Ask them to explain the hard part.', 'Halfway through explaining it they stop and say "oh", and start writing.', 26],
            ['Suggest a day off.', 'They take one. They come back with more than the last three weeks produced.', 24]] },
      { s: '"I sat here every day and did nothing," they say. "That is a month of my life."',
        c: [['Say sitting down was the discipline.', '"That is a generous reading." They write it inside the cover anyway.', 24],
            ['Point at what they wrote today.', 'It is four lines. They look at it for a while.', 24]] }
    ]},
    { title: 'The first page', place: 'the corner seat', hearts: 6, badges: 6, beats: [
      { s: '{name} has finished something. It is small and they are holding it like it might go off.',
        c: [['Ask to be the first to see it.', 'They hand it over immediately, having plainly hoped you would ask.', 28],
            ['Ask what happens next.', '"I show somebody." A pause. "I am showing somebody."', 26]] },
      { s: 'There is a dedication on the inside cover and it is short.',
        c: [['Read it aloud.', 'It is your name and the words "who never asked when". They look at the table.', 28],
            ['Read it and hand it back.', 'They put it in your bag instead. "That one is yours."', 28]] }
    ]}
  ],

  mystic: [
    { title: 'What they see', place: 'somewhere badly lit', hearts: 2, badges: 1, beats: [
      { s: '{name} says something about you that they should not know, then looks embarrassed about it.',
        c: [['Ask how they knew.', '"You stand differently before a hard question." Not a vision. Attention.', 24],
            ['Let it go.', 'They relax, having expected to be asked to prove it and be disbelieved.', 22]] },
      { s: '"Most people want it to be a trick," they say. "It is easier for them if it is a trick."',
        c: [['Say you do not think it is a trick.', 'They look at you for slightly too long, and let that stand.', 24],
            ['Ask them to teach you to look.', 'The lesson is one sentence: watch the hands, not the face.', 24]] }
    ]},
    { title: 'The thing they will not look at', place: 'the dark end', hearts: 4, badges: 5, beats: [
      { s: 'There is a corner {name} routes around every single time, without seeming to notice they are doing it.',
        c: [['Point it out gently.', 'They stop dead. "I have been doing that for years, have I."', 26],
            ['Walk to it yourself.', 'It is nothing. That is what frightens them about it.', 24]] },
      { s: '"Not everything that is there is worth following," they say. "That is the whole of what I know."',
        c: [['Ask what happens if you follow it.', '"Nothing good and nothing certain." They mean it as a technical remark.', 24],
            ['Stand with them and look at it.', 'It stays nothing. After a while they turn round first.', 26]] }
    ]},
    { title: 'A lamp each', place: 'the dark end', hearts: 6, badges: 8, beats: [
      { s: '{name} has brought two lamps down and is being unconvincingly casual about the second one.',
        c: [['Take it.', '"You will want your own light eventually." They light it for you.', 28],
            ['Ask why two.', '"Because I would rather not be the only one who can see." Honest, for once.', 28]] },
      { s: 'You walk the whole passage together. Nothing happens at all.',
        c: [['Say so.', '"Yes," they say, sounding almost disappointed and mostly relieved.', 26],
            ['Ask to do it again next week.', 'They agree before you finish the sentence.', 28]] }
    ]}
  ],

  professor: [
    { title: 'The field notes', place: 'the lab, after hours', hearts: 2, badges: 7, beats: [
      { s: 'Professor Linden has forty years of field notes and is looking for one page in the middle of all of them.',
        c: [['Help her look.', 'You find it in an hour. She had been looking for two days and had not asked anyone.', 24],
            ['Ask what is on the page.', '"A measurement I took at nineteen that I no longer believe." She keeps looking.', 24]] },
      { s: 'The page, when it turns up, is wrong. She is visibly delighted about it.',
        c: [['Ask why that is good news.', '"Because I can see it is wrong. At nineteen I could not." She files it at the front.', 26],
            ['Ask what she believes now.', 'She tells you. It takes an hour and she draws most of it.', 26]] }
    ]},
    { title: 'The student she lost', place: 'the lab, after hours', hearts: 4, badges: 9, beats: [
      { s: '"Dr. Oakes taught me," Linden says, apropos of nothing. "I have never told him it mattered."',
        c: [['Ask why not.', '"Because then he would know, and I would have to be the sort of person who says things."', 26],
            ['Suggest telling him.', 'She says absolutely not. She asks twice more that evening how you would phrase it.', 26]] },
      { s: 'Two weeks later Dr. Oakes mentions, very casually, that Linden left a note on his desk.',
        c: [['Ask what it said.', '"Thank you. That is the entire note." He has it in his pocket.', 28],
            ['Say nothing and let him tell you.', 'He tells you anyway, twice, on the same afternoon.', 28]] }
    ]},
    { title: 'Your name in the index', place: 'the lab', hearts: 6, badges: 12, beats: [
      { s: 'Linden is starting a new volume of notes and has left the first page blank on purpose.',
        c: [['Ask what goes there.', '"Whoever is carrying it next." She looks at you steadily.', 28],
            ['Say you are not qualified.', '"Neither was I. I was nineteen and wrong about a measurement."', 28]] },
      { s: 'She hands you the pen. It is a very old pen and she is clearly attached to it.',
        c: [['Write your name.', 'She reads it upside down, nods once, and starts on the second page.', 30],
            ['Ask her to write it.', 'She writes your name in her own hand, which is somehow the bigger thing.', 30]] }
    ]}
  ]
};
