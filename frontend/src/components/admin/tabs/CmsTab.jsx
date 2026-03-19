import React from 'react';

const CmsTab = () => {
  return (
    <div className="fade-in">
      <div className="admin-row">
         <div className="admin-panel glass shadow-lg" style={{ flex: 1.5 }}>
            <h3 className="brand-font" style={{ fontSize: '1.6rem', marginBottom: '1.5rem' }}>🖼️ Quản Lý Banner Trang Chủ</h3>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
               <div style={{ padding: '0.5rem', background: '#0a0a0a', border: '1px solid #222', borderRadius: '8px', position: 'relative' }}>
                  <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800" alt="banner" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', opacity: 0.7 }} />
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                     <div className="brand-font" style={{ fontSize: '1.2rem', color: 'var(--luxury-gold)' }}>LUXURY SCENT COLLECTION</div>
                     <div style={{ fontSize: '0.7rem' }}>Trạng thái: Đang hiển thị</div>
                  </div>
                  <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end', gap: '10px', padding: '0.5rem' }}>
                     <button className="admin-input-sm">Sửa Text</button>
                     <button className="admin-input-sm">Thay Ảnh</button>
                  </div>
               </div>
               <button className="btn-secondary" style={{ border: '1px dashed #333', padding: '1rem' }}>+ Thêm Banner Slice Mới</button>
            </div>
         </div>

         <div className="admin-panel glass shadow-lg" style={{ flex: 1 }}>
            <h3 className="brand-font" style={{ marginBottom: '1.5rem' }}>📝 Blog / Kiến Thức Nước Hoa</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
               {[
                  { title: 'Cách chọn nước hoa theo mùa', date: '15/03/2024', author: 'Admin' },
                  { title: 'Phân biệt Parfum và EDP', date: '10/03/2024', author: 'Kim' },
                  { title: 'Top 5 mùi hương Woody cho mùa Đông', date: '05/03/2024', author: 'Staff' }
               ].map((post, i) => (
                  <div key={i} style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: '2px solid #222' }}>
                     <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{post.title}</div>
                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#555', marginTop: '5px' }}>
                        <span>{post.date}</span>
                        <span>Bởi: {post.author}</span>
                     </div>
                  </div>
               ))}
               <button className="btn-gold" style={{ padding: '0.8rem', marginTop: '0.5rem' }}>VIẾT BÀI MỚI</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default CmsTab;
