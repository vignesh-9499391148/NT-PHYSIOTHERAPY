import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Phone, ShieldCheck, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';
import AppointmentForm from '../components/AppointmentForm';
import { CLINIC_INFO } from '../data/clinicData';
import { getStoredAppointments } from '../utils/security';

export default function AppointmentPage({ setActivePage, selectedDepartment = '' }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setAppointments(getStoredAppointments());
  }, []);

  const refreshAppointments = () => {
    setAppointments(getStoredAppointments());
  };

  const clearHistory = () => {
    if (window.confirm('Clear your local appointment booking history?')) {
      localStorage.removeItem('auratherapy_appointments');
      setAppointments([]);
    }
  };

  return (
    <div>
      {/* Page Header Banner */}
      <div className="page-header-banner">
        <div className="container">
          <h1>Book Your Therapy Appointment</h1>
          <div className="breadcrumb-nav">
            <a href="#home" onClick={(e) => { e.preventDefault(); setActivePage('home'); }}>Home</a>
            <span>/</span>
            <span style={{ color: '#ffffff' }}>Book Appointment</span>
          </div>
        </div>
      </div>

      {/* Main Booking Section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.35fr', gap: '3.5rem', alignItems: 'start' }}>
            {/* Left Column: Guidelines & Contact */}
            <div>
              <span className="sub-title-badge">Patient Protocol</span>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '1.25rem' }}>Schedule Your 1-on-1 Recovery Session</h2>
              <p style={{ color: 'var(--bs-gray)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                Take the first step toward lasting mobility. Select your preferred physical therapy department, choose your preferred clinician, and secure your time slot.
              </p>

              <div style={{ background: 'var(--bs-light)', padding: '1.75rem', borderRadius: '16px', border: '1px solid var(--bs-border)', marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={18} color="var(--bs-primary)" />
                  Operating Hours
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--bs-gray-dark)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Monday - Friday:</span>
                    <strong>8:00 AM - 7:00 PM</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Saturday:</span>
                    <strong>9:00 AM - 3:00 PM</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Sunday:</span>
                    <strong style={{ color: 'var(--bs-primary)' }}>Closed (Emergency on Call)</strong>
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--bs-white)', padding: '1.75rem', borderRadius: '16px', border: '1px solid var(--bs-border)', boxShadow: 'var(--shadow-sm)' }}>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={18} color="var(--bs-primary)" />
                  What to Expect on Your First Visit
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--bs-gray)' }}>
                  <li style={{ display: 'flex', gap: '8px' }}>
                    <CheckCircle2 size={16} color="var(--bs-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Comprehensive 45-minute biomechanical movement analysis.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '8px' }}>
                    <CheckCircle2 size={16} color="var(--bs-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Immediate hands-on manual therapy to reduce acute pain.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '8px' }}>
                    <CheckCircle2 size={16} color="var(--bs-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Personalized take-home kinetic exercise guidance.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '8px' }}>
                    <CheckCircle2 size={16} color="var(--bs-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Encrypted digital medical records with zero data sharing.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Appointment Form */}
            <div>
              <AppointmentForm light={false} initialDepartment={selectedDepartment} />
            </div>
          </div>

          {/* Local Appointment Registry / Bookings Viewer */}
          <div style={{ marginTop: '5rem', background: 'var(--bs-light)', padding: '2.5rem', borderRadius: '20px', border: '1px solid var(--bs-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', margin: 0 }}>Your Scheduled Bookings</h3>
                <p style={{ color: 'var(--bs-gray)', fontSize: '0.9rem', margin: '4px 0 0' }}>
                  Appointments scheduled in this session are securely stored locally.
                </p>
              </div>

              {appointments.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="btn btn-light btn-sm"
                  style={{ color: 'var(--bs-danger)' }}
                >
                  <Trash2 size={14} />
                  <span>Clear History</span>
                </button>
              )}
            </div>

            {appointments.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2.5rem', background: 'var(--bs-white)', borderRadius: '12px', border: '1px dashed var(--bs-border)' }}>
                <Calendar size={36} color="var(--bs-gray)" style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
                <p style={{ color: 'var(--bs-gray)', margin: 0 }}>No active appointments found. Use the form above to schedule your first therapy session.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                {appointments.map((apt) => (
                  <div key={apt.id} style={{ background: 'var(--bs-white)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--bs-border)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--bs-primary)', background: 'var(--bs-primary-light)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                        {apt.id}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--bs-success)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={13} /> Confirmed
                      </span>
                    </div>
                    <h5 style={{ margin: '0 0 0.35rem', fontSize: '1.1rem' }}>{apt.patientName}</h5>
                    <p style={{ fontSize: '0.85rem', color: 'var(--bs-gray)', margin: '0 0 0.5rem' }}>{apt.department} &bull; {apt.doctor}</p>
                    <div style={{ fontSize: '0.85rem', color: 'var(--bs-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} color="var(--bs-primary)" />
                      <span>{apt.date} at {apt.timeSlot}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
