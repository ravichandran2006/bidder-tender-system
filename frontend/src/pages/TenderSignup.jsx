import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TenderSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    proof: null
  });

  const handleChange = (e) => {
    if (e.target.name === 'proof') {
      setFormData({ ...formData, proof: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('proof', formData.proof);

    try {
      const res = await axios.post('http://localhost:5000/api/tender/signup', data);
      alert(res.data.message);
      navigate('/tender-login');
    } catch (err) {
      alert('Signup failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-blue-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Tender Publisher Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Government Proof <span className="text-gray-500 text-xs">(Aadhar, Voter ID, etc.)</span>
            </label>
            <input
              type="file"
              name="proof"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
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
            Already have an account?{' '}
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