import React, { useState, useEffect } from 'react';
import "./HelpAndSupport.css";
import { Phone, MessageCircle, AlertCircle, ShieldCheck, FileText, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Translations
const translations = {
  en: {
    headerTitle: "Help & Support",
    headerSubtitle: "Quick assistance for repair issues and warranty claims",
    whatsappTitle: "WhatsApp Support",
    whatsappDesc: "Send details and photos",
    responseTime: "Fast Response",
    startWhatsapp: "Start Chat",
    callTitle: "Call Support",
    callDesc: "Talk directly with our team",
    availableTime: "Always Available",
    callNow: "Call Now",
    supportedIssues: "Supported Issues",
    issueNotFixed: "Issue Not Fixed",
    newProblem: "New Problem After Repair",
    warrantyClaim: "Warranty Claim",
    whatToShare: "What to Share",
    invoiceAvailable: "With Invoice",
    invoiceAvailableItems: {
      item1: "Invoice or Order ID",
      item2: "Issue description",
      item3: "Photos if needed"
    },
    invoiceUnavailable: "Without Invoice",
    invoiceUnavailableItems: {
      item1: "Your full name",
      item2: "Phone number",
      item3: "Device model",
      item4: "Issue details",
      item5: "Photos/videos"
    },
    findOrder: "Find your Order ID",
    viewOrders: "View Orders",
    warrantyNote: "Warranty Claims",
    warrantyTip: "Mention 'warranty claim' and share details above",
    step1: "Choose contact method",
    step2: "Select issue type",
    step3: "Share details"
  },
  hi: {
    headerTitle: "सहायता और समर्थन",
    headerSubtitle: "मरम्मत समस्याओं और वारंटी दावों के लिए त्वरित सहायता",
    whatsappTitle: "WhatsApp समर्थन",
    whatsappDesc: "विवरण और फोटो भेजें",
    responseTime: "त्वरित प्रतिक्रिया",
    startWhatsapp: "चैट शुरू करें",
    callTitle: "कॉल समर्थन",
    callDesc: "सीधे हमारी टीम से बात करें",
    availableTime: "हमेशा उपलब्ध",
    callNow: "कॉल करें",
    supportedIssues: "समर्थित समस्याएं",
    issueNotFixed: "समस्या ठीक नहीं हुई",
    newProblem: "मरम्मत के बाद नई समस्या",
    warrantyClaim: "वारंटी दावा",
    whatToShare: "क्या साझा करें",
    invoiceAvailable: "इनवॉइस के साथ",
    invoiceAvailableItems: {
      item1: "इनवॉइस या ऑर्डर आईडी",
      item2: "समस्या विवरण",
      item3: "फोटो यदि आवश्यक"
    },
    invoiceUnavailable: "बिना इनवॉइस के",
    invoiceUnavailableItems: {
      item1: "आपका पूरा नाम",
      item2: "फोन नंबर",
      item3: "डिवाइस मॉडल",
      item4: "समस्या विवरण",
      item5: "फोटो/वीडियो"
    },
    findOrder: "ऑर्डर आईडी ढूंढें",
    viewOrders: "ऑर्डर देखें",
    warrantyNote: "वारंटी दावे",
    warrantyTip: "'वारंटी दावा' का उल्लेख करें और विवरण साझा करें",
    step1: "संपर्क विधि चुनें",
    step2: "समस्या प्रकार चुनें",
    step3: "विवरण साझा करें"
  },
  mr: {
    headerTitle: "मदत आणि समर्थन",
    headerSubtitle: "दुरुस्ती समस्या आणि हमी दाव्यांसाठी द्रुत सहाय्य",
    whatsappTitle: "WhatsApp समर्थन",
    whatsappDesc: "तपशील आणि फोटो पाठवा",
    responseTime: "द्रुत प्रतिसाद",
    startWhatsapp: "चॅट सुरू करा",
    callTitle: "कॉल समर्थन",
    callDesc: "थेट आमच्या संघाशी बोला",
    availableTime: "नेहमी उपलब्ध",
    callNow: "कॉल करा",
    supportedIssues: "समर्थित समस्या",
    issueNotFixed: "समस्या निश्चित केली नाही",
    newProblem: "दुरुस्तीनंतर नवीन समस्या",
    warrantyClaim: "हमी दावा",
    whatToShare: "काय सामायिक करावे",
    invoiceAvailable: "बीजकासह",
    invoiceAvailableItems: {
      item1: "बीजक किंवा ऑर्डर आयडी",
      item2: "समस्येचे वर्णन",
      item3: "फोटो आवश्यक असल्यास"
    },
    invoiceUnavailable: "बीजकाशिवाय",
    invoiceUnavailableItems: {
      item1: "तुमचे पूर्ण नाव",
      item2: "फोन नंबर",
      item3: "डिव्हाइस मॉडेल",
      item4: "समस्येचे तपशील",
      item5: "फोटो/व्हिडिओ"
    },
    findOrder: "ऑर्डर आयडी शोधा",
    viewOrders: "ऑर्डर पहा",
    warrantyNote: "हमी दावे",
    warrantyTip: "'हमी दावा' उल्लेख करा आणि तपशील सामायिक करा",
    step1: "संपर्क पद्धत निवडा",
    step2: "समस्येचा प्रकार निवडा",
    step3: "तपशील सामायिक करा"
  }
};

const detectLanguage = () => {
  const savedLanguage = localStorage.getItem('preferredLanguage');
  if (savedLanguage && translations[savedLanguage]) {
    return savedLanguage;
  }
  
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang.startsWith('hi') || browserLang.startsWith('hi-IN')) {
    return 'hi';
  }
  if (browserLang.startsWith('mr') || browserLang.startsWith('mr-IN')) {
    return 'mr';
  }
  
  return 'en';
};

function HelpAndSupport() {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState(detectLanguage());
  
  useEffect(() => {
    const handleLanguageChange = () => {
      const newLang = localStorage.getItem('preferredLanguage') || 'en';
      if (translations[newLang]) {
        setCurrentLanguage(newLang);
      }
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    handleLanguageChange();
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);
  
  const t = translations[currentLanguage];

  const handleCall = () => {
    window.open('tel:+1234567890', '_self');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/1234567890?text=Hello%20FixFlash%20Support%2C%20I%20need%20help%20with%3A', '_blank');
  };

  const handleViewOrders = () => {
    navigate('/your-orders');
  };

  const supportIssues = [
    {
      title: t.issueNotFixed,
      icon: <AlertCircle size={20} />,
      color: "#ef4444"
    },
    {
      title: t.newProblem,
      icon: <AlertCircle size={20} />,
      color: "#f97316"
    },
    {
      title: t.warrantyClaim,
      icon: <ShieldCheck size={20} />,
      color: "#10b981"
    }
  ];

  return (
    <div className="help-support-page">
      {/* Header Section */}
      <div className="support-header">
        <div className="header-content">
          <HelpCircle className="header-icon" size={36} />
          <h1 className="header-title">{t.headerTitle}</h1>
          <p className="header-subtitle">
            {t.headerSubtitle}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="support-container">
        {/* Contact Options - Only WhatsApp and Call */}
        <div className="contact-section">
          <div className="contact-cards">
            {/* WhatsApp Card */}
            <div className="contact-card whatsapp-card" onClick={handleWhatsApp}>
              <div className="card-content">
                <div className="card-icon whatsapp-icon">
                  <MessageCircle size={28} />
                </div>
                <div className="card-text">
                  <h3 className="card-title">{t.whatsappTitle}</h3>
                  <p className="card-description">
                    {t.whatsappDesc}
                  </p>
                </div>
              </div>
              <div className="card-response">
                <span className="response-time">{t.responseTime}</span>
              </div>
              <button className="card-button whatsapp-button">
                {t.startWhatsapp}
              </button>
            </div>

            {/* Call Support Card */}
            <div className="contact-card call-card" onClick={handleCall}>
              <div className="card-content">
                <div className="card-icon call-icon">
                  <Phone size={28} />
                </div>
                <div className="card-text">
                  <h3 className="card-title">{t.callTitle}</h3>
                  <p className="card-description">
                    {t.callDesc}
                  </p>
                </div>
              </div>
              <div className="card-response">
                <span className="response-time">{t.availableTime}</span>
              </div>
              <button className="card-button call-button">
                {t.callNow}
              </button>
            </div>
          </div>
        </div>

        {/* Supported Issues */}
        <div className="issues-section">
          <h2 className="section-title">{t.supportedIssues}</h2>
          
          <div className="issues-grid">
            {supportIssues.map((issue, index) => (
              <div key={index} className="issue-card" style={{ borderTopColor: issue.color }}>
                <div className="issue-icon" style={{ color: issue.color }}>
                  {issue.icon}
                </div>
                <h3 className="issue-title">{issue.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* What to Share */}
        <div className="share-section">
          <h2 className="section-title">{t.whatToShare}</h2>
          <div className="share-cards">
            {/* If Invoice Available */}
            <div className="share-card primary-card">
              <div className="share-card-header">
                <FileText size={20} className="share-icon" />
                <h3 className="share-card-title">{t.invoiceAvailable}</h3>
              </div>
              <div className="share-items">
                <div className="share-item">
                  <div className="item-check">✓</div>
                  <span className="item-text">{t.invoiceAvailableItems.item1}</span>
                </div>
                <div className="share-item">
                  <div className="item-check">✓</div>
                  <span className="item-text">{t.invoiceAvailableItems.item2}</span>
                </div>
                <div className="share-item">
                  <div className="item-check">✓</div>
                  <span className="item-text">{t.invoiceAvailableItems.item3}</span>
                </div>
              </div>
            </div>

            {/* If Invoice Not Available */}
            <div className="share-card secondary-card">
              <div className="share-card-header">
                <AlertCircle size={20} className="share-icon" />
                <h3 className="share-card-title">{t.invoiceUnavailable}</h3>
              </div>
              <div className="share-items">
                <div className="share-item">
                  <div className="item-number">1</div>
                  <span className="item-text">{t.invoiceUnavailableItems.item1}</span>
                </div>
                <div className="share-item">
                  <div className="item-number">2</div>
                  <span className="item-text">{t.invoiceUnavailableItems.item2}</span>
                </div>
                <div className="share-item">
                  <div className="item-number">3</div>
                  <span className="item-text">{t.invoiceUnavailableItems.item3}</span>
                </div>
                <div className="share-item">
                  <div className="item-number">4</div>
                  <span className="item-text">{t.invoiceUnavailableItems.item4}</span>
                </div>
                <div className="share-item">
                  <div className="item-number">5</div>
                  <span className="item-text">{t.invoiceUnavailableItems.item5}</span>
                </div>
                <div className="invoice-help">
                  <p className="help-text">
                    <FileText size={16} />
                    <span>{t.findOrder}</span>
                  </p>
                  <button className="view-orders-button" onClick={handleViewOrders}>
                    {t.viewOrders}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Warranty Quick Note */}
        <div className="warranty-tip">
          <div className="tip-icon">
            <ShieldCheck size={20} />
          </div>
          <div className="tip-content">
            <h3 className="tip-title">{t.warrantyNote}</h3>
            <p className="tip-text">
              {t.warrantyTip}
            </p>
          </div>
        </div>

        {/* Quick Instructions */}
        <div className="instructions">
          <div className="instruction-step">
            <div className="step-number">1</div>
            <p className="step-text">{t.step1}</p>
          </div>
          <div className="instruction-step">
            <div className="step-number">2</div>
            <p className="step-text">{t.step2}</p>
          </div>
          <div className="instruction-step">
            <div className="step-number">3</div>
            <p className="step-text">{t.step3}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpAndSupport;