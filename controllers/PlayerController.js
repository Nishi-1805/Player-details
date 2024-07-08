const playerModel = require('../models/playerModel');

exports.getIndex = (req, res) => {
  res.sendFile(__dirname + '/../views/player.html');
};

exports.submitForm = (req, res) => {
  const playerData = req.body;
  playerModel.create(playerData)
  .then(player => {
    console.log(`Player created with ID: ${player.id}`);
    res.redirect(`/player/${player.id}`);
  })
  .catch(err => {
    console.error(err);
    res.status(500).send('Error submitting form');
  });
};


exports.getEditPage = (req, res) => {
  const playerId = req.params.id;
  playerModel.findByPk(playerId)
   .then(player => {
        res.render('../views/player', { player: player });
    })
   .catch(err => {
      console.error(err);
      res.status(404).send('Player not found');
    });
};

exports.updatePlayer = (req, res) => {
  const playerId = req.params.id;
  const updatedData = req.body;
  playerModel.update(updatedData, {
    where: {
      id: playerId
    }
  })
  .then(() => {
    console.log(`Player updated with ID: ${playerId}`);
    res.redirect(`/player/${playerId}`);
  })
  .catch(err => {
    console.error(err);
    res.status(500).send('Error updating player');
  });
};
