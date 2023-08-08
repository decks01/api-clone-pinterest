import express from 'express';
import {createDetail, deleteDetail, getDetails, getDetailById, updateDetail} from '../controllers/detailsorders.js';
const router = express.Router();


//Las rutas aqui inician con /detailsorders

router.get('/', getDetails);

router.post('/', createDetail);

router.get('/:id', getDetailById);

router.delete('/delete/:id', deleteDetail);

router.put('/:id', updateDetail);

export default router;