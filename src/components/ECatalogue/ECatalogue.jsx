import React, { useState } from 'react';
import CatalogueHeader from './CatalogueHeader';
import CatalogueSidebar from './CatalogueSidebar';
import CatalogueGrid from './CatalogueGrid';
import './ECatalogue.css';

const ECatalogue = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="catalogue-page">
      <CatalogueHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="catalogue-layout">
        <CatalogueSidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <CatalogueGrid activeCategory={activeCategory} searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default ECatalogue;
