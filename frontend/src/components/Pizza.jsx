import { useState } from 'react';

function Pizza({ pizza }) {
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState('small');

  const addToCart = () => {
    const cartItem = {
      _id: pizza._id,
      name: pizza.name,
      image: pizza.image,
      variant: variant,
      quantity: quantity,
      price: pizza.prices[variant]
    };

    // Get existing cart from localStorage or initialize empty array
    const cartItems = localStorage.getItem('cartItems') 
      ? JSON.parse(localStorage.getItem('cartItems')) 
      : [];
    
    // Check if item already exists in cart
    const existingItem = cartItems.find(
      item => item._id === pizza._id && item.variant === variant
    );

    if (existingItem) {
      // Update quantity if item exists
      const updatedCart = cartItems.map(item => 
        item._id === pizza._id && item.variant === variant
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    } else {
      // Add new item if it doesn't exist
      localStorage.setItem('cartItems', JSON.stringify([...cartItems, cartItem]));
    }

    alert('Pizza added to cart!');
  };

  return (
    <div className="pizza-card">
      <img src={pizza.image} alt={pizza.name} />
      <div className="pizza-card-content">
        <h3 className="pizza-title">{pizza.name}</h3>
        <div className="pizza-options">
          <div className="flex justify-between">
            <p>Variant:</p>
            <select 
              value={variant} 
              onChange={(e) => setVariant(e.target.value)}
            >
              {pizza.variants.map(variant => (
                <option key={variant} value={variant}>{variant}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-between">
            <p>Quantity:</p>
            <select 
              value={quantity} 
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {[...Array(10).keys()].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="pizza-price">
          Price: ${(pizza.prices[variant] * quantity).toFixed(2)}
        </div>
        <p>{pizza.description}</p>
        <button 
          className="btn-primary mt-2" 
          onClick={addToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Pizza;