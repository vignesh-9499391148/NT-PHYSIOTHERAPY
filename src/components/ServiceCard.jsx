import React from 'react';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';

export default function ServiceCard({ service, onSelectService, onBookService }) {
  return (
    <div className="service-card">
      <div className="service-img-wrapper">
        <img src={service.image} alt={service.title} loading="lazy" />
        <div className="service-icon-badge">
          <CheckCircle size={22} />
        </div>
      </div>
      <div className="service-body">
        <span style={{ fontSize: '0.8rem', color: 'var(--bs-primary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem', display: 'block' }}>
          {service.category}
        </span>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--bs-border)' }}>
          <button
            onClick={() => onSelectService(service)}
            className="btn btn-primary btn-sm"
          >
            <span>Read More</span>
            <ArrowRight size={14} />
          </button>
          <span style={{ fontSize: '0.85rem', color: 'var(--bs-gray)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={14} />
            {service.duration}
          </span>
        </div>
      </div>
    </div>
  );
}
