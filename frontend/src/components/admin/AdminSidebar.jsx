import React from 'react';

const AdminSidebar = ({ activeTab, setActiveTab, setPage }) => {
  const menuItems = [
    { id: 'overview', label: 'Tổng Quan', icon: '📊' },
    { id: 'products', label: 'Sản Phẩm', icon: '💎' },
    { id: 'orders', label: 'Đơn Hàng', icon: '📜' },
    { id: 'crm', label: 'Khách Hàng', icon: '👤' },
    { id: 'inventory', label: 'Kho Hàng', icon: '📦' },
    { id: 'marketing', label: 'Khuyến Mãi', icon: '🏷️' },
    { id: 'cms', label: 'Cấu Hình CMS', icon: '📝' },
    { id: 'rbac', label: 'Phân Quyền', icon: '🛡️' },
    { id: 'settings', label: 'Cài Đặt', icon: '⚙️' },
  ];

  return (
    <aside className="admin-sidebar shadow-gold">
      <div className="admin-logo brand-font">KP ADMIN</div>
      <nav className="admin-nav">
        {menuItems.map(item => (
          <button 
            key={item.id} 
            className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`} 
            onClick={() => setActiveTab(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
