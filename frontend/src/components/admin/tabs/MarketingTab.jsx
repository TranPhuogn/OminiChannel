import React, { useState } from 'react';

const MarketingTab = () => {
  const [coupons, setCoupons] = useState([
    { code: 'GOLDEN_SUMMER', discount: '20%', type: 'Percentage', expiry: '2024-06-30', usage: '45/100', status: 'Active' },
    { code: 'WELCOME_NEW', discount: '500k', type: 'Fixed Amount', expiry: '2024-12-31', usage: '124/∞', status: 'Active' },
  ]);

  return (
    <div className="fade-in">
      <div className="admin-row">
         <div className="admin-panel glass shadow-lg" style={{ flex: 1.2 }}>
            <h3 className="brand-font" style={{ fontSize: '1.6rem' }}>🏷️ Chiến Dịch Khuyến Mãi</h3>
            <div style={{ marginTop: '1.5rem', display: 'grid', gap: '1.5rem' }}>
               <div style={{ padding: '1.5rem', background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--luxury-gold)', marginBottom: '1rem' }}>Tạo mã Coupon mới</h4>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                     <input className="admin-input-sm" placeholder="Mã (VD: AUTUMN24)" />
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <input className="admin-input-sm" placeholder="Giá trị (%, VNĐ)" />
                        <select className="admin-input-sm">
                           <option>Phần trăm (%)</option>
                           <option>Số tiền cố định</option>
                        </select>
                     </div>
                     <input type="date" className="admin-input-sm" placeholder="Ngày hết hạn" />
                     <button className="btn-gold" style={{ padding: '0.8rem' }}>KÍCH HOẠT MÃ</button>
                  </div>
               </div>

               <div style={{ padding: '1rem', background: 'rgba(212,175,55,0.03)', borderRadius: '8px', border: '1px dashed var(--luxury-gold)' }}>
                  <p style={{ fontSize: '0.75rem', color: '#888' }}>💡 <strong>Mẹo:</strong> Khách hàng hạng <strong>Gold</strong> sẽ được tự động áp dụng mã VIP10 (Giảm 10%) tại bước checkout.</p>
               </div>
            </div>
         </div>

         <div className="admin-panel glass shadow-lg" style={{ flex: 2 }}>
            <h3 className="brand-font">📜 Danh Sách Mã Đang Hiệu Lực</h3>
            <table className="admin-table admin-table-modern">
               <thead>
                  <tr>
                     <th>Mã / Loại</th>
                     <th>Giá Trị</th>
                     <th>Hết Hạn</th>
                     <th>Lượt Dùng</th>
                     <th>Trạng Thái</th>
                     <th>Thao Tác</th>
                  </tr>
               </thead>
               <tbody>
                  {coupons.map(c => (
                     <tr key={c.code}>
                        <td>
                           <div style={{ fontWeight: 'bold', letterSpacing: '1px' }}>{c.code}</div>
                           <div style={{ fontSize: '0.65rem', color: '#444' }}>{c.type}</div>
                        </td>
                        <td style={{ color: 'var(--luxury-gold)' }}>{c.discount}</td>
                        <td style={{ fontSize: '0.8rem' }}>{c.expiry}</td>
                        <td style={{ fontSize: '0.8rem' }}>{c.usage}</td>
                        <td><span style={{ color: '#27ae60', fontSize: '0.75rem' }}>● {c.status}</span></td>
                        <td><button style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontSize: '0.75rem' }}>Vô hiệu</button></td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      <div className="admin-row" style={{ marginTop: '2.5rem' }}>
         <div className="admin-panel glass" style={{ flex: 1 }}>
            <h3 className="brand-font">⚡ Fragrance Finder Quiz</h3>
            <p style={{ fontSize: '0.8rem', color: '#666', margin: '0.5rem 0 1rem' }}>Cấu hình các bộ câu hỏi gợi ý mùi thương thông minh.</p>
            <div style={{ padding: '1rem', background: '#111', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <span style={{ fontSize: '0.85rem' }}>Bộ câu hỏi: <strong>Spring Collection 2024</strong></span>
               <button className="btn-action-view">Chỉnh sửa</button>
            </div>
         </div>
         <div className="admin-panel glass" style={{ flex: 1 }}>
            <h3 className="brand-font">⭐ Quản Lý Đánh Giá</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
               <div style={{ fontSize: '0.85rem' }}>Có <strong>12</strong> đánh giá mới chưa duyệt.</div>
               <button className="btn-gold" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>Đi tới Duyệt</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default MarketingTab;
