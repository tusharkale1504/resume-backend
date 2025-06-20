// // models/index.js
// import { sequelize } from '../db/db.js';
// import Candidate from './candidateModel.js';
// import Skill from './skillModel.js';
// import Education from './educationModel.js';
// import Certificate from './certificateModel.js';
// import Project from './projectModel.js';
// import Hobby from './hobbyModel.js';
// import Experience from './experienceModel.js';
// import Contact from './contactModel.js';
// import Company from './companyModel.js';

// // Define associations:
// [
//   Skill, Education, Certificate, Project,
//   Hobby, Experience, Contact, Company
// ].forEach(model => {
//   Candidate.hasMany(model,   { foreignKey: 'candidate_id', onDelete: 'CASCADE' });
//   model.belongsTo(Candidate, { foreignKey: 'candidate_id' });
// });

// export {
//   sequelize,
//   Candidate, Skill, Education, Certificate,
//   Project, Hobby, Experience, Contact, Company
// };
