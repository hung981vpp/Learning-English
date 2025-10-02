/**
 * Project: Online English Learning Website with AI
 * File: DashboardPage.js
 * Description: Trang Dashboard - quản lý các khóa học của người dùng, hiển thị thông tin cá nhân và thao tác chính.
 * Author: Đàm Hưng
 * Copyright: (c) 2025 Đàm Hưng, Group 6
 * License: MIT
 * Version: 1.0.0
 */
// client/src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DashboardPage.css';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const config = {
                    headers: { 'Authorization': `Bearer ${token}` }
                };

                // Fetch courses
                const coursesResponse = await axios.get('http://localhost:5000/api/courses', config);
                setCourses(coursesResponse.data);

                // Fetch user info (giả sử có API này)
                // const userResponse = await axios.get('http://localhost:5000/api/auth/me', config);
                // setUser(userResponse.data);

            } catch (error) {
                console.error('Lỗi khi tải dữ liệu:', error);
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('Bạn đã đăng xuất thành công.');
        navigate('/');
    };

    if (isLoading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner"></div>
                <p>Đang tải dữ liệu...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="welcome-section">
                    <h2>Chào mừng trở lại!</h2>
                    <p>Bắt đầu học tập ngay hôm nay</p>
                </div>
                <button onClick={handleLogout} className="logout-btn">
                    Đăng xuất
                </button>
            </div>

            <div className="courses-section">
                <h3>Khóa học của bạn</h3>
                <div className="courses-grid">
                    {courses.length > 0 ? (
                        courses.map(course => (
                            <div key={course.MaKhoaHoc} className="course-card">
                                <div className="course-level">{course.TrinhDoCEFR}</div>
                                <h4>{course.TenKhoaHoc}</h4>
                                <p>{course.MoTa}</p>
                                <button className="start-course-btn">
                                    Bắt đầu học
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="no-courses">
                            <p>Chưa có khóa học nào. Hãy đăng ký khóa học đầu tiên!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default DashboardPage;

