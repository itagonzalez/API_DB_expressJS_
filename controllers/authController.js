const jwt = require('jsonwebtoken');
const db = require('../db');

exports.login = async (req, res) => {
    const { user, password } = req.body;

    try {
        // Validar las credenciales en la base de datos (ejemplo básico)
        const isValidUser = await validateUser(user, password);

        if (!isValidUser) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }

        // Generar un token JWT
        const token = jwt.sign({ user }, 'tu_secreto_secreto', { expiresIn: '1h' }); 

        res.json({ success: true, token });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};

async function validateUser(user, password) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE user = ? AND password = ?', [user, password], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row ? true : false);
            }
        });
    });
}
