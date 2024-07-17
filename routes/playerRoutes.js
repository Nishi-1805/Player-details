const express = require('express');
const router = express.Router();
const playerController = require('../controllers/PlayerController');

router.get('/search', playerController.searchPlayer);
router.post('/', playerController.createPlayer);
router.get('/:id', playerController.getPlayer);
router.get('/:id/data', playerController.getPlayerData);
router.get('/:id/edit', playerController.getEditPlayer);
router.put('/:id', playerController.updatePlayer);


module.exports = router;
