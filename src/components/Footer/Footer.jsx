import React, { useState } from "react";
import "./Footer.css";
import { ChevronDown, ChevronUp } from "lucide-react";

function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <footer className="footer">
      {/* Header always visible */}
      <div className="footer-header">
        <span className="footer-logo">FixFlash</span>
      </div>

      {/* Collapsible Toggle (mobile & tablet only) */}
      <div className="footer-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span>More about FixFlash</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>

      {/* Footer Content */}
      <div className={`footer-container ${isOpen ? "show" : "hide"}`}>
        <div className="footer-section">
          <h3>About</h3>
          <p className="footer-about">
            FixFlash is your trusted phone repair and service partner.
            We deliver quick, reliable, and affordable solutions for
            all smartphone issues.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/">Services</a></li>
            <li><a href="/help-support">Support</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: support@fixflash.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://x.com/fixflash" target="_blank" rel="noreferrer">X</a>
            <a href="https://instagram.com/fixflash" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
      </div>

      {/* Always visible bottom bar */}
      <div className="footer-bottom">
        © 2025 FixFlash. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
