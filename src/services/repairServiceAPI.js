// src/services/repairServiceAPI.js

import api from './api';

const repairServiceAPI = {
  // Get services with price comparison from backend
  getServices: async (pincode, category = 'repair', sortBy = 'price_rating_score') => {
    try {
      const response = await api(`/api/customer/services?pincode=${pincode}&category=${category}&sortBy=${sortBy}`);
      return response;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  // NEW: Get services by specific service center
  getServicesByServiceCenter: async (serviceCenterId) => {
    try {
      const response = await api(`/api/services/service-center/${serviceCenterId}`);
      return response;
    } catch (error) {
      console.error('Error fetching services by service center:', error);
      throw error;
    }
  },

  // Get best priced service centers
  getBestPricedServiceCenters: async (pincode, category = 'repair') => {
    try {
      const response = await api(`/api/customer/service-centers/best-priced?pincode=${pincode}&category=${category}`);
      return response;
    } catch (error) {
      console.error('Error fetching best priced service centers:', error);
      throw error;
    }
  },

  // Get service center details
  getServiceCenterDetails: async (serviceCenterId) => {
    try {
      const response = await api(`/api/customer/service-centers/${serviceCenterId}`);
      return response;
    } catch (error) {
      console.error('Error fetching service center details:', error);
      throw error;
    }
  },

  // Get service center by ID
  getServiceCenterById: async (serviceCenterId) => {
    try {
      const response = await api(`/api/service-centers/${serviceCenterId}`);
      return response;
    } catch (error) {
      console.error('Error fetching service center by ID:', error);
      throw error;
    }
  },

  // Get all service centers for a pincode
  getServiceCentersByPincode: async (pincode) => {
    try {
      const response = await api(`/api/customer/service-centers?pincode=${pincode}`);
      return response;
    } catch (error) {
      console.error('Error fetching service centers by pincode:', error);
      throw error;
    }
  },

  // Search service centers
  searchServiceCenters: async (pincode, query = '', filters = {}) => {
    try {
      const params = new URLSearchParams({
        pincode,
        query,
        ...filters
      });
      const response = await api(`/api/customer/service-centers/search?${params}`);
      return response;
    } catch (error) {
      console.error('Error searching service centers:', error);
      throw error;
    }
  },

  // Get service details by ID
  getServiceById: async (serviceId) => {
    try {
      const response = await api(`/api/services/${serviceId}`);
      return response;
    } catch (error) {
      console.error('Error fetching service details:', error);
      throw error;
    }
  },

  // Create service request/order
  createServiceRequest: async (orderData) => {
    try {
      const response = await api.post('/api/orders', orderData);
      return response;
    } catch (error) {
      console.error('Error creating service request:', error);
      throw error;
    }
  },

  // Get service availability
  checkServiceAvailability: async (serviceId) => {
    try {
      const response = await api(`/api/services/${serviceId}/availability`);
      return response;
    } catch (error) {
      console.error('Error checking service availability:', error);
      throw error;
    }
  },

  // Get service categories
  getServiceCategories: async () => {
    try {
      const response = await api('/api/services/categories');
      return response;
    } catch (error) {
      console.error('Error fetching service categories:', error);
      throw error;
    }
  },

  // Get popular services
  getPopularServices: async (pincode, limit = 10) => {
    try {
      const response = await api(`/api/customer/services/popular?pincode=${pincode}&limit=${limit}`);
      return response;
    } catch (error) {
      console.error('Error fetching popular services:', error);
      throw error;
    }
  },

  // Get recommended services for device
  getRecommendedServices: async (brand, model, pincode) => {
    try {
      const response = await api(`/api/customer/services/recommended?brand=${brand}&model=${model}&pincode=${pincode}`);
      return response;
    } catch (error) {
      console.error('Error fetching recommended services:', error);
      throw error;
    }
  }
};

export default repairServiceAPI;