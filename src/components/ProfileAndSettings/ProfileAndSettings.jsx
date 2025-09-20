import React, { useState } from "react";
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

function ProfileAndSettings({ onClose }) {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  const { userData, logout } = useLogin();
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleMenuItemClick = (itemId) => {
    onClose(); // Close the overlay first
    
    // Add a small delay to allow the overlay to close before navigation
    setTimeout(() => {
      switch(itemId) {
        case 2: // Your Orders
          navigate("/your-orders");
          break;
        case 3: // Account & Privacy
          navigate("/account-privacy");
          break;
        case 4: // Addresses
          navigate("/addresses");
          break;
        case 5: // Help & Support
          navigate("/help-support");
          break;
        case 6: // About Us
          navigate("/about-us");
          break;
        default:
          // For language, do nothing
          break;
      }
    }, 100);
  };

  const languages = ["English", "मराठी", "हिंदी"];

  const menuItems = [
    { 
      id: 1, 
      label: "Language", 
      icon: <Languages size={20} />,
      customElement: (
        <div className="profile-settings-language-dropdown">
          <button 
            className="profile-settings-dropdown-toggle"
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
          >
            {selectedLanguage}
            <ChevronDown size={16} className={isLanguageDropdownOpen ? "profile-settings-rotate" : ""} />
          </button>
          {isLanguageDropdownOpen && (
            <div className="profile-settings-dropdown-menu">
              {languages.map(lang => (
                <div 
                  key={lang} 
                  className={`profile-settings-dropdown-item ${selectedLanguage === lang ? 'profile-settings-selected' : ''}`}
                  onClick={() => {
                    setSelectedLanguage(lang);
                    setIsLanguageDropdownOpen(false);
                  }}
                >
                  {lang}
                </div>
              ))}
            </div>
          )}
        </div>
      )
    },
    { id: 2, label: "Your Orders", icon: <ShoppingBag size={20} /> },
    { id: 3, label: "Account & Privacy", icon: <User size={20} /> },
    { id: 4, label: "Addresses", icon: <MapPin size={20} /> },
    { id: 5, label: "Help & Support", icon: <HelpCircle size={20} /> },
    { id: 6, label: "About Us", icon: <Info size={20} /> },
  ];

  return (
    <div className="profile-overlay">
      <div className={`profile-container ${isMobile ? "mobile" : "sidebar"}`}>
        {/* Close button */}
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="profile-header">
          <div className="avatar">
            {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
          </div>
          <h2>{userData?.name || "User Name"}</h2>
          <p className="user-phone">{userData?.phone || "+91 XXXXX XXXXX"}</p>
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
            <span>Logout</span>
          </button>
        </div>

        {/* Test info - only visible during development */}
        {process.env.NODE_ENV === "development" && (
          <div className="test-info">
            <p>
              <strong>Test Mode:</strong> Use the settings icon in navbar to
              toggle login state
            </p>
          </div>
        )}
      </div>
      <div className="profile-backdrop" onClick={onClose}></div>
    </div>
  );
}

export default ProfileAndSettings;