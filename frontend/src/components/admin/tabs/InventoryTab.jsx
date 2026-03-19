import React, { useState } from 'react';

const InventoryTab = ({ products }) => {
  const [showTransfer, setShowTransfer] = useState(false);

  const lowStockProducts = products?.filter(p => (p.stockQuantity || 0) < 10) || [];

  return (
    <div className="fade-in">
      <div className="stats-grid" style={{ marginBottom: '2.5rem' }}>
         <div className="stat-card shadow-gold">
            <div className="stat-label">Tổng Tồn Kho (SKUs)</div>
            <div className="stat-val">{(products?.reduce((s, p) => s + (p.stockQuantity || 0), 0) || 0).toLocaleString()}</div>
            <div style={{ fontSize: '0.7rem', color: '#666' }}>Trên 12 chi nhánh toàn quốc</div>
         </div>
         <div className="stat-card shadow-gold">
            <div className="stat-label">Giá Trị Tồn Kho</div>
            <div className="stat-val">~ {((products?.reduce((s, p) => s + (p.stockQuantity || 0) * (p.price || 0), 0) || 0) / 1000000000).toFixed(1)}B</div>
            <div style={{ fontSize: '0.7rem', color: '#666' }}>Vốn lưu động (VNĐ)</div>
         </div>
         <div className="stat-card" style={{ border: '1px solid #e74c3c', background: 'rgba(231,76,60,0.05)' }}>
            <div className="stat-label" style={{ color: '#e74c3c' }}>Cảnh Báo Tồn Kho Thấp</div>
            <div className="stat-val" style={{ color: '#e74c3c' }}>{lowStockProducts.length} SP</div>
            <div style={{ fontSize: '0.7rem', color: '#e74c3c' }}>Cần nhập hàng ngay</div>
         </div>
      </div>

      <div className="admin-row">
         <div className="admin-panel glass shadow-lg" style={{ flex: 1.5 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
               <h3 className="brand-font">📍 Phân Bổ Tồn Kho O2O</h3>
               <button className="btn-gold" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }} onClick={() => setShowTransfer(true)}>⚡ Điều Chuyển Nhanh</button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
               {[
                { node: 'Kho Tổng (Central WH)', type: 'Warehouse', stock: 8400, capacity: '65%', color: 'var(--luxury-gold)' },
                { node: 'KP Luxury Quận 1', type: 'Showroom', stock: 1200, capacity: '85%', color: '#27ae60' },
                { node: 'KP Luxury Hoàn Kiếm', type: 'Showroom', stock: 950, capacity: '92%', color: '#27ae60' },
                { node: 'KP Luxury Đà Nẵng', type: 'Showroom', stock: 150, capacity: '12%', color: '#e74c3c' },
               ].map(loc => (
                 <div key={loc.node} style={{ padding: '1.2rem', background: '#111', borderRadius: '8px', borderLeft: `4px solid ${loc.color}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                       <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{loc.node}</span>
                       <span style={{ fontSize: '0.65rem', color: '#666' }}>{loc.type}</span>
                    </div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{loc.stock.toLocaleString()} <span style={{ fontSize: '0.8rem', color: '#444' }}>sp</span></div>
                    <div style={{ height: '4px', background: '#222', marginTop: '1rem', borderRadius: '2px' }}>
                       <div style={{ width: loc.capacity, height: '100%', background: loc.color, borderRadius: '2px' }}></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.7rem' }}>
                       <span style={{ color: '#666' }}>Sức chứa: {loc.capacity}</span>
                       <span style={{ color: loc.color }}>Phân hạng: {parseInt(loc.capacity) > 80 ? 'High load' : 'Normal'}</span>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="admin-panel glass shadow-lg" style={{ flex: 1 }}>
            <h3 className="brand-font" style={{ marginBottom: '1.5rem' }}>📜 Nhật Ký Nhập Kho</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
               {[
                { date: '19/03, 09:12', msg: 'Nhập 500 chai Bleu de Chanel SP', p: '+500', loc: 'Kho Tổng' },
                { date: '18/03, 14:45', msg: 'Xuất 50 chai Dior Sauvage', p: '-50', loc: 'Showroom Q1' },
                { date: '17/03, 11:30', msg: 'Nhập nội bộ (Transfer)', p: '+20', loc: 'Showroom HN' },
               ].map((log, i) => (
                  <div key={i} style={{ padding: '0.8rem', borderBottom: '1px solid #111', fontSize: '0.8rem' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ color: '#555' }}>{log.date}</span>
                        <strong style={{ color: log.p.startsWith('+') ? '#27ae60' : '#e74c3c' }}>{log.p}</strong>
                     </div>
                     <div style={{ color: '#ccc' }}>{log.msg}</div>
                     <div style={{ fontSize: '0.7rem', color: '#444', marginTop: '3px' }}>Vị trí: {log.loc}</div>
                  </div>
               ))}
               <button className="admin-input-sm" style={{ width: '100%', marginTop: '0.5rem' }}>Xem toàn bộ lịch sử</button>
            </div>
         </div>
      </div>

      {showTransfer && (
         <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="admin-panel shadow-gold fade-in" style={{ width: '500px', background: '#0a0a0a', border: '1px solid var(--luxury-gold)', padding: '2.5rem' }}>
               <h3 className="brand-font" style={{ marginBottom: '2rem' }}>Lệnh Điều Chuyển Nội Bộ</h3>
               <div style={{ display: 'grid', gap: '1.5rem' }}>
                  <div style={{ display: 'grid', gap: '8px' }}>
                     <label style={{ fontSize: '0.75rem', color: '#555' }}>Sản phẩm cần chuyển</label>
                     <select className="admin-input-sm">
                        <option>Dior Sauvage - 100ml</option>
                        <option>Bleu de Chanel - 100ml</option>
                     </select>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                     <div style={{ display: 'grid', gap: '8px' }}>
                        <label style={{ fontSize: '0.75rem', color: '#555' }}>Từ (Source)</label>
                        <select className="admin-input-sm"><option>Kho Tổng</option></select>
                     </div>
                     <div style={{ display: 'grid', gap: '8px' }}>
                        <label style={{ fontSize: '0.75rem', color: '#555' }}>Đến (Target)</label>
                        <select className="admin-input-sm"><option>KP Luxury Q1</option></select>
                     </div>
                  </div>
                  <div style={{ display: 'grid', gap: '8px' }}>
                     <label style={{ fontSize: '0.75rem', color: '#555' }}>Số lượng</label>
                     <input type="number" className="admin-input-sm" defaultValue="20" />
                  </div>
                  <button className="btn-gold" style={{ marginTop: '1rem', padding: '1rem' }} onClick={() => setShowTransfer(false)}>XÁC NHẬN ĐIỀU CHUYỂN</button>
                  <button className="admin-input-sm" onClick={() => setShowTransfer(false)}>HỦY BỎ</button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default InventoryTab;
