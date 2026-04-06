import React, { useContext, useState, useRef, useMemo } from 'react';
import { SlidersHorizontal, ArrowDownUp, Search } from 'lucide-react';
import { AppDataContext } from '../../context/AppDataContext';
import p1 from '../../assets/product1.png';

const EditProduk = () => {
  const { products, addOrUpdateProduct, deleteProductLive } = useContext(AppDataContext);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', tag: '', brand: '', img: '', category: 'Eyeglasses' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const itemsPerPage = 5;
  const fileInputRef = useRef(null);

  // State untuk Filter dan Sort
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [sortOrder, setSortOrder] = useState('');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Mendapatkan daftar brand yang unik
  const uniqueBrands = useMemo(() => {
    const brands = products.map(p => p.brand).filter(b => b);
    return [...new Set(brands)];
  }, [products]);

  // Logika Filter & Sort (Diterapkan sebelum Pagination)
  const processedProducts = useMemo(() => {
    let result = [...products];

    // Filter Search By Name
    if (searchQuery.trim()) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase().trim()));
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
  }, [products, filterBrand, sortOrder, searchQuery]);

  // Dropdown Styles
  const dropdownStyle = {
    position: 'absolute',
    top: '100%',
    right: 0,
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

  // 📊 Helper: Format angka mentah ke tampilan Rupiah
  const formatPriceDisplay = (value) => {
    if (!value) return '';
    const raw = String(value).replace(/[^0-9]/g, '');
    const num = parseInt(raw, 10);
    return isNaN(num) ? '' : `Rp ${num.toLocaleString('id-ID')}`;
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name || '',
      price: product.price || '',
      tag: product.tag || '',
      brand: product.brand || '',
      img: product.img || '',
      category: product.category || 'Eyeglasses'
    });
    setIsFormOpen(true);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // 🖼️ Upload & Auto Crop 1:1 + Validasi 500KB
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 500 * 1024) {
      alert("Ukuran gambar melebihi batas maksimal 500KB. Silakan pilih gambar yang lebih kecil.");
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const size = Math.min(img.width, img.height);
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(
          img,
          (img.width - size) / 2,
          (img.height - size) / 2,
          size, size,
          0, 0, size, size
        );

        const croppedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        setFormData(prev => ({ ...prev, img: croppedBase64 }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    // 🔍 Validasi Field Wajib
    if (!formData.name.trim() || !formData.price.trim() || !formData.brand.trim() || !formData.img) {
      alert("Harap isi semua field yang wajib diisi (*).");
      return;
    }

    if (editingId) {
      addOrUpdateProduct({ ...formData, id: editingId }, true);
    } else {
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      addOrUpdateProduct({
        id: newId,
        img: formData.img,
        name: formData.name,
        price: formData.price,
        tag: formData.tag,
        brand: formData.brand,
        category: formData.category
      }, false);
    }
    setEditingId(null);
    setFormData({ name: '', price: '', tag: '', brand: '', img: '', category: 'Eyeglasses' });
    setIsFormOpen(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = (id) => {
    deleteProductLive(id);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: '', price: '', tag: '', brand: '', img: '', category: 'Eyeglasses' });
    setIsFormOpen(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // 📄 Pagination Logic (Menerapkan ke processedProducts bukan products utuh)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = processedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(processedProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <h1 className="overview-header" style={{ marginBottom: '1rem' }}>Products Catalog</h1>

      {/* Accordion / Collapsible Form */}
      <div className="edit-container" style={{ marginBottom: '2rem' }}>
        <div 
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
          onClick={() => {
            if (isFormOpen && editingId) {
              setEditingId(null);
              setFormData({ name: '', price: '', tag: '', brand: '', img: '', category: 'Eyeglasses' });
            }
            setIsFormOpen(!isFormOpen);
          }}
        >
          <h3 style={{ margin: 0, color: '#1e293b' }}>
            {editingId ? '✏️ Edit Product' : '➕ Add New Product'}
          </h3>
          <span style={{ fontSize: '1.2rem', color: '#64748b', transition: 'transform 0.3s', transform: isFormOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            ▼
          </span>
        </div>

        {isFormOpen && (
          <div style={{ marginTop: '1.5rem', animation: 'fadeIn 0.3s ease-in-out' }}>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>

              <div className="form-group-edit" style={{ flex: '1 1 45%' }}>
                <label>Product Name <span style={{ color: 'red' }}>*</span></label>
                <input
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Model REK-87851"
                />
              </div>

              <div className="form-group-edit" style={{ flex: '1 1 45%' }}>
                <label>Price <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  value={formatPriceDisplay(formData.price)}
                  onChange={e => {
                    const raw = e.target.value.replace(/[^0-9]/g, '');
                    setFormData(prev => ({ ...prev, price: raw }));
                  }}
                  placeholder="e.g. 650000"
                />
              </div>

              <div className="form-group-edit" style={{ flex: '1 1 45%' }}>
                <label>Brand <span style={{ color: 'red' }}>*</span></label>
                <input
                  value={formData.brand}
                  onChange={e => setFormData({ ...formData, brand: e.target.value })}
                  placeholder="e.g. Ray-Ban"
                />
              </div>
              <div className="form-group-edit" style={{ flex: '1 1 45%' }}>
                <label>Category <span style={{ color: 'red' }}>*</span></label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                >
                  <option value="Eyeglasses">Eyeglasses</option>
                  <option value="Sunglasses">Sunglasses</option>
                </select>
              </div>
              <div className="form-group-edit" style={{ flex: '1 1 45%' }}>
                <label>Tag (Optional)</label>
                <input
                  value={formData.tag}
                  onChange={e => setFormData({ ...formData, tag: e.target.value })}
                  placeholder="e.g. New, Promo"
                />
              </div>

              <div className="form-group-edit" style={{ flex: '1 1 100%', marginTop: '10px' }}>
                <label>Product Image (Maks 500KB, otomatis 1:1) <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                  style={{ marginBottom: '10px' }}
                />
                {formData.img && (
                  <div style={{
                    width: '150px',
                    height: '150px',
                    border: '2px dashed #cbd5e1',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    marginTop: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#f8fafc'
                  }}>
                    <img src={formData.img} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>
            </div>

            <button onClick={handleSave} className="btn-save" style={{ marginRight: '10px', marginTop: '15px' }}>
              {editingId ? 'Save Changes' : 'Add Product'}
            </button>
            {editingId && (
              <button onClick={handleCancel} className="btn-sm-edit">Cancel</button>
            )}
          </div>
        )}
      </div>

      <div className="edit-container" style={{ padding: '0', overflow: 'visible' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', flexWrap: 'wrap', gap: '15px' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#334155' }}>Manage Inventory</h3>
          
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }} className="filter-actions">
            
            {/* Search Bar */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={16} color="#64748b" style={{ position: 'absolute', left: '10px' }} />
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                style={{ padding: '6px 12px 6px 32px', border: '1px solid #e2e8f0', borderRadius: '6px', outline: 'none', width: '200px' }}
              />
            </div>

            {/* Dropdown Filter */}
            <div style={{ position: 'relative' }}>
              <button 
                className="btn-filter" 
                style={{ padding: '6px 12px', border: '1px solid #e2e8f0', background: 'white', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                onClick={() => { setShowFilterDropdown(!showFilterDropdown); setShowSortDropdown(false); }}
              >
                <SlidersHorizontal size={16} /> Filters {filterBrand && <span style={{ color: '#ea580c', fontWeight: 'bold' }}>({filterBrand})</span>}
              </button>
              {showFilterDropdown && (
                <div style={dropdownStyle}>
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
            <div style={{ position: 'relative' }}>
              <button 
                className="btn-filter" 
                style={{ padding: '6px 12px', border: '1px solid #e2e8f0', background: 'white', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                onClick={() => { setShowSortDropdown(!showSortDropdown); setShowFilterDropdown(false); }}
              >
                <ArrowDownUp size={16} /> Sort {sortOrder === 'asc' ? '(Termurah)' : sortOrder === 'desc' ? '(Termahal)' : ''}
              </button>
              {showSortDropdown && (
                <div style={dropdownStyle}>
                  <button style={dropdownItemStyle} onClick={() => { setSortOrder(''); setShowSortDropdown(false); setCurrentPage(1); }}>Default</button>
                  <button style={dropdownItemStyle} onClick={() => { setSortOrder('asc'); setShowSortDropdown(false); setCurrentPage(1); }}>Harga: Rendah ke Tinggi</button>
                  <button style={dropdownItemStyle} onClick={() => { setSortOrder('desc'); setShowSortDropdown(false); setCurrentPage(1); }}>Harga: Tinggi ke Rendah</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <table className="table-products">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Tag</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(p => (
              <tr key={p.id}>
                <td>
                  <img src={p.img || p1} alt={p.name} className="img-thumbnail" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                </td>
                <td><strong>{p.name}</strong></td>
                <td>{p.category || 'Eyeglasses'}</td>
                <td>{p.brand || '-'}</td>
                <td>{formatPriceDisplay(p.price) || '-'}</td>
                <td>
                  {p.tag ? (
                    <span style={{ background: '#f97316', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem' }}>{p.tag}</span>
                  ) : '-'}
                </td>
                <td>
                  <button onClick={() => handleEditClick(p)} className="btn-sm-edit">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="btn-sm-edit" style={{ color: 'red', borderColor: '#fca5a5' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '1rem', borderTop: '1px solid #e2e8f0', background: '#f8fafc' }}>
            <button 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
              style={{
                padding: '6px 12px',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                background: currentPage === 1 ? '#e2e8f0' : 'white',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Prev
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button 
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '4px',
                  background: currentPage === index + 1 ? '#c0581f' : 'white',
                  color: currentPage === index + 1 ? 'white' : '#334155',
                  cursor: 'pointer',
                  fontWeight: currentPage === index + 1 ? 'bold' : 'normal'
                }}
              >
                {index + 1}
              </button>
            ))}
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
              style={{
                padding: '6px 12px',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                background: currentPage === totalPages ? '#e2e8f0' : 'white',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default EditProduk;