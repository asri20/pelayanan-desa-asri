const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql2/promise');
const { Storage } = require('@google-cloud/storage');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// 1. Konfigurasi Database Cloud SQL [cite: 37, 48, 56]
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
};

// 2. Konfigurasi Google Cloud Storage (Padanan Amazon S3) [cite: 38, 46, 57]
const storageGCS = new Storage({
    projectId: process.env.GCS_PROJECT_ID
});
const bucket = storageGCS.bucket(process.env.GCS_BUCKET_NAME);

// Multer memory storage agar file langsung diteruskan ke Cloud Storage
const upload = multer({ storage: multer.memoryStorage() });

// --- API ROUTES ---

// API 1: Pengajuan Baru (Simpan ke Cloud SQL & Upload ke GCS) [cite: 25, 43, 46]
app.post('/api/pengajuan', upload.single('dokumen'), async (req, res) => {
    try {
        let fileNameGCS = null;

        // Upload ke Cloud Storage jika ada file 
        if (req.file) {
            fileNameGCS = `DOC-${Date.now()}-${req.file.originalname}`;
            const blob = bucket.file(fileNameGCS);
            const blobStream = blob.createWriteStream();

            blobStream.end(req.file.buffer);
            // Catatan: Di produksi, akses file nanti melalui Cloud CDN [cite: 49, 58, 64]
        }

        // Simpan data ke Cloud SQL [cite: 37, 48]
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

// API 2: Tracking Status (Ambil dari Cloud SQL) [cite: 27]
app.get('/api/track/:id', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM pelayanan WHERE id = ?', [req.params.id]);
        await connection.end();

        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: "Data tidak ditemukan" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error koneksi database" });
    }
});

// API 3: List Data Admin [cite: 31]
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

// API 4: Update Status (Untuk tombol Setujui)
app.patch('/api/admin/update/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(
            'UPDATE pelayanan SET status = ? WHERE id = ?',
            [status, req.params.id]
        );
        await connection.end();
        res.json({ message: "Status berhasil diperbarui" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Gagal update status" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server cloud running on port ${PORT}`));