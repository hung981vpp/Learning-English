// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import auth routes
const courseRoutes = require('./routes/courseRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Sử dụng routes
app.use('/api/auth', authRoutes); // Gắn route vào đường dẫn /api/auth
app.use('/api/courses', courseRoutes); // Gắn route vào đường dẫn /api/courses

app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});