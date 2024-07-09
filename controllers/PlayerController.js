const Player = require('../models/playerModel');
const path = require('path');

exports.createPlayer = async (req, res) => {
  try {
    const { name, dateOfBirth, photoUrl, birthPlace, career, numberOfMatches, score, fifties, centuries, wickets, averages } = req.body;

    // Basic validation
    if (!name || !dateOfBirth || !photoUrl || !birthPlace || !career || !numberOfMatches || !score || !fifties || !centuries || !wickets || !averages) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    const player = await Player.create({
      name,
      dateOfBirth,
      photoUrl,
      birthPlace,
      career,
      numberOfMatches,
      score,
      fifties,
      centuries,
      wickets,
      averages,
    });

    res.json({ id: player.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create player' });
  }
};
exports.getPlayer = async (req, res) => {
  res.sendFile(path.join(__dirname, '../views/playerdetails.html'));
};

exports.getPlayerData = async (req, res) => {
  const playerId = req.params.id;
  try {
    const player = await Player.findByPk(playerId);
    if (!player) {
      res.status(404).json({ error: 'Player not found' });
    } else {
      res.json(player);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve player' });
  }
};
