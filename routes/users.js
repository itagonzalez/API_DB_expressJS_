const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { route } = require('./timestamps');

// Obtener todos los usuarios
router.get('/', usersController.getAllUsers);

// Obtener un usuario por ID
router.get('/:id', usersController.getUserById);

router.get('/username/:user', usersController.getUserByUserName);
// Crear un nuevo usuario
router.post('/', usersController.createUser);

// Actualizar un usuario
router.put('/:id', usersController.updateUser);

// Eliminar un usuario
router.delete('/:id', usersController.deleteUser);

module.exports = router;
