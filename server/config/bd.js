const { config } = require('dotenv');
const { Sequelize } = require('sequelize');

config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  username: process.env.PGUSER,
  password: process.env.POSTGRES_PASSWORD,
  DB: process.env.POSTGRES_DB,
  dialect: "postgres",
  port: process.env.PGPORT, 
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  timezone: 'America/La_Paz',
});

module.exports = sequelize;
