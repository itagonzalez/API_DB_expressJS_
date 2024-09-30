const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const db = require('./db'); // Importa tu módulo de base de datos

const app = express();
const port = process.env.PORT || 3000;

// Middleware para manejar datos JSON
app.use(express.json());

// Middleware para habilitar CORS
app.use(cors());

// Rutas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error en el servidor');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
