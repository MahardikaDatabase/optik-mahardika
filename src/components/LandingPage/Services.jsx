import React from 'react';
import './Services.css';

const Services = () => {
  const services = [
    { title: 'Pemeriksaan Mata', desc: 'Pemeriksaan mata lengkap oleh ahli profesional.', icon: '👁️' },
    { title: 'Pemasangan Lensa', desc: 'Layanan pemasangan lensa cepat dan akurat.', icon: '👓' },
    { title: 'Peningkatan Lensa', desc: 'Lensa khusus untuk kebutuhan mata Anda.', icon: '✨' }
  ];

  return (
    <section id="layanan" className="services">
      <div className="container">
        <div className="services-header">
          <h2 className="section-title">Layanan Kami</h2>
          <p className="section-desc">Pilihan layanan terbaik untuk kesehatan mata Anda.</p>
        </div>
        <div className="services-grid">
          {services.map((svc, idx) => (
            <div key={idx} className="service-card">
              <span className="service-icon">{svc.icon}</span>
              <h3 className="service-title">{svc.title}</h3>
              <p className="service-desc">{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
