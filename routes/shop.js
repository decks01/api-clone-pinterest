import express from 'express';
import {createShop, deleteShop,getShopByUser,  getShops, getShopById, updateShop} from '../controllers/shops.js';
const router = express.Router();


//Las rutas aqui inician con /shops

router.get('/', getShops);

router.post('/', createShop);

router.get('/:id', getShopById);

router.get('/user/:id', getShopByUser);


router.delete('/delete/:id', deleteShop);

router.put('/:id', updateShop);

export default router;