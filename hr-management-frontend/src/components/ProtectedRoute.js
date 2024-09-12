import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// ProtectedRoute bileşeni
const ProtectedRoute = ({ isAuthenticated, redirectPath = '/' }) => {
  if (!isAuthenticated) {
    // Eğer kullanıcı oturum açmamışsa, belirlenen rotaya (default: login sayfası) yönlendir
    return <Navigate to={redirectPath} replace />;
  }

  // Kullanıcı oturum açmışsa, içerideki rotaları render et
  return <Outlet />;
};

export default ProtectedRoute;
