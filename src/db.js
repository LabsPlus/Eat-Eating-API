require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DIALECT } =
  process.env;

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  `${DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { logging: false, native: false }
);

module.exports = {
  sequelize,
  ...sequelize.models,
};
