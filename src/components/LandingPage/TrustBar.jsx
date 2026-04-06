import React from 'react';
import './TrustBar.css';

const TrustBar = () => {
  const items = [
    { icon: '📍', text: 'Lokasi Strategis di Pusat Kota', sub: 'Mudah diakses dan nyaman.' },
    { icon: '👓', text: 'Koleksi Kacamata Trendi', sub: 'Model terbaru yang modis.' },
    { icon: '👨‍⚕️', text: 'Konsultasi Mata Gratis', sub: 'Oleh tenaga profesional.' },
    { icon: '🔧', text: 'Penyetelan & Perbaikan', sub: 'Layanan purna jual prima.' }
  ];

  return (
    <section className="trust-bar">
      <div className="container">
        <div className="trust-grid">
          {items.map((item, index) => (
            <div key={index} className="trust-item">
              <span className="trust-icon">{item.icon}</span>
              <div className="trust-text">
                <h3>{item.text}</h3>
                <p>{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
