import React from 'react';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';

export default function ServiceCard({ service, onSelectService, onBookService }) {
  return (
    <div className="service-card">
      <div className="service-img-wrapper">
        <img 
          src={service.image} 
          alt={service.title} 
          loading="lazy" 
          style={service.imagePosition ? { objectPosition: service.imagePosition } : {}}
        />
        <span className="service-category-pill">{service.category}</span>
        <div className="service-icon-badge" title="Evidence-Based Treatment">
          <CheckCircle size={20} />
        </div>
      </div>
      <div className="service-body">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--bs-border)' }}>
          <button
            onClick={() => onSelectService(service)}
            className="btn btn-primary btn-sm"
          >
            <span>Read More</span>
            <span className="btn-arrow-icon">
              <ArrowRight size={14} />
            </span>
          </button>
          
          {(service.duration || service.rate) && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minWidth: 0, flexShrink: 0 }}>
              {service.duration && (
                <span style={{ fontSize: '0.82rem', color: 'var(--bs-gray)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} />
                  {service.duration}
                </span>
              )}
              {service.rate && (
                <span style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--bs-primary)' }}>
                  {service.rate}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
