import React from 'react';
import { MapPin, Phone, Mail, ChevronRight, ShieldCheck, Code, ExternalLink } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export default function Footer({ setActivePage }) {
  const handleNav = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand & Bio */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.25rem' }}>
              <img
                src="/logo.png?v=full"
                alt="NT PHYSIOTHERAPY CLINIC"
                style={{
                  height: '54px',
                  width: 'auto',
                  borderRadius: '10px',
                  objectFit: 'contain',
                  display: 'block',
                  flexShrink: 0
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: 1.15 }}>
                <h3 style={{ color: '#ffffff', fontSize: '1.45rem', margin: 0, fontFamily: 'var(--font-heading)', letterSpacing: '0.4px', fontWeight: '800' }}>
                  NT PHYSIOTHERAPY
                </h3>
                <span style={{ fontSize: '0.76rem', color: 'var(--bs-primary)', fontWeight: '800', letterSpacing: '4.2px', textTransform: 'uppercase', marginTop: '2px' }}>
                  CLINIC
                </span>
              </div>
            </div>
            <p className="footer-desc">
              Dedicated to restoring mobility, rebuilding neuromuscular strength, and relieving chronic pain through personalized, compassionate physical therapy. <strong>Home visits available across Vadamadurai & Dindigul.</strong>
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem', alignItems: 'center' }}>
              {CLINIC_INFO.socials.instagram && (
                <a
                  href={CLINIC_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label="Instagram"
                  title="Follow Dr. Yuvanraj DN on Instagram: @n_t_physiotherapy"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              )}

              <a
                href={`https://wa.me/919943031349?text=${encodeURIComponent('Hello Dr. Yuvanraj, I would like to book an appointment.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="WhatsApp"
                title="WhatsApp: +91 9943031349"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li className="footer-link-item">
                <a href="#about" onClick={(e) => { e.preventDefault(); handleNav('about'); }}>
                  <ChevronRight size={14} color="var(--bs-primary)" /> About Us
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>
                  <ChevronRight size={14} color="var(--bs-primary)" /> Specialized Care
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#appointment" onClick={(e) => { e.preventDefault(); handleNav('appointment'); }}>
                  <ChevronRight size={14} color="var(--bs-primary)" /> Book Appointment
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#team" onClick={(e) => { e.preventDefault(); handleNav('team'); }}>
                  <ChevronRight size={14} color="var(--bs-primary)" /> Chief Physiotherapist
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#blog" onClick={(e) => { e.preventDefault(); handleNav('blog'); }}>
                  <ChevronRight size={14} color="var(--bs-primary)" /> Health Articles
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#contact" onClick={(e) => { e.preventDefault(); handleNav('contact'); }}>
                  <ChevronRight size={14} color="var(--bs-primary)" /> Contact & Location
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4>Therapy Services</h4>
            <ul className="footer-links">
              <li className="footer-link-item">
                <a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>
                  <ChevronRight size={14} color="var(--bs-primary)" /> Manual Therapy
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>
                  <ChevronRight size={14} color="var(--bs-primary)" /> Physiotherapy Rehab
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>
                  <ChevronRight size={14} color="var(--bs-primary)" /> Home Visit Physiotherapy
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>
                  <ChevronRight size={14} color="var(--bs-primary)" /> Preventative Mobility Care
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>
                  <ChevronRight size={14} color="var(--bs-primary)" /> Sports Injury Rehab
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>
                  <ChevronRight size={14} color="var(--bs-primary)" /> Back & Neck Pain Relief
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Details */}
          <div>
            <h4>Contact Info</h4>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <MapPin size={18} />
                <a
                  href={CLINIC_INFO.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                  title="Open NT Physiotherapy Clinic in Google Maps"
                >
                  {CLINIC_INFO.address}
                </a>
              </li>
              <li className="footer-contact-item">
                <Phone size={18} />
                <span>{CLINIC_INFO.phone}</span>
              </li>
              <li className="footer-contact-item">
                <Mail size={18} />
                <span>{CLINIC_INFO.email}</span>
              </li>
              <li className="footer-contact-item" style={{ marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#888E9E' }}>
                  <strong>Hours:</strong> {CLINIC_INFO.hours.weekdays}<br />
                  {CLINIC_INFO.hours.saturday}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-copyright-bar">
          <div>
            &copy; {new Date().getFullYear()} <strong>{CLINIC_INFO.name}</strong>. All Rights Reserved.
          </div>
          <a
            href={CLINIC_INFO.developer?.linkedin || "https://www.linkedin.com/in/vignesh-k-35a704285?utm_source=share_via&utm_content=profile&utm_medium=member_android"}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-developer-credit"
            title="Website Developed by VIGNESH — View LinkedIn Profile"
            aria-label="Website Developed by VIGNESH (opens LinkedIn profile in a new tab)"
          >
            <Code size={15} color="var(--bs-primary)" aria-hidden="true" />
            <span>Website Developed by <strong>{CLINIC_INFO.developer?.name || "VIGNESH"}</strong></span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="footer-developer-linkedin-icon"
              aria-hidden="true"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
            </svg>
            <ExternalLink size={12} className="footer-developer-ext-icon" aria-hidden="true" />
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8D94A8' }}>
            <ShieldCheck size={16} color="var(--bs-primary)" />
            <span>Cybersecurity Guard & Form Sanitization Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
