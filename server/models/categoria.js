const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd');

const Categoria = sequelize.define('Categoria', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nombre_categoria',  // Nombre de la columna en la base de datos
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'descripcion_categoria',  // Nombre correcto de la columna en la base de datos
    },
});

module.exports = Categoria;
