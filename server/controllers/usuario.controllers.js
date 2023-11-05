const Usuario = require('../models/usuario');

const crearUsuario = async (req, res) => {
    const { id_tipo_usuario, nombre_usuario, ci_usuario, celular_usuario, 
        correo_usuario ,fecha_nacimiento_usuario, genero_usuario,contrasenia_usuario,
        } = req.body;

    try {
        const nuevoUsuario = await Usuario.create({
            id_tipo_usuario,
            nombre_usuario,
            ci_usuario,
            celular_usuario, 
            correo_usuario,
            fecha_nacimiento_usuario,
            genero_usuario,
            contrasenia_usuario,
        });
        // Formatea la fecha de creación antes de enviarla en la respuesta
        const fechaCreacion = new Date(nuevoUsuario.fecha_registro_usuario);
        const usuarioFormateado = {
            ...nuevoUsuario.toJSON(),
            fecha_registro_usuario: fechaCreacion.toLocaleString()
        };
        
        return res.status(201).json({ mensaje: 'Usuario creado exitosamente', usuario: usuarioFormateado });
    } catch (error) {
        console.error('Error al crear Usuario:', error);
        return res.status(500).json({ error: 'Error al crear Usuario', message: error.message });
    }
}

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();

        // Formatea las fechas antes de enviarlas en la respuesta
        const usuariosFormateados = usuarios.map(usuario => {
            const options = { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit',
            };

            const fechaCreacion = new Date(usuario.fecha_registro_usuario); // Convierte a Date
            const fechaModificacion = new Date(usuario.fecha_modificacion); // Convierte a Date
            return {
                ...usuario.toJSON(),
                fecha_registro_usuario: fechaCreacion.toLocaleString('es-ES', options),  // Formatea la fecha a tu preferencia
                fecha_modificacion: fechaModificacion.toLocaleString('es-ES', options),
            };
        });

        return res.json(usuariosFormateados);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return res.status(500).json({ error: 'Error al obtener usuarios', message: error.message });
    }
};

const obtenerUsuario = async (req, res) => {
    const idUsuario = req.params.id;
    try {
        const usuario = await Usuario.findByPk(idUsuario);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const modificarUsuario = async (req, res) => {
    const idUsuario = req.params.id;
    const { 
        nombre_usuario,
        ci_usuario,
        celular_usuario, 
        correo_usuario,
        fecha_nacimiento_usuario,
        genero_usuario,
        contrasenia_usuario
    } = req.body;

    try {
        const usuarioModificado = await Usuario.findByPk(idUsuario);

        // Verificar exitencia
        if (!usuarioModificado) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Actualizar el usuario con los nuevos datos
        await usuarioModificado.update({
            nombre_usuario,
            ci_usuario,
            celular_usuario, 
            correo_usuario,
            fecha_nacimiento_usuario,
            genero_usuario,
            contrasenia_usuario
        });

    return res.status(200).json({ message: 'Usuario modificada exitosamente', tipo_usuario: usuarioModificado });
    } catch (error) {
        console.error('Error al modificar usuario:', error);
        return res.status(500).json({ error: 'Error al modificar usuario', message: error.message });
    }
};

const eliminarUsuario = async (req, res) => {
    const idUsuario = req.params.id;

    try {
        const usuarioEliminado = await Usuario.findByPk(idUsuario);
    
        // Verificar existencia
        if (!usuarioEliminado) {
            return res.status(404).json({ error: 'Usuario no encontrada' });
        }
    
        // Eliminar la Usuario
        await usuarioEliminado.destroy();
    
        return res.status(200).json({ mensaje: 'Usuario eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar Usuario:', error);
        return res.status(500).json({ error: 'Error al eliminar Usuario', message: error.message });
    }
};

module.exports = { crearUsuario , obtenerUsuarios, modificarUsuario, eliminarUsuario,obtenerUsuario };