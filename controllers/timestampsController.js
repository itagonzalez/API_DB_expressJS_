const db = require('../db');

// Crear un nuevo registro de timestamp
exports.createTimestamp = (req, res) => {
    const userId = req.params.userId;
    const { checkIn, checkOut } = req.body;
    const sql = `INSERT INTO timestamps (userId, checkIn, checkOut) VALUES (?, ?, ?)`;
    const params = [userId, checkIn, checkOut];
    
    db.run(sql, params, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({
            message: 'Timestamp creado correctamente',
            timestampId: this.lastID
        });
    });
};

exports.getAllTimestamps = (req, res) => {
    db.all('SELECT * FROM timestamps', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
};

// Obtener timestamps por usuario
exports.getTimestampsByUser = (req, res) => {
    const userId = req.params.userId;
    const sql = 'SELECT * FROM timestamps WHERE userId = ?';
    db.all(sql, [userId], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
};

// Actualizar un timestamp
exports.updateTimestamp = (req, res) => {
    const timestampId = req.params.timestampId;
    const { userId, checkIn, checkOut } = req.body;
    const sql = `UPDATE timestamps 
                 SET userId = ?, checkIn = ?, checkOut = ?
                 WHERE id = ?`;
    const params = [userId, checkIn, checkOut, timestampId];
    
    db.run(sql, params, function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Timestamp actualizado correctamente',
            changes: this.changes
        });
    });
};

// Eliminar un timestamp
exports.deleteTimestamp = (req, res) => {
    const timestampId = req.params.id;
    const sql = 'DELETE FROM timestamps WHERE id = ?';
    db.run(sql, [timestampId], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'Timestamp eliminado correctamente', changes: this.changes });
    });
};

exports.deleteAllTimestamps = (req, res) => {
    const sql = 'DELETE FROM timestamps';
    db.run(sql, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'Historial de timestamps eliminado correctamente', changes: this.changes });
    });
};