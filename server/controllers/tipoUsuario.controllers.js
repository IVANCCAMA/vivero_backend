const TipoUsuario = require('../models/tipoUsuario');

const crearTipoUsuario = async (req, res) => {
  const { tipo_usuario } = req.body;
  
  try {
    const nuevoTipoUsuario = await TipoUsuario.create({
      tipo_usuario
    });

    return res.status(201).json({ mensaje: 'Tipo Usuario creada exitosamente', tipo_usuario: nuevoTipoUsuario });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return res.status(500).json({ error: 'Error al crear usuario', message: error.message });
  }
};

const obtenerTipoUsuarios = async (req, res) => {
  try {
    const usuarios = await TipoUsuario.findAll({ 
      attributes: ['id_tipo_usuario', 'tipo_usuario'], // Especifica los atributos que deseas seleccionar
    });
    return res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener tipo usuarios:', error);
    return res.status(500).json({ error: 'Error al obtener tipo usuarios', message: error.message });
  }
};

const obtenerTipoUsuario = async (req, res) => {
  const idTipoUsuario = req.params.id;
  try {
    const tipo_usuario = await TipoUsuario.findByPk(idTipoUsuario);
    if (!tipo_usuario) {
      return res.status(404).json({ error: 'Tipo Usuario no encontrada' });
    }
    res.status(200).json(tipo_usuario);
  } catch (error) {
    console.error('Error al obtener Tipo usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


const modificarTipoUsuario = async (req, res) => {
  const idTipoUsuario = req.params.id;
  const { tipo_usuario } = req.body;

  try {
    const tipo_usuarioModificada = await TipoUsuario.findByPk(idTipoUsuario);

    // Verificar exitencia
    if (!tipo_usuarioModificada) {
      return res.status(404).json({ error: 'Tipo Usuario no encontrada' });
    }

    // Actualizar la tipo usuario con los nuevos datos
    await tipo_usuarioModificada.update({
      tipo_usuario: tipo_usuario
    });

    return res.status(200).json({ message: 'Tipo usuario modificada exitosamente', tipo_usuario: tipo_usuarioModificada });
  } catch (error) {
    console.error('Error al modificar Tipo usuario:', error);
    return res.status(500).json({ error: 'Error al modificar Tipo usuario', message: error.message });
  }
};

const eliminarTipoUsuario = async (req, res) => {
  const idTipoUsuario = req.params.id;

  try {
    const tipo_usuarioEliminada = await TipoUsuario.findByPk(idTipoUsuario);

    // Verificar existencia
    if (!tipo_usuarioEliminada) {
      return res.status(404).json({ error: 'Tipo Usuario no encontrada' });
    }

    // Eliminar tipo usuario
    await tipo_usuarioEliminada.destroy();

    return res.status(200).json({ mensaje: 'Tipo Usuario eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar tipo usuario:', error);
    return res.status(500).json({ error: 'Error al eliminar usuario', message: error.message });
  }
};

module.exports = { obtenerTipoUsuarios, crearTipoUsuario, modificarTipoUsuario, eliminarTipoUsuario, obtenerTipoUsuario};
