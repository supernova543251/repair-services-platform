import React, { useState } from 'react';
import { Search, X, MapPin, Navigation, Edit2, Trash2, ChevronLeft } from 'lucide-react';
import './LocationOverlay.css';

const LocationOverlay = ({ onClose, onSelectLocation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);

  const savedAddresses = [
    { id: 1, type: 'Home', address: '123 MG Road, Bangalore, 560001' },
    { id: 2, type: 'Work', address: '45 Residency Road, Bangalore, 560025' },
    { id: 3, type: 'Other', address: '7 Brigade Road, Bangalore, 560030' }
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
            <h1>Choose Delivery Location</h1>
            <p>Search or select your preferred address</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="lo-search-container">
          <Search className="lo-search-icon" size={20} />
          <input
            type="text"
            placeholder="Search delivery location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="lo-search-input"
          />
          {searchQuery && (
            <button className="lo-clear-btn" onClick={() => setSearchQuery('')}>
              <X size={18} />
            </button>
          )}
        </div>

        {/* Current Location Button */}
        <div className="lo-current-location" onClick={() => handleSelectAddress({type: 'Current', address: 'Your current location'})}>
          <div className="lo-location-icon">
            <Navigation size={20} />
          </div>
          <div className="lo-location-text">
            <h3>Use Current Location</h3>
            <p>Get your precise location</p>
          </div>
        </div>

        {/* Saved Addresses */}
        <div className="lo-saved-section">
          <h2>Saved Addresses</h2>
          <div className="lo-addresses-list">
            {savedAddresses.map((address) => (
              <div 
                key={address.id} 
                className={`lo-address-card ${selectedAddress?.id === address.id ? 'lo-selected' : ''}`}
                onClick={() => handleSelectAddress(address)}
              >
                <MapPin size={18} className="lo-pin-icon" />
                <div className="lo-address-details">
                  <h4>{address.type}</h4>
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
            className="lo-confirm-btn"
            onClick={handleConfirm}
            disabled={!selectedAddress}
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationOverlay;