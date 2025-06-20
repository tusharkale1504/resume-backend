// models/skillModel.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db');
const Candidate = require('./candidateModel');

class Skill extends Model {}

Skill.init(
  {
    skill_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    skill_name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    skill_level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 },
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
    modelName: 'Skill',
    tableName: 'skills',
    timestamps: true,
    underscored: true,
  }
);

// Associations:
Candidate.hasMany(Skill, { foreignKey: 'candidate_id' });
Skill.belongsTo(Candidate, { foreignKey: 'candidate_id' });

module.exports = Skill;
