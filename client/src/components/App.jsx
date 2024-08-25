import React from 'react';
import ChartComponent from '../components/User/ChartComponent';
import AdminPage from './Admin/admin';
import User from './User/User';
import { NavBar } from './NavBar';


function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <User></User>
      {/* <ChartComponent /> */}
    </div>
  );
}

export default App;
