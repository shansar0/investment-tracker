import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Investments from './pages/Investments';
import AddInvestment from './pages/AddInvestment';
import InvestmentDetail from './pages/InvestmentDetail';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (token) {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, [token]);

  const handleLogin = (token: string, userData: any) => {
    setToken(token);
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="app">
        {token && <Navbar user={user} onLogout={handleLogout} />}
        <Routes>
          <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
          <Route path="/register" element={token ? <Navigate to="/dashboard" /> : <Register onLogin={handleLogin} />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/investments" element={token ? <Investments /> : <Navigate to="/login" />} />
          <Route path="/investments/add" element={token ? <AddInvestment /> : <Navigate to="/login" />} />
          <Route path="/investments/:id" element={token ? <InvestmentDetail /> : <Navigate to="/login" />} />
          <Route path="/analytics" element={token ? <Analytics /> : <Navigate to="/login" />} />
          <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;