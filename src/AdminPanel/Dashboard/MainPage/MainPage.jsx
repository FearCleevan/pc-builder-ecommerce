import React from 'react';
import { 
  FiTrendingUp, 
  FiShoppingCart, 
  FiUsers, 
  FiPackage,
  FiBell,
  FiClock,
  FiCalendar,
  FiSettings,
  FiUserPlus,
  FiDollarSign,
  FiPieChart,
  FiActivity,
  FiPlus,
  FiEye,
  FiUser,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { 
  HiOutlineExclamation,
  HiOutlineCheckCircle,
  HiOutlineInformationCircle
} from 'react-icons/hi';
import styles from './MainPage.module.css';

const MainPage = ({ activeMenu }) => {
  // Sample data
  const revenueData = {
    data: [2400, 1398, 9800, 3908, 4800, 3800, 4300, 5200, 6000, 7500, 8200, 9000],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };

  const categoryData = [
    { id: 0, value: 35, label: 'Electronics', color: 'var(--primary-color)' },
    { id: 1, value: 25, label: 'Clothing', color: 'var(--accent-color-1)' },
    { id: 2, value: 20, label: 'Home & Garden', color: 'var(--accent-color-2)' },
    { id: 3, value: 15, label: 'Sports', color: 'var(--accent-color-3)' },
    { id: 4, value: 5, label: 'Others', color: 'var(--accent-color-4)' }
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
    { icon: <FiDollarSign />, title: 'Revenue', value: '$24,580', change: '+12%' },
    { icon: <FiShoppingCart />, title: 'Orders', value: '1,248', change: '+8%' },
    { icon: <FiUsers />, title: 'Customers', value: '8,452', change: '+15%' },
    { icon: <FiPackage />, title: 'Products', value: '356', change: '+5%' }
  ];

  const getActivityIcon = (type) => {
    const icons = {
      order: <FiShoppingCart />,
      product: <FiPackage />,
      user: <FiUserPlus />,
      payment: <FiDollarSign />,
      inventory: <FiActivity />
    };
    return icons[type] || <FiClock />;
  };

  const getNotificationIcon = (type) => {
    const icons = {
      warning: <HiOutlineExclamation />,
      success: <HiOutlineCheckCircle />,
      info: <HiOutlineInformationCircle />
    };
    return icons[type] || <HiOutlineInformationCircle />;
  };

  // Add the missing function
  const getNotificationColor = (type) => {
    const colors = {
      warning: styles.warning,
      success: styles.success,
      info: styles.info,
      default: styles.default
    };
    return colors[type] || colors.default;
  };

  // Simple line chart component
  const LineChart = ({ data, labels }) => {
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue;
    
    return (
      <div className={styles.lineChart}>
        <div className={styles.chartContainer}>
          {data.map((value, index) => {
            const height = ((value - minValue) / range) * 100;
            return (
              <div key={index} className={styles.barContainer}>
                <div 
                  className={styles.bar} 
                  style={{ height: `${height}%` }}
                  title={`${labels[index]}: $${value}`}
                >
                  <div className={styles.barValue}>${value}</div>
                </div>
                <span className={styles.barLabel}>{labels[index]}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Simple pie chart component
  const PieChart = ({ data }) => {
    let currentAngle = 0;
    
    return (
      <div className={styles.pieChart}>
        <div className={styles.pieContainer}>
          <svg viewBox="0 0 100 100" className={styles.pieSvg}>
            {data.map((slice, index) => {
              const angle = (slice.value / 100) * 360;
              const largeArc = angle > 180 ? 1 : 0;
              const x1 = 50 + 40 * Math.cos(currentAngle * Math.PI / 180);
              const y1 = 50 + 40 * Math.sin(currentAngle * Math.PI / 180);
              const x2 = 50 + 40 * Math.cos((currentAngle + angle) * Math.PI / 180);
              const y2 = 50 + 40 * Math.sin((currentAngle + angle) * Math.PI / 180);
              
              const pathData = [
                `M 50 50`,
                `L ${x1} ${y1}`,
                `A 40 40 0 ${largeArc} 1 ${x2} ${y2}`,
                `Z`
              ].join(' ');
              
              const sliceElement = (
                <path
                  key={index}
                  d={pathData}
                  fill={slice.color}
                  className={styles.pieSlice}
                />
              );
              
              currentAngle += angle;
              return sliceElement;
            })}
            <circle cx="50" cy="50" r="15" fill="white" />
          </svg>
        </div>
        <div className={styles.pieLegend}>
          {data.map((slice, index) => (
            <div key={index} className={styles.legendItem}>
              <div 
                className={styles.legendColor} 
                style={{ backgroundColor: slice.color }}
              ></div>
              <span className={styles.legendLabel}>{slice.label}</span>
              <span className={styles.legendValue}>{slice.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Progress bar component
  const ProgressBar = ({ value, label }) => (
    <div className={styles.progressContainer}>
      <div className={styles.progressLabel}>
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );

  const getPageContent = () => {
    if (!activeMenu || activeMenu === 'DASHBOARD') {
      return (
        <div className={styles.dashboardContent}>
          {/* Quick Stats */}
          <div className={styles.statsGrid}>
            {quickStats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statHeader}>
                  <div className={styles.statIcon}>{stat.icon}</div>
                  <h3 className={styles.statTitle}>{stat.title}</h3>
                </div>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statChange}>{stat.change}</div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className={styles.chartsRow}>
            <div className={styles.chartCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <FiTrendingUp />
                </div>
                <h3 className={styles.cardTitle}>Revenue Analytics</h3>
              </div>
              <LineChart data={revenueData.data} labels={revenueData.labels} />
            </div>

            <div className={styles.chartCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <FiPieChart />
                </div>
                <h3 className={styles.cardTitle}>Category Distribution</h3>
              </div>
              <PieChart data={categoryData} />
            </div>
          </div>

          {/* Bottom Section */}
          <div className={styles.bottomRow}>
            {/* Recent Activities */}
            <div className={styles.infoCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <FiClock />
                </div>
                <h3 className={styles.cardTitle}>Recent Activities</h3>
              </div>
              <div className={styles.activitiesList}>
                {recentActivities.map((activity) => (
                  <div key={activity.id} className={styles.activityItem}>
                    <div className={styles.activityIcon}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className={styles.activityContent}>
                      <div className={styles.activityAction}>{activity.action}</div>
                      <div className={styles.activityMeta}>
                        {activity.user} • {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className={styles.outlineButton}>View All Activities</button>
            </div>

            {/* Notifications */}
            <div className={styles.infoCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <FiBell />
                </div>
                <h3 className={styles.cardTitle}>System Notifications</h3>
              </div>
              <div className={styles.notificationsList}>
                {notifications.map((noti) => (
                  <div key={noti.id} className={styles.notificationItem}>
                    <div className={styles.notificationIcon}>
                      {getNotificationIcon(noti.type)}
                    </div>
                    <div className={styles.notificationContent}>
                      <div className={styles.notificationMessage}>
                        {noti.message}
                        <span className={`${styles.notificationBadge} ${getNotificationColor(noti.type)}`}>
                          {noti.type}
                        </span>
                      </div>
                      <div className={styles.notificationTime}>{noti.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className={styles.outlineButton}>Manage Notifications</button>
            </div>

            {/* Calendar */}
            <div className={styles.infoCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <FiCalendar />
                </div>
                <h3 className={styles.cardTitle}>Calendar</h3>
              </div>
              <div className={styles.calendar}>
                <div className={styles.calendarHeader}>
                  <button className={styles.calendarNav}>
                    <FiChevronLeft />
                  </button>
                  <span className={styles.calendarMonth}>November 2024</span>
                  <button className={styles.calendarNav}>
                    <FiChevronRight />
                  </button>
                </div>
                <div className={styles.calendarGrid}>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className={styles.calendarDayHeader}>{day}</div>
                  ))}
                  {Array.from({ length: 30 }, (_, i) => (
                    <div 
                      key={i} 
                      className={`${styles.calendarDay} ${i === 14 ? styles.calendarDaySelected : ''}`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.upcomingEvents}>
                <h4 className={styles.eventsTitle}>Upcoming Events</h4>
                <div className={styles.eventItem}>• Team Meeting - Tomorrow 2:00 PM</div>
                <div className={styles.eventItem}>• Product Launch - Next Week</div>
              </div>
            </div>
          </div>

          {/* Performance Metrics & Quick Actions */}
          <div className={styles.bottomSection}>
            <div className={styles.infoCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <FiActivity />
                </div>
                <h3 className={styles.cardTitle}>System Performance</h3>
              </div>
              <ProgressBar value={65} label="CPU Usage" />
              <ProgressBar value={45} label="Memory Usage" />
              <ProgressBar value={78} label="Storage" />
            </div>

            <div className={styles.infoCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <FiSettings />
                </div>
                <h3 className={styles.cardTitle}>Quick Actions</h3>
              </div>
              <div className={styles.actionsGrid}>
                <button className={styles.primaryButton}>
                  <FiPlus className={styles.buttonIcon} />
                  Add Product
                </button>
                <button className={styles.outlineButton}>
                  <FiEye className={styles.buttonIcon} />
                  View Orders
                </button>
                <button className={styles.outlineButton}>
                  <FiUsers className={styles.buttonIcon} />
                  Manage Users
                </button>
                <button className={styles.outlineButton}>
                  <FiSettings className={styles.buttonIcon} />
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.otherPageContent}>
        <div className={styles.pageCard}>
          <h2 className={styles.pageTitle}>{activeMenu}</h2>
          <p className={styles.pageDescription}>
            This is the {activeMenu.toLowerCase()} page. Content will be implemented based on the selected menu.
          </p>
          <div className={styles.placeholder}>
            <div className={styles.placeholderIcon}>🚀</div>
            <h3 className={styles.placeholderTitle}>Feature coming soon!</h3>
            <p className={styles.placeholderText}>
              This section is ready for implementation of {activeMenu} functionality.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className={styles.main}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          {!activeMenu || activeMenu === 'DASHBOARD' ? 'Dashboard Overview' : activeMenu}
        </h1>
        <p className={styles.pageSubtitle}>
          {!activeMenu || activeMenu === 'DASHBOARD'
            ? 'Welcome to your admin dashboard'
            : `Managing ${activeMenu.toLowerCase()}`}
        </p>
      </div>
      {getPageContent()}
    </main>
  );
};

export default MainPage;