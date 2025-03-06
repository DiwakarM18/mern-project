import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import OrdersPage from './pages/OrdersPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App