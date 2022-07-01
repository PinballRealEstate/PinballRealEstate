import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DetailBarChart({ chartData }) {
  //basic options for the bar chart data (i.e. title, legend, etc.)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Price Differential by Property Type',
      },
    },
  };

  //data munging to display in the bar chart
  const data = {
    labels: Object.keys(chartData),
    datasets: [
      {
        label: 'Sale Price',
        // nice munging!
        data: Object.values(chartData).map(data => data.closing_price),
        backgroundColor: '#40798c',
      },
      {
        label: 'List Price',
        data: Object.values(chartData).map(data => data.listing_price),
        backgroundColor: '#70a9a1',
      },
    ],
  };
  
  return (
    //initialization of the bar chart in the detail page
    <Bar options={options} data={data} />
  );
}
