import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthenticationGuard = ({ children, requiredRole = null }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userRole, setUserRole] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('access_token');
      const role = localStorage.getItem('role');
      const isAuth = Boolean(token);

      setIsAuthenticated(isAuth);
      setUserRole(role);
      setIsLoading(false);

      if (!isAuth) {
        navigate('/login-screen', {
          state: { from: location?.pathname },
          replace: true
        });
        return;
      }

      if (requiredRole && role !== requiredRole) {
        const roleRedirects = {
          admin: '/admin-dashboard',
          instructor: '/instructor/dashboard',
          learner: '/learner-courses-listing',
        };
        navigate(roleRedirects?.[role] || '/login-screen', { replace: true });
      }
    };

    checkAuthentication();
  }, [navigate, location, requiredRole]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requiredRole && userRole !== requiredRole) {
    return null;
  }

  return <>{children}</>;
};

export default AuthenticationGuard;