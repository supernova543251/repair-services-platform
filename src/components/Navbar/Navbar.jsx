import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FiSearch, FiUser, FiChevronDown, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="modern-navbar">
        <div className="navbar-container">
          {/* Left section - Logo and location */}
          <div className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <span className="futuristic-logo">FixFlash</span>
            <div className="location-selector" onClick={() => setIsLocationModalOpen(true)}>
              <div className="delivery-info">
                <span className="delivery-tag">Delivery </span>
                <span className="address-text">Nalasopara East, Mumbai</span>
              </div>
              <div className="location-dropdown">
                <FiChevronDown className="dropdown-icon" />
              </div>
            </div>
          </div>

          {/* Center search */}
          <div className={`search-container ${isSearchFocused ? 'focused' : ''}`}>
            <FiSearch className="search_bar-icon" />
            <input
              type="text"
              placeholder='Search for "phone services"'
              className="search_bar-input"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>

          {/* Right section - Login button */}
          <div className="navbar-actions">
            <Link to="/login" className="action-button">
              <FiUser className="icon" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Location Modal Overlay */}
      {isLocationModalOpen && (
        <div className="overlay">
          <div className="location-modal">
            <div className="modal-header">
              <h3>Change Location</h3>
              <button
                className="close-btn"
                onClick={() => setIsLocationModalOpen(false)}
              >
                <FiX />
              </button>
            </div>

            <div className="modal-body">
              <button className="detect-btn">Detect my location</button>
              <span className="or-divider">OR</span>
              <input
                type="text"
                className="location-input"
                placeholder="Search delivery location"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
