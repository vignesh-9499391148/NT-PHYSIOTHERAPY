import React from 'react';

export default function VideoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content-box"
        style={{ maxWidth: '850px', background: '#000000' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header-bar" style={{ background: '#121320', borderBottomColor: '#282A3A' }}>
          <h4 style={{ color: '#ffffff', margin: 0 }}>NT PHYSIOTHERAPY CLINIC - Our Clinical Treatment Philosophy</h4>
          <button onClick={onClose} className="modal-close-btn" style={{ color: '#ffffff' }}>&times;</button>
        </div>
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
          <iframe
            src="https://www.youtube.com/embed/DWRcNpR6Kdc?autoplay=1"
            title="Clinic Video Overview"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
