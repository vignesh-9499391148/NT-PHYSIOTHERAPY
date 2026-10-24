import React, { useState, useEffect } from 'react';
import { Calendar, Phone, Home, Check, ArrowRight, ShieldCheck, Activity, Award } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

const PAIN_CONDITIONS = [
  {
    id: 'spine',
    label: 'Back & Spine',
    tag: 'Sciatica & Disc Care',
    details: 'Spinal decompression, gentle core stabilization, and nerve tension release.'
  },
  {
    id: 'shoulder',
    label: 'Neck & Shoulder',
    tag: 'Frozen Shoulder & Cervical',
    details: 'Myofascial trigger point therapy, neck realignment, and scapular mobility.'
  },
  {
    id: 'knee',
    label: 'Knee & Joint',
    tag: 'Osteoarthritis & Ligaments',
    details: 'Joint mobilization, quadriceps strengthening, and kinetic gait correction.'
  },
  {
    id: 'home',
    label: 'Elderly / Post-Op',
    tag: 'Doorstep Home Care',
    details: 'Bed-to-standing gait training, balance recovery, and gentle stroke rehab at home.'
  }
];

export default function HeroSection({ setActivePage }) {
  const [selectedCondition, setSelectedCondition] = useState(PAIN_CONDITIONS[0]);

  // Dynamic timing-based availability status (Small compact indicator: 8 AM - 10 PM)
  const [availability, setAvailability] = useState(() => {
    const hour = new Date().getHours();
    const isOpen = hour >= 8 && hour < 22; // 8:00 AM to 9:59 PM is Open, 10:00 PM (22:00) onwards is Closed
    return {
      isOpen,
      statusLabel: isOpen ? 'Available:' : 'Not Available:',
      statusDesc: isOpen ? 'Till 10:00 PM' : 'After 10:00 PM',
      badge: isOpen ? 'Dr. Yuvanraj DN, BPT' : 'Reopens 8:00 AM'
    };
  });

  useEffect(() => {
    const calculateAvailability = () => {
      const hour = new Date().getHours();
      const isOpen = hour >= 8 && hour < 22;
      setAvailability({
        isOpen,
        statusLabel: isOpen ? 'Available:' : 'Not Available:',
        statusDesc: isOpen ? 'Till 10:00 PM' : 'After 10:00 PM',
        badge: isOpen ? 'Dr. Yuvanraj DN, BPT' : 'Reopens 8:00 AM'
      });
    };

    calculateAvailability();
    const timer = setInterval(calculateAvailability, 30000); // Check every 30 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-human">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Clinical Value & Doctor Care */}
          <div>
            {/* Live Doctor Status Capsule (Timing-Based Availability) */}
            <div 
              className={`hero-status-pill ${availability.isOpen ? 'available' : 'unavailable'}`}
              title={availability.isOpen 
                ? "Dr. Yuvanraj DN is available for clinic consultations and doorstep visits until 10:00 PM." 
                : "Clinic consultations are closed after 10:00 PM. Reopens at 8:00 AM. Emergency booking is accepted online."}
            >
              <span className="hero-status-dot-wrapper">
                <span className="hero-status-dot"></span>
                <span className="hero-status-ring"></span>
              </span>
              <span className="hero-status-text">
                <strong>{availability.statusLabel}</strong> {availability.statusDesc}
              </span>
              <span className="hero-status-badge">{availability.badge}</span>
            </div>

            <h1 className="hero-title">
              Targeted Physical Therapy to <span className="highlight-gradient">Restore Movement</span> & Live Pain-Free.
            </h1>

            <p className="hero-desc">
              Personalized, 1-on-1 rehabilitation for chronic spine, joint, and nerve pain — administered directly by Dr. Yuvanraj DN at our Vadamadurai clinic or at your home through doorstep visits.
            </p>

            <div className="hero-checkpoints">
              <div className="hero-checkpoint-item">
                <span className="hero-checkpoint-icon"><Check size={14} /></span>
                <span><strong>1-on-1 Doctor Care:</strong> Every consultation and therapy session is conducted personally.</span>
              </div>
              <div className="hero-checkpoint-item">
                <span className="hero-checkpoint-icon"><Check size={14} /></span>
                <span><strong>Doorstep Home Visits:</strong> Available across Vadamadurai, Dindigul & neighboring localities.</span>
              </div>
              <div className="hero-checkpoint-item">
                <span className="hero-checkpoint-icon"><Check size={14} /></span>
                <span><strong>Evidence-Based & Non-Invasive:</strong> Long-term relief addressing the true root cause.</span>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="hero-actions">
              <button
                onClick={() => {
                  setActivePage('appointment');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn btn-primary btn-lg"
              >
                <Calendar size={18} />
                <span>Book Clinic Consultation</span>
              </button>

              <button
                onClick={() => {
                  setActivePage('appointment');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn btn-emerald btn-lg"
              >
                <Home size={18} />
                <span>Request Home Visit</span>
              </button>

              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="btn btn-secondary btn-lg"
                title="Call Dr. Yuvanraj directly"
              >
                <Phone size={18} color="var(--bs-primary)" />
                <span>{CLINIC_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Authentic Clinical Visual & Interactive Symptom Helper */}
          <div className="hero-visual-card">
            {/* Ambient Aura Spotlight Effect */}
            <div className="hero-visual-glow"></div>

            <div className="hero-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=85"
                alt="Dr. Yuvanraj DN conducting physical therapy consultation"
                className="hero-main-img"
              />

              {/* Verified Clinical Stat Pill - Top */}
              <div className="hero-floating-badge hero-floating-top">
                <div className="hero-badge-icon badge-icon-emerald">
                  <Award size={20} />
                </div>
                <div className="hero-badge-content">
                  <div className="hero-badge-title">
                    3+ Years Practice
                  </div>
                  <div className="hero-badge-sub">
                    500+ Rehabilitated Patients
                  </div>
                </div>
              </div>

              {/* Doorstep Home Care Pill - Bottom */}
              <div className="hero-floating-badge hero-floating-bottom">
                <div className="hero-badge-icon badge-icon-teal">
                  <Home size={20} />
                </div>
                <div className="hero-badge-content">
                  <div className="hero-badge-title">
                    Home Visits Available
                  </div>
                  <div className="hero-badge-sub">
                    Vadamadurai & Dindigul Town
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Symptom Helper Box (Responsive Card) */}
            <div className="hero-symptom-card">
              <div className="hero-symptom-header">
                <span className="hero-symptom-label">
                  Where Are You Experiencing Pain?
                </span>
                <span className="hero-symptom-hint">
                  Select an area below
                </span>
              </div>

              {/* Condition Pills */}
              <div className="hero-symptom-pills">
                {PAIN_CONDITIONS.map((cond) => (
                  <button
                    key={cond.id}
                    onClick={() => setSelectedCondition(cond)}
                    className={`hero-condition-pill ${selectedCondition.id === cond.id ? 'active' : ''}`}
                  >
                    {cond.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Condition Details */}
              <div className="hero-symptom-preview">
                <div className="hero-symptom-details">
                  <div className="hero-symptom-tag">
                    {selectedCondition.tag}
                  </div>
                  <div className="hero-symptom-desc">
                    {selectedCondition.details}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActivePage('appointment');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn btn-primary btn-sm hero-symptom-btn"
                >
                  <span>Book for This</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
