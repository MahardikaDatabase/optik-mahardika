import React, { useState, useContext } from 'react';
import { NavLink, Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Glasses, Megaphone, Tags, Settings, Bell, Search, Eye, LogOut, Target } from 'lucide-react';
import { AppDataContext } from '../../context/AppDataContext';
import './Dashboard.css'; // Shared CSS for dashboard

const DashboardLayout = () => {
  const { logout } = useContext(AppDataContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo"><Eye size={20} color="#fff" /></div>
          <div className="brand-text">
            <h2>Visionary Curator</h2>
            <span>OPTICAL ADMIN</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/admin" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={20} />
            <span>DASHBOARD</span>
          </NavLink>

          <NavLink to="/admin/products" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Glasses size={20} />
            <span>PRODUCTS</span>
          </NavLink>

          <NavLink to="/admin/promo" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Megaphone size={20} />
            <span>PROMOTIONS</span>
          </NavLink>

          <NavLink to="/admin/lucky-wheel" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Target size={20} />
            <span>LUCKY WHEEL</span>
          </NavLink>

          <NavLink to="/admin/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Settings size={20} />
            <span>SETTINGS</span>
          </NavLink>
        </nav>

        {location.pathname !== '/admin/products' && (
          <div className="sidebar-footer">
            <button className="btn-add-product" onClick={() => navigate('/admin/products')}>
              Add New Product
            </button>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Top Header */}
        <header className="top-header">
          <div className="header-title">LENS & VISION</div>

          <div className="search-bar">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Search inventory, sales, or brands..." />
          </div>

          <div className="user-profile">
            <div className="user-info">
              <strong>Admin User</strong>
              <span>Optik Mahardika</span>
            </div>

            <div className="avatar-wrapper" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <div className="avatar">A</div>
              {isDropdownOpen && (
                <div className="logout-dropdown">
                  <button onClick={logout} className="btn-logout">
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Nested Content */}
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
