const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('vivero', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',  // O el dialecto de tu base de datos
  timezone: 'America/La_Paz',
});

module.exports = sequelize;
