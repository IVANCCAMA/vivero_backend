const Categoria = require('../models/categoria');

const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    return res.json(categorias);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener categorias' });
  }
};

module.exports = { obtenerCategorias };
