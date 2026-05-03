import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import investmentService from '../services/investmentService';
import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleExport = () => {
    investmentService.exportData();
    alert('Your data has been exported!');
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const success = await investmentService.importData(file);
        if (success) {
          alert('Data imported successfully!');
          window.location.reload();
        } else {
          alert('Failed to import data. Make sure it\'s a valid JSON file.');
        }
      }
    };
    input.click();
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
        <button className="btn btn-small" onClick={handleExport} style={{ marginRight: '5px' }}>
          📥 Export
        </button>
        <button className="btn btn-small" onClick={handleImport}>
          📤 Import
        </button>
      </div>
    </nav>
  );
}

export default Navbar;