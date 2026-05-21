import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, Plus, Trash2, Settings2 } from 'lucide-react';
import './LuckyWheel.css';

const DEFAULT_PRIZES = [
  "Kipas angin portabel",
  "Minyak goreng",
  "Tumbler",
  "Tempat kacamata",
  "Cash back 50",
  "Cash back 100",
  "Kacamata single vision",
  "Kacamata baca",
  "Belum beruntung"
];

const COLORS = [
  '#F37021', '#2E86C1', '#28B463', '#8E44AD', '#F1C40F',
  '#E74C3C', '#16A085', '#D35400', '#3498DB', '#9B59B6',
];

const LuckyWheelAdmin = () => {
  const [prizes, setPrizes] = useState(DEFAULT_PRIZES);
  const [mainPrizeIndex, setMainPrizeIndex] = useState(6);
  const [spinThreshold, setSpinThreshold] = useState(10);
  const [currentSpins, setCurrentSpins] = useState(0);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const savedPrizes = localStorage.getItem('lw_prizes');
    if (savedPrizes) setPrizes(JSON.parse(savedPrizes));

    const savedMainPrize = localStorage.getItem('lw_main_prize_index');
    if (savedMainPrize !== null) setMainPrizeIndex(parseInt(savedMainPrize, 10));

    const savedThreshold = localStorage.getItem('lw_spin_threshold');
    if (savedThreshold !== null) setSpinThreshold(parseInt(savedThreshold, 10));

    const savedSpins = localStorage.getItem('lw_current_spins');
    if (savedSpins !== null) setCurrentSpins(parseInt(savedSpins, 10));
  }, []);

  const handleSave = () => {
    localStorage.setItem('lw_prizes', JSON.stringify(prizes));
    localStorage.setItem('lw_main_prize_index', mainPrizeIndex.toString());
    localStorage.setItem('lw_spin_threshold', spinThreshold.toString());
    
    // Auto-reset putaran ketika admin menyimpan pengaturan baru
    setCurrentSpins(0);
    localStorage.setItem('lw_current_spins', '0');
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleResetSpins = () => {
    if (window.confirm('Reset jumlah putaran kembali ke 0?')) {
      setCurrentSpins(0);
      localStorage.setItem('lw_current_spins', '0');
    }
  };

  const handlePrizeChange = (index, value) => {
    const newPrizes = [...prizes];
    newPrizes[index] = value;
    setPrizes(newPrizes);
  };

  const handleAddPrize = () => {
    setPrizes([...prizes, 'Hadiah Baru']);
  };

  const handleDeletePrize = (index) => {
    if (prizes.length <= 2) {
      alert("Minimal harus ada 2 hadiah!");
      return;
    }
    const newPrizes = prizes.filter((_, i) => i !== index);
    setPrizes(newPrizes);
    
    // Adjust mainPrizeIndex if we deleted something before it or deleted it
    if (mainPrizeIndex === index) {
      setMainPrizeIndex(0);
    } else if (mainPrizeIndex > index) {
      setMainPrizeIndex(mainPrizeIndex - 1);
    }
  };

  const spinsLeft = Math.max(0, spinThreshold - currentSpins);

  return (
    <div className="lw-admin-container">
      <div className="lw-admin-header">
        <span className="overview-sup">Pengaturan Modul</span>
        <h1>Lucky Wheel Config</h1>
      </div>

      <div className="lw-stats-row">
        <div className="lw-stat-card">
          <div className="stat-label">Total Putaran Saat Ini</div>
          <p className="stat-value">{currentSpins}</p>
          <div className="stat-desc">Berapa kali roda telah diputar</div>
        </div>
        <div className="lw-stat-card">
          <div className="stat-label">Sisa Putaran ke Hadiah Utama</div>
          <p className={`stat-value ${spinsLeft === 0 ? 'highlight' : ''}`}>{spinsLeft}</p>
          <div className="stat-desc">Saat mencapai 0, hadiah utama bisa dimenangkan</div>
        </div>
        <div className="lw-stat-card">
          <div className="stat-label">Status Hadiah Utama</div>
          <p className={`stat-value ${spinsLeft === 0 ? 'highlight' : 'danger'}`} style={{fontSize: '1.4rem', marginTop: '0.6rem'}}>
            {spinsLeft === 0 ? 'Tersedia ✅' : 'Terkunci 🔒'}
          </p>
        </div>
      </div>

      <div className="lw-config-section">
        <h2><Settings2 size={20} /> Pengaturan Mekanisme</h2>
        <div className="lw-config-grid">
          <div className="lw-config-item">
            <label>Hadiah Utama</label>
            <select 
              value={mainPrizeIndex} 
              onChange={(e) => setMainPrizeIndex(parseInt(e.target.value, 10))}
            >
              {prizes.map((prize, idx) => (
                <option key={idx} value={idx}>{idx + 1}. {prize}</option>
              ))}
            </select>
            <div className="config-help">Pilih hadiah mana yang akan dibatasi kemenangannya.</div>
          </div>
          <div className="lw-config-item">
            <label>Putaran Minimal (Threshold)</label>
            <input 
              type="number" 
              min="0"
              value={spinThreshold}
              onChange={(e) => setSpinThreshold(parseInt(e.target.value, 10) || 0)}
            />
            <div className="config-help">Hadiah utama TIDAK BISA dimenangkan sebelum roda diputar sebanyak ini.</div>
          </div>
        </div>
        <div className="lw-config-actions">
          <button className="btn-lw-save" onClick={handleSave}>
            <Save size={16} style={{marginRight: '8px', verticalAlign: 'middle'}}/> Simpan Pengaturan
          </button>
          <button className="btn-lw-reset" onClick={handleResetSpins}>
            <RefreshCw size={16} style={{marginRight: '8px', verticalAlign: 'middle'}}/> Reset Putaran
          </button>
        </div>
      </div>

      <div className="lw-config-section">
        <h2>Daftar Hadiah Roda</h2>
        <table className="lw-prizes-table">
          <thead>
            <tr>
              <th style={{width: '60px'}}>Warna</th>
              <th>Nama Hadiah</th>
              <th style={{width: '120px'}}>Status</th>
              <th style={{width: '60px'}}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {prizes.map((prize, idx) => (
              <tr key={idx}>
                <td>
                  <span className="prize-color-dot" style={{backgroundColor: COLORS[idx % COLORS.length]}}></span>
                </td>
                <td>
                  <input 
                    type="text" 
                    className="prize-input-inline" 
                    value={prize}
                    onChange={(e) => handlePrizeChange(idx, e.target.value)}
                  />
                </td>
                <td>
                  {idx === mainPrizeIndex && <span className="prize-main-badge">Hadiah Utama</span>}
                </td>
                <td>
                  <button className="btn-delete-prize" onClick={() => handleDeletePrize(idx)} title="Hapus">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn-add-prize" onClick={handleAddPrize}>
          <Plus size={16} /> Tambah Hadiah
        </button>
      </div>

      {showToast && (
        <div className="lw-toast">Pengaturan berhasil disimpan!</div>
      )}
    </div>
  );
};

export default LuckyWheelAdmin;
