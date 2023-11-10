const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd');

const TipoTransaccion = sequelize.define('TipoTransaccion', {
    // atributos de tabla
    id_tipo_transaccion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    tipo_transaccion: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    // nombre de la tabla
    tableName: 'tipo_transaccion',
    timestamps: false, // desabilita la creacion automatica de fechas
});

module.exports = TipoTransaccion;
