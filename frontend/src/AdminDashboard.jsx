import React, { useState } from 'react';
import AdminSidebar from './components/admin/AdminSidebar';
import OverviewTab from './components/admin/tabs/OverviewTab';
import OrdersTab from './components/admin/tabs/OrdersTab';
import ProductsTab from './components/admin/tabs/ProductsTab';
import InventoryTab from './components/admin/tabs/InventoryTab';
import CrmTab from './components/admin/tabs/CrmTab';
import MarketingTab from './components/admin/tabs/MarketingTab';
import CmsTab from './components/admin/tabs/CmsTab';
import RbacTab from './components/admin/tabs/RbacTab';
import SettingsTab from './components/admin/tabs/SettingsTab';

const AdminDashboard = ({ products, cartTotal, orders, setPage }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="admin-screen fade-in">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} setPage={setPage} />

      <div className="admin-body">
        <header className="admin-topbar">
          <div className="admin-breadcrumb">
            <span className="root">ADMIN</span>
            <span className="sep">/</span>
            <span className="current">{activeTab.toUpperCase()}</span>
          </div>
          <div className="admin-status">
            <div className="status-indicator">● HỆ THỐNG TRỰC TUYẾN</div>
            <div className="admin-user">
              <span>Super Admin</span>
              <div className="avatar luxury-glow">A</div>
            </div>
          </div>
        </header>

        <main className="admin-canvas">
          {activeTab === 'overview' && <OverviewTab products={products} orders={orders} cartTotal={cartTotal} />}
          {activeTab === 'products' && <ProductsTab products={products} />}
          {activeTab === 'orders' && <OrdersTab orders={orders} />}
          {activeTab === 'inventory' && <InventoryTab products={products} />}
          {activeTab === 'crm' && <CrmTab orders={orders} />}
          {activeTab === 'marketing' && <MarketingTab />}
          {activeTab === 'cms' && <CmsTab />}
          {activeTab === 'rbac' && <RbacTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </main>
      </div>

      <style>{`
        :root {
          --admin-sidebar-width: 280px;
          --admin-gold: #C5A059;
          --admin-bg-dark: #050505;
          --admin-panel-bg: #0D0D0D;
          --admin-border: rgba(197, 160, 89, 0.15);
        }

        .admin-screen {
          display: grid;
          grid-template-columns: var(--admin-sidebar-width) 1fr;
          min-height: 100vh;
          background: var(--admin-bg-dark);
          color: #fff;
          font-family: 'Inter', sans-serif;
        }

        /* Enforce AdminSidebar Styles from Dashboard */
        .admin-sidebar {
          grid-column: 1;
          height: 100vh;
          background: #000;
          border-right: 1px solid var(--admin-border);
          padding: 2.5rem 1.5rem;
          display: flex !important;
          flex-direction: column !important;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .admin-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          color: var(--admin-gold);
          letter-spacing: 5px;
          text-align: center;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--admin-border);
          margin-bottom: 2rem;
        }

        .admin-nav {
          display: flex !important;
          flex-direction: column !important;
          gap: 0.75rem !important;
          flex: 1;
        }

        .admin-nav-item {
          width: 100% !important;
          display: flex !important;
          align-items: center !important;
          padding: 1rem !important;
          background: transparent !important;
          border: 1px solid transparent !important;
          color: #888 !important;
          cursor: pointer;
          border-radius: 4px;
          transition: 0.3s;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 1px;
        }

        .admin-nav-item:hover {
          background: rgba(197, 160, 89, 0.05) !important;
          color: #fff !important;
        }

        .admin-nav-item.active {
          background: rgba(197, 160, 89, 0.1) !important;
          border-color: var(--admin-gold) !important;
          color: var(--admin-gold) !important;
          font-weight: 600;
        }

        .nav-icon { margin-right: 1rem; font-size: 1.2rem; }

        .admin-body {
          grid-column: 2;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .admin-topbar {
          height: 80px;
          background: rgba(13, 13, 13, 0.95);
          backdrop-filter: blur(10px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 3rem;
          border-bottom: 1px solid var(--admin-border);
          position: sticky;
          top: 0;
          z-index: 900;
        }

        .admin-breadcrumb {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.8rem;
          letter-spacing: 2px;
          color: #555;
        }

        .admin-breadcrumb .current { color: var(--admin-gold); }

        .admin-status {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .status-indicator {
          font-size: 0.65rem;
          color: #27ae60;
          letter-spacing: 1px;
        }

        .admin-user {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.85rem;
          color: #888;
        }

        .admin-user .avatar {
          width: 36px;
          height: 36px;
          background: var(--admin-gold);
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-weight: bold;
        }

        .admin-canvas {
          padding: 3.5rem;
          max-width: 100%;
          overflow-x: hidden;
        }

        /* Tab Content Styling */
        .stat-card {
          background: #111;
          border: 1px solid var(--admin-border);
          padding: 2rem;
          border-radius: 8px;
        }

        @media (max-width: 1200px) {
          :root { --admin-sidebar-width: 80px; }
          .admin-sidebar .admin-logo, .admin-nav-item span:not(.nav-icon), .admin-user span { display: none; }
          .admin-nav-item { justify-content: center; padding: 1.5rem 0 !important; }
          .nav-icon { margin-right: 0 !important; font-size: 1.5rem; }
        }

        @media (max-width: 768px) {
          .admin-screen { grid-template-columns: 1fr; }
          .admin-sidebar { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
