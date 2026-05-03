import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Investments.css';

interface Investment {
  _id: string;
  companyName: string;
  investmentAmount: number;
  investmentDate: string;
  status: string;
  currentValue: number;
  riskLevel: string;
}

function Investments() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/investments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setInvestments(data);
    } catch (err) {
      console.error('Failed to fetch investments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this investment?')) {
      try {
        await fetch(`http://localhost:5000/api/investments/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        setInvestments(investments.filter((inv) => inv._id !== id));
      } catch (err) {
        console.error('Failed to delete investment:', err);
      }
    }
  };

  const filteredInvestments = filter === 'All' 
    ? investments 
    : investments.filter((inv) => inv.status === filter);

  if (loading) return <div className="loading">Loading investments...</div>;

  return (
    <div className="investments">
      <div className="investments-header">
        <h1>💼 My Investments</h1>
        <button className="btn btn-primary" onClick={() => navigate('/investments/add')}>
          ➕ Add Investment
        </button>
      </div>

      <div className="filter-buttons">
        {['All', 'Active', 'Exited', 'Loss', 'Pending'].map((status) => (
          <button
            key={status}
            className={`filter-btn ${filter === status ? 'active' : ''}`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="investments-table">
        {filteredInvestments.length === 0 ? (
          <p className="no-data">No investments found. Start by adding one!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Amount</th>
                <th>Current Value</th>
                <th>Gain/Loss</th>
                <th>Status</th>
                <th>Risk</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvestments.map((inv) => {
                const gains = inv.currentValue - inv.investmentAmount;
                return (
                  <tr key={inv._id}>
                    <td>{inv.companyName}</td>
                    <td>${inv.investmentAmount.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                    <td>${inv.currentValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                    <td className={gains >= 0 ? 'positive' : 'negative'}>
                      ${gains.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                    </td>
                    <td><span className={`badge ${inv.status.toLowerCase()}`}>{inv.status}</span></td>
                    <td><span className={`risk ${inv.riskLevel.toLowerCase()}`}>{inv.riskLevel}</span></td>
                    <td>
                      <button className="btn-small" onClick={() => navigate(`/investments/${inv._id}`)}>
                        👁️ View
                      </button>
                      <button className="btn-small btn-delete" onClick={() => handleDelete(inv._id)}>
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Investments;