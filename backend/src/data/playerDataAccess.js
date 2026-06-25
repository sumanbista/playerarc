// Data access layer — reads and parses player JSON files from disk.
// Isolated here so routes/services never touch fs directly.

const fs = require('fs/promises');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../data');
const PLAYERS_DIR = path.join(DATA_DIR, 'players');
const INDEX_PATH = path.join(DATA_DIR, '_index/players_index.json');

async function readJsonFile(filePath) {
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw);
}

async function getPlayersIndex() {
  return readJsonFile(INDEX_PATH);
}

async function getPlayerById(playerId) {
  const filePath = path.join(PLAYERS_DIR, `${playerId}.json`);
  try {
    return await readJsonFile(filePath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return null;
    }
    throw err;
  }
}

module.exports = { getPlayersIndex, getPlayerById };
