import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import { Search, User, MapPin } from 'lucide-react';
import LoginOverlay from '../LoginOverlay/LoginOverlay';
import ProfileAndSettings from '../ProfileAndSettings/ProfileAndSettings';
import { useLogin } from '../../Context/LoginContext/LoginContext';
import LocationOverlay from '../LocationOverlay/LocationOverlay';
import CustomerToast from '../CustomToast/CustomToast';
import { addressService } from '../../services/address.js';

// Translation data for the navbar
const navbarTranslations = {
  en: {
    searchPlaceholder: 'Search for "phone services"',
    login: 'Login',
    profile: 'Profile',
    logout: 'Logout',
    location: 'Location', // Changed from delivery to location
    pickup: 'Pickup',
    selectLocation: 'Select Location',
    addAddress: 'Add Address',
    noAddress: 'No Address',
    loginToAddAddress: 'Login to add address',
    locationSelected: 'Location selected successfully',
    pickupLocationSelected: 'Pickup location selected successfully',
    deliveryLocationSelected: 'Delivery location selected successfully'
  },
  hi: {
    searchPlaceholder: '"फोन सर्विस" के लिए खोजें',
    login: 'लॉग इन',
    profile: 'प्रोफाइल',
    logout: 'लॉग आउट',
    location: 'लोकेशन', // Changed from delivery to location
    pickup: 'पिकअप',
    selectLocation: 'लोकेशन चुनें',
    addAddress: 'पता जोड़ें',
    noAddress: 'कोई पता नहीं',
    loginToAddAddress: 'पता जोड़ने के लिए लॉगिन करें',
    locationSelected: 'लोकेशन सफलतापूर्वक चयनित',
    pickupLocationSelected: 'पिकअप लोकेशन सफलतापूर्वक चयनित',
    deliveryLocationSelected: 'डिलीवरी लोकेशन सफलतापूर्वक चयनित'
  },
  mr: {
    searchPlaceholder: '"फोन सर्विस" शोधा',
    login: 'लॉग इन',
    profile: 'प्रोफाइल',
    logout: 'लॉग आउट',
    location: 'लोकेशन', // Changed from delivery to location
    pickup: 'पिकअप',
    selectLocation: 'लोकेशन निवडा',
    addAddress: 'पत्ता जोडा',
    noAddress: 'पत्ता नाही',
    loginToAddAddress: 'पत्ता जोडण्यासाठी लॉगिन करा',
    locationSelected: 'लोकेशन यशस्वीरित्या निवडले',
    pickupLocationSelected: 'पिकअप लोकेशन यशस्वीरित्या निवडले',
    deliveryLocationSelected: 'डिलिव्हरी लोकेशन यशस्वीरित्या निवडले'
  }
};

const Navbar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLocationOverlayOpen, setIsLocationOverlayOpen] = useState(false);
  const [isLoginOverlayOpen, setIsLoginOverlayOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userAddresses, setUserAddresses] = useState([]);
  const [hasAddresses, setHasAddresses] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout, userData } = useLogin();
  
  // Check if current page is Confirm Order page
  const isConfirmOrderPage = location.pathname === '/confirm-order';
  
  // Get the selected language from localStorage or default to English
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    return savedLanguage && navbarTranslations[savedLanguage] ? savedLanguage : 'en';
  });

  // Show toast function
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Load user addresses only when user is logged in
  const loadUserAddresses = async () => {
    if (!isLoggedIn) {
      // Clear all address data if user is not logged in
      setUserAddresses([]);
      setHasAddresses(false);
      setSelectedLocation(null);
      return;
    }

    try {
      const response = await addressService.getAddresses();
      if (response.success) {
        setUserAddresses(response.data);
        setHasAddresses(response.data.length > 0);
        
        // Find default address or use first address
        const defaultAddress = response.data.find(addr => addr.isDefault) || response.data[0];
        if (defaultAddress) {
          const newLocation = {
            type: 'Delivery', // This is for internal tracking, display uses "Location"
            address: formatAddressForDisplay(defaultAddress),
            addressData: defaultAddress
          };
          setSelectedLocation(newLocation);
        } else {
          // No addresses found for logged in user
          setSelectedLocation(null);
        }
      }
    } catch (error) {
      console.error('Error loading user addresses:', error);
      setHasAddresses(false);
      setSelectedLocation(null);
    }
  };

  // Format address for display in navbar
  const formatAddressForDisplay = (address) => {
    if (!address) return navbarTranslations[selectedLanguage].noAddress;
    
    const parts = [address.address_line];
    if (address.landmark) parts.push(address.landmark);
    parts.push(address.city, address.state, address.pincode);
    
    return parts.filter(part => part).join(', ');
  };

  // Update language when it changes in localStorage
  useEffect(() => {
    const handleLanguageChange = () => {
      const savedLanguage = localStorage.getItem('preferredLanguage');
      if (savedLanguage && navbarTranslations[savedLanguage]) {
        setSelectedLanguage(savedLanguage);
      }
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  // Load addresses when user logs in or component mounts
  useEffect(() => {
    loadUserAddresses();
  }, [isLoggedIn]);

  // Clear all address data when user logs out
  useEffect(() => {
    if (!isLoggedIn) {
      setUserAddresses([]);
      setHasAddresses(false);
      setSelectedLocation(null);
    }
  }, [isLoggedIn]);

  const handleLocationSelect = (location, mode = 'delivery') => {
    const formattedLocation = {
      type: mode === 'delivery' ? 'Location' : 'Pickup', // Changed "Delivery" to "Location"
      address: formatAddressForDisplay(location),
      addressData: location
    };
    setSelectedLocation(formattedLocation);
    setIsLocationOverlayOpen(false);
    
    // Show toast after location is selected
    if (mode === 'delivery') {
      showToast(navbarTranslations[selectedLanguage].deliveryLocationSelected, 'success');
    } else {
      showToast(navbarTranslations[selectedLanguage].pickupLocationSelected, 'success');
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      setIsProfileOpen(true);
    } else {
      setIsLoginOverlayOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoginOverlayOpen(false);
    // Reload addresses after successful login
    loadUserAddresses();
    showToast('Login successful!', 'success');
  };

  const handleLogout = () => {
    // Clear all user-specific data before logout
    setUserAddresses([]);
    setHasAddresses(false);
    setSelectedLocation(null);
    
    logout();
    setIsProfileOpen(false);
    showToast('Logged out successfully', 'success');
  };

  // Get display address text
  const getDisplayAddress = () => {
    // If user is not logged in, always show "Select Location"
    if (!isLoggedIn) {
      return navbarTranslations[selectedLanguage].selectLocation;
    }
    
    // If user is logged in but has no addresses, show "Add Address"
    if (isLoggedIn && !hasAddresses) {
      return navbarTranslations[selectedLanguage].addAddress;
    }
    
    // If user is logged in and has addresses but none selected, show "Select Location"
    if (isLoggedIn && hasAddresses && !selectedLocation) {
      return navbarTranslations[selectedLanguage].selectLocation;
    }
    
    // If we have a selected location, show it
    if (selectedLocation && selectedLocation.address) {
      return selectedLocation.address;
    }
    
    // Default fallback
    return navbarTranslations[selectedLanguage].selectLocation;
  };

  // Get display type - Always show "Location" instead of "Delivery"
  const getDisplayType = () => {
    if (selectedLocation?.type === 'Pickup') {
      return navbarTranslations[selectedLanguage].pickup;
    }
    // Always show "Location" for delivery addresses
    return navbarTranslations[selectedLanguage].location;
  };

  // Handle location selector click
  const handleLocationClick = (e) => {
    e.stopPropagation();
    
    // Don't open location overlay on confirm order page
    if (isConfirmOrderPage) {
      return;
    }
    
    // If user is not logged in, open login overlay instead of location overlay
    if (!isLoggedIn) {
      setIsLoginOverlayOpen(true);
      return;
    }
    
    // If user is logged in, open location overlay
    setIsLocationOverlayOpen(true);
  };

  return (
    <>
      <nav className="modern-navbar">
        <div className="navbar-container">
          {/* Left section - Logo and location */}
          <div className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <span className="futuristic-logo">FixFlash</span>
            <div 
              className={`location-selector ${isConfirmOrderPage ? 'location-selector-disabled' : ''}`} 
              onClick={handleLocationClick}
            >
              <div className="delivery-info">
                <span className="delivery-tag">{getDisplayType()}</span>
                <span className="address-text">{getDisplayAddress()}</span>
              </div>
              <MapPin size={16} className="location-pin-icon" />
            </div>
          </div>

          {/* Center search */}
          <div className={`search-container ${isSearchFocused ? 'focused' : ''}`}>
            <Search className="search_bar-icon" size={18} />
            <input
              type="text"
              placeholder={navbarTranslations[selectedLanguage].searchPlaceholder}
              className="search_bar-input"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>

          {/* Right section - Login/Profile button */}
          <div className="navbar-actions">
            <a href="#" className="action-button" onClick={handleLoginClick}>
              <User className="icon" size={18} />
              <span>{isLoggedIn ? navbarTranslations[selectedLanguage].profile : navbarTranslations[selectedLanguage].login}</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Toast Component - Shows in main app */}
      {toast && (
        <CustomerToast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast(null)}
        />
      )}

      {/* Location Overlay - Only show if user is logged in and not on Confirm Order page */}
      {isLocationOverlayOpen && isLoggedIn && !isConfirmOrderPage && (
        <LocationOverlay
          onClose={() => setIsLocationOverlayOpen(false)} 
          onSelectLocation={handleLocationSelect}
        />
      )}

      {/* Login Overlay */}
      {isLoginOverlayOpen && (
        <div className="overlay-backdrop">
          <LoginOverlay
            onClose={() => setIsLoginOverlayOpen(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        </div>
      )}

      {/* Profile Sidebar/Overlay */}
      {isProfileOpen && (
        <ProfileAndSettings 
          onClose={() => setIsProfileOpen(false)}
          onLogout={handleLogout}
        />
      )}
    </>
  );
};

export default Navbar;