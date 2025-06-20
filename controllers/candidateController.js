// controllers/candidateController.js
const Candidate = require('../models/candidateModel');
const bcrypt = require('bcrypt');

// helper
async function hashPassword(plain) {
  return bcrypt.hash(plain, 10);
}

// Create candidate
exports.createCandidate = async (req, reply) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return reply.code(400).send({ message: 'name, email, and password are required' });
    }
    const hashed = await hashPassword(password);
    const candidate = await Candidate.create({ name, email, password: hashed });
    // exclude password in response if desired; here sending full object
    reply.code(201).send(candidate);
  } catch (err) {
    req.log.error(err);
    reply.code(500).send({ message: 'Error creating candidate', error: err.message });
  }
};

// Get all candidates
exports.getAllCandidates = async (req, reply) => {
  try {
    const rows = await Candidate.findAll({ attributes: { exclude: ['password'] } });
    reply.send(rows);
  } catch (err) {
    req.log.error(err);
    reply.code(500).send({ message: 'Error fetching candidates', error: err.message });
  }
};

// Get by ID
exports.getCandidateById = async (req, reply) => {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findByPk(id, { attributes: { exclude: ['password'] } });
    if (!candidate) {
      return reply.code(404).send({ message: 'Candidate not found' });
    }
    reply.send(candidate);
  } catch (err) {
    req.log.error(err);
    reply.code(500).send({ message: 'Error fetching candidate', error: err.message });
  }
};

// Update candidate
exports.updateCandidate = async (req, reply) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const candidate = await Candidate.findByPk(id);
    if (!candidate) {
      return reply.code(404).send({ message: 'Candidate not found' });
    }
    if (name) candidate.name = name;
    if (email) candidate.email = email;
    if (password) candidate.password = await hashPassword(password);
    await candidate.save();
    // exclude password in response if desired
    reply.send(candidate);
  } catch (err) {
    req.log.error(err);
    reply.code(500).send({ message: 'Error updating candidate', error: err.message });
  }
};

// Delete candidate
exports.deleteCandidate = async (req, reply) => {
  try {
    const { id } = req.params;
    const deleted = await Candidate.destroy({ where: { id } });
    if (!deleted) {
      return reply.code(404).send({ message: 'Candidate not found' });
    }
    reply.code(204).send();
  } catch (err) {
    req.log.error(err);
    reply.code(500).send({ message: 'Error deleting candidate', error: err.message });
  }
};
