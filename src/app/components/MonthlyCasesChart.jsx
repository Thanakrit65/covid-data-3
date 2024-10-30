// src/app/components/MonthlyCasesChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

const MonthlyCasesChart = ({ data }) => {
  // Prepare chart data
  const chartData = {
    labels: data.map(item => item.month), // แทนที่ 'month' ด้วยชื่อ property ที่เก็บข้อมูลเดือน
    datasets: [
      {
        label: 'จำนวนผู้ป่วย',
        data: data.map(item => item.cases), // แทนที่ 'cases' ด้วยชื่อ property ที่เก็บข้อมูลจำนวนผู้ป่วย
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'จำนวนผู้ป่วยต่อเดือน',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default MonthlyCasesChart;
