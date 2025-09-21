import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { Search, User, Settings } from 'lucide-react';
import LoginOverlay from '../LoginOverlay/LoginOverlay';
import ProfileAndSettings from '../ProfileAndSettings/ProfileAndSettings';
import { useLogin } from '../../Context/LoginContext/LoginContext';
import LocationOverlay from '../LocationOverlay/LocationOverlay';

// Translation data for the navbar
const navbarTranslations = {
  en: {
    searchPlaceholder: 'Search for "phone services"',
    login: 'Login',
    profile: 'Profile',
    logout: 'Logout'
  },
  hi: {
    searchPlaceholder: '"फोन सर्विस" के लिए खोजें',
    login: 'लॉग इन',
    profile: 'प्रोफाइल',
    logout: 'लॉग आउट'
  },
  mr: {
    searchPlaceholder: '"फोन सर्विस" शोधा',
    login: 'लॉग इन',
    profile: 'प्रोफाइल',
    logout: 'लॉग आउट'
  }
};

const Navbar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLocationOverlayOpen, setIsLocationOverlayOpen] = useState(false);
  const [isLoginOverlayOpen, setIsLoginOverlayOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    type: 'Delivery',
    address: 'Nalasopara East, Mumbai'
  });
  const navigate = useNavigate();
  const { isLoggedIn, logout, toggleLogin, userData } = useLogin();
  
  // Get the selected language from localStorage or default to English
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    return savedLanguage && navbarTranslations[savedLanguage] ? savedLanguage : 'en';
  });

  // Update language when it changes in localStorage
  React.useEffect(() => {
    const handleLanguageChange = () => {
      const savedLanguage = localStorage.getItem('preferredLanguage');
      if (savedLanguage && navbarTranslations[savedLanguage]) {
        setSelectedLanguage(savedLanguage);
      }
    };
    
    // Listen for custom event that can be triggered when language changes
    window.addEventListener('languageChanged', handleLanguageChange);
    
    // Also check periodically (in case the event approach doesn't work)
    const interval = setInterval(handleLanguageChange, 1000);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
      clearInterval(interval);
    };
  }, []);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setIsLocationOverlayOpen(false);
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
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  return (
    <>
      <nav className="modern-navbar">
        <div className="navbar-container">
          {/* Left section - Logo and location */}
          <div className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <span className="futuristic-logo">FixFlash</span>
            <div 
              className="location-selector" 
              onClick={(e) => {
                e.stopPropagation();
                setIsLocationOverlayOpen(true);
              }}
            >
              <div className="delivery-info">
                <span className="delivery-tag">{selectedLocation.type}</span>
                <span className="address-text">{selectedLocation.address}</span>
              </div>
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
            {/* Test mode toggle - only visible during development */}
            {process.env.NODE_ENV === 'development' && (
              <button 
                className="action-button test-toggle"
                onClick={toggleLogin}
                title="Toggle login state for testing"
              >
                <Settings size={16} />
                <span>{isLoggedIn ? navbarTranslations[selectedLanguage].logout : navbarTranslations[selectedLanguage].login}</span>
              </button>
            )}
            
            <a href="#" className="action-button" onClick={handleLoginClick}>
              <User className="icon" size={18} />
              <span>{isLoggedIn ? navbarTranslations[selectedLanguage].profile : navbarTranslations[selectedLanguage].login}</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Location Overlay */}
      {isLocationOverlayOpen && (
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
        />
      )}
    </>
  );
};

export default Navbar;