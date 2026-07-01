const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Backend API",
      version: "1.0.0",
      description: "API Testing using Swagger",
    },
    servers: [
      {
        url: "http://localhost:5002",
      },
    ],
  },

  apis: ["./server.js"], // path of route files
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;