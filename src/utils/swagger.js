import swaggerJsdoc from 'swagger-jsdoc';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const _filename = fileURLToPath(import.meta.url);
const __dirname = dirname(_filename);

const { SWAGGER_URL } = process.env;

const routes_path = join(__dirname, '../../src/routes/*.js');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hubspot API integration',
      description: 'This is a sample server for a hubspot API Users management',
      version: '0.0.1',
      contact: {
        name: 'Jose Medellin',
      },
      servers: [SWAGGER_URL || 'http://localhost:3400/'],
    },
  },
  apis: [routes_path],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default swaggerDocs;
