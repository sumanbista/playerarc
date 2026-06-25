// Player route definitions — delegates to playerController, no business logic here.

const express = require('express');
const playerController = require('../controllers/playerController');

const router = express.Router();

router.get('/', playerController.listPlayers);
router.get('/:id/summary', playerController.getPlayerSummary);
router.get('/:id', playerController.getPlayer);

module.exports = router;
