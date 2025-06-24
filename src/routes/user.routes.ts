import { Router }  from 'express';
import {
  getUsers,
  createUser,
  createMultipleUsers,
  updateUser,
  deleteUser,
  deleteAllUsers,
  deleteMultipleUsers
} from '../controllers/user.controller';

const router = Router();
// Obtener todos los usuarios

// Definición de las rutas para el manejo de usuarios
router.get('/', getUsers); // Obtener todos los usuarios
router.post('/', createUser); // Crear un nuevo usuario
router.post('/multiple', createMultipleUsers); // Crear múltiples usuarios
router.put('/:id', updateUser); // Actualizar un usuario por ID
router.delete('/:id', deleteUser); // Eliminar un usuario por ID
router.delete('/', deleteAllUsers); // Eliminar todos los usuarios
router.delete('/multiple', deleteMultipleUsers); // Eliminar múltiples usuarios

export default router; // Exportar el router para usarlo en la aplicación principal