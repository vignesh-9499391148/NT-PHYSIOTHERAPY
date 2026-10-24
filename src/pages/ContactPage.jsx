import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, MessageCircle, ShieldCheck } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { CLINIC_INFO } from '../data/clinicData';
import { sanitizeInput, validateEmail, validatePhone, isBotSubmission, checkRateLimit, detectThreats } from '../utils/security';
import { submitToWeb3Forms } from '../utils/web3forms';

export default function ContactPage({ setActivePage }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    website_trap: '' // Honeypot field
  });

  const [formStartTime] = useState(Date.now());
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [securityError, setSecurityError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Please provide a valid email';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message content is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSecurityError('');

    // Security Check 1: Anti-bot honeypot & timing
    const botCheck = isBotSubmission(formData.website_trap, formStartTime, 1.8);
    if (botCheck.isBot) {
      setSecurityError('Automated bot submission blocked by Cyber Shield.');
      return;
    }

    // Security Check 2: Rate Limit Check: max 3 per 60s
    const rateCheck = checkRateLimit('contact_submission', 3, 60);
    if (!rateCheck.allowed) {
      setSecurityError(`Security Cooldown: Please wait ${rateCheck.remainingSeconds}s before sending another message.`);
      return;
    }

    // Security Check 3: SQL/XSS Injection Threat Scanner
    const contentToScan = `${formData.name} ${formData.subject} ${formData.message}`;
    const threat = detectThreats(contentToScan);
    if (!threat.safe) {
      setSecurityError(`Security Alert: ${threat.reason}`);
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);

    (async () => {
      try {
        await submitToWeb3Forms({
          formType: 'contact',
          subject: `[Contact Inquiry] ${formData.subject} - from ${formData.name}`,
          data: {
            'Patient / Sender Name': formData.name,
            'Email Address': formData.email,
            'Phone Number': formData.phone || 'Not provided',
            'Subject': formData.subject,
            'Message': formData.message
          }
        });

        setIsSubmitting(false);
        setSuccessMessage(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          website_trap: ''
        });
      } catch (err) {
        setIsSubmitting(false);
        setSecurityError('Unable to send inquiry. Please call or message via WhatsApp.');
      }
    })();
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(`Hello ${CLINIC_INFO.name}, I would like to get in touch with your reception team.`);
    const cleanPhone = CLINIC_INFO.phone.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <div>
      {/* Page Header Banner */}
      <div className="page-header-banner">
        <div className="container">
          <h1>Contact NT Physiotherapy Clinic</h1>
          <div className="breadcrumb-nav">
            <a href="#home" onClick={(e) => { e.preventDefault(); setActivePage('home'); }}>Home</a>
            <span>/</span>
            <span style={{ color: '#ffffff' }}>Contact Us</span>
          </div>
        </div>
      </div>

      {/* Contact Information Cards */}
      <section className="section" style={{ paddingBottom: '2rem' }}>
        <div className="container">
          <SectionHeading
            subtitle="Get In Touch"
            title="We Are Here to Answer Your Treatment Inquiries"
            description="Reach our front desk directly for scheduling questions, insurance verification, or emergency inquiries."
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
            {/* Card 1: Address */}
            <div style={{ background: 'var(--bs-white)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--bs-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'var(--bs-primary-light)', color: 'var(--bs-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <MapPin size={24} />
              </div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Clinic Address</h4>
              <p style={{ color: 'var(--bs-gray)', fontSize: '0.9rem', margin: '0 0 10px' }}>
                {CLINIC_INFO.address}
              </p>
              <a
                href={CLINIC_INFO.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.85rem', color: 'var(--bs-primary)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                Get Directions &rarr;
              </a>
            </div>

            {/* Card 2: Phone */}
            <div style={{ background: 'var(--bs-white)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--bs-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'var(--bs-primary-light)', color: 'var(--bs-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Phone size={24} />
              </div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Phone & Hotline</h4>
              <p style={{ color: 'var(--bs-gray)', fontSize: '0.9rem', margin: '0 0 4px' }}>
                Main: <a href={`tel:${CLINIC_INFO.phone}`}>{CLINIC_INFO.phone}</a>
              </p>
              <p style={{ color: 'var(--bs-gray)', fontSize: '0.9rem', margin: 0 }}>
                Emergency: <strong style={{ color: 'var(--bs-primary)' }}>{CLINIC_INFO.emergencyPhone}</strong>
              </p>
            </div>

            {/* Card 3: Email */}
            <div style={{ background: 'var(--bs-white)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--bs-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'var(--bs-primary-light)', color: 'var(--bs-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Mail size={24} />
              </div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Email Inquiries</h4>
              <p style={{ color: 'var(--bs-gray)', fontSize: '0.9rem', margin: '0 0 4px' }}>
                Support: <a href={`mailto:${CLINIC_INFO.email}`}>{CLINIC_INFO.email}</a>
              </p>
              <p style={{ color: 'var(--bs-gray)', fontSize: '0.9rem', margin: 0 }}>
                Booking: <a href={`mailto:${CLINIC_INFO.appointmentEmail}`}>{CLINIC_INFO.appointmentEmail}</a>
              </p>
            </div>

            {/* Card 4: Hours */}
            <div style={{ background: 'var(--bs-white)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--bs-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'var(--bs-primary-light)', color: 'var(--bs-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Clock size={24} />
              </div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Clinic Hours</h4>
              <p style={{ color: 'var(--bs-gray)', fontSize: '0.9rem', margin: '0 0 4px' }}>{CLINIC_INFO.hours.weekdays}</p>
              <p style={{ color: 'var(--bs-gray)', fontSize: '0.9rem', margin: 0 }}>{CLINIC_INFO.hours.saturday}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Split Form & Map Section */}
      <section className="section section-bg">
        <div className="container">
          <div className="contact-split-grid">
            {/* Contact Form */}
            <div className="contact-form-card">
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(135deg, #128C7E, #25D366)' }} />
              <span className="sub-title-badge">Direct Message</span>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Send Us A Message</h2>
              <p style={{ color: 'var(--bs-gray)', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
                Questions regarding treatment techniques or insurance coverage? We typically reply within 2 business hours.
              </p>

              {securityError && (
                <div style={{ background: 'rgba(220,53,69,0.1)', border: '1px solid var(--bs-danger)', color: 'var(--bs-danger)', padding: '0.8rem 1rem', borderRadius: '8px', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                  <AlertCircle size={18} />
                  <span>{securityError}</span>
                </div>
              )}

              {successMessage ? (
                <div style={{ background: 'var(--bs-primary-light)', padding: '2rem', borderRadius: '14px', textAlign: 'center' }}>
                  <CheckCircle2 size={42} color="var(--bs-primary)" style={{ margin: '0 auto 1rem' }} />
                  <h4 style={{ margin: '0 0 0.5rem', color: 'var(--bs-dark)' }}>Message Sent Successfully!</h4>
                  <p style={{ color: 'var(--bs-gray)', fontSize: '0.95rem', margin: '0 0 1.5rem' }}>
                    Thank you for reaching out. One of our clinical coordinators will respond promptly.
                  </p>
                  <button onClick={() => setSuccessMessage(false)} className="btn btn-primary btn-sm">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Honeypot field */}
                  <input
                    type="text"
                    name="website_trap"
                    value={formData.website_trap}
                    onChange={handleChange}
                    className="security-trap"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div className="form-grid">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Full Name *"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                      />
                      {errors.name && <span style={{ color: 'var(--bs-danger)', fontSize: '0.8rem' }}>{errors.name}</span>}
                    </div>

                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                      />
                      {errors.email && <span style={{ color: 'var(--bs-danger)', fontSize: '0.8rem' }}>{errors.email}</span>}
                    </div>

                    <div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number (Optional)"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject / Topic *"
                        value={formData.subject}
                        onChange={handleChange}
                        className="form-control"
                      />
                      {errors.subject && <span style={{ color: 'var(--bs-danger)', fontSize: '0.8rem' }}>{errors.subject}</span>}
                    </div>

                    <div className="form-group-full">
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="How can our clinical team help you today? *"
                        value={formData.message}
                        onChange={handleChange}
                        className="form-control"
                        style={{ resize: 'vertical' }}
                      />
                      {errors.message && <span style={{ color: 'var(--bs-danger)', fontSize: '0.8rem' }}>{errors.message}</span>}
                    </div>

                    <div className="form-group-full">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-form-submit btn-lg"
                        style={{ width: '100%', padding: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                      >
                        <Send size={16} />
                        <span>{isSubmitting ? 'Sending...' : 'Send Secure Message'}</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Map & WhatsApp Callout */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {/* WhatsApp Callout Card */}
              <div style={{ background: 'linear-gradient(135deg, #128C7E, #25D366)', color: '#ffffff', padding: '2rem', borderRadius: '16px', boxShadow: '0 8px 24px rgba(37, 211, 102, 0.25)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.75rem' }}>
                  <MessageCircle size={32} />
                  <h4 style={{ color: '#ffffff', margin: 0, fontSize: '1.3rem' }}>Need Rapid Answers?</h4>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
                  Chat directly with Dr. Yuvanraj DN on WhatsApp or connect on Instagram for real-time consultation guidance and appointment scheduling.
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={openWhatsApp}
                    className="btn btn-light"
                    style={{ color: '#128C7E', fontWeight: '700' }}
                  >
                    <MessageCircle size={18} />
                    <span>WhatsApp Chat</span>
                  </button>
                  <a
                    href={CLINIC_INFO.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{ background: 'rgba(255,255,255,0.2)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.4)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    <span>Instagram</span>
                  </a>
                </div>
              </div>

              {/* Styled Interactive Location Map */}
              <div style={{ background: 'var(--bs-white)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--bs-border)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--bs-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={18} color="var(--bs-primary)" />
                    <strong style={{ fontSize: '0.95rem' }}>NT Physiotherapy Clinic</strong>
                  </div>
                  <a
                    href={CLINIC_INFO.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.85rem', color: 'var(--bs-primary)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    Open in Google Maps &rarr;
                  </a>
                </div>
                <iframe
                  title="NT Physiotherapy Clinic Google Map"
                  src="https://maps.google.com/maps?q=10.4457564,78.1010029(NT+PHYSIOTHERAPY+CLINIC)&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="260"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
