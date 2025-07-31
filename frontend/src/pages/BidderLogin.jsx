// src/pages/BidderLogin.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BidderLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen min-h-screen  flex flex-col items-center justify-center bg-green-50 px-4">
      <h2 className="text-3xl font-semibold text-green-800 mb-6">Bidder Login</h2>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input type="email" placeholder="Enter email" className="w-full border rounded px-3 py-2 text-black" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input type="password" placeholder="Enter password" className="w-full border rounded px-3 py-2 text-black" />
        </div>
        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
          Login
        </button>
      </form>
      <button onClick={() => navigate('/')} className="mt-6 text-sm text-green-500 underline">
        Back to Home
      </button>
    </div>
  );
};

export default BidderLogin;
