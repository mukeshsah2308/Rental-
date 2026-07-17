const getUserDetailsSchema = {
    summary: 'Get user details by ID',
    tags: ['User'],
    params: {
        type: 'object',
        properties: {
            id: { type: 'integer' }
        },
        required: ['id']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                user_id: { type: 'integer' },
                fullname: { type: 'string' },
                email: { type: 'string' },
                provider: { type: 'string', nullable: true },
                provider_id: { type: 'string', nullable: true },
                createdAt: { type: 'string', nullable: true }
            }
        },
        404: {
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        },
        500: {
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    }
};

module.exports = { getUserDetailsSchema };
