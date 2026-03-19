import React, { useState } from 'react';

const ProductsTab = ({ products }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const openAddModal = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  return (
    <div className="fade-in">
      <div className="admin-panel glass shadow-lg">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h3 className="brand-font" style={{ fontSize: '1.8rem' }}>💎 Quản Lý Catalog Nước Hoa</h3>
            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.3rem' }}>Tổng cộng {products?.length || 0} sản phẩm đang trưng bày.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <button className="admin-input-sm" style={{ borderStyle: 'dashed' }}>📤 Export CSV</button>
             <button className="btn-gold" onClick={openAddModal} style={{ padding: '0.8rem 1.5rem', fontWeight: '600' }}>+ Thêm Sản Phẩm Mới</button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
           <input type="text" className="admin-input-sm" placeholder="🔍 Tìm tên, thương hiệu..." style={{ flex: 1, padding: '0.8rem' }} />
           <select className="admin-input-sm" style={{ width: '150px' }}>
              <option>Thương hiệu</option>
              <option>Chanel</option>
              <option>Dior</option>
              <option>Creed</option>
           </select>
           <select className="admin-input-sm" style={{ width: '150px' }}>
              <option>Giới tính</option>
              <option>Nam</option>
              <option>Nữ</option>
              <option>Unisex</option>
           </select>
        </div>

        <table className="admin-table admin-table-modern">
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>Thông Tin Cơ Bản</th>
              <th>Thương Hiệu / Giới Tính</th>
              <th>Tầng Hương (Notes)</th>
              <th>Giá / Stock</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {(products || []).map(p => (
              <tr key={p.id}>
                <td><img src={p.imageUrl} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #222' }} /></td>
                <td>
                   <div style={{ fontWeight: '600', fontSize: '1rem' }}>{p.name}</div>
                   <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '4px' }}>{p.concentration || p.Concentration || 'Eau de Parfum'}</div>
                </td>
                <td>
                   <div className="badge-luxury" style={{ display: 'inline-block' }}>{p.brand || p.Brand || 'KP'}</div>
                   <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '4px' }}>{p.gender || p.Gender || 'Unisex'}</div>
                </td>
                <td style={{ fontSize: '0.75rem', color: '#888' }}>
                   <div style={{ marginBottom: '4px' }}><span style={{ color: 'var(--luxury-gold)' }}>Top:</span> {p.topNotes || p.TopNotes || '—'}</div>
                   <div><span style={{ color: 'var(--luxury-gold)' }}>Base:</span> {p.baseNotes || p.BaseNotes || '—'}</div>
                </td>
                <td>
                   <div style={{ color: 'var(--luxury-gold-bright)', fontWeight: 'bold' }}>{p.price?.toLocaleString()} đ</div>
                   <div style={{ fontSize: '0.75rem', color: p.stockQuantity < 5 ? '#e74c3c' : '#444' }}>Kho: {p.stockQuantity || 0}</div>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '10px' }}>
                     <button className="btn-action-view" onClick={() => openEditModal(p)}>Chi tiết / Sửa</button>
                     <button style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer', fontSize: '1.2rem' }}>⋮</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Simple Pagination */}
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
           <button className="admin-input-sm" disabled>«</button>
           <button className="admin-input-sm" style={{ background: 'var(--luxury-gold)', color: '#000' }}>1</button>
           <button className="admin-input-sm">2</button>
           <button className="admin-input-sm">»</button>
        </div>
      </div>

      {/* CRUD Modal / Drawer Overlay */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 2000, display: 'flex', justifyContent: 'flex-end' }}>
           <div className="fade-in" style={{ width: '600px', height: '100%', background: '#0a0a0a', borderLeft: '1px solid var(--luxury-gold)', padding: '3rem', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                 <h2 className="brand-font" style={{ fontSize: '2rem' }}>{editingProduct ? 'Hồ Sơ Sản Phẩm' : 'Tạo Tuyệt Tác Mới'}</h2>
                 <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}>×</button>
              </div>

              <form style={{ display: 'grid', gap: '1.5rem' }} onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
                 <div style={{ display: 'grid', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase' }}>Tên nước hoa</label>
                    <input className="admin-input-sm" defaultValue={editingProduct?.name} placeholder="Ví dụ: Bleu de Chanel Parfum" style={{ padding: '0.8rem' }} />
                 </div>

                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                       <label style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase' }}>Thương hiệu</label>
                       <input className="admin-input-sm" defaultValue={editingProduct?.brand || 'Chanel'} />
                    </div>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                       <label style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase' }}>Phân loại giới tính</label>
                       <select className="admin-input-sm">
                          <option>Nam</option>
                          <option>Nữ</option>
                          <option>Unisex</option>
                       </select>
                    </div>
                 </div>

                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                       <label style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase' }}>Dung tích (ml)</label>
                       <input className="admin-input-sm" placeholder="100ml, 50ml..." defaultValue="100ml" />
                    </div>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                       <label style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase' }}>Nồng độ</label>
                       <select className="admin-input-sm" defaultValue="Eau de Parfum (EDP)">
                          <option>Parfum</option>
                          <option>Eau de Parfum (EDP)</option>
                          <option>Eau de Toilette (EDT)</option>
                          <option>Extrait de Parfum</option>
                       </select>
                    </div>
                 </div>

                 <div style={{ display: 'grid', gap: '1rem', padding: '1.5rem', border: '1px solid #1a1a1a', borderRadius: '8px' }}>
                    <h4 className="brand-font" style={{ color: 'var(--luxury-gold)', fontSize: '1rem' }}>Scent Profile (Tầng Hương)</h4>
                    <div style={{ display: 'grid', gap: '0.8rem' }}>
                       <input className="admin-input-sm" placeholder="Hương đầu (Top Notes)" defaultValue={editingProduct?.topNotes} />
                       <input className="admin-input-sm" placeholder="Hương giữa (Middle Notes)" />
                       <input className="admin-input-sm" placeholder="Hương cuối (Base Notes)" defaultValue={editingProduct?.baseNotes} />
                    </div>
                 </div>

                 <div style={{ display: 'grid', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase' }}>Mô tả câu chuyện</label>
                    <textarea className="admin-input-sm" style={{ height: '100px', resize: 'none' }} defaultValue={editingProduct?.brandStory || editingProduct?.description}></textarea>
                 </div>

                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                       <label style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase' }}>Giá niêm yết (VNĐ)</label>
                       <input type="number" className="admin-input-sm" defaultValue={editingProduct?.price} />
                    </div>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                       <label style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase' }}>Giảm giá (%)</label>
                       <input type="number" className="admin-input-sm" defaultValue="0" />
                    </div>
                 </div>

                 <div style={{ display: 'grid', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase' }}>Hình ảnh (Multi-upload Mock)</label>
                    <div style={{ border: '2px dashed #222', padding: '2rem', textAlign: 'center', borderRadius: '8px', color: '#444', fontSize: '0.8rem' }}>
                       Kéo thả hoặc Click để tải lên ảnh nghệ thuật<br/>(Hỗ trợ PNG, JPG, WebP)
                    </div>
                 </div>

                 <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="submit" className="btn-gold" style={{ flex: 2, padding: '1rem' }}>LƯU THAY ĐỔI</button>
                    {editingProduct && <button type="button" className="admin-input-sm" style={{ flex: 1, color: '#e74c3c', borderColor: '#444' }}>XÓA</button>}
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default ProductsTab;
