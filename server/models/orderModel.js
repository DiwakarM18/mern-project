import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    userId: { type: String }
  },
  orderItems: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    variant: { type: String, required: true },
    _id: { type: String, required: true }
  }],
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  orderAmount: { type: Number, required: true },
  isDelivered: { type: Boolean, default: false },
  transactionId: { type: String }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;