import React, { useEffect, useState } from 'react';
import { Area, Bar, CartesianGrid, ComposedChart, Line, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import axios from 'axios';

const Chart = () => {
  const [orderStats, setOrderStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost/BuyBuddies/index.php/api/daily-stats');
        const formattedData = response.data.map(stat => ({
          date: new Date(stat.date).toLocaleDateString(),
          orders: stat.orders,
          quantity: stat.quantity,
          price: stat.price
        }));
        setOrderStats(formattedData);
      } catch (error) {
        console.error('Error fetching order stats:', error);
      }
    };

    fetchStats();
    // Refresh data every 5 minutes
    const interval = setInterval(fetchStats, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold mb-4">Daily Order Statistics</h2>
      <ComposedChart width={730} height={250} data={orderStats}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area 
          type="monotone" 
          dataKey="orders" 
          fill="#8884d8" 
          stroke="#8884d8" 
          name="Total Orders"
        />
        <Bar 
          dataKey="price" 
          barSize={20} 
          fill="#413ea0" 
          name="Total Price ($)"
        />
        <Line 
          type="monotone" 
          dataKey="quantity" 
          stroke="#ff7300" 
          name="Total Quantity"
        />
      </ComposedChart>
    </div>
  );
};

export default Chart;