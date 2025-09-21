// LoginOverlay.js (with test login)
import React, { useState, useRef, useEffect } from "react";
import "./LoginOverlay.css";
import { ArrowLeft, Phone, KeyRound } from "lucide-react";
import { useLogin } from "../../Context/LoginContext/LoginContext";

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
    terms: "By continuing, you agree to FixFlash's",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    invalidMobile: "Please enter a valid 10-digit mobile number",
    testMode: "Test Mode: Any 6-digit OTP will work"
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
    terms: "जारी रखकर, आप FixFlash के",
    termsOfService: "सर्विस की शर्तें",
    privacyPolicy: "गोपनीयता नीति",
    invalidMobile: "कृपया एक वैध 10-अंकीय मोबाइल नंबर दर्ज करें",
    testMode: "टेस्ट मोड: कोई भी 6-अंकीय OTP काम करेगा"
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
    terms: "सुरू ठेवून, तुम्ही FixFlash च्या",
    termsOfService: "सर्विस अट",
    privacyPolicy: "गोपनीयता धोरण",
    invalidMobile: "कृपया एक वैध 10-अंकी मोबाइल नंबर प्रविष्ट करा",
    testMode: "चाचणी मोड: कोणताही 6-अंकी OTP काम करेल"
  }
};

function LoginOverlay({ onClose, onLoginSuccess }) {
  const [step, setStep] = useState("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const inputsRef = useRef([]);
  const { login } = useLogin();

  // Get language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && loginTranslations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
    
    // Listen for language changes
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
  const handleContinue = (e) => {
    e.preventDefault();
    if (mobile.length === 10) {
      setStep("otp");
    } else {
      alert(loginTranslations[currentLanguage].invalidMobile);
    }
  };

  // Handle OTP input
  const handleOtpChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next box
      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }

      // Auto-submit when OTP is complete (for testing)
      if (newOtp.join("").length === 6) {
        handleLogin();
      }
    }
  };

  const handleLogin = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // For testing, any OTP works
      const userData = {
        name: "Test User",
        phone: mobile,
        email: `user-${mobile}@example.com`
      };
      
      login(userData);
      onLoginSuccess && onLoginSuccess();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        {/* Back button */}
        <button
          className="back-btn"
          onClick={() => (step === "otp" ? setStep("mobile") : onClose())}
          disabled={isLoading}
        >
          <ArrowLeft size={20} />
        </button>

        {/* Branding */}
        <div className="brand-section">
          <div className="brand-logo">⚡</div>
          <h2 className="brand-title">{loginTranslations[currentLanguage].title}</h2>
          <p className="brand-subtitle">{loginTranslations[currentLanguage].subtitle}</p>
        </div>

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
            <button type="submit" className="continue-btn" disabled={isLoading}>
              {loginTranslations[currentLanguage].continue}
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
                  maxLength="1"
                  value={digit}
                  ref={(el) => (inputsRef.current[index] = el)}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  disabled={isLoading}
                  className="multilingual-text"
                  style={{fontFamily: "'Noto Sans', 'Noto Sans Devanagari', sans-serif"}}
                />
              ))}
            </div>
            <button
              className="continue-btn"
              onClick={handleLogin}
              disabled={isLoading}
              style={{fontFamily: "'Noto Sans', 'Noto Sans Devanagari', sans-serif"}}
            >
              {isLoading ? loginTranslations[currentLanguage].verifying : loginTranslations[currentLanguage].verify}
            </button>
            
            {/* Test info - only visible during development */}
            {process.env.NODE_ENV === 'development' && (
              <div style={{marginTop: '15px', fontSize: '13px', color: '#666'}}>
                <p><strong>{loginTranslations[currentLanguage].testMode}</strong></p>
              </div>
            )}
          </div>
        )}

        <p className="terms">
          {loginTranslations[currentLanguage].terms}{" "}
          <a href="#">{loginTranslations[currentLanguage].termsOfService}</a> &{" "}
          <a href="#">{loginTranslations[currentLanguage].privacyPolicy}</a>.
        </p>
      </div>
    </div>
  );
}

export default LoginOverlay;