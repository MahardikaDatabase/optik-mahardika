import React from 'react';
import './Footer.css';
import igIcon from '../../assets/instagram.png';
import fbIcon from '../../assets/facebook.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <h2 className="footer-logo">Mahardika</h2>
          <p className="footer-desc">
            Pusat kacamata dan pemeriksaan mata terpercaya di Indonesia.
            Melayani dengan hati untuk penglihatan yang lebih baik.
          </p>
          <div className="social-links">
            <a href="https://www.instagram.com/optik.mahardika/" className="social-icon" aria-label="Instagram">
              <img src={igIcon} alt="Instagram" className="social-img" />
            </a>
            <a href="https://www.facebook.com/p/Optik-Mahardika-61577509176466/" className="social-icon" aria-label="Facebook">
              <img src={fbIcon} alt="Facebook" className="social-img" />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Navigasi</h3>
          <ul>
            <li><a href="#beranda">Beranda</a></li>
            <li><a href="#tentang-kami">Tentang Kami</a></li>
            <li><a href="#layanan">Layanan</a></li>
            <li><a href="#produk">Produk</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Layanan Kami</h3>
          <ul>
            <li>Periksa Mata</li>
            <li>Ganti Lensa</li>
            <li>Pasang Frame</li>
            <li>Konsultasi</li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Hubungi Kami</h3>
          <p>Jl. Antang Raya No.25B</p>
          <p>+62823 9323 4037</p>
          <p>info@optikmahardika.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container bottom-content">
          <p>&copy; 2026 Optik Mahardika. All Rights Reserved. | Design by OrdalStudio</p>
          <div className="policy-links">
            <span>Privasi</span>
            <span>Syarat & Ketentuan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
