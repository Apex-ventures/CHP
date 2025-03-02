
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page when visiting root URL
    navigate('/login');
  }, [navigate]);

  return null;
};

export default Index;
