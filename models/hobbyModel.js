// models/hobbyModel.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db');
const Candidate = require('./candidateModel');

class Hobby extends Model {}

Hobby.init(
  {
    hobby_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hobby_name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    candidate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Candidate, key: 'id' },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'Hobby',
    tableName: 'hobbies',
    timestamps: true,
    underscored: true,
  }
);

Candidate.hasMany(Hobby, { foreignKey: 'candidate_id' });
Hobby.belongsTo(Candidate, { foreignKey: 'candidate_id' });

module.exports = Hobby;
