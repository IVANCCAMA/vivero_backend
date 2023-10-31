const express = require('express');
const router = express.Router();
const tipoUsuario = require('../controllers/tipoUsuario.controllers');

// obtener tipoUsuarios
router.get('/', tipoUsuario.obtenerTipoUsuarios);

//obtener tipoUsuario por id
router.get('/:id',tipoUsuario.obtenerTipoUsuario)

// crear tipoUsuario
router.post('/', tipoUsuario.crearTipoUsuario);

// modificar tipoUsuario
router.put('/:id', tipoUsuario.modificarTipoUsuario);

// elimiar tipoUsuario
router.delete('/:id', tipoUsuario.eliminarTipoUsuario);

module.exports = router;
