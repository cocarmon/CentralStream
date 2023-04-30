import { Pie } from 'react-chartjs-2';

const MyPieChart = () => {
  const data = {
    labels: ['Japan', 'US', 'Mexico'],
    datasets: [
      {
        label: 'Viewers',
        data: [10, 20, 30],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverOffset: 4,
      },
    ],
  };

  return <Pie data={data} />;
};

export default MyPieChart;
