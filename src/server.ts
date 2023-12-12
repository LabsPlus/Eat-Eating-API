import { App } from './app';
import { sequelize } from './database/sequelize';
const app = new App();

sequelize.sync({ alter: true }).then(() => {
  console.log('conectado');
  app.listen(3000);
});
