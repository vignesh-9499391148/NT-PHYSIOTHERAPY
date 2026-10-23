import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, AlertCircle } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { saveFeedback, isBotSubmission, checkRateLimit } from '../utils/security';
import { submitToWeb3Forms } from '../utils/web3forms';
import { SERVICES } from '../data/clinicData';

export default function PatientFeedbackSection({
  id = 'patient-feedback',
  bgClass = 'section section-bg',
  subtitle = 'Patient Feedback',
  title = 'Share Your Recovery Experience',
  description = 'Have you undergone physical therapy or rehabilitation with Dr. Yuvanraj DN, BPT? Submit your genuine treatment feedback below.',
  cardTitle = 'Patient Recovery Feedback',
  cardSubtitle = 'Share your recovery story with Dr. Yuvanraj DN, BPT',
  defaultService = ''
}) {
  const [formStartTime, setFormStartTime] = useState(Date.now());
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [submittedFeedback, setSubmittedFeedback] = useState(null);
  const [securityError, setSecurityError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    location: 'Vadamadurai, Dindigul',
    service: defaultService,
    condition: '',
    rating: 5,
    quote: '',
    website_trap: '' // Anti-bot honeypot
  });

  const [errors, setErrors] = useState({});

  const handleRatingClick = (stars) => {
    setFormData((prev) => ({ ...prev, rating: stars }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your full name';
    if (!formData.quote.trim()) newErrors.quote = 'Please write your feedback or recovery experience';
    else if (formData.quote.trim().length < 10) newErrors.quote = 'Feedback must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSecurityError('');

    // Security check 1: Bot honeypot
    const botCheck = isBotSubmission(formData.website_trap, formStartTime);
    if (botCheck.isBot) {
      setSecurityError('Automated submission blocked.');
      return;
    }

    // Security check 2: Rate limiting
    const rateCheck = checkRateLimit('feedback_post', 3, 60);
    if (!rateCheck.allowed) {
      setSecurityError(`Please wait ${rateCheck.remainingSeconds}s before submitting another review.`);
      return;
    }

    if (!validate()) return;

    (async () => {
      try {
        const saved = saveFeedback(formData);
        if (saved) {
          // Forward feedback to Dr. Yuvanraj via Web3Forms
          await submitToWeb3Forms({
            formType: 'feedback',
            subject: `[Patient Feedback ${formData.rating}★] from ${formData.name}`,
            data: {
              'Patient Name': formData.name,
              'Rating': `${formData.rating} / 5 Stars`,
              'Location': formData.location,
              'Clinical Service': formData.service || 'General Physiotherapy',
              'Condition / Problem': formData.condition || 'Not specified',
              'Patient Review': formData.quote,
              'Feedback ID': saved.id
            }
          });

          setSubmittedFeedback(saved);
          setFeedbackSuccess(true);
          setFormData({
            name: '',
            location: 'Vadamadurai, Dindigul',
            service: defaultService,
            condition: '',
            rating: 5,
            quote: '',
            website_trap: ''
          });
        }
      } catch (err) {
        setSecurityError(err.message || 'Security violation detected in submitted content.');
      }
    })();
  };

  const ratingDescriptions = {
    1: '1 Star - Poor',
    2: '2 Stars - Fair',
    3: '3 Stars - Good',
    4: '4 Stars - Very Good',
    5: '5 Stars - Excellent Relief & Recovery'
  };

  return (
    <section className={bgClass} id={id}>
      <div className="container">
        <SectionHeading
          subtitle={subtitle}
          title={title}
          description={description}
        />

        {/* Centered Patient Feedback Form */}
        <div style={{
          maxWidth: '720px',
          margin: '0 auto',
          background: 'var(--bs-white)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--bs-border)',
          boxShadow: '0 10px 30px -5px rgba(18, 140, 126, 0.12), 0 4px 10px rgba(0, 0, 0, 0.04)',
          position: 'relative',
          overflow: 'hidden',
          padding: '2.5rem 2.25rem'
        }}>
          {/* Top Emerald Gradient Accent Bar */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(135deg, #128C7E, #25D366)'
          }} />

          {feedbackSuccess ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(37, 211, 102, 0.12)',
                color: '#128C7E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem'
              }}>
                <CheckCircle2 size={36} color="#128C7E" />
              </div>
              <h3 style={{ color: 'var(--bs-dark)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Thank You For Your Feedback!
              </h3>
              <p style={{ color: 'var(--bs-text-muted)', fontSize: '0.98rem', maxWidth: '480px', margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
                Your feedback regarding Dr. Yuvanraj DN, BPT has been successfully submitted and saved.
              </p>

              {submittedFeedback && (
                <div style={{
                  background: 'var(--bs-light)',
                  border: '1.5px solid #A7F3D0',
                  borderRadius: '14px',
                  padding: '1.5rem',
                  maxWidth: '560px',
                  margin: '0 auto 1.75rem',
                  textAlign: 'left'
                }}>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '0.6rem' }}>
                    {[...Array(submittedFeedback.rating || 5)].map((_, i) => (
                      <Star key={i} size={18} fill="#F8B84E" stroke="#F8B84E" />
                    ))}
                  </div>
                  <p style={{ fontStyle: 'italic', color: 'var(--bs-dark)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                    "{submittedFeedback.quote}"
                  </p>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--bs-dark)' }}>
                    {submittedFeedback.name}
                  </div>
                  {(submittedFeedback.service || submittedFeedback.condition) && (
                    <div style={{ fontSize: '0.82rem', color: '#128C7E', fontWeight: 700, marginTop: '2px' }}>
                      {[submittedFeedback.service, submittedFeedback.condition].filter(Boolean).join(' • ')}
                    </div>
                  )}
                  <div style={{ fontSize: '0.78rem', color: 'var(--bs-text-muted)', marginTop: '2px' }}>
                    {submittedFeedback.location} &bull; Verified Submission
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  setFeedbackSuccess(false);
                  setSubmittedFeedback(null);
                  setFormStartTime(Date.now());
                }}
                className="btn btn-form-submit"
                style={{ padding: '0.85rem 2.2rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <MessageSquarePlus size={18} />
                <span>Submit Another Review</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Form Title & Icon */}
              <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'rgba(37, 211, 102, 0.12)',
                  color: '#128C7E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.85rem'
                }}>
                  <MessageSquarePlus size={26} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--bs-dark)', margin: '0 0 0.35rem' }}>
                  {cardTitle}
                </h3>
                <p style={{ color: 'var(--bs-text-muted)', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>
                  {cardSubtitle}
                </p>
              </div>

              {/* Bot Honeypot */}
              <input
                type="text"
                name="website_trap"
                value={formData.website_trap}
                onChange={handleChange}
                className="security-trap"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ display: 'none' }}
              />

              {securityError && (
                <div style={{
                  background: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  color: '#991B1B',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.88rem'
                }}>
                  <AlertCircle size={16} />
                  <span>{securityError}</span>
                </div>
              )}

              {/* Rating Selector */}
              <div style={{
                marginBottom: '1.5rem',
                textAlign: 'center',
                padding: '1.1rem 1rem',
                background: 'rgba(37, 211, 102, 0.05)',
                border: '1.5px solid #A7F3D0',
                borderRadius: '12px'
              }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--bs-dark)', marginBottom: '0.5rem' }}>
                  Rate Your Experience:
                </label>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '0.4rem' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        transform: star <= formData.rating ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.15s ease'
                      }}
                      title={`${star} Star${star > 1 ? 's' : ''}`}
                    >
                      <Star
                        size={32}
                        fill={star <= formData.rating ? '#F8B84E' : 'none'}
                        stroke={star <= formData.rating ? '#F8B84E' : '#CBD5E1'}
                      />
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#128C7E' }}>
                  {ratingDescriptions[formData.rating] || `${formData.rating} Stars`}
                </div>
              </div>

              {/* Form Input Fields Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.1rem', marginBottom: '1.1rem' }}>
                <div>
                  <label className="form-label">Your Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    style={errors.name ? { borderColor: 'var(--bs-danger)' } : {}}
                  />
                  {errors.name && <span style={{ color: 'var(--bs-danger)', fontSize: '0.8rem', marginTop: '3px', display: 'block' }}>{errors.name}</span>}
                </div>

                <div>
                  <label className="form-label">Your Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Vadamadurai, Dindigul"
                    value={formData.location}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Services & Treatment Received */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.1rem', marginBottom: '1.1rem' }}>
                <div>
                  <label className="form-label">Clinical Service Received</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="form-control"
                    style={{ color: formData.service ? 'var(--bs-dark)' : 'var(--bs-text-muted)' }}
                  >
                    <option value="">Select Service / Treatment (Optional)</option>
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Home Visit Consultation">Home Visit Consultation</option>
                    <option value="Other Clinical Treatment">Other Clinical Treatment</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Condition or Treatment Received</label>
                  <input
                    type="text"
                    name="condition"
                    placeholder="e.g. Back Pain & Sciatica, Knee Rehabilitation, Frozen Shoulder"
                    value={formData.condition}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Your Recovery Experience & Feedback *</label>
                <textarea
                  name="quote"
                  rows={4}
                  placeholder="Share details regarding your treatment, relief, and recovery experience with Dr. Yuvanraj DN, BPT... *"
                  value={formData.quote}
                  onChange={handleChange}
                  className="form-control"
                  style={{ resize: 'vertical', ...(errors.quote ? { borderColor: 'var(--bs-danger)' } : {}) }}
                />
                {errors.quote && <span style={{ color: 'var(--bs-danger)', fontSize: '0.8rem', marginTop: '3px', display: 'block' }}>{errors.quote}</span>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-form-submit btn-lg"
                style={{
                  width: '100%',
                  padding: '0.95rem 1.5rem',
                  fontSize: '1.02rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <CheckCircle2 size={18} />
                <span>Submit Feedback</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
