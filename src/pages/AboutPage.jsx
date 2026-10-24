import React from 'react';
import { Award, Clock, Calendar } from 'lucide-react';
import TeamCard from '../components/TeamCard';
import { TEAM_MEMBERS } from '../data/clinicData';

export default function AboutPage({ setActivePage, onSelectDoctor }) {
  return (
    <div>
      {/* Page Header Banner */}
      <div className="page-header-banner">
        <div className="container">
          <h1>About NT Physiotherapy Clinic</h1>
          <div className="breadcrumb-nav">
            <a href="#home" onClick={(e) => { e.preventDefault(); setActivePage('home'); }}>Home</a>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">About Us</span>
          </div>
        </div>
      </div>

      {/* Main Narrative Section: Two-Column Mission & Image Collage */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            {/* Left Column: Image Collage with Experience Badge */}
            <div className="about-collage">
              <div className="about-experience-badge">
                <div className="years">3+</div>
                <div className="text">Years Care</div>
              </div>

              <img
                src="/about-mission.png"
                alt="Clinic Treatment Facility"
                className="about-main-img"
              />

              <img
                src="/manual-therapy.png"
                alt="Doctor administering manual therapy joint mobilization"
                className="about-floating-img"
              />
            </div>

            {/* Right Column: Mission Content */}
            <div>
              <div className="section-tag-dashed">OUR MISSION</div>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 2.7vw, 2.35rem)',
                fontWeight: 800,
                color: 'var(--bs-dark)',
                lineHeight: 1.25,
                marginBottom: '1rem',
                letterSpacing: '-0.02em'
              }}>
                Doctor-Led Physical Medicine & Evidence-Based Care
              </h2>
              <p style={{ fontSize: '0.98rem', color: 'var(--bs-text)', lineHeight: 1.65, marginBottom: '0.85rem' }}>
                Founded with a conviction that rehabilitation should be deeply personalized, empowering, and transparent, NT Physiotherapy Clinic provides dedicated physical therapy and recovery.
              </p>
              <p style={{ fontSize: '0.92rem', color: 'var(--bs-text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                We reject the "assembly line" therapy model. Every patient is evaluated and treated directly by Dr. Yuvanraj DN, BPT for full 45 to 60-minute one-on-one sessions, utilizing hands-on manual techniques, cutting-edge recovery modalities, and custom movement retraining.
              </p>

              <div className="about-features-grid">
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <Award size={22} color="var(--bs-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h5 style={{ margin: '0 0 2px', fontSize: '0.95rem', fontWeight: 700, color: 'var(--bs-dark)' }}>
                      Certified Physiotherapist
                    </h5>
                    <p style={{ fontSize: '0.82rem', margin: 0, color: 'var(--bs-text-muted)', lineHeight: 1.45 }}>
                      Dr. Yuvanraj DN holds a Bachelor of Physiotherapy (BPT) degree.
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <Clock size={22} color="var(--bs-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h5 style={{ margin: '0 0 2px', fontSize: '0.95rem', fontWeight: 700, color: 'var(--bs-dark)' }}>
                      Zero Wait Time
                    </h5>
                    <p style={{ fontSize: '0.82rem', margin: 0, color: 'var(--bs-text-muted)', lineHeight: 1.45 }}>
                      Strict appointment adherence respecting your busy schedule.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setActivePage('appointment');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn btn-primary btn-lg"
              >
                <Calendar size={18} />
                <span>Book A Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Clinical Stat Cards */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1.25rem' }}>
            <div className="stat-card-item">
              <div className="stat-card-number">3+</div>
              <div className="stat-card-label">YEARS DEDICATED PRACTICE</div>
            </div>
            <div className="stat-card-item">
              <div className="stat-card-number">500+</div>
              <div className="stat-card-label">REHABILITATED PATIENTS</div>
            </div>
            <div className="stat-card-item">
              <div className="stat-card-number">1-on-1</div>
              <div className="stat-card-label">DOCTOR-LED CARE</div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Standards / Modern Facility */}
      <section className="section section-bg">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 2rem' }}>
            <div className="section-tag-dashed">CLINICAL STANDARDS</div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--bs-dark)', marginBottom: '0.5rem' }}>
              A Modern Facility Built for Healing and Recovery
            </h2>
            <p style={{ color: 'var(--bs-text-muted)', fontSize: '0.95rem', margin: 0 }}>
              Explore our private therapy suites, state-of-the-art gym, and sanitized recovery environments.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
            <div className="facility-card">
              <img
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=85"
                alt="Private Treatment Suites"
                className="facility-card-img"
              />
              <div className="facility-card-body">
                <h4 className="facility-card-title">Private Treatment Suites</h4>
                <p className="facility-card-desc">Individual acoustically buffered rooms ensuring confidentiality during assessments.</p>
              </div>
            </div>

            <div className="facility-card">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=85"
                alt="Kinetic Movement Gym"
                className="facility-card-img"
              />
              <div className="facility-card-body">
                <h4 className="facility-card-title">Kinetic Movement Gym</h4>
                <p className="facility-card-desc">Specialized gait analysis, resistance cables, and functional return-to-sport equipment.</p>
              </div>
            </div>

            <div className="facility-card">
              <img
                src="https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=85"
                alt="Electro & Contrast Therapy"
                className="facility-card-img"
              />
              <div className="facility-card-body">
                <h4 className="facility-card-title">Electro & Contrast Therapy</h4>
                <p className="facility-card-desc">Modern ultrasound, localized cryo-compression, and therapeutic stimulation units.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chief Physiotherapist Profile */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 2rem' }}>
            <div className="section-tag-dashed">CHIEF PHYSIOTHERAPIST</div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--bs-dark)', marginBottom: '0.5rem' }}>
              Led by Dr. Yuvanraj DN, BPT
            </h2>
            <p style={{ color: 'var(--bs-text-muted)', fontSize: '0.95rem', margin: 0 }}>
              Dedicated clinician providing individual, non-rushed physical therapy and rehabilitation.
            </p>
          </div>

          <div style={{ maxWidth: '380px', margin: '0 auto' }}>
            {TEAM_MEMBERS.map((doctor) => (
              <TeamCard
                key={doctor.id}
                doctor={doctor}
                onBookDoctor={(doc) => {
                  onSelectDoctor(doc);
                  setActivePage('appointment');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
