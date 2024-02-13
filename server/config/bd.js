const { config } = require('dotenv');
const { Sequelize } = require('sequelize');

config();

// Crear la conexión de Sequelize
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // solo si estás utilizando un certificado autofirmado
    }
  },
  timezone: 'America/La_Paz',
});

const tipoUsuario  = require('../models/tipoUsuario')

tipoUsuario.sync({ force: true });
console.log("The table for the User model was just (re)created!");

const usuario  = require('../models/usuario')

usuario.sync({ force: true });
console.log("The table for the User model was just (re)created!");

const categoria  = require('../models/categoria')

categoria.sync({ force: true });
console.log("The table for the User model was just (re)created!");

const producto  = require('../models/producto')

producto.sync({ force: true });
console.log("The table for the User model was just (re)created!");

const tipoTransaccion  = require('../models/tipoTransaccion')

tipoTransaccion.sync({ force: true });
console.log("The table for the User model was just (re)created!");

const transaccion  = require('../models/transaccion')

transaccion.sync({ force: true });
console.log("The table for the User model was just (re)created!");

module.exports = sequelize;

