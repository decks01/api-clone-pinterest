

import express from 'express';
import { login } from '../controllers/login.js';
import { loginUsuario } from '../controllers/loginUsuarios.js';
const router = express.Router();

//Las rutas aqui inician con /login
router.post('/', login);
router.post('/users', loginUsuario);


export default router;

