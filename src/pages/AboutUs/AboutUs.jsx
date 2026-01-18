import React, { useState, useEffect } from 'react';
import { Info, Clock, Shield, Users, Award, Phone, Check, Settings } from 'lucide-react';
import './AboutUs.css';

// Translation data
const aboutTranslations = {
  en: {
    title: "About FixFlash",
    subtitle: "Your trusted repair partner for all devices",
    intro: "FixFlash is your trusted repair partner for smartphones, tablets, laptops, and more—offering fast, reliable, and affordable solutions. With expert technicians, genuine parts, and a customer-first approach, we make sure every repair is hassle-free and handled with care.",
    mission: "Our Mission",
    missionText: "To provide exceptional device repair services that are fast, reliable, and affordable. We're committed to getting your devices back to optimal performance with minimal downtime.",
    services: "Our Services",
    smartphoneRepairs: "Smartphone Repairs",
    smartphoneDesc: "Screen replacements, battery issues, and more",
    tabletRepairs: "Tablet Repairs",
    tabletDesc: "Display, charging port, and internal repairs",
    laptopRepairs: "Laptop Repairs",
    laptopDesc: "Hardware, software, and performance issues",
    otherDevices: "Other Devices",
    otherDesc: "Smartwatches, headphones, and more",
    whyChoose: "Why Choose FixFlash",
    expertTech: "Expert Technicians",
    expertTechText: "Our certified technicians have years of experience with all device types.",
    genuineParts: "Genuine Parts",
    genuinePartsText: "We use only high-quality, genuine parts for all repairs.",
    fastService: "Fast Service",
    fastServiceText: "Most repairs completed within hours, not days.",
    customerFirst: "Customer First",
    customerFirstText: "Your satisfaction is our top priority in everything we do.",
    promise: "Our Promise",
    promiseText: "Whether it's a cracked screen, battery replacement, or technical fault, FixFlash brings your devices back to life quickly and efficiently, because we believe your gadgets deserve the best.",
    warranty: "12-month warranty on all repairs",
    diagnostic: "Free diagnostic assessment",
    pricing: "Transparent pricing with no hidden fees",
    turnaround: "Quick turnaround time",
    ctaHeading: "Ready to Repair Your Device?",
    ctaText: "Get in touch with us today for a free quote and quick service.",
    ctaButton: "Contact Us Now"
  },
  hi: {
    title: "FixFlash के बारे में",
    subtitle: "सभी उपकरणों के लिए आपका विश्वसनीय मरम्मत भागीदार",
    intro: "FixFlash स्मार्टफोन, टैबलेट, लैपटॉप और अधिक के लिए आपका विश्वसनीय मरम्मत भागीदार है—तेज, विश्वसनीय और किफायती समाधान प्रदान करता है। विशेषज्ञ तकनीशियनों, असली पुर्जों और ग्राहक-प्रथम दृष्टिकोण के साथ, हम यह सुनिश्चित करते हैं कि हर मरम्मत परेशानी मुक्त हो और देखभाल के साथ की जाए।",
    mission: "हमारा मिशन",
    missionText: "असाधारण डिवाइस मरम्मत सर्विसेस प्रदान करना जो तेज, विश्वसनीय और किफायती हैं। हम न्यूनतम डाउनटाइम के साथ आपके उपकरणों को इष्टतम प्रदर्शन पर वापस लाने के लिए प्रतिबद्ध हैं।",
    services: "हमारी सर्विसेस",
    smartphoneRepairs: "स्मार्टफोन मरम्मत",
    smartphoneDesc: "स्क्रीन प्रतिस्थापन, बैटरी समस्याएं और बहुत कुछ",
    tabletRepairs: "टैबलेट मरम्मत",
    tabletDesc: "डिस्प्ले, चार्जिंग पोर्ट और आंतरिक मरम्मत",
    laptopRepairs: "लैपटॉप मरम्मत",
    laptopDesc: "हार्डवेयर, सॉफ्टवेयर और प्रदर्शन समस्याएं",
    otherDevices: "अन्य उपकरण",
    otherDesc: "स्मार्टवॉच, हेडफोन और बहुत कुछ",
    whyChoose: "FixFlash को क्यों चुनें",
    expertTech: "विशेषज्ञ तकनीशियन",
    expertTechText: "हमारे प्रमाणित तकनीशियनों के पास सभी डिवाइस प्रकारों के साथ वर्षों का अनुभव है।",
    genuineParts: "असली पुर्जे",
    genuinePartsText: "हम सभी मरम्मतों के लिए केवल उच्च-गुणवत्ता वाले, असली पुर्जों का उपयोग करते हैं।",
    fastService: "तेज सर्विस",
    fastServiceText: "अधिकांश मरम्मतें दिनों में नहीं, बल्कि घंटों में पूरी हो जाती हैं।",
    customerFirst: "ग्राहक प्रथम",
    customerFirstText: "आपकी संतुष्टि हमारी सर्वोच्च प्राथमिकता है जो हम करते हैं।",
    promise: "हमारा वादा",
    promiseText: "चाहे वह क्रैक्ड स्क्रीन हो, बैटरी रिप्लेसमेंट हो या तकनीकी खराबी, FixFlash आपके उपकरणों को जल्दी और कुशलता से वापस जीवन में लाता है, क्योंकि हम मानते हैं कि आपके गैजेट्स सर्वश्रेष्ठ के हकदार हैं।",
    warranty: "सभी मरम्मतों पर 12-महीने की वारंटी",
    diagnostic: "मुफ्त नैदानिक मूल्यांकन",
    pricing: "कोई छिपी फीस के साथ पारदर्शी मूल्य निर्धारण",
    turnaround: "त्वरित टर्नअराउंड समय",
    ctaHeading: "अपना डिवाइस ठीक करने के लिए तैयार हैं?",
    ctaText: "मुफ्त कोटेशन और त्वरित सर्विस के लिए आज ही हमसे संपर्क करें।",
    ctaButton: "अभी संपर्क करें"
  },
  mr: {
    title: "FixFlash बद्दल",
    subtitle: "सर्व डिव्हाइसेससाठी तुमचा विश्वासू दुरुस्ती भागीदार",
    intro: "FixFlash स्मार्टफोन, टॅब्लेट, लॅपटॉप आणि अधिक साठी तुमचा विश्वासू दुरुस्ती भागीदार आहे—जलद, विश्वासार्ह आणि किफायतशीर उपाय ऑफर करतो. तज्ञ तंत्रज्ञ, खरे पार्ट्स आणि ग्राहक-प्रथम दृष्टिकोनासह, आम्ही हे सुनिश्चित करतो की प्रत्येक दुरुस्ती त्रासमुक्त असेल आणि काळजीपूर्वक हाताळली जाईल.",
    mission: "आमचे मिशन",
    missionText: "असाधारण डिव्हाइस दुरुस्ती सर्विस प्रदान करणे ज्या जलद, विश्वासार्ह आणि किफायतशीर आहेत. किमान डाउनटाइमसह तुमच्या डिव्हाइसेसना इष्टतम कार्यक्षमतेवर परत आणण्यासाठी आम्ही वचनबद्ध आहोत.",
    services: "आमच्या सर्विस",
    smartphoneRepairs: "स्मार्टफोन दुरुस्ती",
    smartphoneDesc: "स्क्रीन रिप्लेसमेंट, बॅटरी समस्या आणि अधिक",
    tabletRepairs: "टॅब्लेट दुरुस्ती",
    tabletDesc: "डिस्प्ले, चार्जिंग पोर्ट आणि अंतर्गत दुरुस्ती",
    laptopRepairs: "लॅपटॉप दुरुस्ती",
    laptopDesc: "हार्डवेअर, सॉफ्टवेअर आणि कार्यक्षमता समस्या",
    otherDevices: "इतर डिव्हाइसेस",
    otherDesc: "स्मार्टवॉच, हेडफोन आणि अधिक",
    whyChoose: "FixFlash का निवडा",
    expertTech: "तज्ञ तंत्रज्ञ",
    expertTechText: "आमच्या प्रमाणित तंत्रज्ञांना सर्व डिव्हाइस प्रकारांसह वर्षांचा अनुभव आहे.",
    genuineParts: "खरे पार्ट्स",
    genuinePartsText: "आम्ही सर्व दुरुस्तीसाठी केवळ उच्च-गुणवत्तेचे, खरे पार्ट्स वापरतो.",
    fastService: "जलद सर्विस",
    fastServiceText: "बहुतेक दुरुस्त्या दिवसांत नाही तर तासांत पूर्ण होतात.",
    customerFirst: "ग्राहक प्रथम",
    customerFirstText: "तुमची समाधानी आमची सर्वोच्च प्राधान्य आहे जे आम्ही करतो.",
    promise: "आमचे वचन",
    promiseText: "मग ती क्रॅक्ड स्क्रीन असेल, बॅटरी रिप्लेसमेंट असेल किंवा तांत्रिक दोष असेल, FixFlash तुमच्या डिव्हाइसेसना जलद आणि कार्यक्षमतेने परत जीवन देतो, कारण आम्हाला विश्वास आहे की तुमचे गॅजेट्स सर्वोत्तम पात्र आहेत.",
    warranty: "सर्व दुरुस्तीवर 12-महिन्यांची हमी",
    diagnostic: "विनामूल्य निदान तपासणी",
    pricing: "लपवलेल्या फीशिवाय पारदर्शक किंमत",
    turnaround: "जलद टर्नअराउंड वेळ",
    ctaHeading: "तुमचे डिव्हाइस दुरुस्त करण्यास सज्ज आहात?",
    ctaText: "विनामूल्य कोट आणि जलद सेवेसाठी आजच आमच्याशी संपर्क साधा.",
    ctaButton: "आत्ताच संपर्क साधा"
  }
};

function AboutUs() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  // Get language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && aboutTranslations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
    
    // Listen for language changes
    const handleLanguageChange = () => {
      const lang = localStorage.getItem('preferredLanguage');
      if (lang && aboutTranslations[lang]) {
        setCurrentLanguage(lang);
      }
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  return (
    <div className="fixflash-about-container">
      {/* Header Section */}
      <header className="fixflash-about-header">
        <div className="fixflash-header-content">
          <Info size={42} className="fixflash-info-icon" />
          <h1 className="fixflash-main-heading multilingual-text">{aboutTranslations[currentLanguage].title}</h1>
          <p className="fixflash-header-subtitle multilingual-text">{aboutTranslations[currentLanguage].subtitle}</p>
        </div>
      </header>

      {/* Intro Section */}
      <section className="fixflash-intro-section">
        <div className="fixflash-section-content">
          <p className="fixflash-intro-text multilingual-text">
            {aboutTranslations[currentLanguage].intro}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="fixflash-mission-section">
        <div className="fixflash-section-content">
          <div className="fixflash-text-content">
            <h2 className="fixflash-section-heading multilingual-text">{aboutTranslations[currentLanguage].mission}</h2>
            <p className="fixflash-section-text multilingual-text">{aboutTranslations[currentLanguage].missionText}</p>
          </div>
          <div className="fixflash-icon-content">
            <Clock size={52} className="fixflash-section-icon" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="fixflash-services-section">
        <h2 className="fixflash-section-heading-center multilingual-text">{aboutTranslations[currentLanguage].services}</h2>
        <div className="fixflash-services-grid">
          <div className="fixflash-service-card">
            <div className="fixflash-service-icon">
              <Phone size={32} />
            </div>
            <h3 className="fixflash-service-title multilingual-text">{aboutTranslations[currentLanguage].smartphoneRepairs}</h3>
            <p className="fixflash-service-description multilingual-text">{aboutTranslations[currentLanguage].smartphoneDesc}</p>
          </div>
          <div className="fixflash-service-card">
            <div className="fixflash-service-icon">
              <Phone size={32} />
            </div>
            <h3 className="fixflash-service-title multilingual-text">{aboutTranslations[currentLanguage].tabletRepairs}</h3>
            <p className="fixflash-service-description multilingual-text">{aboutTranslations[currentLanguage].tabletDesc}</p>
          </div>
          <div className="fixflash-service-card">
            <div className="fixflash-service-icon">
              <Phone size={32} />
            </div>
            <h3 className="fixflash-service-title multilingual-text">{aboutTranslations[currentLanguage].laptopRepairs}</h3>
            <p className="fixflash-service-description multilingual-text">{aboutTranslations[currentLanguage].laptopDesc}</p>
          </div>
          <div className="fixflash-service-card">
            <div className="fixflash-service-icon">
              <Settings size={32} />
            </div>
            <h3 className="fixflash-service-title multilingual-text">{aboutTranslations[currentLanguage].otherDevices}</h3>
            <p className="fixflash-service-description multilingual-text">{aboutTranslations[currentLanguage].otherDesc}</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="fixflash-values-section">
        <h2 className="fixflash-section-heading-center multilingual-text">{aboutTranslations[currentLanguage].whyChoose}</h2>
        <div className="fixflash-values-grid">
          <div className="fixflash-value-card">
            <div className="fixflash-value-icon">
              <Award size={36} />
            </div>
            <h3 className="fixflash-value-title multilingual-text">{aboutTranslations[currentLanguage].expertTech}</h3>
            <p className="fixflash-value-text multilingual-text">{aboutTranslations[currentLanguage].expertTechText}</p>
          </div>
          <div className="fixflash-value-card">
            <div className="fixflash-value-icon">
              <Shield size={36} />
            </div>
            <h3 className="fixflash-value-title multilingual-text">{aboutTranslations[currentLanguage].genuineParts}</h3>
            <p className="fixflash-value-text multilingual-text">{aboutTranslations[currentLanguage].genuinePartsText}</p>
          </div>
          <div className="fixflash-value-card">
            <div className="fixflash-value-icon">
              <Clock size={36} />
            </div>
            <h3 className="fixflash-value-title multilingual-text">{aboutTranslations[currentLanguage].fastService}</h3>
            <p className="fixflash-value-text multilingual-text">{aboutTranslations[currentLanguage].fastServiceText}</p>
          </div>
          <div className="fixflash-value-card">
            <div className="fixflash-value-icon">
              <Users size={36} />
            </div>
            <h3 className="fixflash-value-title multilingual-text">{aboutTranslations[currentLanguage].customerFirst}</h3>
            <p className="fixflash-value-text multilingual-text">{aboutTranslations[currentLanguage].customerFirstText}</p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="fixflash-trust-section">
        <div className="fixflash-trust-content">
          <h2 className="fixflash-section-heading-center multilingual-text">{aboutTranslations[currentLanguage].promise}</h2>
          <p className="fixflash-trust-text multilingual-text">
            {aboutTranslations[currentLanguage].promiseText}
          </p>
          <ul className="fixflash-trust-list">
            <li className="fixflash-trust-item">
              <Check size={20} className="fixflash-check-icon" />
              <span className="multilingual-text">{aboutTranslations[currentLanguage].warranty}</span>
            </li>
            <li className="fixflash-trust-item">
              <Check size={20} className="fixflash-check-icon" />
              <span className="multilingual-text">{aboutTranslations[currentLanguage].diagnostic}</span>
            </li>
            <li className="fixflash-trust-item">
              <Check size={20} className="fixflash-check-icon" />
              <span className="multilingual-text">{aboutTranslations[currentLanguage].pricing}</span>
            </li>
            <li className="fixflash-trust-item">
              <Check size={20} className="fixflash-check-icon" />
              <span className="multilingual-text">{aboutTranslations[currentLanguage].turnaround}</span>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="fixflash-cta-section">
        <div className="fixflash-cta-content">
          <h2 className="fixflash-cta-heading multilingual-text">{aboutTranslations[currentLanguage].ctaHeading}</h2>
          <p className="fixflash-cta-text multilingual-text">{aboutTranslations[currentLanguage].ctaText}</p>
          <button className="fixflash-cta-button multilingual-text">{aboutTranslations[currentLanguage].ctaButton}</button>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;