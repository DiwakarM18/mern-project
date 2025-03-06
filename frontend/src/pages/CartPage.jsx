import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const items = localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [];
    setCartItems(items);
  }, []);

  const removeFromCart = (item) => {
    const updatedCart = cartItems.filter(
      cartItem => !(cartItem._id === item._id && cartItem.variant === item.variant)
    );
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const increaseQuantity = (item) => {
    const updatedCart = cartItems.map(cartItem => 
      cartItem._id === item._id && cartItem.variant === item.variant
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (item) => {
    if (item.quantity === 1) {
      removeFromCart(item);
      return;
    }
    
    const updatedCart = cartItems.map(cartItem => 
      cartItem._id === item._id && cartItem.variant === item.variant
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const placeOrder = async () => {
    const currentUser = localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser'))
      : null;
    
    if (!currentUser) {
      alert('Please login to place an order');
      navigate('/login');
      return;
    }

    try {
      const orderData = {
        user: {
          name: currentUser.name,
          email: currentUser.email,
          userId: currentUser._id
        },
        orderItems: cartItems,
        shippingAddress: address,
        orderAmount: calculateTotal()
      };

      const response = await axios.post('http://localhost:5000/api/orders', orderData);
      
      if (response.status === 201) {
        alert('Order placed successfully!');
        localStorage.removeItem('cartItems');
        navigate('/orders');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
      console.error(error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  return (
    <div>
      <h1>Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p>Your cart is empty</p>
          <Link to="/">
            <button className="btn-primary mt-4">Go back to menu</button>
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="cart-item-details">
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name} [{item.variant}]</h3>
                  <p>Price: ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-secondary" onClick={() => decreaseQuantity(item)}>-</button>
                <span>{item.quantity}</span>
                <button className="btn-secondary" onClick={() => increaseQuantity(item)}>+</button>
                <button className="btn-danger" onClick={() => removeFromCart(item)}>Remove</button>
              </div>
            </div>
          ))}
          
          <div className="cart-summary">
            <h2>Total: ${calculateTotal().toFixed(2)}</h2>
            <button 
              className="btn-primary mt-2" 
              onClick={() => setShowCheckout(true)}
            >
              Proceed to Checkout
            </button>
          </div>
          
          {showCheckout && (
            <div className="form-container mt-4">
              <h2>Shipping Details</h2>
              <div className="form-group">
                <label className="form-label">Street Address</label>
                <input 
                  type="text" 
                  name="street" 
                  value={address.street} 
                  onChange={handleAddressChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">City</label>
                <input 
                  type="text" 
                  name="city" 
                  value={address.city} 
                  onChange={handleAddressChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Postal Code</label>
                <input 
                  type="text" 
                  name="postalCode" 
                  value={address.postalCode} 
                  onChange={handleAddressChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Country</label>
                <input 
                  type="text" 
                  name="country" 
                  value={address.country} 
                  onChange={handleAddressChange} 
                  required 
                />
              </div>
              <button 
                className="btn-success" 
                onClick={placeOrder}
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CartPage;