import React, { useState } from 'react'
import { 
  ShoppingBag, 
  Clock, 
  Wrench, 
  CheckCircle, 
  Truck, 
  XCircle, 
  Eye, 
  Package,
  Download,
  UserCheck,
  Home,
  Calendar,
  ArrowLeft
} from 'lucide-react'
import './YourOrders.css'

function YourOrders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showTrackOrder, setShowTrackOrder] = useState(false);

  // Fake orders data with more details
  const orders = [
    {
      id: 'ORD-12345',
      model: 'iPhone 13 Pro',
      image: 'https://placehold.co/80x80/007AFF/FFFFFF?text=iPhone',
      issue: 'Screen Replacement',
      date: '2023-10-15',
      status: 'Repaired',
      cost: 8999,
      progress: [
        { stage: 'Order Placed', date: '2023-10-15 10:30', completed: true },
        { stage: 'Order Picked Up', date: '2023-10-16 14:15', completed: true },
        { stage: 'Repairing', date: '2023-10-17 09:45', completed: true },
        { stage: 'Quality Check', date: '2023-10-18 11:20', completed: true },
        { stage: 'Out for Delivery', date: '2023-10-19 15:00', completed: false },
        { stage: 'Delivered', date: '', completed: false }
      ],
      services: [
        { name: 'Screen Replacement', cost: 6999 },
        { name: 'Labor Charges', cost: 1500 },
        { name: 'GST (18%)', cost: 500 }
      ],
      address: '201, Royal Apartments, MG Road, Pune, Maharashtra - 411001',
      technician: 'Rajesh Kumar',
      estimatedDelivery: '2023-10-20'
    },
    {
      id: 'ORD-12346',
      model: 'Samsung Galaxy S21',
      image: 'https://placehold.co/80x80/1428A0/FFFFFF?text=Samsung',
      issue: 'Battery Replacement',
      date: '2023-10-10',
      status: 'In Progress',
      cost: 3499,
      progress: [
        { stage: 'Order Placed', date: '2023-10-10 11:45', completed: true },
        { stage: 'Order Picked Up', date: '2023-10-11 16:30', completed: true },
        { stage: 'Repairing', date: '2023-10-12 10:15', completed: true },
        { stage: 'Quality Check', date: '', completed: false },
        { stage: 'Out for Delivery', date: '', completed: false },
        { stage: 'Delivered', date: '', completed: false }
      ],
      services: [
        { name: 'Battery Replacement', cost: 2499 },
        { name: 'Labor Charges', cost: 800 },
        { name: 'GST (18%)', cost: 200 }
      ],
      address: '502, Sunshine Residency, Koregaon Park, Pune, Maharashtra - 411001',
      technician: 'Vikram Singh',
      estimatedDelivery: '2023-10-15'
    },
    {
      id: 'ORD-12347',
      model: 'Google Pixel 6',
      image: 'https://placehold.co/80x80/4285F4/FFFFFF?text=Pixel',
      issue: 'Camera Repair',
      date: '2023-10-05',
      status: 'Delivered',
      cost: 5499,
      progress: [
        { stage: 'Order Placed', date: '2023-10-05 09:15', completed: true },
        { stage: 'Order Picked Up', date: '2023-10-06 13:45', completed: true },
        { stage: 'Repairing', date: '2023-10-07 11:20', completed: true },
        { stage: 'Quality Check', date: '2023-10-08 10:30', completed: true },
        { stage: 'Out for Delivery', date: '2023-10-09 14:00', completed: true },
        { stage: 'Delivered', date: '2023-10-09 16:45', completed: true }
      ],
      services: [
        { name: 'Camera Module Replacement', cost: 3999 },
        { name: 'Labor Charges', cost: 1200 },
        { name: 'GST (18%)', cost: 300 }
      ],
      address: 'B-12, Green Valley Society, Kothrud, Pune, Maharashtra - 411038',
      technician: 'Anil Patil',
      estimatedDelivery: '2023-10-09'
    }
  ]

  // Function to get status icon and color
  const getStatusInfo = (status) => {
    switch(status) {
      case 'Pending':
        return { icon: <Clock size={16} />, color: '#ff9800' }
      case 'In Progress':
        return { icon: <Wrench size={16} />, color: '#2196f3' }
      case 'Repaired':
        return { icon: <CheckCircle size={16} />, color: '#4caf50' }
      case 'Delivered':
        return { icon: <Truck size={16} />, color: '#673ab7' }
      case 'Cancelled':
        return { icon: <XCircle size={16} />, color: '#f44336' }
      default:
        return { icon: <Clock size={16} />, color: '#ff9800' }
    }
  }

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  }

  const handleTrackOrder = (order) => {
    setSelectedOrder(order);
    setShowTrackOrder(true);
  }

  const handleCloseDetails = () => {
    setShowOrderDetails(false);
    setShowTrackOrder(false);
    setSelectedOrder(null);
  }

  const downloadInvoice = () => {
    // In a real app, this would generate/download a PDF invoice
    alert('Invoice download started!');
  }

  // Render the track order page
  if (showTrackOrder && selectedOrder) {
    return (
      <div className="your-orders-container">
        <div className="orders-header">
          <div className="header-title">
            <button 
              className="back-button"
              onClick={handleCloseDetails}
            >
              <ArrowLeft size={20} />
            </button>
            <Package size={28} />
            <h1>Track Order - {selectedOrder.id}</h1>
          </div>
          <p>Tracking the progress of your repair order</p>
        </div>

        <div className="track-order-content">
          <div className="order-tracking-card">
            <div className="tracking-header">
              <div className="tracking-device-info">
                <img src={selectedOrder.image} alt={selectedOrder.model} />
                <div>
                  <h3>{selectedOrder.model}</h3>
                  <p>{selectedOrder.issue}</p>
                </div>
              </div>
              <div 
                className="tracking-status-badge"
                style={{ 
                  color: getStatusInfo(selectedOrder.status).color, 
                  backgroundColor: `${getStatusInfo(selectedOrder.status).color}15` 
                }}
              >
                {getStatusInfo(selectedOrder.status).icon}
                <span>{selectedOrder.status}</span>
              </div>
            </div>

            <div className="progress-tracker-section">
              <h3>Repair Progress</h3>
              <div className="progress-tracker">
                {selectedOrder.progress.map((step, index) => (
                  <div key={index} className={`progress-step ${step.completed ? 'completed' : ''}`}>
                    <div className="step-icon">
                      {step.completed ? <CheckCircle size={16} /> : <Clock size={16} />}
                    </div>
                    <div className="step-details">
                      <p className="step-name">{step.stage}</p>
                      {step.date && <p className="step-date">{step.date}</p>}
                    </div>
                    {index < selectedOrder.progress.length - 1 && (
                      <div className="step-connector"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="tracking-footer">
              <div className="tracking-info-item">
                <UserCheck size={16} />
                <span><strong>Technician:</strong> {selectedOrder.technician}</span>
              </div>
              <div className="tracking-info-item">
                <Calendar size={16} />
                <span><strong>Estimated Delivery:</strong> {selectedOrder.estimatedDelivery}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render the main orders list
  return (
    <div className="your-orders-container">
      <div className="orders-header">
        <div className="header-title">
          <ShoppingBag size={28} />
          <h1>Your Orders</h1>
        </div>
        <p>View and manage all your repair orders</p>
      </div>

      <div className="orders-list">
        {orders.map(order => {
          const statusInfo = getStatusInfo(order.status)
          
          return (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-id">Order ID: {order.id}</div>
                <div className="order-date">Placed on: {order.date}</div>
              </div>
              
              <div className="order-content">
                <div className="phone-info">
                  <img src={order.image} alt={order.model} className="phone-image" />
                  <div className="phone-details">
                    <h3 className="phone-model">{order.model}</h3>
                    <p className="phone-issue">{order.issue}</p>
                  </div>
                </div>
                
                <div className="order-status">
                  <div 
                    className="status-badge"
                    style={{ color: statusInfo.color, borderColor: statusInfo.color }}
                  >
                    {statusInfo.icon}
                    <span>{order.status}</span>
                  </div>
                </div>
                
                <div className="order-cost">
                  <div className="cost-label">Total Cost</div>
                  <div className="cost-amount">₹{order.cost.toLocaleString()}</div>
                </div>
                
                <div className="order-actions">
                  <button 
                    className="btn-view-details"
                    onClick={() => handleViewDetails(order)}
                  >
                    <Eye size={16} />
                    <span>View Details</span>
                  </button>
                  <button 
                    className="btn-track-order"
                    onClick={() => handleTrackOrder(order)}
                  >
                    <Package size={16} />
                    <span>Track Order</span>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="order-details-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Order Details - {selectedOrder.id}</h2>
              <button className="close-modal" onClick={handleCloseDetails}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="order-summary">
                <div className="summary-item">
                  <h3>Device Information</h3>
                  <div className="device-details">
                    <img src={selectedOrder.image} alt={selectedOrder.model} />
                    <div>
                      <p><strong>Model:</strong> {selectedOrder.model}</p>
                      <p><strong>Issue:</strong> {selectedOrder.issue}</p>
                    </div>
                  </div>
                </div>
                
                <div className="summary-item">
                  <h3>Service Details</h3>
                  <div className="services-list">
                    {selectedOrder.services.map((service, index) => (
                      <div key={index} className="service-item">
                        <span className="service-name">{service.name}</span>
                        <span className="service-cost">₹{service.cost.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="service-total">
                      <strong>Total</strong>
                      <strong>₹{selectedOrder.cost.toLocaleString()}</strong>
                    </div>
                  </div>
                </div>
                
                <div className="summary-item">
                  <h3>Additional Information</h3>
                  <div className="additional-info">
                    <p><UserCheck size={16} /> <strong>Technician:</strong> {selectedOrder.technician}</p>
                    <p><Home size={16} /> <strong>Delivery Address:</strong> {selectedOrder.address}</p>
                    <p><Calendar size={16} /> <strong>Estimated Delivery:</strong> {selectedOrder.estimatedDelivery}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-download-invoice" onClick={downloadInvoice}>
                <Download size={16} />
                <span>Download Invoice</span>
              </button>
              <button className="btn-close" onClick={handleCloseDetails}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default YourOrders