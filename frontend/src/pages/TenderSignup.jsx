// src/pages/TenderSignup.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TenderSignup = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen min-h-screen  bg-blue-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Tender Publisher Sign Up</h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="Full name"
              className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Email address"
              className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Government Proof <span className="text-gray-500 text-xs">(Aadhar, Voter ID, etc.)</span>
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-6 text-sm">
          <p>
            Already have an account?{" "}
            <button
              onClick={() => navigate('/tender-login')}
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </button>
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-blue-500 hover:underline block"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenderSignup;
