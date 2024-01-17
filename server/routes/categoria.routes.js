const express = require('express');
const router = express.Router();
const categoria =  require('../controllers/categoria.controllers');

// obtener categorias
router.get('/', categoria.obtenerCategorias);

//obtener categoria por id
router.get('/:id', categoria.obtenerCategoria)

// crear categoria
router.post('/', categoria.crearCategoria);

// modificar categoria
router.put('/:id', categoria.modificarCategoria);

// elimiar categoria
router.delete('/:id', categoria.eliminarCategoria);

module.exports = router;
