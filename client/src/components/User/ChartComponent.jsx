import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const ChartComponent = ({ city, commodity }) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataAvailable, setDataAvailable] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get('http://localhost:5000/data'); // Replace with your backend API endpoint
        // const data = response.data;
      const response = await axios.get(' http://127.0.0.1:8000/inference');
      const data=response.data;
        let arr=[];
        if(data[commodity] && data[commodity][city]){
          arr=data[commodity][city];
        }
        else{
          setDataAvailable(false);
          console.log("incorrect match");
        }

        const days = arr
          .map( entry => entry.Date.split('T')[0]);
        const prices = arr
          .map(entry => entry.Price);
        if (days.length > 0 && prices.length > 0) {
          setDataAvailable(true);
          setChartData({
            labels: days,
            datasets: [
              {
                label: 'Price',
                data: prices,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                // fill: true,
              },
            ],
          });
        } else {
          setDataAvailable(false);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data for chart');
        setLoading(false);
      }
    };
    fetchData();
  }, [city, commodity]);
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;
  return (
    <div>
      <h2>Price Chart</h2>
      {dataAvailable ? <Line 
      data={chartData} options={{ plugins: { legend: { display: false } } }} 
      style={{
        backgroundColor: '#fff', // Set chart background color to white
      }}
      >
      </Line> 
      : <p style={{ "color": "red" }}>No data available</p>}
    </div>
  );
};
export default ChartComponent;