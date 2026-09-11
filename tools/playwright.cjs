const fs = require('fs');
const os = require('os');
const path = require('path');

function load(candidate) {
  try {
    return require(candidate);
  } catch (error) {
    if (error && error.code === 'MODULE_NOT_FOUND') return null;
    throw error;
  }
}

function findPlaywright(root, depth) {
  if (depth < 0 || !fs.existsSync(root)) return null;
  const direct = path.join(root, 'node_modules', 'playwright');
  if (fs.existsSync(path.join(direct, 'package.json'))) return direct;

  let entries;
  try {
    entries = fs.readdirSync(root, { withFileTypes: true });
  } catch (_) {
    return null;
  }

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name === 'node_modules') continue;
    const found = findPlaywright(path.join(root, entry.name), depth - 1);
    if (found) return found;
  }
  return null;
}

const configured = process.env.PLAYWRIGHT_PATH;
const cached = findPlaywright(path.join(os.homedir(), '.cache'), 8);
const playwright = load('playwright') || (configured && load(configured)) || (cached && load(cached));

if (!playwright) {
  throw new Error('Playwright was not found. Install it locally or set PLAYWRIGHT_PATH.');
}

module.exports = playwright;
