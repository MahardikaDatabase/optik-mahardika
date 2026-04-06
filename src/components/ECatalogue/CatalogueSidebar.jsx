import React from 'react';
import { Eye, Star } from 'lucide-react';

const CatalogueSidebar = ({ activeCategory, setActiveCategory }) => {
  return (
    <aside className="catalogue-sidebar">
      <div className="sidebar-section">
        <h3 className="section-title">Catalogue</h3>
        <span className="section-subtitle">PRECISION EYEWEAR</span>

        <ul className="category-list">
          <li 
            className={activeCategory === 'All' ? 'active' : ''} 
            onClick={() => setActiveCategory('All')}
          >
            <span className="cat-icon" style={{ color: activeCategory === 'All' ? '#ea580c' : 'inherit' }}>❖</span>
            All Products
          </li>
          <li 
            className={activeCategory === 'Eyeglasses' ? 'active' : ''} 
            onClick={() => setActiveCategory('Eyeglasses')}
          >
            <Eye size={18} /> Eyeglasses
          </li>
          <li 
            className={activeCategory === 'Sunglasses' ? 'active' : ''} 
            onClick={() => setActiveCategory('Sunglasses')}
          >
            <Star size={18} /> Sunglasses
          </li>
        </ul>
      </div>

      <div className="expert-consultation">
        <h4>EXPERT CONSULTATION</h4>
        <p>Book a free vision check with our specialists today.</p>
        <button
          className="btn-schedule"
          onClick={() => window.open('https://wa.me/+6281234567890', '_blank', 'noopener,noreferrer')}
        >
          Schedule Now
        </button>
      </div>
    </aside>
  );
};

export default CatalogueSidebar;
