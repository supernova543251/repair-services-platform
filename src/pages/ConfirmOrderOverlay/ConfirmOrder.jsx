// src/pages/ConfirmOrderOverlay/ConfirmOrder.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Smartphone, Palette, Wrench, CreditCard, MapPin, Phone } from 'lucide-react';
import './ConfirmOrder.css';
import LocationOverlay from '../../components/LocationOverlay/LocationOverlay';
import { addressService } from '../../services/address';
import CustomerToast from '../../components/CustomToast/CustomToast';
import orderService from '../../services/orders';
import deviceService from '../../services/device';

// Translation data
const translations = {
  en: {
    title: "Confirm Your Order",
    subtitle: "Review your repair details",
    orderSummary: "Order Summary",
    deviceDetails: "Device Details",
    brand: "Brand",
    model: "Model",
    colorVariant: "Color Variant",
    selectedServices: "Selected Services",
    totalAmount: "Total Amount",
    paymentMethod: "Payment Method",
    cashOnDelivery: "Cash on Delivery",
    confirmOrder: "Confirm Repair Order",
    back: "Back",
    processing: "Processing...",
    orderConfirmed: "Order Confirmed!",
    thankYou: "Thank you for your order!",
    continueShopping: "Continue Shopping",
    pickupAddress: "Pickup Address",
    deliveryAddress: "Delivery Address",
    chooseAddress: "Choose Address",
    changeAddress: "Change Address",
    noAddressTitle: "No Address Added",
    noAddressSubtitle: "Please add an address to continue with your order",
    addAddress: "Add Address",
    sameAsPickup: "Use same address for delivery",
    selectDeliveryAddress: "Select Delivery Address",
    pickupLocation: "Pickup Location",
    deliveryLocation: "Delivery Location",
    addAddressToContinue: "Please add addresses to continue",
    selectPickupAddress: "Select Pickup Address",
    selectDeliveryAddressFirst: "Please select delivery address",
    orderSuccess: "Order placed successfully!",
    addressRequired: "Please select both pickup and delivery addresses",
    noOrderData: "No order data found",
    pleaseSelectServices: "Please select services first",
    customDevice: "Custom Device",
    deviceName: "Device Name",
    color: "Color",
    notSpecified: "Not specified",
    issueDescription: "Issue Description",
    specialInstructions: "Special Instructions",
    customerNotes: "Customer Notes",
    enterIssueDescription: "Please describe the issue with your device",
    enterSpecialInstructions: "Any special instructions for pickup/delivery",
    enterCustomerNotes: "Additional notes for the service center",
    temporaryPhone: "Need temporary phone during repair?",
    temporaryPhoneDesc: "Get a temporary phone while yours is being repaired (Customer phone is in service)",
    temporaryPhoneComingSoon: "Coming soon"
  },
  hi: {
    title: "अपना ऑर्डर कन्फर्म करें",
    subtitle: "अपनी रिपेयर डिटेल्स रिव्यू करें",
    orderSummary: "ऑर्डर सारांश",
    deviceDetails: "डिवाइस विवरण",
    brand: "ब्रांड",
    model: "मॉडल",
    colorVariant: "रंग वेरिएंट",
    selectedServices: "चयनित सर्विसेज",
    totalAmount: "कुल राशि",
    paymentMethod: "भुगतान विधि",
    cashOnDelivery: "कैश ऑन डिलीवरी",
    confirmOrder: "रिपेर ऑर्डर कन्फर्म करें",
    back: "वापस",
    processing: "प्रोसेसिंग...",
    orderConfirmed: "ऑर्डर कन्फर्म हो गया!",
    thankYou: "आपके ऑर्डर के लिए धन्यवाद!",
    continueShopping: "शॉपिंग जारी रखें",
    pickupAddress: "पिकअप एड्रेस",
    deliveryAddress: "डिलीवरी एड्रेस",
    chooseAddress: "एड्रेस चुनें",
    changeAddress: "एड्रेस बदलें",
    noAddressTitle: "कोई एड्रेस नहीं जोड़ा गया",
    noAddressSubtitle: "कृपया अपना ऑर्डर जारी रखने के लिए एक एड्रेस जोड़ें",
    addAddress: "एड्रेस जोड़ें",
    sameAsPickup: "डिलीवरी के लिए भी यही पता इस्तेमाल करें",
    selectDeliveryAddress: "डिलीवरी एड्रेस चुनें",
    pickupLocation: "पिकअप लोकेशन",
    deliveryLocation: "डिलीवरी लोकेशन",
    addAddressToContinue: "जारी रखने के लिए कृपया पता जोड़ें",
    selectPickupAddress: "पिकअप एड्रेस चुनें",
    selectDeliveryAddressFirst: "कृपया डिलीवरी एड्रेस चुनें",
    orderSuccess: "ऑर्डर सफलतापूर्वक दिया गया!",
    addressRequired: "कृपया पिकअप और डिलीवरी दोनों पते चुनें",
    noOrderData: "कोई ऑर्डर डेटा नहीं मिला",
    pleaseSelectServices: "कृपया पहले सेवाएं चुनें",
    customDevice: "कस्टम डिवाइस",
    deviceName: "डिवाइस का नाम",
    color: "रंग",
    notSpecified: "निर्दिष्ट नहीं",
    issueDescription: "समस्या विवरण",
    specialInstructions: "विशेष निर्देश",
    customerNotes: "ग्राहक नोट्स",
    enterIssueDescription: "कृपया अपने डिवाइस की समस्या का वर्णन करें",
    enterSpecialInstructions: "पिकअप/डिलीवरी के लिए कोई विशेष निर्देश",
    enterCustomerNotes: "सर्विस सेंटर के लिए अतिरिक्त नोट्स",
    temporaryPhone: "दुरुस्ती के दौरान अस्थायी फोन चाहिए?",
    temporaryPhoneDesc: "जब आपका फोन रिपेयर हो रहा हो तो अस्थायी फोन प्राप्त करें (ग्राहक का फोन सर्विस में है)",
    temporaryPhoneComingSoon: "जल्द ही आ रहा है"
  },
  mr: {
    title: "तुमचा ऑर्डर निश्चित करा",
    subtitle: "तुमची दुरुस्तीची तपशील तपासा",
    orderSummary: "ऑर्डर सारांश",
    deviceDetails: "डिव्हाइस तपशील",
    brand: "ब्रँड",
    model: "मॉडेल",
    colorVariant: "रंग प्रकार",
    selectedServices: "निवडलेल्या सेवा",
    totalAmount: "एकूण रक्कम",
    paymentMethod: "पैसे भरण्याची पद्धत",
    cashOnDelivery: "कॅश ऑन डिलिव्हरी",
    confirmOrder: "दुरुस्ती ऑर्डर निश्चित करा",
    back: "मागे",
    processing: "प्रक्रिया करीत आहे...",
    orderConfirmed: "ऑर्डर निश्चित केला गेला!",
    thankYou: "तुमच्या ऑर्डरबद्दल धन्यवाद!",
    continueShopping: "शॉपिंग सुरू ठेवा",
    pickupAddress: "पिकअप पत्ता",
    deliveryAddress: "डिलिव्हरी पत्ता",
    chooseAddress: "पत्ता निवडा",
    changeAddress: "पत्ता बदला",
    noAddressTitle: "कोणताही पत्ता जोडलेला नाही",
    noAddressSubtitle: "कृपया तुमचा ऑर्डर पूर्ण करण्यासाठी पत्ता जोडा",
    addAddress: "पत्ता जोडा",
    sameAsPickup: "डिलिव्हरीसाठी समान पत्ता वापरा",
    selectDeliveryAddress: "डिलिव्हरी पत्ता निवडा",
    pickupLocation: "पिकअप स्थान",
    deliveryLocation: "डिलिव्हरी स्थान",
    addAddressToContinue: "कृपया पुढे जाण्यासाठी पत्ता जोडा",
    selectPickupAddress: "पिकअप पत्ता निवडा",
    selectDeliveryAddressFirst: "कृपया डिलिव्हरी पत्ता निवडा",
    orderSuccess: "ऑर्डर यशस्वीरित्या दिला गेला!",
    addressRequired: "कृपया पिकअप आणि डिलिव्हरी दोन्ही पत्ते निवडा",
    noOrderData: "कोणतेही ऑर्डर डेटा सापडले नाही",
    pleaseSelectServices: "कृपया प्रथम सेवा निवडा",
    customDevice: "सानुकूल डिव्हाइस",
    deviceName: "डिव्हाइसचे नाव",
    color: "रंग",
    notSpecified: "निर्दिष्ट नाही",
    issueDescription: "समस्येचे वर्णन",
    specialInstructions: "विशेष सूचना",
    customerNotes: "ग्राहक नोट्स",
    enterIssueDescription: "कृपया तुमच्या डिव्हाइसच्या समस्येचे वर्णन करा",
    enterSpecialInstructions: "पिकअप/डिलिव्हरीसाठी कोणत्याही विशेष सूचना",
    enterCustomerNotes: "सर्व्हिस सेंटरसाठी अतिरिक्त नोट्स",
    temporaryPhone: "दुरुस्ती दरम्यान तात्पुरता फोन हवा आहे?",
    temporaryPhoneDesc: "तुमचा फोन दुरुस्त होत असताना तात्पुरता फोन मिळवा (ग्राहकाचा फोन सर्व्हिसमध्ये आहे)",
    temporaryPhoneComingSoon: "लवकरच येत आहे"
  }
};

function ConfirmOrder() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  // Get translations based on selected language - MOVED HERE
  const t = translations[selectedLanguage] || translations['en'];

  const [paymentMethod, setPaymentMethod] = useState('cash_on_delivery');
  const [showLocationOverlay, setShowLocationOverlay] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedPickupAddress, setSelectedPickupAddress] = useState(null);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(null);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [sameAsPickup, setSameAsPickup] = useState(true);
  const [addressOverlayMode, setAddressOverlayMode] = useState('pickup');
  const [showFixedButton, setShowFixedButton] = useState(true);
  const [toast, setToast] = useState(null);
  const [issueDescription, setIssueDescription] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [deviceId, setDeviceId] = useState(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);

  // Get order data from location state or sessionStorage
  const [orderData, setOrderData] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  // Delivery fees state
  const [deliveryFees, setDeliveryFees] = useState({
    pickup_fee: 0,
    return_delivery_fee: 0,
    total_delivery_fees: 0,
    total_amount: 0
  });
  const [loadingFees, setLoadingFees] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setSelectedLanguage(savedLanguage);

    // Get order data from location state or sessionStorage
    const locationOrderData = location.state;

    if (locationOrderData) {
      setOrderData(locationOrderData);
      // Set default issue description
      if (locationOrderData.services && locationOrderData.services.length > 0) {
        const serviceNames = locationOrderData.services.map(s => s.name).join(', ');
        setIssueDescription(`Need ${serviceNames} for ${locationOrderData.brand} ${locationOrderData.model}`);
      }

      // Load device ID ONLY if not custom device
      if (!locationOrderData.isCustomDevice) {
        loadDeviceId(locationOrderData.brand, locationOrderData.model);
      }

      // Load addresses after a small delay
      setTimeout(() => {
        loadAddresses();
        setPageLoading(false);
      }, 800);
    } else {
      // Check sessionStorage for pending order data (from login scenario)
      const pendingOrderData = sessionStorage.getItem('pendingOrderData');
      if (pendingOrderData) {
        const parsedData = JSON.parse(pendingOrderData);
        setOrderData(parsedData);
        sessionStorage.removeItem('pendingOrderData'); // Clean up

        // Load addresses after a small delay
        setTimeout(() => {
          loadAddresses();
          setPageLoading(false);
        }, 800);
      } else {
        // No order data found - this is direct access without coming from Services
        setToast({ message: t.pleaseSelectServices, type: 'error' });
        setTimeout(() => {
          navigate('/');
        }, 2000);
        setPageLoading(false);
      }
    }
  }, [location.state, navigate, selectedLanguage, t]);

  // Calculate delivery fees when orderData changes
  useEffect(() => {
    if (orderData?.totalPrice) {
      calculateDeliveryFees();
    }
  }, [orderData]);

  const calculateDeliveryFees = async () => {
    try {
      setLoadingFees(true);

      // Call the API endpoint
      const response = await orderService.calculateOrderTotal({
        service_price: orderData.totalPrice,
        is_urgent: false,
        distance_km: 0
      });

      if (response.success) {
        setDeliveryFees(response.data);
        console.log('✅ Delivery fees calculated from API:', response.data);
      } else {
        throw new Error(response.message || 'Failed to calculate fees');
      }

    } catch (error) {
      console.error('Failed to calculate delivery fees:', error);
      // Fallback to hardcoded calculation
      const baseFee = 50;
      const pickupFee = baseFee;
      const returnFee = baseFee;
      const totalDeliveryFees = pickupFee + returnFee;
      const totalAmount = orderData.totalPrice + totalDeliveryFees;

      setDeliveryFees({
        pickup_fee: pickupFee,
        return_delivery_fee: returnFee,
        total_delivery_fees: totalDeliveryFees,
        total_amount: totalAmount,
        breakdown: {
          pickup_fee: pickupFee,
          return_fee: returnFee,
          urgent_fee: 0,
          distance_charge: 0,
          base_fee: baseFee
        }
      });
    } finally {
      setLoadingFees(false);
    }
  };

  // Load device ID from backend - ONLY for non-custom devices
  const loadDeviceId = async (brand, model) => {
    try {
      let response;
      // Try different search approaches for Nothing brand specifically
      if (brand.toLowerCase().includes('nothing')) {
        // First try exact model search
        response = await deviceService.searchDevices(model, brand);

        if (!response.success || !response.data.docs || response.data.docs.length === 0) {
          // Try broader search for Nothing brand
          response = await deviceService.getDevicesByBrand(brand);
        }
      } else {
        response = await deviceService.searchDevices(model, brand);
      }

      if (response.success) {
        const devices = response.data.docs || response.data || [];

        if (devices.length > 0) {
          // Try exact match first
          let device = devices.find(d =>
            d.brand.toLowerCase() === brand.toLowerCase() &&
            d.model.toLowerCase() === model.toLowerCase() &&
            d.is_active !== false
          );

          // If no exact match, try partial match
          if (!device) {
            device = devices.find(d =>
              d.brand.toLowerCase().includes(brand.toLowerCase()) &&
              d.model.toLowerCase().includes(model.toLowerCase()) &&
              d.is_active !== false
            );
          }

          // If still no match, take first active device
          if (!device) {
            device = devices.find(d => d.is_active !== false);
          }

          if (device) {
            setDeviceId(device._id);
          }
        }
      }
    } catch (error) {
      console.error('Error loading device ID:', error);
    }
  };

  // Scroll handling for fixed button
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current && buttonRef.current) {
        const contentRect = contentRef.current.getBoundingClientRect();
        const buttonRect = buttonRef.current.getBoundingClientRect();

        // Show fixed button if button is not in viewport
        const isButtonVisible = buttonRect.top < window.innerHeight && buttonRect.bottom > 0;
        setShowFixedButton(!isButtonVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show toast function
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Load addresses from backend
  const loadAddresses = async () => {
    try {
      setLoadingAddresses(true);
      const response = await addressService.getAddresses();
      if (response.success) {
        setAddresses(response.data);

        // Set default addresses
        const defaultAddress = response.data.find(addr => addr.isDefault);
        if (defaultAddress) {
          setSelectedPickupAddress(defaultAddress);
          setSelectedDeliveryAddress(defaultAddress);
        } else if (response.data.length > 0) {
          // Use first address if no default
          setSelectedPickupAddress(response.data[0]);
          setSelectedDeliveryAddress(response.data[0]);
        }
      }
    } catch (error) {
      console.error('Error loading addresses:', error);
      showToast('Failed to load addresses', 'error');
    } finally {
      setLoadingAddresses(false);
    }
  };

  const handleSelectLocation = (address) => {
    if (addressOverlayMode === 'pickup') {
      setSelectedPickupAddress(address);
      if (sameAsPickup) {
        setSelectedDeliveryAddress(address);
      }
      showToast('Pickup address updated successfully', 'success');
    } else {
      setSelectedDeliveryAddress(address);
      showToast('Delivery address updated successfully', 'success');
    }
    setShowLocationOverlay(false);
  };

  const handlePickupAddressChange = () => {
    setAddressOverlayMode('pickup');
    setShowLocationOverlay(true);
  };

  const handleDeliveryAddressChange = () => {
    setAddressOverlayMode('delivery');
    setShowLocationOverlay(true);
  };

  const handleAddAddress = () => {
    setAddressOverlayMode('pickup');
    setShowLocationOverlay(true);
  };

  const handleSameAsPickupChange = (checked) => {
    setSameAsPickup(checked);
    if (checked) {
      setSelectedDeliveryAddress(selectedPickupAddress);
      showToast('Delivery address set same as pickup', 'info');
    }
  };

  // Check if confirm order button should be disabled
  const isConfirmButtonDisabled = () => {
    return isLoading || !selectedPickupAddress || !selectedDeliveryAddress || !issueDescription.trim() || loadingFees;
  };

  // Get disabled reason for tooltip
  const getDisabledReason = () => {
    if (!selectedPickupAddress) return t.selectPickupAddress;
    if (!selectedDeliveryAddress) return t.selectDeliveryAddressFirst;
    if (!issueDescription.trim()) return t.enterIssueDescription;
    if (loadingFees) return 'Calculating delivery fees...';
    return '';
  };

  const handleConfirmOrder = async () => {
    // Check if addresses are selected
    if (!selectedPickupAddress || !selectedDeliveryAddress) {
      showToast(t.addressRequired, 'error');
      return;
    }

    // Check if issue description is provided
    if (!issueDescription.trim()) {
      showToast(t.enterIssueDescription, 'error');
      return;
    }

    // Check if delivery fees are calculated
    if (loadingFees || !deliveryFees.total_amount) {
      showToast('Please wait while we calculate delivery fees', 'info');
      return;
    }

    setIsLoading(true);

    try {
      // Prepare order data for backend API
      const orderRequestData = {
        // Include device field ONLY for non-custom devices
        ...(!orderData.isCustomDevice && { device: deviceId }),
        service: orderData.services[0].serviceId,
        pickup_address: selectedPickupAddress._id,
        delivery_address: selectedDeliveryAddress._id,
        issue_description: issueDescription,
        special_instructions: specialInstructions,
        customer_notes: customerNotes,
        // Device details - these are the important ones for custom devices
        device_brand: orderData.brand,
        device_model: orderData.model,
        device_variant: orderData.variant?.name || 'Standard',
        device_type: orderData.deviceType || 'smartphone',
        is_custom_device: orderData.isCustomDevice || false,
        // Use calculated total including delivery fees
        total_order_amount: deliveryFees.total_amount
      };

      // Call the order creation API
      const response = await orderService.createOrder(orderRequestData);

      if (response.success) {
        setIsLoading(false);
        setOrderConfirmed(true);
        showToast(t.orderSuccess, 'success');

        // Save the order to localStorage
        const orders = JSON.parse(localStorage.getItem('fixflashOrders') || '[]');
        orders.push({
          ...orderData,
          orderId: response.data._id,
          trackingNumber: response.data.tracking_number,
          orderDate: new Date().toISOString(),
          status: 'pending',
          paymentMethod: paymentMethod,
          pickupAddress: selectedPickupAddress,
          deliveryAddress: selectedDeliveryAddress,
          sameAsPickup: sameAsPickup,
          backendOrder: response.data,
          // Include delivery fees in localStorage
          deliveryFees: deliveryFees,
          total_order_amount: deliveryFees.total_amount // Add total_order_amount here too
        });
        localStorage.setItem('fixflashOrders', JSON.stringify(orders));

        // Navigate to order success page or orders list
        setTimeout(() => {
          navigate('/your-orders');
        }, 2000);
      } else {
        throw new Error(response.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Order creation error:', error);
      setIsLoading(false);
      showToast(error.message || 'Failed to create order. Please try again.', 'error');
    }
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="fixflash-confirmorder-container skeleton-loader">
      {/* Header skeleton */}
      <div className="fixflash-confirmorder-header skeleton-header">
        <div className="fixflash-confirmorder-header-main skeleton-header-main">
          <div className="skeleton-back-button"></div>
          <div className="fixflash-confirmorder-header-center skeleton-header-center">
            <div className="skeleton-header-text">
              <div className="skeleton-header-title"></div>
              <div className="skeleton-header-subtitle"></div>
            </div>
          </div>
          <div className="skeleton-header-icon"></div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="fixflash-confirmorder-details-container" ref={contentRef}>
        <div className="fixflash-confirmorder-content-wrapper">
          {/* Address section skeleton */}
          <div className="fixflash-confirmorder-section skeleton-section">
            <div className="skeleton-section-title"></div>
            <div className="skeleton-address-section">
              <div className="skeleton-address-card">
                <div className="skeleton-address-header">
                  <div className="skeleton-address-type"></div>
                  <div className="skeleton-change-btn"></div>
                </div>
                <div className="skeleton-address-content">
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line"></div>
                </div>
              </div>
              <div className="skeleton-checkbox"></div>
            </div>
          </div>

          {/* Issue description skeleton */}
          <div className="fixflash-confirmorder-section skeleton-section">
            <div className="skeleton-section-title"></div>
            <div className="skeleton-textarea"></div>
          </div>

          {/* Device details skeleton */}
          <div className="fixflash-confirmorder-section skeleton-section">
            <div className="skeleton-section-title"></div>
            <div className="skeleton-details-grid">
              <div className="skeleton-detail-item"></div>
              <div className="skeleton-detail-item"></div>
              <div className="skeleton-detail-item"></div>
            </div>
          </div>

          {/* Services skeleton */}
          <div className="fixflash-confirmorder-section skeleton-section">
            <div className="skeleton-section-title"></div>
            <div className="skeleton-services">
              <div className="skeleton-service-item"></div>
              <div className="skeleton-service-item"></div>
            </div>
          </div>

          {/* Payment skeleton */}
          <div className="fixflash-confirmorder-section skeleton-section">
            <div className="skeleton-section-title"></div>
            <div className="skeleton-payment"></div>
          </div>

          {/* Inline order summary skeleton */}
          <div className="fixflash-confirmorder-inline-summary skeleton-inline-summary" ref={buttonRef}>
            <div className="skeleton-total"></div>
            <div className="skeleton-button"></div>
          </div>
        </div>
      </div>
    </div>
  );

  // Loading state
  if (pageLoading) {
    return <SkeletonLoader />;
  }

  if (!orderData) {
    return (
      <div className="fixflash-confirmorder-container">
        <div className="fixflash-confirmorder-header">
          <div className="fixflash-confirmorder-header-main">
            <button
              className="fixflash-confirmorder-back-btn"
              onClick={() => navigate('/')}
            >
              <ArrowLeft size={17} />
              <span>{t.back}</span>
            </button>

            <div className="fixflash-confirmorder-header-center">
              <div className="fixflash-confirmorder-header-text">
                <h1 className="fixflash-confirmorder-header-title">{t.noOrderData}</h1>
                <p className="fixflash-confirmorder-header-subtitle">{t.pleaseSelectServices}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="fixflash-confirmorder-details-container">
          <div className="fixflash-confirmorder-content-wrapper">
            <div className="fixflash-confirmorder-no-data">
              <p>Redirecting to home page...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (orderConfirmed) {
    return (
      <div className="fixflash-confirmorder-container">
        <div className="fixflash-confirmorder-success">
          <div className="fixflash-confirmorder-success-icon">
            <CheckCircle size={48} />
          </div>
          <h1 className="fixflash-confirmorder-success-title">{t.orderConfirmed}</h1>
          <p className="fixflash-confirmorder-success-message">{t.thankYou}</p>
          <button
            className="fixflash-confirmorder-success-btn"
            onClick={handleContinueShopping}
          >
            {t.continueShopping}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixflash-confirmorder-container ${showLocationOverlay ? 'fixflash-confirmorder-overlay-open' : ''}`}>
      {/* Toast */}
      {toast && (
        <CustomerToast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast(null)}
        />
      )}

      {/* Location Overlay */}
      {showLocationOverlay && (
        <div className="fixflash-confirmorder-overlay-backdrop">
          <LocationOverlay
            onClose={() => setShowLocationOverlay(false)}
            onSelectLocation={handleSelectLocation}
            mode={addressOverlayMode}
          />
        </div>
      )}

      {/* Header */}
      <div className="fixflash-confirmorder-header">
        <div className="fixflash-confirmorder-header-main">
          <button
            className="fixflash-confirmorder-back-btn"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={17} />
            <span>{t.back}</span>
          </button>

          <div className="fixflash-confirmorder-header-center">
            <div className="fixflash-confirmorder-header-text">
              <h1 className="fixflash-confirmorder-header-title">{t.title}</h1>
              <p className="fixflash-confirmorder-header-subtitle">{t.subtitle}</p>
            </div>
          </div>

          <div className="fixflash-confirmorder-header-icon">
            <Smartphone size={20} />
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="fixflash-confirmorder-details-container" ref={contentRef}>
        <div className="fixflash-confirmorder-content-wrapper">
          {/* Address Section */}
          <div className="fixflash-confirmorder-section">
            <h2 className="fixflash-confirmorder-section-title">
              <MapPin size={18} />
              Service Locations
            </h2>

            {loadingAddresses ? (
              <div className="fixflash-confirmorder-loading-addresses">
                Loading addresses...
              </div>
            ) : addresses.length === 0 ? (
              <div className="fixflash-confirmorder-no-address">
                <div className="fixflash-confirmorder-no-address-content">
                  <MapPin size={32} className="fixflash-confirmorder-no-address-icon" />
                  <div className="fixflash-confirmorder-no-address-text">
                    <h3>{t.noAddressTitle}</h3>
                    <p>{t.noAddressSubtitle}</p>
                  </div>
                  <button
                    className="fixflash-confirmorder-add-address-btn"
                    onClick={handleAddAddress}
                  >
                    {t.addAddress}
                  </button>
                </div>
              </div>
            ) : (
              <div className="fixflash-confirmorder-address-section">
                {/* Pickup Address */}
                <div className="fixflash-confirmorder-address-slot">
                  <div className="fixflash-confirmorder-address-header">
                    <span className="fixflash-confirmorder-address-type">{t.pickupLocation}</span>
                    <button
                      className="fixflash-confirmorder-change-address-btn"
                      onClick={handlePickupAddressChange}
                    >
                      {selectedPickupAddress ? t.changeAddress : t.chooseAddress}
                    </button>
                  </div>
                  {selectedPickupAddress ? (
                    <div className="fixflash-confirmorder-address-details">
                      <p className="fixflash-confirmorder-address-name">{selectedPickupAddress.name}</p>
                      <p className="fixflash-confirmorder-address-phone">{selectedPickupAddress.phone}</p>
                      <p className="fixflash-confirmorder-address-full">
                        {selectedPickupAddress.address_line}, {selectedPickupAddress.landmark && `${selectedPickupAddress.landmark}, `}
                        {selectedPickupAddress.city}, {selectedPickupAddress.state} - {selectedPickupAddress.pincode}
                      </p>
                      {selectedPickupAddress.isDefault && (
                        <span className="fixflash-confirmorder-default-badge">Default</span>
                      )}
                    </div>
                  ) : (
                    <div className="fixflash-confirmorder-no-address-selected">
                      <p>{t.selectPickupAddress}</p>
                    </div>
                  )}
                </div>

                {/* Same as Pickup Checkbox */}
                <div className="fixflash-confirmorder-same-address-checkbox">
                  <label className="fixflash-confirmorder-checkbox-label">
                    <input
                      type="checkbox"
                      checked={sameAsPickup}
                      onChange={(e) => handleSameAsPickupChange(e.target.checked)}
                      className="fixflash-confirmorder-checkbox"
                    />
                    <span className="fixflash-confirmorder-checkbox-text">
                      {t.sameAsPickup}
                    </span>
                  </label>
                </div>

                {/* Delivery Address */}
                {!sameAsPickup && (
                  <div className="fixflash-confirmorder-address-slot">
                    <div className="fixflash-confirmorder-address-header">
                      <span className="fixflash-confirmorder-address-type">{t.deliveryLocation}</span>
                      <button
                        className="fixflash-confirmorder-change-address-btn"
                        onClick={handleDeliveryAddressChange}
                      >
                        {selectedDeliveryAddress ? t.changeAddress : t.selectDeliveryAddress}
                      </button>
                    </div>
                    {selectedDeliveryAddress ? (
                      <div className="fixflash-confirmorder-address-details">
                        <p className="fixflash-confirmorder-address-name">{selectedDeliveryAddress.name}</p>
                        <p className="fixflash-confirmorder-address-phone">{selectedDeliveryAddress.phone}</p>
                        <p className="fixflash-confirmorder-address-full">
                          {selectedDeliveryAddress.address_line}, {selectedDeliveryAddress.landmark && `${selectedDeliveryAddress.landmark}, `}
                          {selectedDeliveryAddress.city}, {selectedDeliveryAddress.state} - {selectedDeliveryAddress.pincode}
                        </p>
                        {selectedDeliveryAddress.isDefault && (
                          <span className="fixflash-confirmorder-default-badge">Default</span>
                        )}
                      </div>
                    ) : (
                      <div className="fixflash-confirmorder-no-address-selected">
                        <p>{t.selectDeliveryAddressFirst}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Issue Description Section */}
          <div className="fixflash-confirmorder-section">
            <h2 className="fixflash-confirmorder-section-title">
              <Wrench size={18} />
              {t.issueDescription}
            </h2>
            <div className="fixflash-confirmorder-textarea-group">
              <label htmlFor="issueDescription" className="fixflash-confirmorder-textarea-label">
                {t.issueDescription} *
              </label>
              <textarea
                id="issueDescription"
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                placeholder={t.enterIssueDescription}
                className="fixflash-confirmorder-textarea"
                rows="3"
                required
              />
            </div>
          </div>

          {/* Special Instructions Section */}
          <div className="fixflash-confirmorder-section">
            <h2 className="fixflash-confirmorder-section-title">
              <CreditCard size={18} />
              {t.specialInstructions}
            </h2>
            <div className="fixflash-confirmorder-textarea-group">
              <label htmlFor="specialInstructions" className="fixflash-confirmorder-textarea-label">
                {t.specialInstructions}
              </label>
              <textarea
                id="specialInstructions"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder={t.enterSpecialInstructions}
                className="fixflash-confirmorder-textarea"
                rows="2"
              />
            </div>
          </div>

          {/* Customer Notes Section */}
          <div className="fixflash-confirmorder-section">
            <h2 className="fixflash-confirmorder-section-title">
              <Smartphone size={18} />
              {t.customerNotes}
            </h2>
            <div className="fixflash-confirmorder-textarea-group">
              <label htmlFor="customerNotes" className="fixflash-confirmorder-textarea-label">
                {t.customerNotes}
              </label>
              <textarea
                id="customerNotes"
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                placeholder={t.enterCustomerNotes}
                className="fixflash-confirmorder-textarea"
                rows="2"
              />
            </div>
          </div>

          <div className="fixflash-confirmorder-section">
            <h2 className="fixflash-confirmorder-section-title">
              <Smartphone size={18} />
              {t.deviceDetails}
            </h2>
            <div className="fixflash-confirmorder-details-grid">
              <div className="fixflash-confirmorder-detail-item">
                <span className="fixflash-confirmorder-detail-label">{t.brand}:</span>
                <span className="fixflash-confirmorder-detail-value">{orderData.brand}</span>
              </div>
              <div className="fixflash-confirmorder-detail-item">
                <span className="fixflash-confirmorder-detail-label">
                  {orderData.isCustomDevice ? t.deviceName : t.model}:
                </span>
                <span className="fixflash-confirmorder-detail-value">
                  {orderData.model}
                  {orderData.isCustomDevice && (
                    <span className="fixflash-confirmorder-custom-badge">{t.customDevice}</span>
                  )}
                </span>
              </div>
              {orderData.isCustomDevice ? (
                <div className="fixflash-confirmorder-detail-item">
                  <span className="fixflash-confirmorder-detail-label">{t.color}:</span>
                  <span className="fixflash-confirmorder-detail-value">
                    {orderData.variant?.name && orderData.variant.name !== 'Default'
                      ? orderData.variant.name
                      : t.notSpecified
                    }
                  </span>
                </div>
              ) : (
                <div className="fixflash-confirmorder-detail-item">
                  <span className="fixflash-confirmorder-detail-label">{t.colorVariant}:</span>
                  <span className="fixflash-confirmorder-detail-value">
                    {orderData.variant?.name}
                  </span>
                </div>
              )}
            </div>

            {/* Temporary Phone Checkbox Section - VISIBLE DISABLED CHECKBOX WITH CLICK HANDLER */}
            <div className="fixflash-confirmorder-temporary-phone-section">
              <div
                className="fixflash-confirmorder-temporary-phone-wrapper"
                onClick={() => {
                  // Show toast message when clicked anywhere in this section
                  setToast({
                    message: t.temporaryPhoneComingSoon,
                    type: 'info'
                  });
                }}
              >
                <label className="fixflash-confirmorder-temporary-phone-label">
                  <input
                    type="checkbox"
                    disabled
                    className="fixflash-confirmorder-temporary-phone-checkbox"
                    onClick={(e) => {
                      // Prevent the wrapper's onClick from firing when checkbox is clicked
                      e.stopPropagation();
                      // Show toast message when checkbox is clicked
                      setToast({
                        message: t.temporaryPhoneComingSoon,
                        type: 'info'
                      });
                    }}
                  />
                  <div className="fixflash-confirmorder-temporary-phone-content">
                    <div className="fixflash-confirmorder-temporary-phone-header">
                      <Phone size={16} />
                      <span className="fixflash-confirmorder-temporary-phone-title">
                        {t.temporaryPhone}
                      </span>
                      <span className="fixflash-confirmorder-coming-soon-badge">
                        {t.temporaryPhoneComingSoon}
                      </span>
                    </div>
                    <p className="fixflash-confirmorder-temporary-phone-desc">
                      {t.temporaryPhoneDesc}
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="fixflash-confirmorder-section">
            <h2 className="fixflash-confirmorder-section-title">
              <Wrench size={18} />
              {t.selectedServices}
            </h2>
            <div className="fixflash-confirmorder-services-list">
              {orderData.services?.map((service, index) => (
                <div key={index} className="fixflash-confirmorder-service-item">
                  <CheckCircle size={16} className="fixflash-confirmorder-service-check-icon" />
                  <span className="fixflash-confirmorder-service-name">{service.name}</span>
                  <span className="fixflash-confirmorder-service-price">₹{service.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Fees Breakdown Section */}
          <div className="fixflash-confirmorder-section">
            <h2 className="fixflash-confirmorder-section-title">
              <MapPin size={18} />
              Delivery Fees
            </h2>
            <div className="fixflash-confirmorder-fees-breakdown">
              <div className="fixflash-confirmorder-fee-item">
                <span className="fixflash-confirmorder-fee-label">Service Charges:</span>
                <span className="fixflash-confirmorder-fee-value">₹{orderData.totalPrice?.toLocaleString()}</span>
              </div>
              <div className="fixflash-confirmorder-fee-item">
                <span className="fixflash-confirmorder-fee-label">Pickup Delivery:</span>
                <span className="fixflash-confirmorder-fee-value">
                  {loadingFees ? 'Calculating...' : `₹${deliveryFees.pickup_fee?.toLocaleString()}`}
                </span>
              </div>
              <div className="fixflash-confirmorder-fee-item">
                <span className="fixflash-confirmorder-fee-label">Return Delivery:</span>
                <span className="fixflash-confirmorder-fee-value">
                  {loadingFees ? 'Calculating...' : `₹${deliveryFees.return_delivery_fee?.toLocaleString()}`}
                </span>
              </div>
              <div className="fixflash-confirmorder-fee-divider"></div>
              <div className="fixflash-confirmorder-total-fee">
                <span className="fixflash-confirmorder-total-label">Total Amount:</span>
                <span className="fixflash-confirmorder-total-value">
                  {loadingFees ? 'Calculating...' : `₹${deliveryFees.total_amount?.toLocaleString()}`}
                </span>
              </div>
            </div>
          </div>

          <div className="fixflash-confirmorder-section">
            <h2 className="fixflash-confirmorder-section-title">
              <CreditCard size={18} />
              {t.paymentMethod}
            </h2>
            <div className="fixflash-confirmorder-payment-methods">
              <label className="fixflash-confirmorder-payment-option fixflash-confirmorder-payment-option-disabled">
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="fixflash-confirmorder-payment-checkbox"
                />
                <div className="fixflash-confirmorder-payment-content">
                  <div className="fixflash-confirmorder-payment-info">
                    <span className="fixflash-confirmorder-payment-name">{t.cashOnDelivery}</span>
                    <span className="fixflash-confirmorder-payment-description">
                      Pay when you receive the device
                    </span>
                  </div>
                  <div className="fixflash-confirmorder-payment-selected">
                    <CheckCircle size={16} />
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Inline Order Summary (for when user scrolls down) */}
          <div className="fixflash-confirmorder-inline-summary" ref={buttonRef}>
            <div className="fixflash-confirmorder-inline-total">
              <span className="fixflash-confirmorder-inline-total-label">{t.totalAmount}:</span>
              <span className="fixflash-confirmorder-inline-total-value">
                ₹{loadingFees ? 'Calculating...' : deliveryFees.total_amount?.toLocaleString()}
              </span>
            </div>
            <div className="fixflash-confirmorder-button-container">
              <button
                className="fixflash-confirmorder-inline-confirm-btn"
                onClick={handleConfirmOrder}
                disabled={isConfirmButtonDisabled()}
                title={isConfirmButtonDisabled() ? getDisabledReason() : ''}
              >
                {isLoading ? (
                  <>
                    <div className="fixflash-confirmorder-loading-spinner"></div>
                    {t.processing}
                  </>
                ) : (
                  t.confirmOrder
                )}
              </button>
              {isConfirmButtonDisabled() && (
                <div className="fixflash-confirmorder-disabled-tooltip">
                  {getDisabledReason()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Section - Only show when location overlay is closed and button is not in view */}
      {!showLocationOverlay && showFixedButton && (
        <div className="fixflash-confirmorder-fixed-bottom">
          <div className="fixflash-confirmorder-fixed-content">
            <div className="fixflash-confirmorder-fixed-total">
              <span className="fixflash-confirmorder-fixed-total-label">{t.totalAmount}:</span>
              <span className="fixflash-confirmorder-fixed-total-value">
                ₹{loadingFees ? 'Calculating...' : deliveryFees.total_amount?.toLocaleString()}
              </span>
            </div>
            <div className="fixflash-confirmorder-button-container">
              <button
                className="fixflash-confirmorder-fixed-confirm-btn"
                onClick={handleConfirmOrder}
                disabled={isConfirmButtonDisabled()}
                title={isConfirmButtonDisabled() ? getDisabledReason() : ''}
              >
                {isLoading ? (
                  <>
                    <div className="fixflash-confirmorder-loading-spinner"></div>
                    {t.processing}
                  </>
                ) : (
                  t.confirmOrder
                )}
              </button>
              {isConfirmButtonDisabled() && (
                <div className="fixflash-confirmorder-disabled-tooltip">
                  {getDisabledReason()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfirmOrder;