const {DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../util/database');

const playerModel = sequelize.define('Player', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  dateOfBirth: {
    type: Sequelize.DATE
  },
  photoUrl: {
    type: Sequelize.STRING
  },
  birthPlace: {
    type: Sequelize.STRING
  },
  career: {
    type: Sequelize.STRING(1000)
  },
  noOfMatches: {
    type: Sequelize.INTEGER
  },
  score: {
    type: Sequelize.INTEGER
  },
  fifties: {
    type: Sequelize.INTEGER
  },
  centuries: {
    type: Sequelize.INTEGER
  },
  wickets: {
    type: Sequelize.INTEGER
  },
  averages: {
    type: Sequelize.INTEGER
  }
});

module.exports = playerModel;
