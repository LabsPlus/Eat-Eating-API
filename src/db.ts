require("dotenv").config();
import { Sequelize } from "sequelize";
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DIALECT } =
  process.env;


const sequelize = new Sequelize(
  `${DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { logging: false, native: false }
);
export {sequelize};
