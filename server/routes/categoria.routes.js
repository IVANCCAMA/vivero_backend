import { Router } from 'express';
const router = Router();
import { obtenerCategorias, obtenerCategoria, crearCategoria, modificarCategoria, eliminarCategoria } from '../controllers/categoria.controllers';

// obtener categorias
router.get('/', obtenerCategorias);

//obtener categoria por id
router.get('/:id',obtenerCategoria)

// crear categoria
router.post('/', crearCategoria);

// modificar categoria
router.put('/:id', modificarCategoria);

// elimiar categoria
router.delete('/:id', eliminarCategoria);

export default router;
