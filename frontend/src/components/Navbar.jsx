import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [user, setUser] = useState(localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null);

  const logout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Pizza Delights</Link>
      <ul className="navbar-nav">
        {user ? (
          <>
            <li><span className="nav-link">Welcome, {user.name}</span></li>
            <li><Link to="/orders" className="nav-link">Orders</Link></li>
            <li><Link to="/cart" className="nav-link">Cart</Link></li>
            <li><button onClick={logout} className="nav-link" style={{ background: 'transparent', border: 'none', padding: 0 }}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="nav-link">Login</Link></li>
            <li><Link to="/register" className="nav-link">Register</Link></li>
            <li><Link to="/cart" className="nav-link">Cart</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;