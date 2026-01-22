import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  // Get token and user role from localStorage or context
  const token = localStorage.getItem('token'); // token saved after login
  // const userRole = localStorage.getItem('role'); // 'admin' or 'pharmacy'
  const userRole= "pharmacy"
  
  
  // if (!token) {
  //   // Not logged in
  //   return <Navigate to="/login" replace />;
  // }

  if (role && role !== userRole) {
    // Logged in but wrong role
    return <Navigate to="/" replace />;
  }

  // Logged in and allowed
  return children;
};

export default PrivateRoute;
