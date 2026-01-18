import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import BrandPage from './pages/BrandPage/BrandPage';
import ModelPage from './pages/ServicesPagesFolder/ModelPage/ModelPage';
import ServicesPage from './pages/ServicesPagesFolder/ServicesPage/ServicesPage';
import ServiceCenterList from './pages/ServiceCenterList/ServiceCenterList';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { LoginProvider, useLogin } from './Context/LoginContext/LoginContext';
import { ToastProvider } from './Context/ToastContext/ToastContext';
import YourOrders from './pages/YourOrders/YourOrders';
import AccountAndPrivacy from './pages/AccountAndPrivacy/AccountAndPrivacy';
import Addresses from './pages/Addresses/Addresses';
import HelpAndSupport from './pages/HelpAndSupport/HelpAndSupport';
import AboutUs from './pages/AboutUs/AboutUs';
import HomePage from './pages/HomePage/HomePage';
import ConfirmOrder from './pages/ConfirmOrderOverlay/ConfirmOrder';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoutes';
import Welcome from './components/Welcome/Welcome';
import LoginOverlay from './components/LoginOverlay/LoginOverlay';

// ScrollToTop Component
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, [pathname]);

    return null;
};

function AppContent() {
    const [showWelcome, setShowWelcome] = useState(false);
    const [showLoginOverlay, setShowLoginOverlay] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthChecking, setIsAuthChecking] = useState(true);
    const { isLoggedIn, isLoading: isLoginLoading } = useLogin();
    const hasAutoTriggered = useRef(false);

    // Check if we just refreshed due to language change
    const [languageChangeRefresh, setLanguageChangeRefresh] = useState(() => {
        return sessionStorage.getItem('languageChange') === 'true';
    });

    // Initial app loading
    useEffect(() => {
        // Check if user has visited before for Welcome overlay
        const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
        
        // Get saved language preference
        const savedLanguage = localStorage.getItem('preferredLanguage');
        
        // Show welcome screen only if user hasn't visited before
        if (!hasVisitedBefore) {
            setShowWelcome(true);
            document.body.classList.add('welcome-open');
        } else if (savedLanguage) {
            // Set HTML lang attribute if language is saved
            document.documentElement.lang = savedLanguage;
        } else {
            // Set default language to English
            document.documentElement.lang = 'en';
        }
        
        // Clear language change flag after checking
        sessionStorage.removeItem('languageChange');
        
        setIsLoading(false);
    }, []);

    // Watch for auth loading state
    useEffect(() => {
        // When login context finishes loading, stop auth checking
        if (!isLoginLoading) {
            setIsAuthChecking(false);
        }
    }, [isLoginLoading]);

    useEffect(() => {
        // Show login overlay when user is NOT logged in (after Welcome overlay closes)
        if (!isLoggedIn && !showWelcome && !isAuthChecking) {
            setShowLoginOverlay(true);
            document.body.classList.add('login-open');
            hasAutoTriggered.current = false; // Reset for next login
        } else {
            setShowLoginOverlay(false);
            document.body.classList.remove('login-open');
        }
    }, [isLoggedIn, showWelcome, isAuthChecking]);

    // Auto-click navbar location selector when user is logged in (only first time in session)
    useEffect(() => {
        // Don't auto-click if we just refreshed due to language change OR auth is still checking
        if (!languageChangeRefresh && isLoggedIn && !showWelcome && !hasAutoTriggered.current && !isAuthChecking) {
            // Check if auto-show was already done in this session (not on refreshes)
            const autoLocationShown = sessionStorage.getItem('autoLocationShown');
            
            if (!autoLocationShown) {
                // Wait for navbar to be fully rendered
                const timer = setTimeout(() => {
                    // Find and click the location selector in navbar (skip disabled ones)
                    const locationSelector = document.querySelector('.location-selector:not(.location-selector-disabled)');
                    if (locationSelector) {
                        console.log('Auto-clicking location selector (first time in session)...');
                        locationSelector.click();
                        hasAutoTriggered.current = true;
                        // Mark that we auto-showed location overlay in this session
                        sessionStorage.setItem('autoLocationShown', 'true');
                    }
                }, 300); // Small delay to ensure DOM is ready
                
                return () => clearTimeout(timer);
            } else {
                // Auto-show was already done in this session, don't show again
                hasAutoTriggered.current = true;
            }
        }
    }, [isLoggedIn, showWelcome, languageChangeRefresh, isAuthChecking]);

    // Reset auto-trigger when user logs out (new session starts)
    useEffect(() => {
        if (!isLoggedIn) {
            hasAutoTriggered.current = false;
            // Don't clear sessionStorage for autoLocationShown - it should persist for the session
        }
    }, [isLoggedIn]);

    useEffect(() => {
        // Add/remove body class for preventing scroll
        if (showWelcome) {
            document.body.classList.add('welcome-open');
        } else {
            document.body.classList.remove('welcome-open');
        }
        
        if (showLoginOverlay) {
            document.body.classList.add('login-open');
        } else {
            document.body.classList.remove('login-open');
        }
        
        // Cleanup
        return () => {
            document.body.classList.remove('welcome-open');
            document.body.classList.remove('login-open');
        };
    }, [showWelcome, showLoginOverlay]);

    const handleLanguageSelect = (selectedLanguage) => {
        // Save language preference
        localStorage.setItem('preferredLanguage', selectedLanguage);
        localStorage.setItem('hasVisitedBefore', 'true');
        
        // Set HTML lang attribute
        document.documentElement.lang = selectedLanguage;
        
        // Remove body class
        document.body.classList.remove('welcome-open');
        
        // Close welcome screen
        setShowWelcome(false);
        
        // Trigger language change event for other components
        window.dispatchEvent(new CustomEvent('languageChanged'));
        
        // Refresh the page to apply language changes to all components
        setTimeout(() => {
            window.location.reload();
        }, 100);
    };

    const handleCloseWelcome = () => {
        // Set default to English if user skips
        if (!localStorage.getItem('preferredLanguage')) {
            localStorage.setItem('preferredLanguage', 'en');
            document.documentElement.lang = 'en';
        }
        
        // Mark as visited
        localStorage.setItem('hasVisitedBefore', 'true');
        
        // Remove body class
        document.body.classList.remove('welcome-open');
        
        // Close welcome screen
        setShowWelcome(false);
        
        // Trigger language change event
        window.dispatchEvent(new CustomEvent('languageChanged'));
    };

    const handleCloseLoginOverlay = () => {
        // User can close it, but it will show again next time
        setShowLoginOverlay(false);
        document.body.classList.remove('login-open');
    };

    const handleLoginSuccess = () => {
        // Login successful
        setShowLoginOverlay(false);
        document.body.classList.remove('login-open');
        
        // Reset auto-trigger so location selector will be clicked
        hasAutoTriggered.current = false;
        
        // Small delay to ensure navbar renders after login
        setTimeout(() => {
            // Check if auto-show was already done in this session
            const autoLocationShown = sessionStorage.getItem('autoLocationShown');
            
            if (!autoLocationShown) {
                // Auto-click location selector after successful login
                const locationSelector = document.querySelector('.location-selector:not(.location-selector-disabled)');
                if (locationSelector) {
                    console.log('Auto-clicking location selector after login (first time in session)...');
                    locationSelector.click();
                    hasAutoTriggered.current = true;
                    // Mark that we auto-showed location overlay in this session
                    sessionStorage.setItem('autoLocationShown', 'true');
                }
            }
        }, 500);
    };

    // Show loading spinner while auth is checking
    if (isAuthChecking || isLoading) {
        return (
            <div className="global-loading-overlay">
                <div className="global-loading-spinner"></div>
            </div>
        );
    }

    return (
        <>
            {showWelcome && (
                <Welcome 
                    onLanguageSelect={handleLanguageSelect}
                    onClose={handleCloseWelcome}
                />
            )}
            
            {showLoginOverlay && (
                <LoginOverlay 
                    onClose={handleCloseLoginOverlay}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
            
            <div className="App">
                <Navbar />
                <ScrollToTop />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage/>} />
                        <Route path="/brand" element={<BrandPage />} />
                        <Route path="/brand/:brand" element={<ModelPage />} />
                        
                        {/* NEW: Service Center List Route */}
                        <Route path="/brand/:brand/:model/service-centers" element={<ServiceCenterList />} />
                        
                        {/* Updated Services Route - now receives serviceCenterId from ServiceCenterList */}
                        <Route path="/services" element={<ServicesPage />} />
                        
                        {/* Protected Routes */}
                        <Route 
                            path="/confirm-order" 
                            element={
                                <ProtectedRoute>
                                    <ConfirmOrder />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/your-orders" 
                            element={
                                <ProtectedRoute>
                                    <YourOrders />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/account-privacy" 
                            element={
                                <ProtectedRoute>
                                    <AccountAndPrivacy />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/addresses" 
                            element={
                                <ProtectedRoute>
                                    <Addresses />
                                </ProtectedRoute>
                            } 
                        />
                        
                        {/* Public Routes */}
                        <Route path="/help-support" element={<HelpAndSupport />} />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
                <Footer/>
            </div>
        </>
    );
}

function App() {
    return (
        <LoginProvider>
            <ToastProvider>
                <AppContent />
            </ToastProvider>
        </LoginProvider>
    );
}

export default App;