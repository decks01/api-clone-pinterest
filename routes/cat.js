import express from 'express';
import {createCat, deleteCat, getCats, getCatById, updateCat} from '../controllers/cats.js';
const router = express.Router();


//Las rutas aqui inician con /cats

router.get('/', getCats);

router.post('/', createCat);

router.get('/:id', getCatById);

router.delete('/delete/:id', deleteCat);

router.put('/:id', updateCat);

export default router;