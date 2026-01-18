import React, { useState, useEffect } from "react";
import { X, Home, Briefcase, Building } from "lucide-react";
import "./AddressForm.css";
import { addressService } from "../../services/address.js";

const AddressForm = ({ onClose, onAddressAdded, editAddress = null }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address_line: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    type: "home",
    isDefault: false
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Load address data when in edit mode
  useEffect(() => {
    if (editAddress) {
      console.log("Loading edit address data:", editAddress);
      // Format phone number by removing +91 prefix for display
      const displayPhone = editAddress.phone ? editAddress.phone.replace('+91', '') : '';
      
      setFormData({
        name: editAddress.name || "",
        phone: displayPhone,
        address_line: editAddress.address_line || "",
        landmark: editAddress.landmark || "",
        city: editAddress.city || "",
        state: editAddress.state || "",
        pincode: editAddress.pincode || "",
        type: editAddress.type || "home",
        isDefault: editAddress.isDefault || false
      });
    } else {
      // Reset form for new address
      setFormData({
        name: "",
        phone: "",
        address_line: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        type: "home",
        isDefault: false
      });
    }
  }, [editAddress]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Format phone number input (digits only)
    if (name === 'phone') {
      const formattedValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ["name", "phone", "address_line", "city", "state", "pincode"];

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].toString().trim() === "") {
        newErrors[field] = "This field is required";
      }
    });

    // Name validation
    if (formData.name && formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    // Phone validation
    if (formData.phone && !/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit Indian phone number";
    }

    // Pincode validation
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const addressData = {
        name: formData.name.trim(),
        phone: formData.phone,
        address_line: formData.address_line.trim(),
        landmark: formData.landmark.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        type: formData.type,
        isDefault: formData.isDefault
      };

      let response;
      if (editAddress && editAddress._id) {
        // Update existing address
        response = await addressService.updateAddress(editAddress._id, addressData);
      } else {
        // Add new address
        response = await addressService.addAddress(addressData);
      }
      
      if (response.success) {
        if (onAddressAdded) {
          onAddressAdded(response.data);
        }
        onClose();
      }
    } catch (error) {
      console.error('Error saving address:', error);
      alert(error.message || `Failed to ${editAddress ? 'update' : 'save'} address. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const addressTypes = [
    { value: "home", label: "Home", icon: <Home size={18} /> },
    { value: "work", label: "Work", icon: <Briefcase size={18} /> },
    { value: "other", label: "Other", icon: <Building size={18} /> }
  ];

  return (
    <div className="address-form-modal-container">
      <div className="address-form-container">
        <div className="address-form-header">
          <h2>{editAddress ? "Edit Address" : "Add New Address"}</h2>
          <button 
            type="button" 
            className="close-button" 
            onClick={onClose} 
            disabled={loading}
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="address-form">
          {/* Contact Details Section */}
          <div className="form-section">
            <h3 className="form-subtitle">Contact Details</h3>
            
            {/* Name */}
            <div className="form-group">
              <label className="form-label">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? "error" : ""}`}
                placeholder="Enter your full name"
                disabled={loading}
                maxLength={50}
              />
              {errors.name && (
                <span className="error-text">{errors.name}</span>
              )}
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label className="form-label">
                Phone Number *
              </label>
              <div className="phone-input-container">
                <span className="phone-prefix">+91</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-input phone-input ${errors.phone ? "error" : ""}`}
                  placeholder="Enter 10-digit phone number"
                  disabled={loading}
                  maxLength={10}
                />
              </div>
              {errors.phone && (
                <span className="error-text">{errors.phone}</span>
              )}
            </div>
          </div>

          <div className="divider"></div>

          {/* Address Details Section */}
          <div className="form-section">
            <h3 className="form-subtitle">Address Details</h3>

            {/* Address Type */}
            <div className="form-section">
              <label className="section-label">Save address as *</label>
              <div className="save-as-options">
                {addressTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`save-as-option ${
                      formData.type === type.value ? "active" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={type.value}
                      checked={formData.type === type.value}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    {type.icon}
                    <span>{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Address Line */}
            <div className="form-group">
              <label className="form-label">
                Complete Address *
              </label>
              <textarea
                name="address_line"
                value={formData.address_line}
                onChange={handleChange}
                className={`form-input textarea ${errors.address_line ? "error" : ""}`}
                placeholder="Enter complete address with house number, building name, street, area, etc."
                disabled={loading}
                rows={3}
                maxLength={200}
              />
              {errors.address_line && (
                <span className="error-text">{errors.address_line}</span>
              )}
            </div>

            {/* Landmark */}
            <div className="form-group">
              <label className="form-label">Landmark (optional)</label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter nearby landmark for easy location"
                disabled={loading}
                maxLength={100}
              />
            </div>

            {/* City, State, Pincode */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`form-input ${errors.city ? "error" : ""}`}
                  placeholder="Enter city"
                  disabled={loading}
                  maxLength={50}
                />
                {errors.city && (
                  <span className="error-text">{errors.city}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`form-input ${errors.state ? "error" : ""}`}
                  placeholder="Enter state"
                  disabled={loading}
                  maxLength={50}
                />
                {errors.state && (
                  <span className="error-text">{errors.state}</span>
                )}
              </div>
            </div>

            {/* Pincode */}
            <div className="form-group">
              <label className="form-label">Pincode *</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className={`form-input ${errors.pincode ? "error" : ""}`}
                placeholder="Enter 6-digit pincode"
                maxLength="6"
                disabled={loading}
              />
              {errors.pincode && (
                <span className="error-text">{errors.pincode}</span>
              )}
            </div>

            {/* Set as Default */}
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleChange}
                  disabled={loading}
                />
                <span>Set as default address</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button 
              type="submit" 
              className="save-address-btn"
              disabled={loading}
            >
              {loading ? "Saving..." : (editAddress ? "Update Address" : "Save Address")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;