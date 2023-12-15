require('dotenv').config();
import { Sequelize } from 'sequelize';
const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(`${DATABASE_URL}`, {
  logging: false,
  native: false, 
});


export { sequelize };
