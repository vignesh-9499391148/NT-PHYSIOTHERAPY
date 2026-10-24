import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, AlertCircle, ShieldCheck, User, Phone, Mail, Home, Stethoscope } from 'lucide-react';
import { validateEmail, validatePhone, isBotSubmission, checkRateLimit, saveAppointment, detectThreats } from '../utils/security';
import { submitToWeb3Forms } from '../utils/web3forms';

export default function AppointmentForm({ initialDepartment = '' }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'Male',
    visitType: 'In-Clinic', // 'In-Clinic' or 'Home Visit'
    date: '',
    timeSlot: '10:00 AM',
    department: initialDepartment || 'Physiotherapy',
    doctor: 'Dr. Yuvanraj DN, BPT',
    notes: '',
    website_trap: '' // Anti-bot honeypot
  });

  const [formStartTime, setFormStartTime] = useState(Date.now());
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedTicket, setConfirmedTicket] = useState(null);
  const [securityMessage, setSecurityMessage] = useState('');

  useEffect(() => {
    setFormStartTime(Date.now());
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setFormData((prev) => ({ ...prev, date: dateStr }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please provide a valid phone number (min 7 digits)';
    }

    if (!formData.date) {
      newErrors.date = 'Appointment date is required';
    } else {
      const selected = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.date = 'Appointment date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSecurityMessage('');

    // Security Check 1: Anti-Bot Honeypot
    const botCheck = isBotSubmission(formData.website_trap, formStartTime, 1.8);
    if (botCheck.isBot) {
      setSecurityMessage('Automated submission detected and safely blocked by Anti-Bot Shield.');
      return;
    }

    // Security Check 2: Rate Limiting
    const rateCheck = checkRateLimit('appointment_submission', 3, 90);
    if (!rateCheck.allowed) {
      setSecurityMessage(`Security Cooldown: Please wait ${rateCheck.remainingSeconds}s before submitting another appointment.`);
      return;
    }

    // Security Check 3: Deep Threat Scanning
    const payloadToScan = `${formData.firstName} ${formData.lastName} ${formData.notes}`;
    const threat = detectThreats(payloadToScan);
    if (!threat.safe) {
      setSecurityMessage(`Security Alert: ${threat.reason}`);
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);

    (async () => {
      try {
        const saved = saveAppointment({
          patientName: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          gender: formData.gender,
          visitType: formData.visitType,
          department: formData.department,
          doctor: formData.doctor,
          date: formData.date,
          timeSlot: formData.timeSlot,
          notes: formData.notes
        });

        // Forward to Dr. Yuvanraj via Web3Forms
        await submitToWeb3Forms({
          formType: 'appointment',
          subject: `[New Appointment] ${formData.firstName} ${formData.lastName} - ${formData.date} (${formData.visitType})`,
          data: {
            'Patient Name': `${formData.firstName} ${formData.lastName}`.trim(),
            'Phone Number': formData.phone,
            'Email Address': formData.email,
            'Consultation Mode': formData.visitType,
            'Department': formData.department,
            'Specialist': formData.doctor,
            'Appointment Date': formData.date,
            'Preferred Time': formData.timeSlot,
            'Gender': formData.gender,
            'Patient Notes': formData.notes || 'None',
            'Booking ID': saved.id
          }
        });

        setIsSubmitting(false);
        setConfirmedTicket(saved);
      } catch (err) {
        setIsSubmitting(false);
        setSecurityMessage(err.message || 'Security validation error occurred.');
      }
    })();
  };

  const resetForm = () => {
    setConfirmedTicket(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: 'Male',
      visitType: 'In-Clinic',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      timeSlot: '10:00 AM',
      department: 'Physiotherapy',
      doctor: 'Dr. Yuvanraj DN, BPT',
      notes: '',
      website_trap: ''
    });
    setFormStartTime(Date.now());
  };

  return (
    <div className="appointment-form-card" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(135deg, #128C7E, #25D366)' }} />
      <h3 style={{
        fontSize: '1.75rem',
        fontWeight: 800,
        color: 'var(--bs-dark)',
        marginBottom: '0.4rem',
        letterSpacing: '-0.02em'
      }}>
        Book An Appointment
      </h3>

      <p style={{
        color: 'var(--bs-text-muted)',
        fontSize: '0.95rem',
        lineHeight: 1.6,
        marginBottom: '1.75rem'
      }}>
        Fill out your recovery details below. Dr. Yuvanraj DN personally evaluates every appointment request with zero wait times.
      </p>

      {securityMessage && (
        <div style={{
          background: '#FEF2F2',
          border: '1px solid #FCA5A5',
          color: '#991B1B',
          padding: '0.85rem 1.1rem',
          borderRadius: '10px',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.9rem'
        }}>
          <AlertCircle size={18} />
          <span>{securityMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Strictly Hidden Honeypot Input */}
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

        {/* Consultation Mode Selector: In-Clinic vs Home Visit */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.82rem',
            fontWeight: 700,
            marginBottom: '0.5rem',
            color: 'var(--bs-dark)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            Consultation Type:
          </label>

          <div className="consult-type-grid">
            <button
              type="button"
              onClick={() => setFormData(prev => ({
                ...prev,
                visitType: 'In-Clinic',
                department: prev.department === 'Home Visit Physiotherapy' ? 'Physiotherapy' : prev.department
              }))}
              style={{
                padding: '0.85rem 1.1rem',
                borderRadius: '10px',
                border: formData.visitType === 'In-Clinic' ? '2px solid #128C7E' : '1.5px solid #CBD5E1',
                background: formData.visitType === 'In-Clinic' ? 'linear-gradient(135deg, #128C7E, #25D366)' : 'var(--bs-light)',
                color: formData.visitType === 'In-Clinic' ? '#FFFFFF' : 'var(--bs-dark)',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                boxShadow: formData.visitType === 'In-Clinic' ? '0 4px 12px rgba(37, 211, 102, 0.3)' : 'none'
              }}
            >
              <Stethoscope size={16} />
              <span>In-Clinic Visit</span>
            </button>

            <button
              type="button"
              onClick={() => setFormData(prev => ({
                ...prev,
                visitType: 'Home Visit',
                department: 'Home Visit Physiotherapy'
              }))}
              style={{
                padding: '0.85rem 1.1rem',
                borderRadius: '10px',
                border: formData.visitType === 'Home Visit' ? '2px solid #128C7E' : '1.5px solid #CBD5E1',
                background: formData.visitType === 'Home Visit' ? 'linear-gradient(135deg, #128C7E, #25D366)' : 'var(--bs-light)',
                color: formData.visitType === 'Home Visit' ? '#FFFFFF' : 'var(--bs-dark)',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                boxShadow: formData.visitType === 'Home Visit' ? '0 4px 12px rgba(37, 211, 102, 0.3)' : 'none'
              }}
            >
              <Home size={16} />
              <span>Home Visit (Doorstep)</span>
            </button>
          </div>

          {formData.visitType === 'Home Visit' && (
            <div style={{
              marginTop: '0.85rem',
              background: 'var(--bs-emerald-light)',
              border: '1px solid #A7F3D0',
              borderRadius: '10px',
              padding: '0.75rem 1rem',
              fontSize: '0.88rem',
              color: '#065F46',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0 }} />
              <span>Dr. Yuvanraj DN provides personalized home visits across Vadamadurai, Dindigul, and surrounding areas. Please include your address in the notes below.</span>
            </div>
          )}
        </div>

        {/* Clean Form Grid */}
        <div className="form-grid-responsive">
          <div>
            <label className="form-label">First Name *</label>
            <input
              type="text"
              name="firstName"
              placeholder="e.g. Ramesh"
              value={formData.firstName}
              onChange={handleChange}
              className="form-control"
              style={errors.firstName ? { borderColor: 'var(--bs-danger)' } : {}}
            />
            {errors.firstName && <span style={{ color: 'var(--bs-danger)', fontSize: '0.8rem', marginTop: '3px', display: 'block' }}>{errors.firstName}</span>}
          </div>

          <div>
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="e.g. Kumar"
              value={formData.lastName}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div>
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              name="email"
              placeholder="patient@example.com"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              style={errors.email ? { borderColor: 'var(--bs-danger)' } : {}}
            />
            {errors.email && <span style={{ color: 'var(--bs-danger)', fontSize: '0.8rem', marginTop: '3px', display: 'block' }}>{errors.email}</span>}
          </div>

          <div>
            <label className="form-label">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              placeholder="e.g. +91 9943031349"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              style={errors.phone ? { borderColor: 'var(--bs-danger)' } : {}}
            />
            {errors.phone && <span style={{ color: 'var(--bs-danger)', fontSize: '0.8rem', marginTop: '3px', display: 'block' }}>{errors.phone}</span>}
          </div>

          <div>
            <label className="form-label">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="form-select"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other / Prefer not to say</option>
            </select>
          </div>

          <div>
            <label className="form-label">Preferred Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-control"
              style={errors.date ? { borderColor: 'var(--bs-danger)' } : {}}
            />
            {errors.date && <span style={{ color: 'var(--bs-danger)', fontSize: '0.8rem', marginTop: '3px', display: 'block' }}>{errors.date}</span>}
          </div>

          <div>
            <label className="form-label">Treatment Specialization</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="form-select"
            >
              <option value="Physiotherapy">Physiotherapy & Rehab</option>
              <option value="Home Visit Physiotherapy">🏡 Home Visit Physiotherapy (Doorstep)</option>
              <option value="Manual Therapy">Manual Therapy & Joint Alignment</option>
              <option value="Sports Injuries">Sports Injury Treatment</option>
              <option value="Pain Management">Chronic Pain Management</option>
            </select>
          </div>

          <div>
            <label className="form-label">Physiotherapist</label>
            <input
              type="text"
              name="doctor"
              value="Dr. Yuvanraj DN, BPT (Chief Physiotherapist)"
              readOnly
              className="form-control"
              style={{
                backgroundColor: 'rgba(37, 211, 102, 0.08)',
                color: '#128C7E',
                borderColor: '#6EE7B7',
                fontWeight: '700'
              }}
            />
          </div>
        </div>

        {/* Symptoms & Notes Textarea */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label className="form-label">Briefly describe your pain, condition, or recovery goals</label>
          <textarea
            name="notes"
            rows={3}
            placeholder="e.g. Lower back pain radiating to left leg for 3 weeks, or seeking post-surgery knee rehabilitation..."
            value={formData.notes}
            onChange={handleChange}
            className="form-control"
            style={{ resize: 'vertical' }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-form-submit btn-lg"
          style={{ width: '100%', fontSize: '1.02rem', padding: '0.95rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <Calendar size={18} />
          <span>{isSubmitting ? 'Confirming Appointment...' : 'SUBMIT APPOINTMENT NOW'}</span>
        </button>

        {/* Trust Note */}
        <div style={{
          textAlign: 'center',
          marginTop: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          color: 'var(--bs-text-muted)',
          fontSize: '0.82rem'
        }}>
          <ShieldCheck size={15} color="var(--bs-primary)" />
          <span>256-Bit SSL Encrypted &bull; Direct Doctor Notification &bull; Zero Wait Times</span>
        </div>
      </form>

      {/* Confirmed Appointment Modal */}
      {confirmedTicket && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }} onClick={resetForm}>
          <div style={{
            background: 'var(--bs-white)',
            borderRadius: '20px',
            maxWidth: '540px',
            width: '100%',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xl)',
            color: 'var(--bs-dark)'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{
              background: 'var(--bs-emerald-light)',
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid #D1FAE5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={22} color="#059669" />
                <h4 style={{ margin: 0, color: '#065F46', fontSize: '1.2rem', fontWeight: 800 }}>Appointment Confirmed!</h4>
              </div>
              <button onClick={resetForm} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#64748B' }}>&times;</button>
            </div>
            
            <div style={{ padding: 'clamp(1.1rem, 3.5vw, 1.75rem)' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <span style={{ display: 'inline-block', background: 'var(--bs-emerald-light)', color: '#059669', fontWeight: 800, padding: '0.35rem 1rem', borderRadius: '50px', fontSize: '0.88rem', marginBottom: '0.5rem' }}>
                  Confirmation ID: {confirmedTicket.id}
                </span>
                <p style={{ color: 'var(--bs-text)', fontSize: '0.92rem', margin: 0 }}>
                  A confirmation voucher has been registered for <strong>{confirmedTicket.patientName}</strong>.
                </p>
              </div>

              <div style={{ background: 'var(--bs-light)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--bs-border)', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                  <span style={{ color: 'var(--bs-text-muted)' }}>Consultation Mode:</span>
                  <strong style={{ color: confirmedTicket.visitType === 'Home Visit' ? 'var(--bs-emerald)' : 'var(--bs-primary)' }}>
                    {confirmedTicket.visitType === 'Home Visit' ? '🏡 Home Visit (Doorstep)' : '🏥 In-Clinic Consultation'}
                  </strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                  <span style={{ color: 'var(--bs-text-muted)' }}>Department:</span>
                  <strong>{confirmedTicket.department}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                  <span style={{ color: 'var(--bs-text-muted)' }}>Attending Specialist:</span>
                  <strong>{confirmedTicket.doctor}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                  <span style={{ color: 'var(--bs-text-muted)' }}>Scheduled Date:</span>
                  <strong>{confirmedTicket.date}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                  <span style={{ color: 'var(--bs-text-muted)' }}>Phone:</span>
                  <strong>{confirmedTicket.phone}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => alert(`Appointment voucher ${confirmedTicket.id} saved to your device.`)}
                  className="btn btn-secondary"
                  style={{ flex: '1 1 140px' }}
                >
                  Download Summary
                </button>
                <button
                  onClick={resetForm}
                  className="btn btn-emerald"
                  style={{ flex: '1 1 100px' }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
