import { App } from './app';
import { sequelize } from './database/sequelize';
import { User } from './database/models/user';

const app = new App();

User.sync({ alter: true }).then(() => {
  console.log('Tabele user sincronizada');
});

sequelize.sync({ alter: true }).then(() => {
  console.log('conectado');
  app.listen(3000);
});
