import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

function Register() {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>💰 Investment Tracker</h1>
        <h2>Getting Started</h2>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <p style={{ color: '#666', marginBottom: '15px' }}>✨ No login required!</p>
          <p style={{ color: '#999', fontSize: '14px' }}>
            Your investment data is saved locally in your browser.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate('/dashboard')}
          style={{ width: '100%' }}
        >
          Start Tracking
        </button>
      </div>
    </div>
  );
}

export default Register;