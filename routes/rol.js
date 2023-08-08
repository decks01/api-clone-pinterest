import express from 'express';
import { getRoles, getRolesById, deleteRol, updateRol, createRol } from '../controllers/roles.js';
const router = express.Router();


//Las rutas aqui inician con /dependencia

router.get('/', getRoles);
router.get('/:id', getRolesById);
router.delete('/:id', deleteRol);
router.put('/:id', updateRol);
router.post('/', createRol);

export default router;