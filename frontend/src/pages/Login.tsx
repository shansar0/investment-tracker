import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

function Login() {
  const [step, setStep] = useState<'welcome' | 'home'>('welcome');
  const navigate = useNavigate();

  if (step === 'home') {
    return navigate('/dashboard');
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>💰 Investment Tracker</h1>
        <h2>Welcome!</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
          Track all your investments in one place with detailed analytics and ROI calculations.
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setStep('home')}
          style={{ width: '100%' }}
        >
          Get Started
        </button>
        <p style={{ textAlign: 'center', color: '#999', fontSize: '12px', marginTop: '20px' }}>
          💾 All data is stored locally in your browser
        </p>
      </div>
    </div>
  );
}

export default Login;