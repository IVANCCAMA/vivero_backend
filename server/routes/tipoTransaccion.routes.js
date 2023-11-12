const express = require('express');
const router = express.Router();
const tipoTransaccion = require('../controllers/tipoTransaccion.controllers');

// obtener tipoTransacciones
router.get('/', tipoTransaccion.obtenerTipoTransaccion);

//obtener tipoUsuario por id
router.get('/:id', tipoTransaccion.obtenerTipoTransaccionid)


module.exports = router;