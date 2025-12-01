import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UnauthorizedPage from './UnauthorizedPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole = 'admin' 
}) => {
  const { isAuthenticated, user } = useAuth();

  // Check if user is authenticated - redirect to login if not
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  if (requiredRole && user?.role !== requiredRole) {
    return <UnauthorizedPage message="У вас нет прав для доступа к этой странице" />;
  }

  // User is authenticated and has required role
  return <>{children}</>;
};

export default ProtectedRoute;
