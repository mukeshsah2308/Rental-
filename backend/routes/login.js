// const { loginSchema} = require('../schemas/login.schema'); // Error: path not found ('schemas' vs 'schema')
const { loginSchema } = require('../schema/login.schema');
const { login } = require('../controllers/login');

async function authRoutes(fastify) {
    // fastify.post('/api/login', { schema: loginSchema }, login); // Error: frontend expects '/api/auth/login'
    fastify.post('/api/auth/login', { schema: loginSchema }, login);
}

module.exports = authRoutes;