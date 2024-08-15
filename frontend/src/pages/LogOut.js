import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import axios from '../config/axios';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
      message.success('You have successfully logged out.');
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      message.error('Logout failed, please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Are you sure you want to log out?</h1>
      <Button type="primary" onClick={handleLogout} style={{ marginTop: '20px' }}>
        Log out
      </Button>
    </div>
  );
};

export default Logout;
