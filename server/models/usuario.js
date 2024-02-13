const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const Tipo_Usuario = require('./tipoUsuario'); 

const Usuario = sequelize.define('Usuario', {
    // atributos de tabla
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },  
    id_tipo_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nombre_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ci_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    celular_usuario: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    correo_usuario: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fecha_nacimiento_usuario: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    genero_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_registro_usuario: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    fecha_modificacion: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    contrasenia_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    activo_usuario: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
}, {
    // nombre de la tabla
    tableName: 'usuario',
    timestamps: false, // desabilita la creacion automatica de fechas
});

Usuario.belongsTo(Tipo_Usuario, { foreignKey: 'id_tipo_usuario' });

module.exports = Usuario;
