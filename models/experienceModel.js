// models/experienceModel.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db');
const Candidate = require('./candidateModel');

class Experience extends Model {}

Experience.init(
  {
    experience_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING(60),
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
    modelName: 'Experience',
    tableName: 'experience',
    timestamps: true,
    underscored: true,
  }
);

Candidate.hasMany(Experience, { foreignKey: 'candidate_id' });
Experience.belongsTo(Candidate, { foreignKey: 'candidate_id' });

module.exports = Experience;
