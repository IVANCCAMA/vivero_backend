const express = require('express');
const router = express.Router();
const transaccion = require('../controllers/transaccion.controllers');

// obtener transacciones
router.get('/', transaccion.obtenerTransacciones);

// obtener transaccion
router.get('/:id', transaccion.obtenerTransaccion);

// crear transaccion
router.post('/', transaccion.CrearTransaccion);

// modificar transaccion
router.put('/:id', transaccion.modificarTransaccion);

// elimiar transaccion
router.delete('/:id', transaccion.eliminarTransaccion);


module.exports = router;
