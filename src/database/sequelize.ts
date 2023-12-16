require('dotenv').config();
import { Sequelize } from 'sequelize';
const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in .env file');
}
const sequelize = new Sequelize(`${DATABASE_URL}`, {
  logging: false,
  native: false, 
});


export { sequelize };
