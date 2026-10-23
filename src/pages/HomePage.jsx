import React, { useState } from 'react';
import { 
  Check, ArrowRight, Activity, Calendar, Phone, Home, 
  ShieldCheck, HeartPulse, Sparkles, Clock, MapPin, 
  Award, Stethoscope, UserCheck, MessageSquare 
} from 'lucide-react';
import HeroSection from '../components/HeroSection';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import AppointmentForm from '../components/AppointmentForm';
import TeamCard from '../components/TeamCard';
import BlogCard from '../components/BlogCard';
import { SERVICES, FEATURES, TEAM_MEMBERS, BLOG_POSTS, CLINIC_INFO } from '../data/clinicData';

export default function HomePage({ setActivePage, onSelectService, onSelectDoctor, onSelectBlog }) {
  return (
    <div>
      {/* 1. Authentic Human Hero Section */}
      <HeroSection setActivePage={setActivePage} />

      {/* 2. Clinical Trust Pillars (4 Key Standards of Care) */}
      <section className="trust-strip">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon-box">
                <UserCheck size={22} />
              </div>
              <div>
                <h4 className="trust-title">1-on-1 Doctor Care</h4>
                <p className="trust-desc">
                  Every evaluation and therapy session is conducted personally by Dr. Yuvanraj DN, BPT.
                </p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon-box">
                <HeartPulse size={22} />
              </div>
              <div>
                <h4 className="trust-title">Root-Cause Therapy</h4>
                <p className="trust-desc">
                  Hands-on joint mobilization and kinetic exercise targeting origin of pain, not masking symptoms.
                </p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon-box" style={{ background: '#ECFDF5', color: '#059669' }}>
                <Home size={22} />
              </div>
              <div>
                <h4 className="trust-title">Doorstep Home Visits</h4>
                <p className="trust-desc">
                  Professional physical therapy provided directly at home across Vadamadurai & Dindigul.
                </p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon-box">
                <Clock size={22} />
              </div>
              <div>
                <h4 className="trust-title">Zero Rushed Sessions</h4>
                <p className="trust-desc">
                  Dedicated 45–60 minute treatment blocks with unhurried clinical listening and guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Conditions & Treatments Grid */}
      <section className="section" id="services">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Clinical Specializations</span>
            <h2 className="section-title">Evidence-Based Treatments for Sustainable Recovery</h2>
            <p className="section-description">
              From severe spinal compression to chronic joint stiffness and post-surgical rehabilitation, our protocols are grounded in proven medical biomechanics.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelectService={onSelectService}
                onBookService={() => {
                  setActivePage('appointment');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button
              onClick={() => {
                setActivePage('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn btn-secondary btn-lg"
            >
              <span>View All Treatment Details</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Dedicated Home Visit Physical Therapy Showcase */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="home-visit-banner">
            <div className="home-visit-grid">
              <div>
                <span className="home-visit-tag">
                  <Home size={14} />
                  Doorstep Healthcare Service
                </span>
                <h2 className="home-visit-title">
                  Unable to Visit the Clinic? Dr. Yuvanraj Brings Care to Your Home.
                </h2>
                <p className="home-visit-desc">
                  We understand that acute pain, post-surgical recovery, stroke rehabilitation, and elderly mobility limitations make traveling difficult. Dr. Yuvanraj DN provides personalized, equipment-supported physical therapy directly at your residence across <strong>Vadamadurai, Dindigul town</strong>, and surrounding communities.
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => {
                      setActivePage('appointment');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="btn btn-emerald btn-lg"
                  >
                    <Calendar size={18} />
                    <span>Schedule a Home Visit</span>
                  </button>

                  <a
                    href={`tel:${CLINIC_INFO.phone}`}
                    className="btn btn-secondary btn-lg"
                  >
                    <Phone size={18} color="var(--bs-primary)" />
                    <span>Call Dr. Yuvanraj: {CLINIC_INFO.phone}</span>
                  </a>
                </div>
              </div>

              {/* Who Is Home Visit For? */}
              <div className="home-visit-card">
                <h4 style={{ color: 'var(--bs-dark)', fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={20} color="var(--bs-emerald)" />
                  Who Benefits Most from Home Visits?
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', padding: 0, margin: 0, fontSize: '0.92rem', color: 'var(--bs-text)' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <Check size={18} color="var(--bs-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong style={{ color: 'var(--bs-dark)' }}>Elderly Parents & Seniors</strong> needing guided walking & fall prevention.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <Check size={18} color="var(--bs-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong style={{ color: 'var(--bs-dark)' }}>Post-Orthopedic Patients</strong> recovering from knee or hip replacements.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <Check size={18} color="var(--bs-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong style={{ color: 'var(--bs-dark)' }}>Stroke & Neurological Recovery</strong> with paralysis or gait retraining.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <Check size={18} color="var(--bs-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong style={{ color: 'var(--bs-dark)' }}>Severe Acute Back Pain</strong> where sitting and car travel are agonizing.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 4-Step Patient Recovery Framework */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Clinical Methodology</span>
            <h2 className="section-title">A Clear, Transparent Path to Pain-Free Movement</h2>
            <p className="section-description">
              We never apply standardized routines. Every patient undergoes an individualized 4-stage progression designed for lasting functional recovery.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.1rem' }}>
            <div style={{ background: 'var(--bs-white)', padding: '1.4rem 1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--bs-border)', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--bs-primary-light)', color: 'var(--bs-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', marginBottom: '0.75rem' }}>
                01
              </div>
              <h4 style={{ fontSize: '1.12rem', marginBottom: '0.5rem' }}>In-Depth Assessment</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--bs-text)', margin: 0 }}>
                Comprehensive evaluation of spinal curvature, range of motion, muscle imbalances, and nerve tension to pinpoint root pathology.
              </p>
            </div>

            <div style={{ background: 'var(--bs-white)', padding: '1.4rem 1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--bs-border)', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--bs-primary-light)', color: 'var(--bs-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', marginBottom: '0.75rem' }}>
                02
              </div>
              <h4 style={{ fontSize: '1.12rem', marginBottom: '0.5rem' }}>Hands-On Relief</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--bs-text)', margin: 0 }}>
                Gentle manual joint mobilization and soft-tissue myofascial release to reduce swelling, spasm, and immediate pain.
              </p>
            </div>

            <div style={{ background: 'var(--bs-white)', padding: '1.4rem 1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--bs-border)', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--bs-primary-light)', color: 'var(--bs-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', marginBottom: '0.75rem' }}>
                03
              </div>
              <h4 style={{ fontSize: '1.12rem', marginBottom: '0.5rem' }}>Kinetic Retraining</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--bs-text)', margin: 0 }}>
                Targeted muscle activation and functional exercise progressions that rebuild core stability and correct compensation habits.
              </p>
            </div>

            <div style={{ background: 'var(--bs-white)', padding: '1.4rem 1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--bs-border)', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', marginBottom: '0.75rem' }}>
                04
              </div>
              <h4 style={{ fontSize: '1.12rem', marginBottom: '0.5rem' }}>Long-Term Prevention</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--bs-text)', margin: 0 }}>
                Customized home maintenance regimen and ergonomic workplace guidance so you stay completely pain-free for years to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Chief Physiotherapist Profile Showcase */}
      <section className="section" id="team">
        <div className="container">
          <div style={{
            background: 'var(--bs-white)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--bs-border)',
            padding: '2rem 1.75rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'grid',
            gridTemplateColumns: '1fr 1.3fr',
            gap: '2rem',
            alignItems: 'center'
          }}>
            <div>
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80"
                alt="Dr. Yuvanraj DN, BPT - Chief Physiotherapist"
                style={{
                  width: '100%',
                  height: '360px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid var(--bs-border)'
                }}
              />
            </div>

            <div>
              <span className="section-tag" style={{ marginBottom: '0.4rem' }}>
                Chief Physiotherapist & Founder
              </span>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', color: 'var(--bs-dark)' }}>
                Dr. Yuvanraj DN, BPT
              </h2>
              <div style={{ fontSize: '1rem', color: 'var(--bs-primary)', fontWeight: '700', marginBottom: '1.25rem' }}>
                Bachelor of Physiotherapy (BPT) • 3+ Years Clinical Practice
              </div>

              <p style={{ fontSize: '1.02rem', lineHeight: '1.7', color: 'var(--bs-text)', marginBottom: '1.25rem' }}>
                "At NT Physiotherapy Clinic, I established our practice on a foundational belief: true rehabilitation requires compassionate listening, individualized hands-on precision, and treating each patient as a whole human being rather than a symptom on a chart."
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.75rem' }}>
                <div style={{ background: 'var(--bs-light)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--bs-dark)' }}>500+</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--bs-text-muted)' }}>Patients Successfully Rehabilitated</div>
                </div>
                <div style={{ background: 'var(--bs-light)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--bs-primary)' }}>1-on-1</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--bs-text-muted)' }}>Personal Doctor Care (No Assistants)</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    setActivePage('appointment');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn btn-primary"
                >
                  <Calendar size={16} />
                  <span>Book Consultation With Dr. Yuvanraj</span>
                </button>
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="btn btn-secondary"
                >
                  <Phone size={16} />
                  <span>Direct Call: {CLINIC_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Appointment Booking Section */}
      <section className="section section-bg" id="appointment">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Easy Scheduling</span>
            <h2 className="section-title">Schedule Your Clinical Evaluation or Home Visit</h2>
            <p className="section-description">
              Select your consultation type below. Our clinic will confirm your requested slot promptly with zero wait times.
            </p>
          </div>

          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <AppointmentForm />
          </div>
        </div>
      </section>

      {/* 8. Health & Recovery Insights Blog */}
      <section className="section" id="blog">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Clinical Health Education</span>
            <h2 className="section-title">Practical Health Guidance & Postural Tips</h2>
            <p className="section-description">
              Read actionable recommendations from our physiotherapy practice on desk ergonomics, preventing spine compression, and sports injury recovery.
            </p>
          </div>

          <div className="services-grid">
            {BLOG_POSTS.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                onReadPost={onSelectBlog}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
