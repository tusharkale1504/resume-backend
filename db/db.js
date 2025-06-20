// db/db.js
const { Sequelize } = require('sequelize');

// Replace with your actual Postgres credentials
const sequelize = new Sequelize(  'resumes',
  'postgres',
  'tushar@2003', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // set true to see SQL logs
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to PostgreSQL successfully.');
  } catch (err) {
    console.error('❌ PostgreSQL connection error:', err);
    process.exit(1);
  }
}
testConnection();

module.exports = sequelize;
