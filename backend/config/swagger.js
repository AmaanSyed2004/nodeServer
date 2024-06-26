// backend/config/swagger.js

const swaggerJsdoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NodeJS API for login/register",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
