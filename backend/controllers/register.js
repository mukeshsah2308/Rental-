// const bcrypt = require('bcrypt');
// const sql = require('mssql');
// const { poolPromise } = require('../db');

// async function register(request, reply) {
//     const { fullname, email, password } = request.body || {};

//     if (!fullname?.trim() || !email?.trim() || !password) {
//         return reply.status(400).send({ error: "fullname, email, and password are required" });
//     }
//     try {
//         const hashpassword = await bcrypt.hash(password, 5);
//         const pool = await poolPromise;

//         const sqlQuery = `INSERT INTO users(fullname, email, password) VALUES(@fullname, @email, @password)`;

//         await pool.request()
//             .input('fullname', sql.VarChar, fullname)
//             .input('email', sql.VarChar, email)
//             .input('password', sql.VarChar, hashpassword)
//             .query(sqlQuery);

//         return reply.status(201).send({ message: "User registered successfully" });

//     } catch (err) {
//         request.log.error(err);
//         return reply.status(500).send({ message: "Internal server error" });
//     }
// }

// module.exports = { register };

const bcrypt = require('bcrypt');
const sql = require('mssql');
const { poolPromise } = require('../db');

async function register(request, reply) {
    const { fullname, email, password } = request.body || {};

    if (!fullname?.trim() || !email?.trim() || !password) {
        return reply.status(400).send({ error: "fullname, email, and password are required" });
    }

    try {
        const hashpassword = await bcrypt.hash(password, 5);
        const pool = await poolPromise;

        const result = await pool.request()
            .input('fullname', sql.VarChar(150), fullname)
            .input('email', sql.VarChar(255), email)
            .input('password', sql.VarChar(255), hashpassword)
            .execute('sp_RegisterUser');

        const newUserId = result.recordset?.[0]?.newUserId;

        return reply.status(201).send({
            message: "User registered successfully",
            userId: newUserId,
        });

    } catch (err) {
        // Duplicate email raised via THROW in the procedure
        if (err.message?.includes('Email already registered')) {
            return reply.status(409).send({ message: "Email already registered" });
        }

        request.log.error(err);
        return reply.status(500).send({ message: "Internal server error" });
    }
}

module.exports = { register };