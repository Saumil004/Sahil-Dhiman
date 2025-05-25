import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getMe, 
  setAuthToken, 
  getAuthToken, 
  removeAuthToken, 
  setUser as setStoredUser, 
  getUser as getStoredUser 
} from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        setLoading(false);
        return;
      }

      // Verify token with backend
      const response = await getMe();
      if (response.data.success) {
        setUser(response.data.user);
        setStoredUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        // Token is invalid, remove it
        removeAuthToken();
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // Token is invalid or expired, remove it
      removeAuthToken();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = (token, userData) => {
    setAuthToken(token);
    setStoredUser(userData);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 