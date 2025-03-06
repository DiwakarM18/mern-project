import express from 'express';
import Order from '../models/orderModel.js';

const router = express.Router();

// Create new order
router.post('/', async (req, res) => {
  try {
    const { user, orderItems, shippingAddress, orderAmount } = req.body;
    
    // Create new order
    const newOrder = new Order({
      user,
      orderItems,
      shippingAddress,
      orderAmount,
      transactionId: Date.now().toString()
    });
    
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user orders
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ 'user.userId': req.params.userId });
    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all orders (for admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;