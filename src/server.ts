import { App } from './app';
import { sequelize } from './database/sequelize.databases';
import { Login } from './database/models/login.models';

const app = new App();

Login.sync({ alter: true })
  .then(() => {
    console.log('Tabele sincronizada');
  })
  .catch((error) => {
    console.log(error);
  });

const PORT = 3003;

sequelize.sync({ alter: true }).then(() => {
  console.log('conectado');
  app.listen(PORT);
});
