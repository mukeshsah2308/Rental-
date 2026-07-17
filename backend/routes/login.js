// const { loginSchema} = require('../schemas/login.schema'); // Error: path not found ('schemas' vs 'schema')
const { loginSchema } = require('../schema/login.schema');
const { getUserDetailsSchema } = require('../schema/GetUserDetails.schema');
const { login } = require('../controllers/login');
const { getUserDetails } = require('../controllers/GetUserDetails');

async function authRoutes(fastify) {
    // fastify.post('/api/login', { schema: loginSchema }, login); // Error: frontend expects '/api/auth/login'
    fastify.post('/api/auth/login', { schema: loginSchema }, login);
    fastify.get('/api/users/:id', { schema: getUserDetailsSchema }, getUserDetails);
}

module.exports = authRoutes;