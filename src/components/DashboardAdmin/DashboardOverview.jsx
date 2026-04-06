import React, { useContext } from 'react';
import { AppDataContext } from '../../context/AppDataContext';
import { Link } from 'react-router-dom';

const DashboardOverview = () => {
  const { products } = useContext(AppDataContext);

  // Dynamic Metrics Calculation
  const totalProduk = products.length;
  const uniqueBrands = new Set(products.map(p => p.brand).filter(Boolean)).size;
  const sunglassesCount = products.filter(p => p.category === 'Sunglasses').length;
  // Eyeglasses is anything that is not Sunglasses
  const eyeglassesCount = products.filter(p => p.category !== 'Sunglasses').length;

  return (
    <div>
      <div className="overview-header">
        <span className="overview-sup">Performance Overview</span>
        <h1>The Lens Metric</h1>
      </div>

      <div className="metric-card">
        <div className="metric-main">
          <h3>Total Produk</h3>
          <p className="value">{totalProduk}</p>
        </div>
        <div className="metric-stats">
          <div className="stat-item">
            <p>Eyeglasses</p>
            <h4>{eyeglassesCount}</h4>
          </div>
          <div className="stat-item">
            <p>Sunglasses</p>
            <h4>{sunglassesCount}</h4>
          </div>
          <div className="stat-item">
            <p>Brands</p>
            <h4>{uniqueBrands}</h4>
          </div>
        </div>
      </div>

      <div className="section-header">
        <h2>Recently Curated</h2>
        <Link to="/admin/products" className="view-all">Manage All</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {products.slice(0, 4).map((p) => (
          <div key={p.id} style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ height: '150px', backgroundColor: '#f8fafc', borderRadius: '6px', marginBottom: '10px', display:'flex', alignItems:'center', justifyContent:'center' }}>
               <img src={p.img} alt={p.name} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
            </div>
            <p style={{ fontSize: '0.7rem', color: '#d97706', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 5px 0' }}>{p.brand}</p>
            <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}>{p.name}</h4>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{p.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
