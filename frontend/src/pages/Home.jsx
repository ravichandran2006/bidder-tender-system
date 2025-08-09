import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  // CSS styles as JavaScript objects
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '20px',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      textAlign: 'center'
    },
    title: {
      color: '#2563eb',
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
      animation: 'fadeIn 0.5s ease-in-out'
    },
    subtitle: {
      color: '#666',
      fontSize: '1.1rem',
      marginBottom: '3rem',
      maxWidth: '600px',
      lineHeight: '1.6'
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      '@media (min-width: 640px)': {
        flexDirection: 'row'
      }
    },
    tenderButton: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      border: 'none',
      transition: 'background-color 0.3s',
      minWidth: '200px',
      ':hover': {
        backgroundColor: '#1d4ed8'
      }
    },
    bidderButton: {
      backgroundColor: '#059669',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      border: 'none',
      transition: 'background-color 0.3s',
      minWidth: '200px',
      ':hover': {
        backgroundColor: '#047857'
      }
    },
    // Keyframes for animations
    keyframes: `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `
  };

  return (
    <>
      <style>{styles.keyframes}</style>
      <div style={styles.container}>
        <h1 style={styles.title}>Bidder-Tender Management System</h1>
        <p style={styles.subtitle}>
          Choose your role to proceed with the tender process.
        </p>

        <div style={styles.buttonContainer}>
          <button
            onClick={() => navigate('/tender-login')}
            style={styles.tenderButton}
          >
            Tender Login
          </button>
          <button
            onClick={() => navigate('/bidder-login')}
            style={styles.bidderButton}
          >
            Bidder Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;