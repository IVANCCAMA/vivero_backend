const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd.js');

const TipoUsuario = sequelize.define('TipoUsuario', {
    // atributos de tabla
    id_tipo_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    tipo_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    // nombre de la tabla
    tableName: 'tipo_usuario',
    timestamps: false, // desabilita la creacion automatica de fechas
});

module.exports = TipoUsuario;
