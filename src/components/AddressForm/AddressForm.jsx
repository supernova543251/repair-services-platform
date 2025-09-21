import React, { useState } from "react";
import { X, MapPin, Home, Briefcase, Building, MapPinPlus } from "lucide-react";
import "./AddressForm.css";

const AddressForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    addressType: "myself",
    saveAs: "Home",
    flatBuilding: "",
    floor: "",
    locality: "Moregaon Talao, Nalasopara East, Nala Sopara",
    landmark: "",
    name: "",
    phone: "+91 8208410871"
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ["flatBuilding", "locality", "name"];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (formData.phone && !/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid Indian phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      alert("Address saved successfully!");
      onClose();
    }
  };

  const saveAsOptions = [
    { value: "Home", icon: <Home size={18} /> },
    { value: "Work", icon: <Briefcase size={18} /> },
    { value: "Hotel", icon: <Building size={18} /> },
    { value: "Other", icon: <MapPinPlus size={18} /> }
  ];

  return (
    <div className="address-form-modal-container">
      <div className="address-form-container">
        <div className="address-form-header">
          <h2>Add address</h2>
          <button className="close-button" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="address-form">
          {/* Search for area */}
          <div className="form-section">
            <label className="section-label">Search for a new area, locality...</label>
            <div className="search-input-container">
              <MapPin size={18} className="location-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search area, locality, etc."
              />
            </div>
            <p className="instruction-text">Use the pin to adjust your location</p>
          </div>

          <div className="divider"></div>

          <h3 className="form-subtitle">Enter complete address</h3>

          {/* Address Type */}
          <div className="form-section">
            <div className="toggle-group">
              <label className="toggle-option">
                <input
                  type="radio"
                  name="addressType"
                  value="myself"
                  checked={formData.addressType === "myself"}
                  onChange={handleChange}
                />
                <span className="toggle-label">Myself</span>
              </label>
              <label className="toggle-option">
                <input
                  type="radio"
                  name="addressType"
                  value="someoneElse"
                  checked={formData.addressType === "someoneElse"}
                  onChange={handleChange}
                />
                <span className="toggle-label">Someone else</span>
              </label>
            </div>
          </div>

          {/* Save As */}
          <div className="form-section">
            <label className="section-label">Save address as *</label>
            <div className="save-as-options">
              {saveAsOptions.map((option) => (
                <label
                  key={option.value}
                  className={`save-as-option ${
                    formData.saveAs === option.value ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="saveAs"
                    value={option.value}
                    checked={formData.saveAs === option.value}
                    onChange={handleChange}
                  />
                  {option.icon}
                  <span>{option.value}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Flat/House/Building */}
          <div className="form-group">
            <label className="form-label">
              Flat / House no / Building name *
            </label>
            <input
              type="text"
              name="flatBuilding"
              value={formData.flatBuilding}
              onChange={handleChange}
              className={`form-input ${errors.flatBuilding ? "error" : ""}`}
              placeholder="Enter flat, house or building name"
            />
            {errors.flatBuilding && (
              <span className="error-text">{errors.flatBuilding}</span>
            )}
          </div>

          {/* Floor */}
          <div className="form-group">
            <label className="form-label">Floor (optional)</label>
            <input
              type="text"
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter floor number"
            />
          </div>

          {/* Locality */}
          <div className="form-group">
            <label className="form-label">Area / Sector / Locality *</label>
            <div className="locality-container">
              <span className="locality-text">{formData.locality}</span>
              <button type="button" className="change-button">Change</button>
            </div>
          </div>

          {/* Landmark */}
          <div className="form-group">
            <label className="form-label">Nearby landmark (optional)</label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter nearby landmark"
            />
          </div>

          <div className="divider"></div>

          <p className="details-text">Enter your details for seamless delivery experience</p>

          {/* Name */}
          <div className="form-group">
            <label className="form-label">Your name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? "error" : ""}`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <span className="error-text">{errors.name}</span>
            )}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label className="form-label">Your phone number (optional)</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`form-input ${errors.phone ? "error" : ""}`}
              placeholder="+91 0000000000"
            />
            {errors.phone && (
              <span className="error-text">{errors.phone}</span>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="submit" className="save-address-btn">
              Save address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;