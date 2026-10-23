import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Clock, DollarSign, HelpCircle, ChevronDown, Calendar } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import PatientFeedbackSection from '../components/PatientFeedbackSection';
import { SERVICES } from '../data/clinicData';

const FAQS = [
  {
    q: "Do I need a doctor's referral to start physical therapy?",
    a: "No. In New York and most jurisdictions, patients have Direct Access to physical therapy services, allowing you to be evaluated and treated immediately without waiting for a physician's prescription."
  },
  {
    q: "What should I wear to my first physical therapy appointment?",
    a: "Please wear comfortable, loose-fitting athletic clothing (such as gym shorts, t-shirt, and sneakers) that allows our therapists to observe and examine your joint movement comfortably."
  },
  {
    q: "How many sessions will I need before seeing improvement?",
    a: "Most patients experience a significant reduction in acute pain within the first 2 to 4 sessions. Chronic or post-surgical conditions typically require an 8 to 12-week progressive kinetic plan for full stabilization."
  },
  {
    q: "Do you offer home visit physiotherapy?",
    a: "Yes! Dr. Yuvanraj DN, BPT personally provides home visit physiotherapy consultations for patients who cannot travel to our clinic, including senior citizens, post-surgery recovery patients, stroke rehabilitation, and bedridden individuals in Vadamadurai, Dindigul, and neighboring areas."
  },
  {
    q: "Do you accept health insurance or flexible spending accounts (HSA/FSA)?",
    a: "Yes! We accept most major health schemes, private insurance, and cash/UPI. We provide itemized bills and receipts for straightforward claim reimbursement."
  }
];

export default function ServicesPage({ setActivePage, onSelectService, onBookDepartment }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openFaq, setOpenFaq] = useState(0);
  const [modalService, setModalService] = useState(null);

  const categories = ['All', 'Home Care', 'Physical Therapy', 'Spine Care', 'Sports Rehab', 'Pain Management'];

  const filteredServices = activeCategory === 'All'
    ? SERVICES
    : SERVICES.filter((s) => s.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <div>
      {/* Page Header Banner */}
      <div className="page-header-banner">
        <div className="container">
          <h1>Clinical Services & Treatments</h1>
          <div className="breadcrumb-nav">
            <a href="#home" onClick={(e) => { e.preventDefault(); setActivePage('home'); }}>Home</a>
            <span>/</span>
            <span style={{ color: '#ffffff' }}>Services</span>
          </div>
        </div>
      </div>

      {/* Services Grid Section with Filter Tabs */}
      <section className="section">
        <div className="container">
          <SectionHeading
            subtitle="Treatments Catalog"
            title="Comprehensive Physical & Chiropractic Therapies"
            description="Explore our specialized clinical modalities designed to restore joint function, relieve nerve compression, and recondition muscles."
          />

          {/* Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`btn btn-sm ${activeCategory === cat ? 'btn-primary' : 'btn-light'}`}
                style={{ padding: '0.6rem 1.4rem' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="services-grid">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelectService={(s) => setModalService(s)}
                onBookService={() => {
                  onBookDepartment(service.category);
                  setActivePage('appointment');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Patient Journey */}
      <section className="section section-bg">
        <div className="container">
          <SectionHeading
            subtitle="How We Work"
            title="Our 4-Step Patient Recovery Journey"
            description="A clear, structured path from your initial evaluation to total functional recovery."
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'var(--bs-white)', padding: '2.5rem 1.75rem', borderRadius: '16px', border: '1px solid var(--bs-border)', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', background: 'var(--bs-primary)', color: '#ffffff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontSize: '1.25rem', fontWeight: '700' }}>
                1
              </div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>Kinetic Evaluation</h4>
              <p style={{ color: 'var(--bs-gray)', fontSize: '0.9rem', margin: 0 }}>
                In-depth assessment of your posture, joint range of motion, muscle imbalances, and pain triggers.
              </p>
            </div>

            <div style={{ background: 'var(--bs-white)', padding: '2.5rem 1.75rem', borderRadius: '16px', border: '1px solid var(--bs-border)', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', background: 'var(--bs-primary)', color: '#ffffff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontSize: '1.25rem', fontWeight: '700' }}>
                2
              </div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>Custom Plan</h4>
              <p style={{ color: 'var(--bs-gray)', fontSize: '0.9rem', margin: 0 }}>
                A structured roadmap pairing manual therapy, targeted electro-modalities, and active home stretches.
              </p>
            </div>

            <div style={{ background: 'var(--bs-white)', padding: '2.5rem 1.75rem', borderRadius: '16px', border: '1px solid var(--bs-border)', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', background: 'var(--bs-primary)', color: '#ffffff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontSize: '1.25rem', fontWeight: '700' }}>
                3
              </div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>Hands-On Therapy</h4>
              <p style={{ color: 'var(--bs-gray)', fontSize: '0.9rem', margin: 0 }}>
                1-on-1 therapist-guided joint mobilization, myofascial release, and kinetic strength rebuilding.
              </p>
            </div>

            <div style={{ background: 'var(--bs-white)', padding: '2.5rem 1.75rem', borderRadius: '16px', border: '1px solid var(--bs-border)', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', background: 'var(--bs-primary)', color: '#ffffff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontSize: '1.25rem', fontWeight: '700' }}>
                4
              </div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>Sustained Vitality</h4>
              <p style={{ color: 'var(--bs-gray)', fontSize: '0.9rem', margin: 0 }}>
                Milestone re-testing, functional independence, and preventative exercise routines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Feedback Module for Clinical Services */}
      <PatientFeedbackSection
        id="services-feedback"
        bgClass="section"
        subtitle="Patient Feedback"
        title="Share Your Recovery Experience"
        description="Have you undergone physical therapy or rehabilitation with Dr. Yuvanraj DN, BPT? Submit your genuine treatment feedback below."
        cardTitle="Patient Recovery Feedback"
        cardSubtitle="Share your recovery story with Dr. Yuvanraj DN, BPT"
      />

      {/* FAQ Section */}
      <section className="section section-bg">
        <div className="container" style={{ maxWidth: '850px' }}>
          <SectionHeading
            subtitle="Common Questions"
            title="Frequently Asked Treatment Questions"
            description="Everything you need to know before booking your physical therapy appointment."
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bs-white)',
                  borderRadius: '12px',
                  border: '1px solid var(--bs-border)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: 'var(--bs-dark)'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <HelpCircle size={18} color="var(--bs-primary)" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease'
                    }}
                  />
                </button>
                {openFaq === idx && (
                  <div style={{ padding: '0 1.5rem 1.5rem 2.8rem', color: 'var(--bs-gray)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {modalService && (
        <div className="modal-backdrop" onClick={() => setModalService(null)}>
          <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <h3 style={{ margin: 0, fontSize: '1.4rem' }}>{modalService.title}</h3>
              <button onClick={() => setModalService(null)} className="modal-close-btn">&times;</button>
            </div>
            <div className="modal-body-content">
              <img
                src={modalService.image}
                alt={modalService.title}
                style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1.5rem' }}
              />
              <span style={{ display: 'inline-block', background: 'var(--bs-primary-light)', color: 'var(--bs-primary)', fontWeight: '700', padding: '0.3rem 0.9rem', borderRadius: '50px', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                {modalService.category}
              </span>
              <p style={{ color: 'var(--bs-gray)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                {modalService.fullDetails}
              </p>

              <div style={{ display: 'flex', gap: '1.5rem', background: 'var(--bs-light)', padding: '1rem 1.25rem', borderRadius: '10px', marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={16} color="var(--bs-primary)" />
                  <span style={{ fontSize: '0.9rem' }}><strong>Duration:</strong> {modalService.duration}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <DollarSign size={16} color="var(--bs-primary)" />
                  <span style={{ fontSize: '0.9rem' }}><strong>Standard Rate:</strong> {modalService.rate}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={() => setModalService(null)}
                  className="btn btn-light"
                  style={{ flex: 1 }}
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const chosen = modalService.title;
                    setModalService(null);
                    onBookDepartment(chosen);
                    setActivePage('appointment');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  <Calendar size={16} />
                  <span>Book This Treatment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
