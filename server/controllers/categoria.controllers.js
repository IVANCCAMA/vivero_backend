const Categoria = require('../models/categoria');

const crearCategoria = async (req, res) => {
  const { nombre_categoria, descripcion_categoria } = req.body;

  try {
    const nuevaCategoria = await Categoria.create({
      nombre_categoria,
      descripcion_categoria
    });

    return res.status(201).json({ mensaje: 'Categoría creada exitosamente', categoria: nuevaCategoria });
  } catch (error) {
    console.error('Error al crear categoría:', error);
    return res.status(500).json({ error: 'Error al crear categoría', message: error.message });
  }
};

const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({ 
      attributes: ['id_categoria', 'nombre_categoria', 'descripcion_categoria'], // Especifica los atributos que deseas seleccionar
    });
    return res.json(categorias);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    return res.status(500).json({ error: 'Error al obtener categorías', message: error.message });
  }
};

const obtenerCategoria = async (req, res) => {
  const idCategoria = req.params.id;
  try {
    const categoria = await Categoria.findByPk(idCategoria);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.status(200).json(categoria);
  } catch (error) {
    console.error('Error al obtener la categoría:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


const modificarCategoria = async (req, res) => {
  const idCategoria = req.params.id;
  const { nombre_categoria, descripcion_categoria } = req.body;

  try {
    const categoriaModificada = await Categoria.findByPk(idCategoria);

    // Verificar exitencia
    if (!categoriaModificada) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    // Actualizar la categoría con los nuevos datos
    await categoriaModificada.update({
      nombre_categoria: nombre_categoria,
      descripcion_categoria: descripcion_categoria
    });

    return res.status(200).json({ message: 'Categoría modificada exitosamente', categoria: categoriaModificada });
  } catch (error) {
    console.error('Error al modificar categoría:', error);
    return res.status(500).json({ error: 'Error al modificar categoría', message: error.message });
  }
};

const eliminarCategoria = async (req, res) => {
  const idCategoria = req.params.id;

  try {
    const categoriaEliminada = await Categoria.findByPk(idCategoria);

    // Verificar existencia
    if (!categoriaEliminada) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    // Eliminar la categoría
    await categoriaEliminada.destroy();

    return res.status(200).json({ mensaje: 'Categoría eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    return res.status(500).json({ error: 'Error al eliminar categoría', message: error.message });
  }
};

module.exports = { obtenerCategorias, crearCategoria, modificarCategoria, eliminarCategoria, obtenerCategoria};
