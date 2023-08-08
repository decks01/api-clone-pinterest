

import express from 'express';

import { register2 } from '../controllers/register2.js';
const router = express.Router();

//Las rutas aqui inician con /register
router.post('/', register2);

export default router;

    