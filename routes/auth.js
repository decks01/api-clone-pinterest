

import express from 'express';
import { register } from '../controllers/register.js';
const router = express.Router();

//Las rutas aqui inician con /register
router.post('/', register);

export default router;

    