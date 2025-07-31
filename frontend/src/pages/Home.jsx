// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-4xl font-bold mb-8 text-blue-700">Bidder-Tender Management System</h1>
      <p className="text-lg text-gray-700 mb-10 max-w-xl text-center">
        Choose your role to proceed with the tender process.
      </p>

      <div className="flex flex-col sm:flex-row gap-7">
        <button
          onClick={() => navigate('/tender-login')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Tender Login
        </button>
        <button
          onClick={() => navigate('/bidder-login')}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Bidder Login
        </button>
      </div>
    </div>
  );
};

export default Home;
