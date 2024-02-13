const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd.js');
const TipoTransaccion = require('./tipoTransaccion'); 
const Usuario = require('./usuario');
const Producto = require('./producto');


const Transaccion = sequelize.define('Transaccion', {
    // atributos de tabla
    id_transaccion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },  
    id_tipo_transaccion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cantidad_ingreso: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cantidad_salida: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_transaccion: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    detalle_transaccion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    // nombre de la tabla
    tableName: 'transaccion',
    timestamps: false, // desabilita la creacion automatica de fechas
});

Transaccion.belongsTo(TipoTransaccion, { foreignKey: 'id_tipo_transaccion' });
Transaccion.belongsTo(Producto, { foreignKey: 'id_producto' });
Transaccion.belongsTo(Usuario, { foreignKey: 'id_usuario' });

module.exports = Transaccion;
