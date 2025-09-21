import React, { useState, useEffect } from 'react';
import { Search, X, MapPin, Navigation, Edit2, Trash2, ChevronLeft, Plus } from 'lucide-react';
import './LocationOverlay.css';
import AddressForm from '../AddressForm/AddressForm';

// Translation data
const locationTranslations = {
  en: {
    title: "Choose Delivery Location",
    subtitle: "Search or select your preferred address",
    searchPlaceholder: "Search delivery location...",
    currentLocation: "Use Current Location",
    currentLocationDesc: "Get your precise location",
    addAddress: "Add Address Manually",
    addAddressDesc: "Enter your address",
    savedAddresses: "Saved Addresses",
    confirm: "Confirm Location",
    home: "Home",
    work: "Work",
    other: "Other"
  },
  hi: {
    title: "डिलीवरी स्थान चुनें",
    subtitle: "अपना पसंदीदा पता खोजें या चुनें",
    searchPlaceholder: "डिलीवरी स्थान खोजें...",
    currentLocation: "वर्तमान स्थान का उपयोग करें",
    currentLocationDesc: "अपना सटीक स्थान प्राप्त करें",
    addAddress: "मैन्युअल रूप से पता जोड़ें",
    addAddressDesc: "अपना पता दर्ज करें",
    savedAddresses: "सहेजे गए पते",
    confirm: "स्थान की पुष्टि करें",
    home: "घर",
    work: "कार्य",
    other: "अन्य"
  },
  mr: {
    title: "डिलिवरी स्थान निवडा",
    subtitle: "तुमचा पसंतीचा पत्ता शोधा किंवा निवडा",
    searchPlaceholder: "डिलिवरी स्थान शोधा...",
    currentLocation: "सध्याचे स्थान वापरा",
    currentLocationDesc: "तुमचे अचूक स्थान मिळवा",
    addAddress: "हस्तचलित पत्ता जोडा",
    addAddressDesc: "तुमचा पत्ता प्रविष्ट करा",
    savedAddresses: "जतन केलेले पत्ते",
    confirm: "स्थान निश्चित करा",
    home: "घर",
    work: "काम",
    other: "इतर"
  }
};

const LocationOverlay = ({ onClose, onSelectLocation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Get language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && locationTranslations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
    
    // Listen for language changes
    const handleLanguageChange = () => {
      const lang = localStorage.getItem('preferredLanguage');
      if (lang && locationTranslations[lang]) {
        setCurrentLanguage(lang);
      }
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const savedAddresses = [
    { id: 1, type: locationTranslations[currentLanguage].home, address: '123 MG Road, Bangalore, 560001' },
    { id: 2, type: locationTranslations[currentLanguage].work, address: '45 Residency Road, Bangalore, 560025' },
    { id: 3, type: locationTranslations[currentLanguage].other, address: '7 Brigade Road, Bangalore, 560030' }
  ];

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  const handleConfirm = () => {
    if (selectedAddress) {
      onSelectLocation(selectedAddress);
    }
    onClose();
  };

  return (
    <div className="lo-overlay">
      <div className="lo-content">
        {/* Header */}
        <div className="lo-header">
          <button className="lo-back-button" onClick={onClose}>
            <ChevronLeft size={24} />
          </button>
          <div className="lo-header-text">
            <h1 className="multilingual-text">{locationTranslations[currentLanguage].title}</h1>
            <p className="multilingual-text">{locationTranslations[currentLanguage].subtitle}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="lo-search-container">
          <Search className="lo-search-icon" size={20} />
          <input
            type="text"
            placeholder={locationTranslations[currentLanguage].searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="lo-search-input multilingual-text"
            style={{fontFamily: "'Noto Sans', 'Noto Sans Devanagari', sans-serif"}}
          />
          {searchQuery && (
            <button className="lo-clear-btn" onClick={() => setSearchQuery('')}>
              <X size={18} />
            </button>
          )}
        </div>

        {/* Location Options - Side by Side */}
        <div className="lo-location-options">
          {/* Current Location Button */}
          <div className="lo-location-option" onClick={() => handleSelectAddress({ type: 'Current', address: 'Your current location' })}>
            <div className="lo-option-icon">
              <Navigation size={20} />
            </div>
            <div className="lo-option-text">
              <h3 className="multilingual-text">{locationTranslations[currentLanguage].currentLocation}</h3>
              <p className="multilingual-text">{locationTranslations[currentLanguage].currentLocationDesc}</p>
            </div>
          </div>

          {/* Add Address Manually Button */}
          <div className="lo-location-option" 
            onClick={() => {
              setIsAddressFormOpen(true);
            }}>
            <div className="lo-option-icon manual">
              <Plus size={20} />
            </div>
            <div className="lo-option-text">
              <h3 className="multilingual-text">{locationTranslations[currentLanguage].addAddress}</h3>
              <p className="multilingual-text">{locationTranslations[currentLanguage].addAddressDesc}</p>
            </div>
          </div>
        </div>

        {/* Address Form Modal */}
        {isAddressFormOpen && (
          <div className="address-form-modal">
            <AddressForm 
              onClose={() => setIsAddressFormOpen(false)}
            />
          </div>
        )}

        {/* Saved Addresses */}
        <div className="lo-saved-section">
          <h2 className="multilingual-text">{locationTranslations[currentLanguage].savedAddresses}</h2>
          <div className="lo-addresses-list">
            {savedAddresses.map((address) => (
              <div
                key={address.id}
                className={`lo-address-card ${selectedAddress?.id === address.id ? 'lo-selected' : ''}`}
                onClick={() => handleSelectAddress(address)}
              >
                <MapPin size={18} className="lo-pin-icon" />
                <div className="lo-address-details">
                  <h4 className="multilingual-text">{address.type}</h4>
                  <p>{address.address}</p>
                </div>
                <div className="lo-address-actions">
                  <button className="lo-icon-btn">
                    <Edit2 size={16} />
                  </button>
                  <button className="lo-icon-btn">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confirm Button */}
        <div className="lo-confirm-section">
          <button
            className="lo-confirm-btn multilingual-text"
            onClick={handleConfirm}
            disabled={!selectedAddress}
            style={{fontFamily: "'Noto Sans', 'Noto Sans Devanagari', sans-serif"}}
          >
            {locationTranslations[currentLanguage].confirm}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationOverlay;