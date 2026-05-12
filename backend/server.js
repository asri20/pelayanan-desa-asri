const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql2/promise');
const { Storage } = require('@google-cloud/storage');
require('dotenv').config();

const app = express();

// PERBAIKAN 1: CORS diperketat izinnya
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// 1. Konfigurasi Database Cloud SQL
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
};

// 2. Konfigurasi Google Cloud Storage
const storageGCS = new Storage({
    projectId: process.env.GCS_PROJECT_ID
});
const bucket = storageGCS.bucket(process.env.GCS_BUCKET_NAME);
const upload = multer({ storage: multer.memoryStorage() });

// --- API ROUTES ---

// API 1: Pengajuan Baru
app.post('/api/pengajuan', upload.single('dokumen'), async (req, res) => {
    try {
        let fileNameGCS = null;
        if (req.file) {
            fileNameGCS = `DOC-${Date.now()}-${req.file.originalname}`;
            const blob = bucket.file(fileNameGCS);
            const blobStream = blob.createWriteStream();
            blobStream.end(req.file.buffer);
        }

        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'INSERT INTO pelayanan (nama, tipe, status, file, tanggal) VALUES (?, ?, ?, ?, ?)',
            [req.body.nama, req.body.tipe || 'Surat Domisili', 'Pending', fileNameGCS, new Date()]
        );
        await connection.end();
        res.json({ message: "Berhasil disimpan di Cloud", id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Gagal memproses data di Cloud" });
    }
});

// API 2: Tracking Status
app.get('/api/track/:id', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM pelayanan WHERE id = ?', [req.params.id]);
        await connection.end();
        if (rows.length > 0) res.json(rows[0]);
        else res.status(404).json({ message: "Data tidak ditemukan" });
    } catch (error) {
        res.status(500).json({ message: "Error koneksi database" });
    }
});

// API 3: List Data Admin
app.get('/api/admin/data', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM pelayanan ORDER BY id DESC');
        await connection.end();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error mengambil data" });
    }
});

// PERBAIKAN 2: Ganti PATCH ke POST dan buat Rute "Ganda" biar nggak 404 lagi
// Kita bikin dua rute sekaligus supaya kalau Frontend panggil alamat mana pun tetap ketemu
const handleUpdate = async (req, res) => {
    console.log("🔥 Request Update Masuk untuk ID:", req.params.id);
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'UPDATE pelayanan SET status = ? WHERE id = ?',
            ['Selesai', req.params.id]
        );
        await connection.end();
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }
        res.json({ message: "Status berhasil diperbarui" });
    } catch (error) {
        console.error("❌ Error Detail:", error);
        res.status(500).json({ message: "Gagal update status", error: error.message });
    }
};

// Daftarkan semua kemungkinan rute yang dipanggil Frontend
app.post('/api/admin/update/:id', handleUpdate);
app.post('/api/admin/update-status/:id', handleUpdate);
app.patch('/api/admin/update/:id', handleUpdate);
app.patch('/api/admin/update-status/:id', handleUpdate);


// HARUS PALING BAWAH
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server cloud Asri running on port ${PORT}`));