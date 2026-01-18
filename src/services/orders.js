// src/services/orders.js
import api from './api';

// Create a new order
export const createOrder = async (orderData) => {
  try {
    console.log('📦 Creating order with data:', orderData);
    const response = await api('/api/orders', {
      method: 'POST',
      body: orderData
    });
    console.log('✅ Order creation response:', response);
    return response;
  } catch (error) {
    console.error('❌ Create order error:', error);
    throw { success: false, message: error.message || 'Failed to create order' };
  }
};

// Get user orders
export const getUserOrders = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await api(`/api/orders${queryString ? `?${queryString}` : ''}`);
    return response;
  } catch (error) {
    console.error('❌ Get user orders error:', error);
    throw { success: false, message: error.message || 'Failed to fetch orders' };
  }
};

// Get single order
export const getOrder = async (orderId) => {
  try {
    const response = await api(`/api/orders/${orderId}`);
    return response;
  } catch (error) {
    console.error('❌ Get order error:', error);
    throw { success: false, message: error.message || 'Failed to fetch order details' };
  }
};

// Cancel order
export const cancelOrder = async (orderId, reason = '') => {
  try {
    const response = await api(`/api/orders/${orderId}/cancel`, {
      method: 'PUT',
      body: { reason }
    });
    return response;
  } catch (error) {
    console.error('❌ Cancel order error:', error);
    throw { success: false, message: error.message || 'Failed to cancel order' };
  }
};

// Track order by tracking number
export const trackOrder = async (trackingNumber) => {
  try {
    const response = await api(`/api/orders/track/${trackingNumber}`);
    return response;
  } catch (error) {
    console.error('❌ Track order error:', error);
    throw { success: false, message: error.message || 'Failed to track order' };
  }
};

// Calculate order total including delivery fees
export const calculateOrderTotal = async (orderData) => {
  try {
    console.log('💰 Calculating order total with data:', orderData);
    const response = await api('/api/orders/calculate-total', {
      method: 'POST',
      body: orderData
    });
    console.log('✅ Order total calculation response:', response);
    return response;
  } catch (error) {
    console.error('❌ Calculate order total error:', error);
    throw { 
      success: false, 
      message: error.message || 'Failed to calculate order total' 
    };
  }
};

export default {
  createOrder,
  getUserOrders,
  getOrder,
  cancelOrder,
  trackOrder,
  calculateOrderTotal
};