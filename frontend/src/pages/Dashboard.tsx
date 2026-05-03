import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/Dashboard.css';

interface Portfolio {
  totalInvested: number;
  currentValue: number;
  totalGains: number;
  roi: string;
  totalInvestments: number;
  byStatus: {
    active: number;
    exited: number;
    loss: number;
    pending: number;
  };
}

function Dashboard() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPortfolioSummary();
  }, []);

  const fetchPortfolioSummary = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/analytics/portfolio/summary', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setPortfolio(data);
    } catch (err) {
      console.error('Failed to fetch portfolio:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  const statusData = portfolio
    ? [
        { name: 'Active', value: portfolio.byStatus.active },
        { name: 'Exited', value: portfolio.byStatus.exited },
        { name: 'Loss', value: portfolio.byStatus.loss },
        { name: 'Pending', value: portfolio.byStatus.pending },
      ]
    : [];

  const COLORS = ['#00C49F', '#0088FE', '#FF8042', '#FFBB28'];

  return (
    <div className="dashboard">
      <h1>📊 Investment Dashboard</h1>

      {portfolio && (
        <>
          <div className="summary-cards">
            <div className="card">
              <h3>Total Invested</h3>
              <p className="amount">${portfolio.totalInvested.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
            </div>
            <div className="card">
              <h3>Current Value</h3>
              <p className="amount">${portfolio.currentValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
            </div>
            <div className="card">
              <h3>Total Gains/Loss</h3>
              <p className={`amount ${portfolio.totalGains >= 0 ? 'positive' : 'negative'}`}>
                ${portfolio.totalGains.toLocaleString('en-US', { maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="card">
              <h3>ROI</h3>
              <p className={`amount ${parseFloat(portfolio.roi) >= 0 ? 'positive' : 'negative'}`}>
                {portfolio.roi}%
              </p>
            </div>
          </div>

          <div className="charts-container">
            <div className="chart">
              <h3>Investment Status Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.name}: ${entry.value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart">
              <h3>Portfolio Stats</h3>
              <div className="stats">
                <p>✅ Total Investments: <strong>{portfolio.totalInvestments}</strong></p>
                <p>📈 Active: <strong>{portfolio.byStatus.active}</strong></p>
                <p>🏁 Exited: <strong>{portfolio.byStatus.exited}</strong></p>
                <p>⚠️ Loss: <strong>{portfolio.byStatus.loss}</strong></p>
                <p>⏳ Pending: <strong>{portfolio.byStatus.pending}</strong></p>
              </div>
            </div>
          </div>

          <div className="actions">
            <button className="btn btn-primary" onClick={() => navigate('/investments/add')}>
              ➕ Add New Investment
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/investments')}>
              📋 View All Investments
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/analytics')}>
              📊 Analytics
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;