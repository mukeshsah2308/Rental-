const loginSchema = {
    summary: 'Login a user',
    tags: ['Auth'],
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 }
        }
    },
    response: {
        200: {
            description: 'Login successful',
            type: 'object',
            properties: {
                user: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        fullname: { type: 'string' },
                        email: { type: 'string' }
                    }
                }
            }
        },
        400: { description: 'Invalid input / user not found / wrong password', type: 'string' },
        500: { description: 'Internal server error', type: 'string' }
    }
};


module.exports = { loginSchema};