import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // CSS styles as JavaScript objects
  const styles = {
    dashboard: {
      width: '100vw',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      overflowX: 'hidden',
    },
    nav: {
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '0 20px',
      width: '100%',
    },
    navContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '60px',
    },
    logo: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: '#2563eb',
    },
    navRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    },
    userProfile: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    avatar: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      backgroundColor: '#2563eb',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '500',
    },
    logoutBtn: {
      background: 'none',
      border: 'none',
      color: '#4b5563',
      cursor: 'pointer',
      fontWeight: '500',
      '&:hover': {
        color: '#1e40af',
      },
    },
    main: {
      maxWidth: '1200px',
      margin: '20px auto',
      padding: '0 20px',
      width: '100%',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '24px',
      minHeight: '400px',
      width: '100%',
    },
    title: {
      fontSize: '1.5rem',
      marginBottom: '8px',
      color: '#111827',
    },
    subtitle: {
      color: '#6b7280',
      marginBottom: '20px',
    },
    content: {
      borderTop: '1px solid #e5e7eb',
      paddingTop: '16px',
    },
    loadingScreen: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '1.2rem',
      width: '100%',
    },
    comingSoon: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '300px',
      fontSize: '1.5rem',
      color: '#6b7280',
    },
  };

  useEffect(() => {
    const fetchUserData = () => {
      try {
        const userData = localStorage.getItem('tenderUser');
        if (!userData) {
          navigate('/tender-login');
        } else {
          const parsedUser = JSON.parse(userData);
          if (!parsedUser.name) {
            parsedUser.name = 'User';
          }
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        navigate('/tender-login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('tenderUser');
    navigate('/tender-login');
  };

  if (loading) {
    return <div style={styles.loadingScreen}>Loading...</div>;
  }

  return (
    <div style={styles.dashboard}>
      <nav style={styles.nav}>
        <div style={styles.navContainer}>
          <span style={styles.logo}>Bidder Tender Application</span>
          <div style={styles.navRight}>
            <div style={styles.userProfile}>
              <div style={styles.avatar}>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span>{user?.name || 'User'}</span>
            </div>
            <button 
              onClick={handleLogout} 
              style={styles.logoutBtn}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main style={styles.main}>
        <div style={styles.card}>
          <h1 style={styles.title}>Welcome, {user?.name || 'User'}</h1>
          <p style={styles.subtitle}>Your tender dashboard</p>
          <div style={styles.content}>
            <div style={styles.comingSoon}>
              Dashboard content coming soon. Check back later for updates!
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;