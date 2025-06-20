// models/educationModel.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db');
const Candidate = require('./candidateModel');

class Education extends Model {}

Education.init(
  {
    education_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    degree: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    institution: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING(4),
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
    modelName: 'Education',
    tableName: 'education',
    timestamps: true,
    underscored: true,
  }
);

Candidate.hasMany(Education, { foreignKey: 'candidate_id' });
Education.belongsTo(Candidate, { foreignKey: 'candidate_id' });

module.exports = Education;
