import { App } from "./app";

const app = new App();

import { sequelize } from "./database/sequelize";

sequelize.sync({ alter: true }).then(() => {
  console.log("conecta");
  app.listen(3000);
});
