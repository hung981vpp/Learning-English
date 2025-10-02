// client/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import './App.css'; // Thêm file CSS tổng thể

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <div className="header-container">
            <h1 className="logo">EnglishMaster AI</h1>
            <nav className="nav-menu">
              <Link to="/" className="nav-link">Trang chủ</Link>
              <Link to="/login" className="nav-link">Đăng nhập</Link>
              <Link to="/register" className="nav-link">Đăng ký</Link>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </nav>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>

        <footer className="App-footer">
          <div className="footer-container">
            <p>&copy; 2024 EnglishMaster AI. Tất cả quyền được bảo lưu.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;