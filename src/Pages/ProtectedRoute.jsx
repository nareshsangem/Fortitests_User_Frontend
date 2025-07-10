// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();
  if (loading) return <div className="text-center py-20">Loading...</div>;

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
