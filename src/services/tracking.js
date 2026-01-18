import api from './api.js';

export const trackingService = {
  getTrackingInfo: async (orderId) => {
    const response = await api(`/tracking/${orderId}`);
    return response;
  },

  getPublicTracking: async (orderNumber) => {
    const response = await api(`/tracking/public/${orderNumber}`);
    return response;
  }
};