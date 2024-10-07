const db = require('../db');

// Obtener todos los usuarios
exports.getAllUsers = (req, res) => {
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
};

// Crear un nuevo usuario
exports.createUser = (req, res) => {
    const { user, name, lastName, password, email, address, phone, dateBirth } = req.body;
    const sql = `INSERT INTO users (user, name, lastName, password, email, address, phone, dateBirth) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [user, name, lastName, password, email, address, phone, dateBirth];
    
    db.run(sql, params, function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Usuario creado correctamente',
            userId: this.lastID
        });
    });
};

// Obtener un usuario por ID
exports.getUserById = (req, res) => {
    const userId = req.params.id;
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.get(sql, [userId], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.json(row);
    });
};

// Obtener un usuario por nombre de usuario
exports.getUserByUserName = (req, res) => {
    const userName = req.params.user;
    const sql = 'SELECT * FROM users WHERE user = ?';
    db.get(sql, [userName], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.json(row);
    });
};




// Actualizar un usuario
exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const { user, name, lastName, password, email, address, phone, dateBirth } = req.body;
    const sql = `UPDATE users 
                 SET user = ?, name = ?, lastName = ?, password = ?, email = ?, address = ?, phone = ?, dateBirth = ? 
                 WHERE id = ?`;
    const params = [user, name, lastName, password, email, address, phone, dateBirth, userId];
    
    db.run(sql, params, function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Usuario actualizado correctamente',
            changes: this.changes
        });
    });
};

// Eliminar un usuario
exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.run(sql, [userId], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'Usuario eliminado correctamente', changes: this.changes });
    });
};
