const { propertiesSchema } = require('../schema/properties.schema');
const { getPropertyListSchema } = require('../schema/GetPropertyList.schema');
const { getPropertyByIdSchema } = require('../schema/GetPropertyById.schema');
const { getUserPropertiesSchema } = require('../schema/GetUserProperties.schema');

const { publishProperty } = require('../controllers/properties');
const { getPropertyList } = require('../controllers/GetPropertyList');
const { getPropertyById } = require('../controllers/GetPropertyById');
const { getUserProperties } = require('../controllers/GetUserProperties');

async function propertiesRoutes(fastify) {
    fastify.post('/api/properties', { schema: propertiesSchema }, publishProperty);
    fastify.get('/api/properties', { schema: getPropertyListSchema }, getPropertyList);
    fastify.get('/api/properties/:id', { schema: getPropertyByIdSchema }, getPropertyById);
    fastify.get('/api/properties/user/:userId', { schema: getUserPropertiesSchema }, getUserProperties);
}

module.exports = propertiesRoutes;

