import React from 'react';
import { useNavigate } from 'react-router-dom';

const TenderLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen min-h-screen  bg-blue-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Tender Publisher Login
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6 text-sm">
          <p>
            Don’t have an account?{' '}
            <button
              onClick={() => navigate('/tender-signup')}
              className="text-blue-600 font-medium hover:underline"
            >
              Sign Up
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

export default TenderLogin;
