import React from 'react';

export default function SectionHeading({ subtitle, title, description, light = false }) {
  return (
    <div className="section-title">
      {subtitle && (
        <div className="sub-title-badge" style={light ? { color: 'var(--bs-primary)' } : {}}>
          <span>{subtitle}</span>
        </div>
      )}
      {title && (
        <h2 style={light ? { color: '#ffffff' } : {}}>{title}</h2>
      )}
      {description && (
        <p style={light ? { color: '#D4D8E2' } : {}}>{description}</p>
      )}
    </div>
  );
}
