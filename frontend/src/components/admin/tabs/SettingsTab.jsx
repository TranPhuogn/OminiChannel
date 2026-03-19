import React from 'react';

const SettingsTab = () => {
  return (
    <div className="fade-in">
      <div className="admin-row">
         <div className="admin-panel glass shadow-lg" style={{ flex: 1.5 }}>
            <h3 className="brand-font" style={{ fontSize: '1.6rem', marginBottom: '2rem' }}>⚙️ Cấu Hình Cửa Hàng</h3>
            <form style={{ display: 'grid', gap: '1.5rem' }}>
               <div style={{ display: 'grid', gap: '5px' }}>
                  <label style={{ fontSize: '0.75rem', color: '#555' }}>Tên hiển thị Store</label>
                  <input className="admin-input-sm" defaultValue="KP LUXURY OMNICHANNEL" />
               </div>
               <div style={{ display: 'grid', gap: '5px' }}>
                  <label style={{ fontSize: '0.75rem', color: '#555' }}>Email hệ thống</label>
                  <input className="admin-input-sm" defaultValue="contact@kpluxury.vn" />
               </div>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ display: 'grid', gap: '5px' }}>
                     <label style={{ fontSize: '0.75rem', color: '#555' }}>Tiền tệ mặc định</label>
                     <select className="admin-input-sm"><option>VNĐ (₫)</option><option>USD ($)</option></select>
                  </div>
                  <div style={{ display: 'grid', gap: '5px' }}>
                     <label style={{ fontSize: '0.75rem', color: '#555' }}>Múi giờ</label>
                     <select className="admin-input-sm"><option>(GMT+07:00) Hà Nội</option></select>
                  </div>
               </div>
               <hr style={{ border: '0.5px solid #111' }} />
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                     <div style={{ fontWeight: 'bold' }}>Chế độ Bảo trì (Maintenance Mode)</div>
                     <div style={{ fontSize: '0.75rem', color: '#444' }}>Tạm dừng truy cập từ phía khách hàng.</div>
                  </div>
                  <input type="checkbox" />
               </div>
               <button className="btn-gold" style={{ padding: '1rem', marginTop: '1rem' }}>LƯU CÀI ĐẶT</button>
            </form>
         </div>

         <div className="admin-panel glass shadow-lg" style={{ flex: 1 }}>
            <h3 className="brand-font" style={{ marginBottom: '1.5rem' }}>💳 Phương Thức Thanh Toán</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
               <div style={{ padding: '1rem', background: '#0a0a0a', border: '1px solid #222', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                     <span style={{ fontSize: '1.2rem' }}>🏦</span>
                     <div>
                        <div style={{ fontSize: '0.85rem' }}>Chuyển khoản (Direct)</div>
                        <div style={{ fontSize: '0.7rem', color: '#444' }}>Tự động kiểm tra sao kê</div>
                     </div>
                  </div>
                  <span style={{ color: '#27ae60', fontSize: '0.75rem' }}>Đang bật</span>
               </div>
               <div style={{ padding: '1rem', background: '#0a0a0a', border: '1px solid #222', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                     <span style={{ fontSize: '1.2rem' }}>💳</span>
                     <div>
                        <div style={{ fontSize: '0.85rem' }}>Stripe / Visa</div>
                        <div style={{ fontSize: '0.7rem', color: '#444' }}>Thanh toán quốc tế</div>
                     </div>
                  </div>
                  <span style={{ color: '#444', fontSize: '0.75rem' }}>Chưa cấu hình</span>
               </div>
            </div>

            <h3 className="brand-font" style={{ margin: '2rem 0 1.5rem' }}>🚚 Đơn Vị Vận Chuyển</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
               <div style={{ padding: '1rem', background: '#0a0a0a', border: '1px solid #222', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="checkbox" checked readOnly />
                  <span style={{ fontSize: '0.85rem' }}>Giao Hàng Tiết Kiệm (GHTK)</span>
               </div>
               <div style={{ padding: '1rem', background: '#0a0a0a', border: '1px solid #222', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="checkbox" />
                  <span style={{ fontSize: '0.85rem' }}>AhaMove (Hỏa tốc nội thành)</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SettingsTab;
