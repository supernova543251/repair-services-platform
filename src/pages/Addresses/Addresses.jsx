import React, { useState, useEffect } from 'react';
import { MapPin, Plus, X } from 'lucide-react';
import './Addresses.css';
import LocationPicker from '../../components/LocationPicker/LocationPicker';
import AddressesList from '../../components/AddressesList/AddressesList';
import AddressForm from '../../components/AddressForm/AddressForm';
import { addressService } from '../../services/address.js';

// Translation data
const addressesTranslations = {
  en: {
    title: "My Addresses",
    subtitle: "Manage your delivery and pickup locations",
    addAddress: "Add New Address",
    emptyTitle: "No addresses saved yet",
    emptySubtitle: "Add your first address to get started with services",
    addFirstAddress: "Add Your First Address",
    editAddress: "Edit Address"
  },
  hi: {
    title: "मेरे पते",
    subtitle: "अपने डिलीवरी और पिकअप स्थानों को प्रबंधित करें",
    addAddress: "नया पता जोड़ें",
    emptyTitle: "अभी तक कोई पते सहेजे नहीं गए हैं",
    emptySubtitle: "सर्विस का उपयोग शुरू करने के लिए अपना पहला पता जोड़ें",
    addFirstAddress: "अपना पहला पता जोड़ें",
    editAddress: "पता संपादित करें"
  },
  mr: {
    title: "माझे पत्ते",
    subtitle: "तुमची डिलिवरी आणि पिकअप लोकेशन्स व्यवस्थापित करा",
    addAddress: "नवीन पत्ता जोडा",
    emptyTitle: "अद्याप कोणतेही पत्ते जतन केलेले नाहीत",
    emptySubtitle: "सर्विस सुरू करण्यासाठी तुमचा पहिला पत्ता जोडा",
    addFirstAddress: "तुमचा पहिला पत्ता जोडा",
    editAddress: "पत्ता संपादित करा"
  }
};

// Skeleton Loader Component
const SkeletonLoader = () => {
  return (
    <div className="did-addresses-skeleton-container">
      {/* Header Skeleton */}
      <div className="did-skeleton-header">
        <div className="did-skeleton-header-content">
          <div className="skeleton skeleton-icon"></div>
          <div className="skeleton-text-group">
            <div className="skeleton skeleton-main-title"></div>
            <div className="skeleton skeleton-subtitle"></div>
          </div>
        </div>
        <div className="skeleton skeleton-add-btn"></div>
      </div>

      {/* Address List Skeleton */}
      <div className="did-skeleton-content">
        <div className="did-skeleton-list">
          {[1, 2, 3].map((item) => (
            <div key={item} className="did-skeleton-address-card">
              <div className="skeleton skeleton-card-icon"></div>
              <div className="skeleton-card-content">
                <div className="skeleton skeleton-card-title"></div>
                <div className="skeleton skeleton-card-address-line"></div>
                <div className="skeleton skeleton-card-address-line-short"></div>
              </div>
              <div className="skeleton-card-actions">
                <div className="skeleton skeleton-action-btn"></div>
                <div className="skeleton skeleton-action-btn"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Empty State Skeleton
const EmptyStateSkeleton = () => {
  return (
    <div className="did-empty-state-skeleton">
      <div className="skeleton skeleton-empty-icon"></div>
      <div className="skeleton skeleton-empty-title"></div>
      <div className="skeleton skeleton-empty-subtitle"></div>
      <div className="skeleton skeleton-empty-btn"></div>
    </div>
  );
};

function Addresses() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const MINIMUM_LOADING_TIME = 200 // 2 seconds minimum loading time
  
  // Load addresses from backend
  const loadAddresses = async () => {
    try {
      setLoading(true);
      const response = await addressService.getAddresses();
      if (response.success) {
        setAddresses(response.data);
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
      // Wait for minimum loading time before hiding skeleton
      setTimeout(() => {
        setLoading(false);
        setShowSkeleton(false);
      }, MINIMUM_LOADING_TIME);
    }
  };

  // Get language preference from localStorage and load addresses
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && addressesTranslations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
    
    // Load addresses
    loadAddresses();
    
    // Listen for language changes
    const handleLanguageChange = () => {
      const lang = localStorage.getItem('preferredLanguage');
      if (lang && addressesTranslations[lang]) {
        setCurrentLanguage(lang);
      }
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  // Function to handle address deletion
  const handleDeleteAddress = async (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        const response = await addressService.deleteAddress(id);
        if (response.success) {
          await loadAddresses(); // Reload addresses
          if (selectedAddress?._id === id) {
            // Select another address if available
            const remainingAddresses = addresses.filter(addr => addr._id !== id);
            if (remainingAddresses.length > 0) {
              setSelectedAddress(remainingAddresses[0]);
            } else {
              setSelectedAddress(null);
            }
          }
        }
      } catch (error) {
        console.error('Error deleting address:', error);
        if (error.message.includes('Cannot delete the only address')) {
          alert('Cannot delete the only address. Please add another address first.');
        } else {
          alert('Failed to delete address. Please try again.');
        }
      }
    }
  };

  // Function to handle address edit
  const handleEditAddress = (address) => {
    console.log("Editing address:", address);
    setEditingAddress(address);
    setShowAddressForm(true);
    setShowLocationPicker(false);
  };

  // Function to handle address selection
  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  // Function to handle location selection from LocationPicker
  const handleSelectLocation = (location) => {
    console.log("Location selected:", location);
    setSelectedAddress(location);
  };

  // Function to handle adding a new address from LocationPicker
  const handleAddAddress = (newAddress) => {
    // Reload addresses when new address is added
    loadAddresses();
    setShowLocationPicker(false);
  };

  // Function to handle address form submission
  const handleAddressSaved = () => {
    loadAddresses(); // Reload addresses
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  // Format address for display in AddressesList
  const formatAddressForList = (address) => {
    const parts = [address.address_line];
    if (address.landmark) parts.push(address.landmark);
    parts.push(address.city, address.state, address.pincode);
    
    return {
      _id: address._id,
      id: address._id, // Keep both for compatibility
      type: address.type,
      name: address.name,
      phone: address.phone,
      address: parts.filter(part => part).join(', '),
      isDefault: address.isDefault,
      // Include all original address data for editing
      ...address
    };
  };

  if (showSkeleton) {
    return <SkeletonLoader />;
  }

  return (
    <div className="did-addresses-container">
      {/* Location Picker Overlay */}
      {showLocationPicker && (
        <div className="location-picker-overlay">
          <div className="location-picker-content">
            <div className="location-picker-header">
              <p className='overlay-header'>Add Address</p>
              <button 
                className="location-picker-close-btn"
                onClick={() => setShowLocationPicker(false)}
              >
                <X size={24} />
              </button>
            </div>
            {/* FIX: Pass currentLanguage prop to LocationPicker */}
            <LocationPicker
              currentLanguage={currentLanguage}
              onClose={() => setShowLocationPicker(false)}
              onSelectLocation={handleSelectLocation}
              onAddAddress={handleAddAddress}
            />
          </div>
        </div>
      )}

      {/* Address Form Overlay for Editing */}
      {showAddressForm && (
        <div className="location-picker-overlay">
          <div className="location-picker-content">
            <AddressForm 
              onClose={() => {
                setShowAddressForm(false);
                setEditingAddress(null);
              }}
              onAddressAdded={handleAddressSaved}
              editAddress={editingAddress}
            />
          </div>
        </div>
      )}

      <div className="did-addresses-header">
        <div className="did-header-content">
          <div className="did-header-title">
            <MapPin size={32} className="did-map-pin-icon" />
            <h1 className="multilingual-text">{addressesTranslations[currentLanguage].title}</h1>
          </div>
          <p className="did-header-subtitle multilingual-text">{addressesTranslations[currentLanguage].subtitle}</p>
        </div>
        <button 
          className="did-add-address-btn"
          onClick={() => setShowLocationPicker(true)}
        >
          <Plus size={20} />
          <span className="multilingual-text">{addressesTranslations[currentLanguage].addAddress}</span>
        </button>
      </div>

      <div className="did-addresses-content">
        {loading ? (
          <EmptyStateSkeleton />
        ) : addresses.length > 0 ? (
          <AddressesList
            addresses={addresses.map(formatAddressForList)}
            selectedAddress={selectedAddress ? formatAddressForList(selectedAddress) : null}
            onSelectAddress={(addr) => {
              const originalAddr = addresses.find(a => a._id === addr._id);
              handleSelectAddress(originalAddr);
            }}
            onEditAddress={(addr) => {
              // Pass the full address object to edit function
              const originalAddr = addresses.find(a => a._id === addr._id);
              handleEditAddress(originalAddr);
            }}
            onDeleteAddress={handleDeleteAddress}
            currentLanguage={currentLanguage}
          />
        ) : (
          <div className="did-empty-state">
            <div className="did-empty-icon">
              <MapPin size={64} />
            </div>
            <h2 className="multilingual-text">{addressesTranslations[currentLanguage].emptyTitle}</h2>
            <p className="multilingual-text">{addressesTranslations[currentLanguage].emptySubtitle}</p>
            <button 
              className="did-add-first-address-btn"
              onClick={() => setShowLocationPicker(true)}
            >
              <Plus size={20} />
              <span className="multilingual-text">{addressesTranslations[currentLanguage].addFirstAddress}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Addresses;