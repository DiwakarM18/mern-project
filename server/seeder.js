import mongoose from 'mongoose';
import dotenv from 'dotenv';
import pizzas from './data/pizzasData.js';
import Pizza from './models/pizzaModel.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pizza-delivery')
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await Pizza.deleteMany({});
    
    // Insert new data
    await Pizza.insertMany(pizzas);
    
    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error}`);
    process.exit(1);
  }
};

// Delete data
const destroyData = async () => {
  try {
    await Pizza.deleteMany({});
    
    console.log('Data destroyed successfully');
    process.exit();
  } catch (error) {
    console.error(`Error destroying data: ${error}`);
    process.exit(1);
  }
};

// Run function based on command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}