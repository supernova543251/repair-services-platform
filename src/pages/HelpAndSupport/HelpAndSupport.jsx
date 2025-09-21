import React, { useState, useEffect } from 'react'
import './HelpAndSupport.css'
import { LifeBuoy, Search, MessageCircle, Mail, Phone, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'

// Translation data
const helpTranslations = {
  en: {
    title: "Help & Support",
    subtitle: "Get assistance with your smartphone repair orders and find answers to common questions",
    searchPlaceholder: "Search for help topics, questions, or guides...",
    contactSupport: "Contact Support",
    liveChat: "Live Chat",
    liveChatDesc: "Get instant help from our support team",
    startChat: "Start Chat",
    emailSupport: "Email Support",
    emailSupportDesc: "Send us a detailed message",
    sendEmail: "Send Email",
    phoneSupport: "Phone Support",
    phoneSupportDesc: "Call us directly",
    callNow: "Call Now",
    faqs: "Frequently Asked Questions",
    troubleshootingGuides: "Troubleshooting Guides",
    readFullGuide: "Read Full Guide",
    supportTickets: "Your Support Tickets",
    viewDetails: "View Details",
    resolved: "Resolved",
    inProgress: "In Progress",
    // FAQ questions and answers
    faq1Question: "How long does a typical smartphone repair take?",
    faq1Answer: "Most repairs are completed within 1-2 business days. Screen replacements and battery changes are usually done same-day if parts are available.",
    faq2Question: "What types of smartphone repairs do you offer?",
    faq2Answer: "We offer screen replacements, battery changes, camera repairs, charging port fixes, water damage restoration, and software issues resolution.",
    faq3Question: "Do you provide warranty on repairs?",
    faq3Answer: "Yes, all our repairs come with a 90-day warranty covering both parts and labor.",
    faq4Question: "How can I track my repair status?",
    faq4Answer: "You can track your repair status through your account dashboard or by contacting our support team directly.",
    faq5Question: "What payment methods do you accept?",
    faq5Answer: "We accept credit/debit cards, PayPal, and bank transfers. Payment is due upon completion of the repair.",
    // Troubleshooting guides
    guide1Title: "Phone Not Turning On",
    guide1Desc: "Troubleshoot power issues and battery problems",
    guide1Steps: ["Check charging cable", "Try different power outlet", "Perform hard reset"],
    guide2Title: "Screen Responsiveness Issues",
    guide2Desc: "Fix unresponsive touch screens",
    guide2Steps: ["Clean screen", "Remove screen protector", "Check for software updates"],
    guide3Title: "Battery Draining Quickly",
    guide3Desc: "Improve battery life and performance",
    guide3Steps: ["Check battery usage", "Close background apps", "Update operating system"],
    // Support tickets
    ticket1Subject: "Screen replacement inquiry",
    ticket2Subject: "Battery draining quickly after repair"
  },
  hi: {
    title: "सहायता और समर्थन",
    subtitle: "अपने स्मार्टफोन मरम्मत ऑर्डर के साथ सहायता प्राप्त करें और सामान्य प्रश्नों के उत्तर खोजें",
    searchPlaceholder: "सहायता विषयों, प्रश्नों या गाइडों के लिए खोजें...",
    contactSupport: "समर्थन से संपर्क करें",
    liveChat: "लाइव चैट",
    liveChatDesc: "हमारी सहायता टीम से तत्काल सहायता प्राप्त करें",
    startChat: "चैट शुरू करें",
    emailSupport: "ईमेल समर्थन",
    emailSupportDesc: "हमें एक विस्तृत संदेश भेजें",
    sendEmail: "ईमेल भेजें",
    phoneSupport: "फोन समर्थन",
    phoneSupportDesc: "हमें सीधे कॉल करें",
    callNow: "अभी कॉल करें",
    faqs: "अक्सर पूछे जाने वाले प्रश्न",
    troubleshootingGuides: "समस्या निवारण गाइड",
    readFullGuide: "पूरी गाइड पढ़ें",
    supportTickets: "आपके सहायता टिकट",
    viewDetails: "विवरण देखें",
    resolved: "हल",
    inProgress: "प्रगति में",
    // FAQ questions and answers
    faq1Question: "एक सामान्य स्मार्टफोन मरम्मत में कितना समय लगता है?",
    faq1Answer: "अधिकांश मरम्मत 1-2 व्यावसायिक दिनों के भीतर पूरी हो जाती हैं। स्क्रीन प्रतिस्थापन और बैटरी परिवर्तन आमतौर पर उसी दिन किए जाते हैं यदि पुर्जे उपलब्ध हैं।",
    faq2Question: "आप किस प्रकार की स्मार्टफोन मरम्मत की पेशकश करते हैं?",
    faq2Answer: "हम स्क्रीन प्रतिस्थापन, बैटरी परिवर्तन, कैमरा मरम्मत, चार्जिंग पोर्ट ठीक, पानी की क्षति बहाली और सॉफ्टवेयर मुद्दों का समाधान प्रदान करते हैं।",
    faq3Question: "क्या आप मरम्मत पर वारंटी प्रदान करते हैं?",
    faq3Answer: "हां, हमारी सभी मरम्मतों पर 90-दिन की वारंटी आती है जिसमें पुर्जे और श्रम दोनों शामिल हैं।",
    faq4Question: "मैं अपनी मरम्मत स्थिति कैसे ट्रैक कर सकता हूं?",
    faq4Answer: "आप अपने खाता डैशबोर्ड के माध्यम से या सीधे हमारी सहायता टीम से संपर्क करके अपनी मरम्मत स्थिति ट्रैक कर सकते हैं।",
    faq5Question: "आप कौन से भुगतान तरीके स्वीकार करते हैं?",
    faq5Answer: "हम क्रेडिट/डेबिट कार्ड, PayPal, और बैंक ट्रांसफर स्वीकार करते हैं। मरम्मत पूरा होने पर भुगतान देय है।",
    // Troubleshooting guides
    guide1Title: "फोन चालू नहीं हो रहा",
    guide1Desc: "बिजली के मुद्दों और बैटरी समस्याओं का समस्या निवारण करें",
    guide1Steps: ["चार्जिंग केबल जांचें", "अलग पावर आउटलेट आज़माएं", "हार्ड रीसेट करें"],
    guide2Title: "स्क्रीन प्रतिक्रियाशीलता के मुद्दे",
    guide2Desc: "अनुत्तरदायी टच स्क्रीन ठीक करें",
    guide2Steps: ["स्क्रीन साफ करें", "स्क्रीन प्रोटेक्टर हटाएं", "सॉफ्टवेयर अपडेट के लिए जांचें"],
    guide3Title: "बैटरी तेजी से खत्म हो रही",
    guide3Desc: "बैटरी जीवन और प्रदर्शन में सुधार करें",
    guide3Steps: ["बैटरी उपयोग जांचें", "पृष्ठभूमि ऐप्स बंद करें", "ऑपरेटिंग सिस्टम अपडेट करें"],
    // Support tickets
    ticket1Subject: "स्क्रीन प्रतिस्थापन पूछताछ",
    ticket2Subject: "मरम्मत के बाद बैटरी तेजी से खत्म हो रही"
  },
  mr: {
    title: "मदत आणि समर्थन",
    subtitle: "तुमच्या स्मार्टफोन दुरुस्ती ऑर्डरसाठी मदत मिळवा आणि सामान्य प्रश्नांची उत्तरे शोधा",
    searchPlaceholder: "मदत विषय, प्रश्न किंवा मार्गदर्शकांसाठी शोधा...",
    contactSupport: "समर्थनाशी संपर्क साधा",
    liveChat: "लाइव चॅट",
    liveChatDesc: "आमच्या समर्थन संघाकडून त्वरित मदत मिळवा",
    startChat: "चॅट सुरू करा",
    emailSupport: "ईमेल समर्थन",
    emailSupportDesc: "आम्हाला एक तपशीलवार संदेश पाठवा",
    sendEmail: "ईमेल पाठवा",
    phoneSupport: "फोन समर्थन",
    phoneSupportDesc: "आम्हाला थेट कॉल करा",
    callNow: "आत्ताच कॉल करा",
    faqs: "वारंवार विचारले जाणारे प्रश्न",
    troubleshootingGuides: "समस्या निवारण मार्गदर्शक",
    readFullGuide: "संपूर्ण मार्गदर्शक वाचा",
    supportTickets: "तुमचे समर्थन तिकीट",
    viewDetails: "तपशील पहा",
    resolved: "सोडवले",
    inProgress: "प्रगतीत",
    // FAQ questions and answers
    faq1Question: "एका सामान्य स्मार्टफोन दुरुस्तीला किती वेळ लागतो?",
    faq1Answer: "बहुतेक दुरुस्त्या 1-2 व्यावसायिक दिवसात पूर्ण होतात. स्क्रीन रिप्लेसमेंट आणि बॅटरी बदल सहसा त्याच दिवशी केले जातात जर पार्ट्स उपलब्ध असतील.",
    faq2Question: "तुम्ही कोणत्या प्रकारच्या स्मार्टफोन दुरुस्त्या देतात?",
    faq2Answer: "आम्ही स्क्रीन रिप्लेसमेंट, बॅटरी बदल, कॅमेरा दुरुस्ती, चार्जिंग पोर्ट फिक्स, वॉटर डॅमेज रेस्टोरेशन आणि सॉफ्टवेअर इश्यू रेझोल्यूशन देतो.",
    faq3Question: "तुम्ही दुरुस्तीवर वॉरंटी देतात का?",
    faq3Answer: "होय, आमच्या सर्व दुरुस्त्यांवर 90-दिवसांची वॉरंटी येते ज्यामध्ये पार्ट्स आणि लेबर दोन्ही समाविष्ट असतात.",
    faq4Question: "मी माझी दुरुस्ती स्थिती कशी ट्रॅक करू शकतो?",
    faq4Answer: "तुम्ही तुमच्या अकाउंट डॅशबोर्डद्वारे किंवा आमच्या समर्थन संघाशी थेट संपर्क साधून तुमची दुरुस्ती स्थिती ट्रॅक करू शकता.",
    faq5Question: "तुम्ही कोणत्या पेमेंट पद्धती स्वीकारता?",
    faq5Answer: "आम्ही क्रेडिट/डेबिट कार्ड, PayPal, आणि बँक ट्रान्सफर स्वीकारतो. दुरुस्ती पूर्ण झाल्यावर पेमेंट देय असते.",
    // Troubleshooting guides
    guide1Title: "फोन चालू होत नाही",
    guide1Desc: "वीज समस्या आणि बॅटरी समस्यांचे निवारण करा",
    guide1Steps: ["चार्जिंग केबल तपासा", "वेगळा पॉवर आउटलेट वापरून पहा", "हार्ड रीसेट करा"],
    guide2Title: "स्क्रीन रिस्पॉन्सिव्हनेस समस्या",
    guide2Desc: "अनुत्तरदायी टच स्क्रीन दुरुस्त करा",
    guide2Steps: ["स्क्रीन स्वच्छ करा", "स्क्रीन प्रोटेक्टर काढा", "सॉफ्टवेअर अपडेट्स तपासा"],
    guide3Title: "बॅटरी त्वरीत संपते",
    guide3Desc: "बॅटरी आयुष्य आणि कार्यक्षमता सुधारा",
    guide3Steps: ["बॅटरी वापर तपासा", "बॅकग्राउंड अॅप्स बंद करा", "ऑपरेटिंग सिस्टम अपडेट करा"],
    // Support tickets
    ticket1Subject: "स्क्रीन रिप्लेसमेंट चौकशी",
    ticket2Subject: "दुरुस्तीनंतर बॅटरी त्वरीत संपते"
  }
};

function HelpAndSupport() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeFaq, setActiveFaq] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Get language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && helpTranslations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
    
    // Listen for language changes
    const handleLanguageChange = () => {
      const lang = localStorage.getItem('preferredLanguage');
      if (lang && helpTranslations[lang]) {
        setCurrentLanguage(lang);
      }
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  // Sample FAQ data
  const faqs = [
    {
      id: 1,
      question: helpTranslations[currentLanguage].faq1Question,
      answer: helpTranslations[currentLanguage].faq1Answer
    },
    {
      id: 2,
      question: helpTranslations[currentLanguage].faq2Question,
      answer: helpTranslations[currentLanguage].faq2Answer
    },
    {
      id: 3,
      question: helpTranslations[currentLanguage].faq3Question,
      answer: helpTranslations[currentLanguage].faq3Answer
    },
    {
      id: 4,
      question: helpTranslations[currentLanguage].faq4Question,
      answer: helpTranslations[currentLanguage].faq4Answer
    },
    {
      id: 5,
      question: helpTranslations[currentLanguage].faq5Question,
      answer: helpTranslations[currentLanguage].faq5Answer
    }
  ]

  // Sample support tickets
  const supportTickets = [
    {
      id: 101,
      subject: helpTranslations[currentLanguage].ticket1Subject,
      status: helpTranslations[currentLanguage].resolved,
      date: "2024-01-15"
    },
    {
      id: 102,
      subject: helpTranslations[currentLanguage].ticket2Subject,
      status: helpTranslations[currentLanguage].inProgress,
      date: "2024-01-20"
    }
  ]

  // Sample troubleshooting guides
  const guides = [
    {
      title: helpTranslations[currentLanguage].guide1Title,
      description: helpTranslations[currentLanguage].guide1Desc,
      steps: helpTranslations[currentLanguage].guide1Steps
    },
    {
      title: helpTranslations[currentLanguage].guide2Title,
      description: helpTranslations[currentLanguage].guide2Desc,
      steps: helpTranslations[currentLanguage].guide2Steps
    },
    {
      title: helpTranslations[currentLanguage].guide3Title,
      description: helpTranslations[currentLanguage].guide3Desc,
      steps: helpTranslations[currentLanguage].guide3Steps
    }
  ]

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id)
  }

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="did-help-support-container">
      {/* Header Section */}
      <header className="did-help-header">
        <div className="did-header-content">
          <LifeBuoy className="did-header-icon" size={32} />
          <h1 className="did-main-title multilingual-text">{helpTranslations[currentLanguage].title}</h1>
          <p className="did-header-description multilingual-text">{helpTranslations[currentLanguage].subtitle}</p>
        </div>
      </header>

      {/* Search Bar */}
      <div className="did-search-section">
        <div className="did-search-container">
          <Search className="did-search-icon" size={20} />
          <input
            type="text"
            placeholder={helpTranslations[currentLanguage].searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="did-search-input multilingual-text"
          />
        </div>
      </div>

      <div className="did-help-content">
        {/* Contact Support Section */}
        <section className="did-support-section">
          <h2 className="did-section-title multilingual-text">{helpTranslations[currentLanguage].contactSupport}</h2>
          <div className="did-contact-cards">
            <div className="did-contact-card">
              <MessageCircle className="did-contact-icon" size={24} />
              <h3 className="did-contact-title multilingual-text">{helpTranslations[currentLanguage].liveChat}</h3>
              <p className="did-contact-description multilingual-text">{helpTranslations[currentLanguage].liveChatDesc}</p>
              <button className="did-contact-btn multilingual-text">{helpTranslations[currentLanguage].startChat}</button>
            </div>
            
            <div className="did-contact-card">
              <Mail className="did-contact-icon" size={24} />
              <h3 className="did-contact-title multilingual-text">{helpTranslations[currentLanguage].emailSupport}</h3>
              <p className="did-contact-description multilingual-text">{helpTranslations[currentLanguage].emailSupportDesc}</p>
              <button className="did-contact-btn multilingual-text">{helpTranslations[currentLanguage].sendEmail}</button>
            </div>
            
            <div className="did-contact-card">
              <Phone className="did-contact-icon" size={24} />
              <h3 className="did-contact-title multilingual-text">{helpTranslations[currentLanguage].phoneSupport}</h3>
              <p className="did-contact-description multilingual-text">{helpTranslations[currentLanguage].phoneSupportDesc}</p>
              <button className="did-contact-btn multilingual-text">{helpTranslations[currentLanguage].callNow}</button>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="did-faq-section">
          <h2 className="did-section-title multilingual-text">{helpTranslations[currentLanguage].faqs}</h2>
          <div className="did-faq-list">
            {filteredFaqs.map(faq => (
              <div key={faq.id} className="did-faq-item">
                <button 
                  className="did-faq-question"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <span className="did-faq-text multilingual-text">{faq.question}</span>
                  {activeFaq === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {activeFaq === faq.id && (
                  <div className="did-faq-answer">
                    <p className="multilingual-text">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Troubleshooting Guides */}
        <section className="did-guides-section">
          <h2 className="did-section-title multilingual-text">{helpTranslations[currentLanguage].troubleshootingGuides}</h2>
          <div className="did-guides-grid">
            {guides.map((guide, index) => (
              <div key={index} className="did-guide-card">
                <h3 className="did-guide-title multilingual-text">{guide.title}</h3>
                <p className="did-guide-description multilingual-text">{guide.description}</p>
                <ul className="did-guide-steps">
                  {guide.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="did-guide-step multilingual-text">{step}</li>
                  ))}
                </ul>
                <button className="did-guide-btn">
                  <span className="multilingual-text">{helpTranslations[currentLanguage].readFullGuide}</span> <ExternalLink size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Support Tickets Section */}
        {supportTickets.length > 0 && (
          <section className="did-tickets-section">
            <h2 className="did-section-title multilingual-text">{helpTranslations[currentLanguage].supportTickets}</h2>
            <div className="did-tickets-list">
              {supportTickets.map(ticket => (
                <div key={ticket.id} className="did-ticket-item">
                  <div className="did-ticket-info">
                    <h4 className="did-ticket-subject multilingual-text">{ticket.subject}</h4>
                    <span className={`did-ticket-status did-status-${ticket.status.toLowerCase().replace(' ', '-')}`}>
                      <span className="multilingual-text">{ticket.status}</span>
                    </span>
                  </div>
                  <div className="did-ticket-date">
                    {new Date(ticket.date).toLocaleDateString()}
                  </div>
                  <button className="did-view-ticket-btn multilingual-text">{helpTranslations[currentLanguage].viewDetails}</button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default HelpAndSupport