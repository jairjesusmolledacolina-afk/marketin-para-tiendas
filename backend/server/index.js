const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Rutas
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const storeRoutes = require('./routes/stores');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/stores', storeRoutes);

const PORT = process.env.PORT || 4000;

// Conectar a MongoDB y luego arrancar el servidor
async function start() {
  try {
    // No pasar las opciones obsoletas; mongoose las maneja internamente
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado');

    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  } catch (err) {
    console.error('Error MongoDB:', err.message || err);
    process.exit(1);
  }
}

start();