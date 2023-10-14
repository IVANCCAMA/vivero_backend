const express = require('express');
const router = express.Router();
const categoria = require('../controllers/categoria.controllers');

router.get('/categorias', categoria.obtenerCategorias);

module.exports = router;
