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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // CSS styles as JavaScript objects
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '20px',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '500px',
      padding: '2rem',
      animation: 'fadeIn 0.5s ease-in-out'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    headerTitle: {
      color: '#2563eb',
      fontSize: '1.8rem',
      marginBottom: '0.5rem'
    },
    headerSubtitle: {
      color: '#666',
      fontSize: '0.9rem'
    },
    errorMessage: {
      color: '#ef4444',
      backgroundColor: '#fee2e2',
      padding: '0.75rem',
      borderRadius: '5px',
      marginBottom: '1.5rem',
      fontSize: '0.9rem',
      textAlign: 'center',
      animation: 'shake 0.5s'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    label: {
      fontSize: '0.9rem',
      color: '#333',
      fontWeight: '500'
    },
    labelHint: {
      color: '#666',
      fontSize: '0.8rem',
      fontWeight: 'normal'
    },
    input: {
      padding: '0.75rem',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '1rem',
      transition: 'border-color 0.3s, box-shadow 0.3s',
      color: 'black', // Explicit black color
      backgroundColor: 'white', // Explicit white background
      caretColor: '#2563eb' // Blue cursor
    },
    inputFocus: {
      outline: 'none',
      borderColor: '#2563eb',
      boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.2)',
      color: 'black',
      backgroundColor: 'white'
    },
    fileUploadWrapper: {
      position: 'relative',
      overflow: 'hidden'
    },
    fileInput: {
      position: 'absolute',
      left: '0',
      top: '0',
      opacity: '0',
      width: '100%',
      height: '100%',
      cursor: 'pointer'
    },
    fileUploadLabel: {
      display: 'block',
      padding: '0.75rem',
      border: '1px dashed #ddd',
      borderRadius: '5px',
      textAlign: 'center',
      color: '#666',
      fontSize: '0.9rem',
      transition: 'all 0.3s'
    },
    fileUploadLabelHover: {
      borderColor: '#2563eb',
      color: '#2563eb'
    },
    submitBtn: {
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      padding: '0.75rem',
      borderRadius: '5px',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '45px'
    },
    submitBtnHover: {
      backgroundColor: '#1d4ed8'
    },
    submitBtnDisabled: {
      backgroundColor: '#93c5fd',
      cursor: 'not-allowed'
    },
    spinner: {
      width: '20px',
      height: '20px',
      border: '3px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '50%',
      borderTopColor: 'white',
      animation: 'spin 1s ease-in-out infinite'
    },
    footer: {
      textAlign: 'center',
      marginTop: '1.5rem',
      fontSize: '0.9rem',
      color: '#666'
    },
    linkBtn: {
      background: 'none',
      border: 'none',
      color: '#2563eb',
      cursor: 'pointer',
      fontWeight: '500',
      padding: '0'
    },
    backBtn: {
      background: 'none',
      border: 'none',
      color: '#2563eb',
      cursor: 'pointer',
      marginTop: '1rem',
      fontSize: '0.9rem'
    }
  };

  // Keyframes for animations
  const keyframes = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-5px); }
      40%, 80% { transform: translateX(5px); }
    }
    input::placeholder {
      color: #999999;
      opacity: 1;
    }
    input {
      color: black !important;
    }
  `;

  const handleChange = (e) => {
    if (e.target.name === 'proof') {
      setFormData({ ...formData, proof: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
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
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.header}>
            <h2 style={styles.headerTitle}>Tender Publisher Sign Up</h2>
            <p style={styles.headerSubtitle}>Create your account to publish tenders</p>
          </div>

          {error && <div style={styles.errorMessage}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  color: 'black',
                  backgroundColor: 'white'
                }}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  color: 'black',
                  backgroundColor: 'white'
                }}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  color: 'black',
                  backgroundColor: 'white'
                }}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="proof">
                Government Proof <span style={styles.labelHint}>(Aadhar, Voter ID, etc.)</span>
              </label>
              <div style={styles.fileUploadWrapper}>
                <input
                  type="file"
                  id="proof"
                  name="proof"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleChange}
                  style={styles.fileInput}
                  required
                />
                <label 
                  htmlFor="proof" 
                  style={{
                    ...styles.fileUploadLabel,
                    ...(formData.proof ? styles.fileUploadLabelHover : {})
                  }}
                >
                  {formData.proof ? formData.proof.name : 'Choose a file...'}
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              style={{
                ...styles.submitBtn,
                ...(isSubmitting ? styles.submitBtnDisabled : {}),
                ...(!isSubmitting ? {':hover': styles.submitBtnHover} : {})
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span style={styles.spinner}></span>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <div style={styles.footer}>
            <p>
              Already have an account?{' '}
              <button 
                onClick={() => navigate('/tender-login')} 
                style={styles.linkBtn}
              >
                Login
              </button>
            </p>
            <button 
              onClick={() => navigate('/')} 
              style={styles.backBtn}
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TenderSignup;