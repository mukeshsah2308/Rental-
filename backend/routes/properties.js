const { getPropertyList } = require('../controllers/GetPropertyList');
const { GetPropertyListingSchema } = require('../schema/GetPropertyList.schema');

const { getPropertyByIdSchema } = require('../schema/GetPropertyById.schema');
const { getUserPropertiesSchema } = require('../schema/GetUserProperties.schema');


const { getPropertyById } = require('../controllers/GetPropertyById');
const { getUserProperties } = require('../controllers/GetUserProperties');

const{updatelistingbyid} = require('../controllers/UpdateListingbyId');
const{updatelistingbyidschema} = require('../schema/UpdateListingbyId.schema');

async function propertiesRoutes(fastify) {

    fastify.get('/api/properties', { schema: GetPropertyListingSchema }, getPropertyList);
    fastify.get('/api/properties/:id', { schema: getPropertyByIdSchema }, getPropertyById);
    fastify.get('/api/properties/user/:userId', { schema: getUserPropertiesSchema }, getUserProperties);

    fastify.put('/api/properties/:id', { schema: updatelistingbyidschema }, updatelistingbyid);
}

module.exports = propertiesRoutes;

