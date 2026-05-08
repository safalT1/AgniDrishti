
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchYearlyFires } from '../../services/fireApi';

export default function YearlyFireChart() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchYearlyFires()
      .then(setData)
      .catch(err => {
        console.error('Error fetching yearly fires:', err);
        setError('Failed to load yearly fire data');
      })
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return <div style={{ color: '#dc2626', padding: '20px', textAlign: 'center' }}>{error}</div>;
  }

  if (loading) {
    return <div style={{ color: '#64748b', padding: '20px', textAlign: 'center' }}>Loading...</div>;
  }

  const chartData = {
    labels: data.map(d => d.year),
    datasets: [{
      label: 'Fires per Year',
      data: data.map(d => d.count),
      fill: false,
      borderColor: '#0ea5e9',
      backgroundColor: '#0ea5e9',
      tension: 0.3,
    }],
  };

  return <Line data={chartData} />;
}
