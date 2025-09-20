// contexts/LoginContext.js (with testing controls)
import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLogin must be used within a LoginProvider');
  }
  return context;
};

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isTestMode, setIsTestMode] = useState(true); // Enable test mode

  // For testing: Toggle login state
  const toggleLogin = () => {
    if (isLoggedIn) {
      logout();
    } else {
      login({
        name: 'Test User',
        phone: '+91 98765 43210',
        email: 'testuser@example.com'
      });
    }
  };

  const login = (userInfo) => {
    setIsLoggedIn(true);
    setUserData(userInfo);
    
    // In a real app, we would store tokens in localStorage
    if (!isTestMode) {
      localStorage.setItem('userData', JSON.stringify(userInfo));
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    
    if (!isTestMode) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    }
  };

  return (
    <LoginContext.Provider value={{ 
      isLoggedIn, 
      userData, 
      login, 
      logout,
      toggleLogin, // Expose toggle for testing
      isTestMode,
      setIsTestMode
    }}>
      {children}
    </LoginContext.Provider>
  );
};