import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Search, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Smartphone,
  RotateCcw,
  Palette,
  ArrowLeft,
  Plus,
  Send,
  Building
} from 'lucide-react';
import { default as brands } from '../../data';
import deviceService from '../../services/device';
import './ModelGrid.css';

// Translation data
const translations = {
  en: {
    title: "Device Models",
    searchPlaceholder: "Search device models...",
    selectColor: "Choose Color Variant",
    noModels: "No matching models found",
    resetFilters: "Reset Filters",
    loading: "Loading...",
    colors: "colors",
    back: "Back",
    phoneNotFound: "Can't find your device?",
    phoneNotFoundDesc: "Add your device details manually to access our services",
    addDevice: "Add Your Device",
    mobileName: "Device Name",
    color: "Color (Optional)",
    continue: "Continue",
    submitDevice: "Submit Device",
    deviceNameRequired: "Device name is required",
    recommendFeature: "If you can't find your device in the list, you can add it manually to access our repair services.",
    brand: "Brand",
    selectToContinue: "Select device to continue",
    chooseServiceCenter: "Choose Service Center"
  },
  hi: {
    title: "डिवाइस मॉडल",
    searchPlaceholder: "डिवाइस मॉडल खोजें...",
    selectColor: "रंग वेरिएंट चुनें",
    noModels: "कोई मेल खाता मॉडल नहीं मिला",
    resetFilters: "फ़िल्टर रीसेट करें",
    loading: "लोड हो रहा है...",
    colors: "रंग",
    back: "वापस",
    phoneNotFound: "अपना डिवाइस नहीं मिल रहा?",
    phoneNotFoundDesc: "हमारी सेवाओं तक पहुंचने के लिए अपने डिवाइस का विवरण मैन्युअल रूप से जोड़ें",
    addDevice: "अपना डिवाइस जोड़ें",
    mobileName: "डिवाइस का नाम",
    color: "रंग (वैकल्पिक)",
    continue: "जारी रखें",
    submitDevice: "डिवाइस सबमिट करें",
    deviceNameRequired: "डिवाइस का नाम आवश्यक है",
    recommendFeature: "यदि आपको सूची में अपना डिवाइस नहीं मिल रहा है, तो आप इसे मैन्युअल रूप से जोड़ सकते हैं ताकि आप हमारी मरम्मत सेवाओं का उपयोग कर सकें।",
    brand: "ब्रांड",
    selectToContinue: "जारी रखने के लिए डिवाइस चुनें",
    chooseServiceCenter: "सर्विस सेंटर चुनें"
  },
  mr: {
    title: "डिव्हाइस मॉडेल्स",
    searchPlaceholder: "डिव्हाइस मॉडेल शोधा...",
    selectColor: "रंग वेरिएंट निवडा",
    noModels: "जुळणारे मॉडेल सापडले नाहीत",
    resetFilters: "फिल्टर रीसेट करा",
    loading: "लोड होत आहे...",
    colors: "रंग",
    back: "मागे",
    phoneNotFound: "तुमचे डिव्हाइस सापडत नाही?",
    phoneNotFoundDesc: "आमच्या सेवा वापरण्यासाठी तुमच्या डिव्हाइसचा तपशील स्वहस्ते जोडा",
    addDevice: "तुमचे डिव्हाइस जोडा",
    mobileName: "डिव्हाइसचे नाव",
    color: "रंग (पर्यायी)",
    continue: "सुरू ठेवा",
    submitDevice: "डिव्हाइस सबमिट करा",
    deviceNameRequired: "डिव्हाइसचे नाव आवश्यक आहे",
    recommendFeature: "जर तुम्हाला यादीत तुमचे डिव्हाइस सापडत नसेल, तर तुम्ही ते स्वहस्ते जोडू शकता जेणेकरून तुम्ही आमच्या दुरुस्ती सेवा वापरू शकाल.",
    brand: "ब्रँड",
    selectToContinue: "पुढे जाण्यासाठी डिव्हाइस निवडा",
    chooseServiceCenter: "सर्व्हिस सेंटर निवडा"
  }
};

function ModelGrid() {
  const { brand } = useParams();
  const navigate = useNavigate();
  const [allModels, setAllModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedModel, setExpandedModel] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showDeviceForm, setShowDeviceForm] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const [deviceColor, setDeviceColor] = useState('');
  const [error, setError] = useState(null);
  const searchInputRef = useRef(null);

  // Get selected language from localStorage
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setSelectedLanguage(savedLanguage);
  }, []);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get brand logo and name from local data
  const brandData = brands.find(b => 
    b.name.toLowerCase() === brand?.toLowerCase()
  );
  const brandLogo = brandData?.Image;
  const brandName = brandData?.name;

  // Fetch devices from backend
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        let response;
        if (brand) {
          // Fetch devices for specific brand
          response = await deviceService.getDevicesByBrand(brandName || brand);
        } else {
          // Fetch all active devices
          response = await deviceService.getDevices({
            is_active: true,
            limit: 100
          });
        }

        if (response.success) {
          const devices = response.data.docs || response.data;
          setAllModels(devices);
          setFilteredModels(devices);
        } else {
          throw new Error(response.message || 'Failed to fetch devices');
        }
      } catch (err) {
        console.error('Error fetching devices:', err);
        setError(err.message);
        setAllModels([]);
        setFilteredModels([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDevices();
  }, [brand, brandName]);

  const slugify = (str) => {
    return str?.toLowerCase()
      .replace(/[()]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-') || '';
  };

  // Filter models based on search
  useEffect(() => {
    let filtered = allModels;
    
    if (searchTerm) {
      filtered = filtered.filter(device =>
        device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredModels(filtered);
  }, [searchTerm, allModels]);

  // Search suggestions
  useEffect(() => {
    if (searchTerm.length > 0) {
      const matched = allModels.filter(device =>
        device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(matched);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm, allModels]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowSuggestions(false);
    searchInputRef.current?.focus();
  };

  const selectSuggestion = (device) => {
    setSearchTerm(device.model);
    setFilteredModels([device]);
    setShowSuggestions(false);
  };

  const handleModelClick = (device) => {
    setExpandedModel(expandedModel === device._id ? null : device._id);
  };

  // UPDATED: Navigate to ServiceCenterList instead of Services
  const handleVariantSelect = (device, variant) => {
    navigate(`/brand/${slugify(device.brand)}/${slugify(device.model)}/service-centers`, {
      state: { 
        variant: variant,
        modelName: device.model,
        brand: device.brand,
        isCustomDevice: false
      }
    });
  };

  // UPDATED: Handle device form submission to go to ServiceCenterList
  const handleDeviceSubmit = (e) => {
    e.preventDefault();
    if (!deviceName.trim()) {
      alert(translations[selectedLanguage].deviceNameRequired);
      return;
    }

    // Navigate to ServiceCenterList with custom device data
    navigate(`/brand/${brand}/custom-device/service-centers`, {
      state: {
        variant: {
          name: deviceColor || 'Default',
          color: '#6B7280'
        },
        modelName: deviceName,
        brand: brand,
        isCustomDevice: true
      }
    });
  };

  // Check if mobile device
  const isMobile = windowWidth < 768;

  const t = translations[selectedLanguage];

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="fixflash-model-container skeleton-loader">
      {/* Header skeleton */}
      <div className="fixflash-new-header skeleton-header">
        <div className="fixflash-header-main skeleton-header-main">
          <div className="skeleton-back-button"></div>
          <div className="fixflash-header-center skeleton-header-center">
            <div className="skeleton-logo"></div>
            <div className="skeleton-header-text">
              <div className="skeleton-title-large"></div>
              <div className="skeleton-subtitle"></div>
            </div>
          </div>
          <div className="skeleton-header-icon"></div>
        </div>
      </div>

      {/* Search skeleton */}
      <div className="fixflash-controls-section skeleton-controls">
        <div className="skeleton-search"></div>
      </div>

      {/* Models skeleton */}
      <div className="fixflash-models-grid skeleton-models">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="skeleton-model-card">
            <div className="skeleton-model-compact">
              <div className="skeleton-model-logo"></div>
              <div className="skeleton-model-content">
                <div className="skeleton-model-name"></div>
                <div className="skeleton-model-meta">
                  <div className="skeleton-meta-item"></div>
                  <div className="skeleton-meta-item"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Phone not found section skeleton */}
      <div className="skeleton-phone-not-found">
        <div className="skeleton-phone-content">
          <div className="skeleton-phone-title"></div>
          <div className="skeleton-phone-desc"></div>
          <div className="skeleton-phone-button"></div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <div className="fixflash-error-container">
        <div className="fixflash-error-icon">
          <Smartphone size={40} />
        </div>
        <p className="fixflash-error-text">Error loading devices: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="fixflash-retry-btn"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="fixflash-model-container">
      {/* Header */}
      <div className="fixflash-new-header">
        <div className="fixflash-header-main">
          <button 
            className="fixflash-back-button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
            <span>{t.back}</span>
          </button>
          
          <div className="fixflash-header-center">
            <div className="fixflash-header-logo-container">
              <img src={brandLogo} alt={brandName} className="fixflash-header-brand-logo" />
            </div>
            <div className="fixflash-header-text">
              <h1 className="fixflash-header-title">{brandName || t.title}</h1>
              <p className="fixflash-header-subtitle">
                {brandName ? `${brandName} ${t.title}` : t.title}
              </p>
            </div>
          </div>

          <div className="fixflash-header-icon">
            <Smartphone size={24} />
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="fixflash-controls-section">
        <div className="fixflash-search-container">
          <div className="fixflash-search-wrapper">
            <Search className="fixflash-search-icon" size={18} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
              className="fixflash-search-input"
            />
            {searchTerm && (
              <button className="fixflash-clear-search" onClick={clearSearch}>
                <X size={14} />
              </button>
            )}
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="fixflash-suggestions-dropdown">
              {suggestions.map((device, index) => (
                <div
                  key={device._id}
                  className="fixflash-suggestion-item"
                  onClick={() => selectSuggestion(device)}
                >
                  <Smartphone size={14} />
                  <span>{device.brand} {device.model}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Models Grid */}
      <div className="fixflash-models-grid">
        {filteredModels.map((device) => (
          <div
            key={device._id}
            className={`fixflash-model-card ${expandedModel === device._id ? 'fixflash-expanded' : ''}`}
          >
            {/* Compact View */}
            <div 
              className="fixflash-model-compact"
              onClick={() => handleModelClick(device)}
            >
              <div className="fixflash-model-main">
                <div className="fixflash-model-logo-container">
                  <img 
                    src={brandLogo} 
                    alt={device.brand} 
                    className="fixflash-model-logo" 
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/44?text=Device';
                      e.target.style.objectFit = 'contain';
                    }}
                  />
                </div>
                <div className="fixflash-model-content">
                  <div className="fixflash-model-header-info">
                    <h3 className="fixflash-model-name">{device.model}</h3>
                    {isMobile && (
                      <div className="fixflash-expand-indicator-mobile">
                        {expandedModel === device._id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    )}
                  </div>
                  <div className="fixflash-model-meta">
                    <span className="fixflash-model-brand">
                      <Building size={12} />
                      {device.brand}
                    </span>
                    <span className="fixflash-variant-count">
                      <Palette size={12} />
                      {device.model_variants?.length || 0} {t.colors}
                    </span>
                  </div>
                </div>
              </div>
              {!isMobile && (
                <div className="fixflash-expand-indicator">
                  {expandedModel === device._id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              )}
            </div>

            {/* Expanded View */}
            {expandedModel === device._id && (
              <div className="fixflash-model-expanded">
                <div className="fixflash-variants-section">
                  <h4 className="fixflash-variants-title">
                    <Palette className="fixflash-variants-icon" size={16} />
                    {t.selectColor}
                  </h4>
                  <div className="fixflash-variants-grid">
                    {device.model_variants && device.model_variants.length > 0 ? (
                      device.model_variants.map((variant, variantIndex) => (
                        <button
                          key={variantIndex}
                          className="fixflash-variant-btn"
                          onClick={() => handleVariantSelect(device, variant)}
                        >
                          <div 
                            className="fixflash-color-swatch"
                            style={{ backgroundColor: variant.color_code || '#6B7280' }}
                          ></div>
                          <span className="fixflash-variant-name">{variant.name}</span>
                        </button>
                      ))
                    ) : (
                      <button
                        className="fixflash-variant-btn"
                        onClick={() => handleVariantSelect(device, { name: 'Default', color: '#6B7280' })}
                      >
                        <div 
                          className="fixflash-color-swatch"
                          style={{ backgroundColor: '#6B7280' }}
                        ></div>
                        <span className="fixflash-variant-name">Default</span>
                      </button>
                    )}
                  </div>
                  <div className="fixflash-selection-hint">
                    {t.chooseServiceCenter}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredModels.length === 0 && !isLoading && (
        <div className="fixflash-no-models">
          <div className="fixflash-no-models-icon">
            <Smartphone size={40} />
          </div>
          <p className="fixflash-no-models-text">{t.noModels}</p>
          <div className="fixflash-recommendation">
            <p className="fixflash-recommendation-text">{t.recommendFeature}</p>
          </div>
          <button 
            onClick={() => setSearchTerm('')}
            className="fixflash-reset-filters"
          >
            <RotateCcw size={14} />
            {t.resetFilters}
          </button>
        </div>
      )}

      {/* Device Not Found Section */}
      <div className="fixflash-phone-not-found-section">
        <div className="fixflash-phone-not-found-content">
          <div className="fixflash-phone-not-found-text">
            <h3 className="fixflash-phone-not-found-title">{t.phoneNotFound}</h3>
            <p className="fixflash-phone-not-found-desc">{t.phoneNotFoundDesc}</p>
          </div>
          <button 
            className="fixflash-add-device-btn"
            onClick={() => setShowDeviceForm(true)}
          >
            <Plus size={16} />
            {t.addDevice}
          </button>
        </div>
      </div>

      {/* Device Form Overlay */}
      {showDeviceForm && (
        <div className="fixflash-overlay">
          <div className="fixflash-overlay-content">
            <div className="fixflash-overlay-header">
              <h2>{t.addDevice}</h2>
              <button 
                className="fixflash-overlay-close"
                onClick={() => setShowDeviceForm(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleDeviceSubmit} className="fixflash-device-form">
              <div className="fixflash-form-group">
                <label htmlFor="deviceName" className="fixflash-form-label">
                  {t.mobileName} *
                </label>
                <input
                  type="text"
                  id="deviceName"
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                  className="fixflash-form-input"
                  placeholder="Enter your device model name"
                  required
                />
              </div>
              
              <div className="fixflash-form-group">
                <label htmlFor="deviceColor" className="fixflash-form-label">
                  {t.color}
                </label>
                <input
                  type="text"
                  id="deviceColor"
                  value={deviceColor}
                  onChange={(e) => setDeviceColor(e.target.value)}
                  className="fixflash-form-input"
                  placeholder="Enter color (optional)"
                />
              </div>
              
              <div className="fixflash-form-actions">
                <button 
                  type="button"
                  className="fixflash-form-cancel"
                  onClick={() => setShowDeviceForm(false)}
                >
                  {t.back}
                </button>
                <button 
                  type="submit"
                  className="fixflash-form-submit"
                >
                  <Send size={16} />
                  {t.continue}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Selection Hint */}
      {filteredModels.length > 0 && (
        <div className="fixflash-selection-hint-footer">
          <span>{t.selectToContinue}</span>
        </div>
      )}
    </div>
  );
}

export default ModelGrid;