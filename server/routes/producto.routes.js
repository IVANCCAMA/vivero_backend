const express = require('express');
const router = express.Router();
const producto = require('../controllers/producto.controllers');

// obtener productos
router.get('/', producto.obtenerProductos);

// crear producto
router.post('/', producto.crearProducto);

// elimiar producto
router.delete('/', producto.obtenerProductos);

// modificar producto
router.put('/:id', producto.obtenerProductos);

module.exports = router;
