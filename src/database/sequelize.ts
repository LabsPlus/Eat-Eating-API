require("dotenv").config();
import { Sequelize } from "sequelize";
import User from "./models/User"
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DIALECT, DATABASE_URL } =
  process.env;


const sequelize = new Sequelize(
  `${DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { logging: false, native: false }
);

/*const sequelize = new Sequelize(`${DATABASE_URL}`, {
  logging: false,
  native: false,
});*/


export {sequelize};
