import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountAndPrivacy.css';
import { Shield, Phone, User, Trash2, Check, AlertCircle } from 'lucide-react';
import { useLogin } from '../../Context/LoginContext/LoginContext';
import { authService } from '../../services/auth';

// Translation data
const accountTranslations = {
  en: {
    title: "Account & Privacy",
    subtitle: "Manage your personal information and privacy settings",
    personalDetails: "Personal Details",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    saveChanges: "Save Changes",
    saving: "Saving...",
    dangerZone: "Danger Zone",
    deleteAccount: "Delete Account",
    deleteWarning: "Once you delete your account, there is no going back. Please be certain.",
    deleteConfirm: "Are you sure you want to delete your account? This action cannot be undone.",
    confirmDelete: "Yes, Delete My Account",
    cancelDelete: "Cancel",
    successMessage: "Settings saved successfully!",
    deleteInitiated: "Account deletion process initiated.",
    errorMessage: "Failed to save settings. Please try again.",
    profileUpdated: "Profile updated successfully!"
  },
  hi: {
    title: "खाता और गोपनीयता",
    subtitle: "अपनी व्यक्तिगत जानकारी और गोपनीयता सेटिंग्स प्रबंधित करें",
    personalDetails: "व्यक्तिगत विवरण",
    fullName: "पूरा नाम",
    phoneNumber: "फ़ोन नंबर",
    saveChanges: "परिवर्तन सहेजें",
    saving: "सहेजा जा रहा है...",
    dangerZone: "खतरा क्षेत्र",
    deleteAccount: "खाता हटाएं",
    deleteWarning: "एक बार जब आप अपना खाता हटा देते हैं, तो वापसी का कोई रास्ता नहीं है। कृपया निश्चित रहें।",
    deleteConfirm: "क्या आप वाकई अपना खाता हटाना चाहते हैं? इस क्रिया को पूर्ववत नहीं किया जा सकता।",
    confirmDelete: "हां, मेरा खाता हटाएं",
    cancelDelete: "रद्द करें",
    successMessage: "सेटिंग्स सफलतापूर्वक सहेजी गईं!",
    deleteInitiated: "खाता हटाने की प्रक्रिया शुरू की गई।",
    errorMessage: "सेटिंग्स सहेजने में विफल। कृपया पुनः प्रयास करें।",
    profileUpdated: "प्रोफाइल सफलतापूर्वक अपडेट की गई!"
  },
  mr: {
    title: "खाते आणि गोपनीयता",
    subtitle: "तुमची वैयक्तिक माहिती आणि गोपनीयता सेटिंग्ज व्यवस्थापित करा",
    personalDetails: "वैयक्तिक तपशील",
    fullName: "पूर्ण नाव",
    phoneNumber: "फोन नंबर",
    saveChanges: "बदल जतन करा",
    saving: "जतन केले जात आहे...",
    dangerZone: "धोका क्षेत्र",
    deleteAccount: "खाते हटवा",
    deleteWarning: "एकदा तुम्ही तुमचे खाते हटवल्यानंतर, परत येण्याचा मार्ग नाही. कृपया निश्चित व्हा.",
    deleteConfirm: "तुम्हाला खात्री आहे की तुम्ही तुमचे खाते हटवू इच्छिता? या क्रियेची पूर्ववत करता येणार नाही.",
    confirmDelete: "होय, माझे खाते हटवा",
    cancelDelete: "रद्द करा",
    successMessage: "सेटिंग्ज यशस्वीरित्या जतन केल्या!",
    deleteInitiated: "खाते हटवण्याची प्रक्रिया सुरू केली.",
    errorMessage: "सेटिंग्ज जतन करण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.",
    profileUpdated: "प्रोफाइल यशस्वीरित्या अपडेट केली!"
  }
};

// Skeleton Loader Component
const SkeletonLoader = () => {
  return (
    <div className="did-account-skeleton-container">
      {/* Header Skeleton */}
      <div className="did-skeleton-header">
        <div className="skeleton skeleton-shield-icon"></div>
        <div className="skeleton-text-group">
          <div className="skeleton skeleton-main-title"></div>
          <div className="skeleton skeleton-subtitle"></div>
        </div>
      </div>

      {/* Personal Details Section Skeleton */}
      <div className="did-skeleton-section">
        <div className="skeleton skeleton-section-title"></div>
        <div className="did-skeleton-input-group">
          <div className="skeleton skeleton-input-label"></div>
          <div className="skeleton skeleton-text-input"></div>
        </div>
        <div className="did-skeleton-input-group">
          <div className="skeleton skeleton-input-label"></div>
          <div className="skeleton skeleton-text-input"></div>
        </div>
      </div>

      {/* Danger Zone Section Skeleton */}
      <div className="did-skeleton-section">
        <div className="skeleton skeleton-section-title-danger"></div>
        <div className="did-skeleton-warning">
          <div className="skeleton skeleton-warning-icon"></div>
          <div className="skeleton-warning-text">
            <div className="skeleton skeleton-warning-title"></div>
            <div className="skeleton skeleton-warning-desc"></div>
          </div>
        </div>
        <div className="skeleton skeleton-delete-btn"></div>
      </div>

      {/* Save Button Skeleton */}
      <div className="did-skeleton-save-section">
        <div className="skeleton skeleton-save-btn"></div>
      </div>
    </div>
  );
};

function AccountAndPrivacy() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const { userData, updateProfile } = useLogin();
  const navigate = useNavigate();
  const [showSkeleton, setShowSkeleton] = useState(true);
  const MINIMUM_LOADING_TIME = 1500; // 1.5 seconds minimum loading time
  
  // Get language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && accountTranslations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
    
    // Listen for language changes
    const handleLanguageChange = () => {
      const lang = localStorage.getItem('preferredLanguage');
      if (lang && accountTranslations[lang]) {
        setCurrentLanguage(lang);
      }
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    
    // Simulate loading
    setTimeout(() => {
      setShowSkeleton(false);
    }, MINIMUM_LOADING_TIME);
    
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  // State for user data
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });

  // State for delete account confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Load user data when component mounts
  useEffect(() => {
    if (userData && !showSkeleton) {
      setFormData({
        name: userData.name || '',
        phone: userData.phone || ''
      });
    }
  }, [userData, showSkeleton]);

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Update profile information
      const profileResponse = await updateProfile({
        name: formData.name
      });

      if (profileResponse.success) {
        showMessage('success', accountTranslations[currentLanguage].profileUpdated);
      } else {
        showMessage('error', profileResponse.message || accountTranslations[currentLanguage].errorMessage);
      }

    } catch (error) {
      showMessage('error', error.message || accountTranslations[currentLanguage].errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    if (showDeleteConfirm) {
      // Actually delete the account
      showMessage('info', accountTranslations[currentLanguage].deleteInitiated);
      // In a real app, you would call an API to delete the account
      setTimeout(() => {
        authService.logout();
        navigate('/');
      }, 2000);
    } else {
      setShowDeleteConfirm(true);
    }
  };

  if (showSkeleton) {
    return <SkeletonLoader />;
  }

  return (
    <div className="did-account-privacy-container">
      <div className="did-account-header">
        <div className="did-header-content">
          <Shield size={32} className="did-shield-icon" />
          <h1 className="multilingual-text">{accountTranslations[currentLanguage].title}</h1>
          <p className="multilingual-text">{accountTranslations[currentLanguage].subtitle}</p>
        </div>
      </div>

      {/* Message Display */}
      {message.text && (
        <div className={`did-message ${message.type}`}>
          {message.type === 'success' && <Check size={18} />}
          {message.type === 'error' && <AlertCircle size={18} />}
          {message.type === 'info' && <AlertCircle size={18} />}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="did-account-form">
        {/* Personal Details Section - ONLY THIS SECTION REMAINS */}
        <section className="did-form-section">
          <h2 className="did-section-title">
            <User size={20} />
            <span className="multilingual-text">{accountTranslations[currentLanguage].personalDetails}</span>
          </h2>
          <div className="did-input-group">
            <label htmlFor="did-name" className="did-input-label">
              <User size={18} />
              <span className="multilingual-text">{accountTranslations[currentLanguage].fullName}</span>
            </label>
            <input
              type="text"
              id="did-name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="did-text-input"
              placeholder={accountTranslations[currentLanguage].fullName}
            />
          </div>

          <div className="did-input-group">
            <label htmlFor="did-phone" className="did-input-label">
              <Phone size={18} />
              <span className="multilingual-text">{accountTranslations[currentLanguage].phoneNumber}</span>
            </label>
            <input
              type="tel"
              id="did-phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="did-text-input"
              placeholder={accountTranslations[currentLanguage].phoneNumber}
              readOnly // Phone is read-only in OTP-based system
            />
          </div>
        </section>

        {/* Form Actions */}
        <div className="did-form-actions">
          <button 
            type="submit" 
            className="did-save-btn multilingual-text"
            disabled={isLoading}
          >
            {isLoading ? accountTranslations[currentLanguage].saving : accountTranslations[currentLanguage].saveChanges}
          </button>
        </div>
      </form>

      {/* Delete Account Section */}
      <section className="did-delete-section">
        <h2 className="did-delete-title multilingual-text">{accountTranslations[currentLanguage].dangerZone}</h2>
        <div className="did-delete-content">
          <div className="did-delete-warning">
            <AlertCircle size={24} className="did-warning-icon" />
            <div>
              <h3 className="multilingual-text">{accountTranslations[currentLanguage].deleteAccount}</h3>
              <p className="multilingual-text">{accountTranslations[currentLanguage].deleteWarning}</p>
            </div>
          </div>
          
          {showDeleteConfirm ? (
            <div className="did-delete-confirm">
              <p className="multilingual-text">{accountTranslations[currentLanguage].deleteConfirm}</p>
              <div className="did-confirm-buttons">
                <button 
                  className="did-confirm-delete-btn multilingual-text"
                  onClick={handleDeleteAccount}
                >
                  {accountTranslations[currentLanguage].confirmDelete}
                </button>
                <button 
                  className="did-cancel-delete-btn multilingual-text"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  {accountTranslations[currentLanguage].cancelDelete}
                </button>
              </div>
            </div>
          ) : (
            <button 
              className="did-delete-btn"
              onClick={handleDeleteAccount}
              type="button"
            >
              <Trash2 size={18} />
              <span className="multilingual-text">{accountTranslations[currentLanguage].deleteAccount}</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default AccountAndPrivacy;