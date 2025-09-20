import React from 'react';
import { Info, Clock, Shield, Users, Award, Phone, Check, Settings } from 'lucide-react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="fixflash-about-container">
      {/* Header Section */}
      <header className="fixflash-about-header">
        <div className="fixflash-header-content">
          <Info size={42} className="fixflash-info-icon" />
          <h1 className="fixflash-main-heading">About FixFlash</h1>
          <p className="fixflash-header-subtitle">Your trusted repair partner for all devices</p>
        </div>
      </header>

      {/* Intro Section */}
      <section className="fixflash-intro-section">
        <div className="fixflash-section-content">
          <p className="fixflash-intro-text">
            FixFlash is your trusted repair partner for smartphones, tablets, laptops, and more—offering fast, reliable, and affordable solutions. With expert technicians, genuine parts, and a customer-first approach, we make sure every repair is hassle-free and handled with care.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="fixflash-mission-section">
        <div className="fixflash-section-content">
          <div className="fixflash-text-content">
            <h2 className="fixflash-section-heading">Our Mission</h2>
            <p className="fixflash-section-text">To provide exceptional device repair services that are fast, reliable, and affordable. We're committed to getting your devices back to optimal performance with minimal downtime.</p>
          </div>
          <div className="fixflash-icon-content">
            <Clock size={52} className="fixflash-section-icon" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="fixflash-services-section">
        <h2 className="fixflash-section-heading-center">Our Services</h2>
        <div className="fixflash-services-grid">
          <div className="fixflash-service-card">
            <div className="fixflash-service-icon">
              <Phone size={32} />
            </div>
            <h3 className="fixflash-service-title">Smartphone Repairs</h3>
            <p className="fixflash-service-description">Screen replacements, battery issues, and more</p>
          </div>
          <div className="fixflash-service-card">
            <div className="fixflash-service-icon">
              <Phone size={32} />
            </div>
            <h3 className="fixflash-service-title">Tablet Repairs</h3>
            <p className="fixflash-service-description">Display, charging port, and internal repairs</p>
          </div>
          <div className="fixflash-service-card">
            <div className="fixflash-service-icon">
              <Phone size={32} />
            </div>
            <h3 className="fixflash-service-title">Laptop Repairs</h3>
            <p className="fixflash-service-description">Hardware, software, and performance issues</p>
          </div>
          <div className="fixflash-service-card">
            <div className="fixflash-service-icon">
              <Settings size={32} />
            </div>
            <h3 className="fixflash-service-title">Other Devices</h3>
            <p className="fixflash-service-description">Smartwatches, headphones, and more</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="fixflash-values-section">
        <h2 className="fixflash-section-heading-center">Why Choose FixFlash</h2>
        <div className="fixflash-values-grid">
          <div className="fixflash-value-card">
            <div className="fixflash-value-icon">
              <Award size={36} />
            </div>
            <h3 className="fixflash-value-title">Expert Technicians</h3>
            <p className="fixflash-value-text">Our certified technicians have years of experience with all device types.</p>
          </div>
          <div className="fixflash-value-card">
            <div className="fixflash-value-icon">
              <Shield size={36} />
            </div>
            <h3 className="fixflash-value-title">Genuine Parts</h3>
            <p className="fixflash-value-text">We use only high-quality, genuine parts for all repairs.</p>
          </div>
          <div className="fixflash-value-card">
            <div className="fixflash-value-icon">
              <Clock size={36} />
            </div>
            <h3 className="fixflash-value-title">Fast Service</h3>
            <p className="fixflash-value-text">Most repairs completed within hours, not days.</p>
          </div>
          <div className="fixflash-value-card">
            <div className="fixflash-value-icon">
              <Users size={36} />
            </div>
            <h3 className="fixflash-value-title">Customer First</h3>
            <p className="fixflash-value-text">Your satisfaction is our top priority in everything we do.</p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="fixflash-trust-section">
        <div className="fixflash-trust-content">
          <h2 className="fixflash-section-heading-center">Our Promise</h2>
          <p className="fixflash-trust-text">
            Whether it's a cracked screen, battery replacement, or technical fault, FixFlash brings your devices back to life quickly and efficiently, because we believe your gadgets deserve the best.
          </p>
          <ul className="fixflash-trust-list">
            <li className="fixflash-trust-item">
              <Check size={20} className="fixflash-check-icon" />
              <span>12-month warranty on all repairs</span>
            </li>
            <li className="fixflash-trust-item">
              <Check size={20} className="fixflash-check-icon" />
              <span>Free diagnostic assessment</span>
            </li>
            <li className="fixflash-trust-item">
              <Check size={20} className="fixflash-check-icon" />
              <span>Transparent pricing with no hidden fees</span>
            </li>
            <li className="fixflash-trust-item">
              <Check size={20} className="fixflash-check-icon" />
              <span>Quick turnaround time</span>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="fixflash-cta-section">
        <div className="fixflash-cta-content">
          <h2 className="fixflash-cta-heading">Ready to Repair Your Device?</h2>
          <p className="fixflash-cta-text">Get in touch with us today for a free quote and quick service.</p>
          <button className="fixflash-cta-button">Contact Us Now</button>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;