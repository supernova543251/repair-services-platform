// src/services/address.js
import api from './api.js';

export const addressService = {
  // Get all addresses for user
  getAddresses: async () => {
    try {
      const response = await api('/api/addresses');
      return response;
    } catch (error) {
      console.error('Error fetching addresses:', error);
      throw error;
    }
  },

  // Add new address
  addAddress: async (addressData) => {
    try {
      const response = await api('/api/addresses', {
        method: 'POST',
        body: addressData
      });
      return response;
    } catch (error) {
      console.error('Error adding address:', error);
      throw error;
    }
  },

  // Update address
  updateAddress: async (id, addressData) => {
    try {
      const response = await api(`/api/addresses/${id}`, {
        method: 'PUT',
        body: addressData
      });
      return response;
    } catch (error) {
      console.error('Error updating address:', error);
      throw error;
    }
  },

  // Delete address
  deleteAddress: async (id) => {
    try {
      const response = await api(`/api/addresses/${id}`, {
        method: 'DELETE'
      });
      
      // Check if it's a 400 error response
      if (response.success === false) {
        return response; // Return the error response to handle it
      }
      
      return response;
    } catch (error) {
      console.error('Error deleting address:', error);
      throw error;
    }
  },

  // Set default address - This function already exists
  setDefaultAddress: async (id) => {
    try {
      const response = await api(`/api/addresses/${id}/set-default`, {
        method: 'PUT'
      });
      return response;
    } catch (error) {
      console.error('Error setting default address:', error);
      throw error;
    }
  },

  // Get default address
  getDefaultAddress: async () => {
    try {
      const response = await api('/api/addresses/default');
      return response;
    } catch (error) {
      console.error('Error fetching default address:', error);
      throw error;
    }
  }
};