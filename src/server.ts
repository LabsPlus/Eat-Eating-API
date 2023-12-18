import { App } from './app';
import { sequelize } from './database/sequelize';
import { User } from './database/models/user';

const app = new App();

User.sync({ alter: true }).then(() => {
  console.log('Tabele user sincronizada');
});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3003;

sequelize.sync({ alter: true }).then(() => {
  console.log('conectado');
  app.listen(PORT);
});
