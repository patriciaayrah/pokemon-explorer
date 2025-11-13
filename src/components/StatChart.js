import React from 'react';
import '../style/StatChart.css';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function StatChart({ stats }) {
  const data = stats.map(stat => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));

  return (
    <div>
      <h3>Stats</h3>
      <BarChart width={400} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default StatChart;