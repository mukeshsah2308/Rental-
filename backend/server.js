require('dotenv').config();
const fastify = require('fastify')({ logger: true });

// Express by default parses empty bodies as {} when content-type is JSON.
// Fastify throws a 400 Bad Request (FST_ERR_CTP_EMPTY_JSON_BODY) when receiving an empty JSON body.
// To keep compatibility with the frontend which sends POST /api/auth without a body,
// we define a custom content-type parser to handle empty bodies.
fastify.addContentTypeParser('application/json', { parseAs: 'string' }, (req, body, done) => {
  if (!body || body.trim() === '') {
    done(null, {});
    return;
  }
  try {
    const json = JSON.parse(body);
    done(null, json);
  } catch (err) {
    err.statusCode = 400;
    done(err, undefined);
  }
});

const bcrypt = require('bcrypt');
const { sql, poolPromise } = require('./db');
const cors = require('@fastify/cors');
const admin = require('./FirebaseAdmin');
//swagger
const fastifySwagger = require('@fastify/swagger');
const fastifySwaggerUi = require('@fastify/swagger-ui');

// Register CORS
fastify.register(cors);

// Register Swagger (Dynamic Mode)
fastify.register(fastifySwagger, {
    openapi: {
        info: {
            title: "My Backend API",
            description: "API Testing using Swagger",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:5002"
            }
        ]
    }
});

// Register Swagger UI
fastify.register(fastifySwaggerUi, {
    routePrefix: '/api-docs',
    uiConfig: {
        docExpansion: 'list',
        deepLinking: false
    }
});

// Register Routes
fastify.register(require('./routes/login'));
fastify.register(require('./routes/register'));
fastify.register(require('./routes/properties'));
fastify.register(require('./routes/resetpassword'));

// Firebase Social Login / Token Verification
const authSchema = {
    summary: 'Firebase Social Login / Token Verification',
    tags: ['Auth'],
    headers: {
        type: 'object',
        properties: {
            authorization: { type: 'string', description: 'Bearer token from Firebase (e.g. Bearer <token>)' }
        }
    },
    response: {
        200: {
            description: 'Authentication successful',
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
        401: {
            description: 'No token provided',
            type: 'object',
            properties: {
                error: { type: 'string' }
            }
        },
        500: {
            description: 'Internal server error',
            type: 'object',
            properties: {
                error: { type: 'string' }
            }
        }
    }
};

fastify.post("/api/auth", { schema: authSchema }, async (request, reply) => {
    try {
        const token = request.headers.authorization?.split("Bearer ")[1];

        if (!token) {
            return reply.status(401).send({ error: "No token provided" });
        }

        // Verify Firebase token
        const decodedToken = await admin.auth().verifyIdToken(token);
        const { uid, email, name } = decodedToken;

        const pool = await poolPromise;

        // Check if user exists in database
        let userResult = await pool.request()
            .input('email', sql.VarChar, email)
            .query("SELECT * FROM users WHERE email = @email");

        if (userResult.recordset.length === 0) {
            // Create new user if doesn't exist
            const insertQuery = `INSERT INTO users(fullname, email, provider, provider_id) 
                                OUTPUT inserted.user_id, inserted.fullname, inserted.email
                                VALUES(@fullname, @email, @provider, @provider_id)`;

            userResult = await pool.request()
                .input('fullname', sql.VarChar, name || email)
                .input('email', sql.VarChar, email)
                .input('provider', sql.VarChar, 'firebase')
                .input('provider_id', sql.VarChar, uid)
                .query(insertQuery);
        }

        const userData = userResult.recordset[0];
        return reply.status(200).send({
            user: {
                id: userData.user_id,
                fullname: userData.fullname,
                email: userData.email
            }
        });

    } catch (error) {
        request.log.error("Auth error:", error);
        return reply.status(500).send({ error: error.message || "Authentication failed" });
    }
});


const rootSchema = {
    summary: 'Returns a hello world message',
    response: {
        200: {
            type: 'string',
            description: 'A hello world message'
        }
    }
};

fastify.get("/", { schema: rootSchema }, async (request, reply) => {
    return reply.send("hello world");
});

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    await fastify.listen({ port: parseInt(PORT, 10), host: '0.0.0.0' });
    console.log(`server is running on port ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();