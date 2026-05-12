const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Simulasi Database (Nanti dihubungkan ke Google Cloud SQL / RDS) 
let dataPelayanan = []; 

// Konfigurasi Multer (Persiapan fitur Upload File ke S3/GCS) [cite: 46, 57]
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, 'DOC-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// API 1: Pengajuan Baru (Wajib ada fitur upload) [cite: 46]
app.post('/api/pengajuan', upload.single('dokumen'), (req, res) => {
    const baru = {
        id: Math.floor(1000 + Math.random() * 9000), // Random ID untuk Tracking [cite: 27]
        nama: req.body.nama,
        tipe: req.body.tipe || 'Surat Domisili',
        status: 'Pending',
        file: req.file ? req.file.filename : null, // Nama file untuk akses via CDN/CloudFront [cite: 49, 58]
        tanggal: new Date().toLocaleDateString('id-ID'), // Format tanggal Indonesia
    };
    dataPelayanan.push(baru);
    res.json({ message: "Berhasil", id: baru.id });
});

// API 2: Tracking Spesifik (Optimasi agar tidak tarik semua data) [cite: 27]
app.get('/api/track/:id', (req, res) => {
    const { id } = req.params;
    const hasil = dataPelayanan.find(d => String(d.id) === id);
    if (hasil) {
        res.json(hasil);
    } else {
        res.status(404).json({ message: "ID Tracking tidak ditemukan" });
    }
});

// API 3: List Data Admin [cite: 31]
app.get('/api/admin/data', (req, res) => {
    res.json(dataPelayanan);
});

// API 4: Update Status oleh Admin [cite: 105]
app.patch('/api/admin/update/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    dataPelayanan = dataPelayanan.map(d => d.id == id ? { ...d, status } : d);
    res.json({ message: "Status diperbarui" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));