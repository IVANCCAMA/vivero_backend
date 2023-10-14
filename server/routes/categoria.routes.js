const express = require('express');
const router = express.Router();
const categoria = require('../controllers/categoria.controllers');

// obtener categorias
router.get('/', categoria.obtenerCategorias);

// crear categoria
router.post('/', categoria.crearCategoria);

// elimiar categoria
router.delete('/', categoria.obtenerCategorias);

// modificar categoria
router.put('/:id', categoria.obtenerCategorias);

module.exports = router;
