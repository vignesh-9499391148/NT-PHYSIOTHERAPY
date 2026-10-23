import React from 'react';
import { Calendar, Award } from 'lucide-react';

export default function TeamCard({ doctor, onBookDoctor }) {
  return (
    <div className="team-card">
      <div className="team-img-wrapper">
        <img src={doctor.image} alt={doctor.name} loading="lazy" />
        <div className="team-social-overlay">
          {doctor.socials?.instagram && (
            <a
              href={doctor.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="Instagram"
              title="Instagram: @n_t_physiotherapy"
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
            title="Chat on WhatsApp"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </a>
        </div>
      </div>
      <div className="team-info">
        <h4>{doctor.name}</h4>
        <span className="specialty">{doctor.title}</span>
        <p style={{ fontSize: '0.85rem', color: 'var(--bs-gray)', marginTop: '0.5rem', marginBottom: '1rem' }}>
          {doctor.education}
        </p>
        <button
          onClick={() => onBookDoctor(doctor)}
          className="btn btn-outline-primary btn-sm"
          style={{ width: '100%' }}
        >
          <Calendar size={14} />
          <span>Book With Specialist</span>
        </button>
      </div>
    </div>
  );
}
