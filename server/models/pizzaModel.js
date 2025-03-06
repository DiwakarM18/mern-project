import mongoose from 'mongoose';

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  variants: [String],
  prices: {
    type: Object,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Pizza = mongoose.model('Pizza', pizzaSchema);

export default Pizza;