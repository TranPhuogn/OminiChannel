import { useState } from 'react';

const InventoryTab = ({ products }) => {
  const [showTransfer, setShowTransfer] = useState(false);

  const lowStockProducts = products?.filter(p => (p.stockQuantity || 0) < 10) || [];

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '3rem' }}>
        <h2 className="brand-font" style={{ fontSize: '2rem', color: 'var(--admin-gold)' }}>Quản Trị Tồn Kho O2O</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem', letterSpacing: '0.5px' }}>
          Tối ưu hóa chuỗi cung ứng và điều chuyển hàng hóa giữa các showroom LUXURY.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
         <div className="glass-panel shadow-gold">
            <div style={{ fontSize: '0.65rem', color: 'var(--admin-gold)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>Tổng Tồn Kho (SKUs)</div>
            <div className="brand-font" style={{ fontSize: '2.2rem', fontWeight: 'bold' }}>
               {(products?.reduce((s, p) => s + (p.stockQuantity || 0), 0) || 0).toLocaleString()}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.8rem' }}>Hệ thống 12 chi nhánh toàn quốc</div>
         </div>
         <div className="glass-panel shadow-gold">
            <div style={{ fontSize: '0.65rem', color: 'var(--admin-gold)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>Giá Trị Tồn Kho (Vốn)</div>
            <div className="brand-font" style={{ fontSize: '2.2rem', fontWeight: 'bold' }}>
               ~ {((products?.reduce((s, p) => s + (p.stockQuantity || 0) * (p.price || 0), 0) || 0) / 1000000000).toFixed(1)}B
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.8rem' }}>Ước tính theo giá niêm yết (VNĐ)</div>
         </div>
         <div className="glass-panel shadow-gold" style={{ border: '1px solid rgba(231,76,60,0.3)' }}>
            <div style={{ fontSize: '0.65rem', color: '#e74c3c', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>Cảnh Báo Tồn Kho Thấp</div>
            <div className="brand-font" style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#e74c3c' }}>{lowStockProducts.length} SP</div>
            <div style={{ fontSize: '0.75rem', color: '#e74c3c', marginTop: '0.8rem', fontWeight: '700' }}>CẦN NHẬP HÀNG KHẨN CẤP</div>
         </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '2rem' }}>
         <div className="glass-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
               <h3 className="brand-font" style={{ fontSize: '1.3rem' }}>📍 Phân Bổ Showroom & Kho Tổng</h3>
               <button className="luxury-button-gold" style={{ padding: '0.6rem 1.25rem' }} onClick={() => setShowTransfer(true)}>⚡ ĐIỀU CHUYỂN NHANH</button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
               {[
                 { node: 'Kho Tổng (Central WH)', type: 'Warehouse', stock: 8400, capacity: '65%', color: 'var(--admin-gold)' },
                 { node: 'KP Luxury Quận 1', type: 'Showroom', stock: 1200, capacity: '85%', color: '#27ae60' },
                 { node: 'KP Luxury Hoàn Kiếm', type: 'Showroom', stock: 950, capacity: '92%', color: '#e74c3c' },
                 { node: 'KP Luxury Đà Nẵng', type: 'Showroom', stock: 150, capacity: '12%', color: '#3498db' },
               ].map(loc => (
                 <div key={loc.node} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--admin-border)', borderLeft: `4px solid ${loc.color}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                       <span style={{ fontWeight: '700', fontSize: '0.9rem', color: '#fff' }}>{loc.node}</span>
                       <span className="luxury-badge" style={{ color: loc.color }}>{loc.type}</span>
                    </div>
                    <div className="brand-font" style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>{loc.stock.toLocaleString()} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>sp</span></div>
                    <div style={{ height: '2px', background: 'rgba(255,255,255,0.05)', marginTop: '1.2rem', borderRadius: '2px', position: 'relative' }}>
                       <div style={{ width: loc.capacity, height: '100%', background: loc.color, borderRadius: '2px', boxShadow: `0 0 10px ${loc.color}` }}></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', fontSize: '0.7rem' }}>
                       <span style={{ color: 'var(--text-muted)' }}>TẢI TRỌNG: {loc.capacity}</span>
                       <span style={{ color: loc.color, fontWeight: '700' }}>TÌNH TRẠNG: {parseInt(loc.capacity) > 90 ? 'CRITICAL' : 'OPTIMAL'}</span>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="glass-panel">
            <h3 className="brand-font" style={{ marginBottom: '2.5rem', fontSize: '1.3rem' }}>📜 Nhật Ký Kho Vận</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               {[
                 { date: '19/03, 09:12', msg: 'Nhập 500 chai Bleu de Chanel SP', p: '+500', loc: 'Kho Tổng' },
                 { date: '18/03, 14:45', msg: 'Xuất 50 chai Dior Sauvage', p: '-50', loc: 'Showroom Q1' },
                 { date: '17/03, 11:30', msg: 'Nhập nội bộ (Transfer)', p: '+20', loc: 'Showroom HN' },
               ].map((log, i) => (
                  <div key={i} style={{ paddingBottom: '1.2rem', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{log.date}</span>
                        <strong style={{ color: log.p.startsWith('+') ? '#27ae60' : '#e74c3c', fontSize: '0.85rem' }}>{log.p}</strong>
                     </div>
                     <div style={{ color: '#fff', fontSize: '0.85rem' }}>{log.msg}</div>
                     <div style={{ fontSize: '0.7rem', color: 'var(--admin-gold)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Vị trí: {log.loc}</div>
                  </div>
               ))}
               <button className="luxury-input-field" style={{ width: '100%', marginTop: '1rem', borderStyle: 'dashed' }}>XEM TOÀN BỘ LỊCH SỬ</button>
            </div>
         </div>
      </div>

      {showTransfer && (
         <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="glass-panel shadow-gold fade-in" style={{ width: '500px', background: '#0a0a0a', border: '1px solid var(--admin-gold)', padding: '3.5rem' }}>
               <h3 className="brand-font" style={{ marginBottom: '2.5rem', fontSize: '1.8rem', color: 'var(--admin-gold)' }}>Điều Chuyển Nội Bộ</h3>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                  <div className="input-group">
                     <label style={{ fontSize: '0.65rem', color: 'var(--admin-gold)', letterSpacing: '2px' }}>SẢN PHẨM</label>
                     <select className="luxury-input-field" style={{ width: '100%' }}>
                        <option>Dior Sauvage - 100ml</option>
                        <option>Bleu de Chanel - 100ml</option>
                     </select>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                     <div className="input-group">
                        <label style={{ fontSize: '0.65rem', color: 'var(--admin-gold)', letterSpacing: '2px' }}>TỪ (SOURCE)</label>
                        <select className="luxury-input-field" style={{ width: '100%' }}><option>Kho Tổng</option></select>
                     </div>
                     <div className="input-group">
                        <label style={{ fontSize: '0.65rem', color: 'var(--admin-gold)', letterSpacing: '2px' }}>ĐẾN (TARGET)</label>
                        <select className="luxury-input-field" style={{ width: '100%' }}><option>KP Luxury Q1</option></select>
                     </div>
                  </div>
                  <div className="input-group">
                     <label style={{ fontSize: '0.65rem', color: 'var(--admin-gold)', letterSpacing: '2px' }}>SỐ LƯỢNG (SLOT)</label>
                     <input type="number" className="luxury-input-field" defaultValue="20" style={{ width: '100%' }} />
                  </div>
                  <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button className="luxury-button-gold" onClick={() => setShowTransfer(false)}>XÁC NHẬN LỆNH ĐIỀU CHUYỂN</button>
                    <button className="luxury-input-field" style={{ border: 'none' }} onClick={() => setShowTransfer(false)}>HỦY BỎ</button>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default InventoryTab;
