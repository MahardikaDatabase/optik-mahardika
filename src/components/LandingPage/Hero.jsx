import React from 'react';
import './Hero.css';
import heroImg from '../../assets/hero.png';

const Hero = () => {
  return (
    <section id="beranda" className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <span className="hero-sup">MAHARDIKA - OPTIK & KESEHATAN</span>
          <h1 className="hero-title">Kacamata Sempurna untuk Gaya Anda</h1>
          <p className="hero-desc">
            Nikmati kualitas terbaik dari Optik Mahardika. Berpengalaman lebih dari 10 tahun
            dalam menyediakan kacamata dan pemeriksaan mata yang akurat untuk kepuasan Anda.
          </p>
        </div>
        <div className="hero-image-wrapper">
          <img src={heroImg} alt="Optik Mahardika Shop" className="hero-image" />
          <div className="hero-badge">
            <span className="badge-number">+14</span>
            <span className="badge-text">Tahun Berdiri</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
