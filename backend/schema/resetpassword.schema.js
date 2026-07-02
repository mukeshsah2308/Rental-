const forgotPasswordSchema = {
    summary: 'Request password reset',
    tags: ['Auth'],
    body: {
        type: 'object',
        required: ['email'],
        properties: {
            email: { type: 'string', format: 'email' }
        }
    },
    response: {
        // Re-enabled devResetLink for the client redirect helper button per user request.
        200: {
            type: 'object',
            properties: {
                message: { type: 'string' },
                devResetLink: { type: 'string' }
            }
        },
        400: { type: 'string' },
        500: { type: 'string' }
    }
};

const resetPasswordSchema = {
    summary: 'Reset password using token',
    tags: ['Auth'],
    body: {
        type: 'object',
        required: ['token', 'newPassword'],
        properties: {
            token: { type: 'string' },
            newPassword: { type: 'string', minLength: 6 }
        }
    },
    response: {
        200: { type: 'object', properties: { message: { type: 'string' } } },
        400: { type: 'string' },
        500: { type: 'string' }
    }
};

module.exports = { forgotPasswordSchema, resetPasswordSchema };