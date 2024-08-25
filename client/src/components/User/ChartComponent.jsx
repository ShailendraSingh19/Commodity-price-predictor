import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register components with Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartComponent = ({ city, commodity }) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/data'); // Replace with your backend API endpoint
        const data = response.data;

        console.log(data);
        console.log("sarkar running");

        // Extract days and prices for the selected city and commodity
        const days = data
          .filter(entry => entry.wheat && entry.wheat.vijayawada)
          .map(entry => entry.wheat.vijayawada.date);

        const prices = data
          .filter(entry =>entry.wheat && entry.wheat.vijayawada)
          .map(entry => entry.wheat.vijayawada.price);


        //   const days = data
        //   .filter(entry => entry[commodity] && entry[commodity][city])
        //   .map(entry => entry[commodity][city].date);

        // const prices = data
        //   .filter(entry =>entry[commodity] && entry[commodity][city])
        //   .map(entry => entry[commodity][city].price);
        
        setChartData({
          labels: days,
          datasets: [
            {
              label: 'Price',
              data: prices,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
            },
          ],
        });

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data for chart');
        setLoading(false);
      }
    };

    fetchData();
  }, [city, commodity]); // Depend on city and commodity to refetch when they change

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Price Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default ChartComponent;
