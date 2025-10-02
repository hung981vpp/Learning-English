// client/src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        // Nếu không có token, chuyển hướng về trang đăng nhập
        return <Navigate to="/login" />;
    }

    // Nếu có token, cho phép truy cập vào trang
    return children;
};

export default ProtectedRoute;