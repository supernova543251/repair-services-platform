// src/services/device.js
import api from './api';

export const deviceService = {
  // Get all devices with filtering and pagination
  getDevices: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    // Add all provided parameters to query string
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = `/api/devices${queryString ? `?${queryString}` : ''}`;
    
    return await api(url);
  },

  // Get single device by ID
  getDevice: async (id) => {
    return await api(`/api/devices/${id}`);
  },

  // Search devices by brand and model
  searchDevices: async (searchTerm, brand = null) => {
    const params = {
      search: searchTerm,
      limit: 50 // Increase limit for search
    };
    
    if (brand) {
      params.brand = brand;
    }
    
    return await deviceService.getDevices(params);
  },

  // Get devices by specific brand
  getDevicesByBrand: async (brandName) => {
    return await deviceService.getDevices({
      brand: brandName,
      is_active: true,
      limit: 100 // Get more devices for a brand
    });
  }
};

export default deviceService;