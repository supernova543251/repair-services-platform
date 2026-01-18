import React, { useState, useRef, useEffect } from 'react';
import { X, Globe, ChevronDown, Check } from 'lucide-react';
import './Welcome.css';

// Multi-language content
const welcomeContent = {
    en: {
        title: "Welcome",
        subtitle: "Choose your preferred language to get started",
        chooseLanguage: "Select Language",
        english: "English",
        hindi: "Hindi",
        marathi: "Marathi",
        okButton: "Continue",
        skipButton: "Skip for now",
        note: "You can change language anytime from settings",
        welcomeText: "Welcome"
    },
    hi: {
        title: "स्वागत",
        subtitle: "शुरू करने के लिए अपनी पसंदीदा भाषा चुनें",
        chooseLanguage: "भाषा चुनें",
        english: "अंग्रेज़ी",
        hindi: "हिंदी",
        marathi: "मराठी",
        okButton: "जारी रखें",
        skipButton: "अभी छोड़ें",
        note: "आप कभी भी सेटिंग्स से भाषा बदल सकते हैं",
        welcomeText: "स्वागत"
    },
    mr: {
        title: "स्वागत आहे",
        subtitle: "सुरू करण्यासाठी तुमची पसंतीची भाषा निवडा",
        chooseLanguage: "भाषा निवडा",
        english: "इंग्रजी",
        hindi: "हिंदी",
        marathi: "मराठी",
        okButton: "सुरू ठेवा",
        skipButton: "आत्तासाठी वगळा",
        note: "तुम्ही सेटिंग्जमधून कधीही भाषा बदलू शकता",
        welcomeText: "स्वागतम्"
    }
};

const Welcome = ({ onLanguageSelect, onClose }) => {
    // Detect browser language for initial display
    const detectBrowserLanguage = () => {
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('hi')) return 'hi';
        if (browserLang.startsWith('mr')) return 'mr';
        return 'en';
    };
    
    const [selectedLanguage, setSelectedLanguage] = useState(detectBrowserLanguage());
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleConfirm = () => {
        // Save language preference to localStorage
        localStorage.setItem('preferredLanguage', selectedLanguage);
        localStorage.setItem('hasVisitedBefore', 'true');
        
        // Set HTML lang attribute
        document.documentElement.lang = selectedLanguage;
        
        // Trigger language change event
        window.dispatchEvent(new CustomEvent('languageChanged'));
        
        // Close welcome screen
        onLanguageSelect(selectedLanguage);
    };

    const languages = [
        { 
            code: 'en', 
            name: "English",
            nativeName: 'English',
            flag: "🇬🇧"
        },
        { 
            code: 'hi', 
            name: "Hindi",
            nativeName: 'हिंदी',
            flag: "🇮🇳"
        },
        { 
            code: 'mr', 
            name: "Marathi",
            nativeName: 'मराठी',
            flag: "🇮🇳"
        }
    ];

    const handleLanguageSelect = (langCode) => {
        setSelectedLanguage(langCode);
        setIsDropdownOpen(false);
    };

    const currentLanguage = languages.find(lang => lang.code === selectedLanguage);
    const content = welcomeContent[selectedLanguage];

    return (
        <div className="welcome-overlay">
            <div className="welcome-container">
                {/* Close button */}
                <button 
                    className="welcome-close-btn" 
                    onClick={onClose} 
                    aria-label="Close welcome"
                >
                    <X size={20} />
                </button>

                {/* Welcome Header */}
                <div className="welcome-header">
                    <div className="welcome-icon">
                        <Globe size={40} />
                    </div>
                    <h1 className="welcome-title">
                        {content.title}
                    </h1>
                    <p className="welcome-subtitle">
                        {content.subtitle}
                    </p>
                </div>

                {/* Welcome Text Display */}
                <div className="welcome-text-display">
                    <div className="welcome-text-wrapper">
                        <span className="welcome-text-main">
                            {content.welcomeText}
                        </span>
                        <div className="welcome-text-underline"></div>
                        <span className="welcome-text-label">
                            {currentLanguage?.name} Welcome
                        </span>
                    </div>
                </div>

                {/* Language Dropdown */}
                <div className="language-section">
                    <div className="dropdown-label">
                        {content.chooseLanguage}
                    </div>
                    <div className="language-dropdown-container" ref={dropdownRef}>
                        <button 
                            className="language-dropdown-btn"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            aria-expanded={isDropdownOpen}
                            aria-haspopup="true"
                        >
                            <div className="selected-language-info">
                                <span className="selected-language-flag">
                                    {currentLanguage?.flag}
                                </span>
                                <div className="selected-language-text">
                                    <span className="selected-language-name">
                                        {currentLanguage?.name}
                                    </span>
                                    <span className="selected-language-native">
                                        {currentLanguage?.nativeName}
                                    </span>
                                </div>
                            </div>
                            <ChevronDown 
                                size={20} 
                                className={`dropdown-chevron ${isDropdownOpen ? 'rotate' : ''}`}
                            />
                        </button>
                        
                        {isDropdownOpen && (
                            <div className="language-dropdown-menu">
                                {languages.map(lang => (
                                    <button
                                        key={lang.code}
                                        className={`dropdown-item ${selectedLanguage === lang.code ? 'selected' : ''}`}
                                        onClick={() => handleLanguageSelect(lang.code)}
                                    >
                                        <div className="dropdown-item-left">
                                            <span className="item-flag">{lang.flag}</span>
                                            <div className="item-text">
                                                <span className="item-name">{lang.name}</span>
                                                <span className="item-native">{lang.nativeName}</span>
                                            </div>
                                        </div>
                                        {selectedLanguage === lang.code && (
                                            <Check size={18} className="check-icon" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="welcome-actions">
                    <button className="btn-confirm" onClick={handleConfirm}>
                        {content.okButton}
                    </button>
                    <button className="btn-skip" onClick={onClose}>
                        {content.skipButton}
                    </button>
                </div>

                <div className="welcome-note">
                    <p>{content.note}</p>
                </div>
            </div>
        </div>
    );
};

export default Welcome;