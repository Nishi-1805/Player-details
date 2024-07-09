const express = require('express');
const router = express.Router();
const playerController = require('../controllers/PlayerController');

router.post('/', playerController.createPlayer);
router.get('/:id', playerController.getPlayer);
router.get('/:id/data', playerController.getPlayerData);

module.exports = router;
