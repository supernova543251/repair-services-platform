import React, { useState, useRef, useEffect } from "react";
import "./LoginOverlay.css";
import { ArrowLeft, Phone, KeyRound, X } from "lucide-react";
import { useLogin } from "../../Context/LoginContext/LoginContext";
import CustomerToast from "../CustomToast/CustomToast";

// Translation data
const loginTranslations = {
  en: {
    title: "FixFlash",
    subtitle: "Fast fixes, at your doorstep",
    mobileLabel: "Mobile Number",
    mobilePlaceholder: "Enter mobile number",
    continue: "Continue",
    otpLabel: "Enter OTP sent to",
    verify: "Verify OTP",
    verifying: "Verifying...",
    sendingOtp: "Sending OTP...",
    terms: "By continuing, you agree to FixFlash's",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    invalidMobile: "Please enter a valid 10-digit mobile number",
    testMode: "Test Mode: Any 6-digit OTP will work",
    otpSent: "OTP sent successfully!",
    otpFailed: "Failed to send OTP. Please try again.",
    verificationFailed: "OTP verification failed. Please try again.",
    loginSuccess: "Login successful!",
    skip: "Skip for now",
    skipNote: "You can login later from profile menu",
    loginToContinue: "Login to continue",
    welcomeBack: "Welcome back!",
    newUser: "New user? Create account"
  },
  hi: {
    title: "FixFlash",
    subtitle: "तेज़ सुधार, आपके द्वार पर",
    mobileLabel: "मोबाइल नंबर",
    mobilePlaceholder: "मोबाइल नंबर दर्ज करें",
    continue: "जारी रखें",
    otpLabel: "पर भेजा गया OTP दर्ज करें",
    verify: "OTP सत्यापित करें",
    verifying: "सत्यापित किया जा रहा है...",
    sendingOtp: "OTP भेजा जा रहा है...",
    terms: "जारी रखकर, आप FixFlash के",
    termsOfService: "सर्विस की शर्तें",
    privacyPolicy: "गोपनीयता नीति",
    invalidMobile: "कृपया एक वैध 10-अंकीय मोबाइल नंबर दर्ज करें",
    testMode: "टेस्ट मोड: कोई भी 6-अंकीय OTP काम करेगा",
    otpSent: "OTP सफलतापूर्वक भेजा गया!",
    otpFailed: "OTP भेजने में विफल। कृपया पुनः प्रयास करें।",
    verificationFailed: "OTP सत्यापन विफल। कृपया पुनः प्रयास करें।",
    loginSuccess: "लॉगिन सफल!",
    skip: "अभी छोड़ें",
    skipNote: "आप बाद में प्रोफाइल मेनू से लॉगिन कर सकते हैं",
    loginToContinue: "जारी रखने के लिए लॉगिन करें",
    welcomeBack: "वापसी पर स्वागत है!",
    newUser: "नए उपयोगकर्ता? अकाउंट बनाएं"
  },
  mr: {
    title: "FixFlash",
    subtitle: "जलद दुरुस्ती, तुमच्या दारात",
    mobileLabel: "मोबाइल नंबर",
    mobilePlaceholder: "मोबाइल नंबर प्रविष्ट करा",
    continue: "सुरू ठेवा",
    otpLabel: "वर पाठवलेला OTP प्रविष्ट करा",
    verify: "OTP सत्यापित करा",
    verifying: "सत्यापित केले जात आहे...",
    sendingOtp: "OTP पाठवला जात आहे...",
    terms: "सुरू ठेवून, तुम्ही FixFlash च्या",
    termsOfService: "सर्विस अट",
    privacyPolicy: "गोपनीयता धोरण",
    invalidMobile: "कृपया एक वैध 10-अंकी मोबाइल नंबर प्रविष्ट करा",
    testMode: "चाचणी मोड: कोणताही 6-अंकी OTP काम करेल",
    otpSent: "OTP यशस्वीरित्या पाठवला गेला!",
    otpFailed: "OTP पाठवण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.",
    verificationFailed: "OTP सत्यापन अयशस्वी. कृपया पुन्हा प्रयत्न करा.",
    loginSuccess: "लॉगिन यशस्वी!",
    skip: "आत्तासाठी वगळा",
    skipNote: "तुम्ही नंतर प्रोफाइल मेन्यूमधून लॉगिन करू शकता",
    loginToContinue: "सुरू ठेवण्यासाठी लॉगिन करा",
    welcomeBack: "परत येण्याबद्दल स्वागत!",
    newUser: "नवीन वापरकर्ता? खाते तयार करा"
  }
};

function LoginOverlay({ onClose, onLoginSuccess }) {
  const [step, setStep] = useState("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const inputsRef = useRef([]);
  const { sendOTP, verifyOTP, isTestMode } = useLogin();

  // Show toast function
  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  // Get language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && loginTranslations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
    
    const handleLanguageChange = () => {
      const lang = localStorage.getItem('preferredLanguage');
      if (lang && loginTranslations[lang]) {
        setCurrentLanguage(lang);
      }
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  // Handle mobile submit
  const handleContinue = async (e) => {
    e.preventDefault();
    setError("");
    
    if (mobile.length !== 10) {
      setError(loginTranslations[currentLanguage].invalidMobile);
      return;
    }

    setIsLoading(true);

    try {
      const response = await sendOTP(mobile);
      
      if (response.success) {
        setStep("otp");
        setIsNewUser(response.data.isNewUser);
        // Show success message using toast instead of alert
        if (!isTestMode) {
          showToastMessage(loginTranslations[currentLanguage].otpSent, "success");
        }
      } else {
        setError(response.message || loginTranslations[currentLanguage].otpFailed);
      }
    } catch (error) {
      setError(error.message || loginTranslations[currentLanguage].otpFailed);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP input
  const handleOtpChange = (value, index) => {
    // Only allow numbers and empty string
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next box
      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }

      // Auto-submit when OTP is complete (all 6 digits filled)
      const completeOtp = newOtp.join("");
      if (completeOtp.length === 6) {
        // Use setTimeout to ensure state is updated before calling handleLogin
        setTimeout(() => {
          handleLogin(completeOtp);
        }, 100);
      }
    }
  };

  const handleLogin = async (otpString = null) => {
    const finalOtp = otpString || otp.join("");
    
    if (finalOtp.length !== 6) {
      setError("Please enter 6-digit OTP");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await verifyOTP(mobile, finalOtp);
      
      if (response.success) {
        showToastMessage(loginTranslations[currentLanguage].loginSuccess, "success");
        
        // Call onLoginSuccess
        if (onLoginSuccess) {
          onLoginSuccess();
        }
        
      } else {
        throw new Error(response.message || loginTranslations[currentLanguage].verificationFailed);
      }
      
    } catch (error) {
      setError(error.message || loginTranslations[currentLanguage].verificationFailed);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle back button
  const handleBackClick = () => {
    if (step === "otp") {
      setStep("mobile");
      setOtp(["", "", "", "", "", ""]);
      setError("");
    } else {
      setStep("mobile");
      setMobile("");
      setError("");
    }
  };

  // Handle skip/close
  const handleSkip = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        {/* Back button */}
        <button
          className="back-btn"
          onClick={handleBackClick}
          disabled={isLoading}
        >
          <ArrowLeft size={20} />
        </button>

        {/* Close button */}
        <button 
          className="close-login-btn" 
          onClick={handleSkip}
          disabled={isLoading}
        >
          <X size={20} />
        </button>

        {/* Branding */}
        <div className="brand-section">
          <div className="brand-logo">⚡</div>
          <h2 className="brand-title">{loginTranslations[currentLanguage].title}</h2>
          <p className="brand-subtitle">{loginTranslations[currentLanguage].subtitle}</p>
        </div>

        {/* Welcome message */}
        <div className="welcome-message">
          <h3>{loginTranslations[currentLanguage].loginToContinue}</h3>
          <p>{isNewUser ? loginTranslations[currentLanguage].newUser : loginTranslations[currentLanguage].welcomeBack}</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {step === "mobile" ? (
          // MOBILE STEP
          <form onSubmit={handleContinue} className="login-form">
            <label className="mobile-label">
              <Phone size={16} /> {loginTranslations[currentLanguage].mobileLabel}
            </label>
            <div className="input-wrapper">
              <span className="country-code">+91</span>
              <input
                type="tel"
                maxLength="10"
                placeholder={loginTranslations[currentLanguage].mobilePlaceholder}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                required
                disabled={isLoading}
                className="multilingual-text"
                style={{fontFamily: "'Noto Sans', 'Noto Sans Devanagari', sans-serif"}}
              />
            </div>
            <button 
              type="submit" 
              className="continue-btn" 
              disabled={isLoading || mobile.length !== 10}
            >
              {isLoading ? loginTranslations[currentLanguage].sendingOtp : loginTranslations[currentLanguage].continue}
            </button>
          </form>
        ) : (
          // OTP STEP
          <div className="otp-section">
            <label className="mobile-label">
              <KeyRound size={16} /> {loginTranslations[currentLanguage].otpLabel} +91 {mobile}
            </label>
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="1"
                  value={digit}
                  ref={(el) => (inputsRef.current[index] = el)}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => {
                    // Allow backspace and delete
                    if (e.key === 'Backspace' && !digit && index > 0) {
                      inputsRef.current[index - 1].focus();
                    }
                  }}
                  disabled={isLoading}
                  className="multilingual-text"
                  style={{fontFamily: "'Noto Sans', 'Noto Sans Devanagari', sans-serif"}}
                />
              ))}
            </div>
            <button
              className="continue-btn"
              onClick={() => handleLogin()}
              disabled={isLoading || otp.join("").length !== 6}
              style={{fontFamily: "'Noto Sans', 'Noto Sans Devanagari', sans-serif"}}
            >
              {isLoading ? loginTranslations[currentLanguage].verifying : loginTranslations[currentLanguage].verify}
            </button>
            
            {/* Test info */}
            {isTestMode && (
              <div className="test-mode-info">
                <p><strong>{loginTranslations[currentLanguage].testMode}</strong></p>
              </div>
            )}
          </div>
        )}

        {/* Skip login section */}
        <div className="skip-login-section">
          <button 
            className="skip-login-btn"
            onClick={handleSkip}
            disabled={isLoading}
          >
            {loginTranslations[currentLanguage].skip}
          </button>
          <p className="skip-note">{loginTranslations[currentLanguage].skipNote}</p>
        </div>

        <p className="terms">
          {loginTranslations[currentLanguage].terms}{" "}
          <a href="#">{loginTranslations[currentLanguage].termsOfService}</a> &{" "}
          <a href="#">{loginTranslations[currentLanguage].privacyPolicy}</a>.
        </p>
      </div>

      {/* Toast Component */}
      {showToast && (
        <CustomerToast
          message={toastMessage}
          type={toastType}
          duration={3000}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

export default LoginOverlay;