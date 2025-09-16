import React, { useState, useMemo, useRef, useEffect } from 'react';
import { services } from '../../data';
import './Services.css';

function Services({ variant, modelName }) {
    const [selectedServices, setSelectedServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const summaryRef = useRef(null);
    const [summaryHeight, setSummaryHeight] = useState(0);
    const [showAllSelected, setShowAllSelected] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredServices, setFilteredServices] = useState(services.services);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const searchInputRef = useRef(null);
    const searchButtonRef = useRef(null);

    // Calculate and update summary height when selection changes
    useEffect(() => {
        if (summaryRef.current && selectedServices.length > 0) {
            setSummaryHeight(summaryRef.current.offsetHeight);
        } else {
            setSummaryHeight(0);
        }
    }, [selectedServices, showAllSelected]);

    // Handle variant-specific services if needed
    useEffect(() => {
        if (variant) {
            console.log('Selected variant:', variant);
        }
    }, [variant]);

    // Handle click outside search suggestions
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

    const toggleService = (serviceName) => {
        setSelectedServices(prev => 
            prev.includes(serviceName) 
                ? prev.filter(name => name !== serviceName) 
                : [...prev, serviceName]
        );
    };

    const handleCheckout = () => {
        setIsLoading(true);
        setTimeout(() => {
            console.log('Proceeding with services:', selectedServices);
            setIsLoading(false);
        }, 800);
    };

    const totalPrice = useMemo(() => {
        return selectedServices.reduce((total, serviceName) => {
            const service = services.services.find(s => s.name === serviceName);
            return total + (service?.price || 1499);
        }, 0);
    }, [selectedServices]);

    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/300x200/f8f9fa/cccccc?text=Service+Image';
        e.target.style.objectFit = 'cover';
    };

    const updateSearchResults = (value) => {
        if (value.length > 0) {
            const matched = services.services.filter(service =>
                service.name.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(matched);
            setShowSuggestions(true);
            setFilteredServices(matched);
        } else {
            setShowSuggestions(false);
            setFilteredServices(services.services);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        updateSearchResults(value);
    };

    const handleSearchSubmit = () => {
        if (searchTerm.length > 0) {
            const matched = services.services.filter(service =>
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
        setFilteredServices(services.services);
        setShowSuggestions(false);
        searchInputRef.current.focus();
    };

    const displayedServices = showAllSelected 
        ? selectedServices 
        : selectedServices.slice(0, 3);

    return (
        <div className="services-modern-container">
            <div className="services-header">
                <h1 className="modern-title">
                    {modelName && variant 
                        ? `${modelName} (${variant.name}) Services` 
                        : modelName 
                            ? `${modelName} Services` 
                            : 'Select Services'}
                </h1>
                {selectedServices.length > 0 && (
                    <div className="selection-counter">
                        {selectedServices.length} {selectedServices.length === 1 ? 'item' : 'items'}
                    </div>
                )}
            </div>

            <div className="services-search-container">
                <div className="search-input-wrapper" ref={searchInputRef}>
                    <input
                        type="text"
                        placeholder="Search services..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
                        onKeyDown={handleKeyDown}
                        className="services-search-input"
                    />
                    {searchTerm && (
                        <button className="clear-search" onClick={clearSearch}>
                            ×
                        </button>
                    )}
                    <button 
                        className="search-icon-button" 
                        onClick={handleSearchSubmit}
                        ref={searchButtonRef}
                    >
                        <svg className="search-icon" viewBox="0 0 24 24" width="18" height="18">
                            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z" />
                        </svg>
                    </button>
                </div>

                {showSuggestions && suggestions.length > 0 && (
                    <div className="suggestions-dropdown">
                        {suggestions.map((service, index) => (
                            <div
                                key={index}
                                className="suggestion-item"
                                onClick={() => selectSuggestion(service)}
                            >
                                <img
                                    src={service.image}
                                    alt=""
                                    className="suggestion-image"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                                <span>{service.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div 
                className="modern-services-grid-wrapper"
                style={{ paddingBottom: selectedServices.length > 0 ? `${summaryHeight + 20}px` : '0' }}
            >
                {filteredServices.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                                <path d="M3 7V5A2 2 0 0 1 5 3H7M17 3H19A2 2 0 0 1 21 5V7M21 17V19A2 2 0 0 1 19 21H17M7 21H5A2 2 0 0 1 3 19V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <h3>No Services Found</h3>
                        <p>We couldn't find any services matching your search.</p>
                    </div>
                ) : (
                    <div className="modern-services-grid">
                        {filteredServices.map((service, index) => (
                            <div 
                                key={`${service.id || service.name}-${index}`}
                                className={`modern-service-card ${selectedServices.includes(service.name) ? 'selected' : ''}`}
                                onClick={() => toggleService(service.name)}
                                style={{ '--order': index }}
                                aria-label={`Select ${service.name} service`}
                                role="button"
                                tabIndex="0"
                            >
                                <div className="card-image-container">
                                    <div className="image-overlay"></div>
                                    <img 
                                        src={service.image} 
                                        alt={service.name}
                                        className="service-image"
                                        onError={handleImageError}
                                        loading="lazy"
                                    />
                                    <div className="selection-indicator">
                                        {selectedServices.includes(service.name) ? (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="12" r="9" fill="#4361ee"/>
                                                <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>
                                        ) : (
                                            <div className="selection-circle"></div>
                                        )}
                                    </div>
                                </div>
                                <div className="card-content">
                                    <h3>{service.name}</h3>
                                    <div className="service-meta">
                                        <span className="service-price">₹{service.price?.toLocaleString() || '1,499'}</span>
                                        <span className="service-time">{service.duration || '30-45 mins'}</span>
                                    </div>
                                </div>
                                {selectedServices.includes(service.name) && (
                                    <div className="selected-highlight"></div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedServices.length > 0 && (
                <div 
                    className="modern-selection-summary"
                    ref={summaryRef}
                >
                    <div className="summary-header">
                        <h2>Your Selection</h2>
                        <span className="count-badge">{selectedServices.length}</span>
                    </div>
                    
                    <div className="selected-services-list">
                        {displayedServices.map((service, index) => (
                            <div key={`selected-${index}`} className="selected-service-item">
                                <span>{service}</span>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleService(service);
                                    }}
                                    className="remove-service-btn"
                                    aria-label={`Remove ${service} from selection`}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </button>
                            </div>
                        ))}
                        
                        {selectedServices.length > 3 && !showAllSelected && (
                            <button 
                                className="view-more-btn"
                                onClick={() => setShowAllSelected(true)}
                            >
                                +{selectedServices.length - 3} more
                            </button>
                        )}
                        
                        {showAllSelected && selectedServices.length > 3 && (
                            <button 
                                className="view-less-btn"
                                onClick={() => setShowAllSelected(false)}
                            >
                                Show less
                            </button>
                        )}
                    </div>
                    
                    <div className="summary-footer">
                        <div className="total-price">
                            <span>Estimated Total:</span>
                            <span>₹{totalPrice.toLocaleString()}</span>
                        </div>
                        <button 
                            className="modern-cta-button"
                            onClick={handleCheckout}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="loading-spinner">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.99994L16.25 7.82837M4.92157 19.0784L7.75 16.25M4.92157 4.99994L7.75 7.82837" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </span>
                            ) : (
                                <>
                                    Continue to Checkout
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="arrow-icon">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Services;