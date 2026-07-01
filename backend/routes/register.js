const { registerSchema } = require('../schema/register.schema');
const { register } = require('../controllers/register');

async function registerRoutes(fastify) {
    fastify.post('/api/auth/register', { schema: registerSchema }, register);
}

module.exports = registerRoutes;
