import React, { useState } from 'react';
import './AccountAndPrivacy.css';
import { Shield, Mail, Phone, User, Lock, Bell, Share2, Trash2, Eye, EyeOff, Check, X, AlertCircle, ChevronRight, LogOut, Key, Database } from 'lucide-react';

function AccountAndPrivacy() {
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
    alert('Settings saved successfully!');
  };

  const handleDeleteAccount = () => {
    if (showDeleteConfirm) {
      // Actually delete the account
      alert('Account deletion process initiated.');
    } else {
      setShowDeleteConfirm(true);
    }
  };

  return (
    <div className="did-account-privacy-container">
      <div className="did-account-header">
        <div className="did-header-content">
          <Shield size={32} className="did-shield-icon" />
          <h1>Account & Privacy</h1>
          <p>Manage your personal information and privacy settings</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="did-account-form">
        {/* Personal Details Section */}
        <section className="did-form-section">
          <h2 className="did-section-title">
            <User size={20} />
            Personal Details
          </h2>
          <div className="did-input-group">
            <label htmlFor="did-name" className="did-input-label">
              <User size={18} />
              Full Name
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
              Email Address
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
              Phone Number
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
            Change Password
          </h2>
          <div className="did-input-group did-password-input">
            <label htmlFor="did-currentPassword" className="did-input-label">
              <Lock size={18} />
              Current Password
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
              New Password
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
              Confirm New Password
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
            Privacy Preferences
          </h2>
          
          <div className="did-toggle-group">
            <div className="did-toggle-item">
              <div className="did-toggle-info">
                <Share2 size={20} />
                <div>
                  <h3>Data Sharing</h3>
                  <p>Allow us to share your data with trusted repair partners</p>
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
                  <h3>Notifications</h3>
                  <p>Receive updates about your repair status</p>
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
                  <h3>Marketing Consent</h3>
                  <p>Receive promotional offers and discounts</p>
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
            Security Options
          </h2>
          
          <div className="did-security-options">
            <div className="did-security-item">
              <div className="did-security-content">
                <div>
                  <h3>Login Activity</h3>
                  <p>Last login: Today at 2:30 PM from Chrome on Windows</p>
                </div>
                <ChevronRight size={20} className="did-chevron-icon" />
              </div>
              <button className="did-view-activity-btn">View All Activity</button>
            </div>
            
            <div className="did-security-item">
              <div className="did-two-factor">
                <div>
                  <h3>Two-Factor Authentication</h3>
                  <p>Add an extra layer of security to your account</p>
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
                  <p>Scan the QR code with your authenticator app</p>
                  <div className="did-qr-placeholder">
                    <div className="did-qr-code">QR Code Placeholder</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Form Actions */}
        <div className="did-form-actions">
          <button type="submit" className="did-save-btn">Save Changes</button>
        </div>
      </form>

      {/* Delete Account Section */}
      <section className="did-delete-section">
        <h2 className="did-delete-title">Danger Zone</h2>
        <div className="did-delete-content">
          <div className="did-delete-warning">
            <AlertCircle size={24} className="did-warning-icon" />
            <div>
              <h3>Delete Account</h3>
              <p>Once you delete your account, there is no going back. Please be certain.</p>
            </div>
          </div>
          
          {showDeleteConfirm ? (
            <div className="did-delete-confirm">
              <p>Are you sure you want to delete your account? This action cannot be undone.</p>
              <div className="did-confirm-buttons">
                <button 
                  className="did-confirm-delete-btn"
                  onClick={handleDeleteAccount}
                >
                  Yes, Delete My Account
                </button>
                <button 
                  className="did-cancel-delete-btn"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button 
              className="did-delete-btn"
              onClick={handleDeleteAccount}
            >
              <Trash2 size={18} />
              Delete Account
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default AccountAndPrivacy;