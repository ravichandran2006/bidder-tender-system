// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TenderLogin from './pages/TenderLogin';
import TenderSignup from './pages/TenderSignup';
import BidderLogin from './pages/BidderLogin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tender-login" element={<TenderLogin />} />
        <Route path="/tender-signup" element={<TenderSignup />} />
        <Route path="/bidder-login" element={<BidderLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
