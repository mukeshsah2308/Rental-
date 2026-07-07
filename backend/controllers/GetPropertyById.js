const { sql, poolPromise } = require('../db');

async function getPropertyById(request, reply) {
    try {
        const { id } = request.params;
        const pool = await poolPromise;
        
        const result = await pool.request()
            .input('id', sql.Int, id)
            .execute('sp_GetPropertyById');
            
        if (!result.recordset || result.recordset.length === 0) {
            return reply.status(404).send({ message: 'Property not found' });
        }
        
        const row = result.recordset[0];
        
        // Parse JSON string columns (amenities and photos) back into arrays
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
        
        const property = {
            ...row,
            amenities,
            photos
        };
        
        return reply.send(property);
    } catch (err) {
        request.log.error(err);
        return reply.status(500).send('Database error');
    }
}

module.exports = { getPropertyById };
