/* Phase 7 Slice 6: the progressively revealed relationship web.

   Read-only. Two views of one set of edges (js/data/relationship-web.js):
   - relationshipWebTruth()  world truth, for audits and tests only
   - relationshipWebKnown()  what the player has learned: only people they
     have met, only connections whose every member they have met, and the
     deeper line only once they have seen or heard it. An unmet person is
     never named, counted per edge, or hinted at.
   The screen draws the known web as a small circle graph and always lists the
   same connections as plain sentences, which is the accessible version and
   the one that works on a narrow phone. */

function relationshipWebEdges() { return window.RELATIONSHIP_WEB_EDGES || []; }

function validateRelationshipWeb() {
  var errors = [], ids = {}, pairs = {};
  var pairKey = function (a, b) { return [a, b].sort().join('|'); };
  relationshipWebEdges().forEach(function (e) {
    var label = 'web:' + (e && e.id);
    if (!e || !WORLD_ID_PATTERN.test(String(e.id))) { errors.push(label + ': invalid id'); return; }
    if (ids[e.id]) errors.push(label + ': duplicate id');
    ids[e.id] = true;
    if (['bible', 'leader', 'pair', 'thread'].indexOf(e.source) < 0) errors.push(label + ': unknown source ' + e.source);
    if (!Array.isArray(e.people) || e.people.length < 2) errors.push(label + ': needs two or more people');
    else e.people.forEach(function (id) { if (!castById(id)) errors.push(label + ': unknown person ' + id); });
    if (typeof e.public !== 'string' || !e.public.trim()) errors.push(label + ': missing public label');
    if (e.deep !== undefined && (!Array.isArray(e.deepWhen) || !e.deepWhen.length)) errors.push(label + ': a deep line needs deepWhen');
    (e.deepWhen || []).concat(e.knownWhen || []).forEach(function (f) { if (!validateWorldFactId(f)) errors.push(label + ': unknown fact ' + f); });
    (e.people || []).forEach(function (a) { (e.people || []).forEach(function (b) { if (a < b) pairs[pairKey(a, b)] = true; }); });
  });
  /* The web must cover the registries it is drawn from. */
  CAST_REGISTRY.forEach(function (entry) {
    (entry.bible && entry.bible.relationships || []).forEach(function (edge) {
      if (!pairs[pairKey(entry.id, edge.id)]) errors.push('web: bible edge ' + entry.id + ' - ' + edge.id + ' is missing');
    });
  });
  Object.keys(window.GYM_LEADER_PROFILES || {}).forEach(function (id) {
    (GYM_LEADER_PROFILES[id].related || []).forEach(function (other) {
      if (!pairs[pairKey(id, other)]) errors.push('web: leader edge ' + id + ' - ' + other + ' is missing');
    });
  });
  worldContentList('thread').forEach(function (t) {
    if (!pairs[pairKey(t.people[0], t.people[1])]) errors.push('web: thread ' + t.id + ' has no edge');
  });
  return errors;
}

function relationshipWebTruth() {
  return relationshipWebEdges().map(function (e) {
    return { id: e.id, people: e.people.slice(), source: e.source, public: e.public, deep: e.deep || null };
  });
}

function relationshipWebKnown() {
  if (!S) return { people: [], edges: [] };
  var edges = [], people = {};
  relationshipWebEdges().forEach(function (e) {
    if (!e.people.every(function (id) { return worldFact('met:' + id); })) return;
    if (e.knownWhen && !e.knownWhen.some(worldFact)) return;
    var deep = !!e.deep && (e.deepWhen || []).some(worldFact);
    edges.push({ id: e.id, people: e.people.slice(), public: e.public, deep: deep ? e.deep : null, learned: deep ? 'deep' : 'public' });
    e.people.forEach(function (id) { people[id] = true; });
  });
  var list = Object.keys(people).map(function (id) { var c = castById(id); return { id: id, name: c.name, role: c.role }; })
    .sort(function (a, b) { return a.name.localeCompare(b.name) || a.id.localeCompare(b.id); });
  return { people: list, edges: edges };
}

function relationshipWebButtonHtml() {
  if (!S) return '';
  return '<button class="ghost web-button" onclick="openRelationshipWeb()">Who knows whom</button>';
}

function relationshipWebNames(ids, byId) {
  var names = ids.map(function (id) { return byId[id].name; });
  return names.length > 2 ? names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1] : names.join(' and ');
}

/* Connected groups, each ordered by walking its edges so neighbours sit next
   to each other and lines do not cross. Deterministic: edge order, then IDs. */
function relationshipWebClusters(web) {
  var group = {}, clusters = [];
  web.edges.forEach(function (e) {
    var found = null;
    e.people.forEach(function (id) { if (group[id] && !found) found = group[id]; });
    if (!found) { found = { people: [], edges: [] }; clusters.push(found); }
    e.people.forEach(function (id) {
      var other = group[id];
      if (other && other !== found) {   // merge two groups this edge joins
        other.people.forEach(function (p) { if (found.people.indexOf(p) < 0) found.people.push(p); group[p] = found; });
        found.edges = found.edges.concat(other.edges);
        clusters.splice(clusters.indexOf(other), 1);
      }
      if (found.people.indexOf(id) < 0) found.people.push(id);
      group[id] = found;
    });
    found.edges.push(e);
  });
  return clusters;
}

function relationshipWebClusterSvg(cluster, byId) {
  var k = cluster.people.length, w = 220, h = k === 2 ? 64 : 170, cx = w / 2, cy = k === 2 ? 26 : h / 2, radius = k === 2 ? 55 : 50, pos = {};
  cluster.people.forEach(function (id, i) {
    var a = (k === 2 ? Math.PI : -Math.PI / 2) + (2 * Math.PI * i) / k;
    pos[id] = { x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a), a: a };
  });
  var s = '<svg class="web-graph" viewBox="0 0 ' + w + ' ' + h + '" aria-hidden="true" focusable="false">';
  cluster.edges.forEach(function (e) {
    for (var i = 0; i < e.people.length; i++) for (var j = i + 1; j < e.people.length; j++) {
      var a = pos[e.people[i]], b = pos[e.people[j]];
      s += '<line class="web-line web-' + e.learned + '" x1="' + a.x.toFixed(1) + '" y1="' + a.y.toFixed(1) +
        '" x2="' + b.x.toFixed(1) + '" y2="' + b.y.toFixed(1) + '"/>';
    }
  });
  cluster.people.forEach(function (id) {
    var q = pos[id], name = byId[id].name.replace(/^Professor /, 'Prof. '), above = Math.sin(q.a) < -0.5;
    s += '<circle class="web-node" cx="' + q.x.toFixed(1) + '" cy="' + q.y.toFixed(1) + '" r="6"/>' +
      '<text class="web-name" x="' + q.x.toFixed(1) + '" y="' + (q.y + (above ? -12 : 20)).toFixed(1) + '" text-anchor="middle">' +
      esc(name.length > 14 ? name.slice(0, 13) + '…' : name) + '</text>';
  });
  return s + '</svg>';
}

function relationshipWebSvg(web) {
  var byId = {};
  web.people.forEach(function (p) { byId[p.id] = p; });
  return '<div class="web-clusters" role="img" aria-label="' + web.people.length + ' people and ' + web.edges.length +
    ' connections, drawn as groups. The same connections are listed below.">' +
    relationshipWebClusters(web).map(function (c) { return relationshipWebClusterSvg(c, byId); }).join('') + '</div>';
}

function openRelationshipWeb() {
  var web = relationshipWebKnown(), byId = {};
  web.people.forEach(function (p) { byId[p.id] = p; });
  var h = '<section class="relationship-web"><h2>Who knows whom</h2>' +
    '<p class="muted">Only people you have met, and only what you have seen or been told. There is always more to learn.</p>';
  if (!web.edges.length) {
    h += '<p>You have not worked out how anyone here is connected yet. Meet a few more people and it will start to fill in.</p>';
  } else {
    h += '<div class="web-graph-wrap">' + relationshipWebSvg(web) + '</div>' +
      '<p class="small web-key"><span class="web-key-public">dashed</span> known around town · <span class="web-key-deep">solid</span> something you have learned</p>' +
      '<ul class="web-list">';
    web.edges.forEach(function (e) {
      h += '<li><b>' + esc(relationshipWebNames(e.people, byId)) + '</b>: ' + esc(e.public) + '.' +
        (e.deep ? '<br><span class="web-deep">What you have learned: ' + esc(e.deep) + '</span>' : '') + '</li>';
    });
    h += '</ul>';
  }
  h += '<button class="primary" onclick="closeModal()">Close</button></section>';
  modal(h);
}
