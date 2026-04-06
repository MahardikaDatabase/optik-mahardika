import React from 'react';
import './About.css';

const About = () => {
  const points = [
    { title: 'Kejelasan Visi', desc: 'Kami bertekad memberikan hasil yang tepat untuk mata Anda.' },
    { title: 'Modis dan Gaya', desc: 'Selalu menghadirkan frame kacamata kekinian.' },
    { title: 'Kualitas dan Ketahanan', desc: 'Produk terbaik dengan garansi purna jual.' }
  ];

  return (
    <section id="tentang-kami" className="about">
      <div className="container about-grid">
        <div className="about-media">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3787.4051381108443!2d119.47612017498234!3d-5.156539594820798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbee33d0876ae59%3A0x90e59e5542a5d90f!2sOptik%20Mahardika!5e1!3m2!1sid!2sid!4v1775421900712!5m2!1sid!2sid" 
            width="100%" 
            height="450" 
            style={{ border: 0, borderRadius: '10px' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Optik Mahardika"
          ></iframe>
        </div>
        <div className="about-content">
          <span className="sup-text">TENTANG KAMI</span>
          <h2 className="section-title">Komitmen Kami terhadap Kualitas Kacamata</h2>
          <p className="section-desc">
            Kami berdedikasi untuk memberikan layanan yang terbaik kepada pelanggan 
            dengan tenaga ahli yang kompeten dan produk berkualitas.
          </p>
          <div className="points-list">
            {points.map((pt, idx) => (
              <div key={idx} className="point-item">
                <span className="check-icon">✓</span>
                <div className="point-text">
                  <h4>{pt.title}</h4>
                  <p>{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
