import React, { useState } from 'react';
import { Search, X, Navigation, Plus } from 'lucide-react';
import AddressForm from '../AddressForm/AddressForm';
import './LocationPicker.css';

// Translation data moved to this component
const locationPickerTranslations = {
    en: {
        searchPlaceholder: "Search delivery location...",
        currentLocation: "Use Current Location",
        currentLocationDesc: "Get your precise location",
        addAddress: "Add Address Manually",
        addAddressDesc: "Enter your address"
    },
    hi: {
        searchPlaceholder: "डिलीवरी स्थान खोजें...",
        currentLocation: "वर्तमान स्थान का उपयोग करें",
        currentLocationDesc: "अपना सटीक स्थान प्राप्त करें",
        addAddress: "मैन्युअल रूप से पता जोड़ें",
        addAddressDesc: "अपना पता दर्ज करें"
    },
    mr: {
        searchPlaceholder: "डिलिवरी स्थान शोधा...",
        currentLocation: "सध्याचे स्थान वापरा",
        currentLocationDesc: "तुमचे अचूक स्थान मिळवा",
        addAddress: "स्वतःहून पत्ता जोडा",
        addAddressDesc: "तुमचा पत्ता प्रविष्ट करा"
    }
};

const LocationPicker = ({ currentLanguage = 'en', onSelectLocation, onAddAddress, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);

    // Use provided language or default to 'en'
    const language = currentLanguage && locationPickerTranslations[currentLanguage] 
        ? currentLanguage 
        : 'en';

    const translations = locationPickerTranslations[language];

    return (
        <div className="lp-container">
            {/* Search Bar */}
            <div className="lp-search-container">
                <Search className="lp-search-icon" size={20} />
                <input
                    type="text"
                    placeholder={translations.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="lp-search-input multilingual-text"
                    style={{ fontFamily: "'Noto Sans', 'Noto Sans Devanagari', sans-serif" }}
                />
                {searchQuery && (
                    <button className="lp-clear-btn" onClick={() => setSearchQuery('')}>
                        <X size={18} />
                    </button>
                )}
            </div>

            {/* Location Options - Side by Side */}
            <div className="lp-location-options">
                {/* Current Location Button */}
                <div
                    className="lp-location-option"
                    onClick={() => {
                        if (onSelectLocation) {
                            onSelectLocation({ type: 'Current', address: 'Your current location' });
                        }
                        if (onClose) onClose();
                    }}
                >
                    <div className="lp-option-icon">
                        <Navigation size={20} />
                    </div>
                    <div className="lp-option-text">
                        <h3 className="multilingual-text">{translations.currentLocation}</h3>
                        <p className="multilingual-text">{translations.currentLocationDesc}</p>
                    </div>
                </div>

                {/* Add Address Manually Button */}
                <div
                    className="lp-location-option"
                    onClick={() => setIsAddressFormOpen(true)}
                >
                    <div className="lp-option-icon manual">
                        <Plus size={20} />
                    </div>
                    <div className="lp-option-text">
                        <h3 className="multilingual-text">{translations.addAddress}</h3>
                        <p className="multilingual-text">{translations.addAddressDesc}</p>
                    </div>
                </div>
            </div>

            {/* Address Form Modal */}
            {isAddressFormOpen && (
                <div className="address-form-modal">
                    <AddressForm
                        onClose={() => setIsAddressFormOpen(false)}
                        onSave={(address) => {
                            if (onAddAddress) {
                                onAddAddress(address);
                            }
                            setIsAddressFormOpen(false);
                            if (onClose) onClose();
                        }}
                        currentLanguage={language}
                    />
                </div>
            )}
        </div>
    );
};

export default LocationPicker;