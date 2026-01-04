const express = require('express');
const router = express.Router();
const Store = require('../models/Store');

// Obtener tiendas
router.get('/', async (req, res) => {
  try {
    const stores = await Store.find().populate('owner', 'name email');
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: 'Error interno' });
  }
});

// Crear tienda (temporalmente abierto)
router.post('/', async (req, res) => {
  try {
    const { name, description, address, location, owner } = req.body;
    const s = new Store({ name, description, address, location, owner });
    await s.save();
    res.status(201).json(s);
  } catch (err) {
    res.status(500).json({ message: 'Error interno' });
  }
});

module.exports = router;