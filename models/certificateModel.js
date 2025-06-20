// models/certificateModel.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db');
const Candidate = require('./candidateModel');

class Certificate extends Model {}

Certificate.init(
  {
    certificate_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    issuing_organization: {
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
    modelName: 'Certificate',
    tableName: 'certificates',
    timestamps: true,
    underscored: true,
  }
);

Candidate.hasMany(Certificate, { foreignKey: 'candidate_id' });
Certificate.belongsTo(Candidate, { foreignKey: 'candidate_id' });

module.exports = Certificate;
