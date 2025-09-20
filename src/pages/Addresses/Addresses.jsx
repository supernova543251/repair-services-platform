import React, { useState } from 'react';
import { MapPin, Plus, Edit, Trash2, Star, Home, Building, Navigation } from 'lucide-react';
import './Addresses.css';

function Addresses() {
  // Sample initial addresses data
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "+1 (555) 123-4567",
      address: "123 Main Street, Apt 4B",
      city: "San Francisco",
      state: "CA",
      pincode: "94103",
      isDefault: true,
      type: "home"
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "+1 (555) 987-6543",
      address: "456 Oak Avenue, Suite 200",
      city: "San Jose",
      state: "CA",
      pincode: "95123",
      isDefault: false,
      type: "work"
    },
    {
      id: 3,
      name: "John Doe",
      phone: "+1 (555) 246-8101",
      address: "789 Beach Boulevard",
      city: "Santa Cruz",
      state: "CA",
      pincode: "95060",
      isDefault: false,
      type: "other"
    }
  ]);

  // Function to handle address deletion
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddresses(addresses.filter(address => address.id !== id));
    }
  };

  // Function to set default address
  const setDefaultAddress = (id) => {
    setAddresses(addresses.map(address => ({
      ...address,
      isDefault: address.id === id
    })));
  };

  // Function to get address type icon
  const getAddressTypeIcon = (type) => {
    switch(type) {
      case "home": return <Home size={16} />;
      case "work": return <Building size={16} />;
      default: return <Navigation size={16} />;
    }
  };

  return (
    <div className="did-addresses-container">
      <div className="did-addresses-header">
        <div className="did-header-content">
          <div className="did-header-title">
            <MapPin size={32} className="did-map-pin-icon" />
            <h1>My Addresses</h1>
          </div>
          <p className="did-header-subtitle">Manage your delivery and pickup locations</p>
        </div>
        <button className="did-add-address-btn">
          <Plus size={20} />
          Add New Address
        </button>
      </div>

      <div className="did-addresses-content">
        {addresses.length > 0 ? (
          <div className="did-addresses-grid">
            {addresses.map(address => (
              <div key={address.id} className={`did-address-card ${address.isDefault ? 'did-default-address' : ''}`}>
                <div className="did-address-card-header">
                  <div className="did-address-type">
                    {getAddressTypeIcon(address.type)}
                    <span>{address.type.charAt(0).toUpperCase() + address.type.slice(1)}</span>
                  </div>
                  {address.isDefault ? (
                    <div className="did-default-badge">
                      <Star size={14} fill="currentColor" />
                      Default
                    </div>
                  ) : null}
                </div>
                
                <div className="did-address-details">
                  <h3 className="did-address-name">{address.name}</h3>
                  <p className="did-address-phone">{address.phone}</p>
                  <p className="did-address-street">{address.address}</p>
                  <p className="did-address-city">{address.city}, {address.state} {address.pincode}</p>
                </div>
                
                <div className="did-address-actions">
                  <div className="did-action-buttons">
                    <button 
                      className="did-action-btn did-edit-address-btn"
                      aria-label="Edit address"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      className="did-action-btn did-delete-address-btn"
                      onClick={() => handleDelete(address.id)}
                      aria-label="Delete address"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  {!address.isDefault && (
                    <button 
                      className="did-set-default-btn"
                      onClick={() => setDefaultAddress(address.id)}
                    >
                      <Star size={16} />
                      Set as Default
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="did-empty-state">
            <div className="did-empty-icon">
              <MapPin size={64} />
            </div>
            <h2>No addresses saved yet</h2>
            <p>Add your first address to get started with DID Online services</p>
            <button className="did-add-first-address-btn">
              <Plus size={20} />
              Add Your First Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Addresses;