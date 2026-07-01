const propertiesSchema = {
    summary: 'Publish a new property listing',
    tags: ['Properties'],
    body: {
        type: 'object',
        required: [
            'listingTitle',
            'description',
            'propertyType',
            'category',
            'monthlyRent',
            'address',
            'city',
            'state',
            'zipCode'
        ],
        properties: {
            listingTitle: { type: 'string' },
            description: { type: 'string' },
            propertyType: { type: 'string' },
            availableFrom: { type: 'string', nullable: true },
            category: { type: 'string' },
            monthlyRent: { type: 'string' },
            securityDeposit: { type: 'string', nullable: true },
            maintenanceFees: { type: 'string', nullable: true },
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
            }
        }
    },
    response: {
        201: {
            description: 'Property published successfully',
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                message: { type: 'string' }
            }
        },
        500: {
            description: 'Internal server error',
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                message: { type: 'string' }
            }
        }
    }
};

module.exports = { propertiesSchema };
