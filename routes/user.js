import express from 'express';
import {createUser, deleteUser, getUsers, getUserById, updateUser, updateRoluser, getCorreo} from '../controllers/users.js';
const router = express.Router();


//Las rutas aqui inician con /users
router.get('/correos', getCorreo);


router.get('/', getUsers);

router.post('/', createUser);

router.get('/:id', getUserById);


router.delete('/delete/:id', deleteUser); 

router.put('/:id', updateUser);

router.put('/Updaterol/:id', updateRoluser);

export default router;