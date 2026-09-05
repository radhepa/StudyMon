// Downloads Gen-1 Pokemon data + sprites + cries from PokeAPI into local assets.
// Run once:  node tools/fetch-pokeapi.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const API = 'https://pokeapi.co/api/v2';
let DEX_IDS = [];

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function getJSON(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error(r.status + ' ' + url);
      return await r.json();
    } catch (e) {
      if (i === tries - 1) throw e;
      await sleep(400 * (i + 1));
    }
  }
}

async function download(url, dest, tries = 4) {
  if (!url) return false;
  try { await fs.access(dest); return true; } catch { }
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error(r.status);
      await fs.writeFile(dest, Buffer.from(await r.arrayBuffer()));
      return true;
    } catch (e) {
      if (i === tries - 1) { console.warn('  ! failed ' + url); return false; }
      await sleep(400 * (i + 1));
    }
  }
}

async function pool(items, limit, fn) {
  const out = new Array(items.length);
  let idx = 0;
  await Promise.all(Array.from({ length: limit }, async () => {
    while (idx < items.length) {
      const i = idx++;
      out[i] = await fn(items[i], i);
    }
  }));
  return out;
}

const TYPES = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel',
  'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'];

const MOVE_POOL = ['tackle', 'scratch', 'pound', 'quick-attack', 'ember', 'water-gun', 'vine-whip',
  'thunder-shock', 'gust', 'peck', 'bite', 'confusion', 'rock-throw', 'bubble', 'absorb', 'lick',
  'poison-sting', 'karate-chop', 'mud-slap', 'powder-snow', 'metal-claw', 'fury-attack', 'wing-attack',
  'razor-leaf', 'bubble-beam', 'psybeam', 'aurora-beam', 'flamethrower', 'thunderbolt', 'ice-beam',
  'surf', 'hydro-pump', 'fire-blast', 'thunder', 'blizzard', 'psychic', 'earthquake', 'rock-slide',
  'body-slam', 'slash', 'dig', 'strength', 'mega-punch', 'mega-kick', 'hyper-beam', 'solar-beam',
  'sludge', 'sludge-bomb', 'shadow-ball', 'crunch', 'iron-tail', 'dragon-rage', 'dragon-claw',
  'twineedle', 'pin-missile', 'bone-club', 'bonemerang', 'egg-bomb', 'drill-peck', 'sky-attack',
  'night-shade', 'swift', 'tri-attack', 'hyper-fang', 'crabhammer', 'fire-punch', 'ice-punch',
  'thunder-punch', 'seismic-toss', 'submission', 'high-jump-kick', 'double-kick', 'low-kick',
  'rolling-kick', 'waterfall', 'petal-dance', 'stomp', 'headbutt', 'horn-attack', 'fury-swipes',
  'constrict', 'wrap', 'bind', 'vice-grip', 'skull-bash', 'take-down', 'double-edge', 'thrash',
  'acid', 'smog', 'flame-wheel', 'spark', 'zap-cannon', 'psywave', 'leech-life', 'mega-drain',
  'giga-drain', 'magnitude', 'sand-tomb', 'ancient-power', 'extreme-speed', 'steel-wing',
  'flash-cannon', 'dark-pulse', 'shadow-claw', 'air-slash', 'energy-ball', 'dragon-pulse',
  'focus-blast', 'stone-edge', 'x-scissor', 'poison-jab', 'aqua-tail', 'seed-bomb', 'fire-fang',
  'ice-fang', 'thunder-fang', 'play-rough', 'dazzling-gleam', 'moonblast', 'draining-kiss',
  'brick-break', 'rock-tomb', 'shadow-punch', 'signal-beam', 'water-pulse', 'heat-wave',
  // Gen 2 and Gen 3 additions
  'fury-cutter', 'megahorn', 'cross-chop', 'dynamic-punch', 'mach-punch', 'vital-throw',
  'rock-smash', 'outrage', 'twister', 'octazooka', 'shadow-ball', 'crunch', 'sludge-bomb',
  'aerial-ace', 'blaze-kick', 'sky-uppercut', 'arm-thrust', 'rock-blast', 'meteor-mash',
  'crush-claw', 'silver-wind', 'shock-wave', 'muddy-water', 'mud-shot', 'needle-arm',
  'magical-leaf', 'extrasensory', 'luster-purge', 'mist-ball', 'superpower', 'astonish',
  'poison-fang', 'overheat', 'sand-tomb', 'bullet-seed', 'icicle-spear', 'leaf-blade',
  'blast-burn', 'aeroblast', 'sacred-fire', 'crabhammer', 'spark', 'return'];

async function main() {
  const A = p => path.join(ROOT, 'assets', p);
  const catalog = await getJSON(API + '/pokemon-species?limit=10000');
  DEX_IDS = catalog.results.map(s => Number(s.url.split('/').filter(Boolean).pop())).sort((a,b)=>a-b);
  if (catalog.next || DEX_IDS.length !== catalog.count) throw new Error('Incomplete species catalog');

  console.log('- type chart');
  const chart = {};
  for (const t of TYPES) {
    const d = await getJSON(API + '/type/' + t);
    const r = d.damage_relations;
    chart[t] = {
      double: r.double_damage_to.map(x => x.name),
      half: r.half_damage_to.map(x => x.name),
      none: r.no_damage_to.map(x => x.name)
    };
  }

  console.log('- pokemon: ' + DEX_IDS.length + ' species');
  const ids = DEX_IDS;
  const mons = await pool(ids, 8, async id => {
    const s = await getJSON(API + '/pokemon-species/' + id);
    const p = await getJSON(s.varieties.find(v => v.is_default).pokemon.url);
    const fe = s.flavor_text_entries.find(f => f.language.name === 'en');
    const ge = s.genera.find(g => g.language.name === 'en');
    const stats = {};
    for (const st of p.stats) stats[st.stat.name] = st.base_stat;
    if (DEX_IDS.indexOf(id) % 25 === 0) console.log('   .. #' + id);
    return {
      id: s.id,
      name: s.name,
      types: p.types.map(t => t.type.name),
      stats: stats,
      height: p.height,
      weight: p.weight,
      genus: ge ? ge.genus : '',
      flavor: (fe ? fe.flavor_text : '').replace(/[\n\f]/g, ' ').replace(/\s+/g, ' ').trim(),
      capture_rate: s.capture_rate,
      legendary: !!(s.is_legendary || s.is_mythical),
      evoChainUrl: s.evolution_chain ? s.evolution_chain.url : null,
      learnset: p.moves.map(m => m.move.name),
      _front: p.sprites.front_default,
      _back: p.sprites.back_default,
      _shiny: p.sprites.front_shiny,
      _art: p.sprites.other['official-artwork'].front_default,
      _cry: p.cries ? (p.cries.latest || p.cries.legacy) : null
    };
  });

  console.log('- evolution chains');
  const chainUrls = [...new Set(mons.map(m => m.evoChainUrl).filter(Boolean))];
  const chains = await pool(chainUrls, 8, u => getJSON(u));
  const evo = {};
  const walk = node => {
    for (const nxt of node.evolves_to) {
      const det = nxt.evolution_details[0] || {};
      if (!evo[node.species.name]) evo[node.species.name] = [];
      evo[node.species.name].push({
        to: nxt.species.name,
        level: det.min_level || null,
        trigger: det.trigger ? det.trigger.name : 'level-up',
        item: det.item ? det.item.name : null
      });
      walk(nxt);
    }
  };
  chains.forEach(c => walk(c.chain));

  console.log('- moves');
  const moves = {};
  const moveCatalog = await getJSON(API + '/move?limit=10000');
  await pool(moveCatalog.results.map(m => m.name), 8, async n => {
    try {
      const m = await getJSON(API + '/move/' + n);
      if (!m.power) return;
      const en = m.names.find(x => x.language.name === 'en');
      moves[n] = {
        label: en ? en.name : n,
        type: m.type.name,
        power: m.power,
        acc: m.accuracy || 100,
        pp: m.pp,
        cls: m.damage_class.name
      };
    } catch { }
  });
  console.log('   ' + Object.keys(moves).length + ' damaging moves');

  console.log('- sprites + cries');
  let done = 0;
  await pool(mons, 12, async m => {
    const front = m._front || m._art;
    for (const [kind,url] of [['front',front],['back',m._back || front],['shiny',m._shiny || front],['art',m._art || front]]) {
      if (!await download(url, A('sprites/' + kind + '/' + m.id + '.png'))) throw new Error('Missing asset '+kind+' #'+m.id);
    }
    m.hasCry = m._cry ? await download(m._cry, A('cries/' + m.id + '.ogg')) : false;
    if (++done % 25 === 0) console.log('   .. ' + done + '/' + mons.length);
  });

  for (const m of mons) {
    // hasCry reflects a successfully downloaded asset.
    delete m._front; delete m._back; delete m._shiny; delete m._art; delete m._cry;
    delete m.evoChainUrl;
  }

  await fs.writeFile(path.join(ROOT, 'tools', 'raw-pokeapi.json'),
    JSON.stringify({ mons, evo, chart, moves }));
  console.log('done -> ' + mons.length + ' pokemon, ' + Object.keys(evo).length + ' evo entries');
}
main().catch(e => { console.error(e); process.exit(1); });
