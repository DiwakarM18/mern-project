import express from 'express';
import Pizza from '../models/pizzaModel.js';

const router = express.Router();

// Get all pizzas
router.get('/', async (req, res) => {
  try {
    const pizzas = await Pizza.find({});
    res.json(pizzas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get pizza by ID
router.get('/:id', async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (pizza) {
      res.json(pizza);
    } else {
      res.status(404).json({ message: 'Pizza not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;