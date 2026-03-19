import React, { useState } from 'react';

const CrmTab = ({ orders }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const vipTiers = {
    'Gold': { color: '#D4AF37', label: '👑 VIP Gold' },
    'Silver': { color: '#C0C0C0', label: '🥈 Silver' },
    'Bronze': { color: '#CD7F32', label: '🥉 Bronze' },
    'New': { color: '#888', label: '🌱 New' }
  };

  const customers = [
    { id: 1, name: 'Lê Văn A', email: 'vana@gmail.com', phone: '0901234567', tier: 'Gold', totalSpent: 12500000, lastOrder: '2024-03-15' },
    { id: 2, name: 'Trần Thị B', email: 'thib@gmail.com', phone: '0912223334', tier: 'Silver', totalSpent: 5200000, lastOrder: '2024-03-10' },
    { id: 3, name: 'Nguyễn Văn C', email: 'vanc@gmail.com', phone: '0988777666', tier: 'New', totalSpent: 850000, lastOrder: '2024-03-18' },
    { id: 4, name: 'Hoàng Kim', email: 'kim@omni.com', phone: '0966555444', tier: 'Gold', totalSpent: 45000000, lastOrder: '2024-03-19' },
  ];

  return (
    <div className="fade-in">
      <div className="admin-row">
         <div className="admin-panel glass shadow-lg" style={{ flex: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
               <h3 className="brand-font" style={{ fontSize: '1.6rem' }}>👤 Quản Lý Khách Hàng Luxury</h3>
               <button className="btn-gold" style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem' }}>+ Thêm Khách Hàng</button>
            </div>
            
            <div className="admin-filters" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
               <input type="text" placeholder="Tìm bằng Tên, SĐT, Email..." className="admin-input-sm" style={{ flex: 1 }} />
               <select className="admin-input-sm">
                  <option>Tất cả Hạng</option>
                  <option>VIP Gold</option>
                  <option>Silver</option>
               </select>
            </div>

            <table className="admin-table admin-table-modern">
               <thead>
                  <tr>
                     <th>Khách Hàng</th>
                     <th>Hạng Thành Viên</th>
                     <th>Chi Tiêu (Lũy Kế)</th>
                     <th>Đơn Cuối</th>
                     <th>Thao Tác</th>
                  </tr>
               </thead>
               <tbody>
                  {customers.map(cus => (
                     <tr key={cus.id}>
                        <td>
                           <div style={{ fontWeight: '600' }}>{cus.name}</div>
                           <div style={{ fontSize: '0.7rem', color: '#555' }}>{cus.email} | {cus.phone}</div>
                        </td>
                        <td>
                           <span style={{ 
                              color: vipTiers[cus.tier].color, 
                              border: `1px solid ${vipTiers[cus.tier].color}`,
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontSize: '0.7rem',
                              fontWeight: 'bold',
                              background: `${vipTiers[cus.tier].color}11`
                           }}>
                              {vipTiers[cus.tier].label}
                           </span>
                        </td>
                        <td><strong style={{ color: 'var(--luxury-gold)' }}>{cus.totalSpent.toLocaleString()} đ</strong></td>
                        <td style={{ fontSize: '0.8rem', color: '#888' }}>{cus.lastOrder}</td>
                        <td>
                           <button className="btn-action-view" onClick={() => setSelectedCustomer(cus)}>Lịch sử</button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="admin-panel glass shadow-gold" style={{ flex: 1 }}>
            <h3 className="brand-font" style={{ marginBottom: '1.5rem' }}>🏅 Đặc Quyền VIP Gold</h3>
            <div style={{ padding: '1.5rem', background: 'rgba(212,175,55,0.05)', borderRadius: '8px', border: '1px solid rgba(212,175,55,0.2)' }}>
               <ul style={{ fontSize: '0.85rem', color: '#ccc', paddingLeft: '1.2rem', lineHeight: '1.8' }}>
                  <li>Giảm giá mặc định 10% toàn store.</li>
                  <li>Dịch vụ khắc tên thủ công miễn phí.</li>
                  <li>Ưu tiên thử các mẫu Pre-release.</li>
                  <li>Miễn phí Ship hỏa tốc 2h.</li>
               </ul>
            </div>

            <div style={{ marginTop: '2.5rem' }}>
               <h4 className="brand-font" style={{ fontSize: '1rem', color: 'var(--luxury-gold)' }}>📊 Phân Bổ Khách Hàng</h4>
               <div style={{ marginTop: '1.5rem' }}>
                  {Object.keys(vipTiers).map(tier => (
                     <div key={tier} style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '5px' }}>
                           <span>{vipTiers[tier].label}</span>
                           <span>{tier === 'Gold' ? '12%' : tier === 'Silver' ? '25%' : '63%'}</span>
                        </div>
                        <div style={{ height: '4px', background: '#222', borderRadius: '2px' }}>
                           <div style={{ width: tier === 'Gold' ? '12%' : tier === 'Silver' ? '25%' : '63%', height: '100%', background: vipTiers[tier].color, borderRadius: '2px' }}></div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {selectedCustomer && (
         <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="admin-panel glass shadow-lg fade-in" style={{ width: '600px', background: '#0a0a0a', border: '1px solid var(--luxury-gold)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <h3 className="brand-font">Timeline Mua Hàng: {selectedCustomer.name}</h3>
                  <button onClick={() => setSelectedCustomer(null)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
               </div>
               <div style={{ display: 'grid', gap: '1rem' }}>
                  <div style={{ padding: '1rem', borderLeft: '2px solid var(--luxury-gold)', background: 'rgba(255,255,255,0.02)' }}>
                     <div style={{ fontWeight: 'bold' }}>🛍️ Đơn hàng #KP9821</div>
                     <div style={{ fontSize: '0.8rem', color: '#666' }}>Mua Bleu de Chanel - 3.500.000đ</div>
                     <div style={{ fontSize: '0.7rem', color: 'var(--luxury-gold)', marginTop: '5px' }}>15/03/2024 tại Showroom Q1</div>
                  </div>
                  <div style={{ padding: '1rem', borderLeft: '2px solid #333', background: 'rgba(255,255,255,0.02)' }}>
                     <div style={{ fontWeight: 'bold' }}>🛍️ Đơn hàng #KP7710</div>
                     <div style={{ fontSize: '0.8rem', color: '#666' }}>Mua Dior Sauvage - 2.800.000đ</div>
                     <div style={{ fontSize: '0.7rem', color: '#444', marginTop: '5px' }}>20/12/2023 qua Website</div>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default CrmTab;
