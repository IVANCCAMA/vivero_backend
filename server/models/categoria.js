const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

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

// Verifica si el modelo se ha definido correctamente
console.log("Verificaión>>>>", Categoria === sequelize.models.Categoria); // true

module.exports = Categoria;
