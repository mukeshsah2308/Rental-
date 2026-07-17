const { poolPromise } = require('../db');

async function getPropertyList(request, reply) {
    try {
        const pool = await poolPromise;
        const result = await pool.request().execute('sp_GetAllProperties');
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

module.exports = { getPropertyList };