import React from 'react';
import { vnd } from '../../../utils/format';

const OverviewTab = ({ products, orders, cartTotal }) => {
  const totalOrders = Array.isArray(orders) ? orders.length : 0;

  const computedRevenue =
    Array.isArray(orders) && orders.length > 0
      ? orders.reduce((sum, o) => {
          const amount =
            o.totalAmount ??
            o.TotalAmount ??
            (Array.isArray(o.items || o.Items)
              ? (o.items || o.Items).reduce(
                  (s, it) =>
                    s + (it.price || it.Price || 0) * (it.quantity || it.Quantity || 1),
                  0
                )
              : 0);
          return sum + (amount || 0);
        }, 0)
      : 0;

  const stats = [
    { label: 'Tổng Doanh Thu', val: vnd(computedRevenue || cartTotal || 0), icon: '💰', trend: totalOrders ? `+${totalOrders} đơn` : '—' },
    { label: 'Số Đơn Hàng', val: totalOrders.toString(), icon: '📦', trend: totalOrders ? 'Hoạt động' : 'Chưa có dữ liệu' },
    { label: 'Số Sản Phẩm', val: (products?.length || 0).toString(), icon: '💎', trend: products?.length ? 'Đang bán' : 'Chưa có sản phẩm' },
    { label: 'Dịch Vụ Cá Nhân', val: 'Khắc tên / Gói quà', icon: '🚀', trend: 'Đồng bộ với trang khách' },
  ];

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <h2 className="brand-font" style={{ fontWeight: '300', opacity: '0.9', margin: 0 }}>📊 Toàn cảnh hệ thống</h2>
        <div className="admin-user-info" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.8rem' }}>
           📅 {new Date().toLocaleDateString('vi-VN')} | 🔔 3 Thông báo mới
        </div>
      </div>

      <div className="stats-grid">
        {stats.map(s => (
          <div key={s.label} className="stat-card shadow-gold">
            <div className="stat-header">
              <span className="stat-icon">{s.icon}</span>
              <span className="stat-trend">{s.trend}</span>
            </div>
            <div className="stat-val">{s.val}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="admin-row" style={{ marginTop: '3rem' }}>
        <div className="admin-panel glass shadow-lg" style={{ flex: 1.5 }}>
          <h3 className="brand-font" style={{ marginBottom: '1.5rem', color: 'var(--luxury-gold)' }}>📈 Biểu đồ Doanh Thu (7 ngày qua)</h3>
          <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', gap: '15px', padding: '10px 0', borderBottom: '1px solid #222' }}>
             {[65, 40, 85, 55, 95, 70, 80].map((h, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                   <div style={{ width: '100%', height: `${h}%`, background: i === 4 ? 'var(--luxury-gold-bright)' : 'rgba(255,255,255,0.05)', borderRadius: '4px 4px 0 0', position: 'relative', transition: '0.5s' }}>
                      <div className="chart-tooltip" style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', background: '#fff', color: '#000', fontSize: '0.65rem', padding: '2px 5px', borderRadius: '3px', fontWeight: 'bold' }}>{h*1.2}M</div>
                   </div>
                   <span style={{ fontSize: '0.65rem', color: '#555' }}>T{i+2}</span>
                </div>
             ))}
          </div>
          <p style={{ fontSize: '0.75rem', color: '#444', marginTop: '1rem', textAlign: 'center italic' }}>* Đơn vị: Triệu VNĐ. Cao điểm ghi nhận vào Thứ 6 vừa qua.</p>
        </div>

        <div className="admin-panel glass shadow-lg" style={{ flex: 1 }}>
          <h3 className="brand-font" style={{ marginBottom: '1.5rem' }}>🏆 Top Sản Phẩm Bán Chạy</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
             {products?.slice(0, 4).map((p, i) => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                   <div style={{ width: '24px', height: '24px', background: i === 0 ? 'var(--luxury-gold)' : '#222', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.7rem', fontWeight: 'bold' }}>{i+1}</div>
                   <img src={p.imageUrl} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                   <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.85rem' }}>{p.name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--luxury-gold)' }}>{12 - i*2} đơn đã bán</div>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </div>

      <div className="admin-row" style={{ marginTop: '2.5rem' }}>
        <div className="admin-panel glass shadow-lg" style={{ flex: 2 }}>
          <h3 className="brand-font">🔔 Đơn Hàng Mới Nhất</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mã Đơn</th>
                <th>Khách Hàng</th>
                <th>Trạng Thái</th>
                <th>Tổng</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(orders) && orders.length > 0 ? (
                orders.slice(0, 5).map((o) => {
                  const id = o.id ?? o.Id;
                  const customer = o.customerName ?? o.CustomerName ?? o.userName ?? o.UserName ?? 'Khách hàng';
                  const status = o.status ?? o.Status ?? 'Chờ xử lý';
                  const amount = o.totalAmount ?? o.TotalAmount ?? (Array.isArray(o.items || o.Items) ? (o.items || o.Items).reduce((s, it) => s + (it.price || it.Price || 0) * (it.quantity || it.Quantity || 1), 0) : 0);
                  return (
                    <tr key={id}>
                      <td>#{id}</td>
                      <td>{customer}</td>
                      <td>
                        <span className={status.includes('Chờ') || status.toLowerCase().includes('pending') ? 'status-pending' : 'status-processing'}>
                          {status}
                        </span>
                      </td>
                      <td>{vnd(amount)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr><td colSpan={4} style={{ color: '#666', fontSize: '0.9rem' }}>Chưa có đơn hàng nào từ phía khách.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="admin-panel glass shadow-lg" style={{ flex: 1 }}>
          <h3 className="brand-font">⚠️ Cảnh Báo Hệ Thống</h3>
          <div style={{ display: 'grid', gap: '0.8rem', marginTop: '1rem' }}>
             <div style={{ padding: '0.8rem', background: 'rgba(231, 76, 60, 0.05)', borderLeft: '3px solid #e74c3c', fontSize: '0.8rem' }}>
                <strong>Tồn kho thấp:</strong> Bleu de Chanel (Chi nhánh Q1) còn 2 chai.
             </div>
             <div style={{ padding: '0.8rem', background: 'rgba(243, 156, 18, 0.05)', borderLeft: '3px solid #f39c12', fontSize: '0.8rem' }}>
                <strong>Voucher hết hạn:</strong> Mã "GOLDEN_SUMMER" sẽ hết hạn trong 2h tới.
             </div>
             <div style={{ padding: '0.8rem', background: 'rgba(52, 152, 219, 0.05)', borderLeft: '3px solid #3498db', fontSize: '0.8rem' }}>
                <strong>Đơn hàng:</strong> Có 5 đơn hàng Shopee chưa được đồng bộ.
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
