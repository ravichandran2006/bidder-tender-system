import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BidderLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/bidder/login', { email, password });
      localStorage.setItem('bidderUser', JSON.stringify(res.data.user));
      navigate('/bidder-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

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
      color: '#059669',
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
    input: {
      padding: '0.75rem',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '1rem',
      transition: 'border-color 0.3s, box-shadow 0.3s',
      color: 'black', // Explicit black text
      backgroundColor: 'white', // Explicit white background
      caretColor: '#059669' // Green cursor
    },
    inputFocus: {
      outline: 'none',
      borderColor: '#059669',
      boxShadow: '0 0 0 2px rgba(5, 150, 105, 0.2)',
      color: 'black', // Maintain black text when focused
      backgroundColor: 'white'
    },
    submitBtn: {
      backgroundColor: '#059669',
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
      backgroundColor: '#047857'
    },
    submitBtnDisabled: {
      backgroundColor: '#a7f3d0',
      cursor: 'not-allowed'
    },
    spinner: {
      width: '20px',
      height: '20px',
      border: '3px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '50%',
      borderTopColor: 'white',
      animation: 'spin 1s ease-in-out infinite',
      marginRight: '8px'
    },
    footer: {
      textAlign: 'center',
      marginTop: '1.5rem',
      fontSize: '0.9rem',
      color: '#666'
    },
    backBtn: {
      background: 'none',
      border: 'none',
      color: '#059669',
      cursor: 'pointer',
      marginTop: '1rem',
      fontSize: '0.9rem'
    }
  };

  // Keyframes for animations with input text visibility fixes
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
    input {
      color: black !important;
      -webkit-text-fill-color: black !important;
      background-color: white !important;
    }
    input::placeholder {
      color: #999 !important;
      opacity: 1 !important;
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.header}>
            <h2 style={styles.headerTitle}>Bidder Login</h2>
            <p style={styles.headerSubtitle}>Access your account to participate in tenders</p>
          </div>

          {error && <div style={styles.errorMessage}>{error}</div>}

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{
                  ...styles.input,
                  color: 'black',
                  backgroundColor: 'white'
                }}
                required
              />
            </div>

            <button 
              type="submit" 
              style={{
                ...styles.submitBtn,
                ...(isLoading ? styles.submitBtnDisabled : {}),
                ...(!isLoading ? {':hover': styles.submitBtnHover} : {})
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span style={styles.spinner}></span>
                  Processing...
                </>
              ) : 'Login'}
            </button>
          </form>

          <div style={styles.footer}>
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

export default BidderLogin;