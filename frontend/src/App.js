import React, { useState, useEffect } from 'react';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green-dark: #1a3c2e;
    --green-mid: #2d6a4f;
    --green-light: #52b788;
    --green-pale: #d8f3dc;
    --gold: #e9c46a;
    --gold-dark: #c9a227;
    --cream: #faf8f3;
    --text-dark: #1a1a1a;
    --text-mid: #4a5568;
    --text-light: #8a9ab0;
    --white: #ffffff;
    --red: #e63946;
    --border: #e2e8f0;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
    --shadow-md: 0 4px 16px rgba(0,0,0,0.1);
    --shadow-lg: 0 12px 40px rgba(0,0,0,0.12);
    --radius: 12px;
    --radius-lg: 20px;
  }

  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: var(--cream);
    color: var(--text-dark);
    min-height: 100vh;
  }

  /* ── HEADER ── */
  .header {
    background: var(--green-dark);
    background-image: 
      radial-gradient(ellipse at 10% 50%, rgba(82,183,136,0.18) 0%, transparent 60%),
      radial-gradient(ellipse at 90% 20%, rgba(233,196,106,0.12) 0%, transparent 50%);
    padding: 0 40px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 20px rgba(0,0,0,0.25);
  }

  .header-brand {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .header-logo {
    width: 42px;
    height: 42px;
    background: var(--gold);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
  }

  .header-title {
    font-family: 'DM Serif Display', serif;
    font-size: 19px;
    color: var(--white);
    letter-spacing: 0.2px;
    line-height: 1.2;
  }

  .header-sub {
    font-size: 11px;
    color: rgba(255,255,255,0.55);
    font-weight: 500;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    margin-top: 2px;
  }

  .btn-switch {
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    color: var(--white);
    padding: 9px 20px;
    border-radius: 8px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 7px;
    letter-spacing: 0.2px;
  }

  .btn-switch:hover {
    background: rgba(255,255,255,0.18);
    border-color: rgba(255,255,255,0.35);
    transform: translateY(-1px);
  }

  /* ── HERO BANNER ── */
  .hero {
    background: linear-gradient(135deg, var(--green-mid) 0%, var(--green-dark) 100%);
    padding: 44px 40px 40px;
    color: white;
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    right: -60px;
    top: -60px;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    background: rgba(255,255,255,0.04);
    pointer-events: none;
  }

  .hero::after {
    content: '';
    position: absolute;
    right: 80px;
    bottom: -80px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: rgba(233,196,106,0.07);
    pointer-events: none;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(233,196,106,0.2);
    border: 1px solid rgba(233,196,106,0.35);
    color: var(--gold);
    font-size: 11px;
    font-weight: 700;
    padding: 5px 12px;
    border-radius: 20px;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    margin-bottom: 14px;
  }

  .hero h1 {
    font-family: 'DM Serif Display', serif;
    font-size: 30px;
    line-height: 1.25;
    margin-bottom: 10px;
    max-width: 520px;
  }

  .hero p {
    font-size: 14px;
    color: rgba(255,255,255,0.65);
    max-width: 480px;
    line-height: 1.6;
  }

  .hero-stats {
    display: flex;
    gap: 28px;
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid rgba(255,255,255,0.12);
  }

  .hero-stat-num {
    font-family: 'DM Serif Display', serif;
    font-size: 24px;
    color: var(--gold);
  }

  .hero-stat-label {
    font-size: 11px;
    color: rgba(255,255,255,0.5);
    margin-top: 2px;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    font-weight: 600;
  }

  /* ── MAIN LAYOUT ── */
  .main {
    max-width: 900px;
    margin: 0 auto;
    padding: 36px 24px 60px;
  }

  /* ── CARDS ── */
  .card {
    background: var(--white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border);
    overflow: hidden;
    margin-bottom: 24px;
    animation: slideUp 0.4s ease both;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .card-header {
    padding: 20px 24px 18px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .card-icon {
    width: 40px;
    height: 40px;
    background: var(--green-pale);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 19px;
    flex-shrink: 0;
  }

  .card-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-dark);
  }

  .card-subtitle {
    font-size: 12px;
    color: var(--text-light);
    margin-top: 2px;
    font-weight: 500;
  }

  .card-body {
    padding: 24px;
  }

  /* ── FORM ── */
  .form-group {
    margin-bottom: 20px;
  }

  .form-label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: var(--text-dark);
    margin-bottom: 7px;
    letter-spacing: 0.1px;
  }

  .form-label span {
    color: var(--red);
    margin-left: 2px;
  }

  .form-input {
    width: 100%;
    padding: 11px 14px;
    border: 1.5px solid var(--border);
    border-radius: 9px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    color: var(--text-dark);
    background: var(--white);
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }

  .form-input:focus {
    border-color: var(--green-light);
    box-shadow: 0 0 0 3px rgba(82,183,136,0.15);
  }

  .form-input::placeholder { color: var(--text-light); }

  .file-upload-area {
    border: 2px dashed var(--border);
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    background: #fafafa;
  }

  .file-upload-area:hover, .file-upload-area.has-file {
    border-color: var(--green-light);
    background: var(--green-pale);
  }

  .file-upload-area input[type="file"] {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .file-upload-icon { font-size: 28px; margin-bottom: 6px; }

  .file-upload-text {
    font-size: 13px;
    color: var(--text-mid);
    font-weight: 500;
  }

  .file-upload-sub {
    font-size: 11px;
    color: var(--text-light);
    margin-top: 3px;
  }

  .file-name-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--green-mid);
    color: white;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    margin-top: 8px;
  }

  /* ── BUTTONS ── */
  .btn-primary {
    background: linear-gradient(135deg, var(--green-mid), var(--green-dark));
    color: white;
    border: none;
    padding: 13px 28px;
    border-radius: 9px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    letter-spacing: 0.2px;
  }

  .btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(45,106,79,0.4);
  }

  .btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-secondary {
    background: var(--white);
    color: var(--text-mid);
    border: 1.5px solid var(--border);
    padding: 11px 20px;
    border-radius: 9px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 7px;
  }

  .btn-secondary:hover {
    border-color: var(--green-light);
    color: var(--green-mid);
    background: var(--green-pale);
  }

  .btn-approve {
    background: var(--green-pale);
    color: var(--green-mid);
    border: 1.5px solid rgba(82,183,136,0.3);
    padding: 7px 14px;
    border-radius: 7px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-approve:hover {
    background: var(--green-mid);
    color: white;
    border-color: var(--green-mid);
  }

  /* ── TRACKING SEARCH ── */
  .search-row {
    display: flex;
    gap: 10px;
  }

  .search-row .form-input { flex: 1; }

  /* ── STATUS BADGES ── */
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 11px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.2px;
  }

  .badge-pending {
    background: #fff8e1;
    color: #b7791f;
    border: 1px solid #f6d86020;
  }

  .badge-selesai {
    background: var(--green-pale);
    color: var(--green-mid);
    border: 1px solid rgba(82,183,136,0.2);
  }

  .badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }

  /* ── TABLE ── */
  .table-wrap {
    overflow-x: auto;
    border-radius: 10px;
    border: 1px solid var(--border);
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead th {
    background: #f7f8fa;
    padding: 13px 16px;
    text-align: left;
    font-size: 11px;
    font-weight: 700;
    color: var(--text-light);
    letter-spacing: 0.8px;
    text-transform: uppercase;
    border-bottom: 1px solid var(--border);
  }

  tbody tr {
    border-bottom: 1px solid #f0f2f5;
    transition: background 0.15s;
  }

  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: #fafbff; }

  tbody td {
    padding: 14px 16px;
    font-size: 13.5px;
    color: var(--text-dark);
    vertical-align: middle;
  }

  .td-id {
    font-family: 'DM Serif Display', serif;
    font-size: 16px;
    color: var(--green-mid);
    font-weight: 400;
  }

  .td-name { font-weight: 600; }

  .empty-state {
    text-align: center;
    padding: 52px 20px;
    color: var(--text-light);
  }

  .empty-state-icon { font-size: 42px; margin-bottom: 12px; }
  .empty-state-text { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
  .empty-state-sub { font-size: 13px; }

  /* ── ALERT ── */
  .alert {
    padding: 14px 16px;
    border-radius: 9px;
    font-size: 13px;
    font-weight: 500;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 20px;
    animation: slideUp 0.3s ease;
  }

  .alert-success {
    background: var(--green-pale);
    border: 1px solid rgba(82,183,136,0.3);
    color: var(--green-dark);
  }

  .alert-icon { font-size: 18px; flex-shrink: 0; }

  .alert-title { font-weight: 700; margin-bottom: 2px; font-size: 14px; }

  .id-highlight {
    font-family: 'DM Serif Display', serif;
    font-size: 20px;
    color: var(--green-mid);
    margin-top: 4px;
    display: block;
  }

  /* ── TRACK RESULT ── */
  .track-result {
    margin-top: 16px;
    padding: 18px;
    background: #f9fafc;
    border-radius: 10px;
    border: 1px solid var(--border);
    animation: slideUp 0.3s ease;
  }

  .track-result-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .track-label { font-size: 12px; color: var(--text-light); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
  .track-value { font-size: 14px; font-weight: 600; color: var(--text-dark); }

  /* ── ADMIN HEADER ── */
  .admin-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  /* ── LOADING SPINNER ── */
  .spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── RESPONSIVE ── */
  @media (max-width: 600px) {
    .header { padding: 0 16px; }
    .hero { padding: 28px 16px 28px; }
    .hero h1 { font-size: 22px; }
    .hero-stats { gap: 18px; }
    .main { padding: 20px 12px 48px; }
    .card-body { padding: 16px; }
    .search-row { flex-direction: column; }
  }
`;

function App() {
  // Variabel URL Backend Cloud Run kamu
  const API_URL = "https://backend-852230301371.asia-southeast2.run.app";

  const [view, setView] = useState('user');
  const [nama, setNama] = useState('');
  const [file, setFile] = useState(null);
  const [trackId, setTrackId] = useState('');
  const [trackResult, setTrackResult] = useState(null);
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [trackError, setTrackError] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Silakan pilih dokumen/foto terlebih dahulu!");
    setLoading(true);
    setSuccessData(null);
    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('tipe', 'Surat Domisili');
    formData.append('dokumen', file);
    try {
      // Endpoint Pengajuan
      const res = await fetch(`${API_URL}/api/pengajuan`, { method: 'POST', body: formData });
      const data = await res.json();
      setSuccessData({ id: data.id, nama });
      setNama('');
      setFile(null);
    } catch {
      alert("Gagal konek ke server Cloud. Pastikan backend di Cloud Run aktif!");
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminData = async () => {
    try {
        const res = await fetch(`${API_URL}/api/admin/data`);
        const data = await res.json();
        
        // PASTIKAN DATA ADALAH ARRAY
        if (Array.isArray(data)) {
            setListData(data);
        } else {
            setListData([]); // Jika bukan array (tapi pesan error), kosongkan saja
            console.error("Backend mengirim error:", data.message);
        }
    } catch { 
        setListData([]); 
        console.error("Gagal mengambil data admin dari Cloud"); 
    }
};

  const updateStatus = async (id) => {
    try {
        await fetch(`${API_URL}/api/admin/update-status/${id}`, { // Pakai update-status
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'Selesai' })
        });
        fetchAdminData(); // Refresh tabel setelah update
    } catch { 
        alert("Gagal update status"); 
    }
};

  const handleTrack = async () => {
    if (!trackId.trim()) return;
    setTrackResult(null);
    setTrackError('');
    try {
      // Endpoint Tracking (menggunakan data list)
      const res = await fetch(`${API_URL}/api/admin/data`);
      const data = await res.json();
      const found = data.find(d => String(d.id) === trackId.trim());
      if (found) setTrackResult(found);
      else setTrackError('ID tracking tidak ditemukan.');
    } catch { setTrackError('Gagal menghubungi server Cloud.'); }
  };

  return (
    <>
      <style>{STYLES}</style>

      {/* HEADER */}
      <header className="header">
        <div className="header-brand">
          <div className="header-logo">🏛️</div>
          <div>
            <div className="header-title">Kelurahan Generik Online</div>
            <div className="header-sub">Sistem Pelayanan Publik Desa</div>
          </div>
        </div>
        <button className="btn-switch" onClick={() => {
          const next = view === 'user' ? 'admin' : 'user';
          setView(next);
          setSuccessData(null);
          if (next === 'admin') fetchAdminData();
        }}>
          {view === 'user' ? '⚙️' : '👤'}
          {view === 'user' ? 'Masuk sebagai Admin' : 'Masuk sebagai Masyarakat'}
        </button>
      </header>

      {/* HERO */}
      <div className="hero">
        <div className="hero-badge">🛡️ &nbsp;Layanan Resmi</div>
        <h1>{view === 'user' ? 'Ajukan Surat Domisili\nSecara Online' : 'Dashboard Admin\nKelola Pengajuan'}</h1>
        <p>{view === 'user'
          ? 'Proses cepat, aman, dan transparan. Isi formulir di bawah dan unggah dokumen pendukung Anda.'
          : 'Pantau dan verifikasi seluruh pengajuan surat dari warga secara real-time.'}</p>
        <div className="hero-stats">
          {view === 'user' ? (
            <>
              <div><div className="hero-stat-num">1-3</div><div className="hero-stat-label">Hari Proses</div></div>
              <div><div className="hero-stat-num">100%</div><div className="hero-stat-label">Aman & Terenkripsi</div></div>
              <div><div className="hero-stat-num">24/7</div><div className="hero-stat-label">Bisa Diakses</div></div>
            </>
          ) : (
            <>
              <div><div className="hero-stat-num">{listData.length}</div><div className="hero-stat-label">Total Pengajuan</div></div>
              <div><div className="hero-stat-num">{listData.filter(d => d.status === 'Selesai').length}</div><div className="hero-stat-label">Selesai</div></div>
              <div><div className="hero-stat-num">{listData.filter(d => d.status !== 'Selesai').length}</div><div className="hero-stat-label">Pending</div></div>
            </>
          )}
        </div>
      </div>

      {/* MAIN */}
      <main className="main">
        {view === 'user' ? (
          <>
            {/* SUCCESS ALERT */}
            {successData && (
              <div className="alert alert-success">
                <span className="alert-icon">✅</span>
                <div>
                  <div className="alert-title">Pengajuan berhasil dikirim!</div>
                  <div>Simpan ID Tracking berikut untuk memantau status surat Anda:</div>
                  <span className="id-highlight"># {successData.id}</span>
                </div>
              </div>
            )}

            {/* FORM CARD */}
            <div className="card">
              <div className="card-header">
                <div className="card-icon">📄</div>
                <div>
                  <div className="card-title">Form Pengajuan Surat Domisili</div>
                  <div className="card-subtitle">Lengkapi semua kolom yang wajib diisi</div>
                </div>
              </div>
              <div className="card-body">
                <form onSubmit={handleUpload}>
                  <div className="form-group">
                    <label className="form-label">Nama Lengkap <span>*</span></label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Masukkan nama lengkap sesuai KTP"
                      value={nama}
                      onChange={e => setNama(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Upload KTP / Dokumen Pendukung <span>*</span></label>
                    <div className={`file-upload-area ${file ? 'has-file' : ''}`}>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={e => setFile(e.target.files[0])}
                        required={!file}
                      />
                      <div className="file-upload-icon">{file ? '✅' : '📁'}</div>
                      <div className="file-upload-text">
                        {file ? 'File dipilih' : 'Klik atau seret file ke sini'}
                      </div>
                      <div className="file-upload-sub">
                        {file ? '' : 'Format: JPG, PNG, PDF — Maks. 5MB'}
                      </div>
                      {file && <div className="file-name-tag">📎 {file.name}</div>}
                    </div>
                  </div>

                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? <><span className="spinner" /> Mengirim...</> : <> 📨 &nbsp;Kirim Pengajuan</>}
                  </button>
                </form>
              </div>
            </div>

            {/* TRACKING CARD */}
            <div className="card">
              <div className="card-header">
                <div className="card-icon">🔍</div>
                <div>
                  <div className="card-title">Cek Status Layanan</div>
                  <div className="card-subtitle">Masukkan ID tracking yang Anda terima</div>
                </div>
              </div>
              <div className="card-body">
                <div className="search-row">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Contoh: 5115"
                    value={trackId}
                    onChange={e => { setTrackId(e.target.value); setTrackError(''); setTrackResult(null); }}
                    onKeyDown={e => e.key === 'Enter' && handleTrack()}
                  />
                  <button className="btn-primary" onClick={handleTrack} style={{ whiteSpace: 'nowrap' }}>
                    🔍 &nbsp;Cari
                  </button>
                </div>

                {trackError && (
                  <div style={{ marginTop: 14, color: '#e63946', fontSize: 13, fontWeight: 600 }}>
                    ⚠️ {trackError}
                  </div>
                )}

                {trackResult && (
                  <div className="track-result">
                    <div className="track-result-row">
                      <span className="track-label">ID Tracking</span>
                      <span className="track-value" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 18, color: 'var(--green-mid)' }}>#{trackResult.id}</span>
                    </div>
                    <div className="track-result-row">
                      <span className="track-label">Nama Pemohon</span>
                      <span className="track-value">{trackResult.nama}</span>
                    </div>
                    <div className="track-result-row">
                      <span className="track-label">Jenis Layanan</span>
                      <span className="track-value">{trackResult.tipe}</span>
                    </div>
                    <div className="track-result-row">
                      <span className="track-label">Tanggal</span>
                      <span className="track-value">{trackResult.tanggal}</span>
                    </div>
                    <div className="track-result-row" style={{ marginBottom: 0 }}>
                      <span className="track-label">Status</span>
                      <span className={`badge ${trackResult.status === 'Selesai' ? 'badge-selesai' : 'badge-pending'}`}>
                        <span className="badge-dot" />
                        {trackResult.status}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          /* ADMIN VIEW */
          <div className="card">
            <div className="card-header">
              <div className="card-icon">⚙️</div>
              <div style={{ flex: 1 }}>
                <div className="card-title">Daftar Pengajuan Masuk</div>
                <div className="card-subtitle">Kelola dan verifikasi pengajuan warga</div>
              </div>
              <button className="btn-secondary" onClick={fetchAdminData}>
                🔄 &nbsp;Refresh
              </button>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>ID Tracking</th>
                      <th>Nama Pemohon</th>
                      <th>Jenis Layanan</th>
                      <th>Tanggal</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listData.length > 0 ? listData.map(d => (
                      <tr key={d.id}>
                        <td><span className="td-id">#{d.id}</span></td>
                        <td><span className="td-name">{d.nama}</span></td>
                        <td style={{ color: 'var(--text-mid)', fontSize: 13 }}>{d.tipe || 'Surat Domisili'}</td>
                        <td style={{ color: 'var(--text-light)', fontSize: 13 }}>{d.tanggal}</td>
                        <td>
                          <span className={`badge ${d.status === 'Selesai' ? 'badge-selesai' : 'badge-pending'}`}>
                            <span className="badge-dot" />
                            {d.status}
                          </span>
                        </td>
                        <td>
                          {d.status !== 'Selesai' && (
                            <button className="btn-approve" onClick={() => updateStatus(d.id)}>
                              ✅ Setujui
                            </button>
                          )}
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="6">
                          <div className="empty-state">
                            <div className="empty-state-icon">📭</div>
                            <div className="empty-state-text">Belum ada pengajuan masuk</div>
                            <div className="empty-state-sub">Data pengajuan dari warga akan muncul di sini</div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;