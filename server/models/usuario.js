const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd');
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
        /* references: {
            model: Tipo_Usuario, // Hace referencia al modelo de Tipo_Usuario
            key: 'id_tipo_usuario' // Hace referencia a la columna id_tipo_usuario de Tipo_Usuario
        } */
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
        allowNull: false,
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
        type: DataTypes.INTEGER,
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
}, {
    // nombre de la tabla
    tableName: 'usuario',
    timestamps: false, // desabilita la creacion automatica de fechas
});

Usuario.belongsTo(Tipo_Usuario, { foreignKey: 'id_tipo_usuario' });

module.exports = Usuario;
