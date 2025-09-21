import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Edit, Trash2, Star, Home, Building, Navigation } from 'lucide-react';
import './Addresses.css';

// Translation data
const addressesTranslations = {
  en: {
    title: "My Addresses",
    subtitle: "Manage your delivery and pickup locations",
    addAddress: "Add New Address",
    home: "Home",
    work: "Work",
    other: "Other",
    default: "Default",
    setDefault: "Set as Default",
    edit: "Edit address",
    delete: "Delete address",
    deleteConfirm: "Are you sure you want to delete this address?",
    emptyTitle: "No addresses saved yet",
    emptySubtitle: "Add your first address to get started with services",
    addFirstAddress: "Add Your First Address"
  },
  hi: {
    title: "मेरे पते",
    subtitle: "अपने डिलीवरी और पिकअप स्थानों को प्रबंधित करें",
    addAddress: "नया पता जोड़ें",
    home: "घर",
    work: "कार्य",
    other: "अन्य",
    default: "डिफ़ॉल्ट",
    setDefault: "डिफ़ॉल्ट के रूप में सेट करें",
    edit: "पता संपादित करें",
    delete: "पता हटाएं",
    deleteConfirm: "क्या आप वाकई इस पते को हटाना चाहते हैं?",
    emptyTitle: "अभी तक कोई पते सहेजे नहीं गए हैं",
    emptySubtitle: "सेवाओं का उपयोग शुरू करने के लिए अपना पहला पता जोड़ें",
    addFirstAddress: "अपना पहला पता जोड़ें"
  },
  mr: {
    title: "माझे पत्ते",
    subtitle: "तुमची डिलिवरी आणि पिकअप लोकेशन्स व्यवस्थापित करा",
    addAddress: "नवीन पत्ता जोडा",
    home: "घर",
    work: "काम",
    other: "इतर",
    default: "डीफॉल्ट",
    setDefault: "डीफॉल्ट म्हणून सेट करा",
    edit: "पत्ता संपादित करा",
    delete: "पत्ता हटवा",
    deleteConfirm: "तुम्हाला खात्री आहे की तुम्ही हा पत्ता हटवू इच्छिता?",
    emptyTitle: "अद्याप कोणतेही पत्ते जतन केलेले नाहीत",
    emptySubtitle: "सेवा सुरू करण्यासाठी तुमचा पहिला पत्ता जोडा",
    addFirstAddress: "तुमचा पहिला पत्ता जोडा"
  }
};

function Addresses() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  // Get language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && addressesTranslations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
    
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
    if (window.confirm(addressesTranslations[currentLanguage].deleteConfirm)) {
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

  // Function to get translated address type
  const getTranslatedAddressType = (type) => {
    switch(type) {
      case "home": return addressesTranslations[currentLanguage].home;
      case "work": return addressesTranslations[currentLanguage].work;
      default: return addressesTranslations[currentLanguage].other;
    }
  };

  return (
    <div className="did-addresses-container">
      <div className="did-addresses-header">
        <div className="did-header-content">
          <div className="did-header-title">
            <MapPin size={32} className="did-map-pin-icon" />
            <h1 className="multilingual-text">{addressesTranslations[currentLanguage].title}</h1>
          </div>
          <p className="did-header-subtitle multilingual-text">{addressesTranslations[currentLanguage].subtitle}</p>
        </div>
        <button className="did-add-address-btn">
          <Plus size={20} />
          <span className="multilingual-text">{addressesTranslations[currentLanguage].addAddress}</span>
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
                    <span className="multilingual-text">{getTranslatedAddressType(address.type)}</span>
                  </div>
                  {address.isDefault ? (
                    <div className="did-default-badge">
                      <Star size={14} fill="currentColor" />
                      <span className="multilingual-text">{addressesTranslations[currentLanguage].default}</span>
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
                      aria-label={addressesTranslations[currentLanguage].edit}
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      className="did-action-btn did-delete-address-btn"
                      onClick={() => handleDelete(address.id)}
                      aria-label={addressesTranslations[currentLanguage].delete}
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
                      <span className="multilingual-text">{addressesTranslations[currentLanguage].setDefault}</span>
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
            <h2 className="multilingual-text">{addressesTranslations[currentLanguage].emptyTitle}</h2>
            <p className="multilingual-text">{addressesTranslations[currentLanguage].emptySubtitle}</p>
            <button className="did-add-first-address-btn">
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