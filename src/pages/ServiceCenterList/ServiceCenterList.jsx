import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Star,
  MapPin,
  Clock,
  Shield,
  TrendingUp,
  ArrowLeft,
  ChevronRight,
  Award,
  Users,
  Building
} from 'lucide-react';
import repairServiceAPI from '../../services/repairServiceAPI';
import './ServiceCenterList.css';

// Translation data
const translations = {
  en: {
    title: "Service Centers",
    subtitle: "Select a service center for your repair",
    back: "Back",
    onlineNow: "Online Now",
    verified: "Verified",
    availableServices: "Services Available",
    startingFrom: "Starting at",
    responseTime: "Response Time",
    selectToContinue: "Tap on a service center to continue",
    noCentersTitle: "No Service Centers Found",
    noCentersMessage: "Try changing your pincode or check back later",
    changePincode: "Change Pincode",
    loadingMessage: "Finding service centers near you...",
    sortBy: "Sort by",
    highestRated: "Highest Rated",
    nearest: "Nearest",
    bestPrice: "Best Price",
    rating4: "4+ Rating",
    yearsExp: "Years Experience",
    distance: "Distance",
    from: "from",
    services: "services",
    popular: "Popular",
    serviceCenters: "Service Centers",
    chooseServiceCenter: "Choose Service Center",
    selectServiceCenter: "Select Service Center"
  },
  hi: {
    title: "सर्विस सेंटर्स",
    subtitle: "अपनी मरम्मत के लिए एक सर्विस सेंटर चुनें",
    back: "वापस",
    onlineNow: "ऑनलाइन अभी",
    verified: "सत्यापित",
    availableServices: "सेवाएं उपलब्ध",
    startingFrom: "शुरुआती कीमत",
    responseTime: "प्रतिक्रिया समय",
    selectToContinue: "जारी रखने के लिए सर्विस सेंटर पर टैप करें",
    noCentersTitle: "कोई सर्विस सेंटर नहीं मिला",
    noCentersMessage: "अपना पिनकोड बदलें या बाद में जाँचें",
    changePincode: "पिनकोड बदलें",
    loadingMessage: "आपके पास के सर्विस सेंटर्स ढूंढ रहे हैं...",
    sortBy: "क्रमबद्ध करें",
    highestRated: "उच्चतम रेटेड",
    nearest: "निकटतम",
    bestPrice: "सर्वोत्तम मूल्य",
    rating4: "4+ रेटिंग",
    yearsExp: "वर्षों का अनुभव",
    distance: "दूरी",
    from: "से",
    services: "सेवाएं",
    popular: "लोकप्रिय",
    serviceCenters: "सर्विस सेंटर्स",
    chooseServiceCenter: "सर्विस सेंटर चुनें",
    selectServiceCenter: "सर्विस सेंटर चुनें"
  },
  mr: {
    title: "सर्व्हिस सेंटर्स",
    subtitle: "तुमच्या दुरुस्तीसाठी एक सर्व्हिस सेंटर निवडा",
    back: "मागे",
    onlineNow: "ऑनलाइन आत्ता",
    verified: "सत्यापित",
    availableServices: "सेवा उपलब्ध",
    startingFrom: "सुरुवाती किंमत",
    responseTime: "प्रतिसाद वेळ",
    selectToContinue: "पुढे जाण्यासाठी सर्व्हिस सेंटरवर टॅप करा",
    noCentersTitle: "कोणतेही सर्व्हिस सेंटर सापडले नाही",
    noCentersMessage: "तुमचा पिनकोड बदला किंवा नंतर तपासा",
    changePincode: "पिनकोड बदला",
    loadingMessage: "तुमच्या जवळचे सर्व्हिस सेंटर्स शोधत आहे...",
    sortBy: "क्रमवारी करा",
    highestRated: "सर्वोच्च रेट केलेले",
    nearest: "जवळचे",
    bestPrice: "सर्वोत्तम किंमत",
    rating4: "4+ रेटिंग",
    yearsExp: "वर्षांचा अनुभव",
    distance: "अंतर",
    from: "कडून",
    services: "सेवा",
    popular: "लोकप्रिय",
    serviceCenters: "सर्व्हिस सेंटर्स",
    chooseServiceCenter: "सर्व्हिस सेंटर निवडा",
    selectServiceCenter: "सर्व्हिस सेंटर निवडा"
  }
};

// Skeleton Loader Component
const SkeletonLoader = () => {
  return (
    <div className="service-center-list-skeleton-container">
      {/* Device Banner Skeleton */}
      <div className="service-center-list-skeleton-device-banner">
        <div className="skeleton skeleton-text skeleton-title"></div>
        <div className="skeleton skeleton-text skeleton-subtitle"></div>
      </div>

      {/* Pincode Input Skeleton */}
      <div className="service-center-list-skeleton-pincode">
        <div className="skeleton skeleton-input"></div>
      </div>

      {/* Filters Skeleton */}
      <div className="service-center-list-skeleton-filters">
        <div className="skeleton skeleton-filter"></div>
        <div className="skeleton skeleton-filter"></div>
        <div className="skeleton skeleton-filter"></div>
      </div>

      {/* Results Count Skeleton */}
      <div className="service-center-list-skeleton-results">
        <div className="skeleton skeleton-text skeleton-results"></div>
      </div>

      {/* Service Centers Grid Skeleton */}
      <div className="service-center-list-skeleton-grid">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="service-center-list-skeleton-card">
            <div className="skeleton skeleton-card-header">
              <div className="skeleton skeleton-text skeleton-card-title"></div>
              <div className="skeleton skeleton-rating"></div>
            </div>

            <div className="skeleton skeleton-meta">
              <div className="skeleton skeleton-text skeleton-meta-item"></div>
              <div className="skeleton skeleton-text skeleton-meta-item"></div>
            </div>

            <div className="skeleton skeleton-services">
              <div className="skeleton skeleton-text skeleton-service-header"></div>
              <div className="skeleton skeleton-text skeleton-service-item"></div>
              <div className="skeleton skeleton-text skeleton-service-item"></div>
            </div>

            <div className="skeleton skeleton-footer">
              <div className="skeleton skeleton-text skeleton-experience"></div>
              <div className="skeleton skeleton-text skeleton-specialties"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function ServiceCenterList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [serviceCenters, setServiceCenters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPincode, setSelectedPincode] = useState('');
  const [filters, setFilters] = useState({
    minRating: 0
  });
  const [deviceDetails, setDeviceDetails] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [sortBy, setSortBy] = useState('highestRated');
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  // Get language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setSelectedLanguage(savedLanguage);
  }, []);

  // Get ALL device details from navigation state
  useEffect(() => {
    if (location.state) {
      // Store ALL data from ModelGrid
      setDeviceDetails(location.state);
    }

    // Get pincode from localStorage or use default
    const savedPincode = localStorage.getItem('userPincode') || '560001';
    setSelectedPincode(savedPincode);

    fetchServiceCenters(savedPincode);
  }, [location.state]);

  const fetchServiceCenters = async (pincode) => {
    try {
      setIsLoading(true);
      setIsLoadingComplete(false);

      const response = await repairServiceAPI.getBestPricedServiceCenters(pincode, 'repair');

      console.log('API Response:', response);

      if (response.success && response.data?.service_centers) {
        const transformedData = transformServiceCenters(response.data.service_centers);
        console.log('Transformed data:', transformedData);
        setServiceCenters(transformedData);
      } else {
        console.log('No service centers found or API error');
        setServiceCenters([]);
      }
    } catch (error) {
      console.error('Error fetching service centers:', error);
      setServiceCenters([]);
    } finally {
      // Add delay to show skeleton longer
      setTimeout(() => {
        setIsLoading(false);

        // Additional delay before marking complete
        setTimeout(() => {
          setIsLoadingComplete(true);
        }, 80); // Additional 0.8 second delay
      }, 100); // Initial 0.5 second delay
    }
  };

  const transformServiceCenters = (centers) => {
    if (!centers || centers.length === 0) return [];

    return centers.map(center => {
      // Check different possible structures
      const serviceCenter = center.service_center || center;

      return {
        id: serviceCenter._id || center._id,
        name: serviceCenter.outlet_name || 'Service Center',
        rating: serviceCenter.ratings?.average || 4.0,
        totalRatings: serviceCenter.ratings?.count || 0,
        location: serviceCenter.location?.address || 'Bangalore',
        city: serviceCenter.location?.city || '',
        state: serviceCenter.location?.state || '',
        distance: getRandomDistance(),
        availability: serviceCenter.availability || 'online',
        verificationStatus: serviceCenter.verified_status === 'verified' ? 'verified' : 'pending',
        services: center.services?.map(service => ({
          id: service._id,
          name: service.service_name,
          price: service.discounted_price || service.price,
        })) || [],
        bestServices: center.services?.slice(0, 2) || [],
        totalServices: center.services?.length || 0,
        responseTime: getRandomResponseTime(),
        isPopular: Math.random() > 0.7,
        yearsExperience: serviceCenter.years_of_experience || '2+',
        specialties: serviceCenter.specialties || [],
      };
    });
  };

  // Helper functions for demo data
  const getRandomDistance = () => {
    const distances = ['1.2 km', '2.5 km', '3.1 km', '4.7 km', '5.3 km'];
    return distances[Math.floor(Math.random() * distances.length)];
  };

  const getRandomResponseTime = () => {
    const times = ['15-30 mins', '30-45 mins', '45-60 mins', '1-2 hours'];
    return times[Math.floor(Math.random() * times.length)];
  };

  // ✅ FIXED: Pass ALL data from ModelGrid to Services
  const handleSelectServiceCenter = (serviceCenter) => {
    // Navigate to services page with ALL original data from ModelGrid
    navigate('/services', {
      state: {
        ...location.state,           // ✅ PASS ALL DATA FROM MODELGRID
        serviceCenterId: serviceCenter.id,
        serviceCenterName: serviceCenter.name,
        pincode: selectedPincode
      }
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const updatePincode = (e) => {
    if (e.key === 'Enter' && selectedPincode.length === 6) {
      fetchServiceCenters(selectedPincode);
      localStorage.setItem('userPincode', selectedPincode);
    }
  };

  const filteredCenters = serviceCenters.filter(center => {
    // Apply rating filter
    if (filters.minRating > 0 && center.rating < filters.minRating) {
      return false;
    }

    return true;
  });

  // Sort centers
  const sortedCenters = [...filteredCenters].sort((a, b) => {
    switch (sortBy) {
      case 'nearest':
        return parseFloat(a.distance) - parseFloat(b.distance);
      case 'highestRated':
        return b.rating - a.rating;
      case 'bestPrice':
        const aMinPrice = a.services.length > 0 ? Math.min(...a.services.map(s => s.price)) : Infinity;
        const bMinPrice = b.services.length > 0 ? Math.min(...b.services.map(s => s.price)) : Infinity;
        return aMinPrice - bMinPrice;
      case 'experience':
        return parseInt(b.yearsExperience) - parseInt(a.yearsExperience);
      default:
        return b.rating - a.rating;
    }
  });

  const t = translations[selectedLanguage];

  if (isLoading || !isLoadingComplete) {
    return (
      <>
        <div className="fixflash-new-header-service-center">
          <div className="fixflash-header-main-service-center">
            <button
              className="fixflash-back-button-service-center skeleton"
              onClick={handleBack}
              disabled
            >
              <ArrowLeft size={17} />
              <span>{t.back}</span>
            </button>

            <div className="fixflash-header-center-service-center">
              <div className="fixflash-header-text-service-center">
                <h1 className="fixflash-header-title-service-center skeleton skeleton-text">{t.serviceCenters}</h1>
                <p className="fixflash-header-subtitle-service-center skeleton skeleton-text">
                  {deviceDetails?.modelName || t.chooseServiceCenter}
                </p>
              </div>
            </div>

            <div className="fixflash-header-icon-service-center skeleton">
              <Building size={20} />
            </div>
          </div>
        </div>
        <SkeletonLoader />
      </>
    );
  }

  return (
    <div className="service-center-list-container">
      {/* Header - Same as ModelGrid */}
      <div className="fixflash-new-header-service-center">
        <div className="fixflash-header-main-service-center">
          <button
            className="fixflash-back-button-service-center"
            onClick={handleBack}
          >
            <ArrowLeft size={17} />
            <span>{t.back}</span>
          </button>

          <div className="fixflash-header-center-service-center">
            <div className="fixflash-header-text-service-center">
              <h1 className="fixflash-header-title-service-center">{t.serviceCenters}</h1>
              <p className="fixflash-header-subtitle-service-center">
                {deviceDetails?.modelName || t.chooseServiceCenter}
              </p>
            </div>
          </div>

          <div className="fixflash-header-icon-service-center">
            <Building size={20} />
          </div>
        </div>
      </div>

      {/* Device Info Banner */}
      {deviceDetails && (
        <div className="service-center-list-device-banner">
          <div className="service-center-list-device-info">
            <span className="service-center-list-device-brand">{deviceDetails.brand}</span>
            <span className="service-center-list-device-model">{deviceDetails.modelName}</span>
            {deviceDetails.variant && (
              <span className="service-center-list-device-variant">• {deviceDetails.variant.name}</span>
            )}
          </div>
          <div className="service-center-list-device-status">
            {deviceDetails.isCustomDevice ? 'Custom Device' : 'Standard Device'}
          </div>
        </div>
      )}

      {/* Pincode Input */}
      <div className="service-center-list-pincode-section">
        <div className="service-center-list-pincode-input">
          <MapPin size={18} />
          <input
            type="text"
            placeholder="Enter pincode"
            value={selectedPincode}
            onChange={(e) => setSelectedPincode(e.target.value)}
            onKeyDown={updatePincode}
            maxLength="6"
          />
          {selectedPincode && (
            <button className="service-center-list-update-btn" onClick={() => fetchServiceCenters(selectedPincode)}>
              Update
            </button>
          )}
        </div>
      </div>

      {/* Filters Section */}
      <div className="service-center-list-filters-section">
        <div className="service-center-list-sort-by">
          <span className="service-center-list-sort-label">{t.sortBy}:</span>
          <div className="service-center-list-sort-options">
            <button
              className={`service-center-list-sort-option ${sortBy === 'highestRated' ? 'service-center-list-active' : ''}`}
              onClick={() => setSortBy('highestRated')}
            >
              <Star size={14} />
              <span>{t.highestRated}</span>
            </button>
            <button
              className={`service-center-list-sort-option ${sortBy === 'nearest' ? 'service-center-list-active' : ''}`}
              onClick={() => setSortBy('nearest')}
            >
              <MapPin size={14} />
              <span>{t.nearest}</span>
            </button>
            <button
              className={`service-center-list-sort-option ${sortBy === 'bestPrice' ? 'service-center-list-active' : ''}`}
              onClick={() => setSortBy('bestPrice')}
            >
              <TrendingUp size={14} />
              <span>{t.bestPrice}</span>
            </button>
          </div>
        </div>

        <div className="service-center-list-filter-tags">
          <button
            className={`service-center-list-filter-tag ${filters.minRating === 4 ? 'service-center-list-active' : ''}`}
            onClick={() => setFilters({ ...filters, minRating: filters.minRating === 4 ? 0 : 4 })}
          >
            <Star size={12} />
            <span>{t.rating4}</span>
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="service-center-list-results-count">
        {sortedCenters.length} service centers found
      </div>

      {/* Service Centers Grid */}
      <div className="service-center-list-grid">
        {sortedCenters.map((center, index) => (
          <div
            key={center.id || `center-${index}`}
            className="service-center-list-card"
            onClick={() => handleSelectServiceCenter(center)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Popular Badge */}
            {center.isPopular && (
              <div className="service-center-list-popular-badge">
                <Award size={12} />
                <span>{t.popular}</span>
              </div>
            )}

            {/* Verification Badge */}
            {center.verificationStatus === 'verified' && (
              <div className="service-center-list-verification-badge">
                <Shield size={12} />
                <span>{t.verified}</span>
              </div>
            )}

            <div className="service-center-list-card-content">
              {/* Center Header */}
              <div className="service-center-list-card-header">
                <h3 className="service-center-list-center-name">{center.name}</h3>

                <div className="service-center-list-rating-section">
                  <div className="service-center-list-rating">
                    <Star size={14} fill="#FFD700" />
                    <span className="service-center-list-rating-value">{center.rating.toFixed(1)}</span>
                    <span className="service-center-list-rating-count">({center.totalRatings})</span>
                  </div>
                </div>
              </div>

              {/* Location & Response Time */}
              <div className="service-center-list-meta-info">
                <div className="service-center-list-meta-item">
                  <MapPin size={14} />
                  <span className="service-center-list-location">{center.location}</span>
                  <span className="service-center-list-distance">• {center.distance}</span>
                </div>
                <div className="service-center-list-meta-item">
                  <Clock size={14} />
                  <span>{t.responseTime}: {center.responseTime}</span>
                </div>
              </div>

              {/* Services Section */}
              {center.services.length > 0 && (
                <div className="service-center-list-services-section">
                  <div className="service-center-list-services-header">
                    <span className="service-center-list-services-count">
                      {center.totalServices} {t.services}
                    </span>
                    <span className="service-center-list-starting-price">
                      {t.startingFrom} ₹{Math.min(...center.services.map(s => s.price))}
                    </span>
                  </div>

                  <div className="service-center-list-services-preview">
                    {center.bestServices.map((service, idx) => (
                      <div key={service.id || `service-${idx}`} className="service-center-list-service-item">
                        <span className="service-center-list-service-name">{service.name}</span>
                        <span className="service-center-list-service-price">₹{service.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience & Specialties */}
              <div className="service-center-list-extra-info">
                {center.yearsExperience && (
                  <div className="service-center-list-experience">
                    <Users size={12} />
                    <span>{center.yearsExperience} {t.yearsExp}</span>
                  </div>
                )}

                {center.specialties.length > 0 && (
                  <div className="service-center-list-specialties">
                    {center.specialties.slice(0, 2).map((specialty, idx) => (
                      <span key={idx} className="service-center-list-specialty">
                        {specialty}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Select Indicator */}
            <div className="service-center-list-select-indicator">
              <ChevronRight size={18} />
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {sortedCenters.length === 0 && !isLoading && (
        <div className="service-center-list-no-centers">
          <div className="service-center-list-no-centers-icon">
            <Building size={48} />
          </div>
          <h3>{t.noCentersTitle}</h3>
          <p>{t.noCentersMessage}</p>
          <button
            className="service-center-list-change-pincode-btn"
            onClick={() => {
              setSelectedPincode('');
              setFilters({ minRating: 0 });
              setSortBy('highestRated');
            }}
          >
            {t.changePincode}
          </button>
        </div>
      )}

      {/* Selection Prompt */}
      {sortedCenters.length > 0 && (
        <div className="service-center-list-selection-prompt">
          <span>{t.selectServiceCenter}</span>
        </div>
      )}
    </div>
  );
}

export default ServiceCenterList;