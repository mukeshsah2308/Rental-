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
        userId: { type: 'integer' }
    }
};

const getUserPropertiesSchema = {
    summary: 'Get properties by user ID',
    tags: ['Properties'],
    params: {
        type: 'object',
        properties: {
            userId: { type: 'string' }
        },
        required: ['userId']
    },
    response: {
        200: {
            type: 'array',
            items: propertyObjectSchema
        },
        500: { type: 'string' }
    }
};

module.exports = { getUserPropertiesSchema };
