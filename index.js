// index.js
const fastify = require('fastify')({ logger: true });
const sequelize = require('./db/db');

// Load models so associations are registered
require('./models/candidateModel');
require('./models/skillModel');
require('./models/educationModel');
require('./models/certificateModel');
require('./models/projectModel');
require('./models/hobbyModel');
require('./models/experienceModel');
require('./models/contactModel');
require('./models/companyModel');

// Register routes
fastify.register(require('./routes/candidateRoutes'));
fastify.register(require('./routes/resumeRoutes'));

// Optionally print routes after ready
fastify.ready().then(() => {
  console.log(fastify.printRoutes());
});

const start = async () => {
  try {
    await sequelize.sync({ alter: true });
    await fastify.listen({ port: 3000 });
    console.log('🚀 Fastify running at http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
