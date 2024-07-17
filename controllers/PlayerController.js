const Player = require('../models/playerModel');
const path = require('path');
const { Op } = require('sequelize');

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

// In your server-side code
exports.getEditPlayer = async (req, res) => {
  const playerId = req.params.id;
  try {
    const player = await Player.findByPk(playerId);
    if (!player) {
      res.status(404).json({ error: 'Player not found' });
    } else {
      res.sendFile(path.join(__dirname, '../views/player.html'), {
        playerId: playerId,
        playerData: JSON.stringify(player.dataValues)
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve player' });
  }
};

exports.updatePlayer = async (req, res) => {
  const playerId = req.body.playerId;
  const updatedData = req.body;

  try {
    const player = await Player.findByPk(playerId);
    if (!player) {
      res.status(404).json({ error: 'Player not found' });
    } else {
      player.name = updatedData.name;
      player.dateOfBirth = new Date(updatedData.dateOfBirth); // parse date string to timestamp
      player.photoUrl = updatedData.photoUrl; // update photo URL
      player.birthPlace = updatedData.birthPlace;
      player.career = updatedData.career; // update career information
      player.numberOfMatches = updatedData.numberOfMatches;
      player.score = updatedData.score;
      player.fifties = updatedData.fifties;
      player.centuries = updatedData.centuries;
      player.wickets = updatedData.wickets;
      player.averages = updatedData.averages;

      await player.save();
      console.log('Player updated:', player);
      res.json(player);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update player' });
  }
};

exports.searchPlayer = async (req, res) => {
  console.log('Search player function called');
  const searchQuery = req.query.name;
  try {
    const player = await Player.findOne({
      where: {
        name: {
          [Op.like]: `%${searchQuery}%`
        }
      }
    });
    console.log(`Player found: ${player}`);
    if (player) {
      res.json({ id: player.id });
    } else {
      res.status(404);
      res.json({ error: 'Player not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ error: 'Failed to search for player' });
  }
};
