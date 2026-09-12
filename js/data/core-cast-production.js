/* Phase 4 production plans. This file is author-facing structure, not dialogue.
   The approved Tier 1 roster comes only from CAST_REGISTRY; no cast membership
   or persistent identity is created here. */
(function () {
  var REQUIRED_REACTIONS = ['firstMeeting', 'friendshipStages', 'postEvent', 'preGym',
    'postGym', 'location', 'storyChapter', 'recentMood', 'rumor', 'itemDiscovery',
    'pokemonObservation', 'otherNpc', 'rare', 'repeatInteraction'];
  var DIALOGUE_CATEGORIES = Object.freeze({
    firstMeeting: { target: 8, counts: 'A complete player-facing response available only before or during the first meeting.' },
    friendshipStages: { target: 70, counts: 'A stage-bound response whose meaning or tone changes with the relationship.' },
    postEvent: { target: 40, counts: 'A later acknowledgment requiring a stable completed event ID.' },
    gymStory: { target: 28, counts: 'A pre/post-gym or chapter-state response, not a generic lesson line.' },
    location: { target: 35, counts: 'A response grounded in a named place and valid there.' },
    recentMoodRumor: { target: 22, counts: 'A response to a recent outcome, mood, or world rumor flag.' },
    itemPokemon: { target: 20, counts: 'A response requiring an owned/discovered item or observed Pokémon.' },
    relationships: { target: 12, counts: 'A response that refers to another stable cast ID consistently.' },
    rare: { target: 5, counts: 'A narrowly gated line that rewards an unusual state combination.' },
    repeatInteraction: { target: 10, counts: 'A repeat-aware line that remains natural after the first conversation.' }
  });

  var plans = {
    rowan: {
      want: 'Become adaptable enough that preparation supports him instead of defining him.',
      fear: 'Being seen trying his hardest and still falling short.',
      contradiction: 'He asks for honest competition but hides the losses that matter most.',
      voiceBoundaries: ['Fast, concrete observations', 'Care shown through preparation', 'Dry self-aware humor', 'No bully posturing or polished confessions'],
      relationshipObligations: ['Theo must challenge Rowan without becoming a sidekick', 'Riolu has agency and fatigue', 'The player may decline closeness without punishment'],
      fourEventArc: ['A loaned pencil opens a guarded notebook', 'A failed routine forces rest and improvisation', 'An honest letter makes family expectations discussable', 'A rematch turns rivalry into a chosen continuing ritual'],
      schedule: ['Morning—practice field', 'Afternoon—bookshop or gym steps', 'Evening—hill above town'],
      reactions: REQUIRED_REACTIONS.slice(), verticalSliceScore: 10
    },
    mira: {
      want: 'Build a garden the town genuinely maintains together.', fear: 'Being valued only for what she quietly supplies.',
      contradiction: 'She sets excellent boundaries for the garden and poor ones for her own energy.',
      voiceBoundaries: ['Sensory and practical', 'Warm without maternalizing', 'Gentle boundaries stay firm', 'No mystical plant aphorisms'],
      relationshipObligations: ['Kern and Mira exchange care in both directions', 'Oddish mischief never becomes blame', 'Neighbors must assume real responsibility'],
      fourEventArc: ['Share one planted responsibility', 'A crossed watering plan exposes over-helping', 'A shortage makes her state limits publicly', 'The greenhouse opens under shared ownership'],
      schedule: ['Morning—Center garden', 'Afternoon—market or riverside', 'Rain—potting shed'], reactions: REQUIRED_REACTIONS.slice(), verticalSliceScore: 8
    },
    theo: {
      want: 'Put his own name on an original, useful design.', fear: 'An unfinished machine being judged as a finished self.',
      contradiction: 'He values honest uncertainty but apologizes whenever he displays it.',
      voiceBoundaries: ['Hesitant starts, precise finishes', 'Technical detail only when relevant', 'Quiet afterthought humor', 'No comic stammer loop'],
      relationshipObligations: ['Rowan tests rather than validates him', 'Customers credit his labor', 'The shop owner permits accountable mistakes'],
      fourEventArc: ['Repair together without taking over', 'Sign work he completed', 'Disclose a costly mistake', 'Lead an open workshop around an unknown problem'],
      schedule: ['Morning—repair shop', 'Lunch—bakery steps', 'Late afternoon—town hall or hill path'], reactions: REQUIRED_REACTIONS.slice(), verticalSliceScore: 8
    },
    june: {
      want: 'Lead farther expeditions while treating caution as competence.', fear: 'That turning back proves she is not a real explorer.',
      contradiction: 'She makes safety easy for everyone except herself.',
      voiceBoundaries: ['Direct route and weather detail', 'Jokes never target fear', 'Consent and safety are explicit', 'No reckless-adventurer slogans'],
      relationshipObligations: ['Ellis observes landscapes without pressure to conquer them', 'Eevee can refuse a route', 'The player cannot earn trust through recklessness'],
      fourEventArc: ['Accept ordinary trail company', 'Name uncertainty on a damaged route', 'Choose to turn back from a coveted crossing', 'Plan an expedition with shared authority'],
      schedule: ['Dawn—trail entrance', 'Day—pine woods or lookout', 'Storms—market shelter'], reactions: REQUIRED_REACTIONS.slice(), verticalSliceScore: 8
    },
    ellis: {
      want: 'Finish and publicly own strange, honest work.', fear: 'That a finished piece will prove the promise was imaginary.',
      contradiction: 'They defend creative consent clearly but evade their own decisions.',
      voiceBoundaries: ['Specific visual observation', 'Soft delivery may contain sharp disagreement', 'They/them pronouns', 'No fragile-artist caricature'],
      relationshipObligations: ['June respects the choice not to exhibit', 'Smeargle creates rather than serving as a prop', 'Praise must be specific or unwelcome'],
      fourEventArc: ['Permit the player near unfinished pages', 'Choose what not to revise', 'Risk one public display', 'Keep an imperfect collaborative page'],
      schedule: ['Morning—café window', 'Afternoon—art room', 'Event days—gallery'], reactions: REQUIRED_REACTIONS.slice(), verticalSliceScore: 8
    },
    aide: {
      want: 'Lead a field survey under his own name.', fear: 'That people value his labor but not his judgment.',
      contradiction: 'His competence earns authority and traps him in invisible support work.',
      voiceBoundaries: ['Economical logistics', 'Affection through remembered tasks', 'Resentment and loyalty coexist', 'No tutorial-bot exposition'],
      relationshipObligations: ['Mira does not simply rescue him', 'Linden must give credit and relinquish control', 'The player supports without speaking for him'],
      fourEventArc: ['Notice the labor behind a routine delivery', 'Let a checklist fail visibly', 'Negotiate survey ownership with Linden', 'Lead the field day and credit the team'],
      schedule: ['Morning—Linden Lab', 'Afternoon—delivery route', 'Survey days—field station'], reactions: REQUIRED_REACTIONS.slice(), verticalSliceScore: 7
    },
    linden: {
      want: 'Complete a migration study and build a lab that functions without her.', fear: 'That administration has displaced her field usefulness.',
      contradiction: 'She demands revision from evidence but is slow to revise her own working relationships.',
      voiceBoundaries: ['Compressed observations', 'Pointed questions', 'Plain concessions', 'No emotionless-genius stereotype'],
      relationshipObligations: ['Kern receives named judgment and credit', 'Hawthorn remains a respected peer', 'Students may challenge a conclusion'],
      fourEventArc: ['Revisit a disproven field sketch', 'Confront an uncredited contribution', 'Delegate a consequential survey decision', 'Leave the lab and return to find it thriving'],
      schedule: ['Early—field station', 'Day—Linden Lab', 'Migration windows—regional routes'], reactions: REQUIRED_REACTIONS.slice(), verticalSliceScore: 6
    },
    'c-hawthorn': {
      want: 'Release a responsible long-term record before certainty becomes impossible.', fear: 'Future evidence making a published conclusion look careless.',
      contradiction: 'He protects continuity by delaying the act that would let others continue it.',
      voiceBoundaries: ['Formal and precisely qualified', 'Warmth through inclusion and credit', 'Very dry reversals', 'No constant celestial metaphors'],
      relationshipObligations: ['Linden disagreement stays methodological', 'Aides become credited collaborators', 'Beginners are not treated with contempt'],
      fourEventArc: ['Earn access to an imperfect instrument', 'Compare a disputed record with Linden', 'Choose a bounded claim for publication', 'Open the archive to successor observations'],
      schedule: ['Dusk—observatory', 'Night—instrument deck', 'Archive days—regional archive'], reactions: REQUIRED_REACTIONS.slice(), verticalSliceScore: 5
    },
    'c-gym-1': {
      want: 'Make the systems archive public and maintainable.', fear: 'That introductory work will be dismissed as trivial.',
      contradiction: 'She removes every barrier while hiding the labor required to keep access open.',
      voiceBoundaries: ['Short operational language', 'Welcoming mock formality', 'Beginners remain capable', 'Computer jokes stay occasional'],
      relationshipObligations: ['Rhea is an equal correspondent', 'Archive volunteers receive ownership', 'New challengers are welcomed after losses'],
      fourEventArc: ['Restore one old terminal together', 'Expose the maintenance ledger', 'Ask for help during archive expansion', 'Grant shared access with shared responsibility'],
      schedule: ['Open hours—Boot Sector Gym', 'Quiet hours—archive', 'Community days—town hall'], reactions: REQUIRED_REACTIONS.slice(), verticalSliceScore: 6
    },
    'calc-gym-1': {
      want: 'Chart a safer inter-region passage and train a successor.', fear: 'That admitting disorientation will dissolve others’ trust.',
      contradiction: 'She teaches shared bearings while carrying final direction alone.',
      voiceBoundaries: ['Directional and physical', 'Checks shared reference points', 'Safety stated plainly', 'No vector-pun personality'],
      relationshipObligations: ['Byte’s systems maps have equal value', 'Rescue trainees can correct her', 'Seasickness is not played as incompetence'],
      fourEventArc: ['Establish a shared landmark', 'Discover the coast has moved', 'Ask another navigator for a bearing', 'Publish a living route with named successors'],
      schedule: ['Morning—Landfall Gym', 'Afternoon—coastal lookout', 'High wind—harbor office'], reactions: REQUIRED_REACTIONS.slice(), verticalSliceScore: 6
    }
  };

  var ROWAN_DECISIONS = {
    'rowan-event-the-spare-pencil': { decision: 'keep', canonicalId: 'rowan-event-the-spare-pencil' },
    'rowan-event-the-erased-score': { decision: 'consolidate', canonicalId: 'rowan-event-the-spare-pencil' },
    'rowan-event-a-bad-afternoon': { decision: 'keep', canonicalId: 'rowan-event-a-bad-afternoon' },
    'rowan-event-the-letter-home': { decision: 'keep', canonicalId: 'rowan-event-the-letter-home' },
    'rowan-event-your-corner': { decision: 'consolidate', canonicalId: 'rowan-event-the-letter-home' },
    'rowan-event-the-empty-line': { decision: 'consolidate', canonicalId: 'rowan-event-same-time-tomorrow' },
    'rowan-event-same-time-tomorrow': { decision: 'keep', canonicalId: 'rowan-event-same-time-tomorrow' }
  };

  var MIRA_DECISIONS = {
    'mira-event-one-empty-pot': { decision: 'keep', canonicalId: 'mira-event-one-empty-pot' },
    'mira-event-too-much-water': { decision: 'keep', canonicalId: 'mira-event-too-much-water' },
    'mira-event-a-table-for-six': { decision: 'keep', canonicalId: 'mira-event-a-table-for-six' },
    'mira-event-winter-plans': { decision: 'consolidate', canonicalId: 'mira-event-a-key-on-a-string' },
    'mira-event-the-seed-exchange': { decision: 'consolidate', canonicalId: 'mira-event-a-table-for-six' },
    'mira-event-the-first-pane': { decision: 'consolidate', canonicalId: 'mira-event-a-key-on-a-string' },
    'mira-event-a-key-on-a-string': { decision: 'keep', canonicalId: 'mira-event-a-key-on-a-string' }
  };

  var THEO_DECISIONS = {
    'theo-event-the-stuck-drawer': { decision: 'keep', canonicalId: 'theo-event-the-stuck-drawer' },
    'theo-event-the-quiet-bench': { decision: 'consolidate', canonicalId: 'theo-event-the-stuck-drawer' },
    'theo-event-an-unsigned-ticket': { decision: 'keep', canonicalId: 'theo-event-an-unsigned-ticket' },
    'theo-event-the-wrong-part': { decision: 'keep', canonicalId: 'theo-event-the-wrong-part' },
    'theo-event-a-little-signal': { decision: 'consolidate', canonicalId: 'theo-event-open-workshop' },
    'theo-event-open-workshop': { decision: 'keep', canonicalId: 'theo-event-open-workshop' },
    'theo-event-your-frequency': { decision: 'consolidate', canonicalId: 'theo-event-open-workshop' }
  };

  var JUNE_DECISIONS = {
    'june-event-a-spare-lunch': { decision: 'keep', canonicalId: 'june-event-a-spare-lunch' },
    'june-event-the-washed-out-path': { decision: 'keep', canonicalId: 'june-event-the-washed-out-path' },
    'june-event-a-map-full-of-blanks': { decision: 'keep', canonicalId: 'june-event-a-map-full-of-blanks' },
    'june-event-the-invitation': { decision: 'consolidate', canonicalId: 'june-event-a-place-on-the-map' },
    'june-event-packing-light': { decision: 'consolidate', canonicalId: 'june-event-a-spare-lunch' },
    'june-event-a-letter-from-the-road': { decision: 'consolidate', canonicalId: 'june-event-a-map-full-of-blanks' },
    'june-event-a-place-on-the-map': { decision: 'keep', canonicalId: 'june-event-a-place-on-the-map' }
  };

  var ELLIS_DECISIONS = {
    'ellis-event-an-unfinished-sketch': { decision: 'keep', canonicalId: 'ellis-event-an-unfinished-sketch' },
    'ellis-event-the-wrong-color': { decision: 'keep', canonicalId: 'ellis-event-the-wrong-color' },
    'ellis-event-someone-else-s-wall': { decision: 'consolidate', canonicalId: 'ellis-event-the-wrong-color' },
    'ellis-event-the-entry-form': { decision: 'consolidate', canonicalId: 'ellis-event-opening-night' },
    'ellis-event-opening-night': { decision: 'keep', canonicalId: 'ellis-event-opening-night' },
    'ellis-event-a-place-for-mistakes': { decision: 'consolidate', canonicalId: 'ellis-event-the-window-seat' },
    'ellis-event-the-window-seat': { decision: 'keep', canonicalId: 'ellis-event-the-window-seat' }
  };

  function inventory(entry) {
    var source = castSource(entry), scenes = [];
    if (entry.sourceKind === 'companion') scenes = (source.events || []).map(function (scene) {
      var decisions = entry.id === 'rowan' ? ROWAN_DECISIONS : entry.id === 'mira' ? MIRA_DECISIONS : entry.id === 'theo' ? THEO_DECISIONS : entry.id === 'june' ? JUNE_DECISIONS : entry.id === 'ellis' ? ELLIS_DECISIONS : null;
      var decision = decisions ? decisions[scene.id] : null;
      var extras = (((window.EVENT_BEATS || {})[entry.id] || []).find(function (g) { return g.sceneId === scene.id; }) || []);
      var choices = (scene[3] || []).map(function (choice) { return choice.id; });
      extras.forEach(function (beat) { choices = choices.concat((beat.c || []).map(function (choice) { return choice.id; })); });
      return { eventId: scene.id, beatIds: [scene.beatId].concat(extras.map(function (beat) { return beat.id; })),
        choiceIds: choices,
        decision: decision ? decision.decision : 'keep', compatibility: decision ? decision.canonicalId : scene.id };
    });
    else {
      var arcKey = (window.CLASS_STORY || {})[source.cls], arc = ((window.FOLK_EVENTS || {})[arcKey] || []);
      scenes = arc.map(function (event) {
        return { eventId: entry.id + '-' + event.id,
          beatIds: event.beats.map(function (beat) { return entry.id + '-' + beat.id; }),
          choiceIds: event.beats.reduce(function (all, beat) { return all.concat(beat.c.map(function (choice) { return entry.id + '-' + choice.id; })); }, []),
          decision: 'keep', compatibility: entry.id + '-' + event.id };
      });
    }
    return scenes;
  }

  Object.keys(plans).forEach(function (id) {
    var entry = castById(id);
    plans[id].id = id;
    plans[id].eventInventory = entry ? inventory(entry) : [];
  });

  window.CORE_CAST_DIALOGUE_CATEGORIES = DIALOGUE_CATEGORIES;
  window.CORE_CAST_REQUIRED_REACTIONS = Object.freeze(REQUIRED_REACTIONS.slice());
  window.CORE_CAST_PRODUCTION = Object.freeze(plans);
  window.PHASE4_VERTICAL_SLICE_ID = 'rowan';
  window.HEART_EVENT_COMPATIBILITY = Object.freeze({
    rowan: Object.freeze(ROWAN_DECISIONS),
    mira: Object.freeze(MIRA_DECISIONS),
    theo: Object.freeze(THEO_DECISIONS),
    june: Object.freeze(JUNE_DECISIONS),
    ellis: Object.freeze(ELLIS_DECISIONS)
  });
  window.ROWAN_ACTIVE_HEART_EVENT_IDS = Object.freeze(Object.keys(ROWAN_DECISIONS).filter(function (id) {
    return ROWAN_DECISIONS[id].decision === 'keep';
  }));
  window.MIRA_ACTIVE_HEART_EVENT_IDS = Object.freeze(Object.keys(MIRA_DECISIONS).filter(function (id) {
    return MIRA_DECISIONS[id].decision === 'keep';
  }));
  window.THEO_ACTIVE_HEART_EVENT_IDS = Object.freeze(Object.keys(THEO_DECISIONS).filter(function (id) {
    return THEO_DECISIONS[id].decision === 'keep';
  }));
  window.JUNE_ACTIVE_HEART_EVENT_IDS = Object.freeze(Object.keys(JUNE_DECISIONS).filter(function (id) {
    return JUNE_DECISIONS[id].decision === 'keep';
  }));
  window.ELLIS_ACTIVE_HEART_EVENT_IDS = Object.freeze(Object.keys(ELLIS_DECISIONS).filter(function (id) {
    return ELLIS_DECISIONS[id].decision === 'keep';
  }));
  window.CORE_CAST_ACTIVE_HEART_EVENT_IDS = Object.freeze({
    rowan: window.ROWAN_ACTIVE_HEART_EVENT_IDS,
    mira: window.MIRA_ACTIVE_HEART_EVENT_IDS,
    theo: window.THEO_ACTIVE_HEART_EVENT_IDS,
    june: window.JUNE_ACTIVE_HEART_EVENT_IDS,
    ellis: window.ELLIS_ACTIVE_HEART_EVENT_IDS
  });
})();
