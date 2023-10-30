import { Router } from 'express';
const router = Router();
import { obtenerUsuarios, obtenerUsuario, crearUsuario, modificarUsuario, eliminarUsuario } from '../controllers/usuario.controllers';

// obtener usuarios
router.get('/', obtenerUsuarios);

// obtener usuario
router.get('/:id', obtenerUsuario);

// crear usuario
router.post('/', crearUsuario);

// modificar usuario
router.put('/:id', modificarUsuario);

// elimiar usuario
router.delete('/:id', eliminarUsuario);


export default router;
