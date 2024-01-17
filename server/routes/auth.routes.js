import { Router } from 'express';
import { login, protectedResource  } from '../controllers/auth.controller.js' 

const router = Router();

router.post('/login', login);

router.get('/recurso-protegido', protectedResource);

export default router;
