import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { AppDataContext } from '../../context/AppDataContext';
import './LoginPage.css';

const LoginPage = () => {
  const [id, setId] = useState('');
  const [key, setKey] = useState('');
  const [keepVerified, setKeepVerified] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [superKeyInput, setSuperKeyInput] = useState('');
  const [revealedCreds, setRevealedCreds] = useState(null);
  
  const navigate = useNavigate();
  const { login, adminCredentials } = useContext(AppDataContext);
  
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (superKeyInput === 'RyanKerenSekali') {
      setRevealedCreds(adminCredentials);
    } else {
      alert('Wrong Superkey!');
    }
  };

  const closeForgotModal = () => {
    setShowForgotModal(false);
    setSuperKeyInput('');
    setRevealedCreds(null);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Gunakan .trim() untuk memastikan spasi tidak membuat login gagal
    if (id.trim() === adminCredentials.id.trim() && key.trim() === adminCredentials.key.trim()) {
      login();
      navigate('/admin');
    } else {
      setError('Invalid Administrator ID or Security Key');
    }
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <div className="login-logo-circle">
          <a href='http://localhost:5173/#beranda'>
            <Eye className="login-logo-icon" size={24} />
          </a>
        </div>
        <p className="login-subtitle">INTERNAL ADMINISTRATION</p>
        <h1 className="login-title">Optik Mahardika</h1>
      </div>

      <div className="login-card">
        <form onSubmit={handleLogin}>
          {error && <div className="login-error">{error}</div>}

          <div className="form-group">
            <label>ADMINISTRATOR ID</label>
            <div className="input-wrapper">
              <User className="input-icon" size={18} />
              <input
                type="text"
                placeholder="Enter your ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="label-wrapper">
              <label>SECURITY KEY</label>
              <button 
                type="button" 
                className="forgot-link" 
                onClick={() => setShowForgotModal(true)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                Forgot Key?
              </button>
            </div>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                type={showKey ? 'text' : 'password'}
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="keep-verified"
              checked={keepVerified}
              onChange={(e) => setKeepVerified(e.target.checked)}
            />
            <label htmlFor="keep-verified">Keep me verified for 8 hours</label>
          </div>

          <button type="submit" className="btn-login">
            ACCESS DASHBOARD &rarr;
          </button>
        </form>

        <div className="login-footer-badge">
          <Lock size={12} style={{ marginRight: '6px' }} />
          ENCRYPTED SESSION PROTOCOL
        </div>
      </div>

      <div className="login-support">
        Need technical assistance? <strong>Contact Support</strong>
      </div>

      {showForgotModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Forgot Credentials?</h3>
            <p>Please enter the <strong>Superkey</strong> to see your current ID and Key.</p>
            
            {!revealedCreds ? (
              <form onSubmit={handleForgotSubmit}>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Enter Superkey"
                    value={superKeyInput}
                    onChange={(e) => setSuperKeyInput(e.target.value)}
                    required
                    autoFocus
                    className="modal-input"
                  />
                </div>
                <div className="modal-actions">
                  <button type="button" onClick={closeForgotModal} className="btn-cancel">Cancel</button>
                  <button type="submit" className="btn-confirm">Verify</button>
                </div>
              </form>
            ) : (
              <div className="revealed-info">
                <div className="info-item">
                  <label>Administrator ID:</label>
                  <span>{revealedCreds.id}</span>
                </div>
                <div className="info-item">
                  <label>Security Key:</label>
                  <span>{revealedCreds.key}</span>
                </div>
                <button onClick={closeForgotModal} className="btn-confirm" style={{ width: '100%', marginTop: '1rem' }}>Got it</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
