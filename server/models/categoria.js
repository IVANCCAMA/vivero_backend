const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd.js');

const Categoria = sequelize.define('Categoria', {
    // atributos de tabla
    id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre_categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion_categoria: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
}, {
    // nombre de la tabla
    tableName: 'categoria',
    timestamps: false, // desabilita la creacion automatica de fechas
});

module.exports = Categoria;
