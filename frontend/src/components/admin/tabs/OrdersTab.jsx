import React, { useState } from 'react';
import { vnd } from '../../../utils/format';

const OrdersTab = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const statuses = ['Pending', 'Confirmed', 'Shipping', 'Completed', 'Cancelled'];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return '#f39c12';
      case 'confirmed': return '#3498db';
      case 'shipping': return '#9b59b6';
      case 'completed': return '#27ae60';
      case 'cancelled': return '#e74c3c';
      default: return '#888';
    }
  };

  const openDetail = (order) => {
    setSelectedOrder(order);
    setShowDetail(true);
  };

  return (
    <div className="fade-in">
      <div className="admin-panel glass shadow-lg">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h3 className="brand-font" style={{ fontSize: '1.8rem' }}>📜 Quản Lý Đơn Hàng</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <select className="admin-input-sm">
                <option>Lọc: Tất cả trạng thái</option>
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
             </select>
             <button className="admin-input-sm">📅 Lọc Ngày</button>
          </div>
        </div>
        
        <table className="admin-table admin-table-modern">
          <thead>
            <tr>
              <th>Mã Đơn</th>
              <th>Khách Hàng</th>
              <th>Sản Phẩm</th>
              <th>Tổng Tiền</th>
              <th>Trạng Thái</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(orders) && orders.length > 0 ? (
              orders.map((o) => {
                const id = o.id ?? o.Id;
                const customer = o.customerName ?? o.CustomerName ?? o.userName ?? o.UserName ?? 'Khách hàng';
                const items = o.items || o.Items || [];
                const firstItem = items[0];
                const itemLabel = items.length ? `${firstItem.perfumeName || firstItem.PerfumeName || 'Sản phẩm'}${items.length > 1 ? ` +${items.length - 1}` : ''}` : '—';
                const amount = o.totalAmount ?? o.TotalAmount ?? (Array.isArray(items) ? items.reduce((s, it) => s + (it.price || it.Price || 0) * (it.quantity || it.Quantity || 1), 0) : 0);
                const currentStatus = o.status || o.Status || 'Pending';

                return (
                  <tr key={id}>
                    <td><strong>#{id}</strong></td>
                    <td>
                       <div>{customer}</div>
                       <div style={{ fontSize: '0.7rem', color: '#555' }}>2 phút trước</div>
                    </td>
                    <td style={{ fontSize: '0.8rem' }}>{itemLabel}</td>
                    <td><strong style={{ color: 'var(--luxury-gold)' }}>{vnd(amount)}</strong></td>
                    <td>
                       <select 
                          className="admin-input-sm" 
                          style={{ color: getStatusColor(currentStatus), borderColor: getStatusColor(currentStatus), background: 'transparent', fontSize: '0.75rem', padding: '0.3rem' }}
                          defaultValue={currentStatus}
                          onChange={(e) => alert(`Cập nhật trạng thái đơn #${id} thành ${e.target.value}`)}
                       >
                          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                       </select>
                    </td>
                    <td>
                      <button className="btn-action-view" onClick={() => openDetail(o)}>
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr><td colSpan={6} style={{ color: '#666', fontSize: '0.9rem', textAlign: 'center', padding: '3rem' }}>Chưa có đơn hàng nào cần xử lý.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      {showDetail && selectedOrder && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
           <div className="fade-in admin-panel shadow-gold" style={{ width: '800px', maxHeight: '90vh', overflowY: 'auto', background: '#0a0a0a', border: '1px solid var(--luxury-gold)', padding: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                 <h2 className="brand-font" style={{ fontSize: '1.8rem' }}>Chi Tiết Đơn Hàng #{selectedOrder.id ?? selectedOrder.Id}</h2>
                 <button onClick={() => setShowDetail(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                 <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                    <h4 style={{ color: 'var(--luxury-gold)', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '1rem' }}>👤 Thông tin khách hàng</h4>
                    <p><strong>{selectedOrder.customerName ?? selectedOrder.UserName}</strong></p>
                    <p style={{ fontSize: '0.9rem', color: '#888' }}>Số ĐT: 090xxxx888</p>
                    <p style={{ fontSize: '0.9rem', color: '#888' }}>Địa chỉ: 123 Lê Lợi, Quận 1, TP.HCM</p>
                 </div>
                 <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                    <h4 style={{ color: 'var(--luxury-gold)', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '1rem' }}>🚚 Vận chuyển & Tracking</h4>
                    <p style={{ fontSize: '0.9rem' }}>Đơn vị: Giao Hàng Tiết Kiệm</p>
                    <div style={{ marginTop: '0.5rem' }}>
                       <label style={{ fontSize: '0.7rem', color: '#555' }}>Mã vận đơn (Tracking ID)</label>
                       <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                          <input className="admin-input-sm" style={{ flex: 1 }} placeholder="GHTK-98210332..." />
                          <button className="btn-action-view">Cập nhật</button>
                       </div>
                    </div>
                 </div>
              </div>

              <h4 className="brand-font" style={{ marginBottom: '1rem' }}>🛍️ Danh sách sản phẩm</h4>
              <table className="admin-table">
                 <thead style={{ background: '#111' }}>
                    <tr>
                       <th style={{ padding: '1rem' }}>Sản phẩm</th>
                       <th>Số lượng</th>
                       <th>Đơn giá</th>
                       <th style={{ textAlign: 'right', paddingRight: '1rem' }}>Thành tiền</th>
                    </tr>
                 </thead>
                 <tbody>
                    {(selectedOrder.items || selectedOrder.Items || []).map((it, idx) => (
                       <tr key={idx}>
                          <td style={{ padding: '1rem' }}>{it.perfumeName || it.PerfumeName || 'Sản phẩm'}</td>
                          <td>x{it.quantity || it.Quantity || 1}</td>
                          <td>{vnd(it.price || it.Price || 0)}</td>
                          <td style={{ textAlign: 'right', paddingRight: '1rem' }}>{vnd((it.price || it.Price || 0) * (it.quantity || it.Quantity || 1))}</td>
                       </tr>
                    ))}
                 </tbody>
                 <tfoot>
                    <tr>
                       <td colSpan={3} style={{ textAlign: 'right', padding: '1.5rem 1rem', fontStyle: 'italic', color: '#666' }}>Tạm tính:</td>
                       <td style={{ textAlign: 'right', paddingRight: '1rem' }}>{vnd(selectedOrder.totalAmount ?? selectedOrder.TotalAmount)}</td>
                    </tr>
                    <tr>
                       <td colSpan={3} style={{ textAlign: 'right', padding: '0.5rem 1rem', fontWeight: 'bold' }}>TỔNG CỘNG:</td>
                       <td style={{ textAlign: 'right', paddingRight: '1rem', fontSize: '1.2rem', color: 'var(--luxury-gold)', fontWeight: 'bold' }}>{vnd(selectedOrder.totalAmount ?? selectedOrder.TotalAmount)}</td>
                    </tr>
                 </tfoot>
              </table>

              <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                 <button className="admin-input-sm" style={{ padding: '1rem 2rem' }}>In Hóa Đơn 🖨️</button>
                 <button className="btn-gold" style={{ padding: '1rem 2rem' }} onClick={() => setShowDetail(false)}>Đóng</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTab;
