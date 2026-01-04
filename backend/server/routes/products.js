const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Obtener todos los productos (público)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ visible: true }).populate('store', 'name location');
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
});

// Crear producto (temporalmente abierto)
router.post('/', async (req, res) => {
  try {
    const { title, description, price, images, storeId, createdBy } = req.body;
    const p = new Product({
      title,
      description,
      price,
      images,
      store: storeId,
      createdBy
    });
    await p.save();
    res.status(201).json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
});

module.exports = router;