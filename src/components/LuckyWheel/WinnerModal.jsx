import React from 'react';
import { X } from 'lucide-react';

const WinnerModal = ({ winner, onClose }) => {
  if (!winner) return null;

  // Choose emoji based on prize
  const isLucky = winner.toLowerCase() !== 'belum beruntung';
  const emoji = isLucky ? '🎉' : '😢';

  return (
    <div className={`modal-overlay ${winner ? 'active' : ''}`}>
      <div className="winner-modal">
        <span className="winner-emoji">{emoji}</span>
        <h3 className="winner-title">
          {isLucky ? 'Selamat! Anda Mendapatkan' : 'Yah...'}
        </h3>
        <div className="winner-name">{winner}</div>
        
        <div className="winner-actions">
          <button className="btn-modal primary" onClick={onClose}>
            <X size={18} /> Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinnerModal;
