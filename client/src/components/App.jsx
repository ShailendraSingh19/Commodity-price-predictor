import React from 'react';
import ChartComponent from '../components/User/ChartComponent';
import AdminPage from './Admin/admin';
import User from './User/User';

function App() {
  return (
    <div className="App">
      <h1>Admin Dashboard</h1>
      <User></User>
      {/* <ChartComponent /> */}
    </div>
  );
}

export default App;
