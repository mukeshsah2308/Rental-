const { propertiesSchema } = require('../schema/properties.schema');
const { publishProperty } = require('../controllers/properties');

async function propertiesRoutes(fastify) {
    fastify.post('/api/properties', { schema: propertiesSchema }, publishProperty);
}

module.exports = propertiesRoutes;
