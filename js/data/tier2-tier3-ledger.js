/* Phase 5 Slice 1: supporting-cast (Tier 2) and world-cast (Tier 3) production
   ledger. This is a planning record, not dialogue or bibles - no player-facing
   prose is authored here. It reconciles the Phase 2 registry against current
   data, freezes the Tier 2/Tier 3 rosters and the befriendable percentage, and
   groups every character by location so Slices 3+ (Tier 2 batches) and the
   Tier 3 location batches can work from one coherent record instead of
   re-deriving it per chat.

   Depends on cast.js (CAST_REGISTRY/castEntries), folk-events.js
   (CLASS_STORY/FOLK_EVENTS) and core-cast-production.js only for load order;
   it does not read CORE_CAST_PRODUCTION and creates no cast membership. */
(function () {
  var TIER2_READY_CONTEXTS = ['firstMeeting', 'friendshipStages', 'postEvent', 'location', 'recentMoodRumor', 'itemPokemon', 'repeatInteraction'];
  var TIER2_BLOCKED_CONTEXTS = [];
  var TIER3_CONTEXTS = ['firstMeeting', 'location', 'recentMoodRumor', 'itemPokemon'];

  var TIER2_READY_LINE_TARGET = 150;
  var TIER2_READY_EVENT_TARGET = 2;
  var TIER3_LINE_TARGET = 100;

  var BLOCKED_REASON = 'sourceKind has no cls, so folkArc() resolves to zero heart events, and neither ' +
    'js/engine/town.js nor any other UI file has an entry point to visit, talk to, or open a friend-detail ' +
    'screen for a gym-leader/boss source outside the one-time battle (same structural gap Phase 4 documented ' +
    'for c-gym-1/calc-gym-1). Verified for every non-Tier-1 gym leader and boss, not assumed from those two ' +
    'alone. Phase 6 ("Gym leaders and quest reactivity") owns fixing this; heart-event authoring for these ' +
    'entries is deferred until that reachability exists, matching the Tier 1 precedent.';

  function entryContexts(entry) {
    if (entry.sourceKind !== 'townsfolk') return { contexts: TIER2_BLOCKED_CONTEXTS.slice(), reachability: 'blocked-pending-phase-6', reason: BLOCKED_REASON };
    var contexts = entry.tier === 2 ? TIER2_READY_CONTEXTS.slice() : TIER3_CONTEXTS.slice();
    if (entry.tier === 2 && entry.relationshipIds.length) contexts.push('relationships');
    return { contexts: contexts, reachability: 'ready', reason: null };
  }

  function existingArchetype(entry) {
    if (entry.sourceKind !== 'townsfolk') return null;
    var source = castSource(entry);
    var arcKey = (window.CLASS_STORY || {})[source.cls];
    var arc = (window.FOLK_EVENTS || {})[arcKey] || [];
    return {
      cls: source.cls, arcKey: arcKey || null, currentEventCount: arc.length,
      currentEventIds: arc.map(function (event) { return entry.id + '-' + event.id; }),
      note: entry.tier === 2
        ? 'Currently shares the generic ' + arcKey + ' archetype (3 events/2 beats) with every other ' + source.cls +
          '. A content batch must carve this character into a dedicated cls + archetype key before authoring the ' +
          'two bespoke events, exactly the Slice 8-10 Kern/Linden/Hawthorn pattern in Phase 4, scaled to two events.'
        : 'Currently shares the generic ' + arcKey + ' archetype. No carve-out is needed: Tier 3 is not ' +
          'befriendable, so this shared arc stays structurally unreachable through friendship, same as before Phase 5.'
    };
  }

  function buildEntry(entry) {
    var ctx = entryContexts(entry);
    var isReadyTier2 = entry.tier === 2 && ctx.reachability === 'ready';
    return {
      id: entry.id, name: entry.name, tier: entry.tier, homeSubject: entry.homeSubject,
      location: entry.recurringLocations[0] || null,
      reachability: ctx.reachability, blockedReason: ctx.reason,
      requiredContexts: ctx.contexts,
      eventTarget: isReadyTier2 ? TIER2_READY_EVENT_TARGET : 0,
      lineTarget: ctx.reachability !== 'ready' ? 0 : (entry.tier === 2 ? TIER2_READY_LINE_TARGET : TIER3_LINE_TARGET),
      existingArchetype: existingArchetype(entry),
      tierJustification: entry.justification
    };
  }

  function clusterKey(entry) { return entry.homeSubject + ':' + (entry.recurringLocations[0] || 'unknown'); }

  function buildClusters(tier2, tier3) {
    var byKey = {};
    function bucket(entry, bucketName) {
      var key = clusterKey(entry);
      if (!byKey[key]) byKey[key] = { key: key, homeSubject: entry.homeSubject, location: entry.recurringLocations[0] || 'unknown', tier2Ids: [], tier3Ids: [] };
      byKey[key][bucketName].push(entry.id);
    }
    tier2.forEach(function (entry) { bucket(entry, 'tier2Ids'); });
    tier3.forEach(function (entry) { bucket(entry, 'tier3Ids'); });
    return Object.keys(byKey).sort().map(function (key) { return byKey[key]; });
  }

  function build() {
    var tier2 = castEntries({ tier: 2 });
    var tier3 = castEntries({ tier: 3 });
    var entries = {};
    tier2.concat(tier3).forEach(function (entry) { entries[entry.id] = buildEntry(entry); });
    var blockedIds = tier2.filter(function (entry) { return entry.sourceKind !== 'townsfolk'; }).map(function (entry) { return entry.id; });
    return {
      frozenAt: 'Phase 5 Slice 1',
      meaningfulTotal: 164, tier1: 10, tier2: 117, tier3: 37,
      befriendable: 127, befriendablePercentage: 77.4, requiredMinimum: 82,
      tier2ReadyCount: tier2.length - blockedIds.length,
      tier2BlockedIds: blockedIds.sort(),
      entries: entries,
      clusters: buildClusters(tier2, tier3)
    };
  }

  window.TIER2_TIER3_LEDGER = Object.freeze(build());

  window.validateTier2Tier3Ledger = function () {
    var errors = [];
    var ledger = window.TIER2_TIER3_LEDGER;
    var tier2 = castEntries({ tier: 2 }), tier3 = castEntries({ tier: 3 });
    var liveIds = {};
    tier2.concat(tier3).forEach(function (entry) { liveIds[entry.id] = true; });
    Object.keys(ledger.entries).forEach(function (id) {
      if (!liveIds[id]) errors.push('ledger has stale entry not in current registry: ' + id);
    });
    tier2.concat(tier3).forEach(function (entry) {
      if (!ledger.entries[entry.id]) errors.push('registry entry missing from ledger: ' + entry.id);
    });
    if (tier2.length !== 117) errors.push('Tier 2 count drifted from frozen 117: ' + tier2.length);
    if (tier3.length !== 37) errors.push('Tier 3 count drifted from frozen 37: ' + tier3.length);
    var census = castCensus();
    if (census.percentage !== ledger.befriendablePercentage) errors.push('befriendable percentage drifted: ' + census.percentage);
    var blocked = tier2.filter(function (entry) { return entry.sourceKind !== 'townsfolk'; }).length;
    if (blocked !== ledger.tier2BlockedIds.length) errors.push('blocked gym/boss count drifted: ' + blocked);
    Object.keys(ledger.entries).forEach(function (id) {
      var record = ledger.entries[id];
      if (record.reachability === 'ready' && !record.requiredContexts.length) errors.push(id + ': ready entry has no required contexts');
      if (record.reachability === 'ready' && !record.lineTarget) errors.push(id + ': ready entry has no line target');
      if (record.tier === 2 && record.reachability === 'ready' && record.eventTarget !== 2) errors.push(id + ': Tier 2 ready entry must target 2 events');
      if (record.tier === 3 && record.eventTarget !== 0) errors.push(id + ': Tier 3 entry must target 0 events');
    });
    var clusterMembers = {};
    ledger.clusters.forEach(function (cluster) {
      cluster.tier2Ids.concat(cluster.tier3Ids).forEach(function (id) {
        if (clusterMembers[id]) errors.push(id + ': appears in more than one cluster');
        clusterMembers[id] = true;
      });
    });
    Object.keys(ledger.entries).forEach(function (id) {
      if (!clusterMembers[id]) errors.push(id + ': missing from every cluster');
    });
    return errors;
  };
})();
