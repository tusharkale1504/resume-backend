// routes/resumeRoutes.js
const fp = require('fastify-plugin');
const { createResume, getResume } = require('../controllers/resumeController');

async function resumeRoutes(fastify, _opts) {
  fastify.post('/resumes', createResume);
  fastify.get('/resumes/:candidateId', getResume);
}

module.exports = fp(resumeRoutes);
