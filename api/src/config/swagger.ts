import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import path from 'path';

const _path = path.join(__dirname, '../presentation/routes/*.ts');
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Payment api',
      version: '1.0.0',
      description: 'API Documentation',
    },
  },
  apis: [_path], // Adjust path based on where your route files are
};

const swaggerSpec = swaggerJsdoc(options);

console.log(_path);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
