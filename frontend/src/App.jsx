import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import TenderLogin from './pages/TenderLogin';
import TenderSignup from './pages/TenderSignup';
import BidderLogin from './pages/BidderLogin';
import TenderForm from './pages/TenderForm.jsx';

const App = () => {
  return (
    <Router>
      {/* Simple navigation for demo purposes */}
      <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/tender-form" style={{ marginRight: '1rem' }}>Create Tender</Link>
        <Link to="/tender-login" style={{ marginRight: '1rem' }}>Tender Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tender-login" element={<TenderLogin />} />
        <Route path="/tender-signup" element={<TenderSignup />} />
        <Route path="/bidder-login" element={<BidderLogin />} />
        <Route path="/tender-form" element={<TenderForm />} /> {/* Directly accessible */}
      </Routes>
    </Router>
  );
};

export default App;