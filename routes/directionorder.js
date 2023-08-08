import express from 'express';
import {createDirection, deleteDirection, getDirectionByUser, getDirections, getDirectionById, updateDirection} from '../controllers/directionorders.js';
const router = express.Router();


//Las rutas aqui inician con /directionsorders

router.get('/', getDirections);

router.post('/', createDirection);

router.get('/:id', getDirectionById);

router.get('/user/:id', getDirectionByUser);

router.delete('/delete/:id', deleteDirection);

router.put('/:id', updateDirection);

export default router; 