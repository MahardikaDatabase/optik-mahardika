import React, { useContext, useState } from 'react';
import { AppDataContext } from '../../context/AppDataContext';
import promoImg from '../../assets/promo.png';

const EditPromo = () => {
  const { promo, updatePromoLive } = useContext(AppDataContext);
  // Fallback aman jika promo belum tersedia, & pastikan field img ada
  const [formData, setFormData] = useState({ ...(promo || {}), img: promo?.img || '' });
  const [isSaved, setIsSaved] = useState(false);

  // 🖼️ Handle Upload Gambar + Validasi Maks 5MB
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validasi Ukuran (Maks 5MB = 5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran gambar melebihi batas maksimal 5MB. Silakan pilih gambar yang lebih kecil.");
      e.target.value = '';
      return;
    }

    // Konversi ke Base64 untuk state & preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, img: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updatePromoLive(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <>
      <h1 className="overview-header" style={{ marginBottom: '1rem' }}>Promotion Settings</h1>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

        {/* 🔧 Konfigurasi Promo */}
        <div className="edit-container" style={{ flex: '2', marginTop: 0 }}>
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Active Promo Configuration</h3>

          <div className="form-group-edit">
            <label>Promo Label (Sup text)</label>
            <input
              value={formData.sup || ''}
              onChange={e => setFormData({ ...formData, sup: e.target.value })}
              placeholder="e.g. Penawaran Menarik"
            />
          </div>

          <div className="form-group-edit">
            <label>Promo Title (Use \n for line breaks)</label>
            <textarea
              value={formData.title || ''}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="Promo title here..."
              style={{ minHeight: '80px' }}
            />
          </div>

          <div className="form-group-edit">
            <label>Promo Description</label>
            <textarea
              value={formData.desc || ''}
              onChange={e => setFormData({ ...formData, desc: e.target.value })}
              placeholder="Promo description here..."
            />
          </div>

          <div className="form-group-edit">
            <label>WhatsApp CTA Link</label>
            <input
              value={formData.link || ''}
              onChange={e => setFormData({ ...formData, link: e.target.value })}
              placeholder="https://wa.me/..."
            />
          </div>

          {/* 📤 Upload Gambar Promo (Baru) */}
          <div className="form-group-edit">
            <label>Promo Image (Maks 5MB)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ marginBottom: '5px' }}
            />
            {formData.img && (
              <div style={{ fontSize: '0.8rem', color: '#16a34a', marginTop: '5px' }}>
                ✓ Gambar berhasil dipilih
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '1rem' }}>
            <button onClick={handleSave} className="btn-save">
              Publish Promo Changes
            </button>
            {isSaved && <span style={{ color: '#16a34a', fontWeight: '600', fontSize: '0.9rem' }}>Changes published to live site!</span>}
          </div>
        </div>

        {/* 👁️ Preview Section */}
        <div className="edit-container" style={{ flex: '1', marginTop: 0, background: '#f8fafc', border: '1px solid #e2e8f0', minWidth: '280px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1rem', color: '#64748b' }}>Promo Image Preview</h3>
          <div style={{ width: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1', aspectRatio: '3/4' }}>
            <img
              src={formData.img || promoImg}
              alt="Promo preview"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
          {/* Teks panduan lama telah dihapus sesuai permintaan */}
        </div>
      </div>
    </>
  );
};

export default EditPromo;