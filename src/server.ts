import { App } from './app';
import { sequelize } from './database/sequelize';
import { Login } from './database/models/login';

const app = new App();

Login.sync({ alter: true })
  .then(() => {
    console.log('Tabele sincronizada');
  })
  .catch((error) => {
    console.log(error);
  });

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3003;

sequelize.sync({ alter: true }).then(() => {
  console.log('conectado');
  app.listen(PORT);
});
