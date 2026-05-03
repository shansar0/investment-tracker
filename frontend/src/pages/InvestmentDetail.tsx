import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Detail.css';

interface Investment {
  _id: string;
  companyName: string;
  investmentAmount: number;
  currentValue: number;
  investmentDate: string;
  category: string;
  marketSize: string;
  revenueModel: string;
  teamQuality: number;
  growthPotential: number;
  traction: string;
  competition: string;
  riskLevel: string;
  scalability: number;
  vision: string;
  exitStrategy: string;
  status: string;
  notes: string;
}

function InvestmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [investment, setInvestment] = useState<Investment | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Investment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvestment();
  }, [id]);

  const fetchInvestment = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/investments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setInvestment(data);
      setFormData(data);
    } catch (err) {
      console.error('Failed to fetch investment:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData((prev) => ({
        ...prev!,
        [name]: ['investmentAmount', 'currentValue', 'teamQuality', 'growthPotential', 'scalability'].includes(name)
          ? parseFloat(value) || value
          : value,
      }));
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/investments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Investment updated successfully!');
        setInvestment(formData);
        setEditing(false);
      } else {
        alert('Failed to update investment');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!investment) return <div className="error">Investment not found</div>;

  const gains = investment.currentValue - investment.investmentAmount;
  const roi = investment.investmentAmount > 0 ? ((gains / investment.investmentAmount) * 100).toFixed(2) : '0.00';

  return (
    <div className="detail-container">
      <button className="btn btn-back" onClick={() => navigate('/investments')}>
        ← Back to Investments
      </button>

      <div className="detail-header">
        <h1>{investment.companyName}</h1>
        <span className={`badge ${investment.status.toLowerCase()}`}>{investment.status}</span>
      </div>

      {!editing && (
        <div className="detail-view">
          <div className="detail-section">
            <h3>💰 Financial Summary</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Investment Amount</label>
                <p>${investment.investmentAmount.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
              </div>
              <div className="detail-item">
                <label>Current Value</label>
                <p>${investment.currentValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
              </div>
              <div className="detail-item">
                <label>Gains/Loss</label>
                <p className={gains >= 0 ? 'positive' : 'negative'}>
                  ${gains.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="detail-item">
                <label>ROI</label>
                <p className={parseFloat(roi) >= 0 ? 'positive' : 'negative'}>{roi}%</p>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>🎯 Investment Analysis</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Market Size</label>
                <p>{investment.marketSize || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <label>Revenue Model</label>
                <p>{investment.revenueModel || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <label>Traction</label>
                <p>{investment.traction || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <label>Competition</label>
                <p>{investment.competition || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>📊 Ratings</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Team Quality</label>
                <p>{investment.teamQuality}/10</p>
              </div>
              <div className="detail-item">
                <label>Growth Potential</label>
                <p>{investment.growthPotential}/10</p>
              </div>
              <div className="detail-item">
                <label>Scalability</label>
                <p>{investment.scalability}/10</p>
              </div>
              <div className="detail-item">
                <label>Risk Level</label>
                <p><span className={`risk ${investment.riskLevel.toLowerCase()}`}>{investment.riskLevel}</span></p>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>🎪 Strategy</h3>
            <div className="detail-item full">
              <label>Long-term Vision</label>
              <p>{investment.vision || 'N/A'}</p>
            </div>
            <div className="detail-item full">
              <label>Exit Strategy</label>
              <p>{investment.exitStrategy || 'N/A'}</p>
            </div>
            <div className="detail-item full">
              <label>Notes</label>
              <p>{investment.notes || 'N/A'}</p>
            </div>
          </div>

          <div className="detail-actions">
            <button className="btn btn-primary" onClick={() => setEditing(true)}>
              ✏️ Edit
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/investments')}>
              Back
            </button>
          </div>
        </div>
      )}

      {editing && formData && (
        <div className="edit-form">
          <h3>Edit Investment</h3>
          <div className="form-group">
            <label>Current Value</label>
            <input
              type="number"
              name="currentValue"
              value={formData.currentValue}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option>Active</option>
              <option>Pending</option>
              <option>Exited</option>
              <option>Loss</option>
            </select>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <div className="detail-actions">
            <button className="btn btn-primary" onClick={handleUpdate}>
              ✅ Save
            </button>
            <button className="btn btn-secondary" onClick={() => setEditing(false)}>
              ❌ Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InvestmentDetail;