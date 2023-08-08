import express from 'express';
import {createOrder, deleteOrder,updateorderDirection,  sumPrecio, getOrders, getOrderById, updateOrder, getOrdersByUser} from '../controllers/orders.js';
const router = express.Router();


//Las rutas aqui inician con /orders

router.get('/', getOrders);

router.get('/user/:id', getOrdersByUser);

router.get('/suma/:id', sumPrecio);


router.post('/', createOrder);

router.get('/:id', getOrderById);

router.delete('/delete/:id', deleteOrder);

router.put('/:id', updateOrder);

router.put('/direction/:id', updateorderDirection);


export default router;