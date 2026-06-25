// Player controller — maps HTTP requests to playerService and formats responses.

const playerService = require('../services/playerService');

async function listPlayers(req, res, next) {
  try {
    const index = await playerService.listPlayers();
    res.json(index);
  } catch (err) {
    next(err);
  }
}

async function getPlayer(req, res, next) {
  try {
    const player = await playerService.getPlayer(req.params.id);
    if (!player) {
      return res.status(404).json({
        error: 'Player not found',
        message: `No player file exists for id "${req.params.id}"`,
      });
    }
    res.json(player);
  } catch (err) {
    next(err);
  }
}

async function getPlayerSummary(req, res, next) {
  try {
    const filters = {
      competition_type: req.query.competition_type,
      country: req.query.country,
      year: req.query.year,
    };

    const summary = await playerService.getPlayerSummary(req.params.id, filters);
    if (!summary) {
      return res.status(404).json({
        error: 'Player not found',
        message: `No player file exists for id "${req.params.id}"`,
      });
    }
    res.json(summary);
  } catch (err) {
    next(err);
  }
}

module.exports = { listPlayers, getPlayer, getPlayerSummary };
