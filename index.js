// index.js  (CommonJS)
const fastify   = require('fastify')({ logger: true });
const sequelize = require('./db/db');

// ────────────────────────────────────
// 1.  CORS  (← new)
//    npm i @fastify/cors
// ────────────────────────────────────
fastify.register(require('@fastify/cors'), {
  origin: '*',                     // dev: allow everything
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,               // allow cookies/auth headers if needed
});

// ────────────────────────────────────
// 2.  Load models so associations exist
// ────────────────────────────────────
require('./models/candidateModel');
require('./models/skillModel');
require('./models/educationModel');
require('./models/certificateModel');
require('./models/projectModel');
require('./models/hobbyModel');
require('./models/experienceModel');
require('./models/contactModel');
require('./models/companyModel');

// ────────────────────────────────────
// 3.  Register route plugins
// ────────────────────────────────────
fastify.register(require('./routes/candidateRoutes'));
fastify.register(require('./routes/resumeRoutes'));

// Optional: print a nice table of all routes
fastify.ready().then(() => console.log(fastify.printRoutes()));

// ────────────────────────────────────
// 4.  Start the server
// ────────────────────────────────────
(async () => {
  try {
    await sequelize.sync({ alter: true });     // auto‑create/update tables
    await fastify.listen({ port: 3000 });
    console.log('🚀 Fastify running at http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
