/* Structural authoring bibles for the approved Tier 1 cast.

   These are constraints for later scene and dialogue authors, not player-facing
   prose. Gift categories and item IDs are declarative hooks for Phase 3. */
(function () {
  var STAGES = ['acquaintance', 'recognition', 'comfortable', 'beginning', 'friend', 'trusted', 'close'];

  function opinions(lines) {
    var result = {};
    STAGES.forEach(function (stage, index) { result[stage] = lines[index]; });
    return result;
  }

  function edge(id, kind, expectation) {
    return { id: id, kind: kind, reciprocal: true, important: true, expectation: expectation };
  }

  function bible(spec) {
    spec.occupationRole = spec.occupationRole || spec.occupation;
    spec.hobbies = spec.hobbies || spec.interests.slice();
    spec.growthDirection = spec.growthDirection || spec.personalArc.growthDirection;
    return spec;
  }

  window.CAST_BIBLE_STAGES = STAGES.slice();
  window.CAST_BIBLES = {
    rowan: bible({
      approximateAge: 17, occupation: 'Junior trainer and local rival',
      personality: ['competitive', 'observant', 'earnest', 'guarded about failure'],
      speechStyle: 'Quick, specific and lightly challenging; softens through practical offers rather than speeches.',
      interests: ['battle journals', 'secondhand strategy books', 'morning training'],
      dislikes: ['pity', 'careless boasting', 'people reading private notes'],
      habits: ['records every match', 'sharpens borrowed pencils before returning them', 'stretches with Riolu'],
      relationships: [edge('theo', 'friendly-rivalry', 'Each respects the other\'s preparation and must be allowed to disagree without cruelty.')],
      insecurities: ['fears effort will look like lack of talent'], goals: ['become adaptable rather than merely prepared'],
      lesserKnownTraits: ['keeps kind comments in the back of the battle notebook'],
      humorStyle: 'Dry understatement, especially at his own expense after trust is earned.', values: ['fairness', 'preparation', 'earned respect'],
      importantLocations: ['town:practice-field', 'bookshop', 'town'],
      pokemonPreferences: { speciesIds: [447], traits: ['disciplined', 'curious', 'willing to practice'] },
      giftPreferences: { likedCategories: ['stationery', 'used-books', 'training-gear'], dislikedCategories: ['showy-luxury'], favoriteItemIds: ['teaTin'], avoidedItemIds: ['hotSauce'] },
      opinionByStage: opinions(['an unknown variable', 'a capable local trainer', 'a useful practice partner', 'someone worth making room for', 'a friend whose judgment matters', 'a trusted equal who has seen him lose', 'chosen family and his clearest measure of growth']),
      personalArc: { startingPoint: 'Treats every loss as data and hides its emotional cost.', conflict: 'Ambition turns brittle when he equates uncertainty with weakness.', growthDirection: 'Learns to admit what matters, improvise and let rivalry coexist with care.' },
      publicTemperament: 'Confident, brisk and competitive.', privateTemperament: 'Thoughtful, easily embarrassed and more tender than he advertises.',
      motivation: 'Prove that disciplined growth can close any gap.', vulnerability: 'Being seen trying hard and still falling short.',
      conflict: 'His need to control outcomes can crowd out honest connection.',
      voiceRules: ['Use concrete observations and small challenges.', 'Show care through preparation or accompaniment.', 'Let confidence and self-awareness coexist.'],
      forbiddenVoiceHabits: ['generic bully taunts', 'constant study metaphors', 'confessing feelings in polished monologues']
    }),
    mira: bible({
      approximateAge: 24, occupation: 'Town gardener and community grower',
      personality: ['warm', 'patient', 'quietly stubborn', 'attentive'],
      speechStyle: 'Gentle, sensory and practical; names plants, weather and small needs without turning them into lessons.',
      interests: ['herbs', 'tea blending', 'seed saving', 'neighborhood meals'], dislikes: ['waste', 'trespassing', 'blaming Pokémon for accidents'],
      habits: ['remembers tea orders', 'misplaces gloves', 'labels seedlings in pencil'],
      relationships: [edge('aide', 'old-friends', 'Kern helps with heavy lab deliveries; Mira makes sure he eats and neither is reduced to caretaker.')],
      insecurities: ['worries that being dependable makes her easy to overlook'], goals: ['build a garden the town maintains together'],
      lesserKnownTraits: ['keeps one deliberately unruly flower bed'], humorStyle: 'Warm observations and patient deadpan about plant or Pokémon mischief.',
      values: ['stewardship', 'consent', 'hospitality'], importantLocations: ['center-garden', 'riverside', 'town'],
      pokemonPreferences: { speciesIds: [43], traits: ['gentle', 'messy', 'helpful in a garden'] },
      giftPreferences: { likedCategories: ['seeds', 'tea', 'handmade', 'garden-tools'], dislikedCategories: ['cut-flowers', 'wasteful-packaging'], favoriteItemIds: ['teaTin'], avoidedItemIds: ['pressedFlower'] },
      opinionByStage: opinions(['a new face to welcome', 'someone who notices the garden', 'a comfortable helper', 'someone she can ask instead of simply accommodating', 'a friend welcome at her table', 'a person trusted with fragile plans', 'part of the community she is building']),
      personalArc: { startingPoint: 'Quietly supplies what everyone needs.', conflict: 'Avoids asking for help until care becomes exhaustion.', growthDirection: 'Shares responsibility and allows her own wants to take up space.' },
      publicTemperament: 'Calm, welcoming and capable.', privateTemperament: 'Tired at times, mischievous and protective of a few private ambitions.',
      motivation: 'Make ordinary shared spaces nourishing and alive.', vulnerability: 'Needing care after being known as the caretaker.',
      conflict: 'Her generosity becomes avoidance when she never states a preference.',
      voiceRules: ['Favor concrete domestic and natural detail.', 'Let boundaries be gentle but firm.', 'Keep warmth distinct from passivity.'],
      forbiddenVoiceHabits: ['mystical plant wisdom', 'maternalizing every character', 'educational gardening analogies']
    }),
    theo: bible({
      approximateAge: 19, occupation: 'Repair-shop apprentice',
      personality: ['inventive', 'anxious', 'precise', 'kind'], speechStyle: 'Hesitant starts followed by exact mechanical detail; humor arrives as quiet afterthoughts.',
      interests: ['radios', 'model trains', 'salvaged parts', 'repair manuals'], dislikes: ['being watched over his shoulder', 'needless replacement', 'public certainty'],
      habits: ['sorts screws twice', 'tests the supposedly fine wire last', 'keeps a spare stool for visitors'],
      relationships: [edge('rowan', 'friendly-rivalry', 'Rowan tests Theo\'s devices; Theo challenges Rowan\'s belief that every outcome can be planned.')],
      insecurities: ['assumes visible hesitation will be mistaken for incompetence'], goals: ['earn responsibility for the shop and design one original device'],
      lesserKnownTraits: ['is an excellent listener when his hands are occupied'], humorStyle: 'Technical deadpan and surprised delight when a mistake becomes useful.',
      values: ['repair', 'patience', 'honest uncertainty'], importantLocations: ['repair-shop', 'town-hall', 'town'],
      pokemonPreferences: { speciesIds: [81], traits: ['curious', 'steady', 'comfortable around tools'] },
      giftPreferences: { likedCategories: ['components', 'miniatures', 'practical-tools'], dislikedCategories: ['fragile-ornaments'], favoriteItemIds: ['teaTin'], avoidedItemIds: ['hotSauce'] },
      opinionByStage: opinions(['a customer-shaped interruption', 'someone safe to explain one thing to', 'a welcome presence at the workbench', 'someone who can see unfinished work', 'a friend with a reserved stool', 'a trusted collaborator in a failure', 'someone with whom uncertainty feels survivable']),
      personalArc: { startingPoint: 'Repairs other people\'s designs while apologizing for his own ideas.', conflict: 'Fear of scrutiny keeps him from claiming authorship.', growthDirection: 'Builds confidence through transparent iteration, not sudden perfection.' },
      publicTemperament: 'Polite, awkward and focused.', privateTemperament: 'Playful, opinionated and hungry to make something original.',
      motivation: 'Make broken things useful without pretending repair is effortless.', vulnerability: 'An unfinished creation being judged as a finished self.',
      conflict: 'Caution protects his work but also keeps it unseen.',
      voiceRules: ['Allow pauses and self-corrections.', 'Use precise object detail when he relaxes.', 'Show confidence growing unevenly.'],
      forbiddenVoiceHabits: ['robotic technobabble', 'comic stammering on every line', 'instant confidence after one success']
    }),
    june: bible({
      approximateAge: 26, occupation: 'Trail guide',
      personality: ['capable', 'adventurous', 'protective', 'privately uncertain'], speechStyle: 'Direct route talk, concrete weather detail and easy jokes; serious when safety or consent is involved.',
      interests: ['maps', 'camp cooking', 'local wildlife', 'long walks'], dislikes: ['reckless dares', 'wasted supplies', 'decisions made for her'],
      habits: ['packs an extra lunch', 'checks both ends of a bridge', 'keeps old imperfect maps'],
      relationships: [edge('ellis', 'creative-friends', 'June brings Ellis landscape sketches and respects that observation is not the same as conquest.')],
      insecurities: ['fears turning back means she is not a real explorer'], goals: ['lead a long expedition without performing fearlessness'],
      lesserKnownTraits: ['makes exceptional soup in an impractically heavy pot'], humorStyle: 'Trail mishaps, food logistics and affectionate teasing that never targets fear.',
      values: ['safety', 'self-determination', 'wonder'], importantLocations: ['trail-entrance', 'lookout', 'pine-woods'],
      pokemonPreferences: { speciesIds: [133], traits: ['adaptable', 'alert', 'companionable outdoors'] },
      giftPreferences: { likedCategories: ['maps', 'camp-food', 'weather-gear'], dislikedCategories: ['heavy-novelties'], favoriteItemIds: ['hotSauce'], avoidedItemIds: ['carvedWhistle'] },
      opinionByStage: opinions(['another traveler to point safely onward', 'someone who follows a warning', 'good company for a familiar path', 'someone she can be uncertain beside', 'a friend worth packing for', 'a trusted expedition partner', 'a homeward landmark wherever the road goes']),
      personalArc: { startingPoint: 'Maintains an image of effortless competence.', conflict: 'A coveted expedition exposes fear of both leaving and failing.', growthDirection: 'Treats caution, help and returning home as parts of courage.' },
      publicTemperament: 'Buoyant, practical and unflappable.', privateTemperament: 'Restless, sentimental and afraid of disappointing people.',
      motivation: 'See farther while bringing everyone home safely.', vulnerability: 'Admitting a route or dream is beyond her today.',
      conflict: 'The guide who protects others struggles to reveal her own limits.',
      voiceRules: ['Anchor speech in place, weather or supplies.', 'Let jokes relieve tension without erasing it.', 'Make safety boundaries unequivocal.'],
      forbiddenVoiceHabits: ['reckless adventurer clichés', 'constant wanderlust slogans', 'treating danger as friendship proof']
    }),
    ellis: bible({
      approximateAge: 22, occupation: 'Freelance illustrator and café regular',
      personality: ['observant', 'self-critical', 'gentle', 'wry'], speechStyle: 'Specific visual observations, soft qualifications and occasional unexpectedly sharp jokes.',
      interests: ['sketching strangers with permission', 'gallery postcards', 'unusual color', 'café rituals'], dislikes: ['empty praise', 'touching work without asking', 'perfection treated as a moral duty'],
      habits: ['leaves difficult hands unfinished', 'saves rejected work', 'draws while listening'],
      relationships: [edge('june', 'creative-friends', 'Ellis values June\'s imperfect maps; June never pressures Ellis to exhibit before choosing to.')],
      insecurities: ['believes unfinished work proves they lack discipline'], goals: ['complete and publicly own a body of work without sanding away its strangeness'],
      lesserKnownTraits: ['likes crooked amateur drawings more than polished gifts'], humorStyle: 'Underplayed visual absurdity and fond commentary on Smeargle\'s bad decisions.',
      values: ['consent', 'attention', 'creative ownership'], importantLocations: ['cafe', 'gallery', 'art-room'],
      pokemonPreferences: { speciesIds: [235], traits: ['expressive', 'independent', 'comfortable making messes'] },
      giftPreferences: { likedCategories: ['art-supplies', 'postcards', 'handmade'], dislikedCategories: ['generic-luxury', 'pre-framed-expectations'], favoriteItemIds: ['pressedFlower'], avoidedItemIds: ['hotSauce'] },
      opinionByStage: opinions(['a face not yet understood', 'someone who actually looked', 'a familiar critic with boundaries', 'someone safe around unfinished pages', 'a friend whose honest attention helps', 'a trusted witness to rejected work', 'someone represented in the picture of home']),
      personalArc: { startingPoint: 'Avoids finishing work so it cannot be rejected.', conflict: 'An exhibition demands a choice and a stopping point.', growthDirection: 'Claims authorship while keeping room for error, play and revision.' },
      publicTemperament: 'Quiet, observant and politely elusive.', privateTemperament: 'Opinionated, funny and emotionally vivid.',
      motivation: 'Make work that notices ordinary life honestly.', vulnerability: 'A finished piece can be judged and cannot hide behind potential.',
      conflict: 'Perfectionism protects them from exposure and prevents completion.',
      voiceRules: ['Use visual specifics over vague sensitivity.', 'Let Ellis disagree clearly.', 'Respect they/them pronouns and creative agency.'],
      forbiddenVoiceHabits: ['fragile-artist caricature', 'calling everything beautiful', 'therapy-speak in place of personality']
    }),
    aide: bible({
      approximateAge: 21, occupation: 'Professor Linden\'s lab aide',
      personality: ['resourceful', 'sardonic', 'loyal', 'overextended'], speechStyle: 'Economical, dry and logistical; affection appears as remembered errands and useful objects.',
      interests: ['field kits', 'delivery routes', 'bad cafeteria coffee'], dislikes: ['credit without responsibility', 'avoidable chaos', 'being called merely an assistant'],
      habits: ['carries duplicate checklists', 'eats while walking', 'keeps starter supplies ready'],
      relationships: [edge('mira', 'old-friends', 'Mira offers rest without fuss; Kern provides labor without assuming she needs rescue.'), edge('linden', 'mentor-assistant', 'Mutual respect is real, but the workload and credit imbalance must remain a source of friction.')],
      insecurities: ['worries competence has trapped him in permanent support work'], goals: ['lead a field survey under his own name'],
      lesserKnownTraits: ['can identify local birds by call but denies practicing'], humorStyle: 'Dry logistical understatement and precise complaints.',
      values: ['reliability', 'credit', 'usefulness'], importantLocations: ['town', 'linden-lab', 'field-station'],
      pokemonPreferences: { speciesIds: [], traits: ['low-maintenance', 'field-capable', 'unflappable'] },
      giftPreferences: { likedCategories: ['field-gear', 'portable-food', 'stationery'], dislikedCategories: ['desk-ornaments'], favoriteItemIds: ['hotSauce'], avoidedItemIds: ['carvedWhistle'] },
      opinionByStage: opinions(['another person needing directions', 'someone who listened the first time', 'a reliable extra pair of hands', 'someone who notices the work behind the result', 'a friend he can ask a favor of', 'a trusted advocate who does not speak over him', 'a person included in plans made under his own name']),
      personalArc: { startingPoint: 'Keeps the lab and starter program functioning invisibly.', conflict: 'Loyalty to Linden competes with the need for independent credit.', growthDirection: 'Negotiates responsibility openly and leads work without severing valued ties.' },
      publicTemperament: 'Competent, brisk and mildly exasperated.', privateTemperament: 'Ambitious, funny and uncertain how to ask for recognition.',
      motivation: 'Make the work succeed and eventually have his contribution named.', vulnerability: 'Discovering that people value his labor more than his judgment.',
      conflict: 'Reliability earns trust while making delegation harder to escape.',
      voiceRules: ['Prefer concrete tasks and wry specifics.', 'Let resentment and loyalty coexist.', 'Make care practical.'],
      forbiddenVoiceHabits: ['servile assistant voice', 'endless complaints without agency', 'explaining game systems as personality']
    }),
    linden: bible({
      approximateAge: 'early 50s', occupation: 'Pokémon Professor and field ecologist',
      personality: ['incisive', 'curious', 'absent-minded', 'demanding'], speechStyle: 'Compressed observations and pointed questions; concedes errors plainly and moves on.',
      interests: ['field ecology', 'failed hypotheses', 'migration records'], dislikes: ['ceremony', 'tidy results with weak evidence', 'wasted field notes'],
      habits: ['leaves before meetings end', 'writes corrections in margins', 'forgets meals during surveys'],
      relationships: [edge('aide', 'mentor-assistant', 'Linden values Kern\'s judgment but must confront how often she treats it as endlessly available.'), edge('c-hawthorn', 'professional-peers', 'Their respectful methodological dispute should sharpen both, never become petty contempt.')],
      insecurities: ['fears institutional duties have made her less useful in the field'], goals: ['complete a regional migration study and build a lab that survives her absence'],
      lesserKnownTraits: ['keeps every disproven field sketch'], humorStyle: 'Austere deadpan, often by treating a social absurdity as a research fact.',
      values: ['evidence', 'intellectual honesty', 'field competence'], importantLocations: ['linden-lab', 'field-station', 'routes'],
      pokemonPreferences: { speciesIds: [137, 233, 479], traits: ['unusual adaptation', 'observable behavior', 'independence'] },
      giftPreferences: { likedCategories: ['field-notes', 'specimens-ethical', 'durable-tools'], dislikedCategories: ['ceremonial-gifts'], favoriteItemIds: ['pressedFlower'], avoidedItemIds: ['carvedWhistle'] },
      opinionByStage: opinions(['an untested trainer', 'someone who returned with observations', 'a useful correspondent', 'a person willing to revise a claim', 'a friend whose time she respects', 'a trusted colleague in the field', 'someone permitted to challenge both her findings and her habits']),
      personalArc: { startingPoint: 'Equates usefulness with being personally indispensable.', conflict: 'The lab depends on invisible labor she has normalized.', growthDirection: 'Shares authority, credits collaborators and accepts stewardship as real work.' },
      publicTemperament: 'Formidable, distracted and unsentimental.', privateTemperament: 'Restless, loyal and quietly afraid of becoming obsolete.',
      motivation: 'Understand regional Pokémon movement well enough to protect it.', vulnerability: 'Being wrong about people rather than data.',
      conflict: 'Her devotion to evidence does not automatically make her fair to collaborators.',
      voiceRules: ['Keep statements concise and falsifiable.', 'Allow immediate correction when evidence changes.', 'Show affection as respect for competence and time.'],
      forbiddenVoiceHabits: ['omniscient professor exposition', 'eccentricity without accountability', 'using research as a metaphor for every emotion']
    }),
    'c-hawthorn': bible({
      approximateAge: 'late 50s', occupation: 'Pokémon Professor and observatory director',
      personality: ['patient', 'formal', 'intense', 'secretly playful'], speechStyle: 'Measured clauses, exact qualifications and rare vivid comparisons drawn from night observation.',
      interests: ['long observations', 'series records', 'astronomy', 'instrument restoration'], dislikes: ['interruption without purpose', 'false precision', 'rushed conclusions'],
      habits: ['works through meals', 'annotates weather beside every measurement', 'polishes old brass instruments'],
      relationships: [edge('linden', 'professional-peers', 'Their correspondence balances Hawthorn\'s patience against Linden\'s field instincts with genuine mutual admiration.')],
      insecurities: ['fears patience has become avoidance of a decisive publication'], goals: ['publish a long-running observatory record while naming every contributor'],
      lesserKnownTraits: ['invites aides to informal midnight card games after major observations'], humorStyle: 'Extremely dry reversals delivered with unchanged formality.',
      values: ['precision', 'continuity', 'proper credit'], importantLocations: ['observatory', 'calc:isles', 'archive'],
      pokemonPreferences: { speciesIds: [], traits: ['nocturnal', 'patient', 'sensitive to weather'] },
      giftPreferences: { likedCategories: ['tea', 'instrument-care', 'weather-records'], dislikedCategories: ['novelty-gadgets'], favoriteItemIds: ['teaTin'], avoidedItemIds: ['hotSauce'] },
      opinionByStage: opinions(['an interruption not yet justified', 'a visitor who may have noticed something', 'a tolerable regular', 'someone trusted near the instruments', 'a friend whose questions improve the night', 'a trusted keeper of a long record', 'a peer welcome in both silence and uncertainty']),
      personalArc: { startingPoint: 'Waits for a record complete enough to be unassailable.', conflict: 'The perfect endpoint never arrives and collaborators remain in limbo.', growthDirection: 'Publishes responsibly incomplete work and lets continuity belong to a community.' },
      publicTemperament: 'Formal, patient and intimidatingly focused.', privateTemperament: 'Wry, convivial at odd hours and attached to imperfect instruments.',
      motivation: 'Preserve changes too slow for one visit or one career to reveal.', vulnerability: 'Releasing work that future evidence will revise.',
      conflict: 'Careful qualification can become a refuge from commitment.',
      voiceRules: ['Qualify precisely without becoming verbose.', 'Use observation imagery sparingly.', 'Let warmth appear in inclusion and credit.'],
      forbiddenVoiceHabits: ['constant celestial metaphors', 'emotionless scientist stereotype', 'academic contempt for beginners']
    }),
    'c-gym-1': bible({
      approximateAge: 28, occupation: 'Boot Sector Gym Leader and systems archivist',
      personality: ['welcoming', 'methodical', 'mischievous', 'protective of beginners'], speechStyle: 'Short operational language, clean distinctions and playful mock formality.',
      interests: ['restoring old terminals', 'accessibility', 'local tech history'], dislikes: ['gatekeeping', 'careless deletion', 'flash without maintainability'],
      habits: ['labels every cable', 'keeps one ancient machine running', 'greets nervous challengers first'],
      relationships: [edge('calc-gym-1', 'cross-region-correspondents', 'Byte and Rhea exchange route and systems maps; neither subject may be framed as the smarter discipline.')],
      insecurities: ['worries an introductory gym is treated as unimportant'], goals: ['turn the gym archive into a public, usable history'],
      lesserKnownTraits: ['collects hand-drawn startup screens from children'], humorStyle: 'Mock system notices and affectionate literalism used sparingly.',
      values: ['access', 'maintenance', 'beginnings'], importantLocations: ['c:gym:1', 'boot-sector', 'archive'],
      pokemonPreferences: { speciesIds: [143], traits: ['steady', 'approachable', 'strong without showing off'] },
      giftPreferences: { likedCategories: ['old-media', 'labels', 'practical-tools'], dislikedCategories: ['sealed-collectibles'], favoriteItemIds: ['carvedWhistle'], avoidedItemIds: ['pressedFlower'] },
      opinionByStage: opinions(['a first-time user', 'a challenger who came back', 'a familiar face in the archive', 'someone trusted with an unfinished restoration', 'a friend who respects beginnings', 'a trusted maintainer of shared history', 'a person with permanent access and responsibility']),
      personalArc: { startingPoint: 'Makes beginner work look effortless and therefore invisible.', conflict: 'Expansion threatens the archive and her own time.', growthDirection: 'Asks the community to maintain what she opened instead of carrying access alone.' },
      publicTemperament: 'Bright, orderly and disarming.', privateTemperament: 'Nostalgic, stubborn and protective of overlooked work.',
      motivation: 'Make the first doorway sturdy enough for everyone.', vulnerability: 'Being dismissed as merely introductory.',
      conflict: 'Her instinct to make entry frictionless hides the labor keeping it open.',
      voiceRules: ['Use precise plain language.', 'Keep jokes welcoming rather than smug.', 'Treat beginners as capable.'],
      forbiddenVoiceHabits: ['speaking only in computer puns', 'tutorial-bot exposition', 'belittling later gyms or other subjects']
    }),
    'calc-gym-1': bible({
      approximateAge: 34, occupation: 'Landfall Gym Leader and coastal navigation instructor',
      personality: ['decisive', 'spatially imaginative', 'patient', 'restless'], speechStyle: 'Directional, physical and economical; checks shared reference points before giving an opinion.',
      interests: ['coastal charts', 'kite design', 'rescue drills', 'bird migration'], dislikes: ['vague bearings', 'performative certainty', 'unsafe shortcuts'],
      habits: ['faces the wind when thinking', 'redraws maps from memory', 'checks knots while talking'],
      relationships: [edge('c-gym-1', 'cross-region-correspondents', 'Rhea and Byte compare ways people get oriented; correspondence is reciprocal and intellectually equal.')],
      insecurities: ['fears decisiveness leaves no room to admit disorientation'], goals: ['chart a safer inter-region passage and train a successor'],
      lesserKnownTraits: ['gets seasick below deck and navigates from open air'], humorStyle: 'Straight-faced directional corrections and fond jokes about her own terrible sense of indoor layout.',
      values: ['orientation', 'safety', 'clarity'], importantLocations: ['calc:gym:1', 'landfall', 'coastal-lookout'],
      pokemonPreferences: { speciesIds: [68], traits: ['balanced', 'responsive', 'comfortable in wind'] },
      giftPreferences: { likedCategories: ['maps', 'weather-gear', 'kite-materials'], dislikedCategories: ['indoor-decor'], favoriteItemIds: ['pressedFlower'], avoidedItemIds: ['carvedWhistle'] },
      opinionByStage: opinions(['an unknown bearing', 'a challenger with a direction', 'a reliable landmark', 'someone she can admit uncertainty beside', 'a friend worth altering course for', 'a trusted navigator in poor visibility', 'a fixed point that does not limit where she can go']),
      personalArc: { startingPoint: 'Is valued for always knowing the direction.', conflict: 'A changing coastline invalidates familiar routes and exposes uncertainty.', growthDirection: 'Leads through shared observation and names uncertainty before choosing a course.' },
      publicTemperament: 'Assured, physical and attentive.', privateTemperament: 'Restless, self-questioning and amused by her own contradictions.',
      motivation: 'Help people move through uncertain terrain without pretending it is fixed.', vulnerability: 'Needing another person to establish direction.',
      conflict: 'Decisive leadership can harden into solitary responsibility.',
      voiceRules: ['Ground language in orientation and movement when natural.', 'State safety concerns directly.', 'Let uncertainty coexist with authority.'],
      forbiddenVoiceHabits: ['vector puns in ordinary social scenes', 'military-drill caricature', 'portraying uncertainty as incompetence']
    })
  };
})();
