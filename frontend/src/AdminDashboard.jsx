import React, { useState } from 'react';

const AdminDashboard = ({ products, cartTotal, orders, setPage }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Định dạng VND giống trang khách hàng (App)
  const vnd = (price) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price || 0);

  const totalOrders = Array.isArray(orders) ? orders.length : 0;

  // Nếu backend có totalAmount/TotalAmount, tính tổng doanh thu từ đó
  const computedRevenue =
    Array.isArray(orders) && orders.length > 0
      ? orders.reduce((sum, o) => {
          const amount =
            o.totalAmount ??
            o.TotalAmount ??
            (Array.isArray(o.items || o.Items)
              ? (o.items || o.Items).reduce(
                  (s, it) =>
                    s +
                    (it.price || it.Price || 0) *
                      (it.quantity || it.Quantity || 1),
                  0
                )
              : 0);
          return sum + (amount || 0);
        }, 0)
      : 0;

  const stats = [
    {
      label: 'Tổng Doanh Thu',
      val: vnd(computedRevenue || cartTotal || 0),
      icon: '💰',
      trend: totalOrders ? `+${totalOrders} đơn` : '—',
    },
    {
      label: 'Số Đơn Hàng',
      val: totalOrders.toString(),
      icon: '📦',
      trend: totalOrders ? 'Hoạt động' : 'Chưa có dữ liệu',
    },
    {
      label: 'Số Sản Phẩm',
      val: (products?.length || 0).toString(),
      icon: '💎',
      trend: products?.length ? 'Đang bán' : 'Chưa có sản phẩm',
    },
    {
      label: 'Dịch Vụ Cá Nhân',
      val: 'Khắc tên / Gói quà',
      icon: '🚀',
      trend: 'Đồng bộ với trang khách',
    },
  ];

  return (
    <div className="admin-layout fade-in">
      <aside className="admin-sidebar shadow-gold">
        <div className="admin-logo brand-font">KP ADMIN</div>
        <nav className="admin-nav">
          {[
            { id: 'overview', label: 'Tổng Quan', icon: '📊' },
            { id: 'catalog', label: 'Sản Phẩm', icon: '💎' },
            { id: 'orders', label: 'Đơn Hàng', icon: '📜' },
            { id: 'inventory', label: 'Tồn Kho O2O', icon: '📍' },
            { id: 'crm', label: 'Khách Hàng', icon: '🤝' },
            { id: 'marketing', label: 'Marketing/Quiz', icon: '⚡' },
          ].map(item => (
            <button key={item.id} className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}>
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <button className="admin-back-btn" onClick={() => setPage('home')}>← Về Cửa Hàng</button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h2 className="brand-font">Quản Trị Hệ Thống</h2>
          <div className="admin-user-info">
            <span>Quản trị viên: <strong>Admin</strong></span>
            <div className="admin-avatar">A</div>
          </div>
        </header>

        <section className="admin-content">
          {activeTab === 'overview' && (
            <div className="fade-in">
              <div className="stats-grid">
                {stats.map(s => (
                  <div key={s.label} className="stat-card glass shadow-gold">
                    <div className="stat-header">
                      <span className="stat-icon">{s.icon}</span>
                      <span className="stat-trend">{s.trend}</span>
                    </div>
                    <div className="stat-val">{s.val}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="admin-row" style={{ marginTop: '2rem' }}>
                <div className="admin-panel glass shadow-lg" style={{ flex: 2 }}>
                  <h3 className="brand-font">🔔 Đơn Hàng Cần Xử Lý</h3>
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
                          const customer =
                            o.customerName ??
                            o.CustomerName ??
                            o.userName ??
                            o.UserName ??
                            'Khách hàng';
                          const status = o.status ?? o.Status ?? 'Chờ xử lý';
                          const amount =
                            o.totalAmount ??
                            o.TotalAmount ??
                            (Array.isArray(o.items || o.Items)
                              ? (o.items || o.Items).reduce(
                                  (s, it) =>
                                    s +
                                    (it.price || it.Price || 0) *
                                      (it.quantity || it.Quantity || 1),
                                  0
                                )
                              : 0);
                          return (
                            <tr key={id}>
                              <td>#{id}</td>
                              <td>{customer}</td>
                              <td>
                                <span
                                  className={
                                    status.includes('Chờ') ||
                                    status.toLowerCase().includes('pending')
                                      ? 'status-pending'
                                      : 'status-processing'
                                  }
                                >
                                  {status}
                                </span>
                              </td>
                              <td>{vnd(amount)}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={4} style={{ color: '#666', fontSize: '0.9rem' }}>
                            Chưa có đơn hàng nào từ phía khách.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="admin-panel glass shadow-lg" style={{ flex: 1 }}>
                  <h3 className="brand-font">📍 Tồn Kho Showroom</h3>
                  <div className="inventory-summary">
                     <div className="inv-item"><span>Quận 1, HCM</span> <strong>85%</strong></div>
                     <div className="inv-item"><span>Hoàn Kiếm, HN</span> <strong>92%</strong></div>
                     <div className="inv-item"><span>Đà Nẵng</span> <strong style={{ color: '#e74c3c' }}>12% ⚠️</strong></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'catalog' && <div className="fade-in"><h3>Quản Lý Sản Phẩm (Đang cập nhật...)</h3></div>}
          
          {activeTab === 'orders' && (
            <div className="fade-in">
              <div className="admin-panel glass shadow-lg">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 className="brand-font">📜 Danh Sách Đơn Hàng</h3>
                  <div className="admin-filters">
                     <select className="admin-input-sm">
                        <option>Tất cả trạng thái</option>
                        <option>Chờ xử lý</option>
                        <option>Đang giao</option>
                     </select>
                  </div>
                </div>
                
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Mã Đơn</th>
                      <th>Khách Hàng</th>
                      <th>Sản Phẩm</th>
                      <th>Thanh Toán</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(orders) && orders.length > 0 ? (
                      orders.map((o) => {
                        const id = o.id ?? o.Id;
                        const customer =
                          o.customerName ??
                          o.CustomerName ??
                          o.userName ??
                          o.UserName ??
                          'Khách hàng';
                        const items = o.items || o.Items || [];
                        const firstItem = items[0];
                        const itemLabel = items.length
                          ? `${firstItem.perfumeName || firstItem.PerfumeName || 'Sản phẩm'}${
                              items.length > 1 ? ` +${items.length - 1}` : ''
                            }`
                          : '—';
                        const amount =
                          o.totalAmount ??
                          o.TotalAmount ??
                          (Array.isArray(items)
                            ? items.reduce(
                                (s, it) =>
                                  s +
                                  (it.price || it.Price || 0) *
                                    (it.quantity || it.Quantity || 1),
                                0
                              )
                            : 0);

                        return (
                          <tr key={id}>
                            <td>
                              <strong>#{id}</strong>
                            </td>
                            <td>{customer}</td>
                            <td style={{ fontSize: '0.8rem' }}>{itemLabel}</td>
                            <td>{vnd(amount)}</td>
                            <td>
                              <button
                                className="btn-action-view"
                                onClick={() =>
                                  alert(
                                    `Đơn ${id}\nKhách: ${customer}\nSản phẩm: ${itemLabel}\nTổng: ${vnd(
                                      amount
                                    )}`
                                  )
                                }
                              >
                                Chi tiết
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} style={{ color: '#666', fontSize: '0.9rem' }}>
                          Chưa có đơn hàng nào từ phía khách.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Personalization Preview Section */}
              <div className="admin-row" style={{ marginTop: '2rem' }}>
                 <div className="admin-panel glass shadow-gold" style={{ flex: 1 }}>
                    <h4 className="brand-font" style={{ color: 'var(--accent-gold)' }}>🖼️ Xem Trước Nội Dung Khắc</h4>
                    <div style={{ height: '300px', background: '#000', borderRadius: '8px', border: '1px solid #333', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', marginTop: '1rem' }}>
                        <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=200" alt="mockup" style={{ opacity: 0.8 }} />
                        <div style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', textShadow: '0 0 5px rgba(0,0,0,0.5)', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                          KIM 1995
                        </div>
                        <p style={{ position: 'absolute', bottom: '10px', fontSize: '0.7rem', color: '#666' }}>Mô phỏng khắc trên chai thực tế cho đơn #KP9801</p>
                    </div>
                 </div>
                 <div className="admin-panel glass shadow-lg" style={{ flex: 1 }}>
                    <h4 className="brand-font" style={{ color: '#ffd700' }}>💌 Lời Chúc Gói Quà</h4>
                    <div style={{ padding: '2rem', background: '#111', border: '1px solid #222', borderRadius: '8px', marginTop: '1rem', fontStyle: 'italic', position: 'relative' }}>
                        <span style={{ position: 'absolute', top: '-10px', left: '20px', fontSize: '2rem', color: '#333' }}>“</span>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#ccc' }}>
                           Chúc mừng sinh nhật em yêu! Hy vọng mùi hương này sẽ luôn bên em trong những khoảnh khắc tuyệt vời nhất.
                        </p>
                        <p style={{ textAlign: 'right', marginTop: '1rem', fontWeight: 'bold', color: 'var(--accent-gold)' }}>— Từ Hoàng Kim</p>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'catalog' && (
            <div className="fade-in">
              <div className="admin-panel glass shadow-lg">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 className="brand-font">💎 Quản Lý Catalog Nước Hoa</h3>
                  <button className="btn-gold" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>+ Thêm Sản Phẩm Mới</button>
                </div>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Ảnh</th>
                      <th>Tên Sản Phẩm</th>
                      <th>Nhóm Hương</th>
                      <th>Tầng Hương (Notes)</th>
                      <th>Nồng Độ</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.slice(0, 5).map(p => (
                      <tr key={p.id}>
                        <td><img src={p.imageUrl} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} /></td>
                        <td><strong>{p.name}</strong></td>
                        <td><span className="badge-luxury">{p.description?.split(' - ')[0] || 'N/A'}</span></td>
                        <td style={{ fontSize: '0.75rem', color: '#888' }}>
                           <div>⬆️ {p.topNotes || 'Chưa cập nhật'}</div>
                           <div>⬇️ {p.baseNotes || 'Chưa cập nhật'}</div>
                        </td>
                        <td>{p.concentration || 'EDP'}</td>
                        <td>
                          <button className="btn-action-view" onClick={() => alert(`Mở Form chỉnh sửa nâng cao cho ${p.name}`)}>Sửa Attributes</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'inventory' && (
            <div className="fade-in">
              <div className="stats-grid" style={{ marginBottom: '2rem' }}>
                 <div className="stat-card glass shadow-gold">
                    <div className="stat-label">Tổng Tồn Kho Hệ Thống</div>
                    <div className="stat-val">12,450 units</div>
                 </div>
                 <div className="stat-card glass shadow-gold">
                    <div className="stat-label">Giá Trị Tồn Kho</div>
                    <div className="stat-val">2.8B VNĐ</div>
                 </div>
              </div>

              <div className="admin-panel glass shadow-lg">
                <h3 className="brand-font" style={{ marginBottom: '1.5rem' }}>📍 Phân Bổ Tồn Kho O2O</h3>
                <div className="inventory-map-visual" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                   {[
                    { node: 'Kho Tổng (Central WH)', type: 'Warehouse', stock: 8400, capacity: '65%', color: 'var(--accent-gold)' },
                    { node: 'KP Luxury Quận 1', type: 'Showroom', stock: 1200, capacity: '85%', color: '#27ae60' },
                    { node: 'KP Luxury Hoàn Kiếm', type: 'Showroom', stock: 950, capacity: '92%', color: '#27ae60' },
                    { node: 'KP Luxury Đà Nẵng', type: 'Showroom', stock: 150, capacity: '12%', color: '#e74c3c' },
                   ].map(loc => (
                     <div key={loc.node} style={{ padding: '1.5rem', background: '#111', borderRadius: '8px', borderLeft: `4px solid ${loc.color}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                           <span style={{ fontWeight: 'bold' }}>{loc.node}</span>
                           <span style={{ fontSize: '0.7rem', color: '#666' }}>{loc.type}</span>
                        </div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{loc.stock} <span style={{ fontSize: '0.8rem', color: '#444' }}>sp</span></div>
                        <div className="bar-track" style={{ height: '6px', background: '#222', marginTop: '1rem' }}>
                           <div className="bar-fill" style={{ width: loc.capacity, background: loc.color }}></div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem' }}>
                           <span style={{ color: '#666' }}>Sức chứa: {loc.capacity}</span>
                           <a href="#" style={{ color: 'var(--accent-gold)' }}>Điều chuyển hàng →</a>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'crm' && (
            <div className="fade-in">
              <div className="admin-row">
                 <div className="admin-panel glass shadow-lg" style={{ flex: 2 }}>
                    <h3 className="brand-font">👥 Hồ Sơ Khách Hàng (O2O)</h3>
                    <div className="admin-filters" style={{ margin: '1rem 0' }}>
                       <input type="text" placeholder="Tìm bằng SĐT/Email..." className="admin-input-sm" style={{ width: '100%' }} />
                    </div>
                    <table className="admin-table">
                       <thead>
                          <tr>
                             <th>Khách Hàng</th>
                             <th>Liên Hệ</th>
                             <th>Ưu Thế Mùi Hương</th>
                             <th>Lịch Sử</th>
                             <th>Thao Tác</th>
                          </tr>
                       </thead>
                       <tbody>
                          {[
                             { name: 'Lê Văn A', phone: '0901234567', tags: '#Woody #Luxury', last: 'Mua tại Showroom Q1' },
                             { name: 'Trần Thị B', phone: '0912223334', tags: '#Floral #EDP', last: 'Mua Online (Website)' },
                          ].map(cus => (
                             <tr key={cus.phone}>
                                <td><strong>{cus.name}</strong></td>
                                <td>{cus.phone}</td>
                                <td><span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>{cus.tags}</span></td>
                                <td style={{ fontSize: '0.8rem', color: '#888' }}>{cus.last}</td>
                                <td><button className="btn-action-view">Timeline</button></td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
                 <div className="admin-panel glass shadow-gold" style={{ flex: 1 }}>
                    <h3 className="brand-font">📅 Lịch Hẹn Showroom</h3>
                    <div className="booking-list" style={{ marginTop: '1.5rem' }}>
                       {[
                          { time: 'Hôm nay, 14:00', name: 'Nguyễn Du', branch: 'Q1, HCM', status: 'Xác nhận' },
                          { time: 'Mai, 10:30', name: 'Phạm Bình', branch: 'Hoàn Kiếm, HN', status: 'Chờ' },
                       ].map(b => (
                          <div key={b.name} style={{ padding: '1rem', background: '#111', borderRadius: '4px', marginBottom: '1rem', borderLeft: b.status === 'Chờ' ? '3px solid #f39c12' : '3px solid #27ae60' }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                                <span style={{ color: 'var(--accent-gold)' }}>{b.time}</span>
                                <span style={{ color: b.status === 'Chờ' ? '#f39c12' : '#27ae60' }}>{b.status}</span>
                             </div>
                             <div style={{ fontWeight: 'bold', margin: '0.3rem 0' }}>{b.name}</div>
                             <div style={{ fontSize: '0.75rem', color: '#666' }}>Chi nhánh: {b.branch}</div>
                          </div>
                       ))}
                       <button className="btn-gold" style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem' }}>Xem Lịch Toàn Quốc</button>
                    </div>
                 </div>
              </div>
            </div>
          )}
          
          {activeTab === 'marketing' && (
            <div className="fade-in">
              <div className="admin-row">
                 <div className="admin-panel glass" style={{ flex: 1 }}>
                    <h3 className="brand-font">⚡ Cấu Hình Fragrance Finder</h3>
                    <p style={{ fontSize: '0.85rem', color: '#888', margin: '0.5rem 0 1.5rem' }}>Thiết lập câu hỏi và trọng số gợi ý sản phẩm.</p>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                       <div style={{ padding: '1rem', background: '#111', borderRadius: '4px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>Câu hỏi 1</strong> <span style={{ color: 'var(--accent-gold)' }}>Sửa</span></div>
                          <div style={{ color: '#444', fontSize: '0.8rem' }}>"Bạn muốn cảm thấy như thế nào khi xịt nước hoa?"</div>
                       </div>
                       <button className="btn-secondary" style={{ border: '1px dashed #333' }}>+ Thêm Câu Hỏi Mới</button>
                    </div>
                 </div>
                 <div className="admin-panel glass" style={{ flex: 2 }}>
                    <h3 className="brand-font">⭐ Kiểm Duyệt Đánh Giá</h3>
                    <table className="admin-table">
                       <thead>
                          <tr>
                             <th>Sản Phẩm</th>
                             <th>Khách Hàng</th>
                             <th>Đánh Giá (Sillage/Long.)</th>
                             <th>Trạng Thái</th>
                             <th>Thao Tác</th>
                          </tr>
                       </thead>
                       <tbody>
                          <tr>
                             <td>Bleu de Chanel</td>
                             <td>Ngọc Minh</td>
                             <td style={{ fontSize: '0.7rem' }}>Lâu (4/5) / Xa (3/5)</td>
                             <td><span style={{ color: '#27ae60' }}>Công khai</span></td>
                             <td><button className="btn-action-view">Gỡ bỏ</button></td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <style>{`
        .admin-layout { display: flex; min-height: 100vh; background: #050505; color: #fff; }
        .admin-sidebar { width: 280px; background: #0a0a0a; border-right: 1px solid #222; padding: 2rem; display: flex; flex-direction: column; position: fixed; height: 100vh; }
        .admin-logo { font-size: 1.8rem; color: var(--accent-gold); letter-spacing: 4px; border-bottom: 2px solid var(--accent-gold); padding-bottom: 1rem; margin-bottom: 2rem; text-align: center; }
        .admin-nav { flex: 1; }
        .admin-nav-item { width: 100%; text-align: left; background: none; border: none; color: #888; padding: 1rem; cursor: pointer; display: flex; align-items: center; border-radius: 8px; transition: 0.3s; margin-bottom: 0.5rem; }
        .admin-nav-item:hover { background: rgba(255,255,255,0.05); color: #fff; }
        .admin-nav-item.active { background: var(--accent-gold); color: #000; font-weight: bold; box-shadow: 0 4px 15px rgba(197,160,89,0.3); }
        .nav-icon { margin-right: 1rem; font-size: 1.2rem; }
        .admin-back-btn { background: none; border: 1px solid #333; color: #666; padding: 0.8rem; border-radius: 4px; cursor: pointer; margin-top: auto; }
        .admin-main { flex: 1; margin-left: 280px; padding: 2rem; }
        .admin-header { display: flex; justifyContent: space-between; alignItems: center; margin-bottom: 3rem; }
        .admin-user-info { display: flex; alignItems: center; gap: 1rem; background: #111; padding: 0.5rem 1rem; border-radius: 50px; border: 1px solid #222; }
        .admin-avatar { width: 32px; height: 32px; background: var(--accent-gold); color: #000; display: flex; justifyContent: center; alignItems: center; border-radius: 50%; font-weight: bold; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; }
        .stat-card { padding: 1.5rem; border-radius: 12px; }
        .stat-header { display: flex; justifyContent: space-between; margin-bottom: 1rem; }
        .stat-icon { font-size: 2rem; }
        .stat-trend { font-size: 0.8rem; color: #27ae60; background: rgba(39,174,96,0.1); padding: 0.2rem 0.5rem; border-radius: 4px; }
        .stat-val { font-size: 1.8rem; font-weight: bold; color: var(--accent-gold); margin-bottom: 0.2rem; }
        .stat-label { color: #888; font-size: 0.9rem; }
        .admin-panel { background: #0a0a0a; border: 1px solid #222; padding: 1.5rem; border-radius: 12px; }
        .admin-row { display: flex; gap: 1.5rem; }
        .admin-table { width: 100%; border-collapse: collapse; margin-top: 1.5rem; text-align: left; }
        .admin-table th { color: #666; font-size: 0.8rem; text-transform: uppercase; padding-bottom: 1rem; border-bottom: 1px solid #222; }
        .admin-table td { padding: 1rem 0; font-size: 0.9rem; border-bottom: 1px solid #111; }
        .badge-luxury { background: rgba(197,160,89,0.1); color: var(--accent-gold); padding: 0.3rem 0.6rem; border-radius: 4px; font-size: 0.8rem; }
        .badge-gold { background: rgba(255,215,0,0.1); color: #ffd700; padding: 0.3rem 0.6rem; border-radius: 4px; font-size: 0.8rem; }
        .status-pending { color: #f39c12; }
        .status-processing { color: #3498db; }
        .inventory-summary { display: grid; gap: 1rem; margin-top: 1.5rem; }
        .inv-item { display: flex; justifyContent: space-between; padding: 0.8rem; background: #111; border-radius: 4px; font-size: 0.9rem; }
        .admin-input-sm { background: #111; border: 1px solid #333; color: #fff; padding: 0.5rem; border-radius: 4px; font-size: 0.8rem; }
        .btn-action-view { background: none; border: 1px solid var(--accent-gold); color: var(--accent-gold); padding: 0.3rem 0.8rem; border-radius: 4px; cursor: pointer; font-size: 0.8rem; transition: 0.3s; }
        .btn-action-view:hover { background: var(--accent-gold); color: #000; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
