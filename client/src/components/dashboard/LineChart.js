import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = () => {
  const data = {
    labels: [
      '',
      'January',
      'Febuary',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'Views',
        data: [12, 19, 3, 5, 9, 14],
        fill: false,
        borderColor: '#03A9F4',
        tension: 0.1,
        pointBorderWidth: 2,
      },
    ],
  };

  return <Line data={data} />;
};

export default LineChart;
