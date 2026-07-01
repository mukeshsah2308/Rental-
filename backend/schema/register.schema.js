const registerSchema = {
    summary: 'Register a new user',
    tags: ['Auth'],
    body: {
        type: 'object',
        required: ['fullname', 'email', 'password'],
        properties: {
            fullname: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 }
        }
    },
    response: {
        201: {
            description: 'User registered successfully',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        },
        400: {
            description: 'Invalid input',
            type: 'object',
            properties: {
                error: { type: 'string' }
            }
        },
        500: {
            description: 'Internal server error',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    }
};

module.exports = { registerSchema };
