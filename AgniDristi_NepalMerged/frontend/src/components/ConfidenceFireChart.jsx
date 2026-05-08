import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchConfidenceFires } from '../services/fireApi';

export default function ConfidenceFireChart() {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchConfidenceFires()
      .then(data => {
        const labels = data.map(d => d.confidence);
        const counts = data.map(d => d.count);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Fire Confidence Level',
              data: counts,
              backgroundColor: ['#38bdf8', '#7dd3fc', '#0ea5e9'],
            },
          ],
        });
      })
      .catch(err => {
        console.error('Error fetching confidence fires:', err);
        setError('Failed to load confidence data');
      })
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return <p className="text-red-600 text-sm">{error}</p>;
  }

  if (loading) {
    return <p className="text-gray-600 text-sm">Loading...</p>;
  }

  if (!chartData) {
    return <p className="text-gray-600 text-sm">No data available</p>;
  }

  return (
    <Bar data={chartData} />
  );
}
