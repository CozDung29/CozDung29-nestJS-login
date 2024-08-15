import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import LogOut from './pages/LogOut';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<LogOut />} />
      </Routes>
    </Router>
  );
};

export default App;
