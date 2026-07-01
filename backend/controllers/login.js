const bcrypt = require('bcrypt');
const sql = require('mssql');
const { poolPromise } = require('../db');

async function login(request, reply) {
    const { email, password } = request.body || {};

    if (!email?.trim() || !password) {
        return reply.status(400).send("Email and password are required");
    }

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('email', sql.VarChar, email.trim())
            .execute('sp_GetUserByEmail');

        if (result.recordset.length === 0) {
            return reply.status(400).send("User not found");
        }

        const user = result.recordset[0];
        const isMatch = await bcrypt.compare(password, user.password || '');
        if (!isMatch) {
            return reply.status(400).send("Wrong password");
        }

        return reply.send({
            user: {
                id: user.user_id,
                fullname: user.fullname,
                email: user.email,
            },
        });

    } catch (err) {
        request.log.error(err);
        return reply.status(500).send("Database error");
    }
}

// module.exports = { login, register }; // Error: register is not defined
module.exports = { login };