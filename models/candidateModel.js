// models/candidateModel.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db');

class Candidate extends Model {}

Candidate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Candidate',
    tableName: 'candidates',
    timestamps: true,
    underscored: true,
  }
);

module.exports = Candidate;
