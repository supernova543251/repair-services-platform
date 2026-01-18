import React, { useState, useMemo, useRef, useEffect } from 'react';
import { services as localServices } from '../../data';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Smartphone, XCircle, Info } from 'lucide-react';
import { useLogin } from '../../Context/LoginContext/LoginContext';
import repairServiceAPI from '../../services/repairServiceAPI';
import './Services.css';

const translations = {
    en: {
        title: "Repair Services",
        back: "Back",
        searchPlaceholder: "Search services...",
        noServices: "No Services Found",
        noServicesMessage: "We couldn't find any services matching your search.",
        loadingServices: "Loading services...",
        serviceError: "Unable to Load Services",
        errorMessage: "Failed to load services. Please try again.",
        retry: "Retry",
        totalPrice: "Estimated Total:",
        continue: "Continue",
        yourSelection: "Your Selection",
        viewMore: "more",
        showLess: "Show less",
        from: "from",
        selectService: "Select service to continue",
        deviceInfo: "Device Info",
        serviceCenter: "Service Center",
        unavailable: "Currently Unavailable",
        availableServices: "Available Services",
        unavailableServices: "Currently Unavailable"
    },
    hi: {
        title: "मरम्मत सेवाएं",
        back: "वापस",
        searchPlaceholder: "सेवाएं खोजें...",
        noServices: "कोई सेवा नहीं मिली",
        noServicesMessage: "हम आपकी खोज से मेल खाने वाली कोई सेवा नहीं ढूंढ पाए।",
        loadingServices: "सेवाएं लोड हो रही हैं...",
        serviceError: "सेवाएं लोड करने में असमर्थ",
        errorMessage: "सेवाएं लोड करने में विफल। कृपया पुनः प्रयास करें।",
        retry: "पुनः प्रयास करें",
        totalPrice: "अनुमानित कुल:",
        continue: "जारी रखें",
        yourSelection: "आपका चयन",
        viewMore: "अधिक",
        showLess: "कम दिखाएं",
        from: "से",
        selectService: "जारी रखने के लिए सेवा चुनें",
        deviceInfo: "डिवाइस की जानकारी",
        serviceCenter: "सर्विस सेंटर",
        unavailable: "वर्तमान में अनुपलब्ध",
        availableServices: "उपलब्ध सेवाएं",
        unavailableServices: "वर्तमान में अनुपलब्ध"
    },
    mr: {
        title: "दुरुस्ती सेवा",
        back: "मागे",
        searchPlaceholder: "सेवा शोधा...",
        noServices: "कोणतीही सेवा सापडली नाही",
        noServicesMessage: "आम्हाला आपल्या शोधाशी जुळणारी कोणतीही सेवा सापडली नाही.",
        loadingServices: "सेवा लोड होत आहे...",
        serviceError: "सेवा लोड करण्यात अक्षम",
        errorMessage: "सेवा लोड करण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.",
        retry: "पुन्हा प्रयत्न करा",
        totalPrice: "अंदाजे एकूण:",
        continue: "सुरू ठेवा",
        yourSelection: "तुमची निवड",
        viewMore: "अधिक",
        showLess: "कमी दाखवा",
        from: "कडून",
        selectService: "पुढे जाण्यासाठी सेवा निवडा",
        deviceInfo: "डिव्हाइस माहिती",
        serviceCenter: "सर्व्हिस सेंटर",
        unavailable: "सध्या अनुपलब्ध",
        availableServices: "उपलब्ध सेवा",
        unavailableServices: "सध्या अनुपलब्ध"
    }
};

// Skeleton Loader Component
const SkeletonLoader = () => {
    return (
        <div className="services-skeleton-container">
            {/* Header Skeleton */}
            <div className="services-skeleton-header">
                <div className="skeleton skeleton-back-button"></div>
                <div className="skeleton-skeleton-text-center">
                    <div className="skeleton skeleton-title"></div>
                    <div className="skeleton skeleton-subtitle"></div>
                </div>
                <div className="skeleton skeleton-header-icon"></div>
            </div>

            {/* Search Bar Skeleton */}
            <div className="services-skeleton-search">
                <div className="skeleton skeleton-search-bar"></div>
            </div>

            {/* Available Services Section Skeleton */}
            <div className="services-skeleton-section">
                <div className="services-skeleton-section-header">
                    <div className="skeleton skeleton-section-title"></div>
                    <div className="skeleton skeleton-count-badge"></div>
                </div>
                <div className="services-skeleton-grid">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="services-skeleton-card">
                            <div className="skeleton skeleton-card-image"></div>
                            <div className="skeleton-card-content">
                                <div className="skeleton skeleton-card-title"></div>
                                <div className="skeleton skeleton-card-price"></div>
                                <div className="skeleton skeleton-card-center"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

function Services() {
    const [selectedServices, setSelectedServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingServices, setIsFetchingServices] = useState(true);
    const [backendServices, setBackendServices] = useState([]);
    const [availableServices, setAvailableServices] = useState([]);
    const [unavailableServices, setUnavailableServices] = useState([]);
    const [error, setError] = useState(null);
    const summaryRef = useRef(null);
    const [summaryHeight, setSummaryHeight] = useState(0);
    const [showAllSelected, setShowAllSelected] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredServices, setFilteredServices] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const searchInputRef = useRef(null);
    const searchButtonRef = useRef(null);
    const navigate = useNavigate();
    const { brand: urlBrand } = useParams();
    const location = useLocation();
    const { isLoggedIn } = useLogin();
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);

    const [selectedLanguage, setSelectedLanguage] = useState('en');

    useEffect(() => {
        const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
        setSelectedLanguage(savedLanguage);
    }, []);

    const selectedVariant = location.state?.variant;
    const selectedModelName = location.state?.modelName;
    const selectedBrand = location.state?.brand || urlBrand;
    const deviceIsCustom = location.state?.isCustomDevice || false;
    const serviceCenterId = location.state?.serviceCenterId;
    const selectedPincode = location.state?.pincode || '560001';

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setIsFetchingServices(true);
                setError(null);

                let response;

                if (serviceCenterId) {
                    response = await repairServiceAPI.getServicesByServiceCenter(serviceCenterId);
                } else {
                    response = await repairServiceAPI.getServices(selectedPincode, 'repair');
                }

                if (response.success) {
                    const transformedServices = serviceCenterId
                        ? transformServicesByServiceCenter(response.data.services || [], serviceCenterId)
                        : transformBackendServices(response.data.service_centers || []);

                    // Separate available and unavailable services
                    const available = transformedServices.filter(service =>
                        service.availability !== 'unavailable' && service.status === 'active'
                    );
                    const unavailable = transformedServices.filter(service =>
                        service.availability === 'unavailable' || service.status !== 'active'
                    );

                    setBackendServices(transformedServices);
                    setAvailableServices(available);
                    setUnavailableServices(unavailable);
                    setFilteredServices([...available, ...unavailable]);
                } else {
                    throw new Error(response.message || 'Failed to fetch services');
                }
            } catch (err) {
                console.error('Failed to fetch services:', err);
                setError(translations[selectedLanguage].errorMessage);
                setFilteredServices(localServices.services);
                setIsFetchingServices(false);
                setIsLoadingComplete(true);
            } finally {
                // Only add delay if there was no error
                if (!error) {
                    setTimeout(() => {
                        setIsFetchingServices(false);

                        // Keep skeleton visible for longer
                        setTimeout(() => {
                            setIsLoadingComplete(true);
                        }, 100); // Additional 1 second delay
                    }, 10);
                }
            }
        };

        fetchServices();
    }, [serviceCenterId, selectedPincode, selectedLanguage]);

    const transformServicesByServiceCenter = (services, serviceCenterId) => {
        return services.map(service => {
            const localService = localServices.services.find(
                ls => ls.name.toLowerCase() === service.service_name?.toLowerCase()
            );

            return {
                id: service._id,
                serviceId: service._id,
                name: service.service_name,
                description: service.description,
                price: service.discounted_price || service.price,
                duration: `${service.estimated_time} mins`,
                image: localService?.image || '/images/service-placeholder.jpg',
                category: service.category,
                availability: service.availability,
                status: service.status,
                serviceCenter: {
                    id: serviceCenterId,
                    name: service.service_center_id?.outlet_name || 'Service Center'
                },
                backendData: service
            };
        });
    };

    const transformBackendServices = (serviceCenters) => {
        const allServices = [];

        serviceCenters.forEach(serviceCenter => {
            serviceCenter.services?.forEach(service => {
                const localService = localServices.services.find(
                    ls => ls.name.toLowerCase() === service.service_name?.toLowerCase()
                );

                allServices.push({
                    id: service._id,
                    serviceId: service._id,
                    name: service.service_name,
                    description: service.description,
                    price: service.discounted_price || service.price,
                    duration: `${service.estimated_time} mins`,
                    image: localService?.image || '/images/service-placeholder.jpg',
                    category: service.category,
                    availability: service.availability,
                    status: service.status,
                    serviceCenter: {
                        id: serviceCenter.service_center?._id || serviceCenterId,
                        name: serviceCenter.service_center?.outlet_name || 'Service Center'
                    },
                    backendData: service
                });
            });
        });

        return allServices;
    };

    useEffect(() => {
        if (summaryRef.current && selectedServices.length > 0) {
            setSummaryHeight(summaryRef.current.offsetHeight);
        } else {
            setSummaryHeight(0);
        }
    }, [selectedServices, showAllSelected]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchInputRef.current && !searchInputRef.current.contains(event.target) &&
                searchButtonRef.current && !searchButtonRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (searchTerm.length > 0) {
            const matched = backendServices.filter(service =>
                service.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSuggestions(matched);
            setShowSuggestions(true);
            setFilteredServices(matched);
        } else {
            setShowSuggestions(false);
            setFilteredServices([...availableServices, ...unavailableServices]);
        }
    }, [searchTerm, backendServices, availableServices, unavailableServices]);

    const toggleService = (serviceId, isUnavailable) => {
        if (isUnavailable) return;

        setSelectedServices(prev =>
            prev.includes(serviceId)
                ? prev.filter(id => id !== serviceId)
                : [...prev, serviceId]
        );
    };

    const handleCheckout = () => {
        const selectedServicesData = selectedServices.map(serviceId => {
            const service = backendServices.find(s => s.id === serviceId);
            return {
                serviceId: service.serviceId,
                name: service.name,
                price: service.price,
                serviceCenterId: service.serviceCenter.id
            };
        });

        const orderData = {
            brand: selectedBrand,
            model: selectedModelName,
            variant: selectedVariant,
            services: selectedServicesData,
            totalPrice: totalPrice,
            isCustomDevice: deviceIsCustom,
            serviceCenterId: serviceCenterId
        };

        setIsLoading(true);
        setTimeout(() => {
            navigate('/confirm-order', { state: orderData });
            setIsLoading(false);
        }, 800);
    };

    const totalPrice = useMemo(() => {
        return selectedServices.reduce((total, serviceId) => {
            const service = backendServices.find(s => s.id === serviceId);
            return total + (service?.price || 0);
        }, 0);
    }, [selectedServices, backendServices]);

    const handleImageError = (e) => {
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjQ0NDQ0NDIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiPlNlcnZpY2UgSW1hZ2U8L3RleHQ+Cjwvc3ZnPg==';
        e.target.style.objectFit = 'cover';
    };

    const handleSearchSubmit = () => {
        if (searchTerm.length > 0) {
            const matched = backendServices.filter(service =>
                service.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (matched.length === 1) {
                setFilteredServices([matched[0]]);
            }
            setShowSuggestions(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit();
        }
    };

    const selectSuggestion = (service) => {
        setSearchTerm(service.name);
        setFilteredServices([service]);
        setShowSuggestions(false);
        searchInputRef.current.focus();
    };

    const clearSearch = () => {
        setSearchTerm('');
        setFilteredServices([...availableServices, ...unavailableServices]);
        setShowSuggestions(false);
        searchInputRef.current.focus();
    };

    const displayedServices = showAllSelected
        ? selectedServices
        : selectedServices.slice(0, 3);

    const getSelectedServiceName = (serviceId) => {
        const service = backendServices.find(s => s.id === serviceId);
        return service?.name || 'Service';
    };

    const t = translations[selectedLanguage];

    if (isFetchingServices || !isLoadingComplete) {
        return <SkeletonLoader />;
    }

    return (
        <div className="services-modern-container">
            {/* Header */}
            <div className="services-header">
                <div className="services-header-main">
                    <button
                        className="services-header-back-button"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft size={17} />
                        <span>{t.back}</span>
                    </button>

                    <div className="services-header-center">
                        <div className="services-header-text">
                            <h1 className="services-header-title">{t.title}</h1>
                            <p className="services-header-subtitle">
                                {deviceIsCustom ? t.deviceInfo : selectedModelName}
                                {backendServices[0]?.serviceCenter?.name && (
                                    <span> • {backendServices[0].serviceCenter.name}</span>
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="services-header-icon">
                        <Smartphone size={20} />
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="services-search-container">
                <div className="services-search-input-wrapper" ref={searchInputRef}>
                    <input
                        type="text"
                        placeholder={t.searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
                        onKeyDown={handleKeyDown}
                        className="services-search-input"
                    />
                    {searchTerm && (
                        <button className="services-clear-search-button" onClick={clearSearch}>
                            ×
                        </button>
                    )}
                    <button
                        className="services-search-icon-button"
                        onClick={handleSearchSubmit}
                        ref={searchButtonRef}
                    >
                        <svg className="services-search-icon" viewBox="0 0 24 24" width="18" height="18">
                            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z" />
                        </svg>
                    </button>
                </div>

                {showSuggestions && suggestions.length > 0 && (
                    <div className="services-suggestions">
                        {suggestions.map((service, index) => (
                            <div
                                key={service.id}
                                className="services-suggestion-item"
                                onClick={() => selectSuggestion(service)}
                            >
                                <img
                                    src={service.image}
                                    alt=""
                                    className="services-suggestion-image"
                                    onError={handleImageError}
                                />
                                <span>{service.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Error State */}
            {error && (
                <div className="services-error-state">
                    <div className="services-error-icon">⚠️</div>
                    <h3 className="services-error-title">{t.serviceError}</h3>
                    <p className="services-error-message">{error}</p>
                    <button
                        className="services-retry-button"
                        onClick={() => window.location.reload()}
                    >
                        {t.retry}
                    </button>
                </div>
            )}

            {/* Available Services Section */}
            {!error && availableServices.length > 0 && (
                <div className="services-section-header available-services-header">
                    <h3 className="services-section-title">{t.availableServices}</h3>
                    <span className="services-count-badge">{availableServices.length} services</span>
                </div>
            )}

            {/* Available Services Grid */}
            {!error && availableServices.length > 0 && (
                <div className="services-grid-wrapper">
                    <div className="services-grid">
                        {availableServices.map((service, index) => (
                            <div
                                key={service.id}
                                className={`services-card ${selectedServices.includes(service.id) ? 'services-card-selected' : ''}`}
                                onClick={() => toggleService(service.id, false)}
                                style={{ '--order': index }}
                                aria-label={`Select ${service.name} service`}
                                role="button"
                                tabIndex="0"
                            >
                                <div className="services-card-image-container">
                                    <div className="services-card-image-overlay"></div>
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        className="services-card-image"
                                        onError={handleImageError}
                                        loading="lazy"
                                    />
                                    <div className="services-card-selection-indicator">
                                        {selectedServices.includes(service.id) ? (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="12" r="9" fill="#4361ee" />
                                                <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        ) : (
                                            <div className="services-card-selection-circle"></div>
                                        )}
                                    </div>
                                </div>
                                <div className="services-card-content">
                                    <h3 className="services-card-title">{service.name}</h3>
                                    <div className="services-card-meta">
                                        <span className="services-card-price">₹{service.price?.toLocaleString() || '1,499'}</span>
                                        <span className="services-card-duration">{service.duration}</span>
                                    </div>
                                    <div className="services-card-center-info">
                                        <small>{service.serviceCenter.name}</small>
                                    </div>
                                </div>
                                {selectedServices.includes(service.id) && (
                                    <div className="services-card-selected-highlight"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Unavailable Services Section */}
            {!error && unavailableServices.length > 0 && (
                <>
                    <div className="services-section-header unavailable-services-header">
                        <h3 className="services-section-title">
                            <XCircle size={16} />
                            {t.unavailableServices}
                        </h3>
                        <span className="services-count-badge unavailable-count-badge">{unavailableServices.length} services</span>
                    </div>

                    <div className="services-grid-wrapper">
                        <div className="services-grid">
                            {unavailableServices.map((service, index) => (
                                <div
                                    key={service.id}
                                    className="services-card services-card-unavailable"
                                    style={{ '--order': index + availableServices.length }}
                                    aria-label={`${service.name} - Currently unavailable`}
                                >
                                    <div className="services-card-image-container services-card-image-unavailable">
                                        <div className="services-card-unavailable-overlay"></div>
                                        <img
                                            src={service.image}
                                            alt={service.name}
                                            className="services-card-image"
                                            onError={handleImageError}
                                            loading="lazy"
                                        />
                                        <div className="services-card-unavailable-badge">
                                            <XCircle size={14} />
                                            <span>{t.unavailable}</span>
                                        </div>
                                    </div>
                                    <div className="services-card-content">
                                        <h3 className="services-card-title">{service.name}</h3>
                                        <div className="services-card-meta">
                                            <span className="services-card-price services-card-price-unavailable">₹{service.price?.toLocaleString() || '1,499'}</span>
                                            <span className="services-card-duration">{service.duration}</span>
                                        </div>
                                        <div className="services-card-unavailable-info">
                                            <Info size={12} />
                                            <small>This service is not available at the moment</small>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* No Services State */}
            {!error && availableServices.length === 0 && unavailableServices.length === 0 && (
                <div className="services-empty-state">
                    <div className="services-empty-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                            <path d="M3 7V5A2 2 0 0 1 5 3H7M17 3H19A2 2 0 0 1 21 5V7M21 17V19A2 2 0 0 1 19 21H17M7 21H5A2 2 0 0 1 3 19V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <h3 className="services-empty-title">{t.noServices}</h3>
                    <p className="services-empty-message">{t.noServicesMessage}</p>
                </div>
            )}

            {/* Selection Summary */}
            {selectedServices.length > 0 && (
                <div
                    className="services-selection-summary"
                    ref={summaryRef}
                >
                    <div className="services-summary-header">
                        <h2 className="services-summary-title">{t.yourSelection}</h2>
                        <span className="services-summary-count-badge">{selectedServices.length}</span>
                    </div>

                    <div className="services-selected-list">
                        {displayedServices.map((serviceId, index) => (
                            <div key={`selected-${index}`} className="services-selected-item">
                                <span className="services-selected-name">{getSelectedServiceName(serviceId)}</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleService(serviceId, false);
                                    }}
                                    className="services-remove-selected-button"
                                    aria-label={`Remove ${getSelectedServiceName(serviceId)} from selection`}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>
                        ))}

                        {selectedServices.length > 3 && !showAllSelected && (
                            <button
                                className="services-view-more-button"
                                onClick={() => setShowAllSelected(true)}
                            >
                                +{selectedServices.length - 3} {t.viewMore}
                            </button>
                        )}

                        {showAllSelected && selectedServices.length > 3 && (
                            <button
                                className="services-view-less-button"
                                onClick={() => setShowAllSelected(false)}
                            >
                                {t.showLess}
                            </button>
                        )}
                    </div>

                    <div className="services-summary-footer">
                        <div className="services-total-price">
                            <span className="services-total-label">{t.totalPrice}</span>
                            <span className="services-total-amount">₹{totalPrice.toLocaleString()}</span>
                        </div>
                        <button
                            className="services-checkout-button"
                            onClick={handleCheckout}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="services-checkout-loading">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.99994L16.25 7.82837M4.92157 19.0784L7.75 16.25M4.92157 4.99994L7.75 7.82837" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </span>
                            ) : (
                                <>
                                    <span className="services-checkout-text">{t.continue}</span>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="services-checkout-arrow">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Selection Prompt */}
            {availableServices.length > 0 && selectedServices.length === 0 && (
                <div className="services-selection-prompt">
                    <span className="services-prompt-text">{t.selectService}</span>
                </div>
            )}
        </div>
    );
}

export default Services;