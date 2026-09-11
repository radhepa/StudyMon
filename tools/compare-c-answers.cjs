/* Judge tools/verify-c-answers.cjs output.

   A choice is often the output plus an explanation ("90 - it rounds down"), so
   an exact string test is too strict. Anything these rules cannot settle is
   printed for a human to read rather than being quietly counted as a pass. */
const fs = require('fs');
const d = JSON.parse(fs.readFileSync('output/c-answer-verification.json', 'utf8'));
const s = x => String(x == null ? '' : x).replace(/\r/g, '');
const squeeze = x => s(x).replace(/\s+/g, ' ').trim();

function verdict(r) {
  if (r.error || /error:/.test(r.diagnostics || '')) return ['unbuilt', (r.diagnostics || r.error || '').match(/error: [^\n]*/) ? (r.diagnostics || '').match(/error: [^\n]*/)[0] : r.error];
  const out = s(r.output), claim = s(r.claimed);
  if (out === claim) return ['ok', 'exact'];
  if (out.trim() === claim.trim() && out.trim() !== '') return ['ok', 'whitespace at the ends only'];
  // choice is the output followed by an explanation
  const lead = claim.split(/\s+[-\u2013\u2014(]\s*/)[0];
  if (out === lead || out.trim() === lead.trim()) return ['ok', 'output plus explanation'];
  // the choice quotes the output
  const quoted = claim.match(/"([^"]*)"/);
  if (quoted && (out === quoted[1] || out.trim() === quoted[1].trim())) return ['ok', 'output quoted in the choice'];
  // nothing printed
  if (out === '' && /^(nothing|no output|\(nothing\)|nothing is printed|nothing at all)/i.test(claim.trim())) return ['ok', 'no output, choice says so'];
  if (squeeze(out) === squeeze(lead) && squeeze(out) !== '') return ['ok', 'spacing inside the output differs from the choice'];
  return ['REVIEW', 'actual ' + JSON.stringify(out) + ' vs claimed ' + JSON.stringify(claim)];
}

const buckets = { ok: [], REVIEW: [], unbuilt: [] };
for (const r of d.results) { const v = verdict(r); buckets[v[0]].push([r, v[1]]); }

console.log('verified by running: ' + buckets.ok.length);
console.log('needs a human read  : ' + buckets.REVIEW.length);
console.log('would not build     : ' + buckets.unbuilt.length);
const how = {};
buckets.ok.forEach(x => { how[x[1]] = (how[x[1]] || 0) + 1; });
console.log('\nhow the verified ones matched:');
Object.entries(how).sort((a, b) => b[1] - a[1]).forEach(e => console.log('  ' + e[1] + '  ' + e[0]));

if (buckets.REVIEW.length) {
  console.log('\n================ NEEDS A HUMAN READ ================');
  for (const [r, note] of buckets.REVIEW) {
    console.log('\n--- ' + r.id + ' (ch' + r.ch + ')');
    console.log('Q: ' + r.q);
    console.log('CODE:\n' + r.code);
    console.log('ACTUAL : ' + JSON.stringify(r.output));
    console.log('CLAIMED: ' + JSON.stringify(r.claimed));
    console.log('OTHERS : ' + JSON.stringify(r.choices.filter((c, i) => i !== r.a)));
  }
}
if (buckets.unbuilt.length) {
  console.log('\n================ WOULD NOT BUILD (harness limit) ================');
  buckets.unbuilt.forEach(([r, note]) => console.log('  ' + r.id + '  ' + String(note).slice(0, 70)));
}
