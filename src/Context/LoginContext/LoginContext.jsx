import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../../services/auth.js';

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
  const [isLoading, setIsLoading] = useState(true);
  const [isTestMode, setIsTestMode] = useState(import.meta.env.VITE_API_MOCK === 'true');
  const [showLoginOverlay, setShowLoginOverlay] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);

  // Check for existing authentication on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      if (authService.isAuthenticated()) {
        const storedUserData = authService.getStoredUserData();
        if (storedUserData) {
          setUserData(storedUserData);
          setIsLoggedIn(true);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      authService.logout();
    } finally {
      setIsLoading(false);
    }
  };

  // Send OTP
  const sendOTP = async (phone, name = '') => {
    try {
      // For test mode, simulate success
      if (isTestMode) {
        return { 
          success: true, 
          data: { 
            phone: phone,
            isNewUser: true 
          } 
        };
      }
      
      // Real API call
      const response = await authService.sendOTP(phone, name);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to send OTP');
    }
  };

  // Verify OTP and login
  const verifyOTP = async (phone, otp) => {
    try {
      let response;

      if (isTestMode) {
        // Test mode - simulate successful verification
        response = {
          success: true,
          data: {
            _id: 'test-user-id',
            name: 'Test User',
            phone: phone,
            role: 'customer',
            isPhoneVerified: true,
            token: 'test-token'
          }
        };
      } else {
        // Real API call
        response = await authService.verifyOTP(phone, otp);
      }
      
      if (response.success) {
        const { token, ...userData } = response.data;
        
        // Store token and user data
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(userData));
        
        setUserData(userData);
        setIsLoggedIn(true);
        setShowLoginOverlay(false);
        
        return response;
      } else {
        throw new Error(response.message || 'OTP verification failed');
      }
    } catch (error) {
      throw new Error(error.message || 'OTP verification failed');
    }
  };

  // Show login overlay
  const requireLogin = (redirectTo = null) => {
    setRedirectPath(redirectTo);
    setShowLoginOverlay(true);
  };

  // Logout
  const logout = () => {
    // Clear all auth-related data from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    // Reset context state
    setIsLoggedIn(false);
    setUserData(null);
    setShowLoginOverlay(false);
    setRedirectPath(null);
    
    // Clear any session storage if used
    sessionStorage.clear();
    
    // Reload the page after logout
    window.location.reload();
    
    // Dispatch event to notify other components about logout
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('logout'));
  };

  // Update profile
  const updateProfile = async (profileData) => {
    try {
      const response = await authService.updateProfile(profileData);
      if (response.success) {
        setUserData(response.data);
        localStorage.setItem('userData', JSON.stringify(response.data));
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
        }
      }
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to update profile');
    }
  };

  // For testing: Toggle login state
  const toggleLogin = () => {
    if (isLoggedIn) {
      logout();
    } else {
      const testUser = {
        name: 'Test User',
        phone: '+91 98765 43210',
        role: 'customer',
        isPhoneVerified: true,
        _id: 'test-user-id'
      };
      localStorage.setItem('authToken', 'test-token');
      localStorage.setItem('userData', JSON.stringify(testUser));
      setUserData(testUser);
      setIsLoggedIn(true);
    }
  };

  return (
    <LoginContext.Provider value={{ 
      isLoggedIn, 
      userData, 
      isLoading,
      sendOTP,
      verifyOTP,
      logout,
      updateProfile,
      toggleLogin,
      isTestMode,
      setIsTestMode,
      showLoginOverlay,
      setShowLoginOverlay,
      requireLogin,
      redirectPath,
      setRedirectPath
    }}>
      {children}
    </LoginContext.Provider>
  );
};