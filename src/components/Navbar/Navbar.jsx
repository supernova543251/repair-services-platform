import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { Search, User, Settings } from 'lucide-react';
import LoginOverlay from '../LoginOverlay/LoginOverlay';
import ProfileAndSettings from '../ProfileAndSettings/ProfileAndSettings';
import { useLogin } from '../../Context/LoginContext/LoginContext';
import LocationOverlay from '../LocationOverlay/LocationOverlay';

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
              placeholder='Search for "phone services"'
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
                <span>{isLoggedIn ? 'Logout' : 'Login'}</span>
              </button>
            )}
            
            <a href="#" className="action-button" onClick={handleLoginClick}>
              <User className="icon" size={18} />
              <span>{isLoggedIn ? 'Profile' : 'Login'}</span>
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