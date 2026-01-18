import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileAndSettings.css";
import { useLogin } from "../../Context/LoginContext/LoginContext";
import {
  Languages,
  ShoppingBag,
  User,
  MapPin,
  HelpCircle,
  Info,
  LogOut,
  X,
  ChevronDown
} from "lucide-react";

// Translation data
const translations = {
  en: {
    language: "Language",
    yourOrders: "Your Orders",
    accountPrivacy: "Account & Privacy",
    addresses: "Addresses",
    helpSupport: "Help & Support",
    aboutUs: "About Us",
    logout: "Logout",
    welcome: "Welcome",
    userPhone: "+91 XXXXX XXXXX"
  },
  hi: {
    language: "भाषा",
    yourOrders: "आपके ऑर्डर",
    accountPrivacy: "खाता और गोपनीयता",
    addresses: "पते",
    helpSupport: "सहायता और समर्थन",
    aboutUs: "हमारे बारे में",
    logout: "लॉग आउट",
    welcome: "स्वागत",
    userPhone: "+91 XXXXX XXXXX"
  },
  mr: {
    language: "भाषा",
    yourOrders: "तुमच्या ऑर्डर",
    accountPrivacy: "खाते आणि गोपनीयता",
    addresses: "पत्ते",
    helpSupport: "मदत आणि समर्थन",
    aboutUs: "आमची माहिती",
    logout: "लॉग आउट",
    welcome: "स्वागत आहे",
    userPhone: "+91 XXXXX XXXXX"
  }
};

// Function to detect system language
const detectSystemLanguage = () => {
  const browserLang = navigator.language || navigator.userLanguage;
  
  if (browserLang.startsWith('hi') || browserLang.startsWith('hi-IN')) {
    return 'hi';
  }
  
  if (browserLang.startsWith('mr') || browserLang.startsWith('mr-IN')) {
    return 'mr';
  }
  
  return 'en';
};

function ProfileAndSettings({ onClose, onLogout }) {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  const { userData } = useLogin();
  
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    
    if (savedLanguage && translations[savedLanguage]) {
      return savedLanguage;
    }
    
    const systemLanguage = detectSystemLanguage();
    localStorage.setItem('preferredLanguage', systemLanguage);
    return systemLanguage;
  });
  
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = selectedLanguage;
  }, [selectedLanguage]);

  // Simple logout function that calls parent's logout
  const handleLogout = () => {
    console.log('Logout clicked in ProfileAndSettings'); // Debug log
    if (onLogout) {
      onLogout();
    } else {
      // Fallback if no onLogout prop provided
      onClose();
    }
  };

  const handleMenuItemClick = (itemId) => {
    onClose();
    
    setTimeout(() => {
      switch(itemId) {
        case 2:
          navigate("/your-orders");
          break;
        case 3:
          navigate("/account-privacy");
          break;
        case 4:
          navigate("/addresses");
          break;
        case 5:
          navigate("/help-support");
          break;
        case 6:
          navigate("/about-us");
          break;
        default:
          break;
      }
    }, 100);
  };

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' }
  ];

  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
    setIsLanguageDropdownOpen(false);
    localStorage.setItem('preferredLanguage', languageCode);
    
    // Set session flag that we're doing a language change refresh
    sessionStorage.setItem('languageChange', 'true');
    
    window.dispatchEvent(new CustomEvent('languageChanged'));
    
    // Refresh the website to apply language changes to all components
    window.location.reload();
  };

  const menuItems = [
    { 
      id: 1, 
      label: translations[selectedLanguage].language, 
      icon: <Languages size={20} />,
      customElement: (
        <div className="profile-settings-language-dropdown">
          <button 
            className="profile-settings-dropdown-toggle"
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            aria-expanded={isLanguageDropdownOpen}
            aria-haspopup="true"
          >
            {languages.find(lang => lang.code === selectedLanguage)?.nativeName}
            <ChevronDown size={16} className={isLanguageDropdownOpen ? "profile-settings-rotate" : ""} />
          </button>
          {isLanguageDropdownOpen && (
            <div className="profile-settings-dropdown-menu" role="menu">
              {languages.map(lang => (
                <div 
                  key={lang.code} 
                  className={`profile-settings-dropdown-item ${selectedLanguage === lang.code ? 'profile-settings-selected' : ''}`}
                  onClick={() => handleLanguageChange(lang.code)}
                  role="menuitem"
                  aria-selected={selectedLanguage === lang.code}
                >
                  {lang.nativeName}
                </div>
              ))}
            </div>
          )}
        </div>
      )
    },
    { id: 2, label: translations[selectedLanguage].yourOrders, icon: <ShoppingBag size={20} /> },
    { id: 3, label: translations[selectedLanguage].accountPrivacy, icon: <User size={20} /> },
    { id: 4, label: translations[selectedLanguage].addresses, icon: <MapPin size={20} /> },
    { id: 5, label: translations[selectedLanguage].helpSupport, icon: <HelpCircle size={20} /> },
    { id: 6, label: translations[selectedLanguage].aboutUs, icon: <Info size={20} /> },
  ];

  return (
    <div className="profile-overlay">
      <div className={`profile-container ${isMobile ? "mobile" : "sidebar"}`}>
        <button className="close-btn" onClick={onClose} aria-label="Close settings">
          <X size={20} />
        </button>

        <div className="profile-header">
          <div className="avatar">
            {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
          </div>
          <h2>{userData?.name || translations[selectedLanguage].welcome}</h2>
          <p className="user-phone">{userData?.phone || translations[selectedLanguage].userPhone}</p>
        </div>

        <div className="profile-menu">
          {menuItems.map((item) => (
            <div 
              key={item.id} 
              className={`menu-item ${item.id > 1 ? 'clickable' : ''}`}
              onClick={() => item.id > 1 && handleMenuItemClick(item.id)}
            >
              <div className="menu-item-left">
                <div className="menu-icon">{item.icon}</div>
                <span className="menu-label">{item.label}</span>
              </div>
              {item.customElement}
            </div>
          ))}
        </div>

        <div className="logout-section">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>{translations[selectedLanguage].logout}</span>
          </button>
        </div>
      </div>
      <div className="profile-backdrop" onClick={onClose}></div>
    </div>
  );
}

export default ProfileAndSettings;