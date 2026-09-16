/* Phase 5 Slice 1: supporting-cast production ledger. */
const { chromium } = require('./playwright.cjs');

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok });
  console.log((ok ? 'PASS  ' : 'FAIL  ') + name + (detail ? '  [' + detail + ']' : ''));
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:8780/');

  const data = await page.evaluate(() => {
    const ledger = window.TIER2_TIER3_LEDGER;
    const validationErrors = validateTier2Tier3Ledger();
    const tier2 = castEntries({ tier: 2 });
    const tier3 = castEntries({ tier: 3 });
    const blockedIds = tier2.filter(e => e.sourceKind !== 'townsfolk').map(e => e.id).sort();
    const readyTier2Ids = tier2.filter(e => e.sourceKind === 'townsfolk').map(e => e.id).sort();
    const clusterCoverage = new Set();
    ledger.clusters.forEach(c => c.tier2Ids.concat(c.tier3Ids).forEach(id => clusterCoverage.add(id)));
    return {
      census: castCensus(),
      ledgerMeta: { tier2: ledger.tier2, tier3: ledger.tier3, tier2ReadyCount: ledger.tier2ReadyCount,
        befriendablePercentage: ledger.befriendablePercentage, requiredMinimum: ledger.requiredMinimum },
      validationErrors,
      blockedIds, readyTier2Ids,
      ledgerBlockedIds: ledger.tier2BlockedIds,
      entryCount: Object.keys(ledger.entries).length,
      clusterCount: ledger.clusters.length,
      clusterCoverageCount: clusterCoverage.size,
      sampleReady: ledger.entries[readyTier2Ids[0]],
      sampleBlocked: ledger.entries[blockedIds[0]],
      sampleTier3: ledger.entries[tier3[0].id]
    };
  });
  await browser.close();

  check('the frozen census matches the reconciled Phase 2 baseline (164 meaningful, 10/117/37, 77.4%)',
    data.census.meaningful === 164 && data.census.tiers[1] === 10 && data.census.tiers[2] === 117 &&
    data.census.tiers[3] === 37 && data.census.percentage === 77.4 && data.census.required === 82,
    JSON.stringify(data.census));

  check('the ledger baseline matches the current registry exactly (no drift)',
    data.ledgerMeta.tier2 === 117 && data.ledgerMeta.tier3 === 37 &&
    data.ledgerMeta.befriendablePercentage === 77.4 && data.ledgerMeta.requiredMinimum === 82,
    JSON.stringify(data.ledgerMeta));

  check('validateTier2Tier3Ledger reports zero errors', data.validationErrors.length === 0,
    data.validationErrors.slice(0, 5).join(' | '));

  check('every non-townsfolk Tier 2 entry (gym leaders and bosses) is flagged blocked-pending-phase-6',
    JSON.stringify(data.blockedIds) === JSON.stringify(data.ledgerBlockedIds) && data.blockedIds.length === 32,
    'blocked=' + data.blockedIds.length);

  check('the ledger has exactly one entry per Tier 2/Tier 3 registry member (154 total)',
    data.entryCount === 154, 'entryCount=' + data.entryCount);

  check('every ledger entry appears in exactly one location cluster',
    data.clusterCoverageCount === 154, 'covered=' + data.clusterCoverageCount + ' clusters=' + data.clusterCount);

  check('a ready Tier 2 townsfolk entry carries required contexts, a 2-event target and a 150-line target',
    data.sampleReady && data.sampleReady.reachability === 'ready' && data.sampleReady.eventTarget === 2 &&
    data.sampleReady.lineTarget === 150 && data.sampleReady.requiredContexts.length >= 6,
    JSON.stringify(data.sampleReady));

  check('a blocked gym-leader/boss entry carries a zero event target and a documented reachability reason',
    data.sampleBlocked && data.sampleBlocked.reachability === 'blocked-pending-phase-6' &&
    data.sampleBlocked.eventTarget === 0 && !!data.sampleBlocked.blockedReason,
    JSON.stringify(data.sampleBlocked));

  check('a Tier 3 entry carries a zero event target, a 100-line target and no friendship-only contexts',
    data.sampleTier3 && data.sampleTier3.eventTarget === 0 && data.sampleTier3.lineTarget === 100 &&
    data.sampleTier3.requiredContexts.indexOf('friendshipStages') < 0 &&
    data.sampleTier3.requiredContexts.indexOf('postEvent') < 0,
    JSON.stringify(data.sampleTier3));

  check('no page errors', errors.length === 0, errors.join(' | '));

  const passed = results.filter(result => result.ok).length;
  console.log(passed + '/' + results.length + ' checks passed');
  if (passed !== results.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
