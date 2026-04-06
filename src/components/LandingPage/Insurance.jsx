import React from 'react';
import './Insurance.css';
import brilife from '../../assets/BRILIFE.png';
import bnilife from '../../assets/BNILIFE.png';
import bcalife from '../../assets/BCA_Life.svg';
import admedika from '../../assets/Admedika.png';

const Insurance = () => {
  const logos = [
    { name: 'BRI Life', img: brilife },
    { name: 'BNI Life', img: bnilife },
    { name: 'BCA Life', img: bcalife },
    { name: 'Admedika', img: admedika }
  ];

  return (
    <section className="insurance">
      <div className="container">
        <p className="insurance-title">Asuransi yang bisa kami klaim</p>
        <div className="logos-grid">
          {logos.map((logo, idx) => (
            <div key={idx} className="insurance-logo-item">
              <img src={logo.img} alt={logo.name} className="insurance-logo-img" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insurance;
