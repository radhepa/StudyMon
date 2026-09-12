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

function socialIdPart(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function labelSocialChoices(choices, prefix) {
  (choices || []).forEach(function (choice) {
    choice.id = prefix + '-choice-' + socialIdPart(choice[0]);
  });
}

window.CLASS_STORY = {
  'Youngster': 'rookie', 'Lass': 'rookie', 'Bug Catcher': 'rookie',
  'Picnicker': 'rookie', 'Camper': 'rookie', 'Bird Keeper': 'rookie',
  'Note Taker': 'rookie', 'Flower Seller': 'rookie',

  'Eager Bug Catcher': 'stockpile', 'Quiet Bug Catcher': 'hush',

  'Fisherman': 'angler', 'Swimmer': 'angler', 'Sailor': 'angler',
  'Pearl Diver': 'angler', 'Ferryman': 'angler',

  'Restless Fisherman': 'restless-angler', 'Patient Fisherman': 'patient-angler',

  'Hiker': 'climber', 'Miner': 'climber', 'Ranger': 'climber',
  'Mountain Guide': 'climber', 'Caver': 'climber', 'Cave Guide': 'climber',

  'Loaded Hiker': 'ballast', 'Steady Hiker': 'stride',

  'Careful Cave Guide': 'bearings', 'Keeper Caver': 'unclaimed', 'Exacting Miner': 'overflow',

  'Chief Archivist': 'catalog', 'Precise Copyist': 'facsimile',

  'Scientist': 'scholar', 'Archivist': 'scholar', 'Data Analyst': 'scholar',
  'Behaviourist': 'scholar', 'Systems Engineer': 'scholar', 'Cryogenics': 'scholar',
  'Field Researcher': 'scholar', 'Copyist': 'scholar', 'Archivist Emeritus': 'scholar',
  'Retired Lecturer': 'scholar', 'Move Tutor': 'scholar', 'Lab Aide': 'scholar',

  'Linden Lab Aide': 'aide',
  'Lab Archivist Emeritus': 'emeritus',

  'Centre Nurse': 'carer', 'Field Nurse': 'carer', 'Harbour Nurse': 'carer',
  'Ridge Nurse': 'carer', 'Reading Room Nurse': 'carer', 'Lab Nurse': 'carer',
  'Cavern Nurse': 'carer', 'Quarter Nurse': 'carer',

  'Mart Clerk': 'merchant', 'Requisitions': 'merchant', 'Quarter Trader': 'merchant',
  'Supply Desk': 'merchant', 'Shop Hand': 'merchant', 'Bait Seller': 'merchant',
  'Post Runner': 'merchant', 'Lamplighter': 'merchant',

  'Veteran': 'veteran', 'Ace Trainer': 'veteran', 'Black Belt': 'veteran',
  'Referee': 'veteran', 'Gentleman': 'veteran', 'Beauty': 'veteran',

  'Quarter Warm-Up Ace': 'warmup', 'Quarter Standards Ace': 'standards',

  'Night Owl': 'dreamer', 'Crossword Setter': 'dreamer', 'Café Regular': 'dreamer',
  'Debate Club': 'dreamer', 'Study Group Lead': 'dreamer', 'Barista': 'dreamer',
  'Waiter': 'dreamer', 'Rocker': 'dreamer',

  'Window-Table Barista': 'counter', 'Permanent Fixture': 'fixture',

  'Hex Maniac': 'mystic', 'Psychic': 'mystic', 'Sound Reader': 'mystic',

  'Pokémon Professor': 'professor',

  'Observatory Director': 'archivist'
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

  stockpile: [
    { title: 'The one he has not used', place: 'the meadow grass', hearts: 2, badges: 2, beats: [
      { s: '{name} proudly lines up all six of his catches for you to admire, then puts them all back the moment you ask which one is his best in a real fight.',
        c: [['Ask why he never says.', '"Because ranking them means picking one to actually use, and I have not gotten there yet."', 18],
            ['Ask if he ever battles with any of them.', '"Rarely. Mostly I catch a seventh instead of finding out about the six I have."', 16]] },
      { s: 'He explains his system: a new catch always goes to the back of the line, "for later," and later never quite arrives.',
        c: [['Ask how long the line has been growing.', '"Since the first one. I have gotten very good at postponing and very bad at admitting it."', 18],
            ['Say that sounds like a lot of pressure on "later."', '"It is. \'Later\' has done a great deal of work it was never actually equipped for."', 20]] },
      { s: '"If I send one out and it loses," he says, quieter than usual, "that proves having six was never about being ready. It was just about not finding out."',
        c: [['Ask what he thinks he would find out.', '"That collecting was the easy part, and I was using it to avoid the hard one."', 20],
            ['Say losing once would not undo the other five.', '"Logically, no. It would still feel like proof of something I would rather not have proof of."', 22]] },
      { s: 'He admits he has started introducing his catches by number instead of by name, "so it hurts less if one of them ever actually has to try something."',
        c: [['Ask if that is working.', '"No. I know every one of their names. The numbers are for show, mostly for my own."', 22],
            ['Say the names probably matter more than the numbers.', '"They do. I have simply been pretending otherwise, out loud, to myself."', 22]] },
      { s: 'He sets one, specifically, slightly apart from the other five - the one he has been most afraid to risk, and the one he privately trusts the most.',
        c: [['Ask why that one.', '"Because it is the one I would mind losing most, which apparently means it is also the one I trust most to handle it."', 24],
            ['Ask if setting it apart changes anything.', '"Only that I can no longer pretend I have not noticed which one it is."', 22]] },
      { s: 'For the first time, {name} admits out loud that "eventually" has been doing the job of "never," and that he would rather it stopped.',
        c: [['Ask what changes now.', '"I do not entirely know yet. I know which one goes first, though. That is new."', 26],
            ['Say that sounds like real honesty, for him.', '"It is. I have found it considerably harder than catching anything."', 26]] }
    ]},
    { title: 'Sending the first one out', place: 'the meadow, near the tree line', hearts: 4, badges: 5, beats: [
      { s: 'Flo watches {name} line up his six again, out of habit, and says only: "watching that hard is its own kind of not-ready." He goes very still.',
        c: [['Ask him how that lands.', '"Accurately. Uncomfortably so, coming from someone who watches for a living."', 24],
            ['Ask Flo if she meant it as a challenge.', '"Only a little. Mostly I meant it as true."', 22]] },
      { s: 'He picks the one he set apart last time, holds it a long moment, and does not put it back.',
        c: [['Ask if he is ready.', '"No. I am going to do it anyway, which I am told is the actual definition of ready, for people like me."', 24],
            ['Offer to stand with him for it.', '"I would not mind that, actually. First time for that too."', 22]] },
      { s: 'The battle happens plainly, without the outcome getting dwelt on afterward - what matters is that it happened at all, not who won.',
        c: [['Ask how it felt, regardless of the result.', '"Smaller than six years of avoiding it deserved. Also considerably more real."', 26],
            ['Say the result mattered less than the sending.', '"I am choosing to agree with that, mostly because the alternative is dwelling on the result."', 24]] },
      { s: 'He returns it to the line, not at the back this time, but at the front, where he can see it first.',
        c: [['Ask why the front.', '"Because it is not waiting for later anymore. It already had its turn. That earns a better spot."', 26],
            ['Say the whole line looks different now.', '"It does. I am fairly sure that is not really about where anyone is standing."', 26]] },
      { s: 'Flo asks, plainly, which one is next. {name} actually has an answer this time, instead of changing the subject.',
        c: [['Ask him to say it out loud.', 'He does, without flinching, and looks faintly surprised at himself for managing it.', 28],
            ['Say that answer came quickly.', '"It did. Apparently six years of not deciding leaves you oddly ready to, once you finally start."', 28]] },
      { s: '{name} tells a newer trainer at the meadow\'s edge that six is not a number worth bragging about if none of them have ever actually tried anything - and means it kindly, not as a scolding.',
        c: [['Ask why tell them that, unprompted.', '"Because nobody told me, and it cost me longer than it needed to. I would rather it cost them less."', 28],
            ['Say that is a genuinely different way for him to talk about it.', '"It is. Flo would say it took her exactly one sentence to get me here. She is not wrong, and I am choosing not to let that go to her head."', 28]] }
    ]}
  ],

  hush: [
    { title: 'Shh, always', place: 'the tall grass at the meadow\'s edge', hearts: 2, badges: 2, beats: [
      { s: '{name} shushes you before you have said anything, eyes fixed on a rustle in the grass that turns out to be nothing at all.',
        c: [['Ask if that happens often.', '"Constantly. Most of what I hush people for turns out to be nothing. I would still rather hush unnecessarily than scare off the one time it matters."', 18],
            ['Ask how long she has been watching this particular patch.', '"Longer than I have caught anything from it, if that answers the actual question."', 16]] },
      { s: 'She admits, when pressed, that she has not actually caught anything herself in longer than she is comfortable saying out loud.',
        c: [['Ask why not, if she is this good at finding them.', '"Finding them is the easy part. Catching one means disturbing the exact quiet I am supposedly protecting."', 18],
            ['Ask if that bothers her.', '"Some days. Other days I decide watching is its own kind of enough."', 18]] },
      { s: '"If I catch one," she says, "I become one more person who disturbed this place instead of the one person keeping it undisturbed."',
        c: [['Ask if that is a fair way to think about it.', '"Probably not. It has held up for a long time regardless of fairness."', 20],
            ['Say protecting a place does not mean never touching it.', '"That is a good sentence. I am not yet sure I believe it about myself specifically."', 22]] },
      { s: 'She points out three different things she noticed today that she never mentioned to anyone, purely so nothing would come looking and disturb them.',
        c: [['Ask if keeping quiet about them ever feels lonely.', '"Occasionally. Mostly it feels like the price of the job I gave myself."', 22],
            ['Ask who exactly appointed her to that job.', '"Nobody. That may, now that you ask it plainly, be part of the problem."', 22]] },
      { s: 'She admits she has started to resent, quietly, that being the one who protects the meadow has cost her ever actually being part of it.',
        c: [['Ask what "being part of it" would even look like.', '"I genuinely do not know. I have spent so long watching from just outside it."', 24],
            ['Say that sounds like more than just being careful.', '"It is. I have simply never said that part out loud before."', 24]] },
      { s: 'For the first time, {name} says plainly that she wants to catch one of her own, not just protect everyone else\'s chance to.',
        c: [['Ask what is stopping her.', '"Nothing, anymore, except the years of telling myself it would not be allowed."', 26],
            ['Say that sounds like real change, for her.', '"It is. I am finding it easier to say than I expected, once I finally said it once."', 26]] }
    ]},
    { title: 'The first one she keeps', place: 'the meadow grass', hearts: 4, badges: 5, beats: [
      { s: 'Ari, of all people, is the one who tells {name} to just go and try it already, plainly, without the usual careful hedging he gives everything else.',
        c: [['Ask him if he means that as encouragement or a dare.', '"Bit of both. I am told that is how I do most things lately."', 20],
            ['Ask {name} if she needed to hear that from him specifically.', '"Apparently. I would not have taken it half as seriously from anyone less notorious for stalling."', 22]] },
      { s: '{name} spends longer than usual choosing exactly where to try, quiet in a different way than her usual watchful quiet.',
        c: [['Ask what she is actually looking for.', '"Somewhere I would still recognize afterward. This is not really about the catching."', 22],
            ['Ask if she is nervous.', '"Extremely. I have protected this feeling for other people for years. I did not expect to need it protected from myself."', 24]] },
      { s: 'The catch happens plainly, and the grass around it stays exactly as quiet as she always insisted it should.',
        c: [['Ask if that surprised her.', '"Enormously. I built an entire rule out of an outcome that, it turns out, did not actually have to happen."', 26],
            ['Say the meadow looks no different for it.', '"It does not. I am choosing to find that reassuring rather than anticlimactic."', 24]] },
      { s: 'She holds the new ball a long moment before pocketing it, the way Ari held his before finally sending it out.',
        c: [['Ask if that felt familiar.', '"It did. I did not expect his particular kind of hesitating to have anything useful to teach me."', 26],
            ['Say the two of you have swapped a little, lately.', '"We have. I am choosing to think that is the point of standing near each other at all."', 26]] },
      { s: 'She tells a newer arrival at the meadow\'s edge to hush, same as always - and then, for the first time, actually catches the thing she was hushing everyone for.',
        c: [['Ask how that felt, doing both at once.', '"Correct, finally. I had been doing half of that job for years and calling it the whole thing."', 28],
            ['Say that is a genuinely different way for her to work.', '"It is. Watching and keeping are not actually opposites. It took me an embarrassingly long time to notice."', 28]] },
      { s: '{name} starts, from that day on, quietly keeping one from each season instead of none at all - still careful, still quiet, just no longer entirely absent from her own patch of grass.',
        c: [['Ask what changed her mind, in the end.', '"One very stubborn, newly braver Bug Catcher, and a rule of my own I finally admitted I had made up."', 28],
            ['Say that sounds like real trust, both ways.', '"It is. I did not expect trusting myself with one catch to make me better at protecting the rest, not worse."', 28]] }
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

  'restless-angler': [
    { title: 'The one that possibly existed', place: 'the near end of the boards', hearts: 2, badges: 2, beats: [
      { s: '{name} is telling the story again, and it has grown since yesterday: the pull was harder, the fight was longer, the thing that got away was bigger.',
        c: [['Ask what actually happened, plainly.', '"Fine. Something big took the line, fought for a minute, snapped off." Considerably less dramatic, told straight.', 18],
            ['Ask why the story keeps growing.', '"Because the plain version is boring, and nobody was watching either version happen."', 20]] },
      { s: '"Nobody believes me anymore," {name} admits, a little too lightly for how much it is clearly bothering him.',
        c: [['Say you believe the plain version.', '"The plain version is the one worth believing." He seems oddly relieved to hear it said back to him.', 22],
            ['Ask if that is why the story keeps growing.', '"Might be. A big lie gets more attention than a small true thing. I have not worked out what to do about that."', 22]] },
      { s: 'He digs a bent, chewed-up hook out of his tackle box and holds it up like evidence. "This is real, at least. This actually happened."',
        c: [['Ask to see it properly.', 'It is unremarkable and clearly precious to him regardless. He does not let it out of his hand.', 22],
            ['Say a bent hook is a better story than a big fish.', '"Nobody wants to hear about a hook." He puts it away carefully anyway.', 20]] },
      { s: '"Truthfully I fish for the story after, more than the fish," he says. "Sal does not need stories. Sal actually catches things."',
        c: [['Ask if that makes his own fishing less real.', '"Feels like it, some days." He does not sound convinced by his own answer, which is something.', 22],
            ['Say the story is its own kind of catch.', 'He laughs, surprised. "Nobody has ever put it that way to me before."', 24]] },
      { s: 'He watches Sal across the pier, sitting perfectly still, and goes quiet for a moment in a way that is unusual for him.',
        c: [['Ask what he is thinking.', '"That he has been sitting in that exact spot longer than I have been alive, probably. And he has never once needed to tell anyone about it."', 22],
            ['Say stillness is not the only way to fish well.', '"Try telling him that." He says it fondly, not bitterly.', 22]] },
      { s: 'He gets out a stub of pencil and starts writing the plain version down properly, for once, instead of just retelling it looser each time.',
        c: [['Ask why write it down now.', '"So it stops growing. I would like to keep at least one true version of something."', 24],
            ['Offer to help him get the details right.', 'Between you, you get it down to four honest sentences. He reads them back twice, pleased.', 24]] }
    ]},
    { title: 'Standing still for once', place: 'the far end of the boards', hearts: 4, badges: 5, beats: [
      { s: '{name} has moved spots three times in ten minutes and caught nothing at any of them.',
        c: [['Ask why he keeps moving.', '"Feels like doing something. Standing still feels like doing nothing." He moves again while saying it.', 20],
            ['Point out Sal has not moved all morning.', '"Sal has told me that. Repeatedly. I have heard it approximately one thousand times."', 20]] },
      { s: '"He is not wrong," {name} admits, dropping his bag at a fourth spot. "I know he is not wrong. Knowing does not make it easier."',
        c: [['Ask what makes it hard.', '"Waiting feels like admitting nothing is going to happen. Moving at least feels like hoping."', 22],
            ['Say waiting can be its own kind of hoping.', 'He looks at you like that has genuinely not occurred to him before.', 24]] },
      { s: 'He sits down properly this time, line in the water, and does not move again for a noticeably long stretch.',
        c: [['Sit with him and say nothing.', 'It is uncomfortable for him in a way that is almost funny to watch. He grits through it anyway.', 24],
            ['Ask how long he can manage it.', '"Do not ask me that. It makes the number matter, and I am trying very hard not to count."', 22]] },
      { s: 'Nothing happens for a long time. Then something does: small, quiet, almost missable if he had been moving instead of watching.',
        c: [['Watch him land it, whatever it turns out to be.', 'It is nothing impressive. He looks at it like it is the best thing he has ever pulled from this water.', 26],
            ['Ask how it feels, catching something by waiting.', '"Strange. Good-strange. I do not entirely trust it yet."', 26]] },
      { s: 'He does not immediately start telling the story bigger. He just looks at what he caught for a while, quietly.',
        c: [['Ask if this one is going in the notebook.', '"Exactly as it happened. I do not think this one needs the extra parts."', 26],
            ['Say that is progress.', '"Do not tell Sal I said that word. He will never let me hear the end of it."', 24]] },
      { s: 'Later, he tells the story plainly, for once, to whoever will listen — no bigger fish, no longer fight, just what actually happened.',
        c: [['Say the plain version was worth hearing.', '"First time I have believed my own story while telling it. I would like to do that again."', 28],
            ['Ask if he will show Sal the notebook.', '"Already did. He read it twice and did not say a word, which from him is practically a speech."', 28]] }
    ]}
  ],

  'patient-angler': [
    { title: 'What the pier remembers', place: 'the usual spot', hearts: 2, badges: 2, beats: [
      { s: '{name} keeps an old, weathered coil of line beside his tackle box that he never once uses.',
        c: [['Ask about the line.', '"Eleven years old. Held something enormous for the better part of an hour, once."', 20],
            ['Ask why he does not use it.', '"Because it did its job the one time it mattered most, and I would rather remember that than fray it on something ordinary."', 22]] },
      { s: '"Snapped right at the end," he says, turning the coil over once in his hands. "Never saw what it was. Only felt it."',
        c: [['Ask if that still bothers him.', '"Less than it used to. Some days, hardly at all."', 22],
            ['Ask what he learned from losing it.', '"That the wait is not really about the fish. People get that backward constantly."', 24]] },
      { s: '"The wait is about being able to sit with something unresolved," he says, "and not need it fixed to keep sitting there."',
        c: [['Say that sounds hard-won.', '"It was. I did not arrive at it quickly, and I would not recommend the fast way either."', 24],
            ['Ask if fishing taught him that, or the losing did.', '"The losing. Fishing just gave the losing somewhere quiet to happen."', 24]] },
      { s: 'He nods across the pier at Oz, mid-story again, gesturing at something invisible with both hands. "Reminds me of myself, before."',
        c: [['Ask what he was like before.', '"Louder. Faster. Certain every trip would be the one." He says it without a trace of mockery.', 22],
            ['Ask if he ever tells Oz that.', '"Not yet. He would not believe it of me, and honestly, some days neither do I."', 22]] },
      { s: '"Some days I worry I have simply become a man who waits," he admits, quieter than before, "rather than one who still hopes to catch something."',
        c: [['Say those do not sound like different things to you.', 'He considers that for longer than the sentence probably deserved. "Perhaps not. I will sit with it."', 26],
            ['Ask what would tell the difference.', '"Whether I still teach someone, I suppose. A man only waiting would not bother."', 24]] },
      { s: 'He starts coiling a spare length of line, slowly and deliberately, the kind of motion that looks like a decision being made.',
        c: [['Ask what the spare line is for.', '"Someone who has not learned the wait yet. I have an idea who."', 26],
            ['Say that sounds like Oz.', '"It does, doesn\'t it." He does not confirm it outright, which is itself a confirmation.', 26]] }
    ]},
    { title: 'Teaching the wait', place: 'the far end of the boards', hearts: 4, badges: 5, beats: [
      { s: 'For the first time, {name} has invited Oz to sit at his exact spot rather than fish somewhere else along the pier.',
        c: [['Ask why here, specifically, and why now.', '"Because the spot is half of it. The other half he has to find on his own."', 22],
            ['Watch how Oz takes the invitation.', 'Oz sits down like it is a much bigger occasion than either of them will admit out loud.', 22]] },
      { s: 'Oz shifts twice in the first minute alone. {name} says nothing and simply keeps his own line perfectly still.',
        c: [['Ask why not correct him directly.', '"Telling him to be still has never once worked. Showing him might."', 24],
            ['Wait and see if it works.', 'By the third minute, Oz has, almost accidentally, stopped moving.', 22]] },
      { s: 'A long stretch of real, comfortable silence follows — the kind {name} has clearly spent years learning to want.',
        c: [['Ask if the silence ever gets easier.', '"It became the point, eventually, rather than the price of the point."', 24],
            ['Say it feels different with two people in it.', '"It does. I had not expected to prefer it that way."', 24]] },
      { s: 'Oz actually manages to wait, properly, and something takes his line — small, real, entirely his.',
        c: [['Watch Oz land it.', '{name} does not move to help. He watches with the exact attention of someone who has waited a long time to see this.', 26],
            ['Ask {name} how it feels to watch it happen.', '"Like something coming due, finally. Good weight to it."', 26]] },
      { s: 'Unprompted, {name} tells Oz the old story — the eleven-year-old line, the enormous unseen thing, the losing of it — for the first time out loud.',
        c: [['Listen to how Oz takes the story.', 'Oz, for once, does not embellish anything in return. He just listens properly, all the way through.', 26],
            ['Ask {name} why tell it now.', '"Because technique is not the whole lesson. He needed the losing too, or the waiting will not mean anything to him."', 28]] },
      { s: '{name} hands Oz the spare coil of line he had been preparing, without much ceremony, the way an ordinary object gets handed down.',
        c: [['Ask what the line is for.', '"For whenever something of his snaps. Better to have one ready than to learn that lesson unprepared, the way I did."', 28],
            ['Say that is a generous thing to give him.', '"It is only line. What matters is that he will sit still long enough to use it properly."', 28]] }
    ]}
  ],

  counter: [
    { title: 'The third untouched cup', place: 'behind the counter', hearts: 2, badges: 2, beats: [
      { s: '{name} nods toward the window table without looking up from the machine. "Third day running. Dax has not touched a single cup."',
        c: [['Ask if that is unusual for him.', '"He drinks everything I put in front of him, usually before it is cool enough. Not this week."', 18],
            ['Ask if you should just ask him yourself.', '"Maybe. I keep almost doing that, and then I just refill it instead."', 20]] },
      { s: '{name} admits she has started making his coffee weaker than usual, on the theory that maybe that is why he has stopped finishing it. It has not worked.',
        c: [['Point out that is probably not the actual problem.', '"I know. I am aware. I made it weaker anyway, because doing something felt better than doing nothing."', 20],
            ['Ask what she thinks the real problem is.', '"I do not know yet. That is precisely why I keep refilling instead of asking."', 22]] },
      { s: 'She catches herself refilling the cup a fourth time before Dax has said a word, and finally sets the pot down instead.',
        c: [['Say maybe today is the day she actually asks.', '"Maybe. Or maybe I make a fifth cup and call that bravery instead."', 22],
            ['Offer to ask him yourself, if that is easier.', '"No — if anyone asks, it should probably be me. I just have not worked out how yet."', 22]] },
      { s: 'She walks over, sets the cup down without a word, and asks him outright, no small talk first, what has been keeping him in that chair all week.',
        c: [['Watch how Dax responds.', 'He goes quiet for a moment, longer than his usual deflecting joke takes to arrive. That alone tells her something.', 24],
            ['Ask {name} how it felt to just ask.', '"Terrifying. Also apparently very simple. I do not know why I waited three days to do the simple thing."', 24]] },
      { s: '{name} comes back behind the counter looking unusually rattled for someone who spends all day reading people from a distance.',
        c: [['Ask what he actually said.', '"Not much yet. But he did not deflect it either, which from Dax is practically a confession."', 24],
            ['Ask if she regrets asking.', '"Not even slightly. I regret waiting three days to do it."', 22]] },
      { s: 'She changes nothing about the coffee and decides, quietly, that noticing is not enough anymore; asking has to become the actual habit.',
        c: [['Say that sounds like a real change for her.', '"Small one. I have made a career out of noticing quietly. Saying it out loud is the harder skill."', 26],
            ['Ask if she will keep asking, not just this once.', '"I am going to try. Ask me again in a week and hold me to it."', 26]] }
    ]},
    { title: 'The other side of the counter', place: 'the café, midafternoon', hearts: 4, badges: 5, beats: [
      { s: '{name} has a battered index card behind the counter with a recipe on it that she has never once actually made for a customer.',
        c: [['Ask what is on the card.', '"An idea I had years ago. Something of my own, instead of the usual menu." She puts it away quickly, like she was not expecting to be caught with it.', 22],
            ['Ask why she has never made it.', '"Because someone has to run the counter, and it is always me. There is never a version of the day where I get to try it."', 24]] },
      { s: 'Dax\'s chair is empty today for the first time in longer than {name} can remember, and she keeps glancing at it between orders.',
        c: [['Ask if the empty chair is bothering her.', '"Bothering is the wrong word. Reminding, maybe. He actually did the thing he was avoiding. I have been avoiding something too."', 24],
            ['Ask what she is avoiding.', 'She taps the index card without quite answering directly. That is answer enough.', 22]] },
      { s: 'A message arrives from Dax, short and blunt, exactly his voice: "You always tell everyone else to just ask. Make the thing on the card. I mean it."',
        c: [['Say he has a point.', '"Infuriatingly, yes. It is easier to give that advice than take it."', 24],
            ['Ask if she is going to take it.', '"I am considering it. Considering, loudly, in front of you, which is new for me."', 26]] },
      { s: 'She hands the counter to Kip for one afternoon, a first as far as anyone can remember, and actually makes the thing on the card for real customers.',
        c: [['Ask how it feels, being the one making it instead of just serving.', '"Strange. Good-strange. I forgot what it felt like to take a risk instead of just pouring for everyone else\'s."', 26],
            ['Ask if it turned out how she pictured it.', '"Better, honestly. I have been underselling my own idea to myself for years."', 26]] },
      { s: 'The afternoon batch sells out faster than anything else on the counter that day, and {name} looks almost as surprised as anyone.',
        c: [['Say she should put it on the regular menu.', '"I am thinking about it. Thinking, out loud, in front of a customer — also new."', 28],
            ['Ask what Dax will say when he hears.', '"Something insufferable, probably. He earned the right to be insufferable about this one."', 26]] },
      { s: 'By closing, {name} has written the recipe properly onto the menu board, in her own handwriting, instead of leaving it on the battered index card where no one could see it.',
        c: [['Say that is a real change for her, not a small one.', '"It is. I spent a long time noticing what everyone else needed. I would like to notice what I need occasionally too."', 28],
            ['Ask what it is called on the menu.', '"The window-table blend. Seemed fitting, given how long I spent watching that table instead of sitting at it."', 28]] }
    ]}
  ],

  fixture: [
    { title: 'The unopened envelope', place: 'his usual chair', hearts: 2, badges: 2, beats: [
      { s: '{name} has had the same envelope in his coat pocket for three weeks, worn soft at the corners from being carried and never opened.',
        c: [['Ask what is inside.', '"An offer. From somewhere that is not here. I have not opened it properly, which feels like a technicality I am relying on."', 20],
            ['Ask why he carries it if he will not open it.', '"Because leaving it at home would mean deciding not to decide. This way I am still, technically, deciding."', 22]] },
      { s: '"Give me a reason to stand up," he says, the same line as always, except this time it does not sound like a joke.',
        c: [['Ask if the envelope is the reason.', '"It might be the reason I am still sitting. Funny how that works."', 22],
            ['Point out he said that same line the day you met.', '"Did I? I have said it so often I have lost track of which time I meant it."', 20]] },
      { s: 'Mo mentions, from behind the counter, that she has asked him about the envelope twice already this week and gotten nowhere both times.',
        c: [['Ask why he keeps deflecting her.', '"Because she is right, and being right about this particular thing is more annoying coming from her than from anyone else."', 22],
            ['Say maybe she is asking because she is worried.', '"I know. That is somehow the part I have been avoiding most."', 24]] },
      { s: 'He turns the envelope over twice without opening it, weighing something that has nothing to do with paper.',
        c: [['Ask what he is actually afraid of.', '"Leaving and finding out I was right to be scared. Or staying and finding out I was scared for nothing. Both options are unflattering."', 24],
            ['Ask what happens if he never opens it.', '"Then I keep the chair and lose the choice. That has started to feel like the worse trade."', 24]] },
      { s: 'He does not open it in front of you. He puts it back in his coat, carefully, the way someone handles something they have finally decided matters.',
        c: [['Ask if that is progress or avoidance.', '"Ask me tomorrow. Tonight I am just going to read it properly, alone, like an adult, apparently."', 26],
            ['Say you believe he will actually do it this time.', '"Do not jinx it. But — thank you. I think I needed someone to say that out loud."', 26]] },
      { s: 'He does not stand up, not yet, but for the first time all week the envelope is not in his pocket. It is on the table in front of him, open.',
        c: [['Ask what it says.', '"Enough. I will tell you properly once I have decided what to do with it. Fair?"', 26],
            ['Say that is already more than he managed yesterday.', '"It is. Small thing. Feels bigger than it should."', 24]] }
    ]},
    { title: 'Leaving the chair, for now', place: 'the café, by the door', hearts: 4, badges: 5, beats: [
      { s: 'The chair by the window is empty. {name} is standing at the counter instead, a travel bag at his feet, looking like he still cannot quite believe it himself.',
        c: [['Ask what changed.', '"I actually read the letter. Turns out reading things properly changes what you decide about them. Who knew."', 24],
            ['Ask where he is going.', '"An apprenticeship, three towns over. A season, maybe two. Not forever — I checked, several times."', 22]] },
      { s: '"Mo asked the right question at the right time," he admits, "which is the sort of thing I will never let her forget, and also the reason I am standing here."',
        c: [['Ask if he thanked her.', '"In my own way. I told her the coffee would be terrible wherever I am going. She understood that was a thank-you."', 24],
            ['Ask if he is scared.', '"Extremely. I am doing it scared, which apparently is allowed."', 26]] },
      { s: 'He looks at the chair for a long moment before offering it, genuinely offering it and not as a joke, to whoever wants it while he is gone.',
        c: [['Ask why the chair mattered so much.', '"It did not, really. It never did. I just needed something to be the reason instead of admitting I was the reason."', 26],
            ['Say someone else sitting there will feel strange.', '"It will. Good strange, I am hoping. It was never supposed to be mine forever anyway."', 24]] },
      { s: 'Kip has already claimed the chair for his break shifts, loudly and without shame, the moment {name} finished the sentence.',
        c: [['Say that was fast.', '"Vultures, the lot of you. I mean that with real affection."', 26],
            ['Ask if it is strange watching someone else sit there already.', '"Very. Also correct. It was never supposed to be a permanent fixture. Neither was I, in hindsight."', 28]] },
      { s: 'He picks up the bag, actually stands, and for once does not immediately sit back down out of habit.',
        c: [['Ask how it feels to actually leave.', '"Lighter than I expected. I spent so long treating the chair like an anchor. It was mostly just a chair."', 28],
            ['Wish him well.', '"I intend to come back insufferable and well-traveled. Manage your expectations accordingly."', 26]] },
      { s: 'At the door, he turns back once, not for the chair, but to say he will send word properly this time, opened before anyone has to ask.',
        c: [['Say you will hold him to that.', '"Please do. I have gotten very good at not opening things. I am trying to get good at the opposite."', 28],
            ['Ask when he will be back.', '"A season, give or take. The chair will still be here. I am less certain I will need it the same way when I am."', 28]] }
    ]}
  ],

  warmup: [
    { title: 'The same door', place: 'the entrance to the quarter', hearts: 2, badges: 2, beats: [
      { s: '{name} is running a newcomer through the exact same warm-up routine he runs everyone through, cheerful as ever, and you notice it is identical to the one he ran yesterday.',
        c: [['Ask if he ever varies the routine.', '"Why would I? It works. I have run it a thousand times and it has never once let anyone down."', 18],
            ['Ask how long he has been running it.', '"Three years, give or take. Give, mostly."', 20]] },
      { s: 'Pressed, {name} admits he has been warming up trainers at this exact spot for three years and has never once actually knocked on the gym door himself.',
        c: [['Ask why not.', '"Never quite the right day. There is always someone else who needs warming up first."', 20],
            ['Point out that sounds like an excuse.', '"It does, doesn\'t it. I have gotten remarkably good at not noticing that."', 22]] },
      { s: 'He deflects with the usual joke, that the door is not ready for him yet, and laughs it off before you can push further.',
        c: [['Push gently, once.', '"Fine. Fine. The door has been ready for considerably longer than I have."', 22],
            ['Let the joke stand, for now.', '"Appreciated. Ask me again sometime, though. I mean that."', 20]] },
      { s: 'Delia walks past mid-conversation and says, without slowing down, "You are still warming people up for a door you have never knocked on, Corin." She keeps walking.',
        c: [['Ask if she is often this direct.', '"Constantly. Infuriatingly. Also, unfortunately, always accurate."', 22],
            ['Ask how that lands, hearing it from her specifically.', '"Worse than from anyone else. She does not say things to be cruel. She says them because they are true."', 24]] },
      { s: '{name} goes quiet for a moment, the good humor dropping for once. "If I actually knock and lose, I stop being the one who is always ready. I become just another trainer who lost."',
        c: [['Say that sounds like a real fear.', '"It is. Embarrassingly ordinary, for something I have built three years of routine around avoiding."', 24],
            ['Ask what "always ready" is protecting him from.', '"Finding out I am not, actually, as ready as I tell everyone else they are."', 24]] },
      { s: 'He does not decide to knock, not yet. But for the first time, he says the gym leader\'s actual name out loud instead of just calling it "the door."',
        c: [['Say that is progress.', '"Small. I am aware it is small. I am choosing to count it anyway."', 26],
            ['Ask if he will tell you when he decides.', '"You will be one of the first to know. Possibly the first, at this rate."', 26]] }
    ]},
    { title: 'Knocking, for once', place: 'the gym door', hearts: 4, badges: 5, beats: [
      { s: '{name} has skipped his usual warm-up routine entirely today and is simply standing at the gym door, quiet in a way that does not suit him at all.',
        c: [['Ask what changed.', '"Delia said something blunt, as usual. It landed differently this time."', 24],
            ['Ask what she said.', '"That I had gotten good at helping everyone reach the door and terrible at reaching it myself. Hard to argue."', 22]] },
      { s: '"So," he says, mostly to himself, "today is apparently the day." He does not sound entirely convinced, but he also does not walk away.',
        c: [['Wish him well.', '"Thank you. I may need it. I have prepared everyone else for this door and somehow never myself."', 24],
            ['Ask if he is scared.', '"Extremely. Doing it anyway seems to be the whole trick, from what I hear."', 26]] },
      { s: 'He knocks. The door opens. Whatever happens on the other side of it happens without you — some things are his alone to have.',
        c: [['Wait for him outside.', 'It feels like the right thing to do, whatever the result turns out to be.', 24],
            ['Ask him, before he goes in, if the outcome matters.', '"Less than I expected, actually. Mostly it matters that I am the one walking through it."', 26]] },
      { s: 'He comes back out eventually. Win or lose is almost beside the point, though he will absolutely tell you the specifics if asked twice.',
        c: [['Ask how it felt, actually doing it.', '"Terrifying, then oddly simple. I have overbuilt that door in my head for three years."', 28],
            ['Ask if he will do it again.', '"Probably. Possibly regularly, now that the first time is behind me. Turns out that was the hard part."', 28]] },
      { s: 'He goes back to his usual spot at the entrance to the quarter and starts warming up the next trainer, same as always, except something about it looks lighter now.',
        c: [['Ask if he is going back to just warming people up now.', '"Both, actually. I have decided I get to do both. Nobody told me I had to pick."', 28],
            ['Say that sounds like the better outcome anyway.', '"It is. I spent three years thinking it was one or the other."', 26]] },
      { s: 'Delia, passing by again, says nothing this time. Just a short nod, which from her is closer to applause than anyone else\'s standing ovation.',
        c: [['Ask {name} what that nod meant.', '"From Delia? Considerable. I am choosing to be pleased about it for the rest of the week."', 28],
            ['Say he earned that.', '"I am starting to think I did. Strange feeling, after three years of not quite believing it."', 28]] }
    ]}
  ],

  standards: [
    { title: 'The gap in the middle', place: 'the drill line', hearts: 2, badges: 12, beats: [
      { s: '{name} runs the same precise drill she always runs, timed to the second, while a newer trainer nearby visibly struggles to keep up with her standards.',
        c: [['Ask if she ever adjusts the drill for beginners.', '"No. The drill is correct. Adjusting it teaches the wrong lesson before the right one has a chance to land."', 18],
            ['Ask why the standards matter so much to her.', '"Because the alternative is finding out what you are missing at the worst possible moment. I have done that once. Once was enough."', 20]] },
      { s: 'The newer trainer falters badly under the pressure and nearly walks off entirely. {name} does not soften at all, though something in her focus sharpens uncomfortably.',
        c: [['Ask if that bothers her.', '"It should not. I am finding, today, that it does anyway."', 22],
            ['Ask what she is actually reacting to.', 'She does not answer immediately. That, from her, is itself an answer.', 20]] },
      { s: 'Pressed, she finally says it plainly: years ago, in a real match that mattered, she had a gap in the middle - precisely the flaw she now drills out of everyone else - and it cost her the match outright.',
        c: [['Ask what happened, specifically.', '"I improvised where I should have prepared. It went exactly as badly as that sounds. I do not improvise anymore."', 22],
            ['Ask if she still thinks about it.', '"Constantly. It is, functionally, why every drill I run exists."', 22]] },
      { s: '"The standards are not cruelty," she says, more to herself than to you. "They are insurance. I would rather be exacting than unprepared again."',
        c: [['Say that makes sense, even if it is hard on people.', '"It is hard on people. I have made peace with that trade, mostly."', 24],
            ['Ask if there is a cost to the trade she has not made peace with.', 'She looks, briefly, like she was about to answer honestly. She does not, yet.', 24]] },
      { s: 'Corin passes by and says, lightly but not unkindly, that her method works - for the people who can survive it long enough to see that it works.',
        c: [['Ask if he has a point.', '"Infuriatingly, he might. I am not yet willing to say that to his face."', 24],
            ['Ask if she resents hearing it from him.', '"Less than I would from most people. He is annoyingly hard to dismiss."', 24]] },
      { s: 'For the first time, {name} actually explains her reasoning to the struggling trainer directly, instead of simply enforcing the standard in silence.',
        c: [['Ask how that went.', '"Better than silence usually does, apparently. I am filing that away, reluctantly."', 26],
            ['Say that was a real change for her.', '"Small one. I am aware it is small. I am choosing to count it anyway."', 26]] }
    ]},
    { title: 'What structure cannot reach', place: 'the quarter, after hours', hearts: 4, badges: 13, beats: [
      { s: 'The trainer from before has quietly stopped coming to the quarter altogether, and {name} notices the absence far more than she expected to.',
        c: [['Ask if that bothers her.', '"More than it should, for someone I drilled correctly and by the book."', 24],
            ['Ask what she thinks went wrong.', '"Nothing, by my standards. Which is precisely what I am starting to suspect is the actual problem."', 22]] },
      { s: 'She asks Corin, without much preamble, why his trainees stick around when hers get exact, correct guidance and still leave.',
        c: [['Wait for his answer.', '"People need to feel welcome before they can absorb structure. You start with the structure. I start with the welcome."', 24],
            ['Ask Delia what she makes of that.', '"Uncomfortably, I think he might be right. I do not enjoy agreeing with him this easily."', 26]] },
      { s: 'She tracks the trainer down herself, a first as far as anyone can recall, and tries, visibly awkwardly, to open with something other than a correction.',
        c: [['Watch how it goes.', 'It is stiff and clearly unpracticed. She keeps going anyway.', 26],
            ['Ask {name} how it feels to lead with warmth instead of standards.', '"Deeply unnatural. I am doing it regardless."', 26]] },
      { s: 'The trainer, cautiously, responds better to this than to any amount of correct drilling before it.',
        c: [['Say that must be some relief.', '"It is. It is also faintly humbling, which I am choosing not to enjoy less because of that."', 28],
            ['Ask if she will keep trying it.', '"I am going to attempt to. I make no promises about being good at it quickly."', 26]] },
      { s: 'She starts opening her sessions, from then on, with a single human sentence before the drills begin - small, deliberate, entirely new for her.',
        c: [['Ask what she says.', '"Something true and ordinary. \'Rough week,\' or the like. It costs nothing and apparently changes everything."', 28],
            ['Say Corin would be smug about this.', '"He already is. I am pretending not to notice."', 28]] },
      { s: 'Corin, hearing about it secondhand, does not gloat. He just says it took real nerve to change a method that has protected her for years, and means it.',
        c: [['Ask {name} what she thinks of that.', '"That he is occasionally correct about things that matter. I will not be saying that to him directly."', 28],
            ['Say the quarter is lucky to have both of them.', '"It manages. Between his welcome and my standards, most people eventually get both of what they need."', 28]] }
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

  ballast: [
    { title: 'The full pack', place: 'the gear shed at the trailhead', hearts: 2, badges: 2, beats: [
      { s: '{name} is repacking a bag that was already too heavy to lift, muttering the contents to himself like a list that never quite ends.',
        c: [['Ask what all of it is actually for.', '"Rope, in case someone else\'s gives out. Bandages, in case someone else\'s kit runs short. It adds up fast, once you start packing for everyone but yourself."', 18],
            ['Ask if he ever leaves any of it behind.', '"Once. I do not recommend it."', 20]] },
      { s: 'He gives the bag a final shake, listening for anything that might have shifted loose, before he is satisfied enough to sling it on.',
        c: [['Offer to carry something for him.', 'He hesitates, then hands over the lightest item in the whole pack, as if that is the safest test he can give you.', 20],
            ['Ask how heavy it actually is.', '"Heavy enough that I notice. Not heavy enough that I would put any of it down."', 20]] },
      { s: 'Crag passes on his way up, glances at the pack, and says only, "Still carrying the whole ridge, then," before continuing at his own steady pace.',
        c: [['Ask {name} if that comment ever lands.', '"Every single time. He is not wrong, which is the annoying part."', 22],
            ['Ask why he does not just travel as light as Crag does.', '"Because if a day goes wrong, I would rather be the one who overpacked than the one who did not."', 22]] },
      { s: 'Pressed gently, {name} finally says it plainly: a hiker he was guiding years back needed a splint he did not have, and had to wait an hour longer than they should have.',
        c: [['Ask what happened to them.', '"They were fine, in the end. I was not, for a long while after."', 24],
            ['Say that was one trip, a long time ago.', '"One trip is exactly how long it takes to decide never again."', 24]] },
      { s: '"It is not really about the weight," he admits, resettling the straps. "It is about never being the reason someone waited too long."',
        c: [['Say that is a heavy thing to carry, on top of everything else.', '"It is. I have gotten good at not noticing which parts of the load are which."', 26],
            ['Ask if it has ever actually been enough, all of it.', '"Every time so far. That is either luck or the whole point of carrying it. I have stopped asking which."', 26]] },
      { s: 'At the trailhead the next morning, {name} unclips one pouch before he leaves and holds it out to you without much ceremony. "Hold this one. See how it feels."',
        c: [['Take it and ask what changes.', '"Nothing, probably. Or it means the weight does not all have to be mine, every single time." He does not wait for you to agree before setting off.', 28],
            ['Ask if this is him leaving something behind, for once.', '"Lending, not leaving. There is apparently a difference, and I am only just learning it."', 28]] }
    ]},
    { title: 'Setting the kettle down', place: 'the switchback halfway up the ridge trail', hearts: 4, badges: 5, beats: [
      { s: 'For the first time anyone can remember, {name} hands the water off to a newer hiker to carry, then spends the whole climb watching them like it might shatter.',
        c: [['Tell him to relax, it is only water.', '"It is never only water. Ask me again once you have watched someone run out of it."', 24],
            ['Ask if letting go of it is actually harder than carrying it.', '"Considerably. I did not expect that."', 22]] },
      { s: 'The hiker stumbles on loose scree and nearly drops it. Nothing spills, but {name} is at their side before either of you can react, already apologizing for not catching it himself.',
        c: [['Point out nothing actually went wrong.', '"This time. I would like to keep it that way every time, which is precisely the problem."', 24],
            ['Ask him to say that to himself, not just to you.', 'He goes quiet, which for him is as good as agreeing.', 24]] },
      { s: 'Crag, watching from a few paces back, says something uncharacteristically long for him: "You watching everyone that hard all day is its own kind of weight, Burl. Heavier than the pack, most days."',
        c: [['Ask {name} if he has ever thought of it that way.', '"No. I am extremely unhappy that he is right."', 26],
            ['Ask Crag how he can tell.', '"Because I have been watching him carry both for years and only just said something."', 24]] },
      { s: '"If I stop being the one who always has the extra rope, the extra splint, the extra everything," {name} admits, "I am not sure what I am up here for, past that."',
        c: [['Say he is up here for more than the pack.', '"I would like to believe that. I am working on believing it."', 26],
            ['Ask what he would want to be, instead.', '"Someone people are glad to climb with. Not just someone they are glad to have nearby in an emergency."', 26]] },
      { s: 'At the next climb, {name} leaves the spare rope in the shed on purpose, and borrows a length from another hiker\'s kit instead, plainly and without excuse.',
        c: [['Ask how that felt.', '"Terrible, for about an hour. Then it was just a rope, being used, same as any other."', 28],
            ['Say that is a real change, not a small one.', '"I am aware. I would appreciate you not making a large thing of it, even though it is one."', 26]] },
      { s: 'At the top, {name} sets the actual kettle down and lets the newer hiker pour for everyone, watching but, for once, not hovering. Crag notices, and simply nods once before going quiet again, which from him is the whole compliment.',
        c: [['Ask him how it felt, not carrying that one himself.', '"Lighter than I expected. I have decided to be suspicious of how much I liked it."', 28],
            ['Say the ridge has not fallen apart without him gripping every part of it.', '"Not yet. Ask me again next week. I am choosing to enjoy the interval regardless."', 28]] }
    ]}
  ],

  stride: [
    { title: 'The same step', place: 'the narrow switchback below the ridge line', hearts: 2, badges: 2, beats: [
      { s: '{name} runs a nervous hiker through the exact same instruction he gives everyone, word for word, and shows no sign of ever varying it.',
        c: [['Ask if he ever explains it differently for different people.', '"No. It works the same way every time. Changing the words would not change the rock."', 18],
            ['Ask how many times he has said that exact sentence.', '"I stopped counting. It is still true every single time I say it."', 20]] },
      { s: 'The hiker asks what to do if the weather turns, or the path forks, or anything at all goes differently than expected. {name} gives the same answer regardless: one step, then the same step again.',
        c: [['Point out that does not actually answer the question.', '"It answers the only part that matters. Everything else sorts itself out one step at a time, same as this one."', 20],
            ['Ask if that ever feels like it is not enough.', 'He does not answer that one immediately.', 20]] },
      { s: 'Burl passes below, glances up, and calls out, "Same sentence, every year, Crag," in a tone that is more fond than mocking.',
        c: [['Ask {name} if that bothers him.', '"No. He is not wrong. I have said this sentence longer than I have said almost anything else."', 22],
            ['Ask why he never updates it.', '"Because it has never once failed. I do not fix things that are not broken, even when they sound broken."', 22]] },
      { s: 'Pressed, {name} finally explains: years ago, in a real spot with real weather closing in, he tried to plan four moves ahead instead of one, and froze halfway through the third.',
        c: [['Ask what happened.', '"Someone else got us both down. I have not forgotten how that felt, being the one who needed carrying."', 24],
            ['Ask if he still thinks about it.', '"Every time I open my mouth to explain more than one step. Which is often, and which is why I mostly do not."', 24]] },
      { s: '"It is not really about the method," he admits, looking out past the switchback rather than at you. "It is about never freezing like that again, in front of somebody who needed me not to."',
        c: [['Say that is a fair thing to protect.', '"It is. I have simply never said it out loud before, to anyone, until now."', 26],
            ['Ask if one step is always actually enough.', 'He does not answer that one either. Not yet.', 26]] },
      { s: 'For the first time, {name} tells the nervous hiker the reason behind the method, not just the method itself, before sending them up.',
        c: [['Ask how that landed.', '"Better. They asked fewer questions halfway up, oddly. Knowing why seems to matter more than I gave it credit for."', 28],
            ['Say that was more than he usually offers anyone.', '"It was. I am choosing to count it as progress rather than examine it further."', 28]] }
    ]},
    { title: 'More than one step', place: 'the flat rock past the last trail marker', hearts: 4, badges: 5, beats: [
      { s: 'The weather turns fast and the trail forks unexpectedly, and for the first time in years, {name}\'s one-step method genuinely is not enough to get everyone down safely.',
        c: [['Ask him what the plan is.', '"I do not have one. I have a step. I am not sure it is the right one this time."', 24],
            ['Say it is fine to take a moment.', 'He does not take one. Taking one is exactly what he has spent years avoiding.', 22]] },
      { s: 'He hesitates, visibly, out of practice with thinking more than one move ahead, and the hesitation costs precious minutes neither of you actually has.',
        c: [['Ask Burl, if he is near, what he would do.', 'Burl, for once without a full pack to unpack, lays out two clear options in under a minute.', 24],
            ['Push {name} to just pick a direction.', '"Do not rush me into the exact mistake I am trying not to make twice."', 22]] },
      { s: 'Burl\'s plan is not fast or dramatic, just carefully sequenced, the way he packs for exactly this kind of afternoon. {name} follows it without arguing, which is itself unusual.',
        c: [['Ask {name} how it feels, letting someone else plan the route for once.', '"Strange. Also, apparently, fine. The ridge did not require it to be entirely my own idea."', 26],
            ['Point out that this is exactly the overplanning he usually avoids.', '"I am aware. I am choosing not to think too hard about that particular irony today."', 26]] },
      { s: 'Everyone gets down safely, later than planned but no worse for it. {name} is quiet for most of the walk back, turning something over.',
        c: [['Ask what he is thinking about.', '"That one step has never once failed me, and today it still was not enough on its own. Both of those are apparently true."', 26],
            ['Say leaning on Burl\'s planning this once did not cost him anything.', '"No. It cost me exactly nothing, which is the part I am struggling with."', 26]] },
      { s: 'At the next climb, {name} starts carrying one extra thing he does not strictly need, small and specific, tucked where nobody would notice unless they asked.',
        c: [['Ask what it is.', '"A second length of cord. For the one time in fifty that one step is not the whole answer."', 28],
            ['Say that sounds like something Burl would carry.', '"He would call it a start. I am calling it one thing, not everything. There is a difference, apparently, and I intend to keep it that way."', 28]] },
      { s: 'At the top, Burl claps him once on the shoulder without a word, and {name} lets him, which from either of them is as close to a real conversation as the ridge usually gets.',
        c: [['Ask {name} if that meant something.', '"Probably. I am not going to examine it further out loud. One step at a time, even for this."', 28],
            ['Say the two of them balance each other out, up here.', '"Someone has to carry the extra rope, and someone has to know when one step is enough. Works out, mostly."', 28]] }
    ]}
  ],

  bearings: [
    { title: 'Rule one', place: 'the cavern mouth', hearts: 2, badges: 2, beats: [
      { s: '{name} stops a newcomer at the entrance and makes them point out the way back before letting them past. "Know where you are before you take another step. Rule one."',
        c: [['Ask if he does that for everyone.', '"Everyone. No exceptions, no matter how many badges they are carrying."', 18],
            ['Ask if rule two exists.', '"There is only rule one. It just applies more than once."', 20]] },
      { s: 'A local scoffs lightly, says they have walked this cavern a hundred times and do not need the reminder. {name} makes them point out the way back anyway.',
        c: [['Ask if that ever actually saves anyone.', '"Not usually. Once is enough to matter, and you never know which time is the once."', 20],
            ['Ask if he has ever skipped it himself.', '"Once. I do not tell that story often."', 22]] },
      { s: 'Pressed, {name} says only that "the day everything changed down here" was the day he stopped trusting a tunnel just because he had walked it before.',
        c: [['Ask what happened that day.', '"Someone else got hurt trusting ground I had told them was safe. I have not made that mistake since."', 22],
            ['Ask if he blames himself for it.', '"Entirely. Which is precisely why rule one exists now."', 22]] },
      { s: 'He mentions, almost in passing, that there is a whole section of this cavern he sealed off that same week and has not guided anyone through since.',
        c: [['Ask what is down there.', '"Nothing good, as far as I know. I have not gone back to check."', 24],
            ['Ask if sealing it actually helped.', '"It kept anyone else from finding out the hard way. Whether it helped me is a different question."', 24]] },
      { s: 'Ask him whether he misses the deeper cavern, the parts he no longer guides, and he goes quiet for a moment before answering honestly.',
        c: [['Wait for the honest answer.', '"Every week. It does not change what I decided."', 26],
            ['Say it sounds like a real loss, not just caution.', '"It is both. I have never found a way to separate the two."', 26]] },
      { s: 'At the end of the walk, {name} takes three steps past his usual boundary near the entrance, just to prove to himself that he still can.',
        c: [['Ask if that felt different.', '"Smaller than I expected. Which is either good news or something I am not ready to examine yet."', 28],
            ['Say that was worth noticing.', '"I noticed. That is apparently the whole exercise, some days."', 28]] }
    ]},
    { title: 'The tunnel he closed off', place: 'the sealed drift', hearts: 4, badges: 5, beats: [
      { s: 'Sump asks {name}, plainly, to guide him back to the sealed drift - the one nobody has walked since the day everything changed. {name} goes very still.',
        c: [['Ask him what is wrong.', '"That is the tunnel. The one I closed. I did not expect anyone to ever ask me to open it again."', 24],
            ['Ask if he can say no.', '"I can. I am finding, uncomfortably, that I do not want to."', 22]] },
      { s: '"Give me a moment," he says, and takes several. When he speaks again, it is rule one, out loud, like he is convincing himself as much as anyone.',
        c: [['Wait him out.', 'He finishes the rule, nods once, and starts walking before he can talk himself out of it.', 24],
            ['Offer to go first.', '"No. If anyone leads this one, it is me. That much I am still certain of."', 22]] },
      { s: 'He guides the whole way with more rules than usual, narrating every foothold aloud, using the caution as a tool this time instead of a wall.',
        c: [['Ask if narrating it out loud helps.', '"Enormously. It turns out fear is quieter when I am the one talking."', 26],
            ['Say he seems different down here.', '"I am the same. The tunnel is just no longer allowed to be bigger than I am."', 24]] },
      { s: 'They reach the old collapse. {name} stops well short of it for a long moment, looking at ground he has not looked at in years.',
        c: [['Ask if he is all right.', '"Getting there. This is the part I did not rehearse."', 26],
            ['Give him the time he needs.', 'He takes it, and then keeps walking anyway, which is the whole point.', 26]] },
      { s: 'Sump finds the geode exactly where it has always been, half-buried at the edge of the old seam. {name} watches, oddly relieved it is finally leaving this tunnel.',
        c: [['Ask what he is relieved about, exactly.', '"That it gets to stop being the reason this place stays closed. That was never really the geode\'s fault."', 28],
            ['Say the tunnel does not look as bad as he built it up to be.', '"It rarely does, from the far side of finally walking it."', 26]] },
      { s: 'On the way back, {name} starts sketching new rules for this stretch instead of just resealing it - a slower route, a marked turning point, a second rule to sit beside the first.',
        c: [['Ask if this means the tunnel reopens.', '"Carefully. With rules that did not exist the first time. That is the difference, this time."', 28],
            ['Say that sounds like real progress.', '"It is progress shaped exactly like caution. I have decided those are not opposites after all."', 28]] }
    ]}
  ],

  unclaimed: [
    { title: 'What nobody comes back for', place: 'the shelf by the sump pool', hearts: 2, badges: 2, beats: [
      { s: '{name} ties a small tag to a dropped glove, noting exactly where and when he found it, and sets it carefully on a shelf crowded with dozens of others just like it.',
        c: [['Ask why he keeps them instead of selling them off.', '"Because someone left them behind, not away. There is a difference, and it matters to me even if it never matters to them."', 18],
            ['Ask how many are on that shelf by now.', '"I stopped counting a long time ago. I have not stopped tagging them."', 20]] },
      { s: 'A caver asks, half-joking, if anyone ever actually comes back for any of it. {name} answers seriously, which is somehow funnier and sadder at once.',
        c: [['Ask him the real answer.', '"Rarely. Twice, maybe, in all the years I have done this."', 20],
            ['Ask if that discourages him.', '"It should, probably. It has not, yet."', 20]] },
      { s: 'At the far end of the shelf sits the oldest item by far: a fist-sized geode, split clean in two, tagged only "the collapse" in handwriting gone soft with age.',
        c: [['Ask about that one specifically.', '"That one I know exactly whose it is. That is not the part I have ever been able to explain."', 22],
            ['Ask why it has no name on the tag, if he knows.', '"Because writing his name down felt like deciding something I had not decided yet."', 22]] },
      { s: 'Pressed gently, {name} admits he has known where to find its owner for years and has simply never gone.',
        c: [['Ask why not.', '"Because showing up after this long feels like an accusation, somehow. Here is the thing you lost. Look how long I kept it."', 24],
            ['Ask if he is afraid of the answer he would get.', '"Less afraid of his answer than of my own reason for waiting this long to ask."', 24]] },
      { s: '"It is easier to keep tagging new gloves," he says, "than to find out what returning the old geode would actually cost me."',
        c: [['Ask what it would cost him.', '"A shelf with one fewer thing on it that I have spent years quietly deciding was partly mine."', 26],
            ['Say that sounds like more than caution.', '"It is. I have simply never had anyone else say so out loud before."', 26]] },
      { s: 'For the first time in years, {name} lifts the geode off the shelf and sets it on the counter in front of him instead, not yet decided, but visibly different.',
        c: [['Ask if this means he is finally going.', '"It means I moved it six inches. I am choosing to treat that as a start."', 28],
            ['Say that is still real progress.', '"It is the first progress on this particular shelf in a very long time."', 28]] }
    ]},
    { title: 'Walking it back', place: 'the mining tunnels', hearts: 4, badges: 5, beats: [
      { s: '{name} finally asks Nils for the one thing he has never asked him before: to guide him through the sealed drift, geode in hand, toward Geode\'s claim.',
        c: [['Ask if he is nervous.', '"Extremely. I have had years to prepare a sentence for this and I still do not have one I like."', 24],
            ['Ask why now, after everything.', '"Because moving it six inches turned out to only work for about a week."', 22]] },
      { s: 'On the way, uncharacteristically talkative, {name} rehearses three different ways of explaining himself, and dislikes all three equally.',
        c: [['Tell him to just say it plainly.', '"Plainly. Of course. I have been overcomplicating the one part that does not need it."', 24],
            ['Ask if he is worried this looks presumptuous, showing up after years.', '"Yes. I have decided to do it anyway, which is new for me."', 26]] },
      { s: 'They arrive. {name} holds out the geode without the sentence he rehearsed, which turns out to say enough on its own.',
        c: [['Watch how it lands.', 'It lands hard, in a good way, and {name} looks almost as relieved as the person receiving it.', 26],
            ['Ask {name} how that felt.', '"Smaller than the years I spent avoiding it deserved. I am choosing not to be annoyed about that."', 26]] },
      { s: 'Walking back, {name} is quieter than usual, turning the empty space on his shelf over in his mind.',
        c: [['Ask what he plans to put there.', '"Nothing, for a while. I think that spot has earned a rest."', 26],
            ['Ask if letting it go felt like losing something.', '"A little. Mostly it felt like finally putting something down I had been carrying for both of us."', 28]] },
      { s: 'The next dropped glove that turns up gets tagged the same careful way as always - except this time {name} adds a note: "ask around before assuming nobody is looking."',
        c: [['Ask what changed.', '"I used to wait to be found. I am going to try finding people instead, at least sometimes."', 28],
            ['Say that is a real change in how he does this.', '"It is. It took one very old geode to teach me that."', 28]] },
      { s: 'Nils mentions, later, that {name} has started actually asking around town about a few of the older tags. {name} denies it, unconvincingly, and keeps doing it anyway.',
        c: [['Ask him about it directly.', '"Fine. Yes. Someone should ask, occasionally, instead of only ever waiting."', 28],
            ['Say the shelf looks a little different lately.', '"It has one fewer very old thing on it. I am told that counts as different."', 28]] }
    ]}
  ],

  overflow: [
    { title: 'Learned it the expensive way', place: 'the claim, near the old seam', hearts: 2, badges: 2, beats: [
      { s: '{name} talks a newer miner through a cut with exacting precision, checking the same measurement three times before committing to it.',
        c: [['Ask why so exact, for one cut.', '"Because I once was not, and the top came off the whole thing. Learned that the expensive way."', 18],
            ['Ask if it always takes this long.', '"It takes exactly as long as it needs to. That is rather the point."', 20]] },
      { s: 'The newer miner asks what "the expensive way" actually cost him. {name} does not answer immediately, which is itself an answer.',
        c: [['Wait for him to say more.', '"More than the tools, if you are asking. Ask me again once we are not mid-cut."', 20],
            ['Let it go for now.', 'He seems, briefly, grateful you did not push.', 18]] },
      { s: 'Later, pressed properly, {name} explains: he once pushed a seam past where he knew it was safe, chasing one more good vein, and the roof came down on all of it.',
        c: [['Ask if anyone was hurt.', '"Only me, and only pride, mostly. The ground took the rest."', 22],
            ['Ask what "all of it" means.', '"Tools I trusted. A good afternoon\'s work. One thing I actually wanted to keep."', 22]] },
      { s: '"There was a geode in that vein," he says, quieter than before. "Split it open myself, right before the roof went. Never got the chance to bring it up."',
        c: [['Ask if it is still down there.', '"As far as I know. I have not gone back to check, and I am not about to start now."', 24],
            ['Ask if he thinks about it often.', '"Whenever I explain this exact story to whoever is standing here learning the same lesson I did."', 24]] },
      { s: 'Ask if he ever considers going back for it properly, carefully this time, and he shakes his head before you finish the question.',
        c: [['Ask why not, if he could do it safely now.', '"Because the reckless version of me is the one who wanted it, and I am not eager to find out how much of him is still in here."', 26],
            ['Say that sounds like more than just caution about the rock.', '"It is. I have simply never said that part out loud before."', 26]] },
      { s: 'For the first time since you have known him, {name} shows you a genuinely fine piece of ore without immediately downplaying it or checking it three more times.',
        c: [['Ask what changed, just now.', '"Nothing, particularly. I noticed I was about to hide how pleased I was, and decided not to, for once."', 28],
            ['Say it is a good piece.', '"It is. I am allowed to say that plainly. I am relearning that, slowly."', 28]] }
    ]},
    { title: 'The half he never got back', place: 'the claim, near the old seam', hearts: 4, badges: 5, beats: [
      { s: 'Sump and Nils arrive at the claim together, which has never once happened before. {name} goes wary immediately, certain something is wrong.',
        c: [['Reassure him nothing is wrong.', '"Then why are the two most careful men in this cavern standing on my claim together."', 24],
            ['Let Sump explain.', '{name} waits, arms crossed, bracing for bad news that does not arrive.', 22]] },
      { s: 'Sump holds out the geode without much ceremony. {name} takes a long moment before he can make himself reach for it.',
        c: [['Watch his reaction.', 'He turns it over twice, silent, before something in his shoulders finally lets go.', 26],
            ['Ask what he is feeling.', '"Several things, none of them simple, all of them at once."', 24]] },
      { s: '"I have spent years deciding that whole afternoon was a mistake, full stop," he says. "I did not expect any part of it to come back."',
        c: [['Ask if this changes how he thinks about that day.', '"Some of it. Not the roof coming down. That part still happened exactly the way it happened."', 26],
            ['Ask if he feels forgiven, somehow.', '"By the rock, no. By myself, possibly, a little, for the first time."', 26]] },
      { s: 'He asks, carefully, whether this means he should trust himself with more than he has allowed himself lately.',
        c: [['Say that is his decision to make, not the rock\'s.', '"Fair. Uncomfortably fair. I was hoping the geode would decide it for me."', 26],
            ['Say caution and trust are not actually opposites.', '"I am starting, slowly, to believe that. I would like more evidence before I fully commit."', 28]] },
      { s: 'He thanks Nils for the tunnel and Sump for the years of keeping the geode safe, plainly, without deflecting either compliment away the way he usually would.',
        c: [['Ask how that felt, saying it plainly.', '"Strange. I am told that is what saying things properly is supposed to feel like."', 28],
            ['Say the three of them make an odd, solid little group.', '"We do. I am choosing to be glad about that rather than examine it to death."', 28]] },
      { s: 'That evening, {name} sets the geode on a shelf at the claim entrance, in plain view, and tells a newer miner the whole story - roof, recklessness and all - without shrinking any part of it.',
        c: [['Ask why tell it now, plainly, after all this time.', '"Because the version where I hide the reckless part is not actually the useful one to teach from."', 28],
            ['Say that is a real change in how he does this.', '"It is. It took one very patient man and one very careful one to get me here."', 28]] }
    ]}
  ],

  catalog: [
    { title: 'The gap in the index', place: 'the archive stacks', hearts: 2, badges: 2, beats: [
      { s: '{name} is running a cross-check against her own index and stops cold at one line: an item logged, shelved, and now simply not where the record says it is.',
        c: [['Ask if this happens often.', '"Never. That is rather the problem with it happening now."', 18],
            ['Ask if it could just be misfiled.', '"Possibly. I would still have to treat it as missing until I can prove otherwise."', 16]] },
      { s: '{name} rechecks the same shelf three times, as if the fourth check might produce a different result than the first three.',
        c: [['Ask why she keeps checking the same shelf.', '"Because the alternative is admitting the index might be wrong, and I would rather be thorough than wrong."', 18],
            ['Offer to check a different shelf for her.', '"No. If it is anywhere, I need to be the one who finds it. Otherwise I will not trust the finding."', 16]] },
      { s: '"One gap," she says, mostly to herself, "and the whole list stops being something I can promise is complete." She says "promise" like it costs her something.',
        c: [['Ask what she is actually afraid of.', '"That the next person who trusts this index completely gets told something false and has no way to know it."', 20],
            ['Say one gap does not undo the whole system.', '"It undoes the part of it I can vouch for personally. That part matters most to me."', 20]] },
      { s: 'She finally admits the item has not turned up anywhere she has looked, and starts drafting an entry that will say so plainly, in the permanent record.',
        c: [['Ask if it is hard to write that down.', '"Very. It would be easier to leave the line as it was and hope nobody checks it before I do."', 22],
            ['Say writing it down is the honest choice.', '"It is. I would still rather it were unnecessary."', 20]] },
      { s: 'The new line goes in, unhidden: item missing, logged this date, cause unknown. {name} reads it back twice before closing the ledger.',
        c: [['Ask how it feels, having it written.', '"Worse than not knowing, for about a minute. Better than pretending, for considerably longer than that."', 22],
            ['Say the archive is better for having it noted at all.', '"I am choosing to agree with you. It is easier than the alternative."', 22]] },
      { s: 'She closes the ledger and, unprompted, tells you this is the first gap she has ever logged instead of quietly resolved before anyone noticed.',
        c: [['Ask why tell anyone, if she could have kept it quiet.', '"Because a system only anyone trusts is one that admits when it does not know something. Mine had never had to, before today."', 24],
            ['Say that sounds like real change, for her.', '"It is. I am finding it uncomfortable and correct in roughly equal measure."', 24]] }
    ]},
    { title: 'What Ink found', place: 'the copy room', hearts: 4, badges: 5, beats: [
      { s: 'Ink appears at {name}\'s desk holding a duplicate page and asks, carefully, whether the missing item might have ever had a copy made of it.',
        c: [['Ask how she\'d even know that.', '"I keep my own log of every copy I have ever made. It is smaller than your index, but just as strict."', 20],
            ['Ask if she thinks she has it.', '"I think I might. I would rather check than say so and be wrong."', 18]] },
      { s: 'They cross-reference {name}\'s index against Ink\'s copy log, item by item, neither one willing to skip a line even to go faster.',
        c: [['Ask if this is slower than just guessing.', '"Considerably slower. It is also the only way either of our logs stays worth trusting."', 22],
            ['Say the two lists complement each other well.', '"They do. I had not previously considered that a virtue of having two."', 20]] },
      { s: 'Ink finds it: a careful facsimile, made years ago for an unrelated reason, sitting exactly where her own log says it should be.',
        c: [['Ask {name} how it feels to have the gap closed.', '"Closed differently than I expected. Not by finding the original. By trusting someone else\'s record instead."', 24],
            ['Ask if this changes how she sees her own index.', '"It changes what I think it needs to be complete. Apparently: not only mine."', 22]] },
      { s: '{name} updates the entry rather than deleting it: original missing, facsimile located and verified, cross-referenced this date.',
        c: [['Ask why keep the old entry instead of erasing it.', '"Because it happened. Erasing it would be tidier and less honest, and I have started to prefer the second one."', 24],
            ['Say that is a thorough way to close it.', '"It is the only way I would trust closing it. Thoroughness is not really optional for me."', 24]] },
      { s: 'She asks Ink, a little stiffly, whether she would be willing to have her copy log checked against the archive\'s index on a standing basis, not just this once.',
        c: [['Ask Ink how she takes the request.', '"Flattered, mostly. Also slightly terrified. Both, apparently, at once."', 26],
            ['Say that sounds like real trust, coming from {name}.', '"It is. I do not offer it lightly, and I am aware of exactly how rarely I have offered it before."', 26]] },
      { s: 'The two logs stay separate but now cross-checked, and {name}, for the first time, files a note crediting someone else\'s record for closing a gap in her own.',
        c: [['Ask how that note reads.', '"Plainly. \'Located via I. Verified. Filed jointly.\' I did not know how to make it sound like more than that, and decided it did not need to."', 28],
            ['Say the archive is better for the two of you working from it together.', '"I am inclined to agree, which is itself the largest change here."', 28]] }
    ]}
  ],

  facsimile: [
    { title: 'The one stray character', place: 'the copy room', hearts: 2, badges: 2, beats: [
      { s: 'A visitor holds up an old copy of {name}\'s and points, not unkindly, at a single character near the bottom that does not match the original beside it.',
        c: [['Ask {name} how she reacts.', 'She goes very still, then very quiet, then asks to see exactly where.', 18],
            ['Say it is one character, hardly worth mentioning.', '"It is one character. It is also the entire reason the sentence means something different now."', 16]] },
      { s: '{name} takes the copy back to her table and sets it beside the original, staring at the mismatch as if it might correct itself if she waits long enough.',
        c: [['Ask how long ago she made this one.', '"Years. Long enough that I had convinced myself it no longer counted."', 18],
            ['Ask if she wants to talk about it.', '"Not particularly. I am going to anyway, because you asked and because it has been years."', 18]] },
      { s: '"I was young at this, and tired, and I told myself one character would not matter," she says. "It mattered. It has mattered this whole time, quietly, without my supervision."',
        c: [['Ask what the mistake actually changed, in the text.', '"A small thing became a slightly different small thing. Small enough that almost nobody noticed. I noticed."', 20],
            ['Ask why she never fixed it before now.', '"Because fixing it meant admitting it, and admitting it meant everyone finally seeing the thing I am most afraid they already suspect: that I am not actually infallible."', 22]] },
      { s: '{name} admits she has known exactly which shelf that copy sits on for years, and has simply never gone back to it.',
        c: [['Ask if avoiding it made it easier.', '"For a while. Then it just became one more thing I was avoiding, which is its own kind of tiring."', 22],
            ['Say everyone drops something eventually.', '"Perhaps. I would still have preferred it were not me, and not that particular line."', 20]] },
      { s: '{name} starts, hesitantly, listing exactly what she would need to do to correct it properly: locate every copy made from the flawed one, not just the original.',
        c: [['Ask if that is more work than she expected.', '"Considerably. It is also the only version of \'fixed\' I am willing to call finished."', 24],
            ['Offer to help her track down the copies.', '"I would not refuse the help. I would also not blame you for changing your mind once you see how many there are."', 22]] },
      { s: 'For the first time, {name} writes the mistake down in her own hand, plainly, instead of just carrying it silently: one line, one date, one error, unresolved.',
        c: [['Ask why write it down now.', '"Because carrying it quietly clearly was not working. A written line, at least, cannot be quietly forgotten again."', 26],
            ['Say that took something, to admit in writing.', '"It did. I am not entirely sure yet whether I feel lighter or simply more exposed."', 24]] }
    ]},
    { title: 'Correcting it, out loud', place: 'the archive stacks', hearts: 4, badges: 5, beats: [
      { s: 'With Vell\'s index in hand, {name} starts tracking down every copy made from the flawed original, one shelf at a time, refusing to skip ahead.',
        c: [['Ask how many she has found so far.', '"Three, of an estimated five. I would rather find all five than feel finished early and be wrong."', 20],
            ['Ask if this is harder than making the correction itself.', '"Considerably. Finding them all is the part I cannot simply redo carefully. It has to be found, not just fixed."', 22]] },
      { s: 'Vell finds the fourth copy first, cross-referenced against her own log before {name} even reaches that shelf.',
        c: [['Ask {name} how it feels, being helped with this specifically.', '"Strange. This is the part I always assumed I would have to do entirely alone, as a kind of penance."', 22],
            ['Say two systems finding it together beats one finding it slowly.', '"I am coming to agree. Slowly. Old habits resist that particular idea."', 22]] },
      { s: 'The fifth and last copy turns up in the reading room, in plain view, where someone has apparently been reading the flawed line for years without ever flagging it.',
        c: [['Ask if that makes it worse, knowing that.', '"A little. Mostly it makes correcting it feel more necessary, not less."', 24],
            ['Ask if she is relieved to finally have all five.', '"Extremely. I did not realize how much of my attention that unfinished count had quietly been using."', 24]] },
      { s: '{name} corrects all five, in front of Vell rather than alone behind a closed door, the way she has always done this before.',
        c: [['Ask why do it here, in the open, this time.', '"Because hiding while I fix my own mistake was never actually protecting anyone. It was only protecting how I looked while I did it."', 26],
            ['Say that is a genuinely different way for her to work.', '"It is. I intend to keep doing it this way, provided I can stand the discomfort of being watched."', 26]] },
      { s: 'Vell logs the correction properly - five facsimiles, one error, located and fixed jointly - crediting both of them by name in the permanent record.',
        c: [['Ask {name} how she feels seeing both names on the entry.', '"Oddly proportionate. It was not only my error to carry, once someone else\'s record is what caught it."', 26],
            ['Say the record reads like a real correction, not a quiet cover-up.', '"That was the point of writing it that way. I am glad it reads as intended."', 26]] },
      { s: '{name} starts, from that day on, checking her own oldest copies against Vell\'s index on a standing basis, out loud, instead of trusting memory alone.',
        c: [['Ask what changed her mind, in the end.', '"One character, five copies, and a very patient archivist who was willing to look for all of it with me instead of only after me."', 28],
            ['Say that sounds like real trust, both ways.', '"It is. I did not expect trusting someone else\'s exactness to make my own feel safer instead of smaller."', 28]] }
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
    { title: 'Revisit a disproven field sketch', place: 'the lab, after hours', hearts: 2, badges: 7, beats: [
      { s: '{name} has forty years of field notes spread across the desk and is hunting one page in particular, unwilling to say why yet.',
        c: [['Ask which page.', '"You will see when I find it." She keeps looking, methodically, refusing to guess out loud.', 20],
            ['Start checking the boxes by the window.', 'You find it before she does. She takes it without immediate thanks, which is thanks.', 22]] },
      { s: 'The page is a migration sketch from her first season here. The pattern on it is confidently, completely wrong.',
        c: [['Ask what she got wrong.', '"The whole direction. I drew it backward and defended it for a year." She sounds pleased, not embarrassed.', 22],
            ['Ask why she kept it.', '"So I remember being certain and incorrect at the same time. It happens more often than people admit."', 22]] },
      { s: '"This is the sketch the whole migration survey corrects," she says, tapping it. "I would not have known to look twice without being wrong first."',
        c: [['Ask what the corrected route looks like.', 'She draws it in under a minute, hand steady, forty years faster than the first attempt.', 24],
            ['Say the mistake earned its keep.', '"Yes." She almost smiles. "Most of them do, eventually."', 22]] },
      { s: 'She goes quiet, looking at a second page tucked behind the first: an old judgment about a colleague she never revised.',
        c: [['Ask about the second page.', '"An old opinion. I have had better evidence for years and have not gotten round to it." She does not name who.', 24],
            ['Ask if she plans to fix it.', '"Eventually." She says it the way she says everything she is avoiding.', 22]] },
      { s: 'She starts a fresh page for the corrected route, then files the old wrong one at the front of a new binder instead of the bin.',
        c: [['Ask why keep the wrong one at all.', '"So the next person sees the mistake before the fix. It is more useful in that order."', 24],
            ['Offer to help file the rest of the notes.', 'You spend an hour on it. She corrects your filing twice, gently.', 22]] },
      { s: 'By the time you finish, the desk is one page shorter and considerably more honest.',
        c: [['Ask what she believes now, about the migration.', 'She tells you. It takes forty minutes and she draws most of it twice.', 26],
            ['Say you will help her check the next page too.', '"There will be a next page." She says it like a warning and a thank-you at once.', 26]] }
    ]},
    { title: 'Confront an uncredited contribution', place: 'the lab', hearts: 4, badges: 9, beats: [
      { s: 'A regional grant renewal letter arrives thanking "the lab" for the migration survey data. Kern\'s name is nowhere on it.',
        c: [['Point out that Kern collected most of it.', '"He did." {name} reads the letter again, slower.', 20],
            ['Ask who wrote the letter.', '"The regional office. They wrote to the name on the building, which is not the same as the work."', 20]] },
      { s: '{name} drafts a reply and stops halfway through it, pen down.',
        c: [['Ask what is stopping her.', '"Nothing good. Habit, mostly." She picks the pen back up.', 22],
            ['Suggest she just add his name.', '"That is the whole fix, isn\'t it." She says it like it should have been obvious sooner.', 22]] },
      { s: 'She calls Kern in to review the reply before sending it, which she has never done for a letter like this before.',
        c: [['Ask why she wants his sign-off this time.', '"Because it is his data and his name, and I would rather he see it before the regional office does."', 24],
            ['Wait quietly while he reads it.', 'He reads it twice. The second time is just to be sure it says what he thinks it says.', 22]] },
      { s: 'Kern points out, flatly, that this is the first letter in two years with his name spelled correctly.',
        c: [['Ask her to explain that.', '"I typed it myself instead of using the standing template." Plain concession, no excuse attached.', 24],
            ['Say nothing and let the moment sit.', 'She lets it sit too, which from her is its own kind of apology.', 22]] },
      { s: 'The letter goes out with both names on it. {name} keeps the draft with her corrections still visible, rather than the clean final copy.',
        c: [['Ask why keep the messy draft.', '"So I remember I had to be told." She is not being hard on herself. She is being accurate.', 24],
            ['Say the grant office will notice the change.', '"Good. Let them ask why."', 22]] },
      { s: 'A month later, a second letter arrives, addressed for the first time directly to Kern, care of the lab.',
        c: [['Point it out to her.', 'She reads the address twice and hands it over without comment, which is the whole comment.', 26],
            ['Ask if this happens now.', '"It will. I am not doing that again." Plain, and she means it.', 26]] }
    ]},
    { title: 'Delegate a consequential survey decision', place: 'the lab, between visitors', hearts: 6, badges: 11, beats: [
      { s: 'A visiting student flags an error in one of {name}\'s published migration conclusions, in front of three other researchers.',
        c: [['Ask the student to walk through it.', 'They do, nervously, and the math holds up.', 22],
            ['Ask {name} how she wants to handle it.', '"Correctly, which is rarely the comfortable option." She asks the student to continue.', 24]] },
      { s: 'She goes still for a moment, the way she does before conceding something. Then she asks the student to redo the affected section themselves.',
        c: [['Ask why hand it to them instead of fixing it herself.', '"Because they found it. Finding it is most of the work." She means it as fact, not generosity.', 24],
            ['Ask the student if they want the responsibility.', 'They say yes before they can talk themselves out of it.', 22]] },
      { s: '{name} sends the disputed section to Hawthorn for a second read before it goes anywhere near publication.',
        c: [['Ask why Hawthorn specifically.', '"Because he will tell me if I am still wrong, and he will be right about it." She trusts few people that way.', 24],
            ['Ask what Hawthorn said.', '"That the student is correct and I should say so publicly. He is rarely diplomatic about being right."', 24]] },
      { s: 'The student\'s revision comes back tighter than {name}\'s original section. She reads it twice before saying anything.',
        c: [['Ask what she thinks of it.', '"Better than mine. I will say so in the notes, not just to their face."', 26],
            ['Ask if that is hard to admit.', '"Less than it used to be." Plain concession, no further comment.', 24]] },
      { s: 'She adds the student\'s name to the section header herself, unprompted, before anyone can suggest it.',
        c: [['Say that is generous.', '"It is accurate. The two are not always the same thing, but here they are."', 24],
            ['Ask what happens to the student next.', '"Whatever they choose. I am not in the business of keeping good work for myself anymore."', 26]] },
      { s: 'The corrected survey goes out with two names on the section, and {name} spends the evening making sure the citation is formatted correctly, not the credit.',
        c: [['Ask if she is worried what people will think.', '"That I was wrong publicly? I have survived it before. I intend to survive it again."', 26],
            ['Say the student will remember this.', '"Good. That was rather the point of doing it properly."', 26]] }
    ]},
    { title: 'Leave the lab and return to find it thriving', place: 'the field station, days out', hearts: 8, badges: 13, beats: [
      { s: '{name} leaves for a migration window on the regional routes, a rare multi-day trip, and hands the lab key to Kern without a checklist attached.',
        c: [['Ask her if that worries her.', '"Constantly. I am going anyway." She says it like the two facts are unrelated, which they are not.', 24],
            ['Wish her a good survey.', '"I intend to have one." She is already checking the route twice.', 22]] },
      { s: 'While she is away, the lab keeps running: deliveries on schedule, the archive sorted, a student\'s correction filed properly without her.',
        c: [['Ask Kern how it is going.', '"Fine. Better than fine, honestly, though I will not be saying that where she can hear it."', 22],
            ['Check in on the lab yourself.', 'Nothing is wrong. That is somehow the most notable thing about the whole week.', 22]] },
      { s: '{name} comes back road-worn and immediately starts looking for something to fix, out of habit.',
        c: [['Tell her there is nothing broken.', 'She checks anyway. There genuinely is nothing broken.', 24],
            ['Ask how the survey went.', 'She talks for twenty minutes, mostly about the route, once about missing the lab.', 24]] },
      { s: 'She reads through what happened while she was gone: the corrected grant letter, the student\'s published section, the schedule that held without her.',
        c: [['Ask what she makes of it.', '"That I built something that does not need me standing over it. I am still deciding how I feel about that."', 26],
            ['Say that sounds like the plan working.', '"It does, doesn\'t it." She says it slowly, like she is testing whether it is true.', 26]] },
      { s: 'She admits, once, and only to you, that the trip made her wonder if the lab has already outgrown her supervision.',
        c: [['Say the lab still needs her, just differently.', '"Differently is the right word. I am recalibrating what differently means."', 26],
            ['Ask if that is a relief or a loss.', '"Both, today. Ask me again next season and I may have an actual answer."', 28]] },
      { s: 'She starts a new volume of field notes and leaves the first page blank, the way she always does, except this time she writes one line at the bottom before closing it: a note to check in with Kern and the student, regularly, on purpose.',
        c: [['Ask what changed her mind.', '"Nothing dramatic. I simply noticed the lab thrived on being trusted, not managed. I would like to keep noticing that."', 28],
            ['Say you are glad she went.', '"So am I. Marginally more than I expected to be."', 28]] }
    ]}
  ],

  archivist: [
    { title: 'Earn access to an imperfect instrument', place: 'the instrument deck', hearts: 2, badges: 7, beats: [
      { s: '{name} has an old brass instrument on the deck that reads three degrees off true, and he will not fix it fully or retire it.',
        c: [['Ask why not just replace it.', '"Because the drift is itself forty years of data. A new instrument would erase the only record of how badly the old one aged."', 20],
            ['Ask what the drift has taught him.', 'He recites the correction from memory, unprompted, the way other people recite an address.', 20]] },
      { s: 'He shows you the logbook beside it: every reading annotated with the known correction, in the same careful hand for decades.',
        c: [['Say that is remarkably consistent.', '"Consistency is the entire discipline. The sky will forgive imprecision. The archive will not."', 22],
            ['Ask if he ever considered a fresh instrument.', '"Twice. I declined both times, for reasons I am only now willing to say plainly."', 22]] },
      { s: 'He hands you the instrument and asks you to take a reading yourself, watching closely to see what you do with the error.',
        c: [['Log the raw reading and the known correction separately.', '"Correct. An honest number and a corrected one are not the same claim." He looks, briefly, satisfied.', 24],
            ['Ask him to check your correction before you write anything down.', 'He checks it, finds it right, and lets you write it yourself regardless.', 22]] },
      { s: 'A visiting instrument engineer offers, generously, to recalibrate the whole thing for free before she leaves the region.',
        c: [['Ask him if he will accept.', '"I am considering it more seriously than I would have a year ago." He does not commit either way yet.', 24],
            ['Ask what he would lose by accepting.', '"Forty years of a very specific, very honest kind of wrongness. I have not decided if that is worth keeping."', 24]] },
      { s: 'He declines the recalibration, in the end, but writes down the offer and the reasoning beside the day\'s log entry — the first time he has recorded a decision rather than just a measurement.',
        c: [['Ask why record the decision itself.', '"Because someone after me will wonder why the number is still off. Now they will not have to guess."', 26],
            ['Say that is a kind of honesty too.', '"It is the same discipline, applied to myself instead of the sky." He says it like a small concession.', 26]] },
      { s: 'He formally grants you standing access to the deck instruments, in writing, the way he would credit any collaborator.',
        c: [['Ask what changed his mind.', '"You asked what the drift taught me before you asked why I had not fixed it. Most people ask the second question first."', 28],
            ['Thank him properly.', '"Do not thank me. Use it accurately. That is the actual thanks I want."', 28]] }
    ]},
    { title: 'Compare a disputed record with Linden', place: 'the instrument deck', hearts: 4, badges: 9, beats: [
      { s: 'A letter from Linden arrives disputing one of {name}\'s long-term weather correlations, tied to her migration data.',
        c: [['Ask what she is disputing exactly.', '"That my series and her routes disagree by nine days in three separate seasons. She is not wrong that they disagree."', 22],
            ['Ask if disputes like this are common between them.', '"Roughly annual. I would be more concerned if they stopped."', 20]] },
      { s: 'He reviews her attached data fully before responding, conceding one point in the margin before he has even finished reading.',
        c: [['Ask which point he is conceding.', '"The nine-day gap in the third season. My instrument was almost certainly the problem, not her count."', 24],
            ['Ask if conceding early is difficult for him.', '"Only in the sense that I would prefer to be right. The record does not care what I would prefer."', 22]] },
      { s: 'He drafts a reply that holds firm on two seasons and concedes the third, precisely, without a single unnecessary word about who was right.',
        c: [['Read the draft with him.', 'It is exact and entirely without edge. You would not know from the tone that either of them minded losing a point.', 24],
            ['Ask why the tone stays so even.', '"Because the disagreement is about a measurement, not about either of us. I would like to keep it that way."', 24]] },
      { s: 'Solveig, reading over his shoulder, points out a transcription error in his own supporting table.',
        c: [['Ask him how he will handle the correction.', '"Fix it, credit her for finding it in the footnote, and be glad she caught it before Linden did."', 24],
            ['Ask Solveig how she found it.', '"I check his tables before he sends anything anywhere. He does not always remember to thank me for that." She is not wrong.', 22]] },
      { s: 'The corrected reply goes out. Linden\'s response arrives two days later: three lines, blunt, and unmistakably respectful.',
        c: [['Ask what she said.', '"That I was right about two seasons and gracious about the third. From her, that is a considerable compliment."', 26],
            ['Ask if he will reply again.', '"Only to thank her for the correction. The matter itself is settled." He already has the paper out.', 24]] },
      { s: 'The dispute closes with a joint footnote in both their records, crediting Linden, Solveig, and the correction itself by name.',
        c: [['Ask how it feels to share the footnote.', '"Accurate. I would rather share credit for a correct record than hold all of one that is slightly wrong."', 28],
            ['Say that is a good way to disagree with someone.', '"It is the only way I know how, with her. I have never needed another."', 28]] }
    ]},
    { title: 'Choose a bounded claim for publication', place: 'the regional archive', hearts: 6, badges: 11, beats: [
      { s: '{name} has data that would support a striking claim about a shifting season boundary, and he is visibly resisting the idea of making it.',
        c: [['Ask why not make the bigger claim.', '"Because it is bigger than the evidence, and I would rather publish something narrow and true than something wide and merely plausible."', 22],
            ['Ask what the narrower claim would say.', 'He states it in one precise sentence. It is considerably less exciting, and considerably more defensible.', 22]] },
      { s: 'A first-year student asks him, without any particular tact, why his claim is so much smaller than his own data seems to allow.',
        c: [['Wait to see how he answers her.', 'He answers her fully and formally, as though she were a visiting colleague rather than a first-year. She was not expecting that.', 24],
            ['Ask the same question yourself, more gently.', '"You may ask it exactly as bluntly as she did. I did not mind the bluntness. I minded not having a good answer yet."', 24]] },
      { s: 'Her question turns out to expose a genuine gap in one of his supporting seasons, and he spends the evening narrowing the claim further because of it.',
        c: [['Ask if that is frustrating.', '"Mildly. Considerably less frustrating than publishing the gap and having someone else find it for me."', 26],
            ['Ask what he will credit her with.', '"The question that found the gap. I have already written the footnote."', 24]] },
      { s: 'Solveig asks, plainly, whether the narrower claim will even be considered worth publishing at all.',
        c: [['Wait for his answer.', '"Possibly not by everyone. It will be considered worth trusting, which I have decided matters more to me now."', 26],
            ['Say the narrow claim sounds like the safer choice.', '"Safer, and slower, and considerably harder to undo later. I have made my choice."', 24]] },
      { s: 'He submits the bounded claim with the student\'s question credited by name in the second footnote, beside Solveig\'s in the first.',
        c: [['Ask if it feels like a smaller achievement.', '"It feels like an honest one. I have stopped conflating the two."', 26],
            ['Say the footnotes matter more than people think.', '"They are the only part of the paper I am certain will still be true in twenty years."', 26]] },
      { s: 'Three months later, new data arrives that would have quietly undercut the bigger claim he almost made. The narrow one still holds.',
        c: [['Point that out to him.', '"I noticed. I have been rereading that footnote rather more than is strictly necessary." He allows himself the dry admission.', 28],
            ['Ask if he ever regrets not risking the bigger claim.', '"Ask me again in another twenty years. So far, no."', 28]] }
    ]},
    { title: 'Open the archive to successor observations', place: 'the regional archive, late', hearts: 8, badges: 13, beats: [
      { s: '{name} is organizing decades of instrument logs into a form someone other than himself could actually read.',
        c: [['Ask why now.', '"Because I am the only person alive who can read half of my own shorthand, and that stopped being a virtue some years ago."', 24],
            ['Offer to help sort the older volumes.', 'He accepts, cautiously, and corrects your filing exactly twice, formally, both times fairly.', 22]] },
      { s: 'He admits, once, that guarding the full method this long was never really about precision.',
        c: [['Ask what it was about, then.', '"Being the only one who could finish it. I am no longer certain that was ever a distinction worth keeping."', 26],
            ['Say that is a difficult thing to admit.', '"It is. I have found it considerably easier to say to you than to the mirror."', 24]] },
      { s: 'He sits down with Solveig and a visiting student together and teaches them, for the first time, the full archive method in one sitting.',
        c: [['Watch the lesson through to the end.', 'It takes three hours. He does not rush a single part of it, and neither of them asks him to.', 26],
            ['Ask Solveig afterward how it felt.', '"Overdue. In the specific and complimentary sense of that word." She is smiling more than usual.', 24]] },
      { s: 'Linden visits to review the archive\'s new structure with him, and for once they agree on the indexing without a single formal dispute.',
        c: [['Ask what finally got them to agree.', '"Neither of us had anything left to defend. It is remarkable how quickly agreement follows once that stops being the goal."', 28],
            ['Say that sounds like real progress, for the two of them.', '"Do not tell her I said so. She will be insufferable about it, correctly."', 26]] },
      { s: 'He writes the archive\'s opening page himself, crediting every aide and contributor by name, in the order they actually did the work.',
        c: [['Ask why the order matters to him.', '"Because the order is also a record, and I have grown considerably less comfortable with inaccurate records of any kind."', 28],
            ['Ask if your name is anywhere in it.', 'He turns the page around without comment. It already is, precisely where the work happened.', 28]] },
      { s: 'The archive opens formally to successor observations: entries logged by people who are not him, in a hand that is not his, continuing past wherever he stops.',
        c: [['Ask how it feels to hand it over.', '"Like losing something and keeping it at the same time. I did not expect both to be true simultaneously."', 30],
            ['Say the record will outlast him now, properly.', '"That was rather the entire point, once I finally admitted it to myself." Dry, and for once, entirely warm.', 30]] }
    ]}
  ],

  emeritus: [
    { title: 'The marginal note', place: 'the lab, among the older shelves', hearts: 2, badges: 10, beats: [
      { s: '{name} has pulled a lecture transcript from thirty years back and is glaring at a note he wrote in his own hand in the margin.',
        c: [['Ask what the note says.', '"That the base case never needs proving separately. I was confident. I was also wrong." He says it like a weather report.', 20],
            ['Ask why he kept the transcript at all.', '"Because throwing it out does not un-teach it to the people I taught it to." Flat, and entirely serious.', 18]] },
      { s: '"I taught that exact error to four cohorts before someone finally caught it," he says. "Not one of them wrote back to tell me."',
        c: [['Ask how he found out, then.', '"I found it myself, years later, doing the proof again for no reason at all. That is the only way these things are ever caught."', 22],
            ['Say four cohorts sounds like a lot.', '"It is. I have made my peace with it. The peace took a while."', 20]] },
      { s: 'He turns another page and stops: someone has cited his original, uncorrected version in a recent set of study notes pinned to the archive board.',
        c: [['Ask who wrote the recent notes.', 'He checks the initials. "A current student. Repeating my exact mistake, thirty years later, faithfully."', 22],
            ['Ask if that changes anything.', '"It changes today\'s plan, certainly. Yesterday I was rereading. Today I am correcting."', 22]] },
      { s: '{name} starts drafting a correction slip to pin beside the old notes, slower and more carefully than the writing warrants.',
        c: [['Ask why write it out so carefully for one slip of paper.', '"Because it will outlive the conversation we are having about it. Everything pinned to that board does."', 24],
            ['Offer to pin it up for him.', '"Not yet. I want to read it once more, uncharitably, before anyone else does."', 22]] },
      { s: 'Underneath the transcript is a second, older page: a proof sketch in a different, younger hand, marked only "L., first attempt."',
        c: [['Ask whose hand that is.', '"Linden\'s. Her first real proof, and considerably more careful than mine at that age." He says it without a trace of surprise.', 24],
            ['Ask if she made the same mistake he did.', '"No. She caught the same gap I missed, a full decade before I did." He puts the page down like it might bruise.', 26]] },
      { s: 'He pins the correction slip up himself, in the end, right beside the old wrong version rather than over it.',
        c: [['Ask why leave the wrong one visible too.', '"So the correction means something. A fix nobody can see the mistake behind is just a new unexamined claim."', 26],
            ['Say that is a very Linden thing to do.', 'He goes still for a moment. "I taught her that. I had somehow forgotten I taught her that."', 26]] }
    ]},
    { title: 'The only sentence he has not rehearsed', place: 'the lab, near closing', hearts: 4, badges: 12, beats: [
      { s: '{name} is drafting something short on a single card, crossing out most of it, and starting again on a fresh card.',
        c: [['Ask what he is writing.', '"A note. It is proving unreasonably difficult for four lines." He does not stop crossing things out.', 22],
            ['Ask who it is for.', 'He hesitates exactly long enough to answer the question without saying it.', 20]] },
      { s: '"I have told entire lecture halls things I believed and meant," he says. "I cannot, apparently, tell one former student one true thing."',
        c: [['Ask what the true thing is.', '"That the lab runs better without me arguing in it. That this was always going to be the correct outcome."', 24],
            ['Ask why it is harder to say to her specifically.', '"Because a lecture hall cannot change the subject on me. She always does, deliberately, before I finish."', 22]] },
      { s: 'Linden\'s voice carries in from the corridor, arguing amiably with Kern about a delivery schedule. {name} puts the card face down at once.',
        c: [['Ask if he is going to say it today.', '"I was going to. The corridor is very loud today, as it happens." A convenient, transparent excuse.', 24],
            ['Point out that the corridor is not actually that loud.', '"No," he admits. "It is not." He does not pick the card back up either.', 22]] },
      { s: 'The corridor goes quiet again. {name} looks at the card, then at the doorway, then back at the card.',
        c: [['Tell him to just say the plain version, out loud, now.', '"The plain version." He tries it under his breath first, then not under his breath.', 26],
            ['Ask what the plain version even is.', '"That I am proud of her. Four words. I have apparently needed thirty years and an audience to manage them."', 26]] },
      { s: 'He goes to the doorway and says it to Linden directly, plainly, before she can redirect the conversation the way she always does.',
        c: [['Watch how she takes it.', 'She opens her mouth, presumably to change the subject, and then, for once, does not. "Noted," she says instead, which from her is a great deal.', 28],
            ['Look away and give them the moment.', 'You hear only the pause, which somehow tells you everything the words would have.', 26]] },
      { s: 'Back at his desk, {name} tears up the card he never finished writing. He did not need it after all.',
        c: [['Ask how it feels, finally having said it.', '"Considerably lighter than thirty years of not saying it led me to expect." Dry, and entirely honest.', 28],
            ['Say she will remember that, properly, now.', '"I am counting on it. It is the only draft of that sentence I intend to need."', 28]] }
    ]}
  ],

  aide: [
    { title: 'The routine delivery', place: 'the delivery route', hearts: 2, badges: 0, beats: [
      { s: '{name} unloads the crates alone before you can help, listing every stop from memory without checking a clipboard.',
        c: [['Ask if you can help carry the next crate.', '"If you insist." He hands you the middle one, the one he was actually struggling with.', 20],
            ['Ask how he keeps the route straight without notes.', '"Two years of getting it wrong first." He does not stop moving while he says it.', 18]] },
      { s: 'A shopkeeper thanks Professor Linden for the delivery. {name} says nothing and keeps unloading.',
        c: [['Point out that he carried it, not Linden.', '"She signed the order." He says it like that settles something it does not settle.', 18],
            ['Say nothing and note it for later.', 'He notices you noticed. Neither of you says anything else about it yet.', 15]] },
      { s: 'The next stop is short a crate, and {name} checks his own duplicate list before panicking.',
        c: [['Ask what the duplicate list is for.', '"For when the first list is wrong, which is often." He finds the crate exactly where the second list said.', 20],
            ['Offer to backtrack with him.', '"Faster alone." He is right, but he says thank you afterward anyway.', 18]] },
      { s: 'At the last stop, the shopkeeper actually asks {name}\'s name for once, instead of asking after "the professor\'s assistant."',
        c: [['Tell her his name before he can deflect it.', 'He looks briefly furious, then oddly pleased, and does not correct you.', 20],
            ['Wait to see if he says it himself.', 'He does, plainly, and writes it on the receipt himself this time.', 20]] },
      { s: 'Route finished, {name} eats standing up against the cart, going through tomorrow\'s list out loud.',
        c: [['Ask if he ever eats sitting down.', '"When the route is shorter." It is never shorter.', 18],
            ['Ask what he would do with a whole free afternoon.', 'He has to think about it for an uncomfortably long time.', 18]] },
      { s: 'He hands you a spare receipt copy at the end, unprompted, the kind he usually only keeps for himself.',
        c: [['Ask why he is giving you this one.', '"So somebody besides me has proof the route happened." That is the whole reason.', 20],
            ['Say you will walk the route with him again.', '"Bring your own gloves next time." That is a yes.', 20]] }
    ]},
    { title: 'The checklist that failed', place: 'Linden Lab', hearts: 4, badges: 3, beats: [
      { s: 'A crate of field kits arrives short two items. {name}\'s checklist says complete. He stares at the paper like it lied to him personally.',
        c: [['Ask what the checklist missed.', '"Nothing. Someone opened it after I checked." Not his fault, and he still looks sick about it.', 20],
            ['Help him recount instead of guessing.', 'Recounting together finds the actual gap in four minutes instead of forty.', 20]] },
      { s: 'Linden asks who is responsible, in front of a visiting researcher. {name} opens his mouth to take the blame anyway.',
        c: [['Speak up with the real explanation before he can.', 'Linden listens, nods once, and moves on without making it a moment. He looks unbalanced by how easy that was.', 22],
            ['Let him answer and back him up after.', 'He gives the honest answer for once, and you confirm it. Nothing bad happens.', 20]] },
      { s: '{name} rewrites the checklist that evening, adding a line that is not about supplies at all.',
        c: [['Ask what the new line says.', '"Verify seal after handoff, not before." Small, specific, permanent.', 20],
            ['Ask if this happens often.', '"Rarely. It only has to happen once to change the list forever."', 18]] },
      { s: 'A different aide from another lab hears about the mistake and brings it up, expecting {name} to be defensive.',
        c: [['Let him handle it himself.', '"Yes, that happened. The list is better now." He says it flatly, and the other aide has nothing left to say.', 20],
            ['Change the subject before it gets uncomfortable.', 'He answers the question anyway, once you have run out of ways to dodge it.', 15]] },
      { s: 'Linden mentions the incident weeks later, in passing, crediting {name} with the fix rather than the mistake.',
        c: [['Point out that she remembered it right.', '"I remember most things right. I say them wrong sometimes." Fair trade, from her.', 20],
            ['Ask him how it feels to hear that.', '"Overdue." He says it lightly, but he means it.', 20]] },
      { s: 'The new checklist line gets copied by two other labs that heard about it secondhand.',
        c: [['Tell him his mistake is now everyone\'s improvement.', '"Wonderful. My worst afternoon, immortalized." He is clearly delighted anyway.', 20],
            ['Ask if he will tell people it was his line.', '"If they ask." Someone always asks now.', 20]] }
    ]},
    { title: 'Survey ownership', place: 'Linden Lab', hearts: 6, badges: 6, beats: [
      { s: 'Linden mentions the upcoming migration survey needs a lead. {name} lists three names, none of them his own.',
        c: [['Ask why he did not put his own name on the list.', '"Because it was not mine to put there." He says it like a rule, not a feeling.', 22],
            ['Suggest his name to Linden yourself.', 'Linden looks at him for a long moment. "Was I supposed to guess?"', 20]] },
      { s: 'Linden asks {name} directly if he wants to lead it. He has an answer ready that is not quite yes.',
        c: [['Ask him what the honest answer is.', '"Yes. I had a whole speech about logistics ready instead." He drops the speech.', 22],
            ['Wait him out.', 'The silence gets long enough that his honest answer arrives on its own.', 20]] },
      { s: '{name} drafts a survey plan and hesitates before putting his own name on the cover page.',
        c: [['Point at the blank line where his name should go.', 'He writes it, small, then rewrites it slightly larger.', 22],
            ['Ask what he is waiting for.', '"Nothing, technically." He signs it while saying that.', 20]] },
      { s: 'Linden reviews the plan and changes exactly one thing, then hands it back without further comment.',
        c: [['Ask what she changed.', '"The route. Everything else was correct." From her, that is a great deal of praise.', 22],
            ['Ask if that is her way of approving it.', '"Obviously." She is already reading something else.', 20]] },
      { s: 'Word gets around town that {name} is running his own survey this season, not just Linden\'s errands.',
        c: [['Ask how it feels to hear people say that.', '"Accurate, for once." He tries not to look pleased about it and fails.', 22],
            ['Point out that people are asking to join.', '"Let them. More hands, fewer excuses to fall behind."', 20]] },
      { s: 'The night before the survey, {name} runs through his own checklist instead of Linden\'s, out loud, to make sure it holds.',
        c: [['Listen to the whole list.', 'It is thorough, a little obsessive, and entirely his. He seems to need someone to hear it once before tomorrow.', 22],
            ['Tell him it is ready.', '"You do not know that." He is right, but he stops checking anyway.', 20]] }
    ]},
    { title: 'The field day', place: 'the field station', hearts: 8, badges: 9, beats: [
      { s: 'The survey team assembles at dawn, looking to {name} for the plan instead of to Linden.',
        c: [['Stand back and let him run the briefing.', 'He runs it clearly, checklist in hand, and only checks it twice.', 24],
            ['Ask if he is nervous.', '"Extremely. I have also never been more prepared." Both true.', 22]] },
      { s: 'A junior volunteer makes a genuine mistake in the field, expecting to be reprimanded the way {name} once was.',
        c: [['Wait to see how he handles it.', '"That happened to me once too. Here is the fix." No blame, just the correction.', 24],
            ['Step in to smooth it over yourself.', 'He gets there first, calmer than you expected.', 20]] },
      { s: 'The survey turns up a genuinely useful result, better than anyone predicted going in.',
        c: [['Ask what happens to the credit for this.', '"Goes on the report. All of our names, in the order we did the work." He already wrote it that way.', 24],
            ['Ask if he will tell Linden himself.', '"Already did. This morning, before we left." He had been planning that part longest.', 22]] },
      { s: 'Back at the lab, Linden reads the finished report and asks one pointed question about the methodology.',
        c: [['Let him answer it directly.', 'He does, precisely, without deferring to her the way he used to.', 24],
            ['Point out he already accounted for that.', '"I did." He sounds almost surprised he does not need to explain further.', 22]] },
      { s: 'The team, unprompted, starts calling it "{name}\'s survey" instead of "the professor\'s survey."',
        c: [['Ask if that bothers Linden.', '"Why would it. It is his survey." She says it like the obvious fact it now is.', 24],
            ['Ask him how it sounds, hearing that.', '"Correct," he says, and for once does not qualify it.', 24]] },
      { s: 'That evening, {name} updates his duplicate checklists, one for the route and, for the first time, one headed simply "credit."',
        c: [['Ask what goes on the credit list.', '"Everyone who was actually there. Starting with the person who made me put my own name on things."', 24],
            ['Ask if your name is on it.', 'He turns the page around. It already is, near the top.', 24]] }
    ]}
  ]
};

/* Archetype events are shared by many people. Source IDs stay stable if an arc
   is reordered; friends.js prefixes them with the person's ID when resolving a
   concrete social scene. */
Object.keys(window.FOLK_EVENTS).forEach(function (arcId) {
  window.FOLK_EVENTS[arcId].forEach(function (scene) {
    scene.id = 'folk-' + arcId + '-event-' + socialIdPart(scene.title);
    scene.beats.forEach(function (beat) {
      beat.id = scene.id + '-beat-' + socialIdPart(beat.s);
      labelSocialChoices(beat.c, beat.id);
    });
  });
});
