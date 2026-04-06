import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-logo">
            <img src={logo} alt="Optik Mahardika" className="logo-img" />
            <span className="logo-text">Optik Mahardika</span>
          </div>
          <div className="top-contact">
            <a href='https://wa.me/6282393234037'>
              <span className="phone">+62823 9323 4037</span>
            </a>
          </div>
        </div>
      </div>
      <nav className="navbar">
        <div className="container nav-content">
          <div className="logo">
            <span className="logo-text">Optik Mahardika</span>
          </div>

          <button className="menu-toggle" onClick={toggleMenu}>
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          </button>

          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <a href="#beranda" className="nav-link" onClick={() => setIsMenuOpen(false)}>Beranda</a>
            <a href="#tentang-kami" className="nav-link" onClick={() => setIsMenuOpen(false)}>Tentang Kami</a>
            <a href="#layanan" className="nav-link nav-desktop-only" onClick={() => setIsMenuOpen(false)}>Layanan</a>
            <a href="#produk" className="nav-link" onClick={() => setIsMenuOpen(false)}>Produk</a>
            <a href="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>Masuk</a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
