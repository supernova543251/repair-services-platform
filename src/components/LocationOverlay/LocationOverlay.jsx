import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Plus, X } from 'lucide-react';
import './LocationOverlay.css';
import AddressForm from '../AddressForm/AddressForm';
import AddressesList from '../AddressesList/AddressesList';
import CustomerToast from '../CustomToast/CustomToast';
import { addressService } from '../../services/address.js';

// Translation data
const translations = {
  en: {
    selectDeliveryLocation: 'Select Delivery Location',
    selectPickupLocation: 'Select Pickup Location',
    deliveryDescription: 'Choose where you want your device delivered',
    pickupDescription: 'Choose where we should pick up your device',
    addNewAddress: 'Add New Address',
    confirmDeliveryLocation: 'Confirm Delivery Location',
    confirmPickupLocation: 'Confirm Pickup Location',
    confirmLocation: 'Confirm Location',
    pleaseSelectAddress: 'Please select an address',
    addressSaved: 'Address saved successfully',
    addressDeleted: 'Address deleted successfully',
    addressSetDefault: 'Address set as default',
    deleteAddressConfirm: 'Are you sure you want to delete this address?',
    cannotDeleteOnlyAddress: 'Cannot delete the only address. Please add another address first.',
    failedToDelete: 'Failed to delete address. Please try again.',
    failedToSetDefault: 'Failed to set default address',
    loadingAddresses: 'Loading addresses...',
    noAddresses: 'No addresses found',
    addFirstAddress: 'Add your first address to get started',
    default: 'Default',
    edit: 'Edit',
    delete: 'Delete',
    select: 'Select',
    selected: 'Selected',
    back: 'Back',
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel'
  },
  hi: {
    selectDeliveryLocation: 'डिलीवरी लोकेशन चुनें',
    selectPickupLocation: 'पिकअप लोकेशन चुनें',
    deliveryDescription: 'चुनें कि आप अपना डिवाइस कहाँ डिलीवर करवाना चाहते हैं',
    pickupDescription: 'चुनें कि हमें आपका डिवाइस कहाँ से पिकअप करना चाहिए',
    addNewAddress: 'नया पता जोड़ें',
    confirmDeliveryLocation: 'डिलीवरी लोकेशन कन्फर्म करें',
    confirmPickupLocation: 'पिकअप लोकेशन कन्फर्म करें',
    confirmLocation: 'लोकेशन कन्फर्म करें',
    pleaseSelectAddress: 'कृपया एक पता चुनें',
    addressSaved: 'पता सफलतापूर्वक सेव हो गया',
    addressDeleted: 'पता सफलतापूर्वक डिलीट हो गया',
    addressSetDefault: 'पता डिफॉल्ट के रूप में सेट हो गया',
    deleteAddressConfirm: 'क्या आप वाकई इस पते को डिलीट करना चाहते हैं?',
    cannotDeleteOnlyAddress: 'एकमात्र पता डिलीट नहीं किया जा सकता। कृपया पहले एक और पता जोड़ें।',
    failedToDelete: 'पता डिलीट करने में विफल। कृपया पुनः प्रयास करें।',
    failedToSetDefault: 'डिफॉल्ट पता सेट करने में विफल',
    loadingAddresses: 'पते लोड हो रहे हैं...',
    noAddresses: 'कोई पता नहीं मिला',
    addFirstAddress: 'शुरू करने के लिए अपना पहला पता जोड़ें',
    default: 'डिफॉल्ट',
    edit: 'संपादित करें',
    delete: 'डिलीट करें',
    select: 'चुनें',
    selected: 'चयनित',
    back: 'वापस',
    close: 'बंद करें',
    save: 'सेव करें',
    cancel: 'कैंसिल करें'
  },
  mr: {
    selectDeliveryLocation: 'डिलिव्हरी स्थान निवडा',
    selectPickupLocation: 'पिकअप स्थान निवडा',
    deliveryDescription: 'तुम्हाला तुमचे डिव्हाइस कोठे डिलिव्हर करायचे आहे ते निवडा',
    pickupDescription: 'तुमचे डिव्हाइस आम्ही कोठून पिकअप करावे ते निवडा',
    addNewAddress: 'नवीन पत्ता जोडा',
    confirmDeliveryLocation: 'डिलिव्हरी स्थान निश्चित करा',
    confirmPickupLocation: 'पिकअप स्थान निश्चित करा',
    confirmLocation: 'स्थान निश्चित करा',
    pleaseSelectAddress: 'कृपया एक पत्ता निवडा',
    addressSaved: 'पत्ता यशस्वीरित्या जतन केला गेला',
    addressDeleted: 'पत्ता यशस्वीरित्या हटवला गेला',
    addressSetDefault: 'पत्ता डीफॉल्ट म्हणून सेट केला गेला',
    deleteAddressConfirm: 'तुम्हाला हा पत्ता हटवायचा आहे याची खात्री आहे का?',
    cannotDeleteOnlyAddress: 'एकमेव पत्ता हटवता येत नाही. कृपया प्रथम दुसरा पत्ता जोडा.',
    failedToDelete: 'पत्ता हटविण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.',
    failedToSetDefault: 'डीफॉल्ट पत्ता सेट करण्यात अयशस्वी',
    loadingAddresses: 'पत्ते लोड होत आहेत...',
    noAddresses: 'कोणतेही पत्ते सापडले नाहीत',
    addFirstAddress: 'सुरुवात करण्यासाठी तुमचा पहिला पत्ता जोडा',
    default: 'डीफॉल्ट',
    edit: 'संपादित करा',
    delete: 'हटवा',
    select: 'निवडा',
    selected: 'निवडलेले',
    back: 'मागे',
    close: 'बंद करा',
    save: 'जतन करा',
    cancel: 'रद्द करा'
  }
};

const LocationOverlay = ({ onClose, onSelectLocation, mode = 'pickup' }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  // Get translations based on selected language
  const t = translations[selectedLanguage] || translations['en'];

  // Load language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setSelectedLanguage(savedLanguage);
  }, []);

  // Show toast function
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Load addresses from backend
  const loadAddresses = async () => {
    try {
      setLoading(true);
      const response = await addressService.getAddresses();
      if (response.success) {
        setSavedAddresses(response.data);
        // Auto-select default address if available
        const defaultAddress = response.data.find(addr => addr.isDefault);
        if (defaultAddress) {
          setSelectedAddress(defaultAddress);
        } else if (response.data.length > 0) {
          // Select first address if no default
          setSelectedAddress(response.data[0]);
        }
      }
    } catch (error) {
      console.error('Error loading addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
    // Add body class to prevent scrolling
    document.body.classList.add('lo-bottom-sheet-open');
    
    // Trigger animation after mount
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
    
    return () => {
      document.body.classList.remove('lo-bottom-sheet-open');
    };
  }, []);

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  const handleAddAddress = () => {
    setEditingAddress(null);
    setShowAddressForm(true);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setShowAddressForm(true);
  };

  const handleAddressSaved = () => {
    loadAddresses(); // Reload addresses after save/update
    setShowAddressForm(false);
    setEditingAddress(null);
    showToast(t.addressSaved, 'success');
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm(t.deleteAddressConfirm)) {
      return;
    }

    try {
      const response = await addressService.deleteAddress(id);
      if (response.success) {
        await loadAddresses(); // Reload addresses
        if (selectedAddress?._id === id) {
          // Select another address if available
          const remainingAddresses = savedAddresses.filter(addr => addr._id !== id);
          if (remainingAddresses.length > 0) {
            setSelectedAddress(remainingAddresses[0]);
          } else {
            setSelectedAddress(null);
          }
        }
        showToast(t.addressDeleted, 'success');
      }
    } catch (error) {
      console.error('Error deleting address:', error);
      if (error.message.includes('Cannot delete the only address')) {
        showToast(t.cannotDeleteOnlyAddress, 'error');
      } else {
        showToast(t.failedToDelete, 'error');
      }
    }
  };

  const handleConfirm = async () => {
    if (!selectedAddress) {
      showToast(t.pleaseSelectAddress, 'error');
      return;
    }

    try {
      // Set as default address if not already default
      if (!selectedAddress.isDefault) {
        await addressService.setDefaultAddress(selectedAddress._id);
        showToast(t.addressSetDefault, 'success');
      }
      
      // Pass selected address to parent component
      onSelectLocation(selectedAddress, mode);
      
      // Close overlay
      handleClose();
      
    } catch (error) {
      console.error('Error setting default address:', error);
      showToast(t.failedToSetDefault, 'error');
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Match CSS transition duration
  };

  const getOverlayTitle = () => {
    return mode === 'delivery' ? t.selectDeliveryLocation : t.selectPickupLocation;
  };

  const getOverlaySubtitle = () => {
    return mode === 'delivery' ? t.deliveryDescription : t.pickupDescription;
  };

  const getConfirmButtonText = () => {
    return mode === 'delivery' ? t.confirmDeliveryLocation : t.confirmPickupLocation;
  };

  if (showAddressForm) {
    return (
      <AddressForm 
        onClose={() => {
          setShowAddressForm(false);
          setEditingAddress(null);
        }}
        onAddressAdded={handleAddressSaved}
        editAddress={editingAddress}
      />
    );
  }

  return (
    <div className="lo-overlay-wrapper">
      {/* Backdrop */}
      <div 
        className={`lo-backdrop ${isVisible ? 'active' : ''}`}
        onClick={handleClose}
      />
      
      {/* Bottom Sheet */}
      <div 
        ref={overlayRef}
        className={`lo-bottom-sheet ${isVisible ? 'active' : ''}`}
      >
        {/* Drag Handle */}
        <div className="lo-drag-handle" />
        
        {/* Header */}
        <div className="lo-header">
          <button 
            className="lo-close-button"
            onClick={handleClose}
            aria-label={t.close}
          >
            <X size={24} />
          </button>
          <div className="lo-header-text">
            <h1>{getOverlayTitle()}</h1>
            <p>{getOverlaySubtitle()}</p>
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="lo-content">
          {/* Add New Address Button */}
          <div className="lo-add-new-section">
            <button 
              className="lo-add-new-btn"
              onClick={handleAddAddress}
            >
              <Plus size={20} />
              <span>{t.addNewAddress}</span>
            </button>
          </div>

          {/* Addresses List */}
          <AddressesList 
            addresses={savedAddresses}
            selectedAddress={selectedAddress}
            onSelectAddress={handleSelectAddress}
            onEditAddress={handleEditAddress}
            onDeleteAddress={handleDeleteAddress}
            loading={loading}
            translations={t}
          />
        </div>

        {/* Floating Confirm Button - Always visible */}
        <div className="lo-floating-button-container">
          <button
            className="lo-floating-button"
            onClick={handleConfirm}
            disabled={!selectedAddress}
            aria-label={getConfirmButtonText()}
          >
            {getConfirmButtonText()}
          </button>
        </div>

        {/* Toast - Shows when address is saved or other actions */}
        {toast && (
          <CustomerToast
            message={toast.message}
            type={toast.type}
            duration={3000}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
};

export default LocationOverlay;