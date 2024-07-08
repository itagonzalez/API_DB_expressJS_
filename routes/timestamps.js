const express = require('express');
const router = express.Router();
const timestampsController = require('../controllers/timestampsController');

// Crear un nuevo registro de timestamp
router.post('/user/:userId', timestampsController.createTimestamp);

// Obtener timestamps por usuario
router.get('/user/:userId', timestampsController.getTimestampsByUser);
router.get('/', timestampsController.getAllTimestamps);


// Actualizar un timestamp
router.put('/:timestampId', timestampsController.updateTimestamp);

// Eliminar un timestamp
router.delete('/:timestampId', timestampsController.deleteTimestamp);

router.delete('/', timestampsController.deleteAllTimestamps);

module.exports = router;
