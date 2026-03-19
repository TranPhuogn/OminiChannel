import React from 'react';

const RbacTab = () => {
  return (
    <div className="fade-in">
      <div className="admin-panel glass shadow-lg">
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 className="brand-font" style={{ fontSize: '1.6rem' }}>🛡️ Vai Trò & Phân Quyền</h3>
            <button className="btn-gold" style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem' }}>+ Thêm Nhân Viên</button>
         </div>

         <table className="admin-table admin-table-modern">
            <thead>
               <tr>
                  <th>Nhân Viên</th>
                  <th>Vai Trò (Role)</th>
                  <th>Phạm Vi Quyền (Scopes)</th>
                  <th>Trạng Thái</th>
                  <th>Thao Tác</th>
               </tr>
            </thead>
            <tbody>
               {[
                  { name: 'Hoàng Kim', role: 'Super Admin', scopes: 'Full Access', status: 'Online' },
                  { name: 'Nguyễn Văn B', role: 'Store Manager', scopes: 'Inventory, Orders', status: 'Active' },
                  { name: 'Trần Thị C', role: 'Content Staff', scopes: 'CMS, Marketing', status: 'Active' },
                  { name: 'Lê Văn D', role: 'Sales support', scopes: 'Orders (View Only)', status: 'Offline' }
               ].map((user, i) => (
                  <tr key={i}>
                     <td><strong>{user.name}</strong></td>
                     <td>
                        <span style={{ 
                           background: user.role === 'Super Admin' ? 'rgba(212,175,55,0.1)' : 'rgba(255,255,255,0.05)',
                           color: user.role === 'Super Admin' ? 'var(--luxury-gold)' : '#888',
                           padding: '3px 10px', borderRadius: '4px', fontSize: '0.75rem'
                        }}>{user.role}</span>
                     </td>
                     <td style={{ fontSize: '0.8rem', color: '#666' }}>{user.scopes}</td>
                     <td><span style={{ color: user.status === 'Online' ? '#27ae60' : '#444', fontSize: '0.75rem' }}>● {user.status}</span></td>
                     <td><button className="btn-action-view">Sửa Quyền</button></td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>

      <div className="admin-panel glass shadow-lg" style={{ marginTop: '2.5rem' }}>
         <h4 className="brand-font" style={{ marginBottom: '1.5rem', color: 'var(--luxury-gold)' }}>🔑 Cấu Hình Nhóm Quyền</h4>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {['Quản lý Sản phẩm', 'Quản lý Đơn hàng', 'Quản lý Kho', 'Quản lý CMS', 'Báo cáo Doanh thu'].map(perm => (
               <div key={perm} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', background: '#0a0a0a', borderRadius: '8px' }}>
                  <input type="checkbox" checked readOnly />
                  <span style={{ fontSize: '0.85rem' }}>{perm}</span>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default RbacTab;
