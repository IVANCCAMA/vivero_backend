const express = require('express');
const router = express.Router();
const auth =  require('../controllers/auth.controller.js'); 

router.post('/login', auth.login);

router.get('/recurso-protegido', auth.protectedResource);

module.exports = router;
