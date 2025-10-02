// server/routes/courseRoutes.js
const express = require('express');
const sql = require('mssql');
const dbConfig = require('../DbConfig');
const authMiddleware = require('../middleware/authMiddleware'); // Import "lính gác"

const router = express.Router();

// Áp dụng "lính gác" authMiddleware cho route này
// Chỉ những ai có token hợp lệ mới có thể truy cập
router.get('/', authMiddleware, async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT MaKhoaHoc, TenKhoaHoc, MoTa, TrinhDoCEFR FROM KhoaHoc WHERE KichHoat = 1');
        
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ.' });
    }
});

module.exports = router;