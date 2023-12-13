import { App } from "./app";

const app = new App();

import { sequelize } from "./database/sequelize";
import User from "./database/models/User";

sequelize.sync({ alter: true }).then(() => {
  console.log("conecta");
  app.listen(3000);
});

User.sync({alter: true}).then(()=>{
  console.log("foi");
}); 

