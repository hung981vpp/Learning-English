// server/routes/auth.js
const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbConfig = require('../DbConfig');

const router = express.Router();

// --- API ĐĂNG KÝ (Cập nhật theo CSDL mới) ---
router.post('/register', async (req, res) => {
    // Lấy thêm thông tin từ request body
    const { TenDangNhap, Email, MatKhau, HoTen } = req.body;

    // 1. Kiểm tra dữ liệu đầu vào
    if (!TenDangNhap || !Email || !MatKhau || !HoTen) {
        return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin: Tên đăng nhập, Email, Mật khẩu, Họ tên.' });
    }

    try {
        // 2. Băm mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(MatKhau, salt);

        // 3. Kết nối CSDL và thêm người dùng mới vào bảng NguoiDung
        let pool = await sql.connect(dbConfig);
        await pool.request()
            .input('TenDangNhap', sql.NVarChar, TenDangNhap)
            .input('Email', sql.NVarChar, Email)
            .input('MatKhau', sql.NVarChar, hashedPassword) // Lưu mật khẩu đã băm
            .input('HoTen', sql.NVarChar, HoTen)
            // Gán MaVaiTro = 1 (Học viên) mặc định khi đăng ký
            .input('MaVaiTro', sql.Int, 1) 
            .query(`INSERT INTO NguoiDung (TenDangNhap, Email, MatKhau, HoTen, MaVaiTro) 
                    VALUES (@TenDangNhap, @Email, @MatKhau, @HoTen, @MaVaiTro)`);

        res.status(201).json({ message: 'Đăng ký tài khoản thành công!' });

    } catch (err) {
        // Kiểm tra lỗi trùng lặp (UNIQUE constraint)
        if (err.number === 2627) {
            // Phân tích thông báo lỗi để biết trường nào bị trùng
            if (err.message.includes('UQ__NguoiDung__Email')) {
                return res.status(409).json({ message: 'Email này đã tồn tại.' });
            }
            if (err.message.includes('UQ__NguoiDung__TenDangNhap')) {
                return res.status(409).json({ message: 'Tên đăng nhập này đã tồn tại.' });
            }
        }
        console.error(err);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ.' });
    }
});


// --- API ĐĂNG NHẬP (Cập nhật theo CSDL mới) ---
router.post('/login', async (req, res) => {
    // Người dùng có thể đăng nhập bằng Email hoặc Tên đăng nhập
    const { loginIdentifier, MatKhau } = req.body;

    if (!loginIdentifier || !MatKhau) {
        return res.status(400).json({ message: 'Vui lòng cung cấp thông tin đăng nhập và mật khẩu.' });
    }

    try {
        let pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('loginIdentifier', sql.NVarChar, loginIdentifier)
            // Truy vấn tìm người dùng bằng cả Email hoặc TenDangNhap
            .query('SELECT * FROM NguoiDung WHERE Email = @loginIdentifier OR TenDangNhap = @loginIdentifier');

        const user = result.recordset[0];
        if (!user) {
            return res.status(401).json({ message: 'Thông tin đăng nhập hoặc mật khẩu không chính xác.' });
        }

        const isMatch = await bcrypt.compare(MatKhau, user.MatKhau);
        if (!isMatch) {
            return res.status(401).json({ message: 'Thông tin đăng nhập hoặc mật khẩu không chính xác.' });
        }
        
        // Cập nhật thời gian đăng nhập gần nhất
        await pool.request()
            .input('MaNguoiDung', sql.Int, user.MaNguoiDung)
            .query('UPDATE NguoiDung SET LanDangNhapGanNhat = GETDATE() WHERE MaNguoiDung = @MaNguoiDung');

        const payload = {
            user: {
                id: user.MaNguoiDung,
                email: user.Email,
                hoTen: user.HoTen,
                vaiTro: user.MaVaiTro
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token });
            }
        );

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ.' });
    }
});

module.exports = router;