const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../util/database');

const playerModel = sequelize.define('Player', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dateOfBirth: {
    type: Sequelize.DATE,
    allowNull: false
  },
  photoUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  birthPlace: {
    type: Sequelize.STRING,
    allowNull: false
  },
  career: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  numberOfMatches: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  fifties: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  centuries: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  wickets: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  averages: {
    type: Sequelize.DECIMAL,
    allowNull: false
  }
});

module.exports = playerModel;
