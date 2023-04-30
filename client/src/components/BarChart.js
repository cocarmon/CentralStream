import { Bar } from 'react-chartjs-2';

const BarChart = () => {
  const data = {
    labels: ['January', 'February', 'March'],
    datasets: [
      {
        label: 'Hours Streamed',
        data: [12, 19, 3],
        backgroundColor: ['#9DFF73', '#96F7E7', '#F7CE96'],
      },
    ],
  };

  return <Bar data={data} width={300} height={300} />;
};

export default BarChart;
