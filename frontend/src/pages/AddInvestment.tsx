import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Form.css';

function AddInvestment() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState({
    companyName: '',
    investmentAmount: '',
    investmentDate: new Date().toISOString().split('T')[0],
    category: 'Tech',
    marketSize: '',
    revenueModel: '',
    teamQuality: 5,
    growthPotential: 5,
    traction: '',
    competition: '',
    riskLevel: 'Medium',
    scalability: 5,
    vision: '',
    exitStrategy: '',
    currentValue: '',
    status: 'Active',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      investmentAmount: parseFloat(formData.investmentAmount),
      currentValue: parseFloat(formData.currentValue) || parseFloat(formData.investmentAmount),
      teamQuality: parseInt(formData.teamQuality),
      growthPotential: parseInt(formData.growthPotential),
      scalability: parseInt(formData.scalability),
    };

    try {
      const response = await fetch('http://localhost:5000/api/investments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Investment added successfully!');
        navigate('/investments');
      } else {
        alert('Failed to add investment');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred');
    }
  };

  return (
    <div className="form-container">
      <h1>➕ Add New Investment</h1>
      <form onSubmit={handleSubmit} className="investment-form">
        <div className="form-section">
          <h3>📍 Basic Information</h3>
          <div className="form-group">
            <label>Company Name *</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              placeholder="Enter company name"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Investment Amount ($) *</label>
              <input
                type="number"
                name="investmentAmount"
                value={formData.investmentAmount}
                onChange={handleChange}
                required
                placeholder="50000"
              />
            </div>
            <div className="form-group">
              <label>Current Value ($)</label>
              <input
                type="number"
                name="currentValue"
                value={formData.currentValue}
                onChange={handleChange}
                placeholder="Leave blank to match investment amount"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Investment Date *</label>
              <input
                type="date"
                name="investmentDate"
                value={formData.investmentDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option>Tech</option>
                <option>Healthcare</option>
                <option>Finance</option>
                <option>E-commerce</option>
                <option>Real Estate</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>🎯 Investment Analysis</h3>
          <div className="form-group">
            <label>Market Size</label>
            <input
              type="text"
              name="marketSize"
              value={formData.marketSize}
              onChange={handleChange}
              placeholder="e.g., $10 billion TAM"
            />
          </div>

          <div className="form-group">
            <label>Revenue Model</label>
            <input
              type="text"
              name="revenueModel"
              value={formData.revenueModel}
              onChange={handleChange}
              placeholder="e.g., SaaS, Subscription, Freemium"
            />
          </div>

          <div className="form-group">
            <label>Traction</label>
            <input
              type="text"
              name="traction"
              value={formData.traction}
              onChange={handleChange}
              placeholder="e.g., 10K users, $100K MRR"
            />
          </div>

          <div className="form-group">
            <label>Competition</label>
            <input
              type="text"
              name="competition"
              value={formData.competition}
              onChange={handleChange}
              placeholder="Main competitors"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Team Quality (1-10)</label>
              <input
                type="range"
                name="teamQuality"
                min="1"
                max="10"
                value={formData.teamQuality}
                onChange={handleChange}
              />
              <span className="range-value">{formData.teamQuality}</span>
            </div>
            <div className="form-group">
              <label>Growth Potential (1-10)</label>
              <input
                type="range"
                name="growthPotential"
                min="1"
                max="10"
                value={formData.growthPotential}
                onChange={handleChange}
              />
              <span className="range-value">{formData.growthPotential}</span>
            </div>
            <div className="form-group">
              <label>Scalability (1-10)</label>
              <input
                type="range"
                name="scalability"
                min="1"
                max="10"
                value={formData.scalability}
                onChange={handleChange}
              />
              <span className="range-value">{formData.scalability}</span>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>⚠️ Risk & Strategy</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Risk Level</label>
              <select name="riskLevel" value={formData.riskLevel} onChange={handleChange}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
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
          </div>

          <div className="form-group">
            <label>Long-term Vision</label>
            <textarea
              name="vision"
              value={formData.vision}
              onChange={handleChange}
              placeholder="What is your vision for this company?"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Exit Strategy</label>
            <textarea
              name="exitStrategy"
              value={formData.exitStrategy}
              onChange={handleChange}
              placeholder="IPO, Acquisition, Dividend, etc."
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any additional notes about this investment"
              rows={4}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            ✅ Add Investment
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/investments')}>
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddInvestment;