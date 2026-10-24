import React from 'react';
import { Calendar, Award, CheckCircle2, GraduationCap, HeartHandshake, ShieldCheck, MapPin, Phone } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import TeamCard from '../components/TeamCard';
import { TEAM_MEMBERS, CLINIC_INFO } from '../data/clinicData';

export default function TeamPage({ setActivePage, onSelectDoctor }) {
  const doctor = TEAM_MEMBERS[0];

  return (
    <div>
      {/* Page Header Banner */}
      <div className="page-header-banner">
        <div className="container">
          <h1>Chief Physiotherapist</h1>
          <div className="breadcrumb-nav">
            <a href="#home" onClick={(e) => { e.preventDefault(); setActivePage('home'); }}>Home</a>
            <span>/</span>
            <span style={{ color: '#ffffff' }}>Dr. Yuvanraj DN, BPT</span>
          </div>
        </div>
      </div>

      {/* Main Doctor Spotlight */}
      <section className="section">
        <div className="container" style={{ maxWidth: '960px' }}>
          <SectionHeading
            subtitle="Clinical Director"
            title="Dr. Yuvanraj DN, BPT"
            description="Leading physical therapy, spine alignment, and kinetic rehabilitation care in Vadamadurai, Dindigul."
          />

          <div className="doctor-detail-card">
            <div>
              <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', marginBottom: '1.5rem' }}>
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  style={{ width: '100%', height: '380px', objectFit: 'cover', objectPosition: 'center top' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={16} color="var(--bs-primary)" />
                  <span>{CLINIC_INFO.address}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={16} color="var(--bs-primary)" />
                  <span>{CLINIC_INFO.phone}</span>
                </div>
                {doctor.socials?.instagram && (
                  <a
                    href={doctor.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--bs-primary)',
                      fontWeight: '600',
                      textDecoration: 'none',
                      marginTop: '0.25rem',
                      padding: '0.4rem 0.8rem',
                      background: 'var(--bs-primary-light)',
                      borderRadius: '8px',
                      width: 'fit-content'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    <span>Follow @n_t_physiotherapy</span>
                  </a>
                )}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--bs-primary)', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block', marginBottom: '0.5rem' }}>
                {doctor.title}
              </span>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>{doctor.name}</h2>
              
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--bs-primary-light)', padding: '0.4rem 1rem', borderRadius: '50px', marginBottom: '1.5rem' }}>
                <GraduationCap size={16} color="var(--bs-primary)" />
                <span style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--bs-primary)' }}>
                  {doctor.education} &bull; {doctor.experience}
                </span>
              </div>

              <p style={{ color: 'var(--bs-gray)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                {doctor.bio}
              </p>

              <h4 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Clinical Specializations:</h4>
              <ul className="doctor-specs-list">
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={16} color="var(--bs-primary)" />
                  <span>Hands-on Manual Therapy</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={16} color="var(--bs-primary)" />
                  <span>Cervical & Lumbar Decompression</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={16} color="var(--bs-primary)" />
                  <span>Athletic Sports Recovery</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={16} color="var(--bs-primary)" />
                  <span>Doorstep Home Visit Care</span>
                </li>
              </ul>

              <button
                onClick={() => {
                  onSelectDoctor(doctor);
                  setActivePage('appointment');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn btn-primary btn-lg"
              >
                <Calendar size={18} />
                <span>Book Direct Consultation With Dr. Yuvanraj DN</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
