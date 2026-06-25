// Player business logic — orchestrates data access and summary calculation.

const playerDataAccess = require('../data/playerDataAccess');
const { calculatePlayerSummary } = require('./summaryCalculationService');

async function listPlayers() {
  return playerDataAccess.getPlayersIndex();
}

async function getPlayer(playerId) {
  return playerDataAccess.getPlayerById(playerId);
}

async function getPlayerSummary(playerId, filters) {
  const player = await playerDataAccess.getPlayerById(playerId);
  if (!player) return null;
  return calculatePlayerSummary(player, filters);
}

module.exports = { listPlayers, getPlayer, getPlayerSummary };
