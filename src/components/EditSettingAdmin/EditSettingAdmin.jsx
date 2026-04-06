import React, { useContext, useState } from 'react';
import { AppDataContext } from '../../context/AppDataContext';
import { ShieldAlert, Check } from 'lucide-react';

const EditSettingAdmin = () => {
  const { adminCredentials, updateCredentialsLive } = useContext(AppDataContext);
  const [formData, setFormData] = useState({ ...adminCredentials });
  const [isSaved, setIsSaved] = useState(false);

  // 🔐 Handle Simpan ke Context
  const handleSave = () => {
    // Simpan dengan menghapus spasi di awal/akhir untuk keamanan
    const cleanedData = {
      id: formData.id.trim(),
      key: formData.key.trim()
    };
    updateCredentialsLive(cleanedData);
    setFormData(cleanedData); // Update input field agar sinkron dengan yang di-trim
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // ✅ Konfirmasi sebelum save
  const handleConfirmSave = () => {
    if (window.confirm("Apakah Anda yakin ingin mengubah kredensial admin?")) {
      handleSave();
    } else {
      // Batal: kembalikan input ke data yang ada di context (tidak berubah)
      setFormData({ ...adminCredentials });
    }
  };

  return (
    <>
      <h1 className="overview-header" style={{ marginBottom: '1rem' }}>Admin System Settings</h1>
      <div className="edit-container" style={{ maxWidth: '600px', marginTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', color: '#dc2626' }}>
          <ShieldAlert size={24} style={{ marginRight: '10px' }} />
          <h3 style={{ margin: 0 }}>Authentication Security</h3>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '2rem' }}>
          Update the master credentials used to access the Visionary Curator Dashboard.
          Please keep these credentials secure.
        </p>

        <div className="form-group-edit">
          <label>Administrator ID</label>
          <input
            type="text"
            value={formData.id || ''}
            onChange={e => setFormData({ ...formData, id: e.target.value })}
            placeholder="Enter new Admin ID"
          />
        </div>

        <div className="form-group-edit">
          <label>Security Key (Password)</label>
          <input
            type="text"
            value={formData.key || ''}
            onChange={e => setFormData({ ...formData, key: e.target.value })}
            placeholder="Enter new Security Key"
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={handleConfirmSave} className="btn-save">
            Update Credentials
          </button>

          {isSaved && (
            <div style={{ display: 'flex', alignItems: 'center', color: '#16a34a', fontWeight: '600', fontSize: '0.9rem', marginLeft: '1rem' }}>
              <Check size={18} style={{ marginRight: '5px' }} />
              Credentials Updated!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditSettingAdmin;