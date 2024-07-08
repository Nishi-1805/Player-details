const express = require('express');
const router = express.Router();
const path = require('path');
const playerController = require('../controllers/PlayerController');
const Player = require('../models/playerModel')

router.get('/', playerController.getIndex);

//router.get('/', (req, res) => {
  //res.sendFile(__dirname + '/../views/player.html');
//});

router.post('/submit', playerController.submitForm);
router.get('/edit/:id', playerController.getEditPage);
//router.post('/edit/:id', playerController.updatePlayer);

router.post('/player', (req, res) => {
  const {
    name,
    dateOfBirth,
    photoUrl,
    birthPlace,
    career,
    noOfMatches,
    score,
    fifties,
    centuries,
    wickets,
    averages
  } = req.body;

  Player.create({
    name,
    dateOfBirth,
    photoUrl,
    birthPlace,
    career,
    noOfMatches,
    score,
    fifties,
    centuries,
    wickets,
    averages
  })
  .then((player) => {
    console.log(`Player created with ID: ${player.id}`);
    //res.send(`Player created with ID: ${player.id}`);
    res.redirect(`/playerdetails/${player.id}`); 
   // res.location('/player/' + player.id); // add this line
   // res.method('GET'); // add this line
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error creating player');
  });
});

//router.get('/player/:id', (req, res) => {
//    const playerId = req.params.id;
  //  Player.findById(playerId)
    //  .then((player) => {
      //  res.json(player);
//      })
  //    .catch((err) => {
    //    console.error(err);
      //  res.status(500).send('Error retrieving player');
    ///  });
  //});

  router.get('/playerdetails/:playerId', (req, res) => {
    const playerId = req.params.playerId;
    Player.findByPk(playerId)
      .then((player) => {
        if (!player) {
          res.status(404).send('Player not found');
        } else {
          res.sendFile(path.join(__dirname, '../views/playerdetails.html'));
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error retrieving player');
      });
  });
router.post('/edit/:id', playerController.updatePlayer);

module.exports = router; 
