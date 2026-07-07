// const { sql, poolPromise } = require('../db');

// async function publishProperty(request, reply) {
//     try {
//         const {
//             listingTitle,
//             description,
//             propertyType,
//             availableFrom,
//             category,

//             monthlyRent,
//             securityDeposit,
//             maintenanceFees,

//             address,
//             city,
//             state,
//             zipCode,

//             amenities,
//             photos,
//         } = request.body || {};

//         const pool = await poolPromise;

//         // Parse fields to correct types to avoid casting issues in SQL Server
//         const parsedMonthlyRent = monthlyRent ? parseInt(monthlyRent, 10) : null;
//         const parsedSecurityDeposit = securityDeposit ? parseInt(securityDeposit, 10) : null;
//         const parsedMaintenanceFees = maintenanceFees ? parseInt(maintenanceFees, 10) : null;
//         const parsedAvailableFrom = availableFrom || null;

//         await pool.query`
//       INSERT INTO PropertyListing (
//         listingTitle,
//         description,
//         propertyType,
//         availableFrom,
//         category,

//         monthlyRent,
//         securityDeposit,
//         maintenanceFees,

//         address,
//         city,
//         state,
//         zipCode,

//         amenities,
//         photos
//       )

//       VALUES (
//         ${listingTitle},
//         ${description},
//         ${propertyType},
//         ${parsedAvailableFrom},
//         ${category},

//         ${parsedMonthlyRent},
//         ${parsedSecurityDeposit},
//         ${parsedMaintenanceFees},

//         ${address},
//         ${city},
//         ${state},
//         ${zipCode},

//         ${JSON.stringify(amenities)},
//         ${JSON.stringify(photos)}
//       )
//     `;

//         return reply.status(201).send({
//             success: true,
//             message: "Property published successfully",
//         });

//     } catch (err) {
//         request.log.error("Error publishing property:", err);
//         return reply.status(500).send({
//             success: false,
//             message: "Internal server error",
//         });
//     }
// }

// module.exports = { publishProperty };


const { sql, poolPromise } = require('../db');

async function publishProperty(request, reply) {
    try {
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
            photos,
            userId,
        } = request.body || {};

        const pool = await poolPromise;

        const parsedMonthlyRent = monthlyRent ? parseInt(monthlyRent, 10) : null;
        const parsedSecurityDeposit = securityDeposit ? parseInt(securityDeposit, 10) : null;
        const parsedMaintenanceFees = maintenanceFees ? parseInt(maintenanceFees, 10) : null;
        const parsedAvailableFrom = availableFrom || null;
        const parsedUserId = userId ? parseInt(userId, 10) : null;

        const result = await pool.request()
            .input('listingTitle', sql.NVarChar(255), listingTitle)
            .input('description', sql.NVarChar(sql.MAX), description)
            .input('propertyType', sql.NVarChar(100), propertyType)
            .input('availableFrom', sql.Date, parsedAvailableFrom)
            .input('category', sql.NVarChar(100), category)

            .input('monthlyRent', sql.Int, parsedMonthlyRent)
            .input('securityDeposit', sql.Int, parsedSecurityDeposit)
            .input('maintenanceFees', sql.Int, parsedMaintenanceFees)

            .input('address', sql.NVarChar(255), address)
            .input('city', sql.NVarChar(100), city)
            .input('state', sql.NVarChar(100), state)
            .input('zipCode', sql.NVarChar(20), zipCode)

            .input('amenities', sql.NVarChar(sql.MAX), JSON.stringify(amenities))
            .input('photos', sql.NVarChar(sql.MAX), JSON.stringify(photos))
            .input('userId', sql.Int, parsedUserId)

            .execute('sp_PublishProperty');

        const newPropertyId = result.recordset?.[0]?.newPropertyId;

        return reply.status(201).send({
            success: true,
            message: "Property published successfully",
            propertyId: newPropertyId,
        });

    } catch (err) {
        request.log.error("Error publishing property:", err);
        return reply.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
}

module.exports = { publishProperty };