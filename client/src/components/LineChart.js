import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = () => {
  const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: 'Views',
        data: [12, 19, 3, 5, 9, 14],
        fill: false,
        borderColor: '#7B76FE',
        tension: 0.1,
      },
    ],
  };

  return <Line data={data} />;
};

export default LineChart;
