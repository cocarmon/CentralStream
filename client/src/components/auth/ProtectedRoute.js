import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api';

export const ProtectedRoute = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const broadCastComponent = props.children;

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        await api.get('/auth/authorize', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };
    checkAuthentication();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? broadCastComponent : <Navigate to="/login" />;
};
