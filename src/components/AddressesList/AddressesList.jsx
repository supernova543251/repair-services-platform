import React from 'react';
import { MapPin, Edit2, Trash2, Star, User, Phone } from 'lucide-react';
import './AddressesList.css';

const AddressesList = ({ 
  addresses, 
  selectedAddress, 
  onSelectAddress, 
  onEditAddress, 
  onDeleteAddress,
  currentLanguage = 'en',
  loading = false
}) => {
  
  const getAddressTypeText = (type) => {
    const typeMap = {
      en: { home: "Home", work: "Work", other: "Other" },
      hi: { home: "घर", work: "कार्य", other: "अन्य" },
      mr: { home: "घर", work: "काम", other: "इतर" }
    };
    return typeMap[currentLanguage]?.[type] || type;
  };

  const formatPhoneForDisplay = (phone) => {
    if (!phone) return '';
    // Remove +91 prefix for display
    return phone.replace('+91', '');
  };

  if (loading) {
    return (
      <div className="al-container">
        <h2>Saved Addresses</h2>
        <div className="loading-addresses">Loading addresses...</div>
      </div>
    );
  }

  return (
    <div className="al-container">
      <h2>Saved Addresses</h2>
      <div className="al-addresses-list">
        {addresses.length === 0 ? (
          <div className="no-addresses">
            <p>No addresses saved yet.</p>
          </div>
        ) : (
          addresses.map((address) => (
            <div
              key={address._id || address.id}
              className={`al-address-card ${selectedAddress?._id === address._id || selectedAddress?.id === address.id ? 'al-selected' : ''} ${address.isDefault ? 'al-default' : ''}`}
              onClick={() => onSelectAddress(address)}
            >
              <MapPin size={35} className="al-pin-icon" />
              <div className="al-address-details">
                {/* Address Type as Title */}
                <div className="al-address-header">
                  <h4>{getAddressTypeText(address.type)}</h4>
                  {address.isDefault && (
                    <div className="al-default-badge">
                      <Star size={14} fill="currentColor" />
                      <span>Default</span>
                    </div>
                  )}
                </div>
                
                {/* Full Address */}
                <p className="al-address-line">{address.address_line}</p>
                <p className="al-location-details">
                  {address.city}, {address.state} - {address.pincode}
                  {address.landmark && ` (Near ${address.landmark})`}
                </p>

                {/* Contact Information */}
                <div className="al-contact-info">
                  <div className="al-contact-item">
                    <User size={12} />
                    <span className="al-contact-label">Name:</span>
                    <span className="al-contact-value">{address.name}</span>
                  </div>
                  <div className="al-contact-item">
                    <Phone size={12} />
                    <span className="al-contact-label">Phone:</span>
                    <span className="al-contact-value">{formatPhoneForDisplay(address.phone)}</span>
                  </div>
                </div>
              </div>
              <div className="al-address-actions">
                <button 
                  className="al-icon-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Edit button clicked for address:", address);
                    onEditAddress(address);
                  }}
                  aria-label="Edit address"
                >
                  <Edit2 size={16} />
                </button>
                {/* Only show delete button if there's more than one address */}
                {addresses.length > 1 && (
                  <button 
                    className="al-icon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteAddress(address._id || address.id);
                    }}
                    aria-label="Delete address"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddressesList;