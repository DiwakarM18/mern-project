import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password
      });
      
      localStorage.setItem('currentUser', JSON.stringify(response.data));
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1 className="text-center">Login</h1>
      
      {error && <div className="error-message mb-4">{error}</div>}
      
      <form onSubmit={login}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button 
          type="submit" 
          className="btn-primary" 
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <p className="mt-4 text-center">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default LoginPage;