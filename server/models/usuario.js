const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd');
const Categoria = require('./categoria'); 

const Usuario = sequelize.define('Usuario', {
    // atributos de tabla
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    } ,  
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categoria, // Hace referencia al modelo de Categoria
            key: 'id_categoria' // Hace referencia a la columna id_categoria de Categoria
        }
    } ,
    nombre_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
    } ,
    precio_total_usuario: {
        type: DataTypes.FLOAT,
        allowNull: false,
    } ,
    tamanio_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
    } ,
    imagen_usuario: {
        type: DataTypes.STRING,
        allowNull: true,
    } ,
    descripcion_usuario: {
        type: DataTypes.STRING,
        allowNull: true,
    } ,
    stok_actual_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    stok_min_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    fecha_modificacion: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    precio_inicial_usuario: {
        type: DataTypes.REAL,
        allowNull: false,
    } ,
    margen_usuario: {
        type: DataTypes.REAL,
        allowNull: false,
    } ,
}, {
    // nombre de la tabla
    tableName: 'usuario',
    timestamps: false, // desabilita la creacion automatica de fechas
});

module.exports = Usuario;
