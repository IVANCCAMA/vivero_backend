const { config } = require('dotenv');
const { Sequelize } = require('sequelize');

config()
console.log(">>>>>>>>", process.env.DB_HOST, "\n");
console.log(">>>>>>>>", process.env.DB_NAME, "\n");
const sequelize = new Sequelize(process.env.DB_HOST, {
  dialect: 'postgres',  // O el dialecto de tu base de datos
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // solo si estás utilizando un certificado autofirmado
    }
  },
  timezone: 'America/La_Paz',
});


module.exports = sequelize;
