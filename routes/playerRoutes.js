const express = require('express');
const router = express.Router();
const playerController = require('../controllers/PlayerController');

router.post('/', playerController.createPlayer);
router.get('/:id', playerController.getPlayer);
router.get('/:id/data', playerController.getPlayerData);
router.get('/:id/edit', playerController.getEditPlayer);
router.put('/:id', playerController.updatePlayer);

console.log('Defining search route...');
router.get('/players/search', playerController.searchPlayer);

module.exports = router;
