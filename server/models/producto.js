const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
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
    cod_producto: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    // nombre de la tabla
    tableName: 'producto',
    timestamps: false, // desabilita la creacion automatica de fechas
});

Producto.belongsTo(Categoria, { foreignKey: 'id_categoria' });
console.log("Verificaión>>>>", Producto === sequelize.models.Producto); // true


module.exports = Producto;
