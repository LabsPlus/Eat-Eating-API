import {App} from "./app";

new App().server.listen(3000);

/*const app = require("./src/app.js");
const { sequelize } = require("./src/db.js");
require("dotenv").config();
const { PORT } = process.env;

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`);
  });
});*/
