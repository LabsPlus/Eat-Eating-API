require('dotenv').config();
import { Sequelize } from 'sequelize';
import { User } from './models/user';
const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(`${DATABASE_URL}`, {
  logging: false,
  native: false,
});

User.sync({ alter: true }).then(() => {
  console.log('Tabele user feita');
});

export { sequelize };
