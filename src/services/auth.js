// src/services/auth.js
import api from './api.js';

export const authService = {
  // Send OTP for login/register
  sendOTP: async (phone, name = '', role = 'customer') => {
    const response = await api('/api/users/send-otp', {
      method: 'POST',
      body: { phone, name, role }
    });
    return response;
  },

  // Verify OTP and login
  verifyOTP: async (phone, otp) => {
    const response = await api('/api/users/verify-otp', {
      method: 'POST',
      body: { phone, otp }
    });
    return response;
  },

  // Get user profile
  getProfile: async () => {
    const response = await api('/api/users/profile');
    return response;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api('/api/users/profile', {
      method: 'PUT',
      body: profileData
    });
    return response;
  },

  // Logout (client-side only)
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  // Get stored user data
  getStoredUserData: () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }
};