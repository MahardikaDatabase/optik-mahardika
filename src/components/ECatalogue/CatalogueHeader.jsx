import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';

const CatalogueHeader = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <header className="catalogue-header">
      <div className="header-left">
        <div className="logo-container" onClick={handleBackHome} style={{ cursor: 'pointer' }}>
          <h1 className="logo-text">Optik Mahardika</h1>
        </div>
        <button className="back-btn" onClick={handleBackHome}>
          <ArrowLeft size={16} />
          <span>Kembali ke Beranda</span>
        </button>
      </div>

      <div className="search-container">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Cari kacamata impian Anda..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </header>
  );
};

export default CatalogueHeader;
