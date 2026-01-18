import api from './api.js';

export const profileService = {
  getProfile: async () => {
    const response = await api('/customer/profile');
    return response;
  },

  updateProfile: async (profileData) => {
    const response = await api('/customer/profile', {
      method: 'PUT',
      body: profileData
    });
    return response;
  },

  updatePreferences: async (preferences) => {
    const response = await api('/customer/preferences', {
      method: 'PATCH',
      body: preferences
    });
    return response;
  }
};