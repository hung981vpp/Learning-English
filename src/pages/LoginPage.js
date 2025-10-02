// client/src/pages/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import file CSS mới

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        loginIdentifier: '',
        MatKhau: ''
    });
    // Thêm state cho việc hiện/ẩn mật khẩu và trạng thái loading
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Bắt đầu loading
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            const { token } = response.data;
            localStorage.setItem('token', token);
            alert('Đăng nhập thành công!');
            navigate('/dashboard');
        } catch (error) {
            alert(error.response.data.message);
        } finally {
            setIsLoading(false); // Kết thúc loading
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Đăng nhập</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Tên đăng nhập hoặc Email:</label>
                        <input type="text" name="loginIdentifier" onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Mật khẩu:</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="MatKhau"
                                onChange={handleChange}
                                required
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
                    <button type="submit" className="login-button" disabled={isLoading}>
                        {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;