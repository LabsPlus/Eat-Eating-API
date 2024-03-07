import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Eat-Eating',
      version: '1.0.0',
      description: `Esta API é responsável por gerenciar os accesos ao restaurante do IFBA.
      Utiliza TypeScript, Jest para testes, Express como framework, Nodemailer para o envio de e-mails,
      Swagger para documentação.`,
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
