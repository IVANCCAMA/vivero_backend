const Categoria = require('../models/categoria');

const crearCategoria = async (req, res) => {
  const { nombre, descripcion } = req.body;

  try {
    const nuevaCategoria = await Categoria.create({
      nombre_categoria: nombre,
      descripcion_categoria: descripcion
    }, {
      // Especificamos campos a insertar
      fields: ['nombre_categoria', 'descripcion_categoria']
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

module.exports = { obtenerCategorias, crearCategoria, };
