const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd');
const Categoria = require('./categoria'); 

const Producto = sequelize.define('Producto', {
    // atributos de tabla
    id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },  
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        /* references: {
            model: Categoria, // Hace referencia al modelo de Categoria
            key: 'id_categoria' // Hace referencia a la columna id_categoria de Categoria
        } */
    },
    nombre_producto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio_total_producto: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    tamanio_producto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imagen_producto: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    descripcion_producto: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    stok_actual_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    stok_min_producto: {
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
    precio_inicial_producto: {
        type: DataTypes.REAL,
        allowNull: false,
    },
    margen_producto: {
        type: DataTypes.REAL,
        allowNull: false,
    },
}, {
    // nombre de la tabla
    tableName: 'producto',
    timestamps: false, // desabilita la creacion automatica de fechas
});

Producto.belongsTo(Categoria, { foreignKey: 'id_categoria' });

module.exports = Producto;
