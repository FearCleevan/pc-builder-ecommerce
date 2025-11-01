import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  LinearProgress,
  Chip,
  Button
} from '@mui/material';
import {
  TrendingUp,
  ShoppingCart,
  People,
  Inventory,
  Notifications,
  CalendarToday,
  AccessTime,
  Warning,
  CheckCircle,
  MonetizationOn,
  Settings
} from '@mui/icons-material';
import { LineChart, PieChart } from '@mui/x-charts';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import styles from './MainPage.module.css';

const MainPage = ({ activeMenu }) => {
  // Sample data
  const revenueData = {
    data: [2400, 1398, 9800, 3908, 4800, 3800, 4300, 5200, 6000, 7500, 8200, 9000],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };

  const categoryData = [
    { id: 0, value: 35, label: 'Electronics' },
    { id: 1, value: 25, label: 'Clothing' },
    { id: 2, value: 20, label: 'Home & Garden' },
    { id: 3, value: 15, label: 'Sports' },
    { id: 4, value: 5, label: 'Others' }
  ];

  const recentActivities = [
    { id: 1, action: 'New order received', user: 'John Doe', time: '2 min ago', type: 'order' },
    { id: 2, action: 'Product added', user: 'Sarah Wilson', time: '5 min ago', type: 'product' },
    { id: 3, action: 'User registered', user: 'Mike Johnson', time: '10 min ago', type: 'user' },
    { id: 4, action: 'Payment processed', user: 'System', time: '15 min ago', type: 'payment' },
    { id: 5, action: 'Inventory updated', user: 'Admin', time: '20 min ago', type: 'inventory' }
  ];

  const notifications = [
    { id: 1, message: 'Low stock alert for Product XYZ', type: 'warning', time: '1 hour ago' },
    { id: 2, message: 'New user registration requires approval', type: 'info', time: '2 hours ago' },
    { id: 3, message: 'System backup completed successfully', type: 'success', time: '3 hours ago' },
    { id: 4, message: 'Scheduled maintenance tonight', type: 'warning', time: '5 hours ago' }
  ];

  const quickStats = [
    { icon: <MonetizationOn />, title: 'Revenue', value: '$24,580', change: '+12%', color: '#4CAF50' },
    { icon: <ShoppingCart />, title: 'Orders', value: '1,248', change: '+8%', color: '#2196F3' },
    { icon: <People />, title: 'Customers', value: '8,452', change: '+15%', color: '#FF9800' },
    { icon: <Inventory />, title: 'Products', value: '356', change: '+5%', color: '#9C27B0' }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'order': return <ShoppingCart color="primary" />;
      case 'product': return <Inventory color="secondary" />;
      case 'user': return <People color="success" />;
      case 'payment': return <MonetizationOn color="warning" />;
      case 'inventory': return <Warning color="error" />;
      default: return <AccessTime color="action" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'warning': return 'warning';
      case 'success': return 'success';
      case 'info': return 'info';
      default: return 'default';
    }
  };

  const getPageContent = () => {
    if (!activeMenu || activeMenu === 'DASHBOARD') {
      return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
          {/* Quick Stats */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {quickStats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    borderRadius: 3,
                    boxShadow: 3
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', mr: 2 }}>
                        {stat.icon}
                      </Avatar>
                      <Typography variant="h6" component="div">
                        {stat.title}
                      </Typography>
                    </Box>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Chip 
                      label={stat.change} 
                      size="small" 
                      sx={{ 
                        bgcolor: 'rgba(255,255,255,0.3)', 
                        color: 'white',
                        fontWeight: 'bold'
                      }} 
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Charts Row */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Revenue Chart */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp sx={{ mr: 1 }} />
                  Revenue Analytics
                </Typography>
                <Box sx={{ height: 300 }}>
                  <LineChart
                    series={[
                      {
                        data: revenueData.data,
                        area: true,
                        color: '#ff2c2c'
                      }
                    ]}
                    xAxis={[{ scaleType: 'point', data: revenueData.labels }]}
                    sx={{
                      '.MuiLineElement-root': {
                        strokeWidth: 2,
                      },
                      '.MuiAreaElement-root': {
                        fill: 'url(#gradient)',
                      }
                    }}
                  >
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ff2c2c" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#ff2c2c" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </Box>
              </Paper>
            </Grid>

            {/* Category Distribution */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Category Distribution
                </Typography>
                <Box sx={{ height: 300 }}>
                  <PieChart
                    series={[
                      {
                        data: categoryData,
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 2,
                        cornerRadius: 5,
                      }
                    ]}
                    slotProps={{
                      legend: {
                        direction: 'row',
                        position: { vertical: 'bottom', horizontal: 'middle' },
                        padding: 0,
                      },
                    }}
                    height={300}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Bottom Row - Activities, Notifications, Calendar */}
          <Grid container spacing={3}>
            {/* Recent Activities */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTime sx={{ mr: 1 }} />
                  Recent Activities
                </Typography>
                <List dense>
                  {recentActivities.map((activity) => (
                    <ListItem key={activity.id} sx={{ px: 0 }}>
                      <ListItemIcon>
                        {getActivityIcon(activity.type)}
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.action}
                        secondary={`${activity.user} • ${activity.time}`}
                      />
                    </ListItem>
                  ))}
                </List>
                <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
                  View All Activities
                </Button>
              </Paper>
            </Grid>

            {/* Notifications */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <Notifications sx={{ mr: 1 }} />
                  System Notifications
                </Typography>
                <List dense>
                  {notifications.map((notification) => (
                    <ListItem key={notification.id} sx={{ px: 0 }}>
                      <ListItemIcon>
                        {notification.type === 'success' ? 
                          <CheckCircle color="success" /> : 
                          <Warning color="warning" />
                        }
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2">{notification.message}</Typography>
                            <Chip 
                              label={notification.type} 
                              size="small" 
                              color={getNotificationColor(notification.type)}
                              variant="outlined"
                            />
                          </Box>
                        }
                        secondary={notification.time}
                      />
                    </ListItem>
                  ))}
                </List>
                <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
                  Manage Notifications
                </Button>
              </Paper>
            </Grid>

            {/* Calendar */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarToday sx={{ mr: 1 }} />
                  Calendar
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateCalendar 
                    sx={{ 
                      width: '100%',
                      '& .MuiPickersDay-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </LocalizationProvider>
                <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Upcoming Events
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Team Meeting - Tomorrow 2:00 PM
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Product Launch - Next Week
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Performance Metrics */}
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom>
                  System Performance
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" gutterBottom>CPU Usage</Typography>
                  <LinearProgress variant="determinate" value={65} sx={{ height: 8, borderRadius: 4 }} />
                  <Typography variant="caption" color="text.secondary">65%</Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" gutterBottom>Memory Usage</Typography>
                  <LinearProgress variant="determinate" value={45} sx={{ height: 8, borderRadius: 4 }} />
                  <Typography variant="caption" color="text.secondary">45%</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" gutterBottom>Storage</Typography>
                  <LinearProgress variant="determinate" value={78} sx={{ height: 8, borderRadius: 4 }} />
                  <Typography variant="caption" color="text.secondary">78% - 1.2TB of 1.5TB</Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button fullWidth variant="contained" sx={{ mb: 2 }} startIcon={<Inventory />}>
                      Add Product
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button fullWidth variant="outlined" sx={{ mb: 2 }} startIcon={<ShoppingCart />}>
                      View Orders
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button fullWidth variant="outlined" sx={{ mb: 2 }} startIcon={<People />}>
                      Manage Users
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button fullWidth variant="outlined" sx={{ mb: 2 }} startIcon={<Settings />}>
                      Settings
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      );
    }

    return (
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h4" gutterBottom>
            {activeMenu}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            This is the {activeMenu.toLowerCase()} page. Content will be implemented based on the selected menu.
          </Typography>
          <Box 
            sx={{ 
              textAlign: 'center', 
              py: 8, 
              bgcolor: 'grey.50', 
              borderRadius: 2,
              border: '2px dashed',
              borderColor: 'grey.300'
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              🚀 Feature coming soon!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This section is ready for implementation of {activeMenu} functionality.
            </Typography>
          </Box>
        </Paper>
      </Box>
    );
  };

  return (
    <main className={styles.main}>
      <div className={styles.pageHeader}>
        <Typography variant="h4" component="h1" gutterBottom>
          {!activeMenu || activeMenu === 'DASHBOARD' ? 'Dashboard Overview' : activeMenu}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {!activeMenu || activeMenu === 'DASHBOARD' ? 'Welcome to your admin dashboard' : `Managing ${activeMenu.toLowerCase()}`}
        </Typography>
      </div>
      {getPageContent()}
    </main>
  );
};

export default MainPage;