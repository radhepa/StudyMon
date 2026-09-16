/* Deterministic, read-only social context for later dialogue authoring.

   Selectors never create friendship records or mutate save state. The one
   explicit writer records stable choice outcomes for authored scenes. */
(function () {
  var STAGE_RANK = { stranger: -1, acquaintance: 0, recognition: 1, comfortable: 2,
    beginning: 3, friend: 4, trusted: 5, close: 6 };
  var MOOD_PRIORITY = ['distressed', 'tense', 'hopeful', 'content', 'neutral'];
  var CONDITION_KEYS = ['subject', 'location', 'badgeBand', 'homeBadgeBand', 'stage', 'minStage', 'maxStage', 'firstMeeting',
    'completedEventIds', 'recentEventIds', 'relationshipIds', 'itemIds', 'receiptIds', 'worldFlags', 'dialogueFlags',
    'pokemonSeen', 'pokemonCaught', 'mood', 'repeatAtLeast'];

  window.SOCIAL_CONTEXT_PRIORITY = Object.freeze({
    variants: 'Highest numeric priority, then most conditions, then lexical stable ID. Fallback variants are considered only when no ordinary variant matches.',
    moods: MOOD_PRIORITY.slice(),
    badgeBands: Object.freeze({ early: [0, 2], middle: [3, 6], late: [7, Infinity] }),
    conditions: CONDITION_KEYS.slice()
  });

  function own(object, key) { return !!object && Object.prototype.hasOwnProperty.call(object, key); }
  function sortedTrueKeys(object) {
    return Object.keys(object || {}).filter(function (key) { return !!object[key]; }).sort();
  }
  function uniqueSorted(values, numeric) {
    var seen = {};
    return (values || []).filter(function (value) {
      var key = typeof value + ':' + String(value);
      if (seen[key]) return false;
      seen[key] = true;
      return true;
    }).sort(numeric ? function (a, b) { return Number(a) - Number(b); } : function (a, b) { return String(a).localeCompare(String(b)); });
  }
  function containsAll(haystack, needles) {
    return (needles || []).every(function (needle) { return haystack.indexOf(needle) >= 0; });
  }
  function matchesValue(actual, expected) {
    return Array.isArray(expected) ? expected.indexOf(actual) >= 0 : actual === expected;
  }
  function badgeCountFor(subject) {
    var bucket = S && S.progress && S.progress[subject];
    var badges = bucket && bucket.badges;
    if ((!badges || typeof badges !== 'object') && S && subject === S.subject) badges = S.badges;
    return sortedTrueKeys(badges).length;
  }
  function badgeBand(count) { return count >= 7 ? 'late' : count >= 3 ? 'middle' : 'early'; }
  function stableLocation(member, options) {
    if (options && options.location) return String(options.location);
    if (typeof TOWN_LOC !== 'undefined' && TOWN_LOC) return String(TOWN_LOC);
    return member.recurringLocations[0];
  }
  function moodFor(id, history, options) {
    if (options && MOOD_PRIORITY.indexOf(options.mood) >= 0) return options.mood;
    var flags = (S && S.worldFlags) || {};
    for (var i = 0; i < MOOD_PRIORITY.length - 1; i++) {
      if (flags['mood:' + id + ':' + MOOD_PRIORITY[i]]) return MOOD_PRIORITY[i];
    }
    if (history.length && Number(history[0].change) < 0) return 'tense';
    if (history.length && Number(history[0].change) > 0) return 'content';
    return 'neutral';
  }
  function importantPokemon(member) {
    var source = castSource(member) || {};
    var bible = member.bible || {};
    var preferred = (bible.pokemonPreferences && bible.pokemonPreferences.speciesIds) || [];
    return uniqueSorted(preferred.concat(source.partner || []).concat(source.team || []), true);
  }

  window.socialBadgeBand = badgeBand;

  window.dialogueChoiceOutcomeKey = function (choiceId, outcomeId) {
    var valid = /^[a-z0-9][a-z0-9:_-]*$/;
    if (!valid.test(String(choiceId)) || !valid.test(String(outcomeId))) return null;
    return String(choiceId) + '::' + String(outcomeId);
  };

  window.hasDialogueChoiceOutcome = function (choiceId, outcomeId) {
    var key = dialogueChoiceOutcomeKey(choiceId, outcomeId);
    return !!key && !!(S && S.dialogueFlags && S.dialogueFlags[key]);
  };

  window.recordDialogueChoiceOutcome = function (choiceId, outcomeId, value) {
    var key = dialogueChoiceOutcomeKey(choiceId, outcomeId);
    if (!key || !S) return null;
    if (!S.dialogueFlags || typeof S.dialogueFlags !== 'object' || Array.isArray(S.dialogueFlags)) S.dialogueFlags = {};
    if (value === false) delete S.dialogueFlags[key];
    else S.dialogueFlags[key] = true;
    return key;
  };

  window.socialContext = function (id, options) {
    options = options || {};
    var member = typeof castById === 'function' ? castById(id) : null;
    if (!member || !S) return null;
    var f = S.friends && S.friends[id];
    var history = (f && Array.isArray(f.history) ? f.history : []).map(function (record) {
      return { kind: record.kind || 'unknown', sceneId: record.sceneId || null,
        choiceIds: Array.isArray(record.choiceIds) ? record.choiceIds.slice() : record.choiceId ? [record.choiceId] : [],
        change: Number(record.change) || 0, clock: Math.max(0, Number(record.clock) || 0) };
    }).sort(function (a, b) {
      return b.clock - a.clock || String(a.sceneId || '').localeCompare(String(b.sceneId || ''));
    }).slice(0, 5);
    var subject = options.subject && window.SUBJECTS && SUBJECTS[options.subject] ? options.subject : activeSubject();
    var homeBadges = badgeCountFor(member.homeSubject), currentBadges = badgeCountFor(subject);
    var itemIds = sortedTrueKeys(S.items), receiptIds = sortedTrueKeys(S.town && S.town.receipts);
    var worldFlags = sortedTrueKeys(S.worldFlags), dialogueFlags = sortedTrueKeys(S.dialogueFlags);
    var seenIds = uniqueSorted(sortedTrueKeys(S.seen).map(Number), true);
    var caughtIds = uniqueSorted(sortedTrueKeys(S.caught).map(Number), true);
    var relevantSpecies = importantPokemon(member);
    var stage = typeof friendStage === 'function' ? friendStage(f).id : (!f || !f.met ? 'stranger' : 'acquaintance');
    var relationships = (member.bible && member.bible.relationships || []).map(function (edge) {
      return { id: edge.id, kind: edge.kind, important: edge.important !== false, reciprocal: !!edge.reciprocal,
        expectation: edge.expectation };
    }).sort(function (a, b) { return a.id.localeCompare(b.id) || a.kind.localeCompare(b.kind); });
    return {
      castId: member.id, subject: subject, homeSubject: member.homeSubject, location: stableLocation(member, options), firstMeeting: !!options.firstMeeting,
      badges: currentBadges, badgeBand: badgeBand(currentBadges), homeBadges: homeBadges, homeBadgeBand: badgeBand(homeBadges),
      friendshipStage: stage, friendshipPoints: f ? Math.max(0, Number(f.points) || 0) : 0,
      completedEventIds: uniqueSorted(f && f.events || []), importantRelationships: relationships,
      relationshipIds: relationships.map(function (edge) { return edge.id; }),
      ownership: { itemIds: itemIds, receiptIds: receiptIds },
      recentEvents: history, mood: moodFor(id, history, options),
      repeatInteractions: { meetings: f ? Number(f.meetings) || 0 : 0, talks: f ? Number(f.talks) || 0 : 0,
        outings: f ? Number(f.outings) || 0 : 0, battles: f ? Number(f.battles) || 0 : 0, wins: f ? Number(f.wins) || 0 : 0 },
      pokemonObservations: { seenIds: seenIds, caughtIds: caughtIds, relevant: relevantSpecies.map(function (speciesId) {
        return { speciesId: speciesId, seen: seenIds.indexOf(speciesId) >= 0, caught: caughtIds.indexOf(speciesId) >= 0 };
      }) },
      worldFlags: worldFlags, dialogueFlags: dialogueFlags
    };
  };

  function conditionSpecificity(when) {
    return Object.keys(when || {}).reduce(function (total, key) {
      var value = when[key];
      if (Array.isArray(value)) return total + value.length;
      if (value && typeof value === 'object') return total + Object.keys(value).length;
      return total + 1;
    }, 0);
  }

  window.socialContextMatches = function (context, when) {
    if (!context) return false;
    when = when || {};
    if (Object.keys(when).some(function (key) { return CONDITION_KEYS.indexOf(key) < 0; })) return false;
    if (own(when, 'subject') && !matchesValue(context.subject, when.subject)) return false;
    if (own(when, 'location') && !matchesValue(context.location, when.location)) return false;
    if (own(when, 'badgeBand') && !matchesValue(context.badgeBand, when.badgeBand)) return false;
    if (own(when, 'homeBadgeBand') && !matchesValue(context.homeBadgeBand, when.homeBadgeBand)) return false;
    if (own(when, 'stage') && !matchesValue(context.friendshipStage, when.stage)) return false;
    if (own(when, 'minStage') && STAGE_RANK[context.friendshipStage] < STAGE_RANK[when.minStage]) return false;
    if (own(when, 'maxStage') && STAGE_RANK[context.friendshipStage] > STAGE_RANK[when.maxStage]) return false;
    if (own(when, 'firstMeeting') && context.firstMeeting !== !!when.firstMeeting) return false;
    if (own(when, 'completedEventIds') && !containsAll(context.completedEventIds, when.completedEventIds)) return false;
    if (own(when, 'recentEventIds') && !containsAll(context.recentEvents.map(function (event) { return event.sceneId; }), when.recentEventIds)) return false;
    if (own(when, 'relationshipIds') && !containsAll(context.relationshipIds, when.relationshipIds)) return false;
    if (own(when, 'itemIds') && !containsAll(context.ownership.itemIds, when.itemIds)) return false;
    if (own(when, 'receiptIds') && !containsAll(context.ownership.receiptIds, when.receiptIds)) return false;
    if (own(when, 'worldFlags') && !containsAll(context.worldFlags, when.worldFlags)) return false;
    if (own(when, 'dialogueFlags') && !containsAll(context.dialogueFlags, when.dialogueFlags)) return false;
    if (own(when, 'pokemonSeen') && !containsAll(context.pokemonObservations.seenIds, when.pokemonSeen)) return false;
    if (own(when, 'pokemonCaught') && !containsAll(context.pokemonObservations.caughtIds, when.pokemonCaught)) return false;
    if (own(when, 'mood') && !matchesValue(context.mood, when.mood)) return false;
    if (own(when, 'repeatAtLeast')) {
      for (var repeatKey in when.repeatAtLeast) {
        if ((context.repeatInteractions[repeatKey] || 0) < Number(when.repeatAtLeast[repeatKey] || 0)) return false;
      }
    }
    return true;
  };

  window.selectSocialContext = function (idOrContext, variants, options) {
    var context = typeof idOrContext === 'string' ? socialContext(idOrContext, options) : idOrContext;
    if (!context || !Array.isArray(variants)) return null;
    var prepared = variants.filter(function (variant) { return variant && typeof variant.id === 'string'; }).map(function (variant) {
      return { variant: variant, priority: Number(variant.priority) || 0, specificity: conditionSpecificity(variant.when) };
    });
    function order(a, b) {
      return b.priority - a.priority || b.specificity - a.specificity || a.variant.id.localeCompare(b.variant.id);
    }
    var matches = prepared.filter(function (item) {
      return !item.variant.fallback && socialContextMatches(context, item.variant.when);
    }).sort(order);
    if (!matches.length) matches = prepared.filter(function (item) { return !!item.variant.fallback; }).sort(order);
    return matches.length ? matches[0].variant : null;
  };

  /* Phase 4 authoring API. Context pools keep individual responses whole while
     letting deterministic priority choose the most specific useful situation. */
  window.selectCharacterDialogue = function (id, options) {
    var context = socialContext(id, options), pools = (window.CORE_CAST_DIALOGUE || {})[id] || [];
    var selected = selectSocialContext(context, pools, options);
    if (!selected || !Array.isArray(selected.lines) || !selected.lines.length) return null;
    var talks = context.repeatInteractions.talks || 0;
    var seed = selected.id.split('').reduce(function (sum, ch) { return (sum + ch.charCodeAt(0)) % 997; }, 0);
    var index = (talks + seed) % selected.lines.length;
    return { id: selected.id + '-line-' + (index + 1), poolId: selected.id,
      category: selected.category, text: selected.lines[index], context: context };
  };

  window.characterDialogueReport = function (id) {
    var pools = (window.CORE_CAST_DIALOGUE || {})[id] || [], categories = {}, ids = [], lines = [];
    pools.forEach(function (pool) {
      categories[pool.category] = (categories[pool.category] || 0) + (Array.isArray(pool.lines) ? pool.lines.length : 0);
      ids.push(pool.id);
      (pool.lines || []).forEach(function (line, index) { lines.push({ id: pool.id + '-line-' + (index + 1), text: line }); });
    });
    return { id: id, pools: pools.length, lines: lines.length, categories: categories,
      uniquePoolIds: new Set(ids).size, uniqueLineIds: new Set(lines.map(function (line) { return line.id; })).size,
      uniqueTexts: new Set(lines.map(function (line) { return line.text; })).size };
  };

  window.validateCoreCastProduction = function () {
    var errors = [], tierOne = typeof castEntries === 'function' ? castEntries({ tier: 1 }) : [];
    var plans = window.CORE_CAST_PRODUCTION || {};
    if (tierOne.length !== 10) errors.push('expected ten approved Tier 1 entries');
    tierOne.forEach(function (entry) {
      var plan = plans[entry.id];
      if (!plan) { errors.push(entry.id + ': missing production plan'); return; }
      ['want', 'fear', 'contradiction'].forEach(function (key) { if (!plan[key]) errors.push(entry.id + ': missing ' + key); });
      ['voiceBoundaries', 'relationshipObligations', 'fourEventArc', 'schedule', 'reactions'].forEach(function (key) {
        if (!Array.isArray(plan[key]) || !plan[key].length) errors.push(entry.id + ': invalid ' + key);
      });
      if (!Array.isArray(plan.eventInventory)) errors.push(entry.id + ': invalid eventInventory');
      if (plan.fourEventArc.length !== 4) errors.push(entry.id + ': arc must contain four events');
      (window.CORE_CAST_REQUIRED_REACTIONS || []).forEach(function (reaction) {
        if (plan.reactions.indexOf(reaction) < 0) errors.push(entry.id + ': missing reaction ' + reaction);
      });
      plan.eventInventory.forEach(function (event) {
        if (!event.eventId || ['keep', 'consolidate', 'retire'].indexOf(event.decision) < 0) errors.push(entry.id + ': invalid event inventory');
        if (event.decision !== 'keep' && !event.compatibility) errors.push(entry.id + ': missing compatibility mapping for ' + event.eventId);
        if (!Array.isArray(event.beatIds) || !Array.isArray(event.choiceIds)) errors.push(entry.id + ': incomplete ID inventory for ' + event.eventId);
      });
    });
    Object.keys(plans).forEach(function (id) { if (!tierOne.some(function (entry) { return entry.id === id; })) errors.push(id + ': plan is outside approved Tier 1'); });
    return errors;
  };

  window.validateCharacterDialogue = function (id) {
    var errors = [], pools = (window.CORE_CAST_DIALOGUE || {})[id] || [], poolIds = {}, texts = {};
    var knownEvents = ((window.CORE_CAST_PRODUCTION || {})[id] || {}).eventInventory || [];
    var knownEventIds = knownEvents.map(function (event) { return event.eventId; });
    /* CORE_CAST_PRODUCTION only ever covers the ten approved Tier 1 characters.
       Fall back to the generic, tier-agnostic active-event list (already used by
       folk-sourced Tier 1 characters like Kern/Linden/Hawthorn) so Tier 2/3
       dialogue can reference its own active event IDs without a Tier 1 plan. */
    (typeof friendEventRules === 'function' ? friendEventRules(id) : []).forEach(function (rule) {
      if (knownEventIds.indexOf(rule.eventId) < 0) knownEventIds.push(rule.eventId);
    });
    pools.forEach(function (pool) {
      if (!pool.id || poolIds[pool.id]) errors.push(id + ': duplicate or missing dialogue pool ' + (pool.id || '?'));
      poolIds[pool.id] = true;
      if (!pool.category || !Array.isArray(pool.lines) || !pool.lines.length) errors.push(pool.id + ': invalid pool');
      if (Object.keys(pool.when || {}).some(function (key) { return CONDITION_KEYS.indexOf(key) < 0; })) errors.push(pool.id + ': unknown condition');
      (pool.when.completedEventIds || []).forEach(function (eventId) { if (knownEventIds.indexOf(eventId) < 0) errors.push(pool.id + ': unknown event ' + eventId); });
      (pool.when.recentEventIds || []).forEach(function (eventId) { if (knownEventIds.indexOf(eventId) < 0) errors.push(pool.id + ': unknown recent event ' + eventId); });
      (pool.when.relationshipIds || []).forEach(function (otherId) { if (!castById(otherId)) errors.push(pool.id + ': unknown relationship ' + otherId); });
      (pool.when.itemIds || []).forEach(function (itemId) { if (!window.ITEMS || !ITEMS[itemId]) errors.push(pool.id + ': unknown item ' + itemId); });
      (pool.when.pokemonSeen || []).concat(pool.when.pokemonCaught || []).forEach(function (speciesId) {
        if (!window.DEX || !DEX.some(function (entry) { return entry.id === Number(speciesId); })) errors.push(pool.id + ': unknown Pokémon ' + speciesId);
      });
      if (pool.when.stage && STAGE_RANK[pool.when.stage] === undefined) errors.push(pool.id + ': unknown stage');
      if (pool.when.minStage && STAGE_RANK[pool.when.minStage] === undefined) errors.push(pool.id + ': unknown minimum stage');
      if (pool.when.maxStage && STAGE_RANK[pool.when.maxStage] === undefined) errors.push(pool.id + ': unknown maximum stage');
      if (pool.when.minStage && pool.when.maxStage && STAGE_RANK[pool.when.minStage] > STAGE_RANK[pool.when.maxStage]) errors.push(pool.id + ': unreachable stage range');
      Object.keys(pool.when.repeatAtLeast || {}).forEach(function (key) {
        if (['meetings', 'talks', 'outings', 'battles', 'wins'].indexOf(key) < 0 || Number(pool.when.repeatAtLeast[key]) < 0) errors.push(pool.id + ': invalid repeat condition');
      });
      (pool.lines || []).forEach(function (line) {
        if (typeof line !== 'string' || line.trim().length < 20) errors.push(pool.id + ': fragment or empty line');
        if (texts[line]) errors.push(pool.id + ': duplicate dialogue text');
        texts[line] = true;
      });
    });
    var active = ((window.CORE_CAST_ACTIVE_HEART_EVENT_IDS || {})[id] || []);
    active.forEach(function (eventId) {
      if (!pools.some(function (pool) { return pool.acknowledgesEventId === eventId && (pool.when.completedEventIds || []).indexOf(eventId) >= 0; })) {
        errors.push(id + ': no later acknowledgment for ' + eventId);
      }
    });
    return errors;
  };

  window.validateHeartEventContent = function (id) {
    var errors = [], rules = typeof friendEventRules === 'function' ? friendEventRules(id) : [], allIds = {};
    rules.forEach(function (rule) {
      var scene = sceneBeats(id, 'event', rule.eventId);
      if (!scene || scene.beats.length < 5) { errors.push(rule.eventId + ': needs at least five beats'); return; }
      scene.beats.forEach(function (beat) {
        if (!beat.id || allIds[beat.id]) errors.push(rule.eventId + ': duplicate or missing beat ID');
        allIds[beat.id] = true;
        if (!Array.isArray(beat.c) || beat.c.length < 2) errors.push(beat.id + ': needs at least two choices');
        (beat.c || []).forEach(function (choice) {
          if (!choice.id || allIds[choice.id]) errors.push(beat.id + ': duplicate or missing choice ID');
          allIds[choice.id] = true;
        });
      });
    });
    if (((window.CORE_CAST_ACTIVE_HEART_EVENT_IDS || {})[id] || []).length && rules.length !== 4) errors.push(id + ': authored batch must expose four active heart events');
    return errors;
  };
})();
