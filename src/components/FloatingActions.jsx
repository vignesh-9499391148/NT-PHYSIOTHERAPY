import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(`Hello ${CLINIC_INFO.name}, I would like to inquire about booking a physical therapy session.`);
    const cleanPhone = CLINIC_INFO.phone.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <div className="floating-actions-container">
      {/* WhatsApp Direct Chat Trigger */}
      <button
        onClick={openWhatsApp}
        className="whatsapp-float-btn"
        title="Chat with Clinic on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} />
      </button>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="back-to-top-btn"
          title="Back to Top"
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}
