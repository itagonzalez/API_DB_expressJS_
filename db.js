const sqlite3 = require('sqlite3').verbose();
const dbPath = './db/database.sqlite';

// Conectar a la base de datos SQLite
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al abrir la base de datos', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite');
        createTables(); // Llamar a la función para crear tablas si aún no existen
    }
});

// Función para crear tablas si no existen
function createTables() {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user TEXT NOT NULL,
        name TEXT NOT NULL,
        lastName TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL,
        address TEXT NOT NULL,
        companyName TEXT NOT NULL,
        dateBirth TEXT NOT NULL
    )`);   
}

module.exports = db;
