import React, { useState, useEffect, useCallback } from 'react';
import {
  ShoppingBag,
  Clock,
  Wrench,
  CheckCircle,
  Truck,
  XCircle,
  Eye,
  Download,
  Calendar,
  ArrowLeft,
  Smartphone,
  MapPin,
  Package,
  Shield,
  RefreshCw,
  Search,
  ChevronDown,
  AlertCircle,
  Cpu,
  MessageSquare,
  FileText,
  Printer
} from 'lucide-react';
import './YourOrders.css';
import orderService from '../../services/orders';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

// Status configuration
const STATUS_CONFIG = {
  'PENDING': {
    color: '#6366f1',
    bgColor: '#eef2ff',
    icon: <Clock size={14} />,
    name: 'Pending',
    progress: 10
  },
  'ACCEPTED': {
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
    icon: <CheckCircle size={14} />,
    name: 'Accepted',
    progress: 20
  },
  'DELIVERY_ASSIGNED': {
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
    icon: <Truck size={14} />,
    name: 'Pickup Assigned',
    progress: 30
  },
  'DELIVERY_ACCEPTED': {
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
    icon: <Truck size={14} />,
    name: 'Pickup Accepted',
    progress: 35
  },
  'DEVICE_PICKED_UP': {
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
    icon: <Package size={14} />,
    name: 'Device Picked Up',
    progress: 40
  },
  'AT_SERVICE_CENTER': {
    color: '#f59e0b',
    bgColor: '#fffbeb',
    icon: <Wrench size={14} />,
    name: 'At Service Center',
    progress: 50
  },
  'UNDER_REPAIR': {
    color: '#f59e0b',
    bgColor: '#fffbeb',
    icon: <Wrench size={14} />,
    name: 'Under Repair',
    progress: 60
  },
  'REPAIR_COMPLETED': {
    color: '#10b981',
    bgColor: '#ecfdf5',
    icon: <CheckCircle size={14} />,
    name: 'Repair Completed',
    progress: 70
  },
  'READY_FOR_DELIVERY': {
    color: '#10b981',
    bgColor: '#ecfdf5',
    icon: <Package size={14} />,
    name: 'Ready for Delivery',
    progress: 75
  },
  'RETURN_DELIVERY_ASSIGNED': {
    color: '#10b981',
    bgColor: '#ecfdf5',
    icon: <Truck size={14} />,
    name: 'Return Assigned',
    progress: 80
  },
  'RETURN_DELIVERY_ACCEPTED': {
    color: '#10b981',
    bgColor: '#ecfdf5',
    icon: <Truck size={14} />,
    name: 'Return Accepted',
    progress: 85
  },
  'OUT_FOR_DELIVERY': {
    color: '#10b981',
    bgColor: '#ecfdf5',
    icon: <Truck size={14} />,
    name: 'Out for Delivery',
    progress: 90
  },
  'DELIVERED': {
    color: '#10b981',
    bgColor: '#ecfdf5',
    icon: <CheckCircle size={14} />,
    name: 'Delivered',
    progress: 100
  },
  'COMPLETED': {
    color: '#059669',
    bgColor: '#d1fae5',
    icon: <Shield size={14} />,
    name: 'Completed',
    progress: 100
  },
  'CANCELLED': {
    color: '#ef4444',
    bgColor: '#fef2f2',
    icon: <XCircle size={14} />,
    name: 'Cancelled',
    progress: 0
  },
  'REJECTED': {
    color: '#ef4444',
    bgColor: '#fef2f2',
    icon: <XCircle size={14} />,
    name: 'Rejected',
    progress: 0
  },
  'FAILED': {
    color: '#ef4444',
    bgColor: '#fef2f2',
    icon: <AlertCircle size={14} />,
    name: 'Failed',
    progress: 0
  }
};

const WORKFLOW_STEPS = [
  { id: 1, key: 'PENDING', label: 'Order Placed' },
  { id: 2, key: 'ACCEPTED', label: 'Accepted' },
  { id: 3, key: 'DELIVERY_ASSIGNED', label: 'Pickup Assigned' },
  { id: 4, key: 'DELIVERY_ACCEPTED', label: 'Pickup Accepted' },
  { id: 5, key: 'DEVICE_PICKED_UP', label: 'Picked Up' },
  { id: 6, key: 'AT_SERVICE_CENTER', label: 'At Service Center' },
  { id: 7, key: 'UNDER_REPAIR', label: 'Under Repair' },
  { id: 8, key: 'REPAIR_COMPLETED', label: 'Repair Completed' },
  { id: 9, key: 'READY_FOR_DELIVERY', label: 'Ready for Delivery' },
  { id: 10, key: 'RETURN_DELIVERY_ASSIGNED', label: 'Return Assigned' },
  { id: 11, key: 'RETURN_DELIVERY_ACCEPTED', label: 'Return Accepted' },
  { id: 12, key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
  { id: 13, key: 'DELIVERED', label: 'Delivered' },
];

// Skeleton Loader Component
const SkeletonLoader = () => {
  return (
    <div className="yourorders-skeleton-container">
      {/* Header Skeleton */}
      <div className="yourorders-skeleton-header">
        <div className="yourorders-skeleton-title">
          <div className="skeleton skeleton-icon"></div>
          <div className="skeleton-text-group">
            <div className="skeleton skeleton-main-title"></div>
            <div className="skeleton skeleton-subtitle"></div>
          </div>
        </div>
        <div className="skeleton skeleton-refresh-btn"></div>
      </div>

      {/* Search Bar Skeleton */}
      <div className="yourorders-skeleton-search">
        <div className="skeleton skeleton-search-bar"></div>
      </div>

      {/* Orders List Skeleton */}
      <div className="yourorders-skeleton-list">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="yourorders-skeleton-card">
            {/* Card Header */}
            <div className="skeleton-card-header">
              <div className="skeleton-card-header-left">
                <div className="skeleton skeleton-order-id"></div>
                <div className="skeleton skeleton-order-date"></div>
              </div>
              <div className="skeleton skeleton-status-badge"></div>
            </div>

            {/* Device Info */}
            <div className="skeleton-device-info">
              <div className="skeleton skeleton-device-icon"></div>
              <div className="skeleton-device-details">
                <div className="skeleton skeleton-device-name"></div>
                <div className="skeleton skeleton-issue-desc"></div>
              </div>
            </div>

            {/* Service & Price */}
            <div className="skeleton-service-price">
              <div className="skeleton skeleton-service-name"></div>
              <div className="skeleton skeleton-price"></div>
            </div>

            {/* Progress Bar */}
            <div className="skeleton-progress">
              <div className="skeleton skeleton-progress-bar"></div>
              <div className="skeleton skeleton-progress-text"></div>
            </div>

            {/* Action Buttons */}
            <div className="skeleton-actions">
              <div className="skeleton skeleton-action-btn"></div>
              <div className="skeleton skeleton-action-btn"></div>
              <div className="skeleton skeleton-action-btn"></div>
              <div className="skeleton skeleton-action-btn"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Tracking View Skeleton
const TrackingSkeletonLoader = () => {
  return (
    <div className="yourorders-tracking-skeleton">
      {/* Back Button */}
      <div className="skeleton skeleton-back-button"></div>

      {/* Tracking Header */}
      <div className="skeleton-tracking-header">
        <div className="skeleton skeleton-tracking-title"></div>
        <div className="skeleton skeleton-status-badge"></div>
      </div>

      {/* Device Card */}
      <div className="skeleton-device-card">
        <div className="skeleton skeleton-device-icon-large"></div>
        <div className="skeleton-device-info-large">
          <div className="skeleton skeleton-device-name-large"></div>
          <div className="skeleton skeleton-issue-desc-large"></div>
          <div className="skeleton-tags">
            <div className="skeleton skeleton-service-tag"></div>
            <div className="skeleton skeleton-price-tag"></div>
          </div>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="skeleton-progress-tracker">
        <div className="skeleton-tracker-header">
          <div className="skeleton skeleton-tracker-title"></div>
          <div className="skeleton skeleton-progress-circle"></div>
        </div>
        
        {/* Workflow Steps */}
        <div className="skeleton-workflow">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="skeleton-workflow-step">
              <div className="skeleton skeleton-step-marker"></div>
              <div className="skeleton skeleton-step-label"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Tracking Actions */}
      <div className="skeleton-tracking-actions">
        <div className="skeleton skeleton-action-btn-large"></div>
        <div className="skeleton skeleton-action-btn-large"></div>
        <div className="skeleton skeleton-action-btn-large"></div>
        <div className="skeleton skeleton-action-btn-large"></div>
      </div>
    </div>
  );
};

function YourOrders() {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showTrackOrder, setShowTrackOrder] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const MINIMUM_LOADING_TIME = 100;

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setShowSkeleton(true);
      setError(null);
      
      const response = await orderService.getUserOrders(1, 20, null);

      if (response.success) {
        setOrders(response.data.orders || []);
        setError(null);
      } else {
        throw new Error(response.message || 'Failed to fetch orders');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message || 'Failed to load orders');
    } finally {
      setTimeout(() => {
        setLoading(false);
        setShowSkeleton(false);
      }, MINIMUM_LOADING_TIME);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleTrackOrder = async (order) => {
    try {
      setShowSkeleton(true);
      const response = await orderService.getOrderWithFullDetails(order._id);
      if (response.success) {
        setSelectedOrder(response.data);
        setShowTrackOrder(true);
      }
    } catch (err) {
      console.error('Error fetching tracking details:', err);
      setSelectedOrder(order);
      setShowTrackOrder(true);
    } finally {
      setTimeout(() => {
        setShowSkeleton(false);
      }, 1000);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        const response = await orderService.cancelOrder(orderId, 'Customer request');
        if (response.success) {
          alert('Order cancelled successfully');
          fetchOrders();
        }
      } catch (err) {
        alert('Failed to cancel order: ' + err.message);
      }
    }
  };

  const handleCloseTracking = () => {
    setShowTrackOrder(false);
    setSelectedOrder(null);
  };

  const handleRefresh = () => {
    fetchOrders();
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today, ' + date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday, ' + date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays <= 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    }
  };

  const formatDateForInvoice = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDeviceIcon = (deviceType) => {
    switch (deviceType) {
      case 'laptop': return <Cpu size={16} />;
      case 'tablet': return <Smartphone size={16} />;
      case 'smartwatch': return <Smartphone size={16} />;
      default: return <Smartphone size={16} />;
    }
  };

  const getCurrentStepIndex = (status) => {
    const statusUpper = status?.toUpperCase();
    if (statusUpper === 'COMPLETED') {
      return WORKFLOW_STEPS.findIndex(step => step.key === 'DELIVERED');
    }
    return WORKFLOW_STEPS.findIndex(step => step.key === statusUpper);
  };

  // Helper function to get display amount
  const getDisplayAmount = (order) => {
    // ✅ Use total_order_amount if available (includes delivery fees)
    // Otherwise fallback to final_price (service only)
    return order.total_order_amount || order.final_price || 0;
  };

  const generateInvoice = (order) => {
    if (!order) return;

    try {
      const doc = new jsPDF();
      const invoiceNumber = order.tracking_number || `INV-${order._id?.slice(-8)?.toUpperCase() || '000000'}`;
      const invoiceDate = formatDateForInvoice(new Date());
      const displayAmount = getDisplayAmount(order);
      
      // Set document properties
      doc.setProperties({
        title: `FixFlash Invoice - ${invoiceNumber}`,
        subject: 'Device Repair Invoice',
        author: 'FixFlash',
        keywords: 'invoice, repair, service, fixflash',
        creator: 'FixFlash'
      });

      // Company Header
      doc.setFontSize(24);
      doc.setTextColor(41, 98, 255);
      doc.setFont('helvetica', 'bold');
      doc.text('FixFlash', 14, 22);
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.setFont('helvetica', 'normal');
      doc.text('Professional Device Repair Services', 14, 30);
      doc.text('GSTIN: 29ABCDE1234F1Z5', 14, 36);
      doc.text('Phone: +91 9876543210 | Email: support@fixflash.com', 14, 42);
      
      // Invoice Title
      doc.setFontSize(20);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.text('INVOICE', 160, 22, null, null, 'right');
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Invoice #: ${invoiceNumber}`, 160, 30, null, null, 'right');
      doc.text(`Date: ${invoiceDate}`, 160, 36, null, null, 'right');
      
      // Customer Information
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Bill To:', 14, 60);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const customerName = order.customer_name || 'Customer';
      const customerPhone = order.customer_phone || 'Not provided';
      
      doc.text(customerName, 14, 68);
      doc.text(`Phone: ${customerPhone}`, 14, 74);
      
      // Get address details
      if (order.pickup_address && typeof order.pickup_address === 'object') {
        doc.text(`Address: ${order.pickup_address.address_line || ''}, ${order.pickup_address.city || ''}, ${order.pickup_address.state || ''} - ${order.pickup_address.pincode || ''}`, 14, 80);
      } else {
        doc.text(`Address: Not provided`, 14, 80);
      }
      
      // Order Details
      let yPos = 95;
      
      // Order Information Section
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Order Information', 14, yPos);
      yPos += 8;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Order ID: ${order.tracking_number || 'N/A'}`, 14, yPos);
      doc.text(`Order Date: ${formatDateForInvoice(order.createdAt)}`, 110, yPos);
      yPos += 6;
      doc.text(`Status: ${order.status?.toUpperCase() || 'PENDING'}`, 14, yPos);
      doc.text(`Device Type: ${order.device_type?.toUpperCase() || 'N/A'}`, 110, yPos);
      yPos += 12;
      
      // Device Information Section
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Device Information', 14, yPos);
      yPos += 8;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Brand: ${order.device_brand || 'N/A'}`, 14, yPos);
      doc.text(`Model: ${order.device_model || 'N/A'}`, 110, yPos);
      yPos += 6;
      doc.text(`Variant: ${order.device_variant || 'N/A'}`, 14, yPos);
      yPos += 6;
      doc.text(`Issue: ${order.issue_description || 'N/A'}`, 14, yPos);
      yPos += 12;
      
      // Service Details Section
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Service Details', 14, yPos);
      yPos += 8;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Service: ${order.service_name || 'General Repair'}`, 14, yPos);
      doc.text(`Service Center: ${order.service_center_info?.outlet_name || 'FixFlash Service Center'}`, 110, yPos);
      yPos += 6;
      doc.text(`Estimated Time: ${order.estimated_time || 0} minutes`, 14, yPos);
      doc.text(`Warranty: ${order.warranty_period ? order.warranty_period + ' days' : '30 days'}`, 110, yPos);
      yPos += 12;
      
      // Pricing Table
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Pricing Details', 14, yPos);
      yPos += 10;
      
      // Draw table header
      doc.setFillColor(16, 185, 129);
      doc.rect(14, yPos, 180, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text('Description', 18, yPos + 6);
      doc.text('Amount (₹)', 170, yPos + 6, null, null, 'right');
      yPos += 8;
      
      // Reset color
      doc.setTextColor(0, 0, 0);
      
      // ✅ Calculate fees breakdown (if available)
      const servicePrice = order.final_price || order.service_price || 0;
      const deliveryFee = order.delivery_fee || 0;
      const pickupFee = order.cumulative_pickup_fee || 0;
      const additionalCharges = order.repair_progress?.additional_charges || 0;
      const partsCost = order.repair_progress?.parts_used?.reduce((total, part) => total + (part.part_cost * part.quantity), 0) || 0;
      
      // Table rows
      const pricingData = [
        ['Service Charges', servicePrice],
        ['Parts Cost', partsCost],
        ['Additional Charges', additionalCharges],
        ['Pickup Delivery', pickupFee],
        ['Return Delivery', deliveryFee]
      ];
      
      // Filter out zero value rows
      const nonZeroPricingData = pricingData.filter(([_, amount]) => amount > 0);
      
      nonZeroPricingData.forEach(([description, amount]) => {
        doc.rect(14, yPos, 180, 8);
        doc.text(description, 18, yPos + 6);
        doc.text(amount.toFixed(2), 170, yPos + 6, null, null, 'right');
        yPos += 8;
      });
      
      // Total row
      doc.setFillColor(239, 246, 255);
      doc.rect(14, yPos, 180, 10, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('Total Amount', 18, yPos + 7);
      doc.text(`₹${displayAmount.toFixed(2)}`, 170, yPos + 7, null, null, 'right');
      yPos += 15;
      
      // Footer Notes
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.setFont('helvetica', 'normal');
      
      const notes = [
        'Thank you for choosing FixFlash!',
        '• This is a computer-generated invoice and does not require a signature.',
        '• Warranty is valid only for the repairs mentioned above.',
        '• Please keep this invoice for future reference and warranty claims.',
        '• For any queries, contact: support@fixflash.com or call +91 9876543210'
      ];
      
      notes.forEach((note, index) => {
        doc.text(note, 14, yPos + (index * 5));
      });
      
      yPos += 30;
      
      // Terms and Conditions
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text('Terms & Conditions:', 14, yPos);
      doc.text('1. All repairs are covered under warranty for the specified period.', 14, yPos + 4);
      doc.text('2. Warranty does not cover physical damage or liquid damage.', 14, yPos + 8);
      doc.text('3. Original data backup is customer\'s responsibility.', 14, yPos + 12);
      
      // Save the PDF
      const fileName = `FixFlash_Invoice_${invoiceNumber}.pdf`;
      doc.save(fileName);
      
      // Show success message
      alert(`Invoice downloaded successfully: ${fileName}`);
      
    } catch (error) {
      console.error('Error generating invoice:', error);
      alert('Failed to generate invoice. Please try again.');
    }
  };

  const handlePrintInvoice = (order) => {
    if (!order) return;
    
    const displayAmount = getDisplayAmount(order);
    const invoiceNumber = order.tracking_number || `INV-${order._id?.slice(-8)?.toUpperCase() || '000000'}`;
    const invoiceDate = formatDateForInvoice(new Date());
    const customerName = order.customer_name || 'Customer';
    const customerPhone = order.customer_phone || 'Not provided';
    
    // Create a print-friendly version
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>FixFlash Invoice - ${invoiceNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .header { border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
          .company-name { color: #2563eb; font-size: 28px; font-weight: bold; margin: 0; }
          .company-tagline { color: #666; font-size: 14px; margin: 5px 0; }
          .invoice-title { text-align: right; font-size: 24px; font-weight: bold; color: #111; }
          .section { margin: 20px 0; }
          .section-title { background: #2563eb; color: white; padding: 8px 12px; font-weight: bold; }
          .info-table { width: 100%; border-collapse: collapse; margin: 10px 0; }
          .info-table th, .info-table td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
          .info-table th { background: #f3f4f6; font-weight: bold; }
          .pricing-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .pricing-table th, .pricing-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          .pricing-table th { background: #10b981; color: white; }
          .total-row { background: #f0f9ff; font-weight: bold; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div style="display: flex; justify-content: space-between;">
            <div>
              <h1 class="company-name">FixFlash</h1>
              <p class="company-tagline">Professional Device Repair Services</p>
              <p style="font-size: 12px; color: #666;">
                GSTIN: 29ABCDE1234F1Z5<br>
                Phone: +91 9876543210<br>
                Email: support@fixflash.com
              </p>
            </div>
            <div>
              <h2 class="invoice-title">INVOICE</h2>
              <p style="text-align: right;">
                <strong>Invoice #:</strong> ${invoiceNumber}<br>
                <strong>Date:</strong> ${invoiceDate}
              </p>
            </div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">Customer Information</div>
          <p><strong>Name:</strong> ${customerName}</p>
          <p><strong>Phone:</strong> ${customerPhone}</p>
          <p><strong>Address:</strong> ${order.pickup_address && typeof order.pickup_address === 'object' 
            ? `${order.pickup_address.address_line || ''}, ${order.pickup_address.city || ''}, ${order.pickup_address.state || ''} - ${order.pickup_address.pincode || ''}`
            : 'Not provided'}</p>
        </div>
        
        <div class="section">
          <div class="section-title">Order Information</div>
          <table class="info-table">
            <tr>
              <th>Order ID</th>
              <td>${order.tracking_number || 'N/A'}</td>
              <th>Order Date</th>
              <td>${formatDateForInvoice(order.createdAt)}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>${order.status?.toUpperCase() || 'PENDING'}</td>
              <th>Device Type</th>
              <td>${order.device_type?.toUpperCase() || 'N/A'}</td>
            </tr>
          </table>
        </div>
        
        <div class="section">
          <div class="section-title">Device Information</div>
          <table class="info-table">
            <tr>
              <th>Device Brand</th>
              <td>${order.device_brand || 'N/A'}</td>
              <th>Device Model</th>
              <td>${order.device_model || 'N/A'}</td>
            </tr>
            <tr>
              <th>Variant</th>
              <td>${order.device_variant || 'N/A'}</td>
              <th>Issue Description</th>
              <td>${order.issue_description || 'N/A'}</td>
            </tr>
          </table>
        </div>
        
        <div class="section">
          <div class="section-title">Service Details</div>
          <table class="info-table">
            <tr>
              <th>Service Name</th>
              <td>${order.service_name || 'General Repair'}</td>
              <th>Service Center</th>
              <td>${order.service_center_info?.outlet_name || 'FixFlash Service Center'}</td>
            </tr>
            <tr>
              <th>Estimated Time</th>
              <td>${order.estimated_time || 0} minutes</td>
              <th>Warranty</th>
              <td>${order.warranty_period ? order.warranty_period + ' days' : '30 days'}</td>
            </tr>
          </table>
        </div>
        
        <div class="section">
          <div class="section-title">Pricing Details</div>
          <table class="pricing-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              ${[
                { label: 'Service Charges', amount: order.final_price || order.service_price || 0 },
                { label: 'Parts Cost', amount: order.repair_progress?.parts_used?.reduce((total, part) => total + (part.part_cost * part.quantity), 0) || 0 },
                { label: 'Additional Charges', amount: order.repair_progress?.additional_charges || 0 },
                { label: 'Pickup Delivery', amount: order.cumulative_pickup_fee || 0 },
                { label: 'Return Delivery', amount: order.delivery_fee || 0 }
              ]
                .filter(item => item.amount > 0)
                .map(item => `
                  <tr>
                    <td>${item.label}</td>
                    <td>${item.amount.toFixed(2)}</td>
                  </tr>
                `).join('')}
              <tr class="total-row">
                <td><strong>Total Amount</strong></td>
                <td><strong>₹${displayAmount.toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="footer">
          <p><strong>Thank you for choosing FixFlash!</strong></p>
          <p>• This is a computer-generated invoice and does not require a signature.</p>
          <p>• Warranty is valid only for the repairs mentioned above.</p>
          <p>• Please keep this invoice for future reference and warranty claims.</p>
          <p>• For any queries, contact: support@fixflash.com or call +91 9876543210</p>
          <br>
          <p style="font-size: 10px; color: #888;">
            <strong>Terms & Conditions:</strong><br>
            1. All repairs are covered under warranty for the specified period.<br>
            2. Warranty does not cover physical damage or liquid damage.<br>
            3. Original data backup is customer's responsibility.
          </p>
        </div>
        
        <div class="no-print" style="margin-top: 30px; text-align: center;">
          <button onclick="window.print()" style="padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Print Invoice
          </button>
          <button onclick="window.close()" style="padding: 10px 20px; background: #666; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">
            Close
          </button>
        </div>
        
        <script>
          // Auto-print option
          setTimeout(function() {
            window.print();
          }, 1000);
        </script>
      </body>
      </html>
    `);
    
    printWindow.document.close();
  };

  const filteredOrders = orders.filter(order => {
    if (!searchQuery) return true;

    const searchLower = searchQuery.toLowerCase();
    return (
      order.tracking_number?.toLowerCase().includes(searchLower) ||
      order.device_brand?.toLowerCase().includes(searchLower) ||
      order.device_model?.toLowerCase().includes(searchLower) ||
      order.service_name?.toLowerCase().includes(searchLower)
    );
  });

  if (showSkeleton && !showTrackOrder) {
    return <SkeletonLoader />;
  }

  if (showSkeleton && showTrackOrder) {
    return <TrackingSkeletonLoader />;
  }

  if (showTrackOrder && selectedOrder) {
    const currentStepIndex = getCurrentStepIndex(selectedOrder.status);
    const config = STATUS_CONFIG[selectedOrder.status?.toUpperCase()] || STATUS_CONFIG.PENDING;
    const displayAmount = getDisplayAmount(selectedOrder);

    return (
      <div className="yourorders-container">
        <button className="yourorders-back" onClick={handleCloseTracking}>
          <ArrowLeft size={20} />
          Back to Orders
        </button>

        <div className="yourorders-tracking-header">
          <div className="yourorders-tracking-title">
            <h1>Track Order</h1>
            <p className="yourorders-tracking-id">{selectedOrder.tracking_number}</p>
          </div>
          <div className="yourorders-tracking-status" style={{ backgroundColor: config.bgColor, color: config.color }}>
            {config.icon}
            <span>{config.name}</span>
          </div>
        </div>

        <div className="yourorders-device-card">
          <div className="yourorders-device-icon" style={{ backgroundColor: config.bgColor, color: config.color }}>
            {getDeviceIcon(selectedOrder.device_type)}
          </div>
          <div className="yourorders-device-info">
            <h3>{selectedOrder.device_brand} {selectedOrder.device_model}</h3>
            <p className="yourorders-device-issue">{selectedOrder.issue_description}</p>
            <div className="yourorders-device-meta">
              <span className="yourorders-service-tag">{selectedOrder.service_name}</span>
              {/* ✅ CHANGED HERE: Use total_order_amount instead of final_price */}
              <span className="yourorders-price-tag">₹{displayAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <div className="yourorders-progress-tracker">
          <div className="yourorders-tracker-header">
            <h3>Repair Progress</h3>
            <div className="yourorders-progress-circle">
              <svg width="40" height="40" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none" stroke="#e5e7eb" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none" stroke={config.color} strokeWidth="3"
                  strokeDasharray={`${config.progress}, 100`} strokeLinecap="round" />
              </svg>
              <span>{config.progress}%</span>
            </div>
          </div>

          <div className="yourorders-workflow">
            {WORKFLOW_STEPS.map((step, index) => {
              const isActive = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step.id} className={`yourorders-workflow-step ${isActive ? 'yourorders-step-active' : ''} ${isCurrent ? 'yourorders-step-current' : ''}`}>
                  <div className="yourorders-step-marker" style={{
                    backgroundColor: isActive ? config.color : '#e5e7eb',
                    borderColor: isActive ? config.color : '#e5e7eb'
                  }}>
                    {isActive ? <CheckCircle size={10} /> : <div className="yourorders-step-number">{step.id}</div>}
                  </div>
                  <div className="yourorders-step-content">
                    <p className="yourorders-step-label">{step.label}</p>
                    {isCurrent && <div className="yourorders-current-indicator">Current</div>}
                  </div>
                  {index < WORKFLOW_STEPS.length - 1 && (
                    <div className="yourorders-step-connector" style={{ backgroundColor: isActive ? config.color : '#e5e7eb' }}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="yourorders-tracking-actions">
          <button className="yourorders-btn-secondary" onClick={handleRefresh}>
            <RefreshCw size={14} />
            Refresh Status
          </button>
          <button className="yourorders-btn-primary" onClick={() => generateInvoice(selectedOrder)}>
            <Download size={14} />
            Download Invoice
          </button>
          <button className="yourorders-btn-secondary" onClick={() => handlePrintInvoice(selectedOrder)}>
            <Printer size={14} />
            Print Invoice
          </button>
          <button className="yourorders-btn-support" onClick={() => navigate('/help-support')}>
            <MessageSquare size={14} />
            Support
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="yourorders-container">
      <div className="yourorders-header">
        <div className="yourorders-header-main">
          <div className="yourorders-title">
            <ShoppingBag size={24} />
            <div className="yourorders-title-content">
              <h1>Your Orders</h1>
              <p className="yourorders-subtitle">Track and manage your repair orders</p>
            </div>
          </div>
          <button className="yourorders-refresh-btn" onClick={handleRefresh} title="Refresh orders">
            <RefreshCw size={20} />
            <span className="yourorders-refresh-text">Refresh</span>
          </button>
        </div>
      </div>

      <div className="yourorders-search">
        <div className="yourorders-search-input">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search orders by ID, device, or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="yourorders-clear-search" onClick={() => setSearchQuery('')}>
              ×
            </button>
          )}
        </div>
      </div>

      {error && orders.length === 0 ? (
        <div className="yourorders-error">
          <AlertCircle size={40} />
          <h3>Unable to Load Orders</h3>
          <p>{error}</p>
          <button onClick={handleRefresh}>Try Again</button>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="yourorders-empty">
          <Package size={40} />
          <h3>No Orders Found</h3>
          <p>{searchQuery ? 'No orders match your search' : 'You have no orders yet'}</p>
          {searchQuery && (
            <button onClick={() => setSearchQuery('')}>Clear Search</button>
          )}
        </div>
      ) : (
        <>
          <div className="yourorders-list">
            {filteredOrders.map(order => {
              const config = STATUS_CONFIG[order.status?.toUpperCase()] || STATUS_CONFIG.PENDING;
              const isExpanded = expandedOrderId === order._id;
              const canGenerateInvoice = ['DELIVERED', 'COMPLETED', 'REPAIR_COMPLETED', 'READY_FOR_DELIVERY'].includes(order.status?.toUpperCase());
              const displayAmount = getDisplayAmount(order);

              return (
                <div key={order._id} className="yourorders-card">
                  <div className="yourorders-card-header" onClick={() => toggleOrderExpansion(order._id)}>
                    <div className="yourorders-card-info">
                      <div className="yourorders-id">
                        <span className="yourorders-id-label">Order ID</span>
                        <span className="yourorders-id-value">{order.tracking_number}</span>
                      </div>
                      <div className="yourorders-date">
                        <Calendar size={14} />
                        {formatDate(order.createdAt)}
                      </div>
                    </div>
                    <div className="yourorders-card-status">
                      <div className="yourorders-status-badge" style={{
                        backgroundColor: config.bgColor,
                        color: config.color,
                        borderColor: config.color
                      }}>
                        {config.icon}
                        <span>{config.name}</span>
                      </div>
                      <ChevronDown size={18} className={`yourorders-expand-icon ${isExpanded ? 'yourorders-expanded' : ''}`} />
                    </div>
                  </div>

                  <div className="yourorders-card-content">
                    <div className="yourorders-card-device">
                      <div className="yourorders-card-device-icon" style={{ backgroundColor: config.bgColor, color: config.color }}>
                        {getDeviceIcon(order.device_type)}
                      </div>
                      <div className="yourorders-device-details">
                        <h3>{order.device_brand} {order.device_model}</h3>
                        <p className="yourorders-card-issue">{order.issue_description}</p>
                      </div>
                    </div>

                    <div className="yourorders-card-meta">
                      <div className="yourorders-service-info">
                        <span className="yourorders-service-name">{order.service_name}</span>
                      </div>
                      <div className="yourorders-price-info">
                        <span className="yourorders-price-label">Total</span>
                        {/* ✅ CHANGED HERE: Use total_order_amount instead of final_price */}
                        <span className="yourorders-price-amount">₹{displayAmount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <div className="yourorders-card-progress">
                      <div className="yourorders-progress-bar">
                        <div
                          className="yourorders-progress-fill"
                          style={{
                            width: `${config.progress}%`,
                            backgroundColor: config.color
                          }}
                        ></div>
                      </div>
                      <span className="yourorders-progress-text">{config.progress}% complete</span>
                    </div>

                    {isExpanded && (
                      <div className="yourorders-expanded-details">
                        <div className="yourorders-details-grid">
                          {order.service_center_info?.outlet_name && (
                            <div className="yourorders-detail-item">
                              <span className="yourorders-detail-label">Service Center:</span>
                              <span className="yourorders-detail-value">{order.service_center_info.outlet_name}</span>
                            </div>
                          )}
                          {order.delivery_partner?.name && (
                            <div className="yourorders-detail-item">
                              <span className="yourorders-detail-label">Delivery Partner:</span>
                              <span className="yourorders-detail-value">{order.delivery_partner.name}</span>
                            </div>
                          )}
                          {order.estimated_completion && (
                            <div className="yourorders-detail-item">
                              <span className="yourorders-detail-label">Estimated Completion:</span>
                              <span className="yourorders-detail-value">{formatDate(order.estimated_completion)}</span>
                            </div>
                          )}
                          {/* ✅ Show price breakdown if available */}
                          {order.total_order_amount && (
                            <div className="yourorders-detail-item">
                              <span className="yourorders-detail-label">Total Amount:</span>
                              <span className="yourorders-detail-value">
                                ₹{order.total_order_amount.toLocaleString('en-IN')}
                                {order.final_price !== order.total_order_amount && (
                                  <span className="yourorders-price-breakdown"> (Includes delivery fees)</span>
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="yourorders-card-actions">
                      <button
                        className="yourorders-btn-track"
                        onClick={() => handleTrackOrder(order)}
                      >
                        <MapPin size={14} />
                        <span>Track</span>
                      </button>
                      <button
                        className="yourorders-btn-details"
                        onClick={() => handleTrackOrder(order)}
                      >
                        <Eye size={14} />
                        <span>Details</span>
                      </button>
                      {canGenerateInvoice && (
                        <button
                          className="yourorders-btn-invoice"
                          onClick={() => generateInvoice(order)}
                        >
                          <FileText size={14} />
                          <span>Invoice</span>
                        </button>
                      )}
                      {(order.status === 'pending' || order.status === 'accepted') && (
                        <button
                          className="yourorders-btn-cancel"
                          onClick={() => handleCancelOrder(order._id)}
                        >
                          <XCircle size={14} />
                          <span>Cancel</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {orders.length > 0 && (
            <div className="yourorders-load-more">
              <button className="yourorders-load-btn" onClick={handleRefresh}>
                <RefreshCw size={16} />
                <span>Load More</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default YourOrders;