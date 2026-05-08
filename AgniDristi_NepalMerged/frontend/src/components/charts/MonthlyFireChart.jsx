
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchMonthlyFires } from '../../services/fireApi';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function MonthlyFireChart() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchMonthlyFires()
      .then(setData)
      .catch(err => {
        console.error('Error fetching monthly fires:', err);
        setError('Failed to load monthly fire data');
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
    labels: data.map(d => MONTHS[d.month - 1]),
    datasets: [{
      label: 'Fires per Month',
      data: data.map(d => d.count),
      backgroundColor: '#38bdf8',
    }],
  };

  return <Bar data={chartData} />;
}
