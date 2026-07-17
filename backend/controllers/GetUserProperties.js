const { poolPromise, sql } = require('../db');

async function getUserProperties(request, reply) {
    try {
        const { userId } = request.params;
        const parsedUserId = userId ? parseInt(userId, 10) : null;
        if (!parsedUserId) {
            return reply.status(400).send('Invalid user ID');
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', sql.Int, parsedUserId)
            .query('SELECT * FROM PropertyListing WHERE userId = @userId');

        // Parse JSON string columns (amenities and photos) back into arrays
        const properties = result.recordset.map(row => {
            let amenities = [];
            let photos = [];
            try {
                amenities = row.amenities ? JSON.parse(row.amenities) : [];
            } catch (e) {
                amenities = [];
            }
            try {
                photos = row.photos ? JSON.parse(row.photos) : [];
            } catch (e) {
                photos = [];
            }
            return {
                ...row,
                amenities,
                photos
            };
        });

         return reply.send(properties);
    } catch (err) {
        request.log.error(err);
        return reply.status(500).send('Database error');
    }
}

module.exports = { getUserProperties };
