import React, { useState, useEffect } from 'react'
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

// Translation data
const ordersTranslations = {
  en: {
    title: "Your Orders",
    subtitle: "View and manage all your repair orders",
    orderId: "Order ID:",
    placedOn: "Placed on:",
    totalCost: "Total Cost",
    viewDetails: "View Details",
    trackOrder: "Track Order",
    trackOrderTitle: "Track Order -",
    trackingSubtitle: "Tracking the progress of your repair order",
    deviceInfo: "Device Information",
    model: "Model:",
    issue: "Issue:",
    serviceDetails: "Service Details",
    additionalInfo: "Additional Information",
    technician: "Technician:",
    deliveryAddress: "Delivery Address:",
    estimatedDelivery: "Estimated Delivery:",
    repairProgress: "Repair Progress",
    downloadInvoice: "Download Invoice",
    close: "Close",
    status: {
      pending: "Pending",
      inProgress: "In Progress",
      repaired: "Repaired",
      delivered: "Delivered",
      cancelled: "Cancelled"
    },
    progressStages: {
      orderPlaced: "Order Placed",
      orderPickedUp: "Order Picked Up",
      repairing: "Repairing",
      qualityCheck: "Quality Check",
      outForDelivery: "Out for Delivery",
      delivered: "Delivered"
    }
  },
  hi: {
    title: "आपके ऑर्डर",
    subtitle: "अपने सभी मरम्मत ऑर्डर देखें और प्रबंधित करें",
    orderId: "ऑर्डर आईडी:",
    placedOn: "प्लेस्ड ऑन:",
    totalCost: "कुल लागत",
    viewDetails: "विवरण देखें",
    trackOrder: "ऑर्डर ट्रैक करें",
    trackOrderTitle: "ऑर्डर ट्रैक करें -",
    trackingSubtitle: "अपने मरम्मत ऑर्डर की प्रगति को ट्रैक कर रहे हैं",
    deviceInfo: "डिवाइस जानकारी",
    model: "मॉडल:",
    issue: "समस्या:",
    serviceDetails: "माहिती विवरण",
    additionalInfo: "अतिरिक्त जानकारी",
    technician: "तकनीशियन:",
    deliveryAddress: "डिलीवरी पता:",
    estimatedDelivery: "अनुमानित डिलीवरी:",
    repairProgress: "मरम्मत प्रगति",
    downloadInvoice: "इनवॉइस डाउनलोड करें",
    close: "बंद करें",
    status: {
      pending: "लंबित",
      inProgress: "प्रगति में",
      repaired: "मरम्मत हो गई",
      delivered: "वितरित",
      cancelled: "रद्द"
    },
    progressStages: {
      orderPlaced: "ऑर्डर प्लेस किया गया",
      orderPickedUp: "ऑर्डर उठाया गया",
      repairing: "मरम्मत हो रही है",
      qualityCheck: "गुणवत्ता जांच",
      outForDelivery: "डिलीवरी के लिए तैयार",
      delivered: "डिलिव्हर्ड"
    }
  },
  mr: {
    title: "तुमच्या ऑर्डर",
    subtitle: "तुमच्या सर्व दुरुस्ती ऑर्डर पहा आणि व्यवस्थापित करा",
    orderId: "ऑर्डर आयडी:",
    placedOn: "ऑर्डर दिली:",
    totalCost: "एकूण किंमत",
    viewDetails: "तपशील पहा",
    trackOrder: "ऑर्डर ट्रॅक करा",
    trackOrderTitle: "ऑर्डर ट्रॅक करा -",
    trackingSubtitle: "तुमच्या दुरुस्ती ऑर्डरची प्रोसेस ट्रॅक करत आहे",
    deviceInfo: "डिव्हाइस माहिती",
    model: "मॉडेल:",
    issue: "समस्या:",
    serviceDetails: "सर्विस तपशील",
    additionalInfo: "अतिरिक्त माहिती",
    technician: "तंत्रज्ञ:",
    deliveryAddress: "डिलिवरी पत्ता:",
    estimatedDelivery: "अंदाजे डिलिवरी:",
    repairProgress: "दुरुस्ती प्रगती",
    downloadInvoice: "इनव्हॉइस डाउनलोड करा",
    close: "बंद करा",
    status: {
      pending: "प्रलंबित",
      inProgress: "प्रगतीत",
      repaired: "दुरुस्त झाले",
      delivered: "वितरित",
      cancelled: "रद्द"
    },
    progressStages: {
      orderPlaced: "ऑर्डर दिले",
      orderPickedUp: "ऑर्डर उचलले",
      repairing: "दुरुस्ती होत आहे",
      qualityCheck: "गुणवत्ता तपासणी",
      outForDelivery: "डिलिवरीसाठी तयार",
      delivered: "डिलिव्हर्ड"
    }
  }
}

function YourOrders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showTrackOrder, setShowTrackOrder] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Get language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && ordersTranslations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
    
    // Listen for language changes
    const handleLanguageChange = () => {
      const lang = localStorage.getItem('preferredLanguage');
      if (lang && ordersTranslations[lang]) {
        setCurrentLanguage(lang);
      }
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  // Fake orders data with more details
  const orders = [
    {
      id: 'ORD-12345',
      model: 'iPhone 13 Pro',
      image: 'https://placehold.co/80x80/007AFF/FFFFFF?text=iPhone',
      issue: 'Screen Replacement',
      date: '2023-10-15',
      status: ordersTranslations[currentLanguage].status.repaired,
      cost: 8999,
      progress: [
        { stage: ordersTranslations[currentLanguage].progressStages.orderPlaced, date: '2023-10-15 10:30', completed: true },
        { stage: ordersTranslations[currentLanguage].progressStages.orderPickedUp, date: '2023-10-16 14:15', completed: true },
        { stage: ordersTranslations[currentLanguage].progressStages.repairing, date: '2023-10-17 09:45', completed: true },
        { stage: ordersTranslations[currentLanguage].progressStages.qualityCheck, date: '2023-10-18 11:20', completed: true },
        { stage: ordersTranslations[currentLanguage].progressStages.outForDelivery, date: '2023-10-19 15:00', completed: false },
        { stage: ordersTranslations[currentLanguage].progressStages.delivered, date: '', completed: false }
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
      status: ordersTranslations[currentLanguage].status.inProgress,
      cost: 3499,
      progress: [
        { stage: ordersTranslations[currentLanguage].progressStages.orderPlaced, date: '2023-10-10 11:45', completed: true },
        { stage: ordersTranslations[currentLanguage].progressStages.orderPickedUp, date: '2023-10-11 16:30', completed: true },
        { stage: ordersTranslations[currentLanguage].progressStages.repairing, date: '2023-10-12 10:15', completed: true },
        { stage: ordersTranslations[currentLanguage].progressStages.qualityCheck, date: '', completed: false },
        { stage: ordersTranslations[currentLanguage].progressStages.outForDelivery, date: '', completed: false },
        { stage: ordersTranslations[currentLanguage].progressStages.delivered, date: '', completed: false }
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
      status: ordersTranslations[currentLanguage].status.delivered,
      cost: 5499,
      progress: [
        { stage: ordersTranslations[currentLanguage].progressStages.orderPlaced, date: '2023-10-05 09:15', completed: true },
        { stage: ordersTranslations[currentLanguage].progressStages.orderPickedUp, date: '2023-10-06 13:45', completed: true },
        { stage: ordersTranslations[currentLanguage].progressStages.repairing, date: '2023-10-07 11:20', completed: true },
        { stage: ordersTranslations[currentLanguage].progressStages.qualityCheck, date: '2023-10-08 10:30', completed: true },
        { stage: ordersTranslations[currentLanguage].progressStages.outForDelivery, date: '2023-10-09 14:00', completed: true },
        { stage: ordersTranslations[currentLanguage].progressStages.delivered, date: '2023-10-09 16:45', completed: true }
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
      case ordersTranslations[currentLanguage].status.pending:
        return { icon: <Clock size={16} />, color: '#ff9800' }
      case ordersTranslations[currentLanguage].status.inProgress:
        return { icon: <Wrench size={16} />, color: '#2196f3' }
      case ordersTranslations[currentLanguage].status.repaired:
        return { icon: <CheckCircle size={16} />, color: '#4caf50' }
      case ordersTranslations[currentLanguage].status.delivered:
        return { icon: <Truck size={16} />, color: '#673ab7' }
      case ordersTranslations[currentLanguage].status.cancelled:
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
            <h1 className="multilingual-text">{ordersTranslations[currentLanguage].trackOrderTitle} {selectedOrder.id}</h1>
          </div>
          <p className="multilingual-text">{ordersTranslations[currentLanguage].trackingSubtitle}</p>
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
                <span className="multilingual-text">{selectedOrder.status}</span>
              </div>
            </div>

            <div className="progress-tracker-section">
              <h3 className="multilingual-text">{ordersTranslations[currentLanguage].repairProgress}</h3>
              <div className="progress-tracker">
                {selectedOrder.progress.map((step, index) => (
                  <div key={index} className={`progress-step ${step.completed ? 'completed' : ''}`}>
                    <div className="step-icon">
                      {step.completed ? <CheckCircle size={16} /> : <Clock size={16} />}
                    </div>
                    <div className="step-details">
                      <p className="step-name multilingual-text">{step.stage}</p>
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
                <span><strong className="multilingual-text">{ordersTranslations[currentLanguage].technician}</strong> {selectedOrder.technician}</span>
              </div>
              <div className="tracking-info-item">
                <Calendar size={16} />
                <span><strong className="multilingual-text">{ordersTranslations[currentLanguage].estimatedDelivery}</strong> {selectedOrder.estimatedDelivery}</span>
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
          <h1 className="multilingual-text">{ordersTranslations[currentLanguage].title}</h1>
        </div>
        <p className="multilingual-text">{ordersTranslations[currentLanguage].subtitle}</p>
      </div>

      <div className="orders-list">
        {orders.map(order => {
          const statusInfo = getStatusInfo(order.status)
          
          return (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-id multilingual-text">{ordersTranslations[currentLanguage].orderId} {order.id}</div>
                <div className="order-date multilingual-text">{ordersTranslations[currentLanguage].placedOn} {order.date}</div>
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
                    <span className="multilingual-text">{order.status}</span>
                  </div>
                </div>
                
                <div className="order-cost">
                  <div className="cost-label multilingual-text">{ordersTranslations[currentLanguage].totalCost}</div>
                  <div className="cost-amount">₹{order.cost.toLocaleString()}</div>
                </div>
                
                <div className="order-actions">
                  <button 
                    className="btn-view-details"
                    onClick={() => handleViewDetails(order)}
                  >
                    <Eye size={16} />
                    <span className="multilingual-text">{ordersTranslations[currentLanguage].viewDetails}</span>
                  </button>
                  <button 
                    className="btn-track-order"
                    onClick={() => handleTrackOrder(order)}
                  >
                    <Package size={16} />
                    <span className="multilingual-text">{ordersTranslations[currentLanguage].trackOrder}</span>
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
              <h2 className="multilingual-text">Order Details - {selectedOrder.id}</h2>
              <button className="close-modal" onClick={handleCloseDetails}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="order-summary">
                <div className="summary-item">
                  <h3 className="multilingual-text">{ordersTranslations[currentLanguage].deviceInfo}</h3>
                  <div className="device-details">
                    <img src={selectedOrder.image} alt={selectedOrder.model} />
                    <div>
                      <p><strong className="multilingual-text">{ordersTranslations[currentLanguage].model}</strong> {selectedOrder.model}</p>
                      <p><strong className="multilingual-text">{ordersTranslations[currentLanguage].issue}</strong> {selectedOrder.issue}</p>
                    </div>
                  </div>
                </div>
                
                <div className="summary-item">
                  <h3 className="multilingual-text">{ordersTranslations[currentLanguage].serviceDetails}</h3>
                  <div className="services-list">
                    {selectedOrder.services.map((service, index) => (
                      <div key={index} className="service-item">
                        <span className="service-name">{service.name}</span>
                        <span className="service-cost">₹{service.cost.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="service-total">
                      <strong className="multilingual-text">{ordersTranslations[currentLanguage].totalCost}</strong>
                      <strong>₹{selectedOrder.cost.toLocaleString()}</strong>
                    </div>
                  </div>
                </div>
                
                <div className="summary-item">
                  <h3 className="multilingual-text">{ordersTranslations[currentLanguage].additionalInfo}</h3>
                  <div className="additional-info">
                    <p><UserCheck size={16} /> <strong className="multilingual-text">{ordersTranslations[currentLanguage].technician}</strong> {selectedOrder.technician}</p>
                    <p><Home size={16} /> <strong className="multilingual-text">{ordersTranslations[currentLanguage].deliveryAddress}</strong> {selectedOrder.address}</p>
                    <p><Calendar size={16} /> <strong className="multilingual-text">{ordersTranslations[currentLanguage].estimatedDelivery}</strong> {selectedOrder.estimatedDelivery}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-download-invoice" onClick={downloadInvoice}>
                <Download size={16} />
                <span className="multilingual-text">{ordersTranslations[currentLanguage].downloadInvoice}</span>
              </button>
              <button className="btn-close multilingual-text" onClick={handleCloseDetails}>{ordersTranslations[currentLanguage].close}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default YourOrders