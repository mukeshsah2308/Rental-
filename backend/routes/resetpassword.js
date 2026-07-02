// Note: Changed from '../schemas/resetpassword.schema' because the folder name is 'schema' (singular) and not 'schemas' (plural)
// const { forgotPasswordSchema, resetPasswordSchema } = require('../schemas/resetpassword.schema');
const { forgotPasswordSchema, resetPasswordSchema } = require('../schema/resetpassword.schema');
const { forgotPassword, resetPassword } = require('../controllers/resetpassword');

async function authRoutes(fastify, options) {
    fastify.post('/api/auth/forgot-password', { schema: forgotPasswordSchema }, forgotPassword);
    fastify.post('/api/auth/reset-password', { schema: resetPasswordSchema }, resetPassword);
}

module.exports = authRoutes;