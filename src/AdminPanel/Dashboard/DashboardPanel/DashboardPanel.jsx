import React, { useState } from 'react';
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

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
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
          />
          <MainPage activeMenu={activeMenu} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default DashboardPanel;