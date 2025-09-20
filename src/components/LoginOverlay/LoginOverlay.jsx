// LoginOverlay.js (with test login)
import React, { useState, useRef } from "react";
import "./LoginOverlay.css";
import { ArrowLeft, Phone, KeyRound } from "lucide-react";
import { useLogin } from "../../Context/LoginContext/LoginContext";

function LoginOverlay({ onClose, onLoginSuccess }) {
  const [step, setStep] = useState("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const inputsRef = useRef([]);
  const { login } = useLogin();

  // Handle mobile submit
  const handleContinue = (e) => {
    e.preventDefault();
    if (mobile.length === 10) {
      setStep("otp");
    } else {
      alert("Please enter a valid 10-digit mobile number");
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
          <h2 className="brand-title">FixFlash</h2>
          <p className="brand-subtitle">Fast fixes, at your doorstep</p>
        </div>

        {step === "mobile" ? (
          // MOBILE STEP
          <form onSubmit={handleContinue} className="login-form">
            <label className="mobile-label">
              <Phone size={16} /> Mobile Number
            </label>
            <div className="input-wrapper">
              <span className="country-code">+91</span>
              <input
                type="tel"
                maxLength="10"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                required
                disabled={isLoading}
              />
            </div>
            <button type="submit" className="continue-btn" disabled={isLoading}>
              Continue
            </button>
          </form>
        ) : (
          // OTP STEP
          <div className="otp-section">
            <label className="mobile-label">
              <KeyRound size={16} /> Enter OTP sent to +91 {mobile}
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
                />
              ))}
            </div>
            <button
              className="continue-btn"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
            
            {/* Test info - only visible during development */}
            {process.env.NODE_ENV === 'development' && (
              <div style={{marginTop: '15px', fontSize: '13px', color: '#666'}}>
                <p><strong>Test Mode:</strong> Any 6-digit OTP will work</p>
              </div>
            )}
          </div>
        )}

        <p className="terms">
          By continuing, you agree to FixFlash's{" "}
          <a href="#">Terms of Service</a> & <a href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}

export default LoginOverlay;