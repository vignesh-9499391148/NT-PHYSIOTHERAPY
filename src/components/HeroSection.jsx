import React, { useState } from 'react';
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

  return (
    <section className="hero-human">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Clinical Value & Doctor Care */}
          <div>
            <div className="hero-badge">
              <ShieldCheck size={16} />
              <span>Dr. Yuvanraj DN, BPT • Chief Physiotherapist</span>
            </div>

            <h1 className="hero-title">
              Targeted Physical Therapy to <span className="highlight">Restore Movement</span> & Relieve Pain.
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
            <div className="hero-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80"
                alt="Dr. Yuvanraj DN conducting physical therapy consultation"
                className="hero-main-img"
              />

              {/* Verified Clinical Stat Pill - Top */}
              <div className="hero-floating-badge hero-floating-top">
                <div className="hero-badge-icon" style={{ background: '#ECFDF5', color: '#059669' }}>
                  <Award size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--bs-dark)', lineHeight: 1.2 }}>
                    3+ Years Practice
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--bs-text-muted)' }}>
                    500+ Rehabilitated Patients
                  </div>
                </div>
              </div>

              {/* Doorstep Home Care Pill - Bottom */}
              <div className="hero-floating-badge hero-floating-bottom">
                <div className="hero-badge-icon" style={{ background: '#F0F9FB', color: '#0A5C6F' }}>
                  <Home size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--bs-dark)', lineHeight: 1.2 }}>
                    Home Visits Available
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--bs-text-muted)' }}>
                    Vadamadurai & Dindigul Town
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Symptom Helper Box */}
            <div style={{
              background: 'var(--bs-white)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--bs-border)',
              padding: '1.25rem 1.5rem',
              marginTop: '1.25rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--bs-primary)' }}>
                  Where Are You Experiencing Pain?
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--bs-text-muted)' }}>
                  Select an area below
                </span>
              </div>

              {/* Condition Pills */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {PAIN_CONDITIONS.map((cond) => (
                  <button
                    key={cond.id}
                    onClick={() => setSelectedCondition(cond)}
                    style={{
                      border: '1px solid',
                      borderColor: selectedCondition.id === cond.id ? 'var(--bs-primary)' : 'var(--bs-border)',
                      background: selectedCondition.id === cond.id ? 'var(--bs-primary-light)' : 'var(--bs-white)',
                      color: selectedCondition.id === cond.id ? 'var(--bs-primary)' : 'var(--bs-text)',
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.85rem',
                      fontWeight: selectedCondition.id === cond.id ? '700' : '500',
                      cursor: 'pointer',
                      transition: 'var(--transition)'
                    }}
                  >
                    {cond.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Condition Details */}
              <div style={{
                background: 'var(--bs-light)',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--bs-dark)' }}>
                    {selectedCondition.tag}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--bs-text)', marginTop: '2px' }}>
                    {selectedCondition.details}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActivePage('appointment');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn btn-primary btn-sm"
                  style={{ flexShrink: 0 }}
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
