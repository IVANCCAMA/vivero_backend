const express = require('express');
const router = express.Router();
const producto = require('../controllers/producto.controllers');

// obtener productos
router.get('/', producto.obtenerProductos);

// obtener producto
router.get('/:id', producto.obtenerProducto);

// crear producto
router.post('/', producto.crearProducto);

// modificar producto
router.put('/:id', producto.modificarProducto);

// elimiar producto
router.delete('/:id', producto.eliminarProducto);


module.exports = router;
