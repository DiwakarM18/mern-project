import { useState, useEffect } from 'react';
import axios from 'axios';
import Pizza from '../components/Pizza';

function HomePage() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPizzas() {
      try {
        const response = await axios.get('http://localhost:5000/api/pizzas');
        setPizzas(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch pizzas. Please try again later.');
        setLoading(false);
      }
    }

    fetchPizzas();
  }, []);

  return (
    <div>
      <h1>Our Pizzas</h1>
      
      {loading ? (
        <p>Loading pizzas...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="pizza-container">
          {pizzas.map(pizza => (
            <Pizza key={pizza._id} pizza={pizza} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;