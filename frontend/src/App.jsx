import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import TenderLogin from './pages/TenderLogin';
import TenderSignup from './pages/TenderSignup';
import BidderLogin from './pages/BidderLogin';
import Dashboard from './pages/Dashboard'; // New import
import './App.css'; // Assuming you have some global styles

// Simple route protector (checks localStorage)
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('tenderUser');
  return user ? children : <Navigate to="/tender-login" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/tender-login" element={<TenderLogin />} />
        <Route path="/tender-signup" element={<TenderSignup />} />
        <Route path="/bidder-login" element={<BidderLogin />} />

        {/* Protected Routes (require login) */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* Optional: Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;