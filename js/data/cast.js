/* Authoritative cast classification overlay.

   Source records remain in trainers.js, townsfolk.js, world.js, and their
   Calculus equivalents. This registry owns stable social identity and
   classification only; castSource() resolves the live gameplay record. */
(function () {
  var CORE = window.CAST_BIBLES || {};

  window.CAST_INCLUSION_RULES = {
    included: 'Named source records that remain available through a repeatable town, friendship, gym, or boss interaction.',
    excluded: 'Anonymous scenery, disposable battle-only generated opponents, and prose-only mentions with no stable source record.',
    denominator: 'Every included source record counts once, after stable IDs are de-duplicated across both subjects.'
  };

  var entries = [];
  var buildErrors = [];

  function subjectData(subject) {
    if (window.SUBJECTS && window.SUBJECTS[subject]) return window.SUBJECTS[subject];
    if (subject === 'calc') return {
      CHAPTERS: window.CALC_CHAPTERS || [], ELITE: window.CALC_ELITE || [],
      TOWNSFOLK: window.CALC_TOWNSFOLK || []
    };
    return { CHAPTERS: window.CHAPTERS || [], ELITE: window.ELITE || [], TOWNSFOLK: window.TOWNSFOLK || [] };
  }

  function sourceKey(entry) {
    return entry.homeSubject + ':' + entry.sourceKind + ':' + String(entry.sourceRef);
  }

  function add(entry) {
    entry.relationshipIds = (entry.relationshipIds || []).slice();
    entry.recurringLocations = (entry.recurringLocations || []).slice();
    entry.currentFunctions = (entry.currentFunctions || []).slice();
    entry.currentEventIds = (entry.currentEventIds || []).slice();
    entry.meaningful = entry.meaningful !== false;
    entry.sourceKey = sourceKey(entry);
    if (entries.some(function (old) { return old.id === entry.id; })) buildErrors.push('duplicate cast id ' + entry.id);
    if (entries.some(function (old) { return old.sourceKey === entry.sourceKey; })) buildErrors.push('duplicate source ' + entry.sourceKey);
    entries.push(Object.freeze(entry));
  }

  function classification(id, sourceKind, gameplayKind) {
    if (CORE[id]) return {
      tier: 1, befriendable: true, narrativeImportance: 'core',
      justification: 'Established or promoted recurring character with a distinct long-form relationship role.'
    };
    var supporting = sourceKind === 'gym-leader' || sourceKind === 'boss' ||
      (sourceKind === 'townsfolk' && (gameplayKind === 'talk' || gameplayKind === 'trainer'));
    if (supporting) return {
      tier: 2, befriendable: true, narrativeImportance: 'supporting',
      justification: 'Named repeatable character with an ongoing conversation, battle, gym, or story function.'
    };
    return {
      tier: 3, befriendable: false, narrativeImportance: 'world',
      justification: 'Named recurring service or one-time gift role; retained in the world without a new friendship track.'
    };
  }

  function addPerson(person, subject, sourceKind) {
    var c = classification(person.id, sourceKind, person.kind);
    var functions = sourceKind === 'companion'
      ? ['town-presence', 'friendship-events', 'outings', 'practice-battles']
      : ['town-' + person.kind, 'legacy-friendship-scenes'];
    var eventIds = [];
    if (sourceKind === 'companion') {
      eventIds = (person.events || []).concat(person.outings || []).map(function (scene) { return scene.id; });
    } else {
      var arcKey = (window.CLASS_STORY || {})[person.cls];
      eventIds = ((window.FOLK_EVENTS || {})[arcKey] || []).map(function (scene) { return person.id + '-' + scene.id; });
    }
    add({
      id: person.id,
      name: person.name,
      role: person.role || person.cls,
      sourceKind: sourceKind,
      sourceRef: person.id,
      homeSubject: subject,
      recurringLocations: [sourceKind === 'companion' ? ((window.COMPANION_HOME || {})[person.id] || 'town') : person.loc],
      currentFunctions: functions,
      currentEventIds: eventIds,
      tier: c.tier,
      befriendable: c.befriendable,
      narrativeImportance: c.narrativeImportance,
      relationshipIds: CORE[person.id] ? CORE[person.id].relationships.map(function (edge) { return edge.id; }) : [],
      bible: CORE[person.id] || null,
      meaningful: true,
      justification: c.justification
    });
  }

  (window.TRAINERS || []).forEach(function (person) { addPerson(person, 'c', 'companion'); });
  (window.TOWNSFOLK || []).forEach(function (person) { addPerson(person, 'c', 'townsfolk'); });
  (window.CALC_TOWNSFOLK || []).forEach(function (person) { addPerson(person, 'calc', 'townsfolk'); });

  ['c', 'calc'].forEach(function (subject) {
    var def = subjectData(subject);
    (def.CHAPTERS || []).forEach(function (chapter) {
      var id = subject + '-gym-' + chapter.n;
      var c = classification(id, 'gym-leader');
      add({
        id: id,
        name: chapter.leader,
        role: chapter.epithet || 'Gym Leader',
        sourceKind: 'gym-leader',
        sourceRef: chapter.n,
        homeSubject: subject,
        recurringLocations: [subject + ':gym:' + chapter.n],
        currentFunctions: ['gym-battle', 'gym-rematch'],
        currentEventIds: [],
        tier: c.tier,
        befriendable: c.befriendable,
        narrativeImportance: c.narrativeImportance,
        relationshipIds: CORE[id] ? CORE[id].relationships.map(function (edge) { return edge.id; }) : [],
        bible: CORE[id] || null,
        meaningful: true,
        justification: c.justification
      });
    });
    (def.ELITE || []).forEach(function (boss) {
      var id = subject + '-boss-' + boss.id;
      var c = classification(id, 'boss');
      add({
        id: id,
        name: boss.name,
        role: boss.epithet || 'League challenger',
        sourceKind: 'boss',
        sourceRef: boss.id,
        homeSubject: subject,
        recurringLocations: [subject + ':boss:' + boss.id],
        currentFunctions: ['boss-battle'],
        currentEventIds: [],
        tier: c.tier,
        befriendable: c.befriendable,
        narrativeImportance: c.narrativeImportance,
        relationshipIds: CORE[id] ? CORE[id].relationships.map(function (edge) { return edge.id; }) : [],
        bible: CORE[id] || null,
        meaningful: true,
        justification: c.justification
      });
    });
  });

  window.CAST_REGISTRY = Object.freeze(entries.slice());

  window.castById = function (id) {
    for (var i = 0; i < CAST_REGISTRY.length; i++) if (CAST_REGISTRY[i].id === id) return CAST_REGISTRY[i];
    return null;
  };

  window.castEntries = function (filter) {
    var list = CAST_REGISTRY.slice();
    if (!filter) return list;
    return list.filter(function (entry) {
      for (var key in filter) {
        if (Array.isArray(filter[key])) {
          if (filter[key].indexOf(entry[key]) < 0) return false;
        } else if (entry[key] !== filter[key]) return false;
      }
      return true;
    });
  };

  window.castSource = function (entryOrId) {
    var entry = typeof entryOrId === 'string' ? castById(entryOrId) : entryOrId;
    if (!entry) return null;
    if (entry.sourceKind === 'companion') {
      return (window.TRAINERS || []).find(function (person) { return person.id === entry.sourceRef; }) || null;
    }
    var def = subjectData(entry.homeSubject);
    if (entry.sourceKind === 'townsfolk') {
      return (def.TOWNSFOLK || []).find(function (person) { return person.id === entry.sourceRef; }) || null;
    }
    if (entry.sourceKind === 'gym-leader') {
      return (def.CHAPTERS || []).find(function (chapter) { return chapter.n === entry.sourceRef; }) || null;
    }
    if (entry.sourceKind === 'boss') {
      return (def.ELITE || []).find(function (boss) { return boss.id === entry.sourceRef; }) || null;
    }
    return null;
  };

  window.validateCastEntries = function (list) {
    var errors = buildErrors.slice(), ids = {}, sources = {};
    (list || []).forEach(function (entry, index) {
      var label = entry && entry.id ? entry.id : '#' + index;
      if (!entry || typeof entry !== 'object') { errors.push(label + ': invalid entry'); return; }
      if (ids[entry.id]) errors.push('duplicate cast id ' + entry.id); else ids[entry.id] = true;
      if (sources[entry.sourceKey]) errors.push('duplicate source ' + entry.sourceKey); else sources[entry.sourceKey] = true;
      ['id', 'name', 'role', 'sourceKind', 'homeSubject', 'narrativeImportance', 'justification'].forEach(function (key) {
        if (!entry[key]) errors.push(label + ': missing ' + key);
      });
      if ([1, 2, 3].indexOf(entry.tier) < 0) errors.push(label + ': invalid tier');
      if (typeof entry.befriendable !== 'boolean') errors.push(label + ': invalid befriendability');
      if (!Array.isArray(entry.recurringLocations) || !entry.recurringLocations.length) errors.push(label + ': no recurring location');
      if (!Array.isArray(entry.currentFunctions) || !entry.currentFunctions.length) errors.push(label + ': no current function');
      if (!Array.isArray(entry.currentEventIds)) errors.push(label + ': invalid current events');
      if (!Array.isArray(entry.relationshipIds)) errors.push(label + ': invalid relationships');
      if (entry.tier === 1 && (!entry.bible || typeof entry.bible !== 'object')) errors.push(label + ': missing Tier 1 bible');
      if (entry.tier !== 1 && entry.bible) errors.push(label + ': unexpected non-Tier 1 bible');
      if (!castSource(entry)) errors.push(label + ': source not found');
    });
    (list || []).forEach(function (entry) {
      (entry.relationshipIds || []).forEach(function (related) {
        if (!ids[related]) errors.push(entry.id + ': unknown relationship ' + related);
      });
      if (!entry.bible) return;
      var bible = entry.bible;
      ['approximateAge', 'occupationRole', 'personality', 'speechStyle', 'interests', 'dislikes', 'habits',
       'relationships', 'insecurities', 'goals', 'lesserKnownTraits', 'humorStyle', 'values', 'importantLocations',
       'pokemonPreferences', 'giftPreferences', 'opinionByStage', 'personalArc', 'publicTemperament',
       'privateTemperament', 'motivation', 'vulnerability', 'hobbies', 'conflict', 'growthDirection',
       'voiceRules', 'forbiddenVoiceHabits'].forEach(function (key) {
        if (bible[key] === undefined || bible[key] === null || bible[key] === '') errors.push(entry.id + ': bible missing ' + key);
      });
      ['personality', 'interests', 'dislikes', 'habits', 'relationships', 'insecurities', 'goals', 'lesserKnownTraits',
       'values', 'importantLocations', 'hobbies', 'voiceRules', 'forbiddenVoiceHabits'].forEach(function (key) {
        if (!Array.isArray(bible[key]) || !bible[key].length) errors.push(entry.id + ': bible invalid ' + key);
      });
      (window.CAST_BIBLE_STAGES || []).forEach(function (stage) {
        if (!bible.opinionByStage || !bible.opinionByStage[stage]) errors.push(entry.id + ': bible missing opinion stage ' + stage);
      });
      var giftPrefs = bible.giftPreferences || {};
      ['favoriteItemIds', 'avoidedItemIds'].forEach(function (field) {
        if (!Array.isArray(giftPrefs[field])) errors.push(entry.id + ': invalid gift ' + field);
        else if (window.ITEMS) giftPrefs[field].forEach(function (itemId) {
          if (!ITEMS[itemId] || ITEMS[itemId].category !== 'gift') errors.push(entry.id + ': gift preference has invalid item ' + itemId);
        });
      });
      (bible.relationships || []).forEach(function (edge) {
        if (!edge || !edge.id || !ids[edge.id]) errors.push(entry.id + ': bible relationship has unknown id ' + (edge && edge.id));
        if (edge && edge.reciprocal && ids[edge.id]) {
          var other = (list || []).find(function (candidate) { return candidate.id === edge.id; });
          var reciprocal = other && other.bible && (other.bible.relationships || []).some(function (candidate) {
            return candidate.id === entry.id && candidate.reciprocal;
          });
          if (!reciprocal) errors.push(entry.id + ': missing reciprocal relationship from ' + edge.id);
        }
      });
    });
    return errors;
  };

  window.castCensus = function () {
    var meaningful = castEntries({ meaningful: true });
    var befriendable = meaningful.filter(function (entry) { return entry.befriendable; });
    var tiers = { 1: 0, 2: 0, 3: 0 };
    meaningful.forEach(function (entry) { tiers[entry.tier]++; });
    return {
      total: CAST_REGISTRY.length,
      meaningful: meaningful.length,
      befriendable: befriendable.length,
      required: Math.ceil(meaningful.length * 0.5),
      percentage: meaningful.length ? Math.round(befriendable.length * 1000 / meaningful.length) / 10 : 0,
      tiers: tiers
    };
  };
})();
