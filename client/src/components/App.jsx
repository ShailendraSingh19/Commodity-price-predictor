import React from 'react';
import axios from 'axios';
import User from './User/User';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AdminPage from './Admin/admin';
import { NavBar } from './NavBar';
import TeamPage from './TeamPage';


function App() {

  return (
    <div className="App">
      <Router>
      <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<User/>} />
          <Route path='/admin' element={<AdminPage/>}></Route>
          <Route path="/our-team" element={<TeamPage></TeamPage>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
