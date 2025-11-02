import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Header from '../Header/Header';
import LeftSideBar from '../LeftSideBar/LeftSideBar';
import MainPage from '../MainPage/MainPage';
import styles from './DashboardPanel.module.css';

// Create MUI theme to match your design
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff2c2c',
    },
    secondary: {
      main: '#ff6600',
    },
    background: {
      default: '#f8f9fa',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      color: '#2c3e50',
    },
    h6: {
      fontWeight: 600,
      color: '#2c3e50',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          background: 'linear-gradient(90deg, #ff2c2c, #ff6600)',
          fontWeight: 600,
          textTransform: 'none',
          borderRadius: '8px',
        },
        outlined: {
          borderColor: '#ff2c2c',
          color: '#ff2c2c',
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 600,
          '&:hover': {
            backgroundColor: 'rgba(255, 44, 44, 0.04)',
            borderColor: '#ff5252',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
  },
});

const DashboardPanel = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('DASHBOARD');
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices and adjust sidebar accordingly
  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarCollapsed(true);
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
    // Auto-close sidebar on mobile after menu selection
    if (isMobile) {
      setIsSidebarCollapsed(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.dashboard}>
        <Header 
          onToggleSidebar={toggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <div className={styles.dashboardBody}>
          <LeftSideBar 
            isCollapsed={isSidebarCollapsed}
            onMenuClick={handleMenuClick}
            isMobile={isMobile}
          />
          {/* Overlay for mobile when sidebar is open */}
          {!isSidebarCollapsed && isMobile && (
            <div 
              className={styles.overlay}
              onClick={() => setIsSidebarCollapsed(true)}
            />
          )}
          <MainPage activeMenu={activeMenu} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default DashboardPanel;