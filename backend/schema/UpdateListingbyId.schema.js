const updatelistingbyidschema = {
    summary: "Update Listing by Id",
    tags: ['Properties'],
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'integer', description: 'The property ID' }
        }
    },
    body: {
        type: 'object',
        properties: {
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
            }
        }
    },
    response: {
        200: { type: 'string' },
        500: { type: 'string' },
        404: { type: 'string' }
    }
}

module.exports = { updatelistingbyidschema };