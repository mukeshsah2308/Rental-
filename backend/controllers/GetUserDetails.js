const sql = require('mssql');
const { poolPromise } = require('../db');

async function getUserDetails(request, reply) {
    try {
        const { id } = request.params;
        //console.log(id);

        const pool = await poolPromise;

        const result = await pool
            .request()
            .input('id', sql.Int, id)
            .execute('GetUserDetails');

        if (result.recordset.length === 0) {
            return reply.status(404).send({
                message: "User not found"
            });
        }

        console.log(result.recordset[0]); // Prints user in terminal

        return reply.status(200).send(result.recordset[0]);

    } catch (err) {
        console.error(err);
        return reply.status(500).send({
            message: err.message
        });
    }
}

module.exports = { getUserDetails };