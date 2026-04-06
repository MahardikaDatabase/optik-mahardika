import React, { useContext, useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowDownUp } from 'lucide-react';
import { AppDataContext } from '../../context/AppDataContext';

const CatalogueGrid = ({ activeCategory, searchQuery }) => {
  const { products } = useContext(AppDataContext);
  
  const [filterBrand, setFilterBrand] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [sortOrder, setSortOrder] = useState(''); // 'asc' or 'desc'
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset page when search or filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterBrand, activeCategory]);

  // Mendapatkan daftar brand yang unik
  const uniqueBrands = useMemo(() => {
    const brands = products.map(p => p.brand).filter(b => b);
    return [...new Set(brands)];
  }, [products]);

  // Format ke Rupiah
  const formatPriceDisplay = (value) => {
    if (!value) return '';
    const raw = String(value).replace(/[^0-9]/g, '');
    const num = parseInt(raw, 10);
    return isNaN(num) ? '' : `Rp ${num.toLocaleString('id-ID')}`;
  };

  // Logika Filter & Sort
  const processedProducts = useMemo(() => {
    let result = [...products];

    // Filter by Sidebar Active Category
    if (activeCategory === 'Sunglasses') {
      result = result.filter(p => p.category === 'Sunglasses');
    } else if (activeCategory === 'Eyeglasses') {
      // Yang BUKAN Sunglasses (karena defaultnya kacamata biasa)
      result = result.filter(p => !p.category || p.category !== 'Sunglasses');
    }

    // Filter Search By Name
    if (searchQuery && searchQuery.trim()) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
    }

    // Filter Brand
    if (filterBrand) {
      result = result.filter(p => p.brand === filterBrand);
    }

    // Sort Harga
    if (sortOrder) {
      result.sort((a, b) => {
        const priceA = parseInt(String(a.price).replace(/[^0-9]/g, '') || '0', 10);
        const priceB = parseInt(String(b.price).replace(/[^0-9]/g, '') || '0', 10);
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
      });
    }

    return result;
  }, [products, filterBrand, sortOrder, activeCategory, searchQuery]);

  // Logika Pagination
  const totalPages = Math.ceil(processedProducts.length / itemsPerPage);
  const currentItems = processedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const dropdownStyle = {
    position: 'absolute',
    top: '100%',
    marginTop: '0.5rem',
    background: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    minWidth: '200px',
    overflow: 'hidden'
  };

  const dropdownItemStyle = {
    padding: '0.75rem 1rem',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #f1f5f9',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '0.875rem',
    color: '#334155'
  };

  return (
    <main className="catalogue-main">
      <div className="main-header">
        <div>
          <span className="collection-subtitle">OUR COLLECTION</span>
          <h2 className="collection-title">Premium Eyewear</h2>
        </div>
        <div className="filter-actions">
          {/* Dropdown Filter */}
          <div className="dropdown-wrapper" style={{ position: 'relative' }}>
            <button 
              className="btn-filter" 
              onClick={() => { setShowFilterDropdown(!showFilterDropdown); setShowSortDropdown(false); }}
            >
              <SlidersHorizontal size={16} /> Filters {filterBrand && <span style={{ color: '#ea580c', fontWeight: 'bold' }}>({filterBrand})</span>}
            </button>
            {showFilterDropdown && (
              <div style={{ ...dropdownStyle, left: 0 }}>
                <button style={dropdownItemStyle} onClick={() => { setFilterBrand(''); setShowFilterDropdown(false); setCurrentPage(1); }}>
                  Semua Brand
                </button>
                {uniqueBrands.map(brand => (
                  <button 
                    key={brand} 
                    style={{ ...dropdownItemStyle, background: filterBrand === brand ? '#f8fafc' : 'white', fontWeight: filterBrand === brand ? 'bold' : 'normal' }}
                    onClick={() => { setFilterBrand(brand); setShowFilterDropdown(false); setCurrentPage(1); }}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dropdown Sort */}
          <div className="dropdown-wrapper" style={{ position: 'relative' }}>
            <button 
              className="btn-filter" 
              onClick={() => { setShowSortDropdown(!showSortDropdown); setShowFilterDropdown(false); }}
            >
              <ArrowDownUp size={16} /> Sort By {sortOrder === 'asc' ? '(Termurah)' : sortOrder === 'desc' ? '(Termahal)' : ''}
            </button>
            {showSortDropdown && (
              <div style={{ ...dropdownStyle, right: 0 }}>
                <button style={dropdownItemStyle} onClick={() => { setSortOrder(''); setShowSortDropdown(false); setCurrentPage(1); }}>Default</button>
                <button style={dropdownItemStyle} onClick={() => { setSortOrder('asc'); setShowSortDropdown(false); setCurrentPage(1); }}>Harga: Rendah ke Tinggi</button>
                <button style={dropdownItemStyle} onClick={() => { setSortOrder('desc'); setShowSortDropdown(false); setCurrentPage(1); }}>Harga: Tinggi ke Rendah</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="product-grid">
        {currentItems.length > 0 ? currentItems.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img src={product.img} alt={product.name} />
              {product.tag && (
                <span className="product-badge" style={{
                  backgroundColor: product.tag === 'New' ? '#ea580c' : '#475569'
                }}>
                  {product.tag.toUpperCase()}
                </span>
              )}
            </div>

            <div className="product-info">
              <div className="brand-rating">
                <span className="brand-name">{product.brand}</span>
              </div>
              <h3 className="product-name" style={{ flexGrow: 1, marginBottom: '1rem' }}>{product.name}</h3>
              <div className="price-action">
                <span className="price">{formatPriceDisplay(product.price)}</span>
              </div>
            </div>
          </div>
        )) : (
          <div style={{ padding: '2rem', color: '#64748b' }}>Tidak ada produk yang sesuai dengan filter.</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="page-num" 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button 
              key={i + 1} 
              className={`page-num ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button 
            className="page-num"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}
      
      <div className="pagination-text">
        Showing {currentItems.length} of {processedProducts.length} premium products
      </div>
    </main>
  );
};

export default CatalogueGrid;
