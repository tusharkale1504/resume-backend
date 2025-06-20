// models/companyModel.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db');
const Candidate = require('./candidateModel');

class Company extends Model {}

Company.init(
  {
    company_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    industry: {
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
    modelName: 'Company',
    tableName: 'companies',
    timestamps: true,
    underscored: true,
  }
);

Candidate.hasMany(Company, { foreignKey: 'candidate_id' });
Company.belongsTo(Candidate, { foreignKey: 'candidate_id' });

module.exports = Company;
