// client/src/pages/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        TenDangNhap: '',
        Email: '',
        MatKhau: '',
        HoTen: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', formData);
            alert(response.data.message);
            navigate('/login');
        } catch (error) {
            alert(error.response?.data?.message || 'Đã có lỗi xảy ra');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Tạo tài khoản mới</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Họ tên:</label>
                        <input 
                            type="text" 
                            name="HoTen" 
                            onChange={handleChange} 
                            required 
                            placeholder="Nhập họ và tên đầy đủ"
                        />
                    </div>
                    <div className="input-group">
                        <label>Tên đăng nhập:</label>
                        <input 
                            type="text" 
                            name="TenDangNhap" 
                            onChange={handleChange} 
                            required 
                            placeholder="Nhập tên đăng nhập"
                        />
                    </div>
                    <div className="input-group">
                        <label>Email:</label>
                        <input 
                            type="email" 
                            name="Email" 
                            onChange={handleChange} 
                            required 
                            placeholder="Nhập địa chỉ email"
                        />
                    </div>
                    <div className="input-group">
                        <label>Mật khẩu:</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="MatKhau"
                                onChange={handleChange}
                                required
                                placeholder="Nhập mật khẩu"
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? 'Ẩn' : 'Hiện'}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="register-button" disabled={isLoading}>
                        {isLoading ? 'Đang đăng ký...' : 'Đăng ký tài khoản'}
                    </button>
                </form>
                <p className="login-link">
                    Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;