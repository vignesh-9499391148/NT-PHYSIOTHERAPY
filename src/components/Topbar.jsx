import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="container">
        <div className="topbar-info">
          <a
            href={CLINIC_INFO.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="topbar-item"
            title="Open NT Physiotherapy Clinic in Google Maps"
          >
            <MapPin size={14} color="#38BDF8" />
            <span>Vadamadurai, Dindigul - 624802</span>
          </a>
          <a href={`tel:${CLINIC_INFO.phone}`} className="topbar-item" title="Call Dr. Yuvanraj">
            <Phone size={14} color="#34D399" />
            <span>{CLINIC_INFO.phone}</span>
          </a>
          <span className="topbar-item">
            <Clock size={14} color="#94A3B8" />
            <span>Mon - Sat: 8:00 AM - 7:00 PM</span>
          </span>
        </div>
        <div className="topbar-socials">
          {CLINIC_INFO.socials.instagram && (
            <a
              href={CLINIC_INFO.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="Instagram"
              title="Follow Dr. Yuvanraj on Instagram: @n_t_physiotherapy"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

