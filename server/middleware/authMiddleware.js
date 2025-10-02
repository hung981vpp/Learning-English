// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Lấy token từ header của request
    const token = req.header('Authorization');

    // Kiểm tra nếu không có token
    if (!token) {
        return res.status(401).json({ message: 'Không có token, truy cập bị từ chối.' });
    }

    try {
        // Token thường có dạng "Bearer [token]", ta cần tách nó ra
        const tokenOnly = token.split(' ')[1];
        // Xác thực token
        const decoded = jwt.verify(tokenOnly, process.env.JWT_SECRET);
        
        // Lưu thông tin người dùng đã được giải mã vào request
        req.user = decoded.user;
        next(); // Cho phép request đi tiếp
    } catch (err) {
        res.status(401).json({ message: 'Token không hợp lệ.' });
    }
};