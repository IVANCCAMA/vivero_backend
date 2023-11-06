const express = require('express');
const router = express.Router();
const usuario = require('../controllers/usuario.controllers');


// Autenticar usuario
router.post('/autenticar', usuario.autenticarUsuario); 



// obtener usuarios
router.get('/', usuario.obtenerUsuarios);

// obtener usuario
router.get('/:id', usuario.obtenerUsuario);

// crear usuario
router.post('/', usuario.crearUsuario);

// modificar usuario
router.put('/:id', usuario.modificarUsuario);

// elimiar usuario
router.delete('/:id', usuario.eliminarUsuario);

module.exports = router;
