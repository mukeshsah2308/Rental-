const sql = require('mssql');
const { poolPromise } = require('../db');

async function updatelistingbyid(request, reply) {
    try {
        const { id } = request.params;
        const {
            listingTitle,
            description,
            propertyType,
            availableFrom,
            category,
            monthlyRent,
            securityDeposit,
            maintenanceFees,
            address,
            city,
            state,
            zipCode,
            amenities,
            photos
        } = request.body || {};

        const pool = await poolPromise;

        const parsedMonthlyRent = monthlyRent ? parseInt(monthlyRent, 10) : null;
        const parsedSecurityDeposit = securityDeposit ? parseInt(securityDeposit, 10) : null;
        const parsedMaintenanceFees = maintenanceFees ? parseInt(maintenanceFees, 10) : null;
        const parsedAvailableFrom = availableFrom || null;
        const stringifiedAmenities = amenities ? JSON.stringify(amenities) : null;
        const stringifiedPhotos = photos ? JSON.stringify(photos) : null;

        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('listingTitle', sql.NVarChar(255), listingTitle)
            .input('description', sql.NVarChar(sql.MAX), description)
            .input('propertyType', sql.NVarChar(100), propertyType)
            .input('availableFrom', sql.Date, parsedAvailableFrom)
            .input('category', sql.NVarChar(100), category)
            .input('monthlyRent', sql.Int, monthlyRent)
            .input('securityDeposit', sql.Int, parsedSecurityDeposit)
            .input('maintenanceFees', sql.Int, parsedMaintenanceFees)
            .input('address', sql.NVarChar(255), address)
            .input('city', sql.NVarChar(100), city)
            .input('state', sql.NVarChar(100), state)
            .input('zipCode', sql.NVarChar(20), zipCode)
            .input('amenities', sql.NVarChar(sql.MAX), stringifiedAmenities)
            .input('photos', sql.NVarChar(sql.MAX), stringifiedPhotos)
            .query(`
                UPDATE PropertyListing 
                SET 
                    listingTitle = @listingTitle,
                    description = @description,
                    propertyType = @propertyType,
                    availableFrom = @availableFrom,
                    category = @category,
                    monthlyRent = @monthlyRent,
                    securityDeposit = @securityDeposit,
                    maintenanceFees = @maintenanceFees,
                    address = @address,
                    city = @city,
                    state = @state,
                    zipCode = @zipCode,
                    amenities = @amenities,
                    photos = @photos
                WHERE id = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return reply.status(404).send('Property not found');
        }

        return reply.status(200).send('Updated successfull');
    } catch (err) {
        console.error(err);
        return reply.status(500).send('Internal Server error');
    }
}

module.exports = { updatelistingbyid };