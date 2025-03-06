import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser'))
      : null;
    
    if (!currentUser) {
      navigate('/login');
      return;
    }

    async function fetchOrders() {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/user/${currentUser._id}`);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch orders. Please try again later.');
        setLoading(false);
      }
    }

    fetchOrders();
  }, [navigate]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h1>Your Orders</h1>
      
      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p>{error}</p>
      ) : orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <div>
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div>
                  <h3>Order ID: {order._id}</h3>
                  <p>Placed on: {formatDate(order.createdAt)}</p>
                </div>
                <div>
                  <p className={order.isDelivered ? "text-success" : "text-warning"}>
                    {order.isDelivered ? "Delivered" : "On the way"}
                  </p>
                </div>
              </div>
              
              <div className="order-items">
                <h4>Items:</h4>
                {order.orderItems.map((item, index) => (
                  <div key={index} className="order-item">
                    <p>{item.name} [{item.variant}] × {item.quantity}</p>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <div className="order-address">
                <h4>Shipping Address:</h4>
                <p>{order.shippingAddress.street}, {order.shippingAddress.city}</p>
                <p>{order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
              </div>
              
              <div className="order-total">
                Total: ${order.orderAmount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;