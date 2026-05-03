import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import investmentService from '../services/investmentService';
import '../styles/Analytics.css';

interface ROI {
  companyName: string;
  investmentAmount: number;
  currentValue: number;
  gains: number;
  roiPercentage: string;
  status: string;
}

interface Timeline {
  date: string;
  companyName: string;
  amountInvested: number;
  cumulativeInvested: number;
  currentValue: number;
}

function Analytics() {
  const [roi, setROI] = useState<ROI[]>([]);
  const [timeline, setTimeline] = useState<Timeline[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = () => {
    try {
      const roiData = investmentService.getRoiAnalysis();
      const timelineData = investmentService.getGrowthTimeline();

      setROI(roiData);
      setTimeline(timelineData);
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading analytics...</div>;

  return (
    <div className="analytics">
      <h1>📈 Analytics & Reports</h1>

      <div className="analytics-section">
        <h2>Individual Investment ROI</h2>
        <div className="roi-table">
          {roi.length === 0 ? (
            <p className="no-data">No investments yet. Add your first investment to see analytics!</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Invested</th>
                  <th>Current Value</th>
                  <th>Gains/Loss</th>
                  <th>ROI %</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {roi.map((item, idx) => {
                  const gainsClass = item.gains >= 0 ? 'positive' : 'negative';
                  const roiClass = parseFloat(item.roiPercentage) >= 0 ? 'positive' : 'negative';
                  return (
                    <tr key={idx}>
                      <td>{item.companyName}</td>
                      <td>${item.investmentAmount.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                      <td>${item.currentValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                      <td className={gainsClass}>
                        ${item.gains.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                      </td>
                      <td className={roiClass}>{item.roiPercentage}%</td>
                      <td><span className={`badge ${item.status.toLowerCase()}`}>{item.status}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {timeline.length > 0 && (
        <div className="analytics-section">
          <h2>Portfolio Growth Timeline</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={timeline}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                formatter={(value) => `$${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="cumulativeInvested"
                stroke="#8884d8"
                name="Cumulative Invested"
              />
              <Line type="monotone" dataKey="currentValue" stroke="#82ca9d" name="Current Value" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default Analytics;