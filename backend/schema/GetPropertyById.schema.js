const propertyObjectSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        propertyId: { type: 'integer' },
        listingTitle: { type: 'string' },
        description: { type: 'string' },
        propertyType: { type: 'string' },
        availableFrom: { type: 'string', nullable: true },
        category: { type: 'string' },
        monthlyRent: { type: 'integer' },
        securityDeposit: { type: 'integer', nullable: true },
        maintenanceFees: { type: 'integer', nullable: true },
        address: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
        zipCode: { type: 'string' },
        amenities: {
            type: 'array',
            items: { type: 'string' }
        },
        photos: {
            type: 'array',
            items: { type: 'string' }
        },
        createdAt: { type: 'string' }
    }
};

const getPropertyByIdSchema = {
    summary: 'Get a single property by its ID',
    tags: ['Properties'],
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'integer', description: 'The property ID' }
        }
    },
    response: {
        200: propertyObjectSchema,
        404: {
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        },
        500: { type: 'string' }
    }
};

module.exports = { getPropertyByIdSchema };
