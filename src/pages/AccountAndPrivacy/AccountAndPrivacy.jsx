import React, { useState, useEffect } from 'react';
import './AccountAndPrivacy.css';
import { Shield, Mail, Phone, User, Lock, Bell, Share2, Trash2, Eye, EyeOff, Check, X, AlertCircle, ChevronRight, LogOut, Key, Database } from 'lucide-react';

// Translation data
const accountTranslations = {
  en: {
    title: "Account & Privacy",
    subtitle: "Manage your personal information and privacy settings",
    personalDetails: "Personal Details",
    fullName: "Full Name",
    emailAddress: "Email Address",
    phoneNumber: "Phone Number",
    changePassword: "Change Password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm New Password",
    privacyPreferences: "Privacy Preferences",
    dataSharing: "Data Sharing",
    dataSharingDesc: "Allow us to share your data with trusted repair partners",
    notifications: "Notifications",
    notificationsDesc: "Receive updates about your repair status",
    marketingConsent: "Marketing Consent",
    marketingConsentDesc: "Receive promotional offers and discounts",
    securityOptions: "Security Options",
    loginActivity: "Login Activity",
    lastLogin: "Last login: Today at 2:30 PM from Chrome on Windows",
    viewAllActivity: "View All Activity",
    twoFactorAuth: "Two-Factor Authentication",
    twoFactorAuthDesc: "Add an extra layer of security to your account",
    qrInstructions: "Scan the QR code with your authenticator app",
    qrPlaceholder: "QR Code Placeholder",
    saveChanges: "Save Changes",
    dangerZone: "Danger Zone",
    deleteAccount: "Delete Account",
    deleteWarning: "Once you delete your account, there is no going back. Please be certain.",
    deleteConfirm: "Are you sure you want to delete your account? This action cannot be undone.",
    confirmDelete: "Yes, Delete My Account",
    cancelDelete: "Cancel",
    successMessage: "Settings saved successfully!",
    deleteInitiated: "Account deletion process initiated."
  },
  hi: {
    title: "खाता और गोपनीयता",
    subtitle: "अपनी व्यक्तिगत जानकारी और गोपनीयता सेटिंग्स प्रबंधित करें",
    personalDetails: "व्यक्तिगत विवरण",
    fullName: "पूरा नाम",
    emailAddress: "ईमेल पता",
    phoneNumber: "फ़ोन नंबर",
    changePassword: "पासवर्ड बदलें",
    currentPassword: "वर्तमान पासवर्ड",
    newPassword: "नया पासवर्ड",
    confirmPassword: "नए पासवर्ड की पुष्टि करें",
    privacyPreferences: "गोपनीयता वरीयताएँ",
    dataSharing: "डेटा साझाकरण",
    dataSharingDesc: "हमें विश्वसनीय मरम्मत भागीदारों के साथ आपका डेटा साझा करने की अनुमति दें",
    notifications: "सूचनाएं",
    notificationsDesc: "अपनी मरम्मत स्थिति के बारे में अपडेट प्राप्त करें",
    marketingConsent: "मार्केटिंग सहमति",
    marketingConsentDesc: "प्रचारक ऑफ़र और छूट प्राप्त करें",
    securityOptions: "सुरक्षा विकल्प",
    loginActivity: "लॉगिन गतिविधि",
    lastLogin: "अंतिम लॉगिन: आज दोपहर 2:30 बजे Windows पर Chrome से",
    viewAllActivity: "सभी गतिविधि देखें",
    twoFactorAuth: "दो-चरणीय प्रमाणीकरण",
    twoFactorAuthDesc: "अपने खाते में सुरक्षा की एक अतिरिक्त परत जोड़ें",
    qrInstructions: "अपने प्रमाणीकरण ऐप के साथ QR कोड स्कैन करें",
    qrPlaceholder: "QR कोड प्लेसहोल्डर",
    saveChanges: "परिवर्तन सहेजें",
    dangerZone: "खतरा क्षेत्र",
    deleteAccount: "खाता हटाएं",
    deleteWarning: "एक बार जब आप अपना खाता हटा देते हैं, तो वापसी का कोई रास्ता नहीं है। कृपया निश्चित रहें।",
    deleteConfirm: "क्या आप वाकई अपना खाता हटाना चाहते हैं? इस क्रिया को पूर्ववत नहीं किया जा सकता।",
    confirmDelete: "हां, मेरा खाता हटाएं",
    cancelDelete: "रद्द करें",
    successMessage: "सेटिंग्स सफलतापूर्वक सहेजी गईं!",
    deleteInitiated: "खाता हटाने की प्रक्रिया शुरू की गई।"
  },
  mr: {
    title: "खाते आणि गोपनीयता",
    subtitle: "तुमची वैयक्तिक माहिती आणि गोपनीयता सेटिंग्ज व्यवस्थापित करा",
    personalDetails: "वैयक्तिक तपशील",
    fullName: "पूर्ण नाव",
    emailAddress: "ईमेल पत्ता",
    phoneNumber: "फोन नंबर",
    changePassword: "पासवर्ड बदला",
    currentPassword: "सध्याचा पासवर्ड",
    newPassword: "नवीन पासवर्ड",
    confirmPassword: "नवीन पासवर्डची पुष्टी करा",
    privacyPreferences: "गोपनीयता प्राधान्ये",
    dataSharing: "डेटा शेअरिंग",
    dataSharingDesc: "विश्वासार्ह दुरुस्ती भागीदारांसोबत तुमचा डेटा शेअर करण्यास परवानगी द्या",
    notifications: "अधिसूचना",
    notificationsDesc: "तुमच्या दुरुस्ती स्थितीबद्दल अद्यतने मिळवा",
    marketingConsent: "विपणन संमती",
    marketingConsentDesc: "जाहिरात ऑफर आणि सवलती मिळवा",
    securityOptions: "सुरक्षा पर्याय",
    loginActivity: "लॉगिन क्रियाकलाप",
    lastLogin: "शेवटचे लॉगिन: आज दुपारी 2:30 वाजता Windows वर Chrome मधून",
    viewAllActivity: "सर्व क्रियाकलाप पहा",
    twoFactorAuth: "दोन-फॅक्टर प्रमाणीकरण",
    twoFactorAuthDesc: "तुमच्या खात्यात सुरक्षेचा अतिरिक्त थर जोडा",
    qrInstructions: "तुमच्या प्रमाणीकरण अॅपसह QR कोड स्कॅन करा",
    qrPlaceholder: "QR कोड प्लेसहोल्डर",
    saveChanges: "बदल जतन करा",
    dangerZone: "धोका क्षेत्र",
    deleteAccount: "खाते हटवा",
    deleteWarning: "एकदा तुम्ही तुमचे खाते हटवल्यानंतर, परत येण्याचा मार्ग नाही. कृपया निश्चित व्हा.",
    deleteConfirm: "तुम्हाला खात्री आहे की तुम्ही तुमचे खाते हटवू इच्छिता? या क्रियेची पूर्ववत करता येणार नाही.",
    confirmDelete: "होय, माझे खाते हटवा",
    cancelDelete: "रद्द करा",
    successMessage: "सेटिंग्ज यशस्वीरित्या जतन केल्या!",
    deleteInitiated: "खाते हटवण्याची प्रक्रिया सुरू केली."
  }
};

function AccountAndPrivacy() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
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
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  // State for user data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567'
  });

  // State for privacy toggles
  const [privacySettings, setPrivacySettings] = useState({
    dataSharing: false,
    notifications: true,
    marketingConsent: false
  });

  // State for password change
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // State for two-factor authentication
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // State for delete account confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handlePrivacyToggle = (setting) => {
    setPrivacySettings(prev => ({ 
      ...prev, 
      [setting]: !prev[setting] 
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert(accountTranslations[currentLanguage].successMessage);
  };

  const handleDeleteAccount = () => {
    if (showDeleteConfirm) {
      // Actually delete the account
      alert(accountTranslations[currentLanguage].deleteInitiated);
    } else {
      setShowDeleteConfirm(true);
    }
  };

  return (
    <div className="did-account-privacy-container">
      <div className="did-account-header">
        <div className="did-header-content">
          <Shield size={32} className="did-shield-icon" />
          <h1 className="multilingual-text">{accountTranslations[currentLanguage].title}</h1>
          <p className="multilingual-text">{accountTranslations[currentLanguage].subtitle}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="did-account-form">
        {/* Personal Details Section */}
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
              value={userData.name}
              onChange={handleInputChange}
              className="did-text-input"
            />
          </div>

          <div className="did-input-group">
            <label htmlFor="did-email" className="did-input-label">
              <Mail size={18} />
              <span className="multilingual-text">{accountTranslations[currentLanguage].emailAddress}</span>
            </label>
            <input
              type="email"
              id="did-email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="did-text-input"
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
              value={userData.phone}
              onChange={handleInputChange}
              className="did-text-input"
            />
          </div>
        </section>

        {/* Password Change Section */}
        <section className="did-form-section">
          <h2 className="did-section-title">
            <Key size={20} />
            <span className="multilingual-text">{accountTranslations[currentLanguage].changePassword}</span>
          </h2>
          <div className="did-input-group did-password-input">
            <label htmlFor="did-currentPassword" className="did-input-label">
              <Lock size={18} />
              <span className="multilingual-text">{accountTranslations[currentLanguage].currentPassword}</span>
            </label>
            <div className="did-password-wrapper">
              <input
                type={showPasswords.current ? "text" : "password"}
                id="did-currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="did-text-input"
              />
              <button 
                type="button" 
                className="did-password-toggle"
                onClick={() => togglePasswordVisibility('current')}
                aria-label={showPasswords.current ? "Hide password" : "Show password"}
              >
                {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="did-input-group did-password-input">
            <label htmlFor="did-newPassword" className="did-input-label">
              <Lock size={18} />
              <span className="multilingual-text">{accountTranslations[currentLanguage].newPassword}</span>
            </label>
            <div className="did-password-wrapper">
              <input
                type={showPasswords.new ? "text" : "password"}
                id="did-newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="did-text-input"
              />
              <button 
                type="button" 
                className="did-password-toggle"
                onClick={() => togglePasswordVisibility('new')}
                aria-label={showPasswords.new ? "Hide password" : "Show password"}
              >
                {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="did-input-group did-password-input">
            <label htmlFor="did-confirmPassword" className="did-input-label">
              <Lock size={18} />
              <span className="multilingual-text">{accountTranslations[currentLanguage].confirmPassword}</span>
            </label>
            <div className="did-password-wrapper">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                id="did-confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="did-text-input"
              />
              <button 
                type="button" 
                className="did-password-toggle"
                onClick={() => togglePasswordVisibility('confirm')}
                aria-label={showPasswords.confirm ? "Hide password" : "Show password"}
              >
                {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </section>

        {/* Privacy Preferences Section */}
        <section className="did-form-section">
          <h2 className="did-section-title">
            <Database size={20} />
            <span className="multilingual-text">{accountTranslations[currentLanguage].privacyPreferences}</span>
          </h2>
          
          <div className="did-toggle-group">
            <div className="did-toggle-item">
              <div className="did-toggle-info">
                <Share2 size={20} />
                <div>
                  <h3 className="multilingual-text">{accountTranslations[currentLanguage].dataSharing}</h3>
                  <p className="multilingual-text">{accountTranslations[currentLanguage].dataSharingDesc}</p>
                </div>
              </div>
              <label className="did-switch">
                <input 
                  type="checkbox" 
                  checked={privacySettings.dataSharing}
                  onChange={() => handlePrivacyToggle('dataSharing')}
                />
                <span className="did-slider"></span>
              </label>
            </div>

            <div className="did-toggle-item">
              <div className="did-toggle-info">
                <Bell size={20} />
                <div>
                  <h3 className="multilingual-text">{accountTranslations[currentLanguage].notifications}</h3>
                  <p className="multilingual-text">{accountTranslations[currentLanguage].notificationsDesc}</p>
                </div>
              </div>
              <label className="did-switch">
                <input 
                  type="checkbox" 
                  checked={privacySettings.notifications}
                  onChange={() => handlePrivacyToggle('notifications')}
                />
                <span className="did-slider"></span>
              </label>
            </div>

            <div className="did-toggle-item">
              <div className="did-toggle-info">
                <Mail size={20} />
                <div>
                  <h3 className="multilingual-text">{accountTranslations[currentLanguage].marketingConsent}</h3>
                  <p className="multilingual-text">{accountTranslations[currentLanguage].marketingConsentDesc}</p>
                </div>
              </div>
              <label className="did-switch">
                <input 
                  type="checkbox" 
                  checked={privacySettings.marketingConsent}
                  onChange={() => handlePrivacyToggle('marketingConsent')}
                />
                <span className="did-slider"></span>
              </label>
            </div>
          </div>
        </section>

        {/* Security Options Section */}
        <section className="did-form-section">
          <h2 className="did-section-title">
            <Shield size={20} />
            <span className="multilingual-text">{accountTranslations[currentLanguage].securityOptions}</span>
          </h2>
          
          <div className="did-security-options">
            <div className="did-security-item">
              <div className="did-security-content">
                <div>
                  <h3 className="multilingual-text">{accountTranslations[currentLanguage].loginActivity}</h3>
                  <p className="multilingual-text">{accountTranslations[currentLanguage].lastLogin}</p>
                </div>
                <ChevronRight size={20} className="did-chevron-icon" />
              </div>
              <button className="did-view-activity-btn multilingual-text">
                {accountTranslations[currentLanguage].viewAllActivity}
              </button>
            </div>
            
            <div className="did-security-item">
              <div className="did-two-factor">
                <div>
                  <h3 className="multilingual-text">{accountTranslations[currentLanguage].twoFactorAuth}</h3>
                  <p className="multilingual-text">{accountTranslations[currentLanguage].twoFactorAuthDesc}</p>
                </div>
                <label className="did-switch">
                  <input 
                    type="checkbox" 
                    checked={twoFactorEnabled}
                    onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  />
                  <span className="did-slider"></span>
                </label>
              </div>
              {twoFactorEnabled && (
                <div className="did-two-factor-setup">
                  <p className="multilingual-text">{accountTranslations[currentLanguage].qrInstructions}</p>
                  <div className="did-qr-placeholder">
                    <div className="did-qr-code multilingual-text">{accountTranslations[currentLanguage].qrPlaceholder}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Form Actions */}
        <div className="did-form-actions">
          <button type="submit" className="did-save-btn multilingual-text">
            {accountTranslations[currentLanguage].saveChanges}
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