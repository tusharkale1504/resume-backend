// routes/candidateRoutes.js
const fp = require('fastify-plugin');
const {
  createCandidate,
  getAllCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
} = require('../controllers/candidateController');

async function candidateRoutes(fastify, _opts) {
  fastify.post('/candidates', createCandidate);
  fastify.get('/candidates', getAllCandidates);
  fastify.get('/candidates/:id', getCandidateById);
  fastify.put('/candidates/:id', updateCandidate);
  fastify.delete('/candidates/:id', deleteCandidate);
}

module.exports = fp(candidateRoutes);
