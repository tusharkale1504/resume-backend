// controllers/resumeController.js
const sequelize = require('../db/db');
const Candidate = require('../models/candidateModel');
const Skill = require('../models/skillModel');
const Education = require('../models/educationModel');
const Certificate = require('../models/certificateModel');
const Project = require('../models/projectModel');
const Hobby = require('../models/hobbyModel');
const Experience = require('../models/experienceModel');
const Contact = require('../models/contactModel');
const Company = require('../models/companyModel');

// Create resume: insert related entries for a given candidate_id
exports.createResume = async (req, reply) => {
  const {
    candidate_id,
    skills,
    education,
    certificates,
    projects,
    hobbies,
    experiences,
    contacts,
    companies,
  } = req.body;

  if (!candidate_id) {
    return reply.code(400).send({ message: 'candidate_id is required' });
  }

  // Verify candidate exists
  const candidate = await Candidate.findByPk(candidate_id);
  if (!candidate) {
    return reply.code(404).send({ message: 'Candidate not found' });
  }

  const t = await sequelize.transaction();
  try {
    // Optional: prevent duplicate resume insert: check if any entry exists, then error.
    // Example: if you want to prevent multiple calls, uncomment:
    // const exists = await Skill.findOne({ where: { candidate_id }, transaction: t });
    // if (exists) {
    //   await t.rollback();
    //   return reply.code(400).send({ message: 'Resume data already exists for this candidate' });
    // }

    const bulkCreateIfAny = async (Model, items, keyName) => {
      if (!Array.isArray(items) || items.length === 0) return;
      const rows = items.map(item => ({ ...item, [keyName]: candidate_id }));
      await Model.bulkCreate(rows, { transaction: t });
    };

    await bulkCreateIfAny(Skill, skills, 'candidate_id');
    await bulkCreateIfAny(Education, education, 'candidate_id');
    await bulkCreateIfAny(Certificate, certificates, 'candidate_id');
    await bulkCreateIfAny(Project, projects, 'candidate_id');
    await bulkCreateIfAny(Hobby, hobbies, 'candidate_id');
    await bulkCreateIfAny(Experience, experiences, 'candidate_id');
    await bulkCreateIfAny(Contact, contacts, 'candidate_id');
    await bulkCreateIfAny(Company, companies, 'candidate_id');

    await t.commit();

    // Return the full resume
    const full = await Candidate.findByPk(candidate_id, {
      attributes: { exclude: ['password'] },
      include: [
        { model: Skill, attributes: { exclude: ['candidate_id'] } },
        { model: Education, attributes: { exclude: ['candidate_id'] } },
        { model: Certificate, attributes: { exclude: ['candidate_id'] } },
        { model: Project, attributes: { exclude: ['candidate_id'] } },
        { model: Hobby, attributes: { exclude: ['candidate_id'] } },
        { model: Experience, attributes: { exclude: ['candidate_id'] } },
        { model: Contact, attributes: { exclude: ['candidate_id'] } },
        { model: Company, attributes: { exclude: ['candidate_id'] } },
      ],
    });
    reply.code(201).send(full);
  } catch (err) {
    await t.rollback();
    req.log.error(err);
    reply.code(500).send({ message: 'Error creating resume', error: err.message });
  }
};

// Get resume: fetch candidate + related entries
exports.getResume = async (req, reply) => {
  try {
    const { candidateId } = req.params;
    const candidate = await Candidate.findByPk(candidateId, {
      attributes: { exclude: ['password'] },
      include: [
        { model: Skill, attributes: { exclude: ['candidate_id'] } },
        { model: Education, attributes: { exclude: ['candidate_id'] } },
        { model: Certificate, attributes: { exclude: ['candidate_id'] } },
        { model: Project, attributes: { exclude: ['candidate_id'] } },
        { model: Hobby, attributes: { exclude: ['candidate_id'] } },
        { model: Experience, attributes: { exclude: ['candidate_id'] } },
        { model: Contact, attributes: { exclude: ['candidate_id'] } },
        { model: Company, attributes: { exclude: ['candidate_id'] } },
      ],
    });
    if (!candidate) {
      return reply.code(404).send({ message: 'Candidate not found' });
    }
    reply.send(candidate);
  } catch (err) {
    req.log.error(err);
    reply.code(500).send({ message: 'Error fetching resume', error: err.message });
  }
};
