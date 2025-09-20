import React, { useState } from 'react'
import './HelpAndSupport.css'
import { LifeBuoy, Search, MessageCircle, Mail, Phone, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'

function HelpAndSupport() {
  const [activeFaq, setActiveFaq] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Sample FAQ data
  const faqs = [
    {
      id: 1,
      question: "How long does a typical smartphone repair take?",
      answer: "Most repairs are completed within 1-2 business days. Screen replacements and battery changes are usually done same-day if parts are available."
    },
    {
      id: 2,
      question: "What types of smartphone repairs do you offer?",
      answer: "We offer screen replacements, battery changes, camera repairs, charging port fixes, water damage restoration, and software issues resolution."
    },
    {
      id: 3,
      question: "Do you provide warranty on repairs?",
      answer: "Yes, all our repairs come with a 90-day warranty covering both parts and labor."
    },
    {
      id: 4,
      question: "How can I track my repair status?",
      answer: "You can track your repair status through your account dashboard or by contacting our support team directly."
    },
    {
      id: 5,
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards, PayPal, and bank transfers. Payment is due upon completion of the repair."
    }
  ]

  // Sample support tickets
  const supportTickets = [
    {
      id: 101,
      subject: "Screen replacement inquiry",
      status: "Resolved",
      date: "2024-01-15"
    },
    {
      id: 102,
      subject: "Battery draining quickly after repair",
      status: "In Progress",
      date: "2024-01-20"
    }
  ]

  // Sample troubleshooting guides
  const guides = [
    {
      title: "Phone Not Turning On",
      description: "Troubleshoot power issues and battery problems",
      steps: ["Check charging cable", "Try different power outlet", "Perform hard reset"]
    },
    {
      title: "Screen Responsiveness Issues",
      description: "Fix unresponsive touch screens",
      steps: ["Clean screen", "Remove screen protector", "Check for software updates"]
    },
    {
      title: "Battery Draining Quickly",
      description: "Improve battery life and performance",
      steps: ["Check battery usage", "Close background apps", "Update operating system"]
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
          <h1 className="did-main-title">Help & Support</h1>
          <p className="did-header-description">Get assistance with your smartphone repair orders and find answers to common questions</p>
        </div>
      </header>

      {/* Search Bar */}
      <div className="did-search-section">
        <div className="did-search-container">
          <Search className="did-search-icon" size={20} />
          <input
            type="text"
            placeholder="Search for help topics, questions, or guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="did-search-input"
          />
        </div>
      </div>

      <div className="did-help-content">
        {/* Contact Support Section */}
        <section className="did-support-section">
          <h2 className="did-section-title">Contact Support</h2>
          <div className="did-contact-cards">
            <div className="did-contact-card">
              <MessageCircle className="did-contact-icon" size={24} />
              <h3 className="did-contact-title">Live Chat</h3>
              <p className="did-contact-description">Get instant help from our support team</p>
              <button className="did-contact-btn">Start Chat</button>
            </div>
            
            <div className="did-contact-card">
              <Mail className="did-contact-icon" size={24} />
              <h3 className="did-contact-title">Email Support</h3>
              <p className="did-contact-description">Send us a detailed message</p>
              <button className="did-contact-btn">Send Email</button>
            </div>
            
            <div className="did-contact-card">
              <Phone className="did-contact-icon" size={24} />
              <h3 className="did-contact-title">Phone Support</h3>
              <p className="did-contact-description">Call us directly</p>
              <button className="did-contact-btn">Call Now</button>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="did-faq-section">
          <h2 className="did-section-title">Frequently Asked Questions</h2>
          <div className="did-faq-list">
            {filteredFaqs.map(faq => (
              <div key={faq.id} className="did-faq-item">
                <button 
                  className="did-faq-question"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <span className="did-faq-text">{faq.question}</span>
                  {activeFaq === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {activeFaq === faq.id && (
                  <div className="did-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Troubleshooting Guides */}
        <section className="did-guides-section">
          <h2 className="did-section-title">Troubleshooting Guides</h2>
          <div className="did-guides-grid">
            {guides.map((guide, index) => (
              <div key={index} className="did-guide-card">
                <h3 className="did-guide-title">{guide.title}</h3>
                <p className="did-guide-description">{guide.description}</p>
                <ul className="did-guide-steps">
                  {guide.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="did-guide-step">{step}</li>
                  ))}
                </ul>
                <button className="did-guide-btn">
                  <span>Read Full Guide</span> <ExternalLink size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Support Tickets Section */}
        {supportTickets.length > 0 && (
          <section className="did-tickets-section">
            <h2 className="did-section-title">Your Support Tickets</h2>
            <div className="did-tickets-list">
              {supportTickets.map(ticket => (
                <div key={ticket.id} className="did-ticket-item">
                  <div className="did-ticket-info">
                    <h4 className="did-ticket-subject">{ticket.subject}</h4>
                    <span className={`did-ticket-status did-status-${ticket.status.toLowerCase().replace(' ', '-')}`}>
                      {ticket.status}
                    </span>
                  </div>
                  <div className="did-ticket-date">
                    {new Date(ticket.date).toLocaleDateString()}
                  </div>
                  <button className="did-view-ticket-btn">View Details</button>
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