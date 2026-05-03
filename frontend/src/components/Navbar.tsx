import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

interface NavbarProps {
  user: any;
  onLogout: () => void;
}

function Navbar({ user, onLogout }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>💰 Investment Tracker</h2>
      </div>
      <ul className="navbar-menu">
        <li>
          <a
            className={isActive('/dashboard') ? 'active' : ''}
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </a>
        </li>
        <li>
          <a
            className={isActive('/investments') ? 'active' : ''}
            onClick={() => navigate('/investments')}
          >
            Investments
          </a>
        </li>
        <li>
          <a
            className={isActive('/analytics') ? 'active' : ''}
            onClick={() => navigate('/analytics')}
          >
            Analytics
          </a>
        </li>
      </ul>
      <div className="navbar-user">
        <span className="user-name">👤 {user?.name || 'User'}</span>
        <button className="btn btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;