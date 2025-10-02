// client/src/pages/HomePage.js
import React from 'react';
import './HomePage.css'; // Import file CSS vừa tạo

const HomePage = () => {
    return (
        <div className="hero-container">
            <div className="hero-text">
                <h1>Chinh phục tiếng Anh hiệu quả với AI</h1>
                <p>
                    Học tiếng Anh thông minh với công nghệ AI tiên tiến, khóa học 
                    được thiết kế bởi chuyên gia và cộng đồng học tập sôi động. Bắt 
                    đầu hành trình của bạn ngay hôm nay!
                </p>
                <div className="cta-buttons">
                    <button className="btn-primary">Bắt đầu ngay - Miễn phí</button>
                    <button className="btn-secondary">Xem demo</button>
                </div>
            </div>
            <div className="hero-image">
                {/* Bạn có thể thay thế bằng ảnh của riêng mình */}
               <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80" alt="Học viên đang học online" />
               
            </div>
        </div>
    );
};

export default HomePage;